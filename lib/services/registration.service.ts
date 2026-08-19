/**
 * ARASS EVENTS — Registration Service
 */

import { db } from '../events-db/engine';
import { Registration, RegistrationStatus } from '../events-db/types';
import { AuditService } from './audit.service';
import { AnalyticsService } from './analytics.service';

export interface RegisterParticipantDTO {
  eventId: string;
  userId: string;
  teamId?: string;
  customValues?: Record<string, any>;
}

export class RegistrationService {
  static register(dto: RegisterParticipantDTO): Registration {
    const event = db.events.get(dto.eventId);
    if (!event) throw new Error('Event not found.');

    if (event.status !== 'REGISTRATION_OPEN') {
      throw new Error(`Registration is not open for this event (Current status: ${event.status}).`);
    }

    const nowTime = new Date().getTime();
    if (new Date(event.registrationEnd).getTime() < nowTime) {
      throw new Error('Registration deadline has passed.');
    }

    const existing = Array.from(db.registrations.values()).find(
      (r) => r.eventId === dto.eventId && r.userId === dto.userId
    );
    if (existing) {
      throw new Error('Participant is already registered for this event.');
    }

    const regId = db.generateId();
    const now = db.now();

    const registration: Registration = {
      id: regId,
      eventId: dto.eventId,
      userId: dto.userId,
      teamId: dto.teamId,
      status: 'VERIFIED',
      customValues: dto.customValues || {},
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    db.registrations.set(regId, registration);

    AuditService.log('REGISTRATION_CREATED', 'REGISTRATION', regId, dto.userId, { eventId: dto.eventId });
    AnalyticsService.track('REGISTRATION_COMPLETED', dto.eventId, dto.userId);

    return registration;
  }

  static getByEvent(eventId: string): Registration[] {
    return Array.from(db.registrations.values()).filter((r) => r.eventId === eventId);
  }

  static updateStatus(registrationId: string, status: RegistrationStatus, actorUserId: string): Registration {
    const reg = db.registrations.get(registrationId);
    if (!reg) throw new Error('Registration not found.');

    reg.status = status;
    reg.updatedAt = db.now();

    if (status === 'SHORTLISTED') {
      AuditService.log('PARTICIPANT_SHORTLISTED', 'REGISTRATION', registrationId, actorUserId, { status });
    }

    return reg;
  }
}
