import React from "react";
import { Table, Header } from "semantic-ui-react";
import PropTypes from "prop-types";

import { calculateCalories } from "./../helpers";

const Result = ({ data }) => {
  const { toCut, toGain, toMaintain } = calculateCalories(data);

  return (
    <div style={{ paddingTop: "30px" }}>
      <Table celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Cut</Table.HeaderCell>
            <Table.HeaderCell>Maintain</Table.HeaderCell>
            <Table.HeaderCell>Gain</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h2">{toCut ? toCut : 0} kcal</Header>
            </Table.Cell>
            <Table.Cell>
              <Header as="h2">{toMaintain ? toMaintain : 0} kcal</Header>
            </Table.Cell>
            <Table.Cell>
              <Header as="h2">{toGain ? toGain : 0} kcal</Header>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

Result.propTypes = {
  data: PropTypes.shape({
    age: PropTypes.number,
    gender: PropTypes.oneOf(["male", "female"]),
    weight: PropTypes.number,
    height: PropTypes.number,
    formula: PropTypes.oneOf(["harris-benedict", "mifflin-st-jeor"]),
    activityLevel: PropTypes.oneOf([
      "no-exercise",
      "light",
      "moderate",
      "heavy",
      "very-heavy"
    ]),
    goal: PropTypes.oneOf(["cut", "maintain", "gain"])
  })
};

export default Result;
