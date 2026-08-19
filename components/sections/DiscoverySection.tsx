'use client';

import React from 'react';
import { Microscope, Cpu, Layers, Hammer, Globe } from 'lucide-react';
import { CinematicSequence } from '@/components/cinematic/CinematicSequence';
import { CinematicImage } from '@/components/cinematic/CinematicImage';
import { ContinuousScrubStage } from '@/components/cinematic/ContinuousScrubText';
import { cn } from '@/lib/utils';

export function DiscoverySection() {
  return (
    <CinematicSequence
      id="discovery"
      height="500vh"
      sectionName="discovery"
      globalProgressBase={1.0}
      globalProgressSpan={1.0}
    >
      {(progress) => {
        // Continuous Plate Blending
        const lab1Opacity = Math.max(0, Math.min(0.95, progress < 0.30 ? 0.95 : (0.50 - progress) * 4.75));
        const lab2Opacity = Math.max(0, Math.min(0.92, progress < 0.30 ? 0 : progress < 0.70 ? (progress - 0.30) * 3 : (0.80 - progress) * 9.2));
        const atriumOpacity = Math.max(0, Math.min(0.90, progress < 0.65 ? 0 : (progress - 0.65) * 3.6));

        // Compute active indicator index (0 to 4)
        const activeIdx = Math.min(4, Math.max(0, Math.floor(progress * 5)));

        return (
          <>
            {/* ============================================================ */}
            {/* 1. CINEMATIC CONTINUOUS MULTI-PLATE ENVIRONMENT              */}
            {/* ============================================================ */}
            {/* Base Persistent Plate */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
              <CinematicImage
                src="/images/arass_discovery_lab.jpg"
                alt="ARASS Discovery Base Facility"
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

            {/* Plate 1: Quantum Synthesis Chamber (Stages 01 & 02) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: lab1Opacity }}
            >
              <CinematicImage
                src="/images/arass_discovery_lab.jpg"
                alt="ARASS Discovery Quantum Synthesis Facility"
                progress={progress}
                startProgress={0.0}
                endProgress={0.50}
                transitionType="vertical-wipe"
                scaleFrom={1.00}
                scaleTo={1.22}
                yFrom={0}
                yTo={-3}
              />
            </div>

            {/* Plate 2: Cleanroom Robotics Facility (Stages 03 & 04) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: lab2Opacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_build_lab.jpg"
                alt="ARASS Precision Fabrication Laboratory"
                progress={progress}
                startProgress={0.30}
                endProgress={0.80}
                transitionType="horizontal-wipe"
                scaleFrom={1.04}
                scaleTo={1.22}
                xFrom={-2}
                xTo={2}
              />
            </div>

            {/* Plate 3: Monumental Research Atrium (Stage 05) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: atriumOpacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_atrium.jpg"
                alt="ARASS Research Atrium Infrastructure"
                progress={progress}
                startProgress={0.65}
                endProgress={1.00}
                transitionType="crop-reveal"
                scaleFrom={1.20}
                scaleTo={1.04}
                yFrom={2}
                yTo={-2}
              />
            </div>

            {/* Vignette & Depth Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-10" />

            {/* ============================================================ */}
            {/* 2. PERSISTENT TELEMETRY STAGE INDICATOR (RIGHT EDGE)         */}
            {/* ============================================================ */}
            <div className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 sm:gap-4 items-end z-30 pointer-events-none">
              {['01', '02', '03', '04', '05'].map((num, i) => {
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
              {/* Stage 01: DISCOVER */}
              <ContinuousScrubStage
                id="disc-01"
                progress={progress}
                startProgress={0.0}
                peakStart={0.0}
                peakEnd={0.15}
                endProgress={0.26}
                tag="STAGE 01 // DISCOVER"
                badgeIcon={<Microscope className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['FIND WHAT', 'OTHERS MISS']}
                statement="The journey begins with relentless curiosity at the edge of human knowledge."
                align="center"
              />

              {/* Stage 02: RESEARCH (Overlaps 0.18 -> 0.26 with Stage 01) */}
              <ContinuousScrubStage
                id="disc-02"
                progress={progress}
                startProgress={0.18}
                peakStart={0.25}
                peakEnd={0.35}
                endProgress={0.46}
                tag="STAGE 02 // RESEARCH"
                badgeIcon={<Cpu className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['PROBE FUNDAMENTAL', 'TRUTHS']}
                statement="Investigating quantum engineering, synthetic biology, and autonomous cognitive systems."
                align="left"
              />

              {/* Stage 03: INVENT (Overlaps 0.38 -> 0.46 with Stage 02) */}
              <ContinuousScrubStage
                id="disc-03"
                progress={progress}
                startProgress={0.38}
                peakStart={0.45}
                peakEnd={0.55}
                endProgress={0.66}
                tag="STAGE 03 // INVENT"
                badgeIcon={<Layers className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['SYNTHESIZE NEW', 'CAPABILITIES']}
                statement="Synthesizing new physical and computational principles that transcend theoretical boundaries."
                align="right"
              />

              {/* Stage 04: BUILD (Overlaps 0.58 -> 0.66 with Stage 03) */}
              <ContinuousScrubStage
                id="disc-04"
                progress={progress}
                startProgress={0.58}
                peakStart={0.65}
                peakEnd={0.75}
                endProgress={0.86}
                tag="STAGE 04 // BUILD"
                badgeIcon={<Hammer className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['TURN PRINCIPLES INTO', 'INFRASTRUCTURE']}
                statement="Engineering robust, scalable platforms and securing deep-tech intellectual property."
                align="left"
              />

              {/* Stage 05: IMPACT (Overlaps 0.78 -> 0.86 with Stage 04) */}
              <ContinuousScrubStage
                id="disc-05"
                progress={progress}
                startProgress={0.78}
                peakStart={0.85}
                peakEnd={1.00}
                endProgress={1.00}
                tag="STAGE 05 // IMPACT"
                badgeIcon={<Globe className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['SCALE WHAT MATTERS', 'FOR CENTURIES']}
                statement="Deploying foundational technologies into durable systems that compound across generations."
                align="center"
              />
            </div>
          </>
        );
      }}
    </CinematicSequence>
  );
}
