import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';
import { getSession } from '@/lib/auth/guard';

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required.' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters long.' }, { status: 400 });
    }

    await AuthService.changePassword(session.userId, currentPassword, newPassword);
    return NextResponse.json({
      success: true,
      message: 'Password successfully changed.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Password change failed.' }, { status: 400 });
  }
}
