import React from 'react';

const App = () => {
  return (
    <div className="app">
      <div className="ui container">
        <h1 className="ui left floated header" style={{ paddingTop: '20px' }}>
          Calorik
        </h1>

        <div className="ui clearing divider" />
        <div className="ui three column doubling stackable grid">
          <div className="column">
            <h3 className="ui header">Personal data</h3>
            <form className="ui large form">
              <div className="six wide field">
                <label>Age:</label>
                <input type="text" name="age" />
              </div>

              <div className="inline fields">
                <label for="fruit">Gender:</label>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="gender"
                      checked
                      tabindex="0"
                      className="hidden"
                    />
                    <label>Male</label>
                  </div>
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="gender"
                      tabindex="0"
                      className="hidden"
                    />
                    <label>Female</label>
                  </div>
                </div>
              </div>
              <div className="six wide field">
                <label>Weight:</label>
                <input type="text" name="weight" />
              </div>
              <div className="six wide field">
                <label>Height:</label>
                <input type="text" name="height" />
              </div>
            </form>
          </div>

          <div className="column">
            <h3 className="ui header">Activity level</h3>
            <form className="ui large form">
              <div className="grouped fields">
                <label>Select your activity level:</label>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="activity"
                      checked=""
                      tabindex="0"
                      className="hidden"
                    />
                    <label>Little / No exercise</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="fruit"
                      checked=""
                      tabindex="0"
                      className="hidden"
                    />
                    <label>3 times a week</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="fruit"
                      checked=""
                      tabindex="0"
                      className="hidden"
                    />
                    <label>4 times a week</label>
                  </div>
                </div>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="fruit"
                      checked=""
                      tabindex="0"
                      className="hidden"
                    />
                    <label>5 times a week</label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="column">
            <h3 className="ui header">Your goal</h3>
            <form className="ui large form">
              <div className="grouped fields">
                <label>Select your goal:</label>
                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="goal"
                      checked=""
                      tabindex="0"
                      className="hidden"
                    />
                    <label>Cut</label>
                  </div>
                </div>

                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="goal"
                      checked=""
                      tabindex="0"
                      className="hidden"
                    />
                    <label>Maintain</label>
                  </div>
                </div>

                <div className="field">
                  <div className="ui radio checkbox">
                    <input
                      type="radio"
                      name="goal"
                      checked=""
                      tabindex="0"
                      className="hidden"
                    />
                    <label>Gain</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="ui horizontal divider">
          <button className="ui huge secondary button">Calculate</button>
        </div>

        <h1
          className="ui header"
          style={{ fontSize: '50px', marginTop: '70px' }}
        >
          Your calories: 0
        </h1>
      </div>
    </div>
  );
};

export default App;
