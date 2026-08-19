# ARASS EVENTS — BACKUP, RESTORE & DISASTER RECOVERY RUNBOOK

**Recovery Time Objective (RTO)**: < 15 Minutes  
**Recovery Point Objective (RPO)**: < 5 Minutes (Continuous WAL Archiving)

---

## 1. Backup Strategy Overview

| Asset | Mechanism | Frequency | Retention | Target |
| :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL Database** | `pg_dump` + Continuous WAL Streaming | Daily full snapshot + continuous WAL | 90 Days | AWS S3 / Cloudflare R2 Cross-Region |
| **Submission Artifacts** | S3 Object Versioning & Replication | Instant upon upload | 365 Days | Multi-Region Bucket |
| **Certificate PDFs** | Immutable Write-Once (WORM) Storage | Instant upon generation | Permanent | S3 Object Lock Vault |
| **Audit Logs** | Append-only Cold Storage Export | Hourly batch export | 7 Years | Amazon Glacier / Cloudflare Archive |

---

## 2. PostgreSQL Disaster Recovery SOP

### Step 1: Provision Clean Database Instance
```bash
createdb -h $PGHOST -U $PGUSER arass_events_recovery
```

### Step 2: Retrieve Latest Compressed Snapshot
```bash
aws s3 cp s3://${BACKUP_S3_BUCKET}/postgres/latest/arass_events_backup.sql.gz ./
```

### Step 3: Execute Restoration
```bash
gunzip < arass_events_backup.sql.gz | pg_restore -h $PGHOST -U $PGUSER -d arass_events_recovery --clean --if-exists --no-owner
```

### Step 4: Verification Check
```sql
SELECT count(*) FROM users;
SELECT count(*) FROM events;
SELECT count(*) FROM certificates WHERE status = 'ISSUED';
```
