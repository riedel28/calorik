'use client';

import { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import { useUserData } from '@/context/user-data-context';
import { calculateCalories } from '@/helpers';

const Result = () => {
  const { userData } = useUserData();
  const resultCalories = calculateCalories(userData);

  const animation = useSpring({
    from: { value: 0 },
    to: { value: Number.isNaN(resultCalories) ? 0 : resultCalories },
  });

  useEffect(() => {
    const title = 'Calorik';

    if (!resultCalories) {
      document.title = title;
    } else {
      document.title = `${title} | ${resultCalories}`;
    }
  }, [resultCalories]);

  useEffect(() => {
    if (!resultCalories) return;

    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [resultCalories]);

  if (!resultCalories || Number.isNaN(resultCalories)) {
    return null;
  }

  return (
    <section className="pt-24">
      <h1 className="text-center text-5xl font-bold tracking-tight">
        <animated.span className="text-primary">
          {animation.value.to(() => Math.floor(resultCalories))}
        </animated.span>{' '}
        kcal
      </h1>
    </section>
  );
};

export default Result;
