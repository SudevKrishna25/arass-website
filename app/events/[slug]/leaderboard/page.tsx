'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { LeaderboardEntry } from '@/lib/services/leaderboard.service';
import { Trophy, ArrowLeft, RefreshCw, Layers, ShieldCheck, Flame } from 'lucide-react';

export default function LiveLeaderboardPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadLeaderboard = () => {
    fetch(`/api/events/${slug}/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        if (data.entries) {
          setEntries(data.entries);
          setLastUpdated(data.lastUpdated);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadLeaderboard();
    const interval = setInterval(loadLeaderboard, 20000); // Polling every 20s
    return () => clearInterval(interval);
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-20" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/events/${slug}/live`}
              className="p-2 rounded-xl border border-white/15 text-white/60 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>STANDARDIZED EVALUATION MATRIX</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-heading font-black text-white">Live Competition Leaderboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-white/50">
            {lastUpdated && (
              <span>Last Synchronized: {new Date(lastUpdated).toLocaleTimeString()}</span>
            )}
            <button
              onClick={loadLeaderboard}
              className="p-2 rounded-xl border border-white/15 hover:border-electric-cyan text-white/70 hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Leaderboard Data Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/85 backdrop-blur-2xl space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3 w-16">Rank</th>
                  <th className="pb-3">Team & Lead Architect</th>
                  <th className="pb-3">Deliverables</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Weighted Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {entries.length > 0 ? (
                  entries.map((entry) => (
                    <tr key={entry.teamId || entry.teamName} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-heading font-bold text-base text-white">
                        {entry.rank === 1 ? (
                          <span className="text-amber-400 font-bold">#01 👑</span>
                        ) : entry.rank === 2 ? (
                          <span className="text-white/80 font-bold">#02</span>
                        ) : entry.rank === 3 ? (
                          <span className="text-amber-600 font-bold">#03</span>
                        ) : (
                          `#0${entry.rank}`
                        )}
                      </td>

                      <td className="py-4">
                        <div className="font-bold text-white text-sm">{entry.teamName}</div>
                        <div className="text-white/50 text-[11px] font-sans font-light">
                          {entry.participantName}
                        </div>
                      </td>

                      <td className="py-4 text-white/70">
                        <span>{entry.submissionsCount} Submitted</span>
                      </td>

                      <td className="py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {entry.status}
                        </span>
                      </td>

                      <td className="py-4 text-right">
                        <span className="font-heading font-bold text-lg text-electric-cyan">
                          {entry.totalScore}
                        </span>
                        <span className="text-[10px] text-white/40 ml-1">/ 100</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-white/40">
                      Scores will appear live once initial evaluations are submitted by the jury.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
