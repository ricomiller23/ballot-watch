import { NextRequest, NextResponse } from 'next/server';
import { SEED_POLLS } from '@/lib/fallback-data';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const race = searchParams.get('race');

  let items = [...SEED_POLLS];
  if (race) {
    items = items.filter((p) => p.race_id === race);
  }

  return NextResponse.json({
    items,
    total: items.length,
    asOf: new Date().toISOString(),
  });
}
