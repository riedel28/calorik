import { useState, useEffect } from "react";

export default (key, initialValue = {}) => {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
