import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '../Box';
import { Text } from '../Text';
import { KeyboardKeys } from '../helpers/keyboardKeys';

const OptionBox = styled(Box)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;

  &:focus-visible,
  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }
`;

export const Option = ({ selected, children, onSelect, value, ...props }) => {
  const optionRef = useRef(null);

  useEffect(() => {
    if (!optionRef.current) return;

    if (selected) {
      optionRef.current.focus();
    }
  }, [selected]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case KeyboardKeys.SPACE:
      case KeyboardKeys.ENTER: {
        onSelect();
        break;
      }
    }
  };

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
      tabIndex={selected ? 0 : -1}
      background={'neutral0'}
      onKeyDown={handleKeyDown}
      onClick={onSelect}
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
  onSelect: () => undefined,
};

Option.propTypes = {
  children: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
