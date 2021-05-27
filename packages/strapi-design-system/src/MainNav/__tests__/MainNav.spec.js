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
      .c2 {
        padding-top: 16px;
        padding-right: 12px;
        padding-bottom: 16px;
        padding-left: 12px;
      }

      .c5 {
        padding-left: 8px;
      }

      .c10 {
        padding-bottom: 12px;
      }

      .c11 {
        background: #eaeaef;
      }

      .c13 {
        padding-right: 12px;
        padding-left: 12px;
      }

      .c17 {
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

      .c25 {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .c0 {
        display: grid;
        grid-template-rows: auto auto 1fr auto auto;
      }

      .c1 {
        width: 14rem;
        background: #ffffff;
        height: 100%;
      }

      .c7 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #32324d;
      }

      .c9 {
        font-weight: 400;
        font-size: 0.75rem;
        line-height: 1.33;
        color: #666687;
      }

      .c19 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c24 {
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c8 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c22 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c14 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c14 > * + * {
        margin-top: 16px;
      }

      .c20 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c20 > * + * {
        margin-top: 8px;
      }

      .c12 {
        height: 1px;
        margin: 0;
        border: none;
      }

      .c3 {
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

      .c18 {
        height: 1rem;
      }

      .c15 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #ffffff;
      }

      .c15 svg path {
        fill: #8e8ea9;
      }

      .c15:hover {
        background: #f6f6f9;
      }

      .c15:hover .c6 {
        color: #4a4a6a;
      }

      .c15:hover svg path {
        fill: #666687;
      }

      .c23 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #f0f0ff;
      }

      .c23 svg path {
        fill: #4945ff;
      }

      .c23:hover {
        background: #f6f6f9;
      }

      .c23:hover .c6 {
        color: #4a4a6a;
      }

      .c23:hover svg path {
        fill: #666687;
      }

      .c16 {
        padding: 8px 12px;
      }

      .c4 {
        border-radius: 4px;
        overflow: hidden;
      }

      .c4 svg,
      .c4 img {
        height: 2rem;
        width: 2rem;
      }

      <nav
        class="c0 c1"
      >
        <div
          class="c2"
        >
          <div
            class="c3"
          >
            <div
              aria-hidden="true"
              class="c4"
            >
              <span>
                icon
              </span>
            </div>
            <div
              class="c5"
            >
              <p
                class="c6 c7 c8"
              >
                Strapi Dashboard
              </p>
              <p
                class="c6 c9"
              >
                Workplace
              </p>
            </div>
          </div>
        </div>
        <div
          class="c10"
        >
          <hr
            class="c11 c12"
          />
        </div>
        <div
          class="c13"
        >
          <ul
            class="c14"
          >
            <li>
              <a
                aria-current="false"
                class="c15"
                href="/content"
              >
                <span
                  class="c3 c16"
                >
                  <span
                    aria-hidden="true"
                    class="c17 c18"
                  >
                    <span>
                      icon
                    </span>
                  </span>
                  <span
                    class="c6 c19"
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
                    class="c6 c19 c8 c22"
                  >
                    Plugins
                  </span>
                </span>
                <ul
                  class="c20"
                >
                  <li>
                    <a
                      aria-current="true"
                      class="c23"
                      href="/builder"
                    >
                      <span
                        class="c3 c16"
                      >
                        <span
                          aria-hidden="true"
                          class="c17 c18"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c6 c24"
                        >
                          Builder
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c15"
                      href="/content"
                    >
                      <span
                        class="c3 c16"
                      >
                        <span
                          aria-hidden="true"
                          class="c17 c18"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c6 c19"
                        >
                          Media library
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c15"
                      href="/content"
                    >
                      <span
                        class="c3 c16"
                      >
                        <span
                          aria-hidden="true"
                          class="c17 c18"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c6 c19"
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
                    class="c6 c19 c8 c22"
                  >
                    General
                  </span>
                </span>
                <ul
                  class="c20"
                >
                  <li>
                    <a
                      aria-current="false"
                      class="c15"
                      href="/builder"
                    >
                      <span
                        class="c3 c16"
                      >
                        <span
                          aria-hidden="true"
                          class="c17 c18"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c6 c19"
                        >
                          Plugins
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c15"
                      href="/content"
                    >
                      <span
                        class="c3 c16"
                      >
                        <span
                          aria-hidden="true"
                          class="c17 c18"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c6 c19"
                        >
                          Marketplace
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      aria-current="false"
                      class="c15"
                      href="/content"
                    >
                      <span
                        class="c3 c16"
                      >
                        <span
                          aria-hidden="true"
                          class="c17 c18"
                        >
                          <span>
                            icon
                          </span>
                        </span>
                        <span
                          class="c6 c19"
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
          class="c25"
        >
          <hr
            class="c11 c12"
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
      .c2 {
        padding-top: 16px;
        padding-right: 12px;
        padding-bottom: 16px;
        padding-left: 12px;
      }

      .c5 {
        padding-bottom: 12px;
      }

      .c6 {
        background: #eaeaef;
      }

      .c8 {
        padding-right: 12px;
        padding-left: 12px;
      }

      .c13 {
        padding-right: 0px;
      }

      .c16 {
        background: #ffffff;
        padding-top: 4px;
        padding-bottom: 4px;
        border-radius: 4px;
      }

      .c18 {
        padding-top: 12px;
        padding-bottom: 12px;
      }

      .c0 {
        display: grid;
        grid-template-rows: auto auto 1fr auto auto;
      }

      .c1 {
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        background: #ffffff;
        height: 100%;
      }

      .c9 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c9 > * + * {
        margin-top: 16px;
      }

      .c15 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c15 > * + * {
        margin-top: 8px;
      }

      .c4 {
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

      .c7 {
        height: 1px;
        margin: 0;
        border: none;
      }

      .c11 {
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

      .c14 {
        height: 1rem;
      }

      .c10 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #ffffff;
      }

      .c10 svg path {
        fill: #8e8ea9;
      }

      .c10:hover {
        background: #f6f6f9;
      }

      .c10:hover .c19 {
        color: #4a4a6a;
      }

      .c10:hover svg path {
        fill: #666687;
      }

      .c17 {
        -webkit-text-decoration: none;
        text-decoration: none;
        display: block;
        border-radius: 4px;
        background: #f0f0ff;
      }

      .c17 svg path {
        fill: #4945ff;
      }

      .c17:hover {
        background: #f6f6f9;
      }

      .c17:hover .c19 {
        color: #4a4a6a;
      }

      .c17:hover svg path {
        fill: #666687;
      }

      .c12 {
        padding: 8px 12px;
      }

      .c3 {
        border-radius: 4px;
        overflow: hidden;
      }

      .c3 svg,
      .c3 img {
        height: 2.5rem;
        width: 2.5rem;
      }

      <nav
        class="c0 c1"
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
            <span>
              Strapi Dashboard
            </span>
            <span>
              Workplace
            </span>
          </div>
        </div>
        <div
          class="c5"
        >
          <hr
            class="c6 c7"
          />
        </div>
        <div
          class="c8"
        >
          <ul
            class="c9"
          >
            <li>
              <a
                aria-current="false"
                aria-labelledby="tooltip-1"
                class="c10"
                href="/content"
                tabindex="0"
              >
                <span
                  class="c11 c12"
                >
                  <span
                    aria-hidden="true"
                    class="c13 c14"
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
                class="c15"
              >
                <span
                  class="c16"
                >
                  <hr
                    class="c6 c7"
                  />
                  <div
                    class="c4"
                  >
                    <span>
                      Plugins
                    </span>
                  </div>
                </span>
                <ul
                  class="c15"
                >
                  <li>
                    <a
                      aria-current="true"
                      aria-labelledby="tooltip-1"
                      class="c17"
                      href="/builder"
                      tabindex="0"
                    >
                      <span
                        class="c11 c12"
                      >
                        <span
                          aria-hidden="true"
                          class="c13 c14"
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
                      class="c10"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c11 c12"
                      >
                        <span
                          aria-hidden="true"
                          class="c13 c14"
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
                      class="c10"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c11 c12"
                      >
                        <span
                          aria-hidden="true"
                          class="c13 c14"
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
                class="c15"
              >
                <span
                  class="c16"
                >
                  <hr
                    class="c6 c7"
                  />
                  <div
                    class="c4"
                  >
                    <span>
                      General
                    </span>
                  </div>
                </span>
                <ul
                  class="c15"
                >
                  <li>
                    <a
                      aria-current="false"
                      aria-labelledby="tooltip-1"
                      class="c10"
                      href="/builder"
                      tabindex="0"
                    >
                      <span
                        class="c11 c12"
                      >
                        <span
                          aria-hidden="true"
                          class="c13 c14"
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
                      class="c10"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c11 c12"
                      >
                        <span
                          aria-hidden="true"
                          class="c13 c14"
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
                      class="c10"
                      href="/content"
                      tabindex="0"
                    >
                      <span
                        class="c11 c12"
                      >
                        <span
                          aria-hidden="true"
                          class="c13 c14"
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
          class="c18"
        >
          <hr
            class="c6 c7"
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
