import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";

import { cn } from "@/components/ui/utils";
import { rowKeyFor } from "./tanstack";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { ChartFormat } from "@/format";
import { formatDateValue, looksLikeIsoDate } from "@/format/dates";
import type { ResultAnnotation } from "@/adapter/types";
import type { ChartComponentProps } from "./types";
import type { CondFormatRule, TableColumnOpt, TableFamilyOptions } from "./defaults";

type TableRowData = Record<string, unknown>;

/** Rows past this count get a search box; below it the eye is faster than typing. */
const SEARCH_MIN_ROWS = 8;
/** Rows past this count tighten the cell padding. */
const COMPACT_MIN_ROWS = 12;

/**
 * `table` — covers table + pivot (docs/02-chart-options.md §2.7). A headless
 * TanStack Table over `raw.rows` + annotation: client-side sorting (shift-click
 * for multi-column), a global search over the FORMATTED cell text (so "29.6 mpg"
 * is searchable as the user reads it), and paging. NOT a chart-renderer family.
 * Columns default to every annotated member, overridable/orderable via
 * `familyOptions.columns`.
 */
export function TableFamily({ data, options, format }: ChartComponentProps): React.ReactElement {
  const fo = (options.familyOptions ?? {}) as TableFamilyOptions;
  const rows = data.raw.rows as TableRowData[];
  const ann = data.raw.annotation;

  const resolved = React.useMemo(
    () => resolveColumns(rows, ann, fo, format),
    [rows, ann, fo, format],
  );

  const columns = React.useMemo<ColumnDef<TableRowData, unknown>[]>(
    () =>
      resolved.map((col) => ({
        id: col.member,
        accessorFn: (row) => row[col.key],
        header: col.label,
        cell: (ctx) => col.render(ctx.getValue()),
        sortingFn: (a, b, id) => compareCell(a.getValue(id), b.getValue(id)),
        // Global search matches what the reader SEES, not the raw number.
        filterFn: (row, id, query: string) => rowMatches(col.text(row.getValue(id)), query),
        meta: col,
      })),
    [resolved],
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: fo.pageSize ?? 25,
  });

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: (row, _id, query: string) =>
      resolved.some((col) => rowMatches(col.text(row.original[col.key]), query)),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
    enableMultiSort: true,
    isMultiSortEvent: (e) => (e as React.MouseEvent).shiftKey,
  });

  const filteredCount = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const { pageIndex, pageSize } = table.getState().pagination;
  const searchable = rows.length > SEARCH_MIN_ROWS;
  // Density follows the DATA: a long table is worth compacting, a short one has
  // the room to breathe. Nobody has to decide this per chart.
  const compact = filteredCount > COMPACT_MIN_ROWS;
  const pageRows = table.getRowModel().rows;

  return (
    <div className="cv-table-family">
      {searchable && (
        <div className="cv-table-toolbar">
          <div className="cv-table-search">
            <Search className="cv-table-search-icon" />
            <Input
              className="cv-table-search-input"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search"
              aria-label="Search rows"
            />
          </div>
          {globalFilter && (
            <span className="cv-table-meta">
              {filteredCount} of {rows.length}
            </span>
          )}
        </div>
      )}
      <div className="cv-table-scroll cv-table-scroll--sticky">
        <Table>
          <TableHeader className="cv-table-header--sticky">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => {
                  const col = header.column.columnDef.meta as ResolvedColumn;
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      className={alignClass(col.align)}
                      style={col.width ? { width: col.width } : undefined}
                      aria-sort={
                        sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"
                      }
                    >
                      <Button
                        variant="ghost"
                        className="cv-table-sort"
                        onClick={header.column.getToggleSortingHandler()}
                        title="Sort (shift-click to add a column)"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <SortIcon dir={sorted || undefined} />
                      </Button>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {pageRows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const col = cell.column.columnDef.meta as ResolvedColumn;
                  const tint = condTint(col.member, cell.getValue(), fo.conditionalFormat);
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(alignClass(col.align), compact && "cv-table-cell--compact")}
                      style={tint ? { color: tint } : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            {pageRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={Math.max(1, columns.length)} className="cv-table-empty">
                  {globalFilter ? "No matches" : "No data"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageCount > 1 && (
        <div className="cv-table-pagination">
          <span>
            {pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, filteredCount)} of{" "}
            {filteredCount}
          </span>
          <div className="cv-table-pager">
            <Button
              variant="outline"
              className="cv-table-page-btn"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Prev
            </Button>
            <span className="cv-table-meta">
              {pageIndex + 1} / {pageCount}
            </span>
            <Button
              variant="outline"
              className="cv-table-page-btn"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export interface ResolvedColumn {
  /** The member as SELECTED (annotation lookups, sort identity, format rules). */
  member: string;
  /** The key this member actually occupies in a tablePivot row (see rowKeyFor). */
  key: string;
  label: string;
  align?: TableColumnOpt["align"];
  width?: number;
  render: (value: unknown) => React.ReactNode;
  /** The cell as plain text — what search matches against. */
  text: (value: unknown) => string;
}

/** Default columns = every member in `rows`/annotation; overridable + orderable. */
export function resolveColumns(
  rows: TableRowData[],
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
      const key = rowKeyFor(rows, member);
      const meta = ann ? memberMeta(ann, member) : undefined;
      const isMeasure = ann ? member in ann.measures : false;
      const label = c.label ?? meta?.shortTitle ?? meta?.title ?? member;
      const align: TableColumnOpt["align"] = c.align ?? (isMeasure ? "right" : "left");
      // Per-column `format` (decimals/prefix/suffix/currency/dateFormat/kind) re-binds
      // the formatter for THIS column only, merged over the chart-level `format`.
      const columnFormat = c.format && format.derive ? format.derive(c.format) : format;
      const text = (value: unknown) => cellText(value, isMeasure, member, columnFormat, c.format);
      return {
        member,
        key,
        label,
        align,
        width: c.width,
        render: (value: unknown) => text(value),
        text,
      };
    });
}

function cellText(
  value: unknown,
  isMeasure: boolean,
  member: string,
  format: ChartFormat,
  columnOptions: TableColumnOpt["format"] | undefined,
): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "number" && Number.isNaN(value)) return "—";
  // A timestamp-valued measure (`max(ping time)` = "last seen") arrives as an
  // ISO string, or the column says it is a date: never push that through the
  // numeric path, which printed NaN.
  if (columnOptions?.kind === "date" || (typeof value === "string" && looksLikeIsoDate(value))) {
    return formatDateValue(value as string | number, columnOptions);
  }
  if (isMeasure) {
    const n = typeof value === "number" ? value : Number(value);
    return Number.isFinite(n) ? String(format.value(n, member)) : String(value);
  }
  // Dimension/time: route through the category formatter (handles date buckets).
  return String(format.category(value as string | number));
}

/** Case-insensitive substring match; an empty query matches everything. */
export function rowMatches(text: string, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return text.toLowerCase().includes(q);
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
  if (align === "right") return "cv-table-cell--right";
  if (align === "center") return "cv-table-cell--center";
  return "cv-table-cell--left";
}

function SortIcon({ dir }: { dir?: "asc" | "desc" }): React.ReactElement {
  if (!dir) return <ChevronsUpDown className="cv-table-sort-icon cv-table-sort-icon--idle" />;
  return dir === "asc" ? (
    <ArrowUp className="cv-table-sort-icon" />
  ) : (
    <ArrowDown className="cv-table-sort-icon" />
  );
}

/** Numeric-aware comparator: numbers by value, everything else as text. */
export function compareCell(a: unknown, b: unknown): number {
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

