import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

(async () => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'directive-validation');
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
    { filename: '01-section05-final-handoff.png', targetY: 34000 },
    { filename: '02-section06-descent.png', targetY: 34500 },
    { filename: '03-section06-directive.png', targetY: 35100 },
    { filename: '04-section06-principles.png', targetY: 35700 },
    { filename: '05-section06-institution.png', targetY: 36300 },
    { filename: '06-section06-convergence.png', targetY: 36800 },
    { filename: '07-section06-invitation.png', targetY: 37300 },
    { filename: '08-section06-final-arrival.png', targetY: 37800 },
  ];

  for (const cap of desktopCaptures) {
    await desktop.evaluate((pos) => window.scrollTo(0, pos), cap.targetY);
    await desktop.waitForTimeout(1600);
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
    { filename: '09-mobile-beginning.png', targetY: 28800 },
    { filename: '10-mobile-final.png', targetY: 31750 },
  ];

  for (const cap of mobileCaptures) {
    await mobile.evaluate((pos) => window.scrollTo(0, pos), cap.targetY);
    await mobile.waitForTimeout(1600);
    await mobile.screenshot({ path: path.join(outputDir, cap.filename) });
  }

  await mobile.close();
  await browser.close();

  console.log('=== SECTION 06 VISUAL GATE CAPTURE REPORT ===');
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) console.log(consoleErrors);
  console.log('Validation screenshots saved in screenshots/directive-validation');
})();
