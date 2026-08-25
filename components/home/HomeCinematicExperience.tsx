'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { HudTelemetry } from '@/components/cinematic/HudTelemetry';
import { ArassOpeningExperience } from '@/components/cinematic/ArassOpeningExperience';
import {
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Layers,
  Network,
  Sparkles,
  Activity,
  CheckCircle2,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITY_WORLDS = [
  {
    code: '01',
    discipline: 'DISCIPLINE 01 // NEURAL INFRASTRUCTURE',
    title: 'AI SYSTEMS',
    statement: 'INTELLIGENT DECISION SYSTEMS FOR REAL-TIME WORKFLOWS.',
    description:
      'Architectures engineered to integrate multimodal perception, deterministic reasoning, and enterprise-grade models directly into production environments.',
    href: '/services',
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-micro-controller-4286-large.mp4',
    metrics: [
      { label: 'LATENCY', value: '< 12ms', desc: 'Sub-second Finality' },
      { label: 'ACCURACY', value: '99.98%', desc: 'Deterministic Reasoning' },
      { label: 'TOPOLOGY', value: 'Multi-Modal', desc: 'Tensor Mesh Pipeline' },
    ],
  },
  {
    code: '02',
    discipline: 'DISCIPLINE 02 // DISTRIBUTED ARCHITECTURE',
    title: 'DIGITAL PRODUCTS',
    statement: 'HIGH-PERFORMANCE PLATFORMS BUILT FOR DEMANDING OPERATIONS.',
    description:
      'Fault-tolerant web applications, operational cloud consoles, and distributed data systems built with uncompromising engineering discipline.',
    href: '/work',
    image: '/images/arass_frontier_build_lab.jpg',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-server-room-rack-lights-blinking-4293-large.mp4',
    metrics: [
      { label: 'THROUGHPUT', value: '100k+ TPS', desc: 'Concurrent Transactions' },
      { label: 'AVAILABILITY', value: '99.999%', desc: 'Self-Healing Mesh' },
      { label: 'SECURITY', value: 'AES-256', desc: 'Zero Trust Enclaves' },
    ],
  },
  {
    code: '03',
    discipline: 'DISCIPLINE 03 // AUTONOMOUS AGENT MESH',
    title: 'AUTOMATION',
    statement: 'MULTI-AGENT ORCHESTRATION & OPERATIONAL PIPELINES.',
    description:
      'Coordinated agent workflows, automated data ingestion pipelines, and systems integration designed to eliminate friction in complex organizations.',
    href: '/services',
    image: '/images/arass_mission_infrastructure.jpg',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-screen-animation-4279-large.mp4',
    metrics: [
      { label: 'EFFICIENCY', value: '85%+', desc: 'Friction Reduction' },
      { label: 'ORCHESTRATION', value: 'DAG Mesh', desc: 'Self-Steering Agents' },
      { label: 'INGESTION', value: 'Real-Time', desc: 'Zero-Buffering Pipelines' },
    ],
  },
  {
    code: '04',
    discipline: 'DISCIPLINE 04 // SPATIAL & SENSORY ENVIRONMENTS',
    title: 'DIGITAL EXPERIENCES',
    statement: 'SENSORY DIGITAL FLAGSHIP ECOSYSTEMS.',
    description:
      'Distinctive digital flagship platforms, spatial design systems, and responsive web experiences crafted with refined typographic and visual restraint.',
    href: '/services',
    image: '/images/arass_frontier_atrium.jpg',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-blue-plexus-mesh-with-depth-of-field-31745-large.mp4',
    metrics: [
      { label: 'FRAMERATE', value: '60 FPS', desc: 'GPU Acceleration' },
      { label: 'FIDELITY', value: 'Spatial 2.5D', desc: 'Subpixel Depth' },
      { label: 'LOAD TIME', value: '< 0.8s', desc: 'Optimized Asset Matrix' },
    ],
  },
];

const FLAGSHIP_BUILDS = [
  {
    type: 'FLAGSHIP BUILD',
    code: '01',
    name: 'SYNAPSE NEURAL ENGINE',
    thesis: 'Autonomous decision architecture and real-time inference pipeline.',
    href: '/work',
    tag: 'ACTIVE CLUSTER',
    stat: '1.2B Inferences/Day',
  },
  {
    type: 'INTERNAL PLATFORM',
    code: '02',
    name: 'KINETIC FINANCIAL CLOUD',
    thesis: 'High-throughput operational ledger with zero-downtime consensus.',
    href: '/work',
    tag: 'PRODUCTION READY',
    stat: '99.999% Resilience',
  },
  {
    type: 'CONCEPT EXPERIMENT',
    code: '03',
    name: 'AETHER SENSORY ECOSYSTEM',
    thesis: 'Spatial digital brand experience with GPU-accelerated 2D choreography.',
    href: '/work',
    tag: 'LAB PROTOCOL',
    stat: 'Sub-millisecond Render',
  },
];

const DIRECTORY_ITEMS = [
  { name: 'WORK', href: '/work' },
  { name: 'SOLUTIONS', href: '/services' },
  { name: 'PRODUCTS', href: '/work' },
  { name: 'LAB', href: '/labs' },
  { name: 'COMPANY', href: '/about' },
  { name: 'INSIGHTS', href: '/insights' },
  { name: 'EVENTS', href: '/events' },
  { name: 'TECH REVIEW', href: '/tech-review' },
];

export function HomeCinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('arass_intro_seen') === 'true';
      if (seen) {
        setIntroFinished(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageRef.current,
        pinSpacing: false,
        scrub: 0.8,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const navigateToProgress = (targetProgress: number) => {
    if (typeof window !== 'undefined' && containerRef.current) {
      const totalScroll = containerRef.current.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: totalScroll * targetProgress,
        behavior: 'smooth',
      });
    }
  };

  const scrollToFirstWorld = () => {
    navigateToProgress(0.2);
  };

  // =========================================================================
  // CAMERA MEDIA PLATES (DYNAMIC 2.5D ZOOM, DRIFT & DISSOLVE)
  // =========================================================================
  // Plate 1: Global Planetary Earth (Hero & Statement, 0.00 -> 0.28)
  const plate1Scale = 1.0 + progress * 0.45;
  const plate1Y = -progress * 60;
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
  const plate2Scale = 1.15 - Math.max(0, progress - 0.22) * 0.18;
  const plate2Y = (progress - 0.31) * 40;

  // Plate 3: Frontier Build Lab (Digital Products, 0.38 -> 0.58)
  const plate3Opacity =
    progress < 0.38
      ? 0
      : progress < 0.44
      ? (progress - 0.38) / 0.06
      : progress < 0.54
      ? 1
      : Math.max(0, 1 - (progress - 0.54) / 0.06);
  const plate3Scale = 1.15 - Math.max(0, progress - 0.38) * 0.16;
  const plate3Y = (progress - 0.46) * 40;

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
  const plate4Y = (progress - 0.60) * 40;

  // Plate 5: Sensory Atrium (Digital Experiences, 0.66 -> 0.84)
  const plate5Opacity =
    progress < 0.66
      ? 0
      : progress < 0.72
      ? (progress - 0.66) / 0.06
      : progress < 0.80
      ? 1
      : Math.max(0, 1 - (progress - 0.80) / 0.06);
  const plate5Scale = 1.14 - Math.max(0, progress - 0.66) * 0.15;
  const plate5Y = (progress - 0.74) * 40;

  // Plate 6: Institutional Monolith (Work Reel & Conclusion, 0.78 -> 1.00)
  const plate6Opacity = progress < 0.78 ? 0 : Math.min(1, (progress - 0.78) / 0.06);
  const plate6Scale = 1.1 - Math.max(0, progress - 0.78) * 0.1;

  // =========================================================================
  // SCENE TYPOGRAPHY & TRANSITION CHOREOGRAPHY
  // =========================================================================
  // Scene 1: Hero Tagline (0.00 -> 0.16)
  const scene1Opacity = progress < 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) / 0.05);
  const scene1Y = -Math.max(0, progress - 0.02) * 80;
  const scene1Scale = 1.0 - Math.max(0, progress - 0.02) * 0.1;

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
      ? 50 * (1 - (progress - 0.15) / 0.04)
      : progress > 0.25
      ? -50 * ((progress - 0.25) / 0.04)
      : 0;
  const scene2Scale = progress < 0.19 ? 0.94 + (progress - 0.15) * 1.5 : 1.0;

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
      ? 50 * (1 - (progress - 0.27) / 0.04)
      : progress > 0.38
      ? -50 * ((progress - 0.38) / 0.04)
      : 0;
  const scene3Scale = progress < 0.31 ? 0.94 + (progress - 0.27) * 1.5 : 1.0;

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
      ? 50 * (1 - (progress - 0.40) / 0.04)
      : progress > 0.51
      ? -50 * ((progress - 0.51) / 0.04)
      : 0;
  const scene4Scale = progress < 0.44 ? 0.94 + (progress - 0.40) * 1.5 : 1.0;

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
      ? 50 * (1 - (progress - 0.53) / 0.04)
      : progress > 0.65
      ? -50 * ((progress - 0.65) / 0.04)
      : 0;
  const scene5Scale = progress < 0.57 ? 0.94 + (progress - 0.53) * 1.5 : 1.0;

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
      ? 50 * (1 - (progress - 0.67) / 0.04)
      : progress > 0.77
      ? -50 * ((progress - 0.77) / 0.04)
      : 0;
  const scene6Scale = progress < 0.71 ? 0.94 + (progress - 0.67) * 1.5 : 1.0;

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
      ? 50 * (1 - (progress - 0.79) / 0.04)
      : progress > 0.88
      ? -50 * ((progress - 0.88) / 0.04)
      : 0;

  // Scene 8: Final Conclusion & Footer (0.89 -> 1.00)
  const scene8Opacity = progress < 0.89 ? 0 : Math.min(1, (progress - 0.89) / 0.05);
  const scene8Y = progress < 0.89 ? 50 : Math.max(0, 50 * (1 - (progress - 0.89) / 0.05));

  return (
    <>
      {/* Signature ARASS Dynamic Opening Experience */}
      {!introFinished && <ArassOpeningExperience onComplete={() => setIntroFinished(true)} />}

      {/* Streamlined, Non-Overlapping HUD Telemetry Layer */}
      <HudTelemetry scrollProgress={progress} onNavigateChapter={navigateToProgress} />

      {/* Main 650vh Continuous Cinematic Timeline */}
      <div
        ref={containerRef}
        className="relative w-full h-[650vh] bg-[#01050d] text-primary-text select-none"
      >
        {/* Full-Screen Pinned Stage */}
        <div
          ref={stageRef}
          className="w-full h-screen relative overflow-hidden bg-[#01050d] flex items-center justify-center pointer-events-auto"
        >
          {/* ===================================================================
              BACKGROUND PHOTOGRAPHIC & VIDEO CAMERA PLATES
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
              className="object-cover brightness-45 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/80 via-transparent to-[#01050d]/80" />
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
              alt="ARASS Quantum Cleanroom"
              fill
              className="object-cover brightness-35 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/85" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/85" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/85" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/85" />
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#01050d]/80 via-transparent to-[#01050d]/80" />
          </div>

          {/* Live Interactive 2D Atmosphere with Ambient Photon Light Aura & Connective Filaments */}
          <LiveCinematicAtmosphere scrollProgress={progress} />

          {/* ===================================================================
              SCENE 01: HERO WITH SPACIOUS LUXURY EDITORIAL TYPOGRAPHY
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 pt-16 sm:pt-12 text-center will-change-transform"
            style={{
              opacity: scene1Opacity,
              transform: `translateY(${scene1Y}px) scale(${scene1Scale.toFixed(3)})`,
              pointerEvents: scene1Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4 sm:space-y-5">
              {/* Refined Luxury Tagline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-heading font-black tracking-[-0.03em] leading-[1.08] text-white select-none">
                <span className="inline-block transition-transform duration-300 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  WE DON&apos;T FOLLOW
                </span>
                <br />
                <span className="inline-block text-white/90 transition-transform duration-300 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  THE FUTURE.
                </span>
                <br />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.85)] animate-pulse">
                  WE BUILD IT.
                </span>
              </h1>

              {/* High-Tech System Description with Balanced Whitespace */}
              <p className="max-w-xl mx-auto text-xs sm:text-sm font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                ARASS is an independent technology powerhouse engineering sovereign AI systems,
                mission-critical digital platforms, multi-agent automation, and sensory digital flagship ecosystems.
              </p>

              {/* Holographic CTAs */}
              <div className="pt-1 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                <PageTransitionLink
                  href="/contact"
                  cursor="explore"
                  className="group relative inline-flex items-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs sm:text-sm tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_25px_rgba(0,212,255,0.6)] hover:shadow-[0_0_40px_rgba(0,212,255,0.9)]"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>

                <button
                  onClick={scrollToFirstWorld}
                  data-cursor="explore"
                  className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full border border-white/20 hover:border-electric-cyan bg-[#020b18]/60 backdrop-blur-xl text-white font-mono font-medium text-xs sm:text-sm tracking-widest hover:text-electric-cyan transition-all duration-300 hover:bg-[#020b18]/80 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                >
                  <span>EXPLORE DISCIPLINES</span>
                  <ArrowDownRight className="w-4 h-4 text-electric-cyan transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
              </div>

              {/* Clean 4-Discipline Indicator Strip */}
              <div className="pt-4 border-t border-white/10 max-w-3xl w-full grid grid-cols-2 md:grid-cols-4 gap-2.5 text-[10px] sm:text-xs font-mono tracking-wider text-white/70 uppercase">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col items-center gap-0.5 group hover:border-electric-cyan/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-electric-cyan font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                    <span>AI SYSTEMS</span>
                  </div>
                  <span className="text-[9px] text-white/40">Neural Decision Core</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col items-center gap-0.5 group hover:border-electric-cyan/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-electric-cyan font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                    <span>DIGITAL PRODUCTS</span>
                  </div>
                  <span className="text-[9px] text-white/40">Distributed Mesh</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col items-center gap-0.5 group hover:border-electric-cyan/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-electric-cyan font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                    <span>AUTOMATION</span>
                  </div>
                  <span className="text-[9px] text-white/40">Autonomous Agent Mesh</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col items-center gap-0.5 group hover:border-electric-cyan/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-electric-cyan font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
                    <span>EXPERIENCES</span>
                  </div>
                  <span className="text-[9px] text-white/40">Spatial 2.5D Flagship</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 02: WHAT WE BUILD STATEMENT WITH BLUEPRINT DOSSIER
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
            style={{
              opacity: scene2Opacity,
              transform: `translateY(${scene2Y}px) scale(${scene2Scale.toFixed(3)})`,
              pointerEvents: scene2Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] sm:text-xs font-mono tracking-[0.3em] text-white/60 uppercase">
                <span>01 // ARCHITECTURAL THESIS</span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight leading-[1.06] text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                WE ENGINEER <br />
                SYSTEMS THAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.7)]">
                  MOVE BUSINESS FORWARD.
                </span>
              </h2>

              <p className="max-w-xl mx-auto text-xs sm:text-sm font-mono text-white/60 tracking-widest uppercase">
                SCROLL TO TRAVERSE THE FOUR ARASS CORE DISCIPLINES ↓
              </p>

              {/* Holographic Circuit Pillar Blueprint */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-left font-mono">
                {CAPABILITY_WORLDS.map((cap) => (
                  <div
                    key={cap.code}
                    className="p-4 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-xl hover:border-electric-cyan/50 transition-all duration-300 group"
                  >
                    <div className="text-[10px] text-electric-cyan tracking-widest mb-1 font-bold">
                      {cap.code} //
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-electric-cyan transition-colors mb-2">
                      {cap.title}
                    </div>
                    <div className="text-[10px] text-white/50 leading-relaxed font-sans line-clamp-2">
                      {cap.statement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 03: CAPABILITY WORLD 1 — AI SYSTEMS
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
            style={{
              opacity: scene3Opacity,
              transform: `translateY(${scene3Y}px) scale(${scene3Scale.toFixed(3)})`,
              pointerEvents: scene3Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-electric-cyan uppercase">
                <Cpu className="w-3.5 h-3.5" />
                <span>{CAPABILITY_WORLDS[0].discipline}</span>
              </div>

              <h2 className="text-4xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[0].title}
              </h2>

              <p className="text-sm sm:text-lg md:text-xl font-mono text-electric-cyan tracking-wide font-semibold">
                {CAPABILITY_WORLDS[0].statement}
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[0].description}
              </p>

              {/* Glassmorphic Metrics Dossier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto w-full pt-2 font-mono">
                {CAPABILITY_WORLDS[0].metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-2xl bg-[#020b18]/70 border border-white/15 backdrop-blur-xl text-center hover:border-electric-cyan/50 transition-all duration-300"
                  >
                    <div className="text-[10px] text-white/40 tracking-widest uppercase mb-1">
                      {m.label}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-electric-cyan mb-1">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-white/60">{m.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <PageTransitionLink
                  href={CAPABILITY_WORLDS[0].href}
                  cursor="explore"
                  className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs sm:text-sm tracking-widest hover:shadow-[0_0_35px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
                >
                  <span>EXPLORE AI ARCHITECTURE</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 04: CAPABILITY WORLD 2 — DIGITAL PRODUCTS
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
            style={{
              opacity: scene4Opacity,
              transform: `translateY(${scene4Y}px) scale(${scene4Scale.toFixed(3)})`,
              pointerEvents: scene4Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-electric-cyan uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>{CAPABILITY_WORLDS[1].discipline}</span>
              </div>

              <h2 className="text-4xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[1].title}
              </h2>

              <p className="text-sm sm:text-lg md:text-xl font-mono text-electric-cyan tracking-wide font-semibold">
                {CAPABILITY_WORLDS[1].statement}
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[1].description}
              </p>

              {/* Glassmorphic Metrics Dossier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto w-full pt-2 font-mono">
                {CAPABILITY_WORLDS[1].metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-2xl bg-[#020b18]/70 border border-white/15 backdrop-blur-xl text-center hover:border-electric-cyan/50 transition-all duration-300"
                  >
                    <div className="text-[10px] text-white/40 tracking-widest uppercase mb-1">
                      {m.label}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-electric-cyan mb-1">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-white/60">{m.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <PageTransitionLink
                  href={CAPABILITY_WORLDS[1].href}
                  cursor="explore"
                  className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs sm:text-sm tracking-widest hover:shadow-[0_0_35px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
                >
                  <span>VIEW PLATFORMS & PORTFOLIO</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 05: CAPABILITY WORLD 3 — AUTOMATION
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
            style={{
              opacity: scene5Opacity,
              transform: `translateY(${scene5Y}px) scale(${scene5Scale.toFixed(3)})`,
              pointerEvents: scene5Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-electric-cyan uppercase">
                <Network className="w-3.5 h-3.5" />
                <span>{CAPABILITY_WORLDS[2].discipline}</span>
              </div>

              <h2 className="text-4xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[2].title}
              </h2>

              <p className="text-sm sm:text-lg md:text-xl font-mono text-electric-cyan tracking-wide font-semibold">
                {CAPABILITY_WORLDS[2].statement}
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[2].description}
              </p>

              {/* Glassmorphic Metrics Dossier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto w-full pt-2 font-mono">
                {CAPABILITY_WORLDS[2].metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-2xl bg-[#020b18]/70 border border-white/15 backdrop-blur-xl text-center hover:border-electric-cyan/50 transition-all duration-300"
                  >
                    <div className="text-[10px] text-white/40 tracking-widest uppercase mb-1">
                      {m.label}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-electric-cyan mb-1">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-white/60">{m.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <PageTransitionLink
                  href={CAPABILITY_WORLDS[2].href}
                  cursor="explore"
                  className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs sm:text-sm tracking-widest hover:shadow-[0_0_35px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
                >
                  <span>EXPLORE AUTOMATION SYSTEMS</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 06: CAPABILITY WORLD 4 — DIGITAL EXPERIENCES
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
            style={{
              opacity: scene6Opacity,
              transform: `translateY(${scene6Y}px) scale(${scene6Scale.toFixed(3)})`,
              pointerEvents: scene6Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-electric-cyan uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{CAPABILITY_WORLDS[3].discipline}</span>
              </div>

              <h2 className="text-4xl sm:text-7xl md:text-8xl font-heading font-black tracking-tight text-white leading-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[3].title}
              </h2>

              <p className="text-sm sm:text-lg md:text-xl font-mono text-electric-cyan tracking-wide font-semibold">
                {CAPABILITY_WORLDS[3].statement}
              </p>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                {CAPABILITY_WORLDS[3].description}
              </p>

              {/* Glassmorphic Metrics Dossier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto w-full pt-2 font-mono">
                {CAPABILITY_WORLDS[3].metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-2xl bg-[#020b18]/70 border border-white/15 backdrop-blur-xl text-center hover:border-electric-cyan/50 transition-all duration-300"
                  >
                    <div className="text-[10px] text-white/40 tracking-widest uppercase mb-1">
                      {m.label}
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-electric-cyan mb-1">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-white/60">{m.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <PageTransitionLink
                  href={CAPABILITY_WORLDS[3].href}
                  cursor="explore"
                  className="group inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs sm:text-sm tracking-widest hover:shadow-[0_0_35px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
                >
                  <span>EXPERIENCE DIGITAL FLAGSHIPS</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 07: WORK & FLAGSHIP REEL WITH HOLOGRAPHIC CASE STUDY CARDS
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
            style={{
              opacity: scene7Opacity,
              transform: `translateY(${scene7Y}px)`,
              pointerEvents: scene7Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/15 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-white/70 uppercase">
                <Activity className="w-3.5 h-3.5 text-electric-cyan" />
                <span>05 // FLAGSHIP PORTFOLIO ARTIFACTS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                PROVEN ARTIFACTS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.6)]">
                  IN PRODUCTION.
                </span>
              </h2>

              {/* 3D Glassmorphic Case Study Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-left">
                {FLAGSHIP_BUILDS.map((build) => (
                  <PageTransitionLink
                    key={build.code}
                    href={build.href}
                    cursor="explore"
                    className="p-5 rounded-2xl bg-[#020b18]/80 border border-white/15 backdrop-blur-xl hover:border-electric-cyan transition-all duration-300 group shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,212,255,0.25)] hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-2">
                      <span>{build.code} // {build.type}</span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] bg-electric-cyan/10 border border-electric-cyan/30">
                        {build.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-electric-cyan transition-colors mb-2">
                      {build.name}
                    </h3>
                    <p className="text-xs font-sans text-white/70 leading-relaxed font-light mb-3">
                      {build.thesis}
                    </p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span>{build.stat}</span>
                      <span className="text-electric-cyan group-hover:translate-x-1 transition-transform">
                        EXPLORE →
                      </span>
                    </div>
                  </PageTransitionLink>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                <PageTransitionLink
                  href="/work"
                  cursor="explore"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_35px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
                >
                  <span>VIEW ALL CASE STUDIES</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>

                <PageTransitionLink
                  href="/labs"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 hover:border-electric-cyan bg-[#020b18]/70 text-white font-mono text-xs tracking-widest hover:text-electric-cyan transition-all duration-300"
                >
                  <span>ARASS LAB RESEARCH</span>
                  <ArrowUpRight className="w-4 h-4 text-electric-cyan" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* ===================================================================
              SCENE 08: CONCLUSION & FOOTER DIRECTORY
              =================================================================== */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center will-change-transform"
            style={{
              opacity: scene8Opacity,
              transform: `translateY(${scene8Y}px)`,
              pointerEvents: scene8Opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div className="relative max-w-5xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/15 text-[10px] sm:text-xs font-mono tracking-[0.3em] text-white/60 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan" />
                <span>CONCLUSION // COMMENCE INITIATION</span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white leading-tight drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                LET&apos;S BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_45px_rgba(0,212,255,0.7)]">
                  SOMETHING IMPORTANT.
                </span>
              </h2>

              <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/80 leading-relaxed font-light">
                Connect directly with ARASS engineering directors to initiate an enterprise AI architecture mandate,
                high-concurrency digital platform, or spatial flagship experience.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <PageTransitionLink
                  href="/contact"
                  cursor="explore"
                  className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs sm:text-sm tracking-widest hover:shadow-[0_0_40px_rgba(0,212,255,0.9)] transition-all duration-300 hover:scale-105"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </PageTransitionLink>

                <PageTransitionLink
                  href="/about"
                  cursor="explore"
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full border border-white/20 hover:border-electric-cyan bg-[#020b18]/70 text-white font-mono text-xs sm:text-sm tracking-widest hover:text-electric-cyan transition-all duration-300"
                >
                  <span>ABOUT ARASS</span>
                  <ArrowUpRight className="w-4 h-4 text-electric-cyan" />
                </PageTransitionLink>
              </div>

              {/* Directory Navigation Matrix */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-mono tracking-widest uppercase">
                {DIRECTORY_ITEMS.map((item) => (
                  <PageTransitionLink
                    key={item.name}
                    href={item.href}
                    cursor="link"
                    className="px-4 py-1.5 rounded-full border border-white/10 hover:border-electric-cyan bg-[#01050d]/80 text-white/60 hover:text-electric-cyan transition-all duration-200"
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
