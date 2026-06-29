import { z } from "zod";

import type { ChartFamily, ChartOptions } from "@/spec";

import type { ChartFamilyDescriptor } from "./familyDescriptors";
import { builtinFamilyDescriptors } from "./familyDescriptors";
import {
  EMPTY_FAMILY_DEFAULT,
  resolveOptionsWith,
  type FamilyDefault,
} from "./defaults";

/**
 * The chart-family registry — an IMMUTABLE value (no module-mutable state). A
 * {@link FamilyRegistry} is built ONCE by {@link buildFamilyRegistry} (seeded by the
 * ordered builtins, then host families augment/override by `descriptor.family`), and
 * carried through React context (see {@link import("@/provider").CubeVizProvider}). A
 * host extends families declaratively via `<CubeVizProvider families={[...]}>` — there
 * is no module-global `Map` and no imperative `registerChartFamily` anymore.
 *
 * Cycle discipline: this module imports the builtin DATA (`familyDescriptors`,
 * `defaults`) but those leaves NEVER import back here. The per-family named exports +
 * `defaultChartFamilies` are declared HERE (this module already imports the builtin
 * record), keeping `familyDescriptors.ts` a pure data leaf.
 */

/* ─────────────────────────── per-family named exports ─────────────────────── */
//
// One named export per builtin family, so a host can `import { barChartFamily }` and
// compose its own ordered `families` list (or replace one). `defaultChartFamilies` is
// the ordered builtin array — the picker's default order.

export const barChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.bar;
export const lineChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.line;
export const areaChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.area;
export const pieChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.pie;
export const scatterChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.scatter;
export const kpiChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.kpi;
export const tableChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.table;
export const comboChartFamily: ChartFamilyDescriptor = builtinFamilyDescriptors.combo;

/**
 * The eight builtin families, in picker (`order`) order. Pass to
 * {@link import("@/provider").CubeVizProvider} `families` to compose, or spread into a
 * host list. The default the registry is seeded from.
 */
export const defaultChartFamilies: readonly ChartFamilyDescriptor[] = [
  barChartFamily,
  lineChartFamily,
  areaChartFamily,
  pieChartFamily,
  scatterChartFamily,
  kpiChartFamily,
  tableChartFamily,
  comboChartFamily,
];

/* ─────────────────────────── the registry interface ───────────────────────── */

/** A single shared permissive schema (built once) for unknown families. */
const PASSTHROUGH_SCHEMA: z.ZodTypeAny = z.any();

/**
 * An immutable chart-family registry: the runtime single source of truth for which
 * families exist and how each behaves. Built once by {@link buildFamilyRegistry} and
 * carried through context — every reader holds the same frozen instance (stable
 * identity, so it can sit in `useMemo` deps without churn).
 */
export interface FamilyRegistry {
  /** The descriptor for `family`, or `undefined` if no such family is registered. */
  get(family: ChartFamily): ChartFamilyDescriptor | undefined;
  /**
   * The descriptor for `family` (the single dispatch point). Throws on an unknown
   * family — every editor/render path that calls this has already resolved a real
   * family, so an unknown key is a programming error worth failing loudly on.
   */
  require(family: ChartFamily): ChartFamilyDescriptor;
  /** All registered descriptors, sorted by `order` (ascending), then key for ties. */
  list(): ChartFamilyDescriptor[];
  /** All registered family keys, in picker order. */
  families(): ChartFamily[];
  /** The family's total defaults (envelope + familyOptions); empty for an unknown family. */
  defaults(family: ChartFamily): FamilyDefault;
  /** The zod schema validating a family's `familyOptions`; permissive for unknown. */
  optionsSchema(family: ChartFamily): z.ZodTypeAny;
  /** Resolve a chart's options against ITS family's defaults (host resolves like a builtin). */
  resolveOptions(options: ChartOptions): ChartOptions;
}

/**
 * Build an immutable {@link FamilyRegistry}. Seeds `defaults` in order, then `host`
 * augments/overrides by `descriptor.family` key (host wins — a host family reusing a
 * builtin key replaces it wholesale). Builds a frozen `ReadonlyMap` once; pure, no
 * module state. The order-sorted list + family-keys array are computed ONCE here
 * (closure cache), so `list()`/`families()` never re-sort per call.
 */
export function buildFamilyRegistry(
  defaults: readonly ChartFamilyDescriptor[],
  host?: readonly ChartFamilyDescriptor[],
): FamilyRegistry {
  const map = new Map<string, ChartFamilyDescriptor>();
  for (const d of defaults) map.set(d.family, d);
  for (const d of host ?? []) map.set(d.family, d);
  Object.freeze(map);

  // Computed once: the order-sorted descriptor list and its family-key projection.
  const sorted = [...map.values()].sort(
    (a, b) => a.order - b.order || a.family.localeCompare(b.family),
  );
  const familyKeys = sorted.map((d) => d.family);

  const registry: FamilyRegistry = {
    get: (family) => map.get(family),
    require: (family) => {
      const d = map.get(family);
      if (!d) {
        throw new Error(
          `Unknown chart family "${family}". Provide it via <CubeVizProvider families={[...]}> (or buildFamilyRegistry) before rendering/editing a spec that uses it.`,
        );
      }
      return d;
    },
    list: () => sorted,
    families: () => familyKeys,
    defaults: (family) => map.get(family)?.defaults ?? EMPTY_FAMILY_DEFAULT,
    optionsSchema: (family) => map.get(family)?.optionsSchema ?? PASSTHROUGH_SCHEMA,
    resolveOptions: (options) => resolveOptionsWith(options, registry.defaults(options.family)),
  };
  return registry;
}

/**
 * A pre-built {@link FamilyRegistry} over {@link defaultChartFamilies} only (no host
 * families). The back-compat default for the public pure exports
 * ({@link resolveOptions}, {@link import("@/adapter").normalize},
 * {@link import("@/render").comparePreviousInput}) and the fallback for components
 * rendered outside a provider (e.g. {@link import("@/charts").ChartRenderer} in tests).
 */
export const builtinFamilyRegistry: FamilyRegistry = buildFamilyRegistry(defaultChartFamilies);

/**
 * Resolve a chart's options against ITS family's defaults — the public free function,
 * kept for back-compat. Deep-merges envelope + familyOptions defaults under the spec
 * (arrays replace wholesale). Defaults to the builtin-only registry when none is
 * passed, so `resolveOptions(options)` still works for external/test callers; pass a
 * registry (from context) to resolve host families.
 */
export function resolveOptions(
  options: ChartOptions,
  registry: FamilyRegistry = builtinFamilyRegistry,
): ChartOptions {
  return registry.resolveOptions(options);
}
