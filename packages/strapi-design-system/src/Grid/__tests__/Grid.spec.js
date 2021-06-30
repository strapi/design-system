import * as React from 'react';
import { render } from '@testing-library/react';
import { Grid } from '../Grid';
import { Box } from '../../Box';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Grid', () => {
  it('verifies the styles of the grid and areas', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Grid cols="1fr 1fr 1fr" gap={4} margin={8} padding={4}>
          <Box col={6} color="neutral0">
            First
          </Box>
          <Box col={6}>Second</Box>
          <Box col={9}>Third</Box>
          <Box col={3} background="secondary500">
            Last
          </Box>
        </Grid>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        padding: 16px;
      }

      .c3 {
        color: #ffffff;
        -webkit-flex: 6;
        -ms-flex: 6;
        flex: 6;
        -webkit-flex-basis: calc(50% - 16px);
        -ms-flex-preferred-size: calc(50% - 16px);
        flex-basis: calc(50% - 16px);
      }

      .c4 {
        -webkit-flex: 6;
        -ms-flex: 6;
        flex: 6;
        -webkit-flex-basis: calc(50% - 16px);
        -ms-flex-preferred-size: calc(50% - 16px);
        flex-basis: calc(50% - 16px);
      }

      .c5 {
        -webkit-flex: 9;
        -ms-flex: 9;
        flex: 9;
        -webkit-flex-basis: calc(75% - 16px);
        -ms-flex-preferred-size: calc(75% - 16px);
        flex-basis: calc(75% - 16px);
      }

      .c6 {
        background: #66b7f1;
        -webkit-flex: 3;
        -ms-flex: 3;
        flex: 3;
        -webkit-flex-basis: calc(25% - 16px);
        -ms-flex-preferred-size: calc(25% - 16px);
        flex-basis: calc(25% - 16px);
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: -16px;
        margin-top: -16px;
      }

      .c2 > * {
        margin-right: 16px;
        margin-top: 16px;
      }

      .c0 {
        overflow: auto;
      }

      <div
        class="c0"
      >
        <div
          class="c1 c2"
        >
          <div
            class="c3"
          >
            First
          </div>
          <div
            class="c4"
          >
            Second
          </div>
          <div
            class="c5"
          >
            Third
          </div>
          <div
            class="c6"
          >
            Last
          </div>
        </div>
      </div>
    `);
  });
});
