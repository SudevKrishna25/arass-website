import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { codeRunner } from '@/lib/services/code-runner.service';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req);
  if ('errorResponse' in auth) return auth.errorResponse;

  try {
    const body = await req.json();
    const { language, sourceCode, stdin, expectedOutput, timeLimitMs } = body;

    const result = await codeRunner.execute({
      language: language || 'typescript',
      sourceCode: sourceCode || '',
      stdin,
      expectedOutput,
      timeLimitMs,
    });

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Code execution failed.' }, { status: 500 });
  }
}
