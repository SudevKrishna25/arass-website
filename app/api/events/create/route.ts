import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { EventService } from '@/lib/services/event.service';

export async function POST(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'EVENT_CREATE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const organizationId = body.organizationId || auth.session.organizationId || 'org-arass-technologies';

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Missing required fields (name, slug).' },
        { status: 400 }
      );
    }

    const event = EventService.create({
      ...body,
      organizationId,
      createdBy: auth.session.userId,
    });

    return NextResponse.json({ success: true, event });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create event.' }, { status: 400 });
  }
}
