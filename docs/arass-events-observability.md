# ARASS EVENTS — PRODUCTION OBSERVABILITY & MONITORING RUNBOOK

**System Classification**: Enterprise Tier Multi-Tenant Observability  
**Target Ingestion**: Datadog, Grafana Loki, AWS CloudWatch, Sentry

---

## 1. Structured Logging Specification

Every operational request and domain service execution emits a structured JSON record containing trace context.

### 1.1 Standard Log Schema
```json
{
  "timestamp": "2026-08-19T20:42:00.000Z",
  "level": "INFO",
  "service": "arass-events",
  "requestId": "req_01j7x8k9m...",
  "actorId": "usr_99x...",
  "organizationId": "org-arass",
  "eventId": "evt-arass-ideathon-2026",
  "route": "/api/events/evt-arass-ideathon-2026/submissions",
  "method": "POST",
  "statusCode": 200,
  "durationMs": 42.6,
  "action": "SUBMISSION_CREATED",
  "ip": "192.0.2.1",
  "userAgent": "Mozilla/5.0..."
}
```

### 1.2 Data Sanitization Guarantee
**Zero PII / Secret Leakage**:
The logger strictly scrubs:
- `password`, `passwordHash`, `currentPassword`, `newPassword`
- `session_token`, `Authorization` headers
- `apiKey`, `secretKey`, `resetToken`
- Private juror comments prior to publication

---

## 2. Health & Heartbeat Endpoints

| Endpoint | Method | Purpose | Normal Status |
| :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | Container & Service Liveness Probe | `200 OK` `{"status":"HEALTHY","uptime":3600}` |
| `/api/metrics` | `GET` | Prometheus formatted scrapable metrics | `200 OK` (Route latencies, request rates) |

---

## 3. Sentry Error Tracking Setup

```typescript
// Sentry Initialization in production
import * as Sentry from '@sentry/nextjs';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
    beforeSend(event) {
      // Strip sensitive form inputs
      if (event.request?.data) {
        delete event.request.data.password;
      }
      return event;
    },
  });
}
```
