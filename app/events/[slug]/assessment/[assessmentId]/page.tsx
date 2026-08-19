'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Assessment, Question } from '@/lib/events-db/types';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Flag,
  ArrowLeft,
  ArrowRight,
  Send,
  ShieldCheck,
  Code,
} from 'lucide-react';

export default function AssessmentTestingRoomPage() {
  const params = useParams();
  const slug = params.slug as string;
  const assessmentId = params.assessmentId as string;
  const router = useRouter();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeftSec, setTimeLeftSec] = useState(2400); // 40 mins
  const [submitting, setSubmitting] = useState(false);
  const [submittedResult, setSubmittedResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/events/${slug}/assessment/${assessmentId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.assessment && data.questions) {
          setAssessment(data.assessment);
          setQuestions(data.questions);
          setTimeLeftSec(data.assessment.timeLimitMinutes * 60);
        }
      })
      .catch(() => {});
  }, [slug, assessmentId]);

  // Anti-cheat listener for tab switches / window blurs
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submittedResult) {
        fetch(`/api/events/${slug}/integrity`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'TAB_SWITCH',
            details: { questionIndex: currentIndex, time: new Date().toISOString() },
          }),
        }).catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [slug, currentIndex, submittedResult]);

  // Countdown timer
  useEffect(() => {
    if (submittedResult) return;
    const interval = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [submittedResult]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitAssessment = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/events/${slug}/assessment/${assessmentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit assessment.');

      setSubmittedResult(data.attempt);
      setSubmitting(false);
    } catch (err: any) {
      setError(err.message || 'Submission failed.');
      setSubmitting(false);
    }
  };

  const currentQ = questions[currentIndex];

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] font-mono text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TIMED TECHNICAL ASSESSMENT // PROCTORED</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
              {assessment?.title || 'Technical Assessment Sprint'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl border border-electric-cyan/30 bg-[#020b18] flex items-center gap-2 font-mono text-xs">
              <Clock className="w-4 h-4 text-electric-cyan animate-pulse" />
              <span className="text-white font-bold text-sm">{formatTimer(timeLeftSec)}</span>
              <span className="text-white/40 text-[10px]">REMAINING</span>
            </div>

            {!submittedResult && (
              <button
                onClick={handleSubmitAssessment}
                disabled={submitting}
                className="px-5 py-2 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,212,255,0.6)]"
              >
                {submitting ? 'FINISHING...' : 'FINISH & SUBMIT'}
              </button>
            )}
          </div>
        </div>

        {submittedResult ? (
          /* Results Card */
          <div className="max-w-2xl mx-auto p-8 rounded-3xl border border-emerald-500/40 bg-[#020b18]/90 backdrop-blur-2xl text-center space-y-4 shadow-2xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-heading font-bold text-white">Assessment Complete & Evaluated</h2>
            <p className="text-xs font-sans text-white/70 font-light">
              Your responses have been cryptographically registered and scored against the server rubric.
            </p>

            <div className="p-6 rounded-2xl border border-white/10 bg-[#01050d]/80 max-w-xs mx-auto space-y-1 font-mono">
              <div className="text-white/40 text-xs">TOTAL SCORE</div>
              <div className="text-4xl font-heading font-bold text-electric-cyan">
                {submittedResult.score} / {assessment?.totalMarks || 50}
              </div>
              <div className="text-emerald-400 text-[11px] font-semibold">PASSING CRITERIA MET</div>
            </div>

            <div className="pt-4">
              <Link
                href={`/events/${slug}/live`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs"
              >
                <span>RETURN TO LIVE COMPETITION ROOM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Question Workspace */}
            <div className="lg:col-span-8 space-y-4">
              {currentQ && (
                <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-electric-cyan font-bold uppercase">
                      QUESTION {currentIndex + 1} OF {questions.length} // {currentQ.type} [{currentQ.marks} PTS]
                    </span>

                    <button
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full border transition-all ${
                        flagged[currentQ.id]
                          ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
                          : 'border-white/10 text-white/50 hover:text-white'
                      }`}
                    >
                      <Flag className="w-3 h-3" />
                      <span>{flagged[currentQ.id] ? 'FLAGGED FOR REVIEW' : 'FLAG'}</span>
                    </button>
                  </div>

                  <div className="text-sm font-sans text-white leading-relaxed font-normal">
                    {currentQ.text}
                  </div>

                  {/* Options List */}
                  {currentQ.options && currentQ.options.length > 0 && (
                    <div className="space-y-2.5">
                      {currentQ.options.map((opt) => {
                        const isSelected = answers[currentQ.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(currentQ.id, opt.id)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-xs font-mono ${
                              isSelected
                                ? 'border-electric-cyan bg-electric-cyan/15 text-white font-bold'
                                : 'border-white/10 bg-[#01050d]/60 text-white/80 hover:border-white/25 hover:bg-white/5'
                            }`}
                          >
                            <span>{opt.text}</span>
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-electric-cyan bg-electric-cyan text-background' : 'border-white/30'
                              }`}
                            >
                              {isSelected && '✓'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Code Template Editor Area */}
                  {currentQ.type === 'CODE' && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
                        <Code className="w-3.5 h-3.5 text-electric-cyan" />
                        <span>TypeScript Algorithmic Implementation</span>
                      </div>
                      <textarea
                        rows={8}
                        value={answers[currentQ.id] || currentQ.codeTemplate || ''}
                        onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                        className="w-full p-4 rounded-2xl border border-white/15 bg-[#01050d] text-electric-cyan font-mono text-xs focus:outline-none focus:border-electric-cyan"
                      />
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      type="button"
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/15 disabled:opacity-30 text-white/80 text-xs font-mono hover:bg-white/5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>PREVIOUS</span>
                    </button>

                    <button
                      type="button"
                      disabled={currentIndex === questions.length - 1}
                      onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-electric-cyan disabled:opacity-30 text-background font-bold text-xs font-mono hover:scale-105"
                    >
                      <span>NEXT QUESTION</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Question Matrix Navigator */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
                <div className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                  Question Navigator
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isFlagged = flagged[q.id];
                    const isCurrent = idx === currentIndex;

                    let bgClass = 'bg-white/5 border-white/10 text-white/60';
                    if (isCurrent) bgClass = 'border-electric-cyan bg-electric-cyan text-background font-bold';
                    else if (isFlagged) bgClass = 'border-amber-500/60 bg-amber-500/20 text-amber-300';
                    else if (isAnswered) bgClass = 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300';

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-10 rounded-xl border flex items-center justify-center font-mono text-xs transition-all ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5 text-[10px] font-mono text-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-500" />
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500" />
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-electric-cyan" />
                    <span>Current Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
