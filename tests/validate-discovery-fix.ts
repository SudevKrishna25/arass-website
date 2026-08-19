import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'discovery-fix-validation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  const viewports = [
    { name: '390x844', width: 390, height: 844 },
    { name: '375x812', width: 375, height: 812 },
    { name: '1440x900', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[${vp.name}] ${msg.text()}`);
    });

    await page.goto('http://localhost:3001');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);

    const discTop = await page.evaluate(() => {
      const disc = document.getElementById('discovery');
      const spacer = disc?.parentElement?.classList.contains('pin-spacer') ? disc.parentElement : disc;
      return spacer ? spacer.getBoundingClientRect().top + window.scrollY : 1980;
    });

    const stages = [
      { name: '01-discover.png', pct: 0.16 },
      { name: '02-research.png', pct: 0.30 },
      { name: '03-invent.png', pct: 0.45 },
      { name: '04-impact.png', pct: 0.90 },
    ];

    for (const st of stages) {
      const targetY = discTop + 4050 * st.pct;
      await page.evaluate((pos) => window.scrollTo(0, pos), targetY);
      await page.waitForTimeout(600);

      // Check horizontal overflow
      const hasOverflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
      if (hasOverflow) {
        console.error(`[FAIL] Horizontal overflow detected on ${vp.name} at stage ${st.name}`);
      }

      await page.screenshot({ path: path.join(outputDir, `${vp.name}-${st.name}`) });
    }

    await page.close();
  }

  await browser.close();

  console.log('=== DISCOVERY FIX VALIDATION REPORT ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) console.log(consoleErrors);
  console.log('Validation screenshots saved in screenshots/discovery-fix-validation');
})();
