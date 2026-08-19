import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/events-db/engine';
import { EventService } from '@/lib/services/event.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const faqs = Array.from(db.eventFAQs.values())
    .filter((f) => f.eventId === event.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const rules = Array.from(db.eventRules.values())
    .filter((r) => r.eventId === event.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return NextResponse.json({ success: true, faqs, rules });
}
