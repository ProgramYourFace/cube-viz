import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

const logs = [];
page.on('console', msg => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    logs.push(`${msg.type()}: ${msg.text()}`);
  }
});

page.on('pageerror', err => {
  logs.push(`error: ${err.message}`);
});

try {
  await page.goto('http://localhost:5180', { waitUntil: 'networkidle' });
  console.log('Page loaded');
  
  // Try clicking through the UI
  const content = await page.content();
  if (content.includes('Edit dashboard')) {
    console.log('Found edit dashboard button');
  }
  
  // Check for any render issues in the HTML
  const errors = await page.evaluate(() => window.__errors || []);
  if (errors.length > 0) {
    console.log('Render errors found');
  }
} catch (e) {
  console.error('Test error:', e.message);
}

if (logs.length > 0) {
  console.log('Console messages:');
  logs.forEach(l => console.log('  ' + l));
} else {
  console.log('No console errors or warnings');
}

await browser.close();
