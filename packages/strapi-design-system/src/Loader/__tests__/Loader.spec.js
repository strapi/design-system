import * as React from 'react';
import { render } from '@testing-library/react';
import { Loader } from '../Loader';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Loader', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
<<<<<<< HEAD
        <Loader>Loading content...</Loader>
=======
        <Loader>Loading content</Loader>
>>>>>>> ADd linting for alphabetical ordering
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        border: 0;
        -webkit-clip: rect(0 0 0 0);
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }

      .c1 {
        -webkit-animation: gzYjWD 1s infinite linear;
        animation: gzYjWD 1s infinite linear;
      }

      <div
        aria-live="assertive"
        role="alert"
      >
        <div
          class="c0"
        >
          Loading content...
        </div>
        <img
          aria-hidden="true"
          class="c1"
          src="test-file-stub"
        />
      </div>
    `);
  });
});
