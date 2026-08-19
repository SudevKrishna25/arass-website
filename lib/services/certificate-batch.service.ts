import { db } from '@/lib/events-db/engine';
import { CertificateBatchJob, Certificate } from '@/lib/events-db/types';
import { CertificateService } from './certificate.service';
import { AuditService } from './audit.service';
import { NotificationService } from './notification.service';

export class CertificateBatchService {
  static createJob(params: {
    eventId: string;
    templateId?: string;
    type?: Certificate['type'];
    position?: string;
    operatorId: string;
  }): CertificateBatchJob {
    const event = db.events.get(params.eventId);
    if (!event) throw new Error('Event not found.');

    const registrations = Array.from(db.registrations.values()).filter(
      (r) => r.eventId === params.eventId && (r.status === 'SUBMITTED' || r.status === 'SHORTLISTED' || r.status === 'WINNER')
    );

    const totalCount = registrations.length || 1;
    const id = `batch-${db.generateId()}`;

    const job: CertificateBatchJob = {
      id,
      eventId: params.eventId,
      templateId: params.templateId,
      totalCount,
      processedCount: 0,
      failedCount: 0,
      status: 'PROCESSING',
      errorLog: [],
      createdAt: db.now(),
    };

    db.certificateBatchJobs.set(id, job);

    AuditService.log('CERT_BATCH_STARTED', 'CERTIFICATE_JOB', id, params.operatorId, {
      eventId: params.eventId,
      totalCount,
    });

    // Process all registrations in batch
    for (const reg of registrations) {
      try {
        const user = db.users.get(reg.userId);
        const profile = db.profiles.get(`prof-${reg.userId}`) || Array.from(db.profiles.values()).find((p) => p.userId === reg.userId);
        const recipientName = profile?.name || user?.email || 'Valued Participant';

        const cert = CertificateService.issue({
          eventId: params.eventId,
          recipientUserId: reg.userId,
          teamId: reg.teamId,
          type: params.type || 'PARTICIPATION',
          position: params.position || (reg.status === 'WINNER' ? 'Grand Champion' : undefined),
          actorUserId: params.operatorId,
        });

        job.processedCount++;

        // Notify recipient
        NotificationService.send({
          userId: reg.userId,
          eventId: params.eventId,
          title: 'Official Certificate Issued',
          message: `Your verified certificate of honor (${cert.certificateId}) for ${event.name} has been published.`,
          type: 'CERTIFICATE',
          actionUrl: `/verify/certificate/${cert.certificateId}`,
          actorUserId: params.operatorId,
        });
      } catch (err: any) {
        job.failedCount++;
        job.errorLog?.push(err.message || 'Issuance failure');
      }
    }

    job.status = job.failedCount === 0 ? 'COMPLETED' : job.processedCount > 0 ? 'COMPLETED' : 'FAILED';
    job.completedAt = db.now();
    db.certificateBatchJobs.set(id, job);

    AuditService.log('CERT_BATCH_COMPLETED', 'CERTIFICATE_JOB', id, params.operatorId, {
      processedCount: job.processedCount,
      failedCount: job.failedCount,
      status: job.status,
    });

    return job;
  }

  static getJob(jobId: string): CertificateBatchJob | undefined {
    return db.certificateBatchJobs.get(jobId);
  }

  static getByEvent(eventId: string): CertificateBatchJob[] {
    return Array.from(db.certificateBatchJobs.values())
      .filter((j) => j.eventId === eventId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
