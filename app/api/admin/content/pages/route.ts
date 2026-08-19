import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { CmsService } from '@/lib/services/cms.service';

export async function GET(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'CONTENT_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  const pages = CmsService.getAllPages();
  return NextResponse.json({ success: true, count: pages.length, pages });
}

export async function POST(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'CONTENT_CREATE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const { title, slug, description } = await req.json();
    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const page = CmsService.createPage(title, slug, description || '', auth.session.userId);
    return NextResponse.json({ success: true, page });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create page.' }, { status: 400 });
  }
}
