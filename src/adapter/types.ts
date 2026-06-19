import type { ChartColorToken, CubeQuery, FormatOptions } from "@/spec";

/**
 * The normalized shape every chart family consumes. This is THE abstraction seam:
 * components never see a Cube ResultSet or Recharts prop shapes — only this.
 * See docs/01-spec-schema.md §6.
 */

export interface SeriesValueMeta {
  /** Resolved formatting (auto from member meta.quantity/unit, then spec overrides). */
  format?: FormatOptions;
  unit?: string;
  quantity?: string;
  convert?: boolean;
  axis?: "left" | "right";
  stackId?: string;
}

export interface NormalizedSeries {
  /** Stable series id — a measure name (mode "measures") or a pivot value (mode "pivot"). */
  key: string;
  label: string;
  /** Aligned 1:1 with `categories`; null = gap. */
  data: (number | null)[];
  colorToken?: ChartColorToken;
  meta?: SeriesValueMeta;
}

export interface NormalizedChartData {
  /** x labels (time buckets or dimension values), aligned to every series' `data` index. */
  categories: (string | number)[];
  series: NormalizedSeries[];
  raw: {
    /** resultSet.tablePivot() — for tables / KPIs / scatter / debug. */
    rows: Record<string, unknown>[];
    /** resultSet.annotation() — titles, types, member meta. */
    annotation?: ResultAnnotation;
    /** The RESOLVED (literal, variables-substituted) query that produced this. */
    query: CubeQuery;
  };
  /** true when noFilter dropped everything or the query returned zero rows. */
  empty: boolean;
}

/** Subset of Cube's annotation we rely on for labels + formatting. */
export interface AnnotatedMember {
  title?: string;
  shortTitle?: string;
  type?: string;
  /** Cube's `format` annotation (e.g. "currency", "percent") — refines auto formatting. */
  format?: string;
  meta?: { unit?: string; quantity?: string; convert?: boolean } & Record<string, unknown>;
}
export interface ResultAnnotation {
  measures: Record<string, AnnotatedMember>;
  dimensions: Record<string, AnnotatedMember>;
  segments: Record<string, AnnotatedMember>;
  timeDimensions: Record<string, AnnotatedMember>;
}

export interface QueryState {
  data?: NormalizedChartData;
  isLoading: boolean;
  error?: Error;
}
