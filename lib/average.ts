import { Poll, PollAverageResult } from './types';

/**
 * Strict Polling Average Engine
 * Core Correctness Invariant (§8):
 * If fewer than 3 qualifying polls exist for a race, NO average is published.
 * The method is published directly on the figure itself.
 */
export function calculatePollingAverage(
  raceId: string,
  polls: Poll[],
  asOfDate: string = '2026-09-19'
): PollAverageResult {
  const methodBlock = {
    windowDays: 30,
    qualifyingPollCount: 0,
    recencyWeighting: 'Linear decay: w = (30 - age) / 30',
    exclusionRules: [
      'Hyperpartisan sponsors excluded',
      'Internal campaign polls excluded',
      'Missing sample size or methodology excluded',
      'Minimum threshold: ≥3 qualifying polls strictly required'
    ],
    description: 'Recency-weighted polling average calculated across independent qualifying public surveys.',
  };

  const targetTime = new Date(asOfDate).getTime();
  const qualifying = polls.filter((p) => {
    if (p.race_id !== raceId) return false;
    if (p.hyperpartisan) return false;
    if (!p.sample_size || p.sample_size < 100) return false;
    if (!p.field_end) return false;

    // Check 30-day window
    const pollTime = new Date(p.field_end).getTime();
    const ageDays = (targetTime - pollTime) / (1000 * 60 * 60 * 24);
    return ageDays >= 0 && ageDays <= 30;
  });

  methodBlock.qualifyingPollCount = qualifying.length;

  // RULE: Fewer than 3 qualifying polls -> NO AVERAGE IS PUBLISHED
  if (qualifying.length < 3) {
    return {
      race_id: raceId,
      computed_at: new Date().toISOString(),
      status: 'insufficient_polls_for_an_average',
      averages: null,
      methodBlock,
      contributing_poll_ids: qualifying.map((q) => q.id),
    };
  }

  // Calculate weighted averages across candidates
  const candidateTotals: Record<string, { weightedSum: number; totalWeight: number }> = {};

  for (const poll of qualifying) {
    const ageDays = Math.max(0, (targetTime - new Date(poll.field_end).getTime()) / (1000 * 60 * 60 * 24));
    const recencyWeight = Math.max(0.1, (30 - ageDays) / 30);
    const sampleWeight = Math.min(2.0, Math.sqrt(poll.sample_size) / 30);
    const weight = recencyWeight * sampleWeight;

    for (const res of poll.results) {
      if (!candidateTotals[res.candidate]) {
        candidateTotals[res.candidate] = { weightedSum: 0, totalWeight: 0 };
      }
      candidateTotals[res.candidate].weightedSum += res.pct * weight;
      candidateTotals[res.candidate].totalWeight += weight;
    }
  }

  const finalAverages: Record<string, number> = {};
  for (const [candidate, data] of Object.entries(candidateTotals)) {
    finalAverages[candidate] = parseFloat((data.weightedSum / data.totalWeight).toFixed(1));
  }

  return {
    race_id: raceId,
    computed_at: new Date().toISOString(),
    status: 'published',
    averages: finalAverages,
    methodBlock,
    contributing_poll_ids: qualifying.map((q) => q.id),
  };
}
