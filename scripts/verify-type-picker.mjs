/*
 * scripts/verify-type-picker.mjs — "does every chart-type tile draw ITS OWN type?"
 *
 * The regression guard for a bug the screenshots could not catch (`bun run shots` only
 * proves the tiles rendered SOMETHING): the tiles in the chart-type picker flashed the
 * right family and then settled into something that looked like a plain line. See
 * `docs`-free summary in the header of `src/editor/chart/onchart/CenterTypePicker.tsx`:
 * a tile is an ICON of a chart type, so "it drew the wrong shape" is a correctness bug,
 * not a cosmetic one.
 *
 * Two things are checked, per tile, per sample:
 *
 *  1. FORM — the geometry a family is recognisable BY, read structurally rather than by
 *     eye: area → a path with a real fill, line → a stroked path with `fill:none`,
 *     bar/heatmap → rects, pie → arc paths in the polar group, scatter → dots, kpi → its
 *     value text, table → a table with rows. A tile that draws another family's form (or
 *     nothing at all) fails.
 *
 *  2. PAINT — the form has to be VISIBLE. A fill declared as `url(#…)` must resolve to a
 *     gradient in the same document (a mis-scoped resource id leaves the stroke alone —
 *     which looks exactly like a line), and the effective opacity of that fill —
 *     `fill-opacity` × the gradient's strongest stop — must clear MIN_FILL_OPACITY.
 *     This is the assertion that catches the reported bug: @tanstack/charts' `areaY`
 *     defaults `fill-opacity` to 0.2, so an overlap-mode area whose opacity ramp lives
 *     ONLY in its gradient stops (0.06 → 0.4) paints at 0.012 → 0.08 and vanishes.
 *
 * Both are sampled REPEATEDLY (the picker draws a canned sample first and swaps in the
 * user's own rows when the fetch lands), and the picker's `/load` is delayed so that swap
 * is actually exercised instead of racing past. Both field shapes matter, so both seeds
 * of `playground/editor.tsx` are driven: `default` (a colour-split → the area family
 * stacks) and `measures` (two independent measures → the area family OVERLAPS, which is
 * the shape that regressed).
 *
 * Env: SHOTS_BASE_URL, PW_EXECUTABLE_PATH, PICKER_LOAD_DELAY_MS — as in scripts/shots.mjs.
 * Exits non-zero, with a per-tile × per-sample table, on any mismatch.
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Delay applied to the PICKER's capped /load so the sample→real swap is observable. */
const LOAD_DELAY_MS = Number(process.env.PICKER_LOAD_DELAY_MS ?? 1500);
/** When to look. Before, during and well after the swap. */
const SAMPLE_AT_MS = [250, 900, 2200, 5200];
/**
 * The weakest fill that still reads as a fill at tile size (~112×68 CSS px). The area
 * family's own intent is 0.4 at the strongest point of its ramp; the bug painted 0.08.
 */
const MIN_FILL_OPACITY = 0.15;

/* ─────────────────────────── server + browser (as shots.mjs) ─────────────────────── */

async function startServer() {
  if (process.env.SHOTS_BASE_URL) {
    const baseUrl = process.env.SHOTS_BASE_URL.replace(/\/$/, "");
    console.log(`[verify] reusing server at ${baseUrl}`);
    return { baseUrl, close: async () => {} };
  }
  process.env.CUBE_MOCK = "1";
  const { createServer } = await import("vite");
  const server = await createServer({
    root: ROOT,
    configFile: resolve(ROOT, "vite.config.ts"),
    logLevel: "warn",
    server: { port: 0, host: "127.0.0.1", strictPort: false },
  });
  await server.listen();
  const address = server.httpServer?.address();
  if (!address || typeof address === "string") throw new Error("vite did not report a port");
  const baseUrl = `http://127.0.0.1:${address.port}`;
  console.log(`[verify] vite dev server on ${baseUrl}`);
  return { baseUrl, close: () => server.close() };
}

async function launchBrowser() {
  const executablePath = process.env.PW_EXECUTABLE_PATH;
  if (executablePath) {
    const { chromium } = await import("playwright-core");
    return chromium.launch({ executablePath, args: ["--no-sandbox"] });
  }
  const { chromium } = await import("playwright");
  try {
    return await chromium.launch({ args: ["--no-sandbox"] });
  } catch (err) {
    throw new Error(
      "could not launch Chromium. Run `bunx playwright install --with-deps chromium`, " +
        "or point PW_EXECUTABLE_PATH at an existing binary (locally: /opt/pw-browsers/chromium).\n" +
        `  cause: ${err instanceof Error ? err.message.split("\n")[0] : err}`,
    );
  }
}

/* ──────────────────────────── what each family must draw ────────────────────────── */

/**
 * form → the families allowed to produce it. Keyed the way the in-page reader below
 * classifies a tile, so adding a family means adding one line here.
 */
