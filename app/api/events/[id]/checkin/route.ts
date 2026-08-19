import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { CheckInService } from '@/lib/services/checkin.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const summary = CheckInService.getEventCheckIns(event.id);
  return NextResponse.json({ success: true, ...summary });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { participantId, method, teamId } = body;

    const record = CheckInService.performCheckIn(
      event.id,
      participantId,
      method || 'MANUAL',
      auth.session.userId,
      teamId
    );

    return NextResponse.json({ success: true, record }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Check-in failed.' }, { status: 400 });
  }
}
