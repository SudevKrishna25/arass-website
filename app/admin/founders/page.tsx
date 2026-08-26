'use client';

import React, { useState, useEffect } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import {
  Users,
  ShieldCheck,
  Key,
  CheckCircle2,
  Lock,
  Cpu,
  Server,
  Layers,
  Globe,
  Activity,
} from 'lucide-react';

export default function FoundersManagementPage() {
  const [founders, setFounders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/founders')
      .then((res) => res.json())
      .then((data) => {
        if (data.founders) setFounders(data.founders);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const founderIcons = [Cpu, Server, Activity, Layers, Globe];

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              ARASS EXECUTIVE BOARD & SOVEREIGN DIRECTORS
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
              The Five Founders & Super Administrators
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>ALL 5 FOUNDER CREDENTIALS ACTIVE</span>
          </div>
        </div>

        {/* The 5 Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {founders.map((founder, idx) => {
            const Icon = founderIcons[idx % founderIcons.length];
            return (
              <div
                key={founder.id}
                className="p-6 rounded-2xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl hover:border-electric-cyan/50 transition-all duration-300 space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan uppercase font-bold">
                    FOUNDER #{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-heading font-bold text-white">{founder.name}</h3>
                  <div className="text-xs font-mono text-electric-cyan">@{founder.username}</div>
                  <div className="text-[11px] font-mono text-white/50">{founder.email}</div>
                </div>

                <p className="text-xs font-sans text-white/70 font-light leading-relaxed">
                  {founder.bio || 'Co-Founder and Super Administrator for ARASS Global Technology Platform.'}
                </p>

                {/* Skills/Disciplines */}
                {founder.skills && founder.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {founder.skills.map((skill: string, sIdx: number) => (
                      <span
                        key={sIdx}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Security & Access Level */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                  <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SUPER ADMIN ACCESS</span>
                  </div>
                  <span>SESSION VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
