/**
 * ARASS EVENTS — Organization Service
 */

import { db } from '../events-db/engine';
import { Organization, OrganizationMember, UserRole } from '../events-db/types';
import { AuditService } from './audit.service';

export class OrganizationService {
  static create(name: string, slug: string, creatorUserId: string, website?: string): Organization {
    const orgId = db.generateId();
    const now = db.now();

    const org: Organization = {
      id: orgId,
      name,
      slug,
      website,
      createdAt: now,
      updatedAt: now,
    };

    db.organizations.set(orgId, org);

    const member: OrganizationMember = {
      id: db.generateId(),
      organizationId: orgId,
      userId: creatorUserId,
      role: 'ORGANIZER',
      status: 'ACTIVE',
      createdAt: now,
    };

    db.organizationMembers.set(member.id, member);

    AuditService.log('ORGANIZATION_CREATED', 'ORGANIZATION', orgId, creatorUserId, { name, slug });
    return org;
  }

  static getById(id: string): Organization | null {
    return db.organizations.get(id) || null;
  }

  static listAll(): Organization[] {
    return Array.from(db.organizations.values());
  }
}
