/**
 * ARASS EVENTS — Immutable Audit Logging Service
 */

import { db } from '../events-db/engine';
import { AuditAction, AuditLog } from '../events-db/types';

export class AuditService {
  static log(
    action: AuditAction,
    resourceType: string,
    resourceId: string,
    actorUserId?: string,
    metadata?: Record<string, any>,
    ipAddress?: string,
    userAgent?: string
  ): AuditLog {
    const record: AuditLog = {
      id: db.generateId(),
      actorUserId,
      action,
      resourceType,
      resourceId,
      ipAddress,
      userAgent,
      metadata,
      timestamp: db.now(),
    };
    db.auditLogs.push(record);
    return record;
  }

  static getLogs(limit = 100, resourceId?: string): AuditLog[] {
    let logs = [...db.auditLogs];
    if (resourceId) {
      logs = logs.filter((l) => l.resourceId === resourceId);
    }
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  }
}
