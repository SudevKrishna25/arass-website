/**
 * ARASS EVENTS — Relational Storage Engine
 */

import {
  User,
  Profile,
  Organization,
  OrganizationMember,
  Event,
  RegistrationField,
  Registration,
  Team,
  TeamMember,
  TeamInvitation,
  Round,
  Submission,
  EvaluationCriteria,
  Evaluation,
  Certificate,
  AuditLog,
  AnalyticsEvent,
  CompetitionSession,
  Assessment,
  Question,
  AssessmentAttempt,
  LiveAnnouncement,
  IntegrityEvent,
  CheckIn,
  Judge,
  JudgeAssignment,
  JudgeConflict,
  EventSession,
  Sponsor,
  Mentor,
  CertificateTemplate,
} from './types';
import { initialSeedData } from './seed';

class EventsDatabase {
  users: Map<string, User> = new Map();
  profiles: Map<string, Profile> = new Map();
  organizations: Map<string, Organization> = new Map();
  organizationMembers: Map<string, OrganizationMember> = new Map();
  events: Map<string, Event> = new Map();
  registrationFields: Map<string, RegistrationField> = new Map();
  registrations: Map<string, Registration> = new Map();
  teams: Map<string, Team> = new Map();
  teamMembers: Map<string, TeamMember> = new Map();
  teamInvitations: Map<string, TeamInvitation> = new Map();
  rounds: Map<string, Round> = new Map();
  submissions: Map<string, Submission> = new Map();
  evaluationCriteria: Map<string, EvaluationCriteria> = new Map();
  evaluations: Map<string, Evaluation> = new Map();
  certificates: Map<string, Certificate> = new Map();
  auditLogs: AuditLog[] = [];
  analyticsEvents: AnalyticsEvent[] = [];

  // Phase 4 Live Competition & Assessment Stores
  competitionSessions: Map<string, CompetitionSession> = new Map();
  assessments: Map<string, Assessment> = new Map();
  questions: Map<string, Question> = new Map();
  assessmentAttempts: Map<string, AssessmentAttempt> = new Map();
  liveAnnouncements: Map<string, LiveAnnouncement> = new Map();
  integrityEvents: IntegrityEvent[] = [];

  // Phase 5 Enterprise Operations Stores
  checkIns: Map<string, CheckIn> = new Map();
  judges: Map<string, Judge> = new Map();
  judgeAssignments: Map<string, JudgeAssignment> = new Map();
  judgeConflicts: Map<string, JudgeConflict> = new Map();
  eventSessions: Map<string, EventSession> = new Map();
  sponsors: Map<string, Sponsor> = new Map();
  mentors: Map<string, Mentor> = new Map();
  certificateTemplates: Map<string, CertificateTemplate> = new Map();

  // Phase 6 Production & Operations Stores
  incidents: Map<string, any> = new Map();
  supportTickets: Map<string, any> = new Map();
  deadlineExtensions: Map<string, any> = new Map();
  notifications: Map<string, any> = new Map();
  certificateBatchJobs: Map<string, any> = new Map();
  eventRules: Map<string, any> = new Map();
  eventFAQs: Map<string, any> = new Map();
  organizerTasks: Map<string, any> = new Map();
  eventChecklist: Map<string, any> = new Map();

  // Website CMS & Admin Stores
  pages: Map<string, any> = new Map();
  pageSections: Map<string, any> = new Map();
  mediaAssets: Map<string, any> = new Map();
  navigationItems: Map<string, any> = new Map();
  contentRevisions: Map<string, any> = new Map();

  // Founder Executive Conference & Audit Log Store
  founderConferenceMessages: Map<string, any> = new Map();
  founderAuditLogs: any[] = [];

  private isInitialized = false;

  constructor() {
    this.init();
  }

  public init() {
    if (this.isInitialized) return;
    initialSeedData(this);
    this.isInitialized = true;
  }

  public reset() {
    this.users.clear();
    this.profiles.clear();
    this.organizations.clear();
    this.organizationMembers.clear();
    this.events.clear();
    this.registrationFields.clear();
    this.registrations.clear();
    this.teams.clear();
    this.teamMembers.clear();
    this.teamInvitations.clear();
    this.rounds.clear();
    this.submissions.clear();
    this.evaluationCriteria.clear();
    this.evaluations.clear();
    this.certificates.clear();
    this.auditLogs = [];
    this.analyticsEvents = [];
    this.competitionSessions.clear();
    this.assessments.clear();
    this.questions.clear();
    this.assessmentAttempts.clear();
    this.liveAnnouncements.clear();
    this.integrityEvents = [];
    this.checkIns.clear();
    this.judges.clear();
    this.judgeAssignments.clear();
    this.judgeConflicts.clear();
    this.eventSessions.clear();
    this.sponsors.clear();
    this.mentors.clear();
    this.certificateTemplates.clear();
    this.incidents.clear();
    this.supportTickets.clear();
    this.deadlineExtensions.clear();
    this.notifications.clear();
    this.certificateBatchJobs.clear();
    this.eventRules.clear();
    this.eventFAQs.clear();
    this.organizerTasks.clear();
    this.eventChecklist.clear();
    this.pages.clear();
    this.pageSections.clear();
    this.mediaAssets.clear();
    this.navigationItems.clear();
    this.contentRevisions.clear();
    this.isInitialized = false;
    this.init();
  }

  // --- Helpers ---
  public generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public now(): string {
    return new Date().toISOString();
  }
}

// Global Singleton
const globalForDb = globalThis as unknown as { arassEventsDb?: EventsDatabase };
export const db = globalForDb.arassEventsDb ?? new EventsDatabase();
if (process.env.NODE_ENV !== 'production') globalForDb.arassEventsDb = db;
