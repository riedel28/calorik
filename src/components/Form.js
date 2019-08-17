import React, { Component } from 'react';

class Form extends Component {
  state = {};

  render() {
    return (
      <form className="ui large form">
        <div className="ui three column doubling stackable grid">
          <div className="column">
            <h3 className="ui header">Personal data</h3>

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
                    value="male"
                    checked
                    tabindex="0"
                  />
                  <label>Male</label>
                </div>
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    tabindex="0"
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
          </div>

          <div className="column">
            <h3 className="ui header">Activity level</h3>

            <div className="grouped fields">
              <label>Select your activity level:</label>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="activity"
                    value="no-exercise"
                    tabindex="0"
                    checked
                  />
                  <label>Little / No exercise</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="activity"
                    value="3-times"
                    tabindex="0"
                  />
                  <label>3 times a week</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="activity"
                    value="4-times"
                    tabindex="0"
                  />
                  <label>4 times a week</label>
                </div>
              </div>
              <div className="field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    name="activity"
                    value="5-times"
                    tabindex="0"
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
                    tabindex="0"
                    checked
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
                    tabindex="0"
                  />
                  <label>Maintain</label>
                </div>
              </div>

              <div className="field">
                <div className="ui radio checkbox">
                  <input type="radio" name="goal" value="gain" tabindex="0" />
                  <label>Gain</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
