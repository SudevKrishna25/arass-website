'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { ArassOpeningExperience } from '@/components/cinematic/ArassOpeningExperience';
import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITY_WORLDS = [
  {
    code: '01',
    title: 'AI SYSTEMS',
    statement: 'INTELLIGENT DECISION SYSTEMS FOR REAL-TIME WORKFLOWS.',
    description:
      'Architectures engineered to integrate multimodal perception, deterministic reasoning, and enterprise-grade models directly into production environments.',
    href: '/services',
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
  },
  {
    code: '02',
    title: 'DIGITAL PRODUCTS',
    statement: 'HIGH-PERFORMANCE PLATFORMS BUILT FOR DEMANDING OPERATIONS.',
    description:
      'Fault-tolerant web applications, operational cloud consoles, and distributed data systems built with uncompromising engineering discipline.',
    href: '/work',
    image: '/images/arass_frontier_build_lab.jpg',
  },
  {
    code: '03',
    title: 'AUTOMATION',
    statement: 'MULTI-AGENT ORCHESTRATION & OPERATIONAL PIPELINES.',
    description:
      'Coordinated agent workflows, automated data ingestion pipelines, and systems integration designed to eliminate friction in complex organizations.',
    href: '/services',
    image: '/images/arass_mission_infrastructure.jpg',
  },
  {
    code: '04',
    title: 'DIGITAL EXPERIENCES',
    statement: 'SENSORY DIGITAL FLAGSHIP ECOSYSTEMS.',
    description:
      'Distinctive digital flagship platforms, spatial design systems, and responsive web experiences crafted with refined typographic and visual restraint.',
    href: '/services',
    image: '/images/arass_frontier_atrium.jpg',
  },
];

const FLAGSHIP_BUILDS = [
  {
    type: 'FLAGSHIP BUILD',
    code: '01',
    name: 'SYNAPSE NEURAL ENGINE',
    thesis: 'Autonomous decision architecture and real-time inference pipeline.',
    href: '/work',
  },
  {
    type: 'INTERNAL PLATFORM',
    code: '02',
    name: 'KINETIC FINANCIAL CLOUD',
    thesis: 'High-throughput operational ledger with zero-downtime consensus.',
    href: '/work',
  },
  {
    type: 'CONCEPT EXPERIMENT',
    code: '03',
    name: 'AETHER SENSORY ECOSYSTEM',
    thesis: 'Spatial digital brand experience with GPU-accelerated 2D choreography.',
    href: '/work',
  },
];

const DIRECTORY_ITEMS = [
  { name: 'WORK', href: '/work' },
  { name: 'SOLUTIONS', href: '/services' },
  { name: 'PRODUCTS', href: '/work' },
  { name: 'LAB', href: '/labs' },
  { name: 'COMPANY', href: '/about' },
  { name: 'INSIGHTS', href: '/insights' },
];

