import { test, expect } from '@playwright/test';
import * as path from 'path';

test('Verify restored Hero experience visual rendering', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Take initial 0% scroll screenshot
  await page.screenshot({ path: path.join(process.cwd(), 'screenshots', 'hero-fix-00pct.png') });

  // Scroll to 25% hero
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), 'screenshots', 'hero-fix-25pct.png') });

  // Scroll to 50% hero
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), 'screenshots', 'hero-fix-50pct.png') });

  // Scroll to 75% hero
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), 'screenshots', 'hero-fix-75pct.png') });

  // Scroll to 100% hero
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), 'screenshots', 'hero-fix-100pct.png') });

  // Scroll into Discovery intro
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(process.cwd(), 'screenshots', 'hero-fix-discovery-intro.png') });
});
