'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Compass } from 'lucide-react';
import { CinematicSequence } from '@/components/cinematic/CinematicSequence';
import { CinematicImage } from '@/components/cinematic/CinematicImage';
import { ContinuousScrubStage } from '@/components/cinematic/ContinuousScrubText';

export function HeroSection() {
  const handleScrollToDiscovery = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const el = document.getElementById('discovery');
      if (el) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(el, { duration: 1.6 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <CinematicSequence
      id="hero"
      height="250vh"
      sectionName="hero"
      globalProgressBase={0.0}
      globalProgressSpan={1.0}
    >
      {(progress) => (
        <>
          {/* ============================================================ */}
          {/* 1. CINEMATIC CONTINUOUS ORBITAL EARTH PLATE                  */}
          {/* ============================================================ */}
          <CinematicImage
            src="/images/arass_hero_earth.jpg"
            alt="ARASS Orbital Frontier Horizon"
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
            priority
          />

          {/* Continuous Discovery Underlay (Zero Seam into Section 02) */}
          {progress > 0.60 && (
            <div
              className="absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
              style={{ opacity: Math.max(0, Math.min(1, (progress - 0.60) * 2.5)) }}
            >
              <CinematicImage
                src="/images/arass_discovery_lab.jpg"
                alt="ARASS Discovery Laboratory"
                progress={progress}
                startProgress={0.60}
                endProgress={1.0}
                transitionType="pan-zoom"
                scaleFrom={1.12}
                scaleTo={1.00}
                yFrom={3}
                yTo={0}
              />
            </div>
          )}

          {/* Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/80 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-10" />

          {/* ============================================================ */}
          {/* 2. MATHEMATICALLY CONTINUOUS OVERLAPPING TYPOGRAPHY           */}
          {/* ============================================================ */}
          <div className="relative h-full w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center z-20 pointer-events-none">
            {/* Stage 1: Hero Main */}
            <ContinuousScrubStage
              id="hero-main"
              progress={progress}
              startProgress={0.0}
              peakStart={0.0}
              peakEnd={0.42}
              endProgress={0.60}
              tag="FOUNDATIONAL TECHNOLOGICAL ECOSYSTEM"
              badgeIcon={<Compass className="w-3.5 h-3.5 text-electric-cyan animate-spin-slow" />}
              lines={["WE DON'T FOLLOW THE FUTURE.", 'WE BUILD IT.']}
              statement="An independent technology ecosystem discovering, researching, and engineering foundational breakthroughs to shape century-scale civilization."
              align="center"
              exitOffset={70}
            >
              <button
                onClick={handleScrollToDiscovery}
                className="group relative inline-flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-background bg-electric-cyan hover:bg-electric-cyan/90 font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,212,255,0.5)] hover:shadow-[0_0_45px_rgba(0,212,255,0.85)] hover:scale-105 cursor-pointer"
              >
                <span>EXPLORE ARASS</span>
                <ArrowDownRight className="w-4 h-4 text-background transition-transform duration-300 group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </ContinuousScrubStage>

            {/* Stage 2: Hero Transition to Discovery (Overlaps 0.45 -> 0.60) */}
            <ContinuousScrubStage
              id="hero-trans"
              progress={progress}
              startProgress={0.46}
              peakStart={0.62}
              peakEnd={0.92}
              endProgress={1.00}
              tag="ENTER THE DISCOVERY CYCLE"
              lines={['WHAT ARASS DISCOVERS', 'AND CREATES']}
              statement="Moving from fundamental scientific inquiry to planetary technological infrastructure."
              align="center"
              exitOffset={70}
            />
          </div>

          {/* Scroll Down Cue */}
          {progress < 0.20 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary-text/60 z-20 pointer-events-none font-mono text-[9px] tracking-[0.3em] uppercase">
              <span>SCROLL TO ENTER</span>
              <div className="w-0.5 h-5 bg-gradient-to-b from-electric-cyan to-transparent animate-pulse" />
            </div>
          )}
        </>
      )}
    </CinematicSequence>
  );
}
