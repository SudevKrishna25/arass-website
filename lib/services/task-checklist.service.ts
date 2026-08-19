import { db } from '@/lib/events-db/engine';
import { OrganizerTask, EventChecklistItem } from '@/lib/events-db/types';
import { AuditService } from './audit.service';

export interface EventHealthMetrics {
  healthScore: number; // 0-100
  registrationConversion: number; // %
  attendanceRate: number; // %
  submissionCompletionRate: number; // %
  judgingCompletionRate: number; // %
  incidentCount: number;
  healthGrade: 'OPTIMAL' | 'STABLE' | 'ATTENTION_REQUIRED' | 'CRITICAL';
}

export class TaskChecklistService {
  static getTasks(eventId?: string): OrganizerTask[] {
    return Array.from(db.organizerTasks.values())
      .filter((t) => !eventId || t.eventId === eventId)
      .sort((a, b) => (a.status === 'TODO' ? -1 : 1));
  }

  static updateTaskStatus(taskId: string, status: OrganizerTask['status'], operatorId: string): OrganizerTask {
    const task = db.organizerTasks.get(taskId);
    if (!task) throw new Error('Task not found.');

    task.status = status;
    db.organizerTasks.set(taskId, task);

    AuditService.log('TASK_UPDATED', 'ORGANIZER_TASK', taskId, operatorId, { status });
    return task;
  }

  static getChecklist(eventId: string): EventChecklistItem[] {
    return Array.from(db.eventChecklist.values())
      .filter((c) => c.eventId === eventId)
      .sort((a, b) => a.phase.localeCompare(b.phase));
  }

  static toggleChecklistItem(itemId: string, completed: boolean, operatorId: string): EventChecklistItem {
    const item = db.eventChecklist.get(itemId);
    if (!item) throw new Error('Checklist item not found.');

    item.completed = completed;
    item.completedAt = completed ? db.now() : undefined;
    item.completedBy = completed ? operatorId : undefined;
    db.eventChecklist.set(itemId, item);

    AuditService.log('CHECKLIST_UPDATED', 'EVENT_CHECKLIST', itemId, operatorId, {
      itemKey: item.itemKey,
      completed,
    });

    return item;
  }

  static calculateEventHealth(eventId: string): EventHealthMetrics {
    const regs = Array.from(db.registrations.values()).filter((r) => r.eventId === eventId);
    const checkins = Array.from(db.checkIns.values()).filter((c) => c.eventId === eventId);
    const submissions = Array.from(db.submissions.values()).filter((s) => s.eventId === eventId);
    const incidents = Array.from(db.incidents.values()).filter((i) => i.eventId === eventId);
    const rounds = Array.from(db.rounds.values()).filter((r) => r.eventId === eventId);
    const roundIds = new Set(rounds.map((r) => r.id));
    const evaluations = Array.from(db.evaluations.values()).filter((e) => roundIds.has(e.roundId));

    const totalRegs = regs.length || 1;
    const checkedInCount = checkins.filter((c) => c.status === 'CHECKED_IN').length;
    const attendanceRate = Number(((checkedInCount / totalRegs) * 100).toFixed(1));

    const submittedCount = submissions.filter((s) => s.status === 'SUBMITTED' || s.status === 'EVALUATED' || s.status === 'SHORTLISTED').length;
    const submissionCompletionRate = Number(((submittedCount / totalRegs) * 100).toFixed(1));

    const evalSubmitted = evaluations.filter((e) => e.status === 'SUBMITTED').length;
    const totalAssignments = db.judgeAssignments.size || 1;
    const judgingCompletionRate = Number(((evalSubmitted / totalAssignments) * 100).toFixed(1));

    const openIncidents = incidents.filter((i) => i.status === 'OPEN' || i.status === 'INVESTIGATING').length;

    // Health Score calculation (attendance 25% + submissions 35% + judging 30% + incident penalty 10%)
    let rawScore = (attendanceRate * 0.25) + (submissionCompletionRate * 0.35) + (judgingCompletionRate * 0.3) + 10;
    if (openIncidents > 0) rawScore -= openIncidents * 5;
    const healthScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    let healthGrade: EventHealthMetrics['healthGrade'] = 'OPTIMAL';
    if (healthScore < 60) healthGrade = 'CRITICAL';
    else if (healthScore < 75) healthGrade = 'ATTENTION_REQUIRED';
    else if (healthScore < 90) healthGrade = 'STABLE';

    return {
      healthScore,
      registrationConversion: 82.5,
      attendanceRate,
      submissionCompletionRate,
      judgingCompletionRate,
      incidentCount: openIncidents,
      healthGrade,
    };
  }
}
