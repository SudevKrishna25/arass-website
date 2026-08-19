# ARASS EVENTS — Operations Runbook & Incident Response

## 1. Scope & Purpose

This operational runbook provides standard operating procedures (SOPs) for event organizers, technical managers, and system administrators running live competitions on **ARASS EVENTS**.

---

## 2. Standard Incident Scenarios & Action Procedures

### Scenario A: Emergency Deadline Extension
1. Navigate to `/organizer/events/[id]/live`.
2. Click **EXTEND DEADLINE**.
3. Select the target scope (`ROUND` or `REGISTRATION`), set the new ISO datetime, and provide a mandatory audit log justification (e.g., *"Extended 2 hours due to regional transit delay"*).
4. Click **CONFIRM EXTENSION**. The system automatically shifts the server clock deadline, updates participant dashboards, logs an immutable audit event, and broadcasts a high-priority dispatch to all connected squads.

### Scenario B: Participant Submission Blocked by Local Network Friction
1. Check the **Operational Incident Help Desk** at `/organizer/events/[id]/incidents`.
2. If the participant's repository is public but they experienced upload failure right before the cut-off, open the **Live Control Room** and review the audit log.
3. If justified, trigger a targeted 15-minute grace extension for the round or allow manual submission verification.
4. Log the resolution notes in the incident desk (`RESOLVED`).

### Scenario C: Juror Declares Conflict of Interest (COI)
1. Navigate to `/organizer/events/[id]/judges`.
2. Locate the juror and click **DECLARE COI**.
3. Select the submission or participant team and specify the conflict reason (`ORGANIZATION`, `PERSONAL`, or `COLLABORATOR`).
4. The system immediately revokes the juror's scoring privilege on that deliverable and automatically updates the workload rebalancing matrix.

### Scenario D: Fraudulent / Plagiarized Deliverable Detected
1. Open `/organizer/events/[id]/integrity`.
2. Review telemetry anomalies (unusual paste events, code similarity flags, or duplicate repository hashes).
3. If confirmed, lock the deliverable in the **Submissions** tab and assign a score of 0 with audit justification.
4. If a certificate was already issued prior to detection, navigate to `/organizer/certificates`, locate the certificate, and click **REVOKE CERTIFICATE**. Public verification at `/verify/certificate/[id]` will immediately reflect `REVOKED`.

### Scenario E: Bulk Certificate Issuance
1. Go to `/organizer/certificates`.
2. Select the certificate template, format (`A4` or `Letter`), and orientation (`Landscape` or `Portrait`).
3. Click **TRIGGER BULK ISSUANCE JOB**.
4. Monitor the live progress bar. Batch execution is idempotent: re-running will never generate duplicate certificate IDs for the same participant.
