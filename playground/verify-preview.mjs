import { chromium } from "playwright";
const URL = process.env.URL || "http://localhost:5180";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1480, height: 2800 } });
const errs = [];
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
p.on("pageerror", (e) => errs.push("PE: " + e.message));

await p.goto(URL, { waitUntil: "networkidle" });
await p.waitForSelector(".recharts-surface", { timeout: 25000 }).catch(() => {});
await p.waitForTimeout(3000);

const kpiText = () =>
  p.evaluate(() => {
    const panel = [...document.querySelectorAll("div")].find(
      (d) => d.textContent?.includes("KPI — total distance") && d.querySelector("div"),
    );
    // the big number is the most prominent text node in the panel body
    const m = panel?.textContent?.match(/[\d.,]+\s*(km|mi)/);
    return m ? m[0] : panel?.textContent?.slice(0, 60) ?? "?";
  });

console.log("metric KPI distance:", await kpiText());
await p.screenshot({ path: "/tmp/preview-metric.png", fullPage: true });

// Open Settings → switch unit system to Imperial.
await p.getByRole("button", { name: /^Settings$/ }).click().catch(() => {});
await p.waitForTimeout(400);
await p.getByText("Metric (km, L, °C)").click().catch(() => {});
await p.waitForTimeout(200);
await p.getByText("Imperial (mi, gal, °F)").click().catch(() => {});
await p.waitForTimeout(2500);
console.log("imperial KPI distance:", await kpiText());
await p.screenshot({ path: "/tmp/preview-imperial.png", fullPage: true });

// Switch to the dashboard editor.
await p.getByRole("button", { name: /Edit dashboard/ }).click().catch(() => {});
await p.waitForTimeout(2500);
await p.screenshot({ path: "/tmp/preview-editor.png", fullPage: true });

console.log("console errors:", errs.slice(0, 10).join("\n") || "(none)");
await b.close();
