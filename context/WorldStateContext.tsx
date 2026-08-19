'use client';

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';
import { ARASSWorldState, SectionId } from '@/lib/world-state';

interface WorldStateContextType {
  stateRef: React.MutableRefObject<ARASSWorldState>;
  setWorldState: (newState: Partial<ARASSWorldState>) => void;
  activeSection: SectionId;
  sectionProgress: number;
  globalProgress: number;
}

const SECTION_IDS: SectionId[] = [
  'hero',
  'discovery',
  'ecosystem',
  'frontier',
  'horizon',
  'directive',
];

const defaultState: ARASSWorldState = {
  globalProgress: 0,
  normalizedProgress: 0,
  activeSection: 'hero',
  sectionProgress: 0,
  scrollVelocity: 0,
  scrollDirection: 0,
  mouseX: 0,
  mouseY: 0,
  pointerVelocity: 0,
  isMobile: false,
  reducedMotion: false,
};

const WorldStateContext = createContext<WorldStateContextType | null>(null);

export function WorldStateProvider({ children }: { children: React.ReactNode }) {
  const stateRef = useRef<ARASSWorldState>({ ...defaultState });
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [sectionProgress, setSectionProgress] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  // Mouse tracking references
  const lastMousePos = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  const setWorldState = useCallback((newState: Partial<ARASSWorldState>) => {
    const current = stateRef.current;

    if (newState.globalProgress !== undefined) {
      current.globalProgress = newState.globalProgress;
      current.normalizedProgress = Math.max(0, Math.min(1, newState.globalProgress / 6));
    }
    if (newState.sectionProgress !== undefined) {
      current.sectionProgress = newState.sectionProgress;
    }
    if (newState.scrollVelocity !== undefined) {
      current.scrollVelocity = newState.scrollVelocity;
    }
    if (newState.scrollDirection !== undefined) {
      current.scrollDirection = newState.scrollDirection;
    }
    if (newState.mouseX !== undefined) {
      current.mouseX = newState.mouseX;
    }
    if (newState.mouseY !== undefined) {
      current.mouseY = newState.mouseY;
    }
    if (newState.isMobile !== undefined) {
      current.isMobile = newState.isMobile;
    }
    if (newState.reducedMotion !== undefined) {
      current.reducedMotion = newState.reducedMotion;
    }

    // Update React state only when coarse section changes to avoid re-rendering entire tree
    if (newState.activeSection !== undefined && newState.activeSection !== current.activeSection) {
      current.activeSection = newState.activeSection;
      setActiveSection(newState.activeSection);
    }
  }, []);

  // Global Mouse, Resize, and Reduced Motion Listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Reduced Motion Detection
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.reducedMotion = motionMedia.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      stateRef.current.reducedMotion = e.matches;
    };
    motionMedia.addEventListener('change', handleMotionChange);

    // 2. Mobile Viewport Detection
    const handleResize = () => {
      const isMob = window.innerWidth < 768;
      stateRef.current.isMobile = isMob;
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // 3. Pointer & Velocity Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      const now = performance.now();
      const dt = Math.max(1, now - lastMousePos.current.time) / 1000;
      const dx = normX - lastMousePos.current.x;
      const dy = normY - lastMousePos.current.y;
      const vel = Math.sqrt(dx * dx + dy * dy) / dt;

      stateRef.current.mouseX = normX;
      stateRef.current.mouseY = normY;
      stateRef.current.pointerVelocity = Math.min(vel, 10);

      lastMousePos.current = { x: normX, y: normY, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      motionMedia.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <WorldStateContext.Provider
      value={{
        stateRef,
        setWorldState,
        activeSection,
        sectionProgress,
        globalProgress,
      }}
    >
      {children}
    </WorldStateContext.Provider>
  );
}

export function useWorldState() {
  const context = useContext(WorldStateContext);
  if (!context) {
    throw new Error('useWorldState must be used within a WorldStateProvider');
  }
  return context;
}
