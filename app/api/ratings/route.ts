import { NextResponse } from 'next/server';
import { getAllRatings } from '@/lib/races';

export const revalidate = 60;

export async function GET() {
  const items = getAllRatings();
  return NextResponse.json({
    items,
    total: items.length,
    asOf: new Date().toISOString(),
  });
}
