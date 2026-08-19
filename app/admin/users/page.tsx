'use client';

import React, { useState, useEffect } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Users, Shield, Lock, Search, AlertCircle, CheckCircle2, UserCheck, UserX } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });
      const data = await res.json();
      if (data.user) {
        setUsers(users.map((u) => (u.user.id === userId ? { ...u, user: data.user } : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevokeSessions = async (userId: string) => {
    try {
      await fetch('/api/admin/users/revoke-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      alert(`All sessions for user ${userId} revoked.`);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = users.filter((u) => {
    const matchesRole = selectedRole === 'ALL' || u.user.role === selectedRole;
    const matchesSearch =
      u.user.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.profile?.name && u.profile.name.toLowerCase().includes(search.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              IDENTITY & RBAC ARCHITECTURE
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">User & Role Management</h1>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#020b18]/60 p-4 rounded-2xl border border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-white/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user email or name..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {['ALL', 'SUPER_ADMIN', 'ORGANIZER', 'JUDGE', 'PARTICIPANT'].map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedRole === r
                    ? 'bg-electric-cyan text-background font-bold'
                    : 'bg-[#01050d] text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl">
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-electric-cyan animate-pulse">
              LOADING USER ROSTER...
            </div>
          ) : filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase text-[10px]">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Created Date</th>
                    <th className="py-3 px-4 text-right">RBAC Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filtered.map(({ user, profile }) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-white">{profile?.name || user.email.split('@')[0]}</div>
                        <div className="text-white/40 text-[11px]">{user.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="px-2 py-1 rounded bg-[#01050d] border border-white/15 text-electric-cyan font-bold text-[11px]"
                        >
                          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                          <option value="ORGANIZER">ORGANIZER</option>
                          <option value="JUDGE">JUDGE</option>
                          <option value="PARTICIPANT">PARTICIPANT</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          {user.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white/50 text-[11px]">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleRevokeSessions(user.id)}
                          className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-background font-bold text-[10px]"
                        >
                          Revoke Sessions
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-mono text-white/50">No users match filter criteria.</div>
          )}
        </div>
      </main>
    </div>
  );
}
