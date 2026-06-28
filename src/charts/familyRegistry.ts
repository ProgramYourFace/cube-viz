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
 * The MODULE-LEVEL chart-family registry — the runtime single source of truth for
 * which families exist and how each behaves. Seeded from the builtin descriptors;
 * a host registers an ENTIRELY NEW family with {@link registerChartFamily}
 * (e.g. a `map` family that lives in the host app now that the builtin map is gone).
 *
 * Cycle discipline: this module imports the builtin DATA (`familyDescriptors`,
 * `defaults`) but those leaves NEVER import back here. Everything that needs to
 * resolve a family for a possibly-host key — option schema, defaults, ordering,
 * the dispatch component — routes through the accessors below.
 */

const registry = new Map<string, ChartFamilyDescriptor>();

// Seed the builtins (in their declared order). A later `registerChartFamily` with the
// same key overrides — so a host MAY replace a builtin family wholesale if it wants.
for (const family of Object.keys(builtinFamilyDescriptors) as (keyof typeof builtinFamilyDescriptors)[]) {
  registry.set(family, builtinFamilyDescriptors[family]);
}

/**
 * Register (or replace) a chart family. After this the family appears in the type
 * picker, is editable (wells / placement / customize), validates (optionsSchema /
 * defaults), and renders (component) — everything derives from the registry.
 *
 * Idempotent by key: registering the same `descriptor.family` twice replaces it
 * (so a host re-render that re-registers is harmless).
 */
export function registerChartFamily(descriptor: ChartFamilyDescriptor): void {
  registry.set(descriptor.family, descriptor);
}

/** The descriptor for `family`, or `undefined` if no such family is registered. */
export function getFamilyDescriptor(family: ChartFamily): ChartFamilyDescriptor | undefined {
  return registry.get(family);
}

/**
 * The descriptor for `family` (the single dispatch point). Throws on an unknown
 * family — every editor/render path that calls this has already resolved a real
 * family, so an unknown key is a programming error worth failing loudly on.
 *
 * Replaces the old builtin-only `familyDescriptor` (same name, now registry-backed),
 * so every existing call site transparently supports host families.
 */
export function familyDescriptor(family: ChartFamily): ChartFamilyDescriptor {
  const d = registry.get(family);
  if (!d) {
    throw new Error(
      `Unknown chart family "${family}". Register it with registerChartFamily(...) (or via <CubeVizProvider families={[...]}>) before rendering/editing a spec that uses it.`,
    );
  }
  return d;
}

/** All registered descriptors, sorted by `order` (ascending), then key for ties. */
export function listFamilyDescriptors(): ChartFamilyDescriptor[] {
  return [...registry.values()].sort((a, b) => a.order - b.order || a.family.localeCompare(b.family));
}

/** All registered family keys, in picker order — supersedes the static `familyOrder`. */
export function chartFamilies(): ChartFamily[] {
  return listFamilyDescriptors().map((d) => d.family);
}

/* ─────────────────────────── options accessors (registry-routed) ─────────────────────────── */

/** The family's total defaults (envelope + familyOptions); empty for an unknown family. */
export function familyDefaults(family: ChartFamily): FamilyDefault {
  return registry.get(family)?.defaults ?? EMPTY_FAMILY_DEFAULT;
}

/**
 * The zod schema validating a family's `familyOptions` (after default-merge). For an
 * unknown family it falls back to a permissive passthrough so an unrecognized spec
 * doesn't throw at validation time (it just isn't normalized).
 */
export function familyOptionsSchema(family: ChartFamily): z.ZodTypeAny {
  return registry.get(family)?.optionsSchema ?? PASSTHROUGH_SCHEMA;
}

/** A single shared permissive schema (built once) for unknown families. */
const PASSTHROUGH_SCHEMA: z.ZodTypeAny = z.any();

/**
 * Resolve a chart's options against ITS family's defaults (registry-routed, so a
 * host family resolves exactly like a builtin). Deep-merges envelope + familyOptions
 * defaults under the spec; arrays replace wholesale. This is the public
 * `resolveOptions` every renderer uses.
 */
export function resolveOptions(options: ChartOptions): ChartOptions {
  return resolveOptionsWith(options, familyDefaults(options.family));
}
