import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Text, Button } from "rebass";
import { Label, Input, Radio } from "@rebass/forms";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

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

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Flex as="form" onSubmit={formik.handleSubmit} data-testid="form">
        <Box width={1 / 5}>
          <Text fontSize={[2, 3, 4]} fontWeight="bold" color="primary" mb={3}>
            {t("Your data")}
          </Text>
          <Box width={3 / 4} mb={3}>
            <Label htmlFor="age" fontWeight="bold" mb="1">
              {t("Age")}:
            </Label>
            <Input
              id="age"
              name="age"
              label="Age:"
              type="number"
              pattern="[0-9]*"
              value={formik.values.age}
              onChange={formik.handleChange}
              data-testid="age"
            />
            {formik.touched.age && formik.errors.age ? (
              <Text color="red" py={1}>
                {formik.errors.age}
              </Text>
            ) : null}
          </Box>
          <Box width={3 / 4} mb={3}>
            <Text fontWeight="bold" mb={2}>
              Gender:{" "}
            </Text>
            <Label>
              <Radio
                id="male"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
              />
              {t("Male")}
            </Label>
            <Label>
              <Radio
                id="female"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
              />
              {t("Female")}
            </Label>
          </Box>

          <Box width={3 / 4} mb={3}>
            <Label htmlFor="weight" fontWeight="bold" mb="1">
              {t("Weight")}:
            </Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              pattern="[0-9]*"
              value={formik.values.weight}
              onChange={formik.handleChange}
              data-testid="weight"
            />
            {formik.touched.weight && formik.errors.weight ? (
              <Text color="red" py={1}>
                {formik.errors.weight}
              </Text>
            ) : null}
          </Box>

          <Box width={3 / 4} mb={3}>
            <Label htmlFor="weight" fontWeight="bold" mb="1">
              {t("Height")}:
            </Label>
            <Input
              id="height"
              name="height"
              type="number"
              pattern="[0-9]*"
              value={formik.values.height}
              onChange={formik.handleChange}
              data-testid="height"
            />
            {formik.touched.height && formik.errors.height ? (
              <Text color="red" py={1}>
                {formik.errors.height}
              </Text>
            ) : null}
          </Box>
        </Box>
        <Box width={1 / 3}>
          <Text fontSize={[2, 3, 4]} fontWeight="bold" color="primary" mb={3}>
            {t("Activity Level")}
          </Text>
          <Box mb={3}>
            <Label htmlFor="no-exercise" mb={3}>
              <Radio
                id="no-exercise"
                name="activityLevel"
                value="no-exercise"
                checked={formik.values.activityLevel === "no-exercise"}
                onChange={formik.handleChange}
              />
              {t("Little / No exercise")}
            </Label>
            <Label htmlFor="light" mb={3}>
              <Radio
                id="light"
                name="activityLevel"
                value="light"
                checked={formik.values.activityLevel === "light"}
                onChange={formik.handleChange}
              />
              {t("Light exercise (1–3 days per week)")}
            </Label>
            <Label htmlFor="moderate" mb={3}>
              <Radio
                id="moderate"
                name="activityLevel"
                value="moderate"
                checked={formik.values.activityLevel === "moderate"}
                onChange={formik.handleChange}
              />
              {t("Moderate exercise (3–5 days per week)")}
            </Label>

            <Label htmlFor="heavy" mb={3}>
              <Radio
                id="heavy"
                name="activityLevel"
                value="heavy"
                checked={formik.values.activityLevel === "heavy"}
                onChange={formik.handleChange}
              />
              {t("Heavy exercise (6–7 days per week)")}
            </Label>

            <Label htmlFor="very-heavy" mb={3}>
              <Radio
                id="very-heavy"
                name="activityLevel"
                value="very-heavy"
                checked={formik.values.activityLevel === "very-heavy"}
                onChange={formik.handleChange}
              />
              {t("Very heavy exercise (twice per day, extra heavy workouts)")}
            </Label>
          </Box>
        </Box>
        <Box width={1 / 5}>
          <Text fontSize={[2, 3, 4]} fontWeight="bold" color="primary" mb={3}>
            {t("Your goal")}
          </Text>

          <Label htmlFor="cut" mb={3}>
            <Radio
              id="cut"
              name="goal"
              label={t("Cut (-20%)")}
              value="cut"
              checked={formik.values.goal === "cut"}
              onChange={formik.handleChange}
            />
            {t("Cut (-20%)")}
          </Label>

          <Label htmlFor="maintain" mb={3}>
            <Radio
              id="maintain"
              name="goal"
              value="maintain"
              checked={formik.values.goal === "maintain"}
              onChange={formik.handleChange}
            />
            {t("Maintain")}
          </Label>

          <Label htmlFor="gain" mb={3}>
            <Radio
              id="gain"
              control={Radio}
              name="goal"
              value="gain"
              checked={formik.values.goal === "gain"}
              onChange={formik.handleChange}
            />
            {t("Gain (+15%)")}
          </Label>
        </Box>
        <Box width={1 / 4}>
          <Text fontSize={[2, 3, 4]} fontWeight="bold" color="primary" mb={3}>
            {t("Formula")}
          </Text>

          <Label htmlFor="harris-benedict" mb={3}>
            <Radio
              id="harris-benedict"
              name="formula"
              label={t("The Original Harris-Benedict Equation")}
              value="harris-benedict"
              checked={formik.values.formula === "harris-benedict"}
              onChange={formik.handleChange}
            />
            {t("The Original Harris-Benedict Equation")}
          </Label>

          <Label htmlFor="mifflin-st-jeor" mb={3}>
            <Radio
              id="mifflin-st-jeor"
              name="formula"
              value="mifflin-st-jeor"
              checked={formik.values.formula === "mifflin-st-jeor"}
              onChange={formik.handleChange}
            />
            {t("The Mifflin St. Jeor Equation")}
          </Label>
        </Box>
      </Flex>

      <Flex justifyContent="center">
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          size="huge"
          variant="outline"
          bg="primary"
          px={5}
          py={3}
          sx={{
            letterSpacing: 2,
          }}
          data-testid="submit-button"
        >
          <Text fontSize={4}>{t("Calculate")}</Text>
        </Button>
      </Flex>
    </Box>
  );
};

PersonalDataForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};

export default PersonalDataForm;
