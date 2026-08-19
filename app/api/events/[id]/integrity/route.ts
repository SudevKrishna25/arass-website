import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { IntegrityService } from '@/lib/services/integrity.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const telemetry = IntegrityService.getEventTelemetry(event.id);
  return NextResponse.json({ success: true, ...telemetry });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { type, details } = body;

    const eventRecord = IntegrityService.recordEvent(
      event.id,
      auth.session.userId,
      type,
      details
    );

    return NextResponse.json({ success: true, eventRecord }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Logging integrity event failed.' }, { status: 400 });
  }
}
