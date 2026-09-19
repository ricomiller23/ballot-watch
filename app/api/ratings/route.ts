import { NextResponse } from 'next/server';
import { SEED_RATINGS } from '@/lib/fallback-data';

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    items: SEED_RATINGS,
    total: SEED_RATINGS.length,
    asOf: new Date().toISOString(),
  });
}
