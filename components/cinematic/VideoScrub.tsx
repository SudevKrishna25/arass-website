'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface VideoScrubProps {
  posterSrc: string;
  videoSrc?: string;
  progress?: number;
  alt?: string;
  className?: string;
}

export function VideoScrub({
  posterSrc,
  videoSrc,
  progress = 0,
  alt = 'ARASS Cinematic Visual Plate',
  className = '',
}: VideoScrubProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || !video.duration) return;

    // Scrub video playback time directly based on scroll progress
    const targetTime = Math.min(video.duration, Math.max(0, progress * video.duration));
    if (Math.abs(video.currentTime - targetTime) > 0.05) {
      video.currentTime = targetTime;
    }
  }, [progress, videoSrc]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#020b18] ${className}`}>
      {/* High-Resolution Poster Plate */}
      <Image
        src={posterSrc}
        alt={alt}
        fill
        priority
        className="object-cover transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `scale(${1.0 + progress * 0.15})` }}
      />

      {/* Optional Video Scrub Layer */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-75 pointer-events-none"
        />
      )}

      {/* Atmospheric Vignette & Film Scanlines */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020914_85%)] pointer-events-none opacity-70" />
    </div>
  );
}
