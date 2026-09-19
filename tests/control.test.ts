import { describe, it, expect } from 'vitest';
import { calculateControlArithmetic } from '../lib/control';

describe('Chamber Control Arithmetic Suite', () => {
  it('correctly checks House majority threshold of 218 and Senate threshold of 51', () => {
    const { house, senate } = calculateControlArithmetic();
    expect(house.neededForMajority).toBe(218);
    expect(house.totalSeats).toBe(435);
    expect(senate.neededForMajority).toBe(51);
    expect(senate.totalSeats).toBe(100);
  });
});
