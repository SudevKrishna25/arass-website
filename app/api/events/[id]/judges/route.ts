import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { JudgeOpsService } from '@/lib/services/judge-ops.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const intelligence = JudgeOpsService.getJudgingIntelligence(event.id);
  return NextResponse.json({ success: true, ...intelligence });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { action, judgeId, submissionId, roundId, name, email, organization, expertise } = body;

    if (action === 'INVITE') {
      const judge = JudgeOpsService.inviteJudge({
        name,
        email,
        organization: organization || 'Independent Juror',
        expertise: expertise || ['General Evaluation'],
        actorUserId: auth.session.userId,
      });
      return NextResponse.json({ success: true, judge }, { status: 201 });
    }

    if (action === 'ASSIGN') {
      const assignment = JudgeOpsService.assignJudge(
        judgeId,
        event.id,
        submissionId,
        roundId,
        auth.session.userId
      );
      return NextResponse.json({ success: true, assignment }, { status: 201 });
    }

    throw new Error(`Unsupported action: ${action}`);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Judge operation failed.' }, { status: 400 });
  }
}
