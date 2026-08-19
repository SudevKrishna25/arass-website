'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Trophy, Calendar, Users, ArrowUpRight, Award, ExternalLink } from 'lucide-react';

export default function MyEventsPage() {
  const [tab, setTab] = useState<'registered' | 'certificates'>('registered');

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
            COMPETITION DOSSIER
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">My Events & Credentials</h1>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 text-xs font-mono">
          <button
            onClick={() => setTab('registered')}
            className={`px-4 py-2 rounded-full transition-all ${
              tab === 'registered'
                ? 'bg-electric-cyan text-background font-bold'
                : 'text-white/60 hover:text-white bg-[#020b18]'
            }`}
          >
            Registered Competitions
          </button>

          <button
            onClick={() => setTab('certificates')}
            className={`px-4 py-2 rounded-full transition-all ${
              tab === 'certificates'
                ? 'bg-electric-cyan text-background font-bold'
                : 'text-white/60 hover:text-white bg-[#020b18]'
            }`}
          >
            Verified Certificates (1)
          </button>
        </div>

        {/* Tab 1: Registered Events */}
        {tab === 'registered' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-white/15 bg-[#020b18]/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30">
                    IDEATHON
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    VERIFIED ENTRANT
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white">ARASS IDEATHON 2026</h3>
                <p className="text-xs font-sans text-white/70 font-light max-w-xl">
                  National frontier technology ideathon. Team: <span className="font-mono text-white font-semibold">Synapse Labs</span>. Active Stage: Round 1.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/events/arass-ideathon-2026/live"
                  className="px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all"
                >
                  LIVE COMMAND CENTER →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Verified Certificates */}
        {tab === 'certificates' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-emerald-500/30 bg-[#020b18]/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    OFFICIALLY ISSUED
                  </span>
                  <span className="text-xs font-mono text-white/50">ID: ARASS-IDEA-2026-000001</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-white">Grand Champion // First Place</h3>
                <p className="text-xs font-sans text-white/70 font-light">
                  ARASS IDEATHON 2026 • Recipient: Alex Chen (Synapse Labs)
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/verify/certificate/ARASS-IDEA-2026-000001"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-electric-cyan/40 hover:border-electric-cyan bg-electric-cyan/10 text-electric-cyan font-mono font-bold text-xs"
                >
                  <span>VERIFY RECORD</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
