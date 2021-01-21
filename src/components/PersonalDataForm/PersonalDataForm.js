import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Text } from "rebass";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import Container from "../shared/Container";
import Column from "../shared/Column";
import Heading from "../shared/Heading";
import InputWithLabel from "./InputWithLabel";
import RadioWithLabel from "./RadioWithLabel";
import Button from "../shared/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import validationSchema from "../../validationSchema";

const PersonalDataForm = ({ onSubmitData }) => {
  const { t } = useTranslation();
  const [persistentData, setPersistentData] = useLocalStorage("calorikData");

  const formik = useFormik({
    initialValues: { ...persistentData },
    validationSchema,
    onSubmit: (values) => {
      onSubmitData(values);
    },
  });

  useEffect(() => {
    setPersistentData(formik.values);
  }, [formik.values, setPersistentData]);

  const coreData = [
    { id: "age", description: "Age" },
    { id: "height", description: "Height" },
    { id: "weight", description: "Weight" },
  ];

  const activityLevelData = [
    { id: "no-exercise", description: "Little / No exercise" },
    { id: "light", description: "Light exercise (1–3 days per week)" },
    { id: "moderate", description: "Moderate exercise (3–5 days per week)" },
    { id: "heavy", description: "Heavy exercise (6–7 days per week)" },
    {
      id: "very-heavy",
      description: "Very heavy exercise (twice per day, extra heavy workouts)",
    },
  ];

  const goalData = [
    { id: "cut", description: "Cut (-20%)" },
    { id: "maintain", description: "Maintain" },
    { id: "gain", description: "Gain (+15%)" },
  ];

  const formulaeData = [
    {
      id: "harris-benedict",
      description: "The Original Harris-Benedict Equation",
    },
    { id: "mifflin-st-jeor", description: "The Mifflin St. Jeor Equation" },
  ];

  return (
    <Container>
      <Flex as="form" onSubmit={formik.handleSubmit} data-testid="form">
        <Column width={[1, 1, 1 / 5]}>
          <Heading>{t("Your data")}</Heading>
          <Box width={3 / 4} mb={3}>
            <Text fontWeight="bold" mb={2}>
              {t("Gender")}:
            </Text>
            <RadioWithLabel
              id="male"
              name="gender"
              value="male"
              checked={formik.values.gender === "male"}
              onChange={formik.handleChange}
            >
              {t("Male")}
            </RadioWithLabel>

            <RadioWithLabel
              id="female"
              name="gender"
              value="female"
              checked={formik.values.gender === "female"}
              onChange={formik.handleChange}
            >
              {t("Female")}
            </RadioWithLabel>
          </Box>
          <Box width={3 / 4} mb={3}>
            {coreData.map(({ id, description }) => (
              <InputWithLabel
                id={id}
                label={`${t(description)}:`}
                value={formik.values[id]}
                onChange={formik.handleChange}
              >
                {formik.touched[id] && formik.errors[id] ? (
                  <Text
                    sx={{
                      color: "deeppink",
                      fontWeight: "bold",
                    }}
                    py={1}
                  >
                    {t(formik.errors[id])}
                  </Text>
                ) : null}
              </InputWithLabel>
            ))}
          </Box>
        </Column>

        <Column width={[1, 1 / 3]}>
          <Heading>{t("Activity Level")}</Heading>
          <Box mb={3}>
            {activityLevelData.map(({ id, description }) => (
              <RadioWithLabel
                id={id}
                name="activityLevel"
                value={id}
                checked={formik.values.activityLevel === id}
                onChange={formik.handleChange}
              >
                {t(description)}
              </RadioWithLabel>
            ))}
          </Box>
        </Column>

        <Column width={[1, 1 / 5]}>
          <Heading>{t("Your goal")}</Heading>
          {goalData.map(({ id, description }) => (
            <RadioWithLabel
              id={id}
              name="goal"
              value={id}
              checked={formik.values.goal === id}
              onChange={formik.handleChange}
            >
              {t(description)}
            </RadioWithLabel>
          ))}
        </Column>

        <Column width={[1, 1 / 4]}>
          <Heading>{t("Formula")}</Heading>
          {formulaeData.map(({ id, description }) => (
            <RadioWithLabel
              id={id}
              name="formula"
              value={id}
              checked={formik.values.formula === id}
              onChange={formik.handleChange}
            >
              {t(description)}
            </RadioWithLabel>
          ))}
        </Column>
      </Flex>

      <Flex justifyContent="center">
        <Button onClick={formik.handleSubmit}>{t("Calculate")}</Button>
      </Flex>
    </Container>
  );
};

PersonalDataForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};

export default PersonalDataForm;
