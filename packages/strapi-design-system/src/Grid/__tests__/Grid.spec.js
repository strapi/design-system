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
      .c0 {
        padding: 16px;
      }

      .c3 {
        color: #ffffff;
      }

      .c6 {
        background: #66b7f1;
      }

      .c1 {
        display: grid;
        grid-template-columns: repeat(12,1fr);
        gap: 16px;
      }

      .c2 {
        grid-column: span 6;
        word-break: break-all;
      }

      .c4 {
        grid-column: span 9;
        word-break: break-all;
      }

      .c5 {
        grid-column: span 3;
        word-break: break-all;
      }

      @media (max-width:1100px) {
        .c2 {
          grid-column: span;
        }
      }

      @media (max-width:550px) {
        .c2 {
          grid-column: span;
        }
      }

      @media (max-width:1100px) {
        .c4 {
          grid-column: span;
        }
      }

      @media (max-width:550px) {
        .c4 {
          grid-column: span;
        }
      }

      @media (max-width:1100px) {
        .c5 {
          grid-column: span;
        }
      }

      @media (max-width:550px) {
        .c5 {
          grid-column: span;
        }
      }

      <div
        class="c0 c1"
      >
        <div
          class="c2"
        >
          <div
            class="c3"
          >
            First
          </div>
        </div>
        <div
          class="c2"
        >
          <div
            class=""
          >
            Second
          </div>
        </div>
        <div
          class="c4"
        >
          <div
            class=""
          >
            Third
          </div>
        </div>
        <div
          class="c5"
        >
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
