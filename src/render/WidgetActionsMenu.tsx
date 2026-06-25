import * as React from "react";
import { Image as ImageIcon, MoreVertical, RefreshCw, Sheet } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/components/ui/utils";

import { downloadFile, rowsToCsv } from "./csv";
import { exportPng } from "./imageExport";

export interface WidgetActionsMenuProps {
  /** Widget title — used to name the exported file. */
  title?: string;
  /** Resolved rows behind the chart (for CSV export). */
  rows: Record<string, unknown>[];
  /** Force a re-fetch (Refresh). */
  refetch?: () => void;
  /** The widget's DOM node, for image (PNG / SVG) export. */
  captureRef?: React.RefObject<HTMLElement | null>;
}

/**
 * The chart chrome's actions menu (data + image export, refresh) — the
 * embeddability seam that lets a dashboard viewer get a chart out (as data or a
 * picture) and refresh stale data without leaving the view. Renders nothing when
 * there's nothing to offer.
 */
export function WidgetActionsMenu({
  title,
  rows,
  refetch,
  captureRef,
}: WidgetActionsMenuProps): React.ReactElement | null {
  const [busy, setBusy] = React.useState(false);
  const canCsv = rows.length > 0;
  const canImage = !!captureRef;
  if (!canCsv && !refetch && !canImage) return null;

  const exportCsv = (): void => {
    const name =
      (title ?? "chart").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "chart";
    downloadFile(rowsToCsv(rows), `${name}.csv`);
  };

  const doPng = async (): Promise<void> => {
    const node = captureRef?.current;
    if (!node || busy) return;
    setBusy(true);
    try {
      await exportPng(node, title);
    } finally {
      setBusy(false);
    }
  };

  // Stop pointer/mouse-down from starting an RGL drag (the menu lives in the drag handle).
  const stop = (e: React.SyntheticEvent): void => e.stopPropagation();

  const itemClass = (enabled = true): string =>
    cn(
      "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent",
      !enabled && "cursor-not-allowed opacity-50",
    );

  return (
    <Popover>
      <PopoverTrigger
        onMouseDown={stop}
        onPointerDown={stop}
        onTouchStart={stop}
        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Chart actions"
        title="Actions"
      >
        <MoreVertical className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1" onMouseDown={stop} onPointerDown={stop} onTouchStart={stop}>
        {refetch ? (
          <button type="button" onClick={refetch} className={itemClass()}>
            <RefreshCw className="size-3.5 text-muted-foreground" />
            Refresh
          </button>
        ) : null}
        {canImage ? (
          <button type="button" onClick={doPng} disabled={busy} className={itemClass(!busy)}>
            <ImageIcon className="size-3.5 text-muted-foreground" />
            Export PNG
          </button>
        ) : null}
        <button type="button" onClick={exportCsv} disabled={!canCsv} className={itemClass(canCsv)}>
          <Sheet className="size-3.5 text-muted-foreground" />
          Export CSV
        </button>
      </PopoverContent>
    </Popover>
  );
}