const EXPECTED_FORM = {
  line: "stroke",
  area: "fill",
  bar: "rects",
  heatmap: "rects",
  pie: "arcs",
  scatter: "dots",
  kpi: "value",
  table: "table",
};

/* ───────────────────────────── the in-page tile reader ──────────────────────────── */

/**
 * Runs in the page. For every `.cv-type-tile`, report the family it claims
 * (`data-family`), the FORM it drew, and the weakest effective fill opacity among the
 * marks it filled. Pure observation — every verdict is computed in node.
 */
const READ_TILES = () => {
  const paintOf = (el, doc) => {
    const cs = getComputedStyle(el);
    const declared = el.getAttribute("fill") ?? cs.fill;
    const fillOpacity = Number(cs.fillOpacity === "" ? 1 : cs.fillOpacity);
    const ref = /^url\(["']?#([^"')]+)["']?\)$/.exec(String(declared).trim());
    if (!ref) {
      const none = !declared || declared === "none" || /rgba\(0, 0, 0, 0\)/.test(declared);
      return { filled: !none, opacity: none ? 0 : fillOpacity, unresolved: false };
    }
    const server = doc.getElementById(ref[1]);
    if (!server) return { filled: true, opacity: 0, unresolved: true, ref: ref[1] };
    const stops = [...server.querySelectorAll("stop")].map((s) => {
      const so = getComputedStyle(s).stopOpacity;
      return Number(so === "" ? 1 : so);
    });
    const strongest = stops.length > 0 ? Math.max(...stops) : 1;
    return { filled: true, opacity: fillOpacity * strongest, unresolved: false, ref: ref[1] };
  };

  return [...document.querySelectorAll(".cv-type-tile")].map((tile, index) => {
    const family = tile.getAttribute("data-family") ?? "?";
    const out = { index, family, form: "none", fills: [], unresolved: [] };
    // The two DOM-drawing families first, and conclusively: both plant small icon <svg>s
    // (a sort button, a trend arrow) inside the figure that would otherwise be read as
    // chart marks.
    if (tile.querySelector(".cv-type-tile-canvas .cv-kpi-value")) {
      out.form = "value";
      return out;
    }
    const table = tile.querySelector(".cv-type-tile-canvas table");
    if (table && table.querySelectorAll("tbody tr").length > 0) {
      out.form = "table";
      out.counts = { rows: table.querySelectorAll("tbody tr").length };
      return out;
    }
    // ONLY the chart container: when a tile has no preview yet it renders the family's
    // lucide ICON directly in the figure, and that icon is itself an <svg> of stroked
    // paths — reading it would report every waiting tile as a "line".
    const canvas = tile.querySelector(".cv-type-tile-canvas");
    const svg = canvas?.querySelector("svg");
    if (!svg) return out;

    const vb = svg.viewBox.baseVal;
    let stroked = 0;
    let arcs = 0;
    for (const path of svg.querySelectorAll("path")) {
      const paint = paintOf(path, svg.ownerDocument);
      const polar = path.closest('[data-ts-key*="pie"], [data-ts-key*="polar"], [class*="polar"]');
      if (paint.unresolved) out.unresolved.push(paint.ref);
      if (paint.filled) {
        if (polar) arcs += 1;
        else out.fills.push(Math.round(paint.opacity * 1000) / 1000);
      } else if ((path.getAttribute("stroke") ?? getComputedStyle(path).stroke) !== "none") {
        stroked += 1;
      }
    }
    // A rect the size of the surface is the chart background, not a mark.
    let rects = 0;
    for (const rect of svg.querySelectorAll("rect")) {
      const paint = paintOf(rect, svg.ownerDocument);
      if (!paint.filled) continue;
      const w = Number(rect.getAttribute("width") ?? 0);
      const h = Number(rect.getAttribute("height") ?? 0);
      if (w >= vb.width - 1 && h >= vb.height - 1) continue;
      rects += 1;
      out.fills.push(Math.round(paint.opacity * 1000) / 1000);
    }
    // Scatter draws <circle> marks; the cartesian families also emit invisible hit
    // circles, so dots only decide the form when nothing else drew.
    const dots = svg.querySelectorAll("circle").length;

    if (arcs > 0) out.form = "arcs";
    else if (rects > 0) out.form = "rects";
    else if (out.fills.length > 0) out.form = "fill";
    else if (stroked > 0) out.form = "stroke";
    else if (dots > 0) out.form = "dots";
    out.counts = { stroked, arcs, rects, dots, filled: out.fills.length };
    return out;
  });
};

/* ────────────────────────────────── one seed's run ──────────────────────────────── */

const failures = [];

