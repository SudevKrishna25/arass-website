import { db } from '@/lib/events-db/engine';
import { DeadlineExtension } from '@/lib/events-db/types';
import { AuditService } from './audit.service';
import { NotificationService } from './notification.service';

export class ExtensionService {
  static extend(params: {
    eventId: string;
    roundId?: string;
    targetType: DeadlineExtension['targetType'];
    newDeadline: string;
    reason: string;
    operatorId: string;
  }): DeadlineExtension {
    const event = db.events.get(params.eventId);
    if (!event) throw new Error('Event not found.');

    let previousDeadline = '';

    if (params.targetType === 'REGISTRATION') {
      previousDeadline = event.registrationEnd;
      event.registrationEnd = params.newDeadline;
      db.events.set(event.id, event);
    } else if (params.targetType === 'ROUND' && params.roundId) {
      const round = db.rounds.get(params.roundId);
      if (!round) throw new Error('Round not found.');
      previousDeadline = round.endAt;
      round.endAt = params.newDeadline;
      db.rounds.set(round.id, round);
    } else {
      previousDeadline = event.eventEnd;
      event.eventEnd = params.newDeadline;
      db.events.set(event.id, event);
    }

    const id = `ext-${db.generateId()}`;
    const extension: DeadlineExtension = {
      id,
      eventId: params.eventId,
      roundId: params.roundId,
      targetType: params.targetType,
      previousDeadline,
      newDeadline: params.newDeadline,
      reason: params.reason,
      operatorId: params.operatorId,
      createdAt: db.now(),
    };

    db.deadlineExtensions.set(id, extension);

    AuditService.log('DEADLINE_EXTENDED', 'EVENT', params.eventId, params.operatorId, {
      targetType: params.targetType,
      previousDeadline,
      newDeadline: params.newDeadline,
      reason: params.reason,
    });

    // Notify all registered participants
    const regs = Array.from(db.registrations.values()).filter((r) => r.eventId === params.eventId);
    for (const reg of regs) {
      NotificationService.send({
        userId: reg.userId,
        eventId: params.eventId,
        title: 'Deadline Extension Notice',
        message: `The ${params.targetType.toLowerCase()} deadline for ${event.name} has been extended to ${new Date(params.newDeadline).toUTCString()}. Reason: ${params.reason}`,
        type: 'DEADLINE_REMINDER',
        actionUrl: `/events/${event.slug}/live`,
        actorUserId: params.operatorId,
      });
    }

    return extension;
  }

  static getByEvent(eventId: string): DeadlineExtension[] {
    return Array.from(db.deadlineExtensions.values())
      .filter((e) => e.eventId === eventId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
