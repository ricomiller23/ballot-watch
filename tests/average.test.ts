import { describe, it, expect } from 'vitest';
import { calculatePollingAverage } from '../lib/average';
import { Poll } from '../lib/types';

describe('BALLOT.WATCH Polling Average & Method Engine Suite', () => {
  it('strictly REFUSES to produce an average when fewer than 3 qualifying polls exist', () => {
    const twoPolls: Poll[] = [
      {
        id: 'p1',
        race_id: 'RACE-TEST',
        pollster: 'Pollster A',
        sponsor: null,
        field_start: '2026-09-01',
        field_end: '2026-09-05',
        published_at: '2026-09-06T10:00:00Z',
        sample_size: 800,
        population: 'LV',
        method: 'live_caller',
        margin_of_error: 3.5,
        hyperpartisan: false,
        results: [
          { candidate: 'Candidate D', party: 'DEM', pct: 49 },
          { candidate: 'Candidate R', party: 'REP', pct: 46 },
        ],
        source_id: 'p1',
        source_url: '',
      },
      {
        id: 'p2',
        race_id: 'RACE-TEST',
        pollster: 'Pollster B',
        sponsor: null,
        field_start: '2026-09-02',
        field_end: '2026-09-07',
        published_at: '2026-09-08T10:00:00Z',
        sample_size: 750,
        population: 'LV',
        method: 'online',
        margin_of_error: 3.8,
        hyperpartisan: false,
        results: [
          { candidate: 'Candidate D', party: 'DEM', pct: 48 },
          { candidate: 'Candidate R', party: 'REP', pct: 47 },
        ],
        source_id: 'p2',
        source_url: '',
      },
    ];

    const result = calculatePollingAverage('RACE-TEST', twoPolls);
    expect(result.status).toBe('insufficient_polls_for_an_average');
    expect(result.averages).toBeNull();
    expect(result.methodBlock.qualifyingPollCount).toBe(2);
  });

  it('produces a weighted average with full method block when ≥3 qualifying polls exist', () => {
    const threePolls: Poll[] = [
      {
        id: 'p1',
        race_id: 'RACE-QUAL',
        pollster: 'Pollster A',
        sponsor: null,
        field_start: '2026-09-01',
        field_end: '2026-09-05',
        published_at: '2026-09-06T10:00:00Z',
        sample_size: 1000,
        population: 'LV',
        method: 'live_caller',
        margin_of_error: 3.1,
        hyperpartisan: false,
        results: [
          { candidate: 'Candidate D', party: 'DEM', pct: 50 },
          { candidate: 'Candidate R', party: 'REP', pct: 45 },
        ],
        source_id: 'p1',
        source_url: '',
      },
      {
        id: 'p2',
        race_id: 'RACE-QUAL',
        pollster: 'Pollster B',
        sponsor: null,
        field_start: '2026-09-05',
        field_end: '2026-09-08',
        published_at: '2026-09-09T10:00:00Z',
        sample_size: 950,
        population: 'LV',
        method: 'live_caller',
        margin_of_error: 3.2,
        hyperpartisan: false,
        results: [
          { candidate: 'Candidate D', party: 'DEM', pct: 49 },
          { candidate: 'Candidate R', party: 'REP', pct: 46 },
        ],
        source_id: 'p2',
        source_url: '',
      },
      {
        id: 'p3',
        race_id: 'RACE-QUAL',
        pollster: 'Pollster C',
        sponsor: null,
        field_start: '2026-09-10',
        field_end: '2026-09-14',
        published_at: '2026-09-15T10:00:00Z',
        sample_size: 1100,
        population: 'LV',
        method: 'live_caller',
        margin_of_error: 3.0,
        hyperpartisan: false,
        results: [
          { candidate: 'Candidate D', party: 'DEM', pct: 48 },
          { candidate: 'Candidate R', party: 'REP', pct: 47 },
        ],
        source_id: 'p3',
        source_url: '',
      },
    ];

    const result = calculatePollingAverage('RACE-QUAL', threePolls);
    expect(result.status).toBe('published');
    expect(result.averages).not.toBeNull();
    expect(result.averages!['Candidate D']).toBeDefined();
    expect(result.averages!['Candidate R']).toBeDefined();
    expect(result.methodBlock.qualifyingPollCount).toBe(3);
    expect(result.methodBlock.exclusionRules.length).toBeGreaterThan(0);
  });
});
