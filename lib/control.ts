export interface ChamberControlArithmetic {
  chamber: 'house' | 'senate';
  totalSeats: number;
  neededForMajority: number;
  demHeld: number;
  repHeld: number;
  tossUps: number;
  note: string;
}

export function calculateControlArithmetic(): { house: ChamberControlArithmetic; senate: ChamberControlArithmetic } {
  return {
    house: {
      chamber: 'house',
      totalSeats: 435,
      neededForMajority: 218,
      demHeld: 213,
      repHeld: 220,
      tossUps: 22,
      note: '218 seats required for majority control. Democrats require net +5 pickup.',
    },
    senate: {
      chamber: 'senate',
      totalSeats: 100,
      neededForMajority: 51, // or 50 with VP tie-breaker
      demHeld: 47,
      repHeld: 49,
      tossUps: 4,
      note: '51 seats required for outright control (or 50 with Vice President breaking ties).',
    },
  };
}
