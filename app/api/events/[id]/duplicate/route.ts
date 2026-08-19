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
    const body = await req.json().catch(() => ({}));
    const duplicated = EventBuilderService.duplicateEvent(
      event.id,
      auth.session.userId,
      body.newSlug
    );

    return NextResponse.json({ success: true, event: duplicated }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Duplication failed.' }, { status: 400 });
  }
}
