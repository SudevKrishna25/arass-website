import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { CmsService } from '@/lib/services/cms.service';

export async function GET() {
  const items = CmsService.getNavigation();
  return NextResponse.json({ success: true, count: items.length, items });
}

export async function PUT(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'NAVIGATION_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const { items } = await req.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Items array is required.' }, { status: 400 });
    }

    const updated = CmsService.updateNavigation(items, auth.session.userId);
    return NextResponse.json({ success: true, count: updated.length, items: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update navigation.' }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}
