import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { JudgeOpsService } from '@/lib/services/judge-ops.service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { judgeId, submissionId, participantId, reason } = body;

    const conflict = JudgeOpsService.declareConflict({
      judgeId,
      eventId: event.id,
      submissionId,
      participantId,
      reason: reason || 'OTHER',
      actorUserId: auth.session.userId,
    });

    return NextResponse.json({ success: true, conflict }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Conflict declaration failed.' }, { status: 400 });
  }
}
