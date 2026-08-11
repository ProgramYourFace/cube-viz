/*
 * scripts/shots.mjs — the screenshot harness (`bun run shots`).
 *
 * Produces `screenshots/*.png` of the chart families and the CHART EDITOR, entirely
 * offline: it boots a Vite dev server in-process (so `playground/vite-cube-mock.ts`
 * serves `/cubejs-api/v1` and the real `@cubejs-client/core` has something to talk to),
 * drives Chromium over it, then shuts the server down.
 *
 * Env:
 *   SHOTS_BASE_URL     reuse an already-running server instead of starting one
 *   PW_EXECUTABLE_PATH launch this Chromium binary via `playwright-core`
 *                      (locally: /opt/pw-browsers/chromium); unset ⇒ `playwright`'s
 *                      own browser resolution (what CI uses after `playwright install`)
 *   SHOTS_OUT_DIR      output directory (default `screenshots`)
 *
 * FAILS LOUDLY (non-zero exit) on a console error, a page error, a missing target
 * selector, or a shot that never painted — a silent blank PNG is worse than none.
 */
import { mkdir, rm, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, process.env.SHOTS_OUT_DIR ?? "screenshots");

const VIEWPORT = { width: 1440, height: 1000 };
const DEVICE_SCALE_FACTOR = 2;
/** Spring/entrance motion in the TanStack renderer needs to settle before we shoot. */
const SETTLE_MS = 2500;
/** A shot smaller than this is almost certainly a blank/failed page. */
const MIN_BYTES = 20 * 1024;

/* ─────────────────────────────── the server ─────────────────────────────── */

async function startServer() {
  if (process.env.SHOTS_BASE_URL) {
    const baseUrl = process.env.SHOTS_BASE_URL.replace(/\/$/, "");
    console.log(`[shots] reusing server at ${baseUrl}`);
    return { baseUrl, close: async () => {} };
  }
  // Force the offline Cube mock on even when a developer's .env holds real Cube
  // credentials, so screenshots are the same everywhere.
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
  console.log(`[shots] vite dev server on ${baseUrl}`);
  return { baseUrl, close: () => server.close() };
}

/* ────────────────────────────── the browser ─────────────────────────────── */

async function launchBrowser() {
  const executablePath = process.env.PW_EXECUTABLE_PATH;
  if (executablePath) {
    const { chromium } = await import("playwright-core");
    console.log(`[shots] chromium via playwright-core: ${executablePath}`);
    return chromium.launch({ executablePath, args: ["--no-sandbox"] });
  }
  const { chromium } = await import("playwright");
  console.log("[shots] chromium via playwright default resolution");
  try {
    return await chromium.launch({ args: ["--no-sandbox"] });
  } catch (err) {
    throw new Error(
      "could not launch Chromium. Run `bunx playwright install --with-deps chromium` " +
        "(what CI does), or point PW_EXECUTABLE_PATH at an existing binary " +
        `(locally: /opt/pw-browsers/chromium).\n  cause: ${err instanceof Error ? err.message.split("\n")[0] : err}`,
    );
  }
}

/* ──────────────────────────────── the shots ─────────────────────────────── */

const failures = [];

/**
 * Open `path`, wait for the charts to actually paint, run `prepare` (e.g. open a
 * popover), then write `name`.png. Any console/page error anywhere in the page's life
 * is collected and fails the run.
 */
async function shot(
  browser,
  baseUrl,
  { name, path, waitFor, minCount = 1, forbid, fullPage = false, prepare, describe },
) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DEVICE_SCALE_FACTOR,
    // Deterministic dates/number formatting across machines and CI.
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
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push(`http ${r.status()}: ${r.url()}`);
  });
  page.on("requestfailed", (r) => {
    const failure = r.failure()?.errorText ?? "unknown";
    // Aborted fetches are normal (useCubeQuery aborts superseded queries on unmount).
    if (!/aborted/i.test(failure)) errors.push(`requestfailed: ${r.url()} — ${failure}`);
  });

  try {
    const url = `${baseUrl}${path}`;
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });

    // Charts must be PRESENT before we shoot — an empty state renders no <svg>.
    await page.waitForSelector(waitFor, { state: "visible", timeout: 30_000 });
    await page.waitForFunction(
      ([selector, min]) => document.querySelectorAll(selector).length >= min,
      [waitFor, minCount],
      { timeout: 30_000 },
    );
    // …and the spring motion must settle before the pixels are worth keeping.
    await page.waitForTimeout(SETTLE_MS);

    // A rendered-but-WRONG page (an "Invalid chart spec" alert, an empty state) is
    // exactly the kind of thing a screenshot quietly normalizes. Fail on it.
    if (forbid) {
      const bad = await page.locator(forbid).count();
      if (bad > 0) failures.push(`${name}: ${bad}× forbidden selector "${forbid}" on the page`);
    }

    if (prepare) await prepare(page);

    const target = resolve(OUT_DIR, `${name}.png`);
    await page.screenshot({ path: target, fullPage });

    const { size } = await stat(target);
    const svgCount = await page.locator(waitFor).count();
    if (size < MIN_BYTES) {
      failures.push(`${name}: only ${size} bytes — the page looks blank`);
    }
    if (errors.length > 0) {
      failures.push(`${name}: ${errors.length} page error(s)\n    ${errors.slice(0, 5).join("\n    ")}`);
    }
    console.log(
      `[shot] ${name.padEnd(20)} ${String(Math.round(size / 1024)).padStart(5)} KB  ` +
        `${String(svgCount).padStart(2)}× "${waitFor}"  ${describe}`,
    );
  } catch (err) {
    failures.push(`${name}: ${err instanceof Error ? err.message : String(err)}`);
    console.log(`[shot] ${name.padEnd(20)} FAILED — ${err instanceof Error ? err.message : err}`);
  } finally {
    await context.close();
  }
}

