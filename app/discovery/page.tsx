'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { TechnicalDiagram } from '@/components/cinematic/TechnicalDiagram';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Cpu, Layers, Sparkles, Binary, CheckCircle2, Rocket } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DISCOVERY_STAGES = [
  {
    num: '01',
    name: 'OBSERVE',
    code: 'OBS-01',
    icon: Sparkles,
    subtitle: 'High-Precision Empirical Phenomenon Detection',
    focus: 'Quantum fluctuations, anomalous thermal conductivity, sub-atomic crystal defects.',
    description:
      'Observation begins with continuous telemetry from sub-angstrom electron microscopes, cryogenic sensor arrays, and multi-spectral astrophysics observatories. We isolate physical anomalies before they are documented in standard literature.',
    specs: ['Sub-angstrom aberration correction', '10^-12 Torr cryo-vacuum measurement', 'Continuous multi-spectral data stream'],
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
  },
  {
    num: '02',
    name: 'QUESTION',
    code: 'QST-02',
    icon: Binary,
    subtitle: 'First-Principles Thermodynamic Deconstruction',
    focus: 'Fundamental physical boundaries vs. legacy engineering constraints.',
    description:
      'We strip away historical conventions and reduce problems to basic thermodynamic laws. If a constraint does not violate general relativity or quantum mechanics, it is treated as an engineering variable waiting to be solved.',
    specs: ['First-principles thermodynamic modeling', 'Computational boundary verification', 'Theoretical limit sensitivity sweeps'],
    image: '/images/arass_discovery_lab.jpg',
  },
  {
    num: '03',
    name: 'RESEARCH',
    code: 'RSC-03',
    icon: Cpu,
    subtitle: 'Simulation & Photonic Computational Modeling',
    focus: 'Ab-initio molecular dynamics, lattice Boltzmann simulations, Monte Carlo plasma transport.',
    description:
      'Millions of synthetic candidate structures and magnet topologies are evaluated per hour across our optical and high-density compute clusters, compressing decades of wet-lab trial into days of high-fidelity simulation.',
    specs: ['100 PFlops optical tensor simulation', 'Sub-picosecond atomic trajectory resolution', 'Autonomous hypothesis generation agents'],
    image: '/images/arass_mission_infrastructure.jpg',
  },
  {
    num: '04',
    name: 'SYNTHESIZE',
    code: 'SYN-04',
    icon: Layers,
    subtitle: 'Atomic & Molecular Material Realization',
    focus: 'Molecular beam epitaxy, plasma CVD, chemical vapor deposition of diamondoid wafers.',
    description:
      'The transition from computational theory to physical reality occurs in our class-10 cleanrooms. Automated beam steerers and precision robotic handlers grow crystalline structures atom-by-atom under ultra-pure conditions.',
    specs: ['Class-10 laminar flow cleanrooms', 'Automated robotic specimen transport', 'In-situ scanning acoustic microscopy'],
    image: '/images/arass_venture_materials.jpg',
  },
  {
    num: '05',
    name: 'VALIDATE',
    code: 'VAL-05',
    icon: CheckCircle2,
    subtitle: 'Extreme Thermal, Mechanical, and Radiation Stress',
    focus: 'Hyper-velocity impact guns, 3,800°C plasma torches, gamma irradiation chambers.',
    description:
      'Every synthesized specimen undergoes brutal environmental torture testing. Materials and systems are subjected to pressures exceeding the Mariana Trench and temperatures surpassing rocket exhaust nozzles.',
    specs: ['3,800°C continuous plasma torch arc', '150 GPa diamond anvil loading', 'Cryogenic liquid helium soak (< 4K)'],
    image: '/images/arass_insights_fusion.jpg',
  },
  {
    num: '06',
    name: 'DEPLOY',
    code: 'DPL-06',
    icon: Rocket,
    subtitle: 'Industrial Commercialization & Century-Scale Scaling',
    focus: 'Autonomous fabrication foundries, orbital payloads, sovereign industrial integration.',
    description:
      'Validated breakthroughs are spun out into dedicated ARASS ventures with autonomous capital, manufacturing hangars, and elite engineering teams to scale planetary impact immediately.',
    specs: ['Dedicated spin-out venture capitalization', 'Direct orbital payload integration', 'Zero-compromise IP defense'],
    image: '/images/arass_horizon_planetary_orbit.jpg',
  },
];

