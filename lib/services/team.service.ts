/**
 * ARASS EVENTS — Team Service
 */

import { db } from '../events-db/engine';
import { Team, TeamMember, TeamInvitation } from '../events-db/types';
import { AuditService } from './audit.service';

export class TeamService {
  static create(eventId: string, leaderUserId: string, name: string): Team {
    const event = db.events.get(eventId);
    if (!event) throw new Error('Event not found.');

    const existingMember = Array.from(db.teamMembers.values()).find(
      (tm) => tm.userId === leaderUserId && db.teams.get(tm.teamId)?.eventId === eventId
    );
    if (existingMember) {
      throw new Error('User is already part of a team in this event.');
    }

    const teamId = db.generateId();
    const now = db.now();
    const code = `${name.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const team: Team = {
      id: teamId,
      eventId,
      name,
      code,
      leaderId: leaderUserId,
      status: 'ACTIVE',
      createdAt: now,
      updatedAt: now,
    };

    db.teams.set(teamId, team);

    const member: TeamMember = {
      id: db.generateId(),
      teamId,
      userId: leaderUserId,
      role: 'LEADER',
      status: 'ACTIVE',
      joinedAt: now,
    };

    db.teamMembers.set(member.id, member);

    AuditService.log('TEAM_CREATED', 'TEAM', teamId, leaderUserId, { eventId, name, code });
    return team;
  }

  static invite(teamId: string, invitedByUserId: string, invitedEmail: string): TeamInvitation {
    const team = db.teams.get(teamId);
    if (!team) throw new Error('Team not found.');

    const event = db.events.get(team.eventId);
    const currentMembers = Array.from(db.teamMembers.values()).filter((tm) => tm.teamId === teamId && tm.status === 'ACTIVE');

    if (event && currentMembers.length >= event.maxTeamSize) {
      throw new Error(`Team has already reached maximum capacity (${event.maxTeamSize} members).`);
    }

    const inviteId = db.generateId();
    const now = db.now();
    const expiresAt = new Date(Date.now() + 86400000 * 3).toISOString();

    const invite: TeamInvitation = {
      id: inviteId,
      teamId,
      invitedEmail: invitedEmail.toLowerCase(),
      invitedBy: invitedByUserId,
      status: 'PENDING',
      expiresAt,
      createdAt: now,
    };

    db.teamInvitations.set(inviteId, invite);
    AuditService.log('TEAM_INVITATION_SENT', 'TEAM_INVITATION', inviteId, invitedByUserId, { teamId, invitedEmail });
    return invite;
  }

  static acceptInvite(inviteId: string, userId: string): TeamMember {
    const invite = db.teamInvitations.get(inviteId);
    if (!invite) throw new Error('Invitation not found.');
    if (invite.status !== 'PENDING') throw new Error('Invitation is no longer pending.');

    const user = db.users.get(userId);
    if (!user || user.email.toLowerCase() !== invite.invitedEmail.toLowerCase()) {
      throw new Error('Invitation email does not match user account.');
    }

    const team = db.teams.get(invite.teamId);
    if (!team) throw new Error('Team not found.');

    const event = db.events.get(team.eventId);
    const currentMembers = Array.from(db.teamMembers.values()).filter((tm) => tm.teamId === team.id && tm.status === 'ACTIVE');

    if (event && currentMembers.length >= event.maxTeamSize) {
      throw new Error('Team is already full.');
    }

    invite.status = 'ACCEPTED';
    invite.invitedUserId = userId;

    const memberId = db.generateId();
    const member: TeamMember = {
      id: memberId,
      teamId: team.id,
      userId,
      role: 'MEMBER',
      status: 'ACTIVE',
      joinedAt: db.now(),
    };

    db.teamMembers.set(memberId, member);
    AuditService.log('TEAM_INVITATION_ACCEPTED', 'TEAM_INVITATION', inviteId, userId, { teamId: team.id });
    return member;
  }

  static getMembers(teamId: string) {
    const members = Array.from(db.teamMembers.values()).filter((tm) => tm.teamId === teamId && tm.status === 'ACTIVE');
    return members.map((m) => {
      const user = db.users.get(m.userId);
      const profile = db.profiles.get(m.userId);
      return { ...m, user, profile };
    });
  }
}
