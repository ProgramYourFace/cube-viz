var dc = Object.defineProperty;
var mc = (e, t, n) => t in e ? dc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Or = (e, t, n) => mc(e, typeof t != "symbol" ? t + "" : t, n);
import { z as y } from "zod";
import { jsx as l, jsxs as C, Fragment as we } from "react/jsx-runtime";
import * as w from "react";
import { useMemo as ae, createContext as Va, useContext as Vo, useState as Pt, useCallback as ft, useEffect as Fn, useRef as xt, createElement as fc, useSyncExternalStore as za, useId as gc, Component as pc } from "react";
import { ruleX as Ha, ruleY as Ga, text as Rn, colorLegend as zo, group as hc, stack as ja, barX as zi, barY as Hi, lineX as vc, lineY as dr, defineChart as Ct, areaY as to, dot as Ba, cell as yc } from "@tanstack/charts";
import { crosshair as qa } from "@tanstack/charts/crosshair";
import { scaleBand as bc } from "@tanstack/charts/scales/band";
import { scaleLinear as Wn } from "@tanstack/charts/scales/linear";
import { scalePoint as wc } from "@tanstack/charts/scales/point";
import { Chart as Cc } from "@tanstack/charts/react/core";
import { motion as Wa } from "@tanstack/charts/motion";
import { tooltip as Ho } from "@tanstack/charts/tooltip";
import { d3Curve as Ir } from "@tanstack/charts/d3/shape";
import { brushX as Sc } from "@tanstack/charts/interaction/brush";
import { controlledSignal as kc } from "@tanstack/charts/interaction/signal";
import { scaleUtc as Rc, scaleLog as Gi, scaleSqrt as Nc } from "d3-scale";
import { curveNatural as _c, curveStepAfter as xc, curveMonotoneX as Mc } from "d3-shape";
import { format as Se, isValid as un, parseISO as Un, subDays as $e, startOfWeek as Kn, endOfWeek as Yn, startOfMonth as Mt, endOfMonth as hn, startOfQuarter as Ft, endOfQuarter as vn, startOfYear as $t, endOfYear as yn, subWeeks as no, subMonths as At, subQuarters as Ot, subYears as It, differenceInCalendarDays as Fc, parse as Ua } from "date-fns";
import { clsx as $c } from "clsx";
import * as Oe from "@radix-ui/react-select";
import { Minus as Ka, ArrowUp as Go, ArrowDown as jo, CalendarRange as Ya, Search as Qa, ChevronsUpDown as Ac, AreaChart as Oc, BarChart3 as Xa, Grid3X3 as Ic, Table as Pc, Gauge as Tc, ScatterChart as Dc, PieChart as Ec, LineChart as Lc, AlertCircle as Bo, ChevronLeft as qo, ChevronRight as mr, ChevronDown as St, Check as nn, ChevronUp as Vc, CalendarIcon as Ja, MoreVertical as zc, RefreshCw as Hc, Image as Gc, Sheet as jc, ListChecks as Bc, Table2 as Za, Database as es, Layers as ts, Calendar as qc, Type as ns, Hash as ji, MapPin as Wc, Variable as Uc, Plus as Tt, Trash2 as rn, ListFilter as Kc, EyeOff as Yc, Eye as Qc, AlertTriangle as Xc, GripVertical as Jc, X as ro, ArrowLeftRight as Zc, Save as rs, Braces as eu, Undo2 as tu, Redo2 as nu, RotateCcw as ru, SlidersHorizontal as ou, Pencil as iu, Copy as au, Bold as su, Italic as lu, Strikethrough as cu, Heading1 as uu, Heading2 as du, List as mu, ListOrdered as fu, Quote as gu, Box as pu } from "lucide-react";
import * as Qn from "@radix-ui/react-popover";
import { cva as Wo } from "class-variance-authority";
import hu from "@cubejs-client/core";
import { DayPicker as vu, useDayPicker as yu } from "react-day-picker";
import { pie as bu, radialArc as oo, radialText as Pr, polar as os } from "@tanstack/charts/polar";
import { ResponsiveGridLayout as is } from "react-grid-layout";
import { useEditor as as, EditorContent as ss } from "@tiptap/react";
import ls from "@tiptap/starter-kit";
const Wt = 5, Xn = y.object({ var: y.string().min(1) }).strict();
function Me(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Jn = (e) => y.union([e, Xn]), wu = y.union([y.string(), y.number(), y.boolean()]), ht = y.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Qt = "auto", Cu = y.union([ht, y.literal(Qt)]), io = y.union([y.tuple([y.string(), y.string()]), y.string()]), cs = y.union([
  y.string(),
  y.number(),
  y.boolean(),
  y.tuple([y.string(), y.string()]),
  // absolute date range
  y.array(y.string()),
  y.array(y.number())
]), ge = y.string().min(1), Su = y.enum([
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
]), ku = y.object({
  member: ge,
  operator: Su,
  values: y.array(y.union([wu, Xn])).optional()
}).strict(), ao = y.lazy(
  () => y.union([
    ku,
    y.object({ and: y.array(ao) }).strict(),
    y.object({ or: y.array(ao) }).strict()
  ])
), Ru = y.object({
  dimension: ge,
  granularity: Jn(Cu).optional(),
  dateRange: Jn(io).optional(),
  compareDateRange: y.array(io).optional()
}).strict(), Bi = y.enum(["asc", "desc"]), Nu = y.union([
  y.record(ge, Bi),
  y.array(y.tuple([ge, Bi]))
]), us = y.object({
  measures: y.array(ge).optional(),
  dimensions: y.array(ge).optional(),
  timeDimensions: y.array(Ru).optional(),
  filters: y.array(ao).optional(),
  segments: y.array(ge).optional(),
  order: Nu.optional(),
  limit: Jn(y.number()).optional(),
  offset: Jn(y.number()).optional(),
  total: y.boolean().optional(),
  timezone: y.string().optional()
}).strict(), _u = y.string().min(1), Hw = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "heatmap",
  "kpi",
  "table"
], vt = y.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), xu = y.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Uo = y.object({
  kind: xu.optional(),
  decimals: y.number().optional(),
  abbreviate: y.boolean().optional(),
  prefix: y.string().optional(),
  suffix: y.string().optional(),
  unitSystem: y.enum(["metric", "imperial"]).optional(),
  dateFormat: y.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: y.string().optional()
}).strict(), qi = y.object({
  label: y.string().optional(),
  colorToken: vt.optional(),
  /** Series sharing an id stack together; DIFFERENT ids are separate stacks —
   *  side by side (bar) or overlaid (area). Only read when `stackMode` stacks. */
  stackId: y.string().optional(),
  // NOTE — there is deliberately no per-series `curve`. Line shape is a property of
  // the CHART (`familyOptions.curve`): a stacked/percent area draws a whole stack
  // from one mark, and a color-split chart has no per-measure meta at all, so a
  // per-series shape was ignored in exactly the cases users reached for it.
  // Removed in v5 (promoted to the family option by the migration).
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: y.boolean().optional()
  // NOTE — there is deliberately no per-series `format`. Numbers on ONE value axis
  // share a unit, so a per-series format would print two different units against the
  // same ticks; formatting is chart-level (`chart.format`) with per-axis /
  // per-column overrides. Removed in v3 (it parsed but nothing ever read it).
}).strict(), Mu = y.object({
  category: y.object({ member: ge }).strict(),
  series: y.union([
    y.object({
      mode: y.literal("measures"),
      members: y.array(ge),
      meta: y.record(ge, qi).optional()
    }).strict(),
    y.object({
      mode: y.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: ge,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: y.array(ge).optional(),
      pivot: ge,
      /** Per-MEASURE meta (keyed by measure): label/color/format overrides for
       *  each split measure's series. */
      meta: y.record(ge, qi).optional()
    }).strict()
  ])
}).strict(), Fu = y.object({
  show: y.boolean().optional(),
  /** Top or bottom only. A SIDE legend competes with the plot for width — the thing
   *  a dashboard tile has least of — so the renderer never had one and `left`/`right`
   *  silently became `bottom`. Removed from the enum in v3 (migrated to `bottom`). */
  position: y.enum(["top", "bottom"]).optional()
}).strict(), $u = y.object({
  show: y.boolean().optional(),
  indicator: y.enum(["dot", "line", "dashed"]).optional(),
  showTotal: y.boolean().optional()
}).strict(), Wi = y.object({
  /**
   * The axis title. UNSET ⇒ the mapped member's own name; EMPTY STRING ⇒ no title
   * (the ticks and line stay). There is no separate hide flag: the editor's title
   * field IS the control, and clearing it is how you remove the title. (v4)
   */
  label: y.string().optional(),
  /** Hide the whole axis — ticks, line and title. */
  hide: y.boolean().optional(),
  /** Value-axis only: a category axis is band/point/utc and has no log form. */
  scale: y.enum(["linear", "log"]).optional(),
  /** A FIXED value-axis window, both ends. There is no half-open form: the renderer
   *  either takes a configured domain verbatim or infers both ends from the data, so
   *  `[0, "auto"]` used to parse and then do nothing. Omit for auto. (v3) */
  domain: y.tuple([y.number(), y.number()]).optional(),
  /** FormatOptions for THIS axis' ticks, merged over the chart-level `format`. */
  tickFormat: Uo.optional()
}).strict(), Au = y.object({
  x: Wi.optional(),
  y: Wi.optional()
}).strict(), Ou = y.object({
  byKey: y.record(y.string(), vt).optional(),
  ramp: y.array(vt).optional()
}).strict(), zn = 7, Iu = y.enum(["rollingAvg", "cumulative", "percentOfTotal"]), Pu = y.object({
  kind: Iu,
  /**
   * Trailing window length in CATEGORIES. Only meaningful for `kind:"rollingAvg"`
   * (ignored by cumulative / percentOfTotal); defaults to
   * {@link DEFAULT_TRANSFORM_WINDOW}.
   */
  window: y.number().int().min(2).max(90).optional()
}).strict(), ds = y.object({
  family: _u,
  /** Generic data→visual mapping. Used by bar/line/area/pie/heatmap; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Mu.optional(),
  orientation: y.enum(["vertical", "horizontal"]).optional(),
  stackMode: y.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Fu.optional(),
  tooltip: $u.optional(),
  axes: Au.optional(),
  colors: Ou.optional(),
  format: Uo.optional(),
  /**
   * Presentation-only reshaping of the normalized series (rolling average /
   * running total / share of category total). Purely additive + optional, so it
   * did NOT bump {@link SCHEMA_VERSION} when it landed — every v2 spec stayed valid.
   */
  transform: Pu.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: y.record(y.string(), y.unknown()).optional()
}).strict(), Tu = y.object({ type: y.string(), content: y.array(y.unknown()).optional() }).passthrough(), Du = y.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Eu = y.object({
  variable: y.string().min(1),
  control: y.discriminatedUnion("kind", [
    y.object({
      kind: y.literal("dateRange"),
      presets: y.array(y.string()).optional(),
      allowFuture: y.boolean().optional()
    }).strict(),
    y.object({
      kind: y.literal("granularity"),
      options: y.array(ht).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: y.string().optional()
    }).strict(),
    y.object({
      kind: y.literal("select"),
      options: y.array(y.object({ value: cs, label: y.string() }).strict()),
      multiple: y.boolean().optional()
    }).strict(),
    y.object({
      kind: y.literal("memberSelect"),
      from: y.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: y.string().optional()
    }).strict(),
    y.object({ kind: y.literal("text"), placeholder: y.string().optional() }).strict(),
    y.object({
      kind: y.literal("number"),
      min: y.number().optional(),
      max: y.number().optional(),
      step: y.number().optional()
    }).strict(),
    y.object({ kind: y.literal("toggle") }).strict()
  ])
}).strict(), Ko = {
  id: y.string().min(1),
  title: y.string().optional()
}, Lu = y.object({ ...Ko, type: y.literal("chart"), query: us.default({}), chart: ds }).strict(), Vu = y.object({ ...Ko, type: y.literal("text"), doc: Tu }).strict(), zu = y.object({ ...Ko, type: y.literal("input"), control: Eu }).strict(), Hu = y.discriminatedUnion("type", [
  Lu,
  Vu,
  zu
]), Gu = y.object({
  i: y.string(),
  x: y.number(),
  y: y.number(),
  w: y.number(),
  h: y.number(),
  minW: y.number().optional(),
  minH: y.number().optional(),
  static: y.boolean().optional()
}).strict(), ju = y.object({
  cols: y.number().optional(),
  rowHeight: y.number().optional(),
  margin: y.tuple([y.number(), y.number()]).optional(),
  containerPadding: y.tuple([y.number(), y.number()]).optional()
}).strict(), ms = y.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Bu = y.object({
  name: y.string().min(1),
  type: ms,
  label: y.string().optional(),
  array: y.boolean().optional(),
  default: cs.optional()
}).strict(), fs = {
  schemaVersion: y.literal(Wt),
  id: y.string().min(1),
  name: y.string().optional(),
  description: y.string().optional(),
  createdAt: y.string().optional(),
  updatedAt: y.string().optional()
}, gs = y.object({ ...fs, kind: y.literal("chart"), query: us.default({}), chart: ds }).strict(), so = y.object({
  ...fs,
  kind: y.literal("dashboard"),
  variables: y.array(Bu),
  widgets: y.array(Hu),
  layout: y.array(Gu),
  grid: ju.optional()
}).strict(), ps = y.discriminatedUnion("kind", [gs, so]);
function te(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function rt(e, t) {
  const { [t]: n, ...r } = e;
  return Object.keys(r).length > 0 ? r : void 0;
}
function qu(e) {
  if (!te(e.axes)) return;
  const t = rt(e.axes, "y2");
  t ? e.axes = t : delete e.axes;
}
function Wu(e) {
  if (!te(e.mapping)) return;
  const t = e.mapping.series;
  if (!te(t) || !te(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!te(o)) continue;
    const i = rt(o, "axis");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Uu(e) {
  if (!te(e.familyOptions)) return;
  const t = e.familyOptions.referenceLines;
  Array.isArray(t) && (e.familyOptions.referenceLines = t.map(
    (n) => te(n) ? rt(n, "side") ?? {} : n
  ));
}
function Ku(e) {
  const t = te(e.familyOptions) ? e.familyOptions : {}, n = Array.isArray(t.series) ? t.series.filter(te) : [];
  e.family = n.some((a) => a.render === "bar") ? "bar" : "line";
  const r = te(e.mapping) ? e.mapping : void 0, o = r && te(r.series) ? r.series : void 0, i = (o == null ? void 0 : o.mode) === "measures" && Array.isArray(o.members) ? o.members.filter((a) => typeof a == "string") : [];
  if (o && i.length > 0) {
    const a = {};
    for (const s of n)
      typeof s.member == "string" && s.colorToken !== void 0 && i.includes(s.member) && (a[s.member] = { colorToken: s.colorToken });
    if (Object.keys(a).length > 0) {
      const s = te(o.meta) ? o.meta : {};
      o.meta = { ...a, ...s };
    }
  }
  e.familyOptions = {};
}
function Ui(e) {
  te(e) && (e.family === "combo" && Ku(e), qu(e), Wu(e), Uu(e));
}
function Yu(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ui(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      te(n) && n.type === "chart" && Ui(n.chart);
  return t;
}
function Qu(e) {
  if (!te(e.mapping)) return;
  const t = e.mapping.series;
  if (!te(t) || !te(t.meta)) return;
  const n = {};
  for (const [r, o] of Object.entries(t.meta)) {
    if (!te(o)) continue;
    const i = rt(o, "format");
    i && (n[r] = i);
  }
  Object.keys(n).length > 0 ? t.meta = n : delete t.meta;
}
function Xu(e) {
  if (!te(e.legend)) return;
  const t = e.legend.position;
  (t === "left" || t === "right") && (e.legend.position = "bottom");
}
function Ju(e) {
  if (te(e.axes)) {
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!te(n) || !Array.isArray(n.domain) || n.domain.every((o) => typeof o == "number")) continue;
      const r = rt(n, "domain");
      r ? e.axes[t] = r : delete e.axes[t];
    }
    Object.keys(e.axes).length === 0 && delete e.axes;
  }
}
function Zu(e) {
  if (!te(e.familyOptions)) return;
  const t = e.family === "scatter" ? "shape" : e.family === "kpi" ? "icon" : void 0;
  if (t === void 0) return;
  const n = rt(e.familyOptions, t);
  e.familyOptions = n ?? {};
}
function Ki(e) {
  te(e) && (Qu(e), Xu(e), Ju(e), Zu(e));
}
function ed(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Ki(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      te(n) && n.type === "chart" && Ki(n.chart);
  return t;
}
const td = {
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
function nd(e) {
  if (!te(e.familyOptions)) return;
  const t = typeof e.family == "string" ? e.family : "", n = td[t];
  if (!n) return;
  let r = e.familyOptions;
  for (const o of n) r = rt(r, o) ?? {};
  e.familyOptions = r;
}
function rd(e) {
  if (te(e.axes))
    for (const t of ["x", "y"]) {
      const n = e.axes[t];
      if (!te(n) || n.labelHide !== !0) continue;
      const r = rt(n, "labelHide") ?? {};
      r.label = "", e.axes[t] = r;
    }
}
function Yi(e) {
  te(e) && (nd(e), rd(e));
}
function od(e) {
  const t = structuredClone(e);
  if (t.kind === "chart")
    Yi(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const n of t.widgets)
      te(n) && n.type === "chart" && Yi(n.chart);
  return t;
}
function id(e) {
  if (!te(e.mapping)) return;
  const t = e.mapping.series;
  if (!te(t) || !te(t.meta)) return;
  let n;
  const r = {};
  for (const [a, s] of Object.entries(t.meta)) {
    if (!te(s)) continue;
    n === void 0 && typeof s.curve == "string" && (n = s.curve);
    const c = rt(s, "curve");
    c && (r[a] = c);
  }
  Object.keys(r).length > 0 ? t.meta = r : delete t.meta;
  const o = e.family;
  if (n === void 0 || o !== "line" && o !== "area") return;
  const i = te(e.familyOptions) ? e.familyOptions : {};
  e.familyOptions = { curve: n, ...i };
}
function ad(e) {
  const t = structuredClone(e), n = (r) => {
    te(r) && id(r);
  };
  if (t.kind === "chart")
    n(t.chart);
  else if (t.kind === "dashboard" && Array.isArray(t.widgets))
    for (const r of t.widgets)
      te(r) && r.type === "chart" && n(r.chart);
  return t;
}
const sd = {
  1: Yu,
  2: ed,
  3: od,
  4: ad
};
function ld(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > Wt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${Wt} — update the library`
    );
  for (; n < Wt; ) {
    const r = sd[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return ps.parse(t);
}
function Gw(e) {
  try {
    return { ok: !0, spec: ld(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function jw(e) {
  return ps.parse(e);
}
function cd(e) {
  return hu(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ud(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
function I(...e) {
  return $c(e);
}
function dd({ className: e, ...t }) {
  return /* @__PURE__ */ l("div", { className: I("cv-skeleton", e), ...t });
}
const md = Wo(
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
), fr = w.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: I(md({ variant: t }), e),
    ...n
  }
));
fr.displayName = "Alert";
const gr = w.forwardRef(
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
gr.displayName = "AlertTitle";
const pr = w.forwardRef(
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
pr.displayName = "AlertDescription";
const fd = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, gd = "MMM d, yyyy";
function hs(e) {
  if (e instanceof Date) return un(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return un(r) ? r : null;
  }
  const t = Un(e);
  if (un(t)) return t;
  const n = new Date(e);
  return un(n) ? n : null;
}
function hr(e) {
  return /^\d{4}-\d{2}/.test(e) ? un(Un(e)) : !1;
}
function pd(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? fd[t] : gd;
}
function Ut(e, t, n) {
  const r = hs(e);
  return r ? Se(r, pd(t, n)) : String(e);
}
function Bw(e, t) {
  return (n) => n == null ? "" : Ut(n, e, t);
}
function qw(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ut(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ut(e, t.format, t.granularity) : String(e) : hr(e) ? Ut(e, t.format, t.granularity) : e;
}
const Qi = "—", hd = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Xi(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function vd(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: o } of hd)
    if (n >= r) return Xi((e / r).toFixed(t)) + o;
  return Xi(e.toFixed(t));
}
function yd(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function bd(e, t) {
  const { format: n, meta: r, locale: o } = t, i = n != null && n.abbreviate ? vd(e, n.decimals ?? 1) : yd(e, n, o), a = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${i}${a ? ` ${a}` : ""}`;
}
function vs(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function wd(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || vs(e.value) ? !0 : typeof e.value == "string" ? hr(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Yo = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Qi : (vs(t) || typeof t == "string" || typeof t == "number") && wd(e) ? Ut(t, n, r) : typeof t == "number" ? bd(t, e) : String(t);
};
function Cd(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Ww(e, t) {
  return (n, r) => {
    const o = r ? Cd(r, t) : void 0;
    return Yo({
      value: n,
      meta: o == null ? void 0 : o.meta,
      title: (o == null ? void 0 : o.shortTitle) ?? (o == null ? void 0 : o.title),
      role: "value",
      format: e
    });
  };
}
function Sd(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function kd(e) {
  const t = ht.safeParse(e);
  return t.success ? t.data : void 0;
}
function Rd(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const o of Object.keys(e.timeDimensions))
      if (o !== n && o.startsWith(`${n}.`)) {
        const i = kd(o.slice(n.length + 1));
        if (i) return i;
      }
  }
}
function Qo(e, t, n, r) {
  const o = Rd(e, t), i = {
    // A per-axis / per-column FormatOptions override (`axes.*.tickFormat`,
    // `TableColumnOpt.format`) is just this same binder with a merged `format`, so
    // the member lookup, granularity discovery and host formatter stay identical.
    derive: (a) => !a || Object.keys(a).length === 0 ? i : Qo(
      e,
      { ...t, format: { ...t.format, ...a } },
      n,
      r
    ),
    value(a, s, c = "value") {
      const u = s ? Sd(s, e) : void 0, m = u == null ? void 0 : u.meta;
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
const vr = y.object({
  axis: y.enum(["x", "y"]),
  value: y.number(),
  label: y.string().optional(),
  colorToken: vt.optional()
}).strict(), Xo = y.boolean().optional(), Nd = y.object({
  showValueLabels: y.boolean().optional(),
  referenceLines: y.array(vr).optional(),
  comparePrevious: Xo
}).strict(), ys = y.enum(["linear", "monotone", "step", "natural"]), _d = y.object({
  curve: ys.optional(),
  dots: y.union([y.boolean(), y.literal("active")]).optional(),
  connectNulls: y.boolean().optional(),
  chrome: y.enum(["full", "none"]).optional(),
  referenceLines: y.array(vr).optional(),
  showValueLabels: y.boolean().optional(),
  comparePrevious: Xo
}).strict(), xd = y.object({
  curve: ys.optional(),
  connectNulls: y.boolean().optional(),
  dots: y.boolean().optional(),
  referenceLines: y.array(vr).optional(),
  comparePrevious: Xo
}).strict(), Md = y.object({
  innerRadiusPct: y.number().optional(),
  showLabels: y.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: y.object({ value: y.string().optional(), label: y.string().optional() }).strict().optional(),
  maxSlices: y.number().optional()
}).strict(), Fd = y.object({
  x: ge,
  y: ge,
  size: ge.optional(),
  groupBy: ge.optional(),
  referenceLines: y.array(vr).optional()
}).strict(), $d = y.object({
  display: y.enum(["number", "gauge"]).optional(),
  measure: ge,
  comparison: y.object({
    mode: y.enum(["previousPeriod", "value"]),
    value: y.union([ge, y.number()]).optional(),
    showAsPercent: y.boolean().optional(),
    goodDirection: y.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: y.object({
    member: ge.optional(),
    timeDimension: ge.optional(),
    granularity: y.union([ht, Xn]).optional(),
    dateRange: y.union([io, Xn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: y.enum(["up", "down"]).optional(),
  gauge: y.object({
    min: y.number().optional(),
    max: y.number(),
    thresholds: y.array(y.object({ at: y.number(), colorToken: vt }).strict()).optional()
  }).strict().optional()
}).strict(), Ad = y.object({
  member: ge,
  label: y.string().optional(),
  format: Uo.optional(),
  align: y.enum(["left", "right", "center"]).optional(),
  width: y.number().optional(),
  hidden: y.boolean().optional()
}).strict(), Od = y.object({
  member: ge,
  when: y.object({
    op: y.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: y.number()
  }).strict(),
  colorToken: vt.optional()
}).strict(), Id = y.object({
  columns: y.array(Ad).optional(),
  pageSize: y.number().optional(),
  conditionalFormat: y.array(Od).optional()
  // REMOVED in v4 — `sortable`, `stickyHeader`, `showRowNumbers` and `rowHeight`.
  // Sorting and a pinned header are what makes a table a table, so they are always
  // on; density follows the row count; row numbers say nothing about the data.
}).strict(), Pd = y.object({
  /** The single-hue ramp token; cells shade light→dark within this hue. */
  colorToken: vt.optional()
  // REMOVED in v4 — `showValues`. The renderer prints in-cell numbers when the grid
  // is small enough to read them (≤100 cells), which is the answer every time.
}).strict(), at = {
  bar: Nd,
  line: _d,
  area: xd,
  pie: Md,
  scatter: Fd,
  heatmap: Pd,
  kpi: $d,
  table: Id
}, st = {
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
function Ji(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function lo(e, t) {
  if (t === void 0) return e;
  if (!Ji(e) || !Ji(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const o = t[r];
    o !== void 0 && (n[r] = r in e ? lo(e[r], o) : o);
  }
  return n;
}
const Td = { envelope: {}, familyOptions: {} };
function Dd(e, t) {
  return {
    ...lo({ ...t.envelope }, e),
    familyOptions: lo(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const bs = {}, Zi = () => {
}, Ed = {
  target: bs,
  rangeEnabled: !1,
  pointEnabled: !1,
  emitRange: Zi,
  emitPoint: Zi
}, Zn = w.createContext(null);
Zn.displayName = "ChartInteractionContext";
function ws() {
  return w.useContext(Zn) ?? Ed;
}
function Jo({
  widgetId: e,
  onRangeSelect: t,
  onPointSelect: n,
  target: r,
  children: o
}) {
  const i = w.useContext(Zn), a = w.useRef({ parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n });
  w.useLayoutEffect(() => {
    a.current = { parent: i, widgetId: e, onRangeSelect: t, onPointSelect: n };
  });
  const s = w.useCallback((g) => {
    const { parent: h, widgetId: v, onRangeSelect: b } = a.current, S = g && g.widgetId === void 0 && v !== void 0 ? { ...g, widgetId: v } : g;
    b ? b(S) : h == null || h.emitRange(S);
  }, []), c = w.useCallback((g) => {
    const { parent: h, widgetId: v, onPointSelect: b } = a.current, S = g && g.widgetId === void 0 && v !== void 0 ? { ...g, widgetId: v } : g;
    b ? b(S) : h == null || h.emitPoint(S);
  }, []), u = !!t || ((i == null ? void 0 : i.rangeEnabled) ?? !1), m = !!n || ((i == null ? void 0 : i.pointEnabled) ?? !1), f = i == null ? void 0 : i.target, p = w.useMemo(
    () => f || r ? { ...f, ...r } : bs,
    [f, r]
  ), d = w.useMemo(
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
  return /* @__PURE__ */ l(Zn.Provider, { value: d, children: o });
}
function dt(e, t) {
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
function co(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.stackId) ?? "";
}
function Cs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = co(n), o = t.get(r);
    o ? o.push(n) : t.set(r, [n]);
  }
  return [...t].map(([n, r]) => ({ stackId: n, series: r }));
}
function uo(e, t, n) {
  const r = [];
  return e.categories.forEach((o, i) => {
    var m, f, p;
    const a = (m = n == null ? void 0 : n.temporal) == null ? void 0 : m.dates[i], s = /* @__PURE__ */ new Map();
    for (const d of t) {
      const g = d.data[i];
      if (typeof g == "number" && Number.isFinite(g)) {
        const h = co(d);
        s.set(h, (s.get(h) ?? 0) + Math.abs(g));
      }
    }
    const c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const d of t) {
      const g = d.data[i] ?? null, h = co(d), v = s.get(h) ?? 0, b = g === null || v === 0 ? null : Math.abs(g) / v;
      let S = 0, x = 0;
      if (g !== null) {
        const R = g < 0 ? u : c;
        S = R.get(h) ?? 0, x = S + g, R.set(h, x);
      }
      const k = n != null && n.normalize && v > 0 ? 1 / v : 1;
      r.push({
        cat: typeof o == "number" ? o : String(o),
        ...a ? { t: a } : {},
        value: g,
        key: d.key,
        label: d.label,
        member: ((f = d.meta) == null ? void 0 : f.measure) ?? d.key,
        companion: ((p = d.meta) == null ? void 0 : p.companion) ?? !1,
        i,
        stack: h,
        y1: S * k,
        y2: x * k,
        share: b
      });
    }
  }), r;
}
function mo(e, t) {
  const n = e[0];
  if (!n || t in n) return t;
  const r = `${t}.`;
  return Object.keys(n).find((o) => o.startsWith(r)) ?? t;
}
function Nn(e) {
  return e.label || e.key;
}
function ut(e) {
  return `var(--${e.colorToken ?? "chart-1"})`;
}
function Zo(e, t) {
  const n = e.series.map(Nn), r = e.series.map(ut), o = { domain: n, range: r };
  return t != null && t.legend && (o.legend = zo({ placement: on(t.legendPlacement) })), o;
}
function on(e) {
  return e === "top" ? "top" : "bottom";
}
function $n(e) {
  var t;
  return ((t = e.legend) == null ? void 0 : t.show) !== !1;
}
function er(e = 0.2) {
  return bc().padding(e);
}
function Ss() {
  return wc().padding(0.02);
}
const Ld = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/;
function Vd(e) {
  if (typeof e == "string" && Ld.test(e)) {
    const t = e.replace(" ", "T"), n = /* @__PURE__ */ new Date(t.length <= 10 ? `${t}T00:00:00Z` : `${t}Z`);
    return Number.isNaN(n.getTime()) ? null : n;
  }
  return hs(e);
}
function ks(e) {
  return e.toISOString().slice(0, -1);
}
function ea(e, t) {
  const n = t ? e.slice(t.length + 1) : e.slice(e.lastIndexOf(".") + 1), r = ht.safeParse(n);
  return r.success ? r.data : void 0;
}
function Rs(e, t) {
  var m, f, p;
  const n = (f = (m = t.mapping) == null ? void 0 : m.category) == null ? void 0 : f.member, r = (p = e.raw.annotation) == null ? void 0 : p.timeDimensions;
  if (!n || !r || e.categories.length === 0) return null;
  let o;
  for (const d of Object.keys(r))
    if (d === n || d.startsWith(`${n}.`)) {
      o = d;
      break;
    }
  if (o === void 0) return null;
  const i = o === n ? ea(n) : ea(o, n), a = i && n.endsWith(`.${i}`) ? n.slice(0, -(i.length + 1)) : n, s = [];
  for (const d of e.categories) {
    if (typeof d == "number" && i === void 0 || typeof d == "string" && !hr(d)) return null;
    const g = Vd(d);
    if (!g) return null;
    s.push(g);
  }
  const c = /* @__PURE__ */ new Set(), u = s.filter((d) => c.has(d.getTime()) ? !1 : (c.add(d.getTime()), !0)).sort((d, g) => d.getTime() - g.getTime());
  return u.length < 2 ? null : { member: a, granularity: i, dates: s, categories: e.categories, values: u };
}
function Ns(e) {
  return e ? Rc : Ss;
}
function ei(e) {
  return e ? "t" : "cat";
}
function tr(e, t) {
  if (!e) return (r) => t.category(r);
  const n = /* @__PURE__ */ new Map();
  return e.dates.forEach((r, o) => {
    const i = e.categories[o];
    i !== void 0 && n.set(r.getTime(), i);
  }), (r) => r instanceof Date ? t.category(n.get(r.getTime()) ?? ks(r)) : t.category(r);
}
function ta(e, t) {
  const n = e.dates.findIndex((o) => o.getTime() === t.getTime()), r = n >= 0 ? e.categories[n] : void 0;
  return typeof r == "string" ? r : ks(t);
}
function _s(e, t) {
  const n = ws(), [r, o] = w.useState(null), i = w.useRef({ opts: t, interactions: n, temporal: e });
  w.useLayoutEffect(() => {
    i.current = { opts: t, interactions: n, temporal: e };
  });
  const a = n.rangeEnabled && e !== null;
  return w.useMemo(() => {
    if (!a || !e) return;
    const s = e.values, c = (d) => d !== void 0 && s.some((g) => g.getTime() === d.getTime()), u = r && c(r.start) && c(r.end) ? r : null, m = s[0], f = u ?? { start: m, end: m }, p = u === null;
    return [
      Sc({
        id: "cv-brush-x",
        values: s,
        range: kc(
          f,
          (d, { reason: g }) => {
            if (g.type !== "commit") return;
            const h = i.current.temporal, v = d.start.getTime() === d.end.getTime();
            if (o(v ? null : d), v || !h) {
              i.current.interactions.emitRange(null);
              return;
            }
            i.current.interactions.emitRange({
              member: h.member,
              granularity: h.granularity,
              from: ta(h, d.start),
              to: ta(h, d.end)
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
  }, [a, e, r]);
}
function zd(e, t) {
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
    const o = () => r ? Gi().domain(r) : Gi();
    return { scale: r ? o() : o, nice: !r };
  }
  return r ? { scale: Wn().domain(r), nice: !1 } : { scale: Wn, nice: !0 };
}
function xs(e, t) {
  var n;
  return (((n = e.meta) == null ? void 0 : n.dots) ?? t) === !0;
}
function _n(e) {
  switch (e) {
    case "monotone":
      return Ir(Mc);
    case "step":
      return Ir(xc);
    case "natural":
      return Ir(_c);
    default:
      return;
  }
}
function Jt(e, t) {
  if ((e == null ? void 0 : e.label) !== "")
    return (e == null ? void 0 : e.label) ?? t;
}
function ti(e, t) {
  var a, s, c, u;
  const n = e.raw.annotation, r = (m) => {
    var f, p, d, g, h, v;
    if (m)
      return ((f = n == null ? void 0 : n.measures[m]) == null ? void 0 : f.shortTitle) ?? ((p = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : p.shortTitle) ?? ((d = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : d.shortTitle) ?? ((g = n == null ? void 0 : n.measures[m]) == null ? void 0 : g.title) ?? ((h = n == null ? void 0 : n.dimensions[m]) == null ? void 0 : h.title) ?? ((v = n == null ? void 0 : n.timeDimensions[m]) == null ? void 0 : v.title) ?? m;
  }, o = e.series[0], i = (m) => {
    var f;
    return m ? (f = m.meta) != null && f.measure ? r(m.meta.measure) : m.label : void 0;
  };
  return {
    x: Jt((a = t.axes) == null ? void 0 : a.x, r((c = (s = t.mapping) == null ? void 0 : s.category) == null ? void 0 : c.member)),
    y: Jt((u = t.axes) == null ? void 0 : u.y, i(o))
  };
}
function Xe(e, t) {
  const n = t == null ? void 0 : t.tickFormat;
  return !n || !e.derive ? e : e.derive(n);
}
function ni(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Hd(e) {
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
function ri(e) {
  return e ? `cv-chart-tooltip cv-chart-tooltip--${e}` : "cv-chart-tooltip";
}
function yr(e) {
  const t = e.category ?? ((r) => e.format.category(r)), n = (r) => e.value ? e.value(r) : e.format.value(r.value, r.member, "tooltip");
  return {
    use: Ho,
    className: ri(e.indicator),
    // Focus points only come from the interactive data marks, whose rows are
    // SeriesRows — decorative rules/labels emit no interaction points — so the
    // unknown-datum cast is safe by construction.
    content: (r) => {
      const o = r, i = o[0], a = i ? t(i.xValue ?? i.datum.cat) : void 0, s = e.expand && i ? e.expand(i.datum).map((f) => {
        var p;
        return { datum: f, color: (p = e.colorOf) == null ? void 0 : p.call(e, f) };
      }) : o.map((f) => ({ datum: f.datum, color: f.color }));
      let c = 0, u = 0;
      if (e.percentShare || e.showTotal)
        for (const f of s) {
          const p = f.datum.value;
          f.datum.companion || typeof p != "number" || !Number.isFinite(p) || (c += p, u += 1);
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
function oi(e) {
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
function ii(e, t, n) {
  if (!(e != null && e.length)) return [];
  const r = [], o = t[0];
  return e.forEach((i, a) => {
    const s = `var(--${i.colorToken ?? "muted-foreground"})`, c = {
      stroke: s,
      strokeWidth: 1.25,
      strokeDasharray: "4 4"
    }, u = i.axis === "x", m = u ? t[i.value] : void 0;
    if (u && m == null) return;
    const f = n != null && n.swap ? !u : u, p = f ? n != null && n.swap ? i.value : m : n != null && n.swap ? m : i.value;
    if (r.push(
      f ? Ha([p], { id: `cv-ref-${a}`, ...c }) : Ga([p], { id: `cv-ref-${a}`, ...c })
    ), !i.label) return;
    const d = u ? n == null ? void 0 : n.valueAnchor : o;
    if (d == null) return;
    const g = (n == null ? void 0 : n.swap) === !0;
    r.push(
      oi(
        Rn(
          [
            {
              x: f ? p : d,
              y: f ? d : p,
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
            dy: f ? g ? -6 : 8 : -6,
            dx: f ? 4 : 0,
            anchor: "start"
          }
        )
      )
    );
  }), r;
}
function ai(e) {
  let t = Number.NEGATIVE_INFINITY;
  for (const n of e.series)
    for (const r of n.data) typeof r == "number" && r > t && (t = r);
  return Number.isFinite(t) ? t : void 0;
}
function Ms(e, t, n) {
  const r = e.filter((s) => s.value !== null && !s.companion);
  if (!r.length) return [];
  const o = ei((n == null ? void 0 : n.temporal) ?? null), i = (s) => n != null && n.stacked ? s.y2 ?? s.value : s.value, a = (s) => {
    if (!(n != null && n.share)) return t.value(s.value, s.member, "label");
    const c = s.share;
    return typeof c == "number" ? yt(c, n.locale) : "";
  };
  return [
    oi(
      Rn(r, {
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
const Gd = Wa({
  transition: { type: "spring", stiffness: 170, damping: 26, mass: 1 }
}), jd = Wa({ initial: !1 });
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
  const c = w.useRef(null), u = ws(), m = u.pointEnabled && !r, f = w.useRef(s);
  w.useLayoutEffect(() => {
    f.current = s;
  });
  const p = w.useCallback(
    (b) => {
      if (b === null) {
        u.emitPoint(null);
        return;
      }
      const S = f.current, x = S ? S(b) : zd(b, u.target);
      x && u.emitPoint(x);
    },
    [u]
  ), [d, g] = w.useState({ w: 0, h: 0 }), h = w.useId().replace(/:/g, "");
  w.useLayoutEffect(() => {
    const b = c.current;
    if (!b || typeof ResizeObserver > "u") return;
    const S = new ResizeObserver((x) => {
      var R;
      const k = (R = x[0]) == null ? void 0 : R.contentRect;
      k && g({ w: Math.floor(k.width), h: Math.floor(k.height) });
    });
    return S.observe(b), () => S.disconnect();
  }, []);
  const v = r ? Math.max(24, d.h || Math.round((d.w || 160) / 5)) : Math.max(i, d.h);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: c,
      className: ["cv-chart", r ? "cv-chart--sparkline" : "", n ?? ""].filter(Boolean).join(" "),
      children: d.w > 0 && /* @__PURE__ */ l(
        Cc,
        {
          definition: e,
          renderer: o ? Gd : jd,
          width: d.w,
          height: v,
          ariaLabel: t,
          idPrefix: h,
          onSelect: a ?? (m ? p : void 0)
        }
      )
    }
  );
}
function Bd({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = w.useMemo(() => {
    var Z, ne, le, fe, Q, pe, ye, G, oe, ue, P, M;
    const s = t.orientation === "horizontal", c = t.stackMode === "percent", u = t.stackMode === "stacked" || c, m = e.series.filter((_) => {
      var A;
      return (A = _.meta) == null ? void 0 : A.companion;
    }), f = m.length ? e.series.filter((_) => {
      var A;
      return !((A = _.meta) != null && A.companion);
    }) : e.series, p = u ? f : e.series, g = (u ? Cs(p) : []).length > 1, h = g ? uo(e, p, { normalize: c }) : dt(e, { series: p }), v = new Map(e.series.map((_) => [Nn(_), ut(_)])), b = /* @__PURE__ */ new Map();
    if (g)
      for (const _ of h) {
        const A = b.get(_.i);
        A ? A.push(_) : b.set(_.i, [_]);
      }
    const S = ti(e, t), x = s ? (ne = (Z = t.axes) == null ? void 0 : Z.y) == null ? void 0 : ne.hide : (fe = (le = t.axes) == null ? void 0 : le.x) == null ? void 0 : fe.hide, k = s ? (Q = t.axes) == null ? void 0 : Q.x : (pe = t.axes) == null ? void 0 : pe.y, R = Xt(k), N = r.barCategoryGap, F = s ? (ye = t.axes) == null ? void 0 : ye.y : (G = t.axes) == null ? void 0 : G.x, E = Xe(n, F), V = Xe(n, k), O = Hd(t) ?? ni(e.series[0]), $ = (_) => c ? yt(_) : V.value(_, O, "axis"), T = x ? !1 : {
      label: S.x,
      ticks: { format: (_) => E.category(_) }
    }, D = k != null && k.hide ? !1 : { label: S.y, ticks: { format: $ } }, z = hc({ padding: r.barGap }), H = g ? z : c ? ja({ offset: "normalize" }) : u ? void 0 : z, L = {
      id: "cv-bars",
      // One stack per `meta.stackId` ⇒ the group channel is the STACK (each stack
      // gets its own slot in the band); paint still keys on the series label.
      z: (_) => g ? _.stack : _.label,
      color: "label",
      // `i` repeats across series — composite key keeps scene identity stable.
      key: (_) => `${_.label} ${_.i}`,
      layout: H,
      radius: r.barRadius,
      maxThickness: r.maxBarSize,
      // Per-datum paint: companions get the old 40%-opacity look via color-mix;
      // everything else uses its palette token (matching the color scale, so
      // the legend swatches stay in sync).
      fill: (_) => {
        const A = v.get(_.label) ?? "var(--chart-1)";
        return _.companion ? `color-mix(in oklab, ${A} 40%, transparent)` : A;
      }
    }, J = [
      g ? s ? zi(h, { ...L, x1: "y1", x2: "y2", y: "cat" }) : Hi(h, { ...L, x: "cat", y1: "y1", y2: "y2" }) : s ? zi(h, { ...L, x: "value", y: "cat" }) : Hi(h, { ...L, x: "cat", y: "value" })
    ];
    if (u && !c && m.length) {
      const _ = e.categories.map((A, j) => {
        var q, K, ee;
        return {
          cat: typeof A == "number" ? A : String(A),
          value: m.reduce((Re, be) => {
            const Y = be.data[j];
            return typeof Y != "number" ? Re : (Re ?? 0) + Y;
          }, null),
          key: "__prev_total",
          label: "Previous period",
          member: ((K = (q = m[0]) == null ? void 0 : q.meta) == null ? void 0 : K.measure) ?? ((ee = m[0]) == null ? void 0 : ee.key),
          companion: !0,
          i: j
        };
      });
      if (_.some((A) => A.value !== null)) {
        const A = {
          id: "cv-bars-prev",
          key: (j) => `prev ${j.i}`,
          curve: _n("step"),
          stroke: "var(--muted-foreground)",
          strokeWidth: 1.5,
          strokeDasharray: "5 4"
        };
        J.push(
          s ? vc(_, { ...A, x: "value", y: "cat" }) : dr(_, { ...A, x: "cat", y: "value" })
        );
      }
    }
    if (J.push(
      ...ii(o.referenceLines, e.categories, {
        swap: s,
        valueAnchor: ai(e)
      })
    ), o.showValueLabels) {
      const _ = u ? g ? h : uo(e, p, { normalize: c }) : h;
      J.push(
        ...Ms(_, n, {
          swap: s,
          share: c,
          stacked: u
        })
      );
    }
    return Ct({
      marks: J,
      x: s ? { scale: R.scale, nice: R.nice, grid: !0, axis: D } : { scale: () => er(N), axis: T },
      y: s ? { scale: () => er(N), axis: T } : { scale: R.scale, nice: R.nice, grid: !0, axis: D },
      color: Zo(u ? { ...e, series: p } : e, {
        legend: $n(t) && p.length > 1,
        legendPlacement: on((oe = t.legend) == null ? void 0 : oe.position)
      }),
      // Bars are discrete: keep the finite default maxFocusDistance so empty
      // space clears focus instead of snapping to a far-away bar.
      focus: s ? "group-y" : "group-x",
      tooltip: ((ue = t.tooltip) == null ? void 0 : ue.show) === !1 ? void 0 : yr({
        format: n,
        // Multi-stack percent shares are per STACK, not per category, so the
        // row carries its own share and the generic denominator is bypassed.
        percentShare: c && !g,
        value: c && g ? (_) => {
          const A = _.share;
          return typeof A == "number" ? yt(A) : "";
        } : void 0,
        // A multi-stack mark groups by STACK, so grouped focus yields one point
        // per stack; expand back to every series of the focused category.
        expand: g ? (_) => b.get(_.i) ?? [_] : void 0,
        colorOf: g ? (_) => v.get(_.label) ?? "var(--chart-1)" : void 0,
        indicator: (P = t.tooltip) == null ? void 0 : P.indicator,
        showTotal: (M = t.tooltip) == null ? void 0 : M.showTotal
      }),
      keyboard: !0
    });
  }, [e, t, n, o, r]), a = e.series.map(Nn).join(", ") || "Bar chart";
  return /* @__PURE__ */ l(kt, { definition: i, ariaLabel: a, className: "cv-chart--fill" });
}
function qd({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var d;
  const o = t.familyOptions ?? {}, i = o.chrome === "none", a = w.useMemo(
    () => i ? null : Rs(e, t),
    [e, t, i]
  ), s = w.useMemo(() => tr(a, n), [a, n]), c = (d = t.axes) == null ? void 0 : d.x, u = w.useMemo(
    () => c != null && c.tickFormat ? tr(a, Xe(n, c)) : s,
    [a, n, c, s]
  ), m = _s(a, {
    label: s,
    ariaLabel: "Time range"
  }), f = w.useMemo(() => {
    var N, F, E, V, O, $, T, D, z;
    const g = ei(a), h = o.connectNulls ?? !1, v = o.curve ?? "monotone", b = _n(v), S = ti(e, t), x = Xt((N = t.axes) == null ? void 0 : N.y), k = e.categories.length <= 1, R = e.series.map((H) => {
      var J, Z, ne;
      const L = dt(e, { series: [H], skipNull: h, temporal: a });
      return dr(L, {
        id: `cv-line-${H.key}`,
        x: g,
        y: "value",
        z: "label",
        color: "label",
        key: "i",
        curve: b,
        strokeWidth: r.lineWidth,
        strokeDasharray: (J = H.meta) != null && J.companion ? "5 4" : void 0,
        strokeOpacity: (Z = H.meta) != null && Z.companion ? 0.55 : void 0,
        stroke: ut(H),
        points: !i && !((ne = H.meta) != null && ne.companion) && (xs(H, o.dots) || k)
      });
    });
    return i || (R.push(
      ...ii(o.referenceLines, (a == null ? void 0 : a.dates) ?? e.categories, {
        valueAnchor: ai(e)
      }),
      ...Ms(
        o.showValueLabels ? dt(e, { skipNull: !0, temporal: a }) : [],
        n,
        { temporal: a }
      )
    ), R.push(qa({ x: {}, y: !1, marker: o.dots !== !1 }))), Ct({
      marks: R,
      x: {
        scale: Ns(a),
        axis: i || (E = (F = t.axes) == null ? void 0 : F.x) != null && E.hide ? !1 : {
          label: S.x,
          ticks: { format: u }
        }
      },
      y: {
        scale: x.scale,
        nice: x.nice,
        grid: !i,
        axis: i || (O = (V = t.axes) == null ? void 0 : V.y) != null && O.hide ? !1 : {
          label: S.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only.
            format: (H) => {
              var L, J, Z, ne;
              return Xe(n, (L = t.axes) == null ? void 0 : L.y).value(
                H,
                ((Z = (J = e.series[0]) == null ? void 0 : J.meta) == null ? void 0 : Z.measure) ?? ((ne = e.series[0]) == null ? void 0 : ne.key),
                "axis"
              );
            }
          }
        }
      },
      guides: !i,
      color: Zo(e, {
        legend: !i && $n(t) && e.series.length > 1,
        legendPlacement: on(($ = t.legend) == null ? void 0 : $.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: i || ((T = t.tooltip) == null ? void 0 : T.show) === !1 ? void 0 : yr({
        format: n,
        category: s,
        indicator: (D = t.tooltip) == null ? void 0 : D.indicator,
        showTotal: (z = t.tooltip) == null ? void 0 : z.showTotal
      }),
      margin: i ? 4 : void 0,
      keyboard: !i,
      controls: m
    });
  }, [e, t, n, o, r, i, a, s, u, m]), p = e.series.map(Nn).join(", ") || "Line chart";
  return /* @__PURE__ */ l(
    kt,
    {
      definition: f,
      ariaLabel: p,
      sparkline: i,
      className: i ? void 0 : "cv-chart--fill"
    }
  );
}
function Wd({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var v, b, S;
  const o = t.familyOptions ?? {}, i = ((b = (v = t.mapping) == null ? void 0 : v.series) == null ? void 0 : b.mode) === "pivot", a = t.stackMode ?? (i ? "stacked" : "none"), s = a === "stacked" || a === "percent", c = a === "percent", u = w.useMemo(() => Rs(e, t), [e, t]), m = w.useMemo(() => tr(u, n), [u, n]), f = (S = t.axes) == null ? void 0 : S.x, p = w.useMemo(
    () => f != null && f.tickFormat ? tr(u, Xe(n, f)) : m,
    [u, n, f, m]
  ), d = _s(u, { label: m, ariaLabel: "Time range" }), g = w.useMemo(() => {
    var le, fe, Q, pe, ye, G, oe, ue, P;
    const x = ei(u), k = o.connectNulls ?? !1, R = o.curve ?? "monotone", N = _n(R), F = r.areaFillOpacity, E = r.stackedAreaFillOpacity, V = r.lineWidth, O = ti(e, t), $ = Xt((le = t.axes) == null ? void 0 : le.y), T = ni(e.series[0]), D = e.series.filter((M) => {
      var _;
      return !((_ = M.meta) != null && _.companion);
    }), z = c ? [] : e.series.filter((M) => {
      var _;
      return (_ = M.meta) == null ? void 0 : _.companion;
    }), H = new Map(e.series.map((M) => [M.key, ut(M)])), L = [], J = (M) => `cv-area-fill-${M.replace(/[^a-zA-Z0-9_-]/g, "-")}`, Z = s ? void 0 : D.map((M) => ({
      id: J(M.key),
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0,
      stops: [
        { offset: 0, color: ut(M), opacity: F * 0.15 },
        { offset: 1, color: ut(M), opacity: F }
      ]
    }));
    if (s)
      for (const { stackId: M, series: _ } of Cs(D)) {
        const A = dt(e, { series: _, skipNull: k, temporal: u });
        L.push(
          to(A, {
            id: M ? `cv-area-stack-${M}` : "cv-area-stack",
            x,
            y: "value",
            z: "label",
            color: "label",
            // "i" alone collides across series inside a single multi-series mark.
            key: (j) => `${j.key}:${j.i}`,
            curve: N,
            fillOpacity: E,
            // Boundary stroke; evaluated from each z-group's first row → per-series color.
            stroke: (j) => H.get(j.key) ?? "currentColor",
            strokeWidth: V,
            layout: c ? ja({ offset: "normalize" }) : void 0
          })
        );
      }
    else
      for (const M of D) {
        const _ = dt(e, { series: [M], skipNull: k, temporal: u });
        L.push(
          to(_, {
            id: `cv-area-${M.key}`,
            x,
            y: "value",
            y1: 0,
            z: "label",
            color: "label",
            key: "i",
            curve: N,
            fill: `url(#${J(M.key)})`,
            // The gradient stops already carry the intended ramp, but areaY
            // defaults `fillOpacity` to 0.2 and MULTIPLIES it in — which divided
            // the ramp by five and left only the stroke visible, i.e. an area
            // that read as a line. Opt out explicitly.
            fillOpacity: 1,
            stroke: ut(M),
            strokeWidth: V
          })
        );
      }
    for (const M of z) {
      const _ = dt(e, { series: [M], skipNull: k, temporal: u });
      L.push(
        dr(_, {
          id: `cv-area-prev-${M.key}`,
          x,
          y: "value",
          z: "label",
          color: "label",
          key: "i",
          curve: N,
          strokeWidth: V,
          strokeDasharray: "5 4",
          strokeOpacity: 0.55,
          stroke: ut(M)
        })
      );
    }
    const ne = new Set(
      D.filter((M) => xs(M, o.dots)).map((M) => M.key)
    );
    if (ne.size > 0) {
      const M = s ? uo(e, D, { normalize: c, temporal: u }).filter(
        (_) => ne.has(_.key) && _.value !== null
      ) : dt(e, {
        series: D.filter((_) => ne.has(_.key)),
        skipNull: !0,
        temporal: u
      });
      L.push(
        Ba(M, {
          id: "cv-area-dots",
          x,
          y: (_) => s ? _.y2 ?? null : _.value,
          z: "label",
          color: "label",
          key: (_) => `${_.key}:${_.i}`,
          r: 3
        })
      );
    }
    return L.push(
      ...ii(o.referenceLines, (u == null ? void 0 : u.dates) ?? e.categories, {
        valueAnchor: ai(e)
      })
    ), L.push(qa({ x: {}, y: !1, marker: !0 })), Ct({
      marks: L,
      gradients: Z,
      x: {
        scale: Ns(u),
        axis: (Q = (fe = t.axes) == null ? void 0 : fe.x) != null && Q.hide ? !1 : {
          label: O.x,
          ticks: { format: p }
        }
      },
      y: {
        scale: $.scale,
        nice: $.nice,
        grid: !0,
        axis: (ye = (pe = t.axes) == null ? void 0 : pe.y) != null && ye.hide ? !1 : {
          label: O.y,
          ticks: {
            // `axes.y.tickFormat` re-binds the formatter for the value ticks only
            // (percent geometry stays a local 0..1 tick, as before).
            format: (M) => {
              var _;
              return c ? yt(M) : Xe(n, (_ = t.axes) == null ? void 0 : _.y).value(M, T, "axis");
            }
          }
        }
      },
      color: Zo(e, {
        legend: $n(t) && e.series.length > 1,
        legendPlacement: on((G = t.legend) == null ? void 0 : G.position)
      }),
      focus: "group-x",
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: ((oe = t.tooltip) == null ? void 0 : oe.show) === !1 ? void 0 : yr({
        format: n,
        percentShare: c,
        category: m,
        indicator: (ue = t.tooltip) == null ? void 0 : ue.indicator,
        showTotal: (P = t.tooltip) == null ? void 0 : P.showTotal
      }),
      keyboard: !0,
      controls: d
    });
  }, [e, t, n, o, r, s, c, u, m, p, d]), h = e.series.map(Nn).join(", ") || "Area chart";
  return /* @__PURE__ */ l(kt, { definition: g, ariaLabel: h, className: "cv-chart--fill" });
}
const Ud = 0.26, Kd = 0.03, na = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Yd({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  var g, h;
  const o = t.familyOptions ?? {}, i = e.series[0], a = ni(i), s = (h = (g = t.colors) == null ? void 0 : g.ramp) != null && h.length ? t.colors.ramp : Cr, c = w.useMemo(() => {
    const v = e.categories.map((b, S) => ({
      label: n.category(b),
      value: (i == null ? void 0 : i.data[S]) ?? 0
    }));
    return Qd(v, o.maxSlices).map((b, S) => ({
      ...b,
      token: s[S % s.length]
    }));
  }, [e, n, i, o.maxSlices, s]), u = c.reduce((v, b) => v + b.value, 0), m = c.some((v) => v.value < 0), f = m || c.length === 0 || u <= 0, p = w.useMemo(() => {
    var O, $, T;
    if (f) return null;
    const v = (o.innerRadiusPct ?? 0) / 100, b = v > 0, S = o.showLabels ?? "percent", x = S !== "none", k = x ? Math.min(r.pieRadiusPct / 100, 1 - Ud) : r.pieRadiusPct / 100, R = bu(c, {
      value: "value",
      gapAngle: r.pieGapAngle * Math.PI / 180
    }), F = [oo(R, {
      id: "cv-pie-arcs",
      key: "label",
      color: "label",
      innerRadius: ({ radius: D }) => D * v,
      outerRadius: ({ radius: D }) => D * k,
      cornerRadius: r.pieCornerRadius
    })];
    if (x) {
      const D = (z) => S === "name" ? z.label : S === "value" ? n.value(z.value, a, "label") : yt(z.fraction);
      F.push(
        Pr(
          // Slivers are skipped: their labels land on top of their neighbours' and
          // the pile is less readable than the gap. The slice is still in the legend
          // and still in the tooltip, so nothing is hidden — only uncrowded.
          R.filter((z) => z.value > 0 && z.fraction >= Kd),
          {
            id: "cv-pie-labels",
            key: "label",
            angle: (z) => z.angle,
            radius: k,
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
    if (b && o.centerLabel) {
      const D = o.centerLabel.value === void 0 || o.centerLabel.value === "total" ? n.value(u, a, "label") : o.centerLabel.value;
      if (F.push(
        Pr([{ id: "cv-pie-center" }], {
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
      ), o.centerLabel.label) {
        const z = o.centerLabel.label;
        F.push(
          Pr([{ id: "cv-pie-center-sub" }], {
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
    const E = {
      domain: c.map((D) => D.label),
      range: c.map((D) => `var(--${D.token})`)
    };
    $n(t) && (E.legend = zo({ placement: on((O = t.legend) == null ? void 0 : O.position) }));
    const V = i ? i.label || i.key : "";
    return Ct({
      marks: [
        os({
          inset: 4,
          // radialText maps its channels through the container's polar scales,
          // which must be CONFIGURED instances: identity radians for angle
          // (domain [0,2π] ⇒ default range [startAngle,endAngle] = [0,2π]) and
          // radius as a fraction of the layout radius (domain [0,1] ⇒ [0,r]px).
          angle: { scale: Wn().domain([0, Math.PI * 2]) },
          radius: { scale: Wn().domain([0, 1]) },
          marks: F
        })
      ],
      x: null,
      y: null,
      guides: !1,
      color: E,
      // radialArc emits one interaction point per slice at the arc CENTROID
      // (distance-based focus, not full arc geometry) — unbounded focus
      // distance keeps hover-anywhere-in-the-slice resolving to a slice.
      maxFocusDistance: Number.POSITIVE_INFINITY,
      tooltip: (($ = t.tooltip) == null ? void 0 : $.show) === !1 ? void 0 : {
        use: Ho,
        className: ri((T = t.tooltip) == null ? void 0 : T.indicator),
        content: (D) => {
          const z = D[0];
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
    return /* @__PURE__ */ l("div", { style: na, children: "Pie charts can't show negative values" });
  if (!p)
    return /* @__PURE__ */ l("div", { style: na, children: "No data" });
  const d = c.map((v) => v.label).join(", ") || "Pie chart";
  return /* @__PURE__ */ l(kt, { definition: p, ariaLabel: d, className: "cv-chart--fill" });
}
function Qd(e, t) {
  if (!t || e.length <= t) return [...e];
  const n = [...e].sort((i, a) => a.value - i.value), r = n.slice(0, t - 1), o = n.slice(t - 1);
  return [...r, { label: "Other", value: o.reduce((i, a) => i + a.value, 0) }];
}
function Xd({
  data: e,
  options: t,
  format: n,
  theme: r
}) {
  const o = t.familyOptions ?? {}, i = e.raw.annotation, a = (d) => {
    var g, h;
    return ((g = i == null ? void 0 : i.measures[d]) == null ? void 0 : g.shortTitle) ?? ((h = i == null ? void 0 : i.dimensions[d]) == null ? void 0 : h.shortTitle) ?? d;
  }, s = o.x ? a(o.x) : "x", c = o.y ? a(o.y) : "y", u = o.size ? a(o.size) : void 0, m = w.useMemo(() => {
    var H, L, J, Z, ne, le, fe, Q, pe, ye, G, oe, ue, P;
    if (!o.x || !o.y) return null;
    const d = Zd(e.raw.rows, o);
    if (d.length === 0) return null;
    const g = !!o.groupBy, h = [];
    if (g)
      for (const M of d)
        M.group !== void 0 && !h.includes(M.group) && h.push(M.group);
    const [v, b] = r.bubbleAreaRange, S = Math.sqrt(Math.max(v, 0) / Math.PI), x = Math.sqrt(Math.max(b, 0) / Math.PI), k = {
      id: "cv-scatter",
      x: "x",
      y: "y",
      key: "i"
    }, R = (L = (H = t.colors) == null ? void 0 : H.ramp) != null && L.length ? t.colors.ramp : Cr;
    g ? (k.z = "group", k.color = "group") : k.fill = `var(--${R[0]})`, o.size ? (k.r = (M) => M.size ?? 0, k.rScale = { scale: () => Nc().range([S, x]) }) : k.r = 4;
    const N = [Ba(d, k)];
    (J = o.referenceLines) == null || J.forEach((M, _) => {
      const A = `var(--${M.colorToken ?? "muted-foreground"})`, j = { stroke: A, strokeWidth: 1.25, strokeDasharray: "4 4" };
      M.axis === "y" ? (N.push(Ga([M.value], { id: `cv-ref-${_}`, ...j })), M.label && N.push(
        Rn([{ v: M.value, label: M.label }], {
          id: `cv-ref-label-${_}`,
          y: "v",
          text: "label",
          fill: A,
          fontSize: 10,
          dy: -6,
          anchor: "start"
        })
      )) : (N.push(Ha([M.value], { id: `cv-ref-${_}`, ...j })), M.label && N.push(
        Rn([{ v: M.value, label: M.label }], {
          id: `cv-ref-label-${_}`,
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
    g && (F = {
      domain: h,
      range: h.map((M, _) => `var(--${R[_ % R.length]})`)
    }, $n(t) && (F.legend = zo({ placement: on((Z = t.legend) == null ? void 0 : Z.position) })));
    const E = Jt((ne = t.axes) == null ? void 0 : ne.x, s), V = Jt((le = t.axes) == null ? void 0 : le.y, c), O = Xt((fe = t.axes) == null ? void 0 : fe.x), $ = Xt((Q = t.axes) == null ? void 0 : Q.y), T = o.x, D = o.y, z = o.size;
    return Ct({
      marks: N,
      x: {
        scale: O.scale,
        nice: O.nice,
        grid: !0,
        axis: (ye = (pe = t.axes) == null ? void 0 : pe.x) != null && ye.hide ? !1 : {
          label: E,
          // Both scatter axes are quantitative, so each honors its own
          // `tickFormat` FormatOptions override.
          ticks: {
            format: (M) => {
              var _;
              return Xe(n, (_ = t.axes) == null ? void 0 : _.x).value(M, T, "axis");
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
              var _;
              return Xe(n, (_ = t.axes) == null ? void 0 : _.y).value(M, D, "axis");
            }
          }
        }
      },
      color: F,
      // focus: default nearest-point (no mode override) with the default finite
      // maxFocusDistance — a scatter tooltip should track the pointer's dot, not
      // snap across the whole plot like the group-x cartesian families.
      tooltip: ((ue = t.tooltip) == null ? void 0 : ue.show) === !1 ? void 0 : {
        use: Ho,
        className: ri((P = t.tooltip) == null ? void 0 : P.indicator),
        // Structured content like cubeTooltip, but written inline: the
        // focused rows here are raw ScatterRows, not SeriesRows — title is
        // the group value (omitted when ungrouped), one row per member.
        content: (M) => {
          const A = M[0];
          if (!A) return { rows: [] };
          const j = A.datum, q = [
            { label: s, value: n.value(j.x, T, "tooltip") },
            { label: c, value: n.value(j.y, D, "tooltip") }
          ];
          return z && q.push({
            label: u ?? z,
            value: n.value(j.size, z, "tooltip")
          }), { title: j.group, color: A.color, rows: q };
        }
      },
      keyboard: !0
    });
  }, [e, t, n, o, r, s, c, u]), f = o.groupBy, p = (d) => {
    var h;
    if (!d || !f) return null;
    const g = (h = d.datum) == null ? void 0 : h.group;
    return g === void 0 ? null : { member: f, value: g, label: g };
  };
  return m ? /* @__PURE__ */ l(
    kt,
    {
      definition: m,
      ariaLabel: `${s} vs ${c} scatter chart`,
      className: "cv-chart--fill",
      resolveSelection: p
    }
  ) : /* @__PURE__ */ l("div", { style: Jd, children: "No data" });
}
const Jd = {
  display: "flex",
  height: "100%",
  width: "100%",
  minHeight: 200,
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  color: "var(--muted-foreground)"
};
function Zd(e, t) {
  const n = [];
  return e.forEach((r, o) => {
    const i = Tr(r[t.x]), a = Tr(r[t.y]);
    i === null || a === null || n.push({
      x: i,
      y: a,
      size: t.size ? Tr(r[t.size]) : null,
      // "—" mirrors the old grouping of rows whose groupBy value is null.
      group: t.groupBy ? String(r[t.groupBy] ?? "—") : void 0,
      i: o
    });
  }), n;
}
function Tr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function em(e) {
  const t = e.mapping, n = t == null ? void 0 : t.series;
  return !t || !n || n.mode !== "pivot" ? {} : { x: t.category.member, y: n.pivot, value: n.value };
}
function tm(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function nm(e, t, n) {
  const r = n > t ? (e - t) / (n - t) : 1;
  return 0.15 + 0.85 * Math.max(0, Math.min(1, r));
}
function Fs(e, t, n) {
  const r = (o) => {
    const i = typeof o == "number" ? o : Number(o), a = Number.isFinite(i) ? nm(i, e, t) : 0.15;
    return `color-mix(in oklab, var(--${n}) ${Math.round(a * 100)}%, transparent)`;
  };
  return r.copy = () => Fs(e, t, n), r;
}
function rm({
  data: e,
  options: t,
  format: n
}) {
  const r = t.familyOptions ?? {}, { x: o, y: i, value: a } = em(t), s = e.raw.rows, c = e.raw.annotation, u = w.useMemo(() => {
    if (!o || !i || !a || s.length === 0) return [];
    const p = mo(s, o), d = mo(s, i), g = /* @__PURE__ */ new Map();
    return s.forEach((h, v) => {
      const b = tm(h[a]), S = h[p], x = h[d];
      if (b === null || S === null || S === void 0 || x === null || x === void 0)
        return;
      const k = typeof S == "number" ? S : String(S), R = String(x);
      g.set(`${k}\0${R}`, {
        cat: k,
        label: R,
        value: b,
        key: `${k}|${R}`,
        member: a,
        i: v
      });
    }), [...g.values()];
  }, [s, o, i, a]), m = w.useMemo(() => {
    var S, x, k, R, N, F, E, V;
    let p = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY;
    for (const O of u)
      O.value < p && (p = O.value), O.value > d && (d = O.value);
    const g = (O) => {
      if (!O) return;
      const $ = (c == null ? void 0 : c.dimensions[O]) ?? (c == null ? void 0 : c.timeDimensions[O]) ?? (c == null ? void 0 : c.measures[O]);
      return ($ == null ? void 0 : $.shortTitle) ?? ($ == null ? void 0 : $.title) ?? O;
    }, h = Jt((S = t.axes) == null ? void 0 : S.x, g(o)), v = Jt((x = t.axes) == null ? void 0 : x.y, g(i)), b = [
      yc(u, {
        id: "cv-heatmap-cells",
        x: "cat",
        y: "label",
        color: "value",
        key: "key",
        inset: 1,
        radius: 2
      })
    ];
    return u.length > 0 && u.length <= 100 && b.push(
      // Decorative: the in-cell number restates the cell's own value, so it must
      // not emit a second focus point (the tooltip would list the cell twice).
      oi(
        Rn(u, {
          id: "cv-heatmap-values",
          x: "cat",
          y: "label",
          text: (O) => n.value(O.value, O.member, "label"),
          fill: "currentColor",
          fontSize: 10
        })
      )
    ), Ct({
      marks: b,
      x: {
        scale: () => er(0.05),
        axis: (R = (k = t.axes) == null ? void 0 : k.x) != null && R.hide ? !1 : {
          label: h,
          // The column axis is the CATEGORY axis, so `axes.x.tickFormat` applies
          // to its bucket labels. (`axes.*.scale`/`domain` do not: both heatmap
          // axes are band scales and the value is a color, not a position.)
          ticks: {
            format: (O) => {
              var $;
              return Xe(n, ($ = t.axes) == null ? void 0 : $.x).category(O);
            }
          }
        }
      },
      y: {
        scale: () => er(0.05),
        axis: (F = (N = t.axes) == null ? void 0 : N.y) != null && F.hide ? !1 : {
          label: v,
          ticks: {
            format: (O) => {
              var $;
              return Xe(n, ($ = t.axes) == null ? void 0 : $.y).category(O);
            }
          }
        }
      },
      color: {
        scale: Fs(p, d, r.colorToken ?? "chart-1")
      },
      tooltip: ((E = t.tooltip) == null ? void 0 : E.show) === !1 ? void 0 : yr({ format: n, indicator: (V = t.tooltip) == null ? void 0 : V.indicator })
    });
  }, [u, t, n, r, c, o, i]);
  if (u.length === 0)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const f = `Heatmap of ${a ?? "value"} by ${o ?? "x"} and ${i ?? "y"}`;
  return /* @__PURE__ */ l(kt, { definition: m, ariaLabel: f, className: "cv-chart--fill" });
}
function om(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function im(e) {
  return `cv-kpi-trend--${e}`;
}
function am(e) {
  var c, u, m, f;
  const { data: t, options: n, format: r } = e, o = n.familyOptions ?? {}, i = (p) => r.value(p, o.measure, "kpi"), a = $s([t.raw.rows[0] ?? {}], o.measure), s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[o.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[o.measure]) == null ? void 0 : f.title) ?? o.measure;
  return o.display === "gauge" ? /* @__PURE__ */ l(pm, { value: a, label: s, fmt: i, fo: o }) : /* @__PURE__ */ l(sm, { ...e, value: a, label: s, fo: o, fmt: i });
}
function sm({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var p;
  const o = n.goodDirection ?? ((p = n.comparison) == null ? void 0 : p.goodDirection) ?? "up", i = t === null ? null : vm(e.raw.rows, t, n), a = !!n.comparison, s = a && !i && lm(e.raw.query, n), c = n.sparkline ? e.series[0] : void 0, u = !!c && c.data.some((d) => d !== null), m = i ? i.diff : c ? mm(c) : 0, f = im(om(m, o));
  return /* @__PURE__ */ C("div", { className: "cv-kpi", children: [
    /* @__PURE__ */ C("div", { className: "cv-kpi-body", children: [
      /* @__PURE__ */ l("span", { className: t === null ? "cv-kpi-value cv-kpi-value--empty" : "cv-kpi-value", children: t === null ? "—" : r(t) }),
      a && (i ? /* @__PURE__ */ l(fm, { delta: i, goodDirection: o, fo: n, fmt: r }) : s ? /* @__PURE__ */ l(cm, {}) : /* @__PURE__ */ l(um, {}))
    ] }),
    u && /* @__PURE__ */ l("div", { className: "cv-kpi-sparkline-wrap", children: /* @__PURE__ */ l(dm, { data: e, series: c, colorClass: f }) })
  ] });
}
function lm(e, t) {
  var r, o, i;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (i = (o = e.timeDimensions) == null ? void 0 : o[0]) == null ? void 0 : i.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((a) => !a) : String(n).trim() === "";
}
function cm() {
  return /* @__PURE__ */ C(
    "span",
    {
      className: "cv-kpi-chip cv-kpi-hint",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ l(Ya, {}),
        /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "set a date range to compare" })
      ]
    }
  );
}
function um() {
  return /* @__PURE__ */ C("span", { className: "cv-kpi-chip cv-kpi-nodata", title: "No data in the comparison period", children: [
    /* @__PURE__ */ l(Ka, {}),
    /* @__PURE__ */ l("span", { className: "cv-kpi-chip-label", children: "no prior data" })
  ] });
}
function dm({
  data: e,
  series: t,
  colorClass: n
}) {
  const r = w.useMemo(() => {
    const o = dt(e, { series: [t], skipNull: !0 }), i = Xt(void 0);
    return Ct({
      marks: [
        // The area's own stroke outlines the WHOLE closed path (baseline and
        // sides included) — a boxed look. Fill-only area + a lineY overlay
        // strokes just the top edge, matching the old sparkline.
        to(o, {
          id: "cv-kpi-spark",
          x: "cat",
          y2: "value",
          y1: 0,
          key: "i",
          curve: _n("monotone"),
          fill: "currentColor",
          fillOpacity: 0.15
        }),
        dr(o, {
          id: "cv-kpi-spark-line",
          x: "cat",
          y: "value",
          key: "i",
          curve: _n("monotone"),
          stroke: "currentColor",
          strokeWidth: 1.75
        })
      ],
      x: { scale: Ss, axis: !1 },
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
function mm(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function fm({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var m;
  const o = e.diff > 0, i = e.diff === 0, a = i ? !0 : o === (t === "up"), s = i ? Ka : o ? Go : jo, c = (m = n.comparison) != null && m.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
const dn = -(2 * Math.PI) / 3, fo = 2 * Math.PI / 3, gm = fo - dn;
function pm({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, f;
  const o = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, i = ((f = r.gauge) == null ? void 0 : f.max) ?? Math.max(e ?? 0, 1), a = i > o ? i : o + 1, s = e === null ? o : Math.max(o, Math.min(a, e)), c = (e === null ? void 0 : hm(e, r)) ?? "chart-1", u = w.useMemo(() => {
    const p = (s - o) / (a - o), d = dn + p * gm, g = ({ radius: b }) => b * 0.7, h = oo([{ startAngle: dn, endAngle: fo }], {
      id: "cv-gauge-track",
      innerRadius: g,
      cornerRadius: 8,
      fill: "var(--muted)"
    }), v = p > 0 ? [
      h,
      oo([{ startAngle: dn, endAngle: d }], {
        id: "cv-gauge-value",
        innerRadius: g,
        cornerRadius: 8,
        fill: `var(--${c})`
      })
    ] : [h];
    return Ct({
      marks: [
        os({
          id: "cv-gauge",
          startAngle: dn,
          endAngle: fo,
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
function hm(e, t) {
  var o;
  const n = (o = t.gauge) == null ? void 0 : o.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const i of [...n].sort((a, s) => a.at - s.at))
    e >= i.at && (r = i.colorToken);
  return r;
}
function $s(e, t) {
  for (const n of e) {
    const r = As(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function vm(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let o = null;
  if (r.mode === "value")
    typeof r.value == "number" ? o = r.value : typeof r.value == "string" && (o = $s(e, r.value));
  else {
    const s = e[1];
    o = s ? As(s[n.measure]) : null;
  }
  if (o === null) return null;
  const i = t - o, a = o !== 0 ? i / o : null;
  return { current: t, baseline: o, diff: i, pct: a };
}
function As(e) {
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
function br(e) {
  return e instanceof Function;
}
function ym(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function bm(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const a = t(i);
      a != null && a.length && r(a);
    });
  };
  return r(e), n;
}
function W(e, t, n) {
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
      const m = Math.round((Date.now() - a) * 100) / 100, f = Math.round((Date.now() - u) * 100) / 100, p = f / 16, d = (g, h) => {
        for (g = String(g); g.length < h; )
          g = " " + g;
        return g;
      };
      console.info(`%c⏱ ${d(f, 5)} /${d(m, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * p, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
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
function wm(e, t, n, r) {
  const o = () => {
    var a;
    return (a = i.getValue()) != null ? a : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: W(() => [e, n, t, i], (a, s, c, u) => ({
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
function Cm(e, t, n, r) {
  var o, i;
  const s = {
    ...e._getDefaultColumnDef(),
    ...t
  }, c = s.accessorKey;
  let u = (o = (i = s.id) != null ? i : c ? typeof String.prototype.replaceAll == "function" ? c.replaceAll(".", "_") : c.replace(/\./g, "_") : void 0) != null ? o : typeof s.header == "string" ? s.header : void 0, m;
  if (s.accessorFn ? m = s.accessorFn : c && (c.includes(".") ? m = (p) => {
    let d = p;
    for (const h of c.split(".")) {
      var g;
      d = (g = d) == null ? void 0 : g[h], process.env.NODE_ENV !== "production" && d === void 0 && console.warn(`"${h}" in deeply nested key "${c}" returned undefined.`);
    }
    return d;
  } : m = (p) => p[s.accessorKey]), !u)
    throw process.env.NODE_ENV !== "production" ? new Error(s.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let f = {
    id: `${String(u)}`,
    accessorFn: m,
    parent: r,
    depth: n,
    columnDef: s,
    columns: [],
    getFlatColumns: W(() => [!0], () => {
      var p;
      return [f, ...(p = f.columns) == null ? void 0 : p.flatMap((d) => d.getFlatColumns())];
    }, U(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: W(() => [e._getOrderColumnsFn()], (p) => {
      var d;
      if ((d = f.columns) != null && d.length) {
        let g = f.columns.flatMap((h) => h.getLeafColumns());
        return p(g);
      }
      return [f];
    }, U(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const p of e._features)
    p.createColumn == null || p.createColumn(f, e);
  return f;
}
const xe = "debugHeaders";
function ra(e, t, n) {
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
const Sm = {
  createTable: (e) => {
    e.getHeaderGroups = W(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, a;
      const s = (i = r == null ? void 0 : r.map((f) => n.find((p) => p.id === f)).filter(Boolean)) != null ? i : [], c = (a = o == null ? void 0 : o.map((f) => n.find((p) => p.id === f)).filter(Boolean)) != null ? a : [], u = n.filter((f) => !(r != null && r.includes(f.id)) && !(o != null && o.includes(f.id)));
      return Pn(t, [...s, ...u, ...c], e);
    }, U(e.options, xe, "getHeaderGroups")), e.getCenterHeaderGroups = W(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Pn(t, n, e, "center")), U(e.options, xe, "getCenterHeaderGroups")), e.getLeftHeaderGroups = W(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Pn(t, i, e, "left");
    }, U(e.options, xe, "getLeftHeaderGroups")), e.getRightHeaderGroups = W(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((a) => n.find((s) => s.id === a)).filter(Boolean)) != null ? o : [];
      return Pn(t, i, e, "right");
    }, U(e.options, xe, "getRightHeaderGroups")), e.getFooterGroups = W(() => [e.getHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getFooterGroups")), e.getLeftFooterGroups = W(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getLeftFooterGroups")), e.getCenterFooterGroups = W(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getCenterFooterGroups")), e.getRightFooterGroups = W(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), U(e.options, xe, "getRightFooterGroups")), e.getFlatHeaders = W(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getFlatHeaders")), e.getLeftFlatHeaders = W(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getLeftFlatHeaders")), e.getCenterFlatHeaders = W(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getCenterFlatHeaders")), e.getRightFlatHeaders = W(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), U(e.options, xe, "getRightFlatHeaders")), e.getCenterLeafHeaders = W(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), U(e.options, xe, "getCenterLeafHeaders")), e.getLeftLeafHeaders = W(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), U(e.options, xe, "getLeftLeafHeaders")), e.getRightLeafHeaders = W(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), U(e.options, xe, "getRightLeafHeaders")), e.getLeafHeaders = W(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, a, s, c, u;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(a = (s = n[0]) == null ? void 0 : s.headers) != null ? a : [], ...(c = (u = r[0]) == null ? void 0 : u.headers) != null ? c : []].map((m) => m.getLeafHeaders()).flat();
    }, U(e.options, xe, "getLeafHeaders"));
  }
};
function Pn(e, t, n, r) {
  var o, i;
  let a = 0;
  const s = function(p, d) {
    d === void 0 && (d = 1), a = Math.max(a, d), p.filter((g) => g.getIsVisible()).forEach((g) => {
      var h;
      (h = g.columns) != null && h.length && s(g.columns, d + 1);
    }, 0);
  };
  s(e);
  let c = [];
  const u = (p, d) => {
    const g = {
      depth: d,
      id: [r, `${d}`].filter(Boolean).join("_"),
      headers: []
    }, h = [];
    p.forEach((v) => {
      const b = [...h].reverse()[0], S = v.column.depth === g.depth;
      let x, k = !1;
      if (S && v.column.parent ? x = v.column.parent : (x = v.column, k = !0), b && (b == null ? void 0 : b.column) === x)
        b.subHeaders.push(v);
      else {
        const R = ra(n, x, {
          id: [r, d, x.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: k,
          placeholderId: k ? `${h.filter((N) => N.column === x).length}` : void 0,
          depth: d,
          index: h.length
        });
        R.subHeaders.push(v), h.push(R);
      }
      g.headers.push(v), v.headerGroup = g;
    }), c.push(g), d > 0 && u(h, d - 1);
  }, m = t.map((p, d) => ra(n, p, {
    depth: a,
    index: d
  }));
  u(m, a - 1), c.reverse();
  const f = (p) => p.filter((g) => g.column.getIsVisible()).map((g) => {
    let h = 0, v = 0, b = [0];
    g.subHeaders && g.subHeaders.length ? (b = [], f(g.subHeaders).forEach((x) => {
      let {
        colSpan: k,
        rowSpan: R
      } = x;
      h += k, b.push(R);
    })) : h = 1;
    const S = Math.min(...b);
    return v = v + S, g.colSpan = h, g.rowSpan = v, {
      colSpan: h,
      rowSpan: v
    };
  });
  return f((o = (i = c[0]) == null ? void 0 : i.headers) != null ? o : []), c;
}
const si = (e, t, n, r, o, i, a) => {
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
    getLeafRows: () => bm(s.subRows, (c) => c.subRows),
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
    getAllCells: W(() => [e.getAllLeafColumns()], (c) => c.map((u) => wm(e, s, u, u.id)), U(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: W(() => [s.getAllCells()], (c) => c.reduce((u, m) => (u[m.column.id] = m, u), {}), U(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let c = 0; c < e._features.length; c++) {
    const u = e._features[c];
    u == null || u.createRow == null || u.createRow(s, e);
  }
  return s;
}, km = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Os = (e, t, n) => {
  var r, o;
  const i = n == null || (r = n.toString()) == null ? void 0 : r.toLowerCase();
  return !!(!((o = e.getValue(t)) == null || (o = o.toString()) == null || (o = o.toLowerCase()) == null) && o.includes(i));
};
Os.autoRemove = (e) => Ye(e);
const Is = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Is.autoRemove = (e) => Ye(e);
const Ps = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Ps.autoRemove = (e) => Ye(e);
const Ts = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Ts.autoRemove = (e) => Ye(e);
const Ds = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Ds.autoRemove = (e) => Ye(e) || !(e != null && e.length);
const Es = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Es.autoRemove = (e) => Ye(e) || !(e != null && e.length);
const Ls = (e, t, n) => e.getValue(t) === n;
Ls.autoRemove = (e) => Ye(e);
const Vs = (e, t, n) => e.getValue(t) == n;
Vs.autoRemove = (e) => Ye(e);
const li = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
li.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, a = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > a) {
    const s = i;
    i = a, a = s;
  }
  return [i, a];
};
li.autoRemove = (e) => Ye(e) || Ye(e[0]) && Ye(e[1]);
const tt = {
  includesString: Os,
  includesStringSensitive: Is,
  equalsString: Ps,
  arrIncludes: Ts,
  arrIncludesAll: Ds,
  arrIncludesSome: Es,
  equals: Ls,
  weakEquals: Vs,
  inNumberRange: li
};
function Ye(e) {
  return e == null || e === "";
}
const Rm = {
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
      return br(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
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
        if (oa(o, a, e)) {
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
            if (oa(c, a.value, s))
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
function oa(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Nm = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), _m = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, xm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Mm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const a = i.getValue(e);
    a != null && (r === void 0 ? a >= a && (r = o = a) : (r > a && (r = a), o < a && (o = a)));
  }), [r, o];
}, Fm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n) return r / n;
}, $m = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!ym(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, a) => i - a);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, Am = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), Om = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Im = (e, t) => t.length, Dr = {
  sum: Nm,
  min: _m,
  max: xm,
  extent: Mm,
  mean: Fm,
  median: $m,
  unique: Am,
  uniqueCount: Om,
  count: Im
}, Pm = {
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
        return Dr.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return Dr.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return br(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : Dr[e.columnDef.aggregationFn];
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
function Tm(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((a) => a.id === i)).filter(Boolean), ...r];
}
const Dm = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: De("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = W((n) => [bn(t, n)], (n) => n.findIndex((r) => r.id === e.id), U(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = bn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = bn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = W(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
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
      return Tm(i, n, r);
    }, U(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Er = () => ({
  left: [],
  right: []
}), Em = {
  getInitialState: (e) => ({
    columnPinning: Er(),
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
    e.getCenterVisibleCells = W(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((a) => !i.includes(a.column.id));
    }, U(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = W(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), U(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = W(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((a) => a.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), U(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? Er() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : Er());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = W(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), U(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = W(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), U(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = W(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, U(e.options, "debugColumns", "getCenterLeafColumns"));
  }
};
function Lm(e) {
  return e || (typeof document < "u" ? document : null);
}
const Tn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Lr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Vm = {
  getDefaultColumnDef: () => Tn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Lr(),
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
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Tn.minSize, (r = i ?? e.columnDef.size) != null ? r : Tn.size), (o = e.columnDef.maxSize) != null ? o : Tn.maxSize);
    }, e.getStart = W((n) => [n, bn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), U(t.options, "debugColumns", "getStart")), e.getAfter = W((n) => [n, bn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), U(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!r || !o || (i.persist == null || i.persist(), Vr(i) && i.touches && i.touches.length > 1))
          return;
        const a = e.getSize(), s = e ? e.getLeafHeaders().map((b) => [b.column.id, b.column.getSize()]) : [[r.id, r.getSize()]], c = Vr(i) ? Math.round(i.touches[0].clientX) : i.clientX, u = {}, m = (b, S) => {
          typeof S == "number" && (t.setColumnSizingInfo((x) => {
            var k, R;
            const N = t.options.columnResizeDirection === "rtl" ? -1 : 1, F = (S - ((k = x == null ? void 0 : x.startOffset) != null ? k : 0)) * N, E = Math.max(F / ((R = x == null ? void 0 : x.startSize) != null ? R : 0), -0.999999);
            return x.columnSizingStart.forEach((V) => {
              let [O, $] = V;
              u[O] = Math.round(Math.max($ + $ * E, 0) * 100) / 100;
            }), {
              ...x,
              deltaOffset: F,
              deltaPercentage: E
            };
          }), (t.options.columnResizeMode === "onChange" || b === "end") && t.setColumnSizing((x) => ({
            ...x,
            ...u
          })));
        }, f = (b) => m("move", b), p = (b) => {
          m("end", b), t.setColumnSizingInfo((S) => ({
            ...S,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, d = Lm(n), g = {
          moveHandler: (b) => f(b.clientX),
          upHandler: (b) => {
            d == null || d.removeEventListener("mousemove", g.moveHandler), d == null || d.removeEventListener("mouseup", g.upHandler), p(b.clientX);
          }
        }, h = {
          moveHandler: (b) => (b.cancelable && (b.preventDefault(), b.stopPropagation()), f(b.touches[0].clientX), !1),
          upHandler: (b) => {
            var S;
            d == null || d.removeEventListener("touchmove", h.moveHandler), d == null || d.removeEventListener("touchend", h.upHandler), b.cancelable && (b.preventDefault(), b.stopPropagation()), p((S = b.touches[0]) == null ? void 0 : S.clientX);
          }
        }, v = zm() ? {
          passive: !1
        } : !1;
        Vr(i) ? (d == null || d.addEventListener("touchmove", h.moveHandler, v), d == null || d.addEventListener("touchend", h.upHandler, v)) : (d == null || d.addEventListener("mousemove", g.moveHandler, v), d == null || d.addEventListener("mouseup", g.upHandler, v)), t.setColumnSizingInfo((b) => ({
          ...b,
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
      e.setColumnSizingInfo(t ? Lr() : (n = e.initialState.columnSizingInfo) != null ? n : Lr());
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
let Dn = null;
function zm() {
  if (typeof Dn == "boolean") return Dn;
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
  return Dn = e, Dn;
}
function Vr(e) {
  return e.type === "touchstart";
}
const Hm = {
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
    e._getAllVisibleCells = W(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), U(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = W(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], U(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => W(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), U(e.options, "debugColumns", n));
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
function bn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Gm = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, jm = {
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
      return br(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : tt[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, Bm = {
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
}, go = 0, po = 10, zr = () => ({
  pageIndex: go,
  pageSize: po
}), qm = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...zr(),
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
      e.setPagination(r ? zr() : (o = e.initialState.pagination) != null ? o : zr());
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
      e.setPageIndex(r ? go : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : go);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? po : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : po);
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
    }), e.getPageOptions = W(() => [e.getPageCount()], (r) => {
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
}, Hr = () => ({
  top: [],
  bottom: []
}), Wm = {
  getInitialState: (e) => ({
    rowPinning: Hr(),
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
          var f, p;
          return {
            top: ((f = c == null ? void 0 : c.top) != null ? f : []).filter((h) => !(s != null && s.has(h))),
            bottom: [...((p = c == null ? void 0 : c.bottom) != null ? p : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)]
          };
        }
        if (n === "top") {
          var d, g;
          return {
            top: [...((d = c == null ? void 0 : c.top) != null ? d : []).filter((h) => !(s != null && s.has(h))), ...Array.from(s)],
            bottom: ((g = c == null ? void 0 : c.bottom) != null ? g : []).filter((h) => !(s != null && s.has(h)))
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
      return e.setRowPinning(t ? Hr() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Hr());
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
    }, e.getTopRows = W(() => [e.getRowModel().rows, e.getState().rowPinning.top], (t, n) => e._getPinnedRows(t, n, "top"), U(e.options, "debugRows", "getTopRows")), e.getBottomRows = W(() => [e.getRowModel().rows, e.getState().rowPinning.bottom], (t, n) => e._getPinnedRows(t, n, "bottom"), U(e.options, "debugRows", "getBottomRows")), e.getCenterRows = W(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, U(e.options, "debugRows", "getCenterRows"));
  }
}, Um = {
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
        ho(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = W(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Gr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, U(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = W(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Gr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, U(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = W(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Gr(e, n) : {
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
        return ho(s, e.id, n, (a = r == null ? void 0 : r.selectChildren) != null ? a : !0, t), s;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return ci(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return vo(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return vo(e, n) === "all";
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
}, ho = (e, t, n, r, o) => {
  var i;
  const a = o.getRow(t, !0);
  n ? (a.getCanMultiSelect() || Object.keys(e).forEach((s) => delete e[s]), a.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = a.subRows) != null && i.length && a.getCanSelectSubRows() && a.subRows.forEach((s) => ho(e, s.id, n, r, o));
};
function Gr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(a, s) {
    return a.map((c) => {
      var u;
      const m = ci(c, n);
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
function ci(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function vo(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length)) return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((a) => {
    if (!(i && !o) && (a.getCanSelect() && (ci(a, t) ? i = !0 : o = !1), a.subRows && a.subRows.length)) {
      const s = vo(a, t);
      s === "all" ? i = !0 : (s === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const yo = /([0-9]+)/gm, Km = (e, t, n) => zs(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), Ym = (e, t, n) => zs(bt(e.getValue(n)), bt(t.getValue(n))), Qm = (e, t, n) => ui(bt(e.getValue(n)).toLowerCase(), bt(t.getValue(n)).toLowerCase()), Xm = (e, t, n) => ui(bt(e.getValue(n)), bt(t.getValue(n))), Jm = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, Zm = (e, t, n) => ui(e.getValue(n), t.getValue(n));
function ui(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function bt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function zs(e, t) {
  const n = e.split(yo).filter(Boolean), r = t.split(yo).filter(Boolean);
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
const ln = {
  alphanumeric: Km,
  alphanumericCaseSensitive: Ym,
  text: Qm,
  textCaseSensitive: Xm,
  datetime: Jm,
  basic: Zm
}, ef = {
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
          return ln.datetime;
        if (typeof i == "string" && (r = !0, i.split(yo).length > 1))
          return ln.alphanumeric;
      }
      return r ? ln.text : ln.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return br(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : ln[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((a) => {
        const s = a == null ? void 0 : a.find((d) => d.id === e.id), c = a == null ? void 0 : a.findIndex((d) => d.id === e.id);
        let u = [], m, f = i ? n : o === "desc";
        if (a != null && a.length && e.getCanMultiSort() && r ? s ? m = "toggle" : m = "add" : a != null && a.length && c !== a.length - 1 ? m = "replace" : s ? m = "toggle" : m = "replace", m === "toggle" && (i || o || (m = "remove")), m === "add") {
          var p;
          u = [...a, {
            id: e.id,
            desc: f
          }], u.splice(0, u.length - ((p = t.options.maxMultiSortColCount) != null ? p : Number.MAX_SAFE_INTEGER));
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
}, tf = [
  Sm,
  Hm,
  Dm,
  Em,
  km,
  Rm,
  Gm,
  //depends on ColumnFaceting
  jm,
  //depends on ColumnFiltering
  ef,
  Pm,
  //depends on RowSorting
  Bm,
  qm,
  Wm,
  Um,
  Vm
];
function nf(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...tf, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((p, d) => Object.assign(p, d.getDefaultOptions == null ? void 0 : d.getDefaultOptions(o)), {}), a = (p) => o.options.mergeOptions ? o.options.mergeOptions(i, p) : {
    ...i,
    ...p
  };
  let c = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((p) => {
    var d;
    c = (d = p.getInitialState == null ? void 0 : p.getInitialState(c)) != null ? d : c;
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
    _queue: (p) => {
      u.push(p), m || (m = !0, Promise.resolve().then(() => {
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
    setOptions: (p) => {
      const d = mt(p, o.options);
      o.options = a(d);
    },
    getState: () => o.options.state,
    setState: (p) => {
      o.options.onStateChange == null || o.options.onStateChange(p);
    },
    _getRowId: (p, d, g) => {
      var h;
      return (h = o.options.getRowId == null ? void 0 : o.options.getRowId(p, d, g)) != null ? h : `${g ? [g.id, d].join(".") : d}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (p, d) => {
      let g = (d ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[p];
      if (!g && (g = o.getCoreRowModel().rowsById[p], !g))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${p}`) : new Error();
      return g;
    },
    _getDefaultColumnDef: W(() => [o.options.defaultColumn], (p) => {
      var d;
      return p = (d = p) != null ? d : {}, {
        header: (g) => {
          const h = g.header.column.columnDef;
          return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (g) => {
          var h, v;
          return (h = (v = g.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? h : null;
        },
        ...o._features.reduce((g, h) => Object.assign(g, h.getDefaultColumnDef == null ? void 0 : h.getDefaultColumnDef()), {}),
        ...p
      };
    }, U(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: W(() => [o._getColumnDefs()], (p) => {
      const d = function(g, h, v) {
        return v === void 0 && (v = 0), g.map((b) => {
          const S = Cm(o, b, v, h), x = b;
          return S.columns = x.columns ? d(x.columns, S, v + 1) : [], S;
        });
      };
      return d(p);
    }, U(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: W(() => [o.getAllColumns()], (p) => p.flatMap((d) => d.getFlatColumns()), U(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: W(() => [o.getAllFlatColumns()], (p) => p.reduce((d, g) => (d[g.id] = g, d), {}), U(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: W(() => [o.getAllColumns(), o._getOrderColumnsFn()], (p, d) => {
      let g = p.flatMap((h) => h.getLeafColumns());
      return d(g);
    }, U(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (p) => {
      const d = o._getAllFlatColumnsById()[p];
      return process.env.NODE_ENV !== "production" && !d && console.error(`[Table] Column with id '${p}' does not exist.`), d;
    }
  };
  Object.assign(o, f);
  for (let p = 0; p < o._features.length; p++) {
    const d = o._features[p];
    d == null || d.createTable == null || d.createTable(o);
  }
  return o;
}
function rf() {
  return (e) => W(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, a) {
      i === void 0 && (i = 0);
      const s = [];
      for (let u = 0; u < o.length; u++) {
        const m = si(e, e._getRowId(o[u], u, a), o[u], u, i, void 0, a == null ? void 0 : a.id);
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
function of(e) {
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
function af(e, t, n) {
  return n.options.filterFromLeafRows ? sf(e, t, n) : lf(e, t, n);
}
function sf(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const m = [];
    for (let p = 0; p < c.length; p++) {
      var f;
      let d = c[p];
      const g = si(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
      if (g.columnFilters = d.columnFilters, (f = d.subRows) != null && f.length && u < a) {
        if (g.subRows = s(d.subRows, u + 1), d = g, t(d) && !g.subRows.length) {
          m.push(d), i[d.id] = d, o.push(d);
          continue;
        }
        if (t(d) || g.subRows.length) {
          m.push(d), i[d.id] = d, o.push(d);
          continue;
        }
      } else
        d = g, t(d) && (m.push(d), i[d.id] = d, o.push(d));
    }
    return m;
  };
  return {
    rows: s(e),
    flatRows: o,
    rowsById: i
  };
}
function lf(e, t, n) {
  var r;
  const o = [], i = {}, a = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, s = function(c, u) {
    u === void 0 && (u = 0);
    const m = [];
    for (let p = 0; p < c.length; p++) {
      let d = c[p];
      if (t(d)) {
        var f;
        if ((f = d.subRows) != null && f.length && u < a) {
          const h = si(n, d.id, d.original, d.index, d.depth, void 0, d.parentId);
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
function cf() {
  return (e) => W(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (t, n, r) => {
    if (!t.rows.length || !(n != null && n.length) && !r) {
      for (let p = 0; p < t.flatRows.length; p++)
        t.flatRows[p].columnFilters = {}, t.flatRows[p].columnFiltersMeta = {};
      return t;
    }
    const o = [], i = [];
    (n ?? []).forEach((p) => {
      var d;
      const g = e.getColumn(p.id);
      if (!g)
        return;
      const h = g.getFilterFn();
      if (!h) {
        process.env.NODE_ENV !== "production" && console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${g.id}.`);
        return;
      }
      o.push({
        id: p.id,
        filterFn: h,
        resolvedValue: (d = h.resolveFilterValue == null ? void 0 : h.resolveFilterValue(p.value)) != null ? d : p.value
      });
    });
    const a = (n ?? []).map((p) => p.id), s = e.getGlobalFilterFn(), c = e.getAllLeafColumns().filter((p) => p.getCanGlobalFilter());
    r && s && c.length && (a.push("__global__"), c.forEach((p) => {
      var d;
      i.push({
        id: p.id,
        filterFn: s,
        resolvedValue: (d = s.resolveFilterValue == null ? void 0 : s.resolveFilterValue(r)) != null ? d : r
      });
    }));
    let u, m;
    for (let p = 0; p < t.flatRows.length; p++) {
      const d = t.flatRows[p];
      if (d.columnFilters = {}, o.length)
        for (let g = 0; g < o.length; g++) {
          u = o[g];
          const h = u.id;
          d.columnFilters[h] = u.filterFn(d, h, u.resolvedValue, (v) => {
            d.columnFiltersMeta[h] = v;
          });
        }
      if (i.length) {
        for (let g = 0; g < i.length; g++) {
          m = i[g];
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
    const f = (p) => {
      for (let d = 0; d < a.length; d++)
        if (p.columnFilters[a[d]] === !1)
          return !1;
      return !0;
    };
    return af(t.rows, f, e);
  }, U(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function uf(e) {
  return (t) => W(() => [t.getState().pagination, t.getPrePaginationRowModel(), t.options.paginateExpandedRows ? void 0 : t.getState().expanded], (n, r) => {
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
    } : f = of({
      rows: a,
      flatRows: s,
      rowsById: c
    }), f.flatRows = [];
    const p = (d) => {
      f.flatRows.push(d), d.subRows.length && d.subRows.forEach(p);
    };
    return f.rows.forEach(p), f;
  }, U(t.options, "debugTable", "getPaginationRowModel"));
}
function df() {
  return (e) => W(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
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
          var p;
          const g = i[d], h = a[g.id], v = h.sortUndefined, b = (p = g == null ? void 0 : g.desc) != null ? p : !1;
          let S = 0;
          if (v) {
            const x = m.getValue(g.id), k = f.getValue(g.id), R = x === void 0, N = k === void 0;
            if (R || N) {
              if (v === "first") return R ? -1 : 1;
              if (v === "last") return R ? 1 : -1;
              S = R && N ? 0 : R ? v : -v;
            }
          }
          if (S === 0 && (S = h.sortingFn(m, f, g.id)), S !== 0)
            return b && (S *= -1), h.invertSorting && (S *= -1), S;
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
function ia(e, t) {
  return e ? mf(e) ? /* @__PURE__ */ w.createElement(e, t) : e : null;
}
function mf(e) {
  return ff(e) || typeof e == "function" || gf(e);
}
function ff(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function gf(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function pf(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = w.useState(() => ({
    current: nf(t)
  })), [r, o] = w.useState(() => n.current.initialState);
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
const Hs = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { className: "cv-table-wrap", children: /* @__PURE__ */ l("table", { ref: n, className: I("cv-table", e), ...t }) })
);
Hs.displayName = "Table";
const Gs = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("thead", { ref: n, className: I("cv-table-header", e), ...t }));
Gs.displayName = "TableHeader";
const js = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: I("cv-table-body", e), ...t }));
js.displayName = "TableBody";
const Hn = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "tr",
    {
      ref: n,
      className: I("cv-table-row", e),
      ...t
    }
  )
);
Hn.displayName = "TableRow";
const Bs = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "th",
  {
    ref: n,
    className: I("cv-table-head", e),
    ...t
  }
));
Bs.displayName = "TableHead";
const bo = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: I("cv-table-cell", e),
    ...t
  }
));
bo.displayName = "TableCell";
const hf = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("caption", { ref: n, className: I("cv-table-caption", e), ...t }));
hf.displayName = "TableCaption";
const qs = Wo(
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
), re = w.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...o }, i) => /* @__PURE__ */ l(
    "button",
    {
      ref: i,
      type: r ?? "button",
      className: I(qs({ variant: t, size: n }), e),
      ...o
    }
  )
);
re.displayName = "Button";
const Ce = w.forwardRef(
  ({ className: e, type: t, id: n, ...r }, o) => {
    const i = w.useId();
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
Ce.displayName = "Input";
const vf = 8, yf = 12;
function bf({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, o = e.raw.rows, i = e.raw.annotation, a = w.useMemo(
    () => wf(o, i, r, n),
    [o, i, r, n]
  ), s = w.useMemo(
    () => a.map((N) => ({
      id: N.member,
      accessorFn: (F) => F[N.key],
      header: N.label,
      cell: (F) => N.render(F.getValue()),
      sortingFn: (F, E, V) => Nf(F.getValue(V), E.getValue(V)),
      // Global search matches what the reader SEES, not the raw number.
      filterFn: (F, E, V) => aa(N.text(F.getValue(E)), V),
      meta: N
    })),
    [a]
  ), [c, u] = w.useState([]), [m, f] = w.useState(""), [p, d] = w.useState({
    pageIndex: 0,
    pageSize: r.pageSize ?? 25
  }), g = pf({
    data: o,
    columns: s,
    state: { sorting: c, globalFilter: m, pagination: p },
    onSortingChange: u,
    onGlobalFilterChange: f,
    onPaginationChange: d,
    globalFilterFn: (N, F, E) => a.some((V) => aa(V.text(N.original[V.key]), E)),
    getCoreRowModel: rf(),
    getFilteredRowModel: cf(),
    getSortedRowModel: df(),
    getPaginationRowModel: uf(),
    autoResetPageIndex: !0,
    enableMultiSort: !0,
    isMultiSortEvent: (N) => N.shiftKey
  }), h = g.getFilteredRowModel().rows.length, v = g.getPageCount(), { pageIndex: b, pageSize: S } = g.getState().pagination, x = o.length > vf, k = h > yf, R = g.getRowModel().rows;
  return /* @__PURE__ */ C("div", { className: "cv-table-family", children: [
    x && /* @__PURE__ */ C("div", { className: "cv-table-toolbar", children: [
      /* @__PURE__ */ C("div", { className: "cv-table-search", children: [
        /* @__PURE__ */ l(Qa, { className: "cv-table-search-icon" }),
        /* @__PURE__ */ l(
          Ce,
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
    /* @__PURE__ */ l("div", { className: "cv-table-scroll cv-table-scroll--sticky", children: /* @__PURE__ */ C(Hs, { children: [
      /* @__PURE__ */ l(Gs, { className: "cv-table-header--sticky", children: g.getHeaderGroups().map((N) => /* @__PURE__ */ l(Hn, { children: N.headers.map((F) => {
        const E = F.column.columnDef.meta, V = F.column.getIsSorted();
        return /* @__PURE__ */ l(
          Bs,
          {
            className: sa(E.align),
            style: E.width ? { width: E.width } : void 0,
            "aria-sort": V === "asc" ? "ascending" : V === "desc" ? "descending" : "none",
            children: /* @__PURE__ */ C(
              re,
              {
                variant: "ghost",
                className: "cv-table-sort",
                onClick: F.column.getToggleSortingHandler(),
                title: "Sort (shift-click to add a column)",
                children: [
                  ia(F.column.columnDef.header, F.getContext()),
                  /* @__PURE__ */ l(Rf, { dir: V || void 0 })
                ]
              }
            )
          },
          F.id
        );
      }) }, N.id)) }),
      /* @__PURE__ */ C(js, { children: [
        R.map((N) => /* @__PURE__ */ l(Hn, { children: N.getVisibleCells().map((F) => {
          const E = F.column.columnDef.meta, V = _f(E.member, F.getValue(), r.conditionalFormat);
          return /* @__PURE__ */ l(
            bo,
            {
              className: I(sa(E.align), k && "cv-table-cell--compact"),
              style: V ? { color: V } : void 0,
              children: ia(F.column.columnDef.cell, F.getContext())
            },
            F.id
          );
        }) }, N.id)),
        R.length === 0 && /* @__PURE__ */ l(Hn, { children: /* @__PURE__ */ l(bo, { colSpan: Math.max(1, s.length), className: "cv-table-empty", children: m ? "No matches" : "No data" }) })
      ] })
    ] }) }),
    v > 1 && /* @__PURE__ */ C("div", { className: "cv-table-pagination", children: [
      /* @__PURE__ */ C("span", { children: [
        b * S + 1,
        "–",
        Math.min((b + 1) * S, h),
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
            onClick: () => g.previousPage(),
            disabled: !g.getCanPreviousPage(),
            children: "Prev"
          }
        ),
        /* @__PURE__ */ C("span", { className: "cv-table-meta", children: [
          b + 1,
          " / ",
          v
        ] }),
        /* @__PURE__ */ l(
          re,
          {
            variant: "outline",
            className: "cv-table-page-btn",
            onClick: () => g.nextPage(),
            disabled: !g.getCanNextPage(),
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function wf(e, t, n, r) {
  var a;
  const o = e.length > 0 ? Object.keys(e[0]) : Sf(t);
  return ((a = n.columns) != null && a.length ? n.columns : o.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = mo(e, c), m = t ? kf(t, c) : void 0, f = t ? c in t.measures : !1, p = s.label ?? (m == null ? void 0 : m.shortTitle) ?? (m == null ? void 0 : m.title) ?? c, d = s.align ?? (f ? "right" : "left"), g = s.format && r.derive ? r.derive(s.format) : r, h = (v) => Cf(v, f, c, g, s.format);
    return {
      member: c,
      key: u,
      label: p,
      align: d,
      width: s.width,
      render: (v) => h(v),
      text: h
    };
  });
}
function Cf(e, t, n, r, o) {
  if (e == null || e === "" || typeof e == "number" && Number.isNaN(e)) return "—";
  if ((o == null ? void 0 : o.kind) === "date" || typeof e == "string" && hr(e))
    return Ut(e, o);
  if (t) {
    const i = typeof e == "number" ? e : Number(e);
    return Number.isFinite(i) ? String(r.value(i, n)) : String(e);
  }
  return String(r.category(e));
}
function aa(e, t) {
  const n = t.trim().toLowerCase();
  return n ? e.toLowerCase().includes(n) : !0;
}
function Sf(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function kf(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function sa(e) {
  return e === "right" ? "cv-table-cell--right" : e === "center" ? "cv-table-cell--center" : "cv-table-cell--left";
}
function Rf({ dir: e }) {
  return e ? e === "asc" ? /* @__PURE__ */ l(Go, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(jo, { className: "cv-table-sort-icon" }) : /* @__PURE__ */ l(Ac, { className: "cv-table-sort-icon cv-table-sort-icon--idle" });
}
function Nf(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function _f(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const o of n)
      if (o.member === e && xf(r, o.when.op, o.when.value))
        return `var(--${o.colorToken ?? "chart-1"})`;
  }
}
function xf(e, t, n) {
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
const _t = "cv-sidebar--default", Mf = "cv-sidebar--wide", Ws = "a date or category", jr = [
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
    hint: Ws,
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
], Ff = [
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
    hint: Ws,
    cardinality: "one",
    kinds: ["time", "category"],
    target: { kind: "category" },
    channel: "x"
  }
], $f = [
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
], Af = [
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
], Of = [
  {
    id: "value",
    label: "Value",
    hint: "the number to show",
    cardinality: "one",
    kinds: ["number"],
    target: { kind: "option", key: "measure" },
    channel: "y"
  }
], If = [
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
], Pf = ["bar", "line", "area", "pie", "scatter", "heatmap", "kpi", "table"], lt = (e) => Pf.indexOf(e), ot = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Xa,
    order: lt("bar"),
    component: Bd,
    optionsSchema: at.bar,
    defaults: st.bar,
    wells: jr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: _t
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: Lc,
    order: lt("line"),
    component: qd,
    optionsSchema: at.line,
    defaults: st.line,
    wells: jr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: _t
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: Oc,
    order: lt("area"),
    component: Wd,
    optionsSchema: at.area,
    defaults: st.area,
    wells: jr,
    zones: { left: ["y"], bottom: ["x", "color"] },
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: _t
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: Ec,
    order: lt("pie"),
    component: Yd,
    optionsSchema: at.pie,
    defaults: st.pie,
    wells: $f,
    zones: { left: ["size"], bottom: ["slices"] },
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: _t
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Dc,
    order: lt("scatter"),
    component: Xd,
    optionsSchema: at.scatter,
    defaults: st.scatter,
    wells: Af,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: _t
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Tc,
    order: lt("kpi"),
    component: am,
    optionsSchema: at.kpi,
    defaults: st.kpi,
    wells: Of,
    zones: { left: ["value"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Mf
  },
  table: {
    family: "table",
    label: "Table",
    icon: Pc,
    order: lt("table"),
    component: bf,
    optionsSchema: at.table,
    defaults: st.table,
    wells: If,
    zones: { left: ["columns"], bottom: [] },
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: _t
  },
  heatmap: {
    family: "heatmap",
    label: "Heatmap",
    icon: Ic,
    order: lt("heatmap"),
    component: rm,
    optionsSchema: at.heatmap,
    defaults: st.heatmap,
    wells: Ff,
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
    sidebarWidthClass: _t
  }
}, Tf = ot.bar, Df = ot.line, Ef = ot.area, Lf = ot.pie, Vf = ot.scatter, zf = ot.heatmap, Hf = ot.kpi, Gf = ot.table, di = [
  Tf,
  Df,
  Ef,
  Lf,
  Vf,
  zf,
  Hf,
  Gf
], jf = y.any();
function mi(e, t) {
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
      return ((s = n.get(a)) == null ? void 0 : s.defaults) ?? Td;
    },
    optionsSchema: (a) => {
      var s;
      return ((s = n.get(a)) == null ? void 0 : s.optionsSchema) ?? jf;
    },
    resolveOptions: (a) => Dd(a, i.defaults(a.family))
  };
  return i;
}
const wr = mi(di);
function Bf(e, t = wr) {
  return t.resolveOptions(e);
}
const la = {
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
function Us(e) {
  return e ? { ...la, ...e } : la;
}
function fi(e) {
  return !e || e.queryless ? !1 : e.supportsMapping && e.supportsCartesianAxes;
}
function qf(e) {
  const t = Math.floor(e ?? zn);
  return !Number.isFinite(t) || t < 1 ? 1 : t;
}
function Wf(e, t) {
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
function Uf(e) {
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
function Kf(e, t) {
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
function Yf(e) {
  const { unit: t, quantity: n, convert: r, ...o } = e ?? {};
  return { ...o, format: { kind: "percent", decimals: 0 } };
}
function Qf(e, t, n) {
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
function Xf(e, t) {
  if (!t || e.empty || e.categories.length === 0 || e.series.length === 0) return e;
  const n = t.kind, r = e.categories.length;
  if (n === "percentOfTotal") {
    const i = Kf(e.series, r);
    return {
      ...e,
      series: e.series.map((a, s) => ({
        ...a,
        data: i[s],
        meta: Yf(a.meta)
      }))
    };
  }
  const o = qf(t.window);
  return {
    ...e,
    series: e.series.map((i) => ({
      ...i,
      data: n === "rollingAvg" ? Wf(i.data, o) : Uf(i.data)
    }))
  };
}
function Jf(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
const Uw = Object.fromEntries(
  Object.entries(ot).map(([e, t]) => [e, t.component])
);
function Ks({
  data: e,
  options: t,
  config: n,
  format: r,
  state: o,
  components: i,
  editing: a,
  updateFamilyOptions: s,
  registry: c = wr,
  theme: u
}) {
  const m = ae(() => Bf(t, c), [t, c]), f = ae(() => Us(u), [u]), p = c.get(m.family), d = (p == null ? void 0 : p.queryless) ?? !1, g = fi(p) ? m.transform : void 0, h = ae(() => Xf(e, g), [e, g]);
  if (!d && (o != null && o.loading))
    return /* @__PURE__ */ l(dd, { className: "cv-chart-skeleton" });
  if (!d && (o != null && o.error))
    return /* @__PURE__ */ C(fr, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Bo, {}),
      /* @__PURE__ */ l(gr, { children: "Failed to load chart" }),
      /* @__PURE__ */ l(pr, { children: o.error.message })
    ] });
  if (!d && e.empty)
    return /* @__PURE__ */ l("div", { className: "cv-chart-empty", children: "No data" });
  const v = n && Object.keys(n).length > 0 ? n : Jf(h), b = Qf(
    r ?? Qo(e.raw.annotation, m, Yo),
    g
  ), S = (i == null ? void 0 : i[m.family]) ?? c.require(m.family).component;
  return /* @__PURE__ */ l(
    S,
    {
      data: h,
      options: m,
      config: v,
      format: b,
      theme: f,
      state: o,
      editing: a,
      updateFamilyOptions: s
    }
  );
}
const Cr = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Br = 8;
function ca(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Ys(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : Cr, r = (t == null ? void 0 : t.byKey) ?? {}, o = (u, m) => r[u] ?? m, i = /* @__PURE__ */ new Set();
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
function ua(e, t) {
  const n = Ys(e, t);
  return e.forEach((r, o) => {
    r.colorToken = n[o];
  }), e;
}
function Zf(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function En(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Zf(e[n]);
  return t;
}
function eg(e) {
  return {
    measures: En(e.measures ?? {}),
    dimensions: En(e.dimensions ?? {}),
    segments: En(e.segments ?? {}),
    timeDimensions: En(e.timeDimensions ?? {})
  };
}
function Kt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Sr(e, t, n) {
  const r = e == null ? void 0 : e.meta, o = {};
  (r == null ? void 0 : r.unit) !== void 0 && (o.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (o.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (o.convert = r.convert);
  const i = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  i != null && i.startsWith("percent") && o.unit === void 0 && (o.unit = "%");
  let a = n;
  return (i != null && i.startsWith("currency") || i != null && i.startsWith("accounting")) && (!a || a.kind === void 0 || a.kind === "auto") && (a = { ...a, kind: "currency" }), a && (o.format = a), t != null && t.stackId && (o.stackId = t.stackId), (t == null ? void 0 : t.dots) !== void 0 && (o.dots = t.dots), o;
}
function tg(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function ng(e, t) {
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
function rg(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [o, i] of t) {
      const a = kr(r[o]);
      a !== null && (r[o] = i.to(a));
    }
    return r;
  });
}
function og(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const o = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      o && (r.data = r.data.map((i) => i === null ? null : o.to(i)));
    }
}
function Qs(e, t, n, r, o = wr) {
  const i = eg(e.annotation()), a = ng(i, r), s = rg(e.tablePivot(), a), c = t.mapping;
  if (!c) {
    const f = n.measures ?? [];
    if (o.require(t.family).measureOnly && f.length > 0) {
      const p = s[0] ?? {}, d = [
        {
          key: "value",
          label: "Value",
          data: f.map((h) => kr(p[h])),
          meta: { ...Sr(Kt(i, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return ua(d, t.colors), {
        categories: f.map(
          (h) => {
            var v, b;
            return ((v = Kt(i, h)) == null ? void 0 : v.shortTitle) ?? ((b = Kt(i, h)) == null ? void 0 : b.title) ?? h;
          }
        ),
        series: d,
        raw: { rows: s, annotation: i, query: n },
        empty: s.length === 0 || ca(d)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: i, query: n },
      empty: s.length === 0
    };
  }
  const u = c.series.mode === "measures" ? ag(e, c.series, t, i) : lg(e, c.category.member, c.series, t, i), m = ig(e, c);
  return og(u, a), ua(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: i, query: n },
    empty: s.length === 0 || ca(u)
  };
}
function ig(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((o) => o.x);
}
function ag(e, t, n, r) {
  const { members: o, meta: i } = t, a = e.chartPivot();
  return o.map((s) => {
    const c = Kt(r, s), u = i == null ? void 0 : i[s], m = a.map((f) => kr(f[s]));
    return {
      key: s,
      label: tg(c, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Sr(c, u, n.format), measure: s }
    };
  });
}
function sg(e) {
  const t = String(e);
  if (t === "1" || t === "true") return "yes";
  if (t === "0" || t === "false") return "no";
}
function lg(e, t, n, r, o) {
  const { value: i, values: a, pivot: s } = n, c = a && a.length > 0 ? a : [i], u = new Set(c), m = c.length > 1, f = { x: [t], y: [s, "measures"] }, d = e.seriesNames(f).filter((k) => {
    const R = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : void 0;
    return R === void 0 || u.has(R);
  }), g = e.chartPivot(f), h = Kt(o, i), v = o.dimensions[s], b = (v == null ? void 0 : v.type) === "boolean", S = (v == null ? void 0 : v.shortTitle) ?? (v == null ? void 0 : v.title) ?? s, x = d.map((k) => {
    var H, L;
    const R = (H = k.yValues) == null ? void 0 : H[0], N = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : i, F = Kt(o, N), E = (L = n.meta) == null ? void 0 : L[N], V = (E == null ? void 0 : E.label) ?? (F == null ? void 0 : F.shortTitle) ?? (F == null ? void 0 : F.title) ?? N, O = R ?? k.shortTitle ?? k.title ?? k.key, $ = b ? sg(O) : void 0, T = $ ? `${S}: ${$}` : O, D = m ? `${V} · ${T}` : T, z = g.map((J) => kr(J[k.key]));
    return {
      key: k.key,
      label: D,
      data: z,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Sr(F ?? h, E, r.format),
        measure: N
      }
    };
  });
  return cg(x, h, r.format);
}
function cg(e, t, n) {
  var m, f, p;
  if (e.length <= Br) return e;
  const r = (d) => d.data.reduce((g, h) => g + (h ?? 0), 0), o = [...e].sort((d, g) => r(g) - r(d)), i = o.slice(0, Br - 1), a = o.slice(Br - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, c = Array.from({ length: s }, (d, g) => {
    let h = 0, v = !1;
    for (const b of a) {
      const S = b.data[g];
      S !== null && (h += S, v = !0);
    }
    return v ? h : null;
  }), u = {
    key: "__other",
    label: `Other (${a.length})`,
    data: c,
    meta: { ...Sr(t, void 0, n), ...(p = (f = i[0]) == null ? void 0 : f.meta) != null && p.measure ? { measure: i[0].meta.measure } : {} }
  };
  return [...i, u];
}
function kr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const se = (e) => Se(e, "yyyy-MM-dd");
function ug(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [se(t), se(t)];
  if (n === "yesterday") {
    const a = $e(t, 1);
    return [se(a), se(a)];
  }
  if (n === "this week") return [se(Kn(t)), se(Yn(t))];
  if (n === "this month") return [se(Mt(t)), se(hn(t))];
  if (n === "this quarter") return [se(Ft(t)), se(vn(t))];
  if (n === "this year") return [se($t(t)), se(yn(t))];
  if (n === "last week") {
    const a = no(t, 1);
    return [se(Kn(a)), se(Yn(a))];
  }
  if (n === "last month") {
    const a = At(t, 1);
    return [se(Mt(a)), se(hn(a))];
  }
  if (n === "last quarter") {
    const a = Ot(t, 1);
    return [se(Ft(a)), se(vn(a))];
  }
  if (n === "last year") {
    const a = It(t, 1);
    return [se($t(a)), se(yn(a))];
  }
  const r = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!r) return;
  const o = Number(r[1]);
  if (!Number.isFinite(o) || o < 1) return;
  const i = r[2];
  return i.startsWith("day") ? [se($e(t, o - 1)), se(t)] : i.startsWith("week") ? [se($e(t, o * 7 - 1)), se(t)] : i.startsWith("month") ? [se(Mt(At(t, o))), se(hn(At(t, 1)))] : i.startsWith("quarter") ? [se(Ft(Ot(t, o))), se(vn(Ot(t, 1)))] : [se($t(It(t, o))), se(yn(It(t, 1)))];
}
function Xs(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function gi(e) {
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
function Js(e) {
  const t = gi(e);
  return t === void 0 ? void 0 : Xs(t);
}
function pi(e) {
  const t = gi(e);
  return t === void 0 ? "day" : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Zt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const dg = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function mg(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((o) => o.name === e)) == null ? void 0 : r.default;
}
function xn(e, t, n) {
  var r;
  if (Me(e)) {
    const o = e.var;
    return Object.prototype.hasOwnProperty.call(n, o) && n[o] !== void 0 ? n[o] : (r = t.get(o)) == null ? void 0 : r.default;
  }
  return e;
}
function fg(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const o = [];
  for (const a of e.values) {
    const s = xn(a, t, n);
    if (!Zt(s))
      if (Array.isArray(s))
        for (const c of s)
          Zt(c) || o.push(c);
      else
        o.push(s);
  }
  if (o.length === 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const i = (e.operator === "inDateRange" || e.operator === "notInDateRange") && o.length === 1 && typeof o[0] == "string" ? ug(o[0]) : void 0;
  return { member: e.member, operator: e.operator, values: i ?? o };
}
function gg(e, t, n) {
  if ("and" in e) {
    const r = wo(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = wo(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return fg(e, t, n);
}
function wo(e, t, n) {
  const r = [];
  for (const o of e) {
    const i = gg(o, t, n);
    i !== void 0 && r.push(i);
  }
  return r;
}
function pg(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.dateRange !== void 0) {
    const o = xn(e.dateRange, t, n);
    Zt(o) || (r.dateRange = o);
  }
  if (e.granularity !== void 0) {
    const o = xn(e.granularity, t, n);
    Zt(o) || (r.granularity = o === Qt ? pi(r.dateRange) : o);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Zs(e, t, n) {
  const r = dg(n), o = {};
  if (e.measures !== void 0 && (o.measures = [...e.measures]), e.dimensions !== void 0 && (o.dimensions = [...e.dimensions]), e.segments !== void 0 && (o.segments = [...e.segments]), e.timeDimensions !== void 0 && (o.timeDimensions = e.timeDimensions.map((i) => pg(i, r, t))), e.filters !== void 0) {
    const i = wo(e.filters, r, t);
    i.length > 0 && (o.filters = i);
  }
  if (e.order !== void 0 && (o.order = Array.isArray(e.order) ? e.order.map((i) => [...i]) : { ...e.order }), e.limit !== void 0) {
    const i = xn(e.limit, r, t);
    Zt(i) || (o.limit = i);
  }
  if (e.offset !== void 0) {
    const i = xn(e.offset, r, t);
    Zt(i) || (o.offset = i);
  }
  return e.total !== void 0 && (o.total = e.total), e.timezone !== void 0 && (o.timezone = e.timezone), o;
}
function el() {
  let e, t;
  return (n, r, o) => {
    const i = Zs(n, r, o), a = JSON.stringify(i);
    return e !== void 0 && a === t ? e : (e = i, t = a, i);
  };
}
function hg(e, t) {
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
class vg extends Error {
}
const yg = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new vg(`"${e}" cannot be parsed into a number`);
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
function da(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class bg extends Error {
}
class ma extends Error {
}
class wg extends Error {
}
class qr extends Error {
}
class Cg extends Error {
}
class Sg {
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
      throw new ma(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return da(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new wg(`Cannot convert incompatible measures of ${o.measure} and ${i.measure}`);
    let a = this.cls.mul(this.val, this.convertFraction(i.unit.to_anchor));
    if (i.unit.anchor_shift && (a = this.cls.sub(a, this.convertFraction(i.unit.anchor_shift))), i.system != o.system) {
      const c = this.measureData[i.measure].anchors;
      if (c == null)
        throw new qr(`Unable to convert units. Anchors are missing for "${i.measure}" and "${o.measure}" measures.`);
      const u = c[i.system];
      if (u == null)
        throw new qr(`Unable to find anchor for "${i.measure}" to "${o.measure}". Please make sure it is defined.`);
      const m = (n = u[o.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[o.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        a = m(a, this.cls);
      else if (typeof f == "number")
        a = this.cls.mul(a, f);
      else if (da(f))
        a = this.cls.mul(a, this.convertFraction(f));
      else
        throw new qr("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new ma(".toBest must be called after .from");
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
        throw new Cg(`Meausure "${t}" not found.`);
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
    throw new bg(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function kg(e) {
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
function Rg(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = kg(e);
  return (r) => new Sg({
    measures: e,
    unitCache: n,
    cls: yg
  }, r);
}
const Ng = {
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
}, _g = {
  systems: {
    metric: Ng
  }
}, xg = {
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
}, Mg = {
  systems: {
    SI: xg
  }
}, Fg = {
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
}, $g = {
  systems: {
    SI: Fg
  }
}, Ag = {
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
}, Og = {
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
}, Ig = {
  systems: {
    metric: Ag,
    imperial: Og
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
}, Pg = {
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
}, Tg = {
  systems: {
    SI: Pg
  }
}, Dg = {
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
}, Eg = {
  systems: {
    SI: Dg
  }
}, Lg = {
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
}, Vg = {
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
}, zg = {
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
}, Hg = {
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
}, Gg = {
  systems: {
    bit: Lg,
    byte: Vg,
    IECBit: zg,
    IECByte: Hg
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
}, jg = {
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
}, Bg = {
  systems: {
    metric: jg
  }
}, qg = {
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
}, Wg = {
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
}, Ug = {
  systems: {
    SI: qg,
    nutrition: Wg
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
}, Kg = {
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
}, Yg = {
  systems: {
    SI: Kg
  }
}, Qg = {
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
}, Xg = {
  systems: {
    SI: Qg
  }
}, Jg = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Zg = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, ep = {
  systems: {
    metric: Jg,
    imperial: Zg
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
}, tp = {
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
}, np = {
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
}, rp = {
  systems: {
    metric: tp,
    imperial: np
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
}, op = {
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
}, ip = {
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
}, ap = {
  systems: {
    metric: op,
    imperial: ip
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
}, sp = {
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
}, lp = {
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
}, cp = {
  systems: {
    metric: sp,
    imperial: lp
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
}, up = {
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
}, dp = {
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
}, mp = {
  systems: {
    metric: up,
    imperial: dp
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
}, fp = {
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
}, gp = {
  systems: {
    SI: fp
  }
}, pp = {
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
}, hp = {
  systems: {
    unit: pp
  }
}, vp = {
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
}, yp = {
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
}, bp = {
  systems: {
    metric: vp,
    imperial: yp
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
}, wp = {
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
}, Cp = {
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
}, Sp = {
  systems: {
    metric: wp,
    imperial: Cp
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
}, kp = {
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
}, Rp = {
  systems: {
    SI: kp
  }
}, Np = {
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
}, _p = {
  systems: {
    SI: Np
  }
}, xp = {
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
}, Mp = {
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
}, Fp = {
  systems: {
    metric: xp,
    imperial: Mp
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
}, $p = {
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
}, Ap = {
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
}, Op = {
  systems: {
    metric: $p,
    imperial: Ap
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
}, Ip = {
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
}, Pp = {
  systems: {
    SI: Ip
  }
}, Tp = {
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
}, Dp = {
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
}, Ep = {
  systems: {
    metric: Tp,
    imperial: Dp
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
}, Lp = {
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
}, Vp = {
  systems: {
    SI: Lp
  }
}, zp = {
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
}, Hp = {
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
}, Gp = {
  systems: {
    metric: zp,
    imperial: Hp
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
}, jp = {
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
}, Bp = {
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
}, qp = {
  systems: {
    metric: jp,
    imperial: Bp
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
}, Wp = {
  acceleration: _g,
  angle: Mg,
  apparentPower: $g,
  area: Ig,
  charge: Tg,
  current: Eg,
  digital: Gg,
  each: Bg,
  energy: Ug,
  force: Yg,
  frequency: Xg,
  illuminance: ep,
  length: rp,
  mass: ap,
  massFlowRate: cp,
  pace: mp,
  partsPer: gp,
  pieces: hp,
  power: bp,
  pressure: Sp,
  reactiveEnergy: Rp,
  reactivePower: _p,
  speed: Fp,
  torque: Ep,
  temperature: Op,
  time: Pp,
  voltage: Vp,
  volume: Gp,
  volumeFlowRate: qp
}, Up = Rg(Wp), Kp = {
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
function Yp(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Up(t).from(e.from).to(e.to)
  };
}
const Co = {
  ...Object.fromEntries(
    Object.entries(Kp).map(([e, t]) => [e, Yp(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Rr(e) {
  return e ? { ...Co, ...e } : Co;
}
function Qp(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Xp(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Jp(e) {
  return e != null && e.quantity ? Xp(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Zp = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function tl(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function fa(e, t) {
  const n = e * (Zp[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
    return c === 0 ? "0s" : c < 1e3 ? `${r}${tl(c.toFixed(c < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + a.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Wr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const o = Math.abs(e);
    for (const [i, a] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (o >= i) return tl((e / i).toFixed(n.decimals ?? 1)) + a;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function eh(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ga(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function nl(e = Co) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Yo(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, o = r == null ? void 0 : r.quantity, i = t.format;
    if (i != null && i.kind && i.kind !== "auto") {
      if (i.kind === "duration") return fa(n, r == null ? void 0 : r.unit);
      if (i.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: i.decimals ?? 0 }).format(n);
      if (i.kind === "currency") {
        const m = typeof i.currency == "string" && /^[A-Za-z]{3}$/.test(i.currency) ? i.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: i.decimals ?? 0 }).format(n);
      }
      if (i.kind === "number") return ga(Wr(n, t), i.prefix, i.suffix);
    }
    if (o === "time") return fa(n, r == null ? void 0 : r.unit);
    if (o === "count" || (r == null ? void 0 : r.convert) === !1) return ga(Wr(n, t), i == null ? void 0 : i.prefix, i == null ? void 0 : i.suffix);
    const a = r == null ? void 0 : r.unit, s = a ? eh(o, a) : {}, c = (i == null ? void 0 : i.prefix) ?? s.prefix ?? "", u = (i == null ? void 0 : i.suffix) !== void 0 ? ` ${i.suffix}` : s.suffix ?? "";
    return `${c}${Wr(n, t)}${u}`;
  };
}
const rl = w.createContext(null);
function th({
  container: e,
  children: t
}) {
  return /* @__PURE__ */ l(rl.Provider, { value: e, children: t });
}
function ol() {
  return w.useContext(rl) ?? void 0;
}
const Nr = Va(null);
Nr.displayName = "CubeVizContext";
function Je() {
  const e = Vo(Nr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Rt() {
  return Je().families;
}
function nh(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Kw({
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
    () => mi(di, i),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), m = ae(
    () => nh(e) ? cd(e) : e,
    [e]
  ), f = ae(
    () => {
      var S;
      return {
        chartRamp: (S = t == null ? void 0 : t.chartRamp) != null && S.length ? t.chartRamp : Cr,
        mode: (t == null ? void 0 : t.mode) ?? "system",
        marks: Us(t == null ? void 0 : t.marks)
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode, t == null ? void 0 : t.marks]
  ), p = ae(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), d = ae(() => o ?? {}, [o]), g = ae(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), h = ae(
    () => ({
      cubeClient: m,
      registry: d,
      families: u,
      locale: p,
      theme: f,
      maps: g
    }),
    [m, d, u, p, f, g]
  ), [v, b] = Pt(null);
  return /* @__PURE__ */ l(Nr.Provider, { value: h, children: /* @__PURE__ */ l(
    "div",
    {
      ref: b,
      className: I(
        "cv-root",
        f.mode === "dark" && "dark",
        f.mode === "light" && "cube-viz-light"
      ),
      children: /* @__PURE__ */ l(th, { container: v, children: /* @__PURE__ */ l(
        Jo,
        {
          onRangeSelect: a == null ? void 0 : a.onRangeSelect,
          onPointSelect: a == null ? void 0 : a.onPointSelect,
          children: s
        }
      ) })
    }
  ) });
}
function hi({
  families: e,
  children: t
}) {
  const n = Je(), r = (e ?? []).map((i) => i.family).join("|"), o = ae(() => !e || e.length === 0 ? n : { ...n, families: mi(di, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ l(we, { children: t }) : /* @__PURE__ */ l(Nr.Provider, { value: o, children: t });
}
function rh(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const oh = 5e3;
function il(e, t) {
  const { cubeClient: n } = Je(), r = (t == null ? void 0 : t.skip) ?? !1, o = ae(
    () => e.limit === void 0 ? { ...e, limit: oh } : e,
    [e]
  ), i = ae(() => JSON.stringify(o), [o]), [a, s] = Pt({ isLoading: !r }), [c, u] = Pt(0), m = ft(() => u((f) => f + 1), []);
  return Fn(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let f = !0;
    const p = new AbortController();
    return s((d) => ({ resultSet: d.resultSet, isLoading: !0 })), n.load(o, { castNumerics: !0, signal: p.signal }).then((d) => {
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
      f = !1, p.abort();
    };
  }, [n, i, r, c]), { ...a, refetch: m };
}
const _r = Va(null);
_r.displayName = "DashboardContext";
function vi({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, o = xt(null);
  (o.current === null || o.current.key !== r) && (o.current = { store: hg(r, t), key: r });
  const i = o.current.store, a = ih(i, r);
  return fc(_r.Provider, { value: a }, n);
}
function ih(e, t) {
  const n = ft(
    (i, a) => e.set(i, a),
    [e]
  ), r = ft(
    (i) => Zs(i, e.getAll(), t),
    [e, t]
  ), o = ft(
    (i) => mg(i, e.getAll(), t),
    [e, t]
  );
  return ae(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: o, decls: t }),
    [e, n, r, o, t]
  );
}
function ah(e) {
  const t = za(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function al() {
  const e = Vo(_r);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return ah(e);
}
function An() {
  return Vo(_r);
}
const sh = () => () => {
}, lh = Object.freeze({}), ch = Object.freeze([]);
function Ur(e, t, n) {
  var x;
  const r = An(), { locale: o } = Je(), i = Rt(), a = xt(null);
  a.current === null && (a.current = el());
  const s = a.current, u = !((n == null ? void 0 : n.skipResolve) ?? !1), m = () => u ? s(
    e,
    (r == null ? void 0 : r.store.getAll()) ?? lh,
    (r == null ? void 0 : r.decls) ?? ch
  ) : e, f = za(
    u && r ? r.store.subscribe : sh,
    m,
    m
  ), { resultSet: p, isLoading: d, error: g, refetch: h } = il(f, { skip: n == null ? void 0 : n.skip }), v = ((x = t.format) == null ? void 0 : x.unitSystem) ?? (o == null ? void 0 : o.unitSystem), b = ae(() => Rr(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]);
  return { data: ae(() => {
    if (p)
      return Qs(p, t, f, { unitSystem: v, conversions: b }, i);
  }, [p, t, f, v, b, i]), isLoading: d, error: g, refetch: h, resolvedQuery: f };
}
function Nt() {
  const { cubeClient: e } = Je(), [t, n] = Pt({ isLoading: !0 });
  return Fn(() => {
    let r = !0;
    return n({ isLoading: !0 }), ud(e).then((o) => {
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
function xr() {
  const { locale: e } = Je(), t = w.useMemo(() => Rr(e == null ? void 0 : e.units), [e == null ? void 0 : e.units]);
  return w.useCallback(
    (n) => n && (e == null ? void 0 : e.unitSystem) === "imperial" && t[n] ? t[n].imperialUnit : n,
    [e == null ? void 0 : e.unitSystem, t]
  );
}
function Yw() {
  const { locale: e } = Je(), { formatValue: t, units: n } = e;
  return ae(
    () => t ?? nl(Rr(n)),
    [t, n]
  );
}
function sl() {
  const [e, t] = Pt(0), n = xt(null), r = xt(null), o = xt(null), i = xt(0), a = ft((u) => {
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
      const f = new ResizeObserver((p) => {
        var d, g;
        for (const h of p) {
          const v = ((g = (d = h.contentBoxSize) == null ? void 0 : d[0]) == null ? void 0 : g.inlineSize) ?? h.contentRect.width;
          a(v);
        }
      });
      f.observe(u), r.current = f;
    },
    [a, s]
  );
  return Fn(() => s, [s]), [c, e];
}
const uh = "day";
function dh(e, t) {
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
        granularity: r.granularity ?? uh,
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
const ie = (e) => Se(e, "yyyy-MM-dd");
function mh(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const o = Un(e[0]), i = Un(e[1]);
    if (Number.isNaN(o.getTime()) || Number.isNaN(i.getTime())) return;
    const a = Fc(i, o) + 1;
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
    const o = no(t, 1);
    return [ie(Kn(o)), ie(Yn(o))];
  }
  if (n === "this month") {
    const o = At(t, 1);
    return [ie(Mt(o)), ie(hn(o))];
  }
  if (n === "this quarter") {
    const o = Ot(t, 1);
    return [ie(Ft(o)), ie(vn(o))];
  }
  if (n === "this year") {
    const o = It(t, 1);
    return [ie($t(o)), ie(yn(o))];
  }
  if (n === "last week") {
    const o = no(t, 2);
    return [ie(Kn(o)), ie(Yn(o))];
  }
  if (n === "last month") {
    const o = At(t, 2);
    return [ie(Mt(o)), ie(hn(o))];
  }
  if (n === "last quarter") {
    const o = Ot(t, 2);
    return [ie(Ft(o)), ie(vn(o))];
  }
  if (n === "last year") {
    const o = It(t, 2);
    return [ie($t(o)), ie(yn(o))];
  }
}
function fh(e, t, n = wr) {
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
  const s = mh(a);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...i, dateRange: s, compareDateRange: void 0 }]
  }, mode: o } : null;
}
const gh = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function yi({
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
  const { registry: c, locale: u, theme: m } = Je(), f = Rt(), p = ((H = f.get(t.family)) == null ? void 0 : H.queryless) ?? !1, d = ae(() => {
    var L;
    return (L = t.format) != null && L.unitSystem || !(u != null && u.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: u.unitSystem } };
  }, [t, u == null ? void 0 : u.unitSystem]), g = ae(() => {
    const L = e ?? {};
    return L.timezone || !(u != null && u.timezone) ? L : { ...L, timezone: u.timezone };
  }, [e, u == null ? void 0 : u.timezone]), { data: h, isLoading: v, error: b, refetch: S, resolvedQuery: x } = Ur(
    g,
    d,
    { skip: p }
  ), k = ae(() => dh(g, d), [g, d]), R = Ur(
    (k == null ? void 0 : k.query) ?? g,
    (k == null ? void 0 : k.chart) ?? d,
    { skip: !k }
  ), N = ae(
    () => fh(x, d, f),
    [x, d, f]
  ), F = Ur(
    (N == null ? void 0 : N.query) ?? g,
    d,
    { skip: !N, skipResolve: !0 }
  ), E = ae(
    () => ({ [d.family]: rh(c, d.family, f) }),
    [c, d.family, f]
  ), V = ae(() => {
    let L = h ?? gh;
    if (k && R.data) {
      L = { ...L, series: R.data.series, categories: R.data.categories };
      const J = L.raw.rows.length > 0, Z = L.series.some((ne) => ne.data.some((le) => le !== null));
      L = { ...L, empty: !J && !Z };
    }
    if (N && F.data) {
      if (N.mode === "kpiRow") {
        const J = F.data.raw.rows[0];
        if (J) {
          const Z = L.raw.rows[0];
          L = {
            ...L,
            raw: { ...L.raw, rows: Z ? [Z, J] : [J] }
          };
        }
      } else if (!F.data.empty) {
        const J = new Map(F.data.series.map((Z) => [Z.key, Z]));
        if (!L.empty && L.series.length > 0) {
          const Z = L.categories.length, ne = L.series.map((le) => {
            const fe = J.get(le.key), Q = Array.from({ length: Z }, (pe, ye) => (fe == null ? void 0 : fe.data[ye]) ?? null);
            return {
              ...le,
              key: `${le.key}__prev`,
              label: `${le.label} (prev)`,
              colorToken: le.colorToken,
              data: Q,
              meta: { ...le.meta, companion: !0 }
            };
          });
          L = { ...L, series: [...L.series, ...ne] };
        } else {
          const Z = F.data.series.map((ne) => ({
            ...ne,
            key: `${ne.key}__prev`,
            label: `${ne.label} (prev)`,
            data: [...ne.data],
            meta: { ...ne.meta, companion: !0 }
          }));
          L = {
            ...L,
            categories: F.data.categories,
            series: Z,
            empty: !1
          };
        }
      }
    }
    return L;
  }, [h, k, R.data, N, F.data]);
  Fn(() => {
    n == null || n({ rows: V.raw.rows, refetch: S, isLoading: v });
  }, [n, V.raw.rows, S, v]);
  const O = {}, $ = ae(
    () => u.formatValue ?? nl(Rr(u.units)),
    [u.formatValue, u.units]
  ), T = ae(
    () => Qo(V.raw.annotation, d, $, {
      locale: u.locale,
      unitSystem: u.unitSystem
    }),
    [V.raw.annotation, d, $, u.locale, u.unitSystem]
  ), D = d.mapping, z = ae(
    () => ({
      categoryMember: D == null ? void 0 : D.category.member,
      pivotMember: (D == null ? void 0 : D.series.mode) === "pivot" ? D.series.pivot : void 0,
      formatCategory: T.category
    }),
    [D, T]
  );
  return /* @__PURE__ */ l(
    Jo,
    {
      widgetId: i,
      target: z,
      onRangeSelect: a,
      onPointSelect: s,
      children: /* @__PURE__ */ l(
        Ks,
        {
          data: V,
          options: d,
          config: O,
          format: T,
          state: p ? { loading: !1 } : { loading: v && !h, error: b },
          components: E,
          registry: f,
          theme: m.marks,
          editing: r,
          updateFamilyOptions: o
        }
      )
    }
  );
}
function ph({
  spec: e,
  onRangeSelect: t,
  onPointSelect: n
}) {
  return /* @__PURE__ */ l(
    yi,
    {
      query: e.query,
      chart: e.chart,
      widgetId: e.id,
      onRangeSelect: t,
      onPointSelect: n
    }
  );
}
const ll = "cube-viz-prose";
function hh(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function vh({ doc: e }) {
  const t = hh(e), n = ae(
    () => t ? e : null,
    [t, e]
  ), r = as(
    {
      extensions: [ls],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: I(ll) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ l(ss, { editor: r }) : /* @__PURE__ */ l("div", { className: "cv-widget-note", children: "Unsupported text content" });
}
const Gn = [
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
], yh = Object.fromEntries(
  Gn.map((e) => [e.value, e.label])
);
function pa(e) {
  return yh[e.trim().toLowerCase()] ?? e;
}
const bh = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function wh({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = yu(), o = I(qs({ variant: "outline" }), "cv-cal-nav-btn");
  return /* @__PURE__ */ C("div", { className: "cv-cal-caption", children: [
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: I(o, !r && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(qo, {})
      }
    ),
    /* @__PURE__ */ l("span", { className: "cv-cal-caption-label", children: Se(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: I(o, !n && "cv-cal-nav-btn--dim"),
        children: /* @__PURE__ */ l(mr, {})
      }
    )
  ] });
}
function Ch({ day: e, modifiers: t, className: n, style: r, ...o }) {
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
function cl({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ l(
    vu,
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
        MonthCaption: wh,
        DayButton: Ch,
        Chevron: ({ orientation: o, className: i, ...a }) => /* @__PURE__ */ l(o === "left" ? qo : mr, { className: I("cv-icon", i), ...a })
      },
      ...r
    }
  );
}
function je({
  ...e
}) {
  return /* @__PURE__ */ l(Qn.Root, { "data-slot": "popover", ...e });
}
function Be({
  ...e
}) {
  return /* @__PURE__ */ l(Qn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function qe({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  const o = ol();
  return /* @__PURE__ */ l(Qn.Portal, { container: o, children: /* @__PURE__ */ l(
    Qn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: I("cv-popover-content cv-popper-anim", e),
      ...r
    }
  ) });
}
function Ve({
  ...e
}) {
  return /* @__PURE__ */ l(Oe.Root, { "data-slot": "select", ...e });
}
function So({
  ...e
}) {
  return /* @__PURE__ */ l(Oe.Group, { "data-slot": "select-group", ...e });
}
function ze({
  ...e
}) {
  return /* @__PURE__ */ l(Oe.Value, { "data-slot": "select-value", ...e });
}
function He({
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
function Sh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Oe.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: I("cv-select-scroll-btn", e),
      ...t,
      children: /* @__PURE__ */ l(Vc, {})
    }
  );
}
function kh({
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
function Ge({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  const o = ol();
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
        /* @__PURE__ */ l(Sh, {}),
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
        /* @__PURE__ */ l(kh, {})
      ]
    }
  ) });
}
function ko({
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
function ke({
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
const en = "cv-field", Rh = "cv-field-label", mn = "yyyy-MM-dd";
function Nh(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ha(e) {
  if (!e) return;
  const t = Ua(e, mn, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function _h({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, o = r.presets ?? bh, [i, a] = Pt(!1), s = typeof e == "string", [c, u] = Nh(e), m = ha(c), f = ha(u), p = m ? { from: m, to: f } : void 0;
  let d;
  s ? d = pa(e) : m && f ? d = `${Se(m, "MMM d, yyyy")} – ${Se(f, "MMM d, yyyy")}` : m ? d = Se(m, "MMM d, yyyy") : d = "Pick a date range";
  const g = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ C(je, { open: i, onOpenChange: a, children: [
    /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ C(
      re,
      {
        variant: "outline",
        className: I(
          "cv-daterange-trigger",
          d === "Pick a date range" && "cv-daterange-trigger--placeholder"
        ),
        children: [
          /* @__PURE__ */ l(Ja, {}),
          d
        ]
      }
    ) }),
    /* @__PURE__ */ C(qe, { className: "cv-daterange-popover", align: "start", children: [
      /* @__PURE__ */ l("div", { className: "cv-daterange-presets", children: o.map((h) => /* @__PURE__ */ l(
        re,
        {
          variant: "ghost",
          size: "sm",
          className: "cv-daterange-preset",
          onClick: () => {
            t(h), a(!1);
          },
          children: pa(h)
        },
        h
      )) }),
      /* @__PURE__ */ l(
        cl,
        {
          mode: "range",
          selected: p,
          defaultMonth: m,
          disabled: g,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([Se(h.from, mn), Se(h.to, mn)]) : h != null && h.from ? t([Se(h.from, mn), Se(h.from, mn)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const xh = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Mh({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: o } = al(), i = r.rangeVariable ? gi(o(r.rangeVariable)) : void 0, a = r.options ?? (i !== void 0 ? Xs(i) : xh), s = typeof e == "string" ? e : "", c = a.join(",");
  return Fn(() => {
    s && !a.includes(s) && t(a[0]);
  }, [s, c]), /* @__PURE__ */ C(
    Ve,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ l(He, { className: en, children: /* @__PURE__ */ l(ze, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Ge, { children: a.map((u) => /* @__PURE__ */ l(ke, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Fh({ value: e, onChange: t, control: n }) {
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
    Ve,
    {
      value: o,
      onValueChange: (i) => {
        const a = r.options.find((s) => String(s.value) === i);
        t(a ? a.value : void 0);
      },
      children: [
        /* @__PURE__ */ l(He, { className: en, children: /* @__PURE__ */ l(ze, { placeholder: "—" }) }),
        /* @__PURE__ */ l(Ge, { children: r.options.map((i) => /* @__PURE__ */ l(ke, { value: String(i.value), children: i.label }, String(i.value))) })
      ]
    }
  );
}
function $h({
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
function Ah({ value: e, onChange: t, control: n }) {
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
function Oh({ value: e, onChange: t, control: n }) {
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
function Ih({ value: e, onChange: t, decl: n }) {
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
const Ph = {
  dateRange: _h,
  granularity: Mh,
  select: Fh,
  memberSelect: $h,
  text: Ah,
  number: Oh,
  toggle: Ih
};
function Th({ control: e, title: t }) {
  var d;
  const { registry: n } = Je(), { decls: r, resolveValue: o, setVar: i } = al(), a = ae(
    () => r.find((g) => g.name === e.variable),
    [r, e.variable]
  ), s = gc();
  if (!a)
    return /* @__PURE__ */ C("div", { className: "cv-widget-note", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, u = ((d = n.controls) == null ? void 0 : d[c]) ?? Ph[c], m = o(e.variable), f = (g) => i(e.variable, g), p = t ?? a.label ?? a.name;
  return c === "toggle" ? /* @__PURE__ */ l(u, { value: m, onChange: f, decl: a, control: e.control }) : /* @__PURE__ */ C("div", { children: [
    /* @__PURE__ */ l("label", { className: Rh, htmlFor: s, children: p }),
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
const ul = w.forwardRef(
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
ul.displayName = "Card";
const dl = w.forwardRef(
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
dl.displayName = "CardHeader";
const ml = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: I("cv-card-title", e),
      ...t
    }
  )
);
ml.displayName = "CardTitle";
const Dh = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: I("cv-card-description", e), ...t })
);
Dh.displayName = "CardDescription";
const Eh = w.forwardRef(
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
Eh.displayName = "CardAction";
const fl = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: I("cv-card-content", e), ...t })
);
fl.displayName = "CardContent";
const Lh = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: I("cv-card-footer", e), ...t })
);
Lh.displayName = "CardFooter";
const nr = "cube-viz-drag-handle";
function gl(e) {
  var s;
  const { registry: t } = Je(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ l(n, { ...e });
  const { title: r, menu: o, dragHandleProps: i, children: a } = e;
  return /* @__PURE__ */ C(ul, { className: "cv-widget-chrome", children: [
    r ? /* @__PURE__ */ C(
      dl,
      {
        ...i,
        className: I(nr, "cv-widget-chrome-header"),
        children: [
          /* @__PURE__ */ l(ml, { className: "cv-widget-chrome-title", children: r }),
          o
        ]
      }
    ) : null,
    /* @__PURE__ */ l(fl, { className: "cv-widget-chrome-body", children: a })
  ] });
}
class va extends pc {
  constructor() {
    super(...arguments);
    Or(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ C(fr, { variant: "destructive", className: "cv-chart-error", children: [
      /* @__PURE__ */ l(Bo, {}),
      /* @__PURE__ */ l(gr, { children: "Failed to render chart" }),
      /* @__PURE__ */ l(pr, { children: n.message })
    ] }) : this.props.children;
  }
}
function Vh(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (i) => {
    let a = i == null ? "" : String(i);
    return /^[=+\-@\t\r]/.test(a) && !Number.isFinite(Number(a)) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
  }, r = t.map(n).join(","), o = e.map((i) => t.map((a) => n(i[a])).join(",")).join(`
`);
  return `${r}
${o}`;
}
function zh(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), o = URL.createObjectURL(r), i = document.createElement("a");
  i.href = o, i.download = t, i.style.display = "none", (document.body ?? document.documentElement).appendChild(i), i.click(), i.remove(), setTimeout(() => URL.revokeObjectURL(o), 0);
}
function Hh(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), o = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(o), t && (r.href = t), o.href = e, o.href;
}
const Gh = /* @__PURE__ */ (() => {
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
function pl(e = {}) {
  return Ht || (e.includeStyleProperties ? (Ht = e.includeStyleProperties, Ht) : (Ht = gt(window.getComputedStyle(document.documentElement)), Ht));
}
function rr(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function jh(e) {
  const t = rr(e, "border-left-width"), n = rr(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Bh(e) {
  const t = rr(e, "border-top-width"), n = rr(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function hl(e, t = {}) {
  const n = t.width || jh(e), r = t.height || Bh(e);
  return { width: n, height: r };
}
function qh() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Pe = 16384;
function Wh(e) {
  (e.width > Pe || e.height > Pe) && (e.width > Pe && e.height > Pe ? e.width > e.height ? (e.height *= Pe / e.width, e.width = Pe) : (e.width *= Pe / e.height, e.height = Pe) : e.width > Pe ? (e.height *= Pe / e.width, e.width = Pe) : (e.width *= Pe / e.height, e.height = Pe));
}
function or(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Uh(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Kh(e, t, n) {
  const r = "http://www.w3.org/2000/svg", o = document.createElementNS(r, "svg"), i = document.createElementNS(r, "foreignObject");
  return o.setAttribute("width", `${t}`), o.setAttribute("height", `${n}`), o.setAttribute("viewBox", `0 0 ${t} ${n}`), i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("externalResourcesRequired", "true"), o.appendChild(i), i.appendChild(e), Uh(o);
}
const Ie = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ie(n, t);
};
function Yh(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Qh(e, t) {
  return pl(t).map((n) => {
    const r = e.getPropertyValue(n), o = e.getPropertyPriority(n);
    return `${n}: ${r}${o ? " !important" : ""};`;
  }).join(" ");
}
function Xh(e, t, n, r) {
  const o = `.${e}:${t}`, i = n.cssText ? Yh(n) : Qh(n, r);
  return document.createTextNode(`${o}{${i}}`);
}
function ya(e, t, n, r) {
  const o = window.getComputedStyle(e, n), i = o.getPropertyValue("content");
  if (i === "" || i === "none")
    return;
  const a = Gh();
  try {
    t.className = `${t.className} ${a}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Xh(a, n, o, r)), t.appendChild(s);
}
function Jh(e, t, n) {
  ya(e, t, ":before", n), ya(e, t, ":after", n);
}
const ba = "application/font-woff", wa = "image/jpeg", Zh = {
  woff: ba,
  woff2: ba,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: wa,
  jpeg: wa,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function ev(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function bi(e) {
  const t = ev(e).toLowerCase();
  return Zh[t] || "";
}
function tv(e) {
  return e.split(/,/)[1];
}
function Ro(e) {
  return e.search(/^(data:)/) !== -1;
}
function nv(e, t) {
  return `data:${t};base64,${e}`;
}
async function vl(e, t, n) {
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
const Kr = {};
function rv(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function wi(e, t, n) {
  const r = rv(e, t, n.includeQueryParams);
  if (Kr[r] != null)
    return Kr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let o;
  try {
    const i = await vl(e, n.fetchRequestInit, ({ res: a, result: s }) => (t || (t = a.headers.get("Content-Type") || ""), tv(s)));
    o = nv(i, t);
  } catch (i) {
    o = n.imagePlaceholder || "";
    let a = `Failed to fetch resource: ${e}`;
    i && (a = typeof i == "string" ? i : i.message), a && console.warn(a);
  }
  return Kr[r] = o, o;
}
async function ov(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : or(t);
}
async function iv(e, t) {
  if (e.currentSrc) {
    const i = document.createElement("canvas"), a = i.getContext("2d");
    i.width = e.clientWidth, i.height = e.clientHeight, a == null || a.drawImage(e, 0, 0, i.width, i.height);
    const s = i.toDataURL();
    return or(s);
  }
  const n = e.poster, r = bi(n), o = await wi(n, r, t);
  return or(o);
}
async function av(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Mr(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function sv(e, t) {
  return Ie(e, HTMLCanvasElement) ? ov(e) : Ie(e, HTMLVideoElement) ? iv(e, t) : Ie(e, HTMLIFrameElement) ? av(e, t) : e.cloneNode(yl(e));
}
const lv = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", yl = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function cv(e, t, n) {
  var r, o;
  if (yl(t))
    return t;
  let i = [];
  return lv(e) && e.assignedNodes ? i = gt(e.assignedNodes()) : Ie(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? i = gt(e.contentDocument.body.childNodes) : i = gt(((o = e.shadowRoot) !== null && o !== void 0 ? o : e).childNodes), i.length === 0 || Ie(e, HTMLVideoElement) || await i.reduce((a, s) => a.then(() => Mr(s, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function uv(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const o = window.getComputedStyle(e);
  o.cssText ? (r.cssText = o.cssText, r.transformOrigin = o.transformOrigin) : pl(n).forEach((i) => {
    let a = o.getPropertyValue(i);
    i === "font-size" && a.endsWith("px") && (a = `${Math.floor(parseFloat(a.substring(0, a.length - 2))) - 0.1}px`), Ie(e, HTMLIFrameElement) && i === "display" && a === "inline" && (a = "block"), i === "d" && t.getAttribute("d") && (a = `path(${t.getAttribute("d")})`), r.setProperty(i, a, o.getPropertyPriority(i));
  });
}
function dv(e, t) {
  Ie(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ie(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function mv(e, t) {
  if (Ie(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((o) => e.value === o.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function fv(e, t, n) {
  return Ie(t, Element) && (uv(e, t, n), Jh(e, t, n), dv(e, t), mv(e, t)), t;
}
async function gv(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let i = 0; i < n.length; i++) {
    const s = n[i].getAttribute("xlink:href");
    if (s) {
      const c = e.querySelector(s), u = document.querySelector(s);
      !c && u && !r[s] && (r[s] = await Mr(u, t, !0));
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
async function Mr(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => sv(r, t)).then((r) => cv(e, r, t)).then((r) => fv(e, r, t)).then((r) => gv(r, t));
}
const bl = /url\((['"]?)([^'"]+?)\1\)/g, pv = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, hv = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function vv(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function yv(e) {
  const t = [];
  return e.replace(bl, (n, r, o) => (t.push(o), n)), t.filter((n) => !Ro(n));
}
async function bv(e, t, n, r, o) {
  try {
    const i = n ? Hh(t, n) : t, a = bi(t);
    let s;
    return o || (s = await wi(i, a, r)), e.replace(vv(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function wv(e, { preferredFontFormat: t }) {
  return t ? e.replace(hv, (n) => {
    for (; ; ) {
      const [r, , o] = pv.exec(n) || [];
      if (!o)
        return "";
      if (o === t)
        return `src: ${r};`;
    }
  }) : e;
}
function wl(e) {
  return e.search(bl) !== -1;
}
async function Cl(e, t, n) {
  if (!wl(e))
    return e;
  const r = wv(e, n);
  return yv(r).reduce((i, a) => i.then((s) => bv(s, a, t, n)), Promise.resolve(r));
}
async function Gt(e, t, n) {
  var r;
  const o = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (o) {
    const i = await Cl(o, null, n);
    return t.style.setProperty(e, i, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Cv(e, t) {
  await Gt("background", e, t) || await Gt("background-image", e, t), await Gt("mask", e, t) || await Gt("-webkit-mask", e, t) || await Gt("mask-image", e, t) || await Gt("-webkit-mask-image", e, t);
}
async function Sv(e, t) {
  const n = Ie(e, HTMLImageElement);
  if (!(n && !Ro(e.src)) && !(Ie(e, SVGImageElement) && !Ro(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, o = await wi(r, bi(r), t);
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
async function kv(e, t) {
  const r = gt(e.childNodes).map((o) => Sl(o, t));
  await Promise.all(r).then(() => e);
}
async function Sl(e, t) {
  Ie(e, Element) && (await Cv(e, t), await Sv(e, t), await kv(e, t));
}
function Rv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((o) => {
    n[o] = r[o];
  }), e;
}
const Ca = {};
async function Sa(e) {
  let t = Ca[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Ca[e] = t, t;
}
async function ka(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, i = (n.match(/url\([^)]+\)/g) || []).map(async (a) => {
    let s = a.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), vl(s, t.fetchRequestInit, ({ result: c }) => (n = n.replace(a, `url(${c})`), [a, c]));
  });
  return Promise.all(i).then(() => n);
}
function Ra(e) {
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
async function Nv(e, t) {
  const n = [], r = [];
  return e.forEach((o) => {
    if ("cssRules" in o)
      try {
        gt(o.cssRules || []).forEach((i, a) => {
          if (i.type === CSSRule.IMPORT_RULE) {
            let s = a + 1;
            const c = i.href, u = Sa(c).then((m) => ka(m, t)).then((m) => Ra(m).forEach((f) => {
              try {
                o.insertRule(f, f.startsWith("@import") ? s += 1 : o.cssRules.length);
              } catch (p) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
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
        const a = e.find((s) => s.href == null) || document.styleSheets[0];
        o.href != null && r.push(Sa(o.href).then((s) => ka(s, t)).then((s) => Ra(s).forEach((c) => {
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
function _v(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => wl(t.style.getPropertyValue("src")));
}
async function xv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = gt(e.ownerDocument.styleSheets), r = await Nv(n, t);
  return _v(r);
}
function kl(e) {
  return e.trim().replace(/["']/g, "");
}
function Mv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((i) => {
      t.add(kl(i));
    }), Array.from(r.children).forEach((i) => {
      i instanceof HTMLElement && n(i);
    });
  }
  return n(e), t;
}
async function Fv(e, t) {
  const n = await xv(e, t), r = Mv(e);
  return (await Promise.all(n.filter((i) => r.has(kl(i.style.fontFamily))).map((i) => {
    const a = i.parentStyleSheet ? i.parentStyleSheet.href : null;
    return Cl(i.cssText, a, t);
  }))).join(`
`);
}
async function $v(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Fv(e, t);
  if (n) {
    const r = document.createElement("style"), o = document.createTextNode(n);
    r.appendChild(o), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Av(e, t = {}) {
  const { width: n, height: r } = hl(e, t), o = await Mr(e, t, !0);
  return await $v(o, t), await Sl(o, t), Rv(o, t), await Kh(o, n, r);
}
async function Ov(e, t = {}) {
  const { width: n, height: r } = hl(e, t), o = await Av(e, t), i = await or(o), a = document.createElement("canvas"), s = a.getContext("2d"), c = t.pixelRatio || qh(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return a.width = u * c, a.height = m * c, t.skipAutoScale || Wh(a), a.style.width = `${u}`, a.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, a.width, a.height)), s.drawImage(i, 0, 0, a.width, a.height), a;
}
async function Iv(e, t = {}) {
  return (await Ov(e, t)).toDataURL();
}
function Pv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Tv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Dv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Ev(e, t, n = 2) {
  const r = await Iv(e, {
    pixelRatio: n,
    backgroundColor: Dv(e),
    cacheBust: !0
  });
  Tv(r, `${Pv(t)}.png`);
}
function Lv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [o, i] = w.useState(!1), [a, s] = w.useState(null), c = t.length > 0, u = !!r;
  if (!c && !n && !u) return null;
  const m = () => {
    const g = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    zh(Vh(t), `${g}.csv`);
  }, f = async () => {
    const g = r == null ? void 0 : r.current;
    if (!(!g || o)) {
      i(!0), s(null);
      try {
        await Ev(g, e);
      } catch (h) {
        s(h instanceof Error ? h.message : "Couldn't export the image.");
      } finally {
        i(!1);
      }
    }
  }, p = (g) => g.stopPropagation(), d = (g = !0) => I("cv-menu-item", !g && "cv-menu-item--disabled");
  return /* @__PURE__ */ C(je, { children: [
    /* @__PURE__ */ l(
      Be,
      {
        onMouseDown: p,
        onPointerDown: p,
        onTouchStart: p,
        className: "cv-menu-trigger",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ l(zc, {})
      }
    ),
    /* @__PURE__ */ C(qe, { align: "end", className: "cv-menu", onMouseDown: p, onPointerDown: p, onTouchStart: p, children: [
      n ? /* @__PURE__ */ C("button", { type: "button", onClick: n, className: d(), children: [
        /* @__PURE__ */ l(Hc, {}),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ C("button", { type: "button", onClick: f, disabled: o, className: d(!o), children: [
        /* @__PURE__ */ l(Gc, {}),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ C("button", { type: "button", onClick: m, disabled: !c, className: d(c), children: [
        /* @__PURE__ */ l(jc, {}),
        "Export CSV"
      ] }),
      a ? /* @__PURE__ */ l("p", { className: "cv-menu-error", children: a }) : null
    ] })
  ] });
}
function Na({
  widget: e,
  onState: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ l(
        yi,
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
      return /* @__PURE__ */ l(vh, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ l(Th, { control: e.control, title: e.title });
  }
}
function No({
  widget: e,
  dragHandleProps: t = {},
  editable: n = !1,
  onRangeSelect: r,
  onPointSelect: o
}) {
  const [i, a] = Pt({ rows: [] }), s = ft(
    (m) => a({ rows: m.rows, refetch: m.refetch }),
    []
  ), c = xt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ l("div", { className: "cv-widget-frameless", children: /* @__PURE__ */ l(va, { children: /* @__PURE__ */ l(Na, { widget: e }) }) });
  const u = n ? null : /* @__PURE__ */ l(
    Lv,
    {
      title: e.title,
      rows: i.rows,
      refetch: i.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ l(
    gl,
    {
      widget: e,
      title: e.title,
      menu: u,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ l("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ l(va, { children: /* @__PURE__ */ l(
        Na,
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
const Rl = (e) => e.filter((t) => t.type === "chart");
function Vv(e) {
  var n, r;
  const t = /* @__PURE__ */ new Map();
  for (const o of Rl(e)) {
    const i = (r = (n = o.query) == null ? void 0 : n.timeDimensions) == null ? void 0 : r[0];
    i && Me(i.dateRange) && t.set(o.id, i.dateRange.var);
  }
  return t;
}
function zv(e) {
  var r;
  const t = /* @__PURE__ */ new Map(), n = (o) => {
    for (const i of o)
      if ("and" in i) n(i.and);
      else if ("or" in i) n(i.or);
      else if (!t.has(i.member)) {
        const a = (i.values ?? []).find(Me);
        a && t.set(i.member, a.var);
      }
  };
  for (const o of Rl(e)) n(((r = o.query) == null ? void 0 : r.filters) ?? []);
  return t;
}
function Hv({
  spec: e,
  drill: t = !1,
  onRangeSelect: n,
  onPointSelect: r,
  children: o
}) {
  const i = An(), a = i == null ? void 0 : i.setVar, s = w.useMemo(() => Vv(e.widgets), [e.widgets]), c = w.useMemo(() => zv(e.widgets), [e.widgets]), u = w.useRef({ onRangeSelect: n, onPointSelect: r });
  u.current = { onRangeSelect: n, onPointSelect: r };
  const m = w.useCallback(
    (g) => {
      var h, v;
      if (a) {
        const b = g != null && g.widgetId ? s.get(g.widgetId) : void 0;
        if (b) a(b, g ? [g.from, g.to] : void 0);
        else if (!g) for (const S of new Set(s.values())) a(S, void 0);
      }
      (v = (h = u.current).onRangeSelect) == null || v.call(h, g);
    },
    [a, s]
  ), f = w.useCallback(
    (g) => {
      var h, v;
      if (a)
        if (g) {
          const b = c.get(g.member);
          b && a(b, [String(g.value)]);
        } else
          for (const b of new Set(c.values())) a(b, void 0);
      (v = (h = u.current).onPointSelect) == null || v.call(h, g);
    },
    [a, c]
  ), p = !!(n || t && a && s.size), d = !!(r || t && a && c.size);
  return /* @__PURE__ */ l(
    Jo,
    {
      onRangeSelect: p ? m : void 0,
      onPointSelect: d ? f : void 0,
      children: o
    }
  );
}
const Gv = "lg", jv = 640;
function Bv(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function qv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Qw({
  spec: e,
  editable: t = !1,
  families: n,
  drill: r = !1,
  onRangeSelect: o,
  onPointSelect: i
}) {
  const [a, s] = sl(), c = e.grid ?? {}, u = c.cols ?? 12, m = c.rowHeight ?? 40, f = c.margin ?? [12, 12], p = c.containerPadding ?? f, d = ae(
    () => ({ [Gv]: qv(e.layout) }),
    [e.layout]
  ), g = ae(
    () => new Map(e.widgets.map((v) => [v.id, v])),
    [e.widgets]
  ), h = !t && s > 0 && s < jv;
  return /* @__PURE__ */ l(hi, { families: n, children: /* @__PURE__ */ l(vi, { spec: e, children: /* @__PURE__ */ l(
    Hv,
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
            padding: `${p[1]}px ${p[0]}px`
          },
          children: Bv(e.layout).map((v) => {
            const b = g.get(v.i);
            if (!b) return null;
            const S = v.h * m + (v.h - 1) * f[1];
            return /* @__PURE__ */ l("div", { style: { height: S }, children: /* @__PURE__ */ l(No, { widget: b, editable: !1 }) }, v.i);
          })
        }
      ) : /* @__PURE__ */ l(
        is,
        {
          width: s,
          layouts: d,
          breakpoints: { lg: 0 },
          cols: { lg: u },
          rowHeight: m,
          margin: f,
          containerPadding: p,
          dragConfig: { enabled: t, handle: `.${nr}` },
          resizeConfig: { enabled: t },
          children: e.layout.map((v) => {
            const b = g.get(v.i);
            return b ? /* @__PURE__ */ l("div", { className: "cv-dashboard-cell", children: /* @__PURE__ */ l(No, { widget: b, editable: t }) }, v.i) : null;
          })
        }
      ) })
    }
  ) }) });
}
function Xw({
  spec: e,
  families: t,
  onRangeSelect: n,
  onPointSelect: r
}) {
  return /* @__PURE__ */ l(hi, { families: t, children: /* @__PURE__ */ l("div", { className: "cv-chart-view", children: /* @__PURE__ */ l(
    gl,
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
        ph,
        {
          spec: e,
          onRangeSelect: n,
          onPointSelect: r
        }
      )
    }
  ) }) });
}
function Nl(e, t = "None") {
  if (Me(e))
    return `{${e.var.replace(/[{}]/g, "")}}`;
  if (e == null || e === "") return t;
  if (Array.isArray(e)) {
    const n = e.map((r) => Nl(r, t)).filter((r) => r !== t);
    return n.length > 0 ? n.join(" – ") : t;
  }
  return typeof e == "object" ? t : String(e);
}
function Wv(e) {
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
function Uv(e, t) {
  const n = new Set(Wv(t));
  return e.filter((r) => n.has(r.type));
}
function Kv(e) {
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
function Yv(e, t, n) {
  const r = new Set(n.map((s) => s.name)), o = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let i = o, a = 2;
  for (; r.has(i); ) i = `${o}_${a++}`;
  return i;
}
function Qv(e, t, n) {
  const r = Kv(e), o = { name: Yv(t, e, n), type: r }, i = t.trim();
  return i && (o.label = i), r === "dateRange" ? o.default = "last 7 days" : r === "granularity" && (o.default = "day"), o;
}
const Yr = ht.options, _o = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Xv(e, t = "None") {
  const n = Nl(e, t);
  return n === Qt ? "Auto" : _o[n] ?? n;
}
const Qr = "__none__";
function _l({
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
  const f = n && n.length > 0 ? n : Yr, p = e && e !== Qt && !f.includes(e) ? [...f, e].sort(
    (g, h) => Yr.indexOf(g) - Yr.indexOf(h)
  ) : f, d = o ? `Auto (${_o[o]})` : "Auto";
  return /* @__PURE__ */ C(
    Ve,
    {
      value: e ?? (i ? Qr : ""),
      onValueChange: (g) => t(g === Qr ? void 0 : g),
      disabled: c,
      children: [
        /* @__PURE__ */ l(He, { id: u, className: m, children: /* @__PURE__ */ l(ze, { placeholder: s }) }),
        /* @__PURE__ */ C(Ge, { children: [
          i ? /* @__PURE__ */ l(ke, { value: Qr, children: a }) : null,
          r ? /* @__PURE__ */ l(ke, { value: Qt, children: d }) : null,
          p.map((g) => /* @__PURE__ */ l(ke, { value: g, children: _o[g] }, g))
        ] })
      ]
    }
  );
}
function Fr(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Jv(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Zv(e) {
  return xo(e, "category");
}
function xo(e, t) {
  if (!e.meta || typeof e.meta != "object") return;
  const n = e.meta[t];
  return typeof n == "string" && n.length > 0 ? n : void 0;
}
function nt(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function $r(e) {
  return e ? e.cubes.filter((t) => nt(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Fr(t),
    joinTargets: Jv(t),
    category: Zv(t),
    path: xo(t, "path"),
    grain: xo(t, "grain")
  })) : [];
}
function ey(e) {
  const t = e.replace(/[-_]+/g, " ").trim();
  return t.length > 0 ? t[0].toUpperCase() + t.slice(1) : e;
}
function pt(e, t) {
  if (!(!e || !t))
    return $r(e).find((n) => n.name === t);
}
function Ci(e) {
  return e.shortTitle || e.title || e.name;
}
function Ee(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function xl(e) {
  return Ee(e.meta, "group");
}
function ty(e) {
  return Ee(e.meta, "geoPoint");
}
function _a(e) {
  const t = Ee(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function ny(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function jn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Ml(e, t) {
  if (t)
    return Dt(e, "time", t).find(jn);
}
function ry(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const o of e) {
    const i = xl(o), a = i ? `g:${i.toLowerCase()}` : `f:${t(o)}`;
    let s = r.get(a);
    s || (s = { label: i ?? t(o), items: [] }, r.set(a, s), n.push(a)), s.items.push(o);
  }
  return n.map((o) => [r.get(o).label, r.get(o).items]);
}
function ir(e) {
  const t = Ee(e.meta, "kind");
  return t === "flow" || t === "gauge" || t === "counter" || t === "stat" || t === "part" ? t : void 0;
}
function oy(e) {
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
function Si(e) {
  return Ee(e.meta, "agg");
}
function ar(e) {
  const t = Ee(e.meta, "family");
  return t ? `${e.cube}:${t}` : void 0;
}
function iy(e) {
  var n;
  if (((n = e.meta) == null ? void 0 : n.aggDefault) === !0) return !0;
  const t = oy(ir(e));
  return t !== void 0 && Si(e) === t;
}
function ay(e) {
  return Ee(e.meta, "familyHint");
}
function sy(e) {
  return Ee(e.meta, "soloHint");
}
function sr(e) {
  return Ee(e.meta, "familyTitle");
}
function ly(e, t) {
  if (ar(t))
    return Fl(e, t).map(sr).find((n) => n !== void 0);
}
function ki(e) {
  const t = e == null ? void 0 : e.match(/per\s+(.+)$/i);
  return t ? t[1] : "row";
}
function cy(e) {
  return `each ${ki(e)}`;
}
function Fl(e, t) {
  const n = ar(t);
  if (!n) return [t];
  const r = [
    ...Dt(e, "measure", t.cube),
    ...Dt(e, "numberDimension", t.cube)
  ], o = /* @__PURE__ */ new Set(), i = [];
  for (const a of r)
    ar(a) !== n || o.has(a.name) || (o.add(a.name), i.push(a));
  return i.length > 0 ? i : [t];
}
function uy(e) {
  const t = [], n = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = ar(r.option);
    if (!o) {
      t.push({ label: r.option.label, variants: [r], defaultIndex: 0 });
      continue;
    }
    let i = n.get(o);
    i || (i = { familyKey: o, label: r.option.label, variants: [], defaultIndex: 0 }, n.set(o, i), t.push(i)), i.variants.push(r);
  }
  for (const r of t) {
    if (!r.familyKey) continue;
    const o = r.variants.find((s) => sr(s.option)), i = r.variants.findIndex((s) => iy(s.option)), a = r.variants.findIndex((s) => s.reason === void 0);
    r.defaultIndex = i >= 0 ? i : a >= 0 ? a : 0, r.label = sr((o == null ? void 0 : o.option) ?? {}) ?? r.variants[r.defaultIndex].option.label, r.variants.length < 2 && (r.familyKey = void 0);
  }
  return t;
}
function Ri(e, t) {
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
function $l(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Ci(e),
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
function Bn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Ci(e),
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
function Al(e, t) {
  return {
    name: e.name,
    label: Ci(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function dy(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const o of e.dimensions) {
    const i = o.meta, a = ty({ meta: i });
    !a || !nt(o) || n.set(a, [...n.get(a) ?? [], o]);
  }
  const r = [];
  for (const [o, i] of n) {
    const a = i.filter(
      (c) => c.type === "number" && _a({ meta: c.meta }) === "latitude"
    ), s = i.filter(
      (c) => c.type === "number" && _a({ meta: c.meta }) === "longitude"
    );
    i.length !== 2 || a.length !== 1 || s.length !== 1 || r.push({
      name: ny(a[0].name, s[0].name),
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
function xa(e) {
  const t = e.meta;
  return !t || typeof t != "object" ? !1 : typeof t.geoRole == "string";
}
function Dt(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const o of e.cubes) {
    if (!nt(o) || n && o.name !== n) continue;
    const i = Fr(o), a = (s) => {
      s.connectedComponent = i, r.push(s);
    };
    if (t === "geoPoint") {
      r.push(...dy(o, i));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of o.measures)
        nt(s) && a($l(s, o.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of o.dimensions)
        nt(s) && s.type !== "time" && !xa(s) && a(Bn(s, o.name));
    if (t === "time")
      for (const s of o.dimensions)
        nt(s) && s.type === "time" && a(Bn(s, o.name));
    if (t === "numberDimension")
      for (const s of o.dimensions)
        nt(s) && s.type === "number" && !xa(s) && a(Bn(s, o.name));
  }
  return r;
}
function my(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const o of e.cubes) {
    if (!nt(o) || n && !n.has(o.name)) continue;
    const i = Fr(o);
    for (const a of o.segments) {
      if (!nt(a)) continue;
      const s = Al(a, o.name);
      s.connectedComponent = i, r.push(s);
    }
  }
  return r;
}
function Te(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const r = Fr(n), o = (s) => (s && (s.connectedComponent = r), s), i = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (i)
        return i.type ? "aggType" in i ? o($l(i, n.name)) : o(Bn(i, n.name)) : void 0;
      const a = n.segments.find((s) => s.name === t);
      if (a) return o(Al(a, n.name));
    }
    return Dt(e, "geoPoint").find((n) => n.name === t);
  }
}
function Ma(e) {
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
const Mo = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Ol = {
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
function fy(e) {
  return e === "number";
}
function Ze(e) {
  return e.target !== void 0;
}
function Fe(e, t) {
  return e.kinds.includes(t);
}
function Ni(e, t, n) {
  if (!Fe(e, t)) {
    const r = e.kinds.includes("number") ? "a number (a total, average or count)" : e.kinds.includes("time") ? "a date or category" : "a category";
    return `${e.label} needs ${r}`;
  }
  e.cardinality === "one" && n.length >= 1;
}
function Et(e) {
  return e.chart.familyOptions ?? {};
}
function _i(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Il(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? t.mode === "measures" ? t.members : t.values && t.values.length > 0 ? t.values : [t.value] : [];
}
function gy(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t ? (t.mode === "measures", t.meta ?? {}) : {};
}
function py(e, t, n) {
  var a, s;
  const r = e.chart;
  if (_i(r)) return;
  const o = On(r), i = new Set(n ?? []);
  o && i.add(o);
  for (const c of t)
    if (((a = c.target) == null ? void 0 : a.kind) === "option") {
      const u = Et(e)[c.target.key];
      typeof u == "string" && i.add(u);
    }
  return (((s = e.query) == null ? void 0 : s.dimensions) ?? []).find((c) => !i.has(c));
}
function an(e, t, n) {
  var s;
  const r = {}, o = e.chart, i = Et(e), a = (c, u) => c.cardinality === "one" ? u.slice(0, 1) : u;
  for (const c of t) {
    if (!Ze(c)) continue;
    const u = c.target;
    switch (u.kind) {
      case "category": {
        const m = On(o);
        r[c.id] = m ? [m] : [];
        break;
      }
      case "measures": {
        const m = Il(o), f = m.length ? m : ((s = e.query) == null ? void 0 : s.measures) ?? [];
        r[c.id] = a(c, f);
        break;
      }
      case "pivot": {
        const m = _i(o) ?? py(e, t, n);
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
function xi(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Mi(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function hy(e, t) {
  return { ...e, dimensions: xi(e.dimensions, t) };
}
function Pl(e, t) {
  const n = Mi(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Tl(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function Jw(e) {
  return e === void 0 ? Ry : pi(e);
}
const vy = "last 30 days";
function cn(e, t, n, r) {
  if (fy(n)) return { ...e, measures: xi(e.measures, t) };
  if (n === "time") {
    const o = In(e) ?? r;
    return Tl(e, {
      dimension: t,
      granularity: (o == null ? void 0 : o.granularity) ?? Qt,
      dateRange: o ? o.dateRange : vy
    });
  }
  return hy(e, t);
}
function fn(e, t, n, r) {
  const o = e.query ?? {}, i = an(e, t);
  for (const [s, c] of Object.entries(i))
    if (s !== r && c.includes(n))
      return o;
  const a = In(o);
  if ((a == null ? void 0 : a.dimension) === n) return Tl(o, void 0);
  if ((o.measures ?? []).includes(n)) {
    const s = Mi(o.measures, n);
    return { ...o, measures: s.length ? s : void 0 };
  }
  return Pl(o, n);
}
function yy(e, t, n, r) {
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
  return { category: { member: e }, series: Ll(t, r) };
}
function wn(e, t, n) {
  var c, u;
  const r = an(e, t, n), o = (m) => t.find((f) => {
    var p;
    return ((p = f.target) == null ? void 0 : p.kind) === m;
  }), i = o("category"), a = o("measures"), s = o("pivot");
  return {
    category: i ? (c = r[i.id]) == null ? void 0 : c[0] : On(e.chart),
    measures: a ? r[a.id] ?? [] : Il(e.chart),
    pivot: s ? (u = r[s.id]) == null ? void 0 : u[0] : _i(e.chart)
  };
}
function Cn(e, t, n) {
  const r = { ...El(e.chart), ...gy(e.chart) };
  return {
    ...e,
    query: t,
    chart: {
      ...e.chart,
      mapping: yy(n.category, n.measures, n.pivot, r)
    }
  };
}
function lr(e, t, n) {
  const r = { ...Et(e), ...n };
  for (const [o, i] of Object.entries(n)) i === void 0 && delete r[o];
  return { ...e, query: t, chart: { ...e.chart, familyOptions: r } };
}
function Fi(e, t, n, r, o) {
  const i = t.find((u) => u.id === n);
  if (!i || !Ze(i)) return e;
  const a = i.target, s = an(e, t)[n] ?? [];
  let c = e.query ?? {};
  switch (a.kind) {
    case "category": {
      const u = s[0], m = In(c);
      u && u !== r && (c = fn(e, t, u, n)), c = cn(c, r, o, m);
      const f = wn({ ...e, query: c }, t, [r]);
      return Cn(e, c, { ...f, category: r });
    }
    case "measures": {
      const u = i.cardinality === "one" ? [r] : xi(s, r);
      i.cardinality === "one" && s[0] && s[0] !== r && (c = fn(e, t, s[0], n)), c = cn(c, r, o);
      const m = wn({ ...e, query: c }, t, [r]);
      return Cn(e, c, { ...m, measures: u });
    }
    case "pivot": {
      const u = s[0];
      u && u !== r && (c = fn(e, t, u, n)), c = cn(c, r, o);
      const m = wn({ ...e, query: c }, t, [r]);
      return Cn(e, c, { ...m, pivot: r });
    }
    case "option": {
      const u = s[0];
      return u && u !== r && (c = fn(e, t, u, n)), c = cn(c, r, o), lr(e, c, { [a.key]: r });
    }
    case "optionList": {
      const u = Array.isArray(Et(e)[a.key]) ? [...Et(e)[a.key]] : [];
      return u.some((m) => (m == null ? void 0 : m.member) === r) || u.push({ member: r }), c = cn(c, r, o), lr(e, c, { [a.key]: u });
    }
  }
}
function by(e, t, n, r) {
  const o = t.find((s) => s.id === n);
  if (!o || !Ze(o)) return e;
  const i = o.target, a = fn(e, t, r, n);
  switch (i.kind) {
    case "category":
      return { ...e, query: a, chart: { ...e.chart, mapping: void 0 } };
    case "measures": {
      const s = wn(e, t), c = Mi(s.measures, r), u = c.length ? s.pivot : void 0, m = c.length || !s.pivot ? a : Pl(a, s.pivot);
      return Cn(e, m, { ...s, measures: c, pivot: u });
    }
    case "pivot": {
      const s = wn(e, t);
      return Cn(e, a, { ...s, pivot: void 0 });
    }
    case "option":
      return lr(e, a, { [i.key]: void 0 });
    case "optionList": {
      const s = Array.isArray(Et(e)[i.key]) ? Et(e)[i.key] : [];
      return lr(e, a, {
        [i.key]: s.filter((c) => (c == null ? void 0 : c.member) !== r)
      });
    }
  }
}
function wy(e, t) {
  var r;
  const n = e.query ?? {};
  return (n.measures ?? []).includes(t) ? "number" : ((r = In(n)) == null ? void 0 : r.dimension) === t ? "time" : "category";
}
function Cy(e, t) {
  if (Fe(t, e)) return e;
  if (e === "category" && Fe(t, "numberDimension")) return "numberDimension";
  if (e === "numberDimension" && Fe(t, "category") || e === "time" && Fe(t, "category")) return "category";
}
function Sy(e, t, n) {
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
    if (!Ze(a) || !a.channel) continue;
    const s = o.get(a.channel);
    if (!(s != null && s.length)) continue;
    const c = a.cardinality === "one" ? s.slice(0, 1) : s;
    for (const u of c) {
      const m = Cy(wy(e, u), a);
      m && (i = Fi(i, n, a.id, u, m));
    }
  }
  return i;
}
function ky(e, t) {
  const n = [...t];
  let r = 0;
  for (const o of e) {
    if (!Ze(o)) continue;
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
function Dl(e) {
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
function Fo(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function El(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function On(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function In(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Ll(e, t) {
  const n = {};
  for (const o of e) {
    const i = t[o];
    i && Object.keys(i).length > 0 && (n[o] = i);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Ry = "day";
function $o(e) {
  return e.wells.length > 0 && e.wells.every((t) => t.target !== void 0 && t.channel !== void 0);
}
function Ny(e, t, n) {
  const r = n.require(e.chart.family), o = n.require(t), i = $o(r) && $o(o) ? Sy(e, r.wells, o.wells) : _y(e, o);
  return { ...i, chart: { ...i.chart, family: t } };
}
function _y(e, t) {
  var d;
  const { chart: n } = e, r = e.query ?? {}, o = Fo(n).length ? Fo(n) : r.measures ?? [], i = (r.timeDimensions ?? []).map((g) => g.dimension), a = On(n) ?? ((d = r.dimensions) == null ? void 0 : d[0]) ?? i[0], s = [a, ...r.dimensions ?? [], ...i].filter(
    (g, h, v) => !!g && v.indexOf(g) === h
  ), c = {
    ...e,
    chart: { ...n, mapping: void 0, familyOptions: void 0 }
  };
  if (!$o(t)) {
    const g = a ? { category: { member: a }, series: { mode: "measures", members: o } } : void 0;
    return t.supportsMapping ? { ...c, chart: { ...c.chart, mapping: g } } : c;
  }
  const u = [...o], m = [...s], f = (g) => i.includes(g) ? "time" : "category";
  let p = c;
  for (const g of t.wells) {
    if (!g.target || !g.channel) continue;
    const h = Fe(g, "category") ? [
      [m, f],
      [u, () => "number"]
    ] : [
      [u, () => "number"],
      [m, f]
    ];
    let v = 0;
    for (const [b, S] of h)
      for (let x = 0; x < b.length; ) {
        if (g.cardinality === "one" && v > 0 || !Fe(g, S(b[x]))) {
          x += 1;
          continue;
        }
        p = Fi(p, t.wells, g.id, b[x], S(b[x])), b.splice(x, 1), v += 1;
      }
  }
  return p;
}
function Vl(e) {
  return Qp(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function zl(e) {
  return Jp(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function xy(e, t) {
  return t.require(e).wells;
}
function Sn(e, t) {
  var i;
  const n = t.require(e.chart.family), r = an(e, n.wells), o = (i = n.readWells) == null ? void 0 : i.call(n, e);
  return o ? { ...r, ...o } : r;
}
function jt(e, t, n, r, o, i) {
  const a = i.require(t);
  if (a.placeField) return a.placeField(e, n, r, o);
  const s = Fi(e, a.wells, n, r, o);
  return My(e, s, a.wells);
}
function Hl(e, t, n, r, o) {
  const i = o.require(t);
  if (i.removeField) return i.removeField(e, n, r);
  const a = by(e, i.wells, n, r);
  return Gl(e, a, i.wells);
}
function My(e, t, n) {
  return Fy(e, Gl(e, t, n));
}
function Fy(e, t) {
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
function Gl(e, t, n) {
  var c, u;
  const r = ((c = e.query) == null ? void 0 : c.timeDimensions) ?? [];
  if (r.length === 0) return t;
  const o = ((u = t.query) == null ? void 0 : u.timeDimensions) ?? [], i = new Set(o.map((m) => m.dimension)), a = new Set(Object.values(an(t, n)).flat()), s = r.filter((m) => !i.has(m.dimension) && a.has(m.dimension));
  return s.length === 0 ? t : { ...t, query: { ...t.query ?? {}, timeDimensions: [...o, ...s] } };
}
function jl({
  options: e,
  className: t
}) {
  return /* @__PURE__ */ l("span", { className: I("cv-picker-aggseg", t), role: "radiogroup", "aria-label": "Aggregation", children: e.map((n) => /* @__PURE__ */ C(w.Fragment, { children: [
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
function Bl(e, t) {
  var o;
  const n = (o = e.meta) == null ? void 0 : o.aggLabel;
  if (typeof n == "string" && n.length > 0) return n;
  const r = Si(e) ?? "";
  return r === "value" ? cy(t == null ? void 0 : t.grain) : r === "max" && ir(e) === "counter" ? "latest" : r;
}
function $i(e) {
  return Si(e) === "value";
}
function Ai(e) {
  return `Plots each ${ki(e == null ? void 0 : e.grain)} as its own point instead of summarizing.`;
}
function $y(e, t, n) {
  if ($i(n)) return Ai(t);
  switch (ir(n) ?? e.map(ir).find(Boolean)) {
    case "flow":
      return "Adds up over time — total is usually the number you want.";
    case "gauge":
      return "A point-in-time reading — the average is usually right.";
    case "counter":
      return "Only ever grows — “latest” is the number you want.";
    case "stat": {
      const o = ki(t == null ? void 0 : t.grain);
      return `Describes one ${o} at a time — the average across ${o}s is usually right.`;
    }
    case "part":
      return e.map(ay).find(Boolean);
    default:
      return;
  }
}
function Ao({ option: e }) {
  const t = xr();
  return /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Ri(e, t) });
}
function ql({
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
  const { meta: u, isLoading: m } = Nt(), f = w.useMemo(() => {
    if (t) {
      const h = new Set(t);
      return Dt(u, n).filter((v) => h.has(v.cube));
    }
    return Dt(u, n, e);
  }, [u, n, e, t]), p = w.useMemo(() => {
    const h = Ay(f), v = h.length > 1, b = [];
    for (const [S, x] of h)
      for (const [k, R] of ry(x, () => "Other")) {
        const N = v ? k === "Other" ? S : `${S} · ${k}` : k;
        b.push({ key: `${S}:${k}`, label: N, items: R });
      }
    return b;
  }, [f]), d = p.length > 1, g = f.find((h) => h.name === r);
  return /* @__PURE__ */ C(Ve, { value: r, onValueChange: o, disabled: a || m, children: [
    /* @__PURE__ */ l(He, { id: s, className: c, children: /* @__PURE__ */ l(ze, { placeholder: m ? "Loading…" : i, children: g ? /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
      /* @__PURE__ */ l(Ao, { option: g }),
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: g.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ l(Ge, { children: p.map((h) => /* @__PURE__ */ C(So, { children: [
      d && h.label ? /* @__PURE__ */ l(ko, { children: h.label }) : null,
      h.items.map((v) => /* @__PURE__ */ l(ke, { value: v.name, children: /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
        /* @__PURE__ */ l(Ao, { option: v }),
        /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: v.label })
      ] }) }, v.name))
    ] }, h.key)) })
  ] });
}
function Ay(e) {
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
function Fa(e) {
  return e.reason === void 0;
}
function Wl(e, t, n, r, o) {
  const i = Ni(e, t, [...n]);
  return i ? Oy(i, e, r) : o == null ? void 0 : o(r);
}
function Oy(e, t, n) {
  return t.kinds.includes("number") ? n.type === "boolean" ? "Yes/no field — use it as a filter or in Split by" : n.memberType === "dimension" && n.type === "number" ? "One value per record — pick its total or average instead" : e : e;
}
function Iy(e, t, n) {
  if (t !== void 0 && Vl(e) !== t)
    return `This axis shows ${n ?? t}; ${e.label ?? "this field"} is ${zl(e)}`;
}
const Oi = "cube-viz:field-picker:only-compatible";
function Ul() {
  try {
    return globalThis.localStorage ?? void 0;
  } catch {
    return;
  }
}
function Kl() {
  var e;
  try {
    return ((e = Ul()) == null ? void 0 : e.getItem(Oi)) !== "0";
  } catch {
    return !0;
  }
}
function Py(e) {
  try {
    const t = Ul();
    if (!t) return;
    t.setItem(Oi, e ? "1" : "0");
  } catch {
  }
}
let Oo = Kl();
const qn = /* @__PURE__ */ new Set();
let qt;
function Ty() {
  for (const e of [...qn]) e();
}
function Yl(e) {
  e !== Oo && (Oo = e, Ty());
}
function Dy() {
  if (qt) return;
  const e = globalThis;
  if (typeof e.addEventListener != "function") return;
  const t = (n) => {
    const { key: r } = n;
    r !== null && r !== Oi || Yl(Kl());
  };
  e.addEventListener("storage", t), qt = () => {
    var n;
    return (n = e.removeEventListener) == null ? void 0 : n.call(e, "storage", t);
  };
}
const Ln = {
  get: () => Oo,
  // Server-rendered markup shows everything; the client adopts the stored choice on
  // hydration. (Rendering the hidden list on the server would mismatch anyway.)
  getServer: () => !1,
  set: (e) => {
    Py(e), Yl(e);
  },
  subscribe: (e) => (qn.add(e), Dy(), () => {
    qn.delete(e), qn.size === 0 && (qt == null || qt(), qt = void 0);
  })
}, Ey = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ l(Wc, { className: "cv-ec-icon--sm" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ l(ji, { className: "cv-ec-icon--sm" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ l(ji, { className: "cv-ec-icon--sm" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ l(ns, { className: "cv-ec-icon--sm" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ l(qc, { className: "cv-ec-icon--sm" }), metaKind: "time" }
}, $a = ["geoPoint", "number", "numberDimension", "category", "time"];
function Ii({
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
  var pe, ye;
  const { meta: u, isLoading: m } = Nt(), [f, p] = w.useState(!1), [d, g] = w.useState(""), h = w.useSyncExternalStore(
    Ln.subscribe,
    Ln.get,
    Ln.getServer
  ), v = Ln.set, b = w.useId(), [S, x] = w.useState(r.viewLocked ?? "tables"), [k, R] = w.useState({}), [N, F] = w.useState({});
  w.useEffect(() => {
    f && x(r.viewLocked ?? "tables");
  }, [f, r.viewLocked]);
  const E = w.useMemo(() => new Set(t), [t]), V = d.trim().toLowerCase(), O = xr(), $ = w.useMemo(() => {
    if (S !== "tables") {
      const A = r.views.find((j) => j.name === S) ?? pt(u, S);
      return A ? [{ cube: A, tag: "dataset" }] : [];
    }
    const G = [];
    r.sourceCube && G.push({ cube: r.sourceCube, tag: "source" });
    const ue = r.relatedCubes.some((A) => A.path ?? A.category) ? "More tables" : "Related tables", P = (A) => A.path ? ey(A.path) : A.category, M = /* @__PURE__ */ new Map();
    for (const A of r.relatedCubes) {
      const j = P(A);
      j !== void 0 && !M.has(j) && M.set(j, M.size);
    }
    const _ = [...r.relatedCubes].sort((A, j) => {
      const q = P(A), K = P(j);
      return q === K ? 0 : q === void 0 ? 1 : K === void 0 ? -1 : (M.get(q) ?? 0) - (M.get(K) ?? 0);
    });
    for (const A of _) G.push({ cube: A, tag: "related", heading: P(A) ?? ue });
    return G;
  }, [S, r, u]), T = [
    ...$a.filter((G) => Fe(e, G)),
    ...$a.filter((G) => !Fe(e, G))
  ], D = (G) => {
    const oe = [], ue = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Set();
    for (const M of T) {
      const _ = Ey[M], A = Ni(e, M, n ?? []);
      let j = Dt(u, _.metaKind, G);
      M === "time" && (j = [...j].sort(
        (q, K) => Number(jn(K)) - Number(jn(q))
      ));
      for (const q of j) {
        if (E.has(q.name) || P.has(q.name)) continue;
        const K = sr(q) ?? ly(u, q);
        if (V && !(q.label.toLowerCase().includes(V) || q.name.toLowerCase().includes(V) || ((K == null ? void 0 : K.toLowerCase().includes(V)) ?? !1)))
          continue;
        P.add(q.name);
        const ee = xl(q), Re = ee ? `g:${ee.toLowerCase()}` : `k:${_.label}`;
        let be = ue.get(Re);
        be || (be = {
          key: Re,
          label: ee ?? _.label,
          headerIcon: ee ? void 0 : _.icon,
          rejected: A !== void 0,
          items: []
        }, ue.set(Re, be), oe.push(Re)), A === void 0 && (be.rejected = !1), be.items.push({
          option: q,
          kind: M,
          reason: Wl(e, M, n ?? [], q, o)
        });
      }
    }
    return oe.map((M) => ue.get(M));
  }, z = $.map((G) => ({ section: G, groups: D(G.cube.name) })).filter((G) => G.groups.length > 0), H = h ? z.reduce(
    (G, oe) => G + oe.groups.reduce((ue, P) => ue + P.items.filter((M) => !Fa(M)).length, 0),
    0
  ) : 0, L = h ? z.map((G) => ({
    section: G.section,
    groups: G.groups.map((oe) => ({ ...oe, rejected: !1, items: oe.items.filter(Fa) })).filter((oe) => oe.items.length > 0)
  })).filter((G) => G.groups.length > 0) : z, J = L.length > 0, Z = !J && H > 0, ne = (G, oe) => {
    i(G, oe), p(!1), g("");
  }, le = S === "tables" ? "All related tables" : ((pe = r.views.find((G) => G.name === S)) == null ? void 0 : pe.title) ?? ((ye = pt(u, S)) == null ? void 0 : ye.title) ?? S, fe = r.viewLocked ? r.views.filter((G) => G.name === r.viewLocked) : [], Q = h ? H > 0 ? `Only compatible fields — ${H} hidden` : "Only compatible fields — none hidden" : "Show only fields that can go in this slot";
  return /* @__PURE__ */ C(je, { open: f, onOpenChange: p, children: [
    /* @__PURE__ */ l(Be, { asChild: !0, children: c }),
    /* @__PURE__ */ C(qe, { align: a, side: s, className: "cv-picker", children: [
      /* @__PURE__ */ C("div", { className: "cv-picker-header", children: [
        /* @__PURE__ */ C("div", { className: "cv-picker-search", children: [
          /* @__PURE__ */ l(Qa, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l(
            "input",
            {
              autoFocus: !0,
              id: b,
              "aria-label": "Search fields",
              value: d,
              onChange: (G) => g(G.target.value),
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
            "aria-label": Q,
            title: Q,
            onClick: () => v(!h),
            className: I("cv-picker-compat", h && "cv-picker-compat--on"),
            children: [
              /* @__PURE__ */ l(Bc, { className: "cv-ec-icon" }),
              h && H > 0 ? /* @__PURE__ */ l("span", { className: "cv-picker-compat-count", children: H }) : null
            ]
          }
        ),
        fe.length > 0 ? /* @__PURE__ */ l(
          Ly,
          {
            browse: S,
            label: le,
            views: fe,
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
      /* @__PURE__ */ l("div", { className: "cv-picker-list", children: J ? L.map(({ section: G, groups: oe }, ue) => {
        const P = oe.reduce((K, ee) => K + ee.items.length, 0), M = G.tag === "related", _ = k[G.cube.name] ?? M, A = V.length > 0 ? !0 : !_, j = ue > 0 ? L[ue - 1].section : void 0, q = G.tag === "related" && G.heading !== void 0 && ((j == null ? void 0 : j.tag) !== "related" || j.heading !== G.heading);
        return /* @__PURE__ */ C("div", { children: [
          q ? /* @__PURE__ */ l("div", { className: "cv-picker-related-heading", children: G.heading }) : null,
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onClick: () => R((K) => ({ ...K, [G.cube.name]: !_ })),
              className: "cv-picker-table",
              children: [
                A ? /* @__PURE__ */ l(St, { className: "cv-ec-icon--sm cv-ec-icon--muted" }) : /* @__PURE__ */ l(mr, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l(Za, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
                /* @__PURE__ */ l("span", { className: "cv-picker-table-title", children: G.cube.title }),
                G.cube.grain ? /* @__PURE__ */ l("span", { className: "cv-picker-grain", children: G.cube.grain }) : null,
                G.tag === "source" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--primary", children: "Main table" }) : G.tag === "dataset" ? /* @__PURE__ */ l("span", { className: "cv-picker-tag cv-picker-tag--muted", children: "dataset" }) : null,
                /* @__PURE__ */ l("span", { className: "cv-picker-count", children: P })
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
                uy(K.items).map((ee) => {
                  const Re = ee.familyKey ? N[ee.familyKey] : void 0, be = ee.variants.findIndex((Ne) => Ne.option.name === Re), Y = be >= 0 ? be : ee.defaultIndex, { option: ce, kind: de, reason: me } = ee.variants[Y], Qe = ee.familyKey ? {
                    options: ee.variants.map((Ne, et) => {
                      const he = pt(u, Ne.option.cube), We = $i(Ne.option);
                      return {
                        label: Bl(Ne.option, he),
                        selected: et === Y,
                        disabled: Ne.reason !== void 0,
                        // The row-level variant is a grain switch (one
                        // point per row) — its tooltip says so, and the
                        // divider keeps it from reading as a sibling
                        // summary of total/avg.
                        title: Ne.reason ?? (We ? Ai(he) : void 0),
                        divider: We && et > 0,
                        onSelect: () => {
                          F((Le) => ({ ...Le, [ee.familyKey]: Ne.option.name }));
                        }
                      };
                    })
                  } : void 0;
                  return /* @__PURE__ */ l(
                    Vy,
                    {
                      option: ce,
                      label: ee.familyKey ? ee.label : void 0,
                      unitBadge: Ri(ce, O),
                      badge: de === "time" && jn(ce) ? "default" : void 0,
                      reason: me,
                      agg: Qe,
                      onPick: () => ne(ce.name, de)
                    },
                    ee.familyKey ?? ce.name
                  );
                })
              ]
            },
            K.key
          )) : null
        ] }, G.cube.name);
      }) : Z ? /* @__PURE__ */ C("div", { className: "cv-picker-empty", children: [
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
function Ly({ browse: e, label: t, views: n, onBrowse: r }) {
  const [o, i] = w.useState(!1), a = (c) => {
    r(c), i(!1);
  }, s = `Data source: ${t}`;
  return /* @__PURE__ */ C(je, { open: o, onOpenChange: i, children: [
    /* @__PURE__ */ l(
      Be,
      {
        className: "cv-picker-source-trigger",
        "aria-label": s,
        title: s,
        children: /* @__PURE__ */ l(es, { className: "cv-ec-icon" })
      }
    ),
    /* @__PURE__ */ C(qe, { align: "end", className: "cv-picker-source-menu", children: [
      /* @__PURE__ */ l(Aa, { active: e === "tables", icon: /* @__PURE__ */ l(Za, { className: "cv-ec-icon" }), onClick: () => a("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ C(we, { children: [
        /* @__PURE__ */ l("div", { className: "cv-ec-menu-heading", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ l(
          Aa,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ l(ts, { className: "cv-ec-icon" }),
            onClick: () => a(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function Aa({
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
function Vy({ option: e, label: t, reason: n, onPick: r, unitBadge: o, badge: i, agg: a }) {
  const s = o ? /* @__PURE__ */ l("span", { className: "cv-field-unit", children: o }) : null, c = t ?? e.label, u = a ? /* @__PURE__ */ l(jl, { options: a.options }) : null, m = n ? /* @__PURE__ */ C(
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
const zy = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], gn = "yyyy-MM-dd";
function Hy(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Oa(e) {
  if (!e) return;
  const t = Ua(e, gn, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Pi({ value: e, onChange: t }) {
  const [n, r] = w.useState(!1), o = typeof e == "string", [i, a] = Hy(e), s = Oa(i), c = Oa(a), u = s ? { from: s, to: c } : void 0, m = o ? e : s && c ? `${Se(s, "MMM d, yyyy")} – ${Se(c, "MMM d, yyyy")}` : s ? Se(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ C(je, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ C(re, { variant: "outline", size: "sm", className: I("cv-daterange-trigger"), children: [
      /* @__PURE__ */ l(Ja, { className: "cv-ec-icon cv-ec-icon--muted" }),
      /* @__PURE__ */ l("span", { className: I("cv-daterange-label", m === "Any time" && "cv-daterange-label--placeholder"), children: m })
    ] }) }),
    /* @__PURE__ */ C(qe, { align: "start", className: "cv-daterange-popover", children: [
      /* @__PURE__ */ C("div", { className: "cv-daterange-presets", children: [
        zy.map((f) => /* @__PURE__ */ l(
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
        cl,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([Se(f.from, gn), Se(f.to, gn)]) : f != null && f.from ? t([Se(f.from, gn), Se(f.from, gn)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
const Ql = w.createContext({});
function Gy({
  createVariable: e,
  children: t
}) {
  const n = w.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ l(Ql.Provider, { value: n, children: t });
}
function jy() {
  return w.useContext(Ql);
}
function By({ kind: e, value: t, onChange: n, className: r }) {
  const o = An(), i = (o == null ? void 0 : o.decls) ?? [], { createVariable: a } = jy(), [s, c] = w.useState(!1), [u, m] = w.useState(!1), [f, p] = w.useState(""), d = w.useMemo(() => Uv(i, e), [i, e]), g = d.find((b) => b.name === t), h = (b) => {
    n(b), c(!1), m(!1);
  }, v = () => {
    if (!a) return;
    const b = Qv(e, f || "Variable", i);
    a(b), h(b.name), p("");
  };
  return /* @__PURE__ */ C(
    je,
    {
      open: s,
      onOpenChange: (b) => {
        c(b), b || m(!1);
      },
      children: [
        /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ C(re, { variant: "outline", size: "sm", className: I("cv-var-trigger", r), children: [
          /* @__PURE__ */ l(Uc, { className: "cv-ec-icon cv-ec-icon--muted" }),
          /* @__PURE__ */ l("span", { className: I("cv-var-trigger-label", !g && "cv-var-trigger-label--placeholder"), children: g ? g.label ?? g.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ C(qe, { align: "start", className: "cv-var-popover", children: [
          d.length > 0 ? d.map((b) => /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              onClick: () => h(b.name),
              className: "cv-ec-menu-item",
              children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-menu-label", children: b.label ?? b.name }),
                /* @__PURE__ */ l("span", { className: "cv-var-type", children: b.type }),
                b.name === t ? /* @__PURE__ */ l(nn, { className: "cv-ec-icon" }) : null
              ]
            },
            b.name
          )) : /* @__PURE__ */ l("p", { className: "cv-var-empty", children: "No matching variables yet." }),
          a ? /* @__PURE__ */ l("div", { className: "cv-var-new", children: u ? /* @__PURE__ */ C("div", { className: "cv-var-new-form", children: [
            /* @__PURE__ */ l(
              Ce,
              {
                autoFocus: !0,
                "aria-label": "New variable label",
                value: f,
                onChange: (b) => p(b.target.value),
                onKeyDown: (b) => {
                  b.key === "Enter" && v(), b.key === "Escape" && m(!1);
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
                /* @__PURE__ */ l(Tt, { className: "cv-ec-icon" }),
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
  const i = Me(t), [a, s] = w.useState(i ? "var" : "fixed");
  w.useEffect(() => {
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
            s("fixed"), Me(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ l("button", { type: "button", className: c(a === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    a === "var" ? /* @__PURE__ */ l(
      By,
      {
        kind: e,
        value: Me(t) ? t.var : void 0,
        onChange: (u) => n({ var: u })
      }
    ) : r(Me(t) ? void 0 : t, (u) => n(u))
  ] });
}
const qy = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Xr(e) {
  return "member" in e && "operator" in e;
}
function Wy({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: o,
  disabled: i,
  className: a
}) {
  var O;
  const { meta: s } = Nt(), c = ((O = An()) == null ? void 0 : O.decls) ?? [], [u, m] = w.useState(null), [f, p] = w.useState(null), d = r ?? [], g = d.length === 1 && !Xr(d[0]) && "or" in d[0] && Array.isArray(d[0].or) && d[0].or.every(Xr) ? d[0] : void 0, h = g ? "any" : "all", v = [], b = [];
  g || d.forEach(($) => Xr($) ? v.push($) : b.push($));
  const S = g ? g.or : v, x = b.length === 0 && (S.length >= 2 || h === "any"), k = ($) => h === "any" ? $.length ? [{ or: $ }] : [] : [...$, ...b], R = ($) => {
    const T = $.filter((z) => z.member.length > 0), D = k(T);
    o(D.length > 0 ? D : void 0);
  }, N = ($) => {
    const T = $ === "any" ? S.length ? [{ or: S }] : [] : [...S];
    o(T.length > 0 ? T : void 0);
  }, F = ($, T) => R(S.map((D, z) => z === $ ? { ...D, ...T } : D)), E = ($) => R(S.filter((T, D) => D !== $)), V = ($) => {
    const D = { ...f ?? { member: "", operator: "equals", values: [] }, ...$ };
    D.member ? (p(null), m(S.length), R([...S, D])) : p(D);
  };
  return /* @__PURE__ */ C("div", { "data-slot": "filter-builder", className: I("cv-filter-builder", a), children: [
    S.length === 0 && !f ? /* @__PURE__ */ l("p", { className: "cv-filter-empty", children: "No filters — the chart shows all rows." }) : null,
    x ? /* @__PURE__ */ C("div", { className: "cv-filter-match", children: [
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
    S.map(($, T) => {
      const D = Te(s, $.member);
      return u === T ? /* @__PURE__ */ l(
        Ia,
        {
          leaf: $,
          member: D,
          cube: e,
          cubes: t,
          scope: n,
          disabled: i,
          onChange: (z) => F(T, z),
          onDone: () => m(null),
          onRemove: () => E(T)
        },
        T
      ) : /* @__PURE__ */ l(
        Uy,
        {
          text: Ky($, D == null ? void 0 : D.label, c),
          disabled: i,
          onEdit: () => m(T),
          onRemove: () => E(T)
        },
        T
      );
    }),
    f ? /* @__PURE__ */ l(
      Ia,
      {
        leaf: f,
        member: Te(s, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: i,
        onChange: V,
        onRemove: () => p(null)
      }
    ) : null,
    b.length > 0 ? /* @__PURE__ */ C("p", { className: "cv-filter-groups-note", children: [
      b.length,
      " grouped filter",
      b.length === 1 ? "" : "s",
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
          m(null), p({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ l(Tt, { className: "cv-ec-icon--lg" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Uy({
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
function Ia({
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
  const { meta: u } = Nt(), m = Ma(t == null ? void 0 : t.type), f = m.includes(e.operator) ? e.operator : m[0], p = !Mo.has(f), d = w.useId(), g = w.useId(), h = w.useId(), v = w.useId(), b = w.useId(), S = w.useId();
  w.useEffect(() => {
    f !== e.operator && a({ operator: f });
  }, [e.operator, a, f]);
  const x = (k) => {
    const R = Te(u, k);
    a({ member: k, operator: Ma(R == null ? void 0 : R.type)[0], values: [] });
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
          Ii,
          {
            well: qy,
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
                id: g,
                disabled: i,
                "aria-labelledby": `${d} ${g}`,
                className: "cv-filter-field-trigger",
                children: [
                  t ? /* @__PURE__ */ C("span", { className: "cv-filter-field-value", children: [
                    /* @__PURE__ */ l(Ao, { option: t }),
                    /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: t.label })
                  ] }) : /* @__PURE__ */ l("span", { className: "cv-filter-field-placeholder", children: "Choose a field…" }),
                  /* @__PURE__ */ l(St, { className: "cv-ec-icon--lg cv-ec-icon--muted" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ l(
        ql,
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
        Ve,
        {
          value: f,
          onValueChange: (k) => a({
            operator: k,
            values: Mo.has(k) ? [] : e.values
          }),
          disabled: i,
          children: [
            /* @__PURE__ */ l(
              He,
              {
                id: v,
                "aria-labelledby": `${h} ${v}`,
                className: "cv-ec-full",
                children: /* @__PURE__ */ l(ze, {})
              }
            ),
            /* @__PURE__ */ l(Ge, { children: m.map((k) => /* @__PURE__ */ l(ke, { value: k, children: Ol[k] }, k)) })
          ]
        }
      )
    ] }),
    p ? /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
      /* @__PURE__ */ l("label", { id: b, htmlFor: S, className: "cv-ec-label", children: "Value" }),
      /* @__PURE__ */ l(
        Yy,
        {
          fieldId: S,
          labelId: b,
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (k) => a({ values: k })
        }
      )
    ] }) : null
  ] });
}
function Ky(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const o = Ol[e.operator] ?? e.operator;
  if (Mo.has(e.operator)) return `${r} ${o}`;
  const i = (e.values ?? []).map((a) => {
    if (Me(a)) {
      const s = n.find((c) => c.name === a.var);
      return `{${((s == null ? void 0 : s.label) ?? a.var).replace(/[{}]/g, "")}}`;
    }
    return String(a);
  });
  return i.length > 0 ? `${r} ${o} ${i.join(", ")}` : `${r} ${o} …`;
}
function Yy({
  values: e,
  memberType: t,
  onChange: n,
  fieldId: r,
  labelId: o
}) {
  const i = e ?? [], a = i.length === 1 && Me(i[0]);
  if (t === "time") {
    const u = a ? i[0] : Qy(i);
    return /* @__PURE__ */ l(
      tn,
      {
        labelId: o,
        kind: "dateRange",
        value: u,
        onChange: (m) => n(m === void 0 ? [] : Me(m) ? [m] : Xy(m)),
        renderFixed: (m, f) => /* @__PURE__ */ l(Pi, { value: m, onChange: f })
      }
    );
  }
  const s = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? i[0] : i.filter((u) => !Me(u));
  return /* @__PURE__ */ l(
    tn,
    {
      labelId: o,
      kind: s,
      value: c,
      onChange: (u) => n(u === void 0 ? [] : Me(u) ? [u] : u),
      renderFixed: (u, m) => /* @__PURE__ */ l(
        Ce,
        {
          id: r,
          value: (u ?? []).map(String).join(", "),
          onChange: (f) => m(Jy(f.target.value)),
          placeholder: "value, value…",
          className: "cv-ec-h8"
        }
      )
    }
  );
}
function Qy(e) {
  const t = e.filter((n) => !Me(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Xy(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Jy(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Zy({ spec: e, update: t, cube: n, scopeCubes: r, scope: o }) {
  const { query: i } = e, a = (i.filters ?? []).length, s = (c) => t({ ...e, query: { ...i, filters: c } });
  return /* @__PURE__ */ C(je, { children: [
    /* @__PURE__ */ C(
      Be,
      {
        className: I(
          "cv-filters-trigger",
          a > 0 && "cv-filters-trigger--active"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ l(Kc, { className: "cv-ec-icon--lg" }),
          "Filter",
          a > 0 ? /* @__PURE__ */ l("span", { className: "cv-filters-count", children: a }) : null
        ]
      }
    ),
    /* @__PURE__ */ C(qe, { align: "end", className: "cv-filters-popover", children: [
      /* @__PURE__ */ C("div", { className: "cv-filters-header", children: [
        /* @__PURE__ */ l("p", { className: "cv-filters-title", children: "Filters" }),
        /* @__PURE__ */ l("p", { className: "cv-filters-desc", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ l(eb, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ l(Wy, { cube: n, cubes: r, scope: o, value: i.filters, onChange: s })
    ] })
  ] });
}
function eb({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Nt(), o = my(r, n);
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
function tb(e, t, n, r) {
  var i;
  const o = ((i = e.chart.axes) == null ? void 0 : i[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...o, ...r } } } });
}
function nb({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: o
}) {
  var f;
  const i = ((f = e.chart.axes) == null ? void 0 : f[n]) ?? {}, a = i.label ?? o ?? "", s = i.label === "", c = w.useId(), u = w.useId(), m = n === "y" ? "Value axis title" : "Horizontal axis title";
  return /* @__PURE__ */ C("div", { className: I("cv-axis-chrome", s && "cv-axis-chrome--hidden"), children: [
    r ? /* @__PURE__ */ l("span", { id: c, className: "cv-axis-chrome-label", children: r }) : null,
    /* @__PURE__ */ l(
      "input",
      {
        id: u,
        ...r ? { "aria-labelledby": c } : { "aria-label": m },
        value: a,
        placeholder: "No title",
        onChange: (p) => tb(e, t, n, { label: p.target.value }),
        title: "Axis title — clear it to remove the title",
        className: "cv-axis-chrome-input"
      }
    )
  ] });
}
function rb({
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
          n ? /* @__PURE__ */ l(Yc, { className: "cv-ec-icon" }) : /* @__PURE__ */ l(Qc, { className: "cv-ec-icon" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
const Xl = w.forwardRef(
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
Xl.displayName = "Label";
function ve({
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
      /* @__PURE__ */ l(Xl, { htmlFor: r, className: "cv-field-row-label", children: e }),
      o ? /* @__PURE__ */ l("div", { className: "cv-field-row-action", children: o }) : null
    ] }),
    a,
    n ? /* @__PURE__ */ l("p", { className: "cv-field-row-error", children: n }) : t ? /* @__PURE__ */ l("p", { className: "cv-field-row-hint", children: t }) : null
  ] });
}
function Io({
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
  const a = w.useId();
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
        /* @__PURE__ */ l(Io, { id: a, checked: n, onChange: r, disabled: o })
      ]
    }
  );
}
const ob = {
  none: "None",
  rollingAvg: "Rolling average",
  cumulative: "Running total",
  percentOfTotal: "% of total"
}, ib = [
  "none",
  "rollingAvg",
  "cumulative",
  "percentOfTotal"
];
function ab({ spec: e, update: t }) {
  var b, S, x;
  const n = Rt(), { chart: r } = e, o = r.family, i = r.familyOptions ?? {}, a = n.require(o);
  if (a.Customize) {
    const k = a.Customize;
    return /* @__PURE__ */ l(k, { spec: e, update: t });
  }
  const s = (k) => t({ ...e, chart: { ...r, ...k } }), c = (k) => t({ ...e, chart: { ...r, familyOptions: { ...i, ...k } } }), u = ((S = (b = r.mapping) == null ? void 0 : b.series) == null ? void 0 : S.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (o === "area" ? u : n.defaults(o).envelope.stackMode) ?? "none", f = m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none", p = ((x = r.transform) == null ? void 0 : x.kind) ?? "none", d = fi(a) ? /* @__PURE__ */ C(we, { children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Compare",
        hint: p === "percentOfTotal" ? "Each value as a share of its category total." : void 0,
        children: /* @__PURE__ */ C(
          Ve,
          {
            value: p,
            onValueChange: (k) => {
              var R;
              return s({
                transform: k === "none" ? void 0 : k === "rollingAvg" ? { kind: "rollingAvg", window: ((R = r.transform) == null ? void 0 : R.window) ?? zn } : { kind: k }
              });
            },
            children: [
              /* @__PURE__ */ l(He, { "aria-label": "Compare", className: "cv-ec-h8", children: /* @__PURE__ */ l(ze, {}) }),
              /* @__PURE__ */ l(Ge, { children: ib.map((k) => /* @__PURE__ */ l(ke, { value: k, children: ob[k] }, k)) })
            ]
          }
        )
      }
    ),
    p === "rollingAvg" ? /* @__PURE__ */ l(lb, { label: "Window (points)", children: (k) => {
      var R;
      return /* @__PURE__ */ l(
        Ce,
        {
          id: k,
          type: "number",
          min: 2,
          max: 90,
          className: "cv-ec-h8 cv-transform-window",
          value: ((R = r.transform) == null ? void 0 : R.window) ?? zn,
          onChange: (N) => {
            const F = parseInt(N.target.value, 10), E = Number.isFinite(F) ? Math.min(90, Math.max(2, F)) : zn;
            s({ transform: { kind: "rollingAvg", window: E } });
          }
        }
      );
    } }) : null
  ] }) : null, g = /* @__PURE__ */ l(ve, { label: "Line shape", children: /* @__PURE__ */ l(
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
  ) }), h = /* @__PURE__ */ l(ve, { label: "Stacked", children: /* @__PURE__ */ l(
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
        return /* @__PURE__ */ C(we, { children: [
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
        return g;
      case "area":
        return /* @__PURE__ */ C(we, { children: [
          g,
          h,
          r.stackMode === void 0 ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-customize-hint", children: ((R = (k = r.mapping) == null ? void 0 : k.series) == null ? void 0 : R.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ C(we, { children: [
          /* @__PURE__ */ l(
            wt,
            {
              label: "Donut",
              checked: typeof i.innerRadiusPct == "number" && i.innerRadiusPct > 0,
              onChange: (N) => c({ innerRadiusPct: N ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ l(ve, { label: "Slice labels", children: /* @__PURE__ */ l(
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
function sb(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0 || fi(n);
}
function lb({
  label: e,
  children: t
}) {
  const n = w.useId();
  return /* @__PURE__ */ C("div", { className: "cv-customize-field", children: [
    /* @__PURE__ */ l("label", { htmlFor: n, className: "cv-ec-label", children: e }),
    t(n)
  ] });
}
function Jl(e) {
  const t = e.query ?? {}, n = [];
  for (const r of t.measures ?? []) n.push({ member: r, kind: "number" });
  for (const r of t.timeDimensions ?? [])
    r.granularity !== void 0 && n.push({ member: r.dimension, kind: "time" });
  for (const r of t.dimensions ?? []) n.push({ member: r, kind: "category" });
  return n;
}
function Zl(e, t) {
  const n = [...t], r = [], o = [];
  for (const i of e) {
    if (!Ze(i)) continue;
    const a = i.cardinality === "one" ? 1 : Number.POSITIVE_INFINITY, s = [], c = [];
    for (let u = 0; u < n.length && s.length < a; )
      Fe(i, n[u].kind) ? (s.push(n[u].kind), c.push(n[u].member), n.splice(u, 1)) : u += 1;
    s.length > 0 ? r.push({ well: i, kinds: s, members: c }) : i.optional || o.push(i);
  }
  return { matched: r, missing: o, leftover: n };
}
function cb(e) {
  let t = 0;
  for (const n of e)
    Ze(n) && (t += n.optional ? 1 : 3);
  return t;
}
function ub(e, t) {
  return e.some((n) => Ze(n) && n.cardinality === "many" && Fe(n, t));
}
const db = 0.35, mb = 0.4, fb = 0.3, gb = 0.1;
function pb(e, t) {
  const n = e.canonicalTimeWell !== void 0;
  return t ? n ? fb : e.supportsCartesianAxes ? gb : e.wells.some(
    (o) => Ze(o) && o.channel === "x" && Fe(o, "time")
  ) ? -0.3 : 0 : n ? -0.2 : 0;
}
function ec(e) {
  const t = e.filter(Ze);
  return t.length > 0 && t.every((n) => n.channel === "detail");
}
function hb(e) {
  return e.kinds.includes("number") ? "a measure" : e.kinds.includes("time") ? e.kinds.includes("category") ? "a date or category" : "a date" : "a category";
}
const vb = (e, t, n) => e === 1 ? t : n;
function yb(e, t) {
  if (t.missing.length > 0) {
    const s = t.missing[0];
    return `${s.label} needs ${hb(s)}`;
  }
  const n = /* @__PURE__ */ new Map();
  let r = 0;
  for (const s of t.matched)
    r += s.kinds.filter((c) => c === "number").length, s.well.channel && n.set(s.well.channel, [...n.get(s.well.channel) ?? [], ...s.kinds]);
  const o = n.get("x") ?? [], i = n.get("y") ?? [], a = `${r} ${vb(r, "measure", "measures")}`;
  return ec(e.wells) ? "Every field, row by row" : n.has("row") ? "A grid of two categories" : o.includes("number") && i.includes("number") ? "One measure against another" : o.includes("time") ? `${a} over time` : o.includes("category") ? n.has("color") ? `${a} by category, split in colours` : `${a} by category` : r === 1 ? "One headline number" : r > 1 ? `${a}, no breakdown` : "Fits your fields";
}
function bb(e, t) {
  const n = Jl(t), r = n.map((a) => a.kind), o = r.includes("time"), i = [];
  for (const a of e.list()) {
    if (a.queryless) continue;
    const s = a.wells, c = Zl(s, n), u = cb(s), m = Math.max(0, n.length - c.matched.length), f = ky(s, r) + 0.5 * m, p = u > 0 ? f / u : 0, d = c.leftover.filter(
      (h) => h.kind !== "time" && !ub(s, h.kind)
    ).length, g = p - db * d + pb(a, o) - (ec(s) ? mb : 0);
    i.push({
      family: a.family,
      descriptor: a,
      score: Math.round(g * 1e3) / 1e3,
      fits: u > 0 && c.missing.length === 0,
      reason: yb(a, c)
    });
  }
  return i.sort((a, s) => s.score - a.score || a.descriptor.order - s.descriptor.order);
}
function wb(e, t = 3) {
  return e.filter((n) => n.fits).slice(0, t);
}
function Cb(e, t, n) {
  const r = e.require(n), o = Zl(r.wells, Jl(t));
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
function tc(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Ny(e, r, n));
  };
}
function Sb({ spec: e, update: t, empty: n }) {
  const r = Rt(), o = e.chart.family, i = tc(e, t, r);
  return n ? /* @__PURE__ */ l("div", { className: "cv-type-chooser", children: /* @__PURE__ */ C("div", { className: "cv-type-chooser-card", children: [
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-title", children: "Choose a chart type" }),
    /* @__PURE__ */ l("p", { className: "cv-type-chooser-sub", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ l(nc, { spec: e, family: o, onPick: i, families: r })
  ] }) }) : null;
}
function kb({ spec: e, update: t }) {
  const n = Rt(), r = e.chart.family, o = tc(e, t, n), i = n.require(r), a = i.icon;
  return /* @__PURE__ */ C(je, { children: [
    /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ C(
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
    /* @__PURE__ */ C(qe, { align: "center", className: "cv-type-popover cv-type-popover--preview", children: [
      /* @__PURE__ */ l(nc, { spec: e, family: r, onPick: o, families: n }),
      sb(r, n) ? /* @__PURE__ */ C("div", { className: "cv-type-popover-section cv-type-popover-section--divided", children: [
        /* @__PURE__ */ l("p", { className: "cv-type-popover-heading", children: "Options" }),
        /* @__PURE__ */ l(ab, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function nc({ spec: e, family: t, onPick: n, families: r }) {
  const o = w.useMemo(() => bb(r, e), [r, e]), i = w.useMemo(() => wb(o), [o]), a = w.useMemo(
    () => new Map(o.map((f) => [f.family, f])),
    [o]
  ), s = w.useMemo(
    () => new Set(o.filter((f) => f.fits).map((f) => f.family)),
    [o]
  ), c = xb(e, r, s), u = (f, p) => /* @__PURE__ */ l(
    Rb,
    {
      fit: f,
      active: f.family === t,
      preview: c.get(f.family),
      families: r,
      reason: p ? f.reason : void 0,
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
function Rb({
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
          Db,
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
function rc(e, t) {
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
function Nb(e) {
  var t, n, r;
  return (((t = e == null ? void 0 : e.measures) == null ? void 0 : t.length) ?? 0) > 0 || (((n = e == null ? void 0 : e.dimensions) == null ? void 0 : n.length) ?? 0) > 0 || (((r = e == null ? void 0 : e.timeDimensions) == null ? void 0 : r.some((o) => o.granularity !== void 0)) ?? !1);
}
const Pa = 200, _b = () => () => {
};
function xb(e, t, n) {
  const r = e.query, o = Nb(r), i = w.useMemo(() => {
    const p = r == null ? void 0 : r.limit;
    return {
      ...r ?? {},
      limit: typeof p == "number" ? Math.min(p, Pa) : Pa
    };
  }, [r]), a = An(), s = w.useRef(null);
  s.current === null && (s.current = el());
  const c = s.current, u = () => a ? c(i, a.store.getAll(), a.decls) : i, m = w.useSyncExternalStore(
    a ? a.store.subscribe : _b,
    u,
    u
  ), { resultSet: f } = il(m, { skip: !o });
  return w.useMemo(() => {
    const p = /* @__PURE__ */ new Map();
    for (const d of t.list()) {
      const g = d.family;
      if (d.queryless || o && n.has(g) && !f) continue;
      const b = (f && n.has(g) ? Mb(e, g, t, f, m) : void 0) ?? Tb(g, t);
      b && p.set(g, b);
    }
    return p;
  }, [e, t, f, m, n, o]);
}
function Mb(e, t, n, r, o) {
  try {
    const i = t === e.chart.family ? e : Cb(n, e, t), a = rc(i.chart, n), s = Qs(r, a, i.query ?? o, void 0, n);
    return s.empty ? void 0 : { key: `${t}:live:${JSON.stringify(o)}`, data: s, options: a };
  } catch {
    return;
  }
}
const Lt = "sample.category", Mn = "sample.group", Ae = "sample.value", Ke = "sample.count", oc = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Po = [18, 27, 21, 34, 26, 39], To = [12, 9, 17, 14, 22, 16], Fb = oc.flatMap((e, t) => [
  { [Lt]: e, [Mn]: "North", [Ae]: Po[t], [Ke]: To[t] },
  {
    [Lt]: e,
    [Mn]: "South",
    [Ae]: Math.round(Po[t] * 0.62),
    [Ke]: Math.round(To[t] * 0.78)
  }
]), $b = {
  measures: [Ae, Ke],
  dimensions: [Lt, Mn]
}, Ab = {
  measures: {
    [Ae]: { title: "Value", shortTitle: "Value", type: "number" },
    [Ke]: { title: "Count", shortTitle: "Count", type: "number" }
  },
  dimensions: {
    [Lt]: { title: "Day", shortTitle: "Day", type: "string" },
    [Mn]: { title: "Group", shortTitle: "Group", type: "string" }
  },
  segments: {},
  timeDimensions: {}
};
function ic(e) {
  const t = [
    { key: Ae, label: "Value", data: Po, colorToken: "chart-1" },
    { key: Ke, label: "Count", data: To, colorToken: "chart-2" }
  ].slice(0, e);
  return {
    categories: oc,
    series: t,
    raw: { rows: Fb, query: $b, annotation: Ab },
    empty: !1
  };
}
const Ob = ic(1), Ib = ic(2), pn = (e, t) => ({
  family: e,
  mapping: { category: { member: Lt }, series: { mode: "measures", members: t } }
}), Pb = {
  bar: pn("bar", [Ae, Ke]),
  line: pn("line", [Ae, Ke]),
  // No forced stackMode: the tile must show what PICKING area does for this shape
  // (measures-mode ⇒ overlap). Advertising a stack the pick doesn't deliver is how
  // users end up asking why their area chart "isn't stacking".
  area: pn("area", [Ae, Ke]),
  pie: pn("pie", [Ae]),
  scatter: { family: "scatter", familyOptions: { x: Ae, y: Ke } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: Lt },
      series: { mode: "pivot", value: Ae, pivot: Mn }
    }
  },
  kpi: { family: "kpi", familyOptions: { measure: Ae, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: Lt }, { member: Ae }, { member: Ke }] }
  }
};
function Tb(e, t) {
  const n = Pb[e] ?? pn(e, [Ae, Ke]);
  return {
    key: `${e}:sample`,
    data: e === "pie" ? Ob : Ib,
    options: rc(n, t)
  };
}
const Db = w.memo(function({
  preview: t,
  families: n,
  fallback: r
}) {
  const o = w.useRef(null);
  return w.useEffect(() => {
    const i = o.current;
    if (i)
      for (const a of i.querySelectorAll("[tabindex]")) a.tabIndex = -1;
  }), /* @__PURE__ */ l(Eb, { fallback: r, children: /* @__PURE__ */ l("div", { ref: o, className: "cv-type-tile-preview", "aria-hidden": !0, children: /* @__PURE__ */ l("div", { className: "cv-type-tile-canvas", children: /* @__PURE__ */ l(
    Ks,
    {
      data: t.data,
      options: t.options,
      config: {},
      registry: n
    }
  ) }) }) });
});
class Eb extends w.Component {
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
function Lb(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Vb(e, t, n, r, o, i) {
  var q, K, ee, Re, be;
  const { chart: a, query: s } = e, c = a.family, u = n.kinds.length === 1 ? n.kinds[0] : zb(o), m = a.familyOptions ?? {}, f = Array.isArray(m.columns) ? m.columns : [], p = El(a), d = p[r], g = c === "table" && n.id === "columns", h = c === "bar" || c === "line" || c === "area", v = ((K = (q = a.mapping) == null ? void 0 : q.series) == null ? void 0 : K.mode) === "measures", b = h && n.id === "y", S = b && v, x = g ? (ee = f.find((Y) => Y.member === r)) == null ? void 0 : ee.label : S ? d == null ? void 0 : d.label : void 0, k = S ? d == null ? void 0 : d.colorToken : void 0, R = In(s), N = n.kinds.includes("time") && (R == null ? void 0 : R.dimension) === r, F = N ? R == null ? void 0 : R.granularity : void 0, E = N ? R == null ? void 0 : R.dateRange : void 0, V = (c === "line" || c === "area") && n.id === "y" && v, O = V ? d == null ? void 0 : d.dots : void 0, $ = (Y) => {
    var Qe, Ne;
    if ((Qe = a.mapping) != null && Qe.series && a.mapping.series.mode !== "measures") return;
    const ce = ((Ne = a.mapping) != null && Ne.series && a.mapping.series.mode === "measures" ? a.mapping.series.members : s.measures) ?? [], de = { ...p };
    Y && Object.keys(Y).length > 0 ? de[r] = Y : delete de[r];
    const me = On(a);
    me && t({
      ...e,
      chart: {
        ...a,
        mapping: { category: { member: me }, series: Ll(ce, de) }
      }
    });
  }, T = (Y) => {
    const ce = f.map((de) => de.member === r ? { ...de, ...Y } : de);
    t({ ...e, chart: { ...a, familyOptions: { ...m, columns: ce } } });
  }, D = (Y) => {
    g ? T({ label: Y }) : S && $({ ...d, label: Y });
  }, z = (Y) => {
    S && $({ ...d, colorToken: Y ?? void 0 });
  }, H = (Y) => {
    if (!R) return;
    const ce = { ...R };
    for (const de of Object.keys(Y)) {
      const me = Y[de];
      me === void 0 ? delete ce[de] : ce[de] = me;
    }
    t({ ...e, query: { ...s, timeDimensions: [ce] } });
  }, L = (Y) => H({ granularity: Y }), J = (Y) => H({ dateRange: Y }), Z = (Y) => {
    S && $({ ...d, dots: Y });
  }, ne = () => t(Hl(e, c, n.id, r, i)), le = (n.id === "x" || n.id === "slices" || n.id === "hx") && (u === "category" || u === "time"), fe = (Re = a.mapping) == null ? void 0 : Re.series, Q = (fe && fe.mode === "pivot" ? fe.value : Fo(a)[0]) ?? ((be = s.measures) == null ? void 0 : be[0]), pe = le ? u === "time" ? [
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
  ] : [], ye = (() => {
    const Y = Lb(s.order)[0];
    if (!Y) return "none";
    const [ce, de] = Y;
    return Q && ce === Q ? de === "desc" ? "value-desc" : "value-asc" : ce === r ? u === "time" ? de === "desc" ? "time-desc" : "time-asc" : de === "asc" ? "label-asc" : "label-desc" : "none";
  })(), G = (Y) => {
    let ce;
    switch (Y) {
      case "none":
        ce = void 0;
        break;
      case "value-desc":
        ce = Q ? [[Q, "desc"]] : void 0;
        break;
      case "value-asc":
        ce = Q ? [[Q, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        ce = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ce = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: ce } });
  }, oe = typeof s.limit == "number" ? s.limit : void 0, ue = (Y) => t({ ...e, query: { ...s, limit: Y && Y > 0 ? Y : void 0 } }), M = (c === "bar" || c === "line" || c === "area") && N, _ = M && m.comparePrevious === !0;
  return {
    kind: u,
    label: x,
    colorToken: k,
    granularity: F,
    dateRange: E,
    dots: O,
    canPoints: V,
    canRename: g || S,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure. (Pivot Y, pie size, scatter, heatmap,
    // etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: b && v,
    isTimeField: N,
    isCategoryField: le,
    sortValue: ye,
    sortOptions: pe,
    onSort: G,
    limit: oe,
    onLimit: ue,
    canComparePrevious: M,
    comparePrevious: _,
    comparePreviousReady: M && E !== void 0,
    onComparePrevious: (Y) => t({ ...e, chart: { ...a, familyOptions: { ...m, comparePrevious: Y || void 0 } } }),
    onRename: D,
    onRecolor: z,
    onGranularity: L,
    onDateRange: J,
    onDots: Z,
    onRemove: ne
  };
}
function zb(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Do(e, t, n, r) {
  var f;
  const { chart: o, query: i } = e, a = o.family, s = (p) => {
    if (r < 0 || r >= p.length || n === r) return p;
    const d = p.slice(), [g] = d.splice(n, 1);
    return d.splice(r, 0, g), d;
  };
  if (a === "table" && t.id === "columns") {
    const p = o.familyOptions ?? {}, d = s(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...o, familyOptions: { ...p, columns: d } } };
  }
  const c = s(i.measures ?? []), u = (f = o.mapping) == null ? void 0 : f.series;
  let m = o.mapping;
  if (u && u.mode === "measures")
    m = { ...o.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const p = s(u.values);
    m = { ...o.mapping, series: { ...u, value: p[0], values: p } };
  }
  return { ...e, query: { ...i, measures: c }, chart: { ...o, mapping: m } };
}
function Hb(e, t) {
  return e.allowedCubes.includes(t);
}
function Gb(e, t) {
  const n = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const o = e.get(r.shift());
    for (const i of (o == null ? void 0 : o.joinTargets) ?? [])
      !e.has(i) || n.has(i) || (n.add(i), r.push(i));
  }
  return n;
}
function ac(e) {
  return new Map(e.filter((t) => t.type === "cube").map((t) => [t.name, t]));
}
function Eo(e, t) {
  if (t.size === 0) return !0;
  for (const n of t) if (!e.has(n)) return !1;
  if (t.size === 1) return !0;
  for (const n of e.keys()) {
    const r = Gb(e, n);
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
function jb(e, t) {
  const n = [];
  for (const r of e.keys()) {
    if (t.has(r)) {
      n.push(r);
      continue;
    }
    Eo(e, /* @__PURE__ */ new Set([...t, r])) && n.push(r);
  }
  return n;
}
function Ta(e, t, n, r) {
  var k;
  const o = $r(e), i = o.filter((R) => R.type === "view"), a = Sn(t, r), s = Object.values(a).flat();
  let c;
  for (const R of s) {
    const N = Te(e, R);
    if (N) {
      c = N;
      break;
    }
  }
  const u = !c && n ? pt(e, n) : void 0, m = c ? pt(e, c.cube) : u, f = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, p = t.query.measures ?? [], d = p.length ? Bt(p[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: i, measureSource: d, allowedCubes: [f] };
  const g = d ?? (c == null ? void 0 : c.cube) ?? (u == null ? void 0 : u.name), h = g ? pt(e, g) : void 0, v = ac(o), b = /* @__PURE__ */ new Set();
  for (const R of s) {
    const N = (k = Te(e, R)) == null ? void 0 : k.cube;
    N && v.has(N) && b.add(N);
  }
  d && v.has(d) && b.add(d), !b.size && g && v.has(g) && b.add(g);
  const S = jb(v, b), x = S.filter((R) => R !== g).map((R) => v.get(R)).sort((R, N) => R.title.localeCompare(N.title));
  return {
    sourceCube: (h == null ? void 0 : h.type) === "cube" ? h : void 0,
    relatedCubes: x,
    views: i,
    measureSource: d,
    allowedCubes: S
  };
}
function Bb(e, t, n) {
  if (!t) return e;
  const r = ac($r(t)), o = e.query ?? {}, i = new Set(Object.values(Sn(e, n)).flat()), a = (h) => {
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
  if (Eo(r, s)) return e;
  const u = (o.measures ?? []).map(a).find((h) => h !== void 0) ?? [...i].map((h) => {
    var v;
    return (v = Te(t, h)) == null ? void 0 : v.cube;
  }).find((h) => h !== void 0 && r.has(h));
  if (!u) return e;
  const m = /* @__PURE__ */ new Set([u]), f = (h) => Eo(r, /* @__PURE__ */ new Set([...m, h])) && (m.add(h), !0), p = [];
  for (const h of c) {
    const v = a(h.dimension);
    if (v && f(v)) {
      p.push(h);
      continue;
    }
    if (i.has(h.dimension))
      p.push(h);
    else {
      const b = Ml(t, u);
      b && !p.some((S) => S.dimension === b.name) && p.push({ ...h, dimension: b.name });
    }
  }
  const d = (h) => {
    if (i.has(h)) return !0;
    const v = a(h);
    return v !== void 0 && f(v);
  }, g = {
    ...o,
    measures: (o.measures ?? []).filter(d),
    dimensions: (o.dimensions ?? []).filter(d),
    timeDimensions: p
  };
  return { ...e, query: g };
}
class Ar extends w.Component {
  constructor() {
    super(...arguments);
    Or(this, "state", { error: null, resetKey: this.props.resetKey });
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
      /* @__PURE__ */ l(Xc, { className: "cv-ed-broken-icon", "aria-hidden": !0 }),
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
const qb = vt.options;
function Wb({
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
        qb.map((i) => {
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
function Ub({
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
  const u = Rt(), m = xr(), f = Vb(e, t, n, r, o, u), p = w.useId(), d = w.useId(), g = w.useId(), h = w.useId(), v = w.useId(), b = w.useId(), S = (o == null ? void 0 : o.label) ?? r, x = f.label || S, k = f.canColor && i !== void 0, R = f.canRename || k || f.isTimeField || f.isCategoryField || f.canPoints || s !== void 0, N = (O) => {
    const $ = O.trim();
    f.onRename($.length > 0 ? $ : void 0);
  }, F = (O) => {
    !a || !O.altKey || (O.key === "ArrowUp" && a.index > 0 ? (O.preventDefault(), a.onMove(-1)) : O.key === "ArrowDown" && a.index < a.total - 1 && (O.preventDefault(), a.onMove(1)));
  }, E = /* @__PURE__ */ C(we, { children: [
    a ? /* @__PURE__ */ l(Jc, { className: "cv-field-pill-grip", "aria-hidden": !0 }) : null,
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
      /* @__PURE__ */ l("span", { className: "cv-field-unit", children: Ri(o, m) })
    ) : null,
    /* @__PURE__ */ l("span", { className: "cv-field-pill-name", children: x })
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
        R ? /* @__PURE__ */ C(je, { children: [
          /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ l(
            "button",
            {
              type: "button",
              className: "cv-field-pill-body cv-field-pill-trigger",
              title: `Edit ${x}${V}`,
              ...a ? { "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown" } : {},
              children: E
            }
          ) }),
          /* @__PURE__ */ l(qe, { align: "start", className: "cv-field-pill-popover", children: /* @__PURE__ */ C("div", { className: "cv-field-pill-config", children: [
            s ? /* @__PURE__ */ l(Kb, { getSwap: s, display: x }) : null,
            f.canRename ? /* @__PURE__ */ C("label", { className: "cv-ec-field", htmlFor: p, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Label" }),
              /* @__PURE__ */ l(
                Ce,
                {
                  id: p,
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
              /* @__PURE__ */ l(Wb, { value: f.colorToken, onChange: f.onRecolor })
            ] }) : null,
            f.isTimeField ? /* @__PURE__ */ C(we, { children: [
              /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
                /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Date range" }),
                /* @__PURE__ */ l(
                  tn,
                  {
                    kind: "dateRange",
                    value: f.dateRange,
                    onChange: f.onDateRange,
                    renderFixed: (O, $) => /* @__PURE__ */ l(Pi, { value: O, onChange: $ })
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
                      _l,
                      {
                        value: O,
                        onChange: $,
                        allowAuto: !0,
                        autoHint: pi(f.dateRange),
                        options: Js(f.dateRange),
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
                    Io,
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
            f.isCategoryField ? /* @__PURE__ */ C(we, { children: [
              /* @__PURE__ */ C("label", { className: "cv-ec-field cv-ec-field--loose", htmlFor: d, children: [
                /* @__PURE__ */ l("span", { id: g, className: "cv-ec-label", children: "Sort" }),
                /* @__PURE__ */ l(
                  "select",
                  {
                    id: d,
                    "aria-labelledby": g,
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
                  Ce,
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
            f.canPoints ? /* @__PURE__ */ C("label", { className: "cv-ec-row", htmlFor: b, children: [
              /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Show points" }),
              /* @__PURE__ */ l(Io, { id: b, checked: f.dots === !0, onChange: f.onDots, "aria-label": "Show points" })
            ] }) : null,
            /* @__PURE__ */ C(
              re,
              {
                variant: "ghost",
                size: "sm",
                className: "cv-field-pill-remove",
                onClick: f.onRemove,
                children: [
                  /* @__PURE__ */ l(ro, { className: "cv-ec-icon" }),
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
              title: `${x}${V}`,
              ...a ? {
                tabIndex: 0,
                "aria-label": `${x}, position ${a.index + 1} of ${a.total}. Alt with arrow up or down to move.`,
                "aria-keyshortcuts": "Alt+ArrowUp Alt+ArrowDown"
              } : {},
              children: E
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
            "aria-label": `Remove ${x}`,
            children: /* @__PURE__ */ l(ro, { className: "cv-ec-icon" })
          }
        )
      ]
    }
  );
}
function Kb({
  getSwap: e,
  display: t
}) {
  const n = e();
  return n ? /* @__PURE__ */ C(we, { children: [
    n.notice ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-field-pill-notice", children: n.notice }) : null,
    n.agg ? /* @__PURE__ */ C("div", { className: "cv-ec-field cv-ec-field--loose", children: [
      /* @__PURE__ */ l("span", { className: "cv-ec-label", children: "Aggregation" }),
      /* @__PURE__ */ l(jl, { options: n.agg.options, className: "cv-field-pill-aggseg" }),
      n.hint ? /* @__PURE__ */ l("p", { className: "cv-ec-hint", children: n.hint }) : null
    ] }) : null,
    /* @__PURE__ */ l(
      Ii,
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
          /* @__PURE__ */ l(Zc, { className: "cv-ec-icon" }),
          "Swap field…"
        ] })
      }
    )
  ] }) : null;
}
function Yb({
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
  orientation: p,
  lockedSingle: d,
  disableReorder: g,
  label: h,
  note: v,
  pickerSide: b,
  pickerAlign: S,
  control: x
}) {
  const k = n.cardinality === "many" && !d, R = k || r.length === 0, N = r.length, F = p === "vertical", E = h ?? n.label, V = k && N > 1 && !g, [O, $] = w.useState(null), T = ["number", "category", "time"].filter((H) => !Fe(n, H)).map((H) => Ni(n, H, r)).find((H) => H !== void 0) ?? n.hint, D = o.length === 0 && !n.optional && Fe(n, "number") ? "Pick a number to get started" : void 0, z = /* @__PURE__ */ l(
    Ii,
    {
      well: n,
      placed: o,
      inWell: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: b ?? (F ? "right" : "top"),
      align: S ?? "start",
      children: /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          title: T,
          className: I(
            "cv-well-add",
            F && "cv-well-add--full"
          ),
          children: [
            /* @__PURE__ */ l(Tt, { className: "cv-ec-icon" }),
            r.length === 0 ? E : "Add"
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
          /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: E }),
          f ? /* @__PURE__ */ l("span", { className: "cv-well-badge", children: f }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ l("span", { className: "cv-well-optional", children: "(optional)" }) : null
        ] }),
        x ? /* @__PURE__ */ l("div", { className: "cv-well-control", children: x }) : null,
        /* @__PURE__ */ l(Ar, { label: E, resetKey: e, children: /* @__PURE__ */ C("div", { className: I("cv-well-fields", F ? "cv-well-fields--v" : "cv-well-fields--h"), children: [
          r.map((H, L) => /* @__PURE__ */ l(
            Ub,
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
                index: L,
                total: N,
                dragging: O === L,
                onDragStart: () => $(L),
                // Live reorder: the list rearranges UNDER the pointer as it
                // passes each neighbour, so the drop is just letting go of
                // what you already see. `dragIndex` follows the carried pill
                // to its new slot, which is what makes the next crossing
                // compare against the right position.
                onDragOver: () => {
                  O === null || O === L || (t(Do(e, n, O, L)), $(L));
                },
                onDragEnd: () => $(null),
                onMove: (J) => t(Do(e, n, L, L + J))
              } : void 0
            },
            H
          )),
          R ? z : null
        ] }) }),
        D ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-start-hint", children: D }) : null,
        v ? /* @__PURE__ */ l("p", { className: "cv-ec-hint cv-well-note", children: v }) : null
      ]
    }
  );
}
function Jr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ C(je, { children: [
    /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ C(
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
    /* @__PURE__ */ l(qe, { align: "start", className: "cv-kpi-section-popover", children: /* @__PURE__ */ l(Ar, { label: e, children: n }) })
  ] });
}
function Ti(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (i) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...i } } }) };
}
function Qb({ spec: e, update: t }) {
  var m;
  const { fo: n, setFO: r } = Ti(e, t), o = Dl(e), i = (m = e.query.timeDimensions) == null ? void 0 : m[0], a = n.display ?? "number", s = n.gauge, c = n.goodDirection ?? "up", u = (f) => {
    const p = i ?? (f.dimension ? { dimension: f.dimension } : void 0);
    if (!p) return;
    const d = { ...p };
    for (const g of Object.keys(f)) {
      const h = f[g];
      h === void 0 ? delete d[g] : d[g] = h;
    }
    delete d.granularity, t({ ...e, query: { ...e.query, timeDimensions: [d] } });
  };
  return /* @__PURE__ */ C("div", { className: "cv-kpi-fields", children: [
    /* @__PURE__ */ l(kn, { label: "Time field", children: ({ id: f }) => /* @__PURE__ */ l(
      ql,
      {
        id: f,
        cube: o,
        kind: "time",
        value: i == null ? void 0 : i.dimension,
        onChange: (p) => u({ dimension: p }),
        placeholder: "All time",
        className: "cv-ec-h8"
      }
    ) }),
    i != null && i.dimension ? /* @__PURE__ */ l(kn, { label: "Date range", children: ({ labelId: f }) => /* @__PURE__ */ l(
      tn,
      {
        labelId: f,
        kind: "dateRange",
        value: i.dateRange,
        onChange: (p) => u({ dateRange: p }),
        renderFixed: (p, d) => /* @__PURE__ */ l(Pi, { value: p, onChange: d })
      }
    ) }) : null,
    /* @__PURE__ */ l(ve, { label: "Display", children: /* @__PURE__ */ l(
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
    a === "gauge" ? /* @__PURE__ */ l(kn, { label: "Gauge max", children: ({ id: f }) => /* @__PURE__ */ l(
      Ce,
      {
        id: f,
        type: "number",
        className: "cv-ec-h8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (p) => {
          const d = parseFloat(p.target.value);
          r({ gauge: Number.isFinite(d) ? { ...s ?? {}, max: d } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Xb({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ti(e, t), o = n.comparison, i = o !== void 0, a = w.useRef(void 0);
  o && (a.current = o);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = i ? (o == null ? void 0 : o.mode) ?? "previousPeriod" : "none";
  return /* @__PURE__ */ C("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(ve, { label: "Compare to", children: /* @__PURE__ */ l(
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
    i ? /* @__PURE__ */ C(we, { children: [
      (o == null ? void 0 : o.mode) === "value" ? /* @__PURE__ */ l(kn, { label: "Baseline value", children: ({ id: m }) => /* @__PURE__ */ l(
        Ce,
        {
          id: m,
          type: "number",
          className: "cv-ec-h8",
          value: (o == null ? void 0 : o.value) ?? "",
          onChange: (f) => {
            const p = parseFloat(f.target.value);
            r({ comparison: { ...o, value: Number.isFinite(p) ? p : void 0 } });
          }
        }
      ) }) : null,
      (o == null ? void 0 : o.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ C("div", { className: "cv-kpi-warn", children: [
        /* @__PURE__ */ l(Ya, { className: "cv-kpi-warn-icon" }),
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
function Jb({ spec: e, update: t }) {
  var c, u;
  const { fo: n, setFO: r } = Ti(e, t), o = n.sparkline, i = o !== void 0, a = o == null ? void 0 : o.granularity, s = Js((u = (c = e.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dateRange);
  return /* @__PURE__ */ C("div", { className: "cv-kpi-options", children: [
    /* @__PURE__ */ l(kn, { label: "Trend", children: ({ id: m, labelId: f }) => /* @__PURE__ */ l(
      tn,
      {
        labelId: f,
        kind: "granularity",
        value: a,
        onChange: (p) => r({
          sparkline: p === void 0 ? void 0 : { ...o, granularity: p }
        }),
        renderFixed: (p, d) => /* @__PURE__ */ l(
          _l,
          {
            id: m,
            value: p,
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
function kn({
  label: e,
  children: t
}) {
  const n = w.useId(), r = w.useId();
  return /* @__PURE__ */ C("div", { className: "cv-ec-field", children: [
    /* @__PURE__ */ l("label", { id: r, htmlFor: n, className: "cv-ec-label", children: e }),
    t({ id: n, labelId: r })
  ] });
}
function Zb({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var G, oe, ue;
  const { meta: o } = Nt(), i = Rt(), a = w.useCallback(
    (P) => t(Bb(P, o, i)),
    [t, o, i]
  ), { chart: s } = e, c = s.family, u = i.require(c), m = u.queryless ?? !1, f = u.enforcesAxisUnit, p = Dl(e), d = xr(), g = w.useMemo(() => xy(c, i), [c, i]), h = w.useMemo(() => Sn(e, i), [e, i]), v = w.useMemo(() => new Map(g.map((P) => [P.id, P])), [g]), b = w.useMemo(
    () => Ta(o, e, void 0, i),
    [o, e, i]
  ), S = w.useMemo(() => Object.values(h).flat(), [h]), x = w.useMemo(
    () => {
      var P;
      return b.viewLocked ? [b.viewLocked] : [(P = b.sourceCube) == null ? void 0 : P.name, ...b.relatedCubes.map((M) => M.name)].filter(
        Boolean
      );
    },
    [b]
  ), k = w.useMemo(
    () => Object.values(h).every((P) => P.length === 0),
    [h]
  ), R = w.useCallback(
    (P) => {
      const M = (P.y ?? [])[0], _ = M ? Te(o, M) : void 0;
      return {
        leftKey: M ? Vl(_) : void 0,
        leftLabel: M ? e0(_, d(_ == null ? void 0 : _.unit)) : void 0
      };
    },
    [o, d]
  ), N = w.useMemo(() => R(h), [R, h]), F = w.useCallback(
    (P, M) => (_, A) => {
      var j;
      if (A) {
        if (!Hb(P, A.cube))
          return "Clear the current fields to use a different dataset.";
        if (A.memberType === "measure" && P.measureSource && A.cube !== P.measureSource)
          return `This chart's numbers come from ${((j = P.sourceCube) == null ? void 0 : j.title) ?? P.measureSource}. Remove them to use another table.`;
        if (f && _ === "y" && A.memberType === "measure")
          return Iy(A, M.leftKey, M.leftLabel);
      }
    },
    [f]
  ), E = w.useMemo(
    () => F(b, N),
    [F, b, N]
  ), V = N.leftLabel, O = w.useMemo(() => {
    var M;
    const P = {};
    if (c === "bar" || c === "line" || c === "area") {
      const _ = (M = s.mapping) == null ? void 0 : M.series;
      if (_ && _.mode === "measures") {
        const A = _.members.map((q) => {
          var K, ee;
          return { key: q, colorToken: (ee = (K = _.meta) == null ? void 0 : K[q]) == null ? void 0 : ee.colorToken };
        }), j = Ys(A, s.colors);
        _.members.forEach((q, K) => {
          P[q] = j[K];
        });
      }
    }
    return P;
  }, [c, s.mapping, s.colors]), $ = w.useCallback(
    (P, M, _) => {
      const A = Te(o, M);
      if (E(P, A)) return;
      let j = _ === "geoPoint" && (A != null && A.latMember) && A.lngMember ? jt(
        jt(e, c, "lat", A.latMember, "numberDimension", i),
        c,
        "lng",
        A.lngMember,
        "numberDimension",
        i
      ) : jt(e, c, P, M, _, i);
      const q = u.canonicalTimeWell;
      if (q && P !== q && (h[q] ?? []).length === 0) {
        const K = Ml(o, A == null ? void 0 : A.cube);
        K && K.name !== M && !E(q, K) && (j = jt(j, c, q, K.name, "time", i));
      }
      a(j);
    },
    [E, o, a, e, c, i, u, h]
  ), T = w.useCallback(
    (P, M) => {
      if (m) return;
      const _ = v.get(P), A = Te(o, M);
      if (!_ || !A) return;
      const j = (h[P] ?? []).indexOf(M), q = Hl(e, c, P, M, i), K = Sn(q, i), ee = Ta(o, q, void 0, i), Re = F(ee, R(K)), be = K[P] ?? [], Y = Object.values(K).flat(), ce = (he, We) => {
        if (he === M) return;
        let Le = jt(q, c, P, he, We, i);
        const it = (Sn(Le, i)[P] ?? []).indexOf(he);
        j >= 0 && it > j && (Le = Do(Le, _, it, j)), a(Le);
      }, de = Fl(o, A), me = pt(o, A.cube), Qe = de.length > 1 ? {
        options: de.map((he, We) => {
          const Le = he.memberType === "measure" ? "number" : "numberDimension", Vt = he.name === M ? void 0 : Wl(_, Le, be, he, (B) => Re(P, B)), it = $i(he);
          return {
            label: Bl(he, pt(o, he.cube)),
            selected: he.name === M,
            disabled: Vt !== void 0,
            title: Vt ?? (it ? Ai(me) : void 0),
            // The row-level variant is a grain switch, not another summary —
            // the divider keeps it from reading as a sibling of total/avg.
            divider: it && We > 0,
            onSelect: () => ce(he.name, Le)
          };
        })
      } : void 0, et = S.filter((he) => {
        var We;
        return ((We = Te(o, he)) == null ? void 0 : We.cube) === A.cube;
      }).length === 1 ? sy(A) : void 0;
      return {
        picker: {
          well: _,
          placed: Y,
          inWell: be,
          scope: ee,
          blockReason: (he) => Re(P, he),
          onSelect: ce
        },
        agg: Qe,
        hint: Qe ? $y(de, me, A) : void 0,
        notice: et
      };
    },
    [m, v, o, h, S, e, c, i, F, R, a]
  ), D = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, z = D.left.map((P) => v.get(P)).filter(Boolean), H = D.bottom.map((P) => v.get(P)).filter(Boolean), L = (G = h.color) == null ? void 0 : G[0], J = ((oe = h.y) == null ? void 0 : oe.length) ?? 0, Z = L && J > 1 ? `${J} values × ${((ue = Te(o, L)) == null ? void 0 : ue.label) ?? "this split"} — one series per value per group.` : void 0, ne = u.hasLegend, le = (h.y ?? [])[0], fe = (P) => {
    var A, j, q, K;
    if (!P) return;
    const M = (A = s.mapping) == null ? void 0 : A.series;
    return (M && M.mode === "measures" ? (q = (j = M.meta) == null ? void 0 : j[P]) == null ? void 0 : q.label : void 0) ?? ((K = Te(o, P)) == null ? void 0 : K.label);
  }, Q = (P) => {
    var _, A, j, q;
    const M = (K, ee) => ee ? /* @__PURE__ */ l(nb, { spec: e, update: a, axis: K, title: "Title", auto: fe(ee) }) : null;
    switch (P) {
      case "y":
        return M("y", le);
      // the single value axis
      case "x":
        return M("x", (A = (_ = s.mapping) == null ? void 0 : _.category) == null ? void 0 : A.member);
      case "sy":
        return M("y", (j = h.sy) == null ? void 0 : j[0]);
      // scatter Y axis
      case "sx":
        return M("x", (q = h.sx) == null ? void 0 : q[0]);
      // scatter X axis
      default:
        return null;
    }
  }, pe = (P, M) => /* @__PURE__ */ l(
    Yb,
    {
      spec: e,
      update: a,
      well: P,
      placed: h[P.id] ?? [],
      allPlaced: S,
      optionFor: (_) => Te(o, _),
      colorFor: (_) => O[_],
      scope: b,
      blockReason: (_) => E(P.id, _),
      onAdd: (_, A) => $(P.id, _, A),
      swapFor: (_) => T(P.id, _),
      badge: P.id === "y" ? V : void 0,
      orientation: M,
      note: P.id === "color" ? Z : void 0,
      control: Q(P.id)
    },
    P.id
  ), ye = () => {
    var A;
    const P = v.get("value"), M = (h.value ?? []).length > 0, _ = s.familyOptions ?? {};
    return /* @__PURE__ */ C(we, { children: [
      /* @__PURE__ */ C("div", { className: "cv-edit-kpi-value", children: [
        P ? pe(P, "vertical") : null,
        M ? /* @__PURE__ */ l(
          Jr,
          {
            label: "Time, range & display",
            summary: _.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ l(Qb, { spec: e, update: a })
          }
        ) : null
      ] }),
      M ? /* @__PURE__ */ C(we, { children: [
        /* @__PURE__ */ l(
          Jr,
          {
            label: "Comparison",
            summary: _.comparison === void 0 ? "None" : _.comparison.mode === "value" ? "Fixed value" : "Prev period",
            children: /* @__PURE__ */ l(Xb, { spec: e, update: a })
          }
        ),
        /* @__PURE__ */ l(
          Jr,
          {
            label: "Trend",
            summary: Xv(
              (A = _.sparkline) == null ? void 0 : A.granularity
            ),
            children: /* @__PURE__ */ l(Jb, { spec: e, update: a })
          }
        )
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ C("div", { "data-slot": "chart-edit-overlay", className: "cv-edit-overlay", children: [
    /* @__PURE__ */ C("div", { className: "cv-edit-overlay-topbar", children: [
      /* @__PURE__ */ l("div", { className: "cv-edit-overlay-toolbar", children: n }),
      !k || m ? /* @__PURE__ */ l(kb, { spec: e, update: a }) : null,
      /* @__PURE__ */ C("div", { className: "cv-edit-overlay-actions", children: [
        S.length > 0 && b.sourceCube ? /* @__PURE__ */ C(
          "span",
          {
            className: "cv-edit-anchor",
            title: b.sourceCube.grain ?? b.sourceCube.title,
            children: [
              /* @__PURE__ */ l(es, { className: "cv-ec-icon--sm cv-ec-icon--muted" }),
              /* @__PURE__ */ l("span", { className: "cv-ec-truncate", children: b.sourceCube.title }),
              b.sourceCube.grain ? /* @__PURE__ */ l("span", { className: "cv-edit-anchor-grain", children: b.sourceCube.grain }) : null
            ]
          }
        ) : null,
        /* @__PURE__ */ l(Zy, { spec: e, update: a, cube: p, scopeCubes: x, scope: b })
      ] })
    ] }),
    /* @__PURE__ */ C("div", { className: "cv-edit-overlay-body", children: [
      z.length > 0 ? /* @__PURE__ */ l("div", { className: I("cv-edit-sidebar", u.sidebarWidthClass), children: c === "kpi" ? ye() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl), so the title sits with the measures it names. */
        z.map((P) => pe(P, "vertical"))
      ) }) : null,
      /* @__PURE__ */ C("div", { className: "cv-edit-overlay-main", children: [
        /* @__PURE__ */ C("div", { className: "cv-edit-overlay-canvas", children: [
          r,
          /* @__PURE__ */ l(Sb, { spec: e, update: a, empty: k && !m })
        ] }),
        H.length > 0 ? /* @__PURE__ */ C("div", { className: "cv-edit-overlay-bottom", children: [
          H.map((P) => pe(P, "horizontal")),
          ne && !k ? /* @__PURE__ */ l(rb, { spec: e, update: a }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function e0(e, t) {
  const n = zl(e);
  if ((e == null ? void 0 : e.quantity) === "time") return n;
  const r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function sc(e, t) {
  const n = w.useRef(e);
  w.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = w.useRef(null), o = w.useRef(null);
  return w.useEffect(
    () => () => {
      r.current !== null && (clearTimeout(r.current), r.current = null, o.current !== null && (n.current(...o.current), o.current = null));
    },
    []
  ), w.useCallback(
    (...i) => {
      r.current !== null && clearTimeout(r.current), o.current = i, r.current = setTimeout(() => {
        r.current = null, o.current = null, n.current(...i);
      }, t);
    },
    [t]
  );
}
function Zr(e) {
  const t = gs.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function t0({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, o] = w.useState(() => ({
    spec: e,
    issues: Zr(e)
  })), [i, a] = w.useState(e);
  w.useEffect(() => {
    o({ spec: e, issues: Zr(e) }), a(e);
  }, [e]);
  const s = sc((p) => t(p), n), c = r.spec, u = r.issues, m = u.length === 0, f = w.useCallback(
    (p) => {
      const d = Zr(p);
      o({ spec: p, issues: d }), d.length === 0 && (a(p), s(p));
    },
    [s]
  );
  return { draft: c, issues: u, valid: m, committed: i, update: f };
}
const n0 = () => {
};
function r0({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: o = !1,
  className: i
}) {
  const a = Rt(), { draft: s, issues: c, valid: u, committed: m, update: f } = t0({
    spec: e,
    onChange: t ?? n0,
    debounceMs: r
  }), p = a.get(s.chart.family), d = (p == null ? void 0 : p.queryless) ?? !1, g = m, h = (F) => {
    var E, V, O;
    return (((E = F == null ? void 0 : F.measures) == null ? void 0 : E.length) ?? 0) > 0 || (((V = F == null ? void 0 : F.dimensions) == null ? void 0 : V.length) ?? 0) > 0 || (((O = F == null ? void 0 : F.timeDimensions) == null ? void 0 : O.some(($) => typeof $.granularity == "string")) ?? !1);
  }, v = (F) => {
    var E;
    return (((E = F == null ? void 0 : F.measures) == null ? void 0 : E.length) ?? 0) > 0;
  }, b = (p == null ? void 0 : p.requiresMeasure) ?? s.chart.family !== "table", S = d || h(s.query) && h(g.query) && (!b || v(s.query) && v(g.query)), x = b && !v(s.query) ? `Pick a number to show — a total, average or count — to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", k = w.useCallback(
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
    yi,
    {
      query: g.query ?? {},
      chart: g.chart,
      editing: !0,
      updateFamilyOptions: k
    }
  ) : /* @__PURE__ */ l("div", { className: "cv-chart-editor-empty", children: /* @__PURE__ */ l("span", { className: "cv-chart-editor-empty-hint", children: x }) }), N = n ? /* @__PURE__ */ C(re, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ l(rs, { className: "cv-ed-icon" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "chart-editor",
      className: I("cv-chart-editor", o ? "cv-chart-editor--fill" : "cv-chart-editor--bounded", i),
      children: [
        u ? null : /* @__PURE__ */ C(fr, { variant: "destructive", children: [
          /* @__PURE__ */ l(Bo, { className: "cv-ed-icon" }),
          /* @__PURE__ */ l(gr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ l(pr, { children: /* @__PURE__ */ C("ul", { className: "cv-chart-editor-issues", children: [
            c.slice(0, 3).map((F, E) => /* @__PURE__ */ C("li", { children: [
              F.path ? /* @__PURE__ */ l("span", { className: "cv-chart-editor-issue-path", children: F.path }) : null,
              " ",
              F.message
            ] }, E)),
            c.length > 3 ? /* @__PURE__ */ C("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ l("div", { className: "cv-chart-editor-preview", children: /* @__PURE__ */ l(Ar, { label: "The chart editor", resetKey: s, children: /* @__PURE__ */ l(Zb, { spec: s, update: f, toolbar: N, children: R }) }) })
      ]
    }
  );
}
function o0({
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
  discardDisabled: p,
  onSave: d,
  saveDisabled: g,
  className: h
}) {
  const v = i || a, [b, S] = w.useState(!1);
  w.useEffect(() => {
    if (!b) return;
    const N = setTimeout(() => S(!1), 1600);
    return () => clearTimeout(N);
  }, [b]), w.useEffect(() => {
    g || S(!1);
  }, [g]);
  const x = () => {
    d == null || d(), S(!0);
  }, k = u ? `Undo ${u}` : "Undo", R = m ? `Redo ${m}` : "Redo";
  return /* @__PURE__ */ C("div", { "data-slot": "editor-toolbar", className: I("cv-editor-toolbar", h), children: [
    /* @__PURE__ */ l(
      Ce,
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
          /* @__PURE__ */ l(eu, {}),
          " Variables",
          o ? /* @__PURE__ */ l("span", { className: "cv-editor-toolbar-badge", children: o }) : null
        ]
      }
    ) }) : null,
    /* @__PURE__ */ C("div", { className: "cv-editor-toolbar-actions", children: [
      v ? /* @__PURE__ */ C(we, { children: [
        /* @__PURE__ */ l(
          re,
          {
            variant: "ghost",
            size: "icon",
            onClick: i,
            disabled: !s,
            "aria-label": k,
            title: k,
            children: /* @__PURE__ */ l(tu, {})
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
            children: /* @__PURE__ */ l(nu, {})
          }
        )
      ] }) : null,
      f ? /* @__PURE__ */ C(
        re,
        {
          variant: "ghost",
          size: "sm",
          onClick: f,
          disabled: p,
          className: "cv-editor-toolbar-discard",
          children: [
            /* @__PURE__ */ l(ru, {}),
            " Discard"
          ]
        }
      ) : null,
      d ? /* @__PURE__ */ C(
        re,
        {
          size: "sm",
          onClick: x,
          disabled: g,
          "aria-live": "polite",
          className: I(
            // Keep the confirmation vivid even though the button is (correctly) disabled
            // right after a save — there's nothing left to save.
            b && "cv-editor-toolbar-save--saved"
          ),
          children: [
            b ? /* @__PURE__ */ l(nn, {}) : /* @__PURE__ */ l(rs, {}),
            " ",
            b ? "Saved" : "Save"
          ]
        }
      ) : null
    ] })
  ] });
}
const lc = "lg", sn = 12;
function i0(e, t) {
  const n = t[lc];
  if (n && n.length > 0) return n;
  let r, o = -1;
  for (const i of Object.values(t)) {
    if (!i || i.length === 0) continue;
    const a = i.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    a > o && (r = i, o = a);
  }
  return r ?? e;
}
function a0(e, t) {
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
const Di = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function s0(e, t, n, r = sn) {
  const o = Di[n], i = Math.min(o.w, r), a = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
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
function l0(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? sn) {
  const o = s0(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, o]
  };
}
function c0(e, t, n, r = ((o) => (o = e.grid) == null ? void 0 : o.cols)() ?? sn) {
  const i = Di[t.type], a = Math.min(i.w, r), s = {
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
function Ei(e) {
  const t = /* @__PURE__ */ new Set([0]);
  for (const n of e) t.add(n.y + n.h);
  return [...t].filter((n) => !e.some((r) => r.y < n && r.y + r.h > n)).sort((n, r) => n - r);
}
function u0(e, t = sn) {
  const n = Ei(e), r = [];
  for (let o = 0; o < n.length - 1; o++) {
    const i = n[o], a = n[o + 1], s = e.filter((u) => u.y >= i && u.y + u.h <= a);
    if (s.length === 0) continue;
    const c = [...new Set(s.map((u) => u.x + u.w))].sort((u, m) => u - m);
    for (const u of c)
      u <= 0 || u >= t || s.some((m) => m.x < u && m.x + m.w > u) || r.push({ rowY: i, rowBottom: a, x: u, free: !s.some((m) => m.x >= u) });
  }
  return r;
}
const d0 = 2;
function m0(e, t, n, r, o = ((i) => (i = e.grid) == null ? void 0 : i.cols)() ?? sn) {
  const a = Di[t.type], c = Ei(e.layout).find((S) => S > n) ?? Number.POSITIVE_INFINITY, u = (S) => S.y >= n && S.y + S.h <= c, m = e.layout.filter((S) => u(S) && S.x >= r), f = (S, x) => {
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
      layout: [...e.layout.map((R) => x.get(R.i) ?? R), k]
    };
  };
  if (m.length === 0)
    return f(Math.max(1, Math.min(a.w, o - r)), /* @__PURE__ */ new Map());
  const p = Math.min(a.w, o), d = m.map((S) => ({ ...S, x: S.x + p }));
  if (d.every((S) => S.x + S.w <= o))
    return f(p, new Map(d.map((S) => [S.i, S])));
  const g = o - r - p, h = Math.min(...m.map((S) => S.x)), v = Math.max(...m.map((S) => S.x + S.w)) - h;
  if (g >= 1 && v > 0) {
    const S = g / v, x = m.map((k) => ({
      ...k,
      x: r + p + Math.round((k.x - h) * S),
      w: Math.max(k.minW ?? d0, Math.round(k.w * S))
    }));
    if (x.every((k) => k.x >= r + p && k.x + k.w <= o))
      return f(p, new Map(x.map((k) => [k.i, k])));
  }
  const b = m.map((S) => ({ ...S, y: S.y + a.h }));
  return f(p, new Map(b.map((S) => [S.i, S])));
}
const f0 = 900, g0 = 0.4;
function p0(e, t) {
  const n = (e == null ? void 0 : e.cols) ?? sn, r = (e == null ? void 0 : e.rowHeight) ?? 40, o = (e == null ? void 0 : e.margin) ?? [12, 12], i = (e == null ? void 0 : e.containerPadding) ?? [0, 0], a = Math.max(g0, Math.min(1, t / f0)), s = Math.round(a / 0.05) * 0.05;
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
function Da(e, t) {
  const n = t.containerPadding[1] + e * (t.rowHeight + t.margin[1]) - t.margin[1] / 2;
  return Math.max(0, n);
}
function h0(e, t) {
  return Math.max(0, e * (t.rowHeight + t.margin[1]) - t.margin[1]);
}
function v0(e, t) {
  const n = t - e.containerPadding[0] * 2 - e.margin[0] * Math.max(0, e.cols - 1);
  return Math.max(0, n / e.cols);
}
function y0(e, t, n) {
  const r = t.containerPadding[0] + e * (v0(t, n) + t.margin[0]) - t.margin[0] / 2;
  return Math.max(0, r);
}
function b0(e, t, n) {
  const r = e.widgets.find((i) => i.id === t);
  if (!r) return e;
  const o = JSON.parse(JSON.stringify(r));
  if (o.id = n, o.type === "chart") {
    const i = o.chart.familyOptions;
    i && typeof i.chartId == "string" && (o.chart = { ...o.chart, familyOptions: { ...i, chartId: `ai_${n}` } });
  }
  return l0(e, o);
}
function w0(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function C0(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const S0 = 10, cc = [
  { kind: "chart", label: "Chart", Icon: Xa },
  { kind: "text", label: "Text", Icon: ns },
  { kind: "input", label: "Input", Icon: ou }
];
function k0({
  rows: e,
  columns: t,
  metrics: n,
  width: r,
  containerRef: o,
  onInsert: i,
  disabled: a
}) {
  const [s, c] = w.useState(null), [u, m] = w.useState(null), f = w.useMemo(() => {
    const d = e.map((g) => ({
      key: `row:${g}`,
      axis: "row",
      rowY: g,
      top: Da(g, n)
    }));
    for (const g of t)
      d.push({
        key: `col:${g.rowY}:${g.x}`,
        axis: "col",
        rowY: g.rowY,
        colX: g.x,
        // The line spans its own row band only — a column gap means nothing outside it.
        top: Da(g.rowY, n) + n.margin[1] / 2,
        left: y0(g.x, n, r),
        height: h0(g.rowBottom - g.rowY, n)
      });
    return d;
  }, [e, t, n, r]), p = w.useRef(f);
  return p.current = f, w.useEffect(() => {
    const d = o.current;
    if (!d || a) return;
    const g = (v) => {
      const b = d.getBoundingClientRect(), S = v.clientX - b.left, x = v.clientY - b.top;
      let k = null, R = S0;
      for (const N of p.current) {
        let F;
        if (N.axis === "row")
          F = Math.abs(x - N.top);
        else {
          if (x < N.top || x > N.top + (N.height ?? 0)) continue;
          F = Math.abs(S - (N.left ?? 0));
        }
        F <= R && (k = N.key, R = F);
      }
      c(k);
    }, h = () => c(null);
    return d.addEventListener("pointermove", g), d.addEventListener("pointerleave", h), () => {
      d.removeEventListener("pointermove", g), d.removeEventListener("pointerleave", h);
    };
  }, [o, a]), w.useEffect(() => {
    a && (c(null), m(null));
  }, [a]), a ? null : /* @__PURE__ */ l("div", { "data-slot": "insert-lines", className: "cv-insert-lines", children: f.map((d) => {
    const g = u === d.key || s === d.key, h = d.axis === "col";
    return /* @__PURE__ */ C(
      "div",
      {
        style: h ? { top: d.top, left: d.left, height: d.height } : { top: d.top },
        className: I(
          "cv-insert-line",
          h && "cv-insert-line--col",
          g && "cv-insert-line--active"
        ),
        children: [
          /* @__PURE__ */ l("span", { className: "cv-insert-line-rule" }),
          /* @__PURE__ */ C(
            je,
            {
              open: u === d.key,
              onOpenChange: (v) => m(v ? d.key : null),
              children: [
                /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ l(
                  "button",
                  {
                    type: "button",
                    "aria-label": h ? `Insert a widget beside row ${d.rowY}, at column ${d.colX}` : `Insert a widget at row ${d.rowY}`,
                    tabIndex: g ? 0 : -1,
                    className: "cv-insert-line-button",
                    children: /* @__PURE__ */ l(Tt, {})
                  }
                ) }),
                /* @__PURE__ */ l(
                  qe,
                  {
                    align: "center",
                    side: h ? "right" : "bottom",
                    className: "cv-insert-menu",
                    children: cc.map(({ kind: v, label: b, Icon: S }) => /* @__PURE__ */ C(
                      "button",
                      {
                        type: "button",
                        className: "cv-insert-menu-item",
                        onClick: () => {
                          m(null), c(null), i(v, d.rowY, d.colX);
                        },
                        children: [
                          /* @__PURE__ */ l(S, {}),
                          b
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
function R0({
  onInsert: e
}) {
  return /* @__PURE__ */ C("div", { "data-slot": "editor-empty", className: "cv-editor-empty", children: [
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-title", children: "This dashboard is empty" }),
    /* @__PURE__ */ l("p", { className: "cv-editor-empty-hint", children: "Add a widget to start — later ones drop in wherever you point on the canvas." }),
    /* @__PURE__ */ l("div", { className: "cv-editor-empty-tiles", children: cc.map(({ kind: t, label: n, Icon: r }) => /* @__PURE__ */ C(
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
function N0(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function _0({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: o,
  onDelete: i,
  onLayoutChange: a,
  onInsert: s
}) {
  const [c, u] = sl(), m = w.useRef(null), f = w.useCallback(
    ($) => {
      m.current = $, c($);
    },
    [c]
  ), p = w.useMemo(() => p0(e.grid, u), [e.grid, u]), { cols: d, rowHeight: g } = p, h = p.margin, v = p.containerPadding, [b, S] = w.useState(!1), x = w.useMemo(() => Ei(e.layout), [e.layout]), k = w.useMemo(
    () => u0(e.layout, d),
    [e.layout, d]
  ), R = w.useMemo(
    () => ({ [lc]: N0(e.layout) }),
    [e.layout]
  ), N = w.useMemo(
    () => new Map(e.widgets.map(($) => [$.id, $])),
    [e.widgets]
  ), F = w.useRef(a);
  w.useEffect(() => {
    F.current = a;
  }, [a]);
  const E = w.useRef(e.layout);
  w.useEffect(() => {
    E.current = e.layout;
  }, [e.layout]);
  const V = w.useRef(null), O = w.useCallback(
    ($, T) => {
      const z = i0($, T).map((H) => ({ ...H }));
      x0(E.current, z) || F.current(z);
    },
    []
  );
  return /* @__PURE__ */ l(vi, { spec: e, children: /* @__PURE__ */ C("div", { ref: f, className: "cv-editor-canvas", children: [
    u > 0 && s && e.widgets.length === 0 ? /* @__PURE__ */ l(R0, { onInsert: ($) => s($, 0) }) : null,
    u > 0 ? /* @__PURE__ */ l(
      is,
      {
        width: u,
        layouts: R,
        breakpoints: { lg: 0 },
        cols: { lg: d },
        rowHeight: g,
        margin: h,
        containerPadding: v,
        dragConfig: { enabled: !0, handle: `.${nr}` },
        resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
        onLayoutChange: O,
        onDragStart: () => S(!0),
        onDragStop: () => S(!1),
        onResizeStart: () => S(!0),
        onResizeStop: () => S(!1),
        children: e.layout.map(($) => {
          const T = N.get($.i);
          if (!T) return null;
          const D = T.id === t;
          return (
            // Selecting = a click that bubbles up from anywhere in the widget;
            // RGL's drag (mousedown on the chrome header handle) wins for drags,
            // so we don't need a blocking overlay that would also block dragging.
            /* @__PURE__ */ C(
              "div",
              {
                role: "button",
                tabIndex: 0,
                "aria-label": `Select ${T.title ?? T.type}`,
                "aria-pressed": D,
                onPointerDown: (z) => {
                  V.current = { x: z.clientX, y: z.clientY };
                },
                onClick: (z) => {
                  const H = V.current;
                  H && Math.hypot(z.clientX - H.x, z.clientY - H.y) > 5 || n(T.id);
                },
                onKeyDown: (z) => {
                  (z.key === "Enter" || z.key === " ") && (z.preventDefault(), n(T.id));
                },
                className: I(
                  "cv-editor-widget",
                  // Idle = no chrome at all; hover paints a faint 1px ring so the
                  // hover target (and its action cluster) is obvious, and the
                  // SELECTED widget keeps the strong ring.
                  D && "cv-editor-widget--selected"
                ),
                children: [
                  /* @__PURE__ */ l(No, { widget: T, editable: !0 }),
                  /* @__PURE__ */ l("div", { "aria-hidden": !0, className: I(nr, "cv-editor-widget-drag-layer") }),
                  /* @__PURE__ */ C("div", { className: "cv-editor-widget-actions", children: [
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Edit ${T.title ?? T.type}`,
                        onClick: (z) => {
                          z.stopPropagation(), r(T.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(iu, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Duplicate ${T.title ?? T.type}`,
                        onClick: (z) => {
                          z.stopPropagation(), o(T.id);
                        },
                        className: "cv-editor-widget-action",
                        children: /* @__PURE__ */ l(au, {})
                      }
                    ),
                    /* @__PURE__ */ l(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Delete ${T.title ?? T.type}`,
                        onClick: (z) => {
                          z.stopPropagation(), i(T.id);
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
      k0,
      {
        rows: x,
        columns: k,
        metrics: p,
        width: u,
        containerRef: m,
        onInsert: s,
        disabled: b
      }
    ) : null
  ] }) });
}
function x0(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const o = n.get(r.i);
    if (!o || o.x !== r.x || o.y !== r.y || o.w !== r.w || o.h !== r.h) return !1;
  }
  return !0;
}
const M0 = w.memo(_0);
function F0(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function $0({
  widget: e,
  onChange: t
}) {
  const n = w.useRef(t);
  w.useEffect(() => {
    n.current = t;
  }, [t]);
  const r = w.useRef(e);
  w.useEffect(() => {
    r.current = e;
  }, [e]);
  const o = as({
    extensions: [ls],
    editable: !0,
    content: F0(e.doc),
    onUpdate: ({ editor: i }) => {
      const a = i.getJSON();
      n.current({ ...r.current, doc: a });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: I(ll, "cv-text-editor-content")
      }
    }
  });
  return o ? /* @__PURE__ */ l(ve, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ C("div", { className: "cv-text-editor", children: [
    /* @__PURE__ */ l(A0, { editor: o }),
    /* @__PURE__ */ l(ss, { editor: o })
  ] }) }) : /* @__PURE__ */ l("div", { className: "cv-text-editor-loading", children: "Loading editor…" });
}
function ct({ active: e, onClick: t, title: n, children: r }) {
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
function A0({ editor: e }) {
  const [, t] = w.useReducer((n) => n + 1, 0);
  return w.useEffect(() => {
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
          ct,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ l(su, {})
          }
        ),
        /* @__PURE__ */ l(
          ct,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ l(lu, {})
          }
        ),
        /* @__PURE__ */ l(
          ct,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ l(cu, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ct,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ l(uu, {})
          }
        ),
        /* @__PURE__ */ l(
          ct,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ l(du, {})
          }
        ),
        /* @__PURE__ */ l("span", { className: "cv-text-toolbar-divider", "aria-hidden": !0 }),
        /* @__PURE__ */ l(
          ct,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ l(mu, {})
          }
        ),
        /* @__PURE__ */ l(
          ct,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ l(fu, {})
          }
        ),
        /* @__PURE__ */ l(
          ct,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ l(gu, {})
          }
        )
      ]
    }
  );
}
const O0 = Wo(
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
function I0({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ l("div", { className: I(O0({ variant: t }), e), ...n });
}
function P0({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: o,
  className: i
}) {
  const { meta: a, isLoading: s } = Nt(), c = w.useMemo(() => $r(a), [a]), u = c.filter((p) => p.type === "view"), m = c.find((p) => p.name === e), f = w.useMemo(() => {
    const p = c.filter((v) => v.type === "cube"), d = p.some((v) => v.category), g = [], h = /* @__PURE__ */ new Map();
    for (const v of p) {
      const b = v.category ?? (d ? "More tables" : "Tables");
      h.has(b) || (h.set(b, []), g.push(b)), h.get(b).push(v);
    }
    return g.sort((v, b) => v === "More tables" ? 1 : b === "More tables" ? -1 : v.localeCompare(b)), g.map((v) => ({ label: v, items: h.get(v) }));
  }, [c]);
  return /* @__PURE__ */ C(Ve, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ l(He, { id: o, className: i, children: /* @__PURE__ */ l(ze, { placeholder: s ? "Loading…" : n, children: m ? /* @__PURE__ */ l(eo, { option: m }) : void 0 }) }),
    /* @__PURE__ */ C(Ge, { children: [
      u.length > 0 ? /* @__PURE__ */ C(So, { children: [
        /* @__PURE__ */ l(ko, { children: "Saved datasets" }),
        u.map((p) => /* @__PURE__ */ l(ke, { value: p.name, children: /* @__PURE__ */ l(eo, { option: p }) }, p.name))
      ] }) : null,
      f.map((p) => /* @__PURE__ */ C(So, { children: [
        /* @__PURE__ */ l(ko, { children: p.label }),
        p.items.map((d) => /* @__PURE__ */ l(ke, { value: d.name, children: /* @__PURE__ */ l(eo, { option: d }) }, d.name))
      ] }, p.label))
    ] })
  ] });
}
function eo({ option: e }) {
  const t = e.type === "view" ? ts : pu;
  return /* @__PURE__ */ C("span", { className: "cv-member-option", children: [
    /* @__PURE__ */ l(t, { className: "cv-cube-icon" }),
    /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: e.title }),
    /* @__PURE__ */ l(I0, { variant: "secondary", className: "cv-cube-badge", children: e.type === "view" ? "dataset" : "table" })
  ] });
}
const T0 = {
  dateRange: "Date range",
  granularity: "Group dates by",
  select: "Dropdown",
  memberSelect: "Field picker",
  text: "Text",
  number: "Number",
  toggle: "On/off switch"
};
function D0(e) {
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
function E0({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, o = (s) => n({ ...e, control: { ...e.control, control: s } }), i = (s) => n({ ...e, control: { ...e.control, variable: s } }), a = (s) => {
    s !== r.kind && o(D0(s));
  };
  return /* @__PURE__ */ C("div", { className: "cv-input-widget-editor", children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ C(
          Ve,
          {
            value: e.control.variable || void 0,
            onValueChange: i,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ l(He, { children: /* @__PURE__ */ l(ze, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ l(Ge, { children: t.map((s) => /* @__PURE__ */ l(ke, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ l(ve, { label: "Control", children: /* @__PURE__ */ C(Ve, { value: r.kind, onValueChange: (s) => a(s), children: [
      /* @__PURE__ */ l(He, { children: /* @__PURE__ */ l(ze, {}) }),
      /* @__PURE__ */ l(Ge, { children: Du.options.map((s) => /* @__PURE__ */ l(ke, { value: s, children: T0[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ l(L0, { control: r, onChange: o, variables: t })
  ] });
}
function L0({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ l(V0, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ l(H0, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ l(G0, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ l(j0, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ l(B0, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ l(q0, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function V0({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ C(we, { children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ l(
          z0,
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
function z0({
  selected: e,
  onChange: t
}) {
  const [n, r] = w.useState(!1), o = new Set(e.map((s) => s.toLowerCase())), i = (s) => {
    const c = new Set(o);
    c.has(s) ? c.delete(s) : c.add(s), t(Gn.filter((u) => c.has(u.value)).map((u) => u.value));
  }, a = o.size === 0 ? "Default set" : o.size === Gn.length ? "All presets" : `${o.size} selected`;
  return /* @__PURE__ */ C(je, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ l(Be, { asChild: !0, children: /* @__PURE__ */ C(re, { variant: "outline", className: "cv-preset-select-trigger", children: [
      /* @__PURE__ */ l("span", { className: "cv-ed-truncate", children: a }),
      /* @__PURE__ */ l(St, { className: "cv-preset-select-caret" })
    ] }) }),
    /* @__PURE__ */ l(qe, { className: "cv-preset-select-popover", align: "start", children: /* @__PURE__ */ l("div", { className: "cv-preset-select-list", children: Gn.map((s) => {
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
function H0({
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
  return /* @__PURE__ */ C(we, { children: [
    /* @__PURE__ */ l(
      ve,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ C(
          Ve,
          {
            value: e.rangeVariable ?? a,
            onValueChange: (s) => t({ ...e, rangeVariable: s === a ? void 0 : s }),
            disabled: i.length === 0,
            children: [
              /* @__PURE__ */ l(He, { children: /* @__PURE__ */ l(ze, { placeholder: i.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ C(Ge, { children: [
                /* @__PURE__ */ l(ke, { value: a, children: "None" }),
                i.map((s) => /* @__PURE__ */ l(ke, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
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
          className: I("cv-granularity-chip", c && "cv-granularity-chip--on"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function G0({
  control: e,
  onChange: t
}) {
  const n = (i, a) => {
    const s = e.options.map(
      (c, u) => u === i ? { value: a.value ?? String(c.value), label: a.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), o = (i) => t({ ...e, options: e.options.filter((a, s) => s !== i) });
  return /* @__PURE__ */ C(we, { children: [
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
        action: /* @__PURE__ */ C(re, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ l(Tt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ l("div", { className: "cv-select-options-list", children: e.options.length === 0 ? /* @__PURE__ */ l("p", { className: "cv-ed-hint", children: "No options yet." }) : e.options.map((i, a) => /* @__PURE__ */ C("div", { className: "cv-select-option-row", children: [
          /* @__PURE__ */ l(
            Ce,
            {
              className: "cv-ed-grow",
              "aria-label": `Option ${a + 1} label`,
              placeholder: "Label",
              value: i.label,
              onChange: (s) => n(a, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ l(
            Ce,
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
function j0({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ C(we, { children: [
    /* @__PURE__ */ l(ve, { label: "From", children: /* @__PURE__ */ C(
      Ve,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ l(He, { children: /* @__PURE__ */ l(ze, {}) }),
          /* @__PURE__ */ C(Ge, { children: [
            /* @__PURE__ */ l(ke, { value: "dimension", children: "Category fields" }),
            /* @__PURE__ */ l(ke, { value: "measure", children: "Number fields" }),
            /* @__PURE__ */ l(ke, { value: "dimensionOrMeasure", children: "All fields" })
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
          P0,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function B0({
  control: e,
  onChange: t
}) {
  const n = w.useId();
  return /* @__PURE__ */ l(ve, { label: "Placeholder", htmlFor: n, children: /* @__PURE__ */ l(
    Ce,
    {
      id: n,
      value: e.placeholder ?? "",
      onChange: (r) => t({ ...e, placeholder: r.target.value || void 0 })
    }
  ) });
}
function q0({
  control: e,
  onChange: t
}) {
  const n = w.useId(), r = (o, i) => /* @__PURE__ */ l(ve, { label: i, htmlFor: `${n}-${o}`, children: /* @__PURE__ */ l(
    Ce,
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
  return /* @__PURE__ */ C(we, { children: [
    r("min", "Min"),
    r("max", "Max"),
    r("step", "Step")
  ] });
}
function W0(e) {
  return { schemaVersion: Wt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function U0(e) {
  const t = {
    schemaVersion: Wt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function K0(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Ea({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: o = !1
}) {
  const i = w.useId(), a = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ C("div", { "data-slot": "widget-edit-panel", className: I("cv-widget-panel", o && "cv-widget-panel--fill"), children: [
    e.type !== "text" ? /* @__PURE__ */ l(
      ve,
      {
        label: "Title",
        htmlFor: i,
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ l(
          Ce,
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
      /* @__PURE__ */ l(vi, { spec: W0(t), children: /* @__PURE__ */ l(Gy, { createVariable: a, children: /* @__PURE__ */ l("div", { className: I(o && "cv-widget-panel-chart-fill"), children: /* @__PURE__ */ l(
        r0,
        {
          fill: o,
          spec: U0(e),
          onChange: (s) => n(K0(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ l($0, { widget: e, onChange: n }) : /* @__PURE__ */ l(E0, { widget: e, variables: t, onChange: n })
  ] });
}
function Y0(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Q0(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function X0(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function J0(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Z0(e, t) {
  switch (e) {
    case "chart":
      return Q0(t);
    case "text":
      return X0(t);
    case "input":
      return J0(t);
  }
}
function ew(e) {
  return { name: e, type: "string" };
}
function tw(e) {
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
function nw(e) {
  const t = {}, n = (r) => t[r] ?? (t[r] = { inputs: [], refs: 0 });
  for (const r of e.variables) n(r.name);
  for (const r of e.widgets) {
    if (r.type === "input") {
      const o = r.control.variable;
      o && n(o).inputs.push(r.id);
      continue;
    }
    r.type === "chart" && (ur(r.query, (o) => void n(o.var).refs++), ur(r.chart, (o) => void n(o.var).refs++));
  }
  return t;
}
function rw(e) {
  const t = [], n = (e == null ? void 0 : e.inputs.length) ?? 0, r = (e == null ? void 0 : e.refs) ?? 0;
  return n > 0 && t.push(`${n} input${n === 1 ? "" : "s"}`), r > 0 && t.push(`${r} quer${r === 1 ? "y" : "ies"}`), t.length > 0 ? t.join(" · ") : "Unused";
}
function ow(e, t, n) {
  if (t === n || n === "") return e;
  const r = e.variables;
  return !r.some((o) => o.name === t) || r.some((o) => o.name === n) ? e : {
    ...e,
    variables: r.map((o) => o.name === t ? { ...o, name: n } : o),
    widgets: e.widgets.map((o) => uc(o, t, () => ({ var: n }), n))
  };
}
function iw(e, t) {
  const n = e.variables.find((o) => o.name === t), r = n == null ? void 0 : n.default;
  return {
    ...e,
    variables: e.variables.filter((o) => o.name !== t),
    widgets: e.widgets.map(
      (o) => uc(o, t, () => r === void 0 ? cr : r, "")
    )
  };
}
const cr = Symbol("cv.removeVarRef");
function uc(e, t, n, r) {
  let o = e;
  o.type === "input" && o.control.variable === t && (o = { ...o, control: { ...o.control, variable: r } });
  const i = Lo(o, t, n);
  return i === cr ? o : i;
}
function ur(e, t) {
  if (Me(e)) {
    t(e);
    return;
  }
  if (Array.isArray(e)) {
    for (const n of e) ur(n, t);
    return;
  }
  if (e && typeof e == "object")
    for (const n of Object.values(e)) ur(n, t);
}
function Lo(e, t, n) {
  if (Me(e)) return e.var === t ? n(e) : e;
  if (Array.isArray(e)) {
    let r = !1;
    const o = [];
    for (const i of e) {
      const a = Lo(i, t, n);
      if (a === cr) {
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
      const s = Lo(a, t, n);
      if (s === cr) {
        r = !0;
        continue;
      }
      s !== a && (r = !0), o[i] = s;
    }
    return r ? o : e;
  }
  return e;
}
const La = {
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
function aw({
  spec: e,
  onChange: t,
  onClose: n,
  newName: r,
  className: o
}) {
  const i = e.variables, a = w.useMemo(() => nw(e), [e]), [s, c] = w.useState(null), u = w.useRef(0), m = () => {
    if (r) return r();
    let g;
    do
      g = `var_${++u.current}`;
    while (i.some((h) => h.name === g));
    return g;
  }, f = (g, h) => t((v) => ({
    ...v,
    variables: v.variables.map((b) => b.name === g ? sw(b, h) : b)
  })), p = () => {
    const g = m();
    t((h) => ({ ...h, variables: [...h.variables, ew(g)] })), c(g);
  }, d = (g, h) => t((v) => {
    const b = v.variables.findIndex((k) => k.name === g), S = b + h;
    if (b < 0 || S < 0 || S >= v.variables.length) return v;
    const x = v.variables.slice();
    return [x[b], x[S]] = [x[S], x[b]], { ...v, variables: x };
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
            /* @__PURE__ */ C(re, { variant: "outline", size: "sm", onClick: p, children: [
              /* @__PURE__ */ l(Tt, {}),
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
                children: /* @__PURE__ */ l(ro, {})
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
          /* @__PURE__ */ C(re, { variant: "outline", size: "sm", className: "cv-variables-empty-add", onClick: p, children: [
            /* @__PURE__ */ l(Tt, {}),
            " Add variable"
          ] })
        ] }) : /* @__PURE__ */ l("div", { className: "cv-variables-list", children: i.map((g, h) => /* @__PURE__ */ l(
          lw,
          {
            decl: g,
            index: h,
            total: i.length,
            usage: a[g.name],
            takenNames: i.filter((v, b) => b !== h).map((v) => v.name),
            autoFocusName: s === g.name,
            onNameCommitted: () => c(null),
            onRename: (v) => t((b) => ow(b, g.name, v)),
            onPatch: (v) => f(g.name, v),
            onRemove: () => t((v) => iw(v, g.name)),
            onMove: (v) => d(g.name, v)
          },
          g.name || `unnamed-${h}`
        )) }) })
      ]
    }
  );
}
function sw(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = tw(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function lw({
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
  const [f, p] = w.useState(!0), d = w.useId(), [g, h] = w.useState(e.name);
  w.useEffect(() => h(e.name), [e.name]);
  const v = g.trim(), b = v === "" ? "Name required" : o.includes(v) && v !== e.name ? "Name already used" : void 0, S = () => {
    if (b || v === e.name) {
      if (b) return;
      a();
      return;
    }
    s(v), a();
  }, x = ((r == null ? void 0 : r.inputs.length) ?? 0) + ((r == null ? void 0 : r.refs) ?? 0), [k, R] = w.useState(!1);
  return w.useEffect(() => {
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
          onClick: () => p((N) => !N),
          className: "cv-variable-row-toggle",
          children: f ? /* @__PURE__ */ l(St, {}) : /* @__PURE__ */ l(mr, {})
        }
      ),
      /* @__PURE__ */ l(
        Ce,
        {
          value: g,
          placeholder: "variable_name",
          "aria-label": "Variable name",
          "aria-invalid": b ? !0 : void 0,
          autoFocus: i,
          onChange: (N) => h(N.target.value),
          onBlur: S,
          onKeyDown: (N) => {
            N.key === "Enter" ? (N.preventDefault(), S()) : N.key === "Escape" && h(e.name);
          },
          className: "cv-variable-row-name"
        }
      ),
      /* @__PURE__ */ l("span", { className: "cv-variable-row-type", children: La[e.type] }),
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
            children: /* @__PURE__ */ l(Go, {})
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
            children: /* @__PURE__ */ l(jo, {})
          }
        )
      ] })
    ] }),
    b ? /* @__PURE__ */ l("p", { className: "cv-variable-row-error", children: b }) : null,
    f ? /* @__PURE__ */ C("div", { className: "cv-variable-row-body", children: [
      /* @__PURE__ */ l(ve, { label: "Type", className: "cv-ed-row-tight", children: /* @__PURE__ */ C(Ve, { value: e.type, onValueChange: (N) => c({ type: N }), children: [
        /* @__PURE__ */ l(He, { children: /* @__PURE__ */ l(ze, {}) }),
        /* @__PURE__ */ l(Ge, { children: ms.options.map((N) => /* @__PURE__ */ l(ke, { value: N, children: La[N] }, N)) })
      ] }) }),
      /* @__PURE__ */ l(
        ve,
        {
          label: "Label",
          htmlFor: d,
          hint: "Optional human label for controls.",
          className: "cv-ed-row-tight",
          children: /* @__PURE__ */ l(
            Ce,
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
      /* @__PURE__ */ l(cw, { decl: e, onChange: (N) => c({ default: N }) }),
      /* @__PURE__ */ C("div", { className: "cv-variable-row-usage", children: [
        /* @__PURE__ */ l(
          "span",
          {
            className: I(
              "cv-variable-row-usage-text",
              x === 0 && "cv-variable-row-usage-text--none"
            ),
            children: x === 0 ? "Unused" : `Used by ${rw(r)}`
          }
        ),
        /* @__PURE__ */ C(
          re,
          {
            variant: "ghost",
            size: "sm",
            className: I("cv-ed-muted", "cv-ed-hover-danger", k && "cv-ed-danger"),
            onClick: () => {
              if (x > 0 && !k) {
                R(!0);
                return;
              }
              u();
            },
            children: [
              /* @__PURE__ */ l(rn, {}),
              k ? `Remove (in use by ${x})` : "Remove"
            ]
          }
        )
      ] })
    ] }) : null
  ] });
}
function cw({
  decl: e,
  onChange: t
}) {
  const n = w.useId();
  if (e.type === "boolean")
    return /* @__PURE__ */ l(wt, { label: "Default", checked: e.default === !0, onChange: (i) => t(i) });
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ l(ve, { label: "Default", htmlFor: n, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
      Ce,
      {
        id: n,
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (i) => {
          const a = i.target.value;
          t(a === "" ? void 0 : Number(a));
        }
      }
    ) });
  const r = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, o = Array.isArray(e.default) ? e.default.join(", ") : uw(e.default);
  return /* @__PURE__ */ l(ve, { label: "Default", htmlFor: n, hint: r, className: "cv-ed-row-tight", children: /* @__PURE__ */ l(
    Ce,
    {
      id: n,
      value: o,
      placeholder: dw(e.type),
      onChange: (i) => {
        const a = i.target.value;
        if (a === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const s = a.split(",").map((c) => c.trim()).filter(Boolean);
          t(s);
          return;
        }
        t(a);
      }
    }
  ) });
}
function uw(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function dw(e) {
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
function Zw({
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
  redoLabel: p,
  onDiscard: d,
  families: g,
  onCreateChart: h,
  openWidgetId: v,
  renderWidgetAside: b,
  renderWidgetHeaderExtra: S,
  onEditingChange: x,
  className: k
}) {
  var Vt, it;
  const [R, N] = w.useState(e), [F, E] = w.useState(e);
  w.useEffect(() => {
    N(e), E(e);
  }, [e]);
  const [V, O] = w.useState(null), $ = w.useRef(0), [T, D] = w.useState(null), [z, H] = w.useState(!1), L = w.useRef(V), J = w.useRef(T), Z = w.useRef(R);
  w.useEffect(() => {
    L.current = V, J.current = T, Z.current = R;
  });
  const ne = w.useRef(null);
  ne.current === null && (ne.current = i ?? Y0());
  const le = i ?? ne.current, fe = sc(
    (B, X) => r == null ? void 0 : r(B, X),
    a
  ), Q = w.useCallback(
    (B, X) => {
      $.current = Date.now(), N((_e) => {
        const Ue = B(_e);
        return fe(Ue, X), Ue;
      });
    },
    [fe]
  ), pe = w.useRef(/* @__PURE__ */ new Map()), ye = w.useCallback((B, X) => `${B}:${X}:${pe.current.get(X) ?? 0}`, []), G = w.useRef(t);
  w.useEffect(() => {
    if (!t || t === G.current) return;
    const B = 500;
    let X = null;
    const _e = () => {
      var Vi;
      const Ue = Date.now() - $.current;
      if (Ue < B) {
        X = setTimeout(_e, B - Ue);
        return;
      }
      G.current = t;
      const zt = /* @__PURE__ */ new Set();
      ((Vi = J.current) == null ? void 0 : Vi.kind) === "widget" && zt.add(J.current.id), L.current && zt.add(L.current);
      const Li = fw(t, Z.current, zt);
      N(Li), n == null || n(Li);
    };
    return _e(), () => {
      X && clearTimeout(X);
    };
  }, [t]);
  const oe = w.useCallback(
    (B, X, _e) => {
      if (B === "chart" && h) {
        h();
        return;
      }
      const Ue = Z0(B, le());
      Q(
        (zt) => _e === void 0 ? c0(zt, Ue, X) : m0(zt, Ue, X, _e),
        {
          kind: "add",
          widgetId: Ue.id,
          label: `add ${B}`
        }
      ), O(Ue.id), B === "chart" && D({ kind: "widget", id: Ue.id });
    },
    [Q, le, h]
  ), ue = w.useRef(void 0);
  w.useEffect(() => {
    !v || ue.current === v || R.widgets.some((B) => B.id === v) && (ue.current = v, O(v), D({ kind: "widget", id: v }));
  }, [v, R.widgets]);
  const P = w.useCallback((B) => O(B), []), M = w.useCallback((B) => {
    O(B), D({ kind: "widget", id: B });
  }, []), _ = w.useCallback(
    (B) => {
      Q((X) => w0(X, B), {
        kind: "remove",
        widgetId: B,
        label: `delete "${Vn(Z.current.widgets.find((X) => X.id === B))}"`
      }), O((X) => X === B ? null : X), D((X) => (X == null ? void 0 : X.id) === B ? null : X);
    },
    [Q]
  ), A = w.useCallback(
    (B) => {
      const X = le();
      Q((_e) => b0(_e, B, X), {
        kind: "duplicate",
        widgetId: X,
        label: `duplicate "${Vn(Z.current.widgets.find((_e) => _e.id === B))}"`
      }), O(X);
    },
    [Q, le]
  ), j = w.useCallback(
    (B) => {
      const X = B.type === "text" ? "text" : "widget";
      Q((_e) => C0(_e, B), {
        kind: X,
        widgetId: B.id,
        label: `edit "${Vn(B)}"`,
        coalesceKey: ye(X, B.id)
      });
    },
    [Q, ye]
  ), q = w.useCallback(
    (B) => Q(
      (X) => {
        const _e = a0(X.layout, B);
        return mw(X.layout, _e) ? X : { ...X, layout: _e };
      },
      { kind: "layout", label: "layout change" }
    ),
    [Q]
  ), K = w.useCallback(
    (B) => Q((X) => ({ ...X, name: B || void 0 }), {
      kind: "name",
      label: "rename dashboard",
      // Every keystroke is one commit; the host folds them into one undo step.
      coalesceKey: "name"
    }),
    [Q]
  ), ee = w.useCallback(
    (B) => Q((X) => ({ ...X, variables: B }), {
      kind: "variables",
      label: "edit variables",
      coalesceKey: "variables"
    }),
    [Q]
  ), Re = w.useCallback(
    (B) => Q(B, { kind: "variables", label: "edit variables", coalesceKey: "variables" }),
    [Q]
  ), be = w.useDeferredValue(R), Y = w.useMemo(
    () => so.safeParse(be),
    [be]
  ), ce = w.useCallback(() => {
    const B = so.safeParse(R);
    B.success && (o == null || o(B.data), E(R));
  }, [R, o]), de = R !== F, me = T ? R.widgets.find((B) => B.id === T.id) ?? null : null;
  w.useEffect(() => {
    T && !R.widgets.some((B) => B.id === T.id) && D(null);
  }, [T, R.widgets]);
  const Qe = w.useCallback(() => {
    D((B) => (B && pe.current.set(B.id, (pe.current.get(B.id) ?? 0) + 1), null));
  }, []), Ne = me ? Vn(me) : "", et = (me == null ? void 0 : me.type) === "chart" ? { widget: me, update: j, close: Qe } : null, he = et && b ? b(et) : null, We = et && S ? S(et) : null, Le = (T == null ? void 0 : T.id) ?? null;
  return w.useEffect(() => {
    x == null || x(Le);
  }, [Le, x]), /* @__PURE__ */ l(hi, { families: g, children: /* @__PURE__ */ C(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((it = (Vt = R.grid) == null ? void 0 : Vt.margin) == null ? void 0 : it[0]) ?? 12 },
      className: I("cv-dashboard-editor", k),
      children: [
        /* @__PURE__ */ l(
          o0,
          {
            name: R.name ?? "",
            onNameChange: K,
            onToggleVariables: () => H((B) => !B),
            variablesOpen: z,
            variableCount: R.variables.length,
            onUndo: s,
            onRedo: c,
            canUndo: u,
            canRedo: m,
            undoLabel: f,
            redoLabel: p,
            onDiscard: d,
            discardDisabled: !de,
            onSave: o ? ce : void 0,
            saveDisabled: !Y.success || !de,
            className: "cv-dashboard-editor-toolbar"
          }
        ),
        Y.success ? null : /* @__PURE__ */ C("p", { className: "cv-dashboard-editor-validation", children: [
          Y.error.issues.length,
          " validation issue",
          Y.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-body", children: [
          /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-scroll", children: T ? null : /* @__PURE__ */ l(
            M0,
            {
              spec: R,
              selectedId: V,
              onSelect: P,
              onEdit: M,
              onDuplicate: A,
              onDelete: _,
              onLayoutChange: q,
              onInsert: oe
            }
          ) }),
          z && !T ? /* @__PURE__ */ l(
            aw,
            {
              spec: R,
              onChange: Re,
              onClose: () => H(!1)
            }
          ) : null
        ] }),
        T ? /* @__PURE__ */ C(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": Ne,
            className: "cv-dashboard-editor-fullscreen",
            children: [
              /* @__PURE__ */ C("header", { className: "cv-dashboard-editor-fullscreen-header", children: [
                /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-heading", children: [
                  /* @__PURE__ */ C(re, { variant: "ghost", size: "sm", onClick: Qe, children: [
                    /* @__PURE__ */ l(qo, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ l("span", { className: "cv-dashboard-editor-fullscreen-title", children: Ne })
                ] }),
                /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-actions", children: [
                  We,
                  me ? /* @__PURE__ */ C(
                    re,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "cv-ed-danger",
                      onClick: () => _(me.id),
                      children: [
                        /* @__PURE__ */ l(rn, {}),
                        " Delete"
                      ]
                    }
                  ) : null
                ] })
              ] }),
              /* @__PURE__ */ l(Ar, { label: Ne, resetKey: R, children: /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-body", children: (me == null ? void 0 : me.type) === "chart" ? /* @__PURE__ */ C("div", { className: "cv-dashboard-editor-fullscreen-row", children: [
                /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-main", children: /* @__PURE__ */ l(
                  Ea,
                  {
                    fill: !0,
                    widget: me,
                    variables: R.variables,
                    onChange: j,
                    onVariablesChange: ee
                  }
                ) }),
                he ? /* @__PURE__ */ l("aside", { "data-slot": "dashboard-editor-aside", className: "cv-dashboard-editor-fullscreen-aside", children: he }) : null
              ] }) : me ? /* @__PURE__ */ l("div", { className: "cv-dashboard-editor-fullscreen-column", children: /* @__PURE__ */ l(
                Ea,
                {
                  widget: me,
                  variables: R.variables,
                  onChange: j,
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
function Vn(e) {
  if (!e) return "widget";
  if (e.title) return e.title;
  const t = e.type;
  return `${t[0].toUpperCase()}${t.slice(1)} widget`;
}
function mw(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], o = t[n];
    if (r.i !== o.i || r.x !== o.x || r.y !== o.y || r.w !== o.w || r.h !== o.h || r.minW !== o.minW || r.minH !== o.minH || r.static !== o.static)
      return !1;
  }
  return !0;
}
function fw(e, t, n) {
  const r = new Map(t.widgets.map((u) => [u.id, u])), o = new Set(e.widgets.map((u) => u.id)), i = e.widgets.map(
    (u) => n.has(u.id) && r.has(u.id) ? r.get(u.id) : u
  );
  for (const u of t.widgets)
    !o.has(u.id) && n.has(u.id) && i.push(u);
  const a = new Map(t.layout.map((u) => [u.i, u])), s = new Set(e.layout.map((u) => u.i)), c = e.layout.map(
    (u) => n.has(u.i) && a.has(u.i) ? a.get(u.i) : u
  );
  for (const u of t.layout)
    !s.has(u.i) && n.has(u.i) && c.push(u);
  return { ...e, widgets: i, layout: c };
}
export {
  Qt as AUTO_GRANULARITY,
  Wd as AreaChartFamily,
  xd as AreaFamilyOptionsSchema,
  Au as AxesOptionsSchema,
  Wi as AxisOptionsSchema,
  Hw as BUILTIN_CHART_FAMILIES,
  st as BUILTIN_DEFAULTS,
  at as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Bd as BarChartFamily,
  Nd as BarFamilyOptionsSchema,
  lc as CANONICAL_BREAKPOINT,
  vt as ChartColorTokenSchema,
  Zb as ChartEditOverlay,
  r0 as ChartEditor,
  _u as ChartFamilySchema,
  Jo as ChartInteractionProvider,
  ds as ChartOptionsSchema,
  Ks as ChartRenderer,
  gs as ChartSpecSchema,
  Pu as ChartTransformSchema,
  Xw as ChartView,
  Lu as ChartWidgetSchema,
  Ou as ColorAssignmentSchema,
  Od as CondFormatRuleSchema,
  yi as CubeChart,
  ph as CubeChartSpec,
  us as CubeQuerySchema,
  Nr as CubeVizContext,
  Kw as CubeVizProvider,
  Cr as DEFAULT_COLOR_RAMP,
  sn as DEFAULT_COLS,
  Di as DEFAULT_FOOTPRINT,
  la as DEFAULT_MARK_THEME,
  zn as DEFAULT_TRANSFORM_WINDOW,
  Co as DEFAULT_UNIT_CONVERSIONS,
  nr as DRAG_HANDLE_CLASS,
  Qw as Dashboard,
  Zw as DashboardEditor,
  vi as DashboardProvider,
  so as DashboardSpecSchema,
  io as DateRangeSchema,
  Td as EMPTY_FAMILY_DEFAULT,
  Qi as EM_DASH,
  M0 as EditorCanvas,
  o0 as EditorToolbar,
  hi as FamilyRegistryOverride,
  Wy as FilterBuilder,
  Su as FilterOperatorSchema,
  xu as FormatKindSchema,
  Uo as FormatOptionsSchema,
  fd as GRANULARITY_PATTERN,
  Cu as GranularityChoiceSchema,
  ht as GranularitySchema,
  ju as GridConfigSchema,
  rm as HeatmapChartFamily,
  Pd as HeatmapFamilyOptionsSchema,
  Du as InputControlKindSchema,
  Eu as InputControlSchema,
  E0 as InputWidgetEditor,
  zu as InputWidgetSchema,
  Th as InputWidgetView,
  k0 as InsertLines,
  am as KpiFamily,
  $d as KpiFamilyOptionsSchema,
  Gu as LayoutItemSchema,
  ku as LeafFilterSchema,
  Fu as LegendOptionsSchema,
  qd as LineChartFamily,
  _d as LineFamilyOptionsSchema,
  ge as MemberSchema,
  Bi as OrderDirSchema,
  Nu as OrderSpecSchema,
  Yd as PieChartFamily,
  Md as PieFamilyOptionsSchema,
  ao as QueryFilterSchema,
  vr as ReferenceLineOptSchema,
  No as RenderWidget,
  Wt as SCHEMA_VERSION,
  wu as ScalarSchema,
  Xd as ScatterChartFamily,
  Fd as ScatterFamilyOptionsSchema,
  Mu as SeriesMappingSchema,
  qi as SeriesMetaSchema,
  ps as SpecSchema,
  Ad as TableColumnOptSchema,
  bf as TableFamily,
  Id as TableFamilyOptionsSchema,
  $0 as TextWidgetEditor,
  Vu as TextWidgetSchema,
  vh as TextWidgetView,
  Ru as TimeDimensionSchema,
  Tu as TipTapDocSchema,
  $u as TooltipOptionsSchema,
  Iu as TransformKindSchema,
  Xn as VarRefSchema,
  Bu as VariableDeclSchema,
  ms as VariableTypeSchema,
  cs as VariableValueSchema,
  aw as VariablesDock,
  gl as WidgetChrome,
  Ea as WidgetEditPanel,
  Hu as WidgetSpecSchema,
  Jw as adaptiveGranularity,
  l0 as appendWidget,
  Ef as areaChartFamily,
  ua as assignColors,
  pi as autoGranularityFor,
  Qp as axisKey,
  Tf as barChartFamily,
  mi as buildFamilyRegistry,
  Uw as builtinCharts,
  ot as builtinFamilyDescriptors,
  wr as builtinFamilyRegistry,
  Ml as canonicalTimeOf,
  uy as collapseFamilies,
  u0 as columnBoundaries,
  y0 as columnBoundaryLeft,
  v0 as columnWidth,
  cd as createCubeClient,
  Y0 as createIdFactory,
  el as createQueryResolver,
  nl as createUnitsFormatter,
  hg as createVariableStore,
  pd as datePattern,
  lo as deepMerge,
  di as defaultChartFamilies,
  tw as defaultForType,
  Yo as defaultFormatter,
  p0 as editorGridMetrics,
  ar as familyKeyOf,
  ud as fetchMeta,
  pt as findCube,
  Te as findMember,
  qw as formatCategory,
  Ut as formatDateValue,
  ny as geoPointId,
  cy as grainAggLabel,
  Xs as granularitiesForSpan,
  Js as granularityOptionsFor,
  zf as heatmapChartFamily,
  m0 as insertWidgetAtColumn,
  c0 as insertWidgetAtRow,
  Zt as isEmptyValue,
  Me as isVarRef,
  Hf as kpiChartFamily,
  Df as lineChartFamily,
  $r as listCubes,
  Dt as listMembers,
  ld as loadSpec,
  hr as looksLikeIsoDate,
  Qo as makeChartFormat,
  Bw as makeDateFormatter,
  Ww as makeFormatter,
  Si as memberAgg,
  iy as memberAggDefault,
  jn as memberCanonicalTime,
  sr as memberFamilyTitle,
  xl as memberGroup,
  a0 as mergeLayout,
  Rr as mergeUnitConversions,
  Q0 as newChartWidget,
  J0 as newInputWidget,
  X0 as newTextWidget,
  ew as newVariable,
  Z0 as newWidget,
  Qs as normalize,
  ey as pathLabel,
  i0 as pickCanonicalLayout,
  Lf as pieChartFamily,
  s0 as placeNewItem,
  Jp as quantityLabel,
  gi as rangeSpanDays,
  iw as removeVariable,
  w0 as removeWidget,
  ow as renameVariable,
  C0 as replaceWidget,
  rh as resolveChart,
  Us as resolveMarkTheme,
  Bf as resolveOptions,
  Dd as resolveOptionsWith,
  Zs as resolveQuery,
  ug as resolveRelativeDateRange,
  Ys as resolveSeriesColors,
  mg as resolveValue,
  Ei as rowBoundaries,
  Da as rowBoundaryTop,
  h0 as rowSpanHeight,
  Gw as safeLoadSpec,
  Vf as scatterChartFamily,
  Gf as tableChartFamily,
  hs as toDate,
  eg as toResultAnnotation,
  rw as usageSummary,
  t0 as useChartEditorState,
  ws as useChartInteractions,
  sl as useContainerWidth,
  Nt as useCubeMeta,
  il as useCubeQuery,
  Je as useCubeVizContext,
  al as useDashboard,
  sc as useDebouncedCallback,
  xr as useDisplayUnit,
  Rt as useFamilyRegistry,
  Yw as useFormatter,
  Ur as useNormalizedSeries,
  An as useOptionalDashboard,
  jw as validateSpec,
  nw as variableUsages
};
//# sourceMappingURL=index.js.map
