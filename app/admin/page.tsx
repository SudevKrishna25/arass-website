'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import {
  AlertCircle,
  Calendar,
  Clock,
  FileCheck,
  Award,
  FileText,
  ShieldCheck,
  Plus,
  Users,
  Image as ImageIcon,
  ArrowRight,
  TrendingUp,
  Activity,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/overview')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              ARASS EXECUTIVE COMMAND CENTER
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">System Operational Overview</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/events/new"
              className="px-5 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.5)]"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE EVENT</span>
            </Link>

            <Link
              href="/admin/content"
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-electric-cyan bg-[#020b18]/80 text-white font-mono font-medium text-xs flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-electric-cyan" />
              <span>MANAGE CMS</span>
            </Link>
          </div>
        </div>

        {/* SECTION 1: WHAT NEEDS MY ATTENTION? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-heading font-bold text-white uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-electric-cyan" />
            <h2>What Needs My Attention?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Live Events Card */}
            <Link
              href="/admin/events"
              className="p-5 rounded-2xl border border-emerald-500/30 bg-[#020b18]/80 hover:border-emerald-500 transition-all space-y-3 block group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE EVENTS
                </span>
                <span className="text-xl font-heading font-black text-white">
                  {data?.attention?.liveEventsCount ?? 1}
                </span>
              </div>
              <p className="text-xs font-sans text-white/70 font-light">
                Events currently accepting live participant submissions and assessment transmissions.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 group-hover:underline flex items-center gap-1">
                <span>Inspect Stage Control →</span>
              </div>
            </Link>

            {/* Submissions Waiting */}
            <Link
              href="/admin/events"
              className="p-5 rounded-2xl border border-amber-500/30 bg-[#020b18]/80 hover:border-amber-500 transition-all space-y-3 block group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                <span className="flex items-center gap-2 font-bold">
                  <FileCheck className="w-4 h-4" />
                  SUBMISSIONS PENDING JURY
                </span>
                <span className="text-xl font-heading font-black text-white">
                  {data?.attention?.pendingSubmissionsCount ?? 0}
                </span>
              </div>
              <p className="text-xs font-sans text-white/70 font-light">
                Project deliverables waiting for jury allocation and variance calibration scoring.
              </p>
              <div className="text-[11px] font-mono text-amber-400 group-hover:underline flex items-center gap-1">
                <span>View Evaluation Queue →</span>
              </div>
            </Link>

            {/* Content Drafts */}
            <Link
              href="/admin/content"
              className="p-5 rounded-2xl border border-electric-cyan/30 bg-[#020b18]/80 hover:border-electric-cyan transition-all space-y-3 block group"
            >
              <div className="flex items-center justify-between text-xs font-mono text-electric-cyan">
                <span className="flex items-center gap-2 font-bold">
                  <FileText className="w-4 h-4" />
                  CMS CONTENT DRAFTS
                </span>
                <span className="text-xl font-heading font-black text-white">
                  {data?.attention?.contentDraftsCount ?? 0}
                </span>
              </div>
              <p className="text-xs font-sans text-white/70 font-light">
                Page revisions and editorial sections queued for publication review.
              </p>
              <div className="text-[11px] font-mono text-electric-cyan group-hover:underline flex items-center gap-1">
                <span>Open Website CMS →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* SECTION 2: SYSTEM DOMAIN METRICS */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-[10px] font-mono text-white/50 uppercase">Total Registered Users</div>
            <div className="text-2xl font-heading font-black text-white">{data?.metrics?.totalUsers ?? 4}</div>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-[10px] font-mono text-white/50 uppercase">Active Competitions</div>
            <div className="text-2xl font-heading font-black text-white">{data?.metrics?.totalEvents ?? 4}</div>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-[10px] font-mono text-white/50 uppercase">Squad Registrations</div>
            <div className="text-2xl font-heading font-black text-white">{data?.metrics?.totalRegistrations ?? 1}</div>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/60 space-y-1">
            <div className="text-[10px] font-mono text-white/50 uppercase">Certificates Issued</div>
            <div className="text-2xl font-heading font-black text-white">{data?.metrics?.totalCertificates ?? 1}</div>
          </div>
        </section>

        {/* SECTION 3: RECENT ADMIN ACTIONS & AUDIT LEDGER */}
        <section className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-heading font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-electric-cyan" />
              <h2>Recent Administrative Operations Log</h2>
            </div>
            <Link href="/admin/audit" className="text-xs font-mono text-electric-cyan hover:underline">
              View Full Audit Ledger →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/50 uppercase text-[10px]">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Resource</th>
                  <th className="py-3 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {data?.recentAuditLogs && data.recentAuditLogs.length > 0 ? (
                  data.recentAuditLogs.map((log: any, idx: number) => (
                    <tr key={log.id || idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white/50">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="py-3 px-4 text-electric-cyan font-bold">{log.actorUserId || 'SUPER_ADMIN'}</td>
                      <td className="py-3 px-4 font-bold">{log.action}</td>
                      <td className="py-3 px-4 text-white/70">
                        {log.resourceType}: {log.resourceId}
                      </td>
                      <td className="py-3 px-4 text-white/50">{log.ipAddress || '127.0.0.1'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-white/40">
                      No administrative mutations logged in current session.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
