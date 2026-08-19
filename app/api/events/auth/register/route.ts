import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json({ error: 'Missing required fields (email, password, name).' }, { status: 400 });
    }

    const { user, profile, token } = await AuthService.register({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role,
      college: body.college,
      skills: body.skills,
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
    return NextResponse.json({ error: err.message || 'Registration failed.' }, { status: 400 });
  }
}
