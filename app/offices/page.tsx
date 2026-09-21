import type { Metadata } from 'next';
import OfficesExplorer from '@/components/OfficesExplorer';

export const metadata: Metadata = {
  title: 'Complete US Offices Registry — BALLOT.WATCH 2026',
  description: 'Every electable position in the United States — from U.S. President to city treasurer, dog catcher, and soil conservation supervisor. Federal, state, county, municipal, and special district offices.',
};

export default function OfficesPage() {
  return <OfficesExplorer />;
}
