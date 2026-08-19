import { test } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb';

test.describe('ARASS EVENTS // Phase 4 Visual Audit Captures', () => {
  const BASE_URL = 'http://localhost:3000';

  test('Capture all required Phase 4 visual artifacts', async ({ page }) => {
    // Authenticate
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/organizer/dashboard');

    // 1. Participant Live Desktop
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_event_live_desktop.png'), fullPage: false });

    // 2. Participant Live Mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_event_live_mobile.png'), fullPage: false });

    // Restore desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // 3. Quiz & Assessment Room
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/assessment/assess-ideathon-1`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_quiz.png'), fullPage: false });

    // 4. Submission Room
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_submission.png'), fullPage: false });

    // 5. Leaderboard
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/leaderboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_leaderboard.png'), fullPage: false });

    // 6. Organizer Live Control Room
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_organizer_live.png'), fullPage: false });

    // 7. Judge Portal
    await page.goto(`${BASE_URL}/judge/dashboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_judge.png'), fullPage: false });

    // 8. Integrity Dashboard
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/integrity`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_integrity.png'), fullPage: false });

    // 9. Results Showcase
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/results`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_results.png'), fullPage: false });

    // 10. Public Certificate Verification
    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase4_certificate.png'), fullPage: false });
  });
});
