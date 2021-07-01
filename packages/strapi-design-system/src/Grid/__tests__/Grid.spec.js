import * as React from 'react';
import { render } from '@testing-library/react';
import { Grid } from '../Grid';
import { GridItem } from '../GridItem';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Grid', () => {
  it('verifies the styles of the grid and areas', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Grid gap={4} padding={4}>
          <GridItem col={6} color="neutral0">
            First
          </GridItem>
          <GridItem col={6}>Second</GridItem>
          <GridItem col={9}>Third</GridItem>
          <GridItem col={3} background="secondary500">
            Last
          </GridItem>
        </Grid>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        padding: 16px;
      }

      .c3 {
        color: #ffffff;
      }

      .c6 {
        background: #66b7f1;
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
        overflow: hidden;
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

      .c7 {
        -webkit-flex: 3;
        -ms-flex: 3;
        flex: 3;
        -webkit-flex-basis: calc(25% - 16px);
        -ms-flex-preferred-size: calc(25% - 16px);
        flex-basis: calc(25% - 16px);
      }

      <div
        class="c0"
      >
        <div
          class="c1 c2"
        >
          <div
            class="c3 c4"
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
            class="c6 c7"
          >
            Last
          </div>
        </div>
      </div>
    `);
  });
});
