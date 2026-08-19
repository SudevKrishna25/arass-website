import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'phase4-frontier');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  console.log('=== CAPTURING PHASE 4 FRONTIER VISUAL STAGES ===');

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

  const frontierOffset = await page.evaluate(() => {
    const el = document.getElementById('frontier');
    if (!el) return 20000;
    const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });

  const frontierHeight = await page.evaluate(() => {
    const el = document.getElementById('frontier');
    return el ? el.offsetHeight : 4050;
  });

  console.log(`[Desktop] Frontier Offset: ${frontierOffset}px | Height: ${frontierHeight}px`);

  // 01 Ecosystem -> Frontier Handoff
  await scrollToPos(page, frontierOffset - 400);
  await page.screenshot({ path: path.join(outputDir, '01-ecosystem-final-handoff.png') });
  console.log('[Captured] 01-ecosystem-final-handoff.png');

  // 02 Frontier Distant (0.05)
  await scrollToPos(page, frontierOffset + frontierHeight * 0.05);
  await page.screenshot({ path: path.join(outputDir, '02-frontier-distant.png') });
  console.log('[Captured] 02-frontier-distant.png');

  // 03 Discover (0.18)
  await scrollToPos(page, frontierOffset + frontierHeight * 0.18);
  await page.screenshot({ path: path.join(outputDir, '03-discover.png') });
  console.log('[Captured] 03-discover.png');

  // 04 Connect (0.36)
  await scrollToPos(page, frontierOffset + frontierHeight * 0.36);
  await page.screenshot({ path: path.join(outputDir, '04-connect.png') });
  console.log('[Captured] 04-connect.png');

  // 05 Build (0.54)
  await scrollToPos(page, frontierOffset + frontierHeight * 0.54);
  await page.screenshot({ path: path.join(outputDir, '05-build.png') });
  console.log('[Captured] 05-build.png');

  // 06 Frontier Entry (0.72)
  await scrollToPos(page, frontierOffset + frontierHeight * 0.72);
  await page.screenshot({ path: path.join(outputDir, '06-frontier-entry.png') });
  console.log('[Captured] 06-frontier-entry.png');

  // 07 Open Call (0.90)
  await scrollToPos(page, frontierOffset + frontierHeight * 0.90);
  await page.screenshot({ path: path.join(outputDir, '07-open-call.png') });
  console.log('[Captured] 07-open-call.png');

  // 08 Gateway Final (0.98)
  await scrollToPos(page, frontierOffset + frontierHeight * 0.98);
  await page.screenshot({ path: path.join(outputDir, '08-gateway-final.png') });
  console.log('[Captured] 08-gateway-final.png');

  // 12 Section 04 -> Section 05 Handoff (1.0)
  await scrollToPos(page, frontierOffset + frontierHeight * 1.0);
  await page.screenshot({ path: path.join(outputDir, '12-section04-section05-handoff.png') });
  console.log('[Captured] 12-section04-section05-handoff.png');

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

  const mFrontierOffset = await mobile.evaluate(() => {
    const el = document.getElementById('frontier');
    if (!el) return 20000;
    const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });
  const mFrontierHeight = await mobile.evaluate(() => {
    const el = document.getElementById('frontier');
    return el ? el.offsetHeight : 3800;
  });

  // 09 Mobile Beginning
  await scrollToPos(mobile, mFrontierOffset + mFrontierHeight * 0.18);
  await mobile.screenshot({ path: path.join(outputDir, '09-mobile-beginning.png') });
  console.log('[Captured] 09-mobile-beginning.png');

  // 10 Mobile Middle
  await scrollToPos(mobile, mFrontierOffset + mFrontierHeight * 0.54);
  await mobile.screenshot({ path: path.join(outputDir, '10-mobile-middle.png') });
  console.log('[Captured] 10-mobile-middle.png');

  // 11 Mobile Open Call
  await scrollToPos(mobile, mFrontierOffset + mFrontierHeight * 0.90);
  await mobile.screenshot({ path: path.join(outputDir, '11-mobile-opencall.png') });
  console.log('[Captured] 11-mobile-opencall.png');

  await mobile.close();
  await browser.close();

  console.log('\n=== PHASE 4 FRONTIER CAPTURE COMPLETE ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log('Screenshots saved in screenshots/phase4-frontier');
})();
