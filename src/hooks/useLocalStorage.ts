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

interface UseLocalStorageProps {
  key: string;
  initialValue?: typeof initialState;
}

const useLocalStorage = ({
  key,
  initialValue = initialState,
}: UseLocalStorageProps) => {
  const [value, setValue] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key) || '') || initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
