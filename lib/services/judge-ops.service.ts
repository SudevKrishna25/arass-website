/**
 * ARASS EVENTS — Judge Operations & Intelligence Service
 */

import { db } from '../events-db/engine';
import { Judge, JudgeAssignment, JudgeConflict } from '../events-db/types';
import { AuditService } from './audit.service';

export class JudgeOpsService {
  static inviteJudge(data: {
    name: string;
    email: string;
    organization: string;
    expertise: string[];
    actorUserId: string;
  }): Judge {
    const judgeId = db.generateId();
    const judge: Judge = {
      id: judgeId,
      name: data.name,
      email: data.email,
      organization: data.organization,
      expertise: data.expertise,
      workload: 0,
      status: 'ACTIVE',
    };

    db.judges.set(judgeId, judge);

    AuditService.log('JUDGE_INVITED', 'JUDGE', judgeId, data.actorUserId, {
      name: data.name,
      email: data.email,
    });

    return judge;
  }

  static assignJudge(
    judgeId: string,
    eventId: string,
    submissionId: string,
    roundId: string,
    actorUserId: string
  ): JudgeAssignment {
    // Check conflict
    const conflict = Array.from(db.judgeConflicts.values()).find(
      (c) => c.judgeId === judgeId && c.eventId === eventId && c.submissionId === submissionId
    );
    if (conflict) {
      throw new Error(`Conflict of Interest declared for this judge on submission ${submissionId}.`);
    }

    const assignmentId = db.generateId();
    const assignment: JudgeAssignment = {
      id: assignmentId,
      judgeId,
      eventId,
      roundId,
      submissionId,
      status: 'PENDING',
    };

    db.judgeAssignments.set(assignmentId, assignment);

    const judge = db.judges.get(judgeId);
    if (judge) judge.workload += 1;

    AuditService.log('JUDGE_ASSIGNED', 'JUDGE_ASSIGNMENT', assignmentId, actorUserId, {
      judgeId,
      submissionId,
      eventId,
    });

    return assignment;
  }

  static declareConflict(data: {
    judgeId: string;
    eventId: string;
    submissionId?: string;
    participantId?: string;
    reason: 'ORGANIZATION' | 'PERSONAL' | 'PARTICIPANT' | 'OTHER';
    actorUserId: string;
  }): JudgeConflict {
    const conflictId = db.generateId();
    const conflict: JudgeConflict = {
      id: conflictId,
      judgeId: data.judgeId,
      eventId: data.eventId,
      submissionId: data.submissionId,
      participantId: data.participantId,
      reason: data.reason,
      declaredAt: db.now(),
    };

    db.judgeConflicts.set(conflictId, conflict);

    AuditService.log('JUDGE_CONFLICT_DECLARED', 'JUDGE_CONFLICT', conflictId, data.actorUserId, {
      judgeId: data.judgeId,
      reason: data.reason,
    });

    return conflict;
  }

  static getJudgingIntelligence(eventId: string) {
    const submissions = Array.from(db.submissions.values()).filter((s) => s.eventId === eventId);
    const evaluations = Array.from(db.evaluations.values());
    const judges = Array.from(db.judges.values());
    const conflicts = Array.from(db.judgeConflicts.values()).filter((c) => c.eventId === eventId);

    const totalSubmissions = submissions.length;
    const evaluatedSubmissions = submissions.filter((s) => s.status === 'EVALUATED').length;
    const completionRate = totalSubmissions > 0 ? Math.round((evaluatedSubmissions / totalSubmissions) * 100) : 0;

    const scores = evaluations.map((e) => e.totalScore);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

    return {
      totalJudges: judges.length,
      totalSubmissions,
      evaluatedSubmissions,
      pendingEvaluations: Math.max(0, totalSubmissions - evaluatedSubmissions),
      completionRate: `${completionRate}%`,
      averageScore: avgScore,
      conflictsCount: conflicts.length,
      judgesList: judges,
      conflictsList: conflicts,
    };
  }
}
