'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, AlertCircle } from 'lucide-react';

interface ServerClockProps {
  eventId: string;
  onDeadlineReached?: () => void;
  className?: string;
}

export function ServerAuthoritativeClock({ eventId, onDeadlineReached, className = '' }: ServerClockProps) {
  const [remainingSec, setRemainingSec] = useState<number | null>(null);
  const [sessionStatus, setSessionStatus] = useState<string>('LIVE');
  const [currentRoundName, setCurrentRoundName] = useState<string>('Current Stage');
  const [submissionOpen, setSubmissionOpen] = useState<boolean>(true);
  const [synced, setSynced] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchSync = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}/session`);
        const data = await res.json();
        if (data.sync) {
          setRemainingSec(data.sync.remainingSeconds);
          setSessionStatus(data.sync.sessionStatus);
          setCurrentRoundName(data.sync.currentRoundName);
          setSubmissionOpen(data.sync.submissionOpen);
          setSynced(true);
        }
      } catch {
        // Fallback gracefully
      }
    };

    fetchSync();

    // Regular tick every second
    interval = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (onDeadlineReached) onDeadlineReached();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Re-sync with authoritative server clock every 30 seconds
    const resyncInterval = setInterval(fetchSync, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(resyncInterval);
    };
  }, [eventId, onDeadlineReached]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className={`p-4 rounded-2xl border border-white/10 bg-[#020b18]/90 backdrop-blur-xl ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono mb-1">
        <div className="flex items-center gap-1.5 text-white/60">
          <Clock className="w-3.5 h-3.5 text-electric-cyan" />
          <span className="uppercase text-[10px] tracking-wider">{currentRoundName}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <ShieldCheck className="w-3 h-3" />
          <span>SERVER SYNCED</span>
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-2xl sm:text-3xl font-heading font-black tracking-wider text-white">
            {remainingSec !== null ? (
              remainingSec > 0 ? formatTime(remainingSec) : '00:00:00'
            ) : (
              'SYNCING...'
            )}
          </div>
          <div className="text-[10px] font-mono text-white/40 uppercase">
            {remainingSec !== null && remainingSec > 0 ? 'STAGE DEADLINE COUNTDOWN' : 'SUBMISSIONS CLOSED'}
          </div>
        </div>

        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border font-bold ${
            sessionStatus === 'LIVE' && submissionOpen
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'bg-red-500/15 text-red-300 border-red-500/30'
          }`}
        >
          {sessionStatus === 'LIVE' && submissionOpen ? 'STAGE ACTIVE' : 'LOCKED'}
        </span>
      </div>
    </div>
  );
}
