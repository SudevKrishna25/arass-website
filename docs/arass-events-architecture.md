# ARASS EVENTS — System Architecture & Codebase Audit

## 1. Existing Architecture Found
- **Framework**: Next.js 14.2.35 (App Router), React 18.3.1, TypeScript 5.4.5, Tailwind CSS 3.4.3.
- **Visual Design System**: Dark luxury palette (`#01050d` base, `#00d4ff` electric cyan accent, `#8b5cf6` subtle violet secondary), custom typographic hierarchy (`font-heading`, `font-mono`, `font-sans`).
- **Existing Public Routes**: Institutional website (`/`, `/about`, `/services`, `/work`, `/labs`, `/ventures`, `/technologies`, `/insights`, `/contact`, `/mission`, `/discovery`, `/ecosystem`, `/frontier`, `/horizon`, `/directive`).
- **Existing API**: Contact inquiry ingestion (`/api/inquiry`).

## 2. Reusable Core Assets
- `components/cinematic/LiveCinematicAtmosphere.tsx`: High-performance 2D Canvas ambient photon light aura and telemetry particle field.
- `components/cinematic/PageTransitionLink.tsx`: Smooth client-side navigation transitions.
- Design tokens in `tailwind.config.ts` (colors, fonts, box shadows).

## 3. What Was Created for Phase 1 (Foundation & Database)
- **Relational Data Model & Engine** (`lib/events-db/`): Relational storage engine with foreign keys, index lookup, transactional operations, UUID generation, and SQL migration schema.
- **Authentication & Cryptography** (`lib/auth/`): Secure session handling, salted PBKDF2/SHA-512 password hashing, role-based session tokens.
- **Centralized RBAC Engine** (`lib/auth/rbac.ts`): Granular permissions across events, registrations, teams, rounds, submissions, evaluations, certificates, analytics, and audit logs.
- **Domain Service Layer** (`lib/services/`):
  - `AuthService`
  - `OrganizationService`
  - `EventService`
  - `RegistrationService`
  - `TeamService`
  - `RoundService`
  - `SubmissionService`
  - `EvaluationService`
  - `CertificateService`
  - `AuditService`
  - `AnalyticsService`
  - `StorageProvider` (Storage abstraction)
  - `EmailProvider` (Email abstraction)
- **Foundation API Layer** (`app/api/events/...`): REST endpoints with authorization guards and input validation.
- **Seed Layer** (`lib/events-db/seed.ts`): Initial development seed with `admin@arass.local` (`ARASS@Admin2026!`) and 4 flagship events including `ARASS IDEATHON 2026`.

## 4. Phase 1 Roadmap & Next Phases
- **Phase 1**: Foundation, Database, RBAC, Auth, Services, API, Audit, Seed, and E2E Foundation Tests.
- **Phase 2**: Public Platform UI, Event Discovery (`/events`), and Dedicated Event Microsites (`/events/[slug]`).
- **Phase 3**: Event Creation Wizard (10-step) and Admin Event Management.
- **Phase 4**: Participant Registration & Team Workspace.
- **Phase 5**: Multi-Round Submissions & Online Hackathon Live Stage.
- **Phase 6**: Evaluator Scoring Portal & Judge Dashboard.
- **Phase 7**: Certificate Designer & Verification Engine (`/verify/certificate/[id]`).
