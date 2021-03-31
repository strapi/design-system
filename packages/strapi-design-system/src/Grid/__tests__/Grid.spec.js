import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from '../Grid';
import { Area } from '../Area';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Grid', () => {
  it('verifies the styles of the grid and areas', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Grid
          areas={[
            ['first', 'second', 'third'],
            ['last', 'last', 'last'],
          ]}
          cols="1fr 1fr 1fr"
          rows="1fr 1fr"
          background="primary500"
          gap={4}
          margin={8}
          padding={4}
        >
          <Area name="first" color="neutral0">
            First
          </Area>
          <Area name="second">Second</Area>
          <Area name="third">Third</Area>
          <Area name="last" background="secondary500">
            Last
          </Area>
        </Grid>
      </ThemeProvider>,
    );

    const grid = container.firstChild;
    const first = screen.getByText('First');
    const second = screen.getByText('Second');
    const third = screen.getByText('Third');
    const last = screen.getByText('Last');

    expect(grid).toHaveStyle(`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px;
      grid-template-areas: "first second third""last last last";
    `);

    expect(first).toHaveStyle(`grid-area: first;`);
    expect(second).toHaveStyle(`grid-area: second;`);
    expect(third).toHaveStyle(`grid-area: third;`);
    expect(last).toHaveStyle(`
      grid-area: last;
      background: #66b7f1;
    `);
  });

  it('allows for passing an array as a gap', () => {
    const gap = [4, 5];

    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Grid
          areas={[
            ['first', 'second', 'third'],
            ['last', 'last', 'last'],
          ]}
          cols="1fr 1fr 1fr"
          rows="1fr 1fr"
          background="primary500"
          gap={gap}
          margin={8}
          padding={4}
        >
          <Area name="first" color="neutral0">
            First
          </Area>
          <Area name="second">Second</Area>
          <Area name="third">Third</Area>
          <Area name="last" background="secondary500">
            Last
          </Area>
        </Grid>
      </ThemeProvider>,
    );

    const grid = container.firstChild;

    expect(grid).toHaveStyle(`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px 20px;
      grid-template-areas: "first second third""last last last";
    `);
  });

  it('matches snapshots', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Grid
          areas={[
            ['first', 'second', 'third'],
            ['last', 'last', 'last'],
          ]}
          cols="1fr 1fr 1fr"
          rows="1fr 1fr"
          background="primary500"
          gap={4}
          margin={8}
          padding={4}
        >
          <Area name="first" color="neutral0">
            First
          </Area>
          <Area name="second">Second</Area>
          <Area name="third">Third</Area>
          <Area name="last" background="secondary500">
            Last
          </Area>
        </Grid>
      </ThemeProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="sc-bdfBwQ sc-gsTCUz hmZrkA iDFNLi"
        >
          <div
            class="sc-bdfBwQ sc-dlfnbm lahEc dwFvLx"
          >
            First
          </div>
          <div
            class="sc-bdfBwQ sc-dlfnbm hhOmBT iPczcj"
          >
            Second
          </div>
          <div
            class="sc-bdfBwQ sc-dlfnbm hhOmBT kOkxus"
          >
            Third
          </div>
          <div
            class="sc-bdfBwQ sc-dlfnbm eIuqJS dDjjaR"
          >
            Last
          </div>
        </div>
      </div>
    `);
  });
});
