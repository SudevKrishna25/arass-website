/**
 * ARASS EVENTS — Event Operations & Builder Service
 */

import { db } from '../events-db/engine';
import { Event } from '../events-db/types';
import { AuditService } from './audit.service';

export class EventBuilderService {
  static duplicateEvent(sourceEventId: string, actorUserId: string, newSlug?: string): Event {
    const source = db.events.get(sourceEventId);
    if (!source) throw new Error('Source event not found.');

    const newId = db.generateId();
    const slug = newSlug || `${source.slug}-copy-${Date.now()}`;
    const now = db.now();

    const duplicatedEvent: Event = {
      ...source,
      id: newId,
      slug,
      name: `${source.name} (Copy)`,
      status: 'DRAFT',
      createdAt: now,
      updatedAt: now,
    };

    db.events.set(newId, duplicatedEvent);

    // Duplicate Registration Fields
    const sourceFields = Array.from(db.registrationFields.values()).filter((f) => f.eventId === sourceEventId);
    for (const f of sourceFields) {
      const newFieldId = db.generateId();
      db.registrationFields.set(newFieldId, {
        ...f,
        id: newFieldId,
        eventId: newId,
      });
    }

    // Duplicate Rounds & Criteria
    const sourceRounds = Array.from(db.rounds.values()).filter((r) => r.eventId === sourceEventId);
    for (const r of sourceRounds) {
      const newRoundId = db.generateId();
      db.rounds.set(newRoundId, {
        ...r,
        id: newRoundId,
        eventId: newId,
        status: 'DRAFT',
        createdAt: now,
        updatedAt: now,
      });

      const sourceCriteria = Array.from(db.evaluationCriteria.values()).filter((c) => c.roundId === r.id);
      for (const c of sourceCriteria) {
        const newCritId = db.generateId();
        db.evaluationCriteria.set(newCritId, {
          ...c,
          id: newCritId,
          roundId: newRoundId,
        });
      }
    }

    AuditService.log('EVENT_DUPLICATED', 'EVENT', newId, actorUserId, {
      sourceEventId,
      newSlug: slug,
    });

    return duplicatedEvent;
  }

  static archiveEvent(eventId: string, actorUserId: string): Event {
    const event = db.events.get(eventId);
    if (!event) throw new Error('Event not found.');

    event.status = 'COMPLETED';
    event.updatedAt = db.now();

    AuditService.log('EVENT_ARCHIVED', 'EVENT', eventId, actorUserId, {
      status: event.status,
    });

    return event;
  }
}
