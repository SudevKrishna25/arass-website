'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Activity, Cpu, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SIX_SYSTEMS = [
  {
    num: '01',
    name: 'ARASS LABS',
    code: 'SYS-LABS',
    icon: Sparkles,
    subtitle: 'Frontier Scientific Discovery & Physical Prototyping',
    narrative:
      'Operating 6 specialized research facilities covering quantum physics, metamaterials, nuclear fusion, and computational genomics. Uncompromising, curiosity-driven exploration backed by sovereign capital.',
    metrics: [
      { label: 'RESEARCH PROGRAMS', value: '07' },
      { label: 'ACTIVE SCIENTIFIC DOMAINS', value: '12' },
      { label: 'PATENT PIPELINES', value: '24' },
    ],
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    href: '/labs',
  },
  {
    num: '02',
    name: 'ARASS TECHNOLOGIES',
    code: 'SYS-TECH',
    icon: Cpu,
    subtitle: 'Hardware Architecture & Foundational Tooling',
    narrative:
      'Translating laboratory discoveries into robust, production-grade machines, optical semiconductors, and heavy industrial automation systems designed to outlast ordinary commercial cycles.',
    metrics: [
      { label: 'HARDWARE PLATFORMS', value: '14' },
      { label: 'ENERGY EFFICIENCY GAIN', value: '50x' },
      { label: 'DEPLOYED SILICON NODES', value: '300mm' },
    ],
    image: '/images/arass_frontier_build_lab.jpg',
    href: '/technologies',
  },
  {
    num: '03',
    name: 'ARASS INTELLIGENCE',
    code: 'SYS-INTEL',
    icon: Activity,
    subtitle: 'Strategic Foresight & Computational Reasoning',
    narrative:
      'Deep research briefings, technoeconomic models, and planetary horizon intelligence published to guide sovereign institutions and global engineering leaders.',
    metrics: [
      { label: 'BRIEFING REPORTS', value: '48' },
      { label: 'HORIZON FORESIGHT', value: '50 YRS' },
      { label: 'CITATION INDEX', value: '99.4%' },
    ],
    image: '/images/arass_insights_fusion.jpg',
    href: '/insights',
  },
  {
    num: '04',
    name: 'ARASS VENTURES',
    code: 'SYS-VENT',
    icon: Zap,
    subtitle: 'Sovereign Enterprise Incubation & Capital Scaling',
    narrative:
      'We do not passively invest; we architect and capitalize dedicated sovereign enterprises around breakthrough physics, granting them unmatched research runway.',
    metrics: [
      { label: 'ACTIVE VENTURES', value: '06' },
      { label: 'TOTAL CAPITAL ASSETS', value: '$450M+' },
      { label: 'TRL 7+ PROTOTYPES', value: '08' },
    ],
    image: '/images/arass_venture_materials.jpg',
    href: '/ventures',
  },
  {
    num: '05',
    name: 'ARASS FRONTIER',
    code: 'SYS-FRONT',
    icon: ShieldCheck,
    subtitle: 'Elite Human Talent & Collaborative Networks',
    narrative:
      'Convening world-class experimental physicists, roboticists, master fabricators, and institutional leaders within high-trust, zero-bureaucracy research environments.',
    metrics: [
      { label: 'SENIOR FELLOWS', value: '120+' },
      { label: 'GLOBAL HUBS', value: '04' },
      { label: 'FELLOWSHIP ACCEPTANCE', value: '< 1%' },
    ],
    image: '/images/arass_frontier_cinematic_bg.jpg',
    href: '/frontier',
  },
  {
    num: '06',
    name: 'INSTITUTIONAL SCALE',
    code: 'SYS-SCALE',
    icon: Globe,
    subtitle: 'Civilizational Infrastructure & Long-Term Deployment',
    narrative:
      'Connecting our technology matrix directly with state-level infrastructure, aerospace corridors, and planetary baseload grids to create multi-generational stability.',
    metrics: [
      { label: 'DEPLOYMENT REGIONS', value: '18' },
      { label: 'OPERATIONAL HORIZON', value: '2076' },
      { label: 'SOVEREIGN FIDELITY', value: '100%' },
    ],
    image: '/images/arass_horizon_planetary_orbit.jpg',
    href: '/horizon',
  },
];

