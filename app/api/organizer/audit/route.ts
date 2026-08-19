import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { db } from '@/lib/events-db/engine';

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const url = new URL(req.url);
  const actionFilter = url.searchParams.get('action');
  const eventIdFilter = url.searchParams.get('eventId');

  let logs = db.auditLogs.slice().reverse();

  if (actionFilter && actionFilter !== 'ALL') {
    logs = logs.filter((l) => l.action === actionFilter);
  }

  if (eventIdFilter && eventIdFilter !== 'ALL') {
    logs = logs.filter((l) => l.resourceId === eventIdFilter || l.metadata?.eventId === eventIdFilter);
  }

  return NextResponse.json({
    success: true,
    totalLogs: logs.length,
    logs,
  });
}
