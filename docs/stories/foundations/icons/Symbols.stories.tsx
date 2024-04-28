import { Typography } from '@strapi/design-system';
import * as Icons from '@strapi/icons/symbols';
import { styled } from 'styled-components';

import type { Meta, StoryObj } from '@storybook/react';

interface AllIconsProps {
  /**
   * Size of the icons in px
   */
  size: number;
}

const AllIcons = ({ size }: AllIconsProps) => {
  const gridSize = Math.max(size * 10 * 0.5, 160);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error('failed to copy');
      console.error(error);
    }
  };

  const handleClick = (name: string) => () => {
    copy(`import { ${name} } from '@strapi/icons/symbols';`);
  };

  return (
    <IconGrid
      style={{
        gridTemplateColumns: `repeat(auto-fill, ${gridSize}px)`,
        gridTemplateRows: `repeat(auto-fill, ${gridSize}px)`,
      }}
    >
      {Object.entries(Icons).map(([name, Component]) => (
        <IconGridItem key={name} style={{ width: gridSize, height: gridSize }} onClick={handleClick(name)}>
          <Component width={`${size}px`} height={`${size}px`} />
          <IconTitle variant="pi">{name}</IconTitle>
        </IconGridItem>
      ))}
    </IconGrid>
  );
};

const IconGrid = styled.ul`
  display: grid;
  grid-template-rows: repeat(auto-fill, 16rem);
  grid-gap: 1.2rem;
`;

const IconGridItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  transition: background-color 200ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

const IconTitle = styled(Typography)`
  word-break: break-all;
`;

const meta: Meta<typeof AllIcons> = {
  component: AllIcons,
  title: 'Foundations/Icons/Symbols',
};

export default meta;
type Story = StoryObj<typeof AllIcons>;

export const All: Story = {
  args: {
    size: 32,
  },
};
