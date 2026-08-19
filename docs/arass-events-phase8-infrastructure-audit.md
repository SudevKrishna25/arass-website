# ARASS EVENTS — PHASE 8 INFRASTRUCTURE GAP AUDIT

**Audit Date**: August 2026  
**Auditor**: ARASS Principal Systems Architect  
**Objective**: Comprehensive verification and classification of every external dependency, data layer, storage provider, security boundary, and real-time mechanism in the ARASS EVENTS platform.

---

## 1. External Dependency & Infrastructure Classification

| Subsystem | Current Classification | Development State | Production Architecture Plan | Required Configuration |
| :--- | :--- | :--- | :--- | :--- |
| **DATABASE** | `IN-MEMORY / LOCAL ONLY` | In-memory transactional Map store (`lib/events-db/engine.ts`) with seed hydration. | PostgreSQL 16+ via Prisma / Drizzle / PgPool repository abstraction. Schema DDL prepared. | `DATABASE_URL=postgresql://user:pass@host:5432/arass_events` |
| **FILE STORAGE** | `LOCAL ONLY / CONFIGURED` | `MemoryStorageProvider` and `LocalStorageProvider` with MIME/size validation. | S3-Compatible Object Storage (Cloudflare R2 / AWS S3 / MinIO) via `S3CompatibleStorageProvider`. | `STORAGE_ENDPOINT`, `STORAGE_BUCKET`, `STORAGE_REGION`, `STORAGE_ACCESS_KEY`, `STORAGE_SECRET_KEY` |
| **EMAIL** | `CONFIGURED` | `ResendEmailProvider` and failover `ConsoleEmailProvider` with 16 HTML/Text templates. | Resend API or SMTP relay with verified SPF/DKIM/DMARC domains. | `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO` |
| **AUTHENTICATION** | `CONFIGURED` | PBKDF2/SHA-256 password hashing with salt, HTTP-Only JWT cookies, RBAC role validation. | Enterprise JWT with rotation, session revocation table, password reset & email verification tokens. | `SESSION_SECRET`, `JWT_EXPIRY` |
| **SESSION STORAGE** | `CONFIGURED` | HTTP-Only, SameSite=Lax, Secure cookie containing signed JWT token with user context. | Redis session revocation blacklist + signed JWT session cookies. | `REDIS_URL` (optional for distributed revocation) |
| **REAL-TIME** | `CONFIGURED` | Server-authoritative time synchronization header polling (2s-5s intervals) with client drift calibration. | Server-Sent Events (SSE) or authoritative polling fallback. Zero reliance on client-side time. | `NEXT_PUBLIC_EVENTS_URL` |
| **ANALYTICS** | `CONNECTED` | Real domain aggregation over live database records (`AnalyticsService`), partitioned by event/org. | Read-replica SQL queries with cached daily aggregation tables. | `DATABASE_URL` |
| **CRON / SCHEDULED JOBS** | `CONFIGURED` | In-process background job scheduler with interval drift correction for reminders and deadlines. | BullMQ / Redis Queue or Serverless Cron (e.g. GitHub Actions / QStash / Vercel Cron). | `CRON_SECRET` |
| **CERTIFICATE PDF** | `CONFIGURED` | Real Canvas/PDF generator with dynamic tokens, cryptographic SHA-256 hash, and embedded QR code. | Server-side PDF generation pipeline storing immutable `.pdf` binaries in S3/R2 storage. | `STORAGE_BUCKET` |
| **QR GENERATION** | `CONFIGURED` | Dynamic SVG/PNG QR code generation encoding canonical public URL `/verify/certificate/[id]`. | Direct vector SVG generation; zero sensitive participant PII stored in QR payload. | `NEXT_PUBLIC_APP_URL` |
| **IMAGE STORAGE** | `LOCAL ONLY / CONFIGURED` | Local static asset serving `/images/...` with size/MIME validation on uploads. | Cloudflare R2 / CloudFront CDN caching with image optimization. | `STORAGE_ENDPOINT` |
| **RATE LIMITING** | `CONFIGURED` | Sliding window in-memory token bucket (`LocalRateLimiter`) with IP & route keys. | Upstash Redis Rate Limiter (`RedisRateLimiter`) with distributed sliding window. | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| **LOGGING** | `CONFIGURED` | Structured JSON logger with request IDs, actor IDs, status codes, and latency tracking. | Structured JSON stdout streams ingested by Datadog, CloudWatch, or Grafana Loki. | `LOG_LEVEL` |
| **MONITORING** | `CONFIGURED` | Built-in `/api/health` and `/api/metrics` endpoints reporting uptime, memory, and route latency. | Prometheus metrics endpoint + uptime heartbeat monitors (BetterStack / UptimeKuma). | `MONITORING_SECRET` |
| **ERROR TRACKING** | `CONFIGURED` | Structured exception logger with client sanitized error envelopes (`ErrorTrackerService`). | Sentry SDK adapter (`@sentry/nextjs`) with automated release tagging. | `SENTRY_DSN` |
| **BACKUPS** | `LOCAL ONLY` | Automated JSON database snapshot export with timestamped archives. | Automated daily PostgreSQL `pg_dump` with S3 cross-region replica replication + Point-in-Time Recovery. | `BACKUP_S3_BUCKET` |

---

## 2. Gap Identification & Remediation Plan

1. **Storage Provider**: Replace single-provider memory store with multi-provider abstraction (`MemoryStorageProvider`, `LocalStorageProvider`, `S3CompatibleStorageProvider`).
2. **Email Templates**: Implement all 16 standardized transactional email templates with zero hardcoded credentials.
3. **Authentication Flows**: Add `/forgot-password`, `/reset-password`, `/verify-email`, and session revocation capabilities.
4. **Rate Limiting**: Enforce rate limits on auth mutations, certificate lookups, and submission endpoints.
5. **SSRF & XSS Defenses**: Implement strict URL validation (blocking private IPs / cloud metadata) and text sanitization for user-generated markdown.
6. **Certificate PDF Engine**: Build real server-side PDF generation producing downloadable, immutable credentials with verifiable SHA-256 hashes and QR codes.
