# ARASS EVENTS — PRODUCTION DATABASE ARCHITECTURE & MIGRATION GUIDE

**Database Engine**: PostgreSQL 16+ (Production) / In-Memory Multitenant Store (Development/Testing)  
**ORM / Data Layer**: Pluggable Repository Abstraction (`lib/events-db/repository.ts`) with PostgreSQL SQL Dialect & Prepared Statements.

---

## 1. Production PostgreSQL Schema DDL

```sql
-- ARASS EVENTS PRODUCTION DDL SCHEMA (PostgreSQL 16+)
-- Multi-Tenant Isolation by organization_id

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 1. Organizations
CREATE TABLE organizations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    tier VARCHAR(32) DEFAULT 'STANDARD',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Users & Credentials
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) REFERENCES organizations(id) ON DELETE SET NULL,
    email CITEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'PARTICIPANT',
    avatar_url TEXT,
    bio TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_org ON users(organization_id);
CREATE INDEX idx_users_role ON users(role);

-- 3. Sessions & Revocation
CREATE TABLE user_sessions (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(512) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(session_token);

-- 4. Events
CREATE TABLE events (
    id VARCHAR(64) PRIMARY KEY,
    organization_id VARCHAR(64) NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT',
    mode VARCHAR(32) NOT NULL DEFAULT 'ONLINE',
    banner_url TEXT,
    logo_url TEXT,
    registration_start TIMESTAMPTZ NOT NULL,
    registration_end TIMESTAMPTZ NOT NULL,
    event_start TIMESTAMPTZ NOT NULL,
    event_end TIMESTAMPTZ NOT NULL,
    timezone VARCHAR(64) DEFAULT 'UTC',
    min_team_size INT DEFAULT 1,
    max_team_size INT DEFAULT 4,
    prize_pool NUMERIC(12,2) DEFAULT 0,
    created_by VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_org ON events(organization_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_slug ON events(slug);

-- 5. Rounds & Tracks
CREATE TABLE rounds (
    id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    round_order INT NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'SCHEDULED',
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    submission_type VARCHAR(32) NOT NULL DEFAULT 'MIXED',
    max_attempts INT DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_rounds_event ON rounds(event_id);

-- 6. Evaluation Criteria
CREATE TABLE evaluation_criteria (
    id VARCHAR(64) PRIMARY KEY,
    round_id VARCHAR(64) NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    weight NUMERIC(5,2) NOT NULL,
    max_score NUMERIC(5,2) NOT NULL,
    sort_order INT DEFAULT 1
);

CREATE INDEX idx_criteria_round ON evaluation_criteria(round_id);

-- 7. Teams & Memberships
CREATE TABLE teams (
    id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(32) UNIQUE NOT NULL,
    leader_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(32) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE team_members (
    id VARCHAR(64) PRIMARY KEY,
    team_id VARCHAR(64) NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(32) DEFAULT 'MEMBER',
    status VARCHAR(32) DEFAULT 'ACTIVE',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

CREATE INDEX idx_teams_event ON teams(event_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);

-- 8. Registrations
CREATE TABLE registrations (
    id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    team_id VARCHAR(64) REFERENCES teams(id) ON DELETE SET NULL,
    status VARCHAR(32) DEFAULT 'VERIFIED',
    custom_values JSONB DEFAULT '{}'::jsonb,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_user ON registrations(user_id);

-- 9. Submissions & Deliverables
CREATE TABLE submissions (
    id VARCHAR(64) PRIMARY KEY,
    round_id VARCHAR(64) NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
    event_id VARCHAR(64) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    team_id VARCHAR(64) REFERENCES teams(id) ON DELETE SET NULL,
    participant_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT,
    files JSONB DEFAULT '[]'::jsonb,
    version INT DEFAULT 1,
    status VARCHAR(32) DEFAULT 'SUBMITTED',
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_submissions_round ON submissions(round_id);
CREATE INDEX idx_submissions_event ON submissions(event_id);
CREATE INDEX idx_submissions_team ON submissions(team_id);

-- 10. Evaluations & Scoring
CREATE TABLE evaluations (
    id VARCHAR(64) PRIMARY KEY,
    round_id VARCHAR(64) NOT NULL REFERENCES rounds(id) ON DELETE CASCADE,
    submission_id VARCHAR(64) NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    evaluator_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    scores JSONB NOT NULL DEFAULT '{}'::jsonb,
    total_score NUMERIC(6,2) NOT NULL,
    comments TEXT,
    status VARCHAR(32) DEFAULT 'SUBMITTED',
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(submission_id, evaluator_id)
);

CREATE INDEX idx_evaluations_sub ON evaluations(submission_id);

-- 11. Juror Conflicts of Interest
CREATE TABLE judge_conflicts (
    id VARCHAR(64) PRIMARY KEY,
    judge_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id VARCHAR(64) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    submission_id VARCHAR(64) REFERENCES submissions(id) ON DELETE CASCADE,
    participant_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    reason VARCHAR(64) NOT NULL,
    declared_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conflicts_judge ON judge_conflicts(judge_id);

-- 12. Certificates of Honor
CREATE TABLE certificates (
    id VARCHAR(64) PRIMARY KEY,
    certificate_id VARCHAR(64) UNIQUE NOT NULL,
    event_id VARCHAR(64) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    recipient_user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_name VARCHAR(255) NOT NULL,
    team_id VARCHAR(64) REFERENCES teams(id) ON DELETE SET NULL,
    type VARCHAR(32) NOT NULL,
    position VARCHAR(128),
    status VARCHAR(32) DEFAULT 'ISSUED',
    issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verification_hash VARCHAR(128) NOT NULL,
    revoked_at TIMESTAMPTZ,
    revoked_by VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    revocation_reason TEXT,
    pdf_url TEXT,
    UNIQUE(event_id, recipient_user_id, type)
);

CREATE INDEX idx_certificates_cert_id ON certificates(certificate_id);
CREATE INDEX idx_certificates_event ON certificates(event_id);
CREATE INDEX idx_certificates_user ON certificates(recipient_user_id);

-- 13. Operational Incidents & Support
CREATE TABLE incidents (
    id VARCHAR(64) PRIMARY KEY,
    event_id VARCHAR(64) NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    reported_by VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(32) NOT NULL,
    priority VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(32) DEFAULT 'OPEN',
    assigned_operator_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 14. Immutable Audit Logs
CREATE TABLE audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    actor_user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(64) NOT NULL,
    resource_type VARCHAR(64) NOT NULL,
    resource_id VARCHAR(64) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_time ON audit_logs(timestamp DESC);
```

