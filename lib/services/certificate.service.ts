/**
 * ARASS EVENTS — Certificate Generation & Verification Service
 */

import crypto from 'crypto';
import { db } from '../events-db/engine';
import { Certificate } from '../events-db/types';
import { AuditService } from './audit.service';

export interface IssueCertificateDTO {
  eventId: string;
  recipientUserId: string;
  type: 'PARTICIPATION' | 'WINNER' | 'RUNNER_UP' | 'FINALIST' | 'SPECIAL_AWARD' | 'JUDGE';
  position?: string;
  teamId?: string;
  actorUserId?: string;
}

export class CertificateService {
  static issue(dto: IssueCertificateDTO): Certificate {
    const event = db.events.get(dto.eventId);
    if (!event) throw new Error('Event not found.');

    const user = db.users.get(dto.recipientUserId);
    const profile = db.profiles.get(dto.recipientUserId);
    if (!user) throw new Error('Recipient user not found.');

    // Idempotency: if an active certificate of the same type already exists for this recipient and event, return it
    const existing = Array.from(db.certificates.values()).find(
      (c) =>
        c.eventId === dto.eventId &&
        c.recipientUserId === dto.recipientUserId &&
        c.type === dto.type &&
        c.status === 'ISSUED'
    );
    if (existing) {
      return existing;
    }

    const certId = db.generateId();
    const now = db.now();
    const count = db.certificates.size + 1;
    const certificateId = `ARASS-${event.slug.slice(0, 4).toUpperCase()}-2026-${count.toString().padStart(6, '0')}`;

    const verificationPayload = `${certificateId}:${user.id}:${event.id}:${now}`;
    const verificationHash = crypto.createHash('sha256').update(verificationPayload).digest('hex');

    const cert: Certificate = {
      id: certId,
      certificateId,
      eventId: dto.eventId,
      recipientUserId: dto.recipientUserId,
      recipientName: profile?.name || user.email.split('@')[0],
      teamId: dto.teamId,
      type: dto.type,
      position: dto.position,
      status: 'ISSUED',
      issuedAt: now,
      verificationHash,
    };

    db.certificates.set(certId, cert);
    AuditService.log('CERTIFICATE_ISSUED', 'CERTIFICATE', certId, dto.actorUserId, {
      certificateId,
      recipientUserId: dto.recipientUserId,
    });

    return cert;
  }

  static verify(certificateId: string): { valid: boolean; status?: string; certificate?: Certificate; event?: any } {
    const cert = Array.from(db.certificates.values()).find(
      (c) => c.certificateId.toUpperCase() === certificateId.toUpperCase()
    );
    if (!cert) return { valid: false, status: 'NOT_FOUND' };

    const event = db.events.get(cert.eventId);
    return {
      valid: cert.status === 'ISSUED',
      status: cert.status,
      certificate: cert,
      event,
    };
  }

  static revoke(certificateId: string, actorUserId: string, reason?: string): boolean {
    const cert = Array.from(db.certificates.values()).find(
      (c) => c.certificateId.toUpperCase() === certificateId.toUpperCase()
    );
    if (!cert) return false;

    cert.status = 'REVOKED';
    cert.revokedAt = db.now();
    (cert as any).revocationReason = reason || 'Administrative audit correction';

    AuditService.log('CERTIFICATE_REVOKED', 'CERTIFICATE', cert.id, actorUserId, {
      certificateId: cert.certificateId,
      reason,
    });

    return true;
  }

  static getByUser(userId: string): Certificate[] {
    return Array.from(db.certificates.values()).filter((c) => c.recipientUserId === userId);
  }
}
