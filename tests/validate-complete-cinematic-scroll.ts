import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'complete-cinematic-validation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  console.log('=== VALIDATING COMPLETE CINEMATIC SCROLL EXPERIENCE (ZERO 3D MODELS) ===');

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

  // Check 3D Mesh / WebGL model count
  const threeMeshCount = await page.evaluate(() => {
    return document.querySelectorAll('canvas[data-engine]').length;
  });
  console.log(`[Validation] Three.js WebGL Engine Canvas Count: ${threeMeshCount} (Expected: 0)`);

  const sections = ['hero', 'discovery', 'ecosystem', 'frontier', 'horizon', 'directive'];
  for (const sId of sections) {
    const secData = await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return { top: 0, height: 1000 };
      const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
      return {
        top: spacer.getBoundingClientRect().top + window.scrollY,
        height: el.offsetHeight,
      };
    }, sId);

    console.log(`[Section ${sId.toUpperCase()}] Offset: ${secData.top}px | Height: ${secData.height}px`);

    const pinDist = Math.max(100, secData.height - 900);

    // Capture early frame (20%)
    await scrollToPos(page, secData.top + pinDist * 0.20);
    await page.screenshot({ path: path.join(outputDir, `${sId}-01-early.png`) });
    console.log(`[Captured] ${sId}-01-early.png`);

    // Capture mid frame (60%)
    await scrollToPos(page, secData.top + pinDist * 0.60);
    await page.screenshot({ path: path.join(outputDir, `${sId}-02-mid.png`) });
    console.log(`[Captured] ${sId}-02-mid.png`);

    // Capture late frame (90%)
    await scrollToPos(page, secData.top + pinDist * 0.90);
    await page.screenshot({ path: path.join(outputDir, `${sId}-03-late.png`) });
    console.log(`[Captured] ${sId}-03-late.png`);
  }

  // Check desktop horizontal overflow
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`[Desktop 1440] Horizontal Overflow: ${desktopOverflow}`);

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

  for (const sId of ['hero', 'discovery', 'frontier', 'directive']) {
    const secData = await mobile.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return { top: 0, height: 1000 };
      const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
      return {
        top: spacer.getBoundingClientRect().top + window.scrollY,
        height: el.offsetHeight,
      };
    }, sId);

    const mPinDist = Math.max(100, secData.height - 844);
    await scrollToPos(mobile, secData.top + mPinDist * 0.40);
    await mobile.screenshot({ path: path.join(outputDir, `mobile-${sId}.png`) });
    console.log(`[Captured] mobile-${sId}.png`);
  }

  const mobileOverflow = await mobile.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log(`[Mobile 390] Horizontal Overflow: ${mobileOverflow}`);

  await mobile.close();
  await browser.close();

  console.log('\n=== VALIDATION COMPLETE ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log('Screenshots saved in screenshots/complete-cinematic-validation');
})();
