'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Plus, Search, Calendar, Trophy, Users, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/events/list')
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = events.filter((e) => {
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.eventType.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              ARASS EVENT MANAGEMENT ROSTER
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Event Architecture Directory</h1>
          </div>

          <Link
            href="/admin/events/new"
            className="px-5 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.5)] self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>BUILD NEW EVENT</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#020b18]/60 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event name or type..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono w-full sm:w-auto">
            {['ALL', 'DRAFT', 'REGISTRATION_OPEN', 'LIVE', 'COMPLETED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === st
                    ? 'bg-electric-cyan text-background font-bold'
                    : 'bg-[#01050d] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Event List Table */}
        <div className="p-6 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl">
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-electric-cyan animate-pulse">
              LOADING EVENT ROSTER...
            </div>
          ) : filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-[10px]">
                    <th className="py-3 px-4">Event Title</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Mode</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Dates</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filtered.map((evt) => (
                    <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 font-bold text-white">
                        <Link href={`/admin/events/${evt.id}`} className="hover:text-electric-cyan transition-colors">
                          {evt.name}
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-electric-cyan">{evt.eventType}</td>
                      <td className="py-4 px-4 text-white/70">{evt.mode}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            evt.status === 'LIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : evt.status === 'REGISTRATION_OPEN'
                              ? 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {evt.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/50 text-[11px]">
                        {new Date(evt.eventStart).toLocaleDateString()} - {new Date(evt.eventEnd).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link
                          href={`/admin/events/${evt.id}`}
                          className="px-3 py-1.5 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan hover:text-background transition-all font-bold text-[11px]"
                        >
                          MANAGE →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-mono text-white/50">
              No matching events found. Create a new event to begin.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
