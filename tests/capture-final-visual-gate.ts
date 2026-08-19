import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'final-visual-gate');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  // 1. DESKTOP 1440x900 CAPTURES
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:3001');
  await desktopPage.waitForLoadState('domcontentloaded');
  await desktopPage.waitForTimeout(3500);

  const desktopHeight = await desktopPage.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const desktopCaptures = [
    { name: '01-desktop-hero-arrival.png', pct: 0 },
    { name: '02-desktop-hero-midscroll.png', pct: 0.14 },
    { name: '03-desktop-discovery-intro.png', pct: 0.32 },
    { name: '04-desktop-discover.png', pct: 0.42 },
    { name: '05-desktop-research.png', pct: 0.52 },
    { name: '06-desktop-invent.png', pct: 0.63 },
    { name: '07-desktop-build.png', pct: 0.74 },
    { name: '08-desktop-launch.png', pct: 0.85 },
    { name: '09-desktop-impact.png', pct: 0.95 },
    { name: '10-desktop-discovery-handoff.png', pct: 1.0 },
  ];

  for (const item of desktopCaptures) {
    const y = desktopHeight * item.pct;
    await desktopPage.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(outputDir, item.name) });
  }
  await desktopPage.close();

  // 2. MOBILE 390x844 CAPTURES
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3001');
  await mobilePage.waitForLoadState('domcontentloaded');
  await mobilePage.waitForTimeout(3500);

  const mobileHeight = await mobilePage.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const mobileCaptures = [
    { name: '11-mobile-hero.png', pct: 0 },
    { name: '12-mobile-discover.png', pct: 0.42 },
    { name: '13-mobile-invent.png', pct: 0.63 },
    { name: '14-mobile-impact.png', pct: 0.96 },
  ];

  for (const item of mobileCaptures) {
    const y = mobileHeight * item.pct;
    await mobilePage.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: path.join(outputDir, item.name) });
  }
  await mobilePage.close();

  await browser.close();
  console.log('All 14 Final Visual Gate screenshots captured successfully!');
})();
