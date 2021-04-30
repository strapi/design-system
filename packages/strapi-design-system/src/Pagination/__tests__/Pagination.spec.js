import * as React from 'react';
import { render } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { PreviousLink, NextLink, PageLink, Dots } from '../components';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Pagination', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Pagination activePage={2}>
          <PreviousLink href="/1">Go to previous page</PreviousLink>
          <PageLink number={1} href="/1">
            Page 1
          </PageLink>
          <PageLink number={2} href="/2">
            Page 2
          </PageLink>
          <PageLink number={3} href="/3">
            Page 3
          </PageLink>
          <Dots>There are pages in between</Dots>
          <PageLink number={4} href="/4">
            Page 4
          </PageLink>
          <NextLink href="/3">Go to next page</NextLink>
        </Pagination>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c1 > * + * {
        margin-left: 4px;
      }

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

      .c4 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c7 {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c2 {
        padding: 12px;
        background: #f6f6f9;
        border-radius: 4px;
        color: #32324d;
        -webkit-text-decoration: none;
        text-decoration: none;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c6 {
        padding: 12px;
        background: #ffffff;
        border-radius: 4px;
        color: #4945ff;
        box-shadow: 0px 1px 4px rgba(26,26,67,0.1);
        -webkit-text-decoration: none;
        text-decoration: none;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c5 {
        line-height: revert;
      }

      <nav
        aria-label="pagination"
        class=""
      >
        <ul
          class="c0 c1"
        >
          <li>
            <a
              class="c2"
              href="/1"
            >
              <div
                class="c3"
              >
                Go to previous page
              </div>
              <img
                aria-hidden="true"
                src="test-file-stub"
              />
            </a>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2"
              href="/1"
            >
              <div
                class="c3"
              >
                Page 1
              </div>
              <p
                aria-hidden="true"
                class="c4 c5"
              >
                1
              </p>
            </a>
          </li>
          <li>
            <a
              aria-current="true"
              class="c6"
              href="/2"
            >
              <div
                class="c3"
              >
                Page 2
              </div>
              <p
                aria-hidden="true"
                class="c7 c5"
              >
                2
              </p>
            </a>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2"
              href="/3"
            >
              <div
                class="c3"
              >
                Page 3
              </div>
              <p
                aria-hidden="true"
                class="c4 c5"
              >
                3
              </p>
            </a>
          </li>
          <li>
            <div
              class="c2"
            >
              <div
                class="c3"
              >
                There are pages in between
              </div>
              <p
                aria-hidden="true"
                class="c4 c5"
              >
                …
              </p>
            </div>
          </li>
          <li>
            <a
              aria-current="false"
              class="c2"
              href="/4"
            >
              <div
                class="c3"
              >
                Page 4
              </div>
              <p
                aria-hidden="true"
                class="c4 c5"
              >
                4
              </p>
            </a>
          </li>
          <li>
            <a
              class="c2"
              href="/3"
            >
              <div
                class="c3"
              >
                Go to next page
              </div>
              <img
                aria-hidden="true"
                src="test-file-stub"
              />
            </a>
          </li>
        </ul>
      </nav>
    `);
  });
});
