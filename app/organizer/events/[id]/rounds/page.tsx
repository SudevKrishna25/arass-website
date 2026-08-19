'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Round } from '@/lib/events-db/types';
import { Layers, Plus, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function EventRoundsManagerPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);

  // New Round Modal Form
  const [showModal, setShowModal] = useState(false);
  const [roundName, setRoundName] = useState('');
  const [description, setDescription] = useState('');
  const [submissionType, setSubmissionType] = useState('MIXED');
  const [startAt, setStartAt] = useState(new Date().toISOString().split('T')[0]);
  const [endAt, setEndAt] = useState(new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]);

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          setRounds(data.rounds || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const handleCreateRound = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    const res = await fetch(`/api/events/${event.id}/rounds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: roundName,
        description,
        order: rounds.length + 1,
        submissionType,
        startAt: new Date(startAt).toISOString(),
        endAt: new Date(endAt).toISOString(),
      }),
    });

    if (res.ok) {
      setShowModal(false);
      setRoundName('');
      setDescription('');
      loadData();
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">Stage Timeline & Scoring Matrix</h2>
            <p className="text-xs font-sans text-white/60 font-light">
              Configure multi-round competition progression, submission gates, and evaluation rubrics.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>ADD STAGE</span>
          </button>
        </div>

        {/* Rounds List */}
        <div className="space-y-4">
          {rounds.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-electric-cyan uppercase">
                    STAGE 0{r.order} // FORMAT: {r.submissionType}
                  </div>
                  <h3 className="text-base font-heading font-bold text-white">{r.name}</h3>
                </div>
                <span className="self-start sm:self-center px-3 py-1 rounded-full text-[10px] font-mono bg-white/10 text-white/80 border border-white/15">
                  {r.status}
                </span>
              </div>

              <p className="text-xs font-sans text-white/80 font-light">{r.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50 pt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Start: {new Date(r.startAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>End: {new Date(r.endAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding a round */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18] space-y-4">
              <h3 className="text-lg font-heading font-bold text-white">Add New Competition Stage</h3>
              <form onSubmit={handleCreateRound} className="space-y-3 text-xs font-mono">
                <div>
                  <label className="block text-white/70 mb-1">Stage Title</label>
                  <input
                    type="text"
                    required
                    value={roundName}
                    onChange={(e) => setRoundName(e.target.value)}
                    placeholder="e.g. Round 2: Technical Prototype"
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Submission Deliverable Type</label>
                  <select
                    value={submissionType}
                    onChange={(e) => setSubmissionType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                  >
                    <option value="MIXED">Mixed (Code + PDF + URL)</option>
                    <option value="URL">Code Repository URL</option>
                    <option value="FILE">Document File (PDF / ZIP)</option>
                    <option value="TEXT">Written Technical Proposal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Stage Description</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Specify problem directive and submission format..."
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startAt}
                      onChange={(e) => setStartAt(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endAt}
                      onChange={(e) => setEndAt(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-full border border-white/15 text-white/70"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-electric-cyan text-background font-bold"
                  >
                    Save Stage
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
