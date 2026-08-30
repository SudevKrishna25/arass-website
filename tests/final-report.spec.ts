import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Capture final presentation screenshots and metrics', async ({ page }) => {
  const outputDir = path.join(process.cwd(), 'screenshots', 'final-arrival');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const consoleErrors: string[] = [];
  const networkErrors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  page.on('requestfailed', (req) => {
    networkErrors.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  const startTime = Date.now();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  const loadTimeMs = Date.now() - startTime;

  // Wait for entrance animations to settle
  await page.waitForTimeout(2000);

  // Measure WebGL metrics
  const webglMetrics = await page.evaluate(() => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const dpr = window.devicePixelRatio || 1;
    let particleCount = 1800; // Default count from TechParticleField
    if (window.innerWidth < 768) particleCount = 600;

    return {
      canvasWidth: canvas ? canvas.width : 0,
      canvasHeight: canvas ? canvas.height : 0,
      clientWidth: canvas ? canvas.clientWidth : 0,
      clientHeight: canvas ? canvas.clientHeight : 0,
      dpr: dpr,
      particleCount: particleCount,
    };
  });

  // Measure FPS over 1 second
  const fps = await page.evaluate(async () => {
    return new Promise<number>((resolve) => {
      let frameCount = 0;
      const start = performance.now();
      function checkFrame() {
        frameCount++;
        const now = performance.now();
        if (now - start >= 1000) {
          resolve(Math.round((frameCount * 1000) / (now - start)));
        } else {
          requestAnimationFrame(checkFrame);
        }
      }
      requestAnimationFrame(checkFrame);
    });
  });

  // Desktop 1440x900 Screenshots
  await page.setViewportSize({ width: 1440, height: 900 });
  const desktopTotalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const desktopScrolls = [
    { pct: 0, filename: 'desktop-1440-00pct.png' },
    { pct: 25, filename: 'desktop-1440-25pct.png' },
    { pct: 50, filename: 'desktop-1440-50pct.png' },
    { pct: 75, filename: 'desktop-1440-75pct.png' },
    { pct: 100, filename: 'desktop-1440-100pct.png' },
  ];

  for (const item of desktopScrolls) {
    const y = desktopTotalHeight * (item.pct / 100);
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outputDir, item.filename) });
  }

  // Mobile 390x844 Screenshots
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileTotalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

  const mobileScrolls = [
    { pct: 0, filename: 'mobile-390-00pct.png' },
    { pct: 50, filename: 'mobile-390-50pct.png' },
    { pct: 100, filename: 'mobile-390-100pct.png' },
  ];

  for (const item of mobileScrolls) {
    const y = mobileTotalHeight * (item.pct / 100);
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outputDir, item.filename) });
  }

  // Write metadata JSON for report generation
  const metadata = {
    loadTimeMs,
    fps,
    webglMetrics,
    consoleErrors,
    networkErrors,
  };

  fs.writeFileSync(path.join(outputDir, 'metrics.json'), JSON.stringify(metadata, null, 2));
});
