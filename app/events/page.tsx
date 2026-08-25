'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { EventCard } from '@/components/events/EventCard';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Event } from '@/lib/events-db/types';
import {
  Search,
  RotateCcw,
  Trophy,
  Sparkles,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Flame,
  Clock,
  Layers,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function EventsDiscoveryContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('eventType') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedMode, setSelectedMode] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('PRIZE');

  // Share Modal State
  const [shareEvent, setShareEvent] = useState<Event | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/events/list')
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (initialType) setSelectedType(initialType);
    if (initialSearch) setSearch(initialSearch);
  }, [initialType, initialSearch]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => {
        // Search
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchesName = e.name.toLowerCase().includes(q);
          const matchesDesc = e.shortDescription.toLowerCase().includes(q);
          const matchesType = e.eventType.toLowerCase().includes(q);
          if (!matchesName && !matchesDesc && !matchesType) return false;
        }

        // Event Type
        if (selectedType !== 'ALL' && e.eventType !== selectedType) return false;

        // Mode
        if (selectedMode !== 'ALL' && e.mode !== selectedMode) return false;

        // Status
        if (selectedStatus !== 'ALL' && e.status !== selectedStatus) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'PRIZE') return (b.prizePool || 0) - (a.prizePool || 0);
        if (sortBy === 'DEADLINE')
          return new Date(a.registrationEnd).getTime() - new Date(b.registrationEnd).getTime();
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [events, search, selectedType, selectedMode, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedType('ALL');
    setSelectedMode('ALL');
    setSelectedStatus('ALL');
    setSortBy('PRIZE');
  };

  const eventTypes: { label: string; value: string }[] = [
    { label: 'ALL DISCIPLINES', value: 'ALL' },
    { label: 'IDEATHONS', value: 'IDEATHON' },
    { label: 'HACKATHONS', value: 'HACKATHON' },
    { label: 'CODING SPRINTS', value: 'CODING_CHALLENGE' },
    { label: 'DESIGN CHALLENGES', value: 'DESIGN_CHALLENGE' },
    { label: 'ASSESSMENTS', value: 'ASSESSMENT' },
    { label: 'WORKSHOPS', value: 'WORKSHOP' },
  ];

  const handleCopyShareLink = (slug: string) => {
    const url = `${window.location.origin}/events/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Compact Hero Section */}
      <section className="relative p-6 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-[#020b18]/80 to-[#01050d]/90 backdrop-blur-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-electric-cyan/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 text-[10px] sm:text-xs font-mono text-electric-cyan tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARASS GLOBAL COMPETITION PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white leading-tight">
            BUILD. COMPETE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_30px_rgba(0,212,255,0.6)]">
              CREATE IMPACT.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-sans text-white/70 leading-relaxed font-light">
            Discover and participate in premium hackathons, competitions, innovation challenges, and technology assessments powered by ARASS.
          </p>
        </div>
      </section>

      {/* Discovery Search & Filter Toolbar */}
      <section className="space-y-4">
        {/* Top Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hackathons, problem statements, organizers, skills (e.g. AI, Distributed Systems)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-white/15 focus:border-electric-cyan bg-[#020b18]/80 backdrop-blur-xl text-white text-sm font-mono placeholder:text-white/40 focus:outline-none transition-colors shadow-lg"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 text-xs font-mono text-white/40 hover:text-white"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Category Filter Pills & Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Type Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {eventTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelectedType(t.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  selectedType === t.value
                    ? 'bg-electric-cyan text-background font-bold shadow-[0_0_15px_rgba(0,212,255,0.6)]'
                    : 'border border-white/10 hover:border-white/30 text-white/70 hover:text-white bg-[#020b18]/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Filter Selects */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Select */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-white/15 bg-[#020b18] text-white/80 text-xs font-mono focus:outline-none focus:border-electric-cyan"
            >
              <option value="ALL">Mode: All</option>
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="HYBRID">Hybrid</option>
            </select>

            {/* Status Select */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-white/15 bg-[#020b18] text-white/80 text-xs font-mono focus:outline-none focus:border-electric-cyan"
            >
              <option value="ALL">Status: All</option>
              <option value="REGISTRATION_OPEN">Registration Open</option>
              <option value="LIVE">Live Now</option>
              <option value="SCHEDULED">Upcoming</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-white/15 bg-[#020b18] text-electric-cyan text-xs font-mono focus:outline-none focus:border-electric-cyan font-semibold"
            >
              <option value="PRIZE">Sort: Prize Pool</option>
              <option value="DEADLINE">Sort: Deadline</option>
              <option value="NEWEST">Sort: Newest</option>
            </select>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-sm font-mono tracking-widest text-white/60 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan" />
            <span>EXPLORE ALL COMPETITIONS ({filteredEvents.length})</span>
          </h2>

          {(selectedType !== 'ALL' || selectedMode !== 'ALL' || selectedStatus !== 'ALL' || search) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-mono text-electric-cyan hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt, idx) => (
              <EventCard key={evt.id} event={evt} featured={idx === 0} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-white/10 bg-[#020b18]/40 space-y-4">
            <Trophy className="w-10 h-10 text-white/30 mx-auto" />
            <h3 className="text-base font-heading font-bold text-white">No Competitions Found</h3>
            <p className="text-xs font-sans text-white/60 max-w-sm mx-auto">
              No events currently match your active search or filter criteria. Try adjusting your query.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 rounded-full bg-electric-cyan text-background font-mono text-xs font-bold"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default function EventsDiscoveryPage() {
  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-40" />
      <EventsNavigation />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-white font-mono text-sm">
            LOADING COMPETITIONS...
          </div>
        }
      >
        <EventsDiscoveryContent />
      </Suspense>

      <footer className="relative z-10 border-t border-white/10 bg-[#01050d] py-8 text-center text-xs font-mono text-white/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>ARASS EVENTS // INDEPENDENT TECHNOLOGY COMPETITION PLATFORM</div>
          <div className="flex items-center gap-4 text-white/40">
            <span>© 2026 ARASS</span>
            <a href="/verify/certificate/ARASS-IDEA-2026-000001" className="text-electric-cyan hover:underline">
              Verify Credential
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
