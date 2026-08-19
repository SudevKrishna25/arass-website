import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { UserManagementService } from '@/lib/services/user-management.service';

export async function GET(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'USER_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  const url = new URL(req.url);
  const role = url.searchParams.get('role') as any;
  const status = url.searchParams.get('status') as any;
  const query = url.searchParams.get('query') || undefined;

  const users = UserManagementService.listUsers({ role, status, query });
  return NextResponse.json({ success: true, count: users.length, users });
}

export async function PUT(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'USER_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const { userId, role, status, reason } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: 'userId parameter is required.' }, { status: 400 });
    }

    let user;
    if (role) {
      user = UserManagementService.updateUserRole(userId, role, auth.session.userId, reason);
    }
    if (status) {
      user = UserManagementService.updateUserStatus(userId, status, auth.session.userId, reason);
    }

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update user.' }, { status: 400 });
  }
}
