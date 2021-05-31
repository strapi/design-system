import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Th } from '../Table';
import { Text } from '../Text';
import { VisuallyHidden } from '../VisuallyHidden';
import { Row } from '../Row';

const DatePickerThWrapper = styled(Th)`
  // Trick to prevent the outline from overflowing because of the general outline-offset
  outline-offset: -2px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const DatePickerThRow = styled(Row)`
  height: ${24 / 16}rem;
  width: ${32 / 16}rem;
`;

export const DatePickerTh = ({ children, ...props }) => {
  return (
    <DatePickerThWrapper {...props}>
      <DatePickerThRow justifyContent="center">
        <Text small highlighted={true} color="neutral800" aria-hidden as="span">
          {children.substr(0, 2)}
        </Text>

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
