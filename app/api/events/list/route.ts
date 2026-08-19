import { NextRequest, NextResponse } from 'next/server';
import { EventService } from '@/lib/services/event.service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as any;
  const eventType = searchParams.get('eventType') as any;
  const mode = searchParams.get('mode') as any;
  const search = searchParams.get('search') || undefined;

  const events = EventService.list({ status, eventType, mode, search });
  return NextResponse.json({ success: true, count: events.length, events });
}
