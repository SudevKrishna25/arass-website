import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/services/auth.service';
import { rateLimiter } from '@/lib/services/rate-limit.service';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = await rateLimiter.check(`forgot-pass:${ip}`, 5, 300); // 5 requests per 5 minutes
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: `Too many password reset requests. Please try again in ${rateLimit.reset}s.` },
        { status: 429 }
      );
    }

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const result = await AuthService.requestPasswordReset(email);
    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been dispatched.',
      resetToken: result.resetToken,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unable to process reset request.' }, { status: 500 });
  }
}
