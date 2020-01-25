import React, { useState, useEffect } from "react";
import {
  Form as FormX,
  Grid,
  Header,
  Input,
  Radio,
  Divider,
  Button
} from "semantic-ui-react";
import PropTypes from "prop-types";
import useLocalStorage from "./../hooks/useLocalStorage";

const Form = ({ onSubmitData }) => {
  const [persistentData, setPersistentData] = useLocalStorage("calorik-data");
  const [formData, setFormData] = useState(persistentData);

  useEffect(() => {
    setPersistentData(formData);
  }, [formData, setPersistentData]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitData(formData);
  };

  return (
    <FormX onSubmit={handleSubmit}>
      <Grid columns={4} stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as="h3">Personal data</Header>

            <FormX.Field
              width={8}
              control={Input}
              label="Age:"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />

            <FormX.Group grouped>
              <label>Gender: </label>
              <FormX.Field
                width={6}
                control={Radio}
                label="Male"
                value={formData.gender}
                checked={formData.gender === "male"}
                onChange={handleChange}
              />

              <FormX.Field
                width={6}
                control={Radio}
                label="Female"
                value={formData.gender}
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
            </FormX.Group>

            <FormX.Field
              width={8}
              control={Input}
              label="Weight:"
              value={formData.weight}
              type="number"
              onChange={handleChange}
            />

            <FormX.Field
              width={8}
              control={Input}
              label="Height:"
              value={formData.height}
              type="number"
              onChange={handleChange}
            />
          </Grid.Column>

          <Grid.Column width={5}>
            <Header as="h3">Activity level</Header>

            <FormX.Field
              control={Radio}
              name="activityLevel"
              label="Little / No exercise"
              value="no-exercise"
              checked={formData.activityLevel === "no-exercise"}
              onChange={handleChange}
            />

            <FormX.Field
              control={Radio}
              name="activityLevel"
              label="Light exercise (1–3 days per week)"
              value="light"
              checked={formData.activityLevel === "light"}
              onChange={handleChange}
            />
            <FormX.Field
              control={Radio}
              name="activityLevel"
              label="Moderate exercise (3–5 days per week)"
              value="moderate"
              checked={formData.activityLevel === "moderate"}
              onChange={handleChange}
            />

            <FormX.Field
              control={Radio}
              name="activityLevel"
              label="Heavy exercise (6–7 days per week)"
              value="heavy"
              checked={formData.activityLevel === "heavy"}
              onChange={handleChange}
            />

            <FormX.Field
              control={Radio}
              name="activityLevel"
              label="Very heavy exercise (twice per day, extra heavy workouts)"
              value="very-heavy"
              checked={formData.activityLevel === "very-heavy"}
              onChange={handleChange}
            />
          </Grid.Column>

          <Grid.Column width={3}>
            <Header as="h3">Your goal</Header>

            <FormX.Field
              control={Radio}
              name="goal"
              label="Cut (-20%)"
              value="cut"
              checked={formData.goal === "cut"}
              onChange={handleChange}
            />
            <FormX.Field
              control={Radio}
              name="goal"
              label="Maintain"
              value="maintain"
              checked={formData.goal === "maintain"}
              onChange={handleChange}
            />
            <FormX.Field
              control={Radio}
              name="goal"
              label="Gain (+15%)"
              value="gain"
              checked={formData.goal === "gain"}
              onChange={handleChange}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as="h3">Formula</Header>

            <FormX.Field
              control={Radio}
              name="formula"
              label="The Original Harris-Benedict Equation"
              value="harris-benedict"
              checked={formData.formula === "harris-benedict"}
              onChange={handleChange}
            />
            <FormX.Field
              control={Radio}
              name="formula"
              label="The Mifflin St Jeor Equation"
              value="mifflin-st-jeor"
              checked={formData.formula === "mifflin-st-jeor"}
              onChange={handleChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider horizontal>
        <Button onClick={handleSubmit} size="huge" secondary>
          Calculate
        </Button>
      </Divider>
    </FormX>
  );
};

Form.propTypes = {
  onSubmitData: PropTypes.func.isRequired
};

export default Form;
