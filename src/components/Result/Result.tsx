'use client';

import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Title } from '@mantine/core';

import { useUserData } from '@/context/UserDataContext';
import { calculateCalories } from '@/helpers';

const Result = ({ dict }: { dict: any }) => {
  const { userData } = useUserData();
  const resultCalories = calculateCalories(userData);

  const animation = useSpring({
    from: { value: 0 },
    to: { value: isNaN(resultCalories) ? 0 : resultCalories },
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
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [userData]);

  return (
    resultCalories > 0 && (
      <Title order={1} pt={100} m={0} ta="center">
        <animated.span>
          {animation.value.to(() => Math.floor(resultCalories))}
        </animated.span>{' '}
        {dict.result}
      </Title>
    )
  );
};

export default Result;
