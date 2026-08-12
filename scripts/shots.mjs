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
 *
 * It also runs one check that is NOT a picture: `verifyCompatibilityInvariant` asserts
 * that with the field picker's "Only compatible fields" switch on, no slot — in any
 * table — renders a row it would refuse. A screenshot of one slot cannot see that,
 * because the bug it guards leaked in the slots the camera was not pointed at.
 *
 * What it does NOT prove is that each of the type picker's tiles drew the chart type it
 * is a picture OF: a shot only shows that something painted, and the picker's tiles all
 * look plausible individually. `scripts/verify-type-picker.mjs` asserts that structurally
 * (form + paint strength, per tile, over time, across field shapes) and is the check to
 * run — alongside this one — after touching the picker or a chart family's marks.
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
let shotCount = 0;

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
    shotCount += 1;
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
/**
 * Open a slot's field picker. An AVAILABLE row is `.cv-picker-row`; a blocked one is
 * `.cv-picker-row--disabled` (a different class, not a modifier on the same node), so
 * counting rows has to match both — the Values slot here happens to have no available
 * candidate at all, which is exactly the state worth photographing.
 */
const PICKER_ROWS = ".cv-picker-row, .cv-picker-row--disabled";

/**
 * Every control in the open picker must have an accessible name. The header is now
 * icon-only (compatibility toggle, data source), so a dropped `aria-label` would leave
 * a button announced as nothing at all — invisible to a screen reader and untargetable
 * by `getByRole`. Approximates the accname algorithm: aria-label, then aria-labelledby,
 * then text content, then title.
 */
async function assertNamedControls(page, where) {
  const unnamed = await page.$$eval(".cv-picker button", (nodes) =>
    nodes
      .filter((el) => {
        const ids = (el.getAttribute("aria-labelledby") ?? "").split(/\s+/).filter(Boolean);
        const labelled = ids.map((id) => document.getElementById(id)?.textContent ?? "").join(" ");
        return ![el.getAttribute("aria-label"), labelled, el.textContent, el.getAttribute("title")].some(
          (s) => (s ?? "").trim().length > 0,
        );
      })
      .map((el) => `<button class="${el.className}">`),
  );
  if (unnamed.length > 0) {
    failures.push(`${where}: ${unnamed.length} unnamed button(s) — ${unnamed.join(", ")}`);
  }
}

async function openPickerFor(page, name) {
  const add = page.getByRole("button", { name }).first();
  await add.waitFor({ state: "visible", timeout: 15_000 });
  await add.click();

  await page.locator(".cv-picker").waitFor({ state: "visible", timeout: 15_000 });
  // Assert it listed something, so an empty popover cannot pass as a shot.
  await page.waitForFunction(
    (sel) => document.querySelectorAll(sel).length >= 2,
    PICKER_ROWS,
    { timeout: 15_000 },
  );
}

/** The Values slot: every candidate is blocked, each with its reason shown. */
async function openFieldPicker(page) {
  await openPickerFor(page, /^add$/i);
  await assertNamedControls(page, "field-picker");
}

/**
 * The Split-by slot with the toggle ON — chosen over Values because it NARROWS
 * (categories survive, measures do not) rather than emptying, so the shot shows the
 * filtered list and the hidden count together.
 *
 * The toggle is an icon-only button now, so the shot has to prove the state some other
 * way than reading a label: the row count must DROP, the button must report
 * `aria-pressed="true"`, and the numeric badge (what it took away) must be on screen.
 */
async function openFieldPickerFiltered(page) {
  await openPickerFor(page, /split by/i);
  const before = await page.locator(PICKER_ROWS).count();
  await page.locator(".cv-picker-compat").click();
  await page.waitForFunction(
    ({ sel, n }) => document.querySelectorAll(sel).length < n,
    { sel: PICKER_ROWS, n: before },
    { timeout: 15_000 },
  );
  await page
    .locator('.cv-picker-compat[aria-pressed="true"]')
    .waitFor({ state: "visible", timeout: 15_000 });
  await page
    .locator(".cv-picker-compat-count")
    .waitFor({ state: "visible", timeout: 15_000 });
  await assertNamedControls(page, "field-picker-compatible-only");
}

