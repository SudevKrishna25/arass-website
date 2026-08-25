import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/events-db/engine';
import { signToken } from '@/lib/auth/session';
import { AuditService } from '@/lib/services/audit.service';
import { User, Profile } from '@/lib/events-db/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;
    if (!email || !name) {
      return NextResponse.json({ error: 'Missing email or name.' }, { status: 400 });
    }

    const lowerEmail = email.toLowerCase();
    let user = Array.from(db.users.values()).find((u) => u.email.toLowerCase() === lowerEmail);
    let profile: Profile | undefined;

    const now = db.now();

    if (!user) {
      // Create new Google registered user
      const userId = db.generateId();
      user = {
        id: userId,
        email: lowerEmail,
        passwordHash: 'GOOGLE_OAUTH_MOCK',
        role: 'PARTICIPANT',
        status: 'ACTIVE',
        emailVerified: true,
        createdAt: now,
        updatedAt: now,
      };

      profile = {
        id: db.generateId(),
        userId,
        name: name,
        college: 'Sovereign Systems Lab',
        skills: ['AI Systems', 'Distributed Consensus'],
        createdAt: now,
        updatedAt: now,
      };

      db.users.set(userId, user);
      db.profiles.set(userId, profile);
      AuditService.log('USER_REGISTERED', 'USER', userId, userId, { email: user.email, provider: 'google' });
    } else {
      profile = db.profiles.get(user.id);
      if (!profile) {
        profile = {
          id: db.generateId(),
          userId: user.id,
          name: name,
          skills: [],
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
        db.profiles.set(user.id, profile);
      }
    }

    user.lastLoginAt = now;
    AuditService.log('USER_LOGIN', 'USER', user.id, user.id, { email: user.email, provider: 'google' });

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: profile.name,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role, status: user.status },
      profile,
      token,
    });

    response.cookies.set('arass_events_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 86400 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Google authentication failed.' }, { status: 400 });
  }
}
