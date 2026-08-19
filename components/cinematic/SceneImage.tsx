'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SceneImageProps {
  src: string;
  alt: string;
  progress: number;
  startProgress?: number;
  endProgress?: number;
  scaleFrom?: number;
  scaleTo?: number;
  translateYFrom?: number;
  translateYTo?: number;
  opacity?: number;
  priority?: boolean;
  className?: string;
}

export function SceneImage({
  src,
  alt,
  progress,
  startProgress = 0,
  endProgress = 1,
  scaleFrom = 1.0,
  scaleTo = 1.15,
  translateYFrom = 0,
  translateYTo = -25,
  opacity = 1.0,
  priority = false,
  className,
}: SceneImageProps) {
  // Normalize local segment progress
  const range = Math.max(0.0001, endProgress - startProgress);
  const localT = Math.max(0, Math.min(1, (progress - startProgress) / range));

  const scale = scaleFrom + (scaleTo - scaleFrom) * localT;
  const translateY = translateYFrom + (translateYTo - translateYFrom) * localT;

  return (
    <div
      className={cn('absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-700 ease-out', className)}
      style={{ opacity }}
    >
      <div
        className="relative w-full h-full transform-gpu will-change-transform"
        style={{
          transform: `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center filter contrast-[1.08] brightness-[0.92]"
        />
      </div>
    </div>
  );
}
