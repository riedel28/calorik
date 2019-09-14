import React, { useState } from 'react';

const Form = () => {
  const [data, setData] = useState({
    age: 30,
    gender: 'male',
    weight: 85,
    height: 180,
    activityLevel: '0',
    goal: 'cut'
  });

  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <form className="ui large form">
      <div className="ui three column doubling stackable grid">
        <div className="column">
          <h3 className="ui header">Personal data</h3>

          <div className="six wide field">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={data.age}
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
                  checked={data.gender === 'male'}
                  tabindex="0"
                  onChange={handleChange}
                />
                <label>Male</label>
              </div>
              <div className="ui radio checkbox">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === 'female'}
                  tabindex="0"
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
              value={data.weight}
              onChange={handleChange}
            />
          </div>
          <div className="six wide field">
            <label>Height:</label>
            <input
              type="text"
              name="height"
              value={data.height}
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
                  tabindex="0"
                  checked={data.activityLevel === '0'}
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
                  checked={data.activityLevel === '3'}
                  tabindex="0"
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
                  checked={data.activityLevel === '4'}
                  tabindex="0"
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
                  checked={data.activityLevel === '5'}
                  tabindex="0"
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
                  checked={data.goal === 'cut'}
                  tabindex="0"
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
                  checked={data.goal === 'maintain'}
                  tabindex="0"
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
                  checked={data.goal === 'gain'}
                  tabindex="0"
                  onChange={handleChange}
                />
                <label>Gain</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {JSON.stringify(data)}
    </form>
  );
};

export default Form;
