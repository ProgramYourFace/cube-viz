/**
 * Per-widget image export — PNG for any widget (charts, KPI, table). Companion to
 * {@link ./csv} on the widget actions menu. Client-side, in-WebView: rasterizes the
 * live DOM node via html-to-image. (Vector SVG export is intentionally not offered
 * yet — see the menu — and will be revisited later.)
 */

import { toPng } from "html-to-image";

/** Slug a widget title into a safe file stem (shared with the CSV export). */
export function slugify(title: string | undefined, fallback = "chart"): string {
  return (
    (title ?? fallback).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || fallback
  );
}

/** Click-download an href (object URL or data URL). The anchor is attached to the
 *  DOM around the click — a detached anchor doesn't register a blob-URL download. */
function triggerDownload(href: string, filename: string): void {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Walk up from `node` to the first opaque background, so a transparent chart
 *  body still rasterizes onto the surface colour it visually sits on. */
function resolveBackground(node: HTMLElement): string {
  let el: HTMLElement | null = node;
  while (el) {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== "transparent" && !/^rgba\(0, 0, 0, 0\)?$/.test(bg)) return bg;
    el = el.parentElement;
  }
  return "#ffffff";
}

/** Rasterize a widget DOM node to a PNG and download it. Works for every widget
 *  family (the SVG charts and the HTML KPI/table alike). */
export async function exportPng(
  node: HTMLElement,
  title: string | undefined,
  scale = 2,
): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: scale,
    backgroundColor: resolveBackground(node),
    cacheBust: true,
  });
  triggerDownload(dataUrl, `${slugify(title)}.png`);
}
