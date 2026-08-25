'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { TechnicalDiagram } from '@/components/cinematic/TechnicalDiagram';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Cpu, Layers, Zap, Dna, Bot, Compass } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TECH_SYSTEMS = [
  {
    code: 'TS-01',
    name: 'COMPUTATIONAL INTELLIGENCE',
    icon: Cpu,
    topology: 'Photonic Mesh Tensor Interconnect',
    throughput: '1.2 PetaFlops/mm²',
    latency: '< 2.4 ns',
    efficiency: '50x vs CMOS',
    description:
      'Replacing electron bottlenecks with coherent laser wave interference. Matrix multiplication is executed passively through silicon waveguides with zero thermal degradation.',
    diagramType: 'optical-mesh',
  },
  {
    code: 'TS-02',
    name: 'ADVANCED MATERIALS',
    icon: Layers,
    topology: 'Acoustic-Guided CVD Crystalline Deposition',
    throughput: '120x Industrial Speed',
    latency: 'Sub-angstrom Precision',
    efficiency: '3,800°C Thermal Limit',
    description:
      'Continuous atomic synthesis of diamondoid carbon lattices with macro-scale covalent bond perfection, delivering ultra-lightweight refractory structures.',
    diagramType: 'atomic-lattice',
  },
  {
    code: 'TS-03',
    name: 'ENERGY SYSTEMS',
    icon: Zap,
    topology: 'Quasi-Isodynamic REBCO Stellarator Magnet Mesh',
    throughput: '26.4 Tesla Field',
    latency: 'Steady-State Continuous',
    efficiency: 'Q > 3.5 Target Gain',
    description:
      'Continuous magnetic plasma confinement utilizing 3D shaped high-temperature superconducting coils, achieving non-pulsed, disruption-free fusion baseload power.',
    diagramType: 'stellarator-magnetic',
  },
  {
    code: 'TS-04',
    name: 'BIOLOGICAL ENGINEERING',
    icon: Dna,
    topology: 'Automated Epigenetic Transcriptome Synthesizer',
    throughput: '99.98% Repair Fidelity',
    latency: 'Real-time Telemetry',
    efficiency: '+42% Telomere Extension',
    description:
      'Targeted molecular enzymatic engines engineered to reverse DNA senescence markers and perform intracellular metabolic restoration in vivo.',
    diagramType: 'epigenetic-loop',
  },
  {
    code: 'TS-05',
    name: 'AUTONOMOUS SYSTEMS',
    icon: Bot,
    topology: 'Neuromorphic Proprioceptive Actuator Network',
    throughput: '0.8 ms Balance Loop',
    latency: 'Sub-millimeter Stride Control',
    efficiency: '140 kg Payload Capable',
    description:
      'Direct-drive humanoid and heavy industrial robotics operating with onboard neuromorphic sensory-motor feedback, independent of external cloud connectivity.',
    diagramType: 'neuromorphic-bus',
  },
  {
    code: 'TS-06',
    name: 'SPACE SYSTEMS',
    icon: Compass,
    topology: 'Magnetoplasmadynamic High-Impulse Thruster',
    throughput: '6,200 sec Specific Impulse',
    latency: '25,000 hrs Continuous Burn',
    efficiency: '3.8x Payload Multiplier',
    description:
      'Electric propulsion thrusters utilizing argon plasma acceleration to drastically lower transit times and propellant mass across deep-space trajectories.',
    diagramType: 'plasma-drive',
  },
];

export default function TechnologiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.tech-system-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95, rotationX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_frontier_build_lab.jpg"
            alt="ARASS Technology Systems Engineering"
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
          sectionCode="TEC-09"
          stageName="SYSTEMS ENGINEERING"
          coordinates="37.7749° N, 122.4194° W"
          classification="2D SCHEMATICS // STRICT ZERO-3D ARCHITECTURE"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 09 // HARDWARE SCHEMATICS
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-primary-text">
            SYSTEMS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]">
              BLUEPRINTS
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Explore 2D interactive system topologies, computational schematics, and thermodynamic flow charts
            across all six operating divisions.
          </p>
        </div>
      </section>

      {/* 02: Systems Grid & Schematics */}
      <section className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase block">
              HARDWARE DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-text">
              Engineered Topologies ({TECH_SYSTEMS.length})
            </h2>
          </div>
          <span className="text-xs font-mono text-secondary-text/60 tracking-widest hidden sm:inline">
            ZERO 3D // 100% VECTOR PRECISION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TECH_SYSTEMS.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.code}
                className="tech-system-card group p-8 rounded-2xl bg-[#020b18]/80 border border-electric-cyan/20 hover:border-electric-cyan/60 transition-all duration-500 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-electric-cyan tracking-widest uppercase">
                      <Icon className="w-4 h-4" />
                      <span>{tech.code}</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-secondary-text/50 border border-white/10 px-2 py-0.5 rounded">
                      TRL-7 OPERATIONAL
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary-text group-hover:text-electric-cyan transition-colors">
                    {tech.name}
                  </h3>

                  <div className="text-xs font-mono text-electric-cyan/80 bg-electric-cyan/5 p-2 rounded border border-electric-cyan/20">
                    TOPOLOGY: {tech.topology}
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-secondary-text leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                {/* 2D Circuit / Node SVG Telemetry Visualizer */}
                <div className="p-4 rounded-xl bg-[#020914] border border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-mono text-secondary-text/60 uppercase">
                    <span>SCHEMATIC VECTOR METRICS</span>
                    <span className="text-electric-cyan font-bold">CALIBRATED</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded bg-white/[0.02]">
                      <div className="text-[8px] font-mono text-secondary-text/50">THROUGHPUT</div>
                      <div className="text-xs font-mono font-bold text-electric-cyan truncate">{tech.throughput}</div>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <div className="text-[8px] font-mono text-secondary-text/50">LATENCY</div>
                      <div className="text-xs font-mono font-bold text-white truncate">{tech.latency}</div>
                    </div>
                    <div className="p-2 rounded bg-white/[0.02]">
                      <div className="text-[8px] font-mono text-secondary-text/50">GAIN / LIMIT</div>
                      <div className="text-xs font-mono font-bold text-electric-cyan truncate">{tech.efficiency}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 03: Global Technical Flow Diagram */}
      <section className="relative py-24 px-6 border-t border-white/10 bg-[#020b18]/60">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-8">
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            VECTOR COMPONENT INTERCONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-text">
            End-to-End System Synthesis Flow
          </h2>
        </div>
        <TechnicalDiagram />
      </section>

      {/* 04: Next Chapter */}
      <section className="relative py-24 text-center px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
            INTELLIGENCE ARCHIVE
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text">
            READ THE ARASS INTELLIGENCE BRIEFINGS
          </h2>
          <div className="pt-4 flex justify-center">
            <PageTransitionLink
              href="/insights"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all hover:scale-105"
            >
              <span>EXPLORE INSIGHTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
