'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface ScrollVideoProps {
  posterSrc: string;
  videoSrc?: string;
  progress?: number;
  alt?: string;
  className?: string;
  scaleFrom?: number;
  scaleTo?: number;
  overlayOpacity?: number;
}

export function ScrollVideo({
  posterSrc,
  videoSrc,
  progress = 0,
  alt = 'ARASS Live Visual Environment',
  className = '',
  scaleFrom = 1.0,
  scaleTo = 1.25,
  overlayOpacity = 0.6,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Seek video currentTime smoothly based on scroll progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded || !video.duration || Number.isNaN(video.duration)) return;

    const targetTime = Math.min(video.duration, Math.max(0, progress * video.duration));
    if (Math.abs(video.currentTime - targetTime) > 0.04) {
      video.currentTime = targetTime;
    }
  }, [progress, videoLoaded]);

  const currentScale = scaleFrom + (scaleTo - scaleFrom) * progress;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#020914] ${className}`}>
      {/* High-Resolution Primary Photographic Base */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: `scale(${currentScale.toFixed(3)})` }}
      >
        <Image
          src={posterSrc}
          alt={alt}
          fill
          priority
          className="object-cover brightness-60 contrast-125"
        />
      </div>

      {/* Live Video Scrub Layer (Active when videoSrc available and loaded) */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none transition-opacity duration-700 ${
            videoLoaded ? 'opacity-80' : 'opacity-0'
          }`}
          style={{ transform: `scale(${currentScale.toFixed(3)})` }}
        />
      )}

      {/* Atmospheric Vignette & Contrast Gradients */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020914_90%)] pointer-events-none opacity-80" />
    </div>
  );
}
