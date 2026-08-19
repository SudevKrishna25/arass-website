'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LAB_DOMAINS, LabDomain } from '@/lib/site-data';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Users, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LabsPage() {
  const [activeDomainIdx, setActiveDomainIdx] = useState(0);
  const activeDomain: LabDomain = LAB_DOMAINS[activeDomainIdx];

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_labs_robotics.jpg"
            alt="ARASS High-Bay Research Labs"
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
          sectionCode="LAB-08"
          stageName="RESEARCH FRONTIERS"
          coordinates="46.2044° N, 6.1432° E"
          classification="EXPERIMENTAL HANGARS // BSL-3 / CLASS-10"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 08 // PHYSICAL SCIENCE
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-primary-text">
            RESEARCH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              FRONTIERS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Six high-containment experimental facilities tackling foundational physical barriers in materials,
            energy, biological synthesis, and machine intelligence.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SELECT RESEARCH DOMAIN BELOW</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Full-Viewport Interactive Research Domain Matrix */}
      <section className="relative py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
        {/* Domain Navigation Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {LAB_DOMAINS.map((domain, idx) => {
            const isSelected = activeDomainIdx === idx;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveDomainIdx(idx)}
                data-cursor="view"
                className={`p-4 rounded-xl text-left transition-all duration-300 border ${
                  isSelected
                    ? 'bg-electric-cyan/20 border-electric-cyan text-primary-text shadow-[0_0_25px_rgba(0,212,255,0.3)]'
                    : 'bg-[#020b18]/60 border-white/10 text-secondary-text/70 hover:border-electric-cyan/40 hover:text-electric-cyan'
                }`}
              >
                <div className="text-[10px] font-mono text-electric-cyan font-bold mb-1">
                  {domain.code}
                </div>
                <div className="text-xs font-mono font-bold tracking-wider uppercase truncate">
                  {domain.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Environment Viewport with Animated Presence */}
        <div className="relative rounded-3xl overflow-hidden border border-electric-cyan/30 bg-[#020b18] shadow-[0_0_80px_rgba(0,0,0,0.8)] min-h-[620px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]"
            >
              {/* Visual Scene Stage */}
              <div className="lg:col-span-7 relative h-80 lg:h-auto min-h-[380px] overflow-hidden">
                <Image
                  src={activeDomain.image}
                  alt={activeDomain.name}
                  fill
                  priority
                  className="object-cover brightness-60 contrast-130 transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#020b18]/40 to-[#020b18]" />

                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#020b18]/80 border border-electric-cyan/40 text-[10px] font-mono text-electric-cyan tracking-widest uppercase backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>{activeDomain.leadFacility}</span>
                </div>
              </div>

              {/* Editorial Metadata & Specs */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[#020b18]/90 backdrop-blur-md">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
                      LABORATORY PROFILE // {activeDomain.code}
                    </span>
                    <span className="text-xs font-mono font-bold text-electric-cyan px-2.5 py-0.5 rounded border border-electric-cyan/30 bg-electric-cyan/10">
                      {activeDomain.programsCount} ACTIVE PROGRAMS
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-heading font-black text-primary-text leading-tight">
                    {activeDomain.name}
                  </h2>

                  <p className="text-xs sm:text-sm font-mono text-secondary-text/90 italic">
                    &ldquo;{activeDomain.focus}&rdquo;
                  </p>

                  <p className="text-sm font-sans text-secondary-text leading-relaxed pt-2 font-light">
                    {activeDomain.description}
                  </p>
                </div>

                {/* Hardware Specifications */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <span className="text-[9px] font-mono tracking-widest text-secondary-text/50 uppercase block">
                    EXPERIMENTAL APPARATUS & DIAGNOSTICS
                  </span>
                  <div className="space-y-2">
                    {activeDomain.specifications.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-mono text-primary-text/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personnel Telemetry & Link */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-secondary-text">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-electric-cyan" />
                    <span>{activeDomain.keyPersonnel}</span>
                  </div>
                  <PageTransitionLink
                    href="/technologies"
                    cursor="explore"
                    className="text-electric-cyan hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>VIEW SCHEMATICS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </PageTransitionLink>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 03: Chapter Progression */}
      <section className="relative py-24 text-center px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
            DOWNSTREAM HARDWARE
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text">
            EXPLORE TECHNOLOGY SYSTEMS & 2D SCHEMATICS
          </h2>
          <div className="pt-4 flex justify-center">
            <PageTransitionLink
              href="/technologies"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all hover:scale-105"
            >
              <span>EXPLORE TECHNOLOGIES</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
