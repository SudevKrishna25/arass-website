'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type TransitionType =
  | 'horizontal-wipe'
  | 'vertical-wipe'
  | 'diagonal-wipe'
  | 'center-expansion'
  | 'clip-inset'
  | 'zoom-through'
  | 'blur-focus'
  | 'crop-reveal'
  | 'pan-zoom';

export interface CinematicImageProps {
  src: string;
  alt: string;
  progress: number;
  startProgress?: number;
  endProgress?: number;
  transitionType?: TransitionType;
  scaleFrom?: number;
  scaleTo?: number;
  xFrom?: number;
  xTo?: number;
  yFrom?: number;
  yTo?: number;
  opacityFrom?: number;
  opacityTo?: number;
  blurFrom?: number;
  blurTo?: number;
  brightnessFrom?: number;
  brightnessTo?: number;
  priority?: boolean;
  className?: string;
}

export function CinematicImage({
  src,
  alt,
  progress,
  startProgress = 0,
  endProgress = 1,
  transitionType = 'pan-zoom',
  scaleFrom = 1.0,
  scaleTo = 1.18,
  xFrom = 0,
  xTo = -2,
  yFrom = 0,
  yTo = -4,
  opacityFrom = 1,
  opacityTo = 1,
  blurFrom = 0,
  blurTo = 0,
  brightnessFrom = 1,
  brightnessTo = 1,
  priority = false,
  className,
}: CinematicImageProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Normalize progress to local segment range [0, 1]
  const range = Math.max(0.0001, endProgress - startProgress);
  const localT = Math.max(0, Math.min(1, (progress - startProgress) / range));

  // Compute base transformations
  let currentScale = prefersReducedMotion ? 1.0 : scaleFrom + (scaleTo - scaleFrom) * localT;
  let currentX = prefersReducedMotion ? 0 : xFrom + (xTo - xFrom) * localT;
  let currentY = prefersReducedMotion ? 0 : yFrom + (yTo - yFrom) * localT;
  let currentOpacity = opacityFrom + (opacityTo - opacityFrom) * localT;
  let currentBlur = prefersReducedMotion ? 0 : blurFrom + (blurTo - blurFrom) * localT;
  let currentBrightness = brightnessFrom + (brightnessTo - brightnessFrom) * localT;
  let clipPath: string | undefined = undefined;

  // Gentle, optical transitions (max 4-6px blur)
  if (transitionType === 'zoom-through') {
    currentScale = prefersReducedMotion ? 1.0 : scaleFrom + (scaleTo - scaleFrom) * Math.pow(localT, 1.15);
    if (localT > 0.85) {
      currentOpacity = Math.max(0.15, (1 - localT) / 0.15);
      currentBlur = prefersReducedMotion ? 0 : (localT - 0.85) * 6;
    }
  } else if (transitionType === 'vertical-wipe') {
    const wipeBottom = Math.max(0, (1 - localT * 1.3) * 100);
    clipPath = `polygon(0% 0%, 100% 0%, 100% ${(100 - wipeBottom).toFixed(2)}%, 0% ${(100 - wipeBottom).toFixed(2)}%)`;
  } else if (transitionType === 'horizontal-wipe') {
    const wipeRight = Math.min(100, localT * 130);
    clipPath = `polygon(0% 0%, ${wipeRight.toFixed(2)}% 0%, ${wipeRight.toFixed(2)}% 100%, 0% 100%)`;
  } else if (transitionType === 'diagonal-wipe') {
    const dTop = Math.min(130, localT * 150);
    const dBottom = Math.max(0, (localT - 0.12) * 150);
    clipPath = `polygon(0% 0%, ${dTop.toFixed(1)}% 0%, ${dBottom.toFixed(1)}% 100%, 0% 100%)`;
  } else if (transitionType === 'center-expansion') {
    const halfWidth = Math.min(50, localT * 60);
    clipPath = `inset(0% ${(50 - halfWidth).toFixed(1)}% 0% ${(50 - halfWidth).toFixed(1)}%)`;
  } else if (transitionType === 'clip-inset') {
    const insetY = Math.max(0, (1 - localT * 1.3) * 16);
    clipPath = `inset(${insetY.toFixed(1)}% 0% ${insetY.toFixed(1)}% 0%)`;
  } else if (transitionType === 'blur-focus') {
    if (!prefersReducedMotion) {
      if (localT < 0.20) {
        currentBlur = (0.20 - localT) * 20;
      } else if (localT > 0.80) {
        currentBlur = (localT - 0.80) * 20;
      }
    }
  } else if (transitionType === 'crop-reveal') {
    currentX = prefersReducedMotion ? 0 : (1 - localT) * 25;
    const crop = Math.max(0, (1 - localT * 1.2) * 12);
    clipPath = `inset(${crop.toFixed(1)}% ${crop.toFixed(1)}% ${crop.toFixed(1)}% ${crop.toFixed(1)}%)`;
  }

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-300 ease-out',
        className
      )}
      style={{
        opacity: Math.max(0, Math.min(1, currentOpacity)),
        clipPath,
      }}
    >
      <div
        className="relative w-full h-full transform-gpu will-change-transform"
        style={{
          transform: `scale(${currentScale.toFixed(4)}) translate(${currentX.toFixed(2)}%, ${currentY.toFixed(2)}%)`,
          filter: `blur(${currentBlur.toFixed(1)}px) brightness(${currentBrightness.toFixed(2)}) contrast(1.08)`,
          transition: prefersReducedMotion ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease-out',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
