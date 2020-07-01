import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

import { calculateCalories } from "./../helpers";

const Result = ({ data }) => {
  const resultCalories = calculateCalories(data);

  const animation = useSpring({
    from: { value: 0 },
    to: { value: isNaN(resultCalories) ? 0 : resultCalories },
  });

  useEffect(() => {
    const title = "Calorik";

    if (!resultCalories) {
      document.title = title;
    } else {
      document.title = `${title} | ${resultCalories} kcal`;
    }
  }, [resultCalories]);

  return (
    resultCalories > 0 && (
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <Header as="h1">
          You will need{" "}
          <animated.span>
            {animation.value.interpolate((val) => Math.floor(val))}
          </animated.span>{" "}
          kcal to {data.goal}
        </Header>
      </div>
    )
  );
};

Result.propTypes = {
  data: PropTypes.shape({
    age: PropTypes.string,
    gender: PropTypes.oneOf(["male", "female"]),
    weight: PropTypes.string,
    height: PropTypes.string,
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
