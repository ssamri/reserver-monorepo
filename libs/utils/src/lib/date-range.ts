import dayjs from 'dayjs';

export interface DateRangeInput {
  checkIn: string;
  checkOut: string;
}

export function getNightCount(range: DateRangeInput): number {
  const arrival = dayjs(range.checkIn);
  const departure = dayjs(range.checkOut);
  return Math.max(departure.diff(arrival, 'day'), 0);
}

export function isValidDateRange(range: DateRangeInput): boolean {
  const nights = getNightCount(range);
  return nights > 0 && dayjs(range.checkIn).isValid() && dayjs(range.checkOut).isValid();
}
