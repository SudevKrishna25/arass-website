'use client';

import React from 'react';
import Image from 'next/image';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, Shield, Cpu, Zap, Globe, Sparkles, Building2, Layers } from 'lucide-react';

const CHAPTER_LINKS = [
  { name: 'MISSION', href: '/mission', desc: 'The Institutional Mandate' },
  { name: 'DISCOVERY', href: '/discovery', desc: 'Continuous Experimental Engine' },
  { name: 'ECOSYSTEM', href: '/ecosystem', desc: 'One Engine. Six Systems.' },
  { name: 'FRONTIER', href: '/frontier', desc: 'Physical Sanctuaries & Fellowship' },
  { name: 'HORIZON', href: '/horizon', desc: 'Planetary Infrastructure' },
  { name: 'DIRECTIVE', href: '/directive', desc: 'Articles of Sovereignty' },
  { name: 'VENTURES', href: '/ventures', desc: 'Autonomous Enterprise Factory' },
  { name: 'LABS', href: '/labs', desc: '6 Specialized Research Facilities' },
  { name: 'TECHNOLOGIES', href: '/technologies', desc: '2D Hardware Schematics' },
  { name: 'INSIGHTS', href: '/insights', desc: 'Strategic Intelligence Archive' },
];

export function HomeInstitutionalShowcase() {
  return (
    <section className="relative w-full bg-[#020914] text-primary-text border-t border-electric-cyan/30 overflow-hidden">
      {/* 1. Full-Bleed Grand Institutional Monolith Backdrop */}
      <div className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-24 px-6 sm:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_institutional_monolith.jpg"
            alt="ARASS Sovereign Deep Tech Institution Headquarters"
            fill
            priority
            className="object-cover brightness-65 contrast-125"
          />
          {/* Cinematic Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-[#020914]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020914] via-transparent to-[#020914]" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70" />
        </div>

        {/* Foreground Showcase Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-electric-cyan/50 bg-[#020b18]/90 backdrop-blur-xl text-[10px] sm:text-xs font-mono tracking-[0.3em] text-electric-cyan uppercase shadow-[0_0_25px_rgba(0,212,255,0.25)]">
            <Building2 className="w-4 h-4 text-electric-cyan" />
            ARASS HEADQUARTERS // SOVEREIGN RESEARCH CITADEL
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[0.98] text-primary-text">
            WHERE SCIENCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              MEETS SOVEREIGNTY.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-sans text-white/90 font-light leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            An independent, permanent technology institution uniting world-class physicists,
            extreme-environment engineers, and sovereign capital to safeguard the next century.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <PageTransitionLink
              href="/contact"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all duration-300 hover:scale-105"
            >
              <span>ENTER INSTITUTIONAL TRANSMISSION</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>

            <PageTransitionLink
              href="/mission"
              cursor="link"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 hover:border-electric-cyan/60 bg-[#020b18]/80 text-secondary-text hover:text-electric-cyan font-mono text-xs tracking-widest transition-all"
            >
              <span>READ THE MANDATE</span>
            </PageTransitionLink>
          </div>
        </div>
      </div>

      {/* 2. Comprehensive Institutional Directory & Navigation Matrix */}
      <div className="relative z-10 py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] text-electric-cyan uppercase block">
              INSTITUTIONAL DIRECTORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-primary-text">
              Complete Archival Navigation
            </h3>
          </div>
          <span className="text-xs font-mono text-secondary-text/60 tracking-widest uppercase">
            100% PURE CINEMATIC INTERPOLATION // ZERO 3D
          </span>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CHAPTER_LINKS.map((item, idx) => (
            <PageTransitionLink
              key={item.name}
              href={item.href}
              cursor="link"
              className="group p-4 rounded-xl bg-[#020b18]/70 border border-white/5 hover:border-electric-cyan/50 transition-all duration-300 flex flex-col justify-between space-y-2 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-electric-cyan font-bold">0{idx + 1}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-electric-cyan opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold tracking-wider text-primary-text group-hover:text-electric-cyan transition-colors uppercase">
                  {item.name}
                </div>
                <div className="text-[10px] font-sans text-secondary-text/60 pt-0.5">{item.desc}</div>
              </div>
            </PageTransitionLink>
          ))}
        </div>

        {/* Institutional Footer Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-[9px] font-mono text-secondary-text/50 tracking-widest uppercase">
          <span>ARASS // SOVEREIGN TECHNOLOGY INSTITUTION</span>
          <span>DISCIPLINE • SOVEREIGNTY • CENTURY IMPACT</span>
          <span>2026-2076 // ALL SOVEREIGN RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
}
