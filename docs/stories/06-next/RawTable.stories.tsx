import { Meta, StoryObj } from '@storybook/react-vite';

import { RawTable, RawTbody, RawTd, RawTh, RawThead, RawTr } from '@strapi/design-system/next';

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const COL_COUNT = 4;
const ROW_COUNT = 6;

const CELL_STYLE = { padding: '0.8rem', color: 'var(--neutral-800)', fontSize: '1.4rem' };
const HEAD_STYLE = { ...CELL_STYLE, background: 'var(--neutral-200)', textAlign: 'left' as const };

const meta: Meta<typeof RawTable> = {
  title: 'Next/RawTable',
  component: RawTable,
  argTypes: {
    colCount: { description: 'The number of columns, exposed as `aria-colcount`.' },
    rowCount: { description: 'The number of rows, the header row included, exposed as `aria-rowcount`.' },
    initialCol: { description: 'The zero-based column of the cell that holds the focus first.' },
    initialRow: { description: 'The zero-based row of the cell that holds the focus first.' },
    jumpStep: { description: 'How many rows PageUp and PageDown move the focus by.' },
  },
};

export default meta;

type Story = StoryObj<typeof RawTable>;

export const Base = {
  render: () => (
    <RawTable colCount={COL_COUNT} rowCount={ROW_COUNT} style={{ borderCollapse: 'collapse' }}>
      <RawThead>
        <RawTr>
          {['One', 'Two', 'Three', 'Four'].map((label) => (
            <RawTh key={label} style={HEAD_STYLE}>
              {label}
            </RawTh>
          ))}
        </RawTr>
      </RawThead>
      <RawTbody>
        {Array.from({ length: ROW_COUNT - 1 }, (_, row) => (
          <RawTr key={row}>
            <RawTd style={CELL_STYLE}>{row}/0</RawTd>
            <RawTd style={CELL_STYLE}>
              <a href={`#row-${row}`}>Link {row}</a>
            </RawTd>
            <RawTd style={CELL_STYLE}>
              <input aria-label={`Note ${row}`} defaultValue="Enter to edit" />
            </RawTd>
            <RawTd style={CELL_STYLE}>
              <button type="button">Edit {row}</button> <button type="button">Delete {row}</button>
            </RawTd>
          </RawTr>
        ))}
      </RawTbody>
    </RawTable>
  ),
  parameters: {
    chromatic: SNAPSHOT_LIGHT_AND_DARK,
  },
  name: 'base',
} satisfies Story;
