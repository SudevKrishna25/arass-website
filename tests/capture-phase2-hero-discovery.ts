import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'phase2-hero-discovery');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  console.log('=== CAPTURING PHASE 2 HERO + DISCOVERY VISUAL STAGES ===');

  const scrollToPos = async (pageInstance: any, y: number) => {
    await pageInstance.evaluate((targetY: number) => {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }, y);
    await pageInstance.waitForTimeout(1400);
  };

  // 1. DESKTOP VIEWPORT (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop 1440] ${msg.text()}`);
  });

  await page.goto('http://localhost:3001');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2500);

  // 01 Hero Idle (0px)
  await scrollToPos(page, 0);
  await page.screenshot({ path: path.join(outputDir, '01-hero-idle.png') });
  console.log('[Captured] 01-hero-idle.png');

  // 02 Hero Awakening (600px)
  await scrollToPos(page, 600);
  await page.screenshot({ path: path.join(outputDir, '02-hero-awakening.png') });
  console.log('[Captured] 02-hero-awakening.png');

  // 03 Hero System Active (1400px)
  await scrollToPos(page, 1400);
  await page.screenshot({ path: path.join(outputDir, '03-hero-system-active.png') });
  console.log('[Captured] 03-hero-system-active.png');

  // 04 Hero -> Discovery Transition (2100px)
  await scrollToPos(page, 2100);
  await page.screenshot({ path: path.join(outputDir, '04-hero-discovery-transition.png') });
  console.log('[Captured] 04-hero-discovery-transition.png');

  // 05 Discovery Stage 01 (DISCOVER at 3400px)
  await scrollToPos(page, 3400);
  await page.screenshot({ path: path.join(outputDir, '05-discovery-signal.png') });
  console.log('[Captured] 05-discovery-signal.png');

  // 06 Discovery Stage 02 (RESEARCH at 4800px)
  await scrollToPos(page, 4800);
  await page.screenshot({ path: path.join(outputDir, '06-discovery-compute.png') });
  console.log('[Captured] 06-discovery-compute.png');

  // 07 Discovery Stage 03 (INVENT at 6000px)
  await scrollToPos(page, 6000);
  await page.screenshot({ path: path.join(outputDir, '07-discovery-synthesis.png') });
  console.log('[Captured] 07-discovery-synthesis.png');

  // 08 Discovery Stage 04 (BUILD at 7400px)
  await scrollToPos(page, 7400);
  await page.screenshot({ path: path.join(outputDir, '08-discovery-engineering.png') });
  console.log('[Captured] 08-discovery-engineering.png');

  // 09 Discovery Stage 05 (LAUNCH at 8800px)
  await scrollToPos(page, 8800);
  await page.screenshot({ path: path.join(outputDir, '09-discovery-deployment.png') });
  console.log('[Captured] 09-discovery-deployment.png');

  // 10 Discovery Stage 06 (IMPACT at 10200px)
  await scrollToPos(page, 10200);
  await page.screenshot({ path: path.join(outputDir, '10-discovery-impact.png') });
  console.log('[Captured] 10-discovery-impact.png');

  await page.close();

  // 2. MOBILE VIEWPORT (390x844)
  console.log('\n--- CAPTURING MOBILE VIEWPORT (390x844) ---');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Mobile 390] ${msg.text()}`);
  });

  await mobile.goto('http://localhost:3001');
  await mobile.waitForLoadState('domcontentloaded');
  await mobile.waitForTimeout(2000);

  // 11 Mobile Hero
  await scrollToPos(mobile, 0);
  await mobile.screenshot({ path: path.join(outputDir, '11-mobile-hero.png') });
  console.log('[Captured] 11-mobile-hero.png');

  // 12 Mobile Discovery Stage 01
  await scrollToPos(mobile, 3400);
  await mobile.screenshot({ path: path.join(outputDir, '12-mobile-discovery.png') });
  console.log('[Captured] 12-mobile-discovery.png');

  // 13 Mobile Final Impact
  await scrollToPos(mobile, 10200);
  await mobile.screenshot({ path: path.join(outputDir, '13-mobile-final-impact.png') });
  console.log('[Captured] 13-mobile-final-impact.png');

  await mobile.close();
  await browser.close();

  console.log('\n=== PHASE 2 CAPTURE COMPLETE ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log('Screenshots saved in screenshots/phase2-hero-discovery');
})();
