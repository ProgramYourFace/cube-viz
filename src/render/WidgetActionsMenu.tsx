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
  const [pngError, setPngError] = React.useState<string | null>(null);
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
    setPngError(null);
    try {
      await exportPng(node, title);
    } catch (e: unknown) {
      // html-to-image rejects on a tainted canvas (cross-origin map/WebGL tiles via
      // canvas.toDataURL, cross-origin <img>). Surface it instead of leaving an
      // unhandled promise rejection with no feedback.
      setPngError(e instanceof Error ? e.message : "Couldn't export the image.");
    } finally {
      setBusy(false);
    }
  };

  // Stop pointer/mouse-down from starting an RGL drag (the menu lives in the drag handle).
  const stop = (e: React.SyntheticEvent): void => e.stopPropagation();

  const itemClass = (enabled = true): string =>
    cn("cv-menu-item", !enabled && "cv-menu-item--disabled");

  return (
    <Popover>
      <PopoverTrigger
        onMouseDown={stop}
        onPointerDown={stop}
        onTouchStart={stop}
        className="cv-menu-trigger"
        aria-label="Chart actions"
        title="Actions"
      >
        <MoreVertical />
      </PopoverTrigger>
      <PopoverContent align="end" className="cv-menu" onMouseDown={stop} onPointerDown={stop} onTouchStart={stop}>
        {refetch ? (
          <button type="button" onClick={refetch} className={itemClass()}>
            <RefreshCw />
            Refresh
          </button>
        ) : null}
        {canImage ? (
          <button type="button" onClick={doPng} disabled={busy} className={itemClass(!busy)}>
            <ImageIcon />
            Export PNG
          </button>
        ) : null}
        <button type="button" onClick={exportCsv} disabled={!canCsv} className={itemClass(canCsv)}>
          <Sheet />
          Export CSV
        </button>
        {pngError ? (
          <p className="cv-menu-error">{pngError}</p>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
