'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useSmoothScroll } from '@/components/animation/SmoothScrollProvider';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#opencall') {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('arass:open-inquiry'));
      }
      return;
    }

    if (href === '#hero') {
      scrollTo(0);
    } else if (href === '#discovery') {
      const disc = document.getElementById('discovery');
      if (disc) {
        const discSpacer = disc.parentElement?.classList.contains('pin-spacer') ? disc.parentElement : disc;
        const discTop = discSpacer.getBoundingClientRect().top + window.scrollY;
        scrollTo(discTop);
      } else {
        scrollTo(1980);
      }
    } else if (href === '#frontier') {
      const front = document.getElementById('frontier');
      if (front) {
        const frontSpacer = front.parentElement?.classList.contains('pin-spacer') ? front.parentElement : front;
        const frontTop = frontSpacer.getBoundingClientRect().top + window.scrollY;
        scrollTo(frontTop);
      }
    } else if (href === '#horizon') {
      const horiz = document.getElementById('horizon');
      if (horiz) {
        const horizSpacer = horiz.parentElement?.classList.contains('pin-spacer') ? horiz.parentElement : horiz;
        const horizTop = horizSpacer.getBoundingClientRect().top + window.scrollY;
        scrollTo(horizTop);
      }
    } else if (href === '#directive') {
      const direct = document.getElementById('directive');
      if (direct) {
        const directSpacer = direct.parentElement?.classList.contains('pin-spacer') ? direct.parentElement : direct;
        const directTop = directSpacer.getBoundingClientRect().top + window.scrollY;
        scrollTo(directTop);
      }
    } else {
      const eco = document.getElementById('ecosystem');
      if (eco) {
        const ecoSpacer = eco.parentElement?.classList.contains('pin-spacer') ? eco.parentElement : eco;
        const ecoTop = ecoSpacer.getBoundingClientRect().top + window.scrollY;
        const ecoDistance = 4050;

        let pct = 0;
        if (href === '#labs') pct = 0.30;
        else if (href === '#technologies') pct = 0.40;
        else if (href === '#ventures') pct = 0.60;
        else if (href === '#insights') pct = 0.88;

        scrollTo(ecoTop + ecoDistance * pct);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-500 pointer-events-auto">
      <div
        className={cn(
          'max-w-7xl mx-auto rounded-full transition-all duration-500 px-4 sm:px-6 py-2.5 flex items-center justify-between',
          scrolled
            ? 'bg-[#020b18]/75 backdrop-blur-xl border border-electric-cyan/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-[#020b18]/30 backdrop-blur-md border border-white/5'
        )}
      >
        {/* ARASS Brand Identity Header */}
        <Link
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-electric-cyan rounded-sm shrink-0"
          aria-label="ARASS Home"
        >
          <div className="relative w-24 sm:w-28 md:w-36 h-6 sm:h-7 md:h-8 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/brand/arass-logo.png"
              alt="ARASS Logo"
              fill
              priority
              className="object-contain filter drop-shadow-[0_0_15px_rgba(0,212,255,0.45)]"
            />
          </div>
        </Link>

        {/* Minimal Luxury Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[10px] xl:text-[11px] font-mono tracking-[0.2em] text-secondary-text/80 hover:text-electric-cyan transition-colors duration-300 relative group py-1 uppercase focus:outline-none focus:text-electric-cyan"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-electric-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Primary Action Protocol Button */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <span className="hidden md:inline-flex items-center gap-2 text-[9px] font-mono text-electric-cyan/80 tracking-widest uppercase" aria-label="System Status Online">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            ONLINE
          </span>
          <button
            onClick={(e) => handleNavClick(e, '#opencall')}
            className="group relative inline-flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-electric-cyan border border-electric-cyan/40 hover:border-electric-cyan bg-[#020b18]/60 hover:bg-electric-cyan/15 px-4 py-1.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.15)] focus:outline-none focus:ring-1 focus:ring-electric-cyan cursor-pointer"
          >
            <span>OPEN CALL</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-electric-cyan" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-secondary-text hover:text-electric-cyan focus:outline-none focus:ring-1 focus:ring-electric-cyan rounded-md relative z-30 shrink-0 cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-drawer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-x-4 top-20 z-40 bg-[#020b18]/95 backdrop-blur-2xl rounded-2xl p-6 flex flex-col gap-5 border border-electric-cyan/30 shadow-2xl"
            >
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs font-mono tracking-widest text-secondary-text hover:text-electric-cyan transition-colors py-2 border-b border-white/5 uppercase focus:outline-none focus:text-electric-cyan"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <button
                onClick={(e) => handleNavClick(e, '#opencall')}
                className="w-full text-center text-xs font-mono tracking-widest text-background bg-electric-cyan font-bold py-3 rounded-full shadow-cyan-glow focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
              >
                OPEN CALL →
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
