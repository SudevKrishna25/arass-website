'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Award, CheckCircle2, AlertCircle, Send, Star, ExternalLink, Github } from 'lucide-react';

export default function JudgeDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [score1, setScore1] = useState('28');
  const [score2, setScore2] = useState('38');
  const [score3, setScore3] = useState('27');
  const [comments, setComments] = useState('Exceptional distributed consensus formulation.');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/events/arass-ideathon-2026/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: 'sub-synapse-rnd1',
          scores: {
            'crit-1': parseInt(score1, 10),
            'crit-2': parseInt(score2, 10),
            'crit-3': parseInt(score3, 10),
          },
          comments,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Evaluation scoring failed');

      setSubmitted(true);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Scoring failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-20" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <div>
          <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
            JURY EVALUATION PORTAL
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">Evaluator Scoring Console</h1>
          <p className="text-xs font-sans text-white/70 font-light">
            Score assigned candidate project submissions against standardized rubric criteria.
          </p>
        </div>

        {submitted && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Evaluation submitted and cryptographically locked. Total Score: {parseInt(score1, 10) + parseInt(score2, 10) + parseInt(score3, 10)}/100.</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Evaluation Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-electric-cyan uppercase">
                ARASS IDEATHON 2026 // STAGE 01
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                PENDING REVIEW
              </span>
            </div>
            <h2 className="text-xl font-heading font-bold text-white">
              Autonomous Multi-Agent Neural Consensus Architecture
            </h2>
            <div className="flex items-center gap-4 text-xs font-mono text-white/60">
              <span>Team: Synapse Labs</span>
              <a
                href="https://github.com/arass-research/synapse-consensus"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-electric-cyan hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repository</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmitScore} className="space-y-6 text-xs font-mono">
            {/* Criteria 1 */}
            <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/60 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Technical Novelty & Innovation</div>
                  <div className="text-white/50 text-[11px] font-sans font-light">
                    Depth of technical formulation and breakthrough potential (Max 30)
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  max="30"
                  required
                  value={score1}
                  onChange={(e) => setScore1(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-xl border border-white/15 bg-[#01050d] text-electric-cyan font-bold text-sm text-center focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            {/* Criteria 2 */}
            <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/60 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Architectural Feasibility & Modularity</div>
                  <div className="text-white/50 text-[11px] font-sans font-light">
                    System scalability, error-handling and execution rigor (Max 40)
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  max="40"
                  required
                  value={score2}
                  onChange={(e) => setScore2(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-xl border border-white/15 bg-[#01050d] text-electric-cyan font-bold text-sm text-center focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            {/* Criteria 3 */}
            <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/60 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Impact & Practical Viability</div>
                  <div className="text-white/50 text-[11px] font-sans font-light">
                    Real-world utility and deployment readiness (Max 30)
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  max="30"
                  required
                  value={score3}
                  onChange={(e) => setScore3(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-xl border border-white/15 bg-[#01050d] text-electric-cyan font-bold text-sm text-center focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 mb-1">Qualitative Juror Comments</label>
              <textarea
                rows={3}
                required
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Detail technical strengths, failure cases, and architectural recommendations..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-sans focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
              >
                <Award className="w-4 h-4" />
                <span>{loading ? 'TRANSMITTING SCORE...' : 'SUBMIT & LOCK EVALUATION'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
