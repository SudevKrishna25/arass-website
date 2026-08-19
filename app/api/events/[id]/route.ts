import { NextRequest, NextResponse } from 'next/server';
import { EventService } from '@/lib/services/event.service';
import { RoundService } from '@/lib/services/round.service';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) {
    return NextResponse.json({ error: 'Event not found.' }, { status: 404 });
  }

  const rounds = RoundService.getByEvent(event.id);
  const fields = Array.from(db.registrationFields.values())
    .filter((f) => f.eventId === event.id)
    .sort((a, b) => a.order - b.order);

  const org = db.organizations.get(event.organizationId);

  return NextResponse.json({
    success: true,
    event,
    organization: org,
    rounds,
    registrationFields: fields,
  });
}
