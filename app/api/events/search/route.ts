import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').toLowerCase().trim();
  const type = url.searchParams.get('type') || 'ALL';
  const mode = url.searchParams.get('mode') || 'ALL';

  let events = Array.from(db.events.values());

  if (q) {
    events = events.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.eventType.toLowerCase().includes(q) ||
        (e.location && e.location.toLowerCase().includes(q))
    );
  }

  if (type !== 'ALL') {
    events = events.filter((e) => e.eventType === type);
  }

  if (mode !== 'ALL') {
    events = events.filter((e) => e.mode === mode);
  }

  return NextResponse.json({
    success: true,
    count: events.length,
    events,
  });
}
