import { jsx as i, jsxs as v, Fragment as ie } from "react/jsx-runtime";
import * as ir from "recharts";
import { BarChart as di, CartesianGrid as Vt, YAxis as Ie, XAxis as vt, Bar as za, LabelList as Fa, ReferenceLine as qt, LineChart as vi, Line as $a, AreaChart as Ea, Area as cr, PieChart as fi, Pie as hi, Cell as Pa, Label as pi, ScatterChart as gi, ZAxis as bi, Scatter as yi, RadialBarChart as xi, PolarAngleAxis as wi, RadialBar as ki, ResponsiveContainer as Ni, ComposedChart as Ci } from "recharts";
import * as x from "react";
import { createContext as Ia, useContext as sr, useMemo as te, useState as ft, useCallback as He, useEffect as Kt, useRef as ut, createElement as Si, useSyncExternalStore as _i, useId as Ri } from "react";
import { clsx as Ai } from "clsx";
import { extendTailwindMerge as Mi } from "tailwind-merge";
import { z as d } from "zod";
import { Minus as Oi, ArrowUp as vn, ArrowDown as fn, ChevronsUpDown as Li, AlertCircle as ja, ChevronLeft as lr, ChevronRight as Bt, ChevronDown as Ge, Check as je, ChevronUp as Di, CalendarIcon as Va, MoreVertical as Ti, RefreshCw as zi, Image as Fi, Sheet as $i, Type as ur, Hash as qa, Calendar as Ka, Search as Ei, Table2 as Ba, Database as Ha, Layers as mr, Variable as Pi, Plus as ht, Trash2 as xt, ListFilter as Ii, Box as Wa, EyeOff as Ua, Eye as Ga, BarChart4 as ji, Table as Vi, Gauge as qi, ScatterChart as Ki, PieChart as Bi, AreaChart as Hi, LineChart as Wi, BarChart3 as Ya, X as Yr, Save as Qa, SlidersHorizontal as Ui, Braces as Gi, Undo2 as Yi, Redo2 as Qi, RotateCcw as Ji, Pencil as Xi, Copy as Zi, Bold as ec, Italic as tc, Strikethrough as nc, Heading1 as rc, Heading2 as ac, List as oc, ListOrdered as ic, Quote as cc } from "lucide-react";
import * as en from "@radix-ui/react-popover";
import { cva as dr } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import sc from "@cubejs-client/core";
import { format as pe, isValid as Lt, parseISO as tn, differenceInCalendarDays as lc, subDays as Me, startOfMonth as Rn, subMonths as An, startOfQuarter as Mn, subQuarters as On, startOfYear as Ln, subYears as Dn, subWeeks as uc, startOfWeek as mc, endOfWeek as dc, endOfMonth as vc, endOfQuarter as fc, endOfYear as hc, parse as Ja } from "date-fns";
import { DayPicker as pc, useDayPicker as gc } from "react-day-picker";
import { ResponsiveGridLayout as Xa } from "react-grid-layout";
import { useEditor as Za, EditorContent as eo } from "@tiptap/react";
import to from "@tiptap/starter-kit";
const mt = 1, nn = d.object({ var: d.string().min(1) }).strict();
function Oe(e) {
  return typeof e == "object" && e !== null && "var" in e && typeof e.var == "string";
}
const rn = (e) => d.union([e, nn]), bc = d.union([d.string(), d.number(), d.boolean()]), rt = d.enum([
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
]), Kn = d.union([d.tuple([d.string(), d.string()]), d.string()]), no = d.union([
  d.string(),
  d.number(),
  d.boolean(),
  d.tuple([d.string(), d.string()]),
  // absolute date range
  d.array(d.string()),
  d.array(d.number())
]), re = d.string().min(1), yc = d.enum([
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
]), xc = d.object({
  member: re,
  operator: yc,
  values: d.array(d.union([bc, nn])).optional()
}).strict(), Bn = d.lazy(
  () => d.union([
    xc,
    d.object({ and: d.array(Bn) }).strict(),
    d.object({ or: d.array(Bn) }).strict()
  ])
), wc = d.object({
  dimension: re,
  granularity: rn(rt).optional(),
  dateRange: rn(Kn).optional(),
  compareDateRange: d.array(Kn).optional()
}).strict(), Qr = d.enum(["asc", "desc"]), kc = d.union([
  d.record(re, Qr),
  d.array(d.tuple([re, Qr]))
]), ro = d.object({
  measures: d.array(re).optional(),
  dimensions: d.array(re).optional(),
  timeDimensions: d.array(wc).optional(),
  filters: d.array(Bn).optional(),
  segments: d.array(re).optional(),
  order: kc.optional(),
  limit: rn(d.number()).optional(),
  offset: rn(d.number()).optional(),
  total: d.boolean().optional(),
  timezone: d.string().optional()
}).strict(), Nc = d.enum([
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
]), Ue = d.enum(["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]), Cc = d.enum([
  "number",
  "percent",
  "currency",
  "duration",
  "date",
  "auto"
]), hn = d.object({
  kind: Cc.optional(),
  decimals: d.number().optional(),
  abbreviate: d.boolean().optional(),
  prefix: d.string().optional(),
  suffix: d.string().optional(),
  unitSystem: d.enum(["metric", "imperial"]).optional(),
  dateFormat: d.string().optional()
}).strict(), Jr = d.object({
  label: d.string().optional(),
  colorToken: Ue.optional(),
  stackId: d.string().optional(),
  axis: d.enum(["left", "right"]).optional(),
  /** Per-series line shape (line/area) — overrides the family default. */
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  /** Per-series point markers (line/area) — overrides the family default. */
  dots: d.boolean().optional(),
  format: hn.optional()
}).strict(), Sc = d.object({
  category: d.object({ member: re }).strict(),
  series: d.union([
    d.object({
      mode: d.literal("measures"),
      members: d.array(re),
      meta: d.record(re, Jr).optional()
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
      meta: d.record(re, Jr).optional()
    }).strict()
  ])
}).strict(), _c = d.object({
  show: d.boolean().optional(),
  position: d.enum(["top", "right", "bottom", "left"]).optional()
}).strict(), Rc = d.object({
  show: d.boolean().optional(),
  indicator: d.enum(["dot", "line", "dashed"]).optional(),
  showTotal: d.boolean().optional()
}).strict(), Xr = d.union([d.number(), d.literal("auto")]), Tn = d.object({
  label: d.string().optional(),
  /** Hide the axis title only (the ticks/line stay). `hide` hides the whole axis. */
  labelHide: d.boolean().optional(),
  hide: d.boolean().optional(),
  scale: d.enum(["linear", "log"]).optional(),
  domain: d.tuple([Xr, Xr]).optional(),
  tickFormat: hn.optional()
}).strict(), Ac = d.object({
  x: Tn.optional(),
  y: Tn.optional(),
  y2: Tn.optional()
}).strict(), Mc = d.object({
  byKey: d.record(d.string(), Ue).optional(),
  ramp: d.array(Ue).optional()
}).strict(), ao = d.object({
  family: Nc,
  /** Generic data→visual mapping. Used by bar/line/area/pie/combo; scatter/kpi/table
      carry their own mapping inside familyOptions, so this is optional at the envelope. */
  mapping: Sc.optional(),
  orientation: d.enum(["vertical", "horizontal"]).optional(),
  stackMode: d.enum(["none", "stacked", "grouped", "percent"]).optional(),
  legend: _c.optional(),
  tooltip: Rc.optional(),
  axes: Ac.optional(),
  colors: Mc.optional(),
  format: hn.optional(),
  /** Per-family escape hatch, validated by a family-specific schema after default-merge. */
  familyOptions: d.record(d.string(), d.unknown()).optional()
}).strict(), Oc = d.object({ type: d.string(), content: d.array(d.unknown()).optional() }).passthrough(), Lc = d.enum([
  "dateRange",
  "granularity",
  "select",
  "memberSelect",
  "text",
  "number",
  "toggle"
]), Dc = d.object({
  variable: d.string().min(1),
  control: d.discriminatedUnion("kind", [
    d.object({
      kind: d.literal("dateRange"),
      presets: d.array(d.string()).optional(),
      allowFuture: d.boolean().optional()
    }).strict(),
    d.object({
      kind: d.literal("granularity"),
      options: d.array(rt).optional(),
      /** A dateRange variable whose span narrows the offered granularities. */
      rangeVariable: d.string().optional()
    }).strict(),
    d.object({
      kind: d.literal("select"),
      options: d.array(d.object({ value: no, label: d.string() }).strict()),
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
}).strict(), vr = {
  id: d.string().min(1),
  title: d.string().optional()
}, Tc = d.object({ ...vr, type: d.literal("chart"), query: ro, chart: ao }).strict(), zc = d.object({ ...vr, type: d.literal("text"), doc: Oc }).strict(), Fc = d.object({ ...vr, type: d.literal("input"), control: Dc }).strict(), $c = d.discriminatedUnion("type", [
  Tc,
  zc,
  Fc
]), Ec = d.object({
  i: d.string(),
  x: d.number(),
  y: d.number(),
  w: d.number(),
  h: d.number(),
  minW: d.number().optional(),
  minH: d.number().optional(),
  static: d.boolean().optional()
}).strict(), Pc = d.object({
  cols: d.number().optional(),
  rowHeight: d.number().optional(),
  margin: d.tuple([d.number(), d.number()]).optional(),
  containerPadding: d.tuple([d.number(), d.number()]).optional()
}).strict(), oo = d.enum([
  "dateRange",
  "time",
  "granularity",
  "string",
  "number",
  "boolean",
  "dimension",
  "measure",
  "dimensionOrMeasure"
]), Ic = d.object({
  name: d.string().min(1),
  type: oo,
  label: d.string().optional(),
  array: d.boolean().optional(),
  default: no.optional()
}).strict(), io = {
  schemaVersion: d.literal(mt),
  id: d.string().min(1),
  name: d.string().optional(),
  description: d.string().optional(),
  createdAt: d.string().optional(),
  updatedAt: d.string().optional()
}, co = d.object({ ...io, kind: d.literal("chart"), query: ro, chart: ao }).strict(), so = d.object({
  ...io,
  kind: d.literal("dashboard"),
  variables: d.array(Ic),
  widgets: d.array($c),
  layout: d.array(Ec),
  grid: Pc.optional()
}).strict(), lo = d.discriminatedUnion("kind", [co, so]), jc = {
  // 1: (raw) => ({ ...raw, /* ...lift to v2... */ }),
};
function Vc(e) {
  if (typeof e != "object" || e === null)
    throw new Error("cube-viz: spec must be a JSON object");
  let t = { ...e }, n = typeof t.schemaVersion == "number" ? t.schemaVersion : 1;
  if (n > mt)
    throw new Error(
      `cube-viz: spec schemaVersion ${n} is newer than supported ${mt} — update the library`
    );
  for (; n < mt; ) {
    const a = jc[n];
    if (!a) throw new Error(`cube-viz: no migration registered from schemaVersion ${n}`);
    t = a(t), n += 1, t.schemaVersion = n;
  }
  return lo.parse(t);
}
function Sh(e) {
  try {
    return { ok: !0, spec: Vc(e) };
  } catch (t) {
    return { ok: !1, error: t instanceof Error ? t.message : String(t) };
  }
}
function _h(e) {
  return lo.parse(e);
}
function qc(e) {
  return sc(e.token, {
    apiUrl: e.endpoint,
    ...e.headers ? { headers: e.headers } : {}
  });
}
async function Kc(e) {
  const t = await e.meta();
  return { cubes: t.cubes, meta: t };
}
const ye = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5"
], Bc = /* @__PURE__ */ new Set(["bar", "line", "area", "pie"]), zn = 8;
function Hn(e, t) {
  var l;
  const n = (l = t == null ? void 0 : t.ramp) != null && l.length ? t.ramp : ye, a = (t == null ? void 0 : t.byKey) ?? {}, r = (u, m) => a[u] ?? m, o = /* @__PURE__ */ new Set();
  for (const u of e) {
    const m = r(u.key, u.colorToken);
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
  return e.map((u) => r(u.key, u.colorToken) ?? c());
}
function Zr(e, t) {
  const n = Hn(e, t);
  return e.forEach((a, r) => {
    a.colorToken = n[r];
  }), e;
}
function Hc(e) {
  const t = e.meta ?? void 0;
  return {
    title: e.title,
    shortTitle: e.shortTitle,
    type: e.type,
    ...e.format ? { format: e.format } : {},
    ...t ? { meta: t } : {}
  };
}
function Yt(e) {
  const t = {};
  for (const n of Object.keys(e)) t[n] = Hc(e[n]);
  return t;
}
function Wc(e) {
  return {
    measures: Yt(e.measures ?? {}),
    dimensions: Yt(e.dimensions ?? {}),
    segments: Yt(e.segments ?? {}),
    timeDimensions: Yt(e.timeDimensions ?? {})
  };
}
function dt(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t];
}
function pn(e, t, n) {
  const a = e == null ? void 0 : e.meta, r = {};
  (a == null ? void 0 : a.unit) !== void 0 && (r.unit = a.unit), (a == null ? void 0 : a.quantity) !== void 0 && (r.quantity = a.quantity), (a == null ? void 0 : a.convert) !== void 0 && (r.convert = a.convert);
  const o = typeof (e == null ? void 0 : e.format) == "string" ? e.format : void 0;
  o != null && o.startsWith("percent") && r.unit === void 0 && (r.unit = "%");
  let s = (t == null ? void 0 : t.format) ?? n;
  return (o != null && o.startsWith("currency") || o != null && o.startsWith("accounting")) && (!s || s.kind === void 0 || s.kind === "auto") && (s = { ...s, kind: "currency" }), s && (r.format = s), t != null && t.axis && (r.axis = t.axis), t != null && t.stackId && (r.stackId = t.stackId), t != null && t.curve && (r.curve = t.curve), (t == null ? void 0 : t.dots) !== void 0 && (r.dots = t.dots), r;
}
function Uc(e, t, n) {
  return (t == null ? void 0 : t.label) ?? (e == null ? void 0 : e.shortTitle) ?? (e == null ? void 0 : e.title) ?? n;
}
function Gc(e, t) {
  var a, r;
  const n = /* @__PURE__ */ new Map();
  if ((t == null ? void 0 : t.unitSystem) !== "imperial" || !t.conversions) return n;
  for (const [o, s] of Object.entries(e.measures)) {
    const c = (a = s.meta) == null ? void 0 : a.unit;
    if (!c || ((r = s.meta) == null ? void 0 : r.convert) === !1) continue;
    const l = t.conversions[c];
    l && (n.set(o, { to: l.toImperial, unit: l.imperialUnit }), e.measures[o] = { ...s, meta: { ...s.meta, unit: l.imperialUnit } });
  }
  return n;
}
function Yc(e, t) {
  return t.size === 0 ? e : e.map((n) => {
    const a = { ...n };
    for (const [r, o] of t) {
      const s = gn(a[r]);
      s !== null && (a[r] = o.to(s));
    }
    return a;
  });
}
function Qc(e, t) {
  var n;
  if (t.size !== 0)
    for (const a of e) {
      const r = (n = a.meta) != null && n.measure ? t.get(a.meta.measure) : void 0;
      r && (a.data = a.data.map((o) => o === null ? null : r.to(o)));
    }
}
function Jc(e, t, n, a) {
  const r = Wc(e.annotation()), o = Gc(r, a), s = Yc(e.tablePivot(), o), c = t.mapping;
  if (!c) {
    const m = n.measures ?? [];
    if (Bc.has(t.family) && m.length > 0) {
      const f = s[0] ?? {}, h = [
        {
          key: "value",
          label: "Value",
          data: m.map((b) => gn(f[b])),
          meta: { ...pn(dt(r, m[0]), void 0, t.format), measure: m[0] }
        }
      ];
      return Zr(h, t.colors), { categories: m.map(
        (b) => {
          var g, y;
          return ((g = dt(r, b)) == null ? void 0 : g.shortTitle) ?? ((y = dt(r, b)) == null ? void 0 : y.title) ?? b;
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
  const l = c.series.mode === "measures" ? Zc(e, c.series, t, r) : es(e, c.category.member, c.series, t, r), u = Xc(e, c);
  return Qc(l, o), Zr(l, t.colors), {
    categories: u,
    series: l,
    raw: { rows: s, annotation: r, query: n },
    empty: s.length === 0
  };
}
function Xc(e, t) {
  const n = t.series.mode === "pivot" ? { x: [t.category.member], y: [t.series.pivot, "measures"] } : void 0;
  return e.chartPivot(n).map((r) => r.x);
}
function Zc(e, t, n, a) {
  const { members: r, meta: o } = t, s = e.chartPivot();
  return r.map((c) => {
    const l = dt(a, c), u = o == null ? void 0 : o[c], m = s.map((f) => gn(f[c]));
    return {
      key: c,
      label: Uc(l, u, c),
      data: m,
      ...u != null && u.colorToken ? { colorToken: u.colorToken } : {},
      meta: { ...pn(l, u, n.format), measure: c }
    };
  });
}
function es(e, t, n, a, r) {
  const { value: o, values: s, pivot: c } = n, l = s && s.length > 0 ? s : [o], u = new Set(l), m = l.length > 1, f = { x: [t], y: [c, "measures"] }, p = e.seriesNames(f).filter((_) => {
    const N = _.yValues && _.yValues.length >= 2 ? _.yValues[_.yValues.length - 1] : void 0;
    return N === void 0 || u.has(N);
  }), b = e.chartPivot(f), g = dt(r, o), y = p.map((_) => {
    var P, I;
    const N = (P = _.yValues) == null ? void 0 : P[0], k = _.yValues && _.yValues.length >= 2 ? _.yValues[_.yValues.length - 1] : o, R = dt(r, k), C = (R == null ? void 0 : R.shortTitle) ?? (R == null ? void 0 : R.title) ?? k, w = N ?? _.shortTitle ?? _.title ?? _.key, L = m ? `${C} · ${w}` : w, D = b.map((q) => gn(q[_.key])), j = (I = n.meta) == null ? void 0 : I[k];
    return {
      key: _.key,
      label: L,
      data: D,
      // Each series formats by ITS OWN measure's unit meta (matters in multi-measure),
      // and `meta.measure` lets the renderer resolve that measure's unit per axis/tooltip.
      meta: {
        ...pn(R ?? g, j, a.format),
        measure: k
      }
    };
  });
  return ts(y, g, a.format);
}
function ts(e, t, n) {
  var m, f, h;
  if (e.length <= zn) return e;
  const a = (p) => p.data.reduce((b, g) => b + (g ?? 0), 0), r = [...e].sort((p, b) => a(b) - a(p)), o = r.slice(0, zn - 1), s = r.slice(zn - 1), c = ((m = e[0]) == null ? void 0 : m.data.length) ?? 0, l = Array.from({ length: c }, (p, b) => {
    let g = 0, y = !1;
    for (const _ of s) {
      const N = _.data[b];
      N !== null && (g += N, y = !0);
    }
    return y ? g : null;
  }), u = {
    key: "__other",
    label: `Other (${s.length})`,
    data: l,
    meta: { ...pn(t, void 0, n), ...(h = (f = o[0]) == null ? void 0 : f.meta) != null && h.measure ? { measure: o[0].meta.measure } : {} }
  };
  return [...o, u];
}
function gn(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function pt(e) {
  return e == null ? !0 : typeof e == "string" || Array.isArray(e) ? e.length === 0 : !1;
}
const ns = (e) => {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) t.set(n.name, n);
  return t;
};
function rs(e, t, n) {
  var a;
  return Object.prototype.hasOwnProperty.call(t, e) && t[e] !== void 0 ? t[e] : (a = n.find((r) => r.name === e)) == null ? void 0 : a.default;
}
function It(e, t, n) {
  var a;
  if (Oe(e)) {
    const r = e.var;
    return Object.prototype.hasOwnProperty.call(n, r) && n[r] !== void 0 ? n[r] : (a = t.get(r)) == null ? void 0 : a.default;
  }
  return e;
}
function as(e, t, n) {
  const a = e.operator === "set" || e.operator === "notSet";
  if (e.values === void 0)
    return a ? { member: e.member, operator: e.operator } : void 0;
  const r = [];
  for (const o of e.values) {
    const s = It(o, t, n);
    if (!pt(s))
      if (Array.isArray(s))
        for (const c of s)
          pt(c) || r.push(c);
      else
        r.push(s);
  }
  return r.length === 0 ? a ? { member: e.member, operator: e.operator } : void 0 : { member: e.member, operator: e.operator, values: r };
}
function os(e, t, n) {
  if ("and" in e) {
    const a = Wn(e.and, t, n);
    return a.length > 0 ? { and: a } : void 0;
  }
  if ("or" in e) {
    const a = Wn(e.or, t, n);
    return a.length > 0 ? { or: a } : void 0;
  }
  return as(e, t, n);
}
function Wn(e, t, n) {
  const a = [];
  for (const r of e) {
    const o = os(r, t, n);
    o !== void 0 && a.push(o);
  }
  return a;
}
function is(e, t, n) {
  const a = { dimension: e.dimension };
  if (e.granularity !== void 0) {
    const r = It(e.granularity, t, n);
    pt(r) || (a.granularity = r);
  }
  if (e.dateRange !== void 0) {
    const r = It(e.dateRange, t, n);
    pt(r) || (a.dateRange = r);
  }
  return e.compareDateRange !== void 0 && (a.compareDateRange = e.compareDateRange), a;
}
function cs(e, t, n) {
  const a = ns(n), r = {};
  if (e.measures !== void 0 && (r.measures = [...e.measures]), e.dimensions !== void 0 && (r.dimensions = [...e.dimensions]), e.segments !== void 0 && (r.segments = [...e.segments]), e.timeDimensions !== void 0 && (r.timeDimensions = e.timeDimensions.map((o) => is(o, a, t))), e.filters !== void 0) {
    const o = Wn(e.filters, a, t);
    o.length > 0 && (r.filters = o);
  }
  if (e.order !== void 0 && (r.order = Array.isArray(e.order) ? e.order.map((o) => [...o]) : { ...e.order }), e.limit !== void 0) {
    const o = It(e.limit, a, t);
    pt(o) || (r.limit = o);
  }
  if (e.offset !== void 0) {
    const o = It(e.offset, a, t);
    pt(o) || (r.offset = o);
  }
  return e.total !== void 0 && (r.total = e.total), e.timezone !== void 0 && (r.timezone = e.timezone), r;
}
function ss(e, t) {
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
        const c = { ...n };
        delete c[o], n = c;
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
const ls = {
  second: "MMM d HH:mm:ss",
  minute: "MMM d HH:mm",
  hour: "MMM d HH:mm",
  day: "MMM d",
  week: "MMM d",
  month: "MMM yyyy",
  quarter: "QQQ yyyy",
  year: "yyyy"
}, us = "MMM d, yyyy";
function ms(e) {
  if (e instanceof Date) return Lt(e) ? e : null;
  if (typeof e == "number") {
    const a = new Date(e);
    return Lt(a) ? a : null;
  }
  const t = tn(e);
  if (Lt(t)) return t;
  const n = new Date(e);
  return Lt(n) ? n : null;
}
function uo(e) {
  return /^\d{4}-\d{2}/.test(e) ? Lt(tn(e)) : !1;
}
function ds(e, t) {
  return e != null && e.dateFormat ? e.dateFormat : t ? ls[t] : us;
}
function Ft(e, t, n) {
  const a = ms(e);
  return a ? pe(a, ds(t, n)) : String(e);
}
function Rh(e, t) {
  return (n) => n == null ? "" : Ft(n, e, t);
}
function Ah(e, t = {}) {
  var n;
  return e == null ? "" : e instanceof Date ? Ft(e, t.format, t.granularity) : typeof e == "number" ? t.granularity || (n = t.format) != null && n.dateFormat ? Ft(e, t.format, t.granularity) : String(e) : uo(e) ? Ft(e, t.format, t.granularity) : e;
}
const ea = "—", vs = [
  { limit: 1e12, suffix: "T" },
  { limit: 1e9, suffix: "B" },
  { limit: 1e6, suffix: "M" },
  { limit: 1e3, suffix: "k" }
];
function ta(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function fs(e, t) {
  const n = Math.abs(e);
  for (const { limit: a, suffix: r } of vs)
    if (n >= a) return ta((e / a).toFixed(t)) + r;
  return ta(e.toFixed(t));
}
function hs(e, t, n) {
  const a = {};
  return (t == null ? void 0 : t.decimals) !== void 0 ? (a.minimumFractionDigits = t.decimals, a.maximumFractionDigits = t.decimals) : a.maximumFractionDigits = 2, new Intl.NumberFormat(n, a).format(e);
}
function ps(e, t) {
  const { format: n, meta: a, locale: r } = t, o = n != null && n.abbreviate ? fs(e, n.decimals ?? 1) : hs(e, n, r), s = (n == null ? void 0 : n.suffix) ?? ((a == null ? void 0 : a.unit) || void 0);
  return `${(n == null ? void 0 : n.prefix) ?? ""}${o}${s ? ` ${s}` : ""}`;
}
function mo(e) {
  return Object.prototype.toString.call(e) === "[object Date]";
}
function gs(e) {
  var t, n;
  return ((t = e.format) == null ? void 0 : t.kind) === "date" || mo(e.value) ? !0 : typeof e.value == "string" ? uo(e.value) : typeof e.value == "number" ? e.role === "category" && (e.granularity !== void 0 || !!((n = e.format) != null && n.dateFormat)) : !1;
}
const fr = (e) => {
  const { value: t, format: n, granularity: a } = e;
  return t == null || typeof t == "number" && Number.isNaN(t) ? ea : (mo(t) || typeof t == "string" || typeof t == "number") && gs(e) ? Ft(t, n, a) : typeof t == "number" ? ps(t, e) : String(t);
};
function bs(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function Mh(e, t) {
  return (n, a) => {
    const r = a ? bs(a, t) : void 0;
    return fr({
      value: n,
      meta: r == null ? void 0 : r.meta,
      title: (r == null ? void 0 : r.shortTitle) ?? (r == null ? void 0 : r.title),
      role: "value",
      format: e
    });
  };
}
function ys(e, t) {
  if (t)
    return t.measures[e] ?? t.dimensions[e] ?? t.timeDimensions[e] ?? t.segments[e];
}
function xs(e) {
  const t = rt.safeParse(e);
  return t.success ? t.data : void 0;
}
function ws(e, t) {
  var a;
  const n = (a = t.mapping) == null ? void 0 : a.category.member;
  if (!(!n || !e)) {
    for (const r of Object.keys(e.timeDimensions))
      if (r !== n && r.startsWith(`${n}.`)) {
        const o = xs(r.slice(n.length + 1));
        if (o) return o;
      }
  }
}
function vo(e, t, n, a) {
  const r = ws(e, t);
  return {
    value(o, s, c = "value") {
      const l = s ? ys(s, e) : void 0, u = l == null ? void 0 : l.meta;
      return n({
        value: o,
        member: s,
        meta: u,
        title: (l == null ? void 0 : l.shortTitle) ?? (l == null ? void 0 : l.title),
        role: c,
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
class ks extends Error {
}
const Ns = {
  create(e) {
    const t = Number(e);
    if (Number.isNaN(t))
      throw new ks(`"${e}" cannot be parsed into a number`);
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
class Cs extends Error {
}
class ra extends Error {
}
class Ss extends Error {
}
class Fn extends Error {
}
class _s extends Error {
}
class Rs {
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
      throw new Ss(`Cannot convert incompatible measures of ${r.measure} and ${o.measure}`);
    let s = this.cls.mul(this.val, this.convertFraction(o.unit.to_anchor));
    if (o.unit.anchor_shift && (s = this.cls.sub(s, this.convertFraction(o.unit.anchor_shift))), o.system != r.system) {
      const l = this.measureData[o.measure].anchors;
      if (l == null)
        throw new Fn(`Unable to convert units. Anchors are missing for "${o.measure}" and "${r.measure}" measures.`);
      const u = l[o.system];
      if (u == null)
        throw new Fn(`Unable to find anchor for "${o.measure}" to "${r.measure}". Please make sure it is defined.`);
      const m = (n = u[r.system]) === null || n === void 0 ? void 0 : n.transform, f = (a = u[r.system]) === null || a === void 0 ? void 0 : a.ratio;
      if (typeof m == "function")
        s = m(s, this.cls);
      else if (typeof f == "number")
        s = this.cls.mul(s, f);
      else if (na(f))
        s = this.cls.mul(s, this.convertFraction(f));
      else
        throw new Fn("A system anchor needs to either have a defined ratio number or a transform function.");
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
      throw new ra(".toBest must be called after .from");
    const o = this.cls.lt(this.val, 0);
    let s = [], c = o ? -1 : 1, l = this.origin.system;
    typeof t == "object" && (s = (n = t.exclude) !== null && n !== void 0 ? n : [], c = (a = t.cutOffNumber) !== null && a !== void 0 ? a : c, l = (r = t.system) !== null && r !== void 0 ? r : this.origin.system);
    let u = null;
    for (const m of this.possibilities()) {
      const f = this.describe(m);
      if (s.indexOf(m) === -1 && f.system === l) {
        const p = this.to(m);
        if (o ? this.cls.gt(p, c) : this.cls.lt(p, c))
          continue;
        (u === null || (o ? this.cls.lte(p, c) && this.cls.gt(p, u.val) : this.cls.gte(p, c) && this.cls.lt(p, u.val))) && (u = {
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
      for (const [a, r] of Object.entries(this.measureData))
        for (const [o, s] of Object.entries(r.systems))
          for (const [c, l] of Object.entries(s))
            n.push(this.describeUnit({
              abbr: c,
              measure: a,
              system: o,
              unit: l
            }));
    else {
      if (!this.isMeasure(t))
        throw new _s(`Meausure "${t}" not found.`);
      const a = this.measureData[t];
      for (const [r, o] of Object.entries(a.systems))
        for (const [s, c] of Object.entries(o))
          n.push(this.describeUnit({
            abbr: s,
            measure: t,
            system: r,
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
    for (const a of Object.values(this.measureData))
      for (const r of Object.values(a.systems))
        n = n.concat(Object.keys(r));
    throw new Cs(`Unsupported unit ${t}, use one of: ${n.join(", ")}`);
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
function As(e) {
  const t = /* @__PURE__ */ new Map();
  for (const [n, a] of Object.entries(e))
    for (const [r, o] of Object.entries(a.systems))
      for (const [s, c] of Object.entries(o))
        t.set(s, {
          measure: n,
          system: r,
          abbr: s,
          unit: c
        });
  return t;
}
function Ms(e, t) {
  if (typeof e != "object")
    throw new TypeError("The measures argument needs to be an object");
  const n = As(e);
  return (a) => new Rs({
    measures: e,
    unitCache: n,
    cls: Ns
  }, a);
}
const Os = {
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
}, Ls = {
  systems: {
    metric: Os
  }
}, Ds = {
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
}, Ts = {
  systems: {
    SI: Ds
  }
}, zs = {
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
}, Fs = {
  systems: {
    SI: zs
  }
}, $s = {
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
}, Es = {
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
}, Ps = {
  systems: {
    metric: $s,
    imperial: Es
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
}, Is = {
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
}, js = {
  systems: {
    SI: Is
  }
}, Vs = {
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
}, qs = {
  systems: {
    SI: Vs
  }
}, Ks = {
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
}, Bs = {
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
}, Hs = {
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
}, Ws = {
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
}, Us = {
  systems: {
    bit: Ks,
    byte: Bs,
    IECBit: Hs,
    IECByte: Ws
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
}, Gs = {
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
}, Ys = {
  systems: {
    metric: Gs
  }
}, Qs = {
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
}, Js = {
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
}, Xs = {
  systems: {
    SI: Qs,
    nutrition: Js
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
}, Zs = {
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
}, el = {
  systems: {
    SI: Zs
  }
}, tl = {
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
}, nl = {
  systems: {
    SI: tl
  }
}, rl = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux"
    },
    to_anchor: 1
  }
}, al = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles"
    },
    to_anchor: 1
  }
}, ol = {
  systems: {
    metric: rl,
    imperial: al
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
}, il = {
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
}, cl = {
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
}, sl = {
  systems: {
    metric: il,
    imperial: cl
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
}, ll = {
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
}, ul = {
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
}, ml = {
  systems: {
    metric: ll,
    imperial: ul
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
}, dl = {
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
}, vl = {
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
}, fl = {
  systems: {
    metric: dl,
    imperial: vl
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
}, hl = {
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
}, pl = {
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
}, gl = {
  systems: {
    metric: hl,
    imperial: pl
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
}, bl = {
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
}, yl = {
  systems: {
    SI: bl
  }
}, xl = {
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
}, wl = {
  systems: {
    unit: xl
  }
}, kl = {
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
}, Nl = {
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
}, Cl = {
  systems: {
    metric: kl,
    imperial: Nl
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
}, Sl = {
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
}, _l = {
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
}, Rl = {
  systems: {
    metric: Sl,
    imperial: _l
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
}, Al = {
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
}, Ml = {
  systems: {
    SI: Al
  }
}, Ol = {
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
}, Ll = {
  systems: {
    SI: Ol
  }
}, Dl = {
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
}, Tl = {
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
}, zl = {
  systems: {
    metric: Dl,
    imperial: Tl
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
}, Fl = {
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
}, $l = {
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
}, El = {
  systems: {
    metric: Fl,
    imperial: $l
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
}, Pl = {
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
}, Il = {
  systems: {
    SI: Pl
  }
}, jl = {
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
}, Vl = {
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
}, ql = {
  systems: {
    metric: jl,
    imperial: Vl
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
}, Kl = {
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
}, Bl = {
  systems: {
    SI: Kl
  }
}, Hl = {
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
}, Wl = {
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
}, Ul = {
  systems: {
    metric: Hl,
    imperial: Wl
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
}, Gl = {
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
}, Yl = {
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
}, Ql = {
  systems: {
    metric: Gl,
    imperial: Yl
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
}, Jl = {
  acceleration: Ls,
  angle: Ts,
  apparentPower: Fs,
  area: Ps,
  charge: js,
  current: qs,
  digital: Us,
  each: Ys,
  energy: Xs,
  force: el,
  frequency: nl,
  illuminance: ol,
  length: sl,
  mass: ml,
  massFlowRate: fl,
  pace: gl,
  partsPer: yl,
  pieces: wl,
  power: Cl,
  pressure: Rl,
  reactiveEnergy: Ml,
  reactivePower: Ll,
  speed: zl,
  torque: ql,
  temperature: El,
  time: Il,
  voltage: Bl,
  volume: Ul,
  volumeFlowRate: Ql
}, Xl = Ms(Jl), Zl = {
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
function eu(e) {
  return {
    imperialUnit: e.label,
    toImperial: (t) => Xl(t).from(e.from).to(e.to)
  };
}
const Un = {
  ...Object.fromEntries(
    Object.entries(Zl).map(([e, t]) => [e, eu(t)])
  ),
  // Fuel economy: convert-units has no measure for distance-per-volume, so the
  // (exact) km/L → US mpg factor stays explicit. 1 km/L = 2.352145 mpg.
  "km/L": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 },
  "km/l": { imperialUnit: "mpg", toImperial: (e) => e * 2.352145 }
};
function bn(e) {
  return e ? { ...Un, ...e } : Un;
}
function tu(e) {
  return e != null && e.quantity ? e.quantity : e != null && e.unit ? `unit:${e.unit}` : "number";
}
function nu(e) {
  const t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").trim();
  return t.length === 0 ? e : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}
function ru(e) {
  return e != null && e.quantity ? nu(e.quantity) : e != null && e.unit ? e.unit : "number";
}
const au = {
  ms: 1,
  s: 1e3,
  sec: 1e3,
  min: 6e4,
  m: 6e4,
  h: 36e5,
  hr: 36e5,
  d: 864e5
};
function ou(e) {
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
function aa(e, t) {
  const n = e * (au[t ?? "ms"] ?? 1), a = n < 0 ? "-" : "";
  let r = Math.abs(n);
  const o = [
    [864e5, "d"],
    [36e5, "h"],
    [6e4, "m"],
    [1e3, "s"]
  ], s = o.map(([l, u], m) => {
    const f = m < o.length - 1 ? Math.floor(r / l) : Math.round(r / l);
    return r -= f * l, [f, u];
  }), c = s.findIndex((l) => l[0] > 0);
  return c === -1 ? "0s" : a + s.slice(c, c + 2).filter((l) => l[0] > 0).map(([l, u]) => `${l}${u}`).join(" ");
}
function $n(e, t) {
  const n = t.format;
  if (n != null && n.abbreviate) {
    const r = Math.abs(e);
    for (const [o, s] of [[1e12, "T"], [1e9, "B"], [1e6, "M"], [1e3, "k"]])
      if (r >= o) return ou((e / o).toFixed(n.decimals ?? 1)) + s;
  }
  const a = (n == null ? void 0 : n.decimals) !== void 0 ? { minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals } : { maximumFractionDigits: 1 };
  return new Intl.NumberFormat(t.locale, a).format(e);
}
function iu(e, t) {
  return e === "count" ? {} : e === "currency" ? { prefix: t } : e === "percentage" || t === "%" ? { suffix: t } : e === "temperature" ? { suffix: t } : { suffix: ` ${t}` };
}
function oa(e, t, n) {
  return `${t ?? ""}${e}${n ? ` ${n}` : ""}`;
}
function fo(e = Un) {
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
      if (o.kind === "number") return oa($n(n, t), o.prefix, o.suffix);
    }
    if (r === "time") return aa(n, a == null ? void 0 : a.unit);
    if (r === "count" || (a == null ? void 0 : a.convert) === !1) return oa($n(n, t), o == null ? void 0 : o.prefix, o == null ? void 0 : o.suffix);
    const s = a == null ? void 0 : a.unit, c = s ? iu(r, s) : {}, l = (o == null ? void 0 : o.prefix) ?? c.prefix ?? "", u = (o == null ? void 0 : o.suffix) !== void 0 ? ` ${o.suffix}` : c.suffix ?? "";
    return `${l}${$n(n, t)}${u}`;
  };
}
const cu = Mi({ prefix: "cv" });
function S(...e) {
  return cu(Ai(e));
}
function hr(e) {
  return `--color-${e.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function su({ className: e, ...t }) {
  return /* @__PURE__ */ i("div", { className: S("cv:animate-pulse cv:rounded-md cv:bg-muted", e), ...t });
}
const lu = dr(
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
    className: S(lu({ variant: t }), e),
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
const Ht = d.object({
  axis: d.enum(["x", "y"]),
  value: d.number(),
  label: d.string().optional(),
  colorToken: Ue.optional()
}).strict(), yr = d.boolean().optional(), uu = d.object({
  barRadius: d.number().optional(),
  barCategoryGap: d.union([d.number(), d.string()]).optional(),
  barGap: d.union([d.number(), d.string()]).optional(),
  maxBarSize: d.number().optional(),
  showValueLabels: d.boolean().optional(),
  referenceLines: d.array(Ht).optional(),
  comparePrevious: yr
}).strict(), xr = d.enum(["linear", "monotone", "step", "natural"]), mu = d.object({
  curve: xr.optional(),
  strokeWidth: d.number().optional(),
  dots: d.union([d.boolean(), d.literal("active")]).optional(),
  connectNulls: d.boolean().optional(),
  chrome: d.enum(["full", "none"]).optional(),
  referenceLines: d.array(Ht).optional(),
  showValueLabels: d.boolean().optional(),
  comparePrevious: yr
}).strict(), du = d.object({
  curve: xr.optional(),
  fillOpacity: d.number().optional(),
  strokeWidth: d.number().optional(),
  connectNulls: d.boolean().optional(),
  dots: d.boolean().optional(),
  referenceLines: d.array(Ht).optional(),
  comparePrevious: yr
}).strict(), vu = d.object({
  innerRadiusPct: d.number().optional(),
  outerRadiusPct: d.number().optional(),
  padAngle: d.number().optional(),
  cornerRadius: d.number().optional(),
  showLabels: d.enum(["none", "value", "percent", "name"]).optional(),
  centerLabel: d.object({ value: d.string().optional(), label: d.string().optional() }).strict().optional(),
  maxSlices: d.number().optional()
}).strict(), fu = d.object({
  x: re,
  y: re,
  size: re.optional(),
  sizeRange: d.tuple([d.number(), d.number()]).optional(),
  groupBy: re.optional(),
  shape: d.enum(["circle", "square", "triangle", "diamond"]).optional(),
  referenceLines: d.array(Ht).optional()
}).strict(), hu = d.object({
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
    granularity: d.union([rt, nn]).optional(),
    dateRange: d.union([Kn, nn]).optional()
  }).strict().optional(),
  /** The change direction that counts as "good" — drives BOTH the comparison delta
   *  color and the sparkline area color. Configured once for the KPI. */
  goodDirection: d.enum(["up", "down"]).optional(),
  gauge: d.object({
    min: d.number().optional(),
    max: d.number(),
    thresholds: d.array(d.object({ at: d.number(), colorToken: Ue }).strict()).optional()
  }).strict().optional(),
  icon: d.string().optional()
}).strict(), pu = d.object({
  member: re,
  label: d.string().optional(),
  format: hn.optional(),
  align: d.enum(["left", "right", "center"]).optional(),
  width: d.number().optional(),
  hidden: d.boolean().optional()
}).strict(), gu = d.object({
  member: re,
  when: d.object({
    op: d.enum(["gt", "lt", "gte", "lte", "eq"]),
    value: d.number()
  }).strict(),
  colorToken: Ue.optional()
}).strict(), bu = d.object({
  columns: d.array(pu).optional(),
  pageSize: d.number().optional(),
  sortable: d.boolean().optional(),
  stickyHeader: d.boolean().optional(),
  rowHeight: d.enum(["compact", "default"]).optional(),
  showRowNumbers: d.boolean().optional(),
  conditionalFormat: d.array(gu).optional()
}).strict(), yu = d.object({
  member: re,
  render: d.enum(["bar", "line", "area"]),
  axis: d.enum(["left", "right"]).optional(),
  colorToken: Ue.optional(),
  stackId: d.string().optional(),
  curve: d.enum(["linear", "monotone", "step", "natural"]).optional(),
  dots: d.boolean().optional(),
  label: d.string().optional()
}).strict(), xu = d.object({
  series: d.array(yu),
  referenceLines: d.array(Ht).optional(),
  // Global render options applied per render-type (line/area get curve+dots+connectNulls
  // +strokeWidth; area gets fillOpacity) — so combo isn't stuck on hard-coded defaults.
  curve: xr.optional(),
  dots: d.boolean().optional(),
  connectNulls: d.boolean().optional(),
  strokeWidth: d.number().optional(),
  fillOpacity: d.number().optional(),
  barRadius: d.number().optional()
}).strict(), wu = {
  bar: uu,
  line: mu,
  area: du,
  pie: vu,
  scatter: fu,
  kpi: hu,
  table: bu,
  combo: xu
};
function Oh(e) {
  return wu[e];
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
function Gn(e, t) {
  if (t === void 0) return e;
  if (!ia(e) || !ia(t))
    return t;
  const n = { ...e };
  for (const a of Object.keys(t)) {
    const r = t[a];
    r !== void 0 && (n[a] = a in e ? Gn(e[a], r) : r);
  }
  return n;
}
function ku(e) {
  const t = ho[e.family];
  return {
    ...Gn({ ...t.envelope }, e),
    familyOptions: Gn(
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
function wt(e) {
  return e === "top" ? "top" : "bottom";
}
function kt(e) {
  return "horizontal";
}
function Nt(e) {
  return "center";
}
function Ce(e, t) {
  var n;
  return { show: ((n = e.legend) == null ? void 0 : n.show) !== !1, greyed: !1 };
}
function $e(e) {
  return e == null ? void 0 : e.domain;
}
function Ee(e) {
  return (e == null ? void 0 : e.scale) ?? "auto";
}
function Nu(e, t) {
  const n = e ?? 0;
  return t ? [0, n, n, 0] : [n, n, 0, 0];
}
function $t(e) {
  return `var(${hr(e.key)})`;
}
function Cu(e) {
  const t = {};
  for (const n of e.series)
    t[n.key] = { label: n.label, color: `var(--${n.colorToken ?? "chart-1"})` };
  return t;
}
function po(e) {
  return e === "stacked" || e === "percent";
}
function yn(e, t) {
  var c, l, u, m, f, h, p, b, g, y, _, N, k, R;
  const n = e.raw.annotation, a = (C) => {
    var w, L, D, j, P, I;
    if (C)
      return ((w = n == null ? void 0 : n.measures[C]) == null ? void 0 : w.shortTitle) ?? ((L = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : L.shortTitle) ?? ((D = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : D.shortTitle) ?? ((j = n == null ? void 0 : n.measures[C]) == null ? void 0 : j.title) ?? ((P = n == null ? void 0 : n.dimensions[C]) == null ? void 0 : P.title) ?? ((I = n == null ? void 0 : n.timeDimensions[C]) == null ? void 0 : I.title) ?? C;
  }, r = e.series.find((C) => {
    var w;
    return (((w = C.meta) == null ? void 0 : w.axis) ?? "left") !== "right";
  }), o = e.series.find((C) => {
    var w;
    return ((w = C.meta) == null ? void 0 : w.axis) === "right";
  }), s = (C) => {
    var w;
    return C ? (w = C.meta) != null && w.measure ? a(C.meta.measure) : C.label : void 0;
  };
  return {
    x: (l = (c = t.axes) == null ? void 0 : c.x) != null && l.labelHide ? void 0 : ((m = (u = t.axes) == null ? void 0 : u.x) == null ? void 0 : m.label) ?? a((h = (f = t.mapping) == null ? void 0 : f.category) == null ? void 0 : h.member),
    left: (b = (p = t.axes) == null ? void 0 : p.y) != null && b.labelHide ? void 0 : ((y = (g = t.axes) == null ? void 0 : g.y) == null ? void 0 : y.label) ?? s(r),
    right: (N = (_ = t.axes) == null ? void 0 : _.y2) != null && N.labelHide ? void 0 : ((R = (k = t.axes) == null ? void 0 : k.y2) == null ? void 0 : R.label) ?? s(o)
  };
}
function Be(e) {
  var t;
  return ((t = e == null ? void 0 : e.meta) == null ? void 0 : t.measure) ?? (e == null ? void 0 : e.key);
}
function kr(e) {
  return new Map(e.series.map((t) => {
    var n;
    return [t.key, ((n = t.meta) == null ? void 0 : n.measure) ?? t.key];
  }));
}
function Wt(e, t, n) {
  return (a, r) => {
    const o = r == null ? void 0 : r.dataKey, s = typeof o == "string" || typeof o == "number" ? String(o) : void 0, c = (s ? n == null ? void 0 : n.get(s) : void 0) ?? t ?? s;
    return e.value(a, c, "tooltip");
  };
}
function an(e, t) {
  const n = typeof e == "number" ? e : Number(e);
  return Number.isFinite(n) ? new Intl.NumberFormat(t, {
    style: "percent",
    maximumFractionDigits: 0
  }).format(n) : "";
}
const Su = { light: "", dark: ".dark" }, go = x.createContext(null);
function bo() {
  const e = x.useContext(go);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
const Ye = x.forwardRef(({ id: e, className: t, children: n, config: a, ...r }, o) => {
  const s = x.useId(), c = `chart-${e || s.replace(/:/g, "")}`;
  return /* @__PURE__ */ i(go.Provider, { value: { config: a }, children: /* @__PURE__ */ v(
    "div",
    {
      "data-chart": c,
      ref: o,
      className: S(
        "cv:flex cv:h-full cv:w-full cv:justify-center cv:text-xs cv:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground cv:[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 cv:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border cv:[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border cv:[&_.recharts-radial-bar-background-sector]:fill-muted cv:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted cv:[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border cv:[&_.recharts-sector]:outline-none cv:[&_.recharts-sector[stroke='#fff']]:stroke-transparent cv:[&_.recharts-surface]:outline-none",
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ i(_u, { id: c, config: a }),
        /* @__PURE__ */ i(ir.ResponsiveContainer, { children: n })
      ]
    }
  ) });
});
Ye.displayName = "ChartContainer";
const _u = ({ id: e, config: t }) => {
  const n = Object.entries(t).filter(
    ([, a]) => a.theme || a.color
  );
  return n.length ? /* @__PURE__ */ i(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(Su).map(
          ([a, r]) => `
${r} [data-chart=${e}] {
${n.map(([o, s]) => {
            var l;
            const c = ((l = s.theme) == null ? void 0 : l[a]) || s.color;
            return c ? `  ${hr(o)}: ${c};` : null;
          }).filter(Boolean).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, Ct = ir.Tooltip, it = x.forwardRef(
  ({
    active: e,
    payload: t,
    className: n,
    indicator: a = "dot",
    hideLabel: r = !1,
    hideIndicator: o = !1,
    label: s,
    labelFormatter: c,
    labelClassName: l,
    formatter: u,
    valueFormatter: m,
    color: f,
    nameKey: h,
    labelKey: p
  }, b) => {
    const { config: g } = bo(), y = x.useMemo(() => {
      var w;
      if (r || !(t != null && t.length))
        return null;
      const [N] = t, k = `${p || (N == null ? void 0 : N.dataKey) || (N == null ? void 0 : N.name) || "value"}`, R = Yn(g, N, k), C = !p && typeof s == "string" ? ((w = g[s]) == null ? void 0 : w.label) || s : R == null ? void 0 : R.label;
      return c ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: c(C, t) }) : C ? /* @__PURE__ */ i("div", { className: S("cv:font-medium", l), children: C }) : null;
    }, [s, c, t, r, l, g, p]);
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
            const R = `${h || N.name || N.dataKey || "value"}`, C = Yn(g, N, R), w = f || ((L = N.payload) == null ? void 0 : L.fill) || N.color;
            return /* @__PURE__ */ i(
              "div",
              {
                className: S(
                  "cv:flex cv:w-full cv:flex-wrap cv:items-stretch cv:gap-2 cv:[&>svg]:h-2.5 cv:[&>svg]:w-2.5 cv:[&>svg]:text-muted-foreground",
                  a === "dot" && "cv:items-center"
                ),
                children: u && (N == null ? void 0 : N.value) !== void 0 && N.name ? u(N.value, N.name, N, k, N.payload) : /* @__PURE__ */ v(ie, { children: [
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
                        N.value !== void 0 && /* @__PURE__ */ i("span", { className: "cv:font-mono cv:font-medium cv:tabular-nums cv:text-foreground", children: m ? m(N.value, N) : typeof N.value == "number" ? N.value.toLocaleString() : String(N.value) })
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
it.displayName = "ChartTooltipContent";
const St = ir.Legend, ct = x.forwardRef(
  ({ className: e, hideIcon: t = !1, payload: n, verticalAlign: a = "bottom", nameKey: r }, o) => {
    const { config: s } = bo();
    return n != null && n.length ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: S(
          "cv:flex cv:items-center cv:justify-center cv:gap-4",
          a === "top" ? "cv:pb-3" : "cv:pt-3",
          e
        ),
        children: n.map((c) => {
          const l = `${r || c.dataKey || "value"}`, u = Yn(s, c, l);
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
ct.displayName = "ChartLegendContent";
function Yn(e, t, n) {
  if (typeof t != "object" || t === null)
    return;
  const a = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let r = n;
  return n in t && typeof t[n] == "string" ? r = t[n] : a && n in a && typeof a[n] == "string" && (r = a[n]), r in e ? e[r] : e[n];
}
function Ru({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var j, P, I, q, T, O, G, ne, F, Y, ee, U, Q, me, J, K;
  const o = t.familyOptions ?? {}, s = t.orientation === "horizontal", c = po(t.stackMode), l = t.stackMode === "percent", u = wr(e), m = (A, Z, ve = "value") => l ? an(A) : a.value(A, Z, ve), f = (A) => a.category(A), h = kr(e), p = Be(e.series[0]), b = s ? (P = (j = t.axes) == null ? void 0 : j.y) == null ? void 0 : P.hide : (q = (I = t.axes) == null ? void 0 : I.x) == null ? void 0 : q.hide, g = s ? (T = t.axes) == null ? void 0 : T.x : (O = t.axes) == null ? void 0 : O.y, y = !s && e.series.some((A) => {
    var Z;
    return ((Z = A.meta) == null ? void 0 : Z.axis) === "right";
  }), _ = Be(e.series.find((A) => {
    var Z;
    return ((Z = A.meta) == null ? void 0 : Z.axis) !== "right";
  })) ?? p, N = Be(e.series.find((A) => {
    var Z;
    return ((Z = A.meta) == null ? void 0 : Z.axis) === "right";
  })), k = yn(e, t), R = k.x ? { value: k.x, position: "insideBottom", offset: -2 } : void 0, C = k.x ? { value: k.x, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, w = k.left ? { value: k.left, position: "insideBottom", offset: -2 } : void 0, L = k.left ? { value: k.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0, D = k.right ? { value: k.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0;
  return /* @__PURE__ */ i(Ye, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(
    di,
    {
      accessibilityLayer: !0,
      data: u,
      layout: s ? "vertical" : "horizontal",
      stackOffset: l ? "expand" : void 0,
      barGap: o.barGap,
      barCategoryGap: o.barCategoryGap,
      children: [
        /* @__PURE__ */ i(Vt, { vertical: s, horizontal: !s }),
        s ? /* @__PURE__ */ v(ie, { children: [
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
            vt,
            {
              type: "number",
              hide: g == null ? void 0 : g.hide,
              scale: Ee(g),
              domain: $e(g),
              tickFormatter: (A) => m(A, p, "axis"),
              label: w
            }
          )
        ] }) : /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            vt,
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
              tickFormatter: (A) => m(A, _, "axis"),
              label: L
            }
          ),
          y && /* @__PURE__ */ i(
            Ie,
            {
              yAxisId: "right",
              orientation: "right",
              type: "number",
              hide: (ne = (G = t.axes) == null ? void 0 : G.y2) == null ? void 0 : ne.hide,
              scale: Ee((F = t.axes) == null ? void 0 : F.y2),
              domain: $e((Y = t.axes) == null ? void 0 : Y.y2),
              tickFormatter: (A) => m(A, N, "axis"),
              label: D
            }
          )
        ] }),
        ((ee = t.tooltip) == null ? void 0 : ee.show) !== !1 && /* @__PURE__ */ i(
          Ct,
          {
            content: /* @__PURE__ */ i(
              it,
              {
                labelFormatter: (A) => a.category(A),
                indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
                valueFormatter: l ? (A) => an(A) : Wt(a, void 0, h)
              }
            )
          }
        ),
        Ce(t).show && /* @__PURE__ */ i(
          St,
          {
            content: /* @__PURE__ */ i(ct, { className: Ce(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: wt((Q = t.legend) == null ? void 0 : Q.position),
            layout: kt((me = t.legend) == null ? void 0 : me.position),
            align: Nt((J = t.legend) == null ? void 0 : J.position)
          }
        ),
        e.series.map((A) => {
          var Z, ve, H, W;
          return /* @__PURE__ */ i(
            za,
            {
              yAxisId: s ? void 0 : ((Z = A.meta) == null ? void 0 : Z.axis) === "right" && y ? "right" : "left",
              dataKey: A.key,
              name: A.label,
              stackId: c ? (ve = A.meta) != null && ve.companion ? "__prev" : ((H = A.meta) == null ? void 0 : H.stackId) ?? "stack" : void 0,
              fill: $t(A),
              fillOpacity: (W = A.meta) != null && W.companion ? 0.4 : void 0,
              radius: Nu(o.barRadius, s),
              maxBarSize: o.maxBarSize,
              children: o.showValueLabels && /* @__PURE__ */ i(
                Fa,
                {
                  dataKey: A.key,
                  position: s ? "right" : "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (he) => m(typeof he == "boolean" ? Number(he) : he, Be(A), "label")
                }
              )
            },
            A.key
          );
        }),
        (K = o.referenceLines) == null ? void 0 : K.map((A, Z) => /* @__PURE__ */ i(
          qt,
          {
            yAxisId: s ? void 0 : "left",
            ...A.axis === "y" ? { y: A.value } : { x: A.value },
            label: A.label,
            stroke: `var(--${A.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Z
        ))
      ]
    }
  ) });
}
function Au({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var _, N, k, R, C, w, L, D, j, P, I, q, T, O, G, ne;
  const o = t.familyOptions ?? {}, s = o.chrome === "none", c = wr(e), l = (F) => a.category(F), u = e.series.some((F) => {
    var Y;
    return ((Y = F.meta) == null ? void 0 : Y.axis) === "right";
  }), m = o.curve ?? "monotone", f = kr(e), h = Be(e.series.find((F) => {
    var Y;
    return ((Y = F.meta) == null ? void 0 : Y.axis) !== "right";
  })), p = Be(e.series.find((F) => {
    var Y;
    return ((Y = F.meta) == null ? void 0 : Y.axis) === "right";
  })), b = yn(e, t), g = !s && o.dots === !0, y = !s;
  return /* @__PURE__ */ i(
    Ye,
    {
      config: n,
      className: s ? "cv:aspect-[5/1] cv:w-full" : "cv:h-full cv:w-full cv:min-h-[200px]",
      children: /* @__PURE__ */ v(vi, { accessibilityLayer: !0, data: c, margin: s ? { top: 4, bottom: 4, left: 4, right: 4 } : void 0, children: [
        !s && /* @__PURE__ */ i(Vt, { vertical: !1 }),
        /* @__PURE__ */ i(
          vt,
          {
            type: "category",
            dataKey: "__cat",
            hide: s || ((N = (_ = t.axes) == null ? void 0 : _.x) == null ? void 0 : N.hide),
            tickFormatter: l,
            label: !s && b.x ? { value: b.x, position: "insideBottom", offset: -2 } : void 0
          }
        ),
        /* @__PURE__ */ i(
          Ie,
          {
            yAxisId: "left",
            type: "number",
            hide: s || ((R = (k = t.axes) == null ? void 0 : k.y) == null ? void 0 : R.hide),
            scale: Ee((C = t.axes) == null ? void 0 : C.y),
            domain: $e((w = t.axes) == null ? void 0 : w.y),
            tickFormatter: (F) => a.value(F, h, "axis"),
            label: !s && b.left ? { value: b.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
          }
        ),
        u && /* @__PURE__ */ i(
          Ie,
          {
            yAxisId: "right",
            orientation: "right",
            type: "number",
            hide: s || ((D = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : D.hide),
            scale: Ee((j = t.axes) == null ? void 0 : j.y2),
            domain: $e((P = t.axes) == null ? void 0 : P.y2),
            tickFormatter: (F) => a.value(F, p, "axis"),
            label: !s && b.right ? { value: b.right, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
          }
        ),
        !s && ((I = t.tooltip) == null ? void 0 : I.show) !== !1 && /* @__PURE__ */ i(
          Ct,
          {
            content: /* @__PURE__ */ i(
              it,
              {
                labelFormatter: (F) => a.category(F),
                indicator: ((q = t.tooltip) == null ? void 0 : q.indicator) ?? "line",
                valueFormatter: Wt(a, void 0, f)
              }
            )
          }
        ),
        !s && Ce(t).show && /* @__PURE__ */ i(
          St,
          {
            content: /* @__PURE__ */ i(ct, { className: Ce(t).greyed ? "cv:opacity-40" : void 0 }),
            verticalAlign: wt((T = t.legend) == null ? void 0 : T.position),
            layout: kt((O = t.legend) == null ? void 0 : O.position),
            align: Nt((G = t.legend) == null ? void 0 : G.position)
          }
        ),
        e.series.map((F) => {
          var Y, ee, U, Q, me, J;
          return /* @__PURE__ */ i(
            $a,
            {
              yAxisId: u && ((Y = F.meta) == null ? void 0 : Y.axis) === "right" ? "right" : "left",
              type: ((ee = F.meta) == null ? void 0 : ee.curve) ?? m,
              dataKey: F.key,
              name: F.label,
              stroke: $t(F),
              strokeWidth: o.strokeWidth ?? 2,
              strokeDasharray: (U = F.meta) != null && U.companion ? "5 4" : void 0,
              strokeOpacity: (Q = F.meta) != null && Q.companion ? 0.55 : void 0,
              dot: s || (me = F.meta) != null && me.companion ? !1 : ((J = F.meta) == null ? void 0 : J.dots) ?? g,
              activeDot: y,
              connectNulls: o.connectNulls ?? !1,
              isAnimationActive: !s,
              children: !s && o.showValueLabels && /* @__PURE__ */ i(
                Fa,
                {
                  dataKey: F.key,
                  position: "top",
                  className: "cv:fill-foreground cv:text-[10px]",
                  formatter: (K) => a.value(typeof K == "boolean" ? Number(K) : K, Be(F), "label")
                }
              )
            },
            F.key
          );
        }),
        !s && ((ne = o.referenceLines) == null ? void 0 : ne.map((F, Y) => /* @__PURE__ */ i(
          qt,
          {
            yAxisId: "left",
            ...F.axis === "y" ? { y: F.value } : { x: F.value },
            label: F.label,
            stroke: `var(--${F.colorToken ?? "muted-foreground"})`,
            strokeDasharray: "4 4"
          },
          Y
        )))
      ] })
    }
  );
}
function Mu({
  data: e,
  options: t,
  config: n,
  format: a,
  editing: r
}) {
  var y, _, N, k, R, C, w, L, D, j, P, I, q, T;
  const o = t.familyOptions ?? {}, s = ((_ = (y = t.mapping) == null ? void 0 : y.series) == null ? void 0 : _.mode) === "pivot", c = t.stackMode ?? (s ? "stacked" : "none"), l = po(c), u = c === "percent", m = wr(e), f = (O) => a.category(O), h = o.curve ?? "monotone", p = kr(e), b = Be(e.series[0]), g = yn(e, t);
  return /* @__PURE__ */ i(Ye, { config: n, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ea, { accessibilityLayer: !0, data: m, stackOffset: u ? "expand" : void 0, children: [
    /* @__PURE__ */ i(Vt, { vertical: !1 }),
    /* @__PURE__ */ i("defs", { children: e.series.map((O) => /* @__PURE__ */ v("linearGradient", { id: `fill-${O.key}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ i("stop", { offset: "5%", stopColor: $t(O), stopOpacity: o.fillOpacity ?? 0.4 }),
      /* @__PURE__ */ i("stop", { offset: "95%", stopColor: $t(O), stopOpacity: (o.fillOpacity ?? 0.4) * 0.2 })
    ] }, O.key)) }),
    /* @__PURE__ */ i(
      vt,
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
        tickFormatter: (O) => u ? an(O) : a.value(O, b, "axis"),
        label: g.left ? { value: g.left, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((D = t.tooltip) == null ? void 0 : D.show) !== !1 && /* @__PURE__ */ i(
      Ct,
      {
        content: /* @__PURE__ */ i(
          it,
          {
            labelFormatter: (O) => a.category(O),
            indicator: ((j = t.tooltip) == null ? void 0 : j.indicator) ?? "dot",
            valueFormatter: u ? (O) => an(O) : Wt(a, void 0, p)
          }
        )
      }
    ),
    Ce(t).show && /* @__PURE__ */ i(
      St,
      {
        content: /* @__PURE__ */ i(ct, { className: Ce(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: wt((P = t.legend) == null ? void 0 : P.position),
        layout: kt((I = t.legend) == null ? void 0 : I.position),
        align: Nt((q = t.legend) == null ? void 0 : q.position)
      }
    ),
    e.series.map((O) => {
      var G, ne, F, Y, ee, U, Q, me;
      return /* @__PURE__ */ i(
        cr,
        {
          type: ((G = O.meta) == null ? void 0 : G.curve) ?? h,
          dataKey: O.key,
          name: O.label,
          stackId: l && !((ne = O.meta) != null && ne.companion) ? ((F = O.meta) == null ? void 0 : F.stackId) ?? "stack" : void 0,
          stroke: $t(O),
          strokeWidth: o.strokeWidth ?? 2,
          strokeDasharray: (Y = O.meta) != null && Y.companion ? "5 4" : void 0,
          strokeOpacity: (ee = O.meta) != null && ee.companion ? 0.55 : void 0,
          fill: (U = O.meta) != null && U.companion ? "none" : `url(#fill-${O.key})`,
          fillOpacity: 1,
          dot: (Q = O.meta) != null && Q.companion ? !1 : ((me = O.meta) == null ? void 0 : me.dots) ?? o.dots ?? !1,
          connectNulls: o.connectNulls ?? !1
        },
        O.key
      );
    }),
    (T = o.referenceLines) == null ? void 0 : T.map((O, G) => /* @__PURE__ */ i(
      qt,
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
function Ou({ data: e, options: t, format: n, editing: a }) {
  var g, y, _, N, k;
  const r = t.familyOptions ?? {}, o = e.series[0], s = e.categories.map((R, C) => {
    const w = n.category(R);
    return {
      key: `slice-${C}`,
      label: w,
      value: (o == null ? void 0 : o.data[C]) ?? 0,
      fill: `var(--${ye[C % ye.length]})`
    };
  }), c = Lu(s, r.maxSlices), l = c.reduce((R, C) => R + C.value, 0), u = {};
  c.forEach((R, C) => {
    u[R.key] = {
      label: R.label,
      color: `var(--${ye[C % ye.length]})`
    };
  });
  const m = `${r.innerRadiusPct ?? 0}%`, f = `${r.outerRadiusPct ?? 80}%`, h = (r.innerRadiusPct ?? 0) > 0, p = r.showLabels ?? "percent", b = p === "none" ? !1 : ({ payload: R, percent: C }) => {
    const w = R;
    return p === "name" ? (w == null ? void 0 : w.label) ?? "" : p === "value" ? n.value(w == null ? void 0 : w.value, o == null ? void 0 : o.key, "label") : `${((C !== void 0 ? C : w && l > 0 ? w.value / l : 0) * 100).toFixed(0)}%`;
  };
  return /* @__PURE__ */ i(Ye, { config: u, className: "cv:h-full cv:w-full cv:min-h-[200px] cv:[&_.recharts-pie-label-text]:fill-foreground", children: /* @__PURE__ */ v(fi, { accessibilityLayer: !0, children: [
    ((g = t.tooltip) == null ? void 0 : g.show) !== !1 && /* @__PURE__ */ i(
      Ct,
      {
        content: /* @__PURE__ */ i(
          it,
          {
            nameKey: "label",
            hideLabel: !0,
            indicator: ((y = t.tooltip) == null ? void 0 : y.indicator) ?? "dot",
            valueFormatter: Wt(n, o == null ? void 0 : o.key)
          }
        )
      }
    ),
    /* @__PURE__ */ v(
      hi,
      {
        data: c,
        dataKey: "value",
        nameKey: "label",
        innerRadius: m,
        outerRadius: f,
        paddingAngle: r.padAngle,
        cornerRadius: r.cornerRadius,
        label: b,
        labelLine: p !== "none" && !h,
        isAnimationActive: !1,
        children: [
          c.map((R) => /* @__PURE__ */ i(Pa, { fill: R.fill }, R.key)),
          h && r.centerLabel && /* @__PURE__ */ i(
            pi,
            {
              position: "center",
              content: ({ viewBox: R }) => {
                var D, j;
                if (!R || !("cx" in R)) return null;
                const { cx: C, cy: w } = R, L = ((D = r.centerLabel) == null ? void 0 : D.value) === void 0 || r.centerLabel.value === "total" ? n.value(l, o == null ? void 0 : o.key, "label") : r.centerLabel.value;
                return /* @__PURE__ */ v("text", { x: C, y: w, textAnchor: "middle", dominantBaseline: "middle", children: [
                  /* @__PURE__ */ i("tspan", { x: C, y: w, className: "cv:fill-foreground cv:text-2xl cv:font-bold", children: L }),
                  ((j = r.centerLabel) == null ? void 0 : j.label) && /* @__PURE__ */ i("tspan", { x: C, y: w + 20, className: "cv:fill-muted-foreground cv:text-xs", children: r.centerLabel.label })
                ] });
              }
            }
          )
        ]
      }
    ),
    Ce(t).show && /* @__PURE__ */ i(
      St,
      {
        content: /* @__PURE__ */ i(
          ct,
          {
            nameKey: "label",
            className: Ce(t).greyed ? "cv:opacity-40" : void 0
          }
        ),
        verticalAlign: wt((_ = t.legend) == null ? void 0 : _.position),
        layout: kt((N = t.legend) == null ? void 0 : N.position),
        align: Nt((k = t.legend) == null ? void 0 : k.position)
      }
    )
  ] }) });
}
function Lu(e, t) {
  if (!t || e.length <= t) return e;
  const n = [...e].sort((c, l) => l.value - c.value), a = n.slice(0, t - 1), o = n.slice(t - 1).reduce((c, l) => c + l.value, 0), s = t - 1;
  return [
    ...a,
    {
      key: "slice-other",
      label: "Other",
      value: o,
      fill: `var(--${ye[s % ye.length]})`
    }
  ];
}
function Du({ data: e, options: t, format: n, editing: a }) {
  var b, g, y, _, N, k, R, C, w, L, D, j, P, I, q, T, O, G, ne, F, Y, ee, U, Q, me, J;
  const r = t.familyOptions ?? {}, o = e.raw.annotation, s = e.raw.rows, c = { x: r.x, y: r.y, z: r.size }, l = ((b = o == null ? void 0 : o.measures[r.x]) == null ? void 0 : b.shortTitle) ?? ((g = o == null ? void 0 : o.dimensions[r.x]) == null ? void 0 : g.shortTitle) ?? r.x, u = ((y = o == null ? void 0 : o.measures[r.y]) == null ? void 0 : y.shortTitle) ?? ((_ = o == null ? void 0 : o.dimensions[r.y]) == null ? void 0 : _.shortTitle) ?? r.y, m = (k = (N = t.axes) == null ? void 0 : N.x) != null && k.labelHide ? void 0 : ((C = (R = t.axes) == null ? void 0 : R.x) == null ? void 0 : C.label) ?? l, f = (L = (w = t.axes) == null ? void 0 : w.y) != null && L.labelHide ? void 0 : ((j = (D = t.axes) == null ? void 0 : D.y) == null ? void 0 : j.label) ?? u, h = Tu(s, r), p = {};
  return h.forEach((K, A) => {
    p[K.key] = { label: K.label, color: `var(--${ye[A % ye.length]})` };
  }), /* @__PURE__ */ i(Ye, { config: p, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(gi, { accessibilityLayer: !0, margin: { top: 12, right: 16, bottom: 24, left: 12 }, children: [
    /* @__PURE__ */ i(Vt, {}),
    /* @__PURE__ */ i(
      vt,
      {
        type: "number",
        dataKey: "x",
        name: l,
        hide: (I = (P = t.axes) == null ? void 0 : P.x) == null ? void 0 : I.hide,
        scale: Ee((q = t.axes) == null ? void 0 : q.x),
        domain: $e((T = t.axes) == null ? void 0 : T.x),
        tickFormatter: (K) => n.value(K, r.x, "axis"),
        label: m ? { value: m, position: "insideBottom", offset: -12 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ie,
      {
        type: "number",
        dataKey: "y",
        name: u,
        hide: (G = (O = t.axes) == null ? void 0 : O.y) == null ? void 0 : G.hide,
        scale: Ee((ne = t.axes) == null ? void 0 : ne.y),
        domain: $e((F = t.axes) == null ? void 0 : F.y),
        tickFormatter: (K) => n.value(K, r.y, "axis"),
        label: f ? { value: f, angle: -90, position: "insideLeft", style: { textAnchor: "middle" } } : void 0
      }
    ),
    r.size && /* @__PURE__ */ i(bi, { type: "number", dataKey: "z", range: r.sizeRange ?? [40, 400], name: r.size }),
    ((Y = t.tooltip) == null ? void 0 : Y.show) !== !1 && /* @__PURE__ */ i(
      Ct,
      {
        cursor: { strokeDasharray: "3 3" },
        content: /* @__PURE__ */ i(
          it,
          {
            indicator: ((ee = t.tooltip) == null ? void 0 : ee.indicator) ?? "dot",
            valueFormatter: (K, A) => {
              const Z = A == null ? void 0 : A.dataKey, ve = typeof Z == "string" ? c[Z] : void 0;
              return n.value(K, ve, "tooltip");
            }
          }
        )
      }
    ),
    Ce(t).show && h.length > 1 && /* @__PURE__ */ i(
      St,
      {
        content: /* @__PURE__ */ i(ct, { className: Ce(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: wt((U = t.legend) == null ? void 0 : U.position),
        layout: kt((Q = t.legend) == null ? void 0 : Q.position),
        align: Nt((me = t.legend) == null ? void 0 : me.position)
      }
    ),
    h.map((K, A) => /* @__PURE__ */ i(
      yi,
      {
        name: K.label,
        data: K.points,
        shape: r.shape ?? "circle",
        fill: `var(--color-${K.key})`,
        children: h.length === 1 && K.points.map((Z, ve) => /* @__PURE__ */ i(Pa, { fill: `var(--${ye[A % ye.length]})` }, ve))
      },
      K.key
    )),
    (J = r.referenceLines) == null ? void 0 : J.map((K, A) => /* @__PURE__ */ i(
      qt,
      {
        ...K.axis === "y" ? { y: K.value } : { x: K.value },
        label: K.label,
        stroke: `var(--${K.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      A
    ))
  ] }) });
}
function Tu(e, t) {
  const n = (r) => ({
    x: En(r[t.x]),
    y: En(r[t.y]),
    ...t.size ? { z: En(r[t.size]) } : {}
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
function En(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
function zu(e, t) {
  return !Number.isFinite(e) || e === 0 ? "flat" : e > 0 == (t === "up") ? "good" : "bad";
}
function Fu(e) {
  return e === "flat" ? "text-muted-foreground" : e === "good" ? "text-emerald-600" : "text-destructive";
}
function $u(e) {
  var l, u, m, f;
  const { data: t, options: n, format: a } = e, r = n.familyOptions ?? {}, o = (h) => a.value(h, r.measure, "kpi"), s = yo(t.raw.rows, r.measure) ?? 0, c = ((u = (l = t.raw.annotation) == null ? void 0 : l.measures[r.measure]) == null ? void 0 : u.shortTitle) ?? ((f = (m = t.raw.annotation) == null ? void 0 : m.measures[r.measure]) == null ? void 0 : f.title) ?? r.measure;
  return r.display === "gauge" ? /* @__PURE__ */ i(Vu, { value: s, label: c, fmt: o, fo: r }) : /* @__PURE__ */ i(Eu, { ...e, value: s, label: c, fo: r, fmt: o });
}
function Eu({
  data: e,
  value: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = n.goodDirection ?? ((u = n.comparison) == null ? void 0 : u.goodDirection) ?? "up", o = Ku(e.raw.rows, t, n), s = n.sparkline ? e.series[0] : void 0, c = o ? o.diff : s ? Iu(s) : 0, l = Fu(zu(c, r));
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:justify-center cv:gap-1", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-baseline cv:gap-2", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-4xl cv:font-bold cv:tabular-nums cv:text-foreground", children: a(t) }),
      o && /* @__PURE__ */ i(ju, { delta: o, goodDirection: r, fo: n, fmt: a })
    ] }),
    s && s.data.length > 0 && /* @__PURE__ */ i(Pu, { series: s, categories: e.categories, colorClass: l })
  ] });
}
function Pu({
  series: e,
  categories: t,
  colorClass: n
}) {
  const a = t.map((r, o) => ({ x: typeof r == "number" ? r : String(r), v: e.data[o] ?? null }));
  return /* @__PURE__ */ i("div", { className: S("cv:mt-2 cv:h-12 cv:w-full", n), children: /* @__PURE__ */ i(Ni, { width: "100%", height: "100%", children: /* @__PURE__ */ i(Ea, { data: a, margin: { top: 2, right: 0, bottom: 0, left: 0 }, children: /* @__PURE__ */ i(
    cr,
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
function Iu(e) {
  const t = e.data.filter((n) => n !== null);
  return t.length >= 2 ? t[t.length - 1] - t[0] : 0;
}
function ju({
  delta: e,
  goodDirection: t,
  fo: n,
  fmt: a
}) {
  var u;
  const r = e.diff > 0, o = e.diff === 0, s = o ? !0 : r === (t === "up"), c = o ? Oi : r ? vn : fn, l = (u = n.comparison) != null && u.showAsPercent && e.pct !== null ? `${e.pct > 0 ? "+" : ""}${(e.pct * 100).toFixed(1)}%` : `${e.diff > 0 ? "+" : ""}${a(e.diff)}`;
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
function Vu({
  value: e,
  label: t,
  fmt: n,
  fo: a
}) {
  var m, f;
  const r = ((m = a.gauge) == null ? void 0 : m.min) ?? 0, o = ((f = a.gauge) == null ? void 0 : f.max) ?? Math.max(e, 1), s = Math.max(r, Math.min(o, e)), c = qu(e, a) ?? "chart-1", l = [{ name: t, value: s, fill: `var(--${c})` }], u = { value: { label: t, color: `var(--${c})` } };
  return /* @__PURE__ */ v("div", { className: "cv:relative cv:flex cv:h-full cv:w-full cv:flex-col cv:items-center cv:justify-center", children: [
    /* @__PURE__ */ i(Ye, { config: u, className: "cv:aspect-square cv:min-h-[180px] cv:w-full", children: /* @__PURE__ */ v(
      xi,
      {
        data: l,
        startAngle: 210,
        endAngle: -30,
        innerRadius: "70%",
        outerRadius: "100%",
        children: [
          /* @__PURE__ */ i(wi, { type: "number", domain: [r, o], tick: !1, axisLine: !1 }),
          /* @__PURE__ */ i(ki, { dataKey: "value", background: !0, cornerRadius: 8, isAnimationActive: !1 })
        ]
      }
    ) }),
    /* @__PURE__ */ v("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:flex cv:flex-col cv:items-center cv:justify-center", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-2xl cv:font-bold cv:tabular-nums cv:text-foreground", children: n(e) }),
      /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t })
    ] })
  ] });
}
function qu(e, t) {
  var r;
  const n = (r = t.gauge) == null ? void 0 : r.thresholds;
  if (!(n != null && n.length)) return;
  let a;
  for (const o of [...n].sort((s, c) => s.at - c.at))
    e >= o.at && (a = o.colorToken);
  return a;
}
function yo(e, t) {
  for (const n of e) {
    const a = xo(n[t]);
    if (a !== null) return a;
  }
  return null;
}
function Ku(e, t, n) {
  const a = n.comparison;
  if (!a) return null;
  let r = null;
  if (a.mode === "value")
    typeof a.value == "number" ? r = a.value : typeof a.value == "string" && (r = yo(e, a.value));
  else {
    const c = e[1];
    r = c ? xo(c[n.measure]) : null;
  }
  if (r === null) return null;
  const o = t - r, s = r !== 0 ? o / r : null;
  return { current: t, baseline: r, diff: o, pct: s };
}
function xo(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const wo = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { className: "cv:relative cv:w-full cv:overflow-auto", children: /* @__PURE__ */ i("table", { ref: n, className: S("cv:w-full cv:caption-bottom cv:text-sm", e), ...t }) })
);
wo.displayName = "Table";
const ko = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("thead", { ref: n, className: S("cv:[&_tr]:border-b", e), ...t }));
ko.displayName = "TableHeader";
const No = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: S("cv:[&_tr:last-child]:border-0", e), ...t }));
No.displayName = "TableBody";
const Qt = x.forwardRef(
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
Qt.displayName = "TableRow";
const Qn = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
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
Qn.displayName = "TableHead";
const Jt = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: S("cv:p-2 cv:align-middle cv:[&:has([role=checkbox])]:pr-0", e),
    ...t
  }
));
Jt.displayName = "TableCell";
const Bu = x.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("caption", { ref: n, className: S("cv:mt-4 cv:text-sm cv:text-muted-foreground", e), ...t }));
Bu.displayName = "TableCaption";
const Co = dr(
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
  ({ className: e, variant: t, size: n, type: a, ...r }, o) => /* @__PURE__ */ i(
    "button",
    {
      ref: o,
      type: a ?? "button",
      className: S(Co({ variant: t, size: n }), e),
      ...r
    }
  )
);
B.displayName = "Button";
function Hu({ data: e, options: t, format: n }) {
  const a = t.familyOptions ?? {}, r = e.raw.rows, o = e.raw.annotation, s = x.useMemo(
    () => Wu(r, o, a, n),
    [r, o, a, n]
  ), [c, l] = x.useState(null), [u, m] = x.useState(0), f = a.sortable !== !1, h = a.pageSize ?? 25, p = x.useMemo(() => {
    if (!c) return r;
    const k = c.dir === "asc" ? 1 : -1;
    return [...r].sort((R, C) => Ju(R[c.member], C[c.member]) * k);
  }, [r, c]), b = Math.max(1, Math.ceil(p.length / h)), g = Math.min(u, b - 1), y = p.slice(g * h, g * h + h), _ = (k) => {
    f && (l(
      (R) => (R == null ? void 0 : R.member) === k ? { member: k, dir: R.dir === "asc" ? "desc" : "asc" } : { member: k, dir: "desc" }
    ), m(0));
  }, N = a.rowHeight === "compact";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:h-full cv:w-full cv:flex-col", children: [
    /* @__PURE__ */ i("div", { className: S("cv:w-full", a.stickyHeader && "cv:max-h-full cv:overflow-auto"), children: /* @__PURE__ */ v(wo, { children: [
      /* @__PURE__ */ i(ko, { className: S(a.stickyHeader && "cv:sticky cv:top-0 cv:z-10 cv:bg-background"), children: /* @__PURE__ */ v(Qt, { children: [
        a.showRowNumbers && /* @__PURE__ */ i(Qn, { className: "cv:w-10 cv:text-right", children: "#" }),
        s.map((k) => /* @__PURE__ */ i(
          Qn,
          {
            className: ca(k.align),
            style: k.width ? { width: k.width } : void 0,
            children: f ? /* @__PURE__ */ v(
              B,
              {
                variant: "ghost",
                className: "cv:-ml-2 cv:h-7 cv:px-2 cv:text-muted-foreground",
                onClick: () => _(k.member),
                children: [
                  k.label,
                  /* @__PURE__ */ i(Qu, { active: (c == null ? void 0 : c.member) === k.member, dir: c == null ? void 0 : c.dir })
                ]
              }
            ) : k.label
          },
          k.member
        ))
      ] }) }),
      /* @__PURE__ */ v(No, { children: [
        y.map((k, R) => /* @__PURE__ */ v(Qt, { children: [
          a.showRowNumbers && /* @__PURE__ */ i(Jt, { className: S("cv:text-right cv:text-muted-foreground", N && "cv:py-1"), children: g * h + R + 1 }),
          s.map((C) => {
            const w = Xu(C.member, k[C.member], a.conditionalFormat);
            return /* @__PURE__ */ i(
              Jt,
              {
                className: S(ca(C.align), N && "cv:py-1"),
                style: w ? { color: w } : void 0,
                children: C.render(k[C.member])
              },
              C.member
            );
          })
        ] }, R)),
        y.length === 0 && /* @__PURE__ */ i(Qt, { children: /* @__PURE__ */ i(
          Jt,
          {
            colSpan: s.length + (a.showRowNumbers ? 1 : 0),
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
          B,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((k) => Math.max(0, k - 1)),
            disabled: g === 0,
            children: "Prev"
          }
        ),
        /* @__PURE__ */ i(
          B,
          {
            variant: "outline",
            className: "cv:h-7 cv:px-2",
            onClick: () => m((k) => Math.min(b - 1, k + 1)),
            disabled: g >= b - 1,
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
function Wu(e, t, n, a) {
  var s;
  const r = e.length > 0 ? Object.keys(e[0]) : Gu(t);
  return ((s = n.columns) != null && s.length ? n.columns : r.map((c) => ({ member: c }))).filter((c) => !c.hidden).map((c) => {
    const l = c.member, u = t ? Yu(t, l) : void 0, m = t ? l in t.measures : !1, f = c.label ?? (u == null ? void 0 : u.shortTitle) ?? (u == null ? void 0 : u.title) ?? l, h = c.align ?? (m ? "right" : "left");
    return {
      member: l,
      label: f,
      align: h,
      width: c.width,
      render: (p) => Uu(p, m, l, a)
    };
  });
}
function Uu(e, t, n, a) {
  if (e == null || e === "") return "—";
  if (t) {
    const r = typeof e == "number" ? e : Number(e);
    return Number.isFinite(r) ? a.value(r, n) : String(e);
  }
  return a.category(e);
}
function Gu(e) {
  return e ? [
    ...Object.keys(e.dimensions),
    ...Object.keys(e.timeDimensions),
    ...Object.keys(e.measures)
  ] : [];
}
function Yu(e, t) {
  return e.measures[t] ?? e.dimensions[t] ?? e.timeDimensions[t] ?? e.segments[t];
}
function ca(e) {
  return e === "right" ? "text-right" : e === "center" ? "text-center" : "text-left";
}
function Qu({ active: e, dir: t }) {
  return e ? t === "asc" ? /* @__PURE__ */ i(vn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(fn, { className: "cv:ml-1 cv:size-3.5" }) : /* @__PURE__ */ i(Li, { className: "cv:ml-1 cv:size-3.5 cv:opacity-50" });
}
function Ju(e, t) {
  const n = typeof e == "number" ? e : Number(e), a = typeof t == "number" ? t : Number(t);
  return Number.isFinite(n) && Number.isFinite(a) ? n - a : String(e ?? "").localeCompare(String(t ?? ""));
}
function Xu(e, t, n) {
  if (!(n != null && n.length)) return;
  const a = typeof t == "number" ? t : Number(t);
  if (Number.isFinite(a)) {
    for (const r of n)
      if (r.member === e && Zu(a, r.when.op, r.when.value))
        return `var(--${r.colorToken ?? "chart-1"})`;
  }
}
function Zu(e, t, n) {
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
function em({ data: e, options: t, format: n, editing: a }) {
  var g, y, _, N, k, R, C, w, L, D, j, P, I, q, T, O, G, ne, F, Y, ee, U, Q, me, J, K;
  const r = t.familyOptions ?? {}, o = r.series ?? [], s = nm(e, o), c = (A) => n.category(A), l = o.some((A) => A.axis === "right"), u = (g = o.find((A) => A.axis !== "right")) == null ? void 0 : g.member, m = (y = o.find((A) => A.axis === "right")) == null ? void 0 : y.member, f = yn(e, t), h = (N = (_ = t.axes) == null ? void 0 : _.y) != null && N.labelHide ? void 0 : ((R = (k = t.axes) == null ? void 0 : k.y) == null ? void 0 : R.label) ?? (u ? Xt(e, u) : void 0), p = (w = (C = t.axes) == null ? void 0 : C.y2) != null && w.labelHide ? void 0 : ((D = (L = t.axes) == null ? void 0 : L.y2) == null ? void 0 : D.label) ?? (m ? Xt(e, m) : void 0), b = {};
  return o.forEach((A, Z) => {
    const ve = A.colorToken ?? ye[Z % ye.length];
    b[A.member] = {
      label: A.label ?? Xt(e, A.member),
      color: `var(--${ve})`
    };
  }), /* @__PURE__ */ i(Ye, { config: b, className: "cv:h-full cv:w-full cv:min-h-[200px]", children: /* @__PURE__ */ v(Ci, { accessibilityLayer: !0, data: s, children: [
    /* @__PURE__ */ i(Vt, { vertical: !1 }),
    /* @__PURE__ */ i(
      vt,
      {
        type: "category",
        dataKey: "__cat",
        hide: (P = (j = t.axes) == null ? void 0 : j.x) == null ? void 0 : P.hide,
        tickFormatter: c,
        label: f.x ? { value: f.x, position: "insideBottom", offset: -2 } : void 0
      }
    ),
    /* @__PURE__ */ i(
      Ie,
      {
        yAxisId: "left",
        type: "number",
        hide: (q = (I = t.axes) == null ? void 0 : I.y) == null ? void 0 : q.hide,
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
        hide: (ne = (G = t.axes) == null ? void 0 : G.y2) == null ? void 0 : ne.hide,
        scale: Ee((F = t.axes) == null ? void 0 : F.y2),
        domain: $e((Y = t.axes) == null ? void 0 : Y.y2),
        tickFormatter: (A) => n.value(A, m, "axis"),
        label: p ? { value: p, angle: 90, position: "insideRight", style: { textAnchor: "middle" } } : void 0
      }
    ),
    ((ee = t.tooltip) == null ? void 0 : ee.show) !== !1 && /* @__PURE__ */ i(
      Ct,
      {
        content: /* @__PURE__ */ i(
          it,
          {
            labelFormatter: (A) => n.category(A),
            indicator: ((U = t.tooltip) == null ? void 0 : U.indicator) ?? "dot",
            valueFormatter: Wt(n)
          }
        )
      }
    ),
    Ce(t).show && /* @__PURE__ */ i(
      St,
      {
        content: /* @__PURE__ */ i(ct, { className: Ce(t).greyed ? "cv:opacity-40" : void 0 }),
        verticalAlign: wt((Q = t.legend) == null ? void 0 : Q.position),
        layout: kt((me = t.legend) == null ? void 0 : me.position),
        align: Nt((J = t.legend) == null ? void 0 : J.position)
      }
    ),
    o.map((A) => tm(A, e, r)),
    (K = r.referenceLines) == null ? void 0 : K.map((A, Z) => /* @__PURE__ */ i(
      qt,
      {
        yAxisId: "left",
        ...A.axis === "y" ? { y: A.value } : { x: A.value },
        label: A.label,
        stroke: `var(--${A.colorToken ?? "muted-foreground"})`,
        strokeDasharray: "4 4"
      },
      Z
    ))
  ] }) });
}
function tm(e, t, n) {
  const a = e.axis === "right" ? "right" : "left", r = `var(${hr(e.member)})`, o = e.label ?? Xt(t, e.member), s = e.curve ?? n.curve ?? "monotone", c = e.dots ?? n.dots ?? !1, l = n.connectNulls ?? !1;
  return e.render === "bar" ? /* @__PURE__ */ i(
    za,
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
    cr,
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
      dot: c,
      connectNulls: l
    },
    e.member
  ) : /* @__PURE__ */ i(
    $a,
    {
      yAxisId: a,
      type: s,
      dataKey: e.member,
      name: o,
      stroke: r,
      strokeWidth: n.strokeWidth ?? 2,
      dot: c,
      connectNulls: l
    },
    e.member
  );
}
function nm(e, t) {
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
  const r = ((o = e.raw.query.dimensions) == null ? void 0 : o[0]) ?? ((c = (s = e.raw.query.timeDimensions) == null ? void 0 : s[0]) == null ? void 0 : c.dimension);
  return e.raw.rows.map((l) => {
    const u = r ? l[r] : void 0, m = {
      __cat: u == null ? "" : String(u)
    };
    for (const f of t) m[f.member] = rm(l[f.member]);
    return m;
  });
}
function Xt(e, t) {
  var n, a, r, o;
  return ((a = (n = e.raw.annotation) == null ? void 0 : n.measures[t]) == null ? void 0 : a.shortTitle) ?? ((o = (r = e.raw.annotation) == null ? void 0 : r.measures[t]) == null ? void 0 : o.title) ?? t;
}
function rm(e) {
  if (e == null || e === "") return null;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : null;
}
const So = {
  bar: Ru,
  line: Au,
  area: Mu,
  pie: Ou,
  scatter: Du,
  kpi: $u,
  table: Hu,
  combo: em
};
function am({
  data: e,
  options: t,
  config: n,
  format: a,
  state: r,
  components: o,
  editing: s
}) {
  const c = ku(t);
  if (r != null && r.loading)
    return /* @__PURE__ */ i(su, { className: "cv:h-full cv:w-full cv:min-h-[200px]" });
  if (r != null && r.error)
    return /* @__PURE__ */ v(pr, { variant: "destructive", className: "cv:w-full", children: [
      /* @__PURE__ */ i(ja, {}),
      /* @__PURE__ */ i(gr, { children: "Failed to load chart" }),
      /* @__PURE__ */ i(br, { children: r.error.message })
    ] });
  if (e.empty)
    return /* @__PURE__ */ i("div", { className: "cv:flex cv:h-full cv:w-full cv:min-h-[200px] cv:items-center cv:justify-center cv:text-sm cv:text-muted-foreground", children: "No data" });
  const l = n && Object.keys(n).length > 0 ? n : Cu(e), u = a ?? vo(e.raw.annotation, c, fr), m = (o == null ? void 0 : o[c.family]) ?? So[c.family];
  return /* @__PURE__ */ i(
    m,
    {
      data: e,
      options: c,
      config: l,
      format: u,
      state: r,
      editing: s
    }
  );
}
const Nr = Ia(null);
Nr.displayName = "CubeVizContext";
function Qe() {
  const e = sr(Nr);
  if (e === null)
    throw new Error(
      "useCubeVizContext must be used within a <CubeVizProvider>. Wrap your app (or the previewed widget) in <CubeVizProvider cube={...}>."
    );
  return e;
}
function om(e) {
  return typeof e == "object" && e !== null && typeof e.load != "function" && typeof e.endpoint == "string";
}
function Lh({
  cube: e,
  theme: t,
  locale: n,
  registry: a,
  children: r
}) {
  const o = te(
    () => om(e) ? qc(e) : e,
    [e]
  ), s = te(
    () => {
      var m;
      return {
        chartRamp: (m = t == null ? void 0 : t.chartRamp) != null && m.length ? t.chartRamp : ye,
        mode: (t == null ? void 0 : t.mode) ?? "system"
      };
    },
    [t == null ? void 0 : t.chartRamp, t == null ? void 0 : t.mode]
  ), c = te(
    () => ({
      locale: n == null ? void 0 : n.locale,
      timezone: n == null ? void 0 : n.timezone,
      unitSystem: n == null ? void 0 : n.unitSystem,
      formatValue: n == null ? void 0 : n.formatValue,
      units: n == null ? void 0 : n.units
    }),
    [n == null ? void 0 : n.locale, n == null ? void 0 : n.timezone, n == null ? void 0 : n.unitSystem, n == null ? void 0 : n.formatValue, n == null ? void 0 : n.units]
  ), l = te(() => a ?? {}, [a]), u = te(
    () => ({
      cubeClient: o,
      registry: l,
      locale: c,
      theme: s
    }),
    [o, l, c, s]
  );
  return /* @__PURE__ */ i(Nr.Provider, { value: u, children: /* @__PURE__ */ i(
    "div",
    {
      className: S(
        "cv:contents",
        s.mode === "dark" && "dark",
        s.mode === "light" && "cube-viz-light"
      ),
      children: r
    }
  ) });
}
function im(e, t) {
  var n;
  return ((n = e == null ? void 0 : e.charts) == null ? void 0 : n[t]) ?? So[t];
}
const cm = 5e3;
function sm(e, t) {
  const { cubeClient: n } = Qe(), a = (t == null ? void 0 : t.skip) ?? !1, r = te(
    () => e.limit === void 0 ? { ...e, limit: cm } : e,
    [e]
  ), o = te(() => JSON.stringify(r), [r]), [s, c] = ft({ isLoading: !a }), [l, u] = ft(0), m = He(() => u((f) => f + 1), []);
  return Kt(() => {
    if (a) {
      c({ isLoading: !1 });
      return;
    }
    let f = !0;
    return c((h) => ({ resultSet: h.resultSet, isLoading: !0 })), n.load(r, { castNumerics: !0 }).then((h) => {
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
  }, [n, o, a, l]), { ...s, refetch: m };
}
const xn = Ia(null);
xn.displayName = "DashboardContext";
function Cr({
  spec: e,
  initialValues: t,
  children: n
}) {
  const a = e.variables, r = ut(null);
  (r.current === null || r.current.key !== a) && (r.current = { store: ss(a, t), key: a });
  const o = r.current.store, s = lm(o, a);
  return Si(xn.Provider, { value: s }, n);
}
function lm(e, t) {
  const n = _i(
    e.subscribe,
    e.getAll,
    e.getAll
  ), a = He(
    (s, c) => e.set(s, c),
    [e]
  ), r = He(
    (s) => cs(s, e.getAll(), t),
    [e, t]
  ), o = He(
    (s) => rs(s, e.getAll(), t),
    [e, t]
  );
  return te(
    () => ({ vars: n, setVar: a, resolveQuery: r, resolveValue: o, decls: t }),
    [n, a, r, o, t]
  );
}
function _o() {
  const e = sr(xn);
  if (e === null)
    throw new Error(
      "useDashboard must be used within a <DashboardProvider>. Wrap the dashboard in <DashboardProvider spec={...}>."
    );
  return e;
}
function Sr() {
  return sr(xn);
}
function Pn(e, t, n) {
  var p;
  const a = Sr(), { locale: r } = Qe(), o = te(
    () => a && !(n != null && n.skipResolve) ? a.resolveQuery(e) : e,
    [a, e, n == null ? void 0 : n.skipResolve]
  ), { resultSet: s, isLoading: c, error: l, refetch: u } = sm(o, { skip: n == null ? void 0 : n.skip }), m = ((p = t.format) == null ? void 0 : p.unitSystem) ?? (r == null ? void 0 : r.unitSystem), f = te(() => bn(r == null ? void 0 : r.units), [r == null ? void 0 : r.units]);
  return { data: te(() => {
    if (s)
      return Jc(s, t, o, { unitSystem: m, conversions: f });
  }, [s, t, o, m, f]), isLoading: c, error: l, refetch: u, resolvedQuery: o };
}
function Je() {
  const { cubeClient: e } = Qe(), [t, n] = ft({ isLoading: !0 });
  return Kt(() => {
    let a = !0;
    return n({ isLoading: !0 }), Kc(e).then((r) => {
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
  const { locale: e } = Qe(), { formatValue: t, units: n } = e;
  return te(
    () => t ?? fo(bn(n)),
    [t, n]
  );
}
function Ro() {
  const [e, t] = ft(0), n = ut(null), a = ut(null), r = ut(null), o = ut(0), s = He((u) => {
    r.current === null && (r.current = requestAnimationFrame(() => {
      r.current = null, u !== o.current && (o.current = u, t(u));
    }));
  }, []), c = He(() => {
    a.current && (a.current.disconnect(), a.current = null), r.current !== null && (cancelAnimationFrame(r.current), r.current = null);
  }, []), l = He(
    (u) => {
      if (c(), n.current = u, !u || typeof ResizeObserver > "u") return;
      const m = u.getBoundingClientRect().width;
      m > 0 && m !== o.current && (o.current = m, t(m));
      const f = new ResizeObserver((h) => {
        var p, b;
        for (const g of h) {
          const y = ((b = (p = g.contentBoxSize) == null ? void 0 : p[0]) == null ? void 0 : b.inlineSize) ?? g.contentRect.width;
          s(y);
        }
      });
      f.observe(u), a.current = f;
    },
    [s, c]
  );
  return Kt(() => c, [c]), [l, e];
}
const um = "day";
function mm(e, t) {
  var m;
  if (t.family !== "kpi") return null;
  const n = t.familyOptions, a = n == null ? void 0 : n.sparkline;
  if (!a) return null;
  const r = a.member ?? (n == null ? void 0 : n.measure), o = (m = e.timeDimensions) == null ? void 0 : m[0], s = a.timeDimension ?? (o == null ? void 0 : o.dimension);
  if (!r || !s) return null;
  const c = a.dateRange ?? (o == null ? void 0 : o.dateRange);
  return { query: {
    measures: [r],
    timeDimensions: [
      {
        dimension: s,
        granularity: a.granularity ?? um,
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
      series: { mode: "measures", members: [r] }
    },
    familyOptions: { chrome: "none" }
  } };
}
const oe = (e) => pe(e, "yyyy-MM-dd");
function dm(e, t = /* @__PURE__ */ new Date()) {
  if (!e) return;
  if (Array.isArray(e)) {
    const r = tn(e[0]), o = tn(e[1]);
    if (Number.isNaN(r.getTime()) || Number.isNaN(o.getTime())) return;
    const s = lc(o, r) + 1;
    return [oe(Me(r, s)), oe(Me(r, 1))];
  }
  if (typeof e != "string") return;
  const n = e.trim().toLowerCase();
  if (n === "today") {
    const r = Me(t, 1);
    return [oe(r), oe(r)];
  }
  if (n === "yesterday") {
    const r = Me(t, 2);
    return [oe(r), oe(r)];
  }
  const a = n.match(/^last (\d+) (day|days|week|weeks|month|months|quarter|quarters|year|years)$/);
  if (a) {
    const r = Number(a[1]), o = a[2];
    if (o.startsWith("day")) return [oe(Me(t, 2 * r - 1)), oe(Me(t, r))];
    if (o.startsWith("week")) return [oe(Me(t, 14 * r - 1)), oe(Me(t, 7 * r))];
    if (o.startsWith("month"))
      return [oe(Rn(An(t, 2 * r))), oe(Me(Rn(An(t, r)), 1))];
    if (o.startsWith("quarter"))
      return [oe(Mn(On(t, 2 * r))), oe(Me(Mn(On(t, r)), 1))];
    if (o.startsWith("year"))
      return [oe(Ln(Dn(t, 2 * r))), oe(Me(Ln(Dn(t, r)), 1))];
  }
  if (n === "this week") {
    const r = uc(t, 1);
    return [oe(mc(r)), oe(dc(r))];
  }
  if (n === "this month") {
    const r = An(t, 1);
    return [oe(Rn(r)), oe(vc(r))];
  }
  if (n === "this quarter") {
    const r = On(t, 1);
    return [oe(Mn(r)), oe(fc(r))];
  }
  if (n === "this year") {
    const r = Dn(t, 1);
    return [oe(Ln(r)), oe(hc(r))];
  }
}
function vm(e, t) {
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
  const s = dm(o);
  return s ? { query: {
    ...e,
    timeDimensions: [{ ...r, dateRange: s, compareDateRange: void 0 }]
  }, mode: a } : null;
}
const fm = {
  categories: [],
  series: [],
  raw: { rows: [], query: {} },
  empty: !0
};
function _r({ query: e, chart: t, onState: n, editing: a }) {
  const { registry: r, locale: o } = Qe(), s = te(() => {
    var w;
    return (w = t.format) != null && w.unitSystem || !(o != null && o.unitSystem) ? t : { ...t, format: { ...t.format, unitSystem: o.unitSystem } };
  }, [t, o == null ? void 0 : o.unitSystem]), c = te(
    () => e.timezone || !(o != null && o.timezone) ? e : { ...e, timezone: o.timezone },
    [e, o == null ? void 0 : o.timezone]
  ), { data: l, isLoading: u, error: m, refetch: f, resolvedQuery: h } = Pn(c, s), p = te(() => mm(c, s), [c, s]), b = Pn(
    (p == null ? void 0 : p.query) ?? c,
    (p == null ? void 0 : p.chart) ?? s,
    { skip: !p }
  ), g = te(
    () => vm(h, s),
    [h, s]
  ), y = Pn(
    (g == null ? void 0 : g.query) ?? c,
    s,
    { skip: !g, skipResolve: !0 }
  ), _ = te(
    () => ({ [s.family]: im(r, s.family) }),
    [r, s.family]
  ), N = te(() => {
    let w = l ?? fm;
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
          const j = w.series.find((P) => P.key === D.key);
          return {
            ...D,
            key: `${D.key}__prev`,
            label: `${(j == null ? void 0 : j.label) ?? D.label} (prev)`,
            colorToken: (j == null ? void 0 : j.colorToken) ?? D.colorToken,
            meta: { ...D.meta, companion: !0 }
          };
        });
        w = { ...w, series: [...w.series, ...L] };
      }
    }
    return w;
  }, [l, p, b.data, g, y.data]);
  Kt(() => {
    n == null || n({ rows: N.raw.rows, refetch: f, isLoading: u });
  }, [n, N.raw.rows, f, u]);
  const k = {}, R = te(
    () => o.formatValue ?? fo(bn(o.units)),
    [o.formatValue, o.units]
  ), C = te(
    () => vo(N.raw.annotation, s, R, {
      locale: o.locale,
      unitSystem: o.unitSystem
    }),
    [N.raw.annotation, s, R, o.locale, o.unitSystem]
  );
  return /* @__PURE__ */ i(
    am,
    {
      data: N,
      options: s,
      config: k,
      format: C,
      state: { loading: u && !l, error: m },
      components: _,
      editing: a
    }
  );
}
function hm({ spec: e }) {
  return /* @__PURE__ */ i(_r, { query: e.query, chart: e.chart });
}
const Ao = "cube-viz-prose";
function pm(e) {
  return typeof e == "object" && e !== null && typeof e.type == "string";
}
function gm({ doc: e }) {
  const t = pm(e), n = te(
    () => t ? e : null,
    [t, e]
  ), a = Za(
    {
      extensions: [to],
      editable: !1,
      content: n,
      // Validate against the StarterKit schema rather than throwing on an unknown
      // node; on error we keep the (sanitized) document instead of blanking it.
      enableContentCheck: !0,
      emitContentError: !0,
      onContentError: () => {
      },
      editorProps: {
        attributes: { class: S(Ao) }
      }
    },
    [n]
  );
  return t ? /* @__PURE__ */ i(eo, { editor: a }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Unsupported text content" });
}
const Zt = [
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
], bm = Object.fromEntries(
  Zt.map((e) => [e.value, e.label])
);
function sa(e) {
  return bm[e.trim().toLowerCase()] ?? e;
}
const ym = [
  "this month",
  "last 7 days",
  "last 30 days",
  "last 90 days",
  "last month",
  "this year",
  "last year"
];
function xm({ calendarMonth: e }) {
  const { goToMonth: t, nextMonth: n, previousMonth: a } = gc(), r = S(Co({ variant: "outline" }), "cv:size-7 cv:shrink-0 cv:p-0");
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
    /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:text-foreground", children: pe(e.date, "MMMM yyyy") }),
    /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        "aria-label": "Go to next month",
        disabled: !n,
        onClick: () => n && t(n),
        className: S(r, !n && "cv:opacity-40"),
        children: /* @__PURE__ */ i(Bt, { className: "cv:size-4" })
      }
    )
  ] });
}
function wm({ day: e, modifiers: t, className: n, style: a, ...r }) {
  const o = !!t.selected && !t.outside && !t.disabled, s = !!t.outside || !!t.disabled;
  return /* @__PURE__ */ i(
    "button",
    {
      ...r,
      style: { ...a, color: o ? "var(--primary-foreground)" : s ? "var(--muted-foreground)" : "var(--foreground)" },
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
function Mo({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  ...a
}) {
  return /* @__PURE__ */ i(
    pc,
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
        MonthCaption: xm,
        DayButton: wm,
        Chevron: ({ orientation: r, className: o, ...s }) => /* @__PURE__ */ i(r === "left" ? lr : Bt, { className: S("cv:size-4", o), ...s })
      },
      ...a
    }
  );
}
function _e({
  ...e
}) {
  return /* @__PURE__ */ i(en.Root, { "data-slot": "popover", ...e });
}
function Re({
  ...e
}) {
  return /* @__PURE__ */ i(en.Trigger, { "data-slot": "popover-trigger", ...e });
}
function Ae({
  className: e,
  align: t = "center",
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ i(en.Portal, { children: /* @__PURE__ */ i(
    en.Content,
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
function Le({
  ...e
}) {
  return /* @__PURE__ */ i(xe.Root, { "data-slot": "select", ...e });
}
function Jn({
  ...e
}) {
  return /* @__PURE__ */ i(xe.Group, { "data-slot": "select-group", ...e });
}
function De({
  ...e
}) {
  return /* @__PURE__ */ i(xe.Value, { "data-slot": "select-value", ...e });
}
function Te({
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
        /* @__PURE__ */ i(xe.Icon, { asChild: !0, children: /* @__PURE__ */ i(Ge, { className: "cv:size-4 cv:opacity-50" }) })
      ]
    }
  );
}
function km({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    xe.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Di, { className: "cv:size-4" })
    }
  );
}
function Nm({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ i(
    xe.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: S("cv:flex cv:cursor-default cv:items-center cv:justify-center cv:py-1", e),
      ...t,
      children: /* @__PURE__ */ i(Ge, { className: "cv:size-4" })
    }
  );
}
function ze({
  className: e,
  children: t,
  position: n = "popper",
  ...a
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
      ...a,
      children: [
        /* @__PURE__ */ i(km, {}),
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
        /* @__PURE__ */ i(Nm, {})
      ]
    }
  ) });
}
function Xn({
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
        /* @__PURE__ */ i("span", { className: "cv:absolute cv:right-2 cv:flex cv:size-3.5 cv:items-center cv:justify-center", children: /* @__PURE__ */ i(xe.ItemIndicator, { children: /* @__PURE__ */ i(je, { className: "cv:size-4" }) }) }),
        /* @__PURE__ */ i(xe.ItemText, { children: t })
      ]
    }
  );
}
const gt = S(
  "cv:flex cv:h-9 cv:w-full cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-1 cv:text-sm cv:text-foreground",
  "cv:shadow-sm cv:transition-colors cv:placeholder:text-muted-foreground",
  "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring",
  // Native <option> popups are OS-drawn; set readable colors so dark mode isn't black-on-black.
  "cv:[&>option]:bg-popover cv:[&>option]:text-popover-foreground",
  "cv:disabled:cursor-not-allowed cv:disabled:opacity-50"
), Cm = "cv:mb-1 cv:block cv:text-xs cv:font-medium cv:text-muted-foreground", Dt = "yyyy-MM-dd";
function Sm(e) {
  return Array.isArray(e) && e.length === 2 && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function la(e) {
  if (!e) return;
  const t = Ja(e, Dt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function _m({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, r = a.presets ?? ym, [o, s] = ft(!1), c = typeof e == "string", [l, u] = Sm(e), m = la(l), f = la(u), h = m ? { from: m, to: f } : void 0;
  let p;
  c ? p = sa(e) : m && f ? p = `${pe(m, "MMM d, yyyy")} – ${pe(f, "MMM d, yyyy")}` : m ? p = pe(m, "MMM d, yyyy") : p = "Pick a date range";
  const b = a.allowFuture === !1 ? { after: /* @__PURE__ */ new Date() } : void 0;
  return /* @__PURE__ */ v(_e, { open: o, onOpenChange: s, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(
      B,
      {
        variant: "outline",
        className: S(
          "cv:w-full cv:justify-start cv:text-left cv:font-normal",
          p === "Pick a date range" && "cv:text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ i(Va, { className: "cv:mr-2 cv:size-4" }),
          p
        ]
      }
    ) }),
    /* @__PURE__ */ v(Ae, { className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", align: "start", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:max-h-80 cv:flex-col cv:gap-1 cv:overflow-y-auto cv:border-r cv:pr-2", children: r.map((g) => /* @__PURE__ */ i(
        B,
        {
          variant: "ghost",
          size: "sm",
          className: "cv:justify-start cv:whitespace-nowrap cv:font-normal",
          onClick: () => {
            t(g), s(!1);
          },
          children: sa(g)
        },
        g
      )) }),
      /* @__PURE__ */ i(
        Mo,
        {
          mode: "range",
          selected: h,
          defaultMonth: m,
          disabled: b,
          onSelect: (g) => {
            g != null && g.from && g.to ? t([pe(g.from, Dt), pe(g.to, Dt)]) : g != null && g.from ? t([pe(g.from, Dt), pe(g.from, Dt)]) : t(["", ""]);
          }
        }
      )
    ] })
  ] });
}
const Rm = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "quarter",
  "year"
];
function Am(e) {
  return e <= 2 ? ["minute", "hour", "day"] : e <= 31 ? ["hour", "day", "week"] : e <= 186 ? ["day", "week", "month"] : e <= 731 ? ["week", "month", "quarter"] : ["month", "quarter", "year"];
}
function Mm(e) {
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
function Om({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { resolveValue: r } = _o(), o = a.rangeVariable ? Mm(r(a.rangeVariable)) : void 0, s = a.options ?? (o !== void 0 ? Am(o) : Rm), c = typeof e == "string" ? e : "", l = s.join(",");
  return Kt(() => {
    c && !s.includes(c) && t(s[0]);
  }, [c, l]), /* @__PURE__ */ v(
    Le,
    {
      value: c,
      onValueChange: (u) => t(u),
      children: [
        /* @__PURE__ */ i(Te, { className: gt, children: /* @__PURE__ */ i(De, { placeholder: "—" }) }),
        /* @__PURE__ */ i(ze, { children: s.map((u) => /* @__PURE__ */ i(be, { value: u, children: u[0].toUpperCase() + u.slice(1) }, u)) })
      ]
    }
  );
}
function Lm({ value: e, onChange: t, control: n }) {
  const a = n;
  if (a.multiple) {
    const o = new Set(
      (Array.isArray(e) ? e : []).map((s) => String(s))
    );
    return /* @__PURE__ */ i(
      "select",
      {
        multiple: !0,
        className: S(gt, "cv:h-auto cv:min-h-[6rem]"),
        value: [...o],
        onChange: (s) => {
          const c = Array.from(s.target.selectedOptions, (u) => u.value), l = a.options.every((u) => typeof u.value == "number");
          t(l ? c.map((u) => Number(u)) : c);
        },
        children: a.options.map((s) => /* @__PURE__ */ i("option", { value: String(s.value), children: s.label }, String(s.value)))
      }
    );
  }
  const r = e === void 0 ? "" : String(e);
  return /* @__PURE__ */ v(
    Le,
    {
      value: r,
      onValueChange: (o) => {
        const s = a.options.find((c) => String(c.value) === o);
        t(s ? s.value : void 0);
      },
      children: [
        /* @__PURE__ */ i(Te, { className: gt, children: /* @__PURE__ */ i(De, { placeholder: "—" }) }),
        /* @__PURE__ */ i(ze, { children: a.options.map((o) => /* @__PURE__ */ i(be, { value: String(o.value), children: o.label }, String(o.value))) })
      ]
    }
  );
}
function Dm({
  value: e,
  onChange: t,
  control: n
}) {
  const a = n, { meta: r, isLoading: o } = Je(), s = te(() => {
    if (!r) return [];
    const c = [];
    for (const l of r.cubes)
      if (!(a.cube && l.name !== a.cube)) {
        if (a.from === "measure" || a.from === "dimensionOrMeasure")
          for (const u of l.measures) c.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
        if (a.from === "dimension" || a.from === "dimensionOrMeasure")
          for (const u of l.dimensions) c.push({ name: u.name, label: u.shortTitle ?? u.title ?? u.name });
      }
    return c;
  }, [r, a.cube, a.from]);
  return /* @__PURE__ */ v(
    "select",
    {
      className: gt,
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
function Tm({ value: e, onChange: t, control: n }) {
  return /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      className: gt,
      placeholder: n.placeholder,
      value: typeof e == "string" ? e : "",
      onChange: (r) => t(r.target.value)
    }
  );
}
function zm({ value: e, onChange: t, control: n }) {
  const a = n;
  return /* @__PURE__ */ i(
    "input",
    {
      type: "number",
      className: gt,
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
function Fm({ value: e, onChange: t, decl: n }) {
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
const $m = {
  dateRange: _m,
  granularity: Om,
  select: Lm,
  memberSelect: Dm,
  text: Tm,
  number: zm,
  toggle: Fm
};
function Em({ control: e, title: t }) {
  var p;
  const { registry: n } = Qe(), { decls: a, resolveValue: r, setVar: o } = _o(), s = te(
    () => a.find((b) => b.name === e.variable),
    [a, e.variable]
  );
  if (!s)
    return /* @__PURE__ */ v("div", { className: "cv:text-sm cv:text-muted-foreground", children: [
      "Unknown variable “",
      e.variable,
      "”"
    ] });
  const c = e.control.kind, l = ((p = n.controls) == null ? void 0 : p[c]) ?? $m[c], u = r(e.variable), m = (b) => o(e.variable, b), f = t ?? s.label ?? s.name, h = Ri();
  return c === "toggle" ? /* @__PURE__ */ i(l, { value: u, onChange: m, decl: s, control: e.control }) : /* @__PURE__ */ v("div", { children: [
    /* @__PURE__ */ i("label", { className: Cm, htmlFor: h, children: f }),
    /* @__PURE__ */ i(
      l,
      {
        value: u,
        onChange: m,
        decl: s,
        control: e.control,
        controlId: h
      }
    )
  ] });
}
const Oo = x.forwardRef(
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
Oo.displayName = "Card";
const Lo = x.forwardRef(
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
Lo.displayName = "CardHeader";
const Do = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: S("cv:font-semibold cv:leading-none cv:tracking-tight", e),
      ...t
    }
  )
);
Do.displayName = "CardTitle";
const Pm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:text-sm cv:text-muted-foreground", e), ...t })
);
Pm.displayName = "CardDescription";
const Im = x.forwardRef(
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
Im.displayName = "CardAction";
const To = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:px-6 cv:pb-6", e), ...t })
);
To.displayName = "CardContent";
const jm = x.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: S("cv:flex cv:items-center cv:px-6 cv:pb-6", e), ...t })
);
jm.displayName = "CardFooter";
const on = "cube-viz-drag-handle";
function zo(e) {
  var c;
  const { registry: t } = Qe(), n = (c = t.chrome) == null ? void 0 : c.widget;
  if (n) return /* @__PURE__ */ i(n, { ...e });
  const { title: a, menu: r, dragHandleProps: o, children: s } = e;
  return /* @__PURE__ */ v(Oo, { className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-0 cv:overflow-hidden cv:rounded-xl cv:border-0 cv:bg-muted/40 cv:shadow-none", children: [
    a ? /* @__PURE__ */ v(
      Lo,
      {
        ...o,
        className: S(
          on,
          "cv:flex cv:shrink-0 cv:cursor-grab cv:flex-row cv:items-center cv:justify-between cv:gap-2",
          "cv:px-4 cv:pb-1 cv:pt-3 cv:active:cursor-grabbing"
        ),
        children: [
          /* @__PURE__ */ i(Do, { className: "cv:truncate cv:text-sm cv:font-semibold", children: a }),
          r
        ]
      }
    ) : null,
    /* @__PURE__ */ i(To, { className: "cv:min-h-0 cv:flex-1 cv:overflow-auto cv:px-4 cv:pb-4 cv:pt-1", children: s })
  ] });
}
function Vm(e) {
  if (e.length === 0) return "";
  const t = Object.keys(e[0]), n = (o) => {
    const s = o == null ? "" : String(o);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }, a = t.map(n).join(","), r = e.map((o) => t.map((s) => n(o[s])).join(",")).join(`
`);
  return `${a}
${r}`;
}
function qm(e, t, n = "text/csv;charset=utf-8") {
  const a = new Blob([e], { type: n }), r = URL.createObjectURL(a), o = document.createElement("a");
  o.href = r, o.download = t, o.click(), URL.revokeObjectURL(r);
}
function Km(e, t) {
  if (e.match(/^[a-z]+:\/\//i))
    return e;
  if (e.match(/^\/\//))
    return window.location.protocol + e;
  if (e.match(/^[a-z]+:/i))
    return e;
  const n = document.implementation.createHTMLDocument(), a = n.createElement("base"), r = n.createElement("a");
  return n.head.appendChild(a), n.body.appendChild(r), t && (a.href = t), r.href = e, r.href;
}
const Bm = /* @__PURE__ */ (() => {
  let e = 0;
  const t = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => (e += 1, `u${t()}${e}`);
})();
function We(e) {
  const t = [];
  for (let n = 0, a = e.length; n < a; n++)
    t.push(e[n]);
  return t;
}
let st = null;
function Fo(e = {}) {
  return st || (e.includeStyleProperties ? (st = e.includeStyleProperties, st) : (st = We(window.getComputedStyle(document.documentElement)), st));
}
function cn(e, t) {
  const a = (e.ownerDocument.defaultView || window).getComputedStyle(e).getPropertyValue(t);
  return a ? parseFloat(a.replace("px", "")) : 0;
}
function Hm(e) {
  const t = cn(e, "border-left-width"), n = cn(e, "border-right-width");
  return e.clientWidth + t + n;
}
function Wm(e) {
  const t = cn(e, "border-top-width"), n = cn(e, "border-bottom-width");
  return e.clientHeight + t + n;
}
function $o(e, t = {}) {
  const n = t.width || Hm(e), a = t.height || Wm(e);
  return { width: n, height: a };
}
function Um() {
  let e, t;
  try {
    t = process;
  } catch {
  }
  const n = t && t.env ? t.env.devicePixelRatio : null;
  return n && (e = parseInt(n, 10), Number.isNaN(e) && (e = 1)), e || window.devicePixelRatio || 1;
}
const ke = 16384;
function Gm(e) {
  (e.width > ke || e.height > ke) && (e.width > ke && e.height > ke ? e.width > e.height ? (e.height *= ke / e.width, e.width = ke) : (e.width *= ke / e.height, e.height = ke) : e.width > ke ? (e.height *= ke / e.width, e.width = ke) : (e.width *= ke / e.height, e.height = ke));
}
function sn(e) {
  return new Promise((t, n) => {
    const a = new Image();
    a.onload = () => {
      a.decode().then(() => {
        requestAnimationFrame(() => t(a));
      });
    }, a.onerror = n, a.crossOrigin = "anonymous", a.decoding = "async", a.src = e;
  });
}
async function Ym(e) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then((t) => `data:image/svg+xml;charset=utf-8,${t}`);
}
async function Qm(e, t, n) {
  const a = "http://www.w3.org/2000/svg", r = document.createElementNS(a, "svg"), o = document.createElementNS(a, "foreignObject");
  return r.setAttribute("width", `${t}`), r.setAttribute("height", `${n}`), r.setAttribute("viewBox", `0 0 ${t} ${n}`), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.setAttribute("x", "0"), o.setAttribute("y", "0"), o.setAttribute("externalResourcesRequired", "true"), r.appendChild(o), o.appendChild(e), Ym(r);
}
const we = (e, t) => {
  if (e instanceof t)
    return !0;
  const n = Object.getPrototypeOf(e);
  return n === null ? !1 : n.constructor.name === t.name || we(n, t);
};
function Jm(e) {
  const t = e.getPropertyValue("content");
  return `${e.cssText} content: '${t.replace(/'|"/g, "")}';`;
}
function Xm(e, t) {
  return Fo(t).map((n) => {
    const a = e.getPropertyValue(n), r = e.getPropertyPriority(n);
    return `${n}: ${a}${r ? " !important" : ""};`;
  }).join(" ");
}
function Zm(e, t, n, a) {
  const r = `.${e}:${t}`, o = n.cssText ? Jm(n) : Xm(n, a);
  return document.createTextNode(`${r}{${o}}`);
}
function ua(e, t, n, a) {
  const r = window.getComputedStyle(e, n), o = r.getPropertyValue("content");
  if (o === "" || o === "none")
    return;
  const s = Bm();
  try {
    t.className = `${t.className} ${s}`;
  } catch {
    return;
  }
  const c = document.createElement("style");
  c.appendChild(Zm(s, n, r, a)), t.appendChild(c);
}
function ed(e, t, n) {
  ua(e, t, ":before", n), ua(e, t, ":after", n);
}
const ma = "application/font-woff", da = "image/jpeg", td = {
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
function nd(e) {
  const t = /\.([^./]*?)$/g.exec(e);
  return t ? t[1] : "";
}
function Rr(e) {
  const t = nd(e).toLowerCase();
  return td[t] || "";
}
function rd(e) {
  return e.split(/,/)[1];
}
function Zn(e) {
  return e.search(/^(data:)/) !== -1;
}
function ad(e, t) {
  return `data:${t};base64,${e}`;
}
async function Eo(e, t, n) {
  const a = await fetch(e, t);
  if (a.status === 404)
    throw new Error(`Resource "${a.url}" not found`);
  const r = await a.blob();
  return new Promise((o, s) => {
    const c = new FileReader();
    c.onerror = s, c.onloadend = () => {
      try {
        o(n({ res: a, result: c.result }));
      } catch (l) {
        s(l);
      }
    }, c.readAsDataURL(r);
  });
}
const In = {};
function od(e, t, n) {
  let a = e.replace(/\?.*/, "");
  return n && (a = e), /ttf|otf|eot|woff2?/i.test(a) && (a = a.replace(/.*\//, "")), t ? `[${t}]${a}` : a;
}
async function Ar(e, t, n) {
  const a = od(e, t, n.includeQueryParams);
  if (In[a] != null)
    return In[a];
  n.cacheBust && (e += (/\?/.test(e) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime());
  let r;
  try {
    const o = await Eo(e, n.fetchRequestInit, ({ res: s, result: c }) => (t || (t = s.headers.get("Content-Type") || ""), rd(c)));
    r = ad(o, t);
  } catch (o) {
    r = n.imagePlaceholder || "";
    let s = `Failed to fetch resource: ${e}`;
    o && (s = typeof o == "string" ? o : o.message), s && console.warn(s);
  }
  return In[a] = r, r;
}
async function id(e) {
  const t = e.toDataURL();
  return t === "data:," ? e.cloneNode(!1) : sn(t);
}
async function cd(e, t) {
  if (e.currentSrc) {
    const o = document.createElement("canvas"), s = o.getContext("2d");
    o.width = e.clientWidth, o.height = e.clientHeight, s == null || s.drawImage(e, 0, 0, o.width, o.height);
    const c = o.toDataURL();
    return sn(c);
  }
  const n = e.poster, a = Rr(n), r = await Ar(n, a, t);
  return sn(r);
}
async function sd(e, t) {
  var n;
  try {
    if (!((n = e == null ? void 0 : e.contentDocument) === null || n === void 0) && n.body)
      return await wn(e.contentDocument.body, t, !0);
  } catch {
  }
  return e.cloneNode(!1);
}
async function ld(e, t) {
  return we(e, HTMLCanvasElement) ? id(e) : we(e, HTMLVideoElement) ? cd(e, t) : we(e, HTMLIFrameElement) ? sd(e, t) : e.cloneNode(Po(e));
}
const ud = (e) => e.tagName != null && e.tagName.toUpperCase() === "SLOT", Po = (e) => e.tagName != null && e.tagName.toUpperCase() === "SVG";
async function md(e, t, n) {
  var a, r;
  if (Po(t))
    return t;
  let o = [];
  return ud(e) && e.assignedNodes ? o = We(e.assignedNodes()) : we(e, HTMLIFrameElement) && (!((a = e.contentDocument) === null || a === void 0) && a.body) ? o = We(e.contentDocument.body.childNodes) : o = We(((r = e.shadowRoot) !== null && r !== void 0 ? r : e).childNodes), o.length === 0 || we(e, HTMLVideoElement) || await o.reduce((s, c) => s.then(() => wn(c, n)).then((l) => {
    l && t.appendChild(l);
  }), Promise.resolve()), t;
}
function dd(e, t, n) {
  const a = t.style;
  if (!a)
    return;
  const r = window.getComputedStyle(e);
  r.cssText ? (a.cssText = r.cssText, a.transformOrigin = r.transformOrigin) : Fo(n).forEach((o) => {
    let s = r.getPropertyValue(o);
    o === "font-size" && s.endsWith("px") && (s = `${Math.floor(parseFloat(s.substring(0, s.length - 2))) - 0.1}px`), we(e, HTMLIFrameElement) && o === "display" && s === "inline" && (s = "block"), o === "d" && t.getAttribute("d") && (s = `path(${t.getAttribute("d")})`), a.setProperty(o, s, r.getPropertyPriority(o));
  });
}
function vd(e, t) {
  we(e, HTMLTextAreaElement) && (t.innerHTML = e.value), we(e, HTMLInputElement) && t.setAttribute("value", e.value);
}
function fd(e, t) {
  if (we(e, HTMLSelectElement)) {
    const a = Array.from(t.children).find((r) => e.value === r.getAttribute("value"));
    a && a.setAttribute("selected", "");
  }
}
function hd(e, t, n) {
  return we(t, Element) && (dd(e, t, n), ed(e, t, n), vd(e, t), fd(e, t)), t;
}
async function pd(e, t) {
  const n = e.querySelectorAll ? e.querySelectorAll("use") : [];
  if (n.length === 0)
    return e;
  const a = {};
  for (let o = 0; o < n.length; o++) {
    const c = n[o].getAttribute("xlink:href");
    if (c) {
      const l = e.querySelector(c), u = document.querySelector(c);
      !l && u && !a[c] && (a[c] = await wn(u, t, !0));
    }
  }
  const r = Object.values(a);
  if (r.length) {
    const o = "http://www.w3.org/1999/xhtml", s = document.createElementNS(o, "svg");
    s.setAttribute("xmlns", o), s.style.position = "absolute", s.style.width = "0", s.style.height = "0", s.style.overflow = "hidden", s.style.display = "none";
    const c = document.createElementNS(o, "defs");
    s.appendChild(c);
    for (let l = 0; l < r.length; l++)
      c.appendChild(r[l]);
    e.appendChild(s);
  }
  return e;
}
async function wn(e, t, n) {
  return !n && t.filter && !t.filter(e) ? null : Promise.resolve(e).then((a) => ld(a, t)).then((a) => md(e, a, t)).then((a) => hd(e, a, t)).then((a) => pd(a, t));
}
const Io = /url\((['"]?)([^'"]+?)\1\)/g, gd = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g, bd = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function yd(e) {
  const t = e.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`, "g");
}
function xd(e) {
  const t = [];
  return e.replace(Io, (n, a, r) => (t.push(r), n)), t.filter((n) => !Zn(n));
}
async function wd(e, t, n, a, r) {
  try {
    const o = n ? Km(t, n) : t, s = Rr(t);
    let c;
    return r || (c = await Ar(o, s, a)), e.replace(yd(t), `$1${c}$3`);
  } catch {
  }
  return e;
}
function kd(e, { preferredFontFormat: t }) {
  return t ? e.replace(bd, (n) => {
    for (; ; ) {
      const [a, , r] = gd.exec(n) || [];
      if (!r)
        return "";
      if (r === t)
        return `src: ${a};`;
    }
  }) : e;
}
function jo(e) {
  return e.search(Io) !== -1;
}
async function Vo(e, t, n) {
  if (!jo(e))
    return e;
  const a = kd(e, n);
  return xd(a).reduce((o, s) => o.then((c) => wd(c, s, t, n)), Promise.resolve(a));
}
async function lt(e, t, n) {
  var a;
  const r = (a = t.style) === null || a === void 0 ? void 0 : a.getPropertyValue(e);
  if (r) {
    const o = await Vo(r, null, n);
    return t.style.setProperty(e, o, t.style.getPropertyPriority(e)), !0;
  }
  return !1;
}
async function Nd(e, t) {
  await lt("background", e, t) || await lt("background-image", e, t), await lt("mask", e, t) || await lt("-webkit-mask", e, t) || await lt("mask-image", e, t) || await lt("-webkit-mask-image", e, t);
}
async function Cd(e, t) {
  const n = we(e, HTMLImageElement);
  if (!(n && !Zn(e.src)) && !(we(e, SVGImageElement) && !Zn(e.href.baseVal)))
    return;
  const a = n ? e.src : e.href.baseVal, r = await Ar(a, Rr(a), t);
  await new Promise((o, s) => {
    e.onload = o, e.onerror = t.onImageErrorHandler ? (...l) => {
      try {
        o(t.onImageErrorHandler(...l));
      } catch (u) {
        s(u);
      }
    } : s;
    const c = e;
    c.decode && (c.decode = o), c.loading === "lazy" && (c.loading = "eager"), n ? (e.srcset = "", e.src = r) : e.href.baseVal = r;
  });
}
async function Sd(e, t) {
  const a = We(e.childNodes).map((r) => qo(r, t));
  await Promise.all(a).then(() => e);
}
async function qo(e, t) {
  we(e, Element) && (await Nd(e, t), await Cd(e, t), await Sd(e, t));
}
function _d(e, t) {
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
  const a = /url\(["']?([^"')]+)["']?\)/g, o = (n.match(/url\([^)]+\)/g) || []).map(async (s) => {
    let c = s.replace(a, "$1");
    return c.startsWith("https://") || (c = new URL(c, e.url).href), Eo(c, t.fetchRequestInit, ({ result: l }) => (n = n.replace(s, `url(${l})`), [s, l]));
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
  const o = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi, s = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})", c = new RegExp(s, "gi");
  for (; ; ) {
    let l = o.exec(a);
    if (l === null) {
      if (l = c.exec(a), l === null)
        break;
      o.lastIndex = c.lastIndex;
    } else
      c.lastIndex = o.lastIndex;
    t.push(l[0]);
  }
  return t;
}
async function Rd(e, t) {
  const n = [], a = [];
  return e.forEach((r) => {
    if ("cssRules" in r)
      try {
        We(r.cssRules || []).forEach((o, s) => {
          if (o.type === CSSRule.IMPORT_RULE) {
            let c = s + 1;
            const l = o.href, u = fa(l).then((m) => ha(m, t)).then((m) => pa(m).forEach((f) => {
              try {
                r.insertRule(f, f.startsWith("@import") ? c += 1 : r.cssRules.length);
              } catch (h) {
                console.error("Error inserting rule from remote css", {
                  rule: f,
                  error: h
                });
              }
            })).catch((m) => {
              console.error("Error loading remote css", m.toString());
            });
            a.push(u);
          }
        });
      } catch (o) {
        const s = e.find((c) => c.href == null) || document.styleSheets[0];
        r.href != null && a.push(fa(r.href).then((c) => ha(c, t)).then((c) => pa(c).forEach((l) => {
          s.insertRule(l, s.cssRules.length);
        })).catch((c) => {
          console.error("Error loading remote stylesheet", c);
        })), console.error("Error inlining remote css file", o);
      }
  }), Promise.all(a).then(() => (e.forEach((r) => {
    if ("cssRules" in r)
      try {
        We(r.cssRules || []).forEach((o) => {
          n.push(o);
        });
      } catch (o) {
        console.error(`Error while reading CSS rules from ${r.href}`, o);
      }
  }), n));
}
function Ad(e) {
  return e.filter((t) => t.type === CSSRule.FONT_FACE_RULE).filter((t) => jo(t.style.getPropertyValue("src")));
}
async function Md(e, t) {
  if (e.ownerDocument == null)
    throw new Error("Provided element is not within a Document");
  const n = We(e.ownerDocument.styleSheets), a = await Rd(n, t);
  return Ad(a);
}
function Ko(e) {
  return e.trim().replace(/["']/g, "");
}
function Od(e) {
  const t = /* @__PURE__ */ new Set();
  function n(a) {
    (a.style.fontFamily || getComputedStyle(a).fontFamily).split(",").forEach((o) => {
      t.add(Ko(o));
    }), Array.from(a.children).forEach((o) => {
      o instanceof HTMLElement && n(o);
    });
  }
  return n(e), t;
}
async function Ld(e, t) {
  const n = await Md(e, t), a = Od(e);
  return (await Promise.all(n.filter((o) => a.has(Ko(o.style.fontFamily))).map((o) => {
    const s = o.parentStyleSheet ? o.parentStyleSheet.href : null;
    return Vo(o.cssText, s, t);
  }))).join(`
`);
}
async function Dd(e, t) {
  const n = t.fontEmbedCSS != null ? t.fontEmbedCSS : t.skipFonts ? null : await Ld(e, t);
  if (n) {
    const a = document.createElement("style"), r = document.createTextNode(n);
    a.appendChild(r), e.firstChild ? e.insertBefore(a, e.firstChild) : e.appendChild(a);
  }
}
async function Td(e, t = {}) {
  const { width: n, height: a } = $o(e, t), r = await wn(e, t, !0);
  return await Dd(r, t), await qo(r, t), _d(r, t), await Qm(r, n, a);
}
async function zd(e, t = {}) {
  const { width: n, height: a } = $o(e, t), r = await Td(e, t), o = await sn(r), s = document.createElement("canvas"), c = s.getContext("2d"), l = t.pixelRatio || Um(), u = t.canvasWidth || n, m = t.canvasHeight || a;
  return s.width = u * l, s.height = m * l, t.skipAutoScale || Gm(s), s.style.width = `${u}`, s.style.height = `${m}`, t.backgroundColor && (c.fillStyle = t.backgroundColor, c.fillRect(0, 0, s.width, s.height)), c.drawImage(o, 0, 0, s.width, s.height), s;
}
async function Fd(e, t = {}) {
  return (await zd(e, t)).toDataURL();
}
function $d(e, t = "chart") {
  return (e ?? t).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || t;
}
function Ed(e, t) {
  const n = document.createElement("a");
  n.href = e, n.download = t, n.style.display = "none", document.body.appendChild(n), n.click(), n.remove();
}
function Pd(e) {
  let t = e;
  for (; t; ) {
    const n = getComputedStyle(t).backgroundColor;
    if (n && n !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(n)) return n;
    t = t.parentElement;
  }
  return "#ffffff";
}
async function Id(e, t, n = 2) {
  const a = await Fd(e, {
    pixelRatio: n,
    backgroundColor: Pd(e),
    cacheBust: !0
  });
  Ed(a, `${$d(t)}.png`);
}
function jd({
  title: e,
  rows: t,
  refetch: n,
  captureRef: a
}) {
  const [r, o] = x.useState(!1), s = t.length > 0, c = !!a;
  if (!s && !n && !c) return null;
  const l = () => {
    const h = (e ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    qm(Vm(t), `${h}.csv`);
  }, u = async () => {
    const h = a == null ? void 0 : a.current;
    if (!(!h || r)) {
      o(!0);
      try {
        await Id(h, e);
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
        children: /* @__PURE__ */ i(Ti, { className: "cv:size-4" })
      }
    ),
    /* @__PURE__ */ v(Ae, { align: "end", className: "cv:w-44 cv:p-1", onMouseDown: m, onPointerDown: m, onTouchStart: m, children: [
      n ? /* @__PURE__ */ v("button", { type: "button", onClick: n, className: f(), children: [
        /* @__PURE__ */ i(zi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Refresh"
      ] }) : null,
      c ? /* @__PURE__ */ v("button", { type: "button", onClick: u, disabled: r, className: f(!r), children: [
        /* @__PURE__ */ i(Fi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
        "Export PNG"
      ] }) : null,
      /* @__PURE__ */ v("button", { type: "button", onClick: l, disabled: !s, className: f(s), children: [
        /* @__PURE__ */ i($i, { className: "cv:size-3.5 cv:text-muted-foreground" }),
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
      return /* @__PURE__ */ i(gm, { doc: e.doc });
    case "input":
      return /* @__PURE__ */ i(Em, { control: e.control, title: e.title });
  }
}
function Bo({ widget: e, dragHandleProps: t = {}, editable: n = !1 }) {
  const [a, r] = ft({ rows: [] }), o = He(
    (l) => r({ rows: l.rows, refetch: l.refetch }),
    []
  ), s = ut(null);
  if (e.type === "text" || e.type === "input")
    return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full cv:overflow-auto cv:p-2", children: /* @__PURE__ */ i(ga, { widget: e }) });
  const c = n ? null : /* @__PURE__ */ i(
    jd,
    {
      title: e.title,
      rows: a.rows,
      refetch: a.refetch,
      captureRef: s
    }
  );
  return /* @__PURE__ */ i(
    zo,
    {
      widget: e,
      title: e.title,
      menu: c,
      dragHandleProps: t,
      state: { loading: !1, empty: !1 },
      children: /* @__PURE__ */ i("div", { ref: s, style: { height: "100%", width: "100%" }, children: /* @__PURE__ */ i(ga, { widget: e, onState: o }) })
    }
  );
}
const Vd = "lg";
function qd(e) {
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
function Kd(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Th({ spec: e, editable: t = !1 }) {
  const [n, a] = Ro(), r = e.grid ?? {}, o = r.cols ?? 12, s = r.rowHeight ?? 40, c = r.margin ?? [12, 12], l = r.containerPadding ?? c, { breakpoints: u, cols: m } = te(
    () => qd(o),
    [o]
  ), f = te(
    () => ({ [Vd]: Kd(e.layout) }),
    [e.layout]
  ), h = te(
    () => new Map(e.widgets.map((p) => [p.id, p])),
    [e.widgets]
  );
  return /* @__PURE__ */ i(Cr, { spec: e, children: /* @__PURE__ */ i("div", { ref: n, className: "cv:w-full", children: a > 0 ? /* @__PURE__ */ i(
    Xa,
    {
      width: a,
      layouts: f,
      breakpoints: u,
      cols: m,
      rowHeight: s,
      margin: c,
      containerPadding: l,
      dragConfig: { enabled: t, handle: `.${on}` },
      resizeConfig: { enabled: t },
      children: e.layout.map((p) => {
        const b = h.get(p.i);
        return b ? /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(Bo, { widget: b, editable: t }) }, p.i) : null;
      })
    }
  ) : null }) });
}
function zh({ spec: e }) {
  return /* @__PURE__ */ i("div", { className: "cv:h-full cv:w-full", children: /* @__PURE__ */ i(
    zo,
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
      children: /* @__PURE__ */ i(hm, { spec: e })
    }
  ) });
}
function kn(e) {
  return typeof e.connectedComponent == "number" ? e.connectedComponent : void 0;
}
function nt(e) {
  return e.public !== void 0 ? e.public : e.isVisible !== void 0 ? e.isVisible : !0;
}
function Nn(e) {
  return e ? e.cubes.filter((t) => nt(t)).map((t) => ({
    name: t.name,
    title: t.title ?? t.name,
    type: t.type === "view" ? "view" : "cube",
    connectedComponent: kn(t)
  })) : [];
}
function Et(e, t) {
  if (!(!e || !t))
    return Nn(e).find((n) => n.name === t);
}
function Mr(e) {
  return e.shortTitle || e.title || e.name;
}
function ln(e, t) {
  const n = e == null ? void 0 : e[t];
  return typeof n == "string" ? n : void 0;
}
function Ho(e, t) {
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
function er(e, t) {
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
function Wo(e, t) {
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
function tr(e, t, n) {
  if (!e) return [];
  const a = [];
  for (const r of e.cubes) {
    if (!nt(r) || n && r.name !== n) continue;
    const o = kn(r), s = (c) => {
      c.connectedComponent = o, a.push(c);
    };
    if (t === "measure" || t === "dimensionOrMeasure")
      for (const c of r.measures)
        nt(c) && s(Ho(c, r.name));
    if (t === "dimension" || t === "dimensionOrMeasure")
      for (const c of r.dimensions)
        nt(c) && c.type !== "time" && s(er(c, r.name));
    if (t === "time")
      for (const c of r.dimensions)
        nt(c) && c.type === "time" && s(er(c, r.name));
  }
  return a;
}
function Bd(e, t) {
  if (!e) return [];
  const n = t ? new Set(t) : void 0, a = [];
  for (const r of e.cubes) {
    if (!nt(r) || n && !n.has(r.name)) continue;
    const o = kn(r);
    for (const s of r.segments) {
      if (!nt(s)) continue;
      const c = Wo(s, r.name);
      c.connectedComponent = o, a.push(c);
    }
  }
  return a;
}
function Fe(e, t) {
  if (!(!e || !t))
    for (const n of e.cubes) {
      const a = kn(n), r = (c) => (c && (c.connectedComponent = a), c), o = n.measures.find((c) => c.name === t) ?? n.dimensions.find((c) => c.name === t);
      if (o)
        return o.type ? "aggType" in o ? r(Ho(o, n.name)) : r(er(o, n.name)) : void 0;
      const s = n.segments.find((c) => c.name === t);
      if (s) return r(Wo(s, n.name));
    }
}
function Hd(e) {
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
const nr = /* @__PURE__ */ new Set([
  "set",
  "notSet"
]), Uo = {
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
function Tt(e) {
  if (!e) return;
  const t = e.indexOf(".");
  return t > 0 ? e.slice(0, t) : e;
}
function Go(e) {
  var s, c, l, u, m;
  const t = e.query, n = (s = t.measures) == null ? void 0 : s.find(Boolean);
  if (n) return Tt(n);
  const a = (c = t.dimensions) == null ? void 0 : c.find(Boolean);
  if (a) return Tt(a);
  const r = (u = (l = t.timeDimensions) == null ? void 0 : l[0]) == null ? void 0 : u.dimension;
  if (r) return Tt(r);
  const o = (m = e.chart.mapping) == null ? void 0 : m.category.member;
  return Tt(o);
}
function bt(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.members : [];
}
function _t(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "measures" ? t.meta ?? {} : {};
}
function Ne(e) {
  var t;
  return (t = e.mapping) == null ? void 0 : t.category.member;
}
function Xe(e) {
  var t;
  return (t = e.timeDimensions) == null ? void 0 : t[0];
}
function Yo(e, t) {
  const n = {};
  for (const r of e) {
    const o = t[r];
    o && Object.keys(o).length > 0 && (n[r] = o);
  }
  const a = { mode: "measures", members: e };
  return Object.keys(n).length > 0 && (a.meta = n), a;
}
const Qo = {
  bar: "Bar",
  line: "Line",
  area: "Area",
  pie: "Pie",
  scatter: "Scatter",
  kpi: "KPI",
  table: "Table",
  combo: "Combo"
}, Wd = "day";
function Ud(e, t) {
  var u, m, f, h;
  const { query: n, chart: a } = e, r = bt(a).length ? bt(a) : n.measures ?? [], o = Ne(a) ?? ((u = n.dimensions) == null ? void 0 : u[0]) ?? ((f = (m = n.timeDimensions) == null ? void 0 : m[0]) == null ? void 0 : f.dimension), s = o ? { category: { member: o }, series: { mode: "measures", members: r } } : void 0, c = {
    ...e,
    chart: { ...a, family: t, mapping: void 0, familyOptions: void 0 }
  }, l = (p) => ({
    ...c,
    chart: { ...c.chart, ...p }
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
function Ot(e) {
  return tu(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
function rr(e) {
  return ru(e ? { unit: e.unit, quantity: e.quantity } : void 0);
}
const ba = "a date or category";
function Gd(e) {
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
function Se(e) {
  return e.chart.familyOptions ?? {};
}
function Cn(e) {
  const t = Se(e).series;
  return Array.isArray(t) ? t : [];
}
function Or(e) {
  const t = Se(e).columns;
  return Array.isArray(t) ? t : [];
}
function Yd(e) {
  var n;
  const t = (n = e.chart.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.pivot : void 0;
}
function Ut(e) {
  var r;
  const { chart: t } = e, n = t.family, a = (o) => o ? [o] : [];
  switch (n) {
    case "bar":
    case "line":
    case "area": {
      const o = Yd(e), s = (r = t.mapping) == null ? void 0 : r.series;
      return { y: s && s.mode === "pivot" ? s.values && s.values.length > 0 ? s.values : a(s.value) : bt(t), x: a(Ne(t)), color: a(o) };
    }
    case "combo":
      return {
        x: a(Ne(t)),
        y: Cn(e).map((o) => o.member)
      };
    case "pie":
      return { slices: a(Ne(t)), size: a(bt(t)[0]) };
    case "scatter": {
      const o = Se(e);
      return {
        sx: a(o.x),
        sy: a(o.y),
        size: a(o.size),
        color: a(o.groupBy)
      };
    }
    case "kpi":
      return { value: a(Se(e).measure) };
    case "table":
      return { columns: Or(e).map((o) => o.member) };
  }
}
function Sn(e) {
  const t = Qd(e);
  return t === void 0 ? Wd : t <= 2 ? "hour" : t <= 90 ? "day" : t <= 730 ? "month" : "year";
}
function Qd(e) {
  if (!Array.isArray(e) || e.length !== 2) return;
  const t = Date.parse(e[0]), n = Date.parse(e[1]);
  if (!(Number.isNaN(t) || Number.isNaN(n)))
    return Math.abs(n - t) / 864e5;
}
function Gt(e, t) {
  const n = e ?? [];
  return n.includes(t) ? n : [...n, t];
}
function at(e, t) {
  return (e ?? []).filter((n) => n !== t);
}
function Rt(e, t) {
  return { ...e, dimensions: Gt(e.dimensions, t) };
}
function Pe(e, t) {
  const n = at(e.dimensions, t);
  return { ...e, dimensions: n.length ? n : void 0 };
}
function Ve(e, t) {
  return { ...e, timeDimensions: t ? [t] : void 0 };
}
function ot(e, t, n) {
  if (e)
    return { category: { member: e }, series: Yo(t, n) };
}
function un(e) {
  var n;
  const t = (n = e.mapping) == null ? void 0 : n.series;
  return t && t.mode === "pivot" ? t.meta : void 0;
}
function mn(e, t, n, a) {
  if (!e || t.length === 0) return;
  const r = {};
  for (const c of t) {
    const l = a == null ? void 0 : a[c];
    l && Object.keys(l).length > 0 && (r[c] = l);
  }
  const o = Object.keys(r).length > 0, s = t.length > 1 ? { mode: "pivot", value: t[0], values: t, pivot: n, ...o ? { meta: r } : {} } : { mode: "pivot", value: t[0], pivot: n, ...o ? { meta: r } : {} };
  return { category: { member: e }, series: s };
}
function ya(e, t, n, a, r) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return Xd(e, n, a, r);
    case "combo":
      return tv(e, n, a, r);
    case "pie":
      return av(e, n, a, r);
    case "scatter":
      return iv(e, n, a);
    case "kpi":
      return sv(e, a);
    case "table":
      return uv(e, a, r);
  }
}
function Jd(e, t, n, a) {
  switch (t) {
    case "bar":
    case "line":
    case "area":
      return ev(e, n, a);
    case "combo":
      return rv(e, n, a);
    case "pie":
      return ov(e, n, a);
    case "scatter":
      return cv(e, n, a);
    case "kpi":
      return lv(e, a);
    case "table":
      return mv(e, a);
  }
}
function Xd(e, t, n, a) {
  const { query: r, chart: o } = e, s = Ut(e), c = s.color[0], l = Ne(o), u = _t(o);
  if (t === "y") {
    const m = s.y, f = Gt(m, n);
    return c ? {
      ...e,
      query: { ...r, measures: f },
      chart: { ...o, mapping: mn(l, f, c, un(o)) }
    } : {
      ...e,
      query: { ...r, measures: f },
      chart: { ...o, mapping: ot(l, f, u) }
    };
  }
  if (t === "x")
    return Zd(e, n, a, c);
  if (t === "color") {
    const m = s.y;
    if (m.length === 0) return e;
    const f = Rt({ ...r, measures: m }, n);
    return {
      ...e,
      query: f,
      chart: { ...o, mapping: mn(l, m, n, un(o)) }
    };
  }
  return e;
}
function Zd(e, t, n, a) {
  const { query: r, chart: o } = e, s = Ne(o), c = Ut(e).y, l = _t(o);
  let u = r;
  const m = Xe(r);
  if (m && s === m.dimension ? u = Ve(u, void 0) : s && (u = Pe(u, s)), n === "time") {
    const h = (m == null ? void 0 : m.granularity) ?? Sn(m == null ? void 0 : m.dateRange);
    u = Ve(u, {
      dimension: t,
      granularity: h,
      dateRange: m == null ? void 0 : m.dateRange
    });
  } else
    u = Rt(u, t);
  const f = a ? mn(t, c, a, un(o)) : ot(t, c, l);
  return { ...e, query: u, chart: { ...o, mapping: f } };
}
function ev(e, t, n) {
  const { query: a, chart: r } = e, o = Ut(e), s = Ne(r), c = o.color[0], l = _t(r);
  if (t === "y") {
    const u = at(o.y, n);
    if (c && u.length >= 1)
      return {
        ...e,
        query: { ...a, measures: u },
        chart: { ...r, mapping: mn(s, u, c, un(r)) }
      };
    const m = c ? Pe({ ...a, measures: u }, c) : { ...a, measures: u };
    return { ...e, query: m, chart: { ...r, mapping: ot(s, u, l) } };
  }
  if (t === "x") {
    let u = a;
    const m = Xe(a);
    return m && m.dimension === n ? u = Ve(u, void 0) : u = Pe(u, n), { ...e, query: u, chart: { ...r, mapping: void 0 } };
  }
  if (t === "color") {
    const u = Pe(a, n);
    return {
      ...e,
      query: u,
      chart: { ...r, mapping: ot(s, o.y, l) }
    };
  }
  return e;
}
const xa = ["line", "bar"];
function tv(e, t, n, a) {
  const { query: r, chart: o } = e, s = Se(e);
  if (t === "x") {
    let c = r;
    const l = Ne(o), u = Xe(r);
    if (u && l === u.dimension ? c = Ve(c, void 0) : l && (c = Pe(c, l)), a === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? Sn(u == null ? void 0 : u.dateRange);
      c = Ve(c, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      c = Rt(c, n);
    return { ...e, query: c, chart: { ...o, mapping: { category: { member: n }, series: nv(e) } } };
  }
  if (t === "y") {
    const c = Cn(e);
    if (c.some((m) => m.member === n)) return e;
    const l = xa[c.length % xa.length], u = [...c, { member: n, render: l }];
    return {
      ...e,
      query: { ...r, measures: Gt(r.measures, n) },
      // Keep mapping.series in lockstep with familyOptions.series — normalize() drives
      // categories + per-series data off mapping, so a stale mapping makes the renderer
      // fall back to raw rows (unbucketed time → collapsed x → stuck tooltip).
      chart: { ...o, familyOptions: { ...s, series: u }, mapping: Jo(o, u) }
    };
  }
  return e;
}
function Jo(e, t) {
  const n = Ne(e);
  return n ? { category: { member: n }, series: { mode: "measures", members: t.map((a) => a.member) } } : e.mapping;
}
function nv(e) {
  return { mode: "measures", members: Cn(e).map((t) => t.member) };
}
function rv(e, t, n) {
  const { query: a, chart: r } = e, o = Se(e);
  if (t === "x") {
    let s = a;
    const c = Xe(a);
    return c && c.dimension === n ? s = Ve(s, void 0) : s = Pe(s, n), { ...e, query: s, chart: { ...r, mapping: void 0 } };
  }
  if (t === "y") {
    const s = Cn(e).filter((l) => l.member !== n), c = at(a.measures, n);
    return {
      ...e,
      query: { ...a, measures: c },
      chart: { ...r, familyOptions: { ...o, series: s }, mapping: Jo(r, s) }
    };
  }
  return e;
}
function av(e, t, n, a) {
  const { query: r, chart: o } = e, s = _t(o);
  if (t === "slices") {
    let c = r;
    const l = Ne(o), u = Xe(r);
    if (u && l === u.dimension ? c = Ve(c, void 0) : l && (c = Pe(c, l)), a === "time") {
      const m = (u == null ? void 0 : u.granularity) ?? Sn(u == null ? void 0 : u.dateRange);
      c = Ve(c, { dimension: n, granularity: m, dateRange: u == null ? void 0 : u.dateRange });
    } else
      c = Rt(c, n);
    return {
      ...e,
      query: c,
      chart: { ...o, mapping: ot(n, bt(o), s) }
    };
  }
  if (t === "size") {
    const c = [n];
    return {
      ...e,
      query: { ...r, measures: c },
      chart: { ...o, mapping: ot(Ne(o), c, s) }
    };
  }
  return e;
}
function ov(e, t, n) {
  const { query: a, chart: r } = e, o = _t(r);
  if (t === "slices") {
    let s = a;
    const c = Xe(a);
    return c && c.dimension === n ? s = Ve(s, void 0) : s = Pe(s, n), { ...e, query: s, chart: { ...r, mapping: void 0 } };
  }
  return t === "size" ? {
    ...e,
    query: { ...a, measures: [] },
    chart: { ...r, mapping: ot(Ne(r), [], o) }
  } : e;
}
const Xo = {
  sx: "x",
  sy: "y",
  size: "size",
  color: "groupBy"
};
function iv(e, t, n) {
  const a = Xo[t];
  if (!a) return e;
  const { query: r, chart: o } = e, s = { ...Se(e) }, c = s[a];
  s[a] = n;
  let l = r;
  if (a === "groupBy")
    c && c !== n && (l = Pe(l, c)), l = Rt(l, n);
  else {
    const u = c ? at(r.measures, c) : r.measures;
    l = { ...r, measures: Gt(u, n) };
  }
  return { ...e, query: l, chart: { ...o, familyOptions: s } };
}
function cv(e, t, n) {
  const a = Xo[t];
  if (!a) return e;
  const { query: r, chart: o } = e, s = { ...Se(e) };
  delete s[a];
  let c = r;
  if (a === "groupBy") c = Pe(c, n);
  else {
    const l = at(r.measures, n);
    c = { ...r, measures: l.length ? l : [] };
  }
  return { ...e, query: c, chart: { ...o, familyOptions: s } };
}
function sv(e, t) {
  const { query: n, chart: a } = e, r = { ...Se(e), measure: t };
  return { ...e, query: { ...n, measures: [t] }, chart: { ...a, familyOptions: r } };
}
function lv(e, t) {
  const { query: n, chart: a } = e, r = { ...Se(e) };
  return r.measure === t && delete r.measure, { ...e, query: { ...n, measures: [] }, chart: { ...a, familyOptions: r } };
}
function uv(e, t, n) {
  const { query: a, chart: r } = e, o = Or(e);
  if (o.some((l) => l.member === t)) return e;
  let s = a;
  if (n === "number") s = { ...a, measures: Gt(a.measures, t) };
  else if (n === "time") {
    const l = Xe(a), u = (l == null ? void 0 : l.granularity) ?? Sn(l == null ? void 0 : l.dateRange), m = a.timeDimensions ?? [];
    m.some((f) => f.dimension === t) || (s = { ...a, timeDimensions: [...m, { dimension: t, granularity: u }] });
  } else s = Rt(a, t);
  const c = { ...Se(e), columns: [...o, { member: t }] };
  return { ...e, query: s, chart: { ...r, familyOptions: c } };
}
function mv(e, t) {
  var m, f, h;
  const { query: n, chart: a } = e, r = Or(e).filter((p) => p.member !== t);
  let o = n;
  const s = at(n.measures, t);
  s.length !== (((m = n.measures) == null ? void 0 : m.length) ?? 0) && (o = { ...o, measures: s.length ? s : void 0 });
  const c = at(n.dimensions, t);
  c.length !== (((f = n.dimensions) == null ? void 0 : f.length) ?? 0) && (o = { ...o, dimensions: c.length ? c : void 0 });
  const l = (n.timeDimensions ?? []).filter((p) => p.dimension !== t);
  l.length !== (((h = n.timeDimensions) == null ? void 0 : h.length) ?? 0) && (o = { ...o, timeDimensions: l.length ? l : void 0 });
  const u = { ...Se(e), columns: r };
  return { ...e, query: o, chart: { ...a, familyOptions: u } };
}
const fe = x.forwardRef(
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
fe.displayName = "Input";
function dn(e) {
  switch (e) {
    case "time":
      return /* @__PURE__ */ i(Ka, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    case "number":
      return /* @__PURE__ */ i(qa, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
    default:
      return /* @__PURE__ */ i(ur, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" });
  }
}
function Zo({
  cube: e,
  cubes: t,
  kind: n,
  value: a,
  onChange: r,
  placeholder: o = "Select member…",
  disabled: s,
  id: c,
  className: l
}) {
  const { meta: u, isLoading: m } = Je(), f = x.useMemo(() => {
    if (t) {
      const b = new Set(t);
      return tr(u, n).filter((g) => b.has(g.cube));
    }
    return tr(u, n, e);
  }, [u, n, e, t]), h = x.useMemo(() => dv(f), [f]), p = f.find((b) => b.name === a);
  return /* @__PURE__ */ v(Le, { value: a, onValueChange: r, disabled: s || m, children: [
    /* @__PURE__ */ i(Te, { id: c, className: l, children: /* @__PURE__ */ i(De, { placeholder: m ? "Loading…" : o, children: p ? /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
      dn(p.type),
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: p.label })
    ] }) : void 0 }) }),
    /* @__PURE__ */ i(ze, { children: h.map(([b, g]) => /* @__PURE__ */ v(Jn, { children: [
      h.length > 1 ? /* @__PURE__ */ i(Xn, { children: b }) : null,
      g.map((y) => /* @__PURE__ */ i(be, { value: y.name, children: /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
        dn(y.type),
        /* @__PURE__ */ i("span", { className: "cv:truncate", children: y.label })
      ] }) }, y.name))
    ] }, b)) })
  ] });
}
function dv(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = t.get(n.cube);
    a ? a.push(n) : t.set(n.cube, [n]);
  }
  return [...t.entries()];
}
function jt({
  options: e,
  value: t,
  onChange: n,
  fullWidth: a = !0,
  size: r = "default",
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
const vv = {
  number: { label: "Numbers", icon: /* @__PURE__ */ i(qa, { className: "cv:size-3" }), metaKind: "measure" },
  category: { label: "Categories", icon: /* @__PURE__ */ i(ur, { className: "cv:size-3" }), metaKind: "dimension" },
  time: { label: "Dates", icon: /* @__PURE__ */ i(Ka, { className: "cv:size-3" }), metaKind: "time" }
}, fv = ["number", "category", "time"];
function ei({
  well: e,
  placed: t,
  scope: n,
  blockReason: a,
  onSelect: r,
  align: o = "start",
  side: s = "bottom",
  children: c
}) {
  var I, q;
  const { meta: l, isLoading: u } = Je(), [m, f] = x.useState(!1), [h, p] = x.useState(""), [b, g] = x.useState(n.viewLocked ?? "tables"), [y, _] = x.useState({});
  x.useEffect(() => {
    m && g(n.viewLocked ?? "tables");
  }, [m, n.viewLocked]);
  const N = x.useMemo(() => new Set(t), [t]), k = h.trim().toLowerCase(), R = x.useMemo(() => {
    if (b !== "tables") {
      const O = n.views.find((G) => G.name === b) ?? Et(l, b);
      return O ? [{ cube: O, tag: "dataset" }] : [];
    }
    const T = [];
    n.sourceCube && T.push({ cube: n.sourceCube, tag: "source" });
    for (const O of n.relatedCubes) T.push({ cube: O, tag: "related" });
    return T;
  }, [b, n, l]), C = e.kinds.length > 1, w = (T) => fv.filter((O) => e.kinds.includes(O)).map((O) => {
    const G = vv[O], ne = tr(l, G.metaKind, T).filter((F) => !N.has(F.name)).filter((F) => k ? F.label.toLowerCase().includes(k) || F.name.toLowerCase().includes(k) : !0);
    return { kind: O, label: G.label, icon: G.icon, items: ne };
  }).filter((O) => O.items.length > 0), L = R.map((T) => ({ section: T, groups: w(T.cube.name) })).filter((T) => T.groups.length > 0), D = L.length > 0, j = (T, O) => {
    r(T, O), f(!1), p("");
  }, P = b === "tables" ? "All related tables" : ((I = n.views.find((T) => T.name === b)) == null ? void 0 : I.title) ?? ((q = Et(l, b)) == null ? void 0 : q.title) ?? b;
  return /* @__PURE__ */ v(_e, { open: m, onOpenChange: f, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: c }),
    /* @__PURE__ */ v(Ae, { align: o, side: s, className: "cv:w-80 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:pb-1.5", children: [
        /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2", children: [
          /* @__PURE__ */ i(Ei, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
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
        /* @__PURE__ */ i(hv, { browse: b, label: P, views: n.views, onBrowse: g })
      ] }),
      /* @__PURE__ */ i("div", { className: "cv:max-h-80 cv:overflow-y-auto", children: D ? L.map(({ section: T, groups: O }, G) => {
        const ne = O.reduce((U, Q) => U + Q.items.length, 0), F = T.tag === "related", Y = y[T.cube.name] ?? F, ee = k.length > 0 ? !0 : !Y;
        return /* @__PURE__ */ v("div", { children: [
          T.tag === "related" && G > 0 && L[G - 1].section.tag !== "related" ? /* @__PURE__ */ i("div", { className: "cv:px-1 cv:pb-1 cv:pt-2 cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: "Related tables" }) : null,
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => _((U) => ({ ...U, [T.cube.name]: !Y })),
              className: "cv:flex cv:w-full cv:items-center cv:gap-1.5 cv:rounded-sm cv:px-1 cv:py-1 cv:text-left cv:hover:bg-accent/50",
              children: [
                ee ? /* @__PURE__ */ i(Ge, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }) : /* @__PURE__ */ i(Bt, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i(Ba, { className: "cv:size-3 cv:shrink-0 cv:text-muted-foreground" }),
                /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-xs cv:font-medium", children: T.cube.title }),
                T.tag === "source" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-primary/10 cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-primary", children: "Main table" }) : T.tag === "dataset" ? /* @__PURE__ */ i("span", { className: "cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:font-medium cv:uppercase cv:text-muted-foreground", children: "dataset" }) : null,
                /* @__PURE__ */ i("span", { className: "cv:ml-auto cv:shrink-0 cv:pr-1 cv:text-[10px] cv:tabular-nums cv:text-muted-foreground/70", children: ne })
              ]
            }
          ),
          ee ? O.map((U) => /* @__PURE__ */ v("div", { className: "cv:pb-0.5 cv:pl-4", children: [
            C ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5 cv:px-2 cv:pb-0.5 cv:pt-1 cv:text-[9px] cv:uppercase cv:tracking-wide cv:text-muted-foreground/70", children: [
              U.icon,
              U.label
            ] }) : null,
            U.items.map((Q) => /* @__PURE__ */ i(pv, { option: Q, reason: a(Q), onPick: () => j(Q.name, U.kind) }, Q.name))
          ] }, U.kind)) : null
        ] }, T.cube.name);
      }) : /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-6 cv:text-center cv:text-xs cv:text-muted-foreground", children: u ? "Loading fields…" : "No fields match." }) })
    ] })
  ] });
}
function hv({ browse: e, label: t, views: n, onBrowse: a }) {
  const [r, o] = x.useState(!1), s = (c) => {
    a(c), o(!1);
  };
  return /* @__PURE__ */ v(_e, { open: r, onOpenChange: o, children: [
    /* @__PURE__ */ v(
      Re,
      {
        className: "cv:flex cv:h-8 cv:max-w-[9rem] cv:shrink-0 cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-2 cv:text-xs cv:hover:bg-accent",
        title: `Data source: ${t}`,
        children: [
          /* @__PURE__ */ i(Ha, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: "cv:truncate", children: t })
        ]
      }
    ),
    /* @__PURE__ */ v(Ae, { align: "end", className: "cv:w-60 cv:p-1", children: [
      /* @__PURE__ */ i(wa, { active: e === "tables", icon: /* @__PURE__ */ i(Ba, { className: "cv:size-3.5" }), onClick: () => s("tables"), children: "All related tables" }),
      n.length > 0 ? /* @__PURE__ */ v(ie, { children: [
        /* @__PURE__ */ i("div", { className: "cv:px-2 cv:pb-0.5 cv:pt-1.5 cv:text-[10px] cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Saved datasets" }),
        n.map((c) => /* @__PURE__ */ i(
          wa,
          {
            active: e === c.name,
            icon: /* @__PURE__ */ i(mr, { className: "cv:size-3.5" }),
            onClick: () => s(c.name),
            children: c.title
          },
          c.name
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
function pv({ option: e, reason: t, onPick: n }) {
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
const gv = ["today", "yesterday", "last 7 days", "last 30 days", "last 90 days", "this month", "this year"], zt = "yyyy-MM-dd";
function bv(e) {
  return Array.isArray(e) && typeof e[0] == "string" ? [e[0], e[1]] : ["", ""];
}
function ka(e) {
  if (!e) return;
  const t = Ja(e, zt, /* @__PURE__ */ new Date());
  return Number.isNaN(t.getTime()) ? void 0 : t;
}
function Lr({ value: e, onChange: t }) {
  const [n, a] = x.useState(!1), r = typeof e == "string", [o, s] = bv(e), c = ka(o), l = ka(s), u = c ? { from: c, to: l } : void 0, m = r ? e : c && l ? `${pe(c, "MMM d, yyyy")} – ${pe(l, "MMM d, yyyy")}` : c ? pe(c, "MMM d, yyyy") : "Any time";
  return /* @__PURE__ */ v(_e, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5 cv:font-normal"), children: [
      /* @__PURE__ */ i(Va, { className: "cv:size-3.5 cv:text-muted-foreground" }),
      /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", m === "Any time" && "cv:text-muted-foreground"), children: m })
    ] }) }),
    /* @__PURE__ */ v(Ae, { align: "start", className: "cv:flex cv:w-auto cv:gap-2 cv:p-2", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:w-32 cv:flex-col cv:gap-0.5 cv:border-r cv:pr-2", children: [
        gv.map((f) => /* @__PURE__ */ i(
          B,
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
          B,
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
        Mo,
        {
          mode: "range",
          selected: u,
          defaultMonth: c,
          onSelect: (f) => {
            f != null && f.from && f.to ? t([pe(f.from, zt), pe(f.to, zt)]) : f != null && f.from ? t([pe(f.from, zt), pe(f.from, zt)]) : t(void 0);
          }
        }
      )
    ] })
  ] });
}
function yv(e) {
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
function xv(e, t) {
  const n = new Set(yv(t));
  return e.filter((a) => n.has(a.type));
}
function wv(e) {
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
function kv(e, t, n) {
  const a = new Set(n.map((c) => c.name)), r = e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || t;
  let o = r, s = 2;
  for (; a.has(o); ) o = `${r}_${s++}`;
  return o;
}
function Nv(e, t, n) {
  const a = wv(e), r = { name: kv(t, e, n), type: a }, o = t.trim();
  return o && (r.label = o), a === "dateRange" ? r.default = "last 7 days" : a === "granularity" && (r.default = "day"), r;
}
const ti = x.createContext({});
function Cv({
  createVariable: e,
  children: t
}) {
  const n = x.useMemo(() => ({ createVariable: e }), [e]);
  return /* @__PURE__ */ i(ti.Provider, { value: n, children: t });
}
function Sv() {
  return x.useContext(ti);
}
function _v({ kind: e, value: t, onChange: n, className: a }) {
  const r = Sr(), o = (r == null ? void 0 : r.decls) ?? [], { createVariable: s } = Sv(), [c, l] = x.useState(!1), [u, m] = x.useState(!1), [f, h] = x.useState(""), p = x.useMemo(() => xv(o, e), [o, e]), b = p.find((_) => _.name === t), g = (_) => {
    n(_), l(!1), m(!1);
  }, y = () => {
    if (!s) return;
    const _ = Nv(e, f || "Variable", o);
    s(_), g(_.name), h("");
  };
  return /* @__PURE__ */ v(
    _e,
    {
      open: c,
      onOpenChange: (_) => {
        l(_), _ || m(!1);
      },
      children: [
        /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", className: S("cv:h-8 cv:w-full cv:justify-start cv:gap-1.5", a), children: [
          /* @__PURE__ */ i(Pi, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          /* @__PURE__ */ i("span", { className: S("cv:min-w-0 cv:flex-1 cv:truncate cv:text-left", !b && "cv:text-muted-foreground"), children: b ? b.label ?? b.name : t || "Choose variable…" })
        ] }) }),
        /* @__PURE__ */ v(Ae, { align: "start", className: "cv:w-60 cv:p-1", children: [
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
          s ? /* @__PURE__ */ i("div", { className: "cv:mt-1 cv:border-t cv:border-border cv:pt-1", children: u ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1 cv:p-1", children: [
            /* @__PURE__ */ i(
              fe,
              {
                autoFocus: !0,
                value: f,
                onChange: (_) => h(_.target.value),
                onKeyDown: (_) => {
                  _.key === "Enter" && y(), _.key === "Escape" && m(!1);
                },
                placeholder: "Variable label…",
                className: "cv:h-7 cv:text-sm"
              }
            ),
            /* @__PURE__ */ i(B, { size: "sm", className: "cv:h-7 cv:shrink-0", onClick: y, children: "Add" })
          ] }) : /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              onClick: () => m(!0),
              className: "cv:flex cv:w-full cv:items-center cv:gap-2 cv:rounded-sm cv:px-2 cv:py-1.5 cv:text-left cv:text-sm cv:text-muted-foreground cv:hover:bg-accent cv:hover:text-foreground",
              children: [
                /* @__PURE__ */ i(ht, { className: "cv:size-3.5" }),
                "New variable"
              ]
            }
          ) }) : null
        ] })
      ]
    }
  );
}
function yt({ kind: e, value: t, onChange: n, renderFixed: a }) {
  const r = Oe(t), [o, s] = x.useState(r ? "var" : "fixed");
  x.useEffect(() => {
    r && s("var");
  }, [r]);
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
      _v,
      {
        kind: e,
        value: Oe(t) ? t.var : void 0,
        onChange: (l) => n({ var: l })
      }
    ) : a(Oe(t) ? void 0 : t, (l) => n(l))
  ] });
}
const Rv = {
  id: "filter",
  label: "Field",
  cardinality: "one",
  kinds: ["number", "category", "time"]
};
function jn(e) {
  return "member" in e && "operator" in e;
}
function Av({
  cube: e,
  cubes: t,
  scope: n,
  value: a,
  onChange: r,
  disabled: o,
  className: s
}) {
  var P;
  const { meta: c } = Je(), l = ((P = Sr()) == null ? void 0 : P.decls) ?? [], [u, m] = x.useState(null), [f, h] = x.useState(null), p = a ?? [], b = p.length === 1 && !jn(p[0]) && "or" in p[0] && Array.isArray(p[0].or) && p[0].or.every(jn) ? p[0] : void 0, g = b ? "any" : "all", y = [], _ = [];
  b || p.forEach((I) => jn(I) ? y.push(I) : _.push(I));
  const N = b ? b.or : y, k = _.length === 0 && (N.length >= 2 || g === "any"), R = (I) => g === "any" ? I.length ? [{ or: I }] : [] : [...I, ..._], C = (I) => {
    const q = I.filter((O) => O.member.length > 0), T = R(q);
    r(T.length > 0 ? T : void 0);
  }, w = (I) => {
    const q = I === "any" ? N.length ? [{ or: N }] : [] : [...N];
    r(q.length > 0 ? q : void 0);
  }, L = (I, q) => C(N.map((T, O) => O === I ? { ...T, ...q } : T)), D = (I) => C(N.filter((q, T) => T !== I)), j = (I) => {
    const T = { ...f ?? { member: "", operator: "equals", values: [] }, ...I };
    T.member ? (h(null), m(N.length), C([...N, T])) : h(T);
  };
  return /* @__PURE__ */ v("div", { "data-slot": "filter-builder", className: S("cv:flex cv:flex-col cv:gap-2", s), children: [
    N.length === 0 && !f ? /* @__PURE__ */ i("p", { className: "cv:px-1 cv:py-1 cv:text-xs cv:text-muted-foreground", children: "No filters — the chart shows all rows." }) : null,
    k ? /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-2 cv:px-1 cv:text-xs cv:text-muted-foreground", children: [
      /* @__PURE__ */ i("span", { children: "Match" }),
      /* @__PURE__ */ i(
        jt,
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
    N.map((I, q) => {
      const T = Fe(c, I.member);
      return u === q ? /* @__PURE__ */ i(
        Na,
        {
          leaf: I,
          member: T,
          cube: e,
          cubes: t,
          scope: n,
          disabled: o,
          onChange: (O) => L(q, O),
          onDone: () => m(null),
          onRemove: () => D(q)
        },
        q
      ) : /* @__PURE__ */ i(
        Mv,
        {
          text: Ov(I, T == null ? void 0 : T.label, l),
          disabled: o,
          onEdit: () => m(q),
          onRemove: () => D(q)
        },
        q
      );
    }),
    f ? /* @__PURE__ */ i(
      Na,
      {
        leaf: f,
        member: Fe(c, f.member),
        cube: e,
        cubes: t,
        scope: n,
        disabled: o,
        onChange: j,
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
          /* @__PURE__ */ i(ht, { className: "cv:size-4" }),
          "Add filter"
        ]
      }
    )
  ] });
}
function Mv({
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
      B,
      {
        variant: "ghost",
        size: "icon",
        className: "cv:size-8 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
        disabled: t,
        onClick: a,
        "aria-label": "Remove filter",
        children: /* @__PURE__ */ i(xt, { className: "cv:size-4" })
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
  onChange: s,
  onDone: c,
  onRemove: l
}) {
  const u = Hd(t == null ? void 0 : t.type), m = u.includes(e.operator) ? e.operator : u[0], f = !nr.has(m);
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2.5 cv:rounded-lg cv:border cv:border-ring/50 cv:bg-muted/30 cv:p-3", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[10px] cv:font-semibold cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Filter" }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-0.5", children: [
        c && e.member ? /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", className: "cv:h-7 cv:gap-1 cv:px-2 cv:text-xs", onClick: c, children: [
          /* @__PURE__ */ i(je, { className: "cv:size-3.5" }),
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
            children: /* @__PURE__ */ i(xt, { className: "cv:size-3.5" })
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
          ei,
          {
            well: Rv,
            placed: [],
            scope: r,
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
                    dn(t.type),
                    /* @__PURE__ */ i("span", { className: "cv:truncate", children: t.label })
                  ] }) : /* @__PURE__ */ i("span", { className: "cv:text-muted-foreground", children: "Choose a field…" }),
                  /* @__PURE__ */ i(Ge, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" })
                ]
              }
            )
          }
        )
      ) : /* @__PURE__ */ i(
        Zo,
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
    /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Condition" }),
      /* @__PURE__ */ v(
        Le,
        {
          value: m,
          onValueChange: (h) => s({
            operator: h,
            values: nr.has(h) ? [] : e.values
          }),
          disabled: o,
          children: [
            /* @__PURE__ */ i(Te, { className: "cv:w-full", children: /* @__PURE__ */ i(De, {}) }),
            /* @__PURE__ */ i(ze, { children: u.map((h) => /* @__PURE__ */ i(be, { value: h, children: Uo[h] }, h)) })
          ]
        }
      )
    ] }),
    f ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
      /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Value" }),
      /* @__PURE__ */ i(
        Lv,
        {
          values: e.values,
          memberType: t == null ? void 0 : t.type,
          onChange: (h) => s({ values: h })
        }
      )
    ] }) : null
  ] });
}
function Ov(e, t, n) {
  const a = t ?? e.member;
  if (!a) return "New filter";
  const r = Uo[e.operator] ?? e.operator;
  if (nr.has(e.operator)) return `${a} ${r}`;
  const o = (e.values ?? []).map((s) => {
    if (Oe(s)) {
      const c = n.find((l) => l.name === s.var);
      return `{${((c == null ? void 0 : c.label) ?? s.var).replace(/[{}]/g, "")}}`;
    }
    return String(s);
  });
  return o.length > 0 ? `${a} ${r} ${o.join(", ")}` : `${a} ${r} …`;
}
function Lv({ values: e, memberType: t, onChange: n }) {
  const a = e ?? [], r = a.length === 1 && Oe(a[0]);
  if (t === "time") {
    const c = r ? a[0] : Dv(a);
    return /* @__PURE__ */ i(
      yt,
      {
        kind: "dateRange",
        value: c,
        onChange: (l) => n(l === void 0 ? [] : Oe(l) ? [l] : Tv(l)),
        renderFixed: (l, u) => /* @__PURE__ */ i(Lr, { value: l, onChange: u })
      }
    );
  }
  const o = t === "number" ? "number" : t === "boolean" ? "boolean" : "string", s = r ? a[0] : a.filter((c) => !Oe(c));
  return /* @__PURE__ */ i(
    yt,
    {
      kind: o,
      value: s,
      onChange: (c) => n(c === void 0 ? [] : Oe(c) ? [c] : c),
      renderFixed: (c, l) => /* @__PURE__ */ i(
        fe,
        {
          value: (c ?? []).map(String).join(", "),
          onChange: (u) => l(zv(u.target.value)),
          placeholder: "value, value…",
          className: "cv:h-8"
        }
      )
    }
  );
}
function Dv(e) {
  const t = e.filter((n) => !Oe(n)).map(String);
  if (t.length >= 2) return [t[0], t[1]];
  if (t.length === 1) return t[0];
}
function Tv(e) {
  return typeof e == "string" ? [e] : [e[0], e[1]];
}
function zv(e) {
  return e.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
}
function Fv({ spec: e, update: t, cube: n, scopeCubes: a, scope: r }) {
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
          /* @__PURE__ */ i(Ii, { className: "cv:size-4" }),
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
      /* @__PURE__ */ i($v, { spec: e, update: t, scopeCubes: a }),
      /* @__PURE__ */ i(Av, { cube: n, cubes: a, scope: r, value: o.filters, onChange: c })
    ] })
  ] });
}
function $v({
  spec: e,
  update: t,
  scopeCubes: n
}) {
  const { meta: a } = Je(), r = Bd(a, n);
  if (r.length === 0) return null;
  const o = new Set(e.query.segments ?? []), s = (c) => {
    const l = new Set(o);
    l.has(c) ? l.delete(c) : l.add(c);
    const u = [...l];
    t({ ...e, query: { ...e.query, segments: u.length ? u : void 0 } });
  };
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-b cv:border-border cv:pb-2", children: [
    /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Segments" }),
    /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: r.map((c) => /* @__PURE__ */ i(
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
function Ev({ currentName: e, hasFields: t, onSelect: n }) {
  var g;
  const { meta: a } = Je(), r = x.useMemo(() => Nn(a), [a]), o = r.filter((y) => y.type === "view"), s = r.filter((y) => y.type === "cube"), c = r.find((y) => y.name === e), [l, u] = x.useState(!1), [m, f] = x.useState(null), h = (y) => {
    if (y === e) {
      u(!1);
      return;
    }
    t ? f(y) : (n(y), u(!1));
  }, p = () => {
    m && n(m), f(null), u(!1);
  }, b = m ? ((g = r.find((y) => y.name === m)) == null ? void 0 : g.title) ?? m : "";
  return /* @__PURE__ */ v(
    _e,
    {
      open: l,
      onOpenChange: (y) => {
        u(y), y || f(null);
      },
      children: [
        /* @__PURE__ */ v(
          Re,
          {
            className: "cv:flex cv:h-8 cv:max-w-[12rem] cv:items-center cv:gap-1.5 cv:rounded-md cv:border cv:border-border cv:bg-background/90 cv:px-2.5 cv:text-xs cv:font-medium cv:shadow-sm cv:backdrop-blur cv:transition-colors cv:hover:bg-accent",
            title: "Data source",
            "aria-label": "Data source",
            children: [
              /* @__PURE__ */ i(Ha, { className: "cv:size-3.5 cv:shrink-0 cv:text-muted-foreground" }),
              /* @__PURE__ */ i("span", { className: S("cv:truncate", !c && "cv:text-muted-foreground"), children: c ? c.title : "Choose source" })
            ]
          }
        ),
        /* @__PURE__ */ i(Ae, { align: "start", className: "cv:w-64 cv:p-1", children: m ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2 cv:p-2", children: [
          /* @__PURE__ */ v("p", { className: "cv:text-sm", children: [
            "Switch to ",
            /* @__PURE__ */ i("span", { className: "cv:font-medium", children: b }),
            "?"
          ] }),
          /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "This clears the chart's current fields." }),
          /* @__PURE__ */ v("div", { className: "cv:flex cv:justify-end cv:gap-1.5", children: [
            /* @__PURE__ */ i(B, { variant: "ghost", size: "sm", className: "cv:h-7", onClick: () => f(null), children: "Cancel" }),
            /* @__PURE__ */ i(B, { size: "sm", className: "cv:h-7", onClick: p, children: "Switch" })
          ] })
        ] }) : /* @__PURE__ */ v("div", { className: "cv:max-h-[60vh] cv:overflow-y-auto", children: [
          o.length > 0 ? /* @__PURE__ */ v(ie, { children: [
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
          s.map((y) => /* @__PURE__ */ i(
            Ca,
            {
              icon: /* @__PURE__ */ i(Wa, { className: "cv:size-3.5" }),
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
        a ? /* @__PURE__ */ i("span", { className: "cv:shrink-0 cv:text-[10px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: a }) : null,
        /* @__PURE__ */ i(
          "input",
          {
            value: o.label ?? "",
            placeholder: r ?? "Axis title",
            disabled: s,
            onChange: (l) => Sa(e, t, n, { label: l.target.value || void 0 }),
            title: `Axis title${r ? ` — defaults to “${r}”` : ""} (leave blank for the default)`,
            className: "cv:h-6 cv:min-w-0 cv:flex-1 cv:rounded cv:border cv:border-input cv:bg-background cv:px-1.5 cv:text-xs cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ i(
          Iv,
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
function Pv({
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
          n ? /* @__PURE__ */ i(Ua, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(Ga, { className: "cv:size-3.5" }),
          n ? "Hidden" : "Shown"
        ]
      }
    )
  ] });
}
function Iv({
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
      children: e ? /* @__PURE__ */ i(Ua, { className: "cv:size-3.5" }) : /* @__PURE__ */ i(Ga, { className: "cv:size-3.5" })
    }
  );
}
const ni = x.forwardRef(
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
ni.displayName = "Label";
function de({
  label: e,
  hint: t,
  error: n,
  htmlFor: a,
  action: r,
  className: o,
  children: s
}) {
  return /* @__PURE__ */ v("div", { "data-slot": "field-row", className: S("cv:flex cv:flex-col cv:gap-1.5 cv:py-1.5", o), children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i(ni, { htmlFor: a, className: "cv:text-muted-foreground", children: e }),
      r ? /* @__PURE__ */ i("div", { className: "cv:flex cv:shrink-0 cv:items-center", children: r }) : null
    ] }),
    s,
    n ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-destructive", children: n }) : t ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
  ] });
}
function ar({
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
function ge({
  label: e,
  hint: t,
  checked: n,
  onChange: a,
  disabled: r,
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
              r ? "cv:cursor-not-allowed cv:opacity-70" : "cv:cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ i("span", { className: "cv:text-sm cv:font-medium cv:leading-none", children: e }),
              t ? /* @__PURE__ */ i("span", { className: "cv:text-xs cv:text-muted-foreground", children: t }) : null
            ]
          }
        ),
        /* @__PURE__ */ i(ar, { id: s, checked: n, onChange: a, disabled: r })
      ]
    }
  );
}
function jv({ spec: e, update: t }) {
  var h, p;
  const { chart: n } = e, a = n.family, r = n.familyOptions ?? {}, o = (b) => t({ ...e, chart: { ...n, ...b } }), s = (b) => t({ ...e, chart: { ...n, familyOptions: { ...r, ...b } } }), c = ((p = (h = n.mapping) == null ? void 0 : h.series) == null ? void 0 : p.mode) === "pivot" ? "stacked" : "none", l = n.stackMode ?? (a === "area" ? c : ho[a].envelope.stackMode) ?? "none", m = /* @__PURE__ */ i(de, { label: "Stacked", children: /* @__PURE__ */ i(
    jt,
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
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Horizontal",
              checked: n.orientation === "horizontal",
              onChange: (y) => o({ orientation: y ? "horizontal" : "vertical" })
            }
          ),
          m
        ] });
      // Line shape + points are now per-measure (the field-pill popover), so a line
      // chart needs no type-level options at all.
      case "line":
        return null;
      case "area":
        return /* @__PURE__ */ v(ie, { children: [
          m,
          n.stackMode === void 0 ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:pt-1 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: ((g = (b = n.mapping) == null ? void 0 : b.series) == null ? void 0 : g.mode) === "pivot" ? "Color-split areas stack into a whole by default — set this to change it." : "Separate measures overlap by default; stacking adds them into one band." }) : null
        ] });
      case "pie":
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Donut",
              checked: typeof r.innerRadiusPct == "number" && r.innerRadiusPct > 0,
              onChange: (y) => s({ innerRadiusPct: y ? 55 : 0 })
            }
          ),
          /* @__PURE__ */ i(de, { label: "Slice labels", children: /* @__PURE__ */ i(
            jt,
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
              onChange: (y) => s({ showLabels: y })
            }
          ) }),
          /* @__PURE__ */ i(Kv, { label: "Max slices", children: /* @__PURE__ */ i(
            fe,
            {
              type: "number",
              min: 1,
              className: "cv:h-8",
              value: r.maxSlices ?? "",
              placeholder: "8",
              onChange: (y) => {
                const _ = parseInt(y.target.value, 10);
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
        return /* @__PURE__ */ v(ie, { children: [
          /* @__PURE__ */ i(
            ge,
            {
              label: "Compact rows",
              checked: r.rowHeight === "compact",
              onChange: (y) => s({ rowHeight: y ? "compact" : "default" })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Sortable columns",
              checked: r.sortable !== !1,
              onChange: (y) => s({ sortable: y })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Sticky header",
              checked: r.stickyHeader !== !1,
              onChange: (y) => s({ stickyHeader: y })
            }
          ),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Row numbers",
              checked: r.showRowNumbers === !0,
              onChange: (y) => s({ showRowNumbers: y })
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
const Vv = /* @__PURE__ */ new Set([
  "bar",
  "area",
  "pie",
  "table"
]);
function qv(e) {
  return Vv.has(e);
}
function Kv({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:py-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
const Bv = [
  "bar",
  "line",
  "area",
  "pie",
  "scatter",
  "kpi",
  "table",
  "combo"
], ri = {
  bar: Ya,
  line: Wi,
  area: Hi,
  pie: Bi,
  scatter: Ki,
  kpi: qi,
  table: Vi,
  combo: ji
};
function ai(e, t) {
  return (n) => {
    n !== e.chart.family && t(Ud(e, n));
  };
}
function Hv({ spec: e, update: t, empty: n }) {
  const a = e.chart.family, r = ai(e, t);
  return n ? /* @__PURE__ */ i("div", { className: "cv:pointer-events-none cv:absolute cv:inset-0 cv:grid cv:place-items-center cv:p-4", children: /* @__PURE__ */ v("div", { className: "cv:pointer-events-auto cv:w-full cv:max-w-sm cv:rounded-xl cv:border cv:border-border cv:bg-background/95 cv:p-4 cv:shadow-lg cv:backdrop-blur", children: [
    /* @__PURE__ */ i("p", { className: "cv:pb-0.5 cv:text-center cv:text-sm cv:font-medium", children: "Choose a chart type" }),
    /* @__PURE__ */ i("p", { className: "cv:pb-3 cv:text-center cv:text-xs cv:text-muted-foreground", children: "Then add fields to the slots around the chart." }),
    /* @__PURE__ */ i(oi, { family: a, onPick: r })
  ] }) }) : null;
}
function Wv({ spec: e, update: t }) {
  const n = e.chart.family, a = ai(e, t), r = ri[n];
  return /* @__PURE__ */ v(_e, { children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        className: "cv:flex cv:items-center cv:gap-1.5 cv:rounded-full cv:border cv:border-border cv:bg-background cv:px-3 cv:py-1 cv:text-xs cv:font-medium cv:shadow-sm cv:transition-colors cv:hover:bg-accent",
        title: "Change chart type",
        children: [
          /* @__PURE__ */ i(r, { className: "cv:size-3.5 cv:text-muted-foreground" }),
          Qo[n],
          /* @__PURE__ */ i(Ge, { className: "cv:size-3 cv:text-muted-foreground" })
        ]
      }
    ) }),
    /* @__PURE__ */ v(Ae, { align: "center", className: "cv:flex cv:max-h-[70vh] cv:w-72 cv:flex-col cv:gap-2.5 cv:overflow-y-auto cv:p-3", children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Chart type" }),
        /* @__PURE__ */ i(oi, { family: n, onPick: a })
      ] }),
      qv(n) ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5 cv:border-t cv:border-border cv:pt-2.5", children: [
        /* @__PURE__ */ i("p", { className: "cv:text-[11px] cv:font-medium cv:uppercase cv:tracking-wide cv:text-muted-foreground", children: "Options" }),
        /* @__PURE__ */ i(jv, { spec: e, update: t })
      ] }) : null
    ] })
  ] });
}
function oi({ family: e, onPick: t }) {
  return /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-4 cv:gap-1.5", children: Bv.map((n) => {
    const a = ri[n], r = n === e;
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
          Qo[n]
        ]
      },
      n
    );
  }) });
}
function Uv(e) {
  return e ? Array.isArray(e) ? e : Object.entries(e) : [];
}
function Gv(e, t, n, a, r) {
  var Tr, zr, Fr, $r, Er, Pr, Ir, jr, Vr, qr, Kr, Br, Hr, Wr;
  const { chart: o, query: s } = e, c = o.family, l = n.kinds.length === 1 ? n.kinds[0] : Yv(r), u = o.familyOptions ?? {}, m = Array.isArray(u.series) ? u.series : [], f = Array.isArray(u.columns) ? u.columns : [], h = _t(o), p = h[a], b = c === "combo" && n.id === "y", g = c === "table" && n.id === "columns", y = c === "bar" || c === "line" || c === "area", _ = ((zr = (Tr = o.mapping) == null ? void 0 : Tr.series) == null ? void 0 : zr.mode) === "measures", N = y && n.id === "y", k = N && _, R = b ? (Fr = m.find((E) => E.member === a)) == null ? void 0 : Fr.label : g ? ($r = f.find((E) => E.member === a)) == null ? void 0 : $r.label : k ? p == null ? void 0 : p.label : void 0, C = b ? (Er = m.find((E) => E.member === a)) == null ? void 0 : Er.colorToken : k ? p == null ? void 0 : p.colorToken : void 0, w = Xe(s), L = n.kinds.includes("time") && (w == null ? void 0 : w.dimension) === a, D = L ? w == null ? void 0 : w.granularity : void 0, j = L ? w == null ? void 0 : w.dateRange : void 0, P = b ? ((Pr = m.find((E) => E.member === a)) == null ? void 0 : Pr.render) ?? "line" : void 0, I = c === "line" && n.id === "y", q = c === "bar" && n.id === "y" && o.orientation !== "horizontal", T = ((jr = (Ir = o.mapping) == null ? void 0 : Ir.series) == null ? void 0 : jr.mode) === "pivot", O = ((qr = (Vr = o.mapping) == null ? void 0 : Vr.series) == null ? void 0 : qr.mode) === "pivot" ? o.mapping.series.meta : void 0, G = (I || q) && (_ || T) || b, ne = G ? (b ? (Kr = m.find((E) => E.member === a)) == null ? void 0 : Kr.axis : _ ? p == null ? void 0 : p.axis : (Br = O == null ? void 0 : O[a]) == null ? void 0 : Br.axis) ?? "left" : void 0, ee = (c === "line" || c === "area") && n.id === "y" && _ || b && (P === "line" || P === "area"), U = b ? m.find((E) => E.member === a) : void 0, Q = ee ? b ? U == null ? void 0 : U.curve : p == null ? void 0 : p.curve : void 0, me = ee ? b ? U == null ? void 0 : U.dots : p == null ? void 0 : p.dots : void 0, J = (E) => {
    var Ur, Gr;
    if ((Ur = o.mapping) != null && Ur.series && o.mapping.series.mode !== "measures") return;
    const le = ((Gr = o.mapping) != null && Gr.series && o.mapping.series.mode === "measures" ? o.mapping.series.members : s.measures) ?? [], ue = { ...h };
    E && Object.keys(E).length > 0 ? ue[a] = E : delete ue[a];
    const Mt = Ne(o);
    Mt && t({
      ...e,
      chart: {
        ...o,
        mapping: { category: { member: Mt }, series: Yo(le, ue) }
      }
    });
  }, K = (E) => {
    const le = m.map((ue) => ue.member === a ? { ...ue, ...E } : ue);
    t({ ...e, chart: { ...o, familyOptions: { ...u, series: le } } });
  }, A = (E) => {
    const le = f.map((ue) => ue.member === a ? { ...ue, ...E } : ue);
    t({ ...e, chart: { ...o, familyOptions: { ...u, columns: le } } });
  }, Z = (E) => {
    b ? K({ label: E }) : g ? A({ label: E }) : k && J({ ...p, label: E });
  }, ve = (E) => {
    b ? K({ colorToken: E ?? void 0 }) : k && J({ ...p, colorToken: E ?? void 0 });
  }, H = (E) => {
    if (!w) return;
    const le = { ...w };
    for (const ue of Object.keys(E)) {
      const Mt = E[ue];
      Mt === void 0 ? delete le[ue] : le[ue] = Mt;
    }
    t({ ...e, query: { ...s, timeDimensions: [le] } });
  }, W = (E) => H({ granularity: E }), he = (E) => H({ dateRange: E }), Ze = (E) => K({ render: E }), qe = (E) => {
    var le, ue;
    b ? K({ axis: E }) : k ? J({ ...p, axis: E }) : ((ue = (le = o.mapping) == null ? void 0 : le.series) == null ? void 0 : ue.mode) === "pivot" && t(or(e, c, a, E));
  }, et = (E) => {
    b ? K({ curve: E }) : k && J({ ...p, curve: E });
  }, tt = (E) => {
    b ? K({ dots: E }) : k && J({ ...p, dots: E });
  }, M = () => t(Jd(e, c, n.id, a)), z = (n.id === "x" || n.id === "slices") && (l === "category" || l === "time"), $ = (Hr = o.mapping) == null ? void 0 : Hr.series, V = ($ && $.mode === "pivot" ? $.value : bt(o)[0]) ?? ((Wr = s.measures) == null ? void 0 : Wr[0]), X = z ? l === "time" ? [
    { key: "none", label: "Default" },
    { key: "time-asc", label: "Oldest first" },
    { key: "time-desc", label: "Newest first" },
    ...V ? [
      { key: "value-desc", label: "Highest first" },
      { key: "value-asc", label: "Lowest first" }
    ] : []
  ] : [
    { key: "none", label: "Default" },
    ...V ? [
      { key: "value-desc", label: "Biggest first" },
      { key: "value-asc", label: "Smallest first" }
    ] : [],
    { key: "label-asc", label: "A → Z" },
    { key: "label-desc", label: "Z → A" }
  ] : [], ce = (() => {
    const E = Uv(s.order)[0];
    if (!E) return "none";
    const [le, ue] = E;
    return V && le === V ? ue === "desc" ? "value-desc" : "value-asc" : le === a ? l === "time" ? ue === "desc" ? "time-desc" : "time-asc" : ue === "asc" ? "label-asc" : "label-desc" : "none";
  })(), ae = (E) => {
    let le;
    switch (E) {
      case "none":
        le = void 0;
        break;
      case "value-desc":
        le = V ? [[V, "desc"]] : void 0;
        break;
      case "value-asc":
        le = V ? [[V, "asc"]] : void 0;
        break;
      case "label-asc":
      case "time-asc":
        le = [[a, "asc"]];
        break;
      case "label-desc":
      case "time-desc":
        le = [[a, "desc"]];
        break;
    }
    t({ ...e, query: { ...s, order: le } });
  }, se = typeof s.limit == "number" ? s.limit : void 0, At = (E) => t({ ...e, query: { ...s, limit: E && E > 0 ? E : void 0 } }), _n = (c === "bar" || c === "line" || c === "area") && L, mi = _n && u.comparePrevious === !0;
  return {
    kind: l,
    label: R,
    colorToken: C,
    granularity: D,
    dateRange: j,
    render: P,
    axis: ne,
    curve: Q,
    dots: me,
    canLineStyle: ee,
    canAxis: G,
    canRename: b || g || k,
    // A color dot is meaningful only when one rendered series ↔ this field: a
    // measures-mode cartesian Y measure, or a combo Y series. (Pivot Y, pie size,
    // scatter, etc. colour per-datum, so they show an icon, not a swatch.)
    canColor: N && _ || b,
    isTimeField: L,
    isComboY: b,
    isCategoryField: z,
    sortValue: ce,
    sortOptions: X,
    onSort: ae,
    limit: se,
    onLimit: At,
    canComparePrevious: _n,
    comparePrevious: mi,
    comparePreviousReady: _n && j !== void 0,
    onComparePrevious: (E) => t({ ...e, chart: { ...o, familyOptions: { ...u, comparePrevious: E || void 0 } } }),
    onRename: Z,
    onRecolor: ve,
    onGranularity: W,
    onDateRange: he,
    onRender: Ze,
    onAxis: qe,
    onCurve: et,
    onDots: tt,
    onRemove: M
  };
}
function or(e, t, n, a) {
  var s;
  const { chart: r } = e;
  if (t === "combo") {
    const c = r.familyOptions ?? {}, l = (Array.isArray(c.series) ? c.series : []).map(
      (u) => u.member === n ? { ...u, axis: a } : u
    );
    return { ...e, chart: { ...r, familyOptions: { ...c, series: l } } };
  }
  const o = (s = r.mapping) == null ? void 0 : s.series;
  if (o && (o.mode === "measures" || o.mode === "pivot")) {
    const c = { ...o.meta ?? {} };
    return c[n] = { ...c[n] ?? {}, axis: a }, { ...e, chart: { ...r, mapping: { ...r.mapping, series: { ...o, meta: c } } } };
  }
  return e;
}
function Yv(e) {
  return e ? e.memberType === "measure" ? "number" : e.type === "time" ? "time" : "category" : "category";
}
function Ra(e, t, n, a) {
  var f;
  const { chart: r, query: o } = e, s = r.family, c = (h) => {
    if (a < 0 || a >= h.length || n === a) return h;
    const p = h.slice(), [b] = p.splice(n, 1);
    return p.splice(a, 0, b), p;
  };
  if (s === "combo" && t.id === "y") {
    const h = r.familyOptions ?? {}, p = c(Array.isArray(h.series) ? h.series : []), b = c(o.measures ?? []);
    return {
      ...e,
      query: { ...o, measures: b },
      chart: { ...r, familyOptions: { ...h, series: p } }
    };
  }
  if (s === "table" && t.id === "columns") {
    const h = r.familyOptions ?? {}, p = c(Array.isArray(h.columns) ? h.columns : []);
    return { ...e, chart: { ...r, familyOptions: { ...h, columns: p } } };
  }
  const l = c(o.measures ?? []), u = (f = r.mapping) == null ? void 0 : f.series;
  let m = r.mapping;
  if (u && u.mode === "measures")
    m = { ...r.mapping, series: { ...u, members: l } };
  else if (u && u.mode === "pivot" && u.values && u.values.length > 1) {
    const h = c(u.values);
    m = { ...r.mapping, series: { ...u, value: h[0], values: h } };
  }
  return { ...e, query: { ...o, measures: l }, chart: { ...r, mapping: m } };
}
function Qv(e, t, n) {
  const a = Nn(e), r = a.filter((k) => k.type === "view"), o = Ut(t), s = Object.values(o).flat();
  let c;
  for (const k of s) {
    const R = Fe(e, k);
    if (R) {
      c = R;
      break;
    }
  }
  const l = !c && n ? Et(e, n) : void 0, u = c ? Et(e, c.cube) : l, m = (u == null ? void 0 : u.type) === "view" ? u.name : void 0, f = (c == null ? void 0 : c.connectedComponent) ?? (l == null ? void 0 : l.connectedComponent), h = t.query.measures ?? [], p = h.length ? Tt(h[0]) : void 0;
  if (m)
    return { viewLocked: m, relatedCubes: [], views: r, measureSource: p, scopeComponent: f };
  const b = p ?? (c == null ? void 0 : c.cube) ?? (l == null ? void 0 : l.name), g = b ? Et(e, b) : void 0, y = a.filter((k) => k.type === "cube" && k.connectedComponent !== void 0), N = (f === void 0 ? y : y.filter((k) => k.connectedComponent === f)).filter((k) => k.name !== b).sort((k, R) => k.title.localeCompare(R.title));
  return {
    sourceCube: (g == null ? void 0 : g.type) === "cube" ? g : void 0,
    relatedCubes: N,
    views: r,
    measureSource: p,
    scopeComponent: f
  };
}
const Jv = Ue.options;
function Xv({
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
        Jv.map((o) => {
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
const Zv = rt.options, ef = {
  second: "Second",
  minute: "Minute",
  hour: "Hour",
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  year: "Year"
};
function ii({
  value: e,
  onChange: t,
  options: n,
  placeholder: a = "Granularity…",
  disabled: r,
  id: o,
  className: s
}) {
  const c = n && n.length > 0 ? n : Zv;
  return /* @__PURE__ */ v(
    Le,
    {
      value: e,
      onValueChange: (l) => t(l),
      disabled: r,
      children: [
        /* @__PURE__ */ i(Te, { id: o, className: s, children: /* @__PURE__ */ i(De, { placeholder: a }) }),
        /* @__PURE__ */ i(ze, { children: c.map((l) => /* @__PURE__ */ i(be, { value: l, children: ef[l] }, l)) })
      ]
    }
  );
}
const Aa = { bar: "Bar", line: "Line", area: "Area" }, tf = [
  ["monotone", "Smooth"],
  ["linear", "Straight"],
  ["step", "Step"],
  ["natural", "Curved"]
];
function nf({
  spec: e,
  update: t,
  well: n,
  member: a,
  option: r,
  resolvedColor: o,
  reorder: s,
  className: c
}) {
  const l = Gv(e, t, n, a, r), u = (r == null ? void 0 : r.label) ?? a, m = l.label || u, f = l.canColor && o !== void 0, h = l.canRename || f || l.isTimeField || l.isCategoryField || l.isComboY && !!l.render || l.canAxis || l.canLineStyle || !!s, p = (g) => {
    const y = g.trim();
    l.onRename(y.length > 0 ? y : void 0);
  }, b = /* @__PURE__ */ v(ie, { children: [
    f ? /* @__PURE__ */ i(
      "span",
      {
        className: "cv:size-3 cv:shrink-0 cv:rounded-full cv:border cv:border-black/10",
        style: { backgroundColor: `var(--${o})` },
        "aria-hidden": !0
      }
    ) : r ? dn(r.type) : null,
    /* @__PURE__ */ i("span", { className: "cv:min-w-0 cv:flex-1 cv:truncate", children: m })
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
        h ? /* @__PURE__ */ v(_e, { children: [
          /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5 cv:text-left cv:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring cv:rounded-sm",
              title: `Edit ${m}`,
              children: b
            }
          ) }),
          /* @__PURE__ */ i(Ae, { align: "start", className: "cv:w-60 cv:p-3", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-3", children: [
            l.canRename ? /* @__PURE__ */ v("label", { className: "cv:flex cv:flex-col cv:gap-1", children: [
              /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Label" }),
              /* @__PURE__ */ i(
                fe,
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
              /* @__PURE__ */ i(Xv, { value: l.colorToken, onChange: l.onRecolor })
            ] }) : null,
            l.isTimeField ? /* @__PURE__ */ v(ie, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Date range" }),
                /* @__PURE__ */ i(
                  yt,
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
                  yt,
                  {
                    kind: "granularity",
                    value: l.granularity,
                    onChange: l.onGranularity,
                    renderFixed: (g, y) => /* @__PURE__ */ i(ii, { value: g, onChange: y, className: "cv:h-8 cv:w-full" })
                  }
                )
              ] }),
              l.canComparePrevious ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
                /* @__PURE__ */ v("label", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
                  /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Compare to previous period" }),
                  /* @__PURE__ */ i(
                    ar,
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
                  fe,
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
            l.canLineStyle ? /* @__PURE__ */ v(ie, { children: [
              /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
                /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: "Line shape" }),
                /* @__PURE__ */ i("div", { className: "cv:grid cv:grid-cols-2 cv:gap-1", children: tf.map(([g, y]) => /* @__PURE__ */ v(
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
                /* @__PURE__ */ i(ar, { checked: l.dots === !0, onChange: l.onDots, "aria-label": "Show points" })
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
                    /* @__PURE__ */ i(vn, { className: "cv:size-3.5" }),
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
                    /* @__PURE__ */ i(fn, { className: "cv:size-3.5" }),
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
                  /* @__PURE__ */ i(Yr, { className: "cv:size-3.5" }),
                  "Remove"
                ]
              }
            )
          ] }) })
        ] }) : /* @__PURE__ */ i("span", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-1.5", title: m, children: b }),
        /* @__PURE__ */ i(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "cv:size-6 cv:shrink-0 cv:text-muted-foreground cv:hover:text-destructive",
            onClick: l.onRemove,
            "aria-label": `Remove ${m}`,
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
  colorFor: s,
  scope: c,
  blockReason: l,
  onAdd: u,
  badge: m,
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
    ei,
    {
      well: n,
      placed: r,
      scope: c,
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
            /* @__PURE__ */ i(ht, { className: "cv:size-3.5" }),
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
          m ? /* @__PURE__ */ i("span", { className: "cv:truncate cv:rounded-sm cv:bg-muted cv:px-1 cv:py-px cv:text-[9px] cv:normal-case cv:text-muted-foreground", children: m }) : null,
          n.optional && a.length === 0 ? /* @__PURE__ */ i("span", { className: "cv:normal-case cv:text-muted-foreground/70", children: "(optional)" }) : null
        ] }),
        N ? /* @__PURE__ */ i("div", { className: "cv:pb-0.5", children: N }) : null,
        /* @__PURE__ */ v("div", { className: S("cv:flex cv:gap-1", w ? "cv:flex-col" : "cv:flex-row cv:flex-wrap cv:items-center"), children: [
          a.map((j, P) => /* @__PURE__ */ i(
            nf,
            {
              spec: e,
              update: t,
              well: n,
              member: j,
              option: o(j),
              resolvedColor: s(j),
              className: w ? "cv:w-full" : void 0,
              reorder: k && C > 1 && !p ? {
                canUp: P > 0,
                canDown: P < C - 1,
                onUp: () => t(Ra(e, n, P, P - 1)),
                onDown: () => t(Ra(e, n, P, P + 1))
              } : void 0
            },
            j
          )),
          R ? D : null
        ] }),
        g ? /* @__PURE__ */ i("p", { className: "cv:px-0.5 cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: g }) : null
      ]
    }
  );
}
function Vn({
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
            /* @__PURE__ */ i(Ge, { className: "cv:size-3.5" })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Ae, { align: "start", className: "cv:max-h-[72vh] cv:w-64 cv:overflow-y-auto cv:p-3", children: n })
  ] });
}
function Dr(e, t) {
  const { chart: n } = e, a = n.familyOptions ?? {};
  return { chart: n, fo: a, setFO: (o) => t({ ...e, chart: { ...n, familyOptions: { ...a, ...o } } }) };
}
function rf({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = Dr(e, t), r = Go(e), o = (u = e.query.timeDimensions) == null ? void 0 : u[0], s = n.display ?? "number", c = n.gauge, l = (m) => {
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
    /* @__PURE__ */ i(Pt, { label: "Time field", children: /* @__PURE__ */ i(
      Zo,
      {
        cube: r,
        kind: "time",
        value: o == null ? void 0 : o.dimension,
        onChange: (m) => l({ dimension: m }),
        placeholder: "All time",
        className: "cv:h-8"
      }
    ) }),
    o != null && o.dimension ? /* @__PURE__ */ i(Pt, { label: "Date range", children: /* @__PURE__ */ i(
      yt,
      {
        kind: "dateRange",
        value: o.dateRange,
        onChange: (m) => l({ dateRange: m }),
        renderFixed: (m, f) => /* @__PURE__ */ i(Lr, { value: m, onChange: f })
      }
    ) }) : null,
    /* @__PURE__ */ i(de, { label: "Display", children: /* @__PURE__ */ i(
      jt,
      {
        "aria-label": "Display",
        size: "sm",
        options: [
          { value: "number", label: "Number" },
          { value: "gauge", label: "Gauge" }
        ],
        value: s,
        onChange: (m) => a({ display: m })
      }
    ) }),
    s === "gauge" ? /* @__PURE__ */ i(Pt, { label: "Gauge max", children: /* @__PURE__ */ i(
      fe,
      {
        type: "number",
        className: "cv:h-8",
        value: (c == null ? void 0 : c.max) ?? "",
        placeholder: "Auto",
        onChange: (m) => {
          const f = parseFloat(m.target.value);
          a({ gauge: Number.isFinite(f) ? { ...c ?? {}, max: f } : void 0 });
        }
      }
    ) }) : null
  ] });
}
function af({ spec: e, update: t }) {
  var u;
  const { fo: n, setFO: a } = Dr(e, t), r = n.comparison, o = r !== void 0, s = x.useRef(void 0);
  r && (s.current = r);
  const c = (u = e.query.timeDimensions) == null ? void 0 : u[0], l = n.goodDirection ?? (r == null ? void 0 : r.goodDirection) ?? "up";
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ge,
      {
        label: "Show comparison",
        checked: o,
        onChange: (m) => a({
          comparison: m ? s.current ?? { mode: "previousPeriod", showAsPercent: !0 } : void 0
        })
      }
    ),
    o ? /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ i(de, { label: "Against", children: /* @__PURE__ */ i(
        jt,
        {
          "aria-label": "Compare against",
          size: "sm",
          options: [
            { value: "previousPeriod", label: "Prev period" },
            { value: "value", label: "Fixed value" }
          ],
          value: (r == null ? void 0 : r.mode) ?? "previousPeriod",
          onChange: (m) => a({ comparison: { ...r, mode: m } })
        }
      ) }),
      (r == null ? void 0 : r.mode) === "value" ? /* @__PURE__ */ i(Pt, { label: "Baseline value", children: /* @__PURE__ */ i(
        fe,
        {
          type: "number",
          className: "cv:h-8",
          value: (r == null ? void 0 : r.value) ?? "",
          onChange: (m) => {
            const f = parseFloat(m.target.value);
            a({ comparison: { ...r, value: Number.isFinite(f) ? f : void 0 } });
          }
        }
      ) }) : null,
      (r == null ? void 0 : r.mode) === "previousPeriod" && !(c != null && c.dateRange) ? /* @__PURE__ */ i("p", { className: "cv:text-[10px] cv:leading-tight cv:text-muted-foreground/80", children: "Set a date range on the value to compute the prior period." }) : null,
      /* @__PURE__ */ i(
        ge,
        {
          label: "Show as %",
          checked: ((r == null ? void 0 : r.showAsPercent) ?? !0) !== !1,
          onChange: (m) => a({ comparison: { ...r, showAsPercent: m } })
        }
      ),
      /* @__PURE__ */ i(
        ge,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the up/down colors).",
          checked: l !== "down",
          onChange: (m) => a({ goodDirection: m ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function of({ spec: e, update: t }) {
  const { fo: n, setFO: a } = Dr(e, t), r = n.sparkline, o = r !== void 0, s = n.comparison !== void 0, c = n.goodDirection ?? "up", l = r == null ? void 0 : r.granularity;
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: [
    /* @__PURE__ */ i(
      ge,
      {
        label: "Show sparkline",
        checked: o,
        onChange: (u) => a({ sparkline: u ? { granularity: l ?? "day" } : void 0 })
      }
    ),
    o ? /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ i(Pt, { label: "Trend granularity", children: /* @__PURE__ */ i(
        yt,
        {
          kind: "granularity",
          value: l,
          onChange: (u) => a({ sparkline: { ...r, granularity: u } }),
          renderFixed: (u, m) => /* @__PURE__ */ i(ii, { value: u, onChange: m, className: "cv:h-8 cv:w-full" })
        }
      ) }),
      s ? null : /* @__PURE__ */ i(
        ge,
        {
          label: "Higher is better",
          hint: "Off = a decrease is good (inverts the trend color).",
          checked: c !== "down",
          onChange: (u) => a({ goodDirection: u ? "up" : "down" })
        }
      )
    ] }) : null
  ] });
}
function Pt({ label: e, children: t }) {
  return /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1", children: [
    /* @__PURE__ */ i("span", { className: "cv:text-[11px] cv:font-medium cv:text-muted-foreground", children: e }),
    t
  ] });
}
const cf = {
  bar: { left: ["y"], bottom: ["x", "color"] },
  line: { left: ["y"], bottom: ["x", "color"] },
  area: { left: ["y"], bottom: ["x", "color"] },
  combo: { left: ["y"], bottom: ["x"] },
  pie: { left: ["size"], bottom: ["slices"] },
  scatter: { left: ["sy"], bottom: ["sx", "size", "color"] },
  kpi: { left: ["value"], bottom: [] },
  table: { left: ["columns"], bottom: [] }
}, sf = /* @__PURE__ */ new Set(["line", "combo"]);
function lf({
  spec: e,
  update: t,
  toolbar: n,
  children: a
}) {
  var Ze, qe, et, tt;
  const { meta: r } = Je(), { locale: o } = Qe(), { chart: s } = e, c = s.family, l = Go(e), u = x.useMemo(() => bn(o == null ? void 0 : o.units), [o == null ? void 0 : o.units]), m = x.useCallback(
    (M) => M && (o == null ? void 0 : o.unitSystem) === "imperial" && u[M] ? u[M].imperialUnit : M,
    [o == null ? void 0 : o.unitSystem, u]
  ), f = x.useMemo(() => Gd(c), [c]), h = x.useMemo(() => Ut(e), [e]), p = x.useMemo(() => new Map(f.map((M) => [M.id, M])), [f]), [b, g] = x.useState(void 0), y = x.useMemo(() => Qv(r, e, b), [r, e, b]), _ = x.useMemo(() => Object.values(h).flat(), [h]), N = x.useCallback(
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
  ), C = sf.has(c), w = x.useCallback(
    (M) => {
      var V, X, ce;
      if (c === "combo") {
        const ae = s.familyOptions ?? {}, se = (Array.isArray(ae.series) ? ae.series : []).find(
          (At) => At.member === M
        );
        return (se == null ? void 0 : se.axis) === "right" ? "right" : "left";
      }
      const z = (V = s.mapping) == null ? void 0 : V.series;
      return (z && (z.mode === "measures" || z.mode === "pivot") ? (ce = (X = z.meta) == null ? void 0 : X[M]) == null ? void 0 : ce.axis : void 0) === "right" ? "right" : "left";
    },
    [c, s.familyOptions, s.mapping]
  ), L = x.useMemo(() => {
    var ce, ae;
    const M = h.y ?? [], z = (se) => M.find((At) => w(At) === se), $ = z("left"), V = C ? z("right") : void 0, X = (se) => se ? Fe(r, se) : void 0;
    return {
      leftKey: $ ? Ot(X($)) : void 0,
      rightKey: V ? Ot(X(V)) : void 0,
      leftLabel: $ ? Oa(X($), m((ce = X($)) == null ? void 0 : ce.unit)) : void 0,
      rightLabel: V ? Oa(X(V), m((ae = X(V)) == null ? void 0 : ae.unit)) : void 0
    };
  }, [h, C, w, r, m]), D = x.useCallback(
    (M) => {
      const z = Ot(M), { leftKey: $, rightKey: V } = L;
      return $ === void 0 || z === $ ? "left" : V === void 0 || z === V ? "right" : "left";
    },
    [L]
  ), j = x.useCallback(
    (M, z) => {
      var $;
      if (z) {
        if (y.scopeComponent !== void 0 && z.connectedComponent !== y.scopeComponent)
          return "Clear the current fields to use a different dataset.";
        if (z.memberType === "measure" && y.measureSource && z.cube !== y.measureSource)
          return `Measures come from one table (${(($ = y.sourceCube) == null ? void 0 : $.title) ?? y.measureSource}). Remove them to switch.`;
        if (M === "y" && z.memberType === "measure") {
          const { leftKey: V, rightKey: X, leftLabel: ce, rightLabel: ae } = L, se = Ot(z);
          if (C) {
            if (V !== void 0 && X !== void 0 && se !== V && se !== X)
              return `Both axes show ${ce} & ${ae} — remove one to add a third unit.`;
          } else if (V !== void 0 && se !== V)
            return `This axis shows ${ce}; ${z.label ?? "this field"} is ${rr(z)}`;
        }
      }
    },
    [y, L, C]
  ), P = C ? [L.leftLabel, L.rightLabel].filter(Boolean).join(" · ") || void 0 : L.leftLabel, I = x.useMemo(() => {
    var z;
    const M = {};
    if (c === "bar" || c === "line" || c === "area") {
      const $ = (z = s.mapping) == null ? void 0 : z.series;
      if ($ && $.mode === "measures") {
        const V = $.members.map((ce) => {
          var ae, se;
          return { key: ce, colorToken: (se = (ae = $.meta) == null ? void 0 : ae[ce]) == null ? void 0 : se.colorToken };
        }), X = Hn(V, s.colors);
        $.members.forEach((ce, ae) => {
          M[ce] = X[ae];
        });
      }
    } else if (c === "combo") {
      const $ = s.familyOptions ?? {}, V = Array.isArray($.series) ? $.series : [], X = V.map((ae) => ({ key: ae.member, colorToken: ae.colorToken })), ce = Hn(X, s.colors);
      V.forEach((ae, se) => {
        M[ae.member] = ce[se];
      });
    }
    return M;
  }, [c, s.mapping, s.colors, s.familyOptions]), q = x.useCallback(
    (M, z, $) => {
      const V = Fe(r, z);
      if (j(M, V)) return;
      let X = ya(e, c, M, z, $);
      C && M === "y" && (X = or(X, c, z, D(V))), t(X);
    },
    [j, r, t, e, c, C, D]
  ), T = x.useCallback(
    (M, z) => {
      var X;
      if (!z) return;
      if (y.scopeComponent !== void 0 && z.connectedComponent !== y.scopeComponent)
        return "Clear the current fields to use a different dataset.";
      if (z.memberType === "measure" && y.measureSource && z.cube !== y.measureSource)
        return `Measures come from one table (${((X = y.sourceCube) == null ? void 0 : X.title) ?? y.measureSource}). Remove them to switch.`;
      const $ = M === "left" ? L.leftKey : L.rightKey, V = M === "left" ? L.leftLabel : L.rightLabel;
      if ($ !== void 0 && Ot(z) !== $)
        return `This axis shows ${V}; ${z.label ?? "this field"} is ${rr(z)}`;
    },
    [y, L]
  ), O = x.useCallback(
    (M, z, $) => {
      const V = Fe(r, z);
      T(M, V) || t(or(ya(e, c, "y", z, $), c, z, M));
    },
    [T, r, t, e, c]
  ), G = c === "bar" && s.orientation === "horizontal" ? { left: ["x"], bottom: ["y", "color"] } : cf[c], ne = G.left.map((M) => p.get(M)).filter(Boolean), F = G.bottom.map((M) => p.get(M)).filter(Boolean), Y = (Ze = h.color) == null ? void 0 : Ze[0], ee = ((qe = h.y) == null ? void 0 : qe.length) ?? 0, U = Y && ee > 1 ? `${ee} measures × ${((et = Fe(r, Y)) == null ? void 0 : et.label) ?? "this split"} — one series per measure per value.` : void 0, Q = c !== "kpi" && c !== "table", me = h.y ?? [], J = me.find((M) => w(M) !== "right"), K = C ? me.find((M) => w(M) === "right") : void 0, A = (M) => {
    var V, X, ce, ae;
    if (!M) return;
    const z = (V = s.mapping) == null ? void 0 : V.series;
    return (z && z.mode === "measures" ? (ce = (X = z.meta) == null ? void 0 : X[M]) == null ? void 0 : ce.label : void 0) ?? ((ae = Fe(r, M)) == null ? void 0 : ae.label);
  }, Z = (M) => {
    var $, V, X, ce;
    const z = (ae, se) => se ? /* @__PURE__ */ i(_a, { spec: e, update: t, axis: ae, title: "Title", auto: A(se) }) : null;
    switch (M) {
      case "y":
        return z("y", J);
      // single value axis (bar / area)
      case "x":
        return z("x", (V = ($ = s.mapping) == null ? void 0 : $.category) == null ? void 0 : V.member);
      case "sy":
        return z("y", (X = h.sy) == null ? void 0 : X[0]);
      // scatter Y axis
      case "sx":
        return z("x", (ce = h.sx) == null ? void 0 : ce[0]);
      // scatter X axis
      default:
        return null;
    }
  }, ve = (M, z) => /* @__PURE__ */ i(
    Ma,
    {
      spec: e,
      update: t,
      well: M,
      placed: h[M.id] ?? [],
      allPlaced: _,
      optionFor: ($) => Fe(r, $),
      colorFor: ($) => I[$],
      scope: y,
      blockReason: ($) => j(M.id, $),
      onAdd: ($, V) => q(M.id, $, V),
      badge: M.id === "y" ? P : void 0,
      orientation: z,
      note: M.id === "color" ? U : void 0,
      control: Z(M.id)
    },
    M.id
  ), H = p.get("y"), W = (M) => {
    if (!H) return null;
    const z = M === "left" ? J : K;
    return /* @__PURE__ */ i(
      Ma,
      {
        spec: e,
        update: t,
        well: H,
        label: M === "left" ? "Left axis" : "Right axis",
        placed: (h.y ?? []).filter(($) => w($) === M),
        allPlaced: _,
        optionFor: ($) => Fe(r, $),
        colorFor: ($) => I[$],
        scope: y,
        blockReason: ($) => T(M, $),
        onAdd: ($, V) => O(M, $, V),
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
  }, he = () => {
    const M = p.get("value"), z = (h.value ?? []).length > 0, $ = s.familyOptions ?? {};
    return /* @__PURE__ */ v(ie, { children: [
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
        M ? ve(M, "vertical") : null,
        z ? /* @__PURE__ */ i(
          Vn,
          {
            label: "Time, range & display",
            summary: $.display === "gauge" ? "Gauge" : "Number",
            children: /* @__PURE__ */ i(rf, { spec: e, update: t })
          }
        ) : null
      ] }),
      z ? /* @__PURE__ */ v(ie, { children: [
        /* @__PURE__ */ i(Vn, { label: "Comparison", summary: $.comparison !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(af, { spec: e, update: t }) }),
        /* @__PURE__ */ i(Vn, { label: "Sparkline", summary: $.sparkline !== void 0 ? "On" : "Off", children: /* @__PURE__ */ i(of, { spec: e, update: t }) })
      ] }) : null
    ] });
  };
  return /* @__PURE__ */ v("div", { "data-slot": "chart-edit-overlay", className: "cv:flex cv:h-full cv:w-full cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:justify-between cv:gap-2", children: [
      /* @__PURE__ */ i("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:items-center cv:gap-2", children: n }),
      R ? null : /* @__PURE__ */ i(Wv, { spec: e, update: t }),
      /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-1 cv:items-center cv:justify-end cv:gap-1.5", children: [
        /* @__PURE__ */ i(
          Ev,
          {
            currentName: y.viewLocked ?? ((tt = y.sourceCube) == null ? void 0 : tt.name),
            hasFields: _.length > 0,
            onSelect: N
          }
        ),
        /* @__PURE__ */ i(Fv, { spec: e, update: t, cube: l, scopeCubes: k, scope: y })
      ] })
    ] }),
    /* @__PURE__ */ v("div", { className: "cv:flex cv:min-h-0 cv:flex-1 cv:gap-2", children: [
      ne.length > 0 ? /* @__PURE__ */ i("div", { className: S("cv:flex cv:shrink-0 cv:flex-col cv:gap-3 cv:overflow-y-auto cv:pr-1", c === "kpi" ? "cv:w-56" : "cv:w-40"), children: c === "kpi" ? he() : (
        /* Each value well carries its axis-title box as a control above its fields (see
           axisTitleControl / renderAxisGroup), so the title sits with the measures it names. */
        ne.flatMap(
          (M) => C && M.id === "y" ? [W("left"), W("right")] : [ve(M, "vertical")]
        )
      ) }) : null,
      /* @__PURE__ */ v("div", { className: "cv:flex cv:min-w-0 cv:flex-1 cv:flex-col cv:gap-2", children: [
        /* @__PURE__ */ v("div", { className: "cv:relative cv:min-h-0 cv:flex-1", children: [
          a,
          /* @__PURE__ */ i(Hv, { spec: e, update: t, empty: R })
        ] }),
        F.length > 0 ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-wrap cv:items-start cv:gap-x-5 cv:gap-y-2 cv:pl-1", children: [
          F.map((M) => ve(M, "horizontal")),
          Q && !R ? /* @__PURE__ */ i(Pv, { spec: e, update: t }) : null
        ] }) : null
      ] })
    ] })
  ] });
}
function Oa(e, t) {
  const n = rr(e), a = t ?? (e == null ? void 0 : e.unit);
  return a && a !== n ? `${n} (${a})` : n;
}
function ci(e, t) {
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
  const t = co.safeParse(e);
  return t.success ? [] : t.error.issues.map((n) => ({
    path: n.path.join("."),
    message: n.message
  }));
}
function uf({
  spec: e,
  onChange: t,
  debounceMs: n = 250
}) {
  const [a, r] = x.useState(e), [o, s] = x.useState(e);
  x.useEffect(() => {
    r(e), s(e);
  }, [e]);
  const c = ci((f) => t(f), n), l = x.useMemo(() => La(a), [a]), u = l.length === 0, m = x.useCallback(
    (f) => {
      r(f), La(f).length === 0 && (s(f), c(f));
    },
    [c]
  );
  return { draft: a, issues: l, valid: u, committed: o, update: m };
}
const mf = () => {
};
function df({
  spec: e,
  onChange: t,
  onSave: n,
  debounceMs: a = 250,
  fill: r = !1,
  className: o
}) {
  const { draft: s, issues: c, valid: l, committed: u, update: m } = uf({
    spec: e,
    onChange: t ?? mf,
    debounceMs: a
  }), f = u, h = (k) => {
    var R, C, w;
    return (((R = k.measures) == null ? void 0 : R.length) ?? 0) > 0 || (((C = k.dimensions) == null ? void 0 : C.length) ?? 0) > 0 || (((w = k.timeDimensions) == null ? void 0 : w.some((L) => typeof L.granularity == "string")) ?? !1);
  }, p = (k) => {
    var R;
    return (((R = k.measures) == null ? void 0 : R.length) ?? 0) > 0;
  }, b = s.chart.family !== "table", g = h(s.query) && h(f.query) && (!b || p(s.query) && p(f.query)), y = b && !p(s.query) ? `Add a value (measure) to build this ${s.chart.family} chart.` : "Add fields from the axes to build this chart.", _ = g ? /* @__PURE__ */ i(_r, { query: f.query, chart: f.chart, editing: !0 }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:size-full cv:items-center cv:justify-center cv:rounded-lg cv:border cv:border-dashed cv:border-border cv:p-6 cv:text-center cv:text-sm cv:text-muted-foreground", children: /* @__PURE__ */ i("span", { className: "cv:max-w-[16rem]", children: y }) }), N = n ? /* @__PURE__ */ v(B, { size: "sm", disabled: !l, onClick: () => n(u), children: [
    /* @__PURE__ */ i(Qa, { className: "cv:size-4" }),
    "Save"
  ] }) : null;
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "chart-editor",
      className: S("cv:flex cv:w-full cv:flex-col cv:gap-2", r ? "cv:h-full" : "cv:min-h-[28rem]", o),
      children: [
        l ? null : /* @__PURE__ */ v(pr, { variant: "destructive", children: [
          /* @__PURE__ */ i(ja, { className: "cv:size-4" }),
          /* @__PURE__ */ i(gr, { children: "Invalid chart spec" }),
          /* @__PURE__ */ i(br, { children: /* @__PURE__ */ v("ul", { className: "cv:list-disc cv:pl-4", children: [
            c.slice(0, 3).map((k, R) => /* @__PURE__ */ v("li", { children: [
              k.path ? /* @__PURE__ */ i("span", { className: "cv:font-mono cv:text-xs", children: k.path }) : null,
              " ",
              k.message
            ] }, R)),
            c.length > 3 ? /* @__PURE__ */ v("li", { children: [
              "…and ",
              c.length - 3,
              " more"
            ] }) : null
          ] }) })
        ] }),
        /* @__PURE__ */ i("div", { className: "cv:min-h-0 cv:flex-1", children: /* @__PURE__ */ i(lf, { spec: s, update: m, toolbar: N, children: _ }) })
      ]
    }
  );
}
function vf({
  name: e,
  onNameChange: t,
  onAdd: n,
  onEditVariables: a,
  onUndo: r,
  onRedo: o,
  canUndo: s,
  canRedo: c,
  onDiscard: l,
  discardDisabled: u,
  onSave: m,
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
          fe,
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
            /* @__PURE__ */ i(Ya, {}),
            " Chart"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("text"), children: [
            /* @__PURE__ */ i(ur, {}),
            " Text"
          ] }),
          /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: () => n("input"), children: [
            /* @__PURE__ */ i(Ui, {}),
            " Input"
          ] }),
          a ? /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: a, children: [
            /* @__PURE__ */ i(Gi, {}),
            " Variables"
          ] }) : null
        ] }),
        /* @__PURE__ */ v("div", { className: "cv:ml-auto cv:flex cv:items-center cv:gap-1", children: [
          p ? /* @__PURE__ */ v(ie, { children: [
            /* @__PURE__ */ i(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: r,
                disabled: !s,
                "aria-label": "Undo",
                title: "Undo",
                children: /* @__PURE__ */ i(Yi, {})
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
                children: /* @__PURE__ */ i(Qi, {})
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
                /* @__PURE__ */ i(Ji, {}),
                " Discard"
              ]
            }
          ) : null,
          m ? /* @__PURE__ */ v(B, { size: "sm", onClick: m, disabled: f, children: [
            /* @__PURE__ */ i(Qa, {}),
            " Save"
          ] }) : null
        ] })
      ]
    }
  );
}
const si = "lg", li = 12;
function ff(e, t) {
  const n = t[si];
  if (n && n.length > 0) return n;
  let a, r = -1;
  for (const o of Object.values(t)) {
    if (!o || o.length === 0) continue;
    const s = o.reduce((c, l) => Math.max(c, l.x + l.w), 0);
    s > r && (a = o, r = s);
  }
  return a ?? e;
}
function hf(e, t) {
  const n = new Map(e.map((s) => [s.i, s])), a = new Map(t.map((s) => [s.i, s])), r = [], o = (s, c) => {
    const l = {
      i: s.i,
      x: s.x,
      y: s.y,
      w: s.w,
      h: s.h
    };
    (c == null ? void 0 : c.minW) !== void 0 && (l.minW = c.minW), (c == null ? void 0 : c.minH) !== void 0 && (l.minH = c.minH), (c == null ? void 0 : c.static) !== void 0 && (l.static = c.static), r.push(l);
  };
  for (const s of e) {
    const c = a.get(s.i);
    c && o(c, s);
  }
  for (const s of t)
    n.has(s.i) || o(s, void 0);
  return r;
}
const pf = {
  chart: { w: 6, h: 6, minW: 3, minH: 4 },
  text: { w: 6, h: 3, minW: 2, minH: 2 },
  input: { w: 3, h: 2, minW: 2, minH: 1 }
};
function gf(e, t, n, a = li) {
  const r = pf[n], o = Math.min(r.w, a), s = e.reduce((c, l) => Math.max(c, l.y + l.h), 0);
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
function ui(e, t, n = ((a) => (a = e.grid) == null ? void 0 : a.cols)() ?? li) {
  const r = gf(e.layout, t.id, t.type, n);
  return {
    ...e,
    widgets: [...e.widgets, t],
    layout: [...e.layout, r]
  };
}
function bf(e, t, n) {
  const a = e.widgets.find((o) => o.id === t);
  if (!a) return e;
  const r = JSON.parse(JSON.stringify(a));
  return r.id = n, ui(e, r);
}
function yf(e, t) {
  return {
    ...e,
    widgets: e.widgets.filter((n) => n.id !== t),
    layout: e.layout.filter((n) => n.i !== t)
  };
}
function xf(e, t) {
  return {
    ...e,
    widgets: e.widgets.map((n) => n.id === t.id ? t : n)
  };
}
const wf = 12;
function kf(e) {
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
function Nf(e) {
  return e.map((t) => {
    const n = { i: t.i, x: t.x, y: t.y, w: t.w, h: t.h };
    return t.minW !== void 0 && (n.minW = t.minW), t.minH !== void 0 && (n.minH = t.minH), t.static !== void 0 && (n.static = t.static), n;
  });
}
function Cf({
  spec: e,
  selectedId: t,
  onSelect: n,
  onEdit: a,
  onDuplicate: r,
  onDelete: o,
  onLayoutChange: s
}) {
  const [c, l] = Ro(), u = e.grid ?? {}, m = u.cols ?? wf, f = u.rowHeight ?? 40, h = u.margin ?? [12, 12], p = u.containerPadding ?? [0, 0], { breakpoints: b, cols: g } = x.useMemo(
    () => kf(m),
    [m]
  ), y = x.useMemo(
    () => ({ [si]: Nf(e.layout) }),
    [e.layout]
  ), _ = x.useMemo(
    () => new Map(e.widgets.map((C) => [C.id, C])),
    [e.widgets]
  ), N = x.useRef(s);
  x.useEffect(() => {
    N.current = s;
  }, [s]);
  const k = x.useRef(null), R = x.useCallback(
    (C, w) => {
      const L = ff(C, w);
      N.current(L.map((D) => ({ ...D })));
    },
    []
  );
  return /* @__PURE__ */ i(Cr, { spec: e, children: /* @__PURE__ */ i("div", { ref: c, className: "cv:w-full cv:[&_.react-resizable-handle]:z-20", children: l > 0 ? /* @__PURE__ */ i(
    Xa,
    {
      width: l,
      layouts: y,
      breakpoints: b,
      cols: g,
      rowHeight: f,
      margin: h,
      containerPadding: p,
      dragConfig: { enabled: !0, handle: `.${on}` },
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
                const j = k.current;
                j && Math.hypot(D.clientX - j.x, D.clientY - j.y) > 5 || n(w.id);
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
                /* @__PURE__ */ i(Bo, { widget: w, editable: !0 }),
                /* @__PURE__ */ i("div", { "aria-hidden": !0, className: S(on, "cv:absolute cv:inset-0 cv:z-10 cv:cursor-move cv:rounded-xl") }),
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
                      children: /* @__PURE__ */ i(Xi, {})
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
                      children: /* @__PURE__ */ i(Zi, {})
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
                      children: /* @__PURE__ */ i(xt, {})
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
function Sf(e) {
  return e && typeof e == "object" && typeof e.type == "string" ? e : { type: "doc", content: [{ type: "paragraph" }] };
}
function _f({
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
  const r = Za({
    extensions: [to],
    editable: !0,
    content: Sf(e.doc),
    onUpdate: ({ editor: o }) => {
      const s = o.getJSON();
      n.current({ ...a.current, doc: s });
    },
    editorProps: {
      attributes: {
        // Same typography as the rendered widget + editor chrome (border/padding/focus),
        // so WYSIWYG: what you type matches the final render exactly.
        class: S(
          Ao,
          "cv:min-h-[8rem] cv:rounded-md cv:border cv:border-input cv:bg-background cv:px-3 cv:py-2",
          "cv:focus-visible:outline-none cv:focus-visible:ring-1 cv:focus-visible:ring-ring"
        )
      }
    }
  });
  return r ? /* @__PURE__ */ i(de, { label: "Content", hint: "Rich text — renders read-only at runtime.", children: /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-2", children: [
    /* @__PURE__ */ i(Rf, { editor: r }),
    /* @__PURE__ */ i(eo, { editor: r })
  ] }) }) : /* @__PURE__ */ i("div", { className: "cv:text-sm cv:text-muted-foreground", children: "Loading editor…" });
}
function Ke({ active: e, onClick: t, title: n, children: a }) {
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
function Rf({ editor: e }) {
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
          Ke,
          {
            title: "Bold",
            active: e.isActive("bold"),
            onClick: () => e.chain().focus().toggleBold().run(),
            children: /* @__PURE__ */ i(ec, {})
          }
        ),
        /* @__PURE__ */ i(
          Ke,
          {
            title: "Italic",
            active: e.isActive("italic"),
            onClick: () => e.chain().focus().toggleItalic().run(),
            children: /* @__PURE__ */ i(tc, {})
          }
        ),
        /* @__PURE__ */ i(
          Ke,
          {
            title: "Strikethrough",
            active: e.isActive("strike"),
            onClick: () => e.chain().focus().toggleStrike().run(),
            children: /* @__PURE__ */ i(nc, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Ke,
          {
            title: "Heading 1",
            active: e.isActive("heading", { level: 1 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 1 }).run(),
            children: /* @__PURE__ */ i(rc, {})
          }
        ),
        /* @__PURE__ */ i(
          Ke,
          {
            title: "Heading 2",
            active: e.isActive("heading", { level: 2 }),
            onClick: () => e.chain().focus().toggleHeading({ level: 2 }).run(),
            children: /* @__PURE__ */ i(ac, {})
          }
        ),
        /* @__PURE__ */ i("span", { className: "cv:mx-1 cv:h-5 cv:w-px cv:bg-border", "aria-hidden": !0 }),
        /* @__PURE__ */ i(
          Ke,
          {
            title: "Bullet list",
            active: e.isActive("bulletList"),
            onClick: () => e.chain().focus().toggleBulletList().run(),
            children: /* @__PURE__ */ i(oc, {})
          }
        ),
        /* @__PURE__ */ i(
          Ke,
          {
            title: "Numbered list",
            active: e.isActive("orderedList"),
            onClick: () => e.chain().focus().toggleOrderedList().run(),
            children: /* @__PURE__ */ i(ic, {})
          }
        ),
        /* @__PURE__ */ i(
          Ke,
          {
            title: "Quote",
            active: e.isActive("blockquote"),
            onClick: () => e.chain().focus().toggleBlockquote().run(),
            children: /* @__PURE__ */ i(cc, {})
          }
        )
      ]
    }
  );
}
const Af = dr(
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
function Mf({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: S(Af({ variant: t }), e), ...n });
}
function Of({
  value: e,
  onChange: t,
  placeholder: n = "Select data source…",
  disabled: a,
  id: r,
  className: o
}) {
  const { meta: s, isLoading: c } = Je(), l = x.useMemo(() => Nn(s), [s]), u = l.filter((h) => h.type === "cube"), m = l.filter((h) => h.type === "view"), f = l.find((h) => h.name === e);
  return /* @__PURE__ */ v(Le, { value: e, onValueChange: t, disabled: a || c, children: [
    /* @__PURE__ */ i(Te, { id: r, className: o, children: /* @__PURE__ */ i(De, { placeholder: c ? "Loading…" : n, children: f ? /* @__PURE__ */ i(qn, { option: f }) : void 0 }) }),
    /* @__PURE__ */ v(ze, { children: [
      m.length > 0 ? /* @__PURE__ */ v(Jn, { children: [
        /* @__PURE__ */ i(Xn, { children: "Views" }),
        m.map((h) => /* @__PURE__ */ i(be, { value: h.name, children: /* @__PURE__ */ i(qn, { option: h }) }, h.name))
      ] }) : null,
      u.length > 0 ? /* @__PURE__ */ v(Jn, { children: [
        /* @__PURE__ */ i(Xn, { children: "Cubes" }),
        u.map((h) => /* @__PURE__ */ i(be, { value: h.name, children: /* @__PURE__ */ i(qn, { option: h }) }, h.name))
      ] }) : null
    ] })
  ] });
}
function qn({ option: e }) {
  const t = e.type === "view" ? mr : Wa;
  return /* @__PURE__ */ v("span", { className: "cv:flex cv:min-w-0 cv:items-center cv:gap-2", children: [
    /* @__PURE__ */ i(t, { className: "cv:size-4 cv:shrink-0 cv:text-muted-foreground" }),
    /* @__PURE__ */ i("span", { className: "cv:truncate", children: e.title }),
    /* @__PURE__ */ i(Mf, { variant: "secondary", className: "cv:ml-auto cv:shrink-0 cv:px-1.5 cv:py-0 cv:text-[10px]", children: e.type })
  ] });
}
const Lf = {
  dateRange: "Date range",
  granularity: "Granularity",
  select: "Select",
  memberSelect: "Member select",
  text: "Text",
  number: "Number",
  toggle: "Toggle"
};
function Df(e) {
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
function Tf({
  widget: e,
  variables: t,
  onChange: n
}) {
  const { control: a } = e.control, r = (c) => n({ ...e, control: { ...e.control, control: c } }), o = (c) => n({ ...e, control: { ...e.control, variable: c } }), s = (c) => {
    c !== a.kind && r(Df(c));
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
              /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(De, { placeholder: "Select variable…" }) }),
              /* @__PURE__ */ i(ze, { children: t.map((c) => /* @__PURE__ */ i(be, { value: c.name, children: c.label ? `${c.label} (${c.name})` : c.name }, c.name)) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(de, { label: "Control", children: /* @__PURE__ */ v(Le, { value: a.kind, onValueChange: (c) => s(c), children: [
      /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(De, {}) }),
      /* @__PURE__ */ i(ze, { children: Lc.options.map((c) => /* @__PURE__ */ i(be, { value: c, children: Lf[c] }, c)) })
    ] }) }),
    /* @__PURE__ */ i(zf, { control: a, onChange: r, variables: t })
  ] });
}
function zf({
  control: e,
  onChange: t,
  variables: n
}) {
  switch (e.kind) {
    case "dateRange":
      return /* @__PURE__ */ i(Ff, { control: e, onChange: t });
    case "granularity":
      return /* @__PURE__ */ i(Ef, { control: e, onChange: t, variables: n });
    case "select":
      return /* @__PURE__ */ i(Pf, { control: e, onChange: t });
    case "memberSelect":
      return /* @__PURE__ */ i(If, { control: e, onChange: t });
    case "text":
      return /* @__PURE__ */ i(jf, { control: e, onChange: t });
    case "number":
      return /* @__PURE__ */ i(Vf, { control: e, onChange: t });
    case "toggle":
      return null;
  }
}
function Ff({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(
      de,
      {
        label: "Presets",
        hint: "Which quick ranges appear in the picker. None selected ⇒ a sensible default set.",
        children: /* @__PURE__ */ i(
          $f,
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
function $f({
  selected: e,
  onChange: t
}) {
  const [n, a] = x.useState(!1), r = new Set(e.map((c) => c.toLowerCase())), o = (c) => {
    const l = new Set(r);
    l.has(c) ? l.delete(c) : l.add(c), t(Zt.filter((u) => l.has(u.value)).map((u) => u.value));
  }, s = r.size === 0 ? "Default set" : r.size === Zt.length ? "All presets" : `${r.size} selected`;
  return /* @__PURE__ */ v(_e, { open: n, onOpenChange: a, children: [
    /* @__PURE__ */ i(Re, { asChild: !0, children: /* @__PURE__ */ v(B, { variant: "outline", className: "cv:w-full cv:justify-between cv:font-normal", children: [
      /* @__PURE__ */ i("span", { className: "cv:truncate", children: s }),
      /* @__PURE__ */ i(Ge, { className: "cv:size-4 cv:shrink-0 cv:opacity-50" })
    ] }) }),
    /* @__PURE__ */ i(Ae, { className: "cv:w-64 cv:p-1", align: "start", children: /* @__PURE__ */ i("div", { className: "cv:max-h-72 cv:overflow-y-auto", children: Zt.map((c) => {
      const l = r.has(c.value);
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
                children: l ? /* @__PURE__ */ i(je, { className: "cv:size-3" }) : null
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
function Ef({
  control: e,
  onChange: t,
  variables: n
}) {
  const a = new Set(e.options ?? []), r = (c) => {
    const l = new Set(a);
    l.has(c) ? l.delete(c) : l.add(c);
    const u = rt.options.filter((m) => l.has(m));
    t({ ...e, options: u.length > 0 ? u : void 0 });
  }, o = n.filter((c) => c.type === "dateRange" || c.type === "time"), s = "__none__";
  return /* @__PURE__ */ v(ie, { children: [
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
              /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(De, { placeholder: o.length === 0 ? "No date-range variables" : "None" }) }),
              /* @__PURE__ */ v(ze, { children: [
                /* @__PURE__ */ i(be, { value: s, children: "None" }),
                o.map((c) => /* @__PURE__ */ i(be, { value: c.name, children: c.label ? `${c.label} (${c.name})` : c.name }, c.name))
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ i(de, { label: "Granularities", hint: "Leave all off to offer every granularity (or the proportioned set).", children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-wrap cv:gap-1.5", children: rt.options.map((c) => {
      const l = a.has(c);
      return /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          "aria-pressed": l,
          onClick: () => r(c),
          className: "cv:rounded-md cv:border cv:px-2 cv:py-1 cv:text-xs cv:capitalize cv:transition-colors" + (l ? "cv:border-primary cv:bg-primary/10 cv:text-foreground" : "cv:border-border cv:text-muted-foreground cv:hover:text-foreground"),
          children: c
        },
        c
      );
    }) }) })
  ] });
}
function Pf({
  control: e,
  onChange: t
}) {
  const n = (o, s) => {
    const c = e.options.map(
      (l, u) => u === o ? { value: s.value ?? String(l.value), label: s.label ?? l.label } : l
    );
    t({ ...e, options: c });
  }, a = () => t({ ...e, options: [...e.options, { value: "", label: "" }] }), r = (o) => t({ ...e, options: e.options.filter((s, c) => c !== o) });
  return /* @__PURE__ */ v(ie, { children: [
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
        action: /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", onClick: a, children: [
          /* @__PURE__ */ i(ht, {}),
          " Add"
        ] }),
        children: /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-1.5", children: e.options.length === 0 ? /* @__PURE__ */ i("p", { className: "cv:text-xs cv:text-muted-foreground", children: "No options yet." }) : e.options.map((o, s) => /* @__PURE__ */ v("div", { className: "cv:flex cv:items-center cv:gap-1.5", children: [
          /* @__PURE__ */ i(
            fe,
            {
              className: "cv:flex-1",
              placeholder: "Label",
              value: o.label,
              onChange: (c) => n(s, { label: c.target.value })
            }
          ),
          /* @__PURE__ */ i(
            fe,
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
              onClick: () => r(s),
              children: /* @__PURE__ */ i(xt, {})
            }
          )
        ] }, s)) })
      }
    )
  ] });
}
function If({
  control: e,
  onChange: t
}) {
  return /* @__PURE__ */ v(ie, { children: [
    /* @__PURE__ */ i(de, { label: "From", children: /* @__PURE__ */ v(
      Le,
      {
        value: e.from,
        onValueChange: (n) => t({ ...e, from: n }),
        children: [
          /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(De, {}) }),
          /* @__PURE__ */ v(ze, { children: [
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
          Of,
          {
            value: e.cube,
            onChange: (n) => t({ ...e, cube: n || void 0 })
          }
        )
      }
    )
  ] });
}
function jf({
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
function Vf({
  control: e,
  onChange: t
}) {
  const n = (a, r) => /* @__PURE__ */ i(de, { label: r, children: /* @__PURE__ */ i(
    fe,
    {
      type: "number",
      value: e[a] ?? "",
      onChange: (o) => {
        const s = o.target.value;
        t({ ...e, [a]: s === "" ? void 0 : Number(s) });
      }
    }
  ) });
  return /* @__PURE__ */ v(ie, { children: [
    n("min", "Min"),
    n("max", "Max"),
    n("step", "Step")
  ] });
}
function qf(e) {
  return { schemaVersion: mt, id: "editor-preview", kind: "dashboard", variables: e, widgets: [], layout: [] };
}
function Kf(e) {
  const t = {
    schemaVersion: mt,
    id: e.id,
    kind: "chart",
    query: e.query,
    chart: e.chart
  };
  return e.title !== void 0 && (t.name = e.title), t;
}
function Bf(e, t) {
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
  const o = a ? (s) => a([...t, s]) : void 0;
  return /* @__PURE__ */ v("div", { "data-slot": "widget-edit-panel", className: S("cv:flex cv:flex-col cv:gap-2", r && "cv:h-full"), children: [
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
      /* @__PURE__ */ i(Cr, { spec: qf(t), children: /* @__PURE__ */ i(Cv, { createVariable: o, children: /* @__PURE__ */ i("div", { className: S(r && "cv:min-h-0 cv:flex-1"), children: /* @__PURE__ */ i(
        df,
        {
          fill: r,
          spec: Kf(e),
          onChange: (s) => n(Bf(e, s))
        }
      ) }) }) })
    ) : e.type === "text" ? /* @__PURE__ */ i(_f, { widget: e, onChange: n }) : /* @__PURE__ */ i(Tf, { widget: e, variables: t, onChange: n })
  ] });
}
function Hf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !1,
  open: r = !0,
  onToggle: o,
  regionId: s,
  className: c
}) {
  const l = /* @__PURE__ */ v(ie, { children: [
    a ? /* @__PURE__ */ i(
      Bt,
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
      className: S("cv:flex cv:items-center cv:justify-between cv:gap-2", c),
      children: [
        a ? /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: o,
            "aria-expanded": r,
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
function Wf({
  title: e,
  summary: t,
  actions: n,
  collapsible: a = !0,
  defaultOpen: r = !0,
  open: o,
  onOpenChange: s,
  className: c,
  children: l
}) {
  const u = o !== void 0, [m, f] = x.useState(r), h = a ? u ? o : m : !0, p = x.useId(), b = x.useCallback(() => {
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
          Hf,
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
function Uf(e = "w") {
  let t = 0;
  return () => `${e}-${++t}`;
}
function Gf(e) {
  return {
    id: e,
    type: "chart",
    title: "New chart",
    query: { measures: [], dimensions: [] },
    chart: { family: "bar" }
  };
}
function Yf(e) {
  return {
    id: e,
    type: "text",
    doc: { type: "doc", content: [{ type: "paragraph" }] }
  };
}
function Qf(e) {
  return {
    id: e,
    type: "input",
    control: { variable: "", control: { kind: "select", options: [] } }
  };
}
function Jf(e, t) {
  switch (e) {
    case "chart":
      return Gf(t);
    case "text":
      return Yf(t);
    case "input":
      return Qf(t);
  }
}
function Xf(e) {
  return { name: e, type: "string" };
}
function Zf(e) {
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
const Ta = {
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
    let u;
    do
      u = `var_${++a.current}`;
    while (e.some((m) => m.name === u));
    return u;
  }, o = (u, m) => {
    t(e.map((f, h) => h === u ? th(f, m) : f));
  }, s = (u) => t(e.filter((m, f) => f !== u)), c = () => t([...e, Xf(r())]), l = (u, m) => {
    const f = u + m;
    if (f < 0 || f >= e.length) return;
    const h = e.slice();
    [h[u], h[f]] = [h[f], h[u]], t(h);
  };
  return /* @__PURE__ */ i(
    Wf,
    {
      title: "Variables",
      summary: e.length > 0 ? `${e.length}` : void 0,
      actions: /* @__PURE__ */ v(B, { variant: "outline", size: "sm", onClick: c, children: [
        /* @__PURE__ */ i(ht, {}),
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
          /* @__PURE__ */ i(ht, {}),
          " Add variable"
        ] })
      ] }) : /* @__PURE__ */ i("div", { className: "cv:flex cv:flex-col cv:gap-2", children: e.map((u, m) => /* @__PURE__ */ i(
        nh,
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
function th(e, t) {
  const n = { ...e, ...t };
  return t.type !== void 0 && t.type !== e.type && (n.default = Zf(t.type)), n.label === "" && delete n.label, n.array === !1 && delete n.array, n;
}
function nh({
  decl: e,
  index: t,
  total: n,
  duplicate: a,
  onChange: r,
  onRemove: o,
  onMove: s
}) {
  const [c, l] = x.useState(!0), u = e.name === "" ? "Name required" : a ? "Duplicate name" : void 0;
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
              children: c ? /* @__PURE__ */ i(Ge, {}) : /* @__PURE__ */ i(Bt, {})
            }
          ),
          /* @__PURE__ */ i(
            fe,
            {
              value: e.name,
              placeholder: "variable_name",
              "aria-label": "Variable name",
              "aria-invalid": u ? !0 : void 0,
              onChange: (m) => r({ name: m.target.value }),
              className: "cv:h-7 cv:min-w-0 cv:flex-1 cv:font-mono cv:text-xs"
            }
          ),
          /* @__PURE__ */ i("span", { className: "cv:hidden cv:shrink-0 cv:rounded cv:bg-muted cv:px-1.5 cv:py-0.5 cv:text-[10px] cv:font-medium cv:text-muted-foreground cv:sm:inline", children: Ta[e.type] }),
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
                children: /* @__PURE__ */ i(vn, {})
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
                children: /* @__PURE__ */ i(fn, {})
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
                children: /* @__PURE__ */ i(xt, {})
              }
            )
          ] })
        ] }),
        u ? /* @__PURE__ */ i("p", { className: "cv:px-2 cv:pb-1.5 cv:text-[11px] cv:text-destructive", children: u }) : null,
        c ? /* @__PURE__ */ v("div", { className: "cv:flex cv:flex-col cv:gap-1 cv:border-t cv:border-border/60 cv:p-2.5", children: [
          /* @__PURE__ */ i(de, { label: "Type", className: "cv:py-1", children: /* @__PURE__ */ v(Le, { value: e.type, onValueChange: (m) => r({ type: m }), children: [
            /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(De, {}) }),
            /* @__PURE__ */ i(ze, { children: oo.options.map((m) => /* @__PURE__ */ i(be, { value: m, children: Ta[m] }, m)) })
          ] }) }),
          /* @__PURE__ */ i(de, { label: "Label", hint: "Optional human label for controls.", className: "cv:py-1", children: /* @__PURE__ */ i(
            fe,
            {
              value: e.label ?? "",
              placeholder: e.name,
              onChange: (m) => r({ label: m.target.value })
            }
          ) }),
          /* @__PURE__ */ i(
            ge,
            {
              label: "Array",
              hint: "Holds multiple values (multi-select).",
              checked: e.array ?? !1,
              onChange: (m) => r({ array: m })
            }
          ),
          /* @__PURE__ */ i(rh, { decl: e, onChange: (m) => r({ default: m }) })
        ] }) : null
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
      ge,
      {
        label: "Default",
        checked: e.default === !0,
        onChange: (r) => t(r)
      }
    );
  if (e.type === "number" && !e.array)
    return /* @__PURE__ */ i(de, { label: "Default", className: "cv:py-1", children: /* @__PURE__ */ i(
      fe,
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
  return /* @__PURE__ */ i(de, { label: "Default", hint: n, className: "cv:py-1", children: /* @__PURE__ */ i(
    fe,
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
          const s = o.split(",").map((c) => c.trim()).filter(Boolean);
          t(s);
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
  debounceMs: s = 300,
  onUndo: c,
  onRedo: l,
  canUndo: u,
  canRedo: m,
  onDiscard: f,
  className: h
}) {
  var Z, ve;
  const [p, b] = x.useState(e);
  x.useEffect(() => b(e), [e]);
  const [g, y] = x.useState(null), _ = x.useRef(0), [N, k] = x.useState(null), R = x.useRef(g), C = x.useRef(N), w = x.useRef(p);
  x.useEffect(() => {
    R.current = g, C.current = N, w.current = p;
  });
  const L = x.useRef(null);
  L.current === null && (L.current = o ?? Uf());
  const D = o ?? L.current, j = ci(
    (H) => a == null ? void 0 : a(H),
    s
  ), P = x.useCallback(
    (H) => {
      _.current = Date.now(), b((W) => {
        const he = H(W);
        return j(he), he;
      });
    },
    [j]
  ), I = x.useRef(t);
  x.useEffect(() => {
    if (!t || t === I.current) return;
    const H = 500;
    let W = null;
    const he = () => {
      var tt;
      const Ze = Date.now() - _.current;
      if (Ze < H) {
        W = setTimeout(he, H - Ze);
        return;
      }
      I.current = t;
      const qe = /* @__PURE__ */ new Set();
      ((tt = C.current) == null ? void 0 : tt.kind) === "widget" && qe.add(C.current.id), R.current && qe.add(R.current);
      const et = ch(t, w.current, qe);
      b(et), n == null || n(et);
    };
    return he(), () => {
      W && clearTimeout(W);
    };
  }, [t]);
  const q = x.useCallback(
    (H) => {
      const W = Jf(H, D());
      P((he) => ui(he, W)), y(W.id), k({ kind: "widget", id: W.id });
    },
    [P, D]
  ), T = x.useCallback((H) => y(H), []), O = x.useCallback((H) => {
    y(H), k({ kind: "widget", id: H });
  }, []), G = x.useCallback(
    (H) => {
      P((W) => yf(W, H)), y((W) => W === H ? null : W), k((W) => (W == null ? void 0 : W.kind) === "widget" && W.id === H ? null : W);
    },
    [P]
  ), ne = x.useCallback(
    (H) => {
      const W = D();
      P((he) => bf(he, H, W)), y(W);
    },
    [P, D]
  ), F = x.useCallback(
    (H) => P((W) => xf(W, H)),
    [P]
  ), Y = x.useCallback(
    (H) => P((W) => ({ ...W, layout: hf(W.layout, H) })),
    [P]
  ), ee = x.useCallback(
    (H) => P((W) => ({ ...W, name: H || void 0 })),
    [P]
  ), U = x.useCallback(
    (H) => P((W) => ({ ...W, variables: H })),
    [P]
  ), Q = x.useMemo(
    () => so.safeParse(p),
    [p]
  ), me = x.useCallback(() => {
    Q.success && (r == null || r(Q.data));
  }, [Q, r]), J = (N == null ? void 0 : N.kind) === "widget" ? p.widgets.find((H) => H.id === N.id) ?? null : null;
  x.useEffect(() => {
    (N == null ? void 0 : N.kind) === "widget" && !p.widgets.some((H) => H.id === N.id) && k(null);
  }, [N, p.widgets]);
  const K = x.useCallback(() => k(null), []), A = (N == null ? void 0 : N.kind) === "variables" ? "Dashboard variables" : J ? J.title ?? `${ih(J.type)} widget` : "";
  return /* @__PURE__ */ v(
    "div",
    {
      "data-slot": "dashboard-editor",
      style: { paddingInline: ((ve = (Z = p.grid) == null ? void 0 : Z.margin) == null ? void 0 : ve[0]) ?? 12 },
      className: S("cv:flex cv:h-full cv:flex-col cv:gap-2", h),
      children: [
        /* @__PURE__ */ i(
          vf,
          {
            name: p.name ?? "",
            onNameChange: ee,
            onAdd: q,
            onEditVariables: () => k({ kind: "variables" }),
            onUndo: c,
            onRedo: l,
            canUndo: u,
            canRedo: m,
            onDiscard: f,
            onSave: r ? me : void 0,
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
          Cf,
          {
            spec: p,
            selectedId: g,
            onSelect: T,
            onEdit: O,
            onDuplicate: ne,
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
                  /* @__PURE__ */ v(B, { variant: "ghost", size: "sm", onClick: K, children: [
                    /* @__PURE__ */ i(lr, {}),
                    " Done"
                  ] }),
                  /* @__PURE__ */ i("span", { className: "cv:truncate cv:text-sm cv:font-medium", children: A })
                ] }),
                J ? /* @__PURE__ */ v(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "cv:text-destructive cv:hover:text-destructive",
                    onClick: () => G(J.id),
                    children: [
                      /* @__PURE__ */ i(xt, {}),
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
                  onChange: F,
                  onVariablesChange: U
                }
              ) : J ? /* @__PURE__ */ i("div", { className: "cv:mx-auto cv:h-full cv:max-w-3xl cv:overflow-y-auto", children: /* @__PURE__ */ i(
                Da,
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
function ih(e) {
  return e.length ? e[0].toUpperCase() + e.slice(1) : e;
}
function ch(e, t, n) {
  const a = new Map(t.widgets.map((u) => [u.id, u])), r = new Set(e.widgets.map((u) => u.id)), o = e.widgets.map(
    (u) => n.has(u.id) && a.has(u.id) ? a.get(u.id) : u
  );
  for (const u of t.widgets)
    !r.has(u.id) && n.has(u.id) && o.push(u);
  const s = new Map(t.layout.map((u) => [u.i, u])), c = new Set(e.layout.map((u) => u.i)), l = e.layout.map(
    (u) => n.has(u.i) && s.has(u.i) ? s.get(u.i) : u
  );
  for (const u of t.layout)
    !c.has(u.i) && n.has(u.i) && l.push(u);
  return { ...e, widgets: o, layout: l };
}
export {
  Mu as AreaChartFamily,
  du as AreaFamilyOptionsSchema,
  Ac as AxesOptionsSchema,
  Tn as AxisOptionsSchema,
  Ru as BarChartFamily,
  uu as BarFamilyOptionsSchema,
  si as CANONICAL_BREAKPOINT,
  Ue as ChartColorTokenSchema,
  lf as ChartEditOverlay,
  df as ChartEditor,
  Nc as ChartFamilySchema,
  ao as ChartOptionsSchema,
  am as ChartRenderer,
  co as ChartSpecSchema,
  zh as ChartView,
  Tc as ChartWidgetSchema,
  Mc as ColorAssignmentSchema,
  em as ComboChartFamily,
  xu as ComboFamilyOptionsSchema,
  yu as ComboSeriesOptSchema,
  gu as CondFormatRuleSchema,
  _r as CubeChart,
  hm as CubeChartSpec,
  ro as CubeQuerySchema,
  Nr as CubeVizContext,
  Lh as CubeVizProvider,
  ho as DEFAULTS,
  ye as DEFAULT_COLOR_RAMP,
  li as DEFAULT_COLS,
  Un as DEFAULT_UNIT_CONVERSIONS,
  on as DRAG_HANDLE_CLASS,
  Th as Dashboard,
  Fh as DashboardEditor,
  Cr as DashboardProvider,
  so as DashboardSpecSchema,
  Kn as DateRangeSchema,
  ea as EM_DASH,
  Cf as EditorCanvas,
  vf as EditorToolbar,
  Av as FilterBuilder,
  yc as FilterOperatorSchema,
  Cc as FormatKindSchema,
  hn as FormatOptionsSchema,
  ls as GRANULARITY_PATTERN,
  rt as GranularitySchema,
  Pc as GridConfigSchema,
  Lc as InputControlKindSchema,
  Dc as InputControlSchema,
  Tf as InputWidgetEditor,
  Fc as InputWidgetSchema,
  Em as InputWidgetView,
  $u as KpiFamily,
  hu as KpiFamilyOptionsSchema,
  Ec as LayoutItemSchema,
  xc as LeafFilterSchema,
  _c as LegendOptionsSchema,
  Au as LineChartFamily,
  mu as LineFamilyOptionsSchema,
  re as MemberSchema,
  Qr as OrderDirSchema,
  kc as OrderSpecSchema,
  Ou as PieChartFamily,
  vu as PieFamilyOptionsSchema,
  Bn as QueryFilterSchema,
  Ht as ReferenceLineOptSchema,
  Bo as RenderWidget,
  mt as SCHEMA_VERSION,
  bc as ScalarSchema,
  Du as ScatterChartFamily,
  fu as ScatterFamilyOptionsSchema,
  Sc as SeriesMappingSchema,
  Jr as SeriesMetaSchema,
  lo as SpecSchema,
  pu as TableColumnOptSchema,
  Hu as TableFamily,
  bu as TableFamilyOptionsSchema,
  _f as TextWidgetEditor,
  zc as TextWidgetSchema,
  gm as TextWidgetView,
  wc as TimeDimensionSchema,
  Oc as TipTapDocSchema,
  Rc as TooltipOptionsSchema,
  nn as VarRefSchema,
  Ic as VariableDeclSchema,
  oo as VariableTypeSchema,
  no as VariableValueSchema,
  eh as VariablesPanel,
  zo as WidgetChrome,
  Da as WidgetEditPanel,
  $c as WidgetSpecSchema,
  ui as appendWidget,
  Zr as assignColors,
  tu as axisKey,
  So as builtinCharts,
  qc as createCubeClient,
  Uf as createIdFactory,
  fo as createUnitsFormatter,
  ss as createVariableStore,
  ds as datePattern,
  Gn as deepMerge,
  Zf as defaultForType,
  fr as defaultFormatter,
  Oh as familyOptionsSchema,
  Kc as fetchMeta,
  Ah as formatCategory,
  Ft as formatDateValue,
  pt as isEmptyValue,
  Oe as isVarRef,
  Vc as loadSpec,
  uo as looksLikeIsoDate,
  vo as makeChartFormat,
  Rh as makeDateFormatter,
  Mh as makeFormatter,
  hf as mergeLayout,
  bn as mergeUnitConversions,
  Gf as newChartWidget,
  Qf as newInputWidget,
  Yf as newTextWidget,
  Xf as newVariable,
  Jf as newWidget,
  Jc as normalize,
  ff as pickCanonicalLayout,
  gf as placeNewItem,
  ru as quantityLabel,
  yf as removeWidget,
  xf as replaceWidget,
  im as resolveChart,
  ku as resolveOptions,
  cs as resolveQuery,
  Hn as resolveSeriesColors,
  rs as resolveValue,
  Sh as safeLoadSpec,
  ms as toDate,
  Wc as toResultAnnotation,
  uf as useChartEditorState,
  Ro as useContainerWidth,
  Je as useCubeMeta,
  sm as useCubeQuery,
  Qe as useCubeVizContext,
  _o as useDashboard,
  ci as useDebouncedCallback,
  Dh as useFormatter,
  Pn as useNormalizedSeries,
  Sr as useOptionalDashboard,
  _h as validateSpec
};
//# sourceMappingURL=index.js.map
