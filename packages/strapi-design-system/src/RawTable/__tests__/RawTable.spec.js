import * as React from 'react';
import { render } from '@testing-library/react';
import { RawTable } from '../RawTable';
import { RawThead } from '../RawThead';
import { RawTbody } from '../RawTbody';
import { RawTr } from '../RawTr';
import { RawTd, RawTh } from '../RawCell';
import { ThemeProvider } from '../../ThemeProvider';
import { lightTheme } from '../../themes';

describe('RawTable', () => {
  it('snapshots the component', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <RawTable colCount={3} rowCount={3}>
          <RawThead>
            <RawTr>
              <RawTh>First</RawTh>
              <RawTh>Second</RawTh>
              <RawTh>Third</RawTh>
            </RawTr>
          </RawThead>
          <RawTbody>
            <RawTr>
              <RawTd>1/1</RawTd>
              <RawTd>1/2</RawTd>
              <RawTd>1/3</RawTd>
            </RawTr>
            <RawTr>
              <RawTd>2/1</RawTd>
              <RawTd>2/2</RawTd>
              <RawTd>2/3</RawTd>
            </RawTr>
          </RawTbody>
        </RawTable>
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
