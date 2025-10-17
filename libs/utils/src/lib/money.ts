export function formatCurrency(amount: number, currency: string, locale = 'fr-MA'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export function applyPercentage(value: number, percentage: number): number {
  return Math.round((value * (1 + percentage / 100)) * 100) / 100;
}
