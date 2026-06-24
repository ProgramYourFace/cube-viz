import { jsx as i, jsxs as f, Fragment as re } from "react/jsx-runtime";
import * as Gn from "recharts";
import { BarChart as Fo, CartesianGrid as Dt, YAxis as Te, XAxis as nt, Bar as ha, LabelList as pa, ReferenceLine as Lt, LineChart as $o, Line as ga, AreaChart as ba, Area as Un, PieChart as Po, Pie as jo, Cell as ya, Label as Eo, ScatterChart as Io, ZAxis as Vo, Scatter as qo, RadialBarChart as Ko, PolarAngleAxis as Bo, RadialBar as Ho, ResponsiveContainer as Wo, ComposedChart as Go } from "recharts";
import * as x from "react";
import { createContext as va, useContext as Yn, useMemo as Z, useState as rt, useCallback as Ee, useEffect as zt, useRef as xt, createElement as Uo, useSyncExternalStore as Yo, useId as Qo } from "react";
import { clsx as Jo } from "clsx";
import { twMerge as Xo } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as Zo, ArrowUp as Qn, ArrowDown as Jn, ChevronsUpDown as ei, AlertCircle as xa, ChevronLeft as Xn, ChevronRight as rn, ChevronDown as lt, Check as Ie, ChevronUp as ti, CalendarIcon as ka, MoreVertical as ni, RefreshCw as ri, Download as ai, Type as Zn, Hash as Na, Calendar as wa, Search as oi, Table2 as Ca, Database as Sa, Layers as er, Variable as ii, Plus as Tt, Trash2 as ct, ListFilter as si, Box as _a, EyeOff as Ra, Eye as Aa, BarChart4 as li, Table as ci, Gauge as ui, ScatterChart as mi, PieChart as di, AreaChart as fi, LineChart as hi, BarChart3 as Ma, X as $r, Save as Oa, SlidersHorizontal as pi, Braces as gi, Undo2 as bi, Redo2 as yi, RotateCcw as vi, Pencil as xi, Copy as ki, Bold as Ni, Italic as wi, Strikethrough as Ci, Heading1 as Si, Heading2 as _i, List as Ri, ListOrdered as Ai, Quote as Mi } from "lucide-react";
import * as Gt from "@radix-ui/react-popover";
import { cva as tr } from "class-variance-authority";
import * as be from "@radix-ui/react-select";
import Oi from "@cubejs-client/core";
import { format as de, isValid as kt, parseISO as Ut, differenceInCalendarDays as Di, subDays as ke, startOfMonth as gn, subMonths as bn, startOfQuarter as yn, subQuarters as vn, startOfYear as xn, subYears as kn, subWeeks as Li, startOfWeek as zi, endOfWeek as Ti, endOfMonth as Fi, endOfQuarter as $i, endOfYear as Pi, parse as Da } from "date-fns";
import { DayPicker as ji, useDayPicker as Ei } from "react-day-picker";
import { ResponsiveGridLayout as La } from "react-grid-layout";
import { useEditor as za, EditorContent as Ta } from "@tiptap/react";
import Fa from "@tiptap/starter-kit";
const et = 1, Yt = m.object({ var: m.string().min(1) }).strict();
function Ne(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Qt = (e) => m.union([e, Yt]), Ii = m.union([m.string(), m.number(), m.boolean()]), Ye = m.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Dn = m.union([m.tuple([m.string(), m.string()]), m.string()]), $a = m.union([
  m.string(),
  m.number(),
  m.boolean(),
  m.tuple([m.string(), m.string()]),
  // absolute date range
  m.array(m.string()),
  m.array(m.number())
]), ee = m.string().min(1), Vi = m.enum([
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
]), qi = m.object({
  member: ee,
  operator: Vi,
  values: m.array(m.union([Ii, Yt])).optional()
}).strict(), Ln = m.lazy(
  () => m.union([
    qi,
    m.object({ and: m.array(Ln) }).strict(),
    m.object({ or: m.array(Ln) }).strict()
  ])
), Ki = m.object({
  dimension: ee,
  granularity: Qt(Ye).optional(),
  dateRange: Qt(Dn).optional(),
  compareDateRange: m.array(Dn).optional()
}).strict(), Pr = m.enum(["asc", "desc"]), Bi = m.union([
  m.record(ee, Pr),
  m.array(m.tuple([ee, Pr]))
]), Pa = m.object({
  measures: m.array(ee).optional(),
  dimensions: m.array(ee).optional(),
  timeDimensions: m.array(Ki).optional(),
  filters: m.array(Ln).optional(),
  segments: m.array(ee).optional(),
  order: Bi.optional(),
  limit: Qt(m.number()).optional(),
  offset: Qt(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), Hi = m.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
]), Ve = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Wi = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), an = m.object({
  kind: Wi.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional()
}).strict(), jr = m.object({
  label: m.string().optional(),
  colorToken: Ve.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: an.optional()
}).strict(), Gi = m.object({
  category: m.object({ member: ee }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(ee),
      meta: m.record(ee, jr).optional()
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
      meta: m.record(ee, jr).optional()
    }).strict()
  ])
}).strict(), Ui = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Yi = m.object({
  show: m.boolean().optional(),
  indicator: m.enum(["dot", "line", "dashed"]).optional(),
  showTotal: m.boolean().optional()
}).strict(), Er = m.union([m.number(), m.literal("auto")]), Nn = m.object({
  label: m.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: m.boolean().optional(),
  hide: m.boolean().optional(),
  scale: m.enum(["linear", "log"]).optional(),
  domain: m.tuple([Er, Er]).optional(),
  tickFormat: an.optional()
}).strict(), Qi = m.object({
  x: Nn.optional(),
  y: Nn.optional(),
  y2: Nn.optional()
}).strict(), Ji = m.object({
  byKey: m.record(m.string(), Ve).optional(),
  ramp: m.array(Ve).optional()
}).strict(), ja = m.object({
  family: Hi,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Gi.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Ui.optional(),
  tooltip: Yi.optional(),
  axes: Qi.optional(),
  colors: Ji.optional(),
  format: an.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Xi = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), Zi = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), es = m.object({
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
      options: m.array(m.object({ value: $a, label: m.string() }).strict()),
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
}).strict(), nr = {
  id: m.string().min(1),
  title: m.string().optional()
}, ts = m.object({ ...nr, type: m.literal("chart"), query: Pa, chart: ja }).strict(), ns = m.object({ ...nr, type: m.literal("text"), doc: Xi }).strict(), rs = m.object({ ...nr, type: m.literal("input"), control: es }).strict(), as = m.discriminatedUnion("type", [
  ts,
  ns,
  rs
]), os = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), is = m.object({
  cols: m.number().optional(),
  rowHeight: m.number().optional(),
  margin: m.tuple([m.number(), m.number()]).optional(),
  containerPadding: m.tuple([m.number(), m.number()]).optional()
}).strict(), Ea = m.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), ss = m.object({
  name: m.string().min(1),
  type: Ea,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: $a.optional()
}).strict(), Ia = {
  schemaVersion: m.literal(et),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, Va = m.object({ ...Ia, kind: m.literal("chart"), query: Pa, chart: ja }).strict(), qa = m.object({
  ...Ia,
  kind: m.literal("dashboard"),
  variables: m.array(ss),
  widgets: m.array(as),
  layout: m.array(os),
  grid: is.optional()
}).strict(), Ka = m.discriminatedUnion("kind", [Va, qa]), ls = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function cs(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > et)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${et} — update the library`
    );
  for (; n < et; ) {
    const a = ls[n];
    if (!a) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = a(t), n += 1, t.schemaVersion = n;
  }
  return Ka.parse(t);
}
function Gf(e) {
  try {
    return { ok: !0, spec: cs(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Uf(e) {
  return Ka.parse(e);
}
function us(e) {
  return Oi(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function ms(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ge = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], ds = /* @__PURE__ */ new Set(["bar", "line", "area", "pie"]), wn = 8;
function zn(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : ge, a = (t == null ? void 0 : t.byKey) ?? {}, r = (u, d) => a[u] ?? d, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = r(u.key, u.colorToken);
    d && o.add(d);
  }
  let s = 0;
  const l = () => {
    for (let u = 0; u < n.length; u++) {
      const d = n[s++ % n.length];
      if (!o.has(d))
        return o.add(d), d;
    }
    return n[s++ % n.length];
  };
  return e.map((u) => r(u.key, u.colorToken) ?? l());
}
function Ir(e, t) {
  const n = zn(e, t);
  return e.forEach((a, r) => {
    a.colorToken = n[r];
  }), e;
}
function fs(e) {
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
  for (const n of Object.keys(e)) t[n] = fs(e[n]);
  return t;
}
function hs(e) {
  return {
    measures: Kt(e.measures ?? {}),
    dimensions: Kt(e.dimensions ?? {}),
    segments: Kt(e.segments ?? {}),
    timeDimensions: Kt(e.timeDimensions ?? {})
  };
}
function tt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function on(e, t, n) {
  const a = e == null ? void 0 : e.meta, r = {};
  (a == null ? void 0 : a.unit) !== void 0 && (r.unit = a.unit), (a == null ? void 0 : a.quantity) !== void 0 && (r.quantity = a.quantity), (a == null ? void 0 : a.convert) !== void 0 && (r.convert = a.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && r.unit === void 0 && (r.unit = "%");
  let s = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!s || s.kind === void 0 || s.kind === "auto") && (s = { ...s, kind: "currency" }), s && (r.format = s), t != null && t.axis && (r.axis = t.axis), t != null && t.stackId && (r.stackId = t.stackId), t != null && t.curve && (r.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (r.dots = t.dots), r;
}
function ps(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function gs(e, t) {
  var a, r;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, s] of Object.entries(e.measures)) {
    const l = (a = s.meta) == null ? void 0 : a.unit;
    if (!l || ((r = s.meta) == null ? void 0 : r.convert) === !1) continue;
    const c = t.conversions[l];
    c && (n.set(o, { to: c.toImperial, unit: c.imperialUnit }), e.measures[o] = { ...s, meta: { ...s.meta, unit: c.imperialUnit } });
  }
  return n;
}
function bs(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const a = { ...n };
    for (const [r, o] of t) {
      const s = sn(a[r]);
      s !== null && (a[r] = o.to(s));
    }
    return a;
  });
}
function ys(e, t) {
  var n;
  if (t.size !== 0)
    for (const a of e) {
      const r = (n = a.meta) != null && n.measure ? t.get(a.meta.measure) : void 0;
      r && (a.data = a.data.map((o) => o === null ? null : r.to(o)));
    }
}
function vs(e, t, n, a) {
  const r = hs(e.annotation()), o = gs(r, a), s = bs(e.tablePivot(), o), l = t.mapping;
  if (!l) {
    const d = n.measures ?? [];
    if (ds.has(t.family) && d.length > 0) {
      const h = s[0] ?? {}, p = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => sn(h[y])),
          meta: { ...on(tt(r, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Ir(p, t.colors), { categories: d.map(
        (y) => {
          var g, v;
          return ((g = tt(r, y)) == null ? void 0 : g.shortTitle) ?? ((v = tt(r, y)) == null ? void 0 : v.title) ?? y;
        }
      ), series: p, raw: { rows: s, annotation: r, query: n }, empty: s.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: r, query: n },
      empty: s.length === 0
    };
  }
  const c = l.series.mode === "measures" ? ks(e, l.series, t, r) : Ns(e, l.category.member, l.series, t, r), u = xs(e, l);
  return ys(c, o), Ir(c, t.colors), {
    categories: u,
    series: c,
    raw: { rows: s, annotation: r, query: n },
    empty: s.length === 0
  };
}
function xs(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((r) => r.x);
}
function ks(e, t, n, a) {
  const { members: r, meta: o } = t, s = e.chartPivot();
  return r.map((l) => {
    const c = tt(a, l), u = o == null ? void 0 : o[l], d = s.map((h) => sn(h[l]));
    return {
      key: l,
      label: ps(c, u, l),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...on(c, u, n.format), measure: l }
    };
  });
}
function Ns(e, t, n, a, r) {
  const { value: o, values: s, pivot: l } = n, c = s && s.length > 0 ? s : [o], u = new Set(c), d = c.length > 1, h = { x: [t], y: [l, "measures"] }, b = e.seriesNames(h).filter((S) => {
    const _ = S.yValues && S.yValues.length >= 2 ? S.yValues[S.yValues.length - 1] : void 0;
    return _ === void 0 || u.has(_);
  }), y = e.chartPivot(h), g = tt(r, o), v = b.map((S) => {
    var K, I;
    const _ = (K = S.yValues) == null ? void 0 : K[0], N = S.yValues && S.yValues.length >= 2 ? S.yValues[S.yValues.length - 1] : o, R = tt(r, N), C = (R == null ? void 0 : R.shortTitle) ?? (R == null ? void 0 : R.title) ?? N, k = _ ?? S.shortTitle ?? S.title ?? S.key, D = d ? `${C} · ${k}` : k, z = y.map((B) => sn(B[S.key])), V = (I = n.meta) == null ? void 0 : I[N];
    return {
      key: S.key,
      label: D,
      data: z,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...on(R ?? g, V, a.format),
        measure: N
      }
    };
  });
  return ws(v, g, a.format);
}
function ws(e, t, n) {
  var d, h, p;
  if (e.length <= wn) return e;
  const a = (b) => b.data.reduce((y, g) => y + (g ?? 0), 0), r = [...e].sort((b, y) => a(y) - a(b)), o = r.slice(0, wn - 1), s = r.slice(wn - 1), l = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: l }, (b, y) => {
    let g = 0, v = !1;
    for (const S of s) {
      const _ = S.data[y];
      _ !== null && (g += _, v = !0);
    }
    return v ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${s.length})`,
    data: c,
    meta: { ...on(t, void 0, n), ...(p = (h = o[0]) == null ? void 0 : h.meta) != null && p.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function sn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function at(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const Cs = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function Ss(e, t, n) {
  var a;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (a = n.find((r) => r.name === e)) == null ? void 0 : a.default;
}
function Mt(e, t, n) {
  var a;
  if (Ne(e)) {
    const r = e.var;
    return Object.prototype.hasOwnProperty.call(n, r) && n[r] !== void 0 ? n[r] : (a = t.get(r)) == null ? void 0 : a.default;
  }
  return e;
}
function _s(e, t, n) {
  const a = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return a ? { member: e.member, operator: e.operator } : void 0;
  const r = [];
  for (const o of e.values) {
    const s = Mt(o, t, n);
    if (!at(s))
      if (Array.isArray(s))
        for (const l of s)
          at(l) || r.push(l);
      else
        r.push(s);
  }
  return r.length === 0 ? a ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: r };
}
function Rs(e, t, n) {
  if ("and" in e) {
    const a = Tn(e.and, t, n);
    return a.length > 0 ? { and: a } : void 0;
  }
  if ("or" in e) {
    const a = Tn(e.or, t, n);
    return a.length > 0 ? { or: a } : void 0;
  }
  return _s(e, t, n);
}
function Tn(e, t, n) {
  const a = [];
  for (const r of e) {
    const o = Rs(r, t, n);
    o !== void 0 && a.push(o);
  }
  return a;
}
function As(e, t, n) {
  const a = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const r = Mt(e.granularity, t, n);
    at(r) || (a.granularity = r);
  }
  if (e.dateRange !== void 0) {
    const r = Mt(e.dateRange, t, n);
    at(r) || (a.dateRange = r);
  }
  return e.compareDateRange !== void 0 && (a.compareDateRange = e.compareDateRange), a;
}
function Ms(e, t, n) {
  const a = Cs(n), r = {};
  if (e.measures !== void 0 && (r.measures = [...e.measures]), e.dimensions !== void 0 && (r.dimensions = [...e.dimensions]), e.segments !== void 0 && (r.segments = [...e.segments]), e.timeDimensions !== void 0 && (r.timeDimensions = e.timeDimensions.map((o) => As(o, a, t))), e.filters !== void 0) {
    const o = Tn(e.filters, a, t);
    o.length > 0 && (r.filters = o);
  }
  if (e.order !== void 0 && (r.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = Mt(e.limit, a, t);
    at(o) || (r.limit = o);
  }
  if (e.offset !== void 0) {
    const o = Mt(e.offset, a, t);
    at(o) || (r.offset = o);
  }
  return e.total !== void 0 && (r.total = e.total), e.timezone !== void 0 && (r.timezone = e.timezone), r;
}
function Os(e, t) {
  let n = {};
  for (const o of e)
    o.default !== void 0 && (n[o.name] = o.default);
  if (t)
    for (const o of Object.keys(t)) {
      const s = t[o];
      s !== void 0 && (n[o] = s);
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
    set(o, s) {
      if (s === void 0) {
        if (!Object.prototype.hasOwnProperty.call(n, o)) return;
        const l = { ...n };
        delete l[o], n = l;
      } else {
        if (n[o] === s) return;
        n = { ...n, [o]: s };
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
const Ds = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, Ls = "MMM d, yyyy";
function zs(e) {
  if (e instanceof Date) return kt(e) ? e : null;
  if (typeof e == "number") {
    const a = new Date(e);
    return kt(a) ? a : null;
  }
  const t = Ut(e);
  if (kt(t)) return t;
  const n = new Date(e);
  return kt(n) ? n : null;
}
function Ba(e) {
  return /^\d{4}-\d{2}/.test(e) ? kt(Ut(e)) : !1;
}
function Ts(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Ds[t] : Ls;
}
function St(e, t, n) {
  const a = zs(e);
  return a ? de(a, Ts(t, n)) : String(e);
}
function Yf(e, t) {
  return (n) => n == null ? "" : St(n, e, t);
}
function Qf(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? St(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? St(e, t.format, t.granularity) : String(e) : Ba(e) ? St(e, t.format, t.granularity) : e;
}
const Vr = "—", Fs = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function qr(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function $s(e, t) {
  const n = Math.abs(e);
  for (const { limit: a, suffix: r } of Fs)
    if (n >= a) return qr((e / a).toFixed(t)) + r;
  return qr(e.toFixed(t));
}
function Ps(e, t, n) {
  const a = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (a.minimumFractionDigits = t.decimals, a.maximumFractionDigits = t.decimals) : a.maximumFractionDigits = 2, new Intl.NumberFormat(n, a).format(e);
}
function js(e, t) {
  const { format: n, meta: a, locale: r } = t, o = n != null && n.abbreviate ? $s(e, n.decimals ?? 1) : Ps(e, n, r), s = (n == null ? void 0 : n.suffix) ?? ((a == null ? void 0 : a.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${s ? ` ${s}` : ""}`;
}
function Ha(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function Es(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Ha(e.value) ? !0 : typeof e.value == "string" ? Ba(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const rr = (e) => {
  const { value: t, format: n, granularity: a } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? Vr : (Ha(t) || typeof t == "string" || typeof t == "number") && Es(e) ? St(t, n, a) : typeof t == "number" ? js(t, e) : String(t);
};
function Is(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Jf(e, t) {
  return (n, a) => {
    const r = a ? Is(a, t) : void 0;
    return rr({
      value: n,
      meta: r == null ? void 0 : r.meta,
      title: (r == null ? void 0 : r.shortTitle) ?? (r == null ? void 0 : r.title),
      role: "value",
      format: e
    });
  };
}
function Vs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function qs(e) {
  const t = Ye.safeParse(e);
  return t.success ? t.data : void 0;
}
function Ks(e, t) {
  var a;
  const n = (a = t.mapping) == null ? void 0 : a.category.member;
  if (!(!n || !e)) {
    for (const r of Object.keys(e.timeDimensions))
      if (r !== n && r.startsWith(`${n}.`)) {
        const o = qs(r.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function Wa(e, t, n, a) {
  const r = Ks(e, t);
  return {
    value(o, s, l = "value") {
      const c = s ? Vs(s, e) : void 0, u = c == null ? void 0 : c.meta;
      return n({
        value: o,
        member: s,
        meta: u,
        title: (c == null ? void 0 : c.shortTitle) ?? (c == null ? void 0 : c.title),
        role: l,
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
class Bs extends Error {
}
const Hs = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Bs(`"${e}" cannot be parsed into a number`);
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
function Kr(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Ws extends Error {
}
class Br extends Error {
}
class Gs extends Error {
}
class Cn extends Error {
}
class Us extends Error {
}
class Ys {
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
      throw new Br(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Kr(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Gs(`Cannot convert incompatible measures of ${r.measure} and ${o.measure}`);
    let s = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (s = this.cls.sub(s, this.convertFraction(o.unit.anchor_shift))), o.system != r.system) {
      const c = this.measureData[o.measure].anchors;
      if (c == null)
        throw new Cn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${r.measure}" measures.`);
      const u = c[o.system];
      if (u == null)
        throw new Cn(`Unable to find anchor for "${o.measure}" to "${r.measure}". Please make sure it is defined.`);
      const d = (n = u[r.system]) === null || n === void 0 ? void 0 : n.transform, h = (a = u[r.system]) === null || a === void 0 ? void 0 : a.ratio;
      if (typeof d == "function")
        s = d(s, this.cls);
      else if (typeof h == "number")
        s = this.cls.mul(s, h);
      else if (Kr(h))
        s = this.cls.mul(s, this.convertFraction(h));
      else
        throw new Cn("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return r.unit.anchor_shift && (s = this.cls.add(s, this.convertFraction(r.unit.anchor_shift))), this.cls.div(s, this.convertFraction(r.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, a, r;
    if (this.origin == null)
      throw new Br(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let s = [], l = o ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (s = (n = t.exclude) !== null && n !== void 0 ? n : [], l = (a = t.cutOffNumber) !== null && a !== void 0 ? a : l, c = (r = t.system) !== null && r !== void 0 ? r : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const h = this.describe(d);
      if (s.indexOf(d) === -1 && h.system === c) {
        const b = this.to(d);
        if (o ? this.cls.gt(b, l) : this.cls.lt(b, l))
          continue;
        (u === null || (o ? this.cls.lte(b, l) && this.cls.gt(b, u.val) : this.cls.gte(b, l) && this.cls.lt(b, u.val))) && (u = {
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
        for (const [o, s] of Object.entries(r.systems))
          for (const [l, c] of Object.entries(s))
            n.push(this.describeUnit({
              abbr: l,
              measure: a,
              system: o,
              unit: c
            }));
    else {
      if (!this.isMeasure(t))
        throw new Us(`Meausure "${t}" not found.`);
      const a = this.measureData[t];
      for (const [r, o] of Object.entries(a.systems))
        for (const [s, l] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: s,
            measure: t,
            system: r,
            unit: l
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
    throw new Ws(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Qs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, a] of Object.entries(e))
    for (const [r, o] of Object.entries(a.systems))
      for (const [s, l] of Object.entries(o))
        t.set(s, {
          measure: n,
          system: r,
          abbr: s,
          unit: l
        });
  return t;
}
function Js(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Qs(e);
  return (a) => new Ys({
    measures: e,
    unitCache: n,
    cls: Hs
  }, a);
}
const Xs = {
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
}, Zs = {
  systems: {
    metric: Xs
  }
}, el = {
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
}, tl = {
  systems: {
    SI: el
  }
}, nl = {
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
}, rl = {
  systems: {
    SI: nl
  }
}, al = {
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
}, ol = {
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
}, il = {
  systems: {
    metric: al,
    imperial: ol
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
}, sl = {
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
}, ll = {
  systems: {
    SI: sl
  }
}, cl = {
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
}, ul = {
  systems: {
    SI: cl
  }
}, ml = {
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
}, dl = {
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
}, fl = {
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
}, hl = {
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
}, pl = {
  systems: {
    bit: ml,
    byte: dl,
    IECBit: fl,
    IECByte: hl
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
}, gl = {
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
}, bl = {
  systems: {
    metric: gl
  }
}, yl = {
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
}, vl = {
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
}, xl = {
  systems: {
    SI: yl,
    nutrition: vl
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
}, kl = {
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
}, Nl = {
  systems: {
    SI: kl
  }
}, wl = {
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
}, Cl = {
  systems: {
    SI: wl
  }
}, Sl = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, _l = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, Rl = {
  systems: {
    metric: Sl,
    imperial: _l
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
}, Al = {
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
}, Ml = {
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
}, Ol = {
  systems: {
    metric: Al,
    imperial: Ml
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
}, Dl = {
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
}, zl = {
  systems: {
    metric: Dl,
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
}, Tl = {
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
}, Fl = {
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
}, $l = {
  systems: {
    metric: Tl,
    imperial: Fl
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
}, Pl = {
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
}, jl = {
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
}, El = {
  systems: {
    metric: Pl,
    imperial: jl
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
}, Il = {
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
}, Vl = {
  systems: {
    SI: Il
  }
}, ql = {
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
}, Kl = {
  systems: {
    unit: ql
  }
}, Bl = {
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
}, Hl = {
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
}, Wl = {
  systems: {
    metric: Bl,
    imperial: Hl
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
}, Gl = {
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
}, Ul = {
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
}, Yl = {
  systems: {
    metric: Gl,
    imperial: Ul
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
}, Ql = {
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
}, Jl = {
  systems: {
    SI: Ql
  }
}, Xl = {
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
}, Zl = {
  systems: {
    SI: Xl
  }
}, ec = {
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
}, tc = {
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
}, nc = {
  systems: {
    metric: ec,
    imperial: tc
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
}, rc = {
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
}, ac = {
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
}, oc = {
  systems: {
    metric: rc,
    imperial: ac
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
}, ic = {
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
}, sc = {
  systems: {
    SI: ic
  }
}, lc = {
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
}, cc = {
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
}, uc = {
  systems: {
    metric: lc,
    imperial: cc
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
}, mc = {
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
}, dc = {
  systems: {
    SI: mc
  }
}, fc = {
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
}, hc = {
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
}, pc = {
  systems: {
    metric: fc,
    imperial: hc
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
}, gc = {
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
}, bc = {
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
}, yc = {
  systems: {
    metric: gc,
    imperial: bc
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
}, vc = {
  acceleration: Zs,
  angle: tl,
  apparentPower: rl,
  area: il,
  charge: ll,
  current: ul,
  digital: pl,
  each: bl,
  energy: xl,
  force: Nl,
  frequency: Cl,
  illuminance: Rl,
  length: Ol,
  mass: zl,
  massFlowRate: $l,
  pace: El,
  partsPer: Vl,
  pieces: Kl,
  power: Wl,
  pressure: Yl,
  reactiveEnergy: Jl,
  reactivePower: Zl,
  speed: nc,
  torque: uc,
  temperature: oc,
  time: sc,
  voltage: dc,
  volume: pc,
  volumeFlowRate: yc
}, xc = Js(vc), kc = {
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
function Nc(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => xc(t).from(e.from).to(e.to)
  };
}
const Fn = {
  ...Object.fromEntries(
    Object.entries(kc).map(([e, t]) => [e, Nc(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function ln(e) {
  return e ? { ...Fn, ...e } : Fn;
}
function wc(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function Cc(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function Sc(e) {
  return e != null && e.quantity ? Cc(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const _c = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function Rc(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Hr(e, t) {
  const n = e * (_c[t ?? "ms"] ?? 1), a = n < 0 ? "-" : "";
  let r = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], s = o.map(([c, u], d) => {
    const h = d < o.length - 1 ? Math.floor(r / c) : Math.round(r / c);
    return r -= h * c, [h, u];
  }), l = s.findIndex((c) => c[0] > 0);
  return l === -1 ? "0s" : a + s.slice(l, l + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function Sn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const r = Math.abs(e);
    for (const [o, s] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (r >= o) return Rc((e / o).toFixed(n.decimals ?? 1)) + s;
  }
  const a = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, a).format(e);
}
function Ac(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Wr(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Ga(e = Fn) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return rr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, a = t.meta, r = a == null ? void 0 : a.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return Hr(n, a == null ? void 0 : a.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return Wr(Sn(n, t), o.prefix, o.suffix);
    }
    if (r === "time") return Hr(n, a == null ? void 0 : a.unit);
    if (r === "count" || (a == null ? void 0 : a.convert) === !1) return Wr(Sn(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const s = a == null ? void 0 : a.unit, l = s ? Ac(r, s) : {}, c = (o == null ? void 0 : o.prefix) ?? l.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : l.suffix ?? "";
    return `${c}${Sn(n, t)}${u}`;
  };
}
function w(...e) {
  return Xo(Jo(e));
}
function ar(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function Mc({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: w("animate-pulse rounded-md bg-muted", e), ...t });
}
const Oc = tr(
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
), or = x.forwardRef(({ className: e, variant: t, ...n }, a) => /* @__PURE__ */ i(
  "div",
  {
    ref: a,
    "data-slot": "alert",
    role: "alert",
    className: w(Oc({ variant: t }), e),
    ...n
  }
));
or.displayName = "Alert";
const ir = x.forwardRef(
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
ir.displayName = "AlertTitle";
const sr = x.forwardRef(
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
sr.displayName = "AlertDescription";
const Ft = m.object({
  axis: m.enum(["x", "y"]),
  value: m.number(),
  label: m.string().optional(),
  colorToken: Ve.optional()
}).strict(), lr = m.boolean().optional(), Dc = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(Ft).optional(),
  comparePrevious: lr
}).strict(), cr = m.enum(["linear", "monotone", "step", "natural"]), Lc = m.object({
  curve: cr.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(Ft).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: lr
}).strict(), zc = m.object({
  curve: cr.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(Ft).optional(),
  comparePrevious: lr
}).strict(), Tc = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), Fc = m.object({
  x: ee,
  y: ee,
  size: ee.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: ee.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(Ft).optional()
}).strict(), $c = m.object({
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
    granularity: m.union([Ye, Yt]).optional(),
    dateRange: m.union([Dn, Yt]).optional()
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
}).strict(), Pc = m.object({
  member: ee,
  label: m.string().optional(),
  format: an.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), jc = m.object({
  member: ee,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: Ve.optional()
}).strict(), Ec = m.object({
  columns: m.array(Pc).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(jc).optional()
}).strict(), Ic = m.object({
  member: ee,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: Ve.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), Vc = m.object({
  series: m.array(Ic),
  referenceLines: m.array(Ft).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: cr.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), qc = {
  bar: Dc,
  line: Lc,
  area: zc,
  pie: Tc,
  scatter: Fc,
  kpi: $c,
  table: Ec,
  combo: Vc
};
function Xf(e) {
  return qc[e];
}
const Ua = {
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
function Gr(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function $n(e, t) {
  if (t === void 0) return e;
  if (!Gr(e) || !Gr(t))
    return t;
  const n = { ...e };
  for (const a of Object.keys(t)) {
    const r = t[a];
    r !== void 0 && (n[a] = a in e ? $n(e[a], r) : r);
  }
  return n;
}
function Kc(e) {
  const t = Ua[e.family];
  return {
    ...$n({ ...t.envelope }, e),
    familyOptions: $n(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
function ur(e) {
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
function Le(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Bc(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function _t(e) {
  return `var(${ar(e.key)})`;
}
function Hc(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Ya(e) {
  return e === "stacked" || e === "percent";
}
function cn(e, t) {
  var l, c, u, d, h, p, b, y, g, v, S, _, N, R;
  const n = e.raw.annotation, a = (C) => {
    var k, D, z, V, K, I;
    if (C)
      return ((k = n == null ? void 0 : n.measures[C]) == null ? void 0 : k.shortTitle) ?? ((D = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : D.shortTitle) ?? ((z = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : z.shortTitle) ?? ((V = n == null ? void 0 : n.measures[C]) == null ? void 0 : V.title) ?? ((K = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : K.title) ?? ((I = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : I.title) ?? C;
  }, r = e.series.find((C) => {
    var k;
    return (((k = C.meta) == null ? void 0 : k.axis) ?? "left") !== "right";
  }), o = e.series.find((C) => {
    var k;
    return ((k = C.meta) == null ? void 0 : k.axis) === "right";
  }), s = (C) => {
    var k;
    return C ? (k = C.meta) != null && k.measure ? a(C.meta.measure) : C.label : void 0;
  };
  return {
    x: (c = (l = t.axes) == null ? void 0 : l.x) != null && c.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? a((p = (h = t.mapping) == null ? void 0 : h.category) == null ? void 0 : p.member),
    left: (y = (b = t.axes) == null ? void 0 : b.y) != null && y.labelHide ? void 0 : ((v = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : v.label) ?? s(r),
    right: (_ = (S = t.axes) == null ? void 0 : S.y2) != null && _.labelHide ? void 0 : ((R = (N = t.axes) == null ? void 0 : N.y2) == null ? void 0 : R.label) ?? s(o)
  };
}
function je(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function mr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function $t(e, t, n) {
  return (a, r) => {
    const o = r == null ? void 0 : r.dataKey, s = typeof o == "string" || typeof o == "number" ? String(o) : void 0, l = (s ? n == null ? void 0 : n.get(s) : void 0) ?? t ?? s;
    return e.value(a, l, "tooltip");
  };
}
function Jt(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
const Wc = { light: "", dark: ".dark" }, Qa = x.createContext(null);
function Ja() {
  const e = x.useContext(Qa);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const qe = x.forwardRef(({ id: e, className: t, children: n, config: a, ...r }, o) => {
  const s = x.useId(), l = `chart-${e || s.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Qa.Provider, { value: { config: a }, children: /* @__PURE__ */ f(
    "div",
    {
      "data-chart": l,
      ref: o,
      className: w(
        "flex h-full w-full justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-none",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ i(Gc, { id: l, config: a }),
        /* @__PURE__ */ i(Gn.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
qe.displayName = "ChartContainer";
const Gc = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, a]) => a.theme || a.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Wc).map(
          ([a, r]) => `
${r} [data-chart=${e}] {
${n.map(([o, s]) => {
            var c;
            const l = ((c = s.theme) == null ? void 0 : c[a]) || s.color;
            return l ? `  ${ar(o)}: ${l};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, ft = Gn.Tooltip, Xe = x.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: a = "dot",
    hideLabel: r = !1,
    hideIndicator: o = !1,
    label: s,
    labelFormatter: l,
    labelClassName: c,
    formatter: u,
    valueFormatter: d,
    color: h,
    nameKey: p,
    labelKey: b
  }, y) => {
    const { config: g } = Ja(), v = x.useMemo(() => {
      var k;
      if (r || !(t != null && t.length))
        return null;
      const [_] = t, N = `${b || (_ == null ? void 0 : _.dataKey) || (_ == null ? void 0 : _.name) || "value"}`, R = Pn(g, _, N), C = !b && typeof s == "string" ? ((k = g[s]) == null ? void 0 : k.label) || s : R == null ? void 0 : R.label;
      return l ? /* @__PURE__ */ i("div", { className: w("font-medium", c), children: l(C, t) }) : C ? /* @__PURE__ */ i("div", { className: w("font-medium", c), children: C }) : null;
    }, [s, l, t, r, c, g, b]);
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
            const R = `${p || _.name || _.dataKey || "value"}`, C = Pn(g, _, R), k = h || ((D = _.payload) == null ? void 0 : D.fill) || _.color;
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
Xe.displayName = "ChartTooltipContent";
const ht = Gn.Legend, Ze = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: a = "bottom", nameKey: r }, o) => {
    const { config: s } = Ja();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: w(
          "flex items-center justify-center gap-4",
          a === "top" ? "pb-3" : "pt-3",
          e
        ),
        children: n.map((l) => {
          const c = `${r || l.dataKey || "value"}`, u = Pn(s, l, c);
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
                    style: { backgroundColor: l.color }
                  }
                ),
                (u == null ? void 0 : u.label) ?? l.value
              ]
            },
            l.value ?? c
          );
        })
      }
    ) : null;
  }
);
Ze.displayName = "ChartLegendContent";
function Pn(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const a = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let r = n;
  return n in t && typeof t[n] == "string" ? r = t[n] : a && n in a && typeof a[n] == "string" && (r = a[n]), r in e ? e[r] : e[n];
}
function Uc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var V, K, I, B, L, A, Y, G, P, U, E, T, Q, ue, ce, H;
  const o = t.familyOptions ?? {}, s = t.orientation === "horizontal", l = Ya(t.stackMode), c = t.stackMode === "percent", u = ur(e), d = (M, X, fe = "value") => c ? Jt(M) : a.value(M, X, fe), h = (M) => a.category(M), p = mr(e), b = je(e.series[0]), y = s ? (K = (V = t.axes) == null ? void 0 : V.y) == null ? void 0 : K.hide : (B = (I = t.axes) == null ? void 0 : I.x) == null ? void 0 : B.hide, g = s ? (L = t.axes) == null ? void 0 : L.x : (A = t.axes) == null ? void 0 : A.y, v = !s && e.series.some((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) === "right";
  }), S = je(e.series.find((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) !== "right";
  })) ?? b, _ = je(e.series.find((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) === "right";
  })), N = cn(e, t), R = N.x ? { value: N.x, position: "insideBottom", offset: -2 } : void 0, C = N.x ? { value: N.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, k = N.left ? { value: N.left, position: "insideBottom", offset: -2 } : void 0, D = N.left ? { value: N.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, z = N.right ? { value: N.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(qe, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(
    Fo,
    {
      accessibilityLayer: !0,
      data: u,
      layout: s ? "vertical" : "horizontal",
      stackOffset: c ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Dt, { vertical: s, horizontal: !s }),
        s ? /* @__PURE__ */ f(re, { children: [
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
            nt,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: Le(g),
              domain: De(g),
              tickFormatter: (M) => d(M, b, "axis"),
              label: k
            }
          )
        ] }) : /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            nt,
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
              scale: Le(g),
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
              scale: Le((P = t.axes) == null ? void 0 : P.y2),
              domain: De((U = t.axes) == null ? void 0 : U.y2),
              tickFormatter: (M) => d(M, _, "axis"),
              label: z
            }
          )
        ] }),
        ((E = t.tooltip) == null ? void 0 : E.show) !== !1 && /* @__PURE__ */ i(
          ft,
          {
            content: /* @__PURE__ */ i(
              Xe,
              {
                labelFormatter: (M) => a.category(M),
                indicator: ((T = t.tooltip) == null ? void 0 : T.indicator) ?? "dot",
                valueFormatter: c ? (M) => Jt(M) : $t(a, void 0, p)
              }
            )
          }
        ),
        ve(t).show && /* @__PURE__ */ i(
          ht,
          {
            content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: ut((Q = t.legend) == null ? void 0 : Q.position),
            layout: mt((ue = t.legend) == null ? void 0 : ue.position),
            align: dt((ce = t.legend) == null ? void 0 : ce.position)
          }
        ),
        e.series.map((M) => {
          var X, fe, $e, We;
          return /* @__PURE__ */ i(
            ha,
            {
              yAxisId: s ? void 0 : ((X = M.meta) == null ? void 0 : X.axis) === "right" && v ? "right" : "left",
              dataKey: M.key,
              name: M.label,
              stackId: l ? (fe = M.meta) != null && fe.companion ? "__prev" : (($e = M.meta) == null ? void 0 : $e.stackId) ?? "stack" : void 0,
              fill: _t(M),
              fillOpacity: (We = M.meta) != null && We.companion ? 0.4 : void 0,
              radius: Bc(o.barRadius, s),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                pa,
                {
                  dataKey: M.key,
                  position: s ? "right" : "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (Ge) => d(typeof Ge == "boolean" ? Number(Ge) : Ge, je(M), "label")
                }
              )
            },
            M.key
          );
        }),
        (H = o.referenceLines) == null ? void 0 : H.map((M, X) => /* @__PURE__ */ i(
          Lt,
          {
            yAxisId: s ? void 0 : "left",
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
function Yc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var S, _, N, R, C, k, D, z, V, K, I, B, L, A, Y, G;
  const o = t.familyOptions ?? {}, s = o.chrome === "none", l = ur(e), c = (P) => a.category(P), u = e.series.some((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) === "right";
  }), d = o.curve ?? "monotone", h = mr(e), p = je(e.series.find((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) !== "right";
  })), b = je(e.series.find((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) === "right";
  })), y = cn(e, t), g = !s && o.dots === !0, v = !s;
  return /* @__PURE__ */ i(
    qe,
    {
      config: n,
      className: s ? "aspect-[5/1] w-full" : "h-full w-full min-h-[200px]",
      children: /* @__PURE__ */ f($o, { accessibilityLayer: !0, data: l, margin: s ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !s && /* @__PURE__ */ i(Dt, { vertical: !1 }),
        /* @__PURE__ */ i(
          nt,
          {
            type: "category",
            dataKey: "__cat",
            hide: s || ((_ = (S = t.axes) == null ? void 0 : S.x) == null ? void 0 : _.hide),
            tickFormatter: c,
            label: !s && y.x ? { value: y.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Te,
          {
            yAxisId: "left",
            type: "number",
            hide: s || ((R = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : R.hide),
            scale: Le((C = t.axes) == null ? void 0 : C.y),
            domain: De((k = t.axes) == null ? void 0 : k.y),
            tickFormatter: (P) => a.value(P, p, "axis"),
            label: !s && y.left ? { value: y.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Te,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: s || ((z = (D = t.axes) == null ? void 0 : D.y2) == null ? void 0 : z.hide),
            scale: Le((V = t.axes) == null ? void 0 : V.y2),
            domain: De((K = t.axes) == null ? void 0 : K.y2),
            tickFormatter: (P) => a.value(P, b, "axis"),
            label: !s && y.right ? { value: y.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !s && ((I = t.tooltip) == null ? void 0 : I.show) !== !1 && /* @__PURE__ */ i(
          ft,
          {
            content: /* @__PURE__ */ i(
              Xe,
              {
                labelFormatter: (P) => a.category(P),
                indicator: ((B = t.tooltip) == null ? void 0 : B.indicator) ?? "line",
                valueFormatter: $t(a, void 0, h)
              }
            )
          }
        ),
        !s && ve(t).show && /* @__PURE__ */ i(
          ht,
          {
            content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: ut((L = t.legend) == null ? void 0 : L.position),
            layout: mt((A = t.legend) == null ? void 0 : A.position),
            align: dt((Y = t.legend) == null ? void 0 : Y.position)
          }
        ),
        e.series.map((P) => {
          var U, E, T, Q, ue, ce;
          return /* @__PURE__ */ i(
            ga,
            {
              yAxisId: u && ((U = P.meta) == null ? void 0 : U.axis) === "right" ? "right" : "left",
              type: ((E = P.meta) == null ? void 0 : E.curve) ?? d,
              dataKey: P.key,
              name: P.label,
              stroke: _t(P),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (T = P.meta) != null && T.companion ? "5 4" : void 0,
              strokeOpacity: (Q = P.meta) != null && Q.companion ? 0.55 : void 0,
              dot: s || (ue = P.meta) != null && ue.companion ? !1 : ((ce = P.meta) == null ? void 0 : ce.dots) ?? g,
              activeDot: v,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !s,
              children: !s && o.showValueLabels && /* @__PURE__ */ i(
                pa,
                {
                  dataKey: P.key,
                  position: "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (H) => a.value(typeof H == "boolean" ? Number(H) : H, je(P), "label")
                }
              )
            },
            P.key
          );
        }),
        !s && ((G = o.referenceLines) == null ? void 0 : G.map((P, U) => /* @__PURE__ */ i(
          Lt,
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
function Qc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var v, S, _, N, R, C, k, D, z, V, K, I, B, L;
  const o = t.familyOptions ?? {}, s = ((S = (v = t.mapping) == null ? void 0 : v.series) == null ? void 0 : S.mode) === "pivot", l = t.stackMode ?? (s ? "stacked" : "none"), c = Ya(l), u = l === "percent", d = ur(e), h = (A) => a.category(A), p = o.curve ?? "monotone", b = mr(e), y = je(e.series[0]), g = cn(e, t);
  return /* @__PURE__ */ i(qe, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(ba, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Dt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((A) => /* @__PURE__ */ f("linearGradient", { id: `fill-${A.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: _t(A), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: _t(A), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, A.key)) }),
    /* @__PURE__ */ i(
      nt,
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
        scale: Le((k = t.axes) == null ? void 0 : k.y),
        domain: De((D = t.axes) == null ? void 0 : D.y),
        tickFormatter: (A) => u ? Jt(A) : a.value(A, y, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((z = t.tooltip) == null ? void 0 : z.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Xe,
          {
            labelFormatter: (A) => a.category(A),
            indicator: ((V = t.tooltip) == null ? void 0 : V.indicator) ?? "dot",
            valueFormatter: u ? (A) => Jt(A) : $t(a, void 0, b)
          }
        )
      }
    ),
    ve(t).show && /* @__PURE__ */ i(
      ht,
      {
        content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((K = t.legend) == null ? void 0 : K.position),
        layout: mt((I = t.legend) == null ? void 0 : I.position),
        align: dt((B = t.legend) == null ? void 0 : B.position)
      }
    ),
    e.series.map((A) => {
      var Y, G, P, U, E, T, Q, ue;
      return /* @__PURE__ */ i(
        Un,
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
    (L = o.referenceLines) == null ? void 0 : L.map((A, Y) => /* @__PURE__ */ i(
      Lt,
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
function Jc({ data: e, options: t, format: n, editing: a }) {
  var g, v, S, _, N;
  const r = t.familyOptions ?? {}, o = e.series[0], s = e.categories.map((R, C) => {
    const k = n.category(R);
    return {
      key: `slice-${C}`,
      label: k,
      value: (o == null ? void 0 : o.data[C]) ?? 0,
      fill: `var(--${ge[C % ge.length]})`
    };
  }), l = Xc(s, r.maxSlices), c = l.reduce((R, C) => R + C.value, 0), u = {};
  l.forEach((R, C) => {
    u[R.key] = {
      label: R.label,
      color: `var(--${ge[C % ge.length]})`
    };
  });
  const d = `${r.innerRadiusPct ?? 0}%`, h = `${r.outerRadiusPct ?? 80}%`, p = (r.innerRadiusPct ?? 0) > 0, b = r.showLabels ?? "percent", y = b === "none" ? !1 : ({ payload: R, percent: C }) => {
    const k = R;
    return b === "name" ? (k == null ? void 0 : k.label) ?? "" : b === "value" ? n.value(k == null ? void 0 : k.value, o == null ? void 0 : o.key, "label") : `${((C !== void 0 ? C : k && c > 0 ? k.value / c : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(qe, { config: u, className: "h-full w-full min-h-[200px] [&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ f(Po, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Xe,
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
      jo,
      {
        data: l,
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
          l.map((R) => /* @__PURE__ */ i(ya, { fill: R.fill }, R.key)),
          p && r.centerLabel && /* @__PURE__ */ i(
            Eo,
            {
              position: "center",
              content: ({ viewBox: R }) => {
                var z, V;
                if (!R || !("cx" in R)) return null;
                const { cx: C, cy: k } = R, D = ((z = r.centerLabel) == null ? void 0 : z.value) === void 0 || r.centerLabel.value === "total" ? n.value(c, o == null ? void 0 : o.key, "label") : r.centerLabel.value;
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
          Ze,
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
function Xc(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((l, c) => c.value - l.value), a = n.slice(0, t - 1), o = n.slice(t - 1).reduce((l, c) => l + c.value, 0), s = t - 1;
  return [
    ...a,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${ge[s % ge.length]})`
    }
  ];
}
function Zc({ data: e, options: t, format: n, editing: a }) {
  var y, g, v, S, _, N, R, C, k, D, z, V, K, I, B, L, A, Y, G, P, U, E, T, Q, ue, ce;
  const r = t.familyOptions ?? {}, o = e.raw.annotation, s = e.raw.rows, l = { x: r.x, y: r.y, z: r.size }, c = ((y = o == null ? void 0 : o.measures[r.x]) == null ? void 0 : y.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[r.x]) == null ? void 0 : g.shortTitle) ?? r.x, u = ((v = o == null ? void 0 : o.measures[r.y]) == null ? void 0 : v.shortTitle) ?? ((S = o == null ? void 0 : o.dimensions[r.y]) == null ? void 0 : S.shortTitle) ?? r.y, d = (N = (_ = t.axes) == null ? void 0 : _.x) != null && N.labelHide ? void 0 : ((C = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : C.label) ?? c, h = (D = (k = t.axes) == null ? void 0 : k.y) != null && D.labelHide ? void 0 : ((V = (z = t.axes) == null ? void 0 : z.y) == null ? void 0 : V.label) ?? u, p = eu(s, r), b = {};
  return p.forEach((H, M) => {
    b[H.key] = { label: H.label, color: `var(--${ge[M % ge.length]})` };
  }), /* @__PURE__ */ i(qe, { config: b, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(Io, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Dt, {}),
    /* @__PURE__ */ i(
      nt,
      {
        type: "number",
        dataKey: "x",
        name: c,
        hide: (I = (K = t.axes) == null ? void 0 : K.x) == null ? void 0 : I.hide,
        scale: Le((B = t.axes) == null ? void 0 : B.x),
        domain: De((L = t.axes) == null ? void 0 : L.x),
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
        scale: Le((G = t.axes) == null ? void 0 : G.y),
        domain: De((P = t.axes) == null ? void 0 : P.y),
        tickFormatter: (H) => n.value(H, r.y, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    r.size && /* @__PURE__ */ i(Vo, { type: "number", dataKey: "z", range: r.sizeRange ?? [40, 400], name: r.size }),
    ((U = t.tooltip) == null ? void 0 : U.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          Xe,
          {
            indicator: ((E = t.tooltip) == null ? void 0 : E.indicator) ?? "dot",
            valueFormatter: (H, M) => {
              const X = M == null ? void 0 : M.dataKey, fe = typeof X == "string" ? l[X] : void 0;
              return n.value(H, fe, "tooltip");
            }
          }
        )
      }
    ),
    ve(t).show && p.length > 1 && /* @__PURE__ */ i(
      ht,
      {
        content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((T = t.legend) == null ? void 0 : T.position),
        layout: mt((Q = t.legend) == null ? void 0 : Q.position),
        align: dt((ue = t.legend) == null ? void 0 : ue.position)
      }
    ),
    p.map((H, M) => /* @__PURE__ */ i(
      qo,
      {
        name: H.label,
        data: H.points,
        shape: r.shape ?? "circle",
        fill: `var(--color-${H.key})`,
        children: p.length === 1 && H.points.map((X, fe) => /* @__PURE__ */ i(ya, { fill: `var(--${ge[M % ge.length]})` }, fe))
      },
      H.key
    )),
    (ce = r.referenceLines) == null ? void 0 : ce.map((H, M) => /* @__PURE__ */ i(
      Lt,
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
function eu(e, t) {
  const n = (r) => ({
    x: _n(r[t.x]),
    y: _n(r[t.y]),
    ...t.size ? { z: _n(r[t.size]) } : {}
  });
  if (!t.groupBy)
    return [{ key: "series-0", label: "Points", points: e.map(n) }];
  const a = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = String(r[t.groupBy] ?? "—"), s = a.get(o) ?? [];
    s.push(n(r)), a.set(o, s);
  }
  return [...a.entries()].map(([r, o], s) => ({
    key: `series-${s}`,
    label: r,
    points: o
  }));
}
function _n(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function tu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function nu(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function ru(e) {
  var c, u, d, h;
  const { data: t, options: n, format: a } = e, r = n.familyOptions ?? {}, o = (p) => a.value(p, r.measure, "kpi"), s = Xa(t.raw.rows, r.measure) ?? 0, l = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[r.measure]) == null ? void 0 : u.shortTitle) ?? ((h = (d = t.raw.annotation) == null ? void 0 : d.measures[r.measure]) == null ? void 0 : h.title) ?? r.measure;
  return r.display === "gauge" ? /* @__PURE__ */ i(lu, { value: s, label: l, fmt: o, fo: r }) : /* @__PURE__ */ i(au, { ...e, value: s, label: l, fo: r, fmt: o });
}
function au({
  data: e,
  value: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = n.goodDirection ?? ((u = n.comparison) == null ? void 0 : u.goodDirection) ?? "up", o = uu(e.raw.rows, t, n), s = n.sparkline ? e.series[0] : void 0, l = o ? o.diff : s ? iu(s) : 0, c = nu(tu(l, r));
  return /* @__PURE__ */ f("div", { className: "flex h-full w-full flex-col justify-center gap-1", children: [
    /* @__PURE__ */ f("div", { className: "flex items-baseline gap-2", children: [
      /* @__PURE__ */ i("span", { className: "text-4xl font-bold tabular-nums text-foreground", children: a(t) }),
      o && /* @__PURE__ */ i(su, { delta: o, goodDirection: r, fo: n, fmt: a })
    ] }),
    s && s.data.length > 0 && /* @__PURE__ */ i(ou, { series: s, categories: e.categories, colorClass: c })
  ] });
}
function ou({
  series: e,
  categories: t,
  colorClass: n
}) {
  const a = t.map((r, o) => ({ x: typeof r == "number" ? r : String(r), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: w("mt-2 h-12 w-full", n), children: /* @__PURE__ */ i(Wo, { width: "100%", height: "100%", children: /* @__PURE__ */ i(ba, { data: a, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
    Un,
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
function iu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function su({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = e.diff > 0, o = e.diff === 0, s = o ? !0 : r === (t === "up"), l = o ? Zo : r ? Qn : Jn, c = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${a(e.diff)}`;
  return /* @__PURE__ */ f(
    "span",
    {
      className: w(
        "inline-flex items-center gap-0.5 text-sm font-medium",
        o ? "text-muted-foreground" : s ? "text-emerald-600" : "text-destructive"
      ),
      children: [
        /* @__PURE__ */ i(l, { className: "size-3.5" }),
        c
      ]
    }
  );
}
function lu({
  value: e,
  label: t,
  fmt: n,
  fo: a
}) {
  var d, h;
  const r = ((d = a.gauge) == null ? void 0 : d.min) ?? 0, o = ((h = a.gauge) == null ? void 0 : h.max) ?? Math.max(e, 1), s = Math.max(r, Math.min(o, e)), l = cu(e, a) ?? "chart-1", c = [{ name: t, value: s, fill: `var(--${l})` }], u = { value: { label: t, color: `var(--${l})` } };
  return /* @__PURE__ */ f("div", { className: "relative flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ i(qe, { config: u, className: "aspect-square min-h-[180px] w-full", children: /* @__PURE__ */ f(
      Ko,
      {
        data: c,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(Bo, { type: "number", domain: [r, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(Ho, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ f("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ i("span", { className: "text-2xl font-bold tabular-nums text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "text-xs text-muted-foreground", children: t })
    ] })
  ] });
}
function cu(e, t) {
  var r;
  const n = (r = t.gauge) == null ? void 0 : r.thresholds;
  if (!(n != null && n.length)) return;
  let a;
  for (const o of [...n].sort((s, l) => s.at - l.at))
    e >= o.at && (a = o.colorToken);
  return a;
}
function Xa(e, t) {
  for (const n of e) {
    const a = Za(n[t]);
    if (a !== null) return a;
  }
  return null;
}
function uu(e, t, n) {
  const a = n.comparison;
  if (!a) return null;
  let r = null;
  if (a.mode === "value")
    typeof a.value == "number" ? r = a.value : typeof a.value == "string" && (r = Xa(e, a.value));
  else {
    const l = e[1];
    r = l ? Za(l[n.measure]) : null;
  }
  if (r === null) return null;
  const o = t - r, s = r !== 0 ? o / r : null;
  return { current: t, baseline: r, diff: o, pct: s };
}
function Za(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const eo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: w("w-full caption-bottom text-sm", e), ...t }) })
);
eo.displayName = "Table";
const to = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: w("[&_tr]:border-b", e), ...t }));
to.displayName = "TableHeader";
const no = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: w("[&_tr:last-child]:border-0", e), ...t }));
no.displayName = "TableBody";
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
const jn = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
jn.displayName = "TableHead";
const Ht = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: w("p-2 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
Ht.displayName = "TableCell";
const mu = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: w("mt-4 text-sm text-muted-foreground", e), ...t }));
mu.displayName = "TableCaption";
const ro = tr(
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
      className: w(ro({ variant: t, size: n }), e),
      ...r
    }
  )
);
W.displayName = "Button";
function du({ data: e, options: t, format: n }) {
  const a = t.familyOptions ?? {}, r = e.raw.rows, o = e.raw.annotation, s = x.useMemo(
    () => fu(r, o, a, n),
    [r, o, a, n]
  ), [l, c] = x.useState(null), [u, d] = x.useState(0), h = a.sortable !== !1, p = a.pageSize ?? 25, b = x.useMemo(() => {
    if (!l) return r;
    const N = l.dir === "asc" ? 1 : -1;
    return [...r].sort((R, C) => yu(R[l.member], C[l.member]) * N);
  }, [r, l]), y = Math.max(1, Math.ceil(b.length / p)), g = Math.min(u, y - 1), v = b.slice(g * p, g * p + p), S = (N) => {
    h && (c(
      (R) => (R == null ? void 0 : R.member) === N ? { member: N, dir: R.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), d(0));
  }, _ = a.rowHeight === "compact";
  return /* @__PURE__ */ f("div", { className: "flex h-full w-full flex-col", children: [
    /* @__PURE__ */ i("div", { className: w("w-full", a.stickyHeader && "max-h-full overflow-auto"), children: /* @__PURE__ */ f(eo, { children: [
      /* @__PURE__ */ i(to, { className: w(a.stickyHeader && "sticky top-0 z-10 bg-background"), children: /* @__PURE__ */ f(Bt, { children: [
        a.showRowNumbers && /* @__PURE__ */ i(jn, { className: "w-10 text-right", children: "#" }),
        s.map((N) => /* @__PURE__ */ i(
          jn,
          {
            className: Ur(N.align),
            style: N.width ? { width: N.width } : void 0,
            children: h ? /* @__PURE__ */ f(
              W,
              {
                variant: "ghost",
                className: "-ml-2 h-7 px-2 text-muted-foreground",
                onClick: () => S(N.member),
                children: [
                  N.label,
                  /* @__PURE__ */ i(bu, { active: (l == null ? void 0 : l.member) === N.member, dir: l == null ? void 0 : l.dir })
                ]
              }
            ) : N.label
          },
          N.member
        ))
      ] }) }),
      /* @__PURE__ */ f(no, { children: [
        v.map((N, R) => /* @__PURE__ */ f(Bt, { children: [
          a.showRowNumbers && /* @__PURE__ */ i(Ht, { className: w("text-right text-muted-foreground", _ && "py-1"), children: g * p + R + 1 }),
          s.map((C) => {
            const k = vu(C.member, N[C.member], a.conditionalFormat);
            return /* @__PURE__ */ i(
              Ht,
              {
                className: w(Ur(C.align), _ && "py-1"),
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
            colSpan: s.length + (a.showRowNumbers ? 1 : 0),
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
function fu(e, t, n, a) {
  var s;
  const r = e.length > 0 ? Object.keys(e[0]) : pu(t);
  return ((s = n.columns) != null && s.length ? n.columns : r.map((l) => ({ member: l }))).filter((l) => !l.hidden).map((l) => {
    const c = l.member, u = t ? gu(t, c) : void 0, d = t ? c in t.measures : !1, h = l.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? c, p = l.align ?? (d ? "right" : "left");
    return {
      member: c,
      label: h,
      align: p,
      width: l.width,
      render: (b) => hu(b, d, c, a)
    };
  });
}
function hu(e, t, n, a) {
  if (e == null || e === "") return "—";
  if (t) {
    const r = typeof e == "number" ? e : Number(e);
    return Number.isFinite(r) ? a.value(r, n) : String(e);
  }
  return a.category(e);
}
function pu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function gu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Ur(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function bu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(Qn, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(Jn, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(ei, { className: "ml-1 size-3.5 opacity-50" });
}
function yu(e, t) {
  const n = typeof e == "number" ? e : Number(e), a = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(a) ? n - a : String(e ?? "").localeCompare(String(t ?? ""));
}
function vu(e, t, n) {
  if (!(n != null && n.length)) return;
  const a = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(a)) {
    for (const r of n)
      if (r.member === e && xu(a, r.when.op, r.when.value))
        return `var(--${r.colorToken ?? "chart-1"})`;
  }
}
function xu(e, t, n) {
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
function ku({ data: e, options: t, format: n, editing: a }) {
  var g, v, S, _, N, R, C, k, D, z, V, K, I, B, L, A, Y, G, P, U, E, T, Q, ue, ce, H;
  const r = t.familyOptions ?? {}, o = r.series ?? [], s = wu(e, o), l = (M) => n.category(M), c = o.some((M) => M.axis === "right"), u = (g = o.find((M) => M.axis !== "right")) == null ? void 0 : g.member, d = (v = o.find((M) => M.axis === "right")) == null ? void 0 : v.member, h = cn(e, t), p = (_ = (S = t.axes) == null ? void 0 : S.y) != null && _.labelHide ? void 0 : ((R = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : R.label) ?? (u ? Wt(e, u) : void 0), b = (k = (C = t.axes) == null ? void 0 : C.y2) != null && k.labelHide ? void 0 : ((z = (D = t.axes) == null ? void 0 : D.y2) == null ? void 0 : z.label) ?? (d ? Wt(e, d) : void 0), y = {};
  return o.forEach((M, X) => {
    const fe = M.colorToken ?? ge[X % ge.length];
    y[M.member] = {
      label: M.label ?? Wt(e, M.member),
      color: `var(--${fe})`
    };
  }), /* @__PURE__ */ i(qe, { config: y, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(Go, { accessibilityLayer: !0, data: s, children: [
    /* @__PURE__ */ i(Dt, { vertical: !1 }),
    /* @__PURE__ */ i(
      nt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (K = (V = t.axes) == null ? void 0 : V.x) == null ? void 0 : K.hide,
        tickFormatter: l,
        label: h.x ? { value: h.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Te,
      {
        yAxisId: "left",
        type: "number",
        hide: (B = (I = t.axes) == null ? void 0 : I.y) == null ? void 0 : B.hide,
        scale: Le((L = t.axes) == null ? void 0 : L.y),
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
        scale: Le((P = t.axes) == null ? void 0 : P.y2),
        domain: De((U = t.axes) == null ? void 0 : U.y2),
        tickFormatter: (M) => n.value(M, d, "axis"),
        label: b ? { value: b, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((E = t.tooltip) == null ? void 0 : E.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Xe,
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
        content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((Q = t.legend) == null ? void 0 : Q.position),
        layout: mt((ue = t.legend) == null ? void 0 : ue.position),
        align: dt((ce = t.legend) == null ? void 0 : ce.position)
      }
    ),
    o.map((M) => Nu(M, e, r)),
    (H = r.referenceLines) == null ? void 0 : H.map((M, X) => /* @__PURE__ */ i(
      Lt,
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
function Nu(e, t, n) {
  const a = e.axis === "right" ? "right" : "left", r = `var(${ar(e.member)})`, o = e.label ?? Wt(t, e.member), s = e.curve ?? n.curve ?? "monotone", l = e.dots ?? n.dots ?? !1, c = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    ha,
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
    Un,
    {
      yAxisId: a,
      type: s,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      fill: r,
      fillOpacity: n.fillOpacity ?? 0.25,
      dot: l,
      connectNulls: c
    },
    e.member
  ) : /* @__PURE__ */ i(
    ga,
    {
      yAxisId: a,
      type: s,
      dataKey: e.member,
      name: o,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      dot: l,
      connectNulls: c
    },
    e.member
  );
}
function wu(e, t) {
  var o, s, l;
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
  const r = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((l = (s = e.raw.query.timeDimensions) == null ? void 0 : s[0]) == null ? void 0 : l.dimension);
  return e.raw.rows.map((c) => {
    const u = r ? c[r] : void 0, d = {
      __cat: u == null ? "" : String(u)
    };
    for (const h of t) d[h.member] = Cu(c[h.member]);
    return d;
  });
}
function Wt(e, t) {
  var n, a, r, o;
  return ((a = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : a.shortTitle) ?? ((o = (r = e.raw.annotation) == null ? void 0 : r.measures[t]) == null ? void 0 : o.title) ?? t;
}
function Cu(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ao = {
  bar: Uc,
  line: Yc,
  area: Qc,
  pie: Jc,
  scatter: Zc,
  kpi: ru,
  table: du,
  combo: ku
};
function Su({
  data: e,
  options: t,
  config: n,
  format: a,
  state: r,
  components: o,
  editing: s
}) {
  const l = Kc(t);
  if (r != null && r.loading)
    return /* @__PURE__ */ i(Mc, { className: "h-full w-full min-h-[200px]" });
  if (r != null && r.error)
    return /* @__PURE__ */ f(or, { variant: "destructive", className: "w-full", children: [
      /* @__PURE__ */ i(xa, {}),
      /* @__PURE__ */ i(ir, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(sr, { children: r.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "flex h-full w-full min-h-[200px] items-center justify-center text-sm text-muted-foreground", children: "No data" });
  const c = n && Object.keys(n).length > 0 ? n : Hc(e), u = a ?? Wa(e.raw.annotation, l, rr), d = (o == null ? void 0 : o[l.family]) ?? ao[l.family];
  return /* @__PURE__ */ i(
    d,
    {
      data: e,
      options: l,
      config: c,
      format: u,
      state: r,
      editing: s
    }
  );
}
const dr = va(null);
dr.displayName = "CubeVizContext";
function Ke() {
  const e = Yn(dr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function _u(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Zf({
  cube: e,
  theme: t,
  locale: n,
  registry: a,
  children: r
}) {
  const o = Z(
    () => _u(e) ? us(e) : e,
    [e]
  ), s = Z(
    () => {
      var d;
      return {
        chartRamp: (d = t == null ? void 0 : t.chartRamp) != null && d.length ? t.chartRamp : ge,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), l = Z(
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
      locale: l,
      theme: s
    }),
    [o, c, l, s]
  );
  return /* @__PURE__ */ i(dr.Provider, { value: u, children: /* @__PURE__ */ i(
    "div",
    {
      className: w(
        "contents",
        s.mode === "dark" && "dark",
        s.mode === "light" && "cube-viz-light"
      ),
      children: r
    }
  ) });
}
function Ru(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? ao[t];
}
const Au = 5e3;
function Mu(e, t) {
  const { cubeClient: n } = Ke(), a = (t == null ? void 0 : t.skip) ?? !1, r = Z(
    () => e.limit === void 0 ? { ...e, limit: Au } : e,
    [e]
  ), o = Z(() => JSON.stringify(r), [r]), [s, l] = rt({ isLoading: !a }), [c, u] = rt(0), d = Ee(() => u((h) => h + 1), []);
  return zt(() => {
    if (a) {
      l({ isLoading: !1 });
      return;
    }
    let h = !0;
    return l((p) => ({ resultSet: p.resultSet, isLoading: !0 })), n.load(r, { castNumerics: !0 }).then((p) => {
      h && l({
        resultSet: p,
        isLoading: !1
      });
    }).catch((p) => {
      h && l({
        isLoading: !1,
        error: p instanceof Error ? p : new Error(String(p))
      });
    }), () => {
      h = !1;
    };
  }, [n, o, a, c]), { ...s, refetch: d };
}
const un = va(null);
un.displayName = "DashboardContext";
function fr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const a = e.variables, r = xt(null);
  (r.current === null || r.current.key !== a) && (r.current = { store: Os(a, t), key: a });
  const o = r.current.store, s = Ou(o, a);
  return Uo(un.Provider, { value: s }, n);
}
function Ou(e, t) {
  const n = Yo(
    e.subscribe,
    e.getAll,
    e.getAll
  ), a = Ee(
    (s, l) => e.set(s, l),
    [e]
  ), r = Ee(
    (s) => Ms(s, e.getAll(), t),
    [e, t]
  ), o = Ee(
    (s) => Ss(s, e.getAll(), t),
    [e, t]
  );
  return Z(
    () => ({ vars: n, setVar: a, resolveQuery: r, resolveValue: o, decls: t }),
    [n, a, r, o, t]
  );
}
function oo() {
  const e = Yn(un);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function hr() {
  return Yn(un);
}
function Rn(e, t, n) {
  var b;
  const a = hr(), { locale: r } = Ke(), o = Z(
    () => a && !(n != null && n.skipResolve) ? a.resolveQuery(e) : e,
    [a, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: s, isLoading: l, error: c, refetch: u } = Mu(o, { skip: n == null ? void 0 : n.skip }), d = ((b = t.format) == null ? void 0 : b.unitSystem) ?? (r == null ? void 0 : r.unitSystem), h = Z(() => ln(r == null ? void 0 : r.units), [r == null ? void 0 : r.units]);
  return { data: Z(() => {
    if (s)
      return vs(s, t, o, { unitSystem: d, conversions: h });
  }, [s, t, o, d, h]), isLoading: l, error: c, refetch: u, resolvedQuery: o };
}
function Be() {
  const { cubeClient: e } = Ke(), [t, n] = rt({ isLoading: !0 });
  return zt(() => {
    let a = !0;
    return n({ isLoading: !0 }), ms(e).then((r) => {
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
function eh() {
  const { locale: e } = Ke(), { formatValue: t, units: n } = e;
  return Z(
    () => t ?? Ga(ln(n)),
    [t, n]
  );
}
function io() {
  const [e, t] = rt(0), n = xt(null), a = xt(null), r = xt(null), o = xt(0), s = Ee((u) => {
    r.current === null && (r.current = requestAnimationFrame(() => {
      r.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), l = Ee(() => {
    a.current && (a.current.disconnect(), a.current = null), r.current !== null && (cancelAnimationFrame(r.current), r.current = null);
  }, []), c = Ee(
    (u) => {
      if (l(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== o.current && (o.current = d, t(d));
      const h = new ResizeObserver((p) => {
        var b, y;
        for (const g of p) {
          const v = ((y = (b = g.contentBoxSize) == null ? void 0 : b[0]) == null ? void 0 : y.inlineSize) ?? g.contentRect.width;
          s(v);
        }
      });
      h.observe(u), a.current = h;
    },
    [s, l]
  );
  return zt(() => l, [l]), [c, e];
}
const Du = "day";
function Lu(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, a = n == null ? void 0 : n.sparkline;
  if (!a) return null;
  const r = a.member ?? (n == null ? void 0 : n.measure), o = (d = e.timeDimensions) == null ? void 0 : d[0], s = a.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!r || !s) return null;
  const l = a.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [r],
    timeDimensions: [
      {
        dimension: s,
        granularity: a.granularity ?? Du,
        ...l !== void 0 ? { dateRange: l } : {}
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
      series: { mode: "measures", members: [r] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const ne = (e) => de(e, "yyyy-MM-dd");
function zu(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const r = Ut(e[0]), o = Ut(e[1]);
    if (Number.isNaN(r.getTime()) || Number.isNaN(o.getTime())) return;
    const s = Di(o, r) + 1;
    return [ne(ke(r, s)), ne(ke(r, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const r = ke(t, 1);
    return [ne(r), ne(r)];
  }
  if (n === "yesterday") {
    const r = ke(t, 2);
    return [ne(r), ne(r)];
  }
  const a = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (a) {
    const r = Number(a[1]), o = a[2];
    if (o.startsWith("day")) return [ne(ke(t, 2 * r - 1)), ne(ke(t, r))];
    if (o.startsWith("week")) return [ne(ke(t, 14 * r - 1)), ne(ke(t, 7 * r))];
    if (o.startsWith("month"))
      return [ne(gn(bn(t, 2 * r))), ne(ke(gn(bn(t, r)), 1))];
    if (o.startsWith("quarter"))
      return [ne(yn(vn(t, 2 * r))), ne(ke(yn(vn(t, r)), 1))];
    if (o.startsWith("year"))
      return [ne(xn(kn(t, 2 * r))), ne(ke(xn(kn(t, r)), 1))];
  }
  if (n === "this week") {
    const r = Li(t, 1);
    return [ne(zi(r)), ne(Ti(r))];
  }
  if (n === "this month") {
    const r = bn(t, 1);
    return [ne(gn(r)), ne(Fi(r))];
  }
  if (n === "this quarter") {
    const r = vn(t, 1);
    return [ne(yn(r)), ne($i(r))];
  }
  if (n === "this year") {
    const r = kn(t, 1);
    return [ne(xn(r)), ne(Pi(r))];
  }
}
function Tu(e, t) {
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
  const s = zu(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...r, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Fu = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function pr({ query: e, chart: t, onState: n, editing: a }) {
  const { registry: r, locale: o } = Ke(), s = Z(() => {
    var k;
    return (k = t.format) != null && k.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), l = Z(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: c, isLoading: u, error: d, refetch: h, resolvedQuery: p } = Rn(l, s), b = Z(() => Lu(l, s), [l, s]), y = Rn(
    (b == null ? void 0 : b.query) ?? l,
    (b == null ? void 0 : b.chart) ?? s,
    { skip: !b }
  ), g = Z(
    () => Tu(p, s),
    [p, s]
  ), v = Rn(
    (g == null ? void 0 : g.query) ?? l,
    s,
    { skip: !g, skipResolve: !0 }
  ), S = Z(
    () => ({ [s.family]: Ru(r, s.family) }),
    [r, s.family]
  ), _ = Z(() => {
    let k = c ?? Fu;
    if (b && y.data && (k = { ...k, series: y.data.series, categories: y.data.categories }), g && v.data) {
      if (g.mode === "kpiRow") {
        const D = v.data.raw.rows[0];
        if (D) {
          const z = k.raw.rows[0];
          k = {
            ...k,
            raw: { ...k.raw, rows: z ? [z, D] : [D] }
          };
        }
      } else if (k.series.length > 0) {
        const D = v.data.series.map((z) => {
          const V = k.series.find((K) => K.key === z.key);
          return {
            ...z,
            key: `${z.key}__prev`,
            label: `${(V == null ? void 0 : V.label) ?? z.label} (prev)`,
            colorToken: (V == null ? void 0 : V.colorToken) ?? z.colorToken,
            meta: { ...z.meta, companion: !0 }
          };
        });
        k = { ...k, series: [...k.series, ...D] };
      }
    }
    return k;
  }, [c, b, y.data, g, v.data]);
  zt(() => {
    n == null || n({ rows: _.raw.rows, refetch: h, isLoading: u });
  }, [n, _.raw.rows, h, u]);
  const N = {}, R = Z(
    () => o.formatValue ?? Ga(ln(o.units)),
    [o.formatValue, o.units]
  ), C = Z(
    () => Wa(_.raw.annotation, s, R, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [_.raw.annotation, s, R, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    Su,
    {
      data: _,
      options: s,
      config: N,
      format: C,
      state: { loading: u && !c, error: d },
      components: S,
      editing: a
    }
  );
}
function $u({ spec: e }) {
  return /* @__PURE__ */ i(pr, { query: e.query, chart: e.chart });
}
const so = "cube-viz-prose";
function Pu(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function ju({ doc: e }) {
  const t = Pu(e), n = Z(
    () => t ? e : null,
    [t, e]
  ), a = za(
    {
      extensions: [Fa],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: w(so) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(Ta, { editor: a }) : /* @__PURE__ */ i("div", { className: "text-sm text-muted-foreground", children: "Unsupported text content" });
}
function Eu({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: a } = Ei(), r = w(ro({ variant: "outline" }), "size-7 shrink-0 p-0");
  return /* @__PURE__ */ f("div", { className: "mb-2 flex items-center justify-between gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !a,
        onClick: () => a && t(a),
        className: w(r, !a && "opacity-40"),
        children: /* @__PURE__ */ i(Xn, { className: "size-4" })
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
        children: /* @__PURE__ */ i(rn, { className: "size-4" })
      }
    )
  ] });
}
function Iu({ day: e, modifiers: t, className: n, style: a, ...r }) {
  const o = !!t.selected && !t.outside && !t.disabled, s = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...r,
      style: { ...a, color: o ? "var(--primary-foreground)" : s ? "var(--muted-foreground)" : "var(--foreground)" },
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
function lo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...a
}) {
  return /* @__PURE__ */ i(
    ji,
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
        MonthCaption: Eu,
        DayButton: Iu,
        Chevron: ({ orientation: r, className: o, ...s }) => /* @__PURE__ */ i(r === "left" ? Xn : rn, { className: w("size-4", o), ...s })
      },
      ...a
    }
  );
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ i(Gt.Root, { "data-slot": "popover", ...e });
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ i(Gt.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Me({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ i(Gt.Portal, { children: /* @__PURE__ */ i(
    Gt.Content,
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
function we({
  ...e
}) {
  return /* @__PURE__ */ i(be.Root, { "data-slot": "select", ...e });
}
function En({
  ...e
}) {
  return /* @__PURE__ */ i(be.Group, { "data-slot": "select-group", ...e });
}
function Ce({
  ...e
}) {
  return /* @__PURE__ */ i(be.Value, { "data-slot": "select-value", ...e });
}
function Se({
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
        /* @__PURE__ */ i(be.Icon, { asChild: !0, children: /* @__PURE__ */ i(lt, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Vu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: w("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(ti, { className: "size-4" })
    }
  );
}
function qu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: w("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(lt, { className: "size-4" })
    }
  );
}
function _e({
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
        /* @__PURE__ */ i(Vu, {}),
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
        /* @__PURE__ */ i(qu, {})
      ]
    }
  ) });
}
function In({
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
        /* @__PURE__ */ i("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ i(be.ItemIndicator, { children: /* @__PURE__ */ i(Ie, { className: "size-4" }) }) }),
        /* @__PURE__ */ i(be.ItemText, { children: t })
      ]
    }
  );
}
const ot = w(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground",
  "shadow-sm transition-colors placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "[&>option]:bg-popover [&>option]:text-popover-foreground",
  "disabled:cursor-not-allowed disabled:opacity-50"
), Ku = "mb-1 block text-xs font-medium text-muted-foreground", Nt = "yyyy-MM-dd", Bu = [
  "today",
  "yesterday",
  "this week",
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last week",
  "last month",
  "last quarter",
  "this year",
  "last year"
], Hu = {
  today: "Today",
  yesterday: "Yesterday",
  "this week": "This week",
  "this month": "This month",
  "this quarter": "This quarter",
  "this year": "This year",
  "last 7 days": "Last 7 days",
  "last 30 days": "Last 30 days",
  "last 90 days": "Last 90 days",
  "last week": "Last week (previous)",
  "last month": "Last month (previous)",
  "last quarter": "Last quarter (previous)",
  "last year": "Last year (previous)",
  "last 6 months": "Last 6 months",
  "last 12 months": "Last 12 months"
};
function Yr(e) {
  return Hu[e.trim().toLowerCase()] ?? e;
}
function Wu(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Qr(e) {
  if (!e) return;
  const t = Da(e, Nt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Gu({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, r = a.presets ?? Bu, [o, s] = rt(!1), l = typeof e == "string", [c, u] = Wu(e), d = Qr(c), h = Qr(u), p = d ? { from: d, to: h } : void 0;
  let b;
  l ? b = Yr(e) : d && h ? b = `${de(d, "MMM d, yyyy")} – ${de(h, "MMM d, yyyy")}` : d ? b = de(d, "MMM d, yyyy") : b = "Pick a date range";
  const y = a.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ f(Re, { open: o, onOpenChange: s, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(
      W,
      {
        variant: "outline",
        className: w(
          "w-full justify-start text-left font-normal",
          b === "Pick a date range" && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(ka, { className: "mr-2 size-4" }),
          b
        ]
      }
    ) }),
    /* @__PURE__ */ f(Me, { className: "flex w-auto gap-2 p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "flex max-h-80 flex-col gap-1 overflow-y-auto border-r pr-2", children: r.map((g) => /* @__PURE__ */ i(
        W,
        {
          variant: "ghost",
          size: "sm",
          className: "justify-start whitespace-nowrap font-normal",
          onClick: () => {
            t(g), s(!1);
          },
          children: Yr(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        lo,
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
const Uu = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Yu(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Qu(e) {
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
function Ju({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { resolveValue: r } = oo(), o = a.rangeVariable ? Qu(r(a.rangeVariable)) : void 0, s = a.options ?? (o !== void 0 ? Yu(o) : Uu), l = typeof e == "string" ? e : "", c = s.join(",");
  return zt(() => {
    l && !s.includes(l) && t(s[0]);
  }, [l, c]), /* @__PURE__ */ f(
    we,
    {
      value: l,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Se, { className: ot, children: /* @__PURE__ */ i(Ce, { placeholder: "—" }) }),
        /* @__PURE__ */ i(_e, { children: s.map((u) => /* @__PURE__ */ i(pe, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Xu({ value: e, onChange: t, control: n }) {
  const a = n;
  if (a.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((s) => String(s))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: w(ot, "h-auto min-h-[6rem]"),
        value: [...o],
        onChange: (s) => {
          const l = Array.from(s.target.selectedOptions, (u) => u.value), c = a.options.every((u) => typeof u.value == "number");
          t(c ? l.map((u) => Number(u)) : l);
        },
        children: a.options.map((s) => /* @__PURE__ */ i("option", { value: String(s.value), children: s.label }, String(s.value)))
      }
    );
  }
  const r = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ f(
    we,
    {
      value: r,
      onValueChange: (o) => {
        const s = a.options.find((l) => String(l.value) === o);
        t(s ? s.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(Se, { className: ot, children: /* @__PURE__ */ i(Ce, { placeholder: "—" }) }),
        /* @__PURE__ */ i(_e, { children: a.options.map((o) => /* @__PURE__ */ i(pe, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function Zu({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { meta: r, isLoading: o } = Be(), s = Z(() => {
    if (!r) return [];
    const l = [];
    for (const c of r.cubes)
      if (!(a.cube && c.name !== a.cube)) {
        if (a.from === "measure" || a.from === "dimensionOrMeasure")
          for (const u of c.measures) l.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (a.from === "dimension" || a.from === "dimensionOrMeasure")
          for (const u of c.dimensions) l.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return l;
  }, [r, a.cube, a.from]);
  return /* @__PURE__ */ f(
    "select",
    {
      className: ot,
      value: typeof e == "string" ? e : "",
      disabled: o,
      onChange: (l) => t(l.target.value || void 0),
      children: [
        /* @__PURE__ */ i("option", { value: "", children: o ? "Loading…" : "—" }),
        s.map((l) => /* @__PURE__ */ i("option", { value: l.name, children: l.label }, l.name))
      ]
    }
  );
}
function em({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: ot,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (r) => t(r.target.value)
    }
  );
}
function tm({ value: e, onChange: t, control: n }) {
  const a = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: ot,
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
function nm({ value: e, onChange: t, decl: n }) {
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
const rm = {
  dateRange: Gu,
  granularity: Ju,
  select: Xu,
  memberSelect: Zu,
  text: em,
  number: tm,
  toggle: nm
};
function am({ control: e, title: t }) {
  var b;
  const { registry: n } = Ke(), { decls: a, resolveValue: r, setVar: o } = oo(), s = Z(
    () => a.find((y) => y.name === e.variable),
    [a, e.variable]
  );
  if (!s)
    return /* @__PURE__ */ f("div", { className: "text-sm text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, c = ((b = n.controls) == null ? void 0 : b[l]) ?? rm[l], u = r(e.variable), d = (y) => o(e.variable, y), h = t ?? s.label ?? s.name, p = Qo();
  return l === "toggle" ? /* @__PURE__ */ i(c, { value: u, onChange: d, decl: s, control: e.control }) : /* @__PURE__ */ f("div", { children: [
    /* @__PURE__ */ i("label", { className: Ku, htmlFor: p, children: h }),
    /* @__PURE__ */ i(
      c,
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
const co = x.forwardRef(
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
co.displayName = "Card";
const uo = x.forwardRef(
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
uo.displayName = "CardHeader";
const mo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: w("font-semibold leading-none tracking-tight", e),
      ...t
    }
  )
);
mo.displayName = "CardTitle";
const om = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: w("text-sm text-muted-foreground", e), ...t })
);
om.displayName = "CardDescription";
const im = x.forwardRef(
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
im.displayName = "CardAction";
const fo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: w("px-6 pb-6", e), ...t })
);
fo.displayName = "CardContent";
const sm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: w("flex items-center px-6 pb-6", e), ...t })
);
sm.displayName = "CardFooter";
const Xt = "cube-viz-drag-handle";
function ho(e) {
  var l;
  const { registry: t } = Ke(), n = (l = t.chrome) == null ? void 0 : l.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: a, menu: r, dragHandleProps: o, children: s } = e;
  return /* @__PURE__ */ f(co, { className: "flex h-full w-full flex-col gap-0 overflow-hidden rounded-xl border-0 bg-muted/40 shadow-none", children: [
    a ? /* @__PURE__ */ f(
      uo,
      {
        ...o,
        className: w(
          Xt,
          "flex shrink-0 cursor-grab flex-row items-center justify-between gap-2",
          "px-4 pb-1 pt-3 active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(mo, { className: "truncate text-sm font-semibold", children: a }),
          r
        ]
      }
    ) : null,
    /* @__PURE__ */ i(fo, { className: "min-h-0 flex-1 overflow-auto px-4 pb-4 pt-1", children: s })
  ] });
}
function lm(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const s = o == null ? "" : String(o);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }, a = t.map(n).join(","), r = e.map((o) => t.map((s) => n(o[s])).join(",")).join(`
`);
  return `${a}
${r}`;
}
function cm(e, t, n = "text/csv;charset=utf-8") {
  const a = new Blob([e], { type: n }), r = URL.createObjectURL(a), o = document.createElement("a");
  o.href = r, o.download = t, o.click(), URL.revokeObjectURL(r);
}
function um({ title: e, rows: t, refetch: n }) {
  const a = t.length > 0;
  if (!a && !n) return null;
  const r = () => {
    const s = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    cm(lm(t), `${s}.csv`);
  }, o = (s) => s.stopPropagation();
  return /* @__PURE__ */ f(Re, { children: [
    /* @__PURE__ */ i(
      Ae,
      {
        onMouseDown: o,
        onPointerDown: o,
        onTouchStart: o,
        className: "rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(ni, { className: "size-4" })
      }
    ),
    /* @__PURE__ */ f(Me, { align: "end", className: "w-44 p-1", onMouseDown: o, onPointerDown: o, onTouchStart: o, children: [
      n ? /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          onClick: n,
          className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
          children: [
            /* @__PURE__ */ i(ri, { className: "size-3.5 text-muted-foreground" }),
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
            /* @__PURE__ */ i(ai, { className: "size-3.5 text-muted-foreground" }),
            "Export CSV"
          ]
        }
      )
    ] })
  ] });
}
function Jr({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(pr, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(ju, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(am, { control: e.control, title: e.title });
  }
}
function po({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [a, r] = rt({ rows: [] }), o = Ee(
    (l) => r({ rows: l.rows, refetch: l.refetch }),
    []
  );
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "h-full w-full overflow-auto p-2", children: /* @__PURE__ */ i(Jr, { widget: e }) });
  const s = n ? null : /* @__PURE__ */ i(um, { title: e.title, rows: a.rows, refetch: a.refetch });
  return /* @__PURE__ */ i(
    ho,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i(Jr, { widget: e, onState: o })
    }
  );
}
const mm = "lg";
function dm(e) {
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
function fm(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function th({ spec: e, editable: t = !1 }) {
  const [n, a] = io(), r = e.grid ?? {}, o = r.cols ?? 12, s = r.rowHeight ?? 40, l = r.margin ?? [12, 12], c = r.containerPadding ?? [0, 0], { breakpoints: u, cols: d } = Z(
    () => dm(o),
    [o]
  ), h = Z(
    () => ({ [mm]: fm(e.layout) }),
    [e.layout]
  ), p = Z(
    () => new Map(e.widgets.map((b) => [b.id, b])),
    [e.widgets]
  );
  return /* @__PURE__ */ i(fr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "w-full", children: a > 0 ? /* @__PURE__ */ i(
    La,
    {
      width: a,
      layouts: h,
      breakpoints: u,
      cols: d,
      rowHeight: s,
      margin: l,
      containerPadding: c,
      dragConfig: { enabled: t, handle: `.${Xt}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((b) => {
        const y = p.get(b.i);
        return y ? /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(po, { widget: y, editable: t }) }, b.i) : null;
      })
    }
  ) : null }) });
}
function nh({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(
    ho,
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
      children: /* @__PURE__ */ i($u, { spec: e })
    }
  ) });
}
function mn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Ue(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function dn(e) {
  return e ? e.cubes.filter((t) => Ue(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: mn(t)
  })) : [];
}
function Rt(e, t) {
  if (!(!e || !t))
    return dn(e).find((n) => n.name === t);
}
function gr(e) {
  return e.shortTitle || e.title || e.name;
}
function Zt(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function go(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: gr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Zt(n, "quantity"),
    unit: Zt(n, "unit")
  };
}
function Vn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: gr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: Zt(n, "quantity"),
    unit: Zt(n, "unit")
  };
}
function bo(e, t) {
  return {
    name: e.name,
    label: gr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function qn(e, t, n) {
  if (!e) return [];
  const a = [];
  for (const r of e.cubes) {
    if (!Ue(r) || n && r.name !== n) continue;
    const o = mn(r), s = (l) => {
      l.connectedComponent = o, a.push(l);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const l of r.measures)
        Ue(l) && s(go(l, r.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const l of r.dimensions)
        Ue(l) && l.type !== "time" && s(Vn(l, r.name));
    if (t === "time")
      for (const l of r.dimensions)
        Ue(l) && l.type === "time" && s(Vn(l, r.name));
  }
  return a;
}
function hm(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, a = [];
  for (const r of e.cubes) {
    if (!Ue(r) || n && !n.has(r.name)) continue;
    const o = mn(r);
    for (const s of r.segments) {
      if (!Ue(s)) continue;
      const l = bo(s, r.name);
      l.connectedComponent = o, a.push(l);
    }
  }
  return a;
}
function Oe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const a = mn(n), r = (l) => (l && (l.connectedComponent = a), l), o = n.measures.find((l) => l.name === t) ?? n.dimensions.find((l) => l.name === t);
      if (o)
        return o.type ? "aggType" in o ? r(go(o, n.name)) : r(Vn(o, n.name)) : void 0;
      const s = n.segments.find((l) => l.name === t);
      if (s) return r(bo(s, n.name));
    }
}
function pm(e) {
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
const Kn = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), yo = {
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
function vo(e) {
  var s, l, c, u, d;
  const t = e.query, n = (s = t.measures) == null ? void 0 : s.find(Boolean);
  if (n) return wt(n);
  const a = (l = t.dimensions) == null ? void 0 : l.find(Boolean);
  if (a) return wt(a);
  const r = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (r) return wt(r);
  const o = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return wt(o);
}
function it(e) {
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
function xo(e, t) {
  const n = {};
  for (const r of e) {
    const o = t[r];
    o && Object.keys(o).length > 0 && (n[r] = o);
  }
  const a = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (a.meta = n), a;
}
const ko = {
  bar: "Bar",
  line: "Line",
  area: "Area",
  pie: "Pie",
  scatter: "Scatter",
  kpi: "KPI",
  table: "Table",
  combo: "Combo"
}, gm = "day";
function bm(e, t) {
  var u, d, h, p;
  const { query: n, chart: a } = e, r = it(a).length ? it(a) : n.measures ?? [], o = ye(a) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((h = (d = n.timeDimensions) == null ? void 0 : d[0]) == null ? void 0 : h.dimension), s = o ? { category: { member: o }, series: { mode: "measures", members: r } } : void 0, l = {
    ...e,
    chart: { ...a, family: t, mapping: void 0, familyOptions: void 0 }
  }, c = (b) => ({
    ...l,
    chart: { ...l.chart, ...b }
  });
  switch (t) {
    case "bar":
    case "line":
    case "area":
    case "pie":
      return c({ mapping: s });
    case "combo":
      return c({
        mapping: s,
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
  return wc(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Bn(e) {
  return Sc(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
const Xr = "a date or category";
function ym(e) {
  switch (e) {
    case "bar":
    case "line":
    case "area":
      return [
        { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
        { id: "x", label: "Category", hint: Xr, cardinality: "one", kinds: ["time", "category"] },
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
        { id: "x", label: "Category", hint: Xr, cardinality: "one", kinds: ["time", "category"] },
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
function fn(e) {
  const t = xe(e).series;
  return Array.isArray(t) ? t : [];
}
function br(e) {
  const t = xe(e).columns;
  return Array.isArray(t) ? t : [];
}
function vm(e) {
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
      const o = vm(e), s = (r = t.mapping) == null ? void 0 : r.series;
      return { y: s && s.mode === "pivot" ? s.values && s.values.length > 0 ? s.values : a(s.value) : it(t), x: a(ye(t)), color: a(o) };
    }
    case "combo":
      return {
        x: a(ye(t)),
        y: fn(e).map((o) => o.member)
      };
    case "pie":
      return { slices: a(ye(t)), size: a(it(t)[0]) };
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
      return { columns: br(e).map((o) => o.member) };
  }
}
function hn(e) {
  const t = xm(e);
  return t === void 0 ? gm : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function xm(e) {
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
function ze(e, t) {
  const n = Qe(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Fe(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function Je(e, t, n) {
  if (e)
    return { category: { member: e }, series: xo(t, n) };
}
function en(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function tn(e, t, n, a) {
  if (!e || t.length === 0) return;
  const r = {};
  for (const l of t) {
    const c = a == null ? void 0 : a[l];
    c && Object.keys(c).length > 0 && (r[l] = c);
  }
  const o = Object.keys(r).length > 0, s = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: r } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: r } : {} };
  return { category: { member: e }, series: s };
}
function Zr(e, t, n, a, r) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Nm(e, n, a, r);
    case "combo":
      return Sm(e, n, a, r);
    case "pie":
      return Am(e, n, a, r);
    case "scatter":
      return Om(e, n, a);
    case "kpi":
      return Lm(e, a);
    case "table":
      return Tm(e, a, r);
  }
}
function km(e, t, n, a) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Cm(e, n, a);
    case "combo":
      return Rm(e, n, a);
    case "pie":
      return Mm(e, n, a);
    case "scatter":
      return Dm(e, n, a);
    case "kpi":
      return zm(e, a);
    case "table":
      return Fm(e, a);
  }
}
function Nm(e, t, n, a) {
  const { query: r, chart: o } = e, s = Pt(e), l = s.color[0], c = ye(o), u = pt(o);
  if (t === "y") {
    const d = s.y, h = jt(d, n);
    return l ? {
      ...e,
      query: { ...r, measures: h },
      chart: { ...o, mapping: tn(c, h, l, en(o)) }
    } : {
      ...e,
      query: { ...r, measures: h },
      chart: { ...o, mapping: Je(c, h, u) }
    };
  }
  if (t === "x")
    return wm(e, n, a, l);
  if (t === "color") {
    const d = s.y;
    if (d.length === 0) return e;
    const h = gt({ ...r, measures: d }, n);
    return {
      ...e,
      query: h,
      chart: { ...o, mapping: tn(c, d, n, en(o)) }
    };
  }
  return e;
}
function wm(e, t, n, a) {
  const { query: r, chart: o } = e, s = ye(o), l = Pt(e).y, c = pt(o);
  let u = r;
  const d = He(r);
  if (d && s === d.dimension ? u = Fe(u, void 0) : s && (u = ze(u, s)), n === "time") {
    const p = (d == null ? void 0 : d.granularity) ?? hn(d == null ? void 0 : d.dateRange);
    u = Fe(u, {
      dimension: t,
      granularity: p,
      dateRange: d == null ? void 0 : d.dateRange
    });
  } else
    u = gt(u, t);
  const h = a ? tn(t, l, a, en(o)) : Je(t, l, c);
  return { ...e, query: u, chart: { ...o, mapping: h } };
}
function Cm(e, t, n) {
  const { query: a, chart: r } = e, o = Pt(e), s = ye(r), l = o.color[0], c = pt(r);
  if (t === "y") {
    const u = Qe(o.y, n);
    if (l && u.length >= 1)
      return {
        ...e,
        query: { ...a, measures: u },
        chart: { ...r, mapping: tn(s, u, l, en(r)) }
      };
    const d = l ? ze({ ...a, measures: u }, l) : { ...a, measures: u };
    return { ...e, query: d, chart: { ...r, mapping: Je(s, u, c) } };
  }
  if (t === "x") {
    let u = a;
    const d = He(a);
    return d && d.dimension === n ? u = Fe(u, void 0) : u = ze(u, n), { ...e, query: u, chart: { ...r, mapping: void 0 } };
  }
  if (t === "color") {
    const u = ze(a, n);
    return {
      ...e,
      query: u,
      chart: { ...r, mapping: Je(s, o.y, c) }
    };
  }
  return e;
}
const ea = ["line", "bar"];
function Sm(e, t, n, a) {
  const { query: r, chart: o } = e, s = xe(e);
  if (t === "x") {
    let l = r;
    const c = ye(o), u = He(r);
    if (u && c === u.dimension ? l = Fe(l, void 0) : c && (l = ze(l, c)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? hn(u == null ? void 0 : u.dateRange);
      l = Fe(l, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      l = gt(l, n);
    return { ...e, query: l, chart: { ...o, mapping: { category: { member: n }, series: _m(e) } } };
  }
  if (t === "y") {
    const l = fn(e);
    if (l.some((d) => d.member === n)) return e;
    const c = ea[l.length % ea.length], u = [...l, { member: n, render: c }];
    return {
      ...e,
      query: { ...r, measures: jt(r.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...s, series: u }, mapping: No(o, u) }
    };
  }
  return e;
}
function No(e, t) {
  const n = ye(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((a) => a.member) } } : e.mapping;
}
function _m(e) {
  return { mode: "measures", members: fn(e).map((t) => t.member) };
}
function Rm(e, t, n) {
  const { query: a, chart: r } = e, o = xe(e);
  if (t === "x") {
    let s = a;
    const l = He(a);
    return l && l.dimension === n ? s = Fe(s, void 0) : s = ze(s, n), { ...e, query: s, chart: { ...r, mapping: void 0 } };
  }
  if (t === "y") {
    const s = fn(e).filter((c) => c.member !== n), l = Qe(a.measures, n);
    return {
      ...e,
      query: { ...a, measures: l },
      chart: { ...r, familyOptions: { ...o, series: s }, mapping: No(r, s) }
    };
  }
  return e;
}
function Am(e, t, n, a) {
  const { query: r, chart: o } = e, s = pt(o);
  if (t === "slices") {
    let l = r;
    const c = ye(o), u = He(r);
    if (u && c === u.dimension ? l = Fe(l, void 0) : c && (l = ze(l, c)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? hn(u == null ? void 0 : u.dateRange);
      l = Fe(l, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      l = gt(l, n);
    return {
      ...e,
      query: l,
      chart: { ...o, mapping: Je(n, it(o), s) }
    };
  }
  if (t === "size") {
    const l = [n];
    return {
      ...e,
      query: { ...r, measures: l },
      chart: { ...o, mapping: Je(ye(o), l, s) }
    };
  }
  return e;
}
function Mm(e, t, n) {
  const { query: a, chart: r } = e, o = pt(r);
  if (t === "slices") {
    let s = a;
    const l = He(a);
    return l && l.dimension === n ? s = Fe(s, void 0) : s = ze(s, n), { ...e, query: s, chart: { ...r, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...a, measures: [] },
    chart: { ...r, mapping: Je(ye(r), [], o) }
  } : e;
}
const wo = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function Om(e, t, n) {
  const a = wo[t];
  if (!a) return e;
  const { query: r, chart: o } = e, s = { ...xe(e) }, l = s[a];
  s[a] = n;
  let c = r;
  if (a === "groupBy")
    l && l !== n && (c = ze(c, l)), c = gt(c, n);
  else {
    const u = l ? Qe(r.measures, l) : r.measures;
    c = { ...r, measures: jt(u, n) };
  }
  return { ...e, query: c, chart: { ...o, familyOptions: s } };
}
function Dm(e, t, n) {
  const a = wo[t];
  if (!a) return e;
  const { query: r, chart: o } = e, s = { ...xe(e) };
  delete s[a];
  let l = r;
  if (a === "groupBy") l = ze(l, n);
  else {
    const c = Qe(r.measures, n);
    l = { ...r, measures: c.length ? c : [] };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: s } };
}
function Lm(e, t) {
  const { query: n, chart: a } = e, r = { ...xe(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...a, familyOptions: r } };
}
function zm(e, t) {
  const { query: n, chart: a } = e, r = { ...xe(e) };
  return r.measure === t && delete r.measure, { ...e, query: { ...n, measures: [] }, chart: { ...a, familyOptions: r } };
}
function Tm(e, t, n) {
  const { query: a, chart: r } = e, o = br(e);
  if (o.some((c) => c.member === t)) return e;
  let s = a;
  if (n === "number") s = { ...a, measures: jt(a.measures, t) };
  else if (n === "time") {
    const c = He(a), u = (c == null ? void 0 : c.granularity) ?? hn(c == null ? void 0 : c.dateRange), d = a.timeDimensions ?? [];
    d.some((h) => h.dimension === t) || (s = { ...a, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else s = gt(a, t);
  const l = { ...xe(e), columns: [...o, { member: t }] };
  return { ...e, query: s, chart: { ...r, familyOptions: l } };
}
function Fm(e, t) {
  var d, h, p;
  const { query: n, chart: a } = e, r = br(e).filter((b) => b.member !== t);
  let o = n;
  const s = Qe(n.measures, t);
  s.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: s.length ? s : void 0 });
  const l = Qe(n.dimensions, t);
  l.length !== (((h = n.dimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, dimensions: l.length ? l : void 0 });
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
function nn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(wa, { className: "size-3.5 shrink-0 text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(Na, { className: "size-3.5 shrink-0 text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(Zn, { className: "size-3.5 shrink-0 text-muted-foreground" });
  }
}
function Co({
  cube: e,
  cubes: t,
  kind: n,
  value: a,
  onChange: r,
  placeholder: o = "Select member…",
  disabled: s,
  id: l,
  className: c
}) {
  const { meta: u, isLoading: d } = Be(), h = x.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return qn(u, n).filter((g) => y.has(g.cube));
    }
    return qn(u, n, e);
  }, [u, n, e, t]), p = x.useMemo(() => $m(h), [h]), b = h.find((y) => y.name === a);
  return /* @__PURE__ */ f(we, { value: a, onValueChange: r, disabled: s || d, children: [
    /* @__PURE__ */ i(Se, { id: l, className: c, children: /* @__PURE__ */ i(Ce, { placeholder: d ? "Loading…" : o, children: b ? /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
      nn(b.type),
      /* @__PURE__ */ i("span", { className: "truncate", children: b.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(_e, { children: p.map(([y, g]) => /* @__PURE__ */ f(En, { children: [
      p.length > 1 ? /* @__PURE__ */ i(In, { children: y }) : null,
      g.map((v) => /* @__PURE__ */ i(pe, { value: v.name, children: /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
        nn(v.type),
        /* @__PURE__ */ i("span", { className: "truncate", children: v.label })
      ] }) }, v.name))
    ] }, y)) })
  ] });
}
function $m(e) {
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
  "aria-label": s,
  className: l
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "segmented-control",
      role: "radiogroup",
      "aria-label": s,
      className: w(
        "flex flex-wrap gap-1 rounded-lg bg-muted p-1 text-muted-foreground",
        l
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
const Pm = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(Na, { className: "size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(Zn, { className: "size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(wa, { className: "size-3" }), metaKind: "time" }
}, jm = ["number", "category", "time"];
function So({
  well: e,
  placed: t,
  scope: n,
  blockReason: a,
  onSelect: r,
  align: o = "start",
  side: s = "bottom",
  children: l
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
    const L = [];
    n.sourceCube && L.push({ cube: n.sourceCube, tag: "source" });
    for (const A of n.relatedCubes) L.push({ cube: A, tag: "related" });
    return L;
  }, [y, n, c]), C = e.kinds.length > 1, k = (L) => jm.filter((A) => e.kinds.includes(A)).map((A) => {
    const Y = Pm[A], G = qn(c, Y.metaKind, L).filter((P) => !_.has(P.name)).filter((P) => N ? P.label.toLowerCase().includes(N) || P.name.toLowerCase().includes(N) : !0);
    return { kind: A, label: Y.label, icon: Y.icon, items: G };
  }).filter((A) => A.items.length > 0), D = R.map((L) => ({ section: L, groups: k(L.cube.name) })).filter((L) => L.groups.length > 0), z = D.length > 0, V = (L, A) => {
    r(L, A), h(!1), b("");
  }, K = y === "tables" ? "All related tables" : ((I = n.views.find((L) => L.name === y)) == null ? void 0 : I.title) ?? ((B = Rt(c, y)) == null ? void 0 : B.title) ?? y;
  return /* @__PURE__ */ f(Re, { open: d, onOpenChange: h, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: l }),
    /* @__PURE__ */ f(Me, { align: o, side: s, className: "w-80 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2 pb-1.5", children: [
        /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input bg-background px-2", children: [
          /* @__PURE__ */ i(oi, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: p,
              onChange: (L) => b(L.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(Em, { browse: y, label: K, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "max-h-80 overflow-y-auto", children: z ? D.map(({ section: L, groups: A }, Y) => {
        const G = A.reduce((T, Q) => T + Q.items.length, 0), P = L.tag === "related", U = v[L.cube.name] ?? P, E = N.length > 0 ? !0 : !U;
        return /* @__PURE__ */ f("div", { children: [
          L.tag === "related" && Y > 0 && D[Y - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "px-1 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => S((T) => ({ ...T, [L.cube.name]: !U })),
              className: "flex w-full items-center gap-1.5 rounded-sm px-1 py-1 text-left hover:bg-accent/50",
              children: [
                E ? /* @__PURE__ */ i(lt, { className: "size-3 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ i(rn, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i(Ca, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "truncate text-xs font-medium", children: L.cube.title }),
                L.tag === "source" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-primary/10 px-1 py-px text-[9px] font-medium uppercase text-primary", children: "Main table" }) : L.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-muted px-1 py-px text-[9px] font-medium uppercase text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "ml-auto shrink-0 pr-1 text-[10px] tabular-nums text-muted-foreground/70", children: G })
              ]
            }
          ),
          E ? A.map((T) => /* @__PURE__ */ f("div", { className: "pb-0.5 pl-4", children: [
            C ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 px-2 pb-0.5 pt-1 text-[9px] uppercase tracking-wide text-muted-foreground/70", children: [
              T.icon,
              T.label
            ] }) : null,
            T.items.map((Q) => /* @__PURE__ */ i(Im, { option: Q, reason: a(Q), onPick: () => V(Q.name, T.kind) }, Q.name))
          ] }, T.kind)) : null
        ] }, L.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "px-1 py-6 text-center text-xs text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Em({ browse: e, label: t, views: n, onBrowse: a }) {
  const [r, o] = x.useState(!1), s = (l) => {
    a(l), o(!1);
  };
  return /* @__PURE__ */ f(Re, { open: r, onOpenChange: o, children: [
    /* @__PURE__ */ f(
      Ae,
      {
        className: "flex h-8 max-w-[9rem] shrink-0 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(Sa, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ f(Me, { align: "end", className: "w-60 p-1", children: [
      /* @__PURE__ */ i(ta, { active: e === "tables", icon: /* @__PURE__ */ i(Ca, { className: "size-3.5" }), onClick: () => s("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ i("div", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Saved datasets" }),
        n.map((l) => /* @__PURE__ */ i(
          ta,
          {
            active: e === l.name,
            icon: /* @__PURE__ */ i(er, { className: "size-3.5" }),
            onClick: () => s(l.name),
            children: l.title
          },
          l.name
        ))
      ] }) : null
    ] })
  ] });
}
function ta({
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
        e ? /* @__PURE__ */ i(Ie, { className: "size-3.5 shrink-0" }) : null
      ]
    }
  );
}
function Im({ option: e, reason: t, onPick: n }) {
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
const Vm = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Ct = "yyyy-MM-dd";
function qm(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function na(e) {
  if (!e) return;
  const t = Da(e, Ct, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function yr({ value: e, onChange: t }) {
  const [n, a] = x.useState(!1), r = typeof e == "string", [o, s] = qm(e), l = na(o), c = na(s), u = l ? { from: l, to: c } : void 0, d = r ? e : l && c ? `${de(l, "MMM d, yyyy")} – ${de(c, "MMM d, yyyy")}` : l ? de(l, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ f(Re, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", size: "sm", className: w("h-8 w-full justify-start gap-1.5 font-normal"), children: [
      /* @__PURE__ */ i(ka, { className: "size-3.5 text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: w("min-w-0 flex-1 truncate text-left", d === "Any time" && "text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ f(Me, { align: "start", className: "flex w-auto gap-2 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex w-32 flex-col gap-0.5 border-r pr-2", children: [
        Vm.map((h) => /* @__PURE__ */ i(
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
        lo,
        {
          mode: "range",
          selected: u,
          defaultMonth: l,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([de(h.from, Ct), de(h.to, Ct)]) : h != null && h.from ? t([de(h.from, Ct), de(h.from, Ct)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Km(e) {
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
function Bm(e, t) {
  const n = new Set(Km(t));
  return e.filter((a) => n.has(a.type));
}
function Hm(e) {
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
function Wm(e, t, n) {
  const a = new Set(n.map((l) => l.name)), r = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = r, s = 2;
  for (; a.has(o); ) o = `${r}_${s++}`;
  return o;
}
function Gm(e, t, n) {
  const a = Hm(e), r = { name: Wm(t, e, n), type: a }, o = t.trim();
  return o && (r.label = o), a === "dateRange" ? r.default = "last 7 days" : a === "granularity" && (r.default = "day"), r;
}
const _o = x.createContext({});
function Um({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(_o.Provider, { value: n, children: t });
}
function Ym() {
  return x.useContext(_o);
}
function Qm({ kind: e, value: t, onChange: n, className: a }) {
  const r = hr(), o = (r == null ? void 0 : r.decls) ?? [], { createVariable: s } = Ym(), [l, c] = x.useState(!1), [u, d] = x.useState(!1), [h, p] = x.useState(""), b = x.useMemo(() => Bm(o, e), [o, e]), y = b.find((S) => S.name === t), g = (S) => {
    n(S), c(!1), d(!1);
  }, v = () => {
    if (!s) return;
    const S = Gm(e, h || "Variable", o);
    s(S), g(S.name), p("");
  };
  return /* @__PURE__ */ f(
    Re,
    {
      open: l,
      onOpenChange: (S) => {
        c(S), S || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", size: "sm", className: w("h-8 w-full justify-start gap-1.5", a), children: [
          /* @__PURE__ */ i(ii, { className: "size-3.5 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: w("min-w-0 flex-1 truncate text-left", !y && "text-muted-foreground"), children: y ? y.label ?? y.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ f(Me, { align: "start", className: "w-60 p-1", children: [
          b.length > 0 ? b.map((S) => /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => g(S.name),
              className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: S.label ?? S.name }),
                /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: S.type }),
                S.name === t ? /* @__PURE__ */ i(Ie, { className: "size-3.5 shrink-0" }) : null
              ]
            },
            S.name
          )) : /* @__PURE__ */ i("p", { className: "px-2 py-1.5 text-xs text-muted-foreground", children: "No matching variables yet." }),
          s ? /* @__PURE__ */ i("div", { className: "mt-1 border-t border-border pt-1", children: u ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1 p-1", children: [
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
function st({ kind: e, value: t, onChange: n, renderFixed: a }) {
  const r = Ne(t), [o, s] = x.useState(r ? "var" : "fixed");
  x.useEffect(() => {
    r && s("var");
  }, [r]);
  const l = (c) => w(
    "flex-1 rounded-sm px-2 py-1 text-center transition-colors",
    c ? "bg-background font-medium shadow-sm" : "text-muted-foreground hover:text-foreground"
  );
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ f("div", { className: "flex rounded-md bg-muted p-0.5 text-[11px]", children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          className: l(o === "fixed"),
          onClick: () => {
            s("fixed"), Ne(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: l(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      Qm,
      {
        kind: e,
        value: Ne(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : a(Ne(t) ? void 0 : t, (c) => n(c))
  ] });
}
const Jm = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function An(e) {
  return "member" in e && "operator" in e;
}
function Xm({
  cube: e,
  cubes: t,
  scope: n,
  value: a,
  onChange: r,
  disabled: o,
  className: s
}) {
  var K;
  const { meta: l } = Be(), c = ((K = hr()) == null ? void 0 : K.decls) ?? [], [u, d] = x.useState(null), [h, p] = x.useState(null), b = a ?? [], y = b.length === 1 && !An(b[0]) && "or" in b[0] && Array.isArray(b[0].or) && b[0].or.every(An) ? b[0] : void 0, g = y ? "any" : "all", v = [], S = [];
  y || b.forEach((I) => An(I) ? v.push(I) : S.push(I));
  const _ = y ? y.or : v, N = S.length === 0 && (_.length >= 2 || g === "any"), R = (I) => g === "any" ? I.length ? [{ or: I }] : [] : [...I, ...S], C = (I) => {
    const B = I.filter((A) => A.member.length > 0), L = R(B);
    r(L.length > 0 ? L : void 0);
  }, k = (I) => {
    const B = I === "any" ? _.length ? [{ or: _ }] : [] : [..._];
    r(B.length > 0 ? B : void 0);
  }, D = (I, B) => C(_.map((L, A) => A === I ? { ...L, ...B } : L)), z = (I) => C(_.filter((B, L) => L !== I)), V = (I) => {
    const L = { ...h ?? { member: "", operator: "equals", values: [] }, ...I };
    L.member ? (p(null), d(_.length), C([..._, L])) : p(L);
  };
  return /* @__PURE__ */ f("div", { "data-slot": "filter-builder", className: w("flex flex-col gap-2", s), children: [
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
      const L = Oe(l, I.member);
      return u === B ? /* @__PURE__ */ i(
        ra,
        {
          leaf: I,
          member: L,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (A) => D(B, A),
          onDone: () => d(null),
          onRemove: () => z(B)
        },
        B
      ) : /* @__PURE__ */ i(
        Zm,
        {
          text: ed(I, L == null ? void 0 : L.label, c),
          disabled: o,
          onEdit: () => d(B),
          onRemove: () => z(B)
        },
        B
      );
    }),
    h ? /* @__PURE__ */ i(
      ra,
      {
        leaf: h,
        member: Oe(l, h.member),
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
function Zm({
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
function ra({
  leaf: e,
  member: t,
  cube: n,
  cubes: a,
  scope: r,
  disabled: o,
  onChange: s,
  onDone: l,
  onRemove: c
}) {
  const u = pm(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], h = !Kn.has(d);
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-2.5 rounded-lg border border-ring/50 bg-muted/30 p-3", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ i("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-0.5", children: [
        l && e.member ? /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", className: "h-7 gap-1 px-2 text-xs", onClick: l, children: [
          /* @__PURE__ */ i(Ie, { className: "size-3.5" }),
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
          So,
          {
            well: Jm,
            placed: [],
            scope: r,
            blockReason: () => {
            },
            onSelect: (p) => s({ member: p }),
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
                    nn(t.type),
                    /* @__PURE__ */ i("span", { className: "truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(lt, { className: "size-4 shrink-0 text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        Co,
        {
          cube: n,
          cubes: a,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: (p) => s({ member: p }),
          placeholder: "Choose a field…",
          disabled: o
        }
      )
    ] }),
    /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ f(
        we,
        {
          value: d,
          onValueChange: (p) => s({
            operator: p,
            values: Kn.has(p) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Se, { className: "w-full", children: /* @__PURE__ */ i(Ce, {}) }),
            /* @__PURE__ */ i(_e, { children: u.map((p) => /* @__PURE__ */ i(pe, { value: p, children: yo[p] }, p)) })
          ]
        }
      )
    ] }),
    h ? /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        td,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (p) => s({ values: p })
        }
      )
    ] }) : null
  ] });
}
function ed(e, t, n) {
  const a = t ?? e.member;
  if (!a) return "New filter";
  const r = yo[e.operator] ?? e.operator;
  if (Kn.has(e.operator)) return `${a} ${r}`;
  const o = (e.values ?? []).map((s) => {
    if (Ne(s)) {
      const l = n.find((c) => c.name === s.var);
      return `{${((l == null ? void 0 : l.label) ?? s.var).replace(/[{}]/g, "")}}`;
    }
    return String(s);
  });
  return o.length > 0 ? `${a} ${r} ${o.join(", ")}` : `${a} ${r} …`;
}
function td({ values: e, memberType: t, onChange: n }) {
  const a = e ?? [], r = a.length === 1 && Ne(a[0]);
  if (t === "time") {
    const l = r ? a[0] : nd(a);
    return /* @__PURE__ */ i(
      st,
      {
        kind: "dateRange",
        value: l,
        onChange: (c) => n(c === void 0 ? [] : Ne(c) ? [c] : rd(c)),
        renderFixed: (c, u) => /* @__PURE__ */ i(yr, { value: c, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", s = r ? a[0] : a.filter((l) => !Ne(l));
  return /* @__PURE__ */ i(
    st,
    {
      kind: o,
      value: s,
      onChange: (l) => n(l === void 0 ? [] : Ne(l) ? [l] : l),
      renderFixed: (l, c) => /* @__PURE__ */ i(
        me,
        {
          value: (l ?? []).map(String).join(", "),
          onChange: (u) => c(ad(u.target.value)),
          placeholder: "value, value…",
          className: "h-8"
        }
      )
    }
  );
}
function nd(e) {
  const t = e.filter((n) => !Ne(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function rd(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function ad(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function od({ spec: e, update: t, cube: n, scopeCubes: a, scope: r }) {
  const { query: o } = e, s = (o.filters ?? []).length, l = (c) => t({ ...e, query: { ...o, filters: c } });
  return /* @__PURE__ */ f(Re, { children: [
    /* @__PURE__ */ f(
      Ae,
      {
        className: w(
          "flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
          s > 0 ? "text-foreground" : "text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(si, { className: "size-4" }),
          "Filter",
          s > 0 ? /* @__PURE__ */ i("span", { className: "ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground", children: s }) : null
        ]
      }
    ),
    /* @__PURE__ */ f(Me, { align: "end", className: "flex max-h-[72vh] w-96 flex-col gap-2 overflow-y-auto p-3", children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "text-sm font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(id, { spec: e, update: t, scopeCubes: a }),
      /* @__PURE__ */ i(Xm, { cube: n, cubes: a, scope: r, value: o.filters, onChange: l })
    ] })
  ] });
}
function id({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: a } = Be(), r = hm(a, n);
  if (r.length === 0) return null;
  const o = new Set(e.query.segments ?? []), s = (l) => {
    const c = new Set(o);
    c.has(l) ? c.delete(l) : c.add(l);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 border-b border-border pb-2", children: [
    /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5", children: r.map((l) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => s(l.name),
        title: l.description ?? l.name,
        className: w(
          "rounded-full border px-2.5 py-1 text-xs transition-colors",
          o.has(l.name) ? "border-ring bg-accent text-foreground" : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        ),
        children: l.label
      },
      l.name
    )) })
  ] });
}
function sd({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: a } = Be(), r = x.useMemo(() => dn(a), [a]), o = r.filter((v) => v.type === "view"), s = r.filter((v) => v.type === "cube"), l = r.find((v) => v.name === e), [c, u] = x.useState(!1), [d, h] = x.useState(null), p = (v) => {
    if (v === e) {
      u(!1);
      return;
    }
    t ? h(v) : (n(v), u(!1));
  }, b = () => {
    d && n(d), h(null), u(!1);
  }, y = d ? ((g = r.find((v) => v.name === d)) == null ? void 0 : g.title) ?? d : "";
  return /* @__PURE__ */ f(
    Re,
    {
      open: c,
      onOpenChange: (v) => {
        u(v), v || h(null);
      },
      children: [
        /* @__PURE__ */ f(
          Ae,
          {
            className: "flex h-8 max-w-[12rem] items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(Sa, { className: "size-3.5 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: w("truncate", !l && "text-muted-foreground"), children: l ? l.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Me, { align: "start", className: "w-64 p-1", children: d ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-2 p-2", children: [
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
              aa,
              {
                icon: /* @__PURE__ */ i(er, { className: "size-3.5" }),
                label: v.title,
                active: v.name === e,
                onClick: () => p(v.name)
              },
              v.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Tables" }),
          s.map((v) => /* @__PURE__ */ i(
            aa,
            {
              icon: /* @__PURE__ */ i(_a, { className: "size-3.5" }),
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
function aa({
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
        n ? /* @__PURE__ */ i(Ie, { className: "size-3.5 shrink-0" }) : null
      ]
    }
  );
}
function oa(e, t, n, a) {
  var o;
  const r = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...r, ...a } } } });
}
function ia({
  spec: e,
  update: t,
  axis: n,
  title: a,
  auto: r
}) {
  var l;
  const o = ((l = e.chart.axes) == null ? void 0 : l[n]) ?? {}, s = o.labelHide === !0;
  return /* @__PURE__ */ f(
    "div",
    {
      className: w(
        "flex w-full min-w-[8rem] items-center gap-1 rounded-md border border-border bg-background px-1.5 py-1 transition-opacity",
        s && "opacity-50"
      ),
      children: [
        a ? /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: a }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: r ?? "Axis title",
            disabled: s,
            onChange: (c) => oa(e, t, n, { label: c.target.value || void 0 }),
            title: `Axis title${r ? ` — defaults to “${r}”` : ""} (leave blank for the default)`,
            className: "h-6 min-w-0 flex-1 rounded border border-input bg-background px-1.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          cd,
          {
            hidden: s,
            what: "axis title",
            onClick: () => oa(e, t, n, { labelHide: s ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function ld({
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
          n ? /* @__PURE__ */ i(Ra, { className: "size-3.5" }) : /* @__PURE__ */ i(Aa, { className: "size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function cd({
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
      children: e ? /* @__PURE__ */ i(Ra, { className: "size-3.5" }) : /* @__PURE__ */ i(Aa, { className: "size-3.5" })
    }
  );
}
const Ro = x.forwardRef(
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
Ro.displayName = "Label";
function le({
  label: e,
  hint: t,
  error: n,
  htmlFor: a,
  action: r,
  className: o,
  children: s
}) {
  return /* @__PURE__ */ f("div", { "data-slot": "field-row", className: w("flex flex-col gap-1.5 py-1.5", o), children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i(Ro, { htmlFor: a, className: "text-muted-foreground", children: e }),
      r ? /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center", children: r }) : null
    ] }),
    s,
    n ? /* @__PURE__ */ i("p", { className: "text-xs text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: t }) : null
  ] });
}
function Hn({
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
  const s = x.useId();
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "switch-row",
      className: w("flex items-center justify-between gap-3 py-1.5", o),
      children: [
        /* @__PURE__ */ f(
          "label",
          {
            htmlFor: s,
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
        /* @__PURE__ */ i(Hn, { id: s, checked: n, onChange: a, disabled: r })
      ]
    }
  );
}
function ud({ spec: e, update: t }) {
  var p, b;
  const { chart: n } = e, a = n.family, r = n.familyOptions ?? {}, o = (y) => t({ ...e, chart: { ...n, ...y } }), s = (y) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...y } } }), l = ((b = (p = n.mapping) == null ? void 0 : p.series) == null ? void 0 : b.mode) === "pivot" ? "stacked" : "none", c = n.stackMode ?? (a === "area" ? l : Ua[a].envelope.stackMode) ?? "none", d = /* @__PURE__ */ i(le, { label: "Stacked", children: /* @__PURE__ */ i(
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
              onChange: (v) => s({ innerRadiusPct: v ? 55 : 0 })
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
              onChange: (v) => s({ showLabels: v })
            }
          ) }),
          /* @__PURE__ */ i(fd, { label: "Max slices", children: /* @__PURE__ */ i(
            me,
            {
              type: "number",
              min: 1,
              className: "h-8",
              value: r.maxSlices ?? "",
              placeholder: "8",
              onChange: (v) => {
                const S = parseInt(v.target.value, 10);
                s({ maxSlices: Number.isFinite(S) && S > 0 ? S : void 0 });
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
              onChange: (v) => s({ rowHeight: v ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sortable columns",
              checked: r.sortable !== !1,
              onChange: (v) => s({ sortable: v })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sticky header",
              checked: r.stickyHeader !== !1,
              onChange: (v) => s({ stickyHeader: v })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Row numbers",
              checked: r.showRowNumbers === !0,
              onChange: (v) => s({ showRowNumbers: v })
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
const md = /* @__PURE__ */ new Set([
  "bar",
  "area",
  "pie",
  "table"
]);
function dd(e) {
  return md.has(e);
}
function fd({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1 py-1", children: [
    /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: e }),
    t
  ] });
}
const hd = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], Ao = {
  bar: Ma,
  line: hi,
  area: fi,
  pie: di,
  scatter: mi,
  kpi: ui,
  table: ci,
  combo: li
};
function pd({ spec: e, update: t, empty: n }) {
  const a = e.chart.family, r = (s) => {
    s !== a && t(bm(e, s));
  };
  if (n)
    return /* @__PURE__ */ i("div", { className: "pointer-events-none absolute inset-0 grid place-items-center p-4", children: /* @__PURE__ */ f("div", { className: "pointer-events-auto w-full max-w-sm rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur", children: [
      /* @__PURE__ */ i("p", { className: "pb-0.5 text-center text-sm font-medium", children: "Choose a chart type" }),
      /* @__PURE__ */ i("p", { className: "pb-3 text-center text-xs text-muted-foreground", children: "Then add fields to the slots around the chart." }),
      /* @__PURE__ */ i(sa, { family: a, onPick: r })
    ] }) });
  const o = Ao[a];
  return /* @__PURE__ */ i("div", { className: "pointer-events-none absolute inset-x-0 top-2 flex justify-center", children: /* @__PURE__ */ f(Re, { children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "pointer-events-auto flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(o, { className: "size-3.5 text-muted-foreground" }),
          ko[a],
          /* @__PURE__ */ i(lt, { className: "size-3 text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ f(Me, { align: "center", className: "flex max-h-[70vh] w-72 flex-col gap-2.5 overflow-y-auto p-3", children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(sa, { family: a, onPick: r })
      ] }),
      dd(a) ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 border-t border-border pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(ud, { spec: e, update: t })
      ] }) : null
    ] })
  ] }) });
}
function sa({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "grid grid-cols-4 gap-1.5", children: hd.map((n) => {
    const a = Ao[n], r = n === e;
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
          ko[n]
        ]
      },
      n
    );
  }) });
}
function gd(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function bd(e, t, n, a, r) {
  var xr, kr, Nr, wr, Cr, Sr, _r, Rr, Ar, Mr, Or, Dr, Lr, zr;
  const { chart: o, query: s } = e, l = o.family, c = n.kinds.length === 1 ? n.kinds[0] : yd(r), u = o.familyOptions ?? {}, d = Array.isArray(u.series) ? u.series : [], h = Array.isArray(u.columns) ? u.columns : [], p = pt(o), b = p[a], y = l === "combo" && n.id === "y", g = l === "table" && n.id === "columns", v = l === "bar" || l === "line" || l === "area", S = ((kr = (xr = o.mapping) == null ? void 0 : xr.series) == null ? void 0 : kr.mode) === "measures", _ = v && n.id === "y", N = _ && S, R = y ? (Nr = d.find((j) => j.member === a)) == null ? void 0 : Nr.label : g ? (wr = h.find((j) => j.member === a)) == null ? void 0 : wr.label : N ? b == null ? void 0 : b.label : void 0, C = y ? (Cr = d.find((j) => j.member === a)) == null ? void 0 : Cr.colorToken : N ? b == null ? void 0 : b.colorToken : void 0, k = He(s), D = n.kinds.includes("time") && (k == null ? void 0 : k.dimension) === a, z = D ? k == null ? void 0 : k.granularity : void 0, V = D ? k == null ? void 0 : k.dateRange : void 0, K = y ? ((Sr = d.find((j) => j.member === a)) == null ? void 0 : Sr.render) ?? "line" : void 0, I = l === "line" && n.id === "y", B = l === "bar" && n.id === "y" && o.orientation !== "horizontal", L = ((Rr = (_r = o.mapping) == null ? void 0 : _r.series) == null ? void 0 : Rr.mode) === "pivot", A = ((Mr = (Ar = o.mapping) == null ? void 0 : Ar.series) == null ? void 0 : Mr.mode) === "pivot" ? o.mapping.series.meta : void 0, Y = (I || B) && (S || L) || y, G = Y ? (y ? (Or = d.find((j) => j.member === a)) == null ? void 0 : Or.axis : S ? b == null ? void 0 : b.axis : (Dr = A == null ? void 0 : A[a]) == null ? void 0 : Dr.axis) ?? "left" : void 0, E = (l === "line" || l === "area") && n.id === "y" && S || y && (K === "line" || K === "area"), T = y ? d.find((j) => j.member === a) : void 0, Q = E ? y ? T == null ? void 0 : T.curve : b == null ? void 0 : b.curve : void 0, ue = E ? y ? T == null ? void 0 : T.dots : b == null ? void 0 : b.dots : void 0, ce = (j) => {
    var Tr, Fr;
    if ((Tr = o.mapping) != null && Tr.series && o.mapping.series.mode !== "measures") return;
    const ie = ((Fr = o.mapping) != null && Fr.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], se = { ...p };
    j && Object.keys(j).length > 0 ? se[a] = j : delete se[a];
    const yt = ye(o);
    yt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: yt }, series: xo(ie, se) }
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
  }, $e = (j) => {
    if (!k) return;
    const ie = { ...k };
    for (const se of Object.keys(j)) {
      const yt = j[se];
      yt === void 0 ? delete ie[se] : ie[se] = yt;
    }
    t({ ...e, query: { ...s, timeDimensions: [ie] } });
  }, We = (j) => $e({ granularity: j }), Ge = (j) => $e({ dateRange: j }), Et = (j) => H({ render: j }), It = (j) => {
    var ie, se;
    y ? H({ axis: j }) : N ? ce({ ...b, axis: j }) : ((se = (ie = o.mapping) == null ? void 0 : ie.series) == null ? void 0 : se.mode) === "pivot" && t(Wn(e, l, a, j));
  }, Vt = (j) => {
    y ? H({ curve: j }) : N && ce({ ...b, curve: j });
  }, qt = (j) => {
    y ? H({ dots: j }) : N && ce({ ...b, dots: j });
  }, O = () => t(km(e, l, n.id, a)), F = (n.id === "x" || n.id === "slices") && (c === "category" || c === "time"), $ = (Lr = o.mapping) == null ? void 0 : Lr.series, q = ($ && $.mode === "pivot" ? $.value : it(o)[0]) ?? ((zr = s.measures) == null ? void 0 : zr[0]), J = F ? c === "time" ? [
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
    const j = gd(s.order)[0];
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
    t({ ...e, query: { ...s, order: ie } });
  }, oe = typeof s.limit == "number" ? s.limit : void 0, bt = (j) => t({ ...e, query: { ...s, limit: j && j > 0 ? j : void 0 } }), pn = (l === "bar" || l === "line" || l === "area") && D, To = pn && u.comparePrevious === !0;
  return {
    kind: c,
    label: R,
    colorToken: C,
    granularity: z,
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
    canComparePrevious: pn,
    comparePrevious: To,
    comparePreviousReady: pn && V !== void 0,
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
function Wn(e, t, n, a) {
  var s;
  const { chart: r } = e;
  if (t === "combo") {
    const l = r.familyOptions ?? {}, c = (Array.isArray(l.series) ? l.series : []).map(
      (u) => u.member === n ? { ...u, axis: a } : u
    );
    return { ...e, chart: { ...r, familyOptions: { ...l, series: c } } };
  }
  const o = (s = r.mapping) == null ? void 0 : s.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const l = { ...o.meta ?? {} };
    return l[n] = { ...l[n] ?? {}, axis: a }, { ...e, chart: { ...r, mapping: { ...r.mapping, series: { ...o, meta: l } } } };
  }
  return e;
}
function yd(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function la(e, t, n, a) {
  var h;
  const { chart: r, query: o } = e, s = r.family, l = (p) => {
    if (a < 0 || a >= p.length || n === a) return p;
    const b = p.slice(), [y] = b.splice(n, 1);
    return b.splice(a, 0, y), b;
  };
  if (s === "combo" && t.id === "y") {
    const p = r.familyOptions ?? {}, b = l(Array.isArray(p.series) ? p.series : []), y = l(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: y },
      chart: { ...r, familyOptions: { ...p, series: b } }
    };
  }
  if (s === "table" && t.id === "columns") {
    const p = r.familyOptions ?? {}, b = l(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...r, familyOptions: { ...p, columns: b } } };
  }
  const c = l(o.measures ?? []), u = (h = r.mapping) == null ? void 0 : h.series;
  let d = r.mapping;
  if (u && u.mode === "measures")
    d = { ...r.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const p = l(u.values);
    d = { ...r.mapping, series: { ...u, value: p[0], values: p } };
  }
  return { ...e, query: { ...o, measures: c }, chart: { ...r, mapping: d } };
}
function vd(e, t, n) {
  const a = dn(e), r = a.filter((N) => N.type === "view"), o = Pt(t), s = Object.values(o).flat();
  let l;
  for (const N of s) {
    const R = Oe(e, N);
    if (R) {
      l = R;
      break;
    }
  }
  const c = !l && n ? Rt(e, n) : void 0, u = l ? Rt(e, l.cube) : c, d = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, h = (l == null ? void 0 : l.connectedComponent) ?? (c == null ? void 0 : c.connectedComponent), p = t.query.measures ?? [], b = p.length ? wt(p[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: r, measureSource: b, scopeComponent: h };
  const y = b ?? (l == null ? void 0 : l.cube) ?? (c == null ? void 0 : c.name), g = y ? Rt(e, y) : void 0, v = a.filter((N) => N.type === "cube" && N.connectedComponent !== void 0), _ = (h === void 0 ? v : v.filter((N) => N.connectedComponent === h)).filter((N) => N.name !== y).sort((N, R) => N.title.localeCompare(R.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: _,
    views: r,
    measureSource: b,
    scopeComponent: h
  };
}
const xd = Ve.options;
function kd({
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
        xd.map((o) => {
          const s = e === o;
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": s,
              "aria-label": o,
              title: o,
              disabled: a,
              onClick: () => t(s && n ? null : o),
              className: w(
                "size-6 rounded-full border transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
                s ? "border-ring ring-2 ring-ring/40" : "border-black/10 hover:border-ring"
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
const Nd = Ye.options, wd = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Mo({
  value: e,
  onChange: t,
  options: n,
  placeholder: a = "Granularity…",
  disabled: r,
  id: o,
  className: s
}) {
  const l = n && n.length > 0 ? n : Nd;
  return /* @__PURE__ */ f(
    we,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: r,
      children: [
        /* @__PURE__ */ i(Se, { id: o, className: s, children: /* @__PURE__ */ i(Ce, { placeholder: a }) }),
        /* @__PURE__ */ i(_e, { children: l.map((c) => /* @__PURE__ */ i(pe, { value: c, children: wd[c] }, c)) })
      ]
    }
  );
}
const ca = { bar: "Bar", line: "Line", area: "Area" }, Cd = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function Sd({
  spec: e,
  update: t,
  well: n,
  member: a,
  option: r,
  resolvedColor: o,
  reorder: s,
  className: l
}) {
  const c = bd(e, t, n, a, r), u = (r == null ? void 0 : r.label) ?? a, d = c.label || u, h = c.canColor && o !== void 0, p = c.canRename || h || c.isTimeField || c.isCategoryField || c.isComboY && !!c.render || c.canAxis || c.canLineStyle || !!s, b = (g) => {
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
    ) : r ? nn(r.type) : null,
    /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: d })
  ] });
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "field-pill",
      className: w(
        "flex items-center gap-1 rounded-md border border-border bg-background py-1 pl-2 pr-1 text-sm shadow-sm",
        l
      ),
      children: [
        p ? /* @__PURE__ */ f(Re, { children: [
          /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "flex min-w-0 flex-1 items-center gap-1.5 text-left outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
              title: `Edit ${d}`,
              children: y
            }
          ) }),
          /* @__PURE__ */ i(Me, { align: "start", className: "w-60 p-3", children: /* @__PURE__ */ f("div", { className: "flex flex-col gap-3", children: [
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
              /* @__PURE__ */ i(kd, { value: c.colorToken, onChange: c.onRecolor })
            ] }) : null,
            c.isTimeField ? /* @__PURE__ */ f(re, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  st,
                  {
                    kind: "dateRange",
                    value: c.dateRange,
                    onChange: c.onDateRange,
                    renderFixed: (g, v) => /* @__PURE__ */ i(yr, { value: g, onChange: v })
                  }
                )
              ] }),
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  st,
                  {
                    kind: "granularity",
                    value: c.granularity,
                    onChange: c.onGranularity,
                    renderFixed: (g, v) => /* @__PURE__ */ i(Mo, { value: g, onChange: v, className: "h-8 w-full" })
                  }
                )
              ] }),
              c.canComparePrevious ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ f("label", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    Hn,
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
              /* @__PURE__ */ i("div", { className: "flex gap-1", children: Object.keys(ca).map((g) => /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  onClick: () => c.onRender(g),
                  className: w(
                    "flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs",
                    c.render === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                  ),
                  children: [
                    ca[g],
                    c.render === g ? /* @__PURE__ */ i(Ie, { className: "size-3" }) : null
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
                    c.axis === g ? /* @__PURE__ */ i(Ie, { className: "size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            c.canLineStyle ? /* @__PURE__ */ f(re, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-1", children: Cd.map(([g, v]) => /* @__PURE__ */ f(
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
                      (c.curve ?? "monotone") === g ? /* @__PURE__ */ i(Ie, { className: "size-3" }) : null
                    ]
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ f("label", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(Hn, { checked: c.dots === !0, onChange: c.onDots, "aria-label": "Show points" })
              ] })
            ] }) : null,
            s ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ f(
                W,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 flex-1",
                  disabled: !s.canUp,
                  onClick: s.onUp,
                  children: [
                    /* @__PURE__ */ i(Qn, { className: "size-3.5" }),
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
                  disabled: !s.canDown,
                  onClick: s.onDown,
                  children: [
                    /* @__PURE__ */ i(Jn, { className: "size-3.5" }),
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
                  /* @__PURE__ */ i($r, { className: "size-3.5" }),
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
            children: /* @__PURE__ */ i($r, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function ua({
  spec: e,
  update: t,
  well: n,
  placed: a,
  allPlaced: r,
  optionFor: o,
  colorFor: s,
  scope: l,
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
  const N = n.cardinality === "many" && !p, R = N || a.length === 0, C = a.length, k = h === "vertical", D = y ?? n.label, z = /* @__PURE__ */ i(
    So,
    {
      well: n,
      placed: r,
      scope: l,
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
            Sd,
            {
              spec: e,
              update: t,
              well: n,
              member: V,
              option: o(V),
              resolvedColor: s(V),
              className: k ? "w-full" : void 0,
              reorder: N && C > 1 && !b ? {
                canUp: K > 0,
                canDown: K < C - 1,
                onUp: () => t(la(e, n, K, K - 1)),
                onDown: () => t(la(e, n, K, K + 1))
              } : void 0
            },
            V
          )),
          R ? z : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "px-0.5 text-[10px] leading-tight text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function Mn({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ f(Re, { children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium shadow-sm transition-colors hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "truncate", children: e }),
          /* @__PURE__ */ f("span", { className: "flex shrink-0 items-center gap-1 text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(lt, { className: "size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Me, { align: "start", className: "max-h-[72vh] w-64 overflow-y-auto p-3", children: n })
  ] });
}
function vr(e, t) {
  const { chart: n } = e, a = n.familyOptions ?? {};
  return { chart: n, fo: a, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...o } } }) };
}
function _d({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = vr(e, t), r = vo(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], s = n.display ?? "number", l = n.gauge, c = (d) => {
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
      Co,
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
      st,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (d) => c({ dateRange: d }),
        renderFixed: (d, h) => /* @__PURE__ */ i(yr, { value: d, onChange: h })
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
        value: s,
        onChange: (d) => a({ display: d })
      }
    ) }),
    s === "gauge" ? /* @__PURE__ */ i(At, { label: "Gauge max", children: /* @__PURE__ */ i(
      me,
      {
        type: "number",
        className: "h-8",
        value: (l == null ? void 0 : l.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const h = parseFloat(d.target.value);
          a({ gauge: Number.isFinite(h) ? { ...l ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function Rd({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = vr(e, t), r = n.comparison, o = r !== void 0, s = x.useRef(void 0);
  r && (s.current = r);
  const l = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (r == null ? void 0 : r.goodDirection) ?? "up";
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => a({
          comparison: d ? s.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
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
      (r == null ? void 0 : r.mode) === "previousPeriod" && !(l != null && l.dateRange) ? /* @__PURE__ */ i("p", { className: "text-[10px] leading-tight text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
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
function Ad({ spec: e, update: t }) {
  const { fo: n, setFO: a } = vr(e, t), r = n.sparkline, o = r !== void 0, s = n.comparison !== void 0, l = n.goodDirection ?? "up", c = r == null ? void 0 : r.granularity;
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
        st,
        {
          kind: "granularity",
          value: c,
          onChange: (u) => a({ sparkline: { ...r, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(Mo, { value: u, onChange: d, className: "h-8 w-full" })
        }
      ) }),
      s ? null : /* @__PURE__ */ i(
        he,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the trend color).",
          checked: l !== "down",
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
const Md = {
  bar: { left: ["y"], bottom: ["x", "color"] },
  line: { left: ["y"], bottom: ["x", "color"] },
  area: { left: ["y"], bottom: ["x", "color"] },
  combo: { left: ["y"], bottom: ["x"] },
  pie: { left: ["size"], bottom: ["slices"] },
  scatter: { left: ["sy"], bottom: ["sx", "size", "color"] },
  kpi: { left: ["value"], bottom: [] },
  table: { left: ["columns"], bottom: [] }
}, Od = /* @__PURE__ */ new Set(["line", "combo"]);
function Dd({
  spec: e,
  update: t,
  toolbar: n,
  children: a
}) {
  var Et, It, Vt, qt;
  const { meta: r } = Be(), { locale: o } = Ke(), { chart: s } = e, l = s.family, c = vo(e), u = x.useMemo(() => ln(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), d = x.useCallback(
    (O) => O && (o == null ? void 0 : o.unitSystem) === "imperial" && u[O] ? u[O].imperialUnit : O,
    [o == null ? void 0 : o.unitSystem, u]
  ), h = x.useMemo(() => ym(l), [l]), p = x.useMemo(() => Pt(e), [e]), b = x.useMemo(() => new Map(h.map((O) => [O.id, O])), [h]), [y, g] = x.useState(void 0), v = x.useMemo(() => vd(r, e, y), [r, e, y]), S = x.useMemo(() => Object.values(p).flat(), [p]), _ = x.useCallback(
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
  ), C = Od.has(l), k = x.useCallback(
    (O) => {
      var q, J, ae;
      if (l === "combo") {
        const te = s.familyOptions ?? {}, oe = (Array.isArray(te.series) ? te.series : []).find(
          (bt) => bt.member === O
        );
        return (oe == null ? void 0 : oe.axis) === "right" ? "right" : "left";
      }
      const F = (q = s.mapping) == null ? void 0 : q.series;
      return (F && (F.mode === "measures" || F.mode === "pivot") ? (ae = (J = F.meta) == null ? void 0 : J[O]) == null ? void 0 : ae.axis : void 0) === "right" ? "right" : "left";
    },
    [l, s.familyOptions, s.mapping]
  ), D = x.useMemo(() => {
    var ae, te;
    const O = p.y ?? [], F = (oe) => O.find((bt) => k(bt) === oe), $ = F("left"), q = C ? F("right") : void 0, J = (oe) => oe ? Oe(r, oe) : void 0;
    return {
      leftKey: $ ? vt(J($)) : void 0,
      rightKey: q ? vt(J(q)) : void 0,
      leftLabel: $ ? ma(J($), d((ae = J($)) == null ? void 0 : ae.unit)) : void 0,
      rightLabel: q ? ma(J(q), d((te = J(q)) == null ? void 0 : te.unit)) : void 0
    };
  }, [p, C, k, r, d]), z = x.useCallback(
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
            return `This axis shows ${ae}; ${F.label ?? "this field"} is ${Bn(F)}`;
        }
      }
    },
    [v, D, C]
  ), K = C ? [D.leftLabel, D.rightLabel].filter(Boolean).join(" · ") || void 0 : D.leftLabel, I = x.useMemo(() => {
    var F;
    const O = {};
    if (l === "bar" || l === "line" || l === "area") {
      const $ = (F = s.mapping) == null ? void 0 : F.series;
      if ($ && $.mode === "measures") {
        const q = $.members.map((ae) => {
          var te, oe;
          return { key: ae, colorToken: (oe = (te = $.meta) == null ? void 0 : te[ae]) == null ? void 0 : oe.colorToken };
        }), J = zn(q, s.colors);
        $.members.forEach((ae, te) => {
          O[ae] = J[te];
        });
      }
    } else if (l === "combo") {
      const $ = s.familyOptions ?? {}, q = Array.isArray($.series) ? $.series : [], J = q.map((te) => ({ key: te.member, colorToken: te.colorToken })), ae = zn(J, s.colors);
      q.forEach((te, oe) => {
        O[te.member] = ae[oe];
      });
    }
    return O;
  }, [l, s.mapping, s.colors, s.familyOptions]), B = x.useCallback(
    (O, F, $) => {
      const q = Oe(r, F);
      if (V(O, q)) return;
      let J = Zr(e, l, O, F, $);
      C && O === "y" && (J = Wn(J, l, F, z(q))), t(J);
    },
    [V, r, t, e, l, C, z]
  ), L = x.useCallback(
    (O, F) => {
      var J;
      if (!F) return;
      if (v.scopeComponent !== void 0 && F.connectedComponent !== v.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (F.memberType === "measure" && v.measureSource && F.cube !== v.measureSource)
        return `Measures come from one table (${((J = v.sourceCube) == null ? void 0 : J.title) ?? v.measureSource}). Remove them to switch.`;
      const $ = O === "left" ? D.leftKey : D.rightKey, q = O === "left" ? D.leftLabel : D.rightLabel;
      if ($ !== void 0 && vt(F) !== $)
        return `This axis shows ${q}; ${F.label ?? "this field"} is ${Bn(F)}`;
    },
    [v, D]
  ), A = x.useCallback(
    (O, F, $) => {
      const q = Oe(r, F);
      L(O, q) || t(Wn(Zr(e, l, "y", F, $), l, F, O));
    },
    [L, r, t, e, l]
  ), Y = l === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : Md[l], G = Y.left.map((O) => b.get(O)).filter(Boolean), P = Y.bottom.map((O) => b.get(O)).filter(Boolean), U = (Et = p.color) == null ? void 0 : Et[0], E = ((It = p.y) == null ? void 0 : It.length) ?? 0, T = U && E > 1 ? `${E} measures × ${((Vt = Oe(r, U)) == null ? void 0 : Vt.label) ?? "this split"} — one series per measure per value.` : void 0, Q = l !== "kpi" && l !== "table", ue = p.y ?? [], ce = ue.find((O) => k(O) !== "right"), H = C ? ue.find((O) => k(O) === "right") : void 0, M = (O) => {
    var q, J, ae, te;
    if (!O) return;
    const F = (q = s.mapping) == null ? void 0 : q.series;
    return (F && F.mode === "measures" ? (ae = (J = F.meta) == null ? void 0 : J[O]) == null ? void 0 : ae.label : void 0) ?? ((te = Oe(r, O)) == null ? void 0 : te.label);
  }, X = (O) => {
    var $, q, J, ae;
    const F = (te, oe) => oe ? /* @__PURE__ */ i(ia, { spec: e, update: t, axis: te, title: "Title", auto: M(oe) }) : null;
    switch (O) {
      case "y":
        return F("y", ce);
      // single value axis (bar / area)
      case "x":
        return F("x", (q = ($ = s.mapping) == null ? void 0 : $.category) == null ? void 0 : q.member);
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
    ua,
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
  ), $e = b.get("y"), We = (O) => {
    if (!$e) return null;
    const F = O === "left" ? ce : H;
    return /* @__PURE__ */ i(
      ua,
      {
        spec: e,
        update: t,
        well: $e,
        label: O === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter(($) => k($) === O),
        allPlaced: S,
        optionFor: ($) => Oe(r, $),
        colorFor: ($) => I[$],
        scope: v,
        blockReason: ($) => L(O, $),
        onAdd: ($, q) => A(O, $, q),
        badge: O === "left" ? D.leftLabel : D.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: F ? /* @__PURE__ */ i(
          ia,
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
    const O = b.get("value"), F = (p.value ?? []).length > 0, $ = s.familyOptions ?? {};
    return /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
        O ? fe(O, "vertical") : null,
        F ? /* @__PURE__ */ i(
          Mn,
          {
            label: "Time, range & display",
            summary: $.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(_d, { spec: e, update: t })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ i(Mn, { label: "Comparison", summary: $.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Rd, { spec: e, update: t }) }),
        /* @__PURE__ */ i(Mn, { label: "Sparkline", summary: $.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(Ad, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ f("div", { "data-slot": "chart-edit-overlay", className: "flex h-full w-full flex-col gap-2", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i("div", { className: "flex min-w-0 items-center gap-2", children: n }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ i(
          sd,
          {
            currentName: v.viewLocked ?? ((qt = v.sourceCube) == null ? void 0 : qt.name),
            hasFields: S.length > 0,
            onSelect: _
          }
        ),
        /* @__PURE__ */ i(od, { spec: e, update: t, cube: c, scopeCubes: N, scope: v })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex min-h-0 flex-1 gap-2", children: [
      G.length > 0 ? /* @__PURE__ */ i("div", { className: w("flex shrink-0 flex-col gap-3 overflow-y-auto pr-1", l === "kpi" ? "w-56" : "w-40"), children: l === "kpi" ? Ge() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        G.flatMap(
          (O) => C && O.id === "y" ? [We("left"), We("right")] : [fe(O, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 flex-col gap-2", children: [
        /* @__PURE__ */ f("div", { className: "relative min-h-0 flex-1", children: [
          a,
          /* @__PURE__ */ i(pd, { spec: e, update: t, empty: R })
        ] }),
        P.length > 0 ? /* @__PURE__ */ f("div", { className: "flex flex-wrap items-start gap-x-5 gap-y-2 pl-1", children: [
          P.map((O) => fe(O, "horizontal")),
          Q && !R ? /* @__PURE__ */ i(ld, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function ma(e, t) {
  const n = Bn(e), a = t ?? (e == null ? void 0 : e.unit);
  return a && a !== n ? `${n} (${a})` : n;
}
function Oo(e, t) {
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
function da(e) {
  const t = Va.safeParse(e);
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
  const [a, r] = x.useState(e), [o, s] = x.useState(e);
  x.useEffect(() => {
    r(e), s(e);
  }, [e]);
  const l = Oo((h) => t(h), n), c = x.useMemo(() => da(a), [a]), u = c.length === 0, d = x.useCallback(
    (h) => {
      r(h), da(h).length === 0 && (s(h), l(h));
    },
    [l]
  );
  return { draft: a, issues: c, valid: u, committed: o, update: d };
}
const zd = () => {
};
function Td({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: a = 250,
  fill: r = !1,
  className: o
}) {
  const { draft: s, issues: l, valid: c, committed: u, update: d } = Ld({
    spec: e,
    onChange: t ?? zd,
    debounceMs: a
  }), h = u, p = (N) => {
    var R, C, k;
    return (((R = N.measures) == null ? void 0 : R.length) ?? 0) > 0 || (((C = N.dimensions) == null ? void 0 : C.length) ?? 0) > 0 || (((k = N.timeDimensions) == null ? void 0 : k.some((D) => typeof D.granularity == "string")) ?? !1);
  }, b = (N) => {
    var R;
    return (((R = N.measures) == null ? void 0 : R.length) ?? 0) > 0;
  }, y = s.chart.family !== "table", g = p(s.query) && p(h.query) && (!y || b(s.query) && b(h.query)), v = y && !b(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", S = g ? /* @__PURE__ */ i(pr, { query: h.query, chart: h.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "flex size-full items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "max-w-[16rem]", children: v }) }), _ = n ? /* @__PURE__ */ f(W, { size: "sm", disabled: !c, onClick: () => n(u), children: [
    /* @__PURE__ */ i(Oa, { className: "size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "chart-editor",
      className: w("flex w-full flex-col gap-2", r ? "h-full" : "min-h-[28rem]", o),
      children: [
        c ? null : /* @__PURE__ */ f(or, { variant: "destructive", children: [
          /* @__PURE__ */ i(xa, { className: "size-4" }),
          /* @__PURE__ */ i(ir, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(sr, { children: /* @__PURE__ */ f("ul", { className: "list-disc pl-4", children: [
            l.slice(0, 3).map((N, R) => /* @__PURE__ */ f("li", { children: [
              N.path ? /* @__PURE__ */ i("span", { className: "font-mono text-xs", children: N.path }) : null,
              " ",
              N.message
            ] }, R)),
            l.length > 3 ? /* @__PURE__ */ f("li", { children: [
              "…and ",
              l.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ i(Dd, { spec: s, update: d, toolbar: _, children: S }) })
      ]
    }
  );
}
function Fd({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: a,
  onUndo: r,
  onRedo: o,
  canUndo: s,
  canRedo: l,
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
            /* @__PURE__ */ i(Ma, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(Zn, {}),
            " Text"
          ] }),
          /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(pi, {}),
            " Input"
          ] }),
          a ? /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: a, children: [
            /* @__PURE__ */ i(gi, {}),
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
                disabled: !s,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(bi, {})
              }
            ),
            /* @__PURE__ */ i(
              W,
              {
                variant: "ghost",
                size: "icon",
                onClick: o,
                disabled: !l,
                "aria-label": "Redo",
                title: "Redo",
                children: /* @__PURE__ */ i(yi, {})
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
                /* @__PURE__ */ i(vi, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ f(W, { size: "sm", onClick: d, disabled: h, children: [
            /* @__PURE__ */ i(Oa, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const Do = "lg", Lo = 12;
function $d(e, t) {
  const n = t[Do];
  if (n && n.length > 0) return n;
  let a, r = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const s = o.reduce((l, c) => Math.max(l, c.x + c.w), 0);
    s > r && (a = o, r = s);
  }
  return a ?? e;
}
function Pd(e, t) {
  const n = new Map(e.map((s) => [s.i, s])), a = new Map(t.map((s) => [s.i, s])), r = [], o = (s, l) => {
    const c = {
      i: s.i,
      x: s.x,
      y: s.y,
      w: s.w,
      h: s.h
    };
    (l == null ? void 0 : l.minW) !== void 0 && (c.minW = l.minW), (l == null ? void 0 : l.minH) !== void 0 && (c.minH = l.minH), (l == null ? void 0 : l.static) !== void 0 && (c.static = l.static), r.push(c);
  };
  for (const s of e) {
    const l = a.get(s.i);
    l && o(l, s);
  }
  for (const s of t)
    n.has(s.i) || o(s, void 0);
  return r;
}
const jd = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Ed(e, t, n, a = Lo) {
  const r = jd[n], o = Math.min(r.w, a), s = e.reduce((l, c) => Math.max(l, c.y + c.h), 0);
  return {
    i: t,
    x: 0,
    y: s,
    w: o,
    h: r.h,
    minW: Math.min(r.minW, o),
    minH: r.minH
  };
}
function zo(e, t, n = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? Lo) {
  const r = Ed(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, r]
  };
}
function Id(e, t, n) {
  const a = e.widgets.find((o) => o.id === t);
  if (!a) return e;
  const r = JSON.parse(JSON.stringify(a));
  return r.id = n, zo(e, r);
}
function Vd(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function qd(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Kd = 12;
function Bd(e) {
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
function Hd(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Wd({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: a,
  onDuplicate: r,
  onDelete: o,
  onLayoutChange: s
}) {
  const [l, c] = io(), u = e.grid ?? {}, d = u.cols ?? Kd, h = u.rowHeight ?? 40, p = u.margin ?? [12, 12], b = u.containerPadding ?? [0, 0], { breakpoints: y, cols: g } = x.useMemo(
    () => Bd(d),
    [d]
  ), v = x.useMemo(
    () => ({ [Do]: Hd(e.layout) }),
    [e.layout]
  ), S = x.useMemo(
    () => new Map(e.widgets.map((C) => [C.id, C])),
    [e.widgets]
  ), _ = x.useRef(s);
  x.useEffect(() => {
    _.current = s;
  }, [s]);
  const N = x.useRef(null), R = x.useCallback(
    (C, k) => {
      const D = $d(C, k);
      _.current(D.map((z) => ({ ...z })));
    },
    []
  );
  return /* @__PURE__ */ i(fr, { spec: e, children: /* @__PURE__ */ i("div", { ref: l, className: "w-full [&_.react-resizable-handle]:z-20", children: c > 0 ? /* @__PURE__ */ i(
    La,
    {
      width: c,
      layouts: v,
      breakpoints: y,
      cols: g,
      rowHeight: h,
      margin: p,
      containerPadding: b,
      dragConfig: { enabled: !0, handle: `.${Xt}` },
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
              onPointerDown: (z) => {
                N.current = { x: z.clientX, y: z.clientY };
              },
              onClick: (z) => {
                const V = N.current;
                V && Math.hypot(z.clientX - V.x, z.clientY - V.y) > 5 || n(k.id);
              },
              onKeyDown: (z) => {
                (z.key === "Enter" || z.key === " ") && (z.preventDefault(), n(k.id));
              },
              className: w(
                "group relative h-full w-full cursor-move rounded-xl ring-offset-2 ring-offset-background transition-shadow focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                D ? "ring-2 ring-primary" : "ring-0 focus-visible:ring-2 focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(po, { widget: k, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: w(Xt, "absolute inset-0 z-10 cursor-move rounded-xl") }),
                /* @__PURE__ */ f("div", { className: "absolute right-2 top-2 z-20 flex items-center gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${k.title ?? k.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), a(k.id);
                      },
                      className: w(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-accent hover:text-foreground [&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(xi, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${k.title ?? k.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), r(k.id);
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
                      "aria-label": `Delete ${k.title ?? k.type}`,
                      onClick: (z) => {
                        z.stopPropagation(), o(k.id);
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
function Gd(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Ud({
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
  const r = za({
    extensions: [Fa],
    editable: !0,
    content: Gd(e.doc),
    onUpdate: ({ editor: o }) => {
      const s = o.getJSON();
      n.current({ ...a.current, doc: s });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: w(
          so,
          "min-h-[8rem] rounded-md border border-input bg-background px-3 py-2",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        )
      }
    }
  });
  return r ? /* @__PURE__ */ i(le, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(Yd, { editor: r }),
    /* @__PURE__ */ i(Ta, { editor: r })
  ] }) }) : /* @__PURE__ */ i("div", { className: "text-sm text-muted-foreground", children: "Loading editor…" });
}
function Pe({ active: e, onClick: t, title: n, children: a }) {
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
function Yd({ editor: e }) {
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
          Pe,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(Ni, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(wi, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(Ci, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(Si, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(_i, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(Ri, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(Ai, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(Mi, {})
          }
        )
      ]
    }
  );
}
const Qd = tr(
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
function Jd({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: w(Qd({ variant: t }), e), ...n });
}
function Xd({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: a,
  id: r,
  className: o
}) {
  const { meta: s, isLoading: l } = Be(), c = x.useMemo(() => dn(s), [s]), u = c.filter((p) => p.type === "cube"), d = c.filter((p) => p.type === "view"), h = c.find((p) => p.name === e);
  return /* @__PURE__ */ f(we, { value: e, onValueChange: t, disabled: a || l, children: [
    /* @__PURE__ */ i(Se, { id: r, className: o, children: /* @__PURE__ */ i(Ce, { placeholder: l ? "Loading…" : n, children: h ? /* @__PURE__ */ i(On, { option: h }) : void 0 }) }),
    /* @__PURE__ */ f(_e, { children: [
      d.length > 0 ? /* @__PURE__ */ f(En, { children: [
        /* @__PURE__ */ i(In, { children: "Views" }),
        d.map((p) => /* @__PURE__ */ i(pe, { value: p.name, children: /* @__PURE__ */ i(On, { option: p }) }, p.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ f(En, { children: [
        /* @__PURE__ */ i(In, { children: "Cubes" }),
        u.map((p) => /* @__PURE__ */ i(pe, { value: p.name, children: /* @__PURE__ */ i(On, { option: p }) }, p.name))
      ] }) : null
    ] })
  ] });
}
function On({ option: e }) {
  const t = e.type === "view" ? er : _a;
  return /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ i(t, { className: "size-4 shrink-0 text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "truncate", children: e.title }),
    /* @__PURE__ */ i(Jd, { variant: "secondary", className: "ml-auto shrink-0 px-1.5 py-0 text-[10px]", children: e.type })
  ] });
}
const Zd = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function ef(e) {
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
function tf({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: a } = e.control, r = (l) => n({ ...e, control: { ...e.control, control: l } }), o = (l) => n({ ...e, control: { ...e.control, variable: l } }), s = (l) => {
    l !== a.kind && r(ef(l));
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ i(
      le,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ f(
          we,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(Se, { children: /* @__PURE__ */ i(Ce, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(_e, { children: t.map((l) => /* @__PURE__ */ i(pe, { value: l.name, children: l.label ? `${l.label} (${l.name})` : l.name }, l.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(le, { label: "Control", children: /* @__PURE__ */ f(we, { value: a.kind, onValueChange: (l) => s(l), children: [
      /* @__PURE__ */ i(Se, { children: /* @__PURE__ */ i(Ce, {}) }),
      /* @__PURE__ */ i(_e, { children: Zi.options.map((l) => /* @__PURE__ */ i(pe, { value: l, children: Zd[l] }, l)) })
    ] }) }),
    /* @__PURE__ */ i(nf, { control: a, onChange: r, variables: t })
  ] });
}
function nf({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(rf, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(af, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(of, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(sf, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(lf, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(cf, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function rf({
  control: e,
  onChange: t
}) {
  const n = (e.presets ?? []).join(", ");
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(le, { label: "Presets", hint: "Comma-separated relative ranges, e.g. This month, last 7 days.", children: /* @__PURE__ */ i(
      me,
      {
        value: n,
        placeholder: "This month, last 7 days, last 30 days",
        onChange: (a) => {
          const r = a.target.value.split(",").map((o) => o.trim()).filter(Boolean);
          t({ ...e, presets: r.length > 0 ? r : void 0 });
        }
      }
    ) }),
    /* @__PURE__ */ i(
      he,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (a) => t({ ...e, allowFuture: a })
      }
    )
  ] });
}
function af({
  control: e,
  onChange: t,
  variables: n
}) {
  const a = new Set(e.options ?? []), r = (l) => {
    const c = new Set(a);
    c.has(l) ? c.delete(l) : c.add(l);
    const u = Ye.options.filter((d) => c.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((l) => l.type === "dateRange" || l.type === "time"), s = "__none__";
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(
      le,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ f(
          we,
          {
            value: e.rangeVariable ?? s,
            onValueChange: (l) => t({ ...e, rangeVariable: l === s ? void 0 : l }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(Se, { children: /* @__PURE__ */ i(Ce, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ f(_e, { children: [
                /* @__PURE__ */ i(pe, { value: s, children: "None" }),
                o.map((l) => /* @__PURE__ */ i(pe, { value: l.name, children: l.label ? `${l.label} (${l.name})` : l.name }, l.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(le, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5", children: Ye.options.map((l) => {
      const c = a.has(l);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => r(l),
          className: "rounded-md border px-2 py-1 text-xs capitalize transition-colors " + (c ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"),
          children: l
        },
        l
      );
    }) }) })
  ] });
}
function of({
  control: e,
  onChange: t
}) {
  const n = (o, s) => {
    const l = e.options.map(
      (c, u) => u === o ? { value: s.value ?? String(c.value), label: s.label ?? c.label } : c
    );
    t({ ...e, options: l });
  }, a = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), r = (o) => t({ ...e, options: e.options.filter((s, l) => l !== o) });
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
        children: /* @__PURE__ */ i("div", { className: "flex flex-col gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: "No options yet." }) : e.options.map((o, s) => /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ i(
            me,
            {
              className: "flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (l) => n(s, { label: l.target.value })
            }
          ),
          /* @__PURE__ */ i(
            me,
            {
              className: "flex-1",
              placeholder: "Value",
              value: String(o.value),
              onChange: (l) => n(s, { value: l.target.value })
            }
          ),
          /* @__PURE__ */ i(
            W,
            {
              variant: "ghost",
              size: "icon",
              className: "size-8 shrink-0 text-muted-foreground",
              "aria-label": "Remove option",
              onClick: () => r(s),
              children: /* @__PURE__ */ i(ct, {})
            }
          )
        ] }, s)) })
      }
    )
  ] });
}
function sf({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(le, { label: "From", children: /* @__PURE__ */ f(
      we,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Se, { children: /* @__PURE__ */ i(Ce, {}) }),
          /* @__PURE__ */ f(_e, { children: [
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
          Xd,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function lf({
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
function cf({
  control: e,
  onChange: t
}) {
  const n = (a, r) => /* @__PURE__ */ i(le, { label: r, children: /* @__PURE__ */ i(
    me,
    {
      type: "number",
      value: e[a] ?? "",
      onChange: (o) => {
        const s = o.target.value;
        t({ ...e, [a]: s === "" ? void 0 : Number(s) });
      }
    }
  ) });
  return /* @__PURE__ */ f(re, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function uf(e) {
  return { schemaVersion: et, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function mf(e) {
  const t = {
    schemaVersion: et,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function df(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function fa({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: a,
  fill: r = !1
}) {
  const o = a ? (s) => a([...t, s]) : void 0;
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
      /* @__PURE__ */ i(fr, { spec: uf(t), children: /* @__PURE__ */ i(Um, { createVariable: o, children: /* @__PURE__ */ i("div", { className: w(r && "min-h-0 flex-1"), children: /* @__PURE__ */ i(
        Td,
        {
          fill: r,
          spec: mf(e),
          onChange: (s) => n(df(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(Ud, { widget: e, onChange: n }) : /* @__PURE__ */ i(tf, { widget: e, variables: t, onChange: n })
  ] });
}
function ff({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !1,
  open: r = !0,
  onToggle: o,
  regionId: s,
  className: l
}) {
  const c = /* @__PURE__ */ f(re, { children: [
    a ? /* @__PURE__ */ i(
      rn,
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
      className: w("flex items-center justify-between gap-2", l),
      children: [
        a ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": r,
            "aria-controls": s,
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
function hf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !0,
  defaultOpen: r = !0,
  open: o,
  onOpenChange: s,
  className: l,
  children: c
}) {
  const u = o !== void 0, [d, h] = x.useState(r), p = a ? u ? o : d : !0, b = x.useId(), y = x.useCallback(() => {
    const g = !p;
    u || h(g), s == null || s(g);
  }, [p, u, s]);
  return /* @__PURE__ */ f(
    "section",
    {
      "data-slot": "section",
      "data-state": p ? "open" : "closed",
      className: w("border-b border-border py-2 last:border-b-0", l),
      children: [
        /* @__PURE__ */ i(
          ff,
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
function pf(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function gf(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function bf(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function yf(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function vf(e, t) {
  switch (e) {
    case "chart":
      return gf(t);
    case "text":
      return bf(t);
    case "input":
      return yf(t);
  }
}
function xf(e) {
  return { name: e, type: "string" };
}
function kf(e) {
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
const Nf = {
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
function wf({
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
    t(e.map((d, h) => h === c ? Cf(d, u) : d));
  }, s = (c) => t(e.filter((u, d) => d !== c)), l = () => t([...e, xf(r())]);
  return /* @__PURE__ */ i(
    hf,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", onClick: l, children: [
        /* @__PURE__ */ i(Tt, {}),
        " Add"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ f("p", { className: "py-1 text-xs text-muted-foreground", children: [
        "No variables. Variables bind input controls and `",
        "{var}",
        "` query tokens."
      ] }) : /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: e.map((c, u) => /* @__PURE__ */ i(
        Sf,
        {
          decl: c,
          duplicate: e.some((d, h) => h !== u && d.name === c.name && c.name !== ""),
          onChange: (d) => o(u, d),
          onRemove: () => s(u)
        },
        u
      )) })
    }
  );
}
function Cf(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = kf(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function Sf({
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
          we,
          {
            value: e.type,
            onValueChange: (o) => n({ type: o }),
            children: [
              /* @__PURE__ */ i(Se, { children: /* @__PURE__ */ i(Ce, {}) }),
              /* @__PURE__ */ i(_e, { children: Ea.options.map((o) => /* @__PURE__ */ i(pe, { value: o, children: Nf[o] }, o)) })
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
        /* @__PURE__ */ i(_f, { decl: e, onChange: (o) => n({ default: o }) })
      ]
    }
  );
}
function _f({
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
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : Rf(e.default);
  return /* @__PURE__ */ i(le, { label: "Default", hint: n, className: "py-1", children: /* @__PURE__ */ i(
    me,
    {
      value: a,
      placeholder: Af(e.type),
      onChange: (r) => {
        const o = r.target.value;
        if (o === "") {
          t(void 0);
          return;
        }
        if (e.array) {
          const s = o.split(",").map((l) => l.trim()).filter(Boolean);
          t(s);
          return;
        }
        t(o);
      }
    }
  ) });
}
function Rf(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function Af(e) {
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
function rh({
  spec: e,
  onChange: t,
  onSave: n,
  newId: a,
  debounceMs: r = 300,
  onUndo: o,
  onRedo: s,
  canUndo: l,
  canRedo: c,
  onDiscard: u,
  className: d
}) {
  const [h, p] = x.useState(e);
  x.useEffect(() => p(e), [e]);
  const [b, y] = x.useState(null), [g, v] = x.useState(null), S = x.useRef(null);
  S.current === null && (S.current = a ?? pf());
  const _ = a ?? S.current, N = Oo(
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
      const T = vf(E, _());
      R((Q) => zo(Q, T)), y(T.id), v({ kind: "widget", id: T.id });
    },
    [R, _]
  ), k = x.useCallback((E) => y(E), []), D = x.useCallback((E) => {
    y(E), v({ kind: "widget", id: E });
  }, []), z = x.useCallback(
    (E) => {
      R((T) => Vd(T, E)), y((T) => T === E ? null : T), v((T) => (T == null ? void 0 : T.kind) === "widget" && T.id === E ? null : T);
    },
    [R]
  ), V = x.useCallback(
    (E) => {
      const T = _();
      R((Q) => Id(Q, E, T)), y(T);
    },
    [R, _]
  ), K = x.useCallback(
    (E) => R((T) => qd(T, E)),
    [R]
  ), I = x.useCallback(
    (E) => R((T) => ({ ...T, layout: Pd(T.layout, E) })),
    [R]
  ), B = x.useCallback(
    (E) => R((T) => ({ ...T, name: E || void 0 })),
    [R]
  ), L = x.useCallback(
    (E) => R((T) => ({ ...T, variables: E })),
    [R]
  ), A = x.useMemo(
    () => qa.safeParse(h),
    [h]
  ), Y = x.useCallback(() => {
    A.success && (n == null || n(A.data));
  }, [A, n]), G = (g == null ? void 0 : g.kind) === "widget" ? h.widgets.find((E) => E.id === g.id) ?? null : null;
  x.useEffect(() => {
    (g == null ? void 0 : g.kind) === "widget" && !h.widgets.some((E) => E.id === g.id) && v(null);
  }, [g, h.widgets]);
  const P = x.useCallback(() => v(null), []), U = (g == null ? void 0 : g.kind) === "variables" ? "Dashboard variables" : G ? G.title ?? `${Mf(G.type)} widget` : "";
  return /* @__PURE__ */ f("div", { "data-slot": "dashboard-editor", className: w("flex h-full flex-col gap-2", d), children: [
    /* @__PURE__ */ i(
      Fd,
      {
        name: h.name ?? "",
        onNameChange: B,
        onAdd: C,
        onEditVariables: () => v({ kind: "variables" }),
        onUndo: o,
        onRedo: s,
        canUndo: l,
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
      Wd,
      {
        spec: h,
        selectedId: b,
        onSelect: k,
        onEdit: D,
        onDuplicate: V,
        onDelete: z,
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
                /* @__PURE__ */ i(Xn, {}),
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
                onClick: () => z(G.id),
                children: [
                  /* @__PURE__ */ i(ct, {}),
                  " Delete"
                ]
              }
            ) : null
          ] }),
          /* @__PURE__ */ i("div", { className: "min-h-0 flex-1 overflow-hidden p-4", children: g.kind === "variables" ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(wf, { variables: h.variables, onChange: L }) }) : (G == null ? void 0 : G.type) === "chart" ? /* @__PURE__ */ i(
            fa,
            {
              fill: !0,
              widget: G,
              variables: h.variables,
              onChange: K,
              onVariablesChange: L
            }
          ) : G ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(
            fa,
            {
              widget: G,
              variables: h.variables,
              onChange: K,
              onVariablesChange: L
            }
          ) }) : null })
        ]
      }
    ) : null
  ] });
}
function Mf(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
export {
  Qc as AreaChartFamily,
  zc as AreaFamilyOptionsSchema,
  Qi as AxesOptionsSchema,
  Nn as AxisOptionsSchema,
  Uc as BarChartFamily,
  Dc as BarFamilyOptionsSchema,
  Do as CANONICAL_BREAKPOINT,
  Ve as ChartColorTokenSchema,
  Dd as ChartEditOverlay,
  Td as ChartEditor,
  Hi as ChartFamilySchema,
  ja as ChartOptionsSchema,
  Su as ChartRenderer,
  Va as ChartSpecSchema,
  nh as ChartView,
  ts as ChartWidgetSchema,
  Ji as ColorAssignmentSchema,
  ku as ComboChartFamily,
  Vc as ComboFamilyOptionsSchema,
  Ic as ComboSeriesOptSchema,
  jc as CondFormatRuleSchema,
  pr as CubeChart,
  $u as CubeChartSpec,
  Pa as CubeQuerySchema,
  dr as CubeVizContext,
  Zf as CubeVizProvider,
  Ua as DEFAULTS,
  ge as DEFAULT_COLOR_RAMP,
  Lo as DEFAULT_COLS,
  Fn as DEFAULT_UNIT_CONVERSIONS,
  Xt as DRAG_HANDLE_CLASS,
  th as Dashboard,
  rh as DashboardEditor,
  fr as DashboardProvider,
  qa as DashboardSpecSchema,
  Dn as DateRangeSchema,
  Vr as EM_DASH,
  Wd as EditorCanvas,
  Fd as EditorToolbar,
  Xm as FilterBuilder,
  Vi as FilterOperatorSchema,
  Wi as FormatKindSchema,
  an as FormatOptionsSchema,
  Ds as GRANULARITY_PATTERN,
  Ye as GranularitySchema,
  is as GridConfigSchema,
  Zi as InputControlKindSchema,
  es as InputControlSchema,
  tf as InputWidgetEditor,
  rs as InputWidgetSchema,
  am as InputWidgetView,
  ru as KpiFamily,
  $c as KpiFamilyOptionsSchema,
  os as LayoutItemSchema,
  qi as LeafFilterSchema,
  Ui as LegendOptionsSchema,
  Yc as LineChartFamily,
  Lc as LineFamilyOptionsSchema,
  ee as MemberSchema,
  Pr as OrderDirSchema,
  Bi as OrderSpecSchema,
  Jc as PieChartFamily,
  Tc as PieFamilyOptionsSchema,
  Ln as QueryFilterSchema,
  Ft as ReferenceLineOptSchema,
  po as RenderWidget,
  et as SCHEMA_VERSION,
  Ii as ScalarSchema,
  Zc as ScatterChartFamily,
  Fc as ScatterFamilyOptionsSchema,
  Gi as SeriesMappingSchema,
  jr as SeriesMetaSchema,
  Ka as SpecSchema,
  Pc as TableColumnOptSchema,
  du as TableFamily,
  Ec as TableFamilyOptionsSchema,
  Ud as TextWidgetEditor,
  ns as TextWidgetSchema,
  ju as TextWidgetView,
  Ki as TimeDimensionSchema,
  Xi as TipTapDocSchema,
  Yi as TooltipOptionsSchema,
  Yt as VarRefSchema,
  ss as VariableDeclSchema,
  Ea as VariableTypeSchema,
  $a as VariableValueSchema,
  wf as VariablesPanel,
  ho as WidgetChrome,
  fa as WidgetEditPanel,
  as as WidgetSpecSchema,
  zo as appendWidget,
  Ir as assignColors,
  wc as axisKey,
  ao as builtinCharts,
  us as createCubeClient,
  pf as createIdFactory,
  Ga as createUnitsFormatter,
  Os as createVariableStore,
  Ts as datePattern,
  $n as deepMerge,
  kf as defaultForType,
  rr as defaultFormatter,
  Xf as familyOptionsSchema,
  ms as fetchMeta,
  Qf as formatCategory,
  St as formatDateValue,
  at as isEmptyValue,
  Ne as isVarRef,
  cs as loadSpec,
  Ba as looksLikeIsoDate,
  Wa as makeChartFormat,
  Yf as makeDateFormatter,
  Jf as makeFormatter,
  Pd as mergeLayout,
  ln as mergeUnitConversions,
  gf as newChartWidget,
  yf as newInputWidget,
  bf as newTextWidget,
  xf as newVariable,
  vf as newWidget,
  vs as normalize,
  $d as pickCanonicalLayout,
  Ed as placeNewItem,
  Sc as quantityLabel,
  Vd as removeWidget,
  qd as replaceWidget,
  Ru as resolveChart,
  Kc as resolveOptions,
  Ms as resolveQuery,
  zn as resolveSeriesColors,
  Ss as resolveValue,
  Gf as safeLoadSpec,
  zs as toDate,
  hs as toResultAnnotation,
  Ld as useChartEditorState,
  io as useContainerWidth,
  Be as useCubeMeta,
  Mu as useCubeQuery,
  Ke as useCubeVizContext,
  oo as useDashboard,
  Oo as useDebouncedCallback,
  eh as useFormatter,
  Rn as useNormalizedSeries,
  hr as useOptionalDashboard,
  Uf as validateSpec
};
//# sourceMappingURL=index.js.map
