import React from 'react';
import { Text, Button as RebassButton } from 'rebass';

const Button = ({ type = 'submit', onClick, children }) => {
  return (
    <RebassButton
      type={type}
      onClick={onClick}
      px={4}
      py={3}
      sx={{
        letterSpacing: 2,
        bg: '#333eee',
        ':hover': {
          cursor: 'pointer',
        },
      }}
      data-testid="submit-button"
    >
      <Text fontSize={4}>{children}</Text>
    </RebassButton>
  );
};

export default Button;
