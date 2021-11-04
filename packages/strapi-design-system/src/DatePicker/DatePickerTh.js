import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RawTh } from '../RawTable';
import { Typography } from '../Typography';
import { VisuallyHidden } from '../VisuallyHidden';
import { Flex } from '../Flex';

const DatePickerThWrapper = styled(RawTh)`
  // Trick to prevent the outline from overflowing because of the general outline-offset
  outline-offset: -2px;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-transform: capitalize;
`;

const DatePickerThRow = styled(Flex)`
  height: ${24 / 16}rem;
  width: ${32 / 16}rem;
`;

export const DatePickerTh = ({ children, ...props }) => {
  return (
    <DatePickerThWrapper {...props}>
      <DatePickerThRow justifyContent="center">
        <Typography variant="pi" fontWeight="bold" color="neutral800" aria-hidden>
          {children.substr(0, 2)}
        </Typography>

        <VisuallyHidden>
          <span>{children}</span>
        </VisuallyHidden>
      </DatePickerThRow>
    </DatePickerThWrapper>
  );
};

DatePickerTh.propTypes = {
  children: PropTypes.string.isRequired,
};
