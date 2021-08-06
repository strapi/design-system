import * as React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import { Tabs, Tab } from '../Tabs';
import { TabGroup } from '../TabGroup';
import { TabPanels, TabPanel } from '../TabPanels';

describe('Tabs', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TabGroup label="Some stuff for the label">
          <Tabs>
            <Tab>First</Tab>
            <Tab>Second</Tab>
            <Tab>Third</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>First panel</TabPanel>
            <TabPanel>Second panel</TabPanel>
            <TabPanel>Third panel</TabPanel>
          </TabPanels>
        </TabGroup>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c7 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #271fe0;
      }

      .c11 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c8 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c5 {
        background: #ffffff;
        padding: 16px;
      }

      .c9 {
        background: #f6f6f9;
        padding: 12px;
      }

      .c0 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: flex-end;
        -webkit-box-align: flex-end;
        -ms-flex-align: flex-end;
        align-items: flex-end;
      }

      .c6 {
        border-bottom: 1px solid #ffffff;
      }

      .c10 {
        border-bottom: 1px solid #eaeaef;
      }

      .c3 {
        border: none;
        background: transparent;
        padding: 0;
        outline-offset: -2px;
      }

      .c2 + .c2 > .c4 {
        border-left: 1px solid #eaeaef;
      }

      .c1 > * {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }

      .c1 .c2:first-of-type .c4 {
        border-radius: 4px 0 0 0;
      }

      .c1 .c2:last-of-type .c4 {
        border-radius: 0 4px 0 0;
      }

      .c1 .c2[aria-selected="true"] .c4 {
        border-radius: 4px 4px 0 0;
      }

      <div>
        <div
          aria-label="Some stuff for the label"
          class="c0 c1"
          role="tablist"
        >
          <button
            aria-controls="tabgroup-1-0-tabpanel"
            aria-selected="true"
            class="c2 c3"
            id="tabgroup-1-0-tab"
            role="tab"
            tabindex="0"
          >
            <div
              class="c4 c5 c6"
            >
              <span
                class="c7 c8"
              >
                First
              </span>
            </div>
          </button>
          <button
            aria-selected="false"
            class="c2 c3"
            id="tabgroup-1-1-tab"
            role="tab"
            tabindex="-1"
          >
            <div
              class="c4 c9 c10"
            >
              <span
                class="c11 c8"
              >
                Second
              </span>
            </div>
          </button>
          <button
            aria-selected="false"
            class="c2 c3"
            id="tabgroup-1-2-tab"
            role="tab"
            tabindex="-1"
          >
            <div
              class="c4 c9 c10"
            >
              <span
                class="c11 c8"
              >
                Third
              </span>
            </div>
          </button>
        </div>
        <div>
          <div
            aria-labelledby="tabgroup-1-0-tab"
            id="tabgroup-1-0-tabpanel"
            role="tabpanel"
            tabindex="0"
          >
            First panel
          </div>
        </div>
      </div>
    `);
  });

  it('snapshots the component in simpel variant', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <TabGroup label="Some stuff for the label" variant="simple">
          <Tabs>
            <Tab>First</Tab>
            <Tab>Second</Tab>
            <Tab>Third</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>First panel</TabPanel>
            <TabPanel>Second panel</TabPanel>
            <TabPanel>Third panel</TabPanel>
          </TabPanels>
        </TabGroup>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c2 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #4945ff;
      }

      .c6 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c3 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c4 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c0 {
        padding: 16px;
      }

      .c1 {
        border-bottom: 2px solid #4945ff;
      }

      .c5 {
        border-bottom: 2px solid transparent;
      }

      <div>
        <div
          aria-label="Some stuff for the label"
          role="tablist"
        >
          <button
            aria-controls="tabgroup-2-0-tabpanel"
            aria-selected="true"
            id="tabgroup-2-0-tab"
            role="tab"
            tabindex="0"
          >
            <div
              class="c0 c1"
            >
              <span
                class="c2 c3 c4"
              >
                First
              </span>
            </div>
          </button>
          <button
            aria-selected="false"
            id="tabgroup-2-1-tab"
            role="tab"
            tabindex="-1"
          >
            <div
              class="c0 c5"
            >
              <span
                class="c6 c3 c4"
              >
                Second
              </span>
            </div>
          </button>
          <button
            aria-selected="false"
            id="tabgroup-2-2-tab"
            role="tab"
            tabindex="-1"
          >
            <div
              class="c0 c5"
            >
              <span
                class="c6 c3 c4"
              >
                Third
              </span>
            </div>
          </button>
        </div>
        <div>
          <div
            aria-labelledby="tabgroup-2-0-tab"
            id="tabgroup-2-0-tabpanel"
            role="tabpanel"
            tabindex="0"
          >
            First panel
          </div>
        </div>
      </div>
    `);
  });
});
