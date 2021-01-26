import React from "react";
import { Box } from "rebass";
import { Label, Input } from "@rebass/forms";

const InputWithLabel = ({ id, label, value, type, onChange, children }) => {
  return (
    <Box mb={3}>
      <Label htmlFor={id} fontWeight="bold" mb="1">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        pattern="[0-9]*"
        value={value}
        onChange={onChange}
        data-testid={id}
        sx={{
          border: "3px solid #333eee",
          borderRadius: "5px",
          p: "8px 10px",
          fontSize: "2",
          fontFamily: "system-ui, sans-serif",
        }}
      />
      {children}
    </Box>
  );
};

export default InputWithLabel;
