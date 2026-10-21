import { addDays, parseISO } from 'date-fns';
import { describe, expect, it } from 'vitest';

import { toIsoDate } from './goal-timeline';
import type { ProjectionFormValues } from './schema';
import { deriveProjection } from './use-projection';

const today = parseISO('2026-07-08');
const inDays = (days: number) => toIsoDate(addDays(today, days));

const baseValues: Partial<ProjectionFormValues> = {
  activityLevel: 'moderate',
  age: '30',
  bodyFat: '25',
  customMultiplier: '',
  formula: 'mifflin-st-jeor',
  gender: 'male',
  goalDate: '',
  goalQuality: 'optimal',
  goalWeight: '',
  height: '180',
  weight: '90',
};

const derive = (overrides: Partial<ProjectionFormValues> = {}) =>
  deriveProjection({ ...baseValues, ...overrides }, today);

describe('deriveProjection', () => {
  it('returns all nulls for empty values', () => {
    expect(deriveProjection({}, today)).toEqual({ bmr: null, body: null, goal: null, tdee: null });
  });

  it('derives current stats from personal data without goal fields', () => {
    const result = derive();

    expect(result.body?.bodyFatPct).toBe(25);
    expect(result.body?.isEstimated).toBe(false);
    expect(result.body?.leanMassKg).toBeCloseTo(67.5);
    expect(result.body?.fatMassKg).toBeCloseTo(22.5);
    expect(result.bmr).toBeCloseTo(1880);
    expect(result.tdee).toBeCloseTo(2914);
    expect(result.goal).toBeNull();
  });

  it('estimates body fat via Deurenberg when not provided', () => {
    const result = derive({ bodyFat: '' });

    expect(result.body?.isEstimated).toBe(true);
    expect(result.body?.bodyFatPct).toBeCloseTo(24.03, 1);
  });

  it('uses Katch-McArdle BMR from lean mass when selected', () => {
    const result = derive({ formula: 'katch-mcardle' });

    // LBM 67.5 -> 370 + 21.6 * 67.5
    expect(result.bmr).toBeCloseTo(1828);
  });

  it('falls back to estimated lean mass for Katch-McArdle without measured body fat', () => {
    const result = derive({ bodyFat: '', formula: 'katch-mcardle' });

    expect(result.body?.isEstimated).toBe(true);
    expect(result.bmr).not.toBeNull();
  });

  it('uses Harris-Benedict BMR from body metrics when selected', () => {
    const result = derive({ formula: 'harris-benedict' });

    expect(result.bmr).toBeCloseTo(1987.6, 1);
  });

  it('returns null BMR for Harris-Benedict without complete body metrics', () => {
    const result = derive({ age: '', formula: 'harris-benedict' });

    expect(result.bmr).toBeNull();
  });

  it('drops out-of-range values from the calculation', () => {
    const result = derive({ age: '500' });

    expect(result.bmr).toBeNull();
    expect(result.tdee).toBeNull();
  });

  it('returns null TDEE for custom activity without a multiplier', () => {
    const result = derive({ activityLevel: 'custom' });

    expect(result.bmr).not.toBeNull();
    expect(result.tdee).toBeNull();
  });

  it('uses the custom multiplier when provided', () => {
    const result = derive({ activityLevel: 'custom', customMultiplier: '2' });

    expect(result.tdee).toBeCloseTo(3760);
  });

  it('derives the goal projection when goal weight and date are set', () => {
    const goal = derive({ goalDate: inDays(100), goalWeight: '80' }).goal;

    // tdee 2914 - (10 * 7700) / 100
    expect(goal?.dailyCalories).toBeCloseTo(2144);
    expect(goal?.caloriesVsTdee).toBeCloseTo(-770);
    // optimal loss: FM 22.5 - 0.8 * 10 = 14.5 -> 14.5 / 80
    expect(goal?.bodyFatPct).toBeCloseTo(18.125);
    expect(goal?.bodyFatChangePct).toBeCloseTo(-6.875);
    // 80 * (1 - 0.18125)
    expect(goal?.leanMassKg).toBeCloseTo(65.5);
    expect(goal?.leanMassChangeKg).toBeCloseTo(-2);
    // -10 kg over 100 days
    expect(goal?.weeklyChangeKg).toBeCloseTo(-0.7);
    expect(goal?.weeklyChangePct).toBeCloseTo(0.778, 2);
    expect(goal?.status).toBe('ok');
  });

  it('has no goal without a goal date', () => {
    expect(derive({ goalWeight: '80' }).goal).toBeNull();
  });

  it('has no goal when the goal date is not in the future', () => {
    expect(derive({ goalDate: inDays(0), goalWeight: '80' }).goal).toBeNull();
  });

  it('uses the loss fat share of the selected goal quality', () => {
    const goal = derive({ goalDate: inDays(100), goalQuality: 'poor', goalWeight: '80' }).goal;

    // poor loss: FM 22.5 - 0.6 * 10 = 16.5 -> 16.5 / 80
    expect(goal?.bodyFatPct).toBeCloseTo(20.625);
  });

  it('uses the gain fat share when the goal weight is above the current weight', () => {
    const goal = derive({ goalDate: inDays(365), goalWeight: '100' }).goal;

    // optimal gain: FM 22.5 + 0.5 * 10 = 27.5 -> 27.5 / 100
    expect(goal?.bodyFatPct).toBeCloseTo(27.5);
    expect(goal?.leanMassKg).toBeCloseTo(72.5);
  });

  it('flags required calories below BMR', () => {
    const goal = derive({ goalDate: inDays(30), goalWeight: '80' }).goal;

    // 2914 - 77000 / 30 = 347.3 < 1880
    expect(goal?.dailyCalories).toBeLessThan(1880);
    expect(goal?.status).toBe('belowBmr');
  });
});
