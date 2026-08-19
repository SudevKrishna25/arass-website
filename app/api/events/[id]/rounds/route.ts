import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { RoundService } from '@/lib/services/round.service';
import { EventService } from '@/lib/services/event.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const rounds = RoundService.getByEvent(event.id);
  return NextResponse.json({ success: true, rounds });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'ROUND_CREATE');
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    if (!body.name || !body.startAt || !body.endAt || !body.submissionType) {
      return NextResponse.json({ error: 'Missing required round fields.' }, { status: 400 });
    }

    const round = RoundService.create({
      eventId: event.id,
      name: body.name,
      description: body.description || '',
      order: body.order || 1,
      startAt: body.startAt,
      endAt: body.endAt,
      submissionType: body.submissionType,
      maxAttempts: body.maxAttempts,
      criteria: body.criteria,
      actorUserId: auth.session.userId,
    });

    return NextResponse.json({ success: true, round });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create round.' }, { status: 400 });
  }
}
