import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { EventBuilderService } from '@/lib/services/event-builder.service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const archived = EventBuilderService.archiveEvent(event.id, auth.session.userId);
    return NextResponse.json({ success: true, event: archived });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Archiving failed.' }, { status: 400 });
  }
}
