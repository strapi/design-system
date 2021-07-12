import * as React from 'react';
import { render } from '@testing-library/react';
import { MainNav } from '../MainNav';
import { NavSection } from '../NavSection';
import { NavSections } from '../NavSections';
import { NavLink } from '../NavLink';
import { NavBrand } from '../NavBrand';
import { Box } from '../../Box';
import { Divider } from '../../Divider';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

jest.mock('uuid', () => ({
  v4: () => 1,
}));

describe('MainNav', () => {
  it('snapshots the component in full size', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <MainNav condensed={false}>
          <NavBrand workplace="Workplace" title="Strapi Dashboard" icon={<span>icon</span>} />
          <Box paddingBottom={3}>
            <Divider />
          </Box>
          <NavSections>
            <NavLink href="/content" icon={<span>icon</span>}>
              Content
            </NavLink>
            <NavSection label="Plugins">
              <NavLink href="/builder" icon={<span>icon</span>} active>
                Builder
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
                Media library
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
                Documentation
              </NavLink>
            </NavSection>
            <NavSection label="General">
              <NavLink href="/builder" icon={<span>icon</span>}>
                Plugins
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
                Marketplace
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
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
      </ThemeProvider>,
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

      .c9 {
        padding-bottom: 12px;
      }

      .c10 {
        background: #eaeaef;
      }

      .c12 {
        padding-top: 12px;
        padding-right: 12px;
        padding-left: 12px;
      }

      .c16 {
        padding-right: 12px;
      }

      .c20 {
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
        height: 100%;
        position: relative;
      }

      .c6 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c8 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c18 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c23 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c7 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c21 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c13 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c13 > * + * {
        margin-top: 16px;
      }

      .c19 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c19 > * + * {
        margin-top: 8px;
      }

      .c11 {
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

      .c17 {
        height: 1rem;
      }

      .c14 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #ffffff;
      }

      .c14 svg path {
        fill: #8e8ea9;
      }

      .c14:hover {
        background: #f6f6f9;
      }

      .c14:hover .c5 {
        color: #4a4a6a;
      }

      .c14:hover svg path {
        fill: #666687;
      }

      .c22 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #f0f0ff;
      }

      .c22 svg path {
        fill: #4945ff;
      }

      .c22:hover {
        background: #f6f6f9;
      }

      .c22:hover .c5 {
        color: #4a4a6a;
      }

      .c22:hover svg path {
        fill: #666687;
      }

      .c15 {
        padding: 8px 12px;
      }

      .c3 {
        border-radius: 4px;
        overflow: hidden;
      }

      .c3 svg,
      .c3 img {
        height: 2rem;
        width: 2rem;
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
            <div
              aria-hidden="true"
              class="c3"
            >
              <span>
                icon
              </span>
            </div>
            <div
              class="c4"
            >
              <span
                class="c5 c6 c7"
              >
                Strapi Dashboard
              </span>
              <p
                class="c5 c8"
              >
                Workplace
              </p>
            </div>
          </div>
        </div>
        <div
          class="c9"
        >
          <hr
            class="c10 c11"
          />
        </div>
        <div
          class="c12"
        >
          <ul
            class="c13"
          >
            <li>
              <a
                aria-current="false"
                class="c14"
                href="/content"
              >
                <span
                  class="c2 c15"
                >
                  <span
                    aria-hidden="true"
                    class="c16 c17"
                  >
                    <span>
                      icon
                    </span>
                  </span>
                  <span
                    class="c5 c18"
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
                class="c19"
              >
                <span
                  class="c20"
                >
                  <span
                    class="c5 c18 c7 c21"
                  >
                    Plugins
                  </span>
                </span>
                <ul
                  class="c19"
                >
                  <li>
                    <a
                      aria-current="true"
                      class="c22"
                      href="/builder"
                    >
                      <span
                        class="c2 c15"
                      >
                        <span
                          aria-hidden="true"
                          class="c16 c17"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c23"
                        >
                          Builder
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c14"
                      href="/content"
                    >
                      <span
                        class="c2 c15"
                      >
                        <span
                          aria-hidden="true"
                          class="c16 c17"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c18"
                        >
                          Media library
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c14"
                      href="/content"
                    >
                      <span
                        class="c2 c15"
                      >
                        <span
                          aria-hidden="true"
                          class="c16 c17"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c18"
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
                class="c19"
              >
                <span
                  class="c20"
                >
                  <span
                    class="c5 c18 c7 c21"
                  >
                    General
                  </span>
                </span>
                <ul
                  class="c19"
                >
                  <li>
                    <a
                      aria-current="false"
                      class="c14"
                      href="/builder"
                    >
                      <span
                        class="c2 c15"
                      >
                        <span
                          aria-hidden="true"
                          class="c16 c17"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c18"
                        >
                          Plugins
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c14"
                      href="/content"
                    >
                      <span
                        class="c2 c15"
                      >
                        <span
                          aria-hidden="true"
                          class="c16 c17"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c18"
                        >
                          Marketplace
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c14"
                      href="/content"
                    >
                      <span
                        class="c2 c15"
                      >
                        <span
                          aria-hidden="true"
                          class="c16 c17"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c18"
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
            class="c10 c11"
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
      <ThemeProvider theme={lightTheme}>
        <MainNav condensed={true}>
          <NavBrand workplace="Workplace" title="Strapi Dashboard" icon={<span>icon</span>} />
          <Box paddingBottom={3}>
            <Divider />
          </Box>
          <NavSections>
            <NavLink href="/content" icon={<span>icon</span>}>
              Content
            </NavLink>
            <NavSection label="Plugins">
              <NavLink href="/builder" icon={<span>icon</span>} active>
                Builder
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
                Media library
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
                Documentation
              </NavLink>
            </NavSection>
            <NavSection label="General">
              <NavLink href="/builder" icon={<span>icon</span>}>
                Plugins
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
                Marketplace
              </NavLink>
              <NavLink href="/content" icon={<span>icon</span>}>
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
      </ThemeProvider>,
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

      .c17 {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .c0 {
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        background: #ffffff;
        height: 100%;
        position: relative;
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

      .c9 svg path {
        fill: #8e8ea9;
      }

      .c9:hover {
        background: #f6f6f9;
      }

      .c9:hover .c18 {
        color: #4a4a6a;
      }

      .c9:hover svg path {
        fill: #666687;
      }

      .c16 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #f0f0ff;
      }

      .c16 svg path {
        fill: #4945ff;
      }

      .c16:hover {
        background: #f6f6f9;
      }

      .c16:hover .c18 {
        color: #4a4a6a;
      }

      .c16:hover svg path {
        fill: #666687;
      }

      .c11 {
        padding: 8px 12px;
      }

      .c2 {
        border-radius: 4px;
        overflow: hidden;
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
            aria-hidden="true"
            class="c2"
          >
            <span>
              icon
            </span>
          </div>
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
                  aria-current="false"
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
                        aria-current="true"
                        aria-labelledby="tooltip-1"
                        class="c16"
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
                        aria-current="false"
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
                  <li>
                    <span>
                      <a
                        aria-current="false"
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
                        aria-current="false"
                        aria-labelledby="tooltip-1"
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
                        aria-current="false"
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
                  <li>
                    <span>
                      <a
                        aria-current="false"
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
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="c17"
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
