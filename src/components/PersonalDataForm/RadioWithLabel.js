import React from "react";
import { Label, Radio } from "@rebass/forms";

const RadioWithLabel = ({ id, name, value, checked, onChange, children }) => {
  return (
    <Label htmlFor={id} mb={3}>
      <Radio
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </Label>
  );
};

export default RadioWithLabel;
