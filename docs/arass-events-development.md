# ARASS EVENTS — Development & Operations Guide

## Setup & Execution

### 1. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 2. Development Seed Account
- **Super Admin Email**: `admin@arass.local`
- **Development Password**: `ARASS@Admin2026!`
- **Role**: `SUPER_ADMIN`
- *Note*: Production deployments require mandatory password reset on initial login.

### 3. Running Development Server
```bash
npm run dev
```

### 4. Running Verification Test Suite
```bash
npx playwright test tests/phase1-foundation.spec.ts
```

### 5. Building Production Bundle
```bash
npm run build
```
