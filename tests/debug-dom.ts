import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleMsgs: string[] = [];
  page.on('console', (msg) => consoleMsgs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => consoleMsgs.push(`[PAGE ERROR] ${err.message}`));

  await page.goto('http://localhost:3001');
  await page.waitForTimeout(3000);

  console.log('=== PAGE CONSOLE LOGS ===');
  consoleMsgs.forEach(m => console.log(m));

  const canvasCount = await page.evaluate(() => document.querySelectorAll('canvas').length);
  console.log('Canvas element count on page:', canvasCount);

  await browser.close();
})();
