import { jsx as i, jsxs as v, Fragment as re } from "react/jsx-runtime";
import * as br from "recharts";
import { BarChart as Ai, CartesianGrid as Ut, YAxis as qe, XAxis as xt, Bar as Ya, LabelList as Qa, ReferenceLine as Gt, LineChart as Mi, Line as Ja, AreaChart as Xa, Area as yr, PieChart as Li, Pie as Oi, Cell as Za, Label as Di, ScatterChart as zi, ZAxis as Ti, Scatter as Ei, RadialBarChart as Pi, PolarAngleAxis as Fi, RadialBar as $i, ResponsiveContainer as Ii, ComposedChart as ji } from "recharts";
import * as y from "react";
import { createContext as eo, useContext as xr, useMemo as ne, useState as wt, useCallback as Xe, useEffect as Yt, useRef as pt, createElement as Vi, useSyncExternalStore as qi, useId as Ki } from "react";
import { clsx as Bi } from "clsx";
import { extendTailwindMerge as Hi } from "tailwind-merge";
import { z as d } from "zod";
import { Minus as Wi, ArrowUp as wn, ArrowDown as kn, ChevronsUpDown as Ui, MapPin as to, BarChart4 as Gi, Table as Yi, Gauge as Qi, ScatterChart as Ji, PieChart as Xi, AreaChart as Zi, LineChart as ec, BarChart3 as no, AlertCircle as ro, ChevronLeft as wr, ChevronRight as Qt, ChevronDown as tt, Check as Ke, ChevronUp as tc, CalendarIcon as ao, MoreVertical as nc, RefreshCw as rc, Image as ac, Sheet as oc, Type as kr, Hash as oo, Calendar as io, Search as ic, Table2 as co, Database as so, Layers as Cr, Variable as cc, Plus as kt, Trash2 as At, ListFilter as sc, Box as lo, EyeOff as uo, Eye as mo, X as sa, Save as vo, SlidersHorizontal as lc, Braces as uc, Undo2 as mc, Redo2 as dc, RotateCcw as vc, Pencil as fc, Copy as hc, Bold as pc, Italic as gc, Strikethrough as bc, Heading1 as yc, Heading2 as xc, List as wc, ListOrdered as kc, Quote as Cc } from "lucide-react";
import { cva as Nr } from "class-variance-authority";
import { APIProvider as Nc, Map as Sc, useMap as Cn, AdvancedMarker as _c, useMapsLibrary as Rc } from "@vis.gl/react-google-maps";
import * as ln from "@radix-ui/react-popover";
import * as we from "@radix-ui/react-select";
import Ac from "@cubejs-client/core";
import { format as pe, isValid as $t, parseISO as un, differenceInCalendarDays as Mc, subDays as Le, startOfMonth as En, subMonths as Pn, startOfQuarter as Fn, subQuarters as $n, startOfYear as In, subYears as jn, subWeeks as Lc, startOfWeek as Oc, endOfWeek as Dc, endOfMonth as zc, endOfQuarter as Tc, endOfYear as Ec, parse as fo } from "date-fns";
import { DayPicker as Pc, useDayPicker as Fc } from "react-day-picker";
import { ResponsiveGridLayout as ho } from "react-grid-layout";
import { useEditor as po, EditorContent as go } from "@tiptap/react";
import bo from "@tiptap/starter-kit";
const gt = 1, mn = d.object({ var: d.string().min(1) }).strict();
function De(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const dn = (e) => d.union([e, mn]), $c = d.union([d.string(), d.number(), d.boolean()]), ct = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), er = d.union([d.tuple([d.string(), d.string()]), d.string()]), yo = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), ee = d.string().min(1), Ic = d.enum([
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
]), jc = d.object({
  member: ee,
  operator: Ic,
  values: d.array(d.union([$c, mn])).optional()
}).strict(), tr = d.lazy(
  () => d.union([
    jc,
    d.object({ and: d.array(tr) }).strict(),
    d.object({ or: d.array(tr) }).strict()
  ])
), Vc = d.object({
  dimension: ee,
  granularity: dn(ct).optional(),
  dateRange: dn(er).optional(),
  compareDateRange: d.array(er).optional()
}).strict(), la = d.enum(["asc", "desc"]), qc = d.union([
  d.record(ee, la),
  d.array(d.tuple([ee, la]))
]), xo = d.object({
  measures: d.array(ee).optional(),
  dimensions: d.array(ee).optional(),
  timeDimensions: d.array(Vc).optional(),
  filters: d.array(tr).optional(),
  segments: d.array(ee).optional(),
  order: qc.optional(),
  limit: dn(d.number()).optional(),
  offset: dn(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), Kc = d.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo",
  "map"
]), et = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Bc = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), Nn = d.object({
  kind: Bc.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional()
}).strict(), ua = d.object({
  label: d.string().optional(),
  colorToken: et.optional(),
  stackId: d.string().optional(),
  axis: d.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: Nn.optional()
}).strict(), Hc = d.object({
  category: d.object({ member: ee }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(ee),
      meta: d.record(ee, ua).optional()
    }).strict(),
    d.object({
      mode: d.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: ee,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: d.array(ee).optional(),
      pivot: ee,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: d.record(ee, ua).optional()
    }).strict()
  ])
}).strict(), Wc = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Uc = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), ma = d.union([d.number(), d.literal("auto")]), Vn = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([ma, ma]).optional(),
  tickFormat: Nn.optional()
}).strict(), Gc = d.object({
  x: Vn.optional(),
  y: Vn.optional(),
  y2: Vn.optional()
}).strict(), Yc = d.object({
  byKey: d.record(d.string(), et).optional(),
  ramp: d.array(et).optional()
}).strict(), wo = d.object({
  family: Kc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Hc.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Wc.optional(),
  tooltip: Uc.optional(),
  axes: Gc.optional(),
  colors: Yc.optional(),
  format: Nn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), Qc = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), Jc = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Xc = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(ct).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: yo, label: d.string() }).strict()),
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
}).strict(), Sr = {
  id: d.string().min(1),
  title: d.string().optional()
}, Zc = d.object({ ...Sr, type: d.literal("chart"), query: xo, chart: wo }).strict(), es = d.object({ ...Sr, type: d.literal("text"), doc: Qc }).strict(), ts = d.object({ ...Sr, type: d.literal("input"), control: Xc }).strict(), ns = d.discriminatedUnion("type", [
  Zc,
  es,
  ts
]), rs = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), as = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), ko = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), os = d.object({
  name: d.string().min(1),
  type: ko,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: yo.optional()
}).strict(), Co = {
  schemaVersion: d.literal(gt),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, No = d.object({ ...Co, kind: d.literal("chart"), query: xo, chart: wo }).strict(), So = d.object({
  ...Co,
  kind: d.literal("dashboard"),
  variables: d.array(os),
  widgets: d.array(ns),
  layout: d.array(rs),
  grid: as.optional()
}).strict(), _o = d.discriminatedUnion("kind", [No, So]), is = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function cs(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > gt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${gt} — update the library`
    );
  for (; n < gt; ) {
    const r = is[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return _o.parse(t);
}
function fp(e) {
  try {
    return { ok: !0, spec: cs(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function hp(e) {
  return _o.parse(e);
}
function ss(e) {
  return Ac(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ls(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const us = Hi({ prefix: "cv" });
function S(...e) {
  return us(Bi(e));
}
function _r(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function ms({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const ds = Nr(
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
), Rr = y.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: S(ds({ variant: t }), e),
    ...n
  }
));
Rr.displayName = "Alert";
const Ar = y.forwardRef(
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
Ar.displayName = "AlertTitle";
const Mr = y.forwardRef(
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
Mr.displayName = "AlertDescription";
const vs = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, fs = "MMM d, yyyy";
function hs(e) {
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
function Ro(e) {
  return /^\d{4}-\d{2}/.test(e) ? $t(un(e)) : !1;
}
function ps(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? vs[t] : fs;
}
function qt(e, t, n) {
  const r = hs(e);
  return r ? pe(r, ps(t, n)) : String(e);
}
function pp(e, t) {
  return (n) => n == null ? "" : qt(n, e, t);
}
function gp(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? qt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? qt(e, t.format, t.granularity) : String(e) : Ro(e) ? qt(e, t.format, t.granularity) : e;
}
const da = "—", gs = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function va(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function bs(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of gs)
    if (n >= r) return va((e / r).toFixed(t)) + a;
  return va(e.toFixed(t));
}
function ys(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function xs(e, t) {
  const { format: n, meta: r, locale: a } = t, o = n != null && n.abbreviate ? bs(e, n.decimals ?? 1) : ys(e, n, a), c = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${c ? ` ${c}` : ""}`;
}
function Ao(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ws(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Ao(e.value) ? !0 : typeof e.value == "string" ? Ro(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const Lr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? da : (Ao(t) || typeof t == "string" || typeof t == "number") && ws(e) ? qt(t, n, r) : typeof t == "number" ? xs(t, e) : String(t);
};
function ks(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function bp(e, t) {
  return (n, r) => {
    const a = r ? ks(r, t) : void 0;
    return Lr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function Cs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Ns(e) {
  const t = ct.safeParse(e);
  return t.success ? t.data : void 0;
}
function Ss(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const o = Ns(a.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function Mo(e, t, n, r) {
  const a = Ss(e, t);
  return {
    value(o, c, s = "value") {
      const l = c ? Cs(c, e) : void 0, u = l == null ? void 0 : l.meta;
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
const Jt = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  label: d.string().optional(),
  colorToken: et.optional()
}).strict(), Or = d.boolean().optional(), _s = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(Jt).optional(),
  comparePrevious: Or
}).strict(), Dr = d.enum(["linear", "monotone", "step", "natural"]), Rs = d.object({
  curve: Dr.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(Jt).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: Or
}).strict(), As = d.object({
  curve: Dr.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(Jt).optional(),
  comparePrevious: Or
}).strict(), Ms = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), Ls = d.object({
  x: ee,
  y: ee,
  size: ee.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: ee.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(Jt).optional()
}).strict(), Os = d.object({
  display: d.enum(["number", "gauge"]).optional(),
  measure: ee,
  comparison: d.object({
    mode: d.enum(["previousPeriod", "value"]),
    value: d.union([ee, d.number()]).optional(),
    showAsPercent: d.boolean().optional(),
    goodDirection: d.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: d.object({
    member: ee.optional(),
    timeDimension: ee.optional(),
    granularity: d.union([ct, mn]).optional(),
    dateRange: d.union([er, mn]).optional()
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
}).strict(), Ds = d.object({
  member: ee,
  label: d.string().optional(),
  format: Nn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), zs = d.object({
  member: ee,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: et.optional()
}).strict(), Ts = d.object({
  columns: d.array(Ds).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(zs).optional()
}).strict(), Es = d.object({
  member: ee,
  render: d.enum(["bar", "line", "area"]),
  axis: d.enum(["left", "right"]).optional(),
  colorToken: et.optional(),
  stackId: d.string().optional(),
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: d.boolean().optional(),
  label: d.string().optional()
}).strict(), Ps = d.object({
  series: d.array(Es),
  referenceLines: d.array(Jt).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: Dr.optional(),
  dots: d.boolean().optional(),
  connectNulls: d.boolean().optional(),
  strokeWidth: d.number().optional(),
  fillOpacity: d.number().optional(),
  barRadius: d.number().optional()
}).strict(), Fs = d.enum(["points", "paths", "heatmap"]), $s = d.object({
  mode: Fs.default("points"),
  /** Latitude member (numeric). */
  lat: ee.optional(),
  /** Longitude member (numeric). */
  lng: ee.optional(),
  /** Heatmap point weight member (numeric); default weight 1 when unset. */
  weight: ee.optional(),
  /** Split rows into colored series / polylines by this category member. */
  series: ee.optional(),
  /** Order path vertices by this (usually time) member; falls back to row order. */
  time: ee.optional(),
  /** Initial zoom when the data has no extent (a single point / empty). */
  zoom: d.number().optional(),
  /** Heatmap influence radius in pixels. */
  heatmapRadius: d.number().optional()
}).strict(), Is = {
  bar: _s,
  line: Rs,
  area: As,
  pie: Ms,
  scatter: Ls,
  kpi: Os,
  table: Ts,
  combo: Ps,
  map: $s
};
function je(e) {
  return Is[e];
}
const Oe = {
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
  },
  map: {
    // No Recharts envelope (legend/tooltip/format don't apply to a Google Map);
    // lat/lng are picked by the user, so they're absent from the default skeleton.
    envelope: {},
    familyOptions: { mode: "points" }
  }
};
function fa(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function nr(e, t) {
  if (t === void 0) return e;
  if (!fa(e) || !fa(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? nr(e[r], a) : a);
  }
  return n;
}
function js(e) {
  const t = Oe[e.family];
  return {
    ...nr({ ...t.envelope }, e),
    familyOptions: nr(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
function zr(e) {
  return e.categories.map((t, n) => {
    const r = { __cat: typeof t == "number" ? t : String(t) };
    for (const a of e.series) r[a.key] = a.data[n] ?? null;
    return r;
  });
}
function Mt(e) {
  return e === "top" ? "top" : "bottom";
}
function Lt(e) {
  return "horizontal";
}
function Ot(e) {
  return "center";
}
function _e(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function $e(e) {
  return e == null ? void 0 : e.domain;
}
function Ie(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Vs(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Kt(e) {
  return `var(${_r(e.key)})`;
}
function qs(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Lo(e) {
  return e === "stacked" || e === "percent";
}
function Sn(e, t) {
  var s, l, u, m, f, h, p, b, g, x, w, k, C, R;
  const n = e.raw.annotation, r = (_) => {
    var N, z, L, j, D, $;
    if (_)
      return ((N = n == null ? void 0 : n.measures[_]) == null ? void 0 : N.shortTitle) ?? ((z = n == null ? void 0 : n.dimensions[_]) == null ? void 0 : z.shortTitle) ?? ((L = n == null ? void 0 : n.timeDimensions[_]) == null ? void 0 : L.shortTitle) ?? ((j = n == null ? void 0 : n.measures[_]) == null ? void 0 : j.title) ?? ((D = n == null ? void 0 : n.dimensions[_]) == null ? void 0 : D.title) ?? (($ = n == null ? void 0 : n.timeDimensions[_]) == null ? void 0 : $.title) ?? _;
  }, a = e.series.find((_) => {
    var N;
    return (((N = _.meta) == null ? void 0 : N.axis) ?? "left") !== "right";
  }), o = e.series.find((_) => {
    var N;
    return ((N = _.meta) == null ? void 0 : N.axis) === "right";
  }), c = (_) => {
    var N;
    return _ ? (N = _.meta) != null && N.measure ? r(_.meta.measure) : _.label : void 0;
  };
  return {
    x: (l = (s = t.axes) == null ? void 0 : s.x) != null && l.labelHide ? void 0 : ((m = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : m.label) ?? r((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (b = (p = t.axes) == null ? void 0 : p.y) != null && b.labelHide ? void 0 : ((x = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : x.label) ?? c(a),
    right: (k = (w = t.axes) == null ? void 0 : w.y2) != null && k.labelHide ? void 0 : ((R = (C = t.axes) == null ? void 0 : C.y2) == null ? void 0 : R.label) ?? c(o)
  };
}
function Je(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function Tr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function Xt(e, t, n) {
  return (r, a) => {
    const o = a == null ? void 0 : a.dataKey, c = typeof o == "string" || typeof o == "number" ? String(o) : void 0, s = (c ? n == null ? void 0 : n.get(c) : void 0) ?? t ?? c;
    return e.value(r, s, "tooltip");
  };
}
function vn(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
const Ks = { light: "", dark: ".dark" }, Oo = y.createContext(null);
function Do() {
  const e = y.useContext(Oo);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const nt = y.forwardRef(({ id: e, className: t, children: n, config: r, ...a }, o) => {
  const c = y.useId(), s = `chart-${e || c.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Oo.Provider, { value: { config: r }, children: /* @__PURE__ */ v(
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
        /* @__PURE__ */ i(Bs, { id: s, config: r }),
        /* @__PURE__ */ i(br.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
nt.displayName = "ChartContainer";
const Bs = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, r]) => r.theme || r.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Ks).map(
          ([r, a]) => `
${a} [data-chart=${e}] {
${n.map(([o, c]) => {
            var l;
            const s = ((l = c.theme) == null ? void 0 : l[r]) || c.color;
            return s ? `  ${_r(o)}: ${s};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, Dt = br.Tooltip, lt = y.forwardRef(
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
    labelKey: p
  }, b) => {
    const { config: g } = Do(), x = y.useMemo(() => {
      var N;
      if (a || !(t != null && t.length))
        return null;
      const [k] = t, C = `${p || (k == null ? void 0 : k.dataKey) || (k == null ? void 0 : k.name) || "value"}`, R = rr(g, k, C), _ = !p && typeof c == "string" ? ((N = g[c]) == null ? void 0 : N.label) || c : R == null ? void 0 : R.label;
      return s ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: s(_, t) }) : _ ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: _ }) : null;
    }, [c, s, t, a, l, g, p]);
    if (!e || !(t != null && t.length))
      return null;
    const w = t.length === 1 && r !== "dot";
    return /* @__PURE__ */ v(
      "div",
      {
        ref: b,
        className: S(
          "cv:grid cv:min-w-32 cv:items-start cv:gap-1.5 cv:rounded-lg cv:border cv:border-border/40 cv:bg-background cv:px-3 cv:py-2 cv:text-xs cv:shadow-lg",
          n
        ),
        children: [
          w ? null : x,
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((k, C) => {
            var z;
            const R = `${h || k.name || k.dataKey || "value"}`, _ = rr(g, k, R), N = f || ((z = k.payload) == null ? void 0 : z.fill) || k.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  r === "dot" && "cv:items-center"
                ),
                children: u && (k == null ? void 0 : k.value) !== void 0 && k.name ? u(k.value, k.name, k, C, k.payload) : /* @__PURE__ */ v(re, { children: [
                  _ != null && _.icon ? /* @__PURE__ */ i(_.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: S(
                        "cv:shrink-0 cv:rounded-[2px] cv:border-[--color-border] cv:bg-[--color-bg]",
                        {
                          "cv:h-2.5 cv:w-2.5": r === "dot",
                          "cv:w-1": r === "line",
                          "cv:w-0 cv:border-[1.5px] cv:border-dashed cv:bg-transparent": r === "dashed",
                          "cv:my-0.5": w && r === "dashed"
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
                        w ? "cv:items-end" : "cv:items-center"
                      ),
                      children: [
                        /* @__PURE__ */ v("div", { className: "cv:grid cv:gap-1.5", children: [
                          w ? x : null,
                          /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: (_ == null ? void 0 : _.label) || k.name })
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
lt.displayName = "ChartTooltipContent";
const zt = br.Legend, ut = y.forwardRef(
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
          const l = `${a || s.dataKey || "value"}`, u = rr(c, s, l);
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
ut.displayName = "ChartLegendContent";
function rr(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let a = n;
  return n in t && typeof t[n] == "string" ? a = t[n] : r && n in r && typeof r[n] == "string" && (a = r[n]), a in e ? e[a] : e[n];
}
function Hs({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var j, D, $, V, T, O, Y, ae, F, G, te, U, Q, de, J, q;
  const o = t.familyOptions ?? {}, c = t.orientation === "horizontal", s = Lo(t.stackMode), l = t.stackMode === "percent", u = zr(e), m = (A, X, he = "value") => l ? vn(A) : r.value(A, X, he), f = (A) => r.category(A), h = Tr(e), p = Je(e.series[0]), b = c ? (D = (j = t.axes) == null ? void 0 : j.y) == null ? void 0 : D.hide : (V = ($ = t.axes) == null ? void 0 : $.x) == null ? void 0 : V.hide, g = c ? (T = t.axes) == null ? void 0 : T.x : (O = t.axes) == null ? void 0 : O.y, x = !c && e.series.some((A) => {
    var X;
    return ((X = A.meta) == null ? void 0 : X.axis) === "right";
  }), w = Je(e.series.find((A) => {
    var X;
    return ((X = A.meta) == null ? void 0 : X.axis) !== "right";
  })) ?? p, k = Je(e.series.find((A) => {
    var X;
    return ((X = A.meta) == null ? void 0 : X.axis) === "right";
  })), C = Sn(e, t), R = C.x ? { value: C.x, position: "insideBottom", offset: -2 } : void 0, _ = C.x ? { value: C.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, N = C.left ? { value: C.left, position: "insideBottom", offset: -2 } : void 0, z = C.left ? { value: C.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, L = C.right ? { value: C.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(nt, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    Ai,
    {
      accessibilityLayer: !0,
      data: u,
      layout: c ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Ut, { vertical: c, horizontal: !c }),
        c ? /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            qe,
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
              scale: Ie(g),
              domain: $e(g),
              tickFormatter: (A) => m(A, p, "axis"),
              label: N
            }
          )
        ] }) : /* @__PURE__ */ v(re, { children: [
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
            qe,
            {
              yAxisId: "left",
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: Ie(g),
              domain: $e(g),
              tickFormatter: (A) => m(A, w, "axis"),
              label: z
            }
          ),
          x && /* @__PURE__ */ i(
            qe,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (ae = (Y = t.axes) == null ? void 0 : Y.y2) == null ? void 0 : ae.hide,
              scale: Ie((F = t.axes) == null ? void 0 : F.y2),
              domain: $e((G = t.axes) == null ? void 0 : G.y2),
              tickFormatter: (A) => m(A, k, "axis"),
              label: L
            }
          )
        ] }),
        ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(
              lt,
              {
                labelFormatter: (A) => r.category(A),
                indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
                valueFormatter: l ? (A) => vn(A) : Xt(r, void 0, h)
              }
            )
          }
        ),
        _e(t).show && /* @__PURE__ */ i(
          zt,
          {
            content: /* @__PURE__ */ i(ut, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Mt((Q = t.legend) == null ? void 0 : Q.position),
            layout: Lt((de = t.legend) == null ? void 0 : de.position),
            align: Ot((J = t.legend) == null ? void 0 : J.position)
          }
        ),
        e.series.map((A) => {
          var X, he, K, W;
          return /* @__PURE__ */ i(
            Ya,
            {
              yAxisId: c ? void 0 : ((X = A.meta) == null ? void 0 : X.axis) === "right" && x ? "right" : "left",
              dataKey: A.key,
              name: A.label,
              stackId: s ? (he = A.meta) != null && he.companion ? "__prev" : ((K = A.meta) == null ? void 0 : K.stackId) ?? "stack" : void 0,
              fill: Kt(A),
              fillOpacity: (W = A.meta) != null && W.companion ? 0.4 : void 0,
              radius: Vs(o.barRadius, c),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                Qa,
                {
                  dataKey: A.key,
                  position: c ? "right" : "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (fe) => m(typeof fe == "boolean" ? Number(fe) : fe, Je(A), "label")
                }
              )
            },
            A.key
          );
        }),
        (q = o.referenceLines) == null ? void 0 : q.map((A, X) => /* @__PURE__ */ i(
          Gt,
          {
            yAxisId: c ? void 0 : "left",
            ...A.axis === "y" ? { y: A.value } : { x: A.value },
            label: A.label,
            stroke: `var(--${A.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          X
        ))
      ]
    }
  ) });
}
function Ws({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var w, k, C, R, _, N, z, L, j, D, $, V, T, O, Y, ae;
  const o = t.familyOptions ?? {}, c = o.chrome === "none", s = zr(e), l = (F) => r.category(F), u = e.series.some((F) => {
    var G;
    return ((G = F.meta) == null ? void 0 : G.axis) === "right";
  }), m = o.curve ?? "monotone", f = Tr(e), h = Je(e.series.find((F) => {
    var G;
    return ((G = F.meta) == null ? void 0 : G.axis) !== "right";
  })), p = Je(e.series.find((F) => {
    var G;
    return ((G = F.meta) == null ? void 0 : G.axis) === "right";
  })), b = Sn(e, t), g = !c && o.dots === !0, x = !c;
  return /* @__PURE__ */ i(
    nt,
    {
      config: n,
      className: c ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(Mi, { accessibilityLayer: !0, data: s, margin: c ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !c && /* @__PURE__ */ i(Ut, { vertical: !1 }),
        /* @__PURE__ */ i(
          xt,
          {
            type: "category",
            dataKey: "__cat",
            hide: c || ((k = (w = t.axes) == null ? void 0 : w.x) == null ? void 0 : k.hide),
            tickFormatter: l,
            label: !c && b.x ? { value: b.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            yAxisId: "left",
            type: "number",
            hide: c || ((R = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : R.hide),
            scale: Ie((_ = t.axes) == null ? void 0 : _.y),
            domain: $e((N = t.axes) == null ? void 0 : N.y),
            tickFormatter: (F) => r.value(F, h, "axis"),
            label: !c && b.left ? { value: b.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          qe,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: c || ((L = (z = t.axes) == null ? void 0 : z.y2) == null ? void 0 : L.hide),
            scale: Ie((j = t.axes) == null ? void 0 : j.y2),
            domain: $e((D = t.axes) == null ? void 0 : D.y2),
            tickFormatter: (F) => r.value(F, p, "axis"),
            label: !c && b.right ? { value: b.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !c && (($ = t.tooltip) == null ? void 0 : $.show) !== !1 && /* @__PURE__ */ i(
          Dt,
          {
            content: /* @__PURE__ */ i(
              lt,
              {
                labelFormatter: (F) => r.category(F),
                indicator: ((V = t.tooltip) == null ? void 0 : V.indicator) ?? "line",
                valueFormatter: Xt(r, void 0, f)
              }
            )
          }
        ),
        !c && _e(t).show && /* @__PURE__ */ i(
          zt,
          {
            content: /* @__PURE__ */ i(ut, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: Mt((T = t.legend) == null ? void 0 : T.position),
            layout: Lt((O = t.legend) == null ? void 0 : O.position),
            align: Ot((Y = t.legend) == null ? void 0 : Y.position)
          }
        ),
        e.series.map((F) => {
          var G, te, U, Q, de, J;
          return /* @__PURE__ */ i(
            Ja,
            {
              yAxisId: u && ((G = F.meta) == null ? void 0 : G.axis) === "right" ? "right" : "left",
              type: ((te = F.meta) == null ? void 0 : te.curve) ?? m,
              dataKey: F.key,
              name: F.label,
              stroke: Kt(F),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (U = F.meta) != null && U.companion ? "5 4" : void 0,
              strokeOpacity: (Q = F.meta) != null && Q.companion ? 0.55 : void 0,
              dot: c || (de = F.meta) != null && de.companion ? !1 : ((J = F.meta) == null ? void 0 : J.dots) ?? g,
              activeDot: x,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !c,
              children: !c && o.showValueLabels && /* @__PURE__ */ i(
                Qa,
                {
                  dataKey: F.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (q) => r.value(typeof q == "boolean" ? Number(q) : q, Je(F), "label")
                }
              )
            },
            F.key
          );
        }),
        !c && ((ae = o.referenceLines) == null ? void 0 : ae.map((F, G) => /* @__PURE__ */ i(
          Gt,
          {
            yAxisId: "left",
            ...F.axis === "y" ? { y: F.value } : { x: F.value },
            label: F.label,
            stroke: `var(--${F.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          G
        )))
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
  var x, w, k, C, R, _, N, z, L, j, D, $, V, T;
  const o = t.familyOptions ?? {}, c = ((w = (x = t.mapping) == null ? void 0 : x.series) == null ? void 0 : w.mode) === "pivot", s = t.stackMode ?? (c ? "stacked" : "none"), l = Lo(s), u = s === "percent", m = zr(e), f = (O) => r.category(O), h = o.curve ?? "monotone", p = Tr(e), b = Je(e.series[0]), g = Sn(e, t);
  return /* @__PURE__ */ i(nt, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Xa, { accessibilityLayer: !0, data: m, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Ut, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((O) => /* @__PURE__ */ v("linearGradient", { id: `fill-${O.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Kt(O), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Kt(O), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, O.key)) }),
    /* @__PURE__ */ i(
      xt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (C = (k = t.axes) == null ? void 0 : k.x) == null ? void 0 : C.hide,
        tickFormatter: f,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        type: "number",
        hide: (_ = (R = t.axes) == null ? void 0 : R.y) == null ? void 0 : _.hide,
        scale: Ie((N = t.axes) == null ? void 0 : N.y),
        domain: $e((z = t.axes) == null ? void 0 : z.y),
        tickFormatter: (O) => u ? vn(O) : r.value(O, b, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((L = t.tooltip) == null ? void 0 : L.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          lt,
          {
            labelFormatter: (O) => r.category(O),
            indicator: ((j = t.tooltip) == null ? void 0 : j.indicator) ?? "dot",
            valueFormatter: u ? (O) => vn(O) : Xt(r, void 0, p)
          }
        )
      }
    ),
    _e(t).show && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(ut, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Mt((D = t.legend) == null ? void 0 : D.position),
        layout: Lt(($ = t.legend) == null ? void 0 : $.position),
        align: Ot((V = t.legend) == null ? void 0 : V.position)
      }
    ),
    e.series.map((O) => {
      var Y, ae, F, G, te, U, Q, de;
      return /* @__PURE__ */ i(
        yr,
        {
          type: ((Y = O.meta) == null ? void 0 : Y.curve) ?? h,
          dataKey: O.key,
          name: O.label,
          stackId: l && !((ae = O.meta) != null && ae.companion) ? ((F = O.meta) == null ? void 0 : F.stackId) ?? "stack" : void 0,
          stroke: Kt(O),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (G = O.meta) != null && G.companion ? "5 4" : void 0,
          strokeOpacity: (te = O.meta) != null && te.companion ? 0.55 : void 0,
          fill: (U = O.meta) != null && U.companion ? "none" : `url(#fill-${O.key})`,
          fillOpacity: 1,
          dot: (Q = O.meta) != null && Q.companion ? !1 : ((de = O.meta) == null ? void 0 : de.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        O.key
      );
    }),
    (T = o.referenceLines) == null ? void 0 : T.map((O, Y) => /* @__PURE__ */ i(
      Gt,
      {
        ...O.axis === "y" ? { y: O.value } : { x: O.value },
        label: O.label,
        stroke: `var(--${O.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      Y
    ))
  ] }) });
}
function Gs({ data: e, options: t, format: n, editing: r }) {
  var g, x, w, k, C;
  const a = t.familyOptions ?? {}, o = e.series[0], c = e.categories.map((R, _) => {
    const N = n.category(R);
    return {
      key: `slice-${_}`,
      label: N,
      value: (o == null ? void 0 : o.data[_]) ?? 0,
      fill: `var(--${xe[_ % xe.length]})`
    };
  }), s = Ys(c, a.maxSlices), l = s.reduce((R, _) => R + _.value, 0), u = {};
  s.forEach((R, _) => {
    u[R.key] = {
      label: R.label,
      color: `var(--${xe[_ % xe.length]})`
    };
  });
  const m = `${a.innerRadiusPct ?? 0}%`, f = `${a.outerRadiusPct ?? 80}%`, h = (a.innerRadiusPct ?? 0) > 0, p = a.showLabels ?? "percent", b = p === "none" ? !1 : ({ payload: R, percent: _ }) => {
    const N = R;
    return p === "name" ? (N == null ? void 0 : N.label) ?? "" : p === "value" ? n.value(N == null ? void 0 : N.value, o == null ? void 0 : o.key, "label") : `${((_ !== void 0 ? _ : N && l > 0 ? N.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(nt, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(Li, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          lt,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((x = t.tooltip) == null ? void 0 : x.indicator) ?? "dot",
            valueFormatter: Xt(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ v(
      Oi,
      {
        data: s,
        dataKey: "value",
        nameKey: "label",
        innerRadius: m,
        outerRadius: f,
        paddingAngle: a.padAngle,
        cornerRadius: a.cornerRadius,
        label: b,
        labelLine: p !== "none" && !h,
        isAnimationActive: !1,
        children: [
          s.map((R) => /* @__PURE__ */ i(Za, { fill: R.fill }, R.key)),
          h && a.centerLabel && /* @__PURE__ */ i(
            Di,
            {
              position: "center",
              content: ({ viewBox: R }) => {
                var L, j;
                if (!R || !("cx" in R)) return null;
                const { cx: _, cy: N } = R, z = ((L = a.centerLabel) == null ? void 0 : L.value) === void 0 || a.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : a.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: _, y: N, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: _, y: N, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: z }),
                  ((j = a.centerLabel) == null ? void 0 : j.label) && /* @__PURE__ */ i("tspan", { x: _, y: N + 20, className: "cv:fill-muted-foreground cv:text-xs", children: a.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    _e(t).show && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(
          ut,
          {
            nameKey: "label",
            className: _e(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: Mt((w = t.legend) == null ? void 0 : w.position),
        layout: Lt((k = t.legend) == null ? void 0 : k.position),
        align: Ot((C = t.legend) == null ? void 0 : C.position)
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
      fill: `var(--${xe[c % xe.length]})`
    }
  ];
}
function Qs({ data: e, options: t, format: n, editing: r }) {
  var b, g, x, w, k, C, R, _, N, z, L, j, D, $, V, T, O, Y, ae, F, G, te, U, Q, de, J;
  const a = t.familyOptions ?? {}, o = e.raw.annotation, c = e.raw.rows, s = { x: a.x, y: a.y, z: a.size }, l = ((b = o == null ? void 0 : o.measures[a.x]) == null ? void 0 : b.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[a.x]) == null ? void 0 : g.shortTitle) ?? a.x, u = ((x = o == null ? void 0 : o.measures[a.y]) == null ? void 0 : x.shortTitle) ?? ((w = o == null ? void 0 : o.dimensions[a.y]) == null ? void 0 : w.shortTitle) ?? a.y, m = (C = (k = t.axes) == null ? void 0 : k.x) != null && C.labelHide ? void 0 : ((_ = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : _.label) ?? l, f = (z = (N = t.axes) == null ? void 0 : N.y) != null && z.labelHide ? void 0 : ((j = (L = t.axes) == null ? void 0 : L.y) == null ? void 0 : j.label) ?? u, h = Js(c, a), p = {};
  return h.forEach((q, A) => {
    p[q.key] = { label: q.label, color: `var(--${xe[A % xe.length]})` };
  }), /* @__PURE__ */ i(nt, { config: p, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(zi, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Ut, {}),
    /* @__PURE__ */ i(
      xt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: ($ = (D = t.axes) == null ? void 0 : D.x) == null ? void 0 : $.hide,
        scale: Ie((V = t.axes) == null ? void 0 : V.x),
        domain: $e((T = t.axes) == null ? void 0 : T.x),
        tickFormatter: (q) => n.value(q, a.x, "axis"),
        label: m ? { value: m, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (Y = (O = t.axes) == null ? void 0 : O.y) == null ? void 0 : Y.hide,
        scale: Ie((ae = t.axes) == null ? void 0 : ae.y),
        domain: $e((F = t.axes) == null ? void 0 : F.y),
        tickFormatter: (q) => n.value(q, a.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    a.size && /* @__PURE__ */ i(Ti, { type: "number", dataKey: "z", range: a.sizeRange ?? [40, 400], name: a.size }),
    ((G = t.tooltip) == null ? void 0 : G.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          lt,
          {
            indicator: ((te = t.tooltip) == null ? void 0 : te.indicator) ?? "dot",
            valueFormatter: (q, A) => {
              const X = A == null ? void 0 : A.dataKey, he = typeof X == "string" ? s[X] : void 0;
              return n.value(q, he, "tooltip");
            }
          }
        )
      }
    ),
    _e(t).show && h.length > 1 && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(ut, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Mt((U = t.legend) == null ? void 0 : U.position),
        layout: Lt((Q = t.legend) == null ? void 0 : Q.position),
        align: Ot((de = t.legend) == null ? void 0 : de.position)
      }
    ),
    h.map((q, A) => /* @__PURE__ */ i(
      Ei,
      {
        name: q.label,
        data: q.points,
        shape: a.shape ?? "circle",
        fill: `var(--color-${q.key})`,
        children: h.length === 1 && q.points.map((X, he) => /* @__PURE__ */ i(Za, { fill: `var(--${xe[A % xe.length]})` }, he))
      },
      q.key
    )),
    (J = a.referenceLines) == null ? void 0 : J.map((q, A) => /* @__PURE__ */ i(
      Gt,
      {
        ...q.axis === "y" ? { y: q.value } : { x: q.value },
        label: q.label,
        stroke: `var(--${q.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      A
    ))
  ] }) });
}
function Js(e, t) {
  const n = (a) => ({
    x: qn(a[t.x]),
    y: qn(a[t.y]),
    ...t.size ? { z: qn(a[t.size]) } : {}
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
function qn(e) {
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
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, o = (h) => r.value(h, a.measure, "kpi"), c = zo(t.raw.rows, a.measure) ?? 0, s = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[a.measure]) == null ? void 0 : f.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ i(ol, { value: c, label: s, fmt: o, fo: a }) : /* @__PURE__ */ i(tl, { ...e, value: c, label: s, fo: a, fmt: o });
}
function tl({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = n.goodDirection ?? ((u = n.comparison) == null ? void 0 : u.goodDirection) ?? "up", o = cl(e.raw.rows, t, n), c = n.sparkline ? e.series[0] : void 0, s = o ? o.diff : c ? rl(c) : 0, l = Zs(Xs(s, a));
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:justify-center cv:gap-1", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-baseline cv:gap-2", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-4xl cv:font-bold cv:tabular-nums cv:text-foreground", children: r(t) }),
      o && /* @__PURE__ */ i(al, { delta: o, goodDirection: a, fo: n, fmt: r })
    ] }),
    c && c.data.length > 0 && /* @__PURE__ */ i(nl, { series: c, categories: e.categories, colorClass: l })
  ] });
}
function nl({
  series: e,
  categories: t,
  colorClass: n
}) {
  const r = t.map((a, o) => ({ x: typeof a == "number" ? a : String(a), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:mt-2 cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(Ii, { width: "100%", height: "100%", children: /* @__PURE__ */ i(Xa, { data: r, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
    yr,
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
function rl(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function al({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = e.diff > 0, o = e.diff === 0, c = o ? !0 : a === (t === "up"), s = o ? Wi : a ? wn : kn, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ v(
    "span",
    {
      className: S(
        "cv:inline-flex cv:items-center cv:gap-0.5 cv:text-sm cv:font-medium",
        o ? "cv:text-muted-foreground" : c ? "cv:text-emerald-600" : "cv:text-destructive"
      ),
      children: [
        /* @__PURE__ */ i(s, { className: "cv:size-3.5" }),
        l
      ]
    }
  );
}
function ol({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var m, f;
  const a = ((m = r.gauge) == null ? void 0 : m.min) ?? 0, o = ((f = r.gauge) == null ? void 0 : f.max) ?? Math.max(e, 1), c = Math.max(a, Math.min(o, e)), s = il(e, r) ?? "chart-1", l = [{ name: t, value: c, fill: `var(--${s})` }], u = { value: { label: t, color: `var(--${s})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(nt, { config: u, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      Pi,
      {
        data: l,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Fi, { type: "number", domain: [a, o], tick: !1, axisLine: !1 }),
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
function il(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const o of [...n].sort((c, s) => c.at - s.at))
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
function cl(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = zo(e, r.value));
  else {
    const s = e[1];
    a = s ? To(s[n.measure]) : null;
  }
  if (a === null) return null;
  const o = t - a, c = a !== 0 ? o / a : null;
  return { current: t, baseline: a, diff: o, pct: c };
}
function To(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Eo = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
Eo.displayName = "Table";
const Po = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
Po.displayName = "TableHeader";
const Fo = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
Fo.displayName = "TableBody";
const an = y.forwardRef(
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
const ar = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
ar.displayName = "TableHead";
const on = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
on.displayName = "TableCell";
const sl = y.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
sl.displayName = "TableCaption";
const $o = Nr(
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
), H = y.forwardRef(
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
H.displayName = "Button";
function ll({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, o = e.raw.annotation, c = y.useMemo(
    () => ul(a, o, r, n),
    [a, o, r, n]
  ), [s, l] = y.useState(null), [u, m] = y.useState(0), f = r.sortable !== !1, h = r.pageSize ?? 25, p = y.useMemo(() => {
    if (!s) return a;
    const C = s.dir === "asc" ? 1 : -1;
    return [...a].sort((R, _) => hl(R[s.member], _[s.member]) * C);
  }, [a, s]), b = Math.max(1, Math.ceil(p.length / h)), g = Math.min(u, b - 1), x = p.slice(g * h, g * h + h), w = (C) => {
    f && (l(
      (R) => (R == null ? void 0 : R.member) === C ? { member: C, dir: R.dir === "asc" ? "desc" : "asc" } : { member: C, dir: "desc" }
    ), m(0));
  }, k = r.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", r.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(Eo, { children: [
      /* @__PURE__ */ i(Po, { className: S(r.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(an, { children: [
        r.showRowNumbers && /* @__PURE__ */ i(ar, { className: "cv:w-10 cv:text-right", children: "#" }),
        c.map((C) => /* @__PURE__ */ i(
          ar,
          {
            className: ha(C.align),
            style: C.width ? { width: C.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              H,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => w(C.member),
                children: [
                  C.label,
                  /* @__PURE__ */ i(fl, { active: (s == null ? void 0 : s.member) === C.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : C.label
          },
          C.member
        ))
      ] }) }),
      /* @__PURE__ */ v(Fo, { children: [
        x.map((C, R) => /* @__PURE__ */ v(an, { children: [
          r.showRowNumbers && /* @__PURE__ */ i(on, { className: S("cv:text-right cv:text-muted-foreground", k && "cv:py-1"), children: g * h + R + 1 }),
          c.map((_) => {
            const N = pl(_.member, C[_.member], r.conditionalFormat);
            return /* @__PURE__ */ i(
              on,
              {
                className: S(ha(_.align), k && "cv:py-1"),
                style: N ? { color: N } : void 0,
                children: _.render(C[_.member])
              },
              _.member
            );
          })
        ] }, R)),
        x.length === 0 && /* @__PURE__ */ i(an, { children: /* @__PURE__ */ i(
          on,
          {
            colSpan: c.length + (r.showRowNumbers ? 1 : 0),
            className: "cv:h-24 cv:text-center cv:text-muted-foreground",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    p.length > h && /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2 cv:px-2 cv:py-2 cv:text-sm cv:text-muted-foreground", children: [
      /* @__PURE__ */ v("span", { children: [
        g * h + 1,
        "–",
        Math.min((g + 1) * h, p.length),
        " of",
        " ",
        p.length
      ] }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:gap-2", children: [
        /* @__PURE__ */ i(
          H,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((C) => Math.max(0, C - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          H,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((C) => Math.min(b - 1, C + 1)),
            disabled: g >= b - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function ul(e, t, n, r) {
  var c;
  const a = e.length > 0 ? Object.keys(e[0]) : dl(t);
  return ((c = n.columns) != null && c.length ? n.columns : a.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const l = s.member, u = t ? vl(t, l) : void 0, m = t ? l in t.measures : !1, f = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = s.align ?? (m ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: s.width,
      render: (p) => ml(p, m, l, r)
    };
  });
}
function ml(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function dl(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function vl(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ha(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function fl({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(wn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(kn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Ui, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function hl(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function pl(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && gl(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function gl(e, t, n) {
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
function bl({ data: e, options: t, format: n, editing: r }) {
  var g, x, w, k, C, R, _, N, z, L, j, D, $, V, T, O, Y, ae, F, G, te, U, Q, de, J, q;
  const a = t.familyOptions ?? {}, o = a.series ?? [], c = xl(e, o), s = (A) => n.category(A), l = o.some((A) => A.axis === "right"), u = (g = o.find((A) => A.axis !== "right")) == null ? void 0 : g.member, m = (x = o.find((A) => A.axis === "right")) == null ? void 0 : x.member, f = Sn(e, t), h = (k = (w = t.axes) == null ? void 0 : w.y) != null && k.labelHide ? void 0 : ((R = (C = t.axes) == null ? void 0 : C.y) == null ? void 0 : R.label) ?? (u ? cn(e, u) : void 0), p = (N = (_ = t.axes) == null ? void 0 : _.y2) != null && N.labelHide ? void 0 : ((L = (z = t.axes) == null ? void 0 : z.y2) == null ? void 0 : L.label) ?? (m ? cn(e, m) : void 0), b = {};
  return o.forEach((A, X) => {
    const he = A.colorToken ?? xe[X % xe.length];
    b[A.member] = {
      label: A.label ?? cn(e, A.member),
      color: `var(--${he})`
    };
  }), /* @__PURE__ */ i(nt, { config: b, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(ji, { accessibilityLayer: !0, data: c, children: [
    /* @__PURE__ */ i(Ut, { vertical: !1 }),
    /* @__PURE__ */ i(
      xt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (D = (j = t.axes) == null ? void 0 : j.x) == null ? void 0 : D.hide,
        tickFormatter: s,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        yAxisId: "left",
        type: "number",
        hide: (V = ($ = t.axes) == null ? void 0 : $.y) == null ? void 0 : V.hide,
        scale: Ie((T = t.axes) == null ? void 0 : T.y),
        domain: $e((O = t.axes) == null ? void 0 : O.y),
        tickFormatter: (A) => n.value(A, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      qe,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (ae = (Y = t.axes) == null ? void 0 : Y.y2) == null ? void 0 : ae.hide,
        scale: Ie((F = t.axes) == null ? void 0 : F.y2),
        domain: $e((G = t.axes) == null ? void 0 : G.y2),
        tickFormatter: (A) => n.value(A, m, "axis"),
        label: p ? { value: p, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((te = t.tooltip) == null ? void 0 : te.show) !== !1 && /* @__PURE__ */ i(
      Dt,
      {
        content: /* @__PURE__ */ i(
          lt,
          {
            labelFormatter: (A) => n.category(A),
            indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
            valueFormatter: Xt(n)
          }
        )
      }
    ),
    _e(t).show && /* @__PURE__ */ i(
      zt,
      {
        content: /* @__PURE__ */ i(ut, { className: _e(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: Mt((Q = t.legend) == null ? void 0 : Q.position),
        layout: Lt((de = t.legend) == null ? void 0 : de.position),
        align: Ot((J = t.legend) == null ? void 0 : J.position)
      }
    ),
    o.map((A) => yl(A, e, a)),
    (q = a.referenceLines) == null ? void 0 : q.map((A, X) => /* @__PURE__ */ i(
      Gt,
      {
        yAxisId: "left",
        ...A.axis === "y" ? { y: A.value } : { x: A.value },
        label: A.label,
        stroke: `var(--${A.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      X
    ))
  ] }) });
}
function yl(e, t, n) {
  const r = e.axis === "right" ? "right" : "left", a = `var(${_r(e.member)})`, o = e.label ?? cn(t, e.member), c = e.curve ?? n.curve ?? "monotone", s = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    Ya,
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
    yr,
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
    Ja,
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
function xl(e, t) {
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
    for (const f of t) m[f.member] = wl(l[f.member]);
    return m;
  });
}
function cn(e, t) {
  var n, r, a, o;
  return ((r = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : r.shortTitle) ?? ((o = (a = e.raw.annotation) == null ? void 0 : a.measures[t]) == null ? void 0 : o.title) ?? t;
}
function wl(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Er = eo(null);
Er.displayName = "CubeVizContext";
function We() {
  const e = xr(Er);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function kl({ data: e, options: t }) {
  const n = t.familyOptions ?? {}, { maps: r } = We(), a = n.mode ?? "points", o = e.raw.rows, c = y.useMemo(() => !n.lat || !n.lng ? [] : Cl(o, n), [o, n]);
  if (!(r != null && r.apiKey))
    return /* @__PURE__ */ i(Kn, { children: "Add a Google Maps API key to render the map" });
  if (!n.lat || !n.lng)
    return /* @__PURE__ */ i(Kn, { children: "Pick a latitude and longitude field" });
  if (c.length === 0)
    return /* @__PURE__ */ i(Kn, { children: "No map data" });
  const s = Dl(c), l = s ? zl(s) : { lat: 0, lng: 0 }, u = Sl(c);
  return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:min-h-[200px] cv:overflow-hidden cv:rounded-md", children: /* @__PURE__ */ i(Nc, { apiKey: r.apiKey, libraries: ["visualization", "marker"], children: /* @__PURE__ */ v(
    Sc,
    {
      mapId: r.mapId,
      defaultCenter: l,
      defaultZoom: n.zoom ?? 4,
      gestureHandling: "greedy",
      disableDefaultUI: !0,
      zoomControl: !0,
      style: { width: "100%", height: "100%" },
      children: [
        /* @__PURE__ */ i(_l, { bounds: s }),
        a === "points" && /* @__PURE__ */ i(Rl, { points: c, colors: u, mapId: r.mapId }),
        a === "paths" && /* @__PURE__ */ i(Ll, { points: c, colors: u, fo: n }),
        a === "heatmap" && /* @__PURE__ */ i(Ol, { points: c, fo: n })
      ]
    }
  ) }) });
}
function Cl(e, t) {
  const n = [];
  return e.forEach((r, a) => {
    const o = Bn(r[t.lat]), c = Bn(r[t.lng]);
    o === null || c === null || o < -90 || o > 90 || c < -180 || c > 180 || n.push({
      lat: o,
      lng: c,
      weight: t.weight ? Bn(r[t.weight]) ?? 1 : 1,
      series: t.series ? String(r[t.series] ?? "—") : "",
      order: t.time ? r[t.time] : void 0,
      index: a
    });
  }), n;
}
const Ct = ["#008079", "#d9a300", "#2f7de1", "#7c3aed", "#e2533f"], Nl = [
  "rgba(0,128,121,0)",
  "rgba(0,128,121,0.6)",
  "rgba(47,125,225,0.7)",
  "rgba(217,163,0,0.85)",
  "rgba(226,83,63,1)"
];
function Sl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.has(n.series) || t.set(n.series, Ct[t.size % Ct.length]);
  return t;
}
function _l({ bounds: e }) {
  const t = Cn();
  return y.useEffect(() => {
    if (!t || !e) return;
    const n = new google.maps.LatLngBounds(
      { lat: e.minLat, lng: e.minLng },
      { lat: e.maxLat, lng: e.maxLng }
    );
    e.minLat === e.maxLat && e.minLng === e.maxLng ? t.setCenter({ lat: e.minLat, lng: e.minLng }) : t.fitBounds(n, 24);
  }, [t, e]), null;
}
function Rl({
  points: e,
  colors: t,
  mapId: n
}) {
  return n ? /* @__PURE__ */ i(re, { children: e.map((r) => /* @__PURE__ */ i(_c, { position: { lat: r.lat, lng: r.lng }, children: /* @__PURE__ */ i(Al, { color: t.get(r.series) ?? Ct[0] }) }, r.index)) }) : /* @__PURE__ */ i(Ml, { points: e, colors: t });
}
function Al({ color: e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      style: {
        width: 12,
        height: 12,
        borderRadius: "9999px",
        backgroundColor: e,
        border: "2px solid white",
        boxShadow: "0 1px 2px rgba(0,0,0,0.4)"
      }
    }
  );
}
function Ml({
  points: e,
  colors: t
}) {
  const n = Cn();
  return y.useEffect(() => {
    if (!n) return;
    const r = e.map(
      (a) => new google.maps.Circle({
        map: n,
        center: { lat: a.lat, lng: a.lng },
        radius: 600,
        strokeColor: t.get(a.series) ?? Ct[0],
        strokeWeight: 1,
        fillColor: t.get(a.series) ?? Ct[0],
        fillOpacity: 0.7
      })
    );
    return () => r.forEach((a) => a.setMap(null));
  }, [n, e, t]), null;
}
function Ll({
  points: e,
  colors: t,
  fo: n
}) {
  const r = Cn();
  return y.useEffect(() => {
    if (!r) return;
    const a = Tl(e), o = [];
    for (const [c, s] of a) {
      const l = [...s].sort(El(!!n.time)), u = new google.maps.Polyline({
        map: r,
        path: l.map((m) => ({ lat: m.lat, lng: m.lng })),
        strokeColor: t.get(c) ?? Ct[0],
        strokeWeight: 3,
        strokeOpacity: 0.9
      });
      o.push(u);
    }
    return () => o.forEach((c) => c.setMap(null));
  }, [r, e, t, n.time]), null;
}
function Ol({ points: e, fo: t }) {
  const n = Cn(), r = Rc("visualization");
  return y.useEffect(() => {
    if (!n || !r) return;
    const a = r.HeatmapLayer, o = new a({
      map: n,
      radius: t.heatmapRadius ?? 20,
      gradient: Nl,
      data: e.map((c) => ({
        location: new google.maps.LatLng(c.lat, c.lng),
        weight: c.weight
      }))
    });
    return () => o.setMap(null);
  }, [n, r, e, t.heatmapRadius]), null;
}
function Dl(e) {
  if (e.length === 0) return null;
  let t = 1 / 0, n = -1 / 0, r = 1 / 0, a = -1 / 0;
  for (const o of e)
    o.lat < t && (t = o.lat), o.lat > n && (n = o.lat), o.lng < r && (r = o.lng), o.lng > a && (a = o.lng);
  return { minLat: t, maxLat: n, minLng: r, maxLng: a };
}
function zl(e) {
  return { lat: (e.minLat + e.maxLat) / 2, lng: (e.minLng + e.maxLng) / 2 };
}
function Tl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.series) ?? [];
    r.push(n), t.set(n.series, r);
  }
  return t;
}
function El(e) {
  return (t, n) => {
    if (e) {
      const r = pa(t.order), a = pa(n.order);
      if (r !== a) return r < a ? -1 : 1;
    }
    return t.index - n.index;
  };
}
function pa(e) {
  if (e == null) return Number.POSITIVE_INFINITY;
  if (typeof e == "number") return e;
  const t = Date.parse(e);
  return Number.isNaN(t) ? e : t;
}
function Kn({ children: e }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:flex-col cv:items-center cv:justify-center cv:gap-2 cv:rounded-md cv:border cv:border-dashed cv:border-border cv:bg-muted/30 cv:p-4 cv:text-center", children: [
    /* @__PURE__ */ i(to, { className: "cv:size-6 cv:text-muted-foreground/60" }),
    /* @__PURE__ */ i("p", { className: "cv:text-sm cv:text-muted-foreground", children: e })
  ] });
}
function Bn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Ye = "cv:w-40", Pl = "cv:w-56", Io = "a date or category", Hn = [
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
], Fl = [
  { id: "x", label: "Category", hint: Io, cardinality: "one", kinds: ["time", "category"] },
  { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
], $l = [
  { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
  { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
], Il = [
  { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
  { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
], jl = [
  { id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }
], Vl = [
  {
    id: "columns",
    label: "Columns",
    hint: "any field, in order",
    cardinality: "many",
    kinds: ["number", "category", "time"]
  }
], ql = [
  { id: "lat", label: "Latitude", hint: "a number (-90…90)", cardinality: "one", kinds: ["number"] },
  { id: "lng", label: "Longitude", hint: "a number (-180…180)", cardinality: "one", kinds: ["number"] },
  { id: "weight", label: "Weight", hint: "heatmap intensity", cardinality: "one", kinds: ["number"], optional: !0 },
  { id: "series", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 },
  { id: "time", label: "Order by time", hint: "orders path vertices", cardinality: "one", kinds: ["time"], optional: !0 }
], jo = ["bar", "line", "area", "pie", "scatter", "kpi", "table", "combo", "map"], Ve = (e) => jo.indexOf(e), Pr = {
  bar: {
    family: "bar",
    label: "Bar",
    icon: no,
    order: Ve("bar"),
    component: Hs,
    optionsSchema: je("bar"),
    defaults: Oe.bar,
    wells: Hn,
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
    sidebarWidthClass: Ye
  },
  line: {
    family: "line",
    label: "Line",
    icon: ec,
    order: Ve("line"),
    component: Ws,
    optionsSchema: je("line"),
    defaults: Oe.line,
    wells: Hn,
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
    sidebarWidthClass: Ye
  },
  area: {
    family: "area",
    label: "Area",
    icon: Zi,
    order: Ve("area"),
    component: Us,
    optionsSchema: je("area"),
    defaults: Oe.area,
    wells: Hn,
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
    sidebarWidthClass: Ye
  },
  pie: {
    family: "pie",
    label: "Pie",
    icon: Xi,
    order: Ve("pie"),
    component: Gs,
    optionsSchema: je("pie"),
    defaults: Oe.pie,
    wells: $l,
    zones: { left: ["size"], bottom: ["slices"] },
    dualAxisY: !1,
    supportsMapping: !0,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !0,
    hasLegend: !0,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: Ye
  },
  scatter: {
    family: "scatter",
    label: "Scatter",
    icon: Ji,
    order: Ve("scatter"),
    component: Qs,
    optionsSchema: je("scatter"),
    defaults: Oe.scatter,
    wells: Il,
    zones: { left: ["sy"], bottom: ["sx", "size", "color"] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !0,
    hasCustomizeOptions: !1,
    supportsComparePrevious: !1,
    sidebarWidthClass: Ye
  },
  kpi: {
    family: "kpi",
    label: "KPI",
    icon: Qi,
    order: Ve("kpi"),
    component: el,
    optionsSchema: je("kpi"),
    defaults: Oe.kpi,
    wells: jl,
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
    sidebarWidthClass: Pl
  },
  table: {
    family: "table",
    label: "Table",
    icon: Yi,
    order: Ve("table"),
    component: ll,
    optionsSchema: je("table"),
    defaults: Oe.table,
    wells: Vl,
    zones: { left: ["columns"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: Ye
  },
  combo: {
    family: "combo",
    label: "Combo",
    icon: Gi,
    order: Ve("combo"),
    component: bl,
    optionsSchema: je("combo"),
    defaults: Oe.combo,
    wells: Fl,
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
    sidebarWidthClass: Ye
  },
  map: {
    family: "map",
    label: "Map",
    icon: to,
    order: Ve("map"),
    component: kl,
    optionsSchema: je("map"),
    defaults: Oe.map,
    wells: ql,
    // A map isn't cartesian — all its wells live on the left strip.
    zones: { left: ["lat", "lng", "weight", "series", "time"], bottom: [] },
    dualAxisY: !1,
    supportsMapping: !1,
    supportsCartesianAxes: !1,
    enforcesAxisUnit: !1,
    measureOnly: !1,
    hasLegend: !1,
    hasCustomizeOptions: !0,
    supportsComparePrevious: !1,
    sidebarWidthClass: Ye
  }
}, Kl = [...jo];
function mt(e) {
  return Pr[e];
}
const Vo = Object.fromEntries(
  Object.entries(Pr).map(([e, t]) => [e, t.component])
);
function Bl({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: o,
  editing: c
}) {
  const s = js(t);
  if (a != null && a.loading)
    return /* @__PURE__ */ i(ms, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (a != null && a.error)
    return /* @__PURE__ */ v(Rr, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(ro, {}),
      /* @__PURE__ */ i(Ar, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(Mr, { children: a.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const l = n && Object.keys(n).length > 0 ? n : qs(e), u = r ?? Mo(e.raw.annotation, s, Lr), m = (o == null ? void 0 : o[s.family]) ?? Vo[s.family];
  return /* @__PURE__ */ i(
    m,
    {
      data: e,
      options: s,
      config: l,
      format: u,
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
function or(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : xe, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, m) => r[u] ?? m, o = /* @__PURE__ */ new Set();
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
function ga(e, t) {
  const n = or(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Hl(e) {
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
  for (const n of Object.keys(e)) t[n] = Hl(e[n]);
  return t;
}
function Wl(e) {
  return {
    measures: rn(e.measures ?? {}),
    dimensions: rn(e.dimensions ?? {}),
    segments: rn(e.segments ?? {}),
    timeDimensions: rn(e.timeDimensions ?? {})
  };
}
function bt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function _n(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let c = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!c || c.kind === void 0 || c.kind === "auto") && (c = { ...c, kind: "currency" }), c && (a.format = c), t != null && t.axis && (a.axis = t.axis), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Ul(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Gl(e, t) {
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
function Yl(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, o] of t) {
      const c = Rn(r[a]);
      c !== null && (r[a] = o.to(c));
    }
    return r;
  });
}
function Ql(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((o) => o === null ? null : a.to(o)));
    }
}
function Jl(e, t, n, r) {
  const a = Wl(e.annotation()), o = Gl(a, r), c = Yl(e.tablePivot(), o), s = t.mapping;
  if (!s) {
    const m = n.measures ?? [];
    if (mt(t.family).measureOnly && m.length > 0) {
      const f = c[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: m.map((b) => Rn(f[b])),
          meta: { ..._n(bt(a, m[0]), void 0, t.format), measure: m[0] }
        }
      ];
      return ga(h, t.colors), { categories: m.map(
        (b) => {
          var g, x;
          return ((g = bt(a, b)) == null ? void 0 : g.shortTitle) ?? ((x = bt(a, b)) == null ? void 0 : x.title) ?? b;
        }
      ), series: h, raw: { rows: c, annotation: a, query: n }, empty: c.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: c, annotation: a, query: n },
      empty: c.length === 0
    };
  }
  const l = s.series.mode === "measures" ? Zl(e, s.series, t, a) : eu(e, s.category.member, s.series, t, a), u = Xl(e, s);
  return Ql(l, o), ga(l, t.colors), {
    categories: u,
    series: l,
    raw: { rows: c, annotation: a, query: n },
    empty: c.length === 0
  };
}
function Xl(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Zl(e, t, n, r) {
  const { members: a, meta: o } = t, c = e.chartPivot();
  return a.map((s) => {
    const l = bt(r, s), u = o == null ? void 0 : o[s], m = c.map((f) => Rn(f[s]));
    return {
      key: s,
      label: Ul(l, u, s),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ..._n(l, u, n.format), measure: s }
    };
  });
}
function eu(e, t, n, r, a) {
  const { value: o, values: c, pivot: s } = n, l = c && c.length > 0 ? c : [o], u = new Set(l), m = l.length > 1, f = { x: [t], y: [s, "measures"] }, p = e.seriesNames(f).filter((w) => {
    const k = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : void 0;
    return k === void 0 || u.has(k);
  }), b = e.chartPivot(f), g = bt(a, o), x = p.map((w) => {
    var D, $;
    const k = (D = w.yValues) == null ? void 0 : D[0], C = w.yValues && w.yValues.length >= 2 ? w.yValues[w.yValues.length - 1] : o, R = bt(a, C), _ = (R == null ? void 0 : R.shortTitle) ?? (R == null ? void 0 : R.title) ?? C, N = k ?? w.shortTitle ?? w.title ?? w.key, z = m ? `${_} · ${N}` : N, L = b.map((V) => Rn(V[w.key])), j = ($ = n.meta) == null ? void 0 : $[C];
    return {
      key: w.key,
      label: z,
      data: L,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ..._n(R ?? g, j, r.format),
        measure: C
      }
    };
  });
  return tu(x, g, r.format);
}
function tu(e, t, n) {
  var m, f, h;
  if (e.length <= Wn) return e;
  const r = (p) => p.data.reduce((b, g) => b + (g ?? 0), 0), a = [...e].sort((p, b) => r(b) - r(p)), o = a.slice(0, Wn - 1), c = a.slice(Wn - 1), s = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, l = Array.from({ length: s }, (p, b) => {
    let g = 0, x = !1;
    for (const w of c) {
      const k = w.data[b];
      k !== null && (g += k, x = !0);
    }
    return x ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${c.length})`,
    data: l,
    meta: { ..._n(t, void 0, n), ...(h = (f = o[0]) == null ? void 0 : f.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function Rn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Nt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const nu = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function ru(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function Wt(e, t, n) {
  var r;
  if (De(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function au(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const c = Wt(o, t, n);
    if (!Nt(c))
      if (Array.isArray(c))
        for (const s of c)
          Nt(s) || a.push(s);
      else
        a.push(c);
  }
  return a.length === 0 ? r ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: a };
}
function ou(e, t, n) {
  if ("and" in e) {
    const r = ir(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = ir(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return au(e, t, n);
}
function ir(e, t, n) {
  const r = [];
  for (const a of e) {
    const o = ou(a, t, n);
    o !== void 0 && r.push(o);
  }
  return r;
}
function iu(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = Wt(e.granularity, t, n);
    Nt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = Wt(e.dateRange, t, n);
    Nt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function cu(e, t, n) {
  const r = nu(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((o) => iu(o, r, t))), e.filters !== void 0) {
    const o = ir(e.filters, r, t);
    o.length > 0 && (a.filters = o);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Wt(e.limit, r, t);
    Nt(o) || (a.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Wt(e.offset, r, t);
    Nt(o) || (a.offset = o);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function su(e, t) {
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
class lu extends Error {
}
const uu = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new lu(`"${e}" cannot be parsed into a number`);
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
function ba(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class mu extends Error {
}
class ya extends Error {
}
class du extends Error {
}
class Un extends Error {
}
class vu extends Error {
}
class fu {
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
      throw new ya(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return ba(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new du(`Cannot convert incompatible measures of ${a.measure} and ${o.measure}`);
    let c = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (c = this.cls.sub(c, this.convertFraction(o.unit.anchor_shift))), o.system != a.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Un(`Unable to convert units. Anchors are missing for "${o.measure}" and "${a.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Un(`Unable to find anchor for "${o.measure}" to "${a.measure}". Please make sure it is defined.`);
      const m = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, f = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof m == "function")
        c = m(c, this.cls);
      else if (typeof f == "number")
        c = this.cls.mul(c, f);
      else if (ba(f))
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
      throw new ya(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let c = [], s = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (c = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (r = t.cutOffNumber) !== null && r !== void 0 ? r : s, l = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const f = this.describe(m);
      if (c.indexOf(m) === -1 && f.system === l) {
        const p = this.to(m);
        if (o ? this.cls.gt(p, s) : this.cls.lt(p, s))
          continue;
        (u === null || (o ? this.cls.lte(p, s) && this.cls.gt(p, u.val) : this.cls.gte(p, s) && this.cls.lt(p, u.val))) && (u = {
          val: p,
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
        throw new vu(`Meausure "${t}" not found.`);
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
    throw new mu(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function hu(e) {
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
function pu(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = hu(e);
  return (r) => new fu({
    measures: e,
    unitCache: n,
    cls: uu
  }, r);
}
const gu = {
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
}, bu = {
  systems: {
    metric: gu
  }
}, yu = {
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
}, xu = {
  systems: {
    SI: yu
  }
}, wu = {
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
}, ku = {
  systems: {
    SI: wu
  }
}, Cu = {
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
}, Nu = {
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
}, Su = {
  systems: {
    metric: Cu,
    imperial: Nu
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
}, _u = {
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
}, Ru = {
  systems: {
    SI: _u
  }
}, Au = {
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
}, Mu = {
  systems: {
    SI: Au
  }
}, Lu = {
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
}, Ou = {
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
}, Du = {
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
}, zu = {
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
}, Tu = {
  systems: {
    bit: Lu,
    byte: Ou,
    IECBit: Du,
    IECByte: zu
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
}, Eu = {
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
}, Pu = {
  systems: {
    metric: Eu
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
}, $u = {
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
}, Iu = {
  systems: {
    SI: Fu,
    nutrition: $u
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
}, ju = {
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
}, Vu = {
  systems: {
    SI: ju
  }
}, qu = {
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
}, Ku = {
  systems: {
    SI: qu
  }
}, Bu = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Hu = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Wu = {
  systems: {
    metric: Bu,
    imperial: Hu
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
}, Uu = {
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
}, Gu = {
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
}, Yu = {
  systems: {
    metric: Uu,
    imperial: Gu
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
}, Qu = {
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
}, Ju = {
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
}, Zu = {
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
}, em = {
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
}, tm = {
  systems: {
    metric: Zu,
    imperial: em
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
}, nm = {
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
}, rm = {
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
}, am = {
  systems: {
    metric: nm,
    imperial: rm
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
}, om = {
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
}, im = {
  systems: {
    SI: om
  }
}, cm = {
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
}, sm = {
  systems: {
    unit: cm
  }
}, lm = {
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
}, um = {
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
}, mm = {
  systems: {
    metric: lm,
    imperial: um
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
}, dm = {
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
}, vm = {
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
}, fm = {
  systems: {
    metric: dm,
    imperial: vm
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
}, hm = {
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
}, pm = {
  systems: {
    SI: hm
  }
}, gm = {
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
}, bm = {
  systems: {
    SI: gm
  }
}, ym = {
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
}, xm = {
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
}, wm = {
  systems: {
    metric: ym,
    imperial: xm
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
}, km = {
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
}, Cm = {
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
}, Nm = {
  systems: {
    metric: km,
    imperial: Cm
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
}, Sm = {
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
}, _m = {
  systems: {
    SI: Sm
  }
}, Rm = {
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
}, Am = {
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
}, Mm = {
  systems: {
    metric: Rm,
    imperial: Am
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
}, Lm = {
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
}, Om = {
  systems: {
    SI: Lm
  }
}, Dm = {
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
}, zm = {
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
}, Tm = {
  systems: {
    metric: Dm,
    imperial: zm
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
}, Em = {
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
}, Pm = {
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
    metric: Em,
    imperial: Pm
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
}, $m = {
  acceleration: bu,
  angle: xu,
  apparentPower: ku,
  area: Su,
  charge: Ru,
  current: Mu,
  digital: Tu,
  each: Pu,
  energy: Iu,
  force: Vu,
  frequency: Ku,
  illuminance: Wu,
  length: Yu,
  mass: Xu,
  massFlowRate: tm,
  pace: am,
  partsPer: im,
  pieces: sm,
  power: mm,
  pressure: fm,
  reactiveEnergy: pm,
  reactivePower: bm,
  speed: wm,
  torque: Mm,
  temperature: Nm,
  time: _m,
  voltage: Om,
  volume: Tm,
  volumeFlowRate: Fm
}, Im = pu($m), jm = {
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
function Vm(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Im(t).from(e.from).to(e.to)
  };
}
const cr = {
  ...Object.fromEntries(
    Object.entries(jm).map(([e, t]) => [e, Vm(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function An(e) {
  return e ? { ...cr, ...e } : cr;
}
function qm(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Km(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Bm(e) {
  return e != null && e.quantity ? Km(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Hm = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Wm(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function xa(e, t) {
  const n = e * (Hm[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
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
  return s === -1 ? "0s" : r + c.slice(s, s + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function Gn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [o, c] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= o) return Wm((e / o).toFixed(n.decimals ?? 1)) + c;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function Um(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function wa(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function qo(e = cr) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return Lr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return xa(n, r == null ? void 0 : r.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return wa(Gn(n, t), o.prefix, o.suffix);
    }
    if (a === "time") return xa(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return wa(Gn(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const c = r == null ? void 0 : r.unit, s = c ? Um(a, c) : {}, l = (o == null ? void 0 : o.prefix) ?? s.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : s.suffix ?? "";
    return `${l}${Gn(n, t)}${u}`;
  };
}
function Gm(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function yp({
  cube: e,
  theme: t,
  locale: n,
  maps: r,
  registry: a,
  children: o
}) {
  const c = ne(
    () => Gm(e) ? ss(e) : e,
    [e]
  ), s = ne(
    () => {
      var h;
      return {
        chartRamp: (h = t == null ? void 0 : t.chartRamp) != null && h.length ? t.chartRamp : xe,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), l = ne(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), u = ne(() => a ?? {}, [a]), m = ne(
    () => r != null && r.apiKey || r != null && r.mapId ? { apiKey: r.apiKey, mapId: r.mapId } : void 0,
    [r == null ? void 0 : r.apiKey, r == null ? void 0 : r.mapId]
  ), f = ne(
    () => ({
      cubeClient: c,
      registry: u,
      locale: l,
      theme: s,
      maps: m
    }),
    [c, u, l, s, m]
  );
  return /* @__PURE__ */ i(Er.Provider, { value: f, children: /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "cv:contents",
        s.mode === "dark" && "dark",
        s.mode === "light" && "cube-viz-light"
      ),
      children: o
    }
  ) });
}
function Ym(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? Vo[t];
}
const Qm = 5e3;
function Jm(e, t) {
  const { cubeClient: n } = We(), r = (t == null ? void 0 : t.skip) ?? !1, a = ne(
    () => e.limit === void 0 ? { ...e, limit: Qm } : e,
    [e]
  ), o = ne(() => JSON.stringify(a), [a]), [c, s] = wt({ isLoading: !r }), [l, u] = wt(0), m = Xe(() => u((f) => f + 1), []);
  return Yt(() => {
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
  }, [n, o, r, l]), { ...c, refetch: m };
}
const Mn = eo(null);
Mn.displayName = "DashboardContext";
function Fr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = pt(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: su(r, t), key: r });
  const o = a.current.store, c = Xm(o, r);
  return Vi(Mn.Provider, { value: c }, n);
}
function Xm(e, t) {
  const n = qi(
    e.subscribe,
    e.getAll,
    e.getAll
  ), r = Xe(
    (c, s) => e.set(c, s),
    [e]
  ), a = Xe(
    (c) => cu(c, e.getAll(), t),
    [e, t]
  ), o = Xe(
    (c) => ru(c, e.getAll(), t),
    [e, t]
  );
  return ne(
    () => ({ vars: n, setVar: r, resolveQuery: a, resolveValue: o, decls: t }),
    [n, r, a, o, t]
  );
}
function Ko() {
  const e = xr(Mn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function $r() {
  return xr(Mn);
}
function Yn(e, t, n) {
  var p;
  const r = $r(), { locale: a } = We(), o = ne(
    () => r && !(n != null && n.skipResolve) ? r.resolveQuery(e) : e,
    [r, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: c, isLoading: s, error: l, refetch: u } = Jm(o, { skip: n == null ? void 0 : n.skip }), m = ((p = t.format) == null ? void 0 : p.unitSystem) ?? (a == null ? void 0 : a.unitSystem), f = ne(() => An(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: ne(() => {
    if (c)
      return Jl(c, t, o, { unitSystem: m, conversions: f });
  }, [c, t, o, m, f]), isLoading: s, error: l, refetch: u, resolvedQuery: o };
}
function rt() {
  const { cubeClient: e } = We(), [t, n] = wt({ isLoading: !0 });
  return Yt(() => {
    let r = !0;
    return n({ isLoading: !0 }), ls(e).then((a) => {
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
function xp() {
  const { locale: e } = We(), { formatValue: t, units: n } = e;
  return ne(
    () => t ?? qo(An(n)),
    [t, n]
  );
}
function Bo() {
  const [e, t] = wt(0), n = pt(null), r = pt(null), a = pt(null), o = pt(0), c = Xe((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), s = Xe(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), l = Xe(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== o.current && (o.current = m, t(m));
      const f = new ResizeObserver((h) => {
        var p, b;
        for (const g of h) {
          const x = ((b = (p = g.contentBoxSize) == null ? void 0 : p[0]) == null ? void 0 : b.inlineSize) ?? g.contentRect.width;
          c(x);
        }
      });
      f.observe(u), r.current = f;
    },
    [c, s]
  );
  return Yt(() => s, [s]), [l, e];
}
const Zm = "day";
function ed(e, t) {
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
        granularity: r.granularity ?? Zm,
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
const ie = (e) => pe(e, "yyyy-MM-dd");
function td(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = un(e[0]), o = un(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(o.getTime())) return;
    const c = Mc(o, a) + 1;
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
      return [ie(En(Pn(t, 2 * a))), ie(Le(En(Pn(t, a)), 1))];
    if (o.startsWith("quarter"))
      return [ie(Fn($n(t, 2 * a))), ie(Le(Fn($n(t, a)), 1))];
    if (o.startsWith("year"))
      return [ie(In(jn(t, 2 * a))), ie(Le(In(jn(t, a)), 1))];
  }
  if (n === "this week") {
    const a = Lc(t, 1);
    return [ie(Oc(a)), ie(Dc(a))];
  }
  if (n === "this month") {
    const a = Pn(t, 1);
    return [ie(En(a)), ie(zc(a))];
  }
  if (n === "this quarter") {
    const a = $n(t, 1);
    return [ie(Fn(a)), ie(Tc(a))];
  }
  if (n === "this year") {
    const a = jn(t, 1);
    return [ie(In(a)), ie(Ec(a))];
  }
}
function nd(e, t) {
  var l, u;
  const n = t.familyOptions ?? {}, r = mt(t.family).comparePreviousMode;
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
  const c = td(o);
  return c ? { query: {
    ...e,
    timeDimensions: [{ ...a, dateRange: c, compareDateRange: void 0 }]
  }, mode: r } : null;
}
const rd = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function Ir({ query: e, chart: t, onState: n, editing: r }) {
  const { registry: a, locale: o } = We(), c = ne(() => {
    var N;
    return (N = t.format) != null && N.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), s = ne(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: l, isLoading: u, error: m, refetch: f, resolvedQuery: h } = Yn(s, c), p = ne(() => ed(s, c), [s, c]), b = Yn(
    (p == null ? void 0 : p.query) ?? s,
    (p == null ? void 0 : p.chart) ?? c,
    { skip: !p }
  ), g = ne(
    () => nd(h, c),
    [h, c]
  ), x = Yn(
    (g == null ? void 0 : g.query) ?? s,
    c,
    { skip: !g, skipResolve: !0 }
  ), w = ne(
    () => ({ [c.family]: Ym(a, c.family) }),
    [a, c.family]
  ), k = ne(() => {
    let N = l ?? rd;
    if (p && b.data && (N = { ...N, series: b.data.series, categories: b.data.categories }), g && x.data) {
      if (g.mode === "kpiRow") {
        const z = x.data.raw.rows[0];
        if (z) {
          const L = N.raw.rows[0];
          N = {
            ...N,
            raw: { ...N.raw, rows: L ? [L, z] : [z] }
          };
        }
      } else if (N.series.length > 0) {
        const z = x.data.series.map((L) => {
          const j = N.series.find((D) => D.key === L.key);
          return {
            ...L,
            key: `${L.key}__prev`,
            label: `${(j == null ? void 0 : j.label) ?? L.label} (prev)`,
            colorToken: (j == null ? void 0 : j.colorToken) ?? L.colorToken,
            meta: { ...L.meta, companion: !0 }
          };
        });
        N = { ...N, series: [...N.series, ...z] };
      }
    }
    return N;
  }, [l, p, b.data, g, x.data]);
  Yt(() => {
    n == null || n({ rows: k.raw.rows, refetch: f, isLoading: u });
  }, [n, k.raw.rows, f, u]);
  const C = {}, R = ne(
    () => o.formatValue ?? qo(An(o.units)),
    [o.formatValue, o.units]
  ), _ = ne(
    () => Mo(k.raw.annotation, c, R, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [k.raw.annotation, c, R, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    Bl,
    {
      data: k,
      options: c,
      config: C,
      format: _,
      state: { loading: u && !l, error: m },
      components: w,
      editing: r
    }
  );
}
function ad({ spec: e }) {
  return /* @__PURE__ */ i(Ir, { query: e.query, chart: e.chart });
}
const Ho = "cube-viz-prose";
function od(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function id({ doc: e }) {
  const t = od(e), n = ne(
    () => t ? e : null,
    [t, e]
  ), r = po(
    {
      extensions: [bo],
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
  return t ? /* @__PURE__ */ i(go, { editor: r }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
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
], cd = Object.fromEntries(
  sn.map((e) => [e.value, e.label])
);
function ka(e) {
  return cd[e.trim().toLowerCase()] ?? e;
}
const sd = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function ld({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = Fc(), a = S($o({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
  return /* @__PURE__ */ v("div", { className: "cv:mb-2 cv:flex cv:items-center cv:justify-between cv:gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: S(a, !r && "cv:opacity-40"),
        children: /* @__PURE__ */ i(wr, { className: "cv:size-4" })
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
        children: /* @__PURE__ */ i(Qt, { className: "cv:size-4" })
      }
    )
  ] });
}
function ud({ day: e, modifiers: t, className: n, style: r, ...a }) {
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
    Pc,
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
        MonthCaption: ld,
        DayButton: ud,
        Chevron: ({ orientation: a, className: o, ...c }) => /* @__PURE__ */ i(a === "left" ? wr : Qt, { className: S("cv:size-4", o), ...c })
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
function ze({
  ...e
}) {
  return /* @__PURE__ */ i(we.Root, { "data-slot": "select", ...e });
}
function sr({
  ...e
}) {
  return /* @__PURE__ */ i(we.Group, { "data-slot": "select-group", ...e });
}
function Te({
  ...e
}) {
  return /* @__PURE__ */ i(we.Value, { "data-slot": "select-value", ...e });
}
function Ee({
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
        /* @__PURE__ */ i(we.Icon, { asChild: !0, children: /* @__PURE__ */ i(tt, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function md({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    we.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(tc, { className: "cv:size-4" })
    }
  );
}
function dd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    we.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(tt, { className: "cv:size-4" })
    }
  );
}
function Pe({
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
        /* @__PURE__ */ i(md, {}),
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
        /* @__PURE__ */ i(dd, {})
      ]
    }
  ) });
}
function lr({
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
function be({
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
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(we.ItemIndicator, { children: /* @__PURE__ */ i(Ke, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(we.ItemText, { children: t })
      ]
    }
  );
}
const St = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), vd = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", It = "yyyy-MM-dd";
function fd(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Ca(e) {
  if (!e) return;
  const t = fo(e, It, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function hd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? sd, [o, c] = wt(!1), s = typeof e == "string", [l, u] = fd(e), m = Ca(l), f = Ca(u), h = m ? { from: m, to: f } : void 0;
  let p;
  s ? p = ka(e) : m && f ? p = `${pe(m, "MMM d, yyyy")} – ${pe(f, "MMM d, yyyy")}` : m ? p = pe(m, "MMM d, yyyy") : p = "Pick a date range";
  const b = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Re, { open: o, onOpenChange: c, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      H,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          p === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(ao, { className: "cv:mr-2 cv:size-4" }),
          p
        ]
      }
    ) }),
    /* @__PURE__ */ v(Me, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: a.map((g) => /* @__PURE__ */ i(
        H,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), c(!1);
          },
          children: ka(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        Wo,
        {
          mode: "range",
          selected: h,
          defaultMonth: m,
          disabled: b,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([pe(g.from, It), pe(g.to, It)]) : g != null && g.from ? t([pe(g.from, It), pe(g.from, It)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const pd = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function gd(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function bd(e) {
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
function yd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = Ko(), o = r.rangeVariable ? bd(a(r.rangeVariable)) : void 0, c = r.options ?? (o !== void 0 ? gd(o) : pd), s = typeof e == "string" ? e : "", l = c.join(",");
  return Yt(() => {
    s && !c.includes(s) && t(c[0]);
  }, [s, l]), /* @__PURE__ */ v(
    ze,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Ee, { className: St, children: /* @__PURE__ */ i(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Pe, { children: c.map((u) => /* @__PURE__ */ i(be, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function xd({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((c) => String(c))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(St, "cv:h-auto cv:min-h-[6rem]"),
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
        /* @__PURE__ */ i(Ee, { className: St, children: /* @__PURE__ */ i(Te, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Pe, { children: r.options.map((o) => /* @__PURE__ */ i(be, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function wd({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: o } = rt(), c = ne(() => {
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
      className: St,
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
function kd({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: St,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function Cd({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: St,
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
function Nd({ value: e, onChange: t, decl: n }) {
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
const Sd = {
  dateRange: hd,
  granularity: yd,
  select: xd,
  memberSelect: wd,
  text: kd,
  number: Cd,
  toggle: Nd
};
function _d({ control: e, title: t }) {
  var p;
  const { registry: n } = We(), { decls: r, resolveValue: a, setVar: o } = Ko(), c = ne(
    () => r.find((b) => b.name === e.variable),
    [r, e.variable]
  );
  if (!c)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const s = e.control.kind, l = ((p = n.controls) == null ? void 0 : p[s]) ?? Sd[s], u = a(e.variable), m = (b) => o(e.variable, b), f = t ?? c.label ?? c.name, h = Ki();
  return s === "toggle" ? /* @__PURE__ */ i(l, { value: u, onChange: m, decl: c, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: vd, htmlFor: h, children: f }),
    /* @__PURE__ */ i(
      l,
      {
        value: u,
        onChange: m,
        decl: c,
        control: e.control,
        controlId: h
      }
    )
  ] });
}
const Uo = y.forwardRef(
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
const Go = y.forwardRef(
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
const Yo = y.forwardRef(
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
const Rd = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
Rd.displayName = "CardDescription";
const Ad = y.forwardRef(
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
Ad.displayName = "CardAction";
const Qo = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
Qo.displayName = "CardContent";
const Md = y.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
Md.displayName = "CardFooter";
const fn = "cube-viz-drag-handle";
function Jo(e) {
  var s;
  const { registry: t } = We(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: r, menu: a, dragHandleProps: o, children: c } = e;
  return /* @__PURE__ */ v(Uo, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    r ? /* @__PURE__ */ v(
      Go,
      {
        ...o,
        className: S(
          fn,
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
function Ld(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const c = o == null ? "" : String(o);
    return /[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
  }, r = t.map(n).join(","), a = e.map((o) => t.map((c) => n(o[c])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function Od(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), o = document.createElement("a");
  o.href = a, o.download = t, o.click(), URL.revokeObjectURL(a);
}
function Dd(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const zd = /* @__PURE__ */ (() => {
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
let ft = null;
function Xo(e = {}) {
  return ft || (e.includeStyleProperties ? (ft = e.includeStyleProperties, ft) : (ft = Ze(window.getComputedStyle(document.documentElement)), ft));
}
function hn(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Td(e) {
  const t = hn(e, "border-left-width"), n = hn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Ed(e) {
  const t = hn(e, "border-top-width"), n = hn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Zo(e, t = {}) {
  const n = t.width || Td(e), r = t.height || Ed(e);
  return { width: n, height: r };
}
function Pd() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const Ce = 16384;
function Fd(e) {
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
async function $d(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Id(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), a.appendChild(o), o.appendChild(e), $d(a);
}
const ke = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || ke(n, t);
};
function jd(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Vd(e, t) {
  return Xo(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function qd(e, t, n, r) {
  const a = `.${e}:${t}`, o = n.cssText ? jd(n) : Vd(n, r);
  return document.createTextNode(`${a}{${o}}`);
}
function Na(e, t, n, r) {
  const a = window.getComputedStyle(e, n), o = a.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const c = zd();
  try {
    t.className = `${t.className} ${c}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(qd(c, n, a, r)), t.appendChild(s);
}
function Kd(e, t, n) {
  Na(e, t, ":before", n), Na(e, t, ":after", n);
}
const Sa = "application/font-woff", _a = "image/jpeg", Bd = {
  woff: Sa,
  woff2: Sa,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: _a,
  jpeg: _a,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function Hd(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function jr(e) {
  const t = Hd(e).toLowerCase();
  return Bd[t] || "";
}
function Wd(e) {
  return e.split(/,/)[1];
}
function ur(e) {
  return e.search(/^(data:)/) !== -1;
}
function Ud(e, t) {
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
function Gd(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Vr(e, t, n) {
  const r = Gd(e, t, n.includeQueryParams);
  if (Qn[r] != null)
    return Qn[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const o = await ei(e, n.fetchRequestInit, ({ res: c, result: s }) => (t || (t = c.headers.get("Content-Type") || ""), Wd(s)));
    a = Ud(o, t);
  } catch (o) {
    a = n.imagePlaceholder || "";
    let c = `Failed to fetch resource: ${e}`;
    o && (c = typeof o == "string" ? o : o.message), c && console.warn(c);
  }
  return Qn[r] = a, a;
}
async function Yd(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : pn(t);
}
async function Qd(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), c = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, c == null || c.drawImage(e, 0, 0, o.width, o.height);
    const s = o.toDataURL();
    return pn(s);
  }
  const n = e.poster, r = jr(n), a = await Vr(n, r, t);
  return pn(a);
}
async function Jd(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await Ln(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function Xd(e, t) {
  return ke(e, HTMLCanvasElement) ? Yd(e) : ke(e, HTMLVideoElement) ? Qd(e, t) : ke(e, HTMLIFrameElement) ? Jd(e, t) : e.cloneNode(ti(e));
}
const Zd = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", ti = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function ev(e, t, n) {
  var r, a;
  if (ti(t))
    return t;
  let o = [];
  return Zd(e) && e.assignedNodes ? o = Ze(e.assignedNodes()) : ke(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = Ze(e.contentDocument.body.childNodes) : o = Ze(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), o.length === 0 || ke(e, HTMLVideoElement) || await o.reduce((c, s) => c.then(() => Ln(s, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function tv(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : Xo(n).forEach((o) => {
    let c = a.getPropertyValue(o);
    o === "font-size" && c.endsWith("px") && (c = `${Math.floor(parseFloat(c.substring(0, c.length - 2))) - 0.1}px`), ke(e, HTMLIFrameElement) && o === "display" && c === "inline" && (c = "block"), o === "d" && t.getAttribute("d") && (c = `path(${t.getAttribute("d")})`), r.setProperty(o, c, a.getPropertyPriority(o));
  });
}
function nv(e, t) {
  ke(e, HTMLTextAreaElement) && (t.innerHTML = e.value), ke(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function rv(e, t) {
  if (ke(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function av(e, t, n) {
  return ke(t, Element) && (tv(e, t, n), Kd(e, t, n), nv(e, t), rv(e, t)), t;
}
async function ov(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const s = n[o].getAttribute("xlink:href");
    if (s) {
      const l = e.querySelector(s), u = document.querySelector(s);
      !l && u && !r[s] && (r[s] = await Ln(u, t, !0));
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
async function Ln(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => Xd(r, t)).then((r) => ev(e, r, t)).then((r) => av(e, r, t)).then((r) => ov(r, t));
}
const ni = /url\((['"]?)([^'"]+?)\1\)/g, iv = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, cv = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function sv(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function lv(e) {
  const t = [];
  return e.replace(ni, (n, r, a) => (t.push(a), n)), t.filter((n) => !ur(n));
}
async function uv(e, t, n, r, a) {
  try {
    const o = n ? Dd(t, n) : t, c = jr(t);
    let s;
    return a || (s = await Vr(o, c, r)), e.replace(sv(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function mv(e, { preferredFontFormat: t }) {
  return t ? e.replace(cv, (n) => {
    for (; ; ) {
      const [r, , a] = iv.exec(n) || [];
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
  const r = mv(e, n);
  return lv(r).reduce((o, c) => o.then((s) => uv(s, c, t, n)), Promise.resolve(r));
}
async function ht(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const o = await ai(a, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function dv(e, t) {
  await ht("background", e, t) || await ht("background-image", e, t), await ht("mask", e, t) || await ht("-webkit-mask", e, t) || await ht("mask-image", e, t) || await ht("-webkit-mask-image", e, t);
}
async function vv(e, t) {
  const n = ke(e, HTMLImageElement);
  if (!(n && !ur(e.src)) && !(ke(e, SVGImageElement) && !ur(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Vr(r, jr(r), t);
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
async function fv(e, t) {
  const r = Ze(e.childNodes).map((a) => oi(a, t));
  await Promise.all(r).then(() => e);
}
async function oi(e, t) {
  ke(e, Element) && (await dv(e, t), await vv(e, t), await fv(e, t));
}
function hv(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const Ra = {};
async function Aa(e) {
  let t = Ra[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, Ra[e] = t, t;
}
async function Ma(e, t) {
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
async function pv(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ze(a.cssRules || []).forEach((o, c) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let s = c + 1;
            const l = o.href, u = Aa(l).then((m) => Ma(m, t)).then((m) => La(m).forEach((f) => {
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
        a.href != null && r.push(Aa(a.href).then((s) => Ma(s, t)).then((s) => La(s).forEach((l) => {
          c.insertRule(l, c.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
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
function gv(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => ri(t.style.getPropertyValue("src")));
}
async function bv(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ze(e.ownerDocument.styleSheets), r = await pv(n, t);
  return gv(r);
}
function ii(e) {
  return e.trim().replace(/["']/g, "");
}
function yv(e) {
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
async function xv(e, t) {
  const n = await bv(e, t), r = yv(e);
  return (await Promise.all(n.filter((o) => r.has(ii(o.style.fontFamily))).map((o) => {
    const c = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return ai(o.cssText, c, t);
  }))).join(`
`);
}
async function wv(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await xv(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function kv(e, t = {}) {
  const { width: n, height: r } = Zo(e, t), a = await Ln(e, t, !0);
  return await wv(a, t), await oi(a, t), hv(a, t), await Id(a, n, r);
}
async function Cv(e, t = {}) {
  const { width: n, height: r } = Zo(e, t), a = await kv(e, t), o = await pn(a), c = document.createElement("canvas"), s = c.getContext("2d"), l = t.pixelRatio || Pd(), u = t.canvasWidth || n, m = t.canvasHeight || r;
  return c.width = u * l, c.height = m * l, t.skipAutoScale || Fd(c), c.style.width = `${u}`, c.style.height = `${m}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, c.width, c.height)), s.drawImage(o, 0, 0, c.width, c.height), c;
}
async function Nv(e, t = {}) {
  return (await Cv(e, t)).toDataURL();
}
function Sv(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function _v(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Rv(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Av(e, t, n = 2) {
  const r = await Nv(e, {
    pixelRatio: n,
    backgroundColor: Rv(e),
    cacheBust: !0
  });
  _v(r, `${Sv(t)}.png`);
}
function Mv({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, o] = y.useState(!1), c = t.length > 0, s = !!r;
  if (!c && !n && !s) return null;
  const l = () => {
    const h = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Od(Ld(t), `${h}.csv`);
  }, u = async () => {
    const h = r == null ? void 0 : r.current;
    if (!(!h || a)) {
      o(!0);
      try {
        await Av(h, e);
      } finally {
        o(!1);
      }
    }
  }, m = (h) => h.stopPropagation(), f = (h = !0) => S(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !h && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ i(
      Ae,
      {
        onMouseDown: m,
        onPointerDown: m,
        onTouchStart: m,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(nc, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Me, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: m, onPointerDown: m, onTouchStart: m, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ i(rc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      s ? /* @__PURE__ */ v("button", { type: "button", onClick: u, disabled: a, className: f(!a), children: [
        /* @__PURE__ */ i(ac, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: l, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ i(oc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export CSV"
      ] })
    ] })
  ] });
}
function Oa({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(Ir, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(id, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(_d, { control: e.control, title: e.title });
  }
}
function mr({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = wt({ rows: [] }), o = Xe(
    (l) => a({ rows: l.rows, refetch: l.refetch }),
    []
  ), c = pt(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(Oa, { widget: e }) });
  const s = n ? null : /* @__PURE__ */ i(
    Mv,
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
      children: /* @__PURE__ */ i("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(Oa, { widget: e, onState: o }) })
    }
  );
}
const Lv = "lg", Ov = 640;
function Dv(e) {
  return [...e].sort((t, n) => t.y - n.y || t.x - n.x);
}
function zv(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function wp({ spec: e, editable: t = !1 }) {
  const [n, r] = Bo(), a = e.grid ?? {}, o = a.cols ?? 12, c = a.rowHeight ?? 40, s = a.margin ?? [12, 12], l = a.containerPadding ?? s, u = ne(
    () => ({ [Lv]: zv(e.layout) }),
    [e.layout]
  ), m = ne(
    () => new Map(e.widgets.map((h) => [h.id, h])),
    [e.widgets]
  ), f = !t && r > 0 && r < Ov;
  return /* @__PURE__ */ i(Fr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "cv:w-full", children: r <= 0 ? null : f ? /* @__PURE__ */ i(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: s[1],
        padding: `${l[1]}px ${l[0]}px`
      },
      children: Dv(e.layout).map((h) => {
        const p = m.get(h.i);
        if (!p) return null;
        const b = h.h * c + (h.h - 1) * s[1];
        return /* @__PURE__ */ i("div", { style: { height: b }, children: /* @__PURE__ */ i(mr, { widget: p, editable: !1 }) }, h.i);
      })
    }
  ) : /* @__PURE__ */ i(
    ho,
    {
      width: r,
      layouts: u,
      breakpoints: { lg: 0 },
      cols: { lg: o },
      rowHeight: c,
      margin: s,
      containerPadding: l,
      dragConfig: { enabled: t, handle: `.${fn}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((h) => {
        const p = m.get(h.i);
        return p ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(mr, { widget: p, editable: t }) }, h.i) : null;
      })
    }
  ) }) });
}
function kp({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
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
      children: /* @__PURE__ */ i(ad, { spec: e })
    }
  ) });
}
function On(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function it(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Dn(e) {
  return e ? e.cubes.filter((t) => it(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: On(t)
  })) : [];
}
function Bt(e, t) {
  if (!(!e || !t))
    return Dn(e).find((n) => n.name === t);
}
function qr(e) {
  return e.shortTitle || e.title || e.name;
}
function gn(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function ci(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: qr(e),
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
function dr(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: qr(e),
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
function si(e, t) {
  return {
    name: e.name,
    label: qr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function vr(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!it(a) || n && a.name !== n) continue;
    const o = On(a), c = (s) => {
      s.connectedComponent = o, r.push(s);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of a.measures)
        it(s) && c(ci(s, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of a.dimensions)
        it(s) && s.type !== "time" && c(dr(s, a.name));
    if (t === "time")
      for (const s of a.dimensions)
        it(s) && s.type === "time" && c(dr(s, a.name));
  }
  return r;
}
function Tv(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!it(a) || n && !n.has(a.name)) continue;
    const o = On(a);
    for (const c of a.segments) {
      if (!it(c)) continue;
      const s = si(c, a.name);
      s.connectedComponent = o, r.push(s);
    }
  }
  return r;
}
function Fe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const r = On(n), a = (s) => (s && (s.connectedComponent = r), s), o = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (o)
        return o.type ? "aggType" in o ? a(ci(o, n.name)) : a(dr(o, n.name)) : void 0;
      const c = n.segments.find((s) => s.name === t);
      if (c) return a(si(c, n.name));
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
const fr = /* @__PURE__ */ new Set([
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
function jt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function ui(e) {
  var c, s, l, u, m;
  const t = e.query, n = (c = t.measures) == null ? void 0 : c.find(Boolean);
  if (n) return jt(n);
  const r = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (r) return jt(r);
  const a = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (a) return jt(a);
  const o = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return jt(o);
}
function _t(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Tt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Ne(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Ue(e) {
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
const di = Object.fromEntries(
  Object.entries(Pr).map(([e, t]) => [e, t.label])
), Pv = "day";
function Fv(e, t) {
  var u, m, f, h;
  const { query: n, chart: r } = e, a = _t(r).length ? _t(r) : n.measures ?? [], o = Ne(r) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((f = (m = n.timeDimensions) == null ? void 0 : m[0]) == null ? void 0 : f.dimension), c = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0, s = {
    ...e,
    chart: { ...r, family: t, mapping: void 0, familyOptions: void 0 }
  }, l = (p) => ({
    ...s,
    chart: { ...s.chart, ...p }
  });
  switch (t) {
    case "bar":
    case "line":
    case "area":
    case "pie":
      return l({ mapping: c });
    case "combo":
      return l({
        mapping: c,
        familyOptions: {
          series: a.map((p, b) => ({ member: p, render: b % 2 === 1 ? "bar" : "line" }))
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
      const p = [
        ...n.dimensions ?? [],
        ...((h = n.timeDimensions) == null ? void 0 : h.map((b) => b.dimension)) ?? [],
        ...a
      ].map((b) => ({ member: b }));
      return l({ familyOptions: p.length ? { columns: p } : void 0 });
    }
    case "map": {
      const p = Da(a, ["lat", "latitude"]) ?? a[0], b = Da(a, ["lng", "lon", "long", "longitude"]) ?? a[1];
      return l({
        familyOptions: {
          mode: "points",
          ...p ? { lat: p } : {},
          ...b && b !== p ? { lng: b } : {}
        }
      });
    }
  }
}
function Da(e, t) {
  return e.find((n) => {
    const r = n.toLowerCase();
    return t.some((a) => r.includes(a));
  });
}
function Ft(e) {
  return qm(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function hr(e) {
  return Bm(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function $v(e) {
  return mt(e).wells;
}
function ye(e) {
  return e.chart.familyOptions ?? {};
}
function zn(e) {
  const t = ye(e).series;
  return Array.isArray(t) ? t : [];
}
function Kr(e) {
  const t = ye(e).columns;
  return Array.isArray(t) ? t : [];
}
function Iv(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Zt(e) {
  var a;
  const { chart: t } = e, n = t.family, r = (o) => o ? [o] : [];
  switch (n) {
    case "bar":
    case "line":
    case "area": {
      const o = Iv(e), c = (a = t.mapping) == null ? void 0 : a.series;
      return { y: c && c.mode === "pivot" ? c.values && c.values.length > 0 ? c.values : r(c.value) : _t(t), x: r(Ne(t)), color: r(o) };
    }
    case "combo":
      return {
        x: r(Ne(t)),
        y: zn(e).map((o) => o.member)
      };
    case "pie":
      return { slices: r(Ne(t)), size: r(_t(t)[0]) };
    case "scatter": {
      const o = ye(e);
      return {
        sx: r(o.x),
        sy: r(o.y),
        size: r(o.size),
        color: r(o.groupBy)
      };
    }
    case "kpi":
      return { value: r(ye(e).measure) };
    case "table":
      return { columns: Kr(e).map((o) => o.member) };
    case "map": {
      const o = ye(e);
      return {
        lat: r(o.lat),
        lng: r(o.lng),
        weight: r(o.weight),
        series: r(o.series),
        time: r(o.time)
      };
    }
  }
}
function en(e) {
  const t = jv(e);
  return t === void 0 ? Pv : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function jv(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function Et(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Be(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function dt(e, t) {
  return { ...e, dimensions: Et(e.dimensions, t) };
}
function Se(e, t) {
  const n = Be(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function He(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function st(e, t, n) {
  if (e)
    return { category: { member: e }, series: mi(t, n) };
}
function bn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function yn(e, t, n, r) {
  if (!e || t.length === 0) return;
  const a = {};
  for (const s of t) {
    const l = r == null ? void 0 : r[s];
    l && Object.keys(l).length > 0 && (a[s] = l);
  }
  const o = Object.keys(a).length > 0, c = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: a } : {} };
  return { category: { member: e }, series: c };
}
function za(e, t, n, r, a) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return qv(e, n, r, a);
    case "combo":
      return Hv(e, n, r, a);
    case "pie":
      return Gv(e, n, r, a);
    case "scatter":
      return Qv(e, n, r);
    case "kpi":
      return Xv(e, r);
    case "table":
      return ef(e, r, a);
    case "map":
      return nf(e, n, r);
  }
}
function Vv(e, t, n, r) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Bv(e, n, r);
    case "combo":
      return Uv(e, n, r);
    case "pie":
      return Yv(e, n, r);
    case "scatter":
      return Jv(e, n, r);
    case "kpi":
      return Zv(e, r);
    case "table":
      return tf(e, r);
    case "map":
      return rf(e, n, r);
  }
}
function qv(e, t, n, r) {
  const { query: a, chart: o } = e, c = Zt(e), s = c.color[0], l = Ne(o), u = Tt(o);
  if (t === "y") {
    const m = c.y, f = Et(m, n);
    return s ? {
      ...e,
      query: { ...a, measures: f },
      chart: { ...o, mapping: yn(l, f, s, bn(o)) }
    } : {
      ...e,
      query: { ...a, measures: f },
      chart: { ...o, mapping: st(l, f, u) }
    };
  }
  if (t === "x")
    return Kv(e, n, r, s);
  if (t === "color") {
    const m = c.y;
    if (m.length === 0) return e;
    const f = dt({ ...a, measures: m }, n);
    return {
      ...e,
      query: f,
      chart: { ...o, mapping: yn(l, m, n, bn(o)) }
    };
  }
  return e;
}
function Kv(e, t, n, r) {
  const { query: a, chart: o } = e, c = Ne(o), s = Zt(e).y, l = Tt(o);
  let u = a;
  const m = Ue(a);
  if (m && c === m.dimension ? u = He(u, void 0) : c && (u = Se(u, c)), n === "time") {
    const h = (m == null ? void 0 : m.granularity) ?? en(m == null ? void 0 : m.dateRange);
    u = He(u, {
      dimension: t,
      granularity: h,
      dateRange: m == null ? void 0 : m.dateRange
    });
  } else
    u = dt(u, t);
  const f = r ? yn(t, s, r, bn(o)) : st(t, s, l);
  return { ...e, query: u, chart: { ...o, mapping: f } };
}
function Bv(e, t, n) {
  const { query: r, chart: a } = e, o = Zt(e), c = Ne(a), s = o.color[0], l = Tt(a);
  if (t === "y") {
    const u = Be(o.y, n);
    if (s && u.length >= 1)
      return {
        ...e,
        query: { ...r, measures: u },
        chart: { ...a, mapping: yn(c, u, s, bn(a)) }
      };
    const m = s ? Se({ ...r, measures: u }, s) : { ...r, measures: u };
    return { ...e, query: m, chart: { ...a, mapping: st(c, u, l) } };
  }
  if (t === "x") {
    let u = r;
    const m = Ue(r);
    return m && m.dimension === n ? u = He(u, void 0) : u = Se(u, n), { ...e, query: u, chart: { ...a, mapping: void 0 } };
  }
  if (t === "color") {
    const u = Se(r, n);
    return {
      ...e,
      query: u,
      chart: { ...a, mapping: st(c, o.y, l) }
    };
  }
  return e;
}
const Ta = ["line", "bar"];
function Hv(e, t, n, r) {
  const { query: a, chart: o } = e, c = ye(e);
  if (t === "x") {
    let s = a;
    const l = Ne(o), u = Ue(a);
    if (u && l === u.dimension ? s = He(s, void 0) : l && (s = Se(s, l)), r === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? en(u == null ? void 0 : u.dateRange);
      s = He(s, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = dt(s, n);
    return { ...e, query: s, chart: { ...o, mapping: { category: { member: n }, series: Wv(e) } } };
  }
  if (t === "y") {
    const s = zn(e);
    if (s.some((m) => m.member === n)) return e;
    const l = Ta[s.length % Ta.length], u = [...s, { member: n, render: l }];
    return {
      ...e,
      query: { ...a, measures: Et(a.measures, n) },
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
function Wv(e) {
  return { mode: "measures", members: zn(e).map((t) => t.member) };
}
function Uv(e, t, n) {
  const { query: r, chart: a } = e, o = ye(e);
  if (t === "x") {
    let c = r;
    const s = Ue(r);
    return s && s.dimension === n ? c = He(c, void 0) : c = Se(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  if (t === "y") {
    const c = zn(e).filter((l) => l.member !== n), s = Be(r.measures, n);
    return {
      ...e,
      query: { ...r, measures: s },
      chart: { ...a, familyOptions: { ...o, series: c }, mapping: vi(a, c) }
    };
  }
  return e;
}
function Gv(e, t, n, r) {
  const { query: a, chart: o } = e, c = Tt(o);
  if (t === "slices") {
    let s = a;
    const l = Ne(o), u = Ue(a);
    if (u && l === u.dimension ? s = He(s, void 0) : l && (s = Se(s, l)), r === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? en(u == null ? void 0 : u.dateRange);
      s = He(s, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = dt(s, n);
    return {
      ...e,
      query: s,
      chart: { ...o, mapping: st(n, _t(o), c) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...o, mapping: st(Ne(o), s, c) }
    };
  }
  return e;
}
function Yv(e, t, n) {
  const { query: r, chart: a } = e, o = Tt(a);
  if (t === "slices") {
    let c = r;
    const s = Ue(r);
    return s && s.dimension === n ? c = He(c, void 0) : c = Se(c, n), { ...e, query: c, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: st(Ne(a), [], o) }
  } : e;
}
const fi = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Qv(e, t, n) {
  const r = fi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...ye(e) }, s = c[r];
  c[r] = n;
  let l = a;
  if (r === "groupBy")
    s && s !== n && (l = Se(l, s)), l = dt(l, n);
  else {
    const u = s ? Be(a.measures, s) : a.measures;
    l = { ...a, measures: Et(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: c } };
}
function Jv(e, t, n) {
  const r = fi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...ye(e) };
  delete c[r];
  let s = a;
  if (r === "groupBy") s = Se(s, n);
  else {
    const l = Be(a.measures, n);
    s = { ...a, measures: l.length ? l : [] };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: c } };
}
function Xv(e, t) {
  const { query: n, chart: r } = e, a = { ...ye(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function Zv(e, t) {
  const { query: n, chart: r } = e, a = { ...ye(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function ef(e, t, n) {
  const { query: r, chart: a } = e, o = Kr(e);
  if (o.some((l) => l.member === t)) return e;
  let c = r;
  if (n === "number") c = { ...r, measures: Et(r.measures, t) };
  else if (n === "time") {
    const l = Ue(r), u = (l == null ? void 0 : l.granularity) ?? en(l == null ? void 0 : l.dateRange), m = r.timeDimensions ?? [];
    m.some((f) => f.dimension === t) || (c = { ...r, timeDimensions: [...m, { dimension: t, granularity: u }] });
  } else c = dt(r, t);
  const s = { ...ye(e), columns: [...o, { member: t }] };
  return { ...e, query: c, chart: { ...a, familyOptions: s } };
}
function tf(e, t) {
  var m, f, h;
  const { query: n, chart: r } = e, a = Kr(e).filter((p) => p.member !== t);
  let o = n;
  const c = Be(n.measures, t);
  c.length !== (((m = n.measures) == null ? void 0 : m.length) ?? 0) && (o = { ...o, measures: c.length ? c : void 0 });
  const s = Be(n.dimensions, t);
  s.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: s.length ? s : void 0 });
  const l = (n.timeDimensions ?? []).filter((p) => p.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...ye(e), columns: a };
  return { ...e, query: o, chart: { ...r, familyOptions: u } };
}
const hi = {
  lat: "lat",
  lng: "lng",
  weight: "weight",
  series: "series",
  time: "time"
};
function nf(e, t, n) {
  const r = hi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...ye(e) }, s = c[r];
  c[r] = n;
  let l = a;
  if (r === "series")
    s && s !== n && (l = Se(l, s)), l = dt(l, n);
  else if (r === "time") {
    const u = Ue(a), m = (u == null ? void 0 : u.granularity) ?? en(u == null ? void 0 : u.dateRange), f = (a.timeDimensions ?? []).filter((h) => h.dimension !== s && h.dimension !== n);
    l = { ...a, timeDimensions: [...f, { dimension: n, granularity: m }] };
  } else {
    const u = s ? Be(a.measures, s) : a.measures;
    l = { ...a, measures: Et(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: c } };
}
function rf(e, t, n) {
  const r = hi[t];
  if (!r) return e;
  const { query: a, chart: o } = e, c = { ...ye(e) };
  delete c[r];
  let s = a;
  if (r === "series")
    s = Se(a, n);
  else if (r === "time") {
    const l = (a.timeDimensions ?? []).filter((u) => u.dimension !== n);
    s = { ...a, timeDimensions: l.length ? l : void 0 };
  } else {
    const l = Be(a.measures, n);
    s = { ...a, measures: l.length ? l : void 0 };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: c } };
}
const ve = y.forwardRef(
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
function xn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(io, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(oo, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(kr, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function pi({
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
  const { meta: u, isLoading: m } = rt(), f = y.useMemo(() => {
    if (t) {
      const b = new Set(t);
      return vr(u, n).filter((g) => b.has(g.cube));
    }
    return vr(u, n, e);
  }, [u, n, e, t]), h = y.useMemo(() => af(f), [f]), p = f.find((b) => b.name === r);
  return /* @__PURE__ */ v(ze, { value: r, onValueChange: a, disabled: c || m, children: [
    /* @__PURE__ */ i(Ee, { id: s, className: l, children: /* @__PURE__ */ i(Te, { placeholder: m ? "Loading…" : o, children: p ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      xn(p.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Pe, { children: h.map(([b, g]) => /* @__PURE__ */ v(sr, { children: [
      h.length > 1 ? /* @__PURE__ */ i(lr, { children: b }) : null,
      g.map((x) => /* @__PURE__ */ i(be, { value: x.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        xn(x.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: x.label })
      ] }) }, x.name))
    ] }, b)) })
  ] });
}
function af(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function yt({
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
const of = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(oo, { className: "cv:size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(kr, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(io, { className: "cv:size-3" }), metaKind: "time" }
}, cf = ["number", "category", "time"];
function gi({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: o = "start",
  side: c = "bottom",
  children: s
}) {
  var $, V;
  const { meta: l, isLoading: u } = rt(), [m, f] = y.useState(!1), [h, p] = y.useState(""), [b, g] = y.useState(n.viewLocked ?? "tables"), [x, w] = y.useState({});
  y.useEffect(() => {
    m && g(n.viewLocked ?? "tables");
  }, [m, n.viewLocked]);
  const k = y.useMemo(() => new Set(t), [t]), C = h.trim().toLowerCase(), R = y.useMemo(() => {
    if (b !== "tables") {
      const O = n.views.find((Y) => Y.name === b) ?? Bt(l, b);
      return O ? [{ cube: O, tag: "dataset" }] : [];
    }
    const T = [];
    n.sourceCube && T.push({ cube: n.sourceCube, tag: "source" });
    for (const O of n.relatedCubes) T.push({ cube: O, tag: "related" });
    return T;
  }, [b, n, l]), _ = e.kinds.length > 1, N = (T) => cf.filter((O) => e.kinds.includes(O)).map((O) => {
    const Y = of[O], ae = vr(l, Y.metaKind, T).filter((F) => !k.has(F.name)).filter((F) => C ? F.label.toLowerCase().includes(C) || F.name.toLowerCase().includes(C) : !0);
    return { kind: O, label: Y.label, icon: Y.icon, items: ae };
  }).filter((O) => O.items.length > 0), z = R.map((T) => ({ section: T, groups: N(T.cube.name) })).filter((T) => T.groups.length > 0), L = z.length > 0, j = (T, O) => {
    a(T, O), f(!1), p("");
  }, D = b === "tables" ? "All related tables" : (($ = n.views.find((T) => T.name === b)) == null ? void 0 : $.title) ?? ((V = Bt(l, b)) == null ? void 0 : V.title) ?? b;
  return /* @__PURE__ */ v(Re, { open: m, onOpenChange: f, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: s }),
    /* @__PURE__ */ v(Me, { align: o, side: c, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(ic, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: h,
              onChange: (T) => p(T.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "cv:h-8 cv:w-full cv:bg-transparent cv:text-sm cv:outline-none cv:placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(sf, { browse: b, label: D, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: L ? z.map(({ section: T, groups: O }, Y) => {
        const ae = O.reduce((U, Q) => U + Q.items.length, 0), F = T.tag === "related", G = x[T.cube.name] ?? F, te = C.length > 0 ? !0 : !G;
        return /* @__PURE__ */ v("div", { children: [
          T.tag === "related" && Y > 0 && z[Y - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => w((U) => ({ ...U, [T.cube.name]: !G })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                te ? /* @__PURE__ */ i(tt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(Qt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(co, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: T.cube.title }),
                T.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : T.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: ae })
              ]
            }
          ),
          te ? O.map((U) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            _ ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              U.icon,
              U.label
            ] }) : null,
            U.items.map((Q) => /* @__PURE__ */ i(lf, { option: Q, reason: r(Q), onPick: () => j(Q.name, U.kind) }, Q.name))
          ] }, U.kind)) : null
        ] }, T.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function sf({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, o] = y.useState(!1), c = (s) => {
    r(s), o(!1);
  };
  return /* @__PURE__ */ v(Re, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Ae,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(so, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Me, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(Ea, { active: e === "tables", icon: /* @__PURE__ */ i(co, { className: "cv:size-3.5" }), onClick: () => c("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(re, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ i(
          Ea,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ i(Cr, { className: "cv:size-3.5" }),
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
        e ? /* @__PURE__ */ i(Ke, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function lf({ option: e, reason: t, onPick: n }) {
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
const uf = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Vt = "yyyy-MM-dd";
function mf(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Pa(e) {
  if (!e) return;
  const t = fo(e, Vt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Br({ value: e, onChange: t }) {
  const [n, r] = y.useState(!1), a = typeof e == "string", [o, c] = mf(e), s = Pa(o), l = Pa(c), u = s ? { from: s, to: l } : void 0, m = a ? e : s && l ? `${pe(s, "MMM d, yyyy")} – ${pe(l, "MMM d, yyyy")}` : s ? pe(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Re, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(H, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(ao, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", m === "Any time" && "cv:text-muted-foreground"), children: m })
    ] }) }),
    /* @__PURE__ */ v(Me, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        uf.map((f) => /* @__PURE__ */ i(
          H,
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
          H,
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
            f != null && f.from && f.to ? t([pe(f.from, Vt), pe(f.to, Vt)]) : f != null && f.from ? t([pe(f.from, Vt), pe(f.from, Vt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function df(e) {
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
function vf(e, t) {
  const n = new Set(df(t));
  return e.filter((r) => n.has(r.type));
}
function ff(e) {
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
function hf(e, t, n) {
  const r = new Set(n.map((s) => s.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = a, c = 2;
  for (; r.has(o); ) o = `${a}_${c++}`;
  return o;
}
function pf(e, t, n) {
  const r = ff(e), a = { name: hf(t, e, n), type: r }, o = t.trim();
  return o && (a.label = o), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const bi = y.createContext({});
function gf({
  createVariable: e,
  children: t
}) {
  const n = y.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(bi.Provider, { value: n, children: t });
}
function bf() {
  return y.useContext(bi);
}
function yf({ kind: e, value: t, onChange: n, className: r }) {
  const a = $r(), o = (a == null ? void 0 : a.decls) ?? [], { createVariable: c } = bf(), [s, l] = y.useState(!1), [u, m] = y.useState(!1), [f, h] = y.useState(""), p = y.useMemo(() => vf(o, e), [o, e]), b = p.find((w) => w.name === t), g = (w) => {
    n(w), l(!1), m(!1);
  }, x = () => {
    if (!c) return;
    const w = pf(e, f || "Variable", o);
    c(w), g(w.name), h("");
  };
  return /* @__PURE__ */ v(
    Re,
    {
      open: s,
      onOpenChange: (w) => {
        l(w), w || m(!1);
      },
      children: [
        /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(H, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", r), children: [
          /* @__PURE__ */ i(cc, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !b && "cv:text-muted-foreground"), children: b ? b.label ?? b.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Me, { align: "start", className: "cv:w-60 cv:p-1", children: [
          p.length > 0 ? p.map((w) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => g(w.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: w.label ?? w.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: w.type }),
                w.name === t ? /* @__PURE__ */ i(Ke, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            w.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          c ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              ve,
              {
                autoFocus: !0,
                value: f,
                onChange: (w) => h(w.target.value),
                onKeyDown: (w) => {
                  w.key === "Enter" && x(), w.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv:h-7 cv:text-sm"
              }
            ),
            /* @__PURE__ */ i(H, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: x, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
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
function Rt({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = De(t), [o, c] = y.useState(a ? "var" : "fixed");
  y.useEffect(() => {
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
      yf,
      {
        kind: e,
        value: De(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : r(De(t) ? void 0 : t, (l) => n(l))
  ] });
}
const xf = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Jn(e) {
  return "member" in e && "operator" in e;
}
function wf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: o,
  className: c
}) {
  var D;
  const { meta: s } = rt(), l = ((D = $r()) == null ? void 0 : D.decls) ?? [], [u, m] = y.useState(null), [f, h] = y.useState(null), p = r ?? [], b = p.length === 1 && !Jn(p[0]) && "or" in p[0] && Array.isArray(p[0].or) && p[0].or.every(Jn) ? p[0] : void 0, g = b ? "any" : "all", x = [], w = [];
  b || p.forEach(($) => Jn($) ? x.push($) : w.push($));
  const k = b ? b.or : x, C = w.length === 0 && (k.length >= 2 || g === "any"), R = ($) => g === "any" ? $.length ? [{ or: $ }] : [] : [...$, ...w], _ = ($) => {
    const V = $.filter((O) => O.member.length > 0), T = R(V);
    a(T.length > 0 ? T : void 0);
  }, N = ($) => {
    const V = $ === "any" ? k.length ? [{ or: k }] : [] : [...k];
    a(V.length > 0 ? V : void 0);
  }, z = ($, V) => _(k.map((T, O) => O === $ ? { ...T, ...V } : T)), L = ($) => _(k.filter((V, T) => T !== $)), j = ($) => {
    const T = { ...f ?? { member: "", operator: "equals", values: [] }, ...$ };
    T.member ? (h(null), m(k.length), _([...k, T])) : h(T);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", c), children: [
    k.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    C ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        yt,
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
    k.map(($, V) => {
      const T = Fe(s, $.member);
      return u === V ? /* @__PURE__ */ i(
        Fa,
        {
          leaf: $,
          member: T,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (O) => z(V, O),
          onDone: () => m(null),
          onRemove: () => L(V)
        },
        V
      ) : /* @__PURE__ */ i(
        kf,
        {
          text: Cf($, T == null ? void 0 : T.label, l),
          disabled: o,
          onEdit: () => m(V),
          onRemove: () => L(V)
        },
        V
      );
    }),
    f ? /* @__PURE__ */ i(
      Fa,
      {
        leaf: f,
        member: Fe(s, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: j,
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
      H,
      {
        variant: "outline",
        size: "sm",
        className: "cv:w-full cv:justify-start",
        disabled: o || !!f,
        onClick: () => {
          m(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(kt, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function kf({
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
      H,
      {
        variant: "ghost",
        size: "icon",
        className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
        disabled: t,
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(At, { className: "cv:size-4" })
      }
    )
  ] });
}
function Fa({
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
  const u = Ev(t == null ? void 0 : t.type), m = u.includes(e.operator) ? e.operator : u[0], f = !fr.has(m);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        s && e.member ? /* @__PURE__ */ v(H, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: s, children: [
          /* @__PURE__ */ i(Ke, { className: "cv:size-3.5" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ i(
          H,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-7 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            disabled: o,
            onClick: l,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ i(At, { className: "cv:size-3.5" })
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
          gi,
          {
            well: xf,
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
                    xn(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(tt, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        pi,
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
            values: fr.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Ee, { className: "cv:w-full", children: /* @__PURE__ */ i(Te, {}) }),
            /* @__PURE__ */ i(Pe, { children: u.map((h) => /* @__PURE__ */ i(be, { value: h, children: li[h] }, h)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        Nf,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => c({ values: h })
        }
      )
    ] }) : null
  ] });
}
function Cf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = li[e.operator] ?? e.operator;
  if (fr.has(e.operator)) return `${r} ${a}`;
  const o = (e.values ?? []).map((c) => {
    if (De(c)) {
      const s = n.find((l) => l.name === c.var);
      return `{${((s == null ? void 0 : s.label) ?? c.var).replace(/[{}]/g, "")}}`;
    }
    return String(c);
  });
  return o.length > 0 ? `${r} ${a} ${o.join(", ")}` : `${r} ${a} …`;
}
function Nf({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && De(r[0]);
  if (t === "time") {
    const s = a ? r[0] : Sf(r);
    return /* @__PURE__ */ i(
      Rt,
      {
        kind: "dateRange",
        value: s,
        onChange: (l) => n(l === void 0 ? [] : De(l) ? [l] : _f(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(Br, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = a ? r[0] : r.filter((s) => !De(s));
  return /* @__PURE__ */ i(
    Rt,
    {
      kind: o,
      value: c,
      onChange: (s) => n(s === void 0 ? [] : De(s) ? [s] : s),
      renderFixed: (s, l) => /* @__PURE__ */ i(
        ve,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => l(Rf(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function Sf(e) {
  const t = e.filter((n) => !De(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function _f(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Rf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Af({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: o } = e, c = (o.filters ?? []).length, s = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ v(
      Ae,
      {
        className: S(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          c > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(sc, { className: "cv:size-4" }),
          "Filter",
          c > 0 ? /* @__PURE__ */ i("span", { className: "cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground", children: c }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(Me, { align: "end", className: "cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(Mf, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ i(wf, { cube: n, cubes: r, scope: a, value: o.filters, onChange: s })
    ] })
  ] });
}
function Mf({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = rt(), a = Tv(r, n);
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
function Lf({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: r } = rt(), a = y.useMemo(() => Dn(r), [r]), o = a.filter((x) => x.type === "view"), c = a.filter((x) => x.type === "cube"), s = a.find((x) => x.name === e), [l, u] = y.useState(!1), [m, f] = y.useState(null), h = (x) => {
    if (x === e) {
      u(!1);
      return;
    }
    t ? f(x) : (n(x), u(!1));
  }, p = () => {
    m && n(m), f(null), u(!1);
  }, b = m ? ((g = a.find((x) => x.name === m)) == null ? void 0 : g.title) ?? m : "";
  return /* @__PURE__ */ v(
    Re,
    {
      open: l,
      onOpenChange: (x) => {
        u(x), x || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          Ae,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(so, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !s && "cv:text-muted-foreground"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Me, { align: "start", className: "cv:w-64 cv:p-1", children: m ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: b }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(H, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(H, { size: "sm", className: "cv:h-7", onClick: p, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(re, { children: [
            /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
            o.map((x) => /* @__PURE__ */ i(
              $a,
              {
                icon: /* @__PURE__ */ i(Cr, { className: "cv:size-3.5" }),
                label: x.title,
                active: x.name === e,
                onClick: () => h(x.name)
              },
              x.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Tables" }),
          c.map((x) => /* @__PURE__ */ i(
            $a,
            {
              icon: /* @__PURE__ */ i(lo, { className: "cv:size-3.5" }),
              label: x.title,
              active: x.name === e,
              onClick: () => h(x.name)
            },
            x.name
          ))
        ] }) })
      ]
    }
  );
}
function $a({
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
function Ia(e, t, n, r) {
  var o;
  const a = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function ja({
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
            onChange: (l) => Ia(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          Df,
          {
            hidden: c,
            what: "axis title",
            onClick: () => Ia(e, t, n, { labelHide: c ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Of({
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
          n ? /* @__PURE__ */ i(uo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(mo, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Df({
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
      children: e ? /* @__PURE__ */ i(uo, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(mo, { className: "cv:size-3.5" })
    }
  );
}
const yi = y.forwardRef(
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
yi.displayName = "Label";
function me({
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
      /* @__PURE__ */ i(yi, { htmlFor: r, className: "cv:text-muted-foreground", children: e }),
      a ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: a }) : null
    ] }),
    c,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function pr({
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
  const c = y.useId();
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
        /* @__PURE__ */ i(pr, { id: c, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function zf({ spec: e, update: t }) {
  var h, p;
  const { chart: n } = e, r = n.family, a = n.familyOptions ?? {}, o = (b) => t({ ...e, chart: { ...n, ...b } }), c = (b) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...b } } }), s = ((p = (h = n.mapping) == null ? void 0 : h.series) == null ? void 0 : p.mode) === "pivot" ? "stacked" : "none", l = n.stackMode ?? (r === "area" ? s : Oe[r].envelope.stackMode) ?? "none", m = /* @__PURE__ */ i(me, { label: "Stacked", children: /* @__PURE__ */ i(
    yt,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: l === "stacked" ? "stacked" : l === "percent" ? "percent" : "none",
      onChange: (b) => o({ stackMode: b })
    }
  ) }), f = (() => {
    var b, g;
    switch (r) {
      case "bar":
        return /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Horizontal",
              checked: n.orientation === "horizontal",
              onChange: (x) => o({ orientation: x ? "horizontal" : "vertical" })
            }
          ),
          m
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(re, { children: [
          m,
          n.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((g = (b = n.mapping) == null ? void 0 : b.series) == null ? void 0 : g.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Donut",
              checked: typeof a.innerRadiusPct == "number" && a.innerRadiusPct > 0,
              onChange: (x) => c({ innerRadiusPct: x ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(me, { label: "Slice labels", children: /* @__PURE__ */ i(
            yt,
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
              onChange: (x) => c({ showLabels: x })
            }
          ) }),
          /* @__PURE__ */ i(Va, { label: "Max slices", children: /* @__PURE__ */ i(
            ve,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: a.maxSlices ?? "",
              placeholder: "8",
              onChange: (x) => {
                const w = parseInt(x.target.value, 10);
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
        return /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Compact rows",
              checked: a.rowHeight === "compact",
              onChange: (x) => c({ rowHeight: x ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Sortable columns",
              checked: a.sortable !== !1,
              onChange: (x) => c({ sortable: x })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Sticky header",
              checked: a.stickyHeader !== !1,
              onChange: (x) => c({ stickyHeader: x })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Row numbers",
              checked: a.showRowNumbers === !0,
              onChange: (x) => c({ showRowNumbers: x })
            }
          )
        ] });
      // Combo is configured entirely per-measure (render type, line shape, points,
      // axis, color) on each Values field — no type-level options.
      case "combo":
        return null;
      case "scatter":
        return null;
      case "map": {
        const x = a.mode ?? "points";
        return /* @__PURE__ */ v(re, { children: [
          /* @__PURE__ */ i(me, { label: "Mode", children: /* @__PURE__ */ i(
            yt,
            {
              "aria-label": "Map mode",
              size: "sm",
              options: [
                { value: "points", label: "Points" },
                { value: "paths", label: "Paths" },
                { value: "heatmap", label: "Heatmap" }
              ],
              value: x,
              onChange: (w) => c({ mode: w })
            }
          ) }),
          x === "heatmap" && /* @__PURE__ */ i(Va, { label: "Heatmap radius", children: /* @__PURE__ */ i(
            ve,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: a.heatmapRadius ?? "",
              placeholder: "20",
              onChange: (w) => {
                const k = parseInt(w.target.value, 10);
                c({ heatmapRadius: Number.isFinite(k) && k > 0 ? k : void 0 });
              }
            }
          ) })
        ] });
      }
    }
  })();
  return /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col", children: f });
}
function Tf(e) {
  return mt(e).hasCustomizeOptions;
}
function Va({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
const Ef = Kl;
function xi(e, t) {
  return (n) => {
    n !== e.chart.family && t(Fv(e, n));
  };
}
function Pf({ spec: e, update: t, empty: n }) {
  const r = e.chart.family, a = xi(e, t);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(wi, { family: r, onPick: a })
  ] }) }) : null;
}
function Ff({ spec: e, update: t }) {
  const n = e.chart.family, r = xi(e, t), a = mt(n).icon;
  return /* @__PURE__ */ v(Re, { children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(a, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          di[n],
          /* @__PURE__ */ i(tt, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Me, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(wi, { family: n, onPick: r })
      ] }),
      Tf(n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(zf, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function wi({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-4 cv:gap-1.5", children: Ef.map((n) => {
    const r = mt(n).icon, a = n === e;
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
          di[n]
        ]
      },
      n
    );
  }) });
}
function $f(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function If(e, t, n, r, a) {
  var Wr, Ur, Gr, Yr, Qr, Jr, Xr, Zr, ea, ta, na, ra, aa, oa;
  const { chart: o, query: c } = e, s = o.family, l = n.kinds.length === 1 ? n.kinds[0] : jf(a), u = o.familyOptions ?? {}, m = Array.isArray(u.series) ? u.series : [], f = Array.isArray(u.columns) ? u.columns : [], h = Tt(o), p = h[r], b = s === "combo" && n.id === "y", g = s === "table" && n.id === "columns", x = s === "bar" || s === "line" || s === "area", w = ((Ur = (Wr = o.mapping) == null ? void 0 : Wr.series) == null ? void 0 : Ur.mode) === "measures", k = x && n.id === "y", C = k && w, R = b ? (Gr = m.find((I) => I.member === r)) == null ? void 0 : Gr.label : g ? (Yr = f.find((I) => I.member === r)) == null ? void 0 : Yr.label : C ? p == null ? void 0 : p.label : void 0, _ = b ? (Qr = m.find((I) => I.member === r)) == null ? void 0 : Qr.colorToken : C ? p == null ? void 0 : p.colorToken : void 0, N = Ue(c), z = n.kinds.includes("time") && (N == null ? void 0 : N.dimension) === r, L = z ? N == null ? void 0 : N.granularity : void 0, j = z ? N == null ? void 0 : N.dateRange : void 0, D = b ? ((Jr = m.find((I) => I.member === r)) == null ? void 0 : Jr.render) ?? "line" : void 0, $ = s === "line" && n.id === "y", V = s === "bar" && n.id === "y" && o.orientation !== "horizontal", T = ((Zr = (Xr = o.mapping) == null ? void 0 : Xr.series) == null ? void 0 : Zr.mode) === "pivot", O = ((ta = (ea = o.mapping) == null ? void 0 : ea.series) == null ? void 0 : ta.mode) === "pivot" ? o.mapping.series.meta : void 0, Y = ($ || V) && (w || T) || b, ae = Y ? (b ? (na = m.find((I) => I.member === r)) == null ? void 0 : na.axis : w ? p == null ? void 0 : p.axis : (ra = O == null ? void 0 : O[r]) == null ? void 0 : ra.axis) ?? "left" : void 0, te = (s === "line" || s === "area") && n.id === "y" && w || b && (D === "line" || D === "area"), U = b ? m.find((I) => I.member === r) : void 0, Q = te ? b ? U == null ? void 0 : U.curve : p == null ? void 0 : p.curve : void 0, de = te ? b ? U == null ? void 0 : U.dots : p == null ? void 0 : p.dots : void 0, J = (I) => {
    var ia, ca;
    if ((ia = o.mapping) != null && ia.series && o.mapping.series.mode !== "measures") return;
    const le = ((ca = o.mapping) != null && ca.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : c.measures) ?? [], ue = { ...h };
    I && Object.keys(I).length > 0 ? ue[r] = I : delete ue[r];
    const Pt = Ne(o);
    Pt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Pt }, series: mi(le, ue) }
      }
    });
  }, q = (I) => {
    const le = m.map((ue) => ue.member === r ? { ...ue, ...I } : ue);
    t({ ...e, chart: { ...o, familyOptions: { ...u, series: le } } });
  }, A = (I) => {
    const le = f.map((ue) => ue.member === r ? { ...ue, ...I } : ue);
    t({ ...e, chart: { ...o, familyOptions: { ...u, columns: le } } });
  }, X = (I) => {
    b ? q({ label: I }) : g ? A({ label: I }) : C && J({ ...p, label: I });
  }, he = (I) => {
    b ? q({ colorToken: I ?? void 0 }) : C && J({ ...p, colorToken: I ?? void 0 });
  }, K = (I) => {
    if (!N) return;
    const le = { ...N };
    for (const ue of Object.keys(I)) {
      const Pt = I[ue];
      Pt === void 0 ? delete le[ue] : le[ue] = Pt;
    }
    t({ ...e, query: { ...c, timeDimensions: [le] } });
  }, W = (I) => K({ granularity: I }), fe = (I) => K({ dateRange: I }), vt = (I) => q({ render: I }), Ge = (I) => {
    var le, ue;
    b ? q({ axis: I }) : C ? J({ ...p, axis: I }) : ((ue = (le = o.mapping) == null ? void 0 : le.series) == null ? void 0 : ue.mode) === "pivot" && t(gr(e, s, r, I));
  }, at = (I) => {
    b ? q({ curve: I }) : C && J({ ...p, curve: I });
  }, ot = (I) => {
    b ? q({ dots: I }) : C && J({ ...p, dots: I });
  }, tn = () => t(Vv(e, s, n.id, r)), M = (n.id === "x" || n.id === "slices") && (l === "category" || l === "time"), P = (aa = o.mapping) == null ? void 0 : aa.series, E = (P && P.mode === "pivot" ? P.value : _t(o)[0]) ?? ((oa = c.measures) == null ? void 0 : oa[0]), B = M ? l === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...E ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...E ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], Z = (() => {
    const I = $f(c.order)[0];
    if (!I) return "none";
    const [le, ue] = I;
    return E && le === E ? ue === "desc" ? "value-desc" : "value-asc" : le === r ? l === "time" ? ue === "desc" ? "time-desc" : "time-asc" : ue === "asc" ? "label-asc" : "label-desc" : "none";
  })(), ce = (I) => {
    let le;
    switch (I) {
      case "none":
        le = void 0;
        break;
      case "value-desc":
        le = E ? [[E, "desc"]] : void 0;
        break;
      case "value-asc":
        le = E ? [[E, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        le = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        le = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...c, order: le } });
  }, oe = typeof c.limit == "number" ? c.limit : void 0, se = (I) => t({ ...e, query: { ...c, limit: I && I > 0 ? I : void 0 } }), Tn = (s === "bar" || s === "line" || s === "area") && z, Ri = Tn && u.comparePrevious === !0;
  return {
    kind: l,
    label: R,
    colorToken: _,
    granularity: L,
    dateRange: j,
    render: D,
    axis: ae,
    curve: Q,
    dots: de,
    canLineStyle: te,
    canAxis: Y,
    canRename: b || g || C,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: k && w || b,
    isTimeField: z,
    isComboY: b,
    isCategoryField: M,
    sortValue: Z,
    sortOptions: B,
    onSort: ce,
    limit: oe,
    onLimit: se,
    canComparePrevious: Tn,
    comparePrevious: Ri,
    comparePreviousReady: Tn && j !== void 0,
    onComparePrevious: (I) => t({ ...e, chart: { ...o, familyOptions: { ...u, comparePrevious: I || void 0 } } }),
    onRename: X,
    onRecolor: he,
    onGranularity: W,
    onDateRange: fe,
    onRender: vt,
    onAxis: Ge,
    onCurve: at,
    onDots: ot,
    onRemove: tn
  };
}
function gr(e, t, n, r) {
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
function jf(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function qa(e, t, n, r) {
  var f;
  const { chart: a, query: o } = e, c = a.family, s = (h) => {
    if (r < 0 || r >= h.length || n === r) return h;
    const p = h.slice(), [b] = p.splice(n, 1);
    return p.splice(r, 0, b), p;
  };
  if (c === "combo" && t.id === "y") {
    const h = a.familyOptions ?? {}, p = s(Array.isArray(h.series) ? h.series : []), b = s(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: b },
      chart: { ...a, familyOptions: { ...h, series: p } }
    };
  }
  if (c === "table" && t.id === "columns") {
    const h = a.familyOptions ?? {}, p = s(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...h, columns: p } } };
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
function Vf(e, t, n) {
  const r = Dn(e), a = r.filter((C) => C.type === "view"), o = Zt(t), c = Object.values(o).flat();
  let s;
  for (const C of c) {
    const R = Fe(e, C);
    if (R) {
      s = R;
      break;
    }
  }
  const l = !s && n ? Bt(e, n) : void 0, u = s ? Bt(e, s.cube) : l, m = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, f = (s == null ? void 0 : s.connectedComponent) ?? (l == null ? void 0 : l.connectedComponent), h = t.query.measures ?? [], p = h.length ? jt(h[0]) : void 0;
  if (m)
    return { viewLocked: m, relatedCubes: [], views: a, measureSource: p, scopeComponent: f };
  const b = p ?? (s == null ? void 0 : s.cube) ?? (l == null ? void 0 : l.name), g = b ? Bt(e, b) : void 0, x = r.filter((C) => C.type === "cube" && C.connectedComponent !== void 0), k = (f === void 0 ? x : x.filter((C) => C.connectedComponent === f)).filter((C) => C.name !== b).sort((C, R) => C.title.localeCompare(R.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: k,
    views: a,
    measureSource: p,
    scopeComponent: f
  };
}
const qf = et.options;
function Kf({
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
        qf.map((o) => {
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
const Bf = ct.options, Hf = {
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
  const s = n && n.length > 0 ? n : Bf;
  return /* @__PURE__ */ v(
    ze,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: a,
      children: [
        /* @__PURE__ */ i(Ee, { id: o, className: c, children: /* @__PURE__ */ i(Te, { placeholder: r }) }),
        /* @__PURE__ */ i(Pe, { children: s.map((l) => /* @__PURE__ */ i(be, { value: l, children: Hf[l] }, l)) })
      ]
    }
  );
}
const Ka = { bar: "Bar", line: "Line", area: "Area" }, Wf = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Uf({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: o,
  reorder: c,
  className: s
}) {
  const l = If(e, t, n, r, a), u = (a == null ? void 0 : a.label) ?? r, m = l.label || u, f = l.canColor && o !== void 0, h = l.canRename || f || l.isTimeField || l.isCategoryField || l.isComboY && !!l.render || l.canAxis || l.canLineStyle || !!c, p = (g) => {
    const x = g.trim();
    l.onRename(x.length > 0 ? x : void 0);
  }, b = /* @__PURE__ */ v(re, { children: [
    f ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : a ? xn(a.type) : null,
    /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: m })
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
        h ? /* @__PURE__ */ v(Re, { children: [
          /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${m}`,
              children: b
            }
          ) }),
          /* @__PURE__ */ i(Me, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            l.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                ve,
                {
                  defaultValue: l.label ?? "",
                  placeholder: u,
                  className: "cv:h-8",
                  onBlur: (g) => p(g.target.value),
                  onKeyDown: (g) => {
                    g.key === "Enter" && (p(g.target.value), g.target.blur());
                  }
                }
              )
            ] }) : null,
            f ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Color" }),
              /* @__PURE__ */ i(Kf, { value: l.colorToken, onChange: l.onRecolor })
            ] }) : null,
            l.isTimeField ? /* @__PURE__ */ v(re, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  Rt,
                  {
                    kind: "dateRange",
                    value: l.dateRange,
                    onChange: l.onDateRange,
                    renderFixed: (g, x) => /* @__PURE__ */ i(Br, { value: g, onChange: x })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  Rt,
                  {
                    kind: "granularity",
                    value: l.granularity,
                    onChange: l.onGranularity,
                    renderFixed: (g, x) => /* @__PURE__ */ i(ki, { value: g, onChange: x, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              l.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    pr,
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
            l.isCategoryField ? /* @__PURE__ */ v(re, { children: [
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
                  ve,
                  {
                    type: "number",
                    min: 1,
                    defaultValue: l.limit ?? "",
                    placeholder: "All",
                    className: "cv:h-8",
                    onBlur: (g) => {
                      const x = g.target.value.trim();
                      l.onLimit(x === "" ? void 0 : Number(x));
                    },
                    onKeyDown: (g) => {
                      if (g.key === "Enter") {
                        const x = g.target.value.trim();
                        l.onLimit(x === "" ? void 0 : Number(x)), g.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            l.isComboY && l.render ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Draw as" }),
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: Object.keys(Ka).map((g) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => l.onRender(g),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                    l.render === g ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    Ka[g],
                    l.render === g ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
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
                    l.axis === g ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            l.canLineStyle ? /* @__PURE__ */ v(re, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: Wf.map(([g, x]) => /* @__PURE__ */ v(
                  "button",
                  {
                    type: "button",
                    onClick: () => l.onCurve(g),
                    className: S(
                      "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                      (l.curve ?? "cv:monotone") === g ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                    ),
                    children: [
                      x,
                      (l.curve ?? "monotone") === g ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
                    ]
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(pr, { checked: l.dots === !0, onChange: l.onDots, "aria-label": "Show points" })
              ] })
            ] }) : null,
            c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1", children: [
              /* @__PURE__ */ v(
                H,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canUp,
                  onClick: c.onUp,
                  children: [
                    /* @__PURE__ */ i(wn, { className: "cv:size-3.5" }),
                    "Up"
                  ]
                }
              ),
              /* @__PURE__ */ v(
                H,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canDown,
                  onClick: c.onDown,
                  children: [
                    /* @__PURE__ */ i(kn, { className: "cv:size-3.5" }),
                    "Down"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ v(
              H,
              {
                variant: "ghost",
                size: "sm",
                className: "cv:h-8 cv:justify-start cv:text-destructive cv:hover:text-destructive",
                onClick: l.onRemove,
                children: [
                  /* @__PURE__ */ i(sa, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: m, children: b }),
        /* @__PURE__ */ i(
          H,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: l.onRemove,
            "aria-label": `Remove ${m}`,
            children: /* @__PURE__ */ i(sa, { className: "cv:size-3.5" })
          }
        )
      ]
    }
  );
}
function Ba({
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
  disableReorder: p,
  label: b,
  note: g,
  pickerSide: x,
  pickerAlign: w,
  control: k
}) {
  const C = n.cardinality === "many" && !h, R = C || r.length === 0, _ = r.length, N = f === "vertical", z = b ?? n.label, L = /* @__PURE__ */ i(
    gi,
    {
      well: n,
      placed: a,
      scope: s,
      blockReason: l,
      onSelect: u,
      side: x ?? (N ? "right" : "top"),
      align: w ?? "start",
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
            r.length === 0 ? z : "Add"
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
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: z }),
          m ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: m }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        k ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: k }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", N ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          r.map((j, D) => /* @__PURE__ */ i(
            Uf,
            {
              spec: e,
              update: t,
              well: n,
              member: j,
              option: o(j),
              resolvedColor: c(j),
              className: N ? "cv:w-full" : void 0,
              reorder: C && _ > 1 && !p ? {
                canUp: D > 0,
                canDown: D < _ - 1,
                onUp: () => t(qa(e, n, D, D - 1)),
                onDown: () => t(qa(e, n, D, D + 1))
              } : void 0
            },
            j
          )),
          R ? L : null
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
            /* @__PURE__ */ i(tt, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Me, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Hr(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...o } } }) };
}
function Gf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Hr(e, t), a = ui(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.display ?? "number", s = n.gauge, l = (m) => {
    const f = o ?? (m.dimension ? { dimension: m.dimension } : void 0);
    if (!f) return;
    const h = { ...f };
    for (const p of Object.keys(m)) {
      const b = m[p];
      b === void 0 ? delete h[p] : h[p] = b;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(Ht, { label: "Time field", children: /* @__PURE__ */ i(
      pi,
      {
        cube: a,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (m) => l({ dimension: m }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Ht, { label: "Date range", children: /* @__PURE__ */ i(
      Rt,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (m) => l({ dateRange: m }),
        renderFixed: (m, f) => /* @__PURE__ */ i(Br, { value: m, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(me, { label: "Display", children: /* @__PURE__ */ i(
      yt,
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
    c === "gauge" ? /* @__PURE__ */ i(Ht, { label: "Gauge max", children: /* @__PURE__ */ i(
      ve,
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
function Yf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Hr(e, t), a = n.comparison, o = a !== void 0, c = y.useRef(void 0);
  a && (c.current = a);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ge,
      {
        label: "Show comparison",
        checked: o,
        onChange: (m) => r({
          comparison: m ? c.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ i(me, { label: "Against", children: /* @__PURE__ */ i(
        yt,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ i(Ht, { label: "Baseline value", children: /* @__PURE__ */ i(
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
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ i("p", { className: "cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
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
function Qf({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Hr(e, t), a = n.sparkline, o = a !== void 0, c = n.comparison !== void 0, s = n.goodDirection ?? "up", l = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ge,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => r({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ i(Ht, { label: "Trend granularity", children: /* @__PURE__ */ i(
        Rt,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ i(ki, { value: u, onChange: m, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      c ? null : /* @__PURE__ */ i(
        ge,
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
function Ht({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
function Jf({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var Ge, at, ot, tn;
  const { meta: a } = rt(), { locale: o } = We(), { chart: c } = e, s = c.family, l = mt(s), u = ui(e), m = y.useMemo(() => An(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), f = y.useCallback(
    (M) => M && (o == null ? void 0 : o.unitSystem) === "imperial" && m[M] ? m[M].imperialUnit : M,
    [o == null ? void 0 : o.unitSystem, m]
  ), h = y.useMemo(() => $v(s), [s]), p = y.useMemo(() => Zt(e), [e]), b = y.useMemo(() => new Map(h.map((M) => [M.id, M])), [h]), [g, x] = y.useState(void 0), w = y.useMemo(() => Vf(a, e, g), [a, e, g]), k = y.useMemo(() => Object.values(p).flat(), [p]), C = y.useCallback(
    (M) => {
      x(M), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), R = y.useMemo(
    () => {
      var M;
      return w.viewLocked ? [w.viewLocked] : [(M = w.sourceCube) == null ? void 0 : M.name, ...w.relatedCubes.map((P) => P.name)].filter(
        Boolean
      );
    },
    [w]
  ), _ = y.useMemo(
    () => Object.values(p).every((M) => M.length === 0),
    [p]
  ), N = l.dualAxisY, z = y.useCallback(
    (M) => {
      var B, Z, ce;
      if (s === "combo") {
        const oe = c.familyOptions ?? {}, se = (Array.isArray(oe.series) ? oe.series : []).find(
          (nn) => nn.member === M
        );
        return (se == null ? void 0 : se.axis) === "right" ? "right" : "left";
      }
      const P = (B = c.mapping) == null ? void 0 : B.series;
      return (P && (P.mode === "measures" || P.mode === "pivot") ? (ce = (Z = P.meta) == null ? void 0 : Z[M]) == null ? void 0 : ce.axis : void 0) === "right" ? "right" : "left";
    },
    [s, c.familyOptions, c.mapping]
  ), L = y.useMemo(() => {
    var ce, oe;
    const M = p.y ?? [], P = (se) => M.find((nn) => z(nn) === se), E = P("left"), B = N ? P("right") : void 0, Z = (se) => se ? Fe(a, se) : void 0;
    return {
      leftKey: E ? Ft(Z(E)) : void 0,
      rightKey: B ? Ft(Z(B)) : void 0,
      leftLabel: E ? Ha(Z(E), f((ce = Z(E)) == null ? void 0 : ce.unit)) : void 0,
      rightLabel: B ? Ha(Z(B), f((oe = Z(B)) == null ? void 0 : oe.unit)) : void 0
    };
  }, [p, N, z, a, f]), j = y.useCallback(
    (M) => {
      const P = Ft(M), { leftKey: E, rightKey: B } = L;
      return E === void 0 || P === E ? "left" : B === void 0 || P === B ? "right" : "left";
    },
    [L]
  ), D = y.useCallback(
    (M, P) => {
      var E;
      if (P) {
        if (w.scopeComponent !== void 0 && P.connectedComponent !== w.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (P.memberType === "measure" && w.measureSource && P.cube !== w.measureSource)
          return `Measures come from one table (${((E = w.sourceCube) == null ? void 0 : E.title) ?? w.measureSource}). Remove them to switch.`;
        if (M === "y" && P.memberType === "measure") {
          const { leftKey: B, rightKey: Z, leftLabel: ce, rightLabel: oe } = L, se = Ft(P);
          if (N) {
            if (B !== void 0 && Z !== void 0 && se !== B && se !== Z)
              return `Both axes show ${ce} & ${oe} — remove one to add a third unit.`;
          } else if (B !== void 0 && se !== B)
            return `This axis shows ${ce}; ${P.label ?? "this field"} is ${hr(P)}`;
        }
      }
    },
    [w, L, N]
  ), $ = N ? [L.leftLabel, L.rightLabel].filter(Boolean).join(" · ") || void 0 : L.leftLabel, V = y.useMemo(() => {
    var P;
    const M = {};
    if (s === "bar" || s === "line" || s === "area") {
      const E = (P = c.mapping) == null ? void 0 : P.series;
      if (E && E.mode === "measures") {
        const B = E.members.map((ce) => {
          var oe, se;
          return { key: ce, colorToken: (se = (oe = E.meta) == null ? void 0 : oe[ce]) == null ? void 0 : se.colorToken };
        }), Z = or(B, c.colors);
        E.members.forEach((ce, oe) => {
          M[ce] = Z[oe];
        });
      }
    } else if (s === "combo") {
      const E = c.familyOptions ?? {}, B = Array.isArray(E.series) ? E.series : [], Z = B.map((oe) => ({ key: oe.member, colorToken: oe.colorToken })), ce = or(Z, c.colors);
      B.forEach((oe, se) => {
        M[oe.member] = ce[se];
      });
    }
    return M;
  }, [s, c.mapping, c.colors, c.familyOptions]), T = y.useCallback(
    (M, P, E) => {
      const B = Fe(a, P);
      if (D(M, B)) return;
      let Z = za(e, s, M, P, E);
      N && M === "y" && (Z = gr(Z, s, P, j(B))), t(Z);
    },
    [D, a, t, e, s, N, j]
  ), O = y.useCallback(
    (M, P) => {
      var Z;
      if (!P) return;
      if (w.scopeComponent !== void 0 && P.connectedComponent !== w.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (P.memberType === "measure" && w.measureSource && P.cube !== w.measureSource)
        return `Measures come from one table (${((Z = w.sourceCube) == null ? void 0 : Z.title) ?? w.measureSource}). Remove them to switch.`;
      const E = M === "left" ? L.leftKey : L.rightKey, B = M === "left" ? L.leftLabel : L.rightLabel;
      if (E !== void 0 && Ft(P) !== E)
        return `This axis shows ${B}; ${P.label ?? "this field"} is ${hr(P)}`;
    },
    [w, L]
  ), Y = y.useCallback(
    (M, P, E) => {
      const B = Fe(a, P);
      O(M, B) || t(gr(za(e, s, "y", P, E), s, P, M));
    },
    [O, a, t, e, s]
  ), ae = s === "bar" && c.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : l.zones, F = ae.left.map((M) => b.get(M)).filter(Boolean), G = ae.bottom.map((M) => b.get(M)).filter(Boolean), te = (Ge = p.color) == null ? void 0 : Ge[0], U = ((at = p.y) == null ? void 0 : at.length) ?? 0, Q = te && U > 1 ? `${U} measures × ${((ot = Fe(a, te)) == null ? void 0 : ot.label) ?? "this split"} — one series per measure per value.` : void 0, de = l.hasLegend, J = p.y ?? [], q = J.find((M) => z(M) !== "right"), A = N ? J.find((M) => z(M) === "right") : void 0, X = (M) => {
    var B, Z, ce, oe;
    if (!M) return;
    const P = (B = c.mapping) == null ? void 0 : B.series;
    return (P && P.mode === "measures" ? (ce = (Z = P.meta) == null ? void 0 : Z[M]) == null ? void 0 : ce.label : void 0) ?? ((oe = Fe(a, M)) == null ? void 0 : oe.label);
  }, he = (M) => {
    var E, B, Z, ce;
    const P = (oe, se) => se ? /* @__PURE__ */ i(ja, { spec: e, update: t, axis: oe, title: "Title", auto: X(se) }) : null;
    switch (M) {
      case "y":
        return P("y", q);
      // single value axis (bar / area)
      case "x":
        return P("x", (B = (E = c.mapping) == null ? void 0 : E.category) == null ? void 0 : B.member);
      case "sy":
        return P("y", (Z = p.sy) == null ? void 0 : Z[0]);
      // scatter Y axis
      case "sx":
        return P("x", (ce = p.sx) == null ? void 0 : ce[0]);
      // scatter X axis
      default:
        return null;
    }
  }, K = (M, P) => /* @__PURE__ */ i(
    Ba,
    {
      spec: e,
      update: t,
      well: M,
      placed: p[M.id] ?? [],
      allPlaced: k,
      optionFor: (E) => Fe(a, E),
      colorFor: (E) => V[E],
      scope: w,
      blockReason: (E) => D(M.id, E),
      onAdd: (E, B) => T(M.id, E, B),
      badge: M.id === "y" ? $ : void 0,
      orientation: P,
      note: M.id === "color" ? Q : void 0,
      control: he(M.id)
    },
    M.id
  ), W = b.get("y"), fe = (M) => {
    if (!W) return null;
    const P = M === "left" ? q : A;
    return /* @__PURE__ */ i(
      Ba,
      {
        spec: e,
        update: t,
        well: W,
        label: M === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter((E) => z(E) === M),
        allPlaced: k,
        optionFor: (E) => Fe(a, E),
        colorFor: (E) => V[E],
        scope: w,
        blockReason: (E) => O(M, E),
        onAdd: (E, B) => Y(M, E, B),
        badge: M === "left" ? L.leftLabel : L.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: P ? /* @__PURE__ */ i(
          ja,
          {
            spec: e,
            update: t,
            axis: M === "left" ? "y" : "y2",
            title: "Title",
            auto: X(P)
          }
        ) : null
      },
      `y-${M}`
    );
  }, vt = () => {
    const M = b.get("value"), P = (p.value ?? []).length > 0, E = c.familyOptions ?? {};
    return /* @__PURE__ */ v(re, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        M ? K(M, "vertical") : null,
        P ? /* @__PURE__ */ i(
          Xn,
          {
            label: "Time, range & display",
            summary: E.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(Gf, { spec: e, update: t })
          }
        ) : null
      ] }),
      P ? /* @__PURE__ */ v(re, { children: [
        /* @__PURE__ */ i(Xn, { label: "Comparison", summary: E.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Yf, { spec: e, update: t }) }),
        /* @__PURE__ */ i(Xn, { label: "Sparkline", summary: E.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Qf, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      _ ? null : /* @__PURE__ */ i(Ff, { spec: e, update: t }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          Lf,
          {
            currentName: w.viewLocked ?? ((tn = w.sourceCube) == null ? void 0 : tn.name),
            hasFields: k.length > 0,
            onSelect: C
          }
        ),
        /* @__PURE__ */ i(Af, { spec: e, update: t, cube: u, scopeCubes: R, scope: w })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      F.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", l.sidebarWidthClass), children: s === "kpi" ? vt() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        F.flatMap(
          (M) => N && M.id === "y" ? [fe("left"), fe("right")] : [K(M, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          r,
          /* @__PURE__ */ i(Pf, { spec: e, update: t, empty: _ })
        ] }),
        G.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          G.map((M) => K(M, "horizontal")),
          de && !_ ? /* @__PURE__ */ i(Of, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Ha(e, t) {
  const n = hr(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function Ci(e, t) {
  const n = y.useRef(e);
  y.useEffect(() => {
    n.current = e;
  }, [e]);
  const r = y.useRef(null);
  return y.useEffect(
    () => () => {
      r.current !== null && clearTimeout(r.current);
    },
    []
  ), y.useCallback(
    (...a) => {
      r.current !== null && clearTimeout(r.current), r.current = setTimeout(() => {
        r.current = null, n.current(...a);
      }, t);
    },
    [t]
  );
}
function Wa(e) {
  const t = No.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Xf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = y.useState(e), [o, c] = y.useState(e);
  y.useEffect(() => {
    a(e), c(e);
  }, [e]);
  const s = Ci((f) => t(f), n), l = y.useMemo(() => Wa(r), [r]), u = l.length === 0, m = y.useCallback(
    (f) => {
      a(f), Wa(f).length === 0 && (c(f), s(f));
    },
    [s]
  );
  return { draft: r, issues: l, valid: u, committed: o, update: m };
}
const Zf = () => {
};
function eh({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: o
}) {
  const { draft: c, issues: s, valid: l, committed: u, update: m } = Xf({
    spec: e,
    onChange: t ?? Zf,
    debounceMs: r
  }), f = u, h = (C) => {
    var R, _, N;
    return (((R = C.measures) == null ? void 0 : R.length) ?? 0) > 0 || (((_ = C.dimensions) == null ? void 0 : _.length) ?? 0) > 0 || (((N = C.timeDimensions) == null ? void 0 : N.some((z) => typeof z.granularity == "string")) ?? !1);
  }, p = (C) => {
    var R;
    return (((R = C.measures) == null ? void 0 : R.length) ?? 0) > 0;
  }, b = c.chart.family !== "table", g = h(c.query) && h(f.query) && (!b || p(c.query) && p(f.query)), x = b && !p(c.query) ? `Add a value (measure) to build this ${c.chart.family} chart.` : "Add fields from the axes to build this chart.", w = g ? /* @__PURE__ */ i(Ir, { query: f.query, chart: f.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: x }) }), k = n ? /* @__PURE__ */ v(H, { size: "sm", disabled: !l, onClick: () => n(u), children: [
    /* @__PURE__ */ i(vo, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2", a ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        l ? null : /* @__PURE__ */ v(Rr, { variant: "destructive", children: [
          /* @__PURE__ */ i(ro, { className: "cv:size-4" }),
          /* @__PURE__ */ i(Ar, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(Mr, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            s.slice(0, 3).map((C, R) => /* @__PURE__ */ v("li", { children: [
              C.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: C.path }) : null,
              " ",
              C.message
            ] }, R)),
            s.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              s.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(Jf, { spec: c, update: m, toolbar: k, children: w }) })
      ]
    }
  );
}
function th({
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
  const p = a || o;
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
            onChange: (b) => t(b.target.value),
            className: "cv:h-8 cv:w-full cv:min-w-0 cv:flex-1 cv:sm:w-auto"
          }
        ),
        /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-center cv:gap-1", children: [
          /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(no, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(kr, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(lc, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ i(uc, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          p ? /* @__PURE__ */ v(re, { children: [
            /* @__PURE__ */ i(
              H,
              {
                variant: "ghost",
                size: "icon",
                onClick: a,
                disabled: !c,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(mc, {})
              }
            ),
            /* @__PURE__ */ i(
              H,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ i(dc, {})
              }
            )
          ] }) : null,
          l ? /* @__PURE__ */ v(
            H,
            {
              variant: "ghost",
              size: "sm",
              onClick: l,
              disabled: u,
              className: "cv:text-muted-foreground cv:hover:text-destructive",
              children: [
                /* @__PURE__ */ i(vc, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(H, { size: "sm", onClick: m, disabled: f, children: [
            /* @__PURE__ */ i(vo, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const Ni = "lg", Si = 12;
function nh(e, t) {
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
function rh(e, t) {
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
const ah = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function oh(e, t, n, r = Si) {
  const a = ah[n], o = Math.min(a.w, r), c = e.reduce((s, l) => Math.max(s, l.y + l.h), 0);
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
  const a = oh(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function ih(e, t, n) {
  const r = e.widgets.find((o) => o.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  return a.id = n, _i(e, a);
}
function ch(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function sh(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const lh = 12, uh = 900, mh = 0.4;
function dh(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function vh({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: o,
  onLayoutChange: c
}) {
  const [s, l] = Bo(), u = e.grid ?? {}, m = u.cols ?? lh, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], p = u.containerPadding ?? [0, 0], b = Math.max(mh, Math.min(1, l / uh)), g = Math.max(8, Math.round(f * b)), x = [
    Math.round(h[0] * b),
    Math.round(h[1] * b)
  ], w = [
    Math.round(p[0] * b),
    Math.round(p[1] * b)
  ], k = y.useMemo(
    () => ({ [Ni]: dh(e.layout) }),
    [e.layout]
  ), C = y.useMemo(
    () => new Map(e.widgets.map((z) => [z.id, z])),
    [e.widgets]
  ), R = y.useRef(c);
  y.useEffect(() => {
    R.current = c;
  }, [c]);
  const _ = y.useRef(null), N = y.useCallback(
    (z, L) => {
      const j = nh(z, L);
      R.current(j.map((D) => ({ ...D })));
    },
    []
  );
  return /* @__PURE__ */ i(Fr, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    ho,
    {
      width: l,
      layouts: k,
      breakpoints: { lg: 0 },
      cols: { lg: m },
      rowHeight: g,
      margin: x,
      containerPadding: w,
      dragConfig: { enabled: !0, handle: `.${fn}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: N,
      children: e.layout.map((z) => {
        const L = C.get(z.i);
        if (!L) return null;
        const j = L.id === t;
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
              "aria-pressed": j,
              onPointerDown: (D) => {
                _.current = { x: D.clientX, y: D.clientY };
              },
              onClick: (D) => {
                const $ = _.current;
                $ && Math.hypot(D.clientX - $.x, D.clientY - $.y) > 5 || n(L.id);
              },
              onKeyDown: (D) => {
                (D.key === "Enter" || D.key === " ") && (D.preventDefault(), n(L.id));
              },
              className: S(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                j ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(mr, { widget: L, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(fn, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${L.title ?? L.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), r(L.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(fc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${L.title ?? L.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), a(L.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(hc, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${L.title ?? L.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), o(L.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-destructive cv:hover:text-destructive-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(At, {})
                    }
                  )
                ] })
              ]
            },
            z.i
          )
        );
      })
    }
  ) : null }) });
}
function fh(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function hh({
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
  const a = po({
    extensions: [bo],
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
        class: S(
          Ho,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return a ? /* @__PURE__ */ i(me, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(ph, { editor: a }),
    /* @__PURE__ */ i(go, { editor: a })
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
function ph({ editor: e }) {
  const [, t] = y.useReducer((n) => n + 1, 0);
  return y.useEffect(() => {
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
            children: /* @__PURE__ */ i(pc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(gc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(bc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(yc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(xc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(wc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(kc, {})
          }
        ),
        /* @__PURE__ */ i(
          Qe,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(Cc, {})
          }
        )
      ]
    }
  );
}
const gh = Nr(
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
  return /* @__PURE__ */ i("div", { className: S(gh({ variant: t }), e), ...n });
}
function yh({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: o
}) {
  const { meta: c, isLoading: s } = rt(), l = y.useMemo(() => Dn(c), [c]), u = l.filter((h) => h.type === "cube"), m = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(ze, { value: e, onValueChange: t, disabled: r || s, children: [
    /* @__PURE__ */ i(Ee, { id: a, className: o, children: /* @__PURE__ */ i(Te, { placeholder: s ? "Loading…" : n, children: f ? /* @__PURE__ */ i(Zn, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v(Pe, { children: [
      m.length > 0 ? /* @__PURE__ */ v(sr, { children: [
        /* @__PURE__ */ i(lr, { children: "Views" }),
        m.map((h) => /* @__PURE__ */ i(be, { value: h.name, children: /* @__PURE__ */ i(Zn, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(sr, { children: [
        /* @__PURE__ */ i(lr, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(be, { value: h.name, children: /* @__PURE__ */ i(Zn, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function Zn({ option: e }) {
  const t = e.type === "view" ? Cr : lo;
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
      me,
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
              /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Te, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Pe, { children: t.map((s) => /* @__PURE__ */ i(be, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(me, { label: "Control", children: /* @__PURE__ */ v(ze, { value: r.kind, onValueChange: (s) => c(s), children: [
      /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Te, {}) }),
      /* @__PURE__ */ i(Pe, { children: Jc.options.map((s) => /* @__PURE__ */ i(be, { value: s, children: xh[s] }, s)) })
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
      return /* @__PURE__ */ i(Lh, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Nh({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ i(
      me,
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
      ge,
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
  const [n, r] = y.useState(!1), a = new Set(e.map((s) => s.toLowerCase())), o = (s) => {
    const l = new Set(a);
    l.has(s) ? l.delete(s) : l.add(s), t(sn.filter((u) => l.has(u.value)).map((u) => u.value));
  }, c = a.size === 0 ? "Default set" : a.size === sn.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ v(Re, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ v(H, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: c }),
      /* @__PURE__ */ i(tt, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Me, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: sn.map((s) => {
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
                children: l ? /* @__PURE__ */ i(Ke, { className: "cv:size-3" }) : null
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
    const u = ct.options.filter((m) => l.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((s) => s.type === "dateRange" || s.type === "time"), c = "__none__";
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ i(
      me,
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
              /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Te, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Pe, { children: [
                /* @__PURE__ */ i(be, { value: c, children: "None" }),
                o.map((s) => /* @__PURE__ */ i(be, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(me, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: ct.options.map((s) => {
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
  return /* @__PURE__ */ v(re, { children: [
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
      me,
      {
        label: "Options",
        action: /* @__PURE__ */ v(H, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ i(kt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "No options yet." }) : e.options.map((o, c) => /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5", children: [
          /* @__PURE__ */ i(
            ve,
            {
              className: "cv:flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (s) => n(c, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            ve,
            {
              className: "cv:flex-1",
              placeholder: "Value",
              value: String(o.value),
              onChange: (s) => n(c, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            H,
            {
              variant: "ghost",
              size: "icon",
              className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground",
              "aria-label": "Remove option",
              onClick: () => a(c),
              children: /* @__PURE__ */ i(At, {})
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
  return /* @__PURE__ */ v(re, { children: [
    /* @__PURE__ */ i(me, { label: "From", children: /* @__PURE__ */ v(
      ze,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Te, {}) }),
          /* @__PURE__ */ v(Pe, { children: [
            /* @__PURE__ */ i(be, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(be, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(be, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
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
          H,
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
  return /* @__PURE__ */ i(me, { label: "Placeholder", children: /* @__PURE__ */ i(
    ve,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function Lh({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ i(me, { label: a, children: /* @__PURE__ */ i(
    ve,
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
function Oh(e) {
  return { schemaVersion: gt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Dh(e) {
  const t = {
    schemaVersion: gt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function zh(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Ua({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const o = r ? (c) => r([...t, c]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", a && "cv:h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      me,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ i(
          ve,
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
      /* @__PURE__ */ i(Fr, { spec: Oh(t), children: /* @__PURE__ */ i(gf, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(a && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        eh,
        {
          fill: a,
          spec: Dh(e),
          onChange: (c) => n(zh(e, c))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(hh, { widget: e, onChange: n }) : /* @__PURE__ */ i(kh, { widget: e, variables: t, onChange: n })
  ] });
}
function Th({
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
      Qt,
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
function Eh({
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
  const u = o !== void 0, [m, f] = y.useState(a), h = r ? u ? o : m : !0, p = y.useId(), b = y.useCallback(() => {
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
          Th,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
            open: h,
            onToggle: b,
            regionId: p
          }
        ),
        h ? /* @__PURE__ */ i("div", { id: p, "data-slot": "section-body", className: "cv:pt-2", children: l }) : null
      ]
    }
  );
}
function Ph(e = "w") {
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
function $h(e) {
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
      return Fh(t);
    case "text":
      return $h(t);
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
const Ga = {
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
  const r = y.useRef(0), a = () => {
    if (n) return n();
    let u;
    do
      u = `var_${++r.current}`;
    while (e.some((m) => m.name === u));
    return u;
  }, o = (u, m) => {
    t(e.map((f, h) => h === u ? Bh(f, m) : f));
  }, c = (u) => t(e.filter((m, f) => f !== u)), s = () => t([...e, Vh(a())]), l = (u, m) => {
    const f = u + m;
    if (f < 0 || f >= e.length) return;
    const h = e.slice();
    [h[u], h[f]] = [h[f], h[u]], t(h);
  };
  return /* @__PURE__ */ i(
    Eh,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(H, { variant: "outline", size: "sm", onClick: s, children: [
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
        /* @__PURE__ */ v(H, { variant: "outline", size: "sm", className: "cv:mt-3", onClick: s, children: [
          /* @__PURE__ */ i(kt, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, m) => /* @__PURE__ */ i(
        Hh,
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
function Bh(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = qh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Hh({
  decl: e,
  index: t,
  total: n,
  duplicate: r,
  onChange: a,
  onRemove: o,
  onMove: c
}) {
  const [s, l] = y.useState(!0), u = e.name === "" ? "Name required" : r ? "Duplicate name" : void 0;
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
              children: s ? /* @__PURE__ */ i(tt, {}) : /* @__PURE__ */ i(Qt, {})
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
          /* @__PURE__ */ i("span", { className: "cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline", children: Ga[e.type] }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: [
            /* @__PURE__ */ i(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable up",
                disabled: t === 0,
                onClick: () => c(-1),
                children: /* @__PURE__ */ i(wn, {})
              }
            ),
            /* @__PURE__ */ i(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground",
                "aria-label": "Move variable down",
                disabled: t === n - 1,
                onClick: () => c(1),
                children: /* @__PURE__ */ i(kn, {})
              }
            ),
            /* @__PURE__ */ i(
              H,
              {
                variant: "ghost",
                size: "icon",
                className: "cv:size-7 cv:text-muted-foreground cv:hover:text-destructive",
                "aria-label": "Remove variable",
                onClick: o,
                children: /* @__PURE__ */ i(At, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive", children: u }) : null,
        s ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5", children: [
          /* @__PURE__ */ i(me, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(ze, { value: e.type, onValueChange: (m) => a({ type: m }), children: [
            /* @__PURE__ */ i(Ee, { children: /* @__PURE__ */ i(Te, {}) }),
            /* @__PURE__ */ i(Pe, { children: ko.options.map((m) => /* @__PURE__ */ i(be, { value: m, children: Ga[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ i(me, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
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
          /* @__PURE__ */ i(Wh, { decl: e, onChange: (m) => a({ default: m }) })
        ] }) : null
      ]
    }
  );
}
function Wh({
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
    return /* @__PURE__ */ i(me, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
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
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : Uh(e.default);
  return /* @__PURE__ */ i(me, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    ve,
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
function Cp({
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
  className: h
}) {
  var X, he;
  const [p, b] = y.useState(e);
  y.useEffect(() => b(e), [e]);
  const [g, x] = y.useState(null), w = y.useRef(0), [k, C] = y.useState(null), R = y.useRef(g), _ = y.useRef(k), N = y.useRef(p);
  y.useEffect(() => {
    R.current = g, _.current = k, N.current = p;
  });
  const z = y.useRef(null);
  z.current === null && (z.current = o ?? Ph());
  const L = o ?? z.current, j = Ci(
    (K) => r == null ? void 0 : r(K),
    c
  ), D = y.useCallback(
    (K) => {
      w.current = Date.now(), b((W) => {
        const fe = K(W);
        return j(fe), fe;
      });
    },
    [j]
  ), $ = y.useRef(t);
  y.useEffect(() => {
    if (!t || t === $.current) return;
    const K = 500;
    let W = null;
    const fe = () => {
      var ot;
      const vt = Date.now() - w.current;
      if (vt < K) {
        W = setTimeout(fe, K - vt);
        return;
      }
      $.current = t;
      const Ge = /* @__PURE__ */ new Set();
      ((ot = _.current) == null ? void 0 : ot.kind) === "widget" && Ge.add(_.current.id), R.current && Ge.add(R.current);
      const at = Qh(t, N.current, Ge);
      b(at), n == null || n(at);
    };
    return fe(), () => {
      W && clearTimeout(W);
    };
  }, [t]);
  const V = y.useCallback(
    (K) => {
      const W = jh(K, L());
      D((fe) => _i(fe, W)), x(W.id), C({ kind: "widget", id: W.id });
    },
    [D, L]
  ), T = y.useCallback((K) => x(K), []), O = y.useCallback((K) => {
    x(K), C({ kind: "widget", id: K });
  }, []), Y = y.useCallback(
    (K) => {
      D((W) => ch(W, K)), x((W) => W === K ? null : W), C((W) => (W == null ? void 0 : W.kind) === "widget" && W.id === K ? null : W);
    },
    [D]
  ), ae = y.useCallback(
    (K) => {
      const W = L();
      D((fe) => ih(fe, K, W)), x(W);
    },
    [D, L]
  ), F = y.useCallback(
    (K) => D((W) => sh(W, K)),
    [D]
  ), G = y.useCallback(
    (K) => D((W) => ({ ...W, layout: rh(W.layout, K) })),
    [D]
  ), te = y.useCallback(
    (K) => D((W) => ({ ...W, name: K || void 0 })),
    [D]
  ), U = y.useCallback(
    (K) => D((W) => ({ ...W, variables: K })),
    [D]
  ), Q = y.useMemo(
    () => So.safeParse(p),
    [p]
  ), de = y.useCallback(() => {
    Q.success && (a == null || a(Q.data));
  }, [Q, a]), J = (k == null ? void 0 : k.kind) === "widget" ? p.widgets.find((K) => K.id === k.id) ?? null : null;
  y.useEffect(() => {
    (k == null ? void 0 : k.kind) === "widget" && !p.widgets.some((K) => K.id === k.id) && C(null);
  }, [k, p.widgets]);
  const q = y.useCallback(() => C(null), []), A = (k == null ? void 0 : k.kind) === "variables" ? "Dashboard variables" : J ? J.title ?? `${Yh(J.type)} widget` : "";
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((he = (X = p.grid) == null ? void 0 : X.margin) == null ? void 0 : he[0]) ?? 12 },
      className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", h),
      children: [
        /* @__PURE__ */ i(
          th,
          {
            name: p.name ?? "",
            onNameChange: te,
            onAdd: V,
            onEditVariables: () => C({ kind: "variables" }),
            onUndo: s,
            onRedo: l,
            canUndo: u,
            canRedo: m,
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
          vh,
          {
            spec: p,
            selectedId: g,
            onSelect: T,
            onEdit: O,
            onDuplicate: ae,
            onDelete: Y,
            onLayoutChange: G
          }
        ) }),
        k ? /* @__PURE__ */ v(
          "div",
          {
            "data-slot": "dashboard-editor-fullscreen",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": A,
            className: "cv:fixed cv:inset-0 cv:z-50 cv:flex cv:flex-col cv:bg-background",
            children: [
              /* @__PURE__ */ v("header", { className: "cv:flex cv:shrink-0 cv:items-center cv:justify-between cv:gap-3 cv:border-b cv:border-border cv:px-4 cv:py-2.5", children: [
                /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
                  /* @__PURE__ */ v(H, { variant: "ghost", size: "sm", onClick: q, children: [
                    /* @__PURE__ */ i(wr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: A })
                ] }),
                J ? /* @__PURE__ */ v(
                  H,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => Y(J.id),
                    children: [
                      /* @__PURE__ */ i(At, {}),
                      " Delete"
                    ]
                  }
                ) : null
              ] }),
              /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: k.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(Kh, { variables: p.variables, onChange: U }) }) : (J == null ? void 0 : J.type) === "chart" ? /* @__PURE__ */ i(
                Ua,
                {
                  fill: !0,
                  widget: J,
                  variables: p.variables,
                  onChange: F,
                  onVariablesChange: U
                }
              ) : J ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                Ua,
                {
                  widget: J,
                  variables: p.variables,
                  onChange: F,
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
function Yh(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function Qh(e, t, n) {
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
  As as AreaFamilyOptionsSchema,
  Gc as AxesOptionsSchema,
  Vn as AxisOptionsSchema,
  Hs as BarChartFamily,
  _s as BarFamilyOptionsSchema,
  Ni as CANONICAL_BREAKPOINT,
  et as ChartColorTokenSchema,
  Jf as ChartEditOverlay,
  eh as ChartEditor,
  Kc as ChartFamilySchema,
  wo as ChartOptionsSchema,
  Bl as ChartRenderer,
  No as ChartSpecSchema,
  kp as ChartView,
  Zc as ChartWidgetSchema,
  Yc as ColorAssignmentSchema,
  bl as ComboChartFamily,
  Ps as ComboFamilyOptionsSchema,
  Es as ComboSeriesOptSchema,
  zs as CondFormatRuleSchema,
  Ir as CubeChart,
  ad as CubeChartSpec,
  xo as CubeQuerySchema,
  Er as CubeVizContext,
  yp as CubeVizProvider,
  Oe as DEFAULTS,
  xe as DEFAULT_COLOR_RAMP,
  Si as DEFAULT_COLS,
  cr as DEFAULT_UNIT_CONVERSIONS,
  fn as DRAG_HANDLE_CLASS,
  wp as Dashboard,
  Cp as DashboardEditor,
  Fr as DashboardProvider,
  So as DashboardSpecSchema,
  er as DateRangeSchema,
  da as EM_DASH,
  vh as EditorCanvas,
  th as EditorToolbar,
  wf as FilterBuilder,
  Ic as FilterOperatorSchema,
  Bc as FormatKindSchema,
  Nn as FormatOptionsSchema,
  vs as GRANULARITY_PATTERN,
  ct as GranularitySchema,
  as as GridConfigSchema,
  Jc as InputControlKindSchema,
  Xc as InputControlSchema,
  kh as InputWidgetEditor,
  ts as InputWidgetSchema,
  _d as InputWidgetView,
  el as KpiFamily,
  Os as KpiFamilyOptionsSchema,
  rs as LayoutItemSchema,
  jc as LeafFilterSchema,
  Wc as LegendOptionsSchema,
  Ws as LineChartFamily,
  Rs as LineFamilyOptionsSchema,
  kl as MapChartFamily,
  $s as MapFamilyOptionsSchema,
  Fs as MapModeSchema,
  ee as MemberSchema,
  la as OrderDirSchema,
  qc as OrderSpecSchema,
  Gs as PieChartFamily,
  Ms as PieFamilyOptionsSchema,
  tr as QueryFilterSchema,
  Jt as ReferenceLineOptSchema,
  mr as RenderWidget,
  gt as SCHEMA_VERSION,
  $c as ScalarSchema,
  Qs as ScatterChartFamily,
  Ls as ScatterFamilyOptionsSchema,
  Hc as SeriesMappingSchema,
  ua as SeriesMetaSchema,
  _o as SpecSchema,
  Ds as TableColumnOptSchema,
  ll as TableFamily,
  Ts as TableFamilyOptionsSchema,
  hh as TextWidgetEditor,
  es as TextWidgetSchema,
  id as TextWidgetView,
  Vc as TimeDimensionSchema,
  Qc as TipTapDocSchema,
  Uc as TooltipOptionsSchema,
  mn as VarRefSchema,
  os as VariableDeclSchema,
  ko as VariableTypeSchema,
  yo as VariableValueSchema,
  Kh as VariablesPanel,
  Jo as WidgetChrome,
  Ua as WidgetEditPanel,
  ns as WidgetSpecSchema,
  _i as appendWidget,
  ga as assignColors,
  qm as axisKey,
  Vo as builtinCharts,
  Pr as builtinFamilyDescriptors,
  ss as createCubeClient,
  Ph as createIdFactory,
  qo as createUnitsFormatter,
  su as createVariableStore,
  ps as datePattern,
  nr as deepMerge,
  qh as defaultForType,
  Lr as defaultFormatter,
  mt as familyDescriptor,
  je as familyOptionsSchema,
  Kl as familyOrder,
  ls as fetchMeta,
  gp as formatCategory,
  qt as formatDateValue,
  Nt as isEmptyValue,
  De as isVarRef,
  cs as loadSpec,
  Ro as looksLikeIsoDate,
  Mo as makeChartFormat,
  pp as makeDateFormatter,
  bp as makeFormatter,
  rh as mergeLayout,
  An as mergeUnitConversions,
  Fh as newChartWidget,
  Ih as newInputWidget,
  $h as newTextWidget,
  Vh as newVariable,
  jh as newWidget,
  Jl as normalize,
  nh as pickCanonicalLayout,
  oh as placeNewItem,
  Bm as quantityLabel,
  ch as removeWidget,
  sh as replaceWidget,
  Ym as resolveChart,
  js as resolveOptions,
  cu as resolveQuery,
  or as resolveSeriesColors,
  ru as resolveValue,
  fp as safeLoadSpec,
  hs as toDate,
  Wl as toResultAnnotation,
  Xf as useChartEditorState,
  Bo as useContainerWidth,
  rt as useCubeMeta,
  Jm as useCubeQuery,
  We as useCubeVizContext,
  Ko as useDashboard,
  Ci as useDebouncedCallback,
  xp as useFormatter,
  Yn as useNormalizedSeries,
  $r as useOptionalDashboard,
  hp as validateSpec
};
//# sourceMappingURL=index.js.map
