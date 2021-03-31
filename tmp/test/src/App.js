import React from 'react';
import logo from './logo.svg';
import { Button as Button } from '@strapi/design-system/dist/Button';
import { lightTheme as theme } from '@strapi/design-system/src/themes/light-theme';
import { Button as Button1 } from '@buffetjs/styles';
import './App.css';

const version = React.version;

function App() {
  console.log({ Button });
  console.log({ Button1 });
  // return null;
  return (
    <Button theme={theme}>
      {/* <Grid
        areas={[
          ['first', 'second', 'third'],
          ['last', 'last', 'last'],
        ]}
        cols="1fr 1fr 1fr"
        rows="1fr 1fr"
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
      </Grid> */}
    </Button>
  );
}

export default App;
