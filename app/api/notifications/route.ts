import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { NotificationService } from '@/lib/services/notification.service';

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const notifications = NotificationService.getByUser(auth.session.userId);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return NextResponse.json({ success: true, notifications, unreadCount });
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { action, notificationId } = body;

    if (action === 'MARK_ALL_READ') {
      const count = NotificationService.markAllAsRead(auth.session.userId);
      return NextResponse.json({ success: true, count });
    }

    if (action === 'MARK_READ' && notificationId) {
      const ok = NotificationService.markAsRead(notificationId, auth.session.userId);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: 'Invalid notification action.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Operation failed.' }, { status: 400 });
  }
}
