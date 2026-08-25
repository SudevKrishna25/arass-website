'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MISSION_PILLARS = [
  {
    num: '01',
    title: 'WHY ARASS EXISTS',
    statement: 'CIVILIZATION IS SINKING INTO SHORT-HORIZON OPTIMIZATION.',
    description:
      'Global capital has largely abandoned long-duration physical science in favor of rapid software arbitrage. We exist to restore multi-decade deep technological ambition — creating the critical hardware, energy, and computational foundations required for the next century.',
    metrics: { label: 'RESEARCH TIME HORIZON', value: '25-50 YRS' },
    image: '/images/arass_mission_infrastructure.jpg',
  },
  {
    num: '02',
    title: 'THE PROBLEM',
    statement: 'THE EASY BREAKTHROUGHS HAVE ALL BEEN HARVESTED.',
    description:
      'Every major remaining human challenge — clean continuous energy, atomic-precision manufacturing, genetic repair, and planetary transport — requires uncompromising physical engineering. These problems cannot be solved with apps or financial engineering.',
    metrics: { label: 'PHYSICAL ENGINEERING FOCUS', value: '100%' },
    image: '/images/arass_discovery_lab.jpg',
  },
  {
    num: '03',
    title: 'THE IMPERATIVE',
    statement: 'TECHNOLOGICAL SOVEREIGNTY MUST BE RECLAIMED.',
    description:
      'We operate beyond venture market cycles, quarterly shareholder pressure, and speculative hype. We build enduring technological sovereignty by combining permanent capital with world-class scientific freedom.',
    metrics: { label: 'CAPITAL CONTINUITY', value: 'PERMANENT' },
    image: '/images/arass_directive_monolith_hq.jpg',
  },
  {
    num: '04',
    title: 'THE INSTITUTION',
    statement: 'A LIVING MATRIX OF SCIENCE, TALENT, AND FACTORIES.',
    description:
      'ARASS is not an incubator or an investment fund. It is an operating technology institution that invents, prototypes, tests, and scales entire technological ecosystems from the atomic level upwards.',
    metrics: { label: 'INTEGRATED DIVISIONS', value: '6 DIRECT' },
    image: '/images/arass_frontier_build_lab.jpg',
  },
  {
    num: '05',
    title: 'THE COMMITMENT',
    statement: 'WE BUILD WHAT THE FUTURE REQUIRES.',
    description:
      'We hold an absolute standard of technical excellence, unwavering scientific rigor, and planetary stewardship. When history asks what we built during this pivotal century, our work will stand as the answer.',
    metrics: { label: 'INSTITUTIONAL FIDELITY', value: 'ABSOLUTE' },
    image: '/images/arass_horizon_planetary_orbit.jpg',
  },
];

export default function MissionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic Hero Parallax & Zoom Push
      gsap.to(heroImageRef.current, {
        scale: 1.22,
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Hero Title Masked Entrance
      gsap.fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      // Parallax Stagger on Pillars
      const pillarCards = timelineRef.current?.querySelectorAll('.mission-pillar-row');
      if (pillarCards) {
        pillarCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, filter: 'blur(6px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Full-Screen Cinematic Opening Stage */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12"
      >
        {/* Background Parallax Cinematic Image */}
        <div ref={heroImageRef} className="absolute inset-0 z-0">
          <Image
            src="/images/arass_mission_infrastructure.jpg"
            alt="ARASS Scientific Infrastructure"
            fill
            priority
            className="object-cover brightness-50 contrast-130"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        {/* Technical Reticle Telemetry Overlay */}
        <TechnicalOverlay
          sectionCode="ACT-01"
          stageName="THE ARASS MISSION"
          coordinates="46.2044° N, 6.1432° E"
          classification="FOUNDATIONAL DIRECTIVE // 2026-2076"
        />

        {/* Hero Split-Line Choreographed Typography */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 01 // THE MANDATE
          </div>

          <h1
            ref={heroTitleRef}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-primary-text"
          >
            THE FUTURE <br />
            <span className="text-white font-bold tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
              IS NOT A MARKET.
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              IT IS A RESPONSIBILITY.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            We are building an enduring technological institution to discover, engineer, and scale
            the physical breakthroughs civilization requires.
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
            <span className="text-secondary-text/70">SCROLL TO TRAVERSE NARRATIVE</span>
            <span className="text-electric-cyan animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Editorial Narrative Progression with Dynamic Photo Plates */}
      <section ref={timelineRef} className="relative py-24 md:py-36 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-24 md:space-y-36">
          {MISSION_PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="mission-pillar-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-t border-white/10 pt-12 sm:pt-16"
            >
              {/* Left Column: Number & Pillar Title */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-4xl font-mono font-black text-electric-cyan">
                    {pillar.num}
                  </span>
                  <span className="text-xs font-mono tracking-[0.3em] text-secondary-text/80 uppercase">
                    / {pillar.title}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-primary-text leading-snug">
                  {pillar.statement}
                </h2>

                <p className="text-xs sm:text-sm md:text-base font-sans text-secondary-text leading-relaxed font-light">
                  {pillar.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#020b18]/90 border border-electric-cyan/30 inline-block backdrop-blur-md">
                  <div className="text-[9px] font-mono tracking-widest text-secondary-text/70 uppercase mb-1">
                    {pillar.metrics.label}
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-electric-cyan">
                    {pillar.metrics.value}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Photographic Plate */}
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-electric-cyan/20 bg-[#020b18] group shadow-[0_0_60px_rgba(0,0,0,0.7)]">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-75 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-[9px] font-mono text-electric-cyan tracking-widest uppercase bg-[#020b18]/80 border border-electric-cyan/30 px-3 py-1 rounded backdrop-blur-md">
                  ARCHIVE PLATE // 0x{pillar.num}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03: Final Authoritative Statement & Route Transition */}
      <section className="relative py-24 md:py-36 text-center px-6 border-t border-white/10 overflow-hidden bg-[#020b18]/60">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            THE ARASS DECLARATION
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-primary-text leading-tight">
            WE BUILD WHAT THE FUTURE REQUIRES.
          </h2>
          <p className="text-secondary-text max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans font-light">
            Explore how our continuous experimental discovery engine turns foundational physics into
            deployed systems.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <PageTransitionLink
              href="/discovery"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all duration-300 hover:scale-105"
            >
              <span>ENTER THE DISCOVERY ENGINE</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
