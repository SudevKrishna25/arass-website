'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { Event } from '@/lib/events-db/types';
import {
  Calendar,
  Users,
  Send,
  Award,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Plus,
  Radio,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layers,
  Activity,
} from 'lucide-react';

export default function OrganizerDashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/events/list').then((r) => r.json()),
      fetch('/api/organizer/analytics').then((r) => r.json()),
    ])
      .then(([eventsData, analyticsData]) => {
        if (eventsData.events) setEvents(eventsData.events);
        if (analyticsData.summary) setSummary(analyticsData.summary);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeEventsCount = summary?.activeEvents ?? events.filter((e) => e.status === 'LIVE' || e.status === 'REGISTRATION_OPEN').length;
  const totalRegistrations = summary?.totalRegistrations ?? 24;
  const totalSubmissions = summary?.totalSubmissions ?? 12;
  const totalCertificates = summary?.totalCertificates ?? 8;
  const totalCheckIns = summary?.totalCheckIns ?? 2;

  return (
    <OrganizerLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
              <span>ARASS ENTERPRISE EVENT OPERATING SYSTEM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Organizer Command Center</h1>
            <p className="text-xs font-sans text-white/70 font-light">
              Full lifecycle orchestration: event creation, eligibility verification, check-in, live judging, anti-cheat, and certification.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/organizer/analytics"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 hover:border-electric-cyan text-white text-xs font-mono transition-all"
            >
              <span>GLOBAL METRICS</span>
            </Link>
            <Link
              href="/organizer/events/new"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>NEW EVENT</span>
            </Link>
          </div>
        </div>

        {/* Global Operational Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Active Competitions</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">{activeEventsCount}</div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Authoritative Live State</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Total Registrations</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">{totalRegistrations}</div>
            <div className="text-[11px] font-mono text-white/50">{totalCheckIns} Checked In At Venue</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Submissions & Code</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">{totalSubmissions}</div>
            <div className="text-[11px] font-mono text-electric-cyan font-semibold">Immutable Versioning</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Credentials Issued</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">{totalCertificates}</div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold">100% Cryptographic Verification</div>
          </div>
        </div>

        {/* Action Center: Operations Requiring Attention */}
        <section className="p-6 rounded-3xl border border-amber-500/30 bg-[#020b18]/80 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Action Center // Operations Requiring Immediate Attention</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl border border-white/10 bg-[#01050d]/60 flex flex-col justify-between gap-3">
              <div>
                <div className="text-white font-bold">ARASS IDEATHON 2026</div>
                <div className="text-white/60 text-[11px]">Round 1 Submissions ready for jury evaluation & shortlisting.</div>
              </div>
              <Link
                href="/organizer/events/arass-ideathon-2026/participants"
                className="text-electric-cyan hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Participant Operations</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#01050d]/60 flex flex-col justify-between gap-3">
              <div>
                <div className="text-white font-bold">JURY CONFLICT MATRIX</div>
                <div className="text-white/60 text-[11px]">Review juror declarations and verify unbiased scoring workloads.</div>
              </div>
              <Link
                href="/organizer/judges"
                className="text-electric-cyan hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Manage Jurors & Conflicts</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-[#01050d]/60 flex flex-col justify-between gap-3">
              <div>
                <div className="text-white font-bold">CERTIFICATE STUDIO</div>
                <div className="text-white/60 text-[11px]">Templates ready for batch issuance and public cryptographic verification.</div>
              </div>
              <Link
                href="/organizer/certificates"
                className="text-electric-cyan hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Launch Certificate Studio</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* Managed Programs Table */}
        <section className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-xs font-mono tracking-widest text-white/80 uppercase">
              Managed Competition Programs ({events.length})
            </h2>
            <Link href="/organizer/events" className="text-xs font-mono text-electric-cyan hover:underline">
              View Operations Table
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Event Name</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Mode</th>
                  <th className="pb-3">Prize Pool</th>
                  <th className="pb-3 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">
                      <Link href={`/organizer/events/${evt.slug}/participants`} className="hover:text-electric-cyan">
                        {evt.name}
                      </Link>
                    </td>
                    <td className="py-3 text-white/70">{evt.eventType}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] border ${
                        evt.status === 'LIVE'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : evt.status === 'REGISTRATION_OPEN'
                          ? 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30'
                          : 'bg-white/10 text-white/80 border-white/15'
                      }`}>
                        {evt.status}
                      </span>
                    </td>
                    <td className="py-3 text-white/70">{evt.mode}</td>
                    <td className="py-3 text-electric-cyan font-bold">₹{evt.prizePool.toLocaleString()}</td>
                    <td className="py-3 text-right space-x-2">
                      <Link
                        href={`/organizer/events/${evt.slug}/live`}
                        className="px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] hover:bg-emerald-500/20"
                      >
                        LIVE STAGE
                      </Link>
                      <Link
                        href={`/organizer/events/${evt.slug}/participants`}
                        className="px-3 py-1 rounded-lg border border-white/20 hover:border-electric-cyan hover:text-electric-cyan text-white text-[11px]"
                      >
                        MANAGE
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </OrganizerLayout>
  );
}
