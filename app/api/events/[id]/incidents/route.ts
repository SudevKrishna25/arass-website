import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { IncidentService } from '@/lib/services/incident.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const incidents = IncidentService.getByEvent(event.id);
  return NextResponse.json({ success: true, incidents });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const { action, incidentId, status, category, priority, description, assignedOperatorId } = body;

    if (action === 'UPDATE_STATUS' && incidentId && status) {
      const updated = IncidentService.updateStatus(incidentId, status, auth.session.userId, assignedOperatorId);
      return NextResponse.json({ success: true, incident: updated });
    }

    if (!category || !priority || !description) {
      return NextResponse.json({ error: 'Category, priority, and description are required.' }, { status: 400 });
    }

    const created = IncidentService.create({
      eventId: event.id,
      reportedBy: auth.session.userId,
      category,
      priority,
      description,
      assignedOperatorId,
    });

    return NextResponse.json({ success: true, incident: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Incident mutation failed.' }, { status: 400 });
  }
}
