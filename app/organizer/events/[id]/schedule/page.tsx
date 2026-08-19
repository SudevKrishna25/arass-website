'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, EventSession, SessionType } from '@/lib/events-db/types';
import { Calendar, Clock, Plus, MapPin, User, Layers } from 'lucide-react';

export default function EventSchedulePage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [sessions, setSessions] = useState<EventSession[]>([]);
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [venue, setVenue] = useState('');
  const [type, setType] = useState<SessionType>('KEYNOTE');
  const [statusMessage, setStatusMessage] = useState('');

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/schedule`);
        }
      })
      .then((res) => (res ? res.json() : null))
      .then((sData) => {
        if (sData && sData.sessions) setSessions(sData.sessions);
      });
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !title) return;

    const res = await fetch(`/api/events/${event.id}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        speaker,
        venue,
        type,
        startAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 3600000 * 2).toISOString(),
      }),
    });

    if (res.ok) {
      setStatusMessage(`Session "${title}" added to competition schedule.`);
      setTitle('');
      setSpeaker('');
      setVenue('');
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
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Event Schedule & Hybrid Sessions</h2>
            <p className="text-xs font-mono text-white/60">
              Configure session timelines, keynote talks, mentoring blocks, and live stage presentations.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono">
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sessions Timeline List */}
          <div className="lg:col-span-2 p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-electric-cyan" />
              <span>Program Timeline ({sessions.length} Sessions)</span>
            </h3>

            <div className="divide-y divide-white/10">
              {sessions.map((sess) => (
                <div key={sess.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/30">
                      {sess.type}
                    </span>
                    <span className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(sess.startAt).toLocaleTimeString()} – {new Date(sess.endAt).toLocaleTimeString()}</span>
                    </span>
                  </div>

                  <div className="font-bold text-white text-base">{sess.title}</div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60">
                    {sess.speaker && (
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-white/40" />
                        <span>{sess.speaker}</span>
                      </div>
                    )}
                    {sess.venue && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-white/40" />
                        <span>{sess.venue}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Session Form */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-electric-cyan" />
              <span>Add Scheduled Session</span>
            </h3>

            <form onSubmit={handleAddSession} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-white/60 mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus Workshop"
                  className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Session Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none"
                >
                  <option value="KEYNOTE">Keynote Presentation</option>
                  <option value="WORKSHOP">Technical Workshop</option>
                  <option value="MENTORING">Mentoring & Office Hours</option>
                  <option value="JUDGING">Jury Evaluation Block</option>
                  <option value="PRESENTATION">Finalist Pitch Defense</option>
                  <option value="NETWORKING">Networking & Social</option>
                </select>
              </div>

              <div>
                <label className="block text-white/60 mb-1">Speaker / Facilitator</label>
                <input
                  type="text"
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  placeholder="e.g. Dr. Alan Thorne"
                  className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Venue / Stream Room</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Auditorium Alpha / Virtual Stage"
                  className="w-full px-3 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-electric-cyan text-background font-bold tracking-wider hover:scale-[1.02] transition-transform"
              >
                PUBLISH SESSION
              </button>
            </form>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
