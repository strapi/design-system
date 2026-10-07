import type { CSSProperties } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { useTheme } from 'styled-components';

// `neutral100` → `neutral-100`, `buttonPrimary600` → `button-primary-600`. The same rule as the stylesheet test
const toTailwind = (token: string) =>
  token
    .replace(/(?<=[a-zA-Z])(?=\d)/g, '-')
    .replace(/(?<=[a-z])(?=[A-Z])/g, '-')
    .toLowerCase();

const SHADOWS = {
  filterShadow: 'filter',
  focus: 'focus-inset',
  focusShadow: 'focus',
  popupShadow: 'popup',
  tableShadow: 'table',
} as const;

const CELL_STYLE = { padding: '0.8rem 1.2rem', fontSize: '1.2rem', textAlign: 'left' } satisfies CSSProperties;
const SWATCH_STYLE = {
  width: '6.4rem',
  height: '3.2rem',
  borderRadius: '4px',
  border: '1px solid var(--neutral-200)',
} satisfies CSSProperties;

/*
 * Each row puts the old theme value next to the variable of the new system. The two swatches
 * must look the same in both colour schemes, which the light and dark snapshots check
 */
const ColorsTable = () => {
  const theme = useTheme();

  return (
    <table style={{ borderCollapse: 'collapse', color: 'var(--neutral-800)' }}>
      <thead>
        <tr>
          <th style={CELL_STYLE}>old token</th>
          <th style={CELL_STYLE}>Tailwind</th>
          <th style={CELL_STYLE}>old</th>
          <th style={CELL_STYLE}>next</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(theme.colors).map(([token, value]) => (
          <tr key={token}>
            <td style={CELL_STYLE}>
              <code>{token}</code>
            </td>
            <td style={CELL_STYLE}>
              <code>{`*-${toTailwind(token)}`}</code>
            </td>
            <td style={CELL_STYLE}>
              <div style={{ ...SWATCH_STYLE, background: value }} />
            </td>
            <td style={CELL_STYLE}>
              <div style={{ ...SWATCH_STYLE, background: `var(--${toTailwind(token)})` }} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ShadowsTable = () => {
  const theme = useTheme();

  return (
    <table style={{ borderCollapse: 'collapse', color: 'var(--neutral-800)' }}>
      <thead>
        <tr>
          <th style={CELL_STYLE}>old token</th>
          <th style={CELL_STYLE}>Tailwind</th>
          <th style={CELL_STYLE}>old</th>
          <th style={CELL_STYLE}>next</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(SHADOWS).map(([token, utility]) => (
          <tr key={token}>
            <td style={CELL_STYLE}>
              <code>{token}</code>
            </td>
            <td style={CELL_STYLE}>
              <code>{`shadow-${utility}`}</code>
            </td>
            <td style={{ ...CELL_STYLE, padding: '1.6rem' }}>
              <div
                style={{
                  ...SWATCH_STYLE,
                  border: 'none',
                  background: 'var(--neutral-0)',
                  boxShadow: theme.shadows[token as keyof typeof SHADOWS],
                }}
              />
            </td>
            <td style={{ ...CELL_STYLE, padding: '1.6rem' }}>
              <div
                style={{
                  ...SWATCH_STYLE,
                  border: 'none',
                  background: 'var(--neutral-0)',
                  boxShadow: `var(--${toTailwind(token)})`,
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SNAPSHOT_LIGHT_AND_DARK = {
  disableSnapshot: false,
  modes: {
    light: { colorScheme: 'light' },
    dark: { colorScheme: 'dark' },
  },
};

const meta: Meta = {
  title: 'Next/Tokens',
};

export default meta;

type Story = StoryObj;

export const Colors = {
  render: () => <ColorsTable />,
  parameters: { chromatic: SNAPSHOT_LIGHT_AND_DARK },
  name: 'colors',
} satisfies Story;

export const Shadows = {
  render: () => <ShadowsTable />,
  parameters: { chromatic: SNAPSHOT_LIGHT_AND_DARK },
  name: 'shadows',
} satisfies Story;