export default function EcosystemPage() {
  const [activeSystemIdx, setActiveSystemIdx] = useState(0);
  const activeSystem = SIX_SYSTEMS[activeSystemIdx];

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_ecosystem_cinematic_bg.jpg"
            alt="ARASS Ecosystem Matrix"
            fill
            priority
            className="object-cover brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        <TechnicalOverlay
          sectionCode="ECO-03"
          stageName="OPERATING ECOSYSTEM"
          coordinates="51.5074° N, 0.1278° W"
          classification="INTEGRATED MATRIX // SIX DIRECT DIVISIONS"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 03 // THE MATRIX
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-primary-text">
            ONE ENGINE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]">
              SIX SYSTEMS.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] font-normal">
            An integrated deep-technology matrix where foundational discovery, heavy engineering,
            and permanent capital reinforce each other in a closed loop.
          </p>
        </div>
      </section>

      {/* 02: Full-Viewport Interactive Systems Matrix Explorer */}
      <section className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Systems Selector Grid Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {SIX_SYSTEMS.map((sys, idx) => {
            const Icon = sys.icon;
            const isSelected = activeSystemIdx === idx;
            return (
              <button
                key={sys.code}
                onClick={() => setActiveSystemIdx(idx)}
                data-cursor="view"
                className={`flex flex-col p-4 rounded-xl text-left transition-all duration-300 border ${
                  isSelected
                    ? 'bg-electric-cyan/15 border-electric-cyan text-primary-text shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                    : 'bg-[#020b18]/60 border-white/10 text-secondary-text/70 hover:border-electric-cyan/40 hover:text-electric-cyan'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-electric-cyan font-bold">{sys.num}</span>
                  <Icon className="w-4 h-4 text-electric-cyan/80" />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider truncate uppercase">
                  {sys.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Active System Scene Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-electric-cyan/30 bg-[#020b18] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* Left: Cinematic Visual Backdrop */}
            <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[300px]">
              <Image
                key={activeSystem.code}
                src={activeSystem.image}
                alt={activeSystem.name}
                fill
                priority
                className="object-cover transition-all duration-700 brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#020b18]/40 to-[#020b18]" />

              {/* Badges */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#020b18]/80 border border-electric-cyan/40 text-[10px] font-mono text-electric-cyan tracking-widest uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
                <span>{activeSystem.code} {'//'} ACTIVE TELEMETRY</span>
              </div>
            </div>

            {/* Right: Technical Metadata & Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[#020b18]/90 backdrop-blur-md">
              <div className="space-y-4">
                <div className="text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
                  SYSTEM {activeSystem.num} {'//'} ARCHITECTURAL DOSSIER
                </div>
                <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-primary-text">
                  {activeSystem.name}
                </h2>
                <p className="text-xs font-mono text-electric-cyan/90 tracking-wide">
                  {activeSystem.subtitle}
                </p>
                <p className="text-sm font-sans text-secondary-text leading-relaxed pt-2">
                  {activeSystem.narrative}
                </p>
              </div>

              {/* Integrated Technical Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                {activeSystem.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#020914] border border-electric-cyan/20">
                    <div className="text-[8px] font-mono tracking-widest text-secondary-text/60 uppercase mb-1">
                      {m.label}
                    </div>
                    <div className="text-base sm:text-lg font-mono font-bold text-electric-cyan">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Deep Destination Link */}
              <div className="pt-2">
                <PageTransitionLink
                  href={activeSystem.href}
                  cursor="explore"
                  className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-xl bg-electric-cyan/10 hover:bg-electric-cyan/20 border border-electric-cyan/40 text-xs font-mono tracking-widest text-electric-cyan font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                >
                  <span>DEEP DIVE INTO {activeSystem.name}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03: Section Navigation Links */}
      <section className="relative py-20 text-center px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
            NEXT DESTINATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text">
            EXPLORE THE VENTURE FACTORY & RESEARCH LABS
          </h2>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <PageTransitionLink
              href="/ventures"
              cursor="explore"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all"
            >
              <span>EXPLORE VENTURES</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
            <PageTransitionLink
              href="/labs"
              cursor="link"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:border-electric-cyan/40 bg-[#020b18]/60 text-secondary-text hover:text-electric-cyan font-mono text-xs tracking-widest transition-all"
            >
              <span>EXPLORE LABS</span>
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
