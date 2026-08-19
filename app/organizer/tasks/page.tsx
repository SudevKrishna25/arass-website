'use client';

import React, { useState, useEffect } from 'react';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { OrganizerTask, EventChecklistItem } from '@/lib/events-db/types';
import {
  CheckSquare,
  ListTodo,
  Activity,
  CheckCircle2,
  Clock,
  Flame,
  ShieldCheck,
  AlertTriangle,
  Zap,
  TrendingUp,
} from 'lucide-react';

export default function OrganizerTasksPage() {
  const [tasks, setTasks] = useState<OrganizerTask[]>([]);
  const [checklist, setChecklist] = useState<EventChecklistItem[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'TASKS' | 'CHECKLIST' | 'HEALTH'>('TASKS');
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const loadData = () => {
    fetch('/api/organizer/tasks?eventId=evt-arass-ideathon-2026')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTasks(data.tasks || []);
          setChecklist(data.checklist || []);
          setHealth(data.health);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateTaskStatus = async (taskId: string, status: OrganizerTask['status']) => {
    try {
      const res = await fetch('/api/organizer/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'UPDATE_TASK', taskId, status }),
      });

      if (res.ok) {
        setNotice(`Task status set to ${status}.`);
        setTimeout(() => setNotice(null), 3000);
        loadData();
      }
    } catch {}
  };

  const handleToggleChecklist = async (checklistItemId: string, completed: boolean) => {
    try {
      const res = await fetch('/api/organizer/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'TOGGLE_CHECKLIST', checklistItemId, completed }),
      });

      if (res.ok) {
        setNotice(completed ? 'Item marked as completed.' : 'Item unchecked.');
        setTimeout(() => setNotice(null), 3000);
        loadData();
      }
    } catch {}
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-2">
              <ListTodo className="w-3.5 h-3.5" />
              <span>OPERATIONAL AUTOMATION</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white">Organizer Task Board & Event Health</h1>
            <p className="text-xs font-sans text-white/60 font-light">
              Automated operational action queues, lifecycle checklists, and real-time event health scorecards.
            </p>
          </div>

          {health && (
            <div className="p-3 px-5 rounded-2xl border border-electric-cyan/30 bg-[#020b18] flex items-center gap-4 font-mono text-xs">
              <div>
                <div className="text-[10px] text-white/50 uppercase">EVENT HEALTH</div>
                <div className="text-lg font-bold text-electric-cyan">{health.healthScore} / 100</div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {health.healthGrade}
              </span>
            </div>
          )}
        </div>

        {notice && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 gap-2 pb-2">
          {[
            { id: 'TASKS', label: `ACTIVE TASKS (${tasks.filter((t) => t.status !== 'DONE').length})` },
            { id: 'CHECKLIST', label: `LIFECYCLE CHECKLIST (${checklist.filter((c) => c.completed).length}/${checklist.length})` },
            { id: 'HEALTH', label: 'EVENT HEALTH METRICS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                activeTab === tab.id
                  ? 'bg-electric-cyan/20 border border-electric-cyan text-electric-cyan font-bold shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'text-white/60 border border-transparent hover:text-white hover:border-white/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Actionable Tasks */}
        {activeTab === 'TASKS' && (
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                Automated Operational Action Queue
              </h3>
              <span className="text-[10px] font-mono text-white/40">Priority Ranked</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    task.status === 'DONE'
                      ? 'border-white/10 bg-[#01050d]/50 text-white/40'
                      : 'border-white/15 bg-[#01050d] text-white shadow-[0_0_15px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-electric-cyan/15 text-electric-cyan font-bold">
                        {task.priority} PRIORITY
                      </span>
                      {task.autoGenerated && (
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white/60">AUTO-GENERATED</span>
                      )}
                    </div>
                    <div className={`text-sm font-bold ${task.status === 'DONE' ? 'line-through text-white/40' : 'text-white'}`}>
                      {task.title}
                    </div>
                    <p className="text-xs font-sans text-white/70 font-light">{task.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateTaskStatus(task.id, task.status === 'DONE' ? 'TODO' : 'DONE')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                        task.status === 'DONE'
                          ? 'border border-white/20 text-white/60 hover:text-white'
                          : 'bg-electric-cyan text-background hover:scale-105'
                      }`}
                    >
                      {task.status === 'DONE' ? 'REOPEN' : 'MARK COMPLETE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Lifecycle Checklist */}
        {activeTab === 'CHECKLIST' && (
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-6">
            {['BEFORE_EVENT', 'DURING_EVENT', 'AFTER_EVENT'].map((phaseKey) => {
              const phaseItems = checklist.filter((c) => c.phase === phaseKey);
              return (
                <div key={phaseKey} className="space-y-3">
                  <div className="text-xs font-mono font-bold text-electric-cyan uppercase tracking-widest border-b border-white/10 pb-1.5 flex items-center justify-between">
                    <span>{phaseKey.replace('_', ' ')} OPERATIONS</span>
                    <span className="text-white/40 text-[10px]">
                      {phaseItems.filter((i) => i.completed).length} / {phaseItems.length} COMPLETED
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    {phaseItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleToggleChecklist(item.id, !item.completed)}
                        className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          item.completed
                            ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300'
                            : 'border-white/10 bg-[#01050d] text-white hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => {}}
                            className="w-4 h-4 rounded border-white/20 text-electric-cyan focus:ring-0"
                          />
                          <span className={item.completed ? 'line-through text-white/50' : 'text-white font-medium'}>
                            {item.title}
                          </span>
                        </div>

                        {item.completed && (
                          <span className="text-[10px] text-emerald-400 font-bold">VERIFIED</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Event Health Breakdown */}
        {activeTab === 'HEALTH' && health && (
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-6 font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                Event Health Formula Breakdown
              </h3>
              <span className="text-[10px] text-emerald-400 font-bold">STATUS: {health.healthGrade}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-white/10 bg-[#01050d] space-y-1">
                <div className="text-white/40 text-[10px] uppercase">Attendance Ratio</div>
                <div className="text-2xl font-bold text-white">{health.attendanceRate}%</div>
                <div className="text-[10px] text-emerald-400">Target: &gt;80% (Weight: 25%)</div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#01050d] space-y-1">
                <div className="text-white/40 text-[10px] uppercase">Submission Completion</div>
                <div className="text-2xl font-bold text-white">{health.submissionCompletionRate}%</div>
                <div className="text-[10px] text-emerald-400">Target: &gt;75% (Weight: 35%)</div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#01050d] space-y-1">
                <div className="text-white/40 text-[10px] uppercase">Judging Completion</div>
                <div className="text-2xl font-bold text-white">{health.judgingCompletionRate}%</div>
                <div className="text-[10px] text-emerald-400">Target: 100% (Weight: 30%)</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/60 text-xs font-sans text-white/70 leading-relaxed">
              <strong>Methodology:</strong> The ARASS Event Health Score represents an aggregate reliability index incorporating real-time check-in arrival rates, signed deliverable completion, jury grading progress, and open incident deduction penalties.
            </div>
          </div>
        )}
      </div>
    </OrganizerLayout>
  );
}
