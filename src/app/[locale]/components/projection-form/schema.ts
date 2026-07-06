import { addDays, isBefore, parseISO, startOfToday } from 'date-fns';
import { z } from 'zod';

import { LIMITS } from '@/lib/calculations';

const numericString = (
  { max, min }: { max: number; min: number },
  message: string,
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
  activityLevel: z.enum(['none', 'low', 'moderate', 'active', 'veryActive', 'custom']),
  age: numericString(LIMITS.age, 'yourData.age.error', { integer: true }),
  bodyFat: numericString(LIMITS.bodyFat, 'yourData.bodyFat.error'),
  customMultiplier: numericString(LIMITS.customMultiplier, 'activity.customMultiplier.error'),
  daysUntilGoal: numericString(LIMITS.daysUntilGoal, 'goal.daysUntilGoal.error', {
    integer: true,
  }),
  formula: z.enum(['katch-mcardle', 'mifflin-st-jeor']),
  gender: z.enum(['male', 'female']),
  goalDate: z
    .string()
    .refine(
      (value) => value === '' || !isBefore(parseISO(value), addDays(startOfToday(), 1)),
      'goal.goalDate.error',
    ),
  goalWeight: numericString(LIMITS.goalWeight, 'goal.goalWeight.error'),
  height: numericString(LIMITS.height, 'yourData.height.error'),
  weight: numericString(LIMITS.weight, 'yourData.weight.error'),
});

export type ProjectionFormValues = z.infer<typeof projectionFormSchema>;
