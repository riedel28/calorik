'use client';

import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  ACTIVITY_MULTIPLIERS,
  tdee as calculateTdee,
  deurenbergBodyFat,
  fatMass,
  GOAL_QUALITY_PARTITION,
  harrisBenedictBMR,
  katchMcArdleBMR,
  LIMITS,
  leanMass,
  mifflinStJeorBMR,
  projectedBodyFatAtGoal,
  requiredDailyCalories,
} from '@/lib/calculations';

import type { ProjectionFormValues } from './schema';

export interface ProjectionResult {
  bmr: number | null;
  bodyFatIsEstimated: boolean;
  bodyFatPct: number | null;
  dailyCalories: number | null;
  dailyCaloriesBelowBmr: boolean;
  fatMassKg: number | null;
  goalBodyFatPct: number | null;
  goalLeanMassKg: number | null;
  leanMassKg: number | null;
  tdee: number | null;
}

const toNum = (
  value: string | undefined,
  { max, min }: { max: number; min: number },
): number | null => {
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : null;
};

const resolveActivityMultiplier = (values: Partial<ProjectionFormValues>): number | null => {
  if (values.activityLevel === 'custom') {
    return toNum(values.customMultiplier, LIMITS.customMultiplier);
  }
  return values.activityLevel ? ACTIVITY_MULTIPLIERS[values.activityLevel] : null;
};

export const deriveProjection = (values: Partial<ProjectionFormValues>): ProjectionResult => {
  const age = toNum(values.age, LIMITS.age);
  const heightCm = toNum(values.height, LIMITS.height);
  const weightKg = toNum(values.weight, LIMITS.weight);
  const measuredBodyFat = toNum(values.bodyFat, LIMITS.bodyFat);
  const gender = values.gender ?? null;

  const metrics =
    age !== null && heightCm !== null && weightKg !== null && gender !== null
      ? { age, gender, heightCm, weightKg }
      : null;

  const estimatedBodyFat = metrics
    ? Math.min(Math.max(deurenbergBodyFat(metrics), LIMITS.bodyFat.min), LIMITS.bodyFat.max)
    : null;
  const bodyFatPct = measuredBodyFat ?? estimatedBodyFat;
  const bodyFatIsEstimated = measuredBodyFat === null && estimatedBodyFat !== null;

  const leanMassKg =
    weightKg !== null && bodyFatPct !== null ? leanMass(weightKg, bodyFatPct) : null;
  const fatMassKg = weightKg !== null && bodyFatPct !== null ? fatMass(weightKg, bodyFatPct) : null;

  let bmr: number | null = null;
  if (values.formula === 'katch-mcardle') {
    bmr = leanMassKg !== null ? katchMcArdleBMR(leanMassKg) : null;
  } else if (values.formula === 'mifflin-st-jeor') {
    bmr = metrics ? mifflinStJeorBMR(metrics) : null;
  } else if (values.formula === 'harris-benedict') {
    bmr = metrics ? harrisBenedictBMR(metrics) : null;
  }

  const activityMultiplier = resolveActivityMultiplier(values);
  const tdee =
    bmr !== null && activityMultiplier !== null ? calculateTdee(bmr, activityMultiplier) : null;

  const goalWeightKg = toNum(values.goalWeight, LIMITS.goalWeight);
  const days = toNum(values.daysUntilGoal, LIMITS.daysUntilGoal);

  const dailyCalories =
    tdee !== null && weightKg !== null && goalWeightKg !== null && days !== null
      ? requiredDailyCalories({ currentWeightKg: weightKg, days, goalWeightKg, tdee })
      : null;

  const partition = values.goalQuality ? GOAL_QUALITY_PARTITION[values.goalQuality] : null;
  const fatShareOfChange =
    partition !== null && weightKg !== null && goalWeightKg !== null
      ? goalWeightKg < weightKg
        ? partition.lossFatShare
        : partition.gainFatShare
      : null;

  const goalBodyFatPct =
    weightKg !== null &&
    bodyFatPct !== null &&
    goalWeightKg !== null &&
    gender !== null &&
    fatShareOfChange !== null
      ? projectedBodyFatAtGoal({
          currentBodyFatPct: bodyFatPct,
          currentWeightKg: weightKg,
          fatShareOfChange,
          gender,
          goalWeightKg,
        })
      : null;

  const goalLeanMassKg =
    goalWeightKg !== null && goalBodyFatPct !== null
      ? leanMass(goalWeightKg, goalBodyFatPct)
      : null;

  return {
    bmr,
    bodyFatIsEstimated,
    bodyFatPct,
    dailyCalories,
    dailyCaloriesBelowBmr: bmr !== null && dailyCalories !== null && dailyCalories < bmr,
    fatMassKg,
    goalBodyFatPct,
    goalLeanMassKg,
    leanMassKg,
    tdee,
  };
};

export const useProjection = (): ProjectionResult => {
  const { control } = useFormContext<ProjectionFormValues>();
  const values = useWatch({ control });
  return useMemo(() => deriveProjection(values), [values]);
};
