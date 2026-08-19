import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/guard';
import { AuthService } from '@/lib/services/auth.service';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.set('arass_events_session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
