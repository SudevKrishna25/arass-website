import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard, requireOrgIsolationGuard } from '@/lib/auth/guard';
import { AnalyticsService } from '@/lib/services/analytics.service';
import { EventService } from '@/lib/services/event.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requirePermissionGuard(req, 'ANALYTICS_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const orgCheck = requireOrgIsolationGuard(auth.session, event.organizationId);
  if (!orgCheck.authorized && orgCheck.errorResponse) return orgCheck.errorResponse;

  const metrics = AnalyticsService.getEventMetrics(event.id);
  return NextResponse.json({ success: true, metrics });
}
