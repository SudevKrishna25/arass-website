'use client';

import React from 'react';
import { Globe, Cpu, Atom, Zap, HeartPulse, Sparkles } from 'lucide-react';
import { CinematicSequence } from '@/components/cinematic/CinematicSequence';
import { CinematicImage } from '@/components/cinematic/CinematicImage';
import { ContinuousScrubStage } from '@/components/cinematic/ContinuousScrubText';
import { cn } from '@/lib/utils';

export function HorizonSection() {
  return (
    <CinematicSequence
      id="horizon"
      height="500vh"
      sectionName="horizon"
      globalProgressBase={4.0}
      globalProgressSpan={1.0}
    >
      {(progress) => {
        const activeIdx = Math.min(5, Math.max(0, Math.floor(progress * 6)));

        return (
          <>
            {/* ============================================================ */}
            {/* 1. CINEMATIC CONTINUOUS PLANETARY HORIZON ENVIRONMENT         */}
            {/* ============================================================ */}
            <CinematicImage
              src="/images/arass_horizon_cinematic_bg.jpg"
              alt="ARASS Planetary Horizon Plate"
              progress={progress}
              startProgress={0.0}
              endProgress={1.0}
              transitionType="zoom-through"
              scaleFrom={1.00}
              scaleTo={1.35}
              xFrom={0}
              xTo={-2}
              yFrom={0}
              yTo={-4}
            />

            {/* Subtle Atmospheric Energy Conduits */}
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
                id="horiz-00"
                progress={progress}
                startProgress={0.0}
                peakStart={0.0}
                peakEnd={0.12}
                endProgress={0.22}
                tag="SECTION 05 // THE PLANETARY HORIZON"
                badgeIcon={<Globe className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['THE PLANETARY', 'HORIZON']}
                statement="The technologies we build today become the foundational infrastructure of tomorrow."
                align="center"
              />

              {/* Stage 01: DEEP INTELLIGENCE (Overlaps 0.14 -> 0.22 with Stage 00) */}
              <ContinuousScrubStage
                id="horiz-01"
                progress={progress}
                startProgress={0.14}
                peakStart={0.22}
                peakEnd={0.30}
                endProgress={0.40}
                tag="HORIZON 01 // COMPUTATION"
                badgeIcon={<Cpu className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['DEEP', 'INTELLIGENCE']}
                statement="Cognitive systems operating at planetary scale, synthesizing scientific breakthroughs and automating foundational discovery."
                align="left"
              />

              {/* Stage 02: SYNTHETIC MATTER (Overlaps 0.32 -> 0.40 with Stage 01) */}
              <ContinuousScrubStage
                id="horiz-02"
                progress={progress}
                startProgress={0.32}
                peakStart={0.40}
                peakEnd={0.48}
                endProgress={0.58}
                tag="HORIZON 02 // MATERIALS"
                badgeIcon={<Atom className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['SYNTHETIC', 'MATTER']}
                statement="Atomic precision engineering, quantum metamaterials, and self-healing structures designed for extreme environments."
                align="right"
              />

              {/* Stage 03: ENERGY DENSITY (Overlaps 0.50 -> 0.58 with Stage 02) */}
              <ContinuousScrubStage
                id="horiz-03"
                progress={progress}
                startProgress={0.50}
                peakStart={0.58}
                peakEnd={0.66}
                endProgress={0.76}
                tag="HORIZON 03 // INFRASTRUCTURE"
                badgeIcon={<Zap className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ENERGY', 'DENSITY']}
                statement="Abundant, zero-carbon compact fusion, solid-state storage, and planetary energy distribution grids."
                align="left"
              />

              {/* Stage 04: BIO-GENESIS (Overlaps 0.68 -> 0.76 with Stage 03) */}
              <ContinuousScrubStage
                id="horiz-04"
                progress={progress}
                startProgress={0.68}
                peakStart={0.76}
                peakEnd={0.84}
                endProgress={0.92}
                tag="HORIZON 04 // BIOLOGY"
                badgeIcon={<HeartPulse className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['BIO-GENESIS', 'CELLULAR SCALE']}
                statement="Cellular rejuvenation, synthetic genomics, and precision molecular medicine safeguarding human longevity."
                align="right"
              />

              {/* Stage 05: PLANETARY HARMONY (Overlaps 0.82 -> 0.92 with Stage 04) */}
              <ContinuousScrubStage
                id="horiz-05"
                progress={progress}
                startProgress={0.82}
                peakStart={0.90}
                peakEnd={1.00}
                endProgress={1.00}
                tag="HORIZON 05 // CIVILIZATION"
                badgeIcon={<Sparkles className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['PLANETARY', 'HARMONY']}
                statement="Closed-loop atmospheric remediation, autonomous ecological networks, and multi-century resilience."
                align="center"
              />
            </div>
          </>
        );
      }}
    </CinematicSequence>
  );
}
