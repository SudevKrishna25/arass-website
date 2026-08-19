import { NextRequest, NextResponse } from 'next/server';
import { requireRoleGuard } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { CertificateBatchService } from '@/lib/services/certificate-batch.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const jobs = CertificateBatchService.getByEvent(event.id);
  return NextResponse.json({ success: true, jobs });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireRoleGuard(req, ['SUPER_ADMIN', 'ORGANIZER', 'MANAGER']);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { templateId, type, position } = body;

    const job = CertificateBatchService.createJob({
      eventId: event.id,
      templateId,
      type,
      position,
      operatorId: auth.session.userId,
    });

    return NextResponse.json({ success: true, job });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Batch certificate generation failed.' }, { status: 400 });
  }
}
