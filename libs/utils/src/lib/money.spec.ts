import { applyPercentage, formatCurrency } from './money';

describe('money utils', () => {
  it('formats amounts in MAD', () => {
    expect(formatCurrency(1200, 'MAD')).toContain('1 200');
  });

  it('applies percentage increase', () => {
    expect(applyPercentage(100, 10)).toBe(110);
  });
});
