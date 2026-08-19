'use client';

import React, { useRef, useEffect } from 'react';
import { useWorldState } from '@/context/WorldStateContext';

/**
 * AtmosphericCanvas: 2D HTML5 Canvas particulate layer with subtle velocity reaction.
 * Strictly 0 3D, 0 WebGL, 0 meshes.
 */
export default function AtmosphericCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { stateRef } = useWorldState();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle atmospheric dust particles (microscopic 2D points)
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.3,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -Math.random() * 0.25 - 0.05,
      opacity: Math.random() * 0.35 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const { mouseX, mouseY } = stateRef.current;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.speedX + mouseX * 0.05;
        p.y += p.speedY + mouseY * 0.05;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stateRef]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Subtle Atmospheric 2D Canvas Particulates (0 3D Models) */}
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />

      {/* Cinematic Film Grain Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] pointer-events-none mix-blend-overlay" />
    </div>
  );
}
