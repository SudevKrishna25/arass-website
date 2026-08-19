# ARASS EVENTS — Production Deployment & Infrastructure Guide

## 1. Architectural Overview

ARASS EVENTS is built on **Next.js 14 App Router** with TypeScript, Tailwind CSS, an extensible service architecture, and role-based access control.

---

## 2. Environment Variables

Create a `.env.production` file with the following variables:

```env
# Application URLs
NEXT_PUBLIC_APP_URL="https://events.arass.technology"
STORAGE_CDN_URL="https://cdn.events.arass.technology"

# Authentication & Encryption Secrets
JWT_SECRET="generate-a-secure-64-character-random-secret-for-production"
COOKIE_DOMAIN=".arass.technology"
SESSION_EXPIRY_SECONDS=604800

# Production Email Delivery (Resend / SMTP)
RESEND_API_KEY="re_live_production_key_here"
EMAIL_FROM_ADDRESS="ARASS EVENTS <notifications@arass.technology>"

# Storage Driver (memory / s3 / r2)
STORAGE_DRIVER="r2"
S3_BUCKET_NAME="arass-events-production"
S3_REGION="auto"
S3_ACCESS_KEY_ID="r2_access_key"
S3_SECRET_ACCESS_KEY="r2_secret_key"
S3_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"

# Database Configuration (PostgreSQL adapter ready)
DATABASE_URL="postgresql://user:password@db.arass.internal:5432/arass_events?sslmode=require"
```

---

## 3. Build & Deployment Steps

### Standalone Node Server / Docker
```bash
# 1. Install clean production dependencies
npm ci

# 2. Build production assets
npm run build

# 3. Launch optimized standalone server
npm run start -- -p 3000
```

### Vercel / Cloudflare Pages / AWS ECS
- Build Command: `npm run build`
- Output Directory: `.next`
- Node.js Version: `>= 18.18.0`

---

## 4. Database Migrations & Backup Strategy

1. **Schema Hydration**: At startup, `lib/events-db/seed.ts` populates baseline organizations, initial admin accounts, and flagship templates if the store is uninitialized.
2. **Automated Snapshot Backups**: When running PostgreSQL, configure WAL archiving and hourly snapshots via RDS/Supabase.
3. **Restoration Verification**: Test restore scripts quarterly using the isolated test database runner.

---

## 5. Security & Network Hardening

- **HTTPS Enforcement**: TLS 1.3 only with HSTS enabled (`max-age=31536000; includeSubDomains; preload`).
- **Cookie Security**: `HttpOnly`, `SameSite=Lax` (or `Strict`), and `Secure` attributes enabled on `arass_events_session`.
- **CORS Policy**: Restricted to authorized domain origins (`*.arass.technology`).
- **Rate Limiting**: 100 requests per minute on API mutation endpoints (`/api/events/auth/login`, `/api/events/*/submissions`).