export default function DiscoveryPage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!horizontalSectionRef.current || !horizontalTrackRef.current) return;

    const track = horizontalTrackRef.current;
    const section = horizontalSectionRef.current;

    const ctx = gsap.context(() => {
      const scrollLength = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollLength + 400}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_discovery_quantum_cleanroom.jpg"
            alt="ARASS Quantum Discovery Cleanroom"
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
          sectionCode="ENG-02"
          stageName="EXPERIMENTAL TIMELINE"
          coordinates="47.3769° N, 8.5417° E"
          classification="SCIENTIFIC ENGINE // CONTINUOUS TRL 1-9"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 02 // THE ENGINE
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-primary-text">
            THE DISCOVERY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              ENGINE
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            A continuous, non-linear pipeline bridging foundational theoretical physics with
            industrial-scale physical deployment.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO ENTER HORIZONTAL RESEARCH TIMELINE</span>
            <span className="animate-bounce">→</span>
          </div>
        </div>
      </section>

      {/* 02: Pinned Horizontal Research Timeline (6 Stages) */}
      <section
        ref={horizontalSectionRef}
        data-cursor="drag"
        className="relative w-full h-screen overflow-hidden bg-[#020b18] border-y border-white/10"
      >
        {/* Progress Header */}
        <div className="absolute top-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
            <span>EXPERIMENTAL HORIZONTAL SEQUENCE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
          </div>
          <div className="text-xs font-mono text-secondary-text">
            TIMELINE COMPLETION: <span className="text-electric-cyan font-bold">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* Track */}
        <div
          ref={horizontalTrackRef}
          className="flex h-full items-center px-8 md:px-20 gap-12 md:gap-20 w-max will-change-transform"
        >
          {DISCOVERY_STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.num}
                className="w-[85vw] max-w-3xl shrink-0 rounded-2xl overflow-hidden bg-[#020914] border border-electric-cyan/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual */}
                <div className="md:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src={stage.image}
                    alt={stage.name}
                    fill
                    className="object-cover brightness-75 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-[#020b18]/80 border border-electric-cyan/40 text-[9px] font-mono text-electric-cyan tracking-widest uppercase backdrop-blur-md">
                    <Icon className="w-3 h-3" />
                    <span>{stage.code}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-6 space-y-4">
                  <div className="flex items-center gap-3 text-electric-cyan font-mono text-xs tracking-widest uppercase">
                    <span>STAGE {stage.num}</span>
                    <span className="w-6 h-[1px] bg-electric-cyan/40" />
                    <span>{stage.name}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-black text-primary-text leading-tight">
                    {stage.subtitle}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-secondary-text leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    <span className="text-[8px] font-mono tracking-widest text-secondary-text/50 uppercase block">
                      METROLOGY PROTOCOLS
                    </span>
                    {stage.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-primary-text/80">
                        <span className="w-1 h-1 rounded-full bg-electric-cyan" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 03: Technical SVG Schematic Blueprint */}
      <section className="relative py-24 px-6 border-t border-white/10 bg-[#020b18]/50">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-8">
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            VECTOR SCHEMATIC FLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-primary-text">
            Continuous Closed-Loop Synthesis Matrix
          </h2>
          <p className="text-xs sm:text-sm font-sans text-secondary-text max-w-lg mx-auto">
            Scroll-interpolated vector drawing showing how physical hypotheses transit through computational and physical verification stages.
          </p>
        </div>

        <TechnicalDiagram />
      </section>

      {/* 04: Next Chapter Action */}
      <section className="relative py-28 text-center px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
            CONTINUE ARCHIVAL EXPLORATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text">
            EXPLORE THE SIX OPERATING SYSTEMS
          </h2>
          <div className="pt-4 flex justify-center gap-4">
            <PageTransitionLink
              href="/ecosystem"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all duration-300 hover:scale-105"
            >
              <span>ENTER THE ECOSYSTEM</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
