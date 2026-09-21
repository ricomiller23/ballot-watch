import type { Metadata } from 'next';
import CandidatesExplorer from '@/components/CandidatesExplorer';

export const metadata: Metadata = {
  title: 'Candidates Registry — Every Person Running in 2026 | BALLOT.WATCH',
  description: 'Every declared candidate for every race in the United States — from U.S. Senate to Justice of the Peace, School Board, Township Supervisor, and Soil Conservation District. Names, parties, prior office, fundraising, and election dates.',
};

export default function CandidatesPage() {
  return <CandidatesExplorer />;
}
