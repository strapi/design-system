import React from "react";
import {ThemeProvider} from '../src/ThemeProvider'
import { lightTheme } from '../src/themes/light-theme'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

// .storybook/preview.js
export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <Story />
    </ThemeProvider>
  ),
];