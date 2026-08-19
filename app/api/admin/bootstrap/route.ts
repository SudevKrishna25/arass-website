import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/events-db/engine';
import { hashPassword } from '@/lib/auth/password';

export async function POST(req: NextRequest) {
  try {
    const bootstrapSecret = process.env.BOOTSTRAP_ADMIN_SECRET || 'ARASS_PRODUCTION_BOOTSTRAP_2026';
    const authHeader = req.headers.get('x-bootstrap-secret');

    if (!authHeader || authHeader !== bootstrapSecret) {
      return NextResponse.json({ error: 'Invalid or missing bootstrap authorization secret.' }, { status: 403 });
    }

    const { email, password, name } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const existing = Array.from(db.users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      existing.passwordHash = hashPassword(password);
      existing.role = 'SUPER_ADMIN';
      existing.emailVerified = true;
      return NextResponse.json({
        success: true,
        message: `Existing user '${email}' elevated to SUPER_ADMIN.`,
      });
    }

    const userId = `usr-admin-${Date.now()}`;
    const now = db.now();

    db.users.set(userId, {
      id: userId,
      email: email.toLowerCase(),
      passwordHash: hashPassword(password),
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      createdAt: now,
      updatedAt: now,
    });

    db.profiles.set(userId, {
      id: `prof-${userId}`,
      userId,
      name: name || 'ARASS Super Admin',
      skills: ['Infrastructure', 'Governance'],
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      message: `Super Admin '${email}' created successfully.`,
      userId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Bootstrap failed.' }, { status: 500 });
  }
}
