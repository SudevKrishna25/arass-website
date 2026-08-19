import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'cinematic-frontier-validation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  console.log('=== VALIDATING CINEMATIC FRONTIER SECTION (RESET ARCHITECTURE) ===');

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
    if (!el) return 21420;
    const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });

  const frontierHeight = await page.evaluate(() => {
    const el = document.getElementById('frontier');
    return el ? el.offsetHeight : 4050;
  });

  const scrollDistance = frontierHeight - 900; // GSAP pin distance

  console.log(`[Desktop 1440] Frontier Offset: ${frontierOffset}px | Pinned Distance: ${scrollDistance}px`);

  // 01 Distant Frontier (0.05)
  await scrollToPos(page, frontierOffset + scrollDistance * 0.05);
  await page.screenshot({ path: path.join(outputDir, '01-distant-frontier.png') });
  console.log('[Captured] 01-distant-frontier.png');

  // 02 Discover (0.18)
  await scrollToPos(page, frontierOffset + scrollDistance * 0.18);
  await page.screenshot({ path: path.join(outputDir, '02-discover.png') });
  console.log('[Captured] 02-discover.png');

  // 03 Connect (0.36)
  await scrollToPos(page, frontierOffset + scrollDistance * 0.36);
  await page.screenshot({ path: path.join(outputDir, '03-connect.png') });
  console.log('[Captured] 03-connect.png');

  // 04 Build (0.54 - Cleanroom Lab Plate)
  await scrollToPos(page, frontierOffset + scrollDistance * 0.54);
  await page.screenshot({ path: path.join(outputDir, '04-build.png') });
  console.log('[Captured] 04-build.png');

  // 05 Frontier (0.72 - Monumental Atrium Plate)
  await scrollToPos(page, frontierOffset + scrollDistance * 0.72);
  await page.screenshot({ path: path.join(outputDir, '05-frontier.png') });
  console.log('[Captured] 05-frontier.png');

  // 06 Open Call (0.90 - Institutional CTA)
  await scrollToPos(page, frontierOffset + scrollDistance * 0.90);
  await page.screenshot({ path: path.join(outputDir, '06-open-call.png') });
  console.log('[Captured] 06-open-call.png');

  // 07 Final Cinematic Frame (0.98 - Horizon Handoff)
  await scrollToPos(page, frontierOffset + scrollDistance * 0.98);
  await page.screenshot({ path: path.join(outputDir, '07-final-cinematic-frame.png') });
  console.log('[Captured] 07-final-cinematic-frame.png');

  await page.close();

  // 2. MOBILE VIEWPORT (390x844)
  console.log('\n--- TESTING MOBILE VIEWPORT (390x844) ---');
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Mobile 390] ${msg.text()}`);
  });

  await mobile.goto('http://localhost:3001');
  await mobile.waitForLoadState('domcontentloaded');
  await mobile.waitForTimeout(2000);

  const mFrontierOffset = await mobile.evaluate(() => {
    const el = document.getElementById('frontier');
    if (!el) return 21420;
    const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
    return spacer.getBoundingClientRect().top + window.scrollY;
  });
  const mFrontierHeight = await mobile.evaluate(() => {
    const el = document.getElementById('frontier');
    return el ? el.offsetHeight : 3800;
  });
  const mScrollDistance = mFrontierHeight - 844;

  // 08 Mobile Discover
  await scrollToPos(mobile, mFrontierOffset + mScrollDistance * 0.18);
  await mobile.screenshot({ path: path.join(outputDir, '08-mobile-discover.png') });
  console.log('[Captured] 08-mobile-discover.png');

  // 09 Mobile Frontier
  await scrollToPos(mobile, mFrontierOffset + mScrollDistance * 0.72);
  await mobile.screenshot({ path: path.join(outputDir, '09-mobile-frontier.png') });
  console.log('[Captured] 09-mobile-frontier.png');

  // 10 Mobile Open Call
  await scrollToPos(mobile, mFrontierOffset + mScrollDistance * 0.90);
  await mobile.screenshot({ path: path.join(outputDir, '10-mobile-opencall.png') });
  console.log('[Captured] 10-mobile-opencall.png');

  await mobile.close();
  await browser.close();

  console.log('\n=== CINEMATIC FRONTIER VALIDATION COMPLETE ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log('Screenshots saved in screenshots/cinematic-frontier-validation');
})();
