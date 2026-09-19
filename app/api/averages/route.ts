import { NextRequest, NextResponse } from 'next/server';
import { SEED_POLLS } from '@/lib/fallback-data';
import { calculatePollingAverage } from '@/lib/average';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const race = searchParams.get('race') || '2026-SEN-TX';

  const avgResult = calculatePollingAverage(race, SEED_POLLS);

  return NextResponse.json({
    average: avgResult,
    asOf: new Date().toISOString(),
  });
}
