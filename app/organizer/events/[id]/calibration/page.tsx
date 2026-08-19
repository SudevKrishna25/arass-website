'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event } from '@/lib/events-db/types';
import { Scale, AlertTriangle, CheckCircle2, TrendingUp, BarChart2, ShieldCheck } from 'lucide-react';

export default function OrganizerJudgeCalibrationPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [calibration, setCalibration] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/calibration`);
        }
        throw new Error('Event not found');
      })
      .then((res) => res.json())
      .then((calData) => {
        if (calData.calibration) setCalibration(calData.calibration);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-2">
              <Scale className="w-3.5 h-3.5" />
              <span>EVALUATION STATISTICAL CALIBRATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Judge Scoring Variance & Calibration</h2>
            <p className="text-xs font-sans text-white/60 font-light">
              Detect judge scoring divergence, average/median variance, and evaluation distribution fairness.
            </p>
          </div>

          {calibration && (
            <div className="p-3 px-5 rounded-2xl border border-white/10 bg-[#020b18] flex items-center gap-4 font-mono text-xs">
              <div>
                <div className="text-[10px] text-white/50 uppercase">BENCHMARK AVERAGE</div>
                <div className="text-lg font-bold text-white">{calibration.overallAverage} pts</div>
              </div>
              <div className="border-l border-white/10 pl-4">
                <div className="text-[10px] text-white/50 uppercase">TOTAL EVALUATIONS</div>
                <div className="text-lg font-bold text-electric-cyan">{calibration.totalEvaluations}</div>
              </div>
            </div>
          )}
        </div>

        {/* Calibration Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
              Juror Scoring Variance Matrix
            </h3>
            <span className="text-[10px] font-mono text-white/40">Tolerance Threshold: ±15.0 pts</span>
          </div>

          {!calibration || calibration.judges.length === 0 ? (
            <div className="py-8 text-center text-white/40 text-xs font-mono">No evaluation scoring data recorded yet.</div>
          ) : (
            <div className="space-y-3 font-mono text-xs">
              {calibration.judges.map((j: any) => (
                <div
                  key={j.judgeId}
                  className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    j.isOutlier
                      ? 'border-amber-500/40 bg-amber-500/5 text-amber-200'
                      : 'border-white/10 bg-[#01050d] text-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-base font-bold text-white">{j.judgeName}</div>
                    <div className="text-xs text-white/60 font-sans">{j.notes}</div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-xs">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase">Evaluated</div>
                      <div className="font-bold text-white">{j.evaluatedCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 uppercase">Average</div>
                      <div className="font-bold text-electric-cyan">{j.averageScore}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 uppercase">Median</div>
                      <div className="font-bold text-white">{j.medianScore}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 uppercase">Variance (σ²)</div>
                      <div className="font-bold text-white">{j.variance}</div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                        j.isOutlier
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}
                    >
                      {j.isOutlier ? 'VARIANCE DETECTED' : 'CALIBRATED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </OrganizerLayout>
  );
}
