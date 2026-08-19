import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { SupportService } from '@/lib/services/support.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  let tickets = [];
  if (auth.session.role === 'SUPER_ADMIN' || auth.session.role === 'ORGANIZER') {
    tickets = SupportService.getByEvent(event.id);
  } else {
    tickets = SupportService.getByParticipant(auth.session.userId).filter((t) => t.eventId === event.id);
  }

  return NextResponse.json({ success: true, tickets });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { action, ticketId, response, category, priority, message } = body;

    if (action === 'RESPOND' && ticketId && response) {
      const updated = SupportService.respondTicket(ticketId, response, auth.session.userId);
      return NextResponse.json({ success: true, ticket: updated });
    }

    if (!category || !message) {
      return NextResponse.json({ error: 'Category and message are required.' }, { status: 400 });
    }

    const ticket = SupportService.createTicket({
      eventId: event.id,
      participantId: auth.session.userId,
      category,
      priority: priority || 'MEDIUM',
      message,
    });

    return NextResponse.json({ success: true, ticket });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Ticket creation failed.' }, { status: 400 });
  }
}
