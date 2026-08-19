import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requirePermissionGuard } from '@/lib/auth/guard';
import { RegistrationService } from '@/lib/services/registration.service';
import { EventService } from '@/lib/services/event.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'PARTICIPANT_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const registrations = RegistrationService.getByEvent(event.id);
  return NextResponse.json({ success: true, count: registrations.length, registrations });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json().catch(() => ({}));
    const registration = RegistrationService.register({
      eventId: event.id,
      userId: auth.session.userId,
      teamId: body.teamId,
      customValues: body.customValues,
    });

    return NextResponse.json({ success: true, registration });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Registration failed.' }, { status: 400 });
  }
}
