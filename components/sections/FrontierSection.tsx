'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, ShieldCheck, Microscope, Cpu, Layers } from 'lucide-react';
import { CinematicSequence } from '@/components/cinematic/CinematicSequence';
import { CinematicImage } from '@/components/cinematic/CinematicImage';
import { ContinuousScrubStage } from '@/components/cinematic/ContinuousScrubText';
import { cn } from '@/lib/utils';

export function FrontierSection() {
  const handleOpenInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('arass:open-inquiry'));
    }
  };

  return (
    <CinematicSequence
      id="frontier"
      height="500vh"
      sectionName="frontier"
      globalProgressBase={3.0}
      globalProgressSpan={1.0}
    >
      {(progress) => {
        // Continuous Plate Opacities
        const exteriorOpacity = Math.max(0, Math.min(0.95, progress < 0.50 ? 0.92 : progress > 0.82 ? 0.95 : (0.60 - progress) * 9.2));
        const labOpacity = Math.max(0, Math.min(0.92, progress < 0.45 ? 0 : progress < 0.70 ? (progress - 0.45) * 4.6 : (0.78 - progress) * 11.5));
        const atriumOpacity = Math.max(0, Math.min(0.90, progress < 0.65 ? 0 : progress < 0.88 ? (progress - 0.65) * 4.5 : (0.94 - progress) * 15.0));

        const activeIdx = Math.min(5, Math.max(0, Math.floor(progress * 6)));

        return (
          <>
            {/* ============================================================ */}
            {/* 1. CINEMATIC CONTINUOUS MULTI-PLATE ENVIRONMENT              */}
            {/* ============================================================ */}
            {/* Persistent Base Campus Underlay */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
              <CinematicImage
                src="/images/arass_frontier_cinematic_bg.jpg"
                alt="ARASS Frontier Base Campus"
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

            {/* Plate 1: Exterior Technology Institute */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: exteriorOpacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_cinematic_bg.jpg"
                alt="ARASS Frontier Institute Campus"
                progress={progress}
                startProgress={0.0}
                endProgress={1.0}
                transitionType="zoom-through"
                scaleFrom={1.00}
                scaleTo={1.22}
                yFrom={0}
                yTo={-3}
                priority
              />
            </div>

            {/* Plate 2: Cleanroom Robotics Facility (BUILD) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: labOpacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_build_lab.jpg"
                alt="ARASS Frontier Cleanroom Facility"
                progress={progress}
                startProgress={0.45}
                endProgress={0.78}
                transitionType="horizontal-wipe"
                scaleFrom={1.12}
                scaleTo={1.00}
                xFrom={-2}
                xTo={2}
              />
            </div>

            {/* Plate 3: Monumental Research Atrium (FRONTIER) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: atriumOpacity }}
            >
              <CinematicImage
                src="/images/arass_frontier_atrium.jpg"
                alt="ARASS Research Atrium Infrastructure"
                progress={progress}
                startProgress={0.65}
                endProgress={0.94}
                transitionType="diagonal-wipe"
                scaleFrom={1.02}
                scaleTo={1.18}
                yFrom={2}
                yTo={-2}
              />
            </div>

            {/* Subtle Infrastructure Light Lines on Connect Stage */}
            {progress >= 0.30 && progress < 0.60 && (
              <div className="absolute inset-0 pointer-events-none z-10 opacity-70">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line
                    x1="22%"
                    y1="68%"
                    x2="50%"
                    y2="46%"
                    stroke="#00D4FF"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    className="animate-pulse"
                    opacity="0.6"
                  />
                  <line
                    x1="50%"
                    y1="46%"
                    x2="78%"
                    y2="62%"
                    stroke="#00D4FF"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    className="animate-pulse"
                    opacity="0.6"
                  />
                </svg>
              </div>
            )}

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
                id="front-00"
                progress={progress}
                startProgress={0.0}
                peakStart={0.0}
                peakEnd={0.12}
                endProgress={0.22}
                tag="SECTION 04 // THE ARASS FRONTIER"
                badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['THE GATEWAY', 'INTO THE SYSTEM']}
                statement="Opening the ARASS technological ecosystem to exceptional researchers, inventors, founders, and institutions."
                align="center"
              />

              {/* Stage 01: DISCOVER (Overlaps 0.14 -> 0.22 with Stage 00) */}
              <ContinuousScrubStage
                id="front-01"
                progress={progress}
                startProgress={0.14}
                peakStart={0.22}
                peakEnd={0.30}
                endProgress={0.40}
                tag="FRONTIER STAGE 01 // DISCOVER"
                badgeIcon={<Microscope className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['FIND THE', 'EXCEPTIONAL']}
                statement="Ideas begin with people who see possibilities others don't. We identify individuals working at the true frontier of deep technology."
                align="left"
              />

              {/* Stage 02: CONNECT (Overlaps 0.32 -> 0.40 with Stage 01) */}
              <ContinuousScrubStage
                id="front-02"
                progress={progress}
                startProgress={0.32}
                peakStart={0.40}
                peakEnd={0.48}
                endProgress={0.58}
                tag="FRONTIER STAGE 02 // CONNECT"
                badgeIcon={<Cpu className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['BRING MINDS', 'TOGETHER']}
                statement="Researchers, engineers, founders, institutions and capital converge into an integrated operational fabric."
                align="center"
              />

              {/* Stage 03: BUILD (Overlaps 0.50 -> 0.58 with Stage 02) */}
              <ContinuousScrubStage
                id="front-03"
                progress={progress}
                startProgress={0.50}
                peakStart={0.58}
                peakEnd={0.66}
                endProgress={0.76}
                tag="FRONTIER STAGE 03 // BUILD"
                badgeIcon={<Layers className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['TURN POSSIBILITY', 'INTO REALITY']}
                statement="Research becomes technology. Technology becomes intellectual property. Intellectual property becomes ventures."
                align="right"
              />

              {/* Stage 04: FRONTIER (Overlaps 0.68 -> 0.76 with Stage 03) */}
              <ContinuousScrubStage
                id="front-04"
                progress={progress}
                startProgress={0.68}
                peakStart={0.76}
                peakEnd={0.84}
                endProgress={0.92}
                tag="FRONTIER STAGE 04 // FRONTIER"
                badgeIcon={<Sparkles className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['ENTER THE', 'SYSTEM']}
                statement="ARASS is building an institution for people who intend to shape what comes next."
                align="left"
              />

              {/* Stage 05: OPEN CALL (Overlaps 0.82 -> 0.92 with Stage 04) */}
              <ContinuousScrubStage
                id="front-05"
                progress={progress}
                startProgress={0.82}
                peakStart={0.90}
                peakEnd={1.00}
                endProgress={1.00}
                tag="FRONTIER STAGE 05 // OPEN CALL"
                badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />}
                lines={['BUILD WITH', 'ARASS']}
                statement="Researchers. Founders. Engineers. Inventors. Institutions. If you are building something that belongs to the future, we want to hear from you."
                align="center"
              >
                <div className="mt-4">
                  <button
                    onClick={handleOpenInquiry}
                    className="group relative inline-flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-background bg-electric-cyan hover:bg-electric-cyan/90 font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:shadow-[0_0_45px_rgba(0,212,255,0.85)] hover:scale-105 cursor-pointer"
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
