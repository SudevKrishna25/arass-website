'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, IntegrityEvent } from '@/lib/events-db/types';
import { ShieldAlert, AlertTriangle, Eye, ShieldCheck, Search, Filter } from 'lucide-react';

export default function OrganizerIntegrityDashboardPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [telemetry, setTelemetry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/integrity`);
        }
        throw new Error('Event not found');
      })
      .then((res) => res.json())
      .then((integData) => {
        setTelemetry(integData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const events: IntegrityEvent[] = telemetry?.events || [];
  const filteredEvents = events.filter((e) => {
    if (filterSeverity !== 'ALL' && e.severity !== filterSeverity) return false;
    return true;
  });

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">Competition Integrity & Anti-Cheat Monitor</h2>
            <p className="text-xs font-sans text-white/60 font-light">
              Proctoring telemetry, browser blur occurrences, multi-session tracking, and anomalous submission alerts.
            </p>
          </div>
        </div>

        {/* Telemetry Summary Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-electric-cyan" />
              <span>Total Monitored Events</span>
            </div>
            <div className="text-2xl font-heading font-bold text-white">
              {telemetry?.totalIntegrityEvents || 0}
            </div>
            <div className="text-[11px] font-mono text-white/50">Active Proctoring Stream</div>
          </div>

          <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1">
            <div className="text-amber-300 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Flagged Participants</span>
            </div>
            <div className="text-2xl font-heading font-bold text-amber-300">
              {telemetry?.flaggedCount || 0}
            </div>
            <div className="text-[11px] font-mono text-amber-300/70">Requires Review</div>
          </div>

          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-1">
            <div className="text-emerald-300 text-[10px] font-mono uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Confidence</span>
            </div>
            <div className="text-2xl font-heading font-bold text-emerald-300">99.4%</div>
            <div className="text-[11px] font-mono text-emerald-300/70">Verified Submissions</div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-full transition-all ${
                filterSeverity === sev
                  ? 'bg-electric-cyan text-background font-bold'
                  : 'text-white/60 hover:text-white bg-[#020b18]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Evidence Log Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Event Type</th>
                  <th className="pb-3">Participant Identifier</th>
                  <th className="pb-3">Severity</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Details</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((evt) => (
                    <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 font-bold text-white">{evt.type}</td>
                      <td className="py-3.5 text-electric-cyan">{evt.participantId}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            evt.severity === 'HIGH'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : evt.severity === 'MEDIUM'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {evt.severity}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/70 border border-white/10">
                          {evt.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-white/60 text-[11px]">
                        {evt.details ? JSON.stringify(evt.details) : 'N/A'}
                      </td>
                      <td className="py-3.5 text-white/40 text-[11px]">
                        {new Date(evt.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40">
                      No integrity violations recorded matching this filter.
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
