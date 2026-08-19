import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'ecosystem-capture');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  // 1. DESKTOP 1440x900 CAPTURES
  // Total scroll layout:
  // Hero (220vh = 1980px)
  // Discovery (550vh content + 550vh pin space = 9900px, ends at 11880px)
  // Ecosystem (550vh content + 550vh pin space = 9900px, runs from 11880px to 21780px)
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto('http://localhost:3001');
  await desktopPage.waitForLoadState('domcontentloaded');
  await desktopPage.waitForTimeout(3000);

  const ecoStart = 11880;
  const ecoTotal = 9900;

  const desktopCaptures = [
    { name: '01-desktop-discovery-impact.png', y: 11200 },
    { name: '02-desktop-ecosystem-transition.png', y: ecoStart + ecoTotal * 0.05 }, // 12375
    { name: '03-desktop-arass-core.png', y: ecoStart + ecoTotal * 0.20 },            // 13860
    { name: '04-desktop-research.png', y: ecoStart + ecoTotal * 0.30 },              // 14850
    { name: '05-desktop-technology.png', y: ecoStart + ecoTotal * 0.40 },            // 15840
    { name: '06-desktop-ip.png', y: ecoStart + ecoTotal * 0.50 },                    // 16830
    { name: '07-desktop-ventures.png', y: ecoStart + ecoTotal * 0.60 },              // 17820
    { name: '08-desktop-frontier.png', y: ecoStart + ecoTotal * 0.70 },              // 18810
    { name: '09-desktop-impact.png', y: ecoStart + ecoTotal * 0.80 },                // 19800
    { name: '10-desktop-future-sectors.png', y: ecoStart + ecoTotal * 0.88 },        // 20592
    { name: '11-desktop-global-network.png', y: ecoStart + ecoTotal * 0.95 },        // 21285
    { name: '12-desktop-handoff.png', y: ecoStart + ecoTotal * 0.99 },               // 21681
  ];

  for (const item of desktopCaptures) {
    await desktopPage.evaluate((scrollPos) => window.scrollTo(0, scrollPos), item.y);
    await desktopPage.waitForTimeout(600);
    await desktopPage.screenshot({ path: path.join(outputDir, item.name) });
  }
  await desktopPage.close();

  // 2. MOBILE 390x844 CAPTURES
  // Hero (220vh = 1856px)
  // Discovery (550vh + 550vh = 9284px, ends at 11140px)
  // Ecosystem (550vh + 550vh = 9284px, runs from 11140px to 20424px)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3001');
  await mobilePage.waitForLoadState('domcontentloaded');
  await mobilePage.waitForTimeout(3000);

  const mobEcoStart = 11140;
  const mobEcoTotal = 9284;

  const mobileCaptures = [
    { name: '13-mobile-ecosystem-transition.png', y: mobEcoStart + mobEcoTotal * 0.05 },
    { name: '14-mobile-arass-core.png', y: mobEcoStart + mobEcoTotal * 0.20 },
    { name: '15-mobile-research.png', y: mobEcoStart + mobEcoTotal * 0.30 },
    { name: '16-mobile-ventures.png', y: mobEcoStart + mobEcoTotal * 0.60 },
    { name: '17-mobile-future-sectors.png', y: mobEcoStart + mobEcoTotal * 0.88 },
    { name: '18-mobile-global-network.png', y: mobEcoStart + mobEcoTotal * 0.95 },
    { name: '19-mobile-handoff.png', y: mobEcoStart + mobEcoTotal * 0.99 },
  ];

  for (const item of mobileCaptures) {
    await mobilePage.evaluate((scrollPos) => window.scrollTo(0, scrollPos), item.y);
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: path.join(outputDir, item.name) });
  }
  await mobilePage.close();

  await browser.close();
  console.log('All 19 Ecosystem capture screenshots generated with 9900px pin spacing target math!');
})();
