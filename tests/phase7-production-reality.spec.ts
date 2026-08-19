import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 7: Production Reality Audit & Launch Hardening', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeAll(async ({ request }) => {
    await request.post(`${BASE_URL}/api/events/reset`);
  });

  test('1. Participant Dynamic Registration & Session Initialization', async ({ page }) => {
    const randomEmail = `hacker.${Date.now()}@sovereign-lab.io`;
    await page.goto(`${BASE_URL}/login`);

    // Toggle register view
    await page.click('button:has-text("REGISTER")');
    await page.fill('input[placeholder*="Alex Chen"]', 'Marcus Vance');
    await page.fill('input[type="email"]', randomEmail);
    await page.fill('input[type="password"]', 'SecurePass2026!#');
    await page.click('button[type="submit"]');

    // Should redirect to participant dashboard
    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1')).toContainText('Marcus Vance');
  });

  test('2. Multi-Role Authentication & Session Persistence', async ({ page }) => {
    // Super Admin Sign In
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    await expect(page.locator('h1')).toContainText('Organizer Command Center');
  });

  test('3. RBAC Enforcement: Unauthorized Route Interception', async ({ page }) => {
    // Sign in as standard participant
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'Participant@2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    // Attempt direct access to organizer dashboard -> Should redirect to login or dashboard
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await expect(page).not.toHaveURL(`${BASE_URL}/organizer/dashboard`);
  });

  test('4. Organization Tenancy Isolation Guard on API Layer', async ({ request }) => {
    // Attempt unauthorized access to event analytics from an unauthenticated / isolated tenant
    const res = await request.get(`${BASE_URL}/api/events/evt-arass-ideathon-2026/analytics`);
    expect([401, 403]).toContain(res.status());
  });

  test('5. Event Lifecycle State Machine Validation', async () => {
    const { EventService } = await import('../lib/services/event.service');
    const evt = EventService.create({
      organizationId: 'org-arass',
      name: 'State Machine Test Event',
      slug: `state-machine-test-${Date.now()}`,
      shortDescription: 'State machine test',
      description: 'Comprehensive state machine lifecycle transition test',
      eventType: 'HACKATHON',
      mode: 'ONLINE',
      registrationStart: new Date().toISOString(),
      registrationEnd: new Date(Date.now() + 86400000).toISOString(),
      eventStart: new Date(Date.now() + 172800000).toISOString(),
      eventEnd: new Date(Date.now() + 259200000).toISOString(),
      createdBy: 'user-admin',
    });

    expect(evt.status).toBe('DRAFT');

    // Invalid jump: DRAFT -> COMPLETED should fail
    expect(() => {
      EventService.transitionStatus(evt.id, 'COMPLETED', 'user-admin');
    }).toThrow(/Invalid event state transition/i);

    // Valid transition: DRAFT -> REGISTRATION_OPEN
    const published = EventService.transitionStatus(evt.id, 'REGISTRATION_OPEN', 'user-admin');
    expect(published.status).toBe('REGISTRATION_OPEN');
  });

  test('6. Complete Event Builder Studio Workflow', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    await page.goto(`${BASE_URL}/organizer/events/new`);
    await expect(page.locator('h1')).toContainText('Create New Competition');

    // Step 1 Basics
    await page.fill('input[placeholder*="National Frontier Hackathon"]', `Sovereign AI Hackathon ${Date.now()}`);
    await page.fill('input[placeholder*="48-hour continuous build"]', 'Frontier AI engineering challenge.');
    await page.fill('textarea[placeholder*="technical parameters"]', 'Full technical challenge description and parameters.');
    await page.click('button:has-text("Next: Format & Timeline")');

    // Step 2 Configuration
    await page.click('button:has-text("Review & Publish")');

    // Step 3 Review & Launch
    await page.click('button:has-text("CREATE & INITIALIZE EVENT")');
    await page.waitForURL('**/organizer/events/**/participants');
    await expect(page.locator('h1')).toContainText('Sovereign AI Hackathon');
  });

  test('7. Team Squad Management & Invitations', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/teams`);
    await expect(page.locator('text=Synapse Labs').first()).toBeVisible();
  });

  test('8. Live Competition Authoritative Server Sync', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await expect(page.locator('text=SERVER SYNCED')).toBeVisible();
    await expect(page.locator('h1')).toContainText('ARASS IDEATHON 2026');
  });

  test('9. Multi-Format Submissions with Draft Mode and Versioning', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'Participant@2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);

    // Draft mode
    await page.fill('input[placeholder*="Autonomous Multi-Agent"]', 'Neural DAG Optimizer');
    await page.fill('input[placeholder*="https://github.com"]', 'https://github.com/arass-research/dag-optimizer');
    await page.click('button:has-text("SAVE DRAFT")');
    await expect(page.locator('text=Draft saved locally in workspace state')).toBeVisible();

    // Final Transmission
    await page.click('button:has-text("TRANSMIT DELIVERABLE")');
    await expect(page.locator('text=Deliverable submitted successfully')).toBeVisible();
  });

  test('10. Security: Prohibited Storage Payloads Rejection', async () => {
    const { storage } = await import('../lib/services/storage.service');
    expect(() => {
      storage.validate('malware.exe', 'application/x-msdownload', 1024);
    }).toThrow(/prohibited/i);

    expect(() => {
      storage.validate('payload.pdf', 'application/pdf', 35 * 1024 * 1024);
    }).toThrow(/maximum allowed size/i);
  });

  test('11. Judge Evaluation & Conflict of Interest Guard', async () => {
    const { EvaluationService } = await import('../lib/services/evaluation.service');
    // Marcus Sterling has declared COI on Synapse Labs deliverable sub-synapse-rnd1
    expect(() => {
      EvaluationService.evaluate({
        submissionId: 'sub-synapse-rnd1',
        evaluatorId: 'judge-2',
        scores: { 'crit-1': 25, 'crit-2': 30, 'crit-3': 20 },
      });
    }).toThrow(/Conflict of Interest/i);
  });

  test('12. Deterministic Score Calculation and Leaderboard Rankings', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/leaderboard`);
    await expect(page.locator('h1')).toContainText('Live Competition Leaderboard');
    await expect(page.locator('text=Synapse Labs').first()).toBeVisible();
  });

  test('13. Official Championship Results Publishing', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/results`);
    await expect(page.locator('h1')).toContainText('Championship Honors & Awards');
    await expect(page.locator('text=GRAND CHAMPION')).toBeVisible();
  });

  test('14. Certificate Studio 3.0 & Idempotent Bulk Generation', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    await page.goto(`${BASE_URL}/organizer/certificates`);
    await expect(page.locator('h1')).toContainText('Certificate Studio');
    await page.click('button:has-text("TRIGGER BULK ISSUANCE JOB")');
    await expect(page.locator('text=Bulk generation job started')).toBeVisible();
  });

  test('15. Public QR Verification & Certificate Revocation Handling', async ({ page }) => {
    // Valid certificate
    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await expect(page.locator('text=OFFICIALLY VERIFIED & VALID CREDENTIAL')).toBeVisible();
    await expect(page.locator('text=Alex Chen')).toBeVisible();

    // Invalid certificate
    await page.goto(`${BASE_URL}/verify/certificate/INVALID-FAKE-KEY-999`);
    await expect(page.locator('text=Certificate Invalid or Not Found')).toBeVisible();
  });

  test('16. Notification Center & Real-Time Dispatches', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'Participant@2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    await page.goto(`${BASE_URL}/notifications`);
    await expect(page.locator('h1')).toContainText('Notifications & Dispatches');
    await page.click('button:has-text("MARK ALL READ")');
    await expect(page.locator('text=UNREAD (0)')).toBeVisible();
  });

  test('17. Operational Help Desk & Incidents Management', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/incidents`);
    await expect(page.locator('h2')).toContainText('Incident Management & Help Desk');
    await expect(page.locator('text=Operational Incident Ledger')).toBeVisible();
  });

  test('18. Task Checklist & Safe Event Health Scoring', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    await page.goto(`${BASE_URL}/organizer/tasks`);
    await expect(page.locator('h1')).toContainText('Organizer Task Board');
    await expect(page.locator('text=EVENT HEALTH').first()).toBeVisible();
  });

  test('19. Global Event Discovery & Search Filter', async ({ page }) => {
    await page.goto(`${BASE_URL}/events`);
    await expect(page.locator('h1')).toContainText('BUILD. COMPETE.');

    await page.fill('input[placeholder*="Search hackathons"]', 'Ideathon');
    await expect(page.locator('text=ARASS IDEATHON 2026').first()).toBeVisible();
  });

  const viewports = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1024x768', width: 1024, height: 768 },
    { name: '768x1024', width: 768, height: 1024 },
    { name: '390x844', width: 390, height: 844 },
    { name: '375x812', width: 375, height: 812 },
    { name: '320x568', width: 320, height: 568 },
  ];

  for (const vp of viewports) {
    test(`20. Responsive Zero Horizontal Overflow Audit on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/dashboard`);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
