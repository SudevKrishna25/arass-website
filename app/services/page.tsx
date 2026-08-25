'use client';

import React from 'react';
import Image from 'next/image';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Cpu, Globe, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  {
    code: '01',
    name: 'AI SYSTEMS',
    tagline: 'Autonomous intelligence architectures built for real-world operations.',
    description:
      'We design and deploy custom neural architectures, real-time decision engines, and local edge inference pipelines that operate with deterministic precision and sub-10ms latency.',
    capabilities: [
      'Custom LLM & Multimodal Model Training',
      'Sub-10ms Edge Neural Inference Engines',
      'Autonomous Multi-Agent Decision Frameworks',
      'Deterministic Safety & Red-Teaming Audits',
    ],
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    metric: { label: 'DECISION LATENCY', value: '< 10ms' },
  },
  {
    code: '02',
    name: 'WEB & SOFTWARE',
    tagline: 'High-performance platforms engineered for zero downtime.',
    description:
      'From institutional financial platforms to complex engineering tools, we build fault-tolerant web applications, sovereign microservices, and distributed cloud backends crafted with zero compromises.',
    capabilities: [
      'High-Throughput Web Applications (60 FPS)',
      'Sovereign Cloud & On-Premises Architecture',
      'Cryptographic Ledger & Financial Systems',
      'Zero-Trust Security & Sub-Millisecond APIs',
    ],
    image: '/images/arass_frontier_build_lab.jpg',
    metric: { label: 'SYSTEM RELIABILITY', value: '99.999%' },
  },
  {
    code: '03',
    name: 'AUTOMATION',
    tagline: 'Intelligent multi-agent orchestration and self-optimizing pipelines.',
    description:
      'We eliminate human bottlenecks across complex enterprise operations by orchestrating intelligent agentic networks, automated data pipelines, and physical-hardware robotic bridges.',
    capabilities: [
      'Autonomous Agent Workflows & Task Execution',
      'Hardware-to-Software Robotics Interfaces',
      'Continuous Predictive Optimization Loops',
      'Legacy System Modernization & Bridges',
    ],
    image: '/images/arass_mission_infrastructure.jpg',
    metric: { label: 'THROUGHPUT GAIN', value: '10x - 100x' },
  },
  {
    code: '04',
    name: 'DIGITAL EXPERIENCES',
    tagline: 'Next-generation sensory digital ecosystems and spatial web interfaces.',
    description:
      'We create unforgettable digital flagship worlds, cinematic interactive portfolios, and sensory digital experiences that elevate ambitious brands into world-class digital institutions.',
    capabilities: [
      'Cinematic Editorial Web Experiences',
      'Custom 2D Canvas & Motion Physics Engines',
      'Spatial Visual Identity & Art Direction',
      'Accessible, Ultra-Responsive 60fps Performance',
    ],
    image: '/images/arass_frontier_atrium.jpg',
    metric: { label: 'USER ENGAGEMENT', value: '+300%' },
  },
];

export default function ServicesPage() {
  return (
    <div className="relative w-full bg-[#01060f] text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_discovery_quantum_cleanroom.jpg"
            alt="ARASS Engineering Services"
            fill
            priority
            className="object-cover brightness-40 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#01060f] via-[#01060f]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#01060f]/90 via-transparent to-[#01060f]/90" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        <TechnicalOverlay
          sectionCode="SRV-02"
          stageName="ENGINEERING CAPABILITIES"
          coordinates="46.2044° N, 6.1432° E"
          classification="PRODUCTION MATRIX // FOUR CORE DISCIPLINES"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CORE CAPABILITIES // WHAT WE BUILD
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-white">
            ENGINEERING CAPABILITIES. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.5)]">
              UNCOMPROMISED PRECISION.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            We partner with visionary enterprises and ambitious technology founders to build mission-critical AI, software, automation, and sensory web experiences.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO EXPLORE SERVICES</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Four Detailed Service Sections */}
      <section className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-32">
        {SERVICES.map((service, idx) => (
          <div
            key={service.code}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center border-t border-white/10 pt-16"
          >
            {/* Left Column: Information & Capabilities */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-mono font-black text-electric-cyan">
                  0x{service.code}
                </span>
                <span className="text-xs font-mono tracking-[0.25em] text-white/70 uppercase">
                  / {service.name}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white leading-tight">
                {service.tagline}
              </h2>

              <p className="text-xs sm:text-sm md:text-base font-sans text-secondary-text leading-relaxed font-light">
                {service.description}
              </p>

              {/* Capabilities Checklist */}
              <div className="space-y-2.5 pt-2">
                <div className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
                  KEY CAPABILITIES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-sans text-white/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric & CTA */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="p-3 rounded-xl bg-[#020b18] border border-electric-cyan/25 inline-block">
                  <div className="text-[8px] font-mono text-secondary-text/70 uppercase">
                    {service.metric.label}
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-electric-cyan">
                    {service.metric.value}
                  </div>
                </div>

                <PageTransitionLink
                  href="/contact"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>
              </div>
            </div>

            {/* Right Column: Visual Photographic Plate */}
            <div className="lg:col-span-6 relative aspect-[16/11] rounded-3xl overflow-hidden border border-electric-cyan/20 bg-[#020b18] group shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-50 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01060f] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 text-[10px] font-mono text-electric-cyan tracking-widest uppercase bg-[#020b18]/85 border border-electric-cyan/30 px-3 py-1 rounded-full backdrop-blur-md">
                SERVICE DOSSIER // 0x{service.code}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 03: Final Call to Action */}
      <section className="relative py-24 text-center px-6 border-t border-white/10 overflow-hidden bg-[#020b18]/60">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            COMMISSION A BUILD
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white leading-tight">
            READY TO ENGINEER WHAT&apos;S NEXT?
          </h2>
          <p className="text-secondary-text max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans font-light">
            Tell us about your technical goals, platform requirements, or ambitious digital vision.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <PageTransitionLink
              href="/contact"
              cursor="explore"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
