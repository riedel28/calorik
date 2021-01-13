import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Grid,
  Header,
  Radio,
  Divider,
  Button,
  Label,
} from "semantic-ui-react";
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
    <Form
      onSubmit={formik.handleSubmit}
      size="large"
      style={{ marginTop: "20px" }}
      data-testid="form"
    >
      <Grid columns={4} stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as="h3">{t("Your data")}</Header>

            <Form.Field width={10}>
              <label>{t("Age")}:</label>
              <input
                name="age"
                label="Age:"
                type="text"
                pattern="[0-9]*"
                value={formik.values.age}
                onChange={formik.handleChange}
                data-testid="age"
              />
              {formik.touched.age && formik.errors.age ? (
                <Label basic color="red" pointing>
                  {formik.errors.age}
                </Label>
              ) : null}
            </Form.Field>

            <Form.Group grouped>
              <label>{t("Gender")}:</label>
              <Form.Field width={8}>
                <Form.Radio
                  id="male"
                  name="gender"
                  label={t("Male")}
                  value="male"
                  checked={formik.values.gender === "male"}
                  onChange={formik.handleChange}
                />
              </Form.Field>

              <Form.Field width={10}>
                <Form.Radio
                  id="female"
                  name="gender"
                  label={t("Female")}
                  value="female"
                  checked={formik.values.gender === "female"}
                  onChange={formik.handleChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Field width={10}>
              <label>{t("Weight")}:</label>
              <input
                name="weight"
                label="Weight:"
                type="text"
                pattern="[0-9]*"
                value={formik.values.weight}
                onChange={formik.handleChange}
                data-testid="weight"
              />
              {formik.touched.weight && formik.errors.weight ? (
                <Label basic color="red" pointing>
                  {formik.errors.weight}
                </Label>
              ) : null}
            </Form.Field>

            <Form.Field width={10}>
              <label>{t("Height")}:</label>
              <input
                name="height"
                label="Height:"
                type="text"
                pattern="[0-9]*"
                value={formik.values.height}
                onChange={formik.handleChange}
                data-testid="height"
              />
              {formik.touched.height && formik.errors.height ? (
                <Label basic color="red" pointing>
                  {formik.errors.height}
                </Label>
              ) : null}
            </Form.Field>
          </Grid.Column>

          <Grid.Column width={5}>
            <Header as="h3">{t("Activity Level")}</Header>

            <Form.Field
              id="no-exercise"
              control={Radio}
              name="activityLevel"
              label={t("Little / No exercise")}
              value="no-exercise"
              checked={formik.values.activityLevel === "no-exercise"}
              onChange={formik.handleChange}
            />

            <Form.Field
              id="light"
              control={Radio}
              name="activityLevel"
              label={t("Light exercise (1–3 days per week)")}
              value="light"
              checked={formik.values.activityLevel === "light"}
              onChange={formik.handleChange}
            />

            <Form.Field
              id="moderate"
              control={Radio}
              name="activityLevel"
              label={t("Moderate exercise (3–5 days per week)")}
              value="moderate"
              checked={formik.values.activityLevel === "moderate"}
              onChange={formik.handleChange}
            />

            <Form.Field
              id="heavy"
              control={Radio}
              name="activityLevel"
              label={t("Heavy exercise (6–7 days per week)")}
              value="heavy"
              checked={formik.values.activityLevel === "heavy"}
              onChange={formik.handleChange}
            />

            <Form.Field
              id="very-heavy"
              control={Radio}
              name="activityLevel"
              label={t(
                "Very heavy exercise (twice per day, extra heavy workouts)"
              )}
              value="very-heavy"
              checked={formik.values.activityLevel === "very-heavy"}
              onChange={formik.handleChange}
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <Header as="h3">{t("Your goal")}</Header>

            <Form.Field
              id="cut"
              control={Radio}
              name="goal"
              label={t("Cut (-20%)")}
              value="cut"
              checked={formik.values.goal === "cut"}
              onChange={formik.handleChange}
            />

            <Form.Field
              id="maintain"
              control={Radio}
              name="goal"
              label={t("Maintain")}
              value="maintain"
              checked={formik.values.goal === "maintain"}
              onChange={formik.handleChange}
            />

            <Form.Field
              id="gain"
              control={Radio}
              name="goal"
              label={t("Gain (+15%)")}
              value="gain"
              checked={formik.values.goal === "gain"}
              onChange={formik.handleChange}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as="h3">{t("Formula")}</Header>

            <Form.Field
              id="harris-benedict"
              control={Radio}
              name="formula"
              label={t("The Original Harris-Benedict Equation")}
              value="harris-benedict"
              checked={formik.values.formula === "harris-benedict"}
              onChange={formik.handleChange}
            />

            <Form.Field
              id="mifflin-st-jeor"
              control={Radio}
              name="formula"
              label={t("The Mifflin St. Jeor Equation")}
              value="mifflin-st-jeor"
              checked={formik.values.formula === "mifflin-st-jeor"}
              onChange={formik.handleChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider horizontal>
        <Button
          type="submit"
          onClick={formik.handleSubmit}
          size="huge"
          secondary
          data-testid="submit-button"
        >
          {t("Calculate")}
        </Button>
      </Divider>
    </Form>
  );
};

PersonalDataForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};

export default PersonalDataForm;
