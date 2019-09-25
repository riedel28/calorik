// The Original Harris-Benedict Equation
// Men BMR = 66.4730 + (13.7516 x weight in kg) + (5.0033 x height in cm) – (6.7550 x age in years)
// Women BMR = 655.0955 + (9.5634 x weight in kg) + (1.8496 x height in cm) – (4.6756 x age in years)

export const calculateCalories = data => {
  const { activityLevel } = data;

  const activityLevels = {
    '0': 1.2,
    '3': 1.375,
    '4': 1.55,
    '5': 1.725
  };

  return Math.round(calculateBMR(data) * activityLevels[activityLevel]);
};

export const calculateBMR = data => {
  const { age, gender, weight, height } = data;

  const forMale = Math.round(
    66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age
  );
  const forFemale = Math.round(
    655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age
  );

  return gender === 'male' ? forMale : forFemale;
};
