'use client';

import React from 'react';
import { ShieldCheck, Cpu, Database, Briefcase, Sparkles, Globe } from 'lucide-react';
import { CinematicSequence } from '@/components/cinematic/CinematicSequence';
import { CinematicImage } from '@/components/cinematic/CinematicImage';
import { ContinuousScrubStage } from '@/components/cinematic/ContinuousScrubText';
import { EXPLORATION_SECTORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function EcosystemSection() {
  return (
    <CinematicSequence
      id="ecosystem"
      height="550vh"
      sectionName="ecosystem"
      globalProgressBase={2.0}
      globalProgressSpan={1.0}
    >
      {(progress) => {
        // Continuous Plate Opacities
        const ecoOpacity = Math.max(0, Math.min(0.95, progress < 0.20 ? 0.95 : progress > 0.80 ? (progress - 0.80) * 4.75 : (0.35 - progress) * 6.3));
        const labOpacity = Math.max(0, Math.min(0.92, progress < 0.15 ? 0 : progress < 0.35 ? (progress - 0.15) * 4.6 : (0.45 - progress) * 9.2));
        const techOpacity = Math.max(0, Math.min(0.90, progress < 0.30 ? 0 : progress < 0.50 ? (progress - 0.30) * 4.5 : (0.60 - progress) * 9.0));
        const atriumOpacity = Math.max(0, Math.min(0.88, progress < 0.45 ? 0 : progress < 0.65 ? (progress - 0.45) * 4.4 : (0.75 - progress) * 8.8));
        const frontierOpacity = Math.max(0, Math.min(0.92, progress < 0.60 ? 0 : progress < 0.80 ? (progress - 0.60) * 4.6 : (0.88 - progress) * 11.5));

        const activeIdx = Math.min(5, Math.max(0, Math.floor(progress * 6)));

        return (
          <>
            {/* ============================================================ */}
            {/* 1. CINEMATIC CONTINUOUS MULTI-PLATE ENVIRONMENT              */}
            {/* ============================================================ */}
            {/* Persistent Base Underlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
              <CinematicImage
                src="/images/arass_ecosystem_cinematic_bg.jpg"
                alt="ARASS Ecosystem Base Platform"
                progress={progress}
                startProgress={0.0}
                endProgress={1.0}
                transitionType="pan-zoom"
                scaleFrom={1.0}
                scaleTo={1.16}
                yFrom={0}
                yTo={-3}
              />
            </div>

            {/* Plate 1: Global Ecosystem Plate (Stage 00 & 05) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: ecoOpacity }}
            >
              <CinematicImage
                src="/images/arass_ecosystem_cinematic_bg.jpg"
                alt="ARASS Global Ecosystem Platform"
                progress={progress}
                startProgress={0.0}
                endProgress={1.0}
                transitionType="zoom-through"
                scaleFrom={1.00}
                scaleTo={1.22}
                yFrom={0}
                yTo={-3}
              />
            </div>

            {/* Plate 2: Labs Plate (Stage 01) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: labOpacity }}
            >
              <CinematicImage
                src="/images/arass_discovery_lab.jpg"
                alt="ARASS Labs Quantum Environment"
                progress={progress}
                startProgress={0.15}
                endProgress={0.45}
                transitionType="horizontal-wipe"
                scaleFrom={1.06}
                scaleTo={1.20}
                xFrom={-2}
                xTo={2}
              />
            </div>

            {/* Plate 3: Technologies Cleanroom Plate (Stage 02) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: techOpacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_build_lab.jpg"
                alt="ARASS Technologies Cleanroom Facility"
                progress={progress}
                startProgress={0.30}
                endProgress={0.60}
                transitionType="clip-inset"
                scaleFrom={1.02}
                scaleTo={1.18}
                yFrom={2}
                yTo={-2}
              />
            </div>

            {/* Plate 4: Ventures Atrium Plate (Stage 03) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: atriumOpacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_atrium.jpg"
                alt="ARASS Ventures Campus Atrium"
                progress={progress}
                startProgress={0.45}
                endProgress={0.75}
                transitionType="diagonal-wipe"
                scaleFrom={1.05}
                scaleTo={1.20}
                xFrom={2}
                xTo={-2}
              />
            </div>

            {/* Plate 5: Frontier Gateway Plate (Stage 04) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: frontierOpacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_cinematic_bg.jpg"
                alt="ARASS Frontier Campus Exterior"
                progress={progress}
                startProgress={0.60}
                endProgress={0.88}
                transitionType="center-expansion"
                scaleFrom={1.00}
                scaleTo={1.18}
                yFrom={0}
                yTo={-3}
              />
            </div>

            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-10" />

            {/* ============================================================ */}
            {/* 2. PERSISTENT TELEMETRY STAGE INDICATOR (RIGHT EDGE)         */}
            {/* ============================================================ */}
            <div className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 sm:gap-4 items-end z-30 pointer-events-none">
              {['00', '01', '02', '03', '04', '05'].map((num, i) => {
                const isActive = activeIdx === i;
                const isPassed = activeIdx > i;

                return (
                  <div key={num} className="flex items-center gap-2.5 sm:gap-3">
                    <span
                      className={cn(
                        'text-[9px] sm:text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300',
                        isActive
                          ? 'text-electric-cyan font-bold scale-110 drop-shadow-[0_0_10px_#00D4FF]'
                          : isPassed
                          ? 'text-secondary-text/60'
                          : 'text-secondary-text/25'
                      )}
                    >
                      {num}
                    </span>
                    <div
                      className={cn(
                        'w-1.5 h-1.5 rounded-full transition-all duration-300',
                        isActive
                          ? 'bg-electric-cyan shadow-cyan-glow scale-125'
                          : isPassed
                          ? 'bg-ocean-blue'
                          : 'bg-white/10'
                      )}
                    />
                  </div>
                );
              })}
            </div>

            {/* ============================================================ */}
            {/* 3. MATHEMATICALLY CONTINUOUS OVERLAPPING TYPOGRAPHY           */}
            {/* ============================================================ */}
            <div className="relative h-full w-full max-w-7xl mx-auto px-6 pr-14 md:px-12 flex flex-col justify-center z-20 pointer-events-none">
              {/* Stage 00: INTRO */}
              <ContinuousScrubStage
                id="eco-00"
                progress={progress}
                startProgress={0.0}
                peakStart={0.0}
                peakEnd={0.12}
                endProgress={0.22}
                tag="SECTION 03 // THE ARASS ECOSYSTEM"
                badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ONE ENGINE.', 'SIX OPERATING SYSTEMS.']}
                statement="ARASS builds the foundational operational architecture that invents, protects, and scales future industries."
                align="center"
              />

              {/* Stage 01: LABS (Overlaps 0.14 -> 0.22 with Stage 00) */}
              <ContinuousScrubStage
                id="eco-01"
                progress={progress}
                startProgress={0.14}
                peakStart={0.20}
                peakEnd={0.28}
                endProgress={0.38}
                tag="PILLAR 01 // RESEARCH"
                badgeIcon={<Cpu className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ARASS LABS', 'DEEP DISCOVERY']}
                statement="Discover what others haven't. Fundamental research across quantum science, physics, and synthetic biology."
                align="left"
              />

              {/* Stage 02: TECHNOLOGIES (Overlaps 0.28 -> 0.38 with Stage 01) */}
              <ContinuousScrubStage
                id="eco-02"
                progress={progress}
                startProgress={0.28}
                peakStart={0.34}
                peakEnd={0.42}
                endProgress={0.52}
                tag="PILLAR 02 // TECHNOLOGY"
                badgeIcon={<Database className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ARASS TECHNOLOGIES', 'ENGINEERING SCALE']}
                statement="Turn research into technology. Engineering robust high-density hardware, advanced robotics, and foundational platforms."
                align="right"
              />

              {/* Stage 03: VENTURES (Overlaps 0.44 -> 0.52 with Stage 02) */}
              <ContinuousScrubStage
                id="eco-03"
                progress={progress}
                startProgress={0.44}
                peakStart={0.50}
                peakEnd={0.58}
                endProgress={0.68}
                tag="PILLAR 03 // VENTURES"
                badgeIcon={<Briefcase className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ARASS VENTURES', 'INSTITUTIONAL CREATION']}
                statement="Build companies around breakthrough technology with long-term patient capital and operational leadership."
                align="left"
              />

              {/* Stage 04: FRONTIER (Overlaps 0.58 -> 0.68 with Stage 03) */}
              <ContinuousScrubStage
                id="eco-04"
                progress={progress}
                startProgress={0.58}
                peakStart={0.64}
                peakEnd={0.72}
                endProgress={0.82}
                tag="PILLAR 04 // FRONTIER"
                badgeIcon={<Sparkles className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ARASS FRONTIER', 'GLOBAL NETWORK']}
                statement="Bring exceptional minds into the system. Connecting researchers, founders, and institutions across the world."
                align="right"
              />

              {/* Stage 05: SCALE (Overlaps 0.74 -> 0.82 with Stage 04) */}
              <ContinuousScrubStage
                id="eco-05"
                progress={progress}
                startProgress={0.74}
                peakStart={0.82}
                peakEnd={1.00}
                endProgress={1.00}
                tag="PILLAR 05 // SCALE"
                badgeIcon={<Globe className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ONE ENGINE.', 'SIX SYSTEMS.']}
                statement="Connecting research, technology development, patent IP, venture creation, and global talent into one unified operating system."
                align="center"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mt-4">
                  {EXPLORATION_SECTORS.map((sector) => (
                    <span
                      key={sector}
                      className="text-[9px] sm:text-[10px] font-mono tracking-widest text-secondary-text/80 py-1 px-2.5 rounded border border-electric-cyan/25 bg-[#020b18]/70 backdrop-blur-sm"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </ContinuousScrubStage>
            </div>
          </>
        );
      }}
    </CinematicSequence>
  );
}
