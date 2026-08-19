'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Submission } from '@/lib/events-db/types';
import { Send, Github, FileText, CheckCircle2, ExternalLink } from 'lucide-react';

export default function EventSubmissionsManagerPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/submissions`);
        }
        throw new Error('Event not found');
      })
      .then((res) => res.json())
      .then((subData) => {
        if (subData.submissions) setSubmissions(subData.submissions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">Deliverables & Jury Submissions</h2>
            <p className="text-xs font-sans text-white/60 font-light">
              Review received software repositories, proposals, and evaluator scoring status.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Project Title</th>
                  <th className="pb-3">Team / Submitter</th>
                  <th className="pb-3">Repository & Artifacts</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Submission Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {submissions.length > 0 ? (
                  submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4">
                        <div className="font-bold text-white text-sm">{sub.title}</div>
                        <div className="text-white/60 text-xs font-sans font-light line-clamp-1 max-w-sm">
                          {sub.description}
                        </div>
                      </td>
                      <td className="py-4 text-electric-cyan font-semibold">{sub.teamId || sub.participantId}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {sub.url && (
                            <a
                              href={sub.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-electric-cyan hover:underline"
                            >
                              <Github className="w-3.5 h-3.5" />
                              <span>Repo</span>
                            </a>
                          )}
                          {sub.files && sub.files.length > 0 && (
                            <span className="text-white/50 text-[11px]">
                              PDF Attached ({sub.files[0].filename})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-4 text-white/50 text-[11px]">
                        {new Date(sub.submittedAt).toLocaleTimeString()} ({new Date(sub.submittedAt).toLocaleDateString()})
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-white/40">
                      No project deliverables have been submitted yet.
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