/**
 * THE INVARIANT: with "Only compatible fields" on, the picker must not render a row it
 * would refuse — in any slot, in any table, in any picker that offers the toggle.
 *
 * This is asserted structurally rather than photographed, because the bug it guards
 * looked fine in a screenshot of the slot where the switch was flipped: the preference
 * used to be per-popover state seeded from storage at MOUNT, and the editor mounts one
 * picker per well up front, so turning the switch on in "Split by" left the Values
 * slot's picker listing every date and dimension it has under "Values takes a measure".
 * A row is a leak when it shows a reason or reports `aria-disabled` — the two things a
 * refused row is made of.
 */
async function assertNoBlockedRows(page, where) {
  const leaked = await page.$$eval(`.cv-picker ${PICKER_ROWS}`, (nodes) =>
    nodes
      .filter(
        (el) =>
          el.getAttribute("aria-disabled") === "true" ||
          (el.querySelector(".cv-picker-row-reason")?.textContent ?? "").trim().length > 0,
      )
      .map((el) => {
        const label = (el.querySelector(".cv-ec-truncate, .cv-picker-row-label")?.textContent ?? "").trim();
        const reason = (el.querySelector(".cv-picker-row-reason")?.textContent ?? "").trim();
        return `${label || "(unlabelled)"} — ${reason || "aria-disabled"}`;
      }),
  );
  if (leaked.length > 0) {
    failures.push(
      `${where}: "Only compatible fields" is ON yet ${leaked.length} unusable row(s) are ` +
        `rendered — ${leaked.slice(0, 6).join("; ")}${leaked.length > 6 ? "; …" : ""}`,
    );
  }
  // The rows are only trustworthy if this picker really is the one that is filtering:
  // a stale local copy of the preference showed `aria-pressed="false"` right next to
  // the rows it should have hidden.
  const pressed = await page.locator(".cv-picker-compat").first().getAttribute("aria-pressed");
  if (pressed !== "true") {
    failures.push(`${where}: the shared "Only compatible fields" choice did not reach this picker (aria-pressed=${pressed})`);
  }
}

/** Expand every collapsed table section so related tables' rows are on screen too. */
async function expandAllTables(page) {
  const count = await page.locator(".cv-picker-table").count();
  for (let i = 0; i < count; i += 1) {
    const collapsed = await page.evaluate((index) => {
      const header = document.querySelectorAll(".cv-picker-table")[index];
      if (!header) return false;
      let el = header.nextElementSibling;
      let rows = 0;
      while (el && !el.classList.contains("cv-picker-table")) {
        rows += el.querySelectorAll(".cv-picker-row, .cv-picker-row--disabled").length;
        el = el.nextElementSibling;
      }
      return rows === 0;
    }, i);
    if (collapsed) await page.locator(".cv-picker-table").nth(i).click();
  }
}

/**
 * Open the KPI strip's Comparison popover. The triggers are in strip order
 * (Value / Comparison / Trend), so index 1 is the one that used to be a switch plus a
 * picker and is now a single three-way choice.
 */
async function openKpiComparison(page) {
  const triggers = page.locator(".cv-kpi-section-trigger");
  await triggers.nth(1).click();
  await page.locator('[role="dialog"]').first().waitFor({ state: "visible", timeout: 10_000 });
  await page.waitForTimeout(250);
}

/**
 * Drive the invariant over EVERY add-slot the editor offers (`?seed=empty` leaves them
 * all empty, so Values / Category / Split by are all reachable), turning the switch on
 * in one slot and then checking the others — the cross-slot case is the whole point.
 * Each slot gets a turn at being the one where the switch was flipped.
 */