export function HomeCinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('arass_intro_seen') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageRef.current,
        pinSpacing: false,
        scrub: 0.7,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToFirstWorld = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight * 1.4,
        behavior: 'smooth',
      });
    }
  };

  // =========================================================================
  // CAMERA MEDIA PLATES (DYNAMIC 2.5D ZOOM, DRIFT & DISSOLVE)
  // =========================================================================
  // Plate 1: Global Planetary Earth (Hero & Statement, 0.00 -> 0.28)
  const plate1Scale = 1.0 + progress * 0.4;
  const plate1Y = -progress * 50;
  const plate1Opacity = progress < 0.24 ? 1 : Math.max(0, 1 - (progress - 0.24) / 0.07);

  // Plate 2: Quantum Cleanroom (AI Systems, 0.22 -> 0.44)
  const plate2Opacity =
    progress < 0.22
      ? 0
      : progress < 0.28
      ? (progress - 0.22) / 0.06
      : progress < 0.40
      ? 1
      : Math.max(0, 1 - (progress - 0.40) / 0.06);
  const plate2Scale = 1.15 - Math.max(0, progress - 0.22) * 0.16;
  const plate2Y = (progress - 0.31) * 35;

  // Plate 3: Frontier Build Lab (Digital Products, 0.38 -> 0.58)
  const plate3Opacity =
    progress < 0.38
      ? 0
      : progress < 0.44
      ? (progress - 0.38) / 0.06
      : progress < 0.54
      ? 1
      : Math.max(0, 1 - (progress - 0.54) / 0.06);
  const plate3Scale = 1.12 - Math.max(0, progress - 0.38) * 0.14;
  const plate3Y = (progress - 0.46) * 35;

  // Plate 4: Mission Infrastructure (Automation, 0.52 -> 0.72)
  const plate4Opacity =
    progress < 0.52
      ? 0
      : progress < 0.58
      ? (progress - 0.52) / 0.06
      : progress < 0.68
      ? 1
      : Math.max(0, 1 - (progress - 0.68) / 0.06);
  const plate4Scale = 1.15 - Math.max(0, progress - 0.52) * 0.16;
  const plate4Y = (progress - 0.60) * 35;

  // Plate 5: Sensory Atrium (Digital Experiences, 0.66 -> 0.84)
  const plate5Opacity =
    progress < 0.66
      ? 0
      : progress < 0.72
      ? (progress - 0.66) / 0.06
      : progress < 0.80
      ? 1
      : Math.max(0, 1 - (progress - 0.80) / 0.06);
  const plate5Scale = 1.12 - Math.max(0, progress - 0.66) * 0.14;
  const plate5Y = (progress - 0.74) * 35;

  // Plate 6: Institutional Monolith (Work Reel & Conclusion, 0.78 -> 1.00)
  const plate6Opacity = progress < 0.78 ? 0 : Math.min(1, (progress - 0.78) / 0.06);
  const plate6Scale = 1.08 - Math.max(0, progress - 0.78) * 0.08;

  // =========================================================================
  // SCENE TYPOGRAPHY & TRANSITION CHOREOGRAPHY
  // =========================================================================
  // Scene 1: Hero Tagline (0.00 -> 0.16)
  const scene1Opacity = progress < 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) / 0.05);
  const scene1Y = -Math.max(0, progress - 0.03) * 80;
  const scene1DontFollowX = -Math.max(0, progress - 0.02) * 70;
  const scene1FutureScale = 1.0 - Math.max(0, progress - 0.02) * 0.18;
  const scene1FutureBlur = Math.max(0, progress - 0.04) * 12;
  const scene1BuildItX = Math.max(0, progress - 0.02) * 70;

  // Scene 2: Statement (0.15 -> 0.28)
  const scene2Opacity =
    progress < 0.15
      ? 0
      : progress < 0.19
      ? (progress - 0.15) / 0.04
      : progress < 0.25
      ? 1
      : Math.max(0, 1 - (progress - 0.25) / 0.04);
  const scene2Y =
    progress < 0.19
      ? 45 * (1 - (progress - 0.15) / 0.04)
      : progress > 0.25
      ? -45 * ((progress - 0.25) / 0.04)
      : 0;
  const scene2Scale = progress < 0.19 ? 0.95 + (progress - 0.15) * 1.25 : 1.0;

  // Scene 3: Capability 01 - AI Systems (0.27 -> 0.41)
  const scene3Opacity =
    progress < 0.27
      ? 0
      : progress < 0.31
      ? (progress - 0.27) / 0.04
      : progress < 0.38
      ? 1
      : Math.max(0, 1 - (progress - 0.38) / 0.04);
  const scene3Y =
    progress < 0.31
      ? 45 * (1 - (progress - 0.27) / 0.04)
      : progress > 0.38
      ? -45 * ((progress - 0.38) / 0.04)
      : 0;
  const scene3Scale = progress < 0.31 ? 0.95 + (progress - 0.27) * 1.25 : 1.0;

  // Scene 4: Capability 02 - Digital Products (0.40 -> 0.55)
  const scene4Opacity =
    progress < 0.40
      ? 0
      : progress < 0.44
      ? (progress - 0.40) / 0.04
      : progress < 0.51
      ? 1
      : Math.max(0, 1 - (progress - 0.51) / 0.04);
  const scene4Y =
    progress < 0.44
      ? 45 * (1 - (progress - 0.40) / 0.04)
      : progress > 0.51
      ? -45 * ((progress - 0.51) / 0.04)
      : 0;
  const scene4Scale = progress < 0.44 ? 0.95 + (progress - 0.40) * 1.25 : 1.0;

  // Scene 5: Capability 03 - Automation (0.53 -> 0.69)
  const scene5Opacity =
    progress < 0.53
      ? 0
      : progress < 0.57
      ? (progress - 0.53) / 0.04
      : progress < 0.65
      ? 1
      : Math.max(0, 1 - (progress - 0.65) / 0.04);
  const scene5Y =
    progress < 0.57
      ? 45 * (1 - (progress - 0.53) / 0.04)
      : progress > 0.65
      ? -45 * ((progress - 0.65) / 0.04)
      : 0;
  const scene5Scale = progress < 0.57 ? 0.95 + (progress - 0.53) * 1.25 : 1.0;

  // Scene 6: Capability 04 - Digital Experiences (0.67 -> 0.81)
  const scene6Opacity =
    progress < 0.67
      ? 0
      : progress < 0.71
      ? (progress - 0.67) / 0.04
      : progress < 0.77
      ? 1
      : Math.max(0, 1 - (progress - 0.77) / 0.04);
  const scene6Y =
    progress < 0.71
      ? 45 * (1 - (progress - 0.67) / 0.04)
      : progress > 0.77
      ? -45 * ((progress - 0.77) / 0.04)
      : 0;
  const scene6Scale = progress < 0.71 ? 0.95 + (progress - 0.67) * 1.25 : 1.0;

  // Scene 7: Work Film Reel & Lab (0.79 -> 0.91)
  const scene7Opacity =
    progress < 0.79
      ? 0
      : progress < 0.83
      ? (progress - 0.79) / 0.04
      : progress < 0.88
      ? 1
      : Math.max(0, 1 - (progress - 0.88) / 0.04);
  const scene7Y =
    progress < 0.83
      ? 45 * (1 - (progress - 0.79) / 0.04)
      : progress > 0.88
      ? -45 * ((progress - 0.88) / 0.04)
      : 0;

  // Scene 8: Final Conclusion & Footer (0.89 -> 1.00)
  const scene8Opacity = progress < 0.89 ? 0 : Math.min(1, (progress - 0.89) / 0.05);
  const scene8Y = progress < 0.89 ? 40 : Math.max(0, 40 * (1 - (progress - 0.89) / 0.05));

  return (
    <>
      {/* Signature ARASS Dynamic Opening Experience */}
      {!introFinished && <ArassOpeningExperience onComplete={() => setIntroFinished(true)} />}

      {/* Main 600vh Continuous Cinematic Timeline */}
      <div
        ref={containerRef}
        className="relative w-full h-[600vh] bg-[#01050d] text-primary-text select-none"
      >
        {/* Full-Screen Pinned Stage */}
        <div
          ref={stageRef}
          className="w-full h-screen relative overflow-hidden bg-[#01050d] flex items-center justify-center pointer-events-auto"
        >
          {/* ===================================================================
              BACKGROUND PHOTOGRAPHIC CAMERA PLATES (REAL VISUAL MEDIA)
              =================================================================== */}
          {/* Plate 1: Global Planetary Earth Orbit */}
          <div
            className="absolute inset-0 z-0 will-change-transform"
            style={{
              opacity: plate1Opacity,
              transform: `scale(${plate1Scale.toFixed(3)}) translateY(${plate1Y.toFixed(1)}px)`,
            }}
          >
            <Image
              src="/images/arass_horizon_planetary_orbit.jpg"
              alt="ARASS Planetary Atmosphere"
              fill
              priority
              className="object-cover brightness-40 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/70 via-transparent to-[#01050d]/70" />
          </div>

          {/* Plate 2: Quantum Cleanroom (AI Systems) */}
          <div
            className="absolute inset-0 z-1 will-change-transform"
            style={{
              opacity: plate2Opacity,
              transform: `scale(${plate2Scale.toFixed(3)}) translateY(${plate2Y.toFixed(1)}px)`,
            }}
          >
            <Image
              src="/images/arass_discovery_quantum_cleanroom.jpg"
              alt="ARASS Discovery Cleanroom"
              fill
              className="object-cover brightness-35 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/80 via-transparent to-[#01050d]/80" />
          </div>

          {/* Plate 3: Frontier Build Lab (Digital Products) */}
          <div
            className="absolute inset-0 z-2 will-change-transform"
            style={{
              opacity: plate3Opacity,
              transform: `scale(${plate3Scale.toFixed(3)}) translateY(${plate3Y.toFixed(1)}px)`,
            }}
          >
            <Image
              src="/images/arass_frontier_build_lab.jpg"
              alt="ARASS Frontier Build Lab"
              fill
              className="object-cover brightness-35 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/80 via-transparent to-[#01050d]/80" />
          </div>

          {/* Plate 4: Mission Infrastructure (Automation) */}
          <div
            className="absolute inset-0 z-3 will-change-transform"
            style={{
              opacity: plate4Opacity,
              transform: `scale(${plate4Scale.toFixed(3)}) translateY(${plate4Y.toFixed(1)}px)`,
            }}
          >
            <Image
              src="/images/arass_mission_infrastructure.jpg"
              alt="ARASS Mission Infrastructure"
              fill
              className="object-cover brightness-35 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/80 via-transparent to-[#01050d]/80" />
          </div>

          {/* Plate 5: Sensory Atrium (Digital Experiences) */}
          <div
            className="absolute inset-0 z-4 will-change-transform"
            style={{
              opacity: plate5Opacity,
              transform: `scale(${plate5Scale.toFixed(3)}) translateY(${plate5Y.toFixed(1)}px)`,
            }}
          >
            <Image
              src="/images/arass_frontier_atrium.jpg"
              alt="ARASS Sensory Atrium"
              fill
              className="object-cover brightness-35 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/80 via-transparent to-[#01050d]/80" />
          </div>

          {/* Plate 6: Institutional Monolith (Work Reel & Final Conclusion) */}
          <div
            className="absolute inset-0 z-5 will-change-transform"
            style={{
              opacity: plate6Opacity,
              transform: `scale(${plate6Scale.toFixed(3)})`,
            }}
          >
            <Image
              src="/images/arass_institutional_monolith.jpg"
              alt="ARASS Institutional Monolith"
              fill
              className="object-cover brightness-35 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/80 via-transparent to-[#01050d]/80" />
          </div>

          {/* Live Interactive 2D Atmosphere with Ambient Photon Light Aura & Connective Filaments */}
          <LiveCinematicAtmosphere scrollProgress={progress} />

          {/* ===================================================================
              SCENE 01: HERO WITH BALANCED ELEGANT TYPOGRAPHY (0.00 -> 0.16)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pt-12 sm:pt-0 text-center will-change-transform"
            style={{
              opacity: scene1Opacity,
              transform: `translateY(${scene1Y}px)`,
              pointerEvents: scene1Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center">
              {/* Exact Signature Tagline (Balanced & Spacious Editorial Hierarchy) */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-heading font-black tracking-[-0.03em] leading-[1.08] text-white select-none">
                <span
                  className="inline-block transition-transform duration-300 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                  style={{ transform: `translateX(${scene1DontFollowX}px)` }}
                >
                  WE DON&apos;T FOLLOW
                </span>
                <br />
                <span
                  className="inline-block text-white/90 transition-transform duration-300 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                  style={{
                    transform: `scale(${scene1FutureScale.toFixed(3)})`,
                    filter: `blur(${scene1FutureBlur.toFixed(1)}px)`,
                  }}
                >
                  THE FUTURE.
                </span>
                <br />
                <span
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.7)] transition-transform duration-300 animate-pulse"
                  style={{ transform: `translateX(${scene1BuildItX}px)` }}
                >
                  WE BUILD IT.
                </span>
              </h1>

              {/* Truthful Institutional Description with Generous Whitespace */}
              <p className="mt-5 mb-6 max-w-xl mx-auto text-xs sm:text-sm md:text-[15px] font-sans text-white/75 leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                ARASS is an independent technology company building AI systems, digital products, automation, and digital experiences for ambitious companies.
              </p>

              {/* Interactive CTAs with Micro-Glow Effects */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <PageTransitionLink
                  href="/contact"
                  cursor="explore"
                  className="group relative inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,212,255,0.5)] hover:shadow-[0_0_35px_rgba(0,212,255,0.85)]"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>

                <button
                  onClick={scrollToFirstWorld}
                  data-cursor="explore"
                  className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-electric-cyan/70 bg-[#020b18]/60 backdrop-blur-md text-white font-mono font-medium text-xs tracking-widest hover:text-electric-cyan transition-all duration-300 hover:bg-[#020b18]/80 shadow-[0_0_15px_rgba(0,0,0,0.4)]"
                >
                  <span>EXPLORE ARASS</span>
                  <ArrowDownRight className="w-4 h-4 text-electric-cyan transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </div>

              {/* Restrained 4-Part Capability Indicator Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 max-w-3xl w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] sm:text-xs font-mono tracking-wider text-white/55 uppercase">
                <div className="flex items-center justify-center gap-2 group cursor-default transition-colors hover:text-electric-cyan whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/70 group-hover:bg-electric-cyan group-hover:shadow-[0_0_8px_#00d4ff]" />
                  <span>AI SYSTEMS</span>
                </div>
                <div className="flex items-center justify-center gap-2 group cursor-default transition-colors hover:text-electric-cyan whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/70 group-hover:bg-electric-cyan group-hover:shadow-[0_0_8px_#00d4ff]" />
                  <span>DIGITAL PRODUCTS</span>
                </div>
                <div className="flex items-center justify-center gap-2 group cursor-default transition-colors hover:text-electric-cyan whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/70 group-hover:bg-electric-cyan group-hover:shadow-[0_0_8px_#00d4ff]" />
                  <span>AUTOMATION</span>
                </div>
                <div className="flex items-center justify-center gap-2 group cursor-default transition-colors hover:text-electric-cyan whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan/70 group-hover:bg-electric-cyan group-hover:shadow-[0_0_8px_#00d4ff]" />
                  <span>DIGITAL EXPERIENCES</span>
                </div>
              </div>

              {/* Scroll Prompt */}
              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono text-white/35 tracking-widest uppercase">
                <span>↓ SCROLL TO TRAVERSE THE FILM</span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 02: WHAT WE BUILD STATEMENT (0.15 -> 0.28)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{
              opacity: scene2Opacity,
              transform: `translateY(${scene2Y}px) scale(${scene2Scale.toFixed(3)})`,
              pointerEvents: scene2Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto space-y-5">
              <div className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                01 // CAPABILITIES
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                WE ENGINEER <br />
                SYSTEMS THAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.5)]">
                  MOVE BUSINESS FORWARD.
                </span>
              </h2>

              <p className="max-w-md mx-auto text-xs sm:text-sm font-mono text-white/50 tracking-widest uppercase">
                SCROLL TO ENTER OUR FOUR ENGINEERING DISCIPLINES ↓
              </p>
            </div>
          </div>

          {/* ===================================================================
              SCENE 03: CAPABILITY WORLD 1 — AI SYSTEMS (0.27 -> 0.41)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{
              opacity: scene3Opacity,
              transform: `translateY(${scene3Y}px) scale(${scene3Scale.toFixed(3)})`,
              pointerEvents: scene3Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto space-y-5">
              <div className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                01 // DISCIPLINE
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                AI SYSTEMS
              </h2>

              <p className="text-sm sm:text-base md:text-lg font-mono text-electric-cyan tracking-wide font-semibold">
                INTELLIGENT DECISION SYSTEMS FOR REAL-TIME WORKFLOWS.
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Architectures engineered to integrate multimodal perception, deterministic reasoning, and enterprise-grade models directly into production environments.
              </p>

              <div className="pt-3">
                <PageTransitionLink
                  href="/services"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span>EXPLORE AI SYSTEMS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 04: CAPABILITY WORLD 2 — DIGITAL PRODUCTS (0.40 -> 0.55)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{
              opacity: scene4Opacity,
              transform: `translateY(${scene4Y}px) scale(${scene4Scale.toFixed(3)})`,
              pointerEvents: scene4Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto space-y-5">
              <div className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                02 // DISCIPLINE
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                DIGITAL PRODUCTS
              </h2>

              <p className="text-sm sm:text-base md:text-lg font-mono text-electric-cyan tracking-wide font-semibold">
                HIGH-PERFORMANCE PLATFORMS BUILT FOR DEMANDING OPERATIONS.
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Fault-tolerant web applications, operational cloud consoles, and distributed data systems built with uncompromising engineering discipline.
              </p>

              <div className="pt-3">
                <PageTransitionLink
                  href="/work"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span>VIEW PLATFORMS & WORK</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 05: CAPABILITY WORLD 3 — AUTOMATION (0.53 -> 0.69)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{
              opacity: scene5Opacity,
              transform: `translateY(${scene5Y}px) scale(${scene5Scale.toFixed(3)})`,
              pointerEvents: scene5Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto space-y-5">
              <div className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                03 // DISCIPLINE
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                AUTOMATION
              </h2>

              <p className="text-sm sm:text-base md:text-lg font-mono text-electric-cyan tracking-wide font-semibold">
                MULTI-AGENT ORCHESTRATION & OPERATIONAL PIPELINES.
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Coordinated agent workflows, automated data ingestion pipelines, and systems integration designed to eliminate friction in complex organizations.
              </p>

              <div className="pt-3">
                <PageTransitionLink
                  href="/services"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span>VIEW AUTOMATION</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 06: CAPABILITY WORLD 4 — DIGITAL EXPERIENCES (0.67 -> 0.81)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{
              opacity: scene6Opacity,
              transform: `translateY(${scene6Y}px) scale(${scene6Scale.toFixed(3)})`,
              pointerEvents: scene6Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto space-y-5">
              <div className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                04 // DISCIPLINE
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                DIGITAL EXPERIENCES
              </h2>

              <p className="text-sm sm:text-base md:text-lg font-mono text-electric-cyan tracking-wide font-semibold">
                SENSORY DIGITAL FLAGSHIP ECOSYSTEMS.
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Distinctive digital flagship platforms, spatial design systems, and responsive web experiences crafted with refined typographic and visual restraint.
              </p>

              <div className="pt-3">
                <PageTransitionLink
                  href="/services"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span>SEE EXPERIENCES</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 07: WORK FILM REEL & LAB (0.79 -> 0.91)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{
              opacity: scene7Opacity,
              transform: `translateY(${scene7Y}px)`,
              pointerEvents: scene7Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-5">
              <div className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                SELECTED WORK & RESEARCH
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                ENGINEERED BUILDS. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.5)]">
                  CONCRETE OUTCOMES.
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
                {FLAGSHIP_BUILDS.map((build, idx) => (
                  <PageTransitionLink
                    key={idx}
                    href={build.href}
                    cursor="explore"
                    className="p-6 rounded-2xl border border-white/10 hover:border-electric-cyan bg-[#01050d]/80 backdrop-blur-xl transition-all duration-300 group block"
                  >
                    <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-2">
                      {build.code} // {build.type}
                    </div>
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-electric-cyan transition-colors mb-2">
                      {build.name}
                    </h3>
                    <p className="text-xs font-sans text-white/70 leading-relaxed font-light">
                      {build.thesis}
                    </p>
                  </PageTransitionLink>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <PageTransitionLink
                  href="/work"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span>VIEW ALL CASE STUDIES</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>

                <PageTransitionLink
                  href="/labs"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 hover:border-electric-cyan bg-[#020b18]/60 text-white font-mono text-xs tracking-widest hover:text-electric-cyan transition-all duration-300"
                >
                  <span>ARASS LAB RESEARCH</span>
                  <ArrowUpRight className="w-4 h-4 text-electric-cyan" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 08: CONCLUSION & FOOTER (0.89 -> 1.00)
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center will-change-transform"
            style={{
              opacity: scene8Opacity,
              transform: `translateY(${scene8Y}px)`,
              pointerEvents: scene8Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto space-y-5">
              <div className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                CONCLUSION // COMMENCE
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                LET&apos;S BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.5)]">
                  SOMETHING IMPORTANT.
                </span>
              </h2>

              <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light">
                Connect directly with ARASS engineering directors to initiate an AI architecture mandate, digital platform build, or sensory flagship experience.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <PageTransitionLink
                  href="/contact"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>

                <PageTransitionLink
                  href="/about"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 hover:border-electric-cyan bg-[#020b18]/60 text-white font-mono text-xs tracking-widest hover:text-electric-cyan transition-all duration-300"
                >
                  <span>ABOUT ARASS</span>
                  <ArrowUpRight className="w-4 h-4 text-electric-cyan" />
                </PageTransitionLink>
              </div>

              {/* Directory Navigation Links */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono tracking-widest uppercase">
                {DIRECTORY_ITEMS.map((item) => (
                  <PageTransitionLink
                    key={item.name}
                    href={item.href}
                    cursor="link"
                    className="px-3.5 py-1 rounded-full border border-white/10 hover:border-electric-cyan/60 bg-[#01050d]/60 text-white/60 hover:text-electric-cyan transition-all duration-200"
                  >
                    {item.name}
                  </PageTransitionLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
