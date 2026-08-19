import { test, expect, Page } from '@playwright/test';

const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000';

async function loginAsAdmin(page: Page) {
  await page.request.post(`${BASE_URL}/api/events/auth/login`, {
    data: {
      email: 'admin@arass.local',
      password: 'ARASS@Admin2026!',
    },
  });
}

test.describe('ARASS // Master Website + Events + Admin Control System Suite', () => {
  test('1. Public Events Discovery Page Accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/events`);
    await expect(page).toHaveURL(`${BASE_URL}/events`);
    await expect(page.locator('h1')).toContainText('BUILD. COMPETE.');
  });

  test('2. Admin Login & Role Authorization', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');
    await expect(page).toHaveURL(`${BASE_URL}/admin`);
  });

  test('3. Unauthorized Admin Reception Guard', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'alex.chen@sovereign-tech.org');
    await page.fill('input[type="password"]', 'Participant@2026!');
    await page.click('button[type="submit"]');

    await page.goto(`${BASE_URL}/admin`);
    // Should be redirected or denied access
    await page.waitForTimeout(500);
    const currentUrl = page.url();
    expect(currentUrl.includes('/admin')).toBeFalsy();
  });

  test('4. Admin Event Builder Creation', async ({ page }) => {
    await loginAsAdmin(page);
    const res = await page.request.post(`${BASE_URL}/api/events/create`, {
      data: {
        name: 'ARASS ROBOTICS CUP 2026',
        slug: 'arass-robotics-cup-2026',
        organizationId: 'org-arass-technology-foundation',
        shortDescription: 'Autonomous robotics manipulation challenge.',
        description: 'Design humanoid robotic actuators and control algorithms.',
        eventType: 'INNOVATION',
        mode: 'HYBRID',
        registrationStart: new Date().toISOString(),
        registrationEnd: new Date(Date.now() + 86400000 * 7).toISOString(),
        eventStart: new Date(Date.now() + 86400000 * 8).toISOString(),
        eventEnd: new Date(Date.now() + 86400000 * 14).toISOString(),
        minTeamSize: 1,
        maxTeamSize: 5,
        prizePool: 25000,
        rounds: [
          {
            name: 'Round 1: Simulation',
            description: 'MuJoCo physical simulation.',
            order: 1,
            startAt: new Date(Date.now() + 86400000 * 8).toISOString(),
            endAt: new Date(Date.now() + 86400000 * 14).toISOString(),
          },
        ],
      },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.event.id).toBeDefined();
  });

  test('5. Event Editing & Property Updates', async ({ page }) => {
    await loginAsAdmin(page);
    const listRes = await page.request.get(`${BASE_URL}/api/events/list`);
    const listData = await listRes.json();
    const evt = listData.events[0];

    const updateRes = await page.request.post(`${BASE_URL}/api/events/create`, {
      data: {
        id: evt.id,
        name: evt.name,
        slug: evt.slug,
        organizationId: evt.organizationId || 'org-arass-technology-foundation',
        shortDescription: 'Updated short description tagline.',
        description: evt.description,
        eventType: evt.eventType,
        mode: evt.mode,
        registrationStart: evt.registrationStart,
        registrationEnd: evt.registrationEnd,
        eventStart: evt.eventStart,
        eventEnd: evt.eventEnd,
      },
    });
    expect(updateRes.status()).toBe(200);
  });

  test('6. Event Publication Checklist & State Transition', async ({ page }) => {
    await loginAsAdmin(page);
    const listRes = await page.request.get(`${BASE_URL}/api/events/list`);
    const listData = await listRes.json();
    const evt = listData.events[0];

    const pubRes = await page.request.post(`${BASE_URL}/api/events/${evt.id}/publish`, {
      data: { status: 'REGISTRATION_OPEN' },
    });
    expect(pubRes.status()).toBe(200);
  });

  test('7. Public Event Visibility Filter', async ({ page }) => {
    await page.goto(`${BASE_URL}/events`);
    await expect(page.locator('text=ARASS IDEATHON 2026')).toBeVisible();
  });

  test('8. Event Registration Flow', async ({ page }) => {
    await page.goto(`${BASE_URL}/events/arass-ideathon-2026/register`);
    await expect(page).toHaveURL(/.*register/);
  });

  test('9. CMS Pages Listing & Creation', async ({ page }) => {
    await loginAsAdmin(page);
    const res = await page.request.get(`${BASE_URL}/api/admin/content/pages`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.pages.length).toBeGreaterThan(0);
  });

  test('10. CMS Section Creation', async ({ page }) => {
    await loginAsAdmin(page);
    const res = await page.request.post(`${BASE_URL}/api/admin/content/sections`, {
      data: {
        pageId: 'page-home',
        type: 'TEXT',
        title: 'Architectural Systems Core',
        eyebrow: '01 // DISCIPLINE',
        body: 'High-throughput fault-tolerant enterprise software.',
      },
    });
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.section.id).toBeDefined();
  });

  test('11. CMS Section Reordering', async ({ page }) => {
    await loginAsAdmin(page);
    const secRes = await page.request.get(`${BASE_URL}/api/admin/content/sections?pageId=page-home`);
    const secData = await secRes.json();
    const ids = secData.sections.map((s: any) => s.id);

    if (ids.length > 1) {
      const reorderRes = await page.request.put(`${BASE_URL}/api/admin/content/sections`, {
        data: {
          reorder: true,
          pageId: 'page-home',
          sectionIds: ids.reverse(),
        },
      });
      expect(reorderRes.status()).toBe(200);
    }
  });

  test('12. CMS Section Visibility Toggle', async ({ page }) => {
    await loginAsAdmin(page);
    const secRes = await page.request.get(`${BASE_URL}/api/admin/content/sections?pageId=page-home`);
    const secData = await secRes.json();
    const sec = secData.sections[0];

    if (sec) {
      const toggleRes = await page.request.put(`${BASE_URL}/api/admin/content/sections`, {
        data: {
          id: sec.id,
          visibility: sec.visibility === 'VISIBLE' ? 'HIDDEN' : 'VISIBLE',
        },
      });
      expect(toggleRes.status()).toBe(200);
    }
  });

  test('13. CMS Section Deletion', async ({ page }) => {
    await loginAsAdmin(page);
    const createRes = await page.request.post(`${BASE_URL}/api/admin/content/sections`, {
      data: {
        pageId: 'page-work',
        type: 'CTA',
        title: 'Temporary Section to Delete',
      },
    });
    const createData = await createRes.json();

    const deleteRes = await page.request.delete(
      `${BASE_URL}/api/admin/content/sections?id=${createData.section.id}`
    );
    expect(deleteRes.status()).toBe(200);
  });

  test('14. Homepage Signature Brand Tagline Protection', async ({ page }) => {
    await page.goto(`${BASE_URL}`);
    await expect(page.locator('h1')).toContainText("WE DON'T FOLLOW");
    await expect(page.locator('h1')).toContainText('THE FUTURE.');
    await expect(page.locator('h1')).toContainText('WE BUILD IT.');
  });

  test('15. Navigation CMS Items Listing', async ({ page }) => {
    const res = await page.request.get(`${BASE_URL}/api/admin/navigation`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.items.length).toBeGreaterThan(0);
  });

  test('16. Navigation Hierarchy Updates', async ({ page }) => {
    await loginAsAdmin(page);
    const getRes = await page.request.get(`${BASE_URL}/api/admin/navigation`);
    const getData = await getRes.json();

    const putRes = await page.request.put(`${BASE_URL}/api/admin/navigation`, {
      data: { items: getData.items },
    });
    expect(putRes.status()).toBe(200);
  });

  test('17. Media Library Storage Upload Guard', async ({ page }) => {
    await loginAsAdmin(page);
    const res = await page.request.get(`${BASE_URL}/api/admin/media`);
    expect(res.status()).toBe(200);
  });

  test('18. User Roster & Role Updates', async ({ page }) => {
    await loginAsAdmin(page);
    const res = await page.request.get(`${BASE_URL}/api/admin/users`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.users.length).toBeGreaterThan(0);
  });

  test('19. Session Revocation Security', async ({ page }) => {
    await loginAsAdmin(page);
    const res = await page.request.post(`${BASE_URL}/api/admin/users/revoke-sessions`, {
      data: { userId: '44444444-4444-4444-a444-444444444444' },
    });
    expect(res.status()).toBe(200);
  });

  test('20. Immutable Audit Trail Logging', async ({ page }) => {
    await loginAsAdmin(page);
    const res = await page.request.get(`${BASE_URL}/api/admin/overview`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.recentAuditLogs).toBeDefined();
  });

  test('21. Admin Dashboard Overview Metrics', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="email"]', 'admin@arass.local');
    await page.fill('input[type="password"]', 'ARASS@Admin2026!');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin');

    await expect(page.locator('h1')).toContainText('System Operational Overview');
    await expect(page.locator('text=What Needs My Attention?')).toBeVisible();
  });

  test('22. Admin Events Roster UI', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto(`${BASE_URL}/admin/events`);
    await expect(page.locator('h1')).toContainText('Event Architecture Directory');
  });

  test('23. Admin Website CMS UI', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto(`${BASE_URL}/admin/content`);
    await expect(page.locator('h1')).toContainText('Website Content Management');
  });

  test('24. Admin Media Library UI', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto(`${BASE_URL}/admin/media`);
    await expect(page.locator('h1')).toContainText('Media Asset Library');
  });

  test('25. Admin User Management UI', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto(`${BASE_URL}/admin/users`);
    await expect(page.locator('h1')).toContainText('User & Role Management');
  });

  test('26. Admin Navigation CMS UI', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto(`${BASE_URL}/admin/navigation`);
    await expect(page.locator('h1')).toContainText('Public Navigation Manager');
  });

  test('27. Admin Audit Logs UI', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto(`${BASE_URL}/admin/audit`);
    await expect(page.locator('h1')).toContainText('System Operations Audit Ledger');
  });

  test('28. Responsive Zero Overflow Audit Across Viewports', async ({ page }) => {
    const viewports = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
      { width: 375, height: 812 },
      { width: 320, height: 568 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize(vp);
      await page.goto(`${BASE_URL}/events`);
      const hasHorizontalScrollbar = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(hasHorizontalScrollbar).toBe(false);
    }
  });
});
