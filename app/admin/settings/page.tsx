'use client';

import React from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Settings, ShieldCheck, Server, Key, Database, Mail } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="border-b border-white/10 pb-6">
          <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
            PLATFORM CONFIGURATION
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">System Settings & Controls</h1>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl space-y-6 font-mono text-xs text-white">
          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-[#01050d]">
            <Server className="w-5 h-5 text-electric-cyan" />
            <div>
              <div className="font-bold">Production Node Environment</div>
              <div className="text-white/50 text-[11px]">Next.js 14.2.35 • App Router • Server-Authoritative Clock</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-[#01050d]">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-bold">Database Storage Layer</div>
              <div className="text-white/50 text-[11px]">PostgreSQL 16+ Production DDL Architecture • In-Memory Fallback Active</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-[#01050d]">
            <Mail className="w-5 h-5 text-purple-400" />
            <div>
              <div className="font-bold">Transactional Email Dispatcher</div>
              <div className="text-white/50 text-[11px]">16-Template Luxury Dark Engine Active • Resend API / Console Fallback</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 bg-[#01050d]">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <div className="font-bold">Security Guards Active</div>
              <div className="text-white/50 text-[11px]">SSRF Protection • XSS Input Sanitization • Rate Limiter Pipeline</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
