import { db } from '@/lib/events-db/engine';

export interface JudgeCalibrationSummary {
  judgeId: string;
  judgeName: string;
  evaluatedCount: number;
  averageScore: number;
  medianScore: number;
  variance: number;
  isOutlier: boolean;
  notes: string;
}

export class JudgeCalibrationService {
  static getEventCalibration(eventId: string): {
    overallAverage: number;
    totalEvaluations: number;
    judges: JudgeCalibrationSummary[];
  } {
    const rounds = Array.from(db.rounds.values()).filter((r) => r.eventId === eventId);
    const roundIds = new Set(rounds.map((r) => r.id));

    const evaluations = Array.from(db.evaluations.values()).filter(
      (e) => roundIds.has(e.roundId) && e.status === 'SUBMITTED'
    );

    if (evaluations.length === 0) {
      return { overallAverage: 0, totalEvaluations: 0, judges: [] };
    }

    const overallAverage =
      evaluations.reduce((acc, curr) => acc + curr.totalScore, 0) / evaluations.length;

    const judgeGroups = new Map<string, number[]>();
    for (const ev of evaluations) {
      if (!judgeGroups.has(ev.evaluatorId)) judgeGroups.set(ev.evaluatorId, []);
      judgeGroups.get(ev.evaluatorId)!.push(ev.totalScore);
    }

    const summaries: JudgeCalibrationSummary[] = [];

    for (const [judgeId, scores] of judgeGroups.entries()) {
      const judge =
        db.judges.get(judgeId) ||
        Array.from(db.judges.values()).find((j) => j.userId === judgeId) || {
          name: 'Jury Member',
        };

      const sorted = [...scores].sort((a, b) => a - b);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const median =
        sorted.length % 2 === 0
          ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
          : sorted[Math.floor(sorted.length / 2)];

      const variance =
        scores.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / scores.length;

      const deviation = Math.abs(avg - overallAverage);
      const isOutlier = deviation > 15;

      summaries.push({
        judgeId,
        judgeName: (judge as any).name || 'Jury Member',
        evaluatedCount: scores.length,
        averageScore: Number(avg.toFixed(1)),
        medianScore: Number(median.toFixed(1)),
        variance: Number(variance.toFixed(1)),
        isOutlier,
        notes: isOutlier
          ? `Score variance detected (deviates by ${deviation.toFixed(1)} pts from benchmark)`
          : 'Scoring within normal calibration tolerance',
      });
    }

    return {
      overallAverage: Number(overallAverage.toFixed(1)),
      totalEvaluations: evaluations.length,
      judges: summaries,
    };
  }
}
