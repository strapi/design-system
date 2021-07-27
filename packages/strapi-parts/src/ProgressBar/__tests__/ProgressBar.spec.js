import * as React from 'react';
import { render } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('ProgressBar', () => {
  it('snapshots the component with a M size', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <ProgressBar value={33}>33% of the plugins loaded</ProgressBar>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #666687;
        border-radius: 4px;
        position: relative;
        width: 78px;
        height: 4px;
      }

      .c0:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 4px;
        width: 33%;
        background: #eaeaef;
      }

      .c1 {
        width: 102px;
        height: 8px;
      }

      <div
        aria-label="33% of the plugins loaded"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="33"
        class="c0 c1"
        role="progressbar"
        value="33"
      />
    `);
  });

  it('snapshots the component with a S size', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <ProgressBar value={33}>33% of the plugins loaded</ProgressBar>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #666687;
        border-radius: 4px;
        position: relative;
        width: 78px;
        height: 4px;
      }

      .c0:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 4px;
        width: 33%;
        background: #eaeaef;
      }

      .c1 {
        width: 102px;
        height: 8px;
      }

      <div
        aria-label="33% of the plugins loaded"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="33"
        class="c0 c1"
        role="progressbar"
        value="33"
      />
    `);
  });
});
