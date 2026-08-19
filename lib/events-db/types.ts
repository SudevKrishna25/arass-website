/**
 * ARASS EVENTS — Unified Data Model & Entity Types
 */

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ORGANIZER'
  | 'MANAGER'
  | 'EVALUATOR'
  | 'VIEWER'
  | 'PARTICIPANT';

export type UserStatus = 'ACTIVE' | 'PENDING' | 'SUSPENDED';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  phone?: string;
  college?: string;
  course?: string;
  year?: string;
  location?: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
  resume?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: UserRole;
  status: 'ACTIVE' | 'INVITED' | 'REMOVED';
  createdAt: string;
}

export type EventType =
  | 'HACKATHON'
  | 'IDEATHON'
  | 'COMPETITION'
  | 'QUIZ'
  | 'CODING_CHALLENGE'
  | 'CASE_COMPETITION'
  | 'DESIGN_CHALLENGE'
  | 'INNOVATION_CHALLENGE'
  | 'WORKSHOP'
  | 'WEBINAR'
  | 'HIRING_CHALLENGE'
  | 'ASSESSMENT'
  | 'OTHER';

export type EventStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'REGISTRATION_OPEN'
  | 'REGISTRATION_CLOSED'
  | 'LIVE'
  | 'EVALUATION'
  | 'RESULTS_PENDING'
  | 'COMPLETED'
  | 'ARCHIVED';

export type EventMode = 'ONLINE' | 'OFFLINE' | 'HYBRID';

export interface Event {
  id: string;
  organizationId: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  eventType: EventType;
  status: EventStatus;
  mode: EventMode;
  location?: string;
  website?: string;
  banner?: string;
  logo?: string;
  registrationStart: string;
  registrationEnd: string;
  eventStart: string;
  eventEnd: string;
  timezone: string;
  minTeamSize: number;
  maxTeamSize: number;
  prizePool: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type RegistrationFieldType =
  | 'TEXT'
  | 'TEXTAREA'
  | 'EMAIL'
  | 'PHONE'
  | 'NUMBER'
  | 'DATE'
  | 'SELECT'
  | 'MULTI_SELECT'
  | 'RADIO'
  | 'CHECKBOX'
  | 'FILE'
  | 'URL'
  | 'COLLEGE'
  | 'COURSE'
  | 'YEAR';

export interface RegistrationField {
  id: string;
  eventId: string;
  label: string;
  type: RegistrationFieldType;
  required: boolean;
  order: number;
  options?: string[];
  placeholder?: string;
  helpText?: string;
}

export type RegistrationStatus =
  | 'DRAFT'
  | 'INCOMPLETE'
  | 'SUBMITTED'
  | 'VERIFIED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'SHORTLISTED'
  | 'DISQUALIFIED'
  | 'WINNER';

export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  teamId?: string;
  status: RegistrationStatus;
  customValues: Record<string, any>;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  id: string;
  eventId: string;
  name: string;
  code: string;
  leaderId: string;
  status: 'ACTIVE' | 'DISBANDED' | 'DISQUALIFIED';
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: 'LEADER' | 'MEMBER';
  status: 'ACTIVE' | 'INVITED' | 'REMOVED';
  joinedAt: string;
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  invitedEmail: string;
  invitedUserId?: string;
  invitedBy: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  expiresAt: string;
  createdAt: string;
}

export type RoundStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'LIVE'
  | 'CLOSED'
  | 'EVALUATION'
  | 'COMPLETED';

export type SubmissionType = 'FILE' | 'URL' | 'TEXT' | 'ASSESSMENT' | 'MIXED';

export interface Round {
  id: string;
  eventId: string;
  name: string;
  description: string;
  order: number;
  status: RoundStatus;
  startAt: string;
  endAt: string;
  submissionType: SubmissionType;
  maxAttempts: number;
  durationSeconds?: number;
  gracePeriodSeconds?: number;
  submissionOpen?: boolean;
  submissionClosed?: boolean;
  autoAdvance?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CompetitionSessionStatus = 'SCHEDULED' | 'LIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';

export interface CompetitionSession {
  id: string;
  eventId: string;
  status: CompetitionSessionStatus;
  startedAt?: string;
  pausedAt?: string;
  endedAt?: string;
  currentRoundId?: string;
  serverTime: string;
  createdAt: string;
  updatedAt: string;
}

export type QuestionType =
  | 'MCQ'
  | 'MULTI_SELECT'
  | 'TRUE_FALSE'
  | 'NUMERICAL'
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'CODE';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean; // Server-only
}

