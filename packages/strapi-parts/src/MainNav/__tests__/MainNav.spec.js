import * as React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MainNav } from '../MainNav';
import { NavSection } from '../NavSection';
import { NavSections } from '../NavSections';
import { NavLink } from '../NavLink';
import { NavBrand } from '../NavBrand';
import { Box } from '../../Box';
import { Divider } from '../../Divider';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('MainNav', () => {
  it('snapshots the component in full size', () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <MainNav condensed={false}>
            <NavBrand workplace="Workplace" title="Strapi Dashboard" icon={<span>icon</span>} />
            <Box paddingBottom={3}>
              <Divider />
            </Box>
            <NavSections>
              <NavLink to="/content" icon={<span>icon</span>}>
                Content
              </NavLink>
              <NavSection label="Plugins">
                <NavLink to="/builder" icon={<span>icon</span>}>
                  Builder
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Media library
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Documentation
                </NavLink>
              </NavSection>
              <NavSection label="General">
                <NavLink to="/builder" icon={<span>icon</span>}>
                  Plugins
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Marketplace
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Settings
                </NavLink>
              </NavSection>
            </NavSections>
            <Box paddingTop={3} paddingBottom={3}>
              <Divider />
            </Box>
            <Box>
              <button onClick={() => {}}>{`<`}</button>
            </Box>
          </MainNav>
        </ThemeProvider>
      </BrowserRouter>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        padding-top: 16px;
        padding-right: 12px;
        padding-bottom: 16px;
        padding-left: 12px;
      }

      .c4 {
        padding-left: 8px;
      }

      .c11 {
        padding-bottom: 12px;
      }

      .c12 {
        background: #eaeaef;
      }

      .c14 {
        padding-top: 12px;
        padding-right: 12px;
        padding-left: 12px;
      }

      .c18 {
        padding-right: 12px;
      }

      .c21 {
        background: #ffffff;
        padding-top: 4px;
        padding-right: 12px;
        padding-bottom: 4px;
        padding-left: 12px;
        border-radius: 4px;
      }

      .c24 {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .c0 {
        width: 14rem;
        background: #ffffff;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        height: 100vh;
        z-index: 2;
      }

      .c6 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c10 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c22 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c7 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c23 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c15 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c15 > * + * {
        margin-top: 16px;
      }

      .c20 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c20 > * + * {
        margin-top: 8px;
      }

      .c9 {
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

      .c13 {
        height: 1px;
        margin: 0;
        border: none;
      }

      .c2 {
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

      .c19 {
        height: 1rem;
      }

      .c16 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #ffffff;
      }

      .c16 .c5 {
        color: #666687;
      }

      .c16 svg path {
        fill: #8e8ea9;
      }

      .c16:hover {
        background: #f6f6f9;
      }

      .c16:hover .c5 {
        color: #4a4a6a;
      }

      .c16:hover svg path {
        fill: #666687;
      }

      .c16.active {
        background: #f0f0ff;
      }

      .c16.active svg path {
        fill: #4945ff;
      }

      .c16.active .c5 {
        color: #4945ff;
        font-weight: 500;
      }

      .c17 {
        padding: 8px 12px;
      }

      .c3 {
        border-radius: 4px;
      }

      .c3 svg,
      .c3 img {
        height: 2rem;
        width: 2rem;
      }

      .c8 {
        -webkit-text-decoration: unset;
        text-decoration: unset;
        color: inherit;
      }

      <nav
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class="c2"
          >
            <a
              aria-current="page"
              aria-hidden="true"
              class="c3 active"
              href="/"
              tabindex="-1"
            >
              <span>
                icon
              </span>
            </a>
            <div
              class="c4"
            >
              <span
                class="c5 c6 c7"
              >
                <a
                  aria-current="page"
                  class="c8 active"
                  href="/"
                >
                  Strapi Dashboard
                  <span
                    class="c9"
                  >
                    Workplace
                  </span>
                </a>
              </span>
              <p
                aria-hidden="true"
                class="c5 c10"
              >
                Workplace
              </p>
            </div>
          </div>
        </div>
        <div
          class="c11"
        >
          <hr
            class="c12 c13"
          />
        </div>
        <div
          class="c14"
        >
          <ul
            class="c15"
          >
            <li>
              <a
                class="c16"
                href="/content"
              >
                <span
                  class="c2 c17"
                >
                  <span
                    aria-hidden="true"
                    class="c18 c19"
                  >
                    <span>
                      icon
                    </span>
                  </span>
                  <span
                    class="c5 c6"
                  >
                    Content
                  </span>
                </span>
              </a>
            </li>
            <li
              class=""
            >
              <div
                class="c20"
              >
                <span
                  class="c21"
                >
                  <span
                    class="c5 c22 c7 c23"
                  >
                    Plugins
                  </span>
                </span>
                <ul
                  class="c20"
                >
                  <li>
                    <a
                      class="c16"
                      href="/builder"
                    >
                      <span
                        class="c2 c17"
                      >
                        <span
                          aria-hidden="true"
                          class="c18 c19"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c6"
                        >
                          Builder
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="c16"
                      href="/content"
                    >
                      <span
                        class="c2 c17"
                      >
                        <span
                          aria-hidden="true"
                          class="c18 c19"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c6"
                        >
                          Media library
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="c16"
                      href="/content"
                    >
                      <span
                        class="c2 c17"
                      >
                        <span
                          aria-hidden="true"
                          class="c18 c19"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c6"
                        >
                          Documentation
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li
              class=""
            >
              <div
                class="c20"
              >
                <span
                  class="c21"
                >
                  <span
                    class="c5 c22 c7 c23"
                  >
                    General
                  </span>
                </span>
                <ul
                  class="c20"
                >
                  <li>
                    <a
                      class="c16"
                      href="/builder"
                    >
                      <span
                        class="c2 c17"
                      >
                        <span
                          aria-hidden="true"
                          class="c18 c19"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c6"
                        >
                          Plugins
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="c16"
                      href="/content"
                    >
                      <span
                        class="c2 c17"
                      >
                        <span
                          aria-hidden="true"
                          class="c18 c19"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c6"
                        >
                          Marketplace
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="c16"
                      href="/content"
                    >
                      <span
                        class="c2 c17"
                      >
                        <span
                          aria-hidden="true"
                          class="c18 c19"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c6"
                        >
                          Settings
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="c24"
        >
          <hr
            class="c12 c13"
          />
        </div>
        <div
          class=""
        >
          <button>
            &lt;
          </button>
        </div>
      </nav>
    `);
  });

  it('snapshots the component in condensed size', () => {
    const { container } = render(
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <MainNav condensed={true}>
            <NavBrand workplace="Workplace" title="Strapi Dashboard" icon={<span>icon</span>} />
            <Box paddingBottom={3}>
              <Divider />
            </Box>
            <NavSections>
              <NavLink to="/content" icon={<span>icon</span>}>
                Content
              </NavLink>
              <NavSection label="Plugins">
                <NavLink to="/builder" icon={<span>icon</span>}>
                  Builder
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Media library
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Documentation
                </NavLink>
              </NavSection>
              <NavSection label="General">
                <NavLink to="/builder" icon={<span>icon</span>}>
                  Plugins
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Marketplace
                </NavLink>
                <NavLink to="/content" icon={<span>icon</span>}>
                  Settings
                </NavLink>
              </NavSection>
            </NavSections>
            <Box paddingTop={3} paddingBottom={3}>
              <Divider />
            </Box>
            <Box>
              <button onClick={() => {}}>{`<`}</button>
            </Box>
          </MainNav>
        </ThemeProvider>
      </BrowserRouter>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        padding-top: 16px;
        padding-right: 12px;
        padding-bottom: 16px;
        padding-left: 12px;
      }

      .c4 {
        padding-bottom: 12px;
      }

      .c5 {
        background: #eaeaef;
      }

      .c7 {
        padding-top: 12px;
        padding-right: 12px;
        padding-left: 12px;
      }

      .c12 {
        padding-right: 0px;
      }

      .c15 {
        background: #ffffff;
        padding-top: 4px;
        padding-bottom: 4px;
        border-radius: 4px;
      }

      .c16 {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .c0 {
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        background: #ffffff;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        height: 100vh;
        z-index: 2;
      }

      .c8 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c8 > * + * {
        margin-top: 16px;
      }

      .c14 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c14 > * + * {
        margin-top: 8px;
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

      .c6 {
        height: 1px;
        margin: 0;
        border: none;
      }

      .c10 {
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

      .c13 {
        height: 1rem;
      }

      .c9 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #ffffff;
      }

      .c9 .c17 {
        color: #666687;
      }

      .c9 svg path {
        fill: #8e8ea9;
      }

      .c9:hover {
        background: #f6f6f9;
      }

      .c9:hover .c17 {
        color: #4a4a6a;
      }

      .c9:hover svg path {
        fill: #666687;
      }

      .c9.active {
        background: #f0f0ff;
      }

      .c9.active svg path {
        fill: #4945ff;
      }

      .c9.active .c17 {
        color: #4945ff;
        font-weight: 500;
      }

      .c11 {
        padding: 8px 12px;
      }

      .c2 {
        border-radius: 4px;
      }

      .c2 svg,
      .c2 img {
        height: 2.5rem;
        width: 2.5rem;
      }

      <nav
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class="c2"
          >
            <a
              aria-current="page"
              class="active"
              href="/"
            >
              <span>
                icon
              </span>
              <div
                class="c3"
              >
                <span>
                  Strapi Dashboard
                </span>
                <span>
                  Workplace
                </span>
              </div>
            </a>
          </div>
        </div>
        <div
          class="c4"
        >
          <hr
            class="c5 c6"
          />
        </div>
        <div
          class="c7"
        >
          <ul
            class="c8"
          >
            <li>
              <span>
                <a
                  aria-labelledby="tooltip-1"
                  class="c9"
                  href="/content"
                  tabindex="0"
                >
                  <span
                    class="c10 c11"
                  >
                    <span
                      aria-hidden="true"
                      class="c12 c13"
                    >
                      <span>
                        icon
                      </span>
                    </span>
                  </span>
                </a>
              </span>
            </li>
            <li
              class=""
            >
              <div
                class="c14"
              >
                <span
                  class="c15"
                >
                  <hr
                    class="c5 c6"
                  />
                  <div
                    class="c3"
                  >
                    <span>
                      Plugins
                    </span>
                  </div>
                </span>
                <ul
                  class="c14"
                >
                  <li>
                    <span>
                      <a
                        aria-labelledby="tooltip-3"
                        class="c9"
                        href="/builder"
                        tabindex="0"
                      >
                        <span
                          class="c10 c11"
                        >
                          <span
                            aria-hidden="true"
                            class="c12 c13"
                          >
                            <span>
                              icon
                            </span>
                          </span>
                        </span>
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a
                        aria-labelledby="tooltip-5"
                        class="c9"
                        href="/content"
                        tabindex="0"
                      >
                        <span
                          class="c10 c11"
                        >
                          <span
                            aria-hidden="true"
                            class="c12 c13"
                          >
                            <span>
                              icon
                            </span>
                          </span>
                        </span>
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a
                        aria-labelledby="tooltip-7"
                        class="c9"
                        href="/content"
                        tabindex="0"
                      >
                        <span
                          class="c10 c11"
                        >
                          <span
                            aria-hidden="true"
                            class="c12 c13"
                          >
                            <span>
                              icon
                            </span>
                          </span>
                        </span>
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
            <li
              class=""
            >
              <div
                class="c14"
              >
                <span
                  class="c15"
                >
                  <hr
                    class="c5 c6"
                  />
                  <div
                    class="c3"
                  >
                    <span>
                      General
                    </span>
                  </div>
                </span>
                <ul
                  class="c14"
                >
                  <li>
                    <span>
                      <a
                        aria-labelledby="tooltip-9"
                        class="c9"
                        href="/builder"
                        tabindex="0"
                      >
                        <span
                          class="c10 c11"
                        >
                          <span
                            aria-hidden="true"
                            class="c12 c13"
                          >
                            <span>
                              icon
                            </span>
                          </span>
                        </span>
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a
                        aria-labelledby="tooltip-11"
                        class="c9"
                        href="/content"
                        tabindex="0"
                      >
                        <span
                          class="c10 c11"
                        >
                          <span
                            aria-hidden="true"
                            class="c12 c13"
                          >
                            <span>
                              icon
                            </span>
                          </span>
                        </span>
                      </a>
                    </span>
                  </li>
                  <li>
                    <span>
                      <a
                        aria-labelledby="tooltip-13"
                        class="c9"
                        href="/content"
                        tabindex="0"
                      >
                        <span
                          class="c10 c11"
                        >
                          <span
                            aria-hidden="true"
                            class="c12 c13"
                          >
                            <span>
                              icon
                            </span>
                          </span>
                        </span>
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="c16"
        >
          <hr
            class="c5 c6"
          />
        </div>
        <div
          class=""
        >
          <button>
            &lt;
          </button>
        </div>
      </nav>
    `);
  });
});
