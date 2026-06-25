import { jsx as i, jsxs as f, Fragment as re } from "react/jsx-runtime";
import * as ar from "recharts";
import { BarChart as mi, CartesianGrid as $t, YAxis as $e, XAxis as ct, Bar as Ta, LabelList as za, ReferenceLine as Pt, LineChart as di, Line as Fa, AreaChart as $a, Area as or, PieChart as fi, Pie as hi, Cell as Pa, Label as pi, ScatterChart as gi, ZAxis as bi, Scatter as yi, RadialBarChart as vi, PolarAngleAxis as xi, RadialBar as wi, ResponsiveContainer as ki, ComposedChart as Ni } from "recharts";
import * as x from "react";
import { createContext as Ea, useContext as ir, useMemo as Z, useState as ut, useCallback as qe, useEffect as Et, useRef as it, createElement as Ci, useSyncExternalStore as Si, useId as _i } from "react";
import { clsx as Ri } from "clsx";
import { twMerge as Ai } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as Mi, ArrowUp as sr, ArrowDown as lr, ChevronsUpDown as Oi, AlertCircle as Ia, ChevronLeft as cr, ChevronRight as dn, ChevronDown as tt, Check as Pe, ChevronUp as Li, CalendarIcon as ja, MoreVertical as Di, RefreshCw as Ti, Image as zi, Sheet as Fi, Type as ur, Hash as Va, Calendar as qa, Search as $i, Table2 as Ka, Database as Ba, Layers as mr, Variable as Pi, Plus as It, Trash2 as pt, ListFilter as Ei, Box as Ha, EyeOff as Wa, Eye as Ga, BarChart4 as Ii, Table as ji, Gauge as Vi, ScatterChart as qi, PieChart as Ki, AreaChart as Bi, LineChart as Hi, BarChart3 as Ua, X as Yr, Save as Ya, SlidersHorizontal as Wi, Braces as Gi, Undo2 as Ui, Redo2 as Yi, RotateCcw as Qi, Pencil as Ji, Copy as Xi, Bold as Zi, Italic as es, Strikethrough as ts, Heading1 as ns, Heading2 as rs, List as as, ListOrdered as os, Quote as is } from "lucide-react";
import * as Zt from "@radix-ui/react-popover";
import { cva as dr } from "class-variance-authority";
import * as be from "@radix-ui/react-select";
import ss from "@cubejs-client/core";
import { format as de, isValid as _t, parseISO as en, differenceInCalendarDays as ls, subDays as _e, startOfMonth as Sn, subMonths as _n, startOfQuarter as Rn, subQuarters as An, startOfYear as Mn, subYears as On, subWeeks as cs, startOfWeek as us, endOfWeek as ms, endOfMonth as ds, endOfQuarter as fs, endOfYear as hs, parse as Qa } from "date-fns";
import { DayPicker as ps, useDayPicker as gs } from "react-day-picker";
import { ResponsiveGridLayout as Ja } from "react-grid-layout";
import { useEditor as Xa, EditorContent as Za } from "@tiptap/react";
import eo from "@tiptap/starter-kit";
const st = 1, tn = m.object({ var: m.string().min(1) }).strict();
function Re(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const nn = (e) => m.union([e, tn]), bs = m.union([m.string(), m.number(), m.boolean()]), Xe = m.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Vn = m.union([m.tuple([m.string(), m.string()]), m.string()]), to = m.union([
  m.string(),
  m.number(),
  m.boolean(),
  m.tuple([m.string(), m.string()]),
  // absolute date range
  m.array(m.string()),
  m.array(m.number())
]), ee = m.string().min(1), ys = m.enum([
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
]), vs = m.object({
  member: ee,
  operator: ys,
  values: m.array(m.union([bs, tn])).optional()
}).strict(), qn = m.lazy(
  () => m.union([
    vs,
    m.object({ and: m.array(qn) }).strict(),
    m.object({ or: m.array(qn) }).strict()
  ])
), xs = m.object({
  dimension: ee,
  granularity: nn(Xe).optional(),
  dateRange: nn(Vn).optional(),
  compareDateRange: m.array(Vn).optional()
}).strict(), Qr = m.enum(["asc", "desc"]), ws = m.union([
  m.record(ee, Qr),
  m.array(m.tuple([ee, Qr]))
]), no = m.object({
  measures: m.array(ee).optional(),
  dimensions: m.array(ee).optional(),
  timeDimensions: m.array(xs).optional(),
  filters: m.array(qn).optional(),
  segments: m.array(ee).optional(),
  order: ws.optional(),
  limit: nn(m.number()).optional(),
  offset: nn(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), ks = m.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
]), Be = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Ns = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), fn = m.object({
  kind: Ns.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional()
}).strict(), Jr = m.object({
  label: m.string().optional(),
  colorToken: Be.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: fn.optional()
}).strict(), Cs = m.object({
  category: m.object({ member: ee }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(ee),
      meta: m.record(ee, Jr).optional()
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
      meta: m.record(ee, Jr).optional()
    }).strict()
  ])
}).strict(), Ss = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), _s = m.object({
  show: m.boolean().optional(),
  indicator: m.enum(["dot", "line", "dashed"]).optional(),
  showTotal: m.boolean().optional()
}).strict(), Xr = m.union([m.number(), m.literal("auto")]), Ln = m.object({
  label: m.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: m.boolean().optional(),
  hide: m.boolean().optional(),
  scale: m.enum(["linear", "log"]).optional(),
  domain: m.tuple([Xr, Xr]).optional(),
  tickFormat: fn.optional()
}).strict(), Rs = m.object({
  x: Ln.optional(),
  y: Ln.optional(),
  y2: Ln.optional()
}).strict(), As = m.object({
  byKey: m.record(m.string(), Be).optional(),
  ramp: m.array(Be).optional()
}).strict(), ro = m.object({
  family: ks,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Cs.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Ss.optional(),
  tooltip: _s.optional(),
  axes: Rs.optional(),
  colors: As.optional(),
  format: fn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Ms = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), Os = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Ls = m.object({
  variable: m.string().min(1),
  control: m.discriminatedUnion("kind", [
    m.object({
      kind: m.literal("dateRange"),
      presets: m.array(m.string()).optional(),
      allowFuture: m.boolean().optional()
    }).strict(),
    m.object({
      kind: m.literal("granularity"),
      options: m.array(Xe).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: m.string().optional()
    }).strict(),
    m.object({
      kind: m.literal("select"),
      options: m.array(m.object({ value: to, label: m.string() }).strict()),
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
}).strict(), fr = {
  id: m.string().min(1),
  title: m.string().optional()
}, Ds = m.object({ ...fr, type: m.literal("chart"), query: no, chart: ro }).strict(), Ts = m.object({ ...fr, type: m.literal("text"), doc: Ms }).strict(), zs = m.object({ ...fr, type: m.literal("input"), control: Ls }).strict(), Fs = m.discriminatedUnion("type", [
  Ds,
  Ts,
  zs
]), $s = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), Ps = m.object({
  cols: m.number().optional(),
  rowHeight: m.number().optional(),
  margin: m.tuple([m.number(), m.number()]).optional(),
  containerPadding: m.tuple([m.number(), m.number()]).optional()
}).strict(), ao = m.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Es = m.object({
  name: m.string().min(1),
  type: ao,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: to.optional()
}).strict(), oo = {
  schemaVersion: m.literal(st),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, io = m.object({ ...oo, kind: m.literal("chart"), query: no, chart: ro }).strict(), so = m.object({
  ...oo,
  kind: m.literal("dashboard"),
  variables: m.array(Es),
  widgets: m.array(Fs),
  layout: m.array($s),
  grid: Ps.optional()
}).strict(), lo = m.discriminatedUnion("kind", [io, so]), Is = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function js(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > st)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${st} — update the library`
    );
  for (; n < st; ) {
    const r = Is[n];
    if (!r) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = r(t), n += 1, t.schemaVersion = n;
  }
  return lo.parse(t);
}
function Np(e) {
  try {
    return { ok: !0, spec: js(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function Cp(e) {
  return lo.parse(e);
}
function Vs(e) {
  return ss(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function qs(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ge = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Ks = /* @__PURE__ */ new Set(["bar", "line", "area", "pie"]), Dn = 8;
function Kn(e, t) {
  var c;
  const n = (c = t == null ? void 0 : t.ramp) != null && c.length ? t.ramp : ge, r = (t == null ? void 0 : t.byKey) ?? {}, a = (u, d) => r[u] ?? d, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = a(u.key, u.colorToken);
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
  return e.map((u) => a(u.key, u.colorToken) ?? l());
}
function Zr(e, t) {
  const n = Kn(e, t);
  return e.forEach((r, a) => {
    r.colorToken = n[a];
  }), e;
}
function Bs(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function Ut(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Bs(e[n]);
  return t;
}
function Hs(e) {
  return {
    measures: Ut(e.measures ?? {}),
    dimensions: Ut(e.dimensions ?? {}),
    segments: Ut(e.segments ?? {}),
    timeDimensions: Ut(e.timeDimensions ?? {})
  };
}
function lt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function hn(e, t, n) {
  const r = e == null ? void 0 : e.meta, a = {};
  (r == null ? void 0 : r.unit) !== void 0 && (a.unit = r.unit), (r == null ? void 0 : r.quantity) !== void 0 && (a.quantity = r.quantity), (r == null ? void 0 : r.convert) !== void 0 && (a.convert = r.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && a.unit === void 0 && (a.unit = "%");
  let s = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!s || s.kind === void 0 || s.kind === "auto") && (s = { ...s, kind: "currency" }), s && (a.format = s), t != null && t.axis && (a.axis = t.axis), t != null && t.stackId && (a.stackId = t.stackId), t != null && t.curve && (a.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (a.dots = t.dots), a;
}
function Ws(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Gs(e, t) {
  var r, a;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, s] of Object.entries(e.measures)) {
    const l = (r = s.meta) == null ? void 0 : r.unit;
    if (!l || ((a = s.meta) == null ? void 0 : a.convert) === !1) continue;
    const c = t.conversions[l];
    c && (n.set(o, { to: c.toImperial, unit: c.imperialUnit }), e.measures[o] = { ...s, meta: { ...s.meta, unit: c.imperialUnit } });
  }
  return n;
}
function Us(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const r = { ...n };
    for (const [a, o] of t) {
      const s = pn(r[a]);
      s !== null && (r[a] = o.to(s));
    }
    return r;
  });
}
function Ys(e, t) {
  var n;
  if (t.size !== 0)
    for (const r of e) {
      const a = (n = r.meta) != null && n.measure ? t.get(r.meta.measure) : void 0;
      a && (r.data = r.data.map((o) => o === null ? null : a.to(o)));
    }
}
function Qs(e, t, n, r) {
  const a = Hs(e.annotation()), o = Gs(a, r), s = Us(e.tablePivot(), o), l = t.mapping;
  if (!l) {
    const d = n.measures ?? [];
    if (Ks.has(t.family) && d.length > 0) {
      const h = s[0] ?? {}, p = [
        {
          key: "value",
          label: "Value",
          data: d.map((y) => pn(h[y])),
          meta: { ...hn(lt(a, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Zr(p, t.colors), { categories: d.map(
        (y) => {
          var g, v;
          return ((g = lt(a, y)) == null ? void 0 : g.shortTitle) ?? ((v = lt(a, y)) == null ? void 0 : v.title) ?? y;
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
  const c = l.series.mode === "measures" ? Xs(e, l.series, t, a) : Zs(e, l.category.member, l.series, t, a), u = Js(e, l);
  return Ys(c, o), Zr(c, t.colors), {
    categories: u,
    series: c,
    raw: { rows: s, annotation: a, query: n },
    empty: s.length === 0
  };
}
function Js(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((a) => a.x);
}
function Xs(e, t, n, r) {
  const { members: a, meta: o } = t, s = e.chartPivot();
  return a.map((l) => {
    const c = lt(r, l), u = o == null ? void 0 : o[l], d = s.map((h) => pn(h[l]));
    return {
      key: l,
      label: Ws(c, u, l),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...hn(c, u, n.format), measure: l }
    };
  });
}
function Zs(e, t, n, r, a) {
  const { value: o, values: s, pivot: l } = n, c = s && s.length > 0 ? s : [o], u = new Set(c), d = c.length > 1, h = { x: [t], y: [l, "measures"] }, b = e.seriesNames(h).filter((S) => {
    const R = S.yValues && S.yValues.length >= 2 ? S.yValues[S.yValues.length - 1] : void 0;
    return R === void 0 || u.has(R);
  }), y = e.chartPivot(h), g = lt(a, o), v = b.map((S) => {
    var K, j;
    const R = (K = S.yValues) == null ? void 0 : K[0], k = S.yValues && S.yValues.length >= 2 ? S.yValues[S.yValues.length - 1] : o, _ = lt(a, k), C = (_ == null ? void 0 : _.shortTitle) ?? (_ == null ? void 0 : _.title) ?? k, w = R ?? S.shortTitle ?? S.title ?? S.key, L = d ? `${C} · ${w}` : w, T = y.map((B) => pn(B[S.key])), V = (j = n.meta) == null ? void 0 : j[k];
    return {
      key: S.key,
      label: L,
      data: T,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...hn(_ ?? g, V, r.format),
        measure: k
      }
    };
  });
  return el(v, g, r.format);
}
function el(e, t, n) {
  var d, h, p;
  if (e.length <= Dn) return e;
  const r = (b) => b.data.reduce((y, g) => y + (g ?? 0), 0), a = [...e].sort((b, y) => r(y) - r(b)), o = a.slice(0, Dn - 1), s = a.slice(Dn - 1), l = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, c = Array.from({ length: l }, (b, y) => {
    let g = 0, v = !1;
    for (const S of s) {
      const R = S.data[y];
      R !== null && (g += R, v = !0);
    }
    return v ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${s.length})`,
    data: c,
    meta: { ...hn(t, void 0, n), ...(p = (h = o[0]) == null ? void 0 : h.meta) != null && p.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function pn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function mt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const tl = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function nl(e, t, n) {
  var r;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (r = n.find((a) => a.name === e)) == null ? void 0 : r.default;
}
function zt(e, t, n) {
  var r;
  if (Re(e)) {
    const a = e.var;
    return Object.prototype.hasOwnProperty.call(n, a) && n[a] !== void 0 ? n[a] : (r = t.get(a)) == null ? void 0 : r.default;
  }
  return e;
}
function rl(e, t, n) {
  const r = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return r ? { member: e.member, operator: e.operator } : void 0;
  const a = [];
  for (const o of e.values) {
    const s = zt(o, t, n);
    if (!mt(s))
      if (Array.isArray(s))
        for (const l of s)
          mt(l) || a.push(l);
      else
        a.push(s);
  }
  return a.length === 0 ? r ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: a };
}
function al(e, t, n) {
  if ("and" in e) {
    const r = Bn(e.and, t, n);
    return r.length > 0 ? { and: r } : void 0;
  }
  if ("or" in e) {
    const r = Bn(e.or, t, n);
    return r.length > 0 ? { or: r } : void 0;
  }
  return rl(e, t, n);
}
function Bn(e, t, n) {
  const r = [];
  for (const a of e) {
    const o = al(a, t, n);
    o !== void 0 && r.push(o);
  }
  return r;
}
function ol(e, t, n) {
  const r = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const a = zt(e.granularity, t, n);
    mt(a) || (r.granularity = a);
  }
  if (e.dateRange !== void 0) {
    const a = zt(e.dateRange, t, n);
    mt(a) || (r.dateRange = a);
  }
  return e.compareDateRange !== void 0 && (r.compareDateRange = e.compareDateRange), r;
}
function il(e, t, n) {
  const r = tl(n), a = {};
  if (e.measures !== void 0 && (a.measures = [...e.measures]), e.dimensions !== void 0 && (a.dimensions = [...e.dimensions]), e.segments !== void 0 && (a.segments = [...e.segments]), e.timeDimensions !== void 0 && (a.timeDimensions = e.timeDimensions.map((o) => ol(o, r, t))), e.filters !== void 0) {
    const o = Bn(e.filters, r, t);
    o.length > 0 && (a.filters = o);
  }
  if (e.order !== void 0 && (a.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = zt(e.limit, r, t);
    mt(o) || (a.limit = o);
  }
  if (e.offset !== void 0) {
    const o = zt(e.offset, r, t);
    mt(o) || (a.offset = o);
  }
  return e.total !== void 0 && (a.total = e.total), e.timezone !== void 0 && (a.timezone = e.timezone), a;
}
function sl(e, t) {
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
        const l = { ...n };
        delete l[o], n = l;
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
const ll = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, cl = "MMM d, yyyy";
function ul(e) {
  if (e instanceof Date) return _t(e) ? e : null;
  if (typeof e == "number") {
    const r = new Date(e);
    return _t(r) ? r : null;
  }
  const t = en(e);
  if (_t(t)) return t;
  const n = new Date(e);
  return _t(n) ? n : null;
}
function co(e) {
  return /^\d{4}-\d{2}/.test(e) ? _t(en(e)) : !1;
}
function ml(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? ll[t] : cl;
}
function Ot(e, t, n) {
  const r = ul(e);
  return r ? de(r, ml(t, n)) : String(e);
}
function Sp(e, t) {
  return (n) => n == null ? "" : Ot(n, e, t);
}
function _p(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ot(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ot(e, t.format, t.granularity) : String(e) : co(e) ? Ot(e, t.format, t.granularity) : e;
}
const ea = "—", dl = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function ta(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function fl(e, t) {
  const n = Math.abs(e);
  for (const { limit: r, suffix: a } of dl)
    if (n >= r) return ta((e / r).toFixed(t)) + a;
  return ta(e.toFixed(t));
}
function hl(e, t, n) {
  const r = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (r.minimumFractionDigits = t.decimals, r.maximumFractionDigits = t.decimals) : r.maximumFractionDigits = 2, new Intl.NumberFormat(n, r).format(e);
}
function pl(e, t) {
  const { format: n, meta: r, locale: a } = t, o = n != null && n.abbreviate ? fl(e, n.decimals ?? 1) : hl(e, n, a), s = (n == null ? void 0 : n.suffix) ?? ((r == null ? void 0 : r.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${s ? ` ${s}` : ""}`;
}
function uo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function gl(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || uo(e.value) ? !0 : typeof e.value == "string" ? co(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const hr = (e) => {
  const { value: t, format: n, granularity: r } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? ea : (uo(t) || typeof t == "string" || typeof t == "number") && gl(e) ? Ot(t, n, r) : typeof t == "number" ? pl(t, e) : String(t);
};
function bl(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Rp(e, t) {
  return (n, r) => {
    const a = r ? bl(r, t) : void 0;
    return hr({
      value: n,
      meta: a == null ? void 0 : a.meta,
      title: (a == null ? void 0 : a.shortTitle) ?? (a == null ? void 0 : a.title),
      role: "value",
      format: e
    });
  };
}
function yl(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function vl(e) {
  const t = Xe.safeParse(e);
  return t.success ? t.data : void 0;
}
function xl(e, t) {
  var r;
  const n = (r = t.mapping) == null ? void 0 : r.category.member;
  if (!(!n || !e)) {
    for (const a of Object.keys(e.timeDimensions))
      if (a !== n && a.startsWith(`${n}.`)) {
        const o = vl(a.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function mo(e, t, n, r) {
  const a = xl(e, t);
  return {
    value(o, s, l = "value") {
      const c = s ? yl(s, e) : void 0, u = c == null ? void 0 : c.meta;
      return n({
        value: o,
        member: s,
        meta: u,
        title: (c == null ? void 0 : c.shortTitle) ?? (c == null ? void 0 : c.title),
        role: l,
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
class wl extends Error {
}
const kl = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new wl(`"${e}" cannot be parsed into a number`);
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
function na(e) {
  return e != null && typeof e == "object" && "numerator" in e && (typeof e.numerator == "number" || typeof e.numerator == "string") && "denominator" in e && (typeof e.denominator == "number" || typeof e.denominator == "string");
}
class Nl extends Error {
}
class ra extends Error {
}
class Cl extends Error {
}
class Tn extends Error {
}
class Sl extends Error {
}
class _l {
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
      throw new ra(".from must be called before .to");
    return this.origin = this.getUnit(t), this.origin == null && this.throwUnsupportedUnitError(t), this;
  }
  convertFraction(t) {
    return na(t) ? this.cls.div(t.numerator, t.denominator) : this.cls.create(t);
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
      throw new Cl(`Cannot convert incompatible measures of ${a.measure} and ${o.measure}`);
    let s = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (s = this.cls.sub(s, this.convertFraction(o.unit.anchor_shift))), o.system != a.system) {
      const c = this.measureData[o.measure].anchors;
      if (c == null)
        throw new Tn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${a.measure}" measures.`);
      const u = c[o.system];
      if (u == null)
        throw new Tn(`Unable to find anchor for "${o.measure}" to "${a.measure}". Please make sure it is defined.`);
      const d = (n = u[a.system]) === null || n === void 0 ? void 0 : n.transform, h = (r = u[a.system]) === null || r === void 0 ? void 0 : r.ratio;
      if (typeof d == "function")
        s = d(s, this.cls);
      else if (typeof h == "number")
        s = this.cls.mul(s, h);
      else if (na(h))
        s = this.cls.mul(s, this.convertFraction(h));
      else
        throw new Tn("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new ra(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let s = [], l = o ? -1 : 1, c = this.origin.system;
    typeof t == "object" && (s = (n = t.exclude) !== null && n !== void 0 ? n : [], l = (r = t.cutOffNumber) !== null && r !== void 0 ? r : l, c = (a = t.system) !== null && a !== void 0 ? a : this.origin.system);
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
      for (const [r, a] of Object.entries(this.measureData))
        for (const [o, s] of Object.entries(a.systems))
          for (const [l, c] of Object.entries(s))
            n.push(this.describeUnit({
              abbr: l,
              measure: r,
              system: o,
              unit: c
            }));
    else {
      if (!this.isMeasure(t))
        throw new Sl(`Meausure "${t}" not found.`);
      const r = this.measureData[t];
      for (const [a, o] of Object.entries(r.systems))
        for (const [s, l] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: s,
            measure: t,
            system: a,
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
    for (const r of Object.values(this.measureData))
      for (const a of Object.values(r.systems))
        n = n.concat(Object.keys(a));
    throw new Nl(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Rl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, r] of Object.entries(e))
    for (const [a, o] of Object.entries(r.systems))
      for (const [s, l] of Object.entries(o))
        t.set(s, {
          measure: n,
          system: a,
          abbr: s,
          unit: l
        });
  return t;
}
function Al(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Rl(e);
  return (r) => new _l({
    measures: e,
    unitCache: n,
    cls: kl
  }, r);
}
const Ml = {
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
}, Ol = {
  systems: {
    metric: Ml
  }
}, Ll = {
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
}, Dl = {
  systems: {
    SI: Ll
  }
}, Tl = {
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
}, zl = {
  systems: {
    SI: Tl
  }
}, Fl = {
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
}, $l = {
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
}, Pl = {
  systems: {
    metric: Fl,
    imperial: $l
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
}, El = {
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
}, Il = {
  systems: {
    SI: El
  }
}, jl = {
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
}, Vl = {
  systems: {
    SI: jl
  }
}, ql = {
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
}, Kl = {
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
}, Bl = {
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
}, Hl = {
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
}, Wl = {
  systems: {
    bit: ql,
    byte: Kl,
    IECBit: Bl,
    IECByte: Hl
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
}, Gl = {
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
}, Ul = {
  systems: {
    metric: Gl
  }
}, Yl = {
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
}, Ql = {
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
}, Jl = {
  systems: {
    SI: Yl,
    nutrition: Ql
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
}, Xl = {
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
}, Zl = {
  systems: {
    SI: Xl
  }
}, ec = {
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
}, tc = {
  systems: {
    SI: ec
  }
}, nc = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, rc = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, ac = {
  systems: {
    metric: nc,
    imperial: rc
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
}, oc = {
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
}, ic = {
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
}, sc = {
  systems: {
    metric: oc,
    imperial: ic
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
}, lc = {
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
}, cc = {
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
}, mc = {
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
}, dc = {
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
}, fc = {
  systems: {
    metric: mc,
    imperial: dc
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
}, hc = {
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
}, pc = {
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
}, gc = {
  systems: {
    metric: hc,
    imperial: pc
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
}, bc = {
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
}, yc = {
  systems: {
    SI: bc
  }
}, vc = {
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
}, xc = {
  systems: {
    unit: vc
  }
}, wc = {
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
}, kc = {
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
}, Nc = {
  systems: {
    metric: wc,
    imperial: kc
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
}, Cc = {
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
}, Sc = {
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
}, _c = {
  systems: {
    metric: Cc,
    imperial: Sc
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
}, Rc = {
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
}, Ac = {
  systems: {
    SI: Rc
  }
}, Mc = {
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
}, Oc = {
  systems: {
    SI: Mc
  }
}, Lc = {
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
}, Dc = {
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
}, Tc = {
  systems: {
    metric: Lc,
    imperial: Dc
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
}, zc = {
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
}, Fc = {
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
}, $c = {
  systems: {
    metric: zc,
    imperial: Fc
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
}, Pc = {
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
}, Ec = {
  systems: {
    SI: Pc
  }
}, Ic = {
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
}, jc = {
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
}, Vc = {
  systems: {
    metric: Ic,
    imperial: jc
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
}, qc = {
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
}, Kc = {
  systems: {
    SI: qc
  }
}, Bc = {
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
}, Hc = {
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
}, Wc = {
  systems: {
    metric: Bc,
    imperial: Hc
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
}, Gc = {
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
}, Uc = {
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
}, Yc = {
  systems: {
    metric: Gc,
    imperial: Uc
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
}, Qc = {
  acceleration: Ol,
  angle: Dl,
  apparentPower: zl,
  area: Pl,
  charge: Il,
  current: Vl,
  digital: Wl,
  each: Ul,
  energy: Jl,
  force: Zl,
  frequency: tc,
  illuminance: ac,
  length: sc,
  mass: uc,
  massFlowRate: fc,
  pace: gc,
  partsPer: yc,
  pieces: xc,
  power: Nc,
  pressure: _c,
  reactiveEnergy: Ac,
  reactivePower: Oc,
  speed: Tc,
  torque: Vc,
  temperature: $c,
  time: Ec,
  voltage: Kc,
  volume: Wc,
  volumeFlowRate: Yc
}, Jc = Al(Qc), Xc = {
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
function Zc(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Jc(t).from(e.from).to(e.to)
  };
}
const Hn = {
  ...Object.fromEntries(
    Object.entries(Xc).map(([e, t]) => [e, Zc(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function gn(e) {
  return e ? { ...Hn, ...e } : Hn;
}
function eu(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function tu(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function nu(e) {
  return e != null && e.quantity ? tu(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const ru = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function au(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function aa(e, t) {
  const n = e * (ru[t ?? "ms"] ?? 1), r = n < 0 ? "-" : "";
  let a = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], s = o.map(([c, u], d) => {
    const h = d < o.length - 1 ? Math.floor(a / c) : Math.round(a / c);
    return a -= h * c, [h, u];
  }), l = s.findIndex((c) => c[0] > 0);
  return l === -1 ? "0s" : r + s.slice(l, l + 2).filter((c) => c[0] > 0).map(([c, u]) => `${c}${u}`).join(" ");
}
function zn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const a = Math.abs(e);
    for (const [o, s] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (a >= o) return au((e / o).toFixed(n.decimals ?? 1)) + s;
  }
  const r = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, r).format(e);
}
function ou(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function oa(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function fo(e = Hn) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return hr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, r = t.meta, a = r == null ? void 0 : r.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return aa(n, r == null ? void 0 : r.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return oa(zn(n, t), o.prefix, o.suffix);
    }
    if (a === "time") return aa(n, r == null ? void 0 : r.unit);
    if (a === "count" || (r == null ? void 0 : r.convert) === !1) return oa(zn(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const s = r == null ? void 0 : r.unit, l = s ? ou(a, s) : {}, c = (o == null ? void 0 : o.prefix) ?? l.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : l.suffix ?? "";
    return `${c}${zn(n, t)}${u}`;
  };
}
function N(...e) {
  return Ai(Ri(e));
}
function pr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function iu({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: N("animate-pulse rounded-md bg-muted", e), ...t });
}
const su = dr(
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
), gr = x.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i(
  "div",
  {
    ref: r,
    "data-slot": "alert",
    role: "alert",
    className: N(su({ variant: t }), e),
    ...n
  }
));
gr.displayName = "Alert";
const br = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-title",
      className: N("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", e),
      ...t
    }
  )
);
br.displayName = "AlertTitle";
const yr = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "alert-description",
      className: N(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        e
      ),
      ...t
    }
  )
);
yr.displayName = "AlertDescription";
const jt = m.object({
  axis: m.enum(["x", "y"]),
  value: m.number(),
  label: m.string().optional(),
  colorToken: Be.optional()
}).strict(), vr = m.boolean().optional(), lu = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(jt).optional(),
  comparePrevious: vr
}).strict(), xr = m.enum(["linear", "monotone", "step", "natural"]), cu = m.object({
  curve: xr.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(jt).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: vr
}).strict(), uu = m.object({
  curve: xr.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(jt).optional(),
  comparePrevious: vr
}).strict(), mu = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), du = m.object({
  x: ee,
  y: ee,
  size: ee.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: ee.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(jt).optional()
}).strict(), fu = m.object({
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
    granularity: m.union([Xe, tn]).optional(),
    dateRange: m.union([Vn, tn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: m.enum(["up", "down"]).optional(),
  gauge: m.object({
    min: m.number().optional(),
    max: m.number(),
    thresholds: m.array(m.object({ at: m.number(), colorToken: Be }).strict()).optional()
  }).strict().optional(),
  icon: m.string().optional()
}).strict(), hu = m.object({
  member: ee,
  label: m.string().optional(),
  format: fn.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), pu = m.object({
  member: ee,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: Be.optional()
}).strict(), gu = m.object({
  columns: m.array(hu).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(pu).optional()
}).strict(), bu = m.object({
  member: ee,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: Be.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), yu = m.object({
  series: m.array(bu),
  referenceLines: m.array(jt).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: xr.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), vu = {
  bar: lu,
  line: cu,
  area: uu,
  pie: mu,
  scatter: du,
  kpi: fu,
  table: gu,
  combo: yu
};
function Ap(e) {
  return vu[e];
}
const ho = {
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
function ia(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function Wn(e, t) {
  if (t === void 0) return e;
  if (!ia(e) || !ia(t))
    return t;
  const n = { ...e };
  for (const r of Object.keys(t)) {
    const a = t[r];
    a !== void 0 && (n[r] = r in e ? Wn(e[r], a) : a);
  }
  return n;
}
function xu(e) {
  const t = ho[e.family];
  return {
    ...Wn({ ...t.envelope }, e),
    familyOptions: Wn(
      { ...t.familyOptions },
      e.familyOptions ?? {}
    )
  };
}
function wr(e) {
  return e.categories.map((t, n) => {
    const r = { __cat: typeof t == "number" ? t : String(t) };
    for (const a of e.series) r[a.key] = a.data[n] ?? null;
    return r;
  });
}
function gt(e) {
  return e === "top" ? "top" : "bottom";
}
function bt(e) {
  return "horizontal";
}
function yt(e) {
  return "center";
}
function we(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function Te(e) {
  return e == null ? void 0 : e.domain;
}
function ze(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function wu(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Lt(e) {
  return `var(${pr(e.key)})`;
}
function ku(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function po(e) {
  return e === "stacked" || e === "percent";
}
function bn(e, t) {
  var l, c, u, d, h, p, b, y, g, v, S, R, k, _;
  const n = e.raw.annotation, r = (C) => {
    var w, L, T, V, K, j;
    if (C)
      return ((w = n == null ? void 0 : n.measures[C]) == null ? void 0 : w.shortTitle) ?? ((L = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : L.shortTitle) ?? ((T = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : T.shortTitle) ?? ((V = n == null ? void 0 : n.measures[C]) == null ? void 0 : V.title) ?? ((K = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : K.title) ?? ((j = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : j.title) ?? C;
  }, a = e.series.find((C) => {
    var w;
    return (((w = C.meta) == null ? void 0 : w.axis) ?? "left") !== "right";
  }), o = e.series.find((C) => {
    var w;
    return ((w = C.meta) == null ? void 0 : w.axis) === "right";
  }), s = (C) => {
    var w;
    return C ? (w = C.meta) != null && w.measure ? r(C.meta.measure) : C.label : void 0;
  };
  return {
    x: (c = (l = t.axes) == null ? void 0 : l.x) != null && c.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? r((p = (h = t.mapping) == null ? void 0 : h.category) == null ? void 0 : p.member),
    left: (y = (b = t.axes) == null ? void 0 : b.y) != null && y.labelHide ? void 0 : ((v = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : v.label) ?? s(a),
    right: (R = (S = t.axes) == null ? void 0 : S.y2) != null && R.labelHide ? void 0 : ((_ = (k = t.axes) == null ? void 0 : k.y2) == null ? void 0 : _.label) ?? s(o)
  };
}
function Ve(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function kr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function Vt(e, t, n) {
  return (r, a) => {
    const o = a == null ? void 0 : a.dataKey, s = typeof o == "string" || typeof o == "number" ? String(o) : void 0, l = (s ? n == null ? void 0 : n.get(s) : void 0) ?? t ?? s;
    return e.value(r, l, "tooltip");
  };
}
function rn(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
const Nu = { light: "", dark: ".dark" }, go = x.createContext(null);
function bo() {
  const e = x.useContext(go);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const He = x.forwardRef(({ id: e, className: t, children: n, config: r, ...a }, o) => {
  const s = x.useId(), l = `chart-${e || s.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(go.Provider, { value: { config: r }, children: /* @__PURE__ */ f(
    "div",
    {
      "data-chart": l,
      ref: o,
      className: N(
        "flex h-full w-full justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-none [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-none",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ i(Cu, { id: l, config: r }),
        /* @__PURE__ */ i(ar.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
He.displayName = "ChartContainer";
const Cu = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, r]) => r.theme || r.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Nu).map(
          ([r, a]) => `
${a} [data-chart=${e}] {
${n.map(([o, s]) => {
            var c;
            const l = ((c = s.theme) == null ? void 0 : c[r]) || s.color;
            return l ? `  ${pr(o)}: ${l};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, vt = ar.Tooltip, nt = x.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: r = "dot",
    hideLabel: a = !1,
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
    const { config: g } = bo(), v = x.useMemo(() => {
      var w;
      if (a || !(t != null && t.length))
        return null;
      const [R] = t, k = `${b || (R == null ? void 0 : R.dataKey) || (R == null ? void 0 : R.name) || "value"}`, _ = Gn(g, R, k), C = !b && typeof s == "string" ? ((w = g[s]) == null ? void 0 : w.label) || s : _ == null ? void 0 : _.label;
      return l ? /* @__PURE__ */ i("div", { className: N("font-medium", c), children: l(C, t) }) : C ? /* @__PURE__ */ i("div", { className: N("font-medium", c), children: C }) : null;
    }, [s, l, t, a, c, g, b]);
    if (!e || !(t != null && t.length))
      return null;
    const S = t.length === 1 && r !== "dot";
    return /* @__PURE__ */ f(
      "div",
      {
        ref: y,
        className: N(
          "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/40 bg-background px-3 py-2 text-xs shadow-lg",
          n
        ),
        children: [
          S ? null : v,
          /* @__PURE__ */ i("div", { className: "grid gap-1.5", children: t.map((R, k) => {
            var L;
            const _ = `${p || R.name || R.dataKey || "value"}`, C = Gn(g, R, _), w = h || ((L = R.payload) == null ? void 0 : L.fill) || R.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: N(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  r === "dot" && "items-center"
                ),
                children: u && (R == null ? void 0 : R.value) !== void 0 && R.name ? u(R.value, R.name, R, k, R.payload) : /* @__PURE__ */ f(re, { children: [
                  C != null && C.icon ? /* @__PURE__ */ i(C.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: N(
                        "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                        {
                          "h-2.5 w-2.5": r === "dot",
                          "w-1": r === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": r === "dashed",
                          "my-0.5": S && r === "dashed"
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
                      className: N(
                        "flex flex-1 justify-between gap-4 leading-none",
                        S ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ f("div", { className: "grid gap-1.5", children: [
                          S ? v : null,
                          /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: (C == null ? void 0 : C.label) || R.name })
                        ] }),
                        R.value !== void 0 && /* @__PURE__ */ i("span", { className: "font-mono font-medium tabular-nums text-foreground", children: d ? d(R.value, R) : typeof R.value == "number" ? R.value.toLocaleString() : String(R.value) })
                      ]
                    }
                  )
                ] })
              },
              R.dataKey ? String(R.dataKey) : k
            );
          }) })
        ]
      }
    );
  }
);
nt.displayName = "ChartTooltipContent";
const xt = ar.Legend, rt = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: r = "bottom", nameKey: a }, o) => {
    const { config: s } = bo();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: N(
          "flex items-center justify-center gap-4",
          r === "top" ? "pb-3" : "pt-3",
          e
        ),
        children: n.map((l) => {
          const c = `${a || l.dataKey || "value"}`, u = Gn(s, l, c);
          return /* @__PURE__ */ f(
            "div",
            {
              className: N(
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
rt.displayName = "ChartLegendContent";
function Gn(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const r = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let a = n;
  return n in t && typeof t[n] == "string" ? a = t[n] : r && n in r && typeof r[n] == "string" && (a = r[n]), a in e ? e[a] : e[n];
}
function Su({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var V, K, j, B, D, A, Y, G, P, U, I, z, Q, ue, ce, H;
  const o = t.familyOptions ?? {}, s = t.orientation === "horizontal", l = po(t.stackMode), c = t.stackMode === "percent", u = wr(e), d = (M, X, fe = "value") => c ? rn(M) : r.value(M, X, fe), h = (M) => r.category(M), p = kr(e), b = Ve(e.series[0]), y = s ? (K = (V = t.axes) == null ? void 0 : V.y) == null ? void 0 : K.hide : (B = (j = t.axes) == null ? void 0 : j.x) == null ? void 0 : B.hide, g = s ? (D = t.axes) == null ? void 0 : D.x : (A = t.axes) == null ? void 0 : A.y, v = !s && e.series.some((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) === "right";
  }), S = Ve(e.series.find((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) !== "right";
  })) ?? b, R = Ve(e.series.find((M) => {
    var X;
    return ((X = M.meta) == null ? void 0 : X.axis) === "right";
  })), k = bn(e, t), _ = k.x ? { value: k.x, position: "insideBottom", offset: -2 } : void 0, C = k.x ? { value: k.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, w = k.left ? { value: k.left, position: "insideBottom", offset: -2 } : void 0, L = k.left ? { value: k.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, T = k.right ? { value: k.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(He, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(
    mi,
    {
      accessibilityLayer: !0,
      data: u,
      layout: s ? "vertical" : "horizontal",
      stackOffset: c ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i($t, { vertical: s, horizontal: !s }),
        s ? /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            $e,
            {
              type: "category",
              dataKey: "__cat",
              hide: y,
              tickFormatter: h,
              label: C
            }
          ),
          /* @__PURE__ */ i(
            ct,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: ze(g),
              domain: Te(g),
              tickFormatter: (M) => d(M, b, "axis"),
              label: w
            }
          )
        ] }) : /* @__PURE__ */ f(re, { children: [
          /* @__PURE__ */ i(
            ct,
            {
              type: "category",
              dataKey: "__cat",
              hide: y,
              tickFormatter: h,
              label: _
            }
          ),
          /* @__PURE__ */ i(
            $e,
            {
              yAxisId: "left",
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: ze(g),
              domain: Te(g),
              tickFormatter: (M) => d(M, S, "axis"),
              label: L
            }
          ),
          v && /* @__PURE__ */ i(
            $e,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (G = (Y = t.axes) == null ? void 0 : Y.y2) == null ? void 0 : G.hide,
              scale: ze((P = t.axes) == null ? void 0 : P.y2),
              domain: Te((U = t.axes) == null ? void 0 : U.y2),
              tickFormatter: (M) => d(M, R, "axis"),
              label: T
            }
          )
        ] }),
        ((I = t.tooltip) == null ? void 0 : I.show) !== !1 && /* @__PURE__ */ i(
          vt,
          {
            content: /* @__PURE__ */ i(
              nt,
              {
                labelFormatter: (M) => r.category(M),
                indicator: ((z = t.tooltip) == null ? void 0 : z.indicator) ?? "dot",
                valueFormatter: c ? (M) => rn(M) : Vt(r, void 0, p)
              }
            )
          }
        ),
        we(t).show && /* @__PURE__ */ i(
          xt,
          {
            content: /* @__PURE__ */ i(rt, { className: we(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: gt((Q = t.legend) == null ? void 0 : Q.position),
            layout: bt((ue = t.legend) == null ? void 0 : ue.position),
            align: yt((ce = t.legend) == null ? void 0 : ce.position)
          }
        ),
        e.series.map((M) => {
          var X, fe, Ie, Ye;
          return /* @__PURE__ */ i(
            Ta,
            {
              yAxisId: s ? void 0 : ((X = M.meta) == null ? void 0 : X.axis) === "right" && v ? "right" : "left",
              dataKey: M.key,
              name: M.label,
              stackId: l ? (fe = M.meta) != null && fe.companion ? "__prev" : ((Ie = M.meta) == null ? void 0 : Ie.stackId) ?? "stack" : void 0,
              fill: Lt(M),
              fillOpacity: (Ye = M.meta) != null && Ye.companion ? 0.4 : void 0,
              radius: wu(o.barRadius, s),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                za,
                {
                  dataKey: M.key,
                  position: s ? "right" : "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (Qe) => d(typeof Qe == "boolean" ? Number(Qe) : Qe, Ve(M), "label")
                }
              )
            },
            M.key
          );
        }),
        (H = o.referenceLines) == null ? void 0 : H.map((M, X) => /* @__PURE__ */ i(
          Pt,
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
function _u({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var S, R, k, _, C, w, L, T, V, K, j, B, D, A, Y, G;
  const o = t.familyOptions ?? {}, s = o.chrome === "none", l = wr(e), c = (P) => r.category(P), u = e.series.some((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) === "right";
  }), d = o.curve ?? "monotone", h = kr(e), p = Ve(e.series.find((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) !== "right";
  })), b = Ve(e.series.find((P) => {
    var U;
    return ((U = P.meta) == null ? void 0 : U.axis) === "right";
  })), y = bn(e, t), g = !s && o.dots === !0, v = !s;
  return /* @__PURE__ */ i(
    He,
    {
      config: n,
      className: s ? "aspect-[5/1] w-full" : "h-full w-full min-h-[200px]",
      children: /* @__PURE__ */ f(di, { accessibilityLayer: !0, data: l, margin: s ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !s && /* @__PURE__ */ i($t, { vertical: !1 }),
        /* @__PURE__ */ i(
          ct,
          {
            type: "category",
            dataKey: "__cat",
            hide: s || ((R = (S = t.axes) == null ? void 0 : S.x) == null ? void 0 : R.hide),
            tickFormatter: c,
            label: !s && y.x ? { value: y.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          $e,
          {
            yAxisId: "left",
            type: "number",
            hide: s || ((_ = (k = t.axes) == null ? void 0 : k.y) == null ? void 0 : _.hide),
            scale: ze((C = t.axes) == null ? void 0 : C.y),
            domain: Te((w = t.axes) == null ? void 0 : w.y),
            tickFormatter: (P) => r.value(P, p, "axis"),
            label: !s && y.left ? { value: y.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          $e,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: s || ((T = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : T.hide),
            scale: ze((V = t.axes) == null ? void 0 : V.y2),
            domain: Te((K = t.axes) == null ? void 0 : K.y2),
            tickFormatter: (P) => r.value(P, b, "axis"),
            label: !s && y.right ? { value: y.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !s && ((j = t.tooltip) == null ? void 0 : j.show) !== !1 && /* @__PURE__ */ i(
          vt,
          {
            content: /* @__PURE__ */ i(
              nt,
              {
                labelFormatter: (P) => r.category(P),
                indicator: ((B = t.tooltip) == null ? void 0 : B.indicator) ?? "line",
                valueFormatter: Vt(r, void 0, h)
              }
            )
          }
        ),
        !s && we(t).show && /* @__PURE__ */ i(
          xt,
          {
            content: /* @__PURE__ */ i(rt, { className: we(t).greyed ? "opacity-40" : void 0 }),
            verticalAlign: gt((D = t.legend) == null ? void 0 : D.position),
            layout: bt((A = t.legend) == null ? void 0 : A.position),
            align: yt((Y = t.legend) == null ? void 0 : Y.position)
          }
        ),
        e.series.map((P) => {
          var U, I, z, Q, ue, ce;
          return /* @__PURE__ */ i(
            Fa,
            {
              yAxisId: u && ((U = P.meta) == null ? void 0 : U.axis) === "right" ? "right" : "left",
              type: ((I = P.meta) == null ? void 0 : I.curve) ?? d,
              dataKey: P.key,
              name: P.label,
              stroke: Lt(P),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (z = P.meta) != null && z.companion ? "5 4" : void 0,
              strokeOpacity: (Q = P.meta) != null && Q.companion ? 0.55 : void 0,
              dot: s || (ue = P.meta) != null && ue.companion ? !1 : ((ce = P.meta) == null ? void 0 : ce.dots) ?? g,
              activeDot: v,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !s,
              children: !s && o.showValueLabels && /* @__PURE__ */ i(
                za,
                {
                  dataKey: P.key,
                  position: "top",
                  className: "fill-foreground text-[10px]",
                  formatter: (H) => r.value(typeof H == "boolean" ? Number(H) : H, Ve(P), "label")
                }
              )
            },
            P.key
          );
        }),
        !s && ((G = o.referenceLines) == null ? void 0 : G.map((P, U) => /* @__PURE__ */ i(
          Pt,
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
function Ru({
  data: e,
  options: t,
  config: n,
  format: r,
  editing: a
}) {
  var v, S, R, k, _, C, w, L, T, V, K, j, B, D;
  const o = t.familyOptions ?? {}, s = ((S = (v = t.mapping) == null ? void 0 : v.series) == null ? void 0 : S.mode) === "pivot", l = t.stackMode ?? (s ? "stacked" : "none"), c = po(l), u = l === "percent", d = wr(e), h = (A) => r.category(A), p = o.curve ?? "monotone", b = kr(e), y = Ve(e.series[0]), g = bn(e, t);
  return /* @__PURE__ */ i(He, { config: n, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f($a, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i($t, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((A) => /* @__PURE__ */ f("linearGradient", { id: `fill-${A.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Lt(A), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Lt(A), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, A.key)) }),
    /* @__PURE__ */ i(
      ct,
      {
        type: "category",
        dataKey: "__cat",
        hide: (k = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : k.hide,
        tickFormatter: h,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      $e,
      {
        type: "number",
        hide: (C = (_ = t.axes) == null ? void 0 : _.y) == null ? void 0 : C.hide,
        scale: ze((w = t.axes) == null ? void 0 : w.y),
        domain: Te((L = t.axes) == null ? void 0 : L.y),
        tickFormatter: (A) => u ? rn(A) : r.value(A, y, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((T = t.tooltip) == null ? void 0 : T.show) !== !1 && /* @__PURE__ */ i(
      vt,
      {
        content: /* @__PURE__ */ i(
          nt,
          {
            labelFormatter: (A) => r.category(A),
            indicator: ((V = t.tooltip) == null ? void 0 : V.indicator) ?? "dot",
            valueFormatter: u ? (A) => rn(A) : Vt(r, void 0, b)
          }
        )
      }
    ),
    we(t).show && /* @__PURE__ */ i(
      xt,
      {
        content: /* @__PURE__ */ i(rt, { className: we(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: gt((K = t.legend) == null ? void 0 : K.position),
        layout: bt((j = t.legend) == null ? void 0 : j.position),
        align: yt((B = t.legend) == null ? void 0 : B.position)
      }
    ),
    e.series.map((A) => {
      var Y, G, P, U, I, z, Q, ue;
      return /* @__PURE__ */ i(
        or,
        {
          type: ((Y = A.meta) == null ? void 0 : Y.curve) ?? p,
          dataKey: A.key,
          name: A.label,
          stackId: c && !((G = A.meta) != null && G.companion) ? ((P = A.meta) == null ? void 0 : P.stackId) ?? "stack" : void 0,
          stroke: Lt(A),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (U = A.meta) != null && U.companion ? "5 4" : void 0,
          strokeOpacity: (I = A.meta) != null && I.companion ? 0.55 : void 0,
          fill: (z = A.meta) != null && z.companion ? "none" : `url(#fill-${A.key})`,
          fillOpacity: 1,
          dot: (Q = A.meta) != null && Q.companion ? !1 : ((ue = A.meta) == null ? void 0 : ue.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        A.key
      );
    }),
    (D = o.referenceLines) == null ? void 0 : D.map((A, Y) => /* @__PURE__ */ i(
      Pt,
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
function Au({ data: e, options: t, format: n, editing: r }) {
  var g, v, S, R, k;
  const a = t.familyOptions ?? {}, o = e.series[0], s = e.categories.map((_, C) => {
    const w = n.category(_);
    return {
      key: `slice-${C}`,
      label: w,
      value: (o == null ? void 0 : o.data[C]) ?? 0,
      fill: `var(--${ge[C % ge.length]})`
    };
  }), l = Mu(s, a.maxSlices), c = l.reduce((_, C) => _ + C.value, 0), u = {};
  l.forEach((_, C) => {
    u[_.key] = {
      label: _.label,
      color: `var(--${ge[C % ge.length]})`
    };
  });
  const d = `${a.innerRadiusPct ?? 0}%`, h = `${a.outerRadiusPct ?? 80}%`, p = (a.innerRadiusPct ?? 0) > 0, b = a.showLabels ?? "percent", y = b === "none" ? !1 : ({ payload: _, percent: C }) => {
    const w = _;
    return b === "name" ? (w == null ? void 0 : w.label) ?? "" : b === "value" ? n.value(w == null ? void 0 : w.value, o == null ? void 0 : o.key, "label") : `${((C !== void 0 ? C : w && c > 0 ? w.value / c : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(He, { config: u, className: "h-full w-full min-h-[200px] [&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ f(fi, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      vt,
      {
        content: /* @__PURE__ */ i(
          nt,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((v = t.tooltip) == null ? void 0 : v.indicator) ?? "dot",
            valueFormatter: Vt(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ f(
      hi,
      {
        data: l,
        dataKey: "value",
        nameKey: "label",
        innerRadius: d,
        outerRadius: h,
        paddingAngle: a.padAngle,
        cornerRadius: a.cornerRadius,
        label: y,
        labelLine: b !== "none" && !p,
        isAnimationActive: !1,
        children: [
          l.map((_) => /* @__PURE__ */ i(Pa, { fill: _.fill }, _.key)),
          p && a.centerLabel && /* @__PURE__ */ i(
            pi,
            {
              position: "center",
              content: ({ viewBox: _ }) => {
                var T, V;
                if (!_ || !("cx" in _)) return null;
                const { cx: C, cy: w } = _, L = ((T = a.centerLabel) == null ? void 0 : T.value) === void 0 || a.centerLabel.value === "total" ? n.value(c, o == null ? void 0 : o.key, "label") : a.centerLabel.value;
                return /* @__PURE__ */ f("text", { x: C, y: w, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: C, y: w, className: "fill-foreground text-2xl font-bold", children: L }),
                  ((V = a.centerLabel) == null ? void 0 : V.label) && /* @__PURE__ */ i("tspan", { x: C, y: w + 20, className: "fill-muted-foreground text-xs", children: a.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    we(t).show && /* @__PURE__ */ i(
      xt,
      {
        content: /* @__PURE__ */ i(
          rt,
          {
            nameKey: "label",
            className: we(t).greyed ? "opacity-40" : void 0
          }
        ),
        verticalAlign: gt((S = t.legend) == null ? void 0 : S.position),
        layout: bt((R = t.legend) == null ? void 0 : R.position),
        align: yt((k = t.legend) == null ? void 0 : k.position)
      }
    )
  ] }) });
}
function Mu(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((l, c) => c.value - l.value), r = n.slice(0, t - 1), o = n.slice(t - 1).reduce((l, c) => l + c.value, 0), s = t - 1;
  return [
    ...r,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${ge[s % ge.length]})`
    }
  ];
}
function Ou({ data: e, options: t, format: n, editing: r }) {
  var y, g, v, S, R, k, _, C, w, L, T, V, K, j, B, D, A, Y, G, P, U, I, z, Q, ue, ce;
  const a = t.familyOptions ?? {}, o = e.raw.annotation, s = e.raw.rows, l = { x: a.x, y: a.y, z: a.size }, c = ((y = o == null ? void 0 : o.measures[a.x]) == null ? void 0 : y.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[a.x]) == null ? void 0 : g.shortTitle) ?? a.x, u = ((v = o == null ? void 0 : o.measures[a.y]) == null ? void 0 : v.shortTitle) ?? ((S = o == null ? void 0 : o.dimensions[a.y]) == null ? void 0 : S.shortTitle) ?? a.y, d = (k = (R = t.axes) == null ? void 0 : R.x) != null && k.labelHide ? void 0 : ((C = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : C.label) ?? c, h = (L = (w = t.axes) == null ? void 0 : w.y) != null && L.labelHide ? void 0 : ((V = (T = t.axes) == null ? void 0 : T.y) == null ? void 0 : V.label) ?? u, p = Lu(s, a), b = {};
  return p.forEach((H, M) => {
    b[H.key] = { label: H.label, color: `var(--${ge[M % ge.length]})` };
  }), /* @__PURE__ */ i(He, { config: b, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(gi, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i($t, {}),
    /* @__PURE__ */ i(
      ct,
      {
        type: "number",
        dataKey: "x",
        name: c,
        hide: (j = (K = t.axes) == null ? void 0 : K.x) == null ? void 0 : j.hide,
        scale: ze((B = t.axes) == null ? void 0 : B.x),
        domain: Te((D = t.axes) == null ? void 0 : D.x),
        tickFormatter: (H) => n.value(H, a.x, "axis"),
        label: d ? { value: d, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      $e,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (Y = (A = t.axes) == null ? void 0 : A.y) == null ? void 0 : Y.hide,
        scale: ze((G = t.axes) == null ? void 0 : G.y),
        domain: Te((P = t.axes) == null ? void 0 : P.y),
        tickFormatter: (H) => n.value(H, a.y, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    a.size && /* @__PURE__ */ i(bi, { type: "number", dataKey: "z", range: a.sizeRange ?? [40, 400], name: a.size }),
    ((U = t.tooltip) == null ? void 0 : U.show) !== !1 && /* @__PURE__ */ i(
      vt,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          nt,
          {
            indicator: ((I = t.tooltip) == null ? void 0 : I.indicator) ?? "dot",
            valueFormatter: (H, M) => {
              const X = M == null ? void 0 : M.dataKey, fe = typeof X == "string" ? l[X] : void 0;
              return n.value(H, fe, "tooltip");
            }
          }
        )
      }
    ),
    we(t).show && p.length > 1 && /* @__PURE__ */ i(
      xt,
      {
        content: /* @__PURE__ */ i(rt, { className: we(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: gt((z = t.legend) == null ? void 0 : z.position),
        layout: bt((Q = t.legend) == null ? void 0 : Q.position),
        align: yt((ue = t.legend) == null ? void 0 : ue.position)
      }
    ),
    p.map((H, M) => /* @__PURE__ */ i(
      yi,
      {
        name: H.label,
        data: H.points,
        shape: a.shape ?? "circle",
        fill: `var(--color-${H.key})`,
        children: p.length === 1 && H.points.map((X, fe) => /* @__PURE__ */ i(Pa, { fill: `var(--${ge[M % ge.length]})` }, fe))
      },
      H.key
    )),
    (ce = a.referenceLines) == null ? void 0 : ce.map((H, M) => /* @__PURE__ */ i(
      Pt,
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
function Lu(e, t) {
  const n = (a) => ({
    x: Fn(a[t.x]),
    y: Fn(a[t.y]),
    ...t.size ? { z: Fn(a[t.size]) } : {}
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
function Fn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Du(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Tu(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function zu(e) {
  var c, u, d, h;
  const { data: t, options: n, format: r } = e, a = n.familyOptions ?? {}, o = (p) => r.value(p, a.measure, "kpi"), s = yo(t.raw.rows, a.measure) ?? 0, l = ((u = (c = t.raw.annotation) == null ? void 0 : c.measures[a.measure]) == null ? void 0 : u.shortTitle) ?? ((h = (d = t.raw.annotation) == null ? void 0 : d.measures[a.measure]) == null ? void 0 : h.title) ?? a.measure;
  return a.display === "gauge" ? /* @__PURE__ */ i(Iu, { value: s, label: l, fmt: o, fo: a }) : /* @__PURE__ */ i(Fu, { ...e, value: s, label: l, fo: a, fmt: o });
}
function Fu({
  data: e,
  value: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = n.goodDirection ?? ((u = n.comparison) == null ? void 0 : u.goodDirection) ?? "up", o = Vu(e.raw.rows, t, n), s = n.sparkline ? e.series[0] : void 0, l = o ? o.diff : s ? Pu(s) : 0, c = Tu(Du(l, a));
  return /* @__PURE__ */ f("div", { className: "flex h-full w-full flex-col justify-center gap-1", children: [
    /* @__PURE__ */ f("div", { className: "flex items-baseline gap-2", children: [
      /* @__PURE__ */ i("span", { className: "text-4xl font-bold tabular-nums text-foreground", children: r(t) }),
      o && /* @__PURE__ */ i(Eu, { delta: o, goodDirection: a, fo: n, fmt: r })
    ] }),
    s && s.data.length > 0 && /* @__PURE__ */ i($u, { series: s, categories: e.categories, colorClass: c })
  ] });
}
function $u({
  series: e,
  categories: t,
  colorClass: n
}) {
  const r = t.map((a, o) => ({ x: typeof a == "number" ? a : String(a), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: N("mt-2 h-12 w-full", n), children: /* @__PURE__ */ i(ki, { width: "100%", height: "100%", children: /* @__PURE__ */ i($a, { data: r, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
    or,
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
function Pu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function Eu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: r
}) {
  var u;
  const a = e.diff > 0, o = e.diff === 0, s = o ? !0 : a === (t === "up"), l = o ? Mi : a ? sr : lr, c = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${r(e.diff)}`;
  return /* @__PURE__ */ f(
    "span",
    {
      className: N(
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
function Iu({
  value: e,
  label: t,
  fmt: n,
  fo: r
}) {
  var d, h;
  const a = ((d = r.gauge) == null ? void 0 : d.min) ?? 0, o = ((h = r.gauge) == null ? void 0 : h.max) ?? Math.max(e, 1), s = Math.max(a, Math.min(o, e)), l = ju(e, r) ?? "chart-1", c = [{ name: t, value: s, fill: `var(--${l})` }], u = { value: { label: t, color: `var(--${l})` } };
  return /* @__PURE__ */ f("div", { className: "relative flex h-full w-full flex-col items-center justify-center", children: [
    /* @__PURE__ */ i(He, { config: u, className: "aspect-square min-h-[180px] w-full", children: /* @__PURE__ */ f(
      vi,
      {
        data: c,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(xi, { type: "number", domain: [a, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(wi, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ f("div", { className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ i("span", { className: "text-2xl font-bold tabular-nums text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "text-xs text-muted-foreground", children: t })
    ] })
  ] });
}
function ju(e, t) {
  var a;
  const n = (a = t.gauge) == null ? void 0 : a.thresholds;
  if (!(n != null && n.length)) return;
  let r;
  for (const o of [...n].sort((s, l) => s.at - l.at))
    e >= o.at && (r = o.colorToken);
  return r;
}
function yo(e, t) {
  for (const n of e) {
    const r = vo(n[t]);
    if (r !== null) return r;
  }
  return null;
}
function Vu(e, t, n) {
  const r = n.comparison;
  if (!r) return null;
  let a = null;
  if (r.mode === "value")
    typeof r.value == "number" ? a = r.value : typeof r.value == "string" && (a = yo(e, r.value));
  else {
    const l = e[1];
    a = l ? vo(l[n.measure]) : null;
  }
  if (a === null) return null;
  const o = t - a, s = a !== 0 ? o / a : null;
  return { current: t, baseline: a, diff: o, pct: s };
}
function vo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const xo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: N("w-full caption-bottom text-sm", e), ...t }) })
);
xo.displayName = "Table";
const wo = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: N("[&_tr]:border-b", e), ...t }));
wo.displayName = "TableHeader";
const ko = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: N("[&_tr:last-child]:border-0", e), ...t }));
ko.displayName = "TableBody";
const Yt = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: N(
        "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        e
      ),
      ...t
    }
  )
);
Yt.displayName = "TableRow";
const Un = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: N(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      e
    ),
    ...t
  }
));
Un.displayName = "TableHead";
const Qt = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: N("p-2 align-middle [&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
Qt.displayName = "TableCell";
const qu = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: N("mt-4 text-sm text-muted-foreground", e), ...t }));
qu.displayName = "TableCaption";
const No = dr(
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
  ({ className: e, variant: t, size: n, type: r, ...a }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: r ?? "button",
      className: N(No({ variant: t, size: n }), e),
      ...a
    }
  )
);
W.displayName = "Button";
function Ku({ data: e, options: t, format: n }) {
  const r = t.familyOptions ?? {}, a = e.raw.rows, o = e.raw.annotation, s = x.useMemo(
    () => Bu(a, o, r, n),
    [a, o, r, n]
  ), [l, c] = x.useState(null), [u, d] = x.useState(0), h = r.sortable !== !1, p = r.pageSize ?? 25, b = x.useMemo(() => {
    if (!l) return a;
    const k = l.dir === "asc" ? 1 : -1;
    return [...a].sort((_, C) => Yu(_[l.member], C[l.member]) * k);
  }, [a, l]), y = Math.max(1, Math.ceil(b.length / p)), g = Math.min(u, y - 1), v = b.slice(g * p, g * p + p), S = (k) => {
    h && (c(
      (_) => (_ == null ? void 0 : _.member) === k ? { member: k, dir: _.dir === "asc" ? "desc" : "asc" } : { member: k, dir: "desc" }
    ), d(0));
  }, R = r.rowHeight === "compact";
  return /* @__PURE__ */ f("div", { className: "flex h-full w-full flex-col", children: [
    /* @__PURE__ */ i("div", { className: N("w-full", r.stickyHeader && "max-h-full overflow-auto"), children: /* @__PURE__ */ f(xo, { children: [
      /* @__PURE__ */ i(wo, { className: N(r.stickyHeader && "sticky top-0 z-10 bg-background"), children: /* @__PURE__ */ f(Yt, { children: [
        r.showRowNumbers && /* @__PURE__ */ i(Un, { className: "w-10 text-right", children: "#" }),
        s.map((k) => /* @__PURE__ */ i(
          Un,
          {
            className: sa(k.align),
            style: k.width ? { width: k.width } : void 0,
            children: h ? /* @__PURE__ */ f(
              W,
              {
                variant: "ghost",
                className: "-ml-2 h-7 px-2 text-muted-foreground",
                onClick: () => S(k.member),
                children: [
                  k.label,
                  /* @__PURE__ */ i(Uu, { active: (l == null ? void 0 : l.member) === k.member, dir: l == null ? void 0 : l.dir })
                ]
              }
            ) : k.label
          },
          k.member
        ))
      ] }) }),
      /* @__PURE__ */ f(ko, { children: [
        v.map((k, _) => /* @__PURE__ */ f(Yt, { children: [
          r.showRowNumbers && /* @__PURE__ */ i(Qt, { className: N("text-right text-muted-foreground", R && "py-1"), children: g * p + _ + 1 }),
          s.map((C) => {
            const w = Qu(C.member, k[C.member], r.conditionalFormat);
            return /* @__PURE__ */ i(
              Qt,
              {
                className: N(sa(C.align), R && "py-1"),
                style: w ? { color: w } : void 0,
                children: C.render(k[C.member])
              },
              C.member
            );
          })
        ] }, _)),
        v.length === 0 && /* @__PURE__ */ i(Yt, { children: /* @__PURE__ */ i(
          Qt,
          {
            colSpan: s.length + (r.showRowNumbers ? 1 : 0),
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
            onClick: () => d((k) => Math.max(0, k - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          W,
          {
            variant: "outline",
            className: "h-7 px-2",
            onClick: () => d((k) => Math.min(y - 1, k + 1)),
            disabled: g >= y - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Bu(e, t, n, r) {
  var s;
  const a = e.length > 0 ? Object.keys(e[0]) : Wu(t);
  return ((s = n.columns) != null && s.length ? n.columns : a.map((l) => ({ member: l }))).filter((l) => !l.hidden).map((l) => {
    const c = l.member, u = t ? Gu(t, c) : void 0, d = t ? c in t.measures : !1, h = l.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? c, p = l.align ?? (d ? "right" : "left");
    return {
      member: c,
      label: h,
      align: p,
      width: l.width,
      render: (b) => Hu(b, d, c, r)
    };
  });
}
function Hu(e, t, n, r) {
  if (e == null || e === "") return "—";
  if (t) {
    const a = typeof e == "number" ? e : Number(e);
    return Number.isFinite(a) ? r.value(a, n) : String(e);
  }
  return r.category(e);
}
function Wu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Gu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function sa(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function Uu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(sr, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(lr, { className: "ml-1 size-3.5" }) : /* @__PURE__ */ i(Oi, { className: "ml-1 size-3.5 opacity-50" });
}
function Yu(e, t) {
  const n = typeof e == "number" ? e : Number(e), r = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(r) ? n - r : String(e ?? "").localeCompare(String(t ?? ""));
}
function Qu(e, t, n) {
  if (!(n != null && n.length)) return;
  const r = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(r)) {
    for (const a of n)
      if (a.member === e && Ju(r, a.when.op, a.when.value))
        return `var(--${a.colorToken ?? "chart-1"})`;
  }
}
function Ju(e, t, n) {
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
function Xu({ data: e, options: t, format: n, editing: r }) {
  var g, v, S, R, k, _, C, w, L, T, V, K, j, B, D, A, Y, G, P, U, I, z, Q, ue, ce, H;
  const a = t.familyOptions ?? {}, o = a.series ?? [], s = em(e, o), l = (M) => n.category(M), c = o.some((M) => M.axis === "right"), u = (g = o.find((M) => M.axis !== "right")) == null ? void 0 : g.member, d = (v = o.find((M) => M.axis === "right")) == null ? void 0 : v.member, h = bn(e, t), p = (R = (S = t.axes) == null ? void 0 : S.y) != null && R.labelHide ? void 0 : ((_ = (k = t.axes) == null ? void 0 : k.y) == null ? void 0 : _.label) ?? (u ? Jt(e, u) : void 0), b = (w = (C = t.axes) == null ? void 0 : C.y2) != null && w.labelHide ? void 0 : ((T = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : T.label) ?? (d ? Jt(e, d) : void 0), y = {};
  return o.forEach((M, X) => {
    const fe = M.colorToken ?? ge[X % ge.length];
    y[M.member] = {
      label: M.label ?? Jt(e, M.member),
      color: `var(--${fe})`
    };
  }), /* @__PURE__ */ i(He, { config: y, className: "h-full w-full min-h-[200px]", children: /* @__PURE__ */ f(Ni, { accessibilityLayer: !0, data: s, children: [
    /* @__PURE__ */ i($t, { vertical: !1 }),
    /* @__PURE__ */ i(
      ct,
      {
        type: "category",
        dataKey: "__cat",
        hide: (K = (V = t.axes) == null ? void 0 : V.x) == null ? void 0 : K.hide,
        tickFormatter: l,
        label: h.x ? { value: h.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      $e,
      {
        yAxisId: "left",
        type: "number",
        hide: (B = (j = t.axes) == null ? void 0 : j.y) == null ? void 0 : B.hide,
        scale: ze((D = t.axes) == null ? void 0 : D.y),
        domain: Te((A = t.axes) == null ? void 0 : A.y),
        tickFormatter: (M) => n.value(M, u, "axis"),
        label: p ? { value: p, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    c && /* @__PURE__ */ i(
      $e,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (G = (Y = t.axes) == null ? void 0 : Y.y2) == null ? void 0 : G.hide,
        scale: ze((P = t.axes) == null ? void 0 : P.y2),
        domain: Te((U = t.axes) == null ? void 0 : U.y2),
        tickFormatter: (M) => n.value(M, d, "axis"),
        label: b ? { value: b, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((I = t.tooltip) == null ? void 0 : I.show) !== !1 && /* @__PURE__ */ i(
      vt,
      {
        content: /* @__PURE__ */ i(
          nt,
          {
            labelFormatter: (M) => n.category(M),
            indicator: ((z = t.tooltip) == null ? void 0 : z.indicator) ?? "dot",
            valueFormatter: Vt(n)
          }
        )
      }
    ),
    we(t).show && /* @__PURE__ */ i(
      xt,
      {
        content: /* @__PURE__ */ i(rt, { className: we(t).greyed ? "opacity-40" : void 0 }),
        verticalAlign: gt((Q = t.legend) == null ? void 0 : Q.position),
        layout: bt((ue = t.legend) == null ? void 0 : ue.position),
        align: yt((ce = t.legend) == null ? void 0 : ce.position)
      }
    ),
    o.map((M) => Zu(M, e, a)),
    (H = a.referenceLines) == null ? void 0 : H.map((M, X) => /* @__PURE__ */ i(
      Pt,
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
function Zu(e, t, n) {
  const r = e.axis === "right" ? "right" : "left", a = `var(${pr(e.member)})`, o = e.label ?? Jt(t, e.member), s = e.curve ?? n.curve ?? "monotone", l = e.dots ?? n.dots ?? !1, c = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    Ta,
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
    or,
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
      dot: l,
      connectNulls: c
    },
    e.member
  ) : /* @__PURE__ */ i(
    Fa,
    {
      yAxisId: r,
      type: s,
      dataKey: e.member,
      name: o,
      stroke: a,
      strokeWidth: n.strokeWidth ?? 2,
      dot: l,
      connectNulls: c
    },
    e.member
  );
}
function em(e, t) {
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
  const a = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((l = (s = e.raw.query.timeDimensions) == null ? void 0 : s[0]) == null ? void 0 : l.dimension);
  return e.raw.rows.map((c) => {
    const u = a ? c[a] : void 0, d = {
      __cat: u == null ? "" : String(u)
    };
    for (const h of t) d[h.member] = tm(c[h.member]);
    return d;
  });
}
function Jt(e, t) {
  var n, r, a, o;
  return ((r = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : r.shortTitle) ?? ((o = (a = e.raw.annotation) == null ? void 0 : a.measures[t]) == null ? void 0 : o.title) ?? t;
}
function tm(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Co = {
  bar: Su,
  line: _u,
  area: Ru,
  pie: Au,
  scatter: Ou,
  kpi: zu,
  table: Ku,
  combo: Xu
};
function nm({
  data: e,
  options: t,
  config: n,
  format: r,
  state: a,
  components: o,
  editing: s
}) {
  const l = xu(t);
  if (a != null && a.loading)
    return /* @__PURE__ */ i(iu, { className: "h-full w-full min-h-[200px]" });
  if (a != null && a.error)
    return /* @__PURE__ */ f(gr, { variant: "destructive", className: "w-full", children: [
      /* @__PURE__ */ i(Ia, {}),
      /* @__PURE__ */ i(br, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(yr, { children: a.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "flex h-full w-full min-h-[200px] items-center justify-center text-sm text-muted-foreground", children: "No data" });
  const c = n && Object.keys(n).length > 0 ? n : ku(e), u = r ?? mo(e.raw.annotation, l, hr), d = (o == null ? void 0 : o[l.family]) ?? Co[l.family];
  return /* @__PURE__ */ i(
    d,
    {
      data: e,
      options: l,
      config: c,
      format: u,
      state: a,
      editing: s
    }
  );
}
const Nr = Ea(null);
Nr.displayName = "CubeVizContext";
function We() {
  const e = ir(Nr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function rm(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Mp({
  cube: e,
  theme: t,
  locale: n,
  registry: r,
  children: a
}) {
  const o = Z(
    () => rm(e) ? Vs(e) : e,
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
  ), c = Z(() => r ?? {}, [r]), u = Z(
    () => ({
      cubeClient: o,
      registry: c,
      locale: l,
      theme: s
    }),
    [o, c, l, s]
  );
  return /* @__PURE__ */ i(Nr.Provider, { value: u, children: /* @__PURE__ */ i(
    "div",
    {
      className: N(
        "contents",
        s.mode === "dark" && "dark",
        s.mode === "light" && "cube-viz-light"
      ),
      children: a
    }
  ) });
}
function am(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? Co[t];
}
const om = 5e3;
function im(e, t) {
  const { cubeClient: n } = We(), r = (t == null ? void 0 : t.skip) ?? !1, a = Z(
    () => e.limit === void 0 ? { ...e, limit: om } : e,
    [e]
  ), o = Z(() => JSON.stringify(a), [a]), [s, l] = ut({ isLoading: !r }), [c, u] = ut(0), d = qe(() => u((h) => h + 1), []);
  return Et(() => {
    if (r) {
      l({ isLoading: !1 });
      return;
    }
    let h = !0;
    return l((p) => ({ resultSet: p.resultSet, isLoading: !0 })), n.load(a, { castNumerics: !0 }).then((p) => {
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
  }, [n, o, r, c]), { ...s, refetch: d };
}
const yn = Ea(null);
yn.displayName = "DashboardContext";
function Cr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const r = e.variables, a = it(null);
  (a.current === null || a.current.key !== r) && (a.current = { store: sl(r, t), key: r });
  const o = a.current.store, s = sm(o, r);
  return Ci(yn.Provider, { value: s }, n);
}
function sm(e, t) {
  const n = Si(
    e.subscribe,
    e.getAll,
    e.getAll
  ), r = qe(
    (s, l) => e.set(s, l),
    [e]
  ), a = qe(
    (s) => il(s, e.getAll(), t),
    [e, t]
  ), o = qe(
    (s) => nl(s, e.getAll(), t),
    [e, t]
  );
  return Z(
    () => ({ vars: n, setVar: r, resolveQuery: a, resolveValue: o, decls: t }),
    [n, r, a, o, t]
  );
}
function So() {
  const e = ir(yn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function Sr() {
  return ir(yn);
}
function $n(e, t, n) {
  var b;
  const r = Sr(), { locale: a } = We(), o = Z(
    () => r && !(n != null && n.skipResolve) ? r.resolveQuery(e) : e,
    [r, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: s, isLoading: l, error: c, refetch: u } = im(o, { skip: n == null ? void 0 : n.skip }), d = ((b = t.format) == null ? void 0 : b.unitSystem) ?? (a == null ? void 0 : a.unitSystem), h = Z(() => gn(a == null ? void 0 : a.units), [a == null ? void 0 : a.units]);
  return { data: Z(() => {
    if (s)
      return Qs(s, t, o, { unitSystem: d, conversions: h });
  }, [s, t, o, d, h]), isLoading: l, error: c, refetch: u, resolvedQuery: o };
}
function Ge() {
  const { cubeClient: e } = We(), [t, n] = ut({ isLoading: !0 });
  return Et(() => {
    let r = !0;
    return n({ isLoading: !0 }), qs(e).then((a) => {
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
function Op() {
  const { locale: e } = We(), { formatValue: t, units: n } = e;
  return Z(
    () => t ?? fo(gn(n)),
    [t, n]
  );
}
function _o() {
  const [e, t] = ut(0), n = it(null), r = it(null), a = it(null), o = it(0), s = qe((u) => {
    a.current === null && (a.current = requestAnimationFrame(() => {
      a.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), l = qe(() => {
    r.current && (r.current.disconnect(), r.current = null), a.current !== null && (cancelAnimationFrame(a.current), a.current = null);
  }, []), c = qe(
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
      h.observe(u), r.current = h;
    },
    [s, l]
  );
  return Et(() => l, [l]), [c, e];
}
const lm = "day";
function cm(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, r = n == null ? void 0 : n.sparkline;
  if (!r) return null;
  const a = r.member ?? (n == null ? void 0 : n.measure), o = (d = e.timeDimensions) == null ? void 0 : d[0], s = r.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!a || !s) return null;
  const l = r.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [a],
    timeDimensions: [
      {
        dimension: s,
        granularity: r.granularity ?? lm,
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
      series: { mode: "measures", members: [a] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const ne = (e) => de(e, "yyyy-MM-dd");
function um(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const a = en(e[0]), o = en(e[1]);
    if (Number.isNaN(a.getTime()) || Number.isNaN(o.getTime())) return;
    const s = ls(o, a) + 1;
    return [ne(_e(a, s)), ne(_e(a, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const a = _e(t, 1);
    return [ne(a), ne(a)];
  }
  if (n === "yesterday") {
    const a = _e(t, 2);
    return [ne(a), ne(a)];
  }
  const r = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (r) {
    const a = Number(r[1]), o = r[2];
    if (o.startsWith("day")) return [ne(_e(t, 2 * a - 1)), ne(_e(t, a))];
    if (o.startsWith("week")) return [ne(_e(t, 14 * a - 1)), ne(_e(t, 7 * a))];
    if (o.startsWith("month"))
      return [ne(Sn(_n(t, 2 * a))), ne(_e(Sn(_n(t, a)), 1))];
    if (o.startsWith("quarter"))
      return [ne(Rn(An(t, 2 * a))), ne(_e(Rn(An(t, a)), 1))];
    if (o.startsWith("year"))
      return [ne(Mn(On(t, 2 * a))), ne(_e(Mn(On(t, a)), 1))];
  }
  if (n === "this week") {
    const a = cs(t, 1);
    return [ne(us(a)), ne(ms(a))];
  }
  if (n === "this month") {
    const a = _n(t, 1);
    return [ne(Sn(a)), ne(ds(a))];
  }
  if (n === "this quarter") {
    const a = An(t, 1);
    return [ne(Rn(a)), ne(fs(a))];
  }
  if (n === "this year") {
    const a = On(t, 1);
    return [ne(Mn(a)), ne(hs(a))];
  }
}
function mm(e, t) {
  var c, u;
  const n = t.familyOptions ?? {};
  let r;
  if (t.family === "bar" || t.family === "line" || t.family === "area") {
    if (!n.comparePrevious) return null;
    r = "series";
  } else if (t.family === "kpi") {
    if (((c = n.comparison) == null ? void 0 : c.mode) !== "previousPeriod") return null;
    r = "kpiRow";
  } else
    return null;
  const a = (u = e.timeDimensions) == null ? void 0 : u[0];
  if (!a) return null;
  const o = a.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const s = um(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...a, dateRange: s, compareDateRange: void 0 }]
  }, mode: r } : null;
}
const dm = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function _r({ query: e, chart: t, onState: n, editing: r }) {
  const { registry: a, locale: o } = We(), s = Z(() => {
    var w;
    return (w = t.format) != null && w.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), l = Z(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: c, isLoading: u, error: d, refetch: h, resolvedQuery: p } = $n(l, s), b = Z(() => cm(l, s), [l, s]), y = $n(
    (b == null ? void 0 : b.query) ?? l,
    (b == null ? void 0 : b.chart) ?? s,
    { skip: !b }
  ), g = Z(
    () => mm(p, s),
    [p, s]
  ), v = $n(
    (g == null ? void 0 : g.query) ?? l,
    s,
    { skip: !g, skipResolve: !0 }
  ), S = Z(
    () => ({ [s.family]: am(a, s.family) }),
    [a, s.family]
  ), R = Z(() => {
    let w = c ?? dm;
    if (b && y.data && (w = { ...w, series: y.data.series, categories: y.data.categories }), g && v.data) {
      if (g.mode === "kpiRow") {
        const L = v.data.raw.rows[0];
        if (L) {
          const T = w.raw.rows[0];
          w = {
            ...w,
            raw: { ...w.raw, rows: T ? [T, L] : [L] }
          };
        }
      } else if (w.series.length > 0) {
        const L = v.data.series.map((T) => {
          const V = w.series.find((K) => K.key === T.key);
          return {
            ...T,
            key: `${T.key}__prev`,
            label: `${(V == null ? void 0 : V.label) ?? T.label} (prev)`,
            colorToken: (V == null ? void 0 : V.colorToken) ?? T.colorToken,
            meta: { ...T.meta, companion: !0 }
          };
        });
        w = { ...w, series: [...w.series, ...L] };
      }
    }
    return w;
  }, [c, b, y.data, g, v.data]);
  Et(() => {
    n == null || n({ rows: R.raw.rows, refetch: h, isLoading: u });
  }, [n, R.raw.rows, h, u]);
  const k = {}, _ = Z(
    () => o.formatValue ?? fo(gn(o.units)),
    [o.formatValue, o.units]
  ), C = Z(
    () => mo(R.raw.annotation, s, _, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [R.raw.annotation, s, _, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    nm,
    {
      data: R,
      options: s,
      config: k,
      format: C,
      state: { loading: u && !c, error: d },
      components: S,
      editing: r
    }
  );
}
function fm({ spec: e }) {
  return /* @__PURE__ */ i(_r, { query: e.query, chart: e.chart });
}
const Ro = "cube-viz-prose";
function hm(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function pm({ doc: e }) {
  const t = hm(e), n = Z(
    () => t ? e : null,
    [t, e]
  ), r = Xa(
    {
      extensions: [eo],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: N(Ro) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(Za, { editor: r }) : /* @__PURE__ */ i("div", { className: "text-sm text-muted-foreground", children: "Unsupported text content" });
}
const Xt = [
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
], gm = Object.fromEntries(
  Xt.map((e) => [e.value, e.label])
);
function la(e) {
  return gm[e.trim().toLowerCase()] ?? e;
}
const bm = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function ym({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: r } = gs(), a = N(No({ variant: "outline" }), "size-7 shrink-0 p-0");
  return /* @__PURE__ */ f("div", { className: "mb-2 flex items-center justify-between gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !r,
        onClick: () => r && t(r),
        className: N(a, !r && "opacity-40"),
        children: /* @__PURE__ */ i(cr, { className: "size-4" })
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
        className: N(a, !n && "opacity-40"),
        children: /* @__PURE__ */ i(dn, { className: "size-4" })
      }
    )
  ] });
}
function vm({ day: e, modifiers: t, className: n, style: r, ...a }) {
  const o = !!t.selected && !t.outside && !t.disabled, s = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...a,
      style: { ...r, color: o ? "var(--primary-foreground)" : s ? "var(--muted-foreground)" : "var(--foreground)" },
      className: N(
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
function Ao({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...r
}) {
  return /* @__PURE__ */ i(
    ps,
    {
      showOutsideDays: n,
      hideNavigation: !0,
      className: N("p-3", e),
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
        MonthCaption: ym,
        DayButton: vm,
        Chevron: ({ orientation: a, className: o, ...s }) => /* @__PURE__ */ i(a === "left" ? cr : dn, { className: N("size-4", o), ...s })
      },
      ...r
    }
  );
}
function Ne({
  ...e
}) {
  return /* @__PURE__ */ i(Zt.Root, { "data-slot": "popover", ...e });
}
function Ce({
  ...e
}) {
  return /* @__PURE__ */ i(Zt.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Se({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...r
}) {
  return /* @__PURE__ */ i(Zt.Portal, { children: /* @__PURE__ */ i(
    Zt.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: N(
        "z-50 w-72 origin-[var(--radix-popover-content-transform-origin)] rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...r
    }
  ) });
}
function Ae({
  ...e
}) {
  return /* @__PURE__ */ i(be.Root, { "data-slot": "select", ...e });
}
function Yn({
  ...e
}) {
  return /* @__PURE__ */ i(be.Group, { "data-slot": "select-group", ...e });
}
function Me({
  ...e
}) {
  return /* @__PURE__ */ i(be.Value, { "data-slot": "select-value", ...e });
}
function Oe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ f(
    be.Trigger,
    {
      "data-slot": "select-trigger",
      className: N(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(be.Icon, { asChild: !0, children: /* @__PURE__ */ i(tt, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function xm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: N("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Li, { className: "size-4" })
    }
  );
}
function wm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: N("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ i(tt, { className: "size-4" })
    }
  );
}
function Le({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ i(be.Portal, { children: /* @__PURE__ */ f(
    be.Content,
    {
      "data-slot": "select-content",
      className: N(
        "relative z-50 max-h-[var(--radix-select-content-available-height)] min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ i(xm, {}),
        /* @__PURE__ */ i(
          be.Viewport,
          {
            className: N(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(wm, {})
      ]
    }
  ) });
}
function Qn({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.Label,
    {
      "data-slot": "select-label",
      className: N("px-2 py-1.5 text-xs font-medium text-muted-foreground", e),
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
      className: N(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ i(be.ItemIndicator, { children: /* @__PURE__ */ i(Pe, { className: "size-4" }) }) }),
        /* @__PURE__ */ i(be.ItemText, { children: t })
      ]
    }
  );
}
const dt = N(
  "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground",
  "shadow-sm transition-colors placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "[&>option]:bg-popover [&>option]:text-popover-foreground",
  "disabled:cursor-not-allowed disabled:opacity-50"
), km = "mb-1 block text-xs font-medium text-muted-foreground", Rt = "yyyy-MM-dd";
function Nm(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ca(e) {
  if (!e) return;
  const t = Qa(e, Rt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Cm({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, a = r.presets ?? bm, [o, s] = ut(!1), l = typeof e == "string", [c, u] = Nm(e), d = ca(c), h = ca(u), p = d ? { from: d, to: h } : void 0;
  let b;
  l ? b = la(e) : d && h ? b = `${de(d, "MMM d, yyyy")} – ${de(h, "MMM d, yyyy")}` : d ? b = de(d, "MMM d, yyyy") : b = "Pick a date range";
  const y = r.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ f(Ne, { open: o, onOpenChange: s, children: [
    /* @__PURE__ */ i(Ce, { asChild: !0, children: /* @__PURE__ */ f(
      W,
      {
        variant: "outline",
        className: N(
          "w-full justify-start text-left font-normal",
          b === "Pick a date range" && "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(ja, { className: "mr-2 size-4" }),
          b
        ]
      }
    ) }),
    /* @__PURE__ */ f(Se, { className: "flex w-auto gap-2 p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "flex max-h-80 flex-col gap-1 overflow-y-auto border-r pr-2", children: a.map((g) => /* @__PURE__ */ i(
        W,
        {
          variant: "ghost",
          size: "sm",
          className: "justify-start whitespace-nowrap font-normal",
          onClick: () => {
            t(g), s(!1);
          },
          children: la(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        Ao,
        {
          mode: "range",
          selected: p,
          defaultMonth: d,
          disabled: y,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([de(g.from, Rt), de(g.to, Rt)]) : g != null && g.from ? t([de(g.from, Rt), de(g.from, Rt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Sm = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function _m(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Rm(e) {
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
function Am({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { resolveValue: a } = So(), o = r.rangeVariable ? Rm(a(r.rangeVariable)) : void 0, s = r.options ?? (o !== void 0 ? _m(o) : Sm), l = typeof e == "string" ? e : "", c = s.join(",");
  return Et(() => {
    l && !s.includes(l) && t(s[0]);
  }, [l, c]), /* @__PURE__ */ f(
    Ae,
    {
      value: l,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Oe, { className: dt, children: /* @__PURE__ */ i(Me, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Le, { children: s.map((u) => /* @__PURE__ */ i(pe, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Mm({ value: e, onChange: t, control: n }) {
  const r = n;
  if (r.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((s) => String(s))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: N(dt, "h-auto min-h-[6rem]"),
        value: [...o],
        onChange: (s) => {
          const l = Array.from(s.target.selectedOptions, (u) => u.value), c = r.options.every((u) => typeof u.value == "number");
          t(c ? l.map((u) => Number(u)) : l);
        },
        children: r.options.map((s) => /* @__PURE__ */ i("option", { value: String(s.value), children: s.label }, String(s.value)))
      }
    );
  }
  const a = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ f(
    Ae,
    {
      value: a,
      onValueChange: (o) => {
        const s = r.options.find((l) => String(l.value) === o);
        t(s ? s.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(Oe, { className: dt, children: /* @__PURE__ */ i(Me, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Le, { children: r.options.map((o) => /* @__PURE__ */ i(pe, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function Om({
  value: e,
  onChange: t,
  control: n
}) {
  const r = n, { meta: a, isLoading: o } = Ge(), s = Z(() => {
    if (!a) return [];
    const l = [];
    for (const c of a.cubes)
      if (!(r.cube && c.name !== r.cube)) {
        if (r.from === "measure" || r.from === "dimensionOrMeasure")
          for (const u of c.measures) l.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (r.from === "dimension" || r.from === "dimensionOrMeasure")
          for (const u of c.dimensions) l.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return l;
  }, [a, r.cube, r.from]);
  return /* @__PURE__ */ f(
    "select",
    {
      className: dt,
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
function Lm({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: dt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (a) => t(a.target.value)
    }
  );
}
function Dm({ value: e, onChange: t, control: n }) {
  const r = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: dt,
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
function Tm({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ f("label", { className: "inline-flex cursor-pointer items-center gap-2", children: [
    /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        className: "size-4 rounded border-input text-primary accent-primary focus-visible:ring-1 focus-visible:ring-ring",
        checked: e === !0,
        onChange: (a) => t(a.target.checked)
      }
    ),
    /* @__PURE__ */ i("span", { className: "text-sm text-foreground", children: n.label ?? n.name })
  ] });
}
const zm = {
  dateRange: Cm,
  granularity: Am,
  select: Mm,
  memberSelect: Om,
  text: Lm,
  number: Dm,
  toggle: Tm
};
function Fm({ control: e, title: t }) {
  var b;
  const { registry: n } = We(), { decls: r, resolveValue: a, setVar: o } = So(), s = Z(
    () => r.find((y) => y.name === e.variable),
    [r, e.variable]
  );
  if (!s)
    return /* @__PURE__ */ f("div", { className: "text-sm text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const l = e.control.kind, c = ((b = n.controls) == null ? void 0 : b[l]) ?? zm[l], u = a(e.variable), d = (y) => o(e.variable, y), h = t ?? s.label ?? s.name, p = _i();
  return l === "toggle" ? /* @__PURE__ */ i(c, { value: u, onChange: d, decl: s, control: e.control }) : /* @__PURE__ */ f("div", { children: [
    /* @__PURE__ */ i("label", { className: km, htmlFor: p, children: h }),
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
const Mo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N(
        "rounded-xl border border-border bg-card text-card-foreground shadow",
        e
      ),
      ...t
    }
  )
);
Mo.displayName = "Card";
const Oo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-[[data-slot=card-action]]:grid-cols-[1fr_auto]",
        e
      ),
      ...t
    }
  )
);
Oo.displayName = "CardHeader";
const Lo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N("font-semibold leading-none tracking-tight", e),
      ...t
    }
  )
);
Lo.displayName = "CardTitle";
const $m = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: N("text-sm text-muted-foreground", e), ...t })
);
$m.displayName = "CardDescription";
const Pm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-slot": "card-action",
      className: N("col-start-2 row-span-2 row-start-1 self-start justify-self-end", e),
      ...t
    }
  )
);
Pm.displayName = "CardAction";
const Do = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: N("px-6 pb-6", e), ...t })
);
Do.displayName = "CardContent";
const Em = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: N("flex items-center px-6 pb-6", e), ...t })
);
Em.displayName = "CardFooter";
const an = "cube-viz-drag-handle";
function To(e) {
  var l;
  const { registry: t } = We(), n = (l = t.chrome) == null ? void 0 : l.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: r, menu: a, dragHandleProps: o, children: s } = e;
  return /* @__PURE__ */ f(Mo, { className: "flex h-full w-full flex-col gap-0 overflow-hidden rounded-xl border-0 bg-muted/40 shadow-none", children: [
    r ? /* @__PURE__ */ f(
      Oo,
      {
        ...o,
        className: N(
          an,
          "flex shrink-0 cursor-grab flex-row items-center justify-between gap-2",
          "px-4 pb-1 pt-3 active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(Lo, { className: "truncate text-sm font-semibold", children: r }),
          a
        ]
      }
    ) : null,
    /* @__PURE__ */ i(Do, { className: "min-h-0 flex-1 overflow-auto px-4 pb-4 pt-1", children: s })
  ] });
}
function Im(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const s = o == null ? "" : String(o);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }, r = t.map(n).join(","), a = e.map((o) => t.map((s) => n(o[s])).join(",")).join(`
`);
  return `${r}
${a}`;
}
function jm(e, t, n = "text/csv;charset=utf-8") {
  const r = new Blob([e], { type: n }), a = URL.createObjectURL(r), o = document.createElement("a");
  o.href = a, o.download = t, o.click(), URL.revokeObjectURL(a);
}
function Vm(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), r = n.createElement("base"), a = n.createElement("a");
  return n.head.appendChild(r), n.body.appendChild(a), t && (r.href = t), a.href = e, a.href;
}
const qm = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function Ke(e) {
  const t = [];
  for (let n = 0, r = e.length; n < r; n++)
    t.push(e[n]);
  return t;
}
let at = null;
function zo(e = {}) {
  return at || (e.includeStyleProperties ? (at = e.includeStyleProperties, at) : (at = Ke(window.getComputedStyle(document.documentElement)), at));
}
function on(e, t) {
  const r = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return r ? parseFloat(r.replace("px", "")) : 0;
}
function Km(e) {
  const t = on(e, "border-left-width"), n = on(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Bm(e) {
  const t = on(e, "border-top-width"), n = on(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Fo(e, t = {}) {
  const n = t.width || Km(e), r = t.height || Bm(e);
  return { width: n, height: r };
}
function Hm() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const ve = 16384;
function Wm(e) {
  (e.width > ve || e.height > ve) && (e.width > ve && e.height > ve ? e.width > e.height ? (e.height *= ve / e.width, e.width = ve) : (e.width *= ve / e.height, e.height = ve) : e.width > ve ? (e.height *= ve / e.width, e.width = ve) : (e.width *= ve / e.height, e.height = ve));
}
function sn(e) {
  return new Promise((t, n) => {
    const r = new Image();
    r.onload = () => {
      r.decode().then(() => {
        requestAnimationFrame(() => t(r));
      });
    }, r.onerror = n, r.crossOrigin = "anonymous", r.decoding = "async", r.src = e;
  });
}
async function Gm(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Um(e, t, n) {
  const r = "http://www.w3.org/2000/svg", a = document.createElementNS(r, "svg"), o = document.createElementNS(r, "foreignObject");
  return a.setAttribute("width", `${t}`), a.setAttribute("height", `${n}`), a.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), a.appendChild(o), o.appendChild(e), Gm(a);
}
const ye = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || ye(n, t);
};
function Ym(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Qm(e, t) {
  return zo(t).map((n) => {
    const r = e.getPropertyValue(n), a = e.getPropertyPriority(n);
    return `${n}: ${r}${a ? " !important" : ""};`;
  }).join(" ");
}
function Jm(e, t, n, r) {
  const a = `.${e}:${t}`, o = n.cssText ? Ym(n) : Qm(n, r);
  return document.createTextNode(`${a}{${o}}`);
}
function ua(e, t, n, r) {
  const a = window.getComputedStyle(e, n), o = a.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const s = qm();
  try {
    t.className = `${t.className} ${s}`;
  } catch {
    return;
  }
  const l = document.createElement("style");
  l.appendChild(Jm(s, n, a, r)), t.appendChild(l);
}
function Xm(e, t, n) {
  ua(e, t, ":before", n), ua(e, t, ":after", n);
}
const ma = "application/font-woff", da = "image/jpeg", Zm = {
  woff: ma,
  woff2: ma,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: da,
  jpeg: da,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function ed(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Rr(e) {
  const t = ed(e).toLowerCase();
  return Zm[t] || "";
}
function td(e) {
  return e.split(/,/)[1];
}
function Jn(e) {
  return e.search(/^(data:)/) !== -1;
}
function nd(e, t) {
  return `data:${t};base64,${e}`;
}
async function $o(e, t, n) {
  const r = await fetch(e, t);
  if (r.status === 404)
    throw new Error(`Resource "${r.url}" not found`);
  const a = await r.blob();
  return new Promise((o, s) => {
    const l = new FileReader();
    l.onerror = s, l.onloadend = () => {
      try {
        o(n({ res: r, result: l.result }));
      } catch (c) {
        s(c);
      }
    }, l.readAsDataURL(a);
  });
}
const Pn = {};
function rd(e, t, n) {
  let r = e.replace(/\?.*/, "");
  return n && (r = e), /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, "")), t ? `[${t}]${r}` : r;
}
async function Ar(e, t, n) {
  const r = rd(e, t, n.includeQueryParams);
  if (Pn[r] != null)
    return Pn[r];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let a;
  try {
    const o = await $o(e, n.fetchRequestInit, ({ res: s, result: l }) => (t || (t = s.headers.get("Content-Type") || ""), td(l)));
    a = nd(o, t);
  } catch (o) {
    a = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    o && (s = typeof o == "string" ? o : o.message), s && console.warn(s);
  }
  return Pn[r] = a, a;
}
async function ad(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : sn(t);
}
async function od(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), s = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, o.width, o.height);
    const l = o.toDataURL();
    return sn(l);
  }
  const n = e.poster, r = Rr(n), a = await Ar(n, r, t);
  return sn(a);
}
async function id(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await vn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function sd(e, t) {
  return ye(e, HTMLCanvasElement) ? ad(e) : ye(e, HTMLVideoElement) ? od(e, t) : ye(e, HTMLIFrameElement) ? id(e, t) : e.cloneNode(Po(e));
}
const ld = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Po = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function cd(e, t, n) {
  var r, a;
  if (Po(t))
    return t;
  let o = [];
  return ld(e) && e.assignedNodes ? o = Ke(e.assignedNodes()) : ye(e, HTMLIFrameElement) && (!((r = e.contentDocument) === null || r === void 0) && r.body) ? o = Ke(e.contentDocument.body.childNodes) : o = Ke(((a = e.shadowRoot) !== null && a !== void 0 ? a : e).childNodes), o.length === 0 || ye(e, HTMLVideoElement) || await o.reduce((s, l) => s.then(() => vn(l, n)).then((c) => {
    c && t.appendChild(c);
  }), Promise.resolve()), t;
}
function ud(e, t, n) {
  const r = t.style;
  if (!r)
    return;
  const a = window.getComputedStyle(e);
  a.cssText ? (r.cssText = a.cssText, r.transformOrigin = a.transformOrigin) : zo(n).forEach((o) => {
    let s = a.getPropertyValue(o);
    o === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), ye(e, HTMLIFrameElement) && o === "display" && s === "inline" && (s = "block"), o === "d" && t.getAttribute("d") && (s = `path(${t.getAttribute("d")})`), r.setProperty(o, s, a.getPropertyPriority(o));
  });
}
function md(e, t) {
  ye(e, HTMLTextAreaElement) && (t.innerHTML = e.value), ye(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function dd(e, t) {
  if (ye(e, HTMLSelectElement)) {
    const r = Array.from(t.children).find((a) => e.value === a.getAttribute("value"));
    r && r.setAttribute("selected", "");
  }
}
function fd(e, t, n) {
  return ye(t, Element) && (ud(e, t, n), Xm(e, t, n), md(e, t), dd(e, t)), t;
}
async function hd(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const r = {};
  for (let o = 0; o < n.length; o++) {
    const l = n[o].getAttribute("xlink:href");
    if (l) {
      const c = e.querySelector(l), u = document.querySelector(l);
      !c && u && !r[l] && (r[l] = await vn(u, t, !0));
    }
  }
  const a = Object.values(r);
  if (a.length) {
    const o = "http://www.w3.org/1999/xhtml", s = document.createElementNS(o, "svg");
    s.setAttribute("xmlns", o), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const l = document.createElementNS(o, "defs");
    s.appendChild(l);
    for (let c = 0; c < a.length; c++)
      l.appendChild(a[c]);
    e.appendChild(s);
  }
  return e;
}
async function vn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((r) => sd(r, t)).then((r) => cd(e, r, t)).then((r) => fd(e, r, t)).then((r) => hd(r, t));
}
const Eo = /url\((['"]?)([^'"]+?)\1\)/g, pd = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, gd = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function bd(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function yd(e) {
  const t = [];
  return e.replace(Eo, (n, r, a) => (t.push(a), n)), t.filter((n) => !Jn(n));
}
async function vd(e, t, n, r, a) {
  try {
    const o = n ? Vm(t, n) : t, s = Rr(t);
    let l;
    return a || (l = await Ar(o, s, r)), e.replace(bd(t), `$1${l}$3`);
  } catch {
  }
  return e;
}
function xd(e, { preferredFontFormat: t }) {
  return t ? e.replace(gd, (n) => {
    for (; ; ) {
      const [r, , a] = pd.exec(n) || [];
      if (!a)
        return "";
      if (a === t)
        return `src: ${r};`;
    }
  }) : e;
}
function Io(e) {
  return e.search(Eo) !== -1;
}
async function jo(e, t, n) {
  if (!Io(e))
    return e;
  const r = xd(e, n);
  return yd(r).reduce((o, s) => o.then((l) => vd(l, s, t, n)), Promise.resolve(r));
}
async function ot(e, t, n) {
  var r;
  const a = (r = t.style) === null || r === void 0 ? void 0 : r.getPropertyValue(e);
  if (a) {
    const o = await jo(a, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function wd(e, t) {
  await ot("background", e, t) || await ot("background-image", e, t), await ot("mask", e, t) || await ot("-webkit-mask", e, t) || await ot("mask-image", e, t) || await ot("-webkit-mask-image", e, t);
}
async function kd(e, t) {
  const n = ye(e, HTMLImageElement);
  if (!(n && !Jn(e.src)) && !(ye(e, SVGImageElement) && !Jn(e.href.baseVal)))
    return;
  const r = n ? e.src : e.href.baseVal, a = await Ar(r, Rr(r), t);
  await new Promise((o, s) => {
    e.onload = o, e.onerror = t.onImageErrorHandler ? (...c) => {
      try {
        o(t.onImageErrorHandler(...c));
      } catch (u) {
        s(u);
      }
    } : s;
    const l = e;
    l.decode && (l.decode = o), l.loading === "lazy" && (l.loading = "eager"), n ? (e.srcset = "", e.src = a) : e.href.baseVal = a;
  });
}
async function Nd(e, t) {
  const r = Ke(e.childNodes).map((a) => Vo(a, t));
  await Promise.all(r).then(() => e);
}
async function Vo(e, t) {
  ye(e, Element) && (await wd(e, t), await kd(e, t), await Nd(e, t));
}
function Cd(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const r = t.style;
  return r != null && Object.keys(r).forEach((a) => {
    n[a] = r[a];
  }), e;
}
const fa = {};
async function ha(e) {
  let t = fa[e];
  if (t != null)
    return t;
  const r = await (await fetch(e)).text();
  return t = { url: e, cssText: r }, fa[e] = t, t;
}
async function pa(e, t) {
  let n = e.cssText;
  const r = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let l = s.replace(r, "$1");
    return l.startsWith("https://") || (l = new URL(l, e.url).href), $o(l, t.fetchRequestInit, ({ result: c }) => (n = n.replace(s, `url(${c})`), [s, c]));
  });
  return Promise.all(o).then(() => n);
}
function ga(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let r = e.replace(n, "");
  const a = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const c = a.exec(r);
    if (c === null)
      break;
    t.push(c[0]);
  }
  r = r.replace(a, "");
  const o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", l = new RegExp(s, "gi");
  for (; ; ) {
    let c = o.exec(r);
    if (c === null) {
      if (c = l.exec(r), c === null)
        break;
      o.lastIndex = l.lastIndex;
    } else
      l.lastIndex = o.lastIndex;
    t.push(c[0]);
  }
  return t;
}
async function Sd(e, t) {
  const n = [], r = [];
  return e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ke(a.cssRules || []).forEach((o, s) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let l = s + 1;
            const c = o.href, u = ha(c).then((d) => pa(d, t)).then((d) => ga(d).forEach((h) => {
              try {
                a.insertRule(h, h.startsWith("@import") ? l += 1 : a.cssRules.length);
              } catch (p) {
                console.error("Error inserting rule from remote css", {
                  rule: h,
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
        const s = e.find((l) => l.href == null) || document.styleSheets[0];
        a.href != null && r.push(ha(a.href).then((l) => pa(l, t)).then((l) => ga(l).forEach((c) => {
          s.insertRule(c, s.cssRules.length);
        })).catch((l) => {
          console.error("Error loading remote stylesheet", l);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(r).then(() => (e.forEach((a) => {
    if ("cssRules" in a)
      try {
        Ke(a.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${a.href}`, o);
      }
  }), n));
}
function _d(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Io(t.style.getPropertyValue("src")));
}
async function Rd(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = Ke(e.ownerDocument.styleSheets), r = await Sd(n, t);
  return _d(r);
}
function qo(e) {
  return e.trim().replace(/["']/g, "");
}
function Ad(e) {
  const t = /* @__PURE__ */ new Set();
  function n(r) {
    (r.style.fontFamily || getComputedStyle(r).fontFamily).split(",").forEach((o) => {
      t.add(qo(o));
    }), Array.from(r.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function Md(e, t) {
  const n = await Rd(e, t), r = Ad(e);
  return (await Promise.all(n.filter((o) => r.has(qo(o.style.fontFamily))).map((o) => {
    const s = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return jo(o.cssText, s, t);
  }))).join(`
`);
}
async function Od(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Md(e, t);
  if (n) {
    const r = document.createElement("style"), a = document.createTextNode(n);
    r.appendChild(a), e.firstChild ? e.insertBefore(r, e.firstChild) : e.appendChild(r);
  }
}
async function Ld(e, t = {}) {
  const { width: n, height: r } = Fo(e, t), a = await vn(e, t, !0);
  return await Od(a, t), await Vo(a, t), Cd(a, t), await Um(a, n, r);
}
async function Dd(e, t = {}) {
  const { width: n, height: r } = Fo(e, t), a = await Ld(e, t), o = await sn(a), s = document.createElement("canvas"), l = s.getContext("2d"), c = t.pixelRatio || Hm(), u = t.canvasWidth || n, d = t.canvasHeight || r;
  return s.width = u * c, s.height = d * c, t.skipAutoScale || Wm(s), s.style.width = `${u}`, s.style.height = `${d}`, t.backgroundColor && (l.fillStyle = t.backgroundColor, l.fillRect(0, 0, s.width, s.height)), l.drawImage(o, 0, 0, s.width, s.height), s;
}
async function Td(e, t = {}) {
  return (await Dd(e, t)).toDataURL();
}
function zd(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Fd(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function $d(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Pd(e, t, n = 2) {
  const r = await Td(e, {
    pixelRatio: n,
    backgroundColor: $d(e),
    cacheBust: !0
  });
  Fd(r, `${zd(t)}.png`);
}
function Ed({
  title: e,
  rows: t,
  refetch: n,
  captureRef: r
}) {
  const [a, o] = x.useState(!1), s = t.length > 0, l = !!r;
  if (!s && !n && !l) return null;
  const c = () => {
    const p = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    jm(Im(t), `${p}.csv`);
  }, u = async () => {
    const p = r == null ? void 0 : r.current;
    if (!(!p || a)) {
      o(!0);
      try {
        await Pd(p, e);
      } finally {
        o(!1);
      }
    }
  }, d = (p) => p.stopPropagation(), h = (p = !0) => N(
    "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
    !p && "cursor-not-allowed opacity-50"
  );
  return /* @__PURE__ */ f(Ne, { children: [
    /* @__PURE__ */ i(
      Ce,
      {
        onMouseDown: d,
        onPointerDown: d,
        onTouchStart: d,
        className: "rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(Di, { className: "size-4" })
      }
    ),
    /* @__PURE__ */ f(Se, { align: "end", className: "w-44 p-1", onMouseDown: d, onPointerDown: d, onTouchStart: d, children: [
      n ? /* @__PURE__ */ f("button", { type: "button", onClick: n, className: h(), children: [
        /* @__PURE__ */ i(Ti, { className: "size-3.5 text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      l ? /* @__PURE__ */ f("button", { type: "button", onClick: u, disabled: a, className: h(!a), children: [
        /* @__PURE__ */ i(zi, { className: "size-3.5 text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ f("button", { type: "button", onClick: c, disabled: !s, className: h(s), children: [
        /* @__PURE__ */ i(Fi, { className: "size-3.5 text-muted-foreground" }),
        "Export CSV"
      ] })
    ] })
  ] });
}
function ba({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(_r, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(pm, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(Fm, { control: e.control, title: e.title });
  }
}
function Ko({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [r, a] = ut({ rows: [] }), o = qe(
    (c) => a({ rows: c.rows, refetch: c.refetch }),
    []
  ), s = it(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "h-full w-full overflow-auto p-2", children: /* @__PURE__ */ i(ba, { widget: e }) });
  const l = n ? null : /* @__PURE__ */ i(
    Ed,
    {
      title: e.title,
      rows: r.rows,
      refetch: r.refetch,
      captureRef: s
    }
  );
  return /* @__PURE__ */ i(
    To,
    {
      widget: e,
      title: e.title,
      menu: l,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: s, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(ba, { widget: e, onState: o }) })
    }
  );
}
const Id = "lg";
function jd(e) {
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
function Vd(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Lp({ spec: e, editable: t = !1 }) {
  const [n, r] = _o(), a = e.grid ?? {}, o = a.cols ?? 12, s = a.rowHeight ?? 40, l = a.margin ?? [12, 12], c = a.containerPadding ?? [0, 0], { breakpoints: u, cols: d } = Z(
    () => jd(o),
    [o]
  ), h = Z(
    () => ({ [Id]: Vd(e.layout) }),
    [e.layout]
  ), p = Z(
    () => new Map(e.widgets.map((b) => [b.id, b])),
    [e.widgets]
  );
  return /* @__PURE__ */ i(Cr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "w-full", children: r > 0 ? /* @__PURE__ */ i(
    Ja,
    {
      width: r,
      layouts: h,
      breakpoints: u,
      cols: d,
      rowHeight: s,
      margin: l,
      containerPadding: c,
      dragConfig: { enabled: t, handle: `.${an}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((b) => {
        const y = p.get(b.i);
        return y ? /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(Ko, { widget: y, editable: t }) }, b.i) : null;
      })
    }
  ) : null }) });
}
function Dp({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "h-full w-full", children: /* @__PURE__ */ i(
    To,
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
      children: /* @__PURE__ */ i(fm, { spec: e })
    }
  ) });
}
function xn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function Je(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function wn(e) {
  return e ? e.cubes.filter((t) => Je(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: xn(t)
  })) : [];
}
function Dt(e, t) {
  if (!(!e || !t))
    return wn(e).find((n) => n.name === t);
}
function Mr(e) {
  return e.shortTitle || e.title || e.name;
}
function ln(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Bo(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Mr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "number",
    memberType: "measure",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ln(n, "quantity"),
    unit: ln(n, "unit")
  };
}
function Xn(e, t) {
  const n = e.meta;
  return {
    name: e.name,
    label: Mr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: e.type,
    memberType: "dimension",
    cube: t,
    description: e.description,
    meta: n,
    quantity: ln(n, "quantity"),
    unit: ln(n, "unit")
  };
}
function Ho(e, t) {
  return {
    name: e.name,
    label: Mr(e),
    title: e.title ?? e.name,
    shortTitle: e.shortTitle ?? e.name,
    type: "segment",
    memberType: "segment",
    cube: t,
    description: e.description,
    meta: e.meta
  };
}
function Zn(e, t, n) {
  if (!e) return [];
  const r = [];
  for (const a of e.cubes) {
    if (!Je(a) || n && a.name !== n) continue;
    const o = xn(a), s = (l) => {
      l.connectedComponent = o, r.push(l);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const l of a.measures)
        Je(l) && s(Bo(l, a.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const l of a.dimensions)
        Je(l) && l.type !== "time" && s(Xn(l, a.name));
    if (t === "time")
      for (const l of a.dimensions)
        Je(l) && l.type === "time" && s(Xn(l, a.name));
  }
  return r;
}
function qd(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, r = [];
  for (const a of e.cubes) {
    if (!Je(a) || n && !n.has(a.name)) continue;
    const o = xn(a);
    for (const s of a.segments) {
      if (!Je(s)) continue;
      const l = Ho(s, a.name);
      l.connectedComponent = o, r.push(l);
    }
  }
  return r;
}
function De(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const r = xn(n), a = (l) => (l && (l.connectedComponent = r), l), o = n.measures.find((l) => l.name === t) ?? n.dimensions.find((l) => l.name === t);
      if (o)
        return o.type ? "aggType" in o ? a(Bo(o, n.name)) : a(Xn(o, n.name)) : void 0;
      const s = n.segments.find((l) => l.name === t);
      if (s) return a(Ho(s, n.name));
    }
}
function Kd(e) {
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
const er = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Wo = {
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
function At(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Go(e) {
  var s, l, c, u, d;
  const t = e.query, n = (s = t.measures) == null ? void 0 : s.find(Boolean);
  if (n) return At(n);
  const r = (l = t.dimensions) == null ? void 0 : l.find(Boolean);
  if (r) return At(r);
  const a = (u = (c = t.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : u.dimension;
  if (a) return At(a);
  const o = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return At(o);
}
function ft(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function wt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function xe(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Ue(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Uo(e, t) {
  const n = {};
  for (const a of e) {
    const o = t[a];
    o && Object.keys(o).length > 0 && (n[a] = o);
  }
  const r = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (r.meta = n), r;
}
const Yo = {
  bar: "Bar",
  line: "Line",
  area: "Area",
  pie: "Pie",
  scatter: "Scatter",
  kpi: "KPI",
  table: "Table",
  combo: "Combo"
}, Bd = "day";
function Hd(e, t) {
  var u, d, h, p;
  const { query: n, chart: r } = e, a = ft(r).length ? ft(r) : n.measures ?? [], o = xe(r) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((h = (d = n.timeDimensions) == null ? void 0 : d[0]) == null ? void 0 : h.dimension), s = o ? { category: { member: o }, series: { mode: "measures", members: a } } : void 0, l = {
    ...e,
    chart: { ...r, family: t, mapping: void 0, familyOptions: void 0 }
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
          series: a.map((b, y) => ({ member: b, render: y % 2 === 1 ? "bar" : "line" }))
        }
      });
    case "kpi":
      return c({
        familyOptions: { display: "number", ...a[0] ? { measure: a[0] } : {} }
      });
    case "scatter":
      return c({
        familyOptions: {
          ...a[0] ? { x: a[0] } : {},
          ...a[1] ? { y: a[1] } : {}
        }
      });
    case "table": {
      const b = [
        ...n.dimensions ?? [],
        ...((p = n.timeDimensions) == null ? void 0 : p.map((y) => y.dimension)) ?? [],
        ...a
      ].map((y) => ({ member: y }));
      return c({ familyOptions: b.length ? { columns: b } : void 0 });
    }
  }
}
function St(e) {
  return eu(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function tr(e) {
  return nu(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
const ya = "a date or category";
function Wd(e) {
  switch (e) {
    case "bar":
    case "line":
    case "area":
      return [
        { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
        { id: "x", label: "Category", hint: ya, cardinality: "one", kinds: ["time", "category"] },
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
        { id: "x", label: "Category", hint: ya, cardinality: "one", kinds: ["time", "category"] },
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
function ke(e) {
  return e.chart.familyOptions ?? {};
}
function kn(e) {
  const t = ke(e).series;
  return Array.isArray(t) ? t : [];
}
function Or(e) {
  const t = ke(e).columns;
  return Array.isArray(t) ? t : [];
}
function Gd(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function qt(e) {
  var a;
  const { chart: t } = e, n = t.family, r = (o) => o ? [o] : [];
  switch (n) {
    case "bar":
    case "line":
    case "area": {
      const o = Gd(e), s = (a = t.mapping) == null ? void 0 : a.series;
      return { y: s && s.mode === "pivot" ? s.values && s.values.length > 0 ? s.values : r(s.value) : ft(t), x: r(xe(t)), color: r(o) };
    }
    case "combo":
      return {
        x: r(xe(t)),
        y: kn(e).map((o) => o.member)
      };
    case "pie":
      return { slices: r(xe(t)), size: r(ft(t)[0]) };
    case "scatter": {
      const o = ke(e);
      return {
        sx: r(o.x),
        sy: r(o.y),
        size: r(o.size),
        color: r(o.groupBy)
      };
    }
    case "kpi":
      return { value: r(ke(e).measure) };
    case "table":
      return { columns: Or(e).map((o) => o.member) };
  }
}
function Nn(e) {
  const t = Ud(e);
  return t === void 0 ? Bd : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Ud(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function Kt(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function Ze(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function kt(e, t) {
  return { ...e, dimensions: Kt(e.dimensions, t) };
}
function Fe(e, t) {
  const n = Ze(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Ee(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function et(e, t, n) {
  if (e)
    return { category: { member: e }, series: Uo(t, n) };
}
function cn(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function un(e, t, n, r) {
  if (!e || t.length === 0) return;
  const a = {};
  for (const l of t) {
    const c = r == null ? void 0 : r[l];
    c && Object.keys(c).length > 0 && (a[l] = c);
  }
  const o = Object.keys(a).length > 0, s = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: a } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: a } : {} };
  return { category: { member: e }, series: s };
}
function va(e, t, n, r, a) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Qd(e, n, r, a);
    case "combo":
      return Zd(e, n, r, a);
    case "pie":
      return nf(e, n, r, a);
    case "scatter":
      return af(e, n, r);
    case "kpi":
      return sf(e, r);
    case "table":
      return cf(e, r, a);
  }
}
function Yd(e, t, n, r) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Xd(e, n, r);
    case "combo":
      return tf(e, n, r);
    case "pie":
      return rf(e, n, r);
    case "scatter":
      return of(e, n, r);
    case "kpi":
      return lf(e, r);
    case "table":
      return uf(e, r);
  }
}
function Qd(e, t, n, r) {
  const { query: a, chart: o } = e, s = qt(e), l = s.color[0], c = xe(o), u = wt(o);
  if (t === "y") {
    const d = s.y, h = Kt(d, n);
    return l ? {
      ...e,
      query: { ...a, measures: h },
      chart: { ...o, mapping: un(c, h, l, cn(o)) }
    } : {
      ...e,
      query: { ...a, measures: h },
      chart: { ...o, mapping: et(c, h, u) }
    };
  }
  if (t === "x")
    return Jd(e, n, r, l);
  if (t === "color") {
    const d = s.y;
    if (d.length === 0) return e;
    const h = kt({ ...a, measures: d }, n);
    return {
      ...e,
      query: h,
      chart: { ...o, mapping: un(c, d, n, cn(o)) }
    };
  }
  return e;
}
function Jd(e, t, n, r) {
  const { query: a, chart: o } = e, s = xe(o), l = qt(e).y, c = wt(o);
  let u = a;
  const d = Ue(a);
  if (d && s === d.dimension ? u = Ee(u, void 0) : s && (u = Fe(u, s)), n === "time") {
    const p = (d == null ? void 0 : d.granularity) ?? Nn(d == null ? void 0 : d.dateRange);
    u = Ee(u, {
      dimension: t,
      granularity: p,
      dateRange: d == null ? void 0 : d.dateRange
    });
  } else
    u = kt(u, t);
  const h = r ? un(t, l, r, cn(o)) : et(t, l, c);
  return { ...e, query: u, chart: { ...o, mapping: h } };
}
function Xd(e, t, n) {
  const { query: r, chart: a } = e, o = qt(e), s = xe(a), l = o.color[0], c = wt(a);
  if (t === "y") {
    const u = Ze(o.y, n);
    if (l && u.length >= 1)
      return {
        ...e,
        query: { ...r, measures: u },
        chart: { ...a, mapping: un(s, u, l, cn(a)) }
      };
    const d = l ? Fe({ ...r, measures: u }, l) : { ...r, measures: u };
    return { ...e, query: d, chart: { ...a, mapping: et(s, u, c) } };
  }
  if (t === "x") {
    let u = r;
    const d = Ue(r);
    return d && d.dimension === n ? u = Ee(u, void 0) : u = Fe(u, n), { ...e, query: u, chart: { ...a, mapping: void 0 } };
  }
  if (t === "color") {
    const u = Fe(r, n);
    return {
      ...e,
      query: u,
      chart: { ...a, mapping: et(s, o.y, c) }
    };
  }
  return e;
}
const xa = ["line", "bar"];
function Zd(e, t, n, r) {
  const { query: a, chart: o } = e, s = ke(e);
  if (t === "x") {
    let l = a;
    const c = xe(o), u = Ue(a);
    if (u && c === u.dimension ? l = Ee(l, void 0) : c && (l = Fe(l, c)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? Nn(u == null ? void 0 : u.dateRange);
      l = Ee(l, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      l = kt(l, n);
    return { ...e, query: l, chart: { ...o, mapping: { category: { member: n }, series: ef(e) } } };
  }
  if (t === "y") {
    const l = kn(e);
    if (l.some((d) => d.member === n)) return e;
    const c = xa[l.length % xa.length], u = [...l, { member: n, render: c }];
    return {
      ...e,
      query: { ...a, measures: Kt(a.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...s, series: u }, mapping: Qo(o, u) }
    };
  }
  return e;
}
function Qo(e, t) {
  const n = xe(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((r) => r.member) } } : e.mapping;
}
function ef(e) {
  return { mode: "measures", members: kn(e).map((t) => t.member) };
}
function tf(e, t, n) {
  const { query: r, chart: a } = e, o = ke(e);
  if (t === "x") {
    let s = r;
    const l = Ue(r);
    return l && l.dimension === n ? s = Ee(s, void 0) : s = Fe(s, n), { ...e, query: s, chart: { ...a, mapping: void 0 } };
  }
  if (t === "y") {
    const s = kn(e).filter((c) => c.member !== n), l = Ze(r.measures, n);
    return {
      ...e,
      query: { ...r, measures: l },
      chart: { ...a, familyOptions: { ...o, series: s }, mapping: Qo(a, s) }
    };
  }
  return e;
}
function nf(e, t, n, r) {
  const { query: a, chart: o } = e, s = wt(o);
  if (t === "slices") {
    let l = a;
    const c = xe(o), u = Ue(a);
    if (u && c === u.dimension ? l = Ee(l, void 0) : c && (l = Fe(l, c)), r === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? Nn(u == null ? void 0 : u.dateRange);
      l = Ee(l, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      l = kt(l, n);
    return {
      ...e,
      query: l,
      chart: { ...o, mapping: et(n, ft(o), s) }
    };
  }
  if (t === "size") {
    const l = [n];
    return {
      ...e,
      query: { ...a, measures: l },
      chart: { ...o, mapping: et(xe(o), l, s) }
    };
  }
  return e;
}
function rf(e, t, n) {
  const { query: r, chart: a } = e, o = wt(a);
  if (t === "slices") {
    let s = r;
    const l = Ue(r);
    return l && l.dimension === n ? s = Ee(s, void 0) : s = Fe(s, n), { ...e, query: s, chart: { ...a, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...r, measures: [] },
    chart: { ...a, mapping: et(xe(a), [], o) }
  } : e;
}
const Jo = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function af(e, t, n) {
  const r = Jo[t];
  if (!r) return e;
  const { query: a, chart: o } = e, s = { ...ke(e) }, l = s[r];
  s[r] = n;
  let c = a;
  if (r === "groupBy")
    l && l !== n && (c = Fe(c, l)), c = kt(c, n);
  else {
    const u = l ? Ze(a.measures, l) : a.measures;
    c = { ...a, measures: Kt(u, n) };
  }
  return { ...e, query: c, chart: { ...o, familyOptions: s } };
}
function of(e, t, n) {
  const r = Jo[t];
  if (!r) return e;
  const { query: a, chart: o } = e, s = { ...ke(e) };
  delete s[r];
  let l = a;
  if (r === "groupBy") l = Fe(l, n);
  else {
    const c = Ze(a.measures, n);
    l = { ...a, measures: c.length ? c : [] };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: s } };
}
function sf(e, t) {
  const { query: n, chart: r } = e, a = { ...ke(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...r, familyOptions: a } };
}
function lf(e, t) {
  const { query: n, chart: r } = e, a = { ...ke(e) };
  return a.measure === t && delete a.measure, { ...e, query: { ...n, measures: [] }, chart: { ...r, familyOptions: a } };
}
function cf(e, t, n) {
  const { query: r, chart: a } = e, o = Or(e);
  if (o.some((c) => c.member === t)) return e;
  let s = r;
  if (n === "number") s = { ...r, measures: Kt(r.measures, t) };
  else if (n === "time") {
    const c = Ue(r), u = (c == null ? void 0 : c.granularity) ?? Nn(c == null ? void 0 : c.dateRange), d = r.timeDimensions ?? [];
    d.some((h) => h.dimension === t) || (s = { ...r, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else s = kt(r, t);
  const l = { ...ke(e), columns: [...o, { member: t }] };
  return { ...e, query: s, chart: { ...a, familyOptions: l } };
}
function uf(e, t) {
  var d, h, p;
  const { query: n, chart: r } = e, a = Or(e).filter((b) => b.member !== t);
  let o = n;
  const s = Ze(n.measures, t);
  s.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: s.length ? s : void 0 });
  const l = Ze(n.dimensions, t);
  l.length !== (((h = n.dimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, dimensions: l.length ? l : void 0 });
  const c = (n.timeDimensions ?? []).filter((b) => b.dimension !== t);
  c.length !== (((p = n.timeDimensions) == null ? void 0 : p.length) ?? 0) && (o = { ...o, timeDimensions: c.length ? c : void 0 });
  const u = { ...ke(e), columns: a };
  return { ...e, query: o, chart: { ...r, familyOptions: u } };
}
const me = x.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      ref: r,
      type: t,
      "data-slot": "input",
      className: N(
        "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...n
    }
  )
);
me.displayName = "Input";
function mn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(qa, { className: "size-3.5 shrink-0 text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(Va, { className: "size-3.5 shrink-0 text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(ur, { className: "size-3.5 shrink-0 text-muted-foreground" });
  }
}
function Xo({
  cube: e,
  cubes: t,
  kind: n,
  value: r,
  onChange: a,
  placeholder: o = "Select member…",
  disabled: s,
  id: l,
  className: c
}) {
  const { meta: u, isLoading: d } = Ge(), h = x.useMemo(() => {
    if (t) {
      const y = new Set(t);
      return Zn(u, n).filter((g) => y.has(g.cube));
    }
    return Zn(u, n, e);
  }, [u, n, e, t]), p = x.useMemo(() => mf(h), [h]), b = h.find((y) => y.name === r);
  return /* @__PURE__ */ f(Ae, { value: r, onValueChange: a, disabled: s || d, children: [
    /* @__PURE__ */ i(Oe, { id: l, className: c, children: /* @__PURE__ */ i(Me, { placeholder: d ? "Loading…" : o, children: b ? /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
      mn(b.type),
      /* @__PURE__ */ i("span", { className: "truncate", children: b.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Le, { children: p.map(([y, g]) => /* @__PURE__ */ f(Yn, { children: [
      p.length > 1 ? /* @__PURE__ */ i(Qn, { children: y }) : null,
      g.map((v) => /* @__PURE__ */ i(pe, { value: v.name, children: /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
        mn(v.type),
        /* @__PURE__ */ i("span", { className: "truncate", children: v.label })
      ] }) }, v.name))
    ] }, y)) })
  ] });
}
function mf(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const r = t.get(n.cube);
    r ? r.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Ft({
  options: e,
  value: t,
  onChange: n,
  fullWidth: r = !0,
  size: a = "default",
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
      className: N(
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
            className: N(
              "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              a === "sm" ? "h-7 px-2 text-xs" : "h-7 px-2.5 text-sm",
              r && "flex-1",
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
const df = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(Va, { className: "size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(ur, { className: "size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(qa, { className: "size-3" }), metaKind: "time" }
}, ff = ["number", "category", "time"];
function Zo({
  well: e,
  placed: t,
  scope: n,
  blockReason: r,
  onSelect: a,
  align: o = "start",
  side: s = "bottom",
  children: l
}) {
  var j, B;
  const { meta: c, isLoading: u } = Ge(), [d, h] = x.useState(!1), [p, b] = x.useState(""), [y, g] = x.useState(n.viewLocked ?? "tables"), [v, S] = x.useState({});
  x.useEffect(() => {
    d && g(n.viewLocked ?? "tables");
  }, [d, n.viewLocked]);
  const R = x.useMemo(() => new Set(t), [t]), k = p.trim().toLowerCase(), _ = x.useMemo(() => {
    if (y !== "tables") {
      const A = n.views.find((Y) => Y.name === y) ?? Dt(c, y);
      return A ? [{ cube: A, tag: "dataset" }] : [];
    }
    const D = [];
    n.sourceCube && D.push({ cube: n.sourceCube, tag: "source" });
    for (const A of n.relatedCubes) D.push({ cube: A, tag: "related" });
    return D;
  }, [y, n, c]), C = e.kinds.length > 1, w = (D) => ff.filter((A) => e.kinds.includes(A)).map((A) => {
    const Y = df[A], G = Zn(c, Y.metaKind, D).filter((P) => !R.has(P.name)).filter((P) => k ? P.label.toLowerCase().includes(k) || P.name.toLowerCase().includes(k) : !0);
    return { kind: A, label: Y.label, icon: Y.icon, items: G };
  }).filter((A) => A.items.length > 0), L = _.map((D) => ({ section: D, groups: w(D.cube.name) })).filter((D) => D.groups.length > 0), T = L.length > 0, V = (D, A) => {
    a(D, A), h(!1), b("");
  }, K = y === "tables" ? "All related tables" : ((j = n.views.find((D) => D.name === y)) == null ? void 0 : j.title) ?? ((B = Dt(c, y)) == null ? void 0 : B.title) ?? y;
  return /* @__PURE__ */ f(Ne, { open: d, onOpenChange: h, children: [
    /* @__PURE__ */ i(Ce, { asChild: !0, children: l }),
    /* @__PURE__ */ f(Se, { align: o, side: s, className: "w-80 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex items-center gap-2 pb-1.5", children: [
        /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-input bg-background px-2", children: [
          /* @__PURE__ */ i($i, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i(
            "input",
            {
              autoFocus: !0,
              value: p,
              onChange: (D) => b(D.target.value),
              placeholder: u ? "Loading fields…" : "Search fields…",
              className: "h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ i(hf, { browse: y, label: K, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "max-h-80 overflow-y-auto", children: T ? L.map(({ section: D, groups: A }, Y) => {
        const G = A.reduce((z, Q) => z + Q.items.length, 0), P = D.tag === "related", U = v[D.cube.name] ?? P, I = k.length > 0 ? !0 : !U;
        return /* @__PURE__ */ f("div", { children: [
          D.tag === "related" && Y > 0 && L[Y - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "px-1 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => S((z) => ({ ...z, [D.cube.name]: !U })),
              className: "flex w-full items-center gap-1.5 rounded-sm px-1 py-1 text-left hover:bg-accent/50",
              children: [
                I ? /* @__PURE__ */ i(tt, { className: "size-3 shrink-0 text-muted-foreground" }) : /* @__PURE__ */ i(dn, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i(Ka, { className: "size-3 shrink-0 text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "truncate text-xs font-medium", children: D.cube.title }),
                D.tag === "source" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-primary/10 px-1 py-px text-[9px] font-medium uppercase text-primary", children: "Main table" }) : D.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "rounded-sm bg-muted px-1 py-px text-[9px] font-medium uppercase text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "ml-auto shrink-0 pr-1 text-[10px] tabular-nums text-muted-foreground/70", children: G })
              ]
            }
          ),
          I ? A.map((z) => /* @__PURE__ */ f("div", { className: "pb-0.5 pl-4", children: [
            C ? /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 px-2 pb-0.5 pt-1 text-[9px] uppercase tracking-wide text-muted-foreground/70", children: [
              z.icon,
              z.label
            ] }) : null,
            z.items.map((Q) => /* @__PURE__ */ i(pf, { option: Q, reason: r(Q), onPick: () => V(Q.name, z.kind) }, Q.name))
          ] }, z.kind)) : null
        ] }, D.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "px-1 py-6 text-center text-xs text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function hf({ browse: e, label: t, views: n, onBrowse: r }) {
  const [a, o] = x.useState(!1), s = (l) => {
    r(l), o(!1);
  };
  return /* @__PURE__ */ f(Ne, { open: a, onOpenChange: o, children: [
    /* @__PURE__ */ f(
      Ce,
      {
        className: "flex h-8 max-w-[9rem] shrink-0 items-center gap-1.5 rounded-md border border-input bg-background px-2 text-xs hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(Ba, { className: "size-3.5 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ f(Se, { align: "end", className: "w-60 p-1", children: [
      /* @__PURE__ */ i(wa, { active: e === "tables", icon: /* @__PURE__ */ i(Ka, { className: "size-3.5" }), onClick: () => s("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ i("div", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Saved datasets" }),
        n.map((l) => /* @__PURE__ */ i(
          wa,
          {
            active: e === l.name,
            icon: /* @__PURE__ */ i(mr, { className: "size-3.5" }),
            onClick: () => s(l.name),
            children: l.title
          },
          l.name
        ))
      ] }) : null
    ] })
  ] });
}
function wa({
  active: e,
  icon: t,
  onClick: n,
  children: r
}) {
  return /* @__PURE__ */ f(
    "button",
    {
      type: "button",
      onClick: n,
      className: N(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
        e && "bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: t }),
        /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: r }),
        e ? /* @__PURE__ */ i(Pe, { className: "size-3.5 shrink-0" }) : null
      ]
    }
  );
}
function pf({ option: e, reason: t, onPick: n }) {
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
const gf = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Mt = "yyyy-MM-dd";
function bf(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ka(e) {
  if (!e) return;
  const t = Qa(e, Mt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Lr({ value: e, onChange: t }) {
  const [n, r] = x.useState(!1), a = typeof e == "string", [o, s] = bf(e), l = ka(o), c = ka(s), u = l ? { from: l, to: c } : void 0, d = a ? e : l && c ? `${de(l, "MMM d, yyyy")} – ${de(c, "MMM d, yyyy")}` : l ? de(l, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ f(Ne, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Ce, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", size: "sm", className: N("h-8 w-full justify-start gap-1.5 font-normal"), children: [
      /* @__PURE__ */ i(ja, { className: "size-3.5 text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: N("min-w-0 flex-1 truncate text-left", d === "Any time" && "text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ f(Se, { align: "start", className: "flex w-auto gap-2 p-2", children: [
      /* @__PURE__ */ f("div", { className: "flex w-32 flex-col gap-0.5 border-r pr-2", children: [
        gf.map((h) => /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "sm",
            className: N("justify-start font-normal", e === h && "bg-accent"),
            onClick: () => {
              t(h), r(!1);
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
              t(void 0), r(!1);
            },
            children: "Any time"
          }
        )
      ] }),
      /* @__PURE__ */ i(
        Ao,
        {
          mode: "range",
          selected: u,
          defaultMonth: l,
          onSelect: (h) => {
            h != null && h.from && h.to ? t([de(h.from, Mt), de(h.to, Mt)]) : h != null && h.from ? t([de(h.from, Mt), de(h.from, Mt)]) : t(void 0);
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
function vf(e, t) {
  const n = new Set(yf(t));
  return e.filter((r) => n.has(r.type));
}
function xf(e) {
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
function wf(e, t, n) {
  const r = new Set(n.map((l) => l.name)), a = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = a, s = 2;
  for (; r.has(o); ) o = `${a}_${s++}`;
  return o;
}
function kf(e, t, n) {
  const r = xf(e), a = { name: wf(t, e, n), type: r }, o = t.trim();
  return o && (a.label = o), r === "dateRange" ? a.default = "last 7 days" : r === "granularity" && (a.default = "day"), a;
}
const ei = x.createContext({});
function Nf({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(ei.Provider, { value: n, children: t });
}
function Cf() {
  return x.useContext(ei);
}
function Sf({ kind: e, value: t, onChange: n, className: r }) {
  const a = Sr(), o = (a == null ? void 0 : a.decls) ?? [], { createVariable: s } = Cf(), [l, c] = x.useState(!1), [u, d] = x.useState(!1), [h, p] = x.useState(""), b = x.useMemo(() => vf(o, e), [o, e]), y = b.find((S) => S.name === t), g = (S) => {
    n(S), c(!1), d(!1);
  }, v = () => {
    if (!s) return;
    const S = kf(e, h || "Variable", o);
    s(S), g(S.name), p("");
  };
  return /* @__PURE__ */ f(
    Ne,
    {
      open: l,
      onOpenChange: (S) => {
        c(S), S || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Ce, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", size: "sm", className: N("h-8 w-full justify-start gap-1.5", r), children: [
          /* @__PURE__ */ i(Pi, { className: "size-3.5 text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: N("min-w-0 flex-1 truncate text-left", !y && "text-muted-foreground"), children: y ? y.label ?? y.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ f(Se, { align: "start", className: "w-60 p-1", children: [
          b.length > 0 ? b.map((S) => /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              onClick: () => g(S.name),
              className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: S.label ?? S.name }),
                /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] text-muted-foreground", children: S.type }),
                S.name === t ? /* @__PURE__ */ i(Pe, { className: "size-3.5 shrink-0" }) : null
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
                /* @__PURE__ */ i(It, { className: "size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function ht({ kind: e, value: t, onChange: n, renderFixed: r }) {
  const a = Re(t), [o, s] = x.useState(a ? "var" : "fixed");
  x.useEffect(() => {
    a && s("var");
  }, [a]);
  const l = (c) => N(
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
            s("fixed"), Re(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: l(o === "var"), onClick: () => s("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      Sf,
      {
        kind: e,
        value: Re(t) ? t.var : void 0,
        onChange: (c) => n({ var: c })
      }
    ) : r(Re(t) ? void 0 : t, (c) => n(c))
  ] });
}
const _f = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function En(e) {
  return "member" in e && "operator" in e;
}
function Rf({
  cube: e,
  cubes: t,
  scope: n,
  value: r,
  onChange: a,
  disabled: o,
  className: s
}) {
  var K;
  const { meta: l } = Ge(), c = ((K = Sr()) == null ? void 0 : K.decls) ?? [], [u, d] = x.useState(null), [h, p] = x.useState(null), b = r ?? [], y = b.length === 1 && !En(b[0]) && "or" in b[0] && Array.isArray(b[0].or) && b[0].or.every(En) ? b[0] : void 0, g = y ? "any" : "all", v = [], S = [];
  y || b.forEach((j) => En(j) ? v.push(j) : S.push(j));
  const R = y ? y.or : v, k = S.length === 0 && (R.length >= 2 || g === "any"), _ = (j) => g === "any" ? j.length ? [{ or: j }] : [] : [...j, ...S], C = (j) => {
    const B = j.filter((A) => A.member.length > 0), D = _(B);
    a(D.length > 0 ? D : void 0);
  }, w = (j) => {
    const B = j === "any" ? R.length ? [{ or: R }] : [] : [...R];
    a(B.length > 0 ? B : void 0);
  }, L = (j, B) => C(R.map((D, A) => A === j ? { ...D, ...B } : D)), T = (j) => C(R.filter((B, D) => D !== j)), V = (j) => {
    const D = { ...h ?? { member: "", operator: "equals", values: [] }, ...j };
    D.member ? (p(null), d(R.length), C([...R, D])) : p(D);
  };
  return /* @__PURE__ */ f("div", { "data-slot": "filter-builder", className: N("flex flex-col gap-2", s), children: [
    R.length === 0 && !h ? /* @__PURE__ */ i("p", { className: "px-1 py-1 text-xs text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    k ? /* @__PURE__ */ f("div", { className: "flex items-center gap-2 px-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        Ft,
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
    R.map((j, B) => {
      const D = De(l, j.member);
      return u === B ? /* @__PURE__ */ i(
        Na,
        {
          leaf: j,
          member: D,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (A) => L(B, A),
          onDone: () => d(null),
          onRemove: () => T(B)
        },
        B
      ) : /* @__PURE__ */ i(
        Af,
        {
          text: Mf(j, D == null ? void 0 : D.label, c),
          disabled: o,
          onEdit: () => d(B),
          onRemove: () => T(B)
        },
        B
      );
    }),
    h ? /* @__PURE__ */ i(
      Na,
      {
        leaf: h,
        member: De(l, h.member),
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
          /* @__PURE__ */ i(It, { className: "size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Af({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: r
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
        onClick: r,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(pt, { className: "size-4" })
      }
    )
  ] });
}
function Na({
  leaf: e,
  member: t,
  cube: n,
  cubes: r,
  scope: a,
  disabled: o,
  onChange: s,
  onDone: l,
  onRemove: c
}) {
  const u = Kd(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], h = !er.has(d);
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-2.5 rounded-lg border border-ring/50 bg-muted/30 p-3", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ i("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-0.5", children: [
        l && e.member ? /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", className: "h-7 gap-1 px-2 text-xs", onClick: l, children: [
          /* @__PURE__ */ i(Pe, { className: "size-3.5" }),
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
            children: /* @__PURE__ */ i(pt, { className: "size-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Field" }),
      a ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ i(
          Zo,
          {
            well: _f,
            placed: [],
            scope: a,
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
                    mn(t.type),
                    /* @__PURE__ */ i("span", { className: "truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(tt, { className: "size-4 shrink-0 text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        Xo,
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
    /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ f(
        Ae,
        {
          value: d,
          onValueChange: (p) => s({
            operator: p,
            values: er.has(p) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Oe, { className: "w-full", children: /* @__PURE__ */ i(Me, {}) }),
            /* @__PURE__ */ i(Le, { children: u.map((p) => /* @__PURE__ */ i(pe, { value: p, children: Wo[p] }, p)) })
          ]
        }
      )
    ] }),
    h ? /* @__PURE__ */ f("label", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        Of,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (p) => s({ values: p })
        }
      )
    ] }) : null
  ] });
}
function Mf(e, t, n) {
  const r = t ?? e.member;
  if (!r) return "New filter";
  const a = Wo[e.operator] ?? e.operator;
  if (er.has(e.operator)) return `${r} ${a}`;
  const o = (e.values ?? []).map((s) => {
    if (Re(s)) {
      const l = n.find((c) => c.name === s.var);
      return `{${((l == null ? void 0 : l.label) ?? s.var).replace(/[{}]/g, "")}}`;
    }
    return String(s);
  });
  return o.length > 0 ? `${r} ${a} ${o.join(", ")}` : `${r} ${a} …`;
}
function Of({ values: e, memberType: t, onChange: n }) {
  const r = e ?? [], a = r.length === 1 && Re(r[0]);
  if (t === "time") {
    const l = a ? r[0] : Lf(r);
    return /* @__PURE__ */ i(
      ht,
      {
        kind: "dateRange",
        value: l,
        onChange: (c) => n(c === void 0 ? [] : Re(c) ? [c] : Df(c)),
        renderFixed: (c, u) => /* @__PURE__ */ i(Lr, { value: c, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", s = a ? r[0] : r.filter((l) => !Re(l));
  return /* @__PURE__ */ i(
    ht,
    {
      kind: o,
      value: s,
      onChange: (l) => n(l === void 0 ? [] : Re(l) ? [l] : l),
      renderFixed: (l, c) => /* @__PURE__ */ i(
        me,
        {
          value: (l ?? []).map(String).join(", "),
          onChange: (u) => c(Tf(u.target.value)),
          placeholder: "value, value…",
          className: "h-8"
        }
      )
    }
  );
}
function Lf(e) {
  const t = e.filter((n) => !Re(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Df(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Tf(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function zf({ spec: e, update: t, cube: n, scopeCubes: r, scope: a }) {
  const { query: o } = e, s = (o.filters ?? []).length, l = (c) => t({ ...e, query: { ...o, filters: c } });
  return /* @__PURE__ */ f(Ne, { children: [
    /* @__PURE__ */ f(
      Ce,
      {
        className: N(
          "flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
          s > 0 ? "text-foreground" : "text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(Ei, { className: "size-4" }),
          "Filter",
          s > 0 ? /* @__PURE__ */ i("span", { className: "ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground", children: s }) : null
        ]
      }
    ),
    /* @__PURE__ */ f(Se, { align: "end", className: "flex max-h-[72vh] w-96 flex-col gap-2 overflow-y-auto p-3", children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "text-sm font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(Ff, { spec: e, update: t, scopeCubes: r }),
      /* @__PURE__ */ i(Rf, { cube: n, cubes: r, scope: a, value: o.filters, onChange: l })
    ] })
  ] });
}
function Ff({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: r } = Ge(), a = qd(r, n);
  if (a.length === 0) return null;
  const o = new Set(e.query.segments ?? []), s = (l) => {
    const c = new Set(o);
    c.has(l) ? c.delete(l) : c.add(l);
    const u = [...c];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 border-b border-border pb-2", children: [
    /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5", children: a.map((l) => /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: () => s(l.name),
        title: l.description ?? l.name,
        className: N(
          "rounded-full border px-2.5 py-1 text-xs transition-colors",
          o.has(l.name) ? "border-ring bg-accent text-foreground" : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        ),
        children: l.label
      },
      l.name
    )) })
  ] });
}
function $f({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: r } = Ge(), a = x.useMemo(() => wn(r), [r]), o = a.filter((v) => v.type === "view"), s = a.filter((v) => v.type === "cube"), l = a.find((v) => v.name === e), [c, u] = x.useState(!1), [d, h] = x.useState(null), p = (v) => {
    if (v === e) {
      u(!1);
      return;
    }
    t ? h(v) : (n(v), u(!1));
  }, b = () => {
    d && n(d), h(null), u(!1);
  }, y = d ? ((g = a.find((v) => v.name === d)) == null ? void 0 : g.title) ?? d : "";
  return /* @__PURE__ */ f(
    Ne,
    {
      open: c,
      onOpenChange: (v) => {
        u(v), v || h(null);
      },
      children: [
        /* @__PURE__ */ f(
          Ce,
          {
            className: "flex h-8 max-w-[12rem] items-center gap-1.5 rounded-md border border-border bg-background/90 px-2.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(Ba, { className: "size-3.5 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: N("truncate", !l && "text-muted-foreground"), children: l ? l.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Se, { align: "start", className: "w-64 p-1", children: d ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-2 p-2", children: [
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
              Ca,
              {
                icon: /* @__PURE__ */ i(mr, { className: "size-3.5" }),
                label: v.title,
                active: v.name === e,
                onClick: () => p(v.name)
              },
              v.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "px-2 pb-0.5 pt-1.5 text-[10px] uppercase tracking-wide text-muted-foreground", children: "Tables" }),
          s.map((v) => /* @__PURE__ */ i(
            Ca,
            {
              icon: /* @__PURE__ */ i(Ha, { className: "size-3.5" }),
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
function Ca({
  icon: e,
  label: t,
  active: n,
  onClick: r
}) {
  return /* @__PURE__ */ f(
    "button",
    {
      type: "button",
      onClick: r,
      className: N(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
        n && "bg-accent/60"
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "text-muted-foreground", children: e }),
        /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: t }),
        n ? /* @__PURE__ */ i(Pe, { className: "size-3.5 shrink-0" }) : null
      ]
    }
  );
}
function Sa(e, t, n, r) {
  var o;
  const a = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...a, ...r } } } });
}
function _a({
  spec: e,
  update: t,
  axis: n,
  title: r,
  auto: a
}) {
  var l;
  const o = ((l = e.chart.axes) == null ? void 0 : l[n]) ?? {}, s = o.labelHide === !0;
  return /* @__PURE__ */ f(
    "div",
    {
      className: N(
        "flex w-full min-w-[8rem] items-center gap-1 rounded-md border border-border bg-background px-1.5 py-1 transition-opacity",
        s && "opacity-50"
      ),
      children: [
        r ? /* @__PURE__ */ i("span", { className: "shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: r }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: a ?? "Axis title",
            disabled: s,
            onChange: (c) => Sa(e, t, n, { label: c.target.value || void 0 }),
            title: `Axis title${a ? ` — defaults to “${a}”` : ""} (leave blank for the default)`,
            className: "h-6 min-w-0 flex-1 rounded border border-input bg-background px-1.5 text-xs outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          Ef,
          {
            hidden: s,
            what: "axis title",
            onClick: () => Sa(e, t, n, { labelHide: s ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Pf({
  spec: e,
  update: t
}) {
  var r;
  const n = ((r = e.chart.legend) == null ? void 0 : r.show) === !1;
  return /* @__PURE__ */ f("div", { className: N("flex flex-col gap-1 transition-opacity", n && "opacity-50"), children: [
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
          n ? /* @__PURE__ */ i(Wa, { className: "size-3.5" }) : /* @__PURE__ */ i(Ga, { className: "size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Ef({
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
      children: e ? /* @__PURE__ */ i(Wa, { className: "size-3.5" }) : /* @__PURE__ */ i(Ga, { className: "size-3.5" })
    }
  );
}
const ti = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "label",
    {
      ref: n,
      "data-slot": "label",
      className: N(
        "flex items-center gap-2 text-sm font-medium leading-none select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        e
      ),
      ...t
    }
  )
);
ti.displayName = "Label";
function le({
  label: e,
  hint: t,
  error: n,
  htmlFor: r,
  action: a,
  className: o,
  children: s
}) {
  return /* @__PURE__ */ f("div", { "data-slot": "field-row", className: N("flex flex-col gap-1.5 py-1.5", o), children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i(ti, { htmlFor: r, className: "text-muted-foreground", children: e }),
      a ? /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center", children: a }) : null
    ] }),
    s,
    n ? /* @__PURE__ */ i("p", { className: "text-xs text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "text-xs text-muted-foreground", children: t }) : null
  ] });
}
function nr({
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
      className: N(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        e ? "bg-primary" : "bg-input",
        o
      ),
      children: /* @__PURE__ */ i(
        "span",
        {
          className: N(
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
  onChange: r,
  disabled: a,
  className: o
}) {
  const s = x.useId();
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "switch-row",
      className: N("flex items-center justify-between gap-3 py-1.5", o),
      children: [
        /* @__PURE__ */ f(
          "label",
          {
            htmlFor: s,
            className: N(
              "flex min-w-0 flex-col gap-0.5",
              a ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "text-sm font-medium leading-none", children: e }),
              t ? /* @__PURE__ */ i("span", { className: "text-xs text-muted-foreground", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ i(nr, { id: s, checked: n, onChange: r, disabled: a })
      ]
    }
  );
}
function If({ spec: e, update: t }) {
  var p, b;
  const { chart: n } = e, r = n.family, a = n.familyOptions ?? {}, o = (y) => t({ ...e, chart: { ...n, ...y } }), s = (y) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...y } } }), l = ((b = (p = n.mapping) == null ? void 0 : p.series) == null ? void 0 : b.mode) === "pivot" ? "stacked" : "none", c = n.stackMode ?? (r === "area" ? l : ho[r].envelope.stackMode) ?? "none", d = /* @__PURE__ */ i(le, { label: "Stacked", children: /* @__PURE__ */ i(
    Ft,
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
    switch (r) {
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
              checked: typeof a.innerRadiusPct == "number" && a.innerRadiusPct > 0,
              onChange: (v) => s({ innerRadiusPct: v ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(le, { label: "Slice labels", children: /* @__PURE__ */ i(
            Ft,
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
              onChange: (v) => s({ showLabels: v })
            }
          ) }),
          /* @__PURE__ */ i(qf, { label: "Max slices", children: /* @__PURE__ */ i(
            me,
            {
              type: "number",
              min: 1,
              className: "h-8",
              value: a.maxSlices ?? "",
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
              checked: a.rowHeight === "compact",
              onChange: (v) => s({ rowHeight: v ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sortable columns",
              checked: a.sortable !== !1,
              onChange: (v) => s({ sortable: v })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sticky header",
              checked: a.stickyHeader !== !1,
              onChange: (v) => s({ stickyHeader: v })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Row numbers",
              checked: a.showRowNumbers === !0,
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
const jf = /* @__PURE__ */ new Set([
  "bar",
  "area",
  "pie",
  "table"
]);
function Vf(e) {
  return jf.has(e);
}
function qf({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1 py-1", children: [
    /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: e }),
    t
  ] });
}
const Kf = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], ni = {
  bar: Ua,
  line: Hi,
  area: Bi,
  pie: Ki,
  scatter: qi,
  kpi: Vi,
  table: ji,
  combo: Ii
};
function ri(e, t) {
  return (n) => {
    n !== e.chart.family && t(Hd(e, n));
  };
}
function Bf({ spec: e, update: t, empty: n }) {
  const r = e.chart.family, a = ri(e, t);
  return n ? /* @__PURE__ */ i("div", { className: "pointer-events-none absolute inset-0 grid place-items-center p-4", children: /* @__PURE__ */ f("div", { className: "pointer-events-auto w-full max-w-sm rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "pb-0.5 text-center text-sm font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "pb-3 text-center text-xs text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(ai, { family: r, onPick: a })
  ] }) }) : null;
}
function Hf({ spec: e, update: t }) {
  const n = e.chart.family, r = ri(e, t), a = ni[n];
  return /* @__PURE__ */ f(Ne, { children: [
    /* @__PURE__ */ i(Ce, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium shadow-sm transition-colors hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(a, { className: "size-3.5 text-muted-foreground" }),
          Yo[n],
          /* @__PURE__ */ i(tt, { className: "size-3 text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ f(Se, { align: "center", className: "flex max-h-[70vh] w-72 flex-col gap-2.5 overflow-y-auto p-3", children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(ai, { family: n, onPick: r })
      ] }),
      Vf(n) ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5 border-t border-border pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(If, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function ai({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "grid grid-cols-4 gap-1.5", children: Kf.map((n) => {
    const r = ni[n], a = n === e;
    return /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        onClick: () => t(n),
        "aria-pressed": a,
        className: N(
          "flex flex-col items-center gap-1 rounded-md border px-1 py-2 text-[10px] transition-colors",
          a ? "border-ring bg-accent text-foreground" : "border-input text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ i(r, { className: "size-4" }),
          Yo[n]
        ]
      },
      n
    );
  }) });
}
function Wf(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Gf(e, t, n, r, a) {
  var Tr, zr, Fr, $r, Pr, Er, Ir, jr, Vr, qr, Kr, Br, Hr, Wr;
  const { chart: o, query: s } = e, l = o.family, c = n.kinds.length === 1 ? n.kinds[0] : Uf(a), u = o.familyOptions ?? {}, d = Array.isArray(u.series) ? u.series : [], h = Array.isArray(u.columns) ? u.columns : [], p = wt(o), b = p[r], y = l === "combo" && n.id === "y", g = l === "table" && n.id === "columns", v = l === "bar" || l === "line" || l === "area", S = ((zr = (Tr = o.mapping) == null ? void 0 : Tr.series) == null ? void 0 : zr.mode) === "measures", R = v && n.id === "y", k = R && S, _ = y ? (Fr = d.find((E) => E.member === r)) == null ? void 0 : Fr.label : g ? ($r = h.find((E) => E.member === r)) == null ? void 0 : $r.label : k ? b == null ? void 0 : b.label : void 0, C = y ? (Pr = d.find((E) => E.member === r)) == null ? void 0 : Pr.colorToken : k ? b == null ? void 0 : b.colorToken : void 0, w = Ue(s), L = n.kinds.includes("time") && (w == null ? void 0 : w.dimension) === r, T = L ? w == null ? void 0 : w.granularity : void 0, V = L ? w == null ? void 0 : w.dateRange : void 0, K = y ? ((Er = d.find((E) => E.member === r)) == null ? void 0 : Er.render) ?? "line" : void 0, j = l === "line" && n.id === "y", B = l === "bar" && n.id === "y" && o.orientation !== "horizontal", D = ((jr = (Ir = o.mapping) == null ? void 0 : Ir.series) == null ? void 0 : jr.mode) === "pivot", A = ((qr = (Vr = o.mapping) == null ? void 0 : Vr.series) == null ? void 0 : qr.mode) === "pivot" ? o.mapping.series.meta : void 0, Y = (j || B) && (S || D) || y, G = Y ? (y ? (Kr = d.find((E) => E.member === r)) == null ? void 0 : Kr.axis : S ? b == null ? void 0 : b.axis : (Br = A == null ? void 0 : A[r]) == null ? void 0 : Br.axis) ?? "left" : void 0, I = (l === "line" || l === "area") && n.id === "y" && S || y && (K === "line" || K === "area"), z = y ? d.find((E) => E.member === r) : void 0, Q = I ? y ? z == null ? void 0 : z.curve : b == null ? void 0 : b.curve : void 0, ue = I ? y ? z == null ? void 0 : z.dots : b == null ? void 0 : b.dots : void 0, ce = (E) => {
    var Gr, Ur;
    if ((Gr = o.mapping) != null && Gr.series && o.mapping.series.mode !== "measures") return;
    const ie = ((Ur = o.mapping) != null && Ur.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], se = { ...p };
    E && Object.keys(E).length > 0 ? se[r] = E : delete se[r];
    const Ct = xe(o);
    Ct && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Ct }, series: Uo(ie, se) }
      }
    });
  }, H = (E) => {
    const ie = d.map((se) => se.member === r ? { ...se, ...E } : se);
    t({ ...e, chart: { ...o, familyOptions: { ...u, series: ie } } });
  }, M = (E) => {
    const ie = h.map((se) => se.member === r ? { ...se, ...E } : se);
    t({ ...e, chart: { ...o, familyOptions: { ...u, columns: ie } } });
  }, X = (E) => {
    y ? H({ label: E }) : g ? M({ label: E }) : k && ce({ ...b, label: E });
  }, fe = (E) => {
    y ? H({ colorToken: E ?? void 0 }) : k && ce({ ...b, colorToken: E ?? void 0 });
  }, Ie = (E) => {
    if (!w) return;
    const ie = { ...w };
    for (const se of Object.keys(E)) {
      const Ct = E[se];
      Ct === void 0 ? delete ie[se] : ie[se] = Ct;
    }
    t({ ...e, query: { ...s, timeDimensions: [ie] } });
  }, Ye = (E) => Ie({ granularity: E }), Qe = (E) => Ie({ dateRange: E }), Bt = (E) => H({ render: E }), Ht = (E) => {
    var ie, se;
    y ? H({ axis: E }) : k ? ce({ ...b, axis: E }) : ((se = (ie = o.mapping) == null ? void 0 : ie.series) == null ? void 0 : se.mode) === "pivot" && t(rr(e, l, r, E));
  }, Wt = (E) => {
    y ? H({ curve: E }) : k && ce({ ...b, curve: E });
  }, Gt = (E) => {
    y ? H({ dots: E }) : k && ce({ ...b, dots: E });
  }, O = () => t(Yd(e, l, n.id, r)), F = (n.id === "x" || n.id === "slices") && (c === "category" || c === "time"), $ = (Hr = o.mapping) == null ? void 0 : Hr.series, q = ($ && $.mode === "pivot" ? $.value : ft(o)[0]) ?? ((Wr = s.measures) == null ? void 0 : Wr[0]), J = F ? c === "time" ? [
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
    const E = Wf(s.order)[0];
    if (!E) return "none";
    const [ie, se] = E;
    return q && ie === q ? se === "desc" ? "value-desc" : "value-asc" : ie === r ? c === "time" ? se === "desc" ? "time-desc" : "time-asc" : se === "asc" ? "label-asc" : "label-desc" : "none";
  })(), te = (E) => {
    let ie;
    switch (E) {
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
        ie = [[r, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        ie = [[r, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: ie } });
  }, oe = typeof s.limit == "number" ? s.limit : void 0, Nt = (E) => t({ ...e, query: { ...s, limit: E && E > 0 ? E : void 0 } }), Cn = (l === "bar" || l === "line" || l === "area") && L, ui = Cn && u.comparePrevious === !0;
  return {
    kind: c,
    label: _,
    colorToken: C,
    granularity: T,
    dateRange: V,
    render: K,
    axis: G,
    curve: Q,
    dots: ue,
    canLineStyle: I,
    canAxis: Y,
    canRename: y || g || k,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: R && S || y,
    isTimeField: L,
    isComboY: y,
    isCategoryField: F,
    sortValue: ae,
    sortOptions: J,
    onSort: te,
    limit: oe,
    onLimit: Nt,
    canComparePrevious: Cn,
    comparePrevious: ui,
    comparePreviousReady: Cn && V !== void 0,
    onComparePrevious: (E) => t({ ...e, chart: { ...o, familyOptions: { ...u, comparePrevious: E || void 0 } } }),
    onRename: X,
    onRecolor: fe,
    onGranularity: Ye,
    onDateRange: Qe,
    onRender: Bt,
    onAxis: Ht,
    onCurve: Wt,
    onDots: Gt,
    onRemove: O
  };
}
function rr(e, t, n, r) {
  var s;
  const { chart: a } = e;
  if (t === "combo") {
    const l = a.familyOptions ?? {}, c = (Array.isArray(l.series) ? l.series : []).map(
      (u) => u.member === n ? { ...u, axis: r } : u
    );
    return { ...e, chart: { ...a, familyOptions: { ...l, series: c } } };
  }
  const o = (s = a.mapping) == null ? void 0 : s.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const l = { ...o.meta ?? {} };
    return l[n] = { ...l[n] ?? {}, axis: r }, { ...e, chart: { ...a, mapping: { ...a.mapping, series: { ...o, meta: l } } } };
  }
  return e;
}
function Uf(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ra(e, t, n, r) {
  var h;
  const { chart: a, query: o } = e, s = a.family, l = (p) => {
    if (r < 0 || r >= p.length || n === r) return p;
    const b = p.slice(), [y] = b.splice(n, 1);
    return b.splice(r, 0, y), b;
  };
  if (s === "combo" && t.id === "y") {
    const p = a.familyOptions ?? {}, b = l(Array.isArray(p.series) ? p.series : []), y = l(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: y },
      chart: { ...a, familyOptions: { ...p, series: b } }
    };
  }
  if (s === "table" && t.id === "columns") {
    const p = a.familyOptions ?? {}, b = l(Array.isArray(p.columns) ? p.columns : []);
    return { ...e, chart: { ...a, familyOptions: { ...p, columns: b } } };
  }
  const c = l(o.measures ?? []), u = (h = a.mapping) == null ? void 0 : h.series;
  let d = a.mapping;
  if (u && u.mode === "measures")
    d = { ...a.mapping, series: { ...u, members: c } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const p = l(u.values);
    d = { ...a.mapping, series: { ...u, value: p[0], values: p } };
  }
  return { ...e, query: { ...o, measures: c }, chart: { ...a, mapping: d } };
}
function Yf(e, t, n) {
  const r = wn(e), a = r.filter((k) => k.type === "view"), o = qt(t), s = Object.values(o).flat();
  let l;
  for (const k of s) {
    const _ = De(e, k);
    if (_) {
      l = _;
      break;
    }
  }
  const c = !l && n ? Dt(e, n) : void 0, u = l ? Dt(e, l.cube) : c, d = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, h = (l == null ? void 0 : l.connectedComponent) ?? (c == null ? void 0 : c.connectedComponent), p = t.query.measures ?? [], b = p.length ? At(p[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: a, measureSource: b, scopeComponent: h };
  const y = b ?? (l == null ? void 0 : l.cube) ?? (c == null ? void 0 : c.name), g = y ? Dt(e, y) : void 0, v = r.filter((k) => k.type === "cube" && k.connectedComponent !== void 0), R = (h === void 0 ? v : v.filter((k) => k.connectedComponent === h)).filter((k) => k.name !== y).sort((k, _) => k.title.localeCompare(_.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: R,
    views: a,
    measureSource: b,
    scopeComponent: h
  };
}
const Qf = Be.options;
function Jf({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: r,
  className: a
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: N("flex flex-wrap items-center gap-1.5", a),
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
            className: N(
              "relative flex size-6 items-center justify-center rounded-full border text-[9px] font-medium uppercase text-muted-foreground transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50",
              e === void 0 ? "border-ring ring-2 ring-ring/40" : "border-input hover:border-ring"
            ),
            children: "A"
          }
        ) : null,
        Qf.map((o) => {
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
              className: N(
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
const Xf = Xe.options, Zf = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function oi({
  value: e,
  onChange: t,
  options: n,
  placeholder: r = "Granularity…",
  disabled: a,
  id: o,
  className: s
}) {
  const l = n && n.length > 0 ? n : Xf;
  return /* @__PURE__ */ f(
    Ae,
    {
      value: e,
      onValueChange: (c) => t(c),
      disabled: a,
      children: [
        /* @__PURE__ */ i(Oe, { id: o, className: s, children: /* @__PURE__ */ i(Me, { placeholder: r }) }),
        /* @__PURE__ */ i(Le, { children: l.map((c) => /* @__PURE__ */ i(pe, { value: c, children: Zf[c] }, c)) })
      ]
    }
  );
}
const Aa = { bar: "Bar", line: "Line", area: "Area" }, eh = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function th({
  spec: e,
  update: t,
  well: n,
  member: r,
  option: a,
  resolvedColor: o,
  reorder: s,
  className: l
}) {
  const c = Gf(e, t, n, r, a), u = (a == null ? void 0 : a.label) ?? r, d = c.label || u, h = c.canColor && o !== void 0, p = c.canRename || h || c.isTimeField || c.isCategoryField || c.isComboY && !!c.render || c.canAxis || c.canLineStyle || !!s, b = (g) => {
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
    ) : a ? mn(a.type) : null,
    /* @__PURE__ */ i("span", { className: "min-w-0 flex-1 truncate", children: d })
  ] });
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "field-pill",
      className: N(
        "flex items-center gap-1 rounded-md border border-border bg-background py-1 pl-2 pr-1 text-sm shadow-sm",
        l
      ),
      children: [
        p ? /* @__PURE__ */ f(Ne, { children: [
          /* @__PURE__ */ i(Ce, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "flex min-w-0 flex-1 items-center gap-1.5 text-left outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
              title: `Edit ${d}`,
              children: y
            }
          ) }),
          /* @__PURE__ */ i(Se, { align: "start", className: "w-60 p-3", children: /* @__PURE__ */ f("div", { className: "flex flex-col gap-3", children: [
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
              /* @__PURE__ */ i(Jf, { value: c.colorToken, onChange: c.onRecolor })
            ] }) : null,
            c.isTimeField ? /* @__PURE__ */ f(re, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  ht,
                  {
                    kind: "dateRange",
                    value: c.dateRange,
                    onChange: c.onDateRange,
                    renderFixed: (g, v) => /* @__PURE__ */ i(Lr, { value: g, onChange: v })
                  }
                )
              ] }),
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  ht,
                  {
                    kind: "granularity",
                    value: c.granularity,
                    onChange: c.onGranularity,
                    renderFixed: (g, v) => /* @__PURE__ */ i(oi, { value: g, onChange: v, className: "h-8 w-full" })
                  }
                )
              ] }),
              c.canComparePrevious ? /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ f("label", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    nr,
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
              /* @__PURE__ */ i("div", { className: "flex gap-1", children: Object.keys(Aa).map((g) => /* @__PURE__ */ f(
                "button",
                {
                  type: "button",
                  onClick: () => c.onRender(g),
                  className: N(
                    "flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs",
                    c.render === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                  ),
                  children: [
                    Aa[g],
                    c.render === g ? /* @__PURE__ */ i(Pe, { className: "size-3" }) : null
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
                  className: N(
                    "flex flex-1 items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs capitalize",
                    c.axis === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                  ),
                  children: [
                    g,
                    c.axis === g ? /* @__PURE__ */ i(Pe, { className: "size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            c.canLineStyle ? /* @__PURE__ */ f(re, { children: [
              /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-1", children: eh.map(([g, v]) => /* @__PURE__ */ f(
                  "button",
                  {
                    type: "button",
                    onClick: () => c.onCurve(g),
                    className: N(
                      "flex items-center justify-center gap-1 rounded-md border px-2 py-1 text-xs",
                      (c.curve ?? "monotone") === g ? "border-ring bg-accent" : "border-input hover:bg-accent/50"
                    ),
                    children: [
                      v,
                      (c.curve ?? "monotone") === g ? /* @__PURE__ */ i(Pe, { className: "size-3" }) : null
                    ]
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ f("label", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(nr, { checked: c.dots === !0, onChange: c.onDots, "aria-label": "Show points" })
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
                    /* @__PURE__ */ i(sr, { className: "size-3.5" }),
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
                    /* @__PURE__ */ i(lr, { className: "size-3.5" }),
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
                  /* @__PURE__ */ i(Yr, { className: "size-3.5" }),
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
            children: /* @__PURE__ */ i(Yr, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function Ma({
  spec: e,
  update: t,
  well: n,
  placed: r,
  allPlaced: a,
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
  control: R
}) {
  const k = n.cardinality === "many" && !p, _ = k || r.length === 0, C = r.length, w = h === "vertical", L = y ?? n.label, T = /* @__PURE__ */ i(
    Zo,
    {
      well: n,
      placed: a,
      scope: l,
      blockReason: c,
      onSelect: u,
      side: v ?? (w ? "right" : "top"),
      align: S ?? "start",
      children: /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          className: N(
            "flex items-center justify-center gap-1 rounded-md border border-dashed border-input bg-background/60 px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-foreground",
            w && "w-full"
          ),
          children: [
            /* @__PURE__ */ i(It, { className: "size-3.5" }),
            r.length === 0 ? L : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "well-group",
      className: N("flex flex-col gap-1", !w && "min-w-0"),
      children: [
        /* @__PURE__ */ f("div", { className: "flex items-center gap-1.5 px-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "truncate", children: L }),
          d ? /* @__PURE__ */ i("span", { className: "truncate rounded-sm bg-muted px-1 py-px text-[9px] normal-case text-muted-foreground", children: d }) : null,
          n.optional && r.length === 0 ? /* @__PURE__ */ i("span", { className: "normal-case text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        R ? /* @__PURE__ */ i("div", { className: "pb-0.5", children: R }) : null,
        /* @__PURE__ */ f("div", { className: N("flex gap-1", w ? "flex-col" : "flex-row flex-wrap items-center"), children: [
          r.map((V, K) => /* @__PURE__ */ i(
            th,
            {
              spec: e,
              update: t,
              well: n,
              member: V,
              option: o(V),
              resolvedColor: s(V),
              className: w ? "w-full" : void 0,
              reorder: k && C > 1 && !b ? {
                canUp: K > 0,
                canDown: K < C - 1,
                onUp: () => t(Ra(e, n, K, K - 1)),
                onDown: () => t(Ra(e, n, K, K + 1))
              } : void 0
            },
            V
          )),
          _ ? T : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "px-0.5 text-[10px] leading-tight text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function In({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ f(Ne, { children: [
    /* @__PURE__ */ i(Ce, { asChild: !0, children: /* @__PURE__ */ f(
      "button",
      {
        type: "button",
        className: "flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium shadow-sm transition-colors hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "truncate", children: e }),
          /* @__PURE__ */ f("span", { className: "flex shrink-0 items-center gap-1 text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(tt, { className: "size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Se, { align: "start", className: "max-h-[72vh] w-64 overflow-y-auto p-3", children: n })
  ] });
}
function Dr(e, t) {
  const { chart: n } = e, r = n.familyOptions ?? {};
  return { chart: n, fo: r, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...o } } }) };
}
function nh({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Dr(e, t), a = Go(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], s = n.display ?? "number", l = n.gauge, c = (d) => {
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
    /* @__PURE__ */ i(Tt, { label: "Time field", children: /* @__PURE__ */ i(
      Xo,
      {
        cube: a,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (d) => c({ dimension: d }),
        placeholder: "All time",
        className: "h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Tt, { label: "Date range", children: /* @__PURE__ */ i(
      ht,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (d) => c({ dateRange: d }),
        renderFixed: (d, h) => /* @__PURE__ */ i(Lr, { value: d, onChange: h })
      }
    ) }) : null,
    /* @__PURE__ */ i(le, { label: "Display", children: /* @__PURE__ */ i(
      Ft,
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
    s === "gauge" ? /* @__PURE__ */ i(Tt, { label: "Gauge max", children: /* @__PURE__ */ i(
      me,
      {
        type: "number",
        className: "h-8",
        value: (l == null ? void 0 : l.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const h = parseFloat(d.target.value);
          r({ gauge: Number.isFinite(h) ? { ...l ?? {}, max: h } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function rh({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: r } = Dr(e, t), a = n.comparison, o = a !== void 0, s = x.useRef(void 0);
  a && (s.current = a);
  const l = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.goodDirection ?? (a == null ? void 0 : a.goodDirection) ?? "up";
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => r({
          comparison: d ? s.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ i(le, { label: "Against", children: /* @__PURE__ */ i(
        Ft,
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
      (a == null ? void 0 : a.mode) === "value" ? /* @__PURE__ */ i(Tt, { label: "Baseline value", children: /* @__PURE__ */ i(
        me,
        {
          type: "number",
          className: "h-8",
          value: (a == null ? void 0 : a.value) ?? "",
          onChange: (d) => {
            const h = parseFloat(d.target.value);
            r({ comparison: { ...a, value: Number.isFinite(h) ? h : void 0 } });
          }
        }
      ) }) : null,
      (a == null ? void 0 : a.mode) === "previousPeriod" && !(l != null && l.dateRange) ? /* @__PURE__ */ i("p", { className: "text-[10px] leading-tight text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
      /* @__PURE__ */ i(
        he,
        {
          label: "Show as %",
          checked: ((a == null ? void 0 : a.showAsPercent) ?? !0) !== !1,
          onChange: (d) => r({ comparison: { ...a, showAsPercent: d } })
        }
      ),
      /* @__PURE__ */ i(
        he,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the up/down colors).",
          checked: c !== "down",
          onChange: (d) => r({ goodDirection: d ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function ah({ spec: e, update: t }) {
  const { fo: n, setFO: r } = Dr(e, t), a = n.sparkline, o = a !== void 0, s = n.comparison !== void 0, l = n.goodDirection ?? "up", c = a == null ? void 0 : a.granularity;
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => r({ sparkline: u ? { granularity: c ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ i(Tt, { label: "Trend granularity", children: /* @__PURE__ */ i(
        ht,
        {
          kind: "granularity",
          value: c,
          onChange: (u) => r({ sparkline: { ...a, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(oi, { value: u, onChange: d, className: "h-8 w-full" })
        }
      ) }),
      s ? null : /* @__PURE__ */ i(
        he,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the trend color).",
          checked: l !== "down",
          onChange: (u) => r({ goodDirection: u ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Tt({ label: e, children: t }) {
  return /* @__PURE__ */ f("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ i("span", { className: "text-[11px] font-medium text-muted-foreground", children: e }),
    t
  ] });
}
const oh = {
  bar: { left: ["y"], bottom: ["x", "color"] },
  line: { left: ["y"], bottom: ["x", "color"] },
  area: { left: ["y"], bottom: ["x", "color"] },
  combo: { left: ["y"], bottom: ["x"] },
  pie: { left: ["size"], bottom: ["slices"] },
  scatter: { left: ["sy"], bottom: ["sx", "size", "color"] },
  kpi: { left: ["value"], bottom: [] },
  table: { left: ["columns"], bottom: [] }
}, ih = /* @__PURE__ */ new Set(["line", "combo"]);
function sh({
  spec: e,
  update: t,
  toolbar: n,
  children: r
}) {
  var Bt, Ht, Wt, Gt;
  const { meta: a } = Ge(), { locale: o } = We(), { chart: s } = e, l = s.family, c = Go(e), u = x.useMemo(() => gn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), d = x.useCallback(
    (O) => O && (o == null ? void 0 : o.unitSystem) === "imperial" && u[O] ? u[O].imperialUnit : O,
    [o == null ? void 0 : o.unitSystem, u]
  ), h = x.useMemo(() => Wd(l), [l]), p = x.useMemo(() => qt(e), [e]), b = x.useMemo(() => new Map(h.map((O) => [O.id, O])), [h]), [y, g] = x.useState(void 0), v = x.useMemo(() => Yf(a, e, y), [a, e, y]), S = x.useMemo(() => Object.values(p).flat(), [p]), R = x.useCallback(
    (O) => {
      g(O), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), k = x.useMemo(
    () => {
      var O;
      return v.viewLocked ? [v.viewLocked] : [(O = v.sourceCube) == null ? void 0 : O.name, ...v.relatedCubes.map((F) => F.name)].filter(
        Boolean
      );
    },
    [v]
  ), _ = x.useMemo(
    () => Object.values(p).every((O) => O.length === 0),
    [p]
  ), C = ih.has(l), w = x.useCallback(
    (O) => {
      var q, J, ae;
      if (l === "combo") {
        const te = s.familyOptions ?? {}, oe = (Array.isArray(te.series) ? te.series : []).find(
          (Nt) => Nt.member === O
        );
        return (oe == null ? void 0 : oe.axis) === "right" ? "right" : "left";
      }
      const F = (q = s.mapping) == null ? void 0 : q.series;
      return (F && (F.mode === "measures" || F.mode === "pivot") ? (ae = (J = F.meta) == null ? void 0 : J[O]) == null ? void 0 : ae.axis : void 0) === "right" ? "right" : "left";
    },
    [l, s.familyOptions, s.mapping]
  ), L = x.useMemo(() => {
    var ae, te;
    const O = p.y ?? [], F = (oe) => O.find((Nt) => w(Nt) === oe), $ = F("left"), q = C ? F("right") : void 0, J = (oe) => oe ? De(a, oe) : void 0;
    return {
      leftKey: $ ? St(J($)) : void 0,
      rightKey: q ? St(J(q)) : void 0,
      leftLabel: $ ? Oa(J($), d((ae = J($)) == null ? void 0 : ae.unit)) : void 0,
      rightLabel: q ? Oa(J(q), d((te = J(q)) == null ? void 0 : te.unit)) : void 0
    };
  }, [p, C, w, a, d]), T = x.useCallback(
    (O) => {
      const F = St(O), { leftKey: $, rightKey: q } = L;
      return $ === void 0 || F === $ ? "left" : q === void 0 || F === q ? "right" : "left";
    },
    [L]
  ), V = x.useCallback(
    (O, F) => {
      var $;
      if (F) {
        if (v.scopeComponent !== void 0 && F.connectedComponent !== v.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (F.memberType === "measure" && v.measureSource && F.cube !== v.measureSource)
          return `Measures come from one table (${(($ = v.sourceCube) == null ? void 0 : $.title) ?? v.measureSource}). Remove them to switch.`;
        if (O === "y" && F.memberType === "measure") {
          const { leftKey: q, rightKey: J, leftLabel: ae, rightLabel: te } = L, oe = St(F);
          if (C) {
            if (q !== void 0 && J !== void 0 && oe !== q && oe !== J)
              return `Both axes show ${ae} & ${te} — remove one to add a third unit.`;
          } else if (q !== void 0 && oe !== q)
            return `This axis shows ${ae}; ${F.label ?? "this field"} is ${tr(F)}`;
        }
      }
    },
    [v, L, C]
  ), K = C ? [L.leftLabel, L.rightLabel].filter(Boolean).join(" · ") || void 0 : L.leftLabel, j = x.useMemo(() => {
    var F;
    const O = {};
    if (l === "bar" || l === "line" || l === "area") {
      const $ = (F = s.mapping) == null ? void 0 : F.series;
      if ($ && $.mode === "measures") {
        const q = $.members.map((ae) => {
          var te, oe;
          return { key: ae, colorToken: (oe = (te = $.meta) == null ? void 0 : te[ae]) == null ? void 0 : oe.colorToken };
        }), J = Kn(q, s.colors);
        $.members.forEach((ae, te) => {
          O[ae] = J[te];
        });
      }
    } else if (l === "combo") {
      const $ = s.familyOptions ?? {}, q = Array.isArray($.series) ? $.series : [], J = q.map((te) => ({ key: te.member, colorToken: te.colorToken })), ae = Kn(J, s.colors);
      q.forEach((te, oe) => {
        O[te.member] = ae[oe];
      });
    }
    return O;
  }, [l, s.mapping, s.colors, s.familyOptions]), B = x.useCallback(
    (O, F, $) => {
      const q = De(a, F);
      if (V(O, q)) return;
      let J = va(e, l, O, F, $);
      C && O === "y" && (J = rr(J, l, F, T(q))), t(J);
    },
    [V, a, t, e, l, C, T]
  ), D = x.useCallback(
    (O, F) => {
      var J;
      if (!F) return;
      if (v.scopeComponent !== void 0 && F.connectedComponent !== v.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (F.memberType === "measure" && v.measureSource && F.cube !== v.measureSource)
        return `Measures come from one table (${((J = v.sourceCube) == null ? void 0 : J.title) ?? v.measureSource}). Remove them to switch.`;
      const $ = O === "left" ? L.leftKey : L.rightKey, q = O === "left" ? L.leftLabel : L.rightLabel;
      if ($ !== void 0 && St(F) !== $)
        return `This axis shows ${q}; ${F.label ?? "this field"} is ${tr(F)}`;
    },
    [v, L]
  ), A = x.useCallback(
    (O, F, $) => {
      const q = De(a, F);
      D(O, q) || t(rr(va(e, l, "y", F, $), l, F, O));
    },
    [D, a, t, e, l]
  ), Y = l === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : oh[l], G = Y.left.map((O) => b.get(O)).filter(Boolean), P = Y.bottom.map((O) => b.get(O)).filter(Boolean), U = (Bt = p.color) == null ? void 0 : Bt[0], I = ((Ht = p.y) == null ? void 0 : Ht.length) ?? 0, z = U && I > 1 ? `${I} measures × ${((Wt = De(a, U)) == null ? void 0 : Wt.label) ?? "this split"} — one series per measure per value.` : void 0, Q = l !== "kpi" && l !== "table", ue = p.y ?? [], ce = ue.find((O) => w(O) !== "right"), H = C ? ue.find((O) => w(O) === "right") : void 0, M = (O) => {
    var q, J, ae, te;
    if (!O) return;
    const F = (q = s.mapping) == null ? void 0 : q.series;
    return (F && F.mode === "measures" ? (ae = (J = F.meta) == null ? void 0 : J[O]) == null ? void 0 : ae.label : void 0) ?? ((te = De(a, O)) == null ? void 0 : te.label);
  }, X = (O) => {
    var $, q, J, ae;
    const F = (te, oe) => oe ? /* @__PURE__ */ i(_a, { spec: e, update: t, axis: te, title: "Title", auto: M(oe) }) : null;
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
    Ma,
    {
      spec: e,
      update: t,
      well: O,
      placed: p[O.id] ?? [],
      allPlaced: S,
      optionFor: ($) => De(a, $),
      colorFor: ($) => j[$],
      scope: v,
      blockReason: ($) => V(O.id, $),
      onAdd: ($, q) => B(O.id, $, q),
      badge: O.id === "y" ? K : void 0,
      orientation: F,
      note: O.id === "color" ? z : void 0,
      control: X(O.id)
    },
    O.id
  ), Ie = b.get("y"), Ye = (O) => {
    if (!Ie) return null;
    const F = O === "left" ? ce : H;
    return /* @__PURE__ */ i(
      Ma,
      {
        spec: e,
        update: t,
        well: Ie,
        label: O === "left" ? "Left axis" : "Right axis",
        placed: (p.y ?? []).filter(($) => w($) === O),
        allPlaced: S,
        optionFor: ($) => De(a, $),
        colorFor: ($) => j[$],
        scope: v,
        blockReason: ($) => D(O, $),
        onAdd: ($, q) => A(O, $, q),
        badge: O === "left" ? L.leftLabel : L.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: F ? /* @__PURE__ */ i(
          _a,
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
  }, Qe = () => {
    const O = b.get("value"), F = (p.value ?? []).length > 0, $ = s.familyOptions ?? {};
    return /* @__PURE__ */ f(re, { children: [
      /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
        O ? fe(O, "vertical") : null,
        F ? /* @__PURE__ */ i(
          In,
          {
            label: "Time, range & display",
            summary: $.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(nh, { spec: e, update: t })
          }
        ) : null
      ] }),
      F ? /* @__PURE__ */ f(re, { children: [
        /* @__PURE__ */ i(In, { label: "Comparison", summary: $.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(rh, { spec: e, update: t }) }),
        /* @__PURE__ */ i(In, { label: "Sparkline", summary: $.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(ah, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ f("div", { "data-slot": "chart-edit-overlay", className: "flex h-full w-full flex-col gap-2", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ i("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: n }),
      _ ? null : /* @__PURE__ */ i(Hf, { spec: e, update: t }),
      /* @__PURE__ */ f("div", { className: "flex flex-1 items-center justify-end gap-1.5", children: [
        /* @__PURE__ */ i(
          $f,
          {
            currentName: v.viewLocked ?? ((Gt = v.sourceCube) == null ? void 0 : Gt.name),
            hasFields: S.length > 0,
            onSelect: R
          }
        ),
        /* @__PURE__ */ i(zf, { spec: e, update: t, cube: c, scopeCubes: k, scope: v })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex min-h-0 flex-1 gap-2", children: [
      G.length > 0 ? /* @__PURE__ */ i("div", { className: N("flex shrink-0 flex-col gap-3 overflow-y-auto pr-1", l === "kpi" ? "w-56" : "w-40"), children: l === "kpi" ? Qe() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        G.flatMap(
          (O) => C && O.id === "y" ? [Ye("left"), Ye("right")] : [fe(O, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ f("div", { className: "flex min-w-0 flex-1 flex-col gap-2", children: [
        /* @__PURE__ */ f("div", { className: "relative min-h-0 flex-1", children: [
          r,
          /* @__PURE__ */ i(Bf, { spec: e, update: t, empty: _ })
        ] }),
        P.length > 0 ? /* @__PURE__ */ f("div", { className: "flex flex-wrap items-start gap-x-5 gap-y-2 pl-1", children: [
          P.map((O) => fe(O, "horizontal")),
          Q && !_ ? /* @__PURE__ */ i(Pf, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Oa(e, t) {
  const n = tr(e), r = t ?? (e == null ? void 0 : e.unit);
  return r && r !== n ? `${n} (${r})` : n;
}
function ii(e, t) {
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
function La(e) {
  const t = io.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function lh({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [r, a] = x.useState(e), [o, s] = x.useState(e);
  x.useEffect(() => {
    a(e), s(e);
  }, [e]);
  const l = ii((h) => t(h), n), c = x.useMemo(() => La(r), [r]), u = c.length === 0, d = x.useCallback(
    (h) => {
      a(h), La(h).length === 0 && (s(h), l(h));
    },
    [l]
  );
  return { draft: r, issues: c, valid: u, committed: o, update: d };
}
const ch = () => {
};
function uh({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: r = 250,
  fill: a = !1,
  className: o
}) {
  const { draft: s, issues: l, valid: c, committed: u, update: d } = lh({
    spec: e,
    onChange: t ?? ch,
    debounceMs: r
  }), h = u, p = (k) => {
    var _, C, w;
    return (((_ = k.measures) == null ? void 0 : _.length) ?? 0) > 0 || (((C = k.dimensions) == null ? void 0 : C.length) ?? 0) > 0 || (((w = k.timeDimensions) == null ? void 0 : w.some((L) => typeof L.granularity == "string")) ?? !1);
  }, b = (k) => {
    var _;
    return (((_ = k.measures) == null ? void 0 : _.length) ?? 0) > 0;
  }, y = s.chart.family !== "table", g = p(s.query) && p(h.query) && (!y || b(s.query) && b(h.query)), v = y && !b(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", S = g ? /* @__PURE__ */ i(_r, { query: h.query, chart: h.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "flex size-full items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "max-w-[16rem]", children: v }) }), R = n ? /* @__PURE__ */ f(W, { size: "sm", disabled: !c, onClick: () => n(u), children: [
    /* @__PURE__ */ i(Ya, { className: "size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "chart-editor",
      className: N("flex w-full flex-col gap-2", a ? "h-full" : "min-h-[28rem]", o),
      children: [
        c ? null : /* @__PURE__ */ f(gr, { variant: "destructive", children: [
          /* @__PURE__ */ i(Ia, { className: "size-4" }),
          /* @__PURE__ */ i(br, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(yr, { children: /* @__PURE__ */ f("ul", { className: "list-disc pl-4", children: [
            l.slice(0, 3).map((k, _) => /* @__PURE__ */ f("li", { children: [
              k.path ? /* @__PURE__ */ i("span", { className: "font-mono text-xs", children: k.path }) : null,
              " ",
              k.message
            ] }, _)),
            l.length > 3 ? /* @__PURE__ */ f("li", { children: [
              "…and ",
              l.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ i(sh, { spec: s, update: d, toolbar: R, children: S }) })
      ]
    }
  );
}
function mh({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: r,
  onUndo: a,
  onRedo: o,
  canUndo: s,
  canRedo: l,
  onDiscard: c,
  discardDisabled: u,
  onSave: d,
  saveDisabled: h,
  className: p
}) {
  const b = a || o;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "editor-toolbar",
      className: N(
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
            /* @__PURE__ */ i(Ua, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(ur, {}),
            " Text"
          ] }),
          /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(Wi, {}),
            " Input"
          ] }),
          r ? /* @__PURE__ */ f(W, { variant: "outline", size: "sm", onClick: r, children: [
            /* @__PURE__ */ i(Gi, {}),
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
                onClick: a,
                disabled: !s,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(Ui, {})
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
                children: /* @__PURE__ */ i(Yi, {})
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
                /* @__PURE__ */ i(Qi, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ f(W, { size: "sm", onClick: d, disabled: h, children: [
            /* @__PURE__ */ i(Ya, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const si = "lg", li = 12;
function dh(e, t) {
  const n = t[si];
  if (n && n.length > 0) return n;
  let r, a = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const s = o.reduce((l, c) => Math.max(l, c.x + c.w), 0);
    s > a && (r = o, a = s);
  }
  return r ?? e;
}
function fh(e, t) {
  const n = new Map(e.map((s) => [s.i, s])), r = new Map(t.map((s) => [s.i, s])), a = [], o = (s, l) => {
    const c = {
      i: s.i,
      x: s.x,
      y: s.y,
      w: s.w,
      h: s.h
    };
    (l == null ? void 0 : l.minW) !== void 0 && (c.minW = l.minW), (l == null ? void 0 : l.minH) !== void 0 && (c.minH = l.minH), (l == null ? void 0 : l.static) !== void 0 && (c.static = l.static), a.push(c);
  };
  for (const s of e) {
    const l = r.get(s.i);
    l && o(l, s);
  }
  for (const s of t)
    n.has(s.i) || o(s, void 0);
  return a;
}
const hh = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function ph(e, t, n, r = li) {
  const a = hh[n], o = Math.min(a.w, r), s = e.reduce((l, c) => Math.max(l, c.y + c.h), 0);
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
function ci(e, t, n = ((r) => (r = e.grid) == null ? void 0 : r.cols)() ?? li) {
  const a = ph(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, a]
  };
}
function gh(e, t, n) {
  const r = e.widgets.find((o) => o.id === t);
  if (!r) return e;
  const a = JSON.parse(JSON.stringify(r));
  return a.id = n, ci(e, a);
}
function bh(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function yh(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const vh = 12;
function xh(e) {
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
function wh(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function kh({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: r,
  onDuplicate: a,
  onDelete: o,
  onLayoutChange: s
}) {
  const [l, c] = _o(), u = e.grid ?? {}, d = u.cols ?? vh, h = u.rowHeight ?? 40, p = u.margin ?? [12, 12], b = u.containerPadding ?? [0, 0], { breakpoints: y, cols: g } = x.useMemo(
    () => xh(d),
    [d]
  ), v = x.useMemo(
    () => ({ [si]: wh(e.layout) }),
    [e.layout]
  ), S = x.useMemo(
    () => new Map(e.widgets.map((C) => [C.id, C])),
    [e.widgets]
  ), R = x.useRef(s);
  x.useEffect(() => {
    R.current = s;
  }, [s]);
  const k = x.useRef(null), _ = x.useCallback(
    (C, w) => {
      const L = dh(C, w);
      R.current(L.map((T) => ({ ...T })));
    },
    []
  );
  return /* @__PURE__ */ i(Cr, { spec: e, children: /* @__PURE__ */ i("div", { ref: l, className: "w-full [&_.react-resizable-handle]:z-20", children: c > 0 ? /* @__PURE__ */ i(
    Ja,
    {
      width: c,
      layouts: v,
      breakpoints: y,
      cols: g,
      rowHeight: h,
      margin: p,
      containerPadding: b,
      dragConfig: { enabled: !0, handle: `.${an}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: _,
      children: e.layout.map((C) => {
        const w = S.get(C.i);
        if (!w) return null;
        const L = w.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ f(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${w.title ?? w.type}`,
              "aria-pressed": L,
              onPointerDown: (T) => {
                k.current = { x: T.clientX, y: T.clientY };
              },
              onClick: (T) => {
                const V = k.current;
                V && Math.hypot(T.clientX - V.x, T.clientY - V.y) > 5 || n(w.id);
              },
              onKeyDown: (T) => {
                (T.key === "Enter" || T.key === " ") && (T.preventDefault(), n(w.id));
              },
              className: N(
                "group relative h-full w-full cursor-move rounded-xl ring-offset-2 ring-offset-background transition-shadow focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                L ? "ring-2 ring-primary" : "ring-0 focus-visible:ring-2 focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(Ko, { widget: w, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: N(an, "absolute inset-0 z-10 cursor-move rounded-xl") }),
                /* @__PURE__ */ f("div", { className: "absolute right-2 top-2 z-20 flex items-center gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${w.title ?? w.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), r(w.id);
                      },
                      className: N(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-accent hover:text-foreground [&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Ji, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${w.title ?? w.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), a(w.id);
                      },
                      className: N(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-accent hover:text-foreground [&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Xi, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${w.title ?? w.type}`,
                      onClick: (T) => {
                        T.stopPropagation(), o(w.id);
                      },
                      className: N(
                        "inline-flex size-7 items-center justify-center rounded-md",
                        "bg-card/90 text-muted-foreground shadow-sm backdrop-blur",
                        "hover:bg-destructive hover:text-destructive-foreground [&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(pt, {})
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
function Nh(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Ch({
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
  const a = Xa({
    extensions: [eo],
    editable: !0,
    content: Nh(e.doc),
    onUpdate: ({ editor: o }) => {
      const s = o.getJSON();
      n.current({ ...r.current, doc: s });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: N(
          Ro,
          "min-h-[8rem] rounded-md border border-input bg-background px-3 py-2",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        )
      }
    }
  });
  return a ? /* @__PURE__ */ i(le, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ f("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(Sh, { editor: a }),
    /* @__PURE__ */ i(Za, { editor: a })
  ] }) }) : /* @__PURE__ */ i("div", { className: "text-sm text-muted-foreground", children: "Loading editor…" });
}
function je({ active: e, onClick: t, title: n, children: r }) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (a) => a.preventDefault(),
      onClick: t,
      className: N(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "[&_svg]:size-4",
        e && "bg-muted text-foreground"
      ),
      children: r
    }
  );
}
function Sh({ editor: e }) {
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
            children: /* @__PURE__ */ i(Zi, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(es, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(ts, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          je,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(ns, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(rs, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "mx-1 h-5 w-px bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          je,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(as, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(os, {})
          }
        ),
        /* @__PURE__ */ i(
          je,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(is, {})
          }
        )
      ]
    }
  );
}
const _h = dr(
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
function Rh({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: N(_h({ variant: t }), e), ...n });
}
function Ah({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: r,
  id: a,
  className: o
}) {
  const { meta: s, isLoading: l } = Ge(), c = x.useMemo(() => wn(s), [s]), u = c.filter((p) => p.type === "cube"), d = c.filter((p) => p.type === "view"), h = c.find((p) => p.name === e);
  return /* @__PURE__ */ f(Ae, { value: e, onValueChange: t, disabled: r || l, children: [
    /* @__PURE__ */ i(Oe, { id: a, className: o, children: /* @__PURE__ */ i(Me, { placeholder: l ? "Loading…" : n, children: h ? /* @__PURE__ */ i(jn, { option: h }) : void 0 }) }),
    /* @__PURE__ */ f(Le, { children: [
      d.length > 0 ? /* @__PURE__ */ f(Yn, { children: [
        /* @__PURE__ */ i(Qn, { children: "Views" }),
        d.map((p) => /* @__PURE__ */ i(pe, { value: p.name, children: /* @__PURE__ */ i(jn, { option: p }) }, p.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ f(Yn, { children: [
        /* @__PURE__ */ i(Qn, { children: "Cubes" }),
        u.map((p) => /* @__PURE__ */ i(pe, { value: p.name, children: /* @__PURE__ */ i(jn, { option: p }) }, p.name))
      ] }) : null
    ] })
  ] });
}
function jn({ option: e }) {
  const t = e.type === "view" ? mr : Ha;
  return /* @__PURE__ */ f("span", { className: "flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ i(t, { className: "size-4 shrink-0 text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "truncate", children: e.title }),
    /* @__PURE__ */ i(Rh, { variant: "secondary", className: "ml-auto shrink-0 px-1.5 py-0 text-[10px]", children: e.type })
  ] });
}
const Mh = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Oh(e) {
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
function Lh({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: r } = e.control, a = (l) => n({ ...e, control: { ...e.control, control: l } }), o = (l) => n({ ...e, control: { ...e.control, variable: l } }), s = (l) => {
    l !== r.kind && a(Oh(l));
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ i(
      le,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ f(
          Ae,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(Oe, { children: /* @__PURE__ */ i(Me, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Le, { children: t.map((l) => /* @__PURE__ */ i(pe, { value: l.name, children: l.label ? `${l.label} (${l.name})` : l.name }, l.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(le, { label: "Control", children: /* @__PURE__ */ f(Ae, { value: r.kind, onValueChange: (l) => s(l), children: [
      /* @__PURE__ */ i(Oe, { children: /* @__PURE__ */ i(Me, {}) }),
      /* @__PURE__ */ i(Le, { children: Os.options.map((l) => /* @__PURE__ */ i(pe, { value: l, children: Mh[l] }, l)) })
    ] }) }),
    /* @__PURE__ */ i(Dh, { control: r, onChange: a, variables: t })
  ] });
}
function Dh({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(Th, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(Fh, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i($h, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(Ph, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(Eh, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(Ih, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Th({
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
          zh,
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
function zh({
  selected: e,
  onChange: t
}) {
  const [n, r] = x.useState(!1), a = new Set(e.map((l) => l.toLowerCase())), o = (l) => {
    const c = new Set(a);
    c.has(l) ? c.delete(l) : c.add(l), t(Xt.filter((u) => c.has(u.value)).map((u) => u.value));
  }, s = a.size === 0 ? "Default set" : a.size === Xt.length ? "All presets" : `${a.size} selected`;
  return /* @__PURE__ */ f(Ne, { open: n, onOpenChange: r, children: [
    /* @__PURE__ */ i(Ce, { asChild: !0, children: /* @__PURE__ */ f(W, { variant: "outline", className: "w-full justify-between font-normal", children: [
      /* @__PURE__ */ i("span", { className: "truncate", children: s }),
      /* @__PURE__ */ i(tt, { className: "size-4 shrink-0 opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Se, { className: "w-64 p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "max-h-72 overflow-y-auto", children: Xt.map((l) => {
      const c = a.has(l.value);
      return /* @__PURE__ */ f(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => o(l.value),
          className: "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm text-foreground hover:bg-accent",
          children: [
            /* @__PURE__ */ i(
              "span",
              {
                className: N(
                  "flex size-4 shrink-0 items-center justify-center rounded border",
                  c ? "border-primary bg-primary text-primary-foreground" : "border-input"
                ),
                children: c ? /* @__PURE__ */ i(Pe, { className: "size-3" }) : null
              }
            ),
            l.label
          ]
        },
        l.value
      );
    }) }) })
  ] });
}
function Fh({
  control: e,
  onChange: t,
  variables: n
}) {
  const r = new Set(e.options ?? []), a = (l) => {
    const c = new Set(r);
    c.has(l) ? c.delete(l) : c.add(l);
    const u = Xe.options.filter((d) => c.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((l) => l.type === "dateRange" || l.type === "time"), s = "__none__";
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(
      le,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ f(
          Ae,
          {
            value: e.rangeVariable ?? s,
            onValueChange: (l) => t({ ...e, rangeVariable: l === s ? void 0 : l }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(Oe, { children: /* @__PURE__ */ i(Me, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ f(Le, { children: [
                /* @__PURE__ */ i(pe, { value: s, children: "None" }),
                o.map((l) => /* @__PURE__ */ i(pe, { value: l.name, children: l.label ? `${l.label} (${l.name})` : l.name }, l.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(le, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1.5", children: Xe.options.map((l) => {
      const c = r.has(l);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": c,
          onClick: () => a(l),
          className: "rounded-md border px-2 py-1 text-xs capitalize transition-colors " + (c ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"),
          children: l
        },
        l
      );
    }) }) })
  ] });
}
function $h({
  control: e,
  onChange: t
}) {
  const n = (o, s) => {
    const l = e.options.map(
      (c, u) => u === o ? { value: s.value ?? String(c.value), label: s.label ?? c.label } : c
    );
    t({ ...e, options: l });
  }, r = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), a = (o) => t({ ...e, options: e.options.filter((s, l) => l !== o) });
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
        action: /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", onClick: r, children: [
          /* @__PURE__ */ i(It, {}),
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
              onClick: () => a(s),
              children: /* @__PURE__ */ i(pt, {})
            }
          )
        ] }, s)) })
      }
    )
  ] });
}
function Ph({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ f(re, { children: [
    /* @__PURE__ */ i(le, { label: "From", children: /* @__PURE__ */ f(
      Ae,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Oe, { children: /* @__PURE__ */ i(Me, {}) }),
          /* @__PURE__ */ f(Le, { children: [
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
          Ah,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function Eh({
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
function Ih({
  control: e,
  onChange: t
}) {
  const n = (r, a) => /* @__PURE__ */ i(le, { label: a, children: /* @__PURE__ */ i(
    me,
    {
      type: "number",
      value: e[r] ?? "",
      onChange: (o) => {
        const s = o.target.value;
        t({ ...e, [r]: s === "" ? void 0 : Number(s) });
      }
    }
  ) });
  return /* @__PURE__ */ f(re, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function jh(e) {
  return { schemaVersion: st, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Vh(e) {
  const t = {
    schemaVersion: st,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function qh(e, t) {
  const n = {
    ...e,
    query: t.query,
    chart: t.chart
  };
  return t.name !== void 0 && (n.title = t.name), n;
}
function Da({
  widget: e,
  variables: t,
  onChange: n,
  onVariablesChange: r,
  fill: a = !1
}) {
  const o = r ? (s) => r([...t, s]) : void 0;
  return /* @__PURE__ */ f("div", { "data-slot": "widget-edit-panel", className: N("flex flex-col gap-2", a && "h-full"), children: [
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
      /* @__PURE__ */ i(Cr, { spec: jh(t), children: /* @__PURE__ */ i(Nf, { createVariable: o, children: /* @__PURE__ */ i("div", { className: N(a && "min-h-0 flex-1"), children: /* @__PURE__ */ i(
        uh,
        {
          fill: a,
          spec: Vh(e),
          onChange: (s) => n(qh(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(Ch, { widget: e, onChange: n }) : /* @__PURE__ */ i(Lh, { widget: e, variables: t, onChange: n })
  ] });
}
function Kh({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !1,
  open: a = !0,
  onToggle: o,
  regionId: s,
  className: l
}) {
  const c = /* @__PURE__ */ f(re, { children: [
    r ? /* @__PURE__ */ i(
      dn,
      {
        className: N(
          "size-4 shrink-0 text-muted-foreground transition-transform",
          a && "rotate-90"
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
      className: N("flex items-center justify-between gap-2", l),
      children: [
        r ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": a,
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
function Bh({
  title: e,
  summary: t,
  actions: n,
  collapsible: r = !0,
  defaultOpen: a = !0,
  open: o,
  onOpenChange: s,
  className: l,
  children: c
}) {
  const u = o !== void 0, [d, h] = x.useState(a), p = r ? u ? o : d : !0, b = x.useId(), y = x.useCallback(() => {
    const g = !p;
    u || h(g), s == null || s(g);
  }, [p, u, s]);
  return /* @__PURE__ */ f(
    "section",
    {
      "data-slot": "section",
      "data-state": p ? "open" : "closed",
      className: N("border-b border-border py-2 last:border-b-0", l),
      children: [
        /* @__PURE__ */ i(
          Kh,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: r,
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
function Hh(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Wh(e) {
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
function Uh(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Yh(e, t) {
  switch (e) {
    case "chart":
      return Wh(t);
    case "text":
      return Gh(t);
    case "input":
      return Uh(t);
  }
}
function Qh(e) {
  return { name: e, type: "string" };
}
function Jh(e) {
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
const Xh = {
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
  const r = x.useRef(0), a = () => {
    if (n) return n();
    let c;
    do
      c = `var_${++r.current}`;
    while (e.some((u) => u.name === c));
    return c;
  }, o = (c, u) => {
    t(e.map((d, h) => h === c ? ep(d, u) : d));
  }, s = (c) => t(e.filter((u, d) => d !== c)), l = () => t([...e, Qh(a())]);
  return /* @__PURE__ */ i(
    Bh,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ f(W, { variant: "ghost", size: "sm", onClick: l, children: [
        /* @__PURE__ */ i(It, {}),
        " Add"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ f("p", { className: "py-1 text-xs text-muted-foreground", children: [
        "No variables. Variables bind input controls and `",
        "{var}",
        "` query tokens."
      ] }) : /* @__PURE__ */ i("div", { className: "flex flex-col gap-3", children: e.map((c, u) => /* @__PURE__ */ i(
        tp,
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
function ep(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Jh(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function tp({
  decl: e,
  duplicate: t,
  onChange: n,
  onRemove: r
}) {
  const a = e.name === "" ? "Name required" : t ? "Duplicate name" : void 0;
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "variable-row",
      className: "rounded-md border border-border bg-card/40 p-2.5",
      children: [
        /* @__PURE__ */ f("div", { className: "mb-1 flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ i(le, { label: "Name", error: a, className: "py-0", children: /* @__PURE__ */ i(
            me,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-invalid": a ? !0 : void 0,
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
              onClick: r,
              children: /* @__PURE__ */ i(pt, {})
            }
          )
        ] }),
        /* @__PURE__ */ i(le, { label: "Type", className: "py-1", children: /* @__PURE__ */ f(
          Ae,
          {
            value: e.type,
            onValueChange: (o) => n({ type: o }),
            children: [
              /* @__PURE__ */ i(Oe, { children: /* @__PURE__ */ i(Me, {}) }),
              /* @__PURE__ */ i(Le, { children: ao.options.map((o) => /* @__PURE__ */ i(pe, { value: o, children: Xh[o] }, o)) })
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
        /* @__PURE__ */ i(np, { decl: e, onChange: (o) => n({ default: o }) })
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
      he,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (a) => t(a)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(le, { label: "Default", className: "py-1", children: /* @__PURE__ */ i(
      me,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (a) => {
          const o = a.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, r = Array.isArray(e.default) ? e.default.join(", ") : rp(e.default);
  return /* @__PURE__ */ i(le, { label: "Default", hint: n, className: "py-1", children: /* @__PURE__ */ i(
    me,
    {
      value: r,
      placeholder: ap(e.type),
      onChange: (a) => {
        const o = a.target.value;
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
function Tp({
  spec: e,
  onChange: t,
  onSave: n,
  newId: r,
  debounceMs: a = 300,
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
  S.current === null && (S.current = r ?? Hh());
  const R = r ?? S.current, k = ii(
    (I) => t == null ? void 0 : t(I),
    a
  ), _ = x.useCallback(
    (I) => {
      p((z) => {
        const Q = I(z);
        return k(Q), Q;
      });
    },
    [k]
  ), C = x.useCallback(
    (I) => {
      const z = Yh(I, R());
      _((Q) => ci(Q, z)), y(z.id), v({ kind: "widget", id: z.id });
    },
    [_, R]
  ), w = x.useCallback((I) => y(I), []), L = x.useCallback((I) => {
    y(I), v({ kind: "widget", id: I });
  }, []), T = x.useCallback(
    (I) => {
      _((z) => bh(z, I)), y((z) => z === I ? null : z), v((z) => (z == null ? void 0 : z.kind) === "widget" && z.id === I ? null : z);
    },
    [_]
  ), V = x.useCallback(
    (I) => {
      const z = R();
      _((Q) => gh(Q, I, z)), y(z);
    },
    [_, R]
  ), K = x.useCallback(
    (I) => _((z) => yh(z, I)),
    [_]
  ), j = x.useCallback(
    (I) => _((z) => ({ ...z, layout: fh(z.layout, I) })),
    [_]
  ), B = x.useCallback(
    (I) => _((z) => ({ ...z, name: I || void 0 })),
    [_]
  ), D = x.useCallback(
    (I) => _((z) => ({ ...z, variables: I })),
    [_]
  ), A = x.useMemo(
    () => so.safeParse(h),
    [h]
  ), Y = x.useCallback(() => {
    A.success && (n == null || n(A.data));
  }, [A, n]), G = (g == null ? void 0 : g.kind) === "widget" ? h.widgets.find((I) => I.id === g.id) ?? null : null;
  x.useEffect(() => {
    (g == null ? void 0 : g.kind) === "widget" && !h.widgets.some((I) => I.id === g.id) && v(null);
  }, [g, h.widgets]);
  const P = x.useCallback(() => v(null), []), U = (g == null ? void 0 : g.kind) === "variables" ? "Dashboard variables" : G ? G.title ?? `${op(G.type)} widget` : "";
  return /* @__PURE__ */ f("div", { "data-slot": "dashboard-editor", className: N("flex h-full flex-col gap-2", d), children: [
    /* @__PURE__ */ i(
      mh,
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
      kh,
      {
        spec: h,
        selectedId: b,
        onSelect: w,
        onEdit: L,
        onDuplicate: V,
        onDelete: T,
        onLayoutChange: j
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
                /* @__PURE__ */ i(cr, {}),
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
                onClick: () => T(G.id),
                children: [
                  /* @__PURE__ */ i(pt, {}),
                  " Delete"
                ]
              }
            ) : null
          ] }),
          /* @__PURE__ */ i("div", { className: "min-h-0 flex-1 overflow-hidden p-4", children: g.kind === "variables" ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(Zh, { variables: h.variables, onChange: D }) }) : (G == null ? void 0 : G.type) === "chart" ? /* @__PURE__ */ i(
            Da,
            {
              fill: !0,
              widget: G,
              variables: h.variables,
              onChange: K,
              onVariablesChange: D
            }
          ) : G ? /* @__PURE__ */ i("div", { className: "mx-auto h-full max-w-3xl overflow-y-auto", children: /* @__PURE__ */ i(
            Da,
            {
              widget: G,
              variables: h.variables,
              onChange: K,
              onVariablesChange: D
            }
          ) }) : null })
        ]
      }
    ) : null
  ] });
}
function op(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
export {
  Ru as AreaChartFamily,
  uu as AreaFamilyOptionsSchema,
  Rs as AxesOptionsSchema,
  Ln as AxisOptionsSchema,
  Su as BarChartFamily,
  lu as BarFamilyOptionsSchema,
  si as CANONICAL_BREAKPOINT,
  Be as ChartColorTokenSchema,
  sh as ChartEditOverlay,
  uh as ChartEditor,
  ks as ChartFamilySchema,
  ro as ChartOptionsSchema,
  nm as ChartRenderer,
  io as ChartSpecSchema,
  Dp as ChartView,
  Ds as ChartWidgetSchema,
  As as ColorAssignmentSchema,
  Xu as ComboChartFamily,
  yu as ComboFamilyOptionsSchema,
  bu as ComboSeriesOptSchema,
  pu as CondFormatRuleSchema,
  _r as CubeChart,
  fm as CubeChartSpec,
  no as CubeQuerySchema,
  Nr as CubeVizContext,
  Mp as CubeVizProvider,
  ho as DEFAULTS,
  ge as DEFAULT_COLOR_RAMP,
  li as DEFAULT_COLS,
  Hn as DEFAULT_UNIT_CONVERSIONS,
  an as DRAG_HANDLE_CLASS,
  Lp as Dashboard,
  Tp as DashboardEditor,
  Cr as DashboardProvider,
  so as DashboardSpecSchema,
  Vn as DateRangeSchema,
  ea as EM_DASH,
  kh as EditorCanvas,
  mh as EditorToolbar,
  Rf as FilterBuilder,
  ys as FilterOperatorSchema,
  Ns as FormatKindSchema,
  fn as FormatOptionsSchema,
  ll as GRANULARITY_PATTERN,
  Xe as GranularitySchema,
  Ps as GridConfigSchema,
  Os as InputControlKindSchema,
  Ls as InputControlSchema,
  Lh as InputWidgetEditor,
  zs as InputWidgetSchema,
  Fm as InputWidgetView,
  zu as KpiFamily,
  fu as KpiFamilyOptionsSchema,
  $s as LayoutItemSchema,
  vs as LeafFilterSchema,
  Ss as LegendOptionsSchema,
  _u as LineChartFamily,
  cu as LineFamilyOptionsSchema,
  ee as MemberSchema,
  Qr as OrderDirSchema,
  ws as OrderSpecSchema,
  Au as PieChartFamily,
  mu as PieFamilyOptionsSchema,
  qn as QueryFilterSchema,
  jt as ReferenceLineOptSchema,
  Ko as RenderWidget,
  st as SCHEMA_VERSION,
  bs as ScalarSchema,
  Ou as ScatterChartFamily,
  du as ScatterFamilyOptionsSchema,
  Cs as SeriesMappingSchema,
  Jr as SeriesMetaSchema,
  lo as SpecSchema,
  hu as TableColumnOptSchema,
  Ku as TableFamily,
  gu as TableFamilyOptionsSchema,
  Ch as TextWidgetEditor,
  Ts as TextWidgetSchema,
  pm as TextWidgetView,
  xs as TimeDimensionSchema,
  Ms as TipTapDocSchema,
  _s as TooltipOptionsSchema,
  tn as VarRefSchema,
  Es as VariableDeclSchema,
  ao as VariableTypeSchema,
  to as VariableValueSchema,
  Zh as VariablesPanel,
  To as WidgetChrome,
  Da as WidgetEditPanel,
  Fs as WidgetSpecSchema,
  ci as appendWidget,
  Zr as assignColors,
  eu as axisKey,
  Co as builtinCharts,
  Vs as createCubeClient,
  Hh as createIdFactory,
  fo as createUnitsFormatter,
  sl as createVariableStore,
  ml as datePattern,
  Wn as deepMerge,
  Jh as defaultForType,
  hr as defaultFormatter,
  Ap as familyOptionsSchema,
  qs as fetchMeta,
  _p as formatCategory,
  Ot as formatDateValue,
  mt as isEmptyValue,
  Re as isVarRef,
  js as loadSpec,
  co as looksLikeIsoDate,
  mo as makeChartFormat,
  Sp as makeDateFormatter,
  Rp as makeFormatter,
  fh as mergeLayout,
  gn as mergeUnitConversions,
  Wh as newChartWidget,
  Uh as newInputWidget,
  Gh as newTextWidget,
  Qh as newVariable,
  Yh as newWidget,
  Qs as normalize,
  dh as pickCanonicalLayout,
  ph as placeNewItem,
  nu as quantityLabel,
  bh as removeWidget,
  yh as replaceWidget,
  am as resolveChart,
  xu as resolveOptions,
  il as resolveQuery,
  Kn as resolveSeriesColors,
  nl as resolveValue,
  Np as safeLoadSpec,
  ul as toDate,
  Hs as toResultAnnotation,
  lh as useChartEditorState,
  _o as useContainerWidth,
  Ge as useCubeMeta,
  im as useCubeQuery,
  We as useCubeVizContext,
  So as useDashboard,
  ii as useDebouncedCallback,
  Op as useFormatter,
  $n as useNormalizedSeries,
  Sr as useOptionalDashboard,
  Cp as validateSpec
};
//# sourceMappingURL=index.js.map
