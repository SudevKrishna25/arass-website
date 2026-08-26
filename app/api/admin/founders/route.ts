import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/events-db/engine';
import { verifyToken } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('arass_events_session')?.value;
    const session = token ? verifyToken(token) : null;
    if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ORGANIZER')) {
      return NextResponse.json({ error: 'Unauthorized executive access' }, { status: 401 });
    }

    const founders = Array.from(db.users.values())
      .filter((u) => u.role === 'SUPER_ADMIN')
      .map((u) => {
        const profile = db.profiles.get(u.id);
        return {
          id: u.id,
          username: u.username || u.email.split('@')[0],
          email: u.email,
          name: profile?.name || u.email.split('@')[0],
          role: u.role,
          status: u.status,
          skills: profile?.skills || [],
          bio: profile?.bio || '',
          lastLoginAt: u.lastLoginAt || u.createdAt,
          createdAt: u.createdAt,
        };
      });

    return NextResponse.json({ success: true, founders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to retrieve founders list' }, { status: 500 });
  }
}
