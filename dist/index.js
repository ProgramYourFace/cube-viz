import { jsx as i, jsxs as f, Fragment as re } from "react/jsx-runtime";
import * as Un from "recharts";
import { BarChart as $o, CartesianGrid as Dt, YAxis as Te, XAxis as rt, Bar as pa, LabelList as ga, ReferenceLine as zt, LineChart as Po, Line as ba, AreaChart as ya, Area as Yn, PieChart as jo, Pie as Eo, Cell as va, Label as Io, ScatterChart as Vo, ZAxis as qo, Scatter as Ko, RadialBarChart as Bo, PolarAngleAxis as Ho, RadialBar as Wo, ResponsiveContainer as Go, ComposedChart as Uo } from "recharts";
import * as x from "react";
import { createContext as xa, useContext as Qn, useMemo as Z, useState as at, useCallback as Ie, useEffect as Lt, useRef as xt, createElement as Yo, useSyncExternalStore as Qo, useId as Jo } from "react";
import { clsx as Xo } from "clsx";
import { twMerge as Zo } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as ei, ArrowUp as Jn, ArrowDown as Xn, ChevronsUpDown as ti, AlertCircle as ka, ChevronLeft as Zn, ChevronRight as an, ChevronDown as Xe, Check as Fe, ChevronUp as ni, CalendarIcon as Na, MoreVertical as ri, RefreshCw as ai, Download as oi, Type as er, Hash as wa, Calendar as Ca, Search as ii, Table2 as Sa, Database as _a, Layers as tr, Variable as si, Plus as Tt, Trash2 as ct, ListFilter as li, Box as Ra, EyeOff as Aa, Eye as Ma, BarChart4 as ci, Table as ui, Gauge as mi, ScatterChart as di, PieChart as fi, AreaChart as hi, LineChart as pi, BarChart3 as Oa, X as Pr, Save as Da, SlidersHorizontal as gi, Braces as bi, Undo2 as yi, Redo2 as vi, RotateCcw as xi, Pencil as ki, Copy as Ni, Bold as wi, Italic as Ci, Strikethrough as Si, Heading1 as _i, Heading2 as Ri, List as Ai, ListOrdered as Mi, Quote as Oi } from "lucide-react";
import * as Ut from "@radix-ui/react-popover";
import { cva as nr } from "class-variance-authority";
import * as be from "@radix-ui/react-select";
import Di from "@cubejs-client/core";
import { format as de, isValid as kt, parseISO as Yt, differenceInCalendarDays as zi, subDays as Ce, startOfMonth as bn, subMonths as yn, startOfQuarter as vn, subQuarters as xn, startOfYear as kn, subYears as Nn, subWeeks as Li, startOfWeek as Ti, endOfWeek as Fi, endOfMonth as $i, endOfQuarter as Pi, endOfYear as ji, parse as za } from "date-fns";
import { DayPicker as Ei, useDayPicker as Ii } from "react-day-picker";
import { ResponsiveGridLayout as La } from "react-grid-layout";
import { useEditor as Ta, EditorContent as Fa } from "@tiptap/react";
import $a from "@tiptap/starter-kit";
const tt = 1, Qt = m.object({ var: m.string().min(1) }).strict();
function Se(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Jt = (e) => m.union([e, Qt]), Vi = m.union([m.string(), m.number(), m.boolean()]), Ye = m.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), zn = m.union([m.tuple([m.string(), m.string()]), m.string()]), Pa = m.union([
  m.string(),
  m.number(),
  m.boolean(),
  m.tuple([m.string(), m.string()]),
  // absolute date range
  m.array(m.string()),
  m.array(m.number())
]), ee = m.string().min(1), qi = m.enum([
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
]), Ki = m.object({
  member: ee,
  operator: qi,
  values: m.array(m.union([Vi, Qt])).optional()
}).strict(), Ln = m.lazy(
  () => m.union([
    Ki,
    m.object({ and: m.array(Ln) }).strict(),
    m.object({ or: m.array(Ln) }).strict()
  ])
), Bi = m.object({
  dimension: ee,
  granularity: Jt(Ye).optional(),
  dateRange: Jt(zn).optional(),
  compareDateRange: m.array(zn).optional()
}).strict(), jr = m.enum(["asc", "desc"]), Hi = m.union([
  m.record(ee, jr),
  m.array(m.tuple([ee, jr]))
]), ja = m.object({
  measures: m.array(ee).optional(),
  dimensions: m.array(ee).optional(),
  timeDimensions: m.array(Bi).optional(),
  filters: m.array(Ln).optional(),
  segments: m.array(ee).optional(),
  order: Hi.optional(),
  limit: Jt(m.number()).optional(),
  offset: Jt(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), Wi = m.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
]), Ve = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Gi = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), on = m.object({
  kind: Gi.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional()
}).strict(), Er = m.object({
  label: m.string().optional(),
  colorToken: Ve.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: on.optional()
}).strict(), Ui = m.object({
  category: m.object({ member: ee }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(ee),
      meta: m.record(ee, Er).optional()
    }).strict(),
    m.object({
      mode: m.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: ee,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: m.array(ee).optional(),
      pivot: ee,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: m.record(ee, Er).optional()
    }).strict()
  ])
}).strict(), Yi = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Qi = m.object({
  show: m.boolean().optional(),
  indicator: m.enum(["dot", "line", "dashed"]).optional(),
  showTotal: m.boolean().optional()
}).strict(), Ir = m.union([m.number(), m.literal("auto")]), wn = m.object({
  label: m.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: m.boolean().optional(),
  hide: m.boolean().optional(),
  scale: m.enum(["linear", "log"]).optional(),
  domain: m.tuple([Ir, Ir]).optional(),
  tickFormat: on.optional()
}).strict(), Ji = m.object({
  x: wn.optional(),
  y: wn.optional(),
  y2: wn.optional()
}).strict(), Xi = m.object({
  byKey: m.record(m.string(), Ve).optional(),
  ramp: m.array(Ve).optional()
}).strict(), Ea = m.object({
  family: Wi,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Ui.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Yi.optional(),
  tooltip: Qi.optional(),
  axes: Ji.optional(),
  colors: Xi.optional(),
  format: on.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Zi = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), es = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), ts = m.object({
  variable: m.string().min(1),
  control: m.discriminatedUnion("kind", [
    m.object({
      kind: m.literal("dateRange"),
      presets: m.array(m.string()).optional(),
      allowFuture: m.boolean().optional()
    }).strict(),
    m.object({
      kind: m.literal("granularity"),
      options: m.array(Ye).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: m.string().optional()
    }).strict(),
    m.object({
      kind: m.literal("select"),
      options: m.array(m.object({ value: Pa, label: m.string() }).strict()),
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
}).strict(), rr = {
  id: m.string().min(1),
  title: m.string().optional()
}, ns = m.object({ ...rr, type: m.literal("chart"), query: ja, chart: Ea }).strict(), rs = m.object({ ...rr, type: m.literal("text"), doc: Zi }).strict(), as = m.object({ ...rr, type: m.literal("input"), control: ts }).strict(), os = m.discriminatedUnion("type", [
  ns,
  rs,
  as
]), is = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), ss = m.object({
  cols: m.number().optional(),
  rowHeight: m.number().optional(),
  margin: m.tuple([m.number(), m.number()]).optional(),
  containerPadding: m.tuple([m.number(), m.number()]).optional()
}).strict(), Ia = m.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), ls = m.object({
  name: m.string().min(1),
  type: Ia,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: Pa.optional()
}).strict(), Va = {
  schemaVersion: m.literal(tt),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, qa = m.object({ ...Va, kind: m.literal("chart"), query: ja, chart: Ea }).strict(), Ka = m.object({
  ...Va,
  kind: m.literal("dashboard"),
  variables: m.array(ls),
  widgets: m.array(os),
  layout: m.array(is),
  grid: ss.optional()
}).strict(), Ba = m.discriminatedUnion("kind", [qa, Ka]), cs = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function us(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > tt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${tt} — update the library`
    );
  for (; n < tt; ) {
    const a = cs[n];
    if (!a) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = a(t), n += 1, t.schemaVersion = n;
  }
  return Ba.parse(t);
}
function Yf(e) {
  try {
    return { ok: !0, spec: us(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Qf(e) {
  return Ba.parse(e);
}
function ms(e) {
  return Di(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ds(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ge = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], fs = /* @__PURE__ */ new Set(["bar", "line", "area", "pie"]), Cn = 8;
function Tn(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : ge, a = (t == null ? void 0 : t.byKey) ?? {}, r = (u, d) => a[u] ?? d, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = r(u.key, u.colorToken);
    d && o.add(d);
  }
  let l = 0;
  const s = () => {
    for (let u = 0; u < n.length; u++) {
      const d = n[l++ % n.length];
      if (!o.has(d))
        return o.add(d), d;
    }
    return n[l++ % n.length];
  };
  return e.map((u) => r(u.key, u.colorToken) ?? s());
}
function Vr(e, t) {
  const n = Tn(e, t);
  return e.forEach((a, r) => {
    a.colorToken = n[r];
  }), e;
}
function hs(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function Kt(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = hs(e[n]);
  return t;
}
function ps(e) {
  return {
    measures: Kt(e.measures ?? {}),
    dimensions: Kt(e.dimensions ?? {}),
    segments: Kt(e.segments ?? {}),
    timeDimensions: Kt(e.timeDimensions ?? {})
  };
}
function nt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function sn(e, t, n) {
  const a = e == null ? void 0 : e.meta, r = {};
  (a == null ? void 0 : a.unit) !== void 0 && (r.unit = a.unit), (a == null ? void 0 : a.quantity) !== void 0 && (r.quantity = a.quantity), (a == null ? void 0 : a.convert) !== void 0 && (r.convert = a.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && r.unit === void 0 && (r.unit = "%");
  let l = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!l || l.kind === void 0 || l.kind === "auto") && (l = { ...l, kind: "currency" }), l && (r.format = l), t != null && t.axis && (r.axis = t.axis), t != null && t.stackId && (r.stackId = t.stackId), t != null && t.curve && (r.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (r.dots = t.dots), r;
}
function gs(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function bs(e, t) {
  var a, r;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, l] of Object.entries(e.measures)) {
    const s = (a = l.meta) == null ? void 0 : a.unit;
    if (!s || ((r = l.meta) == null ? void 0 : r.convert) === !1) continue;
    const c = t.conversions[s];
    c && (n.set(o, { to: c.toImperial, unit: c.imperialUnit }), e.measures[o] = { ...l, meta: { ...l.meta, unit: c.imperialUnit } });
  }
  return n;
}
function ys(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const a = { ...n };
    for (const [r, o] of t) {
      const l = ln(a[r]);
      l !== null && (a[r] = o.to(l));
    }
    return a;
  });
}
function vs(e, t) {
  var n;
  if (t.size !== 0)
    for (const a of e) {
      const r = (n = a.meta) != null && n.measure ? t.get(a.meta.measure) : void 0;
      r && (a.data = a.data.map((o) => o === null ? null : r.to(o)));
    }
}
function xs(e, t, n, a) {
  const r = ps(e.annotation()), o = bs(r, a), l = ys(e.tablePivot(), o), s = t.mapping;
  if (!s) {
    const d = n.measures ?? [];
    if (fs.has(t.family) && d.length > 0) {
      const h = l[0] ?? {}, p = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => ln(h[y])),
          meta: { ...sn(nt(r, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Vr(p, t.colors), { categories: d.map(
        (y) => {
          var g, v;
          return ((g = nt(r, y)) == null ? void 0 : g.shortTitle) ?? ((v = nt(r, y)) == null ? void 0 : v.title) ?? y;
        }
      ), series: p, raw: { rows: l, annotation: r, query: n }, empty: l.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: l, annotation: r, query: n },
      empty: l.length === 0
    };
  }
  const c = s.series.mode === "measures" ? Ns(e, s.series, t, r) : ws(e, s.category.member, s.series, t, r), u = ks(e, s);
  return vs(c, o), Vr(c, t.colors), {
    categories: u,
    series: c,
    raw: { rows: l, annotation: r, query: n },
    empty: l.length === 0
  };
}
function ks(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((r) => r.x);
}
function Ns(e, t, n, a) {
  const { members: r, meta: o } = t, l = e.chartPivot();
  return r.map((s) => {
    const c = nt(a, s), u = o == null ? void 0 : o[s], d = l.map((h) => ln(h[s]));
    return {
      key: s,
      label: gs(c, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...sn(c, u, n.format), measure: s }
    };
  });
}
function ws(e, t, n, a, r) {
  const { value: o, values: l, pivot: s } = n, c = l && l.length > 0 ? l : [o], u = new Set(c), d = c.length > 1, h = { x: [t], y: [s, "measures"] }, b = e.seriesNames(h).filter((S) => {
    const _ = S.yValues && S.yValues.length >= 2 ? S.yValues[S.yValues.length - 1] : void 0;
    return _ === void 0 || u.has(_);
  }), y = e.chartPivot(h), g = nt(r, o), v = b.map((S) => {
    var K, I;
    const _ = (K = S.yValues) == null ? void 0 : K[0], N = S.yValues && S.yValues.length >= 2 ? S.yValues[S.yValues.length - 1] : o, R = nt(r, N), C = (R == null ? void 0 : R.shortTitle) ?? (R == null ? void 0 : R.title) ?? N, k = _ ?? S.shortTitle ?? S.title ?? S.key, D = d ? `${C} · ${k}` : k, L = y.map((B) => ln(B[S.key])), V = (I = n.meta) == null ? void 0 : I[N];
    return {
      key: S.key,
      label: D,
      data: L,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...sn(R ?? g, V, a.format),
        measure: N
      }
    };
  });
  return Cs(v, g, a.format);
}
function Cs(e, t, n) {
  var d, h, p;
  if (e.length <= Cn) return e;
  const a = (b) => b.data.reduce((y, g) => y + (g ?? 0), 0), r = [...e].sort((b, y) => a(y) - a(b)), o = r.slice(0, Cn - 1), l = r.slice(Cn - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: s }, (b, y) => {
    let g = 0, v = !1;
    for (const S of l) {
      const _ = S.data[y];
      _ !== null && (g += _, v = !0);
    }
    return v ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${l.length})`,
    data: c,
    meta: { ...sn(t, void 0, n), ...(p = (h = o[0]) == null ? void 0 : h.meta) != null && p.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function ln(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function ot(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Ss = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function _s(e, t, n) {
  var a;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (a = n.find((r) => r.name === e)) == null ? void 0 : a.default;
}
function Mt(e, t, n) {
  var a;
  if (Se(e)) {
    const r = e.var;
    return Object.prototype.hasOwnProperty.call(n, r) && n[r] !== void 0 ? n[r] : (a = t.get(r)) == null ? void 0 : a.default;
  }
  return e;
}
function Rs(e, t, n) {
  const a = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return a ? { member: e.member, operator: e.operator } : void 0;
  const r = [];
  for (const o of e.values) {
    const l = Mt(o, t, n);
    if (!ot(l))
      if (Array.isArray(l))
        for (const s of l)
          ot(s) || r.push(s);
      else
        r.push(l);
  }
  return r.length === 0 ? a ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: r };
}
function As(e, t, n) {
  if ("and" in e) {
    const a = Fn(e.and, t, n);
    return a.length > 0 ? { and: a } : void 0;
  }
  if ("or" in e) {
    const a = Fn(e.or, t, n);
    return a.length > 0 ? { or: a } : void 0;
  }
  return Rs(e, t, n);
}
function Fn(e, t, n) {
  const a = [];
  for (const r of e) {
    const o = As(r, t, n);
    o !== void 0 && a.push(o);
  }
  return a;
}
function Ms(e, t, n) {
  const a = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const r = Mt(e.granularity, t, n);
    ot(r) || (a.granularity = r);
  }
  if (e.dateRange !== void 0) {
    const r = Mt(e.dateRange, t, n);
    ot(r) || (a.dateRange = r);
  }
  return e.compareDateRange !== void 0 && (a.compareDateRange = e.compareDateRange), a;
}
function Os(e, t, n) {
  const a = Ss(n), r = {};
  if (e.measures !== void 0 && (r.measures = [...e.measures]), e.dimensions !== void 0 && (r.dimensions = [...e.dimensions]), e.segments !== void 0 && (r.segments = [...e.segments]), e.timeDimensions !== void 0 && (r.timeDimensions = e.timeDimensions.map((o) => Ms(o, a, t))), e.filters !== void 0) {
    const o = Fn(e.filters, a, t);
    o.length > 0 && (r.filters = o);
  }
  if (e.order !== void 0 && (r.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Mt(e.limit, a, t);
    ot(o) || (r.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Mt(e.offset, a, t);
    ot(o) || (r.offset = o);
  }
  return e.total !== void 0 && (r.total = e.total), e.timezone !== void 0 && (r.timezone = e.timezone), r;
}
function Ds(e, t) {
  let n = {};
  for (const o of e)
    o.default !== void 0 && (n[o.name] = o.default);
  if (t)
    for (const o of Object.keys(t)) {
      const l = t[o];
      l !== void 0 && (n[o] = l);
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
    set(o, l) {
      if (l === void 0) {
        if (!Object.prototype.hasOwnProperty.call(n, o)) return;
        const s = { ...n };
        delete s[o], n = s;
      } else {
        if (n[o] === l) return;
        n = { ...n, [o]: l };
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
const zs = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Ls = "MMM d, yyyy";
function Ts(e) {
  if (e instanceof Date) return kt(e) ? e : null;
  if (typeof e == "number") {
    const a = new Date(e);
    return kt(a) ? a : null;
  }
  const t = Yt(e);
  if (kt(t)) return t;
  const n = new Date(e);
  return kt(n) ? n : null;
}
function Ha(e) {
  return /^\d{4}-\d{2}/.test(e) ? kt(Yt(e)) : !1;
}
function Fs(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? zs[t] : Ls;
}
function St(e, t, n) {
  const a = Ts(e);
  return a ? de(a, Fs(t, n)) : String(e);
}
function Jf(e, t) {
  return (n) => n == null ? "" : St(n, e, t);
}
function Xf(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? St(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? St(e, t.format, t.granularity) : String(e) : Ha(e) ? St(e, t.format, t.granularity) : e;
}
const qr = "—", $s = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Kr(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ps(e, t) {
  const n = Math.abs(e);
  for (const { limit: a, suffix: r } of $s)
    if (n >= a) return Kr((e / a).toFixed(t)) + r;
  return Kr(e.toFixed(t));
}
function js(e, t, n) {
  const a = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (a.minimumFractionDigits = t.decimals, a.maximumFractionDigits = t.decimals) : a.maximumFractionDigits = 2, new Intl.NumberFormat(n, a).format(e);
}
function Es(e, t) {
  const { format: n, meta: a, locale: r } = t, o = n != null && n.abbreviate ? Ps(e, n.decimals ?? 1) : js(e, n, r), l = (n == null ? void 0 : n.suffix) ?? ((a == null ? void 0 : a.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${l ? ` ${l}` : ""}`;
}
function Wa(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Is(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Wa(e.value) ? !0 : typeof e.value == "string" ? Ha(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const ar = (e) => {
  const { value: t, format: n, granularity: a } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? qr : (Wa(t) || typeof t == "string" || typeof t == "number") && Is(e) ? St(t, n, a) : typeof t == "number" ? Es(t, e) : String(t);
};
function Vs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Zf(e, t) {
  return (n, a) => {
    const r = a ? Vs(a, t) : void 0;
    return ar({
      value: n,
      meta: r == null ? void 0 : r.meta,
      title: (r == null ? void 0 : r.shortTitle) ?? (r == null ? void 0 : r.title),
      role: "value",
      format: e
    });
  };
}
function qs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Ks(e) {
  const t = Ye.safeParse(e);
  return t.success ? t.data : void 0;
}
function Bs(e, t) {
  var a;
  const n = (a = t.mapping) == null ? void 0 : a.category.member;
  if (!(!n || !e)) {
    for (const r of Object.keys(e.timeDimensions))
      if (r !== n && r.startsWith(`${n}.`)) {
        const o = Ks(r.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function Ga(e, t, n, a) {
  const r = Bs(e, t);
  return {
    value(o, l, s = "value") {
      const c = l ? qs(l, e) : void 0, u = c == null ? void 0 : c.meta;
      return n({
        value: o,
        member: l,
        meta: u,
        title: (c == null ? void 0 : c.shortTitle) ?? (c == null ? void 0 : c.title),
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
class Hs extends Error {
}
const Ws = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Hs(`"${e}" cannot be parsed into a number`);
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
function Br(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Gs extends Error {
}
class Hr extends Error {
}
class Us extends Error {
}
class Sn extends Error {
}
class Ys extends Error {
}
class Qs {
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
      throw new Hr(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Br(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Us(`Cannot convert incompatible measures of ${r.measure} and ${o.measure}`);
    let l = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (l = this.cls.sub(l, this.convertFraction(o.unit.anchor_shift))), o.system != r.system) {
      const c = this.measureData[o.measure].anchors;
      if (c == null)
        throw new Sn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${r.measure}" measures.`);
      const u = c[o.system];
      if (u == null)
        throw new Sn(`Unable to find anchor for "${o.measure}" to "${r.measure}". Please make sure it is defined.`);
      const d = (n = u[r.system]) === null || n === void 0 ? void 0 : n.transform, h = (a = u[r.system]) === null || a === void 0 ? void 0 : a.ratio;
      if (typeof d == "function")
        l = d(l, this.cls);
      else if (typeof h == "number")
        l = this.cls.mul(l, h);
      else if (Br(h))
        l = this.cls.mul(l, this.convertFraction(h));
      else
        throw new Sn("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return r.unit.anchor_shift && (l = this.cls.add(l, this.convertFraction(r.unit.anchor_shift))), this.cls.div(l, this.convertFraction(r.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, a, r;
    if (this.origin == null)
      throw new Hr(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let l = [], s = o ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (l = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (a = t.cutOffNumber) !== null && a !== void 0 ? a : s, c = (r = t.system) !== null && r !== void 0 ? r : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const h = this.describe(d);
      if (l.indexOf(d) === -1 && h.system === c) {
        const b = this.to(d);
        if (o ? this.cls.gt(b, s) : this.cls.lt(b, s))
          continue;
        (u === null || (o ? this.cls.lte(b, s) && this.cls.gt(b, u.val) : this.cls.gte(b, s) && this.cls.lt(b, u.val))) && (u = {
          val: b,
          unit: d,
          singular: h.singular,
          plural: h.plural
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
        for (const [o, l] of Object.entries(r.systems))
          for (const [s, c] of Object.entries(l))
            n.push(this.describeUnit({
              abbr: s,
              measure: a,
              system: o,
              unit: c
            }));
    else {
      if (!this.isMeasure(t))
        throw new Ys(`Meausure "${t}" not found.`);
      const a = this.measureData[t];
      for (const [r, o] of Object.entries(a.systems))
        for (const [l, s] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: l,
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
    throw new Gs(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
      for (const l of Object.values(o))
        n = [
          ...n,
          ...Object.keys(l)
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
function Js(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, a] of Object.entries(e))
    for (const [r, o] of Object.entries(a.systems))
      for (const [l, s] of Object.entries(o))
        t.set(l, {
          measure: n,
          system: r,
          abbr: l,
          unit: s
        });
  return t;
}
function Xs(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Js(e);
  return (a) => new Qs({
    measures: e,
    unitCache: n,
    cls: Ws
  }, a);
}
const Zs = {
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
}, el = {
  systems: {
    metric: Zs
  }
}, tl = {
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
}, nl = {
  systems: {
    SI: tl
  }
}, rl = {
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
}, al = {
  systems: {
    SI: rl
  }
}, ol = {
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
}, il = {
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
}, sl = {
  systems: {
    metric: ol,
    imperial: il
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
}, ll = {
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
}, cl = {
  systems: {
    SI: ll
  }
}, ul = {
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
}, ml = {
  systems: {
    SI: ul
  }
}, dl = {
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
}, fl = {
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
}, hl = {
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
}, pl = {
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
}, gl = {
  systems: {
    bit: dl,
    byte: fl,
    IECBit: hl,
    IECByte: pl
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
}, bl = {
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
}, yl = {
  systems: {
    metric: bl
  }
}, vl = {
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
}, xl = {
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
}, kl = {
  systems: {
    SI: vl,
    nutrition: xl
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
}, Nl = {
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
}, wl = {
  systems: {
    SI: Nl
  }
}, Cl = {
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
}, Sl = {
  systems: {
    SI: Cl
  }
}, _l = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, Rl = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Al = {
  systems: {
    metric: _l,
    imperial: Rl
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
}, Ml = {
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
}, Ol = {
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
}, Dl = {
  systems: {
    metric: Ml,
    imperial: Ol
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
}, zl = {
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
}, Ll = {
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
}, Tl = {
  systems: {
    metric: zl,
    imperial: Ll
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
}, Fl = {
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
}, $l = {
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
}, Pl = {
  systems: {
    metric: Fl,
    imperial: $l
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
}, jl = {
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
}, El = {
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
}, Il = {
  systems: {
    metric: jl,
    imperial: El
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
}, Vl = {
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
}, ql = {
  systems: {
    SI: Vl
  }
}, Kl = {
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
}, Bl = {
  systems: {
    unit: Kl
  }
}, Hl = {
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
}, Wl = {
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
}, Gl = {
  systems: {
    metric: Hl,
    imperial: Wl
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
}, Ul = {
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
}, Yl = {
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
}, Ql = {
  systems: {
    metric: Ul,
    imperial: Yl
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
}, Jl = {
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
}, Xl = {
  systems: {
    SI: Jl
  }
}, Zl = {
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
}, ec = {
  systems: {
    SI: Zl
  }
}, tc = {
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
}, nc = {
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
}, rc = {
  systems: {
    metric: tc,
    imperial: nc
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
}, ac = {
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
}, oc = {
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
}, ic = {
  systems: {
    metric: ac,
    imperial: oc
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
}, sc = {
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
}, lc = {
  systems: {
    SI: sc
  }
}, cc = {
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
}, uc = {
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
}, mc = {
  systems: {
    metric: cc,
    imperial: uc
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
}, dc = {
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
}, fc = {
  systems: {
    SI: dc
  }
}, hc = {
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
}, pc = {
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
}, gc = {
  systems: {
    metric: hc,
    imperial: pc
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
}, bc = {
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
}, yc = {
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
}, vc = {
  systems: {
    metric: bc,
    imperial: yc
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
}, xc = {
  acceleration: el,
  angle: nl,
  apparentPower: al,
  area: sl,
  charge: cl,
  current: ml,
  digital: gl,
  each: yl,
  energy: kl,
  force: wl,
  frequency: Sl,
  illuminance: Al,
  length: Dl,
  mass: Tl,
  massFlowRate: Pl,
  pace: Il,
  partsPer: ql,
  pieces: Bl,
  power: Gl,
  pressure: Ql,
  reactiveEnergy: Xl,
  reactivePower: ec,
  speed: rc,
  torque: mc,
  temperature: ic,
  time: lc,
  voltage: fc,
  volume: gc,
  volumeFlowRate: vc
}, kc = Xs(xc), Nc = {
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
function wc(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => kc(t).from(e.from).to(e.to)
  };
}
const $n = {
  ...Object.fromEntries(
    Object.entries(Nc).map(([e, t]) => [e, wc(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function cn(e) {
  return e ? { ...$n, ...e } : $n;
}
function Cc(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Sc(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function _c(e) {
  return e != null && e.quantity ? Sc(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const Rc = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Ac(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Wr(e, t) {
  const n = e * (Rc[t ?? "ms"] ?? 1), a = n < 0 ? "-" : "";
  let r = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], l = o.map(([c, u], d) => {
    const h = d < o.length - 1 ? Math.floor(r / c) : Math.round(r / c);
    return r -= h * c, [h, u];
  }), s = l.findIndex((c) => c[0] > 0);
  return s === -1 ? "0s" : a + l.slice(s, s + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function _n(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const r = Math.abs(e);
    for (const [o, l] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (r >= o) return Ac((e / o).toFixed(n.decimals ?? 1)) + l;
  }
  const a = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, a).format(e);
}
function Mc(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Gr(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Ua(e = $n) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return ar(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, a = t.meta, r = a == null ? void 0 : a.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return Wr(n, a == null ? void 0 : a.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return Gr(_n(n, t), o.prefix, o.suffix);
    }
    if (r === "time") return Wr(n, a == null ? void 0 : a.unit);
    if (r === "count" || (a == null ? void 0 : a.convert) === !1) return Gr(_n(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const l = a == null ? void 0 : a.unit, s = l ? Mc(r, l) : {}, c = (o == null ? void 0 : o.prefix) ?? s.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : s.suffix ?? "";
    return `${c}${_n(n, t)}${u}`;
  };
}
function w(...e) {
  return Zo(Xo(e));
}
function or(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function Oc({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: w("animate-pulse rounded-md bg-muted", e), ...t });
}
const Dc = nr(
  "relative w-full rounded-lg border border-border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), ir = x.forwardRef(({ className: e, variant: t, ...n }, a) => /* @__PURE__ */ i(
  "div",
  {
    ref: a,
    "data-slot": "alert",
    role: "alert",
    className: w(Dc({ variant: t }), e),
    ...n
  }
));
ir.displayName = "Alert";
const sr = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: w("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", e),
      ...t
    }
  )
);
sr.displayName = "AlertTitle";
const lr = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: w(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        e
      ),
      ...t
    }
  )
);
lr.displayName = "AlertDescription";
const Ft = m.object({
  axis: m.enum(["x", "y"]),
  value: m.number(),
  label: m.string().optional(),
  colorToken: Ve.optional()
}).strict(), cr = m.boolean().optional(), zc = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(Ft).optional(),
  comparePrevious: cr
}).strict(), ur = m.enum(["linear", "monotone", "step", "natural"]), Lc = m.object({
  curve: ur.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(Ft).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: cr
}).strict(), Tc = m.object({
  curve: ur.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(Ft).optional(),
  comparePrevious: cr
}).strict(), Fc = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), $c = m.object({
  x: ee,
  y: ee,
  size: ee.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: ee.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(Ft).optional()
}).strict(), Pc = m.object({
  display: m.enum(["number", "gauge"]).optional(),
  measure: ee,
  comparison: m.object({
    mode: m.enum(["previousPeriod", "value"]),
    value: m.union([ee, m.number()]).optional(),
    showAsPercent: m.boolean().optional(),
    goodDirection: m.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: m.object({
    member: ee.optional(),
    timeDimension: ee.optional(),
    granularity: m.union([Ye, Qt]).optional(),
    dateRange: m.union([zn, Qt]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: m.enum(["up", "down"]).optional(),
  gauge: m.object({
    min: m.number().optional(),
    max: m.number(),
    thresholds: m.array(m.object({ at: m.number(), colorToken: Ve }).strict()).optional()
  }).strict().optional(),
  icon: m.string().optional()
}).strict(), jc = m.object({
  member: ee,
  label: m.string().optional(),
  format: on.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), Ec = m.object({
  member: ee,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: Ve.optional()
}).strict(), Ic = m.object({
  columns: m.array(jc).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(Ec).optional()
}).strict(), Vc = m.object({
  member: ee,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: Ve.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), qc = m.object({
  series: m.array(Vc),
  referenceLines: m.array(Ft).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: ur.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), Kc = {
  bar: zc,
  line: Lc,
  area: Tc,
  pie: Fc,
  scatter: $c,
  kpi: Pc,
  table: Ic,
  combo: qc
};
function eh(e) {
  return Kc[e];
}
const Ya = {
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
function Ur(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Pn(e, t) {
  if (t === void 0) return e;
  if (!Ur(e) || !Ur(t))
    return t;
  const n = { ...e };
  for (const a of Object.keys(t)) {
    const r = t[a];
    r !== void 0 && (n[a] = a in e ? Pn(e[a], r) : r);
  }
  return n;
}
function Bc(e) {
  const t = Ya[e.family];
  return {
    ...Pn({ ...t.envelope }, e),
    familyOptions: Pn(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
function mr(e) {
  return e.categories.map((t, n) => {
    const a = { __cat: typeof t == "number" ? t : String(t) };
    for (const r of e.series) a[r.key] = r.data[n] ?? null;
    return a;
  });
}
function ut(e) {
  return e === "top" ? "top" : "bottom";
}
function mt(e) {
  return "horizontal";
}
function dt(e) {
  return "center";
}
function ve(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function De(e) {
  return e == null ? void 0 : e.domain;
}
function ze(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Hc(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function _t(e) {
  return `var(${or(e.key)})`;
}
function Wc(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Qa(e) {
  return e === "stacked" || e === "percent";
}
function un(e, t) {
  var s, c, u, d, h, p, b, y, g, v, S, _, N, R;
  const n = e.raw.annotation, a = (C) => {
    var k, D, L, V, K, I;
    if (C)
      return ((k = n == null ? void 0 : n.measures[C]) == null ? void 0 : k.shortTitle) ?? ((D = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : D.shortTitle) ?? ((L = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : L.shortTitle) ?? ((V = n == null ? void 0 : n.measures[C]) == null ? void 0 : V.title) ?? ((K = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : K.title) ?? ((I = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : I.title) ?? C;
  }, r = e.series.find((C) => {
    var k;
    return (((k = C.meta) == null ? void 0 : k.axis) ?? "left") !== "right";
  }), o = e.series.find((C) => {
    var k;
    return ((k = C.meta) == null ? void 0 : k.axis) === "right";
  }), l = (C) => {
    var k;
    return C ? (k = C.meta) != null && k.measure ? a(C.meta.measure) : C.label : void 0;
  };
  return {
    x: (c = (s = t.axes) == null ? void 0 : s.x) != null && c.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? a((p = (h = t.mapping) == null ? void 0 : h.category) == null ? void 0 : p.member),
    left: (y = (b = t.axes) == null ? void 0 : b.y) != null && y.labelHide ? void 0 : ((v = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : v.label) ?? l(r),
    right: (_ = (S = t.axes) == null ? void 0 : S.y2) != null && _.labelHide ? void 0 : ((R = (N = t.axes) == null ? void 0 : N.y2) == null ? void 0 : R.label) ?? l(o)
  };
}
function Ee(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function dr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function $t(e, t, n) {
  return (a, r) => {
    const o = r == null ? void 0 : r.dataKey, l = typeof o == "string" || typeof o == "number" ? String(o) : void 0, s = (l ? n == null ? void 0 : n.get(l) : void 0) ?? t ?? l;
    return e.value(a, s, "tooltip");
  };
}
function Xt(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
const Gc = { light: "", dark: ".dark" }, Ja = x.createContext(null);
function Xa() {
  const e = x.useContext(Ja);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const qe = x.forwardRef(({ id: e, className: t, children: n, config: a, ...r }, o) => {
  const l = x.useId(), s = `chart-${e || l.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Ja.Provider, { value: { config: a }, children: /* @__PURE__ */ f(
    "div",
    {
      "data-chart": s,
      ref: o,
      className: w(
        "flex h-full w-full justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-none",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ i(Uc, { id: s, config: a }),
        /* @__PURE__ */ i(Un.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
qe.displayName = "ChartContainer";
const Uc = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, a]) => a.theme || a.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Gc).map(
          ([a, r]) => `
${r} [data-chart=${e}] {
${n.map(([o, l]) => {
            var c;
            const s = ((c = l.theme) == null ? void 0 : c[a]) || l.color;
            return s ? `  ${or(o)}: ${s};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, ft = Un.Tooltip, Ze = x.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: a = "dot",
    hideLabel: r = !1,
    hideIndicator: o = !1,
    label: l,
    labelFormatter: s,
    labelClassName: c,
    formatter: u,
    valueFormatter: d,
    color: h,
    nameKey: p,
    labelKey: b
  }, y) => {
    const { config: g } = Xa(), v = x.useMemo(() => {
      var k;
      if (r || !(t != null && t.length))
        return null;
      const [_] = t, N = `${b || (_ == null ? void 0 : _.dataKey) || (_ == null ? void 0 : _.name) || "value"}`, R = jn(g, _, N), C = !b && typeof l == "string" ? ((k = g[l]) == null ? void 0 : k.label) || l : R == null ? void 0 : R.label;
      return s ? /* @__PURE__ */ i("div", { className: w("font-medium", c), children: s(C, t) }) : C ? /* @__PURE__ */ i("div", { className: w("font-medium", c), children: C }) : null;
    }, [l, s, t, r, c, g, b]);
    if (!e || !(t != null && t.length))
      return null;
    const S = t.length === 1 && a !== "dot";
    return /* @__PURE__ */ f(
      "div",
      {
        ref: y,
        className: w(
          "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/40 bg-background px-3 py-2 text-xs shadow-lg",
          n
        ),
        children: [
          S ? null : v,
          /* @__PURE__ */ i("div", { className: "grid gap-1.5", children: t.map((_, N) => {
            var D;
            const R = `${p || _.name || _.dataKey || "value"}`, C = jn(g, _, R), k = h || ((D = _.payload) == null ? void 0 : D.fill) || _.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: w(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  a === "dot" && "items-center"
                ),
                children: u && (_ == null ? void 0 : _.value) !== void 0 && _.name ? u(_.value, _.name, _, N, _.payload) : /* @__PURE__ */ f(re, { children: [
                  C != null && C.icon ? /* @__PURE__ */ i(C.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: w(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": a === "dot",
                          "w-1": a === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": a === "dashed",
                          "my-0.5": S && a === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": k,
                        "--color-border": k
                      }
                    }
                  ),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: w(
                        "flex flex-1 justify-between gap-4 leading-none",
                        S ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ f("div", { className: "grid gap-1.5", children: [
                          S ? v : null,
                          /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: (C == null ? void 0 : C.label) || _.name })
                        ] }),
                        _.value !== void 0 && /* @__PURE__ */ i("span", { className: "font-mono font-medium tabular-nums text-foreground", children: d ? d(_.value, _) : typeof _.value == "number" ? _.value.toLocaleString() : String(_.value) })
                      ]
                    }
                  )
                ] })
              },
              _.dataKey ? String(_.dataKey) : N
            );
          }) })
        ]
      }
    );
  }
);
Ze.displayName = "ChartTooltipContent";
const ht = Un.Legend, et = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: a = "bottom", nameKey: r }, o) => {
    const { config: l } = Xa();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: w(
          "flex items-center justify-center gap-4",
          a === "top" ? "pb-3" : "pt-3",
          e
        ),
        children: n.map((s) => {
          const c = `${r || s.dataKey || "value"}`, u = jn(l, s, c);
          return /* @__PURE__ */ f(
            "div",
            {
              className: w(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              ),
              children: [
                u != null && u.icon && !t ? /* @__PURE__ */ i(u.icon, {}) : /* @__PURE__ */ i(
                  "div",
                  {
                    className: "h-2 w-2 shrink-0 rounded-[2px]",
                    style: { backgroundColor: s.color }
                  }
                ),
                (u == null ? void 0 : u.label) ?? s.value
              ]
            },
            s.value ?? c
          );
        })
      }
    ) : null;
  }
);
et.displayName = "ChartLegendContent";
function jn(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const a = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let r = n;
  return n in t && typeof t[n] == "string" ? r = t[n] : a && n in a && typeof a[n] == "string" && (r = a[n]), r in e ? e[r] : e[n];
}
function Yc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var V, K, I, B, z, A, Y, G, P, U, E, T, Q, ue, ce, H;
  const o = t.familyOptions ?? {}, l = t.orientation === "horizontal", s = Qa(t.stackMode), c = t.stackMode === "percent", u = mr(e), d = (M, X, fe = "value") => c ? Xt(M) : a.value(M, X, fe), h = (M) => a.category(M), p = dr(e), b = Ee(e.series[0]), y = l ? (K = (V = t.axes) == null ? void 0 : V.y) == null ? void 0 : K.hide : (B = (I = t.axes) == null ? void 0 : I.x) == null ? void 0 : B.hide, g = l ? (z = t.axes) == null ? void 0 : z.x : (A = t.axes) == null ? void 0 : A.y, v = !l && e.series.some((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) === "right";
  }), S = Ee(e.series.find((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) !== "right";
  })) ?? b, _ = Ee(e.series.find((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) === "right";
  })), N = un(e, t), R = N.x ? { value: N.x, position: "insideBottom", offset: -2 } : void 0, C = N.x ? { value: N.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, k = N.left ? { value: N.left, position: "insideBottom", offset: -2 } : void 0, D = N.left ? { value: N.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, L = N.right ? { value: N.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(qe, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(
    $o,
    {
      accessibilityLayer: !0,
      data: u,
      layout: l ? "vertical" : "horizontal",
      stackOffset: c ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Dt, { vertical: l, horizontal: !l }),
        l ? /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            Te,
            {
              type: "category",
              dataKey: "__cat",
              hide: y,
              tickFormatter: h,
              label: C
            }
          ),
          /* @__PURE__ */ i(
            rt,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: ze(g),
              domain: De(g),
              tickFormatter: (M) => d(M, b, "axis"),
              label: k
            }
          )
        ] }) : /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            rt,
            {
              type: "category",
              dataKey: "__cat",
              hide: y,
              tickFormatter: h,
              label: R
            }
          ),
          /* @__PURE__ */ i(
            Te,
            {
              yAxisId: "left",
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: ze(g),
              domain: De(g),
              tickFormatter: (M) => d(M, S, "axis"),
              label: D
            }
          ),
          v && /* @__PURE__ */ i(
            Te,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (G = (Y = t.axes) == null ? void 0 : Y.y2) == null ? void 0 : G.hide,
              scale: ze((P = t.axes) == null ? void 0 : P.y2),
              domain: De((U = t.axes) == null ? void 0 : U.y2),
              tickFormatter: (M) => d(M, _, "axis"),
              label: L
            }
          )
        ] }),
        ((E = t.tooltip) == null ? void 0 : E.show) !== !1 && /* @__PURE__ */ i(
          ft,
          {
            content: /* @__PURE__ */ i(
              Ze,
              {
                labelFormatter: (M) => a.category(M),
                indicator: ((T = t.tooltip) == null ? void 0 : T.indicator) ?? "dot",
                valueFormatter: c ? (M) => Xt(M) : $t(a, void 0, p)
              }
            )
          }
        ),
        ve(t).show && /* @__PURE__ */ i(
          ht,
          {
            content: /* @__PURE__ */ i(et, { className: ve(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: ut((Q = t.legend) == null ? void 0 : Q.position),
            layout: mt((ue = t.legend) == null ? void 0 : ue.position),
            align: dt((ce = t.legend) == null ? void 0 : ce.position)
          }
        ),
        e.series.map((M) => {
          var X, fe, Pe, We;
          return /* @__PURE__ */ i(
            pa,
            {
              yAxisId: l ? void 0 : ((X = M.meta) == null ? void 0 : X.axis) === "right" && v ? "right" : "left",
              dataKey: M.key,
              name: M.label,
              stackId: s ? (fe = M.meta) != null && fe.companion ? "__prev" : ((Pe = M.meta) == null ? void 0 : Pe.stackId) ?? "stack" : void 0,
              fill: _t(M),
              fillOpacity: (We = M.meta) != null && We.companion ? 0.4 : void 0,
              radius: Hc(o.barRadius, l),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                ga,
                {
                  dataKey: M.key,
                  position: l ? "right" : "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (Ge) => d(typeof Ge == "boolean" ? Number(Ge) : Ge, Ee(M), "label")
                }
              )
            },
            M.key
          );
        }),
        (H = o.referenceLines) == null ? void 0 : H.map((M, X) => /* @__PURE__ */ i(
          zt,
          {
            yAxisId: l ? void 0 : "left",
            ...M.axis === "y" ? { y: M.value } : { x: M.value },
            label: M.label,
            stroke: `var(--${M.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          X
        ))
      ]
    }
  ) });
}
function Qc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var S, _, N, R, C, k, D, L, V, K, I, B, z, A, Y, G;
  const o = t.familyOptions ?? {}, l = o.chrome === "none", s = mr(e), c = (P) => a.category(P), u = e.series.some((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) === "right";
  }), d = o.curve ?? "monotone", h = dr(e), p = Ee(e.series.find((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) !== "right";
  })), b = Ee(e.series.find((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) === "right";
  })), y = un(e, t), g = !l && o.dots === !0, v = !l;
  return /* @__PURE__ */ i(
    qe,
    {
      config: n,
      className: l ? "aspect-[5/1] w-full" : "h-full w-full min-h-[200px]",
      children: /* @__PURE__ */ f(Po, { accessibilityLayer: !0, data: s, margin: l ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !l && /* @__PURE__ */ i(Dt, { vertical: !1 }),
        /* @__PURE__ */ i(
          rt,
          {
            type: "category",
            dataKey: "__cat",
            hide: l || ((_ = (S = t.axes) == null ? void 0 : S.x) == null ? void 0 : _.hide),
            tickFormatter: c,
            label: !l && y.x ? { value: y.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Te,
          {
            yAxisId: "left",
            type: "number",
            hide: l || ((R = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : R.hide),
            scale: ze((C = t.axes) == null ? void 0 : C.y),
            domain: De((k = t.axes) == null ? void 0 : k.y),
            tickFormatter: (P) => a.value(P, p, "axis"),
            label: !l && y.left ? { value: y.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Te,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: l || ((L = (D = t.axes) == null ? void 0 : D.y2) == null ? void 0 : L.hide),
            scale: ze((V = t.axes) == null ? void 0 : V.y2),
            domain: De((K = t.axes) == null ? void 0 : K.y2),
            tickFormatter: (P) => a.value(P, b, "axis"),
            label: !l && y.right ? { value: y.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !l && ((I = t.tooltip) == null ? void 0 : I.show) !== !1 && /* @__PURE__ */ i(
          ft,
          {
            content: /* @__PURE__ */ i(
              Ze,
              {
                labelFormatter: (P) => a.category(P),
                indicator: ((B = t.tooltip) == null ? void 0 : B.indicator) ?? "line",
                valueFormatter: $t(a, void 0, h)
              }
            )
          }
        ),
        !l && ve(t).show && /* @__PURE__ */ i(
          ht,
          {
            content: /* @__PURE__ */ i(et, { className: ve(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: ut((z = t.legend) == null ? void 0 : z.position),
            layout: mt((A = t.legend) == null ? void 0 : A.position),
            align: dt((Y = t.legend) == null ? void 0 : Y.position)
          }
        ),
        e.series.map((P) => {
          var U, E, T, Q, ue, ce;
          return /* @__PURE__ */ i(
            ba,
            {
              yAxisId: u && ((U = P.meta) == null ? void 0 : U.axis) === "right" ? "right" : "left",
              type: ((E = P.meta) == null ? void 0 : E.curve) ?? d,
              dataKey: P.key,
              name: P.label,
              stroke: _t(P),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (T = P.meta) != null && T.companion ? "5 4" : void 0,
              strokeOpacity: (Q = P.meta) != null && Q.companion ? 0.55 : void 0,
              dot: l || (ue = P.meta) != null && ue.companion ? !1 : ((ce = P.meta) == null ? void 0 : ce.dots) ?? g,
              activeDot: v,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !l,
              children: !l && o.showValueLabels && /* @__PURE__ */ i(
                ga,
                {
                  dataKey: P.key,
                  position: "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (H) => a.value(typeof H == "boolean" ? Number(H) : H, Ee(P), "label")
                }
              )
            },
            P.key
          );
        }),
        !l && ((G = o.referenceLines) == null ? void 0 : G.map((P, U) => /* @__PURE__ */ i(
          zt,
          {
            yAxisId: "left",
            ...P.axis === "y" ? { y: P.value } : { x: P.value },
            label: P.label,
            stroke: `var(--${P.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          U
        )))
      ] })
    }
  );
}
function Jc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var v, S, _, N, R, C, k, D, L, V, K, I, B, z;
  const o = t.familyOptions ?? {}, l = ((S = (v = t.mapping) == null ? void 0 : v.series) == null ? void 0 : S.mode) === "pivot", s = t.stackMode ?? (l ? "stacked" : "none"), c = Qa(s), u = s === "percent", d = mr(e), h = (A) => a.category(A), p = o.curve ?? "monotone", b = dr(e), y = Ee(e.series[0]), g = un(e, t);
  return /* @__PURE__ */ i(qe, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(ya, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Dt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((A) => /* @__PURE__ */ f("linearGradient", { id: `fill-${A.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: _t(A), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: _t(A), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, A.key)) }),
    /* @__PURE__ */ i(
      rt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (N = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : N.hide,
        tickFormatter: h,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Te,
      {
        type: "number",
        hide: (C = (R = t.axes) == null ? void 0 : R.y) == null ? void 0 : C.hide,
        scale: ze((k = t.axes) == null ? void 0 : k.y),
        domain: De((D = t.axes) == null ? void 0 : D.y),
        tickFormatter: (A) => u ? Xt(A) : a.value(A, y, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((L = t.tooltip) == null ? void 0 : L.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Ze,
          {
            labelFormatter: (A) => a.category(A),
            indicator: ((V = t.tooltip) == null ? void 0 : V.indicator) ?? "dot",
            valueFormatter: u ? (A) => Xt(A) : $t(a, void 0, b)
          }
        )
      }
    ),
    ve(t).show && /* @__PURE__ */ i(
      ht,
      {
        content: /* @__PURE__ */ i(et, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((K = t.legend) == null ? void 0 : K.position),
        layout: mt((I = t.legend) == null ? void 0 : I.position),
        align: dt((B = t.legend) == null ? void 0 : B.position)
      }
    ),
    e.series.map((A) => {
      var Y, G, P, U, E, T, Q, ue;
      return /* @__PURE__ */ i(
        Yn,
        {
          type: ((Y = A.meta) == null ? void 0 : Y.curve) ?? p,
          dataKey: A.key,
          name: A.label,
          stackId: c && !((G = A.meta) != null && G.companion) ? ((P = A.meta) == null ? void 0 : P.stackId) ?? "stack" : void 0,
          stroke: _t(A),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (U = A.meta) != null && U.companion ? "5 4" : void 0,
          strokeOpacity: (E = A.meta) != null && E.companion ? 0.55 : void 0,
          fill: (T = A.meta) != null && T.companion ? "none" : `url(#fill-${A.key})`,
          fillOpacity: 1,
          dot: (Q = A.meta) != null && Q.companion ? !1 : ((ue = A.meta) == null ? void 0 : ue.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        A.key
      );
    }),
    (z = o.referenceLines) == null ? void 0 : z.map((A, Y) => /* @__PURE__ */ i(
      zt,
      {
        ...A.axis === "y" ? { y: A.value } : { x: A.value },
        label: A.label,
        stroke: `var(--${A.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      Y
    ))
  ] }) });
}
function Xc({ data: e, options: t, format: n, editing: a }) {
  var g, v, S, _, N;
  const r = t.familyOptions ?? {}, o = e.series[0], l = e.categories.map((R, C) => {
    const k = n.category(R);
    return {
      key: `slice-${C}`,
      label: k,
      value: (o == null ? void 0 : o.data[C]) ?? 0,
      fill: `var(--${ge[C % ge.length]})`
    };
  }), s = Zc(l, r.maxSlices), c = s.reduce((R, C) => R + C.value, 0), u = {};
  s.forEach((R, C) => {
    u[R.key] = {
      label: R.label,
      color: `var(--${ge[C % ge.length]})`
    };
  });
  const d = `${r.innerRadiusPct ?? 0}%`, h = `${r.outerRadiusPct ?? 80}%`, p = (r.innerRadiusPct ?? 0) > 0, b = r.showLabels ?? "percent", y = b === "none" ? !1 : ({ payload: R, percent: C }) => {
    const k = R;
    return b === "name" ? (k == null ? void 0 : k.label) ?? "" : b === "value" ? n.value(k == null ? void 0 : k.value, o == null ? void 0 : o.key, "label") : `${((C !== void 0 ? C : k && c > 0 ? k.value / c : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(qe, { config: u, className: "h-full w-full min-h-[200px] [&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ f(jo, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Ze,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((v = t.tooltip) == null ? void 0 : v.indicator) ?? "dot",
            valueFormatter: $t(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ f(
      Eo,
      {
        data: s,
        dataKey: "value",
        nameKey: "label",
        innerRadius: d,
        outerRadius: h,
        paddingAngle: r.padAngle,
        cornerRadius: r.cornerRadius,
        label: y,
        labelLine: b !== "none" && !p,
        isAnimationActive: !1,
        children: [
          s.map((R) => /* @__PURE__ */ i(va, { fill: R.fill }, R.key)),
          p && r.centerLabel && /* @__PURE__ */ i(
            Io,
            {
              position: "center",
              content: ({ viewBox: R }) => {
                var L, V;
                if (!R || !("cx" in R)) return null;
                const { cx: C, cy: k } = R, D = ((L = r.centerLabel) == null ? void 0 : L.value) === void 0 || r.centerLabel.value === "total" ? n.value(c, o == null ? void 0 : o.key, "label") : r.centerLabel.value;
                return /* @__PURE__ */ f("text", { x: C, y: k, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: C, y: k, className: "fill-foreground text-2xl font-bold", children: D }),
                  ((V = r.centerLabel) == null ? void 0 : V.label) && /* @__PURE__ */ i("tspan", { x: C, y: k + 20, className: "fill-muted-foreground text-xs", children: r.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    ve(t).show && /* @__PURE__ */ i(
      ht,
      {
        content: /* @__PURE__ */ i(
          et,
          {
            nameKey: "label",
            className: ve(t).greyed ? "opacity-40" : void 0
          }
        ),
        verticalAlign: ut((S = t.legend) == null ? void 0 : S.position),
        layout: mt((_ = t.legend) == null ? void 0 : _.position),
        align: dt((N = t.legend) == null ? void 0 : N.position)
      }
    )
  ] }) });
}
function Zc(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((s, c) => c.value - s.value), a = n.slice(0, t - 1), o = n.slice(t - 1).reduce((s, c) => s + c.value, 0), l = t - 1;
  return [
    ...a,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${ge[l % ge.length]})`
    }
  ];
}
function eu({ data: e, options: t, format: n, editing: a }) {
  var y, g, v, S, _, N, R, C, k, D, L, V, K, I, B, z, A, Y, G, P, U, E, T, Q, ue, ce;
  const r = t.familyOptions ?? {}, o = e.raw.annotation, l = e.raw.rows, s = { x: r.x, y: r.y, z: r.size }, c = ((y = o == null ? void 0 : o.measures[r.x]) == null ? void 0 : y.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[r.x]) == null ? void 0 : g.shortTitle) ?? r.x, u = ((v = o == null ? void 0 : o.measures[r.y]) == null ? void 0 : v.shortTitle) ?? ((S = o == null ? void 0 : o.dimensions[r.y]) == null ? void 0 : S.shortTitle) ?? r.y, d = (N = (_ = t.axes) == null ? void 0 : _.x) != null && N.labelHide ? void 0 : ((C = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : C.label) ?? c, h = (D = (k = t.axes) == null ? void 0 : k.y) != null && D.labelHide ? void 0 : ((V = (L = t.axes) == null ? void 0 : L.y) == null ? void 0 : V.label) ?? u, p = tu(l, r), b = {};
  return p.forEach((H, M) => {
    b[H.key] = { label: H.label, color: `var(--${ge[M % ge.length]})` };
  }), /* @__PURE__ */ i(qe, { config: b, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(Vo, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Dt, {}),
    /* @__PURE__ */ i(
      rt,
      {
        type: "number",
        dataKey: "x",
        name: c,
        hide: (I = (K = t.axes) == null ? void 0 : K.x) == null ? void 0 : I.hide,
        scale: ze((B = t.axes) == null ? void 0 : B.x),
        domain: De((z = t.axes) == null ? void 0 : z.x),
        tickFormatter: (H) => n.value(H, r.x, "axis"),
        label: d ? { value: d, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Te,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (Y = (A = t.axes) == null ? void 0 : A.y) == null ? void 0 : Y.hide,
        scale: ze((G = t.axes) == null ? void 0 : G.y),
        domain: De((P = t.axes) == null ? void 0 : P.y),
        tickFormatter: (H) => n.value(H, r.y, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    r.size && /* @__PURE__ */ i(qo, { type: "number", dataKey: "z", range: r.sizeRange ?? [40, 400], name: r.size }),
    ((U = t.tooltip) == null ? void 0 : U.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          Ze,
          {
            indicator: ((E = t.tooltip) == null ? void 0 : E.indicator) ?? "dot",
            valueFormatter: (H, M) => {
              const X = M == null ? void 0 : M.dataKey, fe = typeof X == "string" ? s[X] : void 0;
              return n.value(H, fe, "tooltip");
            }
          }
        )
      }
    ),
    ve(t).show && p.length > 1 && /* @__PURE__ */ i(
      ht,
      {
        content: /* @__PURE__ */ i(et, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((T = t.legend) == null ? void 0 : T.position),
        layout: mt((Q = t.legend) == null ? void 0 : Q.position),
        align: dt((ue = t.legend) == null ? void 0 : ue.position)
      }
    ),
    p.map((H, M) => /* @__PURE__ */ i(
      Ko,
      {
        name: H.label,
        data: H.points,
        shape: r.shape ?? "circle",
        fill: `var(--color-${H.key})`,
        children: p.length === 1 && H.points.map((X, fe) => /* @__PURE__ */ i(va, { fill: `var(--${ge[M % ge.length]})` }, fe))
      },
      H.key
    )),
    (ce = r.referenceLines) == null ? void 0 : ce.map((H, M) => /* @__PURE__ */ i(
      zt,
      {
        ...H.axis === "y" ? { y: H.value } : { x: H.value },
        label: H.label,
        stroke: `var(--${H.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      M
    ))
  ] }) });
}
function tu(e, t) {
  const n = (r) => ({
    x: Rn(r[t.x]),
    y: Rn(r[t.y]),
    ...t.size ? { z: Rn(r[t.size]) } : {}
  });
  if (!t.groupBy)
    return [{ key: "series-0", label: "Points", points: e.map(n) }];
  const a = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = String(r[t.groupBy] ?? "—"), l = a.get(o) ?? [];
    l.push(n(r)), a.set(o, l);
  }
  return [...a.entries()].map(([r, o], l) => ({
    key: `series-${l}`,
    label: r,
    points: o
  }));
}
function Rn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function nu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function ru(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function au(e) {
  var c, u, d, h;
  const { data: t, options: n, format: a } = e, r = n.familyOptions ?? {}, o = (p) => a.value(p, r.measure, "kpi"), l = Za(t.raw.rows, r.measure) ?? 0, s = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[r.measure]) == null ? void 0 : u.shortTitle) ?? ((h = (d = t.raw.annotation) == null ? void 0 : d.measures[r.measure]) == null ? void 0 : h.title) ?? r.measure;
  return r.display === "gauge" ? /* @__PURE__ */ i(cu, { value: l, label: s, fmt: o, fo: r }) : /* @__PURE__ */ i(ou, { ...e, value: l, label: s, fo: r, fmt: o });
}
function ou({
  data: e,
  value: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = n.goodDirection ?? ((u = n.comparison) == null ? void 0 : u.goodDirection) ?? "up", o = mu(e.raw.rows, t, n), l = n.sparkline ? e.series[0] : void 0, s = o ? o.diff : l ? su(l) : 0, c = ru(nu(s, r));
  return /* @__PURE__ */ f("div", { className: "flex h-full w-full flex-col justify-center gap-1", children: [
    /* @__PURE__ */ f("div", { className: "flex items-baseline gap-2", children: [
      /* @__PURE__ */ i("span", { className: "text-4xl font-bold tabular-nums text-foreground", children: a(t) }),
      o && /* @__PURE__ */ i(lu, { delta: o, goodDirection: r, fo: n, fmt: a })
    ] }),
    l && l.data.length > 0 && /* @__PURE__ */ i(iu, { series: l, categories: e.categories, colorClass: c })
  ] });
}
function iu({
  series: e,
  categories: t,
  colorClass: n
}) {
  const a = t.map((r, o) => ({ x: typeof r == "number" ? r : String(r), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: w("mt-2 h-12 w-full", n), children: /* @__PURE__ */ i(Go, { width: "100%", height: "100%", children: /* @__PURE__ */ i(ya, { data: a, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
    Yn,
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
function su(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function lu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = e.diff > 0, o = e.diff === 0, l = o ? !0 : r === (t === "up"), s = o ? ei : r ? Jn : Xn, c = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${a(e.diff)}`;
  return /* @__PURE__ */ f(
    "span",
    {
      className: w(
        "inline-flex items-center gap-0.5 text-sm font-medium",
        o ? "text-muted-foreground" : l ? "text-emerald-600" : "text-destructive"
      ),
      children: [
        /* @__PURE__ */ i(s, { className: "size-3.5" }),
        c
      ]
    }
  );
}
function cu({
  value: e,
  label: t,
  fmt: n,
  fo: a
}) {
  var d, h;
  const r = ((d = a.gauge) == null ? void 0 : d.min) ?? 0, o = ((h = a.gauge) == null ? void 0 : h.max) ?? Math.max(e, 1), l = Math.max(r, Math.min(o, e)), s = uu(e, a) ?? "chart-1", c = [{ name: t, value: l, fill: `var(--${s})` }], u = { value: { label: t, color: `var(--${s})` } };
  return /* @__PURE__ */ f("div", { className: "relative flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ i(qe, { config: u, className: "aspect-square min-h-[180px] w-full", children: /* @__PURE__ */ f(
      Bo,
      {
        data: c,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Ho, { type: "number", domain: [r, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(Wo, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ f("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ i("span", { className: "text-2xl font-bold tabular-nums text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "text-xs text-muted-foreground", children: t })
    ] })
  ] });
}
function uu(e, t) {
  var r;
  const n = (r = t.gauge) == null ? void 0 : r.thresholds;
  if (!(n != null && n.length)) return;
  let a;
  for (const o of [...n].sort((l, s) => l.at - s.at))
    e >= o.at && (a = o.colorToken);
  return a;
}
function Za(e, t) {
  for (const n of e) {
    const a = eo(n[t]);
    if (a !== null) return a;
  }
  return null;
}
function mu(e, t, n) {
  const a = n.comparison;
  if (!a) return null;
  let r = null;
  if (a.mode === "value")
    typeof a.value == "number" ? r = a.value : typeof a.value == "string" && (r = Za(e, a.value));
  else {
    const s = e[1];
    r = s ? eo(s[n.measure]) : null;
  }
  if (r === null) return null;
  const o = t - r, l = r !== 0 ? o / r : null;
  return { current: t, baseline: r, diff: o, pct: l };
}
function eo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const to = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: w("w-full caption-bottom text-sm", e), ...t }) })
);
to.displayName = "Table";
const no = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: w("[&_tr]:border-b", e), ...t }));
no.displayName = "TableHeader";
const ro = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: w("[&_tr:last-child]:border-0", e), ...t }));
ro.displayName = "TableBody";
const Bt = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: w(
        "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        e
      ),
      ...t
    }
  )
);
Bt.displayName = "TableRow";
const En = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: w(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      e
    ),
    ...t
  }
));
En.displayName = "TableHead";
const Ht = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: w("p-2 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
Ht.displayName = "TableCell";
const du = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: w("mt-4 text-sm text-muted-foreground", e), ...t }));
du.displayName = "TableCaption";
const ao = nr(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        outline: "border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        default: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), W = x.forwardRef(
  ({ className: e, variant: t, size: n, type: a, ...r }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: a ?? "button",
      className: w(ao({ variant: t, size: n }), e),
      ...r
    }
  )
);
W.displayName = "Button";
function fu({ data: e, options: t, format: n }) {
  const a = t.familyOptions ?? {}, r = e.raw.rows, o = e.raw.annotation, l = x.useMemo(
    () => hu(r, o, a, n),
    [r, o, a, n]
  ), [s, c] = x.useState(null), [u, d] = x.useState(0), h = a.sortable !== !1, p = a.pageSize ?? 25, b = x.useMemo(() => {
    if (!s) return r;
    const N = s.dir === "asc" ? 1 : -1;
    return [...r].sort((R, C) => vu(R[s.member], C[s.member]) * N);
  }, [r, s]), y = Math.max(1, Math.ceil(b.length / p)), g = Math.min(u, y - 1), v = b.slice(g * p, g * p + p), S = (N) => {
    h && (c(
      (R) => (R == null ? void 0 : R.member) === N ? { member: N, dir: R.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), d(0));
  }, _ = a.rowHeight === "compact";
  return /* @__PURE__ */ f("div", { className: "flex h-full w-full flex-col", children: [
    /* @__PURE__ */ i("div", { className: w("w-full", a.stickyHeader && "max-h-full overflow-auto"), children: /* @__PURE__ */ f(to, { children: [
      /* @__PURE__ */ i(no, { className: w(a.stickyHeader && "sticky top-0 z-10 bg-background"), children: /* @__PURE__ */ f(Bt, { children: [
        a.showRowNumbers && /* @__PURE__ */ i(En, { className: "w-10 text-right", children: "#" }),
        l.map((N) => /* @__PURE__ */ i(
          En,
          {
            className: Yr(N.align),
            style: N.width ? { width: N.width } : void 0,
            children: h ? /* @__PURE__ */ f(
              W,
              {
                variant: "ghost",
                className: "-ml-2 h-7 px-2 text-muted-foreground",
                onClick: () => S(N.member),
                children: [
                  N.label,
                  /* @__PURE__ */ i(yu, { active: (s == null ? void 0 : s.member) === N.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : N.label
          },
          N.member
        ))
      ] }) }),
      /* @__PURE__ */ f(ro, { children: [
        v.map((N, R) => /* @__PURE__ */ f(Bt, { children: [
          a.showRowNumbers && /* @__PURE__ */ i(Ht, { className: w("text-right text-muted-foreground", _ && "py-1"), children: g * p + R + 1 }),
          l.map((C) => {
            const k = xu(C.member, N[C.member], a.conditionalFormat);
            return /* @__PURE__ */ i(
              Ht,
              {
                className: w(Yr(C.align), _ && "py-1"),
                style: k ? { color: k } : void 0,
                children: C.render(N[C.member])
              },
              C.member
            );
          })
        ] }, R)),
        v.length === 0 && /* @__PURE__ */ i(Bt, { children: /* @__PURE__ */ i(
          Ht,
          {
            colSpan: l.length + (a.showRowNumbers ? 1 : 0),
            className: "h-24 text-center text-muted-foreground",
            children: "No data"
          }
        ) })
      ] })
    ] }) }),
    b.length > p && /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2 px-2 py-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ f("span", { children: [
        g * p + 1,
        "–",
        Math.min((g + 1) * p, b.length),
        " of",
        " ",
        b.length
      ] }),
      /* @__PURE__ */ f("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ i(
          W,
          {
            variant: "outline",
            className: "h-7 px-2",
            onClick: () => d((N) => Math.max(0, N - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          W,
          {
            variant: "outline",
            className: "h-7 px-2",
            onClick: () => d((N) => Math.min(y - 1, N + 1)),
            disabled: g >= y - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function hu(e, t, n, a) {
  var l;
  const r = e.length > 0 ? Object.keys(e[0]) : gu(t);
  return ((l = n.columns) != null && l.length ? n.columns : r.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const c = s.member, u = t ? bu(t, c) : void 0, d = t ? c in t.measures : !1, h = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? c, p = s.align ?? (d ? "right" : "left");
    return {
      member: c,
      label: h,
      align: p,
      width: s.width,
      render: (b) => pu(b, d, c, a)
    };
  });
}
function pu(e, t, n, a) {
  if (e == null || e === "") return "—";
  if (t) {
    const r = typeof e == "number" ? e : Number(e);
    return Number.isFinite(r) ? a.value(r, n) : String(e);
  }
  return a.category(e);
}
function gu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function bu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Yr(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function yu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(Jn, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(Xn, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(ti, { className: "ml-1 size-3.5 opacity-50" });
}
function vu(e, t) {
  const n = typeof e == "number" ? e : Number(e), a = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(a) ? n - a : String(e ?? "").localeCompare(String(t ?? ""));
}
function xu(e, t, n) {
  if (!(n != null && n.length)) return;
  const a = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(a)) {
    for (const r of n)
      if (r.member === e && ku(a, r.when.op, r.when.value))
        return `var(--${r.colorToken ?? "chart-1"})`;
  }
}
function ku(e, t, n) {
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
function Nu({ data: e, options: t, format: n, editing: a }) {
  var g, v, S, _, N, R, C, k, D, L, V, K, I, B, z, A, Y, G, P, U, E, T, Q, ue, ce, H;
  const r = t.familyOptions ?? {}, o = r.series ?? [], l = Cu(e, o), s = (M) => n.category(M), c = o.some((M) => M.axis === "right"), u = (g = o.find((M) => M.axis !== "right")) == null ? void 0 : g.member, d = (v = o.find((M) => M.axis === "right")) == null ? void 0 : v.member, h = un(e, t), p = (_ = (S = t.axes) == null ? void 0 : S.y) != null && _.labelHide ? void 0 : ((R = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : R.label) ?? (u ? Wt(e, u) : void 0), b = (k = (C = t.axes) == null ? void 0 : C.y2) != null && k.labelHide ? void 0 : ((L = (D = t.axes) == null ? void 0 : D.y2) == null ? void 0 : L.label) ?? (d ? Wt(e, d) : void 0), y = {};
  return o.forEach((M, X) => {
    const fe = M.colorToken ?? ge[X % ge.length];
    y[M.member] = {
      label: M.label ?? Wt(e, M.member),
      color: `var(--${fe})`
    };
  }), /* @__PURE__ */ i(qe, { config: y, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(Uo, { accessibilityLayer: !0, data: l, children: [
    /* @__PURE__ */ i(Dt, { vertical: !1 }),
    /* @__PURE__ */ i(
      rt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (K = (V = t.axes) == null ? void 0 : V.x) == null ? void 0 : K.hide,
        tickFormatter: s,
        label: h.x ? { value: h.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Te,
      {
        yAxisId: "left",
        type: "number",
        hide: (B = (I = t.axes) == null ? void 0 : I.y) == null ? void 0 : B.hide,
        scale: ze((z = t.axes) == null ? void 0 : z.y),
        domain: De((A = t.axes) == null ? void 0 : A.y),
        tickFormatter: (M) => n.value(M, u, "axis"),
        label: p ? { value: p, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    c && /* @__PURE__ */ i(
      Te,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (G = (Y = t.axes) == null ? void 0 : Y.y2) == null ? void 0 : G.hide,
        scale: ze((P = t.axes) == null ? void 0 : P.y2),
        domain: De((U = t.axes) == null ? void 0 : U.y2),
        tickFormatter: (M) => n.value(M, d, "axis"),
        label: b ? { value: b, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((E = t.tooltip) == null ? void 0 : E.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Ze,
          {
            labelFormatter: (M) => n.category(M),
            indicator: ((T = t.tooltip) == null ? void 0 : T.indicator) ?? "dot",
            valueFormatter: $t(n)
          }
        )
      }
    ),
    ve(t).show && /* @__PURE__ */ i(
      ht,
      {
        content: /* @__PURE__ */ i(et, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((Q = t.legend) == null ? void 0 : Q.position),
        layout: mt((ue = t.legend) == null ? void 0 : ue.position),
        align: dt((ce = t.legend) == null ? void 0 : ce.position)
      }
    ),
    o.map((M) => wu(M, e, r)),
    (H = r.referenceLines) == null ? void 0 : H.map((M, X) => /* @__PURE__ */ i(
      zt,
      {
        yAxisId: "left",
        ...M.axis === "y" ? { y: M.value } : { x: M.value },
        label: M.label,
        stroke: `var(--${M.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      X
    ))
  ] }) });
}
function wu(e, t, n) {
  const a = e.axis === "right" ? "right" : "left", r = `var(${or(e.member)})`, o = e.label ?? Wt(t, e.member), l = e.curve ?? n.curve ?? "monotone", s = e.dots ?? n.dots ?? !1, c = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    pa,
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
    Yn,
    {
      yAxisId: a,
      type: l,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      fill: r,
      fillOpacity: n.fillOpacity ?? 0.25,
      dot: s,
      connectNulls: c
    },
    e.member
  ) : /* @__PURE__ */ i(
    ba,
    {
      yAxisId: a,
      type: l,
      dataKey: e.member,
      name: o,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      dot: s,
      connectNulls: c
    },
    e.member
  );
}
function Cu(e, t) {
  var o, l, s;
  const n = new Map(e.series.map((c) => [c.key, c]));
  if (t.every((c) => n.has(c.member)) && e.categories.length > 0)
    return e.categories.map((c, u) => {
      var h;
      const d = {
        __cat: typeof c == "number" ? c : String(c)
      };
      for (const p of t) d[p.member] = ((h = n.get(p.member)) == null ? void 0 : h.data[u]) ?? null;
      return d;
    });
  const r = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((s = (l = e.raw.query.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : s.dimension);
  return e.raw.rows.map((c) => {
    const u = r ? c[r] : void 0, d = {
      __cat: u == null ? "" : String(u)
    };
    for (const h of t) d[h.member] = Su(c[h.member]);
    return d;
  });
}
function Wt(e, t) {
  var n, a, r, o;
  return ((a = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : a.shortTitle) ?? ((o = (r = e.raw.annotation) == null ? void 0 : r.measures[t]) == null ? void 0 : o.title) ?? t;
}
function Su(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const oo = {
  bar: Yc,
  line: Qc,
  area: Jc,
  pie: Xc,
  scatter: eu,
  kpi: au,
  table: fu,
  combo: Nu
};
function _u({
  data: e,
  options: t,
  config: n,
  format: a,
  state: r,
  components: o,
  editing: l
}) {
  const s = Bc(t);
  if (r != null && r.loading)
    return /* @__PURE__ */ i(Oc, { className: "h-full w-full min-h-[200px]" });
  if (r != null && r.error)
    return /* @__PURE__ */ f(ir, { variant: "destructive", className: "w-full", children: [
      /* @__PURE__ */ i(ka, {}),
      /* @__PURE__ */ i(sr, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(lr, { children: r.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "flex h-full w-full min-h-[200px] items-center justify-center text-sm text-muted-foreground", children: "No data" });
  const c = n && Object.keys(n).length > 0 ? n : Wc(e), u = a ?? Ga(e.raw.annotation, s, ar), d = (o == null ? void 0 : o[s.family]) ?? oo[s.family];
  return /* @__PURE__ */ i(
    d,
    {
      data: e,
      options: s,
      config: c,
      format: u,
      state: r,
      editing: l
    }
  );
}
const fr = xa(null);
fr.displayName = "CubeVizContext";
function Ke() {
  const e = Qn(fr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Ru(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function th({
  cube: e,
  theme: t,
  locale: n,
  registry: a,
  children: r
}) {
  const o = Z(
    () => Ru(e) ? ms(e) : e,
    [e]
  ), l = Z(
    () => {
      var d;
      return {
        chartRamp: (d = t == null ? void 0 : t.chartRamp) != null && d.length ? t.chartRamp : ge,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), s = Z(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), c = Z(() => a ?? {}, [a]), u = Z(
    () => ({
      cubeClient: o,
      registry: c,
      locale: s,
      theme: l
    }),
    [o, c, s, l]
  );
  return /* @__PURE__ */ i(fr.Provider, { value: u, children: /* @__PURE__ */ i(
    "div",
    {
      className: w(
        "contents",
        l.mode === "dark" && "dark",
        l.mode === "light" && "cube-viz-light"
      ),
      children: r
    }
  ) });
}
function Au(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? oo[t];
}
const Mu = 5e3;
function Ou(e, t) {
  const { cubeClient: n } = Ke(), a = (t == null ? void 0 : t.skip) ?? !1, r = Z(
    () => e.limit === void 0 ? { ...e, limit: Mu } : e,
    [e]
  ), o = Z(() => JSON.stringify(r), [r]), [l, s] = at({ isLoading: !a }), [c, u] = at(0), d = Ie(() => u((h) => h + 1), []);
  return Lt(() => {
    if (a) {
      s({ isLoading: !1 });
      return;
    }
    let h = !0;
    return s((p) => ({ resultSet: p.resultSet, isLoading: !0 })), n.load(r, { castNumerics: !0 }).then((p) => {
      h && s({
        resultSet: p,
        isLoading: !1
      });
    }).catch((p) => {
      h && s({
        isLoading: !1,
        error: p instanceof Error ? p : new Error(String(p))
      });
    }), () => {
      h = !1;
    };
  }, [n, o, a, c]), { ...l, refetch: d };
}
const mn = xa(null);
mn.displayName = "DashboardContext";
function hr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const a = e.variables, r = xt(null);
  (r.current === null || r.current.key !== a) && (r.current = { store: Ds(a, t), key: a });
  const o = r.current.store, l = Du(o, a);
  return Yo(mn.Provider, { value: l }, n);
}
function Du(e, t) {
  const n = Qo(
    e.subscribe,
    e.getAll,
    e.getAll
  ), a = Ie(
    (l, s) => e.set(l, s),
    [e]
  ), r = Ie(
    (l) => Os(l, e.getAll(), t),
    [e, t]
  ), o = Ie(
    (l) => _s(l, e.getAll(), t),
    [e, t]
  );
  return Z(
    () => ({ vars: n, setVar: a, resolveQuery: r, resolveValue: o, decls: t }),
    [n, a, r, o, t]
  );
}
function io() {
  const e = Qn(mn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function pr() {
  return Qn(mn);
}
function An(e, t, n) {
  var b;
  const a = pr(), { locale: r } = Ke(), o = Z(
    () => a && !(n != null && n.skipResolve) ? a.resolveQuery(e) : e,
    [a, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: l, isLoading: s, error: c, refetch: u } = Ou(o, { skip: n == null ? void 0 : n.skip }), d = ((b = t.format) == null ? void 0 : b.unitSystem) ?? (r == null ? void 0 : r.unitSystem), h = Z(() => cn(r == null ? void 0 : r.units), [r == null ? void 0 : r.units]);
  return { data: Z(() => {
    if (l)
      return xs(l, t, o, { unitSystem: d, conversions: h });
  }, [l, t, o, d, h]), isLoading: s, error: c, refetch: u, resolvedQuery: o };
}
function Be() {
  const { cubeClient: e } = Ke(), [t, n] = at({ isLoading: !0 });
  return Lt(() => {
    let a = !0;
    return n({ isLoading: !0 }), ds(e).then((r) => {
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
function nh() {
  const { locale: e } = Ke(), { formatValue: t, units: n } = e;
  return Z(
    () => t ?? Ua(cn(n)),
    [t, n]
  );
}
function so() {
  const [e, t] = at(0), n = xt(null), a = xt(null), r = xt(null), o = xt(0), l = Ie((u) => {
    r.current === null && (r.current = requestAnimationFrame(() => {
      r.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), s = Ie(() => {
    a.current && (a.current.disconnect(), a.current = null), r.current !== null && (cancelAnimationFrame(r.current), r.current = null);
  }, []), c = Ie(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== o.current && (o.current = d, t(d));
      const h = new ResizeObserver((p) => {
        var b, y;
        for (const g of p) {
          const v = ((y = (b = g.contentBoxSize) == null ? void 0 : b[0]) == null ? void 0 : y.inlineSize) ?? g.contentRect.width;
          l(v);
        }
      });
      h.observe(u), a.current = h;
    },
    [l, s]
  );
  return Lt(() => s, [s]), [c, e];
}
const zu = "day";
function Lu(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, a = n == null ? void 0 : n.sparkline;
  if (!a) return null;
  const r = a.member ?? (n == null ? void 0 : n.measure), o = (d = e.timeDimensions) == null ? void 0 : d[0], l = a.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!r || !l) return null;
  const s = a.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [r],
    timeDimensions: [
      {
        dimension: l,
        granularity: a.granularity ?? zu,
        ...s !== void 0 ? { dateRange: s } : {}
      }
    ],
    ...e.filters ? { filters: e.filters } : {},
    ...e.segments ? { segments: e.segments } : {},
    // Keep the trend's buckets/relative-ranges in the host timezone (same as the headline).
    ...e.timezone ? { timezone: e.timezone } : {},
    order: [[l, "asc"]]
  }, chart: {
    family: "line",
    mapping: {
      category: { member: l },
      series: { mode: "measures", members: [r] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const ne = (e) => de(e, "yyyy-MM-dd");
function Tu(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const r = Yt(e[0]), o = Yt(e[1]);
    if (Number.isNaN(r.getTime()) || Number.isNaN(o.getTime())) return;
    const l = zi(o, r) + 1;
    return [ne(Ce(r, l)), ne(Ce(r, 1))];
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
      return [ne(bn(yn(t, 2 * r))), ne(Ce(bn(yn(t, r)), 1))];
    if (o.startsWith("quarter"))
      return [ne(vn(xn(t, 2 * r))), ne(Ce(vn(xn(t, r)), 1))];
    if (o.startsWith("year"))
      return [ne(kn(Nn(t, 2 * r))), ne(Ce(kn(Nn(t, r)), 1))];
  }
  if (n === "this week") {
    const r = Li(t, 1);
    return [ne(Ti(r)), ne(Fi(r))];
  }
  if (n === "this month") {
    const r = yn(t, 1);
    return [ne(bn(r)), ne($i(r))];
  }
  if (n === "this quarter") {
    const r = xn(t, 1);
    return [ne(vn(r)), ne(Pi(r))];
  }
  if (n === "this year") {
    const r = Nn(t, 1);
    return [ne(kn(r)), ne(ji(r))];
  }
}
function Fu(e, t) {
  var c, u;
  const n = t.familyOptions ?? {};
  let a;
  if (t.family === "bar" || t.family === "line" || t.family === "area") {
    if (!n.comparePrevious) return null;
    a = "series";
  } else if (t.family === "kpi") {
    if (((c = n.comparison) == null ? void 0 : c.mode) !== "previousPeriod") return null;
    a = "kpiRow";
  } else
    return null;
  const r = (u = e.timeDimensions) == null ? void 0 : u[0];
  if (!r) return null;
  const o = r.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const l = Tu(o);
  return l ? { query: {
    ...e,
    timeDimensions: [{ ...r, dateRange: l, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const $u = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function gr({ query: e, chart: t, onState: n, editing: a }) {
  const { registry: r, locale: o } = Ke(), l = Z(() => {
    var k;
    return (k = t.format) != null && k.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), s = Z(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: c, isLoading: u, error: d, refetch: h, resolvedQuery: p } = An(s, l), b = Z(() => Lu(s, l), [s, l]), y = An(
    (b == null ? void 0 : b.query) ?? s,
    (b == null ? void 0 : b.chart) ?? l,
    { skip: !b }
  ), g = Z(
    () => Fu(p, l),
    [p, l]
  ), v = An(
    (g == null ? void 0 : g.query) ?? s,
    l,
    { skip: !g, skipResolve: !0 }
  ), S = Z(
    () => ({ [l.family]: Au(r, l.family) }),
    [r, l.family]
  ), _ = Z(() => {
    let k = c ?? $u;
    if (b && y.data && (k = { ...k, series: y.data.series, categories: y.data.categories }), g && v.data) {
      if (g.mode === "kpiRow") {
        const D = v.data.raw.rows[0];
        if (D) {
          const L = k.raw.rows[0];
          k = {
            ...k,
            raw: { ...k.raw, rows: L ? [L, D] : [D] }
          };
        }
      } else if (k.series.length > 0) {
        const D = v.data.series.map((L) => {
          const V = k.series.find((K) => K.key === L.key);
          return {
            ...L,
            key: `${L.key}__prev`,
            label: `${(V == null ? void 0 : V.label) ?? L.label} (prev)`,
            colorToken: (V == null ? void 0 : V.colorToken) ?? L.colorToken,
            meta: { ...L.meta, companion: !0 }
          };
        });
        k = { ...k, series: [...k.series, ...D] };
      }
    }
    return k;
  }, [c, b, y.data, g, v.data]);
  Lt(() => {
    n == null || n({ rows: _.raw.rows, refetch: h, isLoading: u });
  }, [n, _.raw.rows, h, u]);
  const N = {}, R = Z(
    () => o.formatValue ?? Ua(cn(o.units)),
    [o.formatValue, o.units]
  ), C = Z(
    () => Ga(_.raw.annotation, l, R, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [_.raw.annotation, l, R, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    _u,
    {
      data: _,
      options: l,
      config: N,
      format: C,
      state: { loading: u && !c, error: d },
      components: S,
      editing: a
    }
  );
}
function Pu({ spec: e }) {
  return /* @__PURE__ */ i(gr, { query: e.query, chart: e.chart });
}
const lo = "cube-viz-prose";
function ju(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Eu({ doc: e }) {
  const t = ju(e), n = Z(
    () => t ? e : null,
    [t, e]
  ), a = Ta(
    {
      extensions: [$a],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: w(lo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(Fa, { editor: a }) : /* @__PURE__ */ i("div", { className: "text-sm text-muted-foreground", children: "Unsupported text content" });
}
const Gt = [
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
], Iu = Object.fromEntries(
  Gt.map((e) => [e.value, e.label])
);
function Qr(e) {
  return Iu[e.trim().toLowerCase()] ?? e;
}
const Vu = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function qu({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: a } = Ii(), r = w(ao({ variant: "outline" }), "size-7 shrink-0 p-0");
  return /* @__PURE__ */ f("div", { className: "mb-2 flex items-center justify-between gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !a,
        onClick: () => a && t(a),
        className: w(r, !a && "opacity-40"),
        children: /* @__PURE__ */ i(Zn, { className: "size-4" })
      }
    ),
    /* @__PURE__ */ i("span", { className: "text-sm font-medium text-foreground", children: de(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: w(r, !n && "opacity-40"),
        children: /* @__PURE__ */ i(an, { className: "size-4" })
      }
    )
  ] });
}
function Ku({ day: e, modifiers: t, className: n, style: a, ...r }) {
  const o = !!t.selected && !t.outside && !t.disabled, l = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...r,
      style: { ...a, color: o ? "var(--primary-foreground)" : l ? "var(--muted-foreground)" : "var(--foreground)" },
      className: w(
        "flex size-9 items-center justify-center rounded-md text-sm font-normal transition-colors",
        // size-9 cells touch edge-to-edge, so a contiguous range reads as one band.
        o ? "bg-primary hover:bg-primary" : "hover:bg-accent",
        t.today && !o && "border border-primary",
        t.disabled && "opacity-40",
        n
      )
    }
  );
}
function co({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...a
}) {
  return /* @__PURE__ */ i(
    Ei,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: w("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-2",
        month_caption: "",
        // Native table: <th> weekdays + <td> days share columns -> always aligned.
        month_grid: "border-collapse",
        weekdays: "",
        weekday: "size-9 p-0 text-xs font-normal text-muted-foreground",
        week: "",
        day: "p-0 text-center align-middle",
        hidden: "invisible",
        ...t
      },
      components: {
        MonthCaption: qu,
        DayButton: Ku,
        Chevron: ({ orientation: r, className: o, ...l }) => /* @__PURE__ */ i(r === "left" ? Zn : an, { className: w("size-4", o), ...l })
      },
      ...a
    }
  );
}
function ke({
  ...e
}) {
  return /* @__PURE__ */ i(Ut.Root, { "data-slot": "popover", ...e });
}
function Ne({
  ...e
}) {
  return /* @__PURE__ */ i(Ut.Trigger, { "data-slot": "popover-trigger", ...e });
}
function we({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ i(Ut.Portal, { children: /* @__PURE__ */ i(
    Ut.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: w(
        "z-50 w-72 origin-[var(--radix-popover-content-transform-origin)] rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...a
    }
  ) });
}
function _e({
  ...e
}) {
  return /* @__PURE__ */ i(be.Root, { "data-slot": "select", ...e });
}
function In({
  ...e
}) {
  return /* @__PURE__ */ i(be.Group, { "data-slot": "select-group", ...e });
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ i(be.Value, { "data-slot": "select-value", ...e });
}
function Ae({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    be.Trigger,
    {
      "data-slot": "select-trigger",
      className: w(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(be.Icon, { asChild: !0, children: /* @__PURE__ */ i(Xe, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Bu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: w("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(ni, { className: "size-4" })
    }
  );
}
function Hu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: w("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Xe, { className: "size-4" })
    }
  );
}
function Me({
  className: e,
  children: t,
  position: n = "popper",
  ...a
}) {
  return /* @__PURE__ */ i(be.Portal, { children: /* @__PURE__ */ f(
    be.Content,
    {
      "data-slot": "select-content",
      className: w(
        "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...a,
      children: [
        /* @__PURE__ */ i(Bu, {}),
        /* @__PURE__ */ i(
          be.Viewport,
          {
            className: w(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(Hu, {})
      ]
    }
  ) });
}
function Vn({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.Label,
    {
      "data-slot": "select-label",
      className: w("px-2 py-1.5 text-xs font-medium text-muted-foreground", e),
      ...t
    }
  );
}
function pe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    be.Item,
    {
      "data-slot": "select-item",
      className: w(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ i(be.ItemIndicator, { children: /* @__PURE__ */ i(Fe, { className: "size-4" }) }) }),
        /* @__PURE__ */ i(be.ItemText, { children: t })
      ]
    }
  );
}
const it = w(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground",
  "shadow-sm transition-colors placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "[&>option]:bg-popover [&>option]:text-popover-foreground",
  "disabled:cursor-not-allowed disabled:opacity-50"
), Wu = "mb-1 block text-xs font-medium text-muted-foreground", Nt = "yyyy-MM-dd";
function Gu(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Jr(e) {
  if (!e) return;
  const t = za(e, Nt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Uu({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, r = a.presets ?? Vu, [o, l] = at(!1), s = typeof e == "string", [c, u] = Gu(e), d = Jr(c), h = Jr(u), p = d ? { from: d, to: h } : void 0;
  let b;
  s ? b = Qr(e) : d && h ? b = `${de(d, "MMM d, yyyy")} – ${de(h, "MMM d, yyyy")}` : d ? b = de(d, "MMM d, yyyy") : b = "Pick a date range";
  const y = a.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ f(ke, { open: o, onOpenChange: l, children: [
    /* @__PURE__ */ i(Ne, { asChild: !0, children: /* @__PURE__ */ f(
      W,
      {
        variant: "outline",
        className: w(
          "w-full justify-start text-left font-normal",
          b === "Pick a date range" && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(Na, { className: "mr-2 size-4" }),
          b
        ]
      }
    ) }),
    /* @__PURE__ */ f(we, { className: "flex w-auto gap-2 p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "flex max-h-80 flex-col gap-1 overflow-y-auto border-r pr-2", children: r.map((g) => /* @__PURE__ */ i(
        W,
        {
          variant: "ghost",
          size: "sm",
          className: "justify-start whitespace-nowrap font-normal",
          onClick: () => {
            t(g), l(!1);
          },
          children: Qr(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        co,
        {
          mode: "range",
          selected: p,
          defaultMonth: d,
          disabled: y,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([de(g.from, Nt), de(g.to, Nt)]) : g != null && g.from ? t([de(g.from, Nt), de(g.from, Nt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Yu = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Qu(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Ju(e) {
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
function Xu({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { resolveValue: r } = io(), o = a.rangeVariable ? Ju(r(a.rangeVariable)) : void 0, l = a.options ?? (o !== void 0 ? Qu(o) : Yu), s = typeof e == "string" ? e : "", c = l.join(",");
  return Lt(() => {
    s && !l.includes(s) && t(l[0]);
  }, [s, c]), /* @__PURE__ */ f(
    _e,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Ae, { className: it, children: /* @__PURE__ */ i(Re, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Me, { children: l.map((u) => /* @__PURE__ */ i(pe, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Zu({ value: e, onChange: t, control: n }) {
  const a = n;
  if (a.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((l) => String(l))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: w(it, "h-auto min-h-[6rem]"),
        value: [...o],
        onChange: (l) => {
          const s = Array.from(l.target.selectedOptions, (u) => u.value), c = a.options.every((u) => typeof u.value == "number");
          t(c ? s.map((u) => Number(u)) : s);
        },
        children: a.options.map((l) => /* @__PURE__ */ i("option", { value: String(l.value), children: l.label }, String(l.value)))
      }
    );
  }
  const r = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ f(
    _e,
    {
      value: r,
      onValueChange: (o) => {
        const l = a.options.find((s) => String(s.value) === o);
        t(l ? l.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(Ae, { className: it, children: /* @__PURE__ */ i(Re, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Me, { children: a.options.map((o) => /* @__PURE__ */ i(pe, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function em({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { meta: r, isLoading: o } = Be(), l = Z(() => {
    if (!r) return [];
    const s = [];
    for (const c of r.cubes)
      if (!(a.cube && c.name !== a.cube)) {
        if (a.from === "measure" || a.from === "dimensionOrMeasure")
          for (const u of c.measures) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (a.from === "dimension" || a.from === "dimensionOrMeasure")
          for (const u of c.dimensions) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return s;
  }, [r, a.cube, a.from]);
  return /* @__PURE__ */ f(
    "select",
    {
      className: it,
      value: typeof e == "string" ? e : "",
      disabled: o,
      onChange: (s) => t(s.target.value || void 0),
      children: [
        /* @__PURE__ */ i("option", { value: "", children: o ? "Loading…" : "—" }),
        l.map((s) => /* @__PURE__ */ i("option", { value: s.name, children: s.label }, s.name))
      ]
    }
  );
}
function tm({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: it,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (r) => t(r.target.value)
    }
  );
}
function nm({ value: e, onChange: t, control: n }) {
  const a = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: it,
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
function rm({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ f("label", { className: "inline-flex cursor-pointer items-center gap-2", children: [
    /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        className: "size-4 rounded border-input text-primary accent-primary focus-visible:ring-1 focus-visible:ring-ring",
        checked: e === !0,
        onChange: (r) => t(r.target.checked)
      }
    ),
    /* @__PURE__ */ i("span", { className: "text-sm text-foreground", children: n.label ?? n.name })
  ] });
}
const am = {
  dateRange: Uu,
  granularity: Xu,
  select: Zu,
  memberSelect: em,
  text: tm,
  number: nm,
  toggle: rm
};
function om({ control: e, title: t }) {
  var b;
  const { registry: n } = Ke(), { decls: a, resolveValue: r, setVar: o } = io(), l = Z(
    () => a.find((y) => y.name === e.variable),
    [a, e.variable]
  );
  if (!l)
    return /* @__PURE__ */ f("div", { className: "text-sm text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const s = e.control.kind, c = ((b = n.controls) == null ? void 0 : b[s]) ?? am[s], u = r(e.variable), d = (y) => o(e.variable, y), h = t ?? l.label ?? l.name, p = Jo();
  return s === "toggle" ? /* @__PURE__ */ i(c, { value: u, onChange: d, decl: l, control: e.control }) : /* @__PURE__ */ f("div", { children: [
    /* @__PURE__ */ i("label", { className: Wu, htmlFor: p, children: h }),
    /* @__PURE__ */ i(
      c,
      {
        value: u,
        onChange: d,
        decl: l,
        control: e.control,
        controlId: p
      }
    )
  ] });
}
const uo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: w(
        "rounded-xl border border-border bg-card text-card-foreground shadow",
        e
      ),
      ...t
    }
  )
);
uo.displayName = "Card";
const mo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: w(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
        e
      ),
      ...t
    }
  )
);
mo.displayName = "CardHeader";
const fo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: w("font-semibold leading-none tracking-tight", e),
      ...t
    }
  )
);
fo.displayName = "CardTitle";
const im = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: w("text-sm text-muted-foreground", e), ...t })
);
im.displayName = "CardDescription";
const sm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: w("col-start-2 row-span-2 row-start-1 self-start justify-self-end", e),
      ...t
    }
  )
);
sm.displayName = "CardAction";
const ho = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: w("px-6 pb-6", e), ...t })
);
ho.displayName = "CardContent";
const lm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: w("flex items-center px-6 pb-6", e), ...t })
);
lm.displayName = "CardFooter";
const Zt = "cube-viz-drag-handle";
function po(e) {
  var s;
  const { registry: t } = Ke(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: a, menu: r, dragHandleProps: o, children: l } = e;
  return /* @__PURE__ */ f(uo, { className: "flex h-full w-full flex-col gap-0 overflow-hidden rounded-xl border-0 bg-muted/40 shadow-none", children: [
    a ? /* @__PURE__ */ f(
      mo,
      {
        ...o,
        className: w(
          Zt,
          "flex shrink-0 cursor-grab flex-row items-center justify-between gap-2",
          "px-4 pb-1 pt-3 active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(fo, { className: "truncate text-sm font-semibold", children: a }),
          r
        ]
      }
    ) : null,
    /* @__PURE__ */ i(ho, { className: "min-h-0 flex-1 overflow-auto px-4 pb-4 pt-1", children: l })
  ] });
}
function cm(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const l = o == null ? "" : String(o);
    return /[",\n\r]/.test(l) ? `"${l.replace(/"/g, '""')}"` : l;
  }, a = t.map(n).join(","), r = e.map((o) => t.map((l) => n(o[l])).join(",")).join(`
`);
  return `${a}
${r}`;
}
function um(e, t, n = "text/csv;charset=utf-8") {
  const a = new Blob([e], { type: n }), r = URL.createObjectURL(a), o = document.createElement("a");
  o.href = r, o.download = t, o.click(), URL.revokeObjectURL(r);
}
function mm({ title: e, rows: t, refetch: n }) {
  const a = t.length > 0;
  if (!a && !n) return null;
  const r = () => {
    const l = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    um(cm(t), `${l}.csv`);
  }, o = (l) => l.stopPropagation();
  return /* @__PURE__ */ f(ke, { children: [
    /* @__PURE__ */ i(
      Ne,
      {
        onMouseDown: o,
        onPointerDown: o,
        onTouchStart: o,
        className: "rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(ri, { className: "size-4" })
      }
    ),
    /* @__PURE__ */ f(we, { align: "end", className: "w-44 p-1", onMouseDown: o, onPointerDown: o, onTouchStart: o, children: [
      n ? /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          onClick: n,
          className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
          children: [
            /* @__PURE__ */ i(ai, { className: "size-3.5 text-muted-foreground" }),
            "Refresh"
          ]
        }
      ) : null,
      /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          onClick: r,
          disabled: !a,
          className: w(
            "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
            !a && "cursor-not-allowed opacity-50"
          ),
          children: [
            /* @__PURE__ */ i(oi, { className: "size-3.5 text-muted-foreground" }),
            "Export CSV"
          ]
        }
      )
    ] })
  ] });
}
function Xr({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(gr, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(Eu, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(om, { control: e.control, title: e.title });
  }
}
function go({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [a, r] = at({ rows: [] }), o = Ie(
    (s) => r({ rows: s.rows, refetch: s.refetch }),
    []
  );
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "h-full w-full overflow-auto p-2", children: /* @__PURE__ */ i(Xr, { widget: e }) });
  const l = n ? null : /* @__PURE__ */ i(mm, { title: e.title, rows: a.rows, refetch: a.refetch });
  return /* @__PURE__ */ i(
    po,
    {
      widget: e,
      title: e.title,
      menu: l,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i(Xr, { widget: e, onState: o })
    }
  );
}
const dm = "lg";
function fm(e) {
  return {
    breakpoints: { lg: 996, md: 768, sm: 480, xs: 0 },
    cols: {
      lg: e,
      md: Math.max(1, Math.round(e * 0.66)),
      sm: Math.max(1, Math.round(e * 0.5)),
      xs: 1
    }
  };
}
function hm(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function rh({ spec: e, editable: t = !1 }) {
  const [n, a] = so(), r = e.grid ?? {}, o = r.cols ?? 12, l = r.rowHeight ?? 40, s = r.margin ?? [12, 12], c = r.containerPadding ?? [0, 0], { breakpoints: u, cols: d } = Z(
    () => fm(o),
    [o]
  ), h = Z(
    () => ({ [dm]: hm(e.layout) }),
    [e.layout]
  ), p = Z(
    () => new Map(e.widgets.map((b) => [b.id, b])),
    [e.widgets]
  );
  return /* @__PURE__ */ i(hr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "w-full", children: a > 0 ? /* @__PURE__ */ i(
    La,
    {
      width: a,
      layouts: h,
      breakpoints: u,
      cols: d,
      rowHeight: l,
      margin: s,
      containerPadding: c,
      dragConfig: { enabled: t, handle: `.${Zt}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((b) => {
        const y = p.get(b.i);
        return y ? /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(go, { widget: y, editable: t }) }, b.i) : null;
      })
    }
  ) : null }) });
}
function ah({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(
    po,
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
      children: /* @__PURE__ */ i(Pu, { spec: e })
    }
  ) });
}
function dn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Ue(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function fn(e) {
  return e ? e.cubes.filter((t) => Ue(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: dn(t)
  })) : [];
}
function Rt(e, t) {
  if (!(!e || !t))
    return fn(e).find((n) => n.name === t);
}
function br(e) {
  return e.shortTitle || e.title || e.name;
}
function en(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function bo(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: br(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: en(n, "quantity"),
    unit: en(n, "unit")
  };
}
function qn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: br(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: en(n, "quantity"),
    unit: en(n, "unit")
  };
}
function yo(e, t) {
  return {
    name: e.name,
    label: br(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Kn(e, t, n) {
  if (!e) return [];
  const a = [];
  for (const r of e.cubes) {
    if (!Ue(r) || n && r.name !== n) continue;
    const o = dn(r), l = (s) => {
      s.connectedComponent = o, a.push(s);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of r.measures)
        Ue(s) && l(bo(s, r.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of r.dimensions)
        Ue(s) && s.type !== "time" && l(qn(s, r.name));
    if (t === "time")
      for (const s of r.dimensions)
        Ue(s) && s.type === "time" && l(qn(s, r.name));
  }
  return a;
}
function pm(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, a = [];
  for (const r of e.cubes) {
    if (!Ue(r) || n && !n.has(r.name)) continue;
    const o = dn(r);
    for (const l of r.segments) {
      if (!Ue(l)) continue;
      const s = yo(l, r.name);
      s.connectedComponent = o, a.push(s);
    }
  }
  return a;
}
function Oe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const a = dn(n), r = (s) => (s && (s.connectedComponent = a), s), o = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (o)
        return o.type ? "aggType" in o ? r(bo(o, n.name)) : r(qn(o, n.name)) : void 0;
      const l = n.segments.find((s) => s.name === t);
      if (l) return r(yo(l, n.name));
    }
}
function gm(e) {
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
const Bn = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), vo = {
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
function wt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function xo(e) {
  var l, s, c, u, d;
  const t = e.query, n = (l = t.measures) == null ? void 0 : l.find(Boolean);
  if (n) return wt(n);
  const a = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (a) return wt(a);
  const r = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (r) return wt(r);
  const o = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return wt(o);
}
function st(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function pt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function ye(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function He(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function ko(e, t) {
  const n = {};
  for (const r of e) {
    const o = t[r];
    o && Object.keys(o).length > 0 && (n[r] = o);
  }
  const a = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (a.meta = n), a;
}
const No = {
  bar: "Bar",
  line: "Line",
  area: "Area",
  pie: "Pie",
  scatter: "Scatter",
  kpi: "KPI",
  table: "Table",
  combo: "Combo"
}, bm = "day";
function ym(e, t) {
  var u, d, h, p;
  const { query: n, chart: a } = e, r = st(a).length ? st(a) : n.measures ?? [], o = ye(a) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((h = (d = n.timeDimensions) == null ? void 0 : d[0]) == null ? void 0 : h.dimension), l = o ? { category: { member: o }, series: { mode: "measures", members: r } } : void 0, s = {
    ...e,
    chart: { ...a, family: t, mapping: void 0, familyOptions: void 0 }
  }, c = (b) => ({
    ...s,
    chart: { ...s.chart, ...b }
  });
  switch (t) {
    case "bar":
    case "line":
    case "area":
    case "pie":
      return c({ mapping: l });
    case "combo":
      return c({
        mapping: l,
        familyOptions: {
          series: r.map((b, y) => ({ member: b, render: y % 2 === 1 ? "bar" : "line" }))
        }
      });
    case "kpi":
      return c({
        familyOptions: { display: "number", ...r[0] ? { measure: r[0] } : {} }
      });
    case "scatter":
      return c({
        familyOptions: {
          ...r[0] ? { x: r[0] } : {},
          ...r[1] ? { y: r[1] } : {}
        }
      });
    case "table": {
      const b = [
        ...n.dimensions ?? [],
        ...((p = n.timeDimensions) == null ? void 0 : p.map((y) => y.dimension)) ?? [],
        ...r
      ].map((y) => ({ member: y }));
      return c({ familyOptions: b.length ? { columns: b } : void 0 });
    }
  }
}
function vt(e) {
  return Cc(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Hn(e) {
  return _c(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
const Zr = "a date or category";
function vm(e) {
  switch (e) {
    case "bar":
    case "line":
    case "area":
      return [
        { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
        { id: "x", label: "Category", hint: Zr, cardinality: "one", kinds: ["time", "category"] },
        {
          id: "color",
          label: "Split by",
          hint: "one color per value",
          cardinality: "one",
          kinds: ["category"],
          optional: !0
        }
      ];
    case "combo":
      return [
        { id: "x", label: "Category", hint: Zr, cardinality: "one", kinds: ["time", "category"] },
        { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] }
      ];
    case "pie":
      return [
        { id: "slices", label: "Slices", hint: "one slice per value", cardinality: "one", kinds: ["category", "time"] },
        { id: "size", label: "Size", hint: "size of each slice", cardinality: "one", kinds: ["number"] }
      ];
    case "scatter":
      return [
        { id: "sx", label: "Horizontal axis", hint: "a number", cardinality: "one", kinds: ["number"] },
        { id: "sy", label: "Vertical axis", hint: "a number", cardinality: "one", kinds: ["number"] },
        { id: "size", label: "Bubble size", hint: "a number", cardinality: "one", kinds: ["number"], optional: !0 },
        { id: "color", label: "Split by", hint: "color points by category", cardinality: "one", kinds: ["category"], optional: !0 }
      ];
    case "kpi":
      return [{ id: "value", label: "Value", hint: "the number to show", cardinality: "one", kinds: ["number"] }];
    case "table":
      return [
        {
          id: "columns",
          label: "Columns",
          hint: "any field, in order",
          cardinality: "many",
          kinds: ["number", "category", "time"]
        }
      ];
  }
}
function xe(e) {
  return e.chart.familyOptions ?? {};
}
function hn(e) {
  const t = xe(e).series;
  return Array.isArray(t) ? t : [];
}
function yr(e) {
  const t = xe(e).columns;
  return Array.isArray(t) ? t : [];
}
function xm(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Pt(e) {
  var r;
  const { chart: t } = e, n = t.family, a = (o) => o ? [o] : [];
  switch (n) {
    case "bar":
    case "line":
    case "area": {
      const o = xm(e), l = (r = t.mapping) == null ? void 0 : r.series;
      return { y: l && l.mode === "pivot" ? l.values && l.values.length > 0 ? l.values : a(l.value) : st(t), x: a(ye(t)), color: a(o) };
    }
    case "combo":
      return {
        x: a(ye(t)),
        y: hn(e).map((o) => o.member)
      };
    case "pie":
      return { slices: a(ye(t)), size: a(st(t)[0]) };
    case "scatter": {
      const o = xe(e);
      return {
        sx: a(o.x),
        sy: a(o.y),
        size: a(o.size),
        color: a(o.groupBy)
      };
    }
    case "kpi":
      return { value: a(xe(e).measure) };
    case "table":
      return { columns: yr(e).map((o) => o.member) };
  }
}
function pn(e) {
  const t = km(e);
  return t === void 0 ? bm : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function km(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function jt(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Qe(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function gt(e, t) {
  return { ...e, dimensions: jt(e.dimensions, t) };
}
function Le(e, t) {
  const n = Qe(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function $e(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function Je(e, t, n) {
  if (e)
    return { category: { member: e }, series: ko(t, n) };
}
function tn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function nn(e, t, n, a) {
  if (!e || t.length === 0) return;
  const r = {};
  for (const s of t) {
    const c = a == null ? void 0 : a[s];
    c && Object.keys(c).length > 0 && (r[s] = c);
  }
  const o = Object.keys(r).length > 0, l = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: r } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: r } : {} };
  return { category: { member: e }, series: l };
}
function ea(e, t, n, a, r) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return wm(e, n, a, r);
    case "combo":
      return _m(e, n, a, r);
    case "pie":
      return Mm(e, n, a, r);
    case "scatter":
      return Dm(e, n, a);
    case "kpi":
      return Lm(e, a);
    case "table":
      return Fm(e, a, r);
  }
}
function Nm(e, t, n, a) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Sm(e, n, a);
    case "combo":
      return Am(e, n, a);
    case "pie":
      return Om(e, n, a);
    case "scatter":
      return zm(e, n, a);
    case "kpi":
      return Tm(e, a);
    case "table":
      return $m(e, a);
  }
}
function wm(e, t, n, a) {
  const { query: r, chart: o } = e, l = Pt(e), s = l.color[0], c = ye(o), u = pt(o);
  if (t === "y") {
    const d = l.y, h = jt(d, n);
    return s ? {
      ...e,
      query: { ...r, measures: h },
      chart: { ...o, mapping: nn(c, h, s, tn(o)) }
    } : {
      ...e,
      query: { ...r, measures: h },
      chart: { ...o, mapping: Je(c, h, u) }
    };
  }
  if (t === "x")
    return Cm(e, n, a, s);
  if (t === "color") {
    const d = l.y;
    if (d.length === 0) return e;
    const h = gt({ ...r, measures: d }, n);
    return {
      ...e,
      query: h,
      chart: { ...o, mapping: nn(c, d, n, tn(o)) }
    };
  }
  return e;
}
function Cm(e, t, n, a) {
  const { query: r, chart: o } = e, l = ye(o), s = Pt(e).y, c = pt(o);
  let u = r;
  const d = He(r);
  if (d && l === d.dimension ? u = $e(u, void 0) : l && (u = Le(u, l)), n === "time") {
    const p = (d == null ? void 0 : d.granularity) ?? pn(d == null ? void 0 : d.dateRange);
    u = $e(u, {
      dimension: t,
      granularity: p,
      dateRange: d == null ? void 0 : d.dateRange
    });
  } else
    u = gt(u, t);
  const h = a ? nn(t, s, a, tn(o)) : Je(t, s, c);
  return { ...e, query: u, chart: { ...o, mapping: h } };
}
function Sm(e, t, n) {
  const { query: a, chart: r } = e, o = Pt(e), l = ye(r), s = o.color[0], c = pt(r);
  if (t === "y") {
    const u = Qe(o.y, n);
    if (s && u.length >= 1)
      return {
        ...e,
        query: { ...a, measures: u },
        chart: { ...r, mapping: nn(l, u, s, tn(r)) }
      };
    const d = s ? Le({ ...a, measures: u }, s) : { ...a, measures: u };
    return { ...e, query: d, chart: { ...r, mapping: Je(l, u, c) } };
  }
  if (t === "x") {
    let u = a;
    const d = He(a);
    return d && d.dimension === n ? u = $e(u, void 0) : u = Le(u, n), { ...e, query: u, chart: { ...r, mapping: void 0 } };
  }
  if (t === "color") {
    const u = Le(a, n);
    return {
      ...e,
      query: u,
      chart: { ...r, mapping: Je(l, o.y, c) }
    };
  }
  return e;
}
const ta = ["line", "bar"];
function _m(e, t, n, a) {
  const { query: r, chart: o } = e, l = xe(e);
  if (t === "x") {
    let s = r;
    const c = ye(o), u = He(r);
    if (u && c === u.dimension ? s = $e(s, void 0) : c && (s = Le(s, c)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? pn(u == null ? void 0 : u.dateRange);
      s = $e(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = gt(s, n);
    return { ...e, query: s, chart: { ...o, mapping: { category: { member: n }, series: Rm(e) } } };
  }
  if (t === "y") {
    const s = hn(e);
    if (s.some((d) => d.member === n)) return e;
    const c = ta[s.length % ta.length], u = [...s, { member: n, render: c }];
    return {
      ...e,
      query: { ...r, measures: jt(r.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...l, series: u }, mapping: wo(o, u) }
    };
  }
  return e;
}
function wo(e, t) {
  const n = ye(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((a) => a.member) } } : e.mapping;
}
function Rm(e) {
  return { mode: "measures", members: hn(e).map((t) => t.member) };
}
function Am(e, t, n) {
  const { query: a, chart: r } = e, o = xe(e);
  if (t === "x") {
    let l = a;
    const s = He(a);
    return s && s.dimension === n ? l = $e(l, void 0) : l = Le(l, n), { ...e, query: l, chart: { ...r, mapping: void 0 } };
  }
  if (t === "y") {
    const l = hn(e).filter((c) => c.member !== n), s = Qe(a.measures, n);
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...r, familyOptions: { ...o, series: l }, mapping: wo(r, l) }
    };
  }
  return e;
}
function Mm(e, t, n, a) {
  const { query: r, chart: o } = e, l = pt(o);
  if (t === "slices") {
    let s = r;
    const c = ye(o), u = He(r);
    if (u && c === u.dimension ? s = $e(s, void 0) : c && (s = Le(s, c)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? pn(u == null ? void 0 : u.dateRange);
      s = $e(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = gt(s, n);
    return {
      ...e,
      query: s,
      chart: { ...o, mapping: Je(n, st(o), l) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...r, measures: s },
      chart: { ...o, mapping: Je(ye(o), s, l) }
    };
  }
  return e;
}
function Om(e, t, n) {
  const { query: a, chart: r } = e, o = pt(r);
  if (t === "slices") {
    let l = a;
    const s = He(a);
    return s && s.dimension === n ? l = $e(l, void 0) : l = Le(l, n), { ...e, query: l, chart: { ...r, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...a, measures: [] },
    chart: { ...r, mapping: Je(ye(r), [], o) }
  } : e;
}
const Co = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Dm(e, t, n) {
  const a = Co[t];
  if (!a) return e;
  const { query: r, chart: o } = e, l = { ...xe(e) }, s = l[a];
  l[a] = n;
  let c = r;
  if (a === "groupBy")
    s && s !== n && (c = Le(c, s)), c = gt(c, n);
  else {
    const u = s ? Qe(r.measures, s) : r.measures;
    c = { ...r, measures: jt(u, n) };
  }
  return { ...e, query: c, chart: { ...o, familyOptions: l } };
}
function zm(e, t, n) {
  const a = Co[t];
  if (!a) return e;
  const { query: r, chart: o } = e, l = { ...xe(e) };
  delete l[a];
  let s = r;
  if (a === "groupBy") s = Le(s, n);
  else {
    const c = Qe(r.measures, n);
    s = { ...r, measures: c.length ? c : [] };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: l } };
}
function Lm(e, t) {
  const { query: n, chart: a } = e, r = { ...xe(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...a, familyOptions: r } };
}
function Tm(e, t) {
  const { query: n, chart: a } = e, r = { ...xe(e) };
  return r.measure === t && delete r.measure, { ...e, query: { ...n, measures: [] }, chart: { ...a, familyOptions: r } };
}
function Fm(e, t, n) {
  const { query: a, chart: r } = e, o = yr(e);
  if (o.some((c) => c.member === t)) return e;
  let l = a;
  if (n === "number") l = { ...a, measures: jt(a.measures, t) };
  else if (n === "time") {
    const c = He(a), u = (c == null ? void 0 : c.granularity) ?? pn(c == null ? void 0 : c.dateRange), d = a.timeDimensions ?? [];
    d.some((h) => h.dimension === t) || (l = { ...a, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else l = gt(a, t);
  const s = { ...xe(e), columns: [...o, { member: t }] };
  return { ...e, query: l, chart: { ...r, familyOptions: s } };
}
function $m(e, t) {
  var d, h, p;
  const { query: n, chart: a } = e, r = yr(e).filter((b) => b.member !== t);
  let o = n;
  const l = Qe(n.measures, t);
  l.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: l.length ? l : void 0 });
  const s = Qe(n.dimensions, t);
  s.length !== (((h = n.dimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, dimensions: s.length ? s : void 0 });
  const c = (n.timeDimensions ?? []).filter((b) => b.dimension !== t);
  c.length !== (((p = n.timeDimensions) == null ? void 0 : p.length) ?? 0) && (o = { ...o, timeDimensions: c.length ? c : void 0 });
  const u = { ...xe(e), columns: r };
  return { ...e, query: o, chart: { ...a, familyOptions: u } };
}
const me = x.forwardRef(
  ({ className: e, type: t, ...n }, a) => /* @__PURE__ */ i(
    "input",
    {
      ref: a,
      type: t,
      "data-slot": "input",
      className: w(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...n
    }
  )
);
me.displayName = "Input";
function rn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(Ca, { className: "size-3.5 shrink-0 text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(wa, { className: "size-3.5 shrink-0 text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(er, { className: "size-3.5 shrink-0 text-muted-foreground" });
  }
}
function So({
  cube: e,
  cubes: t,
  kind: n,
  value: a,
  onChange: r,
  placeholder: o = "Select member…",
  disabled: l,
  id: s,
  className: c
}) {
  const { meta: u, isLoading: d } = Be(), h = x.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return Kn(u, n).filter((g) => y.has(g.cube));
    }
    return Kn(u, n, e);
  }, [u, n, e, t]), p = x.useMemo(() => Pm(h), [h]), b = h.find((y) => y.name === a);
  return /* @__PURE__ */ f(_e, { value: a, onValueChange: r, disabled: l || d, children: [
    /* @__PURE__ */ i(Ae, { id: s, className: c, children: /* @__PURE__ */ i(Re, { placeholder: d ? "Loading…" : o, children: b ? /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
      rn(b.type),
      /* @__PURE__ */ i("span", { className: "truncate", children: b.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Me, { children: p.map(([y, g]) => /* @__PURE__ */ f(In, { children: [
      p.length > 1 ? /* @__PURE__ */ i(Vn, { children: y }) : null,
      g.map((v) => /* @__PURE__ */ i(pe, { value: v.name, children: /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
        rn(v.type),
        /* @__PURE__ */ i("span", { className: "truncate", children: v.label })
      ] }) }, v.name))
    ] }, y)) })
  ] });
}
function Pm(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.cube);
    a ? a.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Ot({
  options: e,
  value: t,
  onChange: n,
  fullWidth: a = !0,
  size: r = "default",
  disabled: o,
  "aria-label": l,
  className: s
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "segmented-control",
      role: "radiogroup",
      "aria-label": l,
      className: w(
        "flex flex-wrap gap-1 rounded-lg bg-muted p-1 text-muted-foreground",
        s
      ),
      children: e.map((c) => {
        const u = c.value === t;
        return /* @__PURE__ */ f(
          "button",
          {
            type: "button",
            role: "radio",
            "aria-checked": u,
            title: c.title,
            disabled: o || c.disabled,
            onClick: () => n(c.value),
            className: w(
              "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              r === "sm" ? "h-7 px-2 text-xs" : "h-7 px-2.5 text-sm",
              a && "flex-1",
              u ? "bg-background text-foreground shadow-sm" : "hover:text-foreground"
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
const jm = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(wa, { className: "size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(er, { className: "size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(Ca, { className: "size-3" }), metaKind: "time" }
}, Em = ["number", "category", "time"];
function _o({
  well: e,
  placed: t,
  scope: n,
  blockReason: a,
  onSelect: r,
  align: o = "start",
  side: l = "bottom",
  children: s
}) {
  var I, B;
  const { meta: c, isLoading: u } = Be(), [d, h] = x.useState(!1), [p, b] = x.useState(""), [y, g] = x.useState(n.viewLocked ?? "tables"), [v, S] = x.useState({});
  x.useEffect(() => {
    d && g(n.viewLocked ?? "tables");
  }, [d, n.viewLocked]);
  const _ = x.useMemo(() => new Set(t), [t]), N = p.trim().toLowerCase(), R = x.useMemo(() => {
    if (y !== "tables") {
      const A = n.views.find((Y) => Y.name === y) ?? Rt(c, y);
      return A ? [{ cube: A, tag: "dataset" }] : [];
    }
    const z = [];
    n.sourceCube && z.push({ cube: n.sourceCube, tag: "source" });
    for (const A of n.relatedCubes) z.push({ cube: A, tag: "related" });
    return z;
  }, [y, n, c]), C = e.kinds.length > 1, k = (z) => Em.filter((A) => e.kinds.includes(A)).map((A) => {
    const Y = jm[A], G = Kn(c, Y.metaKind, z).filter((P) => !_.has(P.name)).filter((P) => N ? P.label.toLowerCase().includes(N) || P.name.toLowerCase().includes(N) : !0);
    return { kind: A, label: Y.label, icon: Y.icon, items: G };
  }).filter((A) => A.items.length > 0), D = R.map((z) => ({ section: z, groups: k(z.cube.name) })).filter((z) => z.groups.length > 0), L = D.length > 0, V = (z, A) => {
    r(z, A), h(!1), b("");
  }, K = y === "tables" ? "All related tables" : ((I = n.views.find((z) => z.name === y)) == null ? void 0 : I.title) ?? ((B = Rt(c, y)) == null ? void 0 : B.title) ?? y;
  return /* @__PURE__ */ f(ke, { open: d, onOpenChange: h, children: [
    /* @__PURE__ */ i(Ne, { asChild: !0, children: s }),
    /* @__PURE__ */ f(we, { align: o, side: l, className: "w-80 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2 pb-1.5", children: [
        /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input bg-background px-2", children: [
          /* @__PURE__ */ i(ii, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: p,
              onChange: (z) => b(z.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(Im, { browse: y, label: K, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "max-h-80 overflow-y-auto", children: L ? D.map(({ section: z, groups: A }, Y) => {
        const G = A.reduce((T, Q) => T + Q.items.length, 0), P = z.tag === "related", U = v[z.cube.name] ?? P, E = N.length > 0 ? !0 : !U;
        return /* @__PURE__ */ f("div", { children: [
          z.tag === "related" && Y > 0 && D[Y - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "px-1 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => S((T) => ({ ...T, [z.cube.name]: !U })),
              className: "flex w-full items-center gap-1.5 rounded-sm px-1 py-1 text-left hover:bg-accent/50",
              children: [
                E ? /* @__PURE__ */ i(Xe, { className: "size-3 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ i(an, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i(Sa, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "truncate text-xs font-medium", children: z.cube.title }),
                z.tag === "source" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-primary/10 px-1 py-px text-[9px] font-medium uppercase text-primary", children: "Main table" }) : z.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-muted px-1 py-px text-[9px] font-medium uppercase text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "ml-auto shrink-0 pr-1 text-[10px] tabular-nums text-muted-foreground/70", children: G })
              ]
            }
          ),
          E ? A.map((T) => /* @__PURE__ */ f("div", { className: "pb-0.5 pl-4", children: [
            C ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 px-2 pb-0.5 pt-1 text-[9px] uppercase tracking-wide text-muted-foreground/70", children: [
              T.icon,
              T.label
            ] }) : null,
            T.items.map((Q) => /* @__PURE__ */ i(Vm, { option: Q, reason: a(Q), onPick: () => V(Q.name, T.kind) }, Q.name))
          ] }, T.kind)) : null
        ] }, z.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "px-1 py-6 text-center text-xs text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Im({ browse: e, label: t, views: n, onBrowse: a }) {
  const [r, o] = x.useState(!1), l = (s) => {
    a(s), o(!1);
  };
  return /* @__PURE__ */ f(ke, { open: r, onOpenChange: o, children: [
    /* @__PURE__ */ f(
      Ne,
      {
        className: "flex h-8 max-w-[9rem] shrink-0 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(_a, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ f(we, { align: "end", className: "w-60 p-1", children: [
      /* @__PURE__ */ i(na, { active: e === "tables", icon: /* @__PURE__ */ i(Sa, { className: "size-3.5" }), onClick: () => l("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ i("div", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ i(
          na,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ i(tr, { className: "size-3.5" }),
            onClick: () => l(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function na({
  active: e,
  icon: t,
  onClick: n,
  children: a
}) {
  return /* @__PURE__ */ f(
    "button",
    {
      type: "button",
      onClick: n,
      className: w(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
        e && "bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: t }),
        /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: a }),
        e ? /* @__PURE__ */ i(Fe, { className: "size-3.5 shrink-0" }) : null
      ]
    }
  );
}
function Vm({ option: e, reason: t, onPick: n }) {
  return t ? /* @__PURE__ */ f(
    "span",
    {
      tabIndex: 0,
      "aria-disabled": !0,
      title: t,
      className: "flex cursor-not-allowed items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-left text-sm opacity-45 outline-none focus-visible:ring-1 focus-visible:ring-ring",
      children: [
        /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: e.label }),
        /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: "Not available" })
      ]
    }
  ) : /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      onClick: n,
      title: e.description ?? e.name,
      className: "flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
      children: /* @__PURE__ */ i("span", { className: "min-w-0 truncate", children: e.label })
    }
  );
}
const qm = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Ct = "yyyy-MM-dd";
function Km(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ra(e) {
  if (!e) return;
  const t = za(e, Ct, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function vr({ value: e, onChange: t }) {
  const [n, a] = x.useState(!1), r = typeof e == "string", [o, l] = Km(e), s = ra(o), c = ra(l), u = s ? { from: s, to: c } : void 0, d = r ? e : s && c ? `${de(s, "MMM d, yyyy")} – ${de(c, "MMM d, yyyy")}` : s ? de(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ f(ke, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Ne, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", size: "sm", className: w("h-8 w-full justify-start gap-1.5 font-normal"), children: [
      /* @__PURE__ */ i(Na, { className: "size-3.5 text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: w("min-w-0 flex-1 truncate text-left", d === "Any time" && "text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ f(we, { align: "start", className: "flex w-auto gap-2 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex w-32 flex-col gap-0.5 border-r pr-2", children: [
        qm.map((h) => /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "sm",
            className: w("justify-start font-normal", e === h && "bg-accent"),
            onClick: () => {
              t(h), a(!1);
            },
            children: h
          },
          h
        )),
        /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "sm",
            className: "justify-start font-normal text-muted-foreground",
            onClick: () => {
              t(void 0), a(!1);
            },
            children: "Any time"
          }
        )
      ] }),
      /* @__PURE__ */ i(
        co,
        {
          mode: "range",
          selected: u,
          defaultMonth: s,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([de(h.from, Ct), de(h.to, Ct)]) : h != null && h.from ? t([de(h.from, Ct), de(h.from, Ct)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Bm(e) {
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
function Hm(e, t) {
  const n = new Set(Bm(t));
  return e.filter((a) => n.has(a.type));
}
function Wm(e) {
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
function Gm(e, t, n) {
  const a = new Set(n.map((s) => s.name)), r = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = r, l = 2;
  for (; a.has(o); ) o = `${r}_${l++}`;
  return o;
}
function Um(e, t, n) {
  const a = Wm(e), r = { name: Gm(t, e, n), type: a }, o = t.trim();
  return o && (r.label = o), a === "dateRange" ? r.default = "last 7 days" : a === "granularity" && (r.default = "day"), r;
}
const Ro = x.createContext({});
function Ym({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(Ro.Provider, { value: n, children: t });
}
function Qm() {
  return x.useContext(Ro);
}
function Jm({ kind: e, value: t, onChange: n, className: a }) {
  const r = pr(), o = (r == null ? void 0 : r.decls) ?? [], { createVariable: l } = Qm(), [s, c] = x.useState(!1), [u, d] = x.useState(!1), [h, p] = x.useState(""), b = x.useMemo(() => Hm(o, e), [o, e]), y = b.find((S) => S.name === t), g = (S) => {
    n(S), c(!1), d(!1);
  }, v = () => {
    if (!l) return;
    const S = Um(e, h || "Variable", o);
    l(S), g(S.name), p("");
  };
  return /* @__PURE__ */ f(
    ke,
    {
      open: s,
      onOpenChange: (S) => {
        c(S), S || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Ne, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", size: "sm", className: w("h-8 w-full justify-start gap-1.5", a), children: [
          /* @__PURE__ */ i(si, { className: "size-3.5 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: w("min-w-0 flex-1 truncate text-left", !y && "text-muted-foreground"), children: y ? y.label ?? y.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ f(we, { align: "start", className: "w-60 p-1", children: [
          b.length > 0 ? b.map((S) => /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => g(S.name),
              className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: S.label ?? S.name }),
                /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: S.type }),
                S.name === t ? /* @__PURE__ */ i(Fe, { className: "size-3.5 shrink-0" }) : null
              ]
            },
            S.name
          )) : /* @__PURE__ */ i("p", { className: "px-2 py-1.5 text-xs text-muted-foreground", children: "No matching variables yet." }),
          l ? /* @__PURE__ */ i("div", { className: "mt-1 border-t border-border pt-1", children: u ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1 p-1", children: [
            /* @__PURE__ */ i(
              me,
              {
                autoFocus: !0,
                value: h,
                onChange: (S) => p(S.target.value),
                onKeyDown: (S) => {
                  S.key === "Enter" && v(), S.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "h-7 text-sm"
              }
            ),
            /* @__PURE__ */ i(W, { size: "sm", className: "h-7 shrink-0", onClick: v, children: "Add" })
          ] }) : /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
              className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
              children: [
                /* @__PURE__ */ i(Tt, { className: "size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function lt({ kind: e, value: t, onChange: n, renderFixed: a }) {
  const r = Se(t), [o, l] = x.useState(r ? "var" : "fixed");
  x.useEffect(() => {
    r && l("var");
  }, [r]);
  const s = (c) => w(
    "flex-1 rounded-sm px-2 py-1 text-center transition-colors",
    c ? "bg-background font-medium shadow-sm" : "text-muted-foreground hover:text-foreground"
  );
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ f("div", { className: "flex rounded-md bg-muted p-0.5 text-[11px]", children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          className: s(o === "fixed"),
          onClick: () => {
            l("fixed"), Se(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: s(o === "var"), onClick: () => l("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      Jm,
      {
        kind: e,
        value: Se(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : a(Se(t) ? void 0 : t, (c) => n(c))
  ] });
}
const Xm = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Mn(e) {
  return "member" in e && "operator" in e;
}
function Zm({
  cube: e,
  cubes: t,
  scope: n,
  value: a,
  onChange: r,
  disabled: o,
  className: l
}) {
  var K;
  const { meta: s } = Be(), c = ((K = pr()) == null ? void 0 : K.decls) ?? [], [u, d] = x.useState(null), [h, p] = x.useState(null), b = a ?? [], y = b.length === 1 && !Mn(b[0]) && "or" in b[0] && Array.isArray(b[0].or) && b[0].or.every(Mn) ? b[0] : void 0, g = y ? "any" : "all", v = [], S = [];
  y || b.forEach((I) => Mn(I) ? v.push(I) : S.push(I));
  const _ = y ? y.or : v, N = S.length === 0 && (_.length >= 2 || g === "any"), R = (I) => g === "any" ? I.length ? [{ or: I }] : [] : [...I, ...S], C = (I) => {
    const B = I.filter((A) => A.member.length > 0), z = R(B);
    r(z.length > 0 ? z : void 0);
  }, k = (I) => {
    const B = I === "any" ? _.length ? [{ or: _ }] : [] : [..._];
    r(B.length > 0 ? B : void 0);
  }, D = (I, B) => C(_.map((z, A) => A === I ? { ...z, ...B } : z)), L = (I) => C(_.filter((B, z) => z !== I)), V = (I) => {
    const z = { ...h ?? { member: "", operator: "equals", values: [] }, ...I };
    z.member ? (p(null), d(_.length), C([..._, z])) : p(z);
  };
  return /* @__PURE__ */ f("div", { "data-slot": "filter-builder", className: w("flex flex-col gap-2", l), children: [
    _.length === 0 && !h ? /* @__PURE__ */ i("p", { className: "px-1 py-1 text-xs text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    N ? /* @__PURE__ */ f("div", { className: "flex items-center gap-2 px-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        Ot,
        {
          "aria-label": "Match filters",
          size: "sm",
          options: [
            { value: "all", label: "All" },
            { value: "any", label: "Any" }
          ],
          value: g,
          onChange: k
        }
      ),
      /* @__PURE__ */ i("span", { children: "of these" })
    ] }) : null,
    _.map((I, B) => {
      const z = Oe(s, I.member);
      return u === B ? /* @__PURE__ */ i(
        aa,
        {
          leaf: I,
          member: z,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (A) => D(B, A),
          onDone: () => d(null),
          onRemove: () => L(B)
        },
        B
      ) : /* @__PURE__ */ i(
        ed,
        {
          text: td(I, z == null ? void 0 : z.label, c),
          disabled: o,
          onEdit: () => d(B),
          onRemove: () => L(B)
        },
        B
      );
    }),
    h ? /* @__PURE__ */ i(
      aa,
      {
        leaf: h,
        member: Oe(s, h.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: V,
        onRemove: () => p(null)
      }
    ) : null,
    S.length > 0 ? /* @__PURE__ */ f("p", { className: "text-xs text-muted-foreground", children: [
      S.length,
      " grouped filter",
      S.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ f(
      W,
      {
        variant: "outline",
        size: "sm",
        className: "w-full justify-start",
        disabled: o || !!h,
        onClick: () => {
          d(null), p({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(Tt, { className: "size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function ed({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: a
}) {
  return /* @__PURE__ */ f("div", { className: "flex items-center gap-1 rounded-md border border-border bg-background", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: n,
        className: "min-w-0 flex-1 truncate px-3 py-2 text-left text-sm hover:text-foreground",
        title: "Edit filter",
        children: e
      }
    ),
    /* @__PURE__ */ i(
      W,
      {
        variant: "ghost",
        size: "icon",
        className: "size-8 shrink-0 text-muted-foreground hover:text-destructive",
        disabled: t,
        onClick: a,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(ct, { className: "size-4" })
      }
    )
  ] });
}
function aa({
  leaf: e,
  member: t,
  cube: n,
  cubes: a,
  scope: r,
  disabled: o,
  onChange: l,
  onDone: s,
  onRemove: c
}) {
  const u = gm(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], h = !Bn.has(d);
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-2.5 rounded-lg border border-ring/50 bg-muted/30 p-3", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ i("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-0.5", children: [
        s && e.member ? /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", className: "h-7 gap-1 px-2 text-xs", onClick: s, children: [
          /* @__PURE__ */ i(Fe, { className: "size-3.5" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "icon",
            className: "size-7 shrink-0 text-muted-foreground hover:text-destructive",
            disabled: o,
            onClick: c,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ i(ct, { className: "size-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Field" }),
      r ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ i(
          _o,
          {
            well: Xm,
            placed: [],
            scope: r,
            blockReason: () => {
            },
            onSelect: (p) => l({ member: p }),
            side: "bottom",
            align: "start",
            children: /* @__PURE__ */ f(
              "button",
              {
                type: "button",
                disabled: o,
                className: "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                children: [
                  t ? /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
                    rn(t.type),
                    /* @__PURE__ */ i("span", { className: "truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(Xe, { className: "size-4 shrink-0 text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        So,
        {
          cube: n,
          cubes: a,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: (p) => l({ member: p }),
          placeholder: "Choose a field…",
          disabled: o
        }
      )
    ] }),
    /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ f(
        _e,
        {
          value: d,
          onValueChange: (p) => l({
            operator: p,
            values: Bn.has(p) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Ae, { className: "w-full", children: /* @__PURE__ */ i(Re, {}) }),
            /* @__PURE__ */ i(Me, { children: u.map((p) => /* @__PURE__ */ i(pe, { value: p, children: vo[p] }, p)) })
          ]
        }
      )
    ] }),
    h ? /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        nd,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (p) => l({ values: p })
        }
      )
    ] }) : null
  ] });
}
function td(e, t, n) {
  const a = t ?? e.member;
  if (!a) return "New filter";
  const r = vo[e.operator] ?? e.operator;
  if (Bn.has(e.operator)) return `${a} ${r}`;
  const o = (e.values ?? []).map((l) => {
    if (Se(l)) {
      const s = n.find((c) => c.name === l.var);
      return `{${((s == null ? void 0 : s.label) ?? l.var).replace(/[{}]/g, "")}}`;
    }
    return String(l);
  });
  return o.length > 0 ? `${a} ${r} ${o.join(", ")}` : `${a} ${r} …`;
}
function nd({ values: e, memberType: t, onChange: n }) {
  const a = e ?? [], r = a.length === 1 && Se(a[0]);
  if (t === "time") {
    const s = r ? a[0] : rd(a);
    return /* @__PURE__ */ i(
      lt,
      {
        kind: "dateRange",
        value: s,
        onChange: (c) => n(c === void 0 ? [] : Se(c) ? [c] : ad(c)),
        renderFixed: (c, u) => /* @__PURE__ */ i(vr, { value: c, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", l = r ? a[0] : a.filter((s) => !Se(s));
  return /* @__PURE__ */ i(
    lt,
    {
      kind: o,
      value: l,
      onChange: (s) => n(s === void 0 ? [] : Se(s) ? [s] : s),
      renderFixed: (s, c) => /* @__PURE__ */ i(
        me,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => c(od(u.target.value)),
          placeholder: "value, value…",
          className: "h-8"
        }
      )
    }
  );
}
function rd(e) {
  const t = e.filter((n) => !Se(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function ad(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function od(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function id({ spec: e, update: t, cube: n, scopeCubes: a, scope: r }) {
  const { query: o } = e, l = (o.filters ?? []).length, s = (c) => t({ ...e, query: { ...o, filters: c } });
  return /* @__PURE__ */ f(ke, { children: [
    /* @__PURE__ */ f(
      Ne,
      {
        className: w(
          "flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
          l > 0 ? "text-foreground" : "text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(li, { className: "size-4" }),
          "Filter",
          l > 0 ? /* @__PURE__ */ i("span", { className: "ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground", children: l }) : null
        ]
      }
    ),
    /* @__PURE__ */ f(we, { align: "end", className: "flex max-h-[72vh] w-96 flex-col gap-2 overflow-y-auto p-3", children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "text-sm font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(sd, { spec: e, update: t, scopeCubes: a }),
      /* @__PURE__ */ i(Zm, { cube: n, cubes: a, scope: r, value: o.filters, onChange: s })
    ] })
  ] });
}
function sd({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: a } = Be(), r = pm(a, n);
  if (r.length === 0) return null;
  const o = new Set(e.query.segments ?? []), l = (s) => {
    const c = new Set(o);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 border-b border-border pb-2", children: [
    /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5", children: r.map((s) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => l(s.name),
        title: s.description ?? s.name,
        className: w(
          "rounded-full border px-2.5 py-1 text-xs transition-colors",
          o.has(s.name) ? "border-ring bg-accent text-foreground" : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        ),
        children: s.label
      },
      s.name
    )) })
  ] });
}
function ld({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: a } = Be(), r = x.useMemo(() => fn(a), [a]), o = r.filter((v) => v.type === "view"), l = r.filter((v) => v.type === "cube"), s = r.find((v) => v.name === e), [c, u] = x.useState(!1), [d, h] = x.useState(null), p = (v) => {
    if (v === e) {
      u(!1);
      return;
    }
    t ? h(v) : (n(v), u(!1));
  }, b = () => {
    d && n(d), h(null), u(!1);
  }, y = d ? ((g = r.find((v) => v.name === d)) == null ? void 0 : g.title) ?? d : "";
  return /* @__PURE__ */ f(
    ke,
    {
      open: c,
      onOpenChange: (v) => {
        u(v), v || h(null);
      },
      children: [
        /* @__PURE__ */ f(
          Ne,
          {
            className: "flex h-8 max-w-[12rem] items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(_a, { className: "size-3.5 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: w("truncate", !s && "text-muted-foreground"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(we, { align: "start", className: "w-64 p-1", children: d ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-2 p-2", children: [
          /* @__PURE__ */ f("p", { className: "text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "font-medium", children: y }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ f("div", { className: "flex justify-end gap-1.5", children: [
            /* @__PURE__ */ i(W, { variant: "ghost", size: "sm", className: "h-7", onClick: () => h(null), children: "Cancel" }),
            /* @__PURE__ */ i(W, { size: "sm", className: "h-7", onClick: b, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ f("div", { className: "max-h-[60vh] overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ f(re, { children: [
            /* @__PURE__ */ i("p", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Saved datasets" }),
            o.map((v) => /* @__PURE__ */ i(
              oa,
              {
                icon: /* @__PURE__ */ i(tr, { className: "size-3.5" }),
                label: v.title,
                active: v.name === e,
                onClick: () => p(v.name)
              },
              v.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Tables" }),
          l.map((v) => /* @__PURE__ */ i(
            oa,
            {
              icon: /* @__PURE__ */ i(Ra, { className: "size-3.5" }),
              label: v.title,
              active: v.name === e,
              onClick: () => p(v.name)
            },
            v.name
          ))
        ] }) })
      ]
    }
  );
}
function oa({
  icon: e,
  label: t,
  active: n,
  onClick: a
}) {
  return /* @__PURE__ */ f(
    "button",
    {
      type: "button",
      onClick: a,
      className: w(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
        n && "bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: e }),
        /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: t }),
        n ? /* @__PURE__ */ i(Fe, { className: "size-3.5 shrink-0" }) : null
      ]
    }
  );
}
function ia(e, t, n, a) {
  var o;
  const r = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...r, ...a } } } });
}
function sa({
  spec: e,
  update: t,
  axis: n,
  title: a,
  auto: r
}) {
  var s;
  const o = ((s = e.chart.axes) == null ? void 0 : s[n]) ?? {}, l = o.labelHide === !0;
  return /* @__PURE__ */ f(
    "div",
    {
      className: w(
        "flex w-full min-w-[8rem] items-center gap-1 rounded-md border border-border bg-background px-1.5 py-1 transition-opacity",
        l && "opacity-50"
      ),
      children: [
        a ? /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: a }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: r ?? "Axis title",
            disabled: l,
            onChange: (c) => ia(e, t, n, { label: c.target.value || void 0 }),
            title: `Axis title${r ? ` — defaults to “${r}”` : ""} (leave blank for the default)`,
            className: "h-6 min-w-0 flex-1 rounded border border-input bg-background px-1.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          ud,
          {
            hidden: l,
            what: "axis title",
            onClick: () => ia(e, t, n, { labelHide: l ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function cd({
  spec: e,
  update: t
}) {
  var a;
  const n = ((a = e.chart.legend) == null ? void 0 : a.show) === !1;
  return /* @__PURE__ */ f("div", { className: w("flex flex-col gap-1 transition-opacity", n && "opacity-50"), children: [
    /* @__PURE__ */ i("span", { className: "px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: "Show legend" }),
    /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: () => t({ ...e, chart: { ...e.chart, legend: { ...e.chart.legend, show: !!n } } }),
        "aria-label": n ? "Show legend" : "Hide legend",
        title: n ? "Show legend" : "Hide legend",
        className: "flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        children: [
          n ? /* @__PURE__ */ i(Aa, { className: "size-3.5" }) : /* @__PURE__ */ i(Ma, { className: "size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function ud({
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
      className: "rounded p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
      children: e ? /* @__PURE__ */ i(Aa, { className: "size-3.5" }) : /* @__PURE__ */ i(Ma, { className: "size-3.5" })
    }
  );
}
const Ao = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: w(
        "flex items-center gap-2 text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        e
      ),
      ...t
    }
  )
);
Ao.displayName = "Label";
function le({
  label: e,
  hint: t,
  error: n,
  htmlFor: a,
  action: r,
  className: o,
  children: l
}) {
  return /* @__PURE__ */ f("div", { "data-slot": "field-row", className: w("flex flex-col gap-1.5 py-1.5", o), children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i(Ao, { htmlFor: a, className: "text-muted-foreground", children: e }),
      r ? /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center", children: r }) : null
    ] }),
    l,
    n ? /* @__PURE__ */ i("p", { className: "text-xs text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: t }) : null
  ] });
}
function Wn({
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
      className: w(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        e ? "bg-primary" : "bg-input",
        o
      ),
      children: /* @__PURE__ */ i(
        "span",
        {
          className: w(
            "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform",
            e ? "translate-x-4" : "translate-x-0"
          )
        }
      )
    }
  );
}
function he({
  label: e,
  hint: t,
  checked: n,
  onChange: a,
  disabled: r,
  className: o
}) {
  const l = x.useId();
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "switch-row",
      className: w("flex items-center justify-between gap-3 py-1.5", o),
      children: [
        /* @__PURE__ */ f(
          "label",
          {
            htmlFor: l,
            className: w(
              "flex min-w-0 flex-col gap-0.5",
              r ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "text-sm font-medium leading-none", children: e }),
              t ? /* @__PURE__ */ i("span", { className: "text-xs text-muted-foreground", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ i(Wn, { id: l, checked: n, onChange: a, disabled: r })
      ]
    }
  );
}
function md({ spec: e, update: t }) {
  var p, b;
  const { chart: n } = e, a = n.family, r = n.familyOptions ?? {}, o = (y) => t({ ...e, chart: { ...n, ...y } }), l = (y) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...y } } }), s = ((b = (p = n.mapping) == null ? void 0 : p.series) == null ? void 0 : b.mode) === "pivot" ? "stacked" : "none", c = n.stackMode ?? (a === "area" ? s : Ya[a].envelope.stackMode) ?? "none", d = /* @__PURE__ */ i(le, { label: "Stacked", children: /* @__PURE__ */ i(
    Ot,
    {
      "aria-label": "Stacking",
      size: "sm",
      options: [
        { value: "none", label: "None" },
        { value: "stacked", label: "Stacked" },
        { value: "percent", label: "100%" }
      ],
      value: c === "stacked" ? "stacked" : c === "percent" ? "percent" : "none",
      onChange: (y) => o({ stackMode: y })
    }
  ) }), h = (() => {
    var y, g;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            he,
            {
              label: "Horizontal",
              checked: n.orientation === "horizontal",
              onChange: (v) => o({ orientation: v ? "horizontal" : "vertical" })
            }
          ),
          d
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ f(re, { children: [
          d,
          n.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "px-0.5 pt-1 text-[10px] leading-tight text-muted-foreground/80", children: ((g = (y = n.mapping) == null ? void 0 : y.series) == null ? void 0 : g.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            he,
            {
              label: "Donut",
              checked: typeof r.innerRadiusPct == "number" && r.innerRadiusPct > 0,
              onChange: (v) => l({ innerRadiusPct: v ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(le, { label: "Slice labels", children: /* @__PURE__ */ i(
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
              value: r.showLabels ?? "percent",
              onChange: (v) => l({ showLabels: v })
            }
          ) }),
          /* @__PURE__ */ i(hd, { label: "Max slices", children: /* @__PURE__ */ i(
            me,
            {
              type: "number",
              min: 1,
              className: "h-8",
              value: r.maxSlices ?? "",
              placeholder: "8",
              onChange: (v) => {
                const S = parseInt(v.target.value, 10);
                l({ maxSlices: Number.isFinite(S) && S > 0 ? S : void 0 });
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
        return /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            he,
            {
              label: "Compact rows",
              checked: r.rowHeight === "compact",
              onChange: (v) => l({ rowHeight: v ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sortable columns",
              checked: r.sortable !== !1,
              onChange: (v) => l({ sortable: v })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sticky header",
              checked: r.stickyHeader !== !1,
              onChange: (v) => l({ stickyHeader: v })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Row numbers",
              checked: r.showRowNumbers === !0,
              onChange: (v) => l({ showRowNumbers: v })
            }
          )
        ] });
      // Combo is configured entirely per-measure (render type, line shape, points,
      // axis, color) on each Values field — no type-level options.
      case "combo":
        return null;
      case "scatter":
        return null;
    }
  })();
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: h });
}
const dd = /* @__PURE__ */ new Set([
  "bar",
  "area",
  "pie",
  "table"
]);
function fd(e) {
  return dd.has(e);
}
function hd({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1 py-1", children: [
    /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: e }),
    t
  ] });
}
const pd = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], Mo = {
  bar: Oa,
  line: pi,
  area: hi,
  pie: fi,
  scatter: di,
  kpi: mi,
  table: ui,
  combo: ci
};
function gd({ spec: e, update: t, empty: n }) {
  const a = e.chart.family, r = (l) => {
    l !== a && t(ym(e, l));
  };
  if (n)
    return /* @__PURE__ */ i("div", { className: "pointer-events-none absolute inset-0 grid place-items-center p-4", children: /* @__PURE__ */ f("div", { className: "pointer-events-auto w-full max-w-sm rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur", children: [
      /* @__PURE__ */ i("p", { className: "pb-0.5 text-center text-sm font-medium", children: "Choose a chart type" }),
      /* @__PURE__ */ i("p", { className: "pb-3 text-center text-xs text-muted-foreground", children: "Then add fields to the slots around the chart." }),
      /* @__PURE__ */ i(la, { family: a, onPick: r })
    ] }) });
  const o = Mo[a];
  return /* @__PURE__ */ i("div", { className: "pointer-events-none absolute inset-x-0 top-2 flex justify-center", children: /* @__PURE__ */ f(ke, { children: [
    /* @__PURE__ */ i(Ne, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "pointer-events-auto flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(o, { className: "size-3.5 text-muted-foreground" }),
          No[a],
          /* @__PURE__ */ i(Xe, { className: "size-3 text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ f(we, { align: "center", className: "flex max-h-[70vh] w-72 flex-col gap-2.5 overflow-y-auto p-3", children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(la, { family: a, onPick: r })
      ] }),
      fd(a) ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 border-t border-border pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(md, { spec: e, update: t })
      ] }) : null
    ] })
  ] }) });
}
function la({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "grid grid-cols-4 gap-1.5", children: pd.map((n) => {
    const a = Mo[n], r = n === e;
    return /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: () => t(n),
        "aria-pressed": r,
        className: w(
          "flex flex-col items-center gap-1 rounded-md border px-1 py-2 text-[10px] transition-colors",
          r ? "border-ring bg-accent text-foreground" : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ i(a, { className: "size-4" }),
          No[n]
        ]
      },
      n
    );
  }) });
}
function bd(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function yd(e, t, n, a, r) {
  var kr, Nr, wr, Cr, Sr, _r, Rr, Ar, Mr, Or, Dr, zr, Lr, Tr;
  const { chart: o, query: l } = e, s = o.family, c = n.kinds.length === 1 ? n.kinds[0] : vd(r), u = o.familyOptions ?? {}, d = Array.isArray(u.series) ? u.series : [], h = Array.isArray(u.columns) ? u.columns : [], p = pt(o), b = p[a], y = s === "combo" && n.id === "y", g = s === "table" && n.id === "columns", v = s === "bar" || s === "line" || s === "area", S = ((Nr = (kr = o.mapping) == null ? void 0 : kr.series) == null ? void 0 : Nr.mode) === "measures", _ = v && n.id === "y", N = _ && S, R = y ? (wr = d.find((j) => j.member === a)) == null ? void 0 : wr.label : g ? (Cr = h.find((j) => j.member === a)) == null ? void 0 : Cr.label : N ? b == null ? void 0 : b.label : void 0, C = y ? (Sr = d.find((j) => j.member === a)) == null ? void 0 : Sr.colorToken : N ? b == null ? void 0 : b.colorToken : void 0, k = He(l), D = n.kinds.includes("time") && (k == null ? void 0 : k.dimension) === a, L = D ? k == null ? void 0 : k.granularity : void 0, V = D ? k == null ? void 0 : k.dateRange : void 0, K = y ? ((_r = d.find((j) => j.member === a)) == null ? void 0 : _r.render) ?? "line" : void 0, I = s === "line" && n.id === "y", B = s === "bar" && n.id === "y" && o.orientation !== "horizontal", z = ((Ar = (Rr = o.mapping) == null ? void 0 : Rr.series) == null ? void 0 : Ar.mode) === "pivot", A = ((Or = (Mr = o.mapping) == null ? void 0 : Mr.series) == null ? void 0 : Or.mode) === "pivot" ? o.mapping.series.meta : void 0, Y = (I || B) && (S || z) || y, G = Y ? (y ? (Dr = d.find((j) => j.member === a)) == null ? void 0 : Dr.axis : S ? b == null ? void 0 : b.axis : (zr = A == null ? void 0 : A[a]) == null ? void 0 : zr.axis) ?? "left" : void 0, E = (s === "line" || s === "area") && n.id === "y" && S || y && (K === "line" || K === "area"), T = y ? d.find((j) => j.member === a) : void 0, Q = E ? y ? T == null ? void 0 : T.curve : b == null ? void 0 : b.curve : void 0, ue = E ? y ? T == null ? void 0 : T.dots : b == null ? void 0 : b.dots : void 0, ce = (j) => {
    var Fr, $r;
    if ((Fr = o.mapping) != null && Fr.series && o.mapping.series.mode !== "measures") return;
    const ie = (($r = o.mapping) != null && $r.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : l.measures) ?? [], se = { ...p };
    j && Object.keys(j).length > 0 ? se[a] = j : delete se[a];
    const yt = ye(o);
    yt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: yt }, series: ko(ie, se) }
      }
    });
  }, H = (j) => {
    const ie = d.map((se) => se.member === a ? { ...se, ...j } : se);
    t({ ...e, chart: { ...o, familyOptions: { ...u, series: ie } } });
  }, M = (j) => {
    const ie = h.map((se) => se.member === a ? { ...se, ...j } : se);
    t({ ...e, chart: { ...o, familyOptions: { ...u, columns: ie } } });
  }, X = (j) => {
    y ? H({ label: j }) : g ? M({ label: j }) : N && ce({ ...b, label: j });
  }, fe = (j) => {
    y ? H({ colorToken: j ?? void 0 }) : N && ce({ ...b, colorToken: j ?? void 0 });
  }, Pe = (j) => {
    if (!k) return;
    const ie = { ...k };
    for (const se of Object.keys(j)) {
      const yt = j[se];
      yt === void 0 ? delete ie[se] : ie[se] = yt;
    }
    t({ ...e, query: { ...l, timeDimensions: [ie] } });
  }, We = (j) => Pe({ granularity: j }), Ge = (j) => Pe({ dateRange: j }), Et = (j) => H({ render: j }), It = (j) => {
    var ie, se;
    y ? H({ axis: j }) : N ? ce({ ...b, axis: j }) : ((se = (ie = o.mapping) == null ? void 0 : ie.series) == null ? void 0 : se.mode) === "pivot" && t(Gn(e, s, a, j));
  }, Vt = (j) => {
    y ? H({ curve: j }) : N && ce({ ...b, curve: j });
  }, qt = (j) => {
    y ? H({ dots: j }) : N && ce({ ...b, dots: j });
  }, O = () => t(Nm(e, s, n.id, a)), F = (n.id === "x" || n.id === "slices") && (c === "category" || c === "time"), $ = (Lr = o.mapping) == null ? void 0 : Lr.series, q = ($ && $.mode === "pivot" ? $.value : st(o)[0]) ?? ((Tr = l.measures) == null ? void 0 : Tr[0]), J = F ? c === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...q ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...q ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ae = (() => {
    const j = bd(l.order)[0];
    if (!j) return "none";
    const [ie, se] = j;
    return q && ie === q ? se === "desc" ? "value-desc" : "value-asc" : ie === a ? c === "time" ? se === "desc" ? "time-desc" : "time-asc" : se === "asc" ? "label-asc" : "label-desc" : "none";
  })(), te = (j) => {
    let ie;
    switch (j) {
      case "none":
        ie = void 0;
        break;
      case "value-desc":
        ie = q ? [[q, "desc"]] : void 0;
        break;
      case "value-asc":
        ie = q ? [[q, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        ie = [[a, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ie = [[a, "desc"]];
        break;
    }
    t({ ...e, query: { ...l, order: ie } });
  }, oe = typeof l.limit == "number" ? l.limit : void 0, bt = (j) => t({ ...e, query: { ...l, limit: j && j > 0 ? j : void 0 } }), gn = (s === "bar" || s === "line" || s === "area") && D, Fo = gn && u.comparePrevious === !0;
  return {
    kind: c,
    label: R,
    colorToken: C,
    granularity: L,
    dateRange: V,
    render: K,
    axis: G,
    curve: Q,
    dots: ue,
    canLineStyle: E,
    canAxis: Y,
    canRename: y || g || N,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: _ && S || y,
    isTimeField: D,
    isComboY: y,
    isCategoryField: F,
    sortValue: ae,
    sortOptions: J,
    onSort: te,
    limit: oe,
    onLimit: bt,
    canComparePrevious: gn,
    comparePrevious: Fo,
    comparePreviousReady: gn && V !== void 0,
    onComparePrevious: (j) => t({ ...e, chart: { ...o, familyOptions: { ...u, comparePrevious: j || void 0 } } }),
    onRename: X,
    onRecolor: fe,
    onGranularity: We,
    onDateRange: Ge,
    onRender: Et,
    onAxis: It,
    onCurve: Vt,
    onDots: qt,
    onRemove: O
  };
}
function Gn(e, t, n, a) {
  var l;
  const { chart: r } = e;
  if (t === "combo") {
    const s = r.familyOptions ?? {}, c = (Array.isArray(s.series) ? s.series : []).map(
      (u) => u.member === n ? { ...u, axis: a } : u
    );
    return { ...e, chart: { ...r, familyOptions: { ...s, series: c } } };
  }
  const o = (l = r.mapping) == null ? void 0 : l.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const s = { ...o.meta ?? {} };
    return s[n] = { ...s[n] ?? {}, axis: a }, { ...e, chart: { ...r, mapping: { ...r.mapping, series: { ...o, meta: s } } } };
  }
  return e;
}
function vd(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ca(e, t, n, a) {
  var h;
  const { chart: r, query: o } = e, l = r.family, s = (p) => {
    if (a < 0 || a >= p.length || n === a) return p;
    const b = p.slice(), [y] = b.splice(n, 1);
    return b.splice(a, 0, y), b;
  };
  if (l === "combo" && t.id === "y") {
    const p = r.familyOptions ?? {}, b = s(Array.isArray(p.series) ? p.series : []), y = s(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: y },
      chart: { ...r, familyOptions: { ...p, series: b } }
    };
  }
  if (l === "table" && t.id === "columns") {
    const p = r.familyOptions ?? {}, b = s(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...r, familyOptions: { ...p, columns: b } } };
  }
  const c = s(o.measures ?? []), u = (h = r.mapping) == null ? void 0 : h.series;
  let d = r.mapping;
  if (u && u.mode === "measures")
    d = { ...r.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const p = s(u.values);
    d = { ...r.mapping, series: { ...u, value: p[0], values: p } };
  }
  return { ...e, query: { ...o, measures: c }, chart: { ...r, mapping: d } };
}
function xd(e, t, n) {
  const a = fn(e), r = a.filter((N) => N.type === "view"), o = Pt(t), l = Object.values(o).flat();
  let s;
  for (const N of l) {
    const R = Oe(e, N);
    if (R) {
      s = R;
      break;
    }
  }
  const c = !s && n ? Rt(e, n) : void 0, u = s ? Rt(e, s.cube) : c, d = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, h = (s == null ? void 0 : s.connectedComponent) ?? (c == null ? void 0 : c.connectedComponent), p = t.query.measures ?? [], b = p.length ? wt(p[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: r, measureSource: b, scopeComponent: h };
  const y = b ?? (s == null ? void 0 : s.cube) ?? (c == null ? void 0 : c.name), g = y ? Rt(e, y) : void 0, v = a.filter((N) => N.type === "cube" && N.connectedComponent !== void 0), _ = (h === void 0 ? v : v.filter((N) => N.connectedComponent === h)).filter((N) => N.name !== y).sort((N, R) => N.title.localeCompare(R.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: _,
    views: r,
    measureSource: b,
    scopeComponent: h
  };
}
const kd = Ve.options;
function Nd({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: a,
  className: r
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: w("flex flex-wrap items-center gap-1.5", r),
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
            className: w(
              "relative flex size-6 items-center justify-center rounded-full border text-[9px] font-medium uppercase text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
              e === void 0 ? "border-ring ring-2 ring-ring/40" : "border-input hover:border-ring"
            ),
            children: "A"
          }
        ) : null,
        kd.map((o) => {
          const l = e === o;
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": l,
              "aria-label": o,
              title: o,
              disabled: a,
              onClick: () => t(l && n ? null : o),
              className: w(
                "size-6 rounded-full border transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
                l ? "border-ring ring-2 ring-ring/40" : "border-black/10 hover:border-ring"
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
const wd = Ye.options, Cd = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Oo({
  value: e,
  onChange: t,
  options: n,
  placeholder: a = "Granularity…",
  disabled: r,
  id: o,
  className: l
}) {
  const s = n && n.length > 0 ? n : wd;
  return /* @__PURE__ */ f(
    _e,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: r,
      children: [
        /* @__PURE__ */ i(Ae, { id: o, className: l, children: /* @__PURE__ */ i(Re, { placeholder: a }) }),
        /* @__PURE__ */ i(Me, { children: s.map((c) => /* @__PURE__ */ i(pe, { value: c, children: Cd[c] }, c)) })
      ]
    }
  );
}
const ua = { bar: "Bar", line: "Line", area: "Area" }, Sd = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function _d({
  spec: e,
  update: t,
  well: n,
  member: a,
  option: r,
  resolvedColor: o,
  reorder: l,
  className: s
}) {
  const c = yd(e, t, n, a, r), u = (r == null ? void 0 : r.label) ?? a, d = c.label || u, h = c.canColor && o !== void 0, p = c.canRename || h || c.isTimeField || c.isCategoryField || c.isComboY && !!c.render || c.canAxis || c.canLineStyle || !!l, b = (g) => {
    const v = g.trim();
    c.onRename(v.length > 0 ? v : void 0);
  }, y = /* @__PURE__ */ f(re, { children: [
    h ? /* @__PURE__ */ i(
      "span",
      {
        className: "size-3 shrink-0 rounded-full border border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : r ? rn(r.type) : null,
    /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: d })
  ] });
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "field-pill",
      className: w(
        "flex items-center gap-1 rounded-md border border-border bg-background py-1 pl-2 pr-1 text-sm shadow-sm",
        s
      ),
      children: [
        p ? /* @__PURE__ */ f(ke, { children: [
          /* @__PURE__ */ i(Ne, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "flex min-w-0 flex-1 items-center gap-1.5 text-left outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
              title: `Edit ${d}`,
              children: y
            }
          ) }),
          /* @__PURE__ */ i(we, { align: "start", className: "w-60 p-3", children: /* @__PURE__ */ f("div", { className: "flex flex-col gap-3", children: [
            c.canRename ? /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                me,
                {
                  defaultValue: c.label ?? "",
                  placeholder: u,
                  className: "h-8",
                  onBlur: (g) => b(g.target.value),
                  onKeyDown: (g) => {
                    g.key === "Enter" && (b(g.target.value), g.target.blur());
                  }
                }
              )
            ] }) : null,
            h ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Color" }),
              /* @__PURE__ */ i(Nd, { value: c.colorToken, onChange: c.onRecolor })
            ] }) : null,
            c.isTimeField ? /* @__PURE__ */ f(re, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  lt,
                  {
                    kind: "dateRange",
                    value: c.dateRange,
                    onChange: c.onDateRange,
                    renderFixed: (g, v) => /* @__PURE__ */ i(vr, { value: g, onChange: v })
                  }
                )
              ] }),
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  lt,
                  {
                    kind: "granularity",
                    value: c.granularity,
                    onChange: c.onGranularity,
                    renderFixed: (g, v) => /* @__PURE__ */ i(Oo, { value: g, onChange: v, className: "h-8 w-full" })
                  }
                )
              ] }),
              c.canComparePrevious ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ f("label", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    Wn,
                    {
                      checked: c.comparePrevious,
                      onChange: c.onComparePrevious,
                      "aria-label": "Compare to previous period"
                    }
                  )
                ] }),
                c.comparePrevious && !c.comparePreviousReady ? /* @__PURE__ */ i("p", { className: "text-[10px] leading-tight text-muted-foreground/80", children: "Set a date range above to show the previous period." }) : null
              ] }) : null
            ] }) : null,
            c.isCategoryField ? /* @__PURE__ */ f(re, { children: [
              /* @__PURE__ */ f("label", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Sort" }),
                /* @__PURE__ */ i(
                  "select",
                  {
                    value: c.sortValue,
                    onChange: (g) => c.onSort(g.target.value),
                    className: "h-8 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    children: c.sortOptions.map((g) => /* @__PURE__ */ i("option", { value: g.key, children: g.label }, g.key))
                  }
                )
              ] }),
              /* @__PURE__ */ f("label", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Show top (leave blank for all)" }),
                /* @__PURE__ */ i(
                  me,
                  {
                    type: "number",
                    min: 1,
                    defaultValue: c.limit ?? "",
                    placeholder: "All",
                    className: "h-8",
                    onBlur: (g) => {
                      const v = g.target.value.trim();
                      c.onLimit(v === "" ? void 0 : Number(v));
                    },
                    onKeyDown: (g) => {
                      if (g.key === "Enter") {
                        const v = g.target.value.trim();
                        c.onLimit(v === "" ? void 0 : Number(v)), g.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            c.isComboY && c.render ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Draw as" }),
              /* @__PURE__ */ i("div", { className: "flex gap-1", children: Object.keys(ua).map((g) => /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  onClick: () => c.onRender(g),
                  className: w(
                    "flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs",
                    c.render === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                  ),
                  children: [
                    ua[g],
                    c.render === g ? /* @__PURE__ */ i(Fe, { className: "size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            c.canAxis ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Side" }),
              /* @__PURE__ */ i("div", { className: "flex gap-1", children: ["left", "right"].map((g) => /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  onClick: () => c.onAxis(g),
                  className: w(
                    "flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs capitalize",
                    c.axis === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                  ),
                  children: [
                    g,
                    c.axis === g ? /* @__PURE__ */ i(Fe, { className: "size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            c.canLineStyle ? /* @__PURE__ */ f(re, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-1", children: Sd.map(([g, v]) => /* @__PURE__ */ f(
                  "button",
                  {
                    type: "button",
                    onClick: () => c.onCurve(g),
                    className: w(
                      "flex items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs",
                      (c.curve ?? "monotone") === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                    ),
                    children: [
                      v,
                      (c.curve ?? "monotone") === g ? /* @__PURE__ */ i(Fe, { className: "size-3" }) : null
                    ]
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ f("label", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(Wn, { checked: c.dots === !0, onChange: c.onDots, "aria-label": "Show points" })
              ] })
            ] }) : null,
            l ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ f(
                W,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 flex-1",
                  disabled: !l.canUp,
                  onClick: l.onUp,
                  children: [
                    /* @__PURE__ */ i(Jn, { className: "size-3.5" }),
                    "Up"
                  ]
                }
              ),
              /* @__PURE__ */ f(
                W,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 flex-1",
                  disabled: !l.canDown,
                  onClick: l.onDown,
                  children: [
                    /* @__PURE__ */ i(Xn, { className: "size-3.5" }),
                    "Down"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ f(
              W,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 justify-start text-destructive hover:text-destructive",
                onClick: c.onRemove,
                children: [
                  /* @__PURE__ */ i(Pr, { className: "size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "flex min-w-0 flex-1 items-center gap-1.5", title: d, children: y }),
        /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "icon",
            className: "size-6 shrink-0 text-muted-foreground hover:text-destructive",
            onClick: c.onRemove,
            "aria-label": `Remove ${d}`,
            children: /* @__PURE__ */ i(Pr, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function ma({
  spec: e,
  update: t,
  well: n,
  placed: a,
  allPlaced: r,
  optionFor: o,
  colorFor: l,
  scope: s,
  blockReason: c,
  onAdd: u,
  badge: d,
  orientation: h,
  lockedSingle: p,
  disableReorder: b,
  label: y,
  note: g,
  pickerSide: v,
  pickerAlign: S,
  control: _
}) {
  const N = n.cardinality === "many" && !p, R = N || a.length === 0, C = a.length, k = h === "vertical", D = y ?? n.label, L = /* @__PURE__ */ i(
    _o,
    {
      well: n,
      placed: r,
      scope: s,
      blockReason: c,
      onSelect: u,
      side: v ?? (k ? "right" : "top"),
      align: S ?? "start",
      children: /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          className: w(
            "flex items-center justify-center gap-1 rounded-md border border-dashed border-input bg-background/60 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-foreground",
            k && "w-full"
          ),
          children: [
            /* @__PURE__ */ i(Tt, { className: "size-3.5" }),
            a.length === 0 ? D : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "well-group",
      className: w("flex flex-col gap-1", !k && "min-w-0"),
      children: [
        /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "truncate", children: D }),
          d ? /* @__PURE__ */ i("span", { className: "truncate rounded-sm bg-muted px-1 py-px text-[9px] normal-case text-muted-foreground", children: d }) : null,
          n.optional && a.length === 0 ? /* @__PURE__ */ i("span", { className: "normal-case text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        _ ? /* @__PURE__ */ i("div", { className: "pb-0.5", children: _ }) : null,
        /* @__PURE__ */ f("div", { className: w("flex gap-1", k ? "flex-col" : "flex-row flex-wrap items-center"), children: [
          a.map((V, K) => /* @__PURE__ */ i(
            _d,
            {
              spec: e,
              update: t,
              well: n,
              member: V,
              option: o(V),
              resolvedColor: l(V),
              className: k ? "w-full" : void 0,
              reorder: N && C > 1 && !b ? {
                canUp: K > 0,
                canDown: K < C - 1,
                onUp: () => t(ca(e, n, K, K - 1)),
                onDown: () => t(ca(e, n, K, K + 1))
              } : void 0
            },
            V
          )),
          R ? L : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "px-0.5 text-[10px] leading-tight text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function On({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ f(ke, { children: [
    /* @__PURE__ */ i(Ne, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium shadow-sm transition-colors hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "truncate", children: e }),
          /* @__PURE__ */ f("span", { className: "flex shrink-0 items-center gap-1 text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(Xe, { className: "size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(we, { align: "start", className: "max-h-[72vh] w-64 overflow-y-auto p-3", children: n })
  ] });
}
function xr(e, t) {
  const { chart: n } = e, a = n.familyOptions ?? {};
  return { chart: n, fo: a, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...o } } }) };
}
function Rd({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = xr(e, t), r = xo(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.display ?? "number", s = n.gauge, c = (d) => {
    const h = o ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!h) return;
    const p = { ...h };
    for (const b of Object.keys(d)) {
      const y = d[b];
      y === void 0 ? delete p[b] : p[b] = y;
    }
    delete p.granularity, t({ ...e, query: { ...e.query, timeDimensions: [p] } });
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(At, { label: "Time field", children: /* @__PURE__ */ i(
      So,
      {
        cube: r,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (d) => c({ dimension: d }),
        placeholder: "All time",
        className: "h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(At, { label: "Date range", children: /* @__PURE__ */ i(
      lt,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (d) => c({ dateRange: d }),
        renderFixed: (d, h) => /* @__PURE__ */ i(vr, { value: d, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ i(le, { label: "Display", children: /* @__PURE__ */ i(
      Ot,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: l,
        onChange: (d) => a({ display: d })
      }
    ) }),
    l === "gauge" ? /* @__PURE__ */ i(At, { label: "Gauge max", children: /* @__PURE__ */ i(
      me,
      {
        type: "number",
        className: "h-8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const h = parseFloat(d.target.value);
          a({ gauge: Number.isFinite(h) ? { ...s ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Ad({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = xr(e, t), r = n.comparison, o = r !== void 0, l = x.useRef(void 0);
  r && (l.current = r);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (r == null ? void 0 : r.goodDirection) ?? "up";
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => a({
          comparison: d ? l.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ i(le, { label: "Against", children: /* @__PURE__ */ i(
        Ot,
        {
          "aria-label": "Compare against",
          size: "sm",
          options: [
            { value: "previousPeriod", label: "Prev period" },
            { value: "value", label: "Fixed value" }
          ],
          value: (r == null ? void 0 : r.mode) ?? "previousPeriod",
          onChange: (d) => a({ comparison: { ...r, mode: d } })
        }
      ) }),
      (r == null ? void 0 : r.mode) === "value" ? /* @__PURE__ */ i(At, { label: "Baseline value", children: /* @__PURE__ */ i(
        me,
        {
          type: "number",
          className: "h-8",
          value: (r == null ? void 0 : r.value) ?? "",
          onChange: (d) => {
            const h = parseFloat(d.target.value);
            a({ comparison: { ...r, value: Number.isFinite(h) ? h : void 0 } });
          }
        }
      ) }) : null,
      (r == null ? void 0 : r.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ i("p", { className: "text-[10px] leading-tight text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
      /* @__PURE__ */ i(
        he,
        {
          label: "Show as %",
          checked: ((r == null ? void 0 : r.showAsPercent) ?? !0) !== !1,
          onChange: (d) => a({ comparison: { ...r, showAsPercent: d } })
        }
      ),
      /* @__PURE__ */ i(
        he,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the up/down colors).",
          checked: c !== "down",
          onChange: (d) => a({ goodDirection: d ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Md({ spec: e, update: t }) {
  const { fo: n, setFO: a } = xr(e, t), r = n.sparkline, o = r !== void 0, l = n.comparison !== void 0, s = n.goodDirection ?? "up", c = r == null ? void 0 : r.granularity;
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => a({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ i(At, { label: "Trend granularity", children: /* @__PURE__ */ i(
        lt,
        {
          kind: "granularity",
          value: c,
          onChange: (u) => a({ sparkline: { ...r, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(Oo, { value: u, onChange: d, className: "h-8 w-full" })
        }
      ) }),
      l ? null : /* @__PURE__ */ i(
        he,
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
function At({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: e }),
    t
  ] });
}
const Od = {
  bar: { left: ["y"], bottom: ["x", "color"] },
  line: { left: ["y"], bottom: ["x", "color"] },
  area: { left: ["y"], bottom: ["x", "color"] },
  combo: { left: ["y"], bottom: ["x"] },
  pie: { left: ["size"], bottom: ["slices"] },
  scatter: { left: ["sy"], bottom: ["sx", "size", "color"] },
  kpi: { left: ["value"], bottom: [] },
  table: { left: ["columns"], bottom: [] }
}, Dd = /* @__PURE__ */ new Set(["line", "combo"]);
function zd({
  spec: e,
  update: t,
  toolbar: n,
  children: a
}) {
  var Et, It, Vt, qt;
  const { meta: r } = Be(), { locale: o } = Ke(), { chart: l } = e, s = l.family, c = xo(e), u = x.useMemo(() => cn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), d = x.useCallback(
    (O) => O && (o == null ? void 0 : o.unitSystem) === "imperial" && u[O] ? u[O].imperialUnit : O,
    [o == null ? void 0 : o.unitSystem, u]
  ), h = x.useMemo(() => vm(s), [s]), p = x.useMemo(() => Pt(e), [e]), b = x.useMemo(() => new Map(h.map((O) => [O.id, O])), [h]), [y, g] = x.useState(void 0), v = x.useMemo(() => xd(r, e, y), [r, e, y]), S = x.useMemo(() => Object.values(p).flat(), [p]), _ = x.useCallback(
    (O) => {
      g(O), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), N = x.useMemo(
    () => {
      var O;
      return v.viewLocked ? [v.viewLocked] : [(O = v.sourceCube) == null ? void 0 : O.name, ...v.relatedCubes.map((F) => F.name)].filter(
        Boolean
      );
    },
    [v]
  ), R = x.useMemo(
    () => Object.values(p).every((O) => O.length === 0),
    [p]
  ), C = Dd.has(s), k = x.useCallback(
    (O) => {
      var q, J, ae;
      if (s === "combo") {
        const te = l.familyOptions ?? {}, oe = (Array.isArray(te.series) ? te.series : []).find(
          (bt) => bt.member === O
        );
        return (oe == null ? void 0 : oe.axis) === "right" ? "right" : "left";
      }
      const F = (q = l.mapping) == null ? void 0 : q.series;
      return (F && (F.mode === "measures" || F.mode === "pivot") ? (ae = (J = F.meta) == null ? void 0 : J[O]) == null ? void 0 : ae.axis : void 0) === "right" ? "right" : "left";
    },
    [s, l.familyOptions, l.mapping]
  ), D = x.useMemo(() => {
    var ae, te;
    const O = p.y ?? [], F = (oe) => O.find((bt) => k(bt) === oe), $ = F("left"), q = C ? F("right") : void 0, J = (oe) => oe ? Oe(r, oe) : void 0;
    return {
      leftKey: $ ? vt(J($)) : void 0,
      rightKey: q ? vt(J(q)) : void 0,
      leftLabel: $ ? da(J($), d((ae = J($)) == null ? void 0 : ae.unit)) : void 0,
      rightLabel: q ? da(J(q), d((te = J(q)) == null ? void 0 : te.unit)) : void 0
    };
  }, [p, C, k, r, d]), L = x.useCallback(
    (O) => {
      const F = vt(O), { leftKey: $, rightKey: q } = D;
      return $ === void 0 || F === $ ? "left" : q === void 0 || F === q ? "right" : "left";
    },
    [D]
  ), V = x.useCallback(
    (O, F) => {
      var $;
      if (F) {
        if (v.scopeComponent !== void 0 && F.connectedComponent !== v.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (F.memberType === "measure" && v.measureSource && F.cube !== v.measureSource)
          return `Measures come from one table (${(($ = v.sourceCube) == null ? void 0 : $.title) ?? v.measureSource}). Remove them to switch.`;
        if (O === "y" && F.memberType === "measure") {
          const { leftKey: q, rightKey: J, leftLabel: ae, rightLabel: te } = D, oe = vt(F);
          if (C) {
            if (q !== void 0 && J !== void 0 && oe !== q && oe !== J)
              return `Both axes show ${ae} & ${te} — remove one to add a third unit.`;
          } else if (q !== void 0 && oe !== q)
            return `This axis shows ${ae}; ${F.label ?? "this field"} is ${Hn(F)}`;
        }
      }
    },
    [v, D, C]
  ), K = C ? [D.leftLabel, D.rightLabel].filter(Boolean).join(" · ") || void 0 : D.leftLabel, I = x.useMemo(() => {
    var F;
    const O = {};
    if (s === "bar" || s === "line" || s === "area") {
      const $ = (F = l.mapping) == null ? void 0 : F.series;
      if ($ && $.mode === "measures") {
        const q = $.members.map((ae) => {
          var te, oe;
          return { key: ae, colorToken: (oe = (te = $.meta) == null ? void 0 : te[ae]) == null ? void 0 : oe.colorToken };
        }), J = Tn(q, l.colors);
        $.members.forEach((ae, te) => {
          O[ae] = J[te];
        });
      }
    } else if (s === "combo") {
      const $ = l.familyOptions ?? {}, q = Array.isArray($.series) ? $.series : [], J = q.map((te) => ({ key: te.member, colorToken: te.colorToken })), ae = Tn(J, l.colors);
      q.forEach((te, oe) => {
        O[te.member] = ae[oe];
      });
    }
    return O;
  }, [s, l.mapping, l.colors, l.familyOptions]), B = x.useCallback(
    (O, F, $) => {
      const q = Oe(r, F);
      if (V(O, q)) return;
      let J = ea(e, s, O, F, $);
      C && O === "y" && (J = Gn(J, s, F, L(q))), t(J);
    },
    [V, r, t, e, s, C, L]
  ), z = x.useCallback(
    (O, F) => {
      var J;
      if (!F) return;
      if (v.scopeComponent !== void 0 && F.connectedComponent !== v.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (F.memberType === "measure" && v.measureSource && F.cube !== v.measureSource)
        return `Measures come from one table (${((J = v.sourceCube) == null ? void 0 : J.title) ?? v.measureSource}). Remove them to switch.`;
      const $ = O === "left" ? D.leftKey : D.rightKey, q = O === "left" ? D.leftLabel : D.rightLabel;
      if ($ !== void 0 && vt(F) !== $)
        return `This axis shows ${q}; ${F.label ?? "this field"} is ${Hn(F)}`;
    },
    [v, D]
  ), A = x.useCallback(
    (O, F, $) => {
      const q = Oe(r, F);
      z(O, q) || t(Gn(ea(e, s, "y", F, $), s, F, O));
    },
    [z, r, t, e, s]
  ), Y = s === "bar" && l.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : Od[s], G = Y.left.map((O) => b.get(O)).filter(Boolean), P = Y.bottom.map((O) => b.get(O)).filter(Boolean), U = (Et = p.color) == null ? void 0 : Et[0], E = ((It = p.y) == null ? void 0 : It.length) ?? 0, T = U && E > 1 ? `${E} measures × ${((Vt = Oe(r, U)) == null ? void 0 : Vt.label) ?? "this split"} — one series per measure per value.` : void 0, Q = s !== "kpi" && s !== "table", ue = p.y ?? [], ce = ue.find((O) => k(O) !== "right"), H = C ? ue.find((O) => k(O) === "right") : void 0, M = (O) => {
    var q, J, ae, te;
    if (!O) return;
    const F = (q = l.mapping) == null ? void 0 : q.series;
    return (F && F.mode === "measures" ? (ae = (J = F.meta) == null ? void 0 : J[O]) == null ? void 0 : ae.label : void 0) ?? ((te = Oe(r, O)) == null ? void 0 : te.label);
  }, X = (O) => {
    var $, q, J, ae;
    const F = (te, oe) => oe ? /* @__PURE__ */ i(sa, { spec: e, update: t, axis: te, title: "Title", auto: M(oe) }) : null;
    switch (O) {
      case "y":
        return F("y", ce);
      // single value axis (bar / area)
      case "x":
        return F("x", (q = ($ = l.mapping) == null ? void 0 : $.category) == null ? void 0 : q.member);
      case "sy":
        return F("y", (J = p.sy) == null ? void 0 : J[0]);
      // scatter Y axis
      case "sx":
        return F("x", (ae = p.sx) == null ? void 0 : ae[0]);
      // scatter X axis
      default:
        return null;
    }
  }, fe = (O, F) => /* @__PURE__ */ i(
    ma,
    {
      spec: e,
      update: t,
      well: O,
      placed: p[O.id] ?? [],
      allPlaced: S,
      optionFor: ($) => Oe(r, $),
      colorFor: ($) => I[$],
      scope: v,
      blockReason: ($) => V(O.id, $),
      onAdd: ($, q) => B(O.id, $, q),
      badge: O.id === "y" ? K : void 0,
      orientation: F,
      note: O.id === "color" ? T : void 0,
      control: X(O.id)
    },
    O.id
  ), Pe = b.get("y"), We = (O) => {
    if (!Pe) return null;
    const F = O === "left" ? ce : H;
    return /* @__PURE__ */ i(
      ma,
      {
        spec: e,
        update: t,
        well: Pe,
        label: O === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter(($) => k($) === O),
        allPlaced: S,
        optionFor: ($) => Oe(r, $),
        colorFor: ($) => I[$],
        scope: v,
        blockReason: ($) => z(O, $),
        onAdd: ($, q) => A(O, $, q),
        badge: O === "left" ? D.leftLabel : D.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: F ? /* @__PURE__ */ i(
          sa,
          {
            spec: e,
            update: t,
            axis: O === "left" ? "y" : "y2",
            title: "Title",
            auto: M(F)
          }
        ) : null
      },
      `y-${O}`
    );
  }, Ge = () => {
    const O = b.get("value"), F = (p.value ?? []).length > 0, $ = l.familyOptions ?? {};
    return /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
        O ? fe(O, "vertical") : null,
        F ? /* @__PURE__ */ i(
          On,
          {
            label: "Time, range & display",
            summary: $.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(Rd, { spec: e, update: t })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ i(On, { label: "Comparison", summary: $.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Ad, { spec: e, update: t }) }),
        /* @__PURE__ */ i(On, { label: "Sparkline", summary: $.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Md, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ f("div", { "data-slot": "chart-edit-overlay", className: "flex h-full w-full flex-col gap-2", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i("div", { className: "flex min-w-0 items-center gap-2", children: n }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ i(
          ld,
          {
            currentName: v.viewLocked ?? ((qt = v.sourceCube) == null ? void 0 : qt.name),
            hasFields: S.length > 0,
            onSelect: _
          }
        ),
        /* @__PURE__ */ i(id, { spec: e, update: t, cube: c, scopeCubes: N, scope: v })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex min-h-0 flex-1 gap-2", children: [
      G.length > 0 ? /* @__PURE__ */ i("div", { className: w("flex shrink-0 flex-col gap-3 overflow-y-auto pr-1", s === "kpi" ? "w-56" : "w-40"), children: s === "kpi" ? Ge() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        G.flatMap(
          (O) => C && O.id === "y" ? [We("left"), We("right")] : [fe(O, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 flex-col gap-2", children: [
        /* @__PURE__ */ f("div", { className: "relative min-h-0 flex-1", children: [
          a,
          /* @__PURE__ */ i(gd, { spec: e, update: t, empty: R })
        ] }),
        P.length > 0 ? /* @__PURE__ */ f("div", { className: "flex flex-wrap items-start gap-x-5 gap-y-2 pl-1", children: [
          P.map((O) => fe(O, "horizontal")),
          Q && !R ? /* @__PURE__ */ i(cd, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function da(e, t) {
  const n = Hn(e), a = t ?? (e == null ? void 0 : e.unit);
  return a && a !== n ? `${n} (${a})` : n;
}
function Do(e, t) {
  const n = x.useRef(e);
  x.useEffect(() => {
    n.current = e;
  }, [e]);
  const a = x.useRef(null);
  return x.useEffect(
    () => () => {
      a.current !== null && clearTimeout(a.current);
    },
    []
  ), x.useCallback(
    (...r) => {
      a.current !== null && clearTimeout(a.current), a.current = setTimeout(() => {
        a.current = null, n.current(...r);
      }, t);
    },
    [t]
  );
}
function fa(e) {
  const t = qa.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Ld({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [a, r] = x.useState(e), [o, l] = x.useState(e);
  x.useEffect(() => {
    r(e), l(e);
  }, [e]);
  const s = Do((h) => t(h), n), c = x.useMemo(() => fa(a), [a]), u = c.length === 0, d = x.useCallback(
    (h) => {
      r(h), fa(h).length === 0 && (l(h), s(h));
    },
    [s]
  );
  return { draft: a, issues: c, valid: u, committed: o, update: d };
}
const Td = () => {
};
function Fd({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: a = 250,
  fill: r = !1,
  className: o
}) {
  const { draft: l, issues: s, valid: c, committed: u, update: d } = Ld({
    spec: e,
    onChange: t ?? Td,
    debounceMs: a
  }), h = u, p = (N) => {
    var R, C, k;
    return (((R = N.measures) == null ? void 0 : R.length) ?? 0) > 0 || (((C = N.dimensions) == null ? void 0 : C.length) ?? 0) > 0 || (((k = N.timeDimensions) == null ? void 0 : k.some((D) => typeof D.granularity == "string")) ?? !1);
  }, b = (N) => {
    var R;
    return (((R = N.measures) == null ? void 0 : R.length) ?? 0) > 0;
  }, y = l.chart.family !== "table", g = p(l.query) && p(h.query) && (!y || b(l.query) && b(h.query)), v = y && !b(l.query) ? `Add a value (measure) to build this ${l.chart.family} chart.` : "Add fields from the axes to build this chart.", S = g ? /* @__PURE__ */ i(gr, { query: h.query, chart: h.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "flex size-full items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "max-w-[16rem]", children: v }) }), _ = n ? /* @__PURE__ */ f(W, { size: "sm", disabled: !c, onClick: () => n(u), children: [
    /* @__PURE__ */ i(Da, { className: "size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "chart-editor",
      className: w("flex w-full flex-col gap-2", r ? "h-full" : "min-h-[28rem]", o),
      children: [
        c ? null : /* @__PURE__ */ f(ir, { variant: "destructive", children: [
          /* @__PURE__ */ i(ka, { className: "size-4" }),
          /* @__PURE__ */ i(sr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(lr, { children: /* @__PURE__ */ f("ul", { className: "list-disc pl-4", children: [
            s.slice(0, 3).map((N, R) => /* @__PURE__ */ f("li", { children: [
              N.path ? /* @__PURE__ */ i("span", { className: "font-mono text-xs", children: N.path }) : null,
              " ",
              N.message
            ] }, R)),
            s.length > 3 ? /* @__PURE__ */ f("li", { children: [
              "…and ",
              s.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ i(zd, { spec: l, update: d, toolbar: _, children: S }) })
      ]
    }
  );
}
function $d({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: a,
  onUndo: r,
  onRedo: o,
  canUndo: l,
  canRedo: s,
  onDiscard: c,
  discardDisabled: u,
  onSave: d,
  saveDisabled: h,
  className: p
}) {
  const b = r || o;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: w(
        "flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2",
        p
      ),
      children: [
        /* @__PURE__ */ i(
          me,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (y) => t(y.target.value),
            className: "h-8 w-full min-w-0 flex-1 sm:w-auto"
          }
        ),
        /* @__PURE__ */ f("div", { className: "flex flex-wrap items-center gap-1", children: [
          /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(Oa, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(er, {}),
            " Text"
          ] }),
          /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(gi, {}),
            " Input"
          ] }),
          a ? /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: a, children: [
            /* @__PURE__ */ i(bi, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ f("div", { className: "ml-auto flex items-center gap-1", children: [
          b ? /* @__PURE__ */ f(re, { children: [
            /* @__PURE__ */ i(
              W,
              {
                variant: "ghost",
                size: "icon",
                onClick: r,
                disabled: !l,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(yi, {})
              }
            ),
            /* @__PURE__ */ i(
              W,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !s,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ i(vi, {})
              }
            )
          ] }) : null,
          c ? /* @__PURE__ */ f(
            W,
            {
              variant: "ghost",
              size: "sm",
              onClick: c,
              disabled: u,
              className: "text-muted-foreground hover:text-destructive",
              children: [
                /* @__PURE__ */ i(xi, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ f(W, { size: "sm", onClick: d, disabled: h, children: [
            /* @__PURE__ */ i(Da, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const zo = "lg", Lo = 12;
function Pd(e, t) {
  const n = t[zo];
  if (n && n.length > 0) return n;
  let a, r = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const l = o.reduce((s, c) => Math.max(s, c.x + c.w), 0);
    l > r && (a = o, r = l);
  }
  return a ?? e;
}
function jd(e, t) {
  const n = new Map(e.map((l) => [l.i, l])), a = new Map(t.map((l) => [l.i, l])), r = [], o = (l, s) => {
    const c = {
      i: l.i,
      x: l.x,
      y: l.y,
      w: l.w,
      h: l.h
    };
    (s == null ? void 0 : s.minW) !== void 0 && (c.minW = s.minW), (s == null ? void 0 : s.minH) !== void 0 && (c.minH = s.minH), (s == null ? void 0 : s.static) !== void 0 && (c.static = s.static), r.push(c);
  };
  for (const l of e) {
    const s = a.get(l.i);
    s && o(s, l);
  }
  for (const l of t)
    n.has(l.i) || o(l, void 0);
  return r;
}
const Ed = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Id(e, t, n, a = Lo) {
  const r = Ed[n], o = Math.min(r.w, a), l = e.reduce((s, c) => Math.max(s, c.y + c.h), 0);
  return {
    i: t,
    x: 0,
    y: l,
    w: o,
    h: r.h,
    minW: Math.min(r.minW, o),
    minH: r.minH
  };
}
function To(e, t, n = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? Lo) {
  const r = Id(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, r]
  };
}
function Vd(e, t, n) {
  const a = e.widgets.find((o) => o.id === t);
  if (!a) return e;
  const r = JSON.parse(JSON.stringify(a));
  return r.id = n, To(e, r);
}
function qd(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function Kd(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Bd = 12;
function Hd(e) {
  return {
    breakpoints: { lg: 996, md: 768, sm: 480, xs: 0 },
    cols: {
      lg: e,
      md: Math.max(1, Math.round(e * 0.66)),
      sm: Math.max(1, Math.round(e * 0.5)),
      xs: 1
    }
  };
}
function Wd(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Gd({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: a,
  onDuplicate: r,
  onDelete: o,
  onLayoutChange: l
}) {
  const [s, c] = so(), u = e.grid ?? {}, d = u.cols ?? Bd, h = u.rowHeight ?? 40, p = u.margin ?? [12, 12], b = u.containerPadding ?? [0, 0], { breakpoints: y, cols: g } = x.useMemo(
    () => Hd(d),
    [d]
  ), v = x.useMemo(
    () => ({ [zo]: Wd(e.layout) }),
    [e.layout]
  ), S = x.useMemo(
    () => new Map(e.widgets.map((C) => [C.id, C])),
    [e.widgets]
  ), _ = x.useRef(l);
  x.useEffect(() => {
    _.current = l;
  }, [l]);
  const N = x.useRef(null), R = x.useCallback(
    (C, k) => {
      const D = Pd(C, k);
      _.current(D.map((L) => ({ ...L })));
    },
    []
  );
  return /* @__PURE__ */ i(hr, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "w-full [&_.react-resizable-handle]:z-20", children: c > 0 ? /* @__PURE__ */ i(
    La,
    {
      width: c,
      layouts: v,
      breakpoints: y,
      cols: g,
      rowHeight: h,
      margin: p,
      containerPadding: b,
      dragConfig: { enabled: !0, handle: `.${Zt}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: R,
      children: e.layout.map((C) => {
        const k = S.get(C.i);
        if (!k) return null;
        const D = k.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ f(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${k.title ?? k.type}`,
              "aria-pressed": D,
              onPointerDown: (L) => {
                N.current = { x: L.clientX, y: L.clientY };
              },
              onClick: (L) => {
                const V = N.current;
                V && Math.hypot(L.clientX - V.x, L.clientY - V.y) > 5 || n(k.id);
              },
              onKeyDown: (L) => {
                (L.key === "Enter" || L.key === " ") && (L.preventDefault(), n(k.id));
              },
              className: w(
                "group relative h-full w-full cursor-move rounded-xl ring-offset-2 ring-offset-background transition-shadow focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                D ? "ring-2 ring-primary" : "ring-0 focus-visible:ring-2 focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(go, { widget: k, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: w(Zt, "absolute inset-0 z-10 cursor-move rounded-xl") }),
                /* @__PURE__ */ f("div", { className: "absolute right-2 top-2 z-20 flex items-center gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${k.title ?? k.type}`,
                      onClick: (L) => {
                        L.stopPropagation(), a(k.id);
                      },
                      className: w(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-accent hover:text-foreground [&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(ki, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${k.title ?? k.type}`,
                      onClick: (L) => {
                        L.stopPropagation(), r(k.id);
                      },
                      className: w(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-accent hover:text-foreground [&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Ni, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${k.title ?? k.type}`,
                      onClick: (L) => {
                        L.stopPropagation(), o(k.id);
                      },
                      className: w(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-destructive hover:text-destructive-foreground [&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(ct, {})
                    }
                  )
                ] })
              ]
            },
            C.i
          )
        );
      })
    }
  ) : null }) });
}
function Ud(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Yd({
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
  const r = Ta({
    extensions: [$a],
    editable: !0,
    content: Ud(e.doc),
    onUpdate: ({ editor: o }) => {
      const l = o.getJSON();
      n.current({ ...a.current, doc: l });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: w(
          lo,
          "min-h-[8rem] rounded-md border border-input bg-background px-3 py-2",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        )
      }
    }
  });
  return r ? /* @__PURE__ */ i(le, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(Qd, { editor: r }),
    /* @__PURE__ */ i(Fa, { editor: r })
  ] }) }) : /* @__PURE__ */ i("div", { className: "text-sm text-muted-foreground", children: "Loading editor…" });
}
function je({ active: e, onClick: t, title: n, children: a }) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (r) => r.preventDefault(),
      onClick: t,
      className: w(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "[&_svg]:size-4",
        e && "bg-muted text-foreground"
      ),
      children: a
    }
  );
}
function Qd({ editor: e }) {
  const [, t] = x.useReducer((n) => n + 1, 0);
  return x.useEffect(() => {
    const n = () => t();
    return e.on("transaction", n), e.on("selectionUpdate", n), () => {
      e.off("transaction", n), e.off("selectionUpdate", n);
    };
  }, [e]), /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "text-toolbar",
      className: "flex flex-wrap items-center gap-0.5 rounded-md border border-border bg-card p-1",
      children: [
        /* @__PURE__ */ i(
          je,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(wi, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(Ci, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(Si, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          je,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(_i, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(Ri, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          je,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(Ai, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(Mi, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(Oi, {})
          }
        )
      ]
    }
  );
}
const Jd = nr(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Xd({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: w(Jd({ variant: t }), e), ...n });
}
function Zd({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: a,
  id: r,
  className: o
}) {
  const { meta: l, isLoading: s } = Be(), c = x.useMemo(() => fn(l), [l]), u = c.filter((p) => p.type === "cube"), d = c.filter((p) => p.type === "view"), h = c.find((p) => p.name === e);
  return /* @__PURE__ */ f(_e, { value: e, onValueChange: t, disabled: a || s, children: [
    /* @__PURE__ */ i(Ae, { id: r, className: o, children: /* @__PURE__ */ i(Re, { placeholder: s ? "Loading…" : n, children: h ? /* @__PURE__ */ i(Dn, { option: h }) : void 0 }) }),
    /* @__PURE__ */ f(Me, { children: [
      d.length > 0 ? /* @__PURE__ */ f(In, { children: [
        /* @__PURE__ */ i(Vn, { children: "Views" }),
        d.map((p) => /* @__PURE__ */ i(pe, { value: p.name, children: /* @__PURE__ */ i(Dn, { option: p }) }, p.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ f(In, { children: [
        /* @__PURE__ */ i(Vn, { children: "Cubes" }),
        u.map((p) => /* @__PURE__ */ i(pe, { value: p.name, children: /* @__PURE__ */ i(Dn, { option: p }) }, p.name))
      ] }) : null
    ] })
  ] });
}
function Dn({ option: e }) {
  const t = e.type === "view" ? tr : Ra;
  return /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ i(t, { className: "size-4 shrink-0 text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "truncate", children: e.title }),
    /* @__PURE__ */ i(Xd, { variant: "secondary", className: "ml-auto shrink-0 px-1.5 py-0 text-[10px]", children: e.type })
  ] });
}
const ef = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function tf(e) {
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
function nf({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: a } = e.control, r = (s) => n({ ...e, control: { ...e.control, control: s } }), o = (s) => n({ ...e, control: { ...e.control, variable: s } }), l = (s) => {
    s !== a.kind && r(tf(s));
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ i(
      le,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ f(
          _e,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(Ae, { children: /* @__PURE__ */ i(Re, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Me, { children: t.map((s) => /* @__PURE__ */ i(pe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(le, { label: "Control", children: /* @__PURE__ */ f(_e, { value: a.kind, onValueChange: (s) => l(s), children: [
      /* @__PURE__ */ i(Ae, { children: /* @__PURE__ */ i(Re, {}) }),
      /* @__PURE__ */ i(Me, { children: es.options.map((s) => /* @__PURE__ */ i(pe, { value: s, children: ef[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ i(rf, { control: a, onChange: r, variables: t })
  ] });
}
function rf({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(af, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(sf, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(lf, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(cf, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(uf, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(mf, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function af({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(
      le,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          of,
          {
            selected: e.presets ?? [],
            onChange: (n) => t({ ...e, presets: n.length > 0 ? n : void 0 })
          }
        )
      }
    ),
    /* @__PURE__ */ i(
      he,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (n) => t({ ...e, allowFuture: n })
      }
    )
  ] });
}
function of({
  selected: e,
  onChange: t
}) {
  const [n, a] = x.useState(!1), r = new Set(e.map((s) => s.toLowerCase())), o = (s) => {
    const c = new Set(r);
    c.has(s) ? c.delete(s) : c.add(s), t(Gt.filter((u) => c.has(u.value)).map((u) => u.value));
  }, l = r.size === 0 ? "Default set" : r.size === Gt.length ? "All presets" : `${r.size} selected`;
  return /* @__PURE__ */ f(ke, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Ne, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", className: "w-full justify-between font-normal", children: [
      /* @__PURE__ */ i("span", { className: "truncate", children: l }),
      /* @__PURE__ */ i(Xe, { className: "size-4 shrink-0 opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(we, { className: "w-64 p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "max-h-72 overflow-y-auto", children: Gt.map((s) => {
      const c = r.has(s.value);
      return /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => o(s.value),
          className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-foreground hover:bg-accent",
          children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: w(
                  "flex size-4 shrink-0 items-center justify-center rounded border",
                  c ? "border-primary bg-primary text-primary-foreground" : "border-input"
                ),
                children: c ? /* @__PURE__ */ i(Fe, { className: "size-3" }) : null
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
function sf({
  control: e,
  onChange: t,
  variables: n
}) {
  const a = new Set(e.options ?? []), r = (s) => {
    const c = new Set(a);
    c.has(s) ? c.delete(s) : c.add(s);
    const u = Ye.options.filter((d) => c.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((s) => s.type === "dateRange" || s.type === "time"), l = "__none__";
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(
      le,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ f(
          _e,
          {
            value: e.rangeVariable ?? l,
            onValueChange: (s) => t({ ...e, rangeVariable: s === l ? void 0 : s }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(Ae, { children: /* @__PURE__ */ i(Re, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ f(Me, { children: [
                /* @__PURE__ */ i(pe, { value: l, children: "None" }),
                o.map((s) => /* @__PURE__ */ i(pe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(le, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5", children: Ye.options.map((s) => {
      const c = a.has(s);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => r(s),
          className: "rounded-md border px-2 py-1 text-xs capitalize transition-colors " + (c ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function lf({
  control: e,
  onChange: t
}) {
  const n = (o, l) => {
    const s = e.options.map(
      (c, u) => u === o ? { value: l.value ?? String(c.value), label: l.label ?? c.label } : c
    );
    t({ ...e, options: s });
  }, a = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), r = (o) => t({ ...e, options: e.options.filter((l, s) => s !== o) });
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Multiple",
        hint: "Allow selecting more than one option.",
        checked: e.multiple ?? !1,
        onChange: (o) => t({ ...e, multiple: o })
      }
    ),
    /* @__PURE__ */ i(
      le,
      {
        label: "Options",
        action: /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", onClick: a, children: [
          /* @__PURE__ */ i(Tt, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: "No options yet." }) : e.options.map((o, l) => /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ i(
            me,
            {
              className: "flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (s) => n(l, { label: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            me,
            {
              className: "flex-1",
              placeholder: "Value",
              value: String(o.value),
              onChange: (s) => n(l, { value: s.target.value })
            }
          ),
          /* @__PURE__ */ i(
            W,
            {
              variant: "ghost",
              size: "icon",
              className: "size-8 shrink-0 text-muted-foreground",
              "aria-label": "Remove option",
              onClick: () => r(l),
              children: /* @__PURE__ */ i(ct, {})
            }
          )
        ] }, l)) })
      }
    )
  ] });
}
function cf({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(le, { label: "From", children: /* @__PURE__ */ f(
      _e,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Ae, { children: /* @__PURE__ */ i(Re, {}) }),
          /* @__PURE__ */ f(Me, { children: [
            /* @__PURE__ */ i(pe, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(pe, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(pe, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      le,
      {
        label: "Cube",
        hint: "Optional — restrict to one cube/view.",
        action: e.cube ? /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "sm",
            className: "h-6 px-1.5 text-xs text-muted-foreground",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ i(
          Zd,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function uf({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ i(le, { label: "Placeholder", children: /* @__PURE__ */ i(
    me,
    {
      value: e.placeholder ?? "",
      onChange: (n) => t({ ...e, placeholder: n.target.value || void 0 })
    }
  ) });
}
function mf({
  control: e,
  onChange: t
}) {
  const n = (a, r) => /* @__PURE__ */ i(le, { label: r, children: /* @__PURE__ */ i(
    me,
    {
      type: "number",
      value: e[a] ?? "",
      onChange: (o) => {
        const l = o.target.value;
        t({ ...e, [a]: l === "" ? void 0 : Number(l) });
      }
    }
  ) });
  return /* @__PURE__ */ f(re, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function df(e) {
  return { schemaVersion: tt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function ff(e) {
  const t = {
    schemaVersion: tt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function hf(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function ha({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: a,
  fill: r = !1
}) {
  const o = a ? (l) => a([...t, l]) : void 0;
  return /* @__PURE__ */ f("div", { "data-slot": "widget-edit-panel", className: w("flex flex-col gap-2", r && "h-full"), children: [
    e.type !== "text" ? /* @__PURE__ */ i(
      le,
      {
        label: "Title",
        hint: e.type === "input" ? "Used as the field label." : "Shown in the widget header.",
        children: /* @__PURE__ */ i(
          me,
          {
            value: e.title ?? "",
            placeholder: "Untitled",
            onChange: (l) => n({ ...e, title: l.target.value || void 0 })
          }
        )
      }
    ) : null,
    e.type === "chart" ? (
      // The chart's query may carry {var} tokens bound to dashboard variables.
      // Provide a variable store (seeded from the dashboard's decls) so the live
      // preview RESOLVES them — otherwise an unresolved {var:granularity} reaches
      // Cube and 400s ("granularity must be a string").
      /* @__PURE__ */ i(hr, { spec: df(t), children: /* @__PURE__ */ i(Ym, { createVariable: o, children: /* @__PURE__ */ i("div", { className: w(r && "min-h-0 flex-1"), children: /* @__PURE__ */ i(
        Fd,
        {
          fill: r,
          spec: ff(e),
          onChange: (l) => n(hf(e, l))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(Yd, { widget: e, onChange: n }) : /* @__PURE__ */ i(nf, { widget: e, variables: t, onChange: n })
  ] });
}
function pf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !1,
  open: r = !0,
  onToggle: o,
  regionId: l,
  className: s
}) {
  const c = /* @__PURE__ */ f(re, { children: [
    a ? /* @__PURE__ */ i(
      an,
      {
        className: w(
          "size-4 shrink-0 text-muted-foreground transition-transform",
          r && "rotate-90"
        )
      }
    ) : null,
    /* @__PURE__ */ i("span", { className: "text-sm font-medium", children: e }),
    t != null ? /* @__PURE__ */ i("span", { className: "truncate text-xs text-muted-foreground", children: t }) : null
  ] });
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "section-header",
      className: w("flex items-center justify-between gap-2", s),
      children: [
        a ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": r,
            "aria-controls": l,
            className: "flex min-w-0 flex-1 items-center gap-1.5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
            children: c
          }
        ) : /* @__PURE__ */ i("div", { className: "flex min-w-0 flex-1 items-center gap-1.5", children: c }),
        n ? /* @__PURE__ */ i(
          "div",
          {
            className: "flex shrink-0 items-center gap-1",
            onClick: (u) => u.stopPropagation(),
            children: n
          }
        ) : null
      ]
    }
  );
}
function gf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !0,
  defaultOpen: r = !0,
  open: o,
  onOpenChange: l,
  className: s,
  children: c
}) {
  const u = o !== void 0, [d, h] = x.useState(r), p = a ? u ? o : d : !0, b = x.useId(), y = x.useCallback(() => {
    const g = !p;
    u || h(g), l == null || l(g);
  }, [p, u, l]);
  return /* @__PURE__ */ f(
    "section",
    {
      "data-slot": "section",
      "data-state": p ? "open" : "closed",
      className: w("border-b border-border py-2 last:border-b-0", s),
      children: [
        /* @__PURE__ */ i(
          pf,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: a,
            open: p,
            onToggle: y,
            regionId: b
          }
        ),
        p ? /* @__PURE__ */ i("div", { id: b, "data-slot": "section-body", className: "pt-2", children: c }) : null
      ]
    }
  );
}
function bf(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function yf(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function vf(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function xf(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function kf(e, t) {
  switch (e) {
    case "chart":
      return yf(t);
    case "text":
      return vf(t);
    case "input":
      return xf(t);
  }
}
function Nf(e) {
  return { name: e, type: "string" };
}
function wf(e) {
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
const Cf = {
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
function Sf({
  variables: e,
  onChange: t,
  newName: n
}) {
  const a = x.useRef(0), r = () => {
    if (n) return n();
    let c;
    do
      c = `var_${++a.current}`;
    while (e.some((u) => u.name === c));
    return c;
  }, o = (c, u) => {
    t(e.map((d, h) => h === c ? _f(d, u) : d));
  }, l = (c) => t(e.filter((u, d) => d !== c)), s = () => t([...e, Nf(r())]);
  return /* @__PURE__ */ i(
    gf,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", onClick: s, children: [
        /* @__PURE__ */ i(Tt, {}),
        " Add"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ f("p", { className: "py-1 text-xs text-muted-foreground", children: [
        "No variables. Variables bind input controls and `",
        "{var}",
        "` query tokens."
      ] }) : /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: e.map((c, u) => /* @__PURE__ */ i(
        Rf,
        {
          decl: c,
          duplicate: e.some((d, h) => h !== u && d.name === c.name && c.name !== ""),
          onChange: (d) => o(u, d),
          onRemove: () => l(u)
        },
        u
      )) })
    }
  );
}
function _f(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = wf(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Rf({
  decl: e,
  duplicate: t,
  onChange: n,
  onRemove: a
}) {
  const r = e.name === "" ? "Name required" : t ? "Duplicate name" : void 0;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "variable-row",
      className: "rounded-md border border-border bg-card/40 p-2.5",
      children: [
        /* @__PURE__ */ f("div", { className: "mb-1 flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ i(le, { label: "Name", error: r, className: "py-0", children: /* @__PURE__ */ i(
            me,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-invalid": r ? !0 : void 0,
              onChange: (o) => n({ name: o.target.value })
            }
          ) }) }),
          /* @__PURE__ */ i(
            W,
            {
              variant: "ghost",
              size: "icon",
              className: "mt-6 size-8 shrink-0 text-muted-foreground",
              "aria-label": "Remove variable",
              onClick: a,
              children: /* @__PURE__ */ i(ct, {})
            }
          )
        ] }),
        /* @__PURE__ */ i(le, { label: "Type", className: "py-1", children: /* @__PURE__ */ f(
          _e,
          {
            value: e.type,
            onValueChange: (o) => n({ type: o }),
            children: [
              /* @__PURE__ */ i(Ae, { children: /* @__PURE__ */ i(Re, {}) }),
              /* @__PURE__ */ i(Me, { children: Ia.options.map((o) => /* @__PURE__ */ i(pe, { value: o, children: Cf[o] }, o)) })
            ]
          }
        ) }),
        /* @__PURE__ */ i(le, { label: "Label", hint: "Optional human label for controls.", className: "py-1", children: /* @__PURE__ */ i(
          me,
          {
            value: e.label ?? "",
            placeholder: e.name,
            onChange: (o) => n({ label: o.target.value })
          }
        ) }),
        /* @__PURE__ */ i(
          he,
          {
            label: "Array",
            hint: "Holds multiple values (multi-select).",
            checked: e.array ?? !1,
            onChange: (o) => n({ array: o })
          }
        ),
        /* @__PURE__ */ i(Af, { decl: e, onChange: (o) => n({ default: o }) })
      ]
    }
  );
}
function Af({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ i(
      he,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (r) => t(r)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(le, { label: "Default", className: "py-1", children: /* @__PURE__ */ i(
      me,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (r) => {
          const o = r.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : Mf(e.default);
  return /* @__PURE__ */ i(le, { label: "Default", hint: n, className: "py-1", children: /* @__PURE__ */ i(
    me,
    {
      value: a,
      placeholder: Of(e.type),
      onChange: (r) => {
        const o = r.target.value;
        if (o === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const l = o.split(",").map((s) => s.trim()).filter(Boolean);
          t(l);
          return;
        }
        t(o);
      }
    }
  ) });
}
function Mf(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Of(e) {
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
function oh({
  spec: e,
  onChange: t,
  onSave: n,
  newId: a,
  debounceMs: r = 300,
  onUndo: o,
  onRedo: l,
  canUndo: s,
  canRedo: c,
  onDiscard: u,
  className: d
}) {
  const [h, p] = x.useState(e);
  x.useEffect(() => p(e), [e]);
  const [b, y] = x.useState(null), [g, v] = x.useState(null), S = x.useRef(null);
  S.current === null && (S.current = a ?? bf());
  const _ = a ?? S.current, N = Do(
    (E) => t == null ? void 0 : t(E),
    r
  ), R = x.useCallback(
    (E) => {
      p((T) => {
        const Q = E(T);
        return N(Q), Q;
      });
    },
    [N]
  ), C = x.useCallback(
    (E) => {
      const T = kf(E, _());
      R((Q) => To(Q, T)), y(T.id), v({ kind: "widget", id: T.id });
    },
    [R, _]
  ), k = x.useCallback((E) => y(E), []), D = x.useCallback((E) => {
    y(E), v({ kind: "widget", id: E });
  }, []), L = x.useCallback(
    (E) => {
      R((T) => qd(T, E)), y((T) => T === E ? null : T), v((T) => (T == null ? void 0 : T.kind) === "widget" && T.id === E ? null : T);
    },
    [R]
  ), V = x.useCallback(
    (E) => {
      const T = _();
      R((Q) => Vd(Q, E, T)), y(T);
    },
    [R, _]
  ), K = x.useCallback(
    (E) => R((T) => Kd(T, E)),
    [R]
  ), I = x.useCallback(
    (E) => R((T) => ({ ...T, layout: jd(T.layout, E) })),
    [R]
  ), B = x.useCallback(
    (E) => R((T) => ({ ...T, name: E || void 0 })),
    [R]
  ), z = x.useCallback(
    (E) => R((T) => ({ ...T, variables: E })),
    [R]
  ), A = x.useMemo(
    () => Ka.safeParse(h),
    [h]
  ), Y = x.useCallback(() => {
    A.success && (n == null || n(A.data));
  }, [A, n]), G = (g == null ? void 0 : g.kind) === "widget" ? h.widgets.find((E) => E.id === g.id) ?? null : null;
  x.useEffect(() => {
    (g == null ? void 0 : g.kind) === "widget" && !h.widgets.some((E) => E.id === g.id) && v(null);
  }, [g, h.widgets]);
  const P = x.useCallback(() => v(null), []), U = (g == null ? void 0 : g.kind) === "variables" ? "Dashboard variables" : G ? G.title ?? `${Df(G.type)} widget` : "";
  return /* @__PURE__ */ f("div", { "data-slot": "dashboard-editor", className: w("flex h-full flex-col gap-2", d), children: [
    /* @__PURE__ */ i(
      $d,
      {
        name: h.name ?? "",
        onNameChange: B,
        onAdd: C,
        onEditVariables: () => v({ kind: "variables" }),
        onUndo: o,
        onRedo: l,
        canUndo: s,
        canRedo: c,
        onDiscard: u,
        onSave: n ? Y : void 0,
        saveDisabled: !A.success,
        className: "shrink-0"
      }
    ),
    A.success ? null : /* @__PURE__ */ f("p", { className: "shrink-0 text-xs text-destructive", children: [
      A.error.issues.length,
      " validation issue",
      A.error.issues.length === 1 ? "" : "s",
      " — fix before saving."
    ] }),
    /* @__PURE__ */ i("div", { className: "min-h-0 flex-1 overflow-y-auto pb-4", children: /* @__PURE__ */ i(
      Gd,
      {
        spec: h,
        selectedId: b,
        onSelect: k,
        onEdit: D,
        onDuplicate: V,
        onDelete: L,
        onLayoutChange: I
      }
    ) }),
    g ? /* @__PURE__ */ f(
      "div",
      {
        "data-slot": "dashboard-editor-fullscreen",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": U,
        className: "fixed inset-0 z-50 flex flex-col bg-background",
        children: [
          /* @__PURE__ */ f("header", { className: "flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-2.5", children: [
            /* @__PURE__ */ f("div", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", onClick: P, children: [
                /* @__PURE__ */ i(Zn, {}),
                " Done"
              ] }),
              /* @__PURE__ */ i("span", { className: "truncate text-sm font-medium", children: U })
            ] }),
            G ? /* @__PURE__ */ f(
              W,
              {
                variant: "ghost",
                size: "sm",
                className: "text-destructive hover:text-destructive",
                onClick: () => L(G.id),
                children: [
                  /* @__PURE__ */ i(ct, {}),
                  " Delete"
                ]
              }
            ) : null
          ] }),
          /* @__PURE__ */ i("div", { className: "min-h-0 flex-1 overflow-hidden p-4", children: g.kind === "variables" ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(Sf, { variables: h.variables, onChange: z }) }) : (G == null ? void 0 : G.type) === "chart" ? /* @__PURE__ */ i(
            ha,
            {
              fill: !0,
              widget: G,
              variables: h.variables,
              onChange: K,
              onVariablesChange: z
            }
          ) : G ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(
            ha,
            {
              widget: G,
              variables: h.variables,
              onChange: K,
              onVariablesChange: z
            }
          ) }) : null })
        ]
      }
    ) : null
  ] });
}
function Df(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
export {
  Jc as AreaChartFamily,
  Tc as AreaFamilyOptionsSchema,
  Ji as AxesOptionsSchema,
  wn as AxisOptionsSchema,
  Yc as BarChartFamily,
  zc as BarFamilyOptionsSchema,
  zo as CANONICAL_BREAKPOINT,
  Ve as ChartColorTokenSchema,
  zd as ChartEditOverlay,
  Fd as ChartEditor,
  Wi as ChartFamilySchema,
  Ea as ChartOptionsSchema,
  _u as ChartRenderer,
  qa as ChartSpecSchema,
  ah as ChartView,
  ns as ChartWidgetSchema,
  Xi as ColorAssignmentSchema,
  Nu as ComboChartFamily,
  qc as ComboFamilyOptionsSchema,
  Vc as ComboSeriesOptSchema,
  Ec as CondFormatRuleSchema,
  gr as CubeChart,
  Pu as CubeChartSpec,
  ja as CubeQuerySchema,
  fr as CubeVizContext,
  th as CubeVizProvider,
  Ya as DEFAULTS,
  ge as DEFAULT_COLOR_RAMP,
  Lo as DEFAULT_COLS,
  $n as DEFAULT_UNIT_CONVERSIONS,
  Zt as DRAG_HANDLE_CLASS,
  rh as Dashboard,
  oh as DashboardEditor,
  hr as DashboardProvider,
  Ka as DashboardSpecSchema,
  zn as DateRangeSchema,
  qr as EM_DASH,
  Gd as EditorCanvas,
  $d as EditorToolbar,
  Zm as FilterBuilder,
  qi as FilterOperatorSchema,
  Gi as FormatKindSchema,
  on as FormatOptionsSchema,
  zs as GRANULARITY_PATTERN,
  Ye as GranularitySchema,
  ss as GridConfigSchema,
  es as InputControlKindSchema,
  ts as InputControlSchema,
  nf as InputWidgetEditor,
  as as InputWidgetSchema,
  om as InputWidgetView,
  au as KpiFamily,
  Pc as KpiFamilyOptionsSchema,
  is as LayoutItemSchema,
  Ki as LeafFilterSchema,
  Yi as LegendOptionsSchema,
  Qc as LineChartFamily,
  Lc as LineFamilyOptionsSchema,
  ee as MemberSchema,
  jr as OrderDirSchema,
  Hi as OrderSpecSchema,
  Xc as PieChartFamily,
  Fc as PieFamilyOptionsSchema,
  Ln as QueryFilterSchema,
  Ft as ReferenceLineOptSchema,
  go as RenderWidget,
  tt as SCHEMA_VERSION,
  Vi as ScalarSchema,
  eu as ScatterChartFamily,
  $c as ScatterFamilyOptionsSchema,
  Ui as SeriesMappingSchema,
  Er as SeriesMetaSchema,
  Ba as SpecSchema,
  jc as TableColumnOptSchema,
  fu as TableFamily,
  Ic as TableFamilyOptionsSchema,
  Yd as TextWidgetEditor,
  rs as TextWidgetSchema,
  Eu as TextWidgetView,
  Bi as TimeDimensionSchema,
  Zi as TipTapDocSchema,
  Qi as TooltipOptionsSchema,
  Qt as VarRefSchema,
  ls as VariableDeclSchema,
  Ia as VariableTypeSchema,
  Pa as VariableValueSchema,
  Sf as VariablesPanel,
  po as WidgetChrome,
  ha as WidgetEditPanel,
  os as WidgetSpecSchema,
  To as appendWidget,
  Vr as assignColors,
  Cc as axisKey,
  oo as builtinCharts,
  ms as createCubeClient,
  bf as createIdFactory,
  Ua as createUnitsFormatter,
  Ds as createVariableStore,
  Fs as datePattern,
  Pn as deepMerge,
  wf as defaultForType,
  ar as defaultFormatter,
  eh as familyOptionsSchema,
  ds as fetchMeta,
  Xf as formatCategory,
  St as formatDateValue,
  ot as isEmptyValue,
  Se as isVarRef,
  us as loadSpec,
  Ha as looksLikeIsoDate,
  Ga as makeChartFormat,
  Jf as makeDateFormatter,
  Zf as makeFormatter,
  jd as mergeLayout,
  cn as mergeUnitConversions,
  yf as newChartWidget,
  xf as newInputWidget,
  vf as newTextWidget,
  Nf as newVariable,
  kf as newWidget,
  xs as normalize,
  Pd as pickCanonicalLayout,
  Id as placeNewItem,
  _c as quantityLabel,
  qd as removeWidget,
  Kd as replaceWidget,
  Au as resolveChart,
  Bc as resolveOptions,
  Os as resolveQuery,
  Tn as resolveSeriesColors,
  _s as resolveValue,
  Yf as safeLoadSpec,
  Ts as toDate,
  ps as toResultAnnotation,
  Ld as useChartEditorState,
  so as useContainerWidth,
  Be as useCubeMeta,
  Ou as useCubeQuery,
  Ke as useCubeVizContext,
  io as useDashboard,
  Do as useDebouncedCallback,
  nh as useFormatter,
  An as useNormalizedSeries,
  pr as useOptionalDashboard,
  Qf as validateSpec
};
//# sourceMappingURL=index.js.map
