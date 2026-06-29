import { jsx as i, jsxs as v, Fragment as re } from "react/jsx-runtime";
import * as yr from "recharts";
import { BarChart as Ai, CartesianGrid as Jt, YAxis as Be, XAxis as Ct, Bar as Ga, LabelList as Ya, ReferenceLine as Xt, LineChart as Mi, Line as Qa, AreaChart as Ja, Area as xr, PieChart as Oi, Pie as Li, Cell as Xa, Label as Di, ScatterChart as zi, ZAxis as Ti, Scatter as Fi, RadialBarChart as Ei, PolarAngleAxis as Pi, RadialBar as $i, ResponsiveContainer as Ii, ComposedChart as ji } from "recharts";
import * as x from "react";
import { useId as Za, useMemo as ee, createContext as eo, useContext as wr, useState as Nt, useCallback as Ze, useEffect as Zt, useRef as dt, createElement as Vi, useSyncExternalStore as to } from "react";
import { clsx as qi } from "clsx";
import { extendTailwindMerge as Ki } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as no, ArrowUp as kn, ArrowDown as Cn, CalendarRange as ro, ChevronsUpDown as Hi, AreaChart as Bi, BarChart3 as ao, BarChart4 as Wi, Table as Ui, Gauge as Gi, ScatterChart as Yi, PieChart as Qi, LineChart as Ji, AlertCircle as oo, ChevronLeft as kr, ChevronRight as en, ChevronDown as nt, Check as $e, ChevronUp as Xi, CalendarIcon as io, MoreVertical as Zi, RefreshCw as ec, Image as tc, Sheet as nc, Type as Cr, Hash as co, Calendar as so, Search as rc, Table2 as lo, Database as uo, Layers as Nr, Variable as ac, Plus as St, Trash2 as Ot, ListFilter as oc, Box as mo, EyeOff as vo, Eye as fo, X as ua, Save as ho, SlidersHorizontal as ic, Braces as cc, Undo2 as sc, Redo2 as lc, RotateCcw as uc, Pencil as dc, Copy as mc, Bold as vc, Italic as fc, Strikethrough as hc, Heading1 as pc, Heading2 as gc, List as bc, ListOrdered as yc, Quote as xc } from "lucide-react";
import * as dn from "@radix-ui/react-popover";
import { cva as Sr } from "class-variance-authority";
import * as we from "@radix-ui/react-select";
import wc from "@cubejs-client/core";
import { format as ge, isValid as jt, parseISO as mn, differenceInCalendarDays as kc, subDays as Le, startOfMonth as Pn, subMonths as $n, startOfQuarter as In, subQuarters as jn, startOfYear as Vn, subYears as qn, subWeeks as Cc, startOfWeek as Nc, endOfWeek as Sc, endOfMonth as _c, endOfQuarter as Rc, endOfYear as Ac, parse as po } from "date-fns";
import { DayPicker as Mc, useDayPicker as Oc } from "react-day-picker";
import { ResponsiveGridLayout as go } from "react-grid-layout";
import { useEditor as bo, EditorContent as yo } from "@tiptap/react";
import xo from "@tiptap/starter-kit";
const wt = 1, vn = m.object({ var: m.string().min(1) }).strict();
function De(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const fn = (e) => m.union([e, vn]), Lc = m.union([m.string(), m.number(), m.boolean()]), vt = m.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), tr = m.union([m.tuple([m.string(), m.string()]), m.string()]), wo = m.union([
  m.string(),
  m.number(),
  m.boolean(),
  m.tuple([m.string(), m.string()]),
  // absolute date range
  m.array(m.string()),
  m.array(m.number())
]), ne = m.string().min(1), Dc = m.enum([
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
]), zc = m.object({
  member: ne,
  operator: Dc,
  values: m.array(m.union([Lc, vn])).optional()
}).strict(), nr = m.lazy(
  () => m.union([
    zc,
    m.object({ and: m.array(nr) }).strict(),
    m.object({ or: m.array(nr) }).strict()
  ])
), Tc = m.object({
  dimension: ne,
  granularity: fn(vt).optional(),
  dateRange: fn(tr).optional(),
  compareDateRange: m.array(tr).optional()
}).strict(), da = m.enum(["asc", "desc"]), Fc = m.union([
  m.record(ne, da),
  m.array(m.tuple([ne, da]))
]), ko = m.object({
  measures: m.array(ne).optional(),
  dimensions: m.array(ne).optional(),
  timeDimensions: m.array(Tc).optional(),
  filters: m.array(nr).optional(),
  segments: m.array(ne).optional(),
  order: Fc.optional(),
  limit: fn(m.number()).optional(),
  offset: fn(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), Ec = m.string().min(1), op = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], tt = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Pc = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Nn = m.object({
  kind: Pc.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional()
}).strict(), ma = m.object({
  label: m.string().optional(),
  colorToken: tt.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: Nn.optional()
}).strict(), $c = m.object({
  category: m.object({ member: ne }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(ne),
      meta: m.record(ne, ma).optional()
    }).strict(),
    m.object({
      mode: m.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: ne,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: m.array(ne).optional(),
      pivot: ne,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: m.record(ne, ma).optional()
    }).strict()
  ])
}).strict(), Ic = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), jc = m.object({
  show: m.boolean().optional(),
  indicator: m.enum(["dot", "line", "dashed"]).optional(),
  showTotal: m.boolean().optional()
}).strict(), va = m.union([m.number(), m.literal("auto")]), Kn = m.object({
  label: m.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: m.boolean().optional(),
  hide: m.boolean().optional(),
  scale: m.enum(["linear", "log"]).optional(),
  domain: m.tuple([va, va]).optional(),
  tickFormat: Nn.optional()
}).strict(), Vc = m.object({
  x: Kn.optional(),
  y: Kn.optional(),
  y2: Kn.optional()
}).strict(), qc = m.object({
  byKey: m.record(m.string(), tt).optional(),
  ramp: m.array(tt).optional()
}).strict(), Co = m.object({
  family: Ec,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: $c.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Ic.optional(),
  tooltip: jc.optional(),
  axes: Vc.optional(),
  colors: qc.optional(),
  format: Nn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Kc = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), Hc = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Bc = m.object({
  variable: m.string().min(1),
  control: m.discriminatedUnion("kind", [
    m.object({
      kind: m.literal("dateRange"),
      presets: m.array(m.string()).optional(),
      allowFuture: m.boolean().optional()
    }).strict(),
    m.object({
      kind: m.literal("granularity"),
      options: m.array(vt).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: m.string().optional()
    }).strict(),
    m.object({
      kind: m.literal("select"),
      options: m.array(m.object({ value: wo, label: m.string() }).strict()),
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
}).strict(), _r = {
  id: m.string().min(1),
  title: m.string().optional()
}, Wc = m.object({ ..._r, type: m.literal("chart"), query: ko, chart: Co }).strict(), Uc = m.object({ ..._r, type: m.literal("text"), doc: Kc }).strict(), Gc = m.object({ ..._r, type: m.literal("input"), control: Bc }).strict(), Yc = m.discriminatedUnion("type", [
  Wc,
  Uc,
  Gc
]), Qc = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), Jc = m.object({
  cols: m.number().optional(),
  rowHeight: m.number().optional(),
  margin: m.tuple([m.number(), m.number()]).optional(),
  containerPadding: m.tuple([m.number(), m.number()]).optional()
}).strict(), No = m.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Xc = m.object({
  name: m.string().min(1),
  type: No,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: wo.optional()
}).strict(), So = {
  schemaVersion: m.literal(wt),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, _o = m.object({ ...So, kind: m.literal("chart"), query: ko, chart: Co }).strict(), rr = m.object({
  ...So,
  kind: m.literal("dashboard"),
  variables: m.array(Xc),
  widgets: m.array(Yc),
  layout: m.array(Qc),
  grid: Jc.optional()
}).strict(), Ro = m.discriminatedUnion("kind", [_o, rr]), Zc = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function es(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > wt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${wt} — update the library`
    );
  for (; n < wt; ) {
    const r = Zc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return Ro.parse(t);
}
function ip(e) {
  try {
    return { ok: !0, spec: es(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function cp(e) {
  return Ro.parse(e);
}
function ts(e) {
  return wc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ns(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const rs = Ki({ prefix: "cv" });
function S(...e) {
  return rs(qi(e));
}
function Rr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function as({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const os = Sr(
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
), Ar = x.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: S(os({ variant: t }), e),
    ...n
  }
));
Ar.displayName = "Alert";
const Mr = x.forwardRef(
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
const Or = x.forwardRef(
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
const is = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, cs = "MMM d, yyyy";
function ss(e) {
  if (e instanceof Date) return jt(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return jt(r) ? r : null;
  }
  const t = mn(e);
  if (jt(t)) return t;
  const n = new Date(e);
  return jt(n) ? n : null;
}
function Ao(e) {
  return /^\d{4}-\d{2}/.test(e) ? jt(mn(e)) : !1;
}
function ls(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? is[t] : cs;
}
function Ht(e, t, n) {
  const r = ss(e);
  return r ? ge(r, ls(t, n)) : String(e);
}
function sp(e, t) {
  return (n) => n == null ? "" : Ht(n, e, t);
}
function lp(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ht(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ht(e, t.format, t.granularity) : String(e) : Ao(e) ? Ht(e, t.format, t.granularity) : e;
}
const fa = "—", us = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function ha(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ds(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of us)
    if (n >= r) return ha((e / r).toFixed(t)) + a;
  return ha(e.toFixed(t));
}
function ms(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function vs(e, t) {
  const { format: n, meta: r, locale: a } = t, o = n != null && n.abbreviate ? ds(e, n.decimals ?? 1) : ms(e, n, a), c = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${c ? ` ${c}` : ""}`;
}
function Mo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function fs(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Mo(e.value) ? !0 : typeof e.value == "string" ? Ao(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Lr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? fa : (Mo(t) || typeof t == "string" || typeof t == "number") && fs(e) ? Ht(t, n, r) : typeof t == "number" ? vs(t, e) : String(t);
};
function hs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function up(e, t) {
  return (n, r) => {
    const a = r ? hs(r, t) : void 0;
    return Lr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function ps(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function gs(e) {
  const t = vt.safeParse(e);
  return t.success ? t.data : void 0;
}
function bs(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const o = gs(a.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function Oo(e, t, n, r) {
  const a = bs(e, t);
  return {
    value(o, c, s = "value") {
      const l = c ? ps(c, e) : void 0, u = l == null ? void 0 : l.meta;
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
  label: m.string().optional(),
  colorToken: tt.optional()
}).strict(), Dr = m.boolean().optional(), ys = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(tn).optional(),
  comparePrevious: Dr
}).strict(), zr = m.enum(["linear", "monotone", "step", "natural"]), xs = m.object({
  curve: zr.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(tn).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: Dr
}).strict(), ws = m.object({
  curve: zr.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(tn).optional(),
  comparePrevious: Dr
}).strict(), ks = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), Cs = m.object({
  x: ne,
  y: ne,
  size: ne.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: ne.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(tn).optional()
}).strict(), Ns = m.object({
  display: m.enum(["number", "gauge"]).optional(),
  measure: ne,
  comparison: m.object({
    mode: m.enum(["previousPeriod", "value"]),
    value: m.union([ne, m.number()]).optional(),
    showAsPercent: m.boolean().optional(),
    goodDirection: m.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: m.object({
    member: ne.optional(),
    timeDimension: ne.optional(),
    granularity: m.union([vt, vn]).optional(),
    dateRange: m.union([tr, vn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: m.enum(["up", "down"]).optional(),
  gauge: m.object({
    min: m.number().optional(),
    max: m.number(),
    thresholds: m.array(m.object({ at: m.number(), colorToken: tt }).strict()).optional()
  }).strict().optional(),
  icon: m.string().optional()
}).strict(), Ss = m.object({
  member: ne,
  label: m.string().optional(),
  format: Nn.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), _s = m.object({
  member: ne,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: tt.optional()
}).strict(), Rs = m.object({
  columns: m.array(Ss).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(_s).optional()
}).strict(), As = m.object({
  member: ne,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: tt.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), Ms = m.object({
  series: m.array(As),
  referenceLines: m.array(tn).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: zr.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), Ge = {
  bar: ys,
  line: xs,
  area: ws,
  pie: ks,
  scatter: Cs,
  kpi: Ns,
  table: Rs,
  combo: Ms
}, Ye = {
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
const Os = { envelope: {}, familyOptions: {} };
function Ls(e, t) {
  return {
    ...ar({ ...t.envelope }, e),
    familyOptions: ar(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Ds = { light: "", dark: ".dark" }, Lo = x.createContext(null);
function Do() {
  const e = x.useContext(Lo);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const rt = x.forwardRef(({ id: e, className: t, children: n, config: r, ...a }, o) => {
  const c = x.useId(), s = `chart-${e || c.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Lo.Provider, { value: { config: r }, children: /* @__PURE__ */ v(
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
        /* @__PURE__ */ i(zs, { id: s, config: r }),
        /* @__PURE__ */ i(yr.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
rt.displayName = "ChartContainer";
const zs = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, r]) => r.theme || r.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Ds).map(
          ([r, a]) => `
${a} [data-chart=${e}] {
${n.map(([o, c]) => {
            var l;
            const s = ((l = c.theme) == null ? void 0 : l[r]) || c.color;
            return s ? `  ${Rr(o)}: ${s};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, Lt = yr.Tooltip, pt = x.forwardRef(
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
    const { config: g } = Do(), b = x.useMemo(() => {
      var M;
      if (a || !(t != null && t.length))
        return null;
      const [w] = t, N = `${y || (w == null ? void 0 : w.dataKey) || (w == null ? void 0 : w.name) || "value"}`, _ = or(g, w, N), C = !y && typeof c == "string" ? ((M = g[c]) == null ? void 0 : M.label) || c : _ == null ? void 0 : _.label;
      return s ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: s(C, t) }) : C ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: C }) : null;
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
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((w, N) => {
            var L;
            const _ = `${h || w.name || w.dataKey || "value"}`, C = or(g, w, _), M = f || ((L = w.payload) == null ? void 0 : L.fill) || w.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  r === "dot" && "cv:items-center"
                ),
                children: u && (w == null ? void 0 : w.value) !== void 0 && w.name ? u(w.value, w.name, w, N, w.payload) : /* @__PURE__ */ v(re, { children: [
                  C != null && C.icon ? /* @__PURE__ */ i(C.icon, {}) : !o && /* @__PURE__ */ i(
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
                          /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: (C == null ? void 0 : C.label) || w.name })
                        ] }),
                        w.value !== void 0 && /* @__PURE__ */ i("span", { className: "cv:font-mono cv:font-medium cv:tabular-nums cv:text-foreground", children: d ? d(w.value, w) : typeof w.value == "number" ? w.value.toLocaleString() : String(w.value) })
                      ]
                    }
                  )
                ] })
              },
              w.dataKey ? String(w.dataKey) : N
            );
          }) })
        ]
      }
    );
  }
);
pt.displayName = "ChartTooltipContent";
const Dt = yr.Legend, gt = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: r = "bottom", nameKey: a }, o) => {
    const { config: c } = Do();
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
          const l = `${a || s.dataKey || "value"}`, u = or(c, s, l);
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
gt.displayName = "ChartLegendContent";
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
function zt(e) {
  return e === "top" ? "top" : "bottom";
}
function Tt(e) {
  return "horizontal";
}
function Ft(e) {
  return "center";
}
function _e(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function Ie(e) {
  return e == null ? void 0 : e.domain;
}
function je(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Ts(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Bt(e) {
  return `var(${Rr(e.key)})`;
}
function Fs(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function zo(e) {
  return e === "stacked" || e === "percent";
}
function Sn(e, t) {
  var s, l, u, d, f, h, y, p, g, b, k, w, N, _;
  const n = e.raw.annotation, r = (C) => {
    var M, L, V, P, D, E;
    if (C)
      return ((M = n == null ? void 0 : n.measures[C]) == null ? void 0 : M.shortTitle) ?? ((L = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : L.shortTitle) ?? ((V = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : V.shortTitle) ?? ((P = n == null ? void 0 : n.measures[C]) == null ? void 0 : P.title) ?? ((D = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : D.title) ?? ((E = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : E.title) ?? C;
  }, a = e.series.find((C) => {
    var M;
    return (((M = C.meta) == null ? void 0 : M.axis) ?? "left") !== "right";
  }), o = e.series.find((C) => {
    var M;
    return ((M = C.meta) == null ? void 0 : M.axis) === "right";
  }), c = (C) => {
    var M;
    return C ? (M = C.meta) != null && M.measure ? r(C.meta.measure) : C.label : void 0;
  };
  return {
    x: (l = (s = t.axes) == null ? void 0 : s.x) != null && l.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? r((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (p = (y = t.axes) == null ? void 0 : y.y) != null && p.labelHide ? void 0 : ((b = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : b.label) ?? c(a),
    right: (w = (k = t.axes) == null ? void 0 : k.y2) != null && w.labelHide ? void 0 : ((_ = (N = t.axes) == null ? void 0 : N.y2) == null ? void 0 : _.label) ?? c(o)
  };
}
function Xe(e) {
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
    const o = a == null ? void 0 : a.dataKey, c = typeof o == "string" || typeof o == "number" ? String(o) : void 0, s = (c ? n == null ? void 0 : n.get(c) : void 0) ?? t ?? c;
    return e.value(r, s, "tooltip");
  };
}
function hn(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function Es({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var P, D, E, F, O, z, Q, J, I, q, te, U, G, ae, me, K;
  const o = t.familyOptions ?? {}, c = t.orientation === "horizontal", s = zo(t.stackMode), l = t.stackMode === "percent", u = Tr(e), d = (R, Z, he = "value") => l ? hn(R) : r.value(R, Z, he), f = (R) => r.category(R), h = Fr(e), y = Xe(e.series[0]), p = c ? (D = (P = t.axes) == null ? void 0 : P.y) == null ? void 0 : D.hide : (F = (E = t.axes) == null ? void 0 : E.x) == null ? void 0 : F.hide, g = c ? (O = t.axes) == null ? void 0 : O.x : (z = t.axes) == null ? void 0 : z.y, b = !c && e.series.some((R) => {
    var Z;
    return ((Z = R.meta) == null ? void 0 : Z.axis) === "right";
  }), k = Xe(e.series.find((R) => {
    var Z;
    return ((Z = R.meta) == null ? void 0 : Z.axis) !== "right";
  })) ?? y, w = Xe(e.series.find((R) => {
    var Z;
    return ((Z = R.meta) == null ? void 0 : Z.axis) === "right";
  })), N = Sn(e, t), _ = N.x ? { value: N.x, position: "insideBottom", offset: -2 } : void 0, C = N.x ? { value: N.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, M = N.left ? { value: N.left, position: "insideBottom", offset: -2 } : void 0, L = N.left ? { value: N.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, V = N.right ? { value: N.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(rt, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    Ai,
    {
      accessibilityLayer: !0,
      data: u,
      layout: c ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Jt, { vertical: c, horizontal: !c }),
        c ? /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            Be,
            {
              type: "category",
              dataKey: "__cat",
              hide: p,
              tickFormatter: f,
              label: C
            }
          ),
          /* @__PURE__ */ i(
            Ct,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: je(g),
              domain: Ie(g),
              tickFormatter: (R) => d(R, y, "axis"),
              label: M
            }
          )
        ] }) : /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            Ct,
            {
              type: "category",
              dataKey: "__cat",
              hide: p,
              tickFormatter: f,
              label: _
            }
          ),
          /* @__PURE__ */ i(
            Be,
            {
              yAxisId: "left",
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: je(g),
              domain: Ie(g),
              tickFormatter: (R) => d(R, k, "axis"),
              label: L
            }
          ),
          b && /* @__PURE__ */ i(
            Be,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (J = (Q = t.axes) == null ? void 0 : Q.y2) == null ? void 0 : J.hide,
              scale: je((I = t.axes) == null ? void 0 : I.y2),
              domain: Ie((q = t.axes) == null ? void 0 : q.y2),
              tickFormatter: (R) => d(R, w, "axis"),
              label: V
            }
          )
        ] }),
        ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
          Lt,
          {
            content: /* @__PURE__ */ i(
              pt,
              {
                labelFormatter: (R) => r.category(R),
                indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
                valueFormatter: l ? (R) => hn(R) : nn(r, void 0, h)
              }
            )
          }
        ),
        _e(t).show && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(gt, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: zt((G = t.legend) == null ? void 0 : G.position),
            layout: Tt((ae = t.legend) == null ? void 0 : ae.position),
            align: Ft((me = t.legend) == null ? void 0 : me.position)
          }
        ),
        e.series.map((R) => {
          var Z, he, ve, Ke;
          return /* @__PURE__ */ i(
            Ga,
            {
              yAxisId: c ? void 0 : ((Z = R.meta) == null ? void 0 : Z.axis) === "right" && b ? "right" : "left",
              dataKey: R.key,
              name: R.label,
              stackId: s ? (he = R.meta) != null && he.companion ? "__prev" : ((ve = R.meta) == null ? void 0 : ve.stackId) ?? "stack" : void 0,
              fill: Bt(R),
              fillOpacity: (Ke = R.meta) != null && Ke.companion ? 0.4 : void 0,
              radius: Ts(o.barRadius, c),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                Ya,
                {
                  dataKey: R.key,
                  position: c ? "right" : "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (Se) => d(typeof Se == "boolean" ? Number(Se) : Se, Xe(R), "label")
                }
              )
            },
            R.key
          );
        }),
        (K = o.referenceLines) == null ? void 0 : K.map((R, Z) => /* @__PURE__ */ i(
          Xt,
          {
            yAxisId: c ? void 0 : "left",
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
function Ps({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var k, w, N, _, C, M, L, V, P, D, E, F, O, z, Q, J;
  const o = t.familyOptions ?? {}, c = o.chrome === "none", s = Tr(e), l = (I) => r.category(I), u = e.series.some((I) => {
    var q;
    return ((q = I.meta) == null ? void 0 : q.axis) === "right";
  }), d = o.curve ?? "monotone", f = Fr(e), h = Xe(e.series.find((I) => {
    var q;
    return ((q = I.meta) == null ? void 0 : q.axis) !== "right";
  })), y = Xe(e.series.find((I) => {
    var q;
    return ((q = I.meta) == null ? void 0 : q.axis) === "right";
  })), p = Sn(e, t), g = !c && o.dots === !0, b = !c;
  return /* @__PURE__ */ i(
    rt,
    {
      config: n,
      className: c ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(Mi, { accessibilityLayer: !0, data: s, margin: c ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !c && /* @__PURE__ */ i(Jt, { vertical: !1 }),
        /* @__PURE__ */ i(
          Ct,
          {
            type: "category",
            dataKey: "__cat",
            hide: c || ((w = (k = t.axes) == null ? void 0 : k.x) == null ? void 0 : w.hide),
            tickFormatter: l,
            label: !c && p.x ? { value: p.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Be,
          {
            yAxisId: "left",
            type: "number",
            hide: c || ((_ = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : _.hide),
            scale: je((C = t.axes) == null ? void 0 : C.y),
            domain: Ie((M = t.axes) == null ? void 0 : M.y),
            tickFormatter: (I) => r.value(I, h, "axis"),
            label: !c && p.left ? { value: p.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Be,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: c || ((V = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : V.hide),
            scale: je((P = t.axes) == null ? void 0 : P.y2),
            domain: Ie((D = t.axes) == null ? void 0 : D.y2),
            tickFormatter: (I) => r.value(I, y, "axis"),
            label: !c && p.right ? { value: p.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !c && ((E = t.tooltip) == null ? void 0 : E.show) !== !1 && /* @__PURE__ */ i(
          Lt,
          {
            content: /* @__PURE__ */ i(
              pt,
              {
                labelFormatter: (I) => r.category(I),
                indicator: ((F = t.tooltip) == null ? void 0 : F.indicator) ?? "line",
                valueFormatter: nn(r, void 0, f)
              }
            )
          }
        ),
        !c && _e(t).show && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(gt, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: zt((O = t.legend) == null ? void 0 : O.position),
            layout: Tt((z = t.legend) == null ? void 0 : z.position),
            align: Ft((Q = t.legend) == null ? void 0 : Q.position)
          }
        ),
        e.series.map((I) => {
          var q, te, U, G, ae, me;
          return /* @__PURE__ */ i(
            Qa,
            {
              yAxisId: u && ((q = I.meta) == null ? void 0 : q.axis) === "right" ? "right" : "left",
              type: ((te = I.meta) == null ? void 0 : te.curve) ?? d,
              dataKey: I.key,
              name: I.label,
              stroke: Bt(I),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (U = I.meta) != null && U.companion ? "5 4" : void 0,
              strokeOpacity: (G = I.meta) != null && G.companion ? 0.55 : void 0,
              dot: c || (ae = I.meta) != null && ae.companion ? !1 : ((me = I.meta) == null ? void 0 : me.dots) ?? g,
              activeDot: b,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !c,
              children: !c && o.showValueLabels && /* @__PURE__ */ i(
                Ya,
                {
                  dataKey: I.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (K) => r.value(typeof K == "boolean" ? Number(K) : K, Xe(I), "label")
                }
              )
            },
            I.key
          );
        }),
        !c && ((J = o.referenceLines) == null ? void 0 : J.map((I, q) => /* @__PURE__ */ i(
          Xt,
          {
            yAxisId: "left",
            ...I.axis === "y" ? { y: I.value } : { x: I.value },
            label: I.label,
            stroke: `var(--${I.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          q
        )))
      ] })
    }
  );
}
function $s({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var b, k, w, N, _, C, M, L, V, P, D, E, F, O;
  const o = t.familyOptions ?? {}, c = ((k = (b = t.mapping) == null ? void 0 : b.series) == null ? void 0 : k.mode) === "pivot", s = t.stackMode ?? (c ? "stacked" : "none"), l = zo(s), u = s === "percent", d = Tr(e), f = (z) => r.category(z), h = o.curve ?? "monotone", y = Fr(e), p = Xe(e.series[0]), g = Sn(e, t);
  return /* @__PURE__ */ i(rt, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ja, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Jt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((z) => /* @__PURE__ */ v("linearGradient", { id: `fill-${z.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Bt(z), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Bt(z), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, z.key)) }),
    /* @__PURE__ */ i(
      Ct,
      {
        type: "category",
        dataKey: "__cat",
        hide: (N = (w = t.axes) == null ? void 0 : w.x) == null ? void 0 : N.hide,
        tickFormatter: f,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Be,
      {
        type: "number",
        hide: (C = (_ = t.axes) == null ? void 0 : _.y) == null ? void 0 : C.hide,
        scale: je((M = t.axes) == null ? void 0 : M.y),
        domain: Ie((L = t.axes) == null ? void 0 : L.y),
        tickFormatter: (z) => u ? hn(z) : r.value(z, p, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((V = t.tooltip) == null ? void 0 : V.show) !== !1 && /* @__PURE__ */ i(
      Lt,
      {
        content: /* @__PURE__ */ i(
          pt,
          {
            labelFormatter: (z) => r.category(z),
            indicator: ((P = t.tooltip) == null ? void 0 : P.indicator) ?? "dot",
            valueFormatter: u ? (z) => hn(z) : nn(r, void 0, y)
          }
        )
      }
    ),
    _e(t).show && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(gt, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: zt((D = t.legend) == null ? void 0 : D.position),
        layout: Tt((E = t.legend) == null ? void 0 : E.position),
        align: Ft((F = t.legend) == null ? void 0 : F.position)
      }
    ),
    e.series.map((z) => {
      var Q, J, I, q, te, U, G, ae;
      return /* @__PURE__ */ i(
        xr,
        {
          type: ((Q = z.meta) == null ? void 0 : Q.curve) ?? h,
          dataKey: z.key,
          name: z.label,
          stackId: l && !((J = z.meta) != null && J.companion) ? ((I = z.meta) == null ? void 0 : I.stackId) ?? "stack" : void 0,
          stroke: Bt(z),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (q = z.meta) != null && q.companion ? "5 4" : void 0,
          strokeOpacity: (te = z.meta) != null && te.companion ? 0.55 : void 0,
          fill: (U = z.meta) != null && U.companion ? "none" : `url(#fill-${z.key})`,
          fillOpacity: 1,
          dot: (G = z.meta) != null && G.companion ? !1 : ((ae = z.meta) == null ? void 0 : ae.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        z.key
      );
    }),
    (O = o.referenceLines) == null ? void 0 : O.map((z, Q) => /* @__PURE__ */ i(
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
function Is({ data: e, options: t, format: n, editing: r }) {
  var g, b, k, w, N;
  const a = t.familyOptions ?? {}, o = e.series[0], c = e.categories.map((_, C) => {
    const M = n.category(_);
    return {
      key: `slice-${C}`,
      label: M,
      value: (o == null ? void 0 : o.data[C]) ?? 0,
      fill: `var(--${xe[C % xe.length]})`
    };
  }), s = js(c, a.maxSlices), l = s.reduce((_, C) => _ + C.value, 0), u = {};
  s.forEach((_, C) => {
    u[_.key] = {
      label: _.label,
      color: `var(--${xe[C % xe.length]})`
    };
  });
  const d = `${a.innerRadiusPct ?? 0}%`, f = `${a.outerRadiusPct ?? 80}%`, h = (a.innerRadiusPct ?? 0) > 0, y = a.showLabels ?? "percent", p = y === "none" ? !1 : ({ payload: _, percent: C }) => {
    const M = _;
    return y === "name" ? (M == null ? void 0 : M.label) ?? "" : y === "value" ? n.value(M == null ? void 0 : M.value, o == null ? void 0 : o.key, "label") : `${((C !== void 0 ? C : M && l > 0 ? M.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(rt, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(Oi, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      Lt,
      {
        content: /* @__PURE__ */ i(
          pt,
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
      Li,
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
          s.map((_) => /* @__PURE__ */ i(Xa, { fill: _.fill }, _.key)),
          h && a.centerLabel && /* @__PURE__ */ i(
            Di,
            {
              position: "center",
              content: ({ viewBox: _ }) => {
                var V, P;
                if (!_ || !("cx" in _)) return null;
                const { cx: C, cy: M } = _, L = ((V = a.centerLabel) == null ? void 0 : V.value) === void 0 || a.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : a.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: C, y: M, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: C, y: M, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: L }),
                  ((P = a.centerLabel) == null ? void 0 : P.label) && /* @__PURE__ */ i("tspan", { x: C, y: M + 20, className: "cv:fill-muted-foreground cv:text-xs", children: a.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    _e(t).show && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          gt,
          {
            nameKey: "label",
            className: _e(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: zt((k = t.legend) == null ? void 0 : k.position),
        layout: Tt((w = t.legend) == null ? void 0 : w.position),
        align: Ft((N = t.legend) == null ? void 0 : N.position)
      }
    )
  ] }) });
}
function js(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((s, l) => l.value - s.value), r = n.slice(0, t - 1), o = n.slice(t - 1).reduce((s, l) => s + l.value, 0), c = t - 1;
  return [
    ...r,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${xe[c % xe.length]})`
    }
  ];
}
function Vs({ data: e, options: t, format: n, editing: r }) {
  var p, g, b, k, w, N, _, C, M, L, V, P, D, E, F, O, z, Q, J, I, q, te, U, G, ae, me;
  const a = t.familyOptions ?? {}, o = e.raw.annotation, c = e.raw.rows, s = { x: a.x, y: a.y, z: a.size }, l = ((p = o == null ? void 0 : o.measures[a.x]) == null ? void 0 : p.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[a.x]) == null ? void 0 : g.shortTitle) ?? a.x, u = ((b = o == null ? void 0 : o.measures[a.y]) == null ? void 0 : b.shortTitle) ?? ((k = o == null ? void 0 : o.dimensions[a.y]) == null ? void 0 : k.shortTitle) ?? a.y, d = (N = (w = t.axes) == null ? void 0 : w.x) != null && N.labelHide ? void 0 : ((C = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : C.label) ?? l, f = (L = (M = t.axes) == null ? void 0 : M.y) != null && L.labelHide ? void 0 : ((P = (V = t.axes) == null ? void 0 : V.y) == null ? void 0 : P.label) ?? u, h = qs(c, a), y = {};
  return h.forEach((K, R) => {
    y[K.key] = { label: K.label, color: `var(--${xe[R % xe.length]})` };
  }), /* @__PURE__ */ i(rt, { config: y, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(zi, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Jt, {}),
    /* @__PURE__ */ i(
      Ct,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: (E = (D = t.axes) == null ? void 0 : D.x) == null ? void 0 : E.hide,
        scale: je((F = t.axes) == null ? void 0 : F.x),
        domain: Ie((O = t.axes) == null ? void 0 : O.x),
        tickFormatter: (K) => n.value(K, a.x, "axis"),
        label: d ? { value: d, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Be,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (Q = (z = t.axes) == null ? void 0 : z.y) == null ? void 0 : Q.hide,
        scale: je((J = t.axes) == null ? void 0 : J.y),
        domain: Ie((I = t.axes) == null ? void 0 : I.y),
        tickFormatter: (K) => n.value(K, a.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    a.size && /* @__PURE__ */ i(Ti, { type: "number", dataKey: "z", range: a.sizeRange ?? [40, 400], name: a.size }),
    ((q = t.tooltip) == null ? void 0 : q.show) !== !1 && /* @__PURE__ */ i(
      Lt,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          pt,
          {
            indicator: ((te = t.tooltip) == null ? void 0 : te.indicator) ?? "dot",
            valueFormatter: (K, R) => {
              const Z = R == null ? void 0 : R.dataKey, he = typeof Z == "string" ? s[Z] : void 0;
              return n.value(K, he, "tooltip");
            }
          }
        )
      }
    ),
    _e(t).show && h.length > 1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(gt, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: zt((U = t.legend) == null ? void 0 : U.position),
        layout: Tt((G = t.legend) == null ? void 0 : G.position),
        align: Ft((ae = t.legend) == null ? void 0 : ae.position)
      }
    ),
    h.map((K, R) => /* @__PURE__ */ i(
      Fi,
      {
        name: K.label,
        data: K.points,
        shape: a.shape ?? "circle",
        fill: `var(--color-${K.key})`,
        children: h.length === 1 && K.points.map((Z, he) => /* @__PURE__ */ i(Xa, { fill: `var(--${xe[R % xe.length]})` }, he))
      },
      K.key
    )),
    (me = a.referenceLines) == null ? void 0 : me.map((K, R) => /* @__PURE__ */ i(
      Xt,
      {
        ...K.axis === "y" ? { y: K.value } : { x: K.value },
        label: K.label,
        stroke: `var(--${K.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      R
    ))
  ] }) });
}
function qs(e, t) {
  const n = (a) => ({
    x: Hn(a[t.x]),
    y: Hn(a[t.y]),
    ...t.size ? { z: Hn(a[t.size]) } : {}
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
function Hn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Ks(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Hs(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function Bs(e) {
  var l, u, d, f;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, o = (h) => r.value(h, a.measure, "kpi"), c = To(t.raw.rows, a.measure) ?? 0, s = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : f.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ i(Zs, { value: c, label: s, fmt: o, fo: a }) : /* @__PURE__ */ i(Ws, { ...e, value: c, label: s, fo: a, fmt: o });
}
function Ws({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var h;
  const a = n.goodDirection ?? ((h = n.comparison) == null ? void 0 : h.goodDirection) ?? "up", o = tl(e.raw.rows, t, n), c = !!n.comparison, s = c && !o && Us(e.raw.query, n), l = n.sparkline ? e.series[0] : void 0, u = !!l && l.data.some((y) => y !== null), d = o ? o.diff : l ? Js(l) : 0, f = Hs(Ks(d, a));
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
      c && (o ? /* @__PURE__ */ i(Xs, { delta: o, goodDirection: a, fo: n, fmt: r }) : s ? /* @__PURE__ */ i(Gs, {}) : /* @__PURE__ */ i(Ys, {}))
    ] }),
    u && /* @__PURE__ */ i("div", { className: "cv:shrink-0 cv:px-1 cv:pb-1", children: /* @__PURE__ */ i(Qs, { series: l, categories: e.categories, colorClass: f }) })
  ] });
}
function Us(e, t) {
  var r, a, o;
  if (((r = t.comparison) == null ? void 0 : r.mode) !== "previousPeriod") return !1;
  const n = (o = (a = e.timeDimensions) == null ? void 0 : a[0]) == null ? void 0 : o.dateRange;
  return n == null ? !0 : Array.isArray(n) ? n.length < 2 || n.some((c) => !c) : String(n).trim() === "";
}
function Gs() {
  return /* @__PURE__ */ v(
    "span",
    {
      className: "cv:inline-flex cv:max-w-full cv:items-center cv:gap-1 cv:rounded-full cv:bg-amber-500/10 cv:px-2 cv:py-0.5 cv:text-xs cv:font-medium cv:text-amber-600",
      title: "Comparison needs a date range. Open “Time, range & display” on the value and set a Date range so the prior period can be computed.",
      children: [
        /* @__PURE__ */ i(ro, { className: "cv:size-3 cv:shrink-0" }),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: "set a date range to compare" })
      ]
    }
  );
}
function Ys() {
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
function Qs({
  series: e,
  categories: t,
  colorClass: n
}) {
  const r = Za(), a = t.map((o, c) => ({ x: typeof o == "number" ? o : String(o), v: e.data[c] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(Ii, { width: "100%", height: "100%", children: /* @__PURE__ */ v(Ja, { data: a, margin: { top: 3, right: 0, bottom: 0, left: 0 }, children: [
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
function Js(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Xs({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = e.diff > 0, o = e.diff === 0, c = o ? !0 : a === (t === "up"), s = o ? no : a ? kn : Cn, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
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
function Zs({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, f;
  const a = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, o = ((f = r.gauge) == null ? void 0 : f.max) ?? Math.max(e, 1), c = Math.max(a, Math.min(o, e)), s = el(e, r) ?? "chart-1", l = [{ name: t, value: c, fill: `var(--${s})` }], u = { value: { label: t, color: `var(--${s})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(rt, { config: u, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      Ei,
      {
        data: l,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Pi, { type: "number", domain: [a, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i($i, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ v("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-2xl cv:font-bold cv:tabular-nums cv:text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t })
    ] })
  ] });
}
function el(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const o of [...n].sort((c, s) => c.at - s.at))
    e >= o.at && (r = o.colorToken);
  return r;
}
function To(e, t) {
  for (const n of e) {
    const r = Fo(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function tl(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = To(e, r.value));
  else {
    const s = e[1];
    a = s ? Fo(s[n.measure]) : null;
  }
  if (a === null) return null;
  const o = t - a, c = a !== 0 ? o / a : null;
  return { current: t, baseline: a, diff: o, pct: c };
}
function Fo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Eo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
Eo.displayName = "Table";
const Po = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
Po.displayName = "TableHeader";
const $o = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
$o.displayName = "TableBody";
const cn = x.forwardRef(
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
const ir = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
const sn = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
sn.displayName = "TableCell";
const nl = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
nl.displayName = "TableCaption";
const Io = Sr(
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
), B = x.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: r ?? "button",
      className: S(Io({ variant: t, size: n }), e),
      ...a
    }
  )
);
B.displayName = "Button";
function rl({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, o = e.raw.annotation, c = x.useMemo(
    () => al(a, o, r, n),
    [a, o, r, n]
  ), [s, l] = x.useState(null), [u, d] = x.useState(0), f = r.sortable !== !1, h = r.pageSize ?? 25, y = x.useMemo(() => {
    if (!s) return a;
    const N = s.dir === "asc" ? 1 : -1;
    return [...a].sort((_, C) => ll(_[s.member], C[s.member]) * N);
  }, [a, s]), p = Math.max(1, Math.ceil(y.length / h)), g = Math.min(u, p - 1), b = y.slice(g * h, g * h + h), k = (N) => {
    f && (l(
      (_) => (_ == null ? void 0 : _.member) === N ? { member: N, dir: _.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), d(0));
  }, w = r.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", r.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(Eo, { children: [
      /* @__PURE__ */ i(Po, { className: S(r.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(cn, { children: [
        r.showRowNumbers && /* @__PURE__ */ i(ir, { className: "cv:w-10 cv:text-right", children: "#" }),
        c.map((N) => /* @__PURE__ */ i(
          ir,
          {
            className: ga(N.align),
            style: N.width ? { width: N.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              B,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => k(N.member),
                children: [
                  N.label,
                  /* @__PURE__ */ i(sl, { active: (s == null ? void 0 : s.member) === N.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : N.label
          },
          N.member
        ))
      ] }) }),
      /* @__PURE__ */ v($o, { children: [
        b.map((N, _) => /* @__PURE__ */ v(cn, { children: [
          r.showRowNumbers && /* @__PURE__ */ i(sn, { className: S("cv:text-right cv:text-muted-foreground", w && "cv:py-1"), children: g * h + _ + 1 }),
          c.map((C) => {
            const M = ul(C.member, N[C.member], r.conditionalFormat);
            return /* @__PURE__ */ i(
              sn,
              {
                className: S(ga(C.align), w && "cv:py-1"),
                style: M ? { color: M } : void 0,
                children: C.render(N[C.member])
              },
              C.member
            );
          })
        ] }, _)),
        b.length === 0 && /* @__PURE__ */ i(cn, { children: /* @__PURE__ */ i(
          sn,
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
          B,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((N) => Math.max(0, N - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          B,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((N) => Math.min(p - 1, N + 1)),
            disabled: g >= p - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function al(e, t, n, r) {
  var c;
  const a = e.length > 0 ? Object.keys(e[0]) : il(t);
  return ((c = n.columns) != null && c.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const l = s.member, u = t ? cl(t, l) : void 0, d = t ? l in t.measures : !1, f = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = s.align ?? (d ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: s.width,
      render: (y) => ol(y, d, l, r)
    };
  });
}
function ol(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function il(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function cl(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ga(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function sl({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(kn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Cn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Hi, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function ll(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function ul(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && dl(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function dl(e, t, n) {
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
function ml({ data: e, options: t, format: n, editing: r }) {
  var g, b, k, w, N, _, C, M, L, V, P, D, E, F, O, z, Q, J, I, q, te, U, G, ae, me, K;
  const a = t.familyOptions ?? {}, o = a.series ?? [], c = fl(e, o), s = (R) => n.category(R), l = o.some((R) => R.axis === "right"), u = (g = o.find((R) => R.axis !== "right")) == null ? void 0 : g.member, d = (b = o.find((R) => R.axis === "right")) == null ? void 0 : b.member, f = Sn(e, t), h = (w = (k = t.axes) == null ? void 0 : k.y) != null && w.labelHide ? void 0 : ((_ = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : _.label) ?? (u ? ln(e, u) : void 0), y = (M = (C = t.axes) == null ? void 0 : C.y2) != null && M.labelHide ? void 0 : ((V = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : V.label) ?? (d ? ln(e, d) : void 0), p = {};
  return o.forEach((R, Z) => {
    const he = R.colorToken ?? xe[Z % xe.length];
    p[R.member] = {
      label: R.label ?? ln(e, R.member),
      color: `var(--${he})`
    };
  }), /* @__PURE__ */ i(rt, { config: p, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(ji, { accessibilityLayer: !0, data: c, children: [
    /* @__PURE__ */ i(Jt, { vertical: !1 }),
    /* @__PURE__ */ i(
      Ct,
      {
        type: "category",
        dataKey: "__cat",
        hide: (D = (P = t.axes) == null ? void 0 : P.x) == null ? void 0 : D.hide,
        tickFormatter: s,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Be,
      {
        yAxisId: "left",
        type: "number",
        hide: (F = (E = t.axes) == null ? void 0 : E.y) == null ? void 0 : F.hide,
        scale: je((O = t.axes) == null ? void 0 : O.y),
        domain: Ie((z = t.axes) == null ? void 0 : z.y),
        tickFormatter: (R) => n.value(R, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      Be,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (J = (Q = t.axes) == null ? void 0 : Q.y2) == null ? void 0 : J.hide,
        scale: je((I = t.axes) == null ? void 0 : I.y2),
        domain: Ie((q = t.axes) == null ? void 0 : q.y2),
        tickFormatter: (R) => n.value(R, d, "axis"),
        label: y ? { value: y, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
      Lt,
      {
        content: /* @__PURE__ */ i(
          pt,
          {
            labelFormatter: (R) => n.category(R),
            indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
            valueFormatter: nn(n)
          }
        )
      }
    ),
    _e(t).show && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(gt, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: zt((G = t.legend) == null ? void 0 : G.position),
        layout: Tt((ae = t.legend) == null ? void 0 : ae.position),
        align: Ft((me = t.legend) == null ? void 0 : me.position)
      }
    ),
    o.map((R) => vl(R, e, a)),
    (K = a.referenceLines) == null ? void 0 : K.map((R, Z) => /* @__PURE__ */ i(
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
function vl(e, t, n) {
  const r = e.axis === "right" ? "right" : "left", a = `var(${Rr(e.member)})`, o = e.label ?? ln(t, e.member), c = e.curve ?? n.curve ?? "monotone", s = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
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
    Qa,
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
function fl(e, t) {
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
    for (const f of t) d[f.member] = hl(l[f.member]);
    return d;
  });
}
function ln(e, t) {
  var n, r, a, o;
  return ((r = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : r.shortTitle) ?? ((o = (a = e.raw.annotation) == null ? void 0 : a.measures[t]) == null ? void 0 : o.title) ?? t;
}
function hl(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ut = "cv:w-40", pl = "cv:w-56", jo = "a date or category", Bn = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: jo, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0
  }
], gl = [
  { id: "x", label: "Category", hint: jo, cardinality: "one", kinds: ["time", "category"] },
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
], bl = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], yl = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], xl = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], wl = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], kl = ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo"], Qe = (e) => kl.indexOf(e), Ue = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: ao,
    order: Qe("bar"),
    component: Es,
    optionsSchema: Ge.bar,
    defaults: Ye.bar,
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
    sidebarWidthClass: ut
  },
  line: {
    family: "line",
    label: "Line",
    icon: Ji,
    order: Qe("line"),
    component: Ps,
    optionsSchema: Ge.line,
    defaults: Ye.line,
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
    sidebarWidthClass: ut
  },
  area: {
    family: "area",
    label: "Area",
    icon: Bi,
    order: Qe("area"),
    component: $s,
    optionsSchema: Ge.area,
    defaults: Ye.area,
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
    sidebarWidthClass: ut
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: Qi,
    order: Qe("pie"),
    component: Is,
    optionsSchema: Ge.pie,
    defaults: Ye.pie,
    wells: bl,
    zones: { left: ["size"], bottom: ["slices"] },
    dualAxisY: !1,
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ut
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Yi,
    order: Qe("scatter"),
    component: Vs,
    optionsSchema: Ge.scatter,
    defaults: Ye.scatter,
    wells: yl,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: ut
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Gi,
    order: Qe("kpi"),
    component: Bs,
    optionsSchema: Ge.kpi,
    defaults: Ye.kpi,
    wells: xl,
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
    sidebarWidthClass: pl
  },
  table: {
    family: "table",
    label: "Table",
    icon: Ui,
    order: Qe("table"),
    component: rl,
    optionsSchema: Ge.table,
    defaults: Ye.table,
    wells: wl,
    zones: { left: ["columns"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ut
  },
  combo: {
    family: "combo",
    label: "Combo",
    icon: Wi,
    order: Qe("combo"),
    component: ml,
    optionsSchema: Ge.combo,
    defaults: Ye.combo,
    wells: gl,
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
    sidebarWidthClass: ut
  }
}, Cl = Ue.bar, Nl = Ue.line, Sl = Ue.area, _l = Ue.pie, Rl = Ue.scatter, Al = Ue.kpi, Ml = Ue.table, Ol = Ue.combo, Er = [
  Cl,
  Nl,
  Sl,
  _l,
  Rl,
  Al,
  Ml,
  Ol
], Ll = m.any();
function Pr(e, t) {
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
      return ((s = n.get(c)) == null ? void 0 : s.defaults) ?? Os;
    },
    optionsSchema: (c) => {
      var s;
      return ((s = n.get(c)) == null ? void 0 : s.optionsSchema) ?? Ll;
    },
    resolveOptions: (c) => Ls(c, o.defaults(c.family))
  };
  return o;
}
const _n = Pr(Er);
function Dl(e, t = _n) {
  return t.resolveOptions(e);
}
const dp = Object.fromEntries(
  Object.entries(Ue).map(([e, t]) => [e, t.component])
);
function zl({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: o,
  editing: c,
  registry: s = _n
}) {
  const l = ee(() => Dl(t, s), [t, s]);
  if (a != null && a.loading)
    return /* @__PURE__ */ i(as, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (a != null && a.error)
    return /* @__PURE__ */ v(Ar, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(oo, {}),
      /* @__PURE__ */ i(Mr, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(Or, { children: a.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const u = n && Object.keys(n).length > 0 ? n : Fs(e), d = r ?? Oo(e.raw.annotation, l, Lr), f = (o == null ? void 0 : o[l.family]) ?? s.require(l.family).component;
  return /* @__PURE__ */ i(
    f,
    {
      data: e,
      options: l,
      config: u,
      format: d,
      state: a,
      editing: c
    }
  );
}
const xe = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Wn = 8;
function cr(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : xe, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, d) => r[u] ?? d, o = /* @__PURE__ */ new Set();
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
function ba(e, t) {
  const n = cr(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Tl(e) {
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
  for (const n of Object.keys(e)) t[n] = Tl(e[n]);
  return t;
}
function Fl(e) {
  return {
    measures: on(e.measures ?? {}),
    dimensions: on(e.dimensions ?? {}),
    segments: on(e.segments ?? {}),
    timeDimensions: on(e.timeDimensions ?? {})
  };
}
function kt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Rn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let c = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!c || c.kind === void 0 || c.kind === "auto") && (c = { ...c, kind: "currency" }), c && (a.format = c), t != null && t.axis && (a.axis = t.axis), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function El(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Pl(e, t) {
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
function $l(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, o] of t) {
      const c = An(r[a]);
      c !== null && (r[a] = o.to(c));
    }
    return r;
  });
}
function Il(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((o) => o === null ? null : a.to(o)));
    }
}
function jl(e, t, n, r, a = _n) {
  const o = Fl(e.annotation()), c = Pl(o, r), s = $l(e.tablePivot(), c), l = t.mapping;
  if (!l) {
    const f = n.measures ?? [];
    if (a.require(t.family).measureOnly && f.length > 0) {
      const h = s[0] ?? {}, y = [
        {
          key: "value",
          label: "Value",
          data: f.map((g) => An(h[g])),
          meta: { ...Rn(kt(o, f[0]), void 0, t.format), measure: f[0] }
        }
      ];
      return ba(y, t.colors), { categories: f.map(
        (g) => {
          var b, k;
          return ((b = kt(o, g)) == null ? void 0 : b.shortTitle) ?? ((k = kt(o, g)) == null ? void 0 : k.title) ?? g;
        }
      ), series: y, raw: { rows: s, annotation: o, query: n }, empty: s.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: o, query: n },
      empty: s.length === 0
    };
  }
  const u = l.series.mode === "measures" ? ql(e, l.series, t, o) : Kl(e, l.category.member, l.series, t, o), d = Vl(e, l);
  return Il(u, c), ba(u, t.colors), {
    categories: d,
    series: u,
    raw: { rows: s, annotation: o, query: n },
    empty: s.length === 0
  };
}
function Vl(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function ql(e, t, n, r) {
  const { members: a, meta: o } = t, c = e.chartPivot();
  return a.map((s) => {
    const l = kt(r, s), u = o == null ? void 0 : o[s], d = c.map((f) => An(f[s]));
    return {
      key: s,
      label: El(l, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Rn(l, u, n.format), measure: s }
    };
  });
}
function Kl(e, t, n, r, a) {
  const { value: o, values: c, pivot: s } = n, l = c && c.length > 0 ? c : [o], u = new Set(l), d = l.length > 1, f = { x: [t], y: [s, "measures"] }, y = e.seriesNames(f).filter((k) => {
    const w = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : void 0;
    return w === void 0 || u.has(w);
  }), p = e.chartPivot(f), g = kt(a, o), b = y.map((k) => {
    var D, E;
    const w = (D = k.yValues) == null ? void 0 : D[0], N = k.yValues && k.yValues.length >= 2 ? k.yValues[k.yValues.length - 1] : o, _ = kt(a, N), C = (_ == null ? void 0 : _.shortTitle) ?? (_ == null ? void 0 : _.title) ?? N, M = w ?? k.shortTitle ?? k.title ?? k.key, L = d ? `${C} · ${M}` : M, V = p.map((F) => An(F[k.key])), P = (E = n.meta) == null ? void 0 : E[N];
    return {
      key: k.key,
      label: L,
      data: V,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Rn(_ ?? g, P, r.format),
        measure: N
      }
    };
  });
  return Hl(b, g, r.format);
}
function Hl(e, t, n) {
  var d, f, h;
  if (e.length <= Wn) return e;
  const r = (y) => y.data.reduce((p, g) => p + (g ?? 0), 0), a = [...e].sort((y, p) => r(p) - r(y)), o = a.slice(0, Wn - 1), c = a.slice(Wn - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, l = Array.from({ length: s }, (y, p) => {
    let g = 0, b = !1;
    for (const k of c) {
      const w = k.data[p];
      w !== null && (g += w, b = !0);
    }
    return b ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${c.length})`,
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
function _t(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Bl = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Wl(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Gt(e, t, n) {
  var r;
  if (De(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Ul(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const c = Gt(o, t, n);
    if (!_t(c))
      if (Array.isArray(c))
        for (const s of c)
          _t(s) || a.push(s);
      else
        a.push(c);
  }
  return a.length === 0 ? r ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: a };
}
function Gl(e, t, n) {
  if ("and" in e) {
    const r = sr(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = sr(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Ul(e, t, n);
}
function sr(e, t, n) {
  const r = [];
  for (const a of e) {
    const o = Gl(a, t, n);
    o !== void 0 && r.push(o);
  }
  return r;
}
function Yl(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Gt(e.granularity, t, n);
    _t(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Gt(e.dateRange, t, n);
    _t(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function Vo(e, t, n) {
  const r = Bl(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((o) => Yl(o, r, t))), e.filters !== void 0) {
    const o = sr(e.filters, r, t);
    o.length > 0 && (a.filters = o);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Gt(e.limit, r, t);
    _t(o) || (a.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Gt(e.offset, r, t);
    _t(o) || (a.offset = o);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function Ql() {
  let e, t;
  return (n, r, a) => {
    const o = Vo(n, r, a), c = JSON.stringify(o);
    return e !== void 0 && c === t ? e : (e = o, t = c, o);
  };
}
function Jl(e, t) {
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
class Xl extends Error {
}
const Zl = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Xl(`"${e}" cannot be parsed into a number`);
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
class eu extends Error {
}
class xa extends Error {
}
class tu extends Error {
}
class Un extends Error {
}
class nu extends Error {
}
class ru {
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
      throw new tu(`Cannot convert incompatible measures of ${a.measure} and ${o.measure}`);
    let c = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (c = this.cls.sub(c, this.convertFraction(o.unit.anchor_shift))), o.system != a.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Un(`Unable to convert units. Anchors are missing for "${o.measure}" and "${a.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Un(`Unable to find anchor for "${o.measure}" to "${a.measure}". Please make sure it is defined.`);
      const d = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        c = d(c, this.cls);
      else if (typeof f == "number")
        c = this.cls.mul(c, f);
      else if (ya(f))
        c = this.cls.mul(c, this.convertFraction(f));
      else
        throw new Un("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new xa(".toBest must be called after .from");
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
        throw new nu(`Meausure "${t}" not found.`);
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
    throw new eu(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function au(e) {
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
function ou(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = au(e);
  return (r) => new ru({
    measures: e,
    unitCache: n,
    cls: Zl
  }, r);
}
const iu = {
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
}, cu = {
  systems: {
    metric: iu
  }
}, su = {
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
}, lu = {
  systems: {
    SI: su
  }
}, uu = {
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
}, du = {
  systems: {
    SI: uu
  }
}, mu = {
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
}, vu = {
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
}, fu = {
  systems: {
    metric: mu,
    imperial: vu
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
}, hu = {
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
}, pu = {
  systems: {
    SI: hu
  }
}, gu = {
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
}, bu = {
  systems: {
    SI: gu
  }
}, yu = {
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
}, xu = {
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
}, wu = {
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
}, ku = {
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
}, Cu = {
  systems: {
    bit: yu,
    byte: xu,
    IECBit: wu,
    IECByte: ku
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
}, Nu = {
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
}, Su = {
  systems: {
    metric: Nu
  }
}, _u = {
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
}, Ru = {
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
}, Au = {
  systems: {
    SI: _u,
    nutrition: Ru
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
}, Mu = {
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
}, Ou = {
  systems: {
    SI: Mu
  }
}, Lu = {
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
}, Du = {
  systems: {
    SI: Lu
  }
}, zu = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Tu = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Fu = {
  systems: {
    metric: zu,
    imperial: Tu
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
}, Eu = {
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
}, Pu = {
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
}, $u = {
  systems: {
    metric: Eu,
    imperial: Pu
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
}, Iu = {
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
}, ju = {
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
}, qu = {
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
}, Ku = {
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
}, Bu = {
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
}, Wu = {
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
}, Uu = {
  systems: {
    metric: Bu,
    imperial: Wu
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
}, Gu = {
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
}, Yu = {
  systems: {
    SI: Gu
  }
}, Qu = {
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
}, Ju = {
  systems: {
    unit: Qu
  }
}, Xu = {
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
}, Zu = {
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
}, ed = {
  systems: {
    metric: Xu,
    imperial: Zu
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
}, td = {
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
}, nd = {
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
}, rd = {
  systems: {
    metric: td,
    imperial: nd
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
}, ad = {
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
}, od = {
  systems: {
    SI: ad
  }
}, id = {
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
}, cd = {
  systems: {
    SI: id
  }
}, sd = {
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
}, ld = {
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
}, ud = {
  systems: {
    metric: sd,
    imperial: ld
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
}, dd = {
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
}, md = {
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
}, vd = {
  systems: {
    metric: dd,
    imperial: md
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
}, fd = {
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
}, hd = {
  systems: {
    SI: fd
  }
}, pd = {
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
}, gd = {
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
}, yd = {
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
}, xd = {
  systems: {
    SI: yd
  }
}, wd = {
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
}, kd = {
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
}, Cd = {
  systems: {
    metric: wd,
    imperial: kd
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
}, Nd = {
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
}, Sd = {
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
}, _d = {
  systems: {
    metric: Nd,
    imperial: Sd
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
}, Rd = {
  acceleration: cu,
  angle: lu,
  apparentPower: du,
  area: fu,
  charge: pu,
  current: bu,
  digital: Cu,
  each: Su,
  energy: Au,
  force: Ou,
  frequency: Du,
  illuminance: Fu,
  length: $u,
  mass: Vu,
  massFlowRate: Hu,
  pace: Uu,
  partsPer: Yu,
  pieces: Ju,
  power: ed,
  pressure: rd,
  reactiveEnergy: od,
  reactivePower: cd,
  speed: ud,
  torque: bd,
  temperature: vd,
  time: hd,
  voltage: xd,
  volume: Cd,
  volumeFlowRate: _d
}, Ad = ou(Rd), Md = {
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
function Od(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Ad(t).from(e.from).to(e.to)
  };
}
const lr = {
  ...Object.fromEntries(
    Object.entries(Md).map(([e, t]) => [e, Od(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Mn(e) {
  return e ? { ...lr, ...e } : lr;
}
function Ld(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Dd(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function zd(e) {
  return e != null && e.quantity ? Dd(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Td = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Fd(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function wa(e, t) {
  const n = e * (Td[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
  return s === -1 ? "0s" : r + c.slice(s, s + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function Gn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [o, c] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= o) return Fd((e / o).toFixed(n.decimals ?? 1)) + c;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Ed(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function ka(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function qo(e = lr) {
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
    const c = r == null ? void 0 : r.unit, s = c ? Ed(a, c) : {}, l = (o == null ? void 0 : o.prefix) ?? s.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : s.suffix ?? "";
    return `${l}${Gn(n, t)}${u}`;
  };
}
const On = eo(null);
On.displayName = "CubeVizContext";
function qe() {
  const e = wr(On);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function bt() {
  return qe().families;
}
function Pd(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function mp({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: o,
  children: c
}) {
  const s = (o ?? []).map((g) => g.family).join("|"), l = ee(
    () => Pr(Er, o),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on content, not identity
    [s]
  ), u = ee(
    () => Pd(e) ? ts(e) : e,
    [e]
  ), d = ee(
    () => {
      var g;
      return {
        chartRamp: (g = t == null ? void 0 : t.chartRamp) != null && g.length ? t.chartRamp : xe,
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
      theme: d,
      maps: y
    }),
    [u, h, l, f, d, y]
  );
  return /* @__PURE__ */ i(On.Provider, { value: p, children: /* @__PURE__ */ i(
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
function $r({
  families: e,
  children: t
}) {
  const n = qe(), r = (e ?? []).map((o) => o.family).join("|"), a = ee(() => !e || e.length === 0 ? n : { ...n, families: Pr(Er, e) }, [n, r]);
  return !e || e.length === 0 ? /* @__PURE__ */ i(re, { children: t }) : /* @__PURE__ */ i(On.Provider, { value: a, children: t });
}
function $d(e, t, n) {
  var r;
  return ((r = e == null ? void 0 : e.charts) == null ? void 0 : r[t]) ?? n.require(t).component;
}
const Id = 5e3;
function jd(e, t) {
  const { cubeClient: n } = qe(), r = (t == null ? void 0 : t.skip) ?? !1, a = ee(
    () => e.limit === void 0 ? { ...e, limit: Id } : e,
    [e]
  ), o = ee(() => JSON.stringify(a), [a]), [c, s] = Nt({ isLoading: !r }), [l, u] = Nt(0), d = Ze(() => u((f) => f + 1), []);
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
const Ln = eo(null);
Ln.displayName = "DashboardContext";
function Ir({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = dt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Jl(r, t), key: r });
  const o = a.current.store, c = Vd(o, r);
  return Vi(Ln.Provider, { value: c }, n);
}
function Vd(e, t) {
  const n = Ze(
    (o, c) => e.set(o, c),
    [e]
  ), r = Ze(
    (o) => Vo(o, e.getAll(), t),
    [e, t]
  ), a = Ze(
    (o) => Wl(o, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ store: e, setVar: n, resolveQuery: r, resolveValue: a, decls: t }),
    [e, n, r, a, t]
  );
}
function qd(e) {
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
function Ko() {
  const e = wr(Ln);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return qd(e);
}
function jr() {
  return wr(Ln);
}
const Kd = () => () => {
};
function Yn(e, t, n) {
  var N;
  const r = jr(), { locale: a } = qe(), o = bt(), c = dt(null);
  c.current === null && (c.current = Ql());
  const s = c.current, l = (n == null ? void 0 : n.skipResolve) ?? !1, u = r !== null && !l, d = () => !u || !r ? e : s(e, r.store.getAll(), r.decls), f = to(
    u && r ? r.store.subscribe : Kd,
    d,
    d
  ), { resultSet: h, isLoading: y, error: p, refetch: g } = jd(f, { skip: n == null ? void 0 : n.skip }), b = ((N = t.format) == null ? void 0 : N.unitSystem) ?? (a == null ? void 0 : a.unitSystem), k = ee(() => Mn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ee(() => {
    if (h)
      return jl(h, t, f, { unitSystem: b, conversions: k }, o);
  }, [h, t, f, b, k, o]), isLoading: y, error: p, refetch: g, resolvedQuery: f };
}
function at() {
  const { cubeClient: e } = qe(), [t, n] = Nt({ isLoading: !0 });
  return Zt(() => {
    let r = !0;
    return n({ isLoading: !0 }), ns(e).then((a) => {
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
function vp() {
  const { locale: e } = qe(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? qo(Mn(n)),
    [t, n]
  );
}
function Ho() {
  const [e, t] = Nt(0), n = dt(null), r = dt(null), a = dt(null), o = dt(0), c = Ze((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), s = Ze(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), l = Ze(
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
const Hd = "day";
function Bd(e, t) {
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
        granularity: r.granularity ?? Hd,
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
const ie = (e) => ge(e, "yyyy-MM-dd");
function Wd(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = mn(e[0]), o = mn(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(o.getTime())) return;
    const c = kc(o, a) + 1;
    return [ie(Le(a, c)), ie(Le(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = Le(t, 1);
    return [ie(a), ie(a)];
  }
  if (n === "yesterday") {
    const a = Le(t, 2);
    return [ie(a), ie(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), o = r[2];
    if (o.startsWith("day")) return [ie(Le(t, 2 * a - 1)), ie(Le(t, a))];
    if (o.startsWith("week")) return [ie(Le(t, 14 * a - 1)), ie(Le(t, 7 * a))];
    if (o.startsWith("month"))
      return [ie(Pn($n(t, 2 * a))), ie(Le(Pn($n(t, a)), 1))];
    if (o.startsWith("quarter"))
      return [ie(In(jn(t, 2 * a))), ie(Le(In(jn(t, a)), 1))];
    if (o.startsWith("year"))
      return [ie(Vn(qn(t, 2 * a))), ie(Le(Vn(qn(t, a)), 1))];
  }
  if (n === "this week") {
    const a = Cc(t, 1);
    return [ie(Nc(a)), ie(Sc(a))];
  }
  if (n === "this month") {
    const a = $n(t, 1);
    return [ie(Pn(a)), ie(_c(a))];
  }
  if (n === "this quarter") {
    const a = jn(t, 1);
    return [ie(In(a)), ie(Rc(a))];
  }
  if (n === "this year") {
    const a = qn(t, 1);
    return [ie(Vn(a)), ie(Ac(a))];
  }
}
function Ud(e, t, n = _n) {
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
  const s = Wd(c);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...o, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Gd = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Vr({ query: e, chart: t, onState: n, editing: r }) {
  const { registry: a, locale: o } = qe(), c = bt(), s = ee(() => {
    var L;
    return (L = t.format) != null && L.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), l = ee(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: u, isLoading: d, error: f, refetch: h, resolvedQuery: y } = Yn(l, s), p = ee(() => Bd(l, s), [l, s]), g = Yn(
    (p == null ? void 0 : p.query) ?? l,
    (p == null ? void 0 : p.chart) ?? s,
    { skip: !p }
  ), b = ee(
    () => Ud(y, s, c),
    [y, s, c]
  ), k = Yn(
    (b == null ? void 0 : b.query) ?? l,
    s,
    { skip: !b, skipResolve: !0 }
  ), w = ee(
    () => ({ [s.family]: $d(a, s.family, c) }),
    [a, s.family, c]
  ), N = ee(() => {
    let L = u ?? Gd;
    if (p && g.data && (L = { ...L, series: g.data.series, categories: g.data.categories }), b && k.data) {
      if (b.mode === "kpiRow") {
        const V = k.data.raw.rows[0];
        if (V) {
          const P = L.raw.rows[0];
          L = {
            ...L,
            raw: { ...L.raw, rows: P ? [P, V] : [V] }
          };
        }
      } else if (L.series.length > 0) {
        const V = k.data.series.map((P) => {
          const D = L.series.find((E) => E.key === P.key);
          return {
            ...P,
            key: `${P.key}__prev`,
            label: `${(D == null ? void 0 : D.label) ?? P.label} (prev)`,
            colorToken: (D == null ? void 0 : D.colorToken) ?? P.colorToken,
            meta: { ...P.meta, companion: !0 }
          };
        });
        L = { ...L, series: [...L.series, ...V] };
      }
    }
    return L;
  }, [u, p, g.data, b, k.data]);
  Zt(() => {
    n == null || n({ rows: N.raw.rows, refetch: h, isLoading: d });
  }, [n, N.raw.rows, h, d]);
  const _ = {}, C = ee(
    () => o.formatValue ?? qo(Mn(o.units)),
    [o.formatValue, o.units]
  ), M = ee(
    () => Oo(N.raw.annotation, s, C, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [N.raw.annotation, s, C, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    zl,
    {
      data: N,
      options: s,
      config: _,
      format: M,
      state: { loading: d && !u, error: f },
      components: w,
      registry: c,
      editing: r
    }
  );
}
function Yd({ spec: e }) {
  return /* @__PURE__ */ i(Vr, { query: e.query, chart: e.chart });
}
const Bo = "cube-viz-prose";
function Qd(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Jd({ doc: e }) {
  const t = Qd(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), r = bo(
    {
      extensions: [xo],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: S(Bo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(yo, { editor: r }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
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
], Xd = Object.fromEntries(
  un.map((e) => [e.value, e.label])
);
function Ca(e) {
  return Xd[e.trim().toLowerCase()] ?? e;
}
const Zd = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function em({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Oc(), a = S(Io({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
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
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:text-foreground", children: ge(e.date, "MMMM yyyy") }),
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
function tm({ day: e, modifiers: t, className: n, style: r, ...a }) {
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
function Wo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ i(
    Mc,
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
        MonthCaption: em,
        DayButton: tm,
        Chevron: ({ orientation: a, className: o, ...c }) => /* @__PURE__ */ i(a === "left" ? kr : en, { className: S("cv:size-4", o), ...c })
      },
      ...r
    }
  );
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ i(dn.Root, { "data-slot": "popover", ...e });
}
function Me({
  ...e
}) {
  return /* @__PURE__ */ i(dn.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Oe({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ i(dn.Portal, { children: /* @__PURE__ */ i(
    dn.Content,
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
function ze({
  ...e
}) {
  return /* @__PURE__ */ i(we.Root, { "data-slot": "select", ...e });
}
function ur({
  ...e
}) {
  return /* @__PURE__ */ i(we.Group, { "data-slot": "select-group", ...e });
}
function Te({
  ...e
}) {
  return /* @__PURE__ */ i(we.Value, { "data-slot": "select-value", ...e });
}
function Fe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    we.Trigger,
    {
      "data-slot": "select-trigger",
      className: S(
        "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:whitespace-nowrap cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2 cv:text-sm cv:text-foreground cv:shadow-sm cv:ring-offset-background cv:placeholder:text-muted-foreground cv:focus:outline-none cv:focus:ring-1 cv:focus:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50 cv:[&>span]:line-clamp-1 cv:data-[placeholder]:text-muted-foreground cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(we.Icon, { asChild: !0, children: /* @__PURE__ */ i(nt, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function nm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    we.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Xi, { className: "cv:size-4" })
    }
  );
}
function rm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    we.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(nt, { className: "cv:size-4" })
    }
  );
}
function Ee({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ i(we.Portal, { children: /* @__PURE__ */ v(
    we.Content,
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
        /* @__PURE__ */ i(nm, {}),
        /* @__PURE__ */ i(
          we.Viewport,
          {
            className: S(
              "cv:p-1",
              n === "popper" && "cv:h-[var(--radix-select-trigger-height)] cv:w-full cv:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(rm, {})
      ]
    }
  ) });
}
function dr({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    we.Label,
    {
      "data-slot": "select-label",
      className: S("cv:px-2 cv:py-1.5 cv:text-xs cv:font-medium cv:text-muted-foreground", e),
      ...t
    }
  );
}
function ye({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    we.Item,
    {
      "data-slot": "select-item",
      className: S(
        "cv:relative cv:flex cv:w-full cv:cursor-default cv:select-none cv:items-center cv:rounded-sm cv:py-1.5 cv:pl-2 cv:pr-8 cv:text-sm cv:outline-none cv:focus:bg-accent cv:focus:text-accent-foreground cv:data-[disabled]:pointer-events-none cv:data-[disabled]:opacity-50",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(we.ItemIndicator, { children: /* @__PURE__ */ i($e, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(we.ItemText, { children: t })
      ]
    }
  );
}
const Rt = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), am = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", Vt = "yyyy-MM-dd";
function om(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Na(e) {
  if (!e) return;
  const t = po(e, Vt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function im({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Zd, [o, c] = Nt(!1), s = typeof e == "string", [l, u] = om(e), d = Na(l), f = Na(u), h = d ? { from: d, to: f } : void 0;
  let y;
  s ? y = Ca(e) : d && f ? y = `${ge(d, "MMM d, yyyy")} – ${ge(f, "MMM d, yyyy")}` : d ? y = ge(d, "MMM d, yyyy") : y = "Pick a date range";
  const p = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Ae, { open: o, onOpenChange: c, children: [
    /* @__PURE__ */ i(Me, { asChild: !0, children: /* @__PURE__ */ v(
      B,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          y === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(io, { className: "cv:mr-2 cv:size-4" }),
          y
        ]
      }
    ) }),
    /* @__PURE__ */ v(Oe, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: a.map((g) => /* @__PURE__ */ i(
        B,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), c(!1);
          },
          children: Ca(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        Wo,
        {
          mode: "range",
          selected: h,
          defaultMonth: d,
          disabled: p,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([ge(g.from, Vt), ge(g.to, Vt)]) : g != null && g.from ? t([ge(g.from, Vt), ge(g.from, Vt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const cm = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function sm(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function lm(e) {
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
function um({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = Ko(), o = r.rangeVariable ? lm(a(r.rangeVariable)) : void 0, c = r.options ?? (o !== void 0 ? sm(o) : cm), s = typeof e == "string" ? e : "", l = c.join(",");
  return Zt(() => {
    s && !c.includes(s) && t(c[0]);
  }, [s, l]), /* @__PURE__ */ v(
    ze,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Fe, { className: Rt, children: /* @__PURE__ */ i(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Ee, { children: c.map((u) => /* @__PURE__ */ i(ye, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function dm({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((c) => String(c))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(Rt, "cv:h-auto cv:min-h-[6rem]"),
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
        /* @__PURE__ */ i(Fe, { className: Rt, children: /* @__PURE__ */ i(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Ee, { children: r.options.map((o) => /* @__PURE__ */ i(ye, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function mm({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: o } = at(), c = ee(() => {
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
      className: Rt,
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
function vm({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
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
function fm({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: Rt,
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
function hm({ value: e, onChange: t, decl: n }) {
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
const pm = {
  dateRange: im,
  granularity: um,
  select: dm,
  memberSelect: mm,
  text: vm,
  number: fm,
  toggle: hm
};
function gm({ control: e, title: t }) {
  var y;
  const { registry: n } = qe(), { decls: r, resolveValue: a, setVar: o } = Ko(), c = ee(
    () => r.find((p) => p.name === e.variable),
    [r, e.variable]
  ), s = Za();
  if (!c)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, u = ((y = n.controls) == null ? void 0 : y[l]) ?? pm[l], d = a(e.variable), f = (p) => o(e.variable, p), h = t ?? c.label ?? c.name;
  return l === "toggle" ? /* @__PURE__ */ i(u, { value: d, onChange: f, decl: c, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: am, htmlFor: s, children: h }),
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
const Uo = x.forwardRef(
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
Uo.displayName = "Card";
const Go = x.forwardRef(
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
Go.displayName = "CardHeader";
const Yo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
Yo.displayName = "CardTitle";
const bm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
bm.displayName = "CardDescription";
const ym = x.forwardRef(
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
ym.displayName = "CardAction";
const Qo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
Qo.displayName = "CardContent";
const xm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
xm.displayName = "CardFooter";
const pn = "cube-viz-drag-handle";
function Jo(e) {
  var s;
  const { registry: t } = qe(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: r, menu: a, dragHandleProps: o, children: c } = e;
  return /* @__PURE__ */ v(Uo, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    r ? /* @__PURE__ */ v(
      Go,
      {
        ...o,
        className: S(
          pn,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(Yo, { className: "cv:truncate cv:text-sm cv:font-semibold", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ i(Qo, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: c })
  ] });
}
function wm(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const c = o == null ? "" : String(o);
    return /[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
  }, r = t.map(n).join(","), a = e.map((o) => t.map((c) => n(o[c])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function km(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), o = document.createElement("a");
  o.href = a, o.download = t, o.click(), URL.revokeObjectURL(a);
}
function Cm(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const Nm = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function et(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let yt = null;
function Xo(e = {}) {
  return yt || (e.includeStyleProperties ? (yt = e.includeStyleProperties, yt) : (yt = et(window.getComputedStyle(document.documentElement)), yt));
}
function gn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Sm(e) {
  const t = gn(e, "border-left-width"), n = gn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function _m(e) {
  const t = gn(e, "border-top-width"), n = gn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Zo(e, t = {}) {
  const n = t.width || Sm(e), r = t.height || _m(e);
  return { width: n, height: r };
}
function Rm() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ce = 16384;
function Am(e) {
  (e.width > Ce || e.height > Ce) && (e.width > Ce && e.height > Ce ? e.width > e.height ? (e.height *= Ce / e.width, e.width = Ce) : (e.width *= Ce / e.height, e.height = Ce) : e.width > Ce ? (e.height *= Ce / e.width, e.width = Ce) : (e.width *= Ce / e.height, e.height = Ce));
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
async function Mm(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Om(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), a.appendChild(o), o.appendChild(e), Mm(a);
}
const ke = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || ke(n, t);
};
function Lm(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Dm(e, t) {
  return Xo(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function zm(e, t, n, r) {
  const a = `.${e}:${t}`, o = n.cssText ? Lm(n) : Dm(n, r);
  return document.createTextNode(`${a}{${o}}`);
}
function Sa(e, t, n, r) {
  const a = window.getComputedStyle(e, n), o = a.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const c = Nm();
  try {
    t.className = `${t.className} ${c}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(zm(c, n, a, r)), t.appendChild(s);
}
function Tm(e, t, n) {
  Sa(e, t, ":before", n), Sa(e, t, ":after", n);
}
const _a = "application/font-woff", Ra = "image/jpeg", Fm = {
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
function Em(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function qr(e) {
  const t = Em(e).toLowerCase();
  return Fm[t] || "";
}
function Pm(e) {
  return e.split(/,/)[1];
}
function mr(e) {
  return e.search(/^(data:)/) !== -1;
}
function $m(e, t) {
  return `data:${t};base64,${e}`;
}
async function ei(e, t, n) {
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
const Qn = {};
function Im(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Kr(e, t, n) {
  const r = Im(e, t, n.includeQueryParams);
  if (Qn[r] != null)
    return Qn[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const o = await ei(e, n.fetchRequestInit, ({ res: c, result: s }) => (t || (t = c.headers.get("Content-Type") || ""), Pm(s)));
    a = $m(o, t);
  } catch (o) {
    a = n.imagePlaceholder || "";
    let c = `Failed to fetch resource: ${e}`;
    o && (c = typeof o == "string" ? o : o.message), c && console.warn(c);
  }
  return Qn[r] = a, a;
}
async function jm(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : bn(t);
}
async function Vm(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), c = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, c == null || c.drawImage(e, 0, 0, o.width, o.height);
    const s = o.toDataURL();
    return bn(s);
  }
  const n = e.poster, r = qr(n), a = await Kr(n, r, t);
  return bn(a);
}
async function qm(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Dn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Km(e, t) {
  return ke(e, HTMLCanvasElement) ? jm(e) : ke(e, HTMLVideoElement) ? Vm(e, t) : ke(e, HTMLIFrameElement) ? qm(e, t) : e.cloneNode(ti(e));
}
const Hm = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", ti = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Bm(e, t, n) {
  var r, a;
  if (ti(t))
    return t;
  let o = [];
  return Hm(e) && e.assignedNodes ? o = et(e.assignedNodes()) : ke(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = et(e.contentDocument.body.childNodes) : o = et(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), o.length === 0 || ke(e, HTMLVideoElement) || await o.reduce((c, s) => c.then(() => Dn(s, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function Wm(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Xo(n).forEach((o) => {
    let c = a.getPropertyValue(o);
    o === "font-size" && c.endsWith("px") && (c = `${Math.floor(parseFloat(c.substring(0, c.length - 2))) - 0.1}px`), ke(e, HTMLIFrameElement) && o === "display" && c === "inline" && (c = "block"), o === "d" && t.getAttribute("d") && (c = `path(${t.getAttribute("d")})`), r.setProperty(o, c, a.getPropertyPriority(o));
  });
}
function Um(e, t) {
  ke(e, HTMLTextAreaElement) && (t.innerHTML = e.value), ke(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Gm(e, t) {
  if (ke(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Ym(e, t, n) {
  return ke(t, Element) && (Wm(e, t, n), Tm(e, t, n), Um(e, t), Gm(e, t)), t;
}
async function Qm(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const s = n[o].getAttribute("xlink:href");
    if (s) {
      const l = e.querySelector(s), u = document.querySelector(s);
      !l && u && !r[s] && (r[s] = await Dn(u, t, !0));
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
async function Dn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Km(r, t)).then((r) => Bm(e, r, t)).then((r) => Ym(e, r, t)).then((r) => Qm(r, t));
}
const ni = /url\((['"]?)([^'"]+?)\1\)/g, Jm = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Xm = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Zm(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function ev(e) {
  const t = [];
  return e.replace(ni, (n, r, a) => (t.push(a), n)), t.filter((n) => !mr(n));
}
async function tv(e, t, n, r, a) {
  try {
    const o = n ? Cm(t, n) : t, c = qr(t);
    let s;
    return a || (s = await Kr(o, c, r)), e.replace(Zm(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function nv(e, { preferredFontFormat: t }) {
  return t ? e.replace(Xm, (n) => {
    for (; ; ) {
      const [r, , a] = Jm.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function ri(e) {
  return e.search(ni) !== -1;
}
async function ai(e, t, n) {
  if (!ri(e))
    return e;
  const r = nv(e, n);
  return ev(r).reduce((o, c) => o.then((s) => tv(s, c, t, n)), Promise.resolve(r));
}
async function xt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const o = await ai(a, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function rv(e, t) {
  await xt("background", e, t) || await xt("background-image", e, t), await xt("mask", e, t) || await xt("-webkit-mask", e, t) || await xt("mask-image", e, t) || await xt("-webkit-mask-image", e, t);
}
async function av(e, t) {
  const n = ke(e, HTMLImageElement);
  if (!(n && !mr(e.src)) && !(ke(e, SVGImageElement) && !mr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Kr(r, qr(r), t);
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
async function ov(e, t) {
  const r = et(e.childNodes).map((a) => oi(a, t));
  await Promise.all(r).then(() => e);
}
async function oi(e, t) {
  ke(e, Element) && (await rv(e, t), await av(e, t), await ov(e, t));
}
function iv(e, t) {
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
  const r = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (c) => {
    let s = c.replace(r, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), ei(s, t.fetchRequestInit, ({ result: l }) => (n = n.replace(c, `url(${l})`), [c, l]));
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
async function cv(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        et(a.cssRules || []).forEach((o, c) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let s = c + 1;
            const l = o.href, u = Ma(l).then((d) => Oa(d, t)).then((d) => La(d).forEach((f) => {
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
        a.href != null && r.push(Ma(a.href).then((s) => Oa(s, t)).then((s) => La(s).forEach((l) => {
          c.insertRule(l, c.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        et(a.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${a.href}`, o);
      }
  }), n));
}
function sv(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => ri(t.style.getPropertyValue("src")));
}
async function lv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = et(e.ownerDocument.styleSheets), r = await cv(n, t);
  return sv(r);
}
function ii(e) {
  return e.trim().replace(/["']/g, "");
}
function uv(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((o) => {
      t.add(ii(o));
    }), Array.from(r.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function dv(e, t) {
  const n = await lv(e, t), r = uv(e);
  return (await Promise.all(n.filter((o) => r.has(ii(o.style.fontFamily))).map((o) => {
    const c = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return ai(o.cssText, c, t);
  }))).join(`
`);
}
async function mv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await dv(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function vv(e, t = {}) {
  const { width: n, height: r } = Zo(e, t), a = await Dn(e, t, !0);
  return await mv(a, t), await oi(a, t), iv(a, t), await Om(a, n, r);
}
async function fv(e, t = {}) {
  const { width: n, height: r } = Zo(e, t), a = await vv(e, t), o = await bn(a), c = document.createElement("canvas"), s = c.getContext("2d"), l = t.pixelRatio || Rm(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return c.width = u * l, c.height = d * l, t.skipAutoScale || Am(c), c.style.width = `${u}`, c.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, c.width, c.height)), s.drawImage(o, 0, 0, c.width, c.height), c;
}
async function hv(e, t = {}) {
  return (await fv(e, t)).toDataURL();
}
function pv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function gv(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function bv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function yv(e, t, n = 2) {
  const r = await hv(e, {
    pixelRatio: n,
    backgroundColor: bv(e),
    cacheBust: !0
  });
  gv(r, `${pv(t)}.png`);
}
function xv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, o] = x.useState(!1), c = t.length > 0, s = !!r;
  if (!c && !n && !s) return null;
  const l = () => {
    const h = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    km(wm(t), `${h}.csv`);
  }, u = async () => {
    const h = r == null ? void 0 : r.current;
    if (!(!h || a)) {
      o(!0);
      try {
        await yv(h, e);
      } finally {
        o(!1);
      }
    }
  }, d = (h) => h.stopPropagation(), f = (h = !0) => S(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !h && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ i(
      Me,
      {
        onMouseDown: d,
        onPointerDown: d,
        onTouchStart: d,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(Zi, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Oe, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: d, onPointerDown: d, onTouchStart: d, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ i(ec, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      s ? /* @__PURE__ */ v("button", { type: "button", onClick: u, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ i(tc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: l, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ i(nc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
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
      return /* @__PURE__ */ i(Jd, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(gm, { control: e.control, title: e.title });
  }
}
function vr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = Nt({ rows: [] }), o = Ze(
    (l) => a({ rows: l.rows, refetch: l.refetch }),
    []
  ), c = dt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(Da, { widget: e }) });
  const s = n ? null : /* @__PURE__ */ i(
    xv,
    {
      title: e.title,
      rows: r.rows,
      refetch: r.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ i(
    Jo,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(Da, { widget: e, onState: o }) })
    }
  );
}
const wv = "lg", kv = 640;
function Cv(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function Nv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function fp({ spec: e, editable: t = !1, families: n }) {
  const [r, a] = Ho(), o = e.grid ?? {}, c = o.cols ?? 12, s = o.rowHeight ?? 40, l = o.margin ?? [12, 12], u = o.containerPadding ?? l, d = ee(
    () => ({ [wv]: Nv(e.layout) }),
    [e.layout]
  ), f = ee(
    () => new Map(e.widgets.map((y) => [y.id, y])),
    [e.widgets]
  ), h = !t && a > 0 && a < kv;
  return /* @__PURE__ */ i($r, { families: n, children: /* @__PURE__ */ i(Ir, { spec: e, children: /* @__PURE__ */ i("div", { ref: r, className: "cv:w-full", children: a <= 0 ? null : h ? /* @__PURE__ */ i(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: l[1],
        padding: `${u[1]}px ${u[0]}px`
      },
      children: Cv(e.layout).map((y) => {
        const p = f.get(y.i);
        if (!p) return null;
        const g = y.h * s + (y.h - 1) * l[1];
        return /* @__PURE__ */ i("div", { style: { height: g }, children: /* @__PURE__ */ i(vr, { widget: p, editable: !1 }) }, y.i);
      })
    }
  ) : /* @__PURE__ */ i(
    go,
    {
      width: a,
      layouts: d,
      breakpoints: { lg: 0 },
      cols: { lg: c },
      rowHeight: s,
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
function hp({ spec: e, families: t }) {
  return /* @__PURE__ */ i($r, { families: t, children: /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
    Jo,
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
      children: /* @__PURE__ */ i(Yd, { spec: e })
    }
  ) }) });
}
function zn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function mt(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Tn(e) {
  return e ? e.cubes.filter((t) => mt(t)).map((t) => ({
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
function ci(e) {
  return Yt(e.meta, "group");
}
function Sv(e, t) {
  const n = [], r = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = ci(a), c = o ? `g:${o.toLowerCase()}` : `f:${t(a)}`;
    let s = r.get(c);
    s || (s = { label: o ?? t(a), items: [] }, r.set(c, s), n.push(c)), s.items.push(a);
  }
  return n.map((a) => [r.get(a).label, r.get(a).items]);
}
function si(e, t) {
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
function li(e, t) {
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
    if (!mt(a) || n && a.name !== n) continue;
    const o = zn(a), c = (s) => {
      s.connectedComponent = o, r.push(s);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        mt(s) && c(si(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        mt(s) && s.type !== "time" && c(fr(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        mt(s) && s.type === "time" && c(fr(s, a.name));
  }
  return r;
}
function _v(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!mt(a) || n && !n.has(a.name)) continue;
    const o = zn(a);
    for (const c of a.segments) {
      if (!mt(c)) continue;
      const s = li(c, a.name);
      s.connectedComponent = o, r.push(s);
    }
  }
  return r;
}
function Pe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const r = zn(n), a = (s) => (s && (s.connectedComponent = r), s), o = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (o)
        return o.type ? "aggType" in o ? a(si(o, n.name)) : a(fr(o, n.name)) : void 0;
      const c = n.segments.find((s) => s.name === t);
      if (c) return a(li(c, n.name));
    }
}
function Rv(e) {
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
]), ui = {
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
function di(e) {
  var c, s, l, u, d;
  const t = e.query, n = (c = t.measures) == null ? void 0 : c.find(Boolean);
  if (n) return qt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return qt(r);
  const a = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (a) return qt(a);
  const o = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return qt(o);
}
function At(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Et(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Ne(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function ot(e) {
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
const Av = "day";
function Mv(e, t, n) {
  var d, f, h, y;
  const { query: r, chart: a } = e, o = At(a).length ? At(a) : r.measures ?? [], c = Ne(a) ?? ((d = r.dimensions) == null ? void 0 : d[0]) ?? ((h = (f = r.timeDimensions) == null ? void 0 : f[0]) == null ? void 0 : h.dimension), s = c ? { category: { member: c }, series: { mode: "measures", members: o } } : void 0, l = {
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
function It(e) {
  return Ld(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function gr(e) {
  return zd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Ov(e, t) {
  return t.require(e).wells;
}
function Re(e) {
  return e.chart.familyOptions ?? {};
}
function Fn(e) {
  const t = Re(e).series;
  return Array.isArray(t) ? t : [];
}
function Br(e) {
  const t = Re(e).columns;
  return Array.isArray(t) ? t : [];
}
function Lv(e) {
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
      const s = Lv(e), l = (c = n.mapping) == null ? void 0 : c.series;
      return { y: l && l.mode === "pivot" ? l.values && l.values.length > 0 ? l.values : a(l.value) : At(n), x: a(Ne(n)), color: a(s) };
    }
    case "combo":
      return {
        x: a(Ne(n)),
        y: Fn(e).map((s) => s.member)
      };
    case "pie":
      return { slices: a(Ne(n)), size: a(At(n)[0]) };
    case "scatter": {
      const s = Re(e);
      return {
        sx: a(s.x),
        sy: a(s.y),
        size: a(s.size),
        color: a(s.groupBy)
      };
    }
    case "kpi":
      return { value: a(Re(e).measure) };
    case "table":
      return { columns: Br(e).map((s) => s.member) };
    default:
      return {};
  }
}
function En(e) {
  const t = Dv(e);
  return t === void 0 ? Av : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Dv(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function an(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function ft(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Pt(e, t) {
  return { ...e, dimensions: an(e.dimensions, t) };
}
function Ve(e, t) {
  const n = ft(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function We(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function ht(e, t, n) {
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
  for (const s of t) {
    const l = r == null ? void 0 : r[s];
    l && Object.keys(l).length > 0 && (a[s] = l);
  }
  const o = Object.keys(a).length > 0, c = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: a } : {} };
  return { category: { member: e }, series: c };
}
function za(e, t, n, r, a, o) {
  const c = o.require(t).placeField;
  if (c) return c(e, n, r, a);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Tv(e, n, r, a, o);
    case "combo":
      return Pv(e, n, r, a);
    case "pie":
      return jv(e, n, r, a);
    case "scatter":
      return qv(e, n, r);
    case "kpi":
      return Hv(e, r);
    case "table":
      return Wv(e, r, a);
    default:
      return e;
  }
}
function zv(e, t, n, r, a) {
  const o = a.require(t).removeField;
  if (o) return o(e, n, r);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Ev(e, n, r, a);
    case "combo":
      return Iv(e, n, r);
    case "pie":
      return Vv(e, n, r);
    case "scatter":
      return Kv(e, n, r);
    case "kpi":
      return Bv(e, r);
    case "table":
      return Uv(e, r);
    default:
      return e;
  }
}
function Tv(e, t, n, r, a) {
  const { query: o, chart: c } = e, s = rn(e, a), l = s.color[0], u = Ne(c), d = Et(c);
  if (t === "y") {
    const f = s.y, h = an(f, n);
    return l ? {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: xn(u, h, l, yn(c)) }
    } : {
      ...e,
      query: { ...o, measures: h },
      chart: { ...c, mapping: ht(u, h, d) }
    };
  }
  if (t === "x")
    return Fv(e, n, r, l, a);
  if (t === "color") {
    const f = s.y;
    if (f.length === 0) return e;
    const h = Pt({ ...o, measures: f }, n);
    return {
      ...e,
      query: h,
      chart: { ...c, mapping: xn(u, f, n, yn(c)) }
    };
  }
  return e;
}
function Fv(e, t, n, r, a) {
  const { query: o, chart: c } = e, s = Ne(c), l = rn(e, a).y, u = Et(c);
  let d = o;
  const f = ot(o);
  if (f && s === f.dimension ? d = We(d, void 0) : s && (d = Ve(d, s)), n === "time") {
    const y = (f == null ? void 0 : f.granularity) ?? En(f == null ? void 0 : f.dateRange);
    d = We(d, {
      dimension: t,
      granularity: y,
      dateRange: f == null ? void 0 : f.dateRange
    });
  } else
    d = Pt(d, t);
  const h = r ? xn(t, l, r, yn(c)) : ht(t, l, u);
  return { ...e, query: d, chart: { ...c, mapping: h } };
}
function Ev(e, t, n, r) {
  const { query: a, chart: o } = e, c = rn(e, r), s = Ne(o), l = c.color[0], u = Et(o);
  if (t === "y") {
    const d = ft(c.y, n);
    if (l && d.length >= 1)
      return {
        ...e,
        query: { ...a, measures: d },
        chart: { ...o, mapping: xn(s, d, l, yn(o)) }
      };
    const f = l ? Ve({ ...a, measures: d }, l) : { ...a, measures: d };
    return { ...e, query: f, chart: { ...o, mapping: ht(s, d, u) } };
  }
  if (t === "x") {
    let d = a;
    const f = ot(a);
    return f && f.dimension === n ? d = We(d, void 0) : d = Ve(d, n), { ...e, query: d, chart: { ...o, mapping: void 0 } };
  }
  if (t === "color") {
    const d = Ve(a, n);
    return {
      ...e,
      query: d,
      chart: { ...o, mapping: ht(s, c.y, u) }
    };
  }
  return e;
}
const Ta = ["line", "bar"];
function Pv(e, t, n, r) {
  const { query: a, chart: o } = e, c = Re(e);
  if (t === "x") {
    let s = a;
    const l = Ne(o), u = ot(a);
    if (u && l === u.dimension ? s = We(s, void 0) : l && (s = Ve(s, l)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? En(u == null ? void 0 : u.dateRange);
      s = We(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Pt(s, n);
    return { ...e, query: s, chart: { ...o, mapping: { category: { member: n }, series: $v(e) } } };
  }
  if (t === "y") {
    const s = Fn(e);
    if (s.some((d) => d.member === n)) return e;
    const l = Ta[s.length % Ta.length], u = [...s, { member: n, render: l }];
    return {
      ...e,
      query: { ...a, measures: an(a.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...c, series: u }, mapping: vi(o, u) }
    };
  }
  return e;
}
function vi(e, t) {
  const n = Ne(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((r) => r.member) } } : e.mapping;
}
function $v(e) {
  return { mode: "measures", members: Fn(e).map((t) => t.member) };
}
function Iv(e, t, n) {
  const { query: r, chart: a } = e, o = Re(e);
  if (t === "x") {
    let c = r;
    const s = ot(r);
    return s && s.dimension === n ? c = We(c, void 0) : c = Ve(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  if (t === "y") {
    const c = Fn(e).filter((l) => l.member !== n), s = ft(r.measures, n);
    return {
      ...e,
      query: { ...r, measures: s },
      chart: { ...a, familyOptions: { ...o, series: c }, mapping: vi(a, c) }
    };
  }
  return e;
}
function jv(e, t, n, r) {
  const { query: a, chart: o } = e, c = Et(o);
  if (t === "slices") {
    let s = a;
    const l = Ne(o), u = ot(a);
    if (u && l === u.dimension ? s = We(s, void 0) : l && (s = Ve(s, l)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? En(u == null ? void 0 : u.dateRange);
      s = We(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Pt(s, n);
    return {
      ...e,
      query: s,
      chart: { ...o, mapping: ht(n, At(o), c) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...o, mapping: ht(Ne(o), s, c) }
    };
  }
  return e;
}
function Vv(e, t, n) {
  const { query: r, chart: a } = e, o = Et(a);
  if (t === "slices") {
    let c = r;
    const s = ot(r);
    return s && s.dimension === n ? c = We(c, void 0) : c = Ve(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: ht(Ne(a), [], o) }
  } : e;
}
const fi = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function qv(e, t, n) {
  const r = fi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...Re(e) }, s = c[r];
  c[r] = n;
  let l = a;
  if (r === "groupBy")
    s && s !== n && (l = Ve(l, s)), l = Pt(l, n);
  else {
    const u = s ? ft(a.measures, s) : a.measures;
    l = { ...a, measures: an(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: c } };
}
function Kv(e, t, n) {
  const r = fi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...Re(e) };
  delete c[r];
  let s = a;
  if (r === "groupBy") s = Ve(s, n);
  else {
    const l = ft(a.measures, n);
    s = { ...a, measures: l.length ? l : [] };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: c } };
}
function Hv(e, t) {
  const { query: n, chart: r } = e, a = { ...Re(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function Bv(e, t) {
  const { query: n, chart: r } = e, a = { ...Re(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function Wv(e, t, n) {
  const { query: r, chart: a } = e, o = Br(e);
  if (o.some((l) => l.member === t)) return e;
  let c = r;
  if (n === "number") c = { ...r, measures: an(r.measures, t) };
  else if (n === "time") {
    const l = ot(r), u = (l == null ? void 0 : l.granularity) ?? En(l == null ? void 0 : l.dateRange), d = r.timeDimensions ?? [];
    d.some((f) => f.dimension === t) || (c = { ...r, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else c = Pt(r, t);
  const s = { ...Re(e), columns: [...o, { member: t }] };
  return { ...e, query: c, chart: { ...a, familyOptions: s } };
}
function Uv(e, t) {
  var d, f, h;
  const { query: n, chart: r } = e, a = Br(e).filter((y) => y.member !== t);
  let o = n;
  const c = ft(n.measures, t);
  c.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: c.length ? c : void 0 });
  const s = ft(n.dimensions, t);
  s.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: s.length ? s : void 0 });
  const l = (n.timeDimensions ?? []).filter((y) => y.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...Re(e), columns: a };
  return { ...e, query: o, chart: { ...r, familyOptions: u } };
}
const fe = x.forwardRef(
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
fe.displayName = "Input";
function wn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(so, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(co, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(Cr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function hi({
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
  const { meta: u, isLoading: d } = at(), f = x.useMemo(() => {
    if (t) {
      const g = new Set(t);
      return hr(u, n).filter((b) => g.has(b.cube));
    }
    return hr(u, n, e);
  }, [u, n, e, t]), h = x.useMemo(() => {
    const g = Gv(f), b = g.length > 1, k = [];
    for (const [w, N] of g)
      for (const [_, C] of Sv(N, () => "Other")) {
        const M = b ? _ === "Other" ? w : `${w} · ${_}` : _;
        k.push({ key: `${w}:${_}`, label: M, items: C });
      }
    return k;
  }, [f]), y = h.length > 1, p = f.find((g) => g.name === r);
  return /* @__PURE__ */ v(ze, { value: r, onValueChange: a, disabled: c || d, children: [
    /* @__PURE__ */ i(Fe, { id: s, className: l, children: /* @__PURE__ */ i(Te, { placeholder: d ? "Loading…" : o, children: p ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      wn(p.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Ee, { children: h.map((g) => /* @__PURE__ */ v(ur, { children: [
      y && g.label ? /* @__PURE__ */ i(dr, { children: g.label }) : null,
      g.items.map((b) => /* @__PURE__ */ i(ye, { value: b.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        wn(b.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: b.label })
      ] }) }, b.name))
    ] }, g.key)) })
  ] });
}
function Gv(e) {
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
const Fa = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(co, { className: "cv:size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(Cr, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(so, { className: "cv:size-3" }), metaKind: "time" }
}, Yv = ["number", "category", "time"];
function pi({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: o = "start",
  side: c = "bottom",
  children: s
}) {
  var E, F;
  const { meta: l, isLoading: u } = at(), [d, f] = x.useState(!1), [h, y] = x.useState(""), [p, g] = x.useState(n.viewLocked ?? "tables"), [b, k] = x.useState({});
  x.useEffect(() => {
    d && g(n.viewLocked ?? "tables");
  }, [d, n.viewLocked]);
  const w = x.useMemo(() => new Set(t), [t]), N = h.trim().toLowerCase(), _ = x.useMemo(() => {
    if (p !== "tables") {
      const z = n.views.find((Q) => Q.name === p) ?? Wt(l, p);
      return z ? [{ cube: z, tag: "dataset" }] : [];
    }
    const O = [];
    n.sourceCube && O.push({ cube: n.sourceCube, tag: "source" });
    for (const z of n.relatedCubes) O.push({ cube: z, tag: "related" });
    return O;
  }, [p, n, l]), C = e.kinds.length > 1, M = (O) => {
    const z = [], Q = /* @__PURE__ */ new Map();
    for (const J of Yv) {
      if (!e.kinds.includes(J)) continue;
      const I = Fa[J];
      for (const q of hr(l, I.metaKind, O)) {
        if (w.has(q.name) || N && !(q.label.toLowerCase().includes(N) || q.name.toLowerCase().includes(N))) continue;
        const te = ci(q), U = te ? `g:${te.toLowerCase()}` : `k:${J}`;
        let G = Q.get(U);
        G || (G = { key: U, label: te ?? I.label, headerIcon: te ? void 0 : I.icon, items: [] }, Q.set(U, G), z.push(U)), G.items.push({ option: q, kind: J });
      }
    }
    return z.map((J) => Q.get(J));
  }, L = _.map((O) => ({ section: O, groups: M(O.cube.name) })).filter((O) => O.groups.length > 0), V = L.length > 0, P = (O, z) => {
    a(O, z), f(!1), y("");
  }, D = p === "tables" ? "All related tables" : ((E = n.views.find((O) => O.name === p)) == null ? void 0 : E.title) ?? ((F = Wt(l, p)) == null ? void 0 : F.title) ?? p;
  return /* @__PURE__ */ v(Ae, { open: d, onOpenChange: f, children: [
    /* @__PURE__ */ i(Me, { asChild: !0, children: s }),
    /* @__PURE__ */ v(Oe, { align: o, side: c, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(rc, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: h,
              onChange: (O) => y(O.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(Qv, { browse: p, label: D, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: V ? L.map(({ section: O, groups: z }, Q) => {
        const J = z.reduce((U, G) => U + G.items.length, 0), I = O.tag === "related", q = b[O.cube.name] ?? I, te = N.length > 0 ? !0 : !q;
        return /* @__PURE__ */ v("div", { children: [
          O.tag === "related" && Q > 0 && L[Q - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => k((U) => ({ ...U, [O.cube.name]: !q })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                te ? /* @__PURE__ */ i(nt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(en, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(lo, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: O.cube.title }),
                O.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : O.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: J })
              ]
            }
          ),
          te ? z.map((U) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            z.length > 1 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              U.headerIcon,
              U.label
            ] }) : null,
            U.items.map(({ option: G, kind: ae }) => /* @__PURE__ */ i(
              Jv,
              {
                option: G,
                kindIcon: C ? Fa[ae].icon : void 0,
                reason: r(G),
                onPick: () => P(G.name, ae)
              },
              G.name
            ))
          ] }, U.key)) : null
        ] }, O.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Qv({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, o] = x.useState(!1), c = (s) => {
    r(s), o(!1);
  };
  return /* @__PURE__ */ v(Ae, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Me,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(uo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Oe, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(Ea, { active: e === "tables", icon: /* @__PURE__ */ i(lo, { className: "cv:size-3.5" }), onClick: () => c("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(re, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ i(
          Ea,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ i(Nr, { className: "cv:size-3.5" }),
            onClick: () => c(s.name),
            children: s.title
          },
          s.name
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
        e ? /* @__PURE__ */ i($e, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function Jv({ option: e, reason: t, onPick: n, kindIcon: r }) {
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
const Xv = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Kt = "yyyy-MM-dd";
function Zv(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Pa(e) {
  if (!e) return;
  const t = po(e, Kt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Wr({ value: e, onChange: t }) {
  const [n, r] = x.useState(!1), a = typeof e == "string", [o, c] = Zv(e), s = Pa(o), l = Pa(c), u = s ? { from: s, to: l } : void 0, d = a ? e : s && l ? `${ge(s, "MMM d, yyyy")} – ${ge(l, "MMM d, yyyy")}` : s ? ge(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Me, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(io, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", d === "Any time" && "cv:text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ v(Oe, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        Xv.map((f) => /* @__PURE__ */ i(
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
        Wo,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([ge(f.from, Kt), ge(f.to, Kt)]) : f != null && f.from ? t([ge(f.from, Kt), ge(f.from, Kt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function ef(e) {
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
function tf(e, t) {
  const n = new Set(ef(t));
  return e.filter((r) => n.has(r.type));
}
function nf(e) {
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
function rf(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = a, c = 2;
  for (; r.has(o); ) o = `${a}_${c++}`;
  return o;
}
function af(e, t, n) {
  const r = nf(e), a = { name: rf(t, e, n), type: r }, o = t.trim();
  return o && (a.label = o), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const gi = x.createContext({});
function of({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(gi.Provider, { value: n, children: t });
}
function cf() {
  return x.useContext(gi);
}
function sf({ kind: e, value: t, onChange: n, className: r }) {
  const a = jr(), o = (a == null ? void 0 : a.decls) ?? [], { createVariable: c } = cf(), [s, l] = x.useState(!1), [u, d] = x.useState(!1), [f, h] = x.useState(""), y = x.useMemo(() => tf(o, e), [o, e]), p = y.find((k) => k.name === t), g = (k) => {
    n(k), l(!1), d(!1);
  }, b = () => {
    if (!c) return;
    const k = af(e, f || "Variable", o);
    c(k), g(k.name), h("");
  };
  return /* @__PURE__ */ v(
    Ae,
    {
      open: s,
      onOpenChange: (k) => {
        l(k), k || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Me, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", r), children: [
          /* @__PURE__ */ i(ac, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !p && "cv:text-muted-foreground"), children: p ? p.label ?? p.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Oe, { align: "start", className: "cv:w-60 cv:p-1", children: [
          y.length > 0 ? y.map((k) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => g(k.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: k.label ?? k.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: k.type }),
                k.name === t ? /* @__PURE__ */ i($e, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            k.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          c ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              fe,
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
            /* @__PURE__ */ i(B, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: b, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground",
              children: [
                /* @__PURE__ */ i(St, { className: "cv:size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function Mt({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = De(t), [o, c] = x.useState(a ? "var" : "fixed");
  x.useEffect(() => {
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
            c("fixed"), De(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: s(o === "var"), onClick: () => c("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      sf,
      {
        kind: e,
        value: De(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : r(De(t) ? void 0 : t, (l) => n(l))
  ] });
}
const lf = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Jn(e) {
  return "member" in e && "operator" in e;
}
function uf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: o,
  className: c
}) {
  var D;
  const { meta: s } = at(), l = ((D = jr()) == null ? void 0 : D.decls) ?? [], [u, d] = x.useState(null), [f, h] = x.useState(null), y = r ?? [], p = y.length === 1 && !Jn(y[0]) && "or" in y[0] && Array.isArray(y[0].or) && y[0].or.every(Jn) ? y[0] : void 0, g = p ? "any" : "all", b = [], k = [];
  p || y.forEach((E) => Jn(E) ? b.push(E) : k.push(E));
  const w = p ? p.or : b, N = k.length === 0 && (w.length >= 2 || g === "any"), _ = (E) => g === "any" ? E.length ? [{ or: E }] : [] : [...E, ...k], C = (E) => {
    const F = E.filter((z) => z.member.length > 0), O = _(F);
    a(O.length > 0 ? O : void 0);
  }, M = (E) => {
    const F = E === "any" ? w.length ? [{ or: w }] : [] : [...w];
    a(F.length > 0 ? F : void 0);
  }, L = (E, F) => C(w.map((O, z) => z === E ? { ...O, ...F } : O)), V = (E) => C(w.filter((F, O) => O !== E)), P = (E) => {
    const O = { ...f ?? { member: "", operator: "equals", values: [] }, ...E };
    O.member ? (h(null), d(w.length), C([...w, O])) : h(O);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", c), children: [
    w.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    N ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
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
    w.map((E, F) => {
      const O = Pe(s, E.member);
      return u === F ? /* @__PURE__ */ i(
        $a,
        {
          leaf: E,
          member: O,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (z) => L(F, z),
          onDone: () => d(null),
          onRemove: () => V(F)
        },
        F
      ) : /* @__PURE__ */ i(
        df,
        {
          text: mf(E, O == null ? void 0 : O.label, l),
          disabled: o,
          onEdit: () => d(F),
          onRemove: () => V(F)
        },
        F
      );
    }),
    f ? /* @__PURE__ */ i(
      $a,
      {
        leaf: f,
        member: Pe(s, f.member),
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
          d(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(St, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function df({
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
        children: /* @__PURE__ */ i(Ot, { className: "cv:size-4" })
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
  onChange: c,
  onDone: s,
  onRemove: l
}) {
  const u = Rv(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], f = !pr.has(d);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        s && e.member ? /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: s, children: [
          /* @__PURE__ */ i($e, { className: "cv:size-3.5" }),
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
            children: /* @__PURE__ */ i(Ot, { className: "cv:size-3.5" })
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
          pi,
          {
            well: lf,
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
                    wn(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(nt, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        hi,
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
          value: d,
          onValueChange: (h) => c({
            operator: h,
            values: pr.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Fe, { className: "cv:w-full", children: /* @__PURE__ */ i(Te, {}) }),
            /* @__PURE__ */ i(Ee, { children: u.map((h) => /* @__PURE__ */ i(ye, { value: h, children: ui[h] }, h)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        vf,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => c({ values: h })
        }
      )
    ] }) : null
  ] });
}
function mf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = ui[e.operator] ?? e.operator;
  if (pr.has(e.operator)) return `${r} ${a}`;
  const o = (e.values ?? []).map((c) => {
    if (De(c)) {
      const s = n.find((l) => l.name === c.var);
      return `{${((s == null ? void 0 : s.label) ?? c.var).replace(/[{}]/g, "")}}`;
    }
    return String(c);
  });
  return o.length > 0 ? `${r} ${a} ${o.join(", ")}` : `${r} ${a} …`;
}
function vf({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && De(r[0]);
  if (t === "time") {
    const s = a ? r[0] : ff(r);
    return /* @__PURE__ */ i(
      Mt,
      {
        kind: "dateRange",
        value: s,
        onChange: (l) => n(l === void 0 ? [] : De(l) ? [l] : hf(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(Wr, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? r[0] : r.filter((s) => !De(s));
  return /* @__PURE__ */ i(
    Mt,
    {
      kind: o,
      value: c,
      onChange: (s) => n(s === void 0 ? [] : De(s) ? [s] : s),
      renderFixed: (s, l) => /* @__PURE__ */ i(
        fe,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => l(pf(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function ff(e) {
  const t = e.filter((n) => !De(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function hf(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function pf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function gf({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: o } = e, c = (o.filters ?? []).length, s = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ v(
      Me,
      {
        className: S(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          c > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(oc, { className: "cv:size-4" }),
          "Filter",
          c > 0 ? /* @__PURE__ */ i("span", { className: "cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground", children: c }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(Oe, { align: "end", className: "cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(bf, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ i(uf, { cube: n, cubes: r, scope: a, value: o.filters, onChange: s })
    ] })
  ] });
}
function bf({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = at(), a = _v(r, n);
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
function yf({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: r } = at(), a = x.useMemo(() => Tn(r), [r]), o = a.filter((b) => b.type === "view"), c = a.filter((b) => b.type === "cube"), s = a.find((b) => b.name === e), [l, u] = x.useState(!1), [d, f] = x.useState(null), h = (b) => {
    if (b === e) {
      u(!1);
      return;
    }
    t ? f(b) : (n(b), u(!1));
  }, y = () => {
    d && n(d), f(null), u(!1);
  }, p = d ? ((g = a.find((b) => b.name === d)) == null ? void 0 : g.title) ?? d : "";
  return /* @__PURE__ */ v(
    Ae,
    {
      open: l,
      onOpenChange: (b) => {
        u(b), b || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          Me,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(uo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !s && "cv:text-muted-foreground"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Oe, { align: "start", className: "cv:w-64 cv:p-1", children: d ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
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
          o.length > 0 ? /* @__PURE__ */ v(re, { children: [
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
          c.map((b) => /* @__PURE__ */ i(
            Ia,
            {
              icon: /* @__PURE__ */ i(mo, { className: "cv:size-3.5" }),
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
        n ? /* @__PURE__ */ i($e, { className: "cv:size-3.5 cv:shrink-0" }) : null
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
            onChange: (l) => ja(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          wf,
          {
            hidden: c,
            what: "axis title",
            onClick: () => ja(e, t, n, { labelHide: c ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function xf({
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
          n ? /* @__PURE__ */ i(vo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(fo, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function wf({
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
      children: e ? /* @__PURE__ */ i(vo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(fo, { className: "cv:size-3.5" })
    }
  );
}
const bi = x.forwardRef(
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
bi.displayName = "Label";
function de({
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
      /* @__PURE__ */ i(bi, { htmlFor: r, className: "cv:text-muted-foreground", children: e }),
      a ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: a }) : null
    ] }),
    c,
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
function be({
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
        /* @__PURE__ */ i(br, { id: c, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function kf({ spec: e, update: t }) {
  var p, g;
  const n = bt(), { chart: r } = e, a = r.family, o = r.familyOptions ?? {}, c = n.require(a);
  if (c.Customize) {
    const b = c.Customize;
    return /* @__PURE__ */ i(b, { spec: e, update: t });
  }
  const s = (b) => t({ ...e, chart: { ...r, ...b } }), l = (b) => t({ ...e, chart: { ...r, familyOptions: { ...o, ...b } } }), u = ((g = (p = r.mapping) == null ? void 0 : p.series) == null ? void 0 : g.mode) === "pivot" ? "stacked" : "none", d = r.stackMode ?? (a === "area" ? u : n.defaults(a).envelope.stackMode) ?? "none", h = /* @__PURE__ */ i(de, { label: "Stacked", children: /* @__PURE__ */ i(
    Qt,
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
        return /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            be,
            {
              label: "Horizontal",
              checked: r.orientation === "horizontal",
              onChange: (w) => s({ orientation: w ? "horizontal" : "vertical" })
            }
          ),
          h
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(re, { children: [
          h,
          r.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((k = (b = r.mapping) == null ? void 0 : b.series) == null ? void 0 : k.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            be,
            {
              label: "Donut",
              checked: typeof o.innerRadiusPct == "number" && o.innerRadiusPct > 0,
              onChange: (w) => l({ innerRadiusPct: w ? 55 : 0 })
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
              onChange: (w) => l({ showLabels: w })
            }
          ) }),
          /* @__PURE__ */ i(Nf, { label: "Max slices", children: /* @__PURE__ */ i(
            fe,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: o.maxSlices ?? "",
              placeholder: "8",
              onChange: (w) => {
                const N = parseInt(w.target.value, 10);
                l({ maxSlices: Number.isFinite(N) && N > 0 ? N : void 0 });
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
        return /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            be,
            {
              label: "Compact rows",
              checked: o.rowHeight === "compact",
              onChange: (w) => l({ rowHeight: w ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              label: "Sortable columns",
              checked: o.sortable !== !1,
              onChange: (w) => l({ sortable: w })
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              label: "Sticky header",
              checked: o.stickyHeader !== !1,
              onChange: (w) => l({ stickyHeader: w })
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              label: "Row numbers",
              checked: o.showRowNumbers === !0,
              onChange: (w) => l({ showRowNumbers: w })
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
function Cf(e, t) {
  const n = t.require(e);
  return n.hasCustomizeOptions || n.Customize !== void 0;
}
function Nf({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function yi(e, t, n) {
  return (r) => {
    r !== e.chart.family && t(Mv(e, r, n));
  };
}
function Sf({ spec: e, update: t, empty: n }) {
  const r = bt(), a = e.chart.family, o = yi(e, t, r);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(xi, { family: a, onPick: o, families: r })
  ] }) }) : null;
}
function _f({ spec: e, update: t }) {
  const n = bt(), r = e.chart.family, a = yi(e, t, n), o = n.require(r), c = o.icon;
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ i(Me, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(c, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          o.label,
          /* @__PURE__ */ i(nt, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Oe, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(xi, { family: r, onPick: a, families: n })
      ] }),
      Cf(r, n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(kf, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function xi({ family: e, onPick: t, families: n }) {
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
function Rf(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Af(e, t, n, r, a, o) {
  var Gr, Yr, Qr, Jr, Xr, Zr, ea, ta, na, ra, aa, oa, ia, ca;
  const { chart: c, query: s } = e, l = c.family, u = n.kinds.length === 1 ? n.kinds[0] : Mf(a), d = c.familyOptions ?? {}, f = Array.isArray(d.series) ? d.series : [], h = Array.isArray(d.columns) ? d.columns : [], y = Et(c), p = y[r], g = l === "combo" && n.id === "y", b = l === "table" && n.id === "columns", k = l === "bar" || l === "line" || l === "area", w = ((Yr = (Gr = c.mapping) == null ? void 0 : Gr.series) == null ? void 0 : Yr.mode) === "measures", N = k && n.id === "y", _ = N && w, C = g ? (Qr = f.find((j) => j.member === r)) == null ? void 0 : Qr.label : b ? (Jr = h.find((j) => j.member === r)) == null ? void 0 : Jr.label : _ ? p == null ? void 0 : p.label : void 0, M = g ? (Xr = f.find((j) => j.member === r)) == null ? void 0 : Xr.colorToken : _ ? p == null ? void 0 : p.colorToken : void 0, L = ot(s), V = n.kinds.includes("time") && (L == null ? void 0 : L.dimension) === r, P = V ? L == null ? void 0 : L.granularity : void 0, D = V ? L == null ? void 0 : L.dateRange : void 0, E = g ? ((Zr = f.find((j) => j.member === r)) == null ? void 0 : Zr.render) ?? "line" : void 0, F = l === "line" && n.id === "y", O = l === "bar" && n.id === "y" && c.orientation !== "horizontal", z = ((ta = (ea = c.mapping) == null ? void 0 : ea.series) == null ? void 0 : ta.mode) === "pivot", Q = ((ra = (na = c.mapping) == null ? void 0 : na.series) == null ? void 0 : ra.mode) === "pivot" ? c.mapping.series.meta : void 0, J = (F || O) && (w || z) || g, I = J ? (g ? (aa = f.find((j) => j.member === r)) == null ? void 0 : aa.axis : w ? p == null ? void 0 : p.axis : (oa = Q == null ? void 0 : Q[r]) == null ? void 0 : oa.axis) ?? "left" : void 0, U = (l === "line" || l === "area") && n.id === "y" && w || g && (E === "line" || E === "area"), G = g ? f.find((j) => j.member === r) : void 0, ae = U ? g ? G == null ? void 0 : G.curve : p == null ? void 0 : p.curve : void 0, me = U ? g ? G == null ? void 0 : G.dots : p == null ? void 0 : p.dots : void 0, K = (j) => {
    var sa, la;
    if ((sa = c.mapping) != null && sa.series && c.mapping.series.mode !== "measures") return;
    const se = ((la = c.mapping) != null && la.series && c.mapping.series.mode === "measures" ? c.mapping.series.members : s.measures) ?? [], le = { ...y };
    j && Object.keys(j).length > 0 ? le[r] = j : delete le[r];
    const $t = Ne(c);
    $t && t({
      ...e,
      chart: {
        ...c,
        mapping: { category: { member: $t }, series: mi(se, le) }
      }
    });
  }, R = (j) => {
    const se = f.map((le) => le.member === r ? { ...le, ...j } : le);
    t({ ...e, chart: { ...c, familyOptions: { ...d, series: se } } });
  }, Z = (j) => {
    const se = h.map((le) => le.member === r ? { ...le, ...j } : le);
    t({ ...e, chart: { ...c, familyOptions: { ...d, columns: se } } });
  }, he = (j) => {
    g ? R({ label: j }) : b ? Z({ label: j }) : _ && K({ ...p, label: j });
  }, ve = (j) => {
    g ? R({ colorToken: j ?? void 0 }) : _ && K({ ...p, colorToken: j ?? void 0 });
  }, Ke = (j) => {
    if (!L) return;
    const se = { ...L };
    for (const le of Object.keys(j)) {
      const $t = j[le];
      $t === void 0 ? delete se[le] : se[le] = $t;
    }
    t({ ...e, query: { ...s, timeDimensions: [se] } });
  }, Se = (j) => Ke({ granularity: j }), it = (j) => Ke({ dateRange: j }), ct = (j) => R({ render: j }), Y = (j) => {
    var se, le;
    g ? R({ axis: j }) : _ ? K({ ...p, axis: j }) : ((le = (se = c.mapping) == null ? void 0 : se.series) == null ? void 0 : le.mode) === "pivot" && t(wi(e, l, r, j));
  }, W = (j) => {
    g ? R({ curve: j }) : _ && K({ ...p, curve: j });
  }, pe = (j) => {
    g ? R({ dots: j }) : _ && K({ ...p, dots: j });
  }, st = () => t(zv(e, l, n.id, r, o)), He = (n.id === "x" || n.id === "slices") && (u === "category" || u === "time"), A = (ia = c.mapping) == null ? void 0 : ia.series, T = (A && A.mode === "pivot" ? A.value : At(c)[0]) ?? ((ca = s.measures) == null ? void 0 : ca[0]), $ = He ? u === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...T ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...T ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], H = (() => {
    const j = Rf(s.order)[0];
    if (!j) return "none";
    const [se, le] = j;
    return T && se === T ? le === "desc" ? "value-desc" : "value-asc" : se === r ? u === "time" ? le === "desc" ? "time-desc" : "time-asc" : le === "asc" ? "label-asc" : "label-desc" : "none";
  })(), X = (j) => {
    let se;
    switch (j) {
      case "none":
        se = void 0;
        break;
      case "value-desc":
        se = T ? [[T, "desc"]] : void 0;
        break;
      case "value-asc":
        se = T ? [[T, "asc"]] : void 0;
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
  }, ce = typeof s.limit == "number" ? s.limit : void 0, oe = (j) => t({ ...e, query: { ...s, limit: j && j > 0 ? j : void 0 } }), lt = (l === "bar" || l === "line" || l === "area") && V, Ri = lt && d.comparePrevious === !0;
  return {
    kind: u,
    label: C,
    colorToken: M,
    granularity: P,
    dateRange: D,
    render: E,
    axis: I,
    curve: ae,
    dots: me,
    canLineStyle: U,
    canAxis: J,
    canRename: g || b || _,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: N && w || g,
    isTimeField: V,
    isComboY: g,
    isCategoryField: He,
    sortValue: H,
    sortOptions: $,
    onSort: X,
    limit: ce,
    onLimit: oe,
    canComparePrevious: lt,
    comparePrevious: Ri,
    comparePreviousReady: lt && D !== void 0,
    onComparePrevious: (j) => t({ ...e, chart: { ...c, familyOptions: { ...d, comparePrevious: j || void 0 } } }),
    onRename: he,
    onRecolor: ve,
    onGranularity: Se,
    onDateRange: it,
    onRender: ct,
    onAxis: Y,
    onCurve: W,
    onDots: pe,
    onRemove: st
  };
}
function wi(e, t, n, r) {
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
function Mf(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function qa(e, t, n, r) {
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
function Of(e, t, n, r) {
  const a = Tn(e), o = a.filter((_) => _.type === "view"), c = rn(t, r), s = Object.values(c).flat();
  let l;
  for (const _ of s) {
    const C = Pe(e, _);
    if (C) {
      l = C;
      break;
    }
  }
  const u = !l && n ? Wt(e, n) : void 0, d = l ? Wt(e, l.cube) : u, f = (d == null ? void 0 : d.type) === "view" ? d.name : void 0, h = (l == null ? void 0 : l.connectedComponent) ?? (u == null ? void 0 : u.connectedComponent), y = t.query.measures ?? [], p = y.length ? qt(y[0]) : void 0;
  if (f)
    return { viewLocked: f, relatedCubes: [], views: o, measureSource: p, scopeComponent: h };
  const g = p ?? (l == null ? void 0 : l.cube) ?? (u == null ? void 0 : u.name), b = g ? Wt(e, g) : void 0, k = a.filter((_) => _.type === "cube" && _.connectedComponent !== void 0), N = (h === void 0 ? k : k.filter((_) => _.connectedComponent === h)).filter((_) => _.name !== g).sort((_, C) => _.title.localeCompare(C.title));
  return {
    sourceCube: (b == null ? void 0 : b.type) === "cube" ? b : void 0,
    relatedCubes: N,
    views: o,
    measureSource: p,
    scopeComponent: h
  };
}
const Lf = tt.options;
function Df({
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
        Lf.map((o) => {
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
const zf = vt.options, Tf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function ki({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: o,
  className: c
}) {
  const s = n && n.length > 0 ? n : zf;
  return /* @__PURE__ */ v(
    ze,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: a,
      children: [
        /* @__PURE__ */ i(Fe, { id: o, className: c, children: /* @__PURE__ */ i(Te, { placeholder: r }) }),
        /* @__PURE__ */ i(Ee, { children: s.map((l) => /* @__PURE__ */ i(ye, { value: l, children: Tf[l] }, l)) })
      ]
    }
  );
}
const Ka = { bar: "Bar", line: "Line", area: "Area" }, Ff = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Ef({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: o,
  reorder: c,
  className: s
}) {
  const l = bt(), u = Af(e, t, n, r, a, l), d = (a == null ? void 0 : a.label) ?? r, f = u.label || d, h = u.canColor && o !== void 0, y = u.canRename || h || u.isTimeField || u.isCategoryField || u.isComboY && !!u.render || u.canAxis || u.canLineStyle || !!c, p = (b) => {
    const k = b.trim();
    u.onRename(k.length > 0 ? k : void 0);
  }, g = /* @__PURE__ */ v(re, { children: [
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
        s
      ),
      children: [
        y ? /* @__PURE__ */ v(Ae, { children: [
          /* @__PURE__ */ i(Me, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${f}`,
              children: g
            }
          ) }),
          /* @__PURE__ */ i(Oe, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            u.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                fe,
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
              /* @__PURE__ */ i(Df, { value: u.colorToken, onChange: u.onRecolor })
            ] }) : null,
            u.isTimeField ? /* @__PURE__ */ v(re, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  Mt,
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
                  Mt,
                  {
                    kind: "granularity",
                    value: u.granularity,
                    onChange: u.onGranularity,
                    renderFixed: (b, k) => /* @__PURE__ */ i(ki, { value: b, onChange: k, className: "cv:h-8 cv:w-full" })
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
            u.isCategoryField ? /* @__PURE__ */ v(re, { children: [
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
                  fe,
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
                    u.render === b ? /* @__PURE__ */ i($e, { className: "cv:size-3" }) : null
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
                    u.axis === b ? /* @__PURE__ */ i($e, { className: "cv:size-3" }) : null
                  ]
                },
                b
              )) })
            ] }) : null,
            u.canLineStyle ? /* @__PURE__ */ v(re, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: Ff.map(([b, k]) => /* @__PURE__ */ v(
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
                      (u.curve ?? "monotone") === b ? /* @__PURE__ */ i($e, { className: "cv:size-3" }) : null
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
            c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1", children: [
              /* @__PURE__ */ v(
                B,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canUp,
                  onClick: c.onUp,
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
                  disabled: !c.canDown,
                  onClick: c.onDown,
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
  control: w
}) {
  const N = n.cardinality === "many" && !h, _ = N || r.length === 0, C = r.length, M = f === "vertical", L = p ?? n.label, V = /* @__PURE__ */ i(
    pi,
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
            /* @__PURE__ */ i(St, { className: "cv:size-3.5" }),
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
      className: S("cv:flex cv:flex-col cv:gap-1", !M && "cv:min-w-0"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: L }),
          d ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: d }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        w ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: w }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", M ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          r.map((P, D) => /* @__PURE__ */ i(
            Ef,
            {
              spec: e,
              update: t,
              well: n,
              member: P,
              option: o(P),
              resolvedColor: c(P),
              className: M ? "cv:w-full" : void 0,
              reorder: N && C > 1 && !y ? {
                canUp: D > 0,
                canDown: D < C - 1,
                onUp: () => t(qa(e, n, D, D - 1)),
                onDown: () => t(qa(e, n, D, D + 1))
              } : void 0
            },
            P
          )),
          _ ? V : null
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
  return /* @__PURE__ */ v(Ae, { children: [
    /* @__PURE__ */ i(Me, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2.5 cv:py-1.5 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: e }),
          /* @__PURE__ */ v("span", { className: "cv:flex cv:shrink-0 cv:items-center cv:gap-1 cv:text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "cv:text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(nt, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Oe, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Ur(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...o } } }) };
}
function Pf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ur(e, t), a = di(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.display ?? "number", s = n.gauge, l = (d) => {
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
    /* @__PURE__ */ i(Ut, { label: "Time field", children: /* @__PURE__ */ i(
      hi,
      {
        cube: a,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (d) => l({ dimension: d }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Ut, { label: "Date range", children: /* @__PURE__ */ i(
      Mt,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (d) => l({ dateRange: d }),
        renderFixed: (d, f) => /* @__PURE__ */ i(Wr, { value: d, onChange: f })
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
        value: c,
        onChange: (d) => r({ display: d })
      }
    ) }),
    c === "gauge" ? /* @__PURE__ */ i(Ut, { label: "Gauge max", children: /* @__PURE__ */ i(
      fe,
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
function $f({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Ur(e, t), a = n.comparison, o = a !== void 0, c = x.useRef(void 0);
  a && (c.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      be,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => r({
          comparison: d ? c.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(re, { children: [
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
          onChange: (d) => r({ comparison: { ...a, mode: d } })
        }
      ) }),
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ i(Ut, { label: "Baseline value", children: /* @__PURE__ */ i(
        fe,
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
        /* @__PURE__ */ i(ro, { className: "cv:mt-px cv:size-3.5 cv:shrink-0" }),
        /* @__PURE__ */ v("span", { children: [
          /* @__PURE__ */ i("strong", { className: "cv:font-semibold", children: "A date range is required." }),
          " Set one under “Time, range & display” on the value so the prior period can be computed — without it the comparison shows “set a date range”."
        ] })
      ] }) : null,
      /* @__PURE__ */ i(
        be,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (d) => r({ comparison: { ...a, showAsPercent: d } })
        }
      ),
      /* @__PURE__ */ i(
        be,
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
function If({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Ur(e, t), a = n.sparkline, o = a !== void 0, c = n.comparison !== void 0, s = n.goodDirection ?? "up", l = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      be,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => r({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ i(Ut, { label: "Trend granularity", children: /* @__PURE__ */ i(
        Mt,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(ki, { value: u, onChange: d, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      c ? null : /* @__PURE__ */ i(
        be,
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
function Ut({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function jf({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var W, pe, st, He;
  const { meta: a } = at(), { locale: o } = qe(), c = bt(), { chart: s } = e, l = s.family, u = c.require(l), d = di(e), f = x.useMemo(() => Mn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), h = x.useCallback(
    (A) => A && (o == null ? void 0 : o.unitSystem) === "imperial" && f[A] ? f[A].imperialUnit : A,
    [o == null ? void 0 : o.unitSystem, f]
  ), y = x.useMemo(() => Ov(l, c), [l, c]), p = x.useMemo(() => rn(e, c), [e, c]), g = x.useMemo(() => new Map(y.map((A) => [A.id, A])), [y]), [b, k] = x.useState(void 0), w = x.useMemo(
    () => Of(a, e, b, c),
    [a, e, b, c]
  ), N = x.useMemo(() => Object.values(p).flat(), [p]), _ = x.useCallback(
    (A) => {
      k(A), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), C = x.useMemo(
    () => {
      var A;
      return w.viewLocked ? [w.viewLocked] : [(A = w.sourceCube) == null ? void 0 : A.name, ...w.relatedCubes.map((T) => T.name)].filter(
        Boolean
      );
    },
    [w]
  ), M = x.useMemo(
    () => Object.values(p).every((A) => A.length === 0),
    [p]
  ), L = u.dualAxisY, V = x.useCallback(
    (A, T, $) => u.assignSeriesAxis ? u.assignSeriesAxis(A, T, $) : u.placeField ? A : wi(A, l, T, $),
    [u, l]
  ), P = x.useCallback(
    (A) => {
      var H, X, ce;
      if (l === "combo") {
        const oe = s.familyOptions ?? {}, ue = (Array.isArray(oe.series) ? oe.series : []).find(
          (lt) => lt.member === A
        );
        return (ue == null ? void 0 : ue.axis) === "right" ? "right" : "left";
      }
      const T = (H = s.mapping) == null ? void 0 : H.series;
      return (T && (T.mode === "measures" || T.mode === "pivot") ? (ce = (X = T.meta) == null ? void 0 : X[A]) == null ? void 0 : ce.axis : void 0) === "right" ? "right" : "left";
    },
    [l, s.familyOptions, s.mapping]
  ), D = x.useMemo(() => {
    var ce, oe;
    const A = p.y ?? [], T = (ue) => A.find((lt) => P(lt) === ue), $ = T("left"), H = L ? T("right") : void 0, X = (ue) => ue ? Pe(a, ue) : void 0;
    return {
      leftKey: $ ? It(X($)) : void 0,
      rightKey: H ? It(X(H)) : void 0,
      leftLabel: $ ? Ba(X($), h((ce = X($)) == null ? void 0 : ce.unit)) : void 0,
      rightLabel: H ? Ba(X(H), h((oe = X(H)) == null ? void 0 : oe.unit)) : void 0
    };
  }, [p, L, P, a, h]), E = x.useCallback(
    (A) => {
      const T = It(A), { leftKey: $, rightKey: H } = D;
      return $ === void 0 || T === $ ? "left" : H === void 0 || T === H ? "right" : "left";
    },
    [D]
  ), F = x.useCallback(
    (A, T) => {
      var $;
      if (T) {
        if (w.scopeComponent !== void 0 && T.connectedComponent !== w.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (T.memberType === "measure" && w.measureSource && T.cube !== w.measureSource)
          return `Measures come from one table (${(($ = w.sourceCube) == null ? void 0 : $.title) ?? w.measureSource}). Remove them to switch.`;
        if (A === "y" && T.memberType === "measure") {
          const { leftKey: H, rightKey: X, leftLabel: ce, rightLabel: oe } = D, ue = It(T);
          if (L) {
            if (H !== void 0 && X !== void 0 && ue !== H && ue !== X)
              return `Both axes show ${ce} & ${oe} — remove one to add a third unit.`;
          } else if (H !== void 0 && ue !== H)
            return `This axis shows ${ce}; ${T.label ?? "this field"} is ${gr(T)}`;
        }
      }
    },
    [w, D, L]
  ), O = L ? [D.leftLabel, D.rightLabel].filter(Boolean).join(" · ") || void 0 : D.leftLabel, z = x.useMemo(() => {
    var T;
    const A = {};
    if (l === "bar" || l === "line" || l === "area") {
      const $ = (T = s.mapping) == null ? void 0 : T.series;
      if ($ && $.mode === "measures") {
        const H = $.members.map((ce) => {
          var oe, ue;
          return { key: ce, colorToken: (ue = (oe = $.meta) == null ? void 0 : oe[ce]) == null ? void 0 : ue.colorToken };
        }), X = cr(H, s.colors);
        $.members.forEach((ce, oe) => {
          A[ce] = X[oe];
        });
      }
    } else if (l === "combo") {
      const $ = s.familyOptions ?? {}, H = Array.isArray($.series) ? $.series : [], X = H.map((oe) => ({ key: oe.member, colorToken: oe.colorToken })), ce = cr(X, s.colors);
      H.forEach((oe, ue) => {
        A[oe.member] = ce[ue];
      });
    }
    return A;
  }, [l, s.mapping, s.colors, s.familyOptions]), Q = x.useCallback(
    (A, T, $) => {
      const H = Pe(a, T);
      if (F(A, H)) return;
      let X = za(e, l, A, T, $, c);
      L && A === "y" && (X = V(X, T, E(H))), t(X);
    },
    [F, a, t, e, l, L, E, V, c]
  ), J = x.useCallback(
    (A, T) => {
      var X;
      if (!T) return;
      if (w.scopeComponent !== void 0 && T.connectedComponent !== w.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (T.memberType === "measure" && w.measureSource && T.cube !== w.measureSource)
        return `Measures come from one table (${((X = w.sourceCube) == null ? void 0 : X.title) ?? w.measureSource}). Remove them to switch.`;
      const $ = A === "left" ? D.leftKey : D.rightKey, H = A === "left" ? D.leftLabel : D.rightLabel;
      if ($ !== void 0 && It(T) !== $)
        return `This axis shows ${H}; ${T.label ?? "this field"} is ${gr(T)}`;
    },
    [w, D]
  ), I = x.useCallback(
    (A, T, $) => {
      const H = Pe(a, T);
      J(A, H) || t(V(za(e, l, "y", T, $, c), T, A));
    },
    [J, a, t, e, l, V, c]
  ), q = l === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : u.zones, te = q.left.map((A) => g.get(A)).filter(Boolean), U = q.bottom.map((A) => g.get(A)).filter(Boolean), G = (W = p.color) == null ? void 0 : W[0], ae = ((pe = p.y) == null ? void 0 : pe.length) ?? 0, me = G && ae > 1 ? `${ae} measures × ${((st = Pe(a, G)) == null ? void 0 : st.label) ?? "this split"} — one series per measure per value.` : void 0, K = u.hasLegend, R = p.y ?? [], Z = R.find((A) => P(A) !== "right"), he = L ? R.find((A) => P(A) === "right") : void 0, ve = (A) => {
    var H, X, ce, oe;
    if (!A) return;
    const T = (H = s.mapping) == null ? void 0 : H.series;
    return (T && T.mode === "measures" ? (ce = (X = T.meta) == null ? void 0 : X[A]) == null ? void 0 : ce.label : void 0) ?? ((oe = Pe(a, A)) == null ? void 0 : oe.label);
  }, Ke = (A) => {
    var $, H, X, ce;
    const T = (oe, ue) => ue ? /* @__PURE__ */ i(Va, { spec: e, update: t, axis: oe, title: "Title", auto: ve(ue) }) : null;
    switch (A) {
      case "y":
        return T("y", Z);
      // single value axis (bar / area)
      case "x":
        return T("x", (H = ($ = s.mapping) == null ? void 0 : $.category) == null ? void 0 : H.member);
      case "sy":
        return T("y", (X = p.sy) == null ? void 0 : X[0]);
      // scatter Y axis
      case "sx":
        return T("x", (ce = p.sx) == null ? void 0 : ce[0]);
      // scatter X axis
      default:
        return null;
    }
  }, Se = (A, T) => /* @__PURE__ */ i(
    Ha,
    {
      spec: e,
      update: t,
      well: A,
      placed: p[A.id] ?? [],
      allPlaced: N,
      optionFor: ($) => Pe(a, $),
      colorFor: ($) => z[$],
      scope: w,
      blockReason: ($) => F(A.id, $),
      onAdd: ($, H) => Q(A.id, $, H),
      badge: A.id === "y" ? O : void 0,
      orientation: T,
      note: A.id === "color" ? me : void 0,
      control: Ke(A.id)
    },
    A.id
  ), it = g.get("y"), ct = (A) => {
    if (!it) return null;
    const T = A === "left" ? Z : he;
    return /* @__PURE__ */ i(
      Ha,
      {
        spec: e,
        update: t,
        well: it,
        label: A === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter(($) => P($) === A),
        allPlaced: N,
        optionFor: ($) => Pe(a, $),
        colorFor: ($) => z[$],
        scope: w,
        blockReason: ($) => J(A, $),
        onAdd: ($, H) => I(A, $, H),
        badge: A === "left" ? D.leftLabel : D.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: T ? /* @__PURE__ */ i(
          Va,
          {
            spec: e,
            update: t,
            axis: A === "left" ? "y" : "y2",
            title: "Title",
            auto: ve(T)
          }
        ) : null
      },
      `y-${A}`
    );
  }, Y = () => {
    const A = g.get("value"), T = (p.value ?? []).length > 0, $ = s.familyOptions ?? {};
    return /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        A ? Se(A, "vertical") : null,
        T ? /* @__PURE__ */ i(
          Xn,
          {
            label: "Time, range & display",
            summary: $.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(Pf, { spec: e, update: t })
          }
        ) : null
      ] }),
      T ? /* @__PURE__ */ v(re, { children: [
        /* @__PURE__ */ i(Xn, { label: "Comparison", summary: $.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i($f, { spec: e, update: t }) }),
        /* @__PURE__ */ i(Xn, { label: "Sparkline", summary: $.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(If, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      M ? null : /* @__PURE__ */ i(_f, { spec: e, update: t }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          yf,
          {
            currentName: w.viewLocked ?? ((He = w.sourceCube) == null ? void 0 : He.name),
            hasFields: N.length > 0,
            onSelect: _
          }
        ),
        /* @__PURE__ */ i(gf, { spec: e, update: t, cube: d, scopeCubes: C, scope: w })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      te.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", u.sidebarWidthClass), children: l === "kpi" ? Y() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        te.flatMap(
          (A) => L && A.id === "y" ? [ct("left"), ct("right")] : [Se(A, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          r,
          /* @__PURE__ */ i(Sf, { spec: e, update: t, empty: M })
        ] }),
        U.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          U.map((A) => Se(A, "horizontal")),
          K && !M ? /* @__PURE__ */ i(xf, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Ba(e, t) {
  const n = gr(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Ci(e, t) {
  const n = x.useRef(e);
  x.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = x.useRef(null);
  return x.useEffect(
    () => () => {
      r.current !== null && clearTimeout(r.current);
    },
    []
  ), x.useCallback(
    (...a) => {
      r.current !== null && clearTimeout(r.current), r.current = setTimeout(() => {
        r.current = null, n.current(...a);
      }, t);
    },
    [t]
  );
}
function Zn(e) {
  const t = _o.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Vf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = x.useState(() => ({
    spec: e,
    issues: Zn(e)
  })), [o, c] = x.useState(e);
  x.useEffect(() => {
    a({ spec: e, issues: Zn(e) }), c(e);
  }, [e]);
  const s = Ci((h) => t(h), n), l = r.spec, u = r.issues, d = u.length === 0, f = x.useCallback(
    (h) => {
      const y = Zn(h);
      a({ spec: h, issues: y }), y.length === 0 && (c(h), s(h));
    },
    [s]
  );
  return { draft: l, issues: u, valid: d, committed: o, update: f };
}
const qf = () => {
};
function Kf({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: o
}) {
  const { draft: c, issues: s, valid: l, committed: u, update: d } = Vf({
    spec: e,
    onChange: t ?? qf,
    debounceMs: r
  }), f = u, h = (N) => {
    var _, C, M;
    return (((_ = N.measures) == null ? void 0 : _.length) ?? 0) > 0 || (((C = N.dimensions) == null ? void 0 : C.length) ?? 0) > 0 || (((M = N.timeDimensions) == null ? void 0 : M.some((L) => typeof L.granularity == "string")) ?? !1);
  }, y = (N) => {
    var _;
    return (((_ = N.measures) == null ? void 0 : _.length) ?? 0) > 0;
  }, p = c.chart.family !== "table", g = h(c.query) && h(f.query) && (!p || y(c.query) && y(f.query)), b = p && !y(c.query) ? `Add a value (measure) to build this ${c.chart.family} chart.` : "Add fields from the axes to build this chart.", k = g ? /* @__PURE__ */ i(Vr, { query: f.query, chart: f.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: b }) }), w = n ? /* @__PURE__ */ v(B, { size: "sm", disabled: !l, onClick: () => n(u), children: [
    /* @__PURE__ */ i(ho, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2", a ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        l ? null : /* @__PURE__ */ v(Ar, { variant: "destructive", children: [
          /* @__PURE__ */ i(oo, { className: "cv:size-4" }),
          /* @__PURE__ */ i(Mr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(Or, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            s.slice(0, 3).map((N, _) => /* @__PURE__ */ v("li", { children: [
              N.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: N.path }) : null,
              " ",
              N.message
            ] }, _)),
            s.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              s.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(jf, { spec: c, update: d, toolbar: w, children: k }) })
      ]
    }
  );
}
function Hf({
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
  const y = a || o, [p, g] = x.useState(!1);
  x.useEffect(() => {
    if (!p) return;
    const k = setTimeout(() => g(!1), 1600);
    return () => clearTimeout(k);
  }, [p]), x.useEffect(() => {
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
          fe,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (k) => t(k.target.value),
            className: "cv:h-8 cv:w-full cv:min-w-0 cv:flex-1 cv:sm:w-auto"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-center cv:gap-1", children: [
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(ao, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(Cr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(ic, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ i(cc, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          y ? /* @__PURE__ */ v(re, { children: [
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !c,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(sc, {})
              }
            ),
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ i(lc, {})
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
                /* @__PURE__ */ i(uc, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ v(
            B,
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
                p ? /* @__PURE__ */ i($e, {}) : /* @__PURE__ */ i(ho, {}),
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
const Ni = "lg", Si = 12;
function Bf(e, t) {
  const n = t[Ni];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const c = o.reduce((s, l) => Math.max(s, l.x + l.w), 0);
    c > a && (r = o, a = c);
  }
  return r ?? e;
}
function Wf(e, t) {
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
const Uf = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Gf(e, t, n, r = Si) {
  const a = Uf[n], o = Math.min(a.w, r), c = e.reduce((s, l) => Math.max(s, l.y + l.h), 0);
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
function _i(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? Si) {
  const a = Gf(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Yf(e, t, n) {
  const r = e.widgets.find((o) => o.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  return a.id = n, _i(e, a);
}
function Qf(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Jf(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Xf = 12, Zf = 900, eh = 0.4;
function th(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function nh({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: o,
  onLayoutChange: c
}) {
  const [s, l] = Ho(), u = e.grid ?? {}, d = u.cols ?? Xf, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], y = u.containerPadding ?? [0, 0], p = Math.max(eh, Math.min(1, l / Zf)), g = Math.round(p / 0.05) * 0.05, b = Math.max(8, Math.round(f * g)), k = [
    Math.round(h[0] * g),
    Math.round(h[1] * g)
  ], w = [
    Math.round(y[0] * g),
    Math.round(y[1] * g)
  ], N = x.useMemo(
    () => ({ [Ni]: th(e.layout) }),
    [e.layout]
  ), _ = x.useMemo(
    () => new Map(e.widgets.map((P) => [P.id, P])),
    [e.widgets]
  ), C = x.useRef(c);
  x.useEffect(() => {
    C.current = c;
  }, [c]);
  const M = x.useRef(e.layout);
  x.useEffect(() => {
    M.current = e.layout;
  }, [e.layout]);
  const L = x.useRef(null), V = x.useCallback(
    (P, D) => {
      const F = Bf(P, D).map((O) => ({ ...O }));
      rh(M.current, F) || C.current(F);
    },
    []
  );
  return /* @__PURE__ */ i(Ir, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    go,
    {
      width: l,
      layouts: N,
      breakpoints: { lg: 0 },
      cols: { lg: d },
      rowHeight: b,
      margin: k,
      containerPadding: w,
      dragConfig: { enabled: !0, handle: `.${pn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: V,
      children: e.layout.map((P) => {
        const D = _.get(P.i);
        if (!D) return null;
        const E = D.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${D.title ?? D.type}`,
              "aria-pressed": E,
              onPointerDown: (F) => {
                L.current = { x: F.clientX, y: F.clientY };
              },
              onClick: (F) => {
                const O = L.current;
                O && Math.hypot(F.clientX - O.x, F.clientY - O.y) > 5 || n(D.id);
              },
              onKeyDown: (F) => {
                (F.key === "Enter" || F.key === " ") && (F.preventDefault(), n(D.id));
              },
              className: S(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                E ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(vr, { widget: D, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(pn, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${D.title ?? D.type}`,
                      onClick: (F) => {
                        F.stopPropagation(), r(D.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(dc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${D.title ?? D.type}`,
                      onClick: (F) => {
                        F.stopPropagation(), a(D.id);
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
                      "aria-label": `Delete ${D.title ?? D.type}`,
                      onClick: (F) => {
                        F.stopPropagation(), o(D.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-destructive cv:hover:text-destructive-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Ot, {})
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
function rh(e, t) {
  if (e.length !== t.length) return !1;
  const n = new Map(e.map((r) => [r.i, r]));
  for (const r of t) {
    const a = n.get(r.i);
    if (!a || a.x !== r.x || a.y !== r.y || a.w !== r.w || a.h !== r.h) return !1;
  }
  return !0;
}
const ah = x.memo(nh);
function oh(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function ih({
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
  const a = bo({
    extensions: [xo],
    editable: !0,
    content: oh(e.doc),
    onUpdate: ({ editor: o }) => {
      const c = o.getJSON();
      n.current({ ...r.current, doc: c });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(
          Bo,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return a ? /* @__PURE__ */ i(de, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(ch, { editor: a }),
    /* @__PURE__ */ i(yo, { editor: a })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function Je({ active: e, onClick: t, title: n, children: r }) {
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
function ch({ editor: e }) {
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
          Je,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(vc, {})
          }
        ),
        /* @__PURE__ */ i(
          Je,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(fc, {})
          }
        ),
        /* @__PURE__ */ i(
          Je,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(hc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Je,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(pc, {})
          }
        ),
        /* @__PURE__ */ i(
          Je,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(gc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Je,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(bc, {})
          }
        ),
        /* @__PURE__ */ i(
          Je,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(yc, {})
          }
        ),
        /* @__PURE__ */ i(
          Je,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(xc, {})
          }
        )
      ]
    }
  );
}
const sh = Sr(
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
function lh({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: S(sh({ variant: t }), e), ...n });
}
function uh({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: o
}) {
  const { meta: c, isLoading: s } = at(), l = x.useMemo(() => Tn(c), [c]), u = l.filter((h) => h.type === "cube"), d = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(ze, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ i(Fe, { id: a, className: o, children: /* @__PURE__ */ i(Te, { placeholder: s ? "Loading…" : n, children: f ? /* @__PURE__ */ i(er, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v(Ee, { children: [
      d.length > 0 ? /* @__PURE__ */ v(ur, { children: [
        /* @__PURE__ */ i(dr, { children: "Views" }),
        d.map((h) => /* @__PURE__ */ i(ye, { value: h.name, children: /* @__PURE__ */ i(er, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(ur, { children: [
        /* @__PURE__ */ i(dr, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(ye, { value: h.name, children: /* @__PURE__ */ i(er, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function er({ option: e }) {
  const t = e.type === "view" ? Nr : mo;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(lh, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const dh = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function mh(e) {
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
function vh({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (s) => n({ ...e, control: { ...e.control, control: s } }), o = (s) => n({ ...e, control: { ...e.control, variable: s } }), c = (s) => {
    s !== r.kind && a(mh(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col", children: [
    /* @__PURE__ */ i(
      de,
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
              /* @__PURE__ */ i(Fe, { children: /* @__PURE__ */ i(Te, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Ee, { children: t.map((s) => /* @__PURE__ */ i(ye, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(de, { label: "Control", children: /* @__PURE__ */ v(ze, { value: r.kind, onValueChange: (s) => c(s), children: [
      /* @__PURE__ */ i(Fe, { children: /* @__PURE__ */ i(Te, {}) }),
      /* @__PURE__ */ i(Ee, { children: Hc.options.map((s) => /* @__PURE__ */ i(ye, { value: s, children: dh[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ i(fh, { control: r, onChange: a, variables: t })
  ] });
}
function fh({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(hh, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(gh, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(bh, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(yh, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(xh, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(wh, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function hh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ i(
      de,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          ph,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ i(
      be,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function ph({
  selected: e,
  onChange: t
}) {
  const [n, r] = x.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), o = (s) => {
    const l = new Set(a);
    l.has(s) ? l.delete(s) : l.add(s), t(un.filter((u) => l.has(u.value)).map((u) => u.value));
  }, c = a.size === 0 ? "Default set" : a.size === un.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Ae, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Me, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: c }),
      /* @__PURE__ */ i(nt, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Oe, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: un.map((s) => {
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
                children: l ? /* @__PURE__ */ i($e, { className: "cv:size-3" }) : null
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
function gh({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (s) => {
    const l = new Set(r);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = vt.options.filter((d) => l.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((s) => s.type === "dateRange" || s.type === "time"), c = "__none__";
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ i(
      de,
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
              /* @__PURE__ */ i(Fe, { children: /* @__PURE__ */ i(Te, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Ee, { children: [
                /* @__PURE__ */ i(ye, { value: c, children: "None" }),
                o.map((s) => /* @__PURE__ */ i(ye, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(de, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: vt.options.map((s) => {
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
function bh({
  control: e,
  onChange: t
}) {
  const n = (o, c) => {
    const s = e.options.map(
      (l, u) => u === o ? { value: c.value ?? String(l.value), label: c.label ?? l.label } : l
    );
    t({ ...e, options: s });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (o) => t({ ...e, options: e.options.filter((c, s) => s !== o) });
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ i(
      be,
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
          /* @__PURE__ */ i(St, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "No options yet." }) : e.options.map((o, c) => /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5", children: [
          /* @__PURE__ */ i(
            fe,
            {
              className: "cv:flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (s) => n(c, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            fe,
            {
              className: "cv:flex-1",
              placeholder: "Value",
              value: String(o.value),
              onChange: (s) => n(c, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            B,
            {
              variant: "ghost",
              size: "icon",
              className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground",
              "aria-label": "Remove option",
              onClick: () => a(c),
              children: /* @__PURE__ */ i(Ot, {})
            }
          )
        ] }, c)) })
      }
    )
  ] });
}
function yh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ i(de, { label: "From", children: /* @__PURE__ */ v(
      ze,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Fe, { children: /* @__PURE__ */ i(Te, {}) }),
          /* @__PURE__ */ v(Ee, { children: [
            /* @__PURE__ */ i(ye, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(ye, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(ye, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
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
          uh,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function xh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ i(de, { label: "Placeholder", children: /* @__PURE__ */ i(
    fe,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function wh({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ i(de, { label: a, children: /* @__PURE__ */ i(
    fe,
    {
      type: "number",
      value: e[r] ?? "",
      onChange: (o) => {
        const c = o.target.value;
        t({ ...e, [r]: c === "" ? void 0 : Number(c) });
      }
    }
  ) });
  return /* @__PURE__ */ v(re, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function kh(e) {
  return { schemaVersion: wt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Ch(e) {
  const t = {
    schemaVersion: wt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Nh(e, t) {
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
  const o = r ? (c) => r([...t, c]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", a && "cv:h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      de,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ i(
          fe,
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
      /* @__PURE__ */ i(Ir, { spec: kh(t), children: /* @__PURE__ */ i(of, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(a && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        Kf,
        {
          fill: a,
          spec: Ch(e),
          onChange: (c) => n(Nh(e, c))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(ih, { widget: e, onChange: n }) : /* @__PURE__ */ i(vh, { widget: e, variables: t, onChange: n })
  ] });
}
function Sh({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: o,
  regionId: c,
  className: s
}) {
  const l = /* @__PURE__ */ v(re, { children: [
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
function _h({
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
  const u = o !== void 0, [d, f] = x.useState(a), h = r ? u ? o : d : !0, y = x.useId(), p = x.useCallback(() => {
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
          Sh,
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
function Rh(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Ah(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Mh(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Oh(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Lh(e, t) {
  switch (e) {
    case "chart":
      return Ah(t);
    case "text":
      return Mh(t);
    case "input":
      return Oh(t);
  }
}
function Dh(e) {
  return { name: e, type: "string" };
}
function zh(e) {
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
function Th({
  variables: e,
  onChange: t,
  newName: n
}) {
  const r = x.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((d) => d.name === u));
    return u;
  }, o = (u, d) => {
    t(e.map((f, h) => h === u ? Fh(f, d) : f));
  }, c = (u) => t(e.filter((d, f) => f !== u)), s = () => t([...e, Dh(a())]), l = (u, d) => {
    const f = u + d;
    if (f < 0 || f >= e.length) return;
    const h = e.slice();
    [h[u], h[f]] = [h[f], h[u]], t(h);
  };
  return /* @__PURE__ */ i(
    _h,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: s, children: [
        /* @__PURE__ */ i(St, {}),
        " Add variable"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ v("div", { className: "cv:rounded-md cv:border cv:border-dashed cv:border-border cv:p-4 cv:text-center", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "No variables yet" }),
        /* @__PURE__ */ v("p", { className: "cv:mt-0.5 cv:text-xs cv:text-muted-foreground", children: [
          "Variables bind input controls and resolve ",
          "{var}",
          " tokens in queries."
        ] }),
        /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: "cv:mt-3", onClick: s, children: [
          /* @__PURE__ */ i(St, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, d) => /* @__PURE__ */ i(
        Eh,
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
function Fh(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = zh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Eh({
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
              onClick: () => l((d) => !d),
              className: "cv:flex cv:size-6 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4",
              children: s ? /* @__PURE__ */ i(nt, {}) : /* @__PURE__ */ i(en, {})
            }
          ),
          /* @__PURE__ */ i(
            fe,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
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
                onClick: () => c(-1),
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
                onClick: () => c(1),
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
                children: /* @__PURE__ */ i(Ot, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive", children: u }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5", children: [
          /* @__PURE__ */ i(de, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(ze, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ i(Fe, { children: /* @__PURE__ */ i(Te, {}) }),
            /* @__PURE__ */ i(Ee, { children: No.options.map((d) => /* @__PURE__ */ i(ye, { value: d, children: Ua[d] }, d)) })
          ] }) }),
          /* @__PURE__ */ i(de, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
            fe,
            {
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (d) => a({ label: d.target.value })
            }
          ) }),
          /* @__PURE__ */ i(
            be,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (d) => a({ array: d })
            }
          ),
          /* @__PURE__ */ i(Ph, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function Ph({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ i(
      be,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (a) => t(a)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(de, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
      fe,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (a) => {
          const o = a.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : $h(e.default);
  return /* @__PURE__ */ i(de, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    fe,
    {
      value: r,
      placeholder: Ih(e.type),
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
function $h(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Ih(e) {
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
function pp({
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
  var it, ct;
  const [p, g] = x.useState(e), [b, k] = x.useState(e);
  x.useEffect(() => {
    g(e), k(e);
  }, [e]);
  const [w, N] = x.useState(null), _ = x.useRef(0), [C, M] = x.useState(null), L = x.useRef(w), V = x.useRef(C), P = x.useRef(p);
  x.useEffect(() => {
    L.current = w, V.current = C, P.current = p;
  });
  const D = x.useRef(null);
  D.current === null && (D.current = o ?? Rh());
  const E = o ?? D.current, F = Ci(
    (Y) => r == null ? void 0 : r(Y),
    c
  ), O = x.useCallback(
    (Y) => {
      _.current = Date.now(), g((W) => {
        const pe = Y(W);
        return F(pe), pe;
      });
    },
    [F]
  ), z = x.useRef(t);
  x.useEffect(() => {
    if (!t || t === z.current) return;
    const Y = 500;
    let W = null;
    const pe = () => {
      var T;
      const st = Date.now() - _.current;
      if (st < Y) {
        W = setTimeout(pe, Y - st);
        return;
      }
      z.current = t;
      const He = /* @__PURE__ */ new Set();
      ((T = V.current) == null ? void 0 : T.kind) === "widget" && He.add(V.current.id), L.current && He.add(L.current);
      const A = qh(t, P.current, He);
      g(A), n == null || n(A);
    };
    return pe(), () => {
      W && clearTimeout(W);
    };
  }, [t]);
  const Q = x.useCallback(
    (Y) => {
      const W = Lh(Y, E());
      O((pe) => _i(pe, W)), N(W.id), M({ kind: "widget", id: W.id });
    },
    [O, E]
  ), J = x.useCallback((Y) => N(Y), []), I = x.useCallback((Y) => {
    N(Y), M({ kind: "widget", id: Y });
  }, []), q = x.useCallback(
    (Y) => {
      O((W) => Qf(W, Y)), N((W) => W === Y ? null : W), M((W) => (W == null ? void 0 : W.kind) === "widget" && W.id === Y ? null : W);
    },
    [O]
  ), te = x.useCallback(
    (Y) => {
      const W = E();
      O((pe) => Yf(pe, Y, W)), N(W);
    },
    [O, E]
  ), U = x.useCallback(
    (Y) => O((W) => Jf(W, Y)),
    [O]
  ), G = x.useCallback(
    (Y) => O((W) => {
      const pe = Wf(W.layout, Y);
      return Vh(W.layout, pe) ? W : { ...W, layout: pe };
    }),
    [O]
  ), ae = x.useCallback(
    (Y) => O((W) => ({ ...W, name: Y || void 0 })),
    [O]
  ), me = x.useCallback(
    (Y) => O((W) => ({ ...W, variables: Y })),
    [O]
  ), K = x.useDeferredValue(p), R = x.useMemo(
    () => rr.safeParse(K),
    [K]
  ), Z = x.useCallback(() => {
    const Y = rr.safeParse(p);
    Y.success && (a == null || a(Y.data), k(p));
  }, [p, a]), he = p !== b, ve = (C == null ? void 0 : C.kind) === "widget" ? p.widgets.find((Y) => Y.id === C.id) ?? null : null;
  x.useEffect(() => {
    (C == null ? void 0 : C.kind) === "widget" && !p.widgets.some((Y) => Y.id === C.id) && M(null);
  }, [C, p.widgets]);
  const Ke = x.useCallback(() => M(null), []), Se = (C == null ? void 0 : C.kind) === "variables" ? "Dashboard variables" : ve ? ve.title ?? `${jh(ve.type)} widget` : "";
  return /* @__PURE__ */ i($r, { families: h, children: /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((ct = (it = p.grid) == null ? void 0 : it.margin) == null ? void 0 : ct[0]) ?? 12 },
      className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", y),
      children: [
        /* @__PURE__ */ i(
          Hf,
          {
            name: p.name ?? "",
            onNameChange: ae,
            onAdd: Q,
            onEditVariables: () => M({ kind: "variables" }),
            onUndo: s,
            onRedo: l,
            canUndo: u,
            canRedo: d,
            onDiscard: f,
            discardDisabled: !he,
            onSave: a ? Z : void 0,
            saveDisabled: !R.success || !he,
            className: "cv:shrink-0"
          }
        ),
        R.success ? null : /* @__PURE__ */ v("p", { className: "cv:shrink-0 cv:text-xs cv:text-destructive", children: [
          R.error.issues.length,
          " validation issue",
          R.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-y-auto cv:pb-4", children: C ? null : /* @__PURE__ */ i(
          ah,
          {
            spec: p,
            selectedId: w,
            onSelect: J,
            onEdit: I,
            onDuplicate: te,
            onDelete: q,
            onLayoutChange: G
          }
        ) }),
        C ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": Se,
            className: "cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background",
            children: [
              /* @__PURE__ */ v("header", { className: "cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5", children: [
                /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                  /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", onClick: Ke, children: [
                    /* @__PURE__ */ i(kr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: Se })
                ] }),
                ve ? /* @__PURE__ */ v(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => q(ve.id),
                    children: [
                      /* @__PURE__ */ i(Ot, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: C.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(Th, { variables: p.variables, onChange: me }) }) : (ve == null ? void 0 : ve.type) === "chart" ? /* @__PURE__ */ i(
                Wa,
                {
                  fill: !0,
                  widget: ve,
                  variables: p.variables,
                  onChange: U,
                  onVariablesChange: me
                }
              ) : ve ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                Wa,
                {
                  widget: ve,
                  variables: p.variables,
                  onChange: U,
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
function jh(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Vh(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n], a = t[n];
    if (r.i !== a.i || r.x !== a.x || r.y !== a.y || r.w !== a.w || r.h !== a.h || r.minW !== a.minW || r.minH !== a.minH || r.static !== a.static)
      return !1;
  }
  return !0;
}
function qh(e, t, n) {
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
  $s as AreaChartFamily,
  ws as AreaFamilyOptionsSchema,
  Vc as AxesOptionsSchema,
  Kn as AxisOptionsSchema,
  op as BUILTIN_CHART_FAMILIES,
  Ye as BUILTIN_DEFAULTS,
  Ge as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Es as BarChartFamily,
  ys as BarFamilyOptionsSchema,
  Ni as CANONICAL_BREAKPOINT,
  tt as ChartColorTokenSchema,
  jf as ChartEditOverlay,
  Kf as ChartEditor,
  Ec as ChartFamilySchema,
  Co as ChartOptionsSchema,
  zl as ChartRenderer,
  _o as ChartSpecSchema,
  hp as ChartView,
  Wc as ChartWidgetSchema,
  qc as ColorAssignmentSchema,
  ml as ComboChartFamily,
  Ms as ComboFamilyOptionsSchema,
  As as ComboSeriesOptSchema,
  _s as CondFormatRuleSchema,
  Vr as CubeChart,
  Yd as CubeChartSpec,
  ko as CubeQuerySchema,
  On as CubeVizContext,
  mp as CubeVizProvider,
  xe as DEFAULT_COLOR_RAMP,
  Si as DEFAULT_COLS,
  lr as DEFAULT_UNIT_CONVERSIONS,
  pn as DRAG_HANDLE_CLASS,
  fp as Dashboard,
  pp as DashboardEditor,
  Ir as DashboardProvider,
  rr as DashboardSpecSchema,
  tr as DateRangeSchema,
  Os as EMPTY_FAMILY_DEFAULT,
  fa as EM_DASH,
  ah as EditorCanvas,
  Hf as EditorToolbar,
  $r as FamilyRegistryOverride,
  uf as FilterBuilder,
  Dc as FilterOperatorSchema,
  Pc as FormatKindSchema,
  Nn as FormatOptionsSchema,
  is as GRANULARITY_PATTERN,
  vt as GranularitySchema,
  Jc as GridConfigSchema,
  Hc as InputControlKindSchema,
  Bc as InputControlSchema,
  vh as InputWidgetEditor,
  Gc as InputWidgetSchema,
  gm as InputWidgetView,
  Bs as KpiFamily,
  Ns as KpiFamilyOptionsSchema,
  Qc as LayoutItemSchema,
  zc as LeafFilterSchema,
  Ic as LegendOptionsSchema,
  Ps as LineChartFamily,
  xs as LineFamilyOptionsSchema,
  ne as MemberSchema,
  da as OrderDirSchema,
  Fc as OrderSpecSchema,
  Is as PieChartFamily,
  ks as PieFamilyOptionsSchema,
  nr as QueryFilterSchema,
  tn as ReferenceLineOptSchema,
  vr as RenderWidget,
  wt as SCHEMA_VERSION,
  Lc as ScalarSchema,
  Vs as ScatterChartFamily,
  Cs as ScatterFamilyOptionsSchema,
  $c as SeriesMappingSchema,
  ma as SeriesMetaSchema,
  Ro as SpecSchema,
  Ss as TableColumnOptSchema,
  rl as TableFamily,
  Rs as TableFamilyOptionsSchema,
  ih as TextWidgetEditor,
  Uc as TextWidgetSchema,
  Jd as TextWidgetView,
  Tc as TimeDimensionSchema,
  Kc as TipTapDocSchema,
  jc as TooltipOptionsSchema,
  vn as VarRefSchema,
  Xc as VariableDeclSchema,
  No as VariableTypeSchema,
  wo as VariableValueSchema,
  Th as VariablesPanel,
  Jo as WidgetChrome,
  Wa as WidgetEditPanel,
  Yc as WidgetSpecSchema,
  _i as appendWidget,
  Sl as areaChartFamily,
  ba as assignColors,
  Ld as axisKey,
  Cl as barChartFamily,
  Pr as buildFamilyRegistry,
  dp as builtinCharts,
  Ue as builtinFamilyDescriptors,
  _n as builtinFamilyRegistry,
  Ol as comboChartFamily,
  ts as createCubeClient,
  Rh as createIdFactory,
  Ql as createQueryResolver,
  qo as createUnitsFormatter,
  Jl as createVariableStore,
  ls as datePattern,
  ar as deepMerge,
  Er as defaultChartFamilies,
  zh as defaultForType,
  Lr as defaultFormatter,
  ns as fetchMeta,
  lp as formatCategory,
  Ht as formatDateValue,
  _t as isEmptyValue,
  De as isVarRef,
  Al as kpiChartFamily,
  Nl as lineChartFamily,
  es as loadSpec,
  Ao as looksLikeIsoDate,
  Oo as makeChartFormat,
  sp as makeDateFormatter,
  up as makeFormatter,
  Wf as mergeLayout,
  Mn as mergeUnitConversions,
  Ah as newChartWidget,
  Oh as newInputWidget,
  Mh as newTextWidget,
  Dh as newVariable,
  Lh as newWidget,
  jl as normalize,
  Bf as pickCanonicalLayout,
  _l as pieChartFamily,
  Gf as placeNewItem,
  zd as quantityLabel,
  Qf as removeWidget,
  Jf as replaceWidget,
  $d as resolveChart,
  Dl as resolveOptions,
  Ls as resolveOptionsWith,
  Vo as resolveQuery,
  cr as resolveSeriesColors,
  Wl as resolveValue,
  ip as safeLoadSpec,
  Rl as scatterChartFamily,
  Ml as tableChartFamily,
  ss as toDate,
  Fl as toResultAnnotation,
  Vf as useChartEditorState,
  Ho as useContainerWidth,
  at as useCubeMeta,
  jd as useCubeQuery,
  qe as useCubeVizContext,
  Ko as useDashboard,
  Ci as useDebouncedCallback,
  bt as useFamilyRegistry,
  vp as useFormatter,
  Yn as useNormalizedSeries,
  jr as useOptionalDashboard,
  cp as validateSpec
};
//# sourceMappingURL=index.js.map
