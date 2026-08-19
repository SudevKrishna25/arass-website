import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const { user, profile, token } = await AuthService.login({
      email: body.email,
      password: body.password,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role, status: user.status },
      profile,
      token,
    });

    response.cookies.set('arass_events_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication failed.' }, { status: 401 });
  }
}
