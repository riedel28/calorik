import React from 'react';
import { ThemeProvider as ThemeUIProvider } from 'theme-ui';

const theme = {
  config: {
    initialColorModeName: 'light',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#333eee',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
      },
    },
  },
};

const ThemeProvider = ({ children }) => (
  <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
);

export default ThemeProvider;