/**
 * Open the chart-type picker before shooting. The trigger is the top-bar pill from
 * `src/editor/chart/onchart/CenterTypePicker.tsx` (`ChartTypePill`: a
 * `<button class="cv-type-pill" title="Change chart type">`), which opens a Radix
 * popover containing the "Suggested for your fields" group + the live tile previews.
 */
async function openTypePicker(page) {
  // Its accessible name is the CURRENT family's label ("Line") — the `title` is only a
  // tooltip — so scope by role+name and cross-check the title so a label change is loud.
  const trigger = page.getByRole("button", { name: /^line$/i }).and(page.getByTitle("Change chart type"));
  await trigger.waitFor({ state: "visible", timeout: 15_000 });
  await trigger.click();

  // Assert it actually opened: the popover, its Suggested heading, and >1 tile.
  const popover = page.locator(".cv-type-picker");
  await popover.waitFor({ state: "visible", timeout: 15_000 });
  await page.getByText(/suggested for your fields/i).waitFor({ state: "visible", timeout: 15_000 });
  await page.waitForFunction(
    () => document.querySelectorAll(".cv-type-tile").length >= 4,
    undefined,
    { timeout: 15_000 },
  );
  // The tiles fetch their own capped /load and draw miniatures — let them land.
  await page.waitForFunction(
    () => document.querySelectorAll(".cv-type-tile svg").length >= 4,
    undefined,
    { timeout: 20_000 },
  );
  // The miniatures have their own entrance motion; give them the same settle budget
  // as the main chart or consecutive runs disagree by a few antialiased pixels.
  await page.waitForTimeout(SETTLE_MS);
}

/**
 * Things that must NOT be on an editor page: the zod-issue alert (a seeded spec the
 * schema rejects) and the "add fields" placeholder (a spec whose fields never landed).
 * Either would still produce a plausible-looking — and useless — screenshot.
 */
const EDITOR_FORBID = ".cv-chart-editor-issues, .cv-chart-editor-empty";

/* ──────────────────────────────── the run ───────────────────────────────── */

const { baseUrl, close } = await startServer();
await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

let browser;
try {
  browser = await launchBrowser();

  await shot(browser, baseUrl, {
    name: "charts-light",
    path: "/preview.html",
    waitFor: ".pv-grid svg",
    minCount: 6,
    // Full page: the family grid is taller than the 1000px viewport, and a clipped
    // scatter tile would make the "did every family render?" check unanswerable.
    fullPage: true,
    describe: "chart families, light theme",
  });
  await shot(browser, baseUrl, {
    name: "charts-dark",
    path: "/preview.html?theme=dark",
    waitFor: ".pv-grid svg",
    minCount: 6,
    fullPage: true,
    describe: "chart families, dark theme",
  });
  await shot(browser, baseUrl, {
    name: "editor-light",
    path: "/editor.html",
    waitFor: '[data-slot="chart-edit-overlay"] svg',
    forbid: EDITOR_FORBID,
    describe: "chart editor, light theme",
  });
  await shot(browser, baseUrl, {
    name: "editor-dark",
    path: "/editor.html?theme=dark",
    waitFor: '[data-slot="chart-edit-overlay"] svg',
    forbid: EDITOR_FORBID,
    describe: "chart editor, dark theme",
  });
  await shot(browser, baseUrl, {
    name: "editor-type-picker",
    path: "/editor.html",
    waitFor: '[data-slot="chart-edit-overlay"] svg',
    forbid: EDITOR_FORBID,
    prepare: openTypePicker,
    describe: "chart-type picker open (Suggested + live tiles)",
  });
} finally {
  await browser?.close();
  await close();
}

if (failures.length > 0) {
  console.error(`\n[shots] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\n[shots] 5 screenshots written to ${OUT_DIR}`);
