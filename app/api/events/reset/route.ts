import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/events-db/engine';

export async function POST(req: NextRequest) {
  db.reset();
  return NextResponse.json({ success: true, message: 'Database state reset to seed baseline.' });
}
