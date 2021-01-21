import React from "react";
import { Text } from "rebass";

const Heading = ({ children }) => {
  return (
    <Text fontSize={[2, 3, 4]} fontWeight="bold" color="primary" mb={3}>
      {children}
    </Text>
  );
};

export default Heading;
