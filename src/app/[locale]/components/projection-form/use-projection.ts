'use client';

import { startOfToday } from 'date-fns';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  ACTIVITY_MULTIPLIERS,
  tdee as calculateTdee,
  deurenbergBodyFat,
  fatMass,
  GOAL_QUALITY_PARTITION,
  type GoalStatus,
  goalStatus,
  harrisBenedictBMR,
  katchMcArdleBMR,
  LIMITS,
  leanMass,
  mifflinStJeorBMR,
  projectedBodyFatAtGoal,
  requiredDailyCalories,
} from '@/lib/calculations';

import { daysUntilGoal } from './goal-timeline';
import type { ProjectionFormValues } from './schema';

/** Defined together: a weight plus a measured or estimated body fat %. */
interface BodyComposition {
  bodyFatPct: number;
  fatMassKg: number;
  isEstimated: boolean;
  leanMassKg: number;
  weightKg: number;
}

/** Defined only when TDEE, body composition, goal weight and goal date are all known. */
export interface GoalProjection {
  bmr: number;
  bodyFatChangePct: number;
  bodyFatIsEstimated: boolean;
  bodyFatPct: number;
  /** Required intake minus maintenance (negative = deficit). */
  caloriesVsTdee: number;
  currentWeightKg: number;
  dailyCalories: number;
  days: number;
  goalWeightKg: number;
  leanMassChangeKg: number;
  leanMassKg: number;
  status: GoalStatus;
  weeklyChangeKg: number;
  /** Absolute weekly change as % of current body weight. */
  weeklyChangePct: number;
}

export interface ProjectionResult {
  bmr: number | null;
  body: BodyComposition | null;
  goal: GoalProjection | null;
  tdee: number | null;
}

const DAYS_PER_WEEK = 7;

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

const deriveGoal = ({
  bmr,
  body,
  days,
  goalWeightKg,
  quality,
  gender,
  tdee,
}: {
  bmr: number;
  body: BodyComposition;
  days: number;
  gender: ProjectionFormValues['gender'];
  goalWeightKg: number;
  quality: ProjectionFormValues['goalQuality'];
  tdee: number;
}): GoalProjection | null => {
  const { weightKg } = body;
  const dailyCalories = requiredDailyCalories({
    currentWeightKg: weightKg,
    days,
    goalWeightKg,
    tdee,
  });
  if (dailyCalories === null) {
    return null;
  }

  const partition = GOAL_QUALITY_PARTITION[quality];
  const bodyFatPct = projectedBodyFatAtGoal({
    currentBodyFatPct: body.bodyFatPct,
    currentWeightKg: weightKg,
    fatShareOfChange: goalWeightKg < weightKg ? partition.lossFatShare : partition.gainFatShare,
    gender,
    goalWeightKg,
  });
  const leanMassKg = leanMass(goalWeightKg, bodyFatPct);
  const weeklyChangeKg = ((goalWeightKg - weightKg) / days) * DAYS_PER_WEEK;
  const weeklyChangePct = (Math.abs(weeklyChangeKg) / weightKg) * 100;

  return {
    bmr,
    bodyFatChangePct: bodyFatPct - body.bodyFatPct,
    bodyFatIsEstimated: body.isEstimated,
    bodyFatPct,
    caloriesVsTdee: dailyCalories - tdee,
    currentWeightKg: weightKg,
    dailyCalories,
    days,
    goalWeightKg,
    leanMassChangeKg: leanMassKg - body.leanMassKg,
    leanMassKg,
    status: goalStatus({
      bmr,
      currentWeightKg: weightKg,
      dailyCalories,
      goalWeightKg,
      weeklyChangePct,
    }),
    weeklyChangeKg,
    weeklyChangePct,
  };
};

export const deriveProjection = (
  values: Partial<ProjectionFormValues>,
  today: Date = startOfToday(),
): ProjectionResult => {
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
  const body: BodyComposition | null =
    weightKg !== null && bodyFatPct !== null
      ? {
          bodyFatPct,
          fatMassKg: fatMass(weightKg, bodyFatPct),
          isEstimated: measuredBodyFat === null,
          leanMassKg: leanMass(weightKg, bodyFatPct),
          weightKg,
        }
      : null;

  let bmr: number | null = null;
  if (values.formula === 'katch-mcardle') {
    bmr = body ? katchMcArdleBMR(body.leanMassKg) : null;
  } else if (values.formula === 'mifflin-st-jeor') {
    bmr = metrics ? mifflinStJeorBMR(metrics) : null;
  } else if (values.formula === 'harris-benedict') {
    bmr = metrics ? harrisBenedictBMR(metrics) : null;
  }

  const activityMultiplier = resolveActivityMultiplier(values);
  const tdee =
    bmr !== null && activityMultiplier !== null ? calculateTdee(bmr, activityMultiplier) : null;

  const goalWeightKg = toNum(values.goalWeight, LIMITS.goalWeight);
  const days = values.goalDate ? daysUntilGoal(values.goalDate, today) : null;

  const goal =
    bmr !== null &&
    tdee !== null &&
    body !== null &&
    gender !== null &&
    goalWeightKg !== null &&
    days !== null &&
    values.goalQuality
      ? deriveGoal({ bmr, body, days, gender, goalWeightKg, quality: values.goalQuality, tdee })
      : null;

  return { bmr, body, goal, tdee };
};

export const useProjection = (): ProjectionResult => {
  const { control } = useFormContext<ProjectionFormValues>();
  const values = useWatch({ control });
  return useMemo(() => deriveProjection(values), [values]);
};
