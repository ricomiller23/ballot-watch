export type Office = 'senate' | 'house' | 'governor' | 'state_leg';
export type PopulationType = 'LV' | 'RV' | 'A';
export type PollMethod = 'live_caller' | 'ivr' | 'online' | 'text' | 'mixed' | 'unknown';
export type RatingValue = 'toss_up' | 'lean_d' | 'lean_r' | 'likely_d' | 'likely_r' | 'solid_d' | 'solid_r' | 'safe_d' | 'safe_r';

export interface CandidateResult {
  candidate: string;
  party: string;
  pct: number;
}

export interface Poll {
  id: string;
  race_id: string;
  pollster: string;
  sponsor: string | null;
  field_start: string;
  field_end: string;
  published_at: string;
  sample_size: number;
  population: PopulationType;
  method: PollMethod;
  margin_of_error: number | null;
  hyperpartisan: boolean;
  results: CandidateResult[];
  source_id: string;
  source_url: string;
}

export interface PollAverageMethodBlock {
  windowDays: number;
  qualifyingPollCount: number;
  recencyWeighting: string;
  exclusionRules: string[];
  description: string;
}

export interface PollAverageResult {
  race_id: string;
  computed_at: string;
  status: 'published' | 'insufficient_polls_for_an_average';
  averages: Record<string, number> | null;
  methodBlock: PollAverageMethodBlock;
  contributing_poll_ids: string[];
}

export interface RatingRecord {
  id: string;
  race_id: string;
  rater: 'cook' | 'sabato' | 'inside_elections';
  value: RatingValue;
  verbatim_label: string;
  rater_date: string;
  previous_value: string | null;
  source_url: string;
}

export interface ForecastProbability {
  id: string;
  scope: 'chamber' | 'race';
  source: string;
  metric: 'win_probability' | 'seat_projection';
  value: number;
  as_of: string; // ISO
  source_url: string;
}

export interface Race {
  id: string;
  cycle: number;
  office: Office;
  state: string;
  district?: string;
  seat_class?: string;
  incumbent_party: string;
  open_seat: boolean;
  margin_2024: number;
  needed_for_control: boolean;
  election_date: string;
  candidates: Array<{ name: string; party: string; is_incumbent: boolean }>;
}

// ── Coverage & Tier Reporting Types ─────────────────────────────────────────

export type TierLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type DataConfidence = 'verified' | 'provisional' | 'placeholder';

export interface SourceCitation {
  label: string;
  url: string;
  accessDate: string;
}

export interface RatingSnapshot {
  rater: 'cook' | 'sabato' | 'inside_elections';
  value: RatingValue;
  verbatimLabel: string;
  asOfDate: string;
  sourceUrl: string;
}

export interface RaceEntry {
  raceId: string;
  tier: TierLevel;
  level: 'federal' | 'state' | 'county' | 'municipal' | 'special_district' | 'judicial';
  office: string;
  state: string;
  stateAbbr: string;
  district?: string;
  county?: string;
  municipality?: string;
  electionDate: string;
  isSpecialElection: boolean;
  isPartisan: boolean;
  seatClass?: string;
  candidates: Array<{
    name: string;
    party: string;
    status: string;
    incumbent: boolean;
    priorOffice?: string;
    age?: number;
    hometown?: string;
    website?: string;
  }>;
  ratings: RatingSnapshot[];
  confidence: DataConfidence;
  notes?: string;
  lastVerified: string;
  sources: SourceCitation[];
}

export interface CoverageTier {
  tier: TierLevel;
  label: string;
  totalContests: number | null;
  verifiedContests: number;
  status: 'shipped' | 'in_progress' | 'planned';
  notes: string;
  authoritativeSource: string;
  authoritativeUrl: string;
}

export interface CoverageReport {
  tiers: CoverageTier[];
  generatedAt: string;
  disclaimer: string;
}
