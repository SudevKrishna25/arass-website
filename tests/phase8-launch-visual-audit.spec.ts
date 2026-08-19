import { test } from '@playwright/test';
import path from 'path';

test.describe('ARASS EVENTS // Phase 8 Launch Visual Audit Captures', () => {
  const BASE_URL = 'http://localhost:3000';
  const ARTIFACTS_DIR = 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb';

  test('Capture all 19 Phase 8 launch visual audit artifacts', async ({ page }) => {
    // 1. Authenticate as Super Admin
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    // 01 Public Discovery
    await page.goto(`${BASE_URL}/events`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_01_public_discovery.png'), fullPage: false });

    // 02 Event Microsite
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_02_event_microsite.png'), fullPage: false });

    // 03 Registration
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/register`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_03_registration.png'), fullPage: false });

    // 04 Participant Dashboard
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_04_participant_dashboard.png'), fullPage: false });

    // 05 Live Event Stage
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_05_live_event.png'), fullPage: false });

    // 06 Submission
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_06_submission.png'), fullPage: false });

    // 07 Live Leaderboard
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/leaderboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_07_leaderboard.png'), fullPage: false });

    // 08 Results Showcase
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/results`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_08_results.png'), fullPage: false });

    // 09 Organizer Dashboard
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_09_organizer_dashboard.png'), fullPage: false });

    // 10 Event Builder
    await page.goto(`${BASE_URL}/organizer/events/new`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_10_event_builder.png'), fullPage: false });

    // 11 Live Stage Control Room
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_11_live_control.png'), fullPage: false });

    // 12 Participant Operations
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/participants`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_12_participants.png'), fullPage: false });

    // 13 Juror Operations
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/judges`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_13_judges.png'), fullPage: false });

    // 14 Analytics Console
    await page.goto(`${BASE_URL}/organizer/analytics`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_14_analytics.png'), fullPage: false });

    // 15 Certificate Studio
    await page.goto(`${BASE_URL}/organizer/certificates`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_15_certificate_studio.png'), fullPage: false });

    // 16 Certificate Verification Portal
    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_16_certificate_preview.png'), fullPage: false });

    // 17 Notification Center
    await page.goto(`${BASE_URL}/notifications`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_17_notifications.png'), fullPage: false });

    // 18 Mobile Participant (iPhone 14 Pro)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_18_mobile_participant.png'), fullPage: false });

    // 19 Mobile Organizer (iPhone 14 Pro)
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'phase8_19_mobile_organizer.png'), fullPage: false });
  });
});
