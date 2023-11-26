import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import { Title } from '@mantine/core';

import { useUserData } from '../../context/UserDataContext';
import { calculateCalories } from '../../helpers';

const Result = () => {
  const { t } = useTranslation();

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
      <footer>
        <Title order={1} align="center" p={0} m={0}>
          <animated.span>
            {animation.value.interpolate((val) =>
              t('result', {
                calories: Math.floor(val),
                goal: t(`goal.${userData.goal}.short`),
              }),
            )}
          </animated.span>
        </Title>
      </footer>
    )
  );
};

export default Result;
