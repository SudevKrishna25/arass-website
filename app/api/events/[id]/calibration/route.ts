import { NextRequest, NextResponse } from 'next/server';
import { requireRoleGuard } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { JudgeCalibrationService } from '@/lib/services/judge-calibration.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireRoleGuard(req, ['SUPER_ADMIN', 'ORGANIZER', 'MANAGER', 'EVALUATOR']);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const calibration = JudgeCalibrationService.getEventCalibration(event.id);
  return NextResponse.json({ success: true, calibration });
}
