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

      .c11 {
        padding-top: 12px;
        padding-right: 12px;
        padding-left: 12px;
      }

      .c18 {
        background: #ffffff;
        padding-top: 4px;
        padding-right: 12px;
        padding-bottom: 4px;
        padding-left: 12px;
        border-radius: 4px;
      }

      .c22 {
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

      .c16 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c21 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c7 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c19 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c12 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c12 > * + * {
        margin-top: 16px;
      }

      .c17 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c17 > * + * {
        margin-top: 8px;
      }

      .c10 {
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

      .c15 {
        height: 1rem;
      }

      .c13 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #ffffff;
      }

      .c13 svg path {
        fill: #8e8ea9;
      }

      .c13:hover {
        background: #f6f6f9;
      }

      .c13:hover .c5 {
        color: #4a4a6a;
      }

      .c13:hover svg path {
        fill: #666687;
      }

      .c20 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #f0f0ff;
      }

      .c20 svg path {
        fill: #4945ff;
      }

      .c20:hover {
        background: #f6f6f9;
      }

      .c20:hover .c5 {
        color: #4a4a6a;
      }

      .c20:hover svg path {
        fill: #666687;
      }

      .c14 {
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
              <p
                class="c5 c6 c7"
              >
                Strapi Dashboard
              </p>
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
            class="c10"
          />
        </div>
        <div
          class="c11"
        >
          <ul
            class="c12"
          >
            <li>
              <a
                aria-current="false"
                class="c13"
                href="/content"
              >
                <span
                  class="c2 c14"
                >
                  <span
                    aria-hidden="true"
                    class="c15"
                  >
                    <span>
                      icon
                    </span>
                  </span>
                  <span
                    class="c5 c16"
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
                class="c17"
              >
                <span
                  class="c18"
                >
                  <span
                    class="c5 c16 c7 c19"
                  >
                    Plugins
                  </span>
                </span>
                <ul
                  class="c17"
                >
                  <li>
                    <a
                      aria-current="true"
                      class="c20"
                      href="/builder"
                    >
                      <span
                        class="c2 c14"
                      >
                        <span
                          aria-hidden="true"
                          class="c15"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c21"
                        >
                          Builder
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c13"
                      href="/content"
                    >
                      <span
                        class="c2 c14"
                      >
                        <span
                          aria-hidden="true"
                          class="c15"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c16"
                        >
                          Media library
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c13"
                      href="/content"
                    >
                      <span
                        class="c2 c14"
                      >
                        <span
                          aria-hidden="true"
                          class="c15"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c16"
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
                class="c17"
              >
                <span
                  class="c18"
                >
                  <span
                    class="c5 c16 c7 c19"
                  >
                    General
                  </span>
                </span>
                <ul
                  class="c17"
                >
                  <li>
                    <a
                      aria-current="false"
                      class="c13"
                      href="/builder"
                    >
                      <span
                        class="c2 c14"
                      >
                        <span
                          aria-hidden="true"
                          class="c15"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c16"
                        >
                          Plugins
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c13"
                      href="/content"
                    >
                      <span
                        class="c2 c14"
                      >
                        <span
                          aria-hidden="true"
                          class="c15"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c16"
                        >
                          Marketplace
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c13"
                      href="/content"
                    >
                      <span
                        class="c2 c14"
                      >
                        <span
                          aria-hidden="true"
                          class="c15"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c5 c16"
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
          class="c22"
        >
          <hr
            class="c10"
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

      .c6 {
        padding-top: 12px;
        padding-right: 12px;
        padding-left: 12px;
      }

      .c13 {
        background: #ffffff;
        padding-top: 4px;
        padding-bottom: 4px;
        border-radius: 4px;
      }

      .c15 {
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

      .c7 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c7 > * + * {
        margin-top: 16px;
      }

      .c12 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c12 > * + * {
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

      .c5 {
        height: 1px;
        margin: 0;
        border: none;
      }

      .c9 {
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

      .c11 {
        height: 1rem;
      }

      .c8 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #ffffff;
      }

      .c8 svg path {
        fill: #8e8ea9;
      }

      .c8:hover {
        background: #f6f6f9;
      }

      .c8:hover .c16 {
        color: #4a4a6a;
      }

      .c8:hover svg path {
        fill: #666687;
      }

      .c14 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #f0f0ff;
      }

      .c14 svg path {
        fill: #4945ff;
      }

      .c14:hover {
        background: #f6f6f9;
      }

      .c14:hover .c16 {
        color: #4a4a6a;
      }

      .c14:hover svg path {
        fill: #666687;
      }

      .c10 {
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
            class="c5"
          />
        </div>
        <div
          class="c6"
        >
          <ul
            class="c7"
          >
            <li>
              <a
                aria-current="false"
                aria-labelledby="tooltip-1"
                class="c8"
                href="/content"
                tabindex="0"
              >
                <span
                  class="c9 c10"
                >
                  <span
                    aria-hidden="true"
                    class="c11"
                  >
                    <span>
                      icon
                    </span>
                  </span>
                </span>
              </a>
            </li>
            <li
              class=""
            >
              <div
                class="c12"
              >
                <span
                  class="c13"
                >
                  <hr
                    class="c5"
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
                  class="c12"
                >
                  <li>
                    <a
                      aria-current="true"
                      aria-labelledby="tooltip-1"
                      class="c14"
                      href="/builder"
                      tabindex="0"
                    >
                      <span
                        class="c9 c10"
                      >
                        <span
                          aria-hidden="true"
                          class="c11"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      aria-labelledby="tooltip-1"
                      class="c8"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c9 c10"
                      >
                        <span
                          aria-hidden="true"
                          class="c11"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      aria-labelledby="tooltip-1"
                      class="c8"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c9 c10"
                      >
                        <span
                          aria-hidden="true"
                          class="c11"
                        >
                          <span>
                            icon
                          </span>
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
                class="c12"
              >
                <span
                  class="c13"
                >
                  <hr
                    class="c5"
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
                  class="c12"
                >
                  <li>
                    <a
                      aria-current="false"
                      aria-labelledby="tooltip-1"
                      class="c8"
                      href="/builder"
                      tabindex="0"
                    >
                      <span
                        class="c9 c10"
                      >
                        <span
                          aria-hidden="true"
                          class="c11"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      aria-labelledby="tooltip-1"
                      class="c8"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c9 c10"
                      >
                        <span
                          aria-hidden="true"
                          class="c11"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      aria-labelledby="tooltip-1"
                      class="c8"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c9 c10"
                      >
                        <span
                          aria-hidden="true"
                          class="c11"
                        >
                          <span>
                            icon
                          </span>
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
          class="c15"
        >
          <hr
            class="c5"
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
