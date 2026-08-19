'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@/lib/events-db/types';
import { Calendar, Users, Trophy, ArrowUpRight, Globe, MapPin, Clock } from 'lucide-react';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const isRegistrationOpen = event.status === 'REGISTRATION_OPEN';
  const isLive = event.status === 'LIVE';

  const formatPrize = (prize: number) => {
    if (!prize) return 'Recognition & Perks';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(prize);
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysLeft = (endIso: string) => {
    const diff = new Date(endIso).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Closing today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-[#020b18]/70 backdrop-blur-xl ${
        featured
          ? 'border-electric-cyan/40 hover:border-electric-cyan shadow-[0_0_30px_rgba(0,212,255,0.15)]'
          : 'border-white/10 hover:border-electric-cyan/60 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]'
      }`}
    >
      {/* Banner / Media */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#01050d]">
        <Image
          src={event.banner || '/images/arass_frontier_build_lab.jpg'}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#01050d]/85 backdrop-blur-md border border-white/15 text-white/90">
            {event.eventType.replace('_', ' ')}
          </span>

          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md border ${
              isLive
                ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse'
                : isRegistrationOpen
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-white/10 text-white/70 border-white/20'
            }`}
          >
            {isLive ? '● LIVE NOW' : event.status.replace('_', ' ')}
          </span>
        </div>

        {/* Mode Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#01050d]/90 text-electric-cyan border border-electric-cyan/30">
          <Globe className="w-3 h-3" />
          <span>{event.mode}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-electric-cyan transition-colors leading-snug line-clamp-1">
            {event.name}
          </h3>
          <p className="mt-1.5 text-xs text-white/70 font-sans line-clamp-2 leading-relaxed font-light">
            {event.shortDescription}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-[11px] font-mono text-white/70">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0" />
            <span className="truncate text-white font-semibold">{formatPrize(event.prizePool)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-electric-cyan flex-shrink-0" />
            <span>Team: {event.minTeamSize === event.maxTeamSize ? event.minTeamSize : `${event.minTeamSize}-${event.maxTeamSize}`}</span>
          </div>

          <div className="flex items-center gap-1.5 col-span-2 text-white/50">
            <Clock className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
            <span>Closes: {formatDate(event.registrationEnd)} ({getDaysLeft(event.registrationEnd)})</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href={`/events/${event.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/20 group-hover:border-electric-cyan bg-[#01050d]/80 group-hover:bg-electric-cyan group-hover:text-background text-white font-mono text-xs font-bold tracking-wider transition-all duration-300"
          >
            <span>VIEW EVENT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
