import { NextResponse } from 'next/server';
import { SEED_FORECASTS } from '@/lib/fallback-data';

export const revalidate = 60;

export async function GET() {
  return NextResponse.json({
    items: SEED_FORECASTS,
    asOf: new Date().toISOString(),
  });
}
