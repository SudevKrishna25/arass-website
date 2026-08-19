'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWorldState } from '@/context/WorldStateContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, any>) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

const SECTION_KEYS = ['hero', 'discovery', 'ecosystem', 'frontier', 'horizon', 'directive'] as const;

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { setWorldState, stateRef } = useWorldState();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenisInstance = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(lenisInstance);
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenisInstance;
    }

    // Calculate continuous globalProgress (0.00 to 6.00) from DOM section offsets
    const computeGlobalProgress = (scroll: number) => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return 0;

      // Collect actual DOM section pin-spacer top offsets
      const offsets: number[] = [];
      for (const id of SECTION_KEYS) {
        const el = document.getElementById(id);
        if (el) {
          const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
          const top = spacer.getBoundingClientRect().top + window.scrollY;
          offsets.push(top);
        }
      }

      if (offsets.length === 6) {
        for (let i = 0; i < 5; i++) {
          const start = offsets[i];
          const end = offsets[i + 1];
          if (scroll >= start && scroll < end) {
            const pct = (scroll - start) / Math.max(1, end - start);
            return i + Math.max(0, Math.min(1, pct));
          }
        }
        if (scroll >= offsets[5]) {
          const tail = (scroll - offsets[5]) / Math.max(1, docHeight - offsets[5]);
          return 5 + Math.max(0, Math.min(1, tail));
        }
      }

      // Fallback linear interpolation across 6 sections if DOM elements pending
      return (scroll / docHeight) * 6;
    };

    lenisInstance.on('scroll', (e: { scroll: number; velocity: number; direction: number }) => {
      ScrollTrigger.update();

      const calculatedGlobal = computeGlobalProgress(e.scroll);
      const vel = Math.abs(e.velocity || 0);
      const dir = (e.direction === 1 ? 1 : e.direction === -1 ? -1 : 0) as 1 | -1 | 0;

      // Update state directly in ref for zero-re-render high frequency loops
      stateRef.current.globalProgress = calculatedGlobal;
      stateRef.current.scrollVelocity = vel;
      stateRef.current.scrollDirection = dir;
    });

    const updateGSAP = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(updateGSAP);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGSAP);
      lenisInstance.destroy();
    };
  }, [setWorldState, stateRef]);

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, any>) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
