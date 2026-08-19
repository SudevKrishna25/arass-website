/**
 * ARASS EVENTS — Round & Stages Service
 */

import { db } from '../events-db/engine';
import { Round, SubmissionType, EvaluationCriteria } from '../events-db/types';
import { AuditService } from './audit.service';

export interface CreateRoundDTO {
  eventId: string;
  name: string;
  description: string;
  order: number;
  startAt: string;
  endAt: string;
  submissionType: SubmissionType;
  maxAttempts?: number;
  criteria?: { name: string; description?: string; weight: number; maxScore: number }[];
  actorUserId?: string;
}

export class RoundService {
  static create(dto: CreateRoundDTO): Round {
    const event = db.events.get(dto.eventId);
    if (!event) throw new Error('Event not found.');

    const roundId = db.generateId();
    const now = db.now();

    const round: Round = {
      id: roundId,
      eventId: dto.eventId,
      name: dto.name,
      description: dto.description,
      order: dto.order,
      status: 'SCHEDULED',
      startAt: dto.startAt,
      endAt: dto.endAt,
      submissionType: dto.submissionType,
      maxAttempts: dto.maxAttempts ?? 1,
      createdAt: now,
      updatedAt: now,
    };

    db.rounds.set(roundId, round);

    if (dto.criteria && dto.criteria.length > 0) {
      dto.criteria.forEach((c, idx) => {
        const critId = db.generateId();
        db.evaluationCriteria.set(critId, {
          id: critId,
          roundId,
          name: c.name,
          description: c.description,
          weight: c.weight,
          maxScore: c.maxScore,
          order: idx + 1,
        });
      });
    }

    AuditService.log('ROUND_CREATED', 'ROUND', roundId, dto.actorUserId, { eventId: dto.eventId, name: round.name });
    return round;
  }

  static getByEvent(eventId: string): Round[] {
    return Array.from(db.rounds.values())
      .filter((r) => r.eventId === eventId)
      .sort((a, b) => a.order - b.order);
  }

  static getById(id: string): Round | null {
    return db.rounds.get(id) || null;
  }
}
