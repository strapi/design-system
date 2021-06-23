import * as React from 'react';
import { render } from '@testing-library/react';
import { Tree } from '../Tree';
import { TreeItem } from '../TreeItem';
import { TreeItemContent } from '../TreeItemContent';
import { SubTree } from '../SubTree';
import { TreeBubble } from '../TreeBubble';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Tree', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Tree root={<span>Hello world</span>}>
          <TreeItem>
            <TreeItemContent>
              <span>First item</span>
            </TreeItemContent>
            <SubTree>
              <TreeItem>
                <TreeItemContent>
                  <span>second item</span>
                </TreeItemContent>
              </TreeItem>
              <TreeItem>
                <TreeItemContent>
                  <span>third Item</span>
                </TreeItemContent>
              </TreeItem>
              <TreeBubble icon={<span>Icon</span>}>
                <span>Add a new thing here</span>
              </TreeBubble>
            </SubTree>
          </TreeItem>
        </Tree>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c6 {
        padding-left: 24px;
      }

      .c1 {
        padding-top: 24px;
        padding-bottom: 24px;
        position: relative;
      }

      .c3 {
        position: absolute;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .c2 {
        margin-top: 8px;
      }

      .c2 li:before {
        top: 0;
        content: '';
        position: absolute;
        height: 100%;
        width: 4px;
        background: #d9d8ff;
      }

      .c2 li:last-of-type {
        padding-bottom: 0;
      }

      .c2 li:last-of-type:before {
        height: 50%;
      }

      .c2 li:first-of-type:before {
        border-radius: 4px 4px 0 0;
      }

      .c2 .{
        margin-left: 40px;
      }

      .c2 [role='group'] {
        margin-left: 40px;
      }

      .c0 li:last-of-type {
        padding-bottom: 0;
      }

      .c4 {
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

      .c5 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        border-radius: 50%;
        background: #d9d8ff;
        height: 1.5rem;
        width: 1.5rem;
        border: none;
        margin-left: -3.125rem;
      }

      .c5 svg {
        height: 0.625rem;
        width: 0.625rem;
      }

      .c5 svg path {
        fill: #4945ff;
      }

      <ul
        class="c0"
        role="tree"
      >
        <li
          class="c1"
          role="treeitem"
        >
          <div
            class=""
            tabindex="0"
          >
            <span>
              Hello world
            </span>
          </div>
          <ul
            class="c2"
            role="group"
          >
            <li
              class="c1"
              role="treeitem"
            >
              <div
                class="c3"
              >
                <svg
                  fill="none"
                  height="22"
                  viewBox="0 0 19 22"
                  width="19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M6.50039 13.8971C8.12714 16.166 11.0621 17.6851 16.9999 17.9564C18.1033 18.0068 19 18.8954 19 20C19 21.1046 18.1032 22.0059 16.9996 21.9598C10.4053 21.6845 5.9364 19.9752 3.24961 16.2279C0.449031 12.3218 0 6.6745 0 0H4C4 6.8255 4.55097 11.1782 6.50039 13.8971Z"
                    fill="#D9D8FF"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
              <div
                class=""
                tabindex="-1"
              >
                <span>
                  First item
                </span>
              </div>
              <ul
                class="c2"
                role="group"
              >
                <li
                  class="c1"
                  role="treeitem"
                >
                  <div
                    class="c3"
                  >
                    <svg
                      fill="none"
                      height="22"
                      viewBox="0 0 19 22"
                      width="19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M6.50039 13.8971C8.12714 16.166 11.0621 17.6851 16.9999 17.9564C18.1033 18.0068 19 18.8954 19 20C19 21.1046 18.1032 22.0059 16.9996 21.9598C10.4053 21.6845 5.9364 19.9752 3.24961 16.2279C0.449031 12.3218 0 6.6745 0 0H4C4 6.8255 4.55097 11.1782 6.50039 13.8971Z"
                        fill="#D9D8FF"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div
                    class=""
                    tabindex="-1"
                  >
                    <span>
                      second item
                    </span>
                  </div>
                </li>
                <li
                  class="c1"
                  role="treeitem"
                >
                  <div
                    class="c3"
                  >
                    <svg
                      fill="none"
                      height="22"
                      viewBox="0 0 19 22"
                      width="19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M6.50039 13.8971C8.12714 16.166 11.0621 17.6851 16.9999 17.9564C18.1033 18.0068 19 18.8954 19 20C19 21.1046 18.1032 22.0059 16.9996 21.9598C10.4053 21.6845 5.9364 19.9752 3.24961 16.2279C0.449031 12.3218 0 6.6745 0 0H4C4 6.8255 4.55097 11.1782 6.50039 13.8971Z"
                        fill="#D9D8FF"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div
                    class=""
                    tabindex="-1"
                  >
                    <span>
                      third Item
                    </span>
                  </div>
                </li>
                <li
                  class="c1"
                  role="treeitem"
                >
                  <div
                    class=""
                    tabindex="-1"
                  >
                    <div
                      class="c4"
                    >
                      <div
                        aria-hidden="true"
                        class="c5"
                      >
                        <span>
                          Icon
                        </span>
                      </div>
                      <div
                        class="c6"
                      >
                        <span>
                          Add a new thing here
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    `);
  });
});
