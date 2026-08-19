'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import {
  Calendar,
  Send,
  Award,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  ChevronRight,
  ExternalLink,
  Layers,
  FileText,
  ShieldCheck,
} from 'lucide-react';

export default function ParticipantDashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'MY_EVENTS' | 'UPCOMING' | 'LIVE_NOW' | 'SUBMISSIONS' | 'CERTIFICATES' | 'NOTIFICATIONS'>('MY_EVENTS');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setCurrentUser({ ...data.user, profile: data.profile });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNotifications(data.notifications || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Top Next Action Hero Banner */}
        <section className="p-6 sm:p-8 rounded-3xl border border-electric-cyan/30 bg-gradient-to-r from-[#020b18]/90 via-[#01142a]/80 to-[#020b18]/90 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,212,255,0.08)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/40 bg-electric-cyan/10 text-[10px] font-mono text-electric-cyan tracking-widest uppercase">
              <Zap className="w-3 h-3 animate-pulse" />
              <span>NEXT ACTION REQUIRED</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Welcome, {currentUser?.profile?.name || 'Alex Chen'}
            </h1>
            <p className="text-xs sm:text-sm font-sans text-white/70 font-light max-w-2xl">
              Stage 01 Submissions for <strong className="text-white">ARASS IDEATHON 2026</strong> are active. Your squad <span className="text-electric-cyan font-mono font-bold">Synapse Labs</span> has registered Version 1. You may refine your deliverable or view live stage announcements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/events/arass-ideathon-2026/live"
              className="px-6 py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.6)] hover:scale-105 transition-transform flex items-center gap-2"
            >
              <span>SUBMIT PROJECT / ENTER STAGE</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/notifications"
              className="px-4 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs flex items-center gap-2"
            >
              <Bell className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Notifications ({notifications.filter((n) => !n.read).length})</span>
            </Link>
          </div>
        </section>

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Registered Events</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">1</div>
            <div className="text-[11px] font-sans text-white/60">ARASS IDEATHON 2026</div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-2">
              <Send className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Submissions Delivered</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">1</div>
            <div className="text-[11px] font-sans text-emerald-400 font-mono">Stage 01 • v1 Signed</div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Verified Credentials</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">1</div>
            <div className="text-[11px] font-sans text-white/60">Grand Champion Honors</div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Integrity Rating</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white">100%</div>
            <div className="text-[11px] font-sans text-emerald-400 font-mono">Verified Zero Violations</div>
          </div>
        </div>

        {/* Unified Tab Navigation */}
        <div className="flex border-b border-white/10 overflow-x-auto gap-2 pb-2">
          {[
            { id: 'MY_EVENTS', label: 'MY EVENTS' },
            { id: 'LIVE_NOW', label: 'LIVE NOW' },
            { id: 'SUBMISSIONS', label: 'SUBMISSIONS' },
            { id: 'CERTIFICATES', label: 'CERTIFICATES' },
            { id: 'NOTIFICATIONS', label: `NOTIFICATIONS (${notifications.filter((n) => !n.read).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-electric-cyan/20 border border-electric-cyan text-electric-cyan font-bold shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'text-white/60 border border-transparent hover:text-white hover:border-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: MY EVENTS & LIVE NOW */}
        {(activeTab === 'MY_EVENTS' || activeTab === 'LIVE_NOW') && (
          <div className="space-y-4">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    STAGE LIVE
                  </span>
                  <span className="text-xs font-mono text-white/50">ONLINE IDEATHON</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-white">ARASS IDEATHON 2026</h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/70">
                  <span>Squad: <strong className="text-white">Synapse Labs</strong></span>
                  <span>•</span>
                  <span>Stage: <strong className="text-electric-cyan">Round 1: Idea Pitch</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Clock className="w-3.5 h-3.5 text-electric-cyan" />
                    <span>Closes in 48h</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/events/arass-ideathon-2026/live"
                  className="px-5 py-2.5 rounded-xl bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider hover:scale-105 transition-transform"
                >
                  LIVE STAGE WORKSPACE →
                </Link>
                <Link
                  href="/events/arass-ideathon-2026/results"
                  className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-mono text-xs hover:border-white/40"
                >
                  RESULTS
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SUBMISSIONS */}
        {activeTab === 'SUBMISSIONS' && (
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h2 className="text-sm font-mono tracking-widest text-white/80 uppercase">Delivered Submissions & Version History</h2>
            <div className="p-5 rounded-2xl border border-white/10 bg-[#01050d] space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="text-base font-bold text-white">Autonomous Agent Neural Consensus Protocol</div>
                  <div className="text-white/50 text-[11px]">ARASS IDEATHON 2026 • Round 1: Idea Pitch</div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit">
                  STATUS: SUBMITTED (v1)
                </span>
              </div>
              <div className="text-white/70 font-sans text-xs">
                Repository: <a href="https://github.com/arass-research/agent-neural-consensus" target="_blank" rel="noreferrer" className="text-electric-cyan hover:underline">https://github.com/arass-research/agent-neural-consensus</a>
              </div>
              <div className="text-[11px] text-white/50 flex items-center justify-between pt-2">
                <span>Cryptographic Signature: 0x9f8b4a2c...e718</span>
                <Link href="/events/arass-ideathon-2026/live" className="text-electric-cyan hover:underline">
                  Submit Refined Version (v2) →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: CERTIFICATES */}
        {activeTab === 'CERTIFICATES' && (
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h2 className="text-sm font-mono tracking-widest text-white/80 uppercase">Issued Cryptographic Credentials</h2>
            <div className="p-6 rounded-2xl border border-electric-cyan/30 bg-[#01050d] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
              <div className="space-y-1">
                <div className="text-[10px] text-electric-cyan uppercase">CERTIFICATE OF HONOR</div>
                <div className="text-base font-bold text-white">ARASS IDEATHON 2026 // GRAND CHAMPION</div>
                <div className="text-xs text-white/60">ID: ARASS-IDEA-2026-000001 • Recipient: Alex Chen</div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/verify/certificate/ARASS-IDEA-2026-000001"
                  className="px-5 py-2.5 rounded-xl bg-electric-cyan text-background font-bold text-xs tracking-wider hover:scale-105 transition-transform"
                >
                  VERIFY & DOWNLOAD →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: NOTIFICATIONS */}
        {activeTab === 'NOTIFICATIONS' && (
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-sm font-mono tracking-widest text-white/80 uppercase">Recent System Dispatches</h2>
              <Link href="/notifications" className="text-xs font-mono text-electric-cyan hover:underline">
                Open Full Center
              </Link>
            </div>
            <div className="space-y-3 font-mono text-xs">
              {notifications.length === 0 ? (
                <div className="py-8 text-center text-white/40">No new notifications.</div>
              ) : (
                notifications.slice(0, 5).map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl border ${notif.read ? 'border-white/10 bg-[#01050d]/60 text-white/60' : 'border-electric-cyan/30 bg-electric-cyan/5 text-white'}`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                      <span>{notif.type}</span>
                      <span>{new Date(notif.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <div className="font-bold text-sm text-white mb-1">{notif.title}</div>
                    <div className="text-xs text-white/70 font-sans">{notif.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
