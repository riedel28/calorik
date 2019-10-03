import React, { useEffect, useState } from 'react';
import { calculateCalories } from './../helpers';

export default ({ data }) => {
  const [counter, setCounter] = useState(1000);

  const { toCut, toGain, toMaintain } = calculateCalories(data);

  useEffect(() => {
    if (counter < toCut) {
      setCounter(counter => counter + 1);
    }
  }, [toCut, counter]);

  return (
    <>
      <div className="ui bottom aligned two column doubling stackable grid">
        <div className="column">
          <h1
            className="ui header"
            style={{ fontSize: '50px', marginTop: '70px' }}
          >
            Your calories: {toCut ? (counter <= toCut ? counter : toCut) : 0}
          </h1>
        </div>

        <div className="column">
          <table class="ui celled table">
            <thead>
              <tr>
                <th>Maintain</th>
                <th>Gain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Name">{toMaintain ? toMaintain : 0} kcal</td>
                <td data-label="Age">{toGain ? toGain : 0} kcal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
