import React, { useState } from 'react';

const Form = props => {
  const [formData, setFormData] = useState({
    age: 30,
    gender: 'male',
    weight: 80,
    height: 180,
    activityLevel: 'no-exercise',
    goal: 'cut',
    formula: 'harris-benedict'
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmitData(formData);
  };

  return (
    <form className="ui large form" onSubmit={handleSubmit}>
      <div className="ui four column doubling stackable grid">
        <div className="three wide column">
          <h3 className="ui header">Personal data</h3>

          <div className="eight wide field">
            <label>Age:</label>
            <input
              type="number"
              name="age"
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
                  checked={formData.gender === 'male'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Male</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Female</label>
              </div>
            </div>
          </div>
          <div className="eight wide field">
            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="eight wide field">
            <label>Height:</label>
            <input
              type="number"
              name="height"
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
                  checked={formData.activityLevel === 'no-exercise'}
                  onChange={handleChange}
                />
                <label>Little / No exercise</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="light"
                  checked={formData.activityLevel === 'light'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Light exercise (1–3 days per week)</label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="moderate"
                  checked={formData.activityLevel === 'moderate'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Moderate exercise (3–5 days per week)</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="heavy"
                  checked={formData.activityLevel === 'heavy'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Heavy exercise (6–7 days per week)</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="very-heavy"
                  checked={formData.activityLevel === 'very-heavy'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>
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
                  checked={formData.goal === 'cut'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Cut (-20%)</label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="goal"
                  value="maintain"
                  checked={formData.goal === 'maintain'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Maintain</label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="goal"
                  value="gain"
                  checked={formData.goal === 'gain'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>Gain (+15%)</label>
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
                  checked={formData.formula === 'harris-benedict'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>The Original Harris-Benedict Equation</label>
              </div>
            </div>

            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="formula"
                  value="mifflin-st-jeor"
                  checked={formData.formula === 'mifflin-st-jeor'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>The Mifflin St Jeor Equation</label>
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

export default Form;
