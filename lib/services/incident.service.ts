import { db } from '@/lib/events-db/engine';
import { Incident } from '@/lib/events-db/types';
import { AuditService } from './audit.service';

export class IncidentService {
  static create(params: {
    eventId: string;
    reportedBy: string;
    category: Incident['category'];
    priority: Incident['priority'];
    description: string;
    assignedOperatorId?: string;
  }): Incident {
    const id = `inc-${db.generateId()}`;
    const incident: Incident = {
      id,
      eventId: params.eventId,
      reportedBy: params.reportedBy,
      category: params.category,
      priority: params.priority,
      description: params.description,
      status: 'OPEN',
      assignedOperatorId: params.assignedOperatorId,
      createdAt: db.now(),
    };

    db.incidents.set(id, incident);

    AuditService.log('INCIDENT_LOGGED', 'INCIDENT', id, params.reportedBy, {
      eventId: params.eventId,
      category: params.category,
      priority: params.priority,
    });

    return incident;
  }

  static getByEvent(eventId: string): Incident[] {
    return Array.from(db.incidents.values())
      .filter((i) => i.eventId === eventId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static updateStatus(
    id: string,
    status: Incident['status'],
    operatorId: string,
    assignedOperatorId?: string
  ): Incident {
    const incident = db.incidents.get(id);
    if (!incident) throw new Error('Incident not found.');

    incident.status = status;
    if (assignedOperatorId) incident.assignedOperatorId = assignedOperatorId;
    if (status === 'RESOLVED' || status === 'CLOSED') {
      incident.resolvedAt = db.now();
    }

    db.incidents.set(id, incident);

    AuditService.log('INCIDENT_UPDATED', 'INCIDENT', id, operatorId, {
      newStatus: status,
      assignedOperatorId: incident.assignedOperatorId,
    });

    return incident;
  }
}
