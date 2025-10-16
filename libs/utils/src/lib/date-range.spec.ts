import { getNightCount, isValidDateRange } from './date-range';

describe('date-range utils', () => {
  it('calculates nights between two dates', () => {
    expect(getNightCount({ checkIn: '2025-05-01', checkOut: '2025-05-05' })).toBe(4);
  });

  it('validates positive ranges', () => {
    expect(isValidDateRange({ checkIn: '2025-05-01', checkOut: '2025-05-03' })).toBe(true);
    expect(isValidDateRange({ checkIn: '2025-05-01', checkOut: '2025-05-01' })).toBe(false);
  });
});
