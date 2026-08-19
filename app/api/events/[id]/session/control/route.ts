import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { CompetitionSessionService } from '@/lib/services/session.service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  if (auth.session.role !== 'SUPER_ADMIN' && auth.session.role !== 'ORGANIZER') {
    return NextResponse.json({ error: 'Forbidden: Organizer or Super Admin privileges required.' }, { status: 403 });
  }

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { action, targetRoundId } = body;

    let result: any = null;

    if (action === 'START_EVENT') {
      result = CompetitionSessionService.startEvent(event.id, auth.session.userId);
    } else if (action === 'PAUSE_EVENT') {
      result = CompetitionSessionService.pauseEvent(event.id, auth.session.userId);
    } else if (action === 'RESUME_EVENT') {
      result = CompetitionSessionService.resumeEvent(event.id, auth.session.userId);
    } else if (action === 'ADVANCE_ROUND') {
      if (!targetRoundId) throw new Error('Target round ID required.');
      result = CompetitionSessionService.advanceRound(event.id, targetRoundId, auth.session.userId);
    } else if (action === 'LOCK_SUBMISSIONS') {
      if (!targetRoundId) throw new Error('Target round ID required.');
      result = CompetitionSessionService.lockSubmissions(targetRoundId, auth.session.userId);
    } else {
      throw new Error(`Unsupported control action: ${action}`);
    }

    return NextResponse.json({ success: true, result, session: CompetitionSessionService.getOrCreateSession(event.id) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Action failed.' }, { status: 400 });
  }
}
