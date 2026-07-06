type ActivityLevel = 'no-exercise' | 'light' | 'moderate' | 'heavy' | 'very-heavy';
type Formula = 'harris-benedict' | 'mifflin-st-jeor';
type Goal = 'cut' | 'maintain' | 'gain';

export interface UserData {
  activityLevel: ActivityLevel;
  age: number;
  formula: Formula;
  gender: 'male' | 'female';
  goal: Goal;
  height: number;
  weight: number;
}

const activityFactors = {
  heavy: 1.725,
  light: 1.375,
  moderate: 1.55,
  'no-exercise': 1.2,
  'very-heavy': 1.9,
} as const;

const goalFactors = {
  cut: 0.8,
  gain: 1.15,
  maintain: 1,
} as const;

export const calculateCalories = (data: UserData | null) => {
  if (!data) {
    return 0;
  }

  const { activityLevel, formula, goal } = data;

  const bmr = functionsByFormula[formula](data);
  const calories = Math.round(bmr * activityFactors[activityLevel]);

  return Math.round(calories * goalFactors[goal]);
};

const functionsByFormula = {
  'harris-benedict': harrisBenedictBMR,
  'mifflin-st-jeor': mifflinStJeorBMR,
};

// The Original Harris-Benedict Equation
// Men BMR = 66.4730 + (13.7516 x weight in kg) + (5.0033 x height in cm) – (6.7550 x age in years)
// Women BMR = 655.0955 + (9.5634 x weight in kg) + (1.8496 x height in cm) – (4.6756 x age in years)
export function harrisBenedictBMR(data: UserData) {
  const { age, gender, weight, height } = data;

  return harrisBenedictFormulasByGender[gender]({ age, height, weight });
}

const harrisBenedictFormulasByGender = {
  female: calculateHarriesBenedictForFemales,
  male: calculateHarriesBenedictForMales,
};

function calculateHarriesBenedictForMales({
  age,
  weight,
  height,
}: Pick<UserData, 'age' | 'weight' | 'height'>) {
  return Math.round(66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age);
}

function calculateHarriesBenedictForFemales({
  age,
  weight,
  height,
}: Pick<UserData, 'age' | 'weight' | 'height'>) {
  return Math.round(655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age);
}

// The Mifflin St Jeor Equation
// Men BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) + 5 (measured in Kcal/day)
// Women BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) - 161 (measured in Kcal/day)
export function mifflinStJeorBMR(data: UserData) {
  const { age, gender, weight, height } = data;

  return mifflinStJeorFormulasByGender[gender]({ age, height, weight });
}

const mifflinStJeorFormulasByGender = {
  female: calculateMifflinStJeorForFemales,
  male: calculateMifflinStJeorForMales,
};

function calculateMifflinStJeorForMales({
  age,
  weight,
  height,
}: Pick<UserData, 'age' | 'weight' | 'height'>) {
  return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
}

function calculateMifflinStJeorForFemales({
  age,
  weight,
  height,
}: Pick<UserData, 'age' | 'weight' | 'height'>) {
  return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
}
