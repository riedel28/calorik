import { addDays, differenceInCalendarDays, format, parseISO } from 'date-fns';

import { LIMITS } from '@/lib/calculations';

// The goal date is the single source of truth; "days until goal" is derived from it.

const isAllowedDayCount = (days: number): boolean =>
  Number.isInteger(days) && days >= LIMITS.daysUntilGoal.min && days <= LIMITS.daysUntilGoal.max;

/** Days from `today` to an ISO goal date, or null if the date is empty, invalid or out of range. */
export const daysUntilGoal = (goalDate: string, today: Date): number | null => {
  if (goalDate === '') {
    return null;
  }
  const date = parseISO(goalDate);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const days = differenceInCalendarDays(date, today);
  return isAllowedDayCount(days) ? days : null;
};

/** ISO goal date for a typed day count, or null if the text is not an allowed count. */
export const goalDateFromDays = (text: string, today: Date): string | null => {
  const days = Number(text);
  if (text === '' || !isAllowedDayCount(days)) {
    return null;
  }
  return toIsoDate(addDays(today, days));
};

export const toIsoDate = (date: Date): string => format(date, 'yyyy-MM-dd');
