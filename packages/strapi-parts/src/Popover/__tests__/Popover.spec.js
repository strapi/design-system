import * as React from 'react';
import { render } from '@testing-library/react';
import { Popover, position } from '../Popover';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Popover', () => {
  let pageXOffset;
  let pageYOffset;

  beforeEach(() => {
    pageXOffset = window.pageXOffset;
    pageYOffset = window.pageYOffset;
  });

  afterEach(() => {
    window.pageXOffset = pageXOffset;
    window.pageYOffset = pageYOffset;
  });

  describe('position', () => {
    it('position the tooltip correctly', () => {
      window.pageXOffset = 10;
      window.pageYOffset = 10;
      const source = { getBoundingClientRect: () => ({ left: 10, top: 10, width: 100, height: 20 }) };

      expect(position(source)).toEqual({ left: 20, top: 40, width: undefined });
    });

    it('position the tooltip correctly when offscreen', () => {
      window.pageXOffset = 10;
      window.pageYOffset = 10;
      window.innerWidth = 1300;

      const source = { getBoundingClientRect: () => ({ left: 1200, top: 10, width: 100, height: 20 }) };
      const popover = {
        offsetWidth: 100,
        clientWidth: 85,
        getBoundingClientRect: () => ({ left: 1200, top: 10, width: 100, height: 20 }),
      };

      expect(position(source, popover)).toEqual({ left: 1210, top: 40, width: undefined });
    });

    it('position the tooltip centered to source element if centered props', () => {
      const source = { getBoundingClientRect: () => ({ left: 500, top: 10, width: 200, height: 20 }) };
      const centered = true;
      const popover = {
        offsetWidth: 100,
        clientWidth: 85,
        getBoundingClientRect: () => ({ width: 100 }),
      };
      const fullWidth = null;

      expect(position(source, popover, fullWidth, centered)).toEqual({ left: 545, top: 30, width: undefined });
    });
  });

  describe('rendering', () => {
    it('snapshots the component', async () => {
      const Component = () => {
        const divRef = React.useRef(null);
        const [visible, setVisible] = React.useState(true);

        React.useEffect(() => {
          setVisible(true);
        }, []);

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
          position: absolute;
          z-index: 3;
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
              id="live-region-log"
              role="log"
            />
            <p
              aria-live="polite"
              id="live-region-status"
              role="status"
            />
            <p
              aria-live="assertive"
              id="live-region-alert"
              role="alert"
            />
          </div>
          <div
            data-react-portal="true"
          >
            <div
              class="c1 c2"
              style="left: 0px; top: 0px;"
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
  });
});
