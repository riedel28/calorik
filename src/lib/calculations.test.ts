import { describe, expect, it } from 'vitest';

import {
  ACTIVITY_MULTIPLIERS,
  deurenbergBodyFat,
  fatMass,
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
  it('projects body fat assuming lean mass is preserved', () => {
    // LBM 67.5 kg, goal 75 kg -> fat 7.5 kg -> 10%
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 90,
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
        gender: 'male',
        goalWeightKg: 90,
      }),
    ).toBeCloseTo(25);
  });

  it('clamps at essential body fat for males', () => {
    // goal 65 kg is below the 67.5 kg lean mass
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 90,
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
        gender: 'female',
        goalWeightKg: 50,
      }),
    ).toBe(12);
  });

  it('clamps at the upper body fat limit for extreme gains', () => {
    // LBM 45 kg, goal 150 kg -> raw 70% -> clamped to 60
    expect(
      projectedBodyFatAtGoal({
        currentBodyFatPct: 25,
        currentWeightKg: 60,
        gender: 'female',
        goalWeightKg: 150,
      }),
    ).toBe(60);
  });
});
