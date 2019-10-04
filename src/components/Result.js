import React from 'react';
import { calculateCalories } from './../helpers';

export default ({ data }) => {
  const { toCut, toGain, toMaintain } = calculateCalories(data);

  const displayCalories = ({ goal }) => {
    switch (goal) {
      case 'cut':
        return toCut;
      case 'gain':
        return toGain;
      case 'maintain':
        return toMaintain;
      default:
        return '0';
    }
  };

  return (
    <div style={{ paddingTop: '30px' }}>
      <table class="ui large celled fixed table">
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
