import * as React from 'react';
import { render } from '@testing-library/react';
import { Tree } from '../Tree';
import { TreeItem } from '../TreeItem';
import { SubTree } from '../SubTree';
import { TreeBubble } from '../TreeBubble';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Tree', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Tree
          root={<span>Hello world</span>}
          endAction={
            <TreeBubble icon={<span>icon</span>}>
              <span>Add a new thing</span>
            </TreeBubble>
          }
        >
          <TreeItem>
            <span>First item</span>
            <SubTree
              endAction={
                <TreeBubble icon={<span>icon</span>}>
                  <span>Add a new thing</span>
                </TreeBubble>
              }
            >
              <TreeItem>
                <span>second item</span>
              </TreeItem>
              <TreeItem>
                <span>third Item</span>
              </TreeItem>
            </SubTree>
          </TreeItem>
          <TreeItem>
            <span>Second Item</span>
            <SubTree
              endAction={
                <TreeBubble icon={<span>icon</span>}>
                  <span>Add a new thing</span>
                </TreeBubble>
              }
            ></SubTree>
          </TreeItem>
        </Tree>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c5 {
        padding-left: 24px;
      }

      .c0 {
        margin-left: 16px;
        padding-top: 24px;
        padding-bottom: 24px;
      }

      .c2 {
        position: absolute;
        margin-left: calc(-2rem - 1rem);
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
      }

      .c1 {
        position: relative;
        margin-left: 2rem;
        margin-top: 8px;
      }

      .c1:before {
        margin-left: -2rem;
        border-radius: 4px;
        content: '';
        position: absolute;
        height: 100%;
        width: 4px;
        background: #d9d8ff;
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

      .c4 {
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
        margin-left: calc(-1.5rem - 1rem - 2px);
      }

      .c4 svg {
        height: 0.625rem;
        width: 0.625rem;
      }

      .c4 svg path {
        fill: #4945ff;
      }

      <ul
        role="tree"
      >
        <li
          class="c0"
          role="treeitem"
          tabindex="-1"
        >
          <span>
            Hello world
          </span>
          <div
            class="c1"
          >
            <ul
              role="group"
            >
              <li
                class="c0"
                role="treeitem"
                tabindex="-1"
              >
                <div
                  class="c2"
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
                <span>
                  First item
                </span>
                <div
                  class="c1"
                >
                  <ul
                    role="group"
                  >
                    <li
                      class="c0"
                      role="treeitem"
                      tabindex="-1"
                    >
                      <div
                        class="c2"
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
                      <span>
                        second item
                      </span>
                    </li>
                    <li
                      class="c0"
                      role="treeitem"
                      tabindex="-1"
                    >
                      <div
                        class="c2"
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
                      <span>
                        third Item
                      </span>
                    </li>
                  </ul>
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
                      <span>
                        Add a new thing
                      </span>
                    </div>
                  </div>
                </div>
              </li>
              <li
                class="c0"
                role="treeitem"
                tabindex="-1"
              >
                <div
                  class="c2"
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
                <span>
                  Second Item
                </span>
                <div
                  class="c1"
                >
                  <ul
                    role="group"
                  />
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
                      <span>
                        Add a new thing
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
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
                <span>
                  Add a new thing
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    `);
  });
});
