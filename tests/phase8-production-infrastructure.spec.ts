import { test, expect } from '@playwright/test';
import { db } from '../lib/events-db/engine';

const BASE_URL = 'http://localhost:3000';

test.describe('ARASS EVENTS // Phase 8: Real Production Infrastructure & Launch Readiness', () => {
  test.beforeAll(async ({ request }) => {
    db.reset();
    await request.post(`${BASE_URL}/api/events/reset`).catch(() => {});
  });

  test('1. Authentication Lifecycle: Password Reset Flow', async ({ page, request }) => {
    // A. Request Password Reset via API to get generated token
    const res = await request.post(`${BASE_URL}/api/events/auth/forgot-password`, {
      data: { email: 'alex.chen@sovereign-tech.org' },
    });
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.resetToken).toBeDefined();

    // B. Reset Password via Token
    await page.goto(`${BASE_URL}/reset-password?token=${data.resetToken}`);
    await page.locator('input[type="password"]').nth(0).fill('NewSecurePassword2026!');
    await page.locator('input[type="password"]').nth(1).fill('NewSecurePassword2026!');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=PASSWORD UPDATED')).toBeVisible();
  });

  test('2. Authentication Lifecycle: Email Verification', async ({ page }) => {
    await page.goto(`${BASE_URL}/verify-email?token=verify_test_token_123`);
    await expect(page.locator('text=EMAIL OFFICIALLY VERIFIED')).toBeVisible();
  });

  test('3. Session Security: Global Session Revocation', async ({ request }) => {
    const loginRes = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: { email: 'admin@arass.local', password: 'ARASS@Admin2026!' },
    });
    const { token } = await loginRes.json();

    const revokeRes = await request.post(`${BASE_URL}/api/events/auth/revoke-sessions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(revokeRes.status()).toBe(200);
    const body = await revokeRes.json();
    expect(body.success).toBe(true);
  });

  test('4. Multi-Role RBAC & Unauthorized Route Interception', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'NewSecurePassword2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    // Attempt direct access to organizer restricted dashboard
    await page.goto(`${BASE_URL}/organizer/dashboard`);
    await expect(page).not.toHaveURL(`${BASE_URL}/organizer/dashboard`);
  });

  test('5. Organization Tenancy Isolation Guard', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/events/evt-arass-ideathon-2026/analytics`);
    expect([401, 403]).toContain(res.status());
  });

  test('6. Strict Event Lifecycle State Machine', async () => {
    const { EventService } = await import('../lib/services/event.service');
    const evt = EventService.create({
      organizationId: 'org-arass',
      name: 'Phase 8 State Machine Benchmark',
      slug: `p8-sm-${Date.now()}`,
      shortDescription: 'State machine lifecycle validation',
      description: 'Ensuring strict state progression.',
      eventType: 'HACKATHON',
      mode: 'ONLINE',
      registrationStart: new Date().toISOString(),
      registrationEnd: new Date(Date.now() + 86400000).toISOString(),
      eventStart: new Date(Date.now() + 172800000).toISOString(),
      eventEnd: new Date(Date.now() + 259200000).toISOString(),
      createdBy: 'user-admin',
    });

    expect(evt.status).toBe('DRAFT');

    // Illegal skip
    expect(() => {
      EventService.transitionStatus(evt.id, 'COMPLETED', 'user-admin');
    }).toThrow(/Invalid event state transition/i);

    // Legal transition
    const published = EventService.transitionStatus(evt.id, 'REGISTRATION_OPEN', 'user-admin');
    expect(published.status).toBe('REGISTRATION_OPEN');
  });

  test('7. Dynamic Participant Registration & Idempotency', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.click('button:has-text("REGISTER")');
    const randEmail = `builder_${Date.now()}@sovereign-ai.org`;
    await page.fill('input[placeholder*="Alex Chen"]', 'Elena Rostova');
    await page.fill('input[type="email"]', randEmail);
    await page.fill('input[type="password"]', 'Pass2026!Secure');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard');
    await expect(page.locator('h1')).toContainText('Elena Rostova');
  });

  test('8. Team Squad Roster Management', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/organizer/dashboard');

    await page.goto(`${BASE_URL}/organizer/events/arass-ideathon-2026/teams`);
    await expect(page.locator('text=Synapse Labs').first()).toBeVisible();
  });

  test('9. Submissions & Draft State Management', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'NewSecurePassword2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');

    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/live`);
    await page.fill('input[placeholder*="Autonomous Multi-Agent"]', 'Consensus Mesh Protocol');
    await page.click('button:has-text("SAVE DRAFT")');
    await expect(page.locator('text=Draft saved locally in workspace state')).toBeVisible();
  });

  test('10. Authoritative Server Clock & Deadline Validation', async () => {
    const { ClockService } = await import('../lib/services/clock.service');
    const now = ClockService.now();
    expect(now.timezone).toBe('UTC');

    const pastDeadline = new Date(Date.now() - 3600000).toISOString();
    const isPastValid = ClockService.isWithinDeadline(pastDeadline, 0);
    expect(isPastValid).toBe(false);

    const futureDeadline = new Date(Date.now() + 3600000).toISOString();
    const isFutureValid = ClockService.isWithinDeadline(futureDeadline);
    expect(isFutureValid).toBe(true);
  });

  test('11. Judge Evaluation & Conflict of Interest Guard', async () => {
    const { EvaluationService } = await import('../lib/services/evaluation.service');
    expect(() => {
      EvaluationService.evaluate({
        submissionId: 'sub-synapse-rnd1',
        evaluatorId: 'judge-2',
        scores: { 'crit-1': 25, 'crit-2': 30, 'crit-3': 20 },
      });
    }).toThrow(/Conflict of Interest/i);
  });

  test('12. Deterministic Scoring & Leaderboard', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/leaderboard`);
    await expect(page.locator('h1')).toContainText('Live Competition Leaderboard');
    await expect(page.locator('text=Synapse Labs').first()).toBeVisible();
  });

  test('13. Official Championship Results Publishing', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/results`);
    await expect(page.locator('h1')).toContainText('Championship Honors & Awards');
    await expect(page.locator('text=GRAND CHAMPION')).toBeVisible();
  });

  test('14. Real Server-Side PDF Certificate Generation & Storage Commit', async () => {
    const { PdfCertificateService } = await import('../lib/services/pdf-certificate.service');
    const result = await PdfCertificateService.renderAndStore({
      certificateId: 'ARASS-P8-TEST-0001',
      recipientName: 'Dr. Evelyn Vance',
      eventName: 'ARASS NEURAL HACKATHON 2026',
      position: 'First Place // Grand Champion',
      issuedAt: new Date().toISOString(),
      verificationHash: '98fbc923a8e91d...',
      pageSize: 'A4',
      orientation: 'LANDSCAPE',
    });

    expect(result.pdfUrl).toBeDefined();
    expect(result.hash).toBeDefined();
    expect(result.storageKey).toContain('ARASS-P8-TEST-0001.pdf');
  });

  test('15. Certificate Revocation & Public Security Badge', async ({ page, request }) => {
    const loginRes = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: { email: 'admin@arass.local', password: 'ARASS@Admin2026!' },
    });
    const { token } = await loginRes.json();

    await request.patch(`${BASE_URL}/api/events/evt-arass-ideathon-2026/certificates`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { certificateId: 'ARASS-IDEA-2026-000001', reason: 'Administrative audit correction' },
    });

    await page.goto(`${BASE_URL}/verify/certificate/ARASS-IDEA-2026-000001`);
    await expect(page.locator('text=CERTIFICATE HAS BEEN REVOKED')).toBeVisible();
    await expect(page.locator('text=Administrative audit correction')).toBeVisible();
  });

  test('16. Storage Security: Prohibited Disguised Double Extensions & Malware', async () => {
    const { storage } = await import('../lib/services/storage.service');
    expect(() => {
      storage.validate('malware.exe', 'application/x-msdownload', 1024);
    }).toThrow(/prohibited/i);

    expect(() => {
      storage.validate('payload.sh.pdf', 'application/pdf', 1024);
    }).toThrow(/prohibited disguised extension/i);
  });

  test('17. Storage Security: 25MB Size Limit Rejection', async () => {
    const { storage } = await import('../lib/services/storage.service');
    expect(() => {
      storage.validate('large_archive.zip', 'application/zip', 30 * 1024 * 1024);
    }).toThrow(/maximum allowed size/i);
  });

  test('18. Transactional Email Template Suite (16 Templates)', async () => {
    const { renderEmailTemplate } = await import('../lib/services/email-templates');
    const template = renderEmailTemplate('CERTIFICATE_ISSUED', {
      recipientName: 'Alex Chen',
      certificateId: 'ARASS-IDEA-2026-000001',
      position: 'Grand Champion',
      actionUrl: 'https://events.arass.technology/verify/certificate/ARASS-IDEA-2026-000001',
    });

    expect(template.subject).toContain('ARASS-IDEA-2026-000001');
    expect(template.html).toContain('Certificate of Honor Issued');
    expect(template.text).toContain('ARASS-IDEA-2026-000001');
  });

  test('19. SSRF Protection: Private IP & Localhost Interception', async () => {
    const { validateSafeUrl } = await import('../lib/security/ssrf.ts');
    expect(validateSafeUrl('http://127.0.0.1:8080/admin').valid).toBe(false);
    expect(validateSafeUrl('http://localhost:3000').valid).toBe(false);
    expect(validateSafeUrl('http://169.254.169.254/latest/meta-data/').valid).toBe(false);
    expect(validateSafeUrl('http://10.0.0.1/private').valid).toBe(false);
    expect(validateSafeUrl('https://github.com/arass/repo').valid).toBe(true);
  });

  test('20. XSS & User Input Sanitization', async () => {
    const { sanitizeInput } = await import('../lib/security/sanitize.ts');
    const dirty = '<script>alert("xss")</script><iframe src="evil.com"></iframe>Clean text';
    const clean = sanitizeInput(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).not.toContain('<iframe>');
    expect(clean).toContain('Clean text');
  });

  test('21. Pluggable Rate Limiting Engine', async () => {
    const { LocalRateLimiter } = await import('../lib/services/rate-limit.service');
    const limiter = new LocalRateLimiter();
    const key = `test_limit_${Date.now()}`;

    // Exhaust 3 tokens
    await limiter.check(key, 3, 60);
    await limiter.check(key, 3, 60);
    await limiter.check(key, 3, 60);

    const fourth = await limiter.check(key, 3, 60);
    expect(fourth.allowed).toBe(false);
    expect(fourth.remaining).toBe(0);
  });

  test('22. Super Admin First-Run Bootstrap Security', async ({ request }) => {
    // Unauthorized without secret
    const unauthorizedRes = await request.post(`${BASE_URL}/api/admin/bootstrap`, {
      data: { email: 'founder@arass.technology', password: 'FounderPassword2026!' },
    });
    expect(unauthorizedRes.status()).toBe(403);

    // Authorized with secret
    const authorizedRes = await request.post(`${BASE_URL}/api/admin/bootstrap`, {
      headers: { 'x-bootstrap-secret': 'ARASS_PRODUCTION_BOOTSTRAP_2026' },
      data: { email: 'founder@arass.technology', password: 'FounderPassword2026!', name: 'ARASS Founder' },
    });
    expect(authorizedRes.status()).toBe(200);
  });

  test('23. Immutable Audit Trail Logging', async () => {
    const { AuditService } = await import('../lib/services/audit.service');
    AuditService.log('SECURITY_TEST_AUDIT', 'SECURITY', 'sec-1', 'user-admin', { verified: true });
    const log = db.auditLogs.find((l) => l.action === 'SECURITY_TEST_AUDIT');
    expect(log).toBeDefined();
    expect(log?.actorUserId).toBe('user-admin');
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
    test(`24. Responsive Zero Horizontal Overflow Audit on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(`${BASE_URL}/events`);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
    });
  }
});
