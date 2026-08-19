/**
 * ARASS EVENTS — Integrity & Anti-Cheat Telemetry Service
 */

import { db } from '../events-db/engine';
import { IntegrityEvent, IntegrityEventType } from '../events-db/types';
import { AuditService } from './audit.service';

export class IntegrityService {
  static recordEvent(
    eventId: string,
    participantId: string,
    type: IntegrityEventType,
    details?: Record<string, any>
  ): IntegrityEvent {
    const existingEvents = db.integrityEvents.filter(
      (e) => e.eventId === eventId && e.participantId === participantId && e.type === type
    );

    let severity: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    let status: 'NORMAL' | 'FLAGGED' = 'NORMAL';

    if (existingEvents.length >= 4 || type === 'MULTIPLE_SESSION') {
      severity = 'HIGH';
      status = 'FLAGGED';
    } else if (existingEvents.length >= 2 || type === 'PASTE') {
      severity = 'MEDIUM';
    }

    const eventRecord: IntegrityEvent = {
      id: db.generateId(),
      eventId,
      participantId,
      type,
      severity,
      status,
      details,
      timestamp: db.now(),
    };

    db.integrityEvents.push(eventRecord);

    if (status === 'FLAGGED') {
      AuditService.log('INTEGRITY_FLAG_CREATED', 'INTEGRITY_EVENT', eventRecord.id, participantId, {
        eventId,
        type,
        severity,
      });
    }

    return eventRecord;
  }

  static getEventTelemetry(eventId: string) {
    const events = db.integrityEvents.filter((e) => e.eventId === eventId);
    const flaggedParticipants = new Set(events.filter((e) => e.status === 'FLAGGED').map((e) => e.participantId));

    return {
      totalIntegrityEvents: events.length,
      flaggedCount: flaggedParticipants.size,
      events: events.slice().reverse(),
    };
  }
}
