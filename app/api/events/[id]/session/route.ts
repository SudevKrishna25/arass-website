import { NextRequest, NextResponse } from 'next/server';
import { CompetitionSessionService } from '@/lib/services/session.service';
import { EventService } from '@/lib/services/event.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const sync = CompetitionSessionService.getClockSync(event.id);
  return NextResponse.json({ success: true, sync });
}
