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

  it('does not move the roving focus when a cell reports focus through `setTableValues`', () => {
    // A cell reports focus through `setTableValues` whenever the focus did not
    // come from the table's own keyboard navigation — a click or a tab both land
    // here. Re-focusing the roving cell would scroll it into view and jump a
    // scrolled table to the top; the element that took focus already holds it.
    render();
    focusFocusableMock.mockClear(); // ignore mount

    fireEvent.focus(screen.getByRole('button', { name: 'Row two' }));

    expect(focusFocusableMock).not.toHaveBeenCalled();
  });
});
