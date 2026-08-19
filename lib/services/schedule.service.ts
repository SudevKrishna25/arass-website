/**
 * ARASS EVENTS — Schedule & Sponsor Services
 */

import { db } from '../events-db/engine';
import { EventSession, Sponsor, SponsorTier, SessionType } from '../events-db/types';
import { AuditService } from './audit.service';

export class ScheduleService {
  static createSession(data: {
    eventId: string;
    title: string;
    speaker?: string;
    venue?: string;
    room?: string;
    type: SessionType;
    startAt: string;
    endAt: string;
    actorUserId?: string;
  }): EventSession {
    const sessionId = db.generateId();
    const session: EventSession = {
      id: sessionId,
      eventId: data.eventId,
      title: data.title,
      speaker: data.speaker,
      venue: data.venue,
      room: data.room,
      type: data.type,
      startAt: data.startAt,
      endAt: data.endAt,
    };

    db.eventSessions.set(sessionId, session);

    AuditService.log('SCHEDULE_CREATED', 'EVENT_SESSION', sessionId, data.actorUserId, {
      eventId: data.eventId,
      title: data.title,
    });

    return session;
  }

  static getByEvent(eventId: string): EventSession[] {
    return Array.from(db.eventSessions.values())
      .filter((s) => s.eventId === eventId)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }
}

export class SponsorService {
  static addSponsor(data: {
    eventId: string;
    name: string;
    logo: string;
    website: string;
    tier: SponsorTier;
    description?: string;
    actorUserId?: string;
  }): Sponsor {
    const sponsorId = db.generateId();
    const sponsor: Sponsor = {
      id: sponsorId,
      eventId: data.eventId,
      name: data.name,
      logo: data.logo,
      website: data.website,
      tier: data.tier,
      description: data.description,
    };

    db.sponsors.set(sponsorId, sponsor);

    AuditService.log('SPONSOR_ADDED', 'SPONSOR', sponsorId, data.actorUserId, {
      eventId: data.eventId,
      name: data.name,
      tier: data.tier,
    });

    return sponsor;
  }

  static getByEvent(eventId: string): Sponsor[] {
    return Array.from(db.sponsors.values()).filter((s) => s.eventId === eventId);
  }
}
