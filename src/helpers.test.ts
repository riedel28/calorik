import type { UserData } from './helpers';
import { calculateCalories, harrisBenedictBMR, mifflinStJeorBMR } from './helpers';

describe('Helpers', () => {
  const data1: UserData = {
    activityLevel: 'no-exercise',
    age: 30,
    formula: 'harris-benedict',
    gender: 'male',
    goal: 'cut',
    height: 180,
    weight: 90,
  } satisfies UserData;

  const data2 = {
    activityLevel: 'light',
    age: 38,
    formula: 'mifflin-st-jeor',
    gender: 'female',
    goal: 'cut',
    height: 166,
    weight: 67,
  } satisfies UserData;
  test('should calculate calories correctly', () => {
    expect(calculateCalories(data1)).toEqual(1922);
    expect(calculateCalories(data2)).toEqual(1493);
  });

  test('should calculate BMR correctly', () => {
    expect(harrisBenedictBMR(data1)).toEqual(2002);
    expect(harrisBenedictBMR(data2)).toEqual(1425);

    expect(mifflinStJeorBMR(data1)).toEqual(1880);
    expect(mifflinStJeorBMR(data2)).toEqual(1357);
  });
});
