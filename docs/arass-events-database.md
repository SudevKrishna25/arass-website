# ARASS EVENTS — Database Schema & Entity Documentation

## Overview
ARASS EVENTS utilizes a normalized relational entity model with UUID primary keys, ISO-8601 timestamps, explicit foreign keys, indexes, and immutable audit logs.

## Entity Relational Graph

```
Organization
  ├── OrganizationMember (User)
  └── Event
        ├── EventMedia
        ├── EligibilityRule
        ├── RegistrationField
        ├── Registration (User, Team)
        │     └── RegistrationValue
        ├── Team (Leader: User)
        │     ├── TeamMember (User)
        │     └── TeamInvitation (Invited User)
        ├── Round
        │     ├── EvaluationCriteria
        │     ├── Submission (Team, Participant)
        │     │     ├── SubmissionFile
        │     │     └── Evaluation (Evaluator)
        │     │           └── Score (Criteria)
        │     └── RoundParticipant
        ├── Prize
        ├── Certificate (Recipient, Team)
        │     └── CertificateVerification
        ├── Campaign
        ├── Referral
        │     └── ReferralClick
        ├── Notification
        ├── AnalyticsEvent
        └── AuditLog
```

## Core Tables & Fields

1. **`users`**
   - `id`: UUID (PK)
   - `email`: VARCHAR(255) UNIQUE NOT NULL
   - `password_hash`: VARCHAR(255) NOT NULL
   - `role`: VARCHAR(50) NOT NULL (`SUPER_ADMIN`, `ORGANIZER`, `MANAGER`, `EVALUATOR`, `VIEWER`, `PARTICIPANT`)
   - `status`: VARCHAR(50) NOT NULL (`ACTIVE`, `PENDING`, `SUSPENDED`)
   - `email_verified`: BOOLEAN DEFAULT FALSE
   - `last_login_at`: TIMESTAMP WITH TIME ZONE
   - `created_at`, `updated_at`: TIMESTAMP WITH TIME ZONE

2. **`profiles`**
   - `id`: UUID (PK)
   - `user_id`: UUID (FK -> users.id) UNIQUE
   - `name`: VARCHAR(255) NOT NULL
   - `phone`: VARCHAR(50)
   - `college`, `course`, `year`: VARCHAR(255)
   - `location`: VARCHAR(255)
   - `skills`: TEXT[]
   - `github`, `linkedin`, `portfolio`, `resume`: VARCHAR(500)
   - `bio`: TEXT
   - `avatar`: VARCHAR(500)
   - `created_at`, `updated_at`: TIMESTAMP WITH TIME ZONE

3. **`organizations`** & **`organization_members`**
   - Organization: `id`, `name`, `slug`, `logo`, `website`, `created_at`
   - Member: `id`, `organization_id`, `user_id`, `role`, `status`, `created_at`

4. **`events`**
   - `id`: UUID (PK)
   - `organization_id`: UUID (FK -> organizations.id)
   - `slug`: VARCHAR(255) UNIQUE NOT NULL
   - `name`: VARCHAR(255) NOT NULL
   - `short_description`: TEXT
   - `description`: TEXT
   - `event_type`: VARCHAR(50) NOT NULL (`HACKATHON`, `IDEATHON`, `COMPETITION`, `QUIZ`, `CODING_CHALLENGE`, `CASE_COMPETITION`, `DESIGN_CHALLENGE`, `INNOVATION_CHALLENGE`, `WORKSHOP`, `WEBINAR`, `HIRING_CHALLENGE`, `ASSESSMENT`, `OTHER`)
   - `status`: VARCHAR(50) NOT NULL (`DRAFT`, `SCHEDULED`, `REGISTRATION_OPEN`, `REGISTRATION_CLOSED`, `LIVE`, `EVALUATION`, `RESULTS_PENDING`, `COMPLETED`, `ARCHIVED`)
   - `mode`: VARCHAR(50) NOT NULL (`ONLINE`, `OFFLINE`, `HYBRID`)
   - `location`, `website`, `banner`, `logo`: VARCHAR(500)
   - `registration_start`, `registration_end`: TIMESTAMP WITH TIME ZONE
   - `event_start`, `event_end`: TIMESTAMP WITH TIME ZONE
   - `timezone`: VARCHAR(50) DEFAULT 'UTC'
   - `min_team_size`, `max_team_size`: INT DEFAULT 1
   - `prize_pool`: DECIMAL(12, 2) DEFAULT 0
   - `created_by`, `created_at`, `updated_at`: TIMESTAMP WITH TIME ZONE

5. **`rounds`**, **`submissions`**, **`evaluations`**, **`scores`**
   - Rounds: `id`, `event_id`, `name`, `description`, `order`, `status`, `start_at`, `end_at`, `submission_type`, `max_attempts`
   - Submissions: `id`, `round_id`, `team_id`, `participant_id`, `version`, `status`, `submitted_at`
   - Evaluation Criteria: `id`, `round_id`, `name`, `weight`, `max_score`, `order`
   - Evaluations: `id`, `assignment_id`, `submission_id`, `evaluator_id`, `comments`, `submitted_at`
   - Scores: `id`, `evaluation_id`, `criteria_id`, `score`

6. **`certificates`** & **`certificate_verifications`**
   - Certificate: `id`, `certificate_id` (UNIQUE e.g. `ARASS-IDEA-2026-000001`), `event_id`, `recipient_user_id`, `team_id`, `type`, `position`, `status`, `issued_at`
   - Verification: `id`, `certificate_id`, `verification_hash`, `verified_at`

7. **`audit_logs`**
   - Append-only immutable log: `id`, `actor_user_id`, `action`, `resource_type`, `resource_id`, `ip_address`, `user_agent`, `metadata`, `timestamp`
