import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';

const OptionBox = styled(Box)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;

  &.is-focused {
    background: ${({ theme }) => theme.colors.primary100};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }
`;

export const Option = ({ selected, children, value, ...props }) => {
  const optionRef = useRef(null);

  return (
    <OptionBox
      as="li"
      hasRadius
      paddingLeft={4}
      paddingRight={4}
      paddingTop={2}
      paddingBottom={2}
      ref={optionRef}
      role="option"
      aria-selected={selected}
      background={'neutral0'}
      data-strapi-value={value}
      {...props}
    >
      <Text as="span" textColor={selected ? 'primary600' : 'neutral800'} highlighted={selected}>
        {children}
      </Text>
    </OptionBox>
  );
};

Option.defaultProps = {
  selected: false,
};

Option.propTypes = {
  children: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