---

## 2. Seed Strategies

### Development Seed
Automatically runs via `lib/events-db/seed.ts` populating complete test scenarios (`Alex Chen`, `Marcus Vance`, `ARASS IDEATHON 2026`, submissions, jury evaluations, issued certificates).

### Staging Seed
Populates institutional demonstration events and organizer accounts with sanitized dummy participant accounts.

### Production Seed
**Strict Isolation Policy**:
- Zero demo participant accounts or mock submissions created.
- Only creates root organization record (`org-arass`).
- Super Admin account created exclusively via secure bootstrap secret (`scripts/bootstrap-super-admin.ts`).

---

## 3. Database Backup & Restore Runbook

### 3.1 Automated Daily Snapshot Backup
```bash
#!/bin/bash
# Backup script running on schedule
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/backups/arass_events_${BACKUP_DATE}.sql.gz"

pg_dump -h $PGHOST -U $PGUSER -d arass_events -F c -b -v | gzip > $BACKUP_FILE
aws s3 cp $BACKUP_FILE s3://${BACKUP_S3_BUCKET}/postgres/${BACKUP_DATE}/
```

### 3.2 Recovery & Restore
```bash
# Decompress and restore specific point-in-time backup
gunzip < arass_events_20260819_000000.sql.gz | pg_restore -h $PGHOST -U $PGUSER -d arass_events --clean --no-owner
```
