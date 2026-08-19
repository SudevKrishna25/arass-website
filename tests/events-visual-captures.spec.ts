import { test } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb';

test.describe('ARASS EVENTS // Visual Verification Captures', () => {
  const BASE_URL = 'http://localhost:3000';

  test('Capture all major Phase 2 screens', async ({ page }) => {
    // 1. Discovery
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/events`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'events_01_discovery.png'), fullPage: false });

    // 2. Microsite
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'events_02_microsite.png'), fullPage: false });

    // 3. Registration
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/register`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'events_03_registration.png'), fullPage: false });

    // 4. Live Command Center
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'events_04_live_portal.png'), fullPage: false });

    // 5. Certificate Verification
    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'events_05_certificate.png'), fullPage: false });

    // 6. Dashboard
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'events_06_dashboard.png'), fullPage: false });

    // 7. Mobile Discovery
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/events`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'events_07_mobile_discovery.png'), fullPage: false });
  });
});
