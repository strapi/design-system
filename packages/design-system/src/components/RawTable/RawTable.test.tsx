import { render as renderRTL } from '@test/utils';
import { fireEvent, screen } from '@testing-library/react';

import { RawTd, RawTh } from './RawCell';
import { RawTable } from './RawTable';
import { RawTbody } from './RawTbody';
import { RawThead } from './RawThead';
import { RawTr } from './RawTr';

import { focusFocusable } from './focusFocusable';

jest.mock('./focusFocusable', () => ({
  focusFocusable: jest.fn(),
}));

const focusFocusableMock = focusFocusable as jest.Mock;

const render = () =>
  renderRTL(
    <RawTable colCount={1} rowCount={3}>
      <RawThead>
        <RawTr>
          <RawTh>
            <button type="button">Header</button>
          </RawTh>
        </RawTr>
      </RawThead>
      <RawTbody>
        <RawTr>
          <RawTd>
            <button type="button">Row one</button>
          </RawTd>
        </RawTr>
        <RawTr>
          <RawTd>
            <button type="button">Row two</button>
          </RawTd>
        </RawTr>
      </RawTbody>
    </RawTable>,
  );

describe('RawTable roving focus', () => {
  beforeEach(() => {
    focusFocusableMock.mockClear();
  });

  it('moves the roving focus when the index changes via keyboard navigation', () => {
    render();
    focusFocusableMock.mockClear(); // ignore mount

    fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowDown' });

    expect(focusFocusableMock).toHaveBeenCalled();
  });

  it('does not move the roving focus when a cell is focused by pointer', () => {
    // A pointer focus reports its coords through `setTableValues`; re-focusing
    // the roving cell there would scroll it into view and jump a scrolled table
    // to the top. The element the user clicked already holds focus.
    render();
    focusFocusableMock.mockClear(); // ignore mount

    fireEvent.focus(screen.getByRole('button', { name: 'Row two' }));

    expect(focusFocusableMock).not.toHaveBeenCalled();
  });
});
