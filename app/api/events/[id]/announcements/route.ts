import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { LiveAnnouncementService } from '@/lib/services/announcement.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const announcements = LiveAnnouncementService.getByEvent(event.id);
  return NextResponse.json({ success: true, announcements });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { title, message, priority, audience, roundId } = body;

    const announcement = LiveAnnouncementService.broadcast(
      event.id,
      title,
      message,
      priority,
      audience,
      roundId,
      auth.session.userId
    );

    return NextResponse.json({ success: true, announcement }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Announcement broadcast failed.' }, { status: 400 });
  }
}