export interface Question {
  id: string;
  assessmentId: string;
  type: QuestionType;
  text: string;
  options?: QuestionOption[];
  correctAnswer?: string | string[]; // Server-only
  marks: number;
  negativeMarks?: number;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
  order: number;
  codeTemplate?: string;
  testCases?: { input: string; output: string; isHidden?: boolean }[];
}

export interface Assessment {
  id: string;
  eventId: string;
  roundId: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  totalMarks: number;
  passingMarks?: number;
  randomizeQuestions?: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentAttempt {
  id: string;
  assessmentId: string;
  userId: string;
  teamId?: string;
  startedAt: string;
  submittedAt?: string;
  answers: Record<string, any>; // questionId -> answer
  score?: number;
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'TIMED_OUT' | 'EVALUATED';
}

export type CodeExecutionLanguage = 'python' | 'javascript' | 'typescript' | 'cpp' | 'java' | 'rust';

export interface CodeExecutionRequest {
  language: CodeExecutionLanguage;
  sourceCode: string;
  stdin?: string;
  expectedOutput?: string;
  timeLimitMs?: number;
  memoryLimitMb?: number;
}

export interface CodeExecutionResult {
  status: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT' | 'MEMORY_LIMIT' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR';
  stdout?: string;
  stderr?: string;
  executionTimeMs: number;
  memoryUsedMb: number;
}

export type AnnouncementPriority = 'INFO' | 'IMPORTANT' | 'URGENT';
export type AnnouncementAudience =
  | 'ALL_PARTICIPANTS'
  | 'TEAM_LEADERS'
  | 'SHORTLISTED_PARTICIPANTS'
  | 'JUDGES'
  | 'MENTORS'
  | 'ORGANIZERS';

export interface LiveAnnouncement {
  id: string;
  eventId: string;
  roundId?: string;
  title: string;
  message: string;
  priority: AnnouncementPriority;
  audience: AnnouncementAudience;
  publishedAt: string;
  authorUserId?: string;
}

export type IntegrityEventType =
  | 'TAB_SWITCH'
  | 'WINDOW_BLUR'
  | 'FULLSCREEN_EXIT'
  | 'COPY'
  | 'PASTE'
  | 'MULTIPLE_SESSION'
  | 'SUSPICIOUS_SUBMISSION';

export interface IntegrityEvent {
  id: string;
  eventId: string;
  participantId: string;
  type: IntegrityEventType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'NORMAL' | 'FLAGGED' | 'UNDER_REVIEW' | 'CLEARED' | 'CONFIRMED';
  details?: Record<string, any>;
  timestamp: string;
}

export interface Submission {
  id: string;
  roundId: string;
  eventId: string;
  participantId?: string;
  teamId?: string;
  title: string;
  description?: string;
  url?: string;
  demoUrl?: string;
  githubUrl?: string;
  pdfUrl?: string;
  zipUrl?: string;
  videoUrl?: string;
  presentationUrl?: string;
  customFields?: Record<string, any>;
  files: { filename: string; url: string; size: number; mimeType: string }[];
  version: number;
  status: 'DRAFT' | 'READY' | 'SUBMITTED' | 'UNDER_REVIEW' | 'EVALUATED' | 'SHORTLISTED' | 'REJECTED' | 'LOCKED';
  submittedAt: string;
  lockedAt?: string;
  versionHistory?: { version: number; author: string; timestamp: string; title: string; filesCount: number; url?: string; status: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  id: string;
  eventId: string;
  reportedBy: string;
  category: 'TECHNICAL' | 'PARTICIPANT' | 'JUDGE' | 'SUBMISSION' | 'VENUE' | 'INTEGRITY' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED';
  assignedOperatorId?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface SupportTicket {
  id: string;
  eventId: string;
  participantId: string;
  category: 'TECHNICAL' | 'REGISTRATION' | 'TEAM' | 'SUBMISSION' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  message: string;
  response?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeadlineExtension {
  id: string;
  eventId: string;
  roundId?: string;
  targetType: 'REGISTRATION' | 'ROUND' | 'SUBMISSION';
  previousDeadline: string;
  newDeadline: string;
  reason: string;
  operatorId: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  eventId?: string;
  title: string;
  message: string;
  type:
    | 'REGISTRATION'
    | 'TEAM_INVITE'
    | 'ROUND_STARTING'
    | 'ROUND_ENDING'
    | 'DEADLINE_REMINDER'
    | 'SUBMISSION_RECEIVED'
    | 'SHORTLISTED'
    | 'JUDGING'
    | 'RESULTS'
    | 'CERTIFICATE'
    | 'ANNOUNCEMENT'
    | 'ORGANIZER_MESSAGE';
  channel: 'IN_APP' | 'EMAIL';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface CertificateBatchJob {
  id: string;
  eventId: string;
  templateId?: string;
  totalCount: number;
  processedCount: number;
  failedCount: number;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  errorLog?: string[];
  createdAt: string;
  completedAt?: string;
}

export interface EventRule {
  id: string;
  eventId: string;
  category: 'ELIGIBILITY' | 'SUBMISSION' | 'TEAM' | 'CONDUCT' | 'JUDGING' | 'IP' | 'DISQUALIFICATION' | 'PRIZES';
  ruleTitle: string;
  description: string;
  sortOrder: number;
}

export interface EventFAQ {
  id: string;
  eventId: string;
  category: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface OrganizerTask {
  id: string;
  eventId: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  autoGenerated?: boolean;
}

export interface EventChecklistItem {
  id: string;
  eventId: string;
  phase: 'BEFORE_EVENT' | 'DURING_EVENT' | 'AFTER_EVENT';
  itemKey: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
}

export interface EvaluationCriteria {
  id: string;
  roundId: string;
  name: string;
  description?: string;
  weight: number;
  maxScore: number;
  order: number;
}

export interface Evaluation {
  id: string;
  roundId: string;
  submissionId: string;
  evaluatorId: string;
  scores: Record<string, number>; // criteriaId -> score
  totalScore: number;
  comments?: string;
  status: 'DRAFT' | 'SUBMITTED';
  submittedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  certificateId: string; // e.g. ARASS-IDEA-2026-000001
  eventId: string;
  recipientUserId: string;
  recipientName: string;
  teamId?: string;
  type: 'PARTICIPATION' | 'WINNER' | 'RUNNER_UP' | 'FINALIST' | 'SPECIAL_AWARD' | 'JUDGE';
  position?: string;
  status: 'ISSUED' | 'REVOKED';
  issuedAt: string;
  revokedAt?: string;
  verificationHash: string;
}

export type CheckInMethod = 'QR' | 'MANUAL' | 'BULK';
export type CheckInStatus = 'CHECKED_IN' | 'NOT_ARRIVED' | 'LATE';

export interface CheckIn {
  id: string;
  eventId: string;
  participantId: string;
  teamId?: string;
  method: CheckInMethod;
  status: CheckInStatus;
  timestamp: string;
  checkedInBy: string;
}

export interface Judge {
  id: string;
  userId?: string;
  name: string;
  email: string;
  organization: string;
  expertise: string[];
  workload: number;
  status: 'ACTIVE' | 'INVITED' | 'UNAVAILABLE';
}

export interface JudgeAssignment {
  id: string;
  judgeId: string;
  eventId: string;
  roundId?: string;
  submissionId: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface JudgeConflict {
  id: string;
  judgeId: string;
  eventId: string;
  submissionId?: string;
  participantId?: string;
  reason: 'ORGANIZATION' | 'PERSONAL' | 'PARTICIPANT' | 'OTHER';
  declaredAt: string;
}

export type SessionType = 'KEYNOTE' | 'WORKSHOP' | 'MENTORING' | 'JUDGING' | 'PRESENTATION' | 'NETWORKING';

export interface EventSession {
  id: string;
  eventId: string;
  title: string;
  speaker?: string;
  venue?: string;
  room?: string;
  type: SessionType;
  startAt: string;
  endAt: string;
}

export type SponsorTier = 'TITLE' | 'GOLD' | 'SILVER' | 'BRONZE' | 'PARTNER';

export interface Sponsor {
  id: string;
  eventId: string;
  name: string;
  logo: string;
  website: string;
  tier: SponsorTier;
  description?: string;
}

export interface Mentor {
  id: string;
  eventId: string;
  name: string;
  expertise: string[];
  organization: string;
  bio?: string;
  contact?: string;
}

export interface CertificateTemplate {
  id: string;
  eventId: string;
  orientation: 'LANDSCAPE' | 'PORTRAIT';
  paperSize?: 'A4' | 'LETTER';
  backgroundStyle: string;
  issuerTitle: string;
  customTokens: Record<string, string>;
}

export type AuditAction =
  | 'USER_REGISTERED'
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'ORGANIZATION_CREATED'
  | 'EVENT_CREATED'
  | 'EVENT_UPDATED'
  | 'EVENT_PUBLISHED'
  | 'EVENT_ARCHIVED'
  | 'EVENT_DUPLICATED'
  | 'EVENT_STARTED'
  | 'EVENT_PAUSED'
  | 'EVENT_RESUMED'
  | 'EVENT_ENDED'
  | 'ROUND_CREATED'
  | 'ROUND_UPDATED'
  | 'ROUND_STARTED'
  | 'ROUND_ENDED'
  | 'REGISTRATION_CREATED'
  | 'TEAM_CREATED'
  | 'TEAM_MODIFIED'
  | 'TEAM_INVITATION_SENT'
  | 'TEAM_INVITATION_ACCEPTED'
  | 'SUBMISSION_CREATED'
  | 'SUBMISSION_LOCKED'
  | 'EVALUATION_SUBMITTED'
  | 'SCORE_UNLOCKED'
  | 'JUDGE_INVITED'
  | 'JUDGE_ASSIGNED'
  | 'JUDGE_CONFLICT_DECLARED'
  | 'CHECKIN_CREATED'
  | 'PARTICIPANT_SHORTLISTED'
  | 'PARTICIPANT_APPROVED'
  | 'PARTICIPANT_REJECTED'
  | 'COMMUNICATION_DISPATCHED'
  | 'ANNOUNCEMENT_BROADCASTED'
  | 'ASSESSMENT_SUBMITTED'
  | 'INTEGRITY_FLAG_CREATED'
  | 'RESULTS_PUBLISHED'
  | 'CERTIFICATE_ISSUED'
  | 'CERTIFICATE_REVOKED'
  | 'SPONSOR_ADDED'
  | 'SCHEDULE_CREATED'
  | 'ROLE_CHANGED'
  | 'INCIDENT_LOGGED'
  | 'INCIDENT_UPDATED'
  | 'TICKET_CREATED'
  | 'TICKET_RESPONDED'
  | 'DEADLINE_EXTENDED'
  | 'NOTIFICATION_SENT'
  | 'CERT_BATCH_STARTED'
  | 'CERT_BATCH_COMPLETED'
  | 'TASK_UPDATED'
  | 'CHECKLIST_UPDATED'
  | 'PASSWORD_RESET_REQUESTED'
  | 'PASSWORD_RESET_COMPLETED'
  | 'PASSWORD_CHANGED'
  | 'EMAIL_VERIFIED'
  | 'SESSIONS_REVOKED_ALL'
  | 'SECURITY_TEST_AUDIT'
  | 'CONTENT_CREATED'
  | 'CONTENT_UPDATED'
  | 'CONTENT_DELETED'
  | 'NAVIGATION_UPDATED'
  | 'MEDIA_UPLOADED'
  | 'MEDIA_DELETED'
  | 'USER_ROLE_CHANGED'
  | 'USER_DISABLED'
  | 'SETTINGS_CHANGED';

export interface AuditLog {
  id: string;
  actorUserId?: string;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface AnalyticsEvent {
  id: string;
  eventId?: string;
  eventType: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

// ==========================================
// WEBSITE CMS & ADMIN CONTROL SYSTEM MODELS
// ==========================================

export type PageStatus = 'DRAFT' | 'PUBLISHED';
export type SectionType =
  | 'HERO'
  | 'TEXT'
  | 'IMAGE'
  | 'VIDEO'
  | 'FEATURE'
  | 'WORK'
  | 'CTA'
  | 'STATISTICS'
  | 'GALLERY'
  | 'EVENTS'
  | 'CUSTOM';

export type SectionVisibility = 'VISIBLE' | 'HIDDEN';

export interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: PageStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PageSection {
  id: string;
  pageId: string;
  type: SectionType;
  eyebrow?: string;
  title: string;
  body?: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  visibility: SectionVisibility;
  order: number;
  metadata?: Record<string, any>;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  storageKey: string;
  altText?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  destination: string;
  visibility: SectionVisibility;
  order: number;
  isSystemProtected?: boolean;
  isCta?: boolean;
}

export interface ContentRevision {
  id: string;
  entityType: 'PAGE' | 'SECTION' | 'NAVIGATION';
  entityId: string;
  version: number;
  payloadJson: string;
  createdById: string;
  createdAt: string;
}
