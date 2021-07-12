/* eslint-disable react/display-name */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumbs, Crumb } from '../Breadcrumbs';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Breadcrumbs', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Breadcrumbs label="second page">
          <Crumb>Home</Crumb>
          <Crumb>first</Crumb>
          <Crumb>second</Crumb>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c3 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c5 {
        padding-right: 12px;
        padding-left: 12px;
      }

      .c1 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
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

      .c2 svg {
        height: 10px;
        width: 10px;
      }

      .c2 svg path {
        fill: #c0c0cf;
      }

      .c2:last-of-type .c4 {
        display: none;
      }

      <div>
        <div
          class="c0"
        >
          second page
        </div>
        <ol
          aria-hidden="true"
        >
          <li
            class="c1 c2"
          >
            <span
              class="c3"
              color="neutral800"
            >
              Home
            </span>
            <div
              class="c4 c5"
            >
              <svg
                fill="none"
                height="1em"
                viewBox="0 0 10 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.88L6.107 8 0 14.12 1.88 16l8-8-8-8L0 1.88z"
                  fill="#32324D"
                />
              </svg>
            </div>
          </li>
          <li
            class="c1 c2"
          >
            <span
              class="c3"
              color="neutral800"
            >
              first
            </span>
            <div
              class="c4 c5"
            >
              <svg
                fill="none"
                height="1em"
                viewBox="0 0 10 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.88L6.107 8 0 14.12 1.88 16l8-8-8-8L0 1.88z"
                  fill="#32324D"
                />
              </svg>
            </div>
          </li>
          <li
            class="c1 c2"
          >
            <span
              class="c3"
              color="neutral800"
            >
              second
            </span>
            <div
              class="c4 c5"
            >
              <svg
                fill="none"
                height="1em"
                viewBox="0 0 10 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.88L6.107 8 0 14.12 1.88 16l8-8-8-8L0 1.88z"
                  fill="#32324D"
                />
              </svg>
            </div>
          </li>
        </ol>
      </div>
    `);
  });
});
