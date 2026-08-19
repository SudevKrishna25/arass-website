import { NextRequest, NextResponse } from 'next/server';
import { requireRoleGuard } from '@/lib/auth/guard';
import { emailService } from '@/lib/services/email.service';
import { AuditService } from '@/lib/services/audit.service';
import { db } from '@/lib/events-db/engine';

export async function POST(req: NextRequest) {
  const auth = requireRoleGuard(req, ['SUPER_ADMIN', 'ORGANIZER', 'MANAGER']);
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { eventId, subject, targetAudience } = body;
    const message = body.message || body.body;

    if (!subject || !message) {
      return NextResponse.json({ error: 'Subject and message are required.' }, { status: 400 });
    }

    // Determine target recipient count from real database
    let recipientCount = 0;
    if (eventId) {
      const regs = Array.from(db.registrations.values()).filter((r) => r.eventId === eventId);
      recipientCount = regs.length;
    } else {
      recipientCount = db.users.size;
    }

    // Send dispatch via email service
    const result = await emailService.send({
      to: `broadcast-${targetAudience || 'all'}@arass.technology`,
      subject,
      html: `<p>${message}</p>`,
    });

    AuditService.log('COMMUNICATION_DISPATCHED', 'COMMUNICATION', result.id, auth.session.userId, {
      subject,
      targetAudience,
      recipientCount,
    });

    return NextResponse.json({
      success: true,
      messageId: result.id,
      recipientCount,
      dispatchedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to dispatch communication.' }, { status: 400 });
  }
}
