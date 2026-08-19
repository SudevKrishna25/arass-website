import { NextRequest, NextResponse } from 'next/server';
import { requireRoleGuard } from '@/lib/auth/guard';
import { TaskChecklistService } from '@/lib/services/task-checklist.service';

export async function GET(req: NextRequest) {
  const auth = requireRoleGuard(req, ['SUPER_ADMIN', 'ORGANIZER', 'MANAGER']);
  if ('errorResponse' in auth) return auth.errorResponse;

  const url = new URL(req.url);
  const eventId = url.searchParams.get('eventId') || 'evt-arass-ideathon-2026';

  const tasks = TaskChecklistService.getTasks(eventId);
  const checklist = TaskChecklistService.getChecklist(eventId);
  const health = TaskChecklistService.calculateEventHealth(eventId);

  return NextResponse.json({ success: true, tasks, checklist, health });
}

export async function POST(req: NextRequest) {
  const auth = requireRoleGuard(req, ['SUPER_ADMIN', 'ORGANIZER', 'MANAGER']);
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { action, taskId, status, checklistItemId, completed } = body;

    if (action === 'UPDATE_TASK' && taskId && status) {
      const updated = TaskChecklistService.updateTaskStatus(taskId, status, auth.session.userId);
      return NextResponse.json({ success: true, task: updated });
    }

    if (action === 'TOGGLE_CHECKLIST' && checklistItemId) {
      const updated = TaskChecklistService.toggleChecklistItem(checklistItemId, !!completed, auth.session.userId);
      return NextResponse.json({ success: true, checklistItem: updated });
    }

    return NextResponse.json({ error: 'Invalid task/checklist operation.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Task mutation failed.' }, { status: 400 });
  }
}
