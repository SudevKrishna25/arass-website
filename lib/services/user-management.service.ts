/**
 * ARASS — User & Role Management Service for Admin Control System
 */

import { db } from '../events-db/engine';
import { User, Profile, UserRole, UserStatus } from '../events-db/types';
import { AuditService } from './audit.service';
import { AuthService } from './auth.service';

export interface UserSummary {
  user: User;
  profile: Profile;
}

export class UserManagementService {
  static listUsers(filter?: { role?: UserRole; status?: UserStatus; query?: string }): UserSummary[] {
    let users = Array.from(db.users.values());

    if (filter?.role) {
      users = users.filter((u) => u.role === filter.role);
    }
    if (filter?.status) {
      users = users.filter((u) => u.status === filter.status);
    }
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      users = users.filter((u) => {
        const prof = db.profiles.get(u.id);
        return u.email.toLowerCase().includes(q) || (prof?.name && prof.name.toLowerCase().includes(q));
      });
    }

    return users.map((user) => ({
      user,
      profile: db.profiles.get(user.id) || {
        id: `prof-${user.id}`,
        userId: user.id,
        name: user.email.split('@')[0],
        skills: [],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }));
  }

  static updateUserRole(userId: string, newRole: UserRole, actorUserId: string, reason?: string): User {
    const user = db.users.get(userId);
    if (!user) throw new Error('User not found.');

    const oldRole = user.role;
    user.role = newRole;
    user.updatedAt = db.now();

    AuditService.log('USER_ROLE_CHANGED', 'USER', userId, actorUserId, {
      oldRole,
      newRole,
      reason: reason || 'Administrative role update',
    });

    return user;
  }

  static updateUserStatus(userId: string, newStatus: UserStatus, actorUserId: string, reason?: string): User {
    const user = db.users.get(userId);
    if (!user) throw new Error('User not found.');

    user.status = newStatus;
    user.updatedAt = db.now();

    AuditService.log('USER_DISABLED', 'USER', userId, actorUserId, {
      newStatus,
      reason: reason || 'Administrative status update',
    });

    return user;
  }

  static async revokeSessions(userId: string, actorUserId: string): Promise<{ success: boolean }> {
    await AuthService.revokeAllSessions(userId);
    AuditService.log('SESSIONS_REVOKED_ALL', 'USER', userId, actorUserId, { targetUserId: userId });
    return { success: true };
  }
}
