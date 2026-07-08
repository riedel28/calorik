import { describe, expect, it } from 'vitest';

import {
  ACTIVITY_MULTIPLIERS,
  deurenbergBodyFat,
  fatMass,
  GOAL_QUALITY_PARTITION,
  harrisBenedictBMR,
  katchMcArdleBMR,
  leanMass,
  mifflinStJeorBMR,
  projectedBodyFatAtGoal,
  requiredDailyCalories,
  tdee,
} from './calculations';

const male = { age: 30, gender: 'male', heightCm: 180, weightKg: 90 } as const;
const female = { age: 38, gender: 'female', heightCm: 166, weightKg: 67 } as const;

describe('mifflinStJeorBMR', () => {
  it('calculates BMR for males', () => {
    expect(mifflinStJeorBMR(male)).toBeCloseTo(1880);
  });

  it('calculates BMR for females', () => {
    expect(mifflinStJeorBMR(female)).toBeCloseTo(1356.5);
  });
});

describe('harrisBenedictBMR', () => {
  it('calculates BMR for males', () => {
    expect(harrisBenedictBMR(male)).toBeCloseTo(1987.6, 1);
  });

  it('calculates BMR for females', () => {
    expect(
      harrisBenedictBMR({ age: 30, gender: 'female', heightCm: 180, weightKg: 90 }),
    ).toBeCloseTo(1707.56, 1);
  });
});

describe('katchMcArdleBMR', () => {
  it('calculates BMR from lean body mass', () => {
    expect(katchMcArdleBMR(67.5)).toBeCloseTo(1828);
  });
});

describe('deurenbergBodyFat', () => {
  it('estimates body fat for males', () => {
    // BMI 27.78: 1.2 * 27.78 + 0.23 * 30 - 10.8 - 5.4
    expect(deurenbergBodyFat(male)).toBeCloseTo(24.03, 1);
  });

  it('estimates body fat for females', () => {
    // BMI 24.31: 1.2 * 24.31 + 0.23 * 38 - 5.4
    expect(deurenbergBodyFat(female)).toBeCloseTo(32.52, 1);
  });
});

describe('leanMass / fatMass', () => {
  it('splits weight by body fat percentage', () => {
    expect(leanMass(90, 25)).toBeCloseTo(67.5);
    expect(fatMass(90, 25)).toBeCloseTo(22.5);
  });
});

describe('tdee', () => {
  it('multiplies BMR by the activity multiplier', () => {
    expect(tdee(1880, ACTIVITY_MULTIPLIERS.moderate)).toBeCloseTo(2914);
  });

  it('accepts a custom multiplier', () => {
    expect(tdee(1880, 2.1)).toBeCloseTo(3948);
  });
});

describe('requiredDailyCalories', () => {
  it('calculates a deficit for weight loss', () => {
    expect(
      requiredDailyCalories({ currentWeightKg: 90, days: 100, goalWeightKg: 80, tdee: 2500 }),
    ).toBeCloseTo(1730);
  });

  it('calculates a surplus for weight gain', () => {
    expect(
      requiredDailyCalories({ currentWeightKg: 80, days: 100, goalWeightKg: 90, tdee: 2500 }),
    ).toBeCloseTo(3270);
  });

  it('returns the TDEE when the goal equals the current weight', () => {
    expect(
      requiredDailyCalories({ currentWeightKg: 90, days: 100, goalWeightKg: 90, tdee: 2500 }),
    ).toBeCloseTo(2500);
  });

  it('returns null when days is zero or negative', () => {
    expect(
      requiredDailyCalories({ currentWeightKg: 90, days: 0, goalWeightKg: 80, tdee: 2500 }),
    ).toBeNull();
    expect(
      requiredDailyCalories({ currentWeightKg: 90, days: -5, goalWeightKg: 80, tdee: 2500 }),
    ).toBeNull();
  });
});

describe('projectedBodyFatAtGoal', () => {
  it('partitions weight loss between fat and lean mass', () => {
    // FM 24.64 kg, loss 11 kg at k=0.8 -> FM 15.84 kg / 77 kg -> 20.57%
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 28,
        currentWeightKg: 88,
        fatShareOfChange: 0.8,
        gender: 'male',
        goalWeightKg: 77,
      }),
    ).toBeCloseTo(20.57, 1);
  });

  it('reproduces the fat-only model with a share of 1', () => {
    // LBM 67.5 kg preserved, goal 75 kg -> fat 7.5 kg -> 10%
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 90,
        fatShareOfChange: 1,
        gender: 'male',
        goalWeightKg: 75,
      }),
    ).toBeCloseTo(10);
  });

  it('returns the current body fat when the goal equals the current weight', () => {
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 90,
        fatShareOfChange: 0.8,
        gender: 'male',
        goalWeightKg: 90,
      }),
    ).toBeCloseTo(25);
  });

  it('adds the fat share of gained weight on weight gain', () => {
    // FM 20 kg + 0.5 * 10 kg = 25 kg / 90 kg -> 27.78%
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 80,
        fatShareOfChange: 0.5,
        gender: 'male',
        goalWeightKg: 90,
      }),
    ).toBeCloseTo(27.78, 1);
  });

  it('clamps at essential body fat for males', () => {
    // FM 22.5 - 1 * 25 kg lost goes negative
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 90,
        fatShareOfChange: 1,
        gender: 'male',
        goalWeightKg: 65,
      }),
    ).toBe(3);
  });

  it('clamps at essential body fat for females', () => {
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 70,
        fatShareOfChange: 1,
        gender: 'female',
        goalWeightKg: 50,
      }),
    ).toBe(12);
  });

  it('clamps at the upper body fat limit for extreme gains', () => {
    // FM 15 kg + 1 * 90 kg -> raw 70% -> clamped to 60
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 60,
        fatShareOfChange: 1,
        gender: 'female',
        goalWeightKg: 150,
      }),
    ).toBe(60);
  });
});

describe('GOAL_QUALITY_PARTITION', () => {
  it('defines fat shares for every quality preset', () => {
    expect(GOAL_QUALITY_PARTITION.optimal).toEqual({ gainFatShare: 0.5, lossFatShare: 0.8 });
    expect(GOAL_QUALITY_PARTITION.moderate).toEqual({ gainFatShare: 0.7, lossFatShare: 0.7 });
    expect(GOAL_QUALITY_PARTITION.poor).toEqual({ gainFatShare: 0.8, lossFatShare: 0.6 });
  });
});
