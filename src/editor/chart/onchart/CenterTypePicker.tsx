import * as React from "react";
import { ChevronDown } from "lucide-react";

import { normalize } from "@/adapter";
import type { NormalizedChartData } from "@/adapter/types";
import { ChartRenderer, type FamilyRegistry } from "@/charts";
import { useCubeQuery, useOptionalDashboard } from "@/hooks";
import { useFamilyRegistry } from "@/provider";
import { createQueryResolver } from "@/variables";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";
import type { ChartFamily, ChartOptions, ChartSpec, CubeQuery } from "@/spec";

import { migrateToFamily } from "../helpers";
import { CustomizeSection, hasCustomizeOptions } from "../builder/CustomizeSection";
import { previewSpecFor, rankFamilies, suggestedFamilies, type FamilyFit } from "../builder/suggest";

export interface CenterTypePickerProps {
  spec: ChartSpec;
  update: (next: ChartSpec) => void;
  /** No fields placed yet — show the prominent centered chooser + build hint. */
  empty: boolean;
}

/** Switch the chart family, carrying field bindings across (kpi/scatter/table
 *  store fields in familyOptions, so a plain reset would empty the new chart). */
function useSetFamily(
  spec: ChartSpec,
  update: (next: ChartSpec) => void,
  families: FamilyRegistry,
): (next: ChartFamily) => void {
  return (next: ChartFamily): void => {
    if (next === spec.chart.family) return;
    update(migrateToFamily(spec, next, families));
  };
}

/**
 * The EMPTY-state chart-type chooser — a prominent centered card overlaid on the
 * placeholder until the first field is placed. Built charts switch type via the
 * {@link ChartTypePill} in the editor toolbar instead (an on-chart pill was hard to
 * click — the live chart sat above it — so the control lives in real layout now).
 */
export function CenterTypePicker({ spec, update, empty }: CenterTypePickerProps): React.ReactElement | null {
  const families = useFamilyRegistry();
  const family = spec.chart.family;
  const setFamily = useSetFamily(spec, update, families);

  if (!empty) return null;
  return (
    <div className="cv-type-chooser">
      <div className="cv-type-chooser-card">
        <p className="cv-type-chooser-title">Choose a chart type</p>
        <p className="cv-type-chooser-sub">
          Then add fields to the slots around the chart.
        </p>
        <TypePicker spec={spec} family={family} onPick={setFamily} families={families} />
      </div>
    </div>
  );
}

/**
 * The compact chart-type pill for the editor's top toolbar (built charts). Opens the
 * same tile grid + type-level Options popover the empty chooser uses. Rendered in normal
 * layout (not over the chart) so it's always clickable.
 */
