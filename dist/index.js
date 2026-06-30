var Ii = Object.defineProperty;
var ji = (e, t, n) => t in e ? Ii(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ma = (e, t, n) => ji(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as i, jsxs as v, Fragment as ie } from "react/jsx-runtime";
import * as kr from "recharts";
import { BarChart as Vi, CartesianGrid as Xt, YAxis as We, XAxis as Nt, Bar as oo, LabelList as io, ReferenceLine as rt, LineChart as qi, Line as co, AreaChart as so, Area as Cr, PieChart as Ki, Pie as Hi, Cell as lo, Label as Bi, ScatterChart as Wi, ZAxis as Ui, Scatter as Gi, RadialBarChart as Yi, PolarAngleAxis as Qi, RadialBar as Ji, ResponsiveContainer as Xi, ComposedChart as Zi } from "recharts";
import * as w from "react";
import { useId as uo, useMemo as ae, createContext as mo, useContext as Nr, useState as St, useCallback as tt, useEffect as Zt, useRef as mt, createElement as ec, useSyncExternalStore as vo, Component as tc } from "react";
import { clsx as nc } from "clsx";
import { extendTailwindMerge as rc } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as fo, ArrowUp as Rn, ArrowDown as An, CalendarRange as ho, ChevronsUpDown as ac, AreaChart as oc, BarChart3 as po, BarChart4 as ic, Table as cc, Gauge as sc, ScatterChart as lc, PieChart as uc, LineChart as dc, AlertCircle as Sr, ChevronLeft as _r, ChevronRight as en, ChevronDown as ot, Check as je, ChevronUp as mc, CalendarIcon as go, MoreVertical as vc, RefreshCw as fc, Image as hc, Sheet as pc, Type as Rr, Hash as bo, Calendar as yo, Search as gc, Table2 as xo, Database as wo, Layers as Ar, Variable as bc, Plus as _t, Trash2 as Lt, ListFilter as yc, Box as ko, EyeOff as Co, Eye as No, X as va, Save as So, SlidersHorizontal as xc, Braces as wc, Undo2 as kc, Redo2 as Cc, RotateCcw as Nc, Pencil as Sc, Copy as _c, Bold as Rc, Italic as Ac, Strikethrough as Mc, Heading1 as Oc, Heading2 as Lc, List as Dc, ListOrdered as zc, Quote as Tc } from "lucide-react";
import * as gn from "@radix-ui/react-popover";
import { cva as Mr } from "class-variance-authority";
import * as Ce from "@radix-ui/react-select";
import Fc from "@cubejs-client/core";
import { format as be, isValid as Vt, parseISO as bn, differenceInCalendarDays as Ec, subDays as De, startOfMonth as on, subMonths as cn, startOfQuarter as sn, subQuarters as ln, startOfYear as un, subYears as dn, subWeeks as fa, startOfWeek as ha, endOfWeek as pa, endOfMonth as ga, endOfQuarter as ba, endOfYear as ya, parse as _o } from "date-fns";
import { DayPicker as $c, useDayPicker as Pc } from "react-day-picker";
import { ResponsiveGridLayout as Ro } from "react-grid-layout";
import { useEditor as Ao, EditorContent as Mo } from "@tiptap/react";
import Oo from "@tiptap/starter-kit";
const kt = 1, yn = m.object({ var: m.string().min(1) }).strict();
function ze(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const xn = (e) => m.union([e, yn]), Ic = m.union([m.string(), m.number(), m.boolean()]), ft = m.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), rr = m.union([m.tuple([m.string(), m.string()]), m.string()]), Lo = m.union([
  m.string(),
  m.number(),
  m.boolean(),
  m.tuple([m.string(), m.string()]),
  // absolute date range
  m.array(m.string()),
  m.array(m.number())
]), oe = m.string().min(1), jc = m.enum([
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
]), Vc = m.object({
  member: oe,
  operator: jc,
  values: m.array(m.union([Ic, yn])).optional()
}).strict(), ar = m.lazy(
  () => m.union([
    Vc,
    m.object({ and: m.array(ar) }).strict(),
    m.object({ or: m.array(ar) }).strict()
  ])
), qc = m.object({
  dimension: oe,
  granularity: xn(ft).optional(),
  dateRange: xn(rr).optional(),
  compareDateRange: m.array(rr).optional()
}).strict(), xa = m.enum(["asc", "desc"]), Kc = m.union([
  m.record(oe, xa),
  m.array(m.tuple([oe, xa]))
]), Do = m.object({
  measures: m.array(oe).optional(),
  dimensions: m.array(oe).optional(),
  timeDimensions: m.array(qc).optional(),
  filters: m.array(ar).optional(),
  segments: m.array(oe).optional(),
  order: Kc.optional(),
  limit: xn(m.number()).optional(),
  offset: xn(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), Hc = m.string().min(1), vp = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], at = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Bc = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Mn = m.object({
  kind: Bc.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional(),
  /** ISO 4217 currency code for `kind:"currency"` (e.g. "EUR"); defaults to USD. */
  currency: m.string().optional()
}).strict(), wa = m.object({
  label: m.string().optional(),
  colorToken: at.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: Mn.optional()
}).strict(), Wc = m.object({
  category: m.object({ member: oe }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(oe),
      meta: m.record(oe, wa).optional()
    }).strict(),
    m.object({
      mode: m.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: oe,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: m.array(oe).optional(),
      pivot: oe,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: m.record(oe, wa).optional()
    }).strict()
  ])
}).strict(), Uc = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Gc = m.object({
  show: m.boolean().optional(),
  indicator: m.enum(["dot", "line", "dashed"]).optional(),
  showTotal: m.boolean().optional()
}).strict(), ka = m.union([m.number(), m.literal("auto")]), Bn = m.object({
  label: m.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: m.boolean().optional(),
  hide: m.boolean().optional(),
  scale: m.enum(["linear", "log"]).optional(),
  domain: m.tuple([ka, ka]).optional(),
  tickFormat: Mn.optional()
}).strict(), Yc = m.object({
  x: Bn.optional(),
  y: Bn.optional(),
  y2: Bn.optional()
}).strict(), Qc = m.object({
  byKey: m.record(m.string(), at).optional(),
  ramp: m.array(at).optional()
}).strict(), zo = m.object({
  family: Hc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Wc.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Uc.optional(),
  tooltip: Gc.optional(),
  axes: Yc.optional(),
  colors: Qc.optional(),
  format: Mn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Jc = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), Xc = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Zc = m.object({
  variable: m.string().min(1),
  control: m.discriminatedUnion("kind", [
    m.object({
      kind: m.literal("dateRange"),
      presets: m.array(m.string()).optional(),
      allowFuture: m.boolean().optional()
    }).strict(),
    m.object({
      kind: m.literal("granularity"),
      options: m.array(ft).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: m.string().optional()
    }).strict(),
    m.object({
      kind: m.literal("select"),
      options: m.array(m.object({ value: Lo, label: m.string() }).strict()),
      multiple: m.boolean().optional()
    }).strict(),
    m.object({
      kind: m.literal("memberSelect"),
      from: m.enum(["dimension", "measure", "dimensionOrMeasure"]),
      cube: m.string().optional()
    }).strict(),
    m.object({ kind: m.literal("text"), placeholder: m.string().optional() }).strict(),
    m.object({
      kind: m.literal("number"),
      min: m.number().optional(),
      max: m.number().optional(),
      step: m.number().optional()
    }).strict(),
    m.object({ kind: m.literal("toggle") }).strict()
  ])
}).strict(), Or = {
  id: m.string().min(1),
  title: m.string().optional()
}, es = m.object({ ...Or, type: m.literal("chart"), query: Do, chart: zo }).strict(), ts = m.object({ ...Or, type: m.literal("text"), doc: Jc }).strict(), ns = m.object({ ...Or, type: m.literal("input"), control: Zc }).strict(), rs = m.discriminatedUnion("type", [
  es,
  ts,
  ns
]), as = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), os = m.object({
  cols: m.number().optional(),
  rowHeight: m.number().optional(),
  margin: m.tuple([m.number(), m.number()]).optional(),
  containerPadding: m.tuple([m.number(), m.number()]).optional()
}).strict(), To = m.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), is = m.object({
  name: m.string().min(1),
  type: To,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: Lo.optional()
}).strict(), Fo = {
  schemaVersion: m.literal(kt),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, Eo = m.object({ ...Fo, kind: m.literal("chart"), query: Do, chart: zo }).strict(), or = m.object({
  ...Fo,
  kind: m.literal("dashboard"),
  variables: m.array(is),
  widgets: m.array(rs),
  layout: m.array(as),
  grid: os.optional()
}).strict(), $o = m.discriminatedUnion("kind", [Eo, or]), cs = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function ss(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > kt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${kt} — update the library`
    );
  for (; n < kt; ) {
    const r = cs[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return $o.parse(t);
}
function fp(e) {
  try {
    return { ok: !0, spec: ss(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function hp(e) {
  return $o.parse(e);
}
function ls(e) {
  return Fc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function us(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ds = rc({ prefix: "cv" });
function S(...e) {
  return ds(nc(e));
}
function Lr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function ms({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const vs = Mr(
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
), On = w.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: S(vs({ variant: t }), e),
    ...n
  }
));
On.displayName = "Alert";
const Ln = w.forwardRef(
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
Ln.displayName = "AlertTitle";
const Dn = w.forwardRef(
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
Dn.displayName = "AlertDescription";
const fs = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, hs = "MMM d, yyyy";
function ps(e) {
  if (e instanceof Date) return Vt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return Vt(r) ? r : null;
  }
  const t = bn(e);
  if (Vt(t)) return t;
  const n = new Date(e);
  return Vt(n) ? n : null;
}
function Po(e) {
  return /^\d{4}-\d{2}/.test(e) ? Vt(bn(e)) : !1;
}
function gs(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? fs[t] : hs;
}
function Bt(e, t, n) {
  const r = ps(e);
  return r ? be(r, gs(t, n)) : String(e);
}
function pp(e, t) {
  return (n) => n == null ? "" : Bt(n, e, t);
}
function gp(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Bt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Bt(e, t.format, t.granularity) : String(e) : Po(e) ? Bt(e, t.format, t.granularity) : e;
}
const Ca = "—", bs = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Na(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ys(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of bs)
    if (n >= r) return Na((e / r).toFixed(t)) + a;
  return Na(e.toFixed(t));
}
function xs(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function ws(e, t) {
  const { format: n, meta: r, locale: a } = t, o = n != null && n.abbreviate ? ys(e, n.decimals ?? 1) : xs(e, n, a), c = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${c ? ` ${c}` : ""}`;
}
function Io(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ks(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Io(e.value) ? !0 : typeof e.value == "string" ? Po(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Dr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && !Number.isFinite(t) ? Ca : (Io(t) || typeof t == "string" || typeof t == "number") && ks(e) ? Bt(t, n, r) : typeof t == "number" ? ws(t, e) : String(t);
};
function Cs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function bp(e, t) {
  return (n, r) => {
    const a = r ? Cs(r, t) : void 0;
    return Dr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Ns(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Ss(e) {
  const t = ft.safeParse(e);
  return t.success ? t.data : void 0;
}
function _s(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const o = Ss(a.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function jo(e, t, n, r) {
  const a = _s(e, t);
  return {
    value(o, c, s = "value") {
      const l = c ? Ns(c, e) : void 0, u = l == null ? void 0 : l.meta;
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
const tn = m.object({
  axis: m.enum(["x", "y"]),
  value: m.number(),
  side: m.enum(["left", "right"]).optional(),
  // combo dual-axis: which y-scale
  label: m.string().optional(),
  colorToken: at.optional()
}).strict(), zr = m.boolean().optional(), Rs = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(tn).optional(),
  comparePrevious: zr
}).strict(), Tr = m.enum(["linear", "monotone", "step", "natural"]), As = m.object({
  curve: Tr.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(tn).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: zr
}).strict(), Ms = m.object({
  curve: Tr.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(tn).optional(),
  comparePrevious: zr
}).strict(), Os = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), Ls = m.object({
  x: oe,
  y: oe,
  size: oe.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: oe.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(tn).optional()
}).strict(), Ds = m.object({
  display: m.enum(["number", "gauge"]).optional(),
  measure: oe,
  comparison: m.object({
    mode: m.enum(["previousPeriod", "value"]),
    value: m.union([oe, m.number()]).optional(),
    showAsPercent: m.boolean().optional(),
    goodDirection: m.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: m.object({
    member: oe.optional(),
    timeDimension: oe.optional(),
    granularity: m.union([ft, yn]).optional(),
    dateRange: m.union([rr, yn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: m.enum(["up", "down"]).optional(),
  gauge: m.object({
    min: m.number().optional(),
    max: m.number(),
    thresholds: m.array(m.object({ at: m.number(), colorToken: at }).strict()).optional()
  }).strict().optional(),
  icon: m.string().optional()
}).strict(), zs = m.object({
  member: oe,
  label: m.string().optional(),
  format: Mn.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), Ts = m.object({
  member: oe,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: at.optional()
}).strict(), Fs = m.object({
  columns: m.array(zs).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(Ts).optional()
}).strict(), Es = m.object({
  member: oe,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: at.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), $s = m.object({
  series: m.array(Es),
  referenceLines: m.array(tn).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: Tr.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), Qe = {
  bar: Rs,
  line: As,
  area: Ms,
  pie: Os,
  scatter: Ls,
  kpi: Ds,
  table: Fs,
  combo: $s
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
function Sa(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ir(e, t) {
  if (t === void 0) return e;
  if (!Sa(e) || !Sa(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? ir(e[r], a) : a);
  }
  return n;
}
const Ps = { envelope: {}, familyOptions: {} };
function Is(e, t) {
  return {
    ...ir({ ...t.envelope }, e),
    familyOptions: ir(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const js = { light: "", dark: ".dark" }, Vo = w.createContext(null);
function qo() {
  const e = w.useContext(Vo);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const it = w.forwardRef(({ id: e, className: t, children: n, config: r, ...a }, o) => {
  const c = w.useId(), s = `chart-${e || c.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Vo.Provider, { value: { config: r }, children: /* @__PURE__ */ v(
    "div",
    {
      "data-chart": s,
      ref: o,
      className: S(
        "cv:flex cv:h-full cv:w-full cv:justify-center cv:text-xs cv:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground cv:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 cv:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border cv:[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border cv:[&_.recharts-radial-bar-background-sector]:fill-muted cv:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted cv:[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border cv:[&_.recharts-sector]:outline-none cv:[&_.recharts-sector[stroke='#fff']]:stroke-transparent cv:[&_.recharts-surface]:outline-none",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ i(Vs, { id: s, config: r }),
        /* @__PURE__ */ i(kr.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
it.displayName = "ChartContainer";
const Vs = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, r]) => r.theme || r.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(js).map(
          ([r, a]) => `
${a} [data-chart=${e}] {
${n.map(([o, c]) => {
            var l;
            const s = ((l = c.theme) == null ? void 0 : l[r]) || c.color;
            return s ? `  ${Lr(o)}: ${s};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, Dt = kr.Tooltip, gt = w.forwardRef(
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
    valueFormatter: d,
    color: f,
    nameKey: h,
    labelKey: y
  }, p) => {
    const { config: g } = qo(), b = w.useMemo(() => {
      var M;
      if (a || !(t != null && t.length))
        return null;
      const [x] = t, _ = `${y || (x == null ? void 0 : x.dataKey) || (x == null ? void 0 : x.name) || "value"}`, C = cr(g, x, _), N = !y && typeof c == "string" ? ((M = g[c]) == null ? void 0 : M.label) || c : C == null ? void 0 : C.label;
      return s ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: s(N, t) }) : N ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: N }) : null;
    }, [c, s, t, a, l, g, y]);
    if (!e || !(t != null && t.length))
      return null;
    const k = t.length === 1 && r !== "dot";
    return /* @__PURE__ */ v(
      "div",
      {
        ref: p,
        className: S(
          "cv:grid cv:min-w-32 cv:items-start cv:gap-1.5 cv:rounded-lg cv:border cv:border-border/40 cv:bg-background cv:px-3 cv:py-2 cv:text-xs cv:shadow-lg",
          n
        ),
        children: [
          k ? null : b,
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((x, _) => {
            var E;
            const C = `${h || x.name || x.dataKey || "value"}`, N = cr(g, x, C), M = f || ((E = x.payload) == null ? void 0 : E.fill) || x.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  r === "dot" && "cv:items-center"
                ),
                children: u && (x == null ? void 0 : x.value) !== void 0 && x.name ? u(x.value, x.name, x, _, x.payload) : /* @__PURE__ */ v(ie, { children: [
                  N != null && N.icon ? /* @__PURE__ */ i(N.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: S(
                        "cv:shrink-0 cv:rounded-[2px] cv:border-[--color-border] cv:bg-[--color-bg]",
                        {
                          "cv:h-2.5 cv:w-2.5": r === "dot",
                          "cv:w-1": r === "line",
                          "cv:w-0 cv:border-[1.5px] cv:border-dashed cv:bg-transparent": r === "dashed",
                          "cv:my-0.5": k && r === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": M,
                        "--color-border": M
                      }
                    }
                  ),
                  /* @__PURE__ */ v(
                    "div",
                    {
                      className: S(
                        "cv:flex cv:flex-1 cv:justify-between cv:gap-4 cv:leading-none",
                        k ? "cv:items-end" : "cv:items-center"
                      ),
                      children: [
                        /* @__PURE__ */ v("div", { className: "cv:grid cv:gap-1.5", children: [
                          k ? b : null,
                          /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: (N == null ? void 0 : N.label) || x.name })
                        ] }),
                        x.value !== void 0 && /* @__PURE__ */ i("span", { className: "cv:font-mono cv:font-medium cv:tabular-nums cv:text-foreground", children: d ? d(x.value, x) : typeof x.value == "number" ? x.value.toLocaleString() : String(x.value) })
                      ]
                    }
                  )
                ] })
              },
              x.dataKey ? String(x.dataKey) : _
            );
          }) })
        ]
      }
    );
  }
);
gt.displayName = "ChartTooltipContent";
const zt = kr.Legend, bt = w.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: r = "bottom", nameKey: a }, o) => {
    const { config: c } = qo();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: S(
          "cv:flex cv:items-center cv:justify-center cv:gap-4",
          r === "top" ? "cv:pb-3" : "cv:pt-3",
          e
        ),
        children: n.map((s) => {
          const l = `${a || s.dataKey || "value"}`, u = cr(c, s, l);
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
bt.displayName = "ChartLegendContent";
function cr(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let a = n;
  return n in t && typeof t[n] == "string" ? a = t[n] : r && n in r && typeof r[n] == "string" && (a = r[n]), a in e ? e[a] : e[n];
}
function Fr(e) {
  return e.categories.map((t, n) => {
    const r = { __cat: typeof t == "number" ? t : String(t) };
    for (const a of e.series) r[a.key] = a.data[n] ?? null;
    return r;
  });
}
function Tt(e) {
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
function qs(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Wt(e) {
  return `var(${Lr(e.key)})`;
}
function Ks(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Ko(e) {
  return e === "stacked" || e === "percent";
}
function zn(e, t) {
  var s, l, u, d, f, h, y, p, g, b, k, x, _, C;
  const n = e.raw.annotation, r = (N) => {
    var M, E, q, D, O, T;
    if (N)
      return ((M = n == null ? void 0 : n.measures[N]) == null ? void 0 : M.shortTitle) ?? ((E = n == null ? void 0 : n.dimensions[N]) == null ? void 0 : E.shortTitle) ?? ((q = n == null ? void 0 : n.timeDimensions[N]) == null ? void 0 : q.shortTitle) ?? ((D = n == null ? void 0 : n.measures[N]) == null ? void 0 : D.title) ?? ((O = n == null ? void 0 : n.dimensions[N]) == null ? void 0 : O.title) ?? ((T = n == null ? void 0 : n.timeDimensions[N]) == null ? void 0 : T.title) ?? N;
  }, a = e.series.find((N) => {
    var M;
    return (((M = N.meta) == null ? void 0 : M.axis) ?? "left") !== "right";
  }), o = e.series.find((N) => {
    var M;
    return ((M = N.meta) == null ? void 0 : M.axis) === "right";
  }), c = (N) => {
    var M;
    return N ? (M = N.meta) != null && M.measure ? r(N.meta.measure) : N.label : void 0;
  };
  return {
    x: (l = (s = t.axes) == null ? void 0 : s.x) != null && l.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? r((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (p = (y = t.axes) == null ? void 0 : y.y) != null && p.labelHide ? void 0 : ((b = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : b.label) ?? c(a),
    right: (x = (k = t.axes) == null ? void 0 : k.y2) != null && x.labelHide ? void 0 : ((C = (_ = t.axes) == null ? void 0 : _.y2) == null ? void 0 : C.label) ?? c(o)
  };
}
function et(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Er(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function nn(e, t, n) {
  return (r, a) => {
    const o = a == null ? void 0 : a.dataKey, c = typeof o == "string" || typeof o == "number" ? String(o) : void 0, s = (c ? n == null ? void 0 : n.get(c) : void 0) ?? t ?? c;
    return e.value(r, s, "tooltip");
  };
}
function $r(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function sr(e) {
  return (t, n) => {
    const r = typeof t == "number" ? t : Number(t), a = n == null ? void 0 : n.payload;
    let o = 0;
    if (a)
      for (const [c, s] of Object.entries(a)) {
        if (c === "__cat") continue;
        const l = typeof s == "number" ? s : Number(s);
        Number.isFinite(l) && (o += l);
      }
    return !Number.isFinite(r) || !Number.isFinite(o) || o === 0 ? "" : $r(r / o, e);
  };
}
function Hs({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var O, T, z, R, L, X, Z, ee, $, G, B, K, ce, ue, H, P;
  const o = t.familyOptions ?? {}, c = t.orientation === "horizontal", s = Ko(t.stackMode), l = t.stackMode === "percent", u = Fr(e), d = (V, J, ne = "value") => l ? $r(V) : r.value(V, J, ne), f = (V) => {
    if (l) {
      const J = sr();
      return ((ne, he) => J(typeof ne == "boolean" ? Number(ne) : ne, he));
    }
    return ((J) => d(typeof J == "boolean" ? Number(J) : J, et(V), "label"));
  }, h = (V) => r.category(V), y = Er(e), p = et(e.series[0]), g = c ? (T = (O = t.axes) == null ? void 0 : O.y) == null ? void 0 : T.hide : (R = (z = t.axes) == null ? void 0 : z.x) == null ? void 0 : R.hide, b = c ? (L = t.axes) == null ? void 0 : L.x : (X = t.axes) == null ? void 0 : X.y, k = !c && e.series.some((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) === "right";
  }), x = et(e.series.find((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) !== "right";
  })) ?? p, _ = et(e.series.find((V) => {
    var J;
    return ((J = V.meta) == null ? void 0 : J.axis) === "right";
  })), C = zn(e, t), N = C.x ? { value: C.x, position: "insideBottom", offset: -2 } : void 0, M = C.x ? { value: C.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, E = C.left ? { value: C.left, position: "insideBottom", offset: -2 } : void 0, q = C.left ? { value: C.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, D = C.right ? { value: C.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(it, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    Vi,
    {
      accessibilityLayer: !0,
      data: u,
      layout: c ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Xt, { vertical: c, horizontal: !c }),
        c ? /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            We,
            {
              type: "category",
              dataKey: "__cat",
              hide: g,
              tickFormatter: h,
              label: M
            }
          ),
          /* @__PURE__ */ i(
            Nt,
            {
              type: "number",
              hide: b == null ? void 0 : b.hide,
              scale: qe(b),
              domain: Ve(b),
              tickFormatter: (V) => d(V, p, "axis"),
              label: E
            }
          )
        ] }) : /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            Nt,
            {
              type: "category",
              dataKey: "__cat",
              hide: g,
              tickFormatter: h,
              label: N
            }
          ),
          /* @__PURE__ */ i(
            We,
            {
              yAxisId: "left",
              type: "number",
              hide: b == null ? void 0 : b.hide,
              scale: qe(b),
              domain: Ve(b),
              tickFormatter: (V) => d(V, x, "axis"),
              label: q
            }
          ),
          k && /* @__PURE__ */ i(
            We,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (ee = (Z = t.axes) == null ? void 0 : Z.y2) == null ? void 0 : ee.hide,
              scale: qe(($ = t.axes) == null ? void 0 : $.y2),
              domain: Ve((G = t.axes) == null ? void 0 : G.y2),
              tickFormatter: (V) => d(V, _, "axis"),
              label: D
            }
          )
        ] }),
        ((B = t.tooltip) == null ? void 0 : B.show) !== !1 && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(
              gt,
              {
                labelFormatter: (V) => r.category(V),
                indicator: ((K = t.tooltip) == null ? void 0 : K.indicator) ?? "dot",
                valueFormatter: l ? sr() : nn(r, void 0, y)
              }
            )
          }
        ),
        Re(t).show && /* @__PURE__ */ i(
          zt,
          {
            content: /* @__PURE__ */ i(bt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Tt((ce = t.legend) == null ? void 0 : ce.position),
            layout: Ft((ue = t.legend) == null ? void 0 : ue.position),
            align: Et((H = t.legend) == null ? void 0 : H.position)
          }
        ),
        e.series.map((V) => {
          var J, ne, he, ye;
          return /* @__PURE__ */ i(
            oo,
            {
              yAxisId: c ? void 0 : ((J = V.meta) == null ? void 0 : J.axis) === "right" && k ? "right" : "left",
              dataKey: V.key,
              name: V.label,
              stackId: s ? (ne = V.meta) != null && ne.companion ? "__prev" : ((he = V.meta) == null ? void 0 : he.stackId) ?? "stack" : void 0,
              fill: Wt(V),
              fillOpacity: (ye = V.meta) != null && ye.companion ? 0.4 : void 0,
              radius: qs(o.barRadius, c),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                io,
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
        (P = o.referenceLines) == null ? void 0 : P.map((V, J) => {
          var Pe;
          const ne = V.axis === "y" !== c, he = c ? void 0 : "left";
          if (ne) {
            const Y = c ? { x: V.value } : { y: V.value };
            return /* @__PURE__ */ i(
              rt,
              {
                yAxisId: he,
                ...Y,
                label: V.label,
                stroke: `var(--${V.colorToken ?? "muted-foreground"})`,
                strokeDasharray: "4 4"
              },
              J
            );
          }
          const ye = (Pe = u[V.value]) == null ? void 0 : Pe.__cat;
          return ye == null ? null : /* @__PURE__ */ i(
            rt,
            {
              yAxisId: he,
              ...c ? { y: ye } : { x: ye },
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
  var x, _, C, N, M, E, q, D, O, T, z, R, L, X, Z, ee;
  const o = t.familyOptions ?? {}, c = o.chrome === "none", s = Fr(e), l = ($) => r.category($), u = e.series.some(($) => {
    var G;
    return ((G = $.meta) == null ? void 0 : G.axis) === "right";
  }), d = o.curve ?? "monotone", f = Er(e), h = et(e.series.find(($) => {
    var G;
    return ((G = $.meta) == null ? void 0 : G.axis) !== "right";
  })), y = et(e.series.find(($) => {
    var G;
    return ((G = $.meta) == null ? void 0 : G.axis) === "right";
  })), p = zn(e, t), g = s.length <= 1, b = !c && (o.dots === !0 || g), k = !c;
  return /* @__PURE__ */ i(
    it,
    {
      config: n,
      className: c ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(qi, { accessibilityLayer: !0, data: s, margin: c ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !c && /* @__PURE__ */ i(Xt, { vertical: !1 }),
        /* @__PURE__ */ i(
          Nt,
          {
            type: "category",
            dataKey: "__cat",
            hide: c || ((_ = (x = t.axes) == null ? void 0 : x.x) == null ? void 0 : _.hide),
            tickFormatter: l,
            label: !c && p.x ? { value: p.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          We,
          {
            yAxisId: "left",
            type: "number",
            hide: c || ((N = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : N.hide),
            scale: qe((M = t.axes) == null ? void 0 : M.y),
            domain: Ve((E = t.axes) == null ? void 0 : E.y),
            tickFormatter: ($) => r.value($, h, "axis"),
            label: !c && p.left ? { value: p.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          We,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: c || ((D = (q = t.axes) == null ? void 0 : q.y2) == null ? void 0 : D.hide),
            scale: qe((O = t.axes) == null ? void 0 : O.y2),
            domain: Ve((T = t.axes) == null ? void 0 : T.y2),
            tickFormatter: ($) => r.value($, y, "axis"),
            label: !c && p.right ? { value: p.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !c && ((z = t.tooltip) == null ? void 0 : z.show) !== !1 && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(
              gt,
              {
                labelFormatter: ($) => r.category($),
                indicator: ((R = t.tooltip) == null ? void 0 : R.indicator) ?? "line",
                valueFormatter: nn(r, void 0, f)
              }
            )
          }
        ),
        !c && Re(t).show && /* @__PURE__ */ i(
          zt,
          {
            content: /* @__PURE__ */ i(bt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Tt((L = t.legend) == null ? void 0 : L.position),
            layout: Ft((X = t.legend) == null ? void 0 : X.position),
            align: Et((Z = t.legend) == null ? void 0 : Z.position)
          }
        ),
        e.series.map(($) => {
          var G, B, K, ce, ue, H;
          return /* @__PURE__ */ i(
            co,
            {
              yAxisId: u && ((G = $.meta) == null ? void 0 : G.axis) === "right" ? "right" : "left",
              type: ((B = $.meta) == null ? void 0 : B.curve) ?? d,
              dataKey: $.key,
              name: $.label,
              stroke: Wt($),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (K = $.meta) != null && K.companion ? "5 4" : void 0,
              strokeOpacity: (ce = $.meta) != null && ce.companion ? 0.55 : void 0,
              dot: c || (ue = $.meta) != null && ue.companion ? !1 : ((H = $.meta) == null ? void 0 : H.dots) ?? b,
              activeDot: k,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !c,
              children: !c && o.showValueLabels && /* @__PURE__ */ i(
                io,
                {
                  dataKey: $.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (P) => r.value(typeof P == "boolean" ? Number(P) : P, et($), "label")
                }
              )
            },
            $.key
          );
        }),
        !c && ((ee = o.referenceLines) == null ? void 0 : ee.map(($, G) => {
          var B;
          if ($.axis === "x") {
            const K = (B = s[$.value]) == null ? void 0 : B.__cat;
            return K == null ? null : /* @__PURE__ */ i(
              rt,
              {
                yAxisId: "left",
                x: K,
                label: $.label,
                stroke: `var(--${$.colorToken ?? "muted-foreground"})`,
                strokeDasharray: "4 4"
              },
              G
            );
          }
          return /* @__PURE__ */ i(
            rt,
            {
              yAxisId: "left",
              y: $.value,
              label: $.label,
              stroke: `var(--${$.colorToken ?? "muted-foreground"})`,
              strokeDasharray: "4 4"
            },
            G
          );
        }))
      ] })
    }
  );
}
function Ws({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var b, k, x, _, C, N, M, E, q, D, O, T, z, R;
  const o = t.familyOptions ?? {}, c = ((k = (b = t.mapping) == null ? void 0 : b.series) == null ? void 0 : k.mode) === "pivot", s = t.stackMode ?? (c ? "stacked" : "none"), l = Ko(s), u = s === "percent", d = Fr(e), f = (L) => r.category(L), h = o.curve ?? "monotone", y = Er(e), p = et(e.series[0]), g = zn(e, t);
  return /* @__PURE__ */ i(it, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(so, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Xt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((L) => /* @__PURE__ */ v("linearGradient", { id: `fill-${L.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Wt(L), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Wt(L), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, L.key)) }),
    /* @__PURE__ */ i(
      Nt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (_ = (x = t.axes) == null ? void 0 : x.x) == null ? void 0 : _.hide,
        tickFormatter: f,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      We,
      {
        type: "number",
        hide: (N = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : N.hide,
        scale: qe((M = t.axes) == null ? void 0 : M.y),
        domain: Ve((E = t.axes) == null ? void 0 : E.y),
        tickFormatter: (L) => u ? $r(L) : r.value(L, p, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((q = t.tooltip) == null ? void 0 : q.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          gt,
          {
            labelFormatter: (L) => r.category(L),
            indicator: ((D = t.tooltip) == null ? void 0 : D.indicator) ?? "dot",
            valueFormatter: u ? sr() : nn(r, void 0, y)
          }
        )
      }
    ),
    Re(t).show && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(bt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Tt((O = t.legend) == null ? void 0 : O.position),
        layout: Ft((T = t.legend) == null ? void 0 : T.position),
        align: Et((z = t.legend) == null ? void 0 : z.position)
      }
    ),
    e.series.map((L) => {
      var X, Z, ee, $, G, B, K, ce, ue;
      return u && ((X = L.meta) != null && X.companion) ? null : /* @__PURE__ */ i(
        Cr,
        {
          type: ((Z = L.meta) == null ? void 0 : Z.curve) ?? h,
          dataKey: L.key,
          name: L.label,
          stackId: l && !((ee = L.meta) != null && ee.companion) ? (($ = L.meta) == null ? void 0 : $.stackId) ?? "stack" : void 0,
          stroke: Wt(L),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (G = L.meta) != null && G.companion ? "5 4" : void 0,
          strokeOpacity: (B = L.meta) != null && B.companion ? 0.55 : void 0,
          fill: (K = L.meta) != null && K.companion ? "none" : `url(#fill-${L.key})`,
          fillOpacity: 1,
          dot: (ce = L.meta) != null && ce.companion ? !1 : ((ue = L.meta) == null ? void 0 : ue.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        L.key
      );
    }),
    (R = o.referenceLines) == null ? void 0 : R.map((L, X) => {
      var Z;
      if (L.axis === "x") {
        const ee = (Z = d[L.value]) == null ? void 0 : Z.__cat;
        return ee == null ? null : /* @__PURE__ */ i(
          rt,
          {
            x: ee,
            label: L.label,
            stroke: `var(--${L.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          X
        );
      }
      return /* @__PURE__ */ i(
        rt,
        {
          y: L.value,
          label: L.label,
          stroke: `var(--${L.colorToken ?? "muted-foreground"})`,
          strokeDasharray: "4 4"
        },
        X
      );
    })
  ] }) });
}
function Us({ data: e, options: t, format: n, editing: r }) {
  var g, b, k, x, _;
  const a = t.familyOptions ?? {}, o = e.series[0], c = e.categories.map((C, N) => {
    const M = n.category(C);
    return {
      key: `slice-${N}`,
      label: M,
      value: (o == null ? void 0 : o.data[N]) ?? 0,
      fill: `var(--${ke[N % ke.length]})`
    };
  }), s = Gs(c, a.maxSlices), l = s.reduce((C, N) => C + N.value, 0);
  if (s.some((C) => C.value < 0))
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "Pie charts can't show negative values" });
  if (s.length === 0 || l <= 0)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const u = {};
  s.forEach((C, N) => {
    u[C.key] = {
      label: C.label,
      color: `var(--${ke[N % ke.length]})`
    };
  });
  const d = `${a.innerRadiusPct ?? 0}%`, f = `${a.outerRadiusPct ?? 80}%`, h = (a.innerRadiusPct ?? 0) > 0, y = a.showLabels ?? "percent", p = y === "none" ? !1 : ({ payload: C, percent: N }) => {
    const M = C;
    return y === "name" ? (M == null ? void 0 : M.label) ?? "" : y === "value" ? n.value(M == null ? void 0 : M.value, o == null ? void 0 : o.key, "label") : `${((N !== void 0 ? N : M && l > 0 ? M.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(it, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(Ki, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          gt,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((b = t.tooltip) == null ? void 0 : b.indicator) ?? "dot",
            valueFormatter: nn(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ v(
      Hi,
      {
        data: s,
        dataKey: "value",
        nameKey: "label",
        innerRadius: d,
        outerRadius: f,
        paddingAngle: a.padAngle,
        cornerRadius: a.cornerRadius,
        label: p,
        labelLine: y !== "none" && !h,
        isAnimationActive: !1,
        children: [
          s.map((C) => /* @__PURE__ */ i(lo, { fill: C.fill }, C.key)),
          h && a.centerLabel && /* @__PURE__ */ i(
            Bi,
            {
              position: "center",
              content: ({ viewBox: C }) => {
                var q, D;
                if (!C || !("cx" in C)) return null;
                const { cx: N, cy: M } = C, E = ((q = a.centerLabel) == null ? void 0 : q.value) === void 0 || a.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : a.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: N, y: M, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: N, y: M, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: E }),
                  ((D = a.centerLabel) == null ? void 0 : D.label) && /* @__PURE__ */ i("tspan", { x: N, y: M + 20, className: "cv:fill-muted-foreground cv:text-xs", children: a.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    Re(t).show && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(
          bt,
          {
            nameKey: "label",
            className: Re(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: Tt((k = t.legend) == null ? void 0 : k.position),
        layout: Ft((x = t.legend) == null ? void 0 : x.position),
        align: Et((_ = t.legend) == null ? void 0 : _.position)
      }
    )
  ] }) });
}
function Gs(e, t) {
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
function Ys({ data: e, options: t, format: n, editing: r }) {
  var p, g, b, k, x, _, C, N, M, E, q, D, O, T, z, R, L, X, Z, ee, $, G, B, K, ce, ue;
  const a = t.familyOptions ?? {}, o = e.raw.annotation, c = e.raw.rows;
  if (!a.x || !a.y)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const s = { x: a.x, y: a.y, z: a.size }, l = ((p = o == null ? void 0 : o.measures[a.x]) == null ? void 0 : p.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[a.x]) == null ? void 0 : g.shortTitle) ?? a.x, u = ((b = o == null ? void 0 : o.measures[a.y]) == null ? void 0 : b.shortTitle) ?? ((k = o == null ? void 0 : o.dimensions[a.y]) == null ? void 0 : k.shortTitle) ?? a.y, d = (_ = (x = t.axes) == null ? void 0 : x.x) != null && _.labelHide ? void 0 : ((N = (C = t.axes) == null ? void 0 : C.x) == null ? void 0 : N.label) ?? l, f = (E = (M = t.axes) == null ? void 0 : M.y) != null && E.labelHide ? void 0 : ((D = (q = t.axes) == null ? void 0 : q.y) == null ? void 0 : D.label) ?? u, h = Qs(c, a);
  if (!h.some((H) => H.points.some((P) => Number.isFinite(P.x) && Number.isFinite(P.y))))
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const y = {};
  return h.forEach((H, P) => {
    y[H.key] = { label: H.label, color: `var(--${ke[P % ke.length]})` };
  }), /* @__PURE__ */ i(it, { config: y, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Wi, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Xt, {}),
    /* @__PURE__ */ i(
      Nt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: (T = (O = t.axes) == null ? void 0 : O.x) == null ? void 0 : T.hide,
        scale: qe((z = t.axes) == null ? void 0 : z.x),
        domain: Ve((R = t.axes) == null ? void 0 : R.x),
        tickFormatter: (H) => n.value(H, a.x, "axis"),
        label: d ? { value: d, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      We,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (X = (L = t.axes) == null ? void 0 : L.y) == null ? void 0 : X.hide,
        scale: qe((Z = t.axes) == null ? void 0 : Z.y),
        domain: Ve((ee = t.axes) == null ? void 0 : ee.y),
        tickFormatter: (H) => n.value(H, a.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    a.size && /* @__PURE__ */ i(Ui, { type: "number", dataKey: "z", range: a.sizeRange ?? [40, 400], name: a.size }),
    (($ = t.tooltip) == null ? void 0 : $.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          gt,
          {
            indicator: ((G = t.tooltip) == null ? void 0 : G.indicator) ?? "dot",
            valueFormatter: (H, P) => {
              const V = P == null ? void 0 : P.dataKey, J = typeof V == "string" ? s[V] : void 0;
              return n.value(H, J, "tooltip");
            }
          }
        )
      }
    ),
    Re(t).show && h.length > 1 && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(bt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Tt((B = t.legend) == null ? void 0 : B.position),
        layout: Ft((K = t.legend) == null ? void 0 : K.position),
        align: Et((ce = t.legend) == null ? void 0 : ce.position)
      }
    ),
    h.map((H, P) => /* @__PURE__ */ i(
      Gi,
      {
        name: H.label,
        data: H.points,
        shape: a.shape ?? "circle",
        fill: `var(--color-${H.key})`,
        children: h.length === 1 && H.points.map((V, J) => /* @__PURE__ */ i(lo, { fill: `var(--${ke[P % ke.length]})` }, J))
      },
      H.key
    )),
    (ue = a.referenceLines) == null ? void 0 : ue.map((H, P) => /* @__PURE__ */ i(
      rt,
      {
        ...H.axis === "y" ? { y: H.value } : { x: H.value },
        label: H.label,
        stroke: `var(--${H.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      P
    ))
  ] }) });
}
function Qs(e, t) {
  const n = (a) => ({
    x: Wn(a[t.x]),
    y: Wn(a[t.y]),
    ...t.size ? { z: Wn(a[t.size]) } : {}
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
function Wn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Js(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Xs(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function Zs(e) {
  var l, u, d, f;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, o = (h) => r.value(h, a.measure, "kpi"), c = Ho([t.raw.rows[0] ?? {}], a.measure), s = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : f.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ i(cl, { value: c, label: s, fmt: o, fo: a }) : /* @__PURE__ */ i(el, { ...e, value: c, label: s, fo: a, fmt: o });
}
function el({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var h;
  const a = n.goodDirection ?? ((h = n.comparison) == null ? void 0 : h.goodDirection) ?? "up", o = t === null ? null : ll(e.raw.rows, t, n), c = !!n.comparison, s = c && !o && tl(e.raw.query, n), l = n.sparkline ? e.series[0] : void 0, u = !!l && l.data.some((y) => y !== null), d = o ? o.diff : l ? ol(l) : 0, f = Xs(Js(d, a));
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
          children: t === null ? "—" : r(t)
        }
      ),
      c && (o ? /* @__PURE__ */ i(il, { delta: o, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ i(nl, {}) : /* @__PURE__ */ i(rl, {}))
    ] }),
    u && /* @__PURE__ */ i("div", { className: "cv:shrink-0 cv:px-1 cv:pb-1", children: /* @__PURE__ */ i(al, { series: l, categories: e.categories, colorClass: f }) })
  ] });
}
function tl(e, t) {
  var r, a, o;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (o = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : o.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((c) => !c) : String(n).trim() === "";
}
function nl() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-amber-500/10 cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-amber-600",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ i(ho, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "set a date range to compare" })
      ]
    }
  );
}
function rl() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-muted cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-muted-foreground",
      title: "No data in the comparison period",
      children: [
        /* @__PURE__ */ i(fo, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "no prior data" })
      ]
    }
  );
}
function al({
  series: e,
  categories: t,
  colorClass: n
}) {
  const r = uo(), a = t.map((o, c) => ({ x: typeof o == "number" ? o : String(o), v: e.data[c] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(Xi, { width: "100%", height: "100%", children: /* @__PURE__ */ v(so, { data: a, margin: { top: 3, right: 0, bottom: 0, left: 0 }, children: [
    /* @__PURE__ */ i("defs", { children: /* @__PURE__ */ v("linearGradient", { id: r, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "0%", stopColor: "currentColor", stopOpacity: 0.28 }),
      /* @__PURE__ */ i("stop", { offset: "100%", stopColor: "currentColor", stopOpacity: 0.02 })
    ] }) }),
    /* @__PURE__ */ i(
      Cr,
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
function ol(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function il({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = e.diff > 0, o = e.diff === 0, c = o ? !0 : a === (t === "up"), s = o ? fo : a ? Rn : An, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: S(
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
function cl({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var f, h;
  const a = ((f = r.gauge) == null ? void 0 : f.min) ?? 0, o = ((h = r.gauge) == null ? void 0 : h.max) ?? Math.max(e ?? 0, 1), c = o > a ? o : a + 1, s = e === null ? a : Math.max(a, Math.min(c, e)), l = (e === null ? void 0 : sl(e, r)) ?? "chart-1", u = [{ name: t, value: s, fill: `var(--${l})` }], d = { value: { label: t, color: `var(--${l})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(it, { config: d, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      Yi,
      {
        data: u,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Qi, { type: "number", domain: [a, c], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(Ji, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
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
function sl(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const o of [...n].sort((c, s) => c.at - s.at))
    e >= o.at && (r = o.colorToken);
  return r;
}
function Ho(e, t) {
  for (const n of e) {
    const r = Bo(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function ll(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = Ho(e, r.value));
  else {
    const s = e[1];
    a = s ? Bo(s[n.measure]) : null;
  }
  if (a === null) return null;
  const o = t - a, c = a !== 0 ? o / a : null;
  return { current: t, baseline: a, diff: o, pct: c };
}
function Bo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Wo = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
Wo.displayName = "Table";
const Uo = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
Uo.displayName = "TableHeader";
const Go = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
Go.displayName = "TableBody";
const vn = w.forwardRef(
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
vn.displayName = "TableRow";
const lr = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
lr.displayName = "TableHead";
const fn = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
fn.displayName = "TableCell";
const ul = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
ul.displayName = "TableCaption";
const Yo = Mr(
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
), U = w.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: r ?? "button",
      className: S(Yo({ variant: t, size: n }), e),
      ...a
    }
  )
);
U.displayName = "Button";
function dl({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, o = e.raw.annotation, c = w.useMemo(
    () => ml(a, o, r, n),
    [a, o, r, n]
  ), [s, l] = w.useState(null), [u, d] = w.useState(0), f = r.sortable !== !1, h = r.pageSize ?? 25, y = w.useMemo(() => {
    if (!s) return a;
    const _ = s.dir === "asc" ? 1 : -1;
    return [...a].sort((C, N) => gl(C[s.member], N[s.member]) * _);
  }, [a, s]), p = Math.max(1, Math.ceil(y.length / h)), g = Math.min(u, p - 1), b = y.slice(g * h, g * h + h), k = (_) => {
    f && (l(
      (C) => (C == null ? void 0 : C.member) === _ ? { member: _, dir: C.dir === "asc" ? "desc" : "asc" } : { member: _, dir: "desc" }
    ), d(0));
  }, x = r.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", r.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(Wo, { children: [
      /* @__PURE__ */ i(Uo, { className: S(r.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(vn, { children: [
        r.showRowNumbers && /* @__PURE__ */ i(lr, { className: "cv:w-10 cv:text-right", children: "#" }),
        c.map((_) => /* @__PURE__ */ i(
          lr,
          {
            className: _a(_.align),
            style: _.width ? { width: _.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              U,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => k(_.member),
                children: [
                  _.label,
                  /* @__PURE__ */ i(pl, { active: (s == null ? void 0 : s.member) === _.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : _.label
          },
          _.member
        ))
      ] }) }),
      /* @__PURE__ */ v(Go, { children: [
        b.map((_, C) => /* @__PURE__ */ v(vn, { children: [
          r.showRowNumbers && /* @__PURE__ */ i(fn, { className: S("cv:text-right cv:text-muted-foreground", x && "cv:py-1"), children: g * h + C + 1 }),
          c.map((N) => {
            const M = bl(N.member, _[N.member], r.conditionalFormat);
            return /* @__PURE__ */ i(
              fn,
              {
                className: S(_a(N.align), x && "cv:py-1"),
                style: M ? { color: M } : void 0,
                children: N.render(_[N.member])
              },
              N.member
            );
          })
        ] }, C)),
        b.length === 0 && /* @__PURE__ */ i(vn, { children: /* @__PURE__ */ i(
          fn,
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
        g * h + 1,
        "–",
        Math.min((g + 1) * h, y.length),
        " of",
        " ",
        y.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:gap-2", children: [
        /* @__PURE__ */ i(
          U,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((_) => Math.max(0, _ - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          U,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((_) => Math.min(p - 1, _ + 1)),
            disabled: g >= p - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function ml(e, t, n, r) {
  var c;
  const a = e.length > 0 ? Object.keys(e[0]) : fl(t);
  return ((c = n.columns) != null && c.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const l = s.member, u = t ? hl(t, l) : void 0, d = t ? l in t.measures : !1, f = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = s.align ?? (d ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: s.width,
      render: (y) => vl(y, d, l, r)
    };
  });
}
function vl(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function fl(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function hl(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function _a(e) {
  return e === "right" ? "cv:text-right" : e === "center" ? "cv:text-center" : "cv:text-left";
}
function pl({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(Rn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(An, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(ac, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function gl(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function bl(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && yl(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function yl(e, t, n) {
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
function xl({ data: e, options: t, format: n, editing: r }) {
  var g, b, k, x, _, C, N, M, E, q, D, O, T, z, R, L, X, Z, ee, $, G, B, K, ce, ue, H;
  const a = t.familyOptions ?? {}, o = a.series ?? [], c = kl(e, o), s = (P) => n.category(P), l = o.some((P) => P.axis === "right"), u = (g = o.find((P) => P.axis !== "right")) == null ? void 0 : g.member, d = (b = o.find((P) => P.axis === "right")) == null ? void 0 : b.member, f = zn(e, t), h = (x = (k = t.axes) == null ? void 0 : k.y) != null && x.labelHide ? void 0 : ((C = (_ = t.axes) == null ? void 0 : _.y) == null ? void 0 : C.label) ?? (u ? hn(e, u) : void 0), y = (M = (N = t.axes) == null ? void 0 : N.y2) != null && M.labelHide ? void 0 : ((q = (E = t.axes) == null ? void 0 : E.y2) == null ? void 0 : q.label) ?? (d ? hn(e, d) : void 0), p = {};
  return o.forEach((P, V) => {
    const J = P.colorToken ?? ke[V % ke.length];
    p[P.member] = {
      label: P.label ?? hn(e, P.member),
      color: `var(--${J})`
    };
  }), /* @__PURE__ */ i(it, { config: p, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Zi, { accessibilityLayer: !0, data: c, children: [
    /* @__PURE__ */ i(Xt, { vertical: !1 }),
    /* @__PURE__ */ i(
      Nt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (O = (D = t.axes) == null ? void 0 : D.x) == null ? void 0 : O.hide,
        tickFormatter: s,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      We,
      {
        yAxisId: "left",
        type: "number",
        hide: (z = (T = t.axes) == null ? void 0 : T.y) == null ? void 0 : z.hide,
        scale: qe((R = t.axes) == null ? void 0 : R.y),
        domain: Ve((L = t.axes) == null ? void 0 : L.y),
        tickFormatter: (P) => n.value(P, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      We,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (Z = (X = t.axes) == null ? void 0 : X.y2) == null ? void 0 : Z.hide,
        scale: qe((ee = t.axes) == null ? void 0 : ee.y2),
        domain: Ve(($ = t.axes) == null ? void 0 : $.y2),
        tickFormatter: (P) => n.value(P, d, "axis"),
        label: y ? { value: y, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((G = t.tooltip) == null ? void 0 : G.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          gt,
          {
            labelFormatter: (P) => n.category(P),
            indicator: ((B = t.tooltip) == null ? void 0 : B.indicator) ?? "dot",
            valueFormatter: nn(n)
          }
        )
      }
    ),
    Re(t).show && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(bt, { className: Re(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Tt((K = t.legend) == null ? void 0 : K.position),
        layout: Ft((ce = t.legend) == null ? void 0 : ce.position),
        align: Et((ue = t.legend) == null ? void 0 : ue.position)
      }
    ),
    o.map((P) => wl(P, e, a)),
    (H = a.referenceLines) == null ? void 0 : H.map((P, V) => {
      const J = P.side ?? (l && !u ? "right" : "left");
      let ne;
      if (P.axis === "x") {
        const he = e.categories[P.value];
        if (he === void 0) return null;
        ne = { x: typeof he == "number" ? he : String(he) };
      } else
        ne = { y: P.value };
      return /* @__PURE__ */ i(
        rt,
        {
          yAxisId: J,
          ...ne,
          label: P.label,
          stroke: `var(--${P.colorToken ?? "muted-foreground"})`,
          strokeDasharray: "4 4"
        },
        V
      );
    })
  ] }) });
}
function wl(e, t, n) {
  const r = e.axis === "right" ? "right" : "left", a = `var(${Lr(e.member)})`, o = e.label ?? hn(t, e.member), c = e.curve ?? n.curve ?? "monotone", s = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    oo,
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
    Cr,
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
    co,
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
function kl(e, t) {
  var o, c, s;
  const n = new Map(e.series.map((l) => [l.key, l]));
  if (t.every((l) => n.has(l.member)) && e.categories.length > 0)
    return e.categories.map((l, u) => {
      var f;
      const d = {
        __cat: typeof l == "number" ? l : String(l)
      };
      for (const h of t) d[h.member] = ((f = n.get(h.member)) == null ? void 0 : f.data[u]) ?? null;
      return d;
    });
  const a = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((s = (c = e.raw.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : s.dimension);
  return e.raw.rows.map((l) => {
    const u = a ? l[a] : void 0, d = {
      __cat: u == null ? "" : String(u)
    };
    for (const f of t) d[f.member] = Cl(l[f.member]);
    return d;
  });
}
function hn(e, t) {
  var n, r, a, o;
  return ((r = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : r.shortTitle) ?? ((o = (a = e.raw.annotation) == null ? void 0 : a.measures[t]) == null ? void 0 : o.title) ?? t;
}
function Cl(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const dt = "cv:w-40", Nl = "cv:w-56", Qo = "a date or category", Un = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: Qo, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0
  }
], Sl = [
  { id: "x", label: "Category", hint: Qo, cardinality: "one", kinds: ["time", "category"] },
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
], _l = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], Rl = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], Al = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], Ml = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], Ol = ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo"], Xe = (e) => Ol.indexOf(e), Ge = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: po,
    order: Xe("bar"),
    component: Hs,
    optionsSchema: Qe.bar,
    defaults: Je.bar,
    wells: Un,
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
    sidebarWidthClass: dt
  },
  line: {
    family: "line",
    label: "Line",
    icon: dc,
    order: Xe("line"),
    component: Bs,
    optionsSchema: Qe.line,
    defaults: Je.line,
    wells: Un,
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
    sidebarWidthClass: dt
  },
  area: {
    family: "area",
    label: "Area",
    icon: oc,
    order: Xe("area"),
    component: Ws,
    optionsSchema: Qe.area,
    defaults: Je.area,
    wells: Un,
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
    sidebarWidthClass: dt
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: uc,
    order: Xe("pie"),
    component: Us,
    optionsSchema: Qe.pie,
    defaults: Je.pie,
    wells: _l,
    zones: { left: ["size"], bottom: ["slices"] },
    dualAxisY: !1,
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: dt
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: lc,
    order: Xe("scatter"),
    component: Ys,
    optionsSchema: Qe.scatter,
    defaults: Je.scatter,
    wells: Rl,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: dt
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: sc,
    order: Xe("kpi"),
    component: Zs,
    optionsSchema: Qe.kpi,
    defaults: Je.kpi,
    wells: Al,
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
    sidebarWidthClass: Nl
  },
  table: {
    family: "table",
    label: "Table",
    icon: cc,
    order: Xe("table"),
    component: dl,
    optionsSchema: Qe.table,
    defaults: Je.table,
    wells: Ml,
    zones: { left: ["columns"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: dt
  },
  combo: {
    family: "combo",
    label: "Combo",
    icon: ic,
    order: Xe("combo"),
    component: xl,
    optionsSchema: Qe.combo,
    defaults: Je.combo,
    wells: Sl,
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
    sidebarWidthClass: dt
  }
}, Ll = Ge.bar, Dl = Ge.line, zl = Ge.area, Tl = Ge.pie, Fl = Ge.scatter, El = Ge.kpi, $l = Ge.table, Pl = Ge.combo, Pr = [
  Ll,
  Dl,
  zl,
  Tl,
  Fl,
  El,
  $l,
  Pl
], Il = m.any();
function Ir(e, t) {
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
      return ((s = n.get(c)) == null ? void 0 : s.defaults) ?? Ps;
    },
    optionsSchema: (c) => {
      var s;
      return ((s = n.get(c)) == null ? void 0 : s.optionsSchema) ?? Il;
    },
    resolveOptions: (c) => Is(c, o.defaults(c.family))
  };
  return o;
}
const Tn = Ir(Pr);
function jl(e, t = Tn) {
  return t.resolveOptions(e);
}
const yp = Object.fromEntries(
  Object.entries(Ge).map(([e, t]) => [e, t.component])
);
function Vl({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: o,
  editing: c,
  registry: s = Tn
}) {
  var y;
  const l = ae(() => jl(t, s), [t, s]), u = ((y = s.get(l.family)) == null ? void 0 : y.queryless) ?? !1;
  if (!u && (a != null && a.loading))
    return /* @__PURE__ */ i(ms, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (!u && (a != null && a.error))
    return /* @__PURE__ */ v(On, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Sr, {}),
      /* @__PURE__ */ i(Ln, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(Dn, { children: a.error.message })
    ] });
  if (!u && e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const d = n && Object.keys(n).length > 0 ? n : Ks(e), f = r ?? jo(e.raw.annotation, l, Dr), h = (o == null ? void 0 : o[l.family]) ?? s.require(l.family).component;
  return /* @__PURE__ */ i(
    h,
    {
      data: e,
      options: l,
      config: d,
      format: f,
      state: a,
      editing: c
    }
  );
}
const ke = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Gn = 8;
function Ra(e) {
  return e.every((t) => t.data.every((n) => n === null));
}
function ur(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : ke, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, d) => r[u] ?? d, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = a(u.key, u.colorToken);
    d && o.add(d);
  }
  let c = 0;
  const s = () => {
    for (let u = 0; u < n.length; u++) {
      const d = n[c++ % n.length];
      if (!o.has(d))
        return o.add(d), d;
    }
    return n[c++ % n.length];
  };
  return e.map((u) => a(u.key, u.colorToken) ?? s());
}
function Aa(e, t) {
  const n = ur(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function ql(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function mn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = ql(e[n]);
  return t;
}
function Kl(e) {
  return {
    measures: mn(e.measures ?? {}),
    dimensions: mn(e.dimensions ?? {}),
    segments: mn(e.segments ?? {}),
    timeDimensions: mn(e.timeDimensions ?? {})
  };
}
function Ct(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Fn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let c = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!c || c.kind === void 0 || c.kind === "auto") && (c = { ...c, kind: "currency" }), c && (a.format = c), t != null && t.axis && (a.axis = t.axis), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Hl(e, t, n) {
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
function Wl(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, o] of t) {
      const c = En(r[a]);
      c !== null && (r[a] = o.to(c));
    }
    return r;
  });
}
function Ul(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((o) => o === null ? null : a.to(o)));
    }
}
function Gl(e, t, n, r, a = Tn) {
  const o = Kl(e.annotation()), c = Bl(o, r), s = Wl(e.tablePivot(), c), l = t.mapping;
  if (!l) {
    const f = n.measures ?? [];
    if (a.require(t.family).measureOnly && f.length > 0) {
      const h = s[0] ?? {}, y = [
        {
          key: "value",
          label: "Value",
          data: f.map((g) => En(h[g])),
          meta: { ...Fn(Ct(o, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return Aa(y, t.colors), {
        categories: f.map(
          (g) => {
            var b, k;
            return ((b = Ct(o, g)) == null ? void 0 : b.shortTitle) ?? ((k = Ct(o, g)) == null ? void 0 : k.title) ?? g;
          }
        ),
        series: y,
        raw: { rows: s, annotation: o, query: n },
        empty: s.length === 0 || Ra(y)
      };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: o, query: n },
      empty: s.length === 0
    };
  }
  const u = l.series.mode === "measures" ? Ql(e, l.series, t, o) : Jl(e, l.category.member, l.series, t, o), d = Yl(e, l);
  return Ul(u, c), Aa(u, t.colors), {
    categories: d,
    series: u,
    raw: { rows: s, annotation: o, query: n },
    empty: s.length === 0 || Ra(u)
  };
}
function Yl(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Ql(e, t, n, r) {
  const { members: a, meta: o } = t, c = e.chartPivot();
  return a.map((s) => {
    const l = Ct(r, s), u = o == null ? void 0 : o[s], d = c.map((f) => En(f[s]));
    return {
      key: s,
      label: Hl(l, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Fn(l, u, n.format), measure: s }
    };
  });
}
function Jl(e, t, n, r, a) {
  const { value: o, values: c, pivot: s } = n, l = c && c.length > 0 ? c : [o], u = new Set(l), d = l.length > 1, f = { x: [t], y: [s, "measures"] }, y = e.seriesNames(f).filter((k) => {
    const x = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : void 0;
    return x === void 0 || u.has(x);
  }), p = e.chartPivot(f), g = Ct(a, o), b = y.map((k) => {
    var O, T;
    const x = (O = k.yValues) == null ? void 0 : O[0], _ = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : o, C = Ct(a, _), N = (C == null ? void 0 : C.shortTitle) ?? (C == null ? void 0 : C.title) ?? _, M = x ?? k.shortTitle ?? k.title ?? k.key, E = d ? `${N} · ${M}` : M, q = p.map((z) => En(z[k.key])), D = (T = n.meta) == null ? void 0 : T[_];
    return {
      key: k.key,
      label: E,
      data: q,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Fn(C ?? g, D, r.format),
        measure: _
      }
    };
  });
  return Xl(b, g, r.format);
}
function Xl(e, t, n) {
  var d, f, h;
  if (e.length <= Gn) return e;
  const r = (y) => y.data.reduce((p, g) => p + (g ?? 0), 0), a = [...e].sort((y, p) => r(p) - r(y)), o = a.slice(0, Gn - 1), c = a.slice(Gn - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, l = Array.from({ length: s }, (y, p) => {
    let g = 0, b = !1;
    for (const k of c) {
      const x = k.data[p];
      x !== null && (g += x, b = !0);
    }
    return b ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${c.length})`,
    data: l,
    meta: { ...Fn(t, void 0, n), ...(h = (f = o[0]) == null ? void 0 : f.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function En(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Rt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Zl = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function eu(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Yt(e, t, n) {
  var r;
  if (ze(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function tu(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const c = Yt(o, t, n);
    if (!Rt(c))
      if (Array.isArray(c))
        for (const s of c)
          Rt(s) || a.push(s);
      else
        a.push(c);
  }
  return a.length === 0 ? r ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: a };
}
function nu(e, t, n) {
  if ("and" in e) {
    const r = dr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = dr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return tu(e, t, n);
}
function dr(e, t, n) {
  const r = [];
  for (const a of e) {
    const o = nu(a, t, n);
    o !== void 0 && r.push(o);
  }
  return r;
}
function ru(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Yt(e.granularity, t, n);
    Rt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Yt(e.dateRange, t, n);
    Rt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Jo(e, t, n) {
  const r = Zl(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((o) => ru(o, r, t))), e.filters !== void 0) {
    const o = dr(e.filters, r, t);
    o.length > 0 && (a.filters = o);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Yt(e.limit, r, t);
    Rt(o) || (a.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Yt(e.offset, r, t);
    Rt(o) || (a.offset = o);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function au() {
  let e, t;
  return (n, r, a) => {
    const o = Jo(n, r, a), c = JSON.stringify(o);
    return e !== void 0 && c === t ? e : (e = o, t = c, o);
  };
}
function ou(e, t) {
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
class iu extends Error {
}
const cu = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new iu(`"${e}" cannot be parsed into a number`);
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
function Ma(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class su extends Error {
}
class Oa extends Error {
}
class lu extends Error {
}
class Yn extends Error {
}
class uu extends Error {
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
      throw new Oa(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Ma(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new lu(`Cannot convert incompatible measures of ${a.measure} and ${o.measure}`);
    let c = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (c = this.cls.sub(c, this.convertFraction(o.unit.anchor_shift))), o.system != a.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Yn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${a.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Yn(`Unable to find anchor for "${o.measure}" to "${a.measure}". Please make sure it is defined.`);
      const d = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        c = d(c, this.cls);
      else if (typeof f == "number")
        c = this.cls.mul(c, f);
      else if (Ma(f))
        c = this.cls.mul(c, this.convertFraction(f));
      else
        throw new Yn("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new Oa(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let c = [], s = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (c = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, l = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const f = this.describe(d);
      if (c.indexOf(d) === -1 && f.system === l) {
        const y = this.to(d);
        if (o ? this.cls.gt(y, s) : this.cls.lt(y, s))
          continue;
        (u === null || (o ? this.cls.lte(y, s) && this.cls.gt(y, u.val) : this.cls.gte(y, s) && this.cls.lt(y, u.val))) && (u = {
          val: y,
          unit: d,
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
        throw new uu(`Meausure "${t}" not found.`);
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
    throw new su(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function mu(e) {
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
function vu(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = mu(e);
  return (r) => new du({
    measures: e,
    unitCache: n,
    cls: cu
  }, r);
}
const fu = {
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
}, hu = {
  systems: {
    metric: fu
  }
}, pu = {
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
}, gu = {
  systems: {
    SI: pu
  }
}, bu = {
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
}, yu = {
  systems: {
    SI: bu
  }
}, xu = {
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
}, wu = {
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
}, ku = {
  systems: {
    metric: xu,
    imperial: wu
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
}, Cu = {
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
}, Nu = {
  systems: {
    SI: Cu
  }
}, Su = {
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
}, _u = {
  systems: {
    SI: Su
  }
}, Ru = {
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
}, Au = {
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
}, Mu = {
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
}, Ou = {
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
}, Lu = {
  systems: {
    bit: Ru,
    byte: Au,
    IECBit: Mu,
    IECByte: Ou
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
}, Du = {
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
    metric: Du
  }
}, Tu = {
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
}, Fu = {
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
}, Eu = {
  systems: {
    SI: Tu,
    nutrition: Fu
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
}, $u = {
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
}, Pu = {
  systems: {
    SI: $u
  }
}, Iu = {
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
}, ju = {
  systems: {
    SI: Iu
  }
}, Vu = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, qu = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Ku = {
  systems: {
    metric: Vu,
    imperial: qu
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
}, Hu = {
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
}, Wu = {
  systems: {
    metric: Hu,
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
}, Uu = {
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
}, Gu = {
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
}, Yu = {
  systems: {
    metric: Uu,
    imperial: Gu
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
}, Qu = {
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
}, Ju = {
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
}, Xu = {
  systems: {
    metric: Qu,
    imperial: Ju
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
}, Zu = {
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
}, ed = {
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
}, td = {
  systems: {
    metric: Zu,
    imperial: ed
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
}, nd = {
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
}, rd = {
  systems: {
    SI: nd
  }
}, ad = {
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
}, od = {
  systems: {
    unit: ad
  }
}, id = {
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
}, cd = {
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
}, sd = {
  systems: {
    metric: id,
    imperial: cd
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
}, ld = {
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
}, ud = {
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
}, dd = {
  systems: {
    metric: ld,
    imperial: ud
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
}, md = {
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
}, vd = {
  systems: {
    SI: md
  }
}, fd = {
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
}, hd = {
  systems: {
    SI: fd
  }
}, pd = {
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
}, gd = {
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
}, bd = {
  systems: {
    metric: pd,
    imperial: gd
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
}, yd = {
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
}, xd = {
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
}, wd = {
  systems: {
    metric: yd,
    imperial: xd
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
}, kd = {
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
}, Cd = {
  systems: {
    SI: kd
  }
}, Nd = {
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
}, Sd = {
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
}, _d = {
  systems: {
    metric: Nd,
    imperial: Sd
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
}, Rd = {
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
}, Ad = {
  systems: {
    SI: Rd
  }
}, Md = {
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
}, Od = {
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
}, Ld = {
  systems: {
    metric: Md,
    imperial: Od
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
}, Dd = {
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
}, zd = {
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
}, Td = {
  systems: {
    metric: Dd,
    imperial: zd
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
}, Fd = {
  acceleration: hu,
  angle: gu,
  apparentPower: yu,
  area: ku,
  charge: Nu,
  current: _u,
  digital: Lu,
  each: zu,
  energy: Eu,
  force: Pu,
  frequency: ju,
  illuminance: Ku,
  length: Wu,
  mass: Yu,
  massFlowRate: Xu,
  pace: td,
  partsPer: rd,
  pieces: od,
  power: sd,
  pressure: dd,
  reactiveEnergy: vd,
  reactivePower: hd,
  speed: bd,
  torque: _d,
  temperature: wd,
  time: Cd,
  voltage: Ad,
  volume: Ld,
  volumeFlowRate: Td
}, Ed = vu(Fd), $d = {
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
function Pd(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Ed(t).from(e.from).to(e.to)
  };
}
const mr = {
  ...Object.fromEntries(
    Object.entries($d).map(([e, t]) => [e, Pd(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function $n(e) {
  return e ? { ...mr, ...e } : mr;
}
function Id(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function jd(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Vd(e) {
  return e != null && e.quantity ? jd(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const qd = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Xo(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function La(e, t) {
  const n = e * (qd[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], c = o.map(([l, u], d) => {
    const f = d < o.length - 1 ? Math.floor(a / l) : Math.round(a / l);
    return a -= f * l, [f, u];
  }), s = c.findIndex((l) => l[0] > 0);
  if (s === -1) {
    const l = Math.abs(n);
    return l === 0 ? "0s" : l < 1e3 ? `${r}${Xo(l.toFixed(l < 1 ? 2 : 0))}ms` : `${r}0s`;
  }
  return r + c.slice(s, s + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function Qn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [o, c] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= o) return Xo((e / o).toFixed(n.decimals ?? 1)) + c;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Kd(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Da(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Zo(e = mr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Dr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || !Number.isFinite(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return La(n, r == null ? void 0 : r.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency") {
        const d = typeof o.currency == "string" && /^[A-Za-z]{3}$/.test(o.currency) ? o.currency.toUpperCase() : "USD";
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: d, maximumFractionDigits: o.decimals ?? 0 }).format(n);
      }
      if (o.kind === "number") return Da(Qn(n, t), o.prefix, o.suffix);
    }
    if (a === "time") return La(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return Da(Qn(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const c = r == null ? void 0 : r.unit, s = c ? Kd(a, c) : {}, l = (o == null ? void 0 : o.prefix) ?? s.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : s.suffix ?? "";
    return `${l}${Qn(n, t)}${u}`;
  };
}
const Pn = mo(null);
Pn.displayName = "CubeVizContext";
function He() {
  const e = Nr(Pn);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function yt() {
  return He().families;
}
function Hd(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function xp({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: o,
  children: c
}) {
  const s = (o ?? []).map((g) => g.family).join("|"), l = ae(
    () => Ir(Pr, o),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [s]
  ), u = ae(
    () => Hd(e) ? ls(e) : e,
    [e]
  ), d = ae(
    () => {
      var g;
      return {
        chartRamp: (g = t == null ? void 0 : t.chartRamp) != null && g.length ? t.chartRamp : ke,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), f = ae(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = ae(() => a ?? {}, [a]), y = ae(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), p = ae(
    () => ({
      cubeClient: u,
      registry: h,
      families: l,
      locale: f,
      theme: d,
      maps: y
    }),
    [u, h, l, f, d, y]
  );
  return /* @__PURE__ */ i(Pn.Provider, { value: p, children: /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "cv:contents",
        d.mode === "dark" && "dark",
        d.mode === "light" && "cube-viz-light"
      ),
      children: c
    }
  ) });
}
function jr({
  families: e,
  children: t
}) {
  const n = He(), r = (e ?? []).map((o) => o.family).join("|"), a = ae(() => !e || e.length === 0 ? n : { ...n, families: Ir(Pr, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ i(ie, { children: t }) : /* @__PURE__ */ i(Pn.Provider, { value: a, children: t });
}
function Bd(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Wd = 5e3;
function Ud(e, t) {
  const { cubeClient: n } = He(), r = (t == null ? void 0 : t.skip) ?? !1, a = ae(
    () => e.limit === void 0 ? { ...e, limit: Wd } : e,
    [e]
  ), o = ae(() => JSON.stringify(a), [a]), [c, s] = St({ isLoading: !r }), [l, u] = St(0), d = tt(() => u((f) => f + 1), []);
  return Zt(() => {
    if (r) {
      s({ isLoading: !1 });
      return;
    }
    let f = !0;
    return s((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0 }).then((h) => {
      f && s({
        resultSet: h,
        isLoading: !1
      });
    }).catch((h) => {
      f && s({
        isLoading: !1,
        error: h instanceof Error ? h : new Error(String(h))
      });
    }), () => {
      f = !1;
    };
  }, [n, o, r, l]), { ...c, refetch: d };
}
const In = mo(null);
In.displayName = "DashboardContext";
function Vr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = mt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: ou(r, t), key: r });
  const o = a.current.store, c = Gd(o, r);
  return ec(In.Provider, { value: c }, n);
}
function Gd(e, t) {
  const n = tt(
    (o, c) => e.set(o, c),
    [e]
  ), r = tt(
    (o) => Jo(o, e.getAll(), t),
    [e, t]
  ), a = tt(
    (o) => eu(o, e.getAll(), t),
    [e, t]
  );
  return ae(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Yd(e) {
  const t = vo(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function ei() {
  const e = Nr(In);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Yd(e);
}
function qr() {
  return Nr(In);
}
const Qd = () => () => {
};
function Jn(e, t, n) {
  var _;
  const r = qr(), { locale: a } = He(), o = yt(), c = mt(null);
  c.current === null && (c.current = au());
  const s = c.current, l = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !l, d = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), f = vo(
    u && r ? r.store.subscribe : Qd,
    d,
    d
  ), { resultSet: h, isLoading: y, error: p, refetch: g } = Ud(f, { skip: n == null ? void 0 : n.skip }), b = ((_ = t.format) == null ? void 0 : _.unitSystem) ?? (a == null ? void 0 : a.unitSystem), k = ae(() => $n(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ae(() => {
    if (h)
      return Gl(h, t, f, { unitSystem: b, conversions: k }, o);
  }, [h, t, f, b, k, o]), isLoading: y, error: p, refetch: g, resolvedQuery: f };
}
function ct() {
  const { cubeClient: e } = He(), [t, n] = St({ isLoading: !0 });
  return Zt(() => {
    let r = !0;
    return n({ isLoading: !0 }), us(e).then((a) => {
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
function wp() {
  const { locale: e } = He(), { formatValue: t, units: n } = e;
  return ae(
    () => t ?? Zo($n(n)),
    [t, n]
  );
}
function ti() {
  const [e, t] = St(0), n = mt(null), r = mt(null), a = mt(null), o = mt(0), c = tt((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), s = tt(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), l = tt(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== o.current && (o.current = d, t(d));
      const f = new ResizeObserver((h) => {
        var y, p;
        for (const g of h) {
          const b = ((p = (y = g.contentBoxSize) == null ? void 0 : y[0]) == null ? void 0 : p.inlineSize) ?? g.contentRect.width;
          c(b);
        }
      });
      f.observe(u), r.current = f;
    },
    [c, s]
  );
  return Zt(() => s, [s]), [l, e];
}
const Jd = "day";
function Xd(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const a = r.member ?? (n == null ? void 0 : n.measure), o = (d = e.timeDimensions) == null ? void 0 : d[0], c = r.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!a || !c) return null;
  const s = r.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [a],
    timeDimensions: [
      {
        dimension: c,
        granularity: r.granularity ?? Jd,
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
const te = (e) => be(e, "yyyy-MM-dd");
function Zd(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = bn(e[0]), o = bn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(o.getTime())) return;
    const c = Ec(o, a) + 1;
    return [te(De(a, c)), te(De(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = De(t, 1);
    return [te(a), te(a)];
  }
  if (n === "yesterday") {
    const a = De(t, 2);
    return [te(a), te(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), o = r[2];
    if (o.startsWith("day")) return [te(De(t, 2 * a - 1)), te(De(t, a))];
    if (o.startsWith("week")) return [te(De(t, 14 * a - 1)), te(De(t, 7 * a))];
    if (o.startsWith("month"))
      return [te(on(cn(t, 2 * a))), te(De(on(cn(t, a)), 1))];
    if (o.startsWith("quarter"))
      return [te(sn(ln(t, 2 * a))), te(De(sn(ln(t, a)), 1))];
    if (o.startsWith("year"))
      return [te(un(dn(t, 2 * a))), te(De(un(dn(t, a)), 1))];
  }
  if (n === "this week") {
    const a = fa(t, 1);
    return [te(ha(a)), te(pa(a))];
  }
  if (n === "this month") {
    const a = cn(t, 1);
    return [te(on(a)), te(ga(a))];
  }
  if (n === "this quarter") {
    const a = ln(t, 1);
    return [te(sn(a)), te(ba(a))];
  }
  if (n === "this year") {
    const a = dn(t, 1);
    return [te(un(a)), te(ya(a))];
  }
  if (n === "last week") {
    const a = fa(t, 2);
    return [te(ha(a)), te(pa(a))];
  }
  if (n === "last month") {
    const a = cn(t, 2);
    return [te(on(a)), te(ga(a))];
  }
  if (n === "last quarter") {
    const a = ln(t, 2);
    return [te(sn(a)), te(ba(a))];
  }
  if (n === "last year") {
    const a = dn(t, 2);
    return [te(un(a)), te(ya(a))];
  }
}
function em(e, t, n = Tn) {
  var u, d;
  const r = t.familyOptions ?? {}, a = n.require(t.family).comparePreviousMode;
  if (a === "series") {
    if (!r.comparePrevious) return null;
  } else if (a === "kpiRow") {
    if (((u = r.comparison) == null ? void 0 : u.mode) !== "previousPeriod") return null;
  } else
    return null;
  const o = (d = e.timeDimensions) == null ? void 0 : d[0];
  if (!o) return null;
  const c = o.dateRange;
  if (c !== void 0 && typeof c == "object" && !Array.isArray(c)) return null;
  const s = Zd(c);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...o, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const tm = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Kr({ query: e, chart: t, onState: n, editing: r }) {
  var q;
  const { registry: a, locale: o } = He(), c = yt(), s = ((q = c.get(t.family)) == null ? void 0 : q.queryless) ?? !1, l = ae(() => {
    var D;
    return (D = t.format) != null && D.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), u = ae(() => {
    const D = e ?? {};
    return D.timezone || !(o != null && o.timezone) ? D : { ...D, timezone: o.timezone };
  }, [e, o == null ? void 0 : o.timezone]), { data: d, isLoading: f, error: h, refetch: y, resolvedQuery: p } = Jn(
    u,
    l,
    { skip: s }
  ), g = ae(() => Xd(u, l), [u, l]), b = Jn(
    (g == null ? void 0 : g.query) ?? u,
    (g == null ? void 0 : g.chart) ?? l,
    { skip: !g }
  ), k = ae(
    () => em(p, l, c),
    [p, l, c]
  ), x = Jn(
    (k == null ? void 0 : k.query) ?? u,
    l,
    { skip: !k, skipResolve: !0 }
  ), _ = ae(
    () => ({ [l.family]: Bd(a, l.family, c) }),
    [a, l.family, c]
  ), C = ae(() => {
    let D = d ?? tm;
    if (g && b.data) {
      D = { ...D, series: b.data.series, categories: b.data.categories };
      const O = D.raw.rows.length > 0, T = D.series.some((z) => z.data.some((R) => R !== null));
      D = { ...D, empty: !O && !T };
    }
    if (k && x.data) {
      if (k.mode === "kpiRow") {
        const O = x.data.raw.rows[0];
        if (O) {
          const T = D.raw.rows[0];
          D = {
            ...D,
            raw: { ...D.raw, rows: T ? [T, O] : [O] }
          };
        }
      } else if (!x.data.empty) {
        const O = new Map(x.data.series.map((T) => [T.key, T]));
        if (!D.empty && D.series.length > 0) {
          const T = D.categories.length, z = D.series.map((R) => {
            const L = O.get(R.key), X = Array.from({ length: T }, (Z, ee) => (L == null ? void 0 : L.data[ee]) ?? null);
            return {
              ...R,
              key: `${R.key}__prev`,
              label: `${R.label} (prev)`,
              colorToken: R.colorToken,
              data: X,
              meta: { ...R.meta, companion: !0 }
            };
          });
          D = { ...D, series: [...D.series, ...z] };
        } else {
          const T = x.data.series.map((z) => ({
            ...z,
            key: `${z.key}__prev`,
            label: `${z.label} (prev)`,
            data: [...z.data],
            meta: { ...z.meta, companion: !0 }
          }));
          D = {
            ...D,
            categories: x.data.categories,
            series: T,
            empty: !1
          };
        }
      }
    }
    return D;
  }, [d, g, b.data, k, x.data]);
  Zt(() => {
    n == null || n({ rows: C.raw.rows, refetch: y, isLoading: f });
  }, [n, C.raw.rows, y, f]);
  const N = {}, M = ae(
    () => o.formatValue ?? Zo($n(o.units)),
    [o.formatValue, o.units]
  ), E = ae(
    () => jo(C.raw.annotation, l, M, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [C.raw.annotation, l, M, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    Vl,
    {
      data: C,
      options: l,
      config: N,
      format: E,
      state: s ? { loading: !1 } : { loading: f && !d, error: h },
      components: _,
      registry: c,
      editing: r
    }
  );
}
function nm({ spec: e }) {
  return /* @__PURE__ */ i(Kr, { query: e.query, chart: e.chart });
}
const ni = "cube-viz-prose";
function rm(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function am({ doc: e }) {
  const t = rm(e), n = ae(
    () => t ? e : null,
    [t, e]
  ), r = Ao(
    {
      extensions: [Oo],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: S(ni) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(Mo, { editor: r }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
}
const pn = [
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
], om = Object.fromEntries(
  pn.map((e) => [e.value, e.label])
);
function za(e) {
  return om[e.trim().toLowerCase()] ?? e;
}
const im = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function cm({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Pc(), a = S(Yo({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
  return /* @__PURE__ */ v("div", { className: "cv:mb-2 cv:flex cv:items-center cv:justify-between cv:gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: S(a, !r && "cv:opacity-40"),
        children: /* @__PURE__ */ i(_r, { className: "cv:size-4" })
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
        className: S(a, !n && "cv:opacity-40"),
        children: /* @__PURE__ */ i(en, { className: "cv:size-4" })
      }
    )
  ] });
}
function sm({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const o = !!t.selected && !t.outside && !t.disabled, c = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...a,
      style: { ...r, color: o ? "var(--primary-foreground)" : c ? "var(--muted-foreground)" : "var(--foreground)" },
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
function ri({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ i(
    $c,
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
        MonthCaption: cm,
        DayButton: sm,
        Chevron: ({ orientation: a, className: o, ...c }) => /* @__PURE__ */ i(a === "left" ? _r : en, { className: S("cv:size-4", o), ...c })
      },
      ...r
    }
  );
}
function Me({
  ...e
}) {
  return /* @__PURE__ */ i(gn.Root, { "data-slot": "popover", ...e });
}
function Oe({
  ...e
}) {
  return /* @__PURE__ */ i(gn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Le({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ i(gn.Portal, { children: /* @__PURE__ */ i(
    gn.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: S(
        "cv:z-50 cv:w-72 cv:origin-[var(--radix-popover-content-transform-origin)] cv:rounded-md cv:border cv:border-border cv:bg-popover cv:p-4 cv:text-popover-foreground cv:shadow-md cv:outline-none cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...r
    }
  ) });
}
function Te({
  ...e
}) {
  return /* @__PURE__ */ i(Ce.Root, { "data-slot": "select", ...e });
}
function vr({
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
      className: S(
        "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:whitespace-nowrap cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2 cv:text-sm cv:text-foreground cv:shadow-sm cv:ring-offset-background cv:placeholder:text-muted-foreground cv:focus:outline-none cv:focus:ring-1 cv:focus:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50 cv:[&>span]:line-clamp-1 cv:data-[placeholder]:text-muted-foreground cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(Ce.Icon, { asChild: !0, children: /* @__PURE__ */ i(ot, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function lm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Ce.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(mc, { className: "cv:size-4" })
    }
  );
}
function um({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Ce.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(ot, { className: "cv:size-4" })
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
      className: S(
        "cv:relative cv:z-50 cv:max-h-[var(--radix-select-content-available-height)] cv:min-w-[8rem] cv:origin-[var(--radix-select-content-transform-origin)] cv:overflow-hidden cv:rounded-md cv:border cv:border-border cv:bg-popover cv:text-popover-foreground cv:shadow-md cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "cv:data-[side=bottom]:translate-y-1 cv:data-[side=left]:-translate-x-1 cv:data-[side=right]:translate-x-1 cv:data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ i(lm, {}),
        /* @__PURE__ */ i(
          Ce.Viewport,
          {
            className: S(
              "cv:p-1",
              n === "popper" && "cv:h-[var(--radix-select-trigger-height)] cv:w-full cv:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(um, {})
      ]
    }
  ) });
}
function fr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    Ce.Label,
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
    Ce.Item,
    {
      "data-slot": "select-item",
      className: S(
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
const At = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), dm = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", qt = "yyyy-MM-dd";
function mm(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ta(e) {
  if (!e) return;
  const t = _o(e, qt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function vm({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? im, [o, c] = St(!1), s = typeof e == "string", [l, u] = mm(e), d = Ta(l), f = Ta(u), h = d ? { from: d, to: f } : void 0;
  let y;
  s ? y = za(e) : d && f ? y = `${be(d, "MMM d, yyyy")} – ${be(f, "MMM d, yyyy")}` : d ? y = be(d, "MMM d, yyyy") : y = "Pick a date range";
  const p = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Me, { open: o, onOpenChange: c, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(
      U,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          y === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(go, { className: "cv:mr-2 cv:size-4" }),
          y
        ]
      }
    ) }),
    /* @__PURE__ */ v(Le, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: a.map((g) => /* @__PURE__ */ i(
        U,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), c(!1);
          },
          children: za(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        ri,
        {
          mode: "range",
          selected: h,
          defaultMonth: d,
          disabled: p,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([be(g.from, qt), be(g.to, qt)]) : g != null && g.from ? t([be(g.from, qt), be(g.from, qt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const fm = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function hm(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function pm(e) {
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
function gm({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = ei(), o = r.rangeVariable ? pm(a(r.rangeVariable)) : void 0, c = r.options ?? (o !== void 0 ? hm(o) : fm), s = typeof e == "string" ? e : "", l = c.join(",");
  return Zt(() => {
    s && !c.includes(s) && t(c[0]);
  }, [s, l]), /* @__PURE__ */ v(
    Te,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Ee, { className: At, children: /* @__PURE__ */ i(Fe, { placeholder: "—" }) }),
        /* @__PURE__ */ i($e, { children: c.map((u) => /* @__PURE__ */ i(we, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function bm({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((c) => String(c))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(At, "cv:h-auto cv:min-h-[6rem]"),
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
    Te,
    {
      value: a,
      onValueChange: (o) => {
        const c = r.options.find((s) => String(s.value) === o);
        t(c ? c.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(Ee, { className: At, children: /* @__PURE__ */ i(Fe, { placeholder: "—" }) }),
        /* @__PURE__ */ i($e, { children: r.options.map((o) => /* @__PURE__ */ i(we, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function ym({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: o } = ct(), c = ae(() => {
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
function xm({ value: e, onChange: t, control: n }) {
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
function wm({ value: e, onChange: t, control: n }) {
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
function km({ value: e, onChange: t, decl: n }) {
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
const Cm = {
  dateRange: vm,
  granularity: gm,
  select: bm,
  memberSelect: ym,
  text: xm,
  number: wm,
  toggle: km
};
function Nm({ control: e, title: t }) {
  var y;
  const { registry: n } = He(), { decls: r, resolveValue: a, setVar: o } = ei(), c = ae(
    () => r.find((p) => p.name === e.variable),
    [r, e.variable]
  ), s = uo();
  if (!c)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, u = ((y = n.controls) == null ? void 0 : y[l]) ?? Cm[l], d = a(e.variable), f = (p) => o(e.variable, p), h = t ?? c.label ?? c.name;
  return l === "toggle" ? /* @__PURE__ */ i(u, { value: d, onChange: f, decl: c, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: dm, htmlFor: s, children: h }),
    /* @__PURE__ */ i(
      u,
      {
        value: d,
        onChange: f,
        decl: c,
        control: e.control,
        controlId: s
      }
    )
  ] });
}
const ai = w.forwardRef(
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
ai.displayName = "Card";
const oi = w.forwardRef(
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
oi.displayName = "CardHeader";
const ii = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
ii.displayName = "CardTitle";
const Sm = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
Sm.displayName = "CardDescription";
const _m = w.forwardRef(
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
_m.displayName = "CardAction";
const ci = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
ci.displayName = "CardContent";
const Rm = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
Rm.displayName = "CardFooter";
const wn = "cube-viz-drag-handle";
function si(e) {
  var s;
  const { registry: t } = He(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: r, menu: a, dragHandleProps: o, children: c } = e;
  return /* @__PURE__ */ v(ai, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    r ? /* @__PURE__ */ v(
      oi,
      {
        ...o,
        className: S(
          wn,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(ii, { className: "cv:truncate cv:text-sm cv:font-semibold", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ i(ci, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: c })
  ] });
}
class Fa extends tc {
  constructor() {
    super(...arguments);
    ma(this, "state", { error: null });
  }
  static getDerivedStateFromError(n) {
    return { error: n };
  }
  componentDidCatch(n, r) {
    console.error("cube-viz: chart render failed", n, r.componentStack);
  }
  render() {
    const { error: n } = this.state;
    return n ? /* @__PURE__ */ v(On, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Sr, {}),
      /* @__PURE__ */ i(Ln, { children: "Failed to render chart" }),
      /* @__PURE__ */ i(Dn, { children: n.message })
    ] }) : this.props.children;
  }
}
function Am(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const c = o == null ? "" : String(o);
    return /[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
  }, r = t.map(n).join(","), a = e.map((o) => t.map((c) => n(o[c])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function Mm(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), o = document.createElement("a");
  o.href = a, o.download = t, o.click(), URL.revokeObjectURL(a);
}
function Om(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const Lm = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function nt(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let xt = null;
function li(e = {}) {
  return xt || (e.includeStyleProperties ? (xt = e.includeStyleProperties, xt) : (xt = nt(window.getComputedStyle(document.documentElement)), xt));
}
function kn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Dm(e) {
  const t = kn(e, "border-left-width"), n = kn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function zm(e) {
  const t = kn(e, "border-top-width"), n = kn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function ui(e, t = {}) {
  const n = t.width || Dm(e), r = t.height || zm(e);
  return { width: n, height: r };
}
function Tm() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Se = 16384;
function Fm(e) {
  (e.width > Se || e.height > Se) && (e.width > Se && e.height > Se ? e.width > e.height ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se) : e.width > Se ? (e.height *= Se / e.width, e.width = Se) : (e.width *= Se / e.height, e.height = Se));
}
function Cn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Em(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function $m(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), a.appendChild(o), o.appendChild(e), Em(a);
}
const Ne = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || Ne(n, t);
};
function Pm(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Im(e, t) {
  return li(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function jm(e, t, n, r) {
  const a = `.${e}:${t}`, o = n.cssText ? Pm(n) : Im(n, r);
  return document.createTextNode(`${a}{${o}}`);
}
function Ea(e, t, n, r) {
  const a = window.getComputedStyle(e, n), o = a.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const c = Lm();
  try {
    t.className = `${t.className} ${c}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(jm(c, n, a, r)), t.appendChild(s);
}
function Vm(e, t, n) {
  Ea(e, t, ":before", n), Ea(e, t, ":after", n);
}
const $a = "application/font-woff", Pa = "image/jpeg", qm = {
  woff: $a,
  woff2: $a,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Pa,
  jpeg: Pa,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Km(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Hr(e) {
  const t = Km(e).toLowerCase();
  return qm[t] || "";
}
function Hm(e) {
  return e.split(/,/)[1];
}
function hr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Bm(e, t) {
  return `data:${t};base64,${e}`;
}
async function di(e, t, n) {
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
const Xn = {};
function Wm(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Br(e, t, n) {
  const r = Wm(e, t, n.includeQueryParams);
  if (Xn[r] != null)
    return Xn[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const o = await di(e, n.fetchRequestInit, ({ res: c, result: s }) => (t || (t = c.headers.get("Content-Type") || ""), Hm(s)));
    a = Bm(o, t);
  } catch (o) {
    a = n.imagePlaceholder || "";
    let c = `Failed to fetch resource: ${e}`;
    o && (c = typeof o == "string" ? o : o.message), c && console.warn(c);
  }
  return Xn[r] = a, a;
}
async function Um(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : Cn(t);
}
async function Gm(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), c = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, c == null || c.drawImage(e, 0, 0, o.width, o.height);
    const s = o.toDataURL();
    return Cn(s);
  }
  const n = e.poster, r = Hr(n), a = await Br(n, r, t);
  return Cn(a);
}
async function Ym(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await jn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Qm(e, t) {
  return Ne(e, HTMLCanvasElement) ? Um(e) : Ne(e, HTMLVideoElement) ? Gm(e, t) : Ne(e, HTMLIFrameElement) ? Ym(e, t) : e.cloneNode(mi(e));
}
const Jm = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", mi = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Xm(e, t, n) {
  var r, a;
  if (mi(t))
    return t;
  let o = [];
  return Jm(e) && e.assignedNodes ? o = nt(e.assignedNodes()) : Ne(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = nt(e.contentDocument.body.childNodes) : o = nt(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), o.length === 0 || Ne(e, HTMLVideoElement) || await o.reduce((c, s) => c.then(() => jn(s, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function Zm(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : li(n).forEach((o) => {
    let c = a.getPropertyValue(o);
    o === "font-size" && c.endsWith("px") && (c = `${Math.floor(parseFloat(c.substring(0, c.length - 2))) - 0.1}px`), Ne(e, HTMLIFrameElement) && o === "display" && c === "inline" && (c = "block"), o === "d" && t.getAttribute("d") && (c = `path(${t.getAttribute("d")})`), r.setProperty(o, c, a.getPropertyPriority(o));
  });
}
function ev(e, t) {
  Ne(e, HTMLTextAreaElement) && (t.innerHTML = e.value), Ne(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function tv(e, t) {
  if (Ne(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function nv(e, t, n) {
  return Ne(t, Element) && (Zm(e, t, n), Vm(e, t, n), ev(e, t), tv(e, t)), t;
}
async function rv(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const s = n[o].getAttribute("xlink:href");
    if (s) {
      const l = e.querySelector(s), u = document.querySelector(s);
      !l && u && !r[s] && (r[s] = await jn(u, t, !0));
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
async function jn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Qm(r, t)).then((r) => Xm(e, r, t)).then((r) => nv(e, r, t)).then((r) => rv(r, t));
}
const vi = /url\((['"]?)([^'"]+?)\1\)/g, av = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, ov = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function iv(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function cv(e) {
  const t = [];
  return e.replace(vi, (n, r, a) => (t.push(a), n)), t.filter((n) => !hr(n));
}
async function sv(e, t, n, r, a) {
  try {
    const o = n ? Om(t, n) : t, c = Hr(t);
    let s;
    return a || (s = await Br(o, c, r)), e.replace(iv(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function lv(e, { preferredFontFormat: t }) {
  return t ? e.replace(ov, (n) => {
    for (; ; ) {
      const [r, , a] = av.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function fi(e) {
  return e.search(vi) !== -1;
}
async function hi(e, t, n) {
  if (!fi(e))
    return e;
  const r = lv(e, n);
  return cv(r).reduce((o, c) => o.then((s) => sv(s, c, t, n)), Promise.resolve(r));
}
async function wt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const o = await hi(a, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function uv(e, t) {
  await wt("background", e, t) || await wt("background-image", e, t), await wt("mask", e, t) || await wt("-webkit-mask", e, t) || await wt("mask-image", e, t) || await wt("-webkit-mask-image", e, t);
}
async function dv(e, t) {
  const n = Ne(e, HTMLImageElement);
  if (!(n && !hr(e.src)) && !(Ne(e, SVGImageElement) && !hr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Br(r, Hr(r), t);
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
async function mv(e, t) {
  const r = nt(e.childNodes).map((a) => pi(a, t));
  await Promise.all(r).then(() => e);
}
async function pi(e, t) {
  Ne(e, Element) && (await uv(e, t), await dv(e, t), await mv(e, t));
}
function vv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Ia = {};
async function ja(e) {
  let t = Ia[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Ia[e] = t, t;
}
async function Va(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (c) => {
    let s = c.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), di(s, t.fetchRequestInit, ({ result: l }) => (n = n.replace(c, `url(${l})`), [c, l]));
  });
  return Promise.all(o).then(() => n);
}
function qa(e) {
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
async function fv(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        nt(a.cssRules || []).forEach((o, c) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let s = c + 1;
            const l = o.href, u = ja(l).then((d) => Va(d, t)).then((d) => qa(d).forEach((f) => {
              try {
                a.insertRule(f, f.startsWith("@import") ? s += 1 : a.cssRules.length);
              } catch (h) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: h
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            r.push(u);
          }
        });
      } catch (o) {
        const c = e.find((s) => s.href == null) || document.styleSheets[0];
        a.href != null && r.push(ja(a.href).then((s) => Va(s, t)).then((s) => qa(s).forEach((l) => {
          c.insertRule(l, c.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        nt(a.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${a.href}`, o);
      }
  }), n));
}
function hv(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => fi(t.style.getPropertyValue("src")));
}
async function pv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = nt(e.ownerDocument.styleSheets), r = await fv(n, t);
  return hv(r);
}
function gi(e) {
  return e.trim().replace(/["']/g, "");
}
function gv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((o) => {
      t.add(gi(o));
    }), Array.from(r.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function bv(e, t) {
  const n = await pv(e, t), r = gv(e);
  return (await Promise.all(n.filter((o) => r.has(gi(o.style.fontFamily))).map((o) => {
    const c = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return hi(o.cssText, c, t);
  }))).join(`
`);
}
async function yv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await bv(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function xv(e, t = {}) {
  const { width: n, height: r } = ui(e, t), a = await jn(e, t, !0);
  return await yv(a, t), await pi(a, t), vv(a, t), await $m(a, n, r);
}
async function wv(e, t = {}) {
  const { width: n, height: r } = ui(e, t), a = await xv(e, t), o = await Cn(a), c = document.createElement("canvas"), s = c.getContext("2d"), l = t.pixelRatio || Tm(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return c.width = u * l, c.height = d * l, t.skipAutoScale || Fm(c), c.style.width = `${u}`, c.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, c.width, c.height)), s.drawImage(o, 0, 0, c.width, c.height), c;
}
async function kv(e, t = {}) {
  return (await wv(e, t)).toDataURL();
}
function Cv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Nv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Sv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function _v(e, t, n = 2) {
  const r = await kv(e, {
    pixelRatio: n,
    backgroundColor: Sv(e),
    cacheBust: !0
  });
  Nv(r, `${Cv(t)}.png`);
}
function Rv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, o] = w.useState(!1), c = t.length > 0, s = !!r;
  if (!c && !n && !s) return null;
  const l = () => {
    const h = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Mm(Am(t), `${h}.csv`);
  }, u = async () => {
    const h = r == null ? void 0 : r.current;
    if (!(!h || a)) {
      o(!0);
      try {
        await _v(h, e);
      } finally {
        o(!1);
      }
    }
  }, d = (h) => h.stopPropagation(), f = (h = !0) => S(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !h && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(Me, { children: [
    /* @__PURE__ */ i(
      Oe,
      {
        onMouseDown: d,
        onPointerDown: d,
        onTouchStart: d,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(vc, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: d, onPointerDown: d, onTouchStart: d, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ i(fc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      s ? /* @__PURE__ */ v("button", { type: "button", onClick: u, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ i(hc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: l, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ i(pc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export CSV"
      ] })
    ] })
  ] });
}
function Ka({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(Kr, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(am, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(Nm, { control: e.control, title: e.title });
  }
}
function pr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = St({ rows: [] }), o = tt(
    (l) => a({ rows: l.rows, refetch: l.refetch }),
    []
  ), c = mt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(Fa, { children: /* @__PURE__ */ i(Ka, { widget: e }) }) });
  const s = n ? null : /* @__PURE__ */ i(
    Rv,
    {
      title: e.title,
      rows: r.rows,
      refetch: r.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ i(
    si,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(Fa, { children: /* @__PURE__ */ i(Ka, { widget: e, onState: o }) }) })
    }
  );
}
const Av = "lg", Mv = 640;
function Ov(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Lv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function kp({ spec: e, editable: t = !1, families: n }) {
  const [r, a] = ti(), o = e.grid ?? {}, c = o.cols ?? 12, s = o.rowHeight ?? 40, l = o.margin ?? [12, 12], u = o.containerPadding ?? l, d = ae(
    () => ({ [Av]: Lv(e.layout) }),
    [e.layout]
  ), f = ae(
    () => new Map(e.widgets.map((y) => [y.id, y])),
    [e.widgets]
  ), h = !t && a > 0 && a < Mv;
  return /* @__PURE__ */ i(jr, { families: n, children: /* @__PURE__ */ i(Vr, { spec: e, children: /* @__PURE__ */ i("div", { ref: r, className: "cv:w-full", children: a <= 0 ? null : h ? /* @__PURE__ */ i(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: l[1],
        padding: `${u[1]}px ${u[0]}px`
      },
      children: Ov(e.layout).map((y) => {
        const p = f.get(y.i);
        if (!p) return null;
        const g = y.h * s + (y.h - 1) * l[1];
        return /* @__PURE__ */ i("div", { style: { height: g }, children: /* @__PURE__ */ i(pr, { widget: p, editable: !1 }) }, y.i);
      })
    }
  ) : /* @__PURE__ */ i(
    Ro,
    {
      width: a,
      layouts: d,
      breakpoints: { lg: 0 },
      cols: { lg: c },
      rowHeight: s,
      margin: l,
      containerPadding: u,
      dragConfig: { enabled: t, handle: `.${wn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((y) => {
        const p = f.get(y.i);
        return p ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(pr, { widget: p, editable: t }) }, y.i) : null;
      })
    }
  ) }) }) });
}
function Cp({ spec: e, families: t }) {
  return /* @__PURE__ */ i(jr, { families: t, children: /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
    si,
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
      children: /* @__PURE__ */ i(nm, { spec: e })
    }
  ) }) });
}
function Vn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function vt(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function qn(e) {
  return e ? e.cubes.filter((t) => vt(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: Vn(t)
  })) : [];
}
function Ut(e, t) {
  if (!(!e || !t))
    return qn(e).find((n) => n.name === t);
}
function Wr(e) {
  return e.shortTitle || e.title || e.name;
}
function Qt(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function bi(e) {
  return Qt(e.meta, "group");
}
function Dv(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = bi(a), c = o ? `g:${o.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(c);
    s || (s = { label: o ?? t(a), items: [] }, r.set(c, s), n.push(c)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function yi(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Wr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Qt(n, "quantity"),
    unit: Qt(n, "unit")
  };
}
function gr(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Wr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Qt(n, "quantity"),
    unit: Qt(n, "unit")
  };
}
function xi(e, t) {
  return {
    name: e.name,
    label: Wr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function br(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!vt(a) || n && a.name !== n) continue;
    const o = Vn(a), c = (s) => {
      s.connectedComponent = o, r.push(s);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        vt(s) && c(yi(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        vt(s) && s.type !== "time" && c(gr(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        vt(s) && s.type === "time" && c(gr(s, a.name));
  }
  return r;
}
function zv(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!vt(a) || n && !n.has(a.name)) continue;
    const o = Vn(a);
    for (const c of a.segments) {
      if (!vt(c)) continue;
      const s = xi(c, a.name);
      s.connectedComponent = o, r.push(s);
    }
  }
  return r;
}
function Ie(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const r = Vn(n), a = (s) => (s && (s.connectedComponent = r), s), o = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (o)
        return o.type ? "aggType" in o ? a(yi(o, n.name)) : a(gr(o, n.name)) : void 0;
      const c = n.segments.find((s) => s.name === t);
      if (c) return a(xi(c, n.name));
    }
}
function Tv(e) {
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
const yr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), wi = {
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
function Kt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function ki(e) {
  var c, s, l, u, d;
  const t = e.query, n = (c = t.measures) == null ? void 0 : c.find(Boolean);
  if (n) return Kt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return Kt(r);
  const a = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (a) return Kt(a);
  const o = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return Kt(o);
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
function st(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Ci(e, t) {
  const n = {};
  for (const a of e) {
    const o = t[a];
    o && Object.keys(o).length > 0 && (n[a] = o);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Fv = "day";
function Ev(e, t, n) {
  var d, f, h, y;
  const { query: r, chart: a } = e, o = Mt(a).length ? Mt(a) : r.measures ?? [], c = _e(a) ?? ((d = r.dimensions) == null ? void 0 : d[0]) ?? ((h = (f = r.timeDimensions) == null ? void 0 : f[0]) == null ? void 0 : h.dimension), s = c ? { category: { member: c }, series: { mode: "measures", members: o } } : void 0, l = {
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
function jt(e) {
  return Id(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function xr(e) {
  return Vd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function $v(e, t) {
  return t.require(e).wells;
}
function Ae(e) {
  return e.chart.familyOptions ?? {};
}
function Kn(e) {
  const t = Ae(e).series;
  return Array.isArray(t) ? t : [];
}
function Ur(e) {
  const t = Ae(e).columns;
  return Array.isArray(t) ? t : [];
}
function Pv(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function rn(e, t) {
  var c;
  const { chart: n } = e, r = n.family, a = (s) => s ? [s] : [], o = t.require(r).readWells;
  if (o) return o(e);
  switch (r) {
    case "bar":
    case "line":
    case "area": {
      const s = Pv(e), l = (c = n.mapping) == null ? void 0 : c.series;
      return { y: l && l.mode === "pivot" ? l.values && l.values.length > 0 ? l.values : a(l.value) : Mt(n), x: a(_e(n)), color: a(s) };
    }
    case "combo":
      return {
        x: a(_e(n)),
        y: Kn(e).map((s) => s.member)
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
      return { columns: Ur(e).map((s) => s.member) };
    default:
      return {};
  }
}
function Hn(e) {
  const t = Iv(e);
  return t === void 0 ? Fv : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Iv(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function an(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function ht(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Pt(e, t) {
  return { ...e, dimensions: an(e.dimensions, t) };
}
function Ke(e, t) {
  const n = ht(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Ue(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function pt(e, t, n) {
  if (e)
    return { category: { member: e }, series: Ci(t, n) };
}
function Nn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function Sn(e, t, n, r) {
  if (!e || t.length === 0) return;
  const a = {};
  for (const s of t) {
    const l = r == null ? void 0 : r[s];
    l && Object.keys(l).length > 0 && (a[s] = l);
  }
  const o = Object.keys(a).length > 0, c = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: a } : {} };
  return { category: { member: e }, series: c };
}
function Ha(e, t, n, r, a, o) {
  const c = o.require(t).placeField;
  if (c) return c(e, n, r, a);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Vv(e, n, r, a, o);
    case "combo":
      return Hv(e, n, r, a);
    case "pie":
      return Uv(e, n, r, a);
    case "scatter":
      return Yv(e, n, r);
    case "kpi":
      return Jv(e, r);
    case "table":
      return Zv(e, r, a);
    default:
      return e;
  }
}
function jv(e, t, n, r, a) {
  const o = a.require(t).removeField;
  if (o) return o(e, n, r);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Kv(e, n, r, a);
    case "combo":
      return Wv(e, n, r);
    case "pie":
      return Gv(e, n, r);
    case "scatter":
      return Qv(e, n, r);
    case "kpi":
      return Xv(e, r);
    case "table":
      return ef(e, r);
    default:
      return e;
  }
}
function Vv(e, t, n, r, a) {
  const { query: o, chart: c } = e, s = rn(e, a), l = s.color[0], u = _e(c), d = $t(c);
  if (t === "y") {
    const f = s.y, h = an(f, n);
    return l ? {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: Sn(u, h, l, Nn(c)) }
    } : {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: pt(u, h, d) }
    };
  }
  if (t === "x")
    return qv(e, n, r, l, a);
  if (t === "color") {
    const f = s.y;
    if (f.length === 0) return e;
    const h = Pt({ ...o, measures: f }, n);
    return {
      ...e,
      query: h,
      chart: { ...c, mapping: Sn(u, f, n, Nn(c)) }
    };
  }
  return e;
}
function qv(e, t, n, r, a) {
  const { query: o, chart: c } = e, s = _e(c), l = rn(e, a).y, u = $t(c);
  let d = o;
  const f = st(o);
  if (f && s === f.dimension ? d = Ue(d, void 0) : s && (d = Ke(d, s)), n === "time") {
    const y = (f == null ? void 0 : f.granularity) ?? Hn(f == null ? void 0 : f.dateRange);
    d = Ue(d, {
      dimension: t,
      granularity: y,
      dateRange: f == null ? void 0 : f.dateRange
    });
  } else
    d = Pt(d, t);
  const h = r ? Sn(t, l, r, Nn(c)) : pt(t, l, u);
  return { ...e, query: d, chart: { ...c, mapping: h } };
}
function Kv(e, t, n, r) {
  const { query: a, chart: o } = e, c = rn(e, r), s = _e(o), l = c.color[0], u = $t(o);
  if (t === "y") {
    const d = ht(c.y, n);
    if (l && d.length >= 1)
      return {
        ...e,
        query: { ...a, measures: d },
        chart: { ...o, mapping: Sn(s, d, l, Nn(o)) }
      };
    const f = l ? Ke({ ...a, measures: d }, l) : { ...a, measures: d };
    return { ...e, query: f, chart: { ...o, mapping: pt(s, d, u) } };
  }
  if (t === "x") {
    let d = a;
    const f = st(a);
    return f && f.dimension === n ? d = Ue(d, void 0) : d = Ke(d, n), { ...e, query: d, chart: { ...o, mapping: void 0 } };
  }
  if (t === "color") {
    const d = Ke(a, n);
    return {
      ...e,
      query: d,
      chart: { ...o, mapping: pt(s, c.y, u) }
    };
  }
  return e;
}
const Ba = ["line", "bar"];
function Hv(e, t, n, r) {
  const { query: a, chart: o } = e, c = Ae(e);
  if (t === "x") {
    let s = a;
    const l = _e(o), u = st(a);
    if (u && l === u.dimension ? s = Ue(s, void 0) : l && (s = Ke(s, l)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? Hn(u == null ? void 0 : u.dateRange);
      s = Ue(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Pt(s, n);
    return { ...e, query: s, chart: { ...o, mapping: { category: { member: n }, series: Bv(e) } } };
  }
  if (t === "y") {
    const s = Kn(e);
    if (s.some((d) => d.member === n)) return e;
    const l = Ba[s.length % Ba.length], u = [...s, { member: n, render: l }];
    return {
      ...e,
      query: { ...a, measures: an(a.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...c, series: u }, mapping: Ni(o, u) }
    };
  }
  return e;
}
function Ni(e, t) {
  const n = _e(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((r) => r.member) } } : e.mapping;
}
function Bv(e) {
  return { mode: "measures", members: Kn(e).map((t) => t.member) };
}
function Wv(e, t, n) {
  const { query: r, chart: a } = e, o = Ae(e);
  if (t === "x") {
    let c = r;
    const s = st(r);
    return s && s.dimension === n ? c = Ue(c, void 0) : c = Ke(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  if (t === "y") {
    const c = Kn(e).filter((l) => l.member !== n), s = ht(r.measures, n);
    return {
      ...e,
      query: { ...r, measures: s },
      chart: { ...a, familyOptions: { ...o, series: c }, mapping: Ni(a, c) }
    };
  }
  return e;
}
function Uv(e, t, n, r) {
  const { query: a, chart: o } = e, c = $t(o);
  if (t === "slices") {
    let s = a;
    const l = _e(o), u = st(a);
    if (u && l === u.dimension ? s = Ue(s, void 0) : l && (s = Ke(s, l)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? Hn(u == null ? void 0 : u.dateRange);
      s = Ue(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Pt(s, n);
    return {
      ...e,
      query: s,
      chart: { ...o, mapping: pt(n, Mt(o), c) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...o, mapping: pt(_e(o), s, c) }
    };
  }
  return e;
}
function Gv(e, t, n) {
  const { query: r, chart: a } = e, o = $t(a);
  if (t === "slices") {
    let c = r;
    const s = st(r);
    return s && s.dimension === n ? c = Ue(c, void 0) : c = Ke(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: pt(_e(a), [], o) }
  } : e;
}
const Si = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Yv(e, t, n) {
  const r = Si[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...Ae(e) }, s = c[r];
  c[r] = n;
  let l = a;
  if (r === "groupBy")
    s && s !== n && (l = Ke(l, s)), l = Pt(l, n);
  else {
    const u = s ? ht(a.measures, s) : a.measures;
    l = { ...a, measures: an(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: c } };
}
function Qv(e, t, n) {
  const r = Si[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...Ae(e) };
  delete c[r];
  let s = a;
  if (r === "groupBy") s = Ke(s, n);
  else {
    const l = ht(a.measures, n);
    s = { ...a, measures: l.length ? l : [] };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: c } };
}
function Jv(e, t) {
  const { query: n, chart: r } = e, a = { ...Ae(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function Xv(e, t) {
  const { query: n, chart: r } = e, a = { ...Ae(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function Zv(e, t, n) {
  const { query: r, chart: a } = e, o = Ur(e);
  if (o.some((l) => l.member === t)) return e;
  let c = r;
  if (n === "number") c = { ...r, measures: an(r.measures, t) };
  else if (n === "time") {
    const l = st(r), u = (l == null ? void 0 : l.granularity) ?? Hn(l == null ? void 0 : l.dateRange), d = r.timeDimensions ?? [];
    d.some((f) => f.dimension === t) || (c = { ...r, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else c = Pt(r, t);
  const s = { ...Ae(e), columns: [...o, { member: t }] };
  return { ...e, query: c, chart: { ...a, familyOptions: s } };
}
function ef(e, t) {
  var d, f, h;
  const { query: n, chart: r } = e, a = Ur(e).filter((y) => y.member !== t);
  let o = n;
  const c = ht(n.measures, t);
  c.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: c.length ? c : void 0 });
  const s = ht(n.dimensions, t);
  s.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: s.length ? s : void 0 });
  const l = (n.timeDimensions ?? []).filter((y) => y.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...Ae(e), columns: a };
  return { ...e, query: o, chart: { ...r, familyOptions: u } };
}
const pe = w.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      ref: r,
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
pe.displayName = "Input";
function _n(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(yo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(bo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(Rr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function _i({
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
  const { meta: u, isLoading: d } = ct(), f = w.useMemo(() => {
    if (t) {
      const g = new Set(t);
      return br(u, n).filter((b) => g.has(b.cube));
    }
    return br(u, n, e);
  }, [u, n, e, t]), h = w.useMemo(() => {
    const g = tf(f), b = g.length > 1, k = [];
    for (const [x, _] of g)
      for (const [C, N] of Dv(_, () => "Other")) {
        const M = b ? C === "Other" ? x : `${x} · ${C}` : C;
        k.push({ key: `${x}:${C}`, label: M, items: N });
      }
    return k;
  }, [f]), y = h.length > 1, p = f.find((g) => g.name === r);
  return /* @__PURE__ */ v(Te, { value: r, onValueChange: a, disabled: c || d, children: [
    /* @__PURE__ */ i(Ee, { id: s, className: l, children: /* @__PURE__ */ i(Fe, { placeholder: d ? "Loading…" : o, children: p ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      _n(p.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i($e, { children: h.map((g) => /* @__PURE__ */ v(vr, { children: [
      y && g.label ? /* @__PURE__ */ i(fr, { children: g.label }) : null,
      g.items.map((b) => /* @__PURE__ */ i(we, { value: b.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        _n(b.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: b.label })
      ] }) }, b.name))
    ] }, g.key)) })
  ] });
}
function tf(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Jt({
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
const Wa = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(bo, { className: "cv:size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(Rr, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(yo, { className: "cv:size-3" }), metaKind: "time" }
}, nf = ["number", "category", "time"];
function Ri({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: o = "start",
  side: c = "bottom",
  children: s
}) {
  var T, z;
  const { meta: l, isLoading: u } = ct(), [d, f] = w.useState(!1), [h, y] = w.useState(""), [p, g] = w.useState(n.viewLocked ?? "tables"), [b, k] = w.useState({});
  w.useEffect(() => {
    d && g(n.viewLocked ?? "tables");
  }, [d, n.viewLocked]);
  const x = w.useMemo(() => new Set(t), [t]), _ = h.trim().toLowerCase(), C = w.useMemo(() => {
    if (p !== "tables") {
      const L = n.views.find((X) => X.name === p) ?? Ut(l, p);
      return L ? [{ cube: L, tag: "dataset" }] : [];
    }
    const R = [];
    n.sourceCube && R.push({ cube: n.sourceCube, tag: "source" });
    for (const L of n.relatedCubes) R.push({ cube: L, tag: "related" });
    return R;
  }, [p, n, l]), N = e.kinds.length > 1, M = (R) => {
    const L = [], X = /* @__PURE__ */ new Map();
    for (const Z of nf) {
      if (!e.kinds.includes(Z)) continue;
      const ee = Wa[Z];
      for (const $ of br(l, ee.metaKind, R)) {
        if (x.has($.name) || _ && !($.label.toLowerCase().includes(_) || $.name.toLowerCase().includes(_))) continue;
        const G = bi($), B = G ? `g:${G.toLowerCase()}` : `k:${Z}`;
        let K = X.get(B);
        K || (K = { key: B, label: G ?? ee.label, headerIcon: G ? void 0 : ee.icon, items: [] }, X.set(B, K), L.push(B)), K.items.push({ option: $, kind: Z });
      }
    }
    return L.map((Z) => X.get(Z));
  }, E = C.map((R) => ({ section: R, groups: M(R.cube.name) })).filter((R) => R.groups.length > 0), q = E.length > 0, D = (R, L) => {
    a(R, L), f(!1), y("");
  }, O = p === "tables" ? "All related tables" : ((T = n.views.find((R) => R.name === p)) == null ? void 0 : T.title) ?? ((z = Ut(l, p)) == null ? void 0 : z.title) ?? p;
  return /* @__PURE__ */ v(Me, { open: d, onOpenChange: f, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: s }),
    /* @__PURE__ */ v(Le, { align: o, side: c, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(gc, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: h,
              onChange: (R) => y(R.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(rf, { browse: p, label: O, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: q ? E.map(({ section: R, groups: L }, X) => {
        const Z = L.reduce((B, K) => B + K.items.length, 0), ee = R.tag === "related", $ = b[R.cube.name] ?? ee, G = _.length > 0 ? !0 : !$;
        return /* @__PURE__ */ v("div", { children: [
          R.tag === "related" && X > 0 && E[X - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => k((B) => ({ ...B, [R.cube.name]: !$ })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                G ? /* @__PURE__ */ i(ot, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(en, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(xo, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: R.cube.title }),
                R.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : R.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: Z })
              ]
            }
          ),
          G ? L.map((B) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            L.length > 1 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              B.headerIcon,
              B.label
            ] }) : null,
            B.items.map(({ option: K, kind: ce }) => /* @__PURE__ */ i(
              af,
              {
                option: K,
                kindIcon: N ? Wa[ce].icon : void 0,
                reason: r(K),
                onPick: () => D(K.name, ce)
              },
              K.name
            ))
          ] }, B.key)) : null
        ] }, R.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function rf({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, o] = w.useState(!1), c = (s) => {
    r(s), o(!1);
  };
  return /* @__PURE__ */ v(Me, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Oe,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(wo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Le, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(Ua, { active: e === "tables", icon: /* @__PURE__ */ i(xo, { className: "cv:size-3.5" }), onClick: () => c("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(ie, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ i(
          Ua,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ i(Ar, { className: "cv:size-3.5" }),
            onClick: () => c(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function Ua({
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
      className: S(
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
function af({ option: e, reason: t, onPick: n, kindIcon: r }) {
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
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:truncate", children: e.label })
      ]
    }
  );
}
const of = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Ht = "yyyy-MM-dd";
function cf(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ga(e) {
  if (!e) return;
  const t = _o(e, Ht, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Gr({ value: e, onChange: t }) {
  const [n, r] = w.useState(!1), a = typeof e == "string", [o, c] = cf(e), s = Ga(o), l = Ga(c), u = s ? { from: s, to: l } : void 0, d = a ? e : s && l ? `${be(s, "MMM d, yyyy")} – ${be(l, "MMM d, yyyy")}` : s ? be(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Me, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(go, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", d === "Any time" && "cv:text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ v(Le, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        of.map((f) => /* @__PURE__ */ i(
          U,
          {
            variant: "ghost",
            size: "sm",
            className: S("cv:justify-start cv:font-normal", e === f && "cv:bg-accent"),
            onClick: () => {
              t(f), r(!1);
            },
            children: f
          },
          f
        )),
        /* @__PURE__ */ i(
          U,
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
        ri,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([be(f.from, Ht), be(f.to, Ht)]) : f != null && f.from ? t([be(f.from, Ht), be(f.from, Ht)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function sf(e) {
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
function lf(e, t) {
  const n = new Set(sf(t));
  return e.filter((r) => n.has(r.type));
}
function uf(e) {
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
function df(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = a, c = 2;
  for (; r.has(o); ) o = `${a}_${c++}`;
  return o;
}
function mf(e, t, n) {
  const r = uf(e), a = { name: df(t, e, n), type: r }, o = t.trim();
  return o && (a.label = o), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const Ai = w.createContext({});
function vf({
  createVariable: e,
  children: t
}) {
  const n = w.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(Ai.Provider, { value: n, children: t });
}
function ff() {
  return w.useContext(Ai);
}
function hf({ kind: e, value: t, onChange: n, className: r }) {
  const a = qr(), o = (a == null ? void 0 : a.decls) ?? [], { createVariable: c } = ff(), [s, l] = w.useState(!1), [u, d] = w.useState(!1), [f, h] = w.useState(""), y = w.useMemo(() => lf(o, e), [o, e]), p = y.find((k) => k.name === t), g = (k) => {
    n(k), l(!1), d(!1);
  }, b = () => {
    if (!c) return;
    const k = mf(e, f || "Variable", o);
    c(k), g(k.name), h("");
  };
  return /* @__PURE__ */ v(
    Me,
    {
      open: s,
      onOpenChange: (k) => {
        l(k), k || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", r), children: [
          /* @__PURE__ */ i(bc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !p && "cv:text-muted-foreground"), children: p ? p.label ?? p.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Le, { align: "start", className: "cv:w-60 cv:p-1", children: [
          y.length > 0 ? y.map((k) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => g(k.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: k.label ?? k.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: k.type }),
                k.name === t ? /* @__PURE__ */ i(je, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            k.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          c ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              pe,
              {
                autoFocus: !0,
                value: f,
                onChange: (k) => h(k.target.value),
                onKeyDown: (k) => {
                  k.key === "Enter" && b(), k.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "cv:h-7 cv:text-sm"
              }
            ),
            /* @__PURE__ */ i(U, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: b, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
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
  const a = ze(t), [o, c] = w.useState(a ? "var" : "fixed");
  w.useEffect(() => {
    a && c("var");
  }, [a]);
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
            c("fixed"), ze(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: s(o === "var"), onClick: () => c("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      hf,
      {
        kind: e,
        value: ze(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : r(ze(t) ? void 0 : t, (l) => n(l))
  ] });
}
const pf = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Zn(e) {
  return "member" in e && "operator" in e;
}
function gf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: o,
  className: c
}) {
  var O;
  const { meta: s } = ct(), l = ((O = qr()) == null ? void 0 : O.decls) ?? [], [u, d] = w.useState(null), [f, h] = w.useState(null), y = r ?? [], p = y.length === 1 && !Zn(y[0]) && "or" in y[0] && Array.isArray(y[0].or) && y[0].or.every(Zn) ? y[0] : void 0, g = p ? "any" : "all", b = [], k = [];
  p || y.forEach((T) => Zn(T) ? b.push(T) : k.push(T));
  const x = p ? p.or : b, _ = k.length === 0 && (x.length >= 2 || g === "any"), C = (T) => g === "any" ? T.length ? [{ or: T }] : [] : [...T, ...k], N = (T) => {
    const z = T.filter((L) => L.member.length > 0), R = C(z);
    a(R.length > 0 ? R : void 0);
  }, M = (T) => {
    const z = T === "any" ? x.length ? [{ or: x }] : [] : [...x];
    a(z.length > 0 ? z : void 0);
  }, E = (T, z) => N(x.map((R, L) => L === T ? { ...R, ...z } : R)), q = (T) => N(x.filter((z, R) => R !== T)), D = (T) => {
    const R = { ...f ?? { member: "", operator: "equals", values: [] }, ...T };
    R.member ? (h(null), d(x.length), N([...x, R])) : h(R);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", c), children: [
    x.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    _ ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        Jt,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: g,
          onChange: M
        }
      ),
      /* @__PURE__ */ i("span", { children: "of these" })
    ] }) : null,
    x.map((T, z) => {
      const R = Ie(s, T.member);
      return u === z ? /* @__PURE__ */ i(
        Ya,
        {
          leaf: T,
          member: R,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (L) => E(z, L),
          onDone: () => d(null),
          onRemove: () => q(z)
        },
        z
      ) : /* @__PURE__ */ i(
        bf,
        {
          text: yf(T, R == null ? void 0 : R.label, l),
          disabled: o,
          onEdit: () => d(z),
          onRemove: () => q(z)
        },
        z
      );
    }),
    f ? /* @__PURE__ */ i(
      Ya,
      {
        leaf: f,
        member: Ie(s, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: D,
        onRemove: () => h(null)
      }
    ) : null,
    k.length > 0 ? /* @__PURE__ */ v("p", { className: "cv:text-xs cv:text-muted-foreground", children: [
      k.length,
      " grouped filter",
      k.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ v(
      U,
      {
        variant: "outline",
        size: "sm",
        className: "cv:w-full cv:justify-start",
        disabled: o || !!f,
        onClick: () => {
          d(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(_t, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function bf({
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
      U,
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
function Ya({
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
  const u = Tv(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], f = !yr.has(d);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        s && e.member ? /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: s, children: [
          /* @__PURE__ */ i(je, { className: "cv:size-3.5" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ i(
          U,
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
          Ri,
          {
            well: pf,
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
                    _n(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(ot, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        _i,
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
        Te,
        {
          value: d,
          onValueChange: (h) => c({
            operator: h,
            values: yr.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Ee, { className: "cv:w-full", children: /* @__PURE__ */ i(Fe, {}) }),
            /* @__PURE__ */ i($e, { children: u.map((h) => /* @__PURE__ */ i(we, { value: h, children: wi[h] }, h)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        xf,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => c({ values: h })
        }
      )
    ] }) : null
  ] });
}
function yf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = wi[e.operator] ?? e.operator;
  if (yr.has(e.operator)) return `${r} ${a}`;
  const o = (e.values ?? []).map((c) => {
    if (ze(c)) {
      const s = n.find((l) => l.name === c.var);
      return `{${((s == null ? void 0 : s.label) ?? c.var).replace(/[{}]/g, "")}}`;
    }
    return String(c);
  });
  return o.length > 0 ? `${r} ${a} ${o.join(", ")}` : `${r} ${a} …`;
}
function xf({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && ze(r[0]);
  if (t === "time") {
    const s = a ? r[0] : wf(r);
    return /* @__PURE__ */ i(
      Ot,
      {
        kind: "dateRange",
        value: s,
        onChange: (l) => n(l === void 0 ? [] : ze(l) ? [l] : kf(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(Gr, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? r[0] : r.filter((s) => !ze(s));
  return /* @__PURE__ */ i(
    Ot,
    {
      kind: o,
      value: c,
      onChange: (s) => n(s === void 0 ? [] : ze(s) ? [s] : s),
      renderFixed: (s, l) => /* @__PURE__ */ i(
        pe,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => l(Cf(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function wf(e) {
  const t = e.filter((n) => !ze(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function kf(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Cf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Nf({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: o } = e, c = (o.filters ?? []).length, s = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(Me, { children: [
    /* @__PURE__ */ v(
      Oe,
      {
        className: S(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          c > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(yc, { className: "cv:size-4" }),
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
      /* @__PURE__ */ i(Sf, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ i(gf, { cube: n, cubes: r, scope: a, value: o.filters, onChange: s })
    ] })
  ] });
}
function Sf({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = ct(), a = zv(r, n);
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
function _f({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: r } = ct(), a = w.useMemo(() => qn(r), [r]), o = a.filter((b) => b.type === "view"), c = a.filter((b) => b.type === "cube"), s = a.find((b) => b.name === e), [l, u] = w.useState(!1), [d, f] = w.useState(null), h = (b) => {
    if (b === e) {
      u(!1);
      return;
    }
    t ? f(b) : (n(b), u(!1));
  }, y = () => {
    d && n(d), f(null), u(!1);
  }, p = d ? ((g = a.find((b) => b.name === d)) == null ? void 0 : g.title) ?? d : "";
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
              /* @__PURE__ */ i(wo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !s && "cv:text-muted-foreground"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Le, { align: "start", className: "cv:w-64 cv:p-1", children: d ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: p }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(U, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(U, { size: "sm", className: "cv:h-7", onClick: y, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(ie, { children: [
            /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
            o.map((b) => /* @__PURE__ */ i(
              Qa,
              {
                icon: /* @__PURE__ */ i(Ar, { className: "cv:size-3.5" }),
                label: b.title,
                active: b.name === e,
                onClick: () => h(b.name)
              },
              b.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Tables" }),
          c.map((b) => /* @__PURE__ */ i(
            Qa,
            {
              icon: /* @__PURE__ */ i(ko, { className: "cv:size-3.5" }),
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
function Qa({
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
      className: S(
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
function Ja(e, t, n, r) {
  var o;
  const a = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Xa({
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
      className: S(
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
            onChange: (l) => Ja(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          Af,
          {
            hidden: c,
            what: "axis title",
            onClick: () => Ja(e, t, n, { labelHide: c ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Rf({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
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
          n ? /* @__PURE__ */ i(Co, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(No, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Af({
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
      children: e ? /* @__PURE__ */ i(Co, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(No, { className: "cv:size-3.5" })
    }
  );
}
const Mi = w.forwardRef(
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
Mi.displayName = "Label";
function fe({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: o,
  children: c
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: S("cv:flex cv:flex-col cv:gap-1.5 cv:py-1.5", o), children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i(Mi, { htmlFor: r, className: "cv:text-muted-foreground", children: e }),
      a ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: a }) : null
    ] }),
    c,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function wr({
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
  onChange: r,
  disabled: a,
  className: o
}) {
  const c = w.useId();
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
              a ? "cv:cursor-not-allowed cv:opacity-70" : "cv:cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:leading-none", children: e }),
              t ? /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ i(wr, { id: c, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function Mf({ spec: e, update: t }) {
  var p, g;
  const n = yt(), { chart: r } = e, a = r.family, o = r.familyOptions ?? {}, c = n.require(a);
  if (c.Customize) {
    const b = c.Customize;
    return /* @__PURE__ */ i(b, { spec: e, update: t });
  }
  const s = (b) => t({ ...e, chart: { ...r, ...b } }), l = (b) => t({ ...e, chart: { ...r, familyOptions: { ...o, ...b } } }), u = ((g = (p = r.mapping) == null ? void 0 : p.series) == null ? void 0 : g.mode) === "pivot" ? "stacked" : "none", d = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", h = /* @__PURE__ */ i(fe, { label: "Stacked", children: /* @__PURE__ */ i(
    Jt,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: d === "stacked" ? "stacked" : d === "percent" ? "percent" : "none",
      onChange: (b) => s({ stackMode: b })
    }
  ) }), y = (() => {
    var b, k;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            xe,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (x) => s({ orientation: x ? "horizontal" : "vertical" })
            }
          ),
          h
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(ie, { children: [
          h,
          r.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((k = (b = r.mapping) == null ? void 0 : b.series) == null ? void 0 : k.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            xe,
            {
              label: "Donut",
              checked: typeof o.innerRadiusPct == "number" && o.innerRadiusPct > 0,
              onChange: (x) => l({ innerRadiusPct: x ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(fe, { label: "Slice labels", children: /* @__PURE__ */ i(
            Jt,
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
              onChange: (x) => l({ showLabels: x })
            }
          ) }),
          /* @__PURE__ */ i(Lf, { label: "Max slices", children: /* @__PURE__ */ i(
            pe,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: o.maxSlices ?? "",
              placeholder: "8",
              onChange: (x) => {
                const _ = parseInt(x.target.value, 10);
                l({ maxSlices: Number.isFinite(_) && _ > 0 ? _ : void 0 });
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
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            xe,
            {
              label: "Compact rows",
              checked: o.rowHeight === "compact",
              onChange: (x) => l({ rowHeight: x ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Sortable columns",
              checked: o.sortable !== !1,
              onChange: (x) => l({ sortable: x })
            }
          ),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Sticky header",
              checked: o.stickyHeader !== !1,
              onChange: (x) => l({ stickyHeader: x })
            }
          ),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Row numbers",
              checked: o.showRowNumbers === !0,
              onChange: (x) => l({ showRowNumbers: x })
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
function Of(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0;
}
function Lf({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Oi(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Ev(e, r, n));
  };
}
function Df({ spec: e, update: t, empty: n }) {
  const r = yt(), a = e.chart.family, o = Oi(e, t, r);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(Li, { family: a, onPick: o, families: r })
  ] }) }) : null;
}
function zf({ spec: e, update: t }) {
  const n = yt(), r = e.chart.family, a = Oi(e, t, n), o = n.require(r), c = o.icon;
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
          /* @__PURE__ */ i(ot, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Le, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(Li, { family: r, onPick: a, families: n })
      ] }),
      Of(r, n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(Mf, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function Li({ family: e, onPick: t, families: n }) {
  return /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-4 cv:gap-1.5", children: n.families().map((r) => {
    const a = n.require(r).icon, o = r === e;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => t(r),
        "aria-pressed": o,
        className: S(
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
function Tf(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Ff(e, t, n, r, a, o) {
  var Qr, Jr, Xr, Zr, ea, ta, na, ra, aa, oa, ia, ca, sa, la;
  const { chart: c, query: s } = e, l = c.family, u = n.kinds.length === 1 ? n.kinds[0] : Ef(a), d = c.familyOptions ?? {}, f = Array.isArray(d.series) ? d.series : [], h = Array.isArray(d.columns) ? d.columns : [], y = $t(c), p = y[r], g = l === "combo" && n.id === "y", b = l === "table" && n.id === "columns", k = l === "bar" || l === "line" || l === "area", x = ((Jr = (Qr = c.mapping) == null ? void 0 : Qr.series) == null ? void 0 : Jr.mode) === "measures", _ = k && n.id === "y", C = _ && x, N = g ? (Xr = f.find((j) => j.member === r)) == null ? void 0 : Xr.label : b ? (Zr = h.find((j) => j.member === r)) == null ? void 0 : Zr.label : C ? p == null ? void 0 : p.label : void 0, M = g ? (ea = f.find((j) => j.member === r)) == null ? void 0 : ea.colorToken : C ? p == null ? void 0 : p.colorToken : void 0, E = st(s), q = n.kinds.includes("time") && (E == null ? void 0 : E.dimension) === r, D = q ? E == null ? void 0 : E.granularity : void 0, O = q ? E == null ? void 0 : E.dateRange : void 0, T = g ? ((ta = f.find((j) => j.member === r)) == null ? void 0 : ta.render) ?? "line" : void 0, z = l === "line" && n.id === "y", R = l === "bar" && n.id === "y" && c.orientation !== "horizontal", L = ((ra = (na = c.mapping) == null ? void 0 : na.series) == null ? void 0 : ra.mode) === "pivot", X = ((oa = (aa = c.mapping) == null ? void 0 : aa.series) == null ? void 0 : oa.mode) === "pivot" ? c.mapping.series.meta : void 0, Z = (z || R) && (x || L) || g, ee = Z ? (g ? (ia = f.find((j) => j.member === r)) == null ? void 0 : ia.axis : x ? p == null ? void 0 : p.axis : (ca = X == null ? void 0 : X[r]) == null ? void 0 : ca.axis) ?? "left" : void 0, B = (l === "line" || l === "area") && n.id === "y" && x || g && (T === "line" || T === "area"), K = g ? f.find((j) => j.member === r) : void 0, ce = B ? g ? K == null ? void 0 : K.curve : p == null ? void 0 : p.curve : void 0, ue = B ? g ? K == null ? void 0 : K.dots : p == null ? void 0 : p.dots : void 0, H = (j) => {
    var ua, da;
    if ((ua = c.mapping) != null && ua.series && c.mapping.series.mode !== "measures") return;
    const de = ((da = c.mapping) != null && da.series && c.mapping.series.mode === "measures" ? c.mapping.series.members : s.measures) ?? [], me = { ...y };
    j && Object.keys(j).length > 0 ? me[r] = j : delete me[r];
    const It = _e(c);
    It && t({
      ...e,
      chart: {
        ...c,
        mapping: { category: { member: It }, series: Ci(de, me) }
      }
    });
  }, P = (j) => {
    const de = f.map((me) => me.member === r ? { ...me, ...j } : me);
    t({ ...e, chart: { ...c, familyOptions: { ...d, series: de } } });
  }, V = (j) => {
    const de = h.map((me) => me.member === r ? { ...me, ...j } : me);
    t({ ...e, chart: { ...c, familyOptions: { ...d, columns: de } } });
  }, J = (j) => {
    g ? P({ label: j }) : b ? V({ label: j }) : C && H({ ...p, label: j });
  }, ne = (j) => {
    g ? P({ colorToken: j ?? void 0 }) : C && H({ ...p, colorToken: j ?? void 0 });
  }, he = (j) => {
    if (!E) return;
    const de = { ...E };
    for (const me of Object.keys(j)) {
      const It = j[me];
      It === void 0 ? delete de[me] : de[me] = It;
    }
    t({ ...e, query: { ...s, timeDimensions: [de] } });
  }, ye = (j) => he({ granularity: j }), Ye = (j) => he({ dateRange: j }), Pe = (j) => P({ render: j }), Y = (j) => {
    var de, me;
    g ? P({ axis: j }) : C ? H({ ...p, axis: j }) : ((me = (de = c.mapping) == null ? void 0 : de.series) == null ? void 0 : me.mode) === "pivot" && t(Di(e, l, r, j));
  }, Q = (j) => {
    g ? P({ curve: j }) : C && H({ ...p, curve: j });
  }, ge = (j) => {
    g ? P({ dots: j }) : C && H({ ...p, dots: j });
  }, lt = () => t(jv(e, l, n.id, r, o)), Be = (n.id === "x" || n.id === "slices") && (u === "category" || u === "time"), A = (sa = c.mapping) == null ? void 0 : sa.series, F = (A && A.mode === "pivot" ? A.value : Mt(c)[0]) ?? ((la = s.measures) == null ? void 0 : la[0]), I = Be ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...F ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...F ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], W = (() => {
    const j = Tf(s.order)[0];
    if (!j) return "none";
    const [de, me] = j;
    return F && de === F ? me === "desc" ? "value-desc" : "value-asc" : de === r ? u === "time" ? me === "desc" ? "time-desc" : "time-asc" : me === "asc" ? "label-asc" : "label-desc" : "none";
  })(), re = (j) => {
    let de;
    switch (j) {
      case "none":
        de = void 0;
        break;
      case "value-desc":
        de = F ? [[F, "desc"]] : void 0;
        break;
      case "value-asc":
        de = F ? [[F, "asc"]] : void 0;
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
  }, le = typeof s.limit == "number" ? s.limit : void 0, se = (j) => t({ ...e, query: { ...s, limit: j && j > 0 ? j : void 0 } }), ut = (l === "bar" || l === "line" || l === "area") && q, Pi = ut && d.comparePrevious === !0;
  return {
    kind: u,
    label: N,
    colorToken: M,
    granularity: D,
    dateRange: O,
    render: T,
    axis: ee,
    curve: ce,
    dots: ue,
    canLineStyle: B,
    canAxis: Z,
    canRename: g || b || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: _ && x || g,
    isTimeField: q,
    isComboY: g,
    isCategoryField: Be,
    sortValue: W,
    sortOptions: I,
    onSort: re,
    limit: le,
    onLimit: se,
    canComparePrevious: ut,
    comparePrevious: Pi,
    comparePreviousReady: ut && O !== void 0,
    onComparePrevious: (j) => t({ ...e, chart: { ...c, familyOptions: { ...d, comparePrevious: j || void 0 } } }),
    onRename: J,
    onRecolor: ne,
    onGranularity: ye,
    onDateRange: Ye,
    onRender: Pe,
    onAxis: Y,
    onCurve: Q,
    onDots: ge,
    onRemove: lt
  };
}
function Di(e, t, n, r) {
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
function Ef(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Za(e, t, n, r) {
  var f;
  const { chart: a, query: o } = e, c = a.family, s = (h) => {
    if (r < 0 || r >= h.length || n === r) return h;
    const y = h.slice(), [p] = y.splice(n, 1);
    return y.splice(r, 0, p), y;
  };
  if (c === "combo" && t.id === "y") {
    const h = a.familyOptions ?? {}, y = s(Array.isArray(h.series) ? h.series : []), p = s(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: p },
      chart: { ...a, familyOptions: { ...h, series: y } }
    };
  }
  if (c === "table" && t.id === "columns") {
    const h = a.familyOptions ?? {}, y = s(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...h, columns: y } } };
  }
  const l = s(o.measures ?? []), u = (f = a.mapping) == null ? void 0 : f.series;
  let d = a.mapping;
  if (u && u.mode === "measures")
    d = { ...a.mapping, series: { ...u, members: l } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = s(u.values);
    d = { ...a.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...o, measures: l }, chart: { ...a, mapping: d } };
}
function $f(e, t, n, r) {
  const a = qn(e), o = a.filter((C) => C.type === "view"), c = rn(t, r), s = Object.values(c).flat();
  let l;
  for (const C of s) {
    const N = Ie(e, C);
    if (N) {
      l = N;
      break;
    }
  }
  const u = !l && n ? Ut(e, n) : void 0, d = l ? Ut(e, l.cube) : u, f = (d == null ? void 0 : d.type) === "view" ? d.name : void 0, h = (l == null ? void 0 : l.connectedComponent) ?? (u == null ? void 0 : u.connectedComponent), y = t.query.measures ?? [], p = y.length ? Kt(y[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: o, measureSource: p, scopeComponent: h };
  const g = p ?? (l == null ? void 0 : l.cube) ?? (u == null ? void 0 : u.name), b = g ? Ut(e, g) : void 0, k = a.filter((C) => C.type === "cube" && C.connectedComponent !== void 0), _ = (h === void 0 ? k : k.filter((C) => C.connectedComponent === h)).filter((C) => C.name !== g).sort((C, N) => C.title.localeCompare(N.title));
  return {
    sourceCube: (b == null ? void 0 : b.type) === "cube" ? b : void 0,
    relatedCubes: _,
    views: o,
    measureSource: p,
    scopeComponent: h
  };
}
const Pf = at.options;
function If({
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
      className: S("cv:flex cv:flex-wrap cv:items-center cv:gap-1.5", a),
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
            className: S(
              "cv:relative cv:flex cv:size-6 cv:items-center cv:justify-center cv:rounded-full cv:border cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
              e === void 0 ? "cv:border-ring cv:ring-2 cv:ring-ring/40" : "cv:border-input cv:hover:border-ring"
            ),
            children: "A"
          }
        ) : null,
        Pf.map((o) => {
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
const jf = ft.options, Vf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function zi({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: o,
  className: c
}) {
  const s = n && n.length > 0 ? n : jf;
  return /* @__PURE__ */ v(
    Te,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: a,
      children: [
        /* @__PURE__ */ i(Ee, { id: o, className: c, children: /* @__PURE__ */ i(Fe, { placeholder: r }) }),
        /* @__PURE__ */ i($e, { children: s.map((l) => /* @__PURE__ */ i(we, { value: l, children: Vf[l] }, l)) })
      ]
    }
  );
}
const eo = { bar: "Bar", line: "Line", area: "Area" }, qf = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Kf({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: o,
  reorder: c,
  className: s
}) {
  const l = yt(), u = Ff(e, t, n, r, a, l), d = (a == null ? void 0 : a.label) ?? r, f = u.label || d, h = u.canColor && o !== void 0, y = u.canRename || h || u.isTimeField || u.isCategoryField || u.isComboY && !!u.render || u.canAxis || u.canLineStyle || !!c, p = (b) => {
    const k = b.trim();
    u.onRename(k.length > 0 ? k : void 0);
  }, g = /* @__PURE__ */ v(ie, { children: [
    h ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : a ? _n(a.type) : null,
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
        y ? /* @__PURE__ */ v(Me, { children: [
          /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${f}`,
              children: g
            }
          ) }),
          /* @__PURE__ */ i(Le, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            u.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                pe,
                {
                  defaultValue: u.label ?? "",
                  placeholder: d,
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
              /* @__PURE__ */ i(If, { value: u.colorToken, onChange: u.onRecolor })
            ] }) : null,
            u.isTimeField ? /* @__PURE__ */ v(ie, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  Ot,
                  {
                    kind: "dateRange",
                    value: u.dateRange,
                    onChange: u.onDateRange,
                    renderFixed: (b, k) => /* @__PURE__ */ i(Gr, { value: b, onChange: k })
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
                    renderFixed: (b, k) => /* @__PURE__ */ i(zi, { value: b, onChange: k, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              u.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    wr,
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
            u.isCategoryField ? /* @__PURE__ */ v(ie, { children: [
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
                      const k = b.target.value.trim();
                      u.onLimit(k === "" ? void 0 : Number(k));
                    },
                    onKeyDown: (b) => {
                      if (b.key === "Enter") {
                        const k = b.target.value.trim();
                        u.onLimit(k === "" ? void 0 : Number(k)), b.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            u.isComboY && u.render ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Draw as" }),
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: Object.keys(eo).map((b) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => u.onRender(b),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                    u.render === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    eo[b],
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
                  className: S(
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
            u.canLineStyle ? /* @__PURE__ */ v(ie, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: qf.map(([b, k]) => /* @__PURE__ */ v(
                  "button",
                  {
                    type: "button",
                    onClick: () => u.onCurve(b),
                    className: S(
                      "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                      (u.curve ?? "cv:monotone") === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                    ),
                    children: [
                      k,
                      (u.curve ?? "monotone") === b ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
                    ]
                  },
                  b
                )) })
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(wr, { checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
              ] })
            ] }) : null,
            c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1", children: [
              /* @__PURE__ */ v(
                U,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canUp,
                  onClick: c.onUp,
                  children: [
                    /* @__PURE__ */ i(Rn, { className: "cv:size-3.5" }),
                    "Up"
                  ]
                }
              ),
              /* @__PURE__ */ v(
                U,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canDown,
                  onClick: c.onDown,
                  children: [
                    /* @__PURE__ */ i(An, { className: "cv:size-3.5" }),
                    "Down"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ v(
              U,
              {
                variant: "ghost",
                size: "sm",
                className: "cv:h-8 cv:justify-start cv:text-destructive cv:hover:text-destructive",
                onClick: u.onRemove,
                children: [
                  /* @__PURE__ */ i(va, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: f, children: g }),
        /* @__PURE__ */ i(
          U,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: u.onRemove,
            "aria-label": `Remove ${f}`,
            children: /* @__PURE__ */ i(va, { className: "cv:size-3.5" })
          }
        )
      ]
    }
  );
}
function to({
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
  badge: d,
  orientation: f,
  lockedSingle: h,
  disableReorder: y,
  label: p,
  note: g,
  pickerSide: b,
  pickerAlign: k,
  control: x
}) {
  const _ = n.cardinality === "many" && !h, C = _ || r.length === 0, N = r.length, M = f === "vertical", E = p ?? n.label, q = /* @__PURE__ */ i(
    Ri,
    {
      well: n,
      placed: a,
      scope: s,
      blockReason: l,
      onSelect: u,
      side: b ?? (M ? "right" : "top"),
      align: k ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          className: S(
            "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:border-dashed cv:border-input cv:bg-background/60 cv:px-2 cv:py-1 cv:text-xs cv:text-muted-foreground cv:transition-colors cv:hover:border-ring cv:hover:text-foreground",
            M && "cv:w-full"
          ),
          children: [
            /* @__PURE__ */ i(_t, { className: "cv:size-3.5" }),
            r.length === 0 ? E : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: S("cv:flex cv:flex-col cv:gap-1", !M && "cv:min-w-0"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: E }),
          d ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: d }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        x ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: x }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", M ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          r.map((D, O) => /* @__PURE__ */ i(
            Kf,
            {
              spec: e,
              update: t,
              well: n,
              member: D,
              option: o(D),
              resolvedColor: c(D),
              className: M ? "cv:w-full" : void 0,
              reorder: _ && N > 1 && !y ? {
                canUp: O > 0,
                canDown: O < N - 1,
                onUp: () => t(Za(e, n, O, O - 1)),
                onDown: () => t(Za(e, n, O, O + 1))
              } : void 0
            },
            D
          )),
          C ? q : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function er({
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
            /* @__PURE__ */ i(ot, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Le, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Yr(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...o } } }) };
}
function Hf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Yr(e, t), a = ki(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.display ?? "number", s = n.gauge, l = (d) => {
    const f = o ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!f) return;
    const h = { ...f };
    for (const y of Object.keys(d)) {
      const p = d[y];
      p === void 0 ? delete h[y] : h[y] = p;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(Gt, { label: "Time field", children: /* @__PURE__ */ i(
      _i,
      {
        cube: a,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (d) => l({ dimension: d }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Gt, { label: "Date range", children: /* @__PURE__ */ i(
      Ot,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (d) => l({ dateRange: d }),
        renderFixed: (d, f) => /* @__PURE__ */ i(Gr, { value: d, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(fe, { label: "Display", children: /* @__PURE__ */ i(
      Jt,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: c,
        onChange: (d) => r({ display: d })
      }
    ) }),
    c === "gauge" ? /* @__PURE__ */ i(Gt, { label: "Gauge max", children: /* @__PURE__ */ i(
      pe,
      {
        type: "number",
        className: "cv:h-8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const f = parseFloat(d.target.value);
          r({ gauge: Number.isFinite(f) ? { ...s ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Bf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Yr(e, t), a = n.comparison, o = a !== void 0, c = w.useRef(void 0);
  a && (c.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      xe,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => r({
          comparison: d ? c.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ i(fe, { label: "Against", children: /* @__PURE__ */ i(
        Jt,
        {
          "aria-label": "Compare against",
          size: "sm",
          options: [
            { value: "previousPeriod", label: "Prev period" },
            { value: "value", label: "Fixed value" }
          ],
          value: (a == null ? void 0 : a.mode) ?? "previousPeriod",
          onChange: (d) => r({ comparison: { ...a, mode: d } })
        }
      ) }),
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ i(Gt, { label: "Baseline value", children: /* @__PURE__ */ i(
        pe,
        {
          type: "number",
          className: "cv:h-8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (d) => {
            const f = parseFloat(d.target.value);
            r({ comparison: { ...a, value: Number.isFinite(f) ? f : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-start cv:gap-1.5 cv:rounded-md cv:border cv:border-amber-500/30 cv:bg-amber-500/10 cv:px-2 cv:py-1.5 cv:text-[11px] cv:leading-snug cv:text-amber-700", children: [
        /* @__PURE__ */ i(ho, { className: "cv:mt-px cv:size-3.5 cv:shrink-0" }),
        /* @__PURE__ */ v("span", { children: [
          /* @__PURE__ */ i("strong", { className: "cv:font-semibold", children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ i(
        xe,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (d) => r({ comparison: { ...a, showAsPercent: d } })
        }
      ),
      /* @__PURE__ */ i(
        xe,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the up/down colors).",
          checked: l !== "down",
          onChange: (d) => r({ goodDirection: d ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Wf({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Yr(e, t), a = n.sparkline, o = a !== void 0, c = n.comparison !== void 0, s = n.goodDirection ?? "up", l = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      xe,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => r({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ i(Gt, { label: "Trend granularity", children: /* @__PURE__ */ i(
        Ot,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(zi, { value: u, onChange: d, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      c ? null : /* @__PURE__ */ i(
        xe,
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
function Gt({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Uf({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var Q, ge, lt, Be;
  const { meta: a } = ct(), { locale: o } = He(), c = yt(), { chart: s } = e, l = s.family, u = c.require(l), d = ki(e), f = w.useMemo(() => $n(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), h = w.useCallback(
    (A) => A && (o == null ? void 0 : o.unitSystem) === "imperial" && f[A] ? f[A].imperialUnit : A,
    [o == null ? void 0 : o.unitSystem, f]
  ), y = w.useMemo(() => $v(l, c), [l, c]), p = w.useMemo(() => rn(e, c), [e, c]), g = w.useMemo(() => new Map(y.map((A) => [A.id, A])), [y]), [b, k] = w.useState(void 0), x = w.useMemo(
    () => $f(a, e, b, c),
    [a, e, b, c]
  ), _ = w.useMemo(() => Object.values(p).flat(), [p]), C = w.useCallback(
    (A) => {
      k(A), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), N = w.useMemo(
    () => {
      var A;
      return x.viewLocked ? [x.viewLocked] : [(A = x.sourceCube) == null ? void 0 : A.name, ...x.relatedCubes.map((F) => F.name)].filter(
        Boolean
      );
    },
    [x]
  ), M = w.useMemo(
    () => Object.values(p).every((A) => A.length === 0),
    [p]
  ), E = u.dualAxisY, q = w.useCallback(
    (A, F, I) => u.assignSeriesAxis ? u.assignSeriesAxis(A, F, I) : u.placeField ? A : Di(A, l, F, I),
    [u, l]
  ), D = w.useCallback(
    (A) => {
      var W, re, le;
      if (l === "combo") {
        const se = s.familyOptions ?? {}, ve = (Array.isArray(se.series) ? se.series : []).find(
          (ut) => ut.member === A
        );
        return (ve == null ? void 0 : ve.axis) === "right" ? "right" : "left";
      }
      const F = (W = s.mapping) == null ? void 0 : W.series;
      return (F && (F.mode === "measures" || F.mode === "pivot") ? (le = (re = F.meta) == null ? void 0 : re[A]) == null ? void 0 : le.axis : void 0) === "right" ? "right" : "left";
    },
    [l, s.familyOptions, s.mapping]
  ), O = w.useMemo(() => {
    var le, se;
    const A = p.y ?? [], F = (ve) => A.find((ut) => D(ut) === ve), I = F("left"), W = E ? F("right") : void 0, re = (ve) => ve ? Ie(a, ve) : void 0;
    return {
      leftKey: I ? jt(re(I)) : void 0,
      rightKey: W ? jt(re(W)) : void 0,
      leftLabel: I ? no(re(I), h((le = re(I)) == null ? void 0 : le.unit)) : void 0,
      rightLabel: W ? no(re(W), h((se = re(W)) == null ? void 0 : se.unit)) : void 0
    };
  }, [p, E, D, a, h]), T = w.useCallback(
    (A) => {
      const F = jt(A), { leftKey: I, rightKey: W } = O;
      return I === void 0 || F === I ? "left" : W === void 0 || F === W ? "right" : "left";
    },
    [O]
  ), z = w.useCallback(
    (A, F) => {
      var I;
      if (F) {
        if (x.scopeComponent !== void 0 && F.connectedComponent !== x.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (F.memberType === "measure" && x.measureSource && F.cube !== x.measureSource)
          return `Measures come from one table (${((I = x.sourceCube) == null ? void 0 : I.title) ?? x.measureSource}). Remove them to switch.`;
        if (A === "y" && F.memberType === "measure") {
          const { leftKey: W, rightKey: re, leftLabel: le, rightLabel: se } = O, ve = jt(F);
          if (E) {
            if (W !== void 0 && re !== void 0 && ve !== W && ve !== re)
              return `Both axes show ${le} & ${se} — remove one to add a third unit.`;
          } else if (W !== void 0 && ve !== W)
            return `This axis shows ${le}; ${F.label ?? "this field"} is ${xr(F)}`;
        }
      }
    },
    [x, O, E]
  ), R = E ? [O.leftLabel, O.rightLabel].filter(Boolean).join(" · ") || void 0 : O.leftLabel, L = w.useMemo(() => {
    var F;
    const A = {};
    if (l === "bar" || l === "line" || l === "area") {
      const I = (F = s.mapping) == null ? void 0 : F.series;
      if (I && I.mode === "measures") {
        const W = I.members.map((le) => {
          var se, ve;
          return { key: le, colorToken: (ve = (se = I.meta) == null ? void 0 : se[le]) == null ? void 0 : ve.colorToken };
        }), re = ur(W, s.colors);
        I.members.forEach((le, se) => {
          A[le] = re[se];
        });
      }
    } else if (l === "combo") {
      const I = s.familyOptions ?? {}, W = Array.isArray(I.series) ? I.series : [], re = W.map((se) => ({ key: se.member, colorToken: se.colorToken })), le = ur(re, s.colors);
      W.forEach((se, ve) => {
        A[se.member] = le[ve];
      });
    }
    return A;
  }, [l, s.mapping, s.colors, s.familyOptions]), X = w.useCallback(
    (A, F, I) => {
      const W = Ie(a, F);
      if (z(A, W)) return;
      let re = Ha(e, l, A, F, I, c);
      E && A === "y" && (re = q(re, F, T(W))), t(re);
    },
    [z, a, t, e, l, E, T, q, c]
  ), Z = w.useCallback(
    (A, F) => {
      var re;
      if (!F) return;
      if (x.scopeComponent !== void 0 && F.connectedComponent !== x.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (F.memberType === "measure" && x.measureSource && F.cube !== x.measureSource)
        return `Measures come from one table (${((re = x.sourceCube) == null ? void 0 : re.title) ?? x.measureSource}). Remove them to switch.`;
      const I = A === "left" ? O.leftKey : O.rightKey, W = A === "left" ? O.leftLabel : O.rightLabel;
      if (I !== void 0 && jt(F) !== I)
        return `This axis shows ${W}; ${F.label ?? "this field"} is ${xr(F)}`;
    },
    [x, O]
  ), ee = w.useCallback(
    (A, F, I) => {
      const W = Ie(a, F);
      Z(A, W) || t(q(Ha(e, l, "y", F, I, c), F, A));
    },
    [Z, a, t, e, l, q, c]
  ), $ = l === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, G = $.left.map((A) => g.get(A)).filter(Boolean), B = $.bottom.map((A) => g.get(A)).filter(Boolean), K = (Q = p.color) == null ? void 0 : Q[0], ce = ((ge = p.y) == null ? void 0 : ge.length) ?? 0, ue = K && ce > 1 ? `${ce} measures × ${((lt = Ie(a, K)) == null ? void 0 : lt.label) ?? "this split"} — one series per measure per value.` : void 0, H = u.hasLegend, P = p.y ?? [], V = P.find((A) => D(A) !== "right"), J = E ? P.find((A) => D(A) === "right") : void 0, ne = (A) => {
    var W, re, le, se;
    if (!A) return;
    const F = (W = s.mapping) == null ? void 0 : W.series;
    return (F && F.mode === "measures" ? (le = (re = F.meta) == null ? void 0 : re[A]) == null ? void 0 : le.label : void 0) ?? ((se = Ie(a, A)) == null ? void 0 : se.label);
  }, he = (A) => {
    var I, W, re, le;
    const F = (se, ve) => ve ? /* @__PURE__ */ i(Xa, { spec: e, update: t, axis: se, title: "Title", auto: ne(ve) }) : null;
    switch (A) {
      case "y":
        return F("y", V);
      // single value axis (bar / area)
      case "x":
        return F("x", (W = (I = s.mapping) == null ? void 0 : I.category) == null ? void 0 : W.member);
      case "sy":
        return F("y", (re = p.sy) == null ? void 0 : re[0]);
      // scatter Y axis
      case "sx":
        return F("x", (le = p.sx) == null ? void 0 : le[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ye = (A, F) => /* @__PURE__ */ i(
    to,
    {
      spec: e,
      update: t,
      well: A,
      placed: p[A.id] ?? [],
      allPlaced: _,
      optionFor: (I) => Ie(a, I),
      colorFor: (I) => L[I],
      scope: x,
      blockReason: (I) => z(A.id, I),
      onAdd: (I, W) => X(A.id, I, W),
      badge: A.id === "y" ? R : void 0,
      orientation: F,
      note: A.id === "color" ? ue : void 0,
      control: he(A.id)
    },
    A.id
  ), Ye = g.get("y"), Pe = (A) => {
    if (!Ye) return null;
    const F = A === "left" ? V : J;
    return /* @__PURE__ */ i(
      to,
      {
        spec: e,
        update: t,
        well: Ye,
        label: A === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter((I) => D(I) === A),
        allPlaced: _,
        optionFor: (I) => Ie(a, I),
        colorFor: (I) => L[I],
        scope: x,
        blockReason: (I) => Z(A, I),
        onAdd: (I, W) => ee(A, I, W),
        badge: A === "left" ? O.leftLabel : O.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: F ? /* @__PURE__ */ i(
          Xa,
          {
            spec: e,
            update: t,
            axis: A === "left" ? "y" : "y2",
            title: "Title",
            auto: ne(F)
          }
        ) : null
      },
      `y-${A}`
    );
  }, Y = () => {
    const A = g.get("value"), F = (p.value ?? []).length > 0, I = s.familyOptions ?? {};
    return /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        A ? ye(A, "vertical") : null,
        F ? /* @__PURE__ */ i(
          er,
          {
            label: "Time, range & display",
            summary: I.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(Hf, { spec: e, update: t })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ v(ie, { children: [
        /* @__PURE__ */ i(er, { label: "Comparison", summary: I.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Bf, { spec: e, update: t }) }),
        /* @__PURE__ */ i(er, { label: "Sparkline", summary: I.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Wf, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      M ? null : /* @__PURE__ */ i(zf, { spec: e, update: t }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          _f,
          {
            currentName: x.viewLocked ?? ((Be = x.sourceCube) == null ? void 0 : Be.name),
            hasFields: _.length > 0,
            onSelect: C
          }
        ),
        /* @__PURE__ */ i(Nf, { spec: e, update: t, cube: d, scopeCubes: N, scope: x })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      G.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", u.sidebarWidthClass), children: l === "kpi" ? Y() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        G.flatMap(
          (A) => E && A.id === "y" ? [Pe("left"), Pe("right")] : [ye(A, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          r,
          /* @__PURE__ */ i(Df, { spec: e, update: t, empty: M })
        ] }),
        B.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          B.map((A) => ye(A, "horizontal")),
          H && !M ? /* @__PURE__ */ i(Rf, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function no(e, t) {
  const n = xr(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Ti(e, t) {
  const n = w.useRef(e);
  w.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = w.useRef(null);
  return w.useEffect(
    () => () => {
      r.current !== null && clearTimeout(r.current);
    },
    []
  ), w.useCallback(
    (...a) => {
      r.current !== null && clearTimeout(r.current), r.current = setTimeout(() => {
        r.current = null, n.current(...a);
      }, t);
    },
    [t]
  );
}
function tr(e) {
  const t = Eo.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Gf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = w.useState(() => ({
    spec: e,
    issues: tr(e)
  })), [o, c] = w.useState(e);
  w.useEffect(() => {
    a({ spec: e, issues: tr(e) }), c(e);
  }, [e]);
  const s = Ti((h) => t(h), n), l = r.spec, u = r.issues, d = u.length === 0, f = w.useCallback(
    (h) => {
      const y = tr(h);
      a({ spec: h, issues: y }), y.length === 0 && (c(h), s(h));
    },
    [s]
  );
  return { draft: l, issues: u, valid: d, committed: o, update: f };
}
const Yf = () => {
};
function Qf({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: o
}) {
  const { draft: c, issues: s, valid: l, committed: u, update: d } = Gf({
    spec: e,
    onChange: t ?? Yf,
    debounceMs: r
  }), f = u, h = (_) => {
    var C, N, M;
    return (((C = _.measures) == null ? void 0 : C.length) ?? 0) > 0 || (((N = _.dimensions) == null ? void 0 : N.length) ?? 0) > 0 || (((M = _.timeDimensions) == null ? void 0 : M.some((E) => typeof E.granularity == "string")) ?? !1);
  }, y = (_) => {
    var C;
    return (((C = _.measures) == null ? void 0 : C.length) ?? 0) > 0;
  }, p = c.chart.family !== "table", g = h(c.query) && h(f.query) && (!p || y(c.query) && y(f.query)), b = p && !y(c.query) ? `Add a value (measure) to build this ${c.chart.family} chart.` : "Add fields from the axes to build this chart.", k = g ? /* @__PURE__ */ i(Kr, { query: f.query, chart: f.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: b }) }), x = n ? /* @__PURE__ */ v(U, { size: "sm", disabled: !l, onClick: () => n(u), children: [
    /* @__PURE__ */ i(So, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2", a ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        l ? null : /* @__PURE__ */ v(On, { variant: "destructive", children: [
          /* @__PURE__ */ i(Sr, { className: "cv:size-4" }),
          /* @__PURE__ */ i(Ln, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(Dn, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            s.slice(0, 3).map((_, C) => /* @__PURE__ */ v("li", { children: [
              _.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: _.path }) : null,
              " ",
              _.message
            ] }, C)),
            s.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              s.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(Uf, { spec: c, update: d, toolbar: x, children: k }) })
      ]
    }
  );
}
function Jf({
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
  onSave: d,
  saveDisabled: f,
  className: h
}) {
  const y = a || o, [p, g] = w.useState(!1);
  w.useEffect(() => {
    if (!p) return;
    const k = setTimeout(() => g(!1), 1600);
    return () => clearTimeout(k);
  }, [p]), w.useEffect(() => {
    f || g(!1);
  }, [f]);
  const b = () => {
    d == null || d(), g(!0);
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
          pe,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (k) => t(k.target.value),
            className: "cv:h-8 cv:w-full cv:min-w-0 cv:flex-1 cv:sm:w-auto"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-center cv:gap-1", children: [
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(po, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(Rr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(xc, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ i(wc, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          y ? /* @__PURE__ */ v(ie, { children: [
            /* @__PURE__ */ i(
              U,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !c,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(kc, {})
              }
            ),
            /* @__PURE__ */ i(
              U,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ i(Cc, {})
              }
            )
          ] }) : null,
          l ? /* @__PURE__ */ v(
            U,
            {
              variant: "ghost",
              size: "sm",
              onClick: l,
              disabled: u,
              className: "cv:text-muted-foreground cv:hover:text-destructive",
              children: [
                /* @__PURE__ */ i(Nc, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ v(
            U,
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
                p ? /* @__PURE__ */ i(je, {}) : /* @__PURE__ */ i(So, {}),
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
const Fi = "lg", Ei = 12;
function Xf(e, t) {
  const n = t[Fi];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const c = o.reduce((s, l) => Math.max(s, l.x + l.w), 0);
    c > a && (r = o, a = c);
  }
  return r ?? e;
}
function Zf(e, t) {
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
const eh = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function th(e, t, n, r = Ei) {
  const a = eh[n], o = Math.min(a.w, r), c = e.reduce((s, l) => Math.max(s, l.y + l.h), 0);
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
function $i(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Ei) {
  const a = th(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function nh(e, t, n) {
  const r = e.widgets.find((o) => o.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  return a.id = n, $i(e, a);
}
function rh(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function ah(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const oh = 12, ih = 900, ch = 0.4;
function sh(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function lh({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: o,
  onLayoutChange: c
}) {
  const [s, l] = ti(), u = e.grid ?? {}, d = u.cols ?? oh, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], y = u.containerPadding ?? [0, 0], p = Math.max(ch, Math.min(1, l / ih)), g = Math.round(p / 0.05) * 0.05, b = Math.max(8, Math.round(f * g)), k = [
    Math.round(h[0] * g),
    Math.round(h[1] * g)
  ], x = [
    Math.round(y[0] * g),
    Math.round(y[1] * g)
  ], _ = w.useMemo(
    () => ({ [Fi]: sh(e.layout) }),
    [e.layout]
  ), C = w.useMemo(
    () => new Map(e.widgets.map((D) => [D.id, D])),
    [e.widgets]
  ), N = w.useRef(c);
  w.useEffect(() => {
    N.current = c;
  }, [c]);
  const M = w.useRef(e.layout);
  w.useEffect(() => {
    M.current = e.layout;
  }, [e.layout]);
  const E = w.useRef(null), q = w.useCallback(
    (D, O) => {
      const z = Xf(D, O).map((R) => ({ ...R }));
      uh(M.current, z) || N.current(z);
    },
    []
  );
  return /* @__PURE__ */ i(Vr, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    Ro,
    {
      width: l,
      layouts: _,
      breakpoints: { lg: 0 },
      cols: { lg: d },
      rowHeight: b,
      margin: k,
      containerPadding: x,
      dragConfig: { enabled: !0, handle: `.${wn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: q,
      children: e.layout.map((D) => {
        const O = C.get(D.i);
        if (!O) return null;
        const T = O.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${O.title ?? O.type}`,
              "aria-pressed": T,
              onPointerDown: (z) => {
                E.current = { x: z.clientX, y: z.clientY };
              },
              onClick: (z) => {
                const R = E.current;
                R && Math.hypot(z.clientX - R.x, z.clientY - R.y) > 5 || n(O.id);
              },
              onKeyDown: (z) => {
                (z.key === "Enter" || z.key === " ") && (z.preventDefault(), n(O.id));
              },
              className: S(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                T ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(pr, { widget: O, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(wn, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${O.title ?? O.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), r(O.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Sc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${O.title ?? O.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), a(O.id);
                      },
                      className: S(
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
                      "aria-label": `Delete ${O.title ?? O.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), o(O.id);
                      },
                      className: S(
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
            D.i
          )
        );
      })
    }
  ) : null }) });
}
function uh(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const dh = w.memo(lh);
function mh(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function vh({
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
  const a = Ao({
    extensions: [Oo],
    editable: !0,
    content: mh(e.doc),
    onUpdate: ({ editor: o }) => {
      const c = o.getJSON();
      n.current({ ...r.current, doc: c });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(
          ni,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return a ? /* @__PURE__ */ i(fe, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(fh, { editor: a }),
    /* @__PURE__ */ i(Mo, { editor: a })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function Ze({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: S(
        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md cv:text-muted-foreground cv:transition-colors",
        "cv:hover:bg-muted cv:hover:text-foreground cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        "cv:[&_svg]:size-4",
        e && "cv:bg-muted cv:text-foreground"
      ),
      children: r
    }
  );
}
function fh({ editor: e }) {
  const [, t] = w.useReducer((n) => n + 1, 0);
  return w.useEffect(() => {
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
          Ze,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(Rc, {})
          }
        ),
        /* @__PURE__ */ i(
          Ze,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(Ac, {})
          }
        ),
        /* @__PURE__ */ i(
          Ze,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(Mc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Ze,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(Oc, {})
          }
        ),
        /* @__PURE__ */ i(
          Ze,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(Lc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Ze,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(Dc, {})
          }
        ),
        /* @__PURE__ */ i(
          Ze,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(zc, {})
          }
        ),
        /* @__PURE__ */ i(
          Ze,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(Tc, {})
          }
        )
      ]
    }
  );
}
const hh = Mr(
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
function ph({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: S(hh({ variant: t }), e), ...n });
}
function gh({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: o
}) {
  const { meta: c, isLoading: s } = ct(), l = w.useMemo(() => qn(c), [c]), u = l.filter((h) => h.type === "cube"), d = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(Te, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ i(Ee, { id: a, className: o, children: /* @__PURE__ */ i(Fe, { placeholder: s ? "Loading…" : n, children: f ? /* @__PURE__ */ i(nr, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v($e, { children: [
      d.length > 0 ? /* @__PURE__ */ v(vr, { children: [
        /* @__PURE__ */ i(fr, { children: "Views" }),
        d.map((h) => /* @__PURE__ */ i(we, { value: h.name, children: /* @__PURE__ */ i(nr, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(vr, { children: [
        /* @__PURE__ */ i(fr, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(we, { value: h.name, children: /* @__PURE__ */ i(nr, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function nr({ option: e }) {
  const t = e.type === "view" ? Ar : ko;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(ph, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const bh = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function yh(e) {
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
function xh({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), o = (s) => n({ ...e, control: { ...e.control, variable: s } }), c = (s) => {
    s !== r.kind && a(yh(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col", children: [
    /* @__PURE__ */ i(
      fe,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          Te,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i($e, { children: t.map((s) => /* @__PURE__ */ i(we, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(fe, { label: "Control", children: /* @__PURE__ */ v(Te, { value: r.kind, onValueChange: (s) => c(s), children: [
      /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, {}) }),
      /* @__PURE__ */ i($e, { children: Xc.options.map((s) => /* @__PURE__ */ i(we, { value: s, children: bh[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ i(wh, { control: r, onChange: a, variables: t })
  ] });
}
function wh({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(kh, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(Nh, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(Sh, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(_h, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(Rh, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(Ah, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function kh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(
      fe,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          Ch,
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
function Ch({
  selected: e,
  onChange: t
}) {
  const [n, r] = w.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), o = (s) => {
    const l = new Set(a);
    l.has(s) ? l.delete(s) : l.add(s), t(pn.filter((u) => l.has(u.value)).map((u) => u.value));
  }, c = a.size === 0 ? "Default set" : a.size === pn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Me, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Oe, { asChild: !0, children: /* @__PURE__ */ v(U, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: c }),
      /* @__PURE__ */ i(ot, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Le, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: pn.map((s) => {
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
                className: S(
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
function Nh({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const l = new Set(r);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = ft.options.filter((d) => l.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((s) => s.type === "dateRange" || s.type === "time"), c = "__none__";
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(
      fe,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          Te,
          {
            value: e.rangeVariable ?? c,
            onValueChange: (s) => t({ ...e, rangeVariable: s === c ? void 0 : s }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v($e, { children: [
                /* @__PURE__ */ i(we, { value: c, children: "None" }),
                o.map((s) => /* @__PURE__ */ i(we, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(fe, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: ft.options.map((s) => {
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
function Sh({
  control: e,
  onChange: t
}) {
  const n = (o, c) => {
    const s = e.options.map(
      (l, u) => u === o ? { value: c.value ?? String(l.value), label: c.label ?? l.label } : l
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (o) => t({ ...e, options: e.options.filter((c, s) => s !== o) });
  return /* @__PURE__ */ v(ie, { children: [
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
      fe,
      {
        label: "Options",
        action: /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", onClick: r, children: [
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
            U,
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
function _h({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(fe, { label: "From", children: /* @__PURE__ */ v(
      Te,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, {}) }),
          /* @__PURE__ */ v($e, { children: [
            /* @__PURE__ */ i(we, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(we, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(we, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      fe,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ i(
          U,
          {
            variant: "ghost",
            size: "sm",
            className: "cv:h-6 cv:px-1.5 cv:text-xs cv:text-muted-foreground",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ i(
          gh,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Rh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ i(fe, { label: "Placeholder", children: /* @__PURE__ */ i(
    pe,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function Ah({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ i(fe, { label: a, children: /* @__PURE__ */ i(
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
  return /* @__PURE__ */ v(ie, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function Mh(e) {
  return { schemaVersion: kt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Oh(e) {
  const t = {
    schemaVersion: kt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Lh(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function ro({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const o = r ? (c) => r([...t, c]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", a && "cv:h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      fe,
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
      /* @__PURE__ */ i(Vr, { spec: Mh(t), children: /* @__PURE__ */ i(vf, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(a && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        Qf,
        {
          fill: a,
          spec: Oh(e),
          onChange: (c) => n(Lh(e, c))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(vh, { widget: e, onChange: n }) : /* @__PURE__ */ i(xh, { widget: e, variables: t, onChange: n })
  ] });
}
function Dh({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: o,
  regionId: c,
  className: s
}) {
  const l = /* @__PURE__ */ v(ie, { children: [
    r ? /* @__PURE__ */ i(
      en,
      {
        className: S(
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
      className: S("cv:flex cv:items-center cv:justify-between cv:gap-2", s),
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
function zh({
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
  const u = o !== void 0, [d, f] = w.useState(a), h = r ? u ? o : d : !0, y = w.useId(), p = w.useCallback(() => {
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
          Dh,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
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
function Th(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Fh(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Eh(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function $h(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Ph(e, t) {
  switch (e) {
    case "chart":
      return Fh(t);
    case "text":
      return Eh(t);
    case "input":
      return $h(t);
  }
}
function Ih(e) {
  return { name: e, type: "string" };
}
function jh(e) {
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
const ao = {
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
function Vh({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = w.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((d) => d.name === u));
    return u;
  }, o = (u, d) => {
    t(e.map((f, h) => h === u ? qh(f, d) : f));
  }, c = (u) => t(e.filter((d, f) => f !== u)), s = () => t([...e, Ih(a())]), l = (u, d) => {
    const f = u + d;
    if (f < 0 || f >= e.length) return;
    const h = e.slice();
    [h[u], h[f]] = [h[f], h[u]], t(h);
  };
  return /* @__PURE__ */ i(
    zh,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(U, { variant: "outline", size: "sm", onClick: s, children: [
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
        /* @__PURE__ */ v(U, { variant: "outline", size: "sm", className: "cv:mt-3", onClick: s, children: [
          /* @__PURE__ */ i(_t, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, d) => /* @__PURE__ */ i(
        Kh,
        {
          decl: u,
          index: d,
          total: e.length,
          duplicate: e.some((f, h) => h !== d && f.name === u.name && u.name !== ""),
          onChange: (f) => o(d, f),
          onRemove: () => c(d),
          onMove: (f) => l(d, f)
        },
        d
      )) })
    }
  );
}
function qh(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = jh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Kh({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: o,
  onMove: c
}) {
  const [s, l] = w.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0;
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
              onClick: () => l((d) => !d),
              className: "cv:flex cv:size-6 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4",
              children: s ? /* @__PURE__ */ i(ot, {}) : /* @__PURE__ */ i(en, {})
            }
          ),
          /* @__PURE__ */ i(
            pe,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
              className: "cv:h-7 cv:min-w-0 cv:flex-1 cv:font-mono cv:text-xs"
            }
          ),
          /* @__PURE__ */ i("span", { className: "cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline", children: ao[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: [
            /* @__PURE__ */ i(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => c(-1),
                children: /* @__PURE__ */ i(Rn, {})
              }
            ),
            /* @__PURE__ */ i(
              U,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => c(1),
                children: /* @__PURE__ */ i(An, {})
              }
            ),
            /* @__PURE__ */ i(
              U,
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
          /* @__PURE__ */ i(fe, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(Te, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Fe, {}) }),
            /* @__PURE__ */ i($e, { children: To.options.map((d) => /* @__PURE__ */ i(we, { value: d, children: ao[d] }, d)) })
          ] }) }),
          /* @__PURE__ */ i(fe, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
            pe,
            {
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (d) => a({ label: d.target.value })
            }
          ) }),
          /* @__PURE__ */ i(
            xe,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (d) => a({ array: d })
            }
          ),
          /* @__PURE__ */ i(Hh, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function Hh({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ i(
      xe,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (a) => t(a)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(fe, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
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
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : Bh(e.default);
  return /* @__PURE__ */ i(fe, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    pe,
    {
      value: r,
      placeholder: Wh(e.type),
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
function Bh(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Wh(e) {
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
function Np({
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
  canRedo: d,
  onDiscard: f,
  families: h,
  className: y
}) {
  var Ye, Pe;
  const [p, g] = w.useState(e), [b, k] = w.useState(e);
  w.useEffect(() => {
    g(e), k(e);
  }, [e]);
  const [x, _] = w.useState(null), C = w.useRef(0), [N, M] = w.useState(null), E = w.useRef(x), q = w.useRef(N), D = w.useRef(p);
  w.useEffect(() => {
    E.current = x, q.current = N, D.current = p;
  });
  const O = w.useRef(null);
  O.current === null && (O.current = o ?? Th());
  const T = o ?? O.current, z = Ti(
    (Y) => r == null ? void 0 : r(Y),
    c
  ), R = w.useCallback(
    (Y) => {
      C.current = Date.now(), g((Q) => {
        const ge = Y(Q);
        return z(ge), ge;
      });
    },
    [z]
  ), L = w.useRef(t);
  w.useEffect(() => {
    if (!t || t === L.current) return;
    const Y = 500;
    let Q = null;
    const ge = () => {
      var F;
      const lt = Date.now() - C.current;
      if (lt < Y) {
        Q = setTimeout(ge, Y - lt);
        return;
      }
      L.current = t;
      const Be = /* @__PURE__ */ new Set();
      ((F = q.current) == null ? void 0 : F.kind) === "widget" && Be.add(q.current.id), E.current && Be.add(E.current);
      const A = Yh(t, D.current, Be);
      g(A), n == null || n(A);
    };
    return ge(), () => {
      Q && clearTimeout(Q);
    };
  }, [t]);
  const X = w.useCallback(
    (Y) => {
      const Q = Ph(Y, T());
      R((ge) => $i(ge, Q)), _(Q.id), M({ kind: "widget", id: Q.id });
    },
    [R, T]
  ), Z = w.useCallback((Y) => _(Y), []), ee = w.useCallback((Y) => {
    _(Y), M({ kind: "widget", id: Y });
  }, []), $ = w.useCallback(
    (Y) => {
      R((Q) => rh(Q, Y)), _((Q) => Q === Y ? null : Q), M((Q) => (Q == null ? void 0 : Q.kind) === "widget" && Q.id === Y ? null : Q);
    },
    [R]
  ), G = w.useCallback(
    (Y) => {
      const Q = T();
      R((ge) => nh(ge, Y, Q)), _(Q);
    },
    [R, T]
  ), B = w.useCallback(
    (Y) => R((Q) => ah(Q, Y)),
    [R]
  ), K = w.useCallback(
    (Y) => R((Q) => {
      const ge = Zf(Q.layout, Y);
      return Gh(Q.layout, ge) ? Q : { ...Q, layout: ge };
    }),
    [R]
  ), ce = w.useCallback(
    (Y) => R((Q) => ({ ...Q, name: Y || void 0 })),
    [R]
  ), ue = w.useCallback(
    (Y) => R((Q) => ({ ...Q, variables: Y })),
    [R]
  ), H = w.useDeferredValue(p), P = w.useMemo(
    () => or.safeParse(H),
    [H]
  ), V = w.useCallback(() => {
    const Y = or.safeParse(p);
    Y.success && (a == null || a(Y.data), k(p));
  }, [p, a]), J = p !== b, ne = (N == null ? void 0 : N.kind) === "widget" ? p.widgets.find((Y) => Y.id === N.id) ?? null : null;
  w.useEffect(() => {
    (N == null ? void 0 : N.kind) === "widget" && !p.widgets.some((Y) => Y.id === N.id) && M(null);
  }, [N, p.widgets]);
  const he = w.useCallback(() => M(null), []), ye = (N == null ? void 0 : N.kind) === "variables" ? "Dashboard variables" : ne ? ne.title ?? `${Uh(ne.type)} widget` : "";
  return /* @__PURE__ */ i(jr, { families: h, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Pe = (Ye = p.grid) == null ? void 0 : Ye.margin) == null ? void 0 : Pe[0]) ?? 12 },
      className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", y),
      children: [
        /* @__PURE__ */ i(
          Jf,
          {
            name: p.name ?? "",
            onNameChange: ce,
            onAdd: X,
            onEditVariables: () => M({ kind: "variables" }),
            onUndo: s,
            onRedo: l,
            canUndo: u,
            canRedo: d,
            onDiscard: f,
            discardDisabled: !J,
            onSave: a ? V : void 0,
            saveDisabled: !P.success || !J,
            className: "cv:shrink-0"
          }
        ),
        P.success ? null : /* @__PURE__ */ v("p", { className: "cv:shrink-0 cv:text-xs cv:text-destructive", children: [
          P.error.issues.length,
          " validation issue",
          P.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-y-auto cv:pb-4", children: N ? null : /* @__PURE__ */ i(
          dh,
          {
            spec: p,
            selectedId: x,
            onSelect: Z,
            onEdit: ee,
            onDuplicate: G,
            onDelete: $,
            onLayoutChange: K
          }
        ) }),
        N ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": ye,
            className: "cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background",
            children: [
              /* @__PURE__ */ v("header", { className: "cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5", children: [
                /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                  /* @__PURE__ */ v(U, { variant: "ghost", size: "sm", onClick: he, children: [
                    /* @__PURE__ */ i(_r, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: ye })
                ] }),
                ne ? /* @__PURE__ */ v(
                  U,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => $(ne.id),
                    children: [
                      /* @__PURE__ */ i(Lt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: N.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(Vh, { variables: p.variables, onChange: ue }) }) : (ne == null ? void 0 : ne.type) === "chart" ? /* @__PURE__ */ i(
                ro,
                {
                  fill: !0,
                  widget: ne,
                  variables: p.variables,
                  onChange: B,
                  onVariablesChange: ue
                }
              ) : ne ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                ro,
                {
                  widget: ne,
                  variables: p.variables,
                  onChange: B,
                  onVariablesChange: ue
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Uh(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Gh(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Yh(e, t, n) {
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
  Ws as AreaChartFamily,
  Ms as AreaFamilyOptionsSchema,
  Yc as AxesOptionsSchema,
  Bn as AxisOptionsSchema,
  vp as BUILTIN_CHART_FAMILIES,
  Je as BUILTIN_DEFAULTS,
  Qe as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Hs as BarChartFamily,
  Rs as BarFamilyOptionsSchema,
  Fi as CANONICAL_BREAKPOINT,
  at as ChartColorTokenSchema,
  Uf as ChartEditOverlay,
  Qf as ChartEditor,
  Hc as ChartFamilySchema,
  zo as ChartOptionsSchema,
  Vl as ChartRenderer,
  Eo as ChartSpecSchema,
  Cp as ChartView,
  es as ChartWidgetSchema,
  Qc as ColorAssignmentSchema,
  xl as ComboChartFamily,
  $s as ComboFamilyOptionsSchema,
  Es as ComboSeriesOptSchema,
  Ts as CondFormatRuleSchema,
  Kr as CubeChart,
  nm as CubeChartSpec,
  Do as CubeQuerySchema,
  Pn as CubeVizContext,
  xp as CubeVizProvider,
  ke as DEFAULT_COLOR_RAMP,
  Ei as DEFAULT_COLS,
  mr as DEFAULT_UNIT_CONVERSIONS,
  wn as DRAG_HANDLE_CLASS,
  kp as Dashboard,
  Np as DashboardEditor,
  Vr as DashboardProvider,
  or as DashboardSpecSchema,
  rr as DateRangeSchema,
  Ps as EMPTY_FAMILY_DEFAULT,
  Ca as EM_DASH,
  dh as EditorCanvas,
  Jf as EditorToolbar,
  jr as FamilyRegistryOverride,
  gf as FilterBuilder,
  jc as FilterOperatorSchema,
  Bc as FormatKindSchema,
  Mn as FormatOptionsSchema,
  fs as GRANULARITY_PATTERN,
  ft as GranularitySchema,
  os as GridConfigSchema,
  Xc as InputControlKindSchema,
  Zc as InputControlSchema,
  xh as InputWidgetEditor,
  ns as InputWidgetSchema,
  Nm as InputWidgetView,
  Zs as KpiFamily,
  Ds as KpiFamilyOptionsSchema,
  as as LayoutItemSchema,
  Vc as LeafFilterSchema,
  Uc as LegendOptionsSchema,
  Bs as LineChartFamily,
  As as LineFamilyOptionsSchema,
  oe as MemberSchema,
  xa as OrderDirSchema,
  Kc as OrderSpecSchema,
  Us as PieChartFamily,
  Os as PieFamilyOptionsSchema,
  ar as QueryFilterSchema,
  tn as ReferenceLineOptSchema,
  pr as RenderWidget,
  kt as SCHEMA_VERSION,
  Ic as ScalarSchema,
  Ys as ScatterChartFamily,
  Ls as ScatterFamilyOptionsSchema,
  Wc as SeriesMappingSchema,
  wa as SeriesMetaSchema,
  $o as SpecSchema,
  zs as TableColumnOptSchema,
  dl as TableFamily,
  Fs as TableFamilyOptionsSchema,
  vh as TextWidgetEditor,
  ts as TextWidgetSchema,
  am as TextWidgetView,
  qc as TimeDimensionSchema,
  Jc as TipTapDocSchema,
  Gc as TooltipOptionsSchema,
  yn as VarRefSchema,
  is as VariableDeclSchema,
  To as VariableTypeSchema,
  Lo as VariableValueSchema,
  Vh as VariablesPanel,
  si as WidgetChrome,
  ro as WidgetEditPanel,
  rs as WidgetSpecSchema,
  $i as appendWidget,
  zl as areaChartFamily,
  Aa as assignColors,
  Id as axisKey,
  Ll as barChartFamily,
  Ir as buildFamilyRegistry,
  yp as builtinCharts,
  Ge as builtinFamilyDescriptors,
  Tn as builtinFamilyRegistry,
  Pl as comboChartFamily,
  ls as createCubeClient,
  Th as createIdFactory,
  au as createQueryResolver,
  Zo as createUnitsFormatter,
  ou as createVariableStore,
  gs as datePattern,
  ir as deepMerge,
  Pr as defaultChartFamilies,
  jh as defaultForType,
  Dr as defaultFormatter,
  us as fetchMeta,
  gp as formatCategory,
  Bt as formatDateValue,
  Rt as isEmptyValue,
  ze as isVarRef,
  El as kpiChartFamily,
  Dl as lineChartFamily,
  ss as loadSpec,
  Po as looksLikeIsoDate,
  jo as makeChartFormat,
  pp as makeDateFormatter,
  bp as makeFormatter,
  Zf as mergeLayout,
  $n as mergeUnitConversions,
  Fh as newChartWidget,
  $h as newInputWidget,
  Eh as newTextWidget,
  Ih as newVariable,
  Ph as newWidget,
  Gl as normalize,
  Xf as pickCanonicalLayout,
  Tl as pieChartFamily,
  th as placeNewItem,
  Vd as quantityLabel,
  rh as removeWidget,
  ah as replaceWidget,
  Bd as resolveChart,
  jl as resolveOptions,
  Is as resolveOptionsWith,
  Jo as resolveQuery,
  ur as resolveSeriesColors,
  eu as resolveValue,
  fp as safeLoadSpec,
  Fl as scatterChartFamily,
  $l as tableChartFamily,
  ps as toDate,
  Kl as toResultAnnotation,
  Gf as useChartEditorState,
  ti as useContainerWidth,
  ct as useCubeMeta,
  Ud as useCubeQuery,
  He as useCubeVizContext,
  ei as useDashboard,
  Ti as useDebouncedCallback,
  yt as useFamilyRegistry,
  wp as useFormatter,
  Jn as useNormalizedSeries,
  qr as useOptionalDashboard,
  hp as validateSpec
};
//# sourceMappingURL=index.js.map
