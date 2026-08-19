import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { db } from '@/lib/events-db/engine';
import { AuditService } from '@/lib/services/audit.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const certificates = Array.from(db.certificates.values()).filter((c) => c.eventId === event.id);

  const winners = certificates.filter((c) => c.type === 'WINNER');
  const runnerUps = certificates.filter((c) => c.type === 'RUNNER_UP');
  const finalists = certificates.filter((c) => c.type === 'FINALIST');
  const specialAwards = certificates.filter((c) => c.type === 'SPECIAL_AWARD');

  return NextResponse.json({
    success: true,
    published: event.status === 'COMPLETED' || winners.length > 0,
    results: {
      winners,
      runnerUps,
      finalists,
      specialAwards,
      totalRecognized: certificates.length,
    },
  });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  event.status = 'COMPLETED';
  event.updatedAt = db.now();

  AuditService.log('RESULTS_PUBLISHED', 'EVENT', event.id, auth.session.userId, {
    publishedAt: db.now(),
  });

  return NextResponse.json({ success: true, event });
}
