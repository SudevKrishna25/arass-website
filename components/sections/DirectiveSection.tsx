'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { CinematicSequence } from '@/components/cinematic/CinematicSequence';
import { CinematicImage } from '@/components/cinematic/CinematicImage';
import { ContinuousScrubStage } from '@/components/cinematic/ContinuousScrubText';
import { cn } from '@/lib/utils';

export function DirectiveSection() {
  const handleOpenInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('arass:open-inquiry'));
    }
  };

  return (
    <CinematicSequence
      id="directive"
      height="500vh"
      sectionName="directive"
      globalProgressBase={5.0}
      globalProgressSpan={1.0}
    >
      {(progress) => {
        const activeIdx = Math.min(3, Math.max(0, Math.floor(progress * 4)));

        return (
          <>
            {/* ============================================================ */}
            {/* 1. CINEMATIC CONTINUOUS OCEAN MONOLITH ENVIRONMENT           */}
            {/* ============================================================ */}
            <CinematicImage
              src="/images/arass_directive_cinematic_bg.jpg"
              alt="ARASS Sanctuary Monolith Directive Plate"
              progress={progress}
              startProgress={0.0}
              endProgress={1.0}
              transitionType="pan-zoom"
              scaleFrom={1.00}
              scaleTo={1.22}
              xFrom={0}
              xTo={-2}
              yFrom={0}
              yTo={-4}
            />

            {/* Depth Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/85 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-radial-vignette opacity-55 pointer-events-none z-10" />

            {/* ============================================================ */}
            {/* 2. PERSISTENT TELEMETRY STAGE INDICATOR (RIGHT EDGE)         */}
            {/* ============================================================ */}
            <div className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 sm:gap-4 items-end z-30 pointer-events-none">
              {['01', '02', '03', '04'].map((num, i) => {
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
              {/* Stage 01: DIRECTIVE INTRO */}
              <ContinuousScrubStage
                id="dir-01"
                progress={progress}
                startProgress={0.0}
                peakStart={0.0}
                peakEnd={0.16}
                endProgress={0.28}
                tag="SECTION 06 // THE ARASS DIRECTIVE"
                badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['THE ARASS', 'DIRECTIVE']}
                statement="A mandate for long-term technological sovereignty and century-scale civilization building."
                align="center"
              />

              {/* Stage 02: SOVEREIGNTY (Overlaps 0.20 -> 0.28 with Stage 01) */}
              <ContinuousScrubStage
                id="dir-02"
                progress={progress}
                startProgress={0.20}
                peakStart={0.30}
                peakEnd={0.42}
                endProgress={0.54}
                tag="DIRECTIVE PRINCIPLE // SOVEREIGNTY"
                badgeIcon={<Compass className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['INDEPENDENT', 'RESEARCH']}
                statement="Free from short-term market cycles, focused purely on foundational breakthroughs that redefine what is possible."
                align="left"
              />

              {/* Stage 03: EXECUTION (Overlaps 0.44 -> 0.54 with Stage 02) */}
              <ContinuousScrubStage
                id="dir-03"
                progress={progress}
                startProgress={0.44}
                peakStart={0.54}
                peakEnd={0.66}
                endProgress={0.78}
                tag="DIRECTIVE PRINCIPLE // EXECUTION"
                badgeIcon={<Sparkles className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['CENTURY-SCALE', 'ARCHITECTURE']}
                statement="Building durable institutional systems designed to compound scientific discovery across generations."
                align="right"
              />

              {/* Stage 04: THE FINAL MANDATE (Overlaps 0.68 -> 0.78 with Stage 03) */}
              <ContinuousScrubStage
                id="dir-04"
                progress={progress}
                startProgress={0.68}
                peakStart={0.78}
                peakEnd={1.00}
                endProgress={1.00}
                tag="THE FINAL MANDATE"
                badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['THE FUTURE IS NOT GIVEN.', 'IT IS BUILT.']}
                statement="We invite strategic capital, visionary founders, and elite researchers to build what comes next with ARASS."
                align="center"
              >
                <div className="mt-4">
                  <button
                    onClick={handleOpenInquiry}
                    className="group relative inline-flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-background bg-electric-cyan hover:bg-electric-cyan/90 font-bold px-9 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(0,212,255,0.6)] hover:shadow-[0_0_50px_rgba(0,212,255,0.9)] hover:scale-105 cursor-pointer"
                  >
                    <span>BUILD WITH ARASS</span>
                    <ArrowUpRight className="w-4 h-4 text-background transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </ContinuousScrubStage>
            </div>
          </>
        );
      }}
    </CinematicSequence>
  );
}
