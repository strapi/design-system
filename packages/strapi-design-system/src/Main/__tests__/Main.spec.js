import * as React from 'react';
import { render } from '@testing-library/react';
import { Main } from '../Main';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { SkipToContent } from '../SkipToContent';

describe('Main', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <div>
          <SkipToContent>Skip to main content</SkipToContent>
          <Main labelledBy="main-title">
            <h1 id="main-title">Hello world</h1>
          </Main>
        </div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        -webkit-text-decoration: none;
        text-decoration: none;
        position: absolute;
        z-index: 9999;
        left: -100%;
        top: -100%;
      }

      .c0:focus {
        left: 12px;
        top: 12px;
      }

      <div>
        <a
          class="c0"
          color="neutral0"
          href="#main-content"
        >
          Skip to main content
        </a>
        <main
          aria-labelledby="main-title"
          id="main-content"
        >
          <h1
            id="main-title"
          >
            Hello world
          </h1>
        </main>
      </div>
    `);
  });
});
