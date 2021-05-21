/* eslint-disable react/display-name */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Link } from '../Link';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Link', () => {
  it('snapshots the component with an external link', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Link href="https://strapi.io/">External link</Link>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c2 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c3 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c4 {
        padding-left: 8px;
      }

      .c0 {
        text-transform: uppercase;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .c0 svg path {
        fill: #4945ff;
      }

      .c0 svg {
        font-size: 0.625rem;
      }

      <a
        class="c0"
        href="https://strapi.io/"
        rel="noreferrer noopener"
        target="_blank"
      >
        <span
          class="c1 c2 c3"
        >
          External link
          <span
            aria-hidden="true"
            class="c4"
          >
            <svg
              fill="none"
              height="1em"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.235 2.824a1.412 1.412 0 010-2.824h6.353C23.368 0 24 .633 24 1.412v6.353a1.412 1.412 0 01-2.823 0V4.82l-8.179 8.178a1.412 1.412 0 01-1.996-1.996l8.178-8.178h-2.945zm4.942 10.588a1.412 1.412 0 012.823 0v9.176c0 .78-.632 1.412-1.412 1.412H1.412C.632 24 0 23.368 0 22.588V1.412C0 .632.632 0 1.412 0h9.176a1.412 1.412 0 010 2.824H2.824v18.353h18.353v-7.765z"
                fill="#32324D"
              />
            </svg>
          </span>
        </span>
      </a>
    `);
  });

  it('snapshots the component with right and left icons', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Link to="https://strapi.io/" leftIcon={<span>Left</span>} rightIcon={<span>Right</span>}>
          External link
        </Link>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c2 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c3 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c4 {
        padding-right: 8px;
      }

      .c5 {
        padding-left: 8px;
      }

      .c0 {
        text-transform: uppercase;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .c0 svg path {
        fill: #4945ff;
      }

      .c0 svg {
        font-size: 0.625rem;
      }

      <a
        class="c0"
        href="https://strapi.io/"
      >
        <span
          class="c1 c2 c3"
        >
          <span
            aria-hidden="true"
            class="c4"
          >
            <span>
              Left
            </span>
          </span>
          External link
          <span
            aria-hidden="true"
            class="c5"
          >
            <span>
              Right
            </span>
          </span>
        </span>
      </a>
    `);
  });

  it('snapshots the component with right and left icons and disabled state', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Link disabled to="https://strapi.io/" leftIcon={<span>Left</span>} rightIcon={<span>Right</span>}>
          External link
        </Link>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c2 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c3 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c4 {
        padding-right: 8px;
      }

      .c5 {
        padding-left: 8px;
      }

      .c0 {
        text-transform: uppercase;
        -webkit-text-decoration: none;
        text-decoration: none;
        pointer-events: none;
      }

      .c0 svg path {
        fill: #666687;
      }

      .c0 svg {
        font-size: 0.625rem;
      }

      <a
        class="c0"
        disabled=""
        href="#"
      >
        <span
          class="c1 c2 c3"
        >
          <span
            aria-hidden="true"
            class="c4"
          >
            <span>
              Left
            </span>
          </span>
          External link
          <span
            aria-hidden="true"
            class="c5"
          >
            <span>
              Right
            </span>
          </span>
        </span>
      </a>
    `);
  });
});
