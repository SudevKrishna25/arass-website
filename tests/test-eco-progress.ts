import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);

  const ecoStart = 6930;
  const ecoDistance = 4950;

  const testCases = [
    { name: 'Section 03 beginning', pct: 0.05 },
    { name: 'RESEARCH', pct: 0.30 },
    { name: 'TECHNOLOGY', pct: 0.40 },
    { name: 'IP', pct: 0.50 },
    { name: 'VENTURES', pct: 0.60 },
    { name: 'FRONTIER', pct: 0.70 },
    { name: 'IMPACT', pct: 0.80 },
    { name: 'INSTITUTIONAL SCALE', pct: 0.96 },
  ];

  for (const tc of testCases) {
    const y = ecoStart + ecoDistance * tc.pct;
    
    // Scroll smoothly from current position to target Y
    const currentY = await page.evaluate(() => window.scrollY);
    const steps = 15;
    for (let i = 1; i <= steps; i++) {
      const interpY = currentY + (y - currentY) * (i / steps);
      await page.evaluate((pos) => window.scrollTo(0, pos), interpY);
      await page.waitForTimeout(20);
    }
    await page.waitForTimeout(600);

    const sample = await page.evaluate(() => {
      // @ts-ignore
      const heading = document.querySelector('#ecosystem h2')?.innerText || document.querySelector('#ecosystem h3')?.innerText || '';
      return {
        scrollY: window.scrollY,
        heading: heading.replace(/\n/g, ' '),
      };
    });

    console.log(`[${tc.name}] (pct=${tc.pct}, y=${y}):`, sample);
  }

  await page.close();
  await browser.close();
})();
