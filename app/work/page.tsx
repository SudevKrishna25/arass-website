'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, X, Cpu, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'synapse-ai',
    name: 'SYNAPSE NEURAL ENGINE',
    category: 'AI SYSTEMS & DECISION ARCHITECTURE',
    summary: 'Autonomous real-time intelligence engine processing millions of multimodal sensor streams with sub-10ms decision latency.',
    description:
      'Engineered for a global industrial conglomerate, Synapse unifies distributed sensor feeds into a sovereign neural inference model. It autonomously predicts equipment failures, balances power loads across microgrids, and optimizes heavy machine operations without cloud latency.',
    image: '/images/arass_discovery_quantum_cleanroom.jpg',
    metrics: [
      { label: 'INFERENCE LATENCY', value: '< 8.4ms' },
      { label: 'THROUGHPUT', value: '2.4M ops/sec' },
      { label: 'FAULT REDUCTION', value: '94.2%' },
      { label: 'DEPLOYMENT', value: 'Edge Hardware' },
    ],
    technologies: ['C++ Neural Kernels', 'ONNX Runtime', 'Zero-Copy Shared Memory', 'FPGA Coprocessors'],
  },
  {
    id: 'kinetic-platform',
    name: 'KINETIC FINANCIAL CLOUD',
    category: 'WEB & SOVEREIGN SOFTWARE',
    summary: 'Institutional settlement network and real-time ledger executing mission-critical asset workflows at microsecond precision.',
    description:
      'A sovereign financial infrastructure operating at ultra-high reliability. Rebuilt from the ground up to eliminate third-party vendor lock-in, Kinetic combines deterministic execution pipelines with cryptographic verification and real-time auditability.',
    image: '/images/arass_frontier_build_lab.jpg',
    metrics: [
      { label: 'SETTLEMENT TIME', value: '42 microseconds' },
      { label: 'UPTIME RECORD', value: '99.9999%' },
      { label: 'TRANSACTION VOLUME', value: '$18.4B ARR' },
      { label: 'SECURITY AUDIT', value: 'Zero Vulnerabilities' },
    ],
    technologies: ['Rust', 'Deterministic Raft Consensus', 'WebAssembly Core', 'High-Frequency Linux Sockets'],
  },
  {
    id: 'aether-spatial',
    name: 'AETHER SENSORY ECOSYSTEM',
    category: 'DIGITAL EXPERIENCES',
    summary: 'Cinematic, multi-dimensional web application and sensory brand universe engineered for a luxury technology enterprise.',
    description:
      'Combining 60fps GPU-accelerated motion choreography, fluid canvas dynamics, and bespoke editorial typography, Aether redefined how digital flagship products are experienced by global executive buyers.',
    image: '/images/arass_frontier_atrium.jpg',
    metrics: [
      { label: 'FRAME RATE', value: 'Locked 60 FPS' },
      { label: 'ENGAGEMENT DURATION', value: '+340%' },
      { label: 'ASSET WEIGHT', value: '< 1.4 MB' },
      { label: 'AWARD RECOGNITION', value: 'Global Best in Class' },
    ],
    technologies: ['Custom 2D Canvas Engine', 'GSAP Kinetic Physics', 'Next.js Turbopack', 'Tailored Audio Synthesis'],
  },
  {
    id: 'vector-automation',
    name: 'VECTOR AUTONOMOUS PIPELINE',
    category: 'ENTERPRISE AUTOMATION',
    summary: 'Self-optimizing multi-agent orchestration grid automating end-to-end industrial manufacturing workflows.',
    description:
      'Vector coordinates physical robotic cells, automated optical inspection, and dynamic inventory re-routing across 14 manufacturing plants. The system autonomously adapts to supply disruptions in real time.',
    image: '/images/arass_mission_infrastructure.jpg',
    metrics: [
      { label: 'EFFICIENCY GAIN', value: '+62%' },
      { label: 'ACTIVE AGENTS', value: '1,200 Nodes' },
      { label: 'ERROR RATE', value: '0.0001%' },
      { label: 'SCALE', value: '14 Global Sites' },
    ],
    technologies: ['Distributed Agent Matrix', 'Temporal Workflows', 'Computer Vision ML', 'OPC-UA Industrial Bridge'],
  },
];

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative w-full bg-[#01060f] text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_frontier_build_lab.jpg"
            alt="ARASS Engineering Work"
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
          sectionCode="WRK-01"
          stageName="PORTFOLIO & CASE STUDIES"
          coordinates="46.2044° N, 6.1432° E"
          classification="PRODUCTION SYSTEMS // COMMERCIAL PROOF"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            FLAGSHIP BUILDS // SELECTED WORK
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.05] text-white">
            PROVEN ENGINEERING. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.5)]">
              REAL IMPACT.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Explore flagship systems, digital operating platforms, and sensory experiences engineered for ambitious global leaders.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO EXPLORE CASE STUDIES</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Full-Width Editorial Project Panels */}
      <section className="relative py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-24">
        {PROJECTS.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            data-cursor="explore"
            className="group relative rounded-3xl overflow-hidden border border-electric-cyan/25 hover:border-electric-cyan bg-[#020b18] transition-all duration-700 cursor-pointer shadow-[0_0_60px_rgba(0,0,0,0.9)] min-h-[70vh] flex flex-col justify-between p-8 sm:p-14"
          >
            {/* Background Photographic Plate with Subtle Zoom */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority={idx === 0}
                className="object-cover transition-transform duration-1000 group-hover:scale-106 brightness-45 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01060f] via-[#01060f]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#01060f]/90 via-[#01060f]/40 to-transparent" />
            </div>

            {/* Top Category Header */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-electric-cyan uppercase border border-electric-cyan/40 px-3.5 py-1 rounded-full bg-electric-cyan/10">
                {project.category}
              </span>
              <span className="text-xs font-mono text-white/70">
                0{idx + 1} // CASE STUDY
              </span>
            </div>

            {/* Editorial Name, Summary & Metrics */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-16">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-white group-hover:text-electric-cyan group-hover:translate-x-2 transition-all duration-500 leading-tight">
                  {project.name}
                </h2>
                <p className="text-xs sm:text-sm md:text-base font-sans text-white/90 leading-relaxed max-w-2xl font-light">
                  {project.summary}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="lg:col-span-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.slice(0, 4).map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#020914]/90 border border-electric-cyan/20 backdrop-blur-md">
                      <div className="text-[8px] font-mono text-secondary-text/70 uppercase truncate mb-1">
                        {m.label}
                      </div>
                      <div className="text-sm sm:text-base font-mono font-bold text-electric-cyan">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-electric-cyan font-bold">
                  <span className="tracking-widest uppercase">VIEW PROJECT SPECIFICATIONS</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 03: Full Project Modal Dossier */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#020b18] border border-electric-cyan/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(0,212,255,0.25)] space-y-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase block mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                    {selectedProject.name}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full border border-white/20 hover:border-electric-cyan text-secondary-text hover:text-electric-cyan transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Description */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-electric-cyan tracking-widest uppercase">
                  SYSTEM OVERVIEW & ARCHITECTURE
                </h4>
                <p className="text-sm sm:text-base font-sans text-secondary-text leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-electric-cyan tracking-widest uppercase">
                  VALIDATED BENCHMARKS
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#01060f] border border-white/10">
                      <div className="text-[9px] font-mono text-secondary-text/70 uppercase mb-1">
                        {m.label}
                      </div>
                      <div className="text-base sm:text-lg font-mono font-bold text-electric-cyan">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-electric-cyan tracking-widest uppercase">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-white/10 flex justify-end gap-4">
                <PageTransitionLink
                  href="/contact"
                  cursor="explore"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_25px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
                >
                  <span>INQUIRE ABOUT SIMILAR BUILDS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </PageTransitionLink>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
