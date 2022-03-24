import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RawTd } from '../RawTable';
import { Typography } from '../Typography';

const DatePickerCellButton = styled.button`
  border: ${({ theme, isCurrent }) => (isCurrent ? `1px solid ${theme.colors.neutral300}` : 'none')};
  background: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary100 : theme.colors.neutral0)};
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

export const DatePickerTd = ({ children, outsideMonth, onSelectDay, isSelected, isCurrent, ...props }) => {
  const textColor = isSelected ? 'primary600' : outsideMonth ? 'neutral600' : 'neutral900';

  return (
    <RawTd {...props}>
      <DatePickerCellButton
        tabIndex={-1}
        onClick={onSelectDay}
        isSelected={isSelected}
        isCurrent={isCurrent}
        type="button"
      >
        <Typography variant="pi" textColor={textColor} fontWeight={isSelected ? 'bold' : null}>
          {children}
        </Typography>
      </DatePickerCellButton>
    </RawTd>
  );
};

DatePickerTd.defaultProps = {
  isCurrent: false,
  isSelected: false,
  outsideMonth: false,
};

DatePickerTd.propTypes = {
  children: PropTypes.node.isRequired,
  isCurrent: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelectDay: PropTypes.func.isRequired,
  outsideMonth: PropTypes.bool,
};
