'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Compass, Shield, Users, Award, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FRONTIER_CHAPTERS = [
  {
    num: '01',
    phase: 'ESTABLISHMENT',
    title: 'FIND THE EXCEPTIONAL.',
    statement: 'WE DO NOT SEARCH FOR CREDENTIALS. WE SEARCH FOR OBSESSION.',
    description:
      'The frontier requires minds capable of questioning foundational assumptions. Theoretical physicists, extreme-environment engineers, precision roboticists, and sovereign system architects who operate beyond academic consensus.',
    location: 'ATLANTIC SHORELINE RESEARCH PRECINCT',
    metrics: { label: 'ADMISSION ACCEPTANCE', value: '< 0.4%' },
    image: '/images/arass_frontier_atrium.jpg',
  },
  {
    num: '02',
    phase: 'CONVERGENCE',
    title: 'BRING MINDS TOGETHER.',
    statement: 'COLLAPSING THE DISTANCE BETWEEN EXPERIMENT AND FABRICATION.',
    description:
      'We house experimental science, automated pilot foundries, and permanent capital within a unified physical sanctuary. No departmental silos. No multi-year bureaucratic grant applications. Only direct first-principles execution.',
    location: 'INTEGRATED PROTOTYPING ATRIUM',
    metrics: { label: 'EXPERIMENT CYCLE TIME', value: '72 HOURS' },
    image: '/images/arass_frontier_build_lab.jpg',
  },
  {
    num: '03',
    phase: 'REALIZATION',
    title: 'TURN POSSIBILITY INTO REALITY.',
    statement: 'SYNTHESIZING THE CRITICAL TECHNOLOGIES FOR CENTURY-SCALE RESILIENCE.',
    description:
      'Every project must target a fundamental civilizational bottleneck: 100x energy density, sub-angstrom structural alloys, closed-loop biosphere regulation, or planetary-scale compute fabrics.',
    location: 'CLASS-10 SYNTHESIS CLEANROOM',
    metrics: { label: 'PHYSICAL TRL ELEVATION', value: 'TRL 1 → 8' },
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
  },
  {
    num: '04',
    phase: 'SOVEREIGNTY',
    title: 'ENTER THE SYSTEM.',
    statement: 'AUTONOMOUS PERMANENT CAPITAL AND INDUSTRIAL SCALE.',
    description:
      'When hypotheses are physically verified, ARASS guarantees permanent capitalization, legal sovereignty, and rapid industrial scale without premature public market vulnerability.',
    location: 'DIRECTIVE HEADQUARTERS PRECINCT',
    metrics: { label: 'CAPITAL SOVEREIGNTY', value: 'PERMANENT' },
    image: '/images/arass_directive_monolith_hq.jpg',
  },
];

export default function FrontierPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic Hero Parallax Push
      gsap.to(heroImageRef.current, {
        scale: 1.25,
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Staggered reveals for each architectural progression
      const sections = document.querySelectorAll('.frontier-scene');
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival — Cinematic Atrium & Ocean Mist */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12"
      >
        <div ref={heroImageRef} className="absolute inset-0 z-0">
          <Image
            src="/images/arass_frontier_atrium.jpg"
            alt="ARASS Frontier Research Sanctuary"
            fill
            priority
            className="object-cover brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        <TechnicalOverlay
          sectionCode="FRN-05"
          stageName="THE FRONTIER SANCTUARY"
          coordinates="46.5197° N, 6.6323° E"
          classification="HUMAN ARCHETYPES // PERMANENT FELLOWSHIP"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 05 // THE FRONTIER
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-primary-text">
            WHO BUILDS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              THE FUTURE?
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Entering the physical research sanctuaries where exceptional minds converge with permanent
            capital to engineer century-scale physical systems.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO ENTER ARCHITECTURAL PRECINCTS</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Architectural Walkthrough Through Institutional Precincts */}
      <section className="relative py-28 md:py-40 px-6 sm:px-12 max-w-7xl mx-auto space-y-36">
        {FRONTIER_CHAPTERS.map((chapter) => (
          <div
            key={chapter.num}
            className="frontier-scene grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-t border-white/10 pt-16"
          >
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-black text-electric-cyan">
                  {chapter.num}
                </span>
                <span className="text-[10px] font-mono tracking-[0.3em] text-secondary-text/70 uppercase">
                  / {chapter.phase}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading font-black text-primary-text leading-tight">
                {chapter.title}
              </h2>

              <p className="text-sm font-mono text-electric-cyan/90 leading-snug">
                {chapter.statement}
              </p>

              <p className="text-sm sm:text-base font-sans text-secondary-text leading-relaxed font-light">
                {chapter.description}
              </p>

              <div className="p-4 rounded-xl bg-[#020b18]/90 border border-electric-cyan/30 flex items-center justify-between backdrop-blur-md">
                <div>
                  <div className="text-[8px] font-mono text-secondary-text/60 uppercase">
                    {chapter.metrics.label}
                  </div>
                  <div className="text-lg font-mono font-bold text-electric-cyan">
                    {chapter.metrics.value}
                  </div>
                </div>
                <div className="text-[9px] font-mono text-secondary-text/80 text-right uppercase">
                  {chapter.location}
                </div>
              </div>
            </div>

            {/* Right Full-Bleed Architectural Visual Plate */}
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-electric-cyan/30 bg-[#020b18] group shadow-[0_0_60px_rgba(0,0,0,0.8)]">
              <Image
                src={chapter.image}
                alt={chapter.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-108 brightness-70 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 right-4 text-[9px] font-mono text-electric-cyan tracking-widest uppercase bg-[#020b18]/80 border border-electric-cyan/30 px-3 py-1 rounded backdrop-blur-md">
                FACILITY ARCHIVE // 0x{chapter.num}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 03: Final Open Call Climax & Transition to Directive */}
      <section className="relative py-32 md:py-48 text-center px-6 border-t border-white/10 bg-[#020b18]/60 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            INSTITUTIONAL ADMISSION
          </span>
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-primary-text leading-tight">
            TURN POSSIBILITY INTO REALITY.
          </h2>
          <p className="text-secondary-text max-w-xl mx-auto text-sm md:text-base font-sans font-light">
            Whether you are a foundational researcher, extreme-environment engineer, or sovereign
            capital allocator — ARASS offers permanent institutional backing.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <PageTransitionLink
              href="/contact"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all duration-300 hover:scale-105"
            >
              <span>BUILD WITH ARASS ↗</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
