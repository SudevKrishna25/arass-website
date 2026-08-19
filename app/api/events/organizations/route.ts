import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { OrganizationService } from '@/lib/services/organization.service';

export async function GET() {
  const orgs = OrganizationService.listAll();
  return NextResponse.json({ success: true, organizations: orgs });
}

export async function POST(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'ORG_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Organization name and slug are required.' }, { status: 400 });
    }

    const org = OrganizationService.create(body.name, body.slug, auth.session.userId, body.website);
    return NextResponse.json({ success: true, organization: org });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create organization.' }, { status: 400 });
  }
}
