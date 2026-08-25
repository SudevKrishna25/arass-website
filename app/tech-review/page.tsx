'use client';

import React, { useRef, useEffect } from 'react';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { TECH_REVIEWS_DATA } from '@/lib/site-data';
import { Award, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechReviewPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Card entry animation
    const cards = containerRef.current.querySelectorAll('.review-card');
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate progress bars inside cards
      const bars = card.querySelectorAll('.rubric-progress');
      bars.forEach((bar) => {
        const targetWidth = bar.getAttribute('data-width') || '100%';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: targetWidth,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#01050d] text-primary-text min-h-screen selection:bg-electric-cyan selection:text-background flex flex-col justify-between">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        <TechnicalOverlay
          sectionCode="AUD-10"
          stageName="TECHNOLOGY AUDIT"
          coordinates="47.3769° N, 8.5417° E"
          classification="VERIFIABLE AUDITS // PUBLIC RELATIONS"
        />

        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ARASS VERIFIABLE AUDIT LEDGER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
            SYSTEMS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]">
              EVALUATION AUDIT
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-sans text-white/70 font-light leading-relaxed">
            Independent technoeconomic evaluations, peer-review scores, and Technology Readiness Level (TRL) audits for primary ARASS operating divisions.
          </p>
        </div>

        {/* Audit Cards Grid */}
        <section className="space-y-10">
          {TECH_REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="review-card group p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#020b18]/85 backdrop-blur-2xl transition-all duration-500 hover:border-electric-cyan/40 space-y-6 shadow-2xl"
            >
              {/* Card Title & General Stats */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-electric-cyan/20 text-electric-cyan">
                      {rev.code}
                    </span>
                    <span className="text-[10px] font-mono text-white/50">AUDITED {rev.lastAudited}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-electric-cyan transition-colors">
                    {rev.name}
                  </h2>
                  <div className="text-xs font-mono text-white/60">{rev.domain}</div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-center p-3 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div className="text-[8px] font-mono text-white/40">READINESS LEVEL</div>
                    <div className="text-lg font-mono font-bold text-electric-cyan">TRL-{rev.trl}</div>
                  </div>

                  <div className="text-center p-3 rounded-2xl bg-white/[0.02] border border-white/10">
                    <div className="text-[8px] font-mono text-white/40">AUDIT GRADE</div>
                    <div className="text-lg font-mono font-bold text-emerald-400">{rev.rating}</div>
                  </div>
                </div>
              </div>

              {/* Summary and Evaluation Rubrics */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-mono tracking-wider text-white/50 uppercase">AUDITOR EXECUTIVE SUMMARY</h3>
                  <p className="text-xs sm:text-sm font-sans text-white/80 font-light leading-relaxed">
                    {rev.summary}
                  </p>

                  <div className="p-4 rounded-2xl border border-white/5 bg-[#01050d]/60 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="font-mono text-[11px] text-white/80">
                      Assessed by: <span className="text-white font-bold">{rev.assessor}</span>
                    </div>
                  </div>
                </div>

                {/* Score Rubrics */}
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="text-xs font-mono tracking-wider text-white/50 uppercase flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-electric-cyan" />
                    <span>METRIC VALIDATION SCORES</span>
                  </h3>

                  <div className="space-y-4 font-mono text-[11px]">
                    {rev.evaluationRubrics.map((rubric, idx) => {
                      const percent = Math.round((rubric.score / rubric.maxScore) * 100);
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between text-white/85">
                            <span>{rubric.rubricName}</span>
                            <span className="text-electric-cyan font-bold">{rubric.score}/{rubric.maxScore}</span>
                          </div>
                          
                          {/* Progress track */}
                          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="rubric-progress h-full bg-gradient-to-r from-electric-cyan to-white rounded-full"
                              data-width={`${percent}%`}
                            />
                          </div>

                          <div className="text-[9px] text-white/40 font-sans leading-relaxed">
                            {rubric.feedback}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Technical Directory Transition */}
        <section className="p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-[#020b18]/60 to-transparent text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              VERIFY HARDWARE SCHEMATICS
            </h2>
            <p className="text-xs font-sans text-white/70 font-light">
              Review full topological blueprints, computational mesh configurations, and 2D circuit models.
            </p>
          </div>
          
          <div className="pt-2">
            <PageTransitionLink
              href="/technologies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
            >
              <span>EXPLORE SYSTEMS BLUEPRINTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </PageTransitionLink>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#01050d] py-8 text-center text-xs font-mono text-white/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>ARASS // AUDIT AND TECHNOLOGY VERIFICATION LEDGER</div>
          <div className="flex items-center gap-4 text-white/40">
            <span>© 2026 ARASS</span>
            <PageTransitionLink href="/insights" className="text-electric-cyan hover:underline">
              Read Briefings
            </PageTransitionLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
