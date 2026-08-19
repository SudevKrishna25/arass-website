/**
 * ARASS EVENTS — Submission Service
 */

import { db } from '../events-db/engine';
import { Submission } from '../events-db/types';
import { AuditService } from './audit.service';
import { AnalyticsService } from './analytics.service';

export interface CreateSubmissionDTO {
  roundId: string;
  title: string;
  description?: string;
  url?: string;
  files?: { filename: string; url: string; size: number; mimeType: string }[];
  participantId?: string;
  teamId?: string;
}

export class SubmissionService {
  static create(dto: CreateSubmissionDTO): Submission {
    const round = db.rounds.get(dto.roundId);
    if (!round) throw new Error('Round not found.');

    const subId = db.generateId();
    const now = db.now();

    const submission: Submission = {
      id: subId,
      roundId: dto.roundId,
      eventId: round.eventId,
      participantId: dto.participantId,
      teamId: dto.teamId,
      title: dto.title,
      description: dto.description,
      url: dto.url,
      files: dto.files || [],
      version: 1,
      status: 'SUBMITTED',
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    db.submissions.set(subId, submission);

    AuditService.log('SUBMISSION_CREATED', 'SUBMISSION', subId, dto.participantId, {
      roundId: dto.roundId,
      title: dto.title,
    });
    AnalyticsService.track('SUBMISSION_CREATED', round.eventId, dto.participantId);

    return submission;
  }

  static getByRound(roundId: string): Submission[] {
    return Array.from(db.submissions.values()).filter((s) => s.roundId === roundId);
  }

  static getById(id: string): Submission | null {
    return db.submissions.get(id) || null;
  }
}
