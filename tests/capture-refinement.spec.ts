import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Capture exact refined visual review screenshots', async ({ page }) => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'refinement-review');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // DESKTOP 1440x900 CAPTURES
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2500);

  const desktopTotalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const desktopCaptures = [
    { name: '01-desktop-hero-00pct.png', pct: 0 },
    { name: '02-desktop-hero-50pct.png', pct: 0.14 },
    { name: '03-desktop-discovery-intro.png', pct: 0.32 },
    { name: '04-desktop-discover.png', pct: 0.42 },
    { name: '05-desktop-research.png', pct: 0.52 },
    { name: '06-desktop-invent.png', pct: 0.63 },
    { name: '07-desktop-build.png', pct: 0.74 },
    { name: '08-desktop-launch.png', pct: 0.85 },
    { name: '09-desktop-impact.png', pct: 0.96 },
  ];

  for (const item of desktopCaptures) {
    const y = desktopTotalHeight * item.pct;
    await page.evaluate((scrollPos) => {
      window.scrollTo(0, scrollPos);
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.update();
      }
    }, y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, item.name) });
  }

  // MOBILE 390x844 CAPTURES
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2500);

  const mobileTotalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const mobileCaptures = [
    { name: '10-mobile-hero.png', pct: 0 },
    { name: '11-mobile-discover.png', pct: 0.42 },
    { name: '12-mobile-invent.png', pct: 0.63 },
    { name: '13-mobile-impact.png', pct: 0.96 },
  ];

  for (const item of mobileCaptures) {
    const y = mobileTotalHeight * item.pct;
    await page.evaluate((scrollPos) => {
      window.scrollTo(0, scrollPos);
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.update();
      }
    }, y);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outputDir, item.name) });
  }
});
