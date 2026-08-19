import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';
import { getSession } from '@/lib/auth/guard';

export async function POST(req: NextRequest) {
  try {
    const session = getSession(req);
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    await AuthService.revokeAllSessions(session.userId);

    const res = NextResponse.json({
      success: true,
      message: 'All active sessions have been revoked. Please sign in again.',
    });

    res.cookies.set('arass_events_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unable to revoke sessions.' }, { status: 500 });
  }
}
