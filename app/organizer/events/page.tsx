'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { Event } from '@/lib/events-db/types';
import { Plus, Search, ExternalLink, Globe, Layers, Users, Award, Copy, Archive, Radio } from 'lucide-react';

export default function OrganizerEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const loadEvents = () => {
    fetch('/api/events/list')
      .then((res) => res.json())
      .then((data) => {
        if (data.events) setEvents(data.events);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handlePublish = async (id: string) => {
    const res = await fetch(`/api/events/${id}/publish`, { method: 'POST' });
    if (res.ok) {
      setActionMessage('Event published successfully.');
      loadEvents();
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  const handleDuplicate = async (id: string) => {
    const res = await fetch(`/api/events/${id}/duplicate`, { method: 'POST' });
    if (res.ok) {
      setActionMessage('Event structure duplicated successfully.');
      loadEvents();
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  const handleArchive = async (id: string) => {
    const res = await fetch(`/api/events/${id}/archive`, { method: 'POST' });
    if (res.ok) {
      setActionMessage('Event archived successfully.');
      loadEvents();
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  const filtered = events.filter((e) => {
    if (filter !== 'ALL' && e.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.slug.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Event Operations Center</h1>
            <p className="text-xs font-sans text-white/70 font-light">
              Supervise all active, scheduled, and completed programs. Create, duplicate, and archive event structures.
            </p>
          </div>

          <Link
            href="/organizer/events/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE EVENT</span>
          </Link>
        </div>

        {actionMessage && (
          <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono">
            {actionMessage}
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {['ALL', 'REGISTRATION_OPEN', 'LIVE', 'SCHEDULED', 'DRAFT', 'COMPLETED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  filter === st
                    ? 'bg-electric-cyan text-background font-bold'
                    : 'text-white/60 hover:text-white bg-[#020b18]'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 w-3.5 h-3.5 text-white/40 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event name..."
              className="pl-9 pr-3 py-1.5 rounded-xl border border-white/15 bg-[#020b18] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan w-64"
            />
          </div>
        </div>

        {/* Events Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Event Title</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Prize Pool</th>
                  <th className="pb-3">Timeline</th>
                  <th className="pb-3 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((evt) => (
                  <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="font-bold text-white text-sm">{evt.name}</div>
                      <div className="text-white/40 text-[10px]">{evt.slug}</div>
                    </td>
                    <td className="py-4 text-white/70">{evt.eventType}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] border ${
                        evt.status === 'LIVE'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : evt.status === 'REGISTRATION_OPEN'
                          ? 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30'
                          : 'bg-white/10 text-white/80 border-white/15'
                      }`}>
                        {evt.status}
                      </span>
                    </td>
                    <td className="py-4 text-electric-cyan font-bold">₹{evt.prizePool.toLocaleString()}</td>
                    <td className="py-4 text-white/60 text-[11px]">
                      {new Date(evt.eventStart).toLocaleDateString()} – {new Date(evt.eventEnd).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {evt.status === 'DRAFT' || evt.status === 'SCHEDULED' ? (
                          <button
                            onClick={() => handlePublish(evt.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-[11px]"
                          >
                            PUBLISH
                          </button>
                        ) : null}

                        <button
                          onClick={() => handleDuplicate(evt.id)}
                          title="Duplicate Event Structure"
                          className="p-1.5 rounded-lg border border-white/15 text-white/60 hover:text-electric-cyan hover:border-electric-cyan/40"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleArchive(evt.id)}
                          title="Archive Event"
                          className="p-1.5 rounded-lg border border-white/15 text-white/60 hover:text-amber-400 hover:border-amber-400/40"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`/organizer/events/${evt.slug}/participants`}
                          className="px-3 py-1 rounded-lg border border-white/20 hover:border-electric-cyan text-white text-[11px]"
                        >
                          MANAGE
                        </Link>

                        <Link
                          href={`/events/${evt.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg border border-white/15 text-white/60 hover:text-white"
                          title="View Public Microsite"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
