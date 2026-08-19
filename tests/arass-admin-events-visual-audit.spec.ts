import { test, expect } from '@playwright/test';
import path from 'path';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';
const ARTIFACT_DIR = 'C:\\Users\\sudev\\.gemini\\antigravity-ide\\brain\\70ef716d-a349-4a4c-b310-92168fe95bfb';

test.describe('ARASS // Admin Control System & CMS Visual Audit Captures', () => {
  test('Capture all 22 Admin Control & CMS visual audit artifacts', async ({ page }) => {
    // 01 MAIN ARASS HOMEPAGE
    await page.goto(`${BASE_URL}`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_01_homepage.png'), fullPage: true });

    // 02 PUBLIC EVENTS DISCOVERY
    await page.goto(`${BASE_URL}/events`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_02_public_events.png'), fullPage: true });

    // 03 EVENT MICROSITE
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_03_event_microsite.png'), fullPage: true });

    // 04 REGISTRATION
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/register`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_04_registration.png'), fullPage: true });

    // 05 PARTICIPANT DASHBOARD
    await page.goto(`${BASE_URL}/dashboard`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_05_participant_dashboard.png'), fullPage: true });

    // 06 ADMIN LOGIN
    await page.goto(`${BASE_URL}/login`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_06_admin_login.png'), fullPage: true });

    // Authenticate as Admin
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');

    // 07 ADMIN DASHBOARD
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_07_admin_dashboard.png'), fullPage: true });

    // 08 ADMIN EVENTS
    await page.goto(`${BASE_URL}/admin/events`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_08_admin_events.png'), fullPage: true });

    // 09 EVENT BUILDER
    await page.goto(`${BASE_URL}/admin/events/new`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_09_event_builder.png'), fullPage: true });

    // 10 EVENT PREVIEW
    await page.click('button:has-text("3. PREVIEW")');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_10_event_preview.png'), fullPage: true });

    // 11 PARTICIPANT MANAGEMENT
    await page.goto(`${BASE_URL}/admin/events/evt-ideathon-2026`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_11_participant_management.png'), fullPage: true });

    // 12 SUBMISSION MANAGEMENT
    await page.click('button:has-text("SUBMISSIONS")');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_12_submission_management.png'), fullPage: true });

    // 13 JUDGE MANAGEMENT
    await page.click('button:has-text("JURY EVALUATION")');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_13_judge_management.png'), fullPage: true });

    // 14 CERTIFICATE MANAGEMENT
    await page.click('button:has-text("CERTIFICATE STUDIO")');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_14_certificate_management.png'), fullPage: true });

    // 15 CONTENT CMS
    await page.goto(`${BASE_URL}/admin/content`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_15_content_cms.png'), fullPage: true });

    // 16 PAGE EDITOR
    await page.click('button:has-text("WORK PAGE")');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_16_page_editor.png'), fullPage: true });

    // 17 MEDIA LIBRARY
    await page.goto(`${BASE_URL}/admin/media`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_17_media_library.png'), fullPage: true });

    // 18 NAVIGATION EDITOR
    await page.goto(`${BASE_URL}/admin/navigation`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_18_navigation_editor.png'), fullPage: true });

    // 19 USER MANAGEMENT
    await page.goto(`${BASE_URL}/admin/users`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_19_user_management.png'), fullPage: true });

    // 20 AUDIT LOG
    await page.goto(`${BASE_URL}/admin/audit`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_20_audit_log.png'), fullPage: true });

    // 21 MOBILE EVENTS
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/events`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_21_mobile_events.png'), fullPage: true });

    // 22 MOBILE ADMIN
    await page.goto(`${BASE_URL}/admin`);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'unified_22_mobile_admin.png'), fullPage: true });
  });
});
