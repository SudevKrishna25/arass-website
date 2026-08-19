import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';
import { SponsorService } from '@/lib/services/schedule.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  const sponsors = SponsorService.getByEvent(event.id);
  return NextResponse.json({ success: true, sponsors });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  const event = EventService.getById(params.id) || EventService.getBySlug(params.id);
  if (!event) return NextResponse.json({ error: 'Event not found.' }, { status: 404 });

  try {
    const body = await req.json();
    const sponsor = SponsorService.addSponsor({
      eventId: event.id,
      name: body.name,
      logo: body.logo || '/images/arass_institutional_monolith.jpg',
      website: body.website || 'https://arass.technology',
      tier: body.tier || 'GOLD',
      description: body.description,
      actorUserId: auth.session.userId,
    });

    return NextResponse.json({ success: true, sponsor }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Adding sponsor failed.' }, { status: 400 });
  }
}
