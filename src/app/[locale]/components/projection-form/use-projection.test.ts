import { describe, expect, it } from 'vitest';

import type { ProjectionFormValues } from './schema';
import { deriveProjection } from './use-projection';

const baseValues: Partial<ProjectionFormValues> = {
  activityLevel: 'moderate',
  age: '30',
  bodyFat: '25',
  customMultiplier: '',
  daysUntilGoal: '',
  formula: 'mifflin-st-jeor',
  gender: 'male',
  goalDate: '',
  goalWeight: '',
  height: '180',
  weight: '90',
};

describe('deriveProjection', () => {
  it('returns all nulls for empty values', () => {
    const result = deriveProjection({});

    expect(result).toEqual({
      bmr: null,
      bodyFatIsEstimated: false,
      bodyFatPct: null,
      dailyCalories: null,
      dailyCaloriesBelowBmr: false,
      fatMassKg: null,
      goalBodyFatPct: null,
      leanMassKg: null,
      tdee: null,
    });
  });

  it('derives current stats from personal data without goal fields', () => {
    const result = deriveProjection(baseValues);

    expect(result.bodyFatPct).toBe(25);
    expect(result.bodyFatIsEstimated).toBe(false);
    expect(result.leanMassKg).toBeCloseTo(67.5);
    expect(result.fatMassKg).toBeCloseTo(22.5);
    expect(result.bmr).toBeCloseTo(1880);
    expect(result.tdee).toBeCloseTo(2914);
    expect(result.dailyCalories).toBeNull();
    expect(result.goalBodyFatPct).toBeNull();
  });

  it('estimates body fat via Deurenberg when not provided', () => {
    const result = deriveProjection({ ...baseValues, bodyFat: '' });

    expect(result.bodyFatIsEstimated).toBe(true);
    expect(result.bodyFatPct).toBeCloseTo(24.03, 1);
    expect(result.leanMassKg).not.toBeNull();
  });

  it('uses Katch-McArdle BMR from lean mass when selected', () => {
    const result = deriveProjection({ ...baseValues, formula: 'katch-mcardle' });

    // LBM 67.5 -> 370 + 21.6 * 67.5
    expect(result.bmr).toBeCloseTo(1828);
  });

  it('falls back to estimated lean mass for Katch-McArdle without measured body fat', () => {
    const result = deriveProjection({ ...baseValues, bodyFat: '', formula: 'katch-mcardle' });

    expect(result.bodyFatIsEstimated).toBe(true);
    expect(result.bmr).not.toBeNull();
  });

  it('drops out-of-range values from the calculation', () => {
    const result = deriveProjection({ ...baseValues, age: '500' });

    expect(result.bmr).toBeNull();
    expect(result.tdee).toBeNull();
  });

  it('returns null TDEE for custom activity without a multiplier', () => {
    const result = deriveProjection({ ...baseValues, activityLevel: 'custom' });

    expect(result.bmr).not.toBeNull();
    expect(result.tdee).toBeNull();
  });

  it('uses the custom multiplier when provided', () => {
    const result = deriveProjection({
      ...baseValues,
      activityLevel: 'custom',
      customMultiplier: '2',
    });

    expect(result.tdee).toBeCloseTo(3760);
  });

  it('derives goal results when goal weight and days are set', () => {
    const result = deriveProjection({
      ...baseValues,
      daysUntilGoal: '100',
      goalWeight: '80',
    });

    // tdee 2914 - (10 * 7700) / 100
    expect(result.dailyCalories).toBeCloseTo(2144);
    // LBM 67.5, goal 80 -> 12.5 / 80
    expect(result.goalBodyFatPct).toBeCloseTo(15.625);
    expect(result.dailyCaloriesBelowBmr).toBe(false);
  });

  it('flags required calories below BMR', () => {
    const result = deriveProjection({
      ...baseValues,
      daysUntilGoal: '30',
      goalWeight: '80',
    });

    // 2914 - 77000 / 30 = 347.3 < 1880
    expect(result.dailyCalories).toBeLessThan(1880);
    expect(result.dailyCaloriesBelowBmr).toBe(true);
  });
});