export function ChartTypePill({ spec, update }: { spec: ChartSpec; update: (next: ChartSpec) => void }): React.ReactElement {
  const families = useFamilyRegistry();
  const family = spec.chart.family;
  const setFamily = useSetFamily(spec, update, families);
  const descriptor = families.require(family);
  const Icon = descriptor.icon;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="cv-type-pill"
          title="Change chart type"
        >
          <Icon className="cv-ec-icon cv-ec-icon--muted" />
          {descriptor.label}
          <ChevronDown className="cv-ec-icon--sm cv-ec-icon--muted" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className="cv-type-popover cv-type-popover--preview">
        <TypePicker spec={spec} family={family} onPick={setFamily} families={families} />
        {/* The few remaining type-level options (stacking, donut, KPI, table…). Most
            config is in-context: per-measure on the field pills, chrome on the chart.
            Families with nothing left (line / scatter) show no Options at all. */}
        {hasCustomizeOptions(family, families) ? (
          <div className="cv-type-popover-section cv-type-popover-section--divided">
            <p className="cv-type-popover-heading">Options</p>
            <CustomizeSection spec={spec} update={update} />
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

/* ────────────────────────────── the tile grid ─────────────────────────────── */

interface TypePickerProps {
  spec: ChartSpec;
  family: ChartFamily;
  onPick: (family: ChartFamily) => void;
  families: FamilyRegistry;
}

/**
 * The chart-type chooser: a tile grid where every tile is a MINIATURE OF THIS CHART
 * drawn as that type, split into "Suggested" (the types that fit the fields already
 * placed — see `builder/suggest.ts`) and "All types".
 *
 * The two halves answer the two questions a non-technical user actually has. The
 * suggestions answer "which of these is right for my data?" in one short line of task
 * language ("2 measures over time"). The previews answer "what does this one even look
 * like?" — an icon cannot, and flipping types to find out is the single most common way
 * people used to arrive at their chart.
 */
function TypePicker({ spec, family, onPick, families }: TypePickerProps): React.ReactElement {
  const ranked = React.useMemo(() => rankFamilies(families, spec), [families, spec]);
  const suggested = React.useMemo(() => suggestedFamilies(ranked), [ranked]);
  const reasons = React.useMemo(
    () => new Map(ranked.map((f) => [f.family, f] as const)),
    [ranked],
  );
  const fitting = React.useMemo(
    () => new Set(ranked.filter((f) => f.fits).map((f) => f.family)),
    [ranked],
  );
  const previews = useTilePreviews(spec, families, fitting);

  const tile = (fit: FamilyFit, showReason: boolean): React.ReactElement => (
    <FamilyTile
      key={fit.family}
      fit={fit}
      active={fit.family === family}
      preview={previews.get(fit.family)}
      families={families}
      reason={showReason ? fit.reason : undefined}
      onPick={onPick}
    />
  );

  // Registry order (not fit order) for "All types" — the grid must not reshuffle
  // under the user's cursor every time a field is added. Query-less families (a host
  // AI tile) are not RANKED (fields say nothing about them) but must still be
  // listed, so they get a neutral entry.
  const all = families.list().map(
    (descriptor): FamilyFit =>
      reasons.get(descriptor.family) ?? {
        family: descriptor.family,
        descriptor,
        score: 0,
        fits: false,
        reason: descriptor.label,
      },
  );

  return (
    <div className="cv-type-picker">
      {suggested.length > 0 ? (
        <div className="cv-type-popover-section">
          <p className="cv-type-popover-heading">Suggested for your fields</p>
          <div className="cv-type-grid cv-type-grid--preview">
            {suggested.map((f) => tile(f, true))}
          </div>
        </div>
      ) : null}

      <div className="cv-type-popover-section">
        <p className="cv-type-popover-heading">
          {suggested.length > 0 ? "All types" : "Chart type"}
        </p>
        <div className="cv-type-grid cv-type-grid--preview">
          {all.map((f) => tile(f, false))}
        </div>
      </div>
    </div>
  );
}

interface FamilyTileProps {
  fit: FamilyFit;
  active: boolean;
  preview?: TilePreview;
  families: FamilyRegistry;
  /** The short "why this type" line (Suggested group only). */
  reason?: string;
  onPick: (family: ChartFamily) => void;
}

/**
 * One tile: a miniature chart (or the family icon when there is nothing to draw), the
 * type's name, and — in the Suggested group — the one-line reason.
 *
 * The clickable button is an OVERLAY over the preview rather than its parent: a chart
 * contains its own focusable/interactive nodes, and nesting those inside a `<button>`
 * is both invalid and a keyboard trap. This way each tile is exactly one tab stop.
 */
function FamilyTile({
  fit,
  active,
  preview,
  families,
  reason,
  onPick,
}: FamilyTileProps): React.ReactElement {
  const Icon = fit.descriptor.icon;
  const label = fit.descriptor.label;
  return (
    <div className={cn("cv-type-tile", "cv-type-tile--card", active && "cv-type-tile--active")}>
      <div className="cv-type-tile-figure">
        {preview ? (
          <MiniChart
            // Remount (and so reset the error boundary) whenever what we're drawing
            // changes — a family that failed on the previous shape gets another go.
            key={preview.key}
            preview={preview}
            families={families}
            fallback={<Icon className="cv-ec-icon--lg" />}
          />
        ) : (
          <Icon className="cv-ec-icon--lg" />
        )}
      </div>
      <span className="cv-type-tile-caption">
        <span className="cv-type-tile-label">{label}</span>
        {reason ? <span className="cv-type-tile-reason">{reason}</span> : null}
      </span>
      {/* The hit target is a transparent overlay so the tile is exactly ONE tab stop
          and the (interactive, focusable) miniature underneath is never nested in it. */}
      <button
        type="button"
        onClick={() => onPick(fit.family)}
        aria-pressed={active}
        aria-label={reason ? `${label} — ${reason}` : label}
        title={fit.reason}
        className="cv-type-tile-hit"
      />
    </div>
  );
}

/* ───────────────────────────── the mini previews ──────────────────────────── */

/** Everything one tile needs to draw itself. */
interface TilePreview {
  /** Identity of what is being drawn — remounts the tile (and its error boundary). */
  key: string;
  data: NormalizedChartData;
  options: ChartOptions;
}

/** Tiles are ~112px wide: no axes, no legend, no tooltips, no entrance animation. */
function miniChrome(options: ChartOptions, families: FamilyRegistry): ChartOptions {
  // `chrome:"none"` is the line family's own compact mode (no ticks, no guides, no
  // keyboard, tight margin). Only set it where the family declares the option — a
  // stray key would sit unvalidated in another family's options.
  const supportsChrome =
    (families.defaults(options.family).familyOptions as Record<string, unknown> | undefined)
      ?.chrome !== undefined;
  return {
    ...options,
    legend: { ...options.legend, show: false },
    tooltip: { ...options.tooltip, show: false },
    axes: {
      x: { ...options.axes?.x, hide: true },
      y: { ...options.axes?.y, hide: true },
    },
    familyOptions: supportsChrome
      ? { ...options.familyOptions, chrome: "none" }
      : options.familyOptions,
  };
}

/** A query worth previewing: it groups by something Cube will actually compute. */
function renderable(query: CubeQuery | undefined): boolean {
  return (
    (query?.measures?.length ?? 0) > 0 ||
    (query?.dimensions?.length ?? 0) > 0 ||
    (query?.timeDimensions?.some((td) => td.granularity !== undefined) ?? false)
  );
}

/** Tiles need shape, not volume — cap the preview fetch well below the chart's. */
const PREVIEW_ROW_CAP = 200;

/** A no-op `useSyncExternalStore` subscribe for the no-dashboard path. */
const noopSubscribe = (): (() => void) => () => {};

/**
 * Build one {@link TilePreview} per family from the user's REAL data when the chart
 * has a renderable query, else from a small canned sample so the tiles still show
 * what each type looks like.
 *
 * Why the picker fetches at all: the editor's data is fetched *inside* `<CubeChart>`
 * (`useNormalizedSeries` → `useCubeQuery`) and never lifted — `onState` surfaces only
 * raw rows, not the normalized shape, and `CubeChart` is a render-layer component this
 * change does not own. So the picker loads the same query itself, capped at
 * {@link PREVIEW_ROW_CAP} rows, and re-normalizes it per family. The request only
 * happens while the popover is open (Radix unmounts closed content), and the empty
 * chooser — the other place this grid appears — has no query to load at all.
 */
function useTilePreviews(
  spec: ChartSpec,
  families: FamilyRegistry,
  /** Families whose required slots the current fields can fill (see `suggest.ts`). */
  fitting: ReadonlySet<ChartFamily>,
): Map<ChartFamily, TilePreview> {
  const query = spec.query;
  const live = renderable(query);

  const previewQuery = React.useMemo<CubeQuery>(() => {
    const limit = query?.limit;
    return {
      ...(query ?? {}),
      limit: typeof limit === "number" ? Math.min(limit, PREVIEW_ROW_CAP) : PREVIEW_ROW_CAP,
    };
  }, [query]);

  // `useCubeQuery` wants a RESOLVED query, so substitute the dashboard's `{var}`
  // bindings the same way `useNormalizedSeries` does — a chart being edited inside a
  // dashboard binds its date range to a variable, and an unresolved token would make
  // the preview request fail where the real chart succeeds. Standalone: verbatim.
  const dashboard = useOptionalDashboard();
  const resolverRef = React.useRef<ReturnType<typeof createQueryResolver> | null>(null);
  if (resolverRef.current === null) resolverRef.current = createQueryResolver();
  const resolveOnce = resolverRef.current;
  const getResolved = (): CubeQuery =>
    dashboard ? resolveOnce(previewQuery, dashboard.store.getAll(), dashboard.decls) : previewQuery;
  const resolvedQuery = React.useSyncExternalStore(
    dashboard ? dashboard.store.subscribe : noopSubscribe,
    getResolved,
    getResolved,
  );

  const { resultSet } = useCubeQuery(resolvedQuery, { skip: !live });

  return React.useMemo(() => {
    const out = new Map<ChartFamily, TilePreview>();
    for (const descriptor of families.list()) {
      const f = descriptor.family;
      // A query-less family (a host AI tile) draws from its own state — there is no
      // "this chart as that type" to show, so it keeps its icon.
      if (descriptor.queryless) continue;

      // Only families the current fields can actually FILL preview with real data —
      // a scatter missing its second measure would otherwise draw the family's own
      // "No data", which tells the user nothing about what a scatter looks like. Those
      // fall through to the canned illustration instead.
      const real =
        resultSet && fitting.has(f)
          ? realPreview(spec, f, families, resultSet, resolvedQuery)
          : undefined;
      const preview = real ?? samplePreview(f, families);
      if (preview) out.set(f, preview);
    }
    return out;
  }, [spec, families, resultSet, resolvedQuery, fitting]);
}

/** The user's own data, re-bound into `family`'s wells and re-normalized for it. */
function realPreview(
  spec: ChartSpec,
  family: ChartFamily,
  families: FamilyRegistry,
  resultSet: NonNullable<ReturnType<typeof useCubeQuery>["resultSet"]>,
  query: CubeQuery,
): TilePreview | undefined {
  try {
    // The CURRENT family previews the user's actual arrangement; the others show the
    // most flattering arrangement the same fields would make (see `previewSpecFor`).
    const source = family === spec.chart.family ? spec : previewSpecFor(families, spec, family);
    const options = miniChrome(source.chart, families);
    const data = normalize(resultSet, options, source.query ?? query, undefined, families);
    if (data.empty) return undefined;
    return { key: `${family}:live:${JSON.stringify(query)}`, data, options };
  } catch {
    // A family that cannot make sense of this shape falls back to its icon; the
    // picker itself must never break.
    return undefined;
  }
}

/* ── the canned sample (no live data: the empty chooser, a loading/failed fetch) ── */

const S_CAT = "sample.category";
const S_GROUP = "sample.group";
const S_VALUE = "sample.value";
const S_COUNT = "sample.count";

const S_CATEGORIES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const S_VALUES = [18, 27, 21, 34, 26, 39];
const S_COUNTS = [12, 9, 17, 14, 22, 16];

/** 2 series × 6 categories, plus the (category × group) rows the row-reading
 *  families (scatter / heatmap / table / kpi) consume. */
const SAMPLE_ROWS: Record<string, unknown>[] = S_CATEGORIES.flatMap((c, i) => [
  { [S_CAT]: c, [S_GROUP]: "North", [S_VALUE]: S_VALUES[i], [S_COUNT]: S_COUNTS[i] },
  {
    [S_CAT]: c,
    [S_GROUP]: "South",
    [S_VALUE]: Math.round(S_VALUES[i] * 0.62),
    [S_COUNT]: Math.round(S_COUNTS[i] * 0.78),
  },
]);

const SAMPLE_QUERY: CubeQuery = {
  measures: [S_VALUE, S_COUNT],
  dimensions: [S_CAT, S_GROUP],
};

/** Friendly titles so the sample table/tooltips read as words, not member names. */
const SAMPLE_ANNOTATION = {
  measures: {
    [S_VALUE]: { title: "Value", shortTitle: "Value", type: "number" },
    [S_COUNT]: { title: "Count", shortTitle: "Count", type: "number" },
  },
  dimensions: {
    [S_CAT]: { title: "Day", shortTitle: "Day", type: "string" },
    [S_GROUP]: { title: "Group", shortTitle: "Group", type: "string" },
  },
  segments: {},
  timeDimensions: {},
};

function sampleData(seriesCount: 1 | 2): NormalizedChartData {
  const series = [
    { key: S_VALUE, label: "Value", data: S_VALUES as (number | null)[], colorToken: "chart-1" as const },
    { key: S_COUNT, label: "Count", data: S_COUNTS as (number | null)[], colorToken: "chart-2" as const },
  ].slice(0, seriesCount);
  return {
    categories: S_CATEGORIES,
    series,
    raw: { rows: SAMPLE_ROWS, query: SAMPLE_QUERY, annotation: SAMPLE_ANNOTATION },
    empty: false,
  };
}

const SAMPLE_ONE = sampleData(1);
const SAMPLE_TWO = sampleData(2);

/** Category + measures — the arrangement every mapping-driven family reads. */
const sampleCartesian = (family: ChartFamily, members: string[]): ChartOptions => ({
  family,
  mapping: { category: { member: S_CAT }, series: { mode: "measures", members } },
});

/**
 * A hand-authored illustration per builtin family. Deliberately NOT derived by
 * migrating one sample spec: a channel-preserving migration drops what the
 * destination has no channel for (a bar's colour split has no home in a heatmap's
 * rows), which would leave exactly the tiles that most need an illustration blank.
 */
const SAMPLE_OPTIONS: Record<string, ChartOptions> = {
  bar: sampleCartesian("bar", [S_VALUE, S_COUNT]),
  line: sampleCartesian("line", [S_VALUE, S_COUNT]),
  area: { ...sampleCartesian("area", [S_VALUE, S_COUNT]), stackMode: "stacked" },
  pie: sampleCartesian("pie", [S_VALUE]),
  scatter: { family: "scatter", familyOptions: { x: S_VALUE, y: S_COUNT } },
  heatmap: {
    family: "heatmap",
    mapping: {
      category: { member: S_CAT },
      series: { mode: "pivot", value: S_VALUE, pivot: S_GROUP },
    },
  },
  kpi: { family: "kpi", familyOptions: { measure: S_VALUE, display: "number" } },
  table: {
    family: "table",
    familyOptions: { columns: [{ member: S_CAT }, { member: S_VALUE }, { member: S_COUNT }] },
  },
};

function samplePreview(family: ChartFamily, families: FamilyRegistry): TilePreview | undefined {
  const options = SAMPLE_OPTIONS[family] ?? sampleCartesian(family, [S_VALUE, S_COUNT]);
  return {
    key: `${family}:sample`,
    data: family === "pie" ? SAMPLE_ONE : SAMPLE_TWO,
    options: miniChrome(options, families),
  };
}

/* ──────────────────────────── rendering one tile ──────────────────────────── */

interface MiniChartProps {
  preview: TilePreview;
  families: FamilyRegistry;
  fallback: React.ReactNode;
}

/**
 * The miniature itself. Drawn at a comfortable size and scaled down by CSS (the chart
 * shell enforces a 200px minimum height, and a 112px-tall chart would otherwise be all
 * margin), inert to pointer + keyboard, and memoized on the preview identity so
 * hovering the grid never re-renders eight charts.
 */
const MiniChart = React.memo(function MiniChart({
  preview,
  families,
  fallback,
}: MiniChartProps): React.ReactElement {
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Families hardcode `keyboard: true`, which makes the plot a tab stop. A tile is a
  // picture, not a control, so drop anything focusable out of the tab order.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (const node of el.querySelectorAll<HTMLElement>("[tabindex]")) node.tabIndex = -1;
  });

  return (
    <TileErrorBoundary fallback={fallback}>
      <div ref={ref} className="cv-type-tile-preview" aria-hidden>
        <div className="cv-type-tile-canvas">
          <ChartRenderer
            data={preview.data}
            options={preview.options}
            config={{}}
            registry={families}
          />
        </div>
      </div>
    </TileErrorBoundary>
  );
});

interface TileErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

/**
 * A per-tile boundary. A family that cannot render the current shape must show its
 * icon — it must never take the picker (the user's only way out of that shape) down
 * with it. Reset by remounting on a new `preview.key`.
 */
class TileErrorBoundary extends React.Component<TileErrorBoundaryProps, { failed: boolean }> {
  constructor(props: TileErrorBoundaryProps) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  render(): React.ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
