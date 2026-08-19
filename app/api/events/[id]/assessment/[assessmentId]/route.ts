import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { AssessmentService } from '@/lib/services/assessment.service';
import { EventService } from '@/lib/services/event.service';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; assessmentId: string } }
) {
  try {
    const { assessment, questions } = AssessmentService.getAssessmentForParticipant(params.assessmentId);
    return NextResponse.json({ success: true, assessment, questions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Assessment not found.' }, { status: 404 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; assessmentId: string } }
) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { answers, teamId } = body;

    const attempt = AssessmentService.submitAttempt(
      params.assessmentId,
      auth.session.userId,
      answers || {},
      teamId
    );

    return NextResponse.json({ success: true, attempt }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Submission failed.' }, { status: 400 });
  }
}
