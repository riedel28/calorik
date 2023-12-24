'use client';

import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { Title } from '@mantine/core';

import { useUserData } from '../../context/UserDataContext';
import { calculateCalories } from '../../helpers';

const Result = ({ dict }) => {
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
      <Title order={1} align="center" pt="lg" m={0}>
        <animated.span>
          {animation.value.to((val) => Math.floor(resultCalories))}
        </animated.span>{' '}
        {dict.result}
      </Title>
    )
  );
};

export default Result;
