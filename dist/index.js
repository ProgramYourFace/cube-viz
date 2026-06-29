import { jsx as i, jsxs as v, Fragment as ae } from "react/jsx-runtime";
import * as yr from "recharts";
import { BarChart as Ri, CartesianGrid as Jt, YAxis as qe, XAxis as kt, Bar as Ga, LabelList as Ya, ReferenceLine as Xt, LineChart as Ai, Line as Qa, AreaChart as Ja, Area as xr, PieChart as Mi, Pie as Oi, Cell as Xa, Label as Li, ScatterChart as Di, ZAxis as zi, Scatter as Ti, RadialBarChart as Fi, PolarAngleAxis as Ei, RadialBar as Pi, ResponsiveContainer as $i, ComposedChart as Ii } from "recharts";
import * as w from "react";
import { useId as Za, useMemo as ee, createContext as eo, useContext as wr, useState as Ct, useCallback as Xe, useEffect as Zt, useRef as lt, createElement as ji, useSyncExternalStore as to } from "react";
import { clsx as Vi } from "clsx";
import { extendTailwindMerge as qi } from "tailwind-merge";
import { z as d } from "zod";
import { Minus as no, ArrowUp as kn, ArrowDown as Cn, ChevronsUpDown as Ki, AreaChart as Hi, BarChart3 as ro, BarChart4 as Bi, Table as Wi, Gauge as Ui, ScatterChart as Gi, PieChart as Yi, LineChart as Qi, AlertCircle as ao, ChevronLeft as kr, ChevronRight as en, ChevronDown as tt, Check as Ke, ChevronUp as Ji, CalendarIcon as oo, MoreVertical as Xi, RefreshCw as Zi, Image as ec, Sheet as tc, Type as Cr, Hash as io, Calendar as co, Search as nc, Table2 as so, Database as lo, Layers as Nr, Variable as rc, Plus as Nt, Trash2 as Mt, ListFilter as ac, Box as uo, EyeOff as mo, Eye as vo, X as ua, Save as fo, SlidersHorizontal as oc, Braces as ic, Undo2 as cc, Redo2 as sc, RotateCcw as lc, Pencil as uc, Copy as mc, Bold as dc, Italic as vc, Strikethrough as fc, Heading1 as hc, Heading2 as pc, List as gc, ListOrdered as bc, Quote as yc } from "lucide-react";
import * as mn from "@radix-ui/react-popover";
import { cva as Sr } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import xc from "@cubejs-client/core";
import { format as pe, isValid as jt, parseISO as dn, differenceInCalendarDays as wc, subDays as Me, startOfMonth as Pn, subMonths as $n, startOfQuarter as In, subQuarters as jn, startOfYear as Vn, subYears as qn, subWeeks as kc, startOfWeek as Cc, endOfWeek as Nc, endOfMonth as Sc, endOfQuarter as _c, endOfYear as Rc, parse as ho } from "date-fns";
import { DayPicker as Ac, useDayPicker as Mc } from "react-day-picker";
import { ResponsiveGridLayout as po } from "react-grid-layout";
import { useEditor as go, EditorContent as bo } from "@tiptap/react";
import yo from "@tiptap/starter-kit";
const xt = 1, vn = d.object({ var: d.string().min(1) }).strict();
function Oe(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const fn = (e) => d.union([e, vn]), Oc = d.union([d.string(), d.number(), d.boolean()]), mt = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), tr = d.union([d.tuple([d.string(), d.string()]), d.string()]), xo = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), re = d.string().min(1), Lc = d.enum([
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
]), Dc = d.object({
  member: re,
  operator: Lc,
  values: d.array(d.union([Oc, vn])).optional()
}).strict(), nr = d.lazy(
  () => d.union([
    Dc,
    d.object({ and: d.array(nr) }).strict(),
    d.object({ or: d.array(nr) }).strict()
  ])
), zc = d.object({
  dimension: re,
  granularity: fn(mt).optional(),
  dateRange: fn(tr).optional(),
  compareDateRange: d.array(tr).optional()
}).strict(), ma = d.enum(["asc", "desc"]), Tc = d.union([
  d.record(re, ma),
  d.array(d.tuple([re, ma]))
]), wo = d.object({
  measures: d.array(re).optional(),
  dimensions: d.array(re).optional(),
  timeDimensions: d.array(zc).optional(),
  filters: d.array(nr).optional(),
  segments: d.array(re).optional(),
  order: Tc.optional(),
  limit: fn(d.number()).optional(),
  offset: fn(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), Fc = d.string().min(1), np = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], et = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Ec = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Nn = d.object({
  kind: Ec.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional()
}).strict(), da = d.object({
  label: d.string().optional(),
  colorToken: et.optional(),
  stackId: d.string().optional(),
  axis: d.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: Nn.optional()
}).strict(), Pc = d.object({
  category: d.object({ member: re }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(re),
      meta: d.record(re, da).optional()
    }).strict(),
    d.object({
      mode: d.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: re,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: d.array(re).optional(),
      pivot: re,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: d.record(re, da).optional()
    }).strict()
  ])
}).strict(), $c = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Ic = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), va = d.union([d.number(), d.literal("auto")]), Kn = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([va, va]).optional(),
  tickFormat: Nn.optional()
}).strict(), jc = d.object({
  x: Kn.optional(),
  y: Kn.optional(),
  y2: Kn.optional()
}).strict(), Vc = d.object({
  byKey: d.record(d.string(), et).optional(),
  ramp: d.array(et).optional()
}).strict(), ko = d.object({
  family: Fc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Pc.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: $c.optional(),
  tooltip: Ic.optional(),
  axes: jc.optional(),
  colors: Vc.optional(),
  format: Nn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), qc = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), Kc = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Hc = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(mt).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: xo, label: d.string() }).strict()),
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
}).strict(), _r = {
  id: d.string().min(1),
  title: d.string().optional()
}, Bc = d.object({ ..._r, type: d.literal("chart"), query: wo, chart: ko }).strict(), Wc = d.object({ ..._r, type: d.literal("text"), doc: qc }).strict(), Uc = d.object({ ..._r, type: d.literal("input"), control: Hc }).strict(), Gc = d.discriminatedUnion("type", [
  Bc,
  Wc,
  Uc
]), Yc = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), Qc = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), Co = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Jc = d.object({
  name: d.string().min(1),
  type: Co,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: xo.optional()
}).strict(), No = {
  schemaVersion: d.literal(xt),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, So = d.object({ ...No, kind: d.literal("chart"), query: wo, chart: ko }).strict(), rr = d.object({
  ...No,
  kind: d.literal("dashboard"),
  variables: d.array(Jc),
  widgets: d.array(Gc),
  layout: d.array(Yc),
  grid: Qc.optional()
}).strict(), _o = d.discriminatedUnion("kind", [So, rr]), Xc = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function Zc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > xt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${xt} — update the library`
    );
  for (; n < xt; ) {
    const r = Xc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return _o.parse(t);
}
function rp(e) {
  try {
    return { ok: !0, spec: Zc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function ap(e) {
  return _o.parse(e);
}
function es(e) {
  return xc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ts(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ns = qi({ prefix: "cv" });
function S(...e) {
  return ns(Vi(e));
}
function Rr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function rs({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const as = Sr(
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
), Ar = w.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: S(as({ variant: t }), e),
    ...n
  }
));
Ar.displayName = "Alert";
const Mr = w.forwardRef(
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
Mr.displayName = "AlertTitle";
const Or = w.forwardRef(
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
Or.displayName = "AlertDescription";
const os = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, is = "MMM d, yyyy";
function cs(e) {
  if (e instanceof Date) return jt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return jt(r) ? r : null;
  }
  const t = dn(e);
  if (jt(t)) return t;
  const n = new Date(e);
  return jt(n) ? n : null;
}
function Ro(e) {
  return /^\d{4}-\d{2}/.test(e) ? jt(dn(e)) : !1;
}
function ss(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? os[t] : is;
}
function Ht(e, t, n) {
  const r = cs(e);
  return r ? pe(r, ss(t, n)) : String(e);
}
function op(e, t) {
  return (n) => n == null ? "" : Ht(n, e, t);
}
function ip(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ht(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ht(e, t.format, t.granularity) : String(e) : Ro(e) ? Ht(e, t.format, t.granularity) : e;
}
const fa = "—", ls = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function ha(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function us(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of ls)
    if (n >= r) return ha((e / r).toFixed(t)) + a;
  return ha(e.toFixed(t));
}
function ms(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function ds(e, t) {
  const { format: n, meta: r, locale: a } = t, o = n != null && n.abbreviate ? us(e, n.decimals ?? 1) : ms(e, n, a), s = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${s ? ` ${s}` : ""}`;
}
function Ao(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function vs(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Ao(e.value) ? !0 : typeof e.value == "string" ? Ro(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Lr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? fa : (Ao(t) || typeof t == "string" || typeof t == "number") && vs(e) ? Ht(t, n, r) : typeof t == "number" ? ds(t, e) : String(t);
};
function fs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function cp(e, t) {
  return (n, r) => {
    const a = r ? fs(r, t) : void 0;
    return Lr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function hs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function ps(e) {
  const t = mt.safeParse(e);
  return t.success ? t.data : void 0;
}
function gs(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const o = ps(a.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function Mo(e, t, n, r) {
  const a = gs(e, t);
  return {
    value(o, s, c = "value") {
      const l = s ? hs(s, e) : void 0, u = l == null ? void 0 : l.meta;
      return n({
        value: o,
        member: s,
        meta: u,
        title: (l == null ? void 0 : l.shortTitle) ?? (l == null ? void 0 : l.title),
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
}
const tn = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  label: d.string().optional(),
  colorToken: et.optional()
}).strict(), Dr = d.boolean().optional(), bs = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(tn).optional(),
  comparePrevious: Dr
}).strict(), zr = d.enum(["linear", "monotone", "step", "natural"]), ys = d.object({
  curve: zr.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(tn).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: Dr
}).strict(), xs = d.object({
  curve: zr.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(tn).optional(),
  comparePrevious: Dr
}).strict(), ws = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), ks = d.object({
  x: re,
  y: re,
  size: re.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: re.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(tn).optional()
}).strict(), Cs = d.object({
  display: d.enum(["number", "gauge"]).optional(),
  measure: re,
  comparison: d.object({
    mode: d.enum(["previousPeriod", "value"]),
    value: d.union([re, d.number()]).optional(),
    showAsPercent: d.boolean().optional(),
    goodDirection: d.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: d.object({
    member: re.optional(),
    timeDimension: re.optional(),
    granularity: d.union([mt, vn]).optional(),
    dateRange: d.union([tr, vn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: d.enum(["up", "down"]).optional(),
  gauge: d.object({
    min: d.number().optional(),
    max: d.number(),
    thresholds: d.array(d.object({ at: d.number(), colorToken: et }).strict()).optional()
  }).strict().optional(),
  icon: d.string().optional()
}).strict(), Ns = d.object({
  member: re,
  label: d.string().optional(),
  format: Nn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), Ss = d.object({
  member: re,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: et.optional()
}).strict(), _s = d.object({
  columns: d.array(Ns).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(Ss).optional()
}).strict(), Rs = d.object({
  member: re,
  render: d.enum(["bar", "line", "area"]),
  axis: d.enum(["left", "right"]).optional(),
  colorToken: et.optional(),
  stackId: d.string().optional(),
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: d.boolean().optional(),
  label: d.string().optional()
}).strict(), As = d.object({
  series: d.array(Rs),
  referenceLines: d.array(tn).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: zr.optional(),
  dots: d.boolean().optional(),
  connectNulls: d.boolean().optional(),
  strokeWidth: d.number().optional(),
  fillOpacity: d.number().optional(),
  barRadius: d.number().optional()
}).strict(), Ue = {
  bar: bs,
  line: ys,
  area: xs,
  pie: ws,
  scatter: ks,
  kpi: Cs,
  table: _s,
  combo: As
}, Ge = {
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
function pa(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function ar(e, t) {
  if (t === void 0) return e;
  if (!pa(e) || !pa(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? ar(e[r], a) : a);
  }
  return n;
}
const Ms = { envelope: {}, familyOptions: {} };
function Os(e, t) {
  return {
    ...ar({ ...t.envelope }, e),
    familyOptions: ar(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Ls = { light: "", dark: ".dark" }, Oo = w.createContext(null);
function Lo() {
  const e = w.useContext(Oo);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const nt = w.forwardRef(({ id: e, className: t, children: n, config: r, ...a }, o) => {
  const s = w.useId(), c = `chart-${e || s.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Oo.Provider, { value: { config: r }, children: /* @__PURE__ */ v(
    "div",
    {
      "data-chart": c,
      ref: o,
      className: S(
        "cv:flex cv:h-full cv:w-full cv:justify-center cv:text-xs cv:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground cv:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 cv:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border cv:[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border cv:[&_.recharts-radial-bar-background-sector]:fill-muted cv:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted cv:[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border cv:[&_.recharts-sector]:outline-none cv:[&_.recharts-sector[stroke='#fff']]:stroke-transparent cv:[&_.recharts-surface]:outline-none",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ i(Ds, { id: c, config: r }),
        /* @__PURE__ */ i(yr.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
nt.displayName = "ChartContainer";
const Ds = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, r]) => r.theme || r.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Ls).map(
          ([r, a]) => `
${a} [data-chart=${e}] {
${n.map(([o, s]) => {
            var l;
            const c = ((l = s.theme) == null ? void 0 : l[r]) || s.color;
            return c ? `  ${Rr(o)}: ${c};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, Ot = yr.Tooltip, ft = w.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: r = "dot",
    hideLabel: a = !1,
    hideIndicator: o = !1,
    label: s,
    labelFormatter: c,
    labelClassName: l,
    formatter: u,
    valueFormatter: m,
    color: f,
    nameKey: h,
    labelKey: y
  }, p) => {
    const { config: g } = Lo(), b = w.useMemo(() => {
      var M;
      if (a || !(t != null && t.length))
        return null;
      const [x] = t, C = `${y || (x == null ? void 0 : x.dataKey) || (x == null ? void 0 : x.name) || "value"}`, N = or(g, x, C), _ = !y && typeof s == "string" ? ((M = g[s]) == null ? void 0 : M.label) || s : N == null ? void 0 : N.label;
      return c ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: c(_, t) }) : _ ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: _ }) : null;
    }, [s, c, t, a, l, g, y]);
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
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((x, C) => {
            var O;
            const N = `${h || x.name || x.dataKey || "value"}`, _ = or(g, x, N), M = f || ((O = x.payload) == null ? void 0 : O.fill) || x.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  r === "dot" && "cv:items-center"
                ),
                children: u && (x == null ? void 0 : x.value) !== void 0 && x.name ? u(x.value, x.name, x, C, x.payload) : /* @__PURE__ */ v(ae, { children: [
                  _ != null && _.icon ? /* @__PURE__ */ i(_.icon, {}) : !o && /* @__PURE__ */ i(
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
                          /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: (_ == null ? void 0 : _.label) || x.name })
                        ] }),
                        x.value !== void 0 && /* @__PURE__ */ i("span", { className: "cv:font-mono cv:font-medium cv:tabular-nums cv:text-foreground", children: m ? m(x.value, x) : typeof x.value == "number" ? x.value.toLocaleString() : String(x.value) })
                      ]
                    }
                  )
                ] })
              },
              x.dataKey ? String(x.dataKey) : C
            );
          }) })
        ]
      }
    );
  }
);
ft.displayName = "ChartTooltipContent";
const Lt = yr.Legend, ht = w.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: r = "bottom", nameKey: a }, o) => {
    const { config: s } = Lo();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: S(
          "cv:flex cv:items-center cv:justify-center cv:gap-4",
          r === "top" ? "cv:pb-3" : "cv:pt-3",
          e
        ),
        children: n.map((c) => {
          const l = `${a || c.dataKey || "value"}`, u = or(s, c, l);
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
                    style: { backgroundColor: c.color }
                  }
                ),
                (u == null ? void 0 : u.label) ?? c.value
              ]
            },
            c.value ?? l
          );
        })
      }
    ) : null;
  }
);
ht.displayName = "ChartLegendContent";
function or(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let a = n;
  return n in t && typeof t[n] == "string" ? a = t[n] : r && n in r && typeof r[n] == "string" && (a = r[n]), a in e ? e[a] : e[n];
}
function Tr(e) {
  return e.categories.map((t, n) => {
    const r = { __cat: typeof t == "number" ? t : String(t) };
    for (const a of e.series) r[a.key] = a.data[n] ?? null;
    return r;
  });
}
function Dt(e) {
  return e === "top" ? "top" : "bottom";
}
function zt(e) {
  return "horizontal";
}
function Tt(e) {
  return "center";
}
function Ne(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function $e(e) {
  return e == null ? void 0 : e.domain;
}
function Ie(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function zs(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Bt(e) {
  return `var(${Rr(e.key)})`;
}
function Ts(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Do(e) {
  return e === "stacked" || e === "percent";
}
function Sn(e, t) {
  var c, l, u, m, f, h, y, p, g, b, k, x, C, N;
  const n = e.raw.annotation, r = (_) => {
    var M, O, V, P, L, D;
    if (_)
      return ((M = n == null ? void 0 : n.measures[_]) == null ? void 0 : M.shortTitle) ?? ((O = n == null ? void 0 : n.dimensions[_]) == null ? void 0 : O.shortTitle) ?? ((V = n == null ? void 0 : n.timeDimensions[_]) == null ? void 0 : V.shortTitle) ?? ((P = n == null ? void 0 : n.measures[_]) == null ? void 0 : P.title) ?? ((L = n == null ? void 0 : n.dimensions[_]) == null ? void 0 : L.title) ?? ((D = n == null ? void 0 : n.timeDimensions[_]) == null ? void 0 : D.title) ?? _;
  }, a = e.series.find((_) => {
    var M;
    return (((M = _.meta) == null ? void 0 : M.axis) ?? "left") !== "right";
  }), o = e.series.find((_) => {
    var M;
    return ((M = _.meta) == null ? void 0 : M.axis) === "right";
  }), s = (_) => {
    var M;
    return _ ? (M = _.meta) != null && M.measure ? r(_.meta.measure) : _.label : void 0;
  };
  return {
    x: (l = (c = t.axes) == null ? void 0 : c.x) != null && l.labelHide ? void 0 : ((m = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : m.label) ?? r((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (p = (y = t.axes) == null ? void 0 : y.y) != null && p.labelHide ? void 0 : ((b = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : b.label) ?? s(a),
    right: (x = (k = t.axes) == null ? void 0 : k.y2) != null && x.labelHide ? void 0 : ((N = (C = t.axes) == null ? void 0 : C.y2) == null ? void 0 : N.label) ?? s(o)
  };
}
function Je(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Fr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function nn(e, t, n) {
  return (r, a) => {
    const o = a == null ? void 0 : a.dataKey, s = typeof o == "string" || typeof o == "number" ? String(o) : void 0, c = (s ? n == null ? void 0 : n.get(s) : void 0) ?? t ?? s;
    return e.value(r, c, "tooltip");
  };
}
function hn(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function Fs({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var P, L, D, E, T, z, Q, J, I, K, te, Y, W, ne, me, U;
  const o = t.familyOptions ?? {}, s = t.orientation === "horizontal", c = Do(t.stackMode), l = t.stackMode === "percent", u = Tr(e), m = (R, Z, fe = "value") => l ? hn(R) : r.value(R, Z, fe), f = (R) => r.category(R), h = Fr(e), y = Je(e.series[0]), p = s ? (L = (P = t.axes) == null ? void 0 : P.y) == null ? void 0 : L.hide : (E = (D = t.axes) == null ? void 0 : D.x) == null ? void 0 : E.hide, g = s ? (T = t.axes) == null ? void 0 : T.x : (z = t.axes) == null ? void 0 : z.y, b = !s && e.series.some((R) => {
    var Z;
    return ((Z = R.meta) == null ? void 0 : Z.axis) === "right";
  }), k = Je(e.series.find((R) => {
    var Z;
    return ((Z = R.meta) == null ? void 0 : Z.axis) !== "right";
  })) ?? y, x = Je(e.series.find((R) => {
    var Z;
    return ((Z = R.meta) == null ? void 0 : Z.axis) === "right";
  })), C = Sn(e, t), N = C.x ? { value: C.x, position: "insideBottom", offset: -2 } : void 0, _ = C.x ? { value: C.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, M = C.left ? { value: C.left, position: "insideBottom", offset: -2 } : void 0, O = C.left ? { value: C.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, V = C.right ? { value: C.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(nt, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    Ri,
    {
      accessibilityLayer: !0,
      data: u,
      layout: s ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Jt, { vertical: s, horizontal: !s }),
        s ? /* @__PURE__ */ v(ae, { children: [
          /* @__PURE__ */ i(
            qe,
            {
              type: "category",
              dataKey: "__cat",
              hide: p,
              tickFormatter: f,
              label: _
            }
          ),
          /* @__PURE__ */ i(
            kt,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: Ie(g),
              domain: $e(g),
              tickFormatter: (R) => m(R, y, "axis"),
              label: M
            }
          )
        ] }) : /* @__PURE__ */ v(ae, { children: [
          /* @__PURE__ */ i(
            kt,
            {
              type: "category",
              dataKey: "__cat",
              hide: p,
              tickFormatter: f,
              label: N
            }
          ),
          /* @__PURE__ */ i(
            qe,
            {
              yAxisId: "left",
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: Ie(g),
              domain: $e(g),
              tickFormatter: (R) => m(R, k, "axis"),
              label: O
            }
          ),
          b && /* @__PURE__ */ i(
            qe,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (J = (Q = t.axes) == null ? void 0 : Q.y2) == null ? void 0 : J.hide,
              scale: Ie((I = t.axes) == null ? void 0 : I.y2),
              domain: $e((K = t.axes) == null ? void 0 : K.y2),
              tickFormatter: (R) => m(R, x, "axis"),
              label: V
            }
          )
        ] }),
        ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
          Ot,
          {
            content: /* @__PURE__ */ i(
              ft,
              {
                labelFormatter: (R) => r.category(R),
                indicator: ((Y = t.tooltip) == null ? void 0 : Y.indicator) ?? "dot",
                valueFormatter: l ? (R) => hn(R) : nn(r, void 0, h)
              }
            )
          }
        ),
        Ne(t).show && /* @__PURE__ */ i(
          Lt,
          {
            content: /* @__PURE__ */ i(ht, { className: Ne(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Dt((W = t.legend) == null ? void 0 : W.position),
            layout: zt((ne = t.legend) == null ? void 0 : ne.position),
            align: Tt((me = t.legend) == null ? void 0 : me.position)
          }
        ),
        e.series.map((R) => {
          var Z, fe, Fe, Ee;
          return /* @__PURE__ */ i(
            Ga,
            {
              yAxisId: s ? void 0 : ((Z = R.meta) == null ? void 0 : Z.axis) === "right" && b ? "right" : "left",
              dataKey: R.key,
              name: R.label,
              stackId: c ? (fe = R.meta) != null && fe.companion ? "__prev" : ((Fe = R.meta) == null ? void 0 : Fe.stackId) ?? "stack" : void 0,
              fill: Bt(R),
              fillOpacity: (Ee = R.meta) != null && Ee.companion ? 0.4 : void 0,
              radius: zs(o.barRadius, s),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                Ya,
                {
                  dataKey: R.key,
                  position: s ? "right" : "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (q) => m(typeof q == "boolean" ? Number(q) : q, Je(R), "label")
                }
              )
            },
            R.key
          );
        }),
        (U = o.referenceLines) == null ? void 0 : U.map((R, Z) => /* @__PURE__ */ i(
          Xt,
          {
            yAxisId: s ? void 0 : "left",
            ...R.axis === "y" ? { y: R.value } : { x: R.value },
            label: R.label,
            stroke: `var(--${R.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Z
        ))
      ]
    }
  ) });
}
function Es({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var k, x, C, N, _, M, O, V, P, L, D, E, T, z, Q, J;
  const o = t.familyOptions ?? {}, s = o.chrome === "none", c = Tr(e), l = (I) => r.category(I), u = e.series.some((I) => {
    var K;
    return ((K = I.meta) == null ? void 0 : K.axis) === "right";
  }), m = o.curve ?? "monotone", f = Fr(e), h = Je(e.series.find((I) => {
    var K;
    return ((K = I.meta) == null ? void 0 : K.axis) !== "right";
  })), y = Je(e.series.find((I) => {
    var K;
    return ((K = I.meta) == null ? void 0 : K.axis) === "right";
  })), p = Sn(e, t), g = !s && o.dots === !0, b = !s;
  return /* @__PURE__ */ i(
    nt,
    {
      config: n,
      className: s ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(Ai, { accessibilityLayer: !0, data: c, margin: s ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !s && /* @__PURE__ */ i(Jt, { vertical: !1 }),
        /* @__PURE__ */ i(
          kt,
          {
            type: "category",
            dataKey: "__cat",
            hide: s || ((x = (k = t.axes) == null ? void 0 : k.x) == null ? void 0 : x.hide),
            tickFormatter: l,
            label: !s && p.x ? { value: p.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            yAxisId: "left",
            type: "number",
            hide: s || ((N = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : N.hide),
            scale: Ie((_ = t.axes) == null ? void 0 : _.y),
            domain: $e((M = t.axes) == null ? void 0 : M.y),
            tickFormatter: (I) => r.value(I, h, "axis"),
            label: !s && p.left ? { value: p.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          qe,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: s || ((V = (O = t.axes) == null ? void 0 : O.y2) == null ? void 0 : V.hide),
            scale: Ie((P = t.axes) == null ? void 0 : P.y2),
            domain: $e((L = t.axes) == null ? void 0 : L.y2),
            tickFormatter: (I) => r.value(I, y, "axis"),
            label: !s && p.right ? { value: p.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !s && ((D = t.tooltip) == null ? void 0 : D.show) !== !1 && /* @__PURE__ */ i(
          Ot,
          {
            content: /* @__PURE__ */ i(
              ft,
              {
                labelFormatter: (I) => r.category(I),
                indicator: ((E = t.tooltip) == null ? void 0 : E.indicator) ?? "line",
                valueFormatter: nn(r, void 0, f)
              }
            )
          }
        ),
        !s && Ne(t).show && /* @__PURE__ */ i(
          Lt,
          {
            content: /* @__PURE__ */ i(ht, { className: Ne(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Dt((T = t.legend) == null ? void 0 : T.position),
            layout: zt((z = t.legend) == null ? void 0 : z.position),
            align: Tt((Q = t.legend) == null ? void 0 : Q.position)
          }
        ),
        e.series.map((I) => {
          var K, te, Y, W, ne, me;
          return /* @__PURE__ */ i(
            Qa,
            {
              yAxisId: u && ((K = I.meta) == null ? void 0 : K.axis) === "right" ? "right" : "left",
              type: ((te = I.meta) == null ? void 0 : te.curve) ?? m,
              dataKey: I.key,
              name: I.label,
              stroke: Bt(I),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (Y = I.meta) != null && Y.companion ? "5 4" : void 0,
              strokeOpacity: (W = I.meta) != null && W.companion ? 0.55 : void 0,
              dot: s || (ne = I.meta) != null && ne.companion ? !1 : ((me = I.meta) == null ? void 0 : me.dots) ?? g,
              activeDot: b,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !s,
              children: !s && o.showValueLabels && /* @__PURE__ */ i(
                Ya,
                {
                  dataKey: I.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (U) => r.value(typeof U == "boolean" ? Number(U) : U, Je(I), "label")
                }
              )
            },
            I.key
          );
        }),
        !s && ((J = o.referenceLines) == null ? void 0 : J.map((I, K) => /* @__PURE__ */ i(
          Xt,
          {
            yAxisId: "left",
            ...I.axis === "y" ? { y: I.value } : { x: I.value },
            label: I.label,
            stroke: `var(--${I.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          K
        )))
      ] })
    }
  );
}
function Ps({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var b, k, x, C, N, _, M, O, V, P, L, D, E, T;
  const o = t.familyOptions ?? {}, s = ((k = (b = t.mapping) == null ? void 0 : b.series) == null ? void 0 : k.mode) === "pivot", c = t.stackMode ?? (s ? "stacked" : "none"), l = Do(c), u = c === "percent", m = Tr(e), f = (z) => r.category(z), h = o.curve ?? "monotone", y = Fr(e), p = Je(e.series[0]), g = Sn(e, t);
  return /* @__PURE__ */ i(nt, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ja, { accessibilityLayer: !0, data: m, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Jt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((z) => /* @__PURE__ */ v("linearGradient", { id: `fill-${z.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Bt(z), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Bt(z), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, z.key)) }),
    /* @__PURE__ */ i(
      kt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (C = (x = t.axes) == null ? void 0 : x.x) == null ? void 0 : C.hide,
        tickFormatter: f,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        type: "number",
        hide: (_ = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : _.hide,
        scale: Ie((M = t.axes) == null ? void 0 : M.y),
        domain: $e((O = t.axes) == null ? void 0 : O.y),
        tickFormatter: (z) => u ? hn(z) : r.value(z, p, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((V = t.tooltip) == null ? void 0 : V.show) !== !1 && /* @__PURE__ */ i(
      Ot,
      {
        content: /* @__PURE__ */ i(
          ft,
          {
            labelFormatter: (z) => r.category(z),
            indicator: ((P = t.tooltip) == null ? void 0 : P.indicator) ?? "dot",
            valueFormatter: u ? (z) => hn(z) : nn(r, void 0, y)
          }
        )
      }
    ),
    Ne(t).show && /* @__PURE__ */ i(
      Lt,
      {
        content: /* @__PURE__ */ i(ht, { className: Ne(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Dt((L = t.legend) == null ? void 0 : L.position),
        layout: zt((D = t.legend) == null ? void 0 : D.position),
        align: Tt((E = t.legend) == null ? void 0 : E.position)
      }
    ),
    e.series.map((z) => {
      var Q, J, I, K, te, Y, W, ne;
      return /* @__PURE__ */ i(
        xr,
        {
          type: ((Q = z.meta) == null ? void 0 : Q.curve) ?? h,
          dataKey: z.key,
          name: z.label,
          stackId: l && !((J = z.meta) != null && J.companion) ? ((I = z.meta) == null ? void 0 : I.stackId) ?? "stack" : void 0,
          stroke: Bt(z),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (K = z.meta) != null && K.companion ? "5 4" : void 0,
          strokeOpacity: (te = z.meta) != null && te.companion ? 0.55 : void 0,
          fill: (Y = z.meta) != null && Y.companion ? "none" : `url(#fill-${z.key})`,
          fillOpacity: 1,
          dot: (W = z.meta) != null && W.companion ? !1 : ((ne = z.meta) == null ? void 0 : ne.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        z.key
      );
    }),
    (T = o.referenceLines) == null ? void 0 : T.map((z, Q) => /* @__PURE__ */ i(
      Xt,
      {
        ...z.axis === "y" ? { y: z.value } : { x: z.value },
        label: z.label,
        stroke: `var(--${z.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      Q
    ))
  ] }) });
}
function $s({ data: e, options: t, format: n, editing: r }) {
  var g, b, k, x, C;
  const a = t.familyOptions ?? {}, o = e.series[0], s = e.categories.map((N, _) => {
    const M = n.category(N);
    return {
      key: `slice-${_}`,
      label: M,
      value: (o == null ? void 0 : o.data[_]) ?? 0,
      fill: `var(--${ye[_ % ye.length]})`
    };
  }), c = Is(s, a.maxSlices), l = c.reduce((N, _) => N + _.value, 0), u = {};
  c.forEach((N, _) => {
    u[N.key] = {
      label: N.label,
      color: `var(--${ye[_ % ye.length]})`
    };
  });
  const m = `${a.innerRadiusPct ?? 0}%`, f = `${a.outerRadiusPct ?? 80}%`, h = (a.innerRadiusPct ?? 0) > 0, y = a.showLabels ?? "percent", p = y === "none" ? !1 : ({ payload: N, percent: _ }) => {
    const M = N;
    return y === "name" ? (M == null ? void 0 : M.label) ?? "" : y === "value" ? n.value(M == null ? void 0 : M.value, o == null ? void 0 : o.key, "label") : `${((_ !== void 0 ? _ : M && l > 0 ? M.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(nt, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(Mi, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      Ot,
      {
        content: /* @__PURE__ */ i(
          ft,
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
      Oi,
      {
        data: c,
        dataKey: "value",
        nameKey: "label",
        innerRadius: m,
        outerRadius: f,
        paddingAngle: a.padAngle,
        cornerRadius: a.cornerRadius,
        label: p,
        labelLine: y !== "none" && !h,
        isAnimationActive: !1,
        children: [
          c.map((N) => /* @__PURE__ */ i(Xa, { fill: N.fill }, N.key)),
          h && a.centerLabel && /* @__PURE__ */ i(
            Li,
            {
              position: "center",
              content: ({ viewBox: N }) => {
                var V, P;
                if (!N || !("cx" in N)) return null;
                const { cx: _, cy: M } = N, O = ((V = a.centerLabel) == null ? void 0 : V.value) === void 0 || a.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : a.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: _, y: M, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: _, y: M, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: O }),
                  ((P = a.centerLabel) == null ? void 0 : P.label) && /* @__PURE__ */ i("tspan", { x: _, y: M + 20, className: "cv:fill-muted-foreground cv:text-xs", children: a.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    Ne(t).show && /* @__PURE__ */ i(
      Lt,
      {
        content: /* @__PURE__ */ i(
          ht,
          {
            nameKey: "label",
            className: Ne(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: Dt((k = t.legend) == null ? void 0 : k.position),
        layout: zt((x = t.legend) == null ? void 0 : x.position),
        align: Tt((C = t.legend) == null ? void 0 : C.position)
      }
    )
  ] }) });
}
function Is(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((c, l) => l.value - c.value), r = n.slice(0, t - 1), o = n.slice(t - 1).reduce((c, l) => c + l.value, 0), s = t - 1;
  return [
    ...r,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${ye[s % ye.length]})`
    }
  ];
}
function js({ data: e, options: t, format: n, editing: r }) {
  var p, g, b, k, x, C, N, _, M, O, V, P, L, D, E, T, z, Q, J, I, K, te, Y, W, ne, me;
  const a = t.familyOptions ?? {}, o = e.raw.annotation, s = e.raw.rows, c = { x: a.x, y: a.y, z: a.size }, l = ((p = o == null ? void 0 : o.measures[a.x]) == null ? void 0 : p.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[a.x]) == null ? void 0 : g.shortTitle) ?? a.x, u = ((b = o == null ? void 0 : o.measures[a.y]) == null ? void 0 : b.shortTitle) ?? ((k = o == null ? void 0 : o.dimensions[a.y]) == null ? void 0 : k.shortTitle) ?? a.y, m = (C = (x = t.axes) == null ? void 0 : x.x) != null && C.labelHide ? void 0 : ((_ = (N = t.axes) == null ? void 0 : N.x) == null ? void 0 : _.label) ?? l, f = (O = (M = t.axes) == null ? void 0 : M.y) != null && O.labelHide ? void 0 : ((P = (V = t.axes) == null ? void 0 : V.y) == null ? void 0 : P.label) ?? u, h = Vs(s, a), y = {};
  return h.forEach((U, R) => {
    y[U.key] = { label: U.label, color: `var(--${ye[R % ye.length]})` };
  }), /* @__PURE__ */ i(nt, { config: y, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Di, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Jt, {}),
    /* @__PURE__ */ i(
      kt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: (D = (L = t.axes) == null ? void 0 : L.x) == null ? void 0 : D.hide,
        scale: Ie((E = t.axes) == null ? void 0 : E.x),
        domain: $e((T = t.axes) == null ? void 0 : T.x),
        tickFormatter: (U) => n.value(U, a.x, "axis"),
        label: m ? { value: m, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (Q = (z = t.axes) == null ? void 0 : z.y) == null ? void 0 : Q.hide,
        scale: Ie((J = t.axes) == null ? void 0 : J.y),
        domain: $e((I = t.axes) == null ? void 0 : I.y),
        tickFormatter: (U) => n.value(U, a.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    a.size && /* @__PURE__ */ i(zi, { type: "number", dataKey: "z", range: a.sizeRange ?? [40, 400], name: a.size }),
    ((K = t.tooltip) == null ? void 0 : K.show) !== !1 && /* @__PURE__ */ i(
      Ot,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          ft,
          {
            indicator: ((te = t.tooltip) == null ? void 0 : te.indicator) ?? "dot",
            valueFormatter: (U, R) => {
              const Z = R == null ? void 0 : R.dataKey, fe = typeof Z == "string" ? c[Z] : void 0;
              return n.value(U, fe, "tooltip");
            }
          }
        )
      }
    ),
    Ne(t).show && h.length > 1 && /* @__PURE__ */ i(
      Lt,
      {
        content: /* @__PURE__ */ i(ht, { className: Ne(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Dt((Y = t.legend) == null ? void 0 : Y.position),
        layout: zt((W = t.legend) == null ? void 0 : W.position),
        align: Tt((ne = t.legend) == null ? void 0 : ne.position)
      }
    ),
    h.map((U, R) => /* @__PURE__ */ i(
      Ti,
      {
        name: U.label,
        data: U.points,
        shape: a.shape ?? "circle",
        fill: `var(--color-${U.key})`,
        children: h.length === 1 && U.points.map((Z, fe) => /* @__PURE__ */ i(Xa, { fill: `var(--${ye[R % ye.length]})` }, fe))
      },
      U.key
    )),
    (me = a.referenceLines) == null ? void 0 : me.map((U, R) => /* @__PURE__ */ i(
      Xt,
      {
        ...U.axis === "y" ? { y: U.value } : { x: U.value },
        label: U.label,
        stroke: `var(--${U.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      R
    ))
  ] }) });
}
function Vs(e, t) {
  const n = (a) => ({
    x: Hn(a[t.x]),
    y: Hn(a[t.y]),
    ...t.size ? { z: Hn(a[t.size]) } : {}
  });
  if (!t.groupBy)
    return [{ key: "series-0", label: "Points", points: e.map(n) }];
  const r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = String(a[t.groupBy] ?? "—"), s = r.get(o) ?? [];
    s.push(n(a)), r.set(o, s);
  }
  return [...r.entries()].map(([a, o], s) => ({
    key: `series-${s}`,
    label: a,
    points: o
  }));
}
function Hn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function qs(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Ks(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function Hs(e) {
  var l, u, m, f;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, o = (h) => r.value(h, a.measure, "kpi"), s = zo(t.raw.rows, a.measure) ?? 0, c = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : f.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ i(Qs, { value: s, label: c, fmt: o, fo: a }) : /* @__PURE__ */ i(Bs, { ...e, value: s, label: c, fo: a, fmt: o });
}
function Bs({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var f;
  const a = n.goodDirection ?? ((f = n.comparison) == null ? void 0 : f.goodDirection) ?? "up", o = Xs(e.raw.rows, t, n), s = !!n.comparison, c = n.sparkline ? e.series[0] : void 0, l = !!c && c.data.some((h) => h !== null), u = o ? o.diff : c ? Gs(c) : 0, m = Ks(qs(u, a));
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", style: { containerType: "size" }, children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:flex-col cv:items-center cv:justify-center cv:gap-1.5 cv:overflow-hidden cv:px-3 cv:text-center", children: [
      /* @__PURE__ */ i(
        "span",
        {
          className: "cv:max-w-full cv:font-bold cv:leading-none cv:tabular-nums cv:text-foreground",
          style: { fontSize: "clamp(1.25rem, min(16cqw, 30cqh), 3.5rem)", whiteSpace: "nowrap" },
          children: r(t)
        }
      ),
      s && (o ? /* @__PURE__ */ i(Ys, { delta: o, goodDirection: a, fo: n, fmt: r }) : /* @__PURE__ */ i(Ws, {}))
    ] }),
    l && /* @__PURE__ */ i("div", { className: "cv:shrink-0 cv:px-1 cv:pb-1", children: /* @__PURE__ */ i(Us, { series: c, categories: e.categories, colorClass: m }) })
  ] });
}
function Ws() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-muted cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-muted-foreground",
      title: "No data in the comparison period",
      children: [
        /* @__PURE__ */ i(no, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "no prior data" })
      ]
    }
  );
}
function Us({
  series: e,
  categories: t,
  colorClass: n
}) {
  const r = Za(), a = t.map((o, s) => ({ x: typeof o == "number" ? o : String(o), v: e.data[s] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i($i, { width: "100%", height: "100%", children: /* @__PURE__ */ v(Ja, { data: a, margin: { top: 3, right: 0, bottom: 0, left: 0 }, children: [
    /* @__PURE__ */ i("defs", { children: /* @__PURE__ */ v("linearGradient", { id: r, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "0%", stopColor: "currentColor", stopOpacity: 0.28 }),
      /* @__PURE__ */ i("stop", { offset: "100%", stopColor: "currentColor", stopOpacity: 0.02 })
    ] }) }),
    /* @__PURE__ */ i(
      xr,
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
function Gs(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Ys({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = e.diff > 0, o = e.diff === 0, s = o ? !0 : a === (t === "up"), c = o ? no : a ? kn : Cn, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: S(
        "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:px-2 cv:py-0.5 cv:text-sm cv:font-semibold cv:leading-none cv:tabular-nums",
        o ? "cv:bg-muted cv:text-muted-foreground" : s ? "cv:bg-emerald-500/10 cv:text-emerald-600" : "cv:bg-destructive/10 cv:text-destructive"
      ),
      title: `vs prior period: ${e.diff > 0 ? "+" : ""}${r(e.diff)}`,
      children: [
        /* @__PURE__ */ i(c, { className: "cv:size-3.5 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: l })
      ]
    }
  );
}
function Qs({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, f;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, o = ((f = r.gauge) == null ? void 0 : f.max) ?? Math.max(e, 1), s = Math.max(a, Math.min(o, e)), c = Js(e, r) ?? "chart-1", l = [{ name: t, value: s, fill: `var(--${c})` }], u = { value: { label: t, color: `var(--${c})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(nt, { config: u, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      Fi,
      {
        data: l,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Ei, { type: "number", domain: [a, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(Pi, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ v("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-2xl cv:font-bold cv:tabular-nums cv:text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t })
    ] })
  ] });
}
function Js(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const o of [...n].sort((s, c) => s.at - c.at))
    e >= o.at && (r = o.colorToken);
  return r;
}
function zo(e, t) {
  for (const n of e) {
    const r = To(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Xs(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = zo(e, r.value));
  else {
    const c = e[1];
    a = c ? To(c[n.measure]) : null;
  }
  if (a === null) return null;
  const o = t - a, s = a !== 0 ? o / a : null;
  return { current: t, baseline: a, diff: o, pct: s };
}
function To(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Fo = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
Fo.displayName = "Table";
const Eo = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
Eo.displayName = "TableHeader";
const Po = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
Po.displayName = "TableBody";
const cn = w.forwardRef(
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
cn.displayName = "TableRow";
const ir = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
ir.displayName = "TableHead";
const sn = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
sn.displayName = "TableCell";
const Zs = w.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
Zs.displayName = "TableCaption";
const $o = Sr(
  "cv:inline-flex cv:items-center cv:justify-center cv:gap-2 cv:whitespace-nowrap cv:rounded-md cv:text-sm cv:font-medium cv:transition-colors cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:pointer-events-none cv:disabled:opacity-50 cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
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
), B = w.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: r ?? "button",
      className: S($o({ variant: t, size: n }), e),
      ...a
    }
  )
);
B.displayName = "Button";
function el({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, o = e.raw.annotation, s = w.useMemo(
    () => tl(a, o, r, n),
    [a, o, r, n]
  ), [c, l] = w.useState(null), [u, m] = w.useState(0), f = r.sortable !== !1, h = r.pageSize ?? 25, y = w.useMemo(() => {
    if (!c) return a;
    const C = c.dir === "asc" ? 1 : -1;
    return [...a].sort((N, _) => il(N[c.member], _[c.member]) * C);
  }, [a, c]), p = Math.max(1, Math.ceil(y.length / h)), g = Math.min(u, p - 1), b = y.slice(g * h, g * h + h), k = (C) => {
    f && (l(
      (N) => (N == null ? void 0 : N.member) === C ? { member: C, dir: N.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), m(0));
  }, x = r.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", r.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(Fo, { children: [
      /* @__PURE__ */ i(Eo, { className: S(r.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(cn, { children: [
        r.showRowNumbers && /* @__PURE__ */ i(ir, { className: "cv:w-10 cv:text-right", children: "#" }),
        s.map((C) => /* @__PURE__ */ i(
          ir,
          {
            className: ga(C.align),
            style: C.width ? { width: C.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              B,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => k(C.member),
                children: [
                  C.label,
                  /* @__PURE__ */ i(ol, { active: (c == null ? void 0 : c.member) === C.member, dir: c == null ? void 0 : c.dir })
                ]
              }
            ) : C.label
          },
          C.member
        ))
      ] }) }),
      /* @__PURE__ */ v(Po, { children: [
        b.map((C, N) => /* @__PURE__ */ v(cn, { children: [
          r.showRowNumbers && /* @__PURE__ */ i(sn, { className: S("cv:text-right cv:text-muted-foreground", x && "cv:py-1"), children: g * h + N + 1 }),
          s.map((_) => {
            const M = cl(_.member, C[_.member], r.conditionalFormat);
            return /* @__PURE__ */ i(
              sn,
              {
                className: S(ga(_.align), x && "cv:py-1"),
                style: M ? { color: M } : void 0,
                children: _.render(C[_.member])
              },
              _.member
            );
          })
        ] }, N)),
        b.length === 0 && /* @__PURE__ */ i(cn, { children: /* @__PURE__ */ i(
          sn,
          {
            colSpan: s.length + (r.showRowNumbers ? 1 : 0),
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
          B,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((C) => Math.max(0, C - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          B,
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
function tl(e, t, n, r) {
  var s;
  const a = e.length > 0 ? Object.keys(e[0]) : rl(t);
  return ((s = n.columns) != null && s.length ? n.columns : a.map((c) => ({ member: c }))).filter((c) => !c.hidden).map((c) => {
    const l = c.member, u = t ? al(t, l) : void 0, m = t ? l in t.measures : !1, f = c.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = c.align ?? (m ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: c.width,
      render: (y) => nl(y, m, l, r)
    };
  });
}
function nl(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function rl(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function al(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ga(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function ol({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(kn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Cn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Ki, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function il(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function cl(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && sl(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function sl(e, t, n) {
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
function ll({ data: e, options: t, format: n, editing: r }) {
  var g, b, k, x, C, N, _, M, O, V, P, L, D, E, T, z, Q, J, I, K, te, Y, W, ne, me, U;
  const a = t.familyOptions ?? {}, o = a.series ?? [], s = ml(e, o), c = (R) => n.category(R), l = o.some((R) => R.axis === "right"), u = (g = o.find((R) => R.axis !== "right")) == null ? void 0 : g.member, m = (b = o.find((R) => R.axis === "right")) == null ? void 0 : b.member, f = Sn(e, t), h = (x = (k = t.axes) == null ? void 0 : k.y) != null && x.labelHide ? void 0 : ((N = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : N.label) ?? (u ? ln(e, u) : void 0), y = (M = (_ = t.axes) == null ? void 0 : _.y2) != null && M.labelHide ? void 0 : ((V = (O = t.axes) == null ? void 0 : O.y2) == null ? void 0 : V.label) ?? (m ? ln(e, m) : void 0), p = {};
  return o.forEach((R, Z) => {
    const fe = R.colorToken ?? ye[Z % ye.length];
    p[R.member] = {
      label: R.label ?? ln(e, R.member),
      color: `var(--${fe})`
    };
  }), /* @__PURE__ */ i(nt, { config: p, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ii, { accessibilityLayer: !0, data: s, children: [
    /* @__PURE__ */ i(Jt, { vertical: !1 }),
    /* @__PURE__ */ i(
      kt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (L = (P = t.axes) == null ? void 0 : P.x) == null ? void 0 : L.hide,
        tickFormatter: c,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        yAxisId: "left",
        type: "number",
        hide: (E = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : E.hide,
        scale: Ie((T = t.axes) == null ? void 0 : T.y),
        domain: $e((z = t.axes) == null ? void 0 : z.y),
        tickFormatter: (R) => n.value(R, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      qe,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (J = (Q = t.axes) == null ? void 0 : Q.y2) == null ? void 0 : J.hide,
        scale: Ie((I = t.axes) == null ? void 0 : I.y2),
        domain: $e((K = t.axes) == null ? void 0 : K.y2),
        tickFormatter: (R) => n.value(R, m, "axis"),
        label: y ? { value: y, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
      Ot,
      {
        content: /* @__PURE__ */ i(
          ft,
          {
            labelFormatter: (R) => n.category(R),
            indicator: ((Y = t.tooltip) == null ? void 0 : Y.indicator) ?? "dot",
            valueFormatter: nn(n)
          }
        )
      }
    ),
    Ne(t).show && /* @__PURE__ */ i(
      Lt,
      {
        content: /* @__PURE__ */ i(ht, { className: Ne(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Dt((W = t.legend) == null ? void 0 : W.position),
        layout: zt((ne = t.legend) == null ? void 0 : ne.position),
        align: Tt((me = t.legend) == null ? void 0 : me.position)
      }
    ),
    o.map((R) => ul(R, e, a)),
    (U = a.referenceLines) == null ? void 0 : U.map((R, Z) => /* @__PURE__ */ i(
      Xt,
      {
        yAxisId: "left",
        ...R.axis === "y" ? { y: R.value } : { x: R.value },
        label: R.label,
        stroke: `var(--${R.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      Z
    ))
  ] }) });
}
function ul(e, t, n) {
  const r = e.axis === "right" ? "right" : "left", a = `var(${Rr(e.member)})`, o = e.label ?? ln(t, e.member), s = e.curve ?? n.curve ?? "monotone", c = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    Ga,
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
    xr,
    {
      yAxisId: r,
      type: s,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      stroke: a,
      strokeWidth: n.strokeWidth ?? 2,
      fill: a,
      fillOpacity: n.fillOpacity ?? 0.25,
      dot: c,
      connectNulls: l
    },
    e.member
  ) : /* @__PURE__ */ i(
    Qa,
    {
      yAxisId: r,
      type: s,
      dataKey: e.member,
      name: o,
      stroke: a,
      strokeWidth: n.strokeWidth ?? 2,
      dot: c,
      connectNulls: l
    },
    e.member
  );
}
function ml(e, t) {
  var o, s, c;
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
  const a = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((c = (s = e.raw.query.timeDimensions) == null ? void 0 : s[0]) == null ? void 0 : c.dimension);
  return e.raw.rows.map((l) => {
    const u = a ? l[a] : void 0, m = {
      __cat: u == null ? "" : String(u)
    };
    for (const f of t) m[f.member] = dl(l[f.member]);
    return m;
  });
}
function ln(e, t) {
  var n, r, a, o;
  return ((r = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : r.shortTitle) ?? ((o = (a = e.raw.annotation) == null ? void 0 : a.measures[t]) == null ? void 0 : o.title) ?? t;
}
function dl(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const st = "cv:w-40", vl = "cv:w-56", Io = "a date or category", Bn = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: Io, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0
  }
], fl = [
  { id: "x", label: "Category", hint: Io, cardinality: "one", kinds: ["time", "category"] },
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
], hl = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], pl = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], gl = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], bl = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], yl = ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo"], Ye = (e) => yl.indexOf(e), Be = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: ro,
    order: Ye("bar"),
    component: Fs,
    optionsSchema: Ue.bar,
    defaults: Ge.bar,
    wells: Bn,
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
    sidebarWidthClass: st
  },
  line: {
    family: "line",
    label: "Line",
    icon: Qi,
    order: Ye("line"),
    component: Es,
    optionsSchema: Ue.line,
    defaults: Ge.line,
    wells: Bn,
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
    sidebarWidthClass: st
  },
  area: {
    family: "area",
    label: "Area",
    icon: Hi,
    order: Ye("area"),
    component: Ps,
    optionsSchema: Ue.area,
    defaults: Ge.area,
    wells: Bn,
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
    sidebarWidthClass: st
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: Yi,
    order: Ye("pie"),
    component: $s,
    optionsSchema: Ue.pie,
    defaults: Ge.pie,
    wells: hl,
    zones: { left: ["size"], bottom: ["slices"] },
    dualAxisY: !1,
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
    icon: Gi,
    order: Ye("scatter"),
    component: js,
    optionsSchema: Ue.scatter,
    defaults: Ge.scatter,
    wells: pl,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    dualAxisY: !1,
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
    icon: Ui,
    order: Ye("kpi"),
    component: Hs,
    optionsSchema: Ue.kpi,
    defaults: Ge.kpi,
    wells: gl,
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
    sidebarWidthClass: vl
  },
  table: {
    family: "table",
    label: "Table",
    icon: Wi,
    order: Ye("table"),
    component: el,
    optionsSchema: Ue.table,
    defaults: Ge.table,
    wells: bl,
    zones: { left: ["columns"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: st
  },
  combo: {
    family: "combo",
    label: "Combo",
    icon: Bi,
    order: Ye("combo"),
    component: ll,
    optionsSchema: Ue.combo,
    defaults: Ge.combo,
    wells: fl,
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
    sidebarWidthClass: st
  }
}, xl = Be.bar, wl = Be.line, kl = Be.area, Cl = Be.pie, Nl = Be.scatter, Sl = Be.kpi, _l = Be.table, Rl = Be.combo, Er = [
  xl,
  wl,
  kl,
  Cl,
  Nl,
  Sl,
  _l,
  Rl
], Al = d.any();
function Pr(e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const s of e) n.set(s.family, s);
  for (const s of t ?? []) n.set(s.family, s);
  Object.freeze(n);
  const r = [...n.values()].sort(
    (s, c) => s.order - c.order || s.family.localeCompare(c.family)
  ), a = r.map((s) => s.family), o = {
    get: (s) => n.get(s),
    require: (s) => {
      const c = n.get(s);
      if (!c)
        throw new Error(
          `Unknown chart family "${s}". Provide it via <CubeVizProvider families={[...]}> (or buildFamilyRegistry) before rendering/editing a spec that uses it.`
        );
      return c;
    },
    list: () => r,
    families: () => a,
    defaults: (s) => {
      var c;
      return ((c = n.get(s)) == null ? void 0 : c.defaults) ?? Ms;
    },
    optionsSchema: (s) => {
      var c;
      return ((c = n.get(s)) == null ? void 0 : c.optionsSchema) ?? Al;
    },
    resolveOptions: (s) => Os(s, o.defaults(s.family))
  };
  return o;
}
const _n = Pr(Er);
function Ml(e, t = _n) {
  return t.resolveOptions(e);
}
const sp = Object.fromEntries(
  Object.entries(Be).map(([e, t]) => [e, t.component])
);
function Ol({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: o,
  editing: s,
  registry: c = _n
}) {
  const l = ee(() => Ml(t, c), [t, c]);
  if (a != null && a.loading)
    return /* @__PURE__ */ i(rs, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (a != null && a.error)
    return /* @__PURE__ */ v(Ar, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(ao, {}),
      /* @__PURE__ */ i(Mr, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(Or, { children: a.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const u = n && Object.keys(n).length > 0 ? n : Ts(e), m = r ?? Mo(e.raw.annotation, l, Lr), f = (o == null ? void 0 : o[l.family]) ?? c.require(l.family).component;
  return /* @__PURE__ */ i(
    f,
    {
      data: e,
      options: l,
      config: u,
      format: m,
      state: a,
      editing: s
    }
  );
}
const ye = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Wn = 8;
function cr(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : ye, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const m = a(u.key, u.colorToken);
    m && o.add(m);
  }
  let s = 0;
  const c = () => {
    for (let u = 0; u < n.length; u++) {
      const m = n[s++ % n.length];
      if (!o.has(m))
        return o.add(m), m;
    }
    return n[s++ % n.length];
  };
  return e.map((u) => a(u.key, u.colorToken) ?? c());
}
function ba(e, t) {
  const n = cr(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Ll(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function on(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Ll(e[n]);
  return t;
}
function Dl(e) {
  return {
    measures: on(e.measures ?? {}),
    dimensions: on(e.dimensions ?? {}),
    segments: on(e.segments ?? {}),
    timeDimensions: on(e.timeDimensions ?? {})
  };
}
function wt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Rn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let s = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!s || s.kind === void 0 || s.kind === "auto") && (s = { ...s, kind: "currency" }), s && (a.format = s), t != null && t.axis && (a.axis = t.axis), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function zl(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Tl(e, t) {
  var r, a;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, s] of Object.entries(e.measures)) {
    const c = (r = s.meta) == null ? void 0 : r.unit;
    if (!c || ((a = s.meta) == null ? void 0 : a.convert) === !1) continue;
    const l = t.conversions[c];
    l && (n.set(o, { to: l.toImperial, unit: l.imperialUnit }), e.measures[o] = { ...s, meta: { ...s.meta, unit: l.imperialUnit } });
  }
  return n;
}
function Fl(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, o] of t) {
      const s = An(r[a]);
      s !== null && (r[a] = o.to(s));
    }
    return r;
  });
}
function El(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((o) => o === null ? null : a.to(o)));
    }
}
function Pl(e, t, n, r, a = _n) {
  const o = Dl(e.annotation()), s = Tl(o, r), c = Fl(e.tablePivot(), s), l = t.mapping;
  if (!l) {
    const f = n.measures ?? [];
    if (a.require(t.family).measureOnly && f.length > 0) {
      const h = c[0] ?? {}, y = [
        {
          key: "value",
          label: "Value",
          data: f.map((g) => An(h[g])),
          meta: { ...Rn(wt(o, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return ba(y, t.colors), { categories: f.map(
        (g) => {
          var b, k;
          return ((b = wt(o, g)) == null ? void 0 : b.shortTitle) ?? ((k = wt(o, g)) == null ? void 0 : k.title) ?? g;
        }
      ), series: y, raw: { rows: c, annotation: o, query: n }, empty: c.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: c, annotation: o, query: n },
      empty: c.length === 0
    };
  }
  const u = l.series.mode === "measures" ? Il(e, l.series, t, o) : jl(e, l.category.member, l.series, t, o), m = $l(e, l);
  return El(u, s), ba(u, t.colors), {
    categories: m,
    series: u,
    raw: { rows: c, annotation: o, query: n },
    empty: c.length === 0
  };
}
function $l(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Il(e, t, n, r) {
  const { members: a, meta: o } = t, s = e.chartPivot();
  return a.map((c) => {
    const l = wt(r, c), u = o == null ? void 0 : o[c], m = s.map((f) => An(f[c]));
    return {
      key: c,
      label: zl(l, u, c),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Rn(l, u, n.format), measure: c }
    };
  });
}
function jl(e, t, n, r, a) {
  const { value: o, values: s, pivot: c } = n, l = s && s.length > 0 ? s : [o], u = new Set(l), m = l.length > 1, f = { x: [t], y: [c, "measures"] }, y = e.seriesNames(f).filter((k) => {
    const x = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : void 0;
    return x === void 0 || u.has(x);
  }), p = e.chartPivot(f), g = wt(a, o), b = y.map((k) => {
    var L, D;
    const x = (L = k.yValues) == null ? void 0 : L[0], C = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : o, N = wt(a, C), _ = (N == null ? void 0 : N.shortTitle) ?? (N == null ? void 0 : N.title) ?? C, M = x ?? k.shortTitle ?? k.title ?? k.key, O = m ? `${_} · ${M}` : M, V = p.map((E) => An(E[k.key])), P = (D = n.meta) == null ? void 0 : D[C];
    return {
      key: k.key,
      label: O,
      data: V,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Rn(N ?? g, P, r.format),
        measure: C
      }
    };
  });
  return Vl(b, g, r.format);
}
function Vl(e, t, n) {
  var m, f, h;
  if (e.length <= Wn) return e;
  const r = (y) => y.data.reduce((p, g) => p + (g ?? 0), 0), a = [...e].sort((y, p) => r(p) - r(y)), o = a.slice(0, Wn - 1), s = a.slice(Wn - 1), c = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, l = Array.from({ length: c }, (y, p) => {
    let g = 0, b = !1;
    for (const k of s) {
      const x = k.data[p];
      x !== null && (g += x, b = !0);
    }
    return b ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${s.length})`,
    data: l,
    meta: { ...Rn(t, void 0, n), ...(h = (f = o[0]) == null ? void 0 : f.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function An(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function St(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const ql = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Kl(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Gt(e, t, n) {
  var r;
  if (Oe(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Hl(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = Gt(o, t, n);
    if (!St(s))
      if (Array.isArray(s))
        for (const c of s)
          St(c) || a.push(c);
      else
        a.push(s);
  }
  return a.length === 0 ? r ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: a };
}
function Bl(e, t, n) {
  if ("and" in e) {
    const r = sr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = sr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Hl(e, t, n);
}
function sr(e, t, n) {
  const r = [];
  for (const a of e) {
    const o = Bl(a, t, n);
    o !== void 0 && r.push(o);
  }
  return r;
}
function Wl(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Gt(e.granularity, t, n);
    St(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Gt(e.dateRange, t, n);
    St(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function jo(e, t, n) {
  const r = ql(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((o) => Wl(o, r, t))), e.filters !== void 0) {
    const o = sr(e.filters, r, t);
    o.length > 0 && (a.filters = o);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Gt(e.limit, r, t);
    St(o) || (a.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Gt(e.offset, r, t);
    St(o) || (a.offset = o);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function Ul() {
  let e, t;
  return (n, r, a) => {
    const o = jo(n, r, a), s = JSON.stringify(o);
    return e !== void 0 && s === t ? e : (e = o, t = s, o);
  };
}
function Gl(e, t) {
  let n = {};
  for (const o of e)
    o.default !== void 0 && (n[o.name] = o.default);
  if (t)
    for (const o of Object.keys(t)) {
      const s = t[o];
      s !== void 0 && (n[o] = s);
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
    set(o, s) {
      if (s === void 0) {
        if (!Object.prototype.hasOwnProperty.call(n, o)) return;
        const c = { ...n };
        delete c[o], n = c;
      } else {
        if (n[o] === s) return;
        n = { ...n, [o]: s };
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
class Yl extends Error {
}
const Ql = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Yl(`"${e}" cannot be parsed into a number`);
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
function ya(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Jl extends Error {
}
class xa extends Error {
}
class Xl extends Error {
}
class Un extends Error {
}
class Zl extends Error {
}
class eu {
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
      throw new xa(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return ya(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Xl(`Cannot convert incompatible measures of ${a.measure} and ${o.measure}`);
    let s = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (s = this.cls.sub(s, this.convertFraction(o.unit.anchor_shift))), o.system != a.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Un(`Unable to convert units. Anchors are missing for "${o.measure}" and "${a.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Un(`Unable to find anchor for "${o.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        s = m(s, this.cls);
      else if (typeof f == "number")
        s = this.cls.mul(s, f);
      else if (ya(f))
        s = this.cls.mul(s, this.convertFraction(f));
      else
        throw new Un("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return a.unit.anchor_shift && (s = this.cls.add(s, this.convertFraction(a.unit.anchor_shift))), this.cls.div(s, this.convertFraction(a.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, r, a;
    if (this.origin == null)
      throw new xa(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let s = [], c = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (s = (n = t.exclude) !== null && n !== void 0 ? n : [], c = (r = t.cutOffNumber) !== null && r !== void 0 ? r : c, l = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const f = this.describe(m);
      if (s.indexOf(m) === -1 && f.system === l) {
        const y = this.to(m);
        if (o ? this.cls.gt(y, c) : this.cls.lt(y, c))
          continue;
        (u === null || (o ? this.cls.lte(y, c) && this.cls.gt(y, u.val) : this.cls.gte(y, c) && this.cls.lt(y, u.val))) && (u = {
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
        for (const [o, s] of Object.entries(a.systems))
          for (const [c, l] of Object.entries(s))
            n.push(this.describeUnit({
              abbr: c,
              measure: r,
              system: o,
              unit: l
            }));
    else {
      if (!this.isMeasure(t))
        throw new Zl(`Meausure "${t}" not found.`);
      const r = this.measureData[t];
      for (const [a, o] of Object.entries(r.systems))
        for (const [s, c] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: s,
            measure: t,
            system: a,
            unit: c
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
    throw new Jl(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
      for (const s of Object.values(o))
        n = [
          ...n,
          ...Object.keys(s)
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
function tu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, r] of Object.entries(e))
    for (const [a, o] of Object.entries(r.systems))
      for (const [s, c] of Object.entries(o))
        t.set(s, {
          measure: n,
          system: a,
          abbr: s,
          unit: c
        });
  return t;
}
function nu(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = tu(e);
  return (r) => new eu({
    measures: e,
    unitCache: n,
    cls: Ql
  }, r);
}
const ru = {
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
}, au = {
  systems: {
    metric: ru
  }
}, ou = {
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
}, iu = {
  systems: {
    SI: ou
  }
}, cu = {
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
}, su = {
  systems: {
    SI: cu
  }
}, lu = {
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
}, uu = {
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
}, mu = {
  systems: {
    metric: lu,
    imperial: uu
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
}, du = {
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
}, vu = {
  systems: {
    SI: du
  }
}, fu = {
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
}, hu = {
  systems: {
    SI: fu
  }
}, pu = {
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
}, gu = {
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
}, bu = {
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
}, yu = {
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
}, xu = {
  systems: {
    bit: pu,
    byte: gu,
    IECBit: bu,
    IECByte: yu
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
}, wu = {
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
}, ku = {
  systems: {
    metric: wu
  }
}, Cu = {
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
}, Nu = {
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
}, Su = {
  systems: {
    SI: Cu,
    nutrition: Nu
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
}, _u = {
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
}, Ru = {
  systems: {
    SI: _u
  }
}, Au = {
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
}, Mu = {
  systems: {
    SI: Au
  }
}, Ou = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Lu = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Du = {
  systems: {
    metric: Ou,
    imperial: Lu
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
}, zu = {
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
}, Tu = {
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
}, Fu = {
  systems: {
    metric: zu,
    imperial: Tu
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
}, Eu = {
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
}, Pu = {
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
}, $u = {
  systems: {
    metric: Eu,
    imperial: Pu
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
}, Iu = {
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
}, ju = {
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
}, Vu = {
  systems: {
    metric: Iu,
    imperial: ju
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
}, qu = {
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
}, Ku = {
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
}, Hu = {
  systems: {
    metric: qu,
    imperial: Ku
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
}, Bu = {
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
}, Wu = {
  systems: {
    SI: Bu
  }
}, Uu = {
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
}, Gu = {
  systems: {
    unit: Uu
  }
}, Yu = {
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
}, Qu = {
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
}, Ju = {
  systems: {
    metric: Yu,
    imperial: Qu
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
}, Xu = {
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
}, Zu = {
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
}, em = {
  systems: {
    metric: Xu,
    imperial: Zu
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
}, tm = {
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
}, nm = {
  systems: {
    SI: tm
  }
}, rm = {
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
}, am = {
  systems: {
    SI: rm
  }
}, om = {
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
}, im = {
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
}, cm = {
  systems: {
    metric: om,
    imperial: im
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
}, sm = {
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
}, lm = {
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
}, um = {
  systems: {
    metric: sm,
    imperial: lm
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
}, mm = {
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
}, dm = {
  systems: {
    SI: mm
  }
}, vm = {
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
}, fm = {
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
}, hm = {
  systems: {
    metric: vm,
    imperial: fm
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
}, pm = {
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
}, gm = {
  systems: {
    SI: pm
  }
}, bm = {
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
}, ym = {
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
}, xm = {
  systems: {
    metric: bm,
    imperial: ym
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
}, wm = {
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
}, km = {
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
}, Cm = {
  systems: {
    metric: wm,
    imperial: km
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
}, Nm = {
  acceleration: au,
  angle: iu,
  apparentPower: su,
  area: mu,
  charge: vu,
  current: hu,
  digital: xu,
  each: ku,
  energy: Su,
  force: Ru,
  frequency: Mu,
  illuminance: Du,
  length: Fu,
  mass: $u,
  massFlowRate: Vu,
  pace: Hu,
  partsPer: Wu,
  pieces: Gu,
  power: Ju,
  pressure: em,
  reactiveEnergy: nm,
  reactivePower: am,
  speed: cm,
  torque: hm,
  temperature: um,
  time: dm,
  voltage: gm,
  volume: xm,
  volumeFlowRate: Cm
}, Sm = nu(Nm), _m = {
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
function Rm(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Sm(t).from(e.from).to(e.to)
  };
}
const lr = {
  ...Object.fromEntries(
    Object.entries(_m).map(([e, t]) => [e, Rm(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Mn(e) {
  return e ? { ...lr, ...e } : lr;
}
function Am(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Mm(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Om(e) {
  return e != null && e.quantity ? Mm(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Lm = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Dm(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function wa(e, t) {
  const n = e * (Lm[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], s = o.map(([l, u], m) => {
    const f = m < o.length - 1 ? Math.floor(a / l) : Math.round(a / l);
    return a -= f * l, [f, u];
  }), c = s.findIndex((l) => l[0] > 0);
  return c === -1 ? "0s" : r + s.slice(c, c + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function Gn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [o, s] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= o) return Dm((e / o).toFixed(n.decimals ?? 1)) + s;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function zm(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ka(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Vo(e = lr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Lr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return wa(n, r == null ? void 0 : r.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return ka(Gn(n, t), o.prefix, o.suffix);
    }
    if (a === "time") return wa(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return ka(Gn(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const s = r == null ? void 0 : r.unit, c = s ? zm(a, s) : {}, l = (o == null ? void 0 : o.prefix) ?? c.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : c.suffix ?? "";
    return `${l}${Gn(n, t)}${u}`;
  };
}
const On = eo(null);
On.displayName = "CubeVizContext";
function Ve() {
  const e = wr(On);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function pt() {
  return Ve().families;
}
function Tm(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function lp({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: o,
  children: s
}) {
  const c = (o ?? []).map((g) => g.family).join("|"), l = ee(
    () => Pr(Er, o),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [c]
  ), u = ee(
    () => Tm(e) ? es(e) : e,
    [e]
  ), m = ee(
    () => {
      var g;
      return {
        chartRamp: (g = t == null ? void 0 : t.chartRamp) != null && g.length ? t.chartRamp : ye,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), f = ee(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), h = ee(() => a ?? {}, [a]), y = ee(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), p = ee(
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
  return /* @__PURE__ */ i(On.Provider, { value: p, children: /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "cv:contents",
        m.mode === "dark" && "dark",
        m.mode === "light" && "cube-viz-light"
      ),
      children: s
    }
  ) });
}
function $r({
  families: e,
  children: t
}) {
  const n = Ve(), r = (e ?? []).map((o) => o.family).join("|"), a = ee(() => !e || e.length === 0 ? n : { ...n, families: Pr(Er, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ i(ae, { children: t }) : /* @__PURE__ */ i(On.Provider, { value: a, children: t });
}
function Fm(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Em = 5e3;
function Pm(e, t) {
  const { cubeClient: n } = Ve(), r = (t == null ? void 0 : t.skip) ?? !1, a = ee(
    () => e.limit === void 0 ? { ...e, limit: Em } : e,
    [e]
  ), o = ee(() => JSON.stringify(a), [a]), [s, c] = Ct({ isLoading: !r }), [l, u] = Ct(0), m = Xe(() => u((f) => f + 1), []);
  return Zt(() => {
    if (r) {
      c({ isLoading: !1 });
      return;
    }
    let f = !0;
    return c((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0 }).then((h) => {
      f && c({
        resultSet: h,
        isLoading: !1
      });
    }).catch((h) => {
      f && c({
        isLoading: !1,
        error: h instanceof Error ? h : new Error(String(h))
      });
    }), () => {
      f = !1;
    };
  }, [n, o, r, l]), { ...s, refetch: m };
}
const Ln = eo(null);
Ln.displayName = "DashboardContext";
function Ir({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = lt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Gl(r, t), key: r });
  const o = a.current.store, s = $m(o, r);
  return ji(Ln.Provider, { value: s }, n);
}
function $m(e, t) {
  const n = Xe(
    (o, s) => e.set(o, s),
    [e]
  ), r = Xe(
    (o) => jo(o, e.getAll(), t),
    [e, t]
  ), a = Xe(
    (o) => Kl(o, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function Im(e) {
  const t = to(e.store.subscribe, e.store.getAll, e.store.getAll);
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
function qo() {
  const e = wr(Ln);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return Im(e);
}
function jr() {
  return wr(Ln);
}
const jm = () => () => {
};
function Yn(e, t, n) {
  var C;
  const r = jr(), { locale: a } = Ve(), o = pt(), s = lt(null);
  s.current === null && (s.current = Ul());
  const c = s.current, l = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !l, m = () => !u || !r ? e : c(e, r.store.getAll(), r.decls), f = to(
    u && r ? r.store.subscribe : jm,
    m,
    m
  ), { resultSet: h, isLoading: y, error: p, refetch: g } = Pm(f, { skip: n == null ? void 0 : n.skip }), b = ((C = t.format) == null ? void 0 : C.unitSystem) ?? (a == null ? void 0 : a.unitSystem), k = ee(() => Mn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ee(() => {
    if (h)
      return Pl(h, t, f, { unitSystem: b, conversions: k }, o);
  }, [h, t, f, b, k, o]), isLoading: y, error: p, refetch: g, resolvedQuery: f };
}
function rt() {
  const { cubeClient: e } = Ve(), [t, n] = Ct({ isLoading: !0 });
  return Zt(() => {
    let r = !0;
    return n({ isLoading: !0 }), ts(e).then((a) => {
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
function up() {
  const { locale: e } = Ve(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? Vo(Mn(n)),
    [t, n]
  );
}
function Ko() {
  const [e, t] = Ct(0), n = lt(null), r = lt(null), a = lt(null), o = lt(0), s = Xe((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), c = Xe(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), l = Xe(
    (u) => {
      if (c(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== o.current && (o.current = m, t(m));
      const f = new ResizeObserver((h) => {
        var y, p;
        for (const g of h) {
          const b = ((p = (y = g.contentBoxSize) == null ? void 0 : y[0]) == null ? void 0 : p.inlineSize) ?? g.contentRect.width;
          s(b);
        }
      });
      f.observe(u), r.current = f;
    },
    [s, c]
  );
  return Zt(() => c, [c]), [l, e];
}
const Vm = "day";
function qm(e, t) {
  var m;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const a = r.member ?? (n == null ? void 0 : n.measure), o = (m = e.timeDimensions) == null ? void 0 : m[0], s = r.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!a || !s) return null;
  const c = r.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [a],
    timeDimensions: [
      {
        dimension: s,
        granularity: r.granularity ?? Vm,
        ...c !== void 0 ? { dateRange: c } : {}
      }
    ],
    ...e.filters ? { filters: e.filters } : {},
    ...e.segments ? { segments: e.segments } : {},
    // Keep the trend's buckets/relative-ranges in the host timezone (same as the headline).
    ...e.timezone ? { timezone: e.timezone } : {},
    order: [[s, "asc"]]
  }, chart: {
    family: "line",
    mapping: {
      category: { member: s },
      series: { mode: "measures", members: [a] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const ie = (e) => pe(e, "yyyy-MM-dd");
function Km(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = dn(e[0]), o = dn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(o.getTime())) return;
    const s = wc(o, a) + 1;
    return [ie(Me(a, s)), ie(Me(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = Me(t, 1);
    return [ie(a), ie(a)];
  }
  if (n === "yesterday") {
    const a = Me(t, 2);
    return [ie(a), ie(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), o = r[2];
    if (o.startsWith("day")) return [ie(Me(t, 2 * a - 1)), ie(Me(t, a))];
    if (o.startsWith("week")) return [ie(Me(t, 14 * a - 1)), ie(Me(t, 7 * a))];
    if (o.startsWith("month"))
      return [ie(Pn($n(t, 2 * a))), ie(Me(Pn($n(t, a)), 1))];
    if (o.startsWith("quarter"))
      return [ie(In(jn(t, 2 * a))), ie(Me(In(jn(t, a)), 1))];
    if (o.startsWith("year"))
      return [ie(Vn(qn(t, 2 * a))), ie(Me(Vn(qn(t, a)), 1))];
  }
  if (n === "this week") {
    const a = kc(t, 1);
    return [ie(Cc(a)), ie(Nc(a))];
  }
  if (n === "this month") {
    const a = $n(t, 1);
    return [ie(Pn(a)), ie(Sc(a))];
  }
  if (n === "this quarter") {
    const a = jn(t, 1);
    return [ie(In(a)), ie(_c(a))];
  }
  if (n === "this year") {
    const a = qn(t, 1);
    return [ie(Vn(a)), ie(Rc(a))];
  }
}
function Hm(e, t, n = _n) {
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
  const s = o.dateRange;
  if (s !== void 0 && typeof s == "object" && !Array.isArray(s)) return null;
  const c = Km(s);
  return c ? { query: {
    ...e,
    timeDimensions: [{ ...o, dateRange: c, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Bm = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Vr({ query: e, chart: t, onState: n, editing: r }) {
  const { registry: a, locale: o } = Ve(), s = pt(), c = ee(() => {
    var O;
    return (O = t.format) != null && O.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), l = ee(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: u, isLoading: m, error: f, refetch: h, resolvedQuery: y } = Yn(l, c), p = ee(() => qm(l, c), [l, c]), g = Yn(
    (p == null ? void 0 : p.query) ?? l,
    (p == null ? void 0 : p.chart) ?? c,
    { skip: !p }
  ), b = ee(
    () => Hm(y, c, s),
    [y, c, s]
  ), k = Yn(
    (b == null ? void 0 : b.query) ?? l,
    c,
    { skip: !b, skipResolve: !0 }
  ), x = ee(
    () => ({ [c.family]: Fm(a, c.family, s) }),
    [a, c.family, s]
  ), C = ee(() => {
    let O = u ?? Bm;
    if (p && g.data && (O = { ...O, series: g.data.series, categories: g.data.categories }), b && k.data) {
      if (b.mode === "kpiRow") {
        const V = k.data.raw.rows[0];
        if (V) {
          const P = O.raw.rows[0];
          O = {
            ...O,
            raw: { ...O.raw, rows: P ? [P, V] : [V] }
          };
        }
      } else if (O.series.length > 0) {
        const V = k.data.series.map((P) => {
          const L = O.series.find((D) => D.key === P.key);
          return {
            ...P,
            key: `${P.key}__prev`,
            label: `${(L == null ? void 0 : L.label) ?? P.label} (prev)`,
            colorToken: (L == null ? void 0 : L.colorToken) ?? P.colorToken,
            meta: { ...P.meta, companion: !0 }
          };
        });
        O = { ...O, series: [...O.series, ...V] };
      }
    }
    return O;
  }, [u, p, g.data, b, k.data]);
  Zt(() => {
    n == null || n({ rows: C.raw.rows, refetch: h, isLoading: m });
  }, [n, C.raw.rows, h, m]);
  const N = {}, _ = ee(
    () => o.formatValue ?? Vo(Mn(o.units)),
    [o.formatValue, o.units]
  ), M = ee(
    () => Mo(C.raw.annotation, c, _, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [C.raw.annotation, c, _, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    Ol,
    {
      data: C,
      options: c,
      config: N,
      format: M,
      state: { loading: m && !u, error: f },
      components: x,
      registry: s,
      editing: r
    }
  );
}
function Wm({ spec: e }) {
  return /* @__PURE__ */ i(Vr, { query: e.query, chart: e.chart });
}
const Ho = "cube-viz-prose";
function Um(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Gm({ doc: e }) {
  const t = Um(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), r = go(
    {
      extensions: [yo],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: S(Ho) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(bo, { editor: r }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
}
const un = [
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
], Ym = Object.fromEntries(
  un.map((e) => [e.value, e.label])
);
function Ca(e) {
  return Ym[e.trim().toLowerCase()] ?? e;
}
const Qm = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Jm({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Mc(), a = S($o({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
  return /* @__PURE__ */ v("div", { className: "cv:mb-2 cv:flex cv:items-center cv:justify-between cv:gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: S(a, !r && "cv:opacity-40"),
        children: /* @__PURE__ */ i(kr, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:text-foreground", children: pe(e.date, "MMMM yyyy") }),
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
function Xm({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const o = !!t.selected && !t.outside && !t.disabled, s = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...a,
      style: { ...r, color: o ? "var(--primary-foreground)" : s ? "var(--muted-foreground)" : "var(--foreground)" },
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
function Bo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ i(
    Ac,
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
        MonthCaption: Jm,
        DayButton: Xm,
        Chevron: ({ orientation: a, className: o, ...s }) => /* @__PURE__ */ i(a === "left" ? kr : en, { className: S("cv:size-4", o), ...s })
      },
      ...r
    }
  );
}
function _e({
  ...e
}) {
  return /* @__PURE__ */ i(mn.Root, { "data-slot": "popover", ...e });
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ i(mn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Ae({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ i(mn.Portal, { children: /* @__PURE__ */ i(
    mn.Content,
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
function Le({
  ...e
}) {
  return /* @__PURE__ */ i(xe.Root, { "data-slot": "select", ...e });
}
function ur({
  ...e
}) {
  return /* @__PURE__ */ i(xe.Group, { "data-slot": "select-group", ...e });
}
function De({
  ...e
}) {
  return /* @__PURE__ */ i(xe.Value, { "data-slot": "select-value", ...e });
}
function ze({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    xe.Trigger,
    {
      "data-slot": "select-trigger",
      className: S(
        "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:whitespace-nowrap cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2 cv:text-sm cv:text-foreground cv:shadow-sm cv:ring-offset-background cv:placeholder:text-muted-foreground cv:focus:outline-none cv:focus:ring-1 cv:focus:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50 cv:[&>span]:line-clamp-1 cv:data-[placeholder]:text-muted-foreground cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(xe.Icon, { asChild: !0, children: /* @__PURE__ */ i(tt, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function Zm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    xe.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Ji, { className: "cv:size-4" })
    }
  );
}
function ed({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    xe.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(tt, { className: "cv:size-4" })
    }
  );
}
function Te({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ i(xe.Portal, { children: /* @__PURE__ */ v(
    xe.Content,
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
        /* @__PURE__ */ i(Zm, {}),
        /* @__PURE__ */ i(
          xe.Viewport,
          {
            className: S(
              "cv:p-1",
              n === "popper" && "cv:h-[var(--radix-select-trigger-height)] cv:w-full cv:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(ed, {})
      ]
    }
  ) });
}
function mr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    xe.Label,
    {
      "data-slot": "select-label",
      className: S("cv:px-2 cv:py-1.5 cv:text-xs cv:font-medium cv:text-muted-foreground", e),
      ...t
    }
  );
}
function be({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    xe.Item,
    {
      "data-slot": "select-item",
      className: S(
        "cv:relative cv:flex cv:w-full cv:cursor-default cv:select-none cv:items-center cv:rounded-sm cv:py-1.5 cv:pl-2 cv:pr-8 cv:text-sm cv:outline-none cv:focus:bg-accent cv:focus:text-accent-foreground cv:data-[disabled]:pointer-events-none cv:data-[disabled]:opacity-50",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(xe.ItemIndicator, { children: /* @__PURE__ */ i(Ke, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(xe.ItemText, { children: t })
      ]
    }
  );
}
const _t = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), td = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", Vt = "yyyy-MM-dd";
function nd(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Na(e) {
  if (!e) return;
  const t = ho(e, Vt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function rd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Qm, [o, s] = Ct(!1), c = typeof e == "string", [l, u] = nd(e), m = Na(l), f = Na(u), h = m ? { from: m, to: f } : void 0;
  let y;
  c ? y = Ca(e) : m && f ? y = `${pe(m, "MMM d, yyyy")} – ${pe(f, "MMM d, yyyy")}` : m ? y = pe(m, "MMM d, yyyy") : y = "Pick a date range";
  const p = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(_e, { open: o, onOpenChange: s, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(
      B,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          y === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(oo, { className: "cv:mr-2 cv:size-4" }),
          y
        ]
      }
    ) }),
    /* @__PURE__ */ v(Ae, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: a.map((g) => /* @__PURE__ */ i(
        B,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), s(!1);
          },
          children: Ca(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        Bo,
        {
          mode: "range",
          selected: h,
          defaultMonth: m,
          disabled: p,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([pe(g.from, Vt), pe(g.to, Vt)]) : g != null && g.from ? t([pe(g.from, Vt), pe(g.from, Vt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const ad = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function od(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function id(e) {
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
function cd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = qo(), o = r.rangeVariable ? id(a(r.rangeVariable)) : void 0, s = r.options ?? (o !== void 0 ? od(o) : ad), c = typeof e == "string" ? e : "", l = s.join(",");
  return Zt(() => {
    c && !s.includes(c) && t(s[0]);
  }, [c, l]), /* @__PURE__ */ v(
    Le,
    {
      value: c,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(ze, { className: _t, children: /* @__PURE__ */ i(De, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Te, { children: s.map((u) => /* @__PURE__ */ i(be, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function sd({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((s) => String(s))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(_t, "cv:h-auto cv:min-h-[6rem]"),
        value: [...o],
        onChange: (s) => {
          const c = Array.from(s.target.selectedOptions, (u) => u.value), l = r.options.every((u) => typeof u.value == "number");
          t(l ? c.map((u) => Number(u)) : c);
        },
        children: r.options.map((s) => /* @__PURE__ */ i("option", { value: String(s.value), children: s.label }, String(s.value)))
      }
    );
  }
  const a = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ v(
    Le,
    {
      value: a,
      onValueChange: (o) => {
        const s = r.options.find((c) => String(c.value) === o);
        t(s ? s.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(ze, { className: _t, children: /* @__PURE__ */ i(De, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Te, { children: r.options.map((o) => /* @__PURE__ */ i(be, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function ld({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: o } = rt(), s = ee(() => {
    if (!a) return [];
    const c = [];
    for (const l of a.cubes)
      if (!(r.cube && l.name !== r.cube)) {
        if (r.from === "measure" || r.from === "dimensionOrMeasure")
          for (const u of l.measures) c.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (r.from === "dimension" || r.from === "dimensionOrMeasure")
          for (const u of l.dimensions) c.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return c;
  }, [a, r.cube, r.from]);
  return /* @__PURE__ */ v(
    "select",
    {
      className: _t,
      value: typeof e == "string" ? e : "",
      disabled: o,
      onChange: (c) => t(c.target.value || void 0),
      children: [
        /* @__PURE__ */ i("option", { value: "", children: o ? "Loading…" : "—" }),
        s.map((c) => /* @__PURE__ */ i("option", { value: c.name, children: c.label }, c.name))
      ]
    }
  );
}
function ud({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
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
function md({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: _t,
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
function dd({ value: e, onChange: t, decl: n }) {
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
const vd = {
  dateRange: rd,
  granularity: cd,
  select: sd,
  memberSelect: ld,
  text: ud,
  number: md,
  toggle: dd
};
function fd({ control: e, title: t }) {
  var y;
  const { registry: n } = Ve(), { decls: r, resolveValue: a, setVar: o } = qo(), s = ee(
    () => r.find((p) => p.name === e.variable),
    [r, e.variable]
  ), c = Za();
  if (!s)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, u = ((y = n.controls) == null ? void 0 : y[l]) ?? vd[l], m = a(e.variable), f = (p) => o(e.variable, p), h = t ?? s.label ?? s.name;
  return l === "toggle" ? /* @__PURE__ */ i(u, { value: m, onChange: f, decl: s, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: td, htmlFor: c, children: h }),
    /* @__PURE__ */ i(
      u,
      {
        value: m,
        onChange: f,
        decl: s,
        control: e.control,
        controlId: c
      }
    )
  ] });
}
const Wo = w.forwardRef(
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
Wo.displayName = "Card";
const Uo = w.forwardRef(
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
Uo.displayName = "CardHeader";
const Go = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
Go.displayName = "CardTitle";
const hd = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
hd.displayName = "CardDescription";
const pd = w.forwardRef(
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
pd.displayName = "CardAction";
const Yo = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
Yo.displayName = "CardContent";
const gd = w.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
gd.displayName = "CardFooter";
const pn = "cube-viz-drag-handle";
function Qo(e) {
  var c;
  const { registry: t } = Ve(), n = (c = t.chrome) == null ? void 0 : c.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: r, menu: a, dragHandleProps: o, children: s } = e;
  return /* @__PURE__ */ v(Wo, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    r ? /* @__PURE__ */ v(
      Uo,
      {
        ...o,
        className: S(
          pn,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(Go, { className: "cv:truncate cv:text-sm cv:font-semibold", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ i(Yo, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: s })
  ] });
}
function bd(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const s = o == null ? "" : String(o);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }, r = t.map(n).join(","), a = e.map((o) => t.map((s) => n(o[s])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function yd(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), o = document.createElement("a");
  o.href = a, o.download = t, o.click(), URL.revokeObjectURL(a);
}
function xd(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const wd = /* @__PURE__ */ (() => {
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
let bt = null;
function Jo(e = {}) {
  return bt || (e.includeStyleProperties ? (bt = e.includeStyleProperties, bt) : (bt = Ze(window.getComputedStyle(document.documentElement)), bt));
}
function gn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function kd(e) {
  const t = gn(e, "border-left-width"), n = gn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Cd(e) {
  const t = gn(e, "border-top-width"), n = gn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Xo(e, t = {}) {
  const n = t.width || kd(e), r = t.height || Cd(e);
  return { width: n, height: r };
}
function Nd() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const ke = 16384;
function Sd(e) {
  (e.width > ke || e.height > ke) && (e.width > ke && e.height > ke ? e.width > e.height ? (e.height *= ke / e.width, e.width = ke) : (e.width *= ke / e.height, e.height = ke) : e.width > ke ? (e.height *= ke / e.width, e.width = ke) : (e.width *= ke / e.height, e.height = ke));
}
function bn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function _d(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Rd(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), a.appendChild(o), o.appendChild(e), _d(a);
}
const we = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || we(n, t);
};
function Ad(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Md(e, t) {
  return Jo(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Od(e, t, n, r) {
  const a = `.${e}:${t}`, o = n.cssText ? Ad(n) : Md(n, r);
  return document.createTextNode(`${a}{${o}}`);
}
function Sa(e, t, n, r) {
  const a = window.getComputedStyle(e, n), o = a.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const s = wd();
  try {
    t.className = `${t.className} ${s}`;
  } catch {
    return;
  }
  const c = document.createElement("style");
  c.appendChild(Od(s, n, a, r)), t.appendChild(c);
}
function Ld(e, t, n) {
  Sa(e, t, ":before", n), Sa(e, t, ":after", n);
}
const _a = "application/font-woff", Ra = "image/jpeg", Dd = {
  woff: _a,
  woff2: _a,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: Ra,
  jpeg: Ra,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function zd(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function qr(e) {
  const t = zd(e).toLowerCase();
  return Dd[t] || "";
}
function Td(e) {
  return e.split(/,/)[1];
}
function dr(e) {
  return e.search(/^(data:)/) !== -1;
}
function Fd(e, t) {
  return `data:${t};base64,${e}`;
}
async function Zo(e, t, n) {
  const r = await fetch(e, t);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const a = await r.blob();
  return new Promise((o, s) => {
    const c = new FileReader();
    c.onerror = s, c.onloadend = () => {
      try {
        o(n({ res: r, result: c.result }));
      } catch (l) {
        s(l);
      }
    }, c.readAsDataURL(a);
  });
}
const Qn = {};
function Ed(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Kr(e, t, n) {
  const r = Ed(e, t, n.includeQueryParams);
  if (Qn[r] != null)
    return Qn[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const o = await Zo(e, n.fetchRequestInit, ({ res: s, result: c }) => (t || (t = s.headers.get("Content-Type") || ""), Td(c)));
    a = Fd(o, t);
  } catch (o) {
    a = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    o && (s = typeof o == "string" ? o : o.message), s && console.warn(s);
  }
  return Qn[r] = a, a;
}
async function Pd(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : bn(t);
}
async function $d(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), s = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, o.width, o.height);
    const c = o.toDataURL();
    return bn(c);
  }
  const n = e.poster, r = qr(n), a = await Kr(n, r, t);
  return bn(a);
}
async function Id(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Dn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function jd(e, t) {
  return we(e, HTMLCanvasElement) ? Pd(e) : we(e, HTMLVideoElement) ? $d(e, t) : we(e, HTMLIFrameElement) ? Id(e, t) : e.cloneNode(ei(e));
}
const Vd = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", ei = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function qd(e, t, n) {
  var r, a;
  if (ei(t))
    return t;
  let o = [];
  return Vd(e) && e.assignedNodes ? o = Ze(e.assignedNodes()) : we(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = Ze(e.contentDocument.body.childNodes) : o = Ze(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), o.length === 0 || we(e, HTMLVideoElement) || await o.reduce((s, c) => s.then(() => Dn(c, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function Kd(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Jo(n).forEach((o) => {
    let s = a.getPropertyValue(o);
    o === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), we(e, HTMLIFrameElement) && o === "display" && s === "inline" && (s = "block"), o === "d" && t.getAttribute("d") && (s = `path(${t.getAttribute("d")})`), r.setProperty(o, s, a.getPropertyPriority(o));
  });
}
function Hd(e, t) {
  we(e, HTMLTextAreaElement) && (t.innerHTML = e.value), we(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Bd(e, t) {
  if (we(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Wd(e, t, n) {
  return we(t, Element) && (Kd(e, t, n), Ld(e, t, n), Hd(e, t), Bd(e, t)), t;
}
async function Ud(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const c = n[o].getAttribute("xlink:href");
    if (c) {
      const l = e.querySelector(c), u = document.querySelector(c);
      !l && u && !r[c] && (r[c] = await Dn(u, t, !0));
    }
  }
  const a = Object.values(r);
  if (a.length) {
    const o = "http://www.w3.org/1999/xhtml", s = document.createElementNS(o, "svg");
    s.setAttribute("xmlns", o), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const c = document.createElementNS(o, "defs");
    s.appendChild(c);
    for (let l = 0; l < a.length; l++)
      c.appendChild(a[l]);
    e.appendChild(s);
  }
  return e;
}
async function Dn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => jd(r, t)).then((r) => qd(e, r, t)).then((r) => Wd(e, r, t)).then((r) => Ud(r, t));
}
const ti = /url\((['"]?)([^'"]+?)\1\)/g, Gd = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Yd = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Qd(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Jd(e) {
  const t = [];
  return e.replace(ti, (n, r, a) => (t.push(a), n)), t.filter((n) => !dr(n));
}
async function Xd(e, t, n, r, a) {
  try {
    const o = n ? xd(t, n) : t, s = qr(t);
    let c;
    return a || (c = await Kr(o, s, r)), e.replace(Qd(t), `$1${c}$3`);
  } catch {
  }
  return e;
}
function Zd(e, { preferredFontFormat: t }) {
  return t ? e.replace(Yd, (n) => {
    for (; ; ) {
      const [r, , a] = Gd.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function ni(e) {
  return e.search(ti) !== -1;
}
async function ri(e, t, n) {
  if (!ni(e))
    return e;
  const r = Zd(e, n);
  return Jd(r).reduce((o, s) => o.then((c) => Xd(c, s, t, n)), Promise.resolve(r));
}
async function yt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const o = await ri(a, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function ev(e, t) {
  await yt("background", e, t) || await yt("background-image", e, t), await yt("mask", e, t) || await yt("-webkit-mask", e, t) || await yt("mask-image", e, t) || await yt("-webkit-mask-image", e, t);
}
async function tv(e, t) {
  const n = we(e, HTMLImageElement);
  if (!(n && !dr(e.src)) && !(we(e, SVGImageElement) && !dr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Kr(r, qr(r), t);
  await new Promise((o, s) => {
    e.onload = o, e.onerror = t.onImageErrorHandler ? (...l) => {
      try {
        o(t.onImageErrorHandler(...l));
      } catch (u) {
        s(u);
      }
    } : s;
    const c = e;
    c.decode && (c.decode = o), c.loading === "lazy" && (c.loading = "eager"), n ? (e.srcset = "", e.src = a) : e.href.baseVal = a;
  });
}
async function nv(e, t) {
  const r = Ze(e.childNodes).map((a) => ai(a, t));
  await Promise.all(r).then(() => e);
}
async function ai(e, t) {
  we(e, Element) && (await ev(e, t), await tv(e, t), await nv(e, t));
}
function rv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Aa = {};
async function Ma(e) {
  let t = Aa[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Aa[e] = t, t;
}
async function Oa(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let c = s.replace(r, "$1");
    return c.startsWith("https://") || (c = new URL(c, e.url).href), Zo(c, t.fetchRequestInit, ({ result: l }) => (n = n.replace(s, `url(${l})`), [s, l]));
  });
  return Promise.all(o).then(() => n);
}
function La(e) {
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
  const o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", c = new RegExp(s, "gi");
  for (; ; ) {
    let l = o.exec(r);
    if (l === null) {
      if (l = c.exec(r), l === null)
        break;
      o.lastIndex = c.lastIndex;
    } else
      c.lastIndex = o.lastIndex;
    t.push(l[0]);
  }
  return t;
}
async function av(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ze(a.cssRules || []).forEach((o, s) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let c = s + 1;
            const l = o.href, u = Ma(l).then((m) => Oa(m, t)).then((m) => La(m).forEach((f) => {
              try {
                a.insertRule(f, f.startsWith("@import") ? c += 1 : a.cssRules.length);
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
        const s = e.find((c) => c.href == null) || document.styleSheets[0];
        a.href != null && r.push(Ma(a.href).then((c) => Oa(c, t)).then((c) => La(c).forEach((l) => {
          s.insertRule(l, s.cssRules.length);
        })).catch((c) => {
          console.error("Error loading remote stylesheet", c);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ze(a.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${a.href}`, o);
      }
  }), n));
}
function ov(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => ni(t.style.getPropertyValue("src")));
}
async function iv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ze(e.ownerDocument.styleSheets), r = await av(n, t);
  return ov(r);
}
function oi(e) {
  return e.trim().replace(/["']/g, "");
}
function cv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((o) => {
      t.add(oi(o));
    }), Array.from(r.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function sv(e, t) {
  const n = await iv(e, t), r = cv(e);
  return (await Promise.all(n.filter((o) => r.has(oi(o.style.fontFamily))).map((o) => {
    const s = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return ri(o.cssText, s, t);
  }))).join(`
`);
}
async function lv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await sv(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function uv(e, t = {}) {
  const { width: n, height: r } = Xo(e, t), a = await Dn(e, t, !0);
  return await lv(a, t), await ai(a, t), rv(a, t), await Rd(a, n, r);
}
async function mv(e, t = {}) {
  const { width: n, height: r } = Xo(e, t), a = await uv(e, t), o = await bn(a), s = document.createElement("canvas"), c = s.getContext("2d"), l = t.pixelRatio || Nd(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return s.width = u * l, s.height = m * l, t.skipAutoScale || Sd(s), s.style.width = `${u}`, s.style.height = `${m}`, t.backgroundColor && (c.fillStyle = t.backgroundColor, c.fillRect(0, 0, s.width, s.height)), c.drawImage(o, 0, 0, s.width, s.height), s;
}
async function dv(e, t = {}) {
  return (await mv(e, t)).toDataURL();
}
function vv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function fv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function hv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function pv(e, t, n = 2) {
  const r = await dv(e, {
    pixelRatio: n,
    backgroundColor: hv(e),
    cacheBust: !0
  });
  fv(r, `${vv(t)}.png`);
}
function gv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, o] = w.useState(!1), s = t.length > 0, c = !!r;
  if (!s && !n && !c) return null;
  const l = () => {
    const h = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    yd(bd(t), `${h}.csv`);
  }, u = async () => {
    const h = r == null ? void 0 : r.current;
    if (!(!h || a)) {
      o(!0);
      try {
        await pv(h, e);
      } finally {
        o(!1);
      }
    }
  }, m = (h) => h.stopPropagation(), f = (h = !0) => S(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !h && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(_e, { children: [
    /* @__PURE__ */ i(
      Re,
      {
        onMouseDown: m,
        onPointerDown: m,
        onTouchStart: m,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(Xi, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Ae, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: m, onPointerDown: m, onTouchStart: m, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ i(Zi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      c ? /* @__PURE__ */ v("button", { type: "button", onClick: u, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ i(ec, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: l, disabled: !s, className: f(s), children: [
        /* @__PURE__ */ i(tc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export CSV"
      ] })
    ] })
  ] });
}
function Da({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(Vr, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(Gm, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(fd, { control: e.control, title: e.title });
  }
}
function vr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = Ct({ rows: [] }), o = Xe(
    (l) => a({ rows: l.rows, refetch: l.refetch }),
    []
  ), s = lt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(Da, { widget: e }) });
  const c = n ? null : /* @__PURE__ */ i(
    gv,
    {
      title: e.title,
      rows: r.rows,
      refetch: r.refetch,
      captureRef: s
    }
  );
  return /* @__PURE__ */ i(
    Qo,
    {
      widget: e,
      title: e.title,
      menu: c,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: s, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(Da, { widget: e, onState: o }) })
    }
  );
}
const bv = "lg", yv = 640;
function xv(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function wv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function mp({ spec: e, editable: t = !1, families: n }) {
  const [r, a] = Ko(), o = e.grid ?? {}, s = o.cols ?? 12, c = o.rowHeight ?? 40, l = o.margin ?? [12, 12], u = o.containerPadding ?? l, m = ee(
    () => ({ [bv]: wv(e.layout) }),
    [e.layout]
  ), f = ee(
    () => new Map(e.widgets.map((y) => [y.id, y])),
    [e.widgets]
  ), h = !t && a > 0 && a < yv;
  return /* @__PURE__ */ i($r, { families: n, children: /* @__PURE__ */ i(Ir, { spec: e, children: /* @__PURE__ */ i("div", { ref: r, className: "cv:w-full", children: a <= 0 ? null : h ? /* @__PURE__ */ i(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: l[1],
        padding: `${u[1]}px ${u[0]}px`
      },
      children: xv(e.layout).map((y) => {
        const p = f.get(y.i);
        if (!p) return null;
        const g = y.h * c + (y.h - 1) * l[1];
        return /* @__PURE__ */ i("div", { style: { height: g }, children: /* @__PURE__ */ i(vr, { widget: p, editable: !1 }) }, y.i);
      })
    }
  ) : /* @__PURE__ */ i(
    po,
    {
      width: a,
      layouts: m,
      breakpoints: { lg: 0 },
      cols: { lg: s },
      rowHeight: c,
      margin: l,
      containerPadding: u,
      dragConfig: { enabled: t, handle: `.${pn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((y) => {
        const p = f.get(y.i);
        return p ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(vr, { widget: p, editable: t }) }, y.i) : null;
      })
    }
  ) }) }) });
}
function dp({ spec: e, families: t }) {
  return /* @__PURE__ */ i($r, { families: t, children: /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
    Qo,
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
      children: /* @__PURE__ */ i(Wm, { spec: e })
    }
  ) }) });
}
function zn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function ut(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Tn(e) {
  return e ? e.cubes.filter((t) => ut(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: zn(t)
  })) : [];
}
function Wt(e, t) {
  if (!(!e || !t))
    return Tn(e).find((n) => n.name === t);
}
function Hr(e) {
  return e.shortTitle || e.title || e.name;
}
function Yt(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function ii(e) {
  return Yt(e.meta, "group");
}
function kv(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = ii(a), s = o ? `g:${o.toLowerCase()}` : `f:${t(a)}`;
    let c = r.get(s);
    c || (c = { label: o ?? t(a), items: [] }, r.set(s, c), n.push(s)), c.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function ci(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Hr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Yt(n, "quantity"),
    unit: Yt(n, "unit")
  };
}
function fr(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Hr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Yt(n, "quantity"),
    unit: Yt(n, "unit")
  };
}
function si(e, t) {
  return {
    name: e.name,
    label: Hr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function hr(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!ut(a) || n && a.name !== n) continue;
    const o = zn(a), s = (c) => {
      c.connectedComponent = o, r.push(c);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const c of a.measures)
        ut(c) && s(ci(c, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const c of a.dimensions)
        ut(c) && c.type !== "time" && s(fr(c, a.name));
    if (t === "time")
      for (const c of a.dimensions)
        ut(c) && c.type === "time" && s(fr(c, a.name));
  }
  return r;
}
function Cv(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!ut(a) || n && !n.has(a.name)) continue;
    const o = zn(a);
    for (const s of a.segments) {
      if (!ut(s)) continue;
      const c = si(s, a.name);
      c.connectedComponent = o, r.push(c);
    }
  }
  return r;
}
function Pe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const r = zn(n), a = (c) => (c && (c.connectedComponent = r), c), o = n.measures.find((c) => c.name === t) ?? n.dimensions.find((c) => c.name === t);
      if (o)
        return o.type ? "aggType" in o ? a(ci(o, n.name)) : a(fr(o, n.name)) : void 0;
      const s = n.segments.find((c) => c.name === t);
      if (s) return a(si(s, n.name));
    }
}
function Nv(e) {
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
const pr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), li = {
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
function qt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function ui(e) {
  var s, c, l, u, m;
  const t = e.query, n = (s = t.measures) == null ? void 0 : s.find(Boolean);
  if (n) return qt(n);
  const r = (c = t.dimensions) == null ? void 0 : c.find(Boolean);
  if (r) return qt(r);
  const a = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (a) return qt(a);
  const o = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return qt(o);
}
function Rt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Ft(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Ce(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function at(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function mi(e, t) {
  const n = {};
  for (const a of e) {
    const o = t[a];
    o && Object.keys(o).length > 0 && (n[a] = o);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Sv = "day";
function _v(e, t, n) {
  var m, f, h, y;
  const { query: r, chart: a } = e, o = Rt(a).length ? Rt(a) : r.measures ?? [], s = Ce(a) ?? ((m = r.dimensions) == null ? void 0 : m[0]) ?? ((h = (f = r.timeDimensions) == null ? void 0 : f[0]) == null ? void 0 : h.dimension), c = s ? { category: { member: s }, series: { mode: "measures", members: o } } : void 0, l = {
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
      return u({ mapping: c });
    case "combo":
      return u({
        mapping: c,
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
      return n.require(t).supportsMapping ? u({ mapping: c }) : l;
  }
}
function It(e) {
  return Am(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function gr(e) {
  return Om(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Rv(e, t) {
  return t.require(e).wells;
}
function Se(e) {
  return e.chart.familyOptions ?? {};
}
function Fn(e) {
  const t = Se(e).series;
  return Array.isArray(t) ? t : [];
}
function Br(e) {
  const t = Se(e).columns;
  return Array.isArray(t) ? t : [];
}
function Av(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function rn(e, t) {
  var s;
  const { chart: n } = e, r = n.family, a = (c) => c ? [c] : [], o = t.require(r).readWells;
  if (o) return o(e);
  switch (r) {
    case "bar":
    case "line":
    case "area": {
      const c = Av(e), l = (s = n.mapping) == null ? void 0 : s.series;
      return { y: l && l.mode === "pivot" ? l.values && l.values.length > 0 ? l.values : a(l.value) : Rt(n), x: a(Ce(n)), color: a(c) };
    }
    case "combo":
      return {
        x: a(Ce(n)),
        y: Fn(e).map((c) => c.member)
      };
    case "pie":
      return { slices: a(Ce(n)), size: a(Rt(n)[0]) };
    case "scatter": {
      const c = Se(e);
      return {
        sx: a(c.x),
        sy: a(c.y),
        size: a(c.size),
        color: a(c.groupBy)
      };
    }
    case "kpi":
      return { value: a(Se(e).measure) };
    case "table":
      return { columns: Br(e).map((c) => c.member) };
    default:
      return {};
  }
}
function En(e) {
  const t = Mv(e);
  return t === void 0 ? Sv : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Mv(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function an(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function dt(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Et(e, t) {
  return { ...e, dimensions: an(e.dimensions, t) };
}
function je(e, t) {
  const n = dt(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function He(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function vt(e, t, n) {
  if (e)
    return { category: { member: e }, series: mi(t, n) };
}
function yn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function xn(e, t, n, r) {
  if (!e || t.length === 0) return;
  const a = {};
  for (const c of t) {
    const l = r == null ? void 0 : r[c];
    l && Object.keys(l).length > 0 && (a[c] = l);
  }
  const o = Object.keys(a).length > 0, s = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: a } : {} };
  return { category: { member: e }, series: s };
}
function za(e, t, n, r, a, o) {
  const s = o.require(t).placeField;
  if (s) return s(e, n, r, a);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Lv(e, n, r, a, o);
    case "combo":
      return Tv(e, n, r, a);
    case "pie":
      return Pv(e, n, r, a);
    case "scatter":
      return Iv(e, n, r);
    case "kpi":
      return Vv(e, r);
    case "table":
      return Kv(e, r, a);
    default:
      return e;
  }
}
function Ov(e, t, n, r, a) {
  const o = a.require(t).removeField;
  if (o) return o(e, n, r);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return zv(e, n, r, a);
    case "combo":
      return Ev(e, n, r);
    case "pie":
      return $v(e, n, r);
    case "scatter":
      return jv(e, n, r);
    case "kpi":
      return qv(e, r);
    case "table":
      return Hv(e, r);
    default:
      return e;
  }
}
function Lv(e, t, n, r, a) {
  const { query: o, chart: s } = e, c = rn(e, a), l = c.color[0], u = Ce(s), m = Ft(s);
  if (t === "y") {
    const f = c.y, h = an(f, n);
    return l ? {
      ...e,
      query: { ...o, measures: h },
      chart: { ...s, mapping: xn(u, h, l, yn(s)) }
    } : {
      ...e,
      query: { ...o, measures: h },
      chart: { ...s, mapping: vt(u, h, m) }
    };
  }
  if (t === "x")
    return Dv(e, n, r, l, a);
  if (t === "color") {
    const f = c.y;
    if (f.length === 0) return e;
    const h = Et({ ...o, measures: f }, n);
    return {
      ...e,
      query: h,
      chart: { ...s, mapping: xn(u, f, n, yn(s)) }
    };
  }
  return e;
}
function Dv(e, t, n, r, a) {
  const { query: o, chart: s } = e, c = Ce(s), l = rn(e, a).y, u = Ft(s);
  let m = o;
  const f = at(o);
  if (f && c === f.dimension ? m = He(m, void 0) : c && (m = je(m, c)), n === "time") {
    const y = (f == null ? void 0 : f.granularity) ?? En(f == null ? void 0 : f.dateRange);
    m = He(m, {
      dimension: t,
      granularity: y,
      dateRange: f == null ? void 0 : f.dateRange
    });
  } else
    m = Et(m, t);
  const h = r ? xn(t, l, r, yn(s)) : vt(t, l, u);
  return { ...e, query: m, chart: { ...s, mapping: h } };
}
function zv(e, t, n, r) {
  const { query: a, chart: o } = e, s = rn(e, r), c = Ce(o), l = s.color[0], u = Ft(o);
  if (t === "y") {
    const m = dt(s.y, n);
    if (l && m.length >= 1)
      return {
        ...e,
        query: { ...a, measures: m },
        chart: { ...o, mapping: xn(c, m, l, yn(o)) }
      };
    const f = l ? je({ ...a, measures: m }, l) : { ...a, measures: m };
    return { ...e, query: f, chart: { ...o, mapping: vt(c, m, u) } };
  }
  if (t === "x") {
    let m = a;
    const f = at(a);
    return f && f.dimension === n ? m = He(m, void 0) : m = je(m, n), { ...e, query: m, chart: { ...o, mapping: void 0 } };
  }
  if (t === "color") {
    const m = je(a, n);
    return {
      ...e,
      query: m,
      chart: { ...o, mapping: vt(c, s.y, u) }
    };
  }
  return e;
}
const Ta = ["line", "bar"];
function Tv(e, t, n, r) {
  const { query: a, chart: o } = e, s = Se(e);
  if (t === "x") {
    let c = a;
    const l = Ce(o), u = at(a);
    if (u && l === u.dimension ? c = He(c, void 0) : l && (c = je(c, l)), r === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? En(u == null ? void 0 : u.dateRange);
      c = He(c, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      c = Et(c, n);
    return { ...e, query: c, chart: { ...o, mapping: { category: { member: n }, series: Fv(e) } } };
  }
  if (t === "y") {
    const c = Fn(e);
    if (c.some((m) => m.member === n)) return e;
    const l = Ta[c.length % Ta.length], u = [...c, { member: n, render: l }];
    return {
      ...e,
      query: { ...a, measures: an(a.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...s, series: u }, mapping: di(o, u) }
    };
  }
  return e;
}
function di(e, t) {
  const n = Ce(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((r) => r.member) } } : e.mapping;
}
function Fv(e) {
  return { mode: "measures", members: Fn(e).map((t) => t.member) };
}
function Ev(e, t, n) {
  const { query: r, chart: a } = e, o = Se(e);
  if (t === "x") {
    let s = r;
    const c = at(r);
    return c && c.dimension === n ? s = He(s, void 0) : s = je(s, n), { ...e, query: s, chart: { ...a, mapping: void 0 } };
  }
  if (t === "y") {
    const s = Fn(e).filter((l) => l.member !== n), c = dt(r.measures, n);
    return {
      ...e,
      query: { ...r, measures: c },
      chart: { ...a, familyOptions: { ...o, series: s }, mapping: di(a, s) }
    };
  }
  return e;
}
function Pv(e, t, n, r) {
  const { query: a, chart: o } = e, s = Ft(o);
  if (t === "slices") {
    let c = a;
    const l = Ce(o), u = at(a);
    if (u && l === u.dimension ? c = He(c, void 0) : l && (c = je(c, l)), r === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? En(u == null ? void 0 : u.dateRange);
      c = He(c, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      c = Et(c, n);
    return {
      ...e,
      query: c,
      chart: { ...o, mapping: vt(n, Rt(o), s) }
    };
  }
  if (t === "size") {
    const c = [n];
    return {
      ...e,
      query: { ...a, measures: c },
      chart: { ...o, mapping: vt(Ce(o), c, s) }
    };
  }
  return e;
}
function $v(e, t, n) {
  const { query: r, chart: a } = e, o = Ft(a);
  if (t === "slices") {
    let s = r;
    const c = at(r);
    return c && c.dimension === n ? s = He(s, void 0) : s = je(s, n), { ...e, query: s, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: vt(Ce(a), [], o) }
  } : e;
}
const vi = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Iv(e, t, n) {
  const r = vi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, s = { ...Se(e) }, c = s[r];
  s[r] = n;
  let l = a;
  if (r === "groupBy")
    c && c !== n && (l = je(l, c)), l = Et(l, n);
  else {
    const u = c ? dt(a.measures, c) : a.measures;
    l = { ...a, measures: an(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: s } };
}
function jv(e, t, n) {
  const r = vi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, s = { ...Se(e) };
  delete s[r];
  let c = a;
  if (r === "groupBy") c = je(c, n);
  else {
    const l = dt(a.measures, n);
    c = { ...a, measures: l.length ? l : [] };
  }
  return { ...e, query: c, chart: { ...o, familyOptions: s } };
}
function Vv(e, t) {
  const { query: n, chart: r } = e, a = { ...Se(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function qv(e, t) {
  const { query: n, chart: r } = e, a = { ...Se(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function Kv(e, t, n) {
  const { query: r, chart: a } = e, o = Br(e);
  if (o.some((l) => l.member === t)) return e;
  let s = r;
  if (n === "number") s = { ...r, measures: an(r.measures, t) };
  else if (n === "time") {
    const l = at(r), u = (l == null ? void 0 : l.granularity) ?? En(l == null ? void 0 : l.dateRange), m = r.timeDimensions ?? [];
    m.some((f) => f.dimension === t) || (s = { ...r, timeDimensions: [...m, { dimension: t, granularity: u }] });
  } else s = Et(r, t);
  const c = { ...Se(e), columns: [...o, { member: t }] };
  return { ...e, query: s, chart: { ...a, familyOptions: c } };
}
function Hv(e, t) {
  var m, f, h;
  const { query: n, chart: r } = e, a = Br(e).filter((y) => y.member !== t);
  let o = n;
  const s = dt(n.measures, t);
  s.length !== (((m = n.measures) == null ? void 0 : m.length) ?? 0) && (o = { ...o, measures: s.length ? s : void 0 });
  const c = dt(n.dimensions, t);
  c.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: c.length ? c : void 0 });
  const l = (n.timeDimensions ?? []).filter((y) => y.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...Se(e), columns: a };
  return { ...e, query: o, chart: { ...r, familyOptions: u } };
}
const ve = w.forwardRef(
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
ve.displayName = "Input";
function wn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(co, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(io, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(Cr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function fi({
  cube: e,
  cubes: t,
  kind: n,
  value: r,
  onChange: a,
  placeholder: o = "Select member…",
  disabled: s,
  id: c,
  className: l
}) {
  const { meta: u, isLoading: m } = rt(), f = w.useMemo(() => {
    if (t) {
      const g = new Set(t);
      return hr(u, n).filter((b) => g.has(b.cube));
    }
    return hr(u, n, e);
  }, [u, n, e, t]), h = w.useMemo(() => {
    const g = Bv(f), b = g.length > 1, k = [];
    for (const [x, C] of g)
      for (const [N, _] of kv(C, () => "Other")) {
        const M = b ? N === "Other" ? x : `${x} · ${N}` : N;
        k.push({ key: `${x}:${N}`, label: M, items: _ });
      }
    return k;
  }, [f]), y = h.length > 1, p = f.find((g) => g.name === r);
  return /* @__PURE__ */ v(Le, { value: r, onValueChange: a, disabled: s || m, children: [
    /* @__PURE__ */ i(ze, { id: c, className: l, children: /* @__PURE__ */ i(De, { placeholder: m ? "Loading…" : o, children: p ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      wn(p.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Te, { children: h.map((g) => /* @__PURE__ */ v(ur, { children: [
      y && g.label ? /* @__PURE__ */ i(mr, { children: g.label }) : null,
      g.items.map((b) => /* @__PURE__ */ i(be, { value: b.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        wn(b.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: b.label })
      ] }) }, b.name))
    ] }, g.key)) })
  ] });
}
function Bv(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Qt({
  options: e,
  value: t,
  onChange: n,
  fullWidth: r = !0,
  size: a = "default",
  disabled: o,
  "aria-label": s,
  className: c
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "segmented-control",
      role: "radiogroup",
      "aria-label": s,
      className: S(
        "cv:flex cv:flex-wrap cv:gap-1 cv:rounded-lg cv:bg-muted cv:p-1 cv:text-muted-foreground",
        c
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
const Fa = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(io, { className: "cv:size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(Cr, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(co, { className: "cv:size-3" }), metaKind: "time" }
}, Wv = ["number", "category", "time"];
function hi({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: o = "start",
  side: s = "bottom",
  children: c
}) {
  var D, E;
  const { meta: l, isLoading: u } = rt(), [m, f] = w.useState(!1), [h, y] = w.useState(""), [p, g] = w.useState(n.viewLocked ?? "tables"), [b, k] = w.useState({});
  w.useEffect(() => {
    m && g(n.viewLocked ?? "tables");
  }, [m, n.viewLocked]);
  const x = w.useMemo(() => new Set(t), [t]), C = h.trim().toLowerCase(), N = w.useMemo(() => {
    if (p !== "tables") {
      const z = n.views.find((Q) => Q.name === p) ?? Wt(l, p);
      return z ? [{ cube: z, tag: "dataset" }] : [];
    }
    const T = [];
    n.sourceCube && T.push({ cube: n.sourceCube, tag: "source" });
    for (const z of n.relatedCubes) T.push({ cube: z, tag: "related" });
    return T;
  }, [p, n, l]), _ = e.kinds.length > 1, M = (T) => {
    const z = [], Q = /* @__PURE__ */ new Map();
    for (const J of Wv) {
      if (!e.kinds.includes(J)) continue;
      const I = Fa[J];
      for (const K of hr(l, I.metaKind, T)) {
        if (x.has(K.name) || C && !(K.label.toLowerCase().includes(C) || K.name.toLowerCase().includes(C))) continue;
        const te = ii(K), Y = te ? `g:${te.toLowerCase()}` : `k:${J}`;
        let W = Q.get(Y);
        W || (W = { key: Y, label: te ?? I.label, headerIcon: te ? void 0 : I.icon, items: [] }, Q.set(Y, W), z.push(Y)), W.items.push({ option: K, kind: J });
      }
    }
    return z.map((J) => Q.get(J));
  }, O = N.map((T) => ({ section: T, groups: M(T.cube.name) })).filter((T) => T.groups.length > 0), V = O.length > 0, P = (T, z) => {
    a(T, z), f(!1), y("");
  }, L = p === "tables" ? "All related tables" : ((D = n.views.find((T) => T.name === p)) == null ? void 0 : D.title) ?? ((E = Wt(l, p)) == null ? void 0 : E.title) ?? p;
  return /* @__PURE__ */ v(_e, { open: m, onOpenChange: f, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: c }),
    /* @__PURE__ */ v(Ae, { align: o, side: s, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(nc, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: h,
              onChange: (T) => y(T.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(Uv, { browse: p, label: L, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: V ? O.map(({ section: T, groups: z }, Q) => {
        const J = z.reduce((Y, W) => Y + W.items.length, 0), I = T.tag === "related", K = b[T.cube.name] ?? I, te = C.length > 0 ? !0 : !K;
        return /* @__PURE__ */ v("div", { children: [
          T.tag === "related" && Q > 0 && O[Q - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => k((Y) => ({ ...Y, [T.cube.name]: !K })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                te ? /* @__PURE__ */ i(tt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(en, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(so, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: T.cube.title }),
                T.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : T.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: J })
              ]
            }
          ),
          te ? z.map((Y) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            z.length > 1 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              Y.headerIcon,
              Y.label
            ] }) : null,
            Y.items.map(({ option: W, kind: ne }) => /* @__PURE__ */ i(
              Gv,
              {
                option: W,
                kindIcon: _ ? Fa[ne].icon : void 0,
                reason: r(W),
                onPick: () => P(W.name, ne)
              },
              W.name
            ))
          ] }, Y.key)) : null
        ] }, T.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Uv({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, o] = w.useState(!1), s = (c) => {
    r(c), o(!1);
  };
  return /* @__PURE__ */ v(_e, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Re,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(lo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Ae, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(Ea, { active: e === "tables", icon: /* @__PURE__ */ i(so, { className: "cv:size-3.5" }), onClick: () => s("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(ae, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ i(
          Ea,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ i(Nr, { className: "cv:size-3.5" }),
            onClick: () => s(c.name),
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
        e ? /* @__PURE__ */ i(Ke, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function Gv({ option: e, reason: t, onPick: n, kindIcon: r }) {
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
const Yv = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Kt = "yyyy-MM-dd";
function Qv(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Pa(e) {
  if (!e) return;
  const t = ho(e, Kt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Wr({ value: e, onChange: t }) {
  const [n, r] = w.useState(!1), a = typeof e == "string", [o, s] = Qv(e), c = Pa(o), l = Pa(s), u = c ? { from: c, to: l } : void 0, m = a ? e : c && l ? `${pe(c, "MMM d, yyyy")} – ${pe(l, "MMM d, yyyy")}` : c ? pe(c, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(_e, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(oo, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", m === "Any time" && "cv:text-muted-foreground"), children: m })
    ] }) }),
    /* @__PURE__ */ v(Ae, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        Yv.map((f) => /* @__PURE__ */ i(
          B,
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
          B,
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
        Bo,
        {
          mode: "range",
          selected: u,
          defaultMonth: c,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([pe(f.from, Kt), pe(f.to, Kt)]) : f != null && f.from ? t([pe(f.from, Kt), pe(f.from, Kt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Jv(e) {
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
function Xv(e, t) {
  const n = new Set(Jv(t));
  return e.filter((r) => n.has(r.type));
}
function Zv(e) {
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
function ef(e, t, n) {
  const r = new Set(n.map((c) => c.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = a, s = 2;
  for (; r.has(o); ) o = `${a}_${s++}`;
  return o;
}
function tf(e, t, n) {
  const r = Zv(e), a = { name: ef(t, e, n), type: r }, o = t.trim();
  return o && (a.label = o), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const pi = w.createContext({});
function nf({
  createVariable: e,
  children: t
}) {
  const n = w.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(pi.Provider, { value: n, children: t });
}
function rf() {
  return w.useContext(pi);
}
function af({ kind: e, value: t, onChange: n, className: r }) {
  const a = jr(), o = (a == null ? void 0 : a.decls) ?? [], { createVariable: s } = rf(), [c, l] = w.useState(!1), [u, m] = w.useState(!1), [f, h] = w.useState(""), y = w.useMemo(() => Xv(o, e), [o, e]), p = y.find((k) => k.name === t), g = (k) => {
    n(k), l(!1), m(!1);
  }, b = () => {
    if (!s) return;
    const k = tf(e, f || "Variable", o);
    s(k), g(k.name), h("");
  };
  return /* @__PURE__ */ v(
    _e,
    {
      open: c,
      onOpenChange: (k) => {
        l(k), k || m(!1);
      },
      children: [
        /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", r), children: [
          /* @__PURE__ */ i(rc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !p && "cv:text-muted-foreground"), children: p ? p.label ?? p.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Ae, { align: "start", className: "cv:w-60 cv:p-1", children: [
          y.length > 0 ? y.map((k) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => g(k.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: k.label ?? k.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: k.type }),
                k.name === t ? /* @__PURE__ */ i(Ke, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            k.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          s ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              ve,
              {
                autoFocus: !0,
                value: f,
                onChange: (k) => h(k.target.value),
                onKeyDown: (k) => {
                  k.key === "Enter" && b(), k.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv:h-7 cv:text-sm"
              }
            ),
            /* @__PURE__ */ i(B, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: b, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground",
              children: [
                /* @__PURE__ */ i(Nt, { className: "cv:size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function At({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = Oe(t), [o, s] = w.useState(a ? "var" : "fixed");
  w.useEffect(() => {
    a && s("var");
  }, [a]);
  const c = (l) => S(
    "cv:flex-1 cv:rounded-sm cv:px-2 cv:py-1 cv:text-center cv:transition-colors",
    l ? "cv:bg-background cv:font-medium cv:shadow-sm" : "cv:text-muted-foreground cv:hover:text-foreground"
  );
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:rounded-md cv:bg-muted cv:p-0.5 cv:text-[11px]", children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          className: c(o === "fixed"),
          onClick: () => {
            s("fixed"), Oe(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      af,
      {
        kind: e,
        value: Oe(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : r(Oe(t) ? void 0 : t, (l) => n(l))
  ] });
}
const of = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Jn(e) {
  return "member" in e && "operator" in e;
}
function cf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: o,
  className: s
}) {
  var L;
  const { meta: c } = rt(), l = ((L = jr()) == null ? void 0 : L.decls) ?? [], [u, m] = w.useState(null), [f, h] = w.useState(null), y = r ?? [], p = y.length === 1 && !Jn(y[0]) && "or" in y[0] && Array.isArray(y[0].or) && y[0].or.every(Jn) ? y[0] : void 0, g = p ? "any" : "all", b = [], k = [];
  p || y.forEach((D) => Jn(D) ? b.push(D) : k.push(D));
  const x = p ? p.or : b, C = k.length === 0 && (x.length >= 2 || g === "any"), N = (D) => g === "any" ? D.length ? [{ or: D }] : [] : [...D, ...k], _ = (D) => {
    const E = D.filter((z) => z.member.length > 0), T = N(E);
    a(T.length > 0 ? T : void 0);
  }, M = (D) => {
    const E = D === "any" ? x.length ? [{ or: x }] : [] : [...x];
    a(E.length > 0 ? E : void 0);
  }, O = (D, E) => _(x.map((T, z) => z === D ? { ...T, ...E } : T)), V = (D) => _(x.filter((E, T) => T !== D)), P = (D) => {
    const T = { ...f ?? { member: "", operator: "equals", values: [] }, ...D };
    T.member ? (h(null), m(x.length), _([...x, T])) : h(T);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", s), children: [
    x.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    C ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        Qt,
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
    x.map((D, E) => {
      const T = Pe(c, D.member);
      return u === E ? /* @__PURE__ */ i(
        $a,
        {
          leaf: D,
          member: T,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (z) => O(E, z),
          onDone: () => m(null),
          onRemove: () => V(E)
        },
        E
      ) : /* @__PURE__ */ i(
        sf,
        {
          text: lf(D, T == null ? void 0 : T.label, l),
          disabled: o,
          onEdit: () => m(E),
          onRemove: () => V(E)
        },
        E
      );
    }),
    f ? /* @__PURE__ */ i(
      $a,
      {
        leaf: f,
        member: Pe(c, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: P,
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
      B,
      {
        variant: "outline",
        size: "sm",
        className: "cv:w-full cv:justify-start",
        disabled: o || !!f,
        onClick: () => {
          m(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(Nt, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function sf({
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
      B,
      {
        variant: "ghost",
        size: "icon",
        className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(Mt, { className: "cv:size-4" })
      }
    )
  ] });
}
function $a({
  leaf: e,
  member: t,
  cube: n,
  cubes: r,
  scope: a,
  disabled: o,
  onChange: s,
  onDone: c,
  onRemove: l
}) {
  const u = Nv(t == null ? void 0 : t.type), m = u.includes(e.operator) ? e.operator : u[0], f = !pr.has(m);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        c && e.member ? /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: c, children: [
          /* @__PURE__ */ i(Ke, { className: "cv:size-3.5" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ i(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-7 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            disabled: o,
            onClick: l,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ i(Mt, { className: "cv:size-3.5" })
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
          hi,
          {
            well: of,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: (h) => s({ member: h }),
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
                    wn(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(tt, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        fi,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: (h) => s({ member: h }),
          placeholder: "Choose a field…",
          disabled: o
        }
      )
    ] }),
    /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ v(
        Le,
        {
          value: m,
          onValueChange: (h) => s({
            operator: h,
            values: pr.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(ze, { className: "cv:w-full", children: /* @__PURE__ */ i(De, {}) }),
            /* @__PURE__ */ i(Te, { children: u.map((h) => /* @__PURE__ */ i(be, { value: h, children: li[h] }, h)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        uf,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => s({ values: h })
        }
      )
    ] }) : null
  ] });
}
function lf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = li[e.operator] ?? e.operator;
  if (pr.has(e.operator)) return `${r} ${a}`;
  const o = (e.values ?? []).map((s) => {
    if (Oe(s)) {
      const c = n.find((l) => l.name === s.var);
      return `{${((c == null ? void 0 : c.label) ?? s.var).replace(/[{}]/g, "")}}`;
    }
    return String(s);
  });
  return o.length > 0 ? `${r} ${a} ${o.join(", ")}` : `${r} ${a} …`;
}
function uf({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && Oe(r[0]);
  if (t === "time") {
    const c = a ? r[0] : mf(r);
    return /* @__PURE__ */ i(
      At,
      {
        kind: "dateRange",
        value: c,
        onChange: (l) => n(l === void 0 ? [] : Oe(l) ? [l] : df(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(Wr, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", s = a ? r[0] : r.filter((c) => !Oe(c));
  return /* @__PURE__ */ i(
    At,
    {
      kind: o,
      value: s,
      onChange: (c) => n(c === void 0 ? [] : Oe(c) ? [c] : c),
      renderFixed: (c, l) => /* @__PURE__ */ i(
        ve,
        {
          value: (c ?? []).map(String).join(", "),
          onChange: (u) => l(vf(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function mf(e) {
  const t = e.filter((n) => !Oe(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function df(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function vf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function ff({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: o } = e, s = (o.filters ?? []).length, c = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(_e, { children: [
    /* @__PURE__ */ v(
      Re,
      {
        className: S(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          s > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(ac, { className: "cv:size-4" }),
          "Filter",
          s > 0 ? /* @__PURE__ */ i("span", { className: "cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground", children: s }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(Ae, { align: "end", className: "cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(hf, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ i(cf, { cube: n, cubes: r, scope: a, value: o.filters, onChange: c })
    ] })
  ] });
}
function hf({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = rt(), a = Cv(r, n);
  if (a.length === 0) return null;
  const o = new Set(e.query.segments ?? []), s = (c) => {
    const l = new Set(o);
    l.has(c) ? l.delete(c) : l.add(c);
    const u = [...l];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-b cv:border-border cv:pb-2", children: [
    /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: a.map((c) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => s(c.name),
        title: c.description ?? c.name,
        className: S(
          "cv:rounded-full cv:border cv:px-2.5 cv:py-1 cv:text-xs cv:transition-colors",
          o.has(c.name) ? "cv:border-ring cv:bg-accent cv:text-foreground" : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground"
        ),
        children: c.label
      },
      c.name
    )) })
  ] });
}
function pf({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: r } = rt(), a = w.useMemo(() => Tn(r), [r]), o = a.filter((b) => b.type === "view"), s = a.filter((b) => b.type === "cube"), c = a.find((b) => b.name === e), [l, u] = w.useState(!1), [m, f] = w.useState(null), h = (b) => {
    if (b === e) {
      u(!1);
      return;
    }
    t ? f(b) : (n(b), u(!1));
  }, y = () => {
    m && n(m), f(null), u(!1);
  }, p = m ? ((g = a.find((b) => b.name === m)) == null ? void 0 : g.title) ?? m : "";
  return /* @__PURE__ */ v(
    _e,
    {
      open: l,
      onOpenChange: (b) => {
        u(b), b || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          Re,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(lo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !c && "cv:text-muted-foreground"), children: c ? c.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Ae, { align: "start", className: "cv:w-64 cv:p-1", children: m ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: p }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(B, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(B, { size: "sm", className: "cv:h-7", onClick: y, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(ae, { children: [
            /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
            o.map((b) => /* @__PURE__ */ i(
              Ia,
              {
                icon: /* @__PURE__ */ i(Nr, { className: "cv:size-3.5" }),
                label: b.title,
                active: b.name === e,
                onClick: () => h(b.name)
              },
              b.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Tables" }),
          s.map((b) => /* @__PURE__ */ i(
            Ia,
            {
              icon: /* @__PURE__ */ i(uo, { className: "cv:size-3.5" }),
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
function Ia({
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
        n ? /* @__PURE__ */ i(Ke, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function ja(e, t, n, r) {
  var o;
  const a = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Va({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var c;
  const o = ((c = e.chart.axes) == null ? void 0 : c[n]) ?? {}, s = o.labelHide === !0;
  return /* @__PURE__ */ v(
    "div",
    {
      className: S(
        "cv:flex cv:w-full cv:min-w-[8rem] cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-1.5 cv:py-1 cv:transition-opacity",
        s && "cv:opacity-50"
      ),
      children: [
        r ? /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: r }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: a ?? "Axis title",
            disabled: s,
            onChange: (l) => ja(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          bf,
          {
            hidden: s,
            what: "axis title",
            onClick: () => ja(e, t, n, { labelHide: s ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function gf({
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
          n ? /* @__PURE__ */ i(mo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(vo, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function bf({
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
      children: e ? /* @__PURE__ */ i(mo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(vo, { className: "cv:size-3.5" })
    }
  );
}
const gi = w.forwardRef(
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
gi.displayName = "Label";
function de({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: o,
  children: s
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: S("cv:flex cv:flex-col cv:gap-1.5 cv:py-1.5", o), children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i(gi, { htmlFor: r, className: "cv:text-muted-foreground", children: e }),
      a ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: a }) : null
    ] }),
    s,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function br({
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
function ge({
  label: e,
  hint: t,
  checked: n,
  onChange: r,
  disabled: a,
  className: o
}) {
  const s = w.useId();
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "switch-row",
      className: S("cv:flex cv:items-center cv:justify-between cv:gap-3 cv:py-1.5", o),
      children: [
        /* @__PURE__ */ v(
          "label",
          {
            htmlFor: s,
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
        /* @__PURE__ */ i(br, { id: s, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function yf({ spec: e, update: t }) {
  var p, g;
  const n = pt(), { chart: r } = e, a = r.family, o = r.familyOptions ?? {}, s = n.require(a);
  if (s.Customize) {
    const b = s.Customize;
    return /* @__PURE__ */ i(b, { spec: e, update: t });
  }
  const c = (b) => t({ ...e, chart: { ...r, ...b } }), l = (b) => t({ ...e, chart: { ...r, familyOptions: { ...o, ...b } } }), u = ((g = (p = r.mapping) == null ? void 0 : p.series) == null ? void 0 : g.mode) === "pivot" ? "stacked" : "none", m = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", h = /* @__PURE__ */ i(de, { label: "Stacked", children: /* @__PURE__ */ i(
    Qt,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: m === "stacked" ? "stacked" : m === "percent" ? "percent" : "none",
      onChange: (b) => c({ stackMode: b })
    }
  ) }), y = (() => {
    var b, k;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ v(ae, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (x) => c({ orientation: x ? "horizontal" : "vertical" })
            }
          ),
          h
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(ae, { children: [
          h,
          r.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((k = (b = r.mapping) == null ? void 0 : b.series) == null ? void 0 : k.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(ae, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Donut",
              checked: typeof o.innerRadiusPct == "number" && o.innerRadiusPct > 0,
              onChange: (x) => l({ innerRadiusPct: x ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(de, { label: "Slice labels", children: /* @__PURE__ */ i(
            Qt,
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
          /* @__PURE__ */ i(wf, { label: "Max slices", children: /* @__PURE__ */ i(
            ve,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: o.maxSlices ?? "",
              placeholder: "8",
              onChange: (x) => {
                const C = parseInt(x.target.value, 10);
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
        return /* @__PURE__ */ v(ae, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Compact rows",
              checked: o.rowHeight === "compact",
              onChange: (x) => l({ rowHeight: x ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Sortable columns",
              checked: o.sortable !== !1,
              onChange: (x) => l({ sortable: x })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Sticky header",
              checked: o.stickyHeader !== !1,
              onChange: (x) => l({ stickyHeader: x })
            }
          ),
          /* @__PURE__ */ i(
            ge,
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
function xf(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0;
}
function wf({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function bi(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(_v(e, r, n));
  };
}
function kf({ spec: e, update: t, empty: n }) {
  const r = pt(), a = e.chart.family, o = bi(e, t, r);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(yi, { family: a, onPick: o, families: r })
  ] }) }) : null;
}
function Cf({ spec: e, update: t }) {
  const n = pt(), r = e.chart.family, a = bi(e, t, n), o = n.require(r), s = o.icon;
  return /* @__PURE__ */ v(_e, { children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(s, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          o.label,
          /* @__PURE__ */ i(tt, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Ae, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(yi, { family: r, onPick: a, families: n })
      ] }),
      xf(r, n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(yf, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function yi({ family: e, onPick: t, families: n }) {
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
function Nf(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Sf(e, t, n, r, a, o) {
  var Gr, Yr, Qr, Jr, Xr, Zr, ea, ta, na, ra, aa, oa, ia, ca;
  const { chart: s, query: c } = e, l = s.family, u = n.kinds.length === 1 ? n.kinds[0] : _f(a), m = s.familyOptions ?? {}, f = Array.isArray(m.series) ? m.series : [], h = Array.isArray(m.columns) ? m.columns : [], y = Ft(s), p = y[r], g = l === "combo" && n.id === "y", b = l === "table" && n.id === "columns", k = l === "bar" || l === "line" || l === "area", x = ((Yr = (Gr = s.mapping) == null ? void 0 : Gr.series) == null ? void 0 : Yr.mode) === "measures", C = k && n.id === "y", N = C && x, _ = g ? (Qr = f.find((j) => j.member === r)) == null ? void 0 : Qr.label : b ? (Jr = h.find((j) => j.member === r)) == null ? void 0 : Jr.label : N ? p == null ? void 0 : p.label : void 0, M = g ? (Xr = f.find((j) => j.member === r)) == null ? void 0 : Xr.colorToken : N ? p == null ? void 0 : p.colorToken : void 0, O = at(c), V = n.kinds.includes("time") && (O == null ? void 0 : O.dimension) === r, P = V ? O == null ? void 0 : O.granularity : void 0, L = V ? O == null ? void 0 : O.dateRange : void 0, D = g ? ((Zr = f.find((j) => j.member === r)) == null ? void 0 : Zr.render) ?? "line" : void 0, E = l === "line" && n.id === "y", T = l === "bar" && n.id === "y" && s.orientation !== "horizontal", z = ((ta = (ea = s.mapping) == null ? void 0 : ea.series) == null ? void 0 : ta.mode) === "pivot", Q = ((ra = (na = s.mapping) == null ? void 0 : na.series) == null ? void 0 : ra.mode) === "pivot" ? s.mapping.series.meta : void 0, J = (E || T) && (x || z) || g, I = J ? (g ? (aa = f.find((j) => j.member === r)) == null ? void 0 : aa.axis : x ? p == null ? void 0 : p.axis : (oa = Q == null ? void 0 : Q[r]) == null ? void 0 : oa.axis) ?? "left" : void 0, Y = (l === "line" || l === "area") && n.id === "y" && x || g && (D === "line" || D === "area"), W = g ? f.find((j) => j.member === r) : void 0, ne = Y ? g ? W == null ? void 0 : W.curve : p == null ? void 0 : p.curve : void 0, me = Y ? g ? W == null ? void 0 : W.dots : p == null ? void 0 : p.dots : void 0, U = (j) => {
    var sa, la;
    if ((sa = s.mapping) != null && sa.series && s.mapping.series.mode !== "measures") return;
    const se = ((la = s.mapping) != null && la.series && s.mapping.series.mode === "measures" ? s.mapping.series.members : c.measures) ?? [], le = { ...y };
    j && Object.keys(j).length > 0 ? le[r] = j : delete le[r];
    const $t = Ce(s);
    $t && t({
      ...e,
      chart: {
        ...s,
        mapping: { category: { member: $t }, series: mi(se, le) }
      }
    });
  }, R = (j) => {
    const se = f.map((le) => le.member === r ? { ...le, ...j } : le);
    t({ ...e, chart: { ...s, familyOptions: { ...m, series: se } } });
  }, Z = (j) => {
    const se = h.map((le) => le.member === r ? { ...le, ...j } : le);
    t({ ...e, chart: { ...s, familyOptions: { ...m, columns: se } } });
  }, fe = (j) => {
    g ? R({ label: j }) : b ? Z({ label: j }) : N && U({ ...p, label: j });
  }, Fe = (j) => {
    g ? R({ colorToken: j ?? void 0 }) : N && U({ ...p, colorToken: j ?? void 0 });
  }, Ee = (j) => {
    if (!O) return;
    const se = { ...O };
    for (const le of Object.keys(j)) {
      const $t = j[le];
      $t === void 0 ? delete se[le] : se[le] = $t;
    }
    t({ ...e, query: { ...c, timeDimensions: [se] } });
  }, q = (j) => Ee({ granularity: j }), G = (j) => Ee({ dateRange: j }), he = (j) => R({ render: j }), gt = (j) => {
    var se, le;
    g ? R({ axis: j }) : N ? U({ ...p, axis: j }) : ((le = (se = s.mapping) == null ? void 0 : se.series) == null ? void 0 : le.mode) === "pivot" && t(xi(e, l, r, j));
  }, We = (j) => {
    g ? R({ curve: j }) : N && U({ ...p, curve: j });
  }, ot = (j) => {
    g ? R({ dots: j }) : N && U({ ...p, dots: j });
  }, it = () => t(Ov(e, l, n.id, r, o)), Pt = (n.id === "x" || n.id === "slices") && (u === "category" || u === "time"), A = (ia = s.mapping) == null ? void 0 : ia.series, F = (A && A.mode === "pivot" ? A.value : Rt(s)[0]) ?? ((ca = c.measures) == null ? void 0 : ca[0]), $ = Pt ? u === "time" ? [
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
  ] : [], H = (() => {
    const j = Nf(c.order)[0];
    if (!j) return "none";
    const [se, le] = j;
    return F && se === F ? le === "desc" ? "value-desc" : "value-asc" : se === r ? u === "time" ? le === "desc" ? "time-desc" : "time-asc" : le === "asc" ? "label-asc" : "label-desc" : "none";
  })(), X = (j) => {
    let se;
    switch (j) {
      case "none":
        se = void 0;
        break;
      case "value-desc":
        se = F ? [[F, "desc"]] : void 0;
        break;
      case "value-asc":
        se = F ? [[F, "asc"]] : void 0;
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
    t({ ...e, query: { ...c, order: se } });
  }, ce = typeof c.limit == "number" ? c.limit : void 0, oe = (j) => t({ ...e, query: { ...c, limit: j && j > 0 ? j : void 0 } }), ct = (l === "bar" || l === "line" || l === "area") && V, _i = ct && m.comparePrevious === !0;
  return {
    kind: u,
    label: _,
    colorToken: M,
    granularity: P,
    dateRange: L,
    render: D,
    axis: I,
    curve: ne,
    dots: me,
    canLineStyle: Y,
    canAxis: J,
    canRename: g || b || N,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: C && x || g,
    isTimeField: V,
    isComboY: g,
    isCategoryField: Pt,
    sortValue: H,
    sortOptions: $,
    onSort: X,
    limit: ce,
    onLimit: oe,
    canComparePrevious: ct,
    comparePrevious: _i,
    comparePreviousReady: ct && L !== void 0,
    onComparePrevious: (j) => t({ ...e, chart: { ...s, familyOptions: { ...m, comparePrevious: j || void 0 } } }),
    onRename: fe,
    onRecolor: Fe,
    onGranularity: q,
    onDateRange: G,
    onRender: he,
    onAxis: gt,
    onCurve: We,
    onDots: ot,
    onRemove: it
  };
}
function xi(e, t, n, r) {
  var s;
  const { chart: a } = e;
  if (t === "combo") {
    const c = a.familyOptions ?? {}, l = (Array.isArray(c.series) ? c.series : []).map(
      (u) => u.member === n ? { ...u, axis: r } : u
    );
    return { ...e, chart: { ...a, familyOptions: { ...c, series: l } } };
  }
  const o = (s = a.mapping) == null ? void 0 : s.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const c = { ...o.meta ?? {} };
    return c[n] = { ...c[n] ?? {}, axis: r }, { ...e, chart: { ...a, mapping: { ...a.mapping, series: { ...o, meta: c } } } };
  }
  return e;
}
function _f(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function qa(e, t, n, r) {
  var f;
  const { chart: a, query: o } = e, s = a.family, c = (h) => {
    if (r < 0 || r >= h.length || n === r) return h;
    const y = h.slice(), [p] = y.splice(n, 1);
    return y.splice(r, 0, p), y;
  };
  if (s === "combo" && t.id === "y") {
    const h = a.familyOptions ?? {}, y = c(Array.isArray(h.series) ? h.series : []), p = c(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: p },
      chart: { ...a, familyOptions: { ...h, series: y } }
    };
  }
  if (s === "table" && t.id === "columns") {
    const h = a.familyOptions ?? {}, y = c(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...h, columns: y } } };
  }
  const l = c(o.measures ?? []), u = (f = a.mapping) == null ? void 0 : f.series;
  let m = a.mapping;
  if (u && u.mode === "measures")
    m = { ...a.mapping, series: { ...u, members: l } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = c(u.values);
    m = { ...a.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...o, measures: l }, chart: { ...a, mapping: m } };
}
function Rf(e, t, n, r) {
  const a = Tn(e), o = a.filter((N) => N.type === "view"), s = rn(t, r), c = Object.values(s).flat();
  let l;
  for (const N of c) {
    const _ = Pe(e, N);
    if (_) {
      l = _;
      break;
    }
  }
  const u = !l && n ? Wt(e, n) : void 0, m = l ? Wt(e, l.cube) : u, f = (m == null ? void 0 : m.type) === "view" ? m.name : void 0, h = (l == null ? void 0 : l.connectedComponent) ?? (u == null ? void 0 : u.connectedComponent), y = t.query.measures ?? [], p = y.length ? qt(y[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: o, measureSource: p, scopeComponent: h };
  const g = p ?? (l == null ? void 0 : l.cube) ?? (u == null ? void 0 : u.name), b = g ? Wt(e, g) : void 0, k = a.filter((N) => N.type === "cube" && N.connectedComponent !== void 0), C = (h === void 0 ? k : k.filter((N) => N.connectedComponent === h)).filter((N) => N.name !== g).sort((N, _) => N.title.localeCompare(_.title));
  return {
    sourceCube: (b == null ? void 0 : b.type) === "cube" ? b : void 0,
    relatedCubes: C,
    views: o,
    measureSource: p,
    scopeComponent: h
  };
}
const Af = et.options;
function Mf({
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
        Af.map((o) => {
          const s = e === o;
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": s,
              "aria-label": o,
              title: o,
              disabled: r,
              onClick: () => t(s && n ? null : o),
              className: S(
                "cv:size-6 cv:rounded-full cv:border cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
                s ? "cv:border-ring cv:ring-2 cv:ring-ring/40" : "cv:border-black/10 cv:hover:border-ring"
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
const Of = mt.options, Lf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function wi({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: o,
  className: s
}) {
  const c = n && n.length > 0 ? n : Of;
  return /* @__PURE__ */ v(
    Le,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: a,
      children: [
        /* @__PURE__ */ i(ze, { id: o, className: s, children: /* @__PURE__ */ i(De, { placeholder: r }) }),
        /* @__PURE__ */ i(Te, { children: c.map((l) => /* @__PURE__ */ i(be, { value: l, children: Lf[l] }, l)) })
      ]
    }
  );
}
const Ka = { bar: "Bar", line: "Line", area: "Area" }, Df = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function zf({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: o,
  reorder: s,
  className: c
}) {
  const l = pt(), u = Sf(e, t, n, r, a, l), m = (a == null ? void 0 : a.label) ?? r, f = u.label || m, h = u.canColor && o !== void 0, y = u.canRename || h || u.isTimeField || u.isCategoryField || u.isComboY && !!u.render || u.canAxis || u.canLineStyle || !!s, p = (b) => {
    const k = b.trim();
    u.onRename(k.length > 0 ? k : void 0);
  }, g = /* @__PURE__ */ v(ae, { children: [
    h ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : a ? wn(a.type) : null,
    /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: f })
  ] });
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "field-pill",
      className: S(
        "cv:flex cv:items-center cv:gap-1 cv:rounded-md cv:border cv:border-border cv:bg-background cv:py-1 cv:pl-2 cv:pr-1 cv:text-sm cv:shadow-sm",
        c
      ),
      children: [
        y ? /* @__PURE__ */ v(_e, { children: [
          /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${f}`,
              children: g
            }
          ) }),
          /* @__PURE__ */ i(Ae, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            u.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                ve,
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
              /* @__PURE__ */ i(Mf, { value: u.colorToken, onChange: u.onRecolor })
            ] }) : null,
            u.isTimeField ? /* @__PURE__ */ v(ae, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  At,
                  {
                    kind: "dateRange",
                    value: u.dateRange,
                    onChange: u.onDateRange,
                    renderFixed: (b, k) => /* @__PURE__ */ i(Wr, { value: b, onChange: k })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  At,
                  {
                    kind: "granularity",
                    value: u.granularity,
                    onChange: u.onGranularity,
                    renderFixed: (b, k) => /* @__PURE__ */ i(wi, { value: b, onChange: k, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              u.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    br,
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
            u.isCategoryField ? /* @__PURE__ */ v(ae, { children: [
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
                  ve,
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
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: Object.keys(Ka).map((b) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => u.onRender(b),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                    u.render === b ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    Ka[b],
                    u.render === b ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
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
                    u.axis === b ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
                  ]
                },
                b
              )) })
            ] }) : null,
            u.canLineStyle ? /* @__PURE__ */ v(ae, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: Df.map(([b, k]) => /* @__PURE__ */ v(
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
                      (u.curve ?? "monotone") === b ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
                    ]
                  },
                  b
                )) })
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(br, { checked: u.dots === !0, onChange: u.onDots, "aria-label": "Show points" })
              ] })
            ] }) : null,
            s ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1", children: [
              /* @__PURE__ */ v(
                B,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !s.canUp,
                  onClick: s.onUp,
                  children: [
                    /* @__PURE__ */ i(kn, { className: "cv:size-3.5" }),
                    "Up"
                  ]
                }
              ),
              /* @__PURE__ */ v(
                B,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !s.canDown,
                  onClick: s.onDown,
                  children: [
                    /* @__PURE__ */ i(Cn, { className: "cv:size-3.5" }),
                    "Down"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ v(
              B,
              {
                variant: "ghost",
                size: "sm",
                className: "cv:h-8 cv:justify-start cv:text-destructive cv:hover:text-destructive",
                onClick: u.onRemove,
                children: [
                  /* @__PURE__ */ i(ua, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: f, children: g }),
        /* @__PURE__ */ i(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: u.onRemove,
            "aria-label": `Remove ${f}`,
            children: /* @__PURE__ */ i(ua, { className: "cv:size-3.5" })
          }
        )
      ]
    }
  );
}
function Ha({
  spec: e,
  update: t,
  well: n,
  placed: r,
  allPlaced: a,
  optionFor: o,
  colorFor: s,
  scope: c,
  blockReason: l,
  onAdd: u,
  badge: m,
  orientation: f,
  lockedSingle: h,
  disableReorder: y,
  label: p,
  note: g,
  pickerSide: b,
  pickerAlign: k,
  control: x
}) {
  const C = n.cardinality === "many" && !h, N = C || r.length === 0, _ = r.length, M = f === "vertical", O = p ?? n.label, V = /* @__PURE__ */ i(
    hi,
    {
      well: n,
      placed: a,
      scope: c,
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
            /* @__PURE__ */ i(Nt, { className: "cv:size-3.5" }),
            r.length === 0 ? O : "Add"
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
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: O }),
          m ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        x ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: x }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", M ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          r.map((P, L) => /* @__PURE__ */ i(
            zf,
            {
              spec: e,
              update: t,
              well: n,
              member: P,
              option: o(P),
              resolvedColor: s(P),
              className: M ? "cv:w-full" : void 0,
              reorder: C && _ > 1 && !y ? {
                canUp: L > 0,
                canDown: L < _ - 1,
                onUp: () => t(qa(e, n, L, L - 1)),
                onDown: () => t(qa(e, n, L, L + 1))
              } : void 0
            },
            P
          )),
          N ? V : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function Xn({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ v(_e, { children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2.5 cv:py-1.5 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: e }),
          /* @__PURE__ */ v("span", { className: "cv:flex cv:shrink-0 cv:items-center cv:gap-1 cv:text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "cv:text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(tt, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Ae, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Ur(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...o } } }) };
}
function Tf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ur(e, t), a = ui(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], s = n.display ?? "number", c = n.gauge, l = (m) => {
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
    /* @__PURE__ */ i(Ut, { label: "Time field", children: /* @__PURE__ */ i(
      fi,
      {
        cube: a,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (m) => l({ dimension: m }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Ut, { label: "Date range", children: /* @__PURE__ */ i(
      At,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (m) => l({ dateRange: m }),
        renderFixed: (m, f) => /* @__PURE__ */ i(Wr, { value: m, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(de, { label: "Display", children: /* @__PURE__ */ i(
      Qt,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: s,
        onChange: (m) => r({ display: m })
      }
    ) }),
    s === "gauge" ? /* @__PURE__ */ i(Ut, { label: "Gauge max", children: /* @__PURE__ */ i(
      ve,
      {
        type: "number",
        className: "cv:h-8",
        value: (c == null ? void 0 : c.max) ?? "",
        placeholder: "Auto",
        onChange: (m) => {
          const f = parseFloat(m.target.value);
          r({ gauge: Number.isFinite(f) ? { ...c ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Ff({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ur(e, t), a = n.comparison, o = a !== void 0, s = w.useRef(void 0);
  a && (s.current = a);
  const c = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ge,
      {
        label: "Show comparison",
        checked: o,
        onChange: (m) => r({
          comparison: m ? s.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(ae, { children: [
      /* @__PURE__ */ i(de, { label: "Against", children: /* @__PURE__ */ i(
        Qt,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ i(Ut, { label: "Baseline value", children: /* @__PURE__ */ i(
        ve,
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
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(c != null && c.dateRange) ? /* @__PURE__ */ i("p", { className: "cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
      /* @__PURE__ */ i(
        ge,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (m) => r({ comparison: { ...a, showAsPercent: m } })
        }
      ),
      /* @__PURE__ */ i(
        ge,
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
function Ef({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Ur(e, t), a = n.sparkline, o = a !== void 0, s = n.comparison !== void 0, c = n.goodDirection ?? "up", l = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ge,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => r({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(ae, { children: [
      /* @__PURE__ */ i(Ut, { label: "Trend granularity", children: /* @__PURE__ */ i(
        At,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ i(wi, { value: u, onChange: m, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      s ? null : /* @__PURE__ */ i(
        ge,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the trend color).",
          checked: c !== "down",
          onChange: (u) => r({ goodDirection: u ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Ut({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Pf({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var We, ot, it, Pt;
  const { meta: a } = rt(), { locale: o } = Ve(), s = pt(), { chart: c } = e, l = c.family, u = s.require(l), m = ui(e), f = w.useMemo(() => Mn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), h = w.useCallback(
    (A) => A && (o == null ? void 0 : o.unitSystem) === "imperial" && f[A] ? f[A].imperialUnit : A,
    [o == null ? void 0 : o.unitSystem, f]
  ), y = w.useMemo(() => Rv(l, s), [l, s]), p = w.useMemo(() => rn(e, s), [e, s]), g = w.useMemo(() => new Map(y.map((A) => [A.id, A])), [y]), [b, k] = w.useState(void 0), x = w.useMemo(
    () => Rf(a, e, b, s),
    [a, e, b, s]
  ), C = w.useMemo(() => Object.values(p).flat(), [p]), N = w.useCallback(
    (A) => {
      k(A), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), _ = w.useMemo(
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
  ), O = u.dualAxisY, V = w.useCallback(
    (A, F, $) => u.assignSeriesAxis ? u.assignSeriesAxis(A, F, $) : u.placeField ? A : xi(A, l, F, $),
    [u, l]
  ), P = w.useCallback(
    (A) => {
      var H, X, ce;
      if (l === "combo") {
        const oe = c.familyOptions ?? {}, ue = (Array.isArray(oe.series) ? oe.series : []).find(
          (ct) => ct.member === A
        );
        return (ue == null ? void 0 : ue.axis) === "right" ? "right" : "left";
      }
      const F = (H = c.mapping) == null ? void 0 : H.series;
      return (F && (F.mode === "measures" || F.mode === "pivot") ? (ce = (X = F.meta) == null ? void 0 : X[A]) == null ? void 0 : ce.axis : void 0) === "right" ? "right" : "left";
    },
    [l, c.familyOptions, c.mapping]
  ), L = w.useMemo(() => {
    var ce, oe;
    const A = p.y ?? [], F = (ue) => A.find((ct) => P(ct) === ue), $ = F("left"), H = O ? F("right") : void 0, X = (ue) => ue ? Pe(a, ue) : void 0;
    return {
      leftKey: $ ? It(X($)) : void 0,
      rightKey: H ? It(X(H)) : void 0,
      leftLabel: $ ? Ba(X($), h((ce = X($)) == null ? void 0 : ce.unit)) : void 0,
      rightLabel: H ? Ba(X(H), h((oe = X(H)) == null ? void 0 : oe.unit)) : void 0
    };
  }, [p, O, P, a, h]), D = w.useCallback(
    (A) => {
      const F = It(A), { leftKey: $, rightKey: H } = L;
      return $ === void 0 || F === $ ? "left" : H === void 0 || F === H ? "right" : "left";
    },
    [L]
  ), E = w.useCallback(
    (A, F) => {
      var $;
      if (F) {
        if (x.scopeComponent !== void 0 && F.connectedComponent !== x.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (F.memberType === "measure" && x.measureSource && F.cube !== x.measureSource)
          return `Measures come from one table (${(($ = x.sourceCube) == null ? void 0 : $.title) ?? x.measureSource}). Remove them to switch.`;
        if (A === "y" && F.memberType === "measure") {
          const { leftKey: H, rightKey: X, leftLabel: ce, rightLabel: oe } = L, ue = It(F);
          if (O) {
            if (H !== void 0 && X !== void 0 && ue !== H && ue !== X)
              return `Both axes show ${ce} & ${oe} — remove one to add a third unit.`;
          } else if (H !== void 0 && ue !== H)
            return `This axis shows ${ce}; ${F.label ?? "this field"} is ${gr(F)}`;
        }
      }
    },
    [x, L, O]
  ), T = O ? [L.leftLabel, L.rightLabel].filter(Boolean).join(" · ") || void 0 : L.leftLabel, z = w.useMemo(() => {
    var F;
    const A = {};
    if (l === "bar" || l === "line" || l === "area") {
      const $ = (F = c.mapping) == null ? void 0 : F.series;
      if ($ && $.mode === "measures") {
        const H = $.members.map((ce) => {
          var oe, ue;
          return { key: ce, colorToken: (ue = (oe = $.meta) == null ? void 0 : oe[ce]) == null ? void 0 : ue.colorToken };
        }), X = cr(H, c.colors);
        $.members.forEach((ce, oe) => {
          A[ce] = X[oe];
        });
      }
    } else if (l === "combo") {
      const $ = c.familyOptions ?? {}, H = Array.isArray($.series) ? $.series : [], X = H.map((oe) => ({ key: oe.member, colorToken: oe.colorToken })), ce = cr(X, c.colors);
      H.forEach((oe, ue) => {
        A[oe.member] = ce[ue];
      });
    }
    return A;
  }, [l, c.mapping, c.colors, c.familyOptions]), Q = w.useCallback(
    (A, F, $) => {
      const H = Pe(a, F);
      if (E(A, H)) return;
      let X = za(e, l, A, F, $, s);
      O && A === "y" && (X = V(X, F, D(H))), t(X);
    },
    [E, a, t, e, l, O, D, V, s]
  ), J = w.useCallback(
    (A, F) => {
      var X;
      if (!F) return;
      if (x.scopeComponent !== void 0 && F.connectedComponent !== x.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (F.memberType === "measure" && x.measureSource && F.cube !== x.measureSource)
        return `Measures come from one table (${((X = x.sourceCube) == null ? void 0 : X.title) ?? x.measureSource}). Remove them to switch.`;
      const $ = A === "left" ? L.leftKey : L.rightKey, H = A === "left" ? L.leftLabel : L.rightLabel;
      if ($ !== void 0 && It(F) !== $)
        return `This axis shows ${H}; ${F.label ?? "this field"} is ${gr(F)}`;
    },
    [x, L]
  ), I = w.useCallback(
    (A, F, $) => {
      const H = Pe(a, F);
      J(A, H) || t(V(za(e, l, "y", F, $, s), F, A));
    },
    [J, a, t, e, l, V, s]
  ), K = l === "bar" && c.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, te = K.left.map((A) => g.get(A)).filter(Boolean), Y = K.bottom.map((A) => g.get(A)).filter(Boolean), W = (We = p.color) == null ? void 0 : We[0], ne = ((ot = p.y) == null ? void 0 : ot.length) ?? 0, me = W && ne > 1 ? `${ne} measures × ${((it = Pe(a, W)) == null ? void 0 : it.label) ?? "this split"} — one series per measure per value.` : void 0, U = u.hasLegend, R = p.y ?? [], Z = R.find((A) => P(A) !== "right"), fe = O ? R.find((A) => P(A) === "right") : void 0, Fe = (A) => {
    var H, X, ce, oe;
    if (!A) return;
    const F = (H = c.mapping) == null ? void 0 : H.series;
    return (F && F.mode === "measures" ? (ce = (X = F.meta) == null ? void 0 : X[A]) == null ? void 0 : ce.label : void 0) ?? ((oe = Pe(a, A)) == null ? void 0 : oe.label);
  }, Ee = (A) => {
    var $, H, X, ce;
    const F = (oe, ue) => ue ? /* @__PURE__ */ i(Va, { spec: e, update: t, axis: oe, title: "Title", auto: Fe(ue) }) : null;
    switch (A) {
      case "y":
        return F("y", Z);
      // single value axis (bar / area)
      case "x":
        return F("x", (H = ($ = c.mapping) == null ? void 0 : $.category) == null ? void 0 : H.member);
      case "sy":
        return F("y", (X = p.sy) == null ? void 0 : X[0]);
      // scatter Y axis
      case "sx":
        return F("x", (ce = p.sx) == null ? void 0 : ce[0]);
      // scatter X axis
      default:
        return null;
    }
  }, q = (A, F) => /* @__PURE__ */ i(
    Ha,
    {
      spec: e,
      update: t,
      well: A,
      placed: p[A.id] ?? [],
      allPlaced: C,
      optionFor: ($) => Pe(a, $),
      colorFor: ($) => z[$],
      scope: x,
      blockReason: ($) => E(A.id, $),
      onAdd: ($, H) => Q(A.id, $, H),
      badge: A.id === "y" ? T : void 0,
      orientation: F,
      note: A.id === "color" ? me : void 0,
      control: Ee(A.id)
    },
    A.id
  ), G = g.get("y"), he = (A) => {
    if (!G) return null;
    const F = A === "left" ? Z : fe;
    return /* @__PURE__ */ i(
      Ha,
      {
        spec: e,
        update: t,
        well: G,
        label: A === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter(($) => P($) === A),
        allPlaced: C,
        optionFor: ($) => Pe(a, $),
        colorFor: ($) => z[$],
        scope: x,
        blockReason: ($) => J(A, $),
        onAdd: ($, H) => I(A, $, H),
        badge: A === "left" ? L.leftLabel : L.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: F ? /* @__PURE__ */ i(
          Va,
          {
            spec: e,
            update: t,
            axis: A === "left" ? "y" : "y2",
            title: "Title",
            auto: Fe(F)
          }
        ) : null
      },
      `y-${A}`
    );
  }, gt = () => {
    const A = g.get("value"), F = (p.value ?? []).length > 0, $ = c.familyOptions ?? {};
    return /* @__PURE__ */ v(ae, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        A ? q(A, "vertical") : null,
        F ? /* @__PURE__ */ i(
          Xn,
          {
            label: "Time, range & display",
            summary: $.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(Tf, { spec: e, update: t })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ v(ae, { children: [
        /* @__PURE__ */ i(Xn, { label: "Comparison", summary: $.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Ff, { spec: e, update: t }) }),
        /* @__PURE__ */ i(Xn, { label: "Sparkline", summary: $.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Ef, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      M ? null : /* @__PURE__ */ i(Cf, { spec: e, update: t }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          pf,
          {
            currentName: x.viewLocked ?? ((Pt = x.sourceCube) == null ? void 0 : Pt.name),
            hasFields: C.length > 0,
            onSelect: N
          }
        ),
        /* @__PURE__ */ i(ff, { spec: e, update: t, cube: m, scopeCubes: _, scope: x })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      te.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", u.sidebarWidthClass), children: l === "kpi" ? gt() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        te.flatMap(
          (A) => O && A.id === "y" ? [he("left"), he("right")] : [q(A, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          r,
          /* @__PURE__ */ i(kf, { spec: e, update: t, empty: M })
        ] }),
        Y.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          Y.map((A) => q(A, "horizontal")),
          U && !M ? /* @__PURE__ */ i(gf, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Ba(e, t) {
  const n = gr(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function ki(e, t) {
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
function Zn(e) {
  const t = So.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function $f({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = w.useState(() => ({
    spec: e,
    issues: Zn(e)
  })), [o, s] = w.useState(e);
  w.useEffect(() => {
    a({ spec: e, issues: Zn(e) }), s(e);
  }, [e]);
  const c = ki((h) => t(h), n), l = r.spec, u = r.issues, m = u.length === 0, f = w.useCallback(
    (h) => {
      const y = Zn(h);
      a({ spec: h, issues: y }), y.length === 0 && (s(h), c(h));
    },
    [c]
  );
  return { draft: l, issues: u, valid: m, committed: o, update: f };
}
const If = () => {
};
function jf({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: o
}) {
  const { draft: s, issues: c, valid: l, committed: u, update: m } = $f({
    spec: e,
    onChange: t ?? If,
    debounceMs: r
  }), f = u, h = (C) => {
    var N, _, M;
    return (((N = C.measures) == null ? void 0 : N.length) ?? 0) > 0 || (((_ = C.dimensions) == null ? void 0 : _.length) ?? 0) > 0 || (((M = C.timeDimensions) == null ? void 0 : M.some((O) => typeof O.granularity == "string")) ?? !1);
  }, y = (C) => {
    var N;
    return (((N = C.measures) == null ? void 0 : N.length) ?? 0) > 0;
  }, p = s.chart.family !== "table", g = h(s.query) && h(f.query) && (!p || y(s.query) && y(f.query)), b = p && !y(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", k = g ? /* @__PURE__ */ i(Vr, { query: f.query, chart: f.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: b }) }), x = n ? /* @__PURE__ */ v(B, { size: "sm", disabled: !l, onClick: () => n(u), children: [
    /* @__PURE__ */ i(fo, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2", a ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        l ? null : /* @__PURE__ */ v(Ar, { variant: "destructive", children: [
          /* @__PURE__ */ i(ao, { className: "cv:size-4" }),
          /* @__PURE__ */ i(Mr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(Or, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            c.slice(0, 3).map((C, N) => /* @__PURE__ */ v("li", { children: [
              C.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: C.path }) : null,
              " ",
              C.message
            ] }, N)),
            c.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(Pf, { spec: s, update: m, toolbar: x, children: k }) })
      ]
    }
  );
}
function Vf({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: r,
  onUndo: a,
  onRedo: o,
  canUndo: s,
  canRedo: c,
  onDiscard: l,
  discardDisabled: u,
  onSave: m,
  saveDisabled: f,
  className: h
}) {
  const y = a || o;
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
          ve,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (p) => t(p.target.value),
            className: "cv:h-8 cv:w-full cv:min-w-0 cv:flex-1 cv:sm:w-auto"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-center cv:gap-1", children: [
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(ro, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(Cr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(oc, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ i(ic, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          y ? /* @__PURE__ */ v(ae, { children: [
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !s,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(cc, {})
              }
            ),
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !c,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ i(sc, {})
              }
            )
          ] }) : null,
          l ? /* @__PURE__ */ v(
            B,
            {
              variant: "ghost",
              size: "sm",
              onClick: l,
              disabled: u,
              className: "cv:text-muted-foreground cv:hover:text-destructive",
              children: [
                /* @__PURE__ */ i(lc, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(B, { size: "sm", onClick: m, disabled: f, children: [
            /* @__PURE__ */ i(fo, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const Ci = "lg", Ni = 12;
function qf(e, t) {
  const n = t[Ci];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const s = o.reduce((c, l) => Math.max(c, l.x + l.w), 0);
    s > a && (r = o, a = s);
  }
  return r ?? e;
}
function Kf(e, t) {
  const n = new Map(e.map((s) => [s.i, s])), r = new Map(t.map((s) => [s.i, s])), a = [], o = (s, c) => {
    const l = {
      i: s.i,
      x: s.x,
      y: s.y,
      w: s.w,
      h: s.h
    };
    (c == null ? void 0 : c.minW) !== void 0 && (l.minW = c.minW), (c == null ? void 0 : c.minH) !== void 0 && (l.minH = c.minH), (c == null ? void 0 : c.static) !== void 0 && (l.static = c.static), a.push(l);
  };
  for (const s of e) {
    const c = r.get(s.i);
    c && o(c, s);
  }
  for (const s of t)
    n.has(s.i) || o(s, void 0);
  return a;
}
const Hf = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Bf(e, t, n, r = Ni) {
  const a = Hf[n], o = Math.min(a.w, r), s = e.reduce((c, l) => Math.max(c, l.y + l.h), 0);
  return {
    i: t,
    x: 0,
    y: s,
    w: o,
    h: a.h,
    minW: Math.min(a.minW, o),
    minH: a.minH
  };
}
function Si(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Ni) {
  const a = Bf(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Wf(e, t, n) {
  const r = e.widgets.find((o) => o.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  return a.id = n, Si(e, a);
}
function Uf(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Gf(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Yf = 12, Qf = 900, Jf = 0.4;
function Xf(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Zf({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: o,
  onLayoutChange: s
}) {
  const [c, l] = Ko(), u = e.grid ?? {}, m = u.cols ?? Yf, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], y = u.containerPadding ?? [0, 0], p = Math.max(Jf, Math.min(1, l / Qf)), g = Math.round(p / 0.05) * 0.05, b = Math.max(8, Math.round(f * g)), k = [
    Math.round(h[0] * g),
    Math.round(h[1] * g)
  ], x = [
    Math.round(y[0] * g),
    Math.round(y[1] * g)
  ], C = w.useMemo(
    () => ({ [Ci]: Xf(e.layout) }),
    [e.layout]
  ), N = w.useMemo(
    () => new Map(e.widgets.map((P) => [P.id, P])),
    [e.widgets]
  ), _ = w.useRef(s);
  w.useEffect(() => {
    _.current = s;
  }, [s]);
  const M = w.useRef(e.layout);
  w.useEffect(() => {
    M.current = e.layout;
  }, [e.layout]);
  const O = w.useRef(null), V = w.useCallback(
    (P, L) => {
      const E = qf(P, L).map((T) => ({ ...T }));
      eh(M.current, E) || _.current(E);
    },
    []
  );
  return /* @__PURE__ */ i(Ir, { spec: e, children: /* @__PURE__ */ i("div", { ref: c, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    po,
    {
      width: l,
      layouts: C,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: b,
      margin: k,
      containerPadding: x,
      dragConfig: { enabled: !0, handle: `.${pn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: V,
      children: e.layout.map((P) => {
        const L = N.get(P.i);
        if (!L) return null;
        const D = L.id === t;
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
              "aria-pressed": D,
              onPointerDown: (E) => {
                O.current = { x: E.clientX, y: E.clientY };
              },
              onClick: (E) => {
                const T = O.current;
                T && Math.hypot(E.clientX - T.x, E.clientY - T.y) > 5 || n(L.id);
              },
              onKeyDown: (E) => {
                (E.key === "Enter" || E.key === " ") && (E.preventDefault(), n(L.id));
              },
              className: S(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                D ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(vr, { widget: L, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(pn, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${L.title ?? L.type}`,
                      onClick: (E) => {
                        E.stopPropagation(), r(L.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(uc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${L.title ?? L.type}`,
                      onClick: (E) => {
                        E.stopPropagation(), a(L.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(mc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${L.title ?? L.type}`,
                      onClick: (E) => {
                        E.stopPropagation(), o(L.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-destructive cv:hover:text-destructive-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Mt, {})
                    }
                  )
                ] })
              ]
            },
            P.i
          )
        );
      })
    }
  ) : null }) });
}
function eh(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const th = w.memo(Zf);
function nh(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function rh({
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
  const a = go({
    extensions: [yo],
    editable: !0,
    content: nh(e.doc),
    onUpdate: ({ editor: o }) => {
      const s = o.getJSON();
      n.current({ ...r.current, doc: s });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(
          Ho,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return a ? /* @__PURE__ */ i(de, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(ah, { editor: a }),
    /* @__PURE__ */ i(bo, { editor: a })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function Qe({ active: e, onClick: t, title: n, children: r }) {
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
function ah({ editor: e }) {
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
          Qe,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(dc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(vc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(fc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(hc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(pc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(gc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(bc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(yc, {})
          }
        )
      ]
    }
  );
}
const oh = Sr(
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
function ih({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: S(oh({ variant: t }), e), ...n });
}
function ch({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: o
}) {
  const { meta: s, isLoading: c } = rt(), l = w.useMemo(() => Tn(s), [s]), u = l.filter((h) => h.type === "cube"), m = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(Le, { value: e, onValueChange: t, disabled: r || c, children: [
    /* @__PURE__ */ i(ze, { id: a, className: o, children: /* @__PURE__ */ i(De, { placeholder: c ? "Loading…" : n, children: f ? /* @__PURE__ */ i(er, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v(Te, { children: [
      m.length > 0 ? /* @__PURE__ */ v(ur, { children: [
        /* @__PURE__ */ i(mr, { children: "Views" }),
        m.map((h) => /* @__PURE__ */ i(be, { value: h.name, children: /* @__PURE__ */ i(er, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(ur, { children: [
        /* @__PURE__ */ i(mr, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(be, { value: h.name, children: /* @__PURE__ */ i(er, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function er({ option: e }) {
  const t = e.type === "view" ? Nr : uo;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(ih, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const sh = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function lh(e) {
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
function uh({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (c) => n({ ...e, control: { ...e.control, control: c } }), o = (c) => n({ ...e, control: { ...e.control, variable: c } }), s = (c) => {
    c !== r.kind && a(lh(c));
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col", children: [
    /* @__PURE__ */ i(
      de,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          Le,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(ze, { children: /* @__PURE__ */ i(De, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Te, { children: t.map((c) => /* @__PURE__ */ i(be, { value: c.name, children: c.label ? `${c.label} (${c.name})` : c.name }, c.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(de, { label: "Control", children: /* @__PURE__ */ v(Le, { value: r.kind, onValueChange: (c) => s(c), children: [
      /* @__PURE__ */ i(ze, { children: /* @__PURE__ */ i(De, {}) }),
      /* @__PURE__ */ i(Te, { children: Kc.options.map((c) => /* @__PURE__ */ i(be, { value: c, children: sh[c] }, c)) })
    ] }) }),
    /* @__PURE__ */ i(mh, { control: r, onChange: a, variables: t })
  ] });
}
function mh({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(dh, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(fh, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(hh, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(ph, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(gh, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(bh, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function dh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ae, { children: [
    /* @__PURE__ */ i(
      de,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          vh,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ i(
      ge,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function vh({
  selected: e,
  onChange: t
}) {
  const [n, r] = w.useState(!1), a = new Set(e.map((c) => c.toLowerCase())), o = (c) => {
    const l = new Set(a);
    l.has(c) ? l.delete(c) : l.add(c), t(un.filter((u) => l.has(u.value)).map((u) => u.value));
  }, s = a.size === 0 ? "Default set" : a.size === un.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(_e, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: s }),
      /* @__PURE__ */ i(tt, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Ae, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: un.map((c) => {
      const l = a.has(c.value);
      return /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          "aria-pressed": l,
          onClick: () => o(c.value),
          className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-foreground cv:hover:bg-accent",
          children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: S(
                  "cv:flex cv:size-4 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:border",
                  l ? "cv:border-primary cv:bg-primary cv:text-primary-foreground" : "cv:border-input"
                ),
                children: l ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
              }
            ),
            c.label
          ]
        },
        c.value
      );
    }) }) })
  ] });
}
function fh({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (c) => {
    const l = new Set(r);
    l.has(c) ? l.delete(c) : l.add(c);
    const u = mt.options.filter((m) => l.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((c) => c.type === "dateRange" || c.type === "time"), s = "__none__";
  return /* @__PURE__ */ v(ae, { children: [
    /* @__PURE__ */ i(
      de,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          Le,
          {
            value: e.rangeVariable ?? s,
            onValueChange: (c) => t({ ...e, rangeVariable: c === s ? void 0 : c }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(ze, { children: /* @__PURE__ */ i(De, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Te, { children: [
                /* @__PURE__ */ i(be, { value: s, children: "None" }),
                o.map((c) => /* @__PURE__ */ i(be, { value: c.name, children: c.label ? `${c.label} (${c.name})` : c.name }, c.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(de, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: mt.options.map((c) => {
      const l = r.has(c);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": l,
          onClick: () => a(c),
          className: "cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize cv:transition-colors" + (l ? "cv:border-primary cv:bg-primary/10 cv:text-foreground" : "cv:border-border cv:text-muted-foreground cv:hover:text-foreground"),
          children: c
        },
        c
      );
    }) }) })
  ] });
}
function hh({
  control: e,
  onChange: t
}) {
  const n = (o, s) => {
    const c = e.options.map(
      (l, u) => u === o ? { value: s.value ?? String(l.value), label: s.label ?? l.label } : l
    );
    t({ ...e, options: c });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (o) => t({ ...e, options: e.options.filter((s, c) => c !== o) });
  return /* @__PURE__ */ v(ae, { children: [
    /* @__PURE__ */ i(
      ge,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (o) => t({ ...e, multiple: o })
      }
    ),
    /* @__PURE__ */ i(
      de,
      {
        label: "Options",
        action: /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ i(Nt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "No options yet." }) : e.options.map((o, s) => /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5", children: [
          /* @__PURE__ */ i(
            ve,
            {
              className: "cv:flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (c) => n(s, { label: c.target.value })
            }
          ),
          /* @__PURE__ */ i(
            ve,
            {
              className: "cv:flex-1",
              placeholder: "Value",
              value: String(o.value),
              onChange: (c) => n(s, { value: c.target.value })
            }
          ),
          /* @__PURE__ */ i(
            B,
            {
              variant: "ghost",
              size: "icon",
              className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground",
              "aria-label": "Remove option",
              onClick: () => a(s),
              children: /* @__PURE__ */ i(Mt, {})
            }
          )
        ] }, s)) })
      }
    )
  ] });
}
function ph({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ae, { children: [
    /* @__PURE__ */ i(de, { label: "From", children: /* @__PURE__ */ v(
      Le,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(ze, { children: /* @__PURE__ */ i(De, {}) }),
          /* @__PURE__ */ v(Te, { children: [
            /* @__PURE__ */ i(be, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(be, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(be, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      de,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ i(
          B,
          {
            variant: "ghost",
            size: "sm",
            className: "cv:h-6 cv:px-1.5 cv:text-xs cv:text-muted-foreground",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ i(
          ch,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function gh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ i(de, { label: "Placeholder", children: /* @__PURE__ */ i(
    ve,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function bh({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ i(de, { label: a, children: /* @__PURE__ */ i(
    ve,
    {
      type: "number",
      value: e[r] ?? "",
      onChange: (o) => {
        const s = o.target.value;
        t({ ...e, [r]: s === "" ? void 0 : Number(s) });
      }
    }
  ) });
  return /* @__PURE__ */ v(ae, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function yh(e) {
  return { schemaVersion: xt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function xh(e) {
  const t = {
    schemaVersion: xt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function wh(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Wa({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", a && "cv:h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      de,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ i(
          ve,
          {
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
      /* @__PURE__ */ i(Ir, { spec: yh(t), children: /* @__PURE__ */ i(nf, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(a && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        jf,
        {
          fill: a,
          spec: xh(e),
          onChange: (s) => n(wh(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(rh, { widget: e, onChange: n }) : /* @__PURE__ */ i(uh, { widget: e, variables: t, onChange: n })
  ] });
}
function kh({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: o,
  regionId: s,
  className: c
}) {
  const l = /* @__PURE__ */ v(ae, { children: [
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
      className: S("cv:flex cv:items-center cv:justify-between cv:gap-2", c),
      children: [
        r ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": a,
            "aria-controls": s,
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
function Ch({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !0,
  defaultOpen: a = !0,
  open: o,
  onOpenChange: s,
  className: c,
  children: l
}) {
  const u = o !== void 0, [m, f] = w.useState(a), h = r ? u ? o : m : !0, y = w.useId(), p = w.useCallback(() => {
    const g = !h;
    u || f(g), s == null || s(g);
  }, [h, u, s]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": h ? "open" : "closed",
      className: S("cv:border-b cv:border-border cv:py-2 cv:last:border-b-0", c),
      children: [
        /* @__PURE__ */ i(
          kh,
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
function Nh(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Sh(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function _h(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Rh(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Ah(e, t) {
  switch (e) {
    case "chart":
      return Sh(t);
    case "text":
      return _h(t);
    case "input":
      return Rh(t);
  }
}
function Mh(e) {
  return { name: e, type: "string" };
}
function Oh(e) {
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
const Ua = {
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
function Lh({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = w.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((m) => m.name === u));
    return u;
  }, o = (u, m) => {
    t(e.map((f, h) => h === u ? Dh(f, m) : f));
  }, s = (u) => t(e.filter((m, f) => f !== u)), c = () => t([...e, Mh(a())]), l = (u, m) => {
    const f = u + m;
    if (f < 0 || f >= e.length) return;
    const h = e.slice();
    [h[u], h[f]] = [h[f], h[u]], t(h);
  };
  return /* @__PURE__ */ i(
    Ch,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: c, children: [
        /* @__PURE__ */ i(Nt, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ v("div", { className: "cv:rounded-md cv:border cv:border-dashed cv:border-border cv:p-4 cv:text-center", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "No variables yet" }),
        /* @__PURE__ */ v("p", { className: "cv:mt-0.5 cv:text-xs cv:text-muted-foreground", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: "cv:mt-3", onClick: c, children: [
          /* @__PURE__ */ i(Nt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, m) => /* @__PURE__ */ i(
        zh,
        {
          decl: u,
          index: m,
          total: e.length,
          duplicate: e.some((f, h) => h !== m && f.name === u.name && u.name !== ""),
          onChange: (f) => o(m, f),
          onRemove: () => s(m),
          onMove: (f) => l(m, f)
        },
        m
      )) })
    }
  );
}
function Dh(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Oh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function zh({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: o,
  onMove: s
}) {
  const [c, l] = w.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0;
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
              "aria-label": c ? "Collapse variable" : "Expand variable",
              "aria-expanded": c,
              onClick: () => l((m) => !m),
              className: "cv:flex cv:size-6 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4",
              children: c ? /* @__PURE__ */ i(tt, {}) : /* @__PURE__ */ i(en, {})
            }
          ),
          /* @__PURE__ */ i(
            ve,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (m) => a({ name: m.target.value }),
              className: "cv:h-7 cv:min-w-0 cv:flex-1 cv:font-mono cv:text-xs"
            }
          ),
          /* @__PURE__ */ i("span", { className: "cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline", children: Ua[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: [
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => s(-1),
                children: /* @__PURE__ */ i(kn, {})
              }
            ),
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => s(1),
                children: /* @__PURE__ */ i(Cn, {})
              }
            ),
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground cv:hover:text-destructive",
                "aria-label": "Remove variable",
                onClick: o,
                children: /* @__PURE__ */ i(Mt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive", children: u }) : null,
        c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5", children: [
          /* @__PURE__ */ i(de, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(Le, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ i(ze, { children: /* @__PURE__ */ i(De, {}) }),
            /* @__PURE__ */ i(Te, { children: Co.options.map((m) => /* @__PURE__ */ i(be, { value: m, children: Ua[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ i(de, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
            ve,
            {
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (m) => a({ label: m.target.value })
            }
          ) }),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (m) => a({ array: m })
            }
          ),
          /* @__PURE__ */ i(Th, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function Th({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ i(
      ge,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (a) => t(a)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(de, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
      ve,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (a) => {
          const o = a.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : Fh(e.default);
  return /* @__PURE__ */ i(de, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    ve,
    {
      value: r,
      placeholder: Eh(e.type),
      onChange: (a) => {
        const o = a.target.value;
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
function Fh(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Eh(e) {
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
function vp({
  spec: e,
  remoteSpec: t,
  onRemoteAdopted: n,
  onChange: r,
  onSave: a,
  newId: o,
  debounceMs: s = 300,
  onUndo: c,
  onRedo: l,
  canUndo: u,
  canRedo: m,
  onDiscard: f,
  families: h,
  className: y
}) {
  var Fe, Ee;
  const [p, g] = w.useState(e);
  w.useEffect(() => g(e), [e]);
  const [b, k] = w.useState(null), x = w.useRef(0), [C, N] = w.useState(null), _ = w.useRef(b), M = w.useRef(C), O = w.useRef(p);
  w.useEffect(() => {
    _.current = b, M.current = C, O.current = p;
  });
  const V = w.useRef(null);
  V.current === null && (V.current = o ?? Nh());
  const P = o ?? V.current, L = ki(
    (q) => r == null ? void 0 : r(q),
    s
  ), D = w.useCallback(
    (q) => {
      x.current = Date.now(), g((G) => {
        const he = q(G);
        return L(he), he;
      });
    },
    [L]
  ), E = w.useRef(t);
  w.useEffect(() => {
    if (!t || t === E.current) return;
    const q = 500;
    let G = null;
    const he = () => {
      var it;
      const gt = Date.now() - x.current;
      if (gt < q) {
        G = setTimeout(he, q - gt);
        return;
      }
      E.current = t;
      const We = /* @__PURE__ */ new Set();
      ((it = M.current) == null ? void 0 : it.kind) === "widget" && We.add(M.current.id), _.current && We.add(_.current);
      const ot = Ih(t, O.current, We);
      g(ot), n == null || n(ot);
    };
    return he(), () => {
      G && clearTimeout(G);
    };
  }, [t]);
  const T = w.useCallback(
    (q) => {
      const G = Ah(q, P());
      D((he) => Si(he, G)), k(G.id), N({ kind: "widget", id: G.id });
    },
    [D, P]
  ), z = w.useCallback((q) => k(q), []), Q = w.useCallback((q) => {
    k(q), N({ kind: "widget", id: q });
  }, []), J = w.useCallback(
    (q) => {
      D((G) => Uf(G, q)), k((G) => G === q ? null : G), N((G) => (G == null ? void 0 : G.kind) === "widget" && G.id === q ? null : G);
    },
    [D]
  ), I = w.useCallback(
    (q) => {
      const G = P();
      D((he) => Wf(he, q, G)), k(G);
    },
    [D, P]
  ), K = w.useCallback(
    (q) => D((G) => Gf(G, q)),
    [D]
  ), te = w.useCallback(
    (q) => D((G) => {
      const he = Kf(G.layout, q);
      return $h(G.layout, he) ? G : { ...G, layout: he };
    }),
    [D]
  ), Y = w.useCallback(
    (q) => D((G) => ({ ...G, name: q || void 0 })),
    [D]
  ), W = w.useCallback(
    (q) => D((G) => ({ ...G, variables: q })),
    [D]
  ), ne = w.useDeferredValue(p), me = w.useMemo(
    () => rr.safeParse(ne),
    [ne]
  ), U = w.useCallback(() => {
    const q = rr.safeParse(p);
    q.success && (a == null || a(q.data));
  }, [p, a]), R = (C == null ? void 0 : C.kind) === "widget" ? p.widgets.find((q) => q.id === C.id) ?? null : null;
  w.useEffect(() => {
    (C == null ? void 0 : C.kind) === "widget" && !p.widgets.some((q) => q.id === C.id) && N(null);
  }, [C, p.widgets]);
  const Z = w.useCallback(() => N(null), []), fe = (C == null ? void 0 : C.kind) === "variables" ? "Dashboard variables" : R ? R.title ?? `${Ph(R.type)} widget` : "";
  return /* @__PURE__ */ i($r, { families: h, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((Ee = (Fe = p.grid) == null ? void 0 : Fe.margin) == null ? void 0 : Ee[0]) ?? 12 },
      className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", y),
      children: [
        /* @__PURE__ */ i(
          Vf,
          {
            name: p.name ?? "",
            onNameChange: Y,
            onAdd: T,
            onEditVariables: () => N({ kind: "variables" }),
            onUndo: c,
            onRedo: l,
            canUndo: u,
            canRedo: m,
            onDiscard: f,
            onSave: a ? U : void 0,
            saveDisabled: !me.success,
            className: "cv:shrink-0"
          }
        ),
        me.success ? null : /* @__PURE__ */ v("p", { className: "cv:shrink-0 cv:text-xs cv:text-destructive", children: [
          me.error.issues.length,
          " validation issue",
          me.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-y-auto cv:pb-4", children: C ? null : /* @__PURE__ */ i(
          th,
          {
            spec: p,
            selectedId: b,
            onSelect: z,
            onEdit: Q,
            onDuplicate: I,
            onDelete: J,
            onLayoutChange: te
          }
        ) }),
        C ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": fe,
            className: "cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background",
            children: [
              /* @__PURE__ */ v("header", { className: "cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5", children: [
                /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                  /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", onClick: Z, children: [
                    /* @__PURE__ */ i(kr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: fe })
                ] }),
                R ? /* @__PURE__ */ v(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => J(R.id),
                    children: [
                      /* @__PURE__ */ i(Mt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: C.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(Lh, { variables: p.variables, onChange: W }) }) : (R == null ? void 0 : R.type) === "chart" ? /* @__PURE__ */ i(
                Wa,
                {
                  fill: !0,
                  widget: R,
                  variables: p.variables,
                  onChange: K,
                  onVariablesChange: W
                }
              ) : R ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                Wa,
                {
                  widget: R,
                  variables: p.variables,
                  onChange: K,
                  onVariablesChange: W
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  ) });
}
function Ph(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function $h(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function Ih(e, t, n) {
  const r = new Map(t.widgets.map((u) => [u.id, u])), a = new Set(e.widgets.map((u) => u.id)), o = e.widgets.map(
    (u) => n.has(u.id) && r.has(u.id) ? r.get(u.id) : u
  );
  for (const u of t.widgets)
    !a.has(u.id) && n.has(u.id) && o.push(u);
  const s = new Map(t.layout.map((u) => [u.i, u])), c = new Set(e.layout.map((u) => u.i)), l = e.layout.map(
    (u) => n.has(u.i) && s.has(u.i) ? s.get(u.i) : u
  );
  for (const u of t.layout)
    !c.has(u.i) && n.has(u.i) && l.push(u);
  return { ...e, widgets: o, layout: l };
}
export {
  Ps as AreaChartFamily,
  xs as AreaFamilyOptionsSchema,
  jc as AxesOptionsSchema,
  Kn as AxisOptionsSchema,
  np as BUILTIN_CHART_FAMILIES,
  Ge as BUILTIN_DEFAULTS,
  Ue as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Fs as BarChartFamily,
  bs as BarFamilyOptionsSchema,
  Ci as CANONICAL_BREAKPOINT,
  et as ChartColorTokenSchema,
  Pf as ChartEditOverlay,
  jf as ChartEditor,
  Fc as ChartFamilySchema,
  ko as ChartOptionsSchema,
  Ol as ChartRenderer,
  So as ChartSpecSchema,
  dp as ChartView,
  Bc as ChartWidgetSchema,
  Vc as ColorAssignmentSchema,
  ll as ComboChartFamily,
  As as ComboFamilyOptionsSchema,
  Rs as ComboSeriesOptSchema,
  Ss as CondFormatRuleSchema,
  Vr as CubeChart,
  Wm as CubeChartSpec,
  wo as CubeQuerySchema,
  On as CubeVizContext,
  lp as CubeVizProvider,
  ye as DEFAULT_COLOR_RAMP,
  Ni as DEFAULT_COLS,
  lr as DEFAULT_UNIT_CONVERSIONS,
  pn as DRAG_HANDLE_CLASS,
  mp as Dashboard,
  vp as DashboardEditor,
  Ir as DashboardProvider,
  rr as DashboardSpecSchema,
  tr as DateRangeSchema,
  Ms as EMPTY_FAMILY_DEFAULT,
  fa as EM_DASH,
  th as EditorCanvas,
  Vf as EditorToolbar,
  $r as FamilyRegistryOverride,
  cf as FilterBuilder,
  Lc as FilterOperatorSchema,
  Ec as FormatKindSchema,
  Nn as FormatOptionsSchema,
  os as GRANULARITY_PATTERN,
  mt as GranularitySchema,
  Qc as GridConfigSchema,
  Kc as InputControlKindSchema,
  Hc as InputControlSchema,
  uh as InputWidgetEditor,
  Uc as InputWidgetSchema,
  fd as InputWidgetView,
  Hs as KpiFamily,
  Cs as KpiFamilyOptionsSchema,
  Yc as LayoutItemSchema,
  Dc as LeafFilterSchema,
  $c as LegendOptionsSchema,
  Es as LineChartFamily,
  ys as LineFamilyOptionsSchema,
  re as MemberSchema,
  ma as OrderDirSchema,
  Tc as OrderSpecSchema,
  $s as PieChartFamily,
  ws as PieFamilyOptionsSchema,
  nr as QueryFilterSchema,
  tn as ReferenceLineOptSchema,
  vr as RenderWidget,
  xt as SCHEMA_VERSION,
  Oc as ScalarSchema,
  js as ScatterChartFamily,
  ks as ScatterFamilyOptionsSchema,
  Pc as SeriesMappingSchema,
  da as SeriesMetaSchema,
  _o as SpecSchema,
  Ns as TableColumnOptSchema,
  el as TableFamily,
  _s as TableFamilyOptionsSchema,
  rh as TextWidgetEditor,
  Wc as TextWidgetSchema,
  Gm as TextWidgetView,
  zc as TimeDimensionSchema,
  qc as TipTapDocSchema,
  Ic as TooltipOptionsSchema,
  vn as VarRefSchema,
  Jc as VariableDeclSchema,
  Co as VariableTypeSchema,
  xo as VariableValueSchema,
  Lh as VariablesPanel,
  Qo as WidgetChrome,
  Wa as WidgetEditPanel,
  Gc as WidgetSpecSchema,
  Si as appendWidget,
  kl as areaChartFamily,
  ba as assignColors,
  Am as axisKey,
  xl as barChartFamily,
  Pr as buildFamilyRegistry,
  sp as builtinCharts,
  Be as builtinFamilyDescriptors,
  _n as builtinFamilyRegistry,
  Rl as comboChartFamily,
  es as createCubeClient,
  Nh as createIdFactory,
  Ul as createQueryResolver,
  Vo as createUnitsFormatter,
  Gl as createVariableStore,
  ss as datePattern,
  ar as deepMerge,
  Er as defaultChartFamilies,
  Oh as defaultForType,
  Lr as defaultFormatter,
  ts as fetchMeta,
  ip as formatCategory,
  Ht as formatDateValue,
  St as isEmptyValue,
  Oe as isVarRef,
  Sl as kpiChartFamily,
  wl as lineChartFamily,
  Zc as loadSpec,
  Ro as looksLikeIsoDate,
  Mo as makeChartFormat,
  op as makeDateFormatter,
  cp as makeFormatter,
  Kf as mergeLayout,
  Mn as mergeUnitConversions,
  Sh as newChartWidget,
  Rh as newInputWidget,
  _h as newTextWidget,
  Mh as newVariable,
  Ah as newWidget,
  Pl as normalize,
  qf as pickCanonicalLayout,
  Cl as pieChartFamily,
  Bf as placeNewItem,
  Om as quantityLabel,
  Uf as removeWidget,
  Gf as replaceWidget,
  Fm as resolveChart,
  Ml as resolveOptions,
  Os as resolveOptionsWith,
  jo as resolveQuery,
  cr as resolveSeriesColors,
  Kl as resolveValue,
  rp as safeLoadSpec,
  Nl as scatterChartFamily,
  _l as tableChartFamily,
  cs as toDate,
  Dl as toResultAnnotation,
  $f as useChartEditorState,
  Ko as useContainerWidth,
  rt as useCubeMeta,
  Pm as useCubeQuery,
  Ve as useCubeVizContext,
  qo as useDashboard,
  ki as useDebouncedCallback,
  pt as useFamilyRegistry,
  up as useFormatter,
  Yn as useNormalizedSeries,
  jr as useOptionalDashboard,
  ap as validateSpec
};
//# sourceMappingURL=index.js.map
