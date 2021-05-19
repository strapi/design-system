import * as React from 'react';
import { render } from '@testing-library/react';
import { Table } from '../Table';
import { Thead } from '../Thead';
import { Tbody } from '../Tbody';
import { Tr } from '../Tr';
import { Td, Th } from '../Cell';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('Table', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Table colCount={3} rowCount={3}>
          <Thead>
            <Tr>
              <Th>First</Th>
              <Th>Second</Th>
              <Th>Third</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1/1</Td>
              <Td>1/2</Td>
              <Td>1/3</Td>
            </Tr>
            <Tr>
              <Td>2/1</Td>
              <Td>2/2</Td>
              <Td>2/3</Td>
            </Tr>
          </Tbody>
        </Table>
      </ThemeProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <table
        aria-colcount="3"
        aria-rowcount="3"
      >
        <thead>
          <tr
            aria-rowindex="1"
          >
            <th
              aria-colindex="1"
              tabindex="0"
            >
              First
            </th>
            <th
              aria-colindex="2"
              tabindex="-1"
            >
              Second
            </th>
            <th
              aria-colindex="3"
              tabindex="-1"
            >
              Third
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            aria-rowindex="2"
          >
            <td
              aria-colindex="1"
              tabindex="-1"
            >
              1/1
            </td>
            <td
              aria-colindex="2"
              tabindex="-1"
            >
              1/2
            </td>
            <td
              aria-colindex="3"
              tabindex="-1"
            >
              1/3
            </td>
          </tr>
          <tr
            aria-rowindex="3"
          >
            <td
              aria-colindex="1"
              tabindex="-1"
            >
              2/1
            </td>
            <td
              aria-colindex="2"
              tabindex="-1"
            >
              2/2
            </td>
            <td
              aria-colindex="3"
              tabindex="-1"
            >
              2/3
            </td>
          </tr>
        </tbody>
      </table>
    `);
  });
});
