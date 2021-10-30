import React, { useEffect } from 'react';
import { Flex, Text } from 'rebass';
import { useSpring, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';

import Container from 'components/shared/Container';
import { calculateCalories } from 'helpers';
import { useUserData } from 'context/UserDataContext';

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
      <Container>
        <Flex py={4} justifyContent="center">
          <Text as="h1" fontSize={[4, 4, 5]} sx={{ textAlign: 'center' }}>
            {t('You will need')}{' '}
            <animated.span>
              {animation.value.interpolate((val) => Math.floor(val))}
            </animated.span>{' '}
            {t('kcal to')} {t(userData.goal)}
          </Text>
        </Flex>
      </Container>
    )
  );
};

export default Result;
