'use client';

import React, { useRef, useEffect } from 'react';

interface LiveCinematicAtmosphereProps {
  scrollProgress?: number;
  className?: string;
}

export function LiveCinematicAtmosphere({
  scrollProgress = 0,
  className = '',
}: LiveCinematicAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, isHovering: false });
  const scrollRef = useRef({ current: 0, target: 0, velocity: 0 });

  useEffect(() => {
    scrollRef.current.target = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.targetX = 0.5;
      mouseRef.current.targetY = 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // =========================================================================
    // DUAL-LAYER TELEMETRY NODES & IONIZED PARTICLES
    // =========================================================================
    const NODE_COUNT = 42;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.15,
      baseOpacity: Math.random() * 0.45 + 0.2,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.01,
    }));

    let auraTime = 0;

    const render = () => {
      // Smooth mouse interpolation with soft inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const scrollDiff = scrollRef.current.target - scrollRef.current.current;
      scrollRef.current.current += scrollDiff * 0.08;
      scrollRef.current.velocity = Math.abs(scrollDiff) * 30;

      ctx.clearRect(0, 0, width, height);

      // 1. Interactive Dynamic Ambient Light Aura (follows mouse with organic breathing)
      auraTime += 0.015;
      const mousePixelX = mouseRef.current.x * width;
      const mousePixelY = mouseRef.current.y * height;
      const breathRadius = Math.min(width, height) * (0.38 + Math.sin(auraTime) * 0.04);

      const radGrad = ctx.createRadialGradient(
        mousePixelX,
        mousePixelY,
        15,
        mousePixelX,
        mousePixelY,
        breathRadius
      );
      radGrad.addColorStop(0, 'rgba(0, 212, 255, 0.09)');
      radGrad.addColorStop(0.35, 'rgba(0, 140, 255, 0.035)');
      radGrad.addColorStop(0.7, 'rgba(1, 5, 13, 0.01)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Filaments between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15;
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Render Nodes & Floating Motion
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.phase += node.pulseSpeed;
        node.x += node.vx;
        node.y += node.vy - scrollRef.current.velocity * 0.2;

        if (node.y < -20) node.y = height + 20;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;

        const currentOpacity = node.baseOpacity + Math.sin(node.phase) * 0.18;

        // Node Glow Halo
        ctx.fillStyle = `rgba(0, 212, 255, ${(currentOpacity * 0.35).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Node Core
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 z-[5] pointer-events-none ${className}`}
    />
  );
}
