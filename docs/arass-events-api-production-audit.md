# ARASS EVENTS — COMPREHENSIVE API PRODUCTION AUDIT MATRIX

**Total App Router API Routes**: 32 Endpoints  
**Security Baseline**: Strict JWT Session Verification, RBAC Role Matrix, Org Tenancy Guard, Rate Limiting & Audit Ledger.

---

## 1. Complete API Route Specification

| Route | Method | Auth Required | Allowed Roles | Rate Limit | Tenant Scoped | Audit Log Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/events/auth/login` | `POST` | `No` | `ALL` | 10 / min | `Global` | `USER_LOGIN` |
| `/api/events/auth/register` | `POST` | `No` | `ALL` | 5 / min | `Global` | `USER_REGISTERED` |
| `/api/events/auth/logout` | `POST` | `Yes` | `ALL` | 30 / min | `Global` | `USER_LOGOUT` |
| `/api/events/auth/me` | `GET` | `Yes` | `ALL` | 60 / min | `Global` | `None` |
| `/api/events/auth/forgot-password` | `POST` | `No` | `ALL` | 5 / 5min | `Global` | `PASSWORD_RESET_REQUESTED` |
| `/api/events/auth/reset-password` | `POST` | `No` | `ALL` | 5 / 5min | `Global` | `PASSWORD_RESET_COMPLETED` |
| `/api/events/auth/change-password` | `POST` | `Yes` | `ALL` | 5 / 5min | `Global` | `PASSWORD_CHANGED` |
| `/api/events/auth/verify-email` | `POST` | `No` | `ALL` | 10 / min | `Global` | `EMAIL_VERIFIED` |
| `/api/events/auth/revoke-sessions` | `POST` | `Yes` | `ALL` | 5 / min | `Global` | `SESSIONS_REVOKED_ALL` |
| `/api/events/list` | `GET` | `No` | `PUBLIC` | 120 / min | `Global` | `None` |
| `/api/events/search` | `GET` | `No` | `PUBLIC` | 120 / min | `Global` | `None` |
| `/api/events/create` | `POST` | `Yes` | `ORGANIZER, SUPER_ADMIN` | 10 / min | `Organization` | `EVENT_CREATED` |
| `/api/events/[id]` | `GET` | `No` | `PUBLIC` | 120 / min | `Global` | `None` |
| `/api/events/[id]/publish` | `POST` | `Yes` | `ORGANIZER, SUPER_ADMIN` | 10 / min | `Organization` | `EVENT_STATUS_TRANSITION` |
| `/api/events/[id]/registrations` | `POST` | `Yes` | `PARTICIPANT` | 10 / min | `Event` | `REGISTRATION_CREATED` |
| `/api/events/[id]/teams` | `POST` | `Yes` | `PARTICIPANT` | 20 / min | `Event` | `TEAM_CREATED` |
| `/api/events/[id]/submissions` | `POST` | `Yes` | `PARTICIPANT` | 20 / min | `Event` | `SUBMISSION_CREATED` |
| `/api/events/[id]/evaluations` | `POST` | `Yes` | `JUDGE, SUPER_ADMIN` | 60 / min | `Event` | `EVALUATION_SUBMITTED` |
| `/api/events/[id]/judges/conflict` | `POST` | `Yes` | `JUDGE, ORGANIZER` | 30 / min | `Event` | `JUDGE_CONFLICT_DECLARED` |
| `/api/events/[id]/certificates` | `POST` | `Yes` | `ORGANIZER, SUPER_ADMIN` | 30 / min | `Organization` | `CERTIFICATE_ISSUED` |
| `/api/events/[id]/certificates/batch` | `POST` | `Yes` | `ORGANIZER, SUPER_ADMIN` | 5 / min | `Organization` | `CERTIFICATES_BATCH_ISSUED` |
| `/api/events/certificates/verify/[id]`| `GET` | `No` | `PUBLIC` | 120 / min | `Global` | `None` |
| `/api/events/[id]/analytics` | `GET` | `Yes` | `ORGANIZER, SUPER_ADMIN` | 60 / min | `Organization` | `None` |
| `/api/events/[id]/session/control` | `POST` | `Yes` | `ORGANIZER, SUPER_ADMIN` | 30 / min | `Organization` | `SESSION_CONTROL_TRIGGERED` |
| `/api/events/[id]/incidents` | `POST` | `Yes` | `ALL` | 30 / min | `Event` | `INCIDENT_REPORTED` |
| `/api/events/[id]/announcements` | `POST` | `Yes` | `ORGANIZER, SUPER_ADMIN` | 20 / min | `Organization` | `ANNOUNCEMENT_PUBLISHED` |
| `/api/admin/bootstrap` | `POST` | `Secret` | `BOOTSTRAP` | 3 / hour | `Root` | `SUPER_ADMIN_BOOTSTRAPPED` |
| `/api/admin/overview` | `GET` | `Yes` | `SUPER_ADMIN` | 60 / min | `Root` | `None` |
