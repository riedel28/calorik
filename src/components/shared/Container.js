import React from "react";
import { Box } from "rebass";

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
