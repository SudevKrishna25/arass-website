'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MegaMenu } from './MegaMenu';
import { PageTransitionLink } from '@/components/cinematic/PageTransitionLink';

const PRIMARY_NAV_LINKS = [
  { name: 'WORK', href: '/work' },
  { name: 'SOLUTIONS', href: '/services' },
  { name: 'PRODUCTS', href: '/work' },
  { name: 'LAB', href: '/labs' },
  { name: 'COMPANY', href: '/about' },
  { name: 'INSIGHTS', href: '/insights' },
  { name: 'EVENTS', href: '/events' },
];

export function GlobalNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 30);

      // Intelligent header hide on scroll down, show on scroll up
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 transition-all duration-500 pointer-events-auto',
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        )}
      >
        <div
          className={cn(
            'max-w-7xl mx-auto rounded-full transition-all duration-500 px-4 sm:px-6 py-2 flex items-center justify-between',
            scrolled
              ? 'bg-[#01050d]/90 backdrop-blur-xl border border-electric-cyan/25 shadow-[0_8px_32px_rgba(0,0,0,0.85)]'
              : 'bg-transparent border border-transparent'
          )}
        >
          {/* ARASS Brand Wordmark Logo */}
          <PageTransitionLink
            href="/"
            cursor="link"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-electric-cyan rounded-sm shrink-0"
            aria-label="ARASS Home"
          >
            <div className="relative w-28 sm:w-32 md:w-36 h-8 sm:h-9 md:h-10 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/brand/arass-logo.png"
                alt="ARASS Logo"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_15px_rgba(0,212,255,0.45)]"
              />
            </div>
          </PageTransitionLink>

          {/* Clean Primary Navigation Links (WORK, SOLUTIONS, PRODUCTS, LAB, COMPANY, INSIGHTS) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {PRIMARY_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <PageTransitionLink
                  key={link.name}
                  href={link.href}
                  cursor="link"
                  className={cn(
                    'text-[11px] font-mono tracking-[0.22em] transition-colors duration-300 relative group py-1 uppercase focus:outline-none',
                    isActive
                      ? 'text-electric-cyan font-bold'
                      : 'text-white/80 hover:text-electric-cyan'
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[1.5px] bg-electric-cyan transition-all duration-300',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </PageTransitionLink>
              );
            })}
          </nav>

          {/* Right Actions: START A PROJECT + Editorial Menu Drawer */}
          <div className="flex items-center gap-3 shrink-0">
            <PageTransitionLink
              href="/contact"
              cursor="explore"
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-background bg-electric-cyan hover:bg-white px-4 sm:px-5 py-1.5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.7)] hover:scale-105"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-background" />
            </PageTransitionLink>

            {/* Menu Drawer Toggle Button */}
            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="explore"
              data-testid="menu-toggle-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 hover:border-electric-cyan/60 bg-[#020b18]/80 text-white/80 hover:text-electric-cyan text-[10px] sm:text-xs font-mono tracking-widest transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-electric-cyan"
              aria-label="Open directory MENU"
              aria-expanded={menuOpen}
            >
              <Menu className="w-3.5 h-3.5 text-electric-cyan" />
              <span className="font-semibold hidden sm:inline">MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Width Editorial Mega Menu */}
      <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
