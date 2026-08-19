import { test, expect } from '@playwright/test';

const scrollPercentages = [0, 20, 40, 60, 80, 100];

test.describe('Section 02 Discovery Experience', () => {
  test('renders Hero and continuous Section 02 Discovery stages without errors', async ({ page }) => {
    const consoleLogs: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleLogs.push(msg.text());
      }
    });

    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2500);

    // Filter Next.js dev server hot-reloader 404 logs & dev overlay noise
    const realErrors = consoleLogs.filter(
      (err) =>
        !err.includes('ReactDevOverlay') &&
        !err.includes('NotFoundErrorBoundary') &&
        !err.includes('404 (Not Found)')
    );

    if (realErrors.length > 0) {
      console.log('Production Errors found:', realErrors);
    }
    expect(realErrors).toEqual([]);

    // Check Hero headline element visibility with explicit wait
    const line1 = page.getByText("WE DON'T FOLLOW THE FUTURE.").first();
    await line1.waitFor({ state: 'visible', timeout: 10000 });
    await expect(line1).toBeVisible();

    // Get total scroll distance
    const totalScrollHeight = await page.evaluate(
      () => document.body.scrollHeight - window.innerHeight
    );

    // Scroll through stages and verify horizontal overflow & screenshots
    for (const pct of scrollPercentages) {
      const targetY = totalScrollHeight * (pct / 100);
      await page.evaluate((y) => window.scrollTo(0, y), targetY);
      await page.waitForTimeout(400);

      // Verify zero horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 2);

      await page.screenshot({
        path: `tests/screenshots/discovery-${page.viewportSize()?.width}-${pct}pct.png`,
      });
    }
  });
});
