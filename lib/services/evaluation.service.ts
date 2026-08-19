/**
 * ARASS EVENTS — Evaluation & Scoring Service
 */

import { db } from '../events-db/engine';
import { Evaluation } from '../events-db/types';
import { AuditService } from './audit.service';

export interface SubmitEvaluationDTO {
  submissionId: string;
  evaluatorId: string;
  scores: Record<string, number>;
  comments?: string;
}

export class EvaluationService {
  static evaluate(dto: SubmitEvaluationDTO): Evaluation {
    const submission = db.submissions.get(dto.submissionId);
    if (!submission) throw new Error('Submission not found.');

    const round = db.rounds.get(submission.roundId);
    if (!round) throw new Error('Round not found.');

    // Enforce Conflict of Interest Protection
    const judge = Array.from(db.judges.values()).find(
      (j) => j.userId === dto.evaluatorId || j.id === dto.evaluatorId
    );
    if (judge) {
      const conflict = Array.from(db.judgeConflicts.values()).find(
        (c) =>
          c.judgeId === judge.id &&
          (c.submissionId === dto.submissionId ||
            (submission.participantId && c.participantId === submission.participantId))
      );
      if (conflict) {
        throw new Error('Evaluation prohibited: Active Conflict of Interest declared on this deliverable.');
      }
    }

    const criteria = Array.from(db.evaluationCriteria.values()).filter((c) => c.roundId === round.id);

    let totalScore = 0;
    for (const crit of criteria) {
      const score = dto.scores[crit.id] ?? 0;
      if (score > crit.maxScore) {
        throw new Error(`Score for '${crit.name}' exceeds maximum permitted score (${crit.maxScore}).`);
      }
      totalScore += score;
    }

    const evalId = db.generateId();
    const now = db.now();

    const evaluation: Evaluation = {
      id: evalId,
      roundId: round.id,
      submissionId: dto.submissionId,
      evaluatorId: dto.evaluatorId,
      scores: dto.scores,
      totalScore,
      comments: dto.comments,
      status: 'SUBMITTED',
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    };

    db.evaluations.set(evalId, evaluation);
    submission.status = 'EVALUATED';

    AuditService.log('EVALUATION_SUBMITTED', 'EVALUATION', evalId, dto.evaluatorId, {
      submissionId: dto.submissionId,
      totalScore,
    });

    return evaluation;
  }

  static getBySubmission(submissionId: string): Evaluation[] {
    return Array.from(db.evaluations.values()).filter((e) => e.submissionId === submissionId);
  }

  static getRoundRankings(roundId: string) {
    const submissions = Array.from(db.submissions.values()).filter((s) => s.roundId === roundId);
    const rankings = submissions.map((sub) => {
      const evals = Array.from(db.evaluations.values()).filter((e) => e.submissionId === sub.id);
      const avgScore =
        evals.length > 0 ? evals.reduce((sum, e) => sum + e.totalScore, 0) / evals.length : 0;
      const team = sub.teamId ? db.teams.get(sub.teamId) : null;
      return {
        submission: sub,
        team,
        evaluationsCount: evals.length,
        averageScore: avgScore,
      };
    });

    return rankings.sort((a, b) => b.averageScore - a.averageScore);
  }
}
