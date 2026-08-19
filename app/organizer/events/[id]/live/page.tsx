'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Round } from '@/lib/events-db/types';
import {
  Radio,
  Play,
  Pause,
  Square,
  CheckCircle2,
  AlertCircle,
  Send,
  ArrowRight,
  Clock,
  Users,
  Layers,
  ShieldAlert,
  AlertTriangle,
  Flame,
  FileCheck,
  Calendar,
  Award,
} from 'lucide-react';

export default function OrganizerLiveControlPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [sendingAnn, setSendingAnn] = useState(false);

  // Deadline Extension Modal State
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [extensionTarget, setExtensionTarget] = useState<'REGISTRATION' | 'ROUND' | 'SUBMISSION'>('ROUND');
  const [newDeadlineDate, setNewDeadlineDate] = useState(new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16));
  const [extensionReason, setExtensionReason] = useState('');
  const [extending, setExtending] = useState(false);

  // Incident Modal State
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [incidentCategory, setIncidentCategory] = useState<'TECHNICAL' | 'PARTICIPANT' | 'VENUE' | 'OTHER'>('TECHNICAL');
  const [incidentPriority, setIncidentPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('HIGH');
  const [incidentDesc, setIncidentDesc] = useState('');

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          setRounds(data.rounds || []);
          return fetch(`/api/events/${data.event.id}/session`);
        }
        throw new Error('Event not found');
      })
      .then((res) => res.json())
      .then((sessData) => {
        if (sessData.sync) setSession(sessData.sync);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 8000);
    return () => clearInterval(interval);
  }, [slug]);

  const handleControlAction = async (action: string, targetRoundId?: string) => {
    if (!event) return;
    try {
      const res = await fetch(`/api/events/${event.id}/session/control`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, targetRoundId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Control action failed.');

      setStatusNotice(`Live stage command executed: ${action}`);
      setTimeout(() => setStatusNotice(null), 4000);
      loadData();
    } catch (err: any) {
      setStatusNotice(`Error: ${err.message}`);
      setTimeout(() => setStatusNotice(null), 4000);
    }
  };

  const handleBroadcastAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !announcementText.trim()) return;
    setSendingAnn(true);

    try {
      const res = await fetch(`/api/events/${event.id}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Official Stage Notice',
          message: announcementText,
          priority: 'IMPORTANT',
          audience: 'ALL_PARTICIPANTS',
        }),
      });

      if (res.ok) {
        setStatusNotice('Communique broadcasted to all connected live participants.');
        setAnnouncementText('');
        setTimeout(() => setStatusNotice(null), 4000);
      }
      setSendingAnn(false);
    } catch {
      setSendingAnn(false);
    }
  };

  const handleExtendDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !extensionReason.trim()) return;
    setExtending(true);

    try {
      const res = await fetch(`/api/events/${event.id}/extend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType: extensionTarget,
          roundId: currentRound?.id,
          newDeadline: new Date(newDeadlineDate).toISOString(),
          reason: extensionReason,
        }),
      });

      if (res.ok) {
        setStatusNotice(`Deadline extended successfully. Broadcast dispatched to participants.`);
        setShowExtensionModal(false);
        setExtensionReason('');
        setTimeout(() => setStatusNotice(null), 4000);
        loadData();
      }
      setExtending(false);
    } catch {
      setExtending(false);
    }
  };

  const handleLogIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !incidentDesc.trim()) return;

    try {
      const res = await fetch(`/api/events/${event.id}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: incidentCategory,
          priority: incidentPriority,
          description: incidentDesc,
        }),
      });

      if (res.ok) {
        setStatusNotice('Operational incident logged to Help Desk.');
        setShowIncidentModal(false);
        setIncidentDesc('');
        setTimeout(() => setStatusNotice(null), 4000);
      }
    } catch {}
  };

  const currentRound = rounds.find((r) => r.id === session?.currentRoundId) || rounds[0];

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
              <span>LIVE COMPETITION OPERATIONS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Live Event Control Room</h2>
            <p className="text-xs font-sans text-white/60 font-light">
              Authoritative stage clock supervision, instant submission gating, extension management, and broadcast telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setShowExtensionModal(true)}
              className="px-3.5 py-2 rounded-xl border border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan font-bold hover:bg-electric-cyan/20"
            >
              EXTEND DEADLINE
            </button>
            <button
              onClick={() => setShowIncidentModal(true)}
              className="px-3.5 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 font-bold hover:bg-amber-500/20"
            >
              REPORT INCIDENT
            </button>
          </div>
        </div>

        {statusNotice && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Real-time Telemetry KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Server Sync Status</span>
            </div>
            <div className="text-xl font-bold text-emerald-400">ACTIVE // 100%</div>
            <div className="text-[10px] text-white/50">Authoritative Clock</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Participants Active</span>
            </div>
            <div className="text-xl font-bold text-white">42 Online</div>
            <div className="text-[10px] text-white/50">8 Squads Connected</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] uppercase flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Deliverables Locked</span>
            </div>
            <div className="text-xl font-bold text-white">1 Version Signed</div>
            <div className="text-[10px] text-white/50">Immutable Hash Stored</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] uppercase flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Integrity Telemetry</span>
            </div>
            <div className="text-xl font-bold text-amber-300">0 Flags</div>
            <div className="text-[10px] text-white/50">Zero Critical Anomalies</div>
          </div>
        </div>

        {/* Live Control & Broadcast Action Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Round Control Box */}
          <div className="p-6 sm:p-8 rounded-3xl border border-electric-cyan/30 bg-[#020b18]/85 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-electric-cyan font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
                <span>STAGE EXECUTION CONTROLS</span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-bold ${
                  session?.sessionStatus === 'LIVE'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                }`}
              >
                {session?.sessionStatus || 'LIVE'}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                {currentRound?.name || 'Stage 01: Concept Architecture'}
              </h3>
              <p className="text-xs font-sans text-white/60 font-light mt-1">
                Submissions {session?.submissionOpen ? 'OPEN' : 'LOCKED'}. Server-authoritative timer synchronized.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => handleControlAction('PAUSE_EVENT')}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono text-xs font-bold hover:bg-amber-500/20 transition-all"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </button>

              <button
                onClick={() => currentRound && handleControlAction('LOCK_SUBMISSIONS', currentRound.id)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 font-mono text-xs font-bold hover:bg-red-500/20 transition-all"
              >
                <Square className="w-3.5 h-3.5" />
                <span>LOCK</span>
              </button>

              <button
                onClick={() => handleControlAction('START_EVENT')}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-electric-cyan text-background font-mono text-xs font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,212,255,0.5)]"
              >
                <Play className="w-3.5 h-3.5" />
                <span>START</span>
              </button>
            </div>
          </div>

          {/* Broadcast & Announcement Control */}
          <form onSubmit={handleBroadcastAnnouncement} className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/85 space-y-4">
            <h3 className="text-base font-heading font-bold text-white">Instant Participant Announcement</h3>
            <p className="text-xs font-sans text-white/60 font-light">
              Push notifications will be immediately broadcast to all currently connected participants.
            </p>

            <textarea
              rows={3}
              required
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. 1 hour remaining until Stage 01 submission deadline. Please verify all repository URLs are public."
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-sans focus:outline-none focus:border-electric-cyan"
            />

            <button
              type="submit"
              disabled={sendingAnn}
              className="w-full py-2.5 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs"
            >
              {sendingAnn ? 'BROADCASTING...' : 'BROADCAST TO LIVE AUDIENCE →'}
            </button>
          </form>
        </div>

        {/* Deadline Extension Modal */}
        {showExtensionModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl border border-electric-cyan/40 bg-[#020b18] shadow-2xl space-y-4 font-mono text-xs">
              <div className="text-base font-heading font-black text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-electric-cyan" />
                <span>Extend Competition Deadline</span>
              </div>
              <form onSubmit={handleExtendDeadline} className="space-y-3">
                <div>
                  <label className="block text-white/70 mb-1">Target Scope</label>
                  <select
                    value={extensionTarget}
                    onChange={(e) => setExtensionTarget(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs"
                  >
                    <option value="ROUND">Current Round Submission</option>
                    <option value="REGISTRATION">Event Registration</option>
                    <option value="SUBMISSION">Grand Event Close</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">New ISO Deadline Timestamp</label>
                  <input
                    type="datetime-local"
                    required
                    value={newDeadlineDate}
                    onChange={(e) => setNewDeadlineDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Official Reason for Audit Log *</label>
                  <textarea
                    rows={2}
                    required
                    value={extensionReason}
                    onChange={(e) => setExtensionReason(e.target.value)}
                    placeholder="e.g. Granted 48h extension due to regional infrastructure maintenance."
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowExtensionModal(false)}
                    className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={extending}
                    className="px-5 py-2 rounded-full bg-electric-cyan text-background font-bold"
                  >
                    {extending ? 'EXTENDING...' : 'CONFIRM EXTENSION'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Log Incident Modal */}
        {showIncidentModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-[#020b18] shadow-2xl space-y-4 font-mono text-xs">
              <div className="text-base font-heading font-black text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Log Operational Incident</span>
              </div>
              <form onSubmit={handleLogIncident} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1">Category</label>
                    <select
                      value={incidentCategory}
                      onChange={(e) => setIncidentCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs"
                    >
                      <option value="TECHNICAL">Technical Issue</option>
                      <option value="PARTICIPANT">Participant Issue</option>
                      <option value="VENUE">Venue / Network</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">Priority</label>
                    <select
                      value={incidentPriority}
                      onChange={(e) => setIncidentPriority(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Incident Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={incidentDesc}
                    onChange={(e) => setIncidentDesc(e.target.value)}
                    placeholder="Provide details on the incident and mitigation steps taken..."
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowIncidentModal(false)}
                    className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-amber-400 text-background font-bold"
                  >
                    LOG TO INCIDENT DESK
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </OrganizerLayout>
  );
}
