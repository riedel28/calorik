import { parseISO } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { daysUntilGoal, goalDateFromDays } from './goal-timeline';

const today = parseISO('2026-07-08');

describe('daysUntilGoal', () => {
  it('counts calendar days to a future date', () => {
    expect(daysUntilGoal('2026-07-09', today)).toBe(1);
    expect(daysUntilGoal('2026-10-16', today)).toBe(100);
  });

  it.each([
    ['empty', ''],
    ['today', '2026-07-08'],
    ['past', '2026-07-01'],
    ['invalid', 'not-a-date'],
    ['beyond the limit', '2046-07-08'],
  ])('returns null for %s', (_label, goalDate) => {
    expect(daysUntilGoal(goalDate, today)).toBeNull();
  });
});

describe('goalDateFromDays', () => {
  it('turns a day count into an ISO date', () => {
    expect(goalDateFromDays('100', today)).toBe('2026-10-16');
  });

  it.each(['', '0', '1.5', '-3', '5000', 'abc'])('rejects %j', (text) => {
    expect(goalDateFromDays(text, today)).toBeNull();
  });

  it('round-trips with daysUntilGoal', () => {
    const date = goalDateFromDays('42', today);
    expect(date && daysUntilGoal(date, today)).toBe(42);
  });
});
