import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'EVENT_PUBLISH');
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const updated = EventService.publish(event.id, auth.session.userId);
    return NextResponse.json({ success: true, event: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to publish event.' }, { status: 400 });
  }
}
