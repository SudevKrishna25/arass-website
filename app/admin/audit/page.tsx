'use client';

import React, { useState, useEffect } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { ShieldCheck, Search, Filter } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/overview')
      .then((res) => res.json())
      .then((data) => {
        setLogs(data.recentAuditLogs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.actorUserId && l.actorUserId.toLowerCase().includes(search.toLowerCase())) ||
      l.resourceType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              IMMUTABLE COMPLIANCE AUDIT TRAIL
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">System Operations Audit Ledger</h1>
          </div>
        </div>

        {/* Filter Search */}
        <div className="bg-[#020b18]/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search action or actor..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
            />
          </div>
          <span className="text-xs font-mono text-white/50">{filtered.length} Immutable Records</span>
        </div>

        {/* Audit Table */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl">
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-electric-cyan animate-pulse">
              READING AUDIT LEDGER...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-[10px]">
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Actor</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Resource</th>
                    <th className="py-3 px-4">Metadata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filtered.map((log: any, idx: number) => (
                    <tr key={log.id || idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 text-white/50">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-electric-cyan font-bold">{log.actorUserId || 'SYSTEM'}</td>
                      <td className="py-3.5 px-4 font-bold">{log.action}</td>
                      <td className="py-3.5 px-4 text-white/70">
                        {log.resourceType}: {log.resourceId}
                      </td>
                      <td className="py-3.5 px-4 text-white/50 text-[11px]">
                        {JSON.stringify(log.metadata || {})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
