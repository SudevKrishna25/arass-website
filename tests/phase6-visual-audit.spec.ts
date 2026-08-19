import { test } from '@playwright/test';
import path from 'path';

test.describe('ARASS EVENTS // Phase 6 Visual Audit Captures', () => {
  const BASE_URL = 'http://localhost:3000';
  const ARTIFACTS_DIR = 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb';

  test('Capture all required Phase 6 visual artifacts', async ({ page }) => {
    // 1. Authenticate as Super Admin
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/organizer/dashboard');

    // 01 Public Events
    await page.goto(`${BASE_URL}/events`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '01_public_events.png'), fullPage: false });

    // 02 Event Microsite
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '02_event_microsite.png'), fullPage: false });

    // 03 Participant Dashboard
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '03_participant_dashboard.png'), fullPage: false });

    // 04 Live Event
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '04_live_event.png'), fullPage: false });

    // 05 Submission Workspace
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '05_submission.png'), fullPage: false });

    // 06 Leaderboard
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/leaderboard`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '06_leaderboard.png'), fullPage: false });

    // 07 Results
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/results`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '07_results.png'), fullPage: false });

    // 08 Organizer Dashboard
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '08_organizer_dashboard.png'), fullPage: false });

    // 09 Live Control Room
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '09_live_control.png'), fullPage: false });

    // 10 Participants
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/participants`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '10_participants.png'), fullPage: false });

    // 11 Judges
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/judges`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '11_judges.png'), fullPage: false });

    // 12 Analytics
    await page.goto(`${BASE_URL}/organizer/analytics`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '12_analytics.png'), fullPage: false });

    // 13 Certificate Studio
    await page.goto(`${BASE_URL}/organizer/certificates`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '13_certificate_studio.png'), fullPage: false });

    // 14 Certificate Verification Preview
    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '14_certificate_preview.png'), fullPage: false });

    // 15 Notifications
    await page.goto(`${BASE_URL}/notifications`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '15_notifications.png'), fullPage: false });

    // 16 Mobile Participant
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/dashboard`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '16_mobile_participant.png'), fullPage: false });

    // 17 Mobile Organizer
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, '17_mobile_organizer.png'), fullPage: false });
  });
});
