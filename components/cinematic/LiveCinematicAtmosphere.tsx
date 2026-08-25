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
    const NODE_COUNT = 55;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.0 + 0.8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.4 - 0.15,
      baseOpacity: Math.random() * 0.5 + 0.25,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.015,
    }));

    let auraTime = 0;
    let scannerY = 0;

    const render = () => {
      // Smooth mouse interpolation with soft inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const scrollDiff = scrollRef.current.target - scrollRef.current.current;
      scrollRef.current.current += scrollDiff * 0.08;
      scrollRef.current.velocity = Math.abs(scrollDiff) * 35;

      ctx.clearRect(0, 0, width, height);

      // 1. Interactive Dynamic Ambient Light Aura (follows mouse with organic breathing)
      auraTime += 0.018;
      const mousePixelX = mouseRef.current.x * width;
      const mousePixelY = mouseRef.current.y * height;
      const breathRadius = Math.min(width, height) * (0.42 + Math.sin(auraTime) * 0.05);

      const radGrad = ctx.createRadialGradient(
        mousePixelX,
        mousePixelY,
        20,
        mousePixelX,
        mousePixelY,
        breathRadius
      );
      radGrad.addColorStop(0, 'rgba(0, 212, 255, 0.12)');
      radGrad.addColorStop(0.3, 'rgba(0, 150, 255, 0.05)');
      radGrad.addColorStop(0.7, 'rgba(1, 5, 13, 0.015)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. High-Tech Holographic Scanner Sweep Line
      scannerY = (scannerY + 1.2 + scrollRef.current.velocity * 0.5) % (height + 150);
      const scanGrad = ctx.createLinearGradient(0, scannerY - 80, 0, scannerY);
      scanGrad.addColorStop(0, 'rgba(0, 212, 255, 0)');
      scanGrad.addColorStop(0.85, 'rgba(0, 212, 255, 0.04)');
      scanGrad.addColorStop(1, 'rgba(0, 212, 255, 0.12)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scannerY - 80, width, 80);

      ctx.strokeStyle = 'rgba(0, 212, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scannerY);
      ctx.lineTo(width, scannerY);
      ctx.stroke();

      // 3. Interactive Filaments between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.22;
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 4. Render Nodes & Floating Motion with Mouse Gravitation
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.phase += node.pulseSpeed;

        // Subtle mouse pull
        const mdx = mousePixelX - node.x;
        const mdy = mousePixelY - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200 && mDist > 5) {
          node.x += (mdx / mDist) * 0.35;
          node.y += (mdy / mDist) * 0.35;
        }

        node.x += node.vx;
        node.y += node.vy - scrollRef.current.velocity * 0.25;

        if (node.y < -20) node.y = height + 20;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;

        const currentOpacity = node.baseOpacity + Math.sin(node.phase) * 0.2;

        // Node Glow Halo
        ctx.fillStyle = `rgba(0, 212, 255, ${(currentOpacity * 0.4).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2.5, 0, Math.PI * 2);
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
