import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requirePermissionGuard } from '@/lib/auth/guard';
import { SubmissionService } from '@/lib/services/submission.service';
import { EventService } from '@/lib/services/event.service';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'SUBMISSION_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const submissions = Array.from(db.submissions.values()).filter((s) => s.eventId === event.id);
  return NextResponse.json({ success: true, count: submissions.length, submissions });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    if (!body.roundId || !body.title) {
      return NextResponse.json({ error: 'Missing required submission fields (roundId, title).' }, { status: 400 });
    }

    const submission = SubmissionService.create({
      roundId: body.roundId,
      title: body.title,
      description: body.description,
      url: body.url,
      files: body.files,
      participantId: auth.session.userId,
      teamId: body.teamId,
    });

    return NextResponse.json({ success: true, submission });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Submission failed.' }, { status: 400 });
  }
}
