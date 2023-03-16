import { MouseEventHandler } from 'react';

import styled, { ThemeColors } from 'styled-components';

import { RawTd, RawTdProps } from '../RawTable';
import { Typography } from '../Typography';

const DatePickerCellButton = styled.button<{ $isSelected?: boolean }>`
  border: none;
  background: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.primary100 : theme.colors.neutral0)};
  height: ${32 / 16}rem;
  text-align: center;
  width: ${32 / 16}rem;
  border-radius: ${({ theme }) => theme.borderRadius};

  // Trick to prevent the outline from overflowing because of the general outline-offset
  outline-offset: -2px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }

  &:hover > ${Typography} {
    color: ${({ theme }) => theme.colors.primary600};
  }
`;

export interface DatePickerTdProps extends RawTdProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onSelectDay: MouseEventHandler<HTMLButtonElement>;
  outsideMonth?: boolean;
}

export const DatePickerTd = ({
  children,
  outsideMonth = false,
  onSelectDay,
  isSelected = false,
  ...props
}: DatePickerTdProps) => {
  let textColor: keyof ThemeColors = 'neutral900';

  if (isSelected) {
    textColor = 'primary600';
  } else if (outsideMonth) {
    textColor = 'neutral600';
  }

  return (
    <RawTd {...props}>
      <DatePickerCellButton tabIndex={-1} onClick={onSelectDay} $isSelected={isSelected} type="button">
        <Typography variant="pi" textColor={textColor} fontWeight={isSelected ? 'bold' : undefined}>
          {children}
        </Typography>
      </DatePickerCellButton>
    </RawTd>
  );
};
