import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Grid } from '../Grid';
import { Box } from '../../Box';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Grid', () => {
  it('verifies the styles of the grid and areas', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Grid
          areas={['first second third', 'last  last last']}
          cols="1fr 1fr 1fr"
          rows="1fr 1fr"
          background="primary500"
          gap={4}
          margin={8}
          padding={4}
        >
          <Box area="first" color="neutral0">
            First
          </Box>
          <Box area="second">Second</Box>
          <Box area="third">Third</Box>
          <Box area="last" background="secondary500">
            Last
          </Box>
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
      grid-template-areas: "first second third""last  last last";
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
          areas={['first second third', 'last  last last']}
          cols="1fr 1fr 1fr"
          rows="1fr 1fr"
          background="primary500"
          gap={gap}
          margin={8}
          padding={4}
        >
          <Box area="first" color="neutral0">
            First
          </Box>
          <Box area="second">Second</Box>
          <Box area="third">Third</Box>
          <Box area="last" background="secondary500">
            Last
          </Box>
        </Grid>
      </ThemeProvider>,
    );

    const grid = container.firstChild;

    expect(grid).toHaveStyle(`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px 20px;
      grid-template-areas: "first second third""last  last last";
    `);
  });

  it('matches snapshots', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Grid
          areas={['first second third', 'last  last last']}
          cols="1fr 1fr 1fr"
          rows="1fr 1fr"
          background="primary500"
          gap={4}
          margin={8}
          padding={4}
        >
          <Box area="first" color="neutral0">
            First
          </Box>
          <Box area="second">Second</Box>
          <Box area="third">Third</Box>
          <Box area="last" background="secondary500">
            Last
          </Box>
        </Grid>
      </ThemeProvider>,
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="sc-bdfBwQ sc-gsTCUz hGrGwO iDxAri"
        >
          <div
            class="sc-bdfBwQ eVqElM"
          >
            First
          </div>
          <div
            class="sc-bdfBwQ krQbrN"
          >
            Second
          </div>
          <div
            class="sc-bdfBwQ bhLtJm"
          >
            Third
          </div>
          <div
            class="sc-bdfBwQ eihPLC"
          >
            Last
          </div>
        </div>
      </div>
    `);
  });
});
