import * as React from 'react';

import { Plus } from '@strapi/icons';
import { fireEvent, render, screen } from '@test/utils';

import { Checkbox } from './checkbox';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table';

const ROWS = ['Alice', 'Bob'];

const SelectableTable = ({
  footer,
  defaultSelected = [],
}: {
  footer?: React.ReactNode;
  defaultSelected?: string[];
}) => {
  const [selected, setSelected] = React.useState<string[]>(defaultSelected);

  return (
    <Table colCount={3} rowCount={ROWS.length + 1} footer={footer}>
      <TableCaption>Contacts</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox
              aria-label="Select all entries"
              checked={selected.length === ROWS.length}
              onCheckedChange={(checked) => setSelected(checked ? ROWS : [])}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ROWS.map((name) => (
          <TableRow key={name} aria-selected={selected.includes(name)}>
            <TableCell>
              <Checkbox
                aria-label={`Select ${name}`}
                checked={selected.includes(name)}
                onCheckedChange={(checked) =>
                  setSelected((prev) => (checked ? [...prev, name] : prev.filter((item) => item !== name)))
                }
              />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>
              <button type="button">Edit {name}</button>
              <button type="button">Delete {name}</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

describe('Table', () => {
  it('renders a grid with its rows, header cells and caption', () => {
    render(<SelectableTable />);

    const grid = screen.getByRole('grid', { name: 'Contacts' });

    expect(grid).toHaveAttribute('aria-colcount', '3');
    expect(grid).toHaveAttribute('aria-rowcount', '3');
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getAllByRole('gridcell')).toHaveLength(9);
    expect(screen.getByRole('gridcell', { name: 'Name' })).toHaveAttribute('aria-colindex', '2');
  });

  it('reflects the selected rows in the checkboxes and the rows', () => {
    render(<SelectableTable defaultSelected={['Bob']} />);

    expect(screen.getByRole('checkbox', { name: 'Select Bob' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Select Alice' })).not.toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Select all entries' })).not.toBeChecked();
    expect(screen.getAllByRole('row')[2]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('row')[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('moves through the checkboxes and the buttons with the keyboard', async () => {
    const { user } = render(<SelectableTable />);

    await user.tab();
    expect(screen.getByRole('checkbox', { name: 'Select all entries' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('checkbox', { name: 'Select Alice' })).toHaveFocus();

    await user.keyboard('{End}');
    expect(screen.getByRole('button', { name: 'Edit Alice' })).toHaveFocus();

    // A cell of buttons works as a toolbar
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Delete Alice' })).toHaveFocus();
  });

  it('renders the footer action inside the frame', async () => {
    const onClick = jest.fn();

    const { user } = render(
      <SelectableTable
        footer={
          <TableFooter icon={<Plus />} onClick={onClick}>
            Add another field
          </TableFooter>
        }
      />,
    );

    const footer = screen.getByRole('button', { name: 'Add another field' });

    expect(footer).toHaveAttribute('type', 'button');

    await user.click(footer);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows the edge shadows when the content overflows', () => {
    render(<SelectableTable />);

    const scroller = screen.getByRole('grid').parentElement!;

    Object.defineProperty(scroller, 'scrollWidth', { configurable: true, value: 800 });
    Object.defineProperty(scroller, 'clientWidth', { configurable: true, value: 400 });

    scroller.scrollLeft = 200;
    fireEvent.scroll(scroller);

    expect(scroller.parentElement).toHaveAttribute('data-overflowing', 'both');

    scroller.scrollLeft = 400;
    fireEvent.scroll(scroller);

    expect(scroller.parentElement).toHaveAttribute('data-overflowing', 'left');
  });

  it('forwards the refs of its parts', () => {
    const tableRef = React.createRef<HTMLTableElement>();
    const rowRef = React.createRef<HTMLTableRowElement>();
    const cellRef = React.createRef<HTMLTableCellElement>();

    render(
      <Table ref={tableRef} colCount={1} rowCount={1}>
        <TableBody>
          <TableRow ref={rowRef}>
            <TableCell ref={cellRef}>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(tableRef.current).toBe(screen.getByRole('grid'));
    expect(rowRef.current).toBe(screen.getByRole('row'));
    expect(cellRef.current).toBe(screen.getByRole('gridcell'));
  });
});
