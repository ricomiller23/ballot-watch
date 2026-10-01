import { NextRequest, NextResponse } from 'next/server';
import { getRaceById } from '@/lib/races';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raceId = searchParams.get('race') || 'senate-tx';

  const race = getRaceById(raceId);
  const avgResult = race?.polling_average || null;

  return NextResponse.json({
    raceId,
    average: avgResult,
    asOf: new Date().toISOString(),
  });
}
