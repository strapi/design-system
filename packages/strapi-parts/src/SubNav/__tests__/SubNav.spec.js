import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { SubNav } from '../SubNav';
import { SubNavSections } from '../SubNavSections';
import { SubNavSection } from '../SubNavSection';
import { SubNavLinkSection } from '../SubNavLinkSection';
import { SubNavHeader } from '../SubNavHeader';
import { SubNavLink } from '../SubNavLink';

jest.mock('../../helpers/genId', () => ({
  genId: () => 123,
}));

describe('SubNav', () => {
  it('snapshots the component', () => {
    const links = [
      {
        id: 1,
        label: 'Addresses',
        icon: <span>Addresses</span>,
        to: '/address',
      },
      {
        id: 2,
        label: 'Categories',
        to: '/category',
      },
      {
        id: 3,
        label: 'Cities',
        icon: <span>Cities</span>,
        to: '/city',
      },
      {
        id: 4,
        label: 'Countries',
        to: '/country',
        active: true,
      },
    ];
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider theme={lightTheme}>
          <SubNav ariaLabel="Builder sub nav">
            <SubNavHeader
              searchable
              value=""
              onClear={() => {}}
              onChange={() => {}}
              label="Builder"
              searchLabel="Search..."
            />
            <SubNavSections>
              <SubNavSection label="Collection Type" collapsable badgeLabel={links.length.toString()}>
                {links.map((link) => (
                  <SubNavLink to={link.to} active={link.active} key={link.id}>
                    {link.label}
                  </SubNavLink>
                ))}
              </SubNavSection>
              <SubNavSection label="Single Type" collapsable badgeLabel={links.length.toString()}>
                <SubNavLinkSection label="Default">
                  {links.map((link) => (
                    <SubNavLink to={link.to} key={link.id}>
                      {link.label}
                    </SubNavLink>
                  ))}
                </SubNavLinkSection>
              </SubNavSection>
            </SubNavSections>
          </SubNav>
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        padding-top: 24px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 24px;
      }

      .c6 {
        padding-top: 16px;
      }

      .c7 {
        background: #eaeaef;
      }

      .c10 {
        padding-top: 8px;
        padding-bottom: 16px;
      }

      .c12 {
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 24px;
      }

      .c16 {
        padding-right: 4px;
      }

      .c22 {
        background: #eaeaef;
        color: #666687;
        padding: 4px;
        border-radius: 4px;
      }

      .c26 {
        background: #f6f6f9;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 32px;
      }

      .c29 {
        padding-left: 8px;
      }

      .c30 {
        padding-top: 8px;
        padding-right: 16px;
        padding-bottom: 8px;
        padding-left: 32px;
      }

      .c0 {
        width: 14.5rem;
        background: #f6f6f9;
        height: 100%;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
        border-right: 1px solid #dcdce4;
      }

      .c11 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c11 > * + * {
        margin-top: 8px;
      }

      .c2 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c14 {
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

      .c3 {
        font-weight: 600;
        font-size: 1.125rem;
        line-height: 1.22;
      }

      .c18 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c25 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c34 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c19 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c20 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c23 {
        display: inline-block;
      }

      .c15 {
        border: none;
        padding: 0;
        background: transparent;
      }

      .c21 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-transform: rotateX(0deg);
        -ms-transform: rotateX(0deg);
        transform: rotateX(0deg);
      }

      .c13 {
        max-height: 2rem;
      }

      .c13 svg {
        height: 0.25rem;
      }

      .c13 svg path {
        fill: #8e8ea9;
      }

      .c24 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 1.25rem;
        width: 1rem;
      }

      .c31 {
        max-height: 2rem;
      }

      .c31 svg {
        height: 0.25rem;
      }

      .c31 svg path {
        fill: #4a4a6a;
      }

      .c32 {
        border: none;
        padding: 0;
        background: transparent;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c33 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 0.75rem;
        -webkit-transform: rotateX(0deg);
        -ms-transform: rotateX(0deg);
        transform: rotateX(0deg);
      }

      .c4 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdce4;
      }

      .c4 svg {
        height: 12px;
        width: 12px;
      }

      .c4 svg > g,
      .c4 svg path {
        fill: #ffffff;
      }

      .c4[aria-disabled='true'] {
        pointer-events: none;
      }

      .c5 svg > g,
      .c5 svg path {
        fill: #8e8ea9;
      }

      .c5:hover svg > g,
      .c5:hover svg path {
        fill: #666687;
      }

      .c5:active svg > g,
      .c5:active svg path {
        fill: #a5a5ba;
      }

      .c8 {
        height: 1px;
        margin: 0;
        border: none;
      }

      .c9 {
        width: 1.5rem;
        background-color: #dcdce4;
      }

      .c27 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-text-decoration: none;
        text-decoration: none;
        color: #32324d;
      }

      .c27 svg > * {
        fill: #666687;
      }

      .c27.active {
        background-color: #f0f0ff;
        border-right: 2px solid #4945ff;
      }

      .c27.active svg > * {
        fill: #271fe0;
      }

      .c27.active .c17 {
        color: #271fe0;
        font-weight: 500;
      }

      .c27:focus-visible {
        outline-offset: -2px;
      }

      .c28 {
        width: 0.75rem;
        height: 0.25rem;
      }

      .c28 * {
        fill: #666687;
      }

      <nav
        aria-label="Builder sub nav"
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class="c2"
          >
            <h2
              class="c3"
            >
              Builder
            </h2>
            <span>
              <button
                aria-disabled="false"
                aria-labelledby="tooltip-123"
                class="c4 c5"
                tabindex="0"
              >
                <svg
                  fill="none"
                  height="1em"
                  viewBox="0 0 24 24"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M23.813 20.163l-5.3-5.367a9.792 9.792 0 001.312-4.867C19.825 4.455 15.375 0 9.913 0 4.45 0 0 4.455 0 9.929c0 5.473 4.45 9.928 9.912 9.928a9.757 9.757 0 005.007-1.4l5.275 5.35a.634.634 0 00.913 0l2.706-2.737a.641.641 0 000-.907zM9.91 3.867c3.338 0 6.05 2.718 6.05 6.061s-2.712 6.061-6.05 6.061c-3.337 0-6.05-2.718-6.05-6.06 0-3.344 2.713-6.062 6.05-6.062z"
                    fill="#32324D"
                    fill-rule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
          <div
            class="c6"
          >
            <hr
              class="c7 c8 c9"
            />
          </div>
        </div>
        <div
          class="c10"
        >
          <ul
            class="c11"
          >
            <li>
              <div
                class="c12 c13"
              >
                <div
                  class="c2"
                >
                  <button
                    aria-controls="list-123"
                    aria-expanded="true"
                    class="c14 c15"
                  >
                    <div
                      class="c16"
                    >
                      <span
                        class="c17 c18 c19 c20"
                      >
                        Collection Type
                      </span>
                    </div>
                    <div
                      class="c21"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="1em"
                        viewBox="0 0 14 8"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                          fill="#32324D"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                  <div
                    class="c22 c23 c24"
                  >
                    <span
                      class="c17 c25 c19 c20"
                    >
                      4
                    </span>
                  </div>
                </div>
              </div>
              <ul
                id="list-123"
              >
                <li>
                  <a
                    class="c26 c27"
                    href="/address"
                  >
                    <div
                      class="c14"
                    >
                      <svg
                        class="c28"
                        fill="none"
                        height="1em"
                        viewBox="0 0 4 4"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          fill="#A5A5BA"
                          height="4"
                          rx="2"
                          width="4"
                        />
                      </svg>
                      <div
                        class="c29"
                      >
                        <span
                          class="c17 c25"
                        >
                          Addresses
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    class="c26 c27"
                    href="/category"
                  >
                    <div
                      class="c14"
                    >
                      <svg
                        class="c28"
                        fill="none"
                        height="1em"
                        viewBox="0 0 4 4"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          fill="#A5A5BA"
                          height="4"
                          rx="2"
                          width="4"
                        />
                      </svg>
                      <div
                        class="c29"
                      >
                        <span
                          class="c17 c25"
                        >
                          Categories
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    class="c26 c27"
                    href="/city"
                  >
                    <div
                      class="c14"
                    >
                      <svg
                        class="c28"
                        fill="none"
                        height="1em"
                        viewBox="0 0 4 4"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          fill="#A5A5BA"
                          height="4"
                          rx="2"
                          width="4"
                        />
                      </svg>
                      <div
                        class="c29"
                      >
                        <span
                          class="c17 c25"
                        >
                          Cities
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    class="c26 c27"
                    href="/country"
                  >
                    <div
                      class="c14"
                    >
                      <svg
                        class="c28"
                        fill="none"
                        height="1em"
                        viewBox="0 0 4 4"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          fill="#A5A5BA"
                          height="4"
                          rx="2"
                          width="4"
                        />
                      </svg>
                      <div
                        class="c29"
                      >
                        <span
                          class="c17 c25"
                        >
                          Countries
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div
                class="c12 c13"
              >
                <div
                  class="c2"
                >
                  <button
                    aria-controls="list-123"
                    aria-expanded="true"
                    class="c14 c15"
                  >
                    <div
                      class="c16"
                    >
                      <span
                        class="c17 c18 c19 c20"
                      >
                        Single Type
                      </span>
                    </div>
                    <div
                      class="c21"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        height="1em"
                        viewBox="0 0 14 8"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clip-rule="evenodd"
                          d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                          fill="#32324D"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                  <div
                    class="c22 c23 c24"
                  >
                    <span
                      class="c17 c25 c19 c20"
                    >
                      4
                    </span>
                  </div>
                </div>
              </div>
              <ul
                id="list-123"
              >
                <li>
                  <div
                    class="c30 c31"
                  >
                    <div
                      class="c2"
                    >
                      <button
                        aria-controls="list-123"
                        aria-expanded="true"
                        class="c32"
                      >
                        <div
                          class="c33"
                        >
                          <svg
                            aria-hidden="true"
                            fill="none"
                            height="1em"
                            viewBox="0 0 14 8"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                              fill="#32324D"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <div
                          class="c29"
                        >
                          <span
                            class="c17 c34"
                          >
                            Default
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <ul
                    id="list-123"
                  >
                    <li>
                      <a
                        class="c26 c27"
                        href="/address"
                      >
                        <div
                          class="c14"
                        >
                          <svg
                            class="c28"
                            fill="none"
                            height="1em"
                            viewBox="0 0 4 4"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              fill="#A5A5BA"
                              height="4"
                              rx="2"
                              width="4"
                            />
                          </svg>
                          <div
                            class="c29"
                          >
                            <span
                              class="c17 c25"
                            >
                              Addresses
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        class="c26 c27"
                        href="/category"
                      >
                        <div
                          class="c14"
                        >
                          <svg
                            class="c28"
                            fill="none"
                            height="1em"
                            viewBox="0 0 4 4"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              fill="#A5A5BA"
                              height="4"
                              rx="2"
                              width="4"
                            />
                          </svg>
                          <div
                            class="c29"
                          >
                            <span
                              class="c17 c25"
                            >
                              Categories
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        class="c26 c27"
                        href="/city"
                      >
                        <div
                          class="c14"
                        >
                          <svg
                            class="c28"
                            fill="none"
                            height="1em"
                            viewBox="0 0 4 4"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              fill="#A5A5BA"
                              height="4"
                              rx="2"
                              width="4"
                            />
                          </svg>
                          <div
                            class="c29"
                          >
                            <span
                              class="c17 c25"
                            >
                              Cities
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        class="c26 c27"
                        href="/country"
                      >
                        <div
                          class="c14"
                        >
                          <svg
                            class="c28"
                            fill="none"
                            height="1em"
                            viewBox="0 0 4 4"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              fill="#A5A5BA"
                              height="4"
                              rx="2"
                              width="4"
                            />
                          </svg>
                          <div
                            class="c29"
                          >
                            <span
                              class="c17 c25"
                            >
                              Countries
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    `);
  });
});
