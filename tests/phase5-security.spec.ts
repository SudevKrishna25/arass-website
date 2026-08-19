import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 5: Security & RBAC Hardening', () => {
  const BASE_URL = 'http://localhost:3000';

  test('1. Unauthenticated Request Rejected on Protected Organizer APIs', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/organizer/analytics`);
    expect(res.status()).toBe(401);
  });

  test('2. Participant Role Rejection on Organizer Live Control API', async ({ request }) => {
    // Login as Participant
    const loginRes = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: {
        email: 'alex.chen@sovereign-tech.org',
        password: 'Participant@2026!',
      },
    });
    expect(loginRes.status()).toBe(200);
    const setCookie = loginRes.headers()['set-cookie'];

    // Try executing organizer control command
    const controlRes = await request.post(`${BASE_URL}/api/events/evt-arass-ideathon-2026/session/control`, {
      headers: { Cookie: setCookie },
      data: { action: 'PAUSE_EVENT' },
    });
    expect(controlRes.status()).toBe(403);
  });

  test('3. Conflict of Interest Disqualification Prevents Evaluation', async ({ request }) => {
    // Admin login
    const adminLogin = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: {
        email: 'admin@arass.local',
        password: 'ARASS@Admin2026!',
      },
    });
    const setCookie = adminLogin.headers()['set-cookie'];

    // Declare conflict for judge-2 on sub-synapse-rnd1
    await request.post(`${BASE_URL}/api/events/evt-arass-ideathon-2026/judges/conflict`, {
      headers: { Cookie: setCookie },
      data: {
        judgeId: 'judge-2',
        submissionId: 'sub-synapse-rnd1',
        reason: 'ORGANIZATION',
      },
    });

    // Attempt to assign conflicted judge to that submission
    const assignRes = await request.post(`${BASE_URL}/api/events/evt-arass-ideathon-2026/judges`, {
      headers: { Cookie: setCookie },
      data: {
        action: 'ASSIGN',
        judgeId: 'judge-2',
        submissionId: 'sub-synapse-rnd1',
        roundId: 'rnd-ideathon-1',
      },
    });

    expect(assignRes.status()).toBe(400);
    const data = await assignRes.json();
    expect(data.error).toContain('Conflict of Interest');
  });
});
