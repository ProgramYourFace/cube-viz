var Hi = Object.defineProperty;
var Bi = (e, t, n) => t in e ? Hi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ca = (e, t, n) => Bi(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as i, jsxs as v, Fragment as ue } from "react/jsx-runtime";
import * as Tr from "recharts";
import { BarChart as Ui, CartesianGrid as dn, YAxis as Qe, XAxis as Dt, Bar as vo, LabelList as fo, ReferenceLine as ct, LineChart as Gi, Line as ho, AreaChart as po, Area as zr, PieChart as Yi, Pie as Qi, Cell as go, Label as Ji, ScatterChart as Xi, ZAxis as Zi, Scatter as ec, RadialBarChart as tc, PolarAngleAxis as nc, RadialBar as rc, ResponsiveContainer as ac, ComposedChart as oc } from "recharts";
import * as x from "react";
import { useId as bo, useMemo as ce, createContext as yo, useContext as Fr, useState as Tt, useCallback as ot, useEffect as vn, useRef as ht, createElement as ic, useSyncExternalStore as xo, Component as cc } from "react";
import { clsx as sc } from "clsx";
import { extendTailwindMerge as lc } from "tailwind-merge";
import { z as d } from "zod";
import { Minus as wo, ArrowUp as $n, ArrowDown as In, CalendarRange as ko, ChevronsUpDown as uc, AreaChart as mc, BarChart3 as Co, BarChart4 as dc, Table as vc, Gauge as fc, ScatterChart as hc, PieChart as pc, LineChart as gc, AlertCircle as Pr, ChevronLeft as Er, ChevronRight as fn, ChevronDown as lt, Check as Ve, ChevronUp as bc, CalendarIcon as No, MoreVertical as yc, RefreshCw as xc, Image as wc, Sheet as kc, Type as $r, MapPin as So, Hash as fr, Calendar as _o, Search as Cc, Table2 as Ro, Database as Ao, Layers as Ir, Variable as Nc, Plus as zt, Trash2 as It, ListFilter as Sc, Box as Mo, EyeOff as Oo, Eye as Lo, X as Na, Save as Do, SlidersHorizontal as _c, Braces as Rc, Undo2 as Ac, Redo2 as Mc, RotateCcw as Oc, Pencil as Lc, Copy as Dc, Bold as Tc, Italic as zc, Strikethrough as Fc, Heading1 as Pc, Heading2 as Ec, List as $c, ListOrdered as Ic, Quote as jc } from "lucide-react";
import * as _n from "@radix-ui/react-popover";
import { cva as jr } from "class-variance-authority";
import * as Se from "@radix-ui/react-select";
import Vc from "@cubejs-client/core";
import { format as ge, isValid as Jt, parseISO as Rn, subDays as Ce, startOfWeek as An, endOfWeek as Mn, startOfMonth as pt, endOfMonth as tn, startOfQuarter as gt, endOfQuarter as nn, startOfYear as bt, endOfYear as rn, subWeeks as hr, subMonths as yt, subQuarters as xt, subYears as wt, differenceInCalendarDays as qc, parse as To } from "date-fns";
import { DayPicker as Kc, useDayPicker as Wc } from "react-day-picker";
import { ResponsiveGridLayout as zo } from "react-grid-layout";
import { useEditor as Fo, EditorContent as Po } from "@tiptap/react";
import Eo from "@tiptap/starter-kit";
const Ot = 1, On = d.object({ var: d.string().min(1) }).strict();
function Fe(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Ln = (e) => d.union([e, On]), Hc = d.union([d.string(), d.number(), d.boolean()]), kt = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), pr = d.union([d.tuple([d.string(), d.string()]), d.string()]), $o = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), le = d.string().min(1), Bc = d.enum([
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
]), Uc = d.object({
  member: le,
  operator: Bc,
  values: d.array(d.union([Hc, On])).optional()
}).strict(), gr = d.lazy(
  () => d.union([
    Uc,
    d.object({ and: d.array(gr) }).strict(),
    d.object({ or: d.array(gr) }).strict()
  ])
), Gc = d.object({
  dimension: le,
  granularity: Ln(kt).optional(),
  dateRange: Ln(pr).optional(),
  compareDateRange: d.array(pr).optional()
}).strict(), Sa = d.enum(["asc", "desc"]), Yc = d.union([
  d.record(le, Sa),
  d.array(d.tuple([le, Sa]))
]), Io = d.object({
  measures: d.array(le).optional(),
  dimensions: d.array(le).optional(),
  timeDimensions: d.array(Gc).optional(),
  filters: d.array(gr).optional(),
  segments: d.array(le).optional(),
  order: Yc.optional(),
  limit: Ln(d.number()).optional(),
  offset: Ln(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), Qc = d.string().min(1), Sp = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], st = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Jc = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), jn = d.object({
  kind: Jc.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: d.string().optional()
}).strict(), _a = d.object({
  label: d.string().optional(),
  colorToken: st.optional(),
  stackId: d.string().optional(),
  axis: d.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: jn.optional()
}).strict(), Xc = d.object({
  category: d.object({ member: le }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(le),
      meta: d.record(le, _a).optional()
    }).strict(),
    d.object({
      mode: d.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: le,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: d.array(le).optional(),
      pivot: le,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: d.record(le, _a).optional()
    }).strict()
  ])
}).strict(), Zc = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), es = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), Ra = d.union([d.number(), d.literal("auto")]), nr = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([Ra, Ra]).optional(),
  tickFormat: jn.optional()
}).strict(), ts = d.object({
  x: nr.optional(),
  y: nr.optional(),
  y2: nr.optional()
}).strict(), ns = d.object({
  byKey: d.record(d.string(), st).optional(),
  ramp: d.array(st).optional()
}).strict(), jo = d.object({
  family: Qc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Xc.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Zc.optional(),
  tooltip: es.optional(),
  axes: ts.optional(),
  colors: ns.optional(),
  format: jn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), rs = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), as = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), os = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(kt).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: $o, label: d.string() }).strict()),
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
}).strict(), Vr = {
  id: d.string().min(1),
  title: d.string().optional()
}, is = d.object({ ...Vr, type: d.literal("chart"), query: Io.default({}), chart: jo }).strict(), cs = d.object({ ...Vr, type: d.literal("text"), doc: rs }).strict(), ss = d.object({ ...Vr, type: d.literal("input"), control: os }).strict(), ls = d.discriminatedUnion("type", [
  is,
  cs,
  ss
]), us = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), ms = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), Vo = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), ds = d.object({
  name: d.string().min(1),
  type: Vo,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: $o.optional()
}).strict(), qo = {
  schemaVersion: d.literal(Ot),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, Ko = d.object({ ...qo, kind: d.literal("chart"), query: Io.default({}), chart: jo }).strict(), br = d.object({
  ...qo,
  kind: d.literal("dashboard"),
  variables: d.array(ds),
  widgets: d.array(ls),
  layout: d.array(us),
  grid: ms.optional()
}).strict(), Wo = d.discriminatedUnion("kind", [Ko, br]), vs = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function fs(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > Ot)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${Ot} — update the library`
    );
  for (; n < Ot; ) {
    const a = vs[n];
    if (!a) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = a(t), n += 1, t.schemaVersion = n;
  }
  return Wo.parse(t);
}
function _p(e) {
  try {
    return { ok: !0, spec: fs(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Rp(e) {
  return Wo.parse(e);
}
function hs(e) {
  return Vc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ps(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const gs = lc({ prefix: "cv" });
function S(...e) {
  return gs(sc(e));
}
function qr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function bs({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const ys = jr(
  "cv:relative cv:w-full cv:rounded-lg cv:border cv:border-border cv:px-4 cv:py-3 cv:text-sm cv:grid cv:has-[>svg]:grid-cols-[calc(var(--cv-spacing)*4)_1fr] cv:grid-cols-[0_1fr] cv:has-[>svg]:gap-x-3 cv:gap-y-0.5 cv:items-start cv:[&>svg]:size-4 cv:[&>svg]:translate-y-0.5 cv:[&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "cv:bg-card cv:text-card-foreground",
        destructive: "cv:text-destructive cv:bg-card cv:[&>svg]:text-current cv:*:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Vn = x.forwardRef(({ className: e, variant: t, ...n }, a) => /* @__PURE__ */ i(
  "div",
  {
    ref: a,
    "data-slot": "alert",
    role: "alert",
    className: S(ys({ variant: t }), e),
    ...n
  }
));
Vn.displayName = "Alert";
const qn = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: S("cv:col-start-2 cv:line-clamp-1 cv:min-h-4 cv:font-medium cv:tracking-tight", e),
      ...t
    }
  )
);
qn.displayName = "AlertTitle";
const Kn = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: S(
        "cv:col-start-2 cv:grid cv:justify-items-start cv:gap-1 cv:text-sm cv:text-muted-foreground cv:[&_p]:leading-relaxed",
        e
      ),
      ...t
    }
  )
);
Kn.displayName = "AlertDescription";
const xs = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, ws = "MMM d, yyyy";
function ks(e) {
  if (e instanceof Date) return Jt(e) ? e : null;
  if (typeof e == "number") {
    const a = new Date(e);
    return Jt(a) ? a : null;
  }
  const t = Rn(e);
  if (Jt(t)) return t;
  const n = new Date(e);
  return Jt(n) ? n : null;
}
function Ho(e) {
  return /^\d{4}-\d{2}/.test(e) ? Jt(Rn(e)) : !1;
}
function Cs(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? xs[t] : ws;
}
function an(e, t, n) {
  const a = ks(e);
  return a ? ge(a, Cs(t, n)) : String(e);
}
function Ap(e, t) {
  return (n) => n == null ? "" : an(n, e, t);
}
function Mp(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? an(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? an(e, t.format, t.granularity) : String(e) : Ho(e) ? an(e, t.format, t.granularity) : e;
}
const Aa = "—", Ns = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Ma(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ss(e, t) {
  const n = Math.abs(e);
  for (const { limit: a, suffix: r } of Ns)
    if (n >= a) return Ma((e / a).toFixed(t)) + r;
  return Ma(e.toFixed(t));
}
function _s(e, t, n) {
  const a = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (a.minimumFractionDigits = t.decimals, a.maximumFractionDigits = t.decimals) : a.maximumFractionDigits = 2, new Intl.NumberFormat(n, a).format(e);
}
function Rs(e, t) {
  const { format: n, meta: a, locale: r } = t, o = n != null && n.abbreviate ? Ss(e, n.decimals ?? 1) : _s(e, n, r), c = (n == null ? void 0 : n.suffix) ?? ((a == null ? void 0 : a.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${c ? ` ${c}` : ""}`;
}
function Bo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function As(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Bo(e.value) ? !0 : typeof e.value == "string" ? Ho(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Kr = (e) => {
  const { value: t, format: n, granularity: a } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Aa : (Bo(t) || typeof t == "string" || typeof t == "number") && As(e) ? an(t, n, a) : typeof t == "number" ? Rs(t, e) : String(t);
};
function Ms(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Op(e, t) {
  return (n, a) => {
    const r = a ? Ms(a, t) : void 0;
    return Kr({
      value: n,
      meta: r == null ? void 0 : r.meta,
      title: (r == null ? void 0 : r.shortTitle) ?? (r == null ? void 0 : r.title),
      role: "value",
      format: e
    });
  };
}
function Os(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Ls(e) {
  const t = kt.safeParse(e);
  return t.success ? t.data : void 0;
}
function Ds(e, t) {
  var a;
  const n = (a = t.mapping) == null ? void 0 : a.category.member;
  if (!(!n || !e)) {
    for (const r of Object.keys(e.timeDimensions))
      if (r !== n && r.startsWith(`${n}.`)) {
        const o = Ls(r.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function Uo(e, t, n, a) {
  const r = Ds(e, t);
  return {
    value(o, c, s = "value") {
      const l = c ? Os(c, e) : void 0, u = l == null ? void 0 : l.meta;
      return n({
        value: o,
        member: c,
        meta: u,
        title: (l == null ? void 0 : l.shortTitle) ?? (l == null ? void 0 : l.title),
        role: s,
        format: t.format,
        locale: a == null ? void 0 : a.locale,
        unitSystem: a == null ? void 0 : a.unitSystem
      });
    },
    category(o) {
      return n({
        value: o,
        role: "category",
        format: t.format,
        granularity: r,
        locale: a == null ? void 0 : a.locale,
        unitSystem: a == null ? void 0 : a.unitSystem
      });
    }
  };
}
const hn = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  side: d.enum(["left", "right"]).optional(),
  // combo dual-axis: which y-scale
  label: d.string().optional(),
  colorToken: st.optional()
}).strict(), Wr = d.boolean().optional(), Ts = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(hn).optional(),
  comparePrevious: Wr
}).strict(), Hr = d.enum(["linear", "monotone", "step", "natural"]), zs = d.object({
  curve: Hr.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(hn).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: Wr
}).strict(), Fs = d.object({
  curve: Hr.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(hn).optional(),
  comparePrevious: Wr
}).strict(), Ps = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), Es = d.object({
  x: le,
  y: le,
  size: le.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: le.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(hn).optional()
}).strict(), $s = d.object({
  display: d.enum(["number", "gauge"]).optional(),
  measure: le,
  comparison: d.object({
    mode: d.enum(["previousPeriod", "value"]),
    value: d.union([le, d.number()]).optional(),
    showAsPercent: d.boolean().optional(),
    goodDirection: d.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: d.object({
    member: le.optional(),
    timeDimension: le.optional(),
    granularity: d.union([kt, On]).optional(),
    dateRange: d.union([pr, On]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: d.enum(["up", "down"]).optional(),
  gauge: d.object({
    min: d.number().optional(),
    max: d.number(),
    thresholds: d.array(d.object({ at: d.number(), colorToken: st }).strict()).optional()
  }).strict().optional(),
  icon: d.string().optional()
}).strict(), Is = d.object({
  member: le,
  label: d.string().optional(),
  format: jn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), js = d.object({
  member: le,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: st.optional()
}).strict(), Vs = d.object({
  columns: d.array(Is).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(js).optional()
}).strict(), qs = d.object({
  member: le,
  render: d.enum(["bar", "line", "area"]),
  axis: d.enum(["left", "right"]).optional(),
  colorToken: st.optional(),
  stackId: d.string().optional(),
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: d.boolean().optional(),
  label: d.string().optional()
}).strict(), Ks = d.object({
  series: d.array(qs),
  referenceLines: d.array(hn).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: Hr.optional(),
  dots: d.boolean().optional(),
  connectNulls: d.boolean().optional(),
  strokeWidth: d.number().optional(),
  fillOpacity: d.number().optional(),
  barRadius: d.number().optional()
}).strict(), et = {
  bar: Ts,
  line: zs,
  area: Fs,
  pie: Ps,
  scatter: Es,
  kpi: $s,
  table: Vs,
  combo: Ks
}, tt = {
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
  table: {
    envelope: {},
    familyOptions: {
      pageSize: 25,
      sortable: !0,
      stickyHeader: !0,
      rowHeight: "default"
    }
  },
  combo: {
    envelope: {
      legend: { show: !0, position: "bottom" },
      tooltip: { show: !0, indicator: "dot" },
      format: { kind: "auto" }
    },
    // series is required from the spec; an empty combo renders the empty state.
    familyOptions: { series: [] }
  }
};
function Oa(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function yr(e, t) {
  if (t === void 0) return e;
  if (!Oa(e) || !Oa(t))
    return t;
  const n = { ...e };
  for (const a of Object.keys(t)) {
    const r = t[a];
    r !== void 0 && (n[a] = a in e ? yr(e[a], r) : r);
  }
  return n;
}
const Ws = { envelope: {}, familyOptions: {} };
function Hs(e, t) {
  return {
    ...yr({ ...t.envelope }, e),
    familyOptions: yr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Bs = { light: "", dark: ".dark" }, Go = x.createContext(null);
function Yo() {
  const e = x.useContext(Go);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const ut = x.forwardRef(({ id: e, className: t, children: n, config: a, ...r }, o) => {
  const c = x.useId(), s = `chart-${e || c.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Go.Provider, { value: { config: a }, children: /* @__PURE__ */ v(
    "div",
    {
      "data-chart": s,
      ref: o,
      className: S(
        "cv:flex cv:h-full cv:w-full cv:justify-center cv:text-xs cv:text-foreground cv:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground cv:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 cv:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border cv:[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border cv:[&_.recharts-radial-bar-background-sector]:fill-muted cv:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted cv:[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border cv:[&_.recharts-sector]:outline-none cv:[&_.recharts-sector[stroke='#fff']]:stroke-transparent cv:[&_.recharts-surface]:outline-none",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ i(Us, { id: s, config: a }),
        /* @__PURE__ */ i(Tr.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
ut.displayName = "ChartContainer";
const Us = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, a]) => a.theme || a.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Bs).map(
          ([a, r]) => `
${r} [data-chart=${e}] {
${n.map(([o, c]) => {
            var l;
            const s = ((l = c.theme) == null ? void 0 : l[a]) || c.color;
            return s ? `  ${qr(o)}: ${s};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, jt = Tr.Tooltip, _t = x.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: a = "dot",
    hideLabel: r = !1,
    hideIndicator: o = !1,
    label: c,
    labelFormatter: s,
    labelClassName: l,
    formatter: u,
    valueFormatter: m,
    color: f,
    nameKey: h,
    labelKey: y
  }, p) => {
    const { config: g } = Yo(), b = x.useMemo(() => {
      var L;
      if (r || !(t != null && t.length))
        return null;
      const [k] = t, C = `${y || (k == null ? void 0 : k.dataKey) || (k == null ? void 0 : k.name) || "value"}`, _ = xr(g, k, C), N = !y && typeof c == "string" ? ((L = g[c]) == null ? void 0 : L.label) || c : _ == null ? void 0 : _.label;
      return s ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: s(N, t) }) : N ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: N }) : null;
    }, [c, s, t, r, l, g, y]);
    if (!e || !(t != null && t.length))
      return null;
    const w = t.length === 1 && a !== "dot";
    return /* @__PURE__ */ v(
      "div",
      {
        ref: p,
        className: S(
          "cv:grid cv:min-w-32 cv:items-start cv:gap-1.5 cv:rounded-lg cv:border cv:border-border/40 cv:bg-background cv:px-3 cv:py-2 cv:text-xs cv:shadow-lg",
          n
        ),
        children: [
          w ? null : b,
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((k, C) => {
            var T;
            const _ = `${h || k.name || k.dataKey || "value"}`, N = xr(g, k, _), L = f || ((T = k.payload) == null ? void 0 : T.fill) || k.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  a === "dot" && "cv:items-center"
                ),
                children: u && (k == null ? void 0 : k.value) !== void 0 && k.name ? u(k.value, k.name, k, C, k.payload) : /* @__PURE__ */ v(ue, { children: [
                  N != null && N.icon ? /* @__PURE__ */ i(N.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: S(
                        "cv:shrink-0 cv:rounded-[2px] cv:border-[--color-border] cv:bg-[--color-bg]",
                        {
                          "cv:h-2.5 cv:w-2.5": a === "dot",
                          "cv:w-1": a === "line",
                          "cv:w-0 cv:border-[1.5px] cv:border-dashed cv:bg-transparent": a === "dashed",
                          "cv:my-0.5": w && a === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": L,
                        "--color-border": L
                      }
                    }
                  ),
                  /* @__PURE__ */ v(
                    "div",
                    {
                      className: S(
                        "cv:flex cv:flex-1 cv:justify-between cv:gap-4 cv:leading-none",
                        w ? "cv:items-end" : "cv:items-center"
                      ),
                      children: [
                        /* @__PURE__ */ v("div", { className: "cv:grid cv:gap-1.5", children: [
                          w ? b : null,
                          /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: (N == null ? void 0 : N.label) || k.name })
                        ] }),
                        k.value !== void 0 && /* @__PURE__ */ i("span", { className: "cv:font-mono cv:font-medium cv:tabular-nums cv:text-foreground", children: m ? m(k.value, k) : typeof k.value == "number" ? k.value.toLocaleString() : String(k.value) })
                      ]
                    }
                  )
                ] })
              },
              k.dataKey ? String(k.dataKey) : C
            );
          }) })
        ]
      }
    );
  }
);
_t.displayName = "ChartTooltipContent";
const Vt = Tr.Legend, Rt = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: a = "bottom", nameKey: r }, o) => {
    const { config: c } = Yo();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: S(
          "cv:flex cv:items-center cv:justify-center cv:gap-4",
          a === "top" ? "cv:pb-3" : "cv:pt-3",
          e
        ),
        children: n.map((s) => {
          const l = `${r || s.dataKey || "value"}`, u = xr(c, s, l);
          return /* @__PURE__ */ v(
            "div",
            {
              className: S(
                "cv:flex cv:items-center cv:gap-1.5 cv:[&>svg]:h-3 cv:[&>svg]:w-3 cv:[&>svg]:text-muted-foreground"
              ),
              children: [
                u != null && u.icon && !t ? /* @__PURE__ */ i(u.icon, {}) : /* @__PURE__ */ i(
                  "div",
                  {
                    className: "cv:h-2 cv:w-2 cv:shrink-0 cv:rounded-[2px]",
                    style: { backgroundColor: s.color }
                  }
                ),
                (u == null ? void 0 : u.label) ?? s.value
              ]
            },
            s.value ?? l
          );
        })
      }
    ) : null;
  }
);
Rt.displayName = "ChartLegendContent";
function xr(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const a = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let r = n;
  return n in t && typeof t[n] == "string" ? r = t[n] : a && n in a && typeof a[n] == "string" && (r = a[n]), r in e ? e[r] : e[n];
}
function Br(e) {
  return e.categories.map((t, n) => {
    const a = { __cat: typeof t == "number" ? t : String(t) };
    for (const r of e.series) a[r.key] = r.data[n] ?? null;
    return a;
  });
}
function qt(e) {
  return e === "top" ? "top" : "bottom";
}
function Kt(e) {
  return "horizontal";
}
function Wt(e) {
  return "center";
}
function Me(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function qe(e) {
  return e == null ? void 0 : e.domain;
}
function Ke(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Gs(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function on(e) {
  return `var(${qr(e.key)})`;
}
function Ys(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Qo(e) {
  return e === "stacked" || e === "percent";
}
function Wn(e, t) {
  var s, l, u, m, f, h, y, p, g, b, w, k, C, _;
  const n = e.raw.annotation, a = (N) => {
    var L, T, I, q, A, O;
    if (N)
      return ((L = n == null ? void 0 : n.measures[N]) == null ? void 0 : L.shortTitle) ?? ((T = n == null ? void 0 : n.dimensions[N]) == null ? void 0 : T.shortTitle) ?? ((I = n == null ? void 0 : n.timeDimensions[N]) == null ? void 0 : I.shortTitle) ?? ((q = n == null ? void 0 : n.measures[N]) == null ? void 0 : q.title) ?? ((A = n == null ? void 0 : n.dimensions[N]) == null ? void 0 : A.title) ?? ((O = n == null ? void 0 : n.timeDimensions[N]) == null ? void 0 : O.title) ?? N;
  }, r = e.series.find((N) => {
    var L;
    return (((L = N.meta) == null ? void 0 : L.axis) ?? "left") !== "right";
  }), o = e.series.find((N) => {
    var L;
    return ((L = N.meta) == null ? void 0 : L.axis) === "right";
  }), c = (N) => {
    var L;
    return N ? (L = N.meta) != null && L.measure ? a(N.meta.measure) : N.label : void 0;
  };
  return {
    x: (l = (s = t.axes) == null ? void 0 : s.x) != null && l.labelHide ? void 0 : ((m = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : m.label) ?? a((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (p = (y = t.axes) == null ? void 0 : y.y) != null && p.labelHide ? void 0 : ((b = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : b.label) ?? c(r),
    right: (k = (w = t.axes) == null ? void 0 : w.y2) != null && k.labelHide ? void 0 : ((_ = (C = t.axes) == null ? void 0 : C.y2) == null ? void 0 : _.label) ?? c(o)
  };
}
function at(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Ur(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function pn(e, t, n) {
  return (a, r) => {
    const o = r == null ? void 0 : r.dataKey, c = typeof o == "string" || typeof o == "number" ? String(o) : void 0, s = (c ? n == null ? void 0 : n.get(c) : void 0) ?? t ?? c;
    return e.value(a, s, "tooltip");
  };
}
function Gr(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function wr(e) {
  return (t, n) => {
    const a = typeof t == "number" ? t : Number(t), r = n == null ? void 0 : n.payload;
    let o = 0;
    if (r)
      for (const [c, s] of Object.entries(r)) {
        if (c === "__cat") continue;
        const l = typeof s == "number" ? s : Number(s);
        Number.isFinite(l) && (o += l);
      }
    return !Number.isFinite(a) || !Number.isFinite(o) || o === 0 ? "" : Gr(a / o, e);
  };
}
function Qs({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var A, O, z, R, D, Q, Z, ee, P, W, H, B, re, de, U, E;
  const o = t.familyOptions ?? {}, c = t.orientation === "horizontal", s = Qo(t.stackMode), l = t.stackMode === "percent", u = Br(e), m = (V, J, ae = "value") => l ? Gr(V) : a.value(V, J, ae), f = (V) => {
    if (l) {
      const J = wr();
      return ((ae, he) => J(typeof ae == "boolean" ? Number(ae) : ae, he));
    }
    return ((J) => m(typeof J == "boolean" ? Number(J) : J, at(V), "label"));
  }, h = (V) => a.category(V), y = Ur(e), p = at(e.series[0]), g = c ? (O = (A = t.axes) == null ? void 0 : A.y) == null ? void 0 : O.hide : (R = (z = t.axes) == null ? void 0 : z.x) == null ? void 0 : R.hide, b = c ? (D = t.axes) == null ? void 0 : D.x : (Q = t.axes) == null ? void 0 : Q.y, w = !c && e.series.some((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) === "right";
  }), k = at(e.series.find((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) !== "right";
  })) ?? p, C = at(e.series.find((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) === "right";
  })), _ = Wn(e, t), N = _.x ? { value: _.x, position: "insideBottom", offset: -2 } : void 0, L = _.x ? { value: _.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, T = _.left ? { value: _.left, position: "insideBottom", offset: -2 } : void 0, I = _.left ? { value: _.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, q = _.right ? { value: _.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(ut, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    Ui,
    {
      accessibilityLayer: !0,
      data: u,
      layout: c ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(dn, { vertical: c, horizontal: !c }),
        c ? /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ i(
            Qe,
            {
              type: "category",
              dataKey: "__cat",
              hide: g,
              tickFormatter: h,
              label: L
            }
          ),
          /* @__PURE__ */ i(
            Dt,
            {
              type: "number",
              hide: b == null ? void 0 : b.hide,
              scale: Ke(b),
              domain: qe(b),
              tickFormatter: (V) => m(V, p, "axis"),
              label: T
            }
          )
        ] }) : /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ i(
            Dt,
            {
              type: "category",
              dataKey: "__cat",
              hide: g,
              tickFormatter: h,
              label: N
            }
          ),
          /* @__PURE__ */ i(
            Qe,
            {
              yAxisId: "left",
              type: "number",
              hide: b == null ? void 0 : b.hide,
              scale: Ke(b),
              domain: qe(b),
              tickFormatter: (V) => m(V, k, "axis"),
              label: I
            }
          ),
          w && /* @__PURE__ */ i(
            Qe,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (ee = (Z = t.axes) == null ? void 0 : Z.y2) == null ? void 0 : ee.hide,
              scale: Ke((P = t.axes) == null ? void 0 : P.y2),
              domain: qe((W = t.axes) == null ? void 0 : W.y2),
              tickFormatter: (V) => m(V, C, "axis"),
              label: q
            }
          )
        ] }),
        ((H = t.tooltip) == null ? void 0 : H.show) !== !1 && /* @__PURE__ */ i(
          jt,
          {
            content: /* @__PURE__ */ i(
              _t,
              {
                labelFormatter: (V) => a.category(V),
                indicator: ((B = t.tooltip) == null ? void 0 : B.indicator) ?? "dot",
                valueFormatter: l ? wr() : pn(a, void 0, y)
              }
            )
          }
        ),
        Me(t).show && /* @__PURE__ */ i(
          Vt,
          {
            content: /* @__PURE__ */ i(Rt, { className: Me(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: qt((re = t.legend) == null ? void 0 : re.position),
            layout: Kt((de = t.legend) == null ? void 0 : de.position),
            align: Wt((U = t.legend) == null ? void 0 : U.position)
          }
        ),
        e.series.map((V) => {
          var J, ae, he, ke;
          return /* @__PURE__ */ i(
            vo,
            {
              yAxisId: c ? void 0 : ((J = V.meta) == null ? void 0 : J.axis) === "right" && w ? "right" : "left",
              dataKey: V.key,
              name: V.label,
              stackId: s ? (ae = V.meta) != null && ae.companion ? "__prev" : ((he = V.meta) == null ? void 0 : he.stackId) ?? "stack" : void 0,
              fill: on(V),
              fillOpacity: (ke = V.meta) != null && ke.companion ? 0.4 : void 0,
              radius: Gs(o.barRadius, c),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                fo,
                {
                  dataKey: V.key,
                  position: c ? "right" : "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: f(V)
                }
              )
            },
            V.key
          );
        }),
        (E = o.referenceLines) == null ? void 0 : E.map((V, J) => {
          var je;
          const ae = V.axis === "y" !== c, he = c ? void 0 : "left";
          if (ae) {
            const G = c ? { x: V.value } : { y: V.value };
            return /* @__PURE__ */ i(
              ct,
              {
                yAxisId: he,
                ...G,
                label: V.label,
                stroke: `var(--${V.colorToken ?? "muted-foreground"})`,
                strokeDasharray: "4 4"
              },
              J
            );
          }
          const ke = (je = u[V.value]) == null ? void 0 : je.__cat;
          return ke == null ? null : /* @__PURE__ */ i(
            ct,
            {
              yAxisId: he,
              ...c ? { y: ke } : { x: ke },
              label: V.label,
              stroke: `var(--${V.colorToken ?? "muted-foreground"})`,
              strokeDasharray: "4 4"
            },
            J
          );
        })
      ]
    }
  ) });
}
function Js({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var k, C, _, N, L, T, I, q, A, O, z, R, D, Q, Z, ee;
  const o = t.familyOptions ?? {}, c = o.chrome === "none", s = Br(e), l = (P) => a.category(P), u = e.series.some((P) => {
    var W;
    return ((W = P.meta) == null ? void 0 : W.axis) === "right";
  }), m = o.curve ?? "monotone", f = Ur(e), h = at(e.series.find((P) => {
    var W;
    return ((W = P.meta) == null ? void 0 : W.axis) !== "right";
  })), y = at(e.series.find((P) => {
    var W;
    return ((W = P.meta) == null ? void 0 : W.axis) === "right";
  })), p = Wn(e, t), g = s.length <= 1, b = !c && (o.dots === !0 || g), w = !c;
  return /* @__PURE__ */ i(
    ut,
    {
      config: n,
      className: c ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(Gi, { accessibilityLayer: !0, data: s, margin: c ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !c && /* @__PURE__ */ i(dn, { vertical: !1 }),
        /* @__PURE__ */ i(
          Dt,
          {
            type: "category",
            dataKey: "__cat",
            hide: c || ((C = (k = t.axes) == null ? void 0 : k.x) == null ? void 0 : C.hide),
            tickFormatter: l,
            label: !c && p.x ? { value: p.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            yAxisId: "left",
            type: "number",
            hide: c || ((N = (_ = t.axes) == null ? void 0 : _.y) == null ? void 0 : N.hide),
            scale: Ke((L = t.axes) == null ? void 0 : L.y),
            domain: qe((T = t.axes) == null ? void 0 : T.y),
            tickFormatter: (P) => a.value(P, h, "axis"),
            label: !c && p.left ? { value: p.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Qe,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: c || ((q = (I = t.axes) == null ? void 0 : I.y2) == null ? void 0 : q.hide),
            scale: Ke((A = t.axes) == null ? void 0 : A.y2),
            domain: qe((O = t.axes) == null ? void 0 : O.y2),
            tickFormatter: (P) => a.value(P, y, "axis"),
            label: !c && p.right ? { value: p.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !c && ((z = t.tooltip) == null ? void 0 : z.show) !== !1 && /* @__PURE__ */ i(
          jt,
          {
            content: /* @__PURE__ */ i(
              _t,
              {
                labelFormatter: (P) => a.category(P),
                indicator: ((R = t.tooltip) == null ? void 0 : R.indicator) ?? "line",
                valueFormatter: pn(a, void 0, f)
              }
            )
          }
        ),
        !c && Me(t).show && /* @__PURE__ */ i(
          Vt,
          {
            content: /* @__PURE__ */ i(Rt, { className: Me(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: qt((D = t.legend) == null ? void 0 : D.position),
            layout: Kt((Q = t.legend) == null ? void 0 : Q.position),
            align: Wt((Z = t.legend) == null ? void 0 : Z.position)
          }
        ),
        e.series.map((P) => {
          var W, H, B, re, de, U;
          return /* @__PURE__ */ i(
            ho,
            {
              yAxisId: u && ((W = P.meta) == null ? void 0 : W.axis) === "right" ? "right" : "left",
              type: ((H = P.meta) == null ? void 0 : H.curve) ?? m,
              dataKey: P.key,
              name: P.label,
              stroke: on(P),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (B = P.meta) != null && B.companion ? "5 4" : void 0,
              strokeOpacity: (re = P.meta) != null && re.companion ? 0.55 : void 0,
              dot: c || (de = P.meta) != null && de.companion ? !1 : ((U = P.meta) == null ? void 0 : U.dots) ?? b,
              activeDot: w,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !c,
              children: !c && o.showValueLabels && /* @__PURE__ */ i(
                fo,
                {
                  dataKey: P.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (E) => a.value(typeof E == "boolean" ? Number(E) : E, at(P), "label")
                }
              )
            },
            P.key
          );
        }),
        !c && ((ee = o.referenceLines) == null ? void 0 : ee.map((P, W) => {
          var H;
          if (P.axis === "x") {
            const B = (H = s[P.value]) == null ? void 0 : H.__cat;
            return B == null ? null : /* @__PURE__ */ i(
              ct,
              {
                yAxisId: "left",
                x: B,
                label: P.label,
                stroke: `var(--${P.colorToken ?? "muted-foreground"})`,
                strokeDasharray: "4 4"
              },
              W
            );
          }
          return /* @__PURE__ */ i(
            ct,
            {
              yAxisId: "left",
              y: P.value,
              label: P.label,
              stroke: `var(--${P.colorToken ?? "muted-foreground"})`,
              strokeDasharray: "4 4"
            },
            W
          );
        }))
      ] })
    }
  );
}
function Xs({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var b, w, k, C, _, N, L, T, I, q, A, O, z, R;
  const o = t.familyOptions ?? {}, c = ((w = (b = t.mapping) == null ? void 0 : b.series) == null ? void 0 : w.mode) === "pivot", s = t.stackMode ?? (c ? "stacked" : "none"), l = Qo(s), u = s === "percent", m = Br(e), f = (D) => a.category(D), h = o.curve ?? "monotone", y = Ur(e), p = at(e.series[0]), g = Wn(e, t);
  return /* @__PURE__ */ i(ut, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(po, { accessibilityLayer: !0, data: m, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(dn, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((D) => /* @__PURE__ */ v("linearGradient", { id: `fill-${D.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: on(D), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: on(D), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, D.key)) }),
    /* @__PURE__ */ i(
      Dt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (C = (k = t.axes) == null ? void 0 : k.x) == null ? void 0 : C.hide,
        tickFormatter: f,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Qe,
      {
        type: "number",
        hide: (N = (_ = t.axes) == null ? void 0 : _.y) == null ? void 0 : N.hide,
        scale: Ke((L = t.axes) == null ? void 0 : L.y),
        domain: qe((T = t.axes) == null ? void 0 : T.y),
        tickFormatter: (D) => u ? Gr(D) : a.value(D, p, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((I = t.tooltip) == null ? void 0 : I.show) !== !1 && /* @__PURE__ */ i(
      jt,
      {
        content: /* @__PURE__ */ i(
          _t,
          {
            labelFormatter: (D) => a.category(D),
            indicator: ((q = t.tooltip) == null ? void 0 : q.indicator) ?? "dot",
            valueFormatter: u ? wr() : pn(a, void 0, y)
          }
        )
      }
    ),
    Me(t).show && /* @__PURE__ */ i(
      Vt,
      {
        content: /* @__PURE__ */ i(Rt, { className: Me(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: qt((A = t.legend) == null ? void 0 : A.position),
        layout: Kt((O = t.legend) == null ? void 0 : O.position),
        align: Wt((z = t.legend) == null ? void 0 : z.position)
      }
    ),
    e.series.map((D) => {
      var Q, Z, ee, P, W, H, B, re, de;
      return u && ((Q = D.meta) != null && Q.companion) ? null : /* @__PURE__ */ i(
        zr,
        {
          type: ((Z = D.meta) == null ? void 0 : Z.curve) ?? h,
          dataKey: D.key,
          name: D.label,
          stackId: l && !((ee = D.meta) != null && ee.companion) ? ((P = D.meta) == null ? void 0 : P.stackId) ?? "stack" : void 0,
          stroke: on(D),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (W = D.meta) != null && W.companion ? "5 4" : void 0,
          strokeOpacity: (H = D.meta) != null && H.companion ? 0.55 : void 0,
          fill: (B = D.meta) != null && B.companion ? "none" : `url(#fill-${D.key})`,
          fillOpacity: 1,
          dot: (re = D.meta) != null && re.companion ? !1 : ((de = D.meta) == null ? void 0 : de.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        D.key
      );
    }),
    (R = o.referenceLines) == null ? void 0 : R.map((D, Q) => {
      var Z;
      if (D.axis === "x") {
        const ee = (Z = m[D.value]) == null ? void 0 : Z.__cat;
        return ee == null ? null : /* @__PURE__ */ i(
          ct,
          {
            x: ee,
            label: D.label,
            stroke: `var(--${D.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Q
        );
      }
      return /* @__PURE__ */ i(
        ct,
        {
          y: D.value,
          label: D.label,
          stroke: `var(--${D.colorToken ?? "muted-foreground"})`,
          strokeDasharray: "4 4"
        },
        Q
      );
    })
  ] }) });
}
function Zs({ data: e, options: t, format: n, editing: a }) {
  var g, b, w, k, C;
  const r = t.familyOptions ?? {}, o = e.series[0], c = e.categories.map((_, N) => {
    const L = n.category(_);
    return {
      key: `slice-${N}`,
      label: L,
      value: (o == null ? void 0 : o.data[N]) ?? 0,
      fill: `var(--${Ne[N % Ne.length]})`
    };
  }), s = el(c, r.maxSlices), l = s.reduce((_, N) => _ + N.value, 0);
  if (s.some((_) => _.value < 0))
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "Pie charts can't show negative values" });
  if (s.length === 0 || l <= 0)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const u = {};
  s.forEach((_, N) => {
    u[_.key] = {
      label: _.label,
      color: `var(--${Ne[N % Ne.length]})`
    };
  });
  const m = `${r.innerRadiusPct ?? 0}%`, f = `${r.outerRadiusPct ?? 80}%`, h = (r.innerRadiusPct ?? 0) > 0, y = r.showLabels ?? "percent", p = y === "none" ? !1 : ({ payload: _, percent: N }) => {
    const L = _;
    return y === "name" ? (L == null ? void 0 : L.label) ?? "" : y === "value" ? n.value(L == null ? void 0 : L.value, o == null ? void 0 : o.key, "label") : `${((N !== void 0 ? N : L && l > 0 ? L.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(ut, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(Yi, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      jt,
      {
        content: /* @__PURE__ */ i(
          _t,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((b = t.tooltip) == null ? void 0 : b.indicator) ?? "dot",
            valueFormatter: pn(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ v(
      Qi,
      {
        data: s,
        dataKey: "value",
        nameKey: "label",
        innerRadius: m,
        outerRadius: f,
        paddingAngle: r.padAngle,
        cornerRadius: r.cornerRadius,
        label: p,
        labelLine: y !== "none" && !h,
        isAnimationActive: !1,
        children: [
          s.map((_) => /* @__PURE__ */ i(go, { fill: _.fill }, _.key)),
          h && r.centerLabel && /* @__PURE__ */ i(
            Ji,
            {
              position: "center",
              content: ({ viewBox: _ }) => {
                var I, q;
                if (!_ || !("cx" in _)) return null;
                const { cx: N, cy: L } = _, T = ((I = r.centerLabel) == null ? void 0 : I.value) === void 0 || r.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : r.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: N, y: L, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: N, y: L, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: T }),
                  ((q = r.centerLabel) == null ? void 0 : q.label) && /* @__PURE__ */ i("tspan", { x: N, y: L + 20, className: "cv:fill-muted-foreground cv:text-xs", children: r.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    Me(t).show && /* @__PURE__ */ i(
      Vt,
      {
        content: /* @__PURE__ */ i(
          Rt,
          {
            nameKey: "label",
            className: Me(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: qt((w = t.legend) == null ? void 0 : w.position),
        layout: Kt((k = t.legend) == null ? void 0 : k.position),
        align: Wt((C = t.legend) == null ? void 0 : C.position)
      }
    )
  ] }) });
}
function el(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((s, l) => l.value - s.value), a = n.slice(0, t - 1), o = n.slice(t - 1).reduce((s, l) => s + l.value, 0), c = t - 1;
  return [
    ...a,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${Ne[c % Ne.length]})`
    }
  ];
}
function tl({ data: e, options: t, format: n, editing: a }) {
  var p, g, b, w, k, C, _, N, L, T, I, q, A, O, z, R, D, Q, Z, ee, P, W, H, B, re, de;
  const r = t.familyOptions ?? {}, o = e.raw.annotation, c = e.raw.rows;
  if (!r.x || !r.y)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const s = { x: r.x, y: r.y, z: r.size }, l = ((p = o == null ? void 0 : o.measures[r.x]) == null ? void 0 : p.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[r.x]) == null ? void 0 : g.shortTitle) ?? r.x, u = ((b = o == null ? void 0 : o.measures[r.y]) == null ? void 0 : b.shortTitle) ?? ((w = o == null ? void 0 : o.dimensions[r.y]) == null ? void 0 : w.shortTitle) ?? r.y, m = (C = (k = t.axes) == null ? void 0 : k.x) != null && C.labelHide ? void 0 : ((N = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : N.label) ?? l, f = (T = (L = t.axes) == null ? void 0 : L.y) != null && T.labelHide ? void 0 : ((q = (I = t.axes) == null ? void 0 : I.y) == null ? void 0 : q.label) ?? u, h = nl(c, r);
  if (!h.some((U) => U.points.some((E) => Number.isFinite(E.x) && Number.isFinite(E.y))))
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const y = {};
  return h.forEach((U, E) => {
    y[U.key] = { label: U.label, color: `var(--${Ne[E % Ne.length]})` };
  }), /* @__PURE__ */ i(ut, { config: y, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Xi, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(dn, {}),
    /* @__PURE__ */ i(
      Dt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: (O = (A = t.axes) == null ? void 0 : A.x) == null ? void 0 : O.hide,
        scale: Ke((z = t.axes) == null ? void 0 : z.x),
        domain: qe((R = t.axes) == null ? void 0 : R.x),
        tickFormatter: (U) => n.value(U, r.x, "axis"),
        label: m ? { value: m, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Qe,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (Q = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : Q.hide,
        scale: Ke((Z = t.axes) == null ? void 0 : Z.y),
        domain: qe((ee = t.axes) == null ? void 0 : ee.y),
        tickFormatter: (U) => n.value(U, r.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    r.size && /* @__PURE__ */ i(Zi, { type: "number", dataKey: "z", range: r.sizeRange ?? [40, 400], name: r.size }),
    ((P = t.tooltip) == null ? void 0 : P.show) !== !1 && /* @__PURE__ */ i(
      jt,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          _t,
          {
            indicator: ((W = t.tooltip) == null ? void 0 : W.indicator) ?? "dot",
            valueFormatter: (U, E) => {
              const V = E == null ? void 0 : E.dataKey, J = typeof V == "string" ? s[V] : void 0;
              return n.value(U, J, "tooltip");
            }
          }
        )
      }
    ),
    Me(t).show && h.length > 1 && /* @__PURE__ */ i(
      Vt,
      {
        content: /* @__PURE__ */ i(Rt, { className: Me(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: qt((H = t.legend) == null ? void 0 : H.position),
        layout: Kt((B = t.legend) == null ? void 0 : B.position),
        align: Wt((re = t.legend) == null ? void 0 : re.position)
      }
    ),
    h.map((U, E) => /* @__PURE__ */ i(
      ec,
      {
        name: U.label,
        data: U.points,
        shape: r.shape ?? "circle",
        fill: `var(--color-${U.key})`,
        children: h.length === 1 && U.points.map((V, J) => /* @__PURE__ */ i(go, { fill: `var(--${Ne[E % Ne.length]})` }, J))
      },
      U.key
    )),
    (de = r.referenceLines) == null ? void 0 : de.map((U, E) => /* @__PURE__ */ i(
      ct,
      {
        ...U.axis === "y" ? { y: U.value } : { x: U.value },
        label: U.label,
        stroke: `var(--${U.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      E
    ))
  ] }) });
}
function nl(e, t) {
  const n = (r) => ({
    x: rr(r[t.x]),
    y: rr(r[t.y]),
    ...t.size ? { z: rr(r[t.size]) } : {}
  });
  if (!t.groupBy)
    return [{ key: "series-0", label: "Points", points: e.map(n) }];
  const a = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = String(r[t.groupBy] ?? "—"), c = a.get(o) ?? [];
    c.push(n(r)), a.set(o, c);
  }
  return [...a.entries()].map(([r, o], c) => ({
    key: `series-${c}`,
    label: r,
    points: o
  }));
}
function rr(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function rl(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function al(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function ol(e) {
  var l, u, m, f;
  const { data: t, options: n, format: a } = e, r = n.familyOptions ?? {}, o = (h) => a.value(h, r.measure, "kpi"), c = Jo([t.raw.rows[0] ?? {}], r.measure), s = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[r.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[r.measure]) == null ? void 0 : f.title) ?? r.measure;
  return r.display === "gauge" ? /* @__PURE__ */ i(vl, { value: c, label: s, fmt: o, fo: r }) : /* @__PURE__ */ i(il, { ...e, value: c, label: s, fo: r, fmt: o });
}
function il({
  data: e,
  value: t,
  fo: n,
  fmt: a
}) {
  var h;
  const r = n.goodDirection ?? ((h = n.comparison) == null ? void 0 : h.goodDirection) ?? "up", o = t === null ? null : hl(e.raw.rows, t, n), c = !!n.comparison, s = c && !o && cl(e.raw.query, n), l = n.sparkline ? e.series[0] : void 0, u = !!l && l.data.some((y) => y !== null), m = o ? o.diff : l ? ml(l) : 0, f = al(rl(m, r));
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", style: { containerType: "size" }, children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:flex-col cv:items-center cv:justify-center cv:gap-1.5 cv:overflow-hidden cv:px-3 cv:text-center", children: [
      /* @__PURE__ */ i(
        "span",
        {
          className: S(
            "cv:max-w-full cv:font-bold cv:leading-none cv:tabular-nums",
            t === null ? "cv:text-muted-foreground" : "cv:text-foreground"
          ),
          style: { fontSize: "clamp(1.25rem, min(16cqw, 30cqh), 3.5rem)", whiteSpace: "nowrap" },
          children: t === null ? "—" : a(t)
        }
      ),
      c && (o ? /* @__PURE__ */ i(dl, { delta: o, goodDirection: r, fo: n, fmt: a }) : s ? /* @__PURE__ */ i(sl, {}) : /* @__PURE__ */ i(ll, {}))
    ] }),
    u && /* @__PURE__ */ i("div", { className: "cv:shrink-0 cv:px-1 cv:pb-1", children: /* @__PURE__ */ i(ul, { series: l, categories: e.categories, colorClass: f }) })
  ] });
}
function cl(e, t) {
  var a, r, o;
  if (((a = t.comparison) == null ? void 0 : a.mode) !== "previousPeriod") return !1;
  const n = (o = (r = e.timeDimensions) == null ? void 0 : r[0]) == null ? void 0 : o.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((c) => !c) : String(n).trim() === "";
}
function sl() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-amber-500/10 cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-amber-600",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ i(ko, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "set a date range to compare" })
      ]
    }
  );
}
function ll() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-muted cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-muted-foreground",
      title: "No data in the comparison period",
      children: [
        /* @__PURE__ */ i(wo, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "no prior data" })
      ]
    }
  );
}
function ul({
  series: e,
  categories: t,
  colorClass: n
}) {
  const a = bo(), r = t.map((o, c) => ({ x: typeof o == "number" ? o : String(o), v: e.data[c] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(ac, { width: "100%", height: "100%", children: /* @__PURE__ */ v(po, { data: r, margin: { top: 3, right: 0, bottom: 0, left: 0 }, children: [
    /* @__PURE__ */ i("defs", { children: /* @__PURE__ */ v("linearGradient", { id: a, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "0%", stopColor: "currentColor", stopOpacity: 0.28 }),
      /* @__PURE__ */ i("stop", { offset: "100%", stopColor: "currentColor", stopOpacity: 0.02 })
    ] }) }),
    /* @__PURE__ */ i(
      zr,
      {
        dataKey: "v",
        type: "monotone",
        stroke: "currentColor",
        strokeWidth: 1.75,
        fill: `url(#${a})`,
        dot: !1,
        isAnimationActive: !1,
        connectNulls: !0
      }
    )
  ] }) }) });
}
function ml(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function dl({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = e.diff > 0, o = e.diff === 0, c = o ? !0 : r === (t === "up"), s = o ? wo : r ? $n : In, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${a(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: S(
        "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:px-2 cv:py-0.5 cv:text-sm cv:font-semibold cv:leading-none cv:tabular-nums",
        o ? "cv:bg-muted cv:text-muted-foreground" : c ? "cv:bg-emerald-500/10 cv:text-emerald-600" : "cv:bg-destructive/10 cv:text-destructive"
      ),
      title: `vs prior period: ${e.diff > 0 ? "+" : ""}${a(e.diff)}`,
      children: [
        /* @__PURE__ */ i(s, { className: "cv:size-3.5 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: l })
      ]
    }
  );
}
function vl({
  value: e,
  label: t,
  fmt: n,
  fo: a
}) {
  var f, h;
  const r = ((f = a.gauge) == null ? void 0 : f.min) ?? 0, o = ((h = a.gauge) == null ? void 0 : h.max) ?? Math.max(e ?? 0, 1), c = o > r ? o : r + 1, s = e === null ? r : Math.max(r, Math.min(c, e)), l = (e === null ? void 0 : fl(e, a)) ?? "chart-1", u = [{ name: t, value: s, fill: `var(--${l})` }], m = { value: { label: t, color: `var(--${l})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(ut, { config: m, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      tc,
      {
        data: u,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(nc, { type: "number", domain: [r, c], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(rc, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ v("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center", children: [
      /* @__PURE__ */ i(
        "span",
        {
          className: S(
            "cv:text-2xl cv:font-bold cv:tabular-nums",
            e === null ? "cv:text-muted-foreground" : "cv:text-foreground"
          ),
          children: e === null ? "—" : n(e)
        }
      ),
      /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t })
    ] })
  ] });
}
function fl(e, t) {
  var r;
  const n = (r = t.gauge) == null ? void 0 : r.thresholds;
  if (!(n != null && n.length)) return;
  let a;
  for (const o of [...n].sort((c, s) => c.at - s.at))
    e >= o.at && (a = o.colorToken);
  return a;
}
function Jo(e, t) {
  for (const n of e) {
    const a = Xo(n[t]);
    if (a !== null) return a;
  }
  return null;
}
function hl(e, t, n) {
  const a = n.comparison;
  if (!a) return null;
  let r = null;
  if (a.mode === "value")
    typeof a.value == "number" ? r = a.value : typeof a.value == "string" && (r = Jo(e, a.value));
  else {
    const s = e[1];
    r = s ? Xo(s[n.measure]) : null;
  }
  if (r === null) return null;
  const o = t - r, c = r !== 0 ? o / r : null;
  return { current: t, baseline: r, diff: o, pct: c };
}
function Xo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Zo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
Zo.displayName = "Table";
const ei = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
ei.displayName = "TableHeader";
const ti = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
ti.displayName = "TableBody";
const xn = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: S(
        "cv:border-b cv:border-border cv:transition-colors cv:hover:bg-muted/50 cv:data-[state=selected]:bg-muted",
        e
      ),
      ...t
    }
  )
);
xn.displayName = "TableRow";
const kr = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: S(
      "cv:h-10 cv:px-2 cv:text-left cv:align-middle cv:font-medium cv:text-muted-foreground cv:[&:has([role=checkbox])]:pr-0",
      e
    ),
    ...t
  }
));
kr.displayName = "TableHead";
const wn = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
wn.displayName = "TableCell";
const pl = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
pl.displayName = "TableCaption";
const ni = jr(
  // `transition` + `active:scale` give every button a tactile press response (it visibly
  // reacts when clicked); disabled buttons have pointer-events-none so they never animate.
  "cv:inline-flex cv:items-center cv:justify-center cv:gap-2 cv:whitespace-nowrap cv:rounded-md cv:text-sm cv:font-medium cv:transition cv:duration-100 cv:active:scale-[0.97] cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:pointer-events-none cv:disabled:opacity-50 cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cv:bg-primary cv:text-primary-foreground cv:shadow cv:hover:bg-primary/90",
        secondary: "cv:bg-secondary cv:text-secondary-foreground cv:shadow-sm cv:hover:bg-secondary/80",
        outline: "cv:border cv:border-input cv:bg-background cv:text-foreground cv:shadow-sm cv:hover:bg-accent cv:hover:text-accent-foreground",
        ghost: "cv:text-foreground cv:hover:bg-accent cv:hover:text-accent-foreground",
        destructive: "cv:bg-destructive cv:text-destructive-foreground cv:shadow-sm cv:hover:bg-destructive/90"
      },
      size: {
        sm: "cv:h-8 cv:rounded-md cv:px-3 cv:text-xs",
        default: "cv:h-9 cv:px-4 cv:py-2",
        lg: "cv:h-10 cv:rounded-md cv:px-8",
        icon: "cv:size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Y = x.forwardRef(
  ({ className: e, variant: t, size: n, type: a, ...r }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: a ?? "button",
      className: S(ni({ variant: t, size: n }), e),
      ...r
    }
  )
);
Y.displayName = "Button";
function gl({ data: e, options: t, format: n }) {
  const a = t.familyOptions ?? {}, r = e.raw.rows, o = e.raw.annotation, c = x.useMemo(
    () => bl(r, o, a, n),
    [r, o, a, n]
  ), [s, l] = x.useState(null), [u, m] = x.useState(0), f = a.sortable !== !1, h = a.pageSize ?? 25, y = x.useMemo(() => {
    if (!s) return r;
    const C = s.dir === "asc" ? 1 : -1;
    return [...r].sort((_, N) => Cl(_[s.member], N[s.member]) * C);
  }, [r, s]), p = Math.max(1, Math.ceil(y.length / h)), g = Math.min(u, p - 1), b = y.slice(g * h, g * h + h), w = (C) => {
    f && (l(
      (_) => (_ == null ? void 0 : _.member) === C ? { member: C, dir: _.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), m(0));
  }, k = a.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", a.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(Zo, { children: [
      /* @__PURE__ */ i(ei, { className: S(a.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(xn, { children: [
        a.showRowNumbers && /* @__PURE__ */ i(kr, { className: "cv:w-10 cv:text-right", children: "#" }),
        c.map((C) => /* @__PURE__ */ i(
          kr,
          {
            className: La(C.align),
            style: C.width ? { width: C.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              Y,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => w(C.member),
                children: [
                  C.label,
                  /* @__PURE__ */ i(kl, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : C.label
          },
          C.member
        ))
      ] }) }),
      /* @__PURE__ */ v(ti, { children: [
        b.map((C, _) => /* @__PURE__ */ v(xn, { children: [
          a.showRowNumbers && /* @__PURE__ */ i(wn, { className: S("cv:text-right cv:text-muted-foreground", k && "cv:py-1"), children: g * h + _ + 1 }),
          c.map((N) => {
            const L = Nl(N.member, C[N.member], a.conditionalFormat);
            return /* @__PURE__ */ i(
              wn,
              {
                className: S(La(N.align), k && "cv:py-1"),
                style: L ? { color: L } : void 0,
                children: N.render(C[N.member])
              },
              N.member
            );
          })
        ] }, _)),
        b.length === 0 && /* @__PURE__ */ i(xn, { children: /* @__PURE__ */ i(
          wn,
          {
            colSpan: c.length + (a.showRowNumbers ? 1 : 0),
            className: "cv:h-24 cv:text-center cv:text-muted-foreground",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    y.length > h && /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2 cv:px-2 cv:py-2 cv:text-sm cv:text-muted-foreground", children: [
      /* @__PURE__ */ v("span", { children: [
        g * h + 1,
        "–",
        Math.min((g + 1) * h, y.length),
        " of",
        " ",
        y.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:gap-2", children: [
        /* @__PURE__ */ i(
          Y,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((C) => Math.max(0, C - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          Y,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((C) => Math.min(p - 1, C + 1)),
            disabled: g >= p - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function bl(e, t, n, a) {
  var c;
  const r = e.length > 0 ? Object.keys(e[0]) : xl(t);
  return ((c = n.columns) != null && c.length ? n.columns : r.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const l = s.member, u = t ? wl(t, l) : void 0, m = t ? l in t.measures : !1, f = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = s.align ?? (m ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: s.width,
      render: (y) => yl(y, m, l, a)
    };
  });
}
function yl(e, t, n, a) {
  if (e == null || e === "") return "—";
  if (t) {
    const r = typeof e == "number" ? e : Number(e);
    return Number.isFinite(r) ? a.value(r, n) : String(e);
  }
  return a.category(e);
}
function xl(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function wl(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function La(e) {
  return e === "right" ? "cv:text-right" : e === "center" ? "cv:text-center" : "cv:text-left";
}
function kl({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i($n, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(In, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(uc, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function Cl(e, t) {
  const n = typeof e == "number" ? e : Number(e), a = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(a) ? n - a : String(e ?? "").localeCompare(String(t ?? ""));
}
function Nl(e, t, n) {
  if (!(n != null && n.length)) return;
  const a = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(a)) {
    for (const r of n)
      if (r.member === e && Sl(a, r.when.op, r.when.value))
        return `var(--${r.colorToken ?? "chart-1"})`;
  }
}
function Sl(e, t, n) {
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
function _l({ data: e, options: t, format: n, editing: a }) {
  var g, b, w, k, C, _, N, L, T, I, q, A, O, z, R, D, Q, Z, ee, P, W, H, B, re, de, U;
  const r = t.familyOptions ?? {}, o = r.series ?? [], c = Al(e, o), s = (E) => n.category(E), l = o.some((E) => E.axis === "right"), u = (g = o.find((E) => E.axis !== "right")) == null ? void 0 : g.member, m = (b = o.find((E) => E.axis === "right")) == null ? void 0 : b.member, f = Wn(e, t), h = (k = (w = t.axes) == null ? void 0 : w.y) != null && k.labelHide ? void 0 : ((_ = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : _.label) ?? (u ? kn(e, u) : void 0), y = (L = (N = t.axes) == null ? void 0 : N.y2) != null && L.labelHide ? void 0 : ((I = (T = t.axes) == null ? void 0 : T.y2) == null ? void 0 : I.label) ?? (m ? kn(e, m) : void 0), p = {};
  return o.forEach((E, V) => {
    const J = E.colorToken ?? Ne[V % Ne.length];
    p[E.member] = {
      label: E.label ?? kn(e, E.member),
      color: `var(--${J})`
    };
  }), /* @__PURE__ */ i(ut, { config: p, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(oc, { accessibilityLayer: !0, data: c, children: [
    /* @__PURE__ */ i(dn, { vertical: !1 }),
    /* @__PURE__ */ i(
      Dt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (A = (q = t.axes) == null ? void 0 : q.x) == null ? void 0 : A.hide,
        tickFormatter: s,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Qe,
      {
        yAxisId: "left",
        type: "number",
        hide: (z = (O = t.axes) == null ? void 0 : O.y) == null ? void 0 : z.hide,
        scale: Ke((R = t.axes) == null ? void 0 : R.y),
        domain: qe((D = t.axes) == null ? void 0 : D.y),
        tickFormatter: (E) => n.value(E, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      Qe,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (Z = (Q = t.axes) == null ? void 0 : Q.y2) == null ? void 0 : Z.hide,
        scale: Ke((ee = t.axes) == null ? void 0 : ee.y2),
        domain: qe((P = t.axes) == null ? void 0 : P.y2),
        tickFormatter: (E) => n.value(E, m, "axis"),
        label: y ? { value: y, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((W = t.tooltip) == null ? void 0 : W.show) !== !1 && /* @__PURE__ */ i(
      jt,
      {
        content: /* @__PURE__ */ i(
          _t,
          {
            labelFormatter: (E) => n.category(E),
            indicator: ((H = t.tooltip) == null ? void 0 : H.indicator) ?? "dot",
            valueFormatter: pn(n)
          }
        )
      }
    ),
    Me(t).show && /* @__PURE__ */ i(
      Vt,
      {
        content: /* @__PURE__ */ i(Rt, { className: Me(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: qt((B = t.legend) == null ? void 0 : B.position),
        layout: Kt((re = t.legend) == null ? void 0 : re.position),
        align: Wt((de = t.legend) == null ? void 0 : de.position)
      }
    ),
    o.map((E) => Rl(E, e, r)),
    (U = r.referenceLines) == null ? void 0 : U.map((E, V) => {
      const J = E.side ?? (l && !u ? "right" : "left");
      let ae;
      if (E.axis === "x") {
        const he = e.categories[E.value];
        if (he === void 0) return null;
        ae = { x: typeof he == "number" ? he : String(he) };
      } else
        ae = { y: E.value };
      return /* @__PURE__ */ i(
        ct,
        {
          yAxisId: J,
          ...ae,
          label: E.label,
          stroke: `var(--${E.colorToken ?? "muted-foreground"})`,
          strokeDasharray: "4 4"
        },
        V
      );
    })
  ] }) });
}
function Rl(e, t, n) {
  const a = e.axis === "right" ? "right" : "left", r = `var(${qr(e.member)})`, o = e.label ?? kn(t, e.member), c = e.curve ?? n.curve ?? "monotone", s = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    vo,
    {
      yAxisId: a,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      fill: r,
      radius: [n.barRadius ?? 3, n.barRadius ?? 3, 0, 0]
    },
    e.member
  ) : e.render === "area" ? /* @__PURE__ */ i(
    zr,
    {
      yAxisId: a,
      type: c,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      fill: r,
      fillOpacity: n.fillOpacity ?? 0.25,
      dot: s,
      connectNulls: l
    },
    e.member
  ) : /* @__PURE__ */ i(
    ho,
    {
      yAxisId: a,
      type: c,
      dataKey: e.member,
      name: o,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      dot: s,
      connectNulls: l
    },
    e.member
  );
}
function Al(e, t) {
  var o, c, s;
  const n = new Map(e.series.map((l) => [l.key, l]));
  if (t.every((l) => n.has(l.member)) && e.categories.length > 0)
    return e.categories.map((l, u) => {
      var f;
      const m = {
        __cat: typeof l == "number" ? l : String(l)
      };
      for (const h of t) m[h.member] = ((f = n.get(h.member)) == null ? void 0 : f.data[u]) ?? null;
      return m;
    });
  const r = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((s = (c = e.raw.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : s.dimension);
  return e.raw.rows.map((l) => {
    const u = r ? l[r] : void 0, m = {
      __cat: u == null ? "" : String(u)
    };
    for (const f of t) m[f.member] = Ml(l[f.member]);
    return m;
  });
}
function kn(e, t) {
  var n, a, r, o;
  return ((a = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : a.shortTitle) ?? ((o = (r = e.raw.annotation) == null ? void 0 : r.measures[t]) == null ? void 0 : o.title) ?? t;
}
function Ml(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ft = "cv:w-40", Ol = "cv:w-56", ri = "a date or category", ar = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: ri, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0
  }
], Ll = [
  { id: "x", label: "Category", hint: ri, cardinality: "one", kinds: ["time", "category"] },
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
], Dl = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], Tl = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], zl = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], Fl = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], Pl = ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo"], nt = (e) => Pl.indexOf(e), Xe = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Co,
    order: nt("bar"),
    component: Qs,
    optionsSchema: et.bar,
    defaults: tt.bar,
    wells: ar,
    zones: { left: ["y"], bottom: ["x", "color"] },
    dualAxisY: !1,
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ft
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: gc,
    order: nt("line"),
    component: Js,
    optionsSchema: et.line,
    defaults: tt.line,
    wells: ar,
    zones: { left: ["y"], bottom: ["x", "color"] },
    dualAxisY: !0,
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ft
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: mc,
    order: nt("area"),
    component: Xs,
    optionsSchema: et.area,
    defaults: tt.area,
    wells: ar,
    zones: { left: ["y"], bottom: ["x", "color"] },
    dualAxisY: !1,
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !0,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !0,
    comparePreviousMode: "series",
    sidebarWidthClass: ft
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: pc,
    order: nt("pie"),
    component: Zs,
    optionsSchema: et.pie,
    defaults: tt.pie,
    wells: Dl,
    zones: { left: ["size"], bottom: ["slices"] },
    dualAxisY: !1,
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ft
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: hc,
    order: nt("scatter"),
    component: tl,
    optionsSchema: et.scatter,
    defaults: tt.scatter,
    wells: Tl,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ft
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: fc,
    order: nt("kpi"),
    component: ol,
    optionsSchema: et.kpi,
    defaults: tt.kpi,
    wells: zl,
    zones: { left: ["value"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !0,
    comparePreviousMode: "kpiRow",
    sidebarWidthClass: Ol
  },
  table: {
    family: "table",
    label: "Table",
    icon: vc,
    order: nt("table"),
    component: gl,
    optionsSchema: et.table,
    defaults: tt.table,
    wells: Fl,
    zones: { left: ["columns"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ft
  },
  combo: {
    family: "combo",
    canonicalTimeWell: "x",
    label: "Combo",
    icon: dc,
    order: nt("combo"),
    component: _l,
    optionsSchema: et.combo,
    defaults: tt.combo,
    wells: Ll,
    zones: { left: ["y"], bottom: ["x"] },
    dualAxisY: !0,
    supportsMapping: !0,
    supportsCartesianAxes: !0,
    enforcesAxisUnit: !1,
    // combo is the dual-axis "mix" chart — exempt by design.
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ft
  }
}, El = Xe.bar, $l = Xe.line, Il = Xe.area, jl = Xe.pie, Vl = Xe.scatter, ql = Xe.kpi, Kl = Xe.table, Wl = Xe.combo, Yr = [
  El,
  $l,
  Il,
  jl,
  Vl,
  ql,
  Kl,
  Wl
], Hl = d.any();
function Qr(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const c of e) n.set(c.family, c);
  for (const c of t ?? []) n.set(c.family, c);
  Object.freeze(n);
  const a = [...n.values()].sort(
    (c, s) => c.order - s.order || c.family.localeCompare(s.family)
  ), r = a.map((c) => c.family), o = {
    get: (c) => n.get(c),
    require: (c) => {
      const s = n.get(c);
      if (!s)
        throw new Error(
          `Unknown chart family "${c}". Provide it via <CubeVizProvider families={[...]}> (or buildFamilyRegistry) before rendering/editing a spec that uses it.`
        );
      return s;
    },
    list: () => a,
    families: () => r,
    defaults: (c) => {
      var s;
      return ((s = n.get(c)) == null ? void 0 : s.defaults) ?? Ws;
    },
    optionsSchema: (c) => {
      var s;
      return ((s = n.get(c)) == null ? void 0 : s.optionsSchema) ?? Hl;
    },
    resolveOptions: (c) => Hs(c, o.defaults(c.family))
  };
  return o;
}
const Hn = Qr(Yr);
function Bl(e, t = Hn) {
  return t.resolveOptions(e);
}
const Lp = Object.fromEntries(
  Object.entries(Xe).map(([e, t]) => [e, t.component])
);
function Ul({
  data: e,
  options: t,
  config: n,
  format: a,
  state: r,
  components: o,
  editing: c,
  updateFamilyOptions: s,
  registry: l = Hn
}) {
  var p;
  const u = ce(() => Bl(t, l), [t, l]), m = ((p = l.get(u.family)) == null ? void 0 : p.queryless) ?? !1;
  if (!m && (r != null && r.loading))
    return /* @__PURE__ */ i(bs, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (!m && (r != null && r.error))
    return /* @__PURE__ */ v(Vn, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Pr, {}),
      /* @__PURE__ */ i(qn, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(Kn, { children: r.error.message })
    ] });
  if (!m && e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const f = n && Object.keys(n).length > 0 ? n : Ys(e), h = a ?? Uo(e.raw.annotation, u, Kr), y = (o == null ? void 0 : o[u.family]) ?? l.require(u.family).component;
  return /* @__PURE__ */ i(
    y,
    {
      data: e,
      options: u,
      config: f,
      format: h,
      state: r,
      editing: c,
      updateFamilyOptions: s
    }
  );
}
const Ne = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], or = 8;
function Da(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function Cr(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : Ne, a = (t == null ? void 0 : t.byKey) ?? {}, r = (u, m) => a[u] ?? m, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const m = r(u.key, u.colorToken);
    m && o.add(m);
  }
  let c = 0;
  const s = () => {
    for (let u = 0; u < n.length; u++) {
      const m = n[c++ % n.length];
      if (!o.has(m))
        return o.add(m), m;
    }
    return n[c++ % n.length];
  };
  return e.map((u) => r(u.key, u.colorToken) ?? s());
}
function Ta(e, t) {
  const n = Cr(e, t);
  return e.forEach((a, r) => {
    a.colorToken = n[r];
  }), e;
}
function Gl(e) {
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
  for (const n of Object.keys(e)) t[n] = Gl(e[n]);
  return t;
}
function Yl(e) {
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
function Bn(e, t, n) {
  const a = e == null ? void 0 : e.meta, r = {};
  (a == null ? void 0 : a.unit) !== void 0 && (r.unit = a.unit), (a == null ? void 0 : a.quantity) !== void 0 && (r.quantity = a.quantity), (a == null ? void 0 : a.convert) !== void 0 && (r.convert = a.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && r.unit === void 0 && (r.unit = "%");
  let c = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!c || c.kind === void 0 || c.kind === "auto") && (c = { ...c, kind: "currency" }), c && (r.format = c), t != null && t.axis && (r.axis = t.axis), t != null && t.stackId && (r.stackId = t.stackId), t != null && t.curve && (r.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (r.dots = t.dots), r;
}
function Ql(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Jl(e, t) {
  var a, r;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, c] of Object.entries(e.measures)) {
    const s = (a = c.meta) == null ? void 0 : a.unit;
    if (!s || ((r = c.meta) == null ? void 0 : r.convert) === !1) continue;
    const l = t.conversions[s];
    l && (n.set(o, { to: l.toImperial, unit: l.imperialUnit }), e.measures[o] = { ...c, meta: { ...c.meta, unit: l.imperialUnit } });
  }
  return n;
}
function Xl(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const a = { ...n };
    for (const [r, o] of t) {
      const c = Un(a[r]);
      c !== null && (a[r] = o.to(c));
    }
    return a;
  });
}
function Zl(e, t) {
  var n;
  if (t.size !== 0)
    for (const a of e) {
      const r = (n = a.meta) != null && n.measure ? t.get(a.meta.measure) : void 0;
      r && (a.data = a.data.map((o) => o === null ? null : r.to(o)));
    }
}
function eu(e, t, n, a, r = Hn) {
  const o = Yl(e.annotation()), c = Jl(o, a), s = Xl(e.tablePivot(), c), l = t.mapping;
  if (!l) {
    const f = n.measures ?? [];
    if (r.require(t.family).measureOnly && f.length > 0) {
      const h = s[0] ?? {}, y = [
        {
          key: "value",
          label: "Value",
          data: f.map((g) => Un(h[g])),
          meta: { ...Bn(Lt(o, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return Ta(y, t.colors), {
        categories: f.map(
          (g) => {
            var b, w;
            return ((b = Lt(o, g)) == null ? void 0 : b.shortTitle) ?? ((w = Lt(o, g)) == null ? void 0 : w.title) ?? g;
          }
        ),
        series: y,
        raw: { rows: s, annotation: o, query: n },
        empty: s.length === 0 || Da(y)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: o, query: n },
      empty: s.length === 0
    };
  }
  const u = l.series.mode === "measures" ? nu(e, l.series, t, o) : ru(e, l.category.member, l.series, t, o), m = tu(e, l);
  return Zl(u, c), Ta(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: o, query: n },
    empty: s.length === 0 || Da(u)
  };
}
function tu(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((r) => r.x);
}
function nu(e, t, n, a) {
  const { members: r, meta: o } = t, c = e.chartPivot();
  return r.map((s) => {
    const l = Lt(a, s), u = o == null ? void 0 : o[s], m = c.map((f) => Un(f[s]));
    return {
      key: s,
      label: Ql(l, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Bn(l, u, n.format), measure: s }
    };
  });
}
function ru(e, t, n, a, r) {
  const { value: o, values: c, pivot: s } = n, l = c && c.length > 0 ? c : [o], u = new Set(l), m = l.length > 1, f = { x: [t], y: [s, "measures"] }, y = e.seriesNames(f).filter((w) => {
    const k = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return k === void 0 || u.has(k);
  }), p = e.chartPivot(f), g = Lt(r, o), b = y.map((w) => {
    var A, O;
    const k = (A = w.yValues) == null ? void 0 : A[0], C = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : o, _ = Lt(r, C), N = (_ == null ? void 0 : _.shortTitle) ?? (_ == null ? void 0 : _.title) ?? C, L = k ?? w.shortTitle ?? w.title ?? w.key, T = m ? `${N} · ${L}` : L, I = p.map((z) => Un(z[w.key])), q = (O = n.meta) == null ? void 0 : O[C];
    return {
      key: w.key,
      label: T,
      data: I,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Bn(_ ?? g, q, a.format),
        measure: C
      }
    };
  });
  return au(b, g, a.format);
}
function au(e, t, n) {
  var m, f, h;
  if (e.length <= or) return e;
  const a = (y) => y.data.reduce((p, g) => p + (g ?? 0), 0), r = [...e].sort((y, p) => a(p) - a(y)), o = r.slice(0, or - 1), c = r.slice(or - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, l = Array.from({ length: s }, (y, p) => {
    let g = 0, b = !1;
    for (const w of c) {
      const k = w.data[p];
      k !== null && (g += k, b = !0);
    }
    return b ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${c.length})`,
    data: l,
    meta: { ...Bn(t, void 0, n), ...(h = (f = o[0]) == null ? void 0 : f.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function Un(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const oe = (e) => ge(e, "yyyy-MM-dd");
function ou(e, t = /* @__PURE__ */ new Date()) {
  const n = e.trim().toLowerCase();
  if (n === "today") return [oe(t), oe(t)];
  if (n === "yesterday") {
    const c = Ce(t, 1);
    return [oe(c), oe(c)];
  }
  if (n === "this week") return [oe(An(t)), oe(Mn(t))];
  if (n === "this month") return [oe(pt(t)), oe(tn(t))];
  if (n === "this quarter") return [oe(gt(t)), oe(nn(t))];
  if (n === "this year") return [oe(bt(t)), oe(rn(t))];
  if (n === "last week") {
    const c = hr(t, 1);
    return [oe(An(c)), oe(Mn(c))];
  }
  if (n === "last month") {
    const c = yt(t, 1);
    return [oe(pt(c)), oe(tn(c))];
  }
  if (n === "last quarter") {
    const c = xt(t, 1);
    return [oe(gt(c)), oe(nn(c))];
  }
  if (n === "last year") {
    const c = wt(t, 1);
    return [oe(bt(c)), oe(rn(c))];
  }
  const a = n.match(
    /^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/
  );
  if (!a) return;
  const r = Number(a[1]);
  if (!Number.isFinite(r) || r < 1) return;
  const o = a[2];
  return o.startsWith("day") ? [oe(Ce(t, r - 1)), oe(t)] : o.startsWith("week") ? [oe(Ce(t, r * 7 - 1)), oe(t)] : o.startsWith("month") ? [oe(pt(yt(t, r))), oe(tn(yt(t, 1)))] : o.startsWith("quarter") ? [oe(gt(xt(t, r))), oe(nn(xt(t, 1)))] : [oe(bt(wt(t, r))), oe(rn(wt(t, 1)))];
}
function Ft(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const iu = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function cu(e, t, n) {
  var a;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (a = n.find((r) => r.name === e)) == null ? void 0 : a.default;
}
function ln(e, t, n) {
  var a;
  if (Fe(e)) {
    const r = e.var;
    return Object.prototype.hasOwnProperty.call(n, r) && n[r] !== void 0 ? n[r] : (a = t.get(r)) == null ? void 0 : a.default;
  }
  return e;
}
function su(e, t, n) {
  const a = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return a ? { member: e.member, operator: e.operator } : void 0;
  const r = [];
  for (const c of e.values) {
    const s = ln(c, t, n);
    if (!Ft(s))
      if (Array.isArray(s))
        for (const l of s)
          Ft(l) || r.push(l);
      else
        r.push(s);
  }
  if (r.length === 0)
    return a ? { member: e.member, operator: e.operator } : void 0;
  const o = (e.operator === "inDateRange" || e.operator === "notInDateRange") && r.length === 1 && typeof r[0] == "string" ? ou(r[0]) : void 0;
  return { member: e.member, operator: e.operator, values: o ?? r };
}
function lu(e, t, n) {
  if ("and" in e) {
    const a = Nr(e.and, t, n);
    return a.length > 0 ? { and: a } : void 0;
  }
  if ("or" in e) {
    const a = Nr(e.or, t, n);
    return a.length > 0 ? { or: a } : void 0;
  }
  return su(e, t, n);
}
function Nr(e, t, n) {
  const a = [];
  for (const r of e) {
    const o = lu(r, t, n);
    o !== void 0 && a.push(o);
  }
  return a;
}
function uu(e, t, n) {
  const a = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const r = ln(e.granularity, t, n);
    Ft(r) || (a.granularity = r);
  }
  if (e.dateRange !== void 0) {
    const r = ln(e.dateRange, t, n);
    Ft(r) || (a.dateRange = r);
  }
  return e.compareDateRange !== void 0 && (a.compareDateRange = e.compareDateRange), a;
}
function ai(e, t, n) {
  const a = iu(n), r = {};
  if (e.measures !== void 0 && (r.measures = [...e.measures]), e.dimensions !== void 0 && (r.dimensions = [...e.dimensions]), e.segments !== void 0 && (r.segments = [...e.segments]), e.timeDimensions !== void 0 && (r.timeDimensions = e.timeDimensions.map((o) => uu(o, a, t))), e.filters !== void 0) {
    const o = Nr(e.filters, a, t);
    o.length > 0 && (r.filters = o);
  }
  if (e.order !== void 0 && (r.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = ln(e.limit, a, t);
    Ft(o) || (r.limit = o);
  }
  if (e.offset !== void 0) {
    const o = ln(e.offset, a, t);
    Ft(o) || (r.offset = o);
  }
  return e.total !== void 0 && (r.total = e.total), e.timezone !== void 0 && (r.timezone = e.timezone), r;
}
function mu() {
  let e, t;
  return (n, a, r) => {
    const o = ai(n, a, r), c = JSON.stringify(o);
    return e !== void 0 && c === t ? e : (e = o, t = c, o);
  };
}
function du(e, t) {
  let n = {};
  for (const o of e)
    o.default !== void 0 && (n[o.name] = o.default);
  if (t)
    for (const o of Object.keys(t)) {
      const c = t[o];
      c !== void 0 && (n[o] = c);
    }
  const a = /* @__PURE__ */ new Set(), r = () => {
    for (const o of a) o();
  };
  return {
    get(o) {
      return n[o];
    },
    getAll() {
      return n;
    },
    set(o, c) {
      if (c === void 0) {
        if (!Object.prototype.hasOwnProperty.call(n, o)) return;
        const s = { ...n };
        delete s[o], n = s;
      } else {
        if (n[o] === c) return;
        n = { ...n, [o]: c };
      }
      r();
    },
    subscribe(o) {
      return a.add(o), () => {
        a.delete(o);
      };
    }
  };
}
class vu extends Error {
}
const fu = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new vu(`"${e}" cannot be parsed into a number`);
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
function za(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class hu extends Error {
}
class Fa extends Error {
}
class pu extends Error {
}
class ir extends Error {
}
class gu extends Error {
}
class bu {
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
      throw new Fa(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return za(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
  }
  /**
   * Converts the unit and returns the value
   *
   * @throws OperationOrderError, UnknownUnitError, IncompatibleUnitError, MeasureStructureError
   */
  to(t) {
    var n, a;
    if (this.origin == null)
      throw new Error(".to must be called after .from");
    this.destination = this.getUnit(t), this.destination == null && this.throwUnsupportedUnitError(t);
    const r = this.destination, o = this.origin;
    if (o.abbr === r.abbr)
      return this.val;
    if (r.measure != o.measure)
      throw new pu(`Cannot convert incompatible measures of ${r.measure} and ${o.measure}`);
    let c = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (c = this.cls.sub(c, this.convertFraction(o.unit.anchor_shift))), o.system != r.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new ir(`Unable to convert units. Anchors are missing for "${o.measure}" and "${r.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new ir(`Unable to find anchor for "${o.measure}" to "${r.measure}". Please make sure it is defined.`);
      const m = (n = u[r.system]) === null || n === void 0 ? void 0 : n.transform, f = (a = u[r.system]) === null || a === void 0 ? void 0 : a.ratio;
      if (typeof m == "function")
        c = m(c, this.cls);
      else if (typeof f == "number")
        c = this.cls.mul(c, f);
      else if (za(f))
        c = this.cls.mul(c, this.convertFraction(f));
      else
        throw new ir("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return r.unit.anchor_shift && (c = this.cls.add(c, this.convertFraction(r.unit.anchor_shift))), this.cls.div(c, this.convertFraction(r.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, a, r;
    if (this.origin == null)
      throw new Fa(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let c = [], s = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (c = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (a = t.cutOffNumber) !== null && a !== void 0 ? a : s, l = (r = t.system) !== null && r !== void 0 ? r : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const f = this.describe(m);
      if (c.indexOf(m) === -1 && f.system === l) {
        const y = this.to(m);
        if (o ? this.cls.gt(y, s) : this.cls.lt(y, s))
          continue;
        (u === null || (o ? this.cls.lte(y, s) && this.cls.gt(y, u.val) : this.cls.gte(y, s) && this.cls.lt(y, u.val))) && (u = {
          val: y,
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
      for (const [a, r] of Object.entries(this.measureData))
        for (const [o, c] of Object.entries(r.systems))
          for (const [s, l] of Object.entries(c))
            n.push(this.describeUnit({
              abbr: s,
              measure: a,
              system: o,
              unit: l
            }));
    else {
      if (!this.isMeasure(t))
        throw new gu(`Meausure "${t}" not found.`);
      const a = this.measureData[t];
      for (const [r, o] of Object.entries(a.systems))
        for (const [c, s] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: c,
            measure: t,
            system: r,
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
    for (const a of Object.values(this.measureData))
      for (const r of Object.values(a.systems))
        n = n.concat(Object.keys(r));
    throw new hu(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
  }
  /**
   * Returns the abbreviated measures that the value can be
   * converted to.
   */
  possibilities(t) {
    let n = [], a = [];
    typeof t == "string" && this.isMeasure(t) ? a.push(t) : this.origin != null ? a.push(this.origin.measure) : a = Object.keys(this.measureData);
    for (const r of a) {
      const o = this.measureData[r].systems;
      for (const c of Object.values(o))
        n = [
          ...n,
          ...Object.keys(c)
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
function yu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, a] of Object.entries(e))
    for (const [r, o] of Object.entries(a.systems))
      for (const [c, s] of Object.entries(o))
        t.set(c, {
          measure: n,
          system: r,
          abbr: c,
          unit: s
        });
  return t;
}
function xu(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = yu(e);
  return (a) => new bu({
    measures: e,
    unitCache: n,
    cls: fu
  }, a);
}
const wu = {
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
}, ku = {
  systems: {
    metric: wu
  }
}, Cu = {
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
}, Nu = {
  systems: {
    SI: Cu
  }
}, Su = {
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
}, _u = {
  systems: {
    SI: Su
  }
}, Ru = {
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
}, Au = {
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
}, Mu = {
  systems: {
    metric: Ru,
    imperial: Au
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
}, Ou = {
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
}, Lu = {
  systems: {
    SI: Ou
  }
}, Du = {
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
}, Tu = {
  systems: {
    SI: Du
  }
}, zu = {
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
}, Fu = {
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
}, Pu = {
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
}, Eu = {
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
}, $u = {
  systems: {
    bit: zu,
    byte: Fu,
    IECBit: Pu,
    IECByte: Eu
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
}, Iu = {
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
}, ju = {
  systems: {
    metric: Iu
  }
}, Vu = {
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
}, qu = {
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
}, Ku = {
  systems: {
    SI: Vu,
    nutrition: qu
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
}, Wu = {
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
}, Hu = {
  systems: {
    SI: Wu
  }
}, Bu = {
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
}, Uu = {
  systems: {
    SI: Bu
  }
}, Gu = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Yu = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Qu = {
  systems: {
    metric: Gu,
    imperial: Yu
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
}, Ju = {
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
}, Xu = {
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
}, Zu = {
  systems: {
    metric: Ju,
    imperial: Xu
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
}, em = {
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
}, tm = {
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
}, nm = {
  systems: {
    metric: em,
    imperial: tm
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
}, rm = {
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
}, am = {
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
}, om = {
  systems: {
    metric: rm,
    imperial: am
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
}, im = {
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
}, cm = {
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
}, sm = {
  systems: {
    metric: im,
    imperial: cm
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
}, lm = {
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
}, um = {
  systems: {
    SI: lm
  }
}, mm = {
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
}, dm = {
  systems: {
    unit: mm
  }
}, vm = {
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
}, fm = {
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
}, hm = {
  systems: {
    metric: vm,
    imperial: fm
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
}, pm = {
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
}, gm = {
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
}, bm = {
  systems: {
    metric: pm,
    imperial: gm
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
}, ym = {
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
}, xm = {
  systems: {
    SI: ym
  }
}, wm = {
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
}, km = {
  systems: {
    SI: wm
  }
}, Cm = {
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
}, Nm = {
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
}, Sm = {
  systems: {
    metric: Cm,
    imperial: Nm
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
}, _m = {
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
}, Rm = {
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
}, Am = {
  systems: {
    metric: _m,
    imperial: Rm
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
}, Mm = {
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
}, Om = {
  systems: {
    SI: Mm
  }
}, Lm = {
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
}, Dm = {
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
}, Tm = {
  systems: {
    metric: Lm,
    imperial: Dm
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
}, zm = {
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
}, Fm = {
  systems: {
    SI: zm
  }
}, Pm = {
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
}, Em = {
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
}, $m = {
  systems: {
    metric: Pm,
    imperial: Em
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
}, Im = {
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
}, jm = {
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
}, Vm = {
  systems: {
    metric: Im,
    imperial: jm
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
}, qm = {
  acceleration: ku,
  angle: Nu,
  apparentPower: _u,
  area: Mu,
  charge: Lu,
  current: Tu,
  digital: $u,
  each: ju,
  energy: Ku,
  force: Hu,
  frequency: Uu,
  illuminance: Qu,
  length: Zu,
  mass: nm,
  massFlowRate: om,
  pace: sm,
  partsPer: um,
  pieces: dm,
  power: hm,
  pressure: bm,
  reactiveEnergy: xm,
  reactivePower: km,
  speed: Sm,
  torque: Tm,
  temperature: Am,
  time: Om,
  voltage: Fm,
  volume: $m,
  volumeFlowRate: Vm
}, Km = xu(qm), Wm = {
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
function Hm(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Km(t).from(e.from).to(e.to)
  };
}
const Sr = {
  ...Object.fromEntries(
    Object.entries(Wm).map(([e, t]) => [e, Hm(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Gn(e) {
  return e ? { ...Sr, ...e } : Sr;
}
function Bm(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Um(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Gm(e) {
  return e != null && e.quantity ? Um(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Ym = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function oi(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Pa(e, t) {
  const n = e * (Ym[t ?? "ms"] ?? 1), a = n < 0 ? "-" : "";
  let r = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], c = o.map(([l, u], m) => {
    const f = m < o.length - 1 ? Math.floor(r / l) : Math.round(r / l);
    return r -= f * l, [f, u];
  }), s = c.findIndex((l) => l[0] > 0);
  if (s === -1) {
    const l = Math.abs(n);
    return l === 0 ? "0s" : l < 1e3 ? `${a}${oi(l.toFixed(l < 1 ? 2 : 0))}ms` : `${a}0s`;
  }
  return a + c.slice(s, s + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function cr(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const r = Math.abs(e);
    for (const [o, c] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (r >= o) return oi((e / o).toFixed(n.decimals ?? 1)) + c;
  }
  const a = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, a).format(e);
}
function Qm(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Ea(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function ii(e = Sr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Kr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, a = t.meta, r = a == null ? void 0 : a.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return Pa(n, a == null ? void 0 : a.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency") {
        const m = typeof o.currency == "string" && /^[A-Za-z]{3}$/.test(o.currency) ? o.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: o.decimals ?? 0 }).format(n);
      }
      if (o.kind === "number") return Ea(cr(n, t), o.prefix, o.suffix);
    }
    if (r === "time") return Pa(n, a == null ? void 0 : a.unit);
    if (r === "count" || (a == null ? void 0 : a.convert) === !1) return Ea(cr(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const c = a == null ? void 0 : a.unit, s = c ? Qm(r, c) : {}, l = (o == null ? void 0 : o.prefix) ?? s.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : s.suffix ?? "";
    return `${l}${cr(n, t)}${u}`;
  };
}
const Yn = yo(null);
Yn.displayName = "CubeVizContext";
function He() {
  const e = Fr(Yn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function mt() {
  return He().families;
}
function Jm(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Dp({
  cube: e,
  theme: t,
  locale: n,
  maps: a,
  registry: r,
  families: o,
  children: c
}) {
  const s = (o ?? []).map((g) => g.family).join("|"), l = ce(
    () => Qr(Yr, o),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [s]
  ), u = ce(
    () => Jm(e) ? hs(e) : e,
    [e]
  ), m = ce(
    () => {
      var g;
      return {
        chartRamp: (g = t == null ? void 0 : t.chartRamp) != null && g.length ? t.chartRamp : Ne,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), f = ce(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = ce(() => r ?? {}, [r]), y = ce(
    () => a != null && a.apiKey || a != null && a.mapId ? { apiKey: a.apiKey, mapId: a.mapId } : void 0,
    [a == null ? void 0 : a.apiKey, a == null ? void 0 : a.mapId]
  ), p = ce(
    () => ({
      cubeClient: u,
      registry: h,
      families: l,
      locale: f,
      theme: m,
      maps: y
    }),
    [u, h, l, f, m, y]
  );
  return /* @__PURE__ */ i(Yn.Provider, { value: p, children: /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "cv:contents cv:text-foreground",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: c
    }
  ) });
}
function Jr({
  families: e,
  children: t
}) {
  const n = He(), a = (e ?? []).map((o) => o.family).join("|"), r = ce(() => !e || e.length === 0 ? n : { ...n, families: Qr(Yr, e) }, [n, a]);
  return !e || e.length === 0 ? /* @__PURE__ */ i(ue, { children: t }) : /* @__PURE__ */ i(Yn.Provider, { value: r, children: t });
}
function Xm(e, t, n) {
  var a;
  return ((a = e == null ? void 0 : e.charts) == null ? void 0 : a[t]) ?? n.require(t).component;
}
const Zm = 5e3;
function ed(e, t) {
  const { cubeClient: n } = He(), a = (t == null ? void 0 : t.skip) ?? !1, r = ce(
    () => e.limit === void 0 ? { ...e, limit: Zm } : e,
    [e]
  ), o = ce(() => JSON.stringify(r), [r]), [c, s] = Tt({ isLoading: !a }), [l, u] = Tt(0), m = ot(() => u((f) => f + 1), []);
  return vn(() => {
    if (a) {
      s({ isLoading: !1 });
      return;
    }
    let f = !0;
    const h = new AbortController();
    return s((y) => ({ resultSet: y.resultSet, isLoading: !0 })), n.load(r, { castNumerics: !0, signal: h.signal }).then((y) => {
      f && s({
        resultSet: y,
        isLoading: !1
      });
    }).catch((y) => {
      f && s({
        isLoading: !1,
        error: y instanceof Error ? y : new Error(String(y))
      });
    }), () => {
      f = !1, h.abort();
    };
  }, [n, o, a, l]), { ...c, refetch: m };
}
const Qn = yo(null);
Qn.displayName = "DashboardContext";
function Xr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const a = e.variables, r = ht(null);
  (r.current === null || r.current.key !== a) && (r.current = { store: du(a, t), key: a });
  const o = r.current.store, c = td(o, a);
  return ic(Qn.Provider, { value: c }, n);
}
function td(e, t) {
  const n = ot(
    (o, c) => e.set(o, c),
    [e]
  ), a = ot(
    (o) => ai(o, e.getAll(), t),
    [e, t]
  ), r = ot(
    (o) => cu(o, e.getAll(), t),
    [e, t]
  );
  return ce(
    () => ({ store: e, setVar: n, resolveQuery: a, resolveValue: r, decls: t }),
    [e, n, a, r, t]
  );
}
function nd(e) {
  const t = xo(e.store.subscribe, e.store.getAll, e.store.getAll);
  return ce(
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
function ci() {
  const e = Fr(Qn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return nd(e);
}
function Zr() {
  return Fr(Qn);
}
const rd = () => () => {
};
function sr(e, t, n) {
  var C;
  const a = Zr(), { locale: r } = He(), o = mt(), c = ht(null);
  c.current === null && (c.current = mu());
  const s = c.current, l = (n == null ? void 0 : n.skipResolve) ?? !1, u = a !== null && !l, m = () => !u || !a ? e : s(e, a.store.getAll(), a.decls), f = xo(
    u && a ? a.store.subscribe : rd,
    m,
    m
  ), { resultSet: h, isLoading: y, error: p, refetch: g } = ed(f, { skip: n == null ? void 0 : n.skip }), b = ((C = t.format) == null ? void 0 : C.unitSystem) ?? (r == null ? void 0 : r.unitSystem), w = ce(() => Gn(r == null ? void 0 : r.units), [r == null ? void 0 : r.units]);
  return { data: ce(() => {
    if (h)
      return eu(h, t, f, { unitSystem: b, conversions: w }, o);
  }, [h, t, f, b, w, o]), isLoading: y, error: p, refetch: g, resolvedQuery: f };
}
function Ze() {
  const { cubeClient: e } = He(), [t, n] = Tt({ isLoading: !0 });
  return vn(() => {
    let a = !0;
    return n({ isLoading: !0 }), ps(e).then((r) => {
      a && n({ meta: r, isLoading: !1 });
    }).catch((r) => {
      a && n({
        isLoading: !1,
        error: r instanceof Error ? r : new Error(String(r))
      });
    }), () => {
      a = !1;
    };
  }, [e]), t;
}
function Tp() {
  const { locale: e } = He(), { formatValue: t, units: n } = e;
  return ce(
    () => t ?? ii(Gn(n)),
    [t, n]
  );
}
function si() {
  const [e, t] = Tt(0), n = ht(null), a = ht(null), r = ht(null), o = ht(0), c = ot((u) => {
    r.current === null && (r.current = requestAnimationFrame(() => {
      r.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), s = ot(() => {
    a.current && (a.current.disconnect(), a.current = null), r.current !== null && (cancelAnimationFrame(r.current), r.current = null);
  }, []), l = ot(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== o.current && (o.current = m, t(m));
      const f = new ResizeObserver((h) => {
        var y, p;
        for (const g of h) {
          const b = ((p = (y = g.contentBoxSize) == null ? void 0 : y[0]) == null ? void 0 : p.inlineSize) ?? g.contentRect.width;
          c(b);
        }
      });
      f.observe(u), a.current = f;
    },
    [c, s]
  );
  return vn(() => s, [s]), [l, e];
}
const ad = "day";
function od(e, t) {
  var m;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, a = n == null ? void 0 : n.sparkline;
  if (!a) return null;
  const r = a.member ?? (n == null ? void 0 : n.measure), o = (m = e.timeDimensions) == null ? void 0 : m[0], c = a.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!r || !c) return null;
  const s = a.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [r],
    timeDimensions: [
      {
        dimension: c,
        granularity: a.granularity ?? ad,
        ...s !== void 0 ? { dateRange: s } : {}
      }
    ],
    ...e.filters ? { filters: e.filters } : {},
    ...e.segments ? { segments: e.segments } : {},
    // Keep the trend's buckets/relative-ranges in the host timezone (same as the headline).
    ...e.timezone ? { timezone: e.timezone } : {},
    order: [[c, "asc"]]
  }, chart: {
    family: "line",
    mapping: {
      category: { member: c },
      series: { mode: "measures", members: [r] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const ne = (e) => ge(e, "yyyy-MM-dd");
function id(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const r = Rn(e[0]), o = Rn(e[1]);
    if (Number.isNaN(r.getTime()) || Number.isNaN(o.getTime())) return;
    const c = qc(o, r) + 1;
    return [ne(Ce(r, c)), ne(Ce(r, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const r = Ce(t, 1);
    return [ne(r), ne(r)];
  }
  if (n === "yesterday") {
    const r = Ce(t, 2);
    return [ne(r), ne(r)];
  }
  const a = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (a) {
    const r = Number(a[1]), o = a[2];
    if (o.startsWith("day")) return [ne(Ce(t, 2 * r - 1)), ne(Ce(t, r))];
    if (o.startsWith("week")) return [ne(Ce(t, 14 * r - 1)), ne(Ce(t, 7 * r))];
    if (o.startsWith("month"))
      return [ne(pt(yt(t, 2 * r))), ne(Ce(pt(yt(t, r)), 1))];
    if (o.startsWith("quarter"))
      return [ne(gt(xt(t, 2 * r))), ne(Ce(gt(xt(t, r)), 1))];
    if (o.startsWith("year"))
      return [ne(bt(wt(t, 2 * r))), ne(Ce(bt(wt(t, r)), 1))];
  }
  if (n === "this week") {
    const r = hr(t, 1);
    return [ne(An(r)), ne(Mn(r))];
  }
  if (n === "this month") {
    const r = yt(t, 1);
    return [ne(pt(r)), ne(tn(r))];
  }
  if (n === "this quarter") {
    const r = xt(t, 1);
    return [ne(gt(r)), ne(nn(r))];
  }
  if (n === "this year") {
    const r = wt(t, 1);
    return [ne(bt(r)), ne(rn(r))];
  }
  if (n === "last week") {
    const r = hr(t, 2);
    return [ne(An(r)), ne(Mn(r))];
  }
  if (n === "last month") {
    const r = yt(t, 2);
    return [ne(pt(r)), ne(tn(r))];
  }
  if (n === "last quarter") {
    const r = xt(t, 2);
    return [ne(gt(r)), ne(nn(r))];
  }
  if (n === "last year") {
    const r = wt(t, 2);
    return [ne(bt(r)), ne(rn(r))];
  }
}
function cd(e, t, n = Hn) {
  var u, m;
  const a = t.familyOptions ?? {}, r = n.require(t.family).comparePreviousMode;
  if (r === "series") {
    if (!a.comparePrevious) return null;
  } else if (r === "kpiRow") {
    if (((u = a.comparison) == null ? void 0 : u.mode) !== "previousPeriod") return null;
  } else
    return null;
  const o = (m = e.timeDimensions) == null ? void 0 : m[0];
  if (!o) return null;
  const c = o.dateRange;
  if (c !== void 0 && typeof c == "object" && !Array.isArray(c)) return null;
  const s = id(c);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...o, dateRange: s, compareDateRange: void 0 }]
  }, mode: r } : null;
}
const sd = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function ea({ query: e, chart: t, onState: n, editing: a, updateFamilyOptions: r }) {
  var q;
  const { registry: o, locale: c } = He(), s = mt(), l = ((q = s.get(t.family)) == null ? void 0 : q.queryless) ?? !1, u = ce(() => {
    var A;
    return (A = t.format) != null && A.unitSystem || !(c != null && c.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: c.unitSystem } };
  }, [t, c == null ? void 0 : c.unitSystem]), m = ce(() => {
    const A = e ?? {};
    return A.timezone || !(c != null && c.timezone) ? A : { ...A, timezone: c.timezone };
  }, [e, c == null ? void 0 : c.timezone]), { data: f, isLoading: h, error: y, refetch: p, resolvedQuery: g } = sr(
    m,
    u,
    { skip: l }
  ), b = ce(() => od(m, u), [m, u]), w = sr(
    (b == null ? void 0 : b.query) ?? m,
    (b == null ? void 0 : b.chart) ?? u,
    { skip: !b }
  ), k = ce(
    () => cd(g, u, s),
    [g, u, s]
  ), C = sr(
    (k == null ? void 0 : k.query) ?? m,
    u,
    { skip: !k, skipResolve: !0 }
  ), _ = ce(
    () => ({ [u.family]: Xm(o, u.family, s) }),
    [o, u.family, s]
  ), N = ce(() => {
    let A = f ?? sd;
    if (b && w.data) {
      A = { ...A, series: w.data.series, categories: w.data.categories };
      const O = A.raw.rows.length > 0, z = A.series.some((R) => R.data.some((D) => D !== null));
      A = { ...A, empty: !O && !z };
    }
    if (k && C.data) {
      if (k.mode === "kpiRow") {
        const O = C.data.raw.rows[0];
        if (O) {
          const z = A.raw.rows[0];
          A = {
            ...A,
            raw: { ...A.raw, rows: z ? [z, O] : [O] }
          };
        }
      } else if (!C.data.empty) {
        const O = new Map(C.data.series.map((z) => [z.key, z]));
        if (!A.empty && A.series.length > 0) {
          const z = A.categories.length, R = A.series.map((D) => {
            const Q = O.get(D.key), Z = Array.from({ length: z }, (ee, P) => (Q == null ? void 0 : Q.data[P]) ?? null);
            return {
              ...D,
              key: `${D.key}__prev`,
              label: `${D.label} (prev)`,
              colorToken: D.colorToken,
              data: Z,
              meta: { ...D.meta, companion: !0 }
            };
          });
          A = { ...A, series: [...A.series, ...R] };
        } else {
          const z = C.data.series.map((R) => ({
            ...R,
            key: `${R.key}__prev`,
            label: `${R.label} (prev)`,
            data: [...R.data],
            meta: { ...R.meta, companion: !0 }
          }));
          A = {
            ...A,
            categories: C.data.categories,
            series: z,
            empty: !1
          };
        }
      }
    }
    return A;
  }, [f, b, w.data, k, C.data]);
  vn(() => {
    n == null || n({ rows: N.raw.rows, refetch: p, isLoading: h });
  }, [n, N.raw.rows, p, h]);
  const L = {}, T = ce(
    () => c.formatValue ?? ii(Gn(c.units)),
    [c.formatValue, c.units]
  ), I = ce(
    () => Uo(N.raw.annotation, u, T, {
      locale: c.locale,
      unitSystem: c.unitSystem
    }),
    [N.raw.annotation, u, T, c.locale, c.unitSystem]
  );
  return /* @__PURE__ */ i(
    Ul,
    {
      data: N,
      options: u,
      config: L,
      format: I,
      state: l ? { loading: !1 } : { loading: h && !f, error: y },
      components: _,
      registry: s,
      editing: a,
      updateFamilyOptions: r
    }
  );
}
function ld({ spec: e }) {
  return /* @__PURE__ */ i(ea, { query: e.query, chart: e.chart });
}
const li = "cube-viz-prose";
function ud(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function md({ doc: e }) {
  const t = ud(e), n = ce(
    () => t ? e : null,
    [t, e]
  ), a = Fo(
    {
      extensions: [Eo],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: S(li) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(Po, { editor: a }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
}
const Cn = [
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
], dd = Object.fromEntries(
  Cn.map((e) => [e.value, e.label])
);
function $a(e) {
  return dd[e.trim().toLowerCase()] ?? e;
}
const vd = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function fd({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: a } = Wc(), r = S(ni({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
  return /* @__PURE__ */ v("div", { className: "cv:mb-2 cv:flex cv:items-center cv:justify-between cv:gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !a,
        onClick: () => a && t(a),
        className: S(r, !a && "cv:opacity-40"),
        children: /* @__PURE__ */ i(Er, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:text-foreground", children: ge(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: S(r, !n && "cv:opacity-40"),
        children: /* @__PURE__ */ i(fn, { className: "cv:size-4" })
      }
    )
  ] });
}
function hd({ day: e, modifiers: t, className: n, style: a, ...r }) {
  const o = !!t.selected && !t.outside && !t.disabled, c = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...r,
      style: { ...a, color: o ? "var(--primary-foreground)" : c ? "var(--muted-foreground)" : "var(--foreground)" },
      className: S(
        "cv:flex cv:size-9 cv:items-center cv:justify-center cv:rounded-md cv:text-sm cv:font-normal cv:transition-colors",
        // size-9 cells touch edge-to-edge, so a contiguous range reads as one band.
        o ? "cv:bg-primary cv:hover:bg-primary" : "cv:hover:bg-accent",
        t.today && !o && "cv:border cv:border-primary",
        t.disabled && "cv:opacity-40",
        n
      )
    }
  );
}
function ui({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...a
}) {
  return /* @__PURE__ */ i(
    Kc,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: S("cv:p-3", e),
      classNames: {
        months: "cv:flex cv:flex-col cv:sm:flex-row cv:gap-2",
        month: "cv:flex cv:flex-col cv:gap-2",
        month_caption: "",
        // Native table: <th> weekdays + <td> days share columns -> always aligned.
        month_grid: "cv:border-collapse",
        weekdays: "",
        weekday: "cv:size-9 cv:p-0 cv:text-xs cv:font-normal cv:text-muted-foreground",
        week: "",
        day: "cv:p-0 cv:text-center cv:align-middle",
        hidden: "cv:invisible",
        ...t
      },
      components: {
        MonthCaption: fd,
        DayButton: hd,
        Chevron: ({ orientation: r, className: o, ...c }) => /* @__PURE__ */ i(r === "left" ? Er : fn, { className: S("cv:size-4", o), ...c })
      },
      ...a
    }
  );
}
function Le({
  ...e
}) {
  return /* @__PURE__ */ i(_n.Root, { "data-slot": "popover", ...e });
}
function De({
  ...e
}) {
  return /* @__PURE__ */ i(_n.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Te({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ i(_n.Portal, { children: /* @__PURE__ */ i(
    _n.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: S(
        "cv:z-50 cv:w-72 cv:origin-[var(--radix-popover-content-transform-origin)] cv:rounded-md cv:border cv:border-border cv:bg-popover cv:p-4 cv:text-popover-foreground cv:shadow-md cv:outline-none cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...a
    }
  ) });
}
function Pe({
  ...e
}) {
  return /* @__PURE__ */ i(Se.Root, { "data-slot": "select", ...e });
}
function _r({
  ...e
}) {
  return /* @__PURE__ */ i(Se.Group, { "data-slot": "select-group", ...e });
}
function Ee({
  ...e
}) {
  return /* @__PURE__ */ i(Se.Value, { "data-slot": "select-value", ...e });
}
function $e({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Se.Trigger,
    {
      "data-slot": "select-trigger",
      className: S(
        "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:whitespace-nowrap cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2 cv:text-sm cv:text-foreground cv:shadow-sm cv:ring-offset-background cv:placeholder:text-muted-foreground cv:focus:outline-none cv:focus:ring-1 cv:focus:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50 cv:[&>span]:line-clamp-1 cv:data-[placeholder]:text-muted-foreground cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(Se.Icon, { asChild: !0, children: /* @__PURE__ */ i(lt, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function pd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Se.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(bc, { className: "cv:size-4" })
    }
  );
}
function gd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Se.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(lt, { className: "cv:size-4" })
    }
  );
}
function Ie({
  className: e,
  children: t,
  position: n = "popper",
  ...a
}) {
  return /* @__PURE__ */ i(Se.Portal, { children: /* @__PURE__ */ v(
    Se.Content,
    {
      "data-slot": "select-content",
      className: S(
        "cv:relative cv:z-50 cv:max-h-[var(--radix-select-content-available-height)] cv:min-w-[8rem] cv:origin-[var(--radix-select-content-transform-origin)] cv:overflow-hidden cv:rounded-md cv:border cv:border-border cv:bg-popover cv:text-popover-foreground cv:shadow-md cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "cv:data-[side=bottom]:translate-y-1 cv:data-[side=left]:-translate-x-1 cv:data-[side=right]:translate-x-1 cv:data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...a,
      children: [
        /* @__PURE__ */ i(pd, {}),
        /* @__PURE__ */ i(
          Se.Viewport,
          {
            className: S(
              "cv:p-1",
              n === "popper" && "cv:h-[var(--radix-select-trigger-height)] cv:w-full cv:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(gd, {})
      ]
    }
  ) });
}
function Rr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Se.Label,
    {
      "data-slot": "select-label",
      className: S("cv:px-2 cv:py-1.5 cv:text-xs cv:font-medium cv:text-muted-foreground", e),
      ...t
    }
  );
}
function we({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Se.Item,
    {
      "data-slot": "select-item",
      className: S(
        "cv:relative cv:flex cv:w-full cv:cursor-default cv:select-none cv:items-center cv:rounded-sm cv:py-1.5 cv:pl-2 cv:pr-8 cv:text-sm cv:outline-none cv:focus:bg-accent cv:focus:text-accent-foreground cv:data-[disabled]:pointer-events-none cv:data-[disabled]:opacity-50",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(Se.ItemIndicator, { children: /* @__PURE__ */ i(Ve, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(Se.ItemText, { children: t })
      ]
    }
  );
}
const Pt = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), bd = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", Xt = "yyyy-MM-dd";
function yd(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ia(e) {
  if (!e) return;
  const t = To(e, Xt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function xd({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, r = a.presets ?? vd, [o, c] = Tt(!1), s = typeof e == "string", [l, u] = yd(e), m = Ia(l), f = Ia(u), h = m ? { from: m, to: f } : void 0;
  let y;
  s ? y = $a(e) : m && f ? y = `${ge(m, "MMM d, yyyy")} – ${ge(f, "MMM d, yyyy")}` : m ? y = ge(m, "MMM d, yyyy") : y = "Pick a date range";
  const p = a.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Le, { open: o, onOpenChange: c, children: [
    /* @__PURE__ */ i(De, { asChild: !0, children: /* @__PURE__ */ v(
      Y,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          y === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(No, { className: "cv:mr-2 cv:size-4" }),
          y
        ]
      }
    ) }),
    /* @__PURE__ */ v(Te, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: r.map((g) => /* @__PURE__ */ i(
        Y,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), c(!1);
          },
          children: $a(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        ui,
        {
          mode: "range",
          selected: h,
          defaultMonth: m,
          disabled: p,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([ge(g.from, Xt), ge(g.to, Xt)]) : g != null && g.from ? t([ge(g.from, Xt), ge(g.from, Xt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const wd = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function kd(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Cd(e) {
  if (Array.isArray(e) && e.length === 2 && typeof e[0] == "string") {
    const t = Date.parse(e[0]), n = Date.parse(e[1]);
    if (!Number.isNaN(t) && !Number.isNaN(n)) return Math.max(1, Math.abs(n - t) / 864e5);
  }
  if (typeof e == "string") {
    const t = e.match(/(\d+)\s*(day|week|month|quarter|year)/i);
    if (t) {
      const a = { day: 1, week: 7, month: 30, quarter: 91, year: 365 };
      return Number(t[1]) * (a[t[2].toLowerCase()] ?? 1);
    }
    const n = e.toLowerCase();
    if (n.includes("today") || n.includes("yesterday")) return 1;
    if (n.includes("week")) return 7;
    if (n.includes("month")) return 30;
    if (n.includes("quarter")) return 91;
    if (n.includes("year")) return 365;
  }
}
function Nd({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { resolveValue: r } = ci(), o = a.rangeVariable ? Cd(r(a.rangeVariable)) : void 0, c = a.options ?? (o !== void 0 ? kd(o) : wd), s = typeof e == "string" ? e : "", l = c.join(",");
  return vn(() => {
    s && !c.includes(s) && t(c[0]);
  }, [s, l]), /* @__PURE__ */ v(
    Pe,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i($e, { className: Pt, children: /* @__PURE__ */ i(Ee, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Ie, { children: c.map((u) => /* @__PURE__ */ i(we, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Sd({ value: e, onChange: t, control: n }) {
  const a = n;
  if (a.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((c) => String(c))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(Pt, "cv:h-auto cv:min-h-[6rem]"),
        value: [...o],
        onChange: (c) => {
          const s = Array.from(c.target.selectedOptions, (u) => u.value), l = a.options.every((u) => typeof u.value == "number");
          t(l ? s.map((u) => Number(u)) : s);
        },
        children: a.options.map((c) => /* @__PURE__ */ i("option", { value: String(c.value), children: c.label }, String(c.value)))
      }
    );
  }
  const r = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ v(
    Pe,
    {
      value: r,
      onValueChange: (o) => {
        const c = a.options.find((s) => String(s.value) === o);
        t(c ? c.value : void 0);
      },
      children: [
        /* @__PURE__ */ i($e, { className: Pt, children: /* @__PURE__ */ i(Ee, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Ie, { children: a.options.map((o) => /* @__PURE__ */ i(we, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function _d({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { meta: r, isLoading: o } = Ze(), c = ce(() => {
    if (!r) return [];
    const s = [];
    for (const l of r.cubes)
      if (!(a.cube && l.name !== a.cube)) {
        if (a.from === "measure" || a.from === "dimensionOrMeasure")
          for (const u of l.measures) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (a.from === "dimension" || a.from === "dimensionOrMeasure")
          for (const u of l.dimensions) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return s;
  }, [r, a.cube, a.from]);
  return /* @__PURE__ */ v(
    "select",
    {
      className: Pt,
      value: typeof e == "string" ? e : "",
      disabled: o,
      onChange: (s) => t(s.target.value || void 0),
      children: [
        /* @__PURE__ */ i("option", { value: "", children: o ? "Loading…" : "—" }),
        c.map((s) => /* @__PURE__ */ i("option", { value: s.name, children: s.label }, s.name))
      ]
    }
  );
}
function Rd({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: Pt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (r) => t(r.target.value)
    }
  );
}
function Ad({ value: e, onChange: t, control: n }) {
  const a = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: Pt,
      min: a.min,
      max: a.max,
      step: a.step,
      value: typeof e == "number" ? e : "",
      onChange: (r) => {
        const o = r.target.value;
        t(o === "" ? void 0 : Number(o));
      }
    }
  );
}
function Md({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ v("label", { className: "cv:inline-flex cv:cursor-pointer cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        className: "cv:size-4 cv:rounded cv:border-input cv:text-primary cv:accent-primary cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        checked: e === !0,
        onChange: (r) => t(r.target.checked)
      }
    ),
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:text-foreground", children: n.label ?? n.name })
  ] });
}
const Od = {
  dateRange: xd,
  granularity: Nd,
  select: Sd,
  memberSelect: _d,
  text: Rd,
  number: Ad,
  toggle: Md
};
function Ld({ control: e, title: t }) {
  var y;
  const { registry: n } = He(), { decls: a, resolveValue: r, setVar: o } = ci(), c = ce(
    () => a.find((p) => p.name === e.variable),
    [a, e.variable]
  ), s = bo();
  if (!c)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, u = ((y = n.controls) == null ? void 0 : y[l]) ?? Od[l], m = r(e.variable), f = (p) => o(e.variable, p), h = t ?? c.label ?? c.name;
  return l === "toggle" ? /* @__PURE__ */ i(u, { value: m, onChange: f, decl: c, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: bd, htmlFor: s, children: h }),
    /* @__PURE__ */ i(
      u,
      {
        value: m,
        onChange: f,
        decl: c,
        control: e.control,
        controlId: s
      }
    )
  ] });
}
const mi = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S(
        "cv:rounded-xl cv:border cv:border-border cv:bg-card cv:text-card-foreground cv:shadow",
        e
      ),
      ...t
    }
  )
);
mi.displayName = "Card";
const di = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S(
        "cv:grid cv:auto-rows-min cv:grid-rows-[auto_auto] cv:items-start cv:gap-1.5 cv:px-6 cv:pt-6 cv:has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
        e
      ),
      ...t
    }
  )
);
di.displayName = "CardHeader";
const vi = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
vi.displayName = "CardTitle";
const Dd = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
Dd.displayName = "CardDescription";
const Td = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: S("cv:col-start-2 cv:row-span-2 cv:row-start-1 cv:self-start cv:justify-self-end", e),
      ...t
    }
  )
);
Td.displayName = "CardAction";
const fi = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
fi.displayName = "CardContent";
const zd = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
zd.displayName = "CardFooter";
const Dn = "cube-viz-drag-handle";
function hi(e) {
  var s;
  const { registry: t } = He(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: a, menu: r, dragHandleProps: o, children: c } = e;
  return /* @__PURE__ */ v(mi, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    a ? /* @__PURE__ */ v(
      di,
      {
        ...o,
        className: S(
          Dn,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(vi, { className: "cv:truncate cv:text-sm cv:font-semibold", children: a }),
          r
        ]
      }
    ) : null,
    /* @__PURE__ */ i(fi, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: c })
  ] });
}
class ja extends cc {
  constructor() {
    super(...arguments);
    Ca(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, a) {
    console.error("cube-viz: chart render failed", n, a.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ v(Vn, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Pr, {}),
      /* @__PURE__ */ i(qn, { children: "Failed to render chart" }),
      /* @__PURE__ */ i(Kn, { children: n.message })
    ] }) : this.props.children;
  }
}
function Fd(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    let c = o == null ? "" : String(o);
    return /^[=+\-@\t\r]/.test(c) && !Number.isFinite(Number(c)) && (c = `'${c}`), /[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
  }, a = t.map(n).join(","), r = e.map((o) => t.map((c) => n(o[c])).join(",")).join(`
`);
  return `${a}
${r}`;
}
function Pd(e, t, n = "text/csv;charset=utf-8") {
  const a = new Blob([e], { type: n }), r = URL.createObjectURL(a), o = document.createElement("a");
  o.href = r, o.download = t, o.style.display = "none", (document.body ?? document.documentElement).appendChild(o), o.click(), o.remove(), setTimeout(() => URL.revokeObjectURL(r), 0);
}
function Ed(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), a = n.createElement("base"), r = n.createElement("a");
  return n.head.appendChild(a), n.body.appendChild(r), t && (a.href = t), r.href = e, r.href;
}
const $d = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function it(e) {
  const t = [];
  for (let n = 0, a = e.length; n < a; n++)
    t.push(e[n]);
  return t;
}
let At = null;
function pi(e = {}) {
  return At || (e.includeStyleProperties ? (At = e.includeStyleProperties, At) : (At = it(window.getComputedStyle(document.documentElement)), At));
}
function Tn(e, t) {
  const a = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return a ? parseFloat(a.replace("px", "")) : 0;
}
function Id(e) {
  const t = Tn(e, "border-left-width"), n = Tn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function jd(e) {
  const t = Tn(e, "border-top-width"), n = Tn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function gi(e, t = {}) {
  const n = t.width || Id(e), a = t.height || jd(e);
  return { width: n, height: a };
}
function Vd() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Re = 16384;
function qd(e) {
  (e.width > Re || e.height > Re) && (e.width > Re && e.height > Re ? e.width > e.height ? (e.height *= Re / e.width, e.width = Re) : (e.width *= Re / e.height, e.height = Re) : e.width > Re ? (e.height *= Re / e.width, e.width = Re) : (e.width *= Re / e.height, e.height = Re));
}
function zn(e) {
  return new Promise((t, n) => {
    const a = new Image();
    a.onload = () => {
      a.decode().then(() => {
        requestAnimationFrame(() => t(a));
      });
    }, a.onerror = n, a.crossOrigin = "anonymous", a.decoding = "async", a.src = e;
  });
}
async function Kd(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Wd(e, t, n) {
  const a = "http://www.w3.org/2000/svg", r = document.createElementNS(a, "svg"), o = document.createElementNS(a, "foreignObject");
  return r.setAttribute("width", `${t}`), r.setAttribute("height", `${n}`), r.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), r.appendChild(o), o.appendChild(e), Kd(r);
}
const _e = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || _e(n, t);
};
function Hd(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Bd(e, t) {
  return pi(t).map((n) => {
    const a = e.getPropertyValue(n), r = e.getPropertyPriority(n);
    return `${n}: ${a}${r ? " !important" : ""};`;
  }).join(" ");
}
function Ud(e, t, n, a) {
  const r = `.${e}:${t}`, o = n.cssText ? Hd(n) : Bd(n, a);
  return document.createTextNode(`${r}{${o}}`);
}
function Va(e, t, n, a) {
  const r = window.getComputedStyle(e, n), o = r.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const c = $d();
  try {
    t.className = `${t.className} ${c}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Ud(c, n, r, a)), t.appendChild(s);
}
function Gd(e, t, n) {
  Va(e, t, ":before", n), Va(e, t, ":after", n);
}
const qa = "application/font-woff", Ka = "image/jpeg", Yd = {
  woff: qa,
  woff2: qa,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Ka,
  jpeg: Ka,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Qd(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function ta(e) {
  const t = Qd(e).toLowerCase();
  return Yd[t] || "";
}
function Jd(e) {
  return e.split(/,/)[1];
}
function Ar(e) {
  return e.search(/^(data:)/) !== -1;
}
function Xd(e, t) {
  return `data:${t};base64,${e}`;
}
async function bi(e, t, n) {
  const a = await fetch(e, t);
  if (a.status === 404)
    throw new Error(`Resource "${a.url}" not found`);
  const r = await a.blob();
  return new Promise((o, c) => {
    const s = new FileReader();
    s.onerror = c, s.onloadend = () => {
      try {
        o(n({ res: a, result: s.result }));
      } catch (l) {
        c(l);
      }
    }, s.readAsDataURL(r);
  });
}
const lr = {};
function Zd(e, t, n) {
  let a = e.replace(/\?.*/, "");
  return n && (a = e), /ttf|otf|eot|woff2?/i.test(a) && (a = a.replace(/.*\//, "")), t ? `[${t}]${a}` : a;
}
async function na(e, t, n) {
  const a = Zd(e, t, n.includeQueryParams);
  if (lr[a] != null)
    return lr[a];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let r;
  try {
    const o = await bi(e, n.fetchRequestInit, ({ res: c, result: s }) => (t || (t = c.headers.get("Content-Type") || ""), Jd(s)));
    r = Xd(o, t);
  } catch (o) {
    r = n.imagePlaceholder || "";
    let c = `Failed to fetch resource: ${e}`;
    o && (c = typeof o == "string" ? o : o.message), c && console.warn(c);
  }
  return lr[a] = r, r;
}
async function ev(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : zn(t);
}
async function tv(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), c = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, c == null || c.drawImage(e, 0, 0, o.width, o.height);
    const s = o.toDataURL();
    return zn(s);
  }
  const n = e.poster, a = ta(n), r = await na(n, a, t);
  return zn(r);
}
async function nv(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Jn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function rv(e, t) {
  return _e(e, HTMLCanvasElement) ? ev(e) : _e(e, HTMLVideoElement) ? tv(e, t) : _e(e, HTMLIFrameElement) ? nv(e, t) : e.cloneNode(yi(e));
}
const av = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", yi = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function ov(e, t, n) {
  var a, r;
  if (yi(t))
    return t;
  let o = [];
  return av(e) && e.assignedNodes ? o = it(e.assignedNodes()) : _e(e, HTMLIFrameElement) && (!((a = e.contentDocument) === null || a === void 0) && a.body) ? o = it(e.contentDocument.body.childNodes) : o = it(((r = e.shadowRoot) !== null && r !== void 0 ? r : e).childNodes), o.length === 0 || _e(e, HTMLVideoElement) || await o.reduce((c, s) => c.then(() => Jn(s, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function iv(e, t, n) {
  const a = t.style;
  if (!a)
    return;
  const r = window.getComputedStyle(e);
  r.cssText ? (a.cssText = r.cssText, a.transformOrigin = r.transformOrigin) : pi(n).forEach((o) => {
    let c = r.getPropertyValue(o);
    o === "font-size" && c.endsWith("px") && (c = `${Math.floor(parseFloat(c.substring(0, c.length - 2))) - 0.1}px`), _e(e, HTMLIFrameElement) && o === "display" && c === "inline" && (c = "block"), o === "d" && t.getAttribute("d") && (c = `path(${t.getAttribute("d")})`), a.setProperty(o, c, r.getPropertyPriority(o));
  });
}
function cv(e, t) {
  _e(e, HTMLTextAreaElement) && (t.innerHTML = e.value), _e(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function sv(e, t) {
  if (_e(e, HTMLSelectElement)) {
    const a = Array.from(t.children).find((r) => e.value === r.getAttribute("value"));
    a && a.setAttribute("selected", "");
  }
}
function lv(e, t, n) {
  return _e(t, Element) && (iv(e, t, n), Gd(e, t, n), cv(e, t), sv(e, t)), t;
}
async function uv(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const a = {};
  for (let o = 0; o < n.length; o++) {
    const s = n[o].getAttribute("xlink:href");
    if (s) {
      const l = e.querySelector(s), u = document.querySelector(s);
      !l && u && !a[s] && (a[s] = await Jn(u, t, !0));
    }
  }
  const r = Object.values(a);
  if (r.length) {
    const o = "http://www.w3.org/1999/xhtml", c = document.createElementNS(o, "svg");
    c.setAttribute("xmlns", o), c.style.position = "absolute", c.style.width = "0", c.style.height = "0", c.style.overflow = "hidden", c.style.display = "none";
    const s = document.createElementNS(o, "defs");
    c.appendChild(s);
    for (let l = 0; l < r.length; l++)
      s.appendChild(r[l]);
    e.appendChild(c);
  }
  return e;
}
async function Jn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((a) => rv(a, t)).then((a) => ov(e, a, t)).then((a) => lv(e, a, t)).then((a) => uv(a, t));
}
const xi = /url\((['"]?)([^'"]+?)\1\)/g, mv = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, dv = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function vv(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function fv(e) {
  const t = [];
  return e.replace(xi, (n, a, r) => (t.push(r), n)), t.filter((n) => !Ar(n));
}
async function hv(e, t, n, a, r) {
  try {
    const o = n ? Ed(t, n) : t, c = ta(t);
    let s;
    return r || (s = await na(o, c, a)), e.replace(vv(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function pv(e, { preferredFontFormat: t }) {
  return t ? e.replace(dv, (n) => {
    for (; ; ) {
      const [a, , r] = mv.exec(n) || [];
      if (!r)
        return "";
      if (r === t)
        return `src: ${a};`;
    }
  }) : e;
}
function wi(e) {
  return e.search(xi) !== -1;
}
async function ki(e, t, n) {
  if (!wi(e))
    return e;
  const a = pv(e, n);
  return fv(a).reduce((o, c) => o.then((s) => hv(s, c, t, n)), Promise.resolve(a));
}
async function Mt(e, t, n) {
  var a;
  const r = (a = t.style) === null || a === void 0 ? void 0 : a.getPropertyValue(e);
  if (r) {
    const o = await ki(r, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function gv(e, t) {
  await Mt("background", e, t) || await Mt("background-image", e, t), await Mt("mask", e, t) || await Mt("-webkit-mask", e, t) || await Mt("mask-image", e, t) || await Mt("-webkit-mask-image", e, t);
}
async function bv(e, t) {
  const n = _e(e, HTMLImageElement);
  if (!(n && !Ar(e.src)) && !(_e(e, SVGImageElement) && !Ar(e.href.baseVal)))
    return;
  const a = n ? e.src : e.href.baseVal, r = await na(a, ta(a), t);
  await new Promise((o, c) => {
    e.onload = o, e.onerror = t.onImageErrorHandler ? (...l) => {
      try {
        o(t.onImageErrorHandler(...l));
      } catch (u) {
        c(u);
      }
    } : c;
    const s = e;
    s.decode && (s.decode = o), s.loading === "lazy" && (s.loading = "eager"), n ? (e.srcset = "", e.src = r) : e.href.baseVal = r;
  });
}
async function yv(e, t) {
  const a = it(e.childNodes).map((r) => Ci(r, t));
  await Promise.all(a).then(() => e);
}
async function Ci(e, t) {
  _e(e, Element) && (await gv(e, t), await bv(e, t), await yv(e, t));
}
function xv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const a = t.style;
  return a != null && Object.keys(a).forEach((r) => {
    n[r] = a[r];
  }), e;
}
const Wa = {};
async function Ha(e) {
  let t = Wa[e];
  if (t != null)
    return t;
  const a = await (await fetch(e)).text();
  return t = { url: e, cssText: a }, Wa[e] = t, t;
}
async function Ba(e, t) {
  let n = e.cssText;
  const a = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (c) => {
    let s = c.replace(a, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), bi(s, t.fetchRequestInit, ({ result: l }) => (n = n.replace(c, `url(${l})`), [c, l]));
  });
  return Promise.all(o).then(() => n);
}
function Ua(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let a = e.replace(n, "");
  const r = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const l = r.exec(a);
    if (l === null)
      break;
    t.push(l[0]);
  }
  a = a.replace(r, "");
  const o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, c = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", s = new RegExp(c, "gi");
  for (; ; ) {
    let l = o.exec(a);
    if (l === null) {
      if (l = s.exec(a), l === null)
        break;
      o.lastIndex = s.lastIndex;
    } else
      s.lastIndex = o.lastIndex;
    t.push(l[0]);
  }
  return t;
}
async function wv(e, t) {
  const n = [], a = [];
  return e.forEach((r) => {
    if ("cssRules" in r)
      try {
        it(r.cssRules || []).forEach((o, c) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let s = c + 1;
            const l = o.href, u = Ha(l).then((m) => Ba(m, t)).then((m) => Ua(m).forEach((f) => {
              try {
                r.insertRule(f, f.startsWith("@import") ? s += 1 : r.cssRules.length);
              } catch (h) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: h
                });
              }
            })).catch((m) => {
              console.error("Error loading remote css", m.toString());
            });
            a.push(u);
          }
        });
      } catch (o) {
        const c = e.find((s) => s.href == null) || document.styleSheets[0];
        r.href != null && a.push(Ha(r.href).then((s) => Ba(s, t)).then((s) => Ua(s).forEach((l) => {
          c.insertRule(l, c.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(a).then(() => (e.forEach((r) => {
    if ("cssRules" in r)
      try {
        it(r.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${r.href}`, o);
      }
  }), n));
}
function kv(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => wi(t.style.getPropertyValue("src")));
}
async function Cv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = it(e.ownerDocument.styleSheets), a = await wv(n, t);
  return kv(a);
}
function Ni(e) {
  return e.trim().replace(/["']/g, "");
}
function Nv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(a) {
    (a.style.fontFamily || getComputedStyle(a).fontFamily).split(",").forEach((o) => {
      t.add(Ni(o));
    }), Array.from(a.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function Sv(e, t) {
  const n = await Cv(e, t), a = Nv(e);
  return (await Promise.all(n.filter((o) => a.has(Ni(o.style.fontFamily))).map((o) => {
    const c = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return ki(o.cssText, c, t);
  }))).join(`
`);
}
async function _v(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Sv(e, t);
  if (n) {
    const a = document.createElement("style"), r = document.createTextNode(n);
    a.appendChild(r), e.firstChild ? e.insertBefore(a, e.firstChild) : e.appendChild(a);
  }
}
async function Rv(e, t = {}) {
  const { width: n, height: a } = gi(e, t), r = await Jn(e, t, !0);
  return await _v(r, t), await Ci(r, t), xv(r, t), await Wd(r, n, a);
}
async function Av(e, t = {}) {
  const { width: n, height: a } = gi(e, t), r = await Rv(e, t), o = await zn(r), c = document.createElement("canvas"), s = c.getContext("2d"), l = t.pixelRatio || Vd(), u = t.canvasWidth || n, m = t.canvasHeight || a;
  return c.width = u * l, c.height = m * l, t.skipAutoScale || qd(c), c.style.width = `${u}`, c.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, c.width, c.height)), s.drawImage(o, 0, 0, c.width, c.height), c;
}
async function Mv(e, t = {}) {
  return (await Av(e, t)).toDataURL();
}
function Ov(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Lv(e, t) {
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
async function Tv(e, t, n = 2) {
  const a = await Mv(e, {
    pixelRatio: n,
    backgroundColor: Dv(e),
    cacheBust: !0
  });
  Lv(a, `${Ov(t)}.png`);
}
function zv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: a
}) {
  const [r, o] = x.useState(!1), [c, s] = x.useState(null), l = t.length > 0, u = !!a;
  if (!l && !n && !u) return null;
  const m = () => {
    const p = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Pd(Fd(t), `${p}.csv`);
  }, f = async () => {
    const p = a == null ? void 0 : a.current;
    if (!(!p || r)) {
      o(!0), s(null);
      try {
        await Tv(p, e);
      } catch (g) {
        s(g instanceof Error ? g.message : "Couldn't export the image.");
      } finally {
        o(!1);
      }
    }
  }, h = (p) => p.stopPropagation(), y = (p = !0) => S(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !p && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(Le, { children: [
    /* @__PURE__ */ i(
      De,
      {
        onMouseDown: h,
        onPointerDown: h,
        onTouchStart: h,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(yc, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Te, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: h, onPointerDown: h, onTouchStart: h, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: y(), children: [
        /* @__PURE__ */ i(xc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ v("button", { type: "button", onClick: f, disabled: r, className: y(!r), children: [
        /* @__PURE__ */ i(wc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: m, disabled: !l, className: y(l), children: [
        /* @__PURE__ */ i(kc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export CSV"
      ] }),
      c ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pt-1 cv:text-xs cv:text-destructive", children: c }) : null
    ] })
  ] });
}
function Ga({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(ea, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(md, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(Ld, { control: e.control, title: e.title });
  }
}
function Mr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [a, r] = Tt({ rows: [] }), o = ot(
    (l) => r({ rows: l.rows, refetch: l.refetch }),
    []
  ), c = ht(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(ja, { children: /* @__PURE__ */ i(Ga, { widget: e }) }) });
  const s = n ? null : /* @__PURE__ */ i(
    zv,
    {
      title: e.title,
      rows: a.rows,
      refetch: a.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ i(
    hi,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(ja, { children: /* @__PURE__ */ i(Ga, { widget: e, onState: o }) }) })
    }
  );
}
const Fv = "lg", Pv = 640;
function Ev(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function $v(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function zp({ spec: e, editable: t = !1, families: n }) {
  const [a, r] = si(), o = e.grid ?? {}, c = o.cols ?? 12, s = o.rowHeight ?? 40, l = o.margin ?? [12, 12], u = o.containerPadding ?? l, m = ce(
    () => ({ [Fv]: $v(e.layout) }),
    [e.layout]
  ), f = ce(
    () => new Map(e.widgets.map((y) => [y.id, y])),
    [e.widgets]
  ), h = !t && r > 0 && r < Pv;
  return /* @__PURE__ */ i(Jr, { families: n, children: /* @__PURE__ */ i(Xr, { spec: e, children: /* @__PURE__ */ i("div", { ref: a, className: "cv:w-full", children: r <= 0 ? null : h ? /* @__PURE__ */ i(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: l[1],
        padding: `${u[1]}px ${u[0]}px`
      },
      children: Ev(e.layout).map((y) => {
        const p = f.get(y.i);
        if (!p) return null;
        const g = y.h * s + (y.h - 1) * l[1];
        return /* @__PURE__ */ i("div", { style: { height: g }, children: /* @__PURE__ */ i(Mr, { widget: p, editable: !1 }) }, y.i);
      })
    }
  ) : /* @__PURE__ */ i(
    zo,
    {
      width: r,
      layouts: m,
      breakpoints: { lg: 0 },
      cols: { lg: c },
      rowHeight: s,
      margin: l,
      containerPadding: u,
      dragConfig: { enabled: t, handle: `.${Dn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((y) => {
        const p = f.get(y.i);
        return p ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(Mr, { widget: p, editable: t }) }, y.i) : null;
      })
    }
  ) }) }) });
}
function Fp({ spec: e, families: t }) {
  return /* @__PURE__ */ i(Jr, { families: t, children: /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
    hi,
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
      children: /* @__PURE__ */ i(ld, { spec: e })
    }
  ) }) });
}
function Xn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Iv(e) {
  if (!e.meta || typeof e.meta != "object") return [];
  const t = e.meta.joinTargets;
  return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
}
function Ye(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Zn(e) {
  return e ? e.cubes.filter((t) => Ye(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Xn(t),
    joinTargets: Iv(t)
  })) : [];
}
function cn(e, t) {
  if (!(!e || !t))
    return Zn(e).find((n) => n.name === t);
}
function ra(e) {
  return e.shortTitle || e.title || e.name;
}
function Ct(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Si(e) {
  return Ct(e.meta, "group");
}
function jv(e) {
  return Ct(e.meta, "geoPoint");
}
function Ya(e) {
  const t = Ct(e.meta, "geoRole");
  return t === "latitude" || t === "longitude" ? t : void 0;
}
function Vv(e, t) {
  return `geoPoint:${encodeURIComponent(e)}:${encodeURIComponent(t)}`;
}
function Nn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function qv(e, t) {
  if (t)
    return un(e, "time", t).find(Nn);
}
function Kv(e, t) {
  const n = [], a = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = Si(r), c = o ? `g:${o.toLowerCase()}` : `f:${t(r)}`;
    let s = a.get(c);
    s || (s = { label: o ?? t(r), items: [] }, a.set(c, s), n.push(c)), s.items.push(r);
  }
  return n.map((r) => [a.get(r).label, a.get(r).items]);
}
function _i(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ra(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Ct(n, "quantity"),
    unit: Ct(n, "unit")
  };
}
function Sn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: ra(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Ct(n, "quantity"),
    unit: Ct(n, "unit")
  };
}
function Ri(e, t) {
  return {
    name: e.name,
    label: ra(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Wv(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const r of e.dimensions) {
    const o = r.meta, c = jv({ meta: o });
    !c || !Ye(r) || n.set(c, [...n.get(c) ?? [], r]);
  }
  const a = [];
  for (const [r, o] of n) {
    const c = o.filter(
      (l) => l.type === "number" && Ya({ meta: l.meta }) === "latitude"
    ), s = o.filter(
      (l) => l.type === "number" && Ya({ meta: l.meta }) === "longitude"
    );
    o.length !== 2 || c.length !== 1 || s.length !== 1 || a.push({
      name: Vv(c[0].name, s[0].name),
      label: r,
      title: r,
      shortTitle: r,
      type: "geoPoint",
      memberType: "dimension",
      cube: e.name,
      connectedComponent: t,
      latMember: c[0].name,
      lngMember: s[0].name
    });
  }
  return a;
}
function un(e, t, n) {
  if (!e) return [];
  const a = [];
  for (const r of e.cubes) {
    if (!Ye(r) || n && r.name !== n) continue;
    const o = Xn(r), c = (s) => {
      s.connectedComponent = o, a.push(s);
    };
    if (t === "geoPoint") {
      a.push(...Wv(r, o));
      continue;
    }
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of r.measures)
        Ye(s) && c(_i(s, r.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of r.dimensions)
        Ye(s) && s.type !== "time" && c(Sn(s, r.name));
    if (t === "time")
      for (const s of r.dimensions)
        Ye(s) && s.type === "time" && c(Sn(s, r.name));
    if (t === "numberDimension")
      for (const s of r.dimensions)
        Ye(s) && s.type === "number" && c(Sn(s, r.name));
  }
  return a;
}
function Hv(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, a = [];
  for (const r of e.cubes) {
    if (!Ye(r) || n && !n.has(r.name)) continue;
    const o = Xn(r);
    for (const c of r.segments) {
      if (!Ye(c)) continue;
      const s = Ri(c, r.name);
      s.connectedComponent = o, a.push(s);
    }
  }
  return a;
}
function ze(e, t) {
  if (!(!e || !t)) {
    for (const n of e.cubes) {
      const a = Xn(n), r = (s) => (s && (s.connectedComponent = a), s), o = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (o)
        return o.type ? "aggType" in o ? r(_i(o, n.name)) : r(Sn(o, n.name)) : void 0;
      const c = n.segments.find((s) => s.name === t);
      if (c) return r(Ri(c, n.name));
    }
    return un(e, "geoPoint").find((n) => n.name === t);
  }
}
function Qa(e) {
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
const Or = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Ai = {
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
function Zt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Mi(e) {
  var c, s, l, u, m;
  const t = e.query ?? {}, n = (c = t.measures) == null ? void 0 : c.find(Boolean);
  if (n) return Zt(n);
  const a = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (a) return Zt(a);
  const r = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (r) return Zt(r);
  const o = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Zt(o);
}
function Et(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Ht(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Ae(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function dt(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Oi(e, t) {
  const n = {};
  for (const r of e) {
    const o = t[r];
    o && Object.keys(o).length > 0 && (n[r] = o);
  }
  const a = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (a.meta = n), a;
}
const Bv = "day";
function Uv(e, t, n) {
  var m, f, h, y;
  const { chart: a } = e, r = e.query ?? {}, o = Et(a).length ? Et(a) : r.measures ?? [], c = Ae(a) ?? ((m = r.dimensions) == null ? void 0 : m[0]) ?? ((h = (f = r.timeDimensions) == null ? void 0 : f[0]) == null ? void 0 : h.dimension), s = c ? { category: { member: c }, series: { mode: "measures", members: o } } : void 0, l = {
    ...e,
    chart: { ...a, family: t, mapping: void 0, familyOptions: void 0 }
  }, u = (p) => ({
    ...l,
    chart: { ...l.chart, ...p }
  });
  switch (t) {
    case "bar":
    case "line":
    case "area":
    case "pie":
      return u({ mapping: s });
    case "combo":
      return u({
        mapping: s,
        familyOptions: {
          series: o.map((p, g) => ({ member: p, render: g % 2 === 1 ? "bar" : "line" }))
        }
      });
    case "kpi":
      return u({
        familyOptions: { display: "number", ...o[0] ? { measure: o[0] } : {} }
      });
    case "scatter":
      return u({
        familyOptions: {
          ...o[0] ? { x: o[0] } : {},
          ...o[1] ? { y: o[1] } : {}
        }
      });
    case "table": {
      const p = [
        ...r.dimensions ?? [],
        ...((y = r.timeDimensions) == null ? void 0 : y.map((g) => g.dimension)) ?? [],
        ...o
      ].map((g) => ({ member: g }));
      return u({ familyOptions: p.length ? { columns: p } : void 0 });
    }
    default:
      return n.require(t).supportsMapping ? u({ mapping: s }) : l;
  }
}
function Yt(e) {
  return Bm(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Lr(e) {
  return Gm(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Gv(e, t) {
  return t.require(e).wells;
}
function Oe(e) {
  return e.chart.familyOptions ?? {};
}
function er(e) {
  const t = Oe(e).series;
  return Array.isArray(t) ? t : [];
}
function aa(e) {
  const t = Oe(e).columns;
  return Array.isArray(t) ? t : [];
}
function Yv(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function gn(e, t) {
  var c;
  const { chart: n } = e, a = n.family, r = (s) => s ? [s] : [], o = t.require(a).readWells;
  if (o) return o(e);
  switch (a) {
    case "bar":
    case "line":
    case "area": {
      const s = Yv(e), l = (c = n.mapping) == null ? void 0 : c.series;
      return { y: l && l.mode === "pivot" ? l.values && l.values.length > 0 ? l.values : r(l.value) : Et(n), x: r(Ae(n)), color: r(s) };
    }
    case "combo":
      return {
        x: r(Ae(n)),
        y: er(e).map((s) => s.member)
      };
    case "pie":
      return { slices: r(Ae(n)), size: r(Et(n)[0]) };
    case "scatter": {
      const s = Oe(e);
      return {
        sx: r(s.x),
        sy: r(s.y),
        size: r(s.size),
        color: r(s.groupBy)
      };
    }
    case "kpi":
      return { value: r(Oe(e).measure) };
    case "table":
      return { columns: aa(e).map((s) => s.member) };
    default:
      return {};
  }
}
function tr(e) {
  const t = Qv(e);
  return t === void 0 ? Bv : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Qv(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function bn(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Nt(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Bt(e, t) {
  return { ...e, dimensions: bn(e.dimensions, t) };
}
function We(e, t) {
  const n = Nt(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Je(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function St(e, t, n) {
  if (e)
    return { category: { member: e }, series: Oi(t, n) };
}
function Fn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function Pn(e, t, n, a) {
  if (!e || t.length === 0) return;
  const r = {};
  for (const s of t) {
    const l = a == null ? void 0 : a[s];
    l && Object.keys(l).length > 0 && (r[s] = l);
  }
  const o = Object.keys(r).length > 0, c = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: r } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: r } : {} };
  return { category: { member: e }, series: c };
}
function Qt(e, t, n, a, r, o) {
  const c = o.require(t).placeField;
  if (c) return c(e, n, a, r);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Xv(e, n, a, r, o);
    case "combo":
      return tf(e, n, a, r);
    case "pie":
      return af(e, n, a, r);
    case "scatter":
      return cf(e, n, a);
    case "kpi":
      return lf(e, a);
    case "table":
      return mf(e, a, r);
    default:
      return e;
  }
}
function Jv(e, t, n, a, r) {
  const o = r.require(t).removeField;
  if (o) return o(e, n, a);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return ef(e, n, a, r);
    case "combo":
      return rf(e, n, a);
    case "pie":
      return of(e, n, a);
    case "scatter":
      return sf(e, n, a);
    case "kpi":
      return uf(e, a);
    case "table":
      return df(e, a);
    default:
      return e;
  }
}
function Xv(e, t, n, a, r) {
  const { query: o, chart: c } = e, s = gn(e, r), l = s.color[0], u = Ae(c), m = Ht(c);
  if (t === "y") {
    const f = s.y, h = bn(f, n);
    return l ? {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: Pn(u, h, l, Fn(c)) }
    } : {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: St(u, h, m) }
    };
  }
  if (t === "x")
    return Zv(e, n, a, l, r);
  if (t === "color") {
    const f = s.y;
    if (f.length === 0) return e;
    const h = Bt({ ...o, measures: f }, n);
    return {
      ...e,
      query: h,
      chart: { ...c, mapping: Pn(u, f, n, Fn(c)) }
    };
  }
  return e;
}
function Zv(e, t, n, a, r) {
  const { query: o, chart: c } = e, s = Ae(c), l = gn(e, r).y, u = Ht(c);
  let m = o;
  const f = dt(o);
  if (f && s === f.dimension ? m = Je(m, void 0) : s && (m = We(m, s)), n === "time") {
    const y = (f == null ? void 0 : f.granularity) ?? tr(f == null ? void 0 : f.dateRange);
    m = Je(m, {
      dimension: t,
      granularity: y,
      dateRange: f == null ? void 0 : f.dateRange
    });
  } else
    m = Bt(m, t);
  const h = a ? Pn(t, l, a, Fn(c)) : St(t, l, u);
  return { ...e, query: m, chart: { ...c, mapping: h } };
}
function ef(e, t, n, a) {
  const { query: r, chart: o } = e, c = gn(e, a), s = Ae(o), l = c.color[0], u = Ht(o);
  if (t === "y") {
    const m = Nt(c.y, n);
    if (l && m.length >= 1)
      return {
        ...e,
        query: { ...r, measures: m },
        chart: { ...o, mapping: Pn(s, m, l, Fn(o)) }
      };
    const f = l ? We({ ...r, measures: m }, l) : { ...r, measures: m };
    return { ...e, query: f, chart: { ...o, mapping: St(s, m, u) } };
  }
  if (t === "x") {
    let m = r;
    const f = dt(r);
    return f && f.dimension === n ? m = Je(m, void 0) : m = We(m, n), { ...e, query: m, chart: { ...o, mapping: void 0 } };
  }
  if (t === "color") {
    const m = We(r, n);
    return {
      ...e,
      query: m,
      chart: { ...o, mapping: St(s, c.y, u) }
    };
  }
  return e;
}
const Ja = ["line", "bar"];
function tf(e, t, n, a) {
  const { query: r, chart: o } = e, c = Oe(e);
  if (t === "x") {
    let s = r;
    const l = Ae(o), u = dt(r);
    if (u && l === u.dimension ? s = Je(s, void 0) : l && (s = We(s, l)), a === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? tr(u == null ? void 0 : u.dateRange);
      s = Je(s, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Bt(s, n);
    return { ...e, query: s, chart: { ...o, mapping: { category: { member: n }, series: nf(e) } } };
  }
  if (t === "y") {
    const s = er(e);
    if (s.some((m) => m.member === n)) return e;
    const l = Ja[s.length % Ja.length], u = [...s, { member: n, render: l }];
    return {
      ...e,
      query: { ...r, measures: bn(r.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...c, series: u }, mapping: Li(o, u) }
    };
  }
  return e;
}
function Li(e, t) {
  const n = Ae(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((a) => a.member) } } : e.mapping;
}
function nf(e) {
  return { mode: "measures", members: er(e).map((t) => t.member) };
}
function rf(e, t, n) {
  const { query: a, chart: r } = e, o = Oe(e);
  if (t === "x") {
    let c = a;
    const s = dt(a);
    return s && s.dimension === n ? c = Je(c, void 0) : c = We(c, n), { ...e, query: c, chart: { ...r, mapping: void 0 } };
  }
  if (t === "y") {
    const c = er(e).filter((l) => l.member !== n), s = Nt(a.measures, n);
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...r, familyOptions: { ...o, series: c }, mapping: Li(r, c) }
    };
  }
  return e;
}
function af(e, t, n, a) {
  const { query: r, chart: o } = e, c = Ht(o);
  if (t === "slices") {
    let s = r;
    const l = Ae(o), u = dt(r);
    if (u && l === u.dimension ? s = Je(s, void 0) : l && (s = We(s, l)), a === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? tr(u == null ? void 0 : u.dateRange);
      s = Je(s, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Bt(s, n);
    return {
      ...e,
      query: s,
      chart: { ...o, mapping: St(n, Et(o), c) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...r, measures: s },
      chart: { ...o, mapping: St(Ae(o), s, c) }
    };
  }
  return e;
}
function of(e, t, n) {
  const { query: a, chart: r } = e, o = Ht(r);
  if (t === "slices") {
    let c = a;
    const s = dt(a);
    return s && s.dimension === n ? c = Je(c, void 0) : c = We(c, n), { ...e, query: c, chart: { ...r, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...a, measures: [] },
    chart: { ...r, mapping: St(Ae(r), [], o) }
  } : e;
}
const Di = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function cf(e, t, n) {
  const a = Di[t];
  if (!a) return e;
  const { query: r, chart: o } = e, c = { ...Oe(e) }, s = c[a];
  c[a] = n;
  let l = r;
  if (a === "groupBy")
    s && s !== n && (l = We(l, s)), l = Bt(l, n);
  else {
    const u = s ? Nt(r.measures, s) : r.measures;
    l = { ...r, measures: bn(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: c } };
}
function sf(e, t, n) {
  const a = Di[t];
  if (!a) return e;
  const { query: r, chart: o } = e, c = { ...Oe(e) };
  delete c[a];
  let s = r;
  if (a === "groupBy") s = We(s, n);
  else {
    const l = Nt(r.measures, n);
    s = { ...r, measures: l.length ? l : [] };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: c } };
}
function lf(e, t) {
  const { query: n, chart: a } = e, r = { ...Oe(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...a, familyOptions: r } };
}
function uf(e, t) {
  const { query: n, chart: a } = e, r = { ...Oe(e) };
  return r.measure === t && delete r.measure, { ...e, query: { ...n, measures: [] }, chart: { ...a, familyOptions: r } };
}
function mf(e, t, n) {
  const { query: a, chart: r } = e, o = aa(e);
  if (o.some((l) => l.member === t)) return e;
  let c = a;
  if (n === "number") c = { ...a, measures: bn(a.measures, t) };
  else if (n === "time") {
    const l = dt(a), u = (l == null ? void 0 : l.granularity) ?? tr(l == null ? void 0 : l.dateRange), m = a.timeDimensions ?? [];
    m.some((f) => f.dimension === t) || (c = { ...a, timeDimensions: [...m, { dimension: t, granularity: u }] });
  } else c = Bt(a, t);
  const s = { ...Oe(e), columns: [...o, { member: t }] };
  return { ...e, query: c, chart: { ...r, familyOptions: s } };
}
function df(e, t) {
  var m, f, h;
  const { query: n, chart: a } = e, r = aa(e).filter((y) => y.member !== t);
  let o = n;
  const c = Nt(n.measures, t);
  c.length !== (((m = n.measures) == null ? void 0 : m.length) ?? 0) && (o = { ...o, measures: c.length ? c : void 0 });
  const s = Nt(n.dimensions, t);
  s.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: s.length ? s : void 0 });
  const l = (n.timeDimensions ?? []).filter((y) => y.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...Oe(e), columns: r };
  return { ...e, query: o, chart: { ...a, familyOptions: u } };
}
const be = x.forwardRef(
  ({ className: e, type: t, ...n }, a) => /* @__PURE__ */ i(
    "input",
    {
      ref: a,
      type: t,
      "data-slot": "input",
      className: S(
        "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground cv:shadow-sm cv:transition-colors cv:file:border-0 cv:file:bg-transparent cv:file:text-sm cv:file:font-medium cv:placeholder:text-muted-foreground cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50",
        e
      ),
      ...n
    }
  )
);
be.displayName = "Input";
function En(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(_o, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(fr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "geoPoint":
      return /* @__PURE__ */ i(So, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i($r, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function Ti({
  cube: e,
  cubes: t,
  kind: n,
  value: a,
  onChange: r,
  placeholder: o = "Select member…",
  disabled: c,
  id: s,
  className: l
}) {
  const { meta: u, isLoading: m } = Ze(), f = x.useMemo(() => {
    if (t) {
      const g = new Set(t);
      return un(u, n).filter((b) => g.has(b.cube));
    }
    return un(u, n, e);
  }, [u, n, e, t]), h = x.useMemo(() => {
    const g = vf(f), b = g.length > 1, w = [];
    for (const [k, C] of g)
      for (const [_, N] of Kv(C, () => "Other")) {
        const L = b ? _ === "Other" ? k : `${k} · ${_}` : _;
        w.push({ key: `${k}:${_}`, label: L, items: N });
      }
    return w;
  }, [f]), y = h.length > 1, p = f.find((g) => g.name === a);
  return /* @__PURE__ */ v(Pe, { value: a, onValueChange: r, disabled: c || m, children: [
    /* @__PURE__ */ i($e, { id: s, className: l, children: /* @__PURE__ */ i(Ee, { placeholder: m ? "Loading…" : o, children: p ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      En(p.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Ie, { children: h.map((g) => /* @__PURE__ */ v(_r, { children: [
      y && g.label ? /* @__PURE__ */ i(Rr, { children: g.label }) : null,
      g.items.map((b) => /* @__PURE__ */ i(we, { value: b.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        En(b.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: b.label })
      ] }) }, b.name))
    ] }, g.key)) })
  ] });
}
function vf(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.cube);
    a ? a.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function mn({
  options: e,
  value: t,
  onChange: n,
  fullWidth: a = !0,
  size: r = "default",
  disabled: o,
  "aria-label": c,
  className: s
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "segmented-control",
      role: "radiogroup",
      "aria-label": c,
      className: S(
        "cv:flex cv:flex-wrap cv:gap-1 cv:rounded-lg cv:bg-muted cv:p-1 cv:text-muted-foreground",
        s
      ),
      children: e.map((l) => {
        const u = l.value === t;
        return /* @__PURE__ */ v(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: l.title,
            disabled: o || l.disabled,
            onClick: () => n(l.value),
            className: S(
              "cv:inline-flex cv:items-center cv:justify-center cv:gap-1.5 cv:whitespace-nowrap cv:rounded-md cv:font-medium cv:transition-all cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:pointer-events-none cv:disabled:opacity-50",
              r === "sm" ? "cv:h-7 cv:px-2 cv:text-xs" : "cv:h-7 cv:px-2.5 cv:text-sm",
              a && "cv:flex-1",
              u ? "cv:bg-background cv:text-foreground cv:shadow-sm" : "cv:hover:text-foreground"
            ),
            children: [
              l.icon,
              l.label
            ]
          },
          l.value
        );
      })
    }
  );
}
const Xa = {
  geoPoint: { label: "Location", icon: /* @__PURE__ */ i(So, { className: "cv:size-3" }), metaKind: "geoPoint" },
  number: { label: "Numbers", icon: /* @__PURE__ */ i(fr, { className: "cv:size-3" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ i(fr, { className: "cv:size-3" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ i($r, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(_o, { className: "cv:size-3" }), metaKind: "time" }
}, ff = ["geoPoint", "number", "numberDimension", "category", "time"];
function zi({
  well: e,
  placed: t,
  scope: n,
  blockReason: a,
  onSelect: r,
  align: o = "start",
  side: c = "bottom",
  children: s
}) {
  var O, z;
  const { meta: l, isLoading: u } = Ze(), [m, f] = x.useState(!1), [h, y] = x.useState(""), [p, g] = x.useState(n.viewLocked ?? "tables"), [b, w] = x.useState({});
  x.useEffect(() => {
    m && g(n.viewLocked ?? "tables");
  }, [m, n.viewLocked]);
  const k = x.useMemo(() => new Set(t), [t]), C = h.trim().toLowerCase(), _ = x.useMemo(() => {
    if (p !== "tables") {
      const D = n.views.find((Q) => Q.name === p) ?? cn(l, p);
      return D ? [{ cube: D, tag: "dataset" }] : [];
    }
    const R = [];
    n.sourceCube && R.push({ cube: n.sourceCube, tag: "source" });
    for (const D of n.relatedCubes) R.push({ cube: D, tag: "related" });
    return R;
  }, [p, n, l]), N = e.kinds.length > 1, L = (R) => {
    const D = [], Q = /* @__PURE__ */ new Map();
    for (const Z of ff) {
      if (!e.kinds.includes(Z)) continue;
      const ee = Xa[Z];
      let P = un(l, ee.metaKind, R);
      Z === "time" && (P = [...P].sort(
        (W, H) => Number(Nn(H)) - Number(Nn(W))
      ));
      for (const W of P) {
        if (k.has(W.name) || C && !(W.label.toLowerCase().includes(C) || W.name.toLowerCase().includes(C))) continue;
        const H = Si(W), B = H ? `g:${H.toLowerCase()}` : `k:${ee.label}`;
        let re = Q.get(B);
        re || (re = { key: B, label: H ?? ee.label, headerIcon: H ? void 0 : ee.icon, items: [] }, Q.set(B, re), D.push(B)), re.items.push({ option: W, kind: Z });
      }
    }
    return D.map((Z) => Q.get(Z));
  }, T = _.map((R) => ({ section: R, groups: L(R.cube.name) })).filter((R) => R.groups.length > 0), I = T.length > 0, q = (R, D) => {
    r(R, D), f(!1), y("");
  }, A = p === "tables" ? "All related tables" : ((O = n.views.find((R) => R.name === p)) == null ? void 0 : O.title) ?? ((z = cn(l, p)) == null ? void 0 : z.title) ?? p;
  return /* @__PURE__ */ v(Le, { open: m, onOpenChange: f, children: [
    /* @__PURE__ */ i(De, { asChild: !0, children: s }),
    /* @__PURE__ */ v(Te, { align: o, side: c, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(Cc, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: h,
              onChange: (R) => y(R.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:text-foreground cv:outline-none cv:placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(
          hf,
          {
            browse: p,
            label: A,
            views: n.viewLocked ? n.views.filter((R) => R.name === n.viewLocked) : [],
            onBrowse: g
          }
        )
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: I ? T.map(({ section: R, groups: D }, Q) => {
        const Z = D.reduce((H, B) => H + B.items.length, 0), ee = R.tag === "related", P = b[R.cube.name] ?? ee, W = C.length > 0 ? !0 : !P;
        return /* @__PURE__ */ v("div", { children: [
          R.tag === "related" && Q > 0 && T[Q - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => w((H) => ({ ...H, [R.cube.name]: !P })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:text-foreground cv:hover:bg-accent/50",
              children: [
                W ? /* @__PURE__ */ i(lt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(fn, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(Ro, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: R.cube.title }),
                R.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : R.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: Z })
              ]
            }
          ),
          W ? D.map((H) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            D.length > 1 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              H.headerIcon,
              H.label
            ] }) : null,
            H.items.map(({ option: B, kind: re }) => /* @__PURE__ */ i(
              pf,
              {
                option: B,
                kindIcon: N ? Xa[re].icon : void 0,
                badge: re === "time" && Nn(B) ? "default" : void 0,
                reason: a(B),
                onPick: () => q(B.name, re)
              },
              B.name
            ))
          ] }, H.key)) : null
        ] }, R.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function hf({ browse: e, label: t, views: n, onBrowse: a }) {
  const [r, o] = x.useState(!1), c = (s) => {
    a(s), o(!1);
  };
  return /* @__PURE__ */ v(Le, { open: r, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      De,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:text-foreground cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(Ao, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Te, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(Za, { active: e === "tables", icon: /* @__PURE__ */ i(Ro, { className: "cv:size-3.5" }), onClick: () => c("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(ue, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ i(
          Za,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ i(Ir, { className: "cv:size-3.5" }),
            onClick: () => c(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function Za({
  active: e,
  icon: t,
  onClick: n,
  children: a
}) {
  return /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: n,
      className: S(
        "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-foreground cv:hover:bg-accent",
        e && "cv:bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: t }),
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: a }),
        e ? /* @__PURE__ */ i(Ve, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function pf({ option: e, reason: t, onPick: n, kindIcon: a, badge: r }) {
  return t ? /* @__PURE__ */ v(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv:flex cv:cursor-not-allowed cv:items-center cv:justify-between cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:opacity-45 cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-1.5", children: [
          a,
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.label })
        ] }),
        /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: "Not available" })
      ]
    }
  ) : /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: n,
      title: e.description ?? e.name,
      className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-foreground cv:hover:bg-accent cv:hover:text-accent-foreground",
      children: [
        a,
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:truncate", children: e.label }),
        r ? /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: r }) : null
      ]
    }
  );
}
const gf = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], en = "yyyy-MM-dd";
function bf(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function eo(e) {
  if (!e) return;
  const t = To(e, en, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function oa({ value: e, onChange: t }) {
  const [n, a] = x.useState(!1), r = typeof e == "string", [o, c] = bf(e), s = eo(o), l = eo(c), u = s ? { from: s, to: l } : void 0, m = r ? e : s && l ? `${ge(s, "MMM d, yyyy")} – ${ge(l, "MMM d, yyyy")}` : s ? ge(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Le, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(De, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(No, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", m === "Any time" && "cv:text-muted-foreground"), children: m })
    ] }) }),
    /* @__PURE__ */ v(Te, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        gf.map((f) => /* @__PURE__ */ i(
          Y,
          {
            variant: "ghost",
            size: "sm",
            className: S("cv:justify-start cv:font-normal", e === f && "cv:bg-accent"),
            onClick: () => {
              t(f), a(!1);
            },
            children: f
          },
          f
        )),
        /* @__PURE__ */ i(
          Y,
          {
            variant: "ghost",
            size: "sm",
            className: "cv:justify-start cv:font-normal cv:text-muted-foreground",
            onClick: () => {
              t(void 0), a(!1);
            },
            children: "Any time"
          }
        )
      ] }),
      /* @__PURE__ */ i(
        ui,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([ge(f.from, en), ge(f.to, en)]) : f != null && f.from ? t([ge(f.from, en), ge(f.from, en)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function yf(e) {
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
function xf(e, t) {
  const n = new Set(yf(t));
  return e.filter((a) => n.has(a.type));
}
function wf(e) {
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
function kf(e, t, n) {
  const a = new Set(n.map((s) => s.name)), r = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = r, c = 2;
  for (; a.has(o); ) o = `${r}_${c++}`;
  return o;
}
function Cf(e, t, n) {
  const a = wf(e), r = { name: kf(t, e, n), type: a }, o = t.trim();
  return o && (r.label = o), a === "dateRange" ? r.default = "last 7 days" : a === "granularity" && (r.default = "day"), r;
}
const Fi = x.createContext({});
function Nf({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(Fi.Provider, { value: n, children: t });
}
function Sf() {
  return x.useContext(Fi);
}
function _f({ kind: e, value: t, onChange: n, className: a }) {
  const r = Zr(), o = (r == null ? void 0 : r.decls) ?? [], { createVariable: c } = Sf(), [s, l] = x.useState(!1), [u, m] = x.useState(!1), [f, h] = x.useState(""), y = x.useMemo(() => xf(o, e), [o, e]), p = y.find((w) => w.name === t), g = (w) => {
    n(w), l(!1), m(!1);
  }, b = () => {
    if (!c) return;
    const w = Cf(e, f || "Variable", o);
    c(w), g(w.name), h("");
  };
  return /* @__PURE__ */ v(
    Le,
    {
      open: s,
      onOpenChange: (w) => {
        l(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ i(De, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", a), children: [
          /* @__PURE__ */ i(Nc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !p && "cv:text-muted-foreground"), children: p ? p.label ?? p.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Te, { align: "start", className: "cv:w-60 cv:p-1", children: [
          y.length > 0 ? y.map((w) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => g(w.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: w.label ?? w.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: w.type }),
                w.name === t ? /* @__PURE__ */ i(Ve, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          c ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              be,
              {
                autoFocus: !0,
                value: f,
                onChange: (w) => h(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && b(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv:h-7 cv:text-sm"
              }
            ),
            /* @__PURE__ */ i(Y, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: b, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground",
              children: [
                /* @__PURE__ */ i(zt, { className: "cv:size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function $t({ kind: e, value: t, onChange: n, renderFixed: a }) {
  const r = Fe(t), [o, c] = x.useState(r ? "var" : "fixed");
  x.useEffect(() => {
    r && c("var");
  }, [r]);
  const s = (l) => S(
    "cv:flex-1 cv:rounded-sm cv:px-2 cv:py-1 cv:text-center cv:transition-colors",
    l ? "cv:bg-background cv:font-medium cv:shadow-sm" : "cv:text-muted-foreground cv:hover:text-foreground"
  );
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:rounded-md cv:bg-muted cv:p-0.5 cv:text-[11px]", children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          className: s(o === "fixed"),
          onClick: () => {
            c("fixed"), Fe(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: s(o === "var"), onClick: () => c("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      _f,
      {
        kind: e,
        value: Fe(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : a(Fe(t) ? void 0 : t, (l) => n(l))
  ] });
}
const Rf = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function ur(e) {
  return "member" in e && "operator" in e;
}
function Af({
  cube: e,
  cubes: t,
  scope: n,
  value: a,
  onChange: r,
  disabled: o,
  className: c
}) {
  var A;
  const { meta: s } = Ze(), l = ((A = Zr()) == null ? void 0 : A.decls) ?? [], [u, m] = x.useState(null), [f, h] = x.useState(null), y = a ?? [], p = y.length === 1 && !ur(y[0]) && "or" in y[0] && Array.isArray(y[0].or) && y[0].or.every(ur) ? y[0] : void 0, g = p ? "any" : "all", b = [], w = [];
  p || y.forEach((O) => ur(O) ? b.push(O) : w.push(O));
  const k = p ? p.or : b, C = w.length === 0 && (k.length >= 2 || g === "any"), _ = (O) => g === "any" ? O.length ? [{ or: O }] : [] : [...O, ...w], N = (O) => {
    const z = O.filter((D) => D.member.length > 0), R = _(z);
    r(R.length > 0 ? R : void 0);
  }, L = (O) => {
    const z = O === "any" ? k.length ? [{ or: k }] : [] : [...k];
    r(z.length > 0 ? z : void 0);
  }, T = (O, z) => N(k.map((R, D) => D === O ? { ...R, ...z } : R)), I = (O) => N(k.filter((z, R) => R !== O)), q = (O) => {
    const R = { ...f ?? { member: "", operator: "equals", values: [] }, ...O };
    R.member ? (h(null), m(k.length), N([...k, R])) : h(R);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", c), children: [
    k.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    C ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        mn,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: g,
          onChange: L
        }
      ),
      /* @__PURE__ */ i("span", { children: "of these" })
    ] }) : null,
    k.map((O, z) => {
      const R = ze(s, O.member);
      return u === z ? /* @__PURE__ */ i(
        to,
        {
          leaf: O,
          member: R,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (D) => T(z, D),
          onDone: () => m(null),
          onRemove: () => I(z)
        },
        z
      ) : /* @__PURE__ */ i(
        Mf,
        {
          text: Of(O, R == null ? void 0 : R.label, l),
          disabled: o,
          onEdit: () => m(z),
          onRemove: () => I(z)
        },
        z
      );
    }),
    f ? /* @__PURE__ */ i(
      to,
      {
        leaf: f,
        member: ze(s, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: q,
        onRemove: () => h(null)
      }
    ) : null,
    w.length > 0 ? /* @__PURE__ */ v("p", { className: "cv:text-xs cv:text-muted-foreground", children: [
      w.length,
      " grouped filter",
      w.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ v(
      Y,
      {
        variant: "outline",
        size: "sm",
        className: "cv:w-full cv:justify-start",
        disabled: o || !!f,
        onClick: () => {
          m(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(zt, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Mf({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: a
}) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: n,
        className: "cv:min-w-0 cv:flex-1 cv:truncate cv:px-3 cv:py-2 cv:text-left cv:text-sm cv:text-foreground cv:hover:text-foreground",
        title: "Edit filter",
        children: e
      }
    ),
    /* @__PURE__ */ i(
      Y,
      {
        variant: "ghost",
        size: "icon",
        className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
        disabled: t,
        onClick: a,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(It, { className: "cv:size-4" })
      }
    )
  ] });
}
function to({
  leaf: e,
  member: t,
  cube: n,
  cubes: a,
  scope: r,
  disabled: o,
  onChange: c,
  onDone: s,
  onRemove: l
}) {
  const { meta: u } = Ze(), m = Qa(t == null ? void 0 : t.type), f = m.includes(e.operator) ? e.operator : m[0], h = !Or.has(f);
  x.useEffect(() => {
    f !== e.operator && c({ operator: f });
  }, [e.operator, c, f]);
  const y = (p) => {
    const g = ze(u, p);
    c({ member: p, operator: Qa(g == null ? void 0 : g.type)[0], values: [] });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        s && e.member ? /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: s, children: [
          /* @__PURE__ */ i(Ve, { className: "cv:size-3.5" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ i(
          Y,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-7 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            disabled: o,
            onClick: l,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ i(It, { className: "cv:size-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Field" }),
      r ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ i(
          zi,
          {
            well: Rf,
            placed: [],
            scope: r,
            blockReason: () => {
            },
            onSelect: y,
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: o,
                className: "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:text-sm cv:text-foreground cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50",
                children: [
                  t ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                    En(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(lt, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        Ti,
        {
          cube: n,
          cubes: a,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: y,
          placeholder: "Choose a field…",
          disabled: o
        }
      )
    ] }),
    /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ v(
        Pe,
        {
          value: f,
          onValueChange: (p) => c({
            operator: p,
            values: Or.has(p) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i($e, { className: "cv:w-full", children: /* @__PURE__ */ i(Ee, {}) }),
            /* @__PURE__ */ i(Ie, { children: m.map((p) => /* @__PURE__ */ i(we, { value: p, children: Ai[p] }, p)) })
          ]
        }
      )
    ] }),
    h ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        Lf,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (p) => c({ values: p })
        }
      )
    ] }) : null
  ] });
}
function Of(e, t, n) {
  const a = t ?? e.member;
  if (!a) return "New filter";
  const r = Ai[e.operator] ?? e.operator;
  if (Or.has(e.operator)) return `${a} ${r}`;
  const o = (e.values ?? []).map((c) => {
    if (Fe(c)) {
      const s = n.find((l) => l.name === c.var);
      return `{${((s == null ? void 0 : s.label) ?? c.var).replace(/[{}]/g, "")}}`;
    }
    return String(c);
  });
  return o.length > 0 ? `${a} ${r} ${o.join(", ")}` : `${a} ${r} …`;
}
function Lf({ values: e, memberType: t, onChange: n }) {
  const a = e ?? [], r = a.length === 1 && Fe(a[0]);
  if (t === "time") {
    const s = r ? a[0] : Df(a);
    return /* @__PURE__ */ i(
      $t,
      {
        kind: "dateRange",
        value: s,
        onChange: (l) => n(l === void 0 ? [] : Fe(l) ? [l] : Tf(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(oa, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = r ? a[0] : a.filter((s) => !Fe(s));
  return /* @__PURE__ */ i(
    $t,
    {
      kind: o,
      value: c,
      onChange: (s) => n(s === void 0 ? [] : Fe(s) ? [s] : s),
      renderFixed: (s, l) => /* @__PURE__ */ i(
        be,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => l(zf(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function Df(e) {
  const t = e.filter((n) => !Fe(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Tf(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function zf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Ff({ spec: e, update: t, cube: n, scopeCubes: a, scope: r }) {
  const { query: o } = e, c = (o.filters ?? []).length, s = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(Le, { children: [
    /* @__PURE__ */ v(
      De,
      {
        className: S(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          c > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(Sc, { className: "cv:size-4" }),
          "Filter",
          c > 0 ? /* @__PURE__ */ i("span", { className: "cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground", children: c }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(Te, { align: "end", className: "cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(Pf, { spec: e, update: t, scopeCubes: a }),
      /* @__PURE__ */ i(Af, { cube: n, cubes: a, scope: r, value: o.filters, onChange: s })
    ] })
  ] });
}
function Pf({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: a } = Ze(), r = Hv(a, n);
  if (r.length === 0) return null;
  const o = new Set(e.query.segments ?? []), c = (s) => {
    const l = new Set(o);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = [...l];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-b cv:border-border cv:pb-2", children: [
    /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: r.map((s) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => c(s.name),
        title: s.description ?? s.name,
        className: S(
          "cv:rounded-full cv:border cv:px-2.5 cv:py-1 cv:text-xs cv:transition-colors",
          o.has(s.name) ? "cv:border-ring cv:bg-accent cv:text-foreground" : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function Ef({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: a } = Ze(), r = x.useMemo(() => Zn(a), [a]), o = r.filter((b) => b.type === "view"), c = r.filter((b) => b.type === "cube"), s = r.find((b) => b.name === e), [l, u] = x.useState(!1), [m, f] = x.useState(null), h = (b) => {
    if (b === e) {
      u(!1);
      return;
    }
    t ? f(b) : (n(b), u(!1));
  }, y = () => {
    m && n(m), f(null), u(!1);
  }, p = m ? ((g = r.find((b) => b.name === m)) == null ? void 0 : g.title) ?? m : "";
  return /* @__PURE__ */ v(
    Le,
    {
      open: l,
      onOpenChange: (b) => {
        u(b), b || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          De,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:text-foreground cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(Ao, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !s && "cv:text-muted-foreground"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Te, { align: "start", className: "cv:w-64 cv:p-1", children: m ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: p }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(Y, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(Y, { size: "sm", className: "cv:h-7", onClick: y, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(ue, { children: [
            /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
            o.map((b) => /* @__PURE__ */ i(
              no,
              {
                icon: /* @__PURE__ */ i(Ir, { className: "cv:size-3.5" }),
                label: b.title,
                active: b.name === e,
                onClick: () => h(b.name)
              },
              b.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Tables" }),
          c.map((b) => /* @__PURE__ */ i(
            no,
            {
              icon: /* @__PURE__ */ i(Mo, { className: "cv:size-3.5" }),
              label: b.title,
              active: b.name === e,
              onClick: () => h(b.name)
            },
            b.name
          ))
        ] }) })
      ]
    }
  );
}
function no({
  icon: e,
  label: t,
  active: n,
  onClick: a
}) {
  return /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: a,
      className: S(
        "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-foreground cv:hover:bg-accent",
        n && "cv:bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: e }),
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: t }),
        n ? /* @__PURE__ */ i(Ve, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function ro(e, t, n, a) {
  var o;
  const r = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...r, ...a } } } });
}
function ao({
  spec: e,
  update: t,
  axis: n,
  title: a,
  auto: r
}) {
  var s;
  const o = ((s = e.chart.axes) == null ? void 0 : s[n]) ?? {}, c = o.labelHide === !0;
  return /* @__PURE__ */ v(
    "div",
    {
      className: S(
        "cv:flex cv:w-full cv:min-w-[8rem] cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-1.5 cv:py-1 cv:transition-opacity",
        c && "cv:opacity-50"
      ),
      children: [
        a ? /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: a }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: r ?? "Axis title",
            disabled: c,
            onChange: (l) => ro(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${r ? ` — defaults to “${r}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:text-foreground cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          If,
          {
            hidden: c,
            what: "axis title",
            onClick: () => ro(e, t, n, { labelHide: c ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function $f({
  spec: e,
  update: t
}) {
  var a;
  const n = ((a = e.chart.legend) == null ? void 0 : a.show) === !1;
  return /* @__PURE__ */ v("div", { className: S("cv:flex cv:flex-col cv:gap-1 cv:transition-opacity", n && "cv:opacity-50"), children: [
    /* @__PURE__ */ i("span", { className: "cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Show legend" }),
    /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2 cv:py-1 cv:text-xs cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        children: [
          n ? /* @__PURE__ */ i(Oo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(Lo, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function If({
  hidden: e,
  what: t,
  onClick: n
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: n,
      "aria-label": e ? `Show ${t}` : `Hide ${t}`,
      title: e ? `Show ${t}` : `Hide ${t}`,
      className: "cv:rounded cv:p-0.5 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
      children: e ? /* @__PURE__ */ i(Oo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(Lo, { className: "cv:size-3.5" })
    }
  );
}
const Pi = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: S(
        "cv:flex cv:items-center cv:gap-2 cv:text-sm cv:font-medium cv:leading-none cv:select-none cv:peer-disabled:cursor-not-allowed cv:peer-disabled:opacity-70",
        e
      ),
      ...t
    }
  )
);
Pi.displayName = "Label";
function pe({
  label: e,
  hint: t,
  error: n,
  htmlFor: a,
  action: r,
  className: o,
  children: c
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: S("cv:flex cv:flex-col cv:gap-1.5 cv:py-1.5", o), children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i(Pi, { htmlFor: a, className: "cv:text-muted-foreground", children: e }),
      r ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: r }) : null
    ] }),
    c,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function Dr({
  checked: e,
  onChange: t,
  disabled: n,
  id: a,
  "aria-label": r,
  className: o
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      role: "switch",
      id: a,
      "aria-checked": e,
      "aria-label": r,
      disabled: n,
      "data-state": e ? "checked" : "unchecked",
      onClick: () => t(!e),
      className: S(
        "peer cv:inline-flex cv:h-5 cv:w-9 cv:shrink-0 cv:cursor-pointer cv:items-center cv:rounded-full cv:border-2 cv:border-transparent cv:transition-colors cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50",
        e ? "cv:bg-primary" : "cv:bg-input",
        o
      ),
      children: /* @__PURE__ */ i(
        "span",
        {
          className: S(
            "cv:pointer-events-none cv:block cv:size-4 cv:rounded-full cv:bg-background cv:shadow-sm cv:ring-0 cv:transition-transform",
            e ? "cv:translate-x-4" : "cv:translate-x-0"
          )
        }
      )
    }
  );
}
function xe({
  label: e,
  hint: t,
  checked: n,
  onChange: a,
  disabled: r,
  className: o
}) {
  const c = x.useId();
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "switch-row",
      className: S("cv:flex cv:items-center cv:justify-between cv:gap-3 cv:py-1.5", o),
      children: [
        /* @__PURE__ */ v(
          "label",
          {
            htmlFor: c,
            className: S(
              "cv:flex cv:min-w-0 cv:flex-col cv:gap-0.5",
              r ? "cv:cursor-not-allowed cv:opacity-70" : "cv:cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:leading-none", children: e }),
              t ? /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ i(Dr, { id: c, checked: n, onChange: a, disabled: r })
      ]
    }
  );
}
function jf({ spec: e, update: t }) {
  var p, g;
  const n = mt(), { chart: a } = e, r = a.family, o = a.familyOptions ?? {}, c = n.require(r);
  if (c.Customize) {
    const b = c.Customize;
    return /* @__PURE__ */ i(b, { spec: e, update: t });
  }
  const s = (b) => t({ ...e, chart: { ...a, ...b } }), l = (b) => t({ ...e, chart: { ...a, familyOptions: { ...o, ...b } } }), u = ((g = (p = a.mapping) == null ? void 0 : p.series) == null ? void 0 : g.mode) === "pivot" ? "stacked" : "none", m = a.stackMode ?? (r === "area" ? u : n.defaults(r).envelope.stackMode) ?? "none", h = /* @__PURE__ */ i(pe, { label: "Stacked", children: /* @__PURE__ */ i(
    mn,
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
  ) }), y = (() => {
    var b, w;
    switch (r) {
      case "bar":
        return /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ i(
            xe,
            {
              label: "Horizontal",
              checked: a.orientation === "horizontal",
              onChange: (k) => s({ orientation: k ? "horizontal" : "vertical" })
            }
          ),
          h
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(ue, { children: [
          h,
          a.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((w = (b = a.mapping) == null ? void 0 : b.series) == null ? void 0 : w.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ i(
            xe,
            {
              label: "Donut",
              checked: typeof o.innerRadiusPct == "number" && o.innerRadiusPct > 0,
              onChange: (k) => l({ innerRadiusPct: k ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(pe, { label: "Slice labels", children: /* @__PURE__ */ i(
            mn,
            {
              "aria-label": "Slice labels",
              size: "sm",
              options: [
                { value: "none", label: "None" },
                { value: "percent", label: "%" },
                { value: "value", label: "Value" },
                { value: "name", label: "Name" }
              ],
              value: o.showLabels ?? "percent",
              onChange: (k) => l({ showLabels: k })
            }
          ) }),
          /* @__PURE__ */ i(qf, { label: "Max slices", children: /* @__PURE__ */ i(
            be,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: o.maxSlices ?? "",
              placeholder: "8",
              onChange: (k) => {
                const C = parseInt(k.target.value, 10);
                l({ maxSlices: Number.isFinite(C) && C > 0 ? C : void 0 });
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
        return /* @__PURE__ */ v(ue, { children: [
          /* @__PURE__ */ i(
            xe,
            {
              label: "Compact rows",
              checked: o.rowHeight === "compact",
              onChange: (k) => l({ rowHeight: k ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Sortable columns",
              checked: o.sortable !== !1,
              onChange: (k) => l({ sortable: k })
            }
          ),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Sticky header",
              checked: o.stickyHeader !== !1,
              onChange: (k) => l({ stickyHeader: k })
            }
          ),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Row numbers",
              checked: o.showRowNumbers === !0,
              onChange: (k) => l({ showRowNumbers: k })
            }
          )
        ] });
      // Combo is configured entirely per-measure (render type, line shape, points,
      // axis, color) on each Values field — no type-level options.
      case "combo":
        return null;
      case "scatter":
        return null;
      default:
        return null;
    }
  })();
  return /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col", children: y });
}
function Vf(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0;
}
function qf({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Ei(e, t, n) {
  return (a) => {
    a !== e.chart.family && t(Uv(e, a, n));
  };
}
function Kf({ spec: e, update: t, empty: n }) {
  const a = mt(), r = e.chart.family, o = Ei(e, t, a);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i($i, { family: r, onPick: o, families: a })
  ] }) }) : null;
}
function Wf({ spec: e, update: t }) {
  const n = mt(), a = e.chart.family, r = Ei(e, t, n), o = n.require(a), c = o.icon;
  return /* @__PURE__ */ v(Le, { children: [
    /* @__PURE__ */ i(De, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(c, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          o.label,
          /* @__PURE__ */ i(lt, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Te, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i($i, { family: a, onPick: r, families: n })
      ] }),
      Vf(a, n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(jf, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function $i({ family: e, onPick: t, families: n }) {
  return /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-4 cv:gap-1.5", children: n.families().map((a) => {
    const r = n.require(a).icon, o = a === e;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => t(a),
        "aria-pressed": o,
        className: S(
          "cv:flex cv:flex-col cv:items-center cv:gap-1 cv:rounded-md cv:border cv:px-1 cv:py-2 cv:text-[10px] cv:transition-colors",
          o ? "cv:border-ring cv:bg-accent cv:text-foreground" : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ i(r, { className: "cv:size-4" }),
          n.require(a).label
        ]
      },
      a
    );
  }) });
}
function Hf(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Bf(e, t, n, a, r, o) {
  var ca, sa, la, ua, ma, da, va, fa, ha, pa, ga, ba, ya, xa;
  const { chart: c, query: s } = e, l = c.family, u = n.kinds.length === 1 ? n.kinds[0] : Uf(r), m = c.familyOptions ?? {}, f = Array.isArray(m.series) ? m.series : [], h = Array.isArray(m.columns) ? m.columns : [], y = Ht(c), p = y[a], g = l === "combo" && n.id === "y", b = l === "table" && n.id === "columns", w = l === "bar" || l === "line" || l === "area", k = ((sa = (ca = c.mapping) == null ? void 0 : ca.series) == null ? void 0 : sa.mode) === "measures", C = w && n.id === "y", _ = C && k, N = g ? (la = f.find((j) => j.member === a)) == null ? void 0 : la.label : b ? (ua = h.find((j) => j.member === a)) == null ? void 0 : ua.label : _ ? p == null ? void 0 : p.label : void 0, L = g ? (ma = f.find((j) => j.member === a)) == null ? void 0 : ma.colorToken : _ ? p == null ? void 0 : p.colorToken : void 0, T = dt(s), I = n.kinds.includes("time") && (T == null ? void 0 : T.dimension) === a, q = I ? T == null ? void 0 : T.granularity : void 0, A = I ? T == null ? void 0 : T.dateRange : void 0, O = g ? ((da = f.find((j) => j.member === a)) == null ? void 0 : da.render) ?? "line" : void 0, z = l === "line" && n.id === "y", R = l === "bar" && n.id === "y" && c.orientation !== "horizontal", D = ((fa = (va = c.mapping) == null ? void 0 : va.series) == null ? void 0 : fa.mode) === "pivot", Q = ((pa = (ha = c.mapping) == null ? void 0 : ha.series) == null ? void 0 : pa.mode) === "pivot" ? c.mapping.series.meta : void 0, Z = (z || R) && (k || D) || g, ee = Z ? (g ? (ga = f.find((j) => j.member === a)) == null ? void 0 : ga.axis : k ? p == null ? void 0 : p.axis : (ba = Q == null ? void 0 : Q[a]) == null ? void 0 : ba.axis) ?? "left" : void 0, H = (l === "line" || l === "area") && n.id === "y" && k || g && (O === "line" || O === "area"), B = g ? f.find((j) => j.member === a) : void 0, re = H ? g ? B == null ? void 0 : B.curve : p == null ? void 0 : p.curve : void 0, de = H ? g ? B == null ? void 0 : B.dots : p == null ? void 0 : p.dots : void 0, U = (j) => {
    var wa, ka;
    if ((wa = c.mapping) != null && wa.series && c.mapping.series.mode !== "measures") return;
    const ve = ((ka = c.mapping) != null && ka.series && c.mapping.series.mode === "measures" ? c.mapping.series.members : s.measures) ?? [], fe = { ...y };
    j && Object.keys(j).length > 0 ? fe[a] = j : delete fe[a];
    const Gt = Ae(c);
    Gt && t({
      ...e,
      chart: {
        ...c,
        mapping: { category: { member: Gt }, series: Oi(ve, fe) }
      }
    });
  }, E = (j) => {
    const ve = f.map((fe) => fe.member === a ? { ...fe, ...j } : fe);
    t({ ...e, chart: { ...c, familyOptions: { ...m, series: ve } } });
  }, V = (j) => {
    const ve = h.map((fe) => fe.member === a ? { ...fe, ...j } : fe);
    t({ ...e, chart: { ...c, familyOptions: { ...m, columns: ve } } });
  }, J = (j) => {
    g ? E({ label: j }) : b ? V({ label: j }) : _ && U({ ...p, label: j });
  }, ae = (j) => {
    g ? E({ colorToken: j ?? void 0 }) : _ && U({ ...p, colorToken: j ?? void 0 });
  }, he = (j) => {
    if (!T) return;
    const ve = { ...T };
    for (const fe of Object.keys(j)) {
      const Gt = j[fe];
      Gt === void 0 ? delete ve[fe] : ve[fe] = Gt;
    }
    t({ ...e, query: { ...s, timeDimensions: [ve] } });
  }, ke = (j) => he({ granularity: j }), Be = (j) => he({ dateRange: j }), je = (j) => E({ render: j }), G = (j) => {
    var ve, fe;
    g ? E({ axis: j }) : _ ? U({ ...p, axis: j }) : ((fe = (ve = c.mapping) == null ? void 0 : ve.series) == null ? void 0 : fe.mode) === "pivot" && t(Ii(e, l, a, j));
  }, X = (j) => {
    g ? E({ curve: j }) : _ && U({ ...p, curve: j });
  }, ye = (j) => {
    g ? E({ dots: j }) : _ && U({ ...p, dots: j });
  }, vt = () => t(Jv(e, l, n.id, a, o)), Ue = (n.id === "x" || n.id === "slices") && (u === "category" || u === "time"), Ge = (ya = c.mapping) == null ? void 0 : ya.series, M = (Ge && Ge.mode === "pivot" ? Ge.value : Et(c)[0]) ?? ((xa = s.measures) == null ? void 0 : xa[0]), F = Ue ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...M ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...M ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], $ = (() => {
    const j = Hf(s.order)[0];
    if (!j) return "none";
    const [ve, fe] = j;
    return M && ve === M ? fe === "desc" ? "value-desc" : "value-asc" : ve === a ? u === "time" ? fe === "desc" ? "time-desc" : "time-asc" : fe === "asc" ? "label-asc" : "label-desc" : "none";
  })(), K = (j) => {
    let ve;
    switch (j) {
      case "none":
        ve = void 0;
        break;
      case "value-desc":
        ve = M ? [[M, "desc"]] : void 0;
        break;
      case "value-asc":
        ve = M ? [[M, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        ve = [[a, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ve = [[a, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: ve } });
  }, te = typeof s.limit == "number" ? s.limit : void 0, ie = (j) => t({ ...e, query: { ...s, limit: j && j > 0 ? j : void 0 } }), me = (l === "bar" || l === "line" || l === "area") && I, Ut = me && m.comparePrevious === !0;
  return {
    kind: u,
    label: N,
    colorToken: L,
    granularity: q,
    dateRange: A,
    render: O,
    axis: ee,
    curve: re,
    dots: de,
    canLineStyle: H,
    canAxis: Z,
    canRename: g || b || _,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: C && k || g,
    isTimeField: I,
    isComboY: g,
    isCategoryField: Ue,
    sortValue: $,
    sortOptions: F,
    onSort: K,
    limit: te,
    onLimit: ie,
    canComparePrevious: me,
    comparePrevious: Ut,
    comparePreviousReady: me && A !== void 0,
    onComparePrevious: (j) => t({ ...e, chart: { ...c, familyOptions: { ...m, comparePrevious: j || void 0 } } }),
    onRename: J,
    onRecolor: ae,
    onGranularity: ke,
    onDateRange: Be,
    onRender: je,
    onAxis: G,
    onCurve: X,
    onDots: ye,
    onRemove: vt
  };
}
function Ii(e, t, n, a) {
  var c;
  const { chart: r } = e;
  if (t === "combo") {
    const s = r.familyOptions ?? {}, l = (Array.isArray(s.series) ? s.series : []).map(
      (u) => u.member === n ? { ...u, axis: a } : u
    );
    return { ...e, chart: { ...r, familyOptions: { ...s, series: l } } };
  }
  const o = (c = r.mapping) == null ? void 0 : c.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const s = { ...o.meta ?? {} };
    return s[n] = { ...s[n] ?? {}, axis: a }, { ...e, chart: { ...r, mapping: { ...r.mapping, series: { ...o, meta: s } } } };
  }
  return e;
}
function Uf(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function oo(e, t, n, a) {
  var f;
  const { chart: r, query: o } = e, c = r.family, s = (h) => {
    if (a < 0 || a >= h.length || n === a) return h;
    const y = h.slice(), [p] = y.splice(n, 1);
    return y.splice(a, 0, p), y;
  };
  if (c === "combo" && t.id === "y") {
    const h = r.familyOptions ?? {}, y = s(Array.isArray(h.series) ? h.series : []), p = s(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: p },
      chart: { ...r, familyOptions: { ...h, series: y } }
    };
  }
  if (c === "table" && t.id === "columns") {
    const h = r.familyOptions ?? {}, y = s(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...r, familyOptions: { ...h, columns: y } } };
  }
  const l = s(o.measures ?? []), u = (f = r.mapping) == null ? void 0 : f.series;
  let m = r.mapping;
  if (u && u.mode === "measures")
    m = { ...r.mapping, series: { ...u, members: l } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = s(u.values);
    m = { ...r.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...o, measures: l }, chart: { ...r, mapping: m } };
}
function io(e, t) {
  return e.allowedCubes.includes(t);
}
function Gf(e, t) {
  const n = new Map(e.filter((o) => o.type === "cube").map((o) => [o.name, o])), a = /* @__PURE__ */ new Set([t]), r = [t];
  for (; r.length > 0; ) {
    const o = n.get(r.shift());
    for (const c of (o == null ? void 0 : o.joinTargets) ?? [])
      !n.has(c) || a.has(c) || (a.add(c), r.push(c));
  }
  return [...a].filter((o) => o !== t).map((o) => n.get(o)).sort((o, c) => o.title.localeCompare(c.title));
}
function Yf(e, t, n, a) {
  const r = Zn(e), o = r.filter((C) => C.type === "view"), c = gn(t, a), s = Object.values(c).flat();
  let l;
  for (const C of s) {
    const _ = ze(e, C);
    if (_) {
      l = _;
      break;
    }
  }
  const u = !l && n ? cn(e, n) : void 0, m = l ? cn(e, l.cube) : u, f = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, h = t.query.measures ?? [], y = h.length ? Zt(h[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: o, measureSource: y, allowedCubes: [f] };
  const p = y ?? (l == null ? void 0 : l.cube) ?? (u == null ? void 0 : u.name), g = p ? cn(e, p) : void 0, b = r.filter((C) => C.type === "cube"), w = p ? Gf(b, p) : b, k = p ? [p, ...w.map((C) => C.name)] : b.map((C) => C.name);
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: w,
    views: o,
    measureSource: y,
    allowedCubes: k
  };
}
const Qf = st.options;
function Jf({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: a,
  className: r
}) {
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: S("cv:flex cv:flex-wrap cv:items-center cv:gap-1.5", r),
      children: [
        n ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": e === void 0,
            "aria-label": "Auto color",
            disabled: a,
            onClick: () => t(null),
            className: S(
              "cv:relative cv:flex cv:size-6 cv:items-center cv:justify-center cv:rounded-full cv:border cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
              e === void 0 ? "cv:border-ring cv:ring-2 cv:ring-ring/40" : "cv:border-input cv:hover:border-ring"
            ),
            children: "A"
          }
        ) : null,
        Qf.map((o) => {
          const c = e === o;
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": c,
              "aria-label": o,
              title: o,
              disabled: a,
              onClick: () => t(c && n ? null : o),
              className: S(
                "cv:size-6 cv:rounded-full cv:border cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
                c ? "cv:border-ring cv:ring-2 cv:ring-ring/40" : "cv:border-black/10 cv:hover:border-ring"
              ),
              style: { backgroundColor: `var(--${o})` }
            },
            o
          );
        })
      ]
    }
  );
}
const Xf = kt.options, Zf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function ji({
  value: e,
  onChange: t,
  options: n,
  placeholder: a = "Granularity…",
  disabled: r,
  id: o,
  className: c
}) {
  const s = n && n.length > 0 ? n : Xf;
  return /* @__PURE__ */ v(
    Pe,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: r,
      children: [
        /* @__PURE__ */ i($e, { id: o, className: c, children: /* @__PURE__ */ i(Ee, { placeholder: a }) }),
        /* @__PURE__ */ i(Ie, { children: s.map((l) => /* @__PURE__ */ i(we, { value: l, children: Zf[l] }, l)) })
      ]
    }
  );
}
const co = { bar: "Bar", line: "Line", area: "Area" }, eh = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function th({
  spec: e,
  update: t,
  well: n,
  member: a,
  option: r,
  resolvedColor: o,
  reorder: c,
  className: s
}) {
  const l = mt(), u = Bf(e, t, n, a, r, l), m = (r == null ? void 0 : r.label) ?? a, f = u.label || m, h = u.canColor && o !== void 0, y = u.canRename || h || u.isTimeField || u.isCategoryField || u.isComboY && !!u.render || u.canAxis || u.canLineStyle || !!c, p = (b) => {
    const w = b.trim();
    u.onRename(w.length > 0 ? w : void 0);
  }, g = /* @__PURE__ */ v(ue, { children: [
    h ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : r ? En(r.type) : null,
    /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: f })
  ] });
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "field-pill",
      className: S(
        "cv:flex cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:py-1 cv:pl-2 cv:pr-1 cv:text-sm cv:shadow-sm",
        s
      ),
      children: [
        y ? /* @__PURE__ */ v(Le, { children: [
          /* @__PURE__ */ i(De, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${f}`,
              children: g
            }
          ) }),
          /* @__PURE__ */ i(Te, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            u.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                be,
                {
                  defaultValue: u.label ?? "",
                  placeholder: m,
                  className: "cv:h-8",
                  onBlur: (b) => p(b.target.value),
                  onKeyDown: (b) => {
                    b.key === "Enter" && (p(b.target.value), b.target.blur());
                  }
                }
              )
            ] }) : null,
            h ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Color" }),
              /* @__PURE__ */ i(Jf, { value: u.colorToken, onChange: u.onRecolor })
            ] }) : null,
            u.isTimeField ? /* @__PURE__ */ v(ue, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  $t,
                  {
                    kind: "dateRange",
                    value: u.dateRange,
                    onChange: u.onDateRange,
                    renderFixed: (b, w) => /* @__PURE__ */ i(oa, { value: b, onChange: w })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  $t,
                  {
                    kind: "granularity",
                    value: u.granularity,
                    onChange: u.onGranularity,
                    renderFixed: (b, w) => /* @__PURE__ */ i(ji, { value: b, onChange: w, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              u.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    Dr,
                    {
                      checked: u.comparePrevious,
                      onChange: u.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                u.comparePrevious && !u.comparePreviousReady ? /* @__PURE__ */ i("p", { className: "cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            u.isCategoryField ? /* @__PURE__ */ v(ue, { children: [
              /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Sort" }),
                /* @__PURE__ */ i(
                  "select",
                  {
                    value: u.sortValue,
                    onChange: (b) => u.onSort(b.target.value),
                    className: "cv:h-8 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-sm cv:text-foreground cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
                    children: u.sortOptions.map((b) => /* @__PURE__ */ i("option", { value: b.key, children: b.label }, b.key))
                  }
                )
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ i(
                  be,
                  {
                    type: "number",
                    min: 1,
                    defaultValue: u.limit ?? "",
                    placeholder: "All",
                    className: "cv:h-8",
                    onBlur: (b) => {
                      const w = b.target.value.trim();
                      u.onLimit(w === "" ? void 0 : Number(w));
                    },
                    onKeyDown: (b) => {
                      if (b.key === "Enter") {
                        const w = b.target.value.trim();
                        u.onLimit(w === "" ? void 0 : Number(w)), b.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            u.isComboY && u.render ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Draw as" }),
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: Object.keys(co).map((b) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => u.onRender(b),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                    u.render === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    co[b],
                    u.render === b ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
                  ]
                },
                b
              )) })
            ] }) : null,
            u.canAxis ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Side" }),
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: ["left", "right"].map((b) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => u.onAxis(b),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize",
                    u.axis === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    b,
                    u.axis === b ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
                  ]
                },
                b
              )) })
            ] }) : null,
            u.canLineStyle ? /* @__PURE__ */ v(ue, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: eh.map(([b, w]) => /* @__PURE__ */ v(
                  "button",
                  {
                    type: "button",
                    onClick: () => u.onCurve(b),
                    className: S(
                      "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                      (u.curve ?? "cv:monotone") === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                    ),
                    children: [
                      w,
                      (u.curve ?? "monotone") === b ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
                    ]
                  },
                  b
                )) })
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(Dr, { checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
              ] })
            ] }) : null,
            c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1", children: [
              /* @__PURE__ */ v(
                Y,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canUp,
                  onClick: c.onUp,
                  children: [
                    /* @__PURE__ */ i($n, { className: "cv:size-3.5" }),
                    "Up"
                  ]
                }
              ),
              /* @__PURE__ */ v(
                Y,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canDown,
                  onClick: c.onDown,
                  children: [
                    /* @__PURE__ */ i(In, { className: "cv:size-3.5" }),
                    "Down"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ v(
              Y,
              {
                variant: "ghost",
                size: "sm",
                className: "cv:h-8 cv:justify-start cv:text-destructive cv:hover:text-destructive",
                onClick: u.onRemove,
                children: [
                  /* @__PURE__ */ i(Na, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: f, children: g }),
        /* @__PURE__ */ i(
          Y,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: u.onRemove,
            "aria-label": `Remove ${f}`,
            children: /* @__PURE__ */ i(Na, { className: "cv:size-3.5" })
          }
        )
      ]
    }
  );
}
function so({
  spec: e,
  update: t,
  well: n,
  placed: a,
  allPlaced: r,
  optionFor: o,
  colorFor: c,
  scope: s,
  blockReason: l,
  onAdd: u,
  badge: m,
  orientation: f,
  lockedSingle: h,
  disableReorder: y,
  label: p,
  note: g,
  pickerSide: b,
  pickerAlign: w,
  control: k
}) {
  const C = n.cardinality === "many" && !h, _ = C || a.length === 0, N = a.length, L = f === "vertical", T = p ?? n.label, I = /* @__PURE__ */ i(
    zi,
    {
      well: n,
      placed: r,
      scope: s,
      blockReason: l,
      onSelect: u,
      side: b ?? (L ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          className: S(
            "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:border-dashed cv:border-input cv:bg-background/60 cv:px-2 cv:py-1 cv:text-xs cv:text-muted-foreground cv:transition-colors cv:hover:border-ring cv:hover:text-foreground",
            L && "cv:w-full"
          ),
          children: [
            /* @__PURE__ */ i(zt, { className: "cv:size-3.5" }),
            a.length === 0 ? T : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: S("cv:flex cv:flex-col cv:gap-1", !L && "cv:min-w-0"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: T }),
          m ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: m }) : null,
          n.optional && a.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        k ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: k }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", L ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          a.map((q, A) => /* @__PURE__ */ i(
            th,
            {
              spec: e,
              update: t,
              well: n,
              member: q,
              option: o(q),
              resolvedColor: c(q),
              className: L ? "cv:w-full" : void 0,
              reorder: C && N > 1 && !y ? {
                canUp: A > 0,
                canDown: A < N - 1,
                onUp: () => t(oo(e, n, A, A - 1)),
                onDown: () => t(oo(e, n, A, A + 1))
              } : void 0
            },
            q
          )),
          _ ? I : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function mr({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ v(Le, { children: [
    /* @__PURE__ */ i(De, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2.5 cv:py-1.5 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: e }),
          /* @__PURE__ */ v("span", { className: "cv:flex cv:shrink-0 cv:items-center cv:gap-1 cv:text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "cv:text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(lt, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Te, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function ia(e, t) {
  const { chart: n } = e, a = n.familyOptions ?? {};
  return { chart: n, fo: a, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...o } } }) };
}
function nh({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = ia(e, t), r = Mi(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.display ?? "number", s = n.gauge, l = (m) => {
    const f = o ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!f) return;
    const h = { ...f };
    for (const y of Object.keys(m)) {
      const p = m[y];
      p === void 0 ? delete h[y] : h[y] = p;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(sn, { label: "Time field", children: /* @__PURE__ */ i(
      Ti,
      {
        cube: r,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (m) => l({ dimension: m }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(sn, { label: "Date range", children: /* @__PURE__ */ i(
      $t,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (m) => l({ dateRange: m }),
        renderFixed: (m, f) => /* @__PURE__ */ i(oa, { value: m, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(pe, { label: "Display", children: /* @__PURE__ */ i(
      mn,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: c,
        onChange: (m) => a({ display: m })
      }
    ) }),
    c === "gauge" ? /* @__PURE__ */ i(sn, { label: "Gauge max", children: /* @__PURE__ */ i(
      be,
      {
        type: "number",
        className: "cv:h-8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (m) => {
          const f = parseFloat(m.target.value);
          a({ gauge: Number.isFinite(f) ? { ...s ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function rh({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = ia(e, t), r = n.comparison, o = r !== void 0, c = x.useRef(void 0);
  r && (c.current = r);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (r == null ? void 0 : r.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      xe,
      {
        label: "Show comparison",
        checked: o,
        onChange: (m) => a({
          comparison: m ? c.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(ue, { children: [
      /* @__PURE__ */ i(pe, { label: "Against", children: /* @__PURE__ */ i(
        mn,
        {
          "aria-label": "Compare against",
          size: "sm",
          options: [
            { value: "previousPeriod", label: "Prev period" },
            { value: "value", label: "Fixed value" }
          ],
          value: (r == null ? void 0 : r.mode) ?? "previousPeriod",
          onChange: (m) => a({ comparison: { ...r, mode: m } })
        }
      ) }),
      (r == null ? void 0 : r.mode) === "value" ? /* @__PURE__ */ i(sn, { label: "Baseline value", children: /* @__PURE__ */ i(
        be,
        {
          type: "number",
          className: "cv:h-8",
          value: (r == null ? void 0 : r.value) ?? "",
          onChange: (m) => {
            const f = parseFloat(m.target.value);
            a({ comparison: { ...r, value: Number.isFinite(f) ? f : void 0 } });
          }
        }
      ) }) : null,
      (r == null ? void 0 : r.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-start cv:gap-1.5 cv:rounded-md cv:border cv:border-amber-500/30 cv:bg-amber-500/10 cv:px-2 cv:py-1.5 cv:text-[11px] cv:leading-snug cv:text-amber-700", children: [
        /* @__PURE__ */ i(ko, { className: "cv:mt-px cv:size-3.5 cv:shrink-0" }),
        /* @__PURE__ */ v("span", { children: [
          /* @__PURE__ */ i("strong", { className: "cv:font-semibold", children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ i(
        xe,
        {
          label: "Show as %",
          checked: ((r == null ? void 0 : r.showAsPercent) ?? !0) !== !1,
          onChange: (m) => a({ comparison: { ...r, showAsPercent: m } })
        }
      ),
      /* @__PURE__ */ i(
        xe,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the up/down colors).",
          checked: l !== "down",
          onChange: (m) => a({ goodDirection: m ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function ah({ spec: e, update: t }) {
  const { fo: n, setFO: a } = ia(e, t), r = n.sparkline, o = r !== void 0, c = n.comparison !== void 0, s = n.goodDirection ?? "up", l = r == null ? void 0 : r.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      xe,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => a({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(ue, { children: [
      /* @__PURE__ */ i(sn, { label: "Trend granularity", children: /* @__PURE__ */ i(
        $t,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => a({ sparkline: { ...r, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ i(ji, { value: u, onChange: m, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      c ? null : /* @__PURE__ */ i(
        xe,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the trend color).",
          checked: s !== "down",
          onChange: (u) => a({ goodDirection: u ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function sn({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function oh({
  spec: e,
  update: t,
  toolbar: n,
  children: a
}) {
  var ye, vt, Ue, Ge;
  const { meta: r } = Ze(), { locale: o } = He(), c = mt(), { chart: s } = e, l = s.family, u = c.require(l), m = u.queryless ?? !1, f = Mi(e), h = x.useMemo(() => Gn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), y = x.useCallback(
    (M) => M && (o == null ? void 0 : o.unitSystem) === "imperial" && h[M] ? h[M].imperialUnit : M,
    [o == null ? void 0 : o.unitSystem, h]
  ), p = x.useMemo(() => Gv(l, c), [l, c]), g = x.useMemo(() => gn(e, c), [e, c]), b = x.useMemo(() => new Map(p.map((M) => [M.id, M])), [p]), [w, k] = x.useState(void 0), C = x.useMemo(
    () => Yf(r, e, w, c),
    [r, e, w, c]
  ), _ = x.useMemo(() => Object.values(g).flat(), [g]), N = x.useCallback(
    (M) => {
      k(M), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), L = x.useMemo(
    () => {
      var M;
      return C.viewLocked ? [C.viewLocked] : [(M = C.sourceCube) == null ? void 0 : M.name, ...C.relatedCubes.map((F) => F.name)].filter(
        Boolean
      );
    },
    [C]
  ), T = x.useMemo(
    () => Object.values(g).every((M) => M.length === 0),
    [g]
  ), I = u.dualAxisY, q = x.useCallback(
    (M, F, $) => u.assignSeriesAxis ? u.assignSeriesAxis(M, F, $) : u.placeField ? M : Ii(M, l, F, $),
    [u, l]
  ), A = x.useCallback(
    (M) => {
      var K, te, ie;
      if (l === "combo") {
        const se = s.familyOptions ?? {}, me = (Array.isArray(se.series) ? se.series : []).find(
          (Ut) => Ut.member === M
        );
        return (me == null ? void 0 : me.axis) === "right" ? "right" : "left";
      }
      const F = (K = s.mapping) == null ? void 0 : K.series;
      return (F && (F.mode === "measures" || F.mode === "pivot") ? (ie = (te = F.meta) == null ? void 0 : te[M]) == null ? void 0 : ie.axis : void 0) === "right" ? "right" : "left";
    },
    [l, s.familyOptions, s.mapping]
  ), O = x.useMemo(() => {
    var ie, se;
    const M = g.y ?? [], F = (me) => M.find((Ut) => A(Ut) === me), $ = F("left"), K = I ? F("right") : void 0, te = (me) => me ? ze(r, me) : void 0;
    return {
      leftKey: $ ? Yt(te($)) : void 0,
      rightKey: K ? Yt(te(K)) : void 0,
      leftLabel: $ ? lo(te($), y((ie = te($)) == null ? void 0 : ie.unit)) : void 0,
      rightLabel: K ? lo(te(K), y((se = te(K)) == null ? void 0 : se.unit)) : void 0
    };
  }, [g, I, A, r, y]), z = x.useCallback(
    (M) => {
      const F = Yt(M), { leftKey: $, rightKey: K } = O;
      return $ === void 0 || F === $ ? "left" : K === void 0 || F === K ? "right" : "left";
    },
    [O]
  ), R = x.useCallback(
    (M, F) => {
      var $;
      if (F) {
        if (!io(C, F.cube))
          return "Clear the current fields to use a different dataset.";
        if (F.memberType === "measure" && C.measureSource && F.cube !== C.measureSource)
          return `Measures come from one table (${(($ = C.sourceCube) == null ? void 0 : $.title) ?? C.measureSource}). Remove them to switch.`;
        if (M === "y" && F.memberType === "measure") {
          const { leftKey: K, rightKey: te, leftLabel: ie, rightLabel: se } = O, me = Yt(F);
          if (I) {
            if (K !== void 0 && te !== void 0 && me !== K && me !== te)
              return `Both axes show ${ie} & ${se} — remove one to add a third unit.`;
          } else if (K !== void 0 && me !== K)
            return `This axis shows ${ie}; ${F.label ?? "this field"} is ${Lr(F)}`;
        }
      }
    },
    [C, O, I]
  ), D = I ? [O.leftLabel, O.rightLabel].filter(Boolean).join(" · ") || void 0 : O.leftLabel, Q = x.useMemo(() => {
    var F;
    const M = {};
    if (l === "bar" || l === "line" || l === "area") {
      const $ = (F = s.mapping) == null ? void 0 : F.series;
      if ($ && $.mode === "measures") {
        const K = $.members.map((ie) => {
          var se, me;
          return { key: ie, colorToken: (me = (se = $.meta) == null ? void 0 : se[ie]) == null ? void 0 : me.colorToken };
        }), te = Cr(K, s.colors);
        $.members.forEach((ie, se) => {
          M[ie] = te[se];
        });
      }
    } else if (l === "combo") {
      const $ = s.familyOptions ?? {}, K = Array.isArray($.series) ? $.series : [], te = K.map((se) => ({ key: se.member, colorToken: se.colorToken })), ie = Cr(te, s.colors);
      K.forEach((se, me) => {
        M[se.member] = ie[me];
      });
    }
    return M;
  }, [l, s.mapping, s.colors, s.familyOptions]), Z = x.useCallback(
    (M, F, $) => {
      const K = ze(r, F);
      if (R(M, K)) return;
      let te = $ === "geoPoint" && (K != null && K.latMember) && K.lngMember ? Qt(
        Qt(e, l, "lat", K.latMember, "numberDimension", c),
        l,
        "lng",
        K.lngMember,
        "numberDimension",
        c
      ) : Qt(e, l, M, F, $, c);
      I && M === "y" && (te = q(te, F, z(K)));
      const ie = u.canonicalTimeWell;
      if (ie && M !== ie && (g[ie] ?? []).length === 0) {
        const se = qv(r, K == null ? void 0 : K.cube);
        se && se.name !== F && !R(ie, se) && (te = Qt(te, l, ie, se.name, "time", c));
      }
      t(te);
    },
    [R, r, t, e, l, I, z, q, c, u, g]
  ), ee = x.useCallback(
    (M, F) => {
      var te;
      if (!F) return;
      if (!io(C, F.cube))
        return "Clear the current fields to use a different dataset.";
      if (F.memberType === "measure" && C.measureSource && F.cube !== C.measureSource)
        return `Measures come from one table (${((te = C.sourceCube) == null ? void 0 : te.title) ?? C.measureSource}). Remove them to switch.`;
      const $ = M === "left" ? O.leftKey : O.rightKey, K = M === "left" ? O.leftLabel : O.rightLabel;
      if ($ !== void 0 && Yt(F) !== $)
        return `This axis shows ${K}; ${F.label ?? "this field"} is ${Lr(F)}`;
    },
    [C, O]
  ), P = x.useCallback(
    (M, F, $) => {
      const K = ze(r, F);
      ee(M, K) || t(q(Qt(e, l, "y", F, $, c), F, M));
    },
    [ee, r, t, e, l, q, c]
  ), W = l === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, H = W.left.map((M) => b.get(M)).filter(Boolean), B = W.bottom.map((M) => b.get(M)).filter(Boolean), re = (ye = g.color) == null ? void 0 : ye[0], de = ((vt = g.y) == null ? void 0 : vt.length) ?? 0, U = re && de > 1 ? `${de} measures × ${((Ue = ze(r, re)) == null ? void 0 : Ue.label) ?? "this split"} — one series per measure per value.` : void 0, E = u.hasLegend, V = g.y ?? [], J = V.find((M) => A(M) !== "right"), ae = I ? V.find((M) => A(M) === "right") : void 0, he = (M) => {
    var K, te, ie, se;
    if (!M) return;
    const F = (K = s.mapping) == null ? void 0 : K.series;
    return (F && F.mode === "measures" ? (ie = (te = F.meta) == null ? void 0 : te[M]) == null ? void 0 : ie.label : void 0) ?? ((se = ze(r, M)) == null ? void 0 : se.label);
  }, ke = (M) => {
    var $, K, te, ie;
    const F = (se, me) => me ? /* @__PURE__ */ i(ao, { spec: e, update: t, axis: se, title: "Title", auto: he(me) }) : null;
    switch (M) {
      case "y":
        return F("y", J);
      // single value axis (bar / area)
      case "x":
        return F("x", (K = ($ = s.mapping) == null ? void 0 : $.category) == null ? void 0 : K.member);
      case "sy":
        return F("y", (te = g.sy) == null ? void 0 : te[0]);
      // scatter Y axis
      case "sx":
        return F("x", (ie = g.sx) == null ? void 0 : ie[0]);
      // scatter X axis
      default:
        return null;
    }
  }, Be = (M, F) => /* @__PURE__ */ i(
    so,
    {
      spec: e,
      update: t,
      well: M,
      placed: g[M.id] ?? [],
      allPlaced: _,
      optionFor: ($) => ze(r, $),
      colorFor: ($) => Q[$],
      scope: C,
      blockReason: ($) => R(M.id, $),
      onAdd: ($, K) => Z(M.id, $, K),
      badge: M.id === "y" ? D : void 0,
      orientation: F,
      note: M.id === "color" ? U : void 0,
      control: ke(M.id)
    },
    M.id
  ), je = b.get("y"), G = (M) => {
    if (!je) return null;
    const F = M === "left" ? J : ae;
    return /* @__PURE__ */ i(
      so,
      {
        spec: e,
        update: t,
        well: je,
        label: M === "left" ? "Left axis" : "Right axis",
        placed: (g.y ?? []).filter(($) => A($) === M),
        allPlaced: _,
        optionFor: ($) => ze(r, $),
        colorFor: ($) => Q[$],
        scope: C,
        blockReason: ($) => ee(M, $),
        onAdd: ($, K) => P(M, $, K),
        badge: M === "left" ? O.leftLabel : O.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: F ? /* @__PURE__ */ i(
          ao,
          {
            spec: e,
            update: t,
            axis: M === "left" ? "y" : "y2",
            title: "Title",
            auto: he(F)
          }
        ) : null
      },
      `y-${M}`
    );
  }, X = () => {
    const M = b.get("value"), F = (g.value ?? []).length > 0, $ = s.familyOptions ?? {};
    return /* @__PURE__ */ v(ue, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        M ? Be(M, "vertical") : null,
        F ? /* @__PURE__ */ i(
          mr,
          {
            label: "Time, range & display",
            summary: $.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(nh, { spec: e, update: t })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ v(ue, { children: [
        /* @__PURE__ */ i(mr, { label: "Comparison", summary: $.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(rh, { spec: e, update: t }) }),
        /* @__PURE__ */ i(mr, { label: "Sparkline", summary: $.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(ah, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      !T || m ? /* @__PURE__ */ i(Wf, { spec: e, update: t }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          Ef,
          {
            currentName: C.viewLocked ?? ((Ge = C.sourceCube) == null ? void 0 : Ge.name),
            hasFields: _.length > 0,
            onSelect: N
          }
        ),
        /* @__PURE__ */ i(Ff, { spec: e, update: t, cube: f, scopeCubes: L, scope: C })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      H.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", u.sidebarWidthClass), children: l === "kpi" ? X() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        H.flatMap(
          (M) => I && M.id === "y" ? [G("left"), G("right")] : [Be(M, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          a,
          /* @__PURE__ */ i(Kf, { spec: e, update: t, empty: T && !m })
        ] }),
        B.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          B.map((M) => Be(M, "horizontal")),
          E && !T ? /* @__PURE__ */ i($f, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function lo(e, t) {
  const n = Lr(e), a = t ?? (e == null ? void 0 : e.unit);
  return a && a !== n ? `${n} (${a})` : n;
}
function Vi(e, t) {
  const n = x.useRef(e);
  x.useEffect(() => {
    n.current = e;
  }, [e]);
  const a = x.useRef(null), r = x.useRef(null);
  return x.useEffect(
    () => () => {
      a.current !== null && (clearTimeout(a.current), a.current = null, r.current !== null && (n.current(...r.current), r.current = null));
    },
    []
  ), x.useCallback(
    (...o) => {
      a.current !== null && clearTimeout(a.current), r.current = o, a.current = setTimeout(() => {
        a.current = null, r.current = null, n.current(...o);
      }, t);
    },
    [t]
  );
}
function dr(e) {
  const t = Ko.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function ih({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [a, r] = x.useState(() => ({
    spec: e,
    issues: dr(e)
  })), [o, c] = x.useState(e);
  x.useEffect(() => {
    r({ spec: e, issues: dr(e) }), c(e);
  }, [e]);
  const s = Vi((h) => t(h), n), l = a.spec, u = a.issues, m = u.length === 0, f = x.useCallback(
    (h) => {
      const y = dr(h);
      r({ spec: h, issues: y }), y.length === 0 && (c(h), s(h));
    },
    [s]
  );
  return { draft: l, issues: u, valid: m, committed: o, update: f };
}
const ch = () => {
};
function sh({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: a = 250,
  fill: r = !1,
  className: o
}) {
  const c = mt(), { draft: s, issues: l, valid: u, committed: m, update: f } = ih({
    spec: e,
    onChange: t ?? ch,
    debounceMs: a
  }), h = c.get(s.chart.family), y = (h == null ? void 0 : h.queryless) ?? !1, p = m, g = (T) => {
    var I, q, A;
    return (((I = T == null ? void 0 : T.measures) == null ? void 0 : I.length) ?? 0) > 0 || (((q = T == null ? void 0 : T.dimensions) == null ? void 0 : q.length) ?? 0) > 0 || (((A = T == null ? void 0 : T.timeDimensions) == null ? void 0 : A.some((O) => typeof O.granularity == "string")) ?? !1);
  }, b = (T) => {
    var I;
    return (((I = T == null ? void 0 : T.measures) == null ? void 0 : I.length) ?? 0) > 0;
  }, w = (h == null ? void 0 : h.requiresMeasure) ?? s.chart.family !== "table", k = y || g(s.query) && g(p.query) && (!w || b(s.query) && b(p.query)), C = w && !b(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", _ = x.useCallback(
    (T) => {
      f({
        ...s,
        chart: {
          ...s.chart,
          familyOptions: { ...s.chart.familyOptions ?? {}, ...T }
        }
      });
    },
    [s, f]
  ), N = k ? /* @__PURE__ */ i(
    ea,
    {
      query: p.query ?? {},
      chart: p.chart,
      editing: !0,
      updateFamilyOptions: _
    }
  ) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: C }) }), L = n ? /* @__PURE__ */ v(Y, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ i(Do, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2 cv:text-foreground", r ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        u ? null : /* @__PURE__ */ v(Vn, { variant: "destructive", children: [
          /* @__PURE__ */ i(Pr, { className: "cv:size-4" }),
          /* @__PURE__ */ i(qn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(Kn, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            l.slice(0, 3).map((T, I) => /* @__PURE__ */ v("li", { children: [
              T.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: T.path }) : null,
              " ",
              T.message
            ] }, I)),
            l.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              l.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(oh, { spec: s, update: f, toolbar: L, children: N }) })
      ]
    }
  );
}
function lh({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: a,
  onUndo: r,
  onRedo: o,
  canUndo: c,
  canRedo: s,
  onDiscard: l,
  discardDisabled: u,
  onSave: m,
  saveDisabled: f,
  className: h
}) {
  const y = r || o, [p, g] = x.useState(!1);
  x.useEffect(() => {
    if (!p) return;
    const w = setTimeout(() => g(!1), 1600);
    return () => clearTimeout(w);
  }, [p]), x.useEffect(() => {
    f || g(!1);
  }, [f]);
  const b = () => {
    m == null || m(), g(!0);
  };
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: S(
        "cv:flex cv:flex-wrap cv:items-center cv:gap-2 cv:rounded-lg cv:border cv:border-border cv:bg-card cv:p-2",
        h
      ),
      children: [
        /* @__PURE__ */ i(
          be,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (w) => t(w.target.value),
            className: "cv:h-8 cv:w-full cv:min-w-0 cv:flex-1 cv:sm:w-auto"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-center cv:gap-1", children: [
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(Co, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i($r, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(_c, {}),
            " Input"
          ] }),
          a ? /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: a, children: [
            /* @__PURE__ */ i(Rc, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          y ? /* @__PURE__ */ v(ue, { children: [
            /* @__PURE__ */ i(
              Y,
              {
                variant: "ghost",
                size: "icon",
                onClick: r,
                disabled: !c,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(Ac, {})
              }
            ),
            /* @__PURE__ */ i(
              Y,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ i(Mc, {})
              }
            )
          ] }) : null,
          l ? /* @__PURE__ */ v(
            Y,
            {
              variant: "ghost",
              size: "sm",
              onClick: l,
              disabled: u,
              className: "cv:text-muted-foreground cv:hover:text-destructive",
              children: [
                /* @__PURE__ */ i(Oc, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(
            Y,
            {
              size: "sm",
              onClick: b,
              disabled: f,
              "aria-live": "polite",
              className: S(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                p && "cv:bg-emerald-600 cv:text-white cv:hover:bg-emerald-600 cv:disabled:opacity-100"
              ),
              children: [
                p ? /* @__PURE__ */ i(Ve, {}) : /* @__PURE__ */ i(Do, {}),
                " ",
                p ? "Saved" : "Save"
              ]
            }
          ) : null
        ] })
      ]
    }
  );
}
const qi = "lg", Ki = 12;
function uh(e, t) {
  const n = t[qi];
  if (n && n.length > 0) return n;
  let a, r = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const c = o.reduce((s, l) => Math.max(s, l.x + l.w), 0);
    c > r && (a = o, r = c);
  }
  return a ?? e;
}
function mh(e, t) {
  const n = new Map(e.map((c) => [c.i, c])), a = new Map(t.map((c) => [c.i, c])), r = [], o = (c, s) => {
    const l = {
      i: c.i,
      x: c.x,
      y: c.y,
      w: c.w,
      h: c.h
    };
    (s == null ? void 0 : s.minW) !== void 0 && (l.minW = s.minW), (s == null ? void 0 : s.minH) !== void 0 && (l.minH = s.minH), (s == null ? void 0 : s.static) !== void 0 && (l.static = s.static), r.push(l);
  };
  for (const c of e) {
    const s = a.get(c.i);
    s && o(s, c);
  }
  for (const c of t)
    n.has(c.i) || o(c, void 0);
  return r;
}
const dh = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function vh(e, t, n, a = Ki) {
  const r = dh[n], o = Math.min(r.w, a), c = e.reduce((s, l) => Math.max(s, l.y + l.h), 0);
  return {
    i: t,
    x: 0,
    y: c,
    w: o,
    h: r.h,
    minW: Math.min(r.minW, o),
    minH: r.minH
  };
}
function Wi(e, t, n = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? Ki) {
  const r = vh(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, r]
  };
}
function fh(e, t, n) {
  const a = e.widgets.find((o) => o.id === t);
  if (!a) return e;
  const r = JSON.parse(JSON.stringify(a));
  if (r.id = n, r.type === "chart") {
    const o = r.chart.familyOptions;
    o && typeof o.chartId == "string" && (r.chart = { ...r.chart, familyOptions: { ...o, chartId: `ai_${n}` } });
  }
  return Wi(e, r);
}
function hh(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function ph(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const gh = 12, bh = 900, yh = 0.4;
function xh(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function wh({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: a,
  onDuplicate: r,
  onDelete: o,
  onLayoutChange: c
}) {
  const [s, l] = si(), u = e.grid ?? {}, m = u.cols ?? gh, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], y = u.containerPadding ?? [0, 0], p = Math.max(yh, Math.min(1, l / bh)), g = Math.round(p / 0.05) * 0.05, b = Math.max(8, Math.round(f * g)), w = [
    Math.round(h[0] * g),
    Math.round(h[1] * g)
  ], k = [
    Math.round(y[0] * g),
    Math.round(y[1] * g)
  ], C = x.useMemo(
    () => ({ [qi]: xh(e.layout) }),
    [e.layout]
  ), _ = x.useMemo(
    () => new Map(e.widgets.map((q) => [q.id, q])),
    [e.widgets]
  ), N = x.useRef(c);
  x.useEffect(() => {
    N.current = c;
  }, [c]);
  const L = x.useRef(e.layout);
  x.useEffect(() => {
    L.current = e.layout;
  }, [e.layout]);
  const T = x.useRef(null), I = x.useCallback(
    (q, A) => {
      const z = uh(q, A).map((R) => ({ ...R }));
      kh(L.current, z) || N.current(z);
    },
    []
  );
  return /* @__PURE__ */ i(Xr, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    zo,
    {
      width: l,
      layouts: C,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: b,
      margin: w,
      containerPadding: k,
      dragConfig: { enabled: !0, handle: `.${Dn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: I,
      children: e.layout.map((q) => {
        const A = _.get(q.i);
        if (!A) return null;
        const O = A.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${A.title ?? A.type}`,
              "aria-pressed": O,
              onPointerDown: (z) => {
                T.current = { x: z.clientX, y: z.clientY };
              },
              onClick: (z) => {
                const R = T.current;
                R && Math.hypot(z.clientX - R.x, z.clientY - R.y) > 5 || n(A.id);
              },
              onKeyDown: (z) => {
                (z.key === "Enter" || z.key === " ") && (z.preventDefault(), n(A.id));
              },
              className: S(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                O ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(Mr, { widget: A, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(Dn, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${A.title ?? A.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), a(A.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Lc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${A.title ?? A.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), r(A.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Dc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${A.title ?? A.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), o(A.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-destructive cv:hover:text-destructive-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(It, {})
                    }
                  )
                ] })
              ]
            },
            q.i
          )
        );
      })
    }
  ) : null }) });
}
function kh(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((a) => [a.i, a]));
  for (const a of t) {
    const r = n.get(a.i);
    if (!r || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h) return !1;
  }
  return !0;
}
const Ch = x.memo(wh);
function Nh(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Sh({
  widget: e,
  onChange: t
}) {
  const n = x.useRef(t);
  x.useEffect(() => {
    n.current = t;
  }, [t]);
  const a = x.useRef(e);
  x.useEffect(() => {
    a.current = e;
  }, [e]);
  const r = Fo({
    extensions: [Eo],
    editable: !0,
    content: Nh(e.doc),
    onUpdate: ({ editor: o }) => {
      const c = o.getJSON();
      n.current({ ...a.current, doc: c });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(
          li,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return r ? /* @__PURE__ */ i(pe, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(_h, { editor: r }),
    /* @__PURE__ */ i(Po, { editor: r })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function rt({ active: e, onClick: t, title: n, children: a }) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (r) => r.preventDefault(),
      onClick: t,
      className: S(
        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md cv:text-muted-foreground cv:transition-colors",
        "cv:hover:bg-muted cv:hover:text-foreground cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        "cv:[&_svg]:size-4",
        e && "cv:bg-muted cv:text-foreground"
      ),
      children: a
    }
  );
}
function _h({ editor: e }) {
  const [, t] = x.useReducer((n) => n + 1, 0);
  return x.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "cv:flex cv:flex-wrap cv:items-center cv:gap-0.5 cv:rounded-md cv:border cv:border-border cv:bg-card cv:p-1",
      children: [
        /* @__PURE__ */ i(
          rt,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(Tc, {})
          }
        ),
        /* @__PURE__ */ i(
          rt,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(zc, {})
          }
        ),
        /* @__PURE__ */ i(
          rt,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(Fc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          rt,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(Pc, {})
          }
        ),
        /* @__PURE__ */ i(
          rt,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(Ec, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          rt,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i($c, {})
          }
        ),
        /* @__PURE__ */ i(
          rt,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(Ic, {})
          }
        ),
        /* @__PURE__ */ i(
          rt,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(jc, {})
          }
        )
      ]
    }
  );
}
const Rh = jr(
  "cv:inline-flex cv:items-center cv:rounded-md cv:border cv:px-2.5 cv:py-0.5 cv:text-xs cv:font-semibold cv:transition-colors cv:focus:outline-none cv:focus:ring-2 cv:focus:ring-ring cv:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "cv:border-transparent cv:bg-primary cv:text-primary-foreground cv:shadow cv:hover:bg-primary/80",
        secondary: "cv:border-transparent cv:bg-secondary cv:text-secondary-foreground cv:hover:bg-secondary/80",
        outline: "cv:text-foreground",
        destructive: "cv:border-transparent cv:bg-destructive cv:text-destructive-foreground cv:shadow cv:hover:bg-destructive/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Ah({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: S(Rh({ variant: t }), e), ...n });
}
function Mh({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: a,
  id: r,
  className: o
}) {
  const { meta: c, isLoading: s } = Ze(), l = x.useMemo(() => Zn(c), [c]), u = l.filter((h) => h.type === "cube"), m = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(Pe, { value: e, onValueChange: t, disabled: a || s, children: [
    /* @__PURE__ */ i($e, { id: r, className: o, children: /* @__PURE__ */ i(Ee, { placeholder: s ? "Loading…" : n, children: f ? /* @__PURE__ */ i(vr, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v(Ie, { children: [
      m.length > 0 ? /* @__PURE__ */ v(_r, { children: [
        /* @__PURE__ */ i(Rr, { children: "Views" }),
        m.map((h) => /* @__PURE__ */ i(we, { value: h.name, children: /* @__PURE__ */ i(vr, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(_r, { children: [
        /* @__PURE__ */ i(Rr, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(we, { value: h.name, children: /* @__PURE__ */ i(vr, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function vr({ option: e }) {
  const t = e.type === "view" ? Ir : Mo;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(Ah, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const Oh = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Lh(e) {
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
function Dh({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: a } = e.control, r = (s) => n({ ...e, control: { ...e.control, control: s } }), o = (s) => n({ ...e, control: { ...e.control, variable: s } }), c = (s) => {
    s !== a.kind && r(Lh(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col", children: [
    /* @__PURE__ */ i(
      pe,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          Pe,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i($e, { children: /* @__PURE__ */ i(Ee, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Ie, { children: t.map((s) => /* @__PURE__ */ i(we, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(pe, { label: "Control", children: /* @__PURE__ */ v(Pe, { value: a.kind, onValueChange: (s) => c(s), children: [
      /* @__PURE__ */ i($e, { children: /* @__PURE__ */ i(Ee, {}) }),
      /* @__PURE__ */ i(Ie, { children: as.options.map((s) => /* @__PURE__ */ i(we, { value: s, children: Oh[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ i(Th, { control: a, onChange: r, variables: t })
  ] });
}
function Th({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(zh, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(Ph, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(Eh, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i($h, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(Ih, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(jh, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function zh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ i(
      pe,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          Fh,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ i(
      xe,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function Fh({
  selected: e,
  onChange: t
}) {
  const [n, a] = x.useState(!1), r = new Set(e.map((s) => s.toLowerCase())), o = (s) => {
    const l = new Set(r);
    l.has(s) ? l.delete(s) : l.add(s), t(Cn.filter((u) => l.has(u.value)).map((u) => u.value));
  }, c = r.size === 0 ? "Default set" : r.size === Cn.length ? "All presets" : `${r.size} selected`;
  return /* @__PURE__ */ v(Le, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(De, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: c }),
      /* @__PURE__ */ i(lt, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Te, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: Cn.map((s) => {
      const l = r.has(s.value);
      return /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          "aria-pressed": l,
          onClick: () => o(s.value),
          className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-foreground cv:hover:bg-accent",
          children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: S(
                  "cv:flex cv:size-4 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:border",
                  l ? "cv:border-primary cv:bg-primary cv:text-primary-foreground" : "cv:border-input"
                ),
                children: l ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
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
function Ph({
  control: e,
  onChange: t,
  variables: n
}) {
  const a = new Set(e.options ?? []), r = (s) => {
    const l = new Set(a);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = kt.options.filter((m) => l.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((s) => s.type === "dateRange" || s.type === "time"), c = "__none__";
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ i(
      pe,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          Pe,
          {
            value: e.rangeVariable ?? c,
            onValueChange: (s) => t({ ...e, rangeVariable: s === c ? void 0 : s }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i($e, { children: /* @__PURE__ */ i(Ee, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Ie, { children: [
                /* @__PURE__ */ i(we, { value: c, children: "None" }),
                o.map((s) => /* @__PURE__ */ i(we, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(pe, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: kt.options.map((s) => {
      const l = a.has(s);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": l,
          onClick: () => r(s),
          className: "cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize cv:transition-colors" + (l ? "cv:border-primary cv:bg-primary/10 cv:text-foreground" : "cv:border-border cv:text-muted-foreground cv:hover:text-foreground"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Eh({
  control: e,
  onChange: t
}) {
  const n = (o, c) => {
    const s = e.options.map(
      (l, u) => u === o ? { value: c.value ?? String(l.value), label: c.label ?? l.label } : l
    );
    t({ ...e, options: s });
  }, a = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), r = (o) => t({ ...e, options: e.options.filter((c, s) => s !== o) });
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ i(
      xe,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (o) => t({ ...e, multiple: o })
      }
    ),
    /* @__PURE__ */ i(
      pe,
      {
        label: "Options",
        action: /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", onClick: a, children: [
          /* @__PURE__ */ i(zt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "No options yet." }) : e.options.map((o, c) => /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5", children: [
          /* @__PURE__ */ i(
            be,
            {
              className: "cv:flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (s) => n(c, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              className: "cv:flex-1",
              placeholder: "Value",
              value: String(o.value),
              onChange: (s) => n(c, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            Y,
            {
              variant: "ghost",
              size: "icon",
              className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground",
              "aria-label": "Remove option",
              onClick: () => r(c),
              children: /* @__PURE__ */ i(It, {})
            }
          )
        ] }, c)) })
      }
    )
  ] });
}
function $h({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ue, { children: [
    /* @__PURE__ */ i(pe, { label: "From", children: /* @__PURE__ */ v(
      Pe,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i($e, { children: /* @__PURE__ */ i(Ee, {}) }),
          /* @__PURE__ */ v(Ie, { children: [
            /* @__PURE__ */ i(we, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(we, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(we, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      pe,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ i(
          Y,
          {
            variant: "ghost",
            size: "sm",
            className: "cv:h-6 cv:px-1.5 cv:text-xs cv:text-muted-foreground",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ i(
          Mh,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Ih({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ i(pe, { label: "Placeholder", children: /* @__PURE__ */ i(
    be,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function jh({
  control: e,
  onChange: t
}) {
  const n = (a, r) => /* @__PURE__ */ i(pe, { label: r, children: /* @__PURE__ */ i(
    be,
    {
      type: "number",
      value: e[a] ?? "",
      onChange: (o) => {
        const c = o.target.value;
        t({ ...e, [a]: c === "" ? void 0 : Number(c) });
      }
    }
  ) });
  return /* @__PURE__ */ v(ue, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function Vh(e) {
  return { schemaVersion: Ot, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function qh(e) {
  const t = {
    schemaVersion: Ot,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Kh(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function uo({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: a,
  fill: r = !1
}) {
  const o = a ? (c) => a([...t, c]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", r && "cv:h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      pe,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ i(
          be,
          {
            value: e.title ?? "",
            placeholder: "Untitled",
            onChange: (c) => n({ ...e, title: c.target.value || void 0 })
          }
        )
      }
    ) : null,
    e.type === "chart" ? (
      // The chart's query may carry {var} tokens bound to dashboard variables.
      // Provide a variable store (seeded from the dashboard's decls) so the live
      // preview RESOLVES them — otherwise an unresolved {var:granularity} reaches
      // Cube and 400s ("granularity must be a string").
      /* @__PURE__ */ i(Xr, { spec: Vh(t), children: /* @__PURE__ */ i(Nf, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(r && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        sh,
        {
          fill: r,
          spec: qh(e),
          onChange: (c) => n(Kh(e, c))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(Sh, { widget: e, onChange: n }) : /* @__PURE__ */ i(Dh, { widget: e, variables: t, onChange: n })
  ] });
}
function Wh({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !1,
  open: r = !0,
  onToggle: o,
  regionId: c,
  className: s
}) {
  const l = /* @__PURE__ */ v(ue, { children: [
    a ? /* @__PURE__ */ i(
      fn,
      {
        className: S(
          "cv:size-4 cv:shrink-0 cv:text-muted-foreground cv:transition-transform",
          r && "cv:rotate-90"
        )
      }
    ) : null,
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium", children: e }),
    t != null ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "section-header",
      className: S("cv:flex cv:items-center cv:justify-between cv:gap-2", s),
      children: [
        a ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": r,
            "aria-controls": c,
            className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
            children: l
          }
        ) : /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", children: l }),
        n ? /* @__PURE__ */ i(
          "div",
          {
            className: "cv:flex cv:shrink-0 cv:items-center cv:gap-1",
            onClick: (u) => u.stopPropagation(),
            children: n
          }
        ) : null
      ]
    }
  );
}
function Hh({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !0,
  defaultOpen: r = !0,
  open: o,
  onOpenChange: c,
  className: s,
  children: l
}) {
  const u = o !== void 0, [m, f] = x.useState(r), h = a ? u ? o : m : !0, y = x.useId(), p = x.useCallback(() => {
    const g = !h;
    u || f(g), c == null || c(g);
  }, [h, u, c]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": h ? "open" : "closed",
      className: S("cv:border-b cv:border-border cv:py-2 cv:last:border-b-0", s),
      children: [
        /* @__PURE__ */ i(
          Wh,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: a,
            open: h,
            onToggle: p,
            regionId: y
          }
        ),
        h ? /* @__PURE__ */ i("div", { id: y, "data-slot": "section-body", className: "cv:pt-2", children: l }) : null
      ]
    }
  );
}
function Bh(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Uh(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Gh(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Yh(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Qh(e, t) {
  switch (e) {
    case "chart":
      return Uh(t);
    case "text":
      return Gh(t);
    case "input":
      return Yh(t);
  }
}
function Jh(e) {
  return { name: e, type: "string" };
}
function Xh(e) {
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
const mo = {
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
function Zh({
  variables: e,
  onChange: t,
  newName: n
}) {
  const a = x.useRef(0), r = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++a.current}`;
    while (e.some((m) => m.name === u));
    return u;
  }, o = (u, m) => {
    t(e.map((f, h) => h === u ? ep(f, m) : f));
  }, c = (u) => t(e.filter((m, f) => f !== u)), s = () => t([...e, Jh(r())]), l = (u, m) => {
    const f = u + m;
    if (f < 0 || f >= e.length) return;
    const h = e.slice();
    [h[u], h[f]] = [h[f], h[u]], t(h);
  };
  return /* @__PURE__ */ i(
    Hh,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ i(zt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ v("div", { className: "cv:rounded-md cv:border cv:border-dashed cv:border-border cv:p-4 cv:text-center", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "No variables yet" }),
        /* @__PURE__ */ v("p", { className: "cv:mt-0.5 cv:text-xs cv:text-muted-foreground", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: "cv:mt-3", onClick: s, children: [
          /* @__PURE__ */ i(zt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, m) => /* @__PURE__ */ i(
        tp,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((f, h) => h !== m && f.name === u.name && u.name !== ""),
          onChange: (f) => o(m, f),
          onRemove: () => c(m),
          onMove: (f) => l(m, f)
        },
        m
      )) })
    }
  );
}
function ep(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Xh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function tp({
  decl: e,
  index: t,
  total: n,
  duplicate: a,
  onChange: r,
  onRemove: o,
  onMove: c
}) {
  const [s, l] = x.useState(!0), u = e.name === "" ? "Name required" : a ? "Duplicate name" : void 0;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv:overflow-hidden cv:rounded-md cv:border cv:border-border cv:bg-card/40",
      children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:py-1.5", children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              "aria-label": s ? "Collapse variable" : "Expand variable",
              "aria-expanded": s,
              onClick: () => l((m) => !m),
              className: "cv:flex cv:size-6 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4",
              children: s ? /* @__PURE__ */ i(lt, {}) : /* @__PURE__ */ i(fn, {})
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (m) => r({ name: m.target.value }),
              className: "cv:h-7 cv:min-w-0 cv:flex-1 cv:font-mono cv:text-xs"
            }
          ),
          /* @__PURE__ */ i("span", { className: "cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline", children: mo[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: [
            /* @__PURE__ */ i(
              Y,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => c(-1),
                children: /* @__PURE__ */ i($n, {})
              }
            ),
            /* @__PURE__ */ i(
              Y,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => c(1),
                children: /* @__PURE__ */ i(In, {})
              }
            ),
            /* @__PURE__ */ i(
              Y,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground cv:hover:text-destructive",
                "aria-label": "Remove variable",
                onClick: o,
                children: /* @__PURE__ */ i(It, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive", children: u }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5", children: [
          /* @__PURE__ */ i(pe, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(Pe, { value: e.type, onValueChange: (m) => r({ type: m }), children: [
            /* @__PURE__ */ i($e, { children: /* @__PURE__ */ i(Ee, {}) }),
            /* @__PURE__ */ i(Ie, { children: Vo.options.map((m) => /* @__PURE__ */ i(we, { value: m, children: mo[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ i(pe, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
            be,
            {
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (m) => r({ label: m.target.value })
            }
          ) }),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (m) => r({ array: m })
            }
          ),
          /* @__PURE__ */ i(np, { decl: e, onChange: (m) => r({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function np({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ i(
      xe,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (r) => t(r)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(pe, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
      be,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (r) => {
          const o = r.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : rp(e.default);
  return /* @__PURE__ */ i(pe, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    be,
    {
      value: a,
      placeholder: ap(e.type),
      onChange: (r) => {
        const o = r.target.value;
        if (o === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const c = o.split(",").map((s) => s.trim()).filter(Boolean);
          t(c);
          return;
        }
        t(o);
      }
    }
  ) });
}
function rp(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function ap(e) {
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
function Pp({
  spec: e,
  remoteSpec: t,
  onRemoteAdopted: n,
  onChange: a,
  onSave: r,
  newId: o,
  debounceMs: c = 300,
  onUndo: s,
  onRedo: l,
  canUndo: u,
  canRedo: m,
  onDiscard: f,
  families: h,
  className: y
}) {
  var Be, je;
  const [p, g] = x.useState(e), [b, w] = x.useState(e);
  x.useEffect(() => {
    g(e), w(e);
  }, [e]);
  const [k, C] = x.useState(null), _ = x.useRef(0), [N, L] = x.useState(null), T = x.useRef(k), I = x.useRef(N), q = x.useRef(p);
  x.useEffect(() => {
    T.current = k, I.current = N, q.current = p;
  });
  const A = x.useRef(null);
  A.current === null && (A.current = o ?? Bh());
  const O = o ?? A.current, z = Vi(
    (G) => a == null ? void 0 : a(G),
    c
  ), R = x.useCallback(
    (G) => {
      _.current = Date.now(), g((X) => {
        const ye = G(X);
        return z(ye), ye;
      });
    },
    [z]
  ), D = x.useRef(t);
  x.useEffect(() => {
    if (!t || t === D.current) return;
    const G = 500;
    let X = null;
    const ye = () => {
      var M;
      const vt = Date.now() - _.current;
      if (vt < G) {
        X = setTimeout(ye, G - vt);
        return;
      }
      D.current = t;
      const Ue = /* @__PURE__ */ new Set();
      ((M = I.current) == null ? void 0 : M.kind) === "widget" && Ue.add(I.current.id), T.current && Ue.add(T.current);
      const Ge = cp(t, q.current, Ue);
      g(Ge), n == null || n(Ge);
    };
    return ye(), () => {
      X && clearTimeout(X);
    };
  }, [t]);
  const Q = x.useCallback(
    (G) => {
      const X = Qh(G, O());
      R((ye) => Wi(ye, X)), C(X.id), L({ kind: "widget", id: X.id });
    },
    [R, O]
  ), Z = x.useCallback((G) => C(G), []), ee = x.useCallback((G) => {
    C(G), L({ kind: "widget", id: G });
  }, []), P = x.useCallback(
    (G) => {
      R((X) => hh(X, G)), C((X) => X === G ? null : X), L((X) => (X == null ? void 0 : X.kind) === "widget" && X.id === G ? null : X);
    },
    [R]
  ), W = x.useCallback(
    (G) => {
      const X = O();
      R((ye) => fh(ye, G, X)), C(X);
    },
    [R, O]
  ), H = x.useCallback(
    (G) => R((X) => ph(X, G)),
    [R]
  ), B = x.useCallback(
    (G) => R((X) => {
      const ye = mh(X.layout, G);
      return ip(X.layout, ye) ? X : { ...X, layout: ye };
    }),
    [R]
  ), re = x.useCallback(
    (G) => R((X) => ({ ...X, name: G || void 0 })),
    [R]
  ), de = x.useCallback(
    (G) => R((X) => ({ ...X, variables: G })),
    [R]
  ), U = x.useDeferredValue(p), E = x.useMemo(
    () => br.safeParse(U),
    [U]
  ), V = x.useCallback(() => {
    const G = br.safeParse(p);
    G.success && (r == null || r(G.data), w(p));
  }, [p, r]), J = p !== b, ae = (N == null ? void 0 : N.kind) === "widget" ? p.widgets.find((G) => G.id === N.id) ?? null : null;
  x.useEffect(() => {
    (N == null ? void 0 : N.kind) === "widget" && !p.widgets.some((G) => G.id === N.id) && L(null);
  }, [N, p.widgets]);
  const he = x.useCallback(() => L(null), []), ke = (N == null ? void 0 : N.kind) === "variables" ? "Dashboard variables" : ae ? ae.title ?? `${op(ae.type)} widget` : "";
  return /* @__PURE__ */ i(Jr, { families: h, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((je = (Be = p.grid) == null ? void 0 : Be.margin) == null ? void 0 : je[0]) ?? 12 },
      className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", y),
      children: [
        /* @__PURE__ */ i(
          lh,
          {
            name: p.name ?? "",
            onNameChange: re,
            onAdd: Q,
            onEditVariables: () => L({ kind: "variables" }),
            onUndo: s,
            onRedo: l,
            canUndo: u,
            canRedo: m,
            onDiscard: f,
            discardDisabled: !J,
            onSave: r ? V : void 0,
            saveDisabled: !E.success || !J,
            className: "cv:shrink-0"
          }
        ),
        E.success ? null : /* @__PURE__ */ v("p", { className: "cv:shrink-0 cv:text-xs cv:text-destructive", children: [
          E.error.issues.length,
          " validation issue",
          E.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-y-auto cv:pb-4", children: N ? null : /* @__PURE__ */ i(
          Ch,
          {
            spec: p,
            selectedId: k,
            onSelect: Z,
            onEdit: ee,
            onDuplicate: W,
            onDelete: P,
            onLayoutChange: B
          }
        ) }),
        N ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": ke,
            className: "cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background",
            children: [
              /* @__PURE__ */ v("header", { className: "cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5", children: [
                /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                  /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", onClick: he, children: [
                    /* @__PURE__ */ i(Er, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: ke })
                ] }),
                ae ? /* @__PURE__ */ v(
                  Y,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => P(ae.id),
                    children: [
                      /* @__PURE__ */ i(It, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: N.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(Zh, { variables: p.variables, onChange: de }) }) : (ae == null ? void 0 : ae.type) === "chart" ? /* @__PURE__ */ i(
                uo,
                {
                  fill: !0,
                  widget: ae,
                  variables: p.variables,
                  onChange: H,
                  onVariablesChange: de
                }
              ) : ae ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                uo,
                {
                  widget: ae,
                  variables: p.variables,
                  onChange: H,
                  onVariablesChange: de
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function op(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function ip(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const a = e[n], r = t[n];
    if (a.i !== r.i || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h || a.minW !== r.minW || a.minH !== r.minH || a.static !== r.static)
      return !1;
  }
  return !0;
}
function cp(e, t, n) {
  const a = new Map(t.widgets.map((u) => [u.id, u])), r = new Set(e.widgets.map((u) => u.id)), o = e.widgets.map(
    (u) => n.has(u.id) && a.has(u.id) ? a.get(u.id) : u
  );
  for (const u of t.widgets)
    !r.has(u.id) && n.has(u.id) && o.push(u);
  const c = new Map(t.layout.map((u) => [u.i, u])), s = new Set(e.layout.map((u) => u.i)), l = e.layout.map(
    (u) => n.has(u.i) && c.has(u.i) ? c.get(u.i) : u
  );
  for (const u of t.layout)
    !s.has(u.i) && n.has(u.i) && l.push(u);
  return { ...e, widgets: o, layout: l };
}
export {
  Xs as AreaChartFamily,
  Fs as AreaFamilyOptionsSchema,
  ts as AxesOptionsSchema,
  nr as AxisOptionsSchema,
  Sp as BUILTIN_CHART_FAMILIES,
  tt as BUILTIN_DEFAULTS,
  et as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Qs as BarChartFamily,
  Ts as BarFamilyOptionsSchema,
  qi as CANONICAL_BREAKPOINT,
  st as ChartColorTokenSchema,
  oh as ChartEditOverlay,
  sh as ChartEditor,
  Qc as ChartFamilySchema,
  jo as ChartOptionsSchema,
  Ul as ChartRenderer,
  Ko as ChartSpecSchema,
  Fp as ChartView,
  is as ChartWidgetSchema,
  ns as ColorAssignmentSchema,
  _l as ComboChartFamily,
  Ks as ComboFamilyOptionsSchema,
  qs as ComboSeriesOptSchema,
  js as CondFormatRuleSchema,
  ea as CubeChart,
  ld as CubeChartSpec,
  Io as CubeQuerySchema,
  Yn as CubeVizContext,
  Dp as CubeVizProvider,
  Ne as DEFAULT_COLOR_RAMP,
  Ki as DEFAULT_COLS,
  Sr as DEFAULT_UNIT_CONVERSIONS,
  Dn as DRAG_HANDLE_CLASS,
  zp as Dashboard,
  Pp as DashboardEditor,
  Xr as DashboardProvider,
  br as DashboardSpecSchema,
  pr as DateRangeSchema,
  Ws as EMPTY_FAMILY_DEFAULT,
  Aa as EM_DASH,
  Ch as EditorCanvas,
  lh as EditorToolbar,
  Jr as FamilyRegistryOverride,
  Af as FilterBuilder,
  Bc as FilterOperatorSchema,
  Jc as FormatKindSchema,
  jn as FormatOptionsSchema,
  xs as GRANULARITY_PATTERN,
  kt as GranularitySchema,
  ms as GridConfigSchema,
  as as InputControlKindSchema,
  os as InputControlSchema,
  Dh as InputWidgetEditor,
  ss as InputWidgetSchema,
  Ld as InputWidgetView,
  ol as KpiFamily,
  $s as KpiFamilyOptionsSchema,
  us as LayoutItemSchema,
  Uc as LeafFilterSchema,
  Zc as LegendOptionsSchema,
  Js as LineChartFamily,
  zs as LineFamilyOptionsSchema,
  le as MemberSchema,
  Sa as OrderDirSchema,
  Yc as OrderSpecSchema,
  Zs as PieChartFamily,
  Ps as PieFamilyOptionsSchema,
  gr as QueryFilterSchema,
  hn as ReferenceLineOptSchema,
  Mr as RenderWidget,
  Ot as SCHEMA_VERSION,
  Hc as ScalarSchema,
  tl as ScatterChartFamily,
  Es as ScatterFamilyOptionsSchema,
  Xc as SeriesMappingSchema,
  _a as SeriesMetaSchema,
  Wo as SpecSchema,
  Is as TableColumnOptSchema,
  gl as TableFamily,
  Vs as TableFamilyOptionsSchema,
  Sh as TextWidgetEditor,
  cs as TextWidgetSchema,
  md as TextWidgetView,
  Gc as TimeDimensionSchema,
  rs as TipTapDocSchema,
  es as TooltipOptionsSchema,
  On as VarRefSchema,
  ds as VariableDeclSchema,
  Vo as VariableTypeSchema,
  $o as VariableValueSchema,
  Zh as VariablesPanel,
  hi as WidgetChrome,
  uo as WidgetEditPanel,
  ls as WidgetSpecSchema,
  Wi as appendWidget,
  Il as areaChartFamily,
  Ta as assignColors,
  Bm as axisKey,
  El as barChartFamily,
  Qr as buildFamilyRegistry,
  Lp as builtinCharts,
  Xe as builtinFamilyDescriptors,
  Hn as builtinFamilyRegistry,
  Wl as comboChartFamily,
  hs as createCubeClient,
  Bh as createIdFactory,
  mu as createQueryResolver,
  ii as createUnitsFormatter,
  du as createVariableStore,
  Cs as datePattern,
  yr as deepMerge,
  Yr as defaultChartFamilies,
  Xh as defaultForType,
  Kr as defaultFormatter,
  ps as fetchMeta,
  Mp as formatCategory,
  an as formatDateValue,
  Vv as geoPointId,
  Ft as isEmptyValue,
  Fe as isVarRef,
  ql as kpiChartFamily,
  $l as lineChartFamily,
  fs as loadSpec,
  Ho as looksLikeIsoDate,
  Uo as makeChartFormat,
  Ap as makeDateFormatter,
  Op as makeFormatter,
  mh as mergeLayout,
  Gn as mergeUnitConversions,
  Uh as newChartWidget,
  Yh as newInputWidget,
  Gh as newTextWidget,
  Jh as newVariable,
  Qh as newWidget,
  eu as normalize,
  uh as pickCanonicalLayout,
  jl as pieChartFamily,
  vh as placeNewItem,
  Gm as quantityLabel,
  hh as removeWidget,
  ph as replaceWidget,
  Xm as resolveChart,
  Bl as resolveOptions,
  Hs as resolveOptionsWith,
  ai as resolveQuery,
  ou as resolveRelativeDateRange,
  Cr as resolveSeriesColors,
  cu as resolveValue,
  _p as safeLoadSpec,
  Vl as scatterChartFamily,
  Kl as tableChartFamily,
  ks as toDate,
  Yl as toResultAnnotation,
  ih as useChartEditorState,
  si as useContainerWidth,
  Ze as useCubeMeta,
  ed as useCubeQuery,
  He as useCubeVizContext,
  ci as useDashboard,
  Vi as useDebouncedCallback,
  mt as useFamilyRegistry,
  Tp as useFormatter,
  sr as useNormalizedSeries,
  Zr as useOptionalDashboard,
  Rp as validateSpec
};
//# sourceMappingURL=index.js.map
