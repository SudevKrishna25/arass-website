# ARASS EVENTS — Phase 6 Baseline Architecture & Engineering Audit

**Date:** 2026-08-19  
**Phase:** 6 (Production Polish, Real-Time Operations, Participant Experience, Certificate Engine, Scale Readiness)  
**System Status:** 55/55 Tests Passing across Phases 1–5  

---

## 1. Current Architecture Overview
- **Framework:** Next.js 14 App Router (51 production routes)
- **Styling:** Tailwind CSS + ARASS Luxury Dark Cinematic Design System (Electric Cyan accent, deep midnight blue / graphite, subtle live 2D canvas atmosphere, zero Three.js / WebGL / 3D models)
- **Database Engine:** [`lib/events-db/engine.ts`](file:///e:/Working%20projects/ARASS_WEBSITE/lib/events-db/engine.ts) in-memory relational store with cryptographic hashing, relational foreign key lookups, and deterministic seed data.
- **Authentication & RBAC:** Cryptographic token cookies, role guards (`SUPER_ADMIN`, `ORGANIZER`, `JUDGE`, `PARTICIPANT`), and audit service.
- **Current Core Services:**
  - `AuthService`, `EventService`, `RegistrationService`, `TeamService`, `RoundService`, `SubmissionService`
  - `EvaluationService`, `CertificateService`, `SessionService`, `AssessmentService`, `LeaderboardService`, `AuditService`
  - `CheckInService`, `JudgeOpsService`, `EventBuilderService`, `ScheduleService`, `EmailService`

---

## 2. Reusable Services & Extension Points
1. **Live State Synchronization**: `CompetitionSessionService` maintains state (`IDLE`, `ACTIVE`, `PAUSED`, `CONCLUDED`) and broadcasts. Phase 6 will expand live event lifecycle states: `REGISTRATION_OPEN`, `REGISTRATION_CLOSED`, `EVENT_NOT_STARTED`, `EVENT_LIVE`, `ROUND_OPEN`, `ROUND_PAUSED`, `ROUND_CLOSED`, `JUDGING`, `RESULTS_PENDING`, `RESULTS_PUBLISHED`, `EVENT_COMPLETED`.
2. **Submissions & Versioning**: `SubmissionService` supports v1->v2 updates. Phase 6 will add draft states (`DRAFT`, `READY`, `SUBMITTED`, `UNDER_REVIEW`, `EVALUATED`, `LOCKED`), validation checks, and multi-file artifact attachments (ZIP, PDF, Video, Presentation).
3. **Notification Architecture**: Extend into a central `NotificationService` supporting In-App notifications (`/notifications`), read/unread state, and dynamic template rendering.
4. **Incident & Support Desk**: New `IncidentService` and `SupportTicketService` handling operational incidents (`TECHNICAL`, `PARTICIPANT`, `JUDGE`, `VENUE`, `INTEGRITY`) and participant support tickets.
5. **Deadline Extensions**: New extension workflow in `EventService` recording old/new timestamps, reason, operator ID, and sending notifications.
6. **Certificate Engine 3.0**: Add controlled canvas parameters (A4, Letter, Landscape, Portrait) and an asynchronous batch job pipeline (`QUEUED`, `PROCESSING`, `COMPLETED`, `FAILED`) with progress tracking.
7. **Judge Calibration**: Scoring variance analytics (`judge average`, `median`, `variance`, `divergence alerts`) in `JudgeOpsService`.
8. **Organizer Command Tasks & Checklist**: Pre-event, during-event, and post-event operational checklist + auto-generated task board (`/organizer/tasks`).

---

## 3. Technical Debt & Performance Audit
- **Search & Filtering**: Replace linear array scans with debounced multi-criteria search for events, submissions, teams, and attendees.
- **Real-Time Polling & Reactive Updates**: Ensure lightweight interval polling (`/api/events/[id]/session`) with millisecond timestamps so client UI reflects organizer actions (round pause, extension, announcement) without full reloads.
- **Data Validation & Sanitization**: Ensure strict payload validation across all new and existing POST/PUT endpoints.
- **Responsive Layout**: Maintain 0 horizontal overflow across 320px, 360px, 375px, 390px, 768px, 1024px, 1440px, 1920px.

---

## 4. Phase 6 Implementation Plan
- **Step 1: Database & Entity Expansion**: Add `Incident`, `SupportTicket`, `DeadlineExtension`, `Notification`, `CertificateBatchJob`, `EventRule`, `EventFAQ`, `OrganizerTask`, and expanded `Submission` fields in `lib/events-db/types.ts` & engine.
- **Step 2: Core Domain Services**: Implement `IncidentService`, `SupportService`, `NotificationService`, `CertificateBatchService`, `JudgeCalibrationService`, and `TaskChecklistService`.
- **Step 3: API Layer**: Create REST endpoints for incidents, tickets, notifications, deadline extensions, certificate batch jobs, search, FAQs, and tasks.
- **Step 4: Participant Experience Upgrades**:
  - `/dashboard`: Unified Participant Command Center with "NEXT ACTION" badge and tabs.
  - `/events/[slug]/live`: Real-time stage workspace with clear status, timer, announcements, and team panel.
  - Submission workspace with draft mode, validation, version history, and immutable submission timestamp.
  - `/notifications`: In-app notification center.
- **Step 5: Organizer Command & Live Operations Upgrades**:
  - `/organizer/events/[id]/live`: Live Control Room with status telemetry, emergency controls, deadline extension modal, and broadcast composer.
  - `/organizer/events/[id]/incidents` & `/organizer/support`: Event operations helpdesk and participant support queue.
  - `/organizer/tasks`: Auto-generated operational task board and event phase checklist.
  - `/organizer/events/[id]/calibration`: Judge scoring variance detector.
  - `/organizer/certificates`: Certificate Studio 3.0 with canvas designer & asynchronous bulk job progress.
- **Step 6: Discovery, Search & Leaderboard Upgrades**:
  - `/events`: Global search, multi-faceted filtering, category chips, social share dialog.
  - `/events/[slug]/leaderboard` & `/events/[slug]/results`: Multi-category leaderboard and published results center.
- **Step 7: Automated Testing & Visual Regression**:
  - `tests/phase6-production.spec.ts` (24 comprehensive end-to-end tests).
  - `tests/phase6-visual-audit.spec.ts` (17 high-res visual artifacts).
  - Full 6-phase Playwright regression suite.
