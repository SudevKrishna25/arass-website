/**
 * ARASS EVENTS — Check-In & Attendance Operations Service
 */

import { db } from '../events-db/engine';
import { CheckIn, CheckInMethod, CheckInStatus } from '../events-db/types';
import { AuditService } from './audit.service';

export class CheckInService {
  static performCheckIn(
    eventId: string,
    participantId: string,
    method: CheckInMethod = 'MANUAL',
    checkedInBy: string,
    teamId?: string
  ): CheckIn {
    const existing = Array.from(db.checkIns.values()).find(
      (c) => c.eventId === eventId && c.participantId === participantId
    );

    if (existing) {
      existing.status = 'CHECKED_IN';
      existing.timestamp = db.now();
      existing.method = method;
      existing.checkedInBy = checkedInBy;
      return existing;
    }

    const checkInId = db.generateId();
    const checkIn: CheckIn = {
      id: checkInId,
      eventId,
      participantId,
      teamId,
      method,
      status: 'CHECKED_IN',
      timestamp: db.now(),
      checkedInBy,
    };

    db.checkIns.set(checkInId, checkIn);

    AuditService.log('CHECKIN_CREATED', 'CHECK_IN', checkInId, checkedInBy, {
      eventId,
      participantId,
      method,
    });

    return checkIn;
  }

  static getEventCheckIns(eventId: string) {
    const registrations = Array.from(db.registrations.values()).filter((r) => r.eventId === eventId);
    const checkIns = Array.from(db.checkIns.values()).filter((c) => c.eventId === eventId);

    const checkedInCount = checkIns.filter((c) => c.status === 'CHECKED_IN').length;
    const totalRegistered = registrations.length;
    const percentage = totalRegistered > 0 ? Math.round((checkedInCount / totalRegistered) * 100) : 0;

    return {
      totalRegistered,
      checkedInCount,
      notArrivedCount: Math.max(0, totalRegistered - checkedInCount),
      attendanceRate: `${percentage}%`,
      records: checkIns.slice().reverse(),
    };
  }
}
