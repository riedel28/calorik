import { startOfToday } from 'date-fns';
import type { MessageKeys, Messages, NestedKeyOf } from 'next-intl';
import { z } from 'zod';

import { ACTIVITY_LEVELS, BMR_FORMULAS, GENDERS, GOAL_QUALITIES, LIMITS } from '@/lib/calculations';

import { daysUntilGoal } from './goal-timeline';

/** Any leaf key of the message catalog, usable with a root `useTranslations()`. */
export type TranslationKey = MessageKeys<Messages, NestedKeyOf<Messages>>;

const numericString = (
  { max, min }: { max: number; min: number },
  message: TranslationKey,
  { integer = false } = {},
) =>
  z.string().refine((value) => {
    if (value === '') {
      return true;
    }
    const parsed = Number(value);
    return (
      Number.isFinite(parsed) &&
      (!integer || Number.isInteger(parsed)) &&
      parsed >= min &&
      parsed <= max
    );
  }, message);

export const projectionFormSchema = z.object({
  activityLevel: z.enum(ACTIVITY_LEVELS),
  age: numericString(LIMITS.age, 'yourData.age.error', { integer: true }),
  bodyFat: numericString(LIMITS.bodyFat, 'yourData.bodyFat.error'),
  customMultiplier: numericString(LIMITS.customMultiplier, 'activity.customMultiplier.error'),
  formula: z.enum(BMR_FORMULAS),
  gender: z.enum(GENDERS),
  goalDate: z
    .string()
    .refine(
      (value) => value === '' || daysUntilGoal(value, startOfToday()) !== null,
      'goal.goalDate.error' satisfies TranslationKey,
    ),
  goalQuality: z.enum(GOAL_QUALITIES),
  goalWeight: numericString(LIMITS.goalWeight, 'goal.goalWeight.error'),
  height: numericString(LIMITS.height, 'yourData.height.error'),
  weight: numericString(LIMITS.weight, 'yourData.weight.error'),
});

export type ProjectionFormValues = z.infer<typeof projectionFormSchema>;

/** Zod carries messages as plain strings; every message in this schema is a translation key. */
export const errorMessageKey = (error?: { message?: string }): TranslationKey | undefined =>
  error?.message as TranslationKey | undefined;
