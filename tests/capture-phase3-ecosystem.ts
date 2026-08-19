import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'phase3-ecosystem');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  console.log('=== CAPTURING PHASE 3 ECOSYSTEM VISUAL STAGES ===');

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

  // Retrieve exact ecosystem start offset
  const ecoOffset = await page.evaluate(() => {
    const el = document.getElementById('ecosystem');
    if (!el) return 13000;
    const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });

  const ecoHeight = await page.evaluate(() => {
    const el = document.getElementById('ecosystem');
    return el ? el.offsetHeight : 4950;
  });

  console.log(`[Desktop] Ecosystem Offset: ${ecoOffset}px | Height: ${ecoHeight}px`);

  // 01 Discovery -> Ecosystem Handoff
  await scrollToPos(page, ecoOffset - 400);
  await page.screenshot({ path: path.join(outputDir, '01-discovery-final-handoff.png') });
  console.log('[Captured] 01-discovery-final-handoff.png');

  // 02 Labs Entry (0.15)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.15);
  await page.screenshot({ path: path.join(outputDir, '02-labs-entry.png') });
  console.log('[Captured] 02-labs-entry.png');

  // 03 Labs Active (0.30)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.30);
  await page.screenshot({ path: path.join(outputDir, '03-labs-active.png') });
  console.log('[Captured] 03-labs-active.png');

  // 04 Technologies (0.40)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.40);
  await page.screenshot({ path: path.join(outputDir, '04-technologies.png') });
  console.log('[Captured] 04-technologies.png');

  // 05 Intelligence (0.50)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.50);
  await page.screenshot({ path: path.join(outputDir, '05-intelligence.png') });
  console.log('[Captured] 05-intelligence.png');

  // 06 Ventures (0.60)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.60);
  await page.screenshot({ path: path.join(outputDir, '06-ventures.png') });
  console.log('[Captured] 06-ventures.png');

  // 07 Frontier (0.70)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.70);
  await page.screenshot({ path: path.join(outputDir, '07-frontier.png') });
  console.log('[Captured] 07-frontier.png');

  // 08 Constellation (0.88)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.88);
  await page.screenshot({ path: path.join(outputDir, '08-constellation.png') });
  console.log('[Captured] 08-constellation.png');

  // 09 Institutional Scale (0.96)
  await scrollToPos(page, ecoOffset + ecoHeight * 0.96);
  await page.screenshot({ path: path.join(outputDir, '09-institutional-scale.png') });
  console.log('[Captured] 09-institutional-scale.png');

  // 10 Ecosystem -> Frontier Handoff (1.00)
  await scrollToPos(page, ecoOffset + ecoHeight * 1.0);
  await page.screenshot({ path: path.join(outputDir, '10-ecosystem-frontier-handoff.png') });
  console.log('[Captured] 10-ecosystem-frontier-handoff.png');

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

  const mEcoOffset = await mobile.evaluate(() => {
    const el = document.getElementById('ecosystem');
    if (!el) return 13000;
    const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });
  const mEcoHeight = await mobile.evaluate(() => {
    const el = document.getElementById('ecosystem');
    return el ? el.offsetHeight : 4640;
  });

  // 11 Mobile Labs
  await scrollToPos(mobile, mEcoOffset + mEcoHeight * 0.30);
  await mobile.screenshot({ path: path.join(outputDir, '11-mobile-labs.png') });
  console.log('[Captured] 11-mobile-labs.png');

  // 12 Mobile Intelligence
  await scrollToPos(mobile, mEcoOffset + mEcoHeight * 0.50);
  await mobile.screenshot({ path: path.join(outputDir, '12-mobile-intelligence.png') });
  console.log('[Captured] 12-mobile-intelligence.png');

  // 13 Mobile Ventures
  await scrollToPos(mobile, mEcoOffset + mEcoHeight * 0.60);
  await mobile.screenshot({ path: path.join(outputDir, '13-mobile-ventures.png') });
  console.log('[Captured] 13-mobile-ventures.png');

  // 14 Mobile Final
  await scrollToPos(mobile, mEcoOffset + mEcoHeight * 0.96);
  await mobile.screenshot({ path: path.join(outputDir, '14-mobile-final.png') });
  console.log('[Captured] 14-mobile-final.png');

  await mobile.close();
  await browser.close();

  console.log('\n=== PHASE 3 ECOSYSTEM CAPTURE COMPLETE ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log('Screenshots saved in screenshots/phase3-ecosystem');
})();
