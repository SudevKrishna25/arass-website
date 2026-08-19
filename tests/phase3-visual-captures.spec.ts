import { test } from '@playwright/test';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/sudev/.gemini/antigravity-ide/brain/70ef716d-a349-4a4c-b310-92168fe95bfb';

test.describe('ARASS EVENTS // Phase 3 Visual Verification Captures', () => {
  const BASE_URL = 'http://localhost:3000';

  test('Capture all major Phase 3 screens', async ({ page }) => {
    // Authenticate
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button:has-text("SIGN IN")');
    await page.waitForURL('**/organizer/dashboard');

    // 1. Dashboard
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_01_dashboard.png'), fullPage: false });

    // 2. Events List
    await page.goto(`${BASE_URL}/organizer/events`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_02_events.png'), fullPage: false });

    // 3. Event Wizard
    await page.goto(`${BASE_URL}/organizer/events/new`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_03_wizard.png'), fullPage: false });

    // 4. Participants Table
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/participants`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_04_participants.png'), fullPage: false });

    // 5. Rounds Manager
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/rounds`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_05_rounds.png'), fullPage: false });

    // 6. Submissions
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/submissions`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_06_submissions.png'), fullPage: false });

    // 7. Live Control
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/live`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_07_live_control.png'), fullPage: false });

    // 8. Certificates
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/certificates`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_08_certificates.png'), fullPage: false });

    // 9. Analytics
    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/analytics`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_09_analytics.png'), fullPage: false });

    // 10. Communications
    await page.goto(`${BASE_URL}/organizer/communications`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_10_communications.png'), fullPage: false });

    // 11. Judge Scoring Portal
    await page.goto(`${BASE_URL}/judge/dashboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_11_judge_portal.png'), fullPage: false });

    // 12. Admin Governance
    await page.goto(`${BASE_URL}/admin`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_12_admin_overview.png'), fullPage: false });

    // 13. Audit Ledger
    await page.goto(`${BASE_URL}/admin/audit`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_13_audit_log.png'), fullPage: false });

    // 14. Mobile Dashboard
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'org_14_mobile_dashboard.png'), fullPage: false });
  });
});
