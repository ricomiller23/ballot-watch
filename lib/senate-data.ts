import type { RaceEntry, RatingValue, RatingSnapshot, SourceCitation } from './types';
import racesDataset from '../data/races.json';

const LAST_VERIFIED = '2026-10-01';

function mapRatingValue(verbatim: string): RatingValue {
  const lower = verbatim.toLowerCase();
  if (lower.includes('toss')) return 'toss_up';
  if (lower.includes('lean r') || lower.includes('tilt r')) return 'lean_r';
  if (lower.includes('likely r')) return 'likely_r';
  if (lower.includes('solid r') || lower.includes('safe r')) return 'safe_r';
  if (lower.includes('lean d') || lower.includes('tilt d')) return 'lean_d';
  if (lower.includes('likely d')) return 'likely_d';
  if (lower.includes('solid d') || lower.includes('safe d')) return 'safe_d';
  return 'toss_up';
}

function mapRater(rater: string): 'cook' | 'sabato' | 'inside_elections' {
  const lower = rater.toLowerCase();
  if (lower.includes('cook')) return 'cook';
  if (lower.includes('sabato')) return 'sabato';
  return 'inside_elections';
}

const senateRaces = racesDataset.races.filter(r => r.tier === 1);

export const SENATE_2026: RaceEntry[] = senateRaces.map(r => {
  const isSpecial = r.office.toLowerCase().includes('special');
  const raceId = isSpecial ? `2026-SEN-SPECIAL-${r.state}` : `2026-SEN-${r.state}`;

  const candidates = r.candidates.map(c => ({
    name: c.name,
    party: c.party,
    status: c.status === 'nominee' ? 'Nominee' : c.status === 'incumbent-not-running' ? 'Incumbent (Not Running / Defeated)' : c.status,
    incumbent: Boolean(c.is_incumbent),
    sourceUrl: c.source_url,
    website: c.source_url,
  }));

  const ratings: RatingSnapshot[] = r.ratings.map(rt => ({
    rater: mapRater(rt.rater),
    value: mapRatingValue(rt.verbatim_label),
    verbatimLabel: rt.verbatim_label,
    asOfDate: rt.rater_date,
    sourceUrl: rt.source_url,
  }));

  const sources: SourceCitation[] = [
    {
      label: `${r.state_name} Senate Record`,
      url: r.candidates[0]?.source_url || `https://ballotpedia.org/United_States_Senate_election_in_${encodeURIComponent(r.state_name)},_2026`,
      accessDate: LAST_VERIFIED,
    },
    {
      label: 'U.S. Senate Class II Official Roster',
      url: 'https://www.senate.gov/senators/Class_II.htm',
      accessDate: LAST_VERIFIED,
    },
    {
      label: 'FEC 2026 Senate Candidate Filings',
      url: 'https://www.fec.gov/data/elections/senate/2026/',
      accessDate: LAST_VERIFIED,
    },
  ];

  let notes: string | undefined = undefined;
  if (r.polling_average && r.polling_average.leader) {
    notes = `Polling average: ${r.polling_average.leader} +${r.polling_average.spread}%. ${r.polling_average.method}`;
  } else if (r.status === 'open-seat') {
    notes = 'Open seat. General election nominees certified following primary canvases.';
  }

  return {
    raceId,
    tier: 1,
    level: 'federal',
    office: r.office,
    state: r.state_name,
    stateAbbr: r.state,
    seatClass: isSpecial ? 'Special' : 'Class II',
    electionDate: r.election_date,
    isSpecialElection: isSpecial,
    isPartisan: true,
    candidates,
    ratings,
    confidence: 'verified',
    notes,
    lastVerified: LAST_VERIFIED,
    sources,
  };
});
