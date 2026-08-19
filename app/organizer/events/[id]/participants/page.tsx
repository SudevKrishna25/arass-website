'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Registration } from '@/lib/events-db/types';
import { Search, Download, CheckCircle2, XCircle, Clock, Filter, Sparkles } from 'lucide-react';

export default function EventParticipantsManagerPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/registrations`);
        }
        throw new Error('Event not found');
      })
      .then((res) => res.json())
      .then((regData) => {
        if (regData.registrations) setRegistrations(regData.registrations);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const handleStatusUpdate = async (regId: string, newStatus: string) => {
    if (!event) return;
    const res = await fetch(`/api/events/${event.id}/registrations/${regId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      loadData();
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['Registration ID', 'User ID', 'Team ID', 'Status', 'Submitted At'];
    const rows = registrations.map((r) => [r.id, r.userId, r.teamId || 'N/A', r.status, r.submittedAt]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${event?.slug || 'event'}-participants.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = registrations.filter((r) => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return r.id.toLowerCase().includes(q) || (r.teamId && r.teamId.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {['ALL', 'VERIFIED', 'SHORTLISTED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  statusFilter === st
                    ? 'bg-electric-cyan text-background font-bold'
                    : 'text-white/60 hover:text-white bg-[#020b18]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 w-3.5 h-3.5 text-white/40 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search participant / team..."
                className="pl-9 pr-3 py-1.5 rounded-xl border border-white/15 bg-[#020b18] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan w-56"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/20 hover:border-electric-cyan bg-[#020b18] text-white text-xs font-mono"
            >
              <Download className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Participants Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Registration ID</th>
                  <th className="pb-3">Participant ID</th>
                  <th className="pb-3">Team Allocation</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Registration Time</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length > 0 ? (
                  filtered.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-white">{reg.id}</td>
                      <td className="py-3 text-white/80">{reg.userId}</td>
                      <td className="py-3 text-electric-cyan font-bold">{reg.teamId || 'Individual'}</td>
                      <td className="py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] border ${
                            reg.status === 'SHORTLISTED'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : reg.status === 'REJECTED'
                              ? 'bg-red-500/20 text-red-300 border-red-500/40'
                              : 'bg-white/10 text-white/80 border-white/15'
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="py-3 text-white/50 text-[11px]">
                        {new Date(reg.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {reg.status !== 'SHORTLISTED' && (
                            <button
                              onClick={() => handleStatusUpdate(reg.id, 'SHORTLISTED')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 text-[10px] font-bold"
                            >
                              SHORTLIST
                            </button>
                          )}
                          {reg.status !== 'REJECTED' && (
                            <button
                              onClick={() => handleStatusUpdate(reg.id, 'REJECTED')}
                              className="px-2.5 py-1 rounded-lg bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 text-[10px] font-bold"
                            >
                              REJECT
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40">
                      No registrations match the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
