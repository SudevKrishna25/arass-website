import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { EvaluationService } from '@/lib/services/evaluation.service';

export async function POST(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'SUBMISSION_EVALUATE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    if (!body.submissionId || !body.scores) {
      return NextResponse.json({ error: 'Missing submissionId or scores.' }, { status: 400 });
    }

    const evaluation = EvaluationService.evaluate({
      submissionId: body.submissionId,
      evaluatorId: auth.session.userId,
      scores: body.scores,
      comments: body.comments,
    });

    return NextResponse.json({ success: true, evaluation });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Evaluation failed.' }, { status: 400 });
  }
}
