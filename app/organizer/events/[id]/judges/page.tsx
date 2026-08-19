'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Judge, JudgeConflict } from '@/lib/events-db/types';
import { Layers, Shield, UserPlus, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function EventJudgesPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [intel, setIntel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Invite modal state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [expertise, setExpertise] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Conflict modal state
  const [conflictJudgeId, setConflictJudgeId] = useState('');
  const [conflictReason, setConflictReason] = useState<'ORGANIZATION' | 'PERSONAL' | 'PARTICIPANT' | 'OTHER'>('ORGANIZATION');

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/judges`);
        }
      })
      .then((res) => (res ? res.json() : null))
      .then((jData) => {
        if (jData) setIntel(jData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !name || !email) return;

    const res = await fetch(`/api/events/${event.id}/judges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'INVITE',
        name,
        email,
        organization: org || 'Independent Juror',
        expertise: expertise ? expertise.split(',').map((s) => s.trim()) : ['Distributed Systems'],
      }),
    });

    if (res.ok) {
      setStatusMessage(`Juror invitation sent to ${name}`);
      setName('');
      setEmail('');
      setOrg('');
      setExpertise('');
      loadData();
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleDeclareConflict = async () => {
    if (!event || !conflictJudgeId) return;

    const res = await fetch(`/api/events/${event.id}/judges/conflict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        judgeId: conflictJudgeId,
        reason: conflictReason,
      }),
    });

    if (res.ok) {
      setStatusMessage('Conflict of interest registered. Juror will be excluded from affected evaluations.');
      setConflictJudgeId('');
      loadData();
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event Dossier...'} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Jury Operations & Scoring Intelligence</h2>
            <p className="text-xs font-mono text-white/60">
              Manage evaluator assignments, workloads, conflicts of interest, and score variance anomalies.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono">
            {statusMessage}
          </div>
        )}

        {/* Intelligence KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Assigned Jurors</div>
            <div className="text-2xl font-heading font-bold text-white">{intel?.totalJudges || 2}</div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold">Active Board</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Evaluation Progress</div>
            <div className="text-2xl font-heading font-bold text-white">{intel?.completionRate || '100%'}</div>
            <div className="text-[11px] font-mono text-white/50">{intel?.pendingEvaluations || 0} Pending Submissions</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Average Jury Score</div>
            <div className="text-2xl font-heading font-bold text-white">{intel?.averageScore || 93} / 100</div>
            <div className="text-[11px] font-mono text-electric-cyan font-semibold">Normalized Variance</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Declared Conflicts</div>
            <div className="text-2xl font-heading font-bold text-amber-400">{intel?.conflictsCount || 1}</div>
            <div className="text-[11px] font-mono text-amber-400/80">Excluded Automatically</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Judges List */}
          <div className="lg:col-span-2 p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Evaluation Jury Panel</h3>
            <div className="divide-y divide-white/10">
              {intel?.judgesList?.map((j: Judge) => (
                <div key={j.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{j.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {j.status}
                      </span>
                    </div>
                    <div className="text-xs text-white/60 font-mono">{j.organization}</div>
                    <div className="text-[11px] text-electric-cyan font-mono mt-1">
                      Expertise: {j.expertise?.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setConflictJudgeId(j.id)}
                      className="px-3 py-1 rounded-lg border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 text-[11px] font-mono"
                    >
                      Declare Conflict
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Juror Form */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-electric-cyan" />
              <span>Invite New Juror</span>
            </h3>

            <form onSubmit={handleInvite} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-white/60 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Alan Turing"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juror@institution.edu"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Institution / Organization</label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="e.g. MIT CSAIL"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Expertise Tags</label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  placeholder="Distributed Systems, AI, Cryptography"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-electric-cyan text-background font-bold tracking-wider hover:scale-[1.02] transition-transform"
              >
                TRANSMIT INVITATION
              </button>
            </form>
          </div>
        </div>

        {/* Conflict Modal / Panel */}
        {conflictJudgeId && (
          <div className="p-6 rounded-3xl border border-amber-500/40 bg-[#020b18] space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Register Conflict of Interest for Juror</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-white/60 mb-1">Conflict Category</label>
                <select
                  value={conflictReason}
                  onChange={(e) => setConflictReason(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none"
                >
                  <option value="ORGANIZATION">Organization / Shared Employer Conflict</option>
                  <option value="PERSONAL">Personal / Direct Mentorship Conflict</option>
                  <option value="PARTICIPANT">Prior Collaboration with Participant</option>
                  <option value="OTHER">Other Ethical Disqualification</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={handleDeclareConflict}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-background font-bold"
                >
                  CONFIRM CONFLICT
                </button>
                <button
                  onClick={() => setConflictJudgeId('')}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </OrganizerLayout>
  );
}
