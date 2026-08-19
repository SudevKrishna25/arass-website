/**
 * ARASS EVENTS — Event Service
 */

import { db } from '../events-db/engine';
import { Event, EventStatus, EventType, EventMode, RegistrationField } from '../events-db/types';
import { AuditService } from './audit.service';

export interface CreateEventDTO {
  organizationId: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  eventType: EventType;
  mode: EventMode;
  location?: string;
  website?: string;
  banner?: string;
  logo?: string;
  registrationStart: string;
  registrationEnd: string;
  eventStart: string;
  eventEnd: string;
  timezone?: string;
  minTeamSize?: number;
  maxTeamSize?: number;
  prizePool?: number;
  createdBy: string;
  fields?: Omit<RegistrationField, 'id' | 'eventId'>[];
}

export class EventService {
  static create(dto: CreateEventDTO & { id?: string }): Event {
    if (dto.id) {
      const event = db.events.get(dto.id);
      if (!event) throw new Error('Event not found.');
      Object.assign(event, dto, { updatedAt: db.now() });
      AuditService.log('EVENT_UPDATED', 'EVENT', dto.id, dto.createdBy, { name: event.name });
      return event;
    }

    const existing = Array.from(db.events.values()).find((e) => e.slug.toLowerCase() === dto.slug.toLowerCase());
    if (existing) {
      throw new Error(`An event with slug '${dto.slug}' already exists.`);
    }

    const eventId = db.generateId();
    const now = db.now();

    const event: Event = {
      id: eventId,
      organizationId: dto.organizationId,
      slug: dto.slug.toLowerCase(),
      name: dto.name,
      shortDescription: dto.shortDescription,
      description: dto.description,
      eventType: dto.eventType,
      status: 'DRAFT',
      mode: dto.mode,
      location: dto.location,
      website: dto.website,
      banner: dto.banner,
      logo: dto.logo,
      registrationStart: dto.registrationStart,
      registrationEnd: dto.registrationEnd,
      eventStart: dto.eventStart,
      eventEnd: dto.eventEnd,
      timezone: dto.timezone || 'UTC',
      minTeamSize: dto.minTeamSize ?? 1,
      maxTeamSize: dto.maxTeamSize ?? 1,
      prizePool: dto.prizePool ?? 0,
      createdBy: dto.createdBy,
      createdAt: now,
      updatedAt: now,
    };

    db.events.set(eventId, event);

    if (dto.fields && dto.fields.length > 0) {
      dto.fields.forEach((f, idx) => {
        const fieldId = db.generateId();
        db.registrationFields.set(fieldId, {
          id: fieldId,
          eventId,
          label: f.label,
          type: f.type,
          required: f.required,
          order: f.order ?? idx + 1,
          options: f.options,
          placeholder: f.placeholder,
          helpText: f.helpText,
        });
      });
    }

    AuditService.log('EVENT_CREATED', 'EVENT', eventId, dto.createdBy, { name: event.name, slug: event.slug });
    return event;
  }

  private static readonly VALID_TRANSITIONS: Record<EventStatus, EventStatus[]> = {
    DRAFT: ['SCHEDULED', 'REGISTRATION_OPEN', 'ARCHIVED'],
    SCHEDULED: ['REGISTRATION_OPEN', 'LIVE', 'DRAFT', 'ARCHIVED'],
    REGISTRATION_OPEN: ['REGISTRATION_CLOSED', 'LIVE', 'ARCHIVED'],
    REGISTRATION_CLOSED: ['LIVE', 'REGISTRATION_OPEN', 'ARCHIVED'],
    LIVE: ['EVALUATION', 'COMPLETED', 'ARCHIVED'],
    EVALUATION: ['RESULTS_PENDING', 'COMPLETED', 'LIVE'],
    RESULTS_PENDING: ['COMPLETED', 'EVALUATION'],
    COMPLETED: ['ARCHIVED'],
    ARCHIVED: [],
  };

  static transitionStatus(eventId: string, targetStatus: EventStatus, actorUserId: string): Event {
    const event = db.events.get(eventId);
    if (!event) throw new Error('Event not found.');

    const allowed = this.VALID_TRANSITIONS[event.status] || [];
    if (!allowed.includes(targetStatus)) {
      throw new Error(`Invalid event state transition from '${event.status}' to '${targetStatus}'.`);
    }

    const previousStatus = event.status;
    event.status = targetStatus;
    event.updatedAt = db.now();

    AuditService.log('EVENT_STATUS_CHANGED' as any, 'EVENT', eventId, actorUserId, {
      previousStatus,
      newStatus: targetStatus,
    });

    return event;
  }

  static publish(eventId: string, actorUserId: string): Event {
    const event = db.events.get(eventId);
    if (!event) throw new Error('Event not found.');

    return this.transitionStatus(eventId, 'REGISTRATION_OPEN', actorUserId);
  }

  static getById(id: string): Event | null {
    return db.events.get(id) || null;
  }

  static getBySlug(slug: string): Event | null {
    return Array.from(db.events.values()).find((e) => e.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  static list(filter?: { status?: EventStatus; eventType?: EventType; mode?: EventMode; search?: string }): Event[] {
    let list = Array.from(db.events.values());
    if (filter?.status) list = list.filter((e) => e.status === filter.status);
    if (filter?.eventType) list = list.filter((e) => e.eventType === filter.eventType);
    if (filter?.mode) list = list.filter((e) => e.mode === filter.mode);
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter((e) => e.name.toLowerCase().includes(q) || e.shortDescription.toLowerCase().includes(q));
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
