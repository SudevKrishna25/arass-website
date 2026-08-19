import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { ScheduleService } from '@/lib/services/schedule.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const sessions = ScheduleService.getByEvent(event.id);
  return NextResponse.json({ success: true, sessions });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const session = ScheduleService.createSession({
      eventId: event.id,
      title: body.title,
      speaker: body.speaker,
      venue: body.venue,
      room: body.room,
      type: body.type || 'KEYNOTE',
      startAt: body.startAt || new Date().toISOString(),
      endAt: body.endAt || new Date(Date.now() + 3600000).toISOString(),
      actorUserId: auth.session.userId,
    });

    return NextResponse.json({ success: true, session }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Schedule creation failed.' }, { status: 400 });
  }
}
