import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory sliding window rate limiter for client IPs
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 submissions
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

const VALID_ALIGNMENTS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  'RESEARCHER / SCIENTIST',
  'FOUNDER / BUILDER',
  'STRATEGIC CAPITAL',
  'INSTITUTIONAL PARTNER',
  'GENERAL INQUIRY',
];

export async function POST(req: NextRequest) {
  try {
    // 1. IP Resolution & Rate Limiting
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait 15 minutes before submitting another inquiry.',
        },
        { status: 429 }
      );
    }

    // 2. Parse JSON Request Body
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload. JSON format required.' },
        { status: 400 }
      );
    }

    const { name, email, organization, message, alignment } = body;

    // 3. Validation Rules
    const errors: string[] = [];

    // Name check
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Full name is required (minimum 2 characters).');
    } else if (name.trim().length > 100) {
      errors.push('Full name must not exceed 100 characters.');
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      errors.push('A valid email address is required.');
    } else if (email.trim().length > 100) {
      errors.push('Email address must not exceed 100 characters.');
    }

    // Organization check
    if (organization && typeof organization === 'string' && organization.trim().length > 150) {
      errors.push('Organization name must not exceed 150 characters.');
    }

    // Message check
    if (message && typeof message === 'string' && message.trim().length > 2000) {
      errors.push('Message body must not exceed 2000 characters.');
    }

    // Alignment check
    if (alignment && !VALID_ALIGNMENTS.includes(String(alignment).trim())) {
      errors.push('Invalid institutional alignment selection.');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: errors.join(' '),
        },
        { status: 400 }
      );
    }

    // 4. Submission Payload Processing
    const submission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: organization ? String(organization).trim() : 'N/A',
      message: message ? String(message).trim() : '',
      alignment: alignment ? String(alignment).trim() : '01',
      timestamp: new Date().toISOString(),
      clientIp,
    };

    // Log structured submission safely on server
    console.log('[ARASS SERVER] Institutional Inquiry Received:', submission);

    // Optional Production Email Dispatching Hook
    if (process.env.RESEND_API_KEY && process.env.INQUIRY_RECIPIENT_EMAIL) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'ARASS System <noreply@arass.io>',
            to: process.env.INQUIRY_RECIPIENT_EMAIL,
            subject: `[ARASS INQUIRY] Alignment ${submission.alignment} - ${submission.name}`,
            html: `
              <h2>ARASS Institutional Inquiry Received</h2>
              <p><strong>Name:</strong> ${submission.name}</p>
              <p><strong>Email:</strong> ${submission.email}</p>
              <p><strong>Organization:</strong> ${submission.organization}</p>
              <p><strong>Alignment:</strong> ${submission.alignment}</p>
              <p><strong>Message:</strong></p>
              <p>${submission.message}</p>
              <hr />
              <p><small>Timestamp: ${submission.timestamp} | IP: ${submission.clientIp}</small></p>
            `,
          }),
        });
      } catch (emailErr) {
        console.error('[ARASS SERVER] Email dispatch error:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: submission.timestamp,
    });
  } catch (err) {
    console.error('[ARASS SERVER] Inquiry processing error:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
