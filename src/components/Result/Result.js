import React, { useEffect } from "react";
import { Flex, Text } from "rebass";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { useTranslation } from "react-i18next";

import { calculateCalories } from "../../helpers";

const Result = ({ data }) => {
  const resultCalories = calculateCalories(data);
  const { t } = useTranslation();

  const animation = useSpring({
    from: { value: 0 },
    to: { value: isNaN(resultCalories) ? 0 : resultCalories },
  });

  useEffect(() => {
    const title = "Calorik";

    if (!resultCalories) {
      document.title = title;
    } else {
      document.title = `${title} | ${resultCalories}`;
    }
  }, [resultCalories]);

  return (
    resultCalories > 0 && (
      <Flex py={4} justifyContent="center">
        <Text as="h1">
          {t("You will need")}{" "}
          <animated.span>
            {animation.value.interpolate((val) => Math.floor(val))}
          </animated.span>{" "}
          {t("kcal to")} {t(data.goal)}
        </Text>
      </Flex>
    )
  );
};

Result.propTypes = {
  data: PropTypes.shape({
    age: PropTypes.number,
    gender: PropTypes.oneOf(["male", "female"]),
    weight: PropTypes.number,
    height: PropTypes.number,
    formula: PropTypes.oneOf(["harris-benedict", "mifflin-st-jeor"]),
    activityLevel: PropTypes.oneOf([
      "no-exercise",
      "light",
      "moderate",
      "heavy",
      "very-heavy",
    ]),
    goal: PropTypes.oneOf(["cut", "maintain", "gain"]),
  }),
};

export default Result;