async function verifySeed(browser, baseUrl, seed) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    locale: "en-US",
    timezoneId: "UTC",
    colorScheme: "light",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

  // The chart's own /load is first and must stay fast (the picker only mounts once the
  // editor has drawn); every later /load is the picker's capped preview fetch.
  let loads = 0;
  await page.route("**/cubejs-api/v1/load**", async (route) => {
    loads += 1;
    if (loads > 1) await new Promise((done) => setTimeout(done, LOAD_DELAY_MS));
    await route.continue();
  });

  try {
    await page.goto(`${baseUrl}/editor.html?seed=${seed}`, { waitUntil: "load", timeout: 60_000 });
    await page.waitForSelector('[data-slot="chart-edit-overlay"] svg', {
      state: "visible",
      timeout: 30_000,
    });

    const trigger = page
      .getByRole("button", { name: /^line$/i })
      .and(page.getByTitle("Change chart type"));
    await trigger.waitFor({ state: "visible", timeout: 15_000 });
    await trigger.click();
    await page.locator(".cv-type-picker").waitFor({ state: "visible", timeout: 15_000 });
    const opened = Date.now();

    const samples = [];
    for (const at of SAMPLE_AT_MS) {
      const wait = at - (Date.now() - opened);
      if (wait > 0) await page.waitForTimeout(wait);
      samples.push({ at, tiles: await page.evaluate(READ_TILES) });
    }
    if (loads < 2) {
      failures.push(`${seed}: the picker never fetched its own preview rows (loads=${loads})`);
    }

    // ── the table (always printed: it is the artifact a human reads) ──
    const last = samples[samples.length - 1].tiles;
    console.log(`\n[verify] seed=${seed}  tile × sample → form (weakest fill opacity)`);
    console.log(
      `  ${"tile".padEnd(20)}${SAMPLE_AT_MS.map((s) => `${s}ms`.padEnd(18)).join("")}`,
    );
    for (let i = 0; i < last.length; i += 1) {
      const cells = samples.map(({ tiles }) => {
        const t = tiles[i];
        if (!t) return "—".padEnd(18);
        const weakest = t.fills.length > 0 ? Math.min(...t.fills) : undefined;
        const paint = t.unresolved.length > 0 ? " UNRESOLVED" : weakest === undefined ? "" : ` ${weakest}`;
        return `${t.form}${paint}`.padEnd(18);
      });
      console.log(`  ${`${last[i].index}:${last[i].family}`.padEnd(20)}${cells.join("")}`);
    }

    // ── the verdicts ──
    for (const { at, tiles } of samples) {
      for (const tile of tiles) {
        const where = `${seed} @${at}ms tile ${tile.index} (${tile.family})`;
        const expected = EXPECTED_FORM[tile.family];
        if (expected === undefined) {
          failures.push(`${where}: unknown family — add it to EXPECTED_FORM`);
          continue;
        }
        // A tile that has not drawn yet ("none") is legitimate while its own fetch
        // is in flight: a family that WILL show the user's data deliberately waits
        // as an icon rather than drawing a stand-in and swapping — that swap was
        // the "flashing" this check exists for. What must never happen is drawing
        // the WRONG type, at any moment, or never drawing at all (checked below).
        if (tile.form !== expected && tile.form !== "none") {
          failures.push(
            `${where}: drew "${tile.form}", expected "${expected}" ` +
              `— counts ${JSON.stringify(tile.counts ?? {})}`,
          );
        }
        if (tile.unresolved.length > 0) {
          failures.push(
            `${where}: fill references a paint server that is not in the document: ` +
              `${tile.unresolved.join(", ")} — the mark paints as its stroke only`,
          );
        }
        for (const opacity of tile.fills) {
          if (opacity < MIN_FILL_OPACITY) {
            failures.push(
              `${where}: a filled mark paints at ${opacity} effective opacity ` +
                `(< ${MIN_FILL_OPACITY}) — invisible at tile size, so the tile reads as a line`,
            );
            break;
          }
        }
      }
    }
    // By the last sample every tile must have settled into its own type — an icon
    // that never resolves would otherwise pass the "none is fine" rule above.
    for (const tile of last) {
      const expected = EXPECTED_FORM[tile.family];
      if (expected !== undefined && tile.form !== expected) {
        failures.push(
          `${seed} @final tile ${tile.index} (${tile.family}): settled on "${tile.form}", ` +
            `expected "${expected}" — the preview never resolved`,
        );
      }
    }

    if (errors.length > 0) {
      failures.push(`${seed}: ${errors.length} page error(s)\n    ${errors.slice(0, 5).join("\n    ")}`);
    }
  } catch (err) {
    failures.push(`${seed}: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    await context.close();
  }
}

/* ───────────────────────────────────── the run ──────────────────────────────────── */

const { baseUrl, close } = await startServer();
let browser;
try {
  browser = await launchBrowser();
  for (const seed of ["default", "measures"]) await verifySeed(browser, baseUrl, seed);
} finally {
  await browser?.close();
  await close();
}

if (failures.length > 0) {
  console.error(`\n[verify] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\n[verify] every tile drew — and painted — its own chart type.");
