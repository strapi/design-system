import * as React from 'react';
import { render } from '@testing-library/react';
import { Table } from '../Table';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';
import EditIcon from '@strapi/icons/EditIcon';
import { VisuallyHidden } from '../../VisuallyHidden';
import { BaseCheckbox } from '../../BaseCheckbox';
import { Thead } from '../Thead';
import { Tbody } from '../Tbody';
import { Tr } from '../Tr';
import { Td, Th } from '../Cell';
import { Text, TableLabel } from '../../Text';
import { Avatar } from '../../Avatar';
import { IconButton } from '../../IconButton';

jest.mock('../../helpers/genId', () => ({
  genId: () => 123,
}));

describe('Table', () => {
  it('snapshots the component', () => {
    const ROW_COUNT = 6;
    const COL_COUNT = 7;
    const entry = {
      cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
      description: 'Chez Léon is a human sized Parisian...',
      category: 'French cuisine',
      contact: 'Leon Lafrite',
    };
    const entries = [];
    for (let i = 0; i < 2; i++) {
      entries.push({ ...entry, id: i });
    }

    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <BaseCheckbox aria-label="Select all entries" />
              </Th>
              <Th>
                <TableLabel as="span">ID</TableLabel>
              </Th>
              <Th>
                <TableLabel as="span">Cover</TableLabel>
              </Th>
              <Th>
                <TableLabel as="span">Description</TableLabel>
              </Th>
              <Th>
                <TableLabel as="span">Categories</TableLabel>
              </Th>
              <Th>
                <TableLabel as="span">Contact</TableLabel>
              </Th>
              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries.map((entry) => (
              <Tr key={entry.id}>
                <Td>
                  <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                </Td>
                <Td>
                  <Text textColor="neutral600" as="span">
                    {entry.id}
                  </Text>
                </Td>
                <Td>
                  <Avatar src={entry.cover} alt={entry.contact} />
                </Td>
                <Td>
                  <Text textColor="neutral600" as="span">
                    {entry.description}
                  </Text>
                </Td>
                <Td>
                  <Text textColor="neutral600" as="span">
                    {entry.category}
                  </Text>
                </Td>
                <Td>
                  <Text textColor="neutral600" as="span">
                    {entry.contact}
                  </Text>
                </Td>
                <Td>
                  <IconButton onClick={() => console.log('edit')} title="Edit" noBorder>
                    <EditIcon />
                  </IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c0 {
        background: #ffffff;
        border-radius: 4px;
      }

      .c2 {
        padding-right: 12px;
        padding-left: 12px;
      }

      .c4 {
        width: 100%;
        white-space: nowrap;
      }

      .c1 {
        position: relative;
      }

      .c1:before {
        background: linear-gradient(90deg,#000000 0%,rgba(0,0,0,0) 100%);
        opacity: 0.2;
        position: absolute;
        height: 100%;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        width: 8px;
        left: 0;
      }

      .c1:after {
        background: linear-gradient(270deg,#000000 0%,rgba(0,0,0,0) 100%);
        opacity: 0.2;
        position: absolute;
        height: 100%;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
        width: 8px;
        right: 0;
        top: 0;
      }

      .c3 {
        overflow-x: scroll;
      }

      .c12 {
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

      .c8 {
        margin: 0;
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
        background-color: #ffffff;
      }

      .c8:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c8:checked:after {
        content: '';
        display: block;
        position: relative;
        background: url(test-file-stub) no-repeat no-repeat center center;
        width: 10px;
        height: 10px;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c8:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c8:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c8:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c8:indeterminate:after {
        content: '';
        display: block;
        position: relative;
        color: white;
        height: 2px;
        width: 10px;
        background-color: #ffffff;
        left: 50%;
        top: 50%;
        -webkit-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .c8:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c8:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c5 {
        border-bottom: 1px solid #eaeaef;
      }

      .c13 tr:last-of-type {
        border-bottom: none;
      }

      .c6 {
        border-bottom: 1px solid #eaeaef;
      }

      .c6 td,
      .c6 th {
        padding: 0 16px;
      }

      .c6 td:first-of-type,
      .c6 th:first-of-type {
        padding: 0 4px;
      }

      .c7 {
        vertical-align: middle;
        line-height: 3.25rem;
        text-align: left;
        color: #666687;
        outline-offset: -2px;
      }

      .c7 input {
        vertical-align: sub;
      }

      .c9 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c14 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c10 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c11 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c15 {
        border-radius: 50%;
        display: block;
        height: 26px;
        width: 26px;
      }

      .c16 {
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

      .c16 svg {
        height: 12px;
        width: 12px;
      }

      .c16 svg > g,
      .c16 svg path {
        fill: #ffffff;
      }

      .c16[aria-disabled='true'] {
        pointer-events: none;
      }

      .c17 {
        border: none;
      }

      .c17 svg > g,
      .c17 svg path {
        fill: #8e8ea9;
      }

      .c17:hover svg > g,
      .c17:hover svg path {
        fill: #666687;
      }

      .c17:active svg > g,
      .c17:active svg path {
        fill: #a5a5ba;
      }

      <div
        class="c0 c1"
      >
        <div
          class="c2 c3"
        >
          <table
            aria-colcount="7"
            aria-rowcount="6"
            class="c4"
          >
            <thead
              class="c5"
            >
              <tr
                aria-rowindex="1"
                class="c6"
              >
                <th
                  aria-colindex="1"
                  class="c7"
                >
                  <input
                    aria-label="Select all entries"
                    class="c8"
                    tabindex="0"
                    type="checkbox"
                  />
                </th>
                <th
                  aria-colindex="2"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c9 c10 c11"
                  >
                    ID
                  </span>
                </th>
                <th
                  aria-colindex="3"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c9 c10 c11"
                  >
                    Cover
                  </span>
                </th>
                <th
                  aria-colindex="4"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c9 c10 c11"
                  >
                    Description
                  </span>
                </th>
                <th
                  aria-colindex="5"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c9 c10 c11"
                  >
                    Categories
                  </span>
                </th>
                <th
                  aria-colindex="6"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c9 c10 c11"
                  >
                    Contact
                  </span>
                </th>
                <th
                  aria-colindex="7"
                  class="c7"
                  tabindex="-1"
                >
                  <div
                    class="c12"
                  >
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              class="c13"
            >
              <tr
                aria-rowindex="2"
                class="c6"
              >
                <td
                  aria-colindex="1"
                  class="c7"
                >
                  <input
                    aria-label="Select Leon Lafrite"
                    class="c8"
                    tabindex="-1"
                    type="checkbox"
                  />
                </td>
                <td
                  aria-colindex="2"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    0
                  </span>
                </td>
                <td
                  aria-colindex="3"
                  class="c7"
                  tabindex="-1"
                >
                  <img
                    alt="Leon Lafrite"
                    class="c15"
                    height="26px"
                    src="https://avatars.githubusercontent.com/u/3874873?v=4"
                    width="26px"
                  />
                </td>
                <td
                  aria-colindex="4"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    Chez Léon is a human sized Parisian...
                  </span>
                </td>
                <td
                  aria-colindex="5"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    French cuisine
                  </span>
                </td>
                <td
                  aria-colindex="6"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    Leon Lafrite
                  </span>
                </td>
                <td
                  aria-colindex="7"
                  class="c7"
                >
                  <button
                    aria-disabled="false"
                    aria-labelledby="tooltip-123"
                    class="c16 c17"
                    tabindex="-1"
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
                        d="M23.604 3.514c.528.528.528 1.36 0 1.887l-2.622 2.607-4.99-4.99L18.6.396a1.322 1.322 0 011.887 0l3.118 3.118zM0 24v-4.99l14.2-14.2 4.99 4.99L4.99 24H0z"
                        fill="#212134"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
              <tr
                aria-rowindex="3"
                class="c6"
              >
                <td
                  aria-colindex="1"
                  class="c7"
                >
                  <input
                    aria-label="Select Leon Lafrite"
                    class="c8"
                    tabindex="-1"
                    type="checkbox"
                  />
                </td>
                <td
                  aria-colindex="2"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    1
                  </span>
                </td>
                <td
                  aria-colindex="3"
                  class="c7"
                  tabindex="-1"
                >
                  <img
                    alt="Leon Lafrite"
                    class="c15"
                    height="26px"
                    src="https://avatars.githubusercontent.com/u/3874873?v=4"
                    width="26px"
                  />
                </td>
                <td
                  aria-colindex="4"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    Chez Léon is a human sized Parisian...
                  </span>
                </td>
                <td
                  aria-colindex="5"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    French cuisine
                  </span>
                </td>
                <td
                  aria-colindex="6"
                  class="c7"
                  tabindex="-1"
                >
                  <span
                    class="c14"
                  >
                    Leon Lafrite
                  </span>
                </td>
                <td
                  aria-colindex="7"
                  class="c7"
                >
                  <button
                    aria-disabled="false"
                    aria-labelledby="tooltip-123"
                    class="c16 c17"
                    tabindex="-1"
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
                        d="M23.604 3.514c.528.528.528 1.36 0 1.887l-2.622 2.607-4.99-4.99L18.6.396a1.322 1.322 0 011.887 0l3.118 3.118zM0 24v-4.99l14.2-14.2 4.99 4.99L4.99 24H0z"
                        fill="#212134"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `);
  });
});
