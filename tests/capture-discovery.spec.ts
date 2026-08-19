import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Capture discovery review screenshots', async ({ page }) => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'discovery-review');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // DESKTOP 1440x900 CAPTURES
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2500);

  const desktopTotalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
  // Hero section is approx first 28% of total scroll space (220vh of 770vh total)
  // Discovery section spans remainder (550vh of 770vh)
  // Stage pacing within Discovery: INTRO (0-10%), DISCOVER (10-23%), RESEARCH (23-38%), INVENT (38-53%), BUILD (53-68%), LAUNCH (68-84%), IMPACT (84-100%)

  const desktopCaptures = [
    { num: '01', name: '01-desktop-hero-00pct.png', pct: 0 },
    { num: '02', name: '02-desktop-hero-50pct.png', pct: 0.14 },
    { num: '03', name: '03-desktop-hero-discovery-transition.png', pct: 0.28 },
    { num: '04', name: '04-desktop-discovery-intro.png', pct: 0.32 },
    { num: '05', name: '05-desktop-discover.png', pct: 0.42 },
    { num: '06', name: '06-desktop-research.png', pct: 0.52 },
    { num: '07', name: '07-desktop-invent.png', pct: 0.63 },
    { num: '08', name: '08-desktop-build.png', pct: 0.74 },
    { num: '09', name: '09-desktop-launch.png', pct: 0.85 },
    { num: '10', name: '10-desktop-impact.png', pct: 0.95 },
    { num: '11', name: '11-desktop-discovery-handoff.png', pct: 1.0 },
  ];

  for (const item of desktopCaptures) {
    const y = desktopTotalHeight * item.pct;
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outputDir, item.name) });
  }

  // MOBILE 390x844 CAPTURES
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2500);

  const mobileTotalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const mobileCaptures = [
    { num: '12', name: '12-mobile-hero.png', pct: 0 },
    { num: '13', name: '13-mobile-discovery-intro.png', pct: 0.32 },
    { num: '14', name: '14-mobile-discover.png', pct: 0.42 },
    { num: '15', name: '15-mobile-research.png', pct: 0.52 },
    { num: '16', name: '16-mobile-invent.png', pct: 0.63 },
    { num: '17', name: '17-mobile-build.png', pct: 0.74 },
    { num: '18', name: '18-mobile-launch.png', pct: 0.85 },
    { num: '19', name: '19-mobile-impact.png', pct: 0.96 },
  ];

  for (const item of mobileCaptures) {
    const y = mobileTotalHeight * item.pct;
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outputDir, item.name) });
  }
});
