'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicSceneProps {
  id?: string;
  height?: string; // e.g. '350vh'
  background?: React.ReactNode;
  midground?: React.ReactNode;
  overlay?: React.ReactNode;
  typography?: React.ReactNode;
  telemetry?: React.ReactNode;
  className?: string;
  onProgress?: (progress: number) => void;
}

/**
 * CinematicScene: Multi-plane optical depth engine without 3D.
 * Planes:
 * - Background (0.65x speed parallax)
 * - Midground (0.85x speed parallax)
 * - Overlay / SVG Grid (1.05x speed)
 * - Main Typography (1.20x speed)
 * - Telemetry & Micro-details (1.35x speed)
 */
export function CinematicScene({
  id,
  height = '350vh',
  background,
  midground,
  overlay,
  typography,
  telemetry,
  className = '',
  onProgress,
}: CinematicSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          onUpdate: (self) => {
            if (onProgress) onProgress(self.progress);
          },
        },
      });

      // Background Plane (0.65x parallax + subtle scale)
      if (bgRef.current) {
        tl.to(bgRef.current, { yPercent: -15, scale: 1.12, ease: 'none' }, 0);
      }

      // Midground Plate (0.85x parallax)
      if (midRef.current) {
        tl.to(midRef.current, { yPercent: -25, ease: 'none' }, 0);
      }

      // Overlay / Technical Grid (1.05x)
      if (overlayRef.current) {
        tl.to(overlayRef.current, { yPercent: -35, opacity: 0.8, ease: 'none' }, 0);
      }

      // Typography (1.20x parallax + directional drift)
      if (typoRef.current) {
        tl.to(typoRef.current, { yPercent: -45, ease: 'none' }, 0);
      }

      // Telemetry (1.35x parallax)
      if (telemetryRef.current) {
        tl.to(telemetryRef.current, { yPercent: -55, ease: 'none' }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [onProgress]);

  return (
    <section
      ref={containerRef}
      id={id}
      style={{ height }}
      className={cn('relative w-full bg-background text-primary-text overflow-hidden', className)}
    >
      <div className="relative h-screen w-full overflow-hidden">
        {/* Plane 1: Background */}
        {background && (
          <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
            {background}
          </div>
        )}

        {/* Plane 2: Midground Image Plate */}
        {midground && (
          <div ref={midRef} className="absolute inset-0 z-10 will-change-transform pointer-events-none">
            {midground}
          </div>
        )}

        {/* Plane 3: Technical Grid & Reticles */}
        {overlay && (
          <div ref={overlayRef} className="absolute inset-0 z-20 will-change-transform pointer-events-none">
            {overlay}
          </div>
        )}

        {/* Plane 4: Kinetic Typography */}
        {typography && (
          <div ref={typoRef} className="relative z-30 h-full w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center will-change-transform pointer-events-none">
            {typography}
          </div>
        )}

        {/* Plane 5: Telemetry & Micro-annotations */}
        {telemetry && (
          <div ref={telemetryRef} className="absolute inset-0 z-40 will-change-transform pointer-events-none">
            {telemetry}
          </div>
        )}
      </div>
    </section>
  );
}
