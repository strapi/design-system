import * as React from 'react';

import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RawTable, RawTbody, RawTd, RawTh, RawThead, RawTr } from './raw-table';

const Grid = ({ withInput = false }: { withInput?: boolean }) => (
  <RawTable colCount={2} rowCount={3}>
    <RawThead>
      <RawTr>
        <RawTh>Name</RawTh>
        <RawTh>
          <button type="button">Sort</button>
        </RawTh>
      </RawTr>
    </RawThead>
    <RawTbody>
      <RawTr>
        <RawTd>Alice</RawTd>
        <RawTd>
          <button type="button">Edit Alice</button>
        </RawTd>
      </RawTr>
      <RawTr>
        <RawTd>Bob</RawTd>
        <RawTd>{withInput ? <input aria-label="Bob's note" /> : <button type="button">Edit Bob</button>}</RawTd>
      </RawTr>
    </RawTbody>
  </RawTable>
);

describe('RawTable', () => {
  it('renders a grid with the aria counts and indexes', () => {
    render(<Grid />);

    const grid = screen.getByRole('grid');

    expect(grid).toHaveAttribute('aria-rowcount', '3');
    expect(grid).toHaveAttribute('aria-colcount', '2');

    const rows = screen.getAllByRole('row');

    expect(rows.map((row) => row.getAttribute('aria-rowindex'))).toEqual(['1', '2', '3']);

    const cells = screen.getAllByRole('gridcell');

    expect(cells).toHaveLength(6);
    expect(cells[1]).toHaveAttribute('aria-colindex', '2');
    expect(screen.getByText('Alice')).toHaveAttribute('aria-colindex', '1');
  });

  it('gives the roving tabindex to the first cell only', () => {
    render(<Grid />);

    expect(screen.getByText('Name')).toHaveAttribute('tabindex', '0');
    expect(screen.getByText('Alice')).toHaveAttribute('tabindex', '-1');
    // A cell with a single button lets the button hold the roving tabindex
    expect(screen.getByRole('button', { name: 'Sort' })).toHaveAttribute('tabindex', '-1');
  });

  it('moves the focus with the arrow keys, Home, End and the page keys', async () => {
    const user = userEvent.setup();

    render(<Grid />);

    await user.tab();
    expect(screen.getByText('Name')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Sort' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: 'Edit Alice' })).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('Alice')).toHaveFocus();

    await user.keyboard('{End}');
    expect(screen.getByRole('button', { name: 'Edit Alice' })).toHaveFocus();

    await user.keyboard('{Home}');
    expect(screen.getByText('Alice')).toHaveFocus();

    await user.keyboard('{PageDown}');
    expect(screen.getByText('Bob')).toHaveFocus();

    await user.keyboard('{PageUp}');
    expect(screen.getByText('Name')).toHaveFocus();

    await user.keyboard('{Control>}{End}{/Control}');
    expect(screen.getByRole('button', { name: 'Edit Bob' })).toHaveFocus();
  });

  it('enters a cell with its own keyboard navigation with Enter and leaves it with Escape', async () => {
    const user = userEvent.setup();

    render(<Grid withInput />);

    await user.tab();
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowRight}');

    const cell = screen.getByRole('textbox', { name: "Bob's note" }).closest('td')!;

    expect(cell).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(screen.getByRole('textbox', { name: "Bob's note" })).toHaveFocus();

    // The input owns the arrow keys while the cell is active
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('textbox', { name: "Bob's note" })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(cell).toHaveFocus();
  });

  it('does not steal the focus back when a cell child is focused by pointer', () => {
    render(<Grid />);

    const button = screen.getByRole('button', { name: 'Edit Bob' });

    act(() => {
      button.focus();
    });
    fireEvent.focus(button);

    expect(button).toHaveFocus();
  });

  it('calls its own onKeyDown and forwards its ref', () => {
    const onKeyDown = jest.fn();
    const ref = React.createRef<HTMLTableElement>();

    render(
      <RawTable ref={ref} colCount={1} rowCount={1} onKeyDown={onKeyDown}>
        <RawTbody>
          <RawTr>
            <RawTd>Cell</RawTd>
          </RawTr>
        </RawTbody>
      </RawTable>,
    );

    fireEvent.keyDown(screen.getByRole('grid'), { key: 'ArrowDown' });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(ref.current).toBe(screen.getByRole('grid'));
  });
});
