'use client';

import React, { useState, useEffect } from 'react';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { Shield, Filter, Search, Clock, ArrowDownRight } from 'lucide-react';

export default function OrganizerAuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [actionFilter, setActionFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const loadLogs = () => {
    fetch(`/api/organizer/audit?action=${actionFilter}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.logs) setLogs(data.logs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadLogs();
  }, [actionFilter]);

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Operational Audit Trail</h1>
            <p className="text-xs font-mono text-white/60">
              Immutable ledger of privileged organizer actions, stage state mutations, jury scoring, and certificate issuance.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono border-b border-white/10 pb-4">
          {['ALL', 'EVENT_CREATED', 'EVENT_STARTED', 'ROUND_STARTED', 'SUBMISSION_LOCKED', 'JUDGE_ASSIGNED', 'CHECKIN_CREATED', 'CERTIFICATE_ISSUED'].map((act) => (
            <button
              key={act}
              onClick={() => setActionFilter(act)}
              className={`px-3 py-1.5 rounded-full transition-all ${
                actionFilter === act
                  ? 'bg-electric-cyan text-background font-bold'
                  : 'text-white/60 hover:text-white bg-[#020b18]'
              }`}
            >
              {act.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Audit Log Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Action Event</th>
                  <th className="pb-3">Target Resource</th>
                  <th className="pb-3">Actor / Operator</th>
                  <th className="pb-3">Metadata</th>
                  <th className="pb-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 font-bold text-electric-cyan">
                        {log.action}
                      </td>
                      <td className="py-3 text-white/80">
                        {log.resourceType}: {log.resourceId}
                      </td>
                      <td className="py-3 text-white/60">
                        {log.actorUserId || 'System Initializer'}
                      </td>
                      <td className="py-3 text-white/40 text-[11px] max-w-xs truncate">
                        {JSON.stringify(log.metadata || {})}
                      </td>
                      <td className="py-3 text-right text-white/50 text-[11px]">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-white/40">
                      No audit events recorded for this category.
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
