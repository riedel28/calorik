import { beforeEach, describe, expect, it } from 'vitest';

import { FORM_STORAGE_KEY, loadStoredFormValues, saveFormValues } from './form-storage';
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
});
