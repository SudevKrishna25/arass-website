import { test, expect } from '@playwright/test';

test.describe('ARASS // Master Homepage Art-Direction & Motion Audit', () => {
  test('Capture complete 16-checkpoint master sequence at 1440x900', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 01 Initial Boot
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => sessionStorage.clear());
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_01_initial_boot.png' });

    // 02 ARASS Emergence
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_02_arass_emergence.png' });

    // 03 ARASS Assembly
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_03_arass_assembly.png' });

    // 04 Letter Separation
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_04_letter_separation.png' });

    // 05 Typography Warp
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_05_typography_warp.png' });

    // 06 Hero Arrival
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_06_hero_arrival.png' });

    // 07 Tagline Fully Visible
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_07_tagline_fully_visible.png' });

    // Verify exact tagline in DOM
    const bodyText = await page.textContent('body');
    expect(bodyText).toContain("WE DON'T FOLLOW");
    expect(bodyText).toContain("THE FUTURE.");
    expect(bodyText).toContain("WE BUILD IT.");

    // 08 Hero Scroll Transition
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_08_hero_scroll_transition.png' });

    // 09 AI SYSTEMS (Scene 03)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.0, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_09_ai_systems.png' });

    // 10 DIGITAL PRODUCTS (Scene 04)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.8, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_10_digital_products.png' });

    // 11 AUTOMATION (Scene 05)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.6, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_11_automation.png' });

    // 12 DIGITAL EXPERIENCES (Scene 06)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 4.4, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_12_digital_experiences.png' });

    // 13 WORK (Scene 07)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.1, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_13_work.png' });

    // 14 FINAL CTA (Scene 08)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.8, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_14_final_cta.png' });

    // 15 Mobile Hero (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_15_mobile_hero.png' });

    // 16 Mobile Capability (390x844)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.0, behavior: 'instant' }));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_16_mobile_capability.png' });
  });

  const responsiveViewports = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '1024x768', width: 1024, height: 768 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '430x932', width: 430, height: 932 },
    { name: '375x812', width: 375, height: 812 },
    { name: '320x800', width: 320, height: 800 },
  ];

  for (const vp of responsiveViewports) {
    test(`Verify Zero Overflow and Capture Hero at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);

      // Check horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

      await page.screenshot({
        path: `C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/master_responsive_${vp.name}.png`,
      });
    });
  }
});
