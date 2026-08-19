'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Incident } from '@/lib/events-db/types';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  LifeBuoy,
  Plus,
  ShieldAlert,
  UserCheck,
  Zap,
} from 'lucide-react';

export default function OrganizerIncidentsPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  // New Incident Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [category, setCategory] = useState<Incident['category']>('TECHNICAL');
  const [priority, setPriority] = useState<Incident['priority']>('HIGH');
  const [description, setDescription] = useState('');

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/incidents`);
        }
        throw new Error('Event not found');
      })
      .then((res) => res.json())
      .then((incData) => {
        if (incData.incidents) setIncidents(incData.incidents);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const handleCreateIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !description.trim()) return;

    try {
      const res = await fetch(`/api/events/${event.id}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, priority, description }),
      });

      if (res.ok) {
        setNotice('Operational incident logged successfully.');
        setShowCreateModal(false);
        setDescription('');
        setTimeout(() => setNotice(null), 4000);
        loadData();
      }
    } catch {}
  };

  const handleUpdateStatus = async (incidentId: string, status: Incident['status']) => {
    if (!event) return;
    try {
      const res = await fetch(`/api/events/${event.id}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UPDATE_STATUS', incidentId, status }),
      });

      if (res.ok) {
        setNotice(`Incident status updated to ${status}.`);
        setTimeout(() => setNotice(null), 4000);
        loadData();
      }
    } catch {}
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>EVENT OPERATIONS HELP DESK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Incident Management & Help Desk</h2>
            <p className="text-xs font-sans text-white/60 font-light">
              Track, triage, and resolve operational bottlenecks, participant friction, and platform anomalies.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-background font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>LOG INCIDENT</span>
          </button>
        </div>

        {notice && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Incident Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
              Operational Incident Ledger ({incidents.length})
            </h3>
            <span className="text-[10px] font-mono text-white/40">Real-time Triage</span>
          </div>

          {incidents.length === 0 ? (
            <div className="py-8 text-center text-white/40 text-xs font-mono">No open incidents recorded.</div>
          ) : (
            <div className="space-y-3 font-mono text-xs">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="p-5 rounded-2xl border border-white/10 bg-[#01050d] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">{inc.category}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          inc.priority === 'CRITICAL' || inc.priority === 'HIGH'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {inc.priority} PRIORITY
                      </span>
                      <span className="text-white/40">• {new Date(inc.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-xs font-sans text-white/90 font-light leading-relaxed">{inc.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={inc.status}
                      onChange={(e) => handleUpdateStatus(inc.id, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none ${
                        inc.status === 'RESOLVED' || inc.status === 'CLOSED'
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : inc.status === 'INVESTIGATING'
                          ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                          : 'border-white/20 bg-[#020b18] text-white'
                      }`}
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="INVESTIGATING">INVESTIGATING</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-[#020b18] shadow-2xl space-y-4 font-mono text-xs">
              <div className="text-base font-heading font-black text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Log Operational Incident</span>
              </div>
              <form onSubmit={handleCreateIncident} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs"
                    >
                      <option value="TECHNICAL">Technical Issue</option>
                      <option value="PARTICIPANT">Participant Friction</option>
                      <option value="JUDGE">Judge Issue</option>
                      <option value="SUBMISSION">Submission Issue</option>
                      <option value="VENUE">Venue / Network</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs"
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Incident Summary & Context *</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the operational issue, affected entities, and immediate response..."
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-amber-400 text-background font-bold"
                  >
                    CONFIRM & LOG
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </OrganizerLayout>
  );
}
