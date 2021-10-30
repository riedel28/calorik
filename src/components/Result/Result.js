import React, { useEffect } from 'react';
import { Flex, Text } from 'rebass';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';

import Container from 'components/shared/Container';
import { calculateCalories } from 'helpers';

const Result = ({ data }) => {
  const resultCalories = calculateCalories(data);
  const { t } = useTranslation();

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

  return (
    resultCalories > 0 && (
      <Container>
        <Flex py={4} justifyContent="center">
          <Text as="h1" fontSize={[4, 4, 5]} sx={{ textAlign: 'center' }}>
            {t('You will need')}{' '}
            <animated.span>
              {animation.value.interpolate((val) => Math.floor(val))}
            </animated.span>{' '}
            {t('kcal to')} {t(data.goal)}
          </Text>
        </Flex>
      </Container>
    )
  );
};

Result.propTypes = {
  data: PropTypes.shape({
    age: PropTypes.string,
    gender: PropTypes.oneOf(['male', 'female']),
    weight: PropTypes.string,
    height: PropTypes.string,
    formula: PropTypes.oneOf(['harris-benedict', 'mifflin-st-jeor']),
    activityLevel: PropTypes.oneOf([
      'no-exercise',
      'light',
      'moderate',
      'heavy',
      'very-heavy',
    ]),
    goal: PropTypes.oneOf(['cut', 'maintain', 'gain']),
  }),
};

export default Result;
