import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:5180');

// Capture any console errors
const errors = [];
page.on('console', msg => {
  if (msg.type() === 'error') {
    errors.push(msg.text());
  }
});

// Wait for page to load
await page.waitForTimeout(2000);

// Click "Edit dashboard" 
const editBtn = await page.locator('text=Edit dashboard').first();
if (await editBtn.isVisible()) {
  await editBtn.click();
  await page.waitForTimeout(1000);
}

// Try to add a table chart
const addChartBtn = await page.locator('text=Add chart').first();
if (await addChartBtn.isVisible()) {
  await addChartBtn.click();
  await page.waitForTimeout(500);
}

// Switch to table type if not already
const tableIcon = await page.locator('[aria-pressed="false"] button').filter({ has: page.locator('svg') }).nth(6);
if (await tableIcon.isVisible()) {
  await tableIcon.click();
  await page.waitForTimeout(500);
}

// Add first field to columns well
const addFieldBtn = await page.locator('button:has-text("Columns")').first();
if (await addFieldBtn.isVisible()) {
  await addFieldBtn.click();
  await page.waitForTimeout(500);
}

// Log console messages to see issues
if (errors.length > 0) {
  console.log('Console errors:', errors);
}

// Check if there are any render issues by looking at the DOM
const tableSection = await page.locator('[data-slot="well-group"]').first();
if (await tableSection.isVisible()) {
  console.log('Table well visible');
}

await page.screenshot({ path: 'table-edit.png' });
console.log('Screenshot saved');

await browser.close();
