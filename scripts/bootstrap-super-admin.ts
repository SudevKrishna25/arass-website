/**
 * ARASS EVENTS — Super Admin Bootstrap Utility
 * Usage: npx ts-node scripts/bootstrap-super-admin.ts --email=admin@arass.technology --password=YourSecurePassword!
 */

import { db } from '../lib/events-db/engine';
import { hashPassword } from '../lib/auth/password';

async function bootstrap() {
  const args = process.argv.slice(2);
  const emailArg = args.find((a) => a.startsWith('--email='))?.split('=')[1] || process.env.BOOTSTRAP_ADMIN_EMAIL;
  const passArg = args.find((a) => a.startsWith('--password='))?.split('=')[1] || process.env.BOOTSTRAP_ADMIN_PASSWORD;

  if (!emailArg || !passArg) {
    console.error('Usage: npx ts-node scripts/bootstrap-super-admin.ts --email=<email> --password=<password>');
    process.exit(1);
  }

  const existing = Array.from(db.users.values()).find((u) => u.email.toLowerCase() === emailArg.toLowerCase());
  if (existing) {
    console.log(`[BOOTSTRAP] Admin user '${emailArg}' already exists. Updating credentials.`);
    existing.passwordHash = hashPassword(passArg);
    existing.role = 'SUPER_ADMIN';
    existing.emailVerified = true;
    console.log(`[BOOTSTRAP] Super Admin account '${emailArg}' updated successfully.`);
    return;
  }

  const userId = `usr-admin-${Date.now()}`;
  const now = new Date().toISOString();

  db.users.set(userId, {
    id: userId,
    email: emailArg.toLowerCase(),
    passwordHash: hashPassword(passArg),
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    emailVerified: true,
    createdAt: now,
    updatedAt: now,
  });

  db.profiles.set(userId, {
    id: `prof-${userId}`,
    userId,
    name: 'ARASS Super Admin',
    skills: ['Platform Governance', 'Cryptographic Security'],
    createdAt: now,
    updatedAt: now,
  });

  console.log(`[BOOTSTRAP] Super Admin account '${emailArg}' created successfully.`);
}

bootstrap().catch(console.error);
