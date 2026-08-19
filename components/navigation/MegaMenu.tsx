'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS, NavItem } from '@/lib/site-data';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeItem, setActiveItem] = useState<NavItem>(MAIN_NAV_ITEMS[0]);

  // Lock body scroll when mega menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Institutional Navigation Archive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9900] bg-[#01050d] text-primary-text flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Background Photographic Preview Plate */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.38, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.name}
                  fill
                  priority
                  className="object-cover filter contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#01050d] via-[#01050d]/85 to-[#01050d]/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#01050d] via-transparent to-[#01050d]" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
                ARASS DIRECTORY // MASTER INDEX
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-2 text-xs font-mono tracking-widest text-secondary-text hover:text-electric-cyan px-4 py-2 rounded-full border border-white/10 hover:border-electric-cyan/50 bg-[#020b18]/80 backdrop-blur-md transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-electric-cyan"
              aria-label="Close navigation menu"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 text-electric-cyan" />
            </button>
          </div>

          {/* Main Content Stage */}
          <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 sm:px-12 py-8 overflow-y-auto items-center">
            {/* Primary Chapter Links (Left / Center) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
              <span className="text-[9px] font-mono tracking-[0.35em] text-secondary-text/50 uppercase mb-1 block">
                PRIMARY DIRECTORIES
              </span>
              {MAIN_NAV_ITEMS.map((item) => (
                <div key={item.id} className="group">
                  <PageTransitionLink
                    href={item.href}
                    onClick={onClose}
                    onMouseEnter={() => setActiveItem(item)}
                    cursor="explore"
                    className="flex items-baseline gap-4 sm:gap-6 py-1 text-left transition-all duration-300 focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-mono text-secondary-text/40 group-hover:text-electric-cyan transition-colors duration-300">
                      {item.num}
                    </span>
                    <span className="text-2xl sm:text-4xl xl:text-5xl font-heading font-black tracking-wider text-primary-text/85 group-hover:text-electric-cyan group-hover:translate-x-3 transition-all duration-300">
                      {item.name}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-electric-cyan opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </PageTransitionLink>

                  {/* Sublinks Row */}
                  {item.sublinks && (
                    <div className="hidden sm:flex items-center gap-4 pl-10 pt-1 text-[10px] font-mono text-secondary-text/60">
                      {item.sublinks.map((sub, sIdx) => (
                        <PageTransitionLink
                          key={sIdx}
                          href={sub.href}
                          onClick={onClose}
                          className="hover:text-electric-cyan transition-colors"
                        >
                          • {sub.name}
                        </PageTransitionLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column: Active Destination Preview & Contact Gateway */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 py-4 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-12">
              {/* Active Item Overview */}
              <div className="space-y-3 hidden sm:block bg-[#020b18]/80 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                <span className="text-[9px] font-mono tracking-widest text-electric-cyan uppercase border border-electric-cyan/30 px-2.5 py-0.5 rounded bg-electric-cyan/5 inline-block">
                  ACTIVE PREVIEW // {activeItem.num}
                </span>
                <h3 className="text-xl font-heading font-bold text-white tracking-wide">
                  {activeItem.title}
                </h3>
                <p className="text-xs font-sans text-secondary-text leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              {/* Specialized Secondary Directory Links */}
              <div>
                <span className="text-[9px] font-mono tracking-[0.35em] text-secondary-text/50 uppercase mb-3 block">
                  SPECIALIZED DOMAINS
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {SECONDARY_NAV_ITEMS.map((item) => (
                    <PageTransitionLink
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setActiveItem(item)}
                      cursor="link"
                      className="group flex flex-col p-3 rounded-xl bg-[#020b18]/70 border border-white/5 hover:border-electric-cyan/40 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono text-secondary-text/50 group-hover:text-electric-cyan transition-colors">
                          {item.num}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-electric-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider text-white group-hover:text-electric-cyan transition-colors">
                        {item.name}
                      </span>
                    </PageTransitionLink>
                  ))}
                </div>
              </div>

              {/* Start a Project Protocol Action */}
              <div>
                <PageTransitionLink
                  href="/contact"
                  onClick={onClose}
                  cursor="explore"
                  className="group relative flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/50 hover:bg-electric-cyan/20 transition-all duration-300 shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-widest text-electric-cyan uppercase">
                      INITIATE COMMISSION
                    </span>
                    <span className="text-sm font-mono font-bold tracking-widest text-white group-hover:text-electric-cyan transition-colors">
                      START A PROJECT ↗
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-electric-cyan transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </PageTransitionLink>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="relative z-10 flex flex-wrap items-center justify-between px-6 sm:px-12 py-4 border-t border-white/10 text-[9px] font-mono text-secondary-text/50 tracking-widest uppercase">
            <span>ARASS DIGITAL SYSTEMS</span>
            <span className="hidden sm:inline">WE DON&apos;T FOLLOW THE FUTURE. WE BUILD IT.</span>
            <span>2026 // ALL RIGHTS RESERVED</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
