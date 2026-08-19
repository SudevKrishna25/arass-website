import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { RegistrationService } from '@/lib/services/registration.service';
import { RegistrationStatus } from '@/lib/events-db/types';

export async function PATCH(req: NextRequest, { params }: { params: { id: string; regId: string } }) {
  const auth = requirePermissionGuard(req, 'PARTICIPANT_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const status = body.status as RegistrationStatus;
    if (!status) {
      return NextResponse.json({ error: 'Status is required.' }, { status: 400 });
    }

    const updated = RegistrationService.updateStatus(params.regId, status, auth.session.userId);
    return NextResponse.json({ success: true, registration: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update registration status.' }, { status: 400 });
  }
}
