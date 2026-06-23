import { jsx as i, jsxs as f, Fragment as ae } from "react/jsx-runtime";
import * as Gn from "recharts";
import { BarChart as Lo, CartesianGrid as Dt, YAxis as Te, XAxis as nt, Bar as ha, LabelList as ga, ReferenceLine as zt, LineChart as To, Line as ba, AreaChart as ya, Area as Un, PieChart as Fo, Pie as $o, Cell as va, Label as Po, ScatterChart as jo, ZAxis as Eo, Scatter as Io, RadialBarChart as Vo, PolarAngleAxis as qo, RadialBar as Ko, ResponsiveContainer as Bo, ComposedChart as Ho } from "recharts";
import * as x from "react";
import { createContext as xa, useContext as Yn, useMemo as Q, useState as rt, useCallback as Ee, useEffect as Lt, useRef as xt, createElement as Wo, useSyncExternalStore as Go, useId as Uo } from "react";
import { clsx as Yo } from "clsx";
import { twMerge as Qo } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as Jo, ArrowUp as Qn, ArrowDown as Jn, ChevronsUpDown as Xo, AlertCircle as ka, ChevronLeft as Na, ChevronRight as Xn, ChevronDown as lt, Check as Ie, ChevronUp as Zo, CalendarIcon as wa, MoreVertical as ei, RefreshCw as ti, Download as ni, Type as Zn, Hash as Ca, Calendar as _a, Search as ri, Table2 as Sa, Database as Ra, Layers as er, Variable as ai, Plus as Tt, Trash2 as ct, ListFilter as oi, Box as Aa, EyeOff as Ma, Eye as Oa, BarChart4 as ii, Table as si, Gauge as li, ScatterChart as ci, PieChart as ui, AreaChart as mi, LineChart as di, BarChart3 as Da, X as jr, Save as za, SlidersHorizontal as fi, Braces as pi, Pencil as hi, Bold as gi, Italic as bi, Strikethrough as yi, Heading1 as vi, Heading2 as xi, List as ki, ListOrdered as Ni, Quote as wi } from "lucide-react";
import * as Ut from "@radix-ui/react-popover";
import { cva as tr } from "class-variance-authority";
import * as be from "@radix-ui/react-select";
import Ci from "@cubejs-client/core";
import { format as fe, isValid as kt, parseISO as Yt, differenceInCalendarDays as _i, subDays as ke, startOfMonth as gn, subMonths as bn, startOfQuarter as yn, subQuarters as vn, startOfYear as xn, subYears as kn, subWeeks as Si, startOfWeek as Ri, endOfWeek as Ai, endOfMonth as Mi, endOfQuarter as Oi, endOfYear as Di, parse as La } from "date-fns";
import { DayPicker as zi } from "react-day-picker";
import { ResponsiveGridLayout as Ta } from "react-grid-layout";
import { useEditor as Fa, EditorContent as $a } from "@tiptap/react";
import Pa from "@tiptap/starter-kit";
const et = 1, Qt = m.object({ var: m.string().min(1) }).strict();
function Ne(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const Jt = (e) => m.union([e, Qt]), Li = m.union([m.string(), m.number(), m.boolean()]), Ye = m.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Dn = m.union([m.tuple([m.string(), m.string()]), m.string()]), ja = m.union([
  m.string(),
  m.number(),
  m.boolean(),
  m.tuple([m.string(), m.string()]),
  // absolute date range
  m.array(m.string()),
  m.array(m.number())
]), X = m.string().min(1), Ti = m.enum([
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
]), Fi = m.object({
  member: X,
  operator: Ti,
  values: m.array(m.union([Li, Qt])).optional()
}).strict(), zn = m.lazy(
  () => m.union([
    Fi,
    m.object({ and: m.array(zn) }).strict(),
    m.object({ or: m.array(zn) }).strict()
  ])
), $i = m.object({
  dimension: X,
  granularity: Jt(Ye).optional(),
  dateRange: Jt(Dn).optional(),
  compareDateRange: m.array(Dn).optional()
}).strict(), Er = m.enum(["asc", "desc"]), Pi = m.union([
  m.record(X, Er),
  m.array(m.tuple([X, Er]))
]), Ea = m.object({
  measures: m.array(X).optional(),
  dimensions: m.array(X).optional(),
  timeDimensions: m.array($i).optional(),
  filters: m.array(zn).optional(),
  segments: m.array(X).optional(),
  order: Pi.optional(),
  limit: Jt(m.number()).optional(),
  offset: Jt(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), ji = m.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
]), Ve = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Ei = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), an = m.object({
  kind: Ei.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional()
}).strict(), Ir = m.object({
  label: m.string().optional(),
  colorToken: Ve.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: an.optional()
}).strict(), Ii = m.object({
  category: m.object({ member: X }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(X),
      meta: m.record(X, Ir).optional()
    }).strict(),
    m.object({
      mode: m.literal("pivot"),
      /** The primary split measure — drives the value-axis unit. Always set
       *  (also the only value when a single measure is split by colour). */
      value: X,
      /** When MORE THAN ONE measure is split by the colour dimension, the full
       *  ordered measure list (series = measure × pivot value). `value` is
       *  `values[0]`. Absent ⇒ single-measure pivot (the common case). */
      values: m.array(X).optional(),
      pivot: X,
      /** Per-MEASURE meta (keyed by measure). Carries the value-axis (left/right)
       *  each measure's series sit on, so a multi-measure color split can be
       *  dual-axis (each axis one unit). */
      meta: m.record(X, Ir).optional()
    }).strict()
  ])
}).strict(), Vi = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), qi = m.object({
  show: m.boolean().optional(),
  indicator: m.enum(["dot", "line", "dashed"]).optional(),
  showTotal: m.boolean().optional()
}).strict(), Vr = m.union([m.number(), m.literal("auto")]), Nn = m.object({
  label: m.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: m.boolean().optional(),
  hide: m.boolean().optional(),
  scale: m.enum(["linear", "log"]).optional(),
  domain: m.tuple([Vr, Vr]).optional(),
  tickFormat: an.optional()
}).strict(), Ki = m.object({
  x: Nn.optional(),
  y: Nn.optional(),
  y2: Nn.optional()
}).strict(), Bi = m.object({
  byKey: m.record(m.string(), Ve).optional(),
  ramp: m.array(Ve).optional()
}).strict(), Ia = m.object({
  family: ji,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Ii.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Vi.optional(),
  tooltip: qi.optional(),
  axes: Ki.optional(),
  colors: Bi.optional(),
  format: an.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Hi = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), Wi = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Gi = m.object({
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
      options: m.array(m.object({ value: ja, label: m.string() }).strict()),
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
}, Ui = m.object({ ...nr, type: m.literal("chart"), query: Ea, chart: Ia }).strict(), Yi = m.object({ ...nr, type: m.literal("text"), doc: Hi }).strict(), Qi = m.object({ ...nr, type: m.literal("input"), control: Gi }).strict(), Ji = m.discriminatedUnion("type", [
  Ui,
  Yi,
  Qi
]), Xi = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), Zi = m.object({
  cols: m.number().optional(),
  rowHeight: m.number().optional(),
  margin: m.tuple([m.number(), m.number()]).optional(),
  containerPadding: m.tuple([m.number(), m.number()]).optional()
}).strict(), Va = m.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), es = m.object({
  name: m.string().min(1),
  type: Va,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: ja.optional()
}).strict(), qa = {
  schemaVersion: m.literal(et),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, Ka = m.object({ ...qa, kind: m.literal("chart"), query: Ea, chart: Ia }).strict(), Ba = m.object({
  ...qa,
  kind: m.literal("dashboard"),
  variables: m.array(es),
  widgets: m.array(Ji),
  layout: m.array(Xi),
  grid: Zi.optional()
}).strict(), Ha = m.discriminatedUnion("kind", [Ka, Ba]), ts = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function ns(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > et)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${et} — update the library`
    );
  for (; n < et; ) {
    const a = ts[n];
    if (!a) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = a(t), n += 1, t.schemaVersion = n;
  }
  return Ha.parse(t);
}
function Pf(e) {
  try {
    return { ok: !0, spec: ns(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function jf(e) {
  return Ha.parse(e);
}
function rs(e) {
  return Ci(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function as(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ge = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], os = /* @__PURE__ */ new Set(["bar", "line", "area", "pie"]), wn = 8;
function Ln(e, t) {
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
function qr(e, t) {
  const n = Ln(e, t);
  return e.forEach((a, r) => {
    a.colorToken = n[r];
  }), e;
}
function is(e) {
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
  for (const n of Object.keys(e)) t[n] = is(e[n]);
  return t;
}
function ss(e) {
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
function ls(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function cs(e, t) {
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
function us(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const a = { ...n };
    for (const [r, o] of t) {
      const s = sn(a[r]);
      s !== null && (a[r] = o.to(s));
    }
    return a;
  });
}
function ms(e, t) {
  var n;
  if (t.size !== 0)
    for (const a of e) {
      const r = (n = a.meta) != null && n.measure ? t.get(a.meta.measure) : void 0;
      r && (a.data = a.data.map((o) => o === null ? null : r.to(o)));
    }
}
function ds(e, t, n, a) {
  const r = ss(e.annotation()), o = cs(r, a), s = us(e.tablePivot(), o), l = t.mapping;
  if (!l) {
    const d = n.measures ?? [];
    if (os.has(t.family) && d.length > 0) {
      const p = s[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => sn(p[y])),
          meta: { ...on(tt(r, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return qr(h, t.colors), { categories: d.map(
        (y) => {
          var g, v;
          return ((g = tt(r, y)) == null ? void 0 : g.shortTitle) ?? ((v = tt(r, y)) == null ? void 0 : v.title) ?? y;
        }
      ), series: h, raw: { rows: s, annotation: r, query: n }, empty: s.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: s, annotation: r, query: n },
      empty: s.length === 0
    };
  }
  const c = l.series.mode === "measures" ? ps(e, l.series, t, r) : hs(e, l.category.member, l.series, t, r), u = fs(e, l);
  return ms(c, o), qr(c, t.colors), {
    categories: u,
    series: c,
    raw: { rows: s, annotation: r, query: n },
    empty: s.length === 0
  };
}
function fs(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((r) => r.x);
}
function ps(e, t, n, a) {
  const { members: r, meta: o } = t, s = e.chartPivot();
  return r.map((l) => {
    const c = tt(a, l), u = o == null ? void 0 : o[l], d = s.map((p) => sn(p[l]));
    return {
      key: l,
      label: ls(c, u, l),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...on(c, u, n.format), measure: l }
    };
  });
}
function hs(e, t, n, a, r) {
  const { value: o, values: s, pivot: l } = n, c = s && s.length > 0 ? s : [o], u = new Set(c), d = c.length > 1, p = { x: [t], y: [l, "measures"] }, b = e.seriesNames(p).filter((_) => {
    const R = _.yValues && _.yValues.length >= 2 ? _.yValues[_.yValues.length - 1] : void 0;
    return R === void 0 || u.has(R);
  }), y = e.chartPivot(p), g = tt(r, o), v = b.map((_) => {
    var j, E;
    const R = (j = _.yValues) == null ? void 0 : j[0], N = _.yValues && _.yValues.length >= 2 ? _.yValues[_.yValues.length - 1] : o, A = tt(r, N), k = (A == null ? void 0 : A.shortTitle) ?? (A == null ? void 0 : A.title) ?? N, w = R ?? _.shortTitle ?? _.title ?? _.key, O = d ? `${k} · ${w}` : w, $ = y.map((q) => sn(q[_.key])), V = (E = n.meta) == null ? void 0 : E[N];
    return {
      key: _.key,
      label: O,
      data: $,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...on(A ?? g, V, a.format),
        measure: N
      }
    };
  });
  return gs(v, g, a.format);
}
function gs(e, t, n) {
  var d, p, h;
  if (e.length <= wn) return e;
  const a = (b) => b.data.reduce((y, g) => y + (g ?? 0), 0), r = [...e].sort((b, y) => a(y) - a(b)), o = r.slice(0, wn - 1), s = r.slice(wn - 1), l = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: l }, (b, y) => {
    let g = 0, v = !1;
    for (const _ of s) {
      const R = _.data[y];
      R !== null && (g += R, v = !0);
    }
    return v ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${s.length})`,
    data: c,
    meta: { ...on(t, void 0, n), ...(h = (p = o[0]) == null ? void 0 : p.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
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
const bs = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function ys(e, t, n) {
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
function vs(e, t, n) {
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
function xs(e, t, n) {
  if ("and" in e) {
    const a = Tn(e.and, t, n);
    return a.length > 0 ? { and: a } : void 0;
  }
  if ("or" in e) {
    const a = Tn(e.or, t, n);
    return a.length > 0 ? { or: a } : void 0;
  }
  return vs(e, t, n);
}
function Tn(e, t, n) {
  const a = [];
  for (const r of e) {
    const o = xs(r, t, n);
    o !== void 0 && a.push(o);
  }
  return a;
}
function ks(e, t, n) {
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
function Ns(e, t, n) {
  const a = bs(n), r = {};
  if (e.measures !== void 0 && (r.measures = [...e.measures]), e.dimensions !== void 0 && (r.dimensions = [...e.dimensions]), e.segments !== void 0 && (r.segments = [...e.segments]), e.timeDimensions !== void 0 && (r.timeDimensions = e.timeDimensions.map((o) => ks(o, a, t))), e.filters !== void 0) {
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
function ws(e, t) {
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
const Cs = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, _s = "MMM d, yyyy";
function Ss(e) {
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
function Wa(e) {
  return /^\d{4}-\d{2}/.test(e) ? kt(Yt(e)) : !1;
}
function Rs(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? Cs[t] : _s;
}
function _t(e, t, n) {
  const a = Ss(e);
  return a ? fe(a, Rs(t, n)) : String(e);
}
function Ef(e, t) {
  return (n) => n == null ? "" : _t(n, e, t);
}
function If(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? _t(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? _t(e, t.format, t.granularity) : String(e) : Wa(e) ? _t(e, t.format, t.granularity) : e;
}
const Kr = "—", As = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function Br(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Ms(e, t) {
  const n = Math.abs(e);
  for (const { limit: a, suffix: r } of As)
    if (n >= a) return Br((e / a).toFixed(t)) + r;
  return Br(e.toFixed(t));
}
function Os(e, t, n) {
  const a = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (a.minimumFractionDigits = t.decimals, a.maximumFractionDigits = t.decimals) : a.maximumFractionDigits = 2, new Intl.NumberFormat(n, a).format(e);
}
function Ds(e, t) {
  const { format: n, meta: a, locale: r } = t, o = n != null && n.abbreviate ? Ms(e, n.decimals ?? 1) : Os(e, n, r), s = (n == null ? void 0 : n.suffix) ?? ((a == null ? void 0 : a.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${s ? ` ${s}` : ""}`;
}
function Ga(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function zs(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || Ga(e.value) ? !0 : typeof e.value == "string" ? Wa(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const rr = (e) => {
  const { value: t, format: n, granularity: a } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? Kr : (Ga(t) || typeof t == "string" || typeof t == "number") && zs(e) ? _t(t, n, a) : typeof t == "number" ? Ds(t, e) : String(t);
};
function Ls(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Vf(e, t) {
  return (n, a) => {
    const r = a ? Ls(a, t) : void 0;
    return rr({
      value: n,
      meta: r == null ? void 0 : r.meta,
      title: (r == null ? void 0 : r.shortTitle) ?? (r == null ? void 0 : r.title),
      role: "value",
      format: e
    });
  };
}
function Ts(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Fs(e) {
  const t = Ye.safeParse(e);
  return t.success ? t.data : void 0;
}
function $s(e, t) {
  var a;
  const n = (a = t.mapping) == null ? void 0 : a.category.member;
  if (!(!n || !e)) {
    for (const r of Object.keys(e.timeDimensions))
      if (r !== n && r.startsWith(`${n}.`)) {
        const o = Fs(r.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function Ua(e, t, n, a) {
  const r = $s(e, t);
  return {
    value(o, s, l = "value") {
      const c = s ? Ts(s, e) : void 0, u = c == null ? void 0 : c.meta;
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
class Ps extends Error {
}
const js = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new Ps(`"${e}" cannot be parsed into a number`);
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
function Hr(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Es extends Error {
}
class Wr extends Error {
}
class Is extends Error {
}
class Cn extends Error {
}
class Vs extends Error {
}
class qs {
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
      throw new Wr(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return Hr(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Is(`Cannot convert incompatible measures of ${r.measure} and ${o.measure}`);
    let s = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (s = this.cls.sub(s, this.convertFraction(o.unit.anchor_shift))), o.system != r.system) {
      const c = this.measureData[o.measure].anchors;
      if (c == null)
        throw new Cn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${r.measure}" measures.`);
      const u = c[o.system];
      if (u == null)
        throw new Cn(`Unable to find anchor for "${o.measure}" to "${r.measure}". Please make sure it is defined.`);
      const d = (n = u[r.system]) === null || n === void 0 ? void 0 : n.transform, p = (a = u[r.system]) === null || a === void 0 ? void 0 : a.ratio;
      if (typeof d == "function")
        s = d(s, this.cls);
      else if (typeof p == "number")
        s = this.cls.mul(s, p);
      else if (Hr(p))
        s = this.cls.mul(s, this.convertFraction(p));
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
      throw new Wr(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let s = [], l = o ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (s = (n = t.exclude) !== null && n !== void 0 ? n : [], l = (a = t.cutOffNumber) !== null && a !== void 0 ? a : l, c = (r = t.system) !== null && r !== void 0 ? r : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const p = this.describe(d);
      if (s.indexOf(d) === -1 && p.system === c) {
        const b = this.to(d);
        if (o ? this.cls.gt(b, l) : this.cls.lt(b, l))
          continue;
        (u === null || (o ? this.cls.lte(b, l) && this.cls.gt(b, u.val) : this.cls.gte(b, l) && this.cls.lt(b, u.val))) && (u = {
          val: b,
          unit: d,
          singular: p.singular,
          plural: p.plural
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
        throw new Vs(`Meausure "${t}" not found.`);
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
    throw new Es(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Ks(e) {
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
function Bs(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Ks(e);
  return (a) => new qs({
    measures: e,
    unitCache: n,
    cls: js
  }, a);
}
const Hs = {
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
}, Ws = {
  systems: {
    metric: Hs
  }
}, Gs = {
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
}, Us = {
  systems: {
    SI: Gs
  }
}, Ys = {
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
}, Qs = {
  systems: {
    SI: Ys
  }
}, Js = {
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
}, Xs = {
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
}, Zs = {
  systems: {
    metric: Js,
    imperial: Xs
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
}, el = {
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
}, tl = {
  systems: {
    SI: el
  }
}, nl = {
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
}, rl = {
  systems: {
    SI: nl
  }
}, al = {
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
}, ol = {
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
}, il = {
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
}, sl = {
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
}, ll = {
  systems: {
    bit: al,
    byte: ol,
    IECBit: il,
    IECByte: sl
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
}, cl = {
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
}, ul = {
  systems: {
    metric: cl
  }
}, ml = {
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
}, dl = {
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
}, fl = {
  systems: {
    SI: ml,
    nutrition: dl
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
}, pl = {
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
}, hl = {
  systems: {
    SI: pl
  }
}, gl = {
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
}, bl = {
  systems: {
    SI: gl
  }
}, yl = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, vl = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, xl = {
  systems: {
    metric: yl,
    imperial: vl
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
}, kl = {
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
}, Nl = {
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
}, wl = {
  systems: {
    metric: kl,
    imperial: Nl
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
}, Cl = {
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
}, _l = {
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
}, Sl = {
  systems: {
    metric: Cl,
    imperial: _l
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
}, Rl = {
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
}, Al = {
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
}, Ml = {
  systems: {
    metric: Rl,
    imperial: Al
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
}, Ol = {
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
}, Dl = {
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
}, zl = {
  systems: {
    metric: Ol,
    imperial: Dl
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
}, Ll = {
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
}, Tl = {
  systems: {
    SI: Ll
  }
}, Fl = {
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
}, $l = {
  systems: {
    unit: Fl
  }
}, Pl = {
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
}, jl = {
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
}, El = {
  systems: {
    metric: Pl,
    imperial: jl
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
}, Il = {
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
}, Vl = {
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
}, ql = {
  systems: {
    metric: Il,
    imperial: Vl
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
}, Kl = {
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
}, Bl = {
  systems: {
    SI: Kl
  }
}, Hl = {
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
}, Wl = {
  systems: {
    SI: Hl
  }
}, Gl = {
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
}, Ul = {
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
}, Yl = {
  systems: {
    metric: Gl,
    imperial: Ul
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
}, Ql = {
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
}, Jl = {
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
}, Xl = {
  systems: {
    metric: Ql,
    imperial: Jl
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
}, Zl = {
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
}, ec = {
  systems: {
    SI: Zl
  }
}, tc = {
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
}, nc = {
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
}, ac = {
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
}, oc = {
  systems: {
    SI: ac
  }
}, ic = {
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
}, sc = {
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
}, lc = {
  systems: {
    metric: ic,
    imperial: sc
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
}, cc = {
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
}, uc = {
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
}, mc = {
  systems: {
    metric: cc,
    imperial: uc
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
}, dc = {
  acceleration: Ws,
  angle: Us,
  apparentPower: Qs,
  area: Zs,
  charge: tl,
  current: rl,
  digital: ll,
  each: ul,
  energy: fl,
  force: hl,
  frequency: bl,
  illuminance: xl,
  length: wl,
  mass: Sl,
  massFlowRate: Ml,
  pace: zl,
  partsPer: Tl,
  pieces: $l,
  power: El,
  pressure: ql,
  reactiveEnergy: Bl,
  reactivePower: Wl,
  speed: Yl,
  torque: rc,
  temperature: Xl,
  time: ec,
  voltage: oc,
  volume: lc,
  volumeFlowRate: mc
}, fc = Bs(dc), pc = {
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
function hc(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => fc(t).from(e.from).to(e.to)
  };
}
const Fn = {
  ...Object.fromEntries(
    Object.entries(pc).map(([e, t]) => [e, hc(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function ln(e) {
  return e ? { ...Fn, ...e } : Fn;
}
function gc(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function bc(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function yc(e) {
  return e != null && e.quantity ? bc(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const vc = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function xc(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function Gr(e, t) {
  const n = e * (vc[t ?? "ms"] ?? 1), a = n < 0 ? "-" : "";
  let r = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], s = o.map(([c, u], d) => {
    const p = d < o.length - 1 ? Math.floor(r / c) : Math.round(r / c);
    return r -= p * c, [p, u];
  }), l = s.findIndex((c) => c[0] > 0);
  return l === -1 ? "0s" : a + s.slice(l, l + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function _n(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const r = Math.abs(e);
    for (const [o, s] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (r >= o) return xc((e / o).toFixed(n.decimals ?? 1)) + s;
  }
  const a = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, a).format(e);
}
function kc(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function Ur(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function Ya(e = Fn) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return rr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, a = t.meta, r = a == null ? void 0 : a.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return Gr(n, a == null ? void 0 : a.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return Ur(_n(n, t), o.prefix, o.suffix);
    }
    if (r === "time") return Gr(n, a == null ? void 0 : a.unit);
    if (r === "count" || (a == null ? void 0 : a.convert) === !1) return Ur(_n(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const s = a == null ? void 0 : a.unit, l = s ? kc(r, s) : {}, c = (o == null ? void 0 : o.prefix) ?? l.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : l.suffix ?? "";
    return `${c}${_n(n, t)}${u}`;
  };
}
function C(...e) {
  return Qo(Yo(e));
}
function ar(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function Nc({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: C("animate-pulse rounded-md bg-muted", e), ...t });
}
const wc = tr(
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
    className: C(wc({ variant: t }), e),
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
      className: C("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", e),
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
      className: C(
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
}).strict(), lr = m.boolean().optional(), Cc = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(Ft).optional(),
  comparePrevious: lr
}).strict(), cr = m.enum(["linear", "monotone", "step", "natural"]), _c = m.object({
  curve: cr.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(Ft).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: lr
}).strict(), Sc = m.object({
  curve: cr.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(Ft).optional(),
  comparePrevious: lr
}).strict(), Rc = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), Ac = m.object({
  x: X,
  y: X,
  size: X.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: X.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(Ft).optional()
}).strict(), Mc = m.object({
  display: m.enum(["number", "gauge"]).optional(),
  measure: X,
  comparison: m.object({
    mode: m.enum(["previousPeriod", "value"]),
    value: m.union([X, m.number()]).optional(),
    showAsPercent: m.boolean().optional(),
    goodDirection: m.enum(["up", "down"]).optional()
  }).strict().optional(),
  /** Inline AREA trend under the headline. TIED to the KPI: its measure defaults to
   *  `measure` and its time dimension / range to the KPI's own query — only the
   *  granularity (the trend bucket) is sparkline-specific. Its area is colored by the
   *  same good/bad direction as the comparison delta (see `goodDirection`). */
  sparkline: m.object({
    member: X.optional(),
    timeDimension: X.optional(),
    granularity: m.union([Ye, Qt]).optional(),
    dateRange: m.union([Dn, Qt]).optional()
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
}).strict(), Oc = m.object({
  member: X,
  label: m.string().optional(),
  format: an.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), Dc = m.object({
  member: X,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: Ve.optional()
}).strict(), zc = m.object({
  columns: m.array(Oc).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(Dc).optional()
}).strict(), Lc = m.object({
  member: X,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: Ve.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), Tc = m.object({
  series: m.array(Lc),
  referenceLines: m.array(Ft).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: cr.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), Fc = {
  bar: Cc,
  line: _c,
  area: Sc,
  pie: Rc,
  scatter: Ac,
  kpi: Mc,
  table: zc,
  combo: Tc
};
function qf(e) {
  return Fc[e];
}
const Qa = {
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
function Yr(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function $n(e, t) {
  if (t === void 0) return e;
  if (!Yr(e) || !Yr(t))
    return t;
  const n = { ...e };
  for (const a of Object.keys(t)) {
    const r = t[a];
    r !== void 0 && (n[a] = a in e ? $n(e[a], r) : r);
  }
  return n;
}
function $c(e) {
  const t = Qa[e.family];
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
function ze(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Pc(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function St(e) {
  return `var(${ar(e.key)})`;
}
function jc(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function Ja(e) {
  return e === "stacked" || e === "percent";
}
function cn(e, t) {
  var l, c, u, d, p, h, b, y, g, v, _, R, N, A;
  const n = e.raw.annotation, a = (k) => {
    var w, O, $, V, j, E;
    if (k)
      return ((w = n == null ? void 0 : n.measures[k]) == null ? void 0 : w.shortTitle) ?? ((O = n == null ? void 0 : n.dimensions[k]) == null ? void 0 : O.shortTitle) ?? (($ = n == null ? void 0 : n.timeDimensions[k]) == null ? void 0 : $.shortTitle) ?? ((V = n == null ? void 0 : n.measures[k]) == null ? void 0 : V.title) ?? ((j = n == null ? void 0 : n.dimensions[k]) == null ? void 0 : j.title) ?? ((E = n == null ? void 0 : n.timeDimensions[k]) == null ? void 0 : E.title) ?? k;
  }, r = e.series.find((k) => {
    var w;
    return (((w = k.meta) == null ? void 0 : w.axis) ?? "left") !== "right";
  }), o = e.series.find((k) => {
    var w;
    return ((w = k.meta) == null ? void 0 : w.axis) === "right";
  }), s = (k) => {
    var w;
    return k ? (w = k.meta) != null && w.measure ? a(k.meta.measure) : k.label : void 0;
  };
  return {
    x: (c = (l = t.axes) == null ? void 0 : l.x) != null && c.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? a((h = (p = t.mapping) == null ? void 0 : p.category) == null ? void 0 : h.member),
    left: (y = (b = t.axes) == null ? void 0 : b.y) != null && y.labelHide ? void 0 : ((v = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : v.label) ?? s(r),
    right: (R = (_ = t.axes) == null ? void 0 : _.y2) != null && R.labelHide ? void 0 : ((A = (N = t.axes) == null ? void 0 : N.y2) == null ? void 0 : A.label) ?? s(o)
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
function Xt(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
const Ec = { light: "", dark: ".dark" }, Xa = x.createContext(null);
function Za() {
  const e = x.useContext(Xa);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const qe = x.forwardRef(({ id: e, className: t, children: n, config: a, ...r }, o) => {
  const s = x.useId(), l = `chart-${e || s.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(Xa.Provider, { value: { config: a }, children: /* @__PURE__ */ f(
    "div",
    {
      "data-chart": l,
      ref: o,
      className: C(
        "flex h-full w-full justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-none",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ i(Ic, { id: l, config: a }),
        /* @__PURE__ */ i(Gn.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
qe.displayName = "ChartContainer";
const Ic = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, a]) => a.theme || a.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Ec).map(
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
    color: p,
    nameKey: h,
    labelKey: b
  }, y) => {
    const { config: g } = Za(), v = x.useMemo(() => {
      var w;
      if (r || !(t != null && t.length))
        return null;
      const [R] = t, N = `${b || (R == null ? void 0 : R.dataKey) || (R == null ? void 0 : R.name) || "value"}`, A = Pn(g, R, N), k = !b && typeof s == "string" ? ((w = g[s]) == null ? void 0 : w.label) || s : A == null ? void 0 : A.label;
      return l ? /* @__PURE__ */ i("div", { className: C("font-medium", c), children: l(k, t) }) : k ? /* @__PURE__ */ i("div", { className: C("font-medium", c), children: k }) : null;
    }, [s, l, t, r, c, g, b]);
    if (!e || !(t != null && t.length))
      return null;
    const _ = t.length === 1 && a !== "dot";
    return /* @__PURE__ */ f(
      "div",
      {
        ref: y,
        className: C(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          n
        ),
        children: [
          _ ? null : v,
          /* @__PURE__ */ i("div", { className: "grid gap-1.5", children: t.map((R, N) => {
            var O;
            const A = `${h || R.name || R.dataKey || "value"}`, k = Pn(g, R, A), w = p || ((O = R.payload) == null ? void 0 : O.fill) || R.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: C(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  a === "dot" && "items-center"
                ),
                children: u && (R == null ? void 0 : R.value) !== void 0 && R.name ? u(R.value, R.name, R, N, R.payload) : /* @__PURE__ */ f(ae, { children: [
                  k != null && k.icon ? /* @__PURE__ */ i(k.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: C(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": a === "dot",
                          "w-1": a === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": a === "dashed",
                          "my-0.5": _ && a === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": w,
                        "--color-border": w
                      }
                    }
                  ),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      className: C(
                        "flex flex-1 justify-between leading-none",
                        _ ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ f("div", { className: "grid gap-1.5", children: [
                          _ ? v : null,
                          /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: (k == null ? void 0 : k.label) || R.name })
                        ] }),
                        R.value !== void 0 && /* @__PURE__ */ i("span", { className: "font-mono font-medium tabular-nums text-foreground", children: d ? d(R.value, R) : typeof R.value == "number" ? R.value.toLocaleString() : String(R.value) })
                      ]
                    }
                  )
                ] })
              },
              R.dataKey ? String(R.dataKey) : N
            );
          }) })
        ]
      }
    );
  }
);
Xe.displayName = "ChartTooltipContent";
const pt = Gn.Legend, Ze = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: a = "bottom", nameKey: r }, o) => {
    const { config: s } = Za();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: C(
          "flex items-center justify-center gap-4",
          a === "top" ? "pb-3" : "pt-3",
          e
        ),
        children: n.map((l) => {
          const c = `${r || l.dataKey || "value"}`, u = Pn(s, l, c);
          return /* @__PURE__ */ f(
            "div",
            {
              className: C(
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
function Vc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var V, j, E, q, M, S, B, ne, P, G, Z, W, J, ue, ce, K;
  const o = t.familyOptions ?? {}, s = t.orientation === "horizontal", l = Ja(t.stackMode), c = t.stackMode === "percent", u = ur(e), d = (D, Y, de = "value") => c ? Xt(D) : a.value(D, Y, de), p = (D) => a.category(D), h = mr(e), b = je(e.series[0]), y = s ? (j = (V = t.axes) == null ? void 0 : V.y) == null ? void 0 : j.hide : (q = (E = t.axes) == null ? void 0 : E.x) == null ? void 0 : q.hide, g = s ? (M = t.axes) == null ? void 0 : M.x : (S = t.axes) == null ? void 0 : S.y, v = !s && e.series.some((D) => {
    var Y;
    return ((Y = D.meta) == null ? void 0 : Y.axis) === "right";
  }), _ = je(e.series.find((D) => {
    var Y;
    return ((Y = D.meta) == null ? void 0 : Y.axis) !== "right";
  })) ?? b, R = je(e.series.find((D) => {
    var Y;
    return ((Y = D.meta) == null ? void 0 : Y.axis) === "right";
  })), N = cn(e, t), A = N.x ? { value: N.x, position: "insideBottom", offset: -2 } : void 0, k = N.x ? { value: N.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, w = N.left ? { value: N.left, position: "insideBottom", offset: -2 } : void 0, O = N.left ? { value: N.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, $ = N.right ? { value: N.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(qe, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(
    Lo,
    {
      accessibilityLayer: !0,
      data: u,
      layout: s ? "vertical" : "horizontal",
      stackOffset: c ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Dt, { vertical: s, horizontal: !s }),
        s ? /* @__PURE__ */ f(ae, { children: [
          /* @__PURE__ */ i(
            Te,
            {
              type: "category",
              dataKey: "__cat",
              hide: y,
              tickFormatter: p,
              label: k
            }
          ),
          /* @__PURE__ */ i(
            nt,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: ze(g),
              domain: De(g),
              tickFormatter: (D) => d(D, b, "axis"),
              label: w
            }
          )
        ] }) : /* @__PURE__ */ f(ae, { children: [
          /* @__PURE__ */ i(
            nt,
            {
              type: "category",
              dataKey: "__cat",
              hide: y,
              tickFormatter: p,
              label: A
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
              tickFormatter: (D) => d(D, _, "axis"),
              label: O
            }
          ),
          v && /* @__PURE__ */ i(
            Te,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (ne = (B = t.axes) == null ? void 0 : B.y2) == null ? void 0 : ne.hide,
              scale: ze((P = t.axes) == null ? void 0 : P.y2),
              domain: De((G = t.axes) == null ? void 0 : G.y2),
              tickFormatter: (D) => d(D, R, "axis"),
              label: $
            }
          )
        ] }),
        ((Z = t.tooltip) == null ? void 0 : Z.show) !== !1 && /* @__PURE__ */ i(
          ft,
          {
            content: /* @__PURE__ */ i(
              Xe,
              {
                labelFormatter: (D) => a.category(D),
                indicator: ((W = t.tooltip) == null ? void 0 : W.indicator) ?? "dot",
                valueFormatter: c ? (D) => Xt(D) : $t(a, void 0, h)
              }
            )
          }
        ),
        ve(t).show && /* @__PURE__ */ i(
          pt,
          {
            content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: ut((J = t.legend) == null ? void 0 : J.position),
            layout: mt((ue = t.legend) == null ? void 0 : ue.position),
            align: dt((ce = t.legend) == null ? void 0 : ce.position)
          }
        ),
        e.series.map((D) => {
          var Y, de, $e, We;
          return /* @__PURE__ */ i(
            ha,
            {
              yAxisId: s ? void 0 : ((Y = D.meta) == null ? void 0 : Y.axis) === "right" && v ? "right" : "left",
              dataKey: D.key,
              name: D.label,
              stackId: l ? (de = D.meta) != null && de.companion ? "__prev" : (($e = D.meta) == null ? void 0 : $e.stackId) ?? "stack" : void 0,
              fill: St(D),
              fillOpacity: (We = D.meta) != null && We.companion ? 0.4 : void 0,
              radius: Pc(o.barRadius, s),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                ga,
                {
                  dataKey: D.key,
                  position: s ? "right" : "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (Ge) => d(typeof Ge == "boolean" ? Number(Ge) : Ge, je(D), "label")
                }
              )
            },
            D.key
          );
        }),
        (K = o.referenceLines) == null ? void 0 : K.map((D, Y) => /* @__PURE__ */ i(
          zt,
          {
            yAxisId: s ? void 0 : "left",
            ...D.axis === "y" ? { y: D.value } : { x: D.value },
            label: D.label,
            stroke: `var(--${D.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Y
        ))
      ]
    }
  ) });
}
function qc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var _, R, N, A, k, w, O, $, V, j, E, q, M, S, B, ne;
  const o = t.familyOptions ?? {}, s = o.chrome === "none", l = ur(e), c = (P) => a.category(P), u = e.series.some((P) => {
    var G;
    return ((G = P.meta) == null ? void 0 : G.axis) === "right";
  }), d = o.curve ?? "monotone", p = mr(e), h = je(e.series.find((P) => {
    var G;
    return ((G = P.meta) == null ? void 0 : G.axis) !== "right";
  })), b = je(e.series.find((P) => {
    var G;
    return ((G = P.meta) == null ? void 0 : G.axis) === "right";
  })), y = cn(e, t), g = !s && o.dots === !0, v = !s;
  return /* @__PURE__ */ i(
    qe,
    {
      config: n,
      className: s ? "aspect-[5/1] w-full" : "h-full w-full min-h-[200px]",
      children: /* @__PURE__ */ f(To, { accessibilityLayer: !0, data: l, margin: s ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !s && /* @__PURE__ */ i(Dt, { vertical: !1 }),
        /* @__PURE__ */ i(
          nt,
          {
            type: "category",
            dataKey: "__cat",
            hide: s || ((R = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : R.hide),
            tickFormatter: c,
            label: !s && y.x ? { value: y.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Te,
          {
            yAxisId: "left",
            type: "number",
            hide: s || ((A = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : A.hide),
            scale: ze((k = t.axes) == null ? void 0 : k.y),
            domain: De((w = t.axes) == null ? void 0 : w.y),
            tickFormatter: (P) => a.value(P, h, "axis"),
            label: !s && y.left ? { value: y.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Te,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: s || (($ = (O = t.axes) == null ? void 0 : O.y2) == null ? void 0 : $.hide),
            scale: ze((V = t.axes) == null ? void 0 : V.y2),
            domain: De((j = t.axes) == null ? void 0 : j.y2),
            tickFormatter: (P) => a.value(P, b, "axis"),
            label: !s && y.right ? { value: y.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !s && ((E = t.tooltip) == null ? void 0 : E.show) !== !1 && /* @__PURE__ */ i(
          ft,
          {
            content: /* @__PURE__ */ i(
              Xe,
              {
                labelFormatter: (P) => a.category(P),
                indicator: ((q = t.tooltip) == null ? void 0 : q.indicator) ?? "line",
                valueFormatter: $t(a, void 0, p)
              }
            )
          }
        ),
        !s && ve(t).show && /* @__PURE__ */ i(
          pt,
          {
            content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: ut((M = t.legend) == null ? void 0 : M.position),
            layout: mt((S = t.legend) == null ? void 0 : S.position),
            align: dt((B = t.legend) == null ? void 0 : B.position)
          }
        ),
        e.series.map((P) => {
          var G, Z, W, J, ue, ce;
          return /* @__PURE__ */ i(
            ba,
            {
              yAxisId: u && ((G = P.meta) == null ? void 0 : G.axis) === "right" ? "right" : "left",
              type: ((Z = P.meta) == null ? void 0 : Z.curve) ?? d,
              dataKey: P.key,
              name: P.label,
              stroke: St(P),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (W = P.meta) != null && W.companion ? "5 4" : void 0,
              strokeOpacity: (J = P.meta) != null && J.companion ? 0.55 : void 0,
              dot: s || (ue = P.meta) != null && ue.companion ? !1 : ((ce = P.meta) == null ? void 0 : ce.dots) ?? g,
              activeDot: v,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !s,
              children: !s && o.showValueLabels && /* @__PURE__ */ i(
                ga,
                {
                  dataKey: P.key,
                  position: "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (K) => a.value(typeof K == "boolean" ? Number(K) : K, je(P), "label")
                }
              )
            },
            P.key
          );
        }),
        !s && ((ne = o.referenceLines) == null ? void 0 : ne.map((P, G) => /* @__PURE__ */ i(
          zt,
          {
            yAxisId: "left",
            ...P.axis === "y" ? { y: P.value } : { x: P.value },
            label: P.label,
            stroke: `var(--${P.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          G
        )))
      ] })
    }
  );
}
function Kc({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var v, _, R, N, A, k, w, O, $, V, j, E, q, M;
  const o = t.familyOptions ?? {}, s = ((_ = (v = t.mapping) == null ? void 0 : v.series) == null ? void 0 : _.mode) === "pivot", l = t.stackMode ?? (s ? "stacked" : "none"), c = Ja(l), u = l === "percent", d = ur(e), p = (S) => a.category(S), h = o.curve ?? "monotone", b = mr(e), y = je(e.series[0]), g = cn(e, t);
  return /* @__PURE__ */ i(qe, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(ya, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Dt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((S) => /* @__PURE__ */ f("linearGradient", { id: `fill-${S.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: St(S), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: St(S), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, S.key)) }),
    /* @__PURE__ */ i(
      nt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (N = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : N.hide,
        tickFormatter: p,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Te,
      {
        type: "number",
        hide: (k = (A = t.axes) == null ? void 0 : A.y) == null ? void 0 : k.hide,
        scale: ze((w = t.axes) == null ? void 0 : w.y),
        domain: De((O = t.axes) == null ? void 0 : O.y),
        tickFormatter: (S) => u ? Xt(S) : a.value(S, y, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    (($ = t.tooltip) == null ? void 0 : $.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Xe,
          {
            labelFormatter: (S) => a.category(S),
            indicator: ((V = t.tooltip) == null ? void 0 : V.indicator) ?? "dot",
            valueFormatter: u ? (S) => Xt(S) : $t(a, void 0, b)
          }
        )
      }
    ),
    ve(t).show && /* @__PURE__ */ i(
      pt,
      {
        content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((j = t.legend) == null ? void 0 : j.position),
        layout: mt((E = t.legend) == null ? void 0 : E.position),
        align: dt((q = t.legend) == null ? void 0 : q.position)
      }
    ),
    e.series.map((S) => {
      var B, ne, P, G, Z, W, J, ue;
      return /* @__PURE__ */ i(
        Un,
        {
          type: ((B = S.meta) == null ? void 0 : B.curve) ?? h,
          dataKey: S.key,
          name: S.label,
          stackId: c && !((ne = S.meta) != null && ne.companion) ? ((P = S.meta) == null ? void 0 : P.stackId) ?? "stack" : void 0,
          stroke: St(S),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (G = S.meta) != null && G.companion ? "5 4" : void 0,
          strokeOpacity: (Z = S.meta) != null && Z.companion ? 0.55 : void 0,
          fill: (W = S.meta) != null && W.companion ? "none" : `url(#fill-${S.key})`,
          fillOpacity: 1,
          dot: (J = S.meta) != null && J.companion ? !1 : ((ue = S.meta) == null ? void 0 : ue.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        S.key
      );
    }),
    (M = o.referenceLines) == null ? void 0 : M.map((S, B) => /* @__PURE__ */ i(
      zt,
      {
        ...S.axis === "y" ? { y: S.value } : { x: S.value },
        label: S.label,
        stroke: `var(--${S.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      B
    ))
  ] }) });
}
function Bc({ data: e, options: t, format: n, editing: a }) {
  var g, v, _, R, N;
  const r = t.familyOptions ?? {}, o = e.series[0], s = e.categories.map((A, k) => {
    const w = n.category(A);
    return {
      key: `slice-${k}`,
      label: w,
      value: (o == null ? void 0 : o.data[k]) ?? 0,
      fill: `var(--${ge[k % ge.length]})`
    };
  }), l = Hc(s, r.maxSlices), c = l.reduce((A, k) => A + k.value, 0), u = {};
  l.forEach((A, k) => {
    u[A.key] = {
      label: A.label,
      color: `var(--${ge[k % ge.length]})`
    };
  });
  const d = `${r.innerRadiusPct ?? 0}%`, p = `${r.outerRadiusPct ?? 80}%`, h = (r.innerRadiusPct ?? 0) > 0, b = r.showLabels ?? "percent", y = b === "none" ? !1 : ({ payload: A, percent: k }) => {
    const w = A;
    return b === "name" ? (w == null ? void 0 : w.label) ?? "" : b === "value" ? n.value(w == null ? void 0 : w.value, o == null ? void 0 : o.key, "label") : `${((k !== void 0 ? k : w && c > 0 ? w.value / c : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(qe, { config: u, className: "h-full w-full min-h-[200px] [&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ f(Fo, { accessibilityLayer: !0, children: [
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
      $o,
      {
        data: l,
        dataKey: "value",
        nameKey: "label",
        innerRadius: d,
        outerRadius: p,
        paddingAngle: r.padAngle,
        cornerRadius: r.cornerRadius,
        label: y,
        labelLine: b !== "none" && !h,
        isAnimationActive: !1,
        children: [
          l.map((A) => /* @__PURE__ */ i(va, { fill: A.fill }, A.key)),
          h && r.centerLabel && /* @__PURE__ */ i(
            Po,
            {
              position: "center",
              content: ({ viewBox: A }) => {
                var $, V;
                if (!A || !("cx" in A)) return null;
                const { cx: k, cy: w } = A, O = (($ = r.centerLabel) == null ? void 0 : $.value) === void 0 || r.centerLabel.value === "total" ? n.value(c, o == null ? void 0 : o.key, "label") : r.centerLabel.value;
                return /* @__PURE__ */ f("text", { x: k, y: w, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: k, y: w, className: "fill-foreground text-2xl font-bold", children: O }),
                  ((V = r.centerLabel) == null ? void 0 : V.label) && /* @__PURE__ */ i("tspan", { x: k, y: w + 20, className: "fill-muted-foreground text-xs", children: r.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    ve(t).show && /* @__PURE__ */ i(
      pt,
      {
        content: /* @__PURE__ */ i(
          Ze,
          {
            nameKey: "label",
            className: ve(t).greyed ? "opacity-40" : void 0
          }
        ),
        verticalAlign: ut((_ = t.legend) == null ? void 0 : _.position),
        layout: mt((R = t.legend) == null ? void 0 : R.position),
        align: dt((N = t.legend) == null ? void 0 : N.position)
      }
    )
  ] }) });
}
function Hc(e, t) {
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
function Wc({ data: e, options: t, format: n, editing: a }) {
  var y, g, v, _, R, N, A, k, w, O, $, V, j, E, q, M, S, B, ne, P, G, Z, W, J, ue, ce;
  const r = t.familyOptions ?? {}, o = e.raw.annotation, s = e.raw.rows, l = { x: r.x, y: r.y, z: r.size }, c = ((y = o == null ? void 0 : o.measures[r.x]) == null ? void 0 : y.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[r.x]) == null ? void 0 : g.shortTitle) ?? r.x, u = ((v = o == null ? void 0 : o.measures[r.y]) == null ? void 0 : v.shortTitle) ?? ((_ = o == null ? void 0 : o.dimensions[r.y]) == null ? void 0 : _.shortTitle) ?? r.y, d = (N = (R = t.axes) == null ? void 0 : R.x) != null && N.labelHide ? void 0 : ((k = (A = t.axes) == null ? void 0 : A.x) == null ? void 0 : k.label) ?? c, p = (O = (w = t.axes) == null ? void 0 : w.y) != null && O.labelHide ? void 0 : ((V = ($ = t.axes) == null ? void 0 : $.y) == null ? void 0 : V.label) ?? u, h = Gc(s, r), b = {};
  return h.forEach((K, D) => {
    b[K.key] = { label: K.label, color: `var(--${ge[D % ge.length]})` };
  }), /* @__PURE__ */ i(qe, { config: b, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(jo, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Dt, {}),
    /* @__PURE__ */ i(
      nt,
      {
        type: "number",
        dataKey: "x",
        name: c,
        hide: (E = (j = t.axes) == null ? void 0 : j.x) == null ? void 0 : E.hide,
        scale: ze((q = t.axes) == null ? void 0 : q.x),
        domain: De((M = t.axes) == null ? void 0 : M.x),
        tickFormatter: (K) => n.value(K, r.x, "axis"),
        label: d ? { value: d, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Te,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (B = (S = t.axes) == null ? void 0 : S.y) == null ? void 0 : B.hide,
        scale: ze((ne = t.axes) == null ? void 0 : ne.y),
        domain: De((P = t.axes) == null ? void 0 : P.y),
        tickFormatter: (K) => n.value(K, r.y, "axis"),
        label: p ? { value: p, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    r.size && /* @__PURE__ */ i(Eo, { type: "number", dataKey: "z", range: r.sizeRange ?? [40, 400], name: r.size }),
    ((G = t.tooltip) == null ? void 0 : G.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          Xe,
          {
            indicator: ((Z = t.tooltip) == null ? void 0 : Z.indicator) ?? "dot",
            valueFormatter: (K, D) => {
              const Y = D == null ? void 0 : D.dataKey, de = typeof Y == "string" ? l[Y] : void 0;
              return n.value(K, de, "tooltip");
            }
          }
        )
      }
    ),
    ve(t).show && h.length > 1 && /* @__PURE__ */ i(
      pt,
      {
        content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((W = t.legend) == null ? void 0 : W.position),
        layout: mt((J = t.legend) == null ? void 0 : J.position),
        align: dt((ue = t.legend) == null ? void 0 : ue.position)
      }
    ),
    h.map((K, D) => /* @__PURE__ */ i(
      Io,
      {
        name: K.label,
        data: K.points,
        shape: r.shape ?? "circle",
        fill: `var(--color-${K.key})`,
        children: h.length === 1 && K.points.map((Y, de) => /* @__PURE__ */ i(va, { fill: `var(--${ge[D % ge.length]})` }, de))
      },
      K.key
    )),
    (ce = r.referenceLines) == null ? void 0 : ce.map((K, D) => /* @__PURE__ */ i(
      zt,
      {
        ...K.axis === "y" ? { y: K.value } : { x: K.value },
        label: K.label,
        stroke: `var(--${K.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      D
    ))
  ] }) });
}
function Gc(e, t) {
  const n = (r) => ({
    x: Sn(r[t.x]),
    y: Sn(r[t.y]),
    ...t.size ? { z: Sn(r[t.size]) } : {}
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
function Sn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const dr = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: C(
        "rounded-xl border border-border bg-card text-card-foreground shadow",
        e
      ),
      ...t
    }
  )
);
dr.displayName = "Card";
const eo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: C(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
        e
      ),
      ...t
    }
  )
);
eo.displayName = "CardHeader";
const to = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: C("font-semibold leading-none tracking-tight", e),
      ...t
    }
  )
);
to.displayName = "CardTitle";
const Uc = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: C("text-sm text-muted-foreground", e), ...t })
);
Uc.displayName = "CardDescription";
const Yc = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: C("col-start-2 row-span-2 row-start-1 self-start justify-self-end", e),
      ...t
    }
  )
);
Yc.displayName = "CardAction";
const fr = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: C("px-6 pb-6", e), ...t })
);
fr.displayName = "CardContent";
const Qc = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: C("flex items-center px-6 pb-6", e), ...t })
);
Qc.displayName = "CardFooter";
function Jc(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Xc(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function Zc(e) {
  var c, u, d, p;
  const { data: t, options: n, format: a } = e, r = n.familyOptions ?? {}, o = (h) => a.value(h, r.measure, "kpi"), s = no(t.raw.rows, r.measure) ?? 0, l = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[r.measure]) == null ? void 0 : u.shortTitle) ?? ((p = (d = t.raw.annotation) == null ? void 0 : d.measures[r.measure]) == null ? void 0 : p.title) ?? r.measure;
  return r.display === "gauge" ? /* @__PURE__ */ i(au, { value: s, label: l, fmt: o, fo: r }) : /* @__PURE__ */ i(eu, { ...e, value: s, label: l, fo: r, fmt: o });
}
function eu({
  data: e,
  value: t,
  label: n,
  fo: a,
  fmt: r
}) {
  var d;
  const o = a.goodDirection ?? ((d = a.comparison) == null ? void 0 : d.goodDirection) ?? "up", s = iu(e.raw.rows, t, a), l = a.sparkline ? e.series[0] : void 0, c = s ? s.diff : l ? nu(l) : 0, u = Xc(Jc(c, o));
  return /* @__PURE__ */ i(dr, { className: "h-full w-full", children: /* @__PURE__ */ f(fr, { className: "flex h-full flex-col justify-center gap-1 pt-6", children: [
    /* @__PURE__ */ i("div", { className: "text-sm font-medium text-muted-foreground", children: n }),
    /* @__PURE__ */ f("div", { className: "flex items-baseline gap-2", children: [
      /* @__PURE__ */ i("span", { className: "text-3xl font-bold tabular-nums text-foreground", children: r(t) }),
      s && /* @__PURE__ */ i(ru, { delta: s, goodDirection: o, fo: a, fmt: r })
    ] }),
    l && l.data.length > 0 && /* @__PURE__ */ i(tu, { series: l, categories: e.categories, colorClass: u })
  ] }) });
}
function tu({
  series: e,
  categories: t,
  colorClass: n
}) {
  const a = t.map((r, o) => ({ x: typeof r == "number" ? r : String(r), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: C("mt-2 h-12 w-full", n), children: /* @__PURE__ */ i(Bo, { width: "100%", height: "100%", children: /* @__PURE__ */ i(ya, { data: a, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
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
function nu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function ru({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = e.diff > 0, o = e.diff === 0, s = o ? !0 : r === (t === "up"), l = o ? Jo : r ? Qn : Jn, c = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${a(e.diff)}`;
  return /* @__PURE__ */ f(
    "span",
    {
      className: C(
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
function au({
  value: e,
  label: t,
  fmt: n,
  fo: a
}) {
  var d, p;
  const r = ((d = a.gauge) == null ? void 0 : d.min) ?? 0, o = ((p = a.gauge) == null ? void 0 : p.max) ?? Math.max(e, 1), s = Math.max(r, Math.min(o, e)), l = ou(e, a) ?? "chart-1", c = [{ name: t, value: s, fill: `var(--${l})` }], u = { value: { label: t, color: `var(--${l})` } };
  return /* @__PURE__ */ f("div", { className: "relative flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ i(qe, { config: u, className: "aspect-square min-h-[180px] w-full", children: /* @__PURE__ */ f(
      Vo,
      {
        data: c,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(qo, { type: "number", domain: [r, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(Ko, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ f("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ i("span", { className: "text-2xl font-bold tabular-nums text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "text-xs text-muted-foreground", children: t })
    ] })
  ] });
}
function ou(e, t) {
  var r;
  const n = (r = t.gauge) == null ? void 0 : r.thresholds;
  if (!(n != null && n.length)) return;
  let a;
  for (const o of [...n].sort((s, l) => s.at - l.at))
    e >= o.at && (a = o.colorToken);
  return a;
}
function no(e, t) {
  for (const n of e) {
    const a = ro(n[t]);
    if (a !== null) return a;
  }
  return null;
}
function iu(e, t, n) {
  const a = n.comparison;
  if (!a) return null;
  let r = null;
  if (a.mode === "value")
    typeof a.value == "number" ? r = a.value : typeof a.value == "string" && (r = no(e, a.value));
  else {
    const l = e[1];
    r = l ? ro(l[n.measure]) : null;
  }
  if (r === null) return null;
  const o = t - r, s = r !== 0 ? o / r : null;
  return { current: t, baseline: r, diff: o, pct: s };
}
function ro(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const ao = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: C("w-full caption-bottom text-sm", e), ...t }) })
);
ao.displayName = "Table";
const oo = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: C("[&_tr]:border-b", e), ...t }));
oo.displayName = "TableHeader";
const io = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: C("[&_tr:last-child]:border-0", e), ...t }));
io.displayName = "TableBody";
const Bt = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: C(
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
    className: C(
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
    className: C("p-2 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
Ht.displayName = "TableCell";
const su = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: C("mt-4 text-sm text-muted-foreground", e), ...t }));
su.displayName = "TableCaption";
const Wt = tr(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
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
), H = x.forwardRef(
  ({ className: e, variant: t, size: n, type: a, ...r }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: a ?? "button",
      className: C(Wt({ variant: t, size: n }), e),
      ...r
    }
  )
);
H.displayName = "Button";
function lu({ data: e, options: t, format: n }) {
  const a = t.familyOptions ?? {}, r = e.raw.rows, o = e.raw.annotation, s = x.useMemo(
    () => cu(r, o, a, n),
    [r, o, a, n]
  ), [l, c] = x.useState(null), [u, d] = x.useState(0), p = a.sortable !== !1, h = a.pageSize ?? 25, b = x.useMemo(() => {
    if (!l) return r;
    const N = l.dir === "asc" ? 1 : -1;
    return [...r].sort((A, k) => pu(A[l.member], k[l.member]) * N);
  }, [r, l]), y = Math.max(1, Math.ceil(b.length / h)), g = Math.min(u, y - 1), v = b.slice(g * h, g * h + h), _ = (N) => {
    p && (c(
      (A) => (A == null ? void 0 : A.member) === N ? { member: N, dir: A.dir === "asc" ? "desc" : "asc" } : { member: N, dir: "desc" }
    ), d(0));
  }, R = a.rowHeight === "compact";
  return /* @__PURE__ */ f("div", { className: "flex h-full w-full flex-col", children: [
    /* @__PURE__ */ i("div", { className: C("w-full", a.stickyHeader && "max-h-full overflow-auto"), children: /* @__PURE__ */ f(ao, { children: [
      /* @__PURE__ */ i(oo, { className: C(a.stickyHeader && "sticky top-0 z-10 bg-background"), children: /* @__PURE__ */ f(Bt, { children: [
        a.showRowNumbers && /* @__PURE__ */ i(jn, { className: "w-10 text-right", children: "#" }),
        s.map((N) => /* @__PURE__ */ i(
          jn,
          {
            className: Qr(N.align),
            style: N.width ? { width: N.width } : void 0,
            children: p ? /* @__PURE__ */ f(
              H,
              {
                variant: "ghost",
                className: "-ml-2 h-7 px-2 text-muted-foreground",
                onClick: () => _(N.member),
                children: [
                  N.label,
                  /* @__PURE__ */ i(fu, { active: (l == null ? void 0 : l.member) === N.member, dir: l == null ? void 0 : l.dir })
                ]
              }
            ) : N.label
          },
          N.member
        ))
      ] }) }),
      /* @__PURE__ */ f(io, { children: [
        v.map((N, A) => /* @__PURE__ */ f(Bt, { children: [
          a.showRowNumbers && /* @__PURE__ */ i(Ht, { className: C("text-right text-muted-foreground", R && "py-1"), children: g * h + A + 1 }),
          s.map((k) => {
            const w = hu(k.member, N[k.member], a.conditionalFormat);
            return /* @__PURE__ */ i(
              Ht,
              {
                className: C(Qr(k.align), R && "py-1"),
                style: w ? { color: w } : void 0,
                children: k.render(N[k.member])
              },
              k.member
            );
          })
        ] }, A)),
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
    b.length > h && /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2 px-2 py-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ f("span", { children: [
        g * h + 1,
        "–",
        Math.min((g + 1) * h, b.length),
        " of",
        " ",
        b.length
      ] }),
      /* @__PURE__ */ f("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ i(
          H,
          {
            variant: "outline",
            className: "h-7 px-2",
            onClick: () => d((N) => Math.max(0, N - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          H,
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
function cu(e, t, n, a) {
  var s;
  const r = e.length > 0 ? Object.keys(e[0]) : mu(t);
  return ((s = n.columns) != null && s.length ? n.columns : r.map((l) => ({ member: l }))).filter((l) => !l.hidden).map((l) => {
    const c = l.member, u = t ? du(t, c) : void 0, d = t ? c in t.measures : !1, p = l.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? c, h = l.align ?? (d ? "right" : "left");
    return {
      member: c,
      label: p,
      align: h,
      width: l.width,
      render: (b) => uu(b, d, c, a)
    };
  });
}
function uu(e, t, n, a) {
  if (e == null || e === "") return "—";
  if (t) {
    const r = typeof e == "number" ? e : Number(e);
    return Number.isFinite(r) ? a.value(r, n) : String(e);
  }
  return a.category(e);
}
function mu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function du(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function Qr(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function fu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(Qn, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(Jn, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(Xo, { className: "ml-1 size-3.5 opacity-50" });
}
function pu(e, t) {
  const n = typeof e == "number" ? e : Number(e), a = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(a) ? n - a : String(e ?? "").localeCompare(String(t ?? ""));
}
function hu(e, t, n) {
  if (!(n != null && n.length)) return;
  const a = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(a)) {
    for (const r of n)
      if (r.member === e && gu(a, r.when.op, r.when.value))
        return `var(--${r.colorToken ?? "chart-1"})`;
  }
}
function gu(e, t, n) {
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
function bu({ data: e, options: t, format: n, editing: a }) {
  var g, v, _, R, N, A, k, w, O, $, V, j, E, q, M, S, B, ne, P, G, Z, W, J, ue, ce, K;
  const r = t.familyOptions ?? {}, o = r.series ?? [], s = vu(e, o), l = (D) => n.category(D), c = o.some((D) => D.axis === "right"), u = (g = o.find((D) => D.axis !== "right")) == null ? void 0 : g.member, d = (v = o.find((D) => D.axis === "right")) == null ? void 0 : v.member, p = cn(e, t), h = (R = (_ = t.axes) == null ? void 0 : _.y) != null && R.labelHide ? void 0 : ((A = (N = t.axes) == null ? void 0 : N.y) == null ? void 0 : A.label) ?? (u ? Gt(e, u) : void 0), b = (w = (k = t.axes) == null ? void 0 : k.y2) != null && w.labelHide ? void 0 : (($ = (O = t.axes) == null ? void 0 : O.y2) == null ? void 0 : $.label) ?? (d ? Gt(e, d) : void 0), y = {};
  return o.forEach((D, Y) => {
    const de = D.colorToken ?? ge[Y % ge.length];
    y[D.member] = {
      label: D.label ?? Gt(e, D.member),
      color: `var(--${de})`
    };
  }), /* @__PURE__ */ i(qe, { config: y, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(Ho, { accessibilityLayer: !0, data: s, children: [
    /* @__PURE__ */ i(Dt, { vertical: !1 }),
    /* @__PURE__ */ i(
      nt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (j = (V = t.axes) == null ? void 0 : V.x) == null ? void 0 : j.hide,
        tickFormatter: l,
        label: p.x ? { value: p.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Te,
      {
        yAxisId: "left",
        type: "number",
        hide: (q = (E = t.axes) == null ? void 0 : E.y) == null ? void 0 : q.hide,
        scale: ze((M = t.axes) == null ? void 0 : M.y),
        domain: De((S = t.axes) == null ? void 0 : S.y),
        tickFormatter: (D) => n.value(D, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    c && /* @__PURE__ */ i(
      Te,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (ne = (B = t.axes) == null ? void 0 : B.y2) == null ? void 0 : ne.hide,
        scale: ze((P = t.axes) == null ? void 0 : P.y2),
        domain: De((G = t.axes) == null ? void 0 : G.y2),
        tickFormatter: (D) => n.value(D, d, "axis"),
        label: b ? { value: b, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((Z = t.tooltip) == null ? void 0 : Z.show) !== !1 && /* @__PURE__ */ i(
      ft,
      {
        content: /* @__PURE__ */ i(
          Xe,
          {
            labelFormatter: (D) => n.category(D),
            indicator: ((W = t.tooltip) == null ? void 0 : W.indicator) ?? "dot",
            valueFormatter: $t(n)
          }
        )
      }
    ),
    ve(t).show && /* @__PURE__ */ i(
      pt,
      {
        content: /* @__PURE__ */ i(Ze, { className: ve(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: ut((J = t.legend) == null ? void 0 : J.position),
        layout: mt((ue = t.legend) == null ? void 0 : ue.position),
        align: dt((ce = t.legend) == null ? void 0 : ce.position)
      }
    ),
    o.map((D) => yu(D, e, r)),
    (K = r.referenceLines) == null ? void 0 : K.map((D, Y) => /* @__PURE__ */ i(
      zt,
      {
        yAxisId: "left",
        ...D.axis === "y" ? { y: D.value } : { x: D.value },
        label: D.label,
        stroke: `var(--${D.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      Y
    ))
  ] }) });
}
function yu(e, t, n) {
  const a = e.axis === "right" ? "right" : "left", r = `var(${ar(e.member)})`, o = e.label ?? Gt(t, e.member), s = e.curve ?? n.curve ?? "monotone", l = e.dots ?? n.dots ?? !1, c = n.connectNulls ?? !1;
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
    ba,
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
function vu(e, t) {
  var o, s, l;
  const n = new Map(e.series.map((c) => [c.key, c]));
  if (t.every((c) => n.has(c.member)) && e.categories.length > 0)
    return e.categories.map((c, u) => {
      var p;
      const d = {
        __cat: typeof c == "number" ? c : String(c)
      };
      for (const h of t) d[h.member] = ((p = n.get(h.member)) == null ? void 0 : p.data[u]) ?? null;
      return d;
    });
  const r = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((l = (s = e.raw.query.timeDimensions) == null ? void 0 : s[0]) == null ? void 0 : l.dimension);
  return e.raw.rows.map((c) => {
    const u = r ? c[r] : void 0, d = {
      __cat: u == null ? "" : String(u)
    };
    for (const p of t) d[p.member] = xu(c[p.member]);
    return d;
  });
}
function Gt(e, t) {
  var n, a, r, o;
  return ((a = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : a.shortTitle) ?? ((o = (r = e.raw.annotation) == null ? void 0 : r.measures[t]) == null ? void 0 : o.title) ?? t;
}
function xu(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const so = {
  bar: Vc,
  line: qc,
  area: Kc,
  pie: Bc,
  scatter: Wc,
  kpi: Zc,
  table: lu,
  combo: bu
};
function ku({
  data: e,
  options: t,
  config: n,
  format: a,
  state: r,
  components: o,
  editing: s
}) {
  const l = $c(t);
  if (r != null && r.loading)
    return /* @__PURE__ */ i(Nc, { className: "h-full w-full min-h-[200px]" });
  if (r != null && r.error)
    return /* @__PURE__ */ f(or, { variant: "destructive", className: "w-full", children: [
      /* @__PURE__ */ i(ka, {}),
      /* @__PURE__ */ i(ir, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(sr, { children: r.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "flex h-full w-full min-h-[200px] items-center justify-center text-sm text-muted-foreground", children: "No data" });
  const c = n && Object.keys(n).length > 0 ? n : jc(e), u = a ?? Ua(e.raw.annotation, l, rr), d = (o == null ? void 0 : o[l.family]) ?? so[l.family];
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
const pr = xa(null);
pr.displayName = "CubeVizContext";
function Ke() {
  const e = Yn(pr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function Nu(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Kf({
  cube: e,
  theme: t,
  locale: n,
  registry: a,
  children: r
}) {
  const o = Q(
    () => Nu(e) ? rs(e) : e,
    [e]
  ), s = Q(
    () => {
      var d;
      return {
        chartRamp: (d = t == null ? void 0 : t.chartRamp) != null && d.length ? t.chartRamp : ge,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), l = Q(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), c = Q(() => a ?? {}, [a]), u = Q(
    () => ({
      cubeClient: o,
      registry: c,
      locale: l,
      theme: s
    }),
    [o, c, l, s]
  );
  return /* @__PURE__ */ i(pr.Provider, { value: u, children: /* @__PURE__ */ i(
    "div",
    {
      className: C(
        "contents",
        s.mode === "dark" && "dark",
        s.mode === "light" && "cube-viz-light"
      ),
      children: r
    }
  ) });
}
function wu(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? so[t];
}
const Cu = 5e3;
function _u(e, t) {
  const { cubeClient: n } = Ke(), a = (t == null ? void 0 : t.skip) ?? !1, r = Q(
    () => e.limit === void 0 ? { ...e, limit: Cu } : e,
    [e]
  ), o = Q(() => JSON.stringify(r), [r]), [s, l] = rt({ isLoading: !a }), [c, u] = rt(0), d = Ee(() => u((p) => p + 1), []);
  return Lt(() => {
    if (a) {
      l({ isLoading: !1 });
      return;
    }
    let p = !0;
    return l((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(r, { castNumerics: !0 }).then((h) => {
      p && l({
        resultSet: h,
        isLoading: !1
      });
    }).catch((h) => {
      p && l({
        isLoading: !1,
        error: h instanceof Error ? h : new Error(String(h))
      });
    }), () => {
      p = !1;
    };
  }, [n, o, a, c]), { ...s, refetch: d };
}
const un = xa(null);
un.displayName = "DashboardContext";
function hr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const a = e.variables, r = xt(null);
  (r.current === null || r.current.key !== a) && (r.current = { store: ws(a, t), key: a });
  const o = r.current.store, s = Su(o, a);
  return Wo(un.Provider, { value: s }, n);
}
function Su(e, t) {
  const n = Go(
    e.subscribe,
    e.getAll,
    e.getAll
  ), a = Ee(
    (s, l) => e.set(s, l),
    [e]
  ), r = Ee(
    (s) => Ns(s, e.getAll(), t),
    [e, t]
  ), o = Ee(
    (s) => ys(s, e.getAll(), t),
    [e, t]
  );
  return Q(
    () => ({ vars: n, setVar: a, resolveQuery: r, resolveValue: o, decls: t }),
    [n, a, r, o, t]
  );
}
function lo() {
  const e = Yn(un);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function gr() {
  return Yn(un);
}
function Rn(e, t, n) {
  var b;
  const a = gr(), { locale: r } = Ke(), o = Q(
    () => a && !(n != null && n.skipResolve) ? a.resolveQuery(e) : e,
    [a, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: s, isLoading: l, error: c, refetch: u } = _u(o, { skip: n == null ? void 0 : n.skip }), d = ((b = t.format) == null ? void 0 : b.unitSystem) ?? (r == null ? void 0 : r.unitSystem), p = Q(() => ln(r == null ? void 0 : r.units), [r == null ? void 0 : r.units]);
  return { data: Q(() => {
    if (s)
      return ds(s, t, o, { unitSystem: d, conversions: p });
  }, [s, t, o, d, p]), isLoading: l, error: c, refetch: u, resolvedQuery: o };
}
function Be() {
  const { cubeClient: e } = Ke(), [t, n] = rt({ isLoading: !0 });
  return Lt(() => {
    let a = !0;
    return n({ isLoading: !0 }), as(e).then((r) => {
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
function Bf() {
  const { locale: e } = Ke(), { formatValue: t, units: n } = e;
  return Q(
    () => t ?? Ya(ln(n)),
    [t, n]
  );
}
function co() {
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
      const p = new ResizeObserver((h) => {
        var b, y;
        for (const g of h) {
          const v = ((y = (b = g.contentBoxSize) == null ? void 0 : b[0]) == null ? void 0 : y.inlineSize) ?? g.contentRect.width;
          s(v);
        }
      });
      p.observe(u), a.current = p;
    },
    [s, l]
  );
  return Lt(() => l, [l]), [c, e];
}
const Ru = "day";
function Au(e, t) {
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
        granularity: a.granularity ?? Ru,
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
const te = (e) => fe(e, "yyyy-MM-dd");
function Mu(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const r = Yt(e[0]), o = Yt(e[1]);
    if (Number.isNaN(r.getTime()) || Number.isNaN(o.getTime())) return;
    const s = _i(o, r) + 1;
    return [te(ke(r, s)), te(ke(r, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const r = ke(t, 1);
    return [te(r), te(r)];
  }
  if (n === "yesterday") {
    const r = ke(t, 2);
    return [te(r), te(r)];
  }
  const a = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (a) {
    const r = Number(a[1]), o = a[2];
    if (o.startsWith("day")) return [te(ke(t, 2 * r - 1)), te(ke(t, r))];
    if (o.startsWith("week")) return [te(ke(t, 14 * r - 1)), te(ke(t, 7 * r))];
    if (o.startsWith("month"))
      return [te(gn(bn(t, 2 * r))), te(ke(gn(bn(t, r)), 1))];
    if (o.startsWith("quarter"))
      return [te(yn(vn(t, 2 * r))), te(ke(yn(vn(t, r)), 1))];
    if (o.startsWith("year"))
      return [te(xn(kn(t, 2 * r))), te(ke(xn(kn(t, r)), 1))];
  }
  if (n === "this week") {
    const r = Si(t, 1);
    return [te(Ri(r)), te(Ai(r))];
  }
  if (n === "this month") {
    const r = bn(t, 1);
    return [te(gn(r)), te(Mi(r))];
  }
  if (n === "this quarter") {
    const r = vn(t, 1);
    return [te(yn(r)), te(Oi(r))];
  }
  if (n === "this year") {
    const r = kn(t, 1);
    return [te(xn(r)), te(Di(r))];
  }
}
function Ou(e, t) {
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
  const s = Mu(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...r, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const Du = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function br({ query: e, chart: t, onState: n, editing: a }) {
  const { registry: r, locale: o } = Ke(), s = Q(() => {
    var w;
    return (w = t.format) != null && w.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), l = Q(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: c, isLoading: u, error: d, refetch: p, resolvedQuery: h } = Rn(l, s), b = Q(() => Au(l, s), [l, s]), y = Rn(
    (b == null ? void 0 : b.query) ?? l,
    (b == null ? void 0 : b.chart) ?? s,
    { skip: !b }
  ), g = Q(
    () => Ou(h, s),
    [h, s]
  ), v = Rn(
    (g == null ? void 0 : g.query) ?? l,
    s,
    { skip: !g, skipResolve: !0 }
  ), _ = Q(
    () => ({ [s.family]: wu(r, s.family) }),
    [r, s.family]
  ), R = Q(() => {
    let w = c ?? Du;
    if (b && y.data && (w = { ...w, series: y.data.series, categories: y.data.categories }), g && v.data) {
      if (g.mode === "kpiRow") {
        const O = v.data.raw.rows[0];
        if (O) {
          const $ = w.raw.rows[0];
          w = {
            ...w,
            raw: { ...w.raw, rows: $ ? [$, O] : [O] }
          };
        }
      } else if (w.series.length > 0) {
        const O = v.data.series.map(($) => {
          const V = w.series.find((j) => j.key === $.key);
          return {
            ...$,
            key: `${$.key}__prev`,
            label: `${(V == null ? void 0 : V.label) ?? $.label} (prev)`,
            colorToken: (V == null ? void 0 : V.colorToken) ?? $.colorToken,
            meta: { ...$.meta, companion: !0 }
          };
        });
        w = { ...w, series: [...w.series, ...O] };
      }
    }
    return w;
  }, [c, b, y.data, g, v.data]);
  Lt(() => {
    n == null || n({ rows: R.raw.rows, refetch: p, isLoading: u });
  }, [n, R.raw.rows, p, u]);
  const N = {}, A = Q(
    () => o.formatValue ?? Ya(ln(o.units)),
    [o.formatValue, o.units]
  ), k = Q(
    () => Ua(R.raw.annotation, s, A, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [R.raw.annotation, s, A, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    ku,
    {
      data: R,
      options: s,
      config: N,
      format: k,
      state: { loading: u && !c, error: d },
      components: _,
      editing: a
    }
  );
}
function zu({ spec: e }) {
  return /* @__PURE__ */ i(br, { query: e.query, chart: e.chart });
}
const uo = [
  "max-w-none text-sm leading-relaxed text-foreground",
  "[&>:first-child]:mt-0 [&>:last-child]:mb-0",
  "[&_h1]:mb-2 [&_h1]:mt-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight",
  "[&_h2]:mb-2 [&_h2]:mt-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight",
  "[&_h3]:mb-1.5 [&_h3]:mt-3 [&_h3]:text-lg [&_h3]:font-semibold",
  "[&_h4]:mb-1 [&_h4]:mt-2 [&_h4]:text-base [&_h4]:font-semibold",
  "[&_p]:my-1.5",
  "[&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_ol]:my-1.5 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_li]:my-0.5 [&_li>p]:my-0",
  "[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]",
  "[&_pre]:my-2 [&_pre]:overflow-auto [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_hr]:my-3 [&_hr]:border-border",
  "[&_a]:text-primary [&_a]:underline",
  "[&_strong]:font-semibold [&_em]:italic"
].join(" ");
function Lu(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function Tu({ doc: e }) {
  const t = Lu(e), n = Q(
    () => t ? e : null,
    [t, e]
  ), a = Fa(
    {
      extensions: [Pa],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: C(uo) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i($a, { editor: a }) : /* @__PURE__ */ i("div", { className: "text-sm text-muted-foreground", children: "Unsupported text content" });
}
function mo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...a
}) {
  return /* @__PURE__ */ i(
    zi,
    {
      showOutsideDays: n,
      className: C("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1 absolute inset-x-0 top-1 justify-between px-1",
        button_previous: C(
          Wt({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_next: C(
          Wt({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: C(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].range_start)]:rounded-l-md [&:has([aria-selected].range_end)]:rounded-r-md",
          a.mode === "range" ? "[&:has(>.range_end)]:rounded-r-md [&:has(>.range_start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day_button: C(
          Wt({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        range_start: "range_start aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end: "range_end aria-selected:bg-primary aria-selected:text-primary-foreground",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside: "outside text-muted-foreground aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...t
      },
      components: {
        Chevron: ({ orientation: r, className: o, ...s }) => /* @__PURE__ */ i(r === "left" ? Na : Xn, { className: C("size-4", o), ...s })
      },
      ...a
    }
  );
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ i(Ut.Root, { "data-slot": "popover", ...e });
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ i(Ut.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Me({
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
      className: C(
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
function _e({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    be.Trigger,
    {
      "data-slot": "select-trigger",
      className: C(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
function Fu({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: C("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Zo, { className: "size-4" })
    }
  );
}
function $u({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: C("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(lt, { className: "size-4" })
    }
  );
}
function Se({
  className: e,
  children: t,
  position: n = "popper",
  ...a
}) {
  return /* @__PURE__ */ i(be.Portal, { children: /* @__PURE__ */ f(
    be.Content,
    {
      "data-slot": "select-content",
      className: C(
        "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...a,
      children: [
        /* @__PURE__ */ i(Fu, {}),
        /* @__PURE__ */ i(
          be.Viewport,
          {
            className: C(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i($u, {})
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
      className: C("px-2 py-1.5 text-xs font-medium text-muted-foreground", e),
      ...t
    }
  );
}
function he({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    be.Item,
    {
      "data-slot": "select-item",
      className: C(
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
const ot = C(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm",
  "shadow-sm transition-colors placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50"
), Pu = "mb-1 block text-xs font-medium text-muted-foreground", Nt = "yyyy-MM-dd", ju = ["This month", "last 7 days", "last 30 days", "last quarter"];
function Eu(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function Jr(e) {
  if (!e) return;
  const t = La(e, Nt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Iu({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, r = a.presets ?? ju, [o, s] = rt(!1), l = typeof e == "string", [c, u] = Eu(e), d = Jr(c), p = Jr(u), h = d ? { from: d, to: p } : void 0;
  let b;
  l ? b = e : d && p ? b = `${fe(d, "MMM d, yyyy")} – ${fe(p, "MMM d, yyyy")}` : d ? b = fe(d, "MMM d, yyyy") : b = "Pick a date range";
  const y = a.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ f(Re, { open: o, onOpenChange: s, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(
      H,
      {
        variant: "outline",
        className: C(
          "w-full justify-start text-left font-normal",
          b === "Pick a date range" && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(wa, { className: "mr-2 size-4" }),
          b
        ]
      }
    ) }),
    /* @__PURE__ */ f(Me, { className: "flex w-auto gap-2 p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "flex flex-col gap-1 border-r pr-2", children: r.map((g) => /* @__PURE__ */ i(
        H,
        {
          variant: "ghost",
          size: "sm",
          className: "justify-start font-normal",
          onClick: () => {
            t(g), s(!1);
          },
          children: g
        },
        g
      )) }),
      /* @__PURE__ */ i(
        mo,
        {
          mode: "range",
          selected: h,
          defaultMonth: d,
          disabled: y,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([fe(g.from, Nt), fe(g.to, Nt)]) : g != null && g.from ? t([fe(g.from, Nt), fe(g.from, Nt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Vu = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function qu(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Ku(e) {
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
function Bu({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { resolveValue: r } = lo(), o = a.rangeVariable ? Ku(r(a.rangeVariable)) : void 0, s = a.options ?? (o !== void 0 ? qu(o) : Vu), l = typeof e == "string" ? e : "", c = s.join(",");
  return Lt(() => {
    l && !s.includes(l) && t(s[0]);
  }, [l, c]), /* @__PURE__ */ f(
    we,
    {
      value: l,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(_e, { className: ot, children: /* @__PURE__ */ i(Ce, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Se, { children: s.map((u) => /* @__PURE__ */ i(he, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Hu({ value: e, onChange: t, control: n }) {
  const a = n;
  if (a.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((s) => String(s))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: C(ot, "h-auto min-h-[6rem]"),
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
        /* @__PURE__ */ i(_e, { className: ot, children: /* @__PURE__ */ i(Ce, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Se, { children: a.options.map((o) => /* @__PURE__ */ i(he, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function Wu({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { meta: r, isLoading: o } = Be(), s = Q(() => {
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
function Gu({ value: e, onChange: t, control: n }) {
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
function Uu({ value: e, onChange: t, control: n }) {
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
function Yu({ value: e, onChange: t, decl: n }) {
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
const Qu = {
  dateRange: Iu,
  granularity: Bu,
  select: Hu,
  memberSelect: Wu,
  text: Gu,
  number: Uu,
  toggle: Yu
};
function Ju({ control: e, title: t }) {
  var b;
  const { registry: n } = Ke(), { decls: a, resolveValue: r, setVar: o } = lo(), s = Q(
    () => a.find((y) => y.name === e.variable),
    [a, e.variable]
  );
  if (!s)
    return /* @__PURE__ */ f("div", { className: "text-sm text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, c = ((b = n.controls) == null ? void 0 : b[l]) ?? Qu[l], u = r(e.variable), d = (y) => o(e.variable, y), p = t ?? s.label ?? s.name, h = Uo();
  return l === "toggle" ? /* @__PURE__ */ i(c, { value: u, onChange: d, decl: s, control: e.control }) : /* @__PURE__ */ f("div", { children: [
    /* @__PURE__ */ i("label", { className: Pu, htmlFor: h, children: p }),
    /* @__PURE__ */ i(
      c,
      {
        value: u,
        onChange: d,
        decl: s,
        control: e.control,
        controlId: h
      }
    )
  ] });
}
const Zt = "cube-viz-drag-handle";
function fo(e) {
  var l;
  const { registry: t } = Ke(), n = (l = t.chrome) == null ? void 0 : l.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: a, menu: r, dragHandleProps: o, children: s } = e;
  return /* @__PURE__ */ f(dr, { className: "flex h-full w-full flex-col overflow-hidden", children: [
    a ? /* @__PURE__ */ f(
      eo,
      {
        ...o,
        className: C(
          Zt,
          "flex shrink-0 cursor-grab flex-row items-center justify-between gap-2",
          "border-b border-border px-4 py-2.5 active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(to, { className: "truncate text-sm", children: a }),
          r
        ]
      }
    ) : null,
    /* @__PURE__ */ i(fr, { className: "min-h-0 flex-1 overflow-auto p-4", children: s })
  ] });
}
function Xu(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const s = o == null ? "" : String(o);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }, a = t.map(n).join(","), r = e.map((o) => t.map((s) => n(o[s])).join(",")).join(`
`);
  return `${a}
${r}`;
}
function Zu(e, t, n = "text/csv;charset=utf-8") {
  const a = new Blob([e], { type: n }), r = URL.createObjectURL(a), o = document.createElement("a");
  o.href = r, o.download = t, o.click(), URL.revokeObjectURL(r);
}
function em({ title: e, rows: t, refetch: n }) {
  const a = t.length > 0;
  if (!a && !n) return null;
  const r = () => {
    const s = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Zu(Xu(t), `${s}.csv`);
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
        children: /* @__PURE__ */ i(ei, { className: "size-4" })
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
            /* @__PURE__ */ i(ti, { className: "size-3.5 text-muted-foreground" }),
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
          className: C(
            "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
            !a && "cursor-not-allowed opacity-50"
          ),
          children: [
            /* @__PURE__ */ i(ni, { className: "size-3.5 text-muted-foreground" }),
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
      return /* @__PURE__ */ i(br, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(Tu, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(Ju, { control: e.control, title: e.title });
  }
}
function po({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [a, r] = rt({ rows: [] }), o = Ee(
    (l) => r({ rows: l.rows, refetch: l.refetch }),
    []
  );
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "h-full w-full overflow-auto p-2", children: /* @__PURE__ */ i(Xr, { widget: e }) });
  const s = n ? null : /* @__PURE__ */ i(em, { title: e.title, rows: a.rows, refetch: a.refetch });
  return /* @__PURE__ */ i(
    fo,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i(Xr, { widget: e, onState: o })
    }
  );
}
const tm = "lg";
function nm(e) {
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
function rm(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Hf({ spec: e, editable: t = !1 }) {
  const [n, a] = co(), r = e.grid ?? {}, o = r.cols ?? 12, s = r.rowHeight ?? 40, l = r.margin ?? [12, 12], c = r.containerPadding ?? [0, 0], { breakpoints: u, cols: d } = Q(
    () => nm(o),
    [o]
  ), p = Q(
    () => ({ [tm]: rm(e.layout) }),
    [e.layout]
  ), h = Q(
    () => new Map(e.widgets.map((b) => [b.id, b])),
    [e.widgets]
  );
  return /* @__PURE__ */ i(hr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "w-full", children: a > 0 ? /* @__PURE__ */ i(
    Ta,
    {
      width: a,
      layouts: p,
      breakpoints: u,
      cols: d,
      rowHeight: s,
      margin: l,
      containerPadding: c,
      dragConfig: { enabled: t, handle: `.${Zt}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((b) => {
        const y = h.get(b.i);
        return y ? /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(po, { widget: y, editable: t }) }, b.i) : null;
      })
    }
  ) : null }) });
}
function Wf({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(
    fo,
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
      children: /* @__PURE__ */ i(zu, { spec: e })
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
function yr(e) {
  return e.shortTitle || e.title || e.name;
}
function en(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function ho(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: yr(e),
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
function Vn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: yr(e),
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
function go(e, t) {
  return {
    name: e.name,
    label: yr(e),
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
        Ue(l) && s(ho(l, r.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const l of r.dimensions)
        Ue(l) && l.type !== "time" && s(Vn(l, r.name));
    if (t === "time")
      for (const l of r.dimensions)
        Ue(l) && l.type === "time" && s(Vn(l, r.name));
  }
  return a;
}
function am(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, a = [];
  for (const r of e.cubes) {
    if (!Ue(r) || n && !n.has(r.name)) continue;
    const o = mn(r);
    for (const s of r.segments) {
      if (!Ue(s)) continue;
      const l = go(s, r.name);
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
        return o.type ? "aggType" in o ? r(ho(o, n.name)) : r(Vn(o, n.name)) : void 0;
      const s = n.segments.find((l) => l.name === t);
      if (s) return r(go(s, n.name));
    }
}
function om(e) {
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
]), bo = {
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
function yo(e) {
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
function ht(e) {
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
function vo(e, t) {
  const n = {};
  for (const r of e) {
    const o = t[r];
    o && Object.keys(o).length > 0 && (n[r] = o);
  }
  const a = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (a.meta = n), a;
}
const xo = {
  bar: "Bar",
  line: "Line",
  area: "Area",
  pie: "Pie",
  scatter: "Scatter",
  kpi: "KPI",
  table: "Table",
  combo: "Combo"
}, im = "day";
function sm(e, t) {
  var u, d, p, h;
  const { query: n, chart: a } = e, r = it(a).length ? it(a) : n.measures ?? [], o = ye(a) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((p = (d = n.timeDimensions) == null ? void 0 : d[0]) == null ? void 0 : p.dimension), s = o ? { category: { member: o }, series: { mode: "measures", members: r } } : void 0, l = {
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
        ...((h = n.timeDimensions) == null ? void 0 : h.map((y) => y.dimension)) ?? [],
        ...r
      ].map((y) => ({ member: y }));
      return c({ familyOptions: b.length ? { columns: b } : void 0 });
    }
  }
}
function vt(e) {
  return gc(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function Bn(e) {
  return yc(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
const Zr = "a date or category";
function lm(e) {
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
function fn(e) {
  const t = xe(e).series;
  return Array.isArray(t) ? t : [];
}
function vr(e) {
  const t = xe(e).columns;
  return Array.isArray(t) ? t : [];
}
function cm(e) {
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
      const o = cm(e), s = (r = t.mapping) == null ? void 0 : r.series;
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
      return { columns: vr(e).map((o) => o.member) };
  }
}
function pn(e) {
  const t = um(e);
  return t === void 0 ? im : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function um(e) {
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
function Fe(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function Je(e, t, n) {
  if (e)
    return { category: { member: e }, series: vo(t, n) };
}
function tn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function nn(e, t, n, a) {
  if (!e || t.length === 0) return;
  const r = {};
  for (const l of t) {
    const c = a == null ? void 0 : a[l];
    c && Object.keys(c).length > 0 && (r[l] = c);
  }
  const o = Object.keys(r).length > 0, s = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: r } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: r } : {} };
  return { category: { member: e }, series: s };
}
function ea(e, t, n, a, r) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return dm(e, n, a, r);
    case "combo":
      return hm(e, n, a, r);
    case "pie":
      return ym(e, n, a, r);
    case "scatter":
      return xm(e, n, a);
    case "kpi":
      return Nm(e, a);
    case "table":
      return Cm(e, a, r);
  }
}
function mm(e, t, n, a) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return pm(e, n, a);
    case "combo":
      return bm(e, n, a);
    case "pie":
      return vm(e, n, a);
    case "scatter":
      return km(e, n, a);
    case "kpi":
      return wm(e, a);
    case "table":
      return _m(e, a);
  }
}
function dm(e, t, n, a) {
  const { query: r, chart: o } = e, s = Pt(e), l = s.color[0], c = ye(o), u = ht(o);
  if (t === "y") {
    const d = s.y, p = jt(d, n);
    return l ? {
      ...e,
      query: { ...r, measures: p },
      chart: { ...o, mapping: nn(c, p, l, tn(o)) }
    } : {
      ...e,
      query: { ...r, measures: p },
      chart: { ...o, mapping: Je(c, p, u) }
    };
  }
  if (t === "x")
    return fm(e, n, a, l);
  if (t === "color") {
    const d = s.y;
    if (d.length === 0) return e;
    const p = gt({ ...r, measures: d }, n);
    return {
      ...e,
      query: p,
      chart: { ...o, mapping: nn(c, d, n, tn(o)) }
    };
  }
  return e;
}
function fm(e, t, n, a) {
  const { query: r, chart: o } = e, s = ye(o), l = Pt(e).y, c = ht(o);
  let u = r;
  const d = He(r);
  if (d && s === d.dimension ? u = Fe(u, void 0) : s && (u = Le(u, s)), n === "time") {
    const h = (d == null ? void 0 : d.granularity) ?? pn(d == null ? void 0 : d.dateRange);
    u = Fe(u, {
      dimension: t,
      granularity: h,
      dateRange: d == null ? void 0 : d.dateRange
    });
  } else
    u = gt(u, t);
  const p = a ? nn(t, l, a, tn(o)) : Je(t, l, c);
  return { ...e, query: u, chart: { ...o, mapping: p } };
}
function pm(e, t, n) {
  const { query: a, chart: r } = e, o = Pt(e), s = ye(r), l = o.color[0], c = ht(r);
  if (t === "y") {
    const u = Qe(o.y, n);
    if (l && u.length >= 1)
      return {
        ...e,
        query: { ...a, measures: u },
        chart: { ...r, mapping: nn(s, u, l, tn(r)) }
      };
    const d = l ? Le({ ...a, measures: u }, l) : { ...a, measures: u };
    return { ...e, query: d, chart: { ...r, mapping: Je(s, u, c) } };
  }
  if (t === "x") {
    let u = a;
    const d = He(a);
    return d && d.dimension === n ? u = Fe(u, void 0) : u = Le(u, n), { ...e, query: u, chart: { ...r, mapping: void 0 } };
  }
  if (t === "color") {
    const u = Le(a, n);
    return {
      ...e,
      query: u,
      chart: { ...r, mapping: Je(s, o.y, c) }
    };
  }
  return e;
}
const ta = ["line", "bar"];
function hm(e, t, n, a) {
  const { query: r, chart: o } = e, s = xe(e);
  if (t === "x") {
    let l = r;
    const c = ye(o), u = He(r);
    if (u && c === u.dimension ? l = Fe(l, void 0) : c && (l = Le(l, c)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? pn(u == null ? void 0 : u.dateRange);
      l = Fe(l, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      l = gt(l, n);
    return { ...e, query: l, chart: { ...o, mapping: { category: { member: n }, series: gm(e) } } };
  }
  if (t === "y") {
    const l = fn(e);
    if (l.some((d) => d.member === n)) return e;
    const c = ta[l.length % ta.length], u = [...l, { member: n, render: c }];
    return {
      ...e,
      query: { ...r, measures: jt(r.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...s, series: u }, mapping: ko(o, u) }
    };
  }
  return e;
}
function ko(e, t) {
  const n = ye(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((a) => a.member) } } : e.mapping;
}
function gm(e) {
  return { mode: "measures", members: fn(e).map((t) => t.member) };
}
function bm(e, t, n) {
  const { query: a, chart: r } = e, o = xe(e);
  if (t === "x") {
    let s = a;
    const l = He(a);
    return l && l.dimension === n ? s = Fe(s, void 0) : s = Le(s, n), { ...e, query: s, chart: { ...r, mapping: void 0 } };
  }
  if (t === "y") {
    const s = fn(e).filter((c) => c.member !== n), l = Qe(a.measures, n);
    return {
      ...e,
      query: { ...a, measures: l },
      chart: { ...r, familyOptions: { ...o, series: s }, mapping: ko(r, s) }
    };
  }
  return e;
}
function ym(e, t, n, a) {
  const { query: r, chart: o } = e, s = ht(o);
  if (t === "slices") {
    let l = r;
    const c = ye(o), u = He(r);
    if (u && c === u.dimension ? l = Fe(l, void 0) : c && (l = Le(l, c)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? pn(u == null ? void 0 : u.dateRange);
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
function vm(e, t, n) {
  const { query: a, chart: r } = e, o = ht(r);
  if (t === "slices") {
    let s = a;
    const l = He(a);
    return l && l.dimension === n ? s = Fe(s, void 0) : s = Le(s, n), { ...e, query: s, chart: { ...r, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...a, measures: [] },
    chart: { ...r, mapping: Je(ye(r), [], o) }
  } : e;
}
const No = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function xm(e, t, n) {
  const a = No[t];
  if (!a) return e;
  const { query: r, chart: o } = e, s = { ...xe(e) }, l = s[a];
  s[a] = n;
  let c = r;
  if (a === "groupBy")
    l && l !== n && (c = Le(c, l)), c = gt(c, n);
  else {
    const u = l ? Qe(r.measures, l) : r.measures;
    c = { ...r, measures: jt(u, n) };
  }
  return { ...e, query: c, chart: { ...o, familyOptions: s } };
}
function km(e, t, n) {
  const a = No[t];
  if (!a) return e;
  const { query: r, chart: o } = e, s = { ...xe(e) };
  delete s[a];
  let l = r;
  if (a === "groupBy") l = Le(l, n);
  else {
    const c = Qe(r.measures, n);
    l = { ...r, measures: c.length ? c : [] };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: s } };
}
function Nm(e, t) {
  const { query: n, chart: a } = e, r = { ...xe(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...a, familyOptions: r } };
}
function wm(e, t) {
  const { query: n, chart: a } = e, r = { ...xe(e) };
  return r.measure === t && delete r.measure, { ...e, query: { ...n, measures: [] }, chart: { ...a, familyOptions: r } };
}
function Cm(e, t, n) {
  const { query: a, chart: r } = e, o = vr(e);
  if (o.some((c) => c.member === t)) return e;
  let s = a;
  if (n === "number") s = { ...a, measures: jt(a.measures, t) };
  else if (n === "time") {
    const c = He(a), u = (c == null ? void 0 : c.granularity) ?? pn(c == null ? void 0 : c.dateRange), d = a.timeDimensions ?? [];
    d.some((p) => p.dimension === t) || (s = { ...a, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else s = gt(a, t);
  const l = { ...xe(e), columns: [...o, { member: t }] };
  return { ...e, query: s, chart: { ...r, familyOptions: l } };
}
function _m(e, t) {
  var d, p, h;
  const { query: n, chart: a } = e, r = vr(e).filter((b) => b.member !== t);
  let o = n;
  const s = Qe(n.measures, t);
  s.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: s.length ? s : void 0 });
  const l = Qe(n.dimensions, t);
  l.length !== (((p = n.dimensions) == null ? void 0 : p.length) ?? 0) && (o = { ...o, dimensions: l.length ? l : void 0 });
  const c = (n.timeDimensions ?? []).filter((b) => b.dimension !== t);
  c.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: c.length ? c : void 0 });
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
      className: C(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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
      return /* @__PURE__ */ i(_a, { className: "size-3.5 shrink-0 text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(Ca, { className: "size-3.5 shrink-0 text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(Zn, { className: "size-3.5 shrink-0 text-muted-foreground" });
  }
}
function wo({
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
  const { meta: u, isLoading: d } = Be(), p = x.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return qn(u, n).filter((g) => y.has(g.cube));
    }
    return qn(u, n, e);
  }, [u, n, e, t]), h = x.useMemo(() => Sm(p), [p]), b = p.find((y) => y.name === a);
  return /* @__PURE__ */ f(we, { value: a, onValueChange: r, disabled: s || d, children: [
    /* @__PURE__ */ i(_e, { id: l, className: c, children: /* @__PURE__ */ i(Ce, { placeholder: d ? "Loading…" : o, children: b ? /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
      rn(b.type),
      /* @__PURE__ */ i("span", { className: "truncate", children: b.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Se, { children: h.map(([y, g]) => /* @__PURE__ */ f(En, { children: [
      h.length > 1 ? /* @__PURE__ */ i(In, { children: y }) : null,
      g.map((v) => /* @__PURE__ */ i(he, { value: v.name, children: /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
        rn(v.type),
        /* @__PURE__ */ i("span", { className: "truncate", children: v.label })
      ] }) }, v.name))
    ] }, y)) })
  ] });
}
function Sm(e) {
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
      className: C(
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
            className: C(
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
const Rm = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(Ca, { className: "size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(Zn, { className: "size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(_a, { className: "size-3" }), metaKind: "time" }
}, Am = ["number", "category", "time"];
function Co({
  well: e,
  placed: t,
  scope: n,
  blockReason: a,
  onSelect: r,
  align: o = "start",
  side: s = "bottom",
  children: l
}) {
  var E, q;
  const { meta: c, isLoading: u } = Be(), [d, p] = x.useState(!1), [h, b] = x.useState(""), [y, g] = x.useState(n.viewLocked ?? "tables"), [v, _] = x.useState({});
  x.useEffect(() => {
    d && g(n.viewLocked ?? "tables");
  }, [d, n.viewLocked]);
  const R = x.useMemo(() => new Set(t), [t]), N = h.trim().toLowerCase(), A = x.useMemo(() => {
    if (y !== "tables") {
      const S = n.views.find((B) => B.name === y) ?? Rt(c, y);
      return S ? [{ cube: S, tag: "dataset" }] : [];
    }
    const M = [];
    n.sourceCube && M.push({ cube: n.sourceCube, tag: "source" });
    for (const S of n.relatedCubes) M.push({ cube: S, tag: "related" });
    return M;
  }, [y, n, c]), k = e.kinds.length > 1, w = (M) => Am.filter((S) => e.kinds.includes(S)).map((S) => {
    const B = Rm[S], ne = qn(c, B.metaKind, M).filter((P) => !R.has(P.name)).filter((P) => N ? P.label.toLowerCase().includes(N) || P.name.toLowerCase().includes(N) : !0);
    return { kind: S, label: B.label, icon: B.icon, items: ne };
  }).filter((S) => S.items.length > 0), O = A.map((M) => ({ section: M, groups: w(M.cube.name) })).filter((M) => M.groups.length > 0), $ = O.length > 0, V = (M, S) => {
    r(M, S), p(!1), b("");
  }, j = y === "tables" ? "All related tables" : ((E = n.views.find((M) => M.name === y)) == null ? void 0 : E.title) ?? ((q = Rt(c, y)) == null ? void 0 : q.title) ?? y;
  return /* @__PURE__ */ f(Re, { open: d, onOpenChange: p, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: l }),
    /* @__PURE__ */ f(Me, { align: o, side: s, className: "w-80 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2 pb-1.5", children: [
        /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input bg-background px-2", children: [
          /* @__PURE__ */ i(ri, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: h,
              onChange: (M) => b(M.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(Mm, { browse: y, label: j, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "max-h-80 overflow-y-auto", children: $ ? O.map(({ section: M, groups: S }, B) => {
        const ne = S.reduce((W, J) => W + J.items.length, 0), P = M.tag === "related", G = v[M.cube.name] ?? P, Z = N.length > 0 ? !0 : !G;
        return /* @__PURE__ */ f("div", { children: [
          M.tag === "related" && B > 0 && O[B - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "px-1 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => _((W) => ({ ...W, [M.cube.name]: !G })),
              className: "flex w-full items-center gap-1.5 rounded-sm px-1 py-1 text-left hover:bg-accent/50",
              children: [
                Z ? /* @__PURE__ */ i(lt, { className: "size-3 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ i(Xn, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i(Sa, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "truncate text-xs font-medium", children: M.cube.title }),
                M.tag === "source" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-primary/10 px-1 py-px text-[9px] font-medium uppercase text-primary", children: "Main table" }) : M.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-muted px-1 py-px text-[9px] font-medium uppercase text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "ml-auto shrink-0 pr-1 text-[10px] tabular-nums text-muted-foreground/70", children: ne })
              ]
            }
          ),
          Z ? S.map((W) => /* @__PURE__ */ f("div", { className: "pb-0.5 pl-4", children: [
            k ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 px-2 pb-0.5 pt-1 text-[9px] uppercase tracking-wide text-muted-foreground/70", children: [
              W.icon,
              W.label
            ] }) : null,
            W.items.map((J) => /* @__PURE__ */ i(Om, { option: J, reason: a(J), onPick: () => V(J.name, W.kind) }, J.name))
          ] }, W.kind)) : null
        ] }, M.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "px-1 py-6 text-center text-xs text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function Mm({ browse: e, label: t, views: n, onBrowse: a }) {
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
          /* @__PURE__ */ i(Ra, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ f(Me, { align: "end", className: "w-60 p-1", children: [
      /* @__PURE__ */ i(na, { active: e === "tables", icon: /* @__PURE__ */ i(Sa, { className: "size-3.5" }), onClick: () => s("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ f(ae, { children: [
        /* @__PURE__ */ i("div", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Saved datasets" }),
        n.map((l) => /* @__PURE__ */ i(
          na,
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
      className: C(
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
function Om({ option: e, reason: t, onPick: n }) {
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
const Dm = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Ct = "yyyy-MM-dd";
function zm(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ra(e) {
  if (!e) return;
  const t = La(e, Ct, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function xr({ value: e, onChange: t }) {
  const [n, a] = x.useState(!1), r = typeof e == "string", [o, s] = zm(e), l = ra(o), c = ra(s), u = l ? { from: l, to: c } : void 0, d = r ? e : l && c ? `${fe(l, "MMM d, yyyy")} – ${fe(c, "MMM d, yyyy")}` : l ? fe(l, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ f(Re, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(H, { variant: "outline", size: "sm", className: C("h-8 w-full justify-start gap-1.5 font-normal"), children: [
      /* @__PURE__ */ i(wa, { className: "size-3.5 text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: C("min-w-0 flex-1 truncate text-left", d === "Any time" && "text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ f(Me, { align: "start", className: "flex w-auto gap-2 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex w-32 flex-col gap-0.5 border-r pr-2", children: [
        Dm.map((p) => /* @__PURE__ */ i(
          H,
          {
            variant: "ghost",
            size: "sm",
            className: C("justify-start font-normal", e === p && "bg-accent"),
            onClick: () => {
              t(p), a(!1);
            },
            children: p
          },
          p
        )),
        /* @__PURE__ */ i(
          H,
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
        mo,
        {
          mode: "range",
          selected: u,
          defaultMonth: l,
          onSelect: (p) => {
            p != null && p.from && p.to ? t([fe(p.from, Ct), fe(p.to, Ct)]) : p != null && p.from ? t([fe(p.from, Ct), fe(p.from, Ct)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function Lm(e) {
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
function Tm(e, t) {
  const n = new Set(Lm(t));
  return e.filter((a) => n.has(a.type));
}
function Fm(e) {
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
function $m(e, t, n) {
  const a = new Set(n.map((l) => l.name)), r = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = r, s = 2;
  for (; a.has(o); ) o = `${r}_${s++}`;
  return o;
}
function Pm(e, t, n) {
  const a = Fm(e), r = { name: $m(t, e, n), type: a }, o = t.trim();
  return o && (r.label = o), a === "dateRange" ? r.default = "last 7 days" : a === "granularity" && (r.default = "day"), r;
}
const _o = x.createContext({});
function jm({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(_o.Provider, { value: n, children: t });
}
function Em() {
  return x.useContext(_o);
}
function Im({ kind: e, value: t, onChange: n, className: a }) {
  const r = gr(), o = (r == null ? void 0 : r.decls) ?? [], { createVariable: s } = Em(), [l, c] = x.useState(!1), [u, d] = x.useState(!1), [p, h] = x.useState(""), b = x.useMemo(() => Tm(o, e), [o, e]), y = b.find((_) => _.name === t), g = (_) => {
    n(_), c(!1), d(!1);
  }, v = () => {
    if (!s) return;
    const _ = Pm(e, p || "Variable", o);
    s(_), g(_.name), h("");
  };
  return /* @__PURE__ */ f(
    Re,
    {
      open: l,
      onOpenChange: (_) => {
        c(_), _ || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(H, { variant: "outline", size: "sm", className: C("h-8 w-full justify-start gap-1.5", a), children: [
          /* @__PURE__ */ i(ai, { className: "size-3.5 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: C("min-w-0 flex-1 truncate text-left", !y && "text-muted-foreground"), children: y ? y.label ?? y.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ f(Me, { align: "start", className: "w-60 p-1", children: [
          b.length > 0 ? b.map((_) => /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => g(_.name),
              className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: _.label ?? _.name }),
                /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: _.type }),
                _.name === t ? /* @__PURE__ */ i(Ie, { className: "size-3.5 shrink-0" }) : null
              ]
            },
            _.name
          )) : /* @__PURE__ */ i("p", { className: "px-2 py-1.5 text-xs text-muted-foreground", children: "No matching variables yet." }),
          s ? /* @__PURE__ */ i("div", { className: "mt-1 border-t border-border pt-1", children: u ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1 p-1", children: [
            /* @__PURE__ */ i(
              me,
              {
                autoFocus: !0,
                value: p,
                onChange: (_) => h(_.target.value),
                onKeyDown: (_) => {
                  _.key === "Enter" && v(), _.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "h-7 text-sm"
              }
            ),
            /* @__PURE__ */ i(H, { size: "sm", className: "h-7 shrink-0", onClick: v, children: "Add" })
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
  const l = (c) => C(
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
      Im,
      {
        kind: e,
        value: Ne(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : a(Ne(t) ? void 0 : t, (c) => n(c))
  ] });
}
const Vm = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function An(e) {
  return "member" in e && "operator" in e;
}
function qm({
  cube: e,
  cubes: t,
  scope: n,
  value: a,
  onChange: r,
  disabled: o,
  className: s
}) {
  var j;
  const { meta: l } = Be(), c = ((j = gr()) == null ? void 0 : j.decls) ?? [], [u, d] = x.useState(null), [p, h] = x.useState(null), b = a ?? [], y = b.length === 1 && !An(b[0]) && "or" in b[0] && Array.isArray(b[0].or) && b[0].or.every(An) ? b[0] : void 0, g = y ? "any" : "all", v = [], _ = [];
  y || b.forEach((E) => An(E) ? v.push(E) : _.push(E));
  const R = y ? y.or : v, N = _.length === 0 && (R.length >= 2 || g === "any"), A = (E) => g === "any" ? E.length ? [{ or: E }] : [] : [...E, ..._], k = (E) => {
    const q = E.filter((S) => S.member.length > 0), M = A(q);
    r(M.length > 0 ? M : void 0);
  }, w = (E) => {
    const q = E === "any" ? R.length ? [{ or: R }] : [] : [...R];
    r(q.length > 0 ? q : void 0);
  }, O = (E, q) => k(R.map((M, S) => S === E ? { ...M, ...q } : M)), $ = (E) => k(R.filter((q, M) => M !== E)), V = (E) => {
    const M = { ...p ?? { member: "", operator: "equals", values: [] }, ...E };
    M.member ? (h(null), d(R.length), k([...R, M])) : h(M);
  };
  return /* @__PURE__ */ f("div", { "data-slot": "filter-builder", className: C("flex flex-col gap-2", s), children: [
    R.length === 0 && !p ? /* @__PURE__ */ i("p", { className: "px-1 py-1 text-xs text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
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
          onChange: w
        }
      ),
      /* @__PURE__ */ i("span", { children: "of these" })
    ] }) : null,
    R.map((E, q) => {
      const M = Oe(l, E.member);
      return u === q ? /* @__PURE__ */ i(
        aa,
        {
          leaf: E,
          member: M,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (S) => O(q, S),
          onDone: () => d(null),
          onRemove: () => $(q)
        },
        q
      ) : /* @__PURE__ */ i(
        Km,
        {
          text: Bm(E, M == null ? void 0 : M.label, c),
          disabled: o,
          onEdit: () => d(q),
          onRemove: () => $(q)
        },
        q
      );
    }),
    p ? /* @__PURE__ */ i(
      aa,
      {
        leaf: p,
        member: Oe(l, p.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: V,
        onRemove: () => h(null)
      }
    ) : null,
    _.length > 0 ? /* @__PURE__ */ f("p", { className: "text-xs text-muted-foreground", children: [
      _.length,
      " grouped filter",
      _.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ f(
      H,
      {
        variant: "outline",
        size: "sm",
        className: "w-full justify-start",
        disabled: o || !!p,
        onClick: () => {
          d(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(Tt, { className: "size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Km({
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
      H,
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
  onChange: s,
  onDone: l,
  onRemove: c
}) {
  const u = om(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], p = !Kn.has(d);
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-2.5 rounded-lg border border-ring/50 bg-muted/30 p-3", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ i("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-0.5", children: [
        l && e.member ? /* @__PURE__ */ f(H, { variant: "ghost", size: "sm", className: "h-7 gap-1 px-2 text-xs", onClick: l, children: [
          /* @__PURE__ */ i(Ie, { className: "size-3.5" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ i(
          H,
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
          Co,
          {
            well: Vm,
            placed: [],
            scope: r,
            blockReason: () => {
            },
            onSelect: (h) => s({ member: h }),
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
                  /* @__PURE__ */ i(lt, { className: "size-4 shrink-0 text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        wo,
        {
          cube: n,
          cubes: a,
          kind: "dimensionOrMeasure",
          value: e.member || void 0,
          onChange: (h) => s({ member: h }),
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
          onValueChange: (h) => s({
            operator: h,
            values: Kn.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(_e, { className: "w-full", children: /* @__PURE__ */ i(Ce, {}) }),
            /* @__PURE__ */ i(Se, { children: u.map((h) => /* @__PURE__ */ i(he, { value: h, children: bo[h] }, h)) })
          ]
        }
      )
    ] }),
    p ? /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        Hm,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => s({ values: h })
        }
      )
    ] }) : null
  ] });
}
function Bm(e, t, n) {
  const a = t ?? e.member;
  if (!a) return "New filter";
  const r = bo[e.operator] ?? e.operator;
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
function Hm({ values: e, memberType: t, onChange: n }) {
  const a = e ?? [], r = a.length === 1 && Ne(a[0]);
  if (t === "time") {
    const l = r ? a[0] : Wm(a);
    return /* @__PURE__ */ i(
      st,
      {
        kind: "dateRange",
        value: l,
        onChange: (c) => n(c === void 0 ? [] : Ne(c) ? [c] : Gm(c)),
        renderFixed: (c, u) => /* @__PURE__ */ i(xr, { value: c, onChange: u })
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
          onChange: (u) => c(Um(u.target.value)),
          placeholder: "value, value…",
          className: "h-8"
        }
      )
    }
  );
}
function Wm(e) {
  const t = e.filter((n) => !Ne(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Gm(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Um(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Ym({ spec: e, update: t, cube: n, scopeCubes: a, scope: r }) {
  const { query: o } = e, s = (o.filters ?? []).length, l = (c) => t({ ...e, query: { ...o, filters: c } });
  return /* @__PURE__ */ f(Re, { children: [
    /* @__PURE__ */ f(
      Ae,
      {
        className: C(
          "flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
          s > 0 ? "text-foreground" : "text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(oi, { className: "size-4" }),
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
      /* @__PURE__ */ i(Qm, { spec: e, update: t, scopeCubes: a }),
      /* @__PURE__ */ i(qm, { cube: n, cubes: a, scope: r, value: o.filters, onChange: l })
    ] })
  ] });
}
function Qm({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: a } = Be(), r = am(a, n);
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
        className: C(
          "rounded-full border px-2.5 py-1 text-xs transition-colors",
          o.has(l.name) ? "border-ring bg-accent text-foreground" : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        ),
        children: l.label
      },
      l.name
    )) })
  ] });
}
function Jm({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: a } = Be(), r = x.useMemo(() => dn(a), [a]), o = r.filter((v) => v.type === "view"), s = r.filter((v) => v.type === "cube"), l = r.find((v) => v.name === e), [c, u] = x.useState(!1), [d, p] = x.useState(null), h = (v) => {
    if (v === e) {
      u(!1);
      return;
    }
    t ? p(v) : (n(v), u(!1));
  }, b = () => {
    d && n(d), p(null), u(!1);
  }, y = d ? ((g = r.find((v) => v.name === d)) == null ? void 0 : g.title) ?? d : "";
  return /* @__PURE__ */ f(
    Re,
    {
      open: c,
      onOpenChange: (v) => {
        u(v), v || p(null);
      },
      children: [
        /* @__PURE__ */ f(
          Ae,
          {
            className: "flex h-8 max-w-[12rem] items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(Ra, { className: "size-3.5 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: C("truncate", !l && "text-muted-foreground"), children: l ? l.title : "Choose source" })
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
            /* @__PURE__ */ i(H, { variant: "ghost", size: "sm", className: "h-7", onClick: () => p(null), children: "Cancel" }),
            /* @__PURE__ */ i(H, { size: "sm", className: "h-7", onClick: b, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ f("div", { className: "max-h-[60vh] overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ f(ae, { children: [
            /* @__PURE__ */ i("p", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Saved datasets" }),
            o.map((v) => /* @__PURE__ */ i(
              oa,
              {
                icon: /* @__PURE__ */ i(er, { className: "size-3.5" }),
                label: v.title,
                active: v.name === e,
                onClick: () => h(v.name)
              },
              v.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Tables" }),
          s.map((v) => /* @__PURE__ */ i(
            oa,
            {
              icon: /* @__PURE__ */ i(Aa, { className: "size-3.5" }),
              label: v.title,
              active: v.name === e,
              onClick: () => h(v.name)
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
      className: C(
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
  var l;
  const o = ((l = e.chart.axes) == null ? void 0 : l[n]) ?? {}, s = o.labelHide === !0;
  return /* @__PURE__ */ f(
    "div",
    {
      className: C(
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
            onChange: (c) => ia(e, t, n, { label: c.target.value || void 0 }),
            title: `Axis title${r ? ` — defaults to “${r}”` : ""} (leave blank for the default)`,
            className: "h-6 min-w-0 flex-1 rounded border border-input bg-background px-1.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          Zm,
          {
            hidden: s,
            what: "axis title",
            onClick: () => ia(e, t, n, { labelHide: s ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Xm({
  spec: e,
  update: t
}) {
  var a;
  const n = ((a = e.chart.legend) == null ? void 0 : a.show) === !1;
  return /* @__PURE__ */ f("div", { className: C("flex flex-col gap-1 transition-opacity", n && "opacity-50"), children: [
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
          n ? /* @__PURE__ */ i(Ma, { className: "size-3.5" }) : /* @__PURE__ */ i(Oa, { className: "size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Zm({
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
      children: e ? /* @__PURE__ */ i(Ma, { className: "size-3.5" }) : /* @__PURE__ */ i(Oa, { className: "size-3.5" })
    }
  );
}
const So = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: C(
        "flex items-center gap-2 text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        e
      ),
      ...t
    }
  )
);
So.displayName = "Label";
function le({
  label: e,
  hint: t,
  error: n,
  htmlFor: a,
  action: r,
  className: o,
  children: s
}) {
  return /* @__PURE__ */ f("div", { "data-slot": "field-row", className: C("flex flex-col gap-1.5 py-1.5", o), children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i(So, { htmlFor: a, className: "text-muted-foreground", children: e }),
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
      className: C(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        e ? "bg-primary" : "bg-input",
        o
      ),
      children: /* @__PURE__ */ i(
        "span",
        {
          className: C(
            "pointer-events-none block size-4 rounded-full bg-background shadow-sm ring-0 transition-transform",
            e ? "translate-x-4" : "translate-x-0"
          )
        }
      )
    }
  );
}
function pe({
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
      className: C("flex items-center justify-between gap-3 py-1.5", o),
      children: [
        /* @__PURE__ */ f(
          "label",
          {
            htmlFor: s,
            className: C(
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
function ed({ spec: e, update: t }) {
  var h, b;
  const { chart: n } = e, a = n.family, r = n.familyOptions ?? {}, o = (y) => t({ ...e, chart: { ...n, ...y } }), s = (y) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...y } } }), l = ((b = (h = n.mapping) == null ? void 0 : h.series) == null ? void 0 : b.mode) === "pivot" ? "stacked" : "none", c = n.stackMode ?? (a === "area" ? l : Qa[a].envelope.stackMode) ?? "none", d = /* @__PURE__ */ i(le, { label: "Stacked", children: /* @__PURE__ */ i(
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
  ) }), p = (() => {
    var y, g;
    switch (a) {
      case "bar":
        return /* @__PURE__ */ f(ae, { children: [
          /* @__PURE__ */ i(
            pe,
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
        return /* @__PURE__ */ f(ae, { children: [
          d,
          n.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "px-0.5 pt-1 text-[10px] leading-tight text-muted-foreground/80", children: ((g = (y = n.mapping) == null ? void 0 : y.series) == null ? void 0 : g.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ f(ae, { children: [
          /* @__PURE__ */ i(
            pe,
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
          /* @__PURE__ */ i(rd, { label: "Max slices", children: /* @__PURE__ */ i(
            me,
            {
              type: "number",
              min: 1,
              className: "h-8",
              value: r.maxSlices ?? "",
              placeholder: "8",
              onChange: (v) => {
                const _ = parseInt(v.target.value, 10);
                s({ maxSlices: Number.isFinite(_) && _ > 0 ? _ : void 0 });
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
        return /* @__PURE__ */ f(ae, { children: [
          /* @__PURE__ */ i(
            pe,
            {
              label: "Compact rows",
              checked: r.rowHeight === "compact",
              onChange: (v) => s({ rowHeight: v ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            pe,
            {
              label: "Sortable columns",
              checked: r.sortable !== !1,
              onChange: (v) => s({ sortable: v })
            }
          ),
          /* @__PURE__ */ i(
            pe,
            {
              label: "Sticky header",
              checked: r.stickyHeader !== !1,
              onChange: (v) => s({ stickyHeader: v })
            }
          ),
          /* @__PURE__ */ i(
            pe,
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
  return /* @__PURE__ */ i("div", { className: "flex flex-col", children: p });
}
const td = /* @__PURE__ */ new Set([
  "bar",
  "area",
  "pie",
  "table"
]);
function nd(e) {
  return td.has(e);
}
function rd({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1 py-1", children: [
    /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: e }),
    t
  ] });
}
const ad = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], Ro = {
  bar: Da,
  line: di,
  area: mi,
  pie: ui,
  scatter: ci,
  kpi: li,
  table: si,
  combo: ii
};
function od({ spec: e, update: t, empty: n }) {
  const a = e.chart.family, r = (s) => {
    s !== a && t(sm(e, s));
  };
  if (n)
    return /* @__PURE__ */ i("div", { className: "pointer-events-none absolute inset-0 grid place-items-center p-4", children: /* @__PURE__ */ f("div", { className: "pointer-events-auto w-full max-w-sm rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur", children: [
      /* @__PURE__ */ i("p", { className: "pb-0.5 text-center text-sm font-medium", children: "Choose a chart type" }),
      /* @__PURE__ */ i("p", { className: "pb-3 text-center text-xs text-muted-foreground", children: "Then add fields to the slots around the chart." }),
      /* @__PURE__ */ i(la, { family: a, onPick: r })
    ] }) });
  const o = Ro[a];
  return /* @__PURE__ */ i("div", { className: "pointer-events-none absolute inset-x-0 top-2 flex justify-center", children: /* @__PURE__ */ f(Re, { children: [
    /* @__PURE__ */ i(Ae, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "pointer-events-auto flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(o, { className: "size-3.5 text-muted-foreground" }),
          xo[a],
          /* @__PURE__ */ i(lt, { className: "size-3 text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ f(Me, { align: "center", className: "flex max-h-[70vh] w-72 flex-col gap-2.5 overflow-y-auto p-3", children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(la, { family: a, onPick: r })
      ] }),
      nd(a) ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 border-t border-border pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(ed, { spec: e, update: t })
      ] }) : null
    ] })
  ] }) });
}
function la({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "grid grid-cols-4 gap-1.5", children: ad.map((n) => {
    const a = Ro[n], r = n === e;
    return /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: () => t(n),
        "aria-pressed": r,
        className: C(
          "flex flex-col items-center gap-1 rounded-md border px-1 py-2 text-[10px] transition-colors",
          r ? "border-ring bg-accent text-foreground" : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ i(a, { className: "size-4" }),
          xo[n]
        ]
      },
      n
    );
  }) });
}
function id(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function sd(e, t, n, a, r) {
  var Nr, wr, Cr, _r, Sr, Rr, Ar, Mr, Or, Dr, zr, Lr, Tr, Fr;
  const { chart: o, query: s } = e, l = o.family, c = n.kinds.length === 1 ? n.kinds[0] : ld(r), u = o.familyOptions ?? {}, d = Array.isArray(u.series) ? u.series : [], p = Array.isArray(u.columns) ? u.columns : [], h = ht(o), b = h[a], y = l === "combo" && n.id === "y", g = l === "table" && n.id === "columns", v = l === "bar" || l === "line" || l === "area", _ = ((wr = (Nr = o.mapping) == null ? void 0 : Nr.series) == null ? void 0 : wr.mode) === "measures", R = v && n.id === "y", N = R && _, A = y ? (Cr = d.find((F) => F.member === a)) == null ? void 0 : Cr.label : g ? (_r = p.find((F) => F.member === a)) == null ? void 0 : _r.label : N ? b == null ? void 0 : b.label : void 0, k = y ? (Sr = d.find((F) => F.member === a)) == null ? void 0 : Sr.colorToken : N ? b == null ? void 0 : b.colorToken : void 0, w = He(s), O = n.kinds.includes("time") && (w == null ? void 0 : w.dimension) === a, $ = O ? w == null ? void 0 : w.granularity : void 0, V = O ? w == null ? void 0 : w.dateRange : void 0, j = y ? ((Rr = d.find((F) => F.member === a)) == null ? void 0 : Rr.render) ?? "line" : void 0, E = l === "line" && n.id === "y", q = l === "bar" && n.id === "y" && o.orientation !== "horizontal", M = ((Mr = (Ar = o.mapping) == null ? void 0 : Ar.series) == null ? void 0 : Mr.mode) === "pivot", S = ((Dr = (Or = o.mapping) == null ? void 0 : Or.series) == null ? void 0 : Dr.mode) === "pivot" ? o.mapping.series.meta : void 0, B = (E || q) && (_ || M) || y, ne = B ? (y ? (zr = d.find((F) => F.member === a)) == null ? void 0 : zr.axis : _ ? b == null ? void 0 : b.axis : (Lr = S == null ? void 0 : S[a]) == null ? void 0 : Lr.axis) ?? "left" : void 0, Z = (l === "line" || l === "area") && n.id === "y" && _ || y && (j === "line" || j === "area"), W = y ? d.find((F) => F.member === a) : void 0, J = Z ? y ? W == null ? void 0 : W.curve : b == null ? void 0 : b.curve : void 0, ue = Z ? y ? W == null ? void 0 : W.dots : b == null ? void 0 : b.dots : void 0, ce = (F) => {
    var $r, Pr;
    if (($r = o.mapping) != null && $r.series && o.mapping.series.mode !== "measures") return;
    const ie = ((Pr = o.mapping) != null && Pr.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], se = { ...h };
    F && Object.keys(F).length > 0 ? se[a] = F : delete se[a];
    const yt = ye(o);
    yt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: yt }, series: vo(ie, se) }
      }
    });
  }, K = (F) => {
    const ie = d.map((se) => se.member === a ? { ...se, ...F } : se);
    t({ ...e, chart: { ...o, familyOptions: { ...u, series: ie } } });
  }, D = (F) => {
    const ie = p.map((se) => se.member === a ? { ...se, ...F } : se);
    t({ ...e, chart: { ...o, familyOptions: { ...u, columns: ie } } });
  }, Y = (F) => {
    y ? K({ label: F }) : g ? D({ label: F }) : N && ce({ ...b, label: F });
  }, de = (F) => {
    y ? K({ colorToken: F ?? void 0 }) : N && ce({ ...b, colorToken: F ?? void 0 });
  }, $e = (F) => {
    if (!w) return;
    const ie = { ...w };
    for (const se of Object.keys(F)) {
      const yt = F[se];
      yt === void 0 ? delete ie[se] : ie[se] = yt;
    }
    t({ ...e, query: { ...s, timeDimensions: [ie] } });
  }, We = (F) => $e({ granularity: F }), Ge = (F) => $e({ dateRange: F }), Et = (F) => K({ render: F }), It = (F) => {
    var ie, se;
    y ? K({ axis: F }) : N ? ce({ ...b, axis: F }) : ((se = (ie = o.mapping) == null ? void 0 : ie.series) == null ? void 0 : se.mode) === "pivot" && t(Wn(e, l, a, F));
  }, Vt = (F) => {
    y ? K({ curve: F }) : N && ce({ ...b, curve: F });
  }, qt = (F) => {
    y ? K({ dots: F }) : N && ce({ ...b, dots: F });
  }, z = () => t(mm(e, l, n.id, a)), L = (n.id === "x" || n.id === "slices") && (c === "category" || c === "time"), T = (Tr = o.mapping) == null ? void 0 : Tr.series, I = (T && T.mode === "pivot" ? T.value : it(o)[0]) ?? ((Fr = s.measures) == null ? void 0 : Fr[0]), U = L ? c === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...I ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...I ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], re = (() => {
    const F = id(s.order)[0];
    if (!F) return "none";
    const [ie, se] = F;
    return I && ie === I ? se === "desc" ? "value-desc" : "value-asc" : ie === a ? c === "time" ? se === "desc" ? "time-desc" : "time-asc" : se === "asc" ? "label-asc" : "label-desc" : "none";
  })(), ee = (F) => {
    let ie;
    switch (F) {
      case "none":
        ie = void 0;
        break;
      case "value-desc":
        ie = I ? [[I, "desc"]] : void 0;
        break;
      case "value-asc":
        ie = I ? [[I, "asc"]] : void 0;
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
  }, oe = typeof s.limit == "number" ? s.limit : void 0, bt = (F) => t({ ...e, query: { ...s, limit: F && F > 0 ? F : void 0 } }), hn = (l === "bar" || l === "line" || l === "area") && O, zo = hn && u.comparePrevious === !0;
  return {
    kind: c,
    label: A,
    colorToken: k,
    granularity: $,
    dateRange: V,
    render: j,
    axis: ne,
    curve: J,
    dots: ue,
    canLineStyle: Z,
    canAxis: B,
    canRename: y || g || N,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: R && _ || y,
    isTimeField: O,
    isComboY: y,
    isCategoryField: L,
    sortValue: re,
    sortOptions: U,
    onSort: ee,
    limit: oe,
    onLimit: bt,
    canComparePrevious: hn,
    comparePrevious: zo,
    comparePreviousReady: hn && V !== void 0,
    onComparePrevious: (F) => t({ ...e, chart: { ...o, familyOptions: { ...u, comparePrevious: F || void 0 } } }),
    onRename: Y,
    onRecolor: de,
    onGranularity: We,
    onDateRange: Ge,
    onRender: Et,
    onAxis: It,
    onCurve: Vt,
    onDots: qt,
    onRemove: z
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
function ld(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function ca(e, t, n, a) {
  var p;
  const { chart: r, query: o } = e, s = r.family, l = (h) => {
    if (a < 0 || a >= h.length || n === a) return h;
    const b = h.slice(), [y] = b.splice(n, 1);
    return b.splice(a, 0, y), b;
  };
  if (s === "combo" && t.id === "y") {
    const h = r.familyOptions ?? {}, b = l(Array.isArray(h.series) ? h.series : []), y = l(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: y },
      chart: { ...r, familyOptions: { ...h, series: b } }
    };
  }
  if (s === "table" && t.id === "columns") {
    const h = r.familyOptions ?? {}, b = l(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...r, familyOptions: { ...h, columns: b } } };
  }
  const c = l(o.measures ?? []), u = (p = r.mapping) == null ? void 0 : p.series;
  let d = r.mapping;
  if (u && u.mode === "measures")
    d = { ...r.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = l(u.values);
    d = { ...r.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...o, measures: c }, chart: { ...r, mapping: d } };
}
function cd(e, t, n) {
  const a = dn(e), r = a.filter((N) => N.type === "view"), o = Pt(t), s = Object.values(o).flat();
  let l;
  for (const N of s) {
    const A = Oe(e, N);
    if (A) {
      l = A;
      break;
    }
  }
  const c = !l && n ? Rt(e, n) : void 0, u = l ? Rt(e, l.cube) : c, d = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, p = (l == null ? void 0 : l.connectedComponent) ?? (c == null ? void 0 : c.connectedComponent), h = t.query.measures ?? [], b = h.length ? wt(h[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: r, measureSource: b, scopeComponent: p };
  const y = b ?? (l == null ? void 0 : l.cube) ?? (c == null ? void 0 : c.name), g = y ? Rt(e, y) : void 0, v = a.filter((N) => N.type === "cube" && N.connectedComponent !== void 0), R = (p === void 0 ? v : v.filter((N) => N.connectedComponent === p)).filter((N) => N.name !== y).sort((N, A) => N.title.localeCompare(A.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: R,
    views: r,
    measureSource: b,
    scopeComponent: p
  };
}
const ud = Ve.options;
function md({
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
      className: C("flex flex-wrap items-center gap-1.5", r),
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
            className: C(
              "relative flex size-6 items-center justify-center rounded-full border text-[9px] font-medium uppercase text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
              e === void 0 ? "border-ring ring-2 ring-ring/40" : "border-input hover:border-ring"
            ),
            children: "A"
          }
        ) : null,
        ud.map((o) => {
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
              className: C(
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
const dd = Ye.options, fd = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function Ao({
  value: e,
  onChange: t,
  options: n,
  placeholder: a = "Granularity…",
  disabled: r,
  id: o,
  className: s
}) {
  const l = n && n.length > 0 ? n : dd;
  return /* @__PURE__ */ f(
    we,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: r,
      children: [
        /* @__PURE__ */ i(_e, { id: o, className: s, children: /* @__PURE__ */ i(Ce, { placeholder: a }) }),
        /* @__PURE__ */ i(Se, { children: l.map((c) => /* @__PURE__ */ i(he, { value: c, children: fd[c] }, c)) })
      ]
    }
  );
}
const ua = { bar: "Bar", line: "Line", area: "Area" }, pd = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function hd({
  spec: e,
  update: t,
  well: n,
  member: a,
  option: r,
  resolvedColor: o,
  reorder: s,
  className: l
}) {
  const c = sd(e, t, n, a, r), u = (r == null ? void 0 : r.label) ?? a, d = c.label || u, p = c.canColor && o !== void 0, h = c.canRename || p || c.isTimeField || c.isCategoryField || c.isComboY && !!c.render || c.canAxis || c.canLineStyle || !!s, b = (g) => {
    const v = g.trim();
    c.onRename(v.length > 0 ? v : void 0);
  }, y = /* @__PURE__ */ f(ae, { children: [
    p ? /* @__PURE__ */ i(
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
      className: C(
        "flex items-center gap-1 rounded-md border border-border bg-background py-1 pl-2 pr-1 text-sm shadow-sm",
        l
      ),
      children: [
        h ? /* @__PURE__ */ f(Re, { children: [
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
            p ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Color" }),
              /* @__PURE__ */ i(md, { value: c.colorToken, onChange: c.onRecolor })
            ] }) : null,
            c.isTimeField ? /* @__PURE__ */ f(ae, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  st,
                  {
                    kind: "dateRange",
                    value: c.dateRange,
                    onChange: c.onDateRange,
                    renderFixed: (g, v) => /* @__PURE__ */ i(xr, { value: g, onChange: v })
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
                    renderFixed: (g, v) => /* @__PURE__ */ i(Ao, { value: g, onChange: v, className: "h-8 w-full" })
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
            c.isCategoryField ? /* @__PURE__ */ f(ae, { children: [
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
                  className: C(
                    "flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs",
                    c.render === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                  ),
                  children: [
                    ua[g],
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
                  className: C(
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
            c.canLineStyle ? /* @__PURE__ */ f(ae, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-1", children: pd.map(([g, v]) => /* @__PURE__ */ f(
                  "button",
                  {
                    type: "button",
                    onClick: () => c.onCurve(g),
                    className: C(
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
                H,
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
                H,
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
              H,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 justify-start text-destructive hover:text-destructive",
                onClick: c.onRemove,
                children: [
                  /* @__PURE__ */ i(jr, { className: "size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "flex min-w-0 flex-1 items-center gap-1.5", title: d, children: y }),
        /* @__PURE__ */ i(
          H,
          {
            variant: "ghost",
            size: "icon",
            className: "size-6 shrink-0 text-muted-foreground hover:text-destructive",
            onClick: c.onRemove,
            "aria-label": `Remove ${d}`,
            children: /* @__PURE__ */ i(jr, { className: "size-3.5" })
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
  colorFor: s,
  scope: l,
  blockReason: c,
  onAdd: u,
  badge: d,
  orientation: p,
  lockedSingle: h,
  disableReorder: b,
  label: y,
  note: g,
  pickerSide: v,
  pickerAlign: _,
  control: R
}) {
  const N = n.cardinality === "many" && !h, A = N || a.length === 0, k = a.length, w = p === "vertical", O = y ?? n.label, $ = /* @__PURE__ */ i(
    Co,
    {
      well: n,
      placed: r,
      scope: l,
      blockReason: c,
      onSelect: u,
      side: v ?? (w ? "right" : "top"),
      align: _ ?? "start",
      children: /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          className: C(
            "flex items-center justify-center gap-1 rounded-md border border-dashed border-input bg-background/60 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-foreground",
            w && "w-full"
          ),
          children: [
            /* @__PURE__ */ i(Tt, { className: "size-3.5" }),
            a.length === 0 ? O : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "well-group",
      className: C("flex flex-col gap-1", !w && "min-w-0"),
      children: [
        /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "truncate", children: O }),
          d ? /* @__PURE__ */ i("span", { className: "truncate rounded-sm bg-muted px-1 py-px text-[9px] normal-case text-muted-foreground", children: d }) : null,
          n.optional && a.length === 0 ? /* @__PURE__ */ i("span", { className: "normal-case text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        R ? /* @__PURE__ */ i("div", { className: "pb-0.5", children: R }) : null,
        /* @__PURE__ */ f("div", { className: C("flex gap-1", w ? "flex-col" : "flex-row flex-wrap items-center"), children: [
          a.map((V, j) => /* @__PURE__ */ i(
            hd,
            {
              spec: e,
              update: t,
              well: n,
              member: V,
              option: o(V),
              resolvedColor: s(V),
              className: w ? "w-full" : void 0,
              reorder: N && k > 1 && !b ? {
                canUp: j > 0,
                canDown: j < k - 1,
                onUp: () => t(ca(e, n, j, j - 1)),
                onDown: () => t(ca(e, n, j, j + 1))
              } : void 0
            },
            V
          )),
          A ? $ : null
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
function kr(e, t) {
  const { chart: n } = e, a = n.familyOptions ?? {};
  return { chart: n, fo: a, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...o } } }) };
}
function gd({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = kr(e, t), r = yo(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], s = n.display ?? "number", l = n.gauge, c = (d) => {
    const p = o ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!p) return;
    const h = { ...p };
    for (const b of Object.keys(d)) {
      const y = d[b];
      y === void 0 ? delete h[b] : h[b] = y;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(At, { label: "Time field", children: /* @__PURE__ */ i(
      wo,
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
        renderFixed: (d, p) => /* @__PURE__ */ i(xr, { value: d, onChange: p })
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
          const p = parseFloat(d.target.value);
          a({ gauge: Number.isFinite(p) ? { ...l ?? {}, max: p } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function bd({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = kr(e, t), r = n.comparison, o = r !== void 0, s = x.useRef(void 0);
  r && (s.current = r);
  const l = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (r == null ? void 0 : r.goodDirection) ?? "up";
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i(
      pe,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => a({
          comparison: d ? s.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ f(ae, { children: [
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
            const p = parseFloat(d.target.value);
            a({ comparison: { ...r, value: Number.isFinite(p) ? p : void 0 } });
          }
        }
      ) }) : null,
      (r == null ? void 0 : r.mode) === "previousPeriod" && !(l != null && l.dateRange) ? /* @__PURE__ */ i("p", { className: "text-[10px] leading-tight text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
      /* @__PURE__ */ i(
        pe,
        {
          label: "Show as %",
          checked: ((r == null ? void 0 : r.showAsPercent) ?? !0) !== !1,
          onChange: (d) => a({ comparison: { ...r, showAsPercent: d } })
        }
      ),
      /* @__PURE__ */ i(
        pe,
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
function yd({ spec: e, update: t }) {
  const { fo: n, setFO: a } = kr(e, t), r = n.sparkline, o = r !== void 0, s = n.comparison !== void 0, l = n.goodDirection ?? "up", c = r == null ? void 0 : r.granularity;
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i(
      pe,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => a({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ f(ae, { children: [
      /* @__PURE__ */ i(At, { label: "Trend granularity", children: /* @__PURE__ */ i(
        st,
        {
          kind: "granularity",
          value: c,
          onChange: (u) => a({ sparkline: { ...r, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(Ao, { value: u, onChange: d, className: "h-8 w-full" })
        }
      ) }),
      s ? null : /* @__PURE__ */ i(
        pe,
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
const vd = {
  bar: { left: ["y"], bottom: ["x", "color"] },
  line: { left: ["y"], bottom: ["x", "color"] },
  area: { left: ["y"], bottom: ["x", "color"] },
  combo: { left: ["y"], bottom: ["x"] },
  pie: { left: ["size"], bottom: ["slices"] },
  scatter: { left: ["sy"], bottom: ["sx", "size", "color"] },
  kpi: { left: ["value"], bottom: [] },
  table: { left: ["columns"], bottom: [] }
}, xd = /* @__PURE__ */ new Set(["line", "combo"]);
function kd({
  spec: e,
  update: t,
  toolbar: n,
  children: a
}) {
  var Et, It, Vt, qt;
  const { meta: r } = Be(), { locale: o } = Ke(), { chart: s } = e, l = s.family, c = yo(e), u = x.useMemo(() => ln(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), d = x.useCallback(
    (z) => z && (o == null ? void 0 : o.unitSystem) === "imperial" && u[z] ? u[z].imperialUnit : z,
    [o == null ? void 0 : o.unitSystem, u]
  ), p = x.useMemo(() => lm(l), [l]), h = x.useMemo(() => Pt(e), [e]), b = x.useMemo(() => new Map(p.map((z) => [z.id, z])), [p]), [y, g] = x.useState(void 0), v = x.useMemo(() => cd(r, e, y), [r, e, y]), _ = x.useMemo(() => Object.values(h).flat(), [h]), R = x.useCallback(
    (z) => {
      g(z), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), N = x.useMemo(
    () => {
      var z;
      return v.viewLocked ? [v.viewLocked] : [(z = v.sourceCube) == null ? void 0 : z.name, ...v.relatedCubes.map((L) => L.name)].filter(
        Boolean
      );
    },
    [v]
  ), A = x.useMemo(
    () => Object.values(h).every((z) => z.length === 0),
    [h]
  ), k = xd.has(l), w = x.useCallback(
    (z) => {
      var I, U, re;
      if (l === "combo") {
        const ee = s.familyOptions ?? {}, oe = (Array.isArray(ee.series) ? ee.series : []).find(
          (bt) => bt.member === z
        );
        return (oe == null ? void 0 : oe.axis) === "right" ? "right" : "left";
      }
      const L = (I = s.mapping) == null ? void 0 : I.series;
      return (L && (L.mode === "measures" || L.mode === "pivot") ? (re = (U = L.meta) == null ? void 0 : U[z]) == null ? void 0 : re.axis : void 0) === "right" ? "right" : "left";
    },
    [l, s.familyOptions, s.mapping]
  ), O = x.useMemo(() => {
    var re, ee;
    const z = h.y ?? [], L = (oe) => z.find((bt) => w(bt) === oe), T = L("left"), I = k ? L("right") : void 0, U = (oe) => oe ? Oe(r, oe) : void 0;
    return {
      leftKey: T ? vt(U(T)) : void 0,
      rightKey: I ? vt(U(I)) : void 0,
      leftLabel: T ? da(U(T), d((re = U(T)) == null ? void 0 : re.unit)) : void 0,
      rightLabel: I ? da(U(I), d((ee = U(I)) == null ? void 0 : ee.unit)) : void 0
    };
  }, [h, k, w, r, d]), $ = x.useCallback(
    (z) => {
      const L = vt(z), { leftKey: T, rightKey: I } = O;
      return T === void 0 || L === T ? "left" : I === void 0 || L === I ? "right" : "left";
    },
    [O]
  ), V = x.useCallback(
    (z, L) => {
      var T;
      if (L) {
        if (v.scopeComponent !== void 0 && L.connectedComponent !== v.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (L.memberType === "measure" && v.measureSource && L.cube !== v.measureSource)
          return `Measures come from one table (${((T = v.sourceCube) == null ? void 0 : T.title) ?? v.measureSource}). Remove them to switch.`;
        if (z === "y" && L.memberType === "measure") {
          const { leftKey: I, rightKey: U, leftLabel: re, rightLabel: ee } = O, oe = vt(L);
          if (k) {
            if (I !== void 0 && U !== void 0 && oe !== I && oe !== U)
              return `Both axes show ${re} & ${ee} — remove one to add a third unit.`;
          } else if (I !== void 0 && oe !== I)
            return `This axis shows ${re}; ${L.label ?? "this field"} is ${Bn(L)}`;
        }
      }
    },
    [v, O, k]
  ), j = k ? [O.leftLabel, O.rightLabel].filter(Boolean).join(" · ") || void 0 : O.leftLabel, E = x.useMemo(() => {
    var L;
    const z = {};
    if (l === "bar" || l === "line" || l === "area") {
      const T = (L = s.mapping) == null ? void 0 : L.series;
      if (T && T.mode === "measures") {
        const I = T.members.map((re) => {
          var ee, oe;
          return { key: re, colorToken: (oe = (ee = T.meta) == null ? void 0 : ee[re]) == null ? void 0 : oe.colorToken };
        }), U = Ln(I, s.colors);
        T.members.forEach((re, ee) => {
          z[re] = U[ee];
        });
      }
    } else if (l === "combo") {
      const T = s.familyOptions ?? {}, I = Array.isArray(T.series) ? T.series : [], U = I.map((ee) => ({ key: ee.member, colorToken: ee.colorToken })), re = Ln(U, s.colors);
      I.forEach((ee, oe) => {
        z[ee.member] = re[oe];
      });
    }
    return z;
  }, [l, s.mapping, s.colors, s.familyOptions]), q = x.useCallback(
    (z, L, T) => {
      const I = Oe(r, L);
      if (V(z, I)) return;
      let U = ea(e, l, z, L, T);
      k && z === "y" && (U = Wn(U, l, L, $(I))), t(U);
    },
    [V, r, t, e, l, k, $]
  ), M = x.useCallback(
    (z, L) => {
      var U;
      if (!L) return;
      if (v.scopeComponent !== void 0 && L.connectedComponent !== v.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (L.memberType === "measure" && v.measureSource && L.cube !== v.measureSource)
        return `Measures come from one table (${((U = v.sourceCube) == null ? void 0 : U.title) ?? v.measureSource}). Remove them to switch.`;
      const T = z === "left" ? O.leftKey : O.rightKey, I = z === "left" ? O.leftLabel : O.rightLabel;
      if (T !== void 0 && vt(L) !== T)
        return `This axis shows ${I}; ${L.label ?? "this field"} is ${Bn(L)}`;
    },
    [v, O]
  ), S = x.useCallback(
    (z, L, T) => {
      const I = Oe(r, L);
      M(z, I) || t(Wn(ea(e, l, "y", L, T), l, L, z));
    },
    [M, r, t, e, l]
  ), B = l === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : vd[l], ne = B.left.map((z) => b.get(z)).filter(Boolean), P = B.bottom.map((z) => b.get(z)).filter(Boolean), G = (Et = h.color) == null ? void 0 : Et[0], Z = ((It = h.y) == null ? void 0 : It.length) ?? 0, W = G && Z > 1 ? `${Z} measures × ${((Vt = Oe(r, G)) == null ? void 0 : Vt.label) ?? "this split"} — one series per measure per value.` : void 0, J = l !== "kpi" && l !== "table", ue = h.y ?? [], ce = ue.find((z) => w(z) !== "right"), K = k ? ue.find((z) => w(z) === "right") : void 0, D = (z) => {
    var I, U, re, ee;
    if (!z) return;
    const L = (I = s.mapping) == null ? void 0 : I.series;
    return (L && L.mode === "measures" ? (re = (U = L.meta) == null ? void 0 : U[z]) == null ? void 0 : re.label : void 0) ?? ((ee = Oe(r, z)) == null ? void 0 : ee.label);
  }, Y = (z) => {
    var T, I, U, re;
    const L = (ee, oe) => oe ? /* @__PURE__ */ i(sa, { spec: e, update: t, axis: ee, title: "Title", auto: D(oe) }) : null;
    switch (z) {
      case "y":
        return L("y", ce);
      // single value axis (bar / area)
      case "x":
        return L("x", (I = (T = s.mapping) == null ? void 0 : T.category) == null ? void 0 : I.member);
      case "sy":
        return L("y", (U = h.sy) == null ? void 0 : U[0]);
      // scatter Y axis
      case "sx":
        return L("x", (re = h.sx) == null ? void 0 : re[0]);
      // scatter X axis
      default:
        return null;
    }
  }, de = (z, L) => /* @__PURE__ */ i(
    ma,
    {
      spec: e,
      update: t,
      well: z,
      placed: h[z.id] ?? [],
      allPlaced: _,
      optionFor: (T) => Oe(r, T),
      colorFor: (T) => E[T],
      scope: v,
      blockReason: (T) => V(z.id, T),
      onAdd: (T, I) => q(z.id, T, I),
      badge: z.id === "y" ? j : void 0,
      orientation: L,
      note: z.id === "color" ? W : void 0,
      control: Y(z.id)
    },
    z.id
  ), $e = b.get("y"), We = (z) => {
    if (!$e) return null;
    const L = z === "left" ? ce : K;
    return /* @__PURE__ */ i(
      ma,
      {
        spec: e,
        update: t,
        well: $e,
        label: z === "left" ? "Left axis" : "Right axis",
        placed: (h.y ?? []).filter((T) => w(T) === z),
        allPlaced: _,
        optionFor: (T) => Oe(r, T),
        colorFor: (T) => E[T],
        scope: v,
        blockReason: (T) => M(z, T),
        onAdd: (T, I) => S(z, T, I),
        badge: z === "left" ? O.leftLabel : O.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: L ? /* @__PURE__ */ i(
          sa,
          {
            spec: e,
            update: t,
            axis: z === "left" ? "y" : "y2",
            title: "Title",
            auto: D(L)
          }
        ) : null
      },
      `y-${z}`
    );
  }, Ge = () => {
    const z = b.get("value"), L = (h.value ?? []).length > 0, T = s.familyOptions ?? {};
    return /* @__PURE__ */ f(ae, { children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
        z ? de(z, "vertical") : null,
        L ? /* @__PURE__ */ i(
          Mn,
          {
            label: "Time, range & display",
            summary: T.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(gd, { spec: e, update: t })
          }
        ) : null
      ] }),
      L ? /* @__PURE__ */ f(ae, { children: [
        /* @__PURE__ */ i(Mn, { label: "Comparison", summary: T.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(bd, { spec: e, update: t }) }),
        /* @__PURE__ */ i(Mn, { label: "Sparkline", summary: T.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(yd, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ f("div", { "data-slot": "chart-edit-overlay", className: "flex h-full w-full flex-col gap-2", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i("div", { className: "flex min-w-0 items-center gap-2", children: n }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ i(
          Jm,
          {
            currentName: v.viewLocked ?? ((qt = v.sourceCube) == null ? void 0 : qt.name),
            hasFields: _.length > 0,
            onSelect: R
          }
        ),
        /* @__PURE__ */ i(Ym, { spec: e, update: t, cube: c, scopeCubes: N, scope: v })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex min-h-0 flex-1 gap-2", children: [
      ne.length > 0 ? /* @__PURE__ */ i("div", { className: C("flex shrink-0 flex-col gap-3 overflow-y-auto pr-1", l === "kpi" ? "w-56" : "w-40"), children: l === "kpi" ? Ge() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        ne.flatMap(
          (z) => k && z.id === "y" ? [We("left"), We("right")] : [de(z, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 flex-col gap-2", children: [
        /* @__PURE__ */ f("div", { className: "relative min-h-0 flex-1", children: [
          a,
          /* @__PURE__ */ i(od, { spec: e, update: t, empty: A })
        ] }),
        P.length > 0 ? /* @__PURE__ */ f("div", { className: "flex flex-wrap items-start gap-x-5 gap-y-2 pl-1", children: [
          P.map((z) => de(z, "horizontal")),
          J && !A ? /* @__PURE__ */ i(Xm, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function da(e, t) {
  const n = Bn(e), a = t ?? (e == null ? void 0 : e.unit);
  return a && a !== n ? `${n} (${a})` : n;
}
function Mo(e, t) {
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
  const t = Ka.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function Nd({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [a, r] = x.useState(e), [o, s] = x.useState(e);
  x.useEffect(() => {
    r(e), s(e);
  }, [e]);
  const l = Mo((p) => t(p), n), c = x.useMemo(() => fa(a), [a]), u = c.length === 0, d = x.useCallback(
    (p) => {
      r(p), fa(p).length === 0 && (s(p), l(p));
    },
    [l]
  );
  return { draft: a, issues: c, valid: u, committed: o, update: d };
}
const wd = () => {
};
function Cd({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: a = 250,
  fill: r = !1,
  className: o
}) {
  const { draft: s, issues: l, valid: c, committed: u, update: d } = Nd({
    spec: e,
    onChange: t ?? wd,
    debounceMs: a
  }), p = u, h = (N) => {
    var A, k, w;
    return (((A = N.measures) == null ? void 0 : A.length) ?? 0) > 0 || (((k = N.dimensions) == null ? void 0 : k.length) ?? 0) > 0 || (((w = N.timeDimensions) == null ? void 0 : w.some((O) => typeof O.granularity == "string")) ?? !1);
  }, b = (N) => {
    var A;
    return (((A = N.measures) == null ? void 0 : A.length) ?? 0) > 0;
  }, y = s.chart.family !== "table", g = h(s.query) && h(p.query) && (!y || b(s.query) && b(p.query)), v = y && !b(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", _ = g ? /* @__PURE__ */ i(br, { query: p.query, chart: p.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "flex size-full items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "max-w-[16rem]", children: v }) }), R = n ? /* @__PURE__ */ f(H, { size: "sm", disabled: !c, onClick: () => n(u), children: [
    /* @__PURE__ */ i(za, { className: "size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "chart-editor",
      className: C("flex w-full flex-col gap-2", r ? "h-full" : "min-h-[28rem]", o),
      children: [
        c ? null : /* @__PURE__ */ f(or, { variant: "destructive", children: [
          /* @__PURE__ */ i(ka, { className: "size-4" }),
          /* @__PURE__ */ i(ir, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(sr, { children: /* @__PURE__ */ f("ul", { className: "list-disc pl-4", children: [
            l.slice(0, 3).map((N, A) => /* @__PURE__ */ f("li", { children: [
              N.path ? /* @__PURE__ */ i("span", { className: "font-mono text-xs", children: N.path }) : null,
              " ",
              N.message
            ] }, A)),
            l.length > 3 ? /* @__PURE__ */ f("li", { children: [
              "…and ",
              l.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ i(kd, { spec: s, update: d, toolbar: R, children: _ }) })
      ]
    }
  );
}
function _d({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: a,
  onSave: r,
  saveDisabled: o,
  className: s
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: C(
        "mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2",
        s
      ),
      children: [
        /* @__PURE__ */ i(
          me,
          {
            value: e,
            placeholder: "Untitled dashboard",
            "aria-label": "Dashboard name",
            onChange: (l) => t(l.target.value),
            className: "h-8 w-full min-w-0 flex-1 sm:w-auto"
          }
        ),
        /* @__PURE__ */ f("div", { className: "flex flex-wrap items-center gap-1", children: [
          /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(Da, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(Zn, {}),
            " Text"
          ] }),
          /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(fi, {}),
            " Input"
          ] }),
          a ? /* @__PURE__ */ f(H, { variant: "outline", size: "sm", onClick: a, children: [
            /* @__PURE__ */ i(pi, {}),
            " Variables"
          ] }) : null
        ] }),
        r ? /* @__PURE__ */ f(H, { size: "sm", onClick: r, disabled: o, className: "ml-auto", children: [
          /* @__PURE__ */ i(za, {}),
          " Save"
        ] }) : null
      ]
    }
  );
}
const Oo = "lg", Do = 12;
function Sd(e, t) {
  const n = t[Oo];
  if (n && n.length > 0) return n;
  let a, r = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const s = o.reduce((l, c) => Math.max(l, c.x + c.w), 0);
    s > r && (a = o, r = s);
  }
  return a ?? e;
}
function Rd(e, t) {
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
const Ad = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function Md(e, t, n, a = Do) {
  const r = Ad[n], o = Math.min(r.w, a), s = e.reduce((l, c) => Math.max(l, c.y + c.h), 0);
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
function Od(e, t, n = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? Do) {
  const r = Md(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, r]
  };
}
function Dd(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function zd(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const Ld = 12;
function Td(e) {
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
function Fd(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function $d({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: a,
  onDelete: r,
  onLayoutChange: o
}) {
  const [s, l] = co(), c = e.grid ?? {}, u = c.cols ?? Ld, d = c.rowHeight ?? 40, p = c.margin ?? [12, 12], h = c.containerPadding ?? [0, 0], { breakpoints: b, cols: y } = x.useMemo(
    () => Td(u),
    [u]
  ), g = x.useMemo(
    () => ({ [Oo]: Fd(e.layout) }),
    [e.layout]
  ), v = x.useMemo(
    () => new Map(e.widgets.map((A) => [A.id, A])),
    [e.widgets]
  ), _ = x.useRef(o);
  x.useEffect(() => {
    _.current = o;
  }, [o]);
  const R = x.useRef(null), N = x.useCallback(
    (A, k) => {
      const w = Sd(A, k);
      _.current(w.map((O) => ({ ...O })));
    },
    []
  );
  return /* @__PURE__ */ i(hr, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "w-full [&_.react-resizable-handle]:z-[3]", children: l > 0 ? /* @__PURE__ */ i(
    Ta,
    {
      width: l,
      layouts: g,
      breakpoints: b,
      cols: y,
      rowHeight: d,
      margin: p,
      containerPadding: h,
      dragConfig: { enabled: !0, handle: `.${Zt}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: N,
      children: e.layout.map((A) => {
        const k = v.get(A.i);
        if (!k) return null;
        const w = k.id === t;
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
              "aria-pressed": w,
              onPointerDown: (O) => {
                R.current = { x: O.clientX, y: O.clientY };
              },
              onClick: (O) => {
                const $ = R.current;
                $ && Math.hypot(O.clientX - $.x, O.clientY - $.y) > 5 || n(k.id);
              },
              onKeyDown: (O) => {
                (O.key === "Enter" || O.key === " ") && (O.preventDefault(), n(k.id));
              },
              className: C(
                "group relative h-full w-full cursor-move rounded-xl ring-offset-2 ring-offset-background transition-shadow focus-visible:outline-none",
                w ? "ring-2 ring-primary" : "ring-1 ring-transparent hover:ring-border focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ f(
                  "div",
                  {
                    className: C(
                      "absolute right-2 top-2 z-[4] flex items-center gap-1",
                      "pointer-events-none opacity-0 transition-opacity",
                      "focus-within:pointer-events-auto focus-within:opacity-100",
                      "group-hover:pointer-events-auto group-hover:opacity-100",
                      w && "pointer-events-auto opacity-100"
                    ),
                    children: [
                      /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Edit ${k.title ?? k.type}`,
                          onClick: (O) => {
                            O.stopPropagation(), a(k.id);
                          },
                          className: C(
                            "inline-flex size-7 items-center justify-center rounded-md",
                            "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                            "hover:bg-accent hover:text-foreground [&_svg]:size-4"
                          ),
                          children: /* @__PURE__ */ i(hi, {})
                        }
                      ),
                      /* @__PURE__ */ i(
                        "button",
                        {
                          type: "button",
                          "aria-label": `Delete ${k.title ?? k.type}`,
                          onClick: (O) => {
                            O.stopPropagation(), r(k.id);
                          },
                          className: C(
                            "inline-flex size-7 items-center justify-center rounded-md",
                            "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                            "hover:bg-destructive hover:text-destructive-foreground [&_svg]:size-4"
                          ),
                          children: /* @__PURE__ */ i(ct, {})
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ i(po, { widget: k, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: C(Zt, "absolute inset-0 cursor-move rounded-xl") })
              ]
            },
            A.i
          )
        );
      })
    }
  ) : null }) });
}
function Pd(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function jd({
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
  const r = Fa({
    extensions: [Pa],
    editable: !0,
    content: Pd(e.doc),
    onUpdate: ({ editor: o }) => {
      const s = o.getJSON();
      n.current({ ...a.current, doc: s });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: C(
          uo,
          "min-h-[8rem] rounded-md border border-input bg-background px-3 py-2",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        )
      }
    }
  });
  return r ? /* @__PURE__ */ i(le, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(Ed, { editor: r }),
    /* @__PURE__ */ i($a, { editor: r })
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
      className: C(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "[&_svg]:size-4",
        e && "bg-muted text-foreground"
      ),
      children: a
    }
  );
}
function Ed({ editor: e }) {
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
            children: /* @__PURE__ */ i(gi, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(bi, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(yi, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(vi, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(xi, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(ki, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(Ni, {})
          }
        ),
        /* @__PURE__ */ i(
          Pe,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(wi, {})
          }
        )
      ]
    }
  );
}
const Id = tr(
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
function Vd({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: C(Id({ variant: t }), e), ...n });
}
function qd({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: a,
  id: r,
  className: o
}) {
  const { meta: s, isLoading: l } = Be(), c = x.useMemo(() => dn(s), [s]), u = c.filter((h) => h.type === "cube"), d = c.filter((h) => h.type === "view"), p = c.find((h) => h.name === e);
  return /* @__PURE__ */ f(we, { value: e, onValueChange: t, disabled: a || l, children: [
    /* @__PURE__ */ i(_e, { id: r, className: o, children: /* @__PURE__ */ i(Ce, { placeholder: l ? "Loading…" : n, children: p ? /* @__PURE__ */ i(On, { option: p }) : void 0 }) }),
    /* @__PURE__ */ f(Se, { children: [
      d.length > 0 ? /* @__PURE__ */ f(En, { children: [
        /* @__PURE__ */ i(In, { children: "Views" }),
        d.map((h) => /* @__PURE__ */ i(he, { value: h.name, children: /* @__PURE__ */ i(On, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ f(En, { children: [
        /* @__PURE__ */ i(In, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(he, { value: h.name, children: /* @__PURE__ */ i(On, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function On({ option: e }) {
  const t = e.type === "view" ? er : Aa;
  return /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ i(t, { className: "size-4 shrink-0 text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "truncate", children: e.title }),
    /* @__PURE__ */ i(Vd, { variant: "secondary", className: "ml-auto shrink-0 px-1.5 py-0 text-[10px]", children: e.type })
  ] });
}
const Kd = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Bd(e) {
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
function Hd({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: a } = e.control, r = (l) => n({ ...e, control: { ...e.control, control: l } }), o = (l) => n({ ...e, control: { ...e.control, variable: l } }), s = (l) => {
    l !== a.kind && r(Bd(l));
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
              /* @__PURE__ */ i(_e, { children: /* @__PURE__ */ i(Ce, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Se, { children: t.map((l) => /* @__PURE__ */ i(he, { value: l.name, children: l.label ? `${l.label} (${l.name})` : l.name }, l.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(le, { label: "Control", children: /* @__PURE__ */ f(we, { value: a.kind, onValueChange: (l) => s(l), children: [
      /* @__PURE__ */ i(_e, { children: /* @__PURE__ */ i(Ce, {}) }),
      /* @__PURE__ */ i(Se, { children: Wi.options.map((l) => /* @__PURE__ */ i(he, { value: l, children: Kd[l] }, l)) })
    ] }) }),
    /* @__PURE__ */ i(Wd, { control: a, onChange: r, variables: t })
  ] });
}
function Wd({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(Gd, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(Ud, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(Yd, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(Qd, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(Jd, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(Xd, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Gd({
  control: e,
  onChange: t
}) {
  const n = (e.presets ?? []).join(", ");
  return /* @__PURE__ */ f(ae, { children: [
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
      pe,
      {
        label: "Allow future dates",
        checked: e.allowFuture ?? !0,
        onChange: (a) => t({ ...e, allowFuture: a })
      }
    )
  ] });
}
function Ud({
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
  return /* @__PURE__ */ f(ae, { children: [
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
              /* @__PURE__ */ i(_e, { children: /* @__PURE__ */ i(Ce, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ f(Se, { children: [
                /* @__PURE__ */ i(he, { value: s, children: "None" }),
                o.map((l) => /* @__PURE__ */ i(he, { value: l.name, children: l.label ? `${l.label} (${l.name})` : l.name }, l.name))
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
function Yd({
  control: e,
  onChange: t
}) {
  const n = (o, s) => {
    const l = e.options.map(
      (c, u) => u === o ? { value: s.value ?? String(c.value), label: s.label ?? c.label } : c
    );
    t({ ...e, options: l });
  }, a = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), r = (o) => t({ ...e, options: e.options.filter((s, l) => l !== o) });
  return /* @__PURE__ */ f(ae, { children: [
    /* @__PURE__ */ i(
      pe,
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
        action: /* @__PURE__ */ f(H, { variant: "ghost", size: "sm", onClick: a, children: [
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
            H,
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
function Qd({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ f(ae, { children: [
    /* @__PURE__ */ i(le, { label: "From", children: /* @__PURE__ */ f(
      we,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(_e, { children: /* @__PURE__ */ i(Ce, {}) }),
          /* @__PURE__ */ f(Se, { children: [
            /* @__PURE__ */ i(he, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(he, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(he, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
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
          H,
          {
            variant: "ghost",
            size: "sm",
            className: "h-6 px-1.5 text-xs text-muted-foreground",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ i(
          qd,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Jd({
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
function Xd({
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
  return /* @__PURE__ */ f(ae, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function Zd(e) {
  return { schemaVersion: et, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function ef(e) {
  const t = {
    schemaVersion: et,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function tf(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function pa({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: a,
  fill: r = !1
}) {
  const o = a ? (s) => a([...t, s]) : void 0;
  return /* @__PURE__ */ f("div", { "data-slot": "widget-edit-panel", className: C("flex flex-col gap-2", r && "h-full"), children: [
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
      /* @__PURE__ */ i(hr, { spec: Zd(t), children: /* @__PURE__ */ i(jm, { createVariable: o, children: /* @__PURE__ */ i("div", { className: C(r && "min-h-0 flex-1"), children: /* @__PURE__ */ i(
        Cd,
        {
          fill: r,
          spec: ef(e),
          onChange: (s) => n(tf(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(jd, { widget: e, onChange: n }) : /* @__PURE__ */ i(Hd, { widget: e, variables: t, onChange: n })
  ] });
}
function nf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !1,
  open: r = !0,
  onToggle: o,
  regionId: s,
  className: l
}) {
  const c = /* @__PURE__ */ f(ae, { children: [
    a ? /* @__PURE__ */ i(
      Xn,
      {
        className: C(
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
      className: C("flex items-center justify-between gap-2", l),
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
function rf({
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
  const u = o !== void 0, [d, p] = x.useState(r), h = a ? u ? o : d : !0, b = x.useId(), y = x.useCallback(() => {
    const g = !h;
    u || p(g), s == null || s(g);
  }, [h, u, s]);
  return /* @__PURE__ */ f(
    "section",
    {
      "data-slot": "section",
      "data-state": h ? "open" : "closed",
      className: C("border-b border-border py-2 last:border-b-0", l),
      children: [
        /* @__PURE__ */ i(
          nf,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: a,
            open: h,
            onToggle: y,
            regionId: b
          }
        ),
        h ? /* @__PURE__ */ i("div", { id: b, "data-slot": "section-body", className: "pt-2", children: c }) : null
      ]
    }
  );
}
function af(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function of(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function sf(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function lf(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function cf(e, t) {
  switch (e) {
    case "chart":
      return of(t);
    case "text":
      return sf(t);
    case "input":
      return lf(t);
  }
}
function uf(e) {
  return { name: e, type: "string" };
}
function mf(e) {
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
const df = {
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
function ff({
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
    t(e.map((d, p) => p === c ? pf(d, u) : d));
  }, s = (c) => t(e.filter((u, d) => d !== c)), l = () => t([...e, uf(r())]);
  return /* @__PURE__ */ i(
    rf,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ f(H, { variant: "ghost", size: "sm", onClick: l, children: [
        /* @__PURE__ */ i(Tt, {}),
        " Add"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ f("p", { className: "py-1 text-xs text-muted-foreground", children: [
        "No variables. Variables bind input controls and `",
        "{var}",
        "` query tokens."
      ] }) : /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: e.map((c, u) => /* @__PURE__ */ i(
        hf,
        {
          decl: c,
          duplicate: e.some((d, p) => p !== u && d.name === c.name && c.name !== ""),
          onChange: (d) => o(u, d),
          onRemove: () => s(u)
        },
        u
      )) })
    }
  );
}
function pf(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = mf(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function hf({
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
            H,
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
              /* @__PURE__ */ i(_e, { children: /* @__PURE__ */ i(Ce, {}) }),
              /* @__PURE__ */ i(Se, { children: Va.options.map((o) => /* @__PURE__ */ i(he, { value: o, children: df[o] }, o)) })
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
          pe,
          {
            label: "Array",
            hint: "Holds multiple values (multi-select).",
            checked: e.array ?? !1,
            onChange: (o) => n({ array: o })
          }
        ),
        /* @__PURE__ */ i(gf, { decl: e, onChange: (o) => n({ default: o }) })
      ]
    }
  );
}
function gf({
  decl: e,
  onChange: t
}) {
  if (e.type === "boolean")
    return /* @__PURE__ */ i(
      pe,
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
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : bf(e.default);
  return /* @__PURE__ */ i(le, { label: "Default", hint: n, className: "py-1", children: /* @__PURE__ */ i(
    me,
    {
      value: a,
      placeholder: yf(e.type),
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
function bf(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function yf(e) {
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
function Gf({
  spec: e,
  onChange: t,
  onSave: n,
  newId: a,
  debounceMs: r = 300,
  className: o
}) {
  const [s, l] = x.useState(e);
  x.useEffect(() => l(e), [e]);
  const [c, u] = x.useState(null), [d, p] = x.useState(null), h = x.useRef(null);
  h.current === null && (h.current = a ?? af());
  const b = a ?? h.current, y = Mo(
    (M) => t == null ? void 0 : t(M),
    r
  ), g = x.useCallback(
    (M) => {
      l((S) => {
        const B = M(S);
        return y(B), B;
      });
    },
    [y]
  ), v = x.useCallback(
    (M) => {
      const S = cf(M, b());
      g((B) => Od(B, S)), u(S.id), p({ kind: "widget", id: S.id });
    },
    [g, b]
  ), _ = x.useCallback((M) => u(M), []), R = x.useCallback((M) => {
    u(M), p({ kind: "widget", id: M });
  }, []), N = x.useCallback(
    (M) => {
      g((S) => Dd(S, M)), u((S) => S === M ? null : S), p((S) => (S == null ? void 0 : S.kind) === "widget" && S.id === M ? null : S);
    },
    [g]
  ), A = x.useCallback(
    (M) => g((S) => zd(S, M)),
    [g]
  ), k = x.useCallback(
    (M) => g((S) => ({ ...S, layout: Rd(S.layout, M) })),
    [g]
  ), w = x.useCallback(
    (M) => g((S) => ({ ...S, name: M || void 0 })),
    [g]
  ), O = x.useCallback(
    (M) => g((S) => ({ ...S, variables: M })),
    [g]
  ), $ = x.useMemo(
    () => Ba.safeParse(s),
    [s]
  ), V = x.useCallback(() => {
    $.success && (n == null || n($.data));
  }, [$, n]), j = (d == null ? void 0 : d.kind) === "widget" ? s.widgets.find((M) => M.id === d.id) ?? null : null;
  x.useEffect(() => {
    (d == null ? void 0 : d.kind) === "widget" && !s.widgets.some((M) => M.id === d.id) && p(null);
  }, [d, s.widgets]);
  const E = x.useCallback(() => p(null), []), q = (d == null ? void 0 : d.kind) === "variables" ? "Dashboard variables" : j ? j.title ?? `${vf(j.type)} widget` : "";
  return /* @__PURE__ */ f("div", { "data-slot": "dashboard-editor", className: o, children: [
    /* @__PURE__ */ i(
      _d,
      {
        name: s.name ?? "",
        onNameChange: w,
        onAdd: v,
        onEditVariables: () => p({ kind: "variables" }),
        onSave: n ? V : void 0,
        saveDisabled: !$.success
      }
    ),
    $.success ? null : /* @__PURE__ */ f("p", { className: "mb-2 text-xs text-destructive", children: [
      $.error.issues.length,
      " validation issue",
      $.error.issues.length === 1 ? "" : "s",
      " — fix before saving."
    ] }),
    /* @__PURE__ */ i(
      $d,
      {
        spec: s,
        selectedId: c,
        onSelect: _,
        onEdit: R,
        onDelete: N,
        onLayoutChange: k
      }
    ),
    d ? /* @__PURE__ */ f(
      "div",
      {
        "data-slot": "dashboard-editor-fullscreen",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": q,
        className: "fixed inset-0 z-50 flex flex-col bg-background",
        children: [
          /* @__PURE__ */ f("header", { className: "flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-2.5", children: [
            /* @__PURE__ */ f("div", { className: "flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ f(H, { variant: "ghost", size: "sm", onClick: E, children: [
                /* @__PURE__ */ i(Na, {}),
                " Done"
              ] }),
              /* @__PURE__ */ i("span", { className: "truncate text-sm font-medium", children: q })
            ] }),
            j ? /* @__PURE__ */ f(
              H,
              {
                variant: "ghost",
                size: "sm",
                className: "text-destructive hover:text-destructive",
                onClick: () => N(j.id),
                children: [
                  /* @__PURE__ */ i(ct, {}),
                  " Delete"
                ]
              }
            ) : null
          ] }),
          /* @__PURE__ */ i("div", { className: "min-h-0 flex-1 overflow-hidden p-4", children: d.kind === "variables" ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(ff, { variables: s.variables, onChange: O }) }) : (j == null ? void 0 : j.type) === "chart" ? /* @__PURE__ */ i(
            pa,
            {
              fill: !0,
              widget: j,
              variables: s.variables,
              onChange: A,
              onVariablesChange: O
            }
          ) : j ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(
            pa,
            {
              widget: j,
              variables: s.variables,
              onChange: A,
              onVariablesChange: O
            }
          ) }) : null })
        ]
      }
    ) : null
  ] });
}
function vf(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
export {
  Kc as AreaChartFamily,
  Sc as AreaFamilyOptionsSchema,
  Ki as AxesOptionsSchema,
  Nn as AxisOptionsSchema,
  Vc as BarChartFamily,
  Cc as BarFamilyOptionsSchema,
  Oo as CANONICAL_BREAKPOINT,
  Ve as ChartColorTokenSchema,
  kd as ChartEditOverlay,
  Cd as ChartEditor,
  ji as ChartFamilySchema,
  Ia as ChartOptionsSchema,
  ku as ChartRenderer,
  Ka as ChartSpecSchema,
  Wf as ChartView,
  Ui as ChartWidgetSchema,
  Bi as ColorAssignmentSchema,
  bu as ComboChartFamily,
  Tc as ComboFamilyOptionsSchema,
  Lc as ComboSeriesOptSchema,
  Dc as CondFormatRuleSchema,
  br as CubeChart,
  zu as CubeChartSpec,
  Ea as CubeQuerySchema,
  pr as CubeVizContext,
  Kf as CubeVizProvider,
  Qa as DEFAULTS,
  ge as DEFAULT_COLOR_RAMP,
  Do as DEFAULT_COLS,
  Fn as DEFAULT_UNIT_CONVERSIONS,
  Zt as DRAG_HANDLE_CLASS,
  Hf as Dashboard,
  Gf as DashboardEditor,
  hr as DashboardProvider,
  Ba as DashboardSpecSchema,
  Dn as DateRangeSchema,
  Kr as EM_DASH,
  $d as EditorCanvas,
  _d as EditorToolbar,
  qm as FilterBuilder,
  Ti as FilterOperatorSchema,
  Ei as FormatKindSchema,
  an as FormatOptionsSchema,
  Cs as GRANULARITY_PATTERN,
  Ye as GranularitySchema,
  Zi as GridConfigSchema,
  Wi as InputControlKindSchema,
  Gi as InputControlSchema,
  Hd as InputWidgetEditor,
  Qi as InputWidgetSchema,
  Ju as InputWidgetView,
  Zc as KpiFamily,
  Mc as KpiFamilyOptionsSchema,
  Xi as LayoutItemSchema,
  Fi as LeafFilterSchema,
  Vi as LegendOptionsSchema,
  qc as LineChartFamily,
  _c as LineFamilyOptionsSchema,
  X as MemberSchema,
  Er as OrderDirSchema,
  Pi as OrderSpecSchema,
  Bc as PieChartFamily,
  Rc as PieFamilyOptionsSchema,
  zn as QueryFilterSchema,
  Ft as ReferenceLineOptSchema,
  po as RenderWidget,
  et as SCHEMA_VERSION,
  Li as ScalarSchema,
  Wc as ScatterChartFamily,
  Ac as ScatterFamilyOptionsSchema,
  Ii as SeriesMappingSchema,
  Ir as SeriesMetaSchema,
  Ha as SpecSchema,
  Oc as TableColumnOptSchema,
  lu as TableFamily,
  zc as TableFamilyOptionsSchema,
  jd as TextWidgetEditor,
  Yi as TextWidgetSchema,
  Tu as TextWidgetView,
  $i as TimeDimensionSchema,
  Hi as TipTapDocSchema,
  qi as TooltipOptionsSchema,
  Qt as VarRefSchema,
  es as VariableDeclSchema,
  Va as VariableTypeSchema,
  ja as VariableValueSchema,
  ff as VariablesPanel,
  fo as WidgetChrome,
  pa as WidgetEditPanel,
  Ji as WidgetSpecSchema,
  Od as appendWidget,
  qr as assignColors,
  gc as axisKey,
  so as builtinCharts,
  rs as createCubeClient,
  af as createIdFactory,
  Ya as createUnitsFormatter,
  ws as createVariableStore,
  Rs as datePattern,
  $n as deepMerge,
  mf as defaultForType,
  rr as defaultFormatter,
  qf as familyOptionsSchema,
  as as fetchMeta,
  If as formatCategory,
  _t as formatDateValue,
  at as isEmptyValue,
  Ne as isVarRef,
  ns as loadSpec,
  Wa as looksLikeIsoDate,
  Ua as makeChartFormat,
  Ef as makeDateFormatter,
  Vf as makeFormatter,
  Rd as mergeLayout,
  ln as mergeUnitConversions,
  of as newChartWidget,
  lf as newInputWidget,
  sf as newTextWidget,
  uf as newVariable,
  cf as newWidget,
  ds as normalize,
  Sd as pickCanonicalLayout,
  Md as placeNewItem,
  yc as quantityLabel,
  Dd as removeWidget,
  zd as replaceWidget,
  wu as resolveChart,
  $c as resolveOptions,
  Ns as resolveQuery,
  Ln as resolveSeriesColors,
  ys as resolveValue,
  Pf as safeLoadSpec,
  Ss as toDate,
  ss as toResultAnnotation,
  Nd as useChartEditorState,
  co as useContainerWidth,
  Be as useCubeMeta,
  _u as useCubeQuery,
  Ke as useCubeVizContext,
  lo as useDashboard,
  Mo as useDebouncedCallback,
  Bf as useFormatter,
  Rn as useNormalizedSeries,
  gr as useOptionalDashboard,
  jf as validateSpec
};
//# sourceMappingURL=index.js.map
