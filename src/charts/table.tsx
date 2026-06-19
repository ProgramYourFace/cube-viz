import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/components/ui/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import type { ChartFormat } from "@/format";
import type { ResultAnnotation } from "@/adapter/types";
import type { ChartComponentProps } from "./types";
import type { CondFormatRule, TableColumnOpt, TableFamilyOptions } from "./defaults";

/**
 * `table` — covers table + pivot (docs/02-chart-options.md §2.7). Renders a
 * shadcn <Table> from `raw.rows` + annotation; client-side sort + paging. NOT
 * Recharts. Columns default to every annotated member, overridable/orderable
 * via `familyOptions.columns`.
 */
export function TableFamily({ data, options, format }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as TableFamilyOptions;
  const rows = data.raw.rows;
  const ann = data.raw.annotation;

  const columns = React.useMemo(
    () => resolveColumns(rows, ann, fo, format),
    [rows, ann, fo, format],
  );

  const [sort, setSort] = React.useState<{ member: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = React.useState(0);

  const sortable = fo.sortable !== false;
  const pageSize = fo.pageSize ?? 25;

  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => compareCell(a[sort.member], b[sort.member]) * dir);
  }, [rows, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = sorted.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const onSort = (member: string) => {
    if (!sortable) return;
    setSort((prev) =>
      prev?.member === member
        ? { member, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { member, dir: "desc" },
    );
    setPage(0);
  };

  const compact = fo.rowHeight === "compact";

  return (
    <div className="flex h-full w-full flex-col">
      <div className={cn("w-full", fo.stickyHeader && "max-h-full overflow-auto")}>
        <Table>
          <TableHeader className={cn(fo.stickyHeader && "sticky top-0 z-10 bg-background")}>
            <TableRow>
              {fo.showRowNumbers && <TableHead className="w-10 text-right">#</TableHead>}
              {columns.map((col) => (
                <TableHead
                  key={col.member}
                  className={alignClass(col.align)}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {sortable ? (
                    <Button
                      variant="ghost"
                      className="-ml-2 h-7 px-2 text-muted-foreground"
                      onClick={() => onSort(col.member)}
                    >
                      {col.label}
                      <SortIcon active={sort?.member === col.member} dir={sort?.dir} />
                    </Button>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((row, ri) => (
              <TableRow key={ri}>
                {fo.showRowNumbers && (
                  <TableCell className={cn("text-right text-muted-foreground", compact && "py-1")}>
                    {safePage * pageSize + ri + 1}
                  </TableCell>
                )}
                {columns.map((col) => {
                  const tint = condTint(col.member, row[col.member], fo.conditionalFormat);
                  return (
                    <TableCell
                      key={col.member}
                      className={cn(alignClass(col.align), compact && "py-1")}
                      style={tint ? { color: tint } : undefined}
                    >
                      {col.render(row[col.member])}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            {pageRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (fo.showRowNumbers ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {sorted.length > pageSize && (
        <div className="flex items-center justify-between gap-2 px-2 py-2 text-sm text-muted-foreground">
          <span>
            {safePage * pageSize + 1}–{Math.min((safePage + 1) * pageSize, sorted.length)} of{" "}
            {sorted.length}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="h-7 px-2"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              className="h-7 px-2"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={safePage >= pageCount - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface ResolvedColumn {
  member: string;
  label: string;
  align?: TableColumnOpt["align"];
  width?: number;
  render: (value: unknown) => React.ReactNode;
}

/** Default columns = every member in `rows`/annotation; overridable + orderable. */
function resolveColumns(
  rows: Record<string, unknown>[],
  ann: ResultAnnotation | undefined,
  fo: TableFamilyOptions,
  format: ChartFormat,
): ResolvedColumn[] {
  const allMembers = rows.length > 0 ? Object.keys(rows[0]) : memberKeys(ann);

  const specs: TableColumnOpt[] = fo.columns?.length
    ? fo.columns
    : allMembers.map((member) => ({ member }) as TableColumnOpt);

  return specs
    .filter((c) => !c.hidden)
    .map((c) => {
      const member = c.member;
      const meta = ann ? memberMeta(ann, member) : undefined;
      const isMeasure = ann ? member in ann.measures : false;
      const label = c.label ?? meta?.shortTitle ?? meta?.title ?? member;
      const align: TableColumnOpt["align"] = c.align ?? (isMeasure ? "right" : "left");
      return {
        member,
        label,
        align,
        width: c.width,
        render: (value: unknown) => renderCell(value, isMeasure, member, format),
      };
    });
}

function renderCell(
  value: unknown,
  isMeasure: boolean,
  member: string,
  format: ChartFormat,
): React.ReactNode {
  if (value === null || value === undefined || value === "") return "—";
  if (isMeasure) {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? format.value(n, member) : String(value);
  }
  // Dimension/time: route through the category formatter (handles date buckets).
  return format.category(value as string | number);
}

function memberKeys(ann: ResultAnnotation | undefined): string[] {
  if (!ann) return [];
  return [
    ...Object.keys(ann.dimensions),
    ...Object.keys(ann.timeDimensions),
    ...Object.keys(ann.measures),
  ];
}

function memberMeta(ann: ResultAnnotation, member: string) {
  return (
    ann.measures[member] ??
    ann.dimensions[member] ??
    ann.timeDimensions[member] ??
    ann.segments[member]
  );
}

function alignClass(align?: TableColumnOpt["align"]): string {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

function SortIcon({ active, dir }: { active: boolean; dir?: "asc" | "desc" }): React.ReactElement {
  if (!active) return <ChevronsUpDown className="ml-1 size-3.5 opacity-50" />;
  return dir === "asc" ? (
    <ArrowUp className="ml-1 size-3.5" />
  ) : (
    <ArrowDown className="ml-1 size-3.5" />
  );
}

function compareCell(a: unknown, b: unknown): number {
  const an = typeof a === "number" ? a : Number(a);
  const bn = typeof b === "number" ? b : Number(b);
  if (Number.isFinite(an) && Number.isFinite(bn)) return an - bn;
  return String(a ?? "").localeCompare(String(b ?? ""));
}

/** Conditional cell tint: returns a `var(--chart-N)` color when a rule matches. */
function condTint(
  member: string,
  value: unknown,
  rules: CondFormatRule[] | undefined,
): string | undefined {
  if (!rules?.length) return undefined;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return undefined;
  for (const rule of rules) {
    if (rule.member !== member) continue;
    if (matches(n, rule.when.op, rule.when.value)) {
      return `var(--${rule.colorToken ?? "chart-1"})`;
    }
  }
  return undefined;
}

function matches(value: number, op: CondFormatRule["when"]["op"], target: number): boolean {
  switch (op) {
    case "gt":
      return value > target;
    case "lt":
      return value < target;
    case "gte":
      return value >= target;
    case "lte":
      return value <= target;
    case "eq":
      return value === target;
  }
}
