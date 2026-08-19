import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { AuditService } from '@/lib/services/audit.service';
import { EventService } from '@/lib/services/event.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'AUDIT_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  const resourceId = event ? event.id : params.id;

  const logs = AuditService.getLogs(100, resourceId);
  return NextResponse.json({ success: true, count: logs.length, logs });
}
