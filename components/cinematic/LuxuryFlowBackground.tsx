'use client';

import React, { useRef, useEffect } from 'react';

interface LuxuryFlowBackgroundProps {
  scrollProgress?: number;
  className?: string;
  intensity?: number;
}

export function LuxuryFlowBackground({
  scrollProgress = 0,
  className = '',
  intensity = 1.0,
}: LuxuryFlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    speed: 0,
    lastX: 0.5,
    lastY: 0.5,
  });
  const scrollRef = useRef({ current: 0, target: 0, velocity: 0 });

  useEffect(() => {
    scrollRef.current.target = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // =========================================================================
    // LUXURY FLOW PARTICLES & VOLUMETRIC STREAM WEBS
    // =========================================================================
    const SPARKLE_COUNT = 70;
    const sparkles = Array.from({ length: SPARKLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.45 - 0.1,
      color: Math.random() > 0.35 ? '#00d4ff' : '#f59e0b',
      alpha: Math.random() * 0.6 + 0.2,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    // Multi-harmonic flowing bezier ribbons
    const RIBBONS = [
      {
        baseY: 0.38,
        amplitude: 65,
        wavelength: 0.0018,
        speed: 0.012,
        colorStart: 'rgba(0, 212, 255, 0.18)',
        colorMid: 'rgba(0, 150, 255, 0.08)',
        colorEnd: 'rgba(1, 5, 13, 0)',
        lineWidth: 2.2,
        phase: 0,
      },
      {
        baseY: 0.52,
        amplitude: 85,
        wavelength: 0.0014,
        speed: 0.009,
        colorStart: 'rgba(245, 158, 11, 0.12)',
        colorMid: 'rgba(0, 212, 255, 0.06)',
        colorEnd: 'rgba(1, 5, 13, 0)',
        lineWidth: 1.8,
        phase: Math.PI * 0.6,
      },
      {
        baseY: 0.68,
        amplitude: 55,
        wavelength: 0.0022,
        speed: 0.015,
        colorStart: 'rgba(0, 240, 255, 0.14)',
        colorMid: 'rgba(30, 58, 138, 0.07)',
        colorEnd: 'rgba(1, 5, 13, 0)',
        lineWidth: 1.5,
        phase: Math.PI * 1.2,
      },
    ];

    let clock = 0;

    const render = () => {
      clock += 0.014;

      // Mouse easing
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.06;
      m.y += (m.targetY - m.y) * 0.06;
      const dx = m.x - m.lastX;
      const dy = m.y - m.lastY;
      m.speed = Math.sqrt(dx * dx + dy * dy);
      m.lastX = m.x;
      m.lastY = m.y;

      // Scroll easing
      const s = scrollRef.current;
      const diff = s.target - s.current;
      s.current += diff * 0.08;
      s.velocity = Math.abs(diff) * 20;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Volumetric Luxury Light Pool (Follows cursor smoothly)
      const mousePxX = m.x * width;
      const mousePxY = m.y * height;
      const auraRad = Math.min(width, height) * (0.45 + Math.sin(clock * 0.8) * 0.04);

      const auraGrad = ctx.createRadialGradient(
        mousePxX,
        mousePxY,
        15,
        mousePxX,
        mousePxY,
        auraRad
      );
      auraGrad.addColorStop(0, `rgba(0, 212, 255, ${0.1 * intensity})`);
      auraGrad.addColorStop(0.35, `rgba(14, 165, 233, ${0.04 * intensity})`);
      auraGrad.addColorStop(0.7, 'rgba(1, 5, 13, 0.01)');
      auraGrad.addColorStop(1, 'rgba(1, 5, 13, 0)');

      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Flowing Quantum Beziers & Undulating Ribbons
      RIBBONS.forEach((ribbon, idx) => {
        ctx.beginPath();
        const yOffset = (ribbon.baseY + (m.y - 0.5) * 0.12 - s.current * 0.3) * height;
        const currentPhase = ribbon.phase + clock * ribbon.speed * (1 + s.velocity * 0.5);

        ctx.moveTo(0, yOffset);

        const step = 20;
        for (let x = 0; x <= width + step; x += step) {
          const wave1 = Math.sin(x * ribbon.wavelength + currentPhase) * ribbon.amplitude;
          const wave2 = Math.cos(x * ribbon.wavelength * 1.8 - currentPhase * 0.7) * (ribbon.amplitude * 0.35);
          const mouseDistY = Math.exp(-Math.pow((x - mousePxX) / (width * 0.28), 2)) * 30 * (m.y - 0.5);

          const curY = yOffset + wave1 + wave2 + mouseDistY;

          if (x === 0) {
            ctx.moveTo(x, curY);
          } else {
            ctx.lineTo(x, curY);
          }
        }

        // Stroke luminous gradient
        const ribbonGrad = ctx.createLinearGradient(0, yOffset - 50, width, yOffset + 50);
        ribbonGrad.addColorStop(0, 'rgba(0, 212, 255, 0)');
        ribbonGrad.addColorStop(0.2, ribbon.colorStart);
        ribbonGrad.addColorStop(0.5, ribbon.colorMid);
        ribbonGrad.addColorStop(0.8, ribbon.colorStart);
        ribbonGrad.addColorStop(1, 'rgba(0, 212, 255, 0)');

        ctx.strokeStyle = ribbonGrad;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.stroke();

        // Delicate glow pass
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 12 * intensity;
        ctx.lineWidth = ribbon.lineWidth * 0.6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 3. Floating Luxury Photonic Sparkles
      sparkles.forEach((p) => {
        p.x += p.vx + (m.x - 0.5) * 0.4;
        p.y += p.vy - s.velocity * 0.8;
        p.phase += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const pulseAlpha = Math.max(0.1, p.alpha * (0.6 + Math.sin(p.phase) * 0.4) * intensity);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = pulseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Starburst cross-flare for larger particles
        if (p.size > 1.8) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2.5, p.y);
          ctx.lineTo(p.x + p.size * 2.5, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2.5);
          ctx.lineTo(p.x, p.y + p.size * 2.5);
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 will-change-transform ${className}`}
    />
  );
}
