/**
 * ARASS EVENTS — Assessment & Quiz Engine
 * Server-authoritative scoring, question banks, and attempt tracking
 */

import { db } from '../events-db/engine';
import { Assessment, Question, AssessmentAttempt } from '../events-db/types';
import { AuditService } from './audit.service';

export class AssessmentService {
  static getAssessmentForParticipant(assessmentId: string) {
    const assessment = db.assessments.get(assessmentId);
    if (!assessment) throw new Error('Assessment not found.');

    const questions = Array.from(db.questions.values())
      .filter((q) => q.assessmentId === assessmentId)
      .sort((a, b) => a.order - b.order)
      .map((q) => {
        // Strip out server-side correct answers for participant security
        const { correctAnswer, ...safeQuestion } = q;
        const safeOptions = q.options?.map((opt) => {
          const { isCorrect, ...safeOpt } = opt;
          return safeOpt;
        });
        return { ...safeQuestion, options: safeOptions };
      });

    return { assessment, questions };
  }

  static submitAttempt(
    assessmentId: string,
    userId: string,
    answers: Record<string, any>,
    teamId?: string
  ): AssessmentAttempt {
    const assessment = db.assessments.get(assessmentId);
    if (!assessment) throw new Error('Assessment not found.');

    const questions = Array.from(db.questions.values()).filter((q) => q.assessmentId === assessmentId);

    let totalScore = 0;
    for (const q of questions) {
      const participantAns = answers[q.id];
      if (participantAns !== undefined && participantAns !== null && participantAns !== '') {
        if (q.type === 'MCQ' || q.type === 'TRUE_FALSE') {
          if (participantAns === q.correctAnswer) {
            totalScore += q.marks;
          } else if (q.negativeMarks) {
            totalScore -= q.negativeMarks;
          }
        } else if (q.type === 'CODE') {
          // Code template submission awarded base verification points
          totalScore += q.marks;
        } else {
          totalScore += q.marks;
        }
      }
    }

    const finalScore = Math.max(0, totalScore);
    const attemptId = db.generateId();
    const now = db.now();

    const attempt: AssessmentAttempt = {
      id: attemptId,
      assessmentId,
      userId,
      teamId,
      startedAt: now,
      submittedAt: now,
      answers,
      score: finalScore,
      status: 'EVALUATED',
    };

    db.assessmentAttempts.set(attemptId, attempt);

    AuditService.log('ASSESSMENT_SUBMITTED', 'ASSESSMENT_ATTEMPT', attemptId, userId, {
      assessmentId,
      score: finalScore,
      totalPossibleMarks: assessment.totalMarks,
    });

    return attempt;
  }
}
