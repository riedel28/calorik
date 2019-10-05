import React from 'react';
import PropTypes from 'prop-types';

import { calculateCalories } from './../helpers';

const Result = ({ data }) => {
  const { toCut, toGain, toMaintain } = calculateCalories(data);

  return (
    <div style={{ paddingTop: '30px' }}>
      <table className="ui large celled fixed table">
        <thead>
          <tr>
            <th>Cut</th>
            <th>Maintain</th>
            <th>Gain</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h2>{toCut ? toCut : 0} kcal</h2>
            </td>
            <td>
              <h2>{toMaintain ? toMaintain : 0} kcal</h2>
            </td>
            <td>
              <h2>{toGain ? toGain : 0} kcal</h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Result.propTypes = {
  data: PropTypes.shape({
    age: PropTypes.number,
    gender: PropTypes.oneOf(['male', 'female']),
    weight: PropTypes.number,
    height: PropTypes.number,
    formula: PropTypes.oneOf(['harris-benedict', 'mifflin-st-jeor']),
    activityLevel: PropTypes.oneOf([
      'no-exercise',
      'light',
      'moderate',
      'heavy',
      'very-heavy'
    ]),
    goal: PropTypes.oneOf(['cut', 'maintain', 'gain'])
  })
};

export default Result;
