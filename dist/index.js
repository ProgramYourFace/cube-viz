import { jsx as i, jsxs as v, Fragment as oe } from "react/jsx-runtime";
import * as ar from "recharts";
import { BarChart as mi, CartesianGrid as Pt, YAxis as Ie, XAxis as mt, Bar as Ta, LabelList as za, ReferenceLine as It, LineChart as di, Line as Fa, AreaChart as $a, Area as or, PieChart as vi, Pie as fi, Cell as Ea, Label as hi, ScatterChart as pi, ZAxis as gi, Scatter as bi, RadialBarChart as yi, PolarAngleAxis as xi, RadialBar as wi, ResponsiveContainer as ki, ComposedChart as Ni } from "recharts";
import * as x from "react";
import { createContext as Pa, useContext as ir, useMemo as ee, useState as dt, useCallback as Be, useEffect as jt, useRef as st, createElement as Ci, useSyncExternalStore as Si, useId as _i } from "react";
import { clsx as Ri } from "clsx";
import { extendTailwindMerge as Ai } from "tailwind-merge";
import { z as m } from "zod";
import { Minus as Mi, ArrowUp as cr, ArrowDown as sr, ChevronsUpDown as Oi, AlertCircle as Ia, ChevronLeft as lr, ChevronRight as dn, ChevronDown as rt, Check as je, ChevronUp as Li, CalendarIcon as ja, MoreVertical as Di, RefreshCw as Ti, Image as zi, Sheet as Fi, Type as ur, Hash as Va, Calendar as qa, Search as $i, Table2 as Ka, Database as Ba, Layers as mr, Variable as Ei, Plus as Vt, Trash2 as gt, ListFilter as Pi, Box as Ha, EyeOff as Wa, Eye as Ua, BarChart4 as Ii, Table as ji, Gauge as Vi, ScatterChart as qi, PieChart as Ki, AreaChart as Bi, LineChart as Hi, BarChart3 as Ga, X as Yr, Save as Ya, SlidersHorizontal as Wi, Braces as Ui, Undo2 as Gi, Redo2 as Yi, RotateCcw as Qi, Pencil as Ji, Copy as Xi, Bold as Zi, Italic as ec, Strikethrough as tc, Heading1 as nc, Heading2 as rc, List as ac, ListOrdered as oc, Quote as ic } from "lucide-react";
import * as Zt from "@radix-ui/react-popover";
import { cva as dr } from "class-variance-authority";
import * as be from "@radix-ui/react-select";
import cc from "@cubejs-client/core";
import { format as fe, isValid as At, parseISO as en, differenceInCalendarDays as sc, subDays as Ae, startOfMonth as Sn, subMonths as _n, startOfQuarter as Rn, subQuarters as An, startOfYear as Mn, subYears as On, subWeeks as lc, startOfWeek as uc, endOfWeek as mc, endOfMonth as dc, endOfQuarter as vc, endOfYear as fc, parse as Qa } from "date-fns";
import { DayPicker as hc, useDayPicker as pc } from "react-day-picker";
import { ResponsiveGridLayout as Ja } from "react-grid-layout";
import { useEditor as Xa, EditorContent as Za } from "@tiptap/react";
import eo from "@tiptap/starter-kit";
const lt = 1, tn = m.object({ var: m.string().min(1) }).strict();
function Me(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const nn = (e) => m.union([e, tn]), gc = m.union([m.string(), m.number(), m.boolean()]), et = m.enum([
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
]), ne = m.string().min(1), bc = m.enum([
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
]), yc = m.object({
  member: ne,
  operator: bc,
  values: m.array(m.union([gc, tn])).optional()
}).strict(), qn = m.lazy(
  () => m.union([
    yc,
    m.object({ and: m.array(qn) }).strict(),
    m.object({ or: m.array(qn) }).strict()
  ])
), xc = m.object({
  dimension: ne,
  granularity: nn(et).optional(),
  dateRange: nn(Vn).optional(),
  compareDateRange: m.array(Vn).optional()
}).strict(), Qr = m.enum(["asc", "desc"]), wc = m.union([
  m.record(ne, Qr),
  m.array(m.tuple([ne, Qr]))
]), no = m.object({
  measures: m.array(ne).optional(),
  dimensions: m.array(ne).optional(),
  timeDimensions: m.array(xc).optional(),
  filters: m.array(qn).optional(),
  segments: m.array(ne).optional(),
  order: wc.optional(),
  limit: nn(m.number()).optional(),
  offset: nn(m.number()).optional(),
  total: m.boolean().optional(),
  timezone: m.string().optional()
}).strict(), kc = m.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
]), We = m.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Nc = m.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), vn = m.object({
  kind: Nc.optional(),
  decimals: m.number().optional(),
  abbreviate: m.boolean().optional(),
  prefix: m.string().optional(),
  suffix: m.string().optional(),
  unitSystem: m.enum(["metric", "imperial"]).optional(),
  dateFormat: m.string().optional()
}).strict(), Jr = m.object({
  label: m.string().optional(),
  colorToken: We.optional(),
  stackId: m.string().optional(),
  axis: m.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: m.boolean().optional(),
  format: vn.optional()
}).strict(), Cc = m.object({
  category: m.object({ member: ne }).strict(),
  series: m.union([
    m.object({
      mode: m.literal("measures"),
      members: m.array(ne),
      meta: m.record(ne, Jr).optional()
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
      meta: m.record(ne, Jr).optional()
    }).strict()
  ])
}).strict(), Sc = m.object({
  show: m.boolean().optional(),
  position: m.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), _c = m.object({
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
  tickFormat: vn.optional()
}).strict(), Rc = m.object({
  x: Ln.optional(),
  y: Ln.optional(),
  y2: Ln.optional()
}).strict(), Ac = m.object({
  byKey: m.record(m.string(), We).optional(),
  ramp: m.array(We).optional()
}).strict(), ro = m.object({
  family: kc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Cc.optional(),
  orientation: m.enum(["vertical", "horizontal"]).optional(),
  stackMode: m.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: Sc.optional(),
  tooltip: _c.optional(),
  axes: Rc.optional(),
  colors: Ac.optional(),
  format: vn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: m.record(m.string(), m.unknown()).optional()
}).strict(), Mc = m.object({ type: m.string(), content: m.array(m.unknown()).optional() }).passthrough(), Oc = m.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Lc = m.object({
  variable: m.string().min(1),
  control: m.discriminatedUnion("kind", [
    m.object({
      kind: m.literal("dateRange"),
      presets: m.array(m.string()).optional(),
      allowFuture: m.boolean().optional()
    }).strict(),
    m.object({
      kind: m.literal("granularity"),
      options: m.array(et).optional(),
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
}).strict(), vr = {
  id: m.string().min(1),
  title: m.string().optional()
}, Dc = m.object({ ...vr, type: m.literal("chart"), query: no, chart: ro }).strict(), Tc = m.object({ ...vr, type: m.literal("text"), doc: Mc }).strict(), zc = m.object({ ...vr, type: m.literal("input"), control: Lc }).strict(), Fc = m.discriminatedUnion("type", [
  Dc,
  Tc,
  zc
]), $c = m.object({
  i: m.string(),
  x: m.number(),
  y: m.number(),
  w: m.number(),
  h: m.number(),
  minW: m.number().optional(),
  minH: m.number().optional(),
  static: m.boolean().optional()
}).strict(), Ec = m.object({
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
]), Pc = m.object({
  name: m.string().min(1),
  type: ao,
  label: m.string().optional(),
  array: m.boolean().optional(),
  default: to.optional()
}).strict(), oo = {
  schemaVersion: m.literal(lt),
  id: m.string().min(1),
  name: m.string().optional(),
  description: m.string().optional(),
  createdAt: m.string().optional(),
  updatedAt: m.string().optional()
}, io = m.object({ ...oo, kind: m.literal("chart"), query: no, chart: ro }).strict(), co = m.object({
  ...oo,
  kind: m.literal("dashboard"),
  variables: m.array(Pc),
  widgets: m.array(Fc),
  layout: m.array($c),
  grid: Ec.optional()
}).strict(), so = m.discriminatedUnion("kind", [io, co]), Ic = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function jc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > lt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${lt} — update the library`
    );
  for (; n < lt; ) {
    const a = Ic[n];
    if (!a) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = a(t), n += 1, t.schemaVersion = n;
  }
  return so.parse(t);
}
function Sh(e) {
  try {
    return { ok: !0, spec: jc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function _h(e) {
  return so.parse(e);
}
function Vc(e) {
  return cc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function qc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ge = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Kc = /* @__PURE__ */ new Set(["bar", "line", "area", "pie"]), Dn = 8;
function Kn(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : ge, a = (t == null ? void 0 : t.byKey) ?? {}, r = (u, d) => a[u] ?? d, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const d = r(u.key, u.colorToken);
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
  return e.map((u) => r(u.key, u.colorToken) ?? s());
}
function Zr(e, t) {
  const n = Kn(e, t);
  return e.forEach((a, r) => {
    a.colorToken = n[r];
  }), e;
}
function Bc(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function Gt(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Bc(e[n]);
  return t;
}
function Hc(e) {
  return {
    measures: Gt(e.measures ?? {}),
    dimensions: Gt(e.dimensions ?? {}),
    segments: Gt(e.segments ?? {}),
    timeDimensions: Gt(e.timeDimensions ?? {})
  };
}
function ut(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function fn(e, t, n) {
  const a = e == null ? void 0 : e.meta, r = {};
  (a == null ? void 0 : a.unit) !== void 0 && (r.unit = a.unit), (a == null ? void 0 : a.quantity) !== void 0 && (r.quantity = a.quantity), (a == null ? void 0 : a.convert) !== void 0 && (r.convert = a.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && r.unit === void 0 && (r.unit = "%");
  let c = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!c || c.kind === void 0 || c.kind === "auto") && (c = { ...c, kind: "currency" }), c && (r.format = c), t != null && t.axis && (r.axis = t.axis), t != null && t.stackId && (r.stackId = t.stackId), t != null && t.curve && (r.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (r.dots = t.dots), r;
}
function Wc(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Uc(e, t) {
  var a, r;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, c] of Object.entries(e.measures)) {
    const s = (a = c.meta) == null ? void 0 : a.unit;
    if (!s || ((r = c.meta) == null ? void 0 : r.convert) === !1) continue;
    const l = t.conversions[s];
    l && (n.set(o, { to: l.toImperial, unit: l.imperialUnit }), e.measures[o] = { ...c, meta: { ...c.meta, unit: l.imperialUnit } });
  }
  return n;
}
function Gc(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const a = { ...n };
    for (const [r, o] of t) {
      const c = hn(a[r]);
      c !== null && (a[r] = o.to(c));
    }
    return a;
  });
}
function Yc(e, t) {
  var n;
  if (t.size !== 0)
    for (const a of e) {
      const r = (n = a.meta) != null && n.measure ? t.get(a.meta.measure) : void 0;
      r && (a.data = a.data.map((o) => o === null ? null : r.to(o)));
    }
}
function Qc(e, t, n, a) {
  const r = Hc(e.annotation()), o = Uc(r, a), c = Gc(e.tablePivot(), o), s = t.mapping;
  if (!s) {
    const d = n.measures ?? [];
    if (Kc.has(t.family) && d.length > 0) {
      const f = c[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: d.map((b) => hn(f[b])),
          meta: { ...fn(ut(r, d[0]), void 0, t.format), measure: d[0] }
        }
      ];
      return Zr(h, t.colors), { categories: d.map(
        (b) => {
          var g, y;
          return ((g = ut(r, b)) == null ? void 0 : g.shortTitle) ?? ((y = ut(r, b)) == null ? void 0 : y.title) ?? b;
        }
      ), series: h, raw: { rows: c, annotation: r, query: n }, empty: c.length === 0 };
    }
    return {
      categories: [],
      series: [],
      raw: { rows: c, annotation: r, query: n },
      empty: c.length === 0
    };
  }
  const l = s.series.mode === "measures" ? Xc(e, s.series, t, r) : Zc(e, s.category.member, s.series, t, r), u = Jc(e, s);
  return Yc(l, o), Zr(l, t.colors), {
    categories: u,
    series: l,
    raw: { rows: c, annotation: r, query: n },
    empty: c.length === 0
  };
}
function Jc(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((r) => r.x);
}
function Xc(e, t, n, a) {
  const { members: r, meta: o } = t, c = e.chartPivot();
  return r.map((s) => {
    const l = ut(a, s), u = o == null ? void 0 : o[s], d = c.map((f) => hn(f[s]));
    return {
      key: s,
      label: Wc(l, u, s),
      data: d,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...fn(l, u, n.format), measure: s }
    };
  });
}
function Zc(e, t, n, a, r) {
  const { value: o, values: c, pivot: s } = n, l = c && c.length > 0 ? c : [o], u = new Set(l), d = l.length > 1, f = { x: [t], y: [s, "measures"] }, p = e.seriesNames(f).filter((_) => {
    const N = _.yValues && _.yValues.length >= 2 ? _.yValues[_.yValues.length - 1] : void 0;
    return N === void 0 || u.has(N);
  }), b = e.chartPivot(f), g = ut(r, o), y = p.map((_) => {
    var I, j;
    const N = (I = _.yValues) == null ? void 0 : I[0], k = _.yValues && _.yValues.length >= 2 ? _.yValues[_.yValues.length - 1] : o, R = ut(r, k), C = (R == null ? void 0 : R.shortTitle) ?? (R == null ? void 0 : R.title) ?? k, w = N ?? _.shortTitle ?? _.title ?? _.key, L = d ? `${C} · ${w}` : w, D = b.map((B) => hn(B[_.key])), V = (j = n.meta) == null ? void 0 : j[k];
    return {
      key: _.key,
      label: L,
      data: D,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...fn(R ?? g, V, a.format),
        measure: k
      }
    };
  });
  return es(y, g, a.format);
}
function es(e, t, n) {
  var d, f, h;
  if (e.length <= Dn) return e;
  const a = (p) => p.data.reduce((b, g) => b + (g ?? 0), 0), r = [...e].sort((p, b) => a(b) - a(p)), o = r.slice(0, Dn - 1), c = r.slice(Dn - 1), s = ((d = e[0]) == null ? void 0 : d.data.length) ?? 0, l = Array.from({ length: s }, (p, b) => {
    let g = 0, y = !1;
    for (const _ of c) {
      const N = _.data[b];
      N !== null && (g += N, y = !0);
    }
    return y ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${c.length})`,
    data: l,
    meta: { ...fn(t, void 0, n), ...(h = (f = o[0]) == null ? void 0 : f.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function hn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function vt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const ts = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function ns(e, t, n) {
  var a;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (a = n.find((r) => r.name === e)) == null ? void 0 : a.default;
}
function $t(e, t, n) {
  var a;
  if (Me(e)) {
    const r = e.var;
    return Object.prototype.hasOwnProperty.call(n, r) && n[r] !== void 0 ? n[r] : (a = t.get(r)) == null ? void 0 : a.default;
  }
  return e;
}
function rs(e, t, n) {
  const a = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return a ? { member: e.member, operator: e.operator } : void 0;
  const r = [];
  for (const o of e.values) {
    const c = $t(o, t, n);
    if (!vt(c))
      if (Array.isArray(c))
        for (const s of c)
          vt(s) || r.push(s);
      else
        r.push(c);
  }
  return r.length === 0 ? a ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: r };
}
function as(e, t, n) {
  if ("and" in e) {
    const a = Bn(e.and, t, n);
    return a.length > 0 ? { and: a } : void 0;
  }
  if ("or" in e) {
    const a = Bn(e.or, t, n);
    return a.length > 0 ? { or: a } : void 0;
  }
  return rs(e, t, n);
}
function Bn(e, t, n) {
  const a = [];
  for (const r of e) {
    const o = as(r, t, n);
    o !== void 0 && a.push(o);
  }
  return a;
}
function os(e, t, n) {
  const a = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const r = $t(e.granularity, t, n);
    vt(r) || (a.granularity = r);
  }
  if (e.dateRange !== void 0) {
    const r = $t(e.dateRange, t, n);
    vt(r) || (a.dateRange = r);
  }
  return e.compareDateRange !== void 0 && (a.compareDateRange = e.compareDateRange), a;
}
function is(e, t, n) {
  const a = ts(n), r = {};
  if (e.measures !== void 0 && (r.measures = [...e.measures]), e.dimensions !== void 0 && (r.dimensions = [...e.dimensions]), e.segments !== void 0 && (r.segments = [...e.segments]), e.timeDimensions !== void 0 && (r.timeDimensions = e.timeDimensions.map((o) => os(o, a, t))), e.filters !== void 0) {
    const o = Bn(e.filters, a, t);
    o.length > 0 && (r.filters = o);
  }
  if (e.order !== void 0 && (r.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = $t(e.limit, a, t);
    vt(o) || (r.limit = o);
  }
  if (e.offset !== void 0) {
    const o = $t(e.offset, a, t);
    vt(o) || (r.offset = o);
  }
  return e.total !== void 0 && (r.total = e.total), e.timezone !== void 0 && (r.timezone = e.timezone), r;
}
function cs(e, t) {
  let n = {};
  for (const o of e)
    o.default !== void 0 && (n[o.name] = o.default);
  if (t)
    for (const o of Object.keys(t)) {
      const c = t[o];
      c !== void 0 && (n[o] = c);
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
    set(o, c) {
      if (c === void 0) {
        if (!Object.prototype.hasOwnProperty.call(n, o)) return;
        const s = { ...n };
        delete s[o], n = s;
      } else {
        if (n[o] === c) return;
        n = { ...n, [o]: c };
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
const ss = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, ls = "MMM d, yyyy";
function us(e) {
  if (e instanceof Date) return At(e) ? e : null;
  if (typeof e == "number") {
    const a = new Date(e);
    return At(a) ? a : null;
  }
  const t = en(e);
  if (At(t)) return t;
  const n = new Date(e);
  return At(n) ? n : null;
}
function lo(e) {
  return /^\d{4}-\d{2}/.test(e) ? At(en(e)) : !1;
}
function ms(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? ss[t] : ls;
}
function Dt(e, t, n) {
  const a = us(e);
  return a ? fe(a, ms(t, n)) : String(e);
}
function Rh(e, t) {
  return (n) => n == null ? "" : Dt(n, e, t);
}
function Ah(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Dt(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Dt(e, t.format, t.granularity) : String(e) : lo(e) ? Dt(e, t.format, t.granularity) : e;
}
const ea = "—", ds = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function ta(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function vs(e, t) {
  const n = Math.abs(e);
  for (const { limit: a, suffix: r } of ds)
    if (n >= a) return ta((e / a).toFixed(t)) + r;
  return ta(e.toFixed(t));
}
function fs(e, t, n) {
  const a = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (a.minimumFractionDigits = t.decimals, a.maximumFractionDigits = t.decimals) : a.maximumFractionDigits = 2, new Intl.NumberFormat(n, a).format(e);
}
function hs(e, t) {
  const { format: n, meta: a, locale: r } = t, o = n != null && n.abbreviate ? vs(e, n.decimals ?? 1) : fs(e, n, r), c = (n == null ? void 0 : n.suffix) ?? ((a == null ? void 0 : a.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${c ? ` ${c}` : ""}`;
}
function uo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function ps(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || uo(e.value) ? !0 : typeof e.value == "string" ? lo(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const fr = (e) => {
  const { value: t, format: n, granularity: a } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? ea : (uo(t) || typeof t == "string" || typeof t == "number") && ps(e) ? Dt(t, n, a) : typeof t == "number" ? hs(t, e) : String(t);
};
function gs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Mh(e, t) {
  return (n, a) => {
    const r = a ? gs(a, t) : void 0;
    return fr({
      value: n,
      meta: r == null ? void 0 : r.meta,
      title: (r == null ? void 0 : r.shortTitle) ?? (r == null ? void 0 : r.title),
      role: "value",
      format: e
    });
  };
}
function bs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function ys(e) {
  const t = et.safeParse(e);
  return t.success ? t.data : void 0;
}
function xs(e, t) {
  var a;
  const n = (a = t.mapping) == null ? void 0 : a.category.member;
  if (!(!n || !e)) {
    for (const r of Object.keys(e.timeDimensions))
      if (r !== n && r.startsWith(`${n}.`)) {
        const o = ys(r.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function mo(e, t, n, a) {
  const r = xs(e, t);
  return {
    value(o, c, s = "value") {
      const l = c ? bs(c, e) : void 0, u = l == null ? void 0 : l.meta;
      return n({
        value: o,
        member: c,
        meta: u,
        title: (l == null ? void 0 : l.shortTitle) ?? (l == null ? void 0 : l.title),
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
class ws extends Error {
}
const ks = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new ws(`"${e}" cannot be parsed into a number`);
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
class Ns extends Error {
}
class ra extends Error {
}
class Cs extends Error {
}
class Tn extends Error {
}
class Ss extends Error {
}
class _s {
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
    var n, a;
    if (this.origin == null)
      throw new Error(".to must be called after .from");
    this.destination = this.getUnit(t), this.destination == null && this.throwUnsupportedUnitError(t);
    const r = this.destination, o = this.origin;
    if (o.abbr === r.abbr)
      return this.val;
    if (r.measure != o.measure)
      throw new Cs(`Cannot convert incompatible measures of ${r.measure} and ${o.measure}`);
    let c = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (c = this.cls.sub(c, this.convertFraction(o.unit.anchor_shift))), o.system != r.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Tn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${r.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Tn(`Unable to find anchor for "${o.measure}" to "${r.measure}". Please make sure it is defined.`);
      const d = (n = u[r.system]) === null || n === void 0 ? void 0 : n.transform, f = (a = u[r.system]) === null || a === void 0 ? void 0 : a.ratio;
      if (typeof d == "function")
        c = d(c, this.cls);
      else if (typeof f == "number")
        c = this.cls.mul(c, f);
      else if (na(f))
        c = this.cls.mul(c, this.convertFraction(f));
      else
        throw new Tn("A system anchor needs to either have a defined ratio number or a transform function.");
    }
    return r.unit.anchor_shift && (c = this.cls.add(c, this.convertFraction(r.unit.anchor_shift))), this.cls.div(c, this.convertFraction(r.unit.to_anchor));
  }
  /**
   * Converts the unit to the best available unit.
   *
   * @throws OperationOrderError
   */
  toBest(t) {
    var n, a, r;
    if (this.origin == null)
      throw new ra(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let c = [], s = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (c = (n = t.exclude) !== null && n !== void 0 ? n : [], s = (a = t.cutOffNumber) !== null && a !== void 0 ? a : s, l = (r = t.system) !== null && r !== void 0 ? r : this.origin.system);
    let u = null;
    for (const d of this.possibilities()) {
      const f = this.describe(d);
      if (c.indexOf(d) === -1 && f.system === l) {
        const p = this.to(d);
        if (o ? this.cls.gt(p, s) : this.cls.lt(p, s))
          continue;
        (u === null || (o ? this.cls.lte(p, s) && this.cls.gt(p, u.val) : this.cls.gte(p, s) && this.cls.lt(p, u.val))) && (u = {
          val: p,
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
      for (const [a, r] of Object.entries(this.measureData))
        for (const [o, c] of Object.entries(r.systems))
          for (const [s, l] of Object.entries(c))
            n.push(this.describeUnit({
              abbr: s,
              measure: a,
              system: o,
              unit: l
            }));
    else {
      if (!this.isMeasure(t))
        throw new Ss(`Meausure "${t}" not found.`);
      const a = this.measureData[t];
      for (const [r, o] of Object.entries(a.systems))
        for (const [c, s] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: c,
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
    throw new Ns(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function Rs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, a] of Object.entries(e))
    for (const [r, o] of Object.entries(a.systems))
      for (const [c, s] of Object.entries(o))
        t.set(c, {
          measure: n,
          system: r,
          abbr: c,
          unit: s
        });
  return t;
}
function As(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = Rs(e);
  return (a) => new _s({
    measures: e,
    unitCache: n,
    cls: ks
  }, a);
}
const Ms = {
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
}, Os = {
  systems: {
    metric: Ms
  }
}, Ls = {
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
}, Ds = {
  systems: {
    SI: Ls
  }
}, Ts = {
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
}, zs = {
  systems: {
    SI: Ts
  }
}, Fs = {
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
}, $s = {
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
}, Es = {
  systems: {
    metric: Fs,
    imperial: $s
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
}, Ps = {
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
}, Is = {
  systems: {
    SI: Ps
  }
}, js = {
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
}, Vs = {
  systems: {
    SI: js
  }
}, qs = {
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
}, Ks = {
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
}, Bs = {
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
}, Hs = {
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
}, Ws = {
  systems: {
    bit: qs,
    byte: Ks,
    IECBit: Bs,
    IECByte: Hs
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
}, Us = {
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
}, Gs = {
  systems: {
    metric: Us
  }
}, Ys = {
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
}, Qs = {
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
}, Js = {
  systems: {
    SI: Ys,
    nutrition: Qs
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
}, Xs = {
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
}, Zs = {
  systems: {
    SI: Xs
  }
}, el = {
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
}, tl = {
  systems: {
    SI: el
  }
}, nl = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, rl = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, al = {
  systems: {
    metric: nl,
    imperial: rl
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
}, ol = {
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
}, il = {
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
}, cl = {
  systems: {
    metric: ol,
    imperial: il
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
}, sl = {
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
}, ll = {
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
}, ul = {
  systems: {
    metric: sl,
    imperial: ll
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
}, ml = {
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
}, dl = {
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
}, vl = {
  systems: {
    metric: ml,
    imperial: dl
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
}, fl = {
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
}, hl = {
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
}, pl = {
  systems: {
    metric: fl,
    imperial: hl
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
}, gl = {
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
}, bl = {
  systems: {
    SI: gl
  }
}, yl = {
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
}, xl = {
  systems: {
    unit: yl
  }
}, wl = {
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
}, kl = {
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
}, Nl = {
  systems: {
    metric: wl,
    imperial: kl
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
}, Cl = {
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
}, Sl = {
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
}, _l = {
  systems: {
    metric: Cl,
    imperial: Sl
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
}, Rl = {
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
}, Al = {
  systems: {
    SI: Rl
  }
}, Ml = {
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
}, Ol = {
  systems: {
    SI: Ml
  }
}, Ll = {
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
}, Dl = {
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
}, Tl = {
  systems: {
    metric: Ll,
    imperial: Dl
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
}, zl = {
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
}, Fl = {
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
}, $l = {
  systems: {
    metric: zl,
    imperial: Fl
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
}, El = {
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
}, Pl = {
  systems: {
    SI: El
  }
}, Il = {
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
}, jl = {
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
}, Vl = {
  systems: {
    metric: Il,
    imperial: jl
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
}, ql = {
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
}, Kl = {
  systems: {
    SI: ql
  }
}, Bl = {
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
}, Hl = {
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
}, Wl = {
  systems: {
    metric: Bl,
    imperial: Hl
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
}, Ul = {
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
}, Gl = {
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
}, Yl = {
  systems: {
    metric: Ul,
    imperial: Gl
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
}, Ql = {
  acceleration: Os,
  angle: Ds,
  apparentPower: zs,
  area: Es,
  charge: Is,
  current: Vs,
  digital: Ws,
  each: Gs,
  energy: Js,
  force: Zs,
  frequency: tl,
  illuminance: al,
  length: cl,
  mass: ul,
  massFlowRate: vl,
  pace: pl,
  partsPer: bl,
  pieces: xl,
  power: Nl,
  pressure: _l,
  reactiveEnergy: Al,
  reactivePower: Ol,
  speed: Tl,
  torque: Vl,
  temperature: $l,
  time: Pl,
  voltage: Kl,
  volume: Wl,
  volumeFlowRate: Yl
}, Jl = As(Ql), Xl = {
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
function Zl(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Jl(t).from(e.from).to(e.to)
  };
}
const Hn = {
  ...Object.fromEntries(
    Object.entries(Xl).map(([e, t]) => [e, Zl(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function pn(e) {
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
  const n = e * (ru[t ?? "ms"] ?? 1), a = n < 0 ? "-" : "";
  let r = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], c = o.map(([l, u], d) => {
    const f = d < o.length - 1 ? Math.floor(r / l) : Math.round(r / l);
    return r -= f * l, [f, u];
  }), s = c.findIndex((l) => l[0] > 0);
  return s === -1 ? "0s" : a + c.slice(s, s + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function zn(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const r = Math.abs(e);
    for (const [o, c] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (r >= o) return au((e / o).toFixed(n.decimals ?? 1)) + c;
  }
  const a = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, a).format(e);
}
function ou(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function oa(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function vo(e = Hn) {
  return (t) => {
    if (t.role === "category" || typeof t.value == "string") return fr(t);
    if (t.value === null || t.value === void 0 || typeof t.value != "number" || Number.isNaN(t.value)) return "—";
    const n = t.value, a = t.meta, r = a == null ? void 0 : a.quantity, o = t.format;
    if (o != null && o.kind && o.kind !== "auto") {
      if (o.kind === "duration") return aa(n, a == null ? void 0 : a.unit);
      if (o.kind === "percent")
        return new Intl.NumberFormat(t.locale, { style: "percent", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "currency")
        return new Intl.NumberFormat(t.locale, { style: "currency", currency: "USD", maximumFractionDigits: o.decimals ?? 0 }).format(n);
      if (o.kind === "number") return oa(zn(n, t), o.prefix, o.suffix);
    }
    if (r === "time") return aa(n, a == null ? void 0 : a.unit);
    if (r === "count" || (a == null ? void 0 : a.convert) === !1) return oa(zn(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const c = a == null ? void 0 : a.unit, s = c ? ou(r, c) : {}, l = (o == null ? void 0 : o.prefix) ?? s.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : s.suffix ?? "";
    return `${l}${zn(n, t)}${u}`;
  };
}
const iu = Ai({ prefix: "cv" });
function S(...e) {
  return iu(Ri(e));
}
function hr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function cu({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const su = dr(
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
), pr = x.forwardRef(({ className: e, variant: t, ...n }, a) => /* @__PURE__ */ i(
  "div",
  {
    ref: a,
    "data-slot": "alert",
    role: "alert",
    className: S(su({ variant: t }), e),
    ...n
  }
));
pr.displayName = "Alert";
const gr = x.forwardRef(
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
gr.displayName = "AlertTitle";
const br = x.forwardRef(
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
br.displayName = "AlertDescription";
const qt = m.object({
  axis: m.enum(["x", "y"]),
  value: m.number(),
  label: m.string().optional(),
  colorToken: We.optional()
}).strict(), yr = m.boolean().optional(), lu = m.object({
  barRadius: m.number().optional(),
  barCategoryGap: m.union([m.number(), m.string()]).optional(),
  barGap: m.union([m.number(), m.string()]).optional(),
  maxBarSize: m.number().optional(),
  showValueLabels: m.boolean().optional(),
  referenceLines: m.array(qt).optional(),
  comparePrevious: yr
}).strict(), xr = m.enum(["linear", "monotone", "step", "natural"]), uu = m.object({
  curve: xr.optional(),
  strokeWidth: m.number().optional(),
  dots: m.union([m.boolean(), m.literal("active")]).optional(),
  connectNulls: m.boolean().optional(),
  chrome: m.enum(["full", "none"]).optional(),
  referenceLines: m.array(qt).optional(),
  showValueLabels: m.boolean().optional(),
  comparePrevious: yr
}).strict(), mu = m.object({
  curve: xr.optional(),
  fillOpacity: m.number().optional(),
  strokeWidth: m.number().optional(),
  connectNulls: m.boolean().optional(),
  dots: m.boolean().optional(),
  referenceLines: m.array(qt).optional(),
  comparePrevious: yr
}).strict(), du = m.object({
  innerRadiusPct: m.number().optional(),
  outerRadiusPct: m.number().optional(),
  padAngle: m.number().optional(),
  cornerRadius: m.number().optional(),
  showLabels: m.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: m.object({ value: m.string().optional(), label: m.string().optional() }).strict().optional(),
  maxSlices: m.number().optional()
}).strict(), vu = m.object({
  x: ne,
  y: ne,
  size: ne.optional(),
  sizeRange: m.tuple([m.number(), m.number()]).optional(),
  groupBy: ne.optional(),
  shape: m.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: m.array(qt).optional()
}).strict(), fu = m.object({
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
    granularity: m.union([et, tn]).optional(),
    dateRange: m.union([Vn, tn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: m.enum(["up", "down"]).optional(),
  gauge: m.object({
    min: m.number().optional(),
    max: m.number(),
    thresholds: m.array(m.object({ at: m.number(), colorToken: We }).strict()).optional()
  }).strict().optional(),
  icon: m.string().optional()
}).strict(), hu = m.object({
  member: ne,
  label: m.string().optional(),
  format: vn.optional(),
  align: m.enum(["left", "right", "center"]).optional(),
  width: m.number().optional(),
  hidden: m.boolean().optional()
}).strict(), pu = m.object({
  member: ne,
  when: m.object({
    op: m.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: m.number()
  }).strict(),
  colorToken: We.optional()
}).strict(), gu = m.object({
  columns: m.array(hu).optional(),
  pageSize: m.number().optional(),
  sortable: m.boolean().optional(),
  stickyHeader: m.boolean().optional(),
  rowHeight: m.enum(["compact", "default"]).optional(),
  showRowNumbers: m.boolean().optional(),
  conditionalFormat: m.array(pu).optional()
}).strict(), bu = m.object({
  member: ne,
  render: m.enum(["bar", "line", "area"]),
  axis: m.enum(["left", "right"]).optional(),
  colorToken: We.optional(),
  stackId: m.string().optional(),
  curve: m.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: m.boolean().optional(),
  label: m.string().optional()
}).strict(), yu = m.object({
  series: m.array(bu),
  referenceLines: m.array(qt).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: xr.optional(),
  dots: m.boolean().optional(),
  connectNulls: m.boolean().optional(),
  strokeWidth: m.number().optional(),
  fillOpacity: m.number().optional(),
  barRadius: m.number().optional()
}).strict(), xu = {
  bar: lu,
  line: uu,
  area: mu,
  pie: du,
  scatter: vu,
  kpi: fu,
  table: gu,
  combo: yu
};
function Oh(e) {
  return xu[e];
}
const fo = {
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
  for (const a of Object.keys(t)) {
    const r = t[a];
    r !== void 0 && (n[a] = a in e ? Wn(e[a], r) : r);
  }
  return n;
}
function wu(e) {
  const t = fo[e.family];
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
    const a = { __cat: typeof t == "number" ? t : String(t) };
    for (const r of e.series) a[r.key] = r.data[n] ?? null;
    return a;
  });
}
function bt(e) {
  return e === "top" ? "top" : "bottom";
}
function yt(e) {
  return "horizontal";
}
function xt(e) {
  return "center";
}
function ke(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function $e(e) {
  return e == null ? void 0 : e.domain;
}
function Ee(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function ku(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function Tt(e) {
  return `var(${hr(e.key)})`;
}
function Nu(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function ho(e) {
  return e === "stacked" || e === "percent";
}
function gn(e, t) {
  var s, l, u, d, f, h, p, b, g, y, _, N, k, R;
  const n = e.raw.annotation, a = (C) => {
    var w, L, D, V, I, j;
    if (C)
      return ((w = n == null ? void 0 : n.measures[C]) == null ? void 0 : w.shortTitle) ?? ((L = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : L.shortTitle) ?? ((D = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : D.shortTitle) ?? ((V = n == null ? void 0 : n.measures[C]) == null ? void 0 : V.title) ?? ((I = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : I.title) ?? ((j = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : j.title) ?? C;
  }, r = e.series.find((C) => {
    var w;
    return (((w = C.meta) == null ? void 0 : w.axis) ?? "left") !== "right";
  }), o = e.series.find((C) => {
    var w;
    return ((w = C.meta) == null ? void 0 : w.axis) === "right";
  }), c = (C) => {
    var w;
    return C ? (w = C.meta) != null && w.measure ? a(C.meta.measure) : C.label : void 0;
  };
  return {
    x: (l = (s = t.axes) == null ? void 0 : s.x) != null && l.labelHide ? void 0 : ((d = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : d.label) ?? a((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (b = (p = t.axes) == null ? void 0 : p.y) != null && b.labelHide ? void 0 : ((y = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : y.label) ?? c(r),
    right: (N = (_ = t.axes) == null ? void 0 : _.y2) != null && N.labelHide ? void 0 : ((R = (k = t.axes) == null ? void 0 : k.y2) == null ? void 0 : R.label) ?? c(o)
  };
}
function Ke(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function kr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function Kt(e, t, n) {
  return (a, r) => {
    const o = r == null ? void 0 : r.dataKey, c = typeof o == "string" || typeof o == "number" ? String(o) : void 0, s = (c ? n == null ? void 0 : n.get(c) : void 0) ?? t ?? c;
    return e.value(a, s, "tooltip");
  };
}
function rn(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
const Cu = { light: "", dark: ".dark" }, po = x.createContext(null);
function go() {
  const e = x.useContext(po);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const Ue = x.forwardRef(({ id: e, className: t, children: n, config: a, ...r }, o) => {
  const c = x.useId(), s = `chart-${e || c.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(po.Provider, { value: { config: a }, children: /* @__PURE__ */ v(
    "div",
    {
      "data-chart": s,
      ref: o,
      className: S(
        "cv:flex cv:h-full cv:w-full cv:justify-center cv:text-xs cv:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground cv:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 cv:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border cv:[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border cv:[&_.recharts-radial-bar-background-sector]:fill-muted cv:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted cv:[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border cv:[&_.recharts-sector]:outline-none cv:[&_.recharts-sector[stroke='#fff']]:stroke-transparent cv:[&_.recharts-surface]:outline-none",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ i(Su, { id: s, config: a }),
        /* @__PURE__ */ i(ar.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
Ue.displayName = "ChartContainer";
const Su = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, a]) => a.theme || a.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Cu).map(
          ([a, r]) => `
${r} [data-chart=${e}] {
${n.map(([o, c]) => {
            var l;
            const s = ((l = c.theme) == null ? void 0 : l[a]) || c.color;
            return s ? `  ${hr(o)}: ${s};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, wt = ar.Tooltip, at = x.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: a = "dot",
    hideLabel: r = !1,
    hideIndicator: o = !1,
    label: c,
    labelFormatter: s,
    labelClassName: l,
    formatter: u,
    valueFormatter: d,
    color: f,
    nameKey: h,
    labelKey: p
  }, b) => {
    const { config: g } = go(), y = x.useMemo(() => {
      var w;
      if (r || !(t != null && t.length))
        return null;
      const [N] = t, k = `${p || (N == null ? void 0 : N.dataKey) || (N == null ? void 0 : N.name) || "value"}`, R = Un(g, N, k), C = !p && typeof c == "string" ? ((w = g[c]) == null ? void 0 : w.label) || c : R == null ? void 0 : R.label;
      return s ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: s(C, t) }) : C ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: C }) : null;
    }, [c, s, t, r, l, g, p]);
    if (!e || !(t != null && t.length))
      return null;
    const _ = t.length === 1 && a !== "dot";
    return /* @__PURE__ */ v(
      "div",
      {
        ref: b,
        className: S(
          "cv:grid cv:min-w-32 cv:items-start cv:gap-1.5 cv:rounded-lg cv:border cv:border-border/40 cv:bg-background cv:px-3 cv:py-2 cv:text-xs cv:shadow-lg",
          n
        ),
        children: [
          _ ? null : y,
          /* @__PURE__ */ i("div", { className: "cv:grid cv:gap-1.5", children: t.map((N, k) => {
            var L;
            const R = `${h || N.name || N.dataKey || "value"}`, C = Un(g, N, R), w = f || ((L = N.payload) == null ? void 0 : L.fill) || N.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  a === "dot" && "cv:items-center"
                ),
                children: u && (N == null ? void 0 : N.value) !== void 0 && N.name ? u(N.value, N.name, N, k, N.payload) : /* @__PURE__ */ v(oe, { children: [
                  C != null && C.icon ? /* @__PURE__ */ i(C.icon, {}) : !o && /* @__PURE__ */ i(
                    "div",
                    {
                      className: S(
                        "cv:shrink-0 cv:rounded-[2px] cv:border-[--color-border] cv:bg-[--color-bg]",
                        {
                          "cv:h-2.5 cv:w-2.5": a === "dot",
                          "cv:w-1": a === "line",
                          "cv:w-0 cv:border-[1.5px] cv:border-dashed cv:bg-transparent": a === "dashed",
                          "cv:my-0.5": _ && a === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": w,
                        "--color-border": w
                      }
                    }
                  ),
                  /* @__PURE__ */ v(
                    "div",
                    {
                      className: S(
                        "cv:flex cv:flex-1 cv:justify-between cv:gap-4 cv:leading-none",
                        _ ? "cv:items-end" : "cv:items-center"
                      ),
                      children: [
                        /* @__PURE__ */ v("div", { className: "cv:grid cv:gap-1.5", children: [
                          _ ? y : null,
                          /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: (C == null ? void 0 : C.label) || N.name })
                        ] }),
                        N.value !== void 0 && /* @__PURE__ */ i("span", { className: "cv:font-mono cv:font-medium cv:tabular-nums cv:text-foreground", children: d ? d(N.value, N) : typeof N.value == "number" ? N.value.toLocaleString() : String(N.value) })
                      ]
                    }
                  )
                ] })
              },
              N.dataKey ? String(N.dataKey) : k
            );
          }) })
        ]
      }
    );
  }
);
at.displayName = "ChartTooltipContent";
const kt = ar.Legend, ot = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: a = "bottom", nameKey: r }, o) => {
    const { config: c } = go();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: S(
          "cv:flex cv:items-center cv:justify-center cv:gap-4",
          a === "top" ? "cv:pb-3" : "cv:pt-3",
          e
        ),
        children: n.map((s) => {
          const l = `${r || s.dataKey || "value"}`, u = Un(c, s, l);
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
ot.displayName = "ChartLegendContent";
function Un(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const a = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let r = n;
  return n in t && typeof t[n] == "string" ? r = t[n] : a && n in a && typeof a[n] == "string" && (r = a[n]), r in e ? e[r] : e[n];
}
function _u({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var V, I, j, B, T, O, G, te, $, Y, Z, U, Q, ue, J, H;
  const o = t.familyOptions ?? {}, c = t.orientation === "horizontal", s = ho(t.stackMode), l = t.stackMode === "percent", u = wr(e), d = (A, F, q = "value") => l ? rn(A) : a.value(A, F, q), f = (A) => a.category(A), h = kr(e), p = Ke(e.series[0]), b = c ? (I = (V = t.axes) == null ? void 0 : V.y) == null ? void 0 : I.hide : (B = (j = t.axes) == null ? void 0 : j.x) == null ? void 0 : B.hide, g = c ? (T = t.axes) == null ? void 0 : T.x : (O = t.axes) == null ? void 0 : O.y, y = !c && e.series.some((A) => {
    var F;
    return ((F = A.meta) == null ? void 0 : F.axis) === "right";
  }), _ = Ke(e.series.find((A) => {
    var F;
    return ((F = A.meta) == null ? void 0 : F.axis) !== "right";
  })) ?? p, N = Ke(e.series.find((A) => {
    var F;
    return ((F = A.meta) == null ? void 0 : F.axis) === "right";
  })), k = gn(e, t), R = k.x ? { value: k.x, position: "insideBottom", offset: -2 } : void 0, C = k.x ? { value: k.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, w = k.left ? { value: k.left, position: "insideBottom", offset: -2 } : void 0, L = k.left ? { value: k.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, D = k.right ? { value: k.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(Ue, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    mi,
    {
      accessibilityLayer: !0,
      data: u,
      layout: c ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Pt, { vertical: c, horizontal: !c }),
        c ? /* @__PURE__ */ v(oe, { children: [
          /* @__PURE__ */ i(
            Ie,
            {
              type: "category",
              dataKey: "__cat",
              hide: b,
              tickFormatter: f,
              label: C
            }
          ),
          /* @__PURE__ */ i(
            mt,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: Ee(g),
              domain: $e(g),
              tickFormatter: (A) => d(A, p, "axis"),
              label: w
            }
          )
        ] }) : /* @__PURE__ */ v(oe, { children: [
          /* @__PURE__ */ i(
            mt,
            {
              type: "category",
              dataKey: "__cat",
              hide: b,
              tickFormatter: f,
              label: R
            }
          ),
          /* @__PURE__ */ i(
            Ie,
            {
              yAxisId: "left",
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: Ee(g),
              domain: $e(g),
              tickFormatter: (A) => d(A, _, "axis"),
              label: L
            }
          ),
          y && /* @__PURE__ */ i(
            Ie,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (te = (G = t.axes) == null ? void 0 : G.y2) == null ? void 0 : te.hide,
              scale: Ee(($ = t.axes) == null ? void 0 : $.y2),
              domain: $e((Y = t.axes) == null ? void 0 : Y.y2),
              tickFormatter: (A) => d(A, N, "axis"),
              label: D
            }
          )
        ] }),
        ((Z = t.tooltip) == null ? void 0 : Z.show) !== !1 && /* @__PURE__ */ i(
          wt,
          {
            content: /* @__PURE__ */ i(
              at,
              {
                labelFormatter: (A) => a.category(A),
                indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
                valueFormatter: l ? (A) => rn(A) : Kt(a, void 0, h)
              }
            )
          }
        ),
        ke(t).show && /* @__PURE__ */ i(
          kt,
          {
            content: /* @__PURE__ */ i(ot, { className: ke(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: bt((Q = t.legend) == null ? void 0 : Q.position),
            layout: yt((ue = t.legend) == null ? void 0 : ue.position),
            align: xt((J = t.legend) == null ? void 0 : J.position)
          }
        ),
        e.series.map((A) => {
          var F, q, de, ze;
          return /* @__PURE__ */ i(
            Ta,
            {
              yAxisId: c ? void 0 : ((F = A.meta) == null ? void 0 : F.axis) === "right" && y ? "right" : "left",
              dataKey: A.key,
              name: A.label,
              stackId: s ? (q = A.meta) != null && q.companion ? "__prev" : ((de = A.meta) == null ? void 0 : de.stackId) ?? "stack" : void 0,
              fill: Tt(A),
              fillOpacity: (ze = A.meta) != null && ze.companion ? 0.4 : void 0,
              radius: ku(o.barRadius, c),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                za,
                {
                  dataKey: A.key,
                  position: c ? "right" : "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (Re) => d(typeof Re == "boolean" ? Number(Re) : Re, Ke(A), "label")
                }
              )
            },
            A.key
          );
        }),
        (H = o.referenceLines) == null ? void 0 : H.map((A, F) => /* @__PURE__ */ i(
          It,
          {
            yAxisId: c ? void 0 : "left",
            ...A.axis === "y" ? { y: A.value } : { x: A.value },
            label: A.label,
            stroke: `var(--${A.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          F
        ))
      ]
    }
  ) });
}
function Ru({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var _, N, k, R, C, w, L, D, V, I, j, B, T, O, G, te;
  const o = t.familyOptions ?? {}, c = o.chrome === "none", s = wr(e), l = ($) => a.category($), u = e.series.some(($) => {
    var Y;
    return ((Y = $.meta) == null ? void 0 : Y.axis) === "right";
  }), d = o.curve ?? "monotone", f = kr(e), h = Ke(e.series.find(($) => {
    var Y;
    return ((Y = $.meta) == null ? void 0 : Y.axis) !== "right";
  })), p = Ke(e.series.find(($) => {
    var Y;
    return ((Y = $.meta) == null ? void 0 : Y.axis) === "right";
  })), b = gn(e, t), g = !c && o.dots === !0, y = !c;
  return /* @__PURE__ */ i(
    Ue,
    {
      config: n,
      className: c ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(di, { accessibilityLayer: !0, data: s, margin: c ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !c && /* @__PURE__ */ i(Pt, { vertical: !1 }),
        /* @__PURE__ */ i(
          mt,
          {
            type: "category",
            dataKey: "__cat",
            hide: c || ((N = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : N.hide),
            tickFormatter: l,
            label: !c && b.x ? { value: b.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Ie,
          {
            yAxisId: "left",
            type: "number",
            hide: c || ((R = (k = t.axes) == null ? void 0 : k.y) == null ? void 0 : R.hide),
            scale: Ee((C = t.axes) == null ? void 0 : C.y),
            domain: $e((w = t.axes) == null ? void 0 : w.y),
            tickFormatter: ($) => a.value($, h, "axis"),
            label: !c && b.left ? { value: b.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Ie,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: c || ((D = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : D.hide),
            scale: Ee((V = t.axes) == null ? void 0 : V.y2),
            domain: $e((I = t.axes) == null ? void 0 : I.y2),
            tickFormatter: ($) => a.value($, p, "axis"),
            label: !c && b.right ? { value: b.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !c && ((j = t.tooltip) == null ? void 0 : j.show) !== !1 && /* @__PURE__ */ i(
          wt,
          {
            content: /* @__PURE__ */ i(
              at,
              {
                labelFormatter: ($) => a.category($),
                indicator: ((B = t.tooltip) == null ? void 0 : B.indicator) ?? "line",
                valueFormatter: Kt(a, void 0, f)
              }
            )
          }
        ),
        !c && ke(t).show && /* @__PURE__ */ i(
          kt,
          {
            content: /* @__PURE__ */ i(ot, { className: ke(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: bt((T = t.legend) == null ? void 0 : T.position),
            layout: yt((O = t.legend) == null ? void 0 : O.position),
            align: xt((G = t.legend) == null ? void 0 : G.position)
          }
        ),
        e.series.map(($) => {
          var Y, Z, U, Q, ue, J;
          return /* @__PURE__ */ i(
            Fa,
            {
              yAxisId: u && ((Y = $.meta) == null ? void 0 : Y.axis) === "right" ? "right" : "left",
              type: ((Z = $.meta) == null ? void 0 : Z.curve) ?? d,
              dataKey: $.key,
              name: $.label,
              stroke: Tt($),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (U = $.meta) != null && U.companion ? "5 4" : void 0,
              strokeOpacity: (Q = $.meta) != null && Q.companion ? 0.55 : void 0,
              dot: c || (ue = $.meta) != null && ue.companion ? !1 : ((J = $.meta) == null ? void 0 : J.dots) ?? g,
              activeDot: y,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !c,
              children: !c && o.showValueLabels && /* @__PURE__ */ i(
                za,
                {
                  dataKey: $.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (H) => a.value(typeof H == "boolean" ? Number(H) : H, Ke($), "label")
                }
              )
            },
            $.key
          );
        }),
        !c && ((te = o.referenceLines) == null ? void 0 : te.map(($, Y) => /* @__PURE__ */ i(
          It,
          {
            yAxisId: "left",
            ...$.axis === "y" ? { y: $.value } : { x: $.value },
            label: $.label,
            stroke: `var(--${$.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Y
        )))
      ] })
    }
  );
}
function Au({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var y, _, N, k, R, C, w, L, D, V, I, j, B, T;
  const o = t.familyOptions ?? {}, c = ((_ = (y = t.mapping) == null ? void 0 : y.series) == null ? void 0 : _.mode) === "pivot", s = t.stackMode ?? (c ? "stacked" : "none"), l = ho(s), u = s === "percent", d = wr(e), f = (O) => a.category(O), h = o.curve ?? "monotone", p = kr(e), b = Ke(e.series[0]), g = gn(e, t);
  return /* @__PURE__ */ i(Ue, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v($a, { accessibilityLayer: !0, data: d, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Pt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((O) => /* @__PURE__ */ v("linearGradient", { id: `fill-${O.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: Tt(O), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: Tt(O), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, O.key)) }),
    /* @__PURE__ */ i(
      mt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (k = (N = t.axes) == null ? void 0 : N.x) == null ? void 0 : k.hide,
        tickFormatter: f,
        label: g.x ? { value: g.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ie,
      {
        type: "number",
        hide: (C = (R = t.axes) == null ? void 0 : R.y) == null ? void 0 : C.hide,
        scale: Ee((w = t.axes) == null ? void 0 : w.y),
        domain: $e((L = t.axes) == null ? void 0 : L.y),
        tickFormatter: (O) => u ? rn(O) : a.value(O, b, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((D = t.tooltip) == null ? void 0 : D.show) !== !1 && /* @__PURE__ */ i(
      wt,
      {
        content: /* @__PURE__ */ i(
          at,
          {
            labelFormatter: (O) => a.category(O),
            indicator: ((V = t.tooltip) == null ? void 0 : V.indicator) ?? "dot",
            valueFormatter: u ? (O) => rn(O) : Kt(a, void 0, p)
          }
        )
      }
    ),
    ke(t).show && /* @__PURE__ */ i(
      kt,
      {
        content: /* @__PURE__ */ i(ot, { className: ke(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: bt((I = t.legend) == null ? void 0 : I.position),
        layout: yt((j = t.legend) == null ? void 0 : j.position),
        align: xt((B = t.legend) == null ? void 0 : B.position)
      }
    ),
    e.series.map((O) => {
      var G, te, $, Y, Z, U, Q, ue;
      return /* @__PURE__ */ i(
        or,
        {
          type: ((G = O.meta) == null ? void 0 : G.curve) ?? h,
          dataKey: O.key,
          name: O.label,
          stackId: l && !((te = O.meta) != null && te.companion) ? (($ = O.meta) == null ? void 0 : $.stackId) ?? "stack" : void 0,
          stroke: Tt(O),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (Y = O.meta) != null && Y.companion ? "5 4" : void 0,
          strokeOpacity: (Z = O.meta) != null && Z.companion ? 0.55 : void 0,
          fill: (U = O.meta) != null && U.companion ? "none" : `url(#fill-${O.key})`,
          fillOpacity: 1,
          dot: (Q = O.meta) != null && Q.companion ? !1 : ((ue = O.meta) == null ? void 0 : ue.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        O.key
      );
    }),
    (T = o.referenceLines) == null ? void 0 : T.map((O, G) => /* @__PURE__ */ i(
      It,
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
function Mu({ data: e, options: t, format: n, editing: a }) {
  var g, y, _, N, k;
  const r = t.familyOptions ?? {}, o = e.series[0], c = e.categories.map((R, C) => {
    const w = n.category(R);
    return {
      key: `slice-${C}`,
      label: w,
      value: (o == null ? void 0 : o.data[C]) ?? 0,
      fill: `var(--${ge[C % ge.length]})`
    };
  }), s = Ou(c, r.maxSlices), l = s.reduce((R, C) => R + C.value, 0), u = {};
  s.forEach((R, C) => {
    u[R.key] = {
      label: R.label,
      color: `var(--${ge[C % ge.length]})`
    };
  });
  const d = `${r.innerRadiusPct ?? 0}%`, f = `${r.outerRadiusPct ?? 80}%`, h = (r.innerRadiusPct ?? 0) > 0, p = r.showLabels ?? "percent", b = p === "none" ? !1 : ({ payload: R, percent: C }) => {
    const w = R;
    return p === "name" ? (w == null ? void 0 : w.label) ?? "" : p === "value" ? n.value(w == null ? void 0 : w.value, o == null ? void 0 : o.key, "label") : `${((C !== void 0 ? C : w && l > 0 ? w.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(Ue, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(vi, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      wt,
      {
        content: /* @__PURE__ */ i(
          at,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((y = t.tooltip) == null ? void 0 : y.indicator) ?? "dot",
            valueFormatter: Kt(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ v(
      fi,
      {
        data: s,
        dataKey: "value",
        nameKey: "label",
        innerRadius: d,
        outerRadius: f,
        paddingAngle: r.padAngle,
        cornerRadius: r.cornerRadius,
        label: b,
        labelLine: p !== "none" && !h,
        isAnimationActive: !1,
        children: [
          s.map((R) => /* @__PURE__ */ i(Ea, { fill: R.fill }, R.key)),
          h && r.centerLabel && /* @__PURE__ */ i(
            hi,
            {
              position: "center",
              content: ({ viewBox: R }) => {
                var D, V;
                if (!R || !("cx" in R)) return null;
                const { cx: C, cy: w } = R, L = ((D = r.centerLabel) == null ? void 0 : D.value) === void 0 || r.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : r.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: C, y: w, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: C, y: w, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: L }),
                  ((V = r.centerLabel) == null ? void 0 : V.label) && /* @__PURE__ */ i("tspan", { x: C, y: w + 20, className: "cv:fill-muted-foreground cv:text-xs", children: r.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    ke(t).show && /* @__PURE__ */ i(
      kt,
      {
        content: /* @__PURE__ */ i(
          ot,
          {
            nameKey: "label",
            className: ke(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: bt((_ = t.legend) == null ? void 0 : _.position),
        layout: yt((N = t.legend) == null ? void 0 : N.position),
        align: xt((k = t.legend) == null ? void 0 : k.position)
      }
    )
  ] }) });
}
function Ou(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((s, l) => l.value - s.value), a = n.slice(0, t - 1), o = n.slice(t - 1).reduce((s, l) => s + l.value, 0), c = t - 1;
  return [
    ...a,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${ge[c % ge.length]})`
    }
  ];
}
function Lu({ data: e, options: t, format: n, editing: a }) {
  var b, g, y, _, N, k, R, C, w, L, D, V, I, j, B, T, O, G, te, $, Y, Z, U, Q, ue, J;
  const r = t.familyOptions ?? {}, o = e.raw.annotation, c = e.raw.rows, s = { x: r.x, y: r.y, z: r.size }, l = ((b = o == null ? void 0 : o.measures[r.x]) == null ? void 0 : b.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[r.x]) == null ? void 0 : g.shortTitle) ?? r.x, u = ((y = o == null ? void 0 : o.measures[r.y]) == null ? void 0 : y.shortTitle) ?? ((_ = o == null ? void 0 : o.dimensions[r.y]) == null ? void 0 : _.shortTitle) ?? r.y, d = (k = (N = t.axes) == null ? void 0 : N.x) != null && k.labelHide ? void 0 : ((C = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : C.label) ?? l, f = (L = (w = t.axes) == null ? void 0 : w.y) != null && L.labelHide ? void 0 : ((V = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : V.label) ?? u, h = Du(c, r), p = {};
  return h.forEach((H, A) => {
    p[H.key] = { label: H.label, color: `var(--${ge[A % ge.length]})` };
  }), /* @__PURE__ */ i(Ue, { config: p, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(pi, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Pt, {}),
    /* @__PURE__ */ i(
      mt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: (j = (I = t.axes) == null ? void 0 : I.x) == null ? void 0 : j.hide,
        scale: Ee((B = t.axes) == null ? void 0 : B.x),
        domain: $e((T = t.axes) == null ? void 0 : T.x),
        tickFormatter: (H) => n.value(H, r.x, "axis"),
        label: d ? { value: d, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ie,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (G = (O = t.axes) == null ? void 0 : O.y) == null ? void 0 : G.hide,
        scale: Ee((te = t.axes) == null ? void 0 : te.y),
        domain: $e(($ = t.axes) == null ? void 0 : $.y),
        tickFormatter: (H) => n.value(H, r.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    r.size && /* @__PURE__ */ i(gi, { type: "number", dataKey: "z", range: r.sizeRange ?? [40, 400], name: r.size }),
    ((Y = t.tooltip) == null ? void 0 : Y.show) !== !1 && /* @__PURE__ */ i(
      wt,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          at,
          {
            indicator: ((Z = t.tooltip) == null ? void 0 : Z.indicator) ?? "dot",
            valueFormatter: (H, A) => {
              const F = A == null ? void 0 : A.dataKey, q = typeof F == "string" ? s[F] : void 0;
              return n.value(H, q, "tooltip");
            }
          }
        )
      }
    ),
    ke(t).show && h.length > 1 && /* @__PURE__ */ i(
      kt,
      {
        content: /* @__PURE__ */ i(ot, { className: ke(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: bt((U = t.legend) == null ? void 0 : U.position),
        layout: yt((Q = t.legend) == null ? void 0 : Q.position),
        align: xt((ue = t.legend) == null ? void 0 : ue.position)
      }
    ),
    h.map((H, A) => /* @__PURE__ */ i(
      bi,
      {
        name: H.label,
        data: H.points,
        shape: r.shape ?? "circle",
        fill: `var(--color-${H.key})`,
        children: h.length === 1 && H.points.map((F, q) => /* @__PURE__ */ i(Ea, { fill: `var(--${ge[A % ge.length]})` }, q))
      },
      H.key
    )),
    (J = r.referenceLines) == null ? void 0 : J.map((H, A) => /* @__PURE__ */ i(
      It,
      {
        ...H.axis === "y" ? { y: H.value } : { x: H.value },
        label: H.label,
        stroke: `var(--${H.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      A
    ))
  ] }) });
}
function Du(e, t) {
  const n = (r) => ({
    x: Fn(r[t.x]),
    y: Fn(r[t.y]),
    ...t.size ? { z: Fn(r[t.size]) } : {}
  });
  if (!t.groupBy)
    return [{ key: "series-0", label: "Points", points: e.map(n) }];
  const a = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = String(r[t.groupBy] ?? "—"), c = a.get(o) ?? [];
    c.push(n(r)), a.set(o, c);
  }
  return [...a.entries()].map(([r, o], c) => ({
    key: `series-${c}`,
    label: r,
    points: o
  }));
}
function Fn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function Tu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function zu(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function Fu(e) {
  var l, u, d, f;
  const { data: t, options: n, format: a } = e, r = n.familyOptions ?? {}, o = (h) => a.value(h, r.measure, "kpi"), c = bo(t.raw.rows, r.measure) ?? 0, s = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[r.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (d = t.raw.annotation) == null ? void 0 : d.measures[r.measure]) == null ? void 0 : f.title) ?? r.measure;
  return r.display === "gauge" ? /* @__PURE__ */ i(ju, { value: c, label: s, fmt: o, fo: r }) : /* @__PURE__ */ i($u, { ...e, value: c, label: s, fo: r, fmt: o });
}
function $u({
  data: e,
  value: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = n.goodDirection ?? ((u = n.comparison) == null ? void 0 : u.goodDirection) ?? "up", o = qu(e.raw.rows, t, n), c = n.sparkline ? e.series[0] : void 0, s = o ? o.diff : c ? Pu(c) : 0, l = zu(Tu(s, r));
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:justify-center cv:gap-1", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-baseline cv:gap-2", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-4xl cv:font-bold cv:tabular-nums cv:text-foreground", children: a(t) }),
      o && /* @__PURE__ */ i(Iu, { delta: o, goodDirection: r, fo: n, fmt: a })
    ] }),
    c && c.data.length > 0 && /* @__PURE__ */ i(Eu, { series: c, categories: e.categories, colorClass: l })
  ] });
}
function Eu({
  series: e,
  categories: t,
  colorClass: n
}) {
  const a = t.map((r, o) => ({ x: typeof r == "number" ? r : String(r), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:mt-2 cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(ki, { width: "100%", height: "100%", children: /* @__PURE__ */ i($a, { data: a, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
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
function Iu({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = e.diff > 0, o = e.diff === 0, c = o ? !0 : r === (t === "up"), s = o ? Mi : r ? cr : sr, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${a(e.diff)}`;
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
function ju({
  value: e,
  label: t,
  fmt: n,
  fo: a
}) {
  var d, f;
  const r = ((d = a.gauge) == null ? void 0 : d.min) ?? 0, o = ((f = a.gauge) == null ? void 0 : f.max) ?? Math.max(e, 1), c = Math.max(r, Math.min(o, e)), s = Vu(e, a) ?? "chart-1", l = [{ name: t, value: c, fill: `var(--${s})` }], u = { value: { label: t, color: `var(--${s})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(Ue, { config: u, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      yi,
      {
        data: l,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(xi, { type: "number", domain: [r, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(wi, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ v("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-2xl cv:font-bold cv:tabular-nums cv:text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t })
    ] })
  ] });
}
function Vu(e, t) {
  var r;
  const n = (r = t.gauge) == null ? void 0 : r.thresholds;
  if (!(n != null && n.length)) return;
  let a;
  for (const o of [...n].sort((c, s) => c.at - s.at))
    e >= o.at && (a = o.colorToken);
  return a;
}
function bo(e, t) {
  for (const n of e) {
    const a = yo(n[t]);
    if (a !== null) return a;
  }
  return null;
}
function qu(e, t, n) {
  const a = n.comparison;
  if (!a) return null;
  let r = null;
  if (a.mode === "value")
    typeof a.value == "number" ? r = a.value : typeof a.value == "string" && (r = bo(e, a.value));
  else {
    const s = e[1];
    r = s ? yo(s[n.measure]) : null;
  }
  if (r === null) return null;
  const o = t - r, c = r !== 0 ? o / r : null;
  return { current: t, baseline: r, diff: o, pct: c };
}
function yo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const xo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
xo.displayName = "Table";
const wo = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
wo.displayName = "TableHeader";
const ko = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
ko.displayName = "TableBody";
const Yt = x.forwardRef(
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
Yt.displayName = "TableRow";
const Gn = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
Gn.displayName = "TableHead";
const Qt = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
Qt.displayName = "TableCell";
const Ku = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
Ku.displayName = "TableCaption";
const No = dr(
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
), W = x.forwardRef(
  ({ className: e, variant: t, size: n, type: a, ...r }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: a ?? "button",
      className: S(No({ variant: t, size: n }), e),
      ...r
    }
  )
);
W.displayName = "Button";
function Bu({ data: e, options: t, format: n }) {
  const a = t.familyOptions ?? {}, r = e.raw.rows, o = e.raw.annotation, c = x.useMemo(
    () => Hu(r, o, a, n),
    [r, o, a, n]
  ), [s, l] = x.useState(null), [u, d] = x.useState(0), f = a.sortable !== !1, h = a.pageSize ?? 25, p = x.useMemo(() => {
    if (!s) return r;
    const k = s.dir === "asc" ? 1 : -1;
    return [...r].sort((R, C) => Qu(R[s.member], C[s.member]) * k);
  }, [r, s]), b = Math.max(1, Math.ceil(p.length / h)), g = Math.min(u, b - 1), y = p.slice(g * h, g * h + h), _ = (k) => {
    f && (l(
      (R) => (R == null ? void 0 : R.member) === k ? { member: k, dir: R.dir === "asc" ? "desc" : "asc" } : { member: k, dir: "desc" }
    ), d(0));
  }, N = a.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", a.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(xo, { children: [
      /* @__PURE__ */ i(wo, { className: S(a.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(Yt, { children: [
        a.showRowNumbers && /* @__PURE__ */ i(Gn, { className: "cv:w-10 cv:text-right", children: "#" }),
        c.map((k) => /* @__PURE__ */ i(
          Gn,
          {
            className: ca(k.align),
            style: k.width ? { width: k.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              W,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => _(k.member),
                children: [
                  k.label,
                  /* @__PURE__ */ i(Yu, { active: (s == null ? void 0 : s.member) === k.member, dir: s == null ? void 0 : s.dir })
                ]
              }
            ) : k.label
          },
          k.member
        ))
      ] }) }),
      /* @__PURE__ */ v(ko, { children: [
        y.map((k, R) => /* @__PURE__ */ v(Yt, { children: [
          a.showRowNumbers && /* @__PURE__ */ i(Qt, { className: S("cv:text-right cv:text-muted-foreground", N && "cv:py-1"), children: g * h + R + 1 }),
          c.map((C) => {
            const w = Ju(C.member, k[C.member], a.conditionalFormat);
            return /* @__PURE__ */ i(
              Qt,
              {
                className: S(ca(C.align), N && "cv:py-1"),
                style: w ? { color: w } : void 0,
                children: C.render(k[C.member])
              },
              C.member
            );
          })
        ] }, R)),
        y.length === 0 && /* @__PURE__ */ i(Yt, { children: /* @__PURE__ */ i(
          Qt,
          {
            colSpan: c.length + (a.showRowNumbers ? 1 : 0),
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
          W,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((k) => Math.max(0, k - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          W,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => d((k) => Math.min(b - 1, k + 1)),
            disabled: g >= b - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Hu(e, t, n, a) {
  var c;
  const r = e.length > 0 ? Object.keys(e[0]) : Uu(t);
  return ((c = n.columns) != null && c.length ? n.columns : r.map((s) => ({ member: s }))).filter((s) => !s.hidden).map((s) => {
    const l = s.member, u = t ? Gu(t, l) : void 0, d = t ? l in t.measures : !1, f = s.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = s.align ?? (d ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: s.width,
      render: (p) => Wu(p, d, l, a)
    };
  });
}
function Wu(e, t, n, a) {
  if (e == null || e === "") return "—";
  if (t) {
    const r = typeof e == "number" ? e : Number(e);
    return Number.isFinite(r) ? a.value(r, n) : String(e);
  }
  return a.category(e);
}
function Uu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Gu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ca(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function Yu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(cr, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(sr, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Oi, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function Qu(e, t) {
  const n = typeof e == "number" ? e : Number(e), a = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(a) ? n - a : String(e ?? "").localeCompare(String(t ?? ""));
}
function Ju(e, t, n) {
  if (!(n != null && n.length)) return;
  const a = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(a)) {
    for (const r of n)
      if (r.member === e && Xu(a, r.when.op, r.when.value))
        return `var(--${r.colorToken ?? "chart-1"})`;
  }
}
function Xu(e, t, n) {
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
function Zu({ data: e, options: t, format: n, editing: a }) {
  var g, y, _, N, k, R, C, w, L, D, V, I, j, B, T, O, G, te, $, Y, Z, U, Q, ue, J, H;
  const r = t.familyOptions ?? {}, o = r.series ?? [], c = tm(e, o), s = (A) => n.category(A), l = o.some((A) => A.axis === "right"), u = (g = o.find((A) => A.axis !== "right")) == null ? void 0 : g.member, d = (y = o.find((A) => A.axis === "right")) == null ? void 0 : y.member, f = gn(e, t), h = (N = (_ = t.axes) == null ? void 0 : _.y) != null && N.labelHide ? void 0 : ((R = (k = t.axes) == null ? void 0 : k.y) == null ? void 0 : R.label) ?? (u ? Jt(e, u) : void 0), p = (w = (C = t.axes) == null ? void 0 : C.y2) != null && w.labelHide ? void 0 : ((D = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : D.label) ?? (d ? Jt(e, d) : void 0), b = {};
  return o.forEach((A, F) => {
    const q = A.colorToken ?? ge[F % ge.length];
    b[A.member] = {
      label: A.label ?? Jt(e, A.member),
      color: `var(--${q})`
    };
  }), /* @__PURE__ */ i(Ue, { config: b, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ni, { accessibilityLayer: !0, data: c, children: [
    /* @__PURE__ */ i(Pt, { vertical: !1 }),
    /* @__PURE__ */ i(
      mt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (I = (V = t.axes) == null ? void 0 : V.x) == null ? void 0 : I.hide,
        tickFormatter: s,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ie,
      {
        yAxisId: "left",
        type: "number",
        hide: (B = (j = t.axes) == null ? void 0 : j.y) == null ? void 0 : B.hide,
        scale: Ee((T = t.axes) == null ? void 0 : T.y),
        domain: $e((O = t.axes) == null ? void 0 : O.y),
        tickFormatter: (A) => n.value(A, u, "axis"),
        label: h ? { value: h, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    l && /* @__PURE__ */ i(
      Ie,
      {
        yAxisId: "right",
        orientation: "right",
        type: "number",
        hide: (te = (G = t.axes) == null ? void 0 : G.y2) == null ? void 0 : te.hide,
        scale: Ee(($ = t.axes) == null ? void 0 : $.y2),
        domain: $e((Y = t.axes) == null ? void 0 : Y.y2),
        tickFormatter: (A) => n.value(A, d, "axis"),
        label: p ? { value: p, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((Z = t.tooltip) == null ? void 0 : Z.show) !== !1 && /* @__PURE__ */ i(
      wt,
      {
        content: /* @__PURE__ */ i(
          at,
          {
            labelFormatter: (A) => n.category(A),
            indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
            valueFormatter: Kt(n)
          }
        )
      }
    ),
    ke(t).show && /* @__PURE__ */ i(
      kt,
      {
        content: /* @__PURE__ */ i(ot, { className: ke(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: bt((Q = t.legend) == null ? void 0 : Q.position),
        layout: yt((ue = t.legend) == null ? void 0 : ue.position),
        align: xt((J = t.legend) == null ? void 0 : J.position)
      }
    ),
    o.map((A) => em(A, e, r)),
    (H = r.referenceLines) == null ? void 0 : H.map((A, F) => /* @__PURE__ */ i(
      It,
      {
        yAxisId: "left",
        ...A.axis === "y" ? { y: A.value } : { x: A.value },
        label: A.label,
        stroke: `var(--${A.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      F
    ))
  ] }) });
}
function em(e, t, n) {
  const a = e.axis === "right" ? "right" : "left", r = `var(${hr(e.member)})`, o = e.label ?? Jt(t, e.member), c = e.curve ?? n.curve ?? "monotone", s = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    Ta,
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
    or,
    {
      yAxisId: a,
      type: c,
      dataKey: e.member,
      name: o,
      stackId: e.stackId,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      fill: r,
      fillOpacity: n.fillOpacity ?? 0.25,
      dot: s,
      connectNulls: l
    },
    e.member
  ) : /* @__PURE__ */ i(
    Fa,
    {
      yAxisId: a,
      type: c,
      dataKey: e.member,
      name: o,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      dot: s,
      connectNulls: l
    },
    e.member
  );
}
function tm(e, t) {
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
  const r = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((s = (c = e.raw.query.timeDimensions) == null ? void 0 : c[0]) == null ? void 0 : s.dimension);
  return e.raw.rows.map((l) => {
    const u = r ? l[r] : void 0, d = {
      __cat: u == null ? "" : String(u)
    };
    for (const f of t) d[f.member] = nm(l[f.member]);
    return d;
  });
}
function Jt(e, t) {
  var n, a, r, o;
  return ((a = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : a.shortTitle) ?? ((o = (r = e.raw.annotation) == null ? void 0 : r.measures[t]) == null ? void 0 : o.title) ?? t;
}
function nm(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const Co = {
  bar: _u,
  line: Ru,
  area: Au,
  pie: Mu,
  scatter: Lu,
  kpi: Fu,
  table: Bu,
  combo: Zu
};
function rm({
  data: e,
  options: t,
  config: n,
  format: a,
  state: r,
  components: o,
  editing: c
}) {
  const s = wu(t);
  if (r != null && r.loading)
    return /* @__PURE__ */ i(cu, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (r != null && r.error)
    return /* @__PURE__ */ v(pr, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(Ia, {}),
      /* @__PURE__ */ i(gr, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(br, { children: r.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const l = n && Object.keys(n).length > 0 ? n : Nu(e), u = a ?? mo(e.raw.annotation, s, fr), d = (o == null ? void 0 : o[s.family]) ?? Co[s.family];
  return /* @__PURE__ */ i(
    d,
    {
      data: e,
      options: s,
      config: l,
      format: u,
      state: r,
      editing: c
    }
  );
}
const Nr = Pa(null);
Nr.displayName = "CubeVizContext";
function Ge() {
  const e = ir(Nr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function am(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Lh({
  cube: e,
  theme: t,
  locale: n,
  registry: a,
  children: r
}) {
  const o = ee(
    () => am(e) ? Vc(e) : e,
    [e]
  ), c = ee(
    () => {
      var d;
      return {
        chartRamp: (d = t == null ? void 0 : t.chartRamp) != null && d.length ? t.chartRamp : ge,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), s = ee(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), l = ee(() => a ?? {}, [a]), u = ee(
    () => ({
      cubeClient: o,
      registry: l,
      locale: s,
      theme: c
    }),
    [o, l, s, c]
  );
  return /* @__PURE__ */ i(Nr.Provider, { value: u, children: /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "cv:contents",
        c.mode === "dark" && "dark",
        c.mode === "light" && "cube-viz-light"
      ),
      children: r
    }
  ) });
}
function om(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? Co[t];
}
const im = 5e3;
function cm(e, t) {
  const { cubeClient: n } = Ge(), a = (t == null ? void 0 : t.skip) ?? !1, r = ee(
    () => e.limit === void 0 ? { ...e, limit: im } : e,
    [e]
  ), o = ee(() => JSON.stringify(r), [r]), [c, s] = dt({ isLoading: !a }), [l, u] = dt(0), d = Be(() => u((f) => f + 1), []);
  return jt(() => {
    if (a) {
      s({ isLoading: !1 });
      return;
    }
    let f = !0;
    return s((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(r, { castNumerics: !0 }).then((h) => {
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
  }, [n, o, a, l]), { ...c, refetch: d };
}
const bn = Pa(null);
bn.displayName = "DashboardContext";
function Cr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const a = e.variables, r = st(null);
  (r.current === null || r.current.key !== a) && (r.current = { store: cs(a, t), key: a });
  const o = r.current.store, c = sm(o, a);
  return Ci(bn.Provider, { value: c }, n);
}
function sm(e, t) {
  const n = Si(
    e.subscribe,
    e.getAll,
    e.getAll
  ), a = Be(
    (c, s) => e.set(c, s),
    [e]
  ), r = Be(
    (c) => is(c, e.getAll(), t),
    [e, t]
  ), o = Be(
    (c) => ns(c, e.getAll(), t),
    [e, t]
  );
  return ee(
    () => ({ vars: n, setVar: a, resolveQuery: r, resolveValue: o, decls: t }),
    [n, a, r, o, t]
  );
}
function So() {
  const e = ir(bn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function Sr() {
  return ir(bn);
}
function $n(e, t, n) {
  var p;
  const a = Sr(), { locale: r } = Ge(), o = ee(
    () => a && !(n != null && n.skipResolve) ? a.resolveQuery(e) : e,
    [a, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: c, isLoading: s, error: l, refetch: u } = cm(o, { skip: n == null ? void 0 : n.skip }), d = ((p = t.format) == null ? void 0 : p.unitSystem) ?? (r == null ? void 0 : r.unitSystem), f = ee(() => pn(r == null ? void 0 : r.units), [r == null ? void 0 : r.units]);
  return { data: ee(() => {
    if (c)
      return Qc(c, t, o, { unitSystem: d, conversions: f });
  }, [c, t, o, d, f]), isLoading: s, error: l, refetch: u, resolvedQuery: o };
}
function Ye() {
  const { cubeClient: e } = Ge(), [t, n] = dt({ isLoading: !0 });
  return jt(() => {
    let a = !0;
    return n({ isLoading: !0 }), qc(e).then((r) => {
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
function Dh() {
  const { locale: e } = Ge(), { formatValue: t, units: n } = e;
  return ee(
    () => t ?? vo(pn(n)),
    [t, n]
  );
}
function _o() {
  const [e, t] = dt(0), n = st(null), a = st(null), r = st(null), o = st(0), c = Be((u) => {
    r.current === null && (r.current = requestAnimationFrame(() => {
      r.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), s = Be(() => {
    a.current && (a.current.disconnect(), a.current = null), r.current !== null && (cancelAnimationFrame(r.current), r.current = null);
  }, []), l = Be(
    (u) => {
      if (s(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const d = u.getBoundingClientRect().width;
      d > 0 && d !== o.current && (o.current = d, t(d));
      const f = new ResizeObserver((h) => {
        var p, b;
        for (const g of h) {
          const y = ((b = (p = g.contentBoxSize) == null ? void 0 : p[0]) == null ? void 0 : b.inlineSize) ?? g.contentRect.width;
          c(y);
        }
      });
      f.observe(u), a.current = f;
    },
    [c, s]
  );
  return jt(() => s, [s]), [l, e];
}
const lm = "day";
function um(e, t) {
  var d;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, a = n == null ? void 0 : n.sparkline;
  if (!a) return null;
  const r = a.member ?? (n == null ? void 0 : n.measure), o = (d = e.timeDimensions) == null ? void 0 : d[0], c = a.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!r || !c) return null;
  const s = a.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [r],
    timeDimensions: [
      {
        dimension: c,
        granularity: a.granularity ?? lm,
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
      series: { mode: "measures", members: [r] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const ae = (e) => fe(e, "yyyy-MM-dd");
function mm(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const r = en(e[0]), o = en(e[1]);
    if (Number.isNaN(r.getTime()) || Number.isNaN(o.getTime())) return;
    const c = sc(o, r) + 1;
    return [ae(Ae(r, c)), ae(Ae(r, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const r = Ae(t, 1);
    return [ae(r), ae(r)];
  }
  if (n === "yesterday") {
    const r = Ae(t, 2);
    return [ae(r), ae(r)];
  }
  const a = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (a) {
    const r = Number(a[1]), o = a[2];
    if (o.startsWith("day")) return [ae(Ae(t, 2 * r - 1)), ae(Ae(t, r))];
    if (o.startsWith("week")) return [ae(Ae(t, 14 * r - 1)), ae(Ae(t, 7 * r))];
    if (o.startsWith("month"))
      return [ae(Sn(_n(t, 2 * r))), ae(Ae(Sn(_n(t, r)), 1))];
    if (o.startsWith("quarter"))
      return [ae(Rn(An(t, 2 * r))), ae(Ae(Rn(An(t, r)), 1))];
    if (o.startsWith("year"))
      return [ae(Mn(On(t, 2 * r))), ae(Ae(Mn(On(t, r)), 1))];
  }
  if (n === "this week") {
    const r = lc(t, 1);
    return [ae(uc(r)), ae(mc(r))];
  }
  if (n === "this month") {
    const r = _n(t, 1);
    return [ae(Sn(r)), ae(dc(r))];
  }
  if (n === "this quarter") {
    const r = An(t, 1);
    return [ae(Rn(r)), ae(vc(r))];
  }
  if (n === "this year") {
    const r = On(t, 1);
    return [ae(Mn(r)), ae(fc(r))];
  }
}
function dm(e, t) {
  var l, u;
  const n = t.familyOptions ?? {};
  let a;
  if (t.family === "bar" || t.family === "line" || t.family === "area") {
    if (!n.comparePrevious) return null;
    a = "series";
  } else if (t.family === "kpi") {
    if (((l = n.comparison) == null ? void 0 : l.mode) !== "previousPeriod") return null;
    a = "kpiRow";
  } else
    return null;
  const r = (u = e.timeDimensions) == null ? void 0 : u[0];
  if (!r) return null;
  const o = r.dateRange;
  if (o !== void 0 && typeof o == "object" && !Array.isArray(o)) return null;
  const c = mm(o);
  return c ? { query: {
    ...e,
    timeDimensions: [{ ...r, dateRange: c, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const vm = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function _r({ query: e, chart: t, onState: n, editing: a }) {
  const { registry: r, locale: o } = Ge(), c = ee(() => {
    var w;
    return (w = t.format) != null && w.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), s = ee(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: l, isLoading: u, error: d, refetch: f, resolvedQuery: h } = $n(s, c), p = ee(() => um(s, c), [s, c]), b = $n(
    (p == null ? void 0 : p.query) ?? s,
    (p == null ? void 0 : p.chart) ?? c,
    { skip: !p }
  ), g = ee(
    () => dm(h, c),
    [h, c]
  ), y = $n(
    (g == null ? void 0 : g.query) ?? s,
    c,
    { skip: !g, skipResolve: !0 }
  ), _ = ee(
    () => ({ [c.family]: om(r, c.family) }),
    [r, c.family]
  ), N = ee(() => {
    let w = l ?? vm;
    if (p && b.data && (w = { ...w, series: b.data.series, categories: b.data.categories }), g && y.data) {
      if (g.mode === "kpiRow") {
        const L = y.data.raw.rows[0];
        if (L) {
          const D = w.raw.rows[0];
          w = {
            ...w,
            raw: { ...w.raw, rows: D ? [D, L] : [L] }
          };
        }
      } else if (w.series.length > 0) {
        const L = y.data.series.map((D) => {
          const V = w.series.find((I) => I.key === D.key);
          return {
            ...D,
            key: `${D.key}__prev`,
            label: `${(V == null ? void 0 : V.label) ?? D.label} (prev)`,
            colorToken: (V == null ? void 0 : V.colorToken) ?? D.colorToken,
            meta: { ...D.meta, companion: !0 }
          };
        });
        w = { ...w, series: [...w.series, ...L] };
      }
    }
    return w;
  }, [l, p, b.data, g, y.data]);
  jt(() => {
    n == null || n({ rows: N.raw.rows, refetch: f, isLoading: u });
  }, [n, N.raw.rows, f, u]);
  const k = {}, R = ee(
    () => o.formatValue ?? vo(pn(o.units)),
    [o.formatValue, o.units]
  ), C = ee(
    () => mo(N.raw.annotation, c, R, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [N.raw.annotation, c, R, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    rm,
    {
      data: N,
      options: c,
      config: k,
      format: C,
      state: { loading: u && !l, error: d },
      components: _,
      editing: a
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
  const t = hm(e), n = ee(
    () => t ? e : null,
    [t, e]
  ), a = Xa(
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
        attributes: { class: S(Ro) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(Za, { editor: a }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
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
function sa(e) {
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
  const { goToMonth: t, nextMonth: n, previousMonth: a } = pc(), r = S(No({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
  return /* @__PURE__ */ v("div", { className: "cv:mb-2 cv:flex cv:items-center cv:justify-between cv:gap-1", children: [
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to previous month",
        disabled: !a,
        onClick: () => a && t(a),
        className: S(r, !a && "cv:opacity-40"),
        children: /* @__PURE__ */ i(lr, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:text-foreground", children: fe(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: S(r, !n && "cv:opacity-40"),
        children: /* @__PURE__ */ i(dn, { className: "cv:size-4" })
      }
    )
  ] });
}
function xm({ day: e, modifiers: t, className: n, style: a, ...r }) {
  const o = !!t.selected && !t.outside && !t.disabled, c = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...r,
      style: { ...a, color: o ? "var(--primary-foreground)" : c ? "var(--muted-foreground)" : "var(--foreground)" },
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
function Ao({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...a
}) {
  return /* @__PURE__ */ i(
    hc,
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
        MonthCaption: ym,
        DayButton: xm,
        Chevron: ({ orientation: r, className: o, ...c }) => /* @__PURE__ */ i(r === "left" ? lr : dn, { className: S("cv:size-4", o), ...c })
      },
      ...a
    }
  );
}
function Ce({
  ...e
}) {
  return /* @__PURE__ */ i(Zt.Root, { "data-slot": "popover", ...e });
}
function Se({
  ...e
}) {
  return /* @__PURE__ */ i(Zt.Trigger, { "data-slot": "popover-trigger", ...e });
}
function _e({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ i(Zt.Portal, { children: /* @__PURE__ */ i(
    Zt.Content,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: n,
      className: S(
        "cv:z-50 cv:w-72 cv:origin-[var(--radix-popover-content-transform-origin)] cv:rounded-md cv:border cv:border-border cv:bg-popover cv:p-4 cv:text-popover-foreground cv:shadow-md cv:outline-none cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        e
      ),
      ...a
    }
  ) });
}
function Oe({
  ...e
}) {
  return /* @__PURE__ */ i(be.Root, { "data-slot": "select", ...e });
}
function Yn({
  ...e
}) {
  return /* @__PURE__ */ i(be.Group, { "data-slot": "select-group", ...e });
}
function Le({
  ...e
}) {
  return /* @__PURE__ */ i(be.Value, { "data-slot": "select-value", ...e });
}
function De({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    be.Trigger,
    {
      "data-slot": "select-trigger",
      className: S(
        "cv:flex cv:h-9 cv:w-full cv:items-center cv:justify-between cv:whitespace-nowrap cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2 cv:text-sm cv:text-foreground cv:shadow-sm cv:ring-offset-background cv:placeholder:text-muted-foreground cv:focus:outline-none cv:focus:ring-1 cv:focus:ring-ring cv:disabled:cursor-not-allowed cv:disabled:opacity-50 cv:[&>span]:line-clamp-1 cv:data-[placeholder]:text-muted-foreground cv:[&_svg]:pointer-events-none cv:[&_svg]:size-4 cv:[&_svg]:shrink-0",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ i(be.Icon, { asChild: !0, children: /* @__PURE__ */ i(rt, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function wm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Li, { className: "cv:size-4" })
    }
  );
}
function km({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    be.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(rt, { className: "cv:size-4" })
    }
  );
}
function Te({
  className: e,
  children: t,
  position: n = "popper",
  ...a
}) {
  return /* @__PURE__ */ i(be.Portal, { children: /* @__PURE__ */ v(
    be.Content,
    {
      "data-slot": "select-content",
      className: S(
        "cv:relative cv:z-50 cv:max-h-[var(--radix-select-content-available-height)] cv:min-w-[8rem] cv:origin-[var(--radix-select-content-transform-origin)] cv:overflow-hidden cv:rounded-md cv:border cv:border-border cv:bg-popover cv:text-popover-foreground cv:shadow-md cv:data-[state=open]:animate-in cv:data-[state=closed]:animate-out cv:data-[state=closed]:fade-out-0 cv:data-[state=open]:fade-in-0 cv:data-[state=closed]:zoom-out-95 cv:data-[state=open]:zoom-in-95 cv:data-[side=bottom]:slide-in-from-top-2 cv:data-[side=left]:slide-in-from-right-2 cv:data-[side=right]:slide-in-from-left-2 cv:data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "cv:data-[side=bottom]:translate-y-1 cv:data-[side=left]:-translate-x-1 cv:data-[side=right]:translate-x-1 cv:data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...a,
      children: [
        /* @__PURE__ */ i(wm, {}),
        /* @__PURE__ */ i(
          be.Viewport,
          {
            className: S(
              "cv:p-1",
              n === "popper" && "cv:h-[var(--radix-select-trigger-height)] cv:w-full cv:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ i(km, {})
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
      className: S("cv:px-2 cv:py-1.5 cv:text-xs cv:font-medium cv:text-muted-foreground", e),
      ...t
    }
  );
}
function pe({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ v(
    be.Item,
    {
      "data-slot": "select-item",
      className: S(
        "cv:relative cv:flex cv:w-full cv:cursor-default cv:select-none cv:items-center cv:rounded-sm cv:py-1.5 cv:pl-2 cv:pr-8 cv:text-sm cv:outline-none cv:focus:bg-accent cv:focus:text-accent-foreground cv:data-[disabled]:pointer-events-none cv:data-[disabled]:opacity-50",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(be.ItemIndicator, { children: /* @__PURE__ */ i(je, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(be.ItemText, { children: t })
      ]
    }
  );
}
const ft = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), Nm = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", Mt = "yyyy-MM-dd";
function Cm(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function la(e) {
  if (!e) return;
  const t = Qa(e, Mt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Sm({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, r = a.presets ?? bm, [o, c] = dt(!1), s = typeof e == "string", [l, u] = Cm(e), d = la(l), f = la(u), h = d ? { from: d, to: f } : void 0;
  let p;
  s ? p = sa(e) : d && f ? p = `${fe(d, "MMM d, yyyy")} – ${fe(f, "MMM d, yyyy")}` : d ? p = fe(d, "MMM d, yyyy") : p = "Pick a date range";
  const b = a.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(Ce, { open: o, onOpenChange: c, children: [
    /* @__PURE__ */ i(Se, { asChild: !0, children: /* @__PURE__ */ v(
      W,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          p === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(ja, { className: "cv:mr-2 cv:size-4" }),
          p
        ]
      }
    ) }),
    /* @__PURE__ */ v(_e, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: r.map((g) => /* @__PURE__ */ i(
        W,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), c(!1);
          },
          children: sa(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        Ao,
        {
          mode: "range",
          selected: h,
          defaultMonth: d,
          disabled: b,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([fe(g.from, Mt), fe(g.to, Mt)]) : g != null && g.from ? t([fe(g.from, Mt), fe(g.from, Mt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const _m = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Rm(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Am(e) {
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
function Mm({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { resolveValue: r } = So(), o = a.rangeVariable ? Am(r(a.rangeVariable)) : void 0, c = a.options ?? (o !== void 0 ? Rm(o) : _m), s = typeof e == "string" ? e : "", l = c.join(",");
  return jt(() => {
    s && !c.includes(s) && t(c[0]);
  }, [s, l]), /* @__PURE__ */ v(
    Oe,
    {
      value: s,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(De, { className: ft, children: /* @__PURE__ */ i(Le, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Te, { children: c.map((u) => /* @__PURE__ */ i(pe, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Om({ value: e, onChange: t, control: n }) {
  const a = n;
  if (a.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((c) => String(c))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(ft, "cv:h-auto cv:min-h-[6rem]"),
        value: [...o],
        onChange: (c) => {
          const s = Array.from(c.target.selectedOptions, (u) => u.value), l = a.options.every((u) => typeof u.value == "number");
          t(l ? s.map((u) => Number(u)) : s);
        },
        children: a.options.map((c) => /* @__PURE__ */ i("option", { value: String(c.value), children: c.label }, String(c.value)))
      }
    );
  }
  const r = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ v(
    Oe,
    {
      value: r,
      onValueChange: (o) => {
        const c = a.options.find((s) => String(s.value) === o);
        t(c ? c.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(De, { className: ft, children: /* @__PURE__ */ i(Le, { placeholder: "—" }) }),
        /* @__PURE__ */ i(Te, { children: a.options.map((o) => /* @__PURE__ */ i(pe, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function Lm({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { meta: r, isLoading: o } = Ye(), c = ee(() => {
    if (!r) return [];
    const s = [];
    for (const l of r.cubes)
      if (!(a.cube && l.name !== a.cube)) {
        if (a.from === "measure" || a.from === "dimensionOrMeasure")
          for (const u of l.measures) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (a.from === "dimension" || a.from === "dimensionOrMeasure")
          for (const u of l.dimensions) s.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return s;
  }, [r, a.cube, a.from]);
  return /* @__PURE__ */ v(
    "select",
    {
      className: ft,
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
function Dm({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: ft,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (r) => t(r.target.value)
    }
  );
}
function Tm({ value: e, onChange: t, control: n }) {
  const a = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: ft,
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
function zm({ value: e, onChange: t, decl: n }) {
  return /* @__PURE__ */ v("label", { className: "cv:inline-flex cv:cursor-pointer cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(
      "input",
      {
        type: "checkbox",
        className: "cv:size-4 cv:rounded cv:border-input cv:text-primary cv:accent-primary cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        checked: e === !0,
        onChange: (r) => t(r.target.checked)
      }
    ),
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:text-foreground", children: n.label ?? n.name })
  ] });
}
const Fm = {
  dateRange: Sm,
  granularity: Mm,
  select: Om,
  memberSelect: Lm,
  text: Dm,
  number: Tm,
  toggle: zm
};
function $m({ control: e, title: t }) {
  var p;
  const { registry: n } = Ge(), { decls: a, resolveValue: r, setVar: o } = So(), c = ee(
    () => a.find((b) => b.name === e.variable),
    [a, e.variable]
  );
  if (!c)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const s = e.control.kind, l = ((p = n.controls) == null ? void 0 : p[s]) ?? Fm[s], u = r(e.variable), d = (b) => o(e.variable, b), f = t ?? c.label ?? c.name, h = _i();
  return s === "toggle" ? /* @__PURE__ */ i(l, { value: u, onChange: d, decl: c, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: Nm, htmlFor: h, children: f }),
    /* @__PURE__ */ i(
      l,
      {
        value: u,
        onChange: d,
        decl: c,
        control: e.control,
        controlId: h
      }
    )
  ] });
}
const Mo = x.forwardRef(
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
Mo.displayName = "Card";
const Oo = x.forwardRef(
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
Oo.displayName = "CardHeader";
const Lo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
Lo.displayName = "CardTitle";
const Em = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
Em.displayName = "CardDescription";
const Pm = x.forwardRef(
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
Pm.displayName = "CardAction";
const Do = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
Do.displayName = "CardContent";
const Im = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
Im.displayName = "CardFooter";
const an = "cube-viz-drag-handle";
function To(e) {
  var s;
  const { registry: t } = Ge(), n = (s = t.chrome) == null ? void 0 : s.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: a, menu: r, dragHandleProps: o, children: c } = e;
  return /* @__PURE__ */ v(Mo, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    a ? /* @__PURE__ */ v(
      Oo,
      {
        ...o,
        className: S(
          an,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(Lo, { className: "cv:truncate cv:text-sm cv:font-semibold", children: a }),
          r
        ]
      }
    ) : null,
    /* @__PURE__ */ i(Do, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: c })
  ] });
}
function jm(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const c = o == null ? "" : String(o);
    return /[",\n\r]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
  }, a = t.map(n).join(","), r = e.map((o) => t.map((c) => n(o[c])).join(",")).join(`
`);
  return `${a}
${r}`;
}
function Vm(e, t, n = "text/csv;charset=utf-8") {
  const a = new Blob([e], { type: n }), r = URL.createObjectURL(a), o = document.createElement("a");
  o.href = r, o.download = t, o.click(), URL.revokeObjectURL(r);
}
function qm(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), a = n.createElement("base"), r = n.createElement("a");
  return n.head.appendChild(a), n.body.appendChild(r), t && (a.href = t), r.href = e, r.href;
}
const Km = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function He(e) {
  const t = [];
  for (let n = 0, a = e.length; n < a; n++)
    t.push(e[n]);
  return t;
}
let it = null;
function zo(e = {}) {
  return it || (e.includeStyleProperties ? (it = e.includeStyleProperties, it) : (it = He(window.getComputedStyle(document.documentElement)), it));
}
function on(e, t) {
  const a = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return a ? parseFloat(a.replace("px", "")) : 0;
}
function Bm(e) {
  const t = on(e, "border-left-width"), n = on(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Hm(e) {
  const t = on(e, "border-top-width"), n = on(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function Fo(e, t = {}) {
  const n = t.width || Bm(e), a = t.height || Hm(e);
  return { width: n, height: a };
}
function Wm() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const xe = 16384;
function Um(e) {
  (e.width > xe || e.height > xe) && (e.width > xe && e.height > xe ? e.width > e.height ? (e.height *= xe / e.width, e.width = xe) : (e.width *= xe / e.height, e.height = xe) : e.width > xe ? (e.height *= xe / e.width, e.width = xe) : (e.width *= xe / e.height, e.height = xe));
}
function cn(e) {
  return new Promise((t, n) => {
    const a = new Image();
    a.onload = () => {
      a.decode().then(() => {
        requestAnimationFrame(() => t(a));
      });
    }, a.onerror = n, a.crossOrigin = "anonymous", a.decoding = "async", a.src = e;
  });
}
async function Gm(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Ym(e, t, n) {
  const a = "http://www.w3.org/2000/svg", r = document.createElementNS(a, "svg"), o = document.createElementNS(a, "foreignObject");
  return r.setAttribute("width", `${t}`), r.setAttribute("height", `${n}`), r.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), r.appendChild(o), o.appendChild(e), Gm(r);
}
const ye = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || ye(n, t);
};
function Qm(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Jm(e, t) {
  return zo(t).map((n) => {
    const a = e.getPropertyValue(n), r = e.getPropertyPriority(n);
    return `${n}: ${a}${r ? " !important" : ""};`;
  }).join(" ");
}
function Xm(e, t, n, a) {
  const r = `.${e}:${t}`, o = n.cssText ? Qm(n) : Jm(n, a);
  return document.createTextNode(`${r}{${o}}`);
}
function ua(e, t, n, a) {
  const r = window.getComputedStyle(e, n), o = r.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const c = Km();
  try {
    t.className = `${t.className} ${c}`;
  } catch {
    return;
  }
  const s = document.createElement("style");
  s.appendChild(Xm(c, n, r, a)), t.appendChild(s);
}
function Zm(e, t, n) {
  ua(e, t, ":before", n), ua(e, t, ":after", n);
}
const ma = "application/font-woff", da = "image/jpeg", ed = {
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
function td(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Rr(e) {
  const t = td(e).toLowerCase();
  return ed[t] || "";
}
function nd(e) {
  return e.split(/,/)[1];
}
function Jn(e) {
  return e.search(/^(data:)/) !== -1;
}
function rd(e, t) {
  return `data:${t};base64,${e}`;
}
async function $o(e, t, n) {
  const a = await fetch(e, t);
  if (a.status === 404)
    throw new Error(`Resource "${a.url}" not found`);
  const r = await a.blob();
  return new Promise((o, c) => {
    const s = new FileReader();
    s.onerror = c, s.onloadend = () => {
      try {
        o(n({ res: a, result: s.result }));
      } catch (l) {
        c(l);
      }
    }, s.readAsDataURL(r);
  });
}
const En = {};
function ad(e, t, n) {
  let a = e.replace(/\?.*/, "");
  return n && (a = e), /ttf|otf|eot|woff2?/i.test(a) && (a = a.replace(/.*\//, "")), t ? `[${t}]${a}` : a;
}
async function Ar(e, t, n) {
  const a = ad(e, t, n.includeQueryParams);
  if (En[a] != null)
    return En[a];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let r;
  try {
    const o = await $o(e, n.fetchRequestInit, ({ res: c, result: s }) => (t || (t = c.headers.get("Content-Type") || ""), nd(s)));
    r = rd(o, t);
  } catch (o) {
    r = n.imagePlaceholder || "";
    let c = `Failed to fetch resource: ${e}`;
    o && (c = typeof o == "string" ? o : o.message), c && console.warn(c);
  }
  return En[a] = r, r;
}
async function od(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : cn(t);
}
async function id(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), c = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, c == null || c.drawImage(e, 0, 0, o.width, o.height);
    const s = o.toDataURL();
    return cn(s);
  }
  const n = e.poster, a = Rr(n), r = await Ar(n, a, t);
  return cn(r);
}
async function cd(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await yn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function sd(e, t) {
  return ye(e, HTMLCanvasElement) ? od(e) : ye(e, HTMLVideoElement) ? id(e, t) : ye(e, HTMLIFrameElement) ? cd(e, t) : e.cloneNode(Eo(e));
}
const ld = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Eo = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function ud(e, t, n) {
  var a, r;
  if (Eo(t))
    return t;
  let o = [];
  return ld(e) && e.assignedNodes ? o = He(e.assignedNodes()) : ye(e, HTMLIFrameElement) && (!((a = e.contentDocument) === null || a === void 0) && a.body) ? o = He(e.contentDocument.body.childNodes) : o = He(((r = e.shadowRoot) !== null && r !== void 0 ? r : e).childNodes), o.length === 0 || ye(e, HTMLVideoElement) || await o.reduce((c, s) => c.then(() => yn(s, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function md(e, t, n) {
  const a = t.style;
  if (!a)
    return;
  const r = window.getComputedStyle(e);
  r.cssText ? (a.cssText = r.cssText, a.transformOrigin = r.transformOrigin) : zo(n).forEach((o) => {
    let c = r.getPropertyValue(o);
    o === "font-size" && c.endsWith("px") && (c = `${Math.floor(parseFloat(c.substring(0, c.length - 2))) - 0.1}px`), ye(e, HTMLIFrameElement) && o === "display" && c === "inline" && (c = "block"), o === "d" && t.getAttribute("d") && (c = `path(${t.getAttribute("d")})`), a.setProperty(o, c, r.getPropertyPriority(o));
  });
}
function dd(e, t) {
  ye(e, HTMLTextAreaElement) && (t.innerHTML = e.value), ye(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function vd(e, t) {
  if (ye(e, HTMLSelectElement)) {
    const a = Array.from(t.children).find((r) => e.value === r.getAttribute("value"));
    a && a.setAttribute("selected", "");
  }
}
function fd(e, t, n) {
  return ye(t, Element) && (md(e, t, n), Zm(e, t, n), dd(e, t), vd(e, t)), t;
}
async function hd(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const a = {};
  for (let o = 0; o < n.length; o++) {
    const s = n[o].getAttribute("xlink:href");
    if (s) {
      const l = e.querySelector(s), u = document.querySelector(s);
      !l && u && !a[s] && (a[s] = await yn(u, t, !0));
    }
  }
  const r = Object.values(a);
  if (r.length) {
    const o = "http://www.w3.org/1999/xhtml", c = document.createElementNS(o, "svg");
    c.setAttribute("xmlns", o), c.style.position = "absolute", c.style.width = "0", c.style.height = "0", c.style.overflow = "hidden", c.style.display = "none";
    const s = document.createElementNS(o, "defs");
    c.appendChild(s);
    for (let l = 0; l < r.length; l++)
      s.appendChild(r[l]);
    e.appendChild(c);
  }
  return e;
}
async function yn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((a) => sd(a, t)).then((a) => ud(e, a, t)).then((a) => fd(e, a, t)).then((a) => hd(a, t));
}
const Po = /url\((['"]?)([^'"]+?)\1\)/g, pd = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, gd = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function bd(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function yd(e) {
  const t = [];
  return e.replace(Po, (n, a, r) => (t.push(r), n)), t.filter((n) => !Jn(n));
}
async function xd(e, t, n, a, r) {
  try {
    const o = n ? qm(t, n) : t, c = Rr(t);
    let s;
    return r || (s = await Ar(o, c, a)), e.replace(bd(t), `$1${s}$3`);
  } catch {
  }
  return e;
}
function wd(e, { preferredFontFormat: t }) {
  return t ? e.replace(gd, (n) => {
    for (; ; ) {
      const [a, , r] = pd.exec(n) || [];
      if (!r)
        return "";
      if (r === t)
        return `src: ${a};`;
    }
  }) : e;
}
function Io(e) {
  return e.search(Po) !== -1;
}
async function jo(e, t, n) {
  if (!Io(e))
    return e;
  const a = wd(e, n);
  return yd(a).reduce((o, c) => o.then((s) => xd(s, c, t, n)), Promise.resolve(a));
}
async function ct(e, t, n) {
  var a;
  const r = (a = t.style) === null || a === void 0 ? void 0 : a.getPropertyValue(e);
  if (r) {
    const o = await jo(r, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function kd(e, t) {
  await ct("background", e, t) || await ct("background-image", e, t), await ct("mask", e, t) || await ct("-webkit-mask", e, t) || await ct("mask-image", e, t) || await ct("-webkit-mask-image", e, t);
}
async function Nd(e, t) {
  const n = ye(e, HTMLImageElement);
  if (!(n && !Jn(e.src)) && !(ye(e, SVGImageElement) && !Jn(e.href.baseVal)))
    return;
  const a = n ? e.src : e.href.baseVal, r = await Ar(a, Rr(a), t);
  await new Promise((o, c) => {
    e.onload = o, e.onerror = t.onImageErrorHandler ? (...l) => {
      try {
        o(t.onImageErrorHandler(...l));
      } catch (u) {
        c(u);
      }
    } : c;
    const s = e;
    s.decode && (s.decode = o), s.loading === "lazy" && (s.loading = "eager"), n ? (e.srcset = "", e.src = r) : e.href.baseVal = r;
  });
}
async function Cd(e, t) {
  const a = He(e.childNodes).map((r) => Vo(r, t));
  await Promise.all(a).then(() => e);
}
async function Vo(e, t) {
  ye(e, Element) && (await kd(e, t), await Nd(e, t), await Cd(e, t));
}
function Sd(e, t) {
  const { style: n } = e;
  t.backgroundColor && (n.backgroundColor = t.backgroundColor), t.width && (n.width = `${t.width}px`), t.height && (n.height = `${t.height}px`);
  const a = t.style;
  return a != null && Object.keys(a).forEach((r) => {
    n[r] = a[r];
  }), e;
}
const va = {};
async function fa(e) {
  let t = va[e];
  if (t != null)
    return t;
  const a = await (await fetch(e)).text();
  return t = { url: e, cssText: a }, va[e] = t, t;
}
async function ha(e, t) {
  let n = e.cssText;
  const a = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (c) => {
    let s = c.replace(a, "$1");
    return s.startsWith("https://") || (s = new URL(s, e.url).href), $o(s, t.fetchRequestInit, ({ result: l }) => (n = n.replace(c, `url(${l})`), [c, l]));
  });
  return Promise.all(o).then(() => n);
}
function pa(e) {
  if (e == null)
    return [];
  const t = [], n = /(\/\*[\s\S]*?\*\/)/gi;
  let a = e.replace(n, "");
  const r = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  for (; ; ) {
    const l = r.exec(a);
    if (l === null)
      break;
    t.push(l[0]);
  }
  a = a.replace(r, "");
  const o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, c = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", s = new RegExp(c, "gi");
  for (; ; ) {
    let l = o.exec(a);
    if (l === null) {
      if (l = s.exec(a), l === null)
        break;
      o.lastIndex = s.lastIndex;
    } else
      s.lastIndex = o.lastIndex;
    t.push(l[0]);
  }
  return t;
}
async function _d(e, t) {
  const n = [], a = [];
  return e.forEach((r) => {
    if ("cssRules" in r)
      try {
        He(r.cssRules || []).forEach((o, c) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let s = c + 1;
            const l = o.href, u = fa(l).then((d) => ha(d, t)).then((d) => pa(d).forEach((f) => {
              try {
                r.insertRule(f, f.startsWith("@import") ? s += 1 : r.cssRules.length);
              } catch (h) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: h
                });
              }
            })).catch((d) => {
              console.error("Error loading remote css", d.toString());
            });
            a.push(u);
          }
        });
      } catch (o) {
        const c = e.find((s) => s.href == null) || document.styleSheets[0];
        r.href != null && a.push(fa(r.href).then((s) => ha(s, t)).then((s) => pa(s).forEach((l) => {
          c.insertRule(l, c.cssRules.length);
        })).catch((s) => {
          console.error("Error loading remote stylesheet", s);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(a).then(() => (e.forEach((r) => {
    if ("cssRules" in r)
      try {
        He(r.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${r.href}`, o);
      }
  }), n));
}
function Rd(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => Io(t.style.getPropertyValue("src")));
}
async function Ad(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = He(e.ownerDocument.styleSheets), a = await _d(n, t);
  return Rd(a);
}
function qo(e) {
  return e.trim().replace(/["']/g, "");
}
function Md(e) {
  const t = /* @__PURE__ */ new Set();
  function n(a) {
    (a.style.fontFamily || getComputedStyle(a).fontFamily).split(",").forEach((o) => {
      t.add(qo(o));
    }), Array.from(a.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function Od(e, t) {
  const n = await Ad(e, t), a = Md(e);
  return (await Promise.all(n.filter((o) => a.has(qo(o.style.fontFamily))).map((o) => {
    const c = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return jo(o.cssText, c, t);
  }))).join(`
`);
}
async function Ld(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Od(e, t);
  if (n) {
    const a = document.createElement("style"), r = document.createTextNode(n);
    a.appendChild(r), e.firstChild ? e.insertBefore(a, e.firstChild) : e.appendChild(a);
  }
}
async function Dd(e, t = {}) {
  const { width: n, height: a } = Fo(e, t), r = await yn(e, t, !0);
  return await Ld(r, t), await Vo(r, t), Sd(r, t), await Ym(r, n, a);
}
async function Td(e, t = {}) {
  const { width: n, height: a } = Fo(e, t), r = await Dd(e, t), o = await cn(r), c = document.createElement("canvas"), s = c.getContext("2d"), l = t.pixelRatio || Wm(), u = t.canvasWidth || n, d = t.canvasHeight || a;
  return c.width = u * l, c.height = d * l, t.skipAutoScale || Um(c), c.style.width = `${u}`, c.style.height = `${d}`, t.backgroundColor && (s.fillStyle = t.backgroundColor, s.fillRect(0, 0, c.width, c.height)), s.drawImage(o, 0, 0, c.width, c.height), c;
}
async function zd(e, t = {}) {
  return (await Td(e, t)).toDataURL();
}
function Fd(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function $d(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Ed(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Pd(e, t, n = 2) {
  const a = await zd(e, {
    pixelRatio: n,
    backgroundColor: Ed(e),
    cacheBust: !0
  });
  $d(a, `${Fd(t)}.png`);
}
function Id({
  title: e,
  rows: t,
  refetch: n,
  captureRef: a
}) {
  const [r, o] = x.useState(!1), c = t.length > 0, s = !!a;
  if (!c && !n && !s) return null;
  const l = () => {
    const h = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    Vm(jm(t), `${h}.csv`);
  }, u = async () => {
    const h = a == null ? void 0 : a.current;
    if (!(!h || r)) {
      o(!0);
      try {
        await Pd(h, e);
      } finally {
        o(!1);
      }
    }
  }, d = (h) => h.stopPropagation(), f = (h = !0) => S(
    "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
    !h && "cv:cursor-not-allowed cv:opacity-50"
  );
  return /* @__PURE__ */ v(Ce, { children: [
    /* @__PURE__ */ i(
      Se,
      {
        onMouseDown: d,
        onPointerDown: d,
        onTouchStart: d,
        className: "cv:rounded-md cv:p-1 cv:text-muted-foreground cv:transition-colors cv:hover:bg-accent cv:hover:text-foreground",
        "aria-label": "Chart actions",
        title: "Actions",
        children: /* @__PURE__ */ i(Di, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(_e, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: d, onPointerDown: d, onTouchStart: d, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ i(Ti, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      s ? /* @__PURE__ */ v("button", { type: "button", onClick: u, disabled: r, className: f(!r), children: [
        /* @__PURE__ */ i(zi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: l, disabled: !c, className: f(c), children: [
        /* @__PURE__ */ i(Fi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export CSV"
      ] })
    ] })
  ] });
}
function ga({
  widget: e,
  onState: t
}) {
  switch (e.type) {
    case "chart":
      return /* @__PURE__ */ i(_r, { query: e.query, chart: e.chart, onState: t });
    case "text":
      return /* @__PURE__ */ i(pm, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i($m, { control: e.control, title: e.title });
  }
}
function Ko({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [a, r] = dt({ rows: [] }), o = Be(
    (l) => r({ rows: l.rows, refetch: l.refetch }),
    []
  ), c = st(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(ga, { widget: e }) });
  const s = n ? null : /* @__PURE__ */ i(
    Id,
    {
      title: e.title,
      rows: a.rows,
      refetch: a.refetch,
      captureRef: c
    }
  );
  return /* @__PURE__ */ i(
    To,
    {
      widget: e,
      title: e.title,
      menu: s,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: c, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(ga, { widget: e, onState: o }) })
    }
  );
}
const jd = "lg";
function Vd(e) {
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
function qd(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Th({ spec: e, editable: t = !1 }) {
  const [n, a] = _o(), r = e.grid ?? {}, o = r.cols ?? 12, c = r.rowHeight ?? 40, s = r.margin ?? [12, 12], l = r.containerPadding ?? [0, 0], { breakpoints: u, cols: d } = ee(
    () => Vd(o),
    [o]
  ), f = ee(
    () => ({ [jd]: qd(e.layout) }),
    [e.layout]
  ), h = ee(
    () => new Map(e.widgets.map((p) => [p.id, p])),
    [e.widgets]
  );
  return /* @__PURE__ */ i(Cr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "cv:w-full", children: a > 0 ? /* @__PURE__ */ i(
    Ja,
    {
      width: a,
      layouts: f,
      breakpoints: u,
      cols: d,
      rowHeight: c,
      margin: s,
      containerPadding: l,
      dragConfig: { enabled: t, handle: `.${an}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((p) => {
        const b = h.get(p.i);
        return b ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(Ko, { widget: b, editable: t }) }, p.i) : null;
      })
    }
  ) : null }) });
}
function zh({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
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
function Ze(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function wn(e) {
  return e ? e.cubes.filter((t) => Ze(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: xn(t)
  })) : [];
}
function zt(e, t) {
  if (!(!e || !t))
    return wn(e).find((n) => n.name === t);
}
function Mr(e) {
  return e.shortTitle || e.title || e.name;
}
function sn(e, t) {
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
    quantity: sn(n, "quantity"),
    unit: sn(n, "unit")
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
    quantity: sn(n, "quantity"),
    unit: sn(n, "unit")
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
  const a = [];
  for (const r of e.cubes) {
    if (!Ze(r) || n && r.name !== n) continue;
    const o = xn(r), c = (s) => {
      s.connectedComponent = o, a.push(s);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const s of r.measures)
        Ze(s) && c(Bo(s, r.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const s of r.dimensions)
        Ze(s) && s.type !== "time" && c(Xn(s, r.name));
    if (t === "time")
      for (const s of r.dimensions)
        Ze(s) && s.type === "time" && c(Xn(s, r.name));
  }
  return a;
}
function Kd(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, a = [];
  for (const r of e.cubes) {
    if (!Ze(r) || n && !n.has(r.name)) continue;
    const o = xn(r);
    for (const c of r.segments) {
      if (!Ze(c)) continue;
      const s = Ho(c, r.name);
      s.connectedComponent = o, a.push(s);
    }
  }
  return a;
}
function Fe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const a = xn(n), r = (s) => (s && (s.connectedComponent = a), s), o = n.measures.find((s) => s.name === t) ?? n.dimensions.find((s) => s.name === t);
      if (o)
        return o.type ? "aggType" in o ? r(Bo(o, n.name)) : r(Xn(o, n.name)) : void 0;
      const c = n.segments.find((s) => s.name === t);
      if (c) return r(Ho(c, n.name));
    }
}
function Bd(e) {
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
function Ot(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Uo(e) {
  var c, s, l, u, d;
  const t = e.query, n = (c = t.measures) == null ? void 0 : c.find(Boolean);
  if (n) return Ot(n);
  const a = (s = t.dimensions) == null ? void 0 : s.find(Boolean);
  if (a) return Ot(a);
  const r = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (r) return Ot(r);
  const o = (d = e.chart.mapping) == null ? void 0 : d.category.member;
  return Ot(o);
}
function ht(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function Nt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function we(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Qe(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Go(e, t) {
  const n = {};
  for (const r of e) {
    const o = t[r];
    o && Object.keys(o).length > 0 && (n[r] = o);
  }
  const a = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (a.meta = n), a;
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
}, Hd = "day";
function Wd(e, t) {
  var u, d, f, h;
  const { query: n, chart: a } = e, r = ht(a).length ? ht(a) : n.measures ?? [], o = we(a) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((f = (d = n.timeDimensions) == null ? void 0 : d[0]) == null ? void 0 : f.dimension), c = o ? { category: { member: o }, series: { mode: "measures", members: r } } : void 0, s = {
    ...e,
    chart: { ...a, family: t, mapping: void 0, familyOptions: void 0 }
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
          series: r.map((p, b) => ({ member: p, render: b % 2 === 1 ? "bar" : "line" }))
        }
      });
    case "kpi":
      return l({
        familyOptions: { display: "number", ...r[0] ? { measure: r[0] } : {} }
      });
    case "scatter":
      return l({
        familyOptions: {
          ...r[0] ? { x: r[0] } : {},
          ...r[1] ? { y: r[1] } : {}
        }
      });
    case "table": {
      const p = [
        ...n.dimensions ?? [],
        ...((h = n.timeDimensions) == null ? void 0 : h.map((b) => b.dimension)) ?? [],
        ...r
      ].map((b) => ({ member: b }));
      return l({ familyOptions: p.length ? { columns: p } : void 0 });
    }
  }
}
function Rt(e) {
  return eu(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function tr(e) {
  return nu(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
const ba = "a date or category";
function Ud(e) {
  switch (e) {
    case "bar":
    case "line":
    case "area":
      return [
        { id: "y", label: "Values", hint: "the numbers to show", cardinality: "many", kinds: ["number"] },
        { id: "x", label: "Category", hint: ba, cardinality: "one", kinds: ["time", "category"] },
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
        { id: "x", label: "Category", hint: ba, cardinality: "one", kinds: ["time", "category"] },
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
function Ne(e) {
  return e.chart.familyOptions ?? {};
}
function kn(e) {
  const t = Ne(e).series;
  return Array.isArray(t) ? t : [];
}
function Or(e) {
  const t = Ne(e).columns;
  return Array.isArray(t) ? t : [];
}
function Gd(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Bt(e) {
  var r;
  const { chart: t } = e, n = t.family, a = (o) => o ? [o] : [];
  switch (n) {
    case "bar":
    case "line":
    case "area": {
      const o = Gd(e), c = (r = t.mapping) == null ? void 0 : r.series;
      return { y: c && c.mode === "pivot" ? c.values && c.values.length > 0 ? c.values : a(c.value) : ht(t), x: a(we(t)), color: a(o) };
    }
    case "combo":
      return {
        x: a(we(t)),
        y: kn(e).map((o) => o.member)
      };
    case "pie":
      return { slices: a(we(t)), size: a(ht(t)[0]) };
    case "scatter": {
      const o = Ne(e);
      return {
        sx: a(o.x),
        sy: a(o.y),
        size: a(o.size),
        color: a(o.groupBy)
      };
    }
    case "kpi":
      return { value: a(Ne(e).measure) };
    case "table":
      return { columns: Or(e).map((o) => o.member) };
  }
}
function Nn(e) {
  const t = Yd(e);
  return t === void 0 ? Hd : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Yd(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function Ht(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function tt(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Ct(e, t) {
  return { ...e, dimensions: Ht(e.dimensions, t) };
}
function Pe(e, t) {
  const n = tt(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Ve(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function nt(e, t, n) {
  if (e)
    return { category: { member: e }, series: Go(t, n) };
}
function ln(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function un(e, t, n, a) {
  if (!e || t.length === 0) return;
  const r = {};
  for (const s of t) {
    const l = a == null ? void 0 : a[s];
    l && Object.keys(l).length > 0 && (r[s] = l);
  }
  const o = Object.keys(r).length > 0, c = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: r } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: r } : {} };
  return { category: { member: e }, series: c };
}
function ya(e, t, n, a, r) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Jd(e, n, a, r);
    case "combo":
      return ev(e, n, a, r);
    case "pie":
      return rv(e, n, a, r);
    case "scatter":
      return ov(e, n, a);
    case "kpi":
      return cv(e, a);
    case "table":
      return lv(e, a, r);
  }
}
function Qd(e, t, n, a) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Zd(e, n, a);
    case "combo":
      return nv(e, n, a);
    case "pie":
      return av(e, n, a);
    case "scatter":
      return iv(e, n, a);
    case "kpi":
      return sv(e, a);
    case "table":
      return uv(e, a);
  }
}
function Jd(e, t, n, a) {
  const { query: r, chart: o } = e, c = Bt(e), s = c.color[0], l = we(o), u = Nt(o);
  if (t === "y") {
    const d = c.y, f = Ht(d, n);
    return s ? {
      ...e,
      query: { ...r, measures: f },
      chart: { ...o, mapping: un(l, f, s, ln(o)) }
    } : {
      ...e,
      query: { ...r, measures: f },
      chart: { ...o, mapping: nt(l, f, u) }
    };
  }
  if (t === "x")
    return Xd(e, n, a, s);
  if (t === "color") {
    const d = c.y;
    if (d.length === 0) return e;
    const f = Ct({ ...r, measures: d }, n);
    return {
      ...e,
      query: f,
      chart: { ...o, mapping: un(l, d, n, ln(o)) }
    };
  }
  return e;
}
function Xd(e, t, n, a) {
  const { query: r, chart: o } = e, c = we(o), s = Bt(e).y, l = Nt(o);
  let u = r;
  const d = Qe(r);
  if (d && c === d.dimension ? u = Ve(u, void 0) : c && (u = Pe(u, c)), n === "time") {
    const h = (d == null ? void 0 : d.granularity) ?? Nn(d == null ? void 0 : d.dateRange);
    u = Ve(u, {
      dimension: t,
      granularity: h,
      dateRange: d == null ? void 0 : d.dateRange
    });
  } else
    u = Ct(u, t);
  const f = a ? un(t, s, a, ln(o)) : nt(t, s, l);
  return { ...e, query: u, chart: { ...o, mapping: f } };
}
function Zd(e, t, n) {
  const { query: a, chart: r } = e, o = Bt(e), c = we(r), s = o.color[0], l = Nt(r);
  if (t === "y") {
    const u = tt(o.y, n);
    if (s && u.length >= 1)
      return {
        ...e,
        query: { ...a, measures: u },
        chart: { ...r, mapping: un(c, u, s, ln(r)) }
      };
    const d = s ? Pe({ ...a, measures: u }, s) : { ...a, measures: u };
    return { ...e, query: d, chart: { ...r, mapping: nt(c, u, l) } };
  }
  if (t === "x") {
    let u = a;
    const d = Qe(a);
    return d && d.dimension === n ? u = Ve(u, void 0) : u = Pe(u, n), { ...e, query: u, chart: { ...r, mapping: void 0 } };
  }
  if (t === "color") {
    const u = Pe(a, n);
    return {
      ...e,
      query: u,
      chart: { ...r, mapping: nt(c, o.y, l) }
    };
  }
  return e;
}
const xa = ["line", "bar"];
function ev(e, t, n, a) {
  const { query: r, chart: o } = e, c = Ne(e);
  if (t === "x") {
    let s = r;
    const l = we(o), u = Qe(r);
    if (u && l === u.dimension ? s = Ve(s, void 0) : l && (s = Pe(s, l)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? Nn(u == null ? void 0 : u.dateRange);
      s = Ve(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Ct(s, n);
    return { ...e, query: s, chart: { ...o, mapping: { category: { member: n }, series: tv(e) } } };
  }
  if (t === "y") {
    const s = kn(e);
    if (s.some((d) => d.member === n)) return e;
    const l = xa[s.length % xa.length], u = [...s, { member: n, render: l }];
    return {
      ...e,
      query: { ...r, measures: Ht(r.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...c, series: u }, mapping: Qo(o, u) }
    };
  }
  return e;
}
function Qo(e, t) {
  const n = we(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((a) => a.member) } } : e.mapping;
}
function tv(e) {
  return { mode: "measures", members: kn(e).map((t) => t.member) };
}
function nv(e, t, n) {
  const { query: a, chart: r } = e, o = Ne(e);
  if (t === "x") {
    let c = a;
    const s = Qe(a);
    return s && s.dimension === n ? c = Ve(c, void 0) : c = Pe(c, n), { ...e, query: c, chart: { ...r, mapping: void 0 } };
  }
  if (t === "y") {
    const c = kn(e).filter((l) => l.member !== n), s = tt(a.measures, n);
    return {
      ...e,
      query: { ...a, measures: s },
      chart: { ...r, familyOptions: { ...o, series: c }, mapping: Qo(r, c) }
    };
  }
  return e;
}
function rv(e, t, n, a) {
  const { query: r, chart: o } = e, c = Nt(o);
  if (t === "slices") {
    let s = r;
    const l = we(o), u = Qe(r);
    if (u && l === u.dimension ? s = Ve(s, void 0) : l && (s = Pe(s, l)), a === "time") {
      const d = (u == null ? void 0 : u.granularity) ?? Nn(u == null ? void 0 : u.dateRange);
      s = Ve(s, { dimension: n, granularity: d, dateRange: u == null ? void 0 : u.dateRange });
    } else
      s = Ct(s, n);
    return {
      ...e,
      query: s,
      chart: { ...o, mapping: nt(n, ht(o), c) }
    };
  }
  if (t === "size") {
    const s = [n];
    return {
      ...e,
      query: { ...r, measures: s },
      chart: { ...o, mapping: nt(we(o), s, c) }
    };
  }
  return e;
}
function av(e, t, n) {
  const { query: a, chart: r } = e, o = Nt(r);
  if (t === "slices") {
    let c = a;
    const s = Qe(a);
    return s && s.dimension === n ? c = Ve(c, void 0) : c = Pe(c, n), { ...e, query: c, chart: { ...r, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...a, measures: [] },
    chart: { ...r, mapping: nt(we(r), [], o) }
  } : e;
}
const Jo = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function ov(e, t, n) {
  const a = Jo[t];
  if (!a) return e;
  const { query: r, chart: o } = e, c = { ...Ne(e) }, s = c[a];
  c[a] = n;
  let l = r;
  if (a === "groupBy")
    s && s !== n && (l = Pe(l, s)), l = Ct(l, n);
  else {
    const u = s ? tt(r.measures, s) : r.measures;
    l = { ...r, measures: Ht(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: c } };
}
function iv(e, t, n) {
  const a = Jo[t];
  if (!a) return e;
  const { query: r, chart: o } = e, c = { ...Ne(e) };
  delete c[a];
  let s = r;
  if (a === "groupBy") s = Pe(s, n);
  else {
    const l = tt(r.measures, n);
    s = { ...r, measures: l.length ? l : [] };
  }
  return { ...e, query: s, chart: { ...o, familyOptions: c } };
}
function cv(e, t) {
  const { query: n, chart: a } = e, r = { ...Ne(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...a, familyOptions: r } };
}
function sv(e, t) {
  const { query: n, chart: a } = e, r = { ...Ne(e) };
  return r.measure === t && delete r.measure, { ...e, query: { ...n, measures: [] }, chart: { ...a, familyOptions: r } };
}
function lv(e, t, n) {
  const { query: a, chart: r } = e, o = Or(e);
  if (o.some((l) => l.member === t)) return e;
  let c = a;
  if (n === "number") c = { ...a, measures: Ht(a.measures, t) };
  else if (n === "time") {
    const l = Qe(a), u = (l == null ? void 0 : l.granularity) ?? Nn(l == null ? void 0 : l.dateRange), d = a.timeDimensions ?? [];
    d.some((f) => f.dimension === t) || (c = { ...a, timeDimensions: [...d, { dimension: t, granularity: u }] });
  } else c = Ct(a, t);
  const s = { ...Ne(e), columns: [...o, { member: t }] };
  return { ...e, query: c, chart: { ...r, familyOptions: s } };
}
function uv(e, t) {
  var d, f, h;
  const { query: n, chart: a } = e, r = Or(e).filter((p) => p.member !== t);
  let o = n;
  const c = tt(n.measures, t);
  c.length !== (((d = n.measures) == null ? void 0 : d.length) ?? 0) && (o = { ...o, measures: c.length ? c : void 0 });
  const s = tt(n.dimensions, t);
  s.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: s.length ? s : void 0 });
  const l = (n.timeDimensions ?? []).filter((p) => p.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...Ne(e), columns: r };
  return { ...e, query: o, chart: { ...a, familyOptions: u } };
}
const ve = x.forwardRef(
  ({ className: e, type: t, ...n }, a) => /* @__PURE__ */ i(
    "input",
    {
      ref: a,
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
function mn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(qa, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(Va, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(ur, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function Xo({
  cube: e,
  cubes: t,
  kind: n,
  value: a,
  onChange: r,
  placeholder: o = "Select member…",
  disabled: c,
  id: s,
  className: l
}) {
  const { meta: u, isLoading: d } = Ye(), f = x.useMemo(() => {
    if (t) {
      const b = new Set(t);
      return Zn(u, n).filter((g) => b.has(g.cube));
    }
    return Zn(u, n, e);
  }, [u, n, e, t]), h = x.useMemo(() => mv(f), [f]), p = f.find((b) => b.name === a);
  return /* @__PURE__ */ v(Oe, { value: a, onValueChange: r, disabled: c || d, children: [
    /* @__PURE__ */ i(De, { id: s, className: l, children: /* @__PURE__ */ i(Le, { placeholder: d ? "Loading…" : o, children: p ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      mn(p.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(Te, { children: h.map(([b, g]) => /* @__PURE__ */ v(Yn, { children: [
      h.length > 1 ? /* @__PURE__ */ i(Qn, { children: b }) : null,
      g.map((y) => /* @__PURE__ */ i(pe, { value: y.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        mn(y.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: y.label })
      ] }) }, y.name))
    ] }, b)) })
  ] });
}
function mv(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.cube);
    a ? a.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function Et({
  options: e,
  value: t,
  onChange: n,
  fullWidth: a = !0,
  size: r = "default",
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
              r === "sm" ? "cv:h-7 cv:px-2 cv:text-xs" : "cv:h-7 cv:px-2.5 cv:text-sm",
              a && "cv:flex-1",
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
const dv = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(Va, { className: "cv:size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(ur, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(qa, { className: "cv:size-3" }), metaKind: "time" }
}, vv = ["number", "category", "time"];
function Zo({
  well: e,
  placed: t,
  scope: n,
  blockReason: a,
  onSelect: r,
  align: o = "start",
  side: c = "bottom",
  children: s
}) {
  var j, B;
  const { meta: l, isLoading: u } = Ye(), [d, f] = x.useState(!1), [h, p] = x.useState(""), [b, g] = x.useState(n.viewLocked ?? "tables"), [y, _] = x.useState({});
  x.useEffect(() => {
    d && g(n.viewLocked ?? "tables");
  }, [d, n.viewLocked]);
  const N = x.useMemo(() => new Set(t), [t]), k = h.trim().toLowerCase(), R = x.useMemo(() => {
    if (b !== "tables") {
      const O = n.views.find((G) => G.name === b) ?? zt(l, b);
      return O ? [{ cube: O, tag: "dataset" }] : [];
    }
    const T = [];
    n.sourceCube && T.push({ cube: n.sourceCube, tag: "source" });
    for (const O of n.relatedCubes) T.push({ cube: O, tag: "related" });
    return T;
  }, [b, n, l]), C = e.kinds.length > 1, w = (T) => vv.filter((O) => e.kinds.includes(O)).map((O) => {
    const G = dv[O], te = Zn(l, G.metaKind, T).filter(($) => !N.has($.name)).filter(($) => k ? $.label.toLowerCase().includes(k) || $.name.toLowerCase().includes(k) : !0);
    return { kind: O, label: G.label, icon: G.icon, items: te };
  }).filter((O) => O.items.length > 0), L = R.map((T) => ({ section: T, groups: w(T.cube.name) })).filter((T) => T.groups.length > 0), D = L.length > 0, V = (T, O) => {
    r(T, O), f(!1), p("");
  }, I = b === "tables" ? "All related tables" : ((j = n.views.find((T) => T.name === b)) == null ? void 0 : j.title) ?? ((B = zt(l, b)) == null ? void 0 : B.title) ?? b;
  return /* @__PURE__ */ v(Ce, { open: d, onOpenChange: f, children: [
    /* @__PURE__ */ i(Se, { asChild: !0, children: s }),
    /* @__PURE__ */ v(_e, { align: o, side: c, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i($i, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
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
        /* @__PURE__ */ i(fv, { browse: b, label: I, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: D ? L.map(({ section: T, groups: O }, G) => {
        const te = O.reduce((U, Q) => U + Q.items.length, 0), $ = T.tag === "related", Y = y[T.cube.name] ?? $, Z = k.length > 0 ? !0 : !Y;
        return /* @__PURE__ */ v("div", { children: [
          T.tag === "related" && G > 0 && L[G - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => _((U) => ({ ...U, [T.cube.name]: !Y })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                Z ? /* @__PURE__ */ i(rt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(dn, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(Ka, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: T.cube.title }),
                T.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : T.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: te })
              ]
            }
          ),
          Z ? O.map((U) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            C ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              U.icon,
              U.label
            ] }) : null,
            U.items.map((Q) => /* @__PURE__ */ i(hv, { option: Q, reason: a(Q), onPick: () => V(Q.name, U.kind) }, Q.name))
          ] }, U.kind)) : null
        ] }, T.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function fv({ browse: e, label: t, views: n, onBrowse: a }) {
  const [r, o] = x.useState(!1), c = (s) => {
    a(s), o(!1);
  };
  return /* @__PURE__ */ v(Ce, { open: r, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Se,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(Ba, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(_e, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(wa, { active: e === "tables", icon: /* @__PURE__ */ i(Ka, { className: "cv:size-3.5" }), onClick: () => c("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(oe, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((s) => /* @__PURE__ */ i(
          wa,
          {
            active: e === s.name,
            icon: /* @__PURE__ */ i(mr, { className: "cv:size-3.5" }),
            onClick: () => c(s.name),
            children: s.title
          },
          s.name
        ))
      ] }) : null
    ] })
  ] });
}
function wa({
  active: e,
  icon: t,
  onClick: n,
  children: a
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
        /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: a }),
        e ? /* @__PURE__ */ i(je, { className: "cv:size-3.5 cv:shrink-0" }) : null
      ]
    }
  );
}
function hv({ option: e, reason: t, onPick: n }) {
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
const pv = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], Lt = "yyyy-MM-dd";
function gv(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ka(e) {
  if (!e) return;
  const t = Qa(e, Lt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Lr({ value: e, onChange: t }) {
  const [n, a] = x.useState(!1), r = typeof e == "string", [o, c] = gv(e), s = ka(o), l = ka(c), u = s ? { from: s, to: l } : void 0, d = r ? e : s && l ? `${fe(s, "MMM d, yyyy")} – ${fe(l, "MMM d, yyyy")}` : s ? fe(s, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(Ce, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Se, { asChild: !0, children: /* @__PURE__ */ v(W, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(ja, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", d === "Any time" && "cv:text-muted-foreground"), children: d })
    ] }) }),
    /* @__PURE__ */ v(_e, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        pv.map((f) => /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "sm",
            className: S("cv:justify-start cv:font-normal", e === f && "cv:bg-accent"),
            onClick: () => {
              t(f), a(!1);
            },
            children: f
          },
          f
        )),
        /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "sm",
            className: "cv:justify-start cv:font-normal cv:text-muted-foreground",
            onClick: () => {
              t(void 0), a(!1);
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
          defaultMonth: s,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([fe(f.from, Lt), fe(f.to, Lt)]) : f != null && f.from ? t([fe(f.from, Lt), fe(f.from, Lt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function bv(e) {
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
function yv(e, t) {
  const n = new Set(bv(t));
  return e.filter((a) => n.has(a.type));
}
function xv(e) {
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
function wv(e, t, n) {
  const a = new Set(n.map((s) => s.name)), r = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = r, c = 2;
  for (; a.has(o); ) o = `${r}_${c++}`;
  return o;
}
function kv(e, t, n) {
  const a = xv(e), r = { name: wv(t, e, n), type: a }, o = t.trim();
  return o && (r.label = o), a === "dateRange" ? r.default = "last 7 days" : a === "granularity" && (r.default = "day"), r;
}
const ei = x.createContext({});
function Nv({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(ei.Provider, { value: n, children: t });
}
function Cv() {
  return x.useContext(ei);
}
function Sv({ kind: e, value: t, onChange: n, className: a }) {
  const r = Sr(), o = (r == null ? void 0 : r.decls) ?? [], { createVariable: c } = Cv(), [s, l] = x.useState(!1), [u, d] = x.useState(!1), [f, h] = x.useState(""), p = x.useMemo(() => yv(o, e), [o, e]), b = p.find((_) => _.name === t), g = (_) => {
    n(_), l(!1), d(!1);
  }, y = () => {
    if (!c) return;
    const _ = kv(e, f || "Variable", o);
    c(_), g(_.name), h("");
  };
  return /* @__PURE__ */ v(
    Ce,
    {
      open: s,
      onOpenChange: (_) => {
        l(_), _ || d(!1);
      },
      children: [
        /* @__PURE__ */ i(Se, { asChild: !0, children: /* @__PURE__ */ v(W, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", a), children: [
          /* @__PURE__ */ i(Ei, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !b && "cv:text-muted-foreground"), children: b ? b.label ?? b.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(_e, { align: "start", className: "cv:w-60 cv:p-1", children: [
          p.length > 0 ? p.map((_) => /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => g(_.name),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:hover:bg-accent",
              children: [
                /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: _.label ?? _.name }),
                /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:text-muted-foreground", children: _.type }),
                _.name === t ? /* @__PURE__ */ i(je, { className: "cv:size-3.5 cv:shrink-0" }) : null
              ]
            },
            _.name
          )) : /* @__PURE__ */ i("p", { className: "cv:px-2 cv:py-1.5 cv:text-xs cv:text-muted-foreground", children: "No matching variables yet." }),
          c ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              ve,
              {
                autoFocus: !0,
                value: f,
                onChange: (_) => h(_.target.value),
                onKeyDown: (_) => {
                  _.key === "Enter" && y(), _.key === "Escape" && d(!1);
                },
                placeholder: "Variable label…",
                className: "cv:h-7 cv:text-sm"
              }
            ),
            /* @__PURE__ */ i(W, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: y, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => d(!0),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground",
              children: [
                /* @__PURE__ */ i(Vt, { className: "cv:size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function pt({ kind: e, value: t, onChange: n, renderFixed: a }) {
  const r = Me(t), [o, c] = x.useState(r ? "var" : "fixed");
  x.useEffect(() => {
    r && c("var");
  }, [r]);
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
            c("fixed"), Me(t) && n(void 0);
          },
          children: "Value"
        }
      ),
      /* @__PURE__ */ i("button", { type: "button", className: s(o === "var"), onClick: () => c("var"), children: "Variable" })
    ] }),
    o === "var" ? /* @__PURE__ */ i(
      Sv,
      {
        kind: e,
        value: Me(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : a(Me(t) ? void 0 : t, (l) => n(l))
  ] });
}
const _v = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function Pn(e) {
  return "member" in e && "operator" in e;
}
function Rv({
  cube: e,
  cubes: t,
  scope: n,
  value: a,
  onChange: r,
  disabled: o,
  className: c
}) {
  var I;
  const { meta: s } = Ye(), l = ((I = Sr()) == null ? void 0 : I.decls) ?? [], [u, d] = x.useState(null), [f, h] = x.useState(null), p = a ?? [], b = p.length === 1 && !Pn(p[0]) && "or" in p[0] && Array.isArray(p[0].or) && p[0].or.every(Pn) ? p[0] : void 0, g = b ? "any" : "all", y = [], _ = [];
  b || p.forEach((j) => Pn(j) ? y.push(j) : _.push(j));
  const N = b ? b.or : y, k = _.length === 0 && (N.length >= 2 || g === "any"), R = (j) => g === "any" ? j.length ? [{ or: j }] : [] : [...j, ..._], C = (j) => {
    const B = j.filter((O) => O.member.length > 0), T = R(B);
    r(T.length > 0 ? T : void 0);
  }, w = (j) => {
    const B = j === "any" ? N.length ? [{ or: N }] : [] : [...N];
    r(B.length > 0 ? B : void 0);
  }, L = (j, B) => C(N.map((T, O) => O === j ? { ...T, ...B } : T)), D = (j) => C(N.filter((B, T) => T !== j)), V = (j) => {
    const T = { ...f ?? { member: "", operator: "equals", values: [] }, ...j };
    T.member ? (h(null), d(N.length), C([...N, T])) : h(T);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", c), children: [
    N.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    k ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        Et,
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
    N.map((j, B) => {
      const T = Fe(s, j.member);
      return u === B ? /* @__PURE__ */ i(
        Na,
        {
          leaf: j,
          member: T,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (O) => L(B, O),
          onDone: () => d(null),
          onRemove: () => D(B)
        },
        B
      ) : /* @__PURE__ */ i(
        Av,
        {
          text: Mv(j, T == null ? void 0 : T.label, l),
          disabled: o,
          onEdit: () => d(B),
          onRemove: () => D(B)
        },
        B
      );
    }),
    f ? /* @__PURE__ */ i(
      Na,
      {
        leaf: f,
        member: Fe(s, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: V,
        onRemove: () => h(null)
      }
    ) : null,
    _.length > 0 ? /* @__PURE__ */ v("p", { className: "cv:text-xs cv:text-muted-foreground", children: [
      _.length,
      " grouped filter",
      _.length === 1 ? "" : "s",
      " preserved (edit as JSON)."
    ] }) : null,
    /* @__PURE__ */ v(
      W,
      {
        variant: "outline",
        size: "sm",
        className: "cv:w-full cv:justify-start",
        disabled: o || !!f,
        onClick: () => {
          d(null), h({ member: "", operator: "equals", values: [] });
        },
        children: [
          /* @__PURE__ */ i(Vt, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Av({
  text: e,
  disabled: t,
  onEdit: n,
  onRemove: a
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
      W,
      {
        variant: "ghost",
        size: "icon",
        className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
        disabled: t,
        onClick: a,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(gt, { className: "cv:size-4" })
      }
    )
  ] });
}
function Na({
  leaf: e,
  member: t,
  cube: n,
  cubes: a,
  scope: r,
  disabled: o,
  onChange: c,
  onDone: s,
  onRemove: l
}) {
  const u = Bd(t == null ? void 0 : t.type), d = u.includes(e.operator) ? e.operator : u[0], f = !er.has(d);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        s && e.member ? /* @__PURE__ */ v(W, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: s, children: [
          /* @__PURE__ */ i(je, { className: "cv:size-3.5" }),
          " Done"
        ] }) : null,
        /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-7 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            disabled: o,
            onClick: l,
            "aria-label": "Remove filter",
            children: /* @__PURE__ */ i(gt, { className: "cv:size-3.5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Field" }),
      r ? (
        // Same rich picker as the axis wells: grouped Numbers / Categories / Dates,
        // search, join-scope. Including Dates makes time dimensions filterable.
        /* @__PURE__ */ i(
          Zo,
          {
            well: _v,
            placed: [],
            scope: r,
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
                    mn(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(rt, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        Xo,
        {
          cube: n,
          cubes: a,
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
        Oe,
        {
          value: d,
          onValueChange: (h) => c({
            operator: h,
            values: er.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(De, { className: "cv:w-full", children: /* @__PURE__ */ i(Le, {}) }),
            /* @__PURE__ */ i(Te, { children: u.map((h) => /* @__PURE__ */ i(pe, { value: h, children: Wo[h] }, h)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        Ov,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => c({ values: h })
        }
      )
    ] }) : null
  ] });
}
function Mv(e, t, n) {
  const a = t ?? e.member;
  if (!a) return "New filter";
  const r = Wo[e.operator] ?? e.operator;
  if (er.has(e.operator)) return `${a} ${r}`;
  const o = (e.values ?? []).map((c) => {
    if (Me(c)) {
      const s = n.find((l) => l.name === c.var);
      return `{${((s == null ? void 0 : s.label) ?? c.var).replace(/[{}]/g, "")}}`;
    }
    return String(c);
  });
  return o.length > 0 ? `${a} ${r} ${o.join(", ")}` : `${a} ${r} …`;
}
function Ov({ values: e, memberType: t, onChange: n }) {
  const a = e ?? [], r = a.length === 1 && Me(a[0]);
  if (t === "time") {
    const s = r ? a[0] : Lv(a);
    return /* @__PURE__ */ i(
      pt,
      {
        kind: "dateRange",
        value: s,
        onChange: (l) => n(l === void 0 ? [] : Me(l) ? [l] : Dv(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(Lr, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", c = r ? a[0] : a.filter((s) => !Me(s));
  return /* @__PURE__ */ i(
    pt,
    {
      kind: o,
      value: c,
      onChange: (s) => n(s === void 0 ? [] : Me(s) ? [s] : s),
      renderFixed: (s, l) => /* @__PURE__ */ i(
        ve,
        {
          value: (s ?? []).map(String).join(", "),
          onChange: (u) => l(Tv(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function Lv(e) {
  const t = e.filter((n) => !Me(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Dv(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function Tv(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function zv({ spec: e, update: t, cube: n, scopeCubes: a, scope: r }) {
  const { query: o } = e, c = (o.filters ?? []).length, s = (l) => t({ ...e, query: { ...o, filters: l } });
  return /* @__PURE__ */ v(Ce, { children: [
    /* @__PURE__ */ v(
      Se,
      {
        className: S(
          "cv:flex cv:h-8 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
          c > 0 ? "cv:text-foreground" : "cv:text-muted-foreground"
        ),
        title: "Filters",
        "aria-label": "Filters",
        children: [
          /* @__PURE__ */ i(Pi, { className: "cv:size-4" }),
          "Filter",
          c > 0 ? /* @__PURE__ */ i("span", { className: "cv:ml-0.5 cv:flex cv:h-4 cv:min-w-4 cv:items-center cv:justify-center cv:rounded-full cv:bg-primary cv:px-1 cv:text-[10px] cv:font-semibold cv:text-primary-foreground", children: c }) : null
        ]
      }
    ),
    /* @__PURE__ */ v(_e, { align: "end", className: "cv:flex cv:max-h-[72vh] cv:w-96 cv:flex-col cv:gap-2 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-0.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-sm cv:font-medium", children: "Filters" }),
        /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "Narrow this chart. Each row reads as a sentence — click to edit." })
      ] }),
      /* @__PURE__ */ i(Fv, { spec: e, update: t, scopeCubes: a }),
      /* @__PURE__ */ i(Rv, { cube: n, cubes: a, scope: r, value: o.filters, onChange: s })
    ] })
  ] });
}
function Fv({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: a } = Ye(), r = Kd(a, n);
  if (r.length === 0) return null;
  const o = new Set(e.query.segments ?? []), c = (s) => {
    const l = new Set(o);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = [...l];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-b cv:border-border cv:pb-2", children: [
    /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: r.map((s) => /* @__PURE__ */ i(
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
function $v({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: a } = Ye(), r = x.useMemo(() => wn(a), [a]), o = r.filter((y) => y.type === "view"), c = r.filter((y) => y.type === "cube"), s = r.find((y) => y.name === e), [l, u] = x.useState(!1), [d, f] = x.useState(null), h = (y) => {
    if (y === e) {
      u(!1);
      return;
    }
    t ? f(y) : (n(y), u(!1));
  }, p = () => {
    d && n(d), f(null), u(!1);
  }, b = d ? ((g = r.find((y) => y.name === d)) == null ? void 0 : g.title) ?? d : "";
  return /* @__PURE__ */ v(
    Ce,
    {
      open: l,
      onOpenChange: (y) => {
        u(y), y || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          Se,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(Ba, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !s && "cv:text-muted-foreground"), children: s ? s.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(_e, { align: "start", className: "cv:w-64 cv:p-1", children: d ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: b }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(W, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(W, { size: "sm", className: "cv:h-7", onClick: p, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(oe, { children: [
            /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
            o.map((y) => /* @__PURE__ */ i(
              Ca,
              {
                icon: /* @__PURE__ */ i(mr, { className: "cv:size-3.5" }),
                label: y.title,
                active: y.name === e,
                onClick: () => h(y.name)
              },
              y.name
            ))
          ] }) : null,
          /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Tables" }),
          c.map((y) => /* @__PURE__ */ i(
            Ca,
            {
              icon: /* @__PURE__ */ i(Ha, { className: "cv:size-3.5" }),
              label: y.title,
              active: y.name === e,
              onClick: () => h(y.name)
            },
            y.name
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
  onClick: a
}) {
  return /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      onClick: a,
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
function Sa(e, t, n, a) {
  var o;
  const r = ((o = e.chart.axes) == null ? void 0 : o[n]) ?? {};
  t({ ...e, chart: { ...e.chart, axes: { ...e.chart.axes, [n]: { ...r, ...a } } } });
}
function _a({
  spec: e,
  update: t,
  axis: n,
  title: a,
  auto: r
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
        a ? /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: a }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: r ?? "Axis title",
            disabled: c,
            onChange: (l) => Sa(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${r ? ` — defaults to “${r}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          Pv,
          {
            hidden: c,
            what: "axis title",
            onClick: () => Sa(e, t, n, { labelHide: c ? void 0 : !0 })
          }
        )
      ]
    }
  );
}
function Ev({
  spec: e,
  update: t
}) {
  var a;
  const n = ((a = e.chart.legend) == null ? void 0 : a.show) === !1;
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
          n ? /* @__PURE__ */ i(Wa, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(Ua, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Pv({
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
      children: e ? /* @__PURE__ */ i(Wa, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(Ua, { className: "cv:size-3.5" })
    }
  );
}
const ti = x.forwardRef(
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
ti.displayName = "Label";
function me({
  label: e,
  hint: t,
  error: n,
  htmlFor: a,
  action: r,
  className: o,
  children: c
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: S("cv:flex cv:flex-col cv:gap-1.5 cv:py-1.5", o), children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i(ti, { htmlFor: a, className: "cv:text-muted-foreground", children: e }),
      r ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: r }) : null
    ] }),
    c,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function nr({
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
function he({
  label: e,
  hint: t,
  checked: n,
  onChange: a,
  disabled: r,
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
              r ? "cv:cursor-not-allowed cv:opacity-70" : "cv:cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:leading-none", children: e }),
              t ? /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ i(nr, { id: c, checked: n, onChange: a, disabled: r })
      ]
    }
  );
}
function Iv({ spec: e, update: t }) {
  var h, p;
  const { chart: n } = e, a = n.family, r = n.familyOptions ?? {}, o = (b) => t({ ...e, chart: { ...n, ...b } }), c = (b) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...b } } }), s = ((p = (h = n.mapping) == null ? void 0 : h.series) == null ? void 0 : p.mode) === "pivot" ? "stacked" : "none", l = n.stackMode ?? (a === "area" ? s : fo[a].envelope.stackMode) ?? "none", d = /* @__PURE__ */ i(me, { label: "Stacked", children: /* @__PURE__ */ i(
    Et,
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
    switch (a) {
      case "bar":
        return /* @__PURE__ */ v(oe, { children: [
          /* @__PURE__ */ i(
            he,
            {
              label: "Horizontal",
              checked: n.orientation === "horizontal",
              onChange: (y) => o({ orientation: y ? "horizontal" : "vertical" })
            }
          ),
          d
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(oe, { children: [
          d,
          n.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((g = (b = n.mapping) == null ? void 0 : b.series) == null ? void 0 : g.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(oe, { children: [
          /* @__PURE__ */ i(
            he,
            {
              label: "Donut",
              checked: typeof r.innerRadiusPct == "number" && r.innerRadiusPct > 0,
              onChange: (y) => c({ innerRadiusPct: y ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(me, { label: "Slice labels", children: /* @__PURE__ */ i(
            Et,
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
              onChange: (y) => c({ showLabels: y })
            }
          ) }),
          /* @__PURE__ */ i(qv, { label: "Max slices", children: /* @__PURE__ */ i(
            ve,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: r.maxSlices ?? "",
              placeholder: "8",
              onChange: (y) => {
                const _ = parseInt(y.target.value, 10);
                c({ maxSlices: Number.isFinite(_) && _ > 0 ? _ : void 0 });
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
        return /* @__PURE__ */ v(oe, { children: [
          /* @__PURE__ */ i(
            he,
            {
              label: "Compact rows",
              checked: r.rowHeight === "compact",
              onChange: (y) => c({ rowHeight: y ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sortable columns",
              checked: r.sortable !== !1,
              onChange: (y) => c({ sortable: y })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Sticky header",
              checked: r.stickyHeader !== !1,
              onChange: (y) => c({ stickyHeader: y })
            }
          ),
          /* @__PURE__ */ i(
            he,
            {
              label: "Row numbers",
              checked: r.showRowNumbers === !0,
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
    }
  })();
  return /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col", children: f });
}
const jv = /* @__PURE__ */ new Set([
  "bar",
  "area",
  "pie",
  "table"
]);
function Vv(e) {
  return jv.has(e);
}
function qv({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
const Kv = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], ni = {
  bar: Ga,
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
    n !== e.chart.family && t(Wd(e, n));
  };
}
function Bv({ spec: e, update: t, empty: n }) {
  const a = e.chart.family, r = ri(e, t);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(ai, { family: a, onPick: r })
  ] }) }) : null;
}
function Hv({ spec: e, update: t }) {
  const n = e.chart.family, a = ri(e, t), r = ni[n];
  return /* @__PURE__ */ v(Ce, { children: [
    /* @__PURE__ */ i(Se, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(r, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          Yo[n],
          /* @__PURE__ */ i(rt, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(_e, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(ai, { family: n, onPick: a })
      ] }),
      Vv(n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(Iv, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function ai({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-4 cv:gap-1.5", children: Kv.map((n) => {
    const a = ni[n], r = n === e;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => t(n),
        "aria-pressed": r,
        className: S(
          "cv:flex cv:flex-col cv:items-center cv:gap-1 cv:rounded-md cv:border cv:px-1 cv:py-2 cv:text-[10px] cv:transition-colors",
          r ? "cv:border-ring cv:bg-accent cv:text-foreground" : "cv:border-input cv:text-muted-foreground cv:hover:bg-accent/50 cv:hover:text-foreground"
        ),
        children: [
          /* @__PURE__ */ i(a, { className: "cv:size-4" }),
          Yo[n]
        ]
      },
      n
    );
  }) });
}
function Wv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Uv(e, t, n, a, r) {
  var Tr, zr, Fr, $r, Er, Pr, Ir, jr, Vr, qr, Kr, Br, Hr, Wr;
  const { chart: o, query: c } = e, s = o.family, l = n.kinds.length === 1 ? n.kinds[0] : Gv(r), u = o.familyOptions ?? {}, d = Array.isArray(u.series) ? u.series : [], f = Array.isArray(u.columns) ? u.columns : [], h = Nt(o), p = h[a], b = s === "combo" && n.id === "y", g = s === "table" && n.id === "columns", y = s === "bar" || s === "line" || s === "area", _ = ((zr = (Tr = o.mapping) == null ? void 0 : Tr.series) == null ? void 0 : zr.mode) === "measures", N = y && n.id === "y", k = N && _, R = b ? (Fr = d.find((P) => P.member === a)) == null ? void 0 : Fr.label : g ? ($r = f.find((P) => P.member === a)) == null ? void 0 : $r.label : k ? p == null ? void 0 : p.label : void 0, C = b ? (Er = d.find((P) => P.member === a)) == null ? void 0 : Er.colorToken : k ? p == null ? void 0 : p.colorToken : void 0, w = Qe(c), L = n.kinds.includes("time") && (w == null ? void 0 : w.dimension) === a, D = L ? w == null ? void 0 : w.granularity : void 0, V = L ? w == null ? void 0 : w.dateRange : void 0, I = b ? ((Pr = d.find((P) => P.member === a)) == null ? void 0 : Pr.render) ?? "line" : void 0, j = s === "line" && n.id === "y", B = s === "bar" && n.id === "y" && o.orientation !== "horizontal", T = ((jr = (Ir = o.mapping) == null ? void 0 : Ir.series) == null ? void 0 : jr.mode) === "pivot", O = ((qr = (Vr = o.mapping) == null ? void 0 : Vr.series) == null ? void 0 : qr.mode) === "pivot" ? o.mapping.series.meta : void 0, G = (j || B) && (_ || T) || b, te = G ? (b ? (Kr = d.find((P) => P.member === a)) == null ? void 0 : Kr.axis : _ ? p == null ? void 0 : p.axis : (Br = O == null ? void 0 : O[a]) == null ? void 0 : Br.axis) ?? "left" : void 0, Z = (s === "line" || s === "area") && n.id === "y" && _ || b && (I === "line" || I === "area"), U = b ? d.find((P) => P.member === a) : void 0, Q = Z ? b ? U == null ? void 0 : U.curve : p == null ? void 0 : p.curve : void 0, ue = Z ? b ? U == null ? void 0 : U.dots : p == null ? void 0 : p.dots : void 0, J = (P) => {
    var Ur, Gr;
    if ((Ur = o.mapping) != null && Ur.series && o.mapping.series.mode !== "measures") return;
    const se = ((Gr = o.mapping) != null && Gr.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : c.measures) ?? [], le = { ...h };
    P && Object.keys(P).length > 0 ? le[a] = P : delete le[a];
    const _t = we(o);
    _t && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: _t }, series: Go(se, le) }
      }
    });
  }, H = (P) => {
    const se = d.map((le) => le.member === a ? { ...le, ...P } : le);
    t({ ...e, chart: { ...o, familyOptions: { ...u, series: se } } });
  }, A = (P) => {
    const se = f.map((le) => le.member === a ? { ...le, ...P } : le);
    t({ ...e, chart: { ...o, familyOptions: { ...u, columns: se } } });
  }, F = (P) => {
    b ? H({ label: P }) : g ? A({ label: P }) : k && J({ ...p, label: P });
  }, q = (P) => {
    b ? H({ colorToken: P ?? void 0 }) : k && J({ ...p, colorToken: P ?? void 0 });
  }, de = (P) => {
    if (!w) return;
    const se = { ...w };
    for (const le of Object.keys(P)) {
      const _t = P[le];
      _t === void 0 ? delete se[le] : se[le] = _t;
    }
    t({ ...e, query: { ...c, timeDimensions: [se] } });
  }, ze = (P) => de({ granularity: P }), Re = (P) => de({ dateRange: P }), Je = (P) => H({ render: P }), Xe = (P) => {
    var se, le;
    b ? H({ axis: P }) : k ? J({ ...p, axis: P }) : ((le = (se = o.mapping) == null ? void 0 : se.series) == null ? void 0 : le.mode) === "pivot" && t(rr(e, s, a, P));
  }, Wt = (P) => {
    b ? H({ curve: P }) : k && J({ ...p, curve: P });
  }, Ut = (P) => {
    b ? H({ dots: P }) : k && J({ ...p, dots: P });
  }, M = () => t(Qd(e, s, n.id, a)), z = (n.id === "x" || n.id === "slices") && (l === "category" || l === "time"), E = (Hr = o.mapping) == null ? void 0 : Hr.series, K = (E && E.mode === "pivot" ? E.value : ht(o)[0]) ?? ((Wr = c.measures) == null ? void 0 : Wr[0]), X = z ? l === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...K ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...K ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ie = (() => {
    const P = Wv(c.order)[0];
    if (!P) return "none";
    const [se, le] = P;
    return K && se === K ? le === "desc" ? "value-desc" : "value-asc" : se === a ? l === "time" ? le === "desc" ? "time-desc" : "time-asc" : le === "asc" ? "label-asc" : "label-desc" : "none";
  })(), re = (P) => {
    let se;
    switch (P) {
      case "none":
        se = void 0;
        break;
      case "value-desc":
        se = K ? [[K, "desc"]] : void 0;
        break;
      case "value-asc":
        se = K ? [[K, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        se = [[a, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        se = [[a, "desc"]];
        break;
    }
    t({ ...e, query: { ...c, order: se } });
  }, ce = typeof c.limit == "number" ? c.limit : void 0, St = (P) => t({ ...e, query: { ...c, limit: P && P > 0 ? P : void 0 } }), Cn = (s === "bar" || s === "line" || s === "area") && L, ui = Cn && u.comparePrevious === !0;
  return {
    kind: l,
    label: R,
    colorToken: C,
    granularity: D,
    dateRange: V,
    render: I,
    axis: te,
    curve: Q,
    dots: ue,
    canLineStyle: Z,
    canAxis: G,
    canRename: b || g || k,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: N && _ || b,
    isTimeField: L,
    isComboY: b,
    isCategoryField: z,
    sortValue: ie,
    sortOptions: X,
    onSort: re,
    limit: ce,
    onLimit: St,
    canComparePrevious: Cn,
    comparePrevious: ui,
    comparePreviousReady: Cn && V !== void 0,
    onComparePrevious: (P) => t({ ...e, chart: { ...o, familyOptions: { ...u, comparePrevious: P || void 0 } } }),
    onRename: F,
    onRecolor: q,
    onGranularity: ze,
    onDateRange: Re,
    onRender: Je,
    onAxis: Xe,
    onCurve: Wt,
    onDots: Ut,
    onRemove: M
  };
}
function rr(e, t, n, a) {
  var c;
  const { chart: r } = e;
  if (t === "combo") {
    const s = r.familyOptions ?? {}, l = (Array.isArray(s.series) ? s.series : []).map(
      (u) => u.member === n ? { ...u, axis: a } : u
    );
    return { ...e, chart: { ...r, familyOptions: { ...s, series: l } } };
  }
  const o = (c = r.mapping) == null ? void 0 : c.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const s = { ...o.meta ?? {} };
    return s[n] = { ...s[n] ?? {}, axis: a }, { ...e, chart: { ...r, mapping: { ...r.mapping, series: { ...o, meta: s } } } };
  }
  return e;
}
function Gv(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ra(e, t, n, a) {
  var f;
  const { chart: r, query: o } = e, c = r.family, s = (h) => {
    if (a < 0 || a >= h.length || n === a) return h;
    const p = h.slice(), [b] = p.splice(n, 1);
    return p.splice(a, 0, b), p;
  };
  if (c === "combo" && t.id === "y") {
    const h = r.familyOptions ?? {}, p = s(Array.isArray(h.series) ? h.series : []), b = s(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: b },
      chart: { ...r, familyOptions: { ...h, series: p } }
    };
  }
  if (c === "table" && t.id === "columns") {
    const h = r.familyOptions ?? {}, p = s(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...r, familyOptions: { ...h, columns: p } } };
  }
  const l = s(o.measures ?? []), u = (f = r.mapping) == null ? void 0 : f.series;
  let d = r.mapping;
  if (u && u.mode === "measures")
    d = { ...r.mapping, series: { ...u, members: l } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = s(u.values);
    d = { ...r.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...o, measures: l }, chart: { ...r, mapping: d } };
}
function Yv(e, t, n) {
  const a = wn(e), r = a.filter((k) => k.type === "view"), o = Bt(t), c = Object.values(o).flat();
  let s;
  for (const k of c) {
    const R = Fe(e, k);
    if (R) {
      s = R;
      break;
    }
  }
  const l = !s && n ? zt(e, n) : void 0, u = s ? zt(e, s.cube) : l, d = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, f = (s == null ? void 0 : s.connectedComponent) ?? (l == null ? void 0 : l.connectedComponent), h = t.query.measures ?? [], p = h.length ? Ot(h[0]) : void 0;
  if (d)
    return { viewLocked: d, relatedCubes: [], views: r, measureSource: p, scopeComponent: f };
  const b = p ?? (s == null ? void 0 : s.cube) ?? (l == null ? void 0 : l.name), g = b ? zt(e, b) : void 0, y = a.filter((k) => k.type === "cube" && k.connectedComponent !== void 0), N = (f === void 0 ? y : y.filter((k) => k.connectedComponent === f)).filter((k) => k.name !== b).sort((k, R) => k.title.localeCompare(R.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: N,
    views: r,
    measureSource: p,
    scopeComponent: f
  };
}
const Qv = We.options;
function Jv({
  value: e,
  onChange: t,
  allowClear: n = !0,
  disabled: a,
  className: r
}) {
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "color-token-picker",
      role: "radiogroup",
      "aria-label": "Series color",
      className: S("cv:flex cv:flex-wrap cv:items-center cv:gap-1.5", r),
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
            className: S(
              "cv:relative cv:flex cv:size-6 cv:items-center cv:justify-center cv:rounded-full cv:border cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground cv:transition-shadow cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:opacity-50",
              e === void 0 ? "cv:border-ring cv:ring-2 cv:ring-ring/40" : "cv:border-input cv:hover:border-ring"
            ),
            children: "A"
          }
        ) : null,
        Qv.map((o) => {
          const c = e === o;
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              role: "radio",
              "aria-checked": c,
              "aria-label": o,
              title: o,
              disabled: a,
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
const Xv = et.options, Zv = {
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
  placeholder: a = "Granularity…",
  disabled: r,
  id: o,
  className: c
}) {
  const s = n && n.length > 0 ? n : Xv;
  return /* @__PURE__ */ v(
    Oe,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: r,
      children: [
        /* @__PURE__ */ i(De, { id: o, className: c, children: /* @__PURE__ */ i(Le, { placeholder: a }) }),
        /* @__PURE__ */ i(Te, { children: s.map((l) => /* @__PURE__ */ i(pe, { value: l, children: Zv[l] }, l)) })
      ]
    }
  );
}
const Aa = { bar: "Bar", line: "Line", area: "Area" }, ef = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function tf({
  spec: e,
  update: t,
  well: n,
  member: a,
  option: r,
  resolvedColor: o,
  reorder: c,
  className: s
}) {
  const l = Uv(e, t, n, a, r), u = (r == null ? void 0 : r.label) ?? a, d = l.label || u, f = l.canColor && o !== void 0, h = l.canRename || f || l.isTimeField || l.isCategoryField || l.isComboY && !!l.render || l.canAxis || l.canLineStyle || !!c, p = (g) => {
    const y = g.trim();
    l.onRename(y.length > 0 ? y : void 0);
  }, b = /* @__PURE__ */ v(oe, { children: [
    f ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : r ? mn(r.type) : null,
    /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: d })
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
        h ? /* @__PURE__ */ v(Ce, { children: [
          /* @__PURE__ */ i(Se, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${d}`,
              children: b
            }
          ) }),
          /* @__PURE__ */ i(_e, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
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
              /* @__PURE__ */ i(Jv, { value: l.colorToken, onChange: l.onRecolor })
            ] }) : null,
            l.isTimeField ? /* @__PURE__ */ v(oe, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  pt,
                  {
                    kind: "dateRange",
                    value: l.dateRange,
                    onChange: l.onDateRange,
                    renderFixed: (g, y) => /* @__PURE__ */ i(Lr, { value: g, onChange: y })
                  }
                )
              ] }),
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Group dates by" }),
                /* @__PURE__ */ i(
                  pt,
                  {
                    kind: "granularity",
                    value: l.granularity,
                    onChange: l.onGranularity,
                    renderFixed: (g, y) => /* @__PURE__ */ i(oi, { value: g, onChange: y, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              l.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    nr,
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
            l.isCategoryField ? /* @__PURE__ */ v(oe, { children: [
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
                      const y = g.target.value.trim();
                      l.onLimit(y === "" ? void 0 : Number(y));
                    },
                    onKeyDown: (g) => {
                      if (g.key === "Enter") {
                        const y = g.target.value.trim();
                        l.onLimit(y === "" ? void 0 : Number(y)), g.target.blur();
                      }
                    }
                  }
                )
              ] })
            ] }) : null,
            l.isComboY && l.render ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Draw as" }),
              /* @__PURE__ */ i("div", { className: "cv:flex cv:gap-1", children: Object.keys(Aa).map((g) => /* @__PURE__ */ v(
                "button",
                {
                  type: "button",
                  onClick: () => l.onRender(g),
                  className: S(
                    "cv:flex cv:flex-1 cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                    l.render === g ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                  ),
                  children: [
                    Aa[g],
                    l.render === g ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
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
                    l.axis === g ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
                  ]
                },
                g
              )) })
            ] }) : null,
            l.canLineStyle ? /* @__PURE__ */ v(oe, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: ef.map(([g, y]) => /* @__PURE__ */ v(
                  "button",
                  {
                    type: "button",
                    onClick: () => l.onCurve(g),
                    className: S(
                      "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs",
                      (l.curve ?? "cv:monotone") === g ? "cv:border-ring cv:bg-accent" : "cv:border-input cv:hover:bg-accent/50"
                    ),
                    children: [
                      y,
                      (l.curve ?? "monotone") === g ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
                    ]
                  },
                  g
                )) })
              ] }),
              /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Show points" }),
                /* @__PURE__ */ i(nr, { checked: l.dots === !0, onChange: l.onDots, "aria-label": "Show points" })
              ] })
            ] }) : null,
            c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1", children: [
              /* @__PURE__ */ v(
                W,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canUp,
                  onClick: c.onUp,
                  children: [
                    /* @__PURE__ */ i(cr, { className: "cv:size-3.5" }),
                    "Up"
                  ]
                }
              ),
              /* @__PURE__ */ v(
                W,
                {
                  variant: "outline",
                  size: "sm",
                  className: "cv:h-8 cv:flex-1",
                  disabled: !c.canDown,
                  onClick: c.onDown,
                  children: [
                    /* @__PURE__ */ i(sr, { className: "cv:size-3.5" }),
                    "Down"
                  ]
                }
              )
            ] }) : null,
            /* @__PURE__ */ v(
              W,
              {
                variant: "ghost",
                size: "sm",
                className: "cv:h-8 cv:justify-start cv:text-destructive cv:hover:text-destructive",
                onClick: l.onRemove,
                children: [
                  /* @__PURE__ */ i(Yr, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: d, children: b }),
        /* @__PURE__ */ i(
          W,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: l.onRemove,
            "aria-label": `Remove ${d}`,
            children: /* @__PURE__ */ i(Yr, { className: "cv:size-3.5" })
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
  placed: a,
  allPlaced: r,
  optionFor: o,
  colorFor: c,
  scope: s,
  blockReason: l,
  onAdd: u,
  badge: d,
  orientation: f,
  lockedSingle: h,
  disableReorder: p,
  label: b,
  note: g,
  pickerSide: y,
  pickerAlign: _,
  control: N
}) {
  const k = n.cardinality === "many" && !h, R = k || a.length === 0, C = a.length, w = f === "vertical", L = b ?? n.label, D = /* @__PURE__ */ i(
    Zo,
    {
      well: n,
      placed: r,
      scope: s,
      blockReason: l,
      onSelect: u,
      side: y ?? (w ? "right" : "top"),
      align: _ ?? "start",
      children: /* @__PURE__ */ v(
        "button",
        {
          type: "button",
          className: S(
            "cv:flex cv:items-center cv:justify-center cv:gap-1 cv:rounded-md cv:border cv:border-dashed cv:border-input cv:bg-background/60 cv:px-2 cv:py-1 cv:text-xs cv:text-muted-foreground cv:transition-colors cv:hover:border-ring cv:hover:text-foreground",
            w && "cv:w-full"
          ),
          children: [
            /* @__PURE__ */ i(Vt, { className: "cv:size-3.5" }),
            a.length === 0 ? L : "Add"
          ]
        }
      )
    }
  );
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "well-group",
      className: S("cv:flex cv:flex-col cv:gap-1", !w && "cv:min-w-0"),
      children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-0.5 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: L }),
          d ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: d }) : null,
          n.optional && a.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        N ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: N }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", w ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          a.map((V, I) => /* @__PURE__ */ i(
            tf,
            {
              spec: e,
              update: t,
              well: n,
              member: V,
              option: o(V),
              resolvedColor: c(V),
              className: w ? "cv:w-full" : void 0,
              reorder: k && C > 1 && !p ? {
                canUp: I > 0,
                canDown: I < C - 1,
                onUp: () => t(Ra(e, n, I, I - 1)),
                onDown: () => t(Ra(e, n, I, I + 1))
              } : void 0
            },
            V
          )),
          R ? D : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function In({
  label: e,
  summary: t,
  children: n
}) {
  return /* @__PURE__ */ v(Ce, { children: [
    /* @__PURE__ */ i(Se, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:w-full cv:items-center cv:justify-between cv:gap-2 cv:rounded-md cv:border cv:border-border cv:bg-background cv:px-2.5 cv:py-1.5 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: e,
        children: [
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: e }),
          /* @__PURE__ */ v("span", { className: "cv:flex cv:shrink-0 cv:items-center cv:gap-1 cv:text-muted-foreground", children: [
            t ? /* @__PURE__ */ i("span", { className: "cv:text-[11px]", children: t }) : null,
            /* @__PURE__ */ i(rt, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(_e, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Dr(e, t) {
  const { chart: n } = e, a = n.familyOptions ?? {};
  return { chart: n, fo: a, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...o } } }) };
}
function nf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = Dr(e, t), r = Uo(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], c = n.display ?? "number", s = n.gauge, l = (d) => {
    const f = o ?? (d.dimension ? { dimension: d.dimension } : void 0);
    if (!f) return;
    const h = { ...f };
    for (const p of Object.keys(d)) {
      const b = d[p];
      b === void 0 ? delete h[p] : h[p] = b;
    }
    delete h.granularity, t({ ...e, query: { ...e.query, timeDimensions: [h] } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(Ft, { label: "Time field", children: /* @__PURE__ */ i(
      Xo,
      {
        cube: r,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (d) => l({ dimension: d }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Ft, { label: "Date range", children: /* @__PURE__ */ i(
      pt,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (d) => l({ dateRange: d }),
        renderFixed: (d, f) => /* @__PURE__ */ i(Lr, { value: d, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(me, { label: "Display", children: /* @__PURE__ */ i(
      Et,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: c,
        onChange: (d) => a({ display: d })
      }
    ) }),
    c === "gauge" ? /* @__PURE__ */ i(Ft, { label: "Gauge max", children: /* @__PURE__ */ i(
      ve,
      {
        type: "number",
        className: "cv:h-8",
        value: (s == null ? void 0 : s.max) ?? "",
        placeholder: "Auto",
        onChange: (d) => {
          const f = parseFloat(d.target.value);
          a({ gauge: Number.isFinite(f) ? { ...s ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function rf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = Dr(e, t), r = n.comparison, o = r !== void 0, c = x.useRef(void 0);
  r && (c.current = r);
  const s = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (r == null ? void 0 : r.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Show comparison",
        checked: o,
        onChange: (d) => a({
          comparison: d ? c.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(oe, { children: [
      /* @__PURE__ */ i(me, { label: "Against", children: /* @__PURE__ */ i(
        Et,
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
      (r == null ? void 0 : r.mode) === "value" ? /* @__PURE__ */ i(Ft, { label: "Baseline value", children: /* @__PURE__ */ i(
        ve,
        {
          type: "number",
          className: "cv:h-8",
          value: (r == null ? void 0 : r.value) ?? "",
          onChange: (d) => {
            const f = parseFloat(d.target.value);
            a({ comparison: { ...r, value: Number.isFinite(f) ? f : void 0 } });
          }
        }
      ) }) : null,
      (r == null ? void 0 : r.mode) === "previousPeriod" && !(s != null && s.dateRange) ? /* @__PURE__ */ i("p", { className: "cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
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
          checked: l !== "down",
          onChange: (d) => a({ goodDirection: d ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function af({ spec: e, update: t }) {
  const { fo: n, setFO: a } = Dr(e, t), r = n.sparkline, o = r !== void 0, c = n.comparison !== void 0, s = n.goodDirection ?? "up", l = r == null ? void 0 : r.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      he,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => a({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(oe, { children: [
      /* @__PURE__ */ i(Ft, { label: "Trend granularity", children: /* @__PURE__ */ i(
        pt,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => a({ sparkline: { ...r, granularity: u } }),
          renderFixed: (u, d) => /* @__PURE__ */ i(oi, { value: u, onChange: d, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      c ? null : /* @__PURE__ */ i(
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
function Ft({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
const of = {
  bar: { left: ["y"], bottom: ["x", "color"] },
  line: { left: ["y"], bottom: ["x", "color"] },
  area: { left: ["y"], bottom: ["x", "color"] },
  combo: { left: ["y"], bottom: ["x"] },
  pie: { left: ["size"], bottom: ["slices"] },
  scatter: { left: ["sy"], bottom: ["sx", "size", "color"] },
  kpi: { left: ["value"], bottom: [] },
  table: { left: ["columns"], bottom: [] }
}, cf = /* @__PURE__ */ new Set(["line", "combo"]);
function sf({
  spec: e,
  update: t,
  toolbar: n,
  children: a
}) {
  var Je, Xe, Wt, Ut;
  const { meta: r } = Ye(), { locale: o } = Ge(), { chart: c } = e, s = c.family, l = Uo(e), u = x.useMemo(() => pn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), d = x.useCallback(
    (M) => M && (o == null ? void 0 : o.unitSystem) === "imperial" && u[M] ? u[M].imperialUnit : M,
    [o == null ? void 0 : o.unitSystem, u]
  ), f = x.useMemo(() => Ud(s), [s]), h = x.useMemo(() => Bt(e), [e]), p = x.useMemo(() => new Map(f.map((M) => [M.id, M])), [f]), [b, g] = x.useState(void 0), y = x.useMemo(() => Yv(r, e, b), [r, e, b]), _ = x.useMemo(() => Object.values(h).flat(), [h]), N = x.useCallback(
    (M) => {
      g(M), t({ ...e, query: {}, chart: { ...e.chart, mapping: void 0, familyOptions: void 0 } });
    },
    [e, t]
  ), k = x.useMemo(
    () => {
      var M;
      return y.viewLocked ? [y.viewLocked] : [(M = y.sourceCube) == null ? void 0 : M.name, ...y.relatedCubes.map((z) => z.name)].filter(
        Boolean
      );
    },
    [y]
  ), R = x.useMemo(
    () => Object.values(h).every((M) => M.length === 0),
    [h]
  ), C = cf.has(s), w = x.useCallback(
    (M) => {
      var K, X, ie;
      if (s === "combo") {
        const re = c.familyOptions ?? {}, ce = (Array.isArray(re.series) ? re.series : []).find(
          (St) => St.member === M
        );
        return (ce == null ? void 0 : ce.axis) === "right" ? "right" : "left";
      }
      const z = (K = c.mapping) == null ? void 0 : K.series;
      return (z && (z.mode === "measures" || z.mode === "pivot") ? (ie = (X = z.meta) == null ? void 0 : X[M]) == null ? void 0 : ie.axis : void 0) === "right" ? "right" : "left";
    },
    [s, c.familyOptions, c.mapping]
  ), L = x.useMemo(() => {
    var ie, re;
    const M = h.y ?? [], z = (ce) => M.find((St) => w(St) === ce), E = z("left"), K = C ? z("right") : void 0, X = (ce) => ce ? Fe(r, ce) : void 0;
    return {
      leftKey: E ? Rt(X(E)) : void 0,
      rightKey: K ? Rt(X(K)) : void 0,
      leftLabel: E ? Oa(X(E), d((ie = X(E)) == null ? void 0 : ie.unit)) : void 0,
      rightLabel: K ? Oa(X(K), d((re = X(K)) == null ? void 0 : re.unit)) : void 0
    };
  }, [h, C, w, r, d]), D = x.useCallback(
    (M) => {
      const z = Rt(M), { leftKey: E, rightKey: K } = L;
      return E === void 0 || z === E ? "left" : K === void 0 || z === K ? "right" : "left";
    },
    [L]
  ), V = x.useCallback(
    (M, z) => {
      var E;
      if (z) {
        if (y.scopeComponent !== void 0 && z.connectedComponent !== y.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (z.memberType === "measure" && y.measureSource && z.cube !== y.measureSource)
          return `Measures come from one table (${((E = y.sourceCube) == null ? void 0 : E.title) ?? y.measureSource}). Remove them to switch.`;
        if (M === "y" && z.memberType === "measure") {
          const { leftKey: K, rightKey: X, leftLabel: ie, rightLabel: re } = L, ce = Rt(z);
          if (C) {
            if (K !== void 0 && X !== void 0 && ce !== K && ce !== X)
              return `Both axes show ${ie} & ${re} — remove one to add a third unit.`;
          } else if (K !== void 0 && ce !== K)
            return `This axis shows ${ie}; ${z.label ?? "this field"} is ${tr(z)}`;
        }
      }
    },
    [y, L, C]
  ), I = C ? [L.leftLabel, L.rightLabel].filter(Boolean).join(" · ") || void 0 : L.leftLabel, j = x.useMemo(() => {
    var z;
    const M = {};
    if (s === "bar" || s === "line" || s === "area") {
      const E = (z = c.mapping) == null ? void 0 : z.series;
      if (E && E.mode === "measures") {
        const K = E.members.map((ie) => {
          var re, ce;
          return { key: ie, colorToken: (ce = (re = E.meta) == null ? void 0 : re[ie]) == null ? void 0 : ce.colorToken };
        }), X = Kn(K, c.colors);
        E.members.forEach((ie, re) => {
          M[ie] = X[re];
        });
      }
    } else if (s === "combo") {
      const E = c.familyOptions ?? {}, K = Array.isArray(E.series) ? E.series : [], X = K.map((re) => ({ key: re.member, colorToken: re.colorToken })), ie = Kn(X, c.colors);
      K.forEach((re, ce) => {
        M[re.member] = ie[ce];
      });
    }
    return M;
  }, [s, c.mapping, c.colors, c.familyOptions]), B = x.useCallback(
    (M, z, E) => {
      const K = Fe(r, z);
      if (V(M, K)) return;
      let X = ya(e, s, M, z, E);
      C && M === "y" && (X = rr(X, s, z, D(K))), t(X);
    },
    [V, r, t, e, s, C, D]
  ), T = x.useCallback(
    (M, z) => {
      var X;
      if (!z) return;
      if (y.scopeComponent !== void 0 && z.connectedComponent !== y.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (z.memberType === "measure" && y.measureSource && z.cube !== y.measureSource)
        return `Measures come from one table (${((X = y.sourceCube) == null ? void 0 : X.title) ?? y.measureSource}). Remove them to switch.`;
      const E = M === "left" ? L.leftKey : L.rightKey, K = M === "left" ? L.leftLabel : L.rightLabel;
      if (E !== void 0 && Rt(z) !== E)
        return `This axis shows ${K}; ${z.label ?? "this field"} is ${tr(z)}`;
    },
    [y, L]
  ), O = x.useCallback(
    (M, z, E) => {
      const K = Fe(r, z);
      T(M, K) || t(rr(ya(e, s, "y", z, E), s, z, M));
    },
    [T, r, t, e, s]
  ), G = s === "bar" && c.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : of[s], te = G.left.map((M) => p.get(M)).filter(Boolean), $ = G.bottom.map((M) => p.get(M)).filter(Boolean), Y = (Je = h.color) == null ? void 0 : Je[0], Z = ((Xe = h.y) == null ? void 0 : Xe.length) ?? 0, U = Y && Z > 1 ? `${Z} measures × ${((Wt = Fe(r, Y)) == null ? void 0 : Wt.label) ?? "this split"} — one series per measure per value.` : void 0, Q = s !== "kpi" && s !== "table", ue = h.y ?? [], J = ue.find((M) => w(M) !== "right"), H = C ? ue.find((M) => w(M) === "right") : void 0, A = (M) => {
    var K, X, ie, re;
    if (!M) return;
    const z = (K = c.mapping) == null ? void 0 : K.series;
    return (z && z.mode === "measures" ? (ie = (X = z.meta) == null ? void 0 : X[M]) == null ? void 0 : ie.label : void 0) ?? ((re = Fe(r, M)) == null ? void 0 : re.label);
  }, F = (M) => {
    var E, K, X, ie;
    const z = (re, ce) => ce ? /* @__PURE__ */ i(_a, { spec: e, update: t, axis: re, title: "Title", auto: A(ce) }) : null;
    switch (M) {
      case "y":
        return z("y", J);
      // single value axis (bar / area)
      case "x":
        return z("x", (K = (E = c.mapping) == null ? void 0 : E.category) == null ? void 0 : K.member);
      case "sy":
        return z("y", (X = h.sy) == null ? void 0 : X[0]);
      // scatter Y axis
      case "sx":
        return z("x", (ie = h.sx) == null ? void 0 : ie[0]);
      // scatter X axis
      default:
        return null;
    }
  }, q = (M, z) => /* @__PURE__ */ i(
    Ma,
    {
      spec: e,
      update: t,
      well: M,
      placed: h[M.id] ?? [],
      allPlaced: _,
      optionFor: (E) => Fe(r, E),
      colorFor: (E) => j[E],
      scope: y,
      blockReason: (E) => V(M.id, E),
      onAdd: (E, K) => B(M.id, E, K),
      badge: M.id === "y" ? I : void 0,
      orientation: z,
      note: M.id === "color" ? U : void 0,
      control: F(M.id)
    },
    M.id
  ), de = p.get("y"), ze = (M) => {
    if (!de) return null;
    const z = M === "left" ? J : H;
    return /* @__PURE__ */ i(
      Ma,
      {
        spec: e,
        update: t,
        well: de,
        label: M === "left" ? "Left axis" : "Right axis",
        placed: (h.y ?? []).filter((E) => w(E) === M),
        allPlaced: _,
        optionFor: (E) => Fe(r, E),
        colorFor: (E) => j[E],
        scope: y,
        blockReason: (E) => T(M, E),
        onAdd: (E, K) => O(M, E, K),
        badge: M === "left" ? L.leftLabel : L.rightLabel,
        orientation: "vertical",
        disableReorder: !0,
        control: z ? /* @__PURE__ */ i(
          _a,
          {
            spec: e,
            update: t,
            axis: M === "left" ? "y" : "y2",
            title: "Title",
            auto: A(z)
          }
        ) : null
      },
      `y-${M}`
    );
  }, Re = () => {
    const M = p.get("value"), z = (h.value ?? []).length > 0, E = c.familyOptions ?? {};
    return /* @__PURE__ */ v(oe, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        M ? q(M, "vertical") : null,
        z ? /* @__PURE__ */ i(
          In,
          {
            label: "Time, range & display",
            summary: E.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(nf, { spec: e, update: t })
          }
        ) : null
      ] }),
      z ? /* @__PURE__ */ v(oe, { children: [
        /* @__PURE__ */ i(In, { label: "Comparison", summary: E.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(rf, { spec: e, update: t }) }),
        /* @__PURE__ */ i(In, { label: "Sparkline", summary: E.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(af, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      R ? null : /* @__PURE__ */ i(Hv, { spec: e, update: t }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          $v,
          {
            currentName: y.viewLocked ?? ((Ut = y.sourceCube) == null ? void 0 : Ut.name),
            hasFields: _.length > 0,
            onSelect: N
          }
        ),
        /* @__PURE__ */ i(zv, { spec: e, update: t, cube: l, scopeCubes: k, scope: y })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      te.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", s === "kpi" ? "cv:w-56" : "cv:w-40"), children: s === "kpi" ? Re() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        te.flatMap(
          (M) => C && M.id === "y" ? [ze("left"), ze("right")] : [q(M, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          a,
          /* @__PURE__ */ i(Bv, { spec: e, update: t, empty: R })
        ] }),
        $.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          $.map((M) => q(M, "horizontal")),
          Q && !R ? /* @__PURE__ */ i(Ev, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Oa(e, t) {
  const n = tr(e), a = t ?? (e == null ? void 0 : e.unit);
  return a && a !== n ? `${n} (${a})` : n;
}
function ii(e, t) {
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
function La(e) {
  const t = io.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function lf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [a, r] = x.useState(e), [o, c] = x.useState(e);
  x.useEffect(() => {
    r(e), c(e);
  }, [e]);
  const s = ii((f) => t(f), n), l = x.useMemo(() => La(a), [a]), u = l.length === 0, d = x.useCallback(
    (f) => {
      r(f), La(f).length === 0 && (c(f), s(f));
    },
    [s]
  );
  return { draft: a, issues: l, valid: u, committed: o, update: d };
}
const uf = () => {
};
function mf({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: a = 250,
  fill: r = !1,
  className: o
}) {
  const { draft: c, issues: s, valid: l, committed: u, update: d } = lf({
    spec: e,
    onChange: t ?? uf,
    debounceMs: a
  }), f = u, h = (k) => {
    var R, C, w;
    return (((R = k.measures) == null ? void 0 : R.length) ?? 0) > 0 || (((C = k.dimensions) == null ? void 0 : C.length) ?? 0) > 0 || (((w = k.timeDimensions) == null ? void 0 : w.some((L) => typeof L.granularity == "string")) ?? !1);
  }, p = (k) => {
    var R;
    return (((R = k.measures) == null ? void 0 : R.length) ?? 0) > 0;
  }, b = c.chart.family !== "table", g = h(c.query) && h(f.query) && (!b || p(c.query) && p(f.query)), y = b && !p(c.query) ? `Add a value (measure) to build this ${c.chart.family} chart.` : "Add fields from the axes to build this chart.", _ = g ? /* @__PURE__ */ i(_r, { query: f.query, chart: f.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: y }) }), N = n ? /* @__PURE__ */ v(W, { size: "sm", disabled: !l, onClick: () => n(u), children: [
    /* @__PURE__ */ i(Ya, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2", r ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        l ? null : /* @__PURE__ */ v(pr, { variant: "destructive", children: [
          /* @__PURE__ */ i(Ia, { className: "cv:size-4" }),
          /* @__PURE__ */ i(gr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(br, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            s.slice(0, 3).map((k, R) => /* @__PURE__ */ v("li", { children: [
              k.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: k.path }) : null,
              " ",
              k.message
            ] }, R)),
            s.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              s.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(sf, { spec: c, update: d, toolbar: N, children: _ }) })
      ]
    }
  );
}
function df({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: a,
  onUndo: r,
  onRedo: o,
  canUndo: c,
  canRedo: s,
  onDiscard: l,
  discardDisabled: u,
  onSave: d,
  saveDisabled: f,
  className: h
}) {
  const p = r || o;
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
          /* @__PURE__ */ v(W, { variant: "outline", size: "sm", onClick: () => n("chart"), children: [
            /* @__PURE__ */ i(Ga, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(W, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(ur, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(W, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(Wi, {}),
            " Input"
          ] }),
          a ? /* @__PURE__ */ v(W, { variant: "outline", size: "sm", onClick: a, children: [
            /* @__PURE__ */ i(Ui, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          p ? /* @__PURE__ */ v(oe, { children: [
            /* @__PURE__ */ i(
              W,
              {
                variant: "ghost",
                size: "icon",
                onClick: r,
                disabled: !c,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(Gi, {})
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
                children: /* @__PURE__ */ i(Yi, {})
              }
            )
          ] }) : null,
          l ? /* @__PURE__ */ v(
            W,
            {
              variant: "ghost",
              size: "sm",
              onClick: l,
              disabled: u,
              className: "cv:text-muted-foreground cv:hover:text-destructive",
              children: [
                /* @__PURE__ */ i(Qi, {}),
                " Discard"
              ]
            }
          ) : null,
          d ? /* @__PURE__ */ v(W, { size: "sm", onClick: d, disabled: f, children: [
            /* @__PURE__ */ i(Ya, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const ci = "lg", si = 12;
function vf(e, t) {
  const n = t[ci];
  if (n && n.length > 0) return n;
  let a, r = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const c = o.reduce((s, l) => Math.max(s, l.x + l.w), 0);
    c > r && (a = o, r = c);
  }
  return a ?? e;
}
function ff(e, t) {
  const n = new Map(e.map((c) => [c.i, c])), a = new Map(t.map((c) => [c.i, c])), r = [], o = (c, s) => {
    const l = {
      i: c.i,
      x: c.x,
      y: c.y,
      w: c.w,
      h: c.h
    };
    (s == null ? void 0 : s.minW) !== void 0 && (l.minW = s.minW), (s == null ? void 0 : s.minH) !== void 0 && (l.minH = s.minH), (s == null ? void 0 : s.static) !== void 0 && (l.static = s.static), r.push(l);
  };
  for (const c of e) {
    const s = a.get(c.i);
    s && o(s, c);
  }
  for (const c of t)
    n.has(c.i) || o(c, void 0);
  return r;
}
const hf = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function pf(e, t, n, a = si) {
  const r = hf[n], o = Math.min(r.w, a), c = e.reduce((s, l) => Math.max(s, l.y + l.h), 0);
  return {
    i: t,
    x: 0,
    y: c,
    w: o,
    h: r.h,
    minW: Math.min(r.minW, o),
    minH: r.minH
  };
}
function li(e, t, n = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? si) {
  const r = pf(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, r]
  };
}
function gf(e, t, n) {
  const a = e.widgets.find((o) => o.id === t);
  if (!a) return e;
  const r = JSON.parse(JSON.stringify(a));
  return r.id = n, li(e, r);
}
function bf(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function yf(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const xf = 12;
function wf(e) {
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
function kf(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Nf({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: a,
  onDuplicate: r,
  onDelete: o,
  onLayoutChange: c
}) {
  const [s, l] = _o(), u = e.grid ?? {}, d = u.cols ?? xf, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], p = u.containerPadding ?? [0, 0], { breakpoints: b, cols: g } = x.useMemo(
    () => wf(d),
    [d]
  ), y = x.useMemo(
    () => ({ [ci]: kf(e.layout) }),
    [e.layout]
  ), _ = x.useMemo(
    () => new Map(e.widgets.map((C) => [C.id, C])),
    [e.widgets]
  ), N = x.useRef(c);
  x.useEffect(() => {
    N.current = c;
  }, [c]);
  const k = x.useRef(null), R = x.useCallback(
    (C, w) => {
      const L = vf(C, w);
      N.current(L.map((D) => ({ ...D })));
    },
    []
  );
  return /* @__PURE__ */ i(Cr, { spec: e, children: /* @__PURE__ */ i("div", { ref: s, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    Ja,
    {
      width: l,
      layouts: y,
      breakpoints: b,
      cols: g,
      rowHeight: f,
      margin: h,
      containerPadding: p,
      dragConfig: { enabled: !0, handle: `.${an}` },
      resizeConfig: { enabled: !0, handles: ["se", "sw", "nw"] },
      onLayoutChange: R,
      children: e.layout.map((C) => {
        const w = _.get(C.i);
        if (!w) return null;
        const L = w.id === t;
        return (
          // Selecting = a click that bubbles up from anywhere in the widget;
          // RGL's drag (mousedown on the chrome header handle) wins for drags,
          // so we don't need a blocking overlay that would also block dragging.
          /* @__PURE__ */ v(
            "div",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": `Select ${w.title ?? w.type}`,
              "aria-pressed": L,
              onPointerDown: (D) => {
                k.current = { x: D.clientX, y: D.clientY };
              },
              onClick: (D) => {
                const V = k.current;
                V && Math.hypot(D.clientX - V.x, D.clientY - V.y) > 5 || n(w.id);
              },
              onKeyDown: (D) => {
                (D.key === "Enter" || D.key === " ") && (D.preventDefault(), n(w.id));
              },
              className: S(
                "group cv:relative cv:h-full cv:w-full cv:cursor-move cv:rounded-xl cv:ring-offset-2 cv:ring-offset-background cv:transition-shadow cv:focus-visible:outline-none",
                // No idle/hover outline (it read as harsh); only the SELECTED
                // widget gets a ring. Keyboard focus still shows a faint ring.
                L ? "cv:ring-2 cv:ring-primary" : "cv:ring-0 cv:focus-visible:ring-2 cv:focus-visible:ring-border"
              ),
              children: [
                /* @__PURE__ */ i(Ko, { widget: w, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(an, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
                /* @__PURE__ */ v("div", { className: "cv:absolute cv:right-2 cv:top-2 cv:z-20 cv:flex cv:items-center cv:gap-1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Edit ${w.title ?? w.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), a(w.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Ji, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Duplicate ${w.title ?? w.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), r(w.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-accent cv:hover:text-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(Xi, {})
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      "aria-label": `Delete ${w.title ?? w.type}`,
                      onClick: (D) => {
                        D.stopPropagation(), o(w.id);
                      },
                      className: S(
                        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md",
                        "cv:bg-card/90 cv:text-muted-foreground cv:shadow-sm cv:backdrop-blur",
                        "cv:hover:bg-destructive cv:hover:text-destructive-foreground cv:[&_svg]:size-4"
                      ),
                      children: /* @__PURE__ */ i(gt, {})
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
function Cf(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function Sf({
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
  const r = Xa({
    extensions: [eo],
    editable: !0,
    content: Cf(e.doc),
    onUpdate: ({ editor: o }) => {
      const c = o.getJSON();
      n.current({ ...a.current, doc: c });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(
          Ro,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return r ? /* @__PURE__ */ i(me, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(_f, { editor: r }),
    /* @__PURE__ */ i(Za, { editor: r })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function qe({ active: e, onClick: t, title: n, children: a }) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: "button",
      title: n,
      "aria-label": n,
      "aria-pressed": e,
      onMouseDown: (r) => r.preventDefault(),
      onClick: t,
      className: S(
        "cv:inline-flex cv:size-7 cv:items-center cv:justify-center cv:rounded-md cv:text-muted-foreground cv:transition-colors",
        "cv:hover:bg-muted cv:hover:text-foreground cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
        "cv:[&_svg]:size-4",
        e && "cv:bg-muted cv:text-foreground"
      ),
      children: a
    }
  );
}
function _f({ editor: e }) {
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
          qe,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(Zi, {})
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(ec, {})
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(tc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          qe,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(nc, {})
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(rc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          qe,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(ac, {})
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(oc, {})
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(ic, {})
          }
        )
      ]
    }
  );
}
const Rf = dr(
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
function Af({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: S(Rf({ variant: t }), e), ...n });
}
function Mf({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: a,
  id: r,
  className: o
}) {
  const { meta: c, isLoading: s } = Ye(), l = x.useMemo(() => wn(c), [c]), u = l.filter((h) => h.type === "cube"), d = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(Oe, { value: e, onValueChange: t, disabled: a || s, children: [
    /* @__PURE__ */ i(De, { id: r, className: o, children: /* @__PURE__ */ i(Le, { placeholder: s ? "Loading…" : n, children: f ? /* @__PURE__ */ i(jn, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v(Te, { children: [
      d.length > 0 ? /* @__PURE__ */ v(Yn, { children: [
        /* @__PURE__ */ i(Qn, { children: "Views" }),
        d.map((h) => /* @__PURE__ */ i(pe, { value: h.name, children: /* @__PURE__ */ i(jn, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(Yn, { children: [
        /* @__PURE__ */ i(Qn, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(pe, { value: h.name, children: /* @__PURE__ */ i(jn, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function jn({ option: e }) {
  const t = e.type === "view" ? mr : Ha;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(Af, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const Of = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Lf(e) {
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
function Df({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: a } = e.control, r = (s) => n({ ...e, control: { ...e.control, control: s } }), o = (s) => n({ ...e, control: { ...e.control, variable: s } }), c = (s) => {
    s !== a.kind && r(Lf(s));
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col", children: [
    /* @__PURE__ */ i(
      me,
      {
        label: "Variable",
        hint: t.length === 0 ? "No variables yet — declare one in the Variables panel." : "The dashboard variable this control writes.",
        children: /* @__PURE__ */ v(
          Oe,
          {
            value: e.control.variable || void 0,
            onValueChange: o,
            disabled: t.length === 0,
            children: [
              /* @__PURE__ */ i(De, { children: /* @__PURE__ */ i(Le, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(Te, { children: t.map((s) => /* @__PURE__ */ i(pe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(me, { label: "Control", children: /* @__PURE__ */ v(Oe, { value: a.kind, onValueChange: (s) => c(s), children: [
      /* @__PURE__ */ i(De, { children: /* @__PURE__ */ i(Le, {}) }),
      /* @__PURE__ */ i(Te, { children: Oc.options.map((s) => /* @__PURE__ */ i(pe, { value: s, children: Of[s] }, s)) })
    ] }) }),
    /* @__PURE__ */ i(Tf, { control: a, onChange: r, variables: t })
  ] });
}
function Tf({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(zf, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i($f, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(Ef, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(Pf, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(If, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(jf, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function zf({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(oe, { children: [
    /* @__PURE__ */ i(
      me,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          Ff,
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
function Ff({
  selected: e,
  onChange: t
}) {
  const [n, a] = x.useState(!1), r = new Set(e.map((s) => s.toLowerCase())), o = (s) => {
    const l = new Set(r);
    l.has(s) ? l.delete(s) : l.add(s), t(Xt.filter((u) => l.has(u.value)).map((u) => u.value));
  }, c = r.size === 0 ? "Default set" : r.size === Xt.length ? "All presets" : `${r.size} selected`;
  return /* @__PURE__ */ v(Ce, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Se, { asChild: !0, children: /* @__PURE__ */ v(W, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: c }),
      /* @__PURE__ */ i(rt, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(_e, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: Xt.map((s) => {
      const l = r.has(s.value);
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
function $f({
  control: e,
  onChange: t,
  variables: n
}) {
  const a = new Set(e.options ?? []), r = (s) => {
    const l = new Set(a);
    l.has(s) ? l.delete(s) : l.add(s);
    const u = et.options.filter((d) => l.has(d));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((s) => s.type === "dateRange" || s.type === "time"), c = "__none__";
  return /* @__PURE__ */ v(oe, { children: [
    /* @__PURE__ */ i(
      me,
      {
        label: "Proportion to",
        hint: "Narrow the buckets to a date-range variable's span (e.g. hours for a 1-day range).",
        children: /* @__PURE__ */ v(
          Oe,
          {
            value: e.rangeVariable ?? c,
            onValueChange: (s) => t({ ...e, rangeVariable: s === c ? void 0 : s }),
            disabled: o.length === 0,
            children: [
              /* @__PURE__ */ i(De, { children: /* @__PURE__ */ i(Le, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(Te, { children: [
                /* @__PURE__ */ i(pe, { value: c, children: "None" }),
                o.map((s) => /* @__PURE__ */ i(pe, { value: s.name, children: s.label ? `${s.label} (${s.name})` : s.name }, s.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(me, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: et.options.map((s) => {
      const l = a.has(s);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": l,
          onClick: () => r(s),
          className: "cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize cv:transition-colors" + (l ? "cv:border-primary cv:bg-primary/10 cv:text-foreground" : "cv:border-border cv:text-muted-foreground cv:hover:text-foreground"),
          children: s
        },
        s
      );
    }) }) })
  ] });
}
function Ef({
  control: e,
  onChange: t
}) {
  const n = (o, c) => {
    const s = e.options.map(
      (l, u) => u === o ? { value: c.value ?? String(l.value), label: c.label ?? l.label } : l
    );
    t({ ...e, options: s });
  }, a = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), r = (o) => t({ ...e, options: e.options.filter((c, s) => s !== o) });
  return /* @__PURE__ */ v(oe, { children: [
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
      me,
      {
        label: "Options",
        action: /* @__PURE__ */ v(W, { variant: "ghost", size: "sm", onClick: a, children: [
          /* @__PURE__ */ i(Vt, {}),
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
            W,
            {
              variant: "ghost",
              size: "icon",
              className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground",
              "aria-label": "Remove option",
              onClick: () => r(c),
              children: /* @__PURE__ */ i(gt, {})
            }
          )
        ] }, c)) })
      }
    )
  ] });
}
function Pf({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(oe, { children: [
    /* @__PURE__ */ i(me, { label: "From", children: /* @__PURE__ */ v(
      Oe,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(De, { children: /* @__PURE__ */ i(Le, {}) }),
          /* @__PURE__ */ v(Te, { children: [
            /* @__PURE__ */ i(pe, { value: "dimension", children: "Dimensions" }),
            /* @__PURE__ */ i(pe, { value: "measure", children: "Measures" }),
            /* @__PURE__ */ i(pe, { value: "dimensionOrMeasure", children: "Dimensions & measures" })
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
          W,
          {
            variant: "ghost",
            size: "sm",
            className: "cv:h-6 cv:px-1.5 cv:text-xs cv:text-muted-foreground",
            onClick: () => t({ ...e, cube: void 0 }),
            children: "Clear"
          }
        ) : null,
        children: /* @__PURE__ */ i(
          Mf,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function If({
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
function jf({
  control: e,
  onChange: t
}) {
  const n = (a, r) => /* @__PURE__ */ i(me, { label: r, children: /* @__PURE__ */ i(
    ve,
    {
      type: "number",
      value: e[a] ?? "",
      onChange: (o) => {
        const c = o.target.value;
        t({ ...e, [a]: c === "" ? void 0 : Number(c) });
      }
    }
  ) });
  return /* @__PURE__ */ v(oe, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function Vf(e) {
  return { schemaVersion: lt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function qf(e) {
  const t = {
    schemaVersion: lt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Kf(e, t) {
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
  onVariablesChange: a,
  fill: r = !1
}) {
  const o = a ? (c) => a([...t, c]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", r && "cv:h-full"), children: [
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
      /* @__PURE__ */ i(Cr, { spec: Vf(t), children: /* @__PURE__ */ i(Nv, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(r && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        mf,
        {
          fill: r,
          spec: qf(e),
          onChange: (c) => n(Kf(e, c))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(Sf, { widget: e, onChange: n }) : /* @__PURE__ */ i(Df, { widget: e, variables: t, onChange: n })
  ] });
}
function Bf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !1,
  open: r = !0,
  onToggle: o,
  regionId: c,
  className: s
}) {
  const l = /* @__PURE__ */ v(oe, { children: [
    a ? /* @__PURE__ */ i(
      dn,
      {
        className: S(
          "cv:size-4 cv:shrink-0 cv:text-muted-foreground cv:transition-transform",
          r && "cv:rotate-90"
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
        a ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": r,
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
function Hf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !0,
  defaultOpen: r = !0,
  open: o,
  onOpenChange: c,
  className: s,
  children: l
}) {
  const u = o !== void 0, [d, f] = x.useState(r), h = a ? u ? o : d : !0, p = x.useId(), b = x.useCallback(() => {
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
          Bf,
          {
            title: e,
            summary: t,
            actions: n,
            collapsible: a,
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
function Wf(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Uf(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Gf(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Yf(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Qf(e, t) {
  switch (e) {
    case "chart":
      return Uf(t);
    case "text":
      return Gf(t);
    case "input":
      return Yf(t);
  }
}
function Jf(e) {
  return { name: e, type: "string" };
}
function Xf(e) {
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
const Zf = {
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
function eh({
  variables: e,
  onChange: t,
  newName: n
}) {
  const a = x.useRef(0), r = () => {
    if (n) return n();
    let l;
    do
      l = `var_${++a.current}`;
    while (e.some((u) => u.name === l));
    return l;
  }, o = (l, u) => {
    t(e.map((d, f) => f === l ? th(d, u) : d));
  }, c = (l) => t(e.filter((u, d) => d !== l)), s = () => t([...e, Jf(r())]);
  return /* @__PURE__ */ i(
    Hf,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(W, { variant: "ghost", size: "sm", onClick: s, children: [
        /* @__PURE__ */ i(Vt, {}),
        " Add"
      ] }),
      children: e.length === 0 ? /* @__PURE__ */ v("p", { className: "cv:py-1 cv:text-xs cv:text-muted-foreground", children: [
        "No variables. Variables bind input controls and `",
        "{var}",
        "` query tokens."
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-3", children: e.map((l, u) => /* @__PURE__ */ i(
        nh,
        {
          decl: l,
          duplicate: e.some((d, f) => f !== u && d.name === l.name && l.name !== ""),
          onChange: (d) => o(u, d),
          onRemove: () => c(u)
        },
        u
      )) })
    }
  );
}
function th(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Xf(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function nh({
  decl: e,
  duplicate: t,
  onChange: n,
  onRemove: a
}) {
  const r = e.name === "" ? "Name required" : t ? "Duplicate name" : void 0;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "variable-row",
      className: "cv:rounded-md cv:border cv:border-border cv:bg-card/40 cv:p-2.5",
      children: [
        /* @__PURE__ */ v("div", { className: "cv:mb-1 cv:flex cv:items-start cv:justify-between cv:gap-2", children: [
          /* @__PURE__ */ i("div", { className: "cv:min-w-0 cv:flex-1", children: /* @__PURE__ */ i(me, { label: "Name", error: r, className: "cv:py-0", children: /* @__PURE__ */ i(
            ve,
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
              className: "cv:mt-6 cv:size-8 cv:shrink-0 cv:text-muted-foreground",
              "aria-label": "Remove variable",
              onClick: a,
              children: /* @__PURE__ */ i(gt, {})
            }
          )
        ] }),
        /* @__PURE__ */ i(me, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(
          Oe,
          {
            value: e.type,
            onValueChange: (o) => n({ type: o }),
            children: [
              /* @__PURE__ */ i(De, { children: /* @__PURE__ */ i(Le, {}) }),
              /* @__PURE__ */ i(Te, { children: ao.options.map((o) => /* @__PURE__ */ i(pe, { value: o, children: Zf[o] }, o)) })
            ]
          }
        ) }),
        /* @__PURE__ */ i(me, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
          ve,
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
        /* @__PURE__ */ i(rh, { decl: e, onChange: (o) => n({ default: o }) })
      ]
    }
  );
}
function rh({
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
    return /* @__PURE__ */ i(me, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
      ve,
      {
        type: "number",
        value: typeof e.default == "number" ? e.default : "",
        onChange: (r) => {
          const o = r.target.value;
          t(o === "" ? void 0 : Number(o));
        }
      }
    ) });
  const n = e.type === "dateRange" || e.type === "time" ? "Relative is preferred, e.g. This month, last 30 days." : e.array ? "Comma-separated values." : void 0, a = Array.isArray(e.default) ? e.default.join(", ") : ah(e.default);
  return /* @__PURE__ */ i(me, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    ve,
    {
      value: a,
      placeholder: oh(e.type),
      onChange: (r) => {
        const o = r.target.value;
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
function ah(e) {
  return e === void 0 ? "" : typeof e == "string" ? e : typeof e == "number" || typeof e == "boolean" ? String(e) : "";
}
function oh(e) {
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
function Fh({
  spec: e,
  remoteSpec: t,
  onRemoteAdopted: n,
  onChange: a,
  onSave: r,
  newId: o,
  debounceMs: c = 300,
  onUndo: s,
  onRedo: l,
  canUndo: u,
  canRedo: d,
  onDiscard: f,
  className: h
}) {
  const [p, b] = x.useState(e);
  x.useEffect(() => b(e), [e]);
  const [g, y] = x.useState(null), _ = x.useRef(0), [N, k] = x.useState(null), R = x.useRef(g), C = x.useRef(N), w = x.useRef(p);
  x.useEffect(() => {
    R.current = g, C.current = N, w.current = p;
  });
  const L = x.useRef(null);
  L.current === null && (L.current = o ?? Wf());
  const D = o ?? L.current, V = ii(
    (F) => a == null ? void 0 : a(F),
    c
  ), I = x.useCallback(
    (F) => {
      _.current = Date.now(), b((q) => {
        const de = F(q);
        return V(de), de;
      });
    },
    [V]
  ), j = x.useRef(t);
  x.useEffect(() => {
    if (!t || t === j.current) return;
    const F = 500;
    let q = null;
    const de = () => {
      var Xe;
      const ze = Date.now() - _.current;
      if (ze < F) {
        q = setTimeout(de, F - ze);
        return;
      }
      j.current = t;
      const Re = /* @__PURE__ */ new Set();
      ((Xe = C.current) == null ? void 0 : Xe.kind) === "widget" && Re.add(C.current.id), R.current && Re.add(R.current);
      const Je = ch(t, w.current, Re);
      b(Je), n == null || n(Je);
    };
    return de(), () => {
      q && clearTimeout(q);
    };
  }, [t]);
  const B = x.useCallback(
    (F) => {
      const q = Qf(F, D());
      I((de) => li(de, q)), y(q.id), k({ kind: "widget", id: q.id });
    },
    [I, D]
  ), T = x.useCallback((F) => y(F), []), O = x.useCallback((F) => {
    y(F), k({ kind: "widget", id: F });
  }, []), G = x.useCallback(
    (F) => {
      I((q) => bf(q, F)), y((q) => q === F ? null : q), k((q) => (q == null ? void 0 : q.kind) === "widget" && q.id === F ? null : q);
    },
    [I]
  ), te = x.useCallback(
    (F) => {
      const q = D();
      I((de) => gf(de, F, q)), y(q);
    },
    [I, D]
  ), $ = x.useCallback(
    (F) => I((q) => yf(q, F)),
    [I]
  ), Y = x.useCallback(
    (F) => I((q) => ({ ...q, layout: ff(q.layout, F) })),
    [I]
  ), Z = x.useCallback(
    (F) => I((q) => ({ ...q, name: F || void 0 })),
    [I]
  ), U = x.useCallback(
    (F) => I((q) => ({ ...q, variables: F })),
    [I]
  ), Q = x.useMemo(
    () => co.safeParse(p),
    [p]
  ), ue = x.useCallback(() => {
    Q.success && (r == null || r(Q.data));
  }, [Q, r]), J = (N == null ? void 0 : N.kind) === "widget" ? p.widgets.find((F) => F.id === N.id) ?? null : null;
  x.useEffect(() => {
    (N == null ? void 0 : N.kind) === "widget" && !p.widgets.some((F) => F.id === N.id) && k(null);
  }, [N, p.widgets]);
  const H = x.useCallback(() => k(null), []), A = (N == null ? void 0 : N.kind) === "variables" ? "Dashboard variables" : J ? J.title ?? `${ih(J.type)} widget` : "";
  return /* @__PURE__ */ v("div", { "data-slot": "dashboard-editor", className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", h), children: [
    /* @__PURE__ */ i(
      df,
      {
        name: p.name ?? "",
        onNameChange: Z,
        onAdd: B,
        onEditVariables: () => k({ kind: "variables" }),
        onUndo: s,
        onRedo: l,
        canUndo: u,
        canRedo: d,
        onDiscard: f,
        onSave: r ? ue : void 0,
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
      Nf,
      {
        spec: p,
        selectedId: g,
        onSelect: T,
        onEdit: O,
        onDuplicate: te,
        onDelete: G,
        onLayoutChange: Y
      }
    ) }),
    N ? /* @__PURE__ */ v(
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
              /* @__PURE__ */ v(W, { variant: "ghost", size: "sm", onClick: H, children: [
                /* @__PURE__ */ i(lr, {}),
                " Done"
              ] }),
              /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: A })
            ] }),
            J ? /* @__PURE__ */ v(
              W,
              {
                variant: "ghost",
                size: "sm",
                className: "cv:text-destructive cv:hover:text-destructive",
                onClick: () => G(J.id),
                children: [
                  /* @__PURE__ */ i(gt, {}),
                  " Delete"
                ]
              }
            ) : null
          ] }),
          /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1 cv:overflow-hidden cv:p-4", children: N.kind === "variables" ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(eh, { variables: p.variables, onChange: U }) }) : (J == null ? void 0 : J.type) === "chart" ? /* @__PURE__ */ i(
            Da,
            {
              fill: !0,
              widget: J,
              variables: p.variables,
              onChange: $,
              onVariablesChange: U
            }
          ) : J ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
            Da,
            {
              widget: J,
              variables: p.variables,
              onChange: $,
              onVariablesChange: U
            }
          ) }) : null })
        ]
      }
    ) : null
  ] });
}
function ih(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function ch(e, t, n) {
  const a = new Map(t.widgets.map((u) => [u.id, u])), r = new Set(e.widgets.map((u) => u.id)), o = e.widgets.map(
    (u) => n.has(u.id) && a.has(u.id) ? a.get(u.id) : u
  );
  for (const u of t.widgets)
    !r.has(u.id) && n.has(u.id) && o.push(u);
  const c = new Map(t.layout.map((u) => [u.i, u])), s = new Set(e.layout.map((u) => u.i)), l = e.layout.map(
    (u) => n.has(u.i) && c.has(u.i) ? c.get(u.i) : u
  );
  for (const u of t.layout)
    !s.has(u.i) && n.has(u.i) && l.push(u);
  return { ...e, widgets: o, layout: l };
}
export {
  Au as AreaChartFamily,
  mu as AreaFamilyOptionsSchema,
  Rc as AxesOptionsSchema,
  Ln as AxisOptionsSchema,
  _u as BarChartFamily,
  lu as BarFamilyOptionsSchema,
  ci as CANONICAL_BREAKPOINT,
  We as ChartColorTokenSchema,
  sf as ChartEditOverlay,
  mf as ChartEditor,
  kc as ChartFamilySchema,
  ro as ChartOptionsSchema,
  rm as ChartRenderer,
  io as ChartSpecSchema,
  zh as ChartView,
  Dc as ChartWidgetSchema,
  Ac as ColorAssignmentSchema,
  Zu as ComboChartFamily,
  yu as ComboFamilyOptionsSchema,
  bu as ComboSeriesOptSchema,
  pu as CondFormatRuleSchema,
  _r as CubeChart,
  fm as CubeChartSpec,
  no as CubeQuerySchema,
  Nr as CubeVizContext,
  Lh as CubeVizProvider,
  fo as DEFAULTS,
  ge as DEFAULT_COLOR_RAMP,
  si as DEFAULT_COLS,
  Hn as DEFAULT_UNIT_CONVERSIONS,
  an as DRAG_HANDLE_CLASS,
  Th as Dashboard,
  Fh as DashboardEditor,
  Cr as DashboardProvider,
  co as DashboardSpecSchema,
  Vn as DateRangeSchema,
  ea as EM_DASH,
  Nf as EditorCanvas,
  df as EditorToolbar,
  Rv as FilterBuilder,
  bc as FilterOperatorSchema,
  Nc as FormatKindSchema,
  vn as FormatOptionsSchema,
  ss as GRANULARITY_PATTERN,
  et as GranularitySchema,
  Ec as GridConfigSchema,
  Oc as InputControlKindSchema,
  Lc as InputControlSchema,
  Df as InputWidgetEditor,
  zc as InputWidgetSchema,
  $m as InputWidgetView,
  Fu as KpiFamily,
  fu as KpiFamilyOptionsSchema,
  $c as LayoutItemSchema,
  yc as LeafFilterSchema,
  Sc as LegendOptionsSchema,
  Ru as LineChartFamily,
  uu as LineFamilyOptionsSchema,
  ne as MemberSchema,
  Qr as OrderDirSchema,
  wc as OrderSpecSchema,
  Mu as PieChartFamily,
  du as PieFamilyOptionsSchema,
  qn as QueryFilterSchema,
  qt as ReferenceLineOptSchema,
  Ko as RenderWidget,
  lt as SCHEMA_VERSION,
  gc as ScalarSchema,
  Lu as ScatterChartFamily,
  vu as ScatterFamilyOptionsSchema,
  Cc as SeriesMappingSchema,
  Jr as SeriesMetaSchema,
  so as SpecSchema,
  hu as TableColumnOptSchema,
  Bu as TableFamily,
  gu as TableFamilyOptionsSchema,
  Sf as TextWidgetEditor,
  Tc as TextWidgetSchema,
  pm as TextWidgetView,
  xc as TimeDimensionSchema,
  Mc as TipTapDocSchema,
  _c as TooltipOptionsSchema,
  tn as VarRefSchema,
  Pc as VariableDeclSchema,
  ao as VariableTypeSchema,
  to as VariableValueSchema,
  eh as VariablesPanel,
  To as WidgetChrome,
  Da as WidgetEditPanel,
  Fc as WidgetSpecSchema,
  li as appendWidget,
  Zr as assignColors,
  eu as axisKey,
  Co as builtinCharts,
  Vc as createCubeClient,
  Wf as createIdFactory,
  vo as createUnitsFormatter,
  cs as createVariableStore,
  ms as datePattern,
  Wn as deepMerge,
  Xf as defaultForType,
  fr as defaultFormatter,
  Oh as familyOptionsSchema,
  qc as fetchMeta,
  Ah as formatCategory,
  Dt as formatDateValue,
  vt as isEmptyValue,
  Me as isVarRef,
  jc as loadSpec,
  lo as looksLikeIsoDate,
  mo as makeChartFormat,
  Rh as makeDateFormatter,
  Mh as makeFormatter,
  ff as mergeLayout,
  pn as mergeUnitConversions,
  Uf as newChartWidget,
  Yf as newInputWidget,
  Gf as newTextWidget,
  Jf as newVariable,
  Qf as newWidget,
  Qc as normalize,
  vf as pickCanonicalLayout,
  pf as placeNewItem,
  nu as quantityLabel,
  bf as removeWidget,
  yf as replaceWidget,
  om as resolveChart,
  wu as resolveOptions,
  is as resolveQuery,
  Kn as resolveSeriesColors,
  ns as resolveValue,
  Sh as safeLoadSpec,
  us as toDate,
  Hc as toResultAnnotation,
  lf as useChartEditorState,
  _o as useContainerWidth,
  Ye as useCubeMeta,
  cm as useCubeQuery,
  Ge as useCubeVizContext,
  So as useDashboard,
  ii as useDebouncedCallback,
  Dh as useFormatter,
  $n as useNormalizedSeries,
  Sr as useOptionalDashboard,
  _h as validateSpec
};
//# sourceMappingURL=index.js.map
