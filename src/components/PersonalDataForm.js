import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Grid,
  Header,
  Input,
  Radio,
  Divider,
  Button
} from "semantic-ui-react";
import { scroller } from "react-scroll";
import useLocalStorage from "../hooks/useLocalStorage";

const PersonalDataForm = ({ onSubmitData }) => {
  const [persistentData, setPersistentData] = useLocalStorage("calorik-data");
  const [formData, setFormData] = useState(persistentData);

  useEffect(() => {
    setPersistentData(formData);
  }, [formData, setPersistentData]);

  const handleChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : Number(value)
    });
  };

  const scrollToBottom = element => {
    scroller.scrollTo(element, {
      duration: 1000,
      delay: 100,
      smooth: true
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitData(formData);
    scrollToBottom("result");
  };

  return (
    <Form onSubmit={handleSubmit} size="large">
      <Grid columns={4} stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header as="h3">Personal data</Header>

            <Form.Field
              width={10}
              control={Input}
              name="age"
              label="Age:"
              type="text"
              pattern="[0-9]*"
              value={formData.age}
              onChange={handleChange}
            />

            <Form.Group grouped>
              <label>Gender: </label>
              <Form.Field width={10}>
                <Radio
                  name="gender"
                  label="Male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
              </Form.Field>

              <Form.Field width={10}>
                <Radio
                  name="gender"
                  label="Female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form.Group>

            <Form.Field
              width={10}
              control={Input}
              name="weight"
              label="Weight:"
              type="text"
              pattern="[0-9]*"
              value={formData.weight}
              onChange={handleChange}
            />

            <Form.Field
              width={10}
              control={Input}
              name="height"
              label="Height:"
              type="text"
              pattern="[0-9]*"
              value={formData.height}
              onChange={handleChange}
            />
          </Grid.Column>

          <Grid.Column width={5}>
            <Header as="h3">Activity level</Header>

            <Form.Field
              control={Radio}
              name="activityLevel"
              label="Little / No exercise"
              value="no-exercise"
              checked={formData.activityLevel === "no-exercise"}
              onChange={handleChange}
            />

            <Form.Field
              control={Radio}
              name="activityLevel"
              label="Light exercise (1–3 days per week)"
              value="light"
              checked={formData.activityLevel === "light"}
              onChange={handleChange}
            />

            <Form.Field
              control={Radio}
              name="activityLevel"
              label="Moderate exercise (3–5 days per week)"
              value="moderate"
              checked={formData.activityLevel === "moderate"}
              onChange={handleChange}
            />

            <Form.Field
              control={Radio}
              name="activityLevel"
              label="Heavy exercise (6–7 days per week)"
              value="heavy"
              checked={formData.activityLevel === "heavy"}
              onChange={handleChange}
            />

            <Form.Field
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

            <Form.Field
              control={Radio}
              name="goal"
              label="Cut (-20%)"
              value="cut"
              checked={formData.goal === "cut"}
              onChange={handleChange}
            />

            <Form.Field
              control={Radio}
              name="goal"
              label="Maintain"
              value="maintain"
              checked={formData.goal === "maintain"}
              onChange={handleChange}
            />

            <Form.Field
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

            <Form.Field
              control={Radio}
              name="formula"
              label="The Original Harris-Benedict Equation"
              value="harris-benedict"
              checked={formData.formula === "harris-benedict"}
              onChange={handleChange}
            />

            <Form.Field
              control={Radio}
              name="formula"
              label="The Mifflin St. Jeor Equation"
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
    </Form>
  );
};

PersonalDataForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired
};

export default PersonalDataForm;
