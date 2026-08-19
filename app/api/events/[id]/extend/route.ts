import { NextRequest, NextResponse } from 'next/server';
import { requireRoleGuard } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { ExtensionService } from '@/lib/services/extension.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const extensions = ExtensionService.getByEvent(event.id);
  return NextResponse.json({ success: true, extensions });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireRoleGuard(req, ['SUPER_ADMIN', 'ORGANIZER', 'MANAGER']);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { targetType, roundId, newDeadline, reason } = body;

    if (!targetType || !newDeadline || !reason) {
      return NextResponse.json({ error: 'Target type, new deadline, and reason are required.' }, { status: 400 });
    }

    const extension = ExtensionService.extend({
      eventId: event.id,
      roundId,
      targetType,
      newDeadline,
      reason,
      operatorId: auth.session.userId,
    });

    return NextResponse.json({ success: true, extension });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Deadline extension failed.' }, { status: 400 });
  }
}