async function verifyCompatibilityInvariant(browser, baseUrl) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
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

  const open = async (label) => {
    await page.keyboard.press("Escape");
    await page.waitForTimeout(150);
    const trigger = page.getByRole("button", { name: new RegExp(`^${label}$`, "i") }).first();
    await trigger.waitFor({ state: "visible", timeout: 15_000 });
    await trigger.click();
    await page.locator(".cv-picker").waitFor({ state: "visible", timeout: 15_000 });
    await expandAllTables(page);
  };

  try {
    await page.goto(`${baseUrl}/editor.html?seed=empty`, { waitUntil: "load", timeout: 60_000 });
    await page.waitForSelector('[data-slot="chart-edit-overlay"]', { state: "visible", timeout: 30_000 });
    await page.waitForTimeout(1000);

    const slots = await page.$$eval(".cv-well-add", (nodes) => nodes.map((n) => n.textContent.trim()));
    if (slots.length < 2) {
      failures.push(`compat-invariant: expected several add-slots to check, found ${JSON.stringify(slots)}`);
      return;
    }

    for (const flippedIn of slots) {
      // Turn the switch ON here…
      await open(flippedIn);
      if ((await page.locator('.cv-picker-compat[aria-pressed="true"]').count()) === 0) {
        await page.locator(".cv-picker-compat").click();
        await page.locator('.cv-picker-compat[aria-pressed="true"]').waitFor({ timeout: 15_000 });
        await expandAllTables(page);
      }
      await assertNoBlockedRows(page, `compat-invariant: slot "${flippedIn}" (switched on here)`);

      // …and every OTHER slot must already be hiding the same rows.
      for (const slot of slots.filter((s) => s !== flippedIn)) {
        await open(slot);
        await assertNoBlockedRows(page, `compat-invariant: slot "${slot}" (after switching on in "${flippedIn}")`);
      }

      // Reset for the next round so each slot gets to be the one that was flipped.
      await open(flippedIn);
      await page.locator(".cv-picker-compat").click();
      await page.locator('.cv-picker-compat[aria-pressed="false"]').waitFor({ timeout: 15_000 });
    }

    if (errors.length > 0) {
      failures.push(
        `compat-invariant: ${errors.length} page error(s)\n    ${errors.slice(0, 5).join("\n    ")}`,
      );
    }
    console.log(
      `[check] compat-invariant     ${slots.length} slot(s) × ${slots.length} switch position(s) — ` +
        `no unusable row rendered with "Only compatible fields" on`,
    );
  } catch (err) {
    failures.push(`compat-invariant: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    await context.close();
  }
}

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
  await shot(browser, baseUrl, {
    name: "field-picker",
    path: "/editor.html",
    waitFor: '[data-slot="chart-edit-overlay"] svg',
    forbid: EDITOR_FORBID,
    prepare: openFieldPicker,
    describe: "field picker, all fields (blocked ones muted with a reason)",
  });
  await shot(browser, baseUrl, {
    name: "field-picker-compatible-only",
    // The default seed already fills Split by (so it offers no Add button); the
    // two-measure seed leaves it empty, and it is also the slot that NARROWS
    // rather than empties — categories survive, measures do not.
    path: "/editor.html?seed=measures",
    waitFor: '[data-slot="chart-edit-overlay"] svg',
    forbid: EDITOR_FORBID,
    prepare: openFieldPickerFiltered,
    describe: 'field picker, "Only compatible fields" on (hidden count shown)',
  });
  await shot(browser, baseUrl, {
    // The toggle is icon-only and its pressed state is a tinted `--primary` fill, so
    // the DARK theme is where "does this glyph still read at 16px?" is actually
    // answered — the light shot alone cannot show it.
    name: "field-picker-compatible-only-dark",
    path: "/editor.html?seed=measures&theme=dark",
    waitFor: '[data-slot="chart-edit-overlay"] svg',
    forbid: EDITOR_FORBID,
    prepare: openFieldPickerFiltered,
    describe: 'field picker, "Only compatible fields" on, dark theme',
  });

  await shot(browser, baseUrl, {
    // The KPI strip's three popovers carry the editor's densest control cluster, and
    // each one recently lost a switch to the picker beside it. `prepare` opens the
    // Comparison popover so the collapsed "Compare to" control is IN the frame.
    name: "editor-kpi",
    path: "/editor.html?seed=kpi",
    waitFor: ".cv-kpi-section-trigger",
    forbid: EDITOR_FORBID,
    prepare: openKpiComparison,
    describe: "KPI config strip with the Comparison popover open",
  });

  // Not a shot — the assertion a shot cannot make (see assertNoBlockedRows).
  await verifyCompatibilityInvariant(browser, baseUrl);
} finally {
  await browser?.close();
  await close();
}

if (failures.length > 0) {
  console.error(`\n[shots] ${failures.length} failure(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`\n[shots] ${shotCount} screenshots written to ${OUT_DIR}`);
