'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, ShieldCheck, Scale, Compass, Award } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DIRECTIVE_ARTICLES = [
  {
    num: 'ARTICLE 01',
    title: 'THE DISCIPLINE OF PERMANENCE',
    statement: 'BUILT BEYOND MARKET CYCLES.',
    body: 'We reject short-term speculative hype and quarterly earnings cycles. Foundational physics breakthroughs require ten to twenty years of sustained capital and uncompromising scientific freedom. We operate with permanent horizons.',
    icon: Compass,
  },
  {
    num: 'ARTICLE 02',
    title: 'THE IMPERATIVE OF SOVEREIGNTY',
    statement: 'CRITICAL INFRASTRUCTURE MUST BE IMMUNE TO FRAGMENTATION.',
    body: 'True technological sovereignty requires vertical control over materials, foundries, computational fabrics, and energy generation. We engineer entire self-reinforcing ecosystems, not vulnerable single points of failure.',
    icon: ShieldCheck,
  },
  {
    num: 'ARTICLE 03',
    title: 'THE CONVERGENCE OF MINDS & CAPITAL',
    statement: 'EXCEPTIONAL MINDS. PLANETARY CAPITAL.',
    body: 'The rarest asset on Earth is not capital — it is the handful of minds capable of foundational physical insight. We eliminate every bureaucratic friction point so they can do their life’s greatest work.',
    icon: Award,
  },
  {
    num: 'ARTICLE 04',
    title: 'THE RESPONSIBILITY OF IMPACT',
    statement: 'THE FUTURE IS NOT GIVEN. IT IS BUILT.',
    body: 'Technology is not neutral. What we choose to build dictates the trajectory of civilization. We build with sovereign intention, rigorous ethics, and century-scale responsibility.',
    icon: Scale,
  },
];

export default function DirectivePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic slow hero parallax
      gsap.to(heroImageRef.current, {
        scale: 1.2,
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Article cards entrance
      const articles = document.querySelectorAll('.directive-card');
      articles.forEach((art) => {
        gsap.fromTo(
          art,
          { opacity: 0, y: 40, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: art,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival — Monolith Institutional HQ */}
      <section
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12"
      >
        <div ref={heroImageRef} className="absolute inset-0 z-0">
          <Image
            src="/images/arass_directive_monolith_hq.jpg"
            alt="ARASS Directive Monolith Headquarters"
            fill
            priority
            className="object-cover brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        <TechnicalOverlay
          sectionCode="DIR-04"
          stageName="INSTITUTIONAL DIRECTIVE"
          coordinates="46.2044° N, 6.1432° E"
          classification="SOVEREIGN GOVERNANCE // RATIFIED"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 04 // GOVERNANCE
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-primary-text">
            THE ARASS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_40px_rgba(0,212,255,0.5)]">
              DIRECTIVE
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            The foundational principles of discipline, sovereignty, and multi-decade impact governing
            every investment, research program, and venture spin-out.
          </p>

          <div className="pt-3 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase flex items-center justify-center gap-2">
            <span>SCROLL TO READ THE ARTICLES OF GOVERNANCE</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 02: Articles of Governance Sequence */}
      <section className="relative py-28 md:py-40 px-6 sm:px-12 max-w-6xl mx-auto space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {DIRECTIVE_ARTICLES.map((article) => {
            const Icon = article.icon;
            return (
              <div
                key={article.num}
                className="directive-card p-8 sm:p-12 rounded-2xl bg-[#020b18] border border-electric-cyan/30 hover:border-electric-cyan transition-all duration-500 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono font-bold text-electric-cyan tracking-widest uppercase">
                    {article.num}
                  </span>
                  <Icon className="w-5 h-5 text-electric-cyan" />
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-black text-primary-text">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm font-mono text-electric-cyan/90 leading-snug">
                  {article.statement}
                </p>

                <p className="text-sm font-sans text-secondary-text leading-relaxed font-light">
                  {article.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 03: Final Sovereign Declaration & Protocol Access */}
      <section className="relative py-32 md:py-48 text-center px-6 border-t border-white/10 bg-[#020b18]/60 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
            ENTER THE ARASS ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-primary-text leading-tight">
            THE FUTURE IS NOT GIVEN. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan">
              IT IS BUILT.
            </span>
          </h2>
          <p className="text-secondary-text max-w-xl mx-auto text-sm md:text-base font-sans font-light">
            Initiate encrypted communication with our governance leadership and discovery directors.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <PageTransitionLink
              href="/contact"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all duration-300 hover:scale-105"
            >
              <span>BUILD WITH ARASS ↗</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
