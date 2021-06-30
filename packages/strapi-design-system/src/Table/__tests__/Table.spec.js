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
        width: 100%;
        background: #ffffff;
        border-radius: 4px 4px 0 0;
      }

      .c8 {
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

      .c4 {
        margin: 0;
        height: 18px;
        width: 18px;
        border-radius: 4px;
        border: 1px solid #c0c0cf;
        -webkit-appearance: none;
      }

      .c4:checked {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c4:checked:after {
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

      .c4:checked:disabled:after {
        background: url(test-file-stub) no-repeat no-repeat center center;
      }

      .c4:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c4:indeterminate {
        background-color: #4945ff;
        border: 1px solid #4945ff;
      }

      .c4:indeterminate:after {
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

      .c4:indeterminate:disabled {
        background-color: #dcdce4;
        border: 1px solid #c0c0cf;
      }

      .c4:indeterminate:disabled:after {
        background-color: #8e8ea9;
      }

      .c1 {
        border-bottom: 1px solid #eaeaef;
      }

      .c9 tr:last-of-type {
        border-bottom: none;
      }

      .c2 {
        border-bottom: 1px solid #eaeaef;
      }

      .c3 {
        padding: 0 16px;
        vertical-align: middle;
        line-height: 3.25rem;
        text-align: left;
        color: #666687;
      }

      .c3 input {
        vertical-align: sub;
      }

      .c5 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c10 {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #666687;
      }

      .c6 {
        font-weight: 600;
        line-height: 1.14;
      }

      .c7 {
        font-weight: 600;
        font-size: 0.6875rem;
        line-height: 1.45;
        text-transform: uppercase;
      }

      .c11 {
        border-radius: 50%;
        display: block;
        height: 1.625rem;
        width: 1.625rem;
      }

      .c12 {
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

      .c12 svg {
        height: 12px;
        width: 12px;
      }

      .c12 svg > g,
      .c12 svg path {
        fill: #ffffff;
      }

      .c12[aria-disabled='true'] {
        pointer-events: none;
      }

      .c13 {
        border: none;
      }

      .c13 svg > g,
      .c13 svg path {
        fill: #8e8ea9;
      }

      .c13:hover svg > g,
      .c13:hover svg path {
        fill: #666687;
      }

      .c13:active svg > g,
      .c13:active svg path {
        fill: #a5a5ba;
      }

      <table
        aria-colcount="7"
        aria-rowcount="6"
        class="c0"
      >
        <thead
          class="c1"
        >
          <tr
            aria-rowindex="1"
            class="c2"
          >
            <th
              aria-colindex="1"
              class="c3"
            >
              <input
                aria-label="Select all entries"
                class="c4"
                tabindex="0"
                type="checkbox"
              />
            </th>
            <th
              aria-colindex="2"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c5 c6 c7"
              >
                ID
              </span>
            </th>
            <th
              aria-colindex="3"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c5 c6 c7"
              >
                Cover
              </span>
            </th>
            <th
              aria-colindex="4"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c5 c6 c7"
              >
                Description
              </span>
            </th>
            <th
              aria-colindex="5"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c5 c6 c7"
              >
                Categories
              </span>
            </th>
            <th
              aria-colindex="6"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c5 c6 c7"
              >
                Contact
              </span>
            </th>
            <th
              aria-colindex="7"
              class="c3"
              tabindex="-1"
            >
              <div
                class="c8"
              >
                Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody
          class="c9"
        >
          <tr
            aria-rowindex="2"
            class="c2"
          >
            <td
              aria-colindex="1"
              class="c3"
            >
              <input
                aria-label="Select undefined"
                class="c4"
                tabindex="-1"
                type="checkbox"
              />
            </td>
            <td
              aria-colindex="2"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                0
              </span>
            </td>
            <td
              aria-colindex="3"
              class="c3"
              tabindex="-1"
            >
              <img
                alt="Leon Lafrite"
                class="c11"
                src="https://avatars.githubusercontent.com/u/3874873?v=4"
              />
            </td>
            <td
              aria-colindex="4"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                Chez Léon is a human sized Parisian...
              </span>
            </td>
            <td
              aria-colindex="5"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                French cuisine
              </span>
            </td>
            <td
              aria-colindex="6"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                Leon Lafrite
              </span>
            </td>
            <td
              aria-colindex="7"
              class="c3"
            >
              <button
                aria-disabled="false"
                aria-labelledby="tooltip-c7ea34b2-1d3e-4022-ad65-16660816017c"
                class="c12 c13"
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
            class="c2"
          >
            <td
              aria-colindex="1"
              class="c3"
            >
              <input
                aria-label="Select undefined"
                class="c4"
                tabindex="-1"
                type="checkbox"
              />
            </td>
            <td
              aria-colindex="2"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                1
              </span>
            </td>
            <td
              aria-colindex="3"
              class="c3"
              tabindex="-1"
            >
              <img
                alt="Leon Lafrite"
                class="c11"
                src="https://avatars.githubusercontent.com/u/3874873?v=4"
              />
            </td>
            <td
              aria-colindex="4"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                Chez Léon is a human sized Parisian...
              </span>
            </td>
            <td
              aria-colindex="5"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                French cuisine
              </span>
            </td>
            <td
              aria-colindex="6"
              class="c3"
              tabindex="-1"
            >
              <span
                class="c10"
              >
                Leon Lafrite
              </span>
            </td>
            <td
              aria-colindex="7"
              class="c3"
            >
              <button
                aria-disabled="false"
                aria-labelledby="tooltip-e5c8dc99-cfd4-4694-aab2-adaa25906518"
                class="c12 c13"
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
    `);
  });
});
