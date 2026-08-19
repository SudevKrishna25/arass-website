import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const events = Array.from(db.events.values());
  const registrations = Array.from(db.registrations.values());
  const teams = Array.from(db.teams.values());
  const submissions = Array.from(db.submissions.values());
  const evaluations = Array.from(db.evaluations.values());
  const certificates = Array.from(db.certificates.values());
  const checkIns = Array.from(db.checkIns.values());
  const integrityEvents = db.integrityEvents;

  const totalPrize = events.reduce((sum, e) => sum + (e.prizePool || 0), 0);
  const evaluatedCount = evaluations.length;

  const eventBreakdowns = events.map((e) => {
    const eRegs = registrations.filter((r) => r.eventId === e.id);
    const eSubs = submissions.filter((s) => s.eventId === e.id);
    const eChecks = checkIns.filter((c) => c.eventId === e.id && c.status === 'CHECKED_IN');
    const eCerts = certificates.filter((c) => c.eventId === e.id);

    return {
      id: e.id,
      slug: e.slug,
      name: e.name,
      status: e.status,
      mode: e.mode,
      prizePool: e.prizePool,
      totalRegistrations: eRegs.length,
      totalSubmissions: eSubs.length,
      checkedInCount: eChecks.length,
      certificatesIssued: eCerts.length,
    };
  });

  return NextResponse.json({
    success: true,
    summary: {
      totalEvents: events.length,
      activeEvents: events.filter((e) => e.status === 'LIVE' || e.status === 'REGISTRATION_OPEN').length,
      totalRegistrations: registrations.length,
      totalTeams: teams.length,
      totalSubmissions: submissions.length,
      totalEvaluations: evaluatedCount,
      totalCertificates: certificates.length,
      totalCheckIns: checkIns.filter((c) => c.status === 'CHECKED_IN').length,
      totalPrizePool: `₹${totalPrize.toLocaleString()}`,
      integrityFlags: integrityEvents.filter((i) => i.status === 'FLAGGED').length,
    },
    eventBreakdowns,
  });
}
