import { addDays, parseISO } from 'date-fns';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  dropExpiredGoalDate,
  FORM_STORAGE_KEY,
  loadStoredFormValues,
  saveFormValues,
} from './form-storage';
import { toIsoDate } from './goal-timeline';
import type { ProjectionFormValues } from './schema';

const validValues: ProjectionFormValues = {
  activityLevel: 'moderate',
  age: '30',
  bodyFat: '25',
  customMultiplier: '',
  formula: 'mifflin-st-jeor',
  gender: 'male',
  goalDate: '',
  goalQuality: 'optimal',
  goalWeight: '80',
  height: '180',
  weight: '90',
};

const today = parseISO('2026-07-08');

describe('form storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('round-trips saved form values', () => {
    saveFormValues(validValues);

    expect(loadStoredFormValues()).toEqual(validValues);
  });

  it('returns null when nothing is stored', () => {
    expect(loadStoredFormValues()).toBeNull();
  });

  it('returns null for corrupted JSON', () => {
    localStorage.setItem(FORM_STORAGE_KEY, '{not json');

    expect(loadStoredFormValues()).toBeNull();
  });

  it('returns null when the stored shape does not match the schema', () => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ weight: 90 }));

    expect(loadStoredFormValues()).toBeNull();
  });

  it('returns null when an enum field holds an unknown value', () => {
    localStorage.setItem(
      FORM_STORAGE_KEY,
      JSON.stringify({ ...validValues, activityLevel: 'heavy' }),
    );

    expect(loadStoredFormValues()).toBeNull();
  });

  it('accepts stored values with out-of-range numeric strings', () => {
    // Range errors are the form's job to display; storage only checks the shape.
    const stored = { ...validValues, age: '500' };
    saveFormValues(stored);

    expect(loadStoredFormValues()).toEqual(stored);
  });

  it('clears an expired stored goal date on restore', () => {
    const stored = { ...validValues, goalDate: '2000-01-01' };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(stored));

    expect(loadStoredFormValues()).toEqual({ ...stored, goalDate: '' });
  });

  it('drops the legacy daysUntilGoal field from older snapshots', () => {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({ ...validValues, daysUntilGoal: '30' }));

    expect(loadStoredFormValues()).toEqual(validValues);
  });
});

describe('dropExpiredGoalDate', () => {
  it('returns values unchanged when goalDate is empty', () => {
    expect(dropExpiredGoalDate(validValues, today)).toEqual(validValues);
  });

  it('keeps a future goal date', () => {
    const values = { ...validValues, goalDate: toIsoDate(addDays(today, 30)) };

    expect(dropExpiredGoalDate(values, today)).toEqual(values);
  });

  it.each([
    ['today', toIsoDate(today)],
    ['in the past', toIsoDate(addDays(today, -10))],
    ['not a valid date', 'not-a-date'],
  ])('clears a goal date that is %s', (_label, goalDate) => {
    expect(dropExpiredGoalDate({ ...validValues, goalDate }, today)).toEqual({
      ...validValues,
      goalDate: '',
    });
  });
});
