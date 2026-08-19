/**
 * ARASS EVENTS — Live Leaderboard & Ranking Engine
 * Multi-criteria weighted scoring, tie-breaking, and live updates
 */

import { db } from '../events-db/engine';

export interface LeaderboardEntry {
  rank: number;
  teamId?: string;
  teamName: string;
  participantName: string;
  totalScore: number;
  roundScores: Record<string, number>;
  submissionsCount: number;
  lastSubmissionTime?: string;
  status: string;
}

export class LeaderboardService {
  static getEventLeaderboard(eventId: string): { entries: LeaderboardEntry[]; lastUpdated: string } {
    const teams = Array.from(db.teams.values()).filter((t) => t.eventId === eventId);
    const submissions = Array.from(db.submissions.values()).filter((s) => s.eventId === eventId);
    const rounds = Array.from(db.rounds.values()).filter((r) => r.eventId === eventId);

    const entries: LeaderboardEntry[] = [];

    // Score teams from evaluations & attempts
    for (const team of teams) {
      const teamSubs = submissions.filter((s) => s.teamId === team.id);
      const leaderProfile = db.profiles.get(team.leaderId);

      let totalScore = 0;
      const roundScores: Record<string, number> = {};
      let latestSubTime: string | undefined = undefined;

      for (const sub of teamSubs) {
        const evals = Array.from(db.evaluations.values()).filter((e) => e.submissionId === sub.id);
        const subScore = evals.length > 0 ? evals.reduce((sum, e) => sum + e.totalScore, 0) / evals.length : 0;

        totalScore += subScore;
        roundScores[sub.roundId] = subScore;
        if (!latestSubTime || new Date(sub.submittedAt).getTime() > new Date(latestSubTime).getTime()) {
          latestSubTime = sub.submittedAt;
        }
      }

      // Check for assessment scores
      const attempts = Array.from(db.assessmentAttempts.values()).filter(
        (a) => a.userId === team.leaderId || a.teamId === team.id
      );
      for (const att of attempts) {
        if (att.score) totalScore += att.score;
      }

      entries.push({
        rank: 0,
        teamId: team.id,
        teamName: team.name,
        participantName: leaderProfile?.name || 'Lead Architect',
        totalScore: Math.round(totalScore * 10) / 10,
        roundScores,
        submissionsCount: teamSubs.length,
        lastSubmissionTime: latestSubTime,
        status: team.status,
      });
    }

    // Sort by Total Score DESC, then earlier submission time
    entries.sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      if (a.lastSubmissionTime && b.lastSubmissionTime) {
        return new Date(a.lastSubmissionTime).getTime() - new Date(b.lastSubmissionTime).getTime();
      }
      return 0;
    });

    // Assign sequential ranks
    entries.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });

    return {
      entries,
      lastUpdated: new Date().toISOString(),
    };
  }
}
