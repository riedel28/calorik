'use client';

import { useState, useEffect } from 'react';

const initialState = {
  age: '30',
  gender: 'male',
  height: '180',
  weight: '80',
  activityLevel: 'no-exercise',
  goal: 'cut',
  formula: 'harris-benedict',
};

const useLocalStorage = (key, initialValue = initialState) => {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
