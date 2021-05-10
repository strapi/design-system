import * as React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumbs, BreadCrumbItem } from '../Breadcrumbs';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('../../helpers/genId', () => ({
  genId: () => 123,
}));

describe('Breadcrumbs', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Breadcrumbs>
          <BreadCrumbItem>Home</BreadCrumbItem>
          <BreadCrumbItem>first</BreadCrumbItem>
          <BreadCrumbItem>second</BreadCrumbItem>
        </Breadcrumbs>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c2 {
        padding-right: 4px;
        padding-left: 4px;
      }

      .c0 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      <nav
        id="breadcrumbs-123"
      >
        <ol>
          <li
            class="c0"
          >
            <p
              class="c1"
            >
              Home
            </p>
            <div
              class="c2"
            >
              /
            </div>
          </li>
          <li
            class="c0"
          >
            <p
              class="c1"
            >
              first
            </p>
            <div
              class="c2"
            >
              /
            </div>
          </li>
          <li
            class="c0"
          >
            <p
              class="c1"
            >
              second
            </p>
          </li>
        </ol>
      </nav>
    `);
  });
});
