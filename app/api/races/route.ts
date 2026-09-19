import { NextResponse } from 'next/server';
import { SEED_RACES } from '@/lib/fallback-data';

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    races: SEED_RACES,
    total: SEED_RACES.length,
    asOf: new Date().toISOString(),
  });
}
