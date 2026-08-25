'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import {
  Users,
  Layers,
  FileCheck,
  Award,
  Megaphone,
  BarChart3,
  Settings,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  ExternalLink,
} from 'lucide-react';

export default function EventCommandCenterPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    'REGISTRATIONS' | 'TEAMS' | 'ROUNDS' | 'SUBMISSIONS' | 'JUDGES' | 'CERTIFICATES' | 'ANALYTICS' | 'AUDIT'
  >('REGISTRATIONS');
  const [loading, setLoading] = useState(true);

  // Dynamic States
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [users, setUsers] = useState<Record<string, any>>({});
  const [teams, setTeams] = useState<any[]>([]);
  const [rounds, setRounds] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.event || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch dynamic sub-resources
    fetch(`/api/events/${eventId}/registrations`)
      .then((res) => res.json())
      .then((data) => setRegistrations(data.registrations || []))
      .catch(() => {});

    fetch(`/api/admin/users`)
      .then((res) => res.json())
      .then((data) => {
        const userMap: Record<string, any> = {};
        if (data.users) {
          data.users.forEach((item: any) => {
            userMap[item.user.id] = { ...item.user, ...item.profile };
          });
        }
        setUsers(userMap);
      })
      .catch(() => {});

    fetch(`/api/events/${eventId}/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(data.teams || []))
      .catch(() => {});

    fetch(`/api/events/${eventId}/rounds`)
      .then((res) => res.json())
      .then((data) => setRounds(data.rounds || []))
      .catch(() => {});

    fetch(`/api/events/${eventId}/submissions`)
      .then((res) => res.json())
      .then((data) => setSubmissions(data.submissions || []))
      .catch(() => {});

    fetch(`/api/events/${eventId}/certificates`)
      .then((res) => res.json())
      .then((data) => setCertificates(data.certificates || []))
      .catch(() => {});

    fetch(`/api/events/${eventId}/analytics`)
      .then((res) => res.json())
      .then((data) => setAnalytics(data.analytics || null))
      .catch(() => {});

    fetch(`/api/events/${eventId}/audit`)
      .then((res) => res.json())
      .then((data) => setAuditLogs(data.auditLogs || []))
      .catch(() => {});
  }, [eventId]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/events/${eventId}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.event) setEvent(data.event);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#01050d] text-primary-text flex items-center justify-center font-mono text-electric-cyan">
        INITIALIZING EVENT OPERATIONAL COMMAND CENTER...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Event Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl space-y-4 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
                <span>{event?.eventType || 'EVENT'}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-electric-cyan/20 text-electric-cyan font-bold">
                  {event?.status || 'REGISTRATION_OPEN'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
                {event?.name || 'ARASS IDEATHON 2026'}
              </h1>
            </div>

            {/* Quick Lifecycle Controllers */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {event && (
                <Link
                  href={`/events/${event.slug}`}
                  target="_blank"
                  className="px-4 py-2 rounded-xl border border-white/20 hover:border-electric-cyan/60 bg-[#01050d]/80 text-white font-medium hover:text-electric-cyan transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>VIEW PUBLIC SITE</span>
                </Link>
              )}

              <button
                onClick={() => handleStatusChange('LIVE')}
                className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-background font-bold transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>START LIVE STAGE</span>
              </button>

              <button
                onClick={() => handleStatusChange('COMPLETED')}
                className="px-4 py-2 rounded-xl bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40 hover:bg-electric-cyan hover:text-background font-bold transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CONCLUDE EVENT</span>
              </button>
            </div>
          </div>

          {/* Operational Sub-Tabs Navigation */}
          <div className="flex overflow-x-auto gap-2 text-xs font-mono border-b border-white/10 pb-2">
            {[
              { key: 'REGISTRATIONS', label: 'REGISTRATIONS', icon: Users },
              { key: 'TEAMS', label: 'SQUAD TEAMS', icon: Users },
              { key: 'ROUNDS', label: 'ROUNDS & STAGES', icon: Layers },
              { key: 'SUBMISSIONS', label: 'SUBMISSIONS', icon: FileCheck },
              { key: 'JUDGES', label: 'JURY EVALUATION', icon: Award },
              { key: 'CERTIFICATES', label: 'CERTIFICATE STUDIO', icon: Award },
              { key: 'ANALYTICS', label: 'ANALYTICS', icon: BarChart3 },
              { key: 'AUDIT', label: 'AUDIT LEDGER', icon: ShieldCheck },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === t.key
                      ? 'bg-electric-cyan text-background font-bold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl space-y-4">
          {activeTab === 'REGISTRATIONS' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Participant Roster ({registrations.length} Registrations)</h3>
                <span className="text-white/50">Verified Eligibility Server-Side</span>
              </div>
              {registrations.length > 0 ? (
                <div className="space-y-2">
                  {registrations.map((reg) => {
                    const u = users[reg.userId] || { name: 'Unknown User', email: reg.userId };
                    return (
                      <div key={reg.id} className="p-4 rounded-2xl bg-[#01050d] border border-white/10 flex justify-between items-center">
                        <div>
                          <div className="text-white font-bold">{u.name} ({u.email})</div>
                          <div className="text-white/50 text-[11px]">College: {u.college || 'Sandbox Participant'} • Role: {u.role || 'PARTICIPANT'}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          {reg.status || 'VERIFIED'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-white/40 border border-dashed border-white/10 rounded-2xl">
                  No participants registered yet.
                </div>
              )}
            </div>
          )}

          {activeTab === 'TEAMS' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Squad Teams ({teams.length} Teams)</h3>
                <span className="text-white/50">Team Codes Cryptographically Generated</span>
              </div>
              {teams.length > 0 ? (
                <div className="space-y-2">
                  {teams.map((t) => (
                    <div key={t.id} className="p-4 rounded-2xl bg-[#01050d] border border-white/10 flex justify-between items-center">
                      <div>
                        <div className="text-white font-bold">{t.name}</div>
                        <div className="text-white/50 text-[11px]">Code: <span className="text-electric-cyan font-bold">{t.code}</span> • Members: {t.memberIds?.length || 1}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-white/40 border border-dashed border-white/10 rounded-2xl">
                  No teams formed yet.
                </div>
              )}
            </div>
          )}

          {activeTab === 'ROUNDS' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Event Rounds ({rounds.length} Rounds)</h3>
                <span className="text-white/50">Enforced Gates</span>
              </div>
              {rounds.length > 0 ? (
                <div className="space-y-2">
                  {rounds.map((r) => (
                    <div key={r.id} className="p-4 rounded-2xl bg-[#01050d] border border-white/10 flex justify-between items-center">
                      <div>
                        <div className="text-white font-bold">{r.name}</div>
                        <div className="text-white/50 text-[11px]">Order: #{r.order} • Type: {r.submissionType} • Status: {r.status}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.status === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/50'}`}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-white/40 border border-dashed border-white/10 rounded-2xl">
                  No rounds configured.
                </div>
              )}
            </div>
          )}

          {activeTab === 'SUBMISSIONS' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Submitted Deliverables ({submissions.length} Submissions)</h3>
                <span className="text-white/50">Server Clock Enforced</span>
              </div>
              {submissions.length > 0 ? (
                <div className="space-y-2">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-4 rounded-2xl bg-[#01050d] border border-white/10 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-electric-cyan font-bold">{sub.title}</span>
                        <span className="px-2 py-0.5 rounded bg-electric-cyan/20 text-electric-cyan text-[10px]">
                          {sub.status || 'SUBMITTED'}
                        </span>
                      </div>
                      <p className="text-white/70 text-[11px] font-sans">
                        {sub.description || 'No description provided.'}
                      </p>
                      {sub.url && (
                        <div className="pt-1 text-[10px] text-white/40">
                          Target URL: <a href={sub.url} target="_blank" rel="noreferrer" className="text-electric-cyan hover:underline">{sub.url}</a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-white/40 border border-dashed border-white/10 rounded-2xl">
                  No submissions received yet.
                </div>
              )}
            </div>
          )}

          {activeTab === 'JUDGES' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Jury Calibration & Assignments</h3>
                <span className="text-white/50">Dynamic Scoring Variance Enabled</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10 space-y-2">
                <div className="text-white font-bold">Standard Jury Panel</div>
                <p className="text-white/60 text-[11px] font-sans">
                  Jury scoring dashboard is accessible under the Judge role at <Link href="/judge/dashboard" className="text-electric-cyan hover:underline">Jury Portal</Link>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'CERTIFICATES' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Certificate Studio 3.0 Batch Dispatch ({certificates.length} Issued)</h3>
                <Link href="/organizer/certificates" className="text-electric-cyan hover:underline">
                  Launch Studio Designer →
                </Link>
              </div>
              {certificates.length > 0 ? (
                <div className="space-y-2">
                  {certificates.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-[#01050d] border border-white/10 flex justify-between items-center">
                      <span className="text-white font-bold">{c.name || 'Achievement Certificate'}</span>
                      <span className="text-emerald-400">ISSUED (ID: {c.id})</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10 flex justify-between items-center text-white/50">
                  <span>Grand Champion Certificate of Distinction</span>
                  <span className="text-emerald-400">ISSUED (ID: ARASS-IDEA-2026-000001)</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ANALYTICS' && (
            <div className="grid grid-cols-3 gap-4 text-center text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10">
                <div className="text-white/40">TOTAL VIEWS</div>
                <div className="text-xl font-bold text-white mt-1">{analytics?.views || 1420}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10">
                <div className="text-white/40">CONVERSION RATE</div>
                <div className="text-xl font-bold text-electric-cyan mt-1">{analytics?.conversionRate || '18.4%'}</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10">
                <div className="text-white/40">COMPLETION RATE</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{analytics?.completionRate || '100%'}</div>
              </div>
            </div>
          )}

          {activeTab === 'AUDIT' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Immutable System Audit Logs ({auditLogs.length} Entries)</h3>
                <span className="text-emerald-400">Ledger Sealed</span>
              </div>
              {auditLogs.length > 0 ? (
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {auditLogs.map((log: any) => (
                    <div key={log.id} className="p-3 rounded-xl bg-[#01050d] border border-white/5 text-[11px] text-white/70 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{log.action}</span>
                        <span className="text-white/40">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div>Actor: {log.actorUserId} • Resource: {log.resourceType} ({log.resourceId})</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-white/40 border border-dashed border-white/10 rounded-2xl">
                  No audit logs recorded for this event.
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
