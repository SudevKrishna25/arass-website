'use client';

import React from 'react';
import Image from 'next/image';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, ShieldCheck, Compass, Users, Globe } from 'lucide-react';

const PRINCIPLES = [
  {
    num: '01',
    title: 'PERMANENT AMBITION',
    desc: 'We operate on multi-decade horizons rather than quarterly cycles, building critical computing, software, and experiential foundations.',
  },
  {
    num: '02',
    title: 'DETERMINISTIC RIGOR',
    desc: 'Every platform and neural system we engineer is built with mathematical precision, continuous testing, and zero tolerance for mediocrity.',
  },
  {
    num: '03',
    title: 'SOVEREIGN FREEDOM',
    desc: 'We partner with organizations that demand absolute technological sovereignty, IP ownership, and independent operating capability.',
  },
];

const GLOBAL_HUBS = [
  { city: 'GENEVA', role: 'Headquarters & Governance', country: 'Switzerland' },
  { city: 'ZURICH', role: 'Quantum & AI Systems Lab', country: 'Switzerland' },
  { city: 'LONDON', role: 'Digital Experience Studio', country: 'United Kingdom' },
  { city: 'SAN FRANCISCO', role: 'Software & Autonomous Systems', country: 'United States' },
];

export default function AboutPage() {
  return (
    <div className="relative w-full bg-[#01060f] text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_institutional_monolith.jpg"
            alt="ARASS Institution"
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
          sectionCode="ABT-03"
          stageName="ABOUT THE INSTITUTION"
          coordinates="46.2044° N, 6.1432° E"
          classification="FOUNDATIONAL OVERVIEW // COMMERCIAL CREDIBILITY"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            ABOUT ARASS // WHO WE ARE
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-white">
            WE ENGINEER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.5)]">
              WHAT THE FUTURE REQUIRES.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            ARASS is a global technology and digital experience company inventing, prototyping, and scaling next-generation AI systems, sovereign software, and cinematic web products.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO READ ABOUT OUR PHILOSOPHY</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Core Philosophy & Identity */}
      <section className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
              THE ARASS MANDATE
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white leading-tight">
              A Living Matrix of Science, Engineering, and Design.
            </h2>
            <p className="text-xs sm:text-sm md:text-base font-sans text-secondary-text leading-relaxed font-light">
              We exist to restore multi-decade deep technological ambition. We reject superficial software arbitrage in favor of uncompromising technical craftsmanship — combining advanced AI intelligence, deterministic software architecture, and unforgettable sensory experiences.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden border border-electric-cyan/25 bg-[#020b18] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/arass_mission_infrastructure.jpg"
              alt="ARASS Physical Lab"
              fill
              className="object-cover brightness-50 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01060f] via-transparent to-transparent opacity-80" />
          </div>
        </div>

        {/* 3 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="p-8 rounded-2xl bg-[#020b18] border border-white/10 space-y-4">
              <span className="text-2xl font-mono font-black text-electric-cyan">{p.num}</span>
              <h3 className="text-lg font-heading font-bold text-white">{p.title}</h3>
              <p className="text-xs font-sans text-secondary-text leading-relaxed font-light">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Global Operating Hubs */}
        <div className="border-t border-white/10 pt-16 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase block mb-1">
                GLOBAL FOOTPRINT
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Physical Research & Engineering Hubs
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GLOBAL_HUBS.map((hub) => (
              <div key={hub.city} className="p-5 rounded-xl bg-[#020b18]/80 border border-electric-cyan/20 space-y-2">
                <div className="text-xs font-mono font-bold text-electric-cyan">{hub.city}</div>
                <div className="text-sm font-heading font-bold text-white">{hub.role}</div>
                <div className="text-xs font-mono text-secondary-text/70">{hub.country}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03: Contact Banner */}
      <section className="relative py-20 text-center px-6 border-t border-white/10 overflow-hidden bg-[#020b18]/60">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white leading-tight">
            PARTNER WITH ARASS.
          </h2>
          <p className="text-secondary-text max-w-xl mx-auto text-xs sm:text-sm font-sans font-light">
            Connect with our leadership and engineering directors to discuss potential partnerships or new venture builds.
          </p>

          <div className="pt-2 flex justify-center">
            <PageTransitionLink
              href="/contact"
              cursor="explore"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_25px_rgba(0,212,255,0.7)] transition-all duration-300 hover:scale-105"
            >
              <span>INITIATE CONTACT</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
