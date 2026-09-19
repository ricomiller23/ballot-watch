import { NextResponse } from 'next/server';

export const revalidate = 30;

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    last_success_at: '2026-09-19T09:40:00Z',
    stale: false,
    connectors: [
      { id: 'fec', status: 'ok' },
      { id: 'cook', status: 'ok' },
      { id: 'sabato', status: 'ok' },
      { id: 'polymarket', status: 'ok' }
    ]
  });
}
