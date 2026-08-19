# ARASS EVENTS — API Specifications

## Base URL: `/api/events`

### 1. Authentication (`/api/events/auth`)
- `POST /api/events/auth/register`: Create participant or organizer account.
- `POST /api/events/auth/login`: Issue session cookie and return user profile.
- `POST /api/events/auth/logout`: Invalidate session cookie.
- `GET /api/events/auth/me`: Current session status & permissions.

### 2. Organizations (`/api/events/organizations`)
- `GET /api/events/organizations`: List organizations for current user.
- `POST /api/events/organizations`: Create new host organization (Super Admin).

### 3. Events (`/api/events/list`, `/api/events/create`, `/api/events/[id]`)
- `GET /api/events/list`: Filterable public/admin events discovery.
- `POST /api/events/create`: Create event draft (Organizer/Admin).
- `GET /api/events/[id]`: Detailed event schema & active rounds.
- `PATCH /api/events/[id]`: Update event configuration.
- `POST /api/events/[id]/publish`: Transition to `REGISTRATION_OPEN`.

### 4. Registrations & Teams
- `POST /api/events/[id]/registrations`: Register participant/team with custom form answers.
- `GET /api/events/[id]/registrations`: List registrations (Organizer/Manager).
- `POST /api/events/[id]/teams`: Create a team and generate invite code.
- `POST /api/events/[id]/teams/invite`: Invite member via email.
- `POST /api/events/[id]/teams/join`: Join team via code or invitation.

### 5. Rounds & Submissions
- `POST /api/events/[id]/rounds`: Create round with start/end windows.
- `POST /api/events/[id]/submissions`: Submit project files/links.
- `GET /api/events/[id]/submissions`: View submissions (Filtered by RBAC).

### 6. Evaluations & Certificates
- `POST /api/events/[id]/evaluations`: Submit criteria scores & comments.
- `POST /api/events/[id]/certificates/generate`: Issue certificates in bulk or individually.
- `GET /api/events/certificates/verify/[id]`: Public authenticity check.

### 7. Audit & Analytics
- `GET /api/events/[id]/audit`: Immutable administrative log trail.
- `GET /api/events/[id]/analytics`: Aggregated registration & submission metrics.
