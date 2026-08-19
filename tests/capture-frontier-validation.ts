import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'frontier-validation');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const consoleErrors: string[] = [];

  // DESKTOP CAPTURES (1440x900)
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktop.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Desktop] ${msg.text()}`);
  });

  await desktop.goto('http://localhost:3001');
  await desktop.waitForLoadState('domcontentloaded');
  await desktop.waitForTimeout(3000);

  const desktopCaptures = [
    { filename: '01-section03-final-handoff.png', targetY: 19600 },
    { filename: '02-section04-beginning.png', targetY: 20200 },
    { filename: '03-section04-middle-connect.png', targetY: 21000 },
    { filename: '04-section04-focal-build.png', targetY: 21800 },
    { filename: '05-section04-opencall-cta.png', targetY: 22800 },
  ];

  for (const cap of desktopCaptures) {
    const currentY = await desktop.evaluate(() => window.scrollY);
    const steps = 15;
    for (let i = 1; i <= steps; i++) {
      const interpY = currentY + (cap.targetY - currentY) * (i / steps);
      await desktop.evaluate((pos) => window.scrollTo(0, pos), interpY);
      await desktop.waitForTimeout(30);
    }
    await desktop.waitForTimeout(800);
    await desktop.screenshot({ path: path.join(outputDir, cap.filename) });
  }

  await desktop.close();

  // MOBILE CAPTURES (390x844)
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[Mobile] ${msg.text()}`);
  });

  await mobile.goto('http://localhost:3001');
  await mobile.waitForLoadState('domcontentloaded');
  await mobile.waitForTimeout(3000);

  const mobileCaptures = [
    { filename: '06-mobile-390x844-beginning.png', targetY: 18600 },
    { filename: '07-mobile-390x844-middle.png', targetY: 20200 },
    { filename: '08-mobile-390x844-opencall.png', targetY: 21600 },
  ];

  for (const cap of mobileCaptures) {
    const currentY = await mobile.evaluate(() => window.scrollY);
    const steps = 15;
    for (let i = 1; i <= steps; i++) {
      const interpY = currentY + (cap.targetY - currentY) * (i / steps);
      await mobile.evaluate((pos) => window.scrollTo(0, pos), interpY);
      await mobile.waitForTimeout(30);
    }
    await mobile.waitForTimeout(800);
    await mobile.screenshot({ path: path.join(outputDir, cap.filename) });
  }

  await mobile.close();
  await browser.close();

  console.log('=== SECTION 04 VISUAL GATE CAPTURE REPORT ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) console.log(consoleErrors);
  console.log('Validation screenshots saved in screenshots/frontier-validation');
})();
