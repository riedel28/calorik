import React, { useState, useEffect } from "react";
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
    <form className="ui large form" onSubmit={handleSubmit}>
      <div className="ui four column doubling stackable grid">
        <div className="three wide column">
          <h3 className="ui header">Personal data</h3>

          <div className="eight wide field">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="grouped fields">
            <label htmlFor="gender">Gender:</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  checked={formData.gender === "male"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  checked={formData.gender === "female"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <div className="eight wide field">
            <label htmlFor="weight">Weight:</label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="eight wide field">
            <label htmlFor="height">Height:</label>
            <input
              type="number"
              name="height"
              id="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="six wide column">
          <h3 className="ui header">Activity level</h3>

          <div className="grouped fields">
            <label>Select your activity level:</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="no-exercise"
                  tabIndex="0"
                  id="no-exercise"
                  checked={formData.activityLevel === "no-exercise"}
                  onChange={handleChange}
                />
                <label htmlFor="no-exercise">Little / No exercise</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="light"
                  id="light"
                  checked={formData.activityLevel === "light"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="light">
                  Light exercise (1–3 days per week)
                </label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="moderate"
                  id="moderate"
                  checked={formData.activityLevel === "moderate"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="moderate">
                  Moderate exercise (3–5 days per week)
                </label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="heavy"
                  id="heavy"
                  checked={formData.activityLevel === "heavy"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="heavy">
                  Heavy exercise (6–7 days per week)
                </label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="very-heavy"
                  id="very-heavy"
                  checked={formData.activityLevel === "very-heavy"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="very-heavy">
                  Very heavy exercise (twice per day, extra heavy workouts)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="three wide column">
          <h3 className="ui header">Your goal</h3>

          <div className="grouped fields">
            <label>Select your goal:</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="goal"
                  value="cut"
                  id="cut"
                  checked={formData.goal === "cut"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="cut">Cut (-20%)</label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="goal"
                  value="maintain"
                  id="maintain"
                  checked={formData.goal === "maintain"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="maintain">Maintain</label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="goal"
                  value="gain"
                  id="gain"
                  checked={formData.goal === "gain"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="gain">Gain (+15%)</label>
              </div>
            </div>
          </div>
        </div>
        <div className="four wide column">
          <h3 className="ui header">Formula</h3>
          <div className="grouped fields">
            <label>Select the formula:</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="formula"
                  value="harris-benedict"
                  id="harris-benedict"
                  checked={formData.formula === "harris-benedict"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="harris-benedict">
                  The Original Harris-Benedict Equation
                </label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="formula"
                  value="mifflin-st-jeor"
                  id="mifflin-st-jeor"
                  checked={formData.formula === "mifflin-st-jeor"}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label htmlFor="mifflin-st-jeor">
                  The Mifflin St Jeor Equation
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ui horizontal divider">
        <button className="ui huge secondary button" onClick={handleSubmit}>
          Calculate
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  onSubmitData: PropTypes.func.isRequired
};

export default Form;
