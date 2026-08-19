import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/guard';
import { AuthService } from '@/lib/services/auth.service';

export async function GET(req: NextRequest) {
  const session = getSession(req);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const userRecord = AuthService.getUserById(session.userId);
  if (!userRecord) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: userRecord.user.id,
      email: userRecord.user.email,
      role: userRecord.user.role,
      status: userRecord.user.status,
    },
    profile: userRecord.profile,
  });
}
