import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
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

      expect(position(source, popover, fullWidth, centered)).toEqual({ left: 550, top: 30, width: undefined });
    });
  });

  describe('rendering', () => {
    it('snapshots the component', async () => {
      const source = document.createElement('div');
      source.innerText = 'Hello source';
      document.body.appendChild(source);

      const { container, getByText } = render(
        <ThemeProvider theme={lightTheme}>
          <Popover source={{ current: source }}>
            <div>Hello world</div>
          </Popover>
        </ThemeProvider>,
        { container: document.body },
      );

      await waitFor(() => {
        expect(getByText('Hello world')).toBeInTheDocument();
      });

      expect(container.firstChild).toMatchInlineSnapshot(`
        .c0 {
          background: #ffffff;
          padding: 4px;
          border-radius: 4px;
        }

        .c1 {
          box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
          position: absolute;
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

        <div
          data-react-portal="true"
        >
          <div
            class="c0 c1"
            style="left: 0px; top: 0px;"
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
      `);
    });
  });
});
