import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { UserManagementService } from '@/lib/services/user-management.service';

export async function POST(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'USER_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'userId is required.' }, { status: 400 });
    }

    const res = await UserManagementService.revokeSessions(userId, auth.session.userId);
    return NextResponse.json({ success: true, message: `Sessions for user ${userId} revoked.` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to revoke user sessions.' }, { status: 400 });
  }
}
