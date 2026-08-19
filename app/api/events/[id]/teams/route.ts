import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { TeamService } from '@/lib/services/team.service';
import { EventService } from '@/lib/services/event.service';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const teams = Array.from(db.teams.values()).filter((t) => t.eventId === event.id);
  return NextResponse.json({ success: true, count: teams.length, teams });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Team name is required.' }, { status: 400 });
    }

    const team = TeamService.create(event.id, auth.session.userId, body.name);
    return NextResponse.json({ success: true, team });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create team.' }, { status: 400 });
  }
}
