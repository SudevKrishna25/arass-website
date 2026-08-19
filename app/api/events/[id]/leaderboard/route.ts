import { NextRequest, NextResponse } from 'next/server';
import { EventService } from '@/lib/services/event.service';
import { LeaderboardService } from '@/lib/services/leaderboard.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const leaderboard = LeaderboardService.getEventLeaderboard(event.id);
  return NextResponse.json({ success: true, ...leaderboard });
}
