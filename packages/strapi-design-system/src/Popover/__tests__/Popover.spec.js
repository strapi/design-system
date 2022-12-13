import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from '../Popover';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Popover', () => {
  it('snapshots the component', () => {
    const Component = () => {
      const divRef = React.useRef(null);
      const [visible] = React.useState(true);

      return (
        <ThemeProvider theme={lightTheme}>
          <div>
            <div ref={divRef}>Source</div>
            {visible && (
              <Popover source={divRef}>
                <div>Hello world</div>
              </Popover>
            )}
          </div>
        </ThemeProvider>
      );
    };

    const { container } = render(<Component />, { container: document.body });

    expect(container).toMatchInlineSnapshot(`
      .c1 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c2 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        z-index: 4;
        border: 1px solid #eaeaef;
        background: #ffffff;
      }

      .c3 {
        max-height: 15rem;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .c3::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
      }

      .c3::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c3::-webkit-scrollbar-thumb {
        background: #eaeaef;
        border-radius: 4px;
        margin-right: 10px;
      }

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

      <body>
        <div>
          <div>
            Source
          </div>
        </div>
        <div
          class="c0"
        >
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-log"
            role="log"
          />
          <p
            aria-live="polite"
            aria-relevant="all"
            id="live-region-status"
            role="status"
          />
          <p
            aria-live="assertive"
            aria-relevant="all"
            id="live-region-alert"
            role="alert"
          />
        </div>
        <div
          data-react-portal="true"
        >
          <div
            class="c1 c2"
            style="position: fixed;"
          >
            <div
              class="c3"
            >
              <div>
                Hello world
              </div>
            </div>
          </div>
        </div>
      </body>
    `);
  });

  it('should render the popover when visible is true', () => {
    const Component = () => {
      const divRef = React.useRef(null);
      const [isVisible, setIsVisible] = React.useState(false);

      return (
        <ThemeProvider theme={lightTheme}>
          <div>
            <button type="button" ref={divRef} onClick={() => setIsVisible((s) => !s)}>
              Source
            </button>
            {isVisible && (
              <Popover source={divRef}>
                <div>Hello world</div>
              </Popover>
            )}
          </div>
        </ThemeProvider>
      );
    };

    render(<Component />, { container: document.body });

    expect(() => screen.getByText('Hello world')).toThrow();

    fireEvent.click(screen.getByText('Source'));

    expect(screen.getByText('Hello world')).toBeVisible();
  });
});
