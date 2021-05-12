/* eslint-disable react/display-name */
import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumbs, Crumb } from '../Breadcrumbs';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('@strapi/icons', () => ({
  After: () => <span>After</span>,
}));

jest.mock('../../helpers/genId', () => ({
  genId: () => 123,
}));

describe('Breadcrumbs', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Breadcrumbs>
          <Crumb>Home</Crumb>
          <Crumb>first</Crumb>
          <Crumb>second</Crumb>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c4 {
        padding-right: 12px;
        padding-left: 12px;
      }

      .c0 {
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

      .c1 svg {
        height: 10px;
        width: 10px;
      }

      .c1 svg path {
        fill: #c0c0cf;
      }

      .c1:last-of-type .c3 {
        display: none;
      }

      <ol>
        <li
          class="c0 c1"
        >
          <p
            class="c2"
            color="neutral800"
          >
            Home
          </p>
          <div
            class="c3 c4"
          >
            <span>
              After
            </span>
          </div>
        </li>
        <li
          class="c0 c1"
        >
          <p
            class="c2"
            color="neutral800"
          >
            first
          </p>
          <div
            class="c3 c4"
          >
            <span>
              After
            </span>
          </div>
        </li>
        <li
          class="c0 c1"
        >
          <p
            class="c2"
            color="neutral800"
          >
            second
          </p>
          <div
            class="c3 c4"
          >
            <span>
              After
            </span>
          </div>
        </li>
      </ol>
    `);
  });
});
