import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { CmsService } from '@/lib/services/cms.service';

export async function GET(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'CONTENT_READ');
  if ('errorResponse' in auth) return auth.errorResponse;

  const url = new URL(req.url);
  const pageId = url.searchParams.get('pageId') || 'page-home';
  const sections = CmsService.getSections(pageId);
  return NextResponse.json({ success: true, count: sections.length, sections });
}

export async function POST(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'CONTENT_CREATE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    if (!body.pageId || !body.title || !body.type) {
      return NextResponse.json({ error: 'pageId, title, and type are required.' }, { status: 400 });
    }

    const section = CmsService.createSection(body, auth.session.userId);
    return NextResponse.json({ success: true, section });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create section.' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'CONTENT_UPDATE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    if (body.reorder && body.pageId && Array.isArray(body.sectionIds)) {
      const sections = CmsService.reorderSections(body.pageId, body.sectionIds, auth.session.userId);
      return NextResponse.json({ success: true, sections });
    }

    if (!body.id) {
      return NextResponse.json({ error: 'Section id is required.' }, { status: 400 });
    }

    const section = CmsService.updateSection(body.id, body, auth.session.userId);
    return NextResponse.json({ success: true, section });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update section.' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'CONTENT_DELETE');
  if ('errorResponse' in auth) return auth.errorResponse;

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Section id parameter is required.' }, { status: 400 });

  const success = CmsService.deleteSection(id, auth.session.userId);
  return NextResponse.json({ success });
}
