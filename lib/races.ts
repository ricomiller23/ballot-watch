import racesDataset from '../data/races.json';

export interface Candidate {
  name: string;
  party: string;
  status: 'nominee' | 'incumbent-not-running' | 'primary-pending' | 'runoff';
  is_incumbent?: boolean;
  fec_id?: string | null;
  source_url: string;
  verified_at: string;
}

export interface Rating {
  rater: string;
  verbatim_label: string;
  rater_date: string;
  source_url: string;
}

export interface Poll {
  pollster: string;
  field_dates: string;
  sample_size: number;
  sample_type: string;
  results: Record<string, number>;
  source_url: string;
  sponsor?: string | null;
}

export interface PollingAverage {
  leader: string | null;
  spread: number | null;
  averages: Record<string, number> | null;
  qualifying_polls_count: number;
  method: string;
}

export interface Race {
  id: string;
  state: string;
  state_name: string;
  office: string;
  district: string | null;
  tier: number;
  cycle: number;
  election_date: string;
  status: string;
  is_featured: boolean;
  candidates: Candidate[];
  ratings: Rating[];
  polls: Poll[];
  polling_average: PollingAverage | null;
}

export const racesData = racesDataset as {
  metadata: {
    generated_at: string;
    cycle: number;
    election_date: string;
    total_races: number;
    tier_counts: {
      tier1_senate: number;
      tier2_governor: number;
      tier3_house: number;
      tier6_mayoral: number;
    };
    total_candidates: number;
    total_sourced_nominees: number;
    total_polls: number;
    total_ratings: number;
  };
  races: Race[];
};

export function getAllRaces(): Race[] {
  return racesData.races;
}

export function getRaceById(id: string): Race | undefined {
  return racesData.races.find(r => r.id === id);
}

export function getSenateRaces(): Race[] {
  return racesData.races.filter(r => r.tier === 1);
}

export function getGovernorRaces(): Race[] {
  return racesData.races.filter(r => r.tier === 2);
}

export function getHouseRaces(): Race[] {
  return racesData.races.filter(r => r.tier === 3);
}

export function getMayoralRaces(): Race[] {
  return racesData.races.filter(r => r.tier === 6);
}

export function getAllPolls(): { raceId: string; office: string; poll: Poll }[] {
  const result: { raceId: string; office: string; poll: Poll }[] = [];
  for (const race of racesData.races) {
    for (const poll of race.polls) {
      result.push({ raceId: race.id, office: race.office, poll });
    }
  }
  return result;
}

export function getAllRatings(): { raceId: string; office: string; rating: Rating }[] {
  const result: { raceId: string; office: string; rating: Rating }[] = [];
  for (const race of racesData.races) {
    for (const rating of race.ratings) {
      result.push({ raceId: race.id, office: race.office, rating });
    }
  }
  return result;
}

export function getCoverageMetrics() {
  const races = racesData.races;
  let candidatesCount = 0;
  let sourcedNomineesCount = 0;
  let racesWithSourcedNominee = 0;

  for (const race of races) {
    const hasSourcedNominee = race.candidates.some(c => c.status === 'nominee' && Boolean(c.source_url));
    if (hasSourcedNominee) {
      racesWithSourcedNominee++;
    }
    for (const c of race.candidates) {
      candidatesCount++;
      if (c.status === 'nominee' && c.source_url) {
        sourcedNomineesCount++;
      }
    }
  }

  const senateRaces = races.filter(r => r.tier === 1);
  const govRaces = races.filter(r => r.tier === 2);
  const houseRaces = races.filter(r => r.tier === 3);
  const mayorRaces = races.filter(r => r.tier === 6);

  return {
    totalRaces: races.length,
    racesWithSourcedNominee,
    totalCandidates: candidatesCount,
    totalSourcedNominees: sourcedNomineesCount,
    senateTotal: senateRaces.length,
    senateSourced: senateRaces.filter(r => r.candidates.some(c => c.status === 'nominee' && c.source_url)).length,
    govTotal: govRaces.length,
    govSourced: govRaces.filter(r => r.candidates.some(c => c.status === 'nominee' && c.source_url)).length,
    houseTotal: houseRaces.length,
    houseSourced: houseRaces.filter(r => r.candidates.some(c => c.status === 'nominee' && c.source_url)).length,
    mayorTotal: mayorRaces.length,
    mayorSourced: mayorRaces.filter(r => r.candidates.some(c => c.status === 'nominee' && c.source_url)).length
  };
}

export function computeSenateControl() {
  // Real 119th Congress composition:
  // 53 R, 47 D/I
  // 35 seats up in 2026 (33 Class II + OH & FL specials: 22 R seats up, 13 D seats up)
  // Holdovers: 31 R holdovers, 34 D holdovers
  const repHoldovers = 31;
  const demHoldovers = 34;
  const seatsToMajority = 51;

  const senate = getSenateRaces();
  let repSafe = 0;
  let demSafe = 0;
  let tossUp = 0;

  for (const r of senate) {
    const cook = r.ratings.find(rt => rt.rater === "Cook Political Report")?.verbatim_label || "";
    if (cook.includes("Toss Up")) {
      tossUp++;
    } else if (cook.includes("Republican")) {
      repSafe++;
    } else if (cook.includes("Democrat")) {
      demSafe++;
    } else {
      // default by nominee party if only one nominee
      const noms = r.candidates.filter(c => c.status === 'nominee');
      if (noms.length === 1) {
        if (noms[0].party === 'REP') repSafe++;
        else if (noms[0].party === 'DEM') demSafe++;
        else tossUp++;
      } else {
        tossUp++;
      }
    }
  }

  return {
    repHoldovers,
    demHoldovers,
    seatsToMajority,
    repSafeOrLean: repHoldovers + repSafe,
    demSafeOrLean: demHoldovers + demSafe,
    tossUps: tossUp,
    totalSenateRaces: senate.length,
    majorityThreshold: 51,
    note: `119th Congress composition: 53 R, 47 D/I. 31 Republican and 34 Democratic senators are not up for re-election. 51 seats required for majority control.`
  };
}
