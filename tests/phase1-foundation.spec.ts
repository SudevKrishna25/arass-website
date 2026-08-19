import { test, expect } from '@playwright/test';

test.describe('ARASS EVENTS // Phase 1: Foundation, Architecture, Database & Auth', () => {
  const BASE_URL = 'http://localhost:3000';

  test.beforeAll(async ({ request }) => {
    await request.post(`${BASE_URL}/api/events/reset`);
  });

  test('1. Super Admin Login & Token Issuance', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: {
        email: 'admin@arass.local',
        password: 'ARASS@Admin2026!',
      },
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user.role).toBe('SUPER_ADMIN');
    expect(body.token).toBeDefined();
  });

  test('2. Authentication Rejects Invalid Credentials', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: {
        email: 'admin@arass.local',
        password: 'WrongPassword!',
      },
    });

    expect(res.status()).toBe(401);
  });

  test('3. RBAC: Unauthorized Access Rejection on Protected Endpoints', async ({ request }) => {
    // Participant login
    const loginRes = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: {
        email: 'alex.chen@sovereign-tech.org',
        password: 'Participant@2026!',
      },
    });
    const { token } = await loginRes.json();

    // Participant attempts to create an organization (Requires ORG_MANAGE)
    const orgRes = await request.post(`${BASE_URL}/api/events/organizations`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: 'Unauthorized Org',
        slug: 'unauthorized-org',
      },
    });

    expect(orgRes.status()).toBe(403);
  });

  test('4. End-to-End Foundation Workflow', async ({ request }) => {
    // A. Super Admin Login
    const adminLoginRes = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: { email: 'admin@arass.local', password: 'ARASS@Admin2026!' },
    });
    const { token: adminToken } = await adminLoginRes.json();

    // B. Create New Host Organization
    const orgSlug = `test-org-${Date.now()}`;
    const createOrgRes = await request.post(`${BASE_URL}/api/events/organizations`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: {
        name: 'ARASS Innovation Lab',
        slug: orgSlug,
        website: 'https://lab.arass.technology',
      },
    });
    expect(createOrgRes.status()).toBe(200);
    const { organization: org } = await createOrgRes.json();
    expect(org.slug).toBe(orgSlug);

    // C. Register New Organizer User
    const orgEmail = `organizer-${Date.now()}@arass.technology`;
    const regOrgRes = await request.post(`${BASE_URL}/api/events/auth/register`, {
      data: {
        email: orgEmail,
        password: 'OrganizerSecurePass@2026!',
        name: 'Dr. Sarah Connor',
        role: 'ORGANIZER',
      },
    });
    expect(regOrgRes.status()).toBe(200);
    const { token: organizerToken, user: orgUser } = await regOrgRes.json();
    expect(orgUser.role).toBe('ORGANIZER');

    // D. Organizer Creates Event Draft with Custom Registration Fields
    const eventSlug = `quantum-hackathon-${Date.now()}`;
    const createEventRes = await request.post(`${BASE_URL}/api/events/create`, {
      headers: { Authorization: `Bearer ${organizerToken}` },
      data: {
        organizationId: org.id,
        slug: eventSlug,
        name: 'Quantum Systems Hackathon 2026',
        shortDescription: 'National quantum algorithms & distributed systems build challenge.',
        description: 'Deep technical exploration of post-quantum cryptographic primitives and routing pipelines.',
        eventType: 'HACKATHON',
        mode: 'ONLINE',
        registrationStart: new Date().toISOString(),
        registrationEnd: new Date(Date.now() + 86400000 * 5).toISOString(),
        eventStart: new Date(Date.now() + 86400000 * 6).toISOString(),
        eventEnd: new Date(Date.now() + 86400000 * 8).toISOString(),
        minTeamSize: 1,
        maxTeamSize: 3,
        prizePool: 75000,
        fields: [
          { label: 'GitHub Profile', type: 'URL', required: true, order: 1 },
          { label: 'Academic Standing', type: 'SELECT', required: true, order: 2, options: ['Undergraduate', 'Postgraduate', 'Professional'] },
        ],
      },
    });
    expect(createEventRes.status()).toBe(200);
    const { event } = await createEventRes.json();
    expect(event.slug).toBe(eventSlug);

    // E. Organizer Creates Multi-Criteria Scoring Round
    const createRoundRes = await request.post(`${BASE_URL}/api/events/${event.id}/rounds`, {
      headers: { Authorization: `Bearer ${organizerToken}` },
      data: {
        name: 'Round 1: Quantum Circuit Implementation',
        description: 'Submit algorithmic architecture and benchmark results.',
        order: 1,
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 86400000 * 2).toISOString(),
        submissionType: 'MIXED',
        maxAttempts: 2,
        criteria: [
          { name: 'Algorithmic Efficiency', weight: 50, maxScore: 50 },
          { name: 'Architectural Correctness', weight: 50, maxScore: 50 },
        ],
      },
    });
    expect(createRoundRes.status()).toBe(200);
    const { round } = await createRoundRes.json();

    // F. Register New Participant
    const partEmail1 = `participant1-${Date.now()}@university.edu`;
    const regPart1Res = await request.post(`${BASE_URL}/api/events/auth/register`, {
      data: {
        email: partEmail1,
        password: 'ParticipantPass@2026!',
        name: 'Kai Vance',
        college: 'Oxford University',
      },
    });
    const { token: part1Token, user: part1User } = await regPart1Res.json();

    // G. Transition Event to REGISTRATION_OPEN and Register Participant
    // First, let's register for ARASS IDEATHON 2026 (which is open)
    const registerIdeathonRes = await request.post(`${BASE_URL}/api/events/arass-ideathon-2026/registrations`, {
      headers: { Authorization: `Bearer ${part1Token}` },
      data: {
        customValues: {
          'rf-1': 'Oxford University',
          'rf-2': 'Distributed Infrastructure',
        },
      },
    });
    expect(registerIdeathonRes.status()).toBe(200);

    // Duplicate Registration is Prevented
    const dupRes = await request.post(`${BASE_URL}/api/events/arass-ideathon-2026/registrations`, {
      headers: { Authorization: `Bearer ${part1Token}` },
    });
    expect(dupRes.status()).toBe(400);

    // H. Participant Creates Team
    const teamRes = await request.post(`${BASE_URL}/api/events/arass-ideathon-2026/teams`, {
      headers: { Authorization: `Bearer ${part1Token}` },
      data: { name: 'Aether Quantum Crew' },
    });
    expect(teamRes.status()).toBe(200);
    const { team } = await teamRes.json();
    expect(team.name).toBe('Aether Quantum Crew');

    // I. Participant Submits Work for Round 1
    const subRes = await request.post(`${BASE_URL}/api/events/arass-ideathon-2026/submissions`, {
      headers: { Authorization: `Bearer ${part1Token}` },
      data: {
        roundId: 'rnd-ideathon-1',
        teamId: team.id,
        title: 'Quantum Routing Kernel Implementation',
        url: 'https://github.com/aether/quantum-kernel',
      },
    });
    expect(subRes.status()).toBe(200);
    const { submission } = await subRes.json();
    expect(submission.title).toBe('Quantum Routing Kernel Implementation');

    // J. Evaluator Login and Score Submission
    const evalLoginRes = await request.post(`${BASE_URL}/api/events/auth/login`, {
      data: { email: 'evaluator@arass.technology', password: 'Evaluator@2026!' },
    });
    const { token: evalToken } = await evalLoginRes.json();

    const evalRes = await request.post(`${BASE_URL}/api/events/arass-ideathon-2026/evaluations`, {
      headers: { Authorization: `Bearer ${evalToken}` },
      data: {
        submissionId: submission.id,
        scores: {
          'crit-1': 29,
          'crit-2': 38,
          'crit-3': 28,
        },
        comments: 'Outstanding algorithmic complexity reduction.',
      },
    });
    expect(evalRes.status()).toBe(200);
    const { evaluation } = await evalRes.json();
    expect(evaluation.totalScore).toBe(95);

    // K. Organizer Issues Verified Certificate
    const certRes = await request.post(`${BASE_URL}/api/events/arass-ideathon-2026/certificates`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: {
        recipientUserId: part1User.id,
        type: 'WINNER',
        position: 'Grand Prize Finalist',
        teamId: team.id,
      },
    });
    expect(certRes.status()).toBe(200);
    const { certificate } = await certRes.json();
    expect(certificate.certificateId).toContain('ARASS-');

    // L. Public Certificate Verification Endpoint
    const verifyRes = await request.get(`${BASE_URL}/api/events/certificates/verify/${certificate.certificateId}`);
    expect(verifyRes.status()).toBe(200);
    const verifyBody = await verifyRes.json();
    expect(verifyBody.valid).toBe(true);
    expect(verifyBody.certificate.recipientName).toBe('Kai Vance');

    // M. Verify Flagship Seed Certificate ARASS-IDEA-2026-000001
    const seedCertRes = await request.get(`${BASE_URL}/api/events/certificates/verify/ARASS-IDEA-2026-000001`);
    expect(seedCertRes.status()).toBe(200);
    const seedCertBody = await seedCertRes.json();
    expect(seedCertBody.valid).toBe(true);
    expect(seedCertBody.certificate.recipientName).toBe('Alex Chen');

    // N. Audit Log Verification
    const auditRes = await request.get(`${BASE_URL}/api/events/arass-ideathon-2026/audit`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(auditRes.status()).toBe(200);
    const auditBody = await auditRes.json();
    expect(auditBody.logs.length).toBeGreaterThan(0);
  });
});
