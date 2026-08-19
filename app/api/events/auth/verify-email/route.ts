import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: 'Verification token is required.' }, { status: 400 });
    }

    await AuthService.verifyEmail(token);
    return NextResponse.json({
      success: true,
      message: 'Email address successfully verified.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Verification failed.' }, { status: 400 });
  }
}
