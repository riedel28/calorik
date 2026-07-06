export type Gender = 'male' | 'female';
export type ActivityLevel = 'none' | 'low' | 'moderate' | 'active' | 'veryActive' | 'custom';

export const ACTIVITY_MULTIPLIERS: Record<Exclude<ActivityLevel, 'custom'>, number> = {
  active: 1.725,
  low: 1.375,
  moderate: 1.55,
  none: 1.2,
  veryActive: 1.9,
};

const KCAL_PER_KG = 7700;

const ESSENTIAL_BODY_FAT_PCT: Record<Gender, number> = {
  female: 12,
  male: 3,
};

export const LIMITS = {
  age: { max: 120, min: 10 },
  bodyFat: { max: 60, min: 3 },
  customMultiplier: { max: 2.5, min: 1 },
  daysUntilGoal: { max: 3650, min: 1 },
  goalWeight: { max: 300, min: 30 },
  height: { max: 250, min: 100 },
  weight: { max: 300, min: 30 },
} as const;

export interface BodyMetrics {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
}

export const mifflinStJeorBMR = ({ age, gender, heightCm, weightKg }: BodyMetrics): number => {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === 'male' ? base + 5 : base - 161;
};

export const katchMcArdleBMR = (leanMassKg: number): number => 370 + 21.6 * leanMassKg;

export const deurenbergBodyFat = ({ age, gender, heightCm, weightKg }: BodyMetrics): number => {
  const bmi = weightKg / (heightCm / 100) ** 2;
  return 1.2 * bmi + 0.23 * age - 10.8 * (gender === 'male' ? 1 : 0) - 5.4;
};

export const leanMass = (weightKg: number, bodyFatPct: number): number =>
  weightKg * (1 - bodyFatPct / 100);

export const fatMass = (weightKg: number, bodyFatPct: number): number =>
  weightKg * (bodyFatPct / 100);

export const tdee = (bmr: number, multiplier: number): number => bmr * multiplier;

export const requiredDailyCalories = ({
  currentWeightKg,
  days,
  goalWeightKg,
  tdee: totalExpenditure,
}: {
  currentWeightKg: number;
  days: number;
  goalWeightKg: number;
  tdee: number;
}): number | null => {
  if (days <= 0) {
    return null;
  }
  return totalExpenditure - ((currentWeightKg - goalWeightKg) * KCAL_PER_KG) / days;
};

export const projectedBodyFatAtGoal = ({
  currentBodyFatPct,
  currentWeightKg,
  gender,
  goalWeightKg,
}: {
  currentBodyFatPct: number;
  currentWeightKg: number;
  gender: Gender;
  goalWeightKg: number;
}): number => {
  const leanMassKg = leanMass(currentWeightKg, currentBodyFatPct);
  const raw = ((goalWeightKg - leanMassKg) / goalWeightKg) * 100;
  return Math.min(Math.max(raw, ESSENTIAL_BODY_FAT_PCT[gender]), LIMITS.bodyFat.max);
};
