import type { ChartOptions, Granularity } from "@/spec";
import { GranularitySchema } from "@/spec";
import type { AnnotatedMember, ResultAnnotation } from "@/adapter/types";

import type { ChartFormat, FormatRole, MemberMeta, ValueFormatter } from "./types";

/**
 * Bind a {@link ValueFormatter} to a result annotation + the resolved chart
 * options, producing the member-aware {@link ChartFormat} every family consumes.
 *
 * `.value(value, member, role)` resolves the member's annotation meta + title,
 * builds a FormatContext (with `options.format`), and calls `formatter`.
 * `.category(value)` resolves the category time-dimension granularity (from
 * `options.mapping` ∩ the resolved query's timeDimensions, when discoverable) and
 * calls `formatter` with role `"category"`.
 *
 * The library NEVER reaches into a Cube ResultSet here — only the already-extracted
 * {@link ResultAnnotation} + the spec's options + the host's formatter.
 */

/** Pull the annotated member from any of the annotation buckets. */
function lookupMember(member: string, ann?: ResultAnnotation): AnnotatedMember | undefined {
  if (!ann) return undefined;
  return (
    ann.measures[member] ??
    ann.dimensions[member] ??
    ann.timeDimensions[member] ??
    ann.segments[member]
  );
}

/** A literal Granularity (rejecting `{var}` tokens / unknown strings). */
function asGranularity(value: unknown): Granularity | undefined {
  const parsed = GranularitySchema.safeParse(value);
  return parsed.success ? parsed.data : undefined;
}

/**
 * Discover the granularity for the category axis. Cube keys time-dimension
 * annotations as `<member>.<granularity>` (e.g. `device_trips.created_at.day`), so
 * we match the chart's `mapping.category.member` against the annotation's
 * `timeDimensions` keys and read the trailing granularity. Returns undefined when
 * the category is not a time bucket (a plain dimension passes through as a string).
 */
function categoryGranularity(
  annotation: ResultAnnotation | undefined,
  options: ChartOptions,
): Granularity | undefined {
  const categoryMember = options.mapping?.category.member;
  if (!categoryMember || !annotation) return undefined;
  for (const key of Object.keys(annotation.timeDimensions)) {
    if (key === categoryMember) continue; // un-bucketed time dimension carries no granularity
    if (key.startsWith(`${categoryMember}.`)) {
      const g = asGranularity(key.slice(categoryMember.length + 1));
      if (g) return g;
    }
  }
  return undefined;
}

export function makeChartFormat(
  annotation: ResultAnnotation | undefined,
  options: ChartOptions,
  formatter: ValueFormatter,
  ctx?: { locale?: string; unitSystem?: "metric" | "imperial" },
): ChartFormat {
  const granularity = categoryGranularity(annotation, options);

  return {
    value(value, member, role: FormatRole = "value") {
      const annotated = member ? lookupMember(member, annotation) : undefined;
      const meta = annotated?.meta as MemberMeta | undefined;
      return formatter({
        value,
        member,
        meta,
        title: annotated?.shortTitle ?? annotated?.title,
        role,
        format: options.format,
        locale: ctx?.locale,
        unitSystem: ctx?.unitSystem,
      });
    },
    category(value) {
      return formatter({
        value,
        role: "category",
        format: options.format,
        granularity,
        locale: ctx?.locale,
        unitSystem: ctx?.unitSystem,
      });
    },
  };
}
