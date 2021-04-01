import React from 'react';
import { ThemeProvider, Grid, Area } from '@strapi/design-system';
import { lightTheme as theme } from '@strapi/design-system/src/themes/light-theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid
        areas={[
          ['first', 'second', 'third'],
          ['last', 'last', 'last'],
        ]}
        cols="1fr 1fr 1fr"
        rows="1fr 1fr"
        borderRadius="200px"
        background="primary700"
        gap={4}
        margin={8}
        padding={4}
      >
        <Area name="first" color="neutral0">
          First
        </Area>
        <Area name="second" background="neutral100">
          Second
        </Area>
        <Area name="third" background="neutral100">
          Third
        </Area>
        <Area name="last" background="neutral100" color="primary700">
          Last
        </Area>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
