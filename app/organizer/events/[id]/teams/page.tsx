'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Team } from '@/lib/events-db/types';
import { Users, Shield, Award, Search, UserCheck, Split, RefreshCw } from 'lucide-react';

export default function EventTeamsPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/teams`);
        }
      })
      .then((res) => (res ? res.json() : null))
      .then((tData) => {
        if (tData && tData.teams) setTeams(tData.teams);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const filteredTeams = teams.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      return t.name.toLowerCase().includes(q) || (t.code && t.code.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event Dossier...'} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">Team Management & Formations</h2>
            <p className="text-xs font-mono text-white/60">
              Supervise squads, roster sizes, leaders, verification statuses, and jury score standings.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 w-3.5 h-3.5 text-white/40 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team or squad code..."
              className="pl-9 pr-3 py-1.5 rounded-xl border border-white/15 bg-[#020b18] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan w-64"
            />
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono">
            {statusMessage}
          </div>
        )}

        {/* Teams Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Team Name</th>
                  <th className="pb-3">Squad Code</th>
                  <th className="pb-3">Roster Count</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Formed At</th>
                  <th className="pb-3 text-right">Team Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <tr key={team.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-electric-cyan" />
                        <span>{team.name}</span>
                      </td>
                      <td className="py-4 text-electric-cyan">{team.code || 'SYN-2026-X'}</td>
                      <td className="py-4 text-white/80">{team.members ? team.members.length : 1} Members</td>
                      <td className="py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {team.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className="py-4 text-white/50 text-[11px]">
                        {team.createdAt ? new Date(team.createdAt).toLocaleDateString() : 'Active'}
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setStatusMessage(`Roster invitation resent for squad ${team.name}`);
                            setTimeout(() => setStatusMessage(''), 3000);
                          }}
                          className="px-2.5 py-1 rounded-lg border border-white/15 hover:border-electric-cyan text-white text-[11px]"
                        >
                          RESEND INVITES
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40 text-xs">
                      No teams registered for this competition yet.
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
