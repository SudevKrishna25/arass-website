'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event } from '@/lib/events-db/types';
import { QrCode, CheckCircle2, UserCheck, Search, Users, Radio } from 'lucide-react';

export default function EventCheckInPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [participantInput, setParticipantInput] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/checkin`);
        }
      })
      .then((res) => (res ? res.json() : null))
      .then((cData) => {
        if (cData) setSummary(cData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const handleManualCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !participantInput.trim()) return;

    const res = await fetch(`/api/events/${event.id}/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantId: participantInput.trim(),
        method: 'MANUAL',
      }),
    });

    if (res.ok) {
      setStatusMessage(`Participant ${participantInput.trim()} checked in successfully.`);
      setParticipantInput('');
      loadData();
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleSimulateQRScan = async () => {
    if (!event) return;

    const simulatedParticipantId = 'user-part-alex-chen';
    const res = await fetch(`/api/events/${event.id}/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participantId: simulatedParticipantId,
        method: 'QR',
      }),
    });

    if (res.ok) {
      setStatusMessage(`QR Code Badge Scanned & Verified: Participant ${simulatedParticipantId}`);
      loadData();
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event Dossier...'} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Event Access & Check-In Operations</h2>
            <p className="text-xs font-mono text-white/60">
              Live venue arrival verification, attendee badge QR scanning, and real-time headcounts.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono">
            {statusMessage}
          </div>
        )}

        {/* Check-In KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Total Registered</div>
            <div className="text-2xl font-heading font-bold text-white">{summary?.totalRegistered || 24}</div>
            <div className="text-[11px] font-mono text-white/50">Verified Roster</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Checked In At Venue</div>
            <div className="text-2xl font-heading font-bold text-emerald-400">{summary?.checkedInCount || 2}</div>
            <div className="text-[11px] font-mono text-emerald-400 font-semibold">Active Presence</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Pending Arrival</div>
            <div className="text-2xl font-heading font-bold text-amber-400">{summary?.notArrivedCount || 22}</div>
            <div className="text-[11px] font-mono text-amber-400/80">In Transit</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 space-y-1">
            <div className="text-white/40 text-[10px] font-mono uppercase">Attendance Rate</div>
            <div className="text-2xl font-heading font-bold text-electric-cyan">{summary?.attendanceRate || '10%'}</div>
            <div className="text-[11px] font-mono text-electric-cyan font-semibold">Real-Time Ratio</div>
          </div>
        </div>

        {/* Check-In Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Scanner Module */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <QrCode className="w-4 h-4 text-electric-cyan" />
              <span>Participant Badge QR Scanner</span>
            </h3>
            <p className="text-xs text-white/60 font-mono">
              Scan attendee badge QR codes via camera or handheld barcode reader for zero-friction venue entry.
            </p>

            <div className="p-8 rounded-2xl border border-dashed border-white/20 bg-[#01050d] text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl border border-electric-cyan/40 bg-electric-cyan/10 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-electric-cyan" />
              </div>
              <div className="text-xs text-white font-mono">READY TO SCAN ATTENDEE BADGES</div>
              <button
                onClick={handleSimulateQRScan}
                className="px-6 py-2.5 rounded-xl bg-electric-cyan text-background font-bold text-xs font-mono tracking-wider hover:scale-105 transition-transform"
              >
                SIMULATE QR BADGE SCAN
              </button>
            </div>
          </div>

          {/* Manual Check-In Module */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-electric-cyan" />
              <span>Manual Check-In & Search</span>
            </h3>
            <p className="text-xs text-white/60 font-mono">
              Enter participant ID, email, or name to mark verified attendance manually.
            </p>

            <form onSubmit={handleManualCheckIn} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-1">Participant ID / Email</label>
                <input
                  type="text"
                  required
                  value={participantInput}
                  onChange={(e) => setParticipantInput(e.target.value)}
                  placeholder="e.g. user-part-alex-chen or email"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl border border-white/20 hover:border-electric-cyan text-white text-xs font-mono font-bold tracking-wider hover:bg-white/5 transition-all"
              >
                RECORD MANUAL CHECK-IN
              </button>
            </form>
          </div>
        </div>

        {/* Live Check-In Stream */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Live Check-In Activity Stream</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Participant Identifier</th>
                  <th className="pb-3">Method</th>
                  <th className="pb-3">Verification Status</th>
                  <th className="pb-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {summary?.records && summary.records.length > 0 ? (
                  summary.records.map((rec: any) => (
                    <tr key={rec.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-semibold text-white">{rec.participantId}</td>
                      <td className="py-3 text-electric-cyan font-bold">{rec.method}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-white/60">
                        {new Date(rec.timestamp).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-white/40">
                      No check-in records logged yet.
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
