import { startOfToday } from 'date-fns';
import { z } from 'zod';

import { daysUntilGoal } from './goal-timeline';
import { type ProjectionFormValues, projectionFormSchema } from './schema';

export const FORM_STORAGE_KEY = 'calorik.projectionForm.v1';

// Validates the stored shape only (types and enum membership, reused from the
// form schema). Range checks are deliberately skipped: a half-typed value at
// save time must not invalidate the whole snapshot — the form re-validates
// after restore anyway. Unknown keys (e.g. the old `daysUntilGoal`) are stripped.
const storedValuesSchema = z.object({
  activityLevel: projectionFormSchema.shape.activityLevel,
  age: z.string(),
  bodyFat: z.string(),
  customMultiplier: z.string(),
  formula: projectionFormSchema.shape.formula,
  gender: projectionFormSchema.shape.gender,
  goalDate: z.string(),
  goalQuality: projectionFormSchema.shape.goalQuality,
  goalWeight: z.string(),
  height: z.string(),
  weight: z.string(),
});

/** A goal date that is no longer in the allowed future range restores as empty, not as an error. */
export const dropExpiredGoalDate = (
  values: ProjectionFormValues,
  today: Date,
): ProjectionFormValues =>
  values.goalDate === '' || daysUntilGoal(values.goalDate, today) !== null
    ? values
    : { ...values, goalDate: '' };

export const loadStoredFormValues = (): ProjectionFormValues | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const raw = window.localStorage.getItem(FORM_STORAGE_KEY);
  if (raw === null) {
    return null;
  }
  try {
    const result = storedValuesSchema.safeParse(JSON.parse(raw));
    return result.success ? dropExpiredGoalDate(result.data, startOfToday()) : null;
  } catch {
    return null;
  }
};

export const saveFormValues = (values: ProjectionFormValues): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(values));
  } catch {
    // Storage can be full or blocked (e.g. private mode) — persisting is
    // best-effort and must never break the form.
  }
};
