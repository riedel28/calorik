import { addDays, format, parseISO } from 'date-fns';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  FORM_STORAGE_KEY,
  loadStoredFormValues,
  reconcileGoalTimeline,
  saveFormValues,
} from './form-storage';
import type { ProjectionFormValues } from './schema';

const validValues: ProjectionFormValues = {
  activityLevel: 'moderate',
  age: '30',
  bodyFat: '25',
  customMultiplier: '',
  daysUntilGoal: '100',
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

  it('reconciles a stale stored goal date on restore', () => {
    const stored = {
      ...validValues,
      daysUntilGoal: '30',
      goalDate: format(addDays(today, -5), 'yyyy-MM-dd'),
    };
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(stored));

    expect(loadStoredFormValues()).toEqual({ ...stored, daysUntilGoal: '', goalDate: '' });
  });
});

describe('reconcileGoalTimeline', () => {
  it('returns values unchanged when goalDate is empty', () => {
    expect(reconcileGoalTimeline(validValues, today)).toEqual(validValues);
  });

  it('recomputes daysUntilGoal from a future goalDate', () => {
    const values = { ...validValues, goalDate: format(addDays(today, 30), 'yyyy-MM-dd') };

    expect(reconcileGoalTimeline(values, today)).toEqual({ ...values, daysUntilGoal: '30' });
  });

  it('yields daysUntilGoal of 1 for tomorrow', () => {
    const values = { ...validValues, goalDate: format(addDays(today, 1), 'yyyy-MM-dd') };

    expect(reconcileGoalTimeline(values, today)).toEqual({ ...values, daysUntilGoal: '1' });
  });

  it('clears both fields when goalDate is today', () => {
    const values = { ...validValues, goalDate: format(today, 'yyyy-MM-dd') };

    expect(reconcileGoalTimeline(values, today)).toEqual({
      ...values,
      daysUntilGoal: '',
      goalDate: '',
    });
  });

  it('clears both fields when goalDate is in the past', () => {
    const values = { ...validValues, goalDate: format(addDays(today, -10), 'yyyy-MM-dd') };

    expect(reconcileGoalTimeline(values, today)).toEqual({
      ...values,
      daysUntilGoal: '',
      goalDate: '',
    });
  });

  it('clears both fields when goalDate is not a valid date', () => {
    const values = { ...validValues, goalDate: 'not-a-date' };

    expect(reconcileGoalTimeline(values, today)).toEqual({
      ...values,
      daysUntilGoal: '',
      goalDate: '',
    });
  });
});
