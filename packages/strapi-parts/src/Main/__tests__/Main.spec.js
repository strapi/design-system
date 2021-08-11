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
      .c2 {
        outline: none;
      }

      .c0 {
        background: #4945ff;
        color: #ffffff;
        padding: 12px;
        border-radius: 4px;
      }

      .c1 {
        -webkit-text-decoration: none;
        text-decoration: none;
        position: absolute;
        z-index: 9999;
        left: -100%;
        top: -100%;
      }

      .c1:focus {
        left: 12px;
        top: 12px;
      }

      <div>
        <a
          class="c0 c1"
          href="#main-content"
        >
          Skip to main content
        </a>
        <main
          aria-labelledby="main-title"
          class="c2"
          id="main-content"
          tabindex="-1"
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
