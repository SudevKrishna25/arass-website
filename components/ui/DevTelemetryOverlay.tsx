'use client';

import React, { useState, useEffect } from 'react';
import { useWorldState } from '@/context/WorldStateContext';

export function DevTelemetryOverlay() {
  const { stateRef } = useWorldState();
  const [visible, setVisible] = useState(false);
  const [snapshot, setSnapshot] = useState({
    globalProgress: 0,
    activeSection: 'hero',
    sectionProgress: 0,
    scrollVelocity: 0,
    mouseX: 0,
    mouseY: 0,
    fps: 60,
  });

  useEffect(() => {
    // Only enabled in development or toggled with Shift+D
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
      setVisible(false); // Default hidden, toggled via Shift+D
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKey);

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const updateTelemetry = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 500) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;

        const current = stateRef.current;
        setSnapshot({
          globalProgress: current.globalProgress,
          activeSection: current.activeSection,
          sectionProgress: current.sectionProgress,
          scrollVelocity: current.scrollVelocity,
          mouseX: current.mouseX,
          mouseY: current.mouseY,
          fps,
        });
      }
      animId = requestAnimationFrame(updateTelemetry);
    };

    animId = requestAnimationFrame(updateTelemetry);

    return () => {
      window.removeEventListener('keydown', handleKey);
      cancelAnimationFrame(animId);
    };
  }, [stateRef]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-auto p-3.5 rounded-xl bg-[#020b18]/90 border border-electric-cyan/30 backdrop-blur-md text-[10px] font-mono text-secondary-text shadow-[0_0_20px_rgba(0,212,255,0.15)] flex flex-col gap-1.5 min-w-[220px]">
      <div className="flex items-center justify-between text-electric-cyan font-bold pb-1 border-b border-white/10">
        <span>ARASS TELEMETRY ENGINE</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-electric-cyan/20">{snapshot.fps} FPS</span>
      </div>
      <div className="flex justify-between">
        <span>GLOBAL PROGRESS:</span>
        <span className="text-white font-bold">{snapshot.globalProgress.toFixed(3)} / 6.0</span>
      </div>
      <div className="flex justify-between">
        <span>ACTIVE SECTION:</span>
        <span className="text-electric-cyan uppercase font-bold">{snapshot.activeSection}</span>
      </div>
      <div className="flex justify-between">
        <span>SECTION PROGRESS:</span>
        <span className="text-white">{(snapshot.sectionProgress * 100).toFixed(1)}%</span>
      </div>
      <div className="flex justify-between">
        <span>SCROLL VELOCITY:</span>
        <span className="text-white">{Math.round(snapshot.scrollVelocity)} px/s</span>
      </div>
      <div className="flex justify-between">
        <span>NORMALIZED MOUSE:</span>
        <span className="text-white">
          X: {snapshot.mouseX >= 0 ? `+${snapshot.mouseX.toFixed(2)}` : snapshot.mouseX.toFixed(2)} | Y:{' '}
          {snapshot.mouseY >= 0 ? `+${snapshot.mouseY.toFixed(2)}` : snapshot.mouseY.toFixed(2)}
        </span>
      </div>
      <div className="text-[8px] text-secondary-text/50 pt-1 text-center">
        Toggle with [Shift + D]
      </div>
    </div>
  );
}
