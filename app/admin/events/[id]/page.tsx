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
} from 'lucide-react';

export default function EventCommandCenterPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    'REGISTRATIONS' | 'TEAMS' | 'ROUNDS' | 'SUBMISSIONS' | 'JUDGES' | 'CERTIFICATES' | 'ANALYTICS' | 'AUDIT'
  >('REGISTRATIONS');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data.event || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
                <h3 className="text-sm font-bold text-white uppercase">Participant Roster (1 Registration)</h3>
                <span className="text-white/50">Verified Eligibility Server-Side</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-white font-bold">Alex Chen (alex.chen@sovereign-tech.org)</div>
                  <div className="text-white/50 text-[11px]">Squad Lead • Sovereign Systems Lab • Age 24</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                  SHORTLISTED
                </span>
              </div>
            </div>
          )}

          {activeTab === 'SUBMISSIONS' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Submitted Deliverables (1 Submission)</h3>
                <span className="text-white/50">Server Clock Enforced</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-electric-cyan font-bold">Autonomous Multi-Agent Consensus Protocol</span>
                  <span className="px-2 py-0.5 rounded bg-electric-cyan/20 text-electric-cyan text-[10px]">v1 Final</span>
                </div>
                <p className="text-white/70 text-[11px] font-sans">
                  Decentralized multi-agent orchestration architecture utilizing Byzantine fault tolerance consensus mesh.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'CERTIFICATES' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase">Certificate Studio 3.0 Batch Dispatch</h3>
                <Link href="/organizer/certificates" className="text-electric-cyan hover:underline">
                  Launch Studio Designer →
                </Link>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-white">
                  <span>Grand Champion Certificate of Distinction</span>
                  <span className="text-emerald-400">ISSUED (ID: ARASS-IDEA-2026-000001)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ANALYTICS' && (
            <div className="grid grid-cols-3 gap-4 text-center text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10">
                <div className="text-white/40">TOTAL VIEWS</div>
                <div className="text-xl font-bold text-white mt-1">1,420</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10">
                <div className="text-white/40">CONVERSION RATE</div>
                <div className="text-xl font-bold text-electric-cyan mt-1">18.4%</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#01050d] border border-white/10">
                <div className="text-white/40">COMPLETION RATE</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">100%</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
