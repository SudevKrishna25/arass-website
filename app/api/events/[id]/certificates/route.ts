import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { CertificateService } from '@/lib/services/certificate.service';
import { EventService } from '@/lib/services/event.service';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const certificates = Array.from(db.certificates.values()).filter((c) => c.eventId === event.id);
  return NextResponse.json({ success: true, count: certificates.length, certificates });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'CERTIFICATE_CREATE');
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    if (!body.recipientUserId || !body.type) {
      return NextResponse.json({ error: 'Recipient userId and certificate type are required.' }, { status: 400 });
    }

    const certificate = CertificateService.issue({
      eventId: event.id,
      recipientUserId: body.recipientUserId,
      type: body.type,
      position: body.position,
      teamId: body.teamId,
      actorUserId: auth.session.userId,
    });

    return NextResponse.json({ success: true, certificate });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to issue certificate.' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'CERTIFICATE_REVOKE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const { certificateId, reason } = await req.json();
    if (!certificateId) return NextResponse.json({ error: 'CertificateId is required.' }, { status: 400 });

    const certificate = CertificateService.revoke(certificateId, auth.session.userId, reason || 'Administrative revocation');
    return NextResponse.json({ success: true, certificate });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to revoke certificate.' }, { status: 400 });
  }
}
