export const calculateCalories = (data) => {
  const { activityLevel, formula, goal } = data;

  const activityFactors = {
    "no-exercise": 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    "very-heavy": 1.9,
  };

  const goalFactors = {
    cut: 0.8,
    maintain: 1,
    gain: 1.15,
  };

  const calories =
    formula === "harris-benedict"
      ? Math.round(harrisBenedictBMR(data) * activityFactors[activityLevel])
      : Math.round(mifflinStJeorBMR(data) * activityFactors[activityLevel]);

  return Math.round(calories * goalFactors[goal]);
};

// The Original Harris-Benedict Equation
// Men BMR = 66.4730 + (13.7516 x weight in kg) + (5.0033 x height in cm) – (6.7550 x age in years)
// Women BMR = 655.0955 + (9.5634 x weight in kg) + (1.8496 x height in cm) – (4.6756 x age in years)
export const harrisBenedictBMR = (data) => {
  const { age, gender, weight, height } = data;

  const forMale = Math.round(
    66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age
  );
  const forFemale = Math.round(
    655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age
  );

  return gender === "male" ? forMale : forFemale;
};

// The Mifflin St Jeor Equation
// Men BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) + 5 (measured in Kcal/day)
// Women BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) - 161 (measured in Kcal/day)
export const mifflinStJeorBMR = (data) => {
  const { age, gender, weight, height } = data;

  const forMale = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  const forFemale = Math.round(10 * weight + 6.25 * height - 5 * age - 161);

  return gender === "male" ? forMale : forFemale;
};
