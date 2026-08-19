import { NextRequest, NextResponse } from 'next/server';
import { requirePermissionGuard } from '@/lib/auth/guard';
import { CmsService } from '@/lib/services/cms.service';
import { storage } from '@/lib/services/storage.service';

export async function GET(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'MEDIA_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  const assets = CmsService.getMediaAssets();
  return NextResponse.json({ success: true, count: assets.length, assets });
}

export async function POST(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'MEDIA_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    storage.validate(file.name, file.type, buffer.length);

    const upload = await storage.upload({
      bucket: 'event-assets',
      filename: file.name,
      mimeType: file.type,
      buffer,
    });

    const asset = CmsService.registerMediaAsset({
      filename: file.name,
      mimeType: file.type,
      sizeBytes: buffer.length,
      url: upload.url,
      storageKey: upload.storageKey,
      altText,
      uploadedBy: auth.session.userId,
    });

    return NextResponse.json({ success: true, asset });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Media upload failed.' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = requirePermissionGuard(req, 'MEDIA_MANAGE');
  if ('errorResponse' in auth) return auth.errorResponse;

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Asset id parameter is required.' }, { status: 400 });

  const success = CmsService.deleteMediaAsset(id, auth.session.userId);
  return NextResponse.json({ success });
}
