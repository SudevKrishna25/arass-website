/**
 * ARASS EVENTS — Live Announcement Broadcasting Service
 */

import { db } from '../events-db/engine';
import { LiveAnnouncement, AnnouncementPriority, AnnouncementAudience } from '../events-db/types';
import { AuditService } from './audit.service';

export class LiveAnnouncementService {
  static broadcast(
    eventId: string,
    title: string,
    message: string,
    priority: AnnouncementPriority = 'INFO',
    audience: AnnouncementAudience = 'ALL_PARTICIPANTS',
    roundId?: string,
    authorUserId?: string
  ): LiveAnnouncement {
    const annId = db.generateId();
    const now = db.now();

    const announcement: LiveAnnouncement = {
      id: annId,
      eventId,
      roundId,
      title,
      message,
      priority,
      audience,
      publishedAt: now,
      authorUserId,
    };

    db.liveAnnouncements.set(annId, announcement);

    AuditService.log('ANNOUNCEMENT_BROADCASTED', 'LIVE_ANNOUNCEMENT', annId, authorUserId, {
      eventId,
      priority,
      title,
    });

    return announcement;
  }

  static getByEvent(eventId: string): LiveAnnouncement[] {
    return Array.from(db.liveAnnouncements.values())
      .filter((a) => a.eventId === eventId)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
}
