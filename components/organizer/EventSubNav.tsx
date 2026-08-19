'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Layers, Radio, Send, Award, BarChart3, ArrowLeft, ExternalLink } from 'lucide-react';

interface EventSubNavProps {
  slug: string;
  eventName: string;
}

export function EventSubNav({ slug, eventName }: EventSubNavProps) {
  const pathname = usePathname();

  const links = [
    { name: 'Participants', href: `/organizer/events/${slug}/participants`, icon: Users },
    { name: 'Teams', href: `/organizer/events/${slug}/teams`, icon: Users },
    { name: 'Rounds', href: `/organizer/events/${slug}/rounds`, icon: Layers },
    { name: 'Submissions', href: `/organizer/events/${slug}/submissions`, icon: Send },
    { name: 'Judges', href: `/organizer/events/${slug}/judges`, icon: Layers },
    { name: 'Check-in', href: `/organizer/events/${slug}/check-in`, icon: Radio },
    { name: 'Live Control', href: `/organizer/events/${slug}/live`, icon: Radio },
    { name: 'Incidents', href: `/organizer/events/${slug}/incidents`, icon: Award },
    { name: 'Calibration', href: `/organizer/events/${slug}/calibration`, icon: Layers },
    { name: 'Messages', href: `/organizer/events/${slug}/messages`, icon: Send },
    { name: 'Schedule', href: `/organizer/events/${slug}/schedule`, icon: Layers },
    { name: 'Integrity', href: `/organizer/events/${slug}/integrity`, icon: Award },
    { name: 'Certificates', href: `/organizer/events/${slug}/certificates`, icon: Award },
    { name: 'Analytics', href: `/organizer/events/${slug}/analytics`, icon: BarChart3 },
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <Link
            href="/organizer/events"
            className="p-1.5 rounded-lg border border-white/15 text-white/60 hover:text-white hover:bg-white/5"
            title="Back to All Events"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
              MANAGING EVENT DOSSIER
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-white">{eventName}</h1>
          </div>
        </div>

        <Link
          href={`/events/${slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-electric-cyan hover:underline"
        >
          <span>View Public Microsite</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-electric-cyan text-background font-bold shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                  : 'text-white/70 hover:text-white bg-[#020b18]/60 hover:bg-[#020b18]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
