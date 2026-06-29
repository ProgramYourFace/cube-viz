import { jsx as i, jsxs as v, Fragment as ie } from "react/jsx-runtime";
import * as hr from "recharts";
import { BarChart as bi, CartesianGrid as Gt, YAxis as je, XAxis as xt, Bar as qa, LabelList as Ka, ReferenceLine as Yt, LineChart as yi, Line as Ha, AreaChart as Ba, Area as pr, PieChart as xi, Pie as wi, Cell as Wa, Label as ki, ScatterChart as Ci, ZAxis as Ni, Scatter as Si, RadialBarChart as _i, PolarAngleAxis as Ri, RadialBar as Ai, ResponsiveContainer as Mi, ComposedChart as Oi } from "recharts";
import * as x from "react";
import { createContext as Ua, useContext as gr, useMemo as ee, useState as wt, useCallback as Ge, useEffect as Qt, useRef as gt, createElement as Li, useSyncExternalStore as Di, useId as zi } from "react";
import { clsx as Ti } from "clsx";
import { extendTailwindMerge as Ei } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as Fi, ArrowUp as wn, ArrowDown as kn, ChevronsUpDown as Pi, BarChart4 as $i, Table as Ii, Gauge as ji, ScatterChart as Vi, PieChart as qi, AreaChart as Ki, LineChart as Hi, BarChart3 as Ga, AlertCircle as Ya, ChevronLeft as br, ChevronRight as Jt, ChevronDown as Je, Check as Ve, ChevronUp as Bi, CalendarIcon as Qa, MoreVertical as Wi, RefreshCw as Ui, Image as Gi, Sheet as Yi, Type as yr, Hash as Ja, Calendar as Xa, Search as Qi, Table2 as Za, Database as eo, Layers as xr, Variable as Ji, Plus as kt, Trash2 as Rt, ListFilter as Xi, Box as to, EyeOff as no, Eye as ro, X as aa, Save as ao, SlidersHorizontal as Zi, Braces as ec, Undo2 as tc, Redo2 as nc, RotateCcw as rc, Pencil as ac, Copy as oc, Bold as ic, Italic as cc, Strikethrough as sc, Heading1 as lc, Heading2 as uc, List as dc, ListOrdered as mc, Quote as vc } from "lucide-react";
import { cva as wr } from "class-variance-authority";
import * as ln from "@radix-ui/react-popover";
import * as we from "@radix-ui/react-select";
import fc from "@cubejs-client/core";
import { format as pe, isValid as $t, parseISO as un, differenceInCalendarDays as hc, subDays as Oe, startOfMonth as Tn, subMonths as En, startOfQuarter as Fn, subQuarters as Pn, startOfYear as $n, subYears as In, subWeeks as pc, startOfWeek as gc, endOfWeek as bc, endOfMonth as yc, endOfQuarter as xc, endOfYear as wc, parse as oo } from "date-fns";
import { DayPicker as kc, useDayPicker as Cc } from "react-day-picker";
import { ResponsiveGridLayout as io } from "react-grid-layout";
import { useEditor as co, EditorContent as so } from "@tiptap/react";
import lo from "@tiptap/starter-kit";
const bt = 1, dn = m.object({ var: m.string().min(1) }).strict();
function Le(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const mn = (e) => m.union([e, dn]), Nc = m.union([m.string(), m.number(), m.boolean()]), lt = m.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Jn = m.union([m.tuple([m.string(), m.string()]), m.string()]), uo = m.union([
  m.string(),
  m.number(),
  m.boolean(),
  m.tuple([m.string(), m.string()]),
  // absolute date range
  m.array(m.string()),
  m.array(m.number())
]), ne = m.string().min(1), Sc = m.enum([
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
]), _c = m.object({
  member: ne,
  operator: Sc,
  values: m.array(m.union([Nc, dn])).optional()
}).strict(), Xn = m.lazy(
  () => m.union([
    _c,
    m.object({ and: m.array(Xn) }).strict(),
    m.object({ or: m.array(Xn) }).strict()
  ])
), Rc = m.object({
  dimension: ne,
  granularity: mn(lt).optional(),
  dateRange: mn(Jn).optional(),
  compareDateRange: m.array(Jn).optional()
}).strict(), oa = m.enum(["asc", "desc"]), Ac = m.union([
  m.record(ne, oa),
  m.array(m.tuple([ne, oa]))
]), mo = m.object({
  measures: m.array(ne).optional(),
  dimensions: m.array(ne).optional(),
  timeDimensions: m.array(Rc).optional(),
  filters: m.array(Xn).optional(),
  segments: m.array(ne).optional(),
  order: Ac.optional(),
  limit: mn(m.number()).optional(),
  offset: mn(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), Mc = m.string().min(1), Ih = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], Qe = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Oc = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Cn = m.object({
  kind: Oc.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional()
}).strict(), ia = m.object({
  label: m.string().optional(),
  colorToken: Qe.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: Cn.optional()
}).strict(), Lc = m.object({
  category: m.object({ member: ne }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(ne),
      meta: m.record(ne, ia).optional()
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
      meta: m.record(ne, ia).optional()
    }).strict()
  ])
}).strict(), Dc = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), zc = m.object({
  show: m.boolean().optional(),
  indicator: m.enum(["dot", "line", "dashed"]).optional(),
  showTotal: m.boolean().optional()
}).strict(), ca = m.union([m.number(), m.literal("auto")]), jn = m.object({
  label: m.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: m.boolean().optional(),
  hide: m.boolean().optional(),
  scale: m.enum(["linear", "log"]).optional(),
  domain: m.tuple([ca, ca]).optional(),
  tickFormat: Cn.optional()
}).strict(), Tc = m.object({
  x: jn.optional(),
  y: jn.optional(),
  y2: jn.optional()
}).strict(), Ec = m.object({
  byKey: m.record(m.string(), Qe).optional(),
  ramp: m.array(Qe).optional()
}).strict(), vo = m.object({
  family: Mc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Lc.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Dc.optional(),
  tooltip: zc.optional(),
  axes: Tc.optional(),
  colors: Ec.optional(),
  format: Cn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Fc = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), Pc = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), $c = m.object({
  variable: m.string().min(1),
  control: m.discriminatedUnion("kind", [
    m.object({
      kind: m.literal("dateRange"),
      presets: m.array(m.string()).optional(),
      allowFuture: m.boolean().optional()
    }).strict(),
    m.object({
      kind: m.literal("granularity"),
      options: m.array(lt).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: m.string().optional()
    }).strict(),
    m.object({
      kind: m.literal("select"),
      options: m.array(m.object({ value: uo, label: m.string() }).strict()),
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
}).strict(), kr = {
  id: m.string().min(1),
  title: m.string().optional()
}, Ic = m.object({ ...kr, type: m.literal("chart"), query: mo, chart: vo }).strict(), jc = m.object({ ...kr, type: m.literal("text"), doc: Fc }).strict(), Vc = m.object({ ...kr, type: m.literal("input"), control: $c }).strict(), qc = m.discriminatedUnion("type", [
  Ic,
  jc,
  Vc
]), Kc = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), Hc = m.object({
  cols: m.number().optional(),
  rowHeight: m.number().optional(),
  margin: m.tuple([m.number(), m.number()]).optional(),
  containerPadding: m.tuple([m.number(), m.number()]).optional()
}).strict(), fo = m.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Bc = m.object({
  name: m.string().min(1),
  type: fo,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: uo.optional()
}).strict(), ho = {
  schemaVersion: m.literal(bt),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, po = m.object({ ...ho, kind: m.literal("chart"), query: mo, chart: vo }).strict(), go = m.object({
  ...ho,
  kind: m.literal("dashboard"),
  variables: m.array(Bc),
  widgets: m.array(qc),
  layout: m.array(Kc),
  grid: Hc.optional()
}).strict(), bo = m.discriminatedUnion("kind", [po, go]), Wc = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function Uc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > bt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${bt} — update the library`
    );
  for (; n < bt; ) {
    const r = Wc[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return bo.parse(t);
}
function jh(e) {
  try {
    return { ok: !0, spec: Uc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Vh(e) {
  return bo.parse(e);
}
function Gc(e) {
  return fc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Yc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const Qc = Ei({ prefix: "cv" });
function S(...e) {
  return Qc(Ti(e));
}
function Cr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function Jc({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const Xc = wr(
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
), Nr = x.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: S(Xc({ variant: t }), e),
    ...n
  }
));
Nr.displayName = "Alert";
const Sr = x.forwardRef(
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
Sr.displayName = "AlertTitle";
const _r = x.forwardRef(
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
_r.displayName = "AlertDescription";
const Zc = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, es = "MMM d, yyyy";
function ts(e) {
  if (e instanceof Date) return $t(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return $t(r) ? r : null;
  }
  const t = un(e);
  if ($t(t)) return t;
  const n = new Date(e);
  return $t(n) ? n : null;
}
function yo(e) {
  return /^\d{4}-\d{2}/.test(e) ? $t(un(e)) : !1;
}
function ns(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Zc[t] : es;
}
function qt(e, t, n) {
  const r = ts(e);
  return r ? pe(r, ns(t, n)) : String(e);
}
function qh(e, t) {
  return (n) => n == null ? "" : qt(n, e, t);
}
function Kh(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? qt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? qt(e, t.format, t.granularity) : String(e) : yo(e) ? qt(e, t.format, t.granularity) : e;
}
const sa = "—", rs = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function la(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function as(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of rs)
    if (n >= r) return la((e / r).toFixed(t)) + a;
  return la(e.toFixed(t));
}
function os(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function is(e, t) {
  const { format: n, meta: r, locale: a } = t, o = n != null && n.abbreviate ? as(e, n.decimals ?? 1) : os(e, n, a), s = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${s ? ` ${s}` : ""}`;
}
function xo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function cs(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || xo(e.value) ? !0 : typeof e.value == "string" ? yo(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Rr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? sa : (xo(t) || typeof t == "string" || typeof t == "number") && cs(e) ? qt(t, n, r) : typeof t == "number" ? is(t, e) : String(t);
};
function ss(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Hh(e, t) {
  return (n, r) => {
    const a = r ? ss(r, t) : void 0;
    return Rr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function ls(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function us(e) {
  const t = lt.safeParse(e);
  return t.success ? t.data : void 0;
}
function ds(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const o = us(a.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function wo(e, t, n, r) {
  const a = ds(e, t);
  return {
    value(o, s, c = "value") {
      const l = s ? ls(s, e) : void 0, u = l == null ? void 0 : l.meta;
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
const Xt = m.object({
  axis: m.enum(["x", "y"]),
  value: m.number(),
  label: m.string().optional(),
  colorToken: Qe.optional()
}).strict(), Ar = m.boolean().optional(), ms = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(Xt).optional(),
  comparePrevious: Ar
}).strict(), Mr = m.enum(["linear", "monotone", "step", "natural"]), vs = m.object({
  curve: Mr.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(Xt).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: Ar
}).strict(), fs = m.object({
  curve: Mr.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(Xt).optional(),
  comparePrevious: Ar
}).strict(), hs = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), ps = m.object({
  x: ne,
  y: ne,
  size: ne.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: ne.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(Xt).optional()
}).strict(), gs = m.object({
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
    granularity: m.union([lt, dn]).optional(),
    dateRange: m.union([Jn, dn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: m.enum(["up", "down"]).optional(),
  gauge: m.object({
    min: m.number().optional(),
    max: m.number(),
    thresholds: m.array(m.object({ at: m.number(), colorToken: Qe }).strict()).optional()
  }).strict().optional(),
  icon: m.string().optional()
}).strict(), bs = m.object({
  member: ne,
  label: m.string().optional(),
  format: Cn.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), ys = m.object({
  member: ne,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: Qe.optional()
}).strict(), xs = m.object({
  columns: m.array(bs).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(ys).optional()
}).strict(), ws = m.object({
  member: ne,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: Qe.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), ks = m.object({
  series: m.array(ws),
  referenceLines: m.array(Xt).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: Mr.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), Ke = {
  bar: ms,
  line: vs,
  area: fs,
  pie: hs,
  scatter: ps,
  kpi: gs,
  table: xs,
  combo: ks
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
function ua(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Zn(e, t) {
  if (t === void 0) return e;
  if (!ua(e) || !ua(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? Zn(e[r], a) : a);
  }
  return n;
}
const Cs = { envelope: {}, familyOptions: {} };
function Ns(e, t) {
  return {
    ...Zn({ ...t.envelope }, e),
    familyOptions: Zn(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
const Ss = { light: "", dark: ".dark" }, ko = x.createContext(null);
function Co() {
  const e = x.useContext(ko);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const Xe = x.forwardRef(({ id: e, className: t, children: n, config: r, ...a }, o) => {
  const s = x.useId(), c = `chart-${e || s.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(ko.Provider, { value: { config: r }, children: /* @__PURE__ */ v(
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
        /* @__PURE__ */ i(_s, { id: c, config: r }),
        /* @__PURE__ */ i(hr.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
Xe.displayName = "ChartContainer";
const _s = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, r]) => r.theme || r.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Ss).map(
          ([r, a]) => `
${a} [data-chart=${e}] {
${n.map(([o, s]) => {
            var l;
            const c = ((l = s.theme) == null ? void 0 : l[r]) || s.color;
            return c ? `  ${Cr(o)}: ${c};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, At = hr.Tooltip, mt = x.forwardRef(
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
    valueFormatter: d,
    color: f,
    nameKey: p,
    labelKey: h
  }, b) => {
    const { config: g } = Co(), k = x.useMemo(() => {
      var N;
      if (a || !(t != null && t.length))
        return null;
      const [w] = t, C = `${h || (w == null ? void 0 : w.dataKey) || (w == null ? void 0 : w.name) || "value"}`, R = er(g, w, C), _ = !h && typeof s == "string" ? ((N = g[s]) == null ? void 0 : N.label) || s : R == null ? void 0 : R.label;
      return c ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: c(_, t) }) : _ ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: _ }) : null;
    }, [s, c, t, a, l, g, h]);
    if (!e || !(t != null && t.length))
      return null;
    const y = t.length === 1 && r !== "dot";
    return /* @__PURE__ */ v(
      "div",
      {
        ref: b,
        className: S(
          "cv:grid cv:min-w-32 cv:items-start cv:gap-1.5 cv:rounded-lg cv:border cv:border-border/40 cv:bg-background cv:px-3 cv:py-2 cv:text-xs cv:shadow-lg",
          n
        ),
        children: [
          y ? null : k,
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((w, C) => {
            var F;
            const R = `${p || w.name || w.dataKey || "value"}`, _ = er(g, w, R), N = f || ((F = w.payload) == null ? void 0 : F.fill) || w.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  r === "dot" && "cv:items-center"
                ),
                children: u && (w == null ? void 0 : w.value) !== void 0 && w.name ? u(w.value, w.name, w, C, w.payload) : /* @__PURE__ */ v(ie, { children: [
                  _ != null && _.icon ? /* @__PURE__ */ i(_.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: S(
                        "cv:shrink-0 cv:rounded-[2px] cv:border-[--color-border] cv:bg-[--color-bg]",
                        {
                          "cv:h-2.5 cv:w-2.5": r === "dot",
                          "cv:w-1": r === "line",
                          "cv:w-0 cv:border-[1.5px] cv:border-dashed cv:bg-transparent": r === "dashed",
                          "cv:my-0.5": y && r === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": N,
                        "--color-border": N
                      }
                    }
                  ),
                  /* @__PURE__ */ v(
                    "div",
                    {
                      className: S(
                        "cv:flex cv:flex-1 cv:justify-between cv:gap-4 cv:leading-none",
                        y ? "cv:items-end" : "cv:items-center"
                      ),
                      children: [
                        /* @__PURE__ */ v("div", { className: "cv:grid cv:gap-1.5", children: [
                          y ? k : null,
                          /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: (_ == null ? void 0 : _.label) || w.name })
                        ] }),
                        w.value !== void 0 && /* @__PURE__ */ i("span", { className: "cv:font-mono cv:font-medium cv:tabular-nums cv:text-foreground", children: d ? d(w.value, w) : typeof w.value == "number" ? w.value.toLocaleString() : String(w.value) })
                      ]
                    }
                  )
                ] })
              },
              w.dataKey ? String(w.dataKey) : C
            );
          }) })
        ]
      }
    );
  }
);
mt.displayName = "ChartTooltipContent";
const Mt = hr.Legend, vt = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: r = "bottom", nameKey: a }, o) => {
    const { config: s } = Co();
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
          const l = `${a || c.dataKey || "value"}`, u = er(s, c, l);
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
vt.displayName = "ChartLegendContent";
function er(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let a = n;
  return n in t && typeof t[n] == "string" ? a = t[n] : r && n in r && typeof r[n] == "string" && (a = r[n]), a in e ? e[a] : e[n];
}
function Or(e) {
  return e.categories.map((t, n) => {
    const r = { __cat: typeof t == "number" ? t : String(t) };
    for (const a of e.series) r[a.key] = a.data[n] ?? null;
    return r;
  });
}
function Ot(e) {
  return e === "top" ? "top" : "bottom";
}
function Lt(e) {
  return "horizontal";
}
function Dt(e) {
  return "center";
}
function Se(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function Pe(e) {
  return e == null ? void 0 : e.domain;
}
function $e(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Rs(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Kt(e) {
  return `var(${Cr(e.key)})`;
}
function As(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function No(e) {
  return e === "stacked" || e === "percent";
}
function Nn(e, t) {
  var c, l, u, d, f, p, h, b, g, k, y, w, C, R;
  const n = e.raw.annotation, r = (_) => {
    var N, F, D, T, L, $;
    if (_)
      return ((N = n == null ? void 0 : n.measures[_]) == null ? void 0 : N.shortTitle) ?? ((F = n == null ? void 0 : n.dimensions[_]) == null ? void 0 : F.shortTitle) ?? ((D = n == null ? void 0 : n.timeDimensions[_]) == null ? void 0 : D.shortTitle) ?? ((T = n == null ? void 0 : n.measures[_]) == null ? void 0 : T.title) ?? ((L = n == null ? void 0 : n.dimensions[_]) == null ? void 0 : L.title) ?? (($ = n == null ? void 0 : n.timeDimensions[_]) == null ? void 0 : $.title) ?? _;
  }, a = e.series.find((_) => {
    var N;
    return (((N = _.meta) == null ? void 0 : N.axis) ?? "left") !== "right";
  }), o = e.series.find((_) => {
    var N;
    return ((N = _.meta) == null ? void 0 : N.axis) === "right";
  }), s = (_) => {
    var N;
    return _ ? (N = _.meta) != null && N.measure ? r(_.meta.measure) : _.label : void 0;
  };
  return {
    x: (l = (c = t.axes) == null ? void 0 : c.x) != null && l.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? r((p = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : p.member),
    left: (b = (h = t.axes) == null ? void 0 : h.y) != null && b.labelHide ? void 0 : ((k = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : k.label) ?? s(a),
    right: (w = (y = t.axes) == null ? void 0 : y.y2) != null && w.labelHide ? void 0 : ((R = (C = t.axes) == null ? void 0 : C.y2) == null ? void 0 : R.label) ?? s(o)
  };
}
function Ue(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Lr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function Zt(e, t, n) {
  return (r, a) => {
    const o = a == null ? void 0 : a.dataKey, s = typeof o == "string" || typeof o == "number" ? String(o) : void 0, c = (s ? n == null ? void 0 : n.get(s) : void 0) ?? t ?? s;
    return e.value(r, c, "tooltip");
  };
}
function vn(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
function Ms({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var T, L, $, V, E, O, G, re, I, Y, te, U, Q, de, J, q;
  const o = t.familyOptions ?? {}, s = t.orientation === "horizontal", c = No(t.stackMode), l = t.stackMode === "percent", u = Or(e), d = (M, Z, ve = "value") => l ? vn(M) : r.value(M, Z, ve), f = (M) => r.category(M), p = Lr(e), h = Ue(e.series[0]), b = s ? (L = (T = t.axes) == null ? void 0 : T.y) == null ? void 0 : L.hide : (V = ($ = t.axes) == null ? void 0 : $.x) == null ? void 0 : V.hide, g = s ? (E = t.axes) == null ? void 0 : E.x : (O = t.axes) == null ? void 0 : O.y, k = !s && e.series.some((M) => {
    var Z;
    return ((Z = M.meta) == null ? void 0 : Z.axis) === "right";
  }), y = Ue(e.series.find((M) => {
    var Z;
    return ((Z = M.meta) == null ? void 0 : Z.axis) !== "right";
  })) ?? h, w = Ue(e.series.find((M) => {
    var Z;
    return ((Z = M.meta) == null ? void 0 : Z.axis) === "right";
  })), C = Nn(e, t), R = C.x ? { value: C.x, position: "insideBottom", offset: -2 } : void 0, _ = C.x ? { value: C.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, N = C.left ? { value: C.left, position: "insideBottom", offset: -2 } : void 0, F = C.left ? { value: C.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, D = C.right ? { value: C.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(Xe, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    bi,
    {
      accessibilityLayer: !0,
      data: u,
      layout: s ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Gt, { vertical: s, horizontal: !s }),
        s ? /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            je,
            {
              type: "category",
              dataKey: "__cat",
              hide: b,
              tickFormatter: f,
              label: _
            }
          ),
          /* @__PURE__ */ i(
            xt,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: $e(g),
              domain: Pe(g),
              tickFormatter: (M) => d(M, h, "axis"),
              label: N
            }
          )
        ] }) : /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            xt,
            {
              type: "category",
              dataKey: "__cat",
              hide: b,
              tickFormatter: f,
              label: R
            }
          ),
          /* @__PURE__ */ i(
            je,
            {
              yAxisId: "left",
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: $e(g),
              domain: Pe(g),
              tickFormatter: (M) => d(M, y, "axis"),
              label: F
            }
          ),
          k && /* @__PURE__ */ i(
            je,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (re = (G = t.axes) == null ? void 0 : G.y2) == null ? void 0 : re.hide,
              scale: $e((I = t.axes) == null ? void 0 : I.y2),
              domain: Pe((Y = t.axes) == null ? void 0 : Y.y2),
              tickFormatter: (M) => d(M, w, "axis"),
              label: D
            }
          )
        ] }),
        ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
          At,
          {
            content: /* @__PURE__ */ i(
              mt,
              {
                labelFormatter: (M) => r.category(M),
                indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
                valueFormatter: l ? (M) => vn(M) : Zt(r, void 0, p)
              }
            )
          }
        ),
        Se(t).show && /* @__PURE__ */ i(
          Mt,
          {
            content: /* @__PURE__ */ i(vt, { className: Se(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Ot((Q = t.legend) == null ? void 0 : Q.position),
            layout: Lt((de = t.legend) == null ? void 0 : de.position),
            align: Dt((J = t.legend) == null ? void 0 : J.position)
          }
        ),
        e.series.map((M) => {
          var Z, ve, W, K;
          return /* @__PURE__ */ i(
            qa,
            {
              yAxisId: s ? void 0 : ((Z = M.meta) == null ? void 0 : Z.axis) === "right" && k ? "right" : "left",
              dataKey: M.key,
              name: M.label,
              stackId: c ? (ve = M.meta) != null && ve.companion ? "__prev" : ((W = M.meta) == null ? void 0 : W.stackId) ?? "stack" : void 0,
              fill: Kt(M),
              fillOpacity: (K = M.meta) != null && K.companion ? 0.4 : void 0,
              radius: Rs(o.barRadius, s),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                Ka,
                {
                  dataKey: M.key,
                  position: s ? "right" : "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (fe) => d(typeof fe == "boolean" ? Number(fe) : fe, Ue(M), "label")
                }
              )
            },
            M.key
          );
        }),
        (q = o.referenceLines) == null ? void 0 : q.map((M, Z) => /* @__PURE__ */ i(
          Yt,
          {
            yAxisId: s ? void 0 : "left",
            ...M.axis === "y" ? { y: M.value } : { x: M.value },
            label: M.label,
            stroke: `var(--${M.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Z
        ))
      ]
    }
  ) });
}
function Os({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var y, w, C, R, _, N, F, D, T, L, $, V, E, O, G, re;
  const o = t.familyOptions ?? {}, s = o.chrome === "none", c = Or(e), l = (I) => r.category(I), u = e.series.some((I) => {
    var Y;
    return ((Y = I.meta) == null ? void 0 : Y.axis) === "right";
  }), d = o.curve ?? "monotone", f = Lr(e), p = Ue(e.series.find((I) => {
    var Y;
    return ((Y = I.meta) == null ? void 0 : Y.axis) !== "right";
  })), h = Ue(e.series.find((I) => {
    var Y;
    return ((Y = I.meta) == null ? void 0 : Y.axis) === "right";
  })), b = Nn(e, t), g = !s && o.dots === !0, k = !s;
  return /* @__PURE__ */ i(
    Xe,
    {
      config: n,
      className: s ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(yi, { accessibilityLayer: !0, data: c, margin: s ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !s && /* @__PURE__ */ i(Gt, { vertical: !1 }),
        /* @__PURE__ */ i(
          xt,
          {
            type: "category",
            dataKey: "__cat",
            hide: s || ((w = (y = t.axes) == null ? void 0 : y.x) == null ? void 0 : w.hide),
            tickFormatter: l,
            label: !s && b.x ? { value: b.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            yAxisId: "left",
            type: "number",
            hide: s || ((R = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : R.hide),
            scale: $e((_ = t.axes) == null ? void 0 : _.y),
            domain: Pe((N = t.axes) == null ? void 0 : N.y),
            tickFormatter: (I) => r.value(I, p, "axis"),
            label: !s && b.left ? { value: b.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          je,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: s || ((D = (F = t.axes) == null ? void 0 : F.y2) == null ? void 0 : D.hide),
            scale: $e((T = t.axes) == null ? void 0 : T.y2),
            domain: Pe((L = t.axes) == null ? void 0 : L.y2),
            tickFormatter: (I) => r.value(I, h, "axis"),
            label: !s && b.right ? { value: b.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !s && (($ = t.tooltip) == null ? void 0 : $.show) !== !1 && /* @__PURE__ */ i(
          At,
          {
            content: /* @__PURE__ */ i(
              mt,
              {
                labelFormatter: (I) => r.category(I),
                indicator: ((V = t.tooltip) == null ? void 0 : V.indicator) ?? "line",
                valueFormatter: Zt(r, void 0, f)
              }
            )
          }
        ),
        !s && Se(t).show && /* @__PURE__ */ i(
          Mt,
          {
            content: /* @__PURE__ */ i(vt, { className: Se(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Ot((E = t.legend) == null ? void 0 : E.position),
            layout: Lt((O = t.legend) == null ? void 0 : O.position),
            align: Dt((G = t.legend) == null ? void 0 : G.position)
          }
        ),
        e.series.map((I) => {
          var Y, te, U, Q, de, J;
          return /* @__PURE__ */ i(
            Ha,
            {
              yAxisId: u && ((Y = I.meta) == null ? void 0 : Y.axis) === "right" ? "right" : "left",
              type: ((te = I.meta) == null ? void 0 : te.curve) ?? d,
              dataKey: I.key,
              name: I.label,
              stroke: Kt(I),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (U = I.meta) != null && U.companion ? "5 4" : void 0,
              strokeOpacity: (Q = I.meta) != null && Q.companion ? 0.55 : void 0,
              dot: s || (de = I.meta) != null && de.companion ? !1 : ((J = I.meta) == null ? void 0 : J.dots) ?? g,
              activeDot: k,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !s,
              children: !s && o.showValueLabels && /* @__PURE__ */ i(
                Ka,
                {
                  dataKey: I.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (q) => r.value(typeof q == "boolean" ? Number(q) : q, Ue(I), "label")
                }
              )
            },
            I.key
          );
        }),
        !s && ((re = o.referenceLines) == null ? void 0 : re.map((I, Y) => /* @__PURE__ */ i(
          Yt,
          {
            yAxisId: "left",
            ...I.axis === "y" ? { y: I.value } : { x: I.value },
            label: I.label,
            stroke: `var(--${I.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Y
        )))
      ] })
    }
  );
}
function Ls({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var k, y, w, C, R, _, N, F, D, T, L, $, V, E;
  const o = t.familyOptions ?? {}, s = ((y = (k = t.mapping) == null ? void 0 : k.series) == null ? void 0 : y.mode) === "pivot", c = t.stackMode ?? (s ? "stacked" : "none"), l = No(c), u = c === "percent", d = Or(e), f = (O) => r.category(O), p = o.curve ?? "monotone", h = Lr(e), b = Ue(e.series[0]), g = Nn(e, t);
  return /* @__PURE__ */ i(Xe, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ba, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Gt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((O) => /* @__PURE__ */ v("linearGradient", { id: `fill-${O.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Kt(O), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Kt(O), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, O.key)) }),
    /* @__PURE__ */ i(
      xt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (C = (w = t.axes) == null ? void 0 : w.x) == null ? void 0 : C.hide,
        tickFormatter: f,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      je,
      {
        type: "number",
        hide: (_ = (R = t.axes) == null ? void 0 : R.y) == null ? void 0 : _.hide,
        scale: $e((N = t.axes) == null ? void 0 : N.y),
        domain: Pe((F = t.axes) == null ? void 0 : F.y),
        tickFormatter: (O) => u ? vn(O) : r.value(O, b, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((D = t.tooltip) == null ? void 0 : D.show) !== !1 && /* @__PURE__ */ i(
      At,
      {
        content: /* @__PURE__ */ i(
          mt,
          {
            labelFormatter: (O) => r.category(O),
            indicator: ((T = t.tooltip) == null ? void 0 : T.indicator) ?? "dot",
            valueFormatter: u ? (O) => vn(O) : Zt(r, void 0, h)
          }
        )
      }
    ),
    Se(t).show && /* @__PURE__ */ i(
      Mt,
      {
        content: /* @__PURE__ */ i(vt, { className: Se(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Ot((L = t.legend) == null ? void 0 : L.position),
        layout: Lt(($ = t.legend) == null ? void 0 : $.position),
        align: Dt((V = t.legend) == null ? void 0 : V.position)
      }
    ),
    e.series.map((O) => {
      var G, re, I, Y, te, U, Q, de;
      return /* @__PURE__ */ i(
        pr,
        {
          type: ((G = O.meta) == null ? void 0 : G.curve) ?? p,
          dataKey: O.key,
          name: O.label,
          stackId: l && !((re = O.meta) != null && re.companion) ? ((I = O.meta) == null ? void 0 : I.stackId) ?? "stack" : void 0,
          stroke: Kt(O),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (Y = O.meta) != null && Y.companion ? "5 4" : void 0,
          strokeOpacity: (te = O.meta) != null && te.companion ? 0.55 : void 0,
          fill: (U = O.meta) != null && U.companion ? "none" : `url(#fill-${O.key})`,
          fillOpacity: 1,
          dot: (Q = O.meta) != null && Q.companion ? !1 : ((de = O.meta) == null ? void 0 : de.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        O.key
      );
    }),
    (E = o.referenceLines) == null ? void 0 : E.map((O, G) => /* @__PURE__ */ i(
      Yt,
      {
        ...O.axis === "y" ? { y: O.value } : { x: O.value },
        label: O.label,
        stroke: `var(--${O.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      G
    ))
  ] }) });
}
function Ds({ data: e, options: t, format: n, editing: r }) {
  var g, k, y, w, C;
  const a = t.familyOptions ?? {}, o = e.series[0], s = e.categories.map((R, _) => {
    const N = n.category(R);
    return {
      key: `slice-${_}`,
      label: N,
      value: (o == null ? void 0 : o.data[_]) ?? 0,
      fill: `var(--${xe[_ % xe.length]})`
    };
  }), c = zs(s, a.maxSlices), l = c.reduce((R, _) => R + _.value, 0), u = {};
  c.forEach((R, _) => {
    u[R.key] = {
      label: R.label,
      color: `var(--${xe[_ % xe.length]})`
    };
  });
  const d = `${a.innerRadiusPct ?? 0}%`, f = `${a.outerRadiusPct ?? 80}%`, p = (a.innerRadiusPct ?? 0) > 0, h = a.showLabels ?? "percent", b = h === "none" ? !1 : ({ payload: R, percent: _ }) => {
    const N = R;
    return h === "name" ? (N == null ? void 0 : N.label) ?? "" : h === "value" ? n.value(N == null ? void 0 : N.value, o == null ? void 0 : o.key, "label") : `${((_ !== void 0 ? _ : N && l > 0 ? N.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(Xe, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(xi, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      At,
      {
        content: /* @__PURE__ */ i(
          mt,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((k = t.tooltip) == null ? void 0 : k.indicator) ?? "dot",
            valueFormatter: Zt(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ v(
      wi,
      {
        data: c,
        dataKey: "value",
        nameKey: "label",
        innerRadius: d,
        outerRadius: f,
        paddingAngle: a.padAngle,
        cornerRadius: a.cornerRadius,
        label: b,
        labelLine: h !== "none" && !p,
        isAnimationActive: !1,
        children: [
          c.map((R) => /* @__PURE__ */ i(Wa, { fill: R.fill }, R.key)),
          p && a.centerLabel && /* @__PURE__ */ i(
            ki,
            {
              position: "center",
              content: ({ viewBox: R }) => {
                var D, T;
                if (!R || !("cx" in R)) return null;
                const { cx: _, cy: N } = R, F = ((D = a.centerLabel) == null ? void 0 : D.value) === void 0 || a.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : a.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: _, y: N, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: _, y: N, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: F }),
                  ((T = a.centerLabel) == null ? void 0 : T.label) && /* @__PURE__ */ i("tspan", { x: _, y: N + 20, className: "cv:fill-muted-foreground cv:text-xs", children: a.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    Se(t).show && /* @__PURE__ */ i(
      Mt,
      {
        content: /* @__PURE__ */ i(
          vt,
          {
            nameKey: "label",
            className: Se(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: Ot((y = t.legend) == null ? void 0 : y.position),
        layout: Lt((w = t.legend) == null ? void 0 : w.position),
        align: Dt((C = t.legend) == null ? void 0 : C.position)
      }
    )
  ] }) });
}
function zs(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((c, l) => l.value - c.value), r = n.slice(0, t - 1), o = n.slice(t - 1).reduce((c, l) => c + l.value, 0), s = t - 1;
  return [
    ...r,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${xe[s % xe.length]})`
    }
  ];
}
function Ts({ data: e, options: t, format: n, editing: r }) {
  var b, g, k, y, w, C, R, _, N, F, D, T, L, $, V, E, O, G, re, I, Y, te, U, Q, de, J;
  const a = t.familyOptions ?? {}, o = e.raw.annotation, s = e.raw.rows, c = { x: a.x, y: a.y, z: a.size }, l = ((b = o == null ? void 0 : o.measures[a.x]) == null ? void 0 : b.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[a.x]) == null ? void 0 : g.shortTitle) ?? a.x, u = ((k = o == null ? void 0 : o.measures[a.y]) == null ? void 0 : k.shortTitle) ?? ((y = o == null ? void 0 : o.dimensions[a.y]) == null ? void 0 : y.shortTitle) ?? a.y, d = (C = (w = t.axes) == null ? void 0 : w.x) != null && C.labelHide ? void 0 : ((_ = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : _.label) ?? l, f = (F = (N = t.axes) == null ? void 0 : N.y) != null && F.labelHide ? void 0 : ((T = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : T.label) ?? u, p = Es(s, a), h = {};
  return p.forEach((q, M) => {
    h[q.key] = { label: q.label, color: `var(--${xe[M % xe.length]})` };
  }), /* @__PURE__ */ i(Xe, { config: h, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ci, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Gt, {}),
    /* @__PURE__ */ i(
      xt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: ($ = (L = t.axes) == null ? void 0 : L.x) == null ? void 0 : $.hide,
        scale: $e((V = t.axes) == null ? void 0 : V.x),
        domain: Pe((E = t.axes) == null ? void 0 : E.x),
        tickFormatter: (q) => n.value(q, a.x, "axis"),
        label: d ? { value: d, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      je,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (G = (O = t.axes) == null ? void 0 : O.y) == null ? void 0 : G.hide,
        scale: $e((re = t.axes) == null ? void 0 : re.y),
        domain: Pe((I = t.axes) == null ? void 0 : I.y),
        tickFormatter: (q) => n.value(q, a.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    a.size && /* @__PURE__ */ i(Ni, { type: "number", dataKey: "z", range: a.sizeRange ?? [40, 400], name: a.size }),
    ((Y = t.tooltip) == null ? void 0 : Y.show) !== !1 && /* @__PURE__ */ i(
      At,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          mt,
          {
            indicator: ((te = t.tooltip) == null ? void 0 : te.indicator) ?? "dot",
            valueFormatter: (q, M) => {
              const Z = M == null ? void 0 : M.dataKey, ve = typeof Z == "string" ? c[Z] : void 0;
              return n.value(q, ve, "tooltip");
            }
          }
        )
      }
    ),
    Se(t).show && p.length > 1 && /* @__PURE__ */ i(
      Mt,
      {
        content: /* @__PURE__ */ i(vt, { className: Se(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Ot((U = t.legend) == null ? void 0 : U.position),
        layout: Lt((Q = t.legend) == null ? void 0 : Q.position),
        align: Dt((de = t.legend) == null ? void 0 : de.position)
      }
    ),
    p.map((q, M) => /* @__PURE__ */ i(
      Si,
      {
        name: q.label,
        data: q.points,
        shape: a.shape ?? "circle",
        fill: `var(--color-${q.key})`,
        children: p.length === 1 && q.points.map((Z, ve) => /* @__PURE__ */ i(Wa, { fill: `var(--${xe[M % xe.length]})` }, ve))
      },
      q.key
    )),
    (J = a.referenceLines) == null ? void 0 : J.map((q, M) => /* @__PURE__ */ i(
      Yt,
      {
        ...q.axis === "y" ? { y: q.value } : { x: q.value },
        label: q.label,
        stroke: `var(--${q.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      M
    ))
  ] }) });
}
function Es(e, t) {
  const n = (a) => ({
    x: Vn(a[t.x]),
    y: Vn(a[t.y]),
    ...t.size ? { z: Vn(a[t.size]) } : {}
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
function Vn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Fs(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Ps(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function $s(e) {
  var l, u, d, f;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, o = (p) => r.value(p, a.measure, "kpi"), s = So(t.raw.rows, a.measure) ?? 0, c = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : f.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ i(Ks, { value: s, label: c, fmt: o, fo: a }) : /* @__PURE__ */ i(Is, { ...e, value: s, label: c, fo: a, fmt: o });
}
function Is({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = n.goodDirection ?? ((u = n.comparison) == null ? void 0 : u.goodDirection) ?? "up", o = Bs(e.raw.rows, t, n), s = n.sparkline ? e.series[0] : void 0, c = o ? o.diff : s ? Vs(s) : 0, l = Ps(Fs(c, a));
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:justify-center cv:gap-1", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-baseline cv:gap-2", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-4xl cv:font-bold cv:tabular-nums cv:text-foreground", children: r(t) }),
      o && /* @__PURE__ */ i(qs, { delta: o, goodDirection: a, fo: n, fmt: r })
    ] }),
    s && s.data.length > 0 && /* @__PURE__ */ i(js, { series: s, categories: e.categories, colorClass: l })
  ] });
}
function js({
  series: e,
  categories: t,
  colorClass: n
}) {
  const r = t.map((a, o) => ({ x: typeof a == "number" ? a : String(a), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:mt-2 cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(Mi, { width: "100%", height: "100%", children: /* @__PURE__ */ i(Ba, { data: r, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
    pr,
    {
      dataKey: "v",
      type: "monotone",
      stroke: "currentColor",
      strokeWidth: 1.5,
      fill: "currentColor",
      fillOpacity: 0.15,
      dot: !1,
      isAnimationActive: !1,
      connectNulls: !0
    }
  ) }) }) });
}
function Vs(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function qs({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = e.diff > 0, o = e.diff === 0, s = o ? !0 : a === (t === "up"), c = o ? Fi : a ? wn : kn, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: S(
        "cv:inline-flex cv:items-center cv:gap-0.5 cv:text-sm cv:font-medium",
        o ? "cv:text-muted-foreground" : s ? "cv:text-emerald-600" : "cv:text-destructive"
      ),
      children: [
        /* @__PURE__ */ i(c, { className: "cv:size-3.5" }),
        l
      ]
    }
  );
}
function Ks({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, f;
  const a = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, o = ((f = r.gauge) == null ? void 0 : f.max) ?? Math.max(e, 1), s = Math.max(a, Math.min(o, e)), c = Hs(e, r) ?? "chart-1", l = [{ name: t, value: s, fill: `var(--${c})` }], u = { value: { label: t, color: `var(--${c})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(Xe, { config: u, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      _i,
      {
        data: l,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Ri, { type: "number", domain: [a, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(Ai, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ v("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-2xl cv:font-bold cv:tabular-nums cv:text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t })
    ] })
  ] });
}
function Hs(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const o of [...n].sort((s, c) => s.at - c.at))
    e >= o.at && (r = o.colorToken);
  return r;
}
function So(e, t) {
  for (const n of e) {
    const r = _o(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Bs(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = So(e, r.value));
  else {
    const c = e[1];
    a = c ? _o(c[n.measure]) : null;
  }
  if (a === null) return null;
  const o = t - a, s = a !== 0 ? o / a : null;
  return { current: t, baseline: a, diff: o, pct: s };
}
function _o(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Ro = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
Ro.displayName = "Table";
const Ao = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
Ao.displayName = "TableHeader";
const Mo = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
Mo.displayName = "TableBody";
const an = x.forwardRef(
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
an.displayName = "TableRow";
const tr = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
tr.displayName = "TableHead";
const on = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
on.displayName = "TableCell";
const Ws = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
Ws.displayName = "TableCaption";
const Oo = wr(
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
), B = x.forwardRef(
  ({ className: e, variant: t, size: n, type: r, ...a }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: r ?? "button",
      className: S(Oo({ variant: t, size: n }), e),
      ...a
    }
  )
);
B.displayName = "Button";
function Us({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, o = e.raw.annotation, s = x.useMemo(
    () => Gs(a, o, r, n),
    [a, o, r, n]
  ), [c, l] = x.useState(null), [u, d] = x.useState(0), f = r.sortable !== !1, p = r.pageSize ?? 25, h = x.useMemo(() => {
    if (!c) return a;
    const C = c.dir === "asc" ? 1 : -1;
    return [...a].sort((R, _) => Zs(R[c.member], _[c.member]) * C);
  }, [a, c]), b = Math.max(1, Math.ceil(h.length / p)), g = Math.min(u, b - 1), k = h.slice(g * p, g * p + p), y = (C) => {
    f && (l(
      (R) => (R == null ? void 0 : R.member) === C ? { member: C, dir: R.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), d(0));
  }, w = r.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", r.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(Ro, { children: [
      /* @__PURE__ */ i(Ao, { className: S(r.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(an, { children: [
        r.showRowNumbers && /* @__PURE__ */ i(tr, { className: "cv:w-10 cv:text-right", children: "#" }),
        s.map((C) => /* @__PURE__ */ i(
          tr,
          {
            className: da(C.align),
            style: C.width ? { width: C.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              B,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => y(C.member),
                children: [
                  C.label,
                  /* @__PURE__ */ i(Xs, { active: (c == null ? void 0 : c.member) === C.member, dir: c == null ? void 0 : c.dir })
                ]
              }
            ) : C.label
          },
          C.member
        ))
      ] }) }),
      /* @__PURE__ */ v(Mo, { children: [
        k.map((C, R) => /* @__PURE__ */ v(an, { children: [
          r.showRowNumbers && /* @__PURE__ */ i(on, { className: S("cv:text-right cv:text-muted-foreground", w && "cv:py-1"), children: g * p + R + 1 }),
          s.map((_) => {
            const N = el(_.member, C[_.member], r.conditionalFormat);
            return /* @__PURE__ */ i(
              on,
              {
                className: S(da(_.align), w && "cv:py-1"),
                style: N ? { color: N } : void 0,
                children: _.render(C[_.member])
              },
              _.member
            );
          })
        ] }, R)),
        k.length === 0 && /* @__PURE__ */ i(an, { children: /* @__PURE__ */ i(
          on,
          {
            colSpan: s.length + (r.showRowNumbers ? 1 : 0),
            className: "cv:h-24 cv:text-center cv:text-muted-foreground",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    h.length > p && /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2 cv:px-2 cv:py-2 cv:text-sm cv:text-muted-foreground", children: [
      /* @__PURE__ */ v("span", { children: [
        g * p + 1,
        "–",
        Math.min((g + 1) * p, h.length),
        " of",
        " ",
        h.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:gap-2", children: [
        /* @__PURE__ */ i(
          B,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((C) => Math.max(0, C - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          B,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((C) => Math.min(b - 1, C + 1)),
            disabled: g >= b - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Gs(e, t, n, r) {
  var s;
  const a = e.length > 0 ? Object.keys(e[0]) : Qs(t);
  return ((s = n.columns) != null && s.length ? n.columns : a.map((c) => ({ member: c }))).filter((c) => !c.hidden).map((c) => {
    const l = c.member, u = t ? Js(t, l) : void 0, d = t ? l in t.measures : !1, f = c.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, p = c.align ?? (d ? "right" : "left");
    return {
      member: l,
      label: f,
      align: p,
      width: c.width,
      render: (h) => Ys(h, d, l, r)
    };
  });
}
function Ys(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Qs(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Js(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function da(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function Xs({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(wn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(kn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Pi, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function Zs(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function el(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && tl(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function tl(e, t, n) {
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
function nl({ data: e, options: t, format: n, editing: r }) {
  var g, k, y, w, C, R, _, N, F, D, T, L, $, V, E, O, G, re, I, Y, te, U, Q, de, J, q;
  const a = t.familyOptions ?? {}, o = a.series ?? [], s = al(e, o), c = (M) => n.category(M), l = o.some((M) => M.axis === "right"), u = (g = o.find((M) => M.axis !== "right")) == null ? void 0 : g.member, d = (k = o.find((M) => M.axis === "right")) == null ? void 0 : k.member, f = Nn(e, t), p = (w = (y = t.axes) == null ? void 0 : y.y) != null && w.labelHide ? void 0 : ((R = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : R.label) ?? (u ? cn(e, u) : void 0), h = (N = (_ = t.axes) == null ? void 0 : _.y2) != null && N.labelHide ? void 0 : ((D = (F = t.axes) == null ? void 0 : F.y2) == null ? void 0 : D.label) ?? (d ? cn(e, d) : void 0), b = {};
  return o.forEach((M, Z) => {
    const ve = M.colorToken ?? xe[Z % xe.length];
    b[M.member] = {
      label: M.label ?? cn(e, M.member),
      color: `var(--${ve})`
    };
  }), /* @__PURE__ */ i(Xe, { config: b, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Oi, { accessibilityLayer: !0, data: s, children: [
    /* @__PURE__ */ i(Gt, { vertical: !1 }),
    /* @__PURE__ */ i(
      xt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (L = (T = t.axes) == null ? void 0 : T.x) == null ? void 0 : L.hide,
        tickFormatter: c,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      je,
      {
        yAxisId: "left",
        type: "number",
        hide: (V = ($ = t.axes) == null ? void 0 : $.y) == null ? void 0 : V.hide,
        scale: $e((E = t.axes) == null ? void 0 : E.y),
        domain: Pe((O = t.axes) == null ? void 0 : O.y),
        tickFormatter: (M) => n.value(M, u, "axis"),
        label: p ? { value: p, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      je,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (re = (G = t.axes) == null ? void 0 : G.y2) == null ? void 0 : re.hide,
        scale: $e((I = t.axes) == null ? void 0 : I.y2),
        domain: Pe((Y = t.axes) == null ? void 0 : Y.y2),
        tickFormatter: (M) => n.value(M, d, "axis"),
        label: h ? { value: h, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
      At,
      {
        content: /* @__PURE__ */ i(
          mt,
          {
            labelFormatter: (M) => n.category(M),
            indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
            valueFormatter: Zt(n)
          }
        )
      }
    ),
    Se(t).show && /* @__PURE__ */ i(
      Mt,
      {
        content: /* @__PURE__ */ i(vt, { className: Se(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Ot((Q = t.legend) == null ? void 0 : Q.position),
        layout: Lt((de = t.legend) == null ? void 0 : de.position),
        align: Dt((J = t.legend) == null ? void 0 : J.position)
      }
    ),
    o.map((M) => rl(M, e, a)),
    (q = a.referenceLines) == null ? void 0 : q.map((M, Z) => /* @__PURE__ */ i(
      Yt,
      {
        yAxisId: "left",
        ...M.axis === "y" ? { y: M.value } : { x: M.value },
        label: M.label,
        stroke: `var(--${M.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      Z
    ))
  ] }) });
}
function rl(e, t, n) {
  const r = e.axis === "right" ? "right" : "left", a = `var(${Cr(e.member)})`, o = e.label ?? cn(t, e.member), s = e.curve ?? n.curve ?? "monotone", c = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    qa,
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
    pr,
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
    Ha,
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
function al(e, t) {
  var o, s, c;
  const n = new Map(e.series.map((l) => [l.key, l]));
  if (t.every((l) => n.has(l.member)) && e.categories.length > 0)
    return e.categories.map((l, u) => {
      var f;
      const d = {
        __cat: typeof l == "number" ? l : String(l)
      };
      for (const p of t) d[p.member] = ((f = n.get(p.member)) == null ? void 0 : f.data[u]) ?? null;
      return d;
    });
  const a = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((c = (s = e.raw.query.timeDimensions) == null ? void 0 : s[0]) == null ? void 0 : c.dimension);
  return e.raw.rows.map((l) => {
    const u = a ? l[a] : void 0, d = {
      __cat: u == null ? "" : String(u)
    };
    for (const f of t) d[f.member] = ol(l[f.member]);
    return d;
  });
}
function cn(e, t) {
  var n, r, a, o;
  return ((r = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : r.shortTitle) ?? ((o = (a = e.raw.annotation) == null ? void 0 : a.measures[t]) == null ? void 0 : o.title) ?? t;
}
function ol(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ct = "cv:w-40", il = "cv:w-56", Lo = "a date or category", qn = [
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
  { id: "x", label: "Category", hint: Lo, cardinality: "one", kinds: ["time", "category"] },
  {
    id: "color",
    label: "Split by",
    hint: "one color per value",
    cardinality: "one",
    kinds: ["category"],
    optional: !0
  }
], cl = [
  { id: "x", label: "Category", hint: Lo, cardinality: "one", kinds: ["time", "category"] },
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
], sl = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], ll = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], ul = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], dl = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], ml = ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo"], Be = (e) => ml.indexOf(e), nr = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: Ga,
    order: Be("bar"),
    component: Ms,
    optionsSchema: Ke.bar,
    defaults: He.bar,
    wells: qn,
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
    sidebarWidthClass: ct
  },
  line: {
    family: "line",
    label: "Line",
    icon: Hi,
    order: Be("line"),
    component: Os,
    optionsSchema: Ke.line,
    defaults: He.line,
    wells: qn,
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
    sidebarWidthClass: ct
  },
  area: {
    family: "area",
    label: "Area",
    icon: Ki,
    order: Be("area"),
    component: Ls,
    optionsSchema: Ke.area,
    defaults: He.area,
    wells: qn,
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
    sidebarWidthClass: ct
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: qi,
    order: Be("pie"),
    component: Ds,
    optionsSchema: Ke.pie,
    defaults: He.pie,
    wells: sl,
    zones: { left: ["size"], bottom: ["slices"] },
    dualAxisY: !1,
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
    icon: Vi,
    order: Be("scatter"),
    component: Ts,
    optionsSchema: Ke.scatter,
    defaults: He.scatter,
    wells: ll,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    dualAxisY: !1,
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
    icon: ji,
    order: Be("kpi"),
    component: $s,
    optionsSchema: Ke.kpi,
    defaults: He.kpi,
    wells: ul,
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
    sidebarWidthClass: il
  },
  table: {
    family: "table",
    label: "Table",
    icon: Ii,
    order: Be("table"),
    component: Us,
    optionsSchema: Ke.table,
    defaults: He.table,
    wells: dl,
    zones: { left: ["columns"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: ct
  },
  combo: {
    family: "combo",
    label: "Combo",
    icon: $i,
    order: Be("combo"),
    component: nl,
    optionsSchema: Ke.combo,
    defaults: He.combo,
    wells: cl,
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
    sidebarWidthClass: ct
  }
}, ft = /* @__PURE__ */ new Map();
for (const e of Object.keys(nr))
  ft.set(e, nr[e]);
function vl(e) {
  ft.set(e.family, e);
}
function Bh(e) {
  return ft.get(e);
}
function ge(e) {
  const t = ft.get(e);
  if (!t)
    throw new Error(
      `Unknown chart family "${e}". Register it with registerChartFamily(...) (or via <CubeVizProvider families={[...]}>) before rendering/editing a spec that uses it.`
    );
  return t;
}
function fl() {
  return [...ft.values()].sort((e, t) => e.order - t.order || e.family.localeCompare(t.family));
}
function hl() {
  return fl().map((e) => e.family);
}
function Do(e) {
  var t;
  return ((t = ft.get(e)) == null ? void 0 : t.defaults) ?? Cs;
}
function Wh(e) {
  var t;
  return ((t = ft.get(e)) == null ? void 0 : t.optionsSchema) ?? pl;
}
const pl = m.any();
function gl(e) {
  return Ns(e, Do(e.family));
}
const Uh = Object.fromEntries(
  Object.entries(nr).map(([e, t]) => [e, t.component])
);
function bl({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: o,
  editing: s
}) {
  const c = gl(t);
  if (a != null && a.loading)
    return /* @__PURE__ */ i(Jc, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (a != null && a.error)
    return /* @__PURE__ */ v(Nr, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Ya, {}),
      /* @__PURE__ */ i(Sr, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(_r, { children: a.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const l = n && Object.keys(n).length > 0 ? n : As(e), u = r ?? wo(e.raw.annotation, c, Rr), d = (o == null ? void 0 : o[c.family]) ?? ge(c.family).component;
  return /* @__PURE__ */ i(
    d,
    {
      data: e,
      options: c,
      config: l,
      format: u,
      state: a,
      editing: s
    }
  );
}
const xe = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Kn = 8;
function rr(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : xe, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, d) => r[u] ?? d, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = a(u.key, u.colorToken);
    d && o.add(d);
  }
  let s = 0;
  const c = () => {
    for (let u = 0; u < n.length; u++) {
      const d = n[s++ % n.length];
      if (!o.has(d))
        return o.add(d), d;
    }
    return n[s++ % n.length];
  };
  return e.map((u) => a(u.key, u.colorToken) ?? c());
}
function ma(e, t) {
  const n = rr(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function yl(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function rn(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = yl(e[n]);
  return t;
}
function xl(e) {
  return {
    measures: rn(e.measures ?? {}),
    dimensions: rn(e.dimensions ?? {}),
    segments: rn(e.segments ?? {}),
    timeDimensions: rn(e.timeDimensions ?? {})
  };
}
function yt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function Sn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let s = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!s || s.kind === void 0 || s.kind === "auto") && (s = { ...s, kind: "currency" }), s && (a.format = s), t != null && t.axis && (a.axis = t.axis), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function wl(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function kl(e, t) {
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
function Cl(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, o] of t) {
      const s = _n(r[a]);
      s !== null && (r[a] = o.to(s));
    }
    return r;
  });
}
function Nl(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((o) => o === null ? null : a.to(o)));
    }
}
function Sl(e, t, n, r) {
  const a = xl(e.annotation()), o = kl(a, r), s = Cl(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const d = n.measures ?? [];
    if (ge(t.family).measureOnly && d.length > 0) {
      const f = s[0] ?? {}, p = [
        {
          key: "value",
          label: "Value",
          data: d.map((b) => _n(f[b])),
          meta: { ...Sn(yt(a, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return ma(p, t.colors), { categories: d.map(
        (b) => {
          var g, k;
          return ((g = yt(a, b)) == null ? void 0 : g.shortTitle) ?? ((k = yt(a, b)) == null ? void 0 : k.title) ?? b;
        }
      ), series: p, raw: { rows: s, annotation: a, query: n }, empty: s.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: a, query: n },
      empty: s.length === 0
    };
  }
  const l = c.series.mode === "measures" ? Rl(e, c.series, t, a) : Al(e, c.category.member, c.series, t, a), u = _l(e, c);
  return Nl(l, o), ma(l, t.colors), {
    categories: u,
    series: l,
    raw: { rows: s, annotation: a, query: n },
    empty: s.length === 0
  };
}
function _l(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Rl(e, t, n, r) {
  const { members: a, meta: o } = t, s = e.chartPivot();
  return a.map((c) => {
    const l = yt(r, c), u = o == null ? void 0 : o[c], d = s.map((f) => _n(f[c]));
    return {
      key: c,
      label: wl(l, u, c),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...Sn(l, u, n.format), measure: c }
    };
  });
}
function Al(e, t, n, r, a) {
  const { value: o, values: s, pivot: c } = n, l = s && s.length > 0 ? s : [o], u = new Set(l), d = l.length > 1, f = { x: [t], y: [c, "measures"] }, h = e.seriesNames(f).filter((y) => {
    const w = y.yValues && y.yValues.length >= 2 ? y.yValues[y.yValues.length - 1] : void 0;
    return w === void 0 || u.has(w);
  }), b = e.chartPivot(f), g = yt(a, o), k = h.map((y) => {
    var L, $;
    const w = (L = y.yValues) == null ? void 0 : L[0], C = y.yValues && y.yValues.length >= 2 ? y.yValues[y.yValues.length - 1] : o, R = yt(a, C), _ = (R == null ? void 0 : R.shortTitle) ?? (R == null ? void 0 : R.title) ?? C, N = w ?? y.shortTitle ?? y.title ?? y.key, F = d ? `${_} · ${N}` : N, D = b.map((V) => _n(V[y.key])), T = ($ = n.meta) == null ? void 0 : $[C];
    return {
      key: y.key,
      label: F,
      data: D,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...Sn(R ?? g, T, r.format),
        measure: C
      }
    };
  });
  return Ml(k, g, r.format);
}
function Ml(e, t, n) {
  var d, f, p;
  if (e.length <= Kn) return e;
  const r = (h) => h.data.reduce((b, g) => b + (g ?? 0), 0), a = [...e].sort((h, b) => r(b) - r(h)), o = a.slice(0, Kn - 1), s = a.slice(Kn - 1), c = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, l = Array.from({ length: c }, (h, b) => {
    let g = 0, k = !1;
    for (const y of s) {
      const w = y.data[b];
      w !== null && (g += w, k = !0);
    }
    return k ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${s.length})`,
    data: l,
    meta: { ...Sn(t, void 0, n), ...(p = (f = o[0]) == null ? void 0 : f.meta) != null && p.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function _n(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Ct(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Ol = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Ll(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Wt(e, t, n) {
  var r;
  if (Le(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function Dl(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = Wt(o, t, n);
    if (!Ct(s))
      if (Array.isArray(s))
        for (const c of s)
          Ct(c) || a.push(c);
      else
        a.push(s);
  }
  return a.length === 0 ? r ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: a };
}
function zl(e, t, n) {
  if ("and" in e) {
    const r = ar(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = ar(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return Dl(e, t, n);
}
function ar(e, t, n) {
  const r = [];
  for (const a of e) {
    const o = zl(a, t, n);
    o !== void 0 && r.push(o);
  }
  return r;
}
function Tl(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Wt(e.granularity, t, n);
    Ct(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Wt(e.dateRange, t, n);
    Ct(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function El(e, t, n) {
  const r = Ol(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((o) => Tl(o, r, t))), e.filters !== void 0) {
    const o = ar(e.filters, r, t);
    o.length > 0 && (a.filters = o);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Wt(e.limit, r, t);
    Ct(o) || (a.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Wt(e.offset, r, t);
    Ct(o) || (a.offset = o);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function Fl(e, t) {
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
class Pl extends Error {
}
const $l = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Pl(`"${e}" cannot be parsed into a number`);
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
function va(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Il extends Error {
}
class fa extends Error {
}
class jl extends Error {
}
class Hn extends Error {
}
class Vl extends Error {
}
class ql {
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
      throw new fa(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return va(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new jl(`Cannot convert incompatible measures of ${a.measure} and ${o.measure}`);
    let s = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (s = this.cls.sub(s, this.convertFraction(o.unit.anchor_shift))), o.system != a.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Hn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${a.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Hn(`Unable to find anchor for "${o.measure}" to "${a.measure}". Please make sure it is defined.`);
      const d = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        s = d(s, this.cls);
      else if (typeof f == "number")
        s = this.cls.mul(s, f);
      else if (va(f))
        s = this.cls.mul(s, this.convertFraction(f));
      else
        throw new Hn("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new fa(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let s = [], c = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (s = (n = t.exclude) !== null && n !== void 0 ? n : [], c = (r = t.cutOffNumber) !== null && r !== void 0 ? r : c, l = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const f = this.describe(d);
      if (s.indexOf(d) === -1 && f.system === l) {
        const h = this.to(d);
        if (o ? this.cls.gt(h, c) : this.cls.lt(h, c))
          continue;
        (u === null || (o ? this.cls.lte(h, c) && this.cls.gt(h, u.val) : this.cls.gte(h, c) && this.cls.lt(h, u.val))) && (u = {
          val: h,
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
        throw new Vl(`Meausure "${t}" not found.`);
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
    throw new Il(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Kl(e) {
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
function Hl(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Kl(e);
  return (r) => new ql({
    measures: e,
    unitCache: n,
    cls: $l
  }, r);
}
const Bl = {
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
}, Wl = {
  systems: {
    metric: Bl
  }
}, Ul = {
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
}, Gl = {
  systems: {
    SI: Ul
  }
}, Yl = {
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
}, Ql = {
  systems: {
    SI: Yl
  }
}, Jl = {
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
}, Xl = {
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
}, Zl = {
  systems: {
    metric: Jl,
    imperial: Xl
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
}, eu = {
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
}, tu = {
  systems: {
    SI: eu
  }
}, nu = {
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
}, ru = {
  systems: {
    SI: nu
  }
}, au = {
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
}, ou = {
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
}, iu = {
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
}, cu = {
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
}, su = {
  systems: {
    bit: au,
    byte: ou,
    IECBit: iu,
    IECByte: cu
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
}, lu = {
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
}, uu = {
  systems: {
    metric: lu
  }
}, du = {
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
}, mu = {
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
}, vu = {
  systems: {
    SI: du,
    nutrition: mu
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
}, fu = {
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
}, hu = {
  systems: {
    SI: fu
  }
}, pu = {
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
}, gu = {
  systems: {
    SI: pu
  }
}, bu = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, yu = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, xu = {
  systems: {
    metric: bu,
    imperial: yu
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
}, wu = {
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
}, ku = {
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
}, Cu = {
  systems: {
    metric: wu,
    imperial: ku
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
}, Nu = {
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
}, Su = {
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
}, _u = {
  systems: {
    metric: Nu,
    imperial: Su
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
}, Ru = {
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
}, Au = {
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
}, Mu = {
  systems: {
    metric: Ru,
    imperial: Au
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
}, Ou = {
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
}, Lu = {
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
}, Du = {
  systems: {
    metric: Ou,
    imperial: Lu
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
}, zu = {
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
}, Tu = {
  systems: {
    SI: zu
  }
}, Eu = {
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
}, Fu = {
  systems: {
    unit: Eu
  }
}, Pu = {
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
}, $u = {
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
}, Iu = {
  systems: {
    metric: Pu,
    imperial: $u
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
}, ju = {
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
}, Vu = {
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
}, qu = {
  systems: {
    metric: ju,
    imperial: Vu
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
}, Ku = {
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
}, Hu = {
  systems: {
    SI: Ku
  }
}, Bu = {
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
}, Wu = {
  systems: {
    SI: Bu
  }
}, Uu = {
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
}, Gu = {
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
}, Qu = {
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
}, Ju = {
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
}, Xu = {
  systems: {
    metric: Qu,
    imperial: Ju
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
}, Zu = {
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
}, ed = {
  systems: {
    SI: Zu
  }
}, td = {
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
}, nd = {
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
}, rd = {
  systems: {
    metric: td,
    imperial: nd
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
}, ad = {
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
}, od = {
  systems: {
    SI: ad
  }
}, id = {
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
}, cd = {
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
}, sd = {
  systems: {
    metric: id,
    imperial: cd
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
}, ld = {
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
}, ud = {
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
}, dd = {
  systems: {
    metric: ld,
    imperial: ud
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
}, md = {
  acceleration: Wl,
  angle: Gl,
  apparentPower: Ql,
  area: Zl,
  charge: tu,
  current: ru,
  digital: su,
  each: uu,
  energy: vu,
  force: hu,
  frequency: gu,
  illuminance: xu,
  length: Cu,
  mass: _u,
  massFlowRate: Mu,
  pace: Du,
  partsPer: Tu,
  pieces: Fu,
  power: Iu,
  pressure: qu,
  reactiveEnergy: Hu,
  reactivePower: Wu,
  speed: Yu,
  torque: rd,
  temperature: Xu,
  time: ed,
  voltage: od,
  volume: sd,
  volumeFlowRate: dd
}, vd = Hl(md), fd = {
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
function hd(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => vd(t).from(e.from).to(e.to)
  };
}
const or = {
  ...Object.fromEntries(
    Object.entries(fd).map(([e, t]) => [e, hd(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function Rn(e) {
  return e ? { ...or, ...e } : or;
}
function pd(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function gd(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function bd(e) {
  return e != null && e.quantity ? gd(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const yd = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function xd(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function ha(e, t) {
  const n = e * (yd[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], s = o.map(([l, u], d) => {
    const f = d < o.length - 1 ? Math.floor(a / l) : Math.round(a / l);
    return a -= f * l, [f, u];
  }), c = s.findIndex((l) => l[0] > 0);
  return c === -1 ? "0s" : r + s.slice(c, c + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function Bn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [o, s] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= o) return xd((e / o).toFixed(n.decimals ?? 1)) + s;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function wd(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function pa(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function zo(e = or) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Rr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return ha(n, r == null ? void 0 : r.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return pa(Bn(n, t), o.prefix, o.suffix);
    }
    if (a === "time") return ha(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return pa(Bn(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const s = r == null ? void 0 : r.unit, c = s ? wd(a, s) : {}, l = (o == null ? void 0 : o.prefix) ?? c.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : c.suffix ?? "";
    return `${l}${Bn(n, t)}${u}`;
  };
}
const Dr = Ua(null);
Dr.displayName = "CubeVizContext";
function Ze() {
  const e = gr(Dr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function kd(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Gh({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  families: o,
  children: s
}) {
  ee(() => {
    for (const h of o ?? []) vl(h);
  }, [o]);
  const c = ee(
    () => kd(e) ? Gc(e) : e,
    [e]
  ), l = ee(
    () => {
      var h;
      return {
        chartRamp: (h = t == null ? void 0 : t.chartRamp) != null && h.length ? t.chartRamp : xe,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), u = ee(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), d = ee(() => a ?? {}, [a]), f = ee(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), p = ee(
    () => ({
      cubeClient: c,
      registry: d,
      locale: u,
      theme: l,
      maps: f
    }),
    [c, d, u, l, f]
  );
  return /* @__PURE__ */ i(Dr.Provider, { value: p, children: /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "cv:contents",
        l.mode === "dark" && "dark",
        l.mode === "light" && "cube-viz-light"
      ),
      children: s
    }
  ) });
}
function Cd(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? ge(t).component;
}
const Nd = 5e3;
function Sd(e, t) {
  const { cubeClient: n } = Ze(), r = (t == null ? void 0 : t.skip) ?? !1, a = ee(
    () => e.limit === void 0 ? { ...e, limit: Nd } : e,
    [e]
  ), o = ee(() => JSON.stringify(a), [a]), [s, c] = wt({ isLoading: !r }), [l, u] = wt(0), d = Ge(() => u((f) => f + 1), []);
  return Qt(() => {
    if (r) {
      c({ isLoading: !1 });
      return;
    }
    let f = !0;
    return c((p) => ({ resultSet: p.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0 }).then((p) => {
      f && c({
        resultSet: p,
        isLoading: !1
      });
    }).catch((p) => {
      f && c({
        isLoading: !1,
        error: p instanceof Error ? p : new Error(String(p))
      });
    }), () => {
      f = !1;
    };
  }, [n, o, r, l]), { ...s, refetch: d };
}
const An = Ua(null);
An.displayName = "DashboardContext";
function zr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = gt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: Fl(r, t), key: r });
  const o = a.current.store, s = _d(o, r);
  return Li(An.Provider, { value: s }, n);
}
function _d(e, t) {
  const n = Di(
    e.subscribe,
    e.getAll,
    e.getAll
  ), r = Ge(
    (s, c) => e.set(s, c),
    [e]
  ), a = Ge(
    (s) => El(s, e.getAll(), t),
    [e, t]
  ), o = Ge(
    (s) => Ll(s, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ vars: n, setVar: r, resolveQuery: a, resolveValue: o, decls: t }),
    [n, r, a, o, t]
  );
}
function To() {
  const e = gr(An);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function Tr() {
  return gr(An);
}
function Wn(e, t, n) {
  var h;
  const r = Tr(), { locale: a } = Ze(), o = ee(
    () => r && !(n != null && n.skipResolve) ? r.resolveQuery(e) : e,
    [r, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: s, isLoading: c, error: l, refetch: u } = Sd(o, { skip: n == null ? void 0 : n.skip }), d = ((h = t.format) == null ? void 0 : h.unitSystem) ?? (a == null ? void 0 : a.unitSystem), f = ee(() => Rn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ee(() => {
    if (s)
      return Sl(s, t, o, { unitSystem: d, conversions: f });
  }, [s, t, o, d, f]), isLoading: c, error: l, refetch: u, resolvedQuery: o };
}
function et() {
  const { cubeClient: e } = Ze(), [t, n] = wt({ isLoading: !0 });
  return Qt(() => {
    let r = !0;
    return n({ isLoading: !0 }), Yc(e).then((a) => {
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
function Yh() {
  const { locale: e } = Ze(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? zo(Rn(n)),
    [t, n]
  );
}
function Eo() {
  const [e, t] = wt(0), n = gt(null), r = gt(null), a = gt(null), o = gt(0), s = Ge((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), c = Ge(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), l = Ge(
    (u) => {
      if (c(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== o.current && (o.current = d, t(d));
      const f = new ResizeObserver((p) => {
        var h, b;
        for (const g of p) {
          const k = ((b = (h = g.contentBoxSize) == null ? void 0 : h[0]) == null ? void 0 : b.inlineSize) ?? g.contentRect.width;
          s(k);
        }
      });
      f.observe(u), r.current = f;
    },
    [s, c]
  );
  return Qt(() => c, [c]), [l, e];
}
const Rd = "day";
function Ad(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const a = r.member ?? (n == null ? void 0 : n.measure), o = (d = e.timeDimensions) == null ? void 0 : d[0], s = r.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!a || !s) return null;
  const c = r.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [a],
    timeDimensions: [
      {
        dimension: s,
        granularity: r.granularity ?? Rd,
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
const oe = (e) => pe(e, "yyyy-MM-dd");
function Md(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = un(e[0]), o = un(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(o.getTime())) return;
    const s = hc(o, a) + 1;
    return [oe(Oe(a, s)), oe(Oe(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = Oe(t, 1);
    return [oe(a), oe(a)];
  }
  if (n === "yesterday") {
    const a = Oe(t, 2);
    return [oe(a), oe(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), o = r[2];
    if (o.startsWith("day")) return [oe(Oe(t, 2 * a - 1)), oe(Oe(t, a))];
    if (o.startsWith("week")) return [oe(Oe(t, 14 * a - 1)), oe(Oe(t, 7 * a))];
    if (o.startsWith("month"))
      return [oe(Tn(En(t, 2 * a))), oe(Oe(Tn(En(t, a)), 1))];
    if (o.startsWith("quarter"))
      return [oe(Fn(Pn(t, 2 * a))), oe(Oe(Fn(Pn(t, a)), 1))];
    if (o.startsWith("year"))
      return [oe($n(In(t, 2 * a))), oe(Oe($n(In(t, a)), 1))];
  }
  if (n === "this week") {
    const a = pc(t, 1);
    return [oe(gc(a)), oe(bc(a))];
  }
  if (n === "this month") {
    const a = En(t, 1);
    return [oe(Tn(a)), oe(yc(a))];
  }
  if (n === "this quarter") {
    const a = Pn(t, 1);
    return [oe(Fn(a)), oe(xc(a))];
  }
  if (n === "this year") {
    const a = In(t, 1);
    return [oe($n(a)), oe(wc(a))];
  }
}
function Od(e, t) {
  var l, u;
  const n = t.familyOptions ?? {}, r = ge(t.family).comparePreviousMode;
  if (r === "series") {
    if (!n.comparePrevious) return null;
  } else if (r === "kpiRow") {
    if (((l = n.comparison) == null ? void 0 : l.mode) !== "previousPeriod") return null;
  } else
    return null;
  const a = (u = e.timeDimensions) == null ? void 0 : u[0];
  if (!a) return null;
  const o = a.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const s = Md(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...a, dateRange: s, compareDateRange: void 0 }]
  }, mode: r } : null;
}
const Ld = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Er({ query: e, chart: t, onState: n, editing: r }) {
  const { registry: a, locale: o } = Ze(), s = ee(() => {
    var N;
    return (N = t.format) != null && N.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), c = ee(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: l, isLoading: u, error: d, refetch: f, resolvedQuery: p } = Wn(c, s), h = ee(() => Ad(c, s), [c, s]), b = Wn(
    (h == null ? void 0 : h.query) ?? c,
    (h == null ? void 0 : h.chart) ?? s,
    { skip: !h }
  ), g = ee(
    () => Od(p, s),
    [p, s]
  ), k = Wn(
    (g == null ? void 0 : g.query) ?? c,
    s,
    { skip: !g, skipResolve: !0 }
  ), y = ee(
    () => ({ [s.family]: Cd(a, s.family) }),
    [a, s.family]
  ), w = ee(() => {
    let N = l ?? Ld;
    if (h && b.data && (N = { ...N, series: b.data.series, categories: b.data.categories }), g && k.data) {
      if (g.mode === "kpiRow") {
        const F = k.data.raw.rows[0];
        if (F) {
          const D = N.raw.rows[0];
          N = {
            ...N,
            raw: { ...N.raw, rows: D ? [D, F] : [F] }
          };
        }
      } else if (N.series.length > 0) {
        const F = k.data.series.map((D) => {
          const T = N.series.find((L) => L.key === D.key);
          return {
            ...D,
            key: `${D.key}__prev`,
            label: `${(T == null ? void 0 : T.label) ?? D.label} (prev)`,
            colorToken: (T == null ? void 0 : T.colorToken) ?? D.colorToken,
            meta: { ...D.meta, companion: !0 }
          };
        });
        N = { ...N, series: [...N.series, ...F] };
      }
    }
    return N;
  }, [l, h, b.data, g, k.data]);
  Qt(() => {
    n == null || n({ rows: w.raw.rows, refetch: f, isLoading: u });
  }, [n, w.raw.rows, f, u]);
  const C = {}, R = ee(
    () => o.formatValue ?? zo(Rn(o.units)),
    [o.formatValue, o.units]
  ), _ = ee(
    () => wo(w.raw.annotation, s, R, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [w.raw.annotation, s, R, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    bl,
    {
      data: w,
      options: s,
      config: C,
      format: _,
      state: { loading: u && !l, error: d },
      components: y,
      editing: r
    }
  );
}
function Dd({ spec: e }) {
  return /* @__PURE__ */ i(Er, { query: e.query, chart: e.chart });
}
const Fo = "cube-viz-prose";
function zd(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Td({ doc: e }) {
  const t = zd(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), r = co(
    {
      extensions: [lo],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: S(Fo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(so, { editor: r }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
}
const sn = [
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
], Ed = Object.fromEntries(
  sn.map((e) => [e.value, e.label])
);
function ga(e) {
  return Ed[e.trim().toLowerCase()] ?? e;
}
const Fd = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function Pd({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Cc(), a = S(Oo({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
  return /* @__PURE__ */ v("div", { className: "cv:mb-2 cv:flex cv:items-center cv:justify-between cv:gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: S(a, !r && "cv:opacity-40"),
        children: /* @__PURE__ */ i(br, { className: "cv:size-4" })
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
        children: /* @__PURE__ */ i(Jt, { className: "cv:size-4" })
      }
    )
  ] });
}
function $d({ day: e, modifiers: t, className: n, style: r, ...a }) {
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
function Po({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ i(
    kc,
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
        MonthCaption: Pd,
        DayButton: $d,
        Chevron: ({ orientation: a, className: o, ...s }) => /* @__PURE__ */ i(a === "left" ? br : Jt, { className: S("cv:size-4", o), ...s })
      },
      ...r
    }
  );
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ i(ln.Root, { "data-slot": "popover", ...e });
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ i(ln.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Me({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ i(ln.Portal, { children: /* @__PURE__ */ i(
    ln.Content,
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
function De({
  ...e
}) {
  return /* @__PURE__ */ i(we.Root, { "data-slot": "select", ...e });
}
function ir({
  ...e
}) {
  return /* @__PURE__ */ i(we.Group, { "data-slot": "select-group", ...e });
}
function ze({
  ...e
}) {
  return /* @__PURE__ */ i(we.Value, { "data-slot": "select-value", ...e });
}
function Te({
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
        /* @__PURE__ */ i(we.Icon, { asChild: !0, children: /* @__PURE__ */ i(Je, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function Id({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    we.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Bi, { className: "cv:size-4" })
    }
  );
}
function jd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    we.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Je, { className: "cv:size-4" })
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
        /* @__PURE__ */ i(Id, {}),
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
        /* @__PURE__ */ i(jd, {})
      ]
    }
  ) });
}
function cr({
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
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(we.ItemIndicator, { children: /* @__PURE__ */ i(Ve, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(we.ItemText, { children: t })
      ]
    }
  );
}
const Nt = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), Vd = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", It = "yyyy-MM-dd";
function qd(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ba(e) {
  if (!e) return;
  const t = oo(e, It, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Kd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? Fd, [o, s] = wt(!1), c = typeof e == "string", [l, u] = qd(e), d = ba(l), f = ba(u), p = d ? { from: d, to: f } : void 0;
  let h;
  c ? h = ga(e) : d && f ? h = `${pe(d, "MMM d, yyyy")} – ${pe(f, "MMM d, yyyy")}` : d ? h = pe(d, "MMM d, yyyy") : h = "Pick a date range";
  const b = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Re, { open: o, onOpenChange: s, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      B,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          h === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(Qa, { className: "cv:mr-2 cv:size-4" }),
          h
        ]
      }
    ) }),
    /* @__PURE__ */ v(Me, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: a.map((g) => /* @__PURE__ */ i(
        B,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), s(!1);
          },
          children: ga(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        Po,
        {
          mode: "range",
          selected: p,
          defaultMonth: d,
          disabled: b,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([pe(g.from, It), pe(g.to, It)]) : g != null && g.from ? t([pe(g.from, It), pe(g.from, It)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Hd = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Bd(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Wd(e) {
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
function Ud({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = To(), o = r.rangeVariable ? Wd(a(r.rangeVariable)) : void 0, s = r.options ?? (o !== void 0 ? Bd(o) : Hd), c = typeof e == "string" ? e : "", l = s.join(",");
  return Qt(() => {
    c && !s.includes(c) && t(s[0]);
  }, [c, l]), /* @__PURE__ */ v(
    De,
    {
      value: c,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Te, { className: Nt, children: /* @__PURE__ */ i(ze, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Ee, { children: s.map((u) => /* @__PURE__ */ i(ye, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Gd({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((s) => String(s))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(Nt, "cv:h-auto cv:min-h-[6rem]"),
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
    De,
    {
      value: a,
      onValueChange: (o) => {
        const s = r.options.find((c) => String(c.value) === o);
        t(s ? s.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(Te, { className: Nt, children: /* @__PURE__ */ i(ze, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Ee, { children: r.options.map((o) => /* @__PURE__ */ i(ye, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function Yd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: o } = et(), s = ee(() => {
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
      className: Nt,
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
function Qd({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: Nt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function Jd({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: Nt,
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
function Xd({ value: e, onChange: t, decl: n }) {
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
const Zd = {
  dateRange: Kd,
  granularity: Ud,
  select: Gd,
  memberSelect: Yd,
  text: Qd,
  number: Jd,
  toggle: Xd
};
function em({ control: e, title: t }) {
  var h;
  const { registry: n } = Ze(), { decls: r, resolveValue: a, setVar: o } = To(), s = ee(
    () => r.find((b) => b.name === e.variable),
    [r, e.variable]
  );
  if (!s)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, l = ((h = n.controls) == null ? void 0 : h[c]) ?? Zd[c], u = a(e.variable), d = (b) => o(e.variable, b), f = t ?? s.label ?? s.name, p = zi();
  return c === "toggle" ? /* @__PURE__ */ i(l, { value: u, onChange: d, decl: s, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: Vd, htmlFor: p, children: f }),
    /* @__PURE__ */ i(
      l,
      {
        value: u,
        onChange: d,
        decl: s,
        control: e.control,
        controlId: p
      }
    )
  ] });
}
const $o = x.forwardRef(
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
$o.displayName = "Card";
const Io = x.forwardRef(
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
Io.displayName = "CardHeader";
const jo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
jo.displayName = "CardTitle";
const tm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
tm.displayName = "CardDescription";
const nm = x.forwardRef(
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
nm.displayName = "CardAction";
const Vo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
Vo.displayName = "CardContent";
const rm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
rm.displayName = "CardFooter";
const fn = "cube-viz-drag-handle";
function qo(e) {
  var c;
  const { registry: t } = Ze(), n = (c = t.chrome) == null ? void 0 : c.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: r, menu: a, dragHandleProps: o, children: s } = e;
  return /* @__PURE__ */ v($o, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    r ? /* @__PURE__ */ v(
      Io,
      {
        ...o,
        className: S(
          fn,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(jo, { className: "cv:truncate cv:text-sm cv:font-semibold", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ i(Vo, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: s })
  ] });
}
function am(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const s = o == null ? "" : String(o);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }, r = t.map(n).join(","), a = e.map((o) => t.map((s) => n(o[s])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function om(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), o = document.createElement("a");
  o.href = a, o.download = t, o.click(), URL.revokeObjectURL(a);
}
function im(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const cm = /* @__PURE__ */ (() => {
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
let ht = null;
function Ko(e = {}) {
  return ht || (e.includeStyleProperties ? (ht = e.includeStyleProperties, ht) : (ht = Ye(window.getComputedStyle(document.documentElement)), ht));
}
function hn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function sm(e) {
  const t = hn(e, "border-left-width"), n = hn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function lm(e) {
  const t = hn(e, "border-top-width"), n = hn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Ho(e, t = {}) {
  const n = t.width || sm(e), r = t.height || lm(e);
  return { width: n, height: r };
}
function um() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ce = 16384;
function dm(e) {
  (e.width > Ce || e.height > Ce) && (e.width > Ce && e.height > Ce ? e.width > e.height ? (e.height *= Ce / e.width, e.width = Ce) : (e.width *= Ce / e.height, e.height = Ce) : e.width > Ce ? (e.height *= Ce / e.width, e.width = Ce) : (e.width *= Ce / e.height, e.height = Ce));
}
function pn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function mm(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function vm(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), a.appendChild(o), o.appendChild(e), mm(a);
}
const ke = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || ke(n, t);
};
function fm(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function hm(e, t) {
  return Ko(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function pm(e, t, n, r) {
  const a = `.${e}:${t}`, o = n.cssText ? fm(n) : hm(n, r);
  return document.createTextNode(`${a}{${o}}`);
}
function ya(e, t, n, r) {
  const a = window.getComputedStyle(e, n), o = a.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const s = cm();
  try {
    t.className = `${t.className} ${s}`;
  } catch {
    return;
  }
  const c = document.createElement("style");
  c.appendChild(pm(s, n, a, r)), t.appendChild(c);
}
function gm(e, t, n) {
  ya(e, t, ":before", n), ya(e, t, ":after", n);
}
const xa = "application/font-woff", wa = "image/jpeg", bm = {
  woff: xa,
  woff2: xa,
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
function ym(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Fr(e) {
  const t = ym(e).toLowerCase();
  return bm[t] || "";
}
function xm(e) {
  return e.split(/,/)[1];
}
function sr(e) {
  return e.search(/^(data:)/) !== -1;
}
function wm(e, t) {
  return `data:${t};base64,${e}`;
}
async function Bo(e, t, n) {
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
const Un = {};
function km(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Pr(e, t, n) {
  const r = km(e, t, n.includeQueryParams);
  if (Un[r] != null)
    return Un[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const o = await Bo(e, n.fetchRequestInit, ({ res: s, result: c }) => (t || (t = s.headers.get("Content-Type") || ""), xm(c)));
    a = wm(o, t);
  } catch (o) {
    a = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    o && (s = typeof o == "string" ? o : o.message), s && console.warn(s);
  }
  return Un[r] = a, a;
}
async function Cm(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : pn(t);
}
async function Nm(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), s = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, o.width, o.height);
    const c = o.toDataURL();
    return pn(c);
  }
  const n = e.poster, r = Fr(n), a = await Pr(n, r, t);
  return pn(a);
}
async function Sm(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Mn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function _m(e, t) {
  return ke(e, HTMLCanvasElement) ? Cm(e) : ke(e, HTMLVideoElement) ? Nm(e, t) : ke(e, HTMLIFrameElement) ? Sm(e, t) : e.cloneNode(Wo(e));
}
const Rm = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Wo = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function Am(e, t, n) {
  var r, a;
  if (Wo(t))
    return t;
  let o = [];
  return Rm(e) && e.assignedNodes ? o = Ye(e.assignedNodes()) : ke(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = Ye(e.contentDocument.body.childNodes) : o = Ye(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), o.length === 0 || ke(e, HTMLVideoElement) || await o.reduce((s, c) => s.then(() => Mn(c, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function Mm(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Ko(n).forEach((o) => {
    let s = a.getPropertyValue(o);
    o === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), ke(e, HTMLIFrameElement) && o === "display" && s === "inline" && (s = "block"), o === "d" && t.getAttribute("d") && (s = `path(${t.getAttribute("d")})`), r.setProperty(o, s, a.getPropertyPriority(o));
  });
}
function Om(e, t) {
  ke(e, HTMLTextAreaElement) && (t.innerHTML = e.value), ke(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function Lm(e, t) {
  if (ke(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function Dm(e, t, n) {
  return ke(t, Element) && (Mm(e, t, n), gm(e, t, n), Om(e, t), Lm(e, t)), t;
}
async function zm(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const c = n[o].getAttribute("xlink:href");
    if (c) {
      const l = e.querySelector(c), u = document.querySelector(c);
      !l && u && !r[c] && (r[c] = await Mn(u, t, !0));
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
async function Mn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => _m(r, t)).then((r) => Am(e, r, t)).then((r) => Dm(e, r, t)).then((r) => zm(r, t));
}
const Uo = /url\((['"]?)([^'"]+?)\1\)/g, Tm = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, Em = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function Fm(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function Pm(e) {
  const t = [];
  return e.replace(Uo, (n, r, a) => (t.push(a), n)), t.filter((n) => !sr(n));
}
async function $m(e, t, n, r, a) {
  try {
    const o = n ? im(t, n) : t, s = Fr(t);
    let c;
    return a || (c = await Pr(o, s, r)), e.replace(Fm(t), `$1${c}$3`);
  } catch {
  }
  return e;
}
function Im(e, { preferredFontFormat: t }) {
  return t ? e.replace(Em, (n) => {
    for (; ; ) {
      const [r, , a] = Tm.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Go(e) {
  return e.search(Uo) !== -1;
}
async function Yo(e, t, n) {
  if (!Go(e))
    return e;
  const r = Im(e, n);
  return Pm(r).reduce((o, s) => o.then((c) => $m(c, s, t, n)), Promise.resolve(r));
}
async function pt(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const o = await Yo(a, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function jm(e, t) {
  await pt("background", e, t) || await pt("background-image", e, t), await pt("mask", e, t) || await pt("-webkit-mask", e, t) || await pt("mask-image", e, t) || await pt("-webkit-mask-image", e, t);
}
async function Vm(e, t) {
  const n = ke(e, HTMLImageElement);
  if (!(n && !sr(e.src)) && !(ke(e, SVGImageElement) && !sr(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Pr(r, Fr(r), t);
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
async function qm(e, t) {
  const r = Ye(e.childNodes).map((a) => Qo(a, t));
  await Promise.all(r).then(() => e);
}
async function Qo(e, t) {
  ke(e, Element) && (await jm(e, t), await Vm(e, t), await qm(e, t));
}
function Km(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const ka = {};
async function Ca(e) {
  let t = ka[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, ka[e] = t, t;
}
async function Na(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let c = s.replace(r, "$1");
    return c.startsWith("https://") || (c = new URL(c, e.url).href), Bo(c, t.fetchRequestInit, ({ result: l }) => (n = n.replace(s, `url(${l})`), [s, l]));
  });
  return Promise.all(o).then(() => n);
}
function Sa(e) {
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
async function Hm(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ye(a.cssRules || []).forEach((o, s) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let c = s + 1;
            const l = o.href, u = Ca(l).then((d) => Na(d, t)).then((d) => Sa(d).forEach((f) => {
              try {
                a.insertRule(f, f.startsWith("@import") ? c += 1 : a.cssRules.length);
              } catch (p) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: p
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            r.push(u);
          }
        });
      } catch (o) {
        const s = e.find((c) => c.href == null) || document.styleSheets[0];
        a.href != null && r.push(Ca(a.href).then((c) => Na(c, t)).then((c) => Sa(c).forEach((l) => {
          s.insertRule(l, s.cssRules.length);
        })).catch((c) => {
          console.error("Error loading remote stylesheet", c);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ye(a.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${a.href}`, o);
      }
  }), n));
}
function Bm(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Go(t.style.getPropertyValue("src")));
}
async function Wm(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ye(e.ownerDocument.styleSheets), r = await Hm(n, t);
  return Bm(r);
}
function Jo(e) {
  return e.trim().replace(/["']/g, "");
}
function Um(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((o) => {
      t.add(Jo(o));
    }), Array.from(r.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function Gm(e, t) {
  const n = await Wm(e, t), r = Um(e);
  return (await Promise.all(n.filter((o) => r.has(Jo(o.style.fontFamily))).map((o) => {
    const s = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return Yo(o.cssText, s, t);
  }))).join(`
`);
}
async function Ym(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Gm(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Qm(e, t = {}) {
  const { width: n, height: r } = Ho(e, t), a = await Mn(e, t, !0);
  return await Ym(a, t), await Qo(a, t), Km(a, t), await vm(a, n, r);
}
async function Jm(e, t = {}) {
  const { width: n, height: r } = Ho(e, t), a = await Qm(e, t), o = await pn(a), s = document.createElement("canvas"), c = s.getContext("2d"), l = t.pixelRatio || um(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return s.width = u * l, s.height = d * l, t.skipAutoScale || dm(s), s.style.width = `${u}`, s.style.height = `${d}`, t.backgroundColor && (c.fillStyle = t.backgroundColor, c.fillRect(0, 0, s.width, s.height)), c.drawImage(o, 0, 0, s.width, s.height), s;
}
async function Xm(e, t = {}) {
  return (await Jm(e, t)).toDataURL();
}
function Zm(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function ev(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function tv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function nv(e, t, n = 2) {
  const r = await Xm(e, {
    pixelRatio: n,
    backgroundColor: tv(e),
    cacheBust: !0
  });
  ev(r, `${Zm(t)}.png`);
}
function rv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, o] = x.useState(!1), s = t.length > 0, c = !!r;
  if (!s && !n && !c) return null;
  const l = () => {
    const p = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    om(am(t), `${p}.csv`);
  }, u = async () => {
    const p = r == null ? void 0 : r.current;
    if (!(!p || a)) {
      o(!0);
      try {
        await nv(p, e);
      } finally {
        o(!1);
      }
    }
  }, d = (p) => p.stopPropagation(), f = (p = !0) => S(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !p && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ i(
      Ae,
      {
        onMouseDown: d,
        onPointerDown: d,
        onTouchStart: d,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(Wi, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Me, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: d, onPointerDown: d, onTouchStart: d, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ i(Ui, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      c ? /* @__PURE__ */ v("button", { type: "button", onClick: u, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ i(Gi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: l, disabled: !s, className: f(s), children: [
        /* @__PURE__ */ i(Yi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export CSV"
      ] })
    ] })
  ] });
}
function _a({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(Er, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(Td, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(em, { control: e.control, title: e.title });
  }
}
function lr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = wt({ rows: [] }), o = Ge(
    (l) => a({ rows: l.rows, refetch: l.refetch }),
    []
  ), s = gt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(_a, { widget: e }) });
  const c = n ? null : /* @__PURE__ */ i(
    rv,
    {
      title: e.title,
      rows: r.rows,
      refetch: r.refetch,
      captureRef: s
    }
  );
  return /* @__PURE__ */ i(
    qo,
    {
      widget: e,
      title: e.title,
      menu: c,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: s, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(_a, { widget: e, onState: o }) })
    }
  );
}
const av = "lg", ov = 640;
function iv(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function cv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Qh({ spec: e, editable: t = !1 }) {
  const [n, r] = Eo(), a = e.grid ?? {}, o = a.cols ?? 12, s = a.rowHeight ?? 40, c = a.margin ?? [12, 12], l = a.containerPadding ?? c, u = ee(
    () => ({ [av]: cv(e.layout) }),
    [e.layout]
  ), d = ee(
    () => new Map(e.widgets.map((p) => [p.id, p])),
    [e.widgets]
  ), f = !t && r > 0 && r < ov;
  return /* @__PURE__ */ i(zr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "cv:w-full", children: r <= 0 ? null : f ? /* @__PURE__ */ i(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: c[1],
        padding: `${l[1]}px ${l[0]}px`
      },
      children: iv(e.layout).map((p) => {
        const h = d.get(p.i);
        if (!h) return null;
        const b = p.h * s + (p.h - 1) * c[1];
        return /* @__PURE__ */ i("div", { style: { height: b }, children: /* @__PURE__ */ i(lr, { widget: h, editable: !1 }) }, p.i);
      })
    }
  ) : /* @__PURE__ */ i(
    io,
    {
      width: r,
      layouts: u,
      breakpoints: { lg: 0 },
      cols: { lg: o },
      rowHeight: s,
      margin: c,
      containerPadding: l,
      dragConfig: { enabled: t, handle: `.${fn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((p) => {
        const h = d.get(p.i);
        return h ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(lr, { widget: h, editable: t }) }, p.i) : null;
      })
    }
  ) }) });
}
function Jh({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
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
      children: /* @__PURE__ */ i(Dd, { spec: e })
    }
  ) });
}
function On(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function st(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Ln(e) {
  return e ? e.cubes.filter((t) => st(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: On(t)
  })) : [];
}
function Ht(e, t) {
  if (!(!e || !t))
    return Ln(e).find((n) => n.name === t);
}
function $r(e) {
  return e.shortTitle || e.title || e.name;
}
function gn(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Xo(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: $r(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: gn(n, "quantity"),
    unit: gn(n, "unit")
  };
}
function ur(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: $r(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: gn(n, "quantity"),
    unit: gn(n, "unit")
  };
}
function Zo(e, t) {
  return {
    name: e.name,
    label: $r(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function dr(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!st(a) || n && a.name !== n) continue;
    const o = On(a), s = (c) => {
      c.connectedComponent = o, r.push(c);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const c of a.measures)
        st(c) && s(Xo(c, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const c of a.dimensions)
        st(c) && c.type !== "time" && s(ur(c, a.name));
    if (t === "time")
      for (const c of a.dimensions)
        st(c) && c.type === "time" && s(ur(c, a.name));
  }
  return r;
}
function sv(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!st(a) || n && !n.has(a.name)) continue;
    const o = On(a);
    for (const s of a.segments) {
      if (!st(s)) continue;
      const c = Zo(s, a.name);
      c.connectedComponent = o, r.push(c);
    }
  }
  return r;
}
function Fe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const r = On(n), a = (c) => (c && (c.connectedComponent = r), c), o = n.measures.find((c) => c.name === t) ?? n.dimensions.find((c) => c.name === t);
      if (o)
        return o.type ? "aggType" in o ? a(Xo(o, n.name)) : a(ur(o, n.name)) : void 0;
      const s = n.segments.find((c) => c.name === t);
      if (s) return a(Zo(s, n.name));
    }
}
function lv(e) {
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
const mr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), ei = {
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
function jt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function ti(e) {
  var s, c, l, u, d;
  const t = e.query, n = (s = t.measures) == null ? void 0 : s.find(Boolean);
  if (n) return jt(n);
  const r = (c = t.dimensions) == null ? void 0 : c.find(Boolean);
  if (r) return jt(r);
  const a = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (a) return jt(a);
  const o = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return jt(o);
}
function St(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function zt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Ne(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function tt(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function ni(e, t) {
  const n = {};
  for (const a of e) {
    const o = t[a];
    o && Object.keys(o).length > 0 && (n[a] = o);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const uv = "day";
function dv(e, t) {
  var u, d, f, p;
  const { query: n, chart: r } = e, a = St(r).length ? St(r) : n.measures ?? [], o = Ne(r) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((f = (d = n.timeDimensions) == null ? void 0 : d[0]) == null ? void 0 : f.dimension), s = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0, c = {
    ...e,
    chart: { ...r, family: t, mapping: void 0, familyOptions: void 0 }
  }, l = (h) => ({
    ...c,
    chart: { ...c.chart, ...h }
  });
  switch (t) {
    case "bar":
    case "line":
    case "area":
    case "pie":
      return l({ mapping: s });
    case "combo":
      return l({
        mapping: s,
        familyOptions: {
          series: a.map((h, b) => ({ member: h, render: b % 2 === 1 ? "bar" : "line" }))
        }
      });
    case "kpi":
      return l({
        familyOptions: { display: "number", ...a[0] ? { measure: a[0] } : {} }
      });
    case "scatter":
      return l({
        familyOptions: {
          ...a[0] ? { x: a[0] } : {},
          ...a[1] ? { y: a[1] } : {}
        }
      });
    case "table": {
      const h = [
        ...n.dimensions ?? [],
        ...((p = n.timeDimensions) == null ? void 0 : p.map((b) => b.dimension)) ?? [],
        ...a
      ].map((b) => ({ member: b }));
      return l({ familyOptions: h.length ? { columns: h } : void 0 });
    }
    default:
      return ge(t).supportsMapping ? l({ mapping: s }) : c;
  }
}
function Pt(e) {
  return pd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function vr(e) {
  return bd(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function mv(e) {
  return ge(e).wells;
}
function _e(e) {
  return e.chart.familyOptions ?? {};
}
function Dn(e) {
  const t = _e(e).series;
  return Array.isArray(t) ? t : [];
}
function Ir(e) {
  const t = _e(e).columns;
  return Array.isArray(t) ? t : [];
}
function vv(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function en(e) {
  var o;
  const { chart: t } = e, n = t.family, r = (s) => s ? [s] : [], a = ge(n).readWells;
  if (a) return a(e);
  switch (n) {
    case "bar":
    case "line":
    case "area": {
      const s = vv(e), c = (o = t.mapping) == null ? void 0 : o.series;
      return { y: c && c.mode === "pivot" ? c.values && c.values.length > 0 ? c.values : r(c.value) : St(t), x: r(Ne(t)), color: r(s) };
    }
    case "combo":
      return {
        x: r(Ne(t)),
        y: Dn(e).map((s) => s.member)
      };
    case "pie":
      return { slices: r(Ne(t)), size: r(St(t)[0]) };
    case "scatter": {
      const s = _e(e);
      return {
        sx: r(s.x),
        sy: r(s.y),
        size: r(s.size),
        color: r(s.groupBy)
      };
    }
    case "kpi":
      return { value: r(_e(e).measure) };
    case "table":
      return { columns: Ir(e).map((s) => s.member) };
    default:
      return {};
  }
}
function zn(e) {
  const t = fv(e);
  return t === void 0 ? uv : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function fv(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function tn(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function ut(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Tt(e, t) {
  return { ...e, dimensions: tn(e.dimensions, t) };
}
function Ie(e, t) {
  const n = ut(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function qe(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function dt(e, t, n) {
  if (e)
    return { category: { member: e }, series: ni(t, n) };
}
function bn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function yn(e, t, n, r) {
  if (!e || t.length === 0) return;
  const a = {};
  for (const c of t) {
    const l = r == null ? void 0 : r[c];
    l && Object.keys(l).length > 0 && (a[c] = l);
  }
  const o = Object.keys(a).length > 0, s = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: a } : {} };
  return { category: { member: e }, series: s };
}
function Ra(e, t, n, r, a) {
  const o = ge(t).placeField;
  if (o) return o(e, n, r, a);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return pv(e, n, r, a);
    case "combo":
      return yv(e, n, r, a);
    case "pie":
      return kv(e, n, r, a);
    case "scatter":
      return Nv(e, n, r);
    case "kpi":
      return _v(e, r);
    case "table":
      return Av(e, r, a);
    default:
      return e;
  }
}
function hv(e, t, n, r) {
  const a = ge(t).removeField;
  if (a) return a(e, n, r);
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return bv(e, n, r);
    case "combo":
      return wv(e, n, r);
    case "pie":
      return Cv(e, n, r);
    case "scatter":
      return Sv(e, n, r);
    case "kpi":
      return Rv(e, r);
    case "table":
      return Mv(e, r);
    default:
      return e;
  }
}
function pv(e, t, n, r) {
  const { query: a, chart: o } = e, s = en(e), c = s.color[0], l = Ne(o), u = zt(o);
  if (t === "y") {
    const d = s.y, f = tn(d, n);
    return c ? {
      ...e,
      query: { ...a, measures: f },
      chart: { ...o, mapping: yn(l, f, c, bn(o)) }
    } : {
      ...e,
      query: { ...a, measures: f },
      chart: { ...o, mapping: dt(l, f, u) }
    };
  }
  if (t === "x")
    return gv(e, n, r, c);
  if (t === "color") {
    const d = s.y;
    if (d.length === 0) return e;
    const f = Tt({ ...a, measures: d }, n);
    return {
      ...e,
      query: f,
      chart: { ...o, mapping: yn(l, d, n, bn(o)) }
    };
  }
  return e;
}
function gv(e, t, n, r) {
  const { query: a, chart: o } = e, s = Ne(o), c = en(e).y, l = zt(o);
  let u = a;
  const d = tt(a);
  if (d && s === d.dimension ? u = qe(u, void 0) : s && (u = Ie(u, s)), n === "time") {
    const p = (d == null ? void 0 : d.granularity) ?? zn(d == null ? void 0 : d.dateRange);
    u = qe(u, {
      dimension: t,
      granularity: p,
      dateRange: d == null ? void 0 : d.dateRange
    });
  } else
    u = Tt(u, t);
  const f = r ? yn(t, c, r, bn(o)) : dt(t, c, l);
  return { ...e, query: u, chart: { ...o, mapping: f } };
}
function bv(e, t, n) {
  const { query: r, chart: a } = e, o = en(e), s = Ne(a), c = o.color[0], l = zt(a);
  if (t === "y") {
    const u = ut(o.y, n);
    if (c && u.length >= 1)
      return {
        ...e,
        query: { ...r, measures: u },
        chart: { ...a, mapping: yn(s, u, c, bn(a)) }
      };
    const d = c ? Ie({ ...r, measures: u }, c) : { ...r, measures: u };
    return { ...e, query: d, chart: { ...a, mapping: dt(s, u, l) } };
  }
  if (t === "x") {
    let u = r;
    const d = tt(r);
    return d && d.dimension === n ? u = qe(u, void 0) : u = Ie(u, n), { ...e, query: u, chart: { ...a, mapping: void 0 } };
  }
  if (t === "color") {
    const u = Ie(r, n);
    return {
      ...e,
      query: u,
      chart: { ...a, mapping: dt(s, o.y, l) }
    };
  }
  return e;
}
const Aa = ["line", "bar"];
function yv(e, t, n, r) {
  const { query: a, chart: o } = e, s = _e(e);
  if (t === "x") {
    let c = a;
    const l = Ne(o), u = tt(a);
    if (u && l === u.dimension ? c = qe(c, void 0) : l && (c = Ie(c, l)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? zn(u == null ? void 0 : u.dateRange);
      c = qe(c, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      c = Tt(c, n);
    return { ...e, query: c, chart: { ...o, mapping: { category: { member: n }, series: xv(e) } } };
  }
  if (t === "y") {
    const c = Dn(e);
    if (c.some((d) => d.member === n)) return e;
    const l = Aa[c.length % Aa.length], u = [...c, { member: n, render: l }];
    return {
      ...e,
      query: { ...a, measures: tn(a.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...s, series: u }, mapping: ri(o, u) }
    };
  }
  return e;
}
function ri(e, t) {
  const n = Ne(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((r) => r.member) } } : e.mapping;
}
function xv(e) {
  return { mode: "measures", members: Dn(e).map((t) => t.member) };
}
function wv(e, t, n) {
  const { query: r, chart: a } = e, o = _e(e);
  if (t === "x") {
    let s = r;
    const c = tt(r);
    return c && c.dimension === n ? s = qe(s, void 0) : s = Ie(s, n), { ...e, query: s, chart: { ...a, mapping: void 0 } };
  }
  if (t === "y") {
    const s = Dn(e).filter((l) => l.member !== n), c = ut(r.measures, n);
    return {
      ...e,
      query: { ...r, measures: c },
      chart: { ...a, familyOptions: { ...o, series: s }, mapping: ri(a, s) }
    };
  }
  return e;
}
function kv(e, t, n, r) {
  const { query: a, chart: o } = e, s = zt(o);
  if (t === "slices") {
    let c = a;
    const l = Ne(o), u = tt(a);
    if (u && l === u.dimension ? c = qe(c, void 0) : l && (c = Ie(c, l)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? zn(u == null ? void 0 : u.dateRange);
      c = qe(c, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      c = Tt(c, n);
    return {
      ...e,
      query: c,
      chart: { ...o, mapping: dt(n, St(o), s) }
    };
  }
  if (t === "size") {
    const c = [n];
    return {
      ...e,
      query: { ...a, measures: c },
      chart: { ...o, mapping: dt(Ne(o), c, s) }
    };
  }
  return e;
}
function Cv(e, t, n) {
  const { query: r, chart: a } = e, o = zt(a);
  if (t === "slices") {
    let s = r;
    const c = tt(r);
    return c && c.dimension === n ? s = qe(s, void 0) : s = Ie(s, n), { ...e, query: s, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: dt(Ne(a), [], o) }
  } : e;
}
const ai = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Nv(e, t, n) {
  const r = ai[t];
  if (!r) return e;
  const { query: a, chart: o } = e, s = { ..._e(e) }, c = s[r];
  s[r] = n;
  let l = a;
  if (r === "groupBy")
    c && c !== n && (l = Ie(l, c)), l = Tt(l, n);
  else {
    const u = c ? ut(a.measures, c) : a.measures;
    l = { ...a, measures: tn(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: s } };
}
function Sv(e, t, n) {
  const r = ai[t];
  if (!r) return e;
  const { query: a, chart: o } = e, s = { ..._e(e) };
  delete s[r];
  let c = a;
  if (r === "groupBy") c = Ie(c, n);
  else {
    const l = ut(a.measures, n);
    c = { ...a, measures: l.length ? l : [] };
  }
  return { ...e, query: c, chart: { ...o, familyOptions: s } };
}
function _v(e, t) {
  const { query: n, chart: r } = e, a = { ..._e(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function Rv(e, t) {
  const { query: n, chart: r } = e, a = { ..._e(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function Av(e, t, n) {
  const { query: r, chart: a } = e, o = Ir(e);
  if (o.some((l) => l.member === t)) return e;
  let s = r;
  if (n === "number") s = { ...r, measures: tn(r.measures, t) };
  else if (n === "time") {
    const l = tt(r), u = (l == null ? void 0 : l.granularity) ?? zn(l == null ? void 0 : l.dateRange), d = r.timeDimensions ?? [];
    d.some((f) => f.dimension === t) || (s = { ...r, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else s = Tt(r, t);
  const c = { ..._e(e), columns: [...o, { member: t }] };
  return { ...e, query: s, chart: { ...a, familyOptions: c } };
}
function Mv(e, t) {
  var d, f, p;
  const { query: n, chart: r } = e, a = Ir(e).filter((h) => h.member !== t);
  let o = n;
  const s = ut(n.measures, t);
  s.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: s.length ? s : void 0 });
  const c = ut(n.dimensions, t);
  c.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: c.length ? c : void 0 });
  const l = (n.timeDimensions ?? []).filter((h) => h.dimension !== t);
  l.length !== (((p = n.timeDimensions) == null ? void 0 : p.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ..._e(e), columns: a };
  return { ...e, query: o, chart: { ...r, familyOptions: u } };
}
const he = x.forwardRef(
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
he.displayName = "Input";
function xn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(Xa, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(Ja, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(yr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function oi({
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
  const { meta: u, isLoading: d } = et(), f = x.useMemo(() => {
    if (t) {
      const b = new Set(t);
      return dr(u, n).filter((g) => b.has(g.cube));
    }
    return dr(u, n, e);
  }, [u, n, e, t]), p = x.useMemo(() => Ov(f), [f]), h = f.find((b) => b.name === r);
  return /* @__PURE__ */ v(De, { value: r, onValueChange: a, disabled: s || d, children: [
    /* @__PURE__ */ i(Te, { id: c, className: l, children: /* @__PURE__ */ i(ze, { placeholder: d ? "Loading…" : o, children: h ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      xn(h.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: h.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Ee, { children: p.map(([b, g]) => /* @__PURE__ */ v(ir, { children: [
      p.length > 1 ? /* @__PURE__ */ i(cr, { children: b }) : null,
      g.map((k) => /* @__PURE__ */ i(ye, { value: k.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        xn(k.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: k.label })
      ] }) }, k.name))
    ] }, b)) })
  ] });
}
function Ov(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Ut({
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
const Lv = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(Ja, { className: "cv:size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(yr, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(Xa, { className: "cv:size-3" }), metaKind: "time" }
}, Dv = ["number", "category", "time"];
function ii({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: o = "start",
  side: s = "bottom",
  children: c
}) {
  var $, V;
  const { meta: l, isLoading: u } = et(), [d, f] = x.useState(!1), [p, h] = x.useState(""), [b, g] = x.useState(n.viewLocked ?? "tables"), [k, y] = x.useState({});
  x.useEffect(() => {
    d && g(n.viewLocked ?? "tables");
  }, [d, n.viewLocked]);
  const w = x.useMemo(() => new Set(t), [t]), C = p.trim().toLowerCase(), R = x.useMemo(() => {
    if (b !== "tables") {
      const O = n.views.find((G) => G.name === b) ?? Ht(l, b);
      return O ? [{ cube: O, tag: "dataset" }] : [];
    }
    const E = [];
    n.sourceCube && E.push({ cube: n.sourceCube, tag: "source" });
    for (const O of n.relatedCubes) E.push({ cube: O, tag: "related" });
    return E;
  }, [b, n, l]), _ = e.kinds.length > 1, N = (E) => Dv.filter((O) => e.kinds.includes(O)).map((O) => {
    const G = Lv[O], re = dr(l, G.metaKind, E).filter((I) => !w.has(I.name)).filter((I) => C ? I.label.toLowerCase().includes(C) || I.name.toLowerCase().includes(C) : !0);
    return { kind: O, label: G.label, icon: G.icon, items: re };
  }).filter((O) => O.items.length > 0), F = R.map((E) => ({ section: E, groups: N(E.cube.name) })).filter((E) => E.groups.length > 0), D = F.length > 0, T = (E, O) => {
    a(E, O), f(!1), h("");
  }, L = b === "tables" ? "All related tables" : (($ = n.views.find((E) => E.name === b)) == null ? void 0 : $.title) ?? ((V = Ht(l, b)) == null ? void 0 : V.title) ?? b;
  return /* @__PURE__ */ v(Re, { open: d, onOpenChange: f, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: c }),
    /* @__PURE__ */ v(Me, { align: o, side: s, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(Qi, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: p,
              onChange: (E) => h(E.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(zv, { browse: b, label: L, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: D ? F.map(({ section: E, groups: O }, G) => {
        const re = O.reduce((U, Q) => U + Q.items.length, 0), I = E.tag === "related", Y = k[E.cube.name] ?? I, te = C.length > 0 ? !0 : !Y;
        return /* @__PURE__ */ v("div", { children: [
          E.tag === "related" && G > 0 && F[G - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => y((U) => ({ ...U, [E.cube.name]: !Y })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                te ? /* @__PURE__ */ i(Je, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(Jt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(Za, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: E.cube.title }),
                E.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : E.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: re })
              ]
            }
          ),
          te ? O.map((U) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            _ ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              U.icon,
              U.label
            ] }) : null,
            U.items.map((Q) => /* @__PURE__ */ i(Tv, { option: Q, reason: r(Q), onPick: () => T(Q.name, U.kind) }, Q.name))
          ] }, U.kind)) : null
        ] }, E.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function zv({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, o] = x.useState(!1), s = (c) => {
    r(c), o(!1);
  };
  return /* @__PURE__ */ v(Re, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Ae,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(eo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Me, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(Ma, { active: e === "tables", icon: /* @__PURE__ */ i(Za, { className: "cv:size-3.5" }), onClick: () => s("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(ie, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ i(
          Ma,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ i(xr, { className: "cv:size-3.5" }),
            onClick: () => s(c.name),
            children: c.title
          },
          c.name
        ))
      ] }) : null
    ] })
  ] });
}
function Ma({
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
        e ? /* @__PURE__ */ i(Ve, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function Tv({ option: e, reason: t, onPick: n }) {
  return t ? /* @__PURE__ */ v(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "cv:flex cv:cursor-not-allowed cv:items-center cv:justify-between cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:opacity-45 cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:truncate", children: e.label }),
        /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: "Not available" })
      ]
    }
  ) : /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: n,
      title: e.description ?? e.name,
      className: "cv:flex cv:w-full cv:items-center cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent cv:hover:text-accent-foreground",
      children: /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:truncate", children: e.label })
    }
  );
}
const Ev = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Vt = "yyyy-MM-dd";
function Fv(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Oa(e) {
  if (!e) return;
  const t = oo(e, Vt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function jr({ value: e, onChange: t }) {
  const [n, r] = x.useState(!1), a = typeof e == "string", [o, s] = Fv(e), c = Oa(o), l = Oa(s), u = c ? { from: c, to: l } : void 0, d = a ? e : c && l ? `${pe(c, "MMM d, yyyy")} – ${pe(l, "MMM d, yyyy")}` : c ? pe(c, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Re, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(Qa, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", d === "Any time" && "cv:text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ v(Me, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        Ev.map((f) => /* @__PURE__ */ i(
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
        Po,
        {
          mode: "range",
          selected: u,
          defaultMonth: c,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([pe(f.from, Vt), pe(f.to, Vt)]) : f != null && f.from ? t([pe(f.from, Vt), pe(f.from, Vt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Pv(e) {
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
function $v(e, t) {
  const n = new Set(Pv(t));
  return e.filter((r) => n.has(r.type));
}
function Iv(e) {
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
function jv(e, t, n) {
  const r = new Set(n.map((c) => c.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = a, s = 2;
  for (; r.has(o); ) o = `${a}_${s++}`;
  return o;
}
function Vv(e, t, n) {
  const r = Iv(e), a = { name: jv(t, e, n), type: r }, o = t.trim();
  return o && (a.label = o), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const ci = x.createContext({});
function qv({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(ci.Provider, { value: n, children: t });
}
function Kv() {
  return x.useContext(ci);
}
function Hv({ kind: e, value: t, onChange: n, className: r }) {
  const a = Tr(), o = (a == null ? void 0 : a.decls) ?? [], { createVariable: s } = Kv(), [c, l] = x.useState(!1), [u, d] = x.useState(!1), [f, p] = x.useState(""), h = x.useMemo(() => $v(o, e), [o, e]), b = h.find((y) => y.name === t), g = (y) => {
    n(y), l(!1), d(!1);
  }, k = () => {
    if (!s) return;
    const y = Vv(e, f || "Variable", o);
    s(y), g(y.name), p("");
  };
  return /* @__PURE__ */ v(
    Re,
    {
      open: c,
      onOpenChange: (y) => {
        l(y), y || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", r), children: [
          /* @__PURE__ */ i(Ji, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !b && "cv:text-muted-foreground"), children: b ? b.label ?? b.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Me, { align: "start", className: "cv:w-60 cv:p-1", children: [
          h.length > 0 ? h.map((y) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => g(y.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: y.label ?? y.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: y.type }),
                y.name === t ? /* @__PURE__ */ i(Ve, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            y.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          s ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              he,
              {
                autoFocus: !0,
                value: f,
                onChange: (y) => p(y.target.value),
                onKeyDown: (y) => {
                  y.key === "Enter" && k(), y.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "cv:h-7 cv:text-sm"
              }
            ),
            /* @__PURE__ */ i(B, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: k, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground",
              children: [
                /* @__PURE__ */ i(kt, { className: "cv:size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function _t({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = Le(t), [o, s] = x.useState(a ? "var" : "fixed");
  x.useEffect(() => {
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
            s("fixed"), Le(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: c(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      Hv,
      {
        kind: e,
        value: Le(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : r(Le(t) ? void 0 : t, (l) => n(l))
  ] });
}
const Bv = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Gn(e) {
  return "member" in e && "operator" in e;
}
function Wv({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: o,
  className: s
}) {
  var L;
  const { meta: c } = et(), l = ((L = Tr()) == null ? void 0 : L.decls) ?? [], [u, d] = x.useState(null), [f, p] = x.useState(null), h = r ?? [], b = h.length === 1 && !Gn(h[0]) && "or" in h[0] && Array.isArray(h[0].or) && h[0].or.every(Gn) ? h[0] : void 0, g = b ? "any" : "all", k = [], y = [];
  b || h.forEach(($) => Gn($) ? k.push($) : y.push($));
  const w = b ? b.or : k, C = y.length === 0 && (w.length >= 2 || g === "any"), R = ($) => g === "any" ? $.length ? [{ or: $ }] : [] : [...$, ...y], _ = ($) => {
    const V = $.filter((O) => O.member.length > 0), E = R(V);
    a(E.length > 0 ? E : void 0);
  }, N = ($) => {
    const V = $ === "any" ? w.length ? [{ or: w }] : [] : [...w];
    a(V.length > 0 ? V : void 0);
  }, F = ($, V) => _(w.map((E, O) => O === $ ? { ...E, ...V } : E)), D = ($) => _(w.filter((V, E) => E !== $)), T = ($) => {
    const E = { ...f ?? { member: "", operator: "equals", values: [] }, ...$ };
    E.member ? (p(null), d(w.length), _([...w, E])) : p(E);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", s), children: [
    w.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    C ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        Ut,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: g,
          onChange: N
        }
      ),
      /* @__PURE__ */ i("span", { children: "of these" })
    ] }) : null,
    w.map(($, V) => {
      const E = Fe(c, $.member);
      return u === V ? /* @__PURE__ */ i(
        La,
        {
          leaf: $,
          member: E,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (O) => F(V, O),
          onDone: () => d(null),
          onRemove: () => D(V)
        },
        V
      ) : /* @__PURE__ */ i(
        Uv,
        {
          text: Gv($, E == null ? void 0 : E.label, l),
          disabled: o,
          onEdit: () => d(V),
          onRemove: () => D(V)
        },
        V
      );
    }),
    f ? /* @__PURE__ */ i(
      La,
      {
        leaf: f,
        member: Fe(c, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: T,
        onRemove: () => p(null)
      }
    ) : null,
    y.length > 0 ? /* @__PURE__ */ v("p", { className: "cv:text-xs cv:text-muted-foreground", children: [
      y.length,
      " grouped filter",
      y.length === 1 ? "" : "s",
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
          d(null), p({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(kt, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Uv({
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
        children: /* @__PURE__ */ i(Rt, { className: "cv:size-4" })
      }
    )
  ] });
}
function La({
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
  const u = lv(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], f = !mr.has(d);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        c && e.member ? /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: c, children: [
          /* @__PURE__ */ i(Ve, { className: "cv:size-3.5" }),
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
            children: /* @__PURE__ */ i(Rt, { className: "cv:size-3.5" })
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
          ii,
          {
            well: Bv,
            placed: [],
            scope: a,
            blockReason: () => {
            },
            onSelect: (p) => s({ member: p }),
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
                    xn(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(Je, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        oi,
        {
          cube: n,
          cubes: r,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: (p) => s({ member: p }),
          placeholder: "Choose a field…",
          disabled: o
        }
      )
    ] }),
    /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ v(
        De,
        {
          value: d,
          onValueChange: (p) => s({
            operator: p,
            values: mr.has(p) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Te, { className: "cv:w-full", children: /* @__PURE__ */ i(ze, {}) }),
            /* @__PURE__ */ i(Ee, { children: u.map((p) => /* @__PURE__ */ i(ye, { value: p, children: ei[p] }, p)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        Yv,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (p) => s({ values: p })
        }
      )
    ] }) : null
  ] });
}
function Gv(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = ei[e.operator] ?? e.operator;
  if (mr.has(e.operator)) return `${r} ${a}`;
  const o = (e.values ?? []).map((s) => {
    if (Le(s)) {
      const c = n.find((l) => l.name === s.var);
      return `{${((c == null ? void 0 : c.label) ?? s.var).replace(/[{}]/g, "")}}`;
    }
    return String(s);
  });
  return o.length > 0 ? `${r} ${a} ${o.join(", ")}` : `${r} ${a} …`;
}
function Yv({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && Le(r[0]);
  if (t === "time") {
    const c = a ? r[0] : Qv(r);
    return /* @__PURE__ */ i(
      _t,
      {
        kind: "dateRange",
        value: c,
        onChange: (l) => n(l === void 0 ? [] : Le(l) ? [l] : Jv(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(jr, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", s = a ? r[0] : r.filter((c) => !Le(c));
  return /* @__PURE__ */ i(
    _t,
    {
      kind: o,
      value: s,
      onChange: (c) => n(c === void 0 ? [] : Le(c) ? [c] : c),
      renderFixed: (c, l) => /* @__PURE__ */ i(
        he,
        {
          value: (c ?? []).map(String).join(", "),
          onChange: (u) => l(Xv(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function Qv(e) {
  const t = e.filter((n) => !Le(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Jv(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Xv(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Zv({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: o } = e, s = (o.filters ?? []).length, c = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ v(
      Ae,
      {
        className: S(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          s > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(Xi, { className: "cv:size-4" }),
          "Filter",
          s > 0 ? /* @__PURE__ */ i("span", { className: "cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground", children: s }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(Me, { align: "end", className: "cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(ef, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ i(Wv, { cube: n, cubes: r, scope: a, value: o.filters, onChange: c })
    ] })
  ] });
}
function ef({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = et(), a = sv(r, n);
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
function tf({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: r } = et(), a = x.useMemo(() => Ln(r), [r]), o = a.filter((k) => k.type === "view"), s = a.filter((k) => k.type === "cube"), c = a.find((k) => k.name === e), [l, u] = x.useState(!1), [d, f] = x.useState(null), p = (k) => {
    if (k === e) {
      u(!1);
      return;
    }
    t ? f(k) : (n(k), u(!1));
  }, h = () => {
    d && n(d), f(null), u(!1);
  }, b = d ? ((g = a.find((k) => k.name === d)) == null ? void 0 : g.title) ?? d : "";
  return /* @__PURE__ */ v(
    Re,
    {
      open: l,
      onOpenChange: (k) => {
        u(k), k || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          Ae,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(eo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !c && "cv:text-muted-foreground"), children: c ? c.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Me, { align: "start", className: "cv:w-64 cv:p-1", children: d ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: b }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(B, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(B, { size: "sm", className: "cv:h-7", onClick: h, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(ie, { children: [
            /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
            o.map((k) => /* @__PURE__ */ i(
              Da,
              {
                icon: /* @__PURE__ */ i(xr, { className: "cv:size-3.5" }),
                label: k.title,
                active: k.name === e,
                onClick: () => p(k.name)
              },
              k.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Tables" }),
          s.map((k) => /* @__PURE__ */ i(
            Da,
            {
              icon: /* @__PURE__ */ i(to, { className: "cv:size-3.5" }),
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
function Da({
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
        n ? /* @__PURE__ */ i(Ve, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function za(e, t, n, r) {
  var o;
  const a = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function Ta({
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
            onChange: (l) => za(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          rf,
          {
            hidden: s,
            what: "axis title",
            onClick: () => za(e, t, n, { labelHide: s ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function nf({
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
          n ? /* @__PURE__ */ i(no, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(ro, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function rf({
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
      children: e ? /* @__PURE__ */ i(no, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(ro, { className: "cv:size-3.5" })
    }
  );
}
const si = x.forwardRef(
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
si.displayName = "Label";
function me({
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
      /* @__PURE__ */ i(si, { htmlFor: r, className: "cv:text-muted-foreground", children: e }),
      a ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: a }) : null
    ] }),
    s,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function fr({
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
  const s = x.useId();
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
        /* @__PURE__ */ i(fr, { id: s, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function af({ spec: e, update: t }) {
  var h, b;
  const { chart: n } = e, r = n.family, a = n.familyOptions ?? {}, o = ge(r);
  if (o.Customize) {
    const g = o.Customize;
    return /* @__PURE__ */ i(g, { spec: e, update: t });
  }
  const s = (g) => t({ ...e, chart: { ...n, ...g } }), c = (g) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...g } } }), l = ((b = (h = n.mapping) == null ? void 0 : h.series) == null ? void 0 : b.mode) === "pivot" ? "stacked" : "none", u = n.stackMode ?? (r === "area" ? l : Do(r).envelope.stackMode) ?? "none", f = /* @__PURE__ */ i(me, { label: "Stacked", children: /* @__PURE__ */ i(
    Ut,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: u === "stacked" ? "stacked" : u === "percent" ? "percent" : "none",
      onChange: (g) => s({ stackMode: g })
    }
  ) }), p = (() => {
    var g, k;
    switch (r) {
      case "bar":
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            be,
            {
              label: "Horizontal",
              checked: n.orientation === "horizontal",
              onChange: (y) => s({ orientation: y ? "horizontal" : "vertical" })
            }
          ),
          f
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(ie, { children: [
          f,
          n.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((k = (g = n.mapping) == null ? void 0 : g.series) == null ? void 0 : k.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            be,
            {
              label: "Donut",
              checked: typeof a.innerRadiusPct == "number" && a.innerRadiusPct > 0,
              onChange: (y) => c({ innerRadiusPct: y ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(me, { label: "Slice labels", children: /* @__PURE__ */ i(
            Ut,
            {
              "aria-label": "Slice labels",
              size: "sm",
              options: [
                { value: "none", label: "None" },
                { value: "percent", label: "%" },
                { value: "value", label: "Value" },
                { value: "name", label: "Name" }
              ],
              value: a.showLabels ?? "percent",
              onChange: (y) => c({ showLabels: y })
            }
          ) }),
          /* @__PURE__ */ i(cf, { label: "Max slices", children: /* @__PURE__ */ i(
            he,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: a.maxSlices ?? "",
              placeholder: "8",
              onChange: (y) => {
                const w = parseInt(y.target.value, 10);
                c({ maxSlices: Number.isFinite(w) && w > 0 ? w : void 0 });
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
            be,
            {
              label: "Compact rows",
              checked: a.rowHeight === "compact",
              onChange: (y) => c({ rowHeight: y ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              label: "Sortable columns",
              checked: a.sortable !== !1,
              onChange: (y) => c({ sortable: y })
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              label: "Sticky header",
              checked: a.stickyHeader !== !1,
              onChange: (y) => c({ stickyHeader: y })
            }
          ),
          /* @__PURE__ */ i(
            be,
            {
              label: "Row numbers",
              checked: a.showRowNumbers === !0,
              onChange: (y) => c({ showRowNumbers: y })
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
  return /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col", children: p });
}
function of(e) {
  const t = ge(e);
  return t.hasCustomizeOptions || t.Customize !== void 0;
}
function cf({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function li(e, t) {
  return (n) => {
    n !== e.chart.family && t(dv(e, n));
  };
}
function sf({ spec: e, update: t, empty: n }) {
  const r = e.chart.family, a = li(e, t);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(ui, { family: r, onPick: a })
  ] }) }) : null;
}
function lf({ spec: e, update: t }) {
  const n = e.chart.family, r = li(e, t), a = ge(n).icon;
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(a, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          ge(n).label,
          /* @__PURE__ */ i(Je, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Me, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(ui, { family: n, onPick: r })
      ] }),
      of(n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(af, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function ui({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-4 cv:gap-1.5", children: hl().map((n) => {
    const r = ge(n).icon, a = n === e;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => t(n),
        "aria-pressed": a,
        className: S(
          "cv:flex cv:flex-col cv:items-center cv:gap-1 cv:rounded-md cv:border cv:px-1 cv:py-2 cv:text-[10px] cv:transition-colors",
          a ? "cv:border-ring cv:bg-accent cv:text-foreground" : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ i(r, { className: "cv:size-4" }),
          ge(n).label
        ]
      },
      n
    );
  }) });
}
function uf(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function df(e, t, n, r, a) {
  var qr, Kr, Hr, Br, Wr, Ur, Gr, Yr, Qr, Jr, Xr, Zr, ea, ta;
  const { chart: o, query: s } = e, c = o.family, l = n.kinds.length === 1 ? n.kinds[0] : mf(a), u = o.familyOptions ?? {}, d = Array.isArray(u.series) ? u.series : [], f = Array.isArray(u.columns) ? u.columns : [], p = zt(o), h = p[r], b = c === "combo" && n.id === "y", g = c === "table" && n.id === "columns", k = c === "bar" || c === "line" || c === "area", y = ((Kr = (qr = o.mapping) == null ? void 0 : qr.series) == null ? void 0 : Kr.mode) === "measures", w = k && n.id === "y", C = w && y, R = b ? (Hr = d.find((j) => j.member === r)) == null ? void 0 : Hr.label : g ? (Br = f.find((j) => j.member === r)) == null ? void 0 : Br.label : C ? h == null ? void 0 : h.label : void 0, _ = b ? (Wr = d.find((j) => j.member === r)) == null ? void 0 : Wr.colorToken : C ? h == null ? void 0 : h.colorToken : void 0, N = tt(s), F = n.kinds.includes("time") && (N == null ? void 0 : N.dimension) === r, D = F ? N == null ? void 0 : N.granularity : void 0, T = F ? N == null ? void 0 : N.dateRange : void 0, L = b ? ((Ur = d.find((j) => j.member === r)) == null ? void 0 : Ur.render) ?? "line" : void 0, $ = c === "line" && n.id === "y", V = c === "bar" && n.id === "y" && o.orientation !== "horizontal", E = ((Yr = (Gr = o.mapping) == null ? void 0 : Gr.series) == null ? void 0 : Yr.mode) === "pivot", O = ((Jr = (Qr = o.mapping) == null ? void 0 : Qr.series) == null ? void 0 : Jr.mode) === "pivot" ? o.mapping.series.meta : void 0, G = ($ || V) && (y || E) || b, re = G ? (b ? (Xr = d.find((j) => j.member === r)) == null ? void 0 : Xr.axis : y ? h == null ? void 0 : h.axis : (Zr = O == null ? void 0 : O[r]) == null ? void 0 : Zr.axis) ?? "left" : void 0, te = (c === "line" || c === "area") && n.id === "y" && y || b && (L === "line" || L === "area"), U = b ? d.find((j) => j.member === r) : void 0, Q = te ? b ? U == null ? void 0 : U.curve : h == null ? void 0 : h.curve : void 0, de = te ? b ? U == null ? void 0 : U.dots : h == null ? void 0 : h.dots : void 0, J = (j) => {
    var na, ra;
    if ((na = o.mapping) != null && na.series && o.mapping.series.mode !== "measures") return;
    const se = ((ra = o.mapping) != null && ra.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], le = { ...p };
    j && Object.keys(j).length > 0 ? le[r] = j : delete le[r];
    const Ft = Ne(o);
    Ft && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Ft }, series: ni(se, le) }
      }
    });
  }, q = (j) => {
    const se = d.map((le) => le.member === r ? { ...le, ...j } : le);
    t({ ...e, chart: { ...o, familyOptions: { ...u, series: se } } });
  }, M = (j) => {
    const se = f.map((le) => le.member === r ? { ...le, ...j } : le);
    t({ ...e, chart: { ...o, familyOptions: { ...u, columns: se } } });
  }, Z = (j) => {
    b ? q({ label: j }) : g ? M({ label: j }) : C && J({ ...h, label: j });
  }, ve = (j) => {
    b ? q({ colorToken: j ?? void 0 }) : C && J({ ...h, colorToken: j ?? void 0 });
  }, W = (j) => {
    if (!N) return;
    const se = { ...N };
    for (const le of Object.keys(j)) {
      const Ft = j[le];
      Ft === void 0 ? delete se[le] : se[le] = Ft;
    }
    t({ ...e, query: { ...s, timeDimensions: [se] } });
  }, K = (j) => W({ granularity: j }), fe = (j) => W({ dateRange: j }), nt = (j) => q({ render: j }), rt = (j) => {
    var se, le;
    b ? q({ axis: j }) : C ? J({ ...h, axis: j }) : ((le = (se = o.mapping) == null ? void 0 : se.series) == null ? void 0 : le.mode) === "pivot" && t(di(e, c, r, j));
  }, at = (j) => {
    b ? q({ curve: j }) : C && J({ ...h, curve: j });
  }, ot = (j) => {
    b ? q({ dots: j }) : C && J({ ...h, dots: j });
  }, nn = () => t(hv(e, c, n.id, r)), Et = (n.id === "x" || n.id === "slices") && (l === "category" || l === "time"), A = (ea = o.mapping) == null ? void 0 : ea.series, z = (A && A.mode === "pivot" ? A.value : St(o)[0]) ?? ((ta = s.measures) == null ? void 0 : ta[0]), P = Et ? l === "time" ? [
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
  ] : [], H = (() => {
    const j = uf(s.order)[0];
    if (!j) return "none";
    const [se, le] = j;
    return z && se === z ? le === "desc" ? "value-desc" : "value-asc" : se === r ? l === "time" ? le === "desc" ? "time-desc" : "time-asc" : le === "asc" ? "label-asc" : "label-desc" : "none";
  })(), X = (j) => {
    let se;
    switch (j) {
      case "none":
        se = void 0;
        break;
      case "value-desc":
        se = z ? [[z, "desc"]] : void 0;
        break;
      case "value-asc":
        se = z ? [[z, "asc"]] : void 0;
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
  }, ce = typeof s.limit == "number" ? s.limit : void 0, ae = (j) => t({ ...e, query: { ...s, limit: j && j > 0 ? j : void 0 } }), it = (c === "bar" || c === "line" || c === "area") && F, gi = it && u.comparePrevious === !0;
  return {
    kind: l,
    label: R,
    colorToken: _,
    granularity: D,
    dateRange: T,
    render: L,
    axis: re,
    curve: Q,
    dots: de,
    canLineStyle: te,
    canAxis: G,
    canRename: b || g || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: w && y || b,
    isTimeField: F,
    isComboY: b,
    isCategoryField: Et,
    sortValue: H,
    sortOptions: P,
    onSort: X,
    limit: ce,
    onLimit: ae,
    canComparePrevious: it,
    comparePrevious: gi,
    comparePreviousReady: it && T !== void 0,
    onComparePrevious: (j) => t({ ...e, chart: { ...o, familyOptions: { ...u, comparePrevious: j || void 0 } } }),
    onRename: Z,
    onRecolor: ve,
    onGranularity: K,
    onDateRange: fe,
    onRender: nt,
    onAxis: rt,
    onCurve: at,
    onDots: ot,
    onRemove: nn
  };
}
function di(e, t, n, r) {
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
function mf(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ea(e, t, n, r) {
  var f;
  const { chart: a, query: o } = e, s = a.family, c = (p) => {
    if (r < 0 || r >= p.length || n === r) return p;
    const h = p.slice(), [b] = h.splice(n, 1);
    return h.splice(r, 0, b), h;
  };
  if (s === "combo" && t.id === "y") {
    const p = a.familyOptions ?? {}, h = c(Array.isArray(p.series) ? p.series : []), b = c(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: b },
      chart: { ...a, familyOptions: { ...p, series: h } }
    };
  }
  if (s === "table" && t.id === "columns") {
    const p = a.familyOptions ?? {}, h = c(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...p, columns: h } } };
  }
  const l = c(o.measures ?? []), u = (f = a.mapping) == null ? void 0 : f.series;
  let d = a.mapping;
  if (u && u.mode === "measures")
    d = { ...a.mapping, series: { ...u, members: l } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const p = c(u.values);
    d = { ...a.mapping, series: { ...u, value: p[0], values: p } };
  }
  return { ...e, query: { ...o, measures: l }, chart: { ...a, mapping: d } };
}
function vf(e, t, n) {
  const r = Ln(e), a = r.filter((C) => C.type === "view"), o = en(t), s = Object.values(o).flat();
  let c;
  for (const C of s) {
    const R = Fe(e, C);
    if (R) {
      c = R;
      break;
    }
  }
  const l = !c && n ? Ht(e, n) : void 0, u = c ? Ht(e, c.cube) : l, d = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, f = (c == null ? void 0 : c.connectedComponent) ?? (l == null ? void 0 : l.connectedComponent), p = t.query.measures ?? [], h = p.length ? jt(p[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: a, measureSource: h, scopeComponent: f };
  const b = h ?? (c == null ? void 0 : c.cube) ?? (l == null ? void 0 : l.name), g = b ? Ht(e, b) : void 0, k = r.filter((C) => C.type === "cube" && C.connectedComponent !== void 0), w = (f === void 0 ? k : k.filter((C) => C.connectedComponent === f)).filter((C) => C.name !== b).sort((C, R) => C.title.localeCompare(R.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: w,
    views: a,
    measureSource: h,
    scopeComponent: f
  };
}
const ff = Qe.options;
function hf({
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
        ff.map((o) => {
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
const pf = lt.options, gf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function mi({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: o,
  className: s
}) {
  const c = n && n.length > 0 ? n : pf;
  return /* @__PURE__ */ v(
    De,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: a,
      children: [
        /* @__PURE__ */ i(Te, { id: o, className: s, children: /* @__PURE__ */ i(ze, { placeholder: r }) }),
        /* @__PURE__ */ i(Ee, { children: c.map((l) => /* @__PURE__ */ i(ye, { value: l, children: gf[l] }, l)) })
      ]
    }
  );
}
const Fa = { bar: "Bar", line: "Line", area: "Area" }, bf = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function yf({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: o,
  reorder: s,
  className: c
}) {
  const l = df(e, t, n, r, a), u = (a == null ? void 0 : a.label) ?? r, d = l.label || u, f = l.canColor && o !== void 0, p = l.canRename || f || l.isTimeField || l.isCategoryField || l.isComboY && !!l.render || l.canAxis || l.canLineStyle || !!s, h = (g) => {
    const k = g.trim();
    l.onRename(k.length > 0 ? k : void 0);
  }, b = /* @__PURE__ */ v(ie, { children: [
    f ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : a ? xn(a.type) : null,
    /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: d })
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
        p ? /* @__PURE__ */ v(Re, { children: [
          /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${d}`,
              children: b
            }
          ) }),
          /* @__PURE__ */ i(Me, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            l.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                he,
                {
                  defaultValue: l.label ?? "",
                  placeholder: u,
                  className: "cv:h-8",
                  onBlur: (g) => h(g.target.value),
                  onKeyDown: (g) => {
                    g.key === "Enter" && (h(g.target.value), g.target.blur());
                  }
                }
              )
            ] }) : null,
            f ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Color" }),
              /* @__PURE__ */ i(hf, { value: l.colorToken, onChange: l.onRecolor })
            ] }) : null,
            l.isTimeField ? /* @__PURE__ */ v(ie, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  _t,
                  {
                    kind: "dateRange",
                    value: l.dateRange,
                    onChange: l.onDateRange,
                    renderFixed: (g, k) => /* @__PURE__ */ i(jr, { value: g, onChange: k })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  _t,
                  {
                    kind: "granularity",
                    value: l.granularity,
                    onChange: l.onGranularity,
                    renderFixed: (g, k) => /* @__PURE__ */ i(mi, { value: g, onChange: k, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              l.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    fr,
                    {
                      checked: l.comparePrevious,
                      onChange: l.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                l.comparePrevious && !l.comparePreviousReady ? /* @__PURE__ */ i("p", { className: "cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            l.isCategoryField ? /* @__PURE__ */ v(ie, { children: [
              /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Sort" }),
                /* @__PURE__ */ i(
                  "select",
                  {
                    value: l.sortValue,
                    onChange: (g) => l.onSort(g.target.value),
                    className: "cv:h-8 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-sm cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
                    children: l.sortOptions.map((g) => /* @__PURE__ */ i("option", { value: g.key, children: g.label }, g.key))
                  }
                )
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ i(
                  he,
                  {
                    type: "number",
                    min: 1,
                    defaultValue: l.limit ?? "",
                    placeholder: "All",
                    className: "cv:h-8",
                    onBlur: (g) => {
                      const k = g.target.value.trim();
                      l.onLimit(k === "" ? void 0 : Number(k));
                    },
                    onKeyDown: (g) => {
                      if (g.key === "Enter") {
                        const k = g.target.value.trim();
                        l.onLimit(k === "" ? void 0 : Number(k)), g.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            l.isComboY && l.render ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Draw as" }),
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: Object.keys(Fa).map((g) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => l.onRender(g),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                    l.render === g ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    Fa[g],
                    l.render === g ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            l.canAxis ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Side" }),
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: ["left", "right"].map((g) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => l.onAxis(g),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize",
                    l.axis === g ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    g,
                    l.axis === g ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            l.canLineStyle ? /* @__PURE__ */ v(ie, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: bf.map(([g, k]) => /* @__PURE__ */ v(
                  "button",
                  {
                    type: "button",
                    onClick: () => l.onCurve(g),
                    className: S(
                      "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                      (l.curve ?? "cv:monotone") === g ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                    ),
                    children: [
                      k,
                      (l.curve ?? "monotone") === g ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
                    ]
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(fr, { checked: l.dots === !0, onChange: l.onDots, "aria-label": "Show points" })
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
                    /* @__PURE__ */ i(wn, { className: "cv:size-3.5" }),
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
                    /* @__PURE__ */ i(kn, { className: "cv:size-3.5" }),
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
                onClick: l.onRemove,
                children: [
                  /* @__PURE__ */ i(aa, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: d, children: b }),
        /* @__PURE__ */ i(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: l.onRemove,
            "aria-label": `Remove ${d}`,
            children: /* @__PURE__ */ i(aa, { className: "cv:size-3.5" })
          }
        )
      ]
    }
  );
}
function Pa({
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
  badge: d,
  orientation: f,
  lockedSingle: p,
  disableReorder: h,
  label: b,
  note: g,
  pickerSide: k,
  pickerAlign: y,
  control: w
}) {
  const C = n.cardinality === "many" && !p, R = C || r.length === 0, _ = r.length, N = f === "vertical", F = b ?? n.label, D = /* @__PURE__ */ i(
    ii,
    {
      well: n,
      placed: a,
      scope: c,
      blockReason: l,
      onSelect: u,
      side: k ?? (N ? "right" : "top"),
      align: y ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          className: S(
            "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:border-dashed cv:border-input cv:bg-background/60 cv:px-2 cv:py-1 cv:text-xs cv:text-muted-foreground cv:transition-colors cv:hover:border-ring cv:hover:text-foreground",
            N && "cv:w-full"
          ),
          children: [
            /* @__PURE__ */ i(kt, { className: "cv:size-3.5" }),
            r.length === 0 ? F : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: S("cv:flex cv:flex-col cv:gap-1", !N && "cv:min-w-0"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: F }),
          d ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: d }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        w ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: w }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", N ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          r.map((T, L) => /* @__PURE__ */ i(
            yf,
            {
              spec: e,
              update: t,
              well: n,
              member: T,
              option: o(T),
              resolvedColor: s(T),
              className: N ? "cv:w-full" : void 0,
              reorder: C && _ > 1 && !h ? {
                canUp: L > 0,
                canDown: L < _ - 1,
                onUp: () => t(Ea(e, n, L, L - 1)),
                onDown: () => t(Ea(e, n, L, L + 1))
              } : void 0
            },
            T
          )),
          R ? D : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function Yn({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2.5 cv:py-1.5 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: e }),
          /* @__PURE__ */ v("span", { className: "cv:flex cv:shrink-0 cv:items-center cv:gap-1 cv:text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "cv:text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(Je, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Me, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Vr(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...o } } }) };
}
function xf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Vr(e, t), a = ti(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], s = n.display ?? "number", c = n.gauge, l = (d) => {
    const f = o ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!f) return;
    const p = { ...f };
    for (const h of Object.keys(d)) {
      const b = d[h];
      b === void 0 ? delete p[h] : p[h] = b;
    }
    delete p.granularity, t({ ...e, query: { ...e.query, timeDimensions: [p] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(Bt, { label: "Time field", children: /* @__PURE__ */ i(
      oi,
      {
        cube: a,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (d) => l({ dimension: d }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Bt, { label: "Date range", children: /* @__PURE__ */ i(
      _t,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (d) => l({ dateRange: d }),
        renderFixed: (d, f) => /* @__PURE__ */ i(jr, { value: d, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(me, { label: "Display", children: /* @__PURE__ */ i(
      Ut,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: s,
        onChange: (d) => r({ display: d })
      }
    ) }),
    s === "gauge" ? /* @__PURE__ */ i(Bt, { label: "Gauge max", children: /* @__PURE__ */ i(
      he,
      {
        type: "number",
        className: "cv:h-8",
        value: (c == null ? void 0 : c.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const f = parseFloat(d.target.value);
          r({ gauge: Number.isFinite(f) ? { ...c ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function wf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Vr(e, t), a = n.comparison, o = a !== void 0, s = x.useRef(void 0);
  a && (s.current = a);
  const c = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      be,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => r({
          comparison: d ? s.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ i(me, { label: "Against", children: /* @__PURE__ */ i(
        Ut,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ i(Bt, { label: "Baseline value", children: /* @__PURE__ */ i(
        he,
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
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(c != null && c.dateRange) ? /* @__PURE__ */ i("p", { className: "cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
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
function kf({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Vr(e, t), a = n.sparkline, o = a !== void 0, s = n.comparison !== void 0, c = n.goodDirection ?? "up", l = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      be,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => r({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ i(Bt, { label: "Trend granularity", children: /* @__PURE__ */ i(
        _t,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(mi, { value: u, onChange: d, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      s ? null : /* @__PURE__ */ i(
        be,
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
function Bt({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Cf({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var at, ot, nn, Et;
  const { meta: a } = et(), { locale: o } = Ze(), { chart: s } = e, c = s.family, l = ge(c), u = ti(e), d = x.useMemo(() => Rn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), f = x.useCallback(
    (A) => A && (o == null ? void 0 : o.unitSystem) === "imperial" && d[A] ? d[A].imperialUnit : A,
    [o == null ? void 0 : o.unitSystem, d]
  ), p = x.useMemo(() => mv(c), [c]), h = x.useMemo(() => en(e), [e]), b = x.useMemo(() => new Map(p.map((A) => [A.id, A])), [p]), [g, k] = x.useState(void 0), y = x.useMemo(() => vf(a, e, g), [a, e, g]), w = x.useMemo(() => Object.values(h).flat(), [h]), C = x.useCallback(
    (A) => {
      k(A), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), R = x.useMemo(
    () => {
      var A;
      return y.viewLocked ? [y.viewLocked] : [(A = y.sourceCube) == null ? void 0 : A.name, ...y.relatedCubes.map((z) => z.name)].filter(
        Boolean
      );
    },
    [y]
  ), _ = x.useMemo(
    () => Object.values(h).every((A) => A.length === 0),
    [h]
  ), N = l.dualAxisY, F = x.useCallback(
    (A, z, P) => l.assignSeriesAxis ? l.assignSeriesAxis(A, z, P) : l.placeField ? A : di(A, c, z, P),
    [l, c]
  ), D = x.useCallback(
    (A) => {
      var H, X, ce;
      if (c === "combo") {
        const ae = s.familyOptions ?? {}, ue = (Array.isArray(ae.series) ? ae.series : []).find(
          (it) => it.member === A
        );
        return (ue == null ? void 0 : ue.axis) === "right" ? "right" : "left";
      }
      const z = (H = s.mapping) == null ? void 0 : H.series;
      return (z && (z.mode === "measures" || z.mode === "pivot") ? (ce = (X = z.meta) == null ? void 0 : X[A]) == null ? void 0 : ce.axis : void 0) === "right" ? "right" : "left";
    },
    [c, s.familyOptions, s.mapping]
  ), T = x.useMemo(() => {
    var ce, ae;
    const A = h.y ?? [], z = (ue) => A.find((it) => D(it) === ue), P = z("left"), H = N ? z("right") : void 0, X = (ue) => ue ? Fe(a, ue) : void 0;
    return {
      leftKey: P ? Pt(X(P)) : void 0,
      rightKey: H ? Pt(X(H)) : void 0,
      leftLabel: P ? $a(X(P), f((ce = X(P)) == null ? void 0 : ce.unit)) : void 0,
      rightLabel: H ? $a(X(H), f((ae = X(H)) == null ? void 0 : ae.unit)) : void 0
    };
  }, [h, N, D, a, f]), L = x.useCallback(
    (A) => {
      const z = Pt(A), { leftKey: P, rightKey: H } = T;
      return P === void 0 || z === P ? "left" : H === void 0 || z === H ? "right" : "left";
    },
    [T]
  ), $ = x.useCallback(
    (A, z) => {
      var P;
      if (z) {
        if (y.scopeComponent !== void 0 && z.connectedComponent !== y.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (z.memberType === "measure" && y.measureSource && z.cube !== y.measureSource)
          return `Measures come from one table (${((P = y.sourceCube) == null ? void 0 : P.title) ?? y.measureSource}). Remove them to switch.`;
        if (A === "y" && z.memberType === "measure") {
          const { leftKey: H, rightKey: X, leftLabel: ce, rightLabel: ae } = T, ue = Pt(z);
          if (N) {
            if (H !== void 0 && X !== void 0 && ue !== H && ue !== X)
              return `Both axes show ${ce} & ${ae} — remove one to add a third unit.`;
          } else if (H !== void 0 && ue !== H)
            return `This axis shows ${ce}; ${z.label ?? "this field"} is ${vr(z)}`;
        }
      }
    },
    [y, T, N]
  ), V = N ? [T.leftLabel, T.rightLabel].filter(Boolean).join(" · ") || void 0 : T.leftLabel, E = x.useMemo(() => {
    var z;
    const A = {};
    if (c === "bar" || c === "line" || c === "area") {
      const P = (z = s.mapping) == null ? void 0 : z.series;
      if (P && P.mode === "measures") {
        const H = P.members.map((ce) => {
          var ae, ue;
          return { key: ce, colorToken: (ue = (ae = P.meta) == null ? void 0 : ae[ce]) == null ? void 0 : ue.colorToken };
        }), X = rr(H, s.colors);
        P.members.forEach((ce, ae) => {
          A[ce] = X[ae];
        });
      }
    } else if (c === "combo") {
      const P = s.familyOptions ?? {}, H = Array.isArray(P.series) ? P.series : [], X = H.map((ae) => ({ key: ae.member, colorToken: ae.colorToken })), ce = rr(X, s.colors);
      H.forEach((ae, ue) => {
        A[ae.member] = ce[ue];
      });
    }
    return A;
  }, [c, s.mapping, s.colors, s.familyOptions]), O = x.useCallback(
    (A, z, P) => {
      const H = Fe(a, z);
      if ($(A, H)) return;
      let X = Ra(e, c, A, z, P);
      N && A === "y" && (X = F(X, z, L(H))), t(X);
    },
    [$, a, t, e, c, N, L, F]
  ), G = x.useCallback(
    (A, z) => {
      var X;
      if (!z) return;
      if (y.scopeComponent !== void 0 && z.connectedComponent !== y.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (z.memberType === "measure" && y.measureSource && z.cube !== y.measureSource)
        return `Measures come from one table (${((X = y.sourceCube) == null ? void 0 : X.title) ?? y.measureSource}). Remove them to switch.`;
      const P = A === "left" ? T.leftKey : T.rightKey, H = A === "left" ? T.leftLabel : T.rightLabel;
      if (P !== void 0 && Pt(z) !== P)
        return `This axis shows ${H}; ${z.label ?? "this field"} is ${vr(z)}`;
    },
    [y, T]
  ), re = x.useCallback(
    (A, z, P) => {
      const H = Fe(a, z);
      G(A, H) || t(F(Ra(e, c, "y", z, P), z, A));
    },
    [G, a, t, e, c, F]
  ), I = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : l.zones, Y = I.left.map((A) => b.get(A)).filter(Boolean), te = I.bottom.map((A) => b.get(A)).filter(Boolean), U = (at = h.color) == null ? void 0 : at[0], Q = ((ot = h.y) == null ? void 0 : ot.length) ?? 0, de = U && Q > 1 ? `${Q} measures × ${((nn = Fe(a, U)) == null ? void 0 : nn.label) ?? "this split"} — one series per measure per value.` : void 0, J = l.hasLegend, q = h.y ?? [], M = q.find((A) => D(A) !== "right"), Z = N ? q.find((A) => D(A) === "right") : void 0, ve = (A) => {
    var H, X, ce, ae;
    if (!A) return;
    const z = (H = s.mapping) == null ? void 0 : H.series;
    return (z && z.mode === "measures" ? (ce = (X = z.meta) == null ? void 0 : X[A]) == null ? void 0 : ce.label : void 0) ?? ((ae = Fe(a, A)) == null ? void 0 : ae.label);
  }, W = (A) => {
    var P, H, X, ce;
    const z = (ae, ue) => ue ? /* @__PURE__ */ i(Ta, { spec: e, update: t, axis: ae, title: "Title", auto: ve(ue) }) : null;
    switch (A) {
      case "y":
        return z("y", M);
      // single value axis (bar / area)
      case "x":
        return z("x", (H = (P = s.mapping) == null ? void 0 : P.category) == null ? void 0 : H.member);
      case "sy":
        return z("y", (X = h.sy) == null ? void 0 : X[0]);
      // scatter Y axis
      case "sx":
        return z("x", (ce = h.sx) == null ? void 0 : ce[0]);
      // scatter X axis
      default:
        return null;
    }
  }, K = (A, z) => /* @__PURE__ */ i(
    Pa,
    {
      spec: e,
      update: t,
      well: A,
      placed: h[A.id] ?? [],
      allPlaced: w,
      optionFor: (P) => Fe(a, P),
      colorFor: (P) => E[P],
      scope: y,
      blockReason: (P) => $(A.id, P),
      onAdd: (P, H) => O(A.id, P, H),
      badge: A.id === "y" ? V : void 0,
      orientation: z,
      note: A.id === "color" ? de : void 0,
      control: W(A.id)
    },
    A.id
  ), fe = b.get("y"), nt = (A) => {
    if (!fe) return null;
    const z = A === "left" ? M : Z;
    return /* @__PURE__ */ i(
      Pa,
      {
        spec: e,
        update: t,
        well: fe,
        label: A === "left" ? "Left axis" : "Right axis",
        placed: (h.y ?? []).filter((P) => D(P) === A),
        allPlaced: w,
        optionFor: (P) => Fe(a, P),
        colorFor: (P) => E[P],
        scope: y,
        blockReason: (P) => G(A, P),
        onAdd: (P, H) => re(A, P, H),
        badge: A === "left" ? T.leftLabel : T.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: z ? /* @__PURE__ */ i(
          Ta,
          {
            spec: e,
            update: t,
            axis: A === "left" ? "y" : "y2",
            title: "Title",
            auto: ve(z)
          }
        ) : null
      },
      `y-${A}`
    );
  }, rt = () => {
    const A = b.get("value"), z = (h.value ?? []).length > 0, P = s.familyOptions ?? {};
    return /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        A ? K(A, "vertical") : null,
        z ? /* @__PURE__ */ i(
          Yn,
          {
            label: "Time, range & display",
            summary: P.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(xf, { spec: e, update: t })
          }
        ) : null
      ] }),
      z ? /* @__PURE__ */ v(ie, { children: [
        /* @__PURE__ */ i(Yn, { label: "Comparison", summary: P.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(wf, { spec: e, update: t }) }),
        /* @__PURE__ */ i(Yn, { label: "Sparkline", summary: P.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(kf, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      _ ? null : /* @__PURE__ */ i(lf, { spec: e, update: t }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          tf,
          {
            currentName: y.viewLocked ?? ((Et = y.sourceCube) == null ? void 0 : Et.name),
            hasFields: w.length > 0,
            onSelect: C
          }
        ),
        /* @__PURE__ */ i(Zv, { spec: e, update: t, cube: u, scopeCubes: R, scope: y })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      Y.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", l.sidebarWidthClass), children: c === "kpi" ? rt() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        Y.flatMap(
          (A) => N && A.id === "y" ? [nt("left"), nt("right")] : [K(A, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          r,
          /* @__PURE__ */ i(sf, { spec: e, update: t, empty: _ })
        ] }),
        te.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          te.map((A) => K(A, "horizontal")),
          J && !_ ? /* @__PURE__ */ i(nf, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function $a(e, t) {
  const n = vr(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function vi(e, t) {
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
function Ia(e) {
  const t = po.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Nf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = x.useState(e), [o, s] = x.useState(e);
  x.useEffect(() => {
    a(e), s(e);
  }, [e]);
  const c = vi((f) => t(f), n), l = x.useMemo(() => Ia(r), [r]), u = l.length === 0, d = x.useCallback(
    (f) => {
      a(f), Ia(f).length === 0 && (s(f), c(f));
    },
    [c]
  );
  return { draft: r, issues: l, valid: u, committed: o, update: d };
}
const Sf = () => {
};
function _f({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: o
}) {
  const { draft: s, issues: c, valid: l, committed: u, update: d } = Nf({
    spec: e,
    onChange: t ?? Sf,
    debounceMs: r
  }), f = u, p = (C) => {
    var R, _, N;
    return (((R = C.measures) == null ? void 0 : R.length) ?? 0) > 0 || (((_ = C.dimensions) == null ? void 0 : _.length) ?? 0) > 0 || (((N = C.timeDimensions) == null ? void 0 : N.some((F) => typeof F.granularity == "string")) ?? !1);
  }, h = (C) => {
    var R;
    return (((R = C.measures) == null ? void 0 : R.length) ?? 0) > 0;
  }, b = s.chart.family !== "table", g = p(s.query) && p(f.query) && (!b || h(s.query) && h(f.query)), k = b && !h(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", y = g ? /* @__PURE__ */ i(Er, { query: f.query, chart: f.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: k }) }), w = n ? /* @__PURE__ */ v(B, { size: "sm", disabled: !l, onClick: () => n(u), children: [
    /* @__PURE__ */ i(ao, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2", a ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        l ? null : /* @__PURE__ */ v(Nr, { variant: "destructive", children: [
          /* @__PURE__ */ i(Ya, { className: "cv:size-4" }),
          /* @__PURE__ */ i(Sr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(_r, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            c.slice(0, 3).map((C, R) => /* @__PURE__ */ v("li", { children: [
              C.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: C.path }) : null,
              " ",
              C.message
            ] }, R)),
            c.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(Cf, { spec: s, update: d, toolbar: w, children: y }) })
      ]
    }
  );
}
function Rf({
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
  onSave: d,
  saveDisabled: f,
  className: p
}) {
  const h = a || o;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: S(
        "cv:flex cv:flex-wrap cv:items-center cv:gap-2 cv:rounded-lg cv:border cv:border-border cv:bg-card cv:p-2",
        p
      ),
      children: [
        /* @__PURE__ */ i(
          he,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (b) => t(b.target.value),
            className: "cv:h-8 cv:w-full cv:min-w-0 cv:flex-1 cv:sm:w-auto"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-center cv:gap-1", children: [
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(Ga, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(yr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(Zi, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ i(ec, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          h ? /* @__PURE__ */ v(ie, { children: [
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !s,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(tc, {})
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
                children: /* @__PURE__ */ i(nc, {})
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
                /* @__PURE__ */ i(rc, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ v(B, { size: "sm", onClick: d, disabled: f, children: [
            /* @__PURE__ */ i(ao, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const fi = "lg", hi = 12;
function Af(e, t) {
  const n = t[fi];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const s = o.reduce((c, l) => Math.max(c, l.x + l.w), 0);
    s > a && (r = o, a = s);
  }
  return r ?? e;
}
function Mf(e, t) {
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
const Of = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Lf(e, t, n, r = hi) {
  const a = Of[n], o = Math.min(a.w, r), s = e.reduce((c, l) => Math.max(c, l.y + l.h), 0);
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
function pi(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? hi) {
  const a = Lf(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function Df(e, t, n) {
  const r = e.widgets.find((o) => o.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  return a.id = n, pi(e, a);
}
function zf(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Tf(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Ef = 12, Ff = 900, Pf = 0.4;
function $f(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function If({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: o,
  onLayoutChange: s
}) {
  const [c, l] = Eo(), u = e.grid ?? {}, d = u.cols ?? Ef, f = u.rowHeight ?? 40, p = u.margin ?? [12, 12], h = u.containerPadding ?? [0, 0], b = Math.max(Pf, Math.min(1, l / Ff)), g = Math.max(8, Math.round(f * b)), k = [
    Math.round(p[0] * b),
    Math.round(p[1] * b)
  ], y = [
    Math.round(h[0] * b),
    Math.round(h[1] * b)
  ], w = x.useMemo(
    () => ({ [fi]: $f(e.layout) }),
    [e.layout]
  ), C = x.useMemo(
    () => new Map(e.widgets.map((F) => [F.id, F])),
    [e.widgets]
  ), R = x.useRef(s);
  x.useEffect(() => {
    R.current = s;
  }, [s]);
  const _ = x.useRef(null), N = x.useCallback(
    (F, D) => {
      const T = Af(F, D);
      R.current(T.map((L) => ({ ...L })));
    },
    []
  );
  return /* @__PURE__ */ i(zr, { spec: e, children: /* @__PURE__ */ i("div", { ref: c, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    io,
    {
      width: l,
      layouts: w,
      breakpoints: { lg: 0 },
      cols: { lg: d },
      rowHeight: g,
      margin: k,
      containerPadding: y,
      dragConfig: { enabled: !0, handle: `.${fn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: N,
      children: e.layout.map((F) => {
        const D = C.get(F.i);
        if (!D) return null;
        const T = D.id === t;
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
              "aria-pressed": T,
              onPointerDown: (L) => {
                _.current = { x: L.clientX, y: L.clientY };
              },
              onClick: (L) => {
                const $ = _.current;
                $ && Math.hypot(L.clientX - $.x, L.clientY - $.y) > 5 || n(D.id);
              },
              onKeyDown: (L) => {
                (L.key === "Enter" || L.key === " ") && (L.preventDefault(), n(D.id));
              },
              className: S(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                T ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(lr, { widget: D, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(fn, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${D.title ?? D.type}`,
                      onClick: (L) => {
                        L.stopPropagation(), r(D.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(ac, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${D.title ?? D.type}`,
                      onClick: (L) => {
                        L.stopPropagation(), a(D.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(oc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${D.title ?? D.type}`,
                      onClick: (L) => {
                        L.stopPropagation(), o(D.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-destructive cv:hover:text-destructive-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Rt, {})
                    }
                  )
                ] })
              ]
            },
            F.i
          )
        );
      })
    }
  ) : null }) });
}
function jf(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Vf({
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
  const a = co({
    extensions: [lo],
    editable: !0,
    content: jf(e.doc),
    onUpdate: ({ editor: o }) => {
      const s = o.getJSON();
      n.current({ ...r.current, doc: s });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(
          Fo,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return a ? /* @__PURE__ */ i(me, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(qf, { editor: a }),
    /* @__PURE__ */ i(so, { editor: a })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function We({ active: e, onClick: t, title: n, children: r }) {
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
function qf({ editor: e }) {
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
          We,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(ic, {})
          }
        ),
        /* @__PURE__ */ i(
          We,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(cc, {})
          }
        ),
        /* @__PURE__ */ i(
          We,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(sc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          We,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(lc, {})
          }
        ),
        /* @__PURE__ */ i(
          We,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(uc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          We,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(dc, {})
          }
        ),
        /* @__PURE__ */ i(
          We,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(mc, {})
          }
        ),
        /* @__PURE__ */ i(
          We,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(vc, {})
          }
        )
      ]
    }
  );
}
const Kf = wr(
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
function Hf({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: S(Kf({ variant: t }), e), ...n });
}
function Bf({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: o
}) {
  const { meta: s, isLoading: c } = et(), l = x.useMemo(() => Ln(s), [s]), u = l.filter((p) => p.type === "cube"), d = l.filter((p) => p.type === "view"), f = l.find((p) => p.name === e);
  return /* @__PURE__ */ v(De, { value: e, onValueChange: t, disabled: r || c, children: [
    /* @__PURE__ */ i(Te, { id: a, className: o, children: /* @__PURE__ */ i(ze, { placeholder: c ? "Loading…" : n, children: f ? /* @__PURE__ */ i(Qn, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v(Ee, { children: [
      d.length > 0 ? /* @__PURE__ */ v(ir, { children: [
        /* @__PURE__ */ i(cr, { children: "Views" }),
        d.map((p) => /* @__PURE__ */ i(ye, { value: p.name, children: /* @__PURE__ */ i(Qn, { option: p }) }, p.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(ir, { children: [
        /* @__PURE__ */ i(cr, { children: "Cubes" }),
        u.map((p) => /* @__PURE__ */ i(ye, { value: p.name, children: /* @__PURE__ */ i(Qn, { option: p }) }, p.name))
      ] }) : null
    ] })
  ] });
}
function Qn({ option: e }) {
  const t = e.type === "view" ? xr : to;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(Hf, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const Wf = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Uf(e) {
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
function Gf({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (c) => n({ ...e, control: { ...e.control, control: c } }), o = (c) => n({ ...e, control: { ...e.control, variable: c } }), s = (c) => {
    c !== r.kind && a(Uf(c));
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col", children: [
    /* @__PURE__ */ i(
      me,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          De,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(ze, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Ee, { children: t.map((c) => /* @__PURE__ */ i(ye, { value: c.name, children: c.label ? `${c.label} (${c.name})` : c.name }, c.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(me, { label: "Control", children: /* @__PURE__ */ v(De, { value: r.kind, onValueChange: (c) => s(c), children: [
      /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(ze, {}) }),
      /* @__PURE__ */ i(Ee, { children: Pc.options.map((c) => /* @__PURE__ */ i(ye, { value: c, children: Wf[c] }, c)) })
    ] }) }),
    /* @__PURE__ */ i(Yf, { control: r, onChange: a, variables: t })
  ] });
}
function Yf({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(Qf, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(Xf, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(Zf, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(eh, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(th, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(nh, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Qf({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(
      me,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          Jf,
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
function Jf({
  selected: e,
  onChange: t
}) {
  const [n, r] = x.useState(!1), a = new Set(e.map((c) => c.toLowerCase())), o = (c) => {
    const l = new Set(a);
    l.has(c) ? l.delete(c) : l.add(c), t(sn.filter((u) => l.has(u.value)).map((u) => u.value));
  }, s = a.size === 0 ? "Default set" : a.size === sn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Re, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: s }),
      /* @__PURE__ */ i(Je, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Me, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: sn.map((c) => {
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
                children: l ? /* @__PURE__ */ i(Ve, { className: "cv:size-3" }) : null
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
function Xf({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (c) => {
    const l = new Set(r);
    l.has(c) ? l.delete(c) : l.add(c);
    const u = lt.options.filter((d) => l.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((c) => c.type === "dateRange" || c.type === "time"), s = "__none__";
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(
      me,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          De,
          {
            value: e.rangeVariable ?? s,
            onValueChange: (c) => t({ ...e, rangeVariable: c === s ? void 0 : c }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(ze, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Ee, { children: [
                /* @__PURE__ */ i(ye, { value: s, children: "None" }),
                o.map((c) => /* @__PURE__ */ i(ye, { value: c.name, children: c.label ? `${c.label} (${c.name})` : c.name }, c.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(me, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: lt.options.map((c) => {
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
function Zf({
  control: e,
  onChange: t
}) {
  const n = (o, s) => {
    const c = e.options.map(
      (l, u) => u === o ? { value: s.value ?? String(l.value), label: s.label ?? l.label } : l
    );
    t({ ...e, options: c });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (o) => t({ ...e, options: e.options.filter((s, c) => c !== o) });
  return /* @__PURE__ */ v(ie, { children: [
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
      me,
      {
        label: "Options",
        action: /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ i(kt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "No options yet." }) : e.options.map((o, s) => /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5", children: [
          /* @__PURE__ */ i(
            he,
            {
              className: "cv:flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (c) => n(s, { label: c.target.value })
            }
          ),
          /* @__PURE__ */ i(
            he,
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
              children: /* @__PURE__ */ i(Rt, {})
            }
          )
        ] }, s)) })
      }
    )
  ] });
}
function eh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(me, { label: "From", children: /* @__PURE__ */ v(
      De,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(ze, {}) }),
          /* @__PURE__ */ v(Ee, { children: [
            /* @__PURE__ */ i(ye, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(ye, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(ye, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      me,
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
          Bf,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function th({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ i(me, { label: "Placeholder", children: /* @__PURE__ */ i(
    he,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function nh({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ i(me, { label: a, children: /* @__PURE__ */ i(
    he,
    {
      type: "number",
      value: e[r] ?? "",
      onChange: (o) => {
        const s = o.target.value;
        t({ ...e, [r]: s === "" ? void 0 : Number(s) });
      }
    }
  ) });
  return /* @__PURE__ */ v(ie, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function rh(e) {
  return { schemaVersion: bt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function ah(e) {
  const t = {
    schemaVersion: bt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function oh(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function ja({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", a && "cv:h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      me,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ i(
          he,
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
      /* @__PURE__ */ i(zr, { spec: rh(t), children: /* @__PURE__ */ i(qv, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(a && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        _f,
        {
          fill: a,
          spec: ah(e),
          onChange: (s) => n(oh(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(Vf, { widget: e, onChange: n }) : /* @__PURE__ */ i(Gf, { widget: e, variables: t, onChange: n })
  ] });
}
function ih({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: o,
  regionId: s,
  className: c
}) {
  const l = /* @__PURE__ */ v(ie, { children: [
    r ? /* @__PURE__ */ i(
      Jt,
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
function ch({
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
  const u = o !== void 0, [d, f] = x.useState(a), p = r ? u ? o : d : !0, h = x.useId(), b = x.useCallback(() => {
    const g = !p;
    u || f(g), s == null || s(g);
  }, [p, u, s]);
  return /* @__PURE__ */ v(
    "section",
    {
      "data-slot": "section",
      "data-state": p ? "open" : "closed",
      className: S("cv:border-b cv:border-border cv:py-2 cv:last:border-b-0", c),
      children: [
        /* @__PURE__ */ i(
          ih,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: p,
            onToggle: b,
            regionId: h
          }
        ),
        p ? /* @__PURE__ */ i("div", { id: h, "data-slot": "section-body", className: "cv:pt-2", children: l }) : null
      ]
    }
  );
}
function sh(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function lh(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function uh(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function dh(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function mh(e, t) {
  switch (e) {
    case "chart":
      return lh(t);
    case "text":
      return uh(t);
    case "input":
      return dh(t);
  }
}
function vh(e) {
  return { name: e, type: "string" };
}
function fh(e) {
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
const Va = {
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
function hh({
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
    t(e.map((f, p) => p === u ? ph(f, d) : f));
  }, s = (u) => t(e.filter((d, f) => f !== u)), c = () => t([...e, vh(a())]), l = (u, d) => {
    const f = u + d;
    if (f < 0 || f >= e.length) return;
    const p = e.slice();
    [p[u], p[f]] = [p[f], p[u]], t(p);
  };
  return /* @__PURE__ */ i(
    ch,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: c, children: [
        /* @__PURE__ */ i(kt, {}),
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
          /* @__PURE__ */ i(kt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, d) => /* @__PURE__ */ i(
        gh,
        {
          decl: u,
          index: d,
          total: e.length,
          duplicate: e.some((f, p) => p !== d && f.name === u.name && u.name !== ""),
          onChange: (f) => o(d, f),
          onRemove: () => s(d),
          onMove: (f) => l(d, f)
        },
        d
      )) })
    }
  );
}
function ph(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = fh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function gh({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: o,
  onMove: s
}) {
  const [c, l] = x.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0;
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
              onClick: () => l((d) => !d),
              className: "cv:flex cv:size-6 cv:shrink-0 cv:items-center cv:justify-center cv:rounded cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4",
              children: c ? /* @__PURE__ */ i(Je, {}) : /* @__PURE__ */ i(Jt, {})
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (d) => a({ name: d.target.value }),
              className: "cv:h-7 cv:min-w-0 cv:flex-1 cv:font-mono cv:text-xs"
            }
          ),
          /* @__PURE__ */ i("span", { className: "cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline", children: Va[e.type] }),
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
                children: /* @__PURE__ */ i(wn, {})
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
                children: /* @__PURE__ */ i(kn, {})
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
                children: /* @__PURE__ */ i(Rt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive", children: u }) : null,
        c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5", children: [
          /* @__PURE__ */ i(me, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(De, { value: e.type, onValueChange: (d) => a({ type: d }), children: [
            /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(ze, {}) }),
            /* @__PURE__ */ i(Ee, { children: fo.options.map((d) => /* @__PURE__ */ i(ye, { value: d, children: Va[d] }, d)) })
          ] }) }),
          /* @__PURE__ */ i(me, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
            he,
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
          /* @__PURE__ */ i(bh, { decl: e, onChange: (d) => a({ default: d }) })
        ] }) : null
      ]
    }
  );
}
function bh({
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
    return /* @__PURE__ */ i(me, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
      he,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (a) => {
          const o = a.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : yh(e.default);
  return /* @__PURE__ */ i(me, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    he,
    {
      value: r,
      placeholder: xh(e.type),
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
function yh(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function xh(e) {
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
function Xh({
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
  canRedo: d,
  onDiscard: f,
  className: p
}) {
  var Z, ve;
  const [h, b] = x.useState(e);
  x.useEffect(() => b(e), [e]);
  const [g, k] = x.useState(null), y = x.useRef(0), [w, C] = x.useState(null), R = x.useRef(g), _ = x.useRef(w), N = x.useRef(h);
  x.useEffect(() => {
    R.current = g, _.current = w, N.current = h;
  });
  const F = x.useRef(null);
  F.current === null && (F.current = o ?? sh());
  const D = o ?? F.current, T = vi(
    (W) => r == null ? void 0 : r(W),
    s
  ), L = x.useCallback(
    (W) => {
      y.current = Date.now(), b((K) => {
        const fe = W(K);
        return T(fe), fe;
      });
    },
    [T]
  ), $ = x.useRef(t);
  x.useEffect(() => {
    if (!t || t === $.current) return;
    const W = 500;
    let K = null;
    const fe = () => {
      var ot;
      const nt = Date.now() - y.current;
      if (nt < W) {
        K = setTimeout(fe, W - nt);
        return;
      }
      $.current = t;
      const rt = /* @__PURE__ */ new Set();
      ((ot = _.current) == null ? void 0 : ot.kind) === "widget" && rt.add(_.current.id), R.current && rt.add(R.current);
      const at = kh(t, N.current, rt);
      b(at), n == null || n(at);
    };
    return fe(), () => {
      K && clearTimeout(K);
    };
  }, [t]);
  const V = x.useCallback(
    (W) => {
      const K = mh(W, D());
      L((fe) => pi(fe, K)), k(K.id), C({ kind: "widget", id: K.id });
    },
    [L, D]
  ), E = x.useCallback((W) => k(W), []), O = x.useCallback((W) => {
    k(W), C({ kind: "widget", id: W });
  }, []), G = x.useCallback(
    (W) => {
      L((K) => zf(K, W)), k((K) => K === W ? null : K), C((K) => (K == null ? void 0 : K.kind) === "widget" && K.id === W ? null : K);
    },
    [L]
  ), re = x.useCallback(
    (W) => {
      const K = D();
      L((fe) => Df(fe, W, K)), k(K);
    },
    [L, D]
  ), I = x.useCallback(
    (W) => L((K) => Tf(K, W)),
    [L]
  ), Y = x.useCallback(
    (W) => L((K) => ({ ...K, layout: Mf(K.layout, W) })),
    [L]
  ), te = x.useCallback(
    (W) => L((K) => ({ ...K, name: W || void 0 })),
    [L]
  ), U = x.useCallback(
    (W) => L((K) => ({ ...K, variables: W })),
    [L]
  ), Q = x.useMemo(
    () => go.safeParse(h),
    [h]
  ), de = x.useCallback(() => {
    Q.success && (a == null || a(Q.data));
  }, [Q, a]), J = (w == null ? void 0 : w.kind) === "widget" ? h.widgets.find((W) => W.id === w.id) ?? null : null;
  x.useEffect(() => {
    (w == null ? void 0 : w.kind) === "widget" && !h.widgets.some((W) => W.id === w.id) && C(null);
  }, [w, h.widgets]);
  const q = x.useCallback(() => C(null), []), M = (w == null ? void 0 : w.kind) === "variables" ? "Dashboard variables" : J ? J.title ?? `${wh(J.type)} widget` : "";
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((ve = (Z = h.grid) == null ? void 0 : Z.margin) == null ? void 0 : ve[0]) ?? 12 },
      className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", p),
      children: [
        /* @__PURE__ */ i(
          Rf,
          {
            name: h.name ?? "",
            onNameChange: te,
            onAdd: V,
            onEditVariables: () => C({ kind: "variables" }),
            onUndo: c,
            onRedo: l,
            canUndo: u,
            canRedo: d,
            onDiscard: f,
            onSave: a ? de : void 0,
            saveDisabled: !Q.success,
            className: "cv:shrink-0"
          }
        ),
        Q.success ? null : /* @__PURE__ */ v("p", { className: "cv:shrink-0 cv:text-xs cv:text-destructive", children: [
          Q.error.issues.length,
          " validation issue",
          Q.error.issues.length === 1 ? "" : "s",
          " — fix before saving."
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-y-auto cv:pb-4", children: /* @__PURE__ */ i(
          If,
          {
            spec: h,
            selectedId: g,
            onSelect: E,
            onEdit: O,
            onDuplicate: re,
            onDelete: G,
            onLayoutChange: Y
          }
        ) }),
        w ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": M,
            className: "cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background",
            children: [
              /* @__PURE__ */ v("header", { className: "cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5", children: [
                /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                  /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", onClick: q, children: [
                    /* @__PURE__ */ i(br, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: M })
                ] }),
                J ? /* @__PURE__ */ v(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => G(J.id),
                    children: [
                      /* @__PURE__ */ i(Rt, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: w.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(hh, { variables: h.variables, onChange: U }) }) : (J == null ? void 0 : J.type) === "chart" ? /* @__PURE__ */ i(
                ja,
                {
                  fill: !0,
                  widget: J,
                  variables: h.variables,
                  onChange: I,
                  onVariablesChange: U
                }
              ) : J ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                ja,
                {
                  widget: J,
                  variables: h.variables,
                  onChange: I,
                  onVariablesChange: U
                }
              ) }) : null })
            ]
          }
        ) : null
      ]
    }
  );
}
function wh(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function kh(e, t, n) {
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
  Ls as AreaChartFamily,
  fs as AreaFamilyOptionsSchema,
  Tc as AxesOptionsSchema,
  jn as AxisOptionsSchema,
  Ih as BUILTIN_CHART_FAMILIES,
  He as BUILTIN_DEFAULTS,
  Ke as BUILTIN_FAMILY_OPTION_SCHEMAS,
  Ms as BarChartFamily,
  ms as BarFamilyOptionsSchema,
  fi as CANONICAL_BREAKPOINT,
  Qe as ChartColorTokenSchema,
  Cf as ChartEditOverlay,
  _f as ChartEditor,
  Mc as ChartFamilySchema,
  vo as ChartOptionsSchema,
  bl as ChartRenderer,
  po as ChartSpecSchema,
  Jh as ChartView,
  Ic as ChartWidgetSchema,
  Ec as ColorAssignmentSchema,
  nl as ComboChartFamily,
  ks as ComboFamilyOptionsSchema,
  ws as ComboSeriesOptSchema,
  ys as CondFormatRuleSchema,
  Er as CubeChart,
  Dd as CubeChartSpec,
  mo as CubeQuerySchema,
  Dr as CubeVizContext,
  Gh as CubeVizProvider,
  xe as DEFAULT_COLOR_RAMP,
  hi as DEFAULT_COLS,
  or as DEFAULT_UNIT_CONVERSIONS,
  fn as DRAG_HANDLE_CLASS,
  Qh as Dashboard,
  Xh as DashboardEditor,
  zr as DashboardProvider,
  go as DashboardSpecSchema,
  Jn as DateRangeSchema,
  Cs as EMPTY_FAMILY_DEFAULT,
  sa as EM_DASH,
  If as EditorCanvas,
  Rf as EditorToolbar,
  Wv as FilterBuilder,
  Sc as FilterOperatorSchema,
  Oc as FormatKindSchema,
  Cn as FormatOptionsSchema,
  Zc as GRANULARITY_PATTERN,
  lt as GranularitySchema,
  Hc as GridConfigSchema,
  Pc as InputControlKindSchema,
  $c as InputControlSchema,
  Gf as InputWidgetEditor,
  Vc as InputWidgetSchema,
  em as InputWidgetView,
  $s as KpiFamily,
  gs as KpiFamilyOptionsSchema,
  Kc as LayoutItemSchema,
  _c as LeafFilterSchema,
  Dc as LegendOptionsSchema,
  Os as LineChartFamily,
  vs as LineFamilyOptionsSchema,
  ne as MemberSchema,
  oa as OrderDirSchema,
  Ac as OrderSpecSchema,
  Ds as PieChartFamily,
  hs as PieFamilyOptionsSchema,
  Xn as QueryFilterSchema,
  Xt as ReferenceLineOptSchema,
  lr as RenderWidget,
  bt as SCHEMA_VERSION,
  Nc as ScalarSchema,
  Ts as ScatterChartFamily,
  ps as ScatterFamilyOptionsSchema,
  Lc as SeriesMappingSchema,
  ia as SeriesMetaSchema,
  bo as SpecSchema,
  bs as TableColumnOptSchema,
  Us as TableFamily,
  xs as TableFamilyOptionsSchema,
  Vf as TextWidgetEditor,
  jc as TextWidgetSchema,
  Td as TextWidgetView,
  Rc as TimeDimensionSchema,
  Fc as TipTapDocSchema,
  zc as TooltipOptionsSchema,
  dn as VarRefSchema,
  Bc as VariableDeclSchema,
  fo as VariableTypeSchema,
  uo as VariableValueSchema,
  hh as VariablesPanel,
  qo as WidgetChrome,
  ja as WidgetEditPanel,
  qc as WidgetSpecSchema,
  pi as appendWidget,
  ma as assignColors,
  pd as axisKey,
  Uh as builtinCharts,
  nr as builtinFamilyDescriptors,
  hl as chartFamilies,
  Gc as createCubeClient,
  sh as createIdFactory,
  zo as createUnitsFormatter,
  Fl as createVariableStore,
  ns as datePattern,
  Zn as deepMerge,
  fh as defaultForType,
  Rr as defaultFormatter,
  Do as familyDefaults,
  ge as familyDescriptor,
  Wh as familyOptionsSchema,
  Yc as fetchMeta,
  Kh as formatCategory,
  qt as formatDateValue,
  Bh as getFamilyDescriptor,
  Ct as isEmptyValue,
  Le as isVarRef,
  fl as listFamilyDescriptors,
  Uc as loadSpec,
  yo as looksLikeIsoDate,
  wo as makeChartFormat,
  qh as makeDateFormatter,
  Hh as makeFormatter,
  Mf as mergeLayout,
  Rn as mergeUnitConversions,
  lh as newChartWidget,
  dh as newInputWidget,
  uh as newTextWidget,
  vh as newVariable,
  mh as newWidget,
  Sl as normalize,
  Af as pickCanonicalLayout,
  Lf as placeNewItem,
  bd as quantityLabel,
  vl as registerChartFamily,
  zf as removeWidget,
  Tf as replaceWidget,
  Cd as resolveChart,
  gl as resolveOptions,
  Ns as resolveOptionsWith,
  El as resolveQuery,
  rr as resolveSeriesColors,
  Ll as resolveValue,
  jh as safeLoadSpec,
  ts as toDate,
  xl as toResultAnnotation,
  Nf as useChartEditorState,
  Eo as useContainerWidth,
  et as useCubeMeta,
  Sd as useCubeQuery,
  Ze as useCubeVizContext,
  To as useDashboard,
  vi as useDebouncedCallback,
  Yh as useFormatter,
  Wn as useNormalizedSeries,
  Tr as useOptionalDashboard,
  Vh as validateSpec
};
//# sourceMappingURL=index.js.map
