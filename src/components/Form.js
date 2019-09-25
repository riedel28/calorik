import React, { useState } from 'react';

const Form = props => {
  const [formData, setFormData] = useState({
    age: 30,
    gender: 'male',
    weight: 80,
    height: 180,
    activityLevel: '0',
    goal: 'cut'
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmitData(formData);
  };

  return (
    <form className="ui large form" onSubmit={handleSubmit}>
      <div className="ui three column doubling stackable grid">
        <div className="column">
          <h3 className="ui header">Personal data</h3>

          <div className="six wide field">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="inline fields">
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
          <div className="six wide field">
            <label>Weight:</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="six wide field">
            <label>Height:</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="column">
          <h3 className="ui header">Activity level</h3>

          <div className="grouped fields">
            <label>Select your activity level:</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="0"
                  tabIndex="0"
                  checked={formData.activityLevel === '0'}
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
                  value="3"
                  checked={formData.activityLevel === '3'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>3 times a week</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="4"
                  checked={formData.activityLevel === '4'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>4 times a week</label>
              </div>
            </div>
            <div className="field">
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="activityLevel"
                  value="5"
                  checked={formData.activityLevel === '5'}
                  tabIndex="0"
                  onChange={handleChange}
                />
                <label>5 times a week</label>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
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
                <label>Cut</label>
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
                <label>Gain</label>
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
