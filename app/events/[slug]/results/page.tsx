'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Trophy, Award, ExternalLink, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function EventResultsHonorsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [resultsData, setResultsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${slug}/results`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) setResultsData(data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-20" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Link
            href={`/events/${slug}`}
            className="p-2 rounded-xl border border-white/15 text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>OFFICIAL COMPETITION RESULTS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Championship Honors & Awards</h1>
          </div>
        </div>

        {/* Grand Champion Card */}
        {resultsData?.winners && resultsData.winners.length > 0 && (
          <div className="p-8 sm:p-10 rounded-3xl border border-amber-500/40 bg-[#020b18]/90 backdrop-blur-2xl text-center space-y-4 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
              FIRST PLACE // GRAND CHAMPION
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              {resultsData.winners[0].recipientName}
            </h2>
            <p className="text-xs font-sans text-white/70 max-w-md mx-auto">
              Awarded for breakthrough formulation in distributed consensus architecture and verifiable neural execution.
            </p>

            <div className="pt-2">
              <Link
                href={`/verify/certificate/${resultsData.winners[0].certificateId}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 text-background font-mono font-bold text-xs hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.6)]"
              >
                <span>VERIFY OFFICIAL CREDENTIAL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Other Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Finalists */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-electric-cyan" />
              <span>Finalist Recognition</span>
            </h3>

            <div className="space-y-2 text-xs font-mono">
              {resultsData?.finalists && resultsData.finalists.length > 0 ? (
                resultsData.finalists.map((f: any) => (
                  <div key={f.id} className="p-3 rounded-xl border border-white/5 bg-[#01050d]/60 flex items-center justify-between">
                    <span className="text-white font-semibold">{f.recipientName}</span>
                    <Link
                      href={`/verify/certificate/${f.certificateId}`}
                      target="_blank"
                      className="text-electric-cyan hover:underline text-[11px]"
                    >
                      Verify
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-white/40 text-center py-4">No additional finalist certificates published.</div>
              )}
            </div>
          </div>

          {/* Special Awards */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-violet-400" />
              <span>Special Technical Mentions</span>
            </h3>

            <div className="space-y-2 text-xs font-mono">
              {resultsData?.specialAwards && resultsData.specialAwards.length > 0 ? (
                resultsData.specialAwards.map((s: any) => (
                  <div key={s.id} className="p-3 rounded-xl border border-white/5 bg-[#01050d]/60 flex items-center justify-between">
                    <span className="text-white font-semibold">{s.recipientName}</span>
                    <Link
                      href={`/verify/certificate/${s.certificateId}`}
                      target="_blank"
                      className="text-violet-400 hover:underline text-[11px]"
                    >
                      Verify
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-white/40 text-center py-4">No special mentions issued for this program.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
