import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'full-audit');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  // DESKTOP CAPTURES (1440x900)
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktop.goto('http://localhost:3001');
  await desktop.waitForLoadState('domcontentloaded');
  await desktop.waitForTimeout(3000);

  const desktopCaptures = [
    { filename: '01-desktop-hero-arrival.png', y: 0 },
    { filename: '02-desktop-discovery-impact.png', y: 9000 },
    { filename: '03-desktop-ecosystem-final-handoff.png', y: 19600 },
    { filename: '04-desktop-frontier-beginning.png', y: 20200 },
    { filename: '05-desktop-frontier-opencall.png', y: 22800 },
  ];

  for (const cap of desktopCaptures) {
    const currentY = await desktop.evaluate(() => window.scrollY);
    const steps = 15;
    for (let i = 1; i <= steps; i++) {
      const interpY = currentY + (cap.y - currentY) * (i / steps);
      await desktop.evaluate((pos) => window.scrollTo(0, pos), interpY);
      await desktop.waitForTimeout(30);
    }
    await desktop.waitForTimeout(800);
    await desktop.screenshot({ path: path.join(outputDir, cap.filename) });
  }

  await desktop.close();

  // MOBILE CAPTURES (390x844)
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3001');
  await mobile.waitForLoadState('domcontentloaded');
  await mobile.waitForTimeout(3000);

  const mobileCaptures = [
    { filename: '06-mobile-hero.png', y: 0 },
    { filename: '07-mobile-discovery.png', y: 3500 },
    { filename: '08-mobile-ecosystem.png', y: 14000 },
    { filename: '09-mobile-frontier-opencall.png', y: 21000 },
  ];

  for (const cap of mobileCaptures) {
    const currentY = await mobile.evaluate(() => window.scrollY);
    const steps = 15;
    for (let i = 1; i <= steps; i++) {
      const interpY = currentY + (cap.y - currentY) * (i / steps);
      await mobile.evaluate((pos) => window.scrollTo(0, pos), interpY);
      await mobile.waitForTimeout(30);
    }
    await mobile.waitForTimeout(800);
    await mobile.screenshot({ path: path.join(outputDir, cap.filename) });
  }

  await mobile.close();
  await browser.close();

  console.log('=== FULL SITE AUDIT SCREENSHOTS GENERATED ===');
  console.log('Screenshots saved in screenshots/full-audit');
})();
