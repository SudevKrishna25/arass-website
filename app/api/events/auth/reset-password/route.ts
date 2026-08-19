import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password are required.' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    await AuthService.resetPassword(token, newPassword);
    return NextResponse.json({
      success: true,
      message: 'Password successfully updated. You may now sign in with your new credentials.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Password reset failed.' }, { status: 400 });
  }
}
