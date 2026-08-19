/**
 * ARASS EVENTS — Competition Session Execution Engine
 * Server-authoritative state machine, live clock synchronization, and stage transitions
 */

import { db } from '../events-db/engine';
import { CompetitionSession, CompetitionSessionStatus, Round } from '../events-db/types';
import { AuditService } from './audit.service';

export class CompetitionSessionService {
  static getOrCreateSession(eventId: string): CompetitionSession {
    let session = Array.from(db.competitionSessions.values()).find((s) => s.eventId === eventId);
    if (!session) {
      const event = db.events.get(eventId);
      if (!event) throw new Error('Event not found.');

      const rounds = Array.from(db.rounds.values())
        .filter((r) => r.eventId === eventId)
        .sort((a, b) => a.order - b.order);

      const sessionId = db.generateId();
      const now = db.now();

      session = {
        id: sessionId,
        eventId,
        status: event.status === 'LIVE' ? 'LIVE' : 'SCHEDULED',
        startedAt: event.status === 'LIVE' ? now : undefined,
        currentRoundId: rounds[0]?.id,
        serverTime: now,
        createdAt: now,
        updatedAt: now,
      };

      db.competitionSessions.set(sessionId, session);
    }

    session.serverTime = db.now();
    return session;
  }

  static startEvent(eventId: string, actorUserId: string): CompetitionSession {
    const session = this.getOrCreateSession(eventId);
    const event = db.events.get(eventId);
    if (!event) throw new Error('Event not found.');

    const now = db.now();
    session.status = 'LIVE';
    session.startedAt = now;
    session.updatedAt = now;
    event.status = 'LIVE';
    event.updatedAt = now;

    // Activate Round 1 if available
    const rounds = Array.from(db.rounds.values())
      .filter((r) => r.eventId === eventId)
      .sort((a, b) => a.order - b.order);

    if (rounds.length > 0) {
      rounds[0].status = 'LIVE';
      rounds[0].submissionOpen = true;
      session.currentRoundId = rounds[0].id;
    }

    AuditService.log('EVENT_STARTED', 'COMPETITION_SESSION', session.id, actorUserId, {
      eventId,
      status: session.status,
    });

    return session;
  }

  static pauseEvent(eventId: string, actorUserId: string): CompetitionSession {
    const session = this.getOrCreateSession(eventId);
    const now = db.now();
    session.status = 'PAUSED';
    session.pausedAt = now;
    session.updatedAt = now;

    AuditService.log('EVENT_PAUSED', 'COMPETITION_SESSION', session.id, actorUserId, { eventId });
    return session;
  }

  static resumeEvent(eventId: string, actorUserId: string): CompetitionSession {
    const session = this.getOrCreateSession(eventId);
    const now = db.now();
    session.status = 'LIVE';
    session.pausedAt = undefined;
    session.updatedAt = now;

    AuditService.log('EVENT_RESUMED', 'COMPETITION_SESSION', session.id, actorUserId, { eventId });
    return session;
  }

  static advanceRound(eventId: string, nextRoundId: string, actorUserId: string): CompetitionSession {
    const session = this.getOrCreateSession(eventId);
    const nextRound = db.rounds.get(nextRoundId);
    if (!nextRound || nextRound.eventId !== eventId) {
      throw new Error('Target round not found in this event.');
    }

    // Complete previous round
    if (session.currentRoundId) {
      const prevRound = db.rounds.get(session.currentRoundId);
      if (prevRound) {
        prevRound.status = 'COMPLETED';
        prevRound.submissionOpen = false;
        prevRound.submissionClosed = true;
      }
    }

    // Activate next round
    nextRound.status = 'LIVE';
    nextRound.submissionOpen = true;
    nextRound.submissionClosed = false;
    session.currentRoundId = nextRound.id;
    session.updatedAt = db.now();

    AuditService.log('ROUND_STARTED', 'ROUND', nextRound.id, actorUserId, {
      eventId,
      roundOrder: nextRound.order,
    });

    return session;
  }

  static lockSubmissions(roundId: string, actorUserId: string): Round {
    const round = db.rounds.get(roundId);
    if (!round) throw new Error('Round not found.');

    round.submissionOpen = false;
    round.submissionClosed = true;
    round.updatedAt = db.now();

    AuditService.log('SUBMISSION_LOCKED', 'ROUND', round.id, actorUserId, {
      eventId: round.eventId,
    });

    return round;
  }

  static getClockSync(eventId: string) {
    const session = this.getOrCreateSession(eventId);
    const currentRound = session.currentRoundId ? db.rounds.get(session.currentRoundId) : null;
    const nowTime = new Date().getTime();

    let remainingSeconds = 0;
    let deadlineIso: string | null = null;

    if (currentRound && currentRound.endAt) {
      deadlineIso = currentRound.endAt;
      const targetTime = new Date(currentRound.endAt).getTime();
      remainingSeconds = Math.max(0, Math.floor((targetTime - nowTime) / 1000));
    }

    return {
      serverTime: new Date().toISOString(),
      sessionStatus: session.status,
      currentRoundId: session.currentRoundId,
      currentRoundName: currentRound?.name || 'Stage Active',
      submissionOpen: currentRound ? !currentRound.submissionClosed : false,
      remainingSeconds,
      deadlineIso,
    };
  }
}
