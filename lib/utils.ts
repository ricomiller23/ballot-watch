import type { RatingValue, DataConfidence } from './types';

export function ratingLabel(value: RatingValue): string {
  const map: Record<RatingValue, string> = {
    safe_d: 'Safe D',
    solid_d: 'Solid D',
    likely_d: 'Likely D',
    lean_d: 'Lean D',
    toss_up: 'Toss-Up',
    lean_r: 'Lean R',
    likely_r: 'Likely R',
    safe_r: 'Safe R',
    solid_r: 'Solid R',
  };
  return map[value] || value;
}

export function ratingColor(value: RatingValue): string {
  const map: Record<RatingValue, string> = {
    safe_d: '#1e40af',
    solid_d: '#1e40af',
    likely_d: '#3b82f6',
    lean_d: '#93c5fd',
    toss_up: '#a855f7',
    lean_r: '#fca5a5',
    likely_r: '#ef4444',
    safe_r: '#991b1b',
    solid_r: '#991b1b',
  };
  return map[value] || '#6b7280';
}

export function ratingBgClass(value: RatingValue): string {
  const map: Record<RatingValue, string> = {
    safe_d: 'bg-blue-900 text-white',
    solid_d: 'bg-blue-900 text-white',
    likely_d: 'bg-blue-600 text-white',
    lean_d: 'bg-blue-300 text-blue-900',
    toss_up: 'bg-purple-500 text-white',
    lean_r: 'bg-red-300 text-red-900',
    likely_r: 'bg-red-600 text-white',
    safe_r: 'bg-red-900 text-white',
    solid_r: 'bg-red-900 text-white',
  };
  return map[value] || 'bg-gray-400 text-white';
}

export function confidenceBadge(confidence: DataConfidence): { label: string; className: string } {
  switch (confidence) {
    case 'verified':
      return { label: 'Verified', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'provisional':
      return { label: 'Provisional', className: 'bg-amber-100 text-amber-800 border-amber-300' };
    case 'placeholder':
      return { label: 'Placeholder', className: 'bg-gray-100 text-gray-600 border-gray-300' };
  }
}

export function daysUntilElection(): number {
  const electionDay = new Date('2026-11-03T00:00:00');
  const now = new Date();
  return Math.max(0, Math.ceil((electionDay.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

export function partyColor(party: string): string {
  const map: Record<string, string> = {
    DEM: '#3b82f6',
    REP: '#ef4444',
    IND: '#a855f7',
    LIB: '#f59e0b',
    GRN: '#22c55e',
  };
  return map[party] || '#6b7280';
}
