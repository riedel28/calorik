import { calculateCalories, harrisBenedictBMR, mifflinStJeorBMR } from './helpers';
import type { UserData } from './helpers';

describe('Helpers', () => {
  const data1: UserData = {
    age: 30,
    gender: 'male',
    weight: 90,
    height: 180,
    formula: 'harris-benedict',
    activityLevel: 'no-exercise',
    goal: 'cut',
  } satisfies UserData;

  const data2 = {
    age: 38,
    gender: 'female',
    weight: 67,
    height: 166,
    formula: 'mifflin-st-jeor',
    activityLevel: 'light',
    goal: 'cut',
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
