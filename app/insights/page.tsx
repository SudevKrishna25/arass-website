'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { INSIGHTS_DATA, InsightArticle } from '@/lib/site-data';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';
import { ArrowUpRight, X, FileText, Bookmark, Share2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function InsightsPage() {
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_insights_fusion.jpg"
            alt="ARASS Intelligence Archive"
            fill
            priority
            className="object-cover brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        <TechnicalOverlay
          sectionCode="INT-10"
          stageName="INTELLIGENCE ARCHIVE"
          coordinates="46.2044° N, 6.1432° E"
          classification="TECHNICAL PAPERS // PUBLIC ARCHIVE"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 10 // INTELLIGENCE ARCHIVE
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-primary-text">
            ARASS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]">
              INTELLIGENCE
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Institutional research dossiers, technoeconomic evaluations, and long-horizon briefings
            published by ARASS scientists and research directors.
          </p>
        </div>
      </section>

      {/* 02: Editorial Briefing Archive List */}
      <section className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase block">
              RESEARCH REPOSITORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-text">
              Selected Briefings ({INSIGHTS_DATA.length})
            </h2>
          </div>
          <span className="text-xs font-mono text-secondary-text/60 tracking-widest hidden sm:inline">
            SELECT ARTICLE TO EXPAND FULL DOSSIER
          </span>
        </div>

        {/* Large Editorial Article Rows */}
        <div className="space-y-10">
          {INSIGHTS_DATA.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              data-cursor="explore"
              className="group relative rounded-2xl overflow-hidden border border-electric-cyan/20 hover:border-electric-cyan/70 bg-[#020b18] transition-all duration-500 cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px] items-center">
                {/* Visual */}
                <div className="lg:col-span-5 relative h-56 lg:h-full overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108 brightness-75 contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#020b18]/40 to-[#020b18]" />

                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded bg-[#020b18]/80 border border-electric-cyan/30 text-[9px] font-mono text-electric-cyan tracking-widest uppercase backdrop-blur-md">
                    <span>{article.number}</span>
                    <span>//</span>
                    <span>{article.domain}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-secondary-text/60 uppercase">
                      <span>{article.date}</span>
                      <span className="text-electric-cyan font-bold">{article.readTime}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-black text-primary-text group-hover:text-electric-cyan transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs font-mono text-secondary-text/80">{article.subtitle}</p>

                    <p className="text-xs sm:text-sm font-sans text-secondary-text leading-relaxed pt-2 line-clamp-3">
                      {article.abstract}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-electric-cyan pt-2 border-t border-white/5">
                    <span className="tracking-widest uppercase">READ FULL BRIEFING ↗</span>
                    <span className="text-secondary-text/60">{article.author.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03: Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9950] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#020b18] border border-electric-cyan/40 rounded-2xl p-6 sm:p-12 shadow-[0_0_90px_rgba(0,212,255,0.25)] text-primary-text space-y-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase border border-electric-cyan/30 px-2 py-0.5 rounded bg-electric-cyan/5">
                    {selectedArticle.classification}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text pt-2 leading-tight">
                    {selectedArticle.title}
                  </h2>
                  <p className="text-sm font-mono text-secondary-text">{selectedArticle.subtitle}</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-secondary-text/70 pt-1">
                    <span>BY {selectedArticle.author.name} ({selectedArticle.author.institution})</span>
                    <span>•</span>
                    <span>{selectedArticle.date}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full border border-white/10 hover:border-electric-cyan text-secondary-text hover:text-electric-cyan transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Abstract Callout */}
              <div className="p-6 rounded-xl bg-[#020914] border-l-4 border-electric-cyan space-y-2">
                <span className="text-[9px] font-mono text-electric-cyan tracking-widest uppercase font-bold">
                  EXECUTIVE ABSTRACT
                </span>
                <p className="text-sm sm:text-base font-sans text-primary-text/90 leading-relaxed">
                  {selectedArticle.abstract}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedArticle.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#020914] border border-electric-cyan/20">
                    <div className="text-[8px] font-mono text-secondary-text/60 uppercase mb-1">
                      {m.label}
                    </div>
                    <div className="text-base font-mono font-bold text-electric-cyan">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Pull Quote */}
              <div className="py-6 px-8 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/40 text-center space-y-2">
                <p className="text-lg sm:text-xl font-heading italic text-primary-text font-bold">
                  &ldquo;{selectedArticle.pullQuote}&rdquo;
                </p>
              </div>

              {/* Article Sections */}
              <div className="space-y-8">
                {selectedArticle.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-xl font-heading font-bold text-electric-cyan tracking-wide">
                      {section.heading}
                    </h3>
                    <p className="text-sm sm:text-base font-sans text-secondary-text leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* References */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-[10px] font-mono text-secondary-text/60 uppercase tracking-widest block">
                  ACADEMIC & INSTITUTIONAL REFERENCES
                </span>
                <ul className="space-y-1.5">
                  {selectedArticle.references.map((ref, idx) => (
                    <li key={idx} className="text-xs font-mono text-secondary-text/80">
                      [{idx + 1}] {ref}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <span className="text-[9px] font-mono text-secondary-text/50 uppercase tracking-widest">
                  ARASS INTELLIGENCE ARCHIVE // UNCLASSIFIED
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 04: Chapter Progression */}
      <section className="relative py-24 text-center px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-electric-cyan uppercase">
            SECURE ACCESS GATEWAY
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-primary-text">
            INITIATE INSTITUTIONAL TRANSMISSION
          </h2>
          <div className="pt-4 flex justify-center">
            <PageTransitionLink
              href="/contact"
              cursor="explore"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all hover:scale-105"
            >
              <span>ENTER INSTITUTIONAL ACCESS</span>
              <ArrowUpRight className="w-4 h-4" />
            </PageTransitionLink>
          </div>
        </div>
      </section>
    </div>
  );
}
