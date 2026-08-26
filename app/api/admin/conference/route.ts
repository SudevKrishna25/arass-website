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

    const messages = Array.from(db.founderConferenceMessages.values()).sort(
      (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const audits = [...db.founderAuditLogs].sort(
      (a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const founders = Array.from(db.users.values())
      .filter((u) => u.role === 'SUPER_ADMIN')
      .map((u) => {
        const profile = db.profiles.get(u.id);
        return {
          id: u.id,
          username: u.username || u.email.split('@')[0],
          name: profile?.name || u.email.split('@')[0],
          bio: profile?.bio || '',
          skills: profile?.skills || [],
          role: u.role,
          lastActive: u.lastLoginAt || u.createdAt,
        };
      });

    return NextResponse.json({
      messages,
      audits,
      founders,
      currentUser: {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to retrieve conference telemetry' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('arass_events_session')?.value;
    const session = token ? verifyToken(token) : null;
    if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ORGANIZER')) {
      return NextResponse.json({ error: 'Unauthorized executive access' }, { status: 401 });
    }

    const body = await req.json();
    const { message, channel = 'GENERAL', category = 'GENERAL' } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message content required' }, { status: 400 });
    }

    const msgId = `msg-${db.generateId()}`;
    const now = db.now();

    const user = db.users.get(session.userId);
    const profile = db.profiles.get(session.userId);
    const username = user?.username || session.email.split('@')[0];
    const senderName = profile?.name || session.name || username;

    const newMsg = {
      id: msgId,
      senderId: session.userId,
      senderName,
      senderUsername: username,
      channel,
      message: message.trim(),
      category,
      createdAt: now,
    };

    db.founderConferenceMessages.set(msgId, newMsg);

    // Record site audit log for transparency across all 5 founders
    db.founderAuditLogs.unshift({
      id: `audit-${db.generateId()}`,
      actorUsername: username,
      actorName: senderName,
      action: 'CONFERENCE_MESSAGE_SENT',
      details: `Dispatched message to [${channel}]: "${message.trim().slice(0, 50)}${message.trim().length > 50 ? '...' : ''}"`,
      target: `CONFERENCE_ROOM_${channel}`,
      timestamp: now,
    });

    return NextResponse.json({ success: true, message: newMsg });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Transmission failed' }, { status: 500 });
  }
}
