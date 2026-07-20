var ji = Object.defineProperty;
var Vi = (e, t, n) => t in e ? ji(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var pa = (e, t, n) => Vi(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as i, jsxs as v, Fragment as le } from "react/jsx-runtime";
import * as _r from "recharts";
import { BarChart as qi, CartesianGrid as Zt, YAxis as Ge, XAxis as Nt, Bar as so, LabelList as lo, ReferenceLine as ot, LineChart as Ki, Line as uo, AreaChart as mo, Area as Rr, PieChart as Hi, Pie as Wi, Cell as vo, Label as Bi, ScatterChart as Ui, ZAxis as Gi, Scatter as Yi, RadialBarChart as Qi, PolarAngleAxis as Ji, RadialBar as Xi, ResponsiveContainer as Zi, ComposedChart as ec } from "recharts";
import * as x from "react";
import { useId as fo, useMemo as ie, createContext as ho, useContext as Ar, useState as St, useCallback as rt, useEffect as en, useRef as ft, createElement as tc, useSyncExternalStore as po, Component as nc } from "react";
import { clsx as rc } from "clsx";
import { extendTailwindMerge as ac } from "tailwind-merge";
import { z as d } from "zod";
import { Minus as go, ArrowUp as Ln, ArrowDown as Dn, CalendarRange as bo, ChevronsUpDown as oc, AreaChart as ic, BarChart3 as yo, BarChart4 as cc, Table as sc, Gauge as lc, ScatterChart as uc, PieChart as mc, LineChart as dc, AlertCircle as Mr, ChevronLeft as Or, ChevronRight as tn, ChevronDown as ct, Check as je, ChevronUp as vc, CalendarIcon as xo, MoreVertical as fc, RefreshCw as hc, Image as pc, Sheet as gc, Type as Lr, Hash as sr, Calendar as wo, Search as bc, Table2 as ko, Database as Co, Layers as Dr, Variable as yc, Plus as _t, Trash2 as Lt, ListFilter as xc, Box as No, EyeOff as So, Eye as _o, X as ga, Save as Ro, SlidersHorizontal as wc, Braces as kc, Undo2 as Cc, Redo2 as Nc, RotateCcw as Sc, Pencil as _c, Copy as Rc, Bold as Ac, Italic as Mc, Strikethrough as Oc, Heading1 as Lc, Heading2 as Dc, List as Tc, ListOrdered as zc, Quote as Fc } from "lucide-react";
import * as xn from "@radix-ui/react-popover";
import { cva as Tr } from "class-variance-authority";
import * as Ce from "@radix-ui/react-select";
import Ec from "@cubejs-client/core";
import { format as be, isValid as qt, parseISO as wn, differenceInCalendarDays as $c, subDays as De, startOfMonth as cn, subMonths as sn, startOfQuarter as ln, subQuarters as un, startOfYear as mn, subYears as dn, subWeeks as ba, startOfWeek as ya, endOfWeek as xa, endOfMonth as wa, endOfQuarter as ka, endOfYear as Ca, parse as Ao } from "date-fns";
import { DayPicker as Pc, useDayPicker as Ic } from "react-day-picker";
import { ResponsiveGridLayout as Mo } from "react-grid-layout";
import { useEditor as Oo, EditorContent as Lo } from "@tiptap/react";
import Do from "@tiptap/starter-kit";
const kt = 1, kn = d.object({ var: d.string().min(1) }).strict();
function Te(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Cn = (e) => d.union([e, kn]), jc = d.union([d.string(), d.number(), d.boolean()]), ht = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), lr = d.union([d.tuple([d.string(), d.string()]), d.string()]), To = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), se = d.string().min(1), Vc = d.enum([
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
]), qc = d.object({
  member: se,
  operator: Vc,
  values: d.array(d.union([jc, kn])).optional()
}).strict(), ur = d.lazy(
  () => d.union([
    qc,
    d.object({ and: d.array(ur) }).strict(),
    d.object({ or: d.array(ur) }).strict()
  ])
), Kc = d.object({
  dimension: se,
  granularity: Cn(ht).optional(),
  dateRange: Cn(lr).optional(),
  compareDateRange: d.array(lr).optional()
}).strict(), Na = d.enum(["asc", "desc"]), Hc = d.union([
  d.record(se, Na),
  d.array(d.tuple([se, Na]))
]), zo = d.object({
  measures: d.array(se).optional(),
  dimensions: d.array(se).optional(),
  timeDimensions: d.array(Kc).optional(),
  filters: d.array(ur).optional(),
  segments: d.array(se).optional(),
  order: Hc.optional(),
  limit: Cn(d.number()).optional(),
  offset: Cn(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), Wc = d.string().min(1), hp = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], it = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Bc = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Tn = d.object({
  kind: Bc.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: d.string().optional()
}).strict(), Sa = d.object({
  label: d.string().optional(),
  colorToken: it.optional(),
  stackId: d.string().optional(),
  axis: d.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: Tn.optional()
}).strict(), Uc = d.object({
  category: d.object({ member: se }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(se),
      meta: d.record(se, Sa).optional()
    }).strict(),
    d.object({
      mode: d.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: se,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: d.array(se).optional(),
      pivot: se,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: d.record(se, Sa).optional()
    }).strict()
  ])
}).strict(), Gc = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Yc = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), _a = d.union([d.number(), d.literal("auto")]), Yn = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([_a, _a]).optional(),
  tickFormat: Tn.optional()
}).strict(), Qc = d.object({
  x: Yn.optional(),
  y: Yn.optional(),
  y2: Yn.optional()
}).strict(), Jc = d.object({
  byKey: d.record(d.string(), it).optional(),
  ramp: d.array(it).optional()
}).strict(), Fo = d.object({
  family: Wc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Uc.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Gc.optional(),
  tooltip: Yc.optional(),
  axes: Qc.optional(),
  colors: Jc.optional(),
  format: Tn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), Xc = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), Zc = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), es = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(ht).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: To, label: d.string() }).strict()),
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
}).strict(), zr = {
  id: d.string().min(1),
  title: d.string().optional()
}, ts = d.object({ ...zr, type: d.literal("chart"), query: zo.default({}), chart: Fo }).strict(), ns = d.object({ ...zr, type: d.literal("text"), doc: Xc }).strict(), rs = d.object({ ...zr, type: d.literal("input"), control: es }).strict(), as = d.discriminatedUnion("type", [
  ts,
  ns,
  rs
]), os = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), is = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), Eo = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), cs = d.object({
  name: d.string().min(1),
  type: Eo,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: To.optional()
}).strict(), $o = {
  schemaVersion: d.literal(kt),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, Po = d.object({ ...$o, kind: d.literal("chart"), query: zo.default({}), chart: Fo }).strict(), mr = d.object({
  ...$o,
  kind: d.literal("dashboard"),
  variables: d.array(cs),
  widgets: d.array(as),
  layout: d.array(os),
  grid: is.optional()
}).strict(), Io = d.discriminatedUnion("kind", [Po, mr]), ss = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function ls(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > kt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${kt} — update the library`
    );
  for (; n < kt; ) {
    const r = ss[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return Io.parse(t);
}
function pp(e) {
  try {
    return { ok: !0, spec: ls(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function gp(e) {
  return Io.parse(e);
}
function us(e) {
  return Ec(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ms(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ds = ac({ prefix: "cv" });
function _(...e) {
  return ds(rc(e));
}
function Fr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function vs({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: _("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const fs = Tr(
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
), zn = x.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: _(fs({ variant: t }), e),
    ...n
  }
));
zn.displayName = "Alert";
const Fn = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: _("cv:col-start-2 cv:line-clamp-1 cv:min-h-4 cv:font-medium cv:tracking-tight", e),
      ...t
    }
  )
);
Fn.displayName = "AlertTitle";
const En = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: _(
        "cv:col-start-2 cv:grid cv:justify-items-start cv:gap-1 cv:text-sm cv:text-muted-foreground cv:[&_p]:leading-relaxed",
        e
      ),
      ...t
    }
  )
);
En.displayName = "AlertDescription";
const hs = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, ps = "MMM d, yyyy";
function gs(e) {
  if (e instanceof Date) return qt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return qt(r) ? r : null;
  }
  const t = wn(e);
  if (qt(t)) return t;
  const n = new Date(e);
  return qt(n) ? n : null;
}
function jo(e) {
  return /^\d{4}-\d{2}/.test(e) ? qt(wn(e)) : !1;
}
function bs(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? hs[t] : ps;
}
function Bt(e, t, n) {
  const r = gs(e);
  return r ? be(r, bs(t, n)) : String(e);
}
function bp(e, t) {
  return (n) => n == null ? "" : Bt(n, e, t);
}
function yp(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Bt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Bt(e, t.format, t.granularity) : String(e) : jo(e) ? Bt(e, t.format, t.granularity) : e;
}
const Ra = "—", ys = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Aa(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function xs(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of ys)
    if (n >= r) return Aa((e / r).toFixed(t)) + a;
  return Aa(e.toFixed(t));
}
function ws(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function ks(e, t) {
  const { format: n, meta: r, locale: a } = t, o = n != null && n.abbreviate ? xs(e, n.decimals ?? 1) : ws(e, n, a), c = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${c ? ` ${c}` : ""}`;
}
function Vo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Cs(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Vo(e.value) ? !0 : typeof e.value == "string" ? jo(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Er = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Ra : (Vo(t) || typeof t == "string" || typeof t == "number") && Cs(e) ? Bt(t, n, r) : typeof t == "number" ? ks(t, e) : String(t);
};
function Ns(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function xp(e, t) {
  return (n, r) => {
    const a = r ? Ns(r, t) : void 0;
    return Er({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Ss(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function _s(e) {
  const t = ht.safeParse(e);
  return t.success ? t.data : void 0;
}
function Rs(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const o = _s(a.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function qo(e, t, n, r) {
  const a = Rs(e, t);
  return {
    value(o, c, s = "value") {
      const l = c ? Ss(c, e) : void 0, u = l == null ? void 0 : l.meta;
      return n({
        value: o,
        member: c,
        meta: u,
        title: (l == null ? void 0 : l.shortTitle) ?? (l == null ? void 0 : l.title),
        role: s,
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
}
const nn = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  side: d.enum(["left", "right"]).optional(),
  // combo dual-axis: which y-scale
  label: d.string().optional(),
  colorToken: it.optional()
}).strict(), $r = d.boolean().optional(), As = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(nn).optional(),
  comparePrevious: $r
}).strict(), Pr = d.enum(["linear", "monotone", "step", "natural"]), Ms = d.object({
  curve: Pr.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(nn).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: $r
}).strict(), Os = d.object({
  curve: Pr.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(nn).optional(),
  comparePrevious: $r
}).strict(), Ls = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), Ds = d.object({
  x: se,
  y: se,
  size: se.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: se.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(nn).optional()
}).strict(), Ts = d.object({
  display: d.enum(["number", "gauge"]).optional(),
  measure: se,
  comparison: d.object({
    mode: d.enum(["previousPeriod", "value"]),
    value: d.union([se, d.number()]).optional(),
    showAsPercent: d.boolean().optional(),
    goodDirection: d.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: d.object({
    member: se.optional(),
    timeDimension: se.optional(),
    granularity: d.union([ht, kn]).optional(),
    dateRange: d.union([lr, kn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: d.enum(["up", "down"]).optional(),
  gauge: d.object({
    min: d.number().optional(),
    max: d.number(),
    thresholds: d.array(d.object({ at: d.number(), colorToken: it }).strict()).optional()
  }).strict().optional(),
  icon: d.string().optional()
}).strict(), zs = d.object({
  member: se,
  label: d.string().optional(),
  format: Tn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), Fs = d.object({
  member: se,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: it.optional()
}).strict(), Es = d.object({
  columns: d.array(zs).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(Fs).optional()
}).strict(), $s = d.object({
  member: se,
  render: d.enum(["bar", "line", "area"]),
  axis: d.enum(["left", "right"]).optional(),
  colorToken: it.optional(),
  stackId: d.string().optional(),
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: d.boolean().optional(),
  label: d.string().optional()
}).strict(), Ps = d.object({
  series: d.array($s),
  referenceLines: d.array(nn).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: Pr.optional(),
  dots: d.boolean().optional(),
  connectNulls: d.boolean().optional(),
  strokeWidth: d.number().optional(),
  fillOpacity: d.number().optional(),
  barRadius: d.number().optional()
}).strict(), Je = {
  bar: As,
  line: Ms,
  area: Os,
  pie: Ls,
  scatter: Ds,
  kpi: Ts,
  table: Es,
  combo: Ps
}, Xe = {
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
function Ma(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function dr(e, t) {
  if (t === void 0) return e;
  if (!Ma(e) || !Ma(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? dr(e[r], a) : a);
  }
  return n;
}
const Is = { envelope: {}, familyOptions: {} };
function js(e, t) {
  return {
    ...dr({ ...t.envelope }, e),
    familyOptions: dr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Vs = { light: "", dark: ".dark" }, Ko = x.createContext(null);
function Ho() {
  const e = x.useContext(Ko);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const st = x.forwardRef(({ id: e, className: t, children: n, config: r, ...a }, o) => {
  const c = x.useId(), s = `chart-${e || c.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Ko.Provider, { value: { config: r }, children: /* @__PURE__ */ v(
    "div",
    {
      "data-chart": s,
      ref: o,
      className: _(
        "cv:flex cv:h-full cv:w-full cv:justify-center cv:text-xs cv:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground cv:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 cv:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border cv:[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border cv:[&_.recharts-radial-bar-background-sector]:fill-muted cv:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted cv:[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border cv:[&_.recharts-sector]:outline-none cv:[&_.recharts-sector[stroke='#fff']]:stroke-transparent cv:[&_.recharts-surface]:outline-none",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ i(qs, { id: s, config: r }),
        /* @__PURE__ */ i(_r.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
st.displayName = "ChartContainer";
const qs = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, r]) => r.theme || r.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Vs).map(
          ([r, a]) => `
${a} [data-chart=${e}] {
${n.map(([o, c]) => {
            var l;
            const s = ((l = c.theme) == null ? void 0 : l[r]) || c.color;
            return s ? `  ${Fr(o)}: ${s};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, Dt = _r.Tooltip, bt = x.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: r = "dot",
    hideLabel: a = !1,
    hideIndicator: o = !1,
    label: c,
    labelFormatter: s,
    labelClassName: l,
    formatter: u,
    valueFormatter: m,
    color: f,
    nameKey: h,
    labelKey: y
  }, g) => {
    const { config: p } = Ho(), b = x.useMemo(() => {
      var L;
      if (a || !(t != null && t.length))
        return null;
      const [k] = t, C = `${y || (k == null ? void 0 : k.dataKey) || (k == null ? void 0 : k.name) || "value"}`, S = vr(p, k, C), N = !y && typeof c == "string" ? ((L = p[c]) == null ? void 0 : L.label) || c : S == null ? void 0 : S.label;
      return s ? /* @__PURE__ */ i("div", { className: _("cv:font-medium", l), children: s(N, t) }) : N ? /* @__PURE__ */ i("div", { className: _("cv:font-medium", l), children: N }) : null;
    }, [c, s, t, a, l, p, y]);
    if (!e || !(t != null && t.length))
      return null;
    const w = t.length === 1 && r !== "dot";
    return /* @__PURE__ */ v(
      "div",
      {
        ref: g,
        className: _(
          "cv:grid cv:min-w-32 cv:items-start cv:gap-1.5 cv:rounded-lg cv:border cv:border-border/40 cv:bg-background cv:px-3 cv:py-2 cv:text-xs cv:shadow-lg",
          n
        ),
        children: [
          w ? null : b,
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((k, C) => {
            var T;
            const S = `${h || k.name || k.dataKey || "value"}`, N = vr(p, k, S), L = f || ((T = k.payload) == null ? void 0 : T.fill) || k.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: _(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  r === "dot" && "cv:items-center"
                ),
                children: u && (k == null ? void 0 : k.value) !== void 0 && k.name ? u(k.value, k.name, k, C, k.payload) : /* @__PURE__ */ v(le, { children: [
                  N != null && N.icon ? /* @__PURE__ */ i(N.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: _(
                        "cv:shrink-0 cv:rounded-[2px] cv:border-[--color-border] cv:bg-[--color-bg]",
                        {
                          "cv:h-2.5 cv:w-2.5": r === "dot",
                          "cv:w-1": r === "line",
                          "cv:w-0 cv:border-[1.5px] cv:border-dashed cv:bg-transparent": r === "dashed",
                          "cv:my-0.5": w && r === "dashed"
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
                      className: _(
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
bt.displayName = "ChartTooltipContent";
const Tt = _r.Legend, yt = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: r = "bottom", nameKey: a }, o) => {
    const { config: c } = Ho();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: _(
          "cv:flex cv:items-center cv:justify-center cv:gap-4",
          r === "top" ? "cv:pb-3" : "cv:pt-3",
          e
        ),
        children: n.map((s) => {
          const l = `${a || s.dataKey || "value"}`, u = vr(c, s, l);
          return /* @__PURE__ */ v(
            "div",
            {
              className: _(
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
yt.displayName = "ChartLegendContent";
function vr(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let a = n;
  return n in t && typeof t[n] == "string" ? a = t[n] : r && n in r && typeof r[n] == "string" && (a = r[n]), a in e ? e[a] : e[n];
}
function Ir(e) {
  return e.categories.map((t, n) => {
    const r = { __cat: typeof t == "number" ? t : String(t) };
    for (const a of e.series) r[a.key] = a.data[n] ?? null;
    return r;
  });
}
function zt(e) {
  return e === "top" ? "top" : "bottom";
}
function Ft(e) {
  return "horizontal";
}
function Et(e) {
  return "center";
}
function Re(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function Ve(e) {
  return e == null ? void 0 : e.domain;
}
function qe(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Ks(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Ut(e) {
  return `var(${Fr(e.key)})`;
}
function Hs(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Wo(e) {
  return e === "stacked" || e === "percent";
}
function $n(e, t) {
  var s, l, u, m, f, h, y, g, p, b, w, k, C, S;
  const n = e.raw.annotation, r = (N) => {
    var L, T, P, q, R, O;
    if (N)
      return ((L = n == null ? void 0 : n.measures[N]) == null ? void 0 : L.shortTitle) ?? ((T = n == null ? void 0 : n.dimensions[N]) == null ? void 0 : T.shortTitle) ?? ((P = n == null ? void 0 : n.timeDimensions[N]) == null ? void 0 : P.shortTitle) ?? ((q = n == null ? void 0 : n.measures[N]) == null ? void 0 : q.title) ?? ((R = n == null ? void 0 : n.dimensions[N]) == null ? void 0 : R.title) ?? ((O = n == null ? void 0 : n.timeDimensions[N]) == null ? void 0 : O.title) ?? N;
  }, a = e.series.find((N) => {
    var L;
    return (((L = N.meta) == null ? void 0 : L.axis) ?? "left") !== "right";
  }), o = e.series.find((N) => {
    var L;
    return ((L = N.meta) == null ? void 0 : L.axis) === "right";
  }), c = (N) => {
    var L;
    return N ? (L = N.meta) != null && L.measure ? r(N.meta.measure) : N.label : void 0;
  };
  return {
    x: (l = (s = t.axes) == null ? void 0 : s.x) != null && l.labelHide ? void 0 : ((m = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : m.label) ?? r((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (g = (y = t.axes) == null ? void 0 : y.y) != null && g.labelHide ? void 0 : ((b = (p = t.axes) == null ? void 0 : p.y) == null ? void 0 : b.label) ?? c(a),
    right: (k = (w = t.axes) == null ? void 0 : w.y2) != null && k.labelHide ? void 0 : ((S = (C = t.axes) == null ? void 0 : C.y2) == null ? void 0 : S.label) ?? c(o)
  };
}
function nt(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function jr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function rn(e, t, n) {
  return (r, a) => {
    const o = a == null ? void 0 : a.dataKey, c = typeof o == "string" || typeof o == "number" ? String(o) : void 0, s = (c ? n == null ? void 0 : n.get(c) : void 0) ?? t ?? c;
    return e.value(r, s, "tooltip");
  };
}
function Vr(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function fr(e) {
  return (t, n) => {
    const r = typeof t == "number" ? t : Number(t), a = n == null ? void 0 : n.payload;
    let o = 0;
    if (a)
      for (const [c, s] of Object.entries(a)) {
        if (c === "__cat") continue;
        const l = typeof s == "number" ? s : Number(s);
        Number.isFinite(l) && (o += l);
      }
    return !Number.isFinite(r) || !Number.isFinite(o) || o === 0 ? "" : Vr(r / o, e);
  };
}
function Ws({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var R, O, z, A, D, Q, Z, ee, E, H, W, B, re, me, U, $;
  const o = t.familyOptions ?? {}, c = t.orientation === "horizontal", s = Wo(t.stackMode), l = t.stackMode === "percent", u = Ir(e), m = (V, J, ae = "value") => l ? Vr(V) : r.value(V, J, ae), f = (V) => {
    if (l) {
      const J = fr();
      return ((ae, fe) => J(typeof ae == "boolean" ? Number(ae) : ae, fe));
    }
    return ((J) => m(typeof J == "boolean" ? Number(J) : J, nt(V), "label"));
  }, h = (V) => r.category(V), y = jr(e), g = nt(e.series[0]), p = c ? (O = (R = t.axes) == null ? void 0 : R.y) == null ? void 0 : O.hide : (A = (z = t.axes) == null ? void 0 : z.x) == null ? void 0 : A.hide, b = c ? (D = t.axes) == null ? void 0 : D.x : (Q = t.axes) == null ? void 0 : Q.y, w = !c && e.series.some((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) === "right";
  }), k = nt(e.series.find((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) !== "right";
  })) ?? g, C = nt(e.series.find((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) === "right";
  })), S = $n(e, t), N = S.x ? { value: S.x, position: "insideBottom", offset: -2 } : void 0, L = S.x ? { value: S.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, T = S.left ? { value: S.left, position: "insideBottom", offset: -2 } : void 0, P = S.left ? { value: S.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, q = S.right ? { value: S.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(st, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    qi,
    {
      accessibilityLayer: !0,
      data: u,
      layout: c ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Zt, { vertical: c, horizontal: !c }),
        c ? /* @__PURE__ */ v(le, { children: [
          /* @__PURE__ */ i(
            Ge,
            {
              type: "category",
              dataKey: "__cat",
              hide: p,
              tickFormatter: h,
              label: L
            }
          ),
          /* @__PURE__ */ i(
            Nt,
            {
              type: "number",
              hide: b == null ? void 0 : b.hide,
              scale: qe(b),
              domain: Ve(b),
              tickFormatter: (V) => m(V, g, "axis"),
              label: T
            }
          )
        ] }) : /* @__PURE__ */ v(le, { children: [
          /* @__PURE__ */ i(
            Nt,
            {
              type: "category",
              dataKey: "__cat",
              hide: p,
              tickFormatter: h,
              label: N
            }
          ),
          /* @__PURE__ */ i(
            Ge,
            {
              yAxisId: "left",
              type: "number",
              hide: b == null ? void 0 : b.hide,
              scale: qe(b),
              domain: Ve(b),
              tickFormatter: (V) => m(V, k, "axis"),
              label: P
            }
          ),
          w && /* @__PURE__ */ i(
            Ge,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (ee = (Z = t.axes) == null ? void 0 : Z.y2) == null ? void 0 : ee.hide,
              scale: qe((E = t.axes) == null ? void 0 : E.y2),
              domain: Ve((H = t.axes) == null ? void 0 : H.y2),
              tickFormatter: (V) => m(V, C, "axis"),
              label: q
            }
          )
        ] }),
        ((W = t.tooltip) == null ? void 0 : W.show) !== !1 && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(
              bt,
              {
                labelFormatter: (V) => r.category(V),
                indicator: ((B = t.tooltip) == null ? void 0 : B.indicator) ?? "dot",
                valueFormatter: l ? fr() : rn(r, void 0, y)
              }
            )
          }
        ),
        Re(t).show && /* @__PURE__ */ i(
          Tt,
          {
            content: /* @__PURE__ */ i(yt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: zt((re = t.legend) == null ? void 0 : re.position),
            layout: Ft((me = t.legend) == null ? void 0 : me.position),
            align: Et((U = t.legend) == null ? void 0 : U.position)
          }
        ),
        e.series.map((V) => {
          var J, ae, fe, we;
          return /* @__PURE__ */ i(
            so,
            {
              yAxisId: c ? void 0 : ((J = V.meta) == null ? void 0 : J.axis) === "right" && w ? "right" : "left",
              dataKey: V.key,
              name: V.label,
              stackId: s ? (ae = V.meta) != null && ae.companion ? "__prev" : ((fe = V.meta) == null ? void 0 : fe.stackId) ?? "stack" : void 0,
              fill: Ut(V),
              fillOpacity: (we = V.meta) != null && we.companion ? 0.4 : void 0,
              radius: Ks(o.barRadius, c),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                lo,
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
        ($ = o.referenceLines) == null ? void 0 : $.map((V, J) => {
          var Pe;
          const ae = V.axis === "y" !== c, fe = c ? void 0 : "left";
          if (ae) {
            const G = c ? { x: V.value } : { y: V.value };
            return /* @__PURE__ */ i(
              ot,
              {
                yAxisId: fe,
                ...G,
                label: V.label,
                stroke: `var(--${V.colorToken ?? "muted-foreground"})`,
                strokeDasharray: "4 4"
              },
              J
            );
          }
          const we = (Pe = u[V.value]) == null ? void 0 : Pe.__cat;
          return we == null ? null : /* @__PURE__ */ i(
            ot,
            {
              yAxisId: fe,
              ...c ? { y: we } : { x: we },
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
function Bs({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var k, C, S, N, L, T, P, q, R, O, z, A, D, Q, Z, ee;
  const o = t.familyOptions ?? {}, c = o.chrome === "none", s = Ir(e), l = (E) => r.category(E), u = e.series.some((E) => {
    var H;
    return ((H = E.meta) == null ? void 0 : H.axis) === "right";
  }), m = o.curve ?? "monotone", f = jr(e), h = nt(e.series.find((E) => {
    var H;
    return ((H = E.meta) == null ? void 0 : H.axis) !== "right";
  })), y = nt(e.series.find((E) => {
    var H;
    return ((H = E.meta) == null ? void 0 : H.axis) === "right";
  })), g = $n(e, t), p = s.length <= 1, b = !c && (o.dots === !0 || p), w = !c;
  return /* @__PURE__ */ i(
    st,
    {
      config: n,
      className: c ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(Ki, { accessibilityLayer: !0, data: s, margin: c ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !c && /* @__PURE__ */ i(Zt, { vertical: !1 }),
        /* @__PURE__ */ i(
          Nt,
          {
            type: "category",
            dataKey: "__cat",
            hide: c || ((C = (k = t.axes) == null ? void 0 : k.x) == null ? void 0 : C.hide),
            tickFormatter: l,
            label: !c && g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Ge,
          {
            yAxisId: "left",
            type: "number",
            hide: c || ((N = (S = t.axes) == null ? void 0 : S.y) == null ? void 0 : N.hide),
            scale: qe((L = t.axes) == null ? void 0 : L.y),
            domain: Ve((T = t.axes) == null ? void 0 : T.y),
            tickFormatter: (E) => r.value(E, h, "axis"),
            label: !c && g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Ge,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: c || ((q = (P = t.axes) == null ? void 0 : P.y2) == null ? void 0 : q.hide),
            scale: qe((R = t.axes) == null ? void 0 : R.y2),
            domain: Ve((O = t.axes) == null ? void 0 : O.y2),
            tickFormatter: (E) => r.value(E, y, "axis"),
            label: !c && g.right ? { value: g.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !c && ((z = t.tooltip) == null ? void 0 : z.show) !== !1 && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(
              bt,
              {
                labelFormatter: (E) => r.category(E),
                indicator: ((A = t.tooltip) == null ? void 0 : A.indicator) ?? "line",
                valueFormatter: rn(r, void 0, f)
              }
            )
          }
        ),
        !c && Re(t).show && /* @__PURE__ */ i(
          Tt,
          {
            content: /* @__PURE__ */ i(yt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: zt((D = t.legend) == null ? void 0 : D.position),
            layout: Ft((Q = t.legend) == null ? void 0 : Q.position),
            align: Et((Z = t.legend) == null ? void 0 : Z.position)
          }
        ),
        e.series.map((E) => {
          var H, W, B, re, me, U;
          return /* @__PURE__ */ i(
            uo,
            {
              yAxisId: u && ((H = E.meta) == null ? void 0 : H.axis) === "right" ? "right" : "left",
              type: ((W = E.meta) == null ? void 0 : W.curve) ?? m,
              dataKey: E.key,
              name: E.label,
              stroke: Ut(E),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (B = E.meta) != null && B.companion ? "5 4" : void 0,
              strokeOpacity: (re = E.meta) != null && re.companion ? 0.55 : void 0,
              dot: c || (me = E.meta) != null && me.companion ? !1 : ((U = E.meta) == null ? void 0 : U.dots) ?? b,
              activeDot: w,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !c,
              children: !c && o.showValueLabels && /* @__PURE__ */ i(
                lo,
                {
                  dataKey: E.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: ($) => r.value(typeof $ == "boolean" ? Number($) : $, nt(E), "label")
                }
              )
            },
            E.key
          );
        }),
        !c && ((ee = o.referenceLines) == null ? void 0 : ee.map((E, H) => {
          var W;
          if (E.axis === "x") {
            const B = (W = s[E.value]) == null ? void 0 : W.__cat;
            return B == null ? null : /* @__PURE__ */ i(
              ot,
              {
                yAxisId: "left",
                x: B,
                label: E.label,
                stroke: `var(--${E.colorToken ?? "muted-foreground"})`,
                strokeDasharray: "4 4"
              },
              H
            );
          }
          return /* @__PURE__ */ i(
            ot,
            {
              yAxisId: "left",
              y: E.value,
              label: E.label,
              stroke: `var(--${E.colorToken ?? "muted-foreground"})`,
              strokeDasharray: "4 4"
            },
            H
          );
        }))
      ] })
    }
  );
}
function Us({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var b, w, k, C, S, N, L, T, P, q, R, O, z, A;
  const o = t.familyOptions ?? {}, c = ((w = (b = t.mapping) == null ? void 0 : b.series) == null ? void 0 : w.mode) === "pivot", s = t.stackMode ?? (c ? "stacked" : "none"), l = Wo(s), u = s === "percent", m = Ir(e), f = (D) => r.category(D), h = o.curve ?? "monotone", y = jr(e), g = nt(e.series[0]), p = $n(e, t);
  return /* @__PURE__ */ i(st, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(mo, { accessibilityLayer: !0, data: m, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Zt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((D) => /* @__PURE__ */ v("linearGradient", { id: `fill-${D.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Ut(D), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Ut(D), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, D.key)) }),
    /* @__PURE__ */ i(
      Nt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (C = (k = t.axes) == null ? void 0 : k.x) == null ? void 0 : C.hide,
        tickFormatter: f,
        label: p.x ? { value: p.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ge,
      {
        type: "number",
        hide: (N = (S = t.axes) == null ? void 0 : S.y) == null ? void 0 : N.hide,
        scale: qe((L = t.axes) == null ? void 0 : L.y),
        domain: Ve((T = t.axes) == null ? void 0 : T.y),
        tickFormatter: (D) => u ? Vr(D) : r.value(D, g, "axis"),
        label: p.left ? { value: p.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((P = t.tooltip) == null ? void 0 : P.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          bt,
          {
            labelFormatter: (D) => r.category(D),
            indicator: ((q = t.tooltip) == null ? void 0 : q.indicator) ?? "dot",
            valueFormatter: u ? fr() : rn(r, void 0, y)
          }
        )
      }
    ),
    Re(t).show && /* @__PURE__ */ i(
      Tt,
      {
        content: /* @__PURE__ */ i(yt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: zt((R = t.legend) == null ? void 0 : R.position),
        layout: Ft((O = t.legend) == null ? void 0 : O.position),
        align: Et((z = t.legend) == null ? void 0 : z.position)
      }
    ),
    e.series.map((D) => {
      var Q, Z, ee, E, H, W, B, re, me;
      return u && ((Q = D.meta) != null && Q.companion) ? null : /* @__PURE__ */ i(
        Rr,
        {
          type: ((Z = D.meta) == null ? void 0 : Z.curve) ?? h,
          dataKey: D.key,
          name: D.label,
          stackId: l && !((ee = D.meta) != null && ee.companion) ? ((E = D.meta) == null ? void 0 : E.stackId) ?? "stack" : void 0,
          stroke: Ut(D),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (H = D.meta) != null && H.companion ? "5 4" : void 0,
          strokeOpacity: (W = D.meta) != null && W.companion ? 0.55 : void 0,
          fill: (B = D.meta) != null && B.companion ? "none" : `url(#fill-${D.key})`,
          fillOpacity: 1,
          dot: (re = D.meta) != null && re.companion ? !1 : ((me = D.meta) == null ? void 0 : me.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        D.key
      );
    }),
    (A = o.referenceLines) == null ? void 0 : A.map((D, Q) => {
      var Z;
      if (D.axis === "x") {
        const ee = (Z = m[D.value]) == null ? void 0 : Z.__cat;
        return ee == null ? null : /* @__PURE__ */ i(
          ot,
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
        ot,
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
function Gs({ data: e, options: t, format: n, editing: r }) {
  var p, b, w, k, C;
  const a = t.familyOptions ?? {}, o = e.series[0], c = e.categories.map((S, N) => {
    const L = n.category(S);
    return {
      key: `slice-${N}`,
      label: L,
      value: (o == null ? void 0 : o.data[N]) ?? 0,
      fill: `var(--${ke[N % ke.length]})`
    };
  }), s = Ys(c, a.maxSlices), l = s.reduce((S, N) => S + N.value, 0);
  if (s.some((S) => S.value < 0))
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "Pie charts can't show negative values" });
  if (s.length === 0 || l <= 0)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const u = {};
  s.forEach((S, N) => {
    u[S.key] = {
      label: S.label,
      color: `var(--${ke[N % ke.length]})`
    };
  });
  const m = `${a.innerRadiusPct ?? 0}%`, f = `${a.outerRadiusPct ?? 80}%`, h = (a.innerRadiusPct ?? 0) > 0, y = a.showLabels ?? "percent", g = y === "none" ? !1 : ({ payload: S, percent: N }) => {
    const L = S;
    return y === "name" ? (L == null ? void 0 : L.label) ?? "" : y === "value" ? n.value(L == null ? void 0 : L.value, o == null ? void 0 : o.key, "label") : `${((N !== void 0 ? N : L && l > 0 ? L.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(st, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(Hi, { accessibilityLayer: !0, children: [
    ((p = t.tooltip) == null ? void 0 : p.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          bt,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((b = t.tooltip) == null ? void 0 : b.indicator) ?? "dot",
            valueFormatter: rn(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ v(
      Wi,
      {
        data: s,
        dataKey: "value",
        nameKey: "label",
        innerRadius: m,
        outerRadius: f,
        paddingAngle: a.padAngle,
        cornerRadius: a.cornerRadius,
        label: g,
        labelLine: y !== "none" && !h,
        isAnimationActive: !1,
        children: [
          s.map((S) => /* @__PURE__ */ i(vo, { fill: S.fill }, S.key)),
          h && a.centerLabel && /* @__PURE__ */ i(
            Bi,
            {
              position: "center",
              content: ({ viewBox: S }) => {
                var P, q;
                if (!S || !("cx" in S)) return null;
                const { cx: N, cy: L } = S, T = ((P = a.centerLabel) == null ? void 0 : P.value) === void 0 || a.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : a.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: N, y: L, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: N, y: L, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: T }),
                  ((q = a.centerLabel) == null ? void 0 : q.label) && /* @__PURE__ */ i("tspan", { x: N, y: L + 20, className: "cv:fill-muted-foreground cv:text-xs", children: a.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    Re(t).show && /* @__PURE__ */ i(
      Tt,
      {
        content: /* @__PURE__ */ i(
          yt,
          {
            nameKey: "label",
            className: Re(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: zt((w = t.legend) == null ? void 0 : w.position),
        layout: Ft((k = t.legend) == null ? void 0 : k.position),
        align: Et((C = t.legend) == null ? void 0 : C.position)
      }
    )
  ] }) });
}
function Ys(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((s, l) => l.value - s.value), r = n.slice(0, t - 1), o = n.slice(t - 1).reduce((s, l) => s + l.value, 0), c = t - 1;
  return [
    ...r,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${ke[c % ke.length]})`
    }
  ];
}
function Qs({ data: e, options: t, format: n, editing: r }) {
  var g, p, b, w, k, C, S, N, L, T, P, q, R, O, z, A, D, Q, Z, ee, E, H, W, B, re, me;
  const a = t.familyOptions ?? {}, o = e.raw.annotation, c = e.raw.rows;
  if (!a.x || !a.y)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const s = { x: a.x, y: a.y, z: a.size }, l = ((g = o == null ? void 0 : o.measures[a.x]) == null ? void 0 : g.shortTitle) ?? ((p = o == null ? void 0 : o.dimensions[a.x]) == null ? void 0 : p.shortTitle) ?? a.x, u = ((b = o == null ? void 0 : o.measures[a.y]) == null ? void 0 : b.shortTitle) ?? ((w = o == null ? void 0 : o.dimensions[a.y]) == null ? void 0 : w.shortTitle) ?? a.y, m = (C = (k = t.axes) == null ? void 0 : k.x) != null && C.labelHide ? void 0 : ((N = (S = t.axes) == null ? void 0 : S.x) == null ? void 0 : N.label) ?? l, f = (T = (L = t.axes) == null ? void 0 : L.y) != null && T.labelHide ? void 0 : ((q = (P = t.axes) == null ? void 0 : P.y) == null ? void 0 : q.label) ?? u, h = Js(c, a);
  if (!h.some((U) => U.points.some(($) => Number.isFinite($.x) && Number.isFinite($.y))))
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const y = {};
  return h.forEach((U, $) => {
    y[U.key] = { label: U.label, color: `var(--${ke[$ % ke.length]})` };
  }), /* @__PURE__ */ i(st, { config: y, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ui, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Zt, {}),
    /* @__PURE__ */ i(
      Nt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: (O = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : O.hide,
        scale: qe((z = t.axes) == null ? void 0 : z.x),
        domain: Ve((A = t.axes) == null ? void 0 : A.x),
        tickFormatter: (U) => n.value(U, a.x, "axis"),
        label: m ? { value: m, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ge,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (Q = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : Q.hide,
        scale: qe((Z = t.axes) == null ? void 0 : Z.y),
        domain: Ve((ee = t.axes) == null ? void 0 : ee.y),
        tickFormatter: (U) => n.value(U, a.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    a.size && /* @__PURE__ */ i(Gi, { type: "number", dataKey: "z", range: a.sizeRange ?? [40, 400], name: a.size }),
    ((E = t.tooltip) == null ? void 0 : E.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          bt,
          {
            indicator: ((H = t.tooltip) == null ? void 0 : H.indicator) ?? "dot",
            valueFormatter: (U, $) => {
              const V = $ == null ? void 0 : $.dataKey, J = typeof V == "string" ? s[V] : void 0;
              return n.value(U, J, "tooltip");
            }
          }
        )
      }
    ),
    Re(t).show && h.length > 1 && /* @__PURE__ */ i(
      Tt,
      {
        content: /* @__PURE__ */ i(yt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: zt((W = t.legend) == null ? void 0 : W.position),
        layout: Ft((B = t.legend) == null ? void 0 : B.position),
        align: Et((re = t.legend) == null ? void 0 : re.position)
      }
    ),
    h.map((U, $) => /* @__PURE__ */ i(
      Yi,
      {
        name: U.label,
        data: U.points,
        shape: a.shape ?? "circle",
        fill: `var(--color-${U.key})`,
        children: h.length === 1 && U.points.map((V, J) => /* @__PURE__ */ i(vo, { fill: `var(--${ke[$ % ke.length]})` }, J))
      },
      U.key
    )),
    (me = a.referenceLines) == null ? void 0 : me.map((U, $) => /* @__PURE__ */ i(
      ot,
      {
        ...U.axis === "y" ? { y: U.value } : { x: U.value },
        label: U.label,
        stroke: `var(--${U.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      $
    ))
  ] }) });
}
function Js(e, t) {
  const n = (a) => ({
    x: Qn(a[t.x]),
    y: Qn(a[t.y]),
    ...t.size ? { z: Qn(a[t.size]) } : {}
  });
  if (!t.groupBy)
    return [{ key: "series-0", label: "Points", points: e.map(n) }];
  const r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = String(a[t.groupBy] ?? "—"), c = r.get(o) ?? [];
    c.push(n(a)), r.set(o, c);
  }
  return [...r.entries()].map(([a, o], c) => ({
    key: `series-${c}`,
    label: a,
    points: o
  }));
}
function Qn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Xs(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Zs(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function el(e) {
  var l, u, m, f;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, o = (h) => r.value(h, a.measure, "kpi"), c = Bo([t.raw.rows[0] ?? {}], a.measure), s = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : f.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ i(sl, { value: c, label: s, fmt: o, fo: a }) : /* @__PURE__ */ i(tl, { ...e, value: c, label: s, fo: a, fmt: o });
}
function tl({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var h;
  const a = n.goodDirection ?? ((h = n.comparison) == null ? void 0 : h.goodDirection) ?? "up", o = t === null ? null : ul(e.raw.rows, t, n), c = !!n.comparison, s = c && !o && nl(e.raw.query, n), l = n.sparkline ? e.series[0] : void 0, u = !!l && l.data.some((y) => y !== null), m = o ? o.diff : l ? il(l) : 0, f = Zs(Xs(m, a));
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", style: { containerType: "size" }, children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:flex-col cv:items-center cv:justify-center cv:gap-1.5 cv:overflow-hidden cv:px-3 cv:text-center", children: [
      /* @__PURE__ */ i(
        "span",
        {
          className: _(
            "cv:max-w-full cv:font-bold cv:leading-none cv:tabular-nums",
            t === null ? "cv:text-muted-foreground" : "cv:text-foreground"
          ),
          style: { fontSize: "clamp(1.25rem, min(16cqw, 30cqh), 3.5rem)", whiteSpace: "nowrap" },
          children: t === null ? "—" : r(t)
        }
      ),
      c && (o ? /* @__PURE__ */ i(cl, { delta: o, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ i(rl, {}) : /* @__PURE__ */ i(al, {}))
    ] }),
    u && /* @__PURE__ */ i("div", { className: "cv:shrink-0 cv:px-1 cv:pb-1", children: /* @__PURE__ */ i(ol, { series: l, categories: e.categories, colorClass: f }) })
  ] });
}
function nl(e, t) {
  var r, a, o;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (o = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : o.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((c) => !c) : String(n).trim() === "";
}
function rl() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-amber-500/10 cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-amber-600",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ i(bo, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "set a date range to compare" })
      ]
    }
  );
}
function al() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-muted cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-muted-foreground",
      title: "No data in the comparison period",
      children: [
        /* @__PURE__ */ i(go, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "no prior data" })
      ]
    }
  );
}
function ol({
  series: e,
  categories: t,
  colorClass: n
}) {
  const r = fo(), a = t.map((o, c) => ({ x: typeof o == "number" ? o : String(o), v: e.data[c] ?? null }));
  return /* @__PURE__ */ i("div", { className: _("cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(Zi, { width: "100%", height: "100%", children: /* @__PURE__ */ v(mo, { data: a, margin: { top: 3, right: 0, bottom: 0, left: 0 }, children: [
    /* @__PURE__ */ i("defs", { children: /* @__PURE__ */ v("linearGradient", { id: r, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "0%", stopColor: "currentColor", stopOpacity: 0.28 }),
      /* @__PURE__ */ i("stop", { offset: "100%", stopColor: "currentColor", stopOpacity: 0.02 })
    ] }) }),
    /* @__PURE__ */ i(
      Rr,
      {
        dataKey: "v",
        type: "monotone",
        stroke: "currentColor",
        strokeWidth: 1.75,
        fill: `url(#${r})`,
        dot: !1,
        isAnimationActive: !1,
        connectNulls: !0
      }
    )
  ] }) }) });
}
function il(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function cl({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = e.diff > 0, o = e.diff === 0, c = o ? !0 : a === (t === "up"), s = o ? go : a ? Ln : Dn, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: _(
        "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:px-2 cv:py-0.5 cv:text-sm cv:font-semibold cv:leading-none cv:tabular-nums",
        o ? "cv:bg-muted cv:text-muted-foreground" : c ? "cv:bg-emerald-500/10 cv:text-emerald-600" : "cv:bg-destructive/10 cv:text-destructive"
      ),
      title: `vs prior period: ${e.diff > 0 ? "+" : ""}${r(e.diff)}`,
      children: [
        /* @__PURE__ */ i(s, { className: "cv:size-3.5 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: l })
      ]
    }
  );
}
function sl({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var f, h;
  const a = ((f = r.gauge) == null ? void 0 : f.min) ?? 0, o = ((h = r.gauge) == null ? void 0 : h.max) ?? Math.max(e ?? 0, 1), c = o > a ? o : a + 1, s = e === null ? a : Math.max(a, Math.min(c, e)), l = (e === null ? void 0 : ll(e, r)) ?? "chart-1", u = [{ name: t, value: s, fill: `var(--${l})` }], m = { value: { label: t, color: `var(--${l})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(st, { config: m, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      Qi,
      {
        data: u,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Ji, { type: "number", domain: [a, c], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(Xi, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ v("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center", children: [
      /* @__PURE__ */ i(
        "span",
        {
          className: _(
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
function ll(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const o of [...n].sort((c, s) => c.at - s.at))
    e >= o.at && (r = o.colorToken);
  return r;
}
function Bo(e, t) {
  for (const n of e) {
    const r = Uo(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function ul(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = Bo(e, r.value));
  else {
    const s = e[1];
    a = s ? Uo(s[n.measure]) : null;
  }
  if (a === null) return null;
  const o = t - a, c = a !== 0 ? o / a : null;
  return { current: t, baseline: a, diff: o, pct: c };
}
function Uo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Go = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: _("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
Go.displayName = "Table";
const Yo = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: _("cv:[&_tr]:border-b", e), ...t }));
Yo.displayName = "TableHeader";
const Qo = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: _("cv:[&_tr:last-child]:border-0", e), ...t }));
Qo.displayName = "TableBody";
const fn = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: _(
        "cv:border-b cv:border-border cv:transition-colors cv:hover:bg-muted/50 cv:data-[state=selected]:bg-muted",
        e
      ),
      ...t
    }
  )
);
fn.displayName = "TableRow";
const hr = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: _(
      "cv:h-10 cv:px-2 cv:text-left cv:align-middle cv:font-medium cv:text-muted-foreground cv:[&:has([role=checkbox])]:pr-0",
      e
    ),
    ...t
  }
));
hr.displayName = "TableHead";
const hn = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: _("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
hn.displayName = "TableCell";
const ml = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: _("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
ml.displayName = "TableCaption";
const Jo = Tr(
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
  ({ className: e, variant: t, size: n, type: r, ...a }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: r ?? "button",
      className: _(Jo({ variant: t, size: n }), e),
      ...a
    }
  )
);
Y.displayName = "Button";
function dl({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, o = e.raw.annotation, c = x.useMemo(
    () => vl(a, o, r, n),
    [a, o, r, n]
  ), [s, l] = x.useState(null), [u, m] = x.useState(0), f = r.sortable !== !1, h = r.pageSize ?? 25, y = x.useMemo(() => {
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1;
    return [...a].sort((S, N) => bl(S[s.member], N[s.member]) * C);
  }, [a, s]), g = Math.max(1, Math.ceil(y.length / h)), p = Math.min(u, g - 1), b = y.slice(p * h, p * h + h), w = (C) => {
    f && (l(
      (S) => (S == null ? void 0 : S.member) === C ? { member: C, dir: S.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), m(0));
  }, k = r.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: _("cv:w-full", r.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(Go, { children: [
      /* @__PURE__ */ i(Yo, { className: _(r.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(fn, { children: [
        r.showRowNumbers && /* @__PURE__ */ i(hr, { className: "cv:w-10 cv:text-right", children: "#" }),
        c.map((C) => /* @__PURE__ */ i(
          hr,
          {
            className: Oa(C.align),
            style: C.width ? { width: C.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              Y,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => w(C.member),
                children: [
                  C.label,
                  /* @__PURE__ */ i(gl, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : C.label
          },
          C.member
        ))
      ] }) }),
      /* @__PURE__ */ v(Qo, { children: [
        b.map((C, S) => /* @__PURE__ */ v(fn, { children: [
          r.showRowNumbers && /* @__PURE__ */ i(hn, { className: _("cv:text-right cv:text-muted-foreground", k && "cv:py-1"), children: p * h + S + 1 }),
          c.map((N) => {
            const L = yl(N.member, C[N.member], r.conditionalFormat);
            return /* @__PURE__ */ i(
              hn,
              {
                className: _(Oa(N.align), k && "cv:py-1"),
                style: L ? { color: L } : void 0,
                children: N.render(C[N.member])
              },
              N.member
            );
          })
        ] }, S)),
        b.length === 0 && /* @__PURE__ */ i(fn, { children: /* @__PURE__ */ i(
          hn,
          {
            colSpan: c.length + (r.showRowNumbers ? 1 : 0),
            className: "cv:h-24 cv:text-center cv:text-muted-foreground",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    y.length > h && /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2 cv:px-2 cv:py-2 cv:text-sm cv:text-muted-foreground", children: [
      /* @__PURE__ */ v("span", { children: [
        p * h + 1,
        "–",
        Math.min((p + 1) * h, y.length),
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
            disabled: p === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          Y,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((C) => Math.min(g - 1, C + 1)),
            disabled: p >= g - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function vl(e, t, n, r) {
  var c;
  const a = e.length > 0 ? Object.keys(e[0]) : hl(t);
  return ((c = n.columns) != null && c.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const l = s.member, u = t ? pl(t, l) : void 0, m = t ? l in t.measures : !1, f = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = s.align ?? (m ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: s.width,
      render: (y) => fl(y, m, l, r)
    };
  });
}
function fl(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function hl(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function pl(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Oa(e) {
  return e === "right" ? "cv:text-right" : e === "center" ? "cv:text-center" : "cv:text-left";
}
function gl({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(Ln, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Dn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(oc, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function bl(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function yl(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && xl(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function xl(e, t, n) {
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
function wl({ data: e, options: t, format: n, editing: r }) {
  var p, b, w, k, C, S, N, L, T, P, q, R, O, z, A, D, Q, Z, ee, E, H, W, B, re, me, U;
  const a = t.familyOptions ?? {}, o = a.series ?? [], c = Cl(e, o), s = ($) => n.category($), l = o.some(($) => $.axis === "right"), u = (p = o.find(($) => $.axis !== "right")) == null ? void 0 : p.member, m = (b = o.find(($) => $.axis === "right")) == null ? void 0 : b.member, f = $n(e, t), h = (k = (w = t.axes) == null ? void 0 : w.y) != null && k.labelHide ? void 0 : ((S = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : S.label) ?? (u ? pn(e, u) : void 0), y = (L = (N = t.axes) == null ? void 0 : N.y2) != null && L.labelHide ? void 0 : ((P = (T = t.axes) == null ? void 0 : T.y2) == null ? void 0 : P.label) ?? (m ? pn(e, m) : void 0), g = {};
  return o.forEach(($, V) => {
    const J = $.colorToken ?? ke[V % ke.length];
    g[$.member] = {
      label: $.label ?? pn(e, $.member),
      color: `var(--${J})`
    };
  }), /* @__PURE__ */ i(st, { config: g, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(ec, { accessibilityLayer: !0, data: c, children: [
    /* @__PURE__ */ i(Zt, { vertical: !1 }),
    /* @__PURE__ */ i(
      Nt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (R = (q = t.axes) == null ? void 0 : q.x) == null ? void 0 : R.hide,
        tickFormatter: s,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ge,
      {
        yAxisId: "left",
        type: "number",
        hide: (z = (O = t.axes) == null ? void 0 : O.y) == null ? void 0 : z.hide,
        scale: qe((A = t.axes) == null ? void 0 : A.y),
        domain: Ve((D = t.axes) == null ? void 0 : D.y),
        tickFormatter: ($) => n.value($, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      Ge,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (Z = (Q = t.axes) == null ? void 0 : Q.y2) == null ? void 0 : Z.hide,
        scale: qe((ee = t.axes) == null ? void 0 : ee.y2),
        domain: Ve((E = t.axes) == null ? void 0 : E.y2),
        tickFormatter: ($) => n.value($, m, "axis"),
        label: y ? { value: y, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((H = t.tooltip) == null ? void 0 : H.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          bt,
          {
            labelFormatter: ($) => n.category($),
            indicator: ((W = t.tooltip) == null ? void 0 : W.indicator) ?? "dot",
            valueFormatter: rn(n)
          }
        )
      }
    ),
    Re(t).show && /* @__PURE__ */ i(
      Tt,
      {
        content: /* @__PURE__ */ i(yt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: zt((B = t.legend) == null ? void 0 : B.position),
        layout: Ft((re = t.legend) == null ? void 0 : re.position),
        align: Et((me = t.legend) == null ? void 0 : me.position)
      }
    ),
    o.map(($) => kl($, e, a)),
    (U = a.referenceLines) == null ? void 0 : U.map(($, V) => {
      const J = $.side ?? (l && !u ? "right" : "left");
      let ae;
      if ($.axis === "x") {
        const fe = e.categories[$.value];
        if (fe === void 0) return null;
        ae = { x: typeof fe == "number" ? fe : String(fe) };
      } else
        ae = { y: $.value };
      return /* @__PURE__ */ i(
        ot,
        {
          yAxisId: J,
          ...ae,
          label: $.label,
          stroke: `var(--${$.colorToken ?? "muted-foreground"})`,
          strokeDasharray: "4 4"
        },
        V
      );
    })
  ] }) });
}
function kl(e, t, n) {
  const r = e.axis === "right" ? "right" : "left", a = `var(${Fr(e.member)})`, o = e.label ?? pn(t, e.member), c = e.curve ?? n.curve ?? "monotone", s = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    so,
    {
      yAxisId: r,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      fill: a,
      radius: [n.barRadius ?? 3, n.barRadius ?? 3, 0, 0]
    },
    e.member
  ) : e.render === "area" ? /* @__PURE__ */ i(
    Rr,
    {
      yAxisId: r,
      type: c,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      stroke: a,
      strokeWidth: n.strokeWidth ?? 2,
      fill: a,
      fillOpacity: n.fillOpacity ?? 0.25,
      dot: s,
      connectNulls: l
    },
    e.member
  ) : /* @__PURE__ */ i(
    uo,
    {
      yAxisId: r,
      type: c,
      dataKey: e.member,
      name: o,
      stroke: a,
      strokeWidth: n.strokeWidth ?? 2,
      dot: s,
      connectNulls: l
    },
    e.member
  );
}
function Cl(e, t) {
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
  const a = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((s = (c = e.raw.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : s.dimension);
  return e.raw.rows.map((l) => {
    const u = a ? l[a] : void 0, m = {
      __cat: u == null ? "" : String(u)
    };
    for (const f of t) m[f.member] = Nl(l[f.member]);
    return m;
  });
}
function pn(e, t) {
  var n, r, a, o;
  return ((r = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : r.shortTitle) ?? ((o = (a = e.raw.annotation) == null ? void 0 : a.measures[t]) == null ? void 0 : o.title) ?? t;
}
function Nl(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const vt = "cv:w-40", Sl = "cv:w-56", Xo = "a date or category", Jn = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: Xo, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0
  }
], _l = [
  { id: "x", label: "Category", hint: Xo, cardinality: "one", kinds: ["time", "category"] },
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
], Rl = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], Al = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], Ml = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], Ol = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], Ll = ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo"], Ze = (e) => Ll.indexOf(e), Qe = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: yo,
    order: Ze("bar"),
    component: Ws,
    optionsSchema: Je.bar,
    defaults: Xe.bar,
    wells: Jn,
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
    sidebarWidthClass: vt
  },
  line: {
    family: "line",
    canonicalTimeWell: "x",
    label: "Line",
    icon: dc,
    order: Ze("line"),
    component: Bs,
    optionsSchema: Je.line,
    defaults: Xe.line,
    wells: Jn,
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
    sidebarWidthClass: vt
  },
  area: {
    family: "area",
    canonicalTimeWell: "x",
    label: "Area",
    icon: ic,
    order: Ze("area"),
    component: Us,
    optionsSchema: Je.area,
    defaults: Xe.area,
    wells: Jn,
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
    sidebarWidthClass: vt
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: mc,
    order: Ze("pie"),
    component: Gs,
    optionsSchema: Je.pie,
    defaults: Xe.pie,
    wells: Rl,
    zones: { left: ["size"], bottom: ["slices"] },
    dualAxisY: !1,
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: vt
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: uc,
    order: Ze("scatter"),
    component: Qs,
    optionsSchema: Je.scatter,
    defaults: Xe.scatter,
    wells: Al,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: vt
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: lc,
    order: Ze("kpi"),
    component: el,
    optionsSchema: Je.kpi,
    defaults: Xe.kpi,
    wells: Ml,
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
    sidebarWidthClass: Sl
  },
  table: {
    family: "table",
    label: "Table",
    icon: sc,
    order: Ze("table"),
    component: dl,
    optionsSchema: Je.table,
    defaults: Xe.table,
    wells: Ol,
    zones: { left: ["columns"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: vt
  },
  combo: {
    family: "combo",
    canonicalTimeWell: "x",
    label: "Combo",
    icon: cc,
    order: Ze("combo"),
    component: wl,
    optionsSchema: Je.combo,
    defaults: Xe.combo,
    wells: _l,
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
    sidebarWidthClass: vt
  }
}, Dl = Qe.bar, Tl = Qe.line, zl = Qe.area, Fl = Qe.pie, El = Qe.scatter, $l = Qe.kpi, Pl = Qe.table, Il = Qe.combo, qr = [
  Dl,
  Tl,
  zl,
  Fl,
  El,
  $l,
  Pl,
  Il
], jl = d.any();
function Kr(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const c of e) n.set(c.family, c);
  for (const c of t ?? []) n.set(c.family, c);
  Object.freeze(n);
  const r = [...n.values()].sort(
    (c, s) => c.order - s.order || c.family.localeCompare(s.family)
  ), a = r.map((c) => c.family), o = {
    get: (c) => n.get(c),
    require: (c) => {
      const s = n.get(c);
      if (!s)
        throw new Error(
          `Unknown chart family "${c}". Provide it via <CubeVizProvider families={[...]}> (or buildFamilyRegistry) before rendering/editing a spec that uses it.`
        );
      return s;
    },
    list: () => r,
    families: () => a,
    defaults: (c) => {
      var s;
      return ((s = n.get(c)) == null ? void 0 : s.defaults) ?? Is;
    },
    optionsSchema: (c) => {
      var s;
      return ((s = n.get(c)) == null ? void 0 : s.optionsSchema) ?? jl;
    },
    resolveOptions: (c) => js(c, o.defaults(c.family))
  };
  return o;
}
const Pn = Kr(qr);
function Vl(e, t = Pn) {
  return t.resolveOptions(e);
}
const wp = Object.fromEntries(
  Object.entries(Qe).map(([e, t]) => [e, t.component])
);
function ql({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: o,
  editing: c,
  updateFamilyOptions: s,
  registry: l = Pn
}) {
  var g;
  const u = ie(() => Vl(t, l), [t, l]), m = ((g = l.get(u.family)) == null ? void 0 : g.queryless) ?? !1;
  if (!m && (a != null && a.loading))
    return /* @__PURE__ */ i(vs, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (!m && (a != null && a.error))
    return /* @__PURE__ */ v(zn, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Mr, {}),
      /* @__PURE__ */ i(Fn, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(En, { children: a.error.message })
    ] });
  if (!m && e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const f = n && Object.keys(n).length > 0 ? n : Hs(e), h = r ?? qo(e.raw.annotation, u, Er), y = (o == null ? void 0 : o[u.family]) ?? l.require(u.family).component;
  return /* @__PURE__ */ i(
    y,
    {
      data: e,
      options: u,
      config: f,
      format: h,
      state: a,
      editing: c,
      updateFamilyOptions: s
    }
  );
}
const ke = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Xn = 8;
function La(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function pr(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : ke, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const m = a(u.key, u.colorToken);
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
  return e.map((u) => a(u.key, u.colorToken) ?? s());
}
function Da(e, t) {
  const n = pr(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Kl(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function vn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Kl(e[n]);
  return t;
}
function Hl(e) {
  return {
    measures: vn(e.measures ?? {}),
    dimensions: vn(e.dimensions ?? {}),
    segments: vn(e.segments ?? {}),
    timeDimensions: vn(e.timeDimensions ?? {})
  };
}
function Ct(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function In(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let c = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!c || c.kind === void 0 || c.kind === "auto") && (c = { ...c, kind: "currency" }), c && (a.format = c), t != null && t.axis && (a.axis = t.axis), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Wl(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Bl(e, t) {
  var r, a;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, c] of Object.entries(e.measures)) {
    const s = (r = c.meta) == null ? void 0 : r.unit;
    if (!s || ((a = c.meta) == null ? void 0 : a.convert) === !1) continue;
    const l = t.conversions[s];
    l && (n.set(o, { to: l.toImperial, unit: l.imperialUnit }), e.measures[o] = { ...c, meta: { ...c.meta, unit: l.imperialUnit } });
  }
  return n;
}
function Ul(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, o] of t) {
      const c = jn(r[a]);
      c !== null && (r[a] = o.to(c));
    }
    return r;
  });
}
function Gl(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((o) => o === null ? null : a.to(o)));
    }
}
function Yl(e, t, n, r, a = Pn) {
  const o = Hl(e.annotation()), c = Bl(o, r), s = Ul(e.tablePivot(), c), l = t.mapping;
  if (!l) {
    const f = n.measures ?? [];
    if (a.require(t.family).measureOnly && f.length > 0) {
      const h = s[0] ?? {}, y = [
        {
          key: "value",
          label: "Value",
          data: f.map((p) => jn(h[p])),
          meta: { ...In(Ct(o, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return Da(y, t.colors), {
        categories: f.map(
          (p) => {
            var b, w;
            return ((b = Ct(o, p)) == null ? void 0 : b.shortTitle) ?? ((w = Ct(o, p)) == null ? void 0 : w.title) ?? p;
          }
        ),
        series: y,
        raw: { rows: s, annotation: o, query: n },
        empty: s.length === 0 || La(y)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: o, query: n },
      empty: s.length === 0
    };
  }
  const u = l.series.mode === "measures" ? Jl(e, l.series, t, o) : Xl(e, l.category.member, l.series, t, o), m = Ql(e, l);
  return Gl(u, c), Da(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: s, annotation: o, query: n },
    empty: s.length === 0 || La(u)
  };
}
function Ql(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Jl(e, t, n, r) {
  const { members: a, meta: o } = t, c = e.chartPivot();
  return a.map((s) => {
    const l = Ct(r, s), u = o == null ? void 0 : o[s], m = c.map((f) => jn(f[s]));
    return {
      key: s,
      label: Wl(l, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...In(l, u, n.format), measure: s }
    };
  });
}
function Xl(e, t, n, r, a) {
  const { value: o, values: c, pivot: s } = n, l = c && c.length > 0 ? c : [o], u = new Set(l), m = l.length > 1, f = { x: [t], y: [s, "measures"] }, y = e.seriesNames(f).filter((w) => {
    const k = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return k === void 0 || u.has(k);
  }), g = e.chartPivot(f), p = Ct(a, o), b = y.map((w) => {
    var R, O;
    const k = (R = w.yValues) == null ? void 0 : R[0], C = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : o, S = Ct(a, C), N = (S == null ? void 0 : S.shortTitle) ?? (S == null ? void 0 : S.title) ?? C, L = k ?? w.shortTitle ?? w.title ?? w.key, T = m ? `${N} · ${L}` : L, P = g.map((z) => jn(z[w.key])), q = (O = n.meta) == null ? void 0 : O[C];
    return {
      key: w.key,
      label: T,
      data: P,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...In(S ?? p, q, r.format),
        measure: C
      }
    };
  });
  return Zl(b, p, r.format);
}
function Zl(e, t, n) {
  var m, f, h;
  if (e.length <= Xn) return e;
  const r = (y) => y.data.reduce((g, p) => g + (p ?? 0), 0), a = [...e].sort((y, g) => r(g) - r(y)), o = a.slice(0, Xn - 1), c = a.slice(Xn - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, l = Array.from({ length: s }, (y, g) => {
    let p = 0, b = !1;
    for (const w of c) {
      const k = w.data[g];
      k !== null && (p += k, b = !0);
    }
    return b ? p : null;
  }), u = {
    key: "__other",
    label: `Other (${c.length})`,
    data: l,
    meta: { ...In(t, void 0, n), ...(h = (f = o[0]) == null ? void 0 : f.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function jn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Rt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const eu = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function tu(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Qt(e, t, n) {
  var r;
  if (Te(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function nu(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const c = Qt(o, t, n);
    if (!Rt(c))
      if (Array.isArray(c))
        for (const s of c)
          Rt(s) || a.push(s);
      else
        a.push(c);
  }
  return a.length === 0 ? r ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: a };
}
function ru(e, t, n) {
  if ("and" in e) {
    const r = gr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = gr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return nu(e, t, n);
}
function gr(e, t, n) {
  const r = [];
  for (const a of e) {
    const o = ru(a, t, n);
    o !== void 0 && r.push(o);
  }
  return r;
}
function au(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Qt(e.granularity, t, n);
    Rt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Qt(e.dateRange, t, n);
    Rt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Zo(e, t, n) {
  const r = eu(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((o) => au(o, r, t))), e.filters !== void 0) {
    const o = gr(e.filters, r, t);
    o.length > 0 && (a.filters = o);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Qt(e.limit, r, t);
    Rt(o) || (a.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Qt(e.offset, r, t);
    Rt(o) || (a.offset = o);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function ou() {
  let e, t;
  return (n, r, a) => {
    const o = Zo(n, r, a), c = JSON.stringify(o);
    return e !== void 0 && c === t ? e : (e = o, t = c, o);
  };
}
function iu(e, t) {
  let n = {};
  for (const o of e)
    o.default !== void 0 && (n[o.name] = o.default);
  if (t)
    for (const o of Object.keys(t)) {
      const c = t[o];
      c !== void 0 && (n[o] = c);
    }
  const r = /* @__PURE__ */ new Set(), a = () => {
    for (const o of r) o();
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
      a();
    },
    subscribe(o) {
      return r.add(o), () => {
        r.delete(o);
      };
    }
  };
}
class cu extends Error {
}
const su = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new cu(`"${e}" cannot be parsed into a number`);
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
function Ta(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class lu extends Error {
}
class za extends Error {
}
class uu extends Error {
}
class Zn extends Error {
}
class mu extends Error {
}
class du {
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
      throw new za(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Ta(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
    const a = this.destination, o = this.origin;
    if (o.abbr === a.abbr)
      return this.val;
    if (a.measure != o.measure)
      throw new uu(`Cannot convert incompatible measures of ${a.measure} and ${o.measure}`);
    let c = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (c = this.cls.sub(c, this.convertFraction(o.unit.anchor_shift))), o.system != a.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Zn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${a.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Zn(`Unable to find anchor for "${o.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        c = m(c, this.cls);
      else if (typeof f == "number")
        c = this.cls.mul(c, f);
      else if (Ta(f))
        c = this.cls.mul(c, this.convertFraction(f));
      else
        throw new Zn("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return a.unit.anchor_shift && (c = this.cls.add(c, this.convertFraction(a.unit.anchor_shift))), this.cls.div(c, this.convertFraction(a.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, r, a;
    if (this.origin == null)
      throw new za(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let c = [], s = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (c = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, l = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
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
      for (const [r, a] of Object.entries(this.measureData))
        for (const [o, c] of Object.entries(a.systems))
          for (const [s, l] of Object.entries(c))
            n.push(this.describeUnit({
              abbr: s,
              measure: r,
              system: o,
              unit: l
            }));
    else {
      if (!this.isMeasure(t))
        throw new mu(`Meausure "${t}" not found.`);
      const r = this.measureData[t];
      for (const [a, o] of Object.entries(r.systems))
        for (const [c, s] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: c,
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
    throw new lu(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
  }
  /**
   * Returns the abbreviated measures that the value can be
   * converted to.
   */
  possibilities(t) {
    let n = [], r = [];
    typeof t == "string" && this.isMeasure(t) ? r.push(t) : this.origin != null ? r.push(this.origin.measure) : r = Object.keys(this.measureData);
    for (const a of r) {
      const o = this.measureData[a].systems;
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
function vu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, r] of Object.entries(e))
    for (const [a, o] of Object.entries(r.systems))
      for (const [c, s] of Object.entries(o))
        t.set(c, {
          measure: n,
          system: a,
          abbr: c,
          unit: s
        });
  return t;
}
function fu(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = vu(e);
  return (r) => new du({
    measures: e,
    unitCache: n,
    cls: su
  }, r);
}
const hu = {
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
}, pu = {
  systems: {
    metric: hu
  }
}, gu = {
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
}, bu = {
  systems: {
    SI: gu
  }
}, yu = {
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
}, xu = {
  systems: {
    SI: yu
  }
}, wu = {
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
}, ku = {
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
}, Cu = {
  systems: {
    metric: wu,
    imperial: ku
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
}, Nu = {
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
}, Su = {
  systems: {
    SI: Nu
  }
}, _u = {
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
}, Ru = {
  systems: {
    SI: _u
  }
}, Au = {
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
}, Mu = {
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
}, Ou = {
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
}, Lu = {
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
}, Du = {
  systems: {
    bit: Au,
    byte: Mu,
    IECBit: Ou,
    IECByte: Lu
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
}, Tu = {
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
}, zu = {
  systems: {
    metric: Tu
  }
}, Fu = {
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
}, Eu = {
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
}, $u = {
  systems: {
    SI: Fu,
    nutrition: Eu
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
}, Pu = {
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
}, Iu = {
  systems: {
    SI: Pu
  }
}, ju = {
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
}, Vu = {
  systems: {
    SI: ju
  }
}, qu = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Ku = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Hu = {
  systems: {
    metric: qu,
    imperial: Ku
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
}, Wu = {
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
}, Bu = {
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
}, Uu = {
  systems: {
    metric: Wu,
    imperial: Bu
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
}, Gu = {
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
}, Yu = {
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
}, Ju = {
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
}, Xu = {
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
}, Zu = {
  systems: {
    metric: Ju,
    imperial: Xu
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
}, em = {
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
}, tm = {
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
}, nm = {
  systems: {
    metric: em,
    imperial: tm
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
}, rm = {
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
}, am = {
  systems: {
    SI: rm
  }
}, om = {
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
}, im = {
  systems: {
    unit: om
  }
}, cm = {
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
}, sm = {
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
}, lm = {
  systems: {
    metric: cm,
    imperial: sm
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
}, um = {
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
}, mm = {
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
}, dm = {
  systems: {
    metric: um,
    imperial: mm
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
}, vm = {
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
}, fm = {
  systems: {
    SI: vm
  }
}, hm = {
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
}, pm = {
  systems: {
    SI: hm
  }
}, gm = {
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
}, bm = {
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
}, ym = {
  systems: {
    metric: gm,
    imperial: bm
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
}, xm = {
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
}, wm = {
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
}, km = {
  systems: {
    metric: xm,
    imperial: wm
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
}, Cm = {
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
}, Nm = {
  systems: {
    SI: Cm
  }
}, Sm = {
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
}, _m = {
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
}, Rm = {
  systems: {
    metric: Sm,
    imperial: _m
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
}, Am = {
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
}, Mm = {
  systems: {
    SI: Am
  }
}, Om = {
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
}, Lm = {
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
}, Dm = {
  systems: {
    metric: Om,
    imperial: Lm
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
}, Tm = {
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
}, zm = {
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
}, Fm = {
  systems: {
    metric: Tm,
    imperial: zm
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
}, Em = {
  acceleration: pu,
  angle: bu,
  apparentPower: xu,
  area: Cu,
  charge: Su,
  current: Ru,
  digital: Du,
  each: zu,
  energy: $u,
  force: Iu,
  frequency: Vu,
  illuminance: Hu,
  length: Uu,
  mass: Qu,
  massFlowRate: Zu,
  pace: nm,
  partsPer: am,
  pieces: im,
  power: lm,
  pressure: dm,
  reactiveEnergy: fm,
  reactivePower: pm,
  speed: ym,
  torque: Rm,
  temperature: km,
  time: Nm,
  voltage: Mm,
  volume: Dm,
  volumeFlowRate: Fm
}, $m = fu(Em), Pm = {
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
function Im(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => $m(t).from(e.from).to(e.to)
  };
}
const br = {
  ...Object.fromEntries(
    Object.entries(Pm).map(([e, t]) => [e, Im(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Vn(e) {
  return e ? { ...br, ...e } : br;
}
function jm(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Vm(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function qm(e) {
  return e != null && e.quantity ? Vm(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Km = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function ei(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Fa(e, t) {
  const n = e * (Km[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], c = o.map(([l, u], m) => {
    const f = m < o.length - 1 ? Math.floor(a / l) : Math.round(a / l);
    return a -= f * l, [f, u];
  }), s = c.findIndex((l) => l[0] > 0);
  if (s === -1) {
    const l = Math.abs(n);
    return l === 0 ? "0s" : l < 1e3 ? `${r}${ei(l.toFixed(l < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + c.slice(s, s + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function er(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [o, c] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= o) return ei((e / o).toFixed(n.decimals ?? 1)) + c;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Hm(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Ea(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function ti(e = br) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Er(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return Fa(n, r == null ? void 0 : r.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency") {
        const m = typeof o.currency == "string" && /^[A-Za-z]{3}$/.test(o.currency) ? o.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: m, maximumFractionDigits: o.decimals ?? 0 }).format(n);
      }
      if (o.kind === "number") return Ea(er(n, t), o.prefix, o.suffix);
    }
    if (a === "time") return Fa(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Ea(er(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const c = r == null ? void 0 : r.unit, s = c ? Hm(a, c) : {}, l = (o == null ? void 0 : o.prefix) ?? s.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : s.suffix ?? "";
    return `${l}${er(n, t)}${u}`;
  };
}
const qn = ho(null);
qn.displayName = "CubeVizContext";
function He() {
  const e = Ar(qn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function lt() {
  return He().families;
}
function Wm(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function kp({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: o,
  children: c
}) {
  const s = (o ?? []).map((p) => p.family).join("|"), l = ie(
    () => Kr(qr, o),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [s]
  ), u = ie(
    () => Wm(e) ? us(e) : e,
    [e]
  ), m = ie(
    () => {
      var p;
      return {
        chartRamp: (p = t == null ? void 0 : t.chartRamp) != null && p.length ? t.chartRamp : ke,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), f = ie(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = ie(() => a ?? {}, [a]), y = ie(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), g = ie(
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
  return /* @__PURE__ */ i(qn.Provider, { value: g, children: /* @__PURE__ */ i(
    "div",
    {
      className: _(
        "cv:contents",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: c
    }
  ) });
}
function Hr({
  families: e,
  children: t
}) {
  const n = He(), r = (e ?? []).map((o) => o.family).join("|"), a = ie(() => !e || e.length === 0 ? n : { ...n, families: Kr(qr, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ i(le, { children: t }) : /* @__PURE__ */ i(qn.Provider, { value: a, children: t });
}
function Bm(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Um = 5e3;
function Gm(e, t) {
  const { cubeClient: n } = He(), r = (t == null ? void 0 : t.skip) ?? !1, a = ie(
    () => e.limit === void 0 ? { ...e, limit: Um } : e,
    [e]
  ), o = ie(() => JSON.stringify(a), [a]), [c, s] = St({ isLoading: !r }), [l, u] = St(0), m = rt(() => u((f) => f + 1), []);
  return en(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let f = !0;
    const h = new AbortController();
    return s((y) => ({ resultSet: y.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0, signal: h.signal }).then((y) => {
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
  }, [n, o, r, l]), { ...c, refetch: m };
}
const Kn = ho(null);
Kn.displayName = "DashboardContext";
function Wr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = ft(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: iu(r, t), key: r });
  const o = a.current.store, c = Ym(o, r);
  return tc(Kn.Provider, { value: c }, n);
}
function Ym(e, t) {
  const n = rt(
    (o, c) => e.set(o, c),
    [e]
  ), r = rt(
    (o) => Zo(o, e.getAll(), t),
    [e, t]
  ), a = rt(
    (o) => tu(o, e.getAll(), t),
    [e, t]
  );
  return ie(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Qm(e) {
  const t = po(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function ni() {
  const e = Ar(Kn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Qm(e);
}
function Br() {
  return Ar(Kn);
}
const Jm = () => () => {
};
function tr(e, t, n) {
  var C;
  const r = Br(), { locale: a } = He(), o = lt(), c = ft(null);
  c.current === null && (c.current = ou());
  const s = c.current, l = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !l, m = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), f = po(
    u && r ? r.store.subscribe : Jm,
    m,
    m
  ), { resultSet: h, isLoading: y, error: g, refetch: p } = Gm(f, { skip: n == null ? void 0 : n.skip }), b = ((C = t.format) == null ? void 0 : C.unitSystem) ?? (a == null ? void 0 : a.unitSystem), w = ie(() => Vn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ie(() => {
    if (h)
      return Yl(h, t, f, { unitSystem: b, conversions: w }, o);
  }, [h, t, f, b, w, o]), isLoading: y, error: g, refetch: p, resolvedQuery: f };
}
function ut() {
  const { cubeClient: e } = He(), [t, n] = St({ isLoading: !0 });
  return en(() => {
    let r = !0;
    return n({ isLoading: !0 }), ms(e).then((a) => {
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
function Cp() {
  const { locale: e } = He(), { formatValue: t, units: n } = e;
  return ie(
    () => t ?? ti(Vn(n)),
    [t, n]
  );
}
function ri() {
  const [e, t] = St(0), n = ft(null), r = ft(null), a = ft(null), o = ft(0), c = rt((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), s = rt(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), l = rt(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== o.current && (o.current = m, t(m));
      const f = new ResizeObserver((h) => {
        var y, g;
        for (const p of h) {
          const b = ((g = (y = p.contentBoxSize) == null ? void 0 : y[0]) == null ? void 0 : g.inlineSize) ?? p.contentRect.width;
          c(b);
        }
      });
      f.observe(u), r.current = f;
    },
    [c, s]
  );
  return en(() => s, [s]), [l, e];
}
const Xm = "day";
function Zm(e, t) {
  var m;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const a = r.member ?? (n == null ? void 0 : n.measure), o = (m = e.timeDimensions) == null ? void 0 : m[0], c = r.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!a || !c) return null;
  const s = r.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [a],
    timeDimensions: [
      {
        dimension: c,
        granularity: r.granularity ?? Xm,
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
      series: { mode: "measures", members: [a] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const ne = (e) => be(e, "yyyy-MM-dd");
function ed(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = wn(e[0]), o = wn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(o.getTime())) return;
    const c = $c(o, a) + 1;
    return [ne(De(a, c)), ne(De(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = De(t, 1);
    return [ne(a), ne(a)];
  }
  if (n === "yesterday") {
    const a = De(t, 2);
    return [ne(a), ne(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), o = r[2];
    if (o.startsWith("day")) return [ne(De(t, 2 * a - 1)), ne(De(t, a))];
    if (o.startsWith("week")) return [ne(De(t, 14 * a - 1)), ne(De(t, 7 * a))];
    if (o.startsWith("month"))
      return [ne(cn(sn(t, 2 * a))), ne(De(cn(sn(t, a)), 1))];
    if (o.startsWith("quarter"))
      return [ne(ln(un(t, 2 * a))), ne(De(ln(un(t, a)), 1))];
    if (o.startsWith("year"))
      return [ne(mn(dn(t, 2 * a))), ne(De(mn(dn(t, a)), 1))];
  }
  if (n === "this week") {
    const a = ba(t, 1);
    return [ne(ya(a)), ne(xa(a))];
  }
  if (n === "this month") {
    const a = sn(t, 1);
    return [ne(cn(a)), ne(wa(a))];
  }
  if (n === "this quarter") {
    const a = un(t, 1);
    return [ne(ln(a)), ne(ka(a))];
  }
  if (n === "this year") {
    const a = dn(t, 1);
    return [ne(mn(a)), ne(Ca(a))];
  }
  if (n === "last week") {
    const a = ba(t, 2);
    return [ne(ya(a)), ne(xa(a))];
  }
  if (n === "last month") {
    const a = sn(t, 2);
    return [ne(cn(a)), ne(wa(a))];
  }
  if (n === "last quarter") {
    const a = un(t, 2);
    return [ne(ln(a)), ne(ka(a))];
  }
  if (n === "last year") {
    const a = dn(t, 2);
    return [ne(mn(a)), ne(Ca(a))];
  }
}
function td(e, t, n = Pn) {
  var u, m;
  const r = t.familyOptions ?? {}, a = n.require(t.family).comparePreviousMode;
  if (a === "series") {
    if (!r.comparePrevious) return null;
  } else if (a === "kpiRow") {
    if (((u = r.comparison) == null ? void 0 : u.mode) !== "previousPeriod") return null;
  } else
    return null;
  const o = (m = e.timeDimensions) == null ? void 0 : m[0];
  if (!o) return null;
  const c = o.dateRange;
  if (c !== void 0 && typeof c == "object" && !Array.isArray(c)) return null;
  const s = ed(c);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...o, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const nd = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Ur({ query: e, chart: t, onState: n, editing: r, updateFamilyOptions: a }) {
  var q;
  const { registry: o, locale: c } = He(), s = lt(), l = ((q = s.get(t.family)) == null ? void 0 : q.queryless) ?? !1, u = ie(() => {
    var R;
    return (R = t.format) != null && R.unitSystem || !(c != null && c.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: c.unitSystem } };
  }, [t, c == null ? void 0 : c.unitSystem]), m = ie(() => {
    const R = e ?? {};
    return R.timezone || !(c != null && c.timezone) ? R : { ...R, timezone: c.timezone };
  }, [e, c == null ? void 0 : c.timezone]), { data: f, isLoading: h, error: y, refetch: g, resolvedQuery: p } = tr(
    m,
    u,
    { skip: l }
  ), b = ie(() => Zm(m, u), [m, u]), w = tr(
    (b == null ? void 0 : b.query) ?? m,
    (b == null ? void 0 : b.chart) ?? u,
    { skip: !b }
  ), k = ie(
    () => td(p, u, s),
    [p, u, s]
  ), C = tr(
    (k == null ? void 0 : k.query) ?? m,
    u,
    { skip: !k, skipResolve: !0 }
  ), S = ie(
    () => ({ [u.family]: Bm(o, u.family, s) }),
    [o, u.family, s]
  ), N = ie(() => {
    let R = f ?? nd;
    if (b && w.data) {
      R = { ...R, series: w.data.series, categories: w.data.categories };
      const O = R.raw.rows.length > 0, z = R.series.some((A) => A.data.some((D) => D !== null));
      R = { ...R, empty: !O && !z };
    }
    if (k && C.data) {
      if (k.mode === "kpiRow") {
        const O = C.data.raw.rows[0];
        if (O) {
          const z = R.raw.rows[0];
          R = {
            ...R,
            raw: { ...R.raw, rows: z ? [z, O] : [O] }
          };
        }
      } else if (!C.data.empty) {
        const O = new Map(C.data.series.map((z) => [z.key, z]));
        if (!R.empty && R.series.length > 0) {
          const z = R.categories.length, A = R.series.map((D) => {
            const Q = O.get(D.key), Z = Array.from({ length: z }, (ee, E) => (Q == null ? void 0 : Q.data[E]) ?? null);
            return {
              ...D,
              key: `${D.key}__prev`,
              label: `${D.label} (prev)`,
              colorToken: D.colorToken,
              data: Z,
              meta: { ...D.meta, companion: !0 }
            };
          });
          R = { ...R, series: [...R.series, ...A] };
        } else {
          const z = C.data.series.map((A) => ({
            ...A,
            key: `${A.key}__prev`,
            label: `${A.label} (prev)`,
            data: [...A.data],
            meta: { ...A.meta, companion: !0 }
          }));
          R = {
            ...R,
            categories: C.data.categories,
            series: z,
            empty: !1
          };
        }
      }
    }
    return R;
  }, [f, b, w.data, k, C.data]);
  en(() => {
    n == null || n({ rows: N.raw.rows, refetch: g, isLoading: h });
  }, [n, N.raw.rows, g, h]);
  const L = {}, T = ie(
    () => c.formatValue ?? ti(Vn(c.units)),
    [c.formatValue, c.units]
  ), P = ie(
    () => qo(N.raw.annotation, u, T, {
      locale: c.locale,
      unitSystem: c.unitSystem
    }),
    [N.raw.annotation, u, T, c.locale, c.unitSystem]
  );
  return /* @__PURE__ */ i(
    ql,
    {
      data: N,
      options: u,
      config: L,
      format: P,
      state: l ? { loading: !1 } : { loading: h && !f, error: y },
      components: S,
      registry: s,
      editing: r,
      updateFamilyOptions: a
    }
  );
}
function rd({ spec: e }) {
  return /* @__PURE__ */ i(Ur, { query: e.query, chart: e.chart });
}
const ai = "cube-viz-prose";
function ad(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function od({ doc: e }) {
  const t = ad(e), n = ie(
    () => t ? e : null,
    [t, e]
  ), r = Oo(
    {
      extensions: [Do],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: _(ai) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(Lo, { editor: r }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
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
], id = Object.fromEntries(
  gn.map((e) => [e.value, e.label])
);
function $a(e) {
  return id[e.trim().toLowerCase()] ?? e;
}
const cd = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function sd({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Ic(), a = _(Jo({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
  return /* @__PURE__ */ v("div", { className: "cv:mb-2 cv:flex cv:items-center cv:justify-between cv:gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: _(a, !r && "cv:opacity-40"),
        children: /* @__PURE__ */ i(Or, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:text-foreground", children: be(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: _(a, !n && "cv:opacity-40"),
        children: /* @__PURE__ */ i(tn, { className: "cv:size-4" })
      }
    )
  ] });
}
function ld({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const o = !!t.selected && !t.outside && !t.disabled, c = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...a,
      style: { ...r, color: o ? "var(--primary-foreground)" : c ? "var(--muted-foreground)" : "var(--foreground)" },
      className: _(
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
function oi({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ i(
    Pc,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: _("cv:p-3", e),
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
        MonthCaption: sd,
        DayButton: ld,
        Chevron: ({ orientation: a, className: o, ...c }) => /* @__PURE__ */ i(a === "left" ? Or : tn, { className: _("cv:size-4", o), ...c })
      },
      ...r
    }
  );
}
function Me({
  ...e
}) {
  return /* @__PURE__ */ i(xn.Root, { "data-slot": "popover", ...e });
}
function Oe({
  ...e
}) {
  return /* @__PURE__ */ i(xn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Le({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ i(xn.Portal, { children: /* @__PURE__ */ i(
    xn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: _(
        "cv:z-50 cv:w-72 cv:origin-[var(--radix-popover-content-transform-origin)] cv:rounded-md cv:border cv:border-border cv:bg-popover cv:p-4 cv:text-popover-foreground cv:shadow-md cv:outline-none cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...r
    }
  ) });
}
function ze({
  ...e
}) {
  return /* @__PURE__ */ i(Ce.Root, { "data-slot": "select", ...e });
}
function yr({
  ...e
}) {
  return /* @__PURE__ */ i(Ce.Group, { "data-slot": "select-group", ...e });
}
function Fe({
  ...e
}) {
  return /* @__PURE__ */ i(Ce.Value, { "data-slot": "select-value", ...e });
}
function Ee({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ce.Trigger,
    {
      "data-slot": "select-trigger",
      className: _(
        "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:whitespace-nowrap cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2 cv:text-sm cv:text-foreground cv:shadow-sm cv:ring-offset-background cv:placeholder:text-muted-foreground cv:focus:outline-none cv:focus:ring-1 cv:focus:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50 cv:[&>span]:line-clamp-1 cv:data-[placeholder]:text-muted-foreground cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(Ce.Icon, { asChild: !0, children: /* @__PURE__ */ i(ct, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function ud({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Ce.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: _("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(vc, { className: "cv:size-4" })
    }
  );
}
function md({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Ce.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: _("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(ct, { className: "cv:size-4" })
    }
  );
}
function $e({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ i(Ce.Portal, { children: /* @__PURE__ */ v(
    Ce.Content,
    {
      "data-slot": "select-content",
      className: _(
        "cv:relative cv:z-50 cv:max-h-[var(--radix-select-content-available-height)] cv:min-w-[8rem] cv:origin-[var(--radix-select-content-transform-origin)] cv:overflow-hidden cv:rounded-md cv:border cv:border-border cv:bg-popover cv:text-popover-foreground cv:shadow-md cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "cv:data-[side=bottom]:translate-y-1 cv:data-[side=left]:-translate-x-1 cv:data-[side=right]:translate-x-1 cv:data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ i(ud, {}),
        /* @__PURE__ */ i(
          Ce.Viewport,
          {
            className: _(
              "cv:p-1",
              n === "popper" && "cv:h-[var(--radix-select-trigger-height)] cv:w-full cv:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(md, {})
      ]
    }
  ) });
}
function xr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Ce.Label,
    {
      "data-slot": "select-label",
      className: _("cv:px-2 cv:py-1.5 cv:text-xs cv:font-medium cv:text-muted-foreground", e),
      ...t
    }
  );
}
function xe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    Ce.Item,
    {
      "data-slot": "select-item",
      className: _(
        "cv:relative cv:flex cv:w-full cv:cursor-default cv:select-none cv:items-center cv:rounded-sm cv:py-1.5 cv:pl-2 cv:pr-8 cv:text-sm cv:outline-none cv:focus:bg-accent cv:focus:text-accent-foreground cv:data-[disabled]:pointer-events-none cv:data-[disabled]:opacity-50",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(Ce.ItemIndicator, { children: /* @__PURE__ */ i(je, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(Ce.ItemText, { children: t })
      ]
    }
  );
}
const At = _(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), dd = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", Kt = "yyyy-MM-dd";
function vd(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Pa(e) {
  if (!e) return;
  const t = Ao(e, Kt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function fd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? cd, [o, c] = St(!1), s = typeof e == "string", [l, u] = vd(e), m = Pa(l), f = Pa(u), h = m ? { from: m, to: f } : void 0;
  let y;
  s ? y = $a(e) : m && f ? y = `${be(m, "MMM d, yyyy")} – ${be(f, "MMM d, yyyy")}` : m ? y = be(m, "MMM d, yyyy") : y = "Pick a date range";
  const g = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Me, { open: o, onOpenChange: c, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(
      Y,
      {
        variant: "outline",
        className: _(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          y === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(xo, { className: "cv:mr-2 cv:size-4" }),
          y
        ]
      }
    ) }),
    /* @__PURE__ */ v(Le, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: a.map((p) => /* @__PURE__ */ i(
        Y,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(p), c(!1);
          },
          children: $a(p)
        },
        p
      )) }),
      /* @__PURE__ */ i(
        oi,
        {
          mode: "range",
          selected: h,
          defaultMonth: m,
          disabled: g,
          onSelect: (p) => {
            p != null && p.from && p.to ? t([be(p.from, Kt), be(p.to, Kt)]) : p != null && p.from ? t([be(p.from, Kt), be(p.from, Kt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const hd = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function pd(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function gd(e) {
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
function bd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = ni(), o = r.rangeVariable ? gd(a(r.rangeVariable)) : void 0, c = r.options ?? (o !== void 0 ? pd(o) : hd), s = typeof e == "string" ? e : "", l = c.join(",");
  return en(() => {
    s && !c.includes(s) && t(c[0]);
  }, [s, l]), /* @__PURE__ */ v(
    ze,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Ee, { className: At, children: /* @__PURE__ */ i(Fe, { placeholder: "—" }) }),
        /* @__PURE__ */ i($e, { children: c.map((u) => /* @__PURE__ */ i(xe, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function yd({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((c) => String(c))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: _(At, "cv:h-auto cv:min-h-[6rem]"),
        value: [...o],
        onChange: (c) => {
          const s = Array.from(c.target.selectedOptions, (u) => u.value), l = r.options.every((u) => typeof u.value == "number");
          t(l ? s.map((u) => Number(u)) : s);
        },
        children: r.options.map((c) => /* @__PURE__ */ i("option", { value: String(c.value), children: c.label }, String(c.value)))
      }
    );
  }
  const a = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ v(
    ze,
    {
      value: a,
      onValueChange: (o) => {
        const c = r.options.find((s) => String(s.value) === o);
        t(c ? c.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(Ee, { className: At, children: /* @__PURE__ */ i(Fe, { placeholder: "—" }) }),
        /* @__PURE__ */ i($e, { children: r.options.map((o) => /* @__PURE__ */ i(xe, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function xd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: o } = ut(), c = ie(() => {
    if (!a) return [];
    const s = [];
    for (const l of a.cubes)
      if (!(r.cube && l.name !== r.cube)) {
        if (r.from === "measure" || r.from === "dimensionOrMeasure")
          for (const u of l.measures) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (r.from === "dimension" || r.from === "dimensionOrMeasure")
          for (const u of l.dimensions) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return s;
  }, [a, r.cube, r.from]);
  return /* @__PURE__ */ v(
    "select",
    {
      className: At,
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
function wd({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: At,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function kd({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: At,
      min: r.min,
      max: r.max,
      step: r.step,
      value: typeof e == "number" ? e : "",
      onChange: (a) => {
        const o = a.target.value;
        t(o === "" ? void 0 : Number(o));
      }
    }
  );
}
function Cd({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ v("label", { className: "cv:inline-flex cv:cursor-pointer cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        className: "cv:size-4 cv:rounded cv:border-input cv:text-primary cv:accent-primary cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        checked: e === !0,
        onChange: (a) => t(a.target.checked)
      }
    ),
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:text-foreground", children: n.label ?? n.name })
  ] });
}
const Nd = {
  dateRange: fd,
  granularity: bd,
  select: yd,
  memberSelect: xd,
  text: wd,
  number: kd,
  toggle: Cd
};
function Sd({ control: e, title: t }) {
  var y;
  const { registry: n } = He(), { decls: r, resolveValue: a, setVar: o } = ni(), c = ie(
    () => r.find((g) => g.name === e.variable),
    [r, e.variable]
  ), s = fo();
  if (!c)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, u = ((y = n.controls) == null ? void 0 : y[l]) ?? Nd[l], m = a(e.variable), f = (g) => o(e.variable, g), h = t ?? c.label ?? c.name;
  return l === "toggle" ? /* @__PURE__ */ i(u, { value: m, onChange: f, decl: c, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: dd, htmlFor: s, children: h }),
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
const ii = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: _(
        "cv:rounded-xl cv:border cv:border-border cv:bg-card cv:text-card-foreground cv:shadow",
        e
      ),
      ...t
    }
  )
);
ii.displayName = "Card";
const ci = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: _(
        "cv:grid cv:auto-rows-min cv:grid-rows-[auto_auto] cv:items-start cv:gap-1.5 cv:px-6 cv:pt-6 cv:has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
        e
      ),
      ...t
    }
  )
);
ci.displayName = "CardHeader";
const si = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: _("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
si.displayName = "CardTitle";
const _d = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: _("cv:text-sm cv:text-muted-foreground", e), ...t })
);
_d.displayName = "CardDescription";
const Rd = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: _("cv:col-start-2 cv:row-span-2 cv:row-start-1 cv:self-start cv:justify-self-end", e),
      ...t
    }
  )
);
Rd.displayName = "CardAction";
const li = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: _("cv:px-6 cv:pb-6", e), ...t })
);
li.displayName = "CardContent";
const Ad = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: _("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
Ad.displayName = "CardFooter";
const Nn = "cube-viz-drag-handle";
function ui(e) {
  var s;
  const { registry: t } = He(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: r, menu: a, dragHandleProps: o, children: c } = e;
  return /* @__PURE__ */ v(ii, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    r ? /* @__PURE__ */ v(
      ci,
      {
        ...o,
        className: _(
          Nn,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(si, { className: "cv:truncate cv:text-sm cv:font-semibold", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ i(li, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: c })
  ] });
}
class Ia extends nc {
  constructor() {
    super(...arguments);
    pa(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ v(zn, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Mr, {}),
      /* @__PURE__ */ i(Fn, { children: "Failed to render chart" }),
      /* @__PURE__ */ i(En, { children: n.message })
    ] }) : this.props.children;
  }
}
function Md(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    let c = o == null ? "" : String(o);
    return /^[=+\-@\t\r]/.test(c) && !Number.isFinite(Number(c)) && (c = `'${c}`), /[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
  }, r = t.map(n).join(","), a = e.map((o) => t.map((c) => n(o[c])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function Od(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), o = document.createElement("a");
  o.href = a, o.download = t, o.style.display = "none", (document.body ?? document.documentElement).appendChild(o), o.click(), o.remove(), setTimeout(() => URL.revokeObjectURL(a), 0);
}
function Ld(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const Dd = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function at(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let xt = null;
function mi(e = {}) {
  return xt || (e.includeStyleProperties ? (xt = e.includeStyleProperties, xt) : (xt = at(window.getComputedStyle(document.documentElement)), xt));
}
function Sn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Td(e) {
  const t = Sn(e, "border-left-width"), n = Sn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function zd(e) {
  const t = Sn(e, "border-top-width"), n = Sn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function di(e, t = {}) {
  const n = t.width || Td(e), r = t.height || zd(e);
  return { width: n, height: r };
}
function Fd() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Se = 16384;
function Ed(e) {
  (e.width > Se || e.height > Se) && (e.width > Se && e.height > Se ? e.width > e.height ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se) : e.width > Se ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se));
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
async function $d(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Pd(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), a.appendChild(o), o.appendChild(e), $d(a);
}
const Ne = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ne(n, t);
};
function Id(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function jd(e, t) {
  return mi(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Vd(e, t, n, r) {
  const a = `.${e}:${t}`, o = n.cssText ? Id(n) : jd(n, r);
  return document.createTextNode(`${a}{${o}}`);
}
function ja(e, t, n, r) {
  const a = window.getComputedStyle(e, n), o = a.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const c = Dd();
  try {
    t.className = `${t.className} ${c}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Vd(c, n, a, r)), t.appendChild(s);
}
function qd(e, t, n) {
  ja(e, t, ":before", n), ja(e, t, ":after", n);
}
const Va = "application/font-woff", qa = "image/jpeg", Kd = {
  woff: Va,
  woff2: Va,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: qa,
  jpeg: qa,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Hd(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Gr(e) {
  const t = Hd(e).toLowerCase();
  return Kd[t] || "";
}
function Wd(e) {
  return e.split(/,/)[1];
}
function wr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Bd(e, t) {
  return `data:${t};base64,${e}`;
}
async function vi(e, t, n) {
  const r = await fetch(e, t);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const a = await r.blob();
  return new Promise((o, c) => {
    const s = new FileReader();
    s.onerror = c, s.onloadend = () => {
      try {
        o(n({ res: r, result: s.result }));
      } catch (l) {
        c(l);
      }
    }, s.readAsDataURL(a);
  });
}
const nr = {};
function Ud(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Yr(e, t, n) {
  const r = Ud(e, t, n.includeQueryParams);
  if (nr[r] != null)
    return nr[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const o = await vi(e, n.fetchRequestInit, ({ res: c, result: s }) => (t || (t = c.headers.get("Content-Type") || ""), Wd(s)));
    a = Bd(o, t);
  } catch (o) {
    a = n.imagePlaceholder || "";
    let c = `Failed to fetch resource: ${e}`;
    o && (c = typeof o == "string" ? o : o.message), c && console.warn(c);
  }
  return nr[r] = a, a;
}
async function Gd(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : _n(t);
}
async function Yd(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), c = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, c == null || c.drawImage(e, 0, 0, o.width, o.height);
    const s = o.toDataURL();
    return _n(s);
  }
  const n = e.poster, r = Gr(n), a = await Yr(n, r, t);
  return _n(a);
}
async function Qd(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Hn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Jd(e, t) {
  return Ne(e, HTMLCanvasElement) ? Gd(e) : Ne(e, HTMLVideoElement) ? Yd(e, t) : Ne(e, HTMLIFrameElement) ? Qd(e, t) : e.cloneNode(fi(e));
}
const Xd = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", fi = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Zd(e, t, n) {
  var r, a;
  if (fi(t))
    return t;
  let o = [];
  return Xd(e) && e.assignedNodes ? o = at(e.assignedNodes()) : Ne(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = at(e.contentDocument.body.childNodes) : o = at(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), o.length === 0 || Ne(e, HTMLVideoElement) || await o.reduce((c, s) => c.then(() => Hn(s, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function ev(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : mi(n).forEach((o) => {
    let c = a.getPropertyValue(o);
    o === "font-size" && c.endsWith("px") && (c = `${Math.floor(parseFloat(c.substring(0, c.length - 2))) - 0.1}px`), Ne(e, HTMLIFrameElement) && o === "display" && c === "inline" && (c = "block"), o === "d" && t.getAttribute("d") && (c = `path(${t.getAttribute("d")})`), r.setProperty(o, c, a.getPropertyPriority(o));
  });
}
function tv(e, t) {
  Ne(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ne(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function nv(e, t) {
  if (Ne(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function rv(e, t, n) {
  return Ne(t, Element) && (ev(e, t, n), qd(e, t, n), tv(e, t), nv(e, t)), t;
}
async function av(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const s = n[o].getAttribute("xlink:href");
    if (s) {
      const l = e.querySelector(s), u = document.querySelector(s);
      !l && u && !r[s] && (r[s] = await Hn(u, t, !0));
    }
  }
  const a = Object.values(r);
  if (a.length) {
    const o = "http://www.w3.org/1999/xhtml", c = document.createElementNS(o, "svg");
    c.setAttribute("xmlns", o), c.style.position = "absolute", c.style.width = "0", c.style.height = "0", c.style.overflow = "hidden", c.style.display = "none";
    const s = document.createElementNS(o, "defs");
    c.appendChild(s);
    for (let l = 0; l < a.length; l++)
      s.appendChild(a[l]);
    e.appendChild(c);
  }
  return e;
}
async function Hn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Jd(r, t)).then((r) => Zd(e, r, t)).then((r) => rv(e, r, t)).then((r) => av(r, t));
}
const hi = /url\((['"]?)([^'"]+?)\1\)/g, ov = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, iv = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function cv(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function sv(e) {
  const t = [];
  return e.replace(hi, (n, r, a) => (t.push(a), n)), t.filter((n) => !wr(n));
}
async function lv(e, t, n, r, a) {
  try {
    const o = n ? Ld(t, n) : t, c = Gr(t);
    let s;
    return a || (s = await Yr(o, c, r)), e.replace(cv(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function uv(e, { preferredFontFormat: t }) {
  return t ? e.replace(iv, (n) => {
    for (; ; ) {
      const [r, , a] = ov.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function pi(e) {
  return e.search(hi) !== -1;
}
async function gi(e, t, n) {
  if (!pi(e))
    return e;
  const r = uv(e, n);
  return sv(r).reduce((o, c) => o.then((s) => lv(s, c, t, n)), Promise.resolve(r));
}
async function wt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const o = await gi(a, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function mv(e, t) {
  await wt("background", e, t) || await wt("background-image", e, t), await wt("mask", e, t) || await wt("-webkit-mask", e, t) || await wt("mask-image", e, t) || await wt("-webkit-mask-image", e, t);
}
async function dv(e, t) {
  const n = Ne(e, HTMLImageElement);
  if (!(n && !wr(e.src)) && !(Ne(e, SVGImageElement) && !wr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Yr(r, Gr(r), t);
  await new Promise((o, c) => {
    e.onload = o, e.onerror = t.onImageErrorHandler ? (...l) => {
      try {
        o(t.onImageErrorHandler(...l));
      } catch (u) {
        c(u);
      }
    } : c;
    const s = e;
    s.decode && (s.decode = o), s.loading === "lazy" && (s.loading = "eager"), n ? (e.srcset = "", e.src = a) : e.href.baseVal = a;
  });
}
async function vv(e, t) {
  const r = at(e.childNodes).map((a) => bi(a, t));
  await Promise.all(r).then(() => e);
}
async function bi(e, t) {
  Ne(e, Element) && (await mv(e, t), await dv(e, t), await vv(e, t));
}
function fv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Ka = {};
async function Ha(e) {
  let t = Ka[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Ka[e] = t, t;
}
async function Wa(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (c) => {
    let s = c.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), vi(s, t.fetchRequestInit, ({ result: l }) => (n = n.replace(c, `url(${l})`), [c, l]));
  });
  return Promise.all(o).then(() => n);
}
function Ba(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = e.replace(n, "");
  const a = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const l = a.exec(r);
    if (l === null)
      break;
    t.push(l[0]);
  }
  r = r.replace(a, "");
  const o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, c = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", s = new RegExp(c, "gi");
  for (; ; ) {
    let l = o.exec(r);
    if (l === null) {
      if (l = s.exec(r), l === null)
        break;
      o.lastIndex = s.lastIndex;
    } else
      s.lastIndex = o.lastIndex;
    t.push(l[0]);
  }
  return t;
}
async function hv(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        at(a.cssRules || []).forEach((o, c) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let s = c + 1;
            const l = o.href, u = Ha(l).then((m) => Wa(m, t)).then((m) => Ba(m).forEach((f) => {
              try {
                a.insertRule(f, f.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (h) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: h
                });
              }
            })).catch((m) => {
              console.error("Error loading remote css", m.toString());
            });
            r.push(u);
          }
        });
      } catch (o) {
        const c = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(Ha(a.href).then((s) => Wa(s, t)).then((s) => Ba(s).forEach((l) => {
          c.insertRule(l, c.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        at(a.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${a.href}`, o);
      }
  }), n));
}
function pv(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => pi(t.style.getPropertyValue("src")));
}
async function gv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = at(e.ownerDocument.styleSheets), r = await hv(n, t);
  return pv(r);
}
function yi(e) {
  return e.trim().replace(/["']/g, "");
}
function bv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((o) => {
      t.add(yi(o));
    }), Array.from(r.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function yv(e, t) {
  const n = await gv(e, t), r = bv(e);
  return (await Promise.all(n.filter((o) => r.has(yi(o.style.fontFamily))).map((o) => {
    const c = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return gi(o.cssText, c, t);
  }))).join(`
`);
}
async function xv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await yv(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function wv(e, t = {}) {
  const { width: n, height: r } = di(e, t), a = await Hn(e, t, !0);
  return await xv(a, t), await bi(a, t), fv(a, t), await Pd(a, n, r);
}
async function kv(e, t = {}) {
  const { width: n, height: r } = di(e, t), a = await wv(e, t), o = await _n(a), c = document.createElement("canvas"), s = c.getContext("2d"), l = t.pixelRatio || Fd(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return c.width = u * l, c.height = m * l, t.skipAutoScale || Ed(c), c.style.width = `${u}`, c.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, c.width, c.height)), s.drawImage(o, 0, 0, c.width, c.height), c;
}
async function Cv(e, t = {}) {
  return (await kv(e, t)).toDataURL();
}
function Nv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Sv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function _v(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Rv(e, t, n = 2) {
  const r = await Cv(e, {
    pixelRatio: n,
    backgroundColor: _v(e),
    cacheBust: !0
  });
  Sv(r, `${Nv(t)}.png`);
}
function Av({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, o] = x.useState(!1), [c, s] = x.useState(null), l = t.length > 0, u = !!r;
  if (!l && !n && !u) return null;
  const m = () => {
    const g = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Od(Md(t), `${g}.csv`);
  }, f = async () => {
    const g = r == null ? void 0 : r.current;
    if (!(!g || a)) {
      o(!0), s(null);
      try {
        await Rv(g, e);
      } catch (p) {
        s(p instanceof Error ? p.message : "Couldn't export the image.");
      } finally {
        o(!1);
      }
    }
  }, h = (g) => g.stopPropagation(), y = (g = !0) => _(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !g && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(Me, { children: [
    /* @__PURE__ */ i(
      Oe,
      {
        onMouseDown: h,
        onPointerDown: h,
        onTouchStart: h,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(fc, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: h, onPointerDown: h, onTouchStart: h, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: y(), children: [
        /* @__PURE__ */ i(hc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      u ? /* @__PURE__ */ v("button", { type: "button", onClick: f, disabled: a, className: y(!a), children: [
        /* @__PURE__ */ i(pc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: m, disabled: !l, className: y(l), children: [
        /* @__PURE__ */ i(gc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export CSV"
      ] }),
      c ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pt-1 cv:text-xs cv:text-destructive", children: c }) : null
    ] })
  ] });
}
function Ua({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(Ur, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(od, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(Sd, { control: e.control, title: e.title });
  }
}
function kr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = St({ rows: [] }), o = rt(
    (l) => a({ rows: l.rows, refetch: l.refetch }),
    []
  ), c = ft(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(Ia, { children: /* @__PURE__ */ i(Ua, { widget: e }) }) });
  const s = n ? null : /* @__PURE__ */ i(
    Av,
    {
      title: e.title,
      rows: r.rows,
      refetch: r.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ i(
    ui,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(Ia, { children: /* @__PURE__ */ i(Ua, { widget: e, onState: o }) }) })
    }
  );
}
const Mv = "lg", Ov = 640;
function Lv(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Dv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Np({ spec: e, editable: t = !1, families: n }) {
  const [r, a] = ri(), o = e.grid ?? {}, c = o.cols ?? 12, s = o.rowHeight ?? 40, l = o.margin ?? [12, 12], u = o.containerPadding ?? l, m = ie(
    () => ({ [Mv]: Dv(e.layout) }),
    [e.layout]
  ), f = ie(
    () => new Map(e.widgets.map((y) => [y.id, y])),
    [e.widgets]
  ), h = !t && a > 0 && a < Ov;
  return /* @__PURE__ */ i(Hr, { families: n, children: /* @__PURE__ */ i(Wr, { spec: e, children: /* @__PURE__ */ i("div", { ref: r, className: "cv:w-full", children: a <= 0 ? null : h ? /* @__PURE__ */ i(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: l[1],
        padding: `${u[1]}px ${u[0]}px`
      },
      children: Lv(e.layout).map((y) => {
        const g = f.get(y.i);
        if (!g) return null;
        const p = y.h * s + (y.h - 1) * l[1];
        return /* @__PURE__ */ i("div", { style: { height: p }, children: /* @__PURE__ */ i(kr, { widget: g, editable: !1 }) }, y.i);
      })
    }
  ) : /* @__PURE__ */ i(
    Mo,
    {
      width: a,
      layouts: m,
      breakpoints: { lg: 0 },
      cols: { lg: c },
      rowHeight: s,
      margin: l,
      containerPadding: u,
      dragConfig: { enabled: t, handle: `.${Nn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((y) => {
        const g = f.get(y.i);
        return g ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(kr, { widget: g, editable: t }) }, y.i) : null;
      })
    }
  ) }) }) });
}
function Sp({ spec: e, families: t }) {
  return /* @__PURE__ */ i(Hr, { families: t, children: /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
    ui,
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
      children: /* @__PURE__ */ i(rd, { spec: e })
    }
  ) }) });
}
function Wn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function tt(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Bn(e) {
  return e ? e.cubes.filter((t) => tt(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Wn(t)
  })) : [];
}
function Gt(e, t) {
  if (!(!e || !t))
    return Bn(e).find((n) => n.name === t);
}
function Qr(e) {
  return e.shortTitle || e.title || e.name;
}
function Jt(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function xi(e) {
  return Jt(e.meta, "group");
}
function bn(e) {
  var t;
  return ((t = e.meta) == null ? void 0 : t.canonicalTime) === !0;
}
function Tv(e, t) {
  if (t)
    return Rn(e, "time", t).find(bn);
}
function zv(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = xi(a), c = o ? `g:${o.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(c);
    s || (s = { label: o ?? t(a), items: [] }, r.set(c, s), n.push(c)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function wi(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Qr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Jt(n, "quantity"),
    unit: Jt(n, "unit")
  };
}
function yn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Qr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Jt(n, "quantity"),
    unit: Jt(n, "unit")
  };
}
function ki(e, t) {
  return {
    name: e.name,
    label: Qr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Rn(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!tt(a) || n && a.name !== n) continue;
    const o = Wn(a), c = (s) => {
      s.connectedComponent = o, r.push(s);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        tt(s) && c(wi(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        tt(s) && s.type !== "time" && c(yn(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        tt(s) && s.type === "time" && c(yn(s, a.name));
    if (t === "numberDimension")
      for (const s of a.dimensions)
        tt(s) && s.type === "number" && c(yn(s, a.name));
  }
  return r;
}
function Fv(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!tt(a) || n && !n.has(a.name)) continue;
    const o = Wn(a);
    for (const c of a.segments) {
      if (!tt(c)) continue;
      const s = ki(c, a.name);
      s.connectedComponent = o, r.push(s);
    }
  }
  return r;
}
function Ie(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const r = Wn(n), a = (s) => (s && (s.connectedComponent = r), s), o = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (o)
        return o.type ? "aggType" in o ? a(wi(o, n.name)) : a(yn(o, n.name)) : void 0;
      const c = n.segments.find((s) => s.name === t);
      if (c) return a(ki(c, n.name));
    }
}
function Ev(e) {
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
const Cr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Ci = {
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
function Ht(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Ni(e) {
  var c, s, l, u, m;
  const t = e.query ?? {}, n = (c = t.measures) == null ? void 0 : c.find(Boolean);
  if (n) return Ht(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Ht(r);
  const a = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (a) return Ht(a);
  const o = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Ht(o);
}
function Mt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function $t(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function _e(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function mt(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Si(e, t) {
  const n = {};
  for (const a of e) {
    const o = t[a];
    o && Object.keys(o).length > 0 && (n[a] = o);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const $v = "day";
function Pv(e, t, n) {
  var m, f, h, y;
  const { chart: r } = e, a = e.query ?? {}, o = Mt(r).length ? Mt(r) : a.measures ?? [], c = _e(r) ?? ((m = a.dimensions) == null ? void 0 : m[0]) ?? ((h = (f = a.timeDimensions) == null ? void 0 : f[0]) == null ? void 0 : h.dimension), s = c ? { category: { member: c }, series: { mode: "measures", members: o } } : void 0, l = {
    ...e,
    chart: { ...r, family: t, mapping: void 0, familyOptions: void 0 }
  }, u = (g) => ({
    ...l,
    chart: { ...l.chart, ...g }
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
          series: o.map((g, p) => ({ member: g, render: p % 2 === 1 ? "bar" : "line" }))
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
      const g = [
        ...a.dimensions ?? [],
        ...((y = a.timeDimensions) == null ? void 0 : y.map((p) => p.dimension)) ?? [],
        ...o
      ].map((p) => ({ member: p }));
      return u({ familyOptions: g.length ? { columns: g } : void 0 });
    }
    default:
      return n.require(t).supportsMapping ? u({ mapping: s }) : l;
  }
}
function Vt(e) {
  return jm(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Nr(e) {
  return qm(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Iv(e, t) {
  return t.require(e).wells;
}
function Ae(e) {
  return e.chart.familyOptions ?? {};
}
function Un(e) {
  const t = Ae(e).series;
  return Array.isArray(t) ? t : [];
}
function Jr(e) {
  const t = Ae(e).columns;
  return Array.isArray(t) ? t : [];
}
function jv(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function an(e, t) {
  var c;
  const { chart: n } = e, r = n.family, a = (s) => s ? [s] : [], o = t.require(r).readWells;
  if (o) return o(e);
  switch (r) {
    case "bar":
    case "line":
    case "area": {
      const s = jv(e), l = (c = n.mapping) == null ? void 0 : c.series;
      return { y: l && l.mode === "pivot" ? l.values && l.values.length > 0 ? l.values : a(l.value) : Mt(n), x: a(_e(n)), color: a(s) };
    }
    case "combo":
      return {
        x: a(_e(n)),
        y: Un(e).map((s) => s.member)
      };
    case "pie":
      return { slices: a(_e(n)), size: a(Mt(n)[0]) };
    case "scatter": {
      const s = Ae(e);
      return {
        sx: a(s.x),
        sy: a(s.y),
        size: a(s.size),
        color: a(s.groupBy)
      };
    }
    case "kpi":
      return { value: a(Ae(e).measure) };
    case "table":
      return { columns: Jr(e).map((s) => s.member) };
    default:
      return {};
  }
}
function Gn(e) {
  const t = Vv(e);
  return t === void 0 ? $v : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Vv(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function on(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function pt(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Pt(e, t) {
  return { ...e, dimensions: on(e.dimensions, t) };
}
function Ke(e, t) {
  const n = pt(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Ye(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function gt(e, t, n) {
  if (e)
    return { category: { member: e }, series: Si(t, n) };
}
function An(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function Mn(e, t, n, r) {
  if (!e || t.length === 0) return;
  const a = {};
  for (const s of t) {
    const l = r == null ? void 0 : r[s];
    l && Object.keys(l).length > 0 && (a[s] = l);
  }
  const o = Object.keys(a).length > 0, c = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: a } : {} };
  return { category: { member: e }, series: c };
}
function rr(e, t, n, r, a, o) {
  const c = o.require(t).placeField;
  if (c) return c(e, n, r, a);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Kv(e, n, r, a, o);
    case "combo":
      return Bv(e, n, r, a);
    case "pie":
      return Yv(e, n, r, a);
    case "scatter":
      return Jv(e, n, r);
    case "kpi":
      return Zv(e, r);
    case "table":
      return tf(e, r, a);
    default:
      return e;
  }
}
function qv(e, t, n, r, a) {
  const o = a.require(t).removeField;
  if (o) return o(e, n, r);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Wv(e, n, r, a);
    case "combo":
      return Gv(e, n, r);
    case "pie":
      return Qv(e, n, r);
    case "scatter":
      return Xv(e, n, r);
    case "kpi":
      return ef(e, r);
    case "table":
      return nf(e, r);
    default:
      return e;
  }
}
function Kv(e, t, n, r, a) {
  const { query: o, chart: c } = e, s = an(e, a), l = s.color[0], u = _e(c), m = $t(c);
  if (t === "y") {
    const f = s.y, h = on(f, n);
    return l ? {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: Mn(u, h, l, An(c)) }
    } : {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: gt(u, h, m) }
    };
  }
  if (t === "x")
    return Hv(e, n, r, l, a);
  if (t === "color") {
    const f = s.y;
    if (f.length === 0) return e;
    const h = Pt({ ...o, measures: f }, n);
    return {
      ...e,
      query: h,
      chart: { ...c, mapping: Mn(u, f, n, An(c)) }
    };
  }
  return e;
}
function Hv(e, t, n, r, a) {
  const { query: o, chart: c } = e, s = _e(c), l = an(e, a).y, u = $t(c);
  let m = o;
  const f = mt(o);
  if (f && s === f.dimension ? m = Ye(m, void 0) : s && (m = Ke(m, s)), n === "time") {
    const y = (f == null ? void 0 : f.granularity) ?? Gn(f == null ? void 0 : f.dateRange);
    m = Ye(m, {
      dimension: t,
      granularity: y,
      dateRange: f == null ? void 0 : f.dateRange
    });
  } else
    m = Pt(m, t);
  const h = r ? Mn(t, l, r, An(c)) : gt(t, l, u);
  return { ...e, query: m, chart: { ...c, mapping: h } };
}
function Wv(e, t, n, r) {
  const { query: a, chart: o } = e, c = an(e, r), s = _e(o), l = c.color[0], u = $t(o);
  if (t === "y") {
    const m = pt(c.y, n);
    if (l && m.length >= 1)
      return {
        ...e,
        query: { ...a, measures: m },
        chart: { ...o, mapping: Mn(s, m, l, An(o)) }
      };
    const f = l ? Ke({ ...a, measures: m }, l) : { ...a, measures: m };
    return { ...e, query: f, chart: { ...o, mapping: gt(s, m, u) } };
  }
  if (t === "x") {
    let m = a;
    const f = mt(a);
    return f && f.dimension === n ? m = Ye(m, void 0) : m = Ke(m, n), { ...e, query: m, chart: { ...o, mapping: void 0 } };
  }
  if (t === "color") {
    const m = Ke(a, n);
    return {
      ...e,
      query: m,
      chart: { ...o, mapping: gt(s, c.y, u) }
    };
  }
  return e;
}
const Ga = ["line", "bar"];
function Bv(e, t, n, r) {
  const { query: a, chart: o } = e, c = Ae(e);
  if (t === "x") {
    let s = a;
    const l = _e(o), u = mt(a);
    if (u && l === u.dimension ? s = Ye(s, void 0) : l && (s = Ke(s, l)), r === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? Gn(u == null ? void 0 : u.dateRange);
      s = Ye(s, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Pt(s, n);
    return { ...e, query: s, chart: { ...o, mapping: { category: { member: n }, series: Uv(e) } } };
  }
  if (t === "y") {
    const s = Un(e);
    if (s.some((m) => m.member === n)) return e;
    const l = Ga[s.length % Ga.length], u = [...s, { member: n, render: l }];
    return {
      ...e,
      query: { ...a, measures: on(a.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...c, series: u }, mapping: _i(o, u) }
    };
  }
  return e;
}
function _i(e, t) {
  const n = _e(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((r) => r.member) } } : e.mapping;
}
function Uv(e) {
  return { mode: "measures", members: Un(e).map((t) => t.member) };
}
function Gv(e, t, n) {
  const { query: r, chart: a } = e, o = Ae(e);
  if (t === "x") {
    let c = r;
    const s = mt(r);
    return s && s.dimension === n ? c = Ye(c, void 0) : c = Ke(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  if (t === "y") {
    const c = Un(e).filter((l) => l.member !== n), s = pt(r.measures, n);
    return {
      ...e,
      query: { ...r, measures: s },
      chart: { ...a, familyOptions: { ...o, series: c }, mapping: _i(a, c) }
    };
  }
  return e;
}
function Yv(e, t, n, r) {
  const { query: a, chart: o } = e, c = $t(o);
  if (t === "slices") {
    let s = a;
    const l = _e(o), u = mt(a);
    if (u && l === u.dimension ? s = Ye(s, void 0) : l && (s = Ke(s, l)), r === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? Gn(u == null ? void 0 : u.dateRange);
      s = Ye(s, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Pt(s, n);
    return {
      ...e,
      query: s,
      chart: { ...o, mapping: gt(n, Mt(o), c) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...o, mapping: gt(_e(o), s, c) }
    };
  }
  return e;
}
function Qv(e, t, n) {
  const { query: r, chart: a } = e, o = $t(a);
  if (t === "slices") {
    let c = r;
    const s = mt(r);
    return s && s.dimension === n ? c = Ye(c, void 0) : c = Ke(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: gt(_e(a), [], o) }
  } : e;
}
const Ri = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Jv(e, t, n) {
  const r = Ri[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...Ae(e) }, s = c[r];
  c[r] = n;
  let l = a;
  if (r === "groupBy")
    s && s !== n && (l = Ke(l, s)), l = Pt(l, n);
  else {
    const u = s ? pt(a.measures, s) : a.measures;
    l = { ...a, measures: on(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: c } };
}
function Xv(e, t, n) {
  const r = Ri[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...Ae(e) };
  delete c[r];
  let s = a;
  if (r === "groupBy") s = Ke(s, n);
  else {
    const l = pt(a.measures, n);
    s = { ...a, measures: l.length ? l : [] };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: c } };
}
function Zv(e, t) {
  const { query: n, chart: r } = e, a = { ...Ae(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function ef(e, t) {
  const { query: n, chart: r } = e, a = { ...Ae(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function tf(e, t, n) {
  const { query: r, chart: a } = e, o = Jr(e);
  if (o.some((l) => l.member === t)) return e;
  let c = r;
  if (n === "number") c = { ...r, measures: on(r.measures, t) };
  else if (n === "time") {
    const l = mt(r), u = (l == null ? void 0 : l.granularity) ?? Gn(l == null ? void 0 : l.dateRange), m = r.timeDimensions ?? [];
    m.some((f) => f.dimension === t) || (c = { ...r, timeDimensions: [...m, { dimension: t, granularity: u }] });
  } else c = Pt(r, t);
  const s = { ...Ae(e), columns: [...o, { member: t }] };
  return { ...e, query: c, chart: { ...a, familyOptions: s } };
}
function nf(e, t) {
  var m, f, h;
  const { query: n, chart: r } = e, a = Jr(e).filter((y) => y.member !== t);
  let o = n;
  const c = pt(n.measures, t);
  c.length !== (((m = n.measures) == null ? void 0 : m.length) ?? 0) && (o = { ...o, measures: c.length ? c : void 0 });
  const s = pt(n.dimensions, t);
  s.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: s.length ? s : void 0 });
  const l = (n.timeDimensions ?? []).filter((y) => y.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...Ae(e), columns: a };
  return { ...e, query: o, chart: { ...r, familyOptions: u } };
}
const pe = x.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      ref: r,
      type: t,
      "data-slot": "input",
      className: _(
        "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground cv:shadow-sm cv:transition-colors cv:file:border-0 cv:file:bg-transparent cv:file:text-sm cv:file:font-medium cv:placeholder:text-muted-foreground cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50",
        e
      ),
      ...n
    }
  )
);
pe.displayName = "Input";
function On(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(wo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(sr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(Lr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function Ai({
  cube: e,
  cubes: t,
  kind: n,
  value: r,
  onChange: a,
  placeholder: o = "Select member…",
  disabled: c,
  id: s,
  className: l
}) {
  const { meta: u, isLoading: m } = ut(), f = x.useMemo(() => {
    if (t) {
      const p = new Set(t);
      return Rn(u, n).filter((b) => p.has(b.cube));
    }
    return Rn(u, n, e);
  }, [u, n, e, t]), h = x.useMemo(() => {
    const p = rf(f), b = p.length > 1, w = [];
    for (const [k, C] of p)
      for (const [S, N] of zv(C, () => "Other")) {
        const L = b ? S === "Other" ? k : `${k} · ${S}` : S;
        w.push({ key: `${k}:${S}`, label: L, items: N });
      }
    return w;
  }, [f]), y = h.length > 1, g = f.find((p) => p.name === r);
  return /* @__PURE__ */ v(ze, { value: r, onValueChange: a, disabled: c || m, children: [
    /* @__PURE__ */ i(Ee, { id: s, className: l, children: /* @__PURE__ */ i(Fe, { placeholder: m ? "Loading…" : o, children: g ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      On(g.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: g.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i($e, { children: h.map((p) => /* @__PURE__ */ v(yr, { children: [
      y && p.label ? /* @__PURE__ */ i(xr, { children: p.label }) : null,
      p.items.map((b) => /* @__PURE__ */ i(xe, { value: b.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        On(b.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: b.label })
      ] }) }, b.name))
    ] }, p.key)) })
  ] });
}
function rf(e) {
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
  size: a = "default",
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
      className: _(
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
            className: _(
              "cv:inline-flex cv:items-center cv:justify-center cv:gap-1.5 cv:whitespace-nowrap cv:rounded-md cv:font-medium cv:transition-all cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:pointer-events-none cv:disabled:opacity-50",
              a === "sm" ? "cv:h-7 cv:px-2 cv:text-xs" : "cv:h-7 cv:px-2.5 cv:text-sm",
              r && "cv:flex-1",
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
const Ya = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(sr, { className: "cv:size-3" }), metaKind: "measure" },
  numberDimension: { label: "Numbers", icon: /* @__PURE__ */ i(sr, { className: "cv:size-3" }), metaKind: "numberDimension" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(Lr, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(wo, { className: "cv:size-3" }), metaKind: "time" }
}, af = ["number", "numberDimension", "category", "time"];
function Mi({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: o = "start",
  side: c = "bottom",
  children: s
}) {
  var O, z;
  const { meta: l, isLoading: u } = ut(), [m, f] = x.useState(!1), [h, y] = x.useState(""), [g, p] = x.useState(n.viewLocked ?? "tables"), [b, w] = x.useState({});
  x.useEffect(() => {
    m && p(n.viewLocked ?? "tables");
  }, [m, n.viewLocked]);
  const k = x.useMemo(() => new Set(t), [t]), C = h.trim().toLowerCase(), S = x.useMemo(() => {
    if (g !== "tables") {
      const D = n.views.find((Q) => Q.name === g) ?? Gt(l, g);
      return D ? [{ cube: D, tag: "dataset" }] : [];
    }
    const A = [];
    n.sourceCube && A.push({ cube: n.sourceCube, tag: "source" });
    for (const D of n.relatedCubes) A.push({ cube: D, tag: "related" });
    return A;
  }, [g, n, l]), N = e.kinds.length > 1, L = (A) => {
    const D = [], Q = /* @__PURE__ */ new Map();
    for (const Z of af) {
      if (!e.kinds.includes(Z)) continue;
      const ee = Ya[Z];
      let E = Rn(l, ee.metaKind, A);
      Z === "time" && (E = [...E].sort(
        (H, W) => Number(bn(W)) - Number(bn(H))
      ));
      for (const H of E) {
        if (k.has(H.name) || C && !(H.label.toLowerCase().includes(C) || H.name.toLowerCase().includes(C))) continue;
        const W = xi(H), B = W ? `g:${W.toLowerCase()}` : `k:${ee.label}`;
        let re = Q.get(B);
        re || (re = { key: B, label: W ?? ee.label, headerIcon: W ? void 0 : ee.icon, items: [] }, Q.set(B, re), D.push(B)), re.items.push({ option: H, kind: Z });
      }
    }
    return D.map((Z) => Q.get(Z));
  }, T = S.map((A) => ({ section: A, groups: L(A.cube.name) })).filter((A) => A.groups.length > 0), P = T.length > 0, q = (A, D) => {
    a(A, D), f(!1), y("");
  }, R = g === "tables" ? "All related tables" : ((O = n.views.find((A) => A.name === g)) == null ? void 0 : O.title) ?? ((z = Gt(l, g)) == null ? void 0 : z.title) ?? g;
  return /* @__PURE__ */ v(Me, { open: m, onOpenChange: f, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: s }),
    /* @__PURE__ */ v(Le, { align: o, side: c, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(bc, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: h,
              onChange: (A) => y(A.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(of, { browse: g, label: R, views: n.views, onBrowse: p })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: P ? T.map(({ section: A, groups: D }, Q) => {
        const Z = D.reduce((W, B) => W + B.items.length, 0), ee = A.tag === "related", E = b[A.cube.name] ?? ee, H = C.length > 0 ? !0 : !E;
        return /* @__PURE__ */ v("div", { children: [
          A.tag === "related" && Q > 0 && T[Q - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => w((W) => ({ ...W, [A.cube.name]: !E })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                H ? /* @__PURE__ */ i(ct, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(tn, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(ko, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: A.cube.title }),
                A.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : A.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: Z })
              ]
            }
          ),
          H ? D.map((W) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            D.length > 1 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              W.headerIcon,
              W.label
            ] }) : null,
            W.items.map(({ option: B, kind: re }) => /* @__PURE__ */ i(
              cf,
              {
                option: B,
                kindIcon: N ? Ya[re].icon : void 0,
                badge: re === "time" && bn(B) ? "default" : void 0,
                reason: r(B),
                onPick: () => q(B.name, re)
              },
              B.name
            ))
          ] }, W.key)) : null
        ] }, A.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function of({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, o] = x.useState(!1), c = (s) => {
    r(s), o(!1);
  };
  return /* @__PURE__ */ v(Me, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Oe,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(Co, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(Qa, { active: e === "tables", icon: /* @__PURE__ */ i(ko, { className: "cv:size-3.5" }), onClick: () => c("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ i(
          Qa,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ i(Dr, { className: "cv:size-3.5" }),
            onClick: () => c(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function Qa({
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
      className: _(
        "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
        e && "cv:bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: t }),
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: r }),
        e ? /* @__PURE__ */ i(je, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function cf({ option: e, reason: t, onPick: n, kindIcon: r, badge: a }) {
  return t ? /* @__PURE__ */ v(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv:flex cv:cursor-not-allowed cv:items-center cv:justify-between cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:opacity-45 cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-1.5", children: [
          r,
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
      className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent cv:hover:text-accent-foreground",
      children: [
        r,
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:truncate", children: e.label }),
        a ? /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: a }) : null
      ]
    }
  );
}
const sf = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Wt = "yyyy-MM-dd";
function lf(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ja(e) {
  if (!e) return;
  const t = Ao(e, Wt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Xr({ value: e, onChange: t }) {
  const [n, r] = x.useState(!1), a = typeof e == "string", [o, c] = lf(e), s = Ja(o), l = Ja(c), u = s ? { from: s, to: l } : void 0, m = a ? e : s && l ? `${be(s, "MMM d, yyyy")} – ${be(l, "MMM d, yyyy")}` : s ? be(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Me, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: _("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(xo, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: _("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", m === "Any time" && "cv:text-muted-foreground"), children: m })
    ] }) }),
    /* @__PURE__ */ v(Le, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        sf.map((f) => /* @__PURE__ */ i(
          Y,
          {
            variant: "ghost",
            size: "sm",
            className: _("cv:justify-start cv:font-normal", e === f && "cv:bg-accent"),
            onClick: () => {
              t(f), r(!1);
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
              t(void 0), r(!1);
            },
            children: "Any time"
          }
        )
      ] }),
      /* @__PURE__ */ i(
        oi,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([be(f.from, Wt), be(f.to, Wt)]) : f != null && f.from ? t([be(f.from, Wt), be(f.from, Wt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function uf(e) {
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
function mf(e, t) {
  const n = new Set(uf(t));
  return e.filter((r) => n.has(r.type));
}
function df(e) {
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
function vf(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = a, c = 2;
  for (; r.has(o); ) o = `${a}_${c++}`;
  return o;
}
function ff(e, t, n) {
  const r = df(e), a = { name: vf(t, e, n), type: r }, o = t.trim();
  return o && (a.label = o), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const Oi = x.createContext({});
function hf({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(Oi.Provider, { value: n, children: t });
}
function pf() {
  return x.useContext(Oi);
}
function gf({ kind: e, value: t, onChange: n, className: r }) {
  const a = Br(), o = (a == null ? void 0 : a.decls) ?? [], { createVariable: c } = pf(), [s, l] = x.useState(!1), [u, m] = x.useState(!1), [f, h] = x.useState(""), y = x.useMemo(() => mf(o, e), [o, e]), g = y.find((w) => w.name === t), p = (w) => {
    n(w), l(!1), m(!1);
  }, b = () => {
    if (!c) return;
    const w = ff(e, f || "Variable", o);
    c(w), p(w.name), h("");
  };
  return /* @__PURE__ */ v(
    Me,
    {
      open: s,
      onOpenChange: (w) => {
        l(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", className: _("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", r), children: [
          /* @__PURE__ */ i(yc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: _("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !g && "cv:text-muted-foreground"), children: g ? g.label ?? g.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Le, { align: "start", className: "cv:w-60 cv:p-1", children: [
          y.length > 0 ? y.map((w) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => p(w.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: w.label ?? w.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: w.type }),
                w.name === t ? /* @__PURE__ */ i(je, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          c ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              pe,
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
                /* @__PURE__ */ i(_t, { className: "cv:size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function Ot({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = Te(t), [o, c] = x.useState(a ? "var" : "fixed");
  x.useEffect(() => {
    a && c("var");
  }, [a]);
  const s = (l) => _(
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
            c("fixed"), Te(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: s(o === "var"), onClick: () => c("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      gf,
      {
        kind: e,
        value: Te(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : r(Te(t) ? void 0 : t, (l) => n(l))
  ] });
}
const bf = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function ar(e) {
  return "member" in e && "operator" in e;
}
function yf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: o,
  className: c
}) {
  var R;
  const { meta: s } = ut(), l = ((R = Br()) == null ? void 0 : R.decls) ?? [], [u, m] = x.useState(null), [f, h] = x.useState(null), y = r ?? [], g = y.length === 1 && !ar(y[0]) && "or" in y[0] && Array.isArray(y[0].or) && y[0].or.every(ar) ? y[0] : void 0, p = g ? "any" : "all", b = [], w = [];
  g || y.forEach((O) => ar(O) ? b.push(O) : w.push(O));
  const k = g ? g.or : b, C = w.length === 0 && (k.length >= 2 || p === "any"), S = (O) => p === "any" ? O.length ? [{ or: O }] : [] : [...O, ...w], N = (O) => {
    const z = O.filter((D) => D.member.length > 0), A = S(z);
    a(A.length > 0 ? A : void 0);
  }, L = (O) => {
    const z = O === "any" ? k.length ? [{ or: k }] : [] : [...k];
    a(z.length > 0 ? z : void 0);
  }, T = (O, z) => N(k.map((A, D) => D === O ? { ...A, ...z } : A)), P = (O) => N(k.filter((z, A) => A !== O)), q = (O) => {
    const A = { ...f ?? { member: "", operator: "equals", values: [] }, ...O };
    A.member ? (h(null), m(k.length), N([...k, A])) : h(A);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: _("cv:flex cv:flex-col cv:gap-2", c), children: [
    k.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    C ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        Xt,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: p,
          onChange: L
        }
      ),
      /* @__PURE__ */ i("span", { children: "of these" })
    ] }) : null,
    k.map((O, z) => {
      const A = Ie(s, O.member);
      return u === z ? /* @__PURE__ */ i(
        Xa,
        {
          leaf: O,
          member: A,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (D) => T(z, D),
          onDone: () => m(null),
          onRemove: () => P(z)
        },
        z
      ) : /* @__PURE__ */ i(
        xf,
        {
          text: wf(O, A == null ? void 0 : A.label, l),
          disabled: o,
          onEdit: () => m(z),
          onRemove: () => P(z)
        },
        z
      );
    }),
    f ? /* @__PURE__ */ i(
      Xa,
      {
        leaf: f,
        member: Ie(s, f.member),
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
          /* @__PURE__ */ i(_t, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function xf({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
}) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: n,
        className: "cv:min-w-0 cv:flex-1 cv:truncate cv:px-3 cv:py-2 cv:text-left cv:text-sm cv:hover:text-foreground",
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
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(Lt, { className: "cv:size-4" })
      }
    )
  ] });
}
function Xa({
  leaf: e,
  member: t,
  cube: n,
  cubes: r,
  scope: a,
  disabled: o,
  onChange: c,
  onDone: s,
  onRemove: l
}) {
  const u = Ev(t == null ? void 0 : t.type), m = u.includes(e.operator) ? e.operator : u[0], f = !Cr.has(m);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        s && e.member ? /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: s, children: [
          /* @__PURE__ */ i(je, { className: "cv:size-3.5" }),
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
            children: /* @__PURE__ */ i(Lt, { className: "cv:size-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ i(
          Mi,
          {
            well: bf,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: (h) => c({ member: h }),
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: o,
                className: "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:text-sm cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50",
                children: [
                  t ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                    On(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(ct, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        Ai,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: (h) => c({ member: h }),
          placeholder: "Choose a field…",
          disabled: o
        }
      )
    ] }),
    /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ v(
        ze,
        {
          value: m,
          onValueChange: (h) => c({
            operator: h,
            values: Cr.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Ee, { className: "cv:w-full", children: /* @__PURE__ */ i(Fe, {}) }),
            /* @__PURE__ */ i($e, { children: u.map((h) => /* @__PURE__ */ i(xe, { value: h, children: Ci[h] }, h)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        kf,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => c({ values: h })
        }
      )
    ] }) : null
  ] });
}
function wf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = Ci[e.operator] ?? e.operator;
  if (Cr.has(e.operator)) return `${r} ${a}`;
  const o = (e.values ?? []).map((c) => {
    if (Te(c)) {
      const s = n.find((l) => l.name === c.var);
      return `{${((s == null ? void 0 : s.label) ?? c.var).replace(/[{}]/g, "")}}`;
    }
    return String(c);
  });
  return o.length > 0 ? `${r} ${a} ${o.join(", ")}` : `${r} ${a} …`;
}
function kf({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && Te(r[0]);
  if (t === "time") {
    const s = a ? r[0] : Cf(r);
    return /* @__PURE__ */ i(
      Ot,
      {
        kind: "dateRange",
        value: s,
        onChange: (l) => n(l === void 0 ? [] : Te(l) ? [l] : Nf(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(Xr, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? r[0] : r.filter((s) => !Te(s));
  return /* @__PURE__ */ i(
    Ot,
    {
      kind: o,
      value: c,
      onChange: (s) => n(s === void 0 ? [] : Te(s) ? [s] : s),
      renderFixed: (s, l) => /* @__PURE__ */ i(
        pe,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => l(Sf(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function Cf(e) {
  const t = e.filter((n) => !Te(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Nf(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Sf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function _f({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: o } = e, c = (o.filters ?? []).length, s = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(Me, { children: [
    /* @__PURE__ */ v(
      Oe,
      {
        className: _(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          c > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(xc, { className: "cv:size-4" }),
          "Filter",
          c > 0 ? /* @__PURE__ */ i("span", { className: "cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground", children: c }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(Rf, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ i(yf, { cube: n, cubes: r, scope: a, value: o.filters, onChange: s })
    ] })
  ] });
}
function Rf({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = ut(), a = Fv(r, n);
  if (a.length === 0) return null;
  const o = new Set(e.query.segments ?? []), c = (s) => {
    const l = new Set(o);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = [...l];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-b cv:border-border cv:pb-2", children: [
    /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: a.map((s) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => c(s.name),
        title: s.description ?? s.name,
        className: _(
          "cv:rounded-full cv:border cv:px-2.5 cv:py-1 cv:text-xs cv:transition-colors",
          o.has(s.name) ? "cv:border-ring cv:bg-accent cv:text-foreground" : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function Af({ currentName: e, hasFields: t, onSelect: n }) {
  var p;
  const { meta: r } = ut(), a = x.useMemo(() => Bn(r), [r]), o = a.filter((b) => b.type === "view"), c = a.filter((b) => b.type === "cube"), s = a.find((b) => b.name === e), [l, u] = x.useState(!1), [m, f] = x.useState(null), h = (b) => {
    if (b === e) {
      u(!1);
      return;
    }
    t ? f(b) : (n(b), u(!1));
  }, y = () => {
    m && n(m), f(null), u(!1);
  }, g = m ? ((p = a.find((b) => b.name === m)) == null ? void 0 : p.title) ?? m : "";
  return /* @__PURE__ */ v(
    Me,
    {
      open: l,
      onOpenChange: (b) => {
        u(b), b || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          Oe,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(Co, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: _("cv:truncate", !s && "cv:text-muted-foreground"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Le, { align: "start", className: "cv:w-64 cv:p-1", children: m ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: g }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(Y, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(Y, { size: "sm", className: "cv:h-7", onClick: y, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(le, { children: [
            /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
            o.map((b) => /* @__PURE__ */ i(
              Za,
              {
                icon: /* @__PURE__ */ i(Dr, { className: "cv:size-3.5" }),
                label: b.title,
                active: b.name === e,
                onClick: () => h(b.name)
              },
              b.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Tables" }),
          c.map((b) => /* @__PURE__ */ i(
            Za,
            {
              icon: /* @__PURE__ */ i(No, { className: "cv:size-3.5" }),
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
function Za({
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
      className: _(
        "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
        n && "cv:bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: e }),
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: t }),
        n ? /* @__PURE__ */ i(je, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function eo(e, t, n, r) {
  var o;
  const a = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function to({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var s;
  const o = ((s = e.chart.axes) == null ? void 0 : s[n]) ?? {}, c = o.labelHide === !0;
  return /* @__PURE__ */ v(
    "div",
    {
      className: _(
        "cv:flex cv:w-full cv:min-w-[8rem] cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-1.5 cv:py-1 cv:transition-opacity",
        c && "cv:opacity-50"
      ),
      children: [
        r ? /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: r }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: a ?? "Axis title",
            disabled: c,
            onChange: (l) => eo(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          Of,
          {
            hidden: c,
            what: "axis title",
            onClick: () => eo(e, t, n, { labelHide: c ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Mf({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ v("div", { className: _("cv:flex cv:flex-col cv:gap-1 cv:transition-opacity", n && "cv:opacity-50"), children: [
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
          n ? /* @__PURE__ */ i(So, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(_o, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Of({
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
      children: e ? /* @__PURE__ */ i(So, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(_o, { className: "cv:size-3.5" })
    }
  );
}
const Li = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: _(
        "cv:flex cv:items-center cv:gap-2 cv:text-sm cv:font-medium cv:leading-none cv:select-none cv:peer-disabled:cursor-not-allowed cv:peer-disabled:opacity-70",
        e
      ),
      ...t
    }
  )
);
Li.displayName = "Label";
function he({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: o,
  children: c
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: _("cv:flex cv:flex-col cv:gap-1.5 cv:py-1.5", o), children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i(Li, { htmlFor: r, className: "cv:text-muted-foreground", children: e }),
      a ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: a }) : null
    ] }),
    c,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function Sr({
  checked: e,
  onChange: t,
  disabled: n,
  id: r,
  "aria-label": a,
  className: o
}) {
  return /* @__PURE__ */ i(
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
      className: _(
        "peer cv:inline-flex cv:h-5 cv:w-9 cv:shrink-0 cv:cursor-pointer cv:items-center cv:rounded-full cv:border-2 cv:border-transparent cv:transition-colors cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50",
        e ? "cv:bg-primary" : "cv:bg-input",
        o
      ),
      children: /* @__PURE__ */ i(
        "span",
        {
          className: _(
            "cv:pointer-events-none cv:block cv:size-4 cv:rounded-full cv:bg-background cv:shadow-sm cv:ring-0 cv:transition-transform",
            e ? "cv:translate-x-4" : "cv:translate-x-0"
          )
        }
      )
    }
  );
}
function ye({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: a,
  className: o
}) {
  const c = x.useId();
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "switch-row",
      className: _("cv:flex cv:items-center cv:justify-between cv:gap-3 cv:py-1.5", o),
      children: [
        /* @__PURE__ */ v(
          "label",
          {
            htmlFor: c,
            className: _(
              "cv:flex cv:min-w-0 cv:flex-col cv:gap-0.5",
              a ? "cv:cursor-not-allowed cv:opacity-70" : "cv:cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:leading-none", children: e }),
              t ? /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ i(Sr, { id: c, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function Lf({ spec: e, update: t }) {
  var g, p;
  const n = lt(), { chart: r } = e, a = r.family, o = r.familyOptions ?? {}, c = n.require(a);
  if (c.Customize) {
    const b = c.Customize;
    return /* @__PURE__ */ i(b, { spec: e, update: t });
  }
  const s = (b) => t({ ...e, chart: { ...r, ...b } }), l = (b) => t({ ...e, chart: { ...r, familyOptions: { ...o, ...b } } }), u = ((p = (g = r.mapping) == null ? void 0 : g.series) == null ? void 0 : p.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", h = /* @__PURE__ */ i(he, { label: "Stacked", children: /* @__PURE__ */ i(
    Xt,
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
    switch (a) {
      case "bar":
        return /* @__PURE__ */ v(le, { children: [
          /* @__PURE__ */ i(
            ye,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
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
        return /* @__PURE__ */ v(le, { children: [
          h,
          r.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((w = (b = r.mapping) == null ? void 0 : b.series) == null ? void 0 : w.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(le, { children: [
          /* @__PURE__ */ i(
            ye,
            {
              label: "Donut",
              checked: typeof o.innerRadiusPct == "number" && o.innerRadiusPct > 0,
              onChange: (k) => l({ innerRadiusPct: k ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(he, { label: "Slice labels", children: /* @__PURE__ */ i(
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
              value: o.showLabels ?? "percent",
              onChange: (k) => l({ showLabels: k })
            }
          ) }),
          /* @__PURE__ */ i(Tf, { label: "Max slices", children: /* @__PURE__ */ i(
            pe,
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
        return /* @__PURE__ */ v(le, { children: [
          /* @__PURE__ */ i(
            ye,
            {
              label: "Compact rows",
              checked: o.rowHeight === "compact",
              onChange: (k) => l({ rowHeight: k ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            ye,
            {
              label: "Sortable columns",
              checked: o.sortable !== !1,
              onChange: (k) => l({ sortable: k })
            }
          ),
          /* @__PURE__ */ i(
            ye,
            {
              label: "Sticky header",
              checked: o.stickyHeader !== !1,
              onChange: (k) => l({ stickyHeader: k })
            }
          ),
          /* @__PURE__ */ i(
            ye,
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
function Df(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0;
}
function Tf({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Di(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Pv(e, r, n));
  };
}
function zf({ spec: e, update: t, empty: n }) {
  const r = lt(), a = e.chart.family, o = Di(e, t, r);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(Ti, { family: a, onPick: o, families: r })
  ] }) }) : null;
}
function Ff({ spec: e, update: t }) {
  const n = lt(), r = e.chart.family, a = Di(e, t, n), o = n.require(r), c = o.icon;
  return /* @__PURE__ */ v(Me, { children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(c, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          o.label,
          /* @__PURE__ */ i(ct, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Le, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(Ti, { family: r, onPick: a, families: n })
      ] }),
      Df(r, n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(Lf, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Ti({ family: e, onPick: t, families: n }) {
  return /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-4 cv:gap-1.5", children: n.families().map((r) => {
    const a = n.require(r).icon, o = r === e;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => t(r),
        "aria-pressed": o,
        className: _(
          "cv:flex cv:flex-col cv:items-center cv:gap-1 cv:rounded-md cv:border cv:px-1 cv:py-2 cv:text-[10px] cv:transition-colors",
          o ? "cv:border-ring cv:bg-accent cv:text-foreground" : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ i(a, { className: "cv:size-4" }),
          n.require(r).label
        ]
      },
      r
    );
  }) });
}
function Ef(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function $f(e, t, n, r, a, o) {
  var ea, ta, na, ra, aa, oa, ia, ca, sa, la, ua, ma, da, va;
  const { chart: c, query: s } = e, l = c.family, u = n.kinds.length === 1 ? n.kinds[0] : Pf(a), m = c.familyOptions ?? {}, f = Array.isArray(m.series) ? m.series : [], h = Array.isArray(m.columns) ? m.columns : [], y = $t(c), g = y[r], p = l === "combo" && n.id === "y", b = l === "table" && n.id === "columns", w = l === "bar" || l === "line" || l === "area", k = ((ta = (ea = c.mapping) == null ? void 0 : ea.series) == null ? void 0 : ta.mode) === "measures", C = w && n.id === "y", S = C && k, N = p ? (na = f.find((j) => j.member === r)) == null ? void 0 : na.label : b ? (ra = h.find((j) => j.member === r)) == null ? void 0 : ra.label : S ? g == null ? void 0 : g.label : void 0, L = p ? (aa = f.find((j) => j.member === r)) == null ? void 0 : aa.colorToken : S ? g == null ? void 0 : g.colorToken : void 0, T = mt(s), P = n.kinds.includes("time") && (T == null ? void 0 : T.dimension) === r, q = P ? T == null ? void 0 : T.granularity : void 0, R = P ? T == null ? void 0 : T.dateRange : void 0, O = p ? ((oa = f.find((j) => j.member === r)) == null ? void 0 : oa.render) ?? "line" : void 0, z = l === "line" && n.id === "y", A = l === "bar" && n.id === "y" && c.orientation !== "horizontal", D = ((ca = (ia = c.mapping) == null ? void 0 : ia.series) == null ? void 0 : ca.mode) === "pivot", Q = ((la = (sa = c.mapping) == null ? void 0 : sa.series) == null ? void 0 : la.mode) === "pivot" ? c.mapping.series.meta : void 0, Z = (z || A) && (k || D) || p, ee = Z ? (p ? (ua = f.find((j) => j.member === r)) == null ? void 0 : ua.axis : k ? g == null ? void 0 : g.axis : (ma = Q == null ? void 0 : Q[r]) == null ? void 0 : ma.axis) ?? "left" : void 0, W = (l === "line" || l === "area") && n.id === "y" && k || p && (O === "line" || O === "area"), B = p ? f.find((j) => j.member === r) : void 0, re = W ? p ? B == null ? void 0 : B.curve : g == null ? void 0 : g.curve : void 0, me = W ? p ? B == null ? void 0 : B.dots : g == null ? void 0 : g.dots : void 0, U = (j) => {
    var fa, ha;
    if ((fa = c.mapping) != null && fa.series && c.mapping.series.mode !== "measures") return;
    const de = ((ha = c.mapping) != null && ha.series && c.mapping.series.mode === "measures" ? c.mapping.series.members : s.measures) ?? [], ve = { ...y };
    j && Object.keys(j).length > 0 ? ve[r] = j : delete ve[r];
    const jt = _e(c);
    jt && t({
      ...e,
      chart: {
        ...c,
        mapping: { category: { member: jt }, series: Si(de, ve) }
      }
    });
  }, $ = (j) => {
    const de = f.map((ve) => ve.member === r ? { ...ve, ...j } : ve);
    t({ ...e, chart: { ...c, familyOptions: { ...m, series: de } } });
  }, V = (j) => {
    const de = h.map((ve) => ve.member === r ? { ...ve, ...j } : ve);
    t({ ...e, chart: { ...c, familyOptions: { ...m, columns: de } } });
  }, J = (j) => {
    p ? $({ label: j }) : b ? V({ label: j }) : S && U({ ...g, label: j });
  }, ae = (j) => {
    p ? $({ colorToken: j ?? void 0 }) : S && U({ ...g, colorToken: j ?? void 0 });
  }, fe = (j) => {
    if (!T) return;
    const de = { ...T };
    for (const ve of Object.keys(j)) {
      const jt = j[ve];
      jt === void 0 ? delete de[ve] : de[ve] = jt;
    }
    t({ ...e, query: { ...s, timeDimensions: [de] } });
  }, we = (j) => fe({ granularity: j }), We = (j) => fe({ dateRange: j }), Pe = (j) => $({ render: j }), G = (j) => {
    var de, ve;
    p ? $({ axis: j }) : S ? U({ ...g, axis: j }) : ((ve = (de = c.mapping) == null ? void 0 : de.series) == null ? void 0 : ve.mode) === "pivot" && t(zi(e, l, r, j));
  }, X = (j) => {
    p ? $({ curve: j }) : S && U({ ...g, curve: j });
  }, ge = (j) => {
    p ? $({ dots: j }) : S && U({ ...g, dots: j });
  }, dt = () => t(qv(e, l, n.id, r, o)), Be = (n.id === "x" || n.id === "slices") && (u === "category" || u === "time"), Ue = (da = c.mapping) == null ? void 0 : da.series, M = (Ue && Ue.mode === "pivot" ? Ue.value : Mt(c)[0]) ?? ((va = s.measures) == null ? void 0 : va[0]), F = Be ? u === "time" ? [
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
  ] : [], I = (() => {
    const j = Ef(s.order)[0];
    if (!j) return "none";
    const [de, ve] = j;
    return M && de === M ? ve === "desc" ? "value-desc" : "value-asc" : de === r ? u === "time" ? ve === "desc" ? "time-desc" : "time-asc" : ve === "asc" ? "label-asc" : "label-desc" : "none";
  })(), K = (j) => {
    let de;
    switch (j) {
      case "none":
        de = void 0;
        break;
      case "value-desc":
        de = M ? [[M, "desc"]] : void 0;
        break;
      case "value-asc":
        de = M ? [[M, "asc"]] : void 0;
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
  }, te = typeof s.limit == "number" ? s.limit : void 0, oe = (j) => t({ ...e, query: { ...s, limit: j && j > 0 ? j : void 0 } }), ue = (l === "bar" || l === "line" || l === "area") && P, It = ue && m.comparePrevious === !0;
  return {
    kind: u,
    label: N,
    colorToken: L,
    granularity: q,
    dateRange: R,
    render: O,
    axis: ee,
    curve: re,
    dots: me,
    canLineStyle: W,
    canAxis: Z,
    canRename: p || b || S,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: C && k || p,
    isTimeField: P,
    isComboY: p,
    isCategoryField: Be,
    sortValue: I,
    sortOptions: F,
    onSort: K,
    limit: te,
    onLimit: oe,
    canComparePrevious: ue,
    comparePrevious: It,
    comparePreviousReady: ue && R !== void 0,
    onComparePrevious: (j) => t({ ...e, chart: { ...c, familyOptions: { ...m, comparePrevious: j || void 0 } } }),
    onRename: J,
    onRecolor: ae,
    onGranularity: we,
    onDateRange: We,
    onRender: Pe,
    onAxis: G,
    onCurve: X,
    onDots: ge,
    onRemove: dt
  };
}
function zi(e, t, n, r) {
  var c;
  const { chart: a } = e;
  if (t === "combo") {
    const s = a.familyOptions ?? {}, l = (Array.isArray(s.series) ? s.series : []).map(
      (u) => u.member === n ? { ...u, axis: r } : u
    );
    return { ...e, chart: { ...a, familyOptions: { ...s, series: l } } };
  }
  const o = (c = a.mapping) == null ? void 0 : c.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const s = { ...o.meta ?? {} };
    return s[n] = { ...s[n] ?? {}, axis: r }, { ...e, chart: { ...a, mapping: { ...a.mapping, series: { ...o, meta: s } } } };
  }
  return e;
}
function Pf(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function no(e, t, n, r) {
  var f;
  const { chart: a, query: o } = e, c = a.family, s = (h) => {
    if (r < 0 || r >= h.length || n === r) return h;
    const y = h.slice(), [g] = y.splice(n, 1);
    return y.splice(r, 0, g), y;
  };
  if (c === "combo" && t.id === "y") {
    const h = a.familyOptions ?? {}, y = s(Array.isArray(h.series) ? h.series : []), g = s(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: g },
      chart: { ...a, familyOptions: { ...h, series: y } }
    };
  }
  if (c === "table" && t.id === "columns") {
    const h = a.familyOptions ?? {}, y = s(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...h, columns: y } } };
  }
  const l = s(o.measures ?? []), u = (f = a.mapping) == null ? void 0 : f.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: l } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = s(u.values);
    m = { ...a.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...o, measures: l }, chart: { ...a, mapping: m } };
}
function If(e, t, n, r) {
  const a = Bn(e), o = a.filter((S) => S.type === "view"), c = an(t, r), s = Object.values(c).flat();
  let l;
  for (const S of s) {
    const N = Ie(e, S);
    if (N) {
      l = N;
      break;
    }
  }
  const u = !l && n ? Gt(e, n) : void 0, m = l ? Gt(e, l.cube) : u, f = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, h = (l == null ? void 0 : l.connectedComponent) ?? (u == null ? void 0 : u.connectedComponent), y = t.query.measures ?? [], g = y.length ? Ht(y[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: o, measureSource: g, scopeComponent: h };
  const p = g ?? (l == null ? void 0 : l.cube) ?? (u == null ? void 0 : u.name), b = p ? Gt(e, p) : void 0, w = a.filter((S) => S.type === "cube" && S.connectedComponent !== void 0), C = (h === void 0 ? w : w.filter((S) => S.connectedComponent === h)).filter((S) => S.name !== p).sort((S, N) => S.title.localeCompare(N.title));
  return {
    sourceCube: (b == null ? void 0 : b.type) === "cube" ? b : void 0,
    relatedCubes: C,
    views: o,
    measureSource: g,
    scopeComponent: h
  };
}
const jf = it.options;
function Vf({
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
      className: _("cv:flex cv:flex-wrap cv:items-center cv:gap-1.5", a),
      children: [
        n ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": e === void 0,
            "aria-label": "Auto color",
            disabled: r,
            onClick: () => t(null),
            className: _(
              "cv:relative cv:flex cv:size-6 cv:items-center cv:justify-center cv:rounded-full cv:border cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
              e === void 0 ? "cv:border-ring cv:ring-2 cv:ring-ring/40" : "cv:border-input cv:hover:border-ring"
            ),
            children: "A"
          }
        ) : null,
        jf.map((o) => {
          const c = e === o;
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": c,
              "aria-label": o,
              title: o,
              disabled: r,
              onClick: () => t(c && n ? null : o),
              className: _(
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
const qf = ht.options, Kf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Fi({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: o,
  className: c
}) {
  const s = n && n.length > 0 ? n : qf;
  return /* @__PURE__ */ v(
    ze,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: a,
      children: [
        /* @__PURE__ */ i(Ee, { id: o, className: c, children: /* @__PURE__ */ i(Fe, { placeholder: r }) }),
        /* @__PURE__ */ i($e, { children: s.map((l) => /* @__PURE__ */ i(xe, { value: l, children: Kf[l] }, l)) })
      ]
    }
  );
}
const ro = { bar: "Bar", line: "Line", area: "Area" }, Hf = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Wf({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: o,
  reorder: c,
  className: s
}) {
  const l = lt(), u = $f(e, t, n, r, a, l), m = (a == null ? void 0 : a.label) ?? r, f = u.label || m, h = u.canColor && o !== void 0, y = u.canRename || h || u.isTimeField || u.isCategoryField || u.isComboY && !!u.render || u.canAxis || u.canLineStyle || !!c, g = (b) => {
    const w = b.trim();
    u.onRename(w.length > 0 ? w : void 0);
  }, p = /* @__PURE__ */ v(le, { children: [
    h ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : a ? On(a.type) : null,
    /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: f })
  ] });
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "field-pill",
      className: _(
        "cv:flex cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:py-1 cv:pl-2 cv:pr-1 cv:text-sm cv:shadow-sm",
        s
      ),
      children: [
        y ? /* @__PURE__ */ v(Me, { children: [
          /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${f}`,
              children: p
            }
          ) }),
          /* @__PURE__ */ i(Le, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            u.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                pe,
                {
                  defaultValue: u.label ?? "",
                  placeholder: m,
                  className: "cv:h-8",
                  onBlur: (b) => g(b.target.value),
                  onKeyDown: (b) => {
                    b.key === "Enter" && (g(b.target.value), b.target.blur());
                  }
                }
              )
            ] }) : null,
            h ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Color" }),
              /* @__PURE__ */ i(Vf, { value: u.colorToken, onChange: u.onRecolor })
            ] }) : null,
            u.isTimeField ? /* @__PURE__ */ v(le, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  Ot,
                  {
                    kind: "dateRange",
                    value: u.dateRange,
                    onChange: u.onDateRange,
                    renderFixed: (b, w) => /* @__PURE__ */ i(Xr, { value: b, onChange: w })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  Ot,
                  {
                    kind: "granularity",
                    value: u.granularity,
                    onChange: u.onGranularity,
                    renderFixed: (b, w) => /* @__PURE__ */ i(Fi, { value: b, onChange: w, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              u.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    Sr,
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
            u.isCategoryField ? /* @__PURE__ */ v(le, { children: [
              /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Sort" }),
                /* @__PURE__ */ i(
                  "select",
                  {
                    value: u.sortValue,
                    onChange: (b) => u.onSort(b.target.value),
                    className: "cv:h-8 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-sm cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
                    children: u.sortOptions.map((b) => /* @__PURE__ */ i("option", { value: b.key, children: b.label }, b.key))
                  }
                )
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ i(
                  pe,
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
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: Object.keys(ro).map((b) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => u.onRender(b),
                  className: _(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                    u.render === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    ro[b],
                    u.render === b ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
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
                  className: _(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize",
                    u.axis === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    b,
                    u.axis === b ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
                  ]
                },
                b
              )) })
            ] }) : null,
            u.canLineStyle ? /* @__PURE__ */ v(le, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: Hf.map(([b, w]) => /* @__PURE__ */ v(
                  "button",
                  {
                    type: "button",
                    onClick: () => u.onCurve(b),
                    className: _(
                      "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                      (u.curve ?? "cv:monotone") === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                    ),
                    children: [
                      w,
                      (u.curve ?? "monotone") === b ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
                    ]
                  },
                  b
                )) })
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(Sr, { checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
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
                    /* @__PURE__ */ i(Ln, { className: "cv:size-3.5" }),
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
                    /* @__PURE__ */ i(Dn, { className: "cv:size-3.5" }),
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
                  /* @__PURE__ */ i(ga, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: f, children: p }),
        /* @__PURE__ */ i(
          Y,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: u.onRemove,
            "aria-label": `Remove ${f}`,
            children: /* @__PURE__ */ i(ga, { className: "cv:size-3.5" })
          }
        )
      ]
    }
  );
}
function ao({
  spec: e,
  update: t,
  well: n,
  placed: r,
  allPlaced: a,
  optionFor: o,
  colorFor: c,
  scope: s,
  blockReason: l,
  onAdd: u,
  badge: m,
  orientation: f,
  lockedSingle: h,
  disableReorder: y,
  label: g,
  note: p,
  pickerSide: b,
  pickerAlign: w,
  control: k
}) {
  const C = n.cardinality === "many" && !h, S = C || r.length === 0, N = r.length, L = f === "vertical", T = g ?? n.label, P = /* @__PURE__ */ i(
    Mi,
    {
      well: n,
      placed: a,
      scope: s,
      blockReason: l,
      onSelect: u,
      side: b ?? (L ? "right" : "top"),
      align: w ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          className: _(
            "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:border-dashed cv:border-input cv:bg-background/60 cv:px-2 cv:py-1 cv:text-xs cv:text-muted-foreground cv:transition-colors cv:hover:border-ring cv:hover:text-foreground",
            L && "cv:w-full"
          ),
          children: [
            /* @__PURE__ */ i(_t, { className: "cv:size-3.5" }),
            r.length === 0 ? T : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: _("cv:flex cv:flex-col cv:gap-1", !L && "cv:min-w-0"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: T }),
          m ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        k ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: k }) : null,
        /* @__PURE__ */ v("div", { className: _("cv:flex cv:gap-1", L ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          r.map((q, R) => /* @__PURE__ */ i(
            Wf,
            {
              spec: e,
              update: t,
              well: n,
              member: q,
              option: o(q),
              resolvedColor: c(q),
              className: L ? "cv:w-full" : void 0,
              reorder: C && N > 1 && !y ? {
                canUp: R > 0,
                canDown: R < N - 1,
                onUp: () => t(no(e, n, R, R - 1)),
                onDown: () => t(no(e, n, R, R + 1))
              } : void 0
            },
            q
          )),
          S ? P : null
        ] }),
        p ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: p }) : null
      ]
    }
  );
}
function or({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ v(Me, { children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2.5 cv:py-1.5 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: e }),
          /* @__PURE__ */ v("span", { className: "cv:flex cv:shrink-0 cv:items-center cv:gap-1 cv:text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "cv:text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(ct, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Le, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Zr(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...o } } }) };
}
function Bf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Zr(e, t), a = Ni(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.display ?? "number", s = n.gauge, l = (m) => {
    const f = o ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!f) return;
    const h = { ...f };
    for (const y of Object.keys(m)) {
      const g = m[y];
      g === void 0 ? delete h[y] : h[y] = g;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(Yt, { label: "Time field", children: /* @__PURE__ */ i(
      Ai,
      {
        cube: a,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (m) => l({ dimension: m }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Yt, { label: "Date range", children: /* @__PURE__ */ i(
      Ot,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (m) => l({ dateRange: m }),
        renderFixed: (m, f) => /* @__PURE__ */ i(Xr, { value: m, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(he, { label: "Display", children: /* @__PURE__ */ i(
      Xt,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: c,
        onChange: (m) => r({ display: m })
      }
    ) }),
    c === "gauge" ? /* @__PURE__ */ i(Yt, { label: "Gauge max", children: /* @__PURE__ */ i(
      pe,
      {
        type: "number",
        className: "cv:h-8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (m) => {
          const f = parseFloat(m.target.value);
          r({ gauge: Number.isFinite(f) ? { ...s ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Uf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Zr(e, t), a = n.comparison, o = a !== void 0, c = x.useRef(void 0);
  a && (c.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ye,
      {
        label: "Show comparison",
        checked: o,
        onChange: (m) => r({
          comparison: m ? c.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(le, { children: [
      /* @__PURE__ */ i(he, { label: "Against", children: /* @__PURE__ */ i(
        Xt,
        {
          "aria-label": "Compare against",
          size: "sm",
          options: [
            { value: "previousPeriod", label: "Prev period" },
            { value: "value", label: "Fixed value" }
          ],
          value: (a == null ? void 0 : a.mode) ?? "previousPeriod",
          onChange: (m) => r({ comparison: { ...a, mode: m } })
        }
      ) }),
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ i(Yt, { label: "Baseline value", children: /* @__PURE__ */ i(
        pe,
        {
          type: "number",
          className: "cv:h-8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (m) => {
            const f = parseFloat(m.target.value);
            r({ comparison: { ...a, value: Number.isFinite(f) ? f : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-start cv:gap-1.5 cv:rounded-md cv:border cv:border-amber-500/30 cv:bg-amber-500/10 cv:px-2 cv:py-1.5 cv:text-[11px] cv:leading-snug cv:text-amber-700", children: [
        /* @__PURE__ */ i(bo, { className: "cv:mt-px cv:size-3.5 cv:shrink-0" }),
        /* @__PURE__ */ v("span", { children: [
          /* @__PURE__ */ i("strong", { className: "cv:font-semibold", children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ i(
        ye,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      ),
      /* @__PURE__ */ i(
        ye,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the up/down colors).",
          checked: l !== "down",
          onChange: (m) => r({ goodDirection: m ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Gf({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Zr(e, t), a = n.sparkline, o = a !== void 0, c = n.comparison !== void 0, s = n.goodDirection ?? "up", l = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ye,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => r({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(le, { children: [
      /* @__PURE__ */ i(Yt, { label: "Trend granularity", children: /* @__PURE__ */ i(
        Ot,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ i(Fi, { value: u, onChange: m, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      c ? null : /* @__PURE__ */ i(
        ye,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the trend color).",
          checked: s !== "down",
          onChange: (u) => r({ goodDirection: u ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Yt({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Yf({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var ge, dt, Be, Ue;
  const { meta: a } = ut(), { locale: o } = He(), c = lt(), { chart: s } = e, l = s.family, u = c.require(l), m = u.queryless ?? !1, f = Ni(e), h = x.useMemo(() => Vn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), y = x.useCallback(
    (M) => M && (o == null ? void 0 : o.unitSystem) === "imperial" && h[M] ? h[M].imperialUnit : M,
    [o == null ? void 0 : o.unitSystem, h]
  ), g = x.useMemo(() => Iv(l, c), [l, c]), p = x.useMemo(() => an(e, c), [e, c]), b = x.useMemo(() => new Map(g.map((M) => [M.id, M])), [g]), [w, k] = x.useState(void 0), C = x.useMemo(
    () => If(a, e, w, c),
    [a, e, w, c]
  ), S = x.useMemo(() => Object.values(p).flat(), [p]), N = x.useCallback(
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
    () => Object.values(p).every((M) => M.length === 0),
    [p]
  ), P = u.dualAxisY, q = x.useCallback(
    (M, F, I) => u.assignSeriesAxis ? u.assignSeriesAxis(M, F, I) : u.placeField ? M : zi(M, l, F, I),
    [u, l]
  ), R = x.useCallback(
    (M) => {
      var K, te, oe;
      if (l === "combo") {
        const ce = s.familyOptions ?? {}, ue = (Array.isArray(ce.series) ? ce.series : []).find(
          (It) => It.member === M
        );
        return (ue == null ? void 0 : ue.axis) === "right" ? "right" : "left";
      }
      const F = (K = s.mapping) == null ? void 0 : K.series;
      return (F && (F.mode === "measures" || F.mode === "pivot") ? (oe = (te = F.meta) == null ? void 0 : te[M]) == null ? void 0 : oe.axis : void 0) === "right" ? "right" : "left";
    },
    [l, s.familyOptions, s.mapping]
  ), O = x.useMemo(() => {
    var oe, ce;
    const M = p.y ?? [], F = (ue) => M.find((It) => R(It) === ue), I = F("left"), K = P ? F("right") : void 0, te = (ue) => ue ? Ie(a, ue) : void 0;
    return {
      leftKey: I ? Vt(te(I)) : void 0,
      rightKey: K ? Vt(te(K)) : void 0,
      leftLabel: I ? oo(te(I), y((oe = te(I)) == null ? void 0 : oe.unit)) : void 0,
      rightLabel: K ? oo(te(K), y((ce = te(K)) == null ? void 0 : ce.unit)) : void 0
    };
  }, [p, P, R, a, y]), z = x.useCallback(
    (M) => {
      const F = Vt(M), { leftKey: I, rightKey: K } = O;
      return I === void 0 || F === I ? "left" : K === void 0 || F === K ? "right" : "left";
    },
    [O]
  ), A = x.useCallback(
    (M, F) => {
      var I;
      if (F) {
        if (C.scopeComponent !== void 0 && F.connectedComponent !== C.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (F.memberType === "measure" && C.measureSource && F.cube !== C.measureSource)
          return `Measures come from one table (${((I = C.sourceCube) == null ? void 0 : I.title) ?? C.measureSource}). Remove them to switch.`;
        if (M === "y" && F.memberType === "measure") {
          const { leftKey: K, rightKey: te, leftLabel: oe, rightLabel: ce } = O, ue = Vt(F);
          if (P) {
            if (K !== void 0 && te !== void 0 && ue !== K && ue !== te)
              return `Both axes show ${oe} & ${ce} — remove one to add a third unit.`;
          } else if (K !== void 0 && ue !== K)
            return `This axis shows ${oe}; ${F.label ?? "this field"} is ${Nr(F)}`;
        }
      }
    },
    [C, O, P]
  ), D = P ? [O.leftLabel, O.rightLabel].filter(Boolean).join(" · ") || void 0 : O.leftLabel, Q = x.useMemo(() => {
    var F;
    const M = {};
    if (l === "bar" || l === "line" || l === "area") {
      const I = (F = s.mapping) == null ? void 0 : F.series;
      if (I && I.mode === "measures") {
        const K = I.members.map((oe) => {
          var ce, ue;
          return { key: oe, colorToken: (ue = (ce = I.meta) == null ? void 0 : ce[oe]) == null ? void 0 : ue.colorToken };
        }), te = pr(K, s.colors);
        I.members.forEach((oe, ce) => {
          M[oe] = te[ce];
        });
      }
    } else if (l === "combo") {
      const I = s.familyOptions ?? {}, K = Array.isArray(I.series) ? I.series : [], te = K.map((ce) => ({ key: ce.member, colorToken: ce.colorToken })), oe = pr(te, s.colors);
      K.forEach((ce, ue) => {
        M[ce.member] = oe[ue];
      });
    }
    return M;
  }, [l, s.mapping, s.colors, s.familyOptions]), Z = x.useCallback(
    (M, F, I) => {
      const K = Ie(a, F);
      if (A(M, K)) return;
      let te = rr(e, l, M, F, I, c);
      P && M === "y" && (te = q(te, F, z(K)));
      const oe = u.canonicalTimeWell;
      if (oe && M !== oe && (p[oe] ?? []).length === 0) {
        const ce = Tv(a, K == null ? void 0 : K.cube);
        ce && ce.name !== F && !A(oe, ce) && (te = rr(te, l, oe, ce.name, "time", c));
      }
      t(te);
    },
    [A, a, t, e, l, P, z, q, c, u, p]
  ), ee = x.useCallback(
    (M, F) => {
      var te;
      if (!F) return;
      if (C.scopeComponent !== void 0 && F.connectedComponent !== C.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (F.memberType === "measure" && C.measureSource && F.cube !== C.measureSource)
        return `Measures come from one table (${((te = C.sourceCube) == null ? void 0 : te.title) ?? C.measureSource}). Remove them to switch.`;
      const I = M === "left" ? O.leftKey : O.rightKey, K = M === "left" ? O.leftLabel : O.rightLabel;
      if (I !== void 0 && Vt(F) !== I)
        return `This axis shows ${K}; ${F.label ?? "this field"} is ${Nr(F)}`;
    },
    [C, O]
  ), E = x.useCallback(
    (M, F, I) => {
      const K = Ie(a, F);
      ee(M, K) || t(q(rr(e, l, "y", F, I, c), F, M));
    },
    [ee, a, t, e, l, q, c]
  ), H = l === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, W = H.left.map((M) => b.get(M)).filter(Boolean), B = H.bottom.map((M) => b.get(M)).filter(Boolean), re = (ge = p.color) == null ? void 0 : ge[0], me = ((dt = p.y) == null ? void 0 : dt.length) ?? 0, U = re && me > 1 ? `${me} measures × ${((Be = Ie(a, re)) == null ? void 0 : Be.label) ?? "this split"} — one series per measure per value.` : void 0, $ = u.hasLegend, V = p.y ?? [], J = V.find((M) => R(M) !== "right"), ae = P ? V.find((M) => R(M) === "right") : void 0, fe = (M) => {
    var K, te, oe, ce;
    if (!M) return;
    const F = (K = s.mapping) == null ? void 0 : K.series;
    return (F && F.mode === "measures" ? (oe = (te = F.meta) == null ? void 0 : te[M]) == null ? void 0 : oe.label : void 0) ?? ((ce = Ie(a, M)) == null ? void 0 : ce.label);
  }, we = (M) => {
    var I, K, te, oe;
    const F = (ce, ue) => ue ? /* @__PURE__ */ i(to, { spec: e, update: t, axis: ce, title: "Title", auto: fe(ue) }) : null;
    switch (M) {
      case "y":
        return F("y", J);
      // single value axis (bar / area)
      case "x":
        return F("x", (K = (I = s.mapping) == null ? void 0 : I.category) == null ? void 0 : K.member);
      case "sy":
        return F("y", (te = p.sy) == null ? void 0 : te[0]);
      // scatter Y axis
      case "sx":
        return F("x", (oe = p.sx) == null ? void 0 : oe[0]);
      // scatter X axis
      default:
        return null;
    }
  }, We = (M, F) => /* @__PURE__ */ i(
    ao,
    {
      spec: e,
      update: t,
      well: M,
      placed: p[M.id] ?? [],
      allPlaced: S,
      optionFor: (I) => Ie(a, I),
      colorFor: (I) => Q[I],
      scope: C,
      blockReason: (I) => A(M.id, I),
      onAdd: (I, K) => Z(M.id, I, K),
      badge: M.id === "y" ? D : void 0,
      orientation: F,
      note: M.id === "color" ? U : void 0,
      control: we(M.id)
    },
    M.id
  ), Pe = b.get("y"), G = (M) => {
    if (!Pe) return null;
    const F = M === "left" ? J : ae;
    return /* @__PURE__ */ i(
      ao,
      {
        spec: e,
        update: t,
        well: Pe,
        label: M === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter((I) => R(I) === M),
        allPlaced: S,
        optionFor: (I) => Ie(a, I),
        colorFor: (I) => Q[I],
        scope: C,
        blockReason: (I) => ee(M, I),
        onAdd: (I, K) => E(M, I, K),
        badge: M === "left" ? O.leftLabel : O.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: F ? /* @__PURE__ */ i(
          to,
          {
            spec: e,
            update: t,
            axis: M === "left" ? "y" : "y2",
            title: "Title",
            auto: fe(F)
          }
        ) : null
      },
      `y-${M}`
    );
  }, X = () => {
    const M = b.get("value"), F = (p.value ?? []).length > 0, I = s.familyOptions ?? {};
    return /* @__PURE__ */ v(le, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        M ? We(M, "vertical") : null,
        F ? /* @__PURE__ */ i(
          or,
          {
            label: "Time, range & display",
            summary: I.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(Bf, { spec: e, update: t })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ i(or, { label: "Comparison", summary: I.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Uf, { spec: e, update: t }) }),
        /* @__PURE__ */ i(or, { label: "Sparkline", summary: I.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Gf, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      !T || m ? /* @__PURE__ */ i(Ff, { spec: e, update: t }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          Af,
          {
            currentName: C.viewLocked ?? ((Ue = C.sourceCube) == null ? void 0 : Ue.name),
            hasFields: S.length > 0,
            onSelect: N
          }
        ),
        /* @__PURE__ */ i(_f, { spec: e, update: t, cube: f, scopeCubes: L, scope: C })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      W.length > 0 ? /* @__PURE__ */ i("div", { className: _("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", u.sidebarWidthClass), children: l === "kpi" ? X() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        W.flatMap(
          (M) => P && M.id === "y" ? [G("left"), G("right")] : [We(M, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          r,
          /* @__PURE__ */ i(zf, { spec: e, update: t, empty: T && !m })
        ] }),
        B.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          B.map((M) => We(M, "horizontal")),
          $ && !T ? /* @__PURE__ */ i(Mf, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function oo(e, t) {
  const n = Nr(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Ei(e, t) {
  const n = x.useRef(e);
  x.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = x.useRef(null), a = x.useRef(null);
  return x.useEffect(
    () => () => {
      r.current !== null && (clearTimeout(r.current), r.current = null, a.current !== null && (n.current(...a.current), a.current = null));
    },
    []
  ), x.useCallback(
    (...o) => {
      r.current !== null && clearTimeout(r.current), a.current = o, r.current = setTimeout(() => {
        r.current = null, a.current = null, n.current(...o);
      }, t);
    },
    [t]
  );
}
function ir(e) {
  const t = Po.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Qf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = x.useState(() => ({
    spec: e,
    issues: ir(e)
  })), [o, c] = x.useState(e);
  x.useEffect(() => {
    a({ spec: e, issues: ir(e) }), c(e);
  }, [e]);
  const s = Ei((h) => t(h), n), l = r.spec, u = r.issues, m = u.length === 0, f = x.useCallback(
    (h) => {
      const y = ir(h);
      a({ spec: h, issues: y }), y.length === 0 && (c(h), s(h));
    },
    [s]
  );
  return { draft: l, issues: u, valid: m, committed: o, update: f };
}
const Jf = () => {
};
function Xf({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: o
}) {
  const c = lt(), { draft: s, issues: l, valid: u, committed: m, update: f } = Qf({
    spec: e,
    onChange: t ?? Jf,
    debounceMs: r
  }), h = c.get(s.chart.family), y = (h == null ? void 0 : h.queryless) ?? !1, g = m, p = (T) => {
    var P, q, R;
    return (((P = T == null ? void 0 : T.measures) == null ? void 0 : P.length) ?? 0) > 0 || (((q = T == null ? void 0 : T.dimensions) == null ? void 0 : q.length) ?? 0) > 0 || (((R = T == null ? void 0 : T.timeDimensions) == null ? void 0 : R.some((O) => typeof O.granularity == "string")) ?? !1);
  }, b = (T) => {
    var P;
    return (((P = T == null ? void 0 : T.measures) == null ? void 0 : P.length) ?? 0) > 0;
  }, w = (h == null ? void 0 : h.requiresMeasure) ?? s.chart.family !== "table", k = y || p(s.query) && p(g.query) && (!w || b(s.query) && b(g.query)), C = w && !b(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", S = x.useCallback(
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
    Ur,
    {
      query: g.query ?? {},
      chart: g.chart,
      editing: !0,
      updateFamilyOptions: S
    }
  ) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: C }) }), L = n ? /* @__PURE__ */ v(Y, { size: "sm", disabled: !u, onClick: () => n(m), children: [
    /* @__PURE__ */ i(Ro, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: _("cv:flex cv:w-full cv:flex-col cv:gap-2", a ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        u ? null : /* @__PURE__ */ v(zn, { variant: "destructive", children: [
          /* @__PURE__ */ i(Mr, { className: "cv:size-4" }),
          /* @__PURE__ */ i(Fn, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(En, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            l.slice(0, 3).map((T, P) => /* @__PURE__ */ v("li", { children: [
              T.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: T.path }) : null,
              " ",
              T.message
            ] }, P)),
            l.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              l.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(Yf, { spec: s, update: f, toolbar: L, children: N }) })
      ]
    }
  );
}
function Zf({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: r,
  onUndo: a,
  onRedo: o,
  canUndo: c,
  canRedo: s,
  onDiscard: l,
  discardDisabled: u,
  onSave: m,
  saveDisabled: f,
  className: h
}) {
  const y = a || o, [g, p] = x.useState(!1);
  x.useEffect(() => {
    if (!g) return;
    const w = setTimeout(() => p(!1), 1600);
    return () => clearTimeout(w);
  }, [g]), x.useEffect(() => {
    f || p(!1);
  }, [f]);
  const b = () => {
    m == null || m(), p(!0);
  };
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: _(
        "cv:flex cv:flex-wrap cv:items-center cv:gap-2 cv:rounded-lg cv:border cv:border-border cv:bg-card cv:p-2",
        h
      ),
      children: [
        /* @__PURE__ */ i(
          pe,
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
            /* @__PURE__ */ i(yo, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(Lr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(wc, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ i(kc, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          y ? /* @__PURE__ */ v(le, { children: [
            /* @__PURE__ */ i(
              Y,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !c,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(Cc, {})
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
                children: /* @__PURE__ */ i(Nc, {})
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
                /* @__PURE__ */ i(Sc, {}),
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
              className: _(
                // Keep the confirmation vivid even though the button is (correctly) disabled
                // right after a save — there's nothing left to save.
                g && "cv:bg-emerald-600 cv:text-white cv:hover:bg-emerald-600 cv:disabled:opacity-100"
              ),
              children: [
                g ? /* @__PURE__ */ i(je, {}) : /* @__PURE__ */ i(Ro, {}),
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
const $i = "lg", Pi = 12;
function eh(e, t) {
  const n = t[$i];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const c = o.reduce((s, l) => Math.max(s, l.x + l.w), 0);
    c > a && (r = o, a = c);
  }
  return r ?? e;
}
function th(e, t) {
  const n = new Map(e.map((c) => [c.i, c])), r = new Map(t.map((c) => [c.i, c])), a = [], o = (c, s) => {
    const l = {
      i: c.i,
      x: c.x,
      y: c.y,
      w: c.w,
      h: c.h
    };
    (s == null ? void 0 : s.minW) !== void 0 && (l.minW = s.minW), (s == null ? void 0 : s.minH) !== void 0 && (l.minH = s.minH), (s == null ? void 0 : s.static) !== void 0 && (l.static = s.static), a.push(l);
  };
  for (const c of e) {
    const s = r.get(c.i);
    s && o(s, c);
  }
  for (const c of t)
    n.has(c.i) || o(c, void 0);
  return a;
}
const nh = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function rh(e, t, n, r = Pi) {
  const a = nh[n], o = Math.min(a.w, r), c = e.reduce((s, l) => Math.max(s, l.y + l.h), 0);
  return {
    i: t,
    x: 0,
    y: c,
    w: o,
    h: a.h,
    minW: Math.min(a.minW, o),
    minH: a.minH
  };
}
function Ii(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Pi) {
  const a = rh(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function ah(e, t, n) {
  const r = e.widgets.find((o) => o.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  if (a.id = n, a.type === "chart") {
    const o = a.chart.familyOptions;
    o && typeof o.chartId == "string" && (a.chart = { ...a.chart, familyOptions: { ...o, chartId: `ai_${n}` } });
  }
  return Ii(e, a);
}
function oh(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function ih(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const ch = 12, sh = 900, lh = 0.4;
function uh(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function mh({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: o,
  onLayoutChange: c
}) {
  const [s, l] = ri(), u = e.grid ?? {}, m = u.cols ?? ch, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], y = u.containerPadding ?? [0, 0], g = Math.max(lh, Math.min(1, l / sh)), p = Math.round(g / 0.05) * 0.05, b = Math.max(8, Math.round(f * p)), w = [
    Math.round(h[0] * p),
    Math.round(h[1] * p)
  ], k = [
    Math.round(y[0] * p),
    Math.round(y[1] * p)
  ], C = x.useMemo(
    () => ({ [$i]: uh(e.layout) }),
    [e.layout]
  ), S = x.useMemo(
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
  const T = x.useRef(null), P = x.useCallback(
    (q, R) => {
      const z = eh(q, R).map((A) => ({ ...A }));
      dh(L.current, z) || N.current(z);
    },
    []
  );
  return /* @__PURE__ */ i(Wr, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    Mo,
    {
      width: l,
      layouts: C,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: b,
      margin: w,
      containerPadding: k,
      dragConfig: { enabled: !0, handle: `.${Nn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: P,
      children: e.layout.map((q) => {
        const R = S.get(q.i);
        if (!R) return null;
        const O = R.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${R.title ?? R.type}`,
              "aria-pressed": O,
              onPointerDown: (z) => {
                T.current = { x: z.clientX, y: z.clientY };
              },
              onClick: (z) => {
                const A = T.current;
                A && Math.hypot(z.clientX - A.x, z.clientY - A.y) > 5 || n(R.id);
              },
              onKeyDown: (z) => {
                (z.key === "Enter" || z.key === " ") && (z.preventDefault(), n(R.id));
              },
              className: _(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                O ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(kr, { widget: R, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: _(Nn, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${R.title ?? R.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), r(R.id);
                      },
                      className: _(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(_c, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${R.title ?? R.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), a(R.id);
                      },
                      className: _(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Rc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${R.title ?? R.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), o(R.id);
                      },
                      className: _(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-destructive cv:hover:text-destructive-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Lt, {})
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
function dh(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const vh = x.memo(mh);
function fh(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function hh({
  widget: e,
  onChange: t
}) {
  const n = x.useRef(t);
  x.useEffect(() => {
    n.current = t;
  }, [t]);
  const r = x.useRef(e);
  x.useEffect(() => {
    r.current = e;
  }, [e]);
  const a = Oo({
    extensions: [Do],
    editable: !0,
    content: fh(e.doc),
    onUpdate: ({ editor: o }) => {
      const c = o.getJSON();
      n.current({ ...r.current, doc: c });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: _(
          ai,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return a ? /* @__PURE__ */ i(he, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(ph, { editor: a }),
    /* @__PURE__ */ i(Lo, { editor: a })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function et({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: _(
        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md cv:text-muted-foreground cv:transition-colors",
        "cv:hover:bg-muted cv:hover:text-foreground cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        "cv:[&_svg]:size-4",
        e && "cv:bg-muted cv:text-foreground"
      ),
      children: r
    }
  );
}
function ph({ editor: e }) {
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
          et,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(Ac, {})
          }
        ),
        /* @__PURE__ */ i(
          et,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(Mc, {})
          }
        ),
        /* @__PURE__ */ i(
          et,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(Oc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          et,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(Lc, {})
          }
        ),
        /* @__PURE__ */ i(
          et,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(Dc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          et,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(Tc, {})
          }
        ),
        /* @__PURE__ */ i(
          et,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(zc, {})
          }
        ),
        /* @__PURE__ */ i(
          et,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(Fc, {})
          }
        )
      ]
    }
  );
}
const gh = Tr(
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
function bh({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: _(gh({ variant: t }), e), ...n });
}
function yh({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: o
}) {
  const { meta: c, isLoading: s } = ut(), l = x.useMemo(() => Bn(c), [c]), u = l.filter((h) => h.type === "cube"), m = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(ze, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ i(Ee, { id: a, className: o, children: /* @__PURE__ */ i(Fe, { placeholder: s ? "Loading…" : n, children: f ? /* @__PURE__ */ i(cr, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v($e, { children: [
      m.length > 0 ? /* @__PURE__ */ v(yr, { children: [
        /* @__PURE__ */ i(xr, { children: "Views" }),
        m.map((h) => /* @__PURE__ */ i(xe, { value: h.name, children: /* @__PURE__ */ i(cr, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(yr, { children: [
        /* @__PURE__ */ i(xr, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(xe, { value: h.name, children: /* @__PURE__ */ i(cr, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function cr({ option: e }) {
  const t = e.type === "view" ? Dr : No;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(bh, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const xh = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function wh(e) {
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
function kh({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), o = (s) => n({ ...e, control: { ...e.control, variable: s } }), c = (s) => {
    s !== r.kind && a(wh(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          ze,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i($e, { children: t.map((s) => /* @__PURE__ */ i(xe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(he, { label: "Control", children: /* @__PURE__ */ v(ze, { value: r.kind, onValueChange: (s) => c(s), children: [
      /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, {}) }),
      /* @__PURE__ */ i($e, { children: Zc.options.map((s) => /* @__PURE__ */ i(xe, { value: s, children: xh[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ i(Ch, { control: r, onChange: a, variables: t })
  ] });
}
function Ch({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(Nh, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(_h, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(Rh, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(Ah, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(Mh, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(Oh, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Nh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(le, { children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          Sh,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ i(
      ye,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function Sh({
  selected: e,
  onChange: t
}) {
  const [n, r] = x.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), o = (s) => {
    const l = new Set(a);
    l.has(s) ? l.delete(s) : l.add(s), t(gn.filter((u) => l.has(u.value)).map((u) => u.value));
  }, c = a.size === 0 ? "Default set" : a.size === gn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Me, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(Y, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: c }),
      /* @__PURE__ */ i(ct, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Le, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: gn.map((s) => {
      const l = a.has(s.value);
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
                className: _(
                  "cv:flex cv:size-4 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:border",
                  l ? "cv:border-primary cv:bg-primary cv:text-primary-foreground" : "cv:border-input"
                ),
                children: l ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
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
function _h({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const l = new Set(r);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = ht.options.filter((m) => l.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((s) => s.type === "dateRange" || s.type === "time"), c = "__none__";
  return /* @__PURE__ */ v(le, { children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          ze,
          {
            value: e.rangeVariable ?? c,
            onValueChange: (s) => t({ ...e, rangeVariable: s === c ? void 0 : s }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v($e, { children: [
                /* @__PURE__ */ i(xe, { value: c, children: "None" }),
                o.map((s) => /* @__PURE__ */ i(xe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(he, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: ht.options.map((s) => {
      const l = r.has(s);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": l,
          onClick: () => a(s),
          className: "cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize cv:transition-colors" + (l ? "cv:border-primary cv:bg-primary/10 cv:text-foreground" : "cv:border-border cv:text-muted-foreground cv:hover:text-foreground"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Rh({
  control: e,
  onChange: t
}) {
  const n = (o, c) => {
    const s = e.options.map(
      (l, u) => u === o ? { value: c.value ?? String(l.value), label: c.label ?? l.label } : l
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (o) => t({ ...e, options: e.options.filter((c, s) => s !== o) });
  return /* @__PURE__ */ v(le, { children: [
    /* @__PURE__ */ i(
      ye,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (o) => t({ ...e, multiple: o })
      }
    ),
    /* @__PURE__ */ i(
      he,
      {
        label: "Options",
        action: /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ i(_t, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "No options yet." }) : e.options.map((o, c) => /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5", children: [
          /* @__PURE__ */ i(
            pe,
            {
              className: "cv:flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (s) => n(c, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            pe,
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
              onClick: () => a(c),
              children: /* @__PURE__ */ i(Lt, {})
            }
          )
        ] }, c)) })
      }
    )
  ] });
}
function Ah({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(le, { children: [
    /* @__PURE__ */ i(he, { label: "From", children: /* @__PURE__ */ v(
      ze,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, {}) }),
          /* @__PURE__ */ v($e, { children: [
            /* @__PURE__ */ i(xe, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(xe, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(xe, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      he,
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
          yh,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Mh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ i(he, { label: "Placeholder", children: /* @__PURE__ */ i(
    pe,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function Oh({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ i(he, { label: a, children: /* @__PURE__ */ i(
    pe,
    {
      type: "number",
      value: e[r] ?? "",
      onChange: (o) => {
        const c = o.target.value;
        t({ ...e, [r]: c === "" ? void 0 : Number(c) });
      }
    }
  ) });
  return /* @__PURE__ */ v(le, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function Lh(e) {
  return { schemaVersion: kt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Dh(e) {
  const t = {
    schemaVersion: kt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Th(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function io({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const o = r ? (c) => r([...t, c]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: _("cv:flex cv:flex-col cv:gap-2", a && "cv:h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      he,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ i(
          pe,
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
      /* @__PURE__ */ i(Wr, { spec: Lh(t), children: /* @__PURE__ */ i(hf, { createVariable: o, children: /* @__PURE__ */ i("div", { className: _(a && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        Xf,
        {
          fill: a,
          spec: Dh(e),
          onChange: (c) => n(Th(e, c))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(hh, { widget: e, onChange: n }) : /* @__PURE__ */ i(kh, { widget: e, variables: t, onChange: n })
  ] });
}
function zh({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: o,
  regionId: c,
  className: s
}) {
  const l = /* @__PURE__ */ v(le, { children: [
    r ? /* @__PURE__ */ i(
      tn,
      {
        className: _(
          "cv:size-4 cv:shrink-0 cv:text-muted-foreground cv:transition-transform",
          a && "cv:rotate-90"
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
      className: _("cv:flex cv:items-center cv:justify-between cv:gap-2", s),
      children: [
        r ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": a,
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
function Fh({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !0,
  defaultOpen: a = !0,
  open: o,
  onOpenChange: c,
  className: s,
  children: l
}) {
  const u = o !== void 0, [m, f] = x.useState(a), h = r ? u ? o : m : !0, y = x.useId(), g = x.useCallback(() => {
    const p = !h;
    u || f(p), c == null || c(p);
  }, [h, u, c]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": h ? "open" : "closed",
      className: _("cv:border-b cv:border-border cv:py-2 cv:last:border-b-0", s),
      children: [
        /* @__PURE__ */ i(
          zh,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: h,
            onToggle: g,
            regionId: y
          }
        ),
        h ? /* @__PURE__ */ i("div", { id: y, "data-slot": "section-body", className: "cv:pt-2", children: l }) : null
      ]
    }
  );
}
function Eh(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function $h(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Ph(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Ih(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function jh(e, t) {
  switch (e) {
    case "chart":
      return $h(t);
    case "text":
      return Ph(t);
    case "input":
      return Ih(t);
  }
}
function Vh(e) {
  return { name: e, type: "string" };
}
function qh(e) {
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
const co = {
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
function Kh({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = x.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((m) => m.name === u));
    return u;
  }, o = (u, m) => {
    t(e.map((f, h) => h === u ? Hh(f, m) : f));
  }, c = (u) => t(e.filter((m, f) => f !== u)), s = () => t([...e, Vh(a())]), l = (u, m) => {
    const f = u + m;
    if (f < 0 || f >= e.length) return;
    const h = e.slice();
    [h[u], h[f]] = [h[f], h[u]], t(h);
  };
  return /* @__PURE__ */ i(
    Fh,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(Y, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ i(_t, {}),
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
          /* @__PURE__ */ i(_t, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, m) => /* @__PURE__ */ i(
        Wh,
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
function Hh(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = qh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Wh({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: o,
  onMove: c
}) {
  const [s, l] = x.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0;
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
              children: s ? /* @__PURE__ */ i(ct, {}) : /* @__PURE__ */ i(tn, {})
            }
          ),
          /* @__PURE__ */ i(
            pe,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (m) => a({ name: m.target.value }),
              className: "cv:h-7 cv:min-w-0 cv:flex-1 cv:font-mono cv:text-xs"
            }
          ),
          /* @__PURE__ */ i("span", { className: "cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline", children: co[e.type] }),
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
                children: /* @__PURE__ */ i(Ln, {})
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
                children: /* @__PURE__ */ i(Dn, {})
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
                children: /* @__PURE__ */ i(Lt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive", children: u }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5", children: [
          /* @__PURE__ */ i(he, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(ze, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, {}) }),
            /* @__PURE__ */ i($e, { children: Eo.options.map((m) => /* @__PURE__ */ i(xe, { value: m, children: co[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ i(he, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
            pe,
            {
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (m) => a({ label: m.target.value })
            }
          ) }),
          /* @__PURE__ */ i(
            ye,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (m) => a({ array: m })
            }
          ),
          /* @__PURE__ */ i(Bh, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function Bh({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ i(
      ye,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (a) => t(a)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(he, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
      pe,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (a) => {
          const o = a.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : Uh(e.default);
  return /* @__PURE__ */ i(he, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    pe,
    {
      value: r,
      placeholder: Gh(e.type),
      onChange: (a) => {
        const o = a.target.value;
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
function Uh(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Gh(e) {
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
function _p({
  spec: e,
  remoteSpec: t,
  onRemoteAdopted: n,
  onChange: r,
  onSave: a,
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
  var We, Pe;
  const [g, p] = x.useState(e), [b, w] = x.useState(e);
  x.useEffect(() => {
    p(e), w(e);
  }, [e]);
  const [k, C] = x.useState(null), S = x.useRef(0), [N, L] = x.useState(null), T = x.useRef(k), P = x.useRef(N), q = x.useRef(g);
  x.useEffect(() => {
    T.current = k, P.current = N, q.current = g;
  });
  const R = x.useRef(null);
  R.current === null && (R.current = o ?? Eh());
  const O = o ?? R.current, z = Ei(
    (G) => r == null ? void 0 : r(G),
    c
  ), A = x.useCallback(
    (G) => {
      S.current = Date.now(), p((X) => {
        const ge = G(X);
        return z(ge), ge;
      });
    },
    [z]
  ), D = x.useRef(t);
  x.useEffect(() => {
    if (!t || t === D.current) return;
    const G = 500;
    let X = null;
    const ge = () => {
      var M;
      const dt = Date.now() - S.current;
      if (dt < G) {
        X = setTimeout(ge, G - dt);
        return;
      }
      D.current = t;
      const Be = /* @__PURE__ */ new Set();
      ((M = P.current) == null ? void 0 : M.kind) === "widget" && Be.add(P.current.id), T.current && Be.add(T.current);
      const Ue = Jh(t, q.current, Be);
      p(Ue), n == null || n(Ue);
    };
    return ge(), () => {
      X && clearTimeout(X);
    };
  }, [t]);
  const Q = x.useCallback(
    (G) => {
      const X = jh(G, O());
      A((ge) => Ii(ge, X)), C(X.id), L({ kind: "widget", id: X.id });
    },
    [A, O]
  ), Z = x.useCallback((G) => C(G), []), ee = x.useCallback((G) => {
    C(G), L({ kind: "widget", id: G });
  }, []), E = x.useCallback(
    (G) => {
      A((X) => oh(X, G)), C((X) => X === G ? null : X), L((X) => (X == null ? void 0 : X.kind) === "widget" && X.id === G ? null : X);
    },
    [A]
  ), H = x.useCallback(
    (G) => {
      const X = O();
      A((ge) => ah(ge, G, X)), C(X);
    },
    [A, O]
  ), W = x.useCallback(
    (G) => A((X) => ih(X, G)),
    [A]
  ), B = x.useCallback(
    (G) => A((X) => {
      const ge = th(X.layout, G);
      return Qh(X.layout, ge) ? X : { ...X, layout: ge };
    }),
    [A]
  ), re = x.useCallback(
    (G) => A((X) => ({ ...X, name: G || void 0 })),
    [A]
  ), me = x.useCallback(
    (G) => A((X) => ({ ...X, variables: G })),
    [A]
  ), U = x.useDeferredValue(g), $ = x.useMemo(
    () => mr.safeParse(U),
    [U]
  ), V = x.useCallback(() => {
    const G = mr.safeParse(g);
    G.success && (a == null || a(G.data), w(g));
  }, [g, a]), J = g !== b, ae = (N == null ? void 0 : N.kind) === "widget" ? g.widgets.find((G) => G.id === N.id) ?? null : null;
  x.useEffect(() => {
    (N == null ? void 0 : N.kind) === "widget" && !g.widgets.some((G) => G.id === N.id) && L(null);
  }, [N, g.widgets]);
  const fe = x.useCallback(() => L(null), []), we = (N == null ? void 0 : N.kind) === "variables" ? "Dashboard variables" : ae ? ae.title ?? `${Yh(ae.type)} widget` : "";
  return /* @__PURE__ */ i(Hr, { families: h, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Pe = (We = g.grid) == null ? void 0 : We.margin) == null ? void 0 : Pe[0]) ?? 12 },
      className: _("cv:flex cv:h-full cv:flex-col cv:gap-2", y),
      children: [
        /* @__PURE__ */ i(
          Zf,
          {
            name: g.name ?? "",
            onNameChange: re,
            onAdd: Q,
            onEditVariables: () => L({ kind: "variables" }),
            onUndo: s,
            onRedo: l,
            canUndo: u,
            canRedo: m,
            onDiscard: f,
            discardDisabled: !J,
            onSave: a ? V : void 0,
            saveDisabled: !$.success || !J,
            className: "cv:shrink-0"
          }
        ),
        $.success ? null : /* @__PURE__ */ v("p", { className: "cv:shrink-0 cv:text-xs cv:text-destructive", children: [
          $.error.issues.length,
          " validation issue",
          $.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-y-auto cv:pb-4", children: N ? null : /* @__PURE__ */ i(
          vh,
          {
            spec: g,
            selectedId: k,
            onSelect: Z,
            onEdit: ee,
            onDuplicate: H,
            onDelete: E,
            onLayoutChange: B
          }
        ) }),
        N ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": we,
            className: "cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background",
            children: [
              /* @__PURE__ */ v("header", { className: "cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5", children: [
                /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                  /* @__PURE__ */ v(Y, { variant: "ghost", size: "sm", onClick: fe, children: [
                    /* @__PURE__ */ i(Or, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: we })
                ] }),
                ae ? /* @__PURE__ */ v(
                  Y,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => E(ae.id),
                    children: [
                      /* @__PURE__ */ i(Lt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: N.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(Kh, { variables: g.variables, onChange: me }) }) : (ae == null ? void 0 : ae.type) === "chart" ? /* @__PURE__ */ i(
                io,
                {
                  fill: !0,
                  widget: ae,
                  variables: g.variables,
                  onChange: W,
                  onVariablesChange: me
                }
              ) : ae ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                io,
                {
                  widget: ae,
                  variables: g.variables,
                  onChange: W,
                  onVariablesChange: me
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Yh(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Qh(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Jh(e, t, n) {
  const r = new Map(t.widgets.map((u) => [u.id, u])), a = new Set(e.widgets.map((u) => u.id)), o = e.widgets.map(
    (u) => n.has(u.id) && r.has(u.id) ? r.get(u.id) : u
  );
  for (const u of t.widgets)
    !a.has(u.id) && n.has(u.id) && o.push(u);
  const c = new Map(t.layout.map((u) => [u.i, u])), s = new Set(e.layout.map((u) => u.i)), l = e.layout.map(
    (u) => n.has(u.i) && c.has(u.i) ? c.get(u.i) : u
  );
  for (const u of t.layout)
    !s.has(u.i) && n.has(u.i) && l.push(u);
  return { ...e, widgets: o, layout: l };
}
export {
  Us as AreaChartFamily,
  Os as AreaFamilyOptionsSchema,
  Qc as AxesOptionsSchema,
  Yn as AxisOptionsSchema,
  hp as BUILTIN_CHART_FAMILIES,
  Xe as BUILTIN_DEFAULTS,
  Je as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Ws as BarChartFamily,
  As as BarFamilyOptionsSchema,
  $i as CANONICAL_BREAKPOINT,
  it as ChartColorTokenSchema,
  Yf as ChartEditOverlay,
  Xf as ChartEditor,
  Wc as ChartFamilySchema,
  Fo as ChartOptionsSchema,
  ql as ChartRenderer,
  Po as ChartSpecSchema,
  Sp as ChartView,
  ts as ChartWidgetSchema,
  Jc as ColorAssignmentSchema,
  wl as ComboChartFamily,
  Ps as ComboFamilyOptionsSchema,
  $s as ComboSeriesOptSchema,
  Fs as CondFormatRuleSchema,
  Ur as CubeChart,
  rd as CubeChartSpec,
  zo as CubeQuerySchema,
  qn as CubeVizContext,
  kp as CubeVizProvider,
  ke as DEFAULT_COLOR_RAMP,
  Pi as DEFAULT_COLS,
  br as DEFAULT_UNIT_CONVERSIONS,
  Nn as DRAG_HANDLE_CLASS,
  Np as Dashboard,
  _p as DashboardEditor,
  Wr as DashboardProvider,
  mr as DashboardSpecSchema,
  lr as DateRangeSchema,
  Is as EMPTY_FAMILY_DEFAULT,
  Ra as EM_DASH,
  vh as EditorCanvas,
  Zf as EditorToolbar,
  Hr as FamilyRegistryOverride,
  yf as FilterBuilder,
  Vc as FilterOperatorSchema,
  Bc as FormatKindSchema,
  Tn as FormatOptionsSchema,
  hs as GRANULARITY_PATTERN,
  ht as GranularitySchema,
  is as GridConfigSchema,
  Zc as InputControlKindSchema,
  es as InputControlSchema,
  kh as InputWidgetEditor,
  rs as InputWidgetSchema,
  Sd as InputWidgetView,
  el as KpiFamily,
  Ts as KpiFamilyOptionsSchema,
  os as LayoutItemSchema,
  qc as LeafFilterSchema,
  Gc as LegendOptionsSchema,
  Bs as LineChartFamily,
  Ms as LineFamilyOptionsSchema,
  se as MemberSchema,
  Na as OrderDirSchema,
  Hc as OrderSpecSchema,
  Gs as PieChartFamily,
  Ls as PieFamilyOptionsSchema,
  ur as QueryFilterSchema,
  nn as ReferenceLineOptSchema,
  kr as RenderWidget,
  kt as SCHEMA_VERSION,
  jc as ScalarSchema,
  Qs as ScatterChartFamily,
  Ds as ScatterFamilyOptionsSchema,
  Uc as SeriesMappingSchema,
  Sa as SeriesMetaSchema,
  Io as SpecSchema,
  zs as TableColumnOptSchema,
  dl as TableFamily,
  Es as TableFamilyOptionsSchema,
  hh as TextWidgetEditor,
  ns as TextWidgetSchema,
  od as TextWidgetView,
  Kc as TimeDimensionSchema,
  Xc as TipTapDocSchema,
  Yc as TooltipOptionsSchema,
  kn as VarRefSchema,
  cs as VariableDeclSchema,
  Eo as VariableTypeSchema,
  To as VariableValueSchema,
  Kh as VariablesPanel,
  ui as WidgetChrome,
  io as WidgetEditPanel,
  as as WidgetSpecSchema,
  Ii as appendWidget,
  zl as areaChartFamily,
  Da as assignColors,
  jm as axisKey,
  Dl as barChartFamily,
  Kr as buildFamilyRegistry,
  wp as builtinCharts,
  Qe as builtinFamilyDescriptors,
  Pn as builtinFamilyRegistry,
  Il as comboChartFamily,
  us as createCubeClient,
  Eh as createIdFactory,
  ou as createQueryResolver,
  ti as createUnitsFormatter,
  iu as createVariableStore,
  bs as datePattern,
  dr as deepMerge,
  qr as defaultChartFamilies,
  qh as defaultForType,
  Er as defaultFormatter,
  ms as fetchMeta,
  yp as formatCategory,
  Bt as formatDateValue,
  Rt as isEmptyValue,
  Te as isVarRef,
  $l as kpiChartFamily,
  Tl as lineChartFamily,
  ls as loadSpec,
  jo as looksLikeIsoDate,
  qo as makeChartFormat,
  bp as makeDateFormatter,
  xp as makeFormatter,
  th as mergeLayout,
  Vn as mergeUnitConversions,
  $h as newChartWidget,
  Ih as newInputWidget,
  Ph as newTextWidget,
  Vh as newVariable,
  jh as newWidget,
  Yl as normalize,
  eh as pickCanonicalLayout,
  Fl as pieChartFamily,
  rh as placeNewItem,
  qm as quantityLabel,
  oh as removeWidget,
  ih as replaceWidget,
  Bm as resolveChart,
  Vl as resolveOptions,
  js as resolveOptionsWith,
  Zo as resolveQuery,
  pr as resolveSeriesColors,
  tu as resolveValue,
  pp as safeLoadSpec,
  El as scatterChartFamily,
  Pl as tableChartFamily,
  gs as toDate,
  Hl as toResultAnnotation,
  Qf as useChartEditorState,
  ri as useContainerWidth,
  ut as useCubeMeta,
  Gm as useCubeQuery,
  He as useCubeVizContext,
  ni as useDashboard,
  Ei as useDebouncedCallback,
  lt as useFamilyRegistry,
  Cp as useFormatter,
  tr as useNormalizedSeries,
  Br as useOptionalDashboard,
  gp as validateSpec
};
//# sourceMappingURL=index.js.map
