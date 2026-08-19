import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'ANALYTICS_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  const events = Array.from(db.events.values());
  const liveEvents = events.filter((e) => e.status === 'LIVE');
  const regOpenEvents = events.filter((e) => e.status === 'REGISTRATION_OPEN');
  const submissions = Array.from(db.submissions.values());
  const pendingSubmissions = submissions.filter((s) => s.status === 'SUBMITTED');
  const certificates = Array.from(db.certificates.values());
  const pages = Array.from(db.pages.values());
  const draftPages = pages.filter((p) => p.status === 'DRAFT');
  const auditLogs = db.auditLogs.slice(-10).reverse();

  return NextResponse.json({
    success: true,
    attention: {
      liveEventsCount: liveEvents.length,
      registrationClosingCount: regOpenEvents.length,
      pendingSubmissionsCount: pendingSubmissions.length,
      certificatesCount: certificates.length,
      contentDraftsCount: draftPages.length,
      systemAlertsCount: 0,
    },
    metrics: {
      totalEvents: events.length,
      totalRegistrations: db.registrations.size,
      totalTeams: db.teams.size,
      totalSubmissions: submissions.length,
      totalCertificates: certificates.length,
      totalUsers: db.users.size,
    },
    recentAuditLogs: auditLogs,
  });
}
