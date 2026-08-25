'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Globe, Orbit, ShieldCheck, Sun, Layers } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HORIZON_DOMAINS = [
  {
    num: '01',
    name: 'EARTH // CLOSED-LOOP PLANETARY DYNAMICS',
    statement: 'ATMOSPHERIC AND OCEANIC BIOCHEMICAL EQUILIBRIUM.',
    description:
      'Continuous computational simulation of earth-scale climate dynamics, geo-cooling technologies, and high-volume carbon crystallization directly into structural basalt.',
    metrics: { label: 'PLANETARY BOUNDARIES', value: '09 MONITORED' },
    image: '/images/arass_horizon_planetary_orbit.jpg',
  },
  {
    num: '02',
    name: 'ENERGY // COMPACT CONTINUOUS FUSION',
    statement: 'ENDLESS, BASELOAD, ZERO-CARBON ENERGY INDEPENDENCE.',
    description:
      'High-field magnetic confinement fusion reactors utilizing high-temperature superconductors (HTS) to unlock gigawatt-scale, decentralizable power generation across the globe.',
    metrics: { label: 'POWER DENSITY', value: '100 MW / M³' },
    image: '/images/arass_insights_fusion.jpg',
  },
  {
    num: '03',
    name: 'MATTER // ATOMIC-SCALE STRUCTURAL SYNTHESIS',
    statement: 'BEYOND MINING: ENGINEERED MOLECULAR SUBSTRATES.',
    description:
      'Diamondoid nanofabrication and room-temperature superconductors engineered atom-by-atom to replace fragile extraction-based supply chains with deterministic molecular synthesis.',
    metrics: { label: 'TENSILE STRENGTH', value: '120 GPa' },
    image: '/images/arass_venture_materials.jpg',
  },
  {
    num: '04',
    name: 'CIVILIZATION // PERMANENT OFF-WORLD INFRASTRUCTURE',
    statement: 'EXPANDING HUMAN INDUSTRIAL CAPACITY BEYOND EARTH.',
    description:
      'Autonomous orbital propellant depots, lunar mass drivers, and radiation-shielded deep-space research habitats to secure humanity’s long-term survival.',
    metrics: { label: 'ORBITAL TIME HORIZON', value: '2030-2080' },
    image: '/images/arass_hero_earth.jpg',
  },
];

export default function HorizonPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Slow orbital zoom & drift
      gsap.to(heroImageRef.current, {
        scale: 1.25,
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Horizon cards reveal
      const cards = document.querySelectorAll('.horizon-domain-row');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival — Slow Orbital Movement */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12"
      >
        <div ref={heroImageRef} className="absolute inset-0 z-0">
          <Image
            src="/images/arass_horizon_planetary_orbit.jpg"
            alt="ARASS Planetary Scale Horizon"
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
          sectionCode="HRZ-06"
          stageName="PLANETARY HORIZON"
          coordinates="0.0000° N, 0.0000° E // 400 KM LEO"
          classification="CENTURY HORIZON // 2026-2100"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 06 // PLANETARY SCALE
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-primary-text">
            THE PLANETARY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              HORIZON
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Engineering the physical infrastructure required to sustain multi-century human civilizational
            vitality across Earth and deep space.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO EXPAND PLANETARY FRONTIERS</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Planetary Frontier Chapters */}
      <section className="relative py-28 md:py-40 px-6 sm:px-12 max-w-7xl mx-auto space-y-36">
        {HORIZON_DOMAINS.map((domain) => (
          <div
            key={domain.num}
            className="horizon-domain-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center border-t border-white/10 pt-16"
          >
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-mono font-black text-electric-cyan">
                  {domain.num}
                </span>
                <span className="text-[10px] font-mono tracking-[0.3em] text-secondary-text/70 uppercase">
                  / PLANETARY DOMAIN
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary-text leading-tight">
                {domain.name}
              </h2>

              <p className="text-sm font-mono text-electric-cyan/90 leading-snug">
                {domain.statement}
              </p>

              <p className="text-sm sm:text-base font-sans text-secondary-text leading-relaxed font-light">
                {domain.description}
              </p>

              <div className="p-4 rounded-xl bg-[#020b18]/90 border border-electric-cyan/30 inline-block backdrop-blur-md">
                <div className="text-[8px] font-mono text-secondary-text/60 uppercase mb-1">
                  {domain.metrics.label}
                </div>
                <div className="text-lg font-mono font-bold text-electric-cyan">
                  {domain.metrics.value}
                </div>
              </div>
            </div>

            {/* Right Photographic Visual Plate */}
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden border border-electric-cyan/30 bg-[#020b18] group shadow-[0_0_60px_rgba(0,0,0,0.8)]">
              <Image
                src={domain.image}
                alt={domain.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-108 brightness-70 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-electric-cyan tracking-widest uppercase bg-[#020b18]/80 border border-electric-cyan/30 px-3 py-1 rounded backdrop-blur-md">
                PLANETARY TELEMETRY // 0x{domain.num}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 03: Final Transition to Directive */}
      <section className="relative py-32 md:py-48 text-center px-6 border-t border-white/10 bg-[#020b18]/60 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            SOVEREIGN GOVERNANCE
          </span>
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-primary-text leading-tight">
            DISCIPLINE. SOVEREIGNTY. IMPACT.
          </h2>
          <p className="text-secondary-text max-w-xl mx-auto text-sm md:text-base font-sans font-light">
            Read the institutional directive guiding ARASS across multi-decade research cycles.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <PageTransitionLink
              href="/directive"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all duration-300 hover:scale-105"
            >
              <span>ENTER THE DIRECTIVE</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
