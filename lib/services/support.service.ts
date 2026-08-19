import { db } from '@/lib/events-db/engine';
import { SupportTicket } from '@/lib/events-db/types';
import { AuditService } from './audit.service';
import { NotificationService } from './notification.service';

export class SupportService {
  static createTicket(params: {
    eventId: string;
    participantId: string;
    category: SupportTicket['category'];
    priority: SupportTicket['priority'];
    message: string;
  }): SupportTicket {
    const id = `ticket-${db.generateId()}`;
    const ticket: SupportTicket = {
      id,
      eventId: params.eventId,
      participantId: params.participantId,
      category: params.category,
      priority: params.priority,
      status: 'OPEN',
      message: params.message,
      createdAt: db.now(),
      updatedAt: db.now(),
    };

    db.supportTickets.set(id, ticket);

    AuditService.log('TICKET_CREATED', 'SUPPORT_TICKET', id, params.participantId, {
      eventId: params.eventId,
      category: params.category,
    });

    return ticket;
  }

  static getByParticipant(participantId: string): SupportTicket[] {
    return Array.from(db.supportTickets.values())
      .filter((t) => t.participantId === participantId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static getByEvent(eventId: string): SupportTicket[] {
    return Array.from(db.supportTickets.values())
      .filter((t) => t.eventId === eventId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static respondTicket(ticketId: string, response: string, operatorId: string): SupportTicket {
    const ticket = db.supportTickets.get(ticketId);
    if (!ticket) throw new Error('Ticket not found.');

    ticket.response = response;
    ticket.status = 'RESOLVED';
    ticket.updatedAt = db.now();
    db.supportTickets.set(ticketId, ticket);

    AuditService.log('TICKET_RESPONDED', 'SUPPORT_TICKET', ticketId, operatorId, {
      responseSnippet: response.slice(0, 50),
    });

    // Notify participant
    NotificationService.send({
      userId: ticket.participantId,
      eventId: ticket.eventId,
      title: 'Support Ticket Update',
      message: `An organizer has responded to your ticket: "${response.slice(0, 80)}..."`,
      type: 'ORGANIZER_MESSAGE',
      actorUserId: operatorId,
    });

    return ticket;
  }
}
