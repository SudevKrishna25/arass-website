/**
 * ARASS EVENTS — Analytics Service
 */

import { db } from '../events-db/engine';
import { AnalyticsEvent } from '../events-db/types';

export class AnalyticsService {
  static track(eventType: string, eventId?: string, userId?: string, metadata?: Record<string, any>): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: db.generateId(),
      eventId,
      eventType,
      userId,
      metadata,
      timestamp: db.now(),
    };
    db.analyticsEvents.push(event);
    return event;
  }

  static getEventMetrics(eventId: string) {
    const events = db.analyticsEvents.filter((e) => e.eventId === eventId);
    const registrations = Array.from(db.registrations.values()).filter((r) => r.eventId === eventId);
    const teams = Array.from(db.teams.values()).filter((t) => t.eventId === eventId);
    const submissions = Array.from(db.submissions.values()).filter((s) => s.eventId === eventId);
    const certificates = Array.from(db.certificates.values()).filter((c) => c.eventId === eventId);

    const views = events.filter((e) => e.eventType === 'EVENT_VIEW').length;

    return {
      totalViews: views,
      totalRegistrations: registrations.length,
      totalTeams: teams.length,
      totalSubmissions: submissions.length,
      totalCertificatesIssued: certificates.length,
      conversionRate: views > 0 ? ((registrations.length / views) * 100).toFixed(1) + '%' : 'N/A',
    };
  }
}
