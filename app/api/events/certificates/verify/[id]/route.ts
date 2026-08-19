import { NextRequest, NextResponse } from 'next/server';
import { CertificateService } from '@/lib/services/certificate.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const result = CertificateService.verify(params.id);
  if (!result.certificate) {
    return NextResponse.json({ valid: false, status: 'NOT_FOUND', error: 'Certificate ID not found.' }, { status: 404 });
  }

  return NextResponse.json({
    valid: result.valid,
    status: result.status,
    certificate: result.certificate,
    event: result.event ? { id: result.event.id, name: result.event.name, slug: result.event.slug } : undefined,
  });
}
