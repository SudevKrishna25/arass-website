'use client';

import React from 'react';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { BarChart3, TrendingUp, Users, Award, Calendar, Layers } from 'lucide-react';

export default function OrganizerGlobalAnalyticsPage() {
  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <div>
          <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
            ENTERPRISE INTELLIGENCE
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Global Portfolio Telemetry</h1>
          <p className="text-xs font-sans text-white/70 font-light">
            Cross-program aggregate performance, developer retention, and institutional conversion rates.
          </p>
        </div>

        {/* Global Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Total Programs</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">4</div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold">100% Operational</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Unique Entrants</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">24</div>
            <div className="text-[11px] font-mono text-white/50">84% University affiliated</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Total Submissions</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">12</div>
            <div className="text-[11px] font-mono text-electric-cyan font-semibold">Average 92/100 score</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Total Prize Pool</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">₹220,000</div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold">Verified Escrow</div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
