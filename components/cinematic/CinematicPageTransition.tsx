'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import gsap from 'gsap';

interface TransitionContextType {
  isTransitioning: boolean;
  triggerTransition: (href: string, direction?: 'forward' | 'backward' | 'vertical' | 'center' | 'diagonal') => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  triggerTransition: () => {},
});

export const useCinematicTransition = () => useContext(TransitionContext);

export function CinematicPageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('ARASS // PROTOCOL ROUTE');

  const overlayRef = useRef<HTMLDivElement>(null);
  const bladeTopRef = useRef<HTMLDivElement>(null);
  const bladeBottomRef = useRef<HTMLDivElement>(null);
  const centerRingRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const triggerTransition = useCallback(
    (href: string, direction: 'forward' | 'backward' | 'vertical' | 'center' | 'diagonal' = 'forward') => {
      if (href === pathname || isTransitioning) return;

      setIsTransitioning(true);

      // Determine label based on route
      const cleanName = href.replace('/', '').toUpperCase() || 'INDEX';
      setTransitionText(`ROUTE PROTOCOL // 0x${cleanName}`);

      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);

          // Reveal animation after navigation
          setTimeout(() => {
            const exitTl = gsap.timeline({
              onComplete: () => {
                setIsTransitioning(false);
                if (overlayRef.current) {
                  gsap.set(overlayRef.current, { display: 'none' });
                }
              },
            });

            if (bladeTopRef.current && bladeBottomRef.current) {
              exitTl
                .to(bannerRef.current, {
                  opacity: 0,
                  y: -20,
                  duration: 0.25,
                  ease: 'power2.in',
                })
                .to(
                  [bladeTopRef.current, bladeBottomRef.current],
                  {
                    scaleY: 0,
                    duration: 0.55,
                    ease: 'expo.inOut',
                    stagger: 0.05,
                  },
                  '-=0.1'
                )
                .to(
                  centerRingRef.current,
                  {
                    scale: 1.5,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                  },
                  '-=0.3'
                );
            }
          }, 350);
        },
      });

      if (overlayRef.current) {
        gsap.set(overlayRef.current, { display: 'flex' });
      }

      if (bladeTopRef.current && bladeBottomRef.current && bannerRef.current) {
        gsap.set([bladeTopRef.current, bladeBottomRef.current], { transformOrigin: 'top', scaleY: 0 });
        gsap.set(bannerRef.current, { opacity: 0, y: 20 });
        gsap.set(centerRingRef.current, { scale: 0.6, opacity: 0 });

        tl.to([bladeTopRef.current, bladeBottomRef.current], {
          scaleY: 1,
          duration: 0.45,
          ease: 'power4.inOut',
          stagger: 0.04,
        })
          .to(
            centerRingRef.current,
            {
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: 'back.out(1.7)',
            },
            '-=0.2'
          )
          .to(
            bannerRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            },
            '-=0.2'
          );
      }
    },
    [pathname, isTransitioning, router]
  );

  return (
    <TransitionContext.Provider value={{ isTransitioning, triggerTransition }}>
      {children}

      {/* Cinematic Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9990] pointer-events-none hidden flex-col justify-between items-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Upper Shutter Blade */}
        <div
          ref={bladeTopRef}
          className="w-full h-1/2 bg-[#020b18] border-b border-electric-cyan/30 flex items-end justify-center pb-8"
        />

        {/* Lower Shutter Blade */}
        <div
          ref={bladeBottomRef}
          className="w-full h-1/2 bg-[#020b18] border-t border-electric-cyan/30 flex items-start justify-center pt-8"
        />

        {/* Center Iris & Telemetry Marker */}
        <div
          ref={centerRingRef}
          className="absolute inset-0 m-auto w-36 h-36 rounded-full border border-electric-cyan/40 flex items-center justify-center pointer-events-none"
        >
          <div className="w-24 h-24 rounded-full border border-dashed border-electric-cyan/60 animate-[spin_8s_linear_infinite]" />
          <div className="absolute w-2 h-2 rounded-full bg-electric-cyan" />
        </div>

        {/* Telemetry Route Banner */}
        <div
          ref={bannerRef}
          className="absolute inset-0 m-auto flex flex-col items-center justify-center gap-2 pointer-events-none text-center"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan/80 uppercase">
            ARASS INSTITUTIONAL ROUTE
          </span>
          <span className="text-sm md:text-base font-mono font-semibold tracking-[0.25em] text-primary-text">
            {transitionText}
          </span>
          <span className="text-[9px] font-mono text-secondary-text/60 tracking-widest">
            SYNCHRONIZING TELEMETRY...
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
