# ARASS EVENTS — Production Email Setup & Integration Guide

## 1. Overview

The ARASS EVENTS platform utilizes an extensible `EmailProvider` interface that automatically detects environment variables to route system notifications, deadline extensions, registration receipts, and championship invitations.

---

## 2. Configuration Options

### Option A: Resend (Recommended)
Set the following environment variables in your deployment dashboard (e.g. Vercel, Railway, AWS ECS):

```env
RESEND_API_KEY=re_123456789abcdef
EMAIL_FROM_ADDRESS="ARASS EVENTS <notifications@arass.technology>"
```

### Option B: Local / Development Console Fallback
If `RESEND_API_KEY` is not present, the system defaults to `ConsoleEmailProvider`, which safely outputs email subjects and recipients to stdout without network overhead or third-party dependency.

---

## 3. Supported Notification Templates

| Action | Subject Template | Audience |
|---|---|---|
| Registration Confirmation | `[ARASS] Registration Confirmed: {{event_name}}` | Participant |
| Round Start | `[STAGE LIVE] {{round_name}} is now open for submissions` | Qualified Squads |
| Deliverable Transmitted | `[CONFIRMED] Cryptographic Deliverable Received (v{{version}})` | Team Members |
| Deadline Extension | `[URGENT NOTICE] Deadline Extended for {{event_name}}` | All Participants |
| Certificate Generated | `[HONORS] Official Credential Ready: {{certificate_id}}` | Finalists / Winners |
