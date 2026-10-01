import { NextRequest, NextResponse } from 'next/server';
import { getAllPolls } from '@/lib/races';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const race = searchParams.get('race');

  let items = getAllPolls();
  if (race) {
    items = items.filter((p) => p.raceId === race);
  }

  return NextResponse.json({
    items,
    total: items.length,
    asOf: new Date().toISOString(),
  });
}
