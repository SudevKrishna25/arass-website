'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { VENTURES_DATA, Venture } from '@/lib/site-data';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, X, Award, Shield, Cpu } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function VenturesPage() {
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null);

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_venture_materials.jpg"
            alt="ARASS Venture Factory"
            fill
            priority
            className="object-cover brightness-40 contrast-130"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        <TechnicalOverlay
          sectionCode="VNT-07"
          stageName="SOVEREIGN VENTURES"
          coordinates="46.2044° N, 6.1432° E"
          classification="PORTFOLIO DOSSIERS // SIX SOVEREIGN HOLDINGS"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 07 // COMMERCIALIZATION
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-primary-text">
            THE VENTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              FACTORY
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Translating validated physics breakthroughs into autonomous, sovereign enterprises with
            multi-decade defensive moats.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO TRAVERSE FULL-SCREEN VENTURE DOSSIERS</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Full-Viewport Vertical Dossier Sequences (NOT A GRID) */}
      <section className="relative w-full space-y-24 py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        {VENTURES_DATA.map((venture, idx) => (
          <div
            key={venture.id}
            onClick={() => setSelectedVenture(venture)}
            data-cursor="explore"
            className="group relative rounded-3xl overflow-hidden border border-electric-cyan/30 hover:border-electric-cyan bg-[#020b18] transition-all duration-700 cursor-pointer shadow-[0_0_80px_rgba(0,0,0,0.8)] min-h-[75vh] flex flex-col justify-between p-8 sm:p-14"
          >
            {/* Background Cinematic Plate with Zoom/Shift on Hover */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={venture.image}
                alt={venture.name}
                fill
                priority={idx === 0}
                className="object-cover transition-transform duration-1000 group-hover:scale-110 brightness-50 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-[#020914]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020914]/90 via-[#020914]/40 to-transparent" />
            </div>

            {/* Top Telemetry Header */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <span className="text-xl sm:text-2xl font-mono font-black text-electric-cyan">
                  {venture.code}
                </span>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-secondary-text/80 uppercase border border-electric-cyan/30 px-3 py-1 rounded-full bg-electric-cyan/5">
                  {venture.domain}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-white px-3 py-1 rounded bg-[#020914]/80 border border-white/20">
                  {venture.readinessLevel}
                </span>
                <span className="text-xs font-mono text-electric-cyan px-3 py-1 rounded border border-electric-cyan/40 bg-electric-cyan/10">
                  {venture.stage}
                </span>
              </div>
            </div>

            {/* Center / Bottom Editorial Title & Summary */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-16">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-primary-text group-hover:text-electric-cyan group-hover:translate-x-2 transition-all duration-500 leading-tight">
                  {venture.name}
                </h2>
                <p className="text-sm sm:text-base font-mono text-secondary-text/90">
                  {venture.subtitle}
                </p>
                <p className="text-sm sm:text-base font-sans text-secondary-text leading-relaxed max-w-2xl font-light">
                  {venture.summary}
                </p>
              </div>

              {/* Right Metrics Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {venture.metrics.slice(0, 4).map((m, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#020914]/90 border border-electric-cyan/20 backdrop-blur-md">
                      <div className="text-[8px] font-mono text-secondary-text/60 uppercase truncate mb-1">
                        {m.label}
                      </div>
                      <div className="text-sm sm:text-base font-mono font-bold text-electric-cyan">
                        {m.value} {m.unit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-electric-cyan font-bold">
                  <span className="tracking-widest uppercase">OPEN FULL SPECIFICATION DOSSIER</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 03: Venture Detail Dossier Modal */}
      <AnimatePresence>
        {selectedVenture && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9950] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#020b18] border border-electric-cyan/40 rounded-2xl p-6 sm:p-12 shadow-[0_0_90px_rgba(0,212,255,0.25)] text-primary-text space-y-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
                    <span>{selectedVenture.code}</span>
                    <span>//</span>
                    <span>{selectedVenture.domain}</span>
                    <span>//</span>
                    <span className="text-white font-bold">{selectedVenture.readinessLevel}</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text">
                    {selectedVenture.name}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-secondary-text pt-1">{selectedVenture.subtitle}</p>
                </div>

                <button
                  onClick={() => setSelectedVenture(null)}
                  className="p-2.5 rounded-full border border-white/10 hover:border-electric-cyan text-secondary-text hover:text-electric-cyan transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Breakthrough Callout */}
              <div className="p-6 rounded-xl bg-electric-cyan/10 border border-electric-cyan/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-electric-cyan font-bold tracking-widest uppercase">
                  <Award className="w-4 h-4" />
                  <span>KEY SCIENTIFIC BREAKTHROUGH</span>
                </div>
                <p className="text-sm sm:text-base font-sans text-primary-text font-medium leading-relaxed">
                  {selectedVenture.breakthrough}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedVenture.metrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#020914] border border-electric-cyan/20">
                    <div className="text-[9px] font-mono text-secondary-text/60 uppercase mb-1">
                      {m.label}
                    </div>
                    <div className="text-xl font-mono font-bold text-electric-cyan">
                      {m.value} <span className="text-xs text-secondary-text">{m.unit}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-electric-cyan uppercase">
                  SYSTEM ARCHITECTURE SPECIFICATIONS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedVenture.specifications.map((spec, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-lg bg-[#020914] border border-white/5 text-xs font-mono text-primary-text/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono text-secondary-text/50 uppercase tracking-widest">
                  CONFIDENTIAL // ARASS VENTURES ARCHIVE
                </span>
                <PageTransitionLink
                  href="/contact"
                  cursor="explore"
                  onClick={() => setSelectedVenture(null)}
                  className="px-8 py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all"
                >
                  REQUEST CAPITAL ALLOCATION ACCESS ↗
                </PageTransitionLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 04: Next Chapter */}
      <section className="relative py-24 text-center px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
            UPSTREAM DISCOVERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text">
            EXPLORE THE RESEARCH FRONTIERS
          </h2>
          <div className="pt-4 flex justify-center">
            <PageTransitionLink
              href="/labs"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all hover:scale-105"
            >
              <span>ENTER ARASS LABS</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
