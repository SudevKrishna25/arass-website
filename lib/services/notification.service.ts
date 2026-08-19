import { db } from '@/lib/events-db/engine';
import { Notification, AuditAction } from '@/lib/events-db/types';
import { AuditService } from './audit.service';
import { emailService } from './email.service';

export class NotificationService {
  static send(params: {
    userId: string;
    eventId?: string;
    title: string;
    message: string;
    type: Notification['type'];
    channel?: 'IN_APP' | 'EMAIL';
    actionUrl?: string;
    actorUserId?: string;
  }): Notification {
    const id = `notif-${db.generateId()}`;
    const channel = params.channel || 'IN_APP';

    const notif: Notification = {
      id,
      userId: params.userId,
      eventId: params.eventId,
      title: params.title,
      message: params.message,
      type: params.type,
      channel,
      read: false,
      actionUrl: params.actionUrl,
      createdAt: db.now(),
    };

    db.notifications.set(id, notif);

    // If email channel requested or important notification, also trigger mock email
    if (channel === 'EMAIL' || params.type === 'CERTIFICATE' || params.type === 'DEADLINE_REMINDER') {
      const user = db.users.get(params.userId);
      if (user) {
        emailService.send({
          to: user.email,
          subject: `[ARASS] ${params.title}`,
          html: `<p>${params.message}</p>`,
        });
      }
    }

    AuditService.log('NOTIFICATION_SENT', 'NOTIFICATION', id, params.actorUserId || params.userId, {
      type: params.type,
      channel,
      targetUserId: params.userId,
    });

    return notif;
  }

  static getByUser(userId: string): Notification[] {
    return Array.from(db.notifications.values())
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static markAsRead(notificationId: string, userId: string): boolean {
    const notif = db.notifications.get(notificationId);
    if (!notif || notif.userId !== userId) return false;
    notif.read = true;
    db.notifications.set(notificationId, notif);
    return true;
  }

  static markAllAsRead(userId: string): number {
    let count = 0;
    for (const notif of db.notifications.values()) {
      if (notif.userId === userId && !notif.read) {
        notif.read = true;
        count++;
      }
    }
    return count;
  }
}
