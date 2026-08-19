import { test, expect } from '@playwright/test';

test.describe('ARASS Hero Arrival Experience', () => {
  test('renders hero section, logo, headline, navigation, and scroll progress screenshots', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Allow motion entrance animation sequence to settle
    await page.waitForTimeout(2000);

    // Verify zero console errors
    expect(consoleErrors).toEqual([]);

    // Check ARASS official brand logo in navbar & hero
    const logo = page.locator('img[alt="ARASS Logo"]').first();
    await expect(logo).toBeVisible();

    // Check Headline lines
    const line1 = page.getByText("WE DON'T FOLLOW THE FUTURE.");
    await expect(line1).toBeVisible();

    const line2 = page.getByText('WE BUILD IT.');
    await expect(line2).toBeVisible();

    // Check Supporting Description Paragraph
    const description = page.getByText(/ARASS is an independent technology company/i);
    await expect(description).toBeVisible();

    // Check Action Buttons
    const exploreBtn = page.getByRole('button', { name: /EXPLORE ARASS/i });
    await expect(exploreBtn).toBeVisible();

    const missionBtn = page.getByRole('button', { name: /OUR MISSION/i });
    await expect(missionBtn).toBeVisible();

    // Check Scroll Indicator
    const scrollIndicator = page.getByText('SCROLL TO ENTER ARASS');
    await expect(scrollIndicator).toBeVisible();

    // Verify No Horizontal Overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 2);

    // Take Screenshots at 0%, 25%, 50%, 75%, 100% hero scroll distance
    const totalHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);

    // 0% Scroll Screenshot
    await page.screenshot({ path: `tests/screenshots/hero-0percent-${page.viewportSize()?.width}.png` });

    // 25% Scroll
    await page.evaluate((h) => window.scrollTo(0, h * 0.25), totalHeight);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `tests/screenshots/hero-25percent-${page.viewportSize()?.width}.png` });

    // 50% Scroll
    await page.evaluate((h) => window.scrollTo(0, h * 0.5), totalHeight);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `tests/screenshots/hero-50percent-${page.viewportSize()?.width}.png` });

    // 75% Scroll
    await page.evaluate((h) => window.scrollTo(0, h * 0.75), totalHeight);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `tests/screenshots/hero-75percent-${page.viewportSize()?.width}.png` });

    // 100% Scroll
    await page.evaluate((h) => window.scrollTo(0, h), totalHeight);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `tests/screenshots/hero-100percent-${page.viewportSize()?.width}.png` });
  });
});
