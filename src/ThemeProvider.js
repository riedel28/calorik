import React from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import theme from "@rebass/preset";

const ThemeProvider = (props) => (
  <EmotionThemeProvider theme={theme}>{props.children}</EmotionThemeProvider>
);

export default ThemeProvider;
