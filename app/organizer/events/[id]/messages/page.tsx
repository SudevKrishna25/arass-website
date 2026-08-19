'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event } from '@/lib/events-db/types';
import { Send, Users, Mail, CheckCircle2, Clock } from 'lucide-react';

export default function EventMessagesPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [audience, setAudience] = useState('ALL_PARTICIPANTS');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [dispatches, setDispatches] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) setEvent(data.event);
      });
  }, [slug]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !body) return;

    const res = await fetch('/api/events/communications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: event?.id,
        audience,
        subject,
        body,
        channels: ['EMAIL', 'IN_APP'],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setStatusMessage(`Broadcast dispatched successfully to ${data.recipientCount || 24} recipients.`);
      setDispatches((prev) => [
        {
          id: Date.now().toString(),
          subject,
          audience,
          timestamp: new Date().toISOString(),
          recipientCount: data.recipientCount || 24,
        },
        ...prev,
      ]);
      setSubject('');
      setBody('');
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  const applyTemplate = (tpl: string) => {
    if (tpl === 'REGISTRATION_CONFIRM') {
      setSubject('[CONFIRMATION] Your Registration for ARASS IDEATHON 2026');
      setBody('Welcome to the competition. Review stage objectives and join the technical briefing room.');
    } else if (tpl === 'DEADLINE_REMINDER') {
      setSubject('[URGENT] 2 Hours Remaining: Deliverables Submission Window');
      setBody('The stage deadline is server-authoritative. Ensure your deliverables are submitted before clock expiry.');
    } else if (tpl === 'SHORTLIST_ALERT') {
      setSubject('[HONORS] Congratulations: You Have Been Shortlisted');
      setBody('Your submission has achieved qualifying scores. Prepare for the live jury defense presentation.');
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event Dossier...'} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Communications & Broadcast Suite</h2>
            <p className="text-xs font-mono text-white/60">
              Send segmented email notifications, deadline alerts, and live announcements to event participants.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono">
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Composer */}
          <div className="lg:col-span-2 p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-electric-cyan" />
              <span>Broadcast Composer</span>
            </h3>

            {/* Quick Templates */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono text-white/40 uppercase">Templates:</span>
              <button
                type="button"
                onClick={() => applyTemplate('REGISTRATION_CONFIRM')}
                className="px-2.5 py-1 rounded-lg border border-white/15 bg-[#01050d] text-white/70 hover:text-white text-[10px] font-mono"
              >
                Welcome
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('DEADLINE_REMINDER')}
                className="px-2.5 py-1 rounded-lg border border-white/15 bg-[#01050d] text-white/70 hover:text-white text-[10px] font-mono"
              >
                Deadline Alert
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('SHORTLIST_ALERT')}
                className="px-2.5 py-1 rounded-lg border border-white/15 bg-[#01050d] text-white/70 hover:text-white text-[10px] font-mono"
              >
                Shortlist Notice
              </button>
            </div>

            <form onSubmit={handleSend} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-white/60 mb-1">Target Audience</label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                >
                  <option value="ALL_PARTICIPANTS">All Verified Participants (24)</option>
                  <option value="TEAM_LEADERS">Squad Leaders Only (8)</option>
                  <option value="SHORTLISTED">Shortlisted Finalists</option>
                  <option value="JUDGES">Jury & Evaluator Panel</option>
                </select>
              </div>

              <div>
                <label className="block text-white/60 mb-1">Subject Line</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="[ANNOUNCEMENT] Important Stage Update"
                  className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Message Body</label>
                <textarea
                  required
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type broadcast message..."
                  className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-electric-cyan text-background font-bold tracking-wider hover:scale-[1.02] transition-transform"
              >
                DISPATCH MULTI-CHANNEL BROADCAST
              </button>
            </form>
          </div>

          {/* Broadcast History */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-electric-cyan" />
              <span>Recent Dispatches</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              {dispatches.length > 0 ? (
                dispatches.map((d) => (
                  <div key={d.id} className="p-3 rounded-xl border border-white/10 bg-[#01050d] space-y-1">
                    <div className="font-bold text-white text-[11px] truncate">{d.subject}</div>
                    <div className="text-white/50 text-[10px] flex items-center justify-between">
                      <span>{d.audience}</span>
                      <span>{d.recipientCount} sent</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-white/40 text-center py-6 text-[11px]">
                  No dispatches sent during this session.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
