import * as React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';

import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Popover } from '../Popover';

describe('Popover', () => {
  it('snapshots the component', () => {
    const Component = () => {
      const divRef = React.useRef<HTMLDivElement>(null!);
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
      .c3 {
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

      .c0 {
        background: #ffffff;
        padding: 4px;
        border-radius: 4px;
      }

      .c1 {
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        z-index: 5;
        border: 1px solid #eaeaef;
        background: #ffffff;
      }

      .c2 {
        max-height: 15rem;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .c2::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 4px;
      }

      .c2::-webkit-scrollbar-track {
        background: #ffffff;
      }

      .c2::-webkit-scrollbar-thumb {
        background: #eaeaef;
        border-radius: 4px;
        margin-right: 10px;
      }

      <body>
        <div
          class=""
        >
          <div>
            <div
              class="c0 c1"
              style="position: fixed;"
            >
              <div
                class="c2"
              >
                <div>
                  Hello world
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            Source
          </div>
        </div>
        <div
          class="c3"
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
      </body>
    `);
  });

  it('should render the popover when visible is true', () => {
    const Component = () => {
      const divRef = React.useRef<HTMLButtonElement>(null!);
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

  it('should close the popover when clicked outside', () => {
    const onClose = jest.fn();

    const Component = () => {
      const sourceRef = React.useRef<HTMLButtonElement>(null!);
      const [isVisible, setIsVisible] = React.useState(false);

      return (
        <ThemeProvider theme={lightTheme}>
          <div>
            <button type="button" ref={sourceRef} onClick={() => setIsVisible(true)}>
              Source
            </button>
            {isVisible && (
              <Popover source={sourceRef} onClose={onClose}>
                <div>Hello world</div>
              </Popover>
            )}

            <div>Outside Element</div>
          </div>
        </ThemeProvider>
      );
    };

    render(<Component />);

    const outsideElement = screen.getByText('Outside Element');

    fireEvent.click(screen.getByText('Source'));
    expect(screen.getByText('Hello world')).toBeVisible();
    expect(onClose).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledWith('onEscapeKeyDown');

    fireEvent.focus(outsideElement);
    expect(onClose).toHaveBeenCalledWith('onFocusOutside');
  });
});
