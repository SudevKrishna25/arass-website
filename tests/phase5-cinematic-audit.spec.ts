import { test, expect } from '@playwright/test';

test.describe('ARASS // Phase 5 Cinematic Director Pass Audit', () => {
  test('Capture comprehensive Phase 5 film sequence across viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // 01 Initial Boot State
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => sessionStorage.clear());
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_01_initial_boot.png' });

    // 02 Tagline Arrival (Warp transition into Hero)
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_02_tagline_arrival.png' });

    // 03 Tagline Hold
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_03_tagline_hold.png' });

    // 04 Tagline Transition (Scroll initiates letter separation & depth drift)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_04_tagline_transition.png' });

    // 05 What We Build Statement (Scene 02)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.3, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_05_what_we_build.png' });

    // 06 Capability World 1 — AI Systems (Scene 03)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.0, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_06_ai_systems.png' });

    // 07 AI → Digital Products Overlap Transition
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.4, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_07_ai_to_products_transition.png' });

    // 08 Capability World 2 — Digital Products (Scene 04)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.8, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_08_digital_products.png' });

    // 09 Capability World 3 — Automation (Scene 05)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.6, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_09_automation.png' });

    // 10 Capability World 4 — Digital Experiences (Scene 06)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 4.4, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_10_experiences.png' });

    // 11 Work 01 & Lab (Scene 07)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.1, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_11_work_01.png' });

    // 12 Work Transition
    await page.goto('http://localhost:3000/work', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_12_work_transition.png' });

    // 13 Work 02
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_13_work_02.png' });

    // 14 Products / Ventures
    await page.goto('http://localhost:3000/ventures', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_14_products.png' });

    // 15 ARASS Lab
    await page.goto('http://localhost:3000/labs', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_15_lab.png' });

    // 16 Company / About
    await page.goto('http://localhost:3000/about', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_16_company.png' });

    // 17 Insights
    await page.goto('http://localhost:3000/insights', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_17_insights.png' });

    // 18 Final CTA / Conclusion (Scene 08)
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press('Escape');
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 5.8, behavior: 'instant' }));
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_18_final_cta.png' });

    // 19 Mega Menu
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(400);
    const menuBtn = page.getByTestId('menu-toggle-btn');
    await menuBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_19_mega_menu.png' });
    await page.keyboard.press('Escape');

    // 20 Mobile Hero (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_20_mobile_hero.png' });

    // 21 Mobile Capabilities (Scene 03 on Mobile)
    await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.0, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_21_mobile_capabilities.png' });

    // 22 Mobile Work
    await page.goto('http://localhost:3000/work', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb/phase5_22_mobile_work.png' });
  });
});
