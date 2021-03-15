import React from 'react';
import { Box } from 'rebass';

const Column = ({ width, children }) => {
  return <Box width={width}>{children}</Box>;
};

export default Column;
